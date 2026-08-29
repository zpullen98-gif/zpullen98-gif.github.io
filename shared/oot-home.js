/* ============ Outside Of Time: home screen components ============
   Builders that return HTML STRINGS, deliberately.

   The Ledger's renderHome() concatenates a string and assigns innerHTML; the
   Codex builds nodes and appends them; the World Table is Svelte. A string is
   the only currency all three already accept, and `el(html)` turns one into a
   node in two of the three wings anyway. Returning strings also keeps this file
   free of any DOM assumptions, which is what lets the same code run inside a
   Svelte component with {@html}.

   Nothing here reads or writes wing state. Every builder takes what it needs as
   an argument, so a wing can feed it real numbers from its own scheduler
   without this file knowing that a scheduler exists. That is what keeps the
   Codex's SRS and the Ledger's SM-2 both intact.

   Load after oot-profiles.js.
   ============ */

(function () {
  'use strict';

  var OOT = (window.OOT = window.OOT || {});
  if (OOT.home) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function attrs(o) {
    var out = '';
    for (var k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k) || o[k] == null) continue;
      out += ' ' + k + '="' + esc(o[k]) + '"';
    }
    return out;
  }

  /* ---- a band ---------------------------------------------------------
     name  the word that must be identical across all three wings
     blurb one line saying what the band is for, in the wing's own voice */
  function section(name, blurb, inner) {
    return '<section class="oot-sec">' +
      '<div class="oot-sec-head"><h3>' + esc(name) + '</h3>' +
      (blurb ? '<span>' + esc(blurb) + '</span>' : '') + '</div>' +
      (inner || '') + '</section>';
  }

  /* ---- TODAY ----------------------------------------------------------
     One card. One decision. The counts come from the wing's own scheduler.

       due      reviews the scheduler says are owed
       fresh    new items it would introduce
       mins     rough minutes, so a person on a break knows if there is time
       line     an override when a wing wants its own sentence
       cta      the button label
       act      whatever the wing's delegated click handler expects,
                e.g. 'data-act="sess-start"' or 'id="oot-today-go"'

     The empty state is not a failure state. A person who is up to date should
     be told so and offered something optional, never shown a zero. */
  function todayCard(o) {
    o = o || {};
    var due = o.due | 0, fresh = o.fresh | 0;
    var line;

    if (o.line) {
      line = esc(o.line);
    } else if (due || fresh) {
      var bits = [];
      if (due) bits.push('<span class="oot-today-n">' + due + '</span> ' +
        (due === 1 ? 'review due' : 'reviews due'));
      if (fresh) bits.push('<span class="oot-today-n">' + fresh + '</span> new');
      line = bits.join(' and ');
    } else {
      line = 'Nothing owed. You are current.';
    }

    var sub = o.sub != null ? esc(o.sub)
      : (due || fresh)
        ? (o.mins ? 'About ' + (o.mins | 0) + ' minutes.' : '')
        : 'Study anyway if you have ten minutes, or come back tomorrow.';

    var label = o.cta || ((due || fresh) ? 'Start' : 'Study anyway');
    var btn = '<button class="' + esc(o.btnClass || 'btn') + ' oot-today-go"' +
      (o.act ? ' ' + o.act : '') + '>' + esc(label) + '</button>';

    return '<div class="oot-today">' +
      '<div class="oot-today-main">' +
        '<div class="oot-today-line">' + line + '</div>' +
        (sub ? '<div class="oot-today-sub">' + sub + '</div>' : '') +
      '</div>' + btn + '</div>';
  }

  /* ---- the shared streak ---------------------------------------------
     Reads oot-profiles, because a person who drilled cocktails today has
     studied today whichever wing they are looking at now. */
  function streak() {
    if (!OOT.profiles) return '';
    var n = OOT.profiles.streak();
    if (!n) return '';
    return '<span class="oot-streak"><b>' + n + '</b> ' +
      (n === 1 ? 'day' : 'days') + ' running</span>';
  }

  /* ---- readiness ------------------------------------------------------ */
  function readiness(label, pct) {
    var p = Math.max(0, Math.min(100, Math.round(pct || 0)));
    return '<div class="oot-meter">' +
      '<div class="oot-meter-top"><span>' + esc(label) + '</span><b>' + p + '%</b></div>' +
      '<div class="oot-meter-track"><div class="oot-meter-fill" style="width:' + p + '%"></div></div>' +
      '</div>';
  }

  /* ---- the first path -------------------------------------------------
     steps  [{id, t, mins, act}]
     done   a set-like object or array of completed ids

     Shown until it is finished, then it stops taking up room: a course a
     person completed three months ago is not what they came for today. */
  function firstPath(steps, done, opts) {
    steps = steps || [];
    if (!steps.length) return '';
    opts = opts || {};
    var isDone = Array.isArray(done)
      ? function (id) { return done.indexOf(id) > -1; }
      : function (id) { return !!(done && done[id]); };

    var n = 0;
    var rows = steps.map(function (s) {
      var d = isDone(s.id);
      if (d) n++;
      return '<button class="oot-path-row' + (d ? ' done' : '') + '"' +
        (s.act ? ' ' + s.act : '') + attrs({ 'data-path-step': s.id }) + '>' +
        '<span class="oot-path-mark">' + (d ? '✓' : '○') + '</span>' +
        '<span class="oot-path-t">' + esc(s.t) + '</span>' +
        '<span class="oot-path-mins">' + (s.mins ? (s.mins | 0) + ' min' : '') + '</span>' +
        '</button>';
    }).join('');

    if (n === steps.length && !opts.keepWhenDone) return '';

    return '<div class="oot-path-progress">' + n + ' of ' + steps.length + ' done</div>' +
      '<div class="oot-path">' + rows + '</div>';
  }

  /* ---- who is studying ------------------------------------------------
     Deliberately plain and always visible when a roster exists. Hiding it
     behind a menu is how two people end up sharing one record.

     With no roster at all it renders a single invitation rather than nothing,
     because a venue that never discovers profiles is a venue whose manager
     view stays empty forever. */
  function who(opts) {
    if (!OOT.profiles) return '';
    opts = opts || {};
    var list = OOT.profiles.list();
    var cur = OOT.profiles.current();

    if (!list.length) {
      return '<div class="oot-who"><span class="oot-who-label">Who is studying?</span>' +
        '<button class="oot-chip" data-oot-profile="new">Add your name</button></div>';
    }

    var chips = list.map(function (p) {
      var on = !!(cur && p.id === cur.id);
      /* aria-pressed, not colour alone: which name is studying is the whole
         point of the row, and a gold chip says nothing to a screen reader
         or to anyone who cannot pick the gold out of the parchment */
      return '<button class="oot-chip' + (on ? ' on' : '') + '"' +
        attrs({ 'data-oot-profile': p.id, 'aria-pressed': on ? 'true' : 'false' }) + '>' +
        esc(p.name) + '</button>';
    }).join('');

    return '<div class="oot-who"><span class="oot-who-label">Studying</span>' + chips +
      '<button class="oot-chip" data-oot-profile="new" aria-label="Add another name">' +
      '<span aria-hidden="true">+</span></button>' +
      (opts.streak !== false ? streak() : '') + '</div>';
  }

  /* ---- wiring ---------------------------------------------------------
     One delegated listener for the profile chips, installed once.

     SWITCHING RELOADS THE PAGE, deliberately. A wing is a stack of a dozen
     layers, each of which normalises the store its own way at boot: the Codex
     alone fills in ST.q, ST.days, ST.flags, ST.paceDays and more across three
     files. Swapping the object underneath them at runtime means replicating
     every one of those initialisations from the outside and getting each right
     forever, and the first attempt at that crashed on a substructure a later
     layer assumed. A reload re-runs the real thing.

     It costs a few hundred milliseconds on an action a person takes when they
     pick up the tablet, and it buys correctness across every wing and every
     future layer. Programmatic switches do not reload, so tests stay fast. */
  function bindWho(root, rerender) {
    if (!root || root.__ootWhoBound) return;
    root.__ootWhoBound = true;
    root.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-oot-profile]');
      if (!b || !OOT.profiles) return;
      var v = b.getAttribute('data-oot-profile');
      var switched = false;
      if (v === 'new') {
        var name = window.prompt('Name (a first name is plenty)');
        if (name == null) return;
        var trimmed = String(name).trim();
        if (!trimmed) return;
        /* The first name on a device that already has progress adopts it,
           rather than starting an empty record beside months of work. */
        if (!OOT.profiles.list().length) {
        /* The first name on a device INHERITS every unnamespaced record on it:
           months of ledger and codex history, the whole First Light year, the
           almanac's journals. That is right when the person naming themselves
           is the person who made it, and wrong when a second family member
           types their name first. Ask, once, only when there is something to
           inherit. Cancelling leaves the roster empty rather than creating a
           non-legacy profile, because adopt() is only reachable while the
           roster is empty — a plain profile here would strand the existing
           record behind a key nobody reads. */
        var hasHistory = false;
        try {
          for (var hi = 0; hi < localStorage.length; hi++) {
            var hk = localStorage.key(hi);
            if (hk === 'bartenders-ledger-v1' || hk === 'codexStats' ||
                hk === 'firstlight-v1' || hk === 'cfl-journals-v1') { hasHistory = true; break; }
          }
        } catch (e) {}
        if (hasHistory && typeof window.confirm === 'function' &&
            !window.confirm('This device already has study history on it. Is it yours, ' +
                            trimmed + '? It will be kept under your name.')) return;
        OOT.profiles.adopt(trimmed); switched = true;
      }
        else { switched = OOT.profiles.switch(OOT.profiles.add(trimmed).id); }
      } else {
        switched = OOT.profiles.switch(v);
      }
      if (switched) { window.location.reload(); return; }
      if (typeof rerender === 'function') rerender();
    });
  }

  OOT.home = {
    esc: esc,
    section: section,
    todayCard: todayCard,
    streak: streak,
    readiness: readiness,
    firstPath: firstPath,
    who: who,
    bindWho: bindWho
  };
})();
