/* ============ Codex XIV: the home screen, given a shape ============
   Twenty-one tiles arrived on the home screen in one flat grid, because eleven
   layers each appended their own to `.modes` without any of them knowing what
   the others had added. Everything sat at equal weight: the Mock Exam beside
   Progress Transfer, the Service Ritual beside Hall of Fame. A student opening
   the app had to read all twenty-one to find the one thing they came for.

   This layer changes no tile and no handler. It runs last in the decorateHome
   chain, collects whatever the other layers produced, and re-parents the actual
   button nodes into named bands. Re-parenting rather than cloning is the whole
   trick: appendChild moves a node and its listeners intact, so every onclick
   every other layer bound keeps working without being touched.

   The band names come from shared/oot-home.js and are identical in all three
   wings, so a person who learns the Ledger can already read this one.
   Examination stays separate from Practise here, and only here: this is the
   only wing preparing anyone for a real examination, and folding the two
   together would lose the most useful distinction on the page.

   A tile this file has never heard of still appears. Unknown ids fall into a
   final band rather than vanishing, so a future layer that adds a tile gets a
   home for it whether or not anyone remembers to edit this list.
   ============ */

var HOME_SECTIONS = [
  ['Today', 'What the Codex has set for you now',
    ['t-daily']],
  ['Examination', 'Sit the paper as the Court sets it',
    ['m-mock', 't-sim', 't-tast', 't-svc', 't-light', 't-sudden']],
  ['Practise', 'Drill what is weak until it is not',
    ['m-drill', 'm-endless', 't-weak', 't-flag']],
  ['Learn', 'Read first, then drill what you read',
    ['t-prim', 'm-terroir', 'm-flash', 'm-prod', 't-compendium', 't-ency', 't-vid', 't-cellar']],
  ['Record', 'What you have done, and where it lives',
    ['t-dash', 't-hall', 't-sync']]
];

/* Readiness for the level the student is actually sitting.

   Coverage times accuracy, deliberately. Knowing ninety per cent of a tenth of
   the bank is not readiness, and neither is having met every question once and
   answered most of them wrong. Multiplying the two means a figure only rises
   when both do, which is the honest shape of the thing being measured. */
function ootCodexReadiness() {
  try {
    if (typeof LEVELS === 'undefined' || typeof activeLevel === 'undefined') return null;
    var lv = LEVELS[activeLevel];
    if (!lv || !lv.bank || !lv.bank.length) return null;
    var bank = lv.bank, seen = 0, acc = 0;
    for (var i = 0; i < bank.length; i++) {
      var r = ST && ST.q && ST.q[qKey(bank[i])];
      if (r && (r.c + r.w) > 0) { seen++; acc += r.c / (r.c + r.w); }
    }
    var pct = seen ? Math.round((seen / bank.length) * (acc / seen) * 100) : 0;
    return { label: lv.short, pct: pct, seen: seen, total: bank.length };
  } catch (e) { return null; }
}

/* The Daily Review tile already computes its own count. Read it back rather
   than recomputing, so the summary and the tile can never disagree on screen. */
function ootCodexDue() {
  try {
    var t = document.getElementById('t-daily');
    if (!t) return 0;
    var m = (t.textContent || '').match(/(\d+)\s*(?:card|question|item|due)/i);
    return m ? parseInt(m[1], 10) : 0;
  } catch (e) { return 0; }
}

