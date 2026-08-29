/* Outside Of Time — result logging.
   One fire-and-forget insert into the Supabase `results` table per completed
   round, and the per-wing hooks that decide what "completed" means. That table
   IS the entire B2B concierge backend: the founder reads it weekly and emails
   venue managers by hand. Nothing more than an insert is ever built here.

   Loaded after oot-locks.js and before oot-bar.js, and it follows the same
   discipline: wing functions are wrapped from outside, no wing's code is
   restructured, and deleting this file leaves every wing exactly as it was.

   Three rules:

   1. Fails silently, by design. A dropped result must never interrupt someone
      studying: no retry queue, no error surface, no console noise in the
      happy path. Offline means the round simply is not recorded.
   2. Signed-in only. An anonymous visitor's rounds belong to nobody and are
      not sent anywhere, not even to the mock store.
   3. Metadata only. A payload is a score and a shape, never content: what
      someone wrote in a journal, typed in a note or saved to a vault does not
      pass through here and never will. */
(function (w) {
  'use strict';
  var OOT = w.OOT = w.OOT || {};
  var cfg = (OOT.config && OOT.config.supabase) || {};
  var CONFIGURED = !!(cfg.url && cfg.anonKey);

  var WINGS = ['codex', 'ledger', 'table', 'light', 'almanac'];
  var MOCK_RESULTS_KEY = 'oot-mock-results';
  var MOCK_CAP = 100;

  /* The schema bounds kind at 64 chars and payload at 4096 bytes
     (pg_column_size on the stored jsonb). The client checks against a smaller
     number because pg's binary size is not JSON string length; staying well
     under means never learning the difference the hard way. */
  var KIND_MAX = 64;
  var PAYLOAD_MAX = 3500;

  /* Backstop against double-fire. The hooks edge-detect their own transitions,
     but a render seam that fires twice in one repaint cycle is the kind of bug
     that only shows up in production data, weeks later, as every score counted
     twice. The window is deliberately SHORT: it exists to absorb one repaint
     cycle, not to judge repeats. A one-question sudden-death round lost twice
     in a row produces byte-identical payloads seconds apart, and both are real
     rounds that deserve rows. */
  var DEDUP_MS = 1500;
  var lastSig = null;
  var lastAt = 0;

  function mockRows() {
    try { return JSON.parse(w.localStorage.getItem(MOCK_RESULTS_KEY) || '[]') || []; }
    catch (e) { return []; }
  }

  function insertSupabase(row) {
    return OOT.auth.accessToken().then(function (token) {
      if (!token) return false;
      /* Plain fetch against PostgREST rather than the 40KB SDK: this is the
         only write the client ever makes, and it must not cost a script load.
         keepalive lets a result fired on the way out of a page still land. */
      return w.fetch(cfg.url + '/rest/v1/results', {
        method: 'POST',
        keepalive: true,
        headers: {
          'apikey': cfg.anonKey,
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(row)
      }).then(function (r) { return !!(r && r.ok); });
    }).catch(function () { return false; });
  }

  OOT.log = {
    /* result('codex', 'quiz', { score: 18, of: 20 }) -> Promise<boolean>
       Resolves true when the row was recorded (or stored by the mock), false
       for any reason at all. Never rejects, never throws. */
    result: function (wing, kind, payload) {
      try {
        if (WINGS.indexOf(wing) === -1) return Promise.resolve(false);
        kind = String(kind == null ? '' : kind).trim();
        if (!kind || kind.length > KIND_MAX) return Promise.resolve(false);
        if (!OOT.auth || !OOT.auth.isSignedIn()) return Promise.resolve(false);

        var body = '{}';
        try { body = JSON.stringify(payload || {}) || '{}'; } catch (e) {}
        if (body.length > PAYLOAD_MAX) return Promise.resolve(false);

        var sig = wing + '|' + kind + '|' + body;
        var now = Date.now();
        if (sig === lastSig && now - lastAt < DEDUP_MS) return Promise.resolve(false);
        /* Committed only on the paths that actually record something: a row
           refused for being offline must not suppress the next attempt. */

        if (!CONFIGURED) {
          lastSig = sig; lastAt = now;
          /* The mock is not a stub: rows accumulate locally so the whole
             pipeline is testable before the project exists. Same cap spirit
             as the server's: the newest hundred are plenty. */
          var rows = mockRows();
          rows.push({ user_id: OOT.auth.user.id, wing: wing, kind: kind,
                      payload: JSON.parse(body), created_at: new Date().toISOString() });
          try {
            w.localStorage.setItem(MOCK_RESULTS_KEY, JSON.stringify(rows.slice(-MOCK_CAP)));
          } catch (e) { return Promise.resolve(false); }
          return Promise.resolve(true);
        }

        if (w.navigator && w.navigator.onLine === false) return Promise.resolve(false);
        lastSig = sig; lastAt = now;
        return insertSupabase({
          user_id: OOT.auth.user.id, wing: wing, kind: kind, payload: JSON.parse(body)
        });
      } catch (e) {
        return Promise.resolve(false);
      }
    },

    /* What the mock has recorded, newest last. In live mode the server holds
       the truth and this answers with what it can see from here: nothing. */
    recent: function () { return CONFIGURED ? [] : mockRows(); }
  };

  /* ========================== THE COMPLETION HOOKS ======================== */

  /* What counts as a completed round, per wing. Each hook wraps a function the
     wing already owns, calls through FIRST so the wing's own behaviour is
     untouched, then detects the completion edge and fires one insert. Every
     hook is wrapped in try/catch at boot: a hook that fails to install loses
     telemetry, never a wing. */

  function wing() {
    var m = /^\/(codex|ledger|table|light|almanac)(\/|$)/.exec(w.location.pathname);
    return m ? m[1] : null;
  }

  /* Same trick as oot-locks.js, for the same reason: the Ledger's `state` is a
     top-level const, invisible on window, visible to indirect eval. Evaluates
     only fixed identifiers from this file, never anything from a page or URL. */
  function G(name) {
    try { return (0, eval)(name); } catch (e) { return undefined; }
  }

  /* ---------------------------------------------------------- the Codex --- */

  function hookCodex() {
    /* Every way a round can end: last question, timer, the End button,
       sudden-death loss) funnels through the global finish(). We are the
       outermost of six layers; calling through first means the wing's own
       record-keeping (court results, history, achievements) has already run
       by the time the payload is read. */
    if (typeof w.finish === 'function') {
      var finish = w.finish;
      w.finish = function () {
        /* finish() is only a completion when it ENDS a live round. Reaching
           the results view any other way must not log. */
        var live = w.S && w.S.view !== 'results';
        var out = finish.apply(this, arguments);
        var S = w.S;
        if (live && S && S.results && S.results.length > 0) {
          OOT.log.result('codex', (typeof w.isExamMode === 'function' && w.isExamMode()) ? 'exam' : 'quiz', {
            level: w.activeLevel || null,
            mode: S.mode || null,
            oral: !!S._oral,
            score: S.correct || 0,
            of: S.results.length
          });
        }
        return out;
      };
    }

    /* The blind-tasting flight ends when ttNext() pushes the index past the
       deck; tastingTally() is a render function and re-fires, so the click is
       the edge. */
    if (typeof w.ttNext === 'function') {
      var ttNext = w.ttNext;
      w.ttNext = function () {
        var t = w.S && w.S.tt;
        var before = t ? t.idx : null;
        var out = ttNext.apply(this, arguments);
        t = w.S && w.S.tt;
        if (t && t.deck && before !== null && before < t.deck.length && t.idx >= t.deck.length) {
          OOT.log.result('codex', 'tasting', {
            level: w.activeLevel || null,
            score: t.score || 0,
            of: t.deck.length
          });
        }
        return out;
      };
    }
  }

  /* --------------------------------------------------------- the Ledger --- */

  function hookLedger() {
    var state = G('state');
    if (!state) return;

    /* The one authoritative "a session was completed" writer — but the wing
       calls it more than once per night (when the quiz round closes, again
       when the drill is logged, again from "No bar tonight"), staying honest
       itself via per-day stamps in progress.streakData. Mirror the stamps:
       log exactly when the NIGHT stamp advances, once per day, with hands
       true only if the drill stamp advanced in the same call. Logging every
       call counted one night as two sessions. */
    if (typeof w.recordSessionComplete === 'function') {
      var recordSessionComplete = w.recordSessionComplete;
      w.recordSessionComplete = function () {
        var p = G('progress');
        var before = (p && p.streakData && p.streakData.last) || null;
        var out = recordSessionComplete.apply(this, arguments);
        var s = (out && typeof out === 'object') ? out
              : ((p = G('progress')) && p.streakData) || {};
        if (s.last && s.last !== before) {
          OOT.log.result('ledger', 'session', { hands: s.lastHands === s.last });
        }
        return out;
      };
    }

    /* Quiz and flashcard rounds have no completion writer of their own; the
       deck simply falls off the end into a done screen that re-renders freely.
       So the render seam is watched with a latch: log once when the round
       crosses into done, re-arm when a new round starts. */
    var quizLogged = false;
    if (typeof w.renderQuiz === 'function') {
      var renderQuiz = w.renderQuiz;
      w.renderQuiz = function () {
        var out = renderQuiz.apply(this, arguments);
        var z = state.quiz;
        if (!z || z.stage !== 'done') { quizLogged = false; return out; }
        if (!quizLogged && z.round && z.round.length) {
          quizLogged = true;
          OOT.log.result('ledger', 'quiz', {
            mode: z.mode || 'mixed',
            replay: !!z.replay,
            score: z.score || 0,
            of: z.round.length
          });
        }
        return out;
      };
    }

    var cardsLogged = false;
    if (typeof w.renderFlashcards === 'function') {
      var renderFlashcards = w.renderFlashcards;
      w.renderFlashcards = function () {
        var out = renderFlashcards.apply(this, arguments);
        var fc = state.fc;
        var done = fc && fc.deck && fc.deck.length > 0 && fc.idx >= fc.deck.length;
        if (!done) { cardsLogged = false; return out; }
        if (!cardsLogged) {
          cardsLogged = true;
          OOT.log.result('ledger', 'cards', {
            mode: fc.mode || null,
            right: fc.right || 0,
            wrong: fc.wrong || 0,
            of: fc.deck.length
          });
        }
        return out;
      };
    }
  }

  /* ---------------------------------------------------------- First Light --- */

  /* First Light is the wing where rule 3 does the most work. The two hooks
     record that a morning was walked and a practice was done, never a word of
     what anyone wrote. The journal's write path is deliberately not touched. */

  function hookLight() {
    var A = w.FL_ACTS;
    if (!A) return;

    /* The guided morning's Finish button pushes todayStep past the last step.
       The step count lives in an array literal local to todayGuided(), so the
       terminal value is not readable from here; 5 is that array's length and
       changes with it. The edge test keeps a later re-render from re-firing,
       and the per-day latch keeps "Walk it again" from counting the same
       morning twice: one per day is the honest count, same rule as the
       practice hook below. */
    var LAST_STEP = 5;
    var morningLoggedFor = null;
    if (typeof A.todayStep === 'function') {
      var todayStep = A.todayStep;
      A.todayStep = function () {
        var before = typeof w.todayStep === 'number' ? w.todayStep : null;
        var out = todayStep.apply(this, arguments);
        var today = (typeof w.flToday === 'function') ? w.flToday() : null;
        if (before !== null && before < LAST_STEP && w.todayStep >= LAST_STEP &&
            morningLoggedFor !== today) {
          morningLoggedFor = today;
          OOT.log.result('light', 'morning', {
            day: (w.FL && w.FL.days) ? w.FL.days.length : null,
            streak: (typeof w.flStreak === 'function') ? w.flStreak() : null
          });
        }
        return out;
      };
    }

    /* practiceDone is a toggle; only the ON edge is a completion, and one per
       day is the honest count however many times it is flipped. */
    var practiceLoggedFor = null;
    if (typeof A.practiceDone === 'function') {
      var practiceDone = A.practiceDone;
      A.practiceDone = function () {
        var out = practiceDone.apply(this, arguments);
        var today = (typeof w.flToday === 'function') ? w.flToday() : null;
        var on = today && w.FL && w.FL.practice && w.FL.practice[today];
        if (on && practiceLoggedFor !== today) {
          practiceLoggedFor = today;
          OOT.log.result('light', 'practice', {
            day: (w.FL && w.FL.days) ? w.FL.days.length : null
          });
        }
        return out;
      };
    }
  }

  /* ---------------------------------------------------- the World Table --- */

  /* Compiled Svelte: there is no function seam short of scraping rendered
     text, and a hook that breaks silently on every rebuild is worse than no
     hook. So the Table logs by CONTRACT instead: the lexicon quiz's
     nextQuestion() dispatches this event at the moment the verdict is set
     (WorldTable@a773fd1, shipped in the build committed here), and this
     listener is the other half. A future build that loses the dispatch stops
     logging rather than breaking anything.

     detail: { kind: 'quiz', right: n, of: n } — anything else is dropped. */

  function hookTable() {
    w.addEventListener('oot:round-complete', function (e) {
      var d = e && e.detail;
      if (!d || typeof d.right !== 'number' || typeof d.of !== 'number') return;
      OOT.log.result('table', d.kind === 'quiz' ? 'quiz' : 'round', {
        score: d.right, of: d.of
      });
    });
  }

  /* The Almanac is the travel-agency lead engine, not a study wing. It has no
     rounds and deliberately never logs. */

  /* -------------------------------------------------------------- boot --- */

  var HOOKS = { codex: hookCodex, ledger: hookLedger, light: hookLight, table: hookTable };

  function boot() {
    var fn = HOOKS[wing()];
    if (!fn) return;
    try { fn(); } catch (e) {
      if (w.console && w.console.warn) w.console.warn('Outside Of Time: result logging did not install.', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