function organiseHome() {
  var grids = document.querySelectorAll('.modes');
  if (!grids.length || document.querySelector('.oot-sec')) return;

  var tiles = {}, order = [];
  Array.prototype.forEach.call(grids, function (g) {
    Array.prototype.forEach.call(g.querySelectorAll('.mode'), function (b) {
      var key = b.id || ('anon-' + order.length);
      if (!tiles[key]) { tiles[key] = b; order.push(key); }
    });
  });
  if (order.length < 2) return;

  var host = grids[0].parentNode;
  var anchor = grids[0];
  var placed = {};
  var H = window.OOT && window.OOT.home;
  var P = window.OOT && window.OOT.profiles;

  /* The Pass sits above everything when this device is the manager's, so the
     first thing they see is whether anyone is actually using what they pay for. */
  if (window.OOT && OOT.pass) {
    var strip = OOT.pass.strip();
    if (strip) {
      var sd = document.createElement('div');
      sd.innerHTML = strip;
      while (sd.firstChild) host.insertBefore(sd.firstChild, anchor);
    }
    OOT.pass.bind(host, function () { S.view = 'oot-pass'; render(); });
  }

  /* Who is studying, above everything else. Putting this behind a menu is how
     two people end up writing into one record. */
  if (H && P) {
    var who = document.createElement('div');
    who.innerHTML = H.who();
    while (who.firstChild) host.insertBefore(who.firstChild, anchor);
    H.bindWho(host, function () { render(); });
  }

  var frag = document.createDocumentFragment();

  HOME_SECTIONS.forEach(function (sec) {
    var name = sec[0], blurb = sec[1], ids = sec[2];
    var mine = ids.filter(function (id) { return tiles[id]; });
    var extra = '';

    if (name === 'Today' && H) {
      var due = ootCodexDue();
      extra = H.todayCard({
        due: due,
        mins: due ? Math.max(5, Math.round(due * 0.4)) : 0,
        cta: due ? 'Begin the review' : 'Study anyway',
        act: 'data-oot-today="1"',
        btnClass: 'btn gold'
      });
    }

    /* The induction sits at the top of Learn until it is finished, then it
       stops taking up room: a course completed three months ago is not what
       anyone came back for. */
    if (name === 'Learn' && H && P && typeof FIRST_PATH !== 'undefined') {
      var done = {};
      FIRST_PATH.forEach(function (s) { if (P.pathDone('codex', s.id)) done[s.id] = 1; });
      var path = H.firstPath(FIRST_PATH.map(function (s) {
        return { id: s.id, t: s.t, mins: s.mins, act: 'data-oot-step="' + s.id + '"' };
      }), done);
      if (path) {
        extra = '<div class="oot-today-sub" style="margin:0 0 8px">Your first week. ' +
          'Finish it and your manager can see you are ready for the floor.</div>' + path;
      }
    }

    if (name === 'Record' && H) {
      var r = ootCodexReadiness();
      if (r) {
        extra = H.readiness('Ready for ' + r.label, r.pct) +
          '<div class="oot-today-sub" style="margin:6px 0 12px">' +
          r.seen + ' of ' + r.total + ' questions met. Readiness counts how much of ' +
          'the bank you have seen, weighted by how well you answer it.</div>';
      }
      if (OOT.pass) extra += OOT.pass.settings();
      /* Publish this wing's section ranking for The Pass, which has no question
         bank of its own and must not be made to load one. */
      try { if (OOT.pass) OOT.pass.publishGaps('codex', ootCodexGaps()); } catch (e) {}
    }

    if (!mine.length && !extra) return;

    var wrap = document.createElement('section');
    wrap.className = 'oot-sec';
    wrap.innerHTML = '<div class="oot-sec-head"><h3>' + name + '</h3>' +
      '<span>' + blurb + '</span></div>' + extra;
    if (mine.length) {
      var grid = document.createElement('div');
      grid.className = 'modes oot-sec-grid';
      mine.forEach(function (id) { grid.appendChild(tiles[id]); placed[id] = 1; });
      wrap.appendChild(grid);
    }
    frag.appendChild(wrap);
  });

  var strays = order.filter(function (id) { return !placed[id]; });
  if (strays.length) {
    var w2 = document.createElement('section');
    w2.className = 'oot-sec';
    w2.innerHTML = '<div class="oot-sec-head"><h3>More</h3>' +
      '<span>Everything else the Codex holds</span></div>';
    var g2 = document.createElement('div');
    g2.className = 'modes oot-sec-grid';
    strays.forEach(function (id) { g2.appendChild(tiles[id]); });
    w2.appendChild(g2);
    frag.appendChild(w2);
  }

  host.insertBefore(frag, anchor);

  /* The Today button is a shortcut to the tile it summarises, so there is one
     implementation of the daily review rather than two that can drift. */
  var go = host.querySelector('[data-oot-today]');
  if (go) {
    go.onclick = function () {
      var t = document.getElementById('t-daily');
      if (t) t.click();
    };
  }

  /* A first-path step marks itself done and then opens the tile it points at.
     Marking on the way in rather than on the way out is deliberate: there is no
     honest signal for "read a chapter properly", and a checklist that never
     ticks is worse than one that is generous. */
  if (P && typeof FIRST_PATH !== 'undefined') {
    Array.prototype.forEach.call(host.querySelectorAll('[data-oot-step]'), function (b) {
      b.onclick = function () {
        var id = b.getAttribute('data-oot-step');
        var step = FIRST_PATH.filter(function (s) { return s.id === id; })[0];
        P.markPathStep('codex', id);
        var t = step && document.getElementById(step.go);
        if (t) t.click(); else render();
      };
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.modes'), function (g) {
    if (!g.classList.contains('oot-sec-grid') && !g.querySelector('.mode')) {
      if (g.parentNode) g.parentNode.removeChild(g);
    }
  });
}

var _v14DecorateHome = decorateHome;
decorateHome = function () {
  _v14DecorateHome();
  try { organiseHome(); } catch (e) { /* a broken shell must never hide the tiles */ }
};

/* ---- the full Pass, as its own view ----------------------------------
   Team gaps are computed HERE rather than in the shared file, because ranking
   sections needs the question bank, and only a wing has that. Every profile's
   answers are read from their own namespaced store, so a manager sees the team
   without ever becoming one of them. */
function ootCodexGaps() {
  try {
    if (!window.OOT || !OOT.profiles || typeof QUESTIONS === 'undefined') return [];
    var catOf = {};
    /* QUESTIONS is REBOUND to the active level's bank on every applyLevel
       (codex7), so building the id->category map from it described only
       whichever rank the viewer happens to be sitting in. The Pass is a view
       of everybody's study across every rank; read the banks from LEVELS. */
    var banks = [];
    (typeof LEVEL_ORDER !== 'undefined' ? LEVEL_ORDER : []).forEach(function (lv) {
      if (typeof LEVELS !== 'undefined' && LEVELS[lv] && LEVELS[lv].bank) banks.push(LEVELS[lv].bank);
    });
    if (!banks.length) {
      banks = [QUESTIONS];
      if (typeof INTRO_QUESTIONS !== 'undefined') banks.push(INTRO_QUESTIONS);
    }
    banks.forEach(function (b) {
      b.forEach(function (q) { if (q && q.id) catOf[q.id] = q.cat; });
    });

    var agg = {};
    OOT.profiles.list().forEach(function (p) {
      var key = p.legacy ? 'codexStats' : 'codexStats::' + p.id;
      var d;
      try { d = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return; }
      if (!d || !d.q) return;
      Object.keys(d.q).forEach(function (qid) {
        /* Stat keys carry the level prefix for non-certified levels, so strip
           anything before the last '|' before looking the question up. */
        var bare = qid.indexOf('|') >= 0 ? qid.slice(qid.lastIndexOf('|') + 1) : qid;
        var cat = catOf[bare] || catOf[qid];
        if (!cat) return;
        var s = d.q[qid];
        agg[cat] = agg[cat] || { name: cat, right: 0, answered: 0 };
        agg[cat].right += (s.c || 0);
        agg[cat].answered += (s.c || 0) + (s.w || 0);
      });
    });

    return Object.keys(agg).map(function (k) {
      var a = agg[k];
      return { name: a.name, answered: a.answered,
               accuracy: a.answered ? Math.round(a.right / a.answered * 100) : 0 };
    })
      /* Fewer than five answers is noise, not a gap. */
      .filter(function (g) { return g.answered >= 5; })
      .sort(function (a, b) { return a.accuracy - b.accuracy; });
  } catch (e) { return []; }
}

var _v14Render = render;
render = function () {
  if (S.view === 'oot-pass' && window.OOT && OOT.pass) {
    var app = document.getElementById('app');
    if (app) {
      var wrap = el('<div></div>');
      wrap.innerHTML = OOT.pass.view({
        gaps: ootCodexGaps(),
        gapsWing: 'the Codex',
        pathWing: 'codex',
        pathTotal: (typeof FIRST_PATH !== 'undefined') ? FIRST_PATH.length : 0
      });
      var back = el('<button class="btn" style="margin-top:18px">Back</button>');
      back.onclick = function () { S.view = 'home'; render(); };
      wrap.appendChild(back);
      app.innerHTML = '';
      app.appendChild(topbar());
      app.appendChild(wrap);
      OOT.pass.bind(app, function () {});
      return;
    }
  }
  return _v14Render.apply(this, arguments);
};

/* Answering anything counts as having studied today, in any wing. The streak
   lives on the profile rather than in this wing's stats, so it survives a level
   switch and travels with an export. statRecord is the single place the Codex
   writes a per-question result, which makes it the honest place to hook. */
(function () {
  if (typeof statRecord !== 'function') return;
  var _statRecord = statRecord;
  statRecord = function () {
    try {
      if (window.OOT && OOT.profiles) { OOT.profiles.markStudied(); OOT.profiles.touch(); }
    } catch (e) {}
    return _statRecord.apply(this, arguments);
  };
})();

/* Switching profile reloads the page, and that is handled in the shared layer
   (bindWho in shared/oot-home.js) rather than here. The first attempt swapped
   ST in place and crashed: codex8 reads ST.paceDays.certified without a guard,
   because codex2 and codex8 each normalise the store at boot and a runtime
   swap skips both. Reloading re-runs every layer's real initialisation, which
   is the only version of that logic guaranteed to stay correct. */

(function () {
  var css = document.createElement('style');
  css.textContent = '.oot-sec-grid{margin-top:0!important}';
  document.head.appendChild(css);
})();
