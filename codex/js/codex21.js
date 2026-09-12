/* ═══════════════ CODEX XXI: THE FLOOR, AND THE PAIRING ═══════════════

   Two things a sommelier is examined on that no bank of recall questions can
   reach.

   THE FLOOR is judgement. A corked bottle at a four top, a cork that crumbles,
   a table forty minutes from a curtain, a guest who dislikes a wine that is
   perfectly sound. Every option offered is something a competent person might
   actually do, so the difference between the best and the second best is the
   whole lesson. Recall cannot be faked into judgement, and a multiple choice
   bank that asks what temperature to serve Champagne never touches it.

   THE PAIRING is mechanism. The app already holds two hundred and fifty
   questions about food and wine and every one of them asks what goes with
   what, which teaches a list. This asks what a dish NEEDS first: acid against
   fat, sweetness above heat, tannin meeting protein, bubbles scouring salt.
   Name the lever, then pick the wine that pulls it. A student who can name the
   lever can pair a dish they have never seen, and that is the entire point.

   Both are untimed, both are marked against a master's answer with the
   reasoning shown, and neither counts toward theory readiness: keyOwned is
   wrapped so a judgement key cannot inflate a rank the reader has not earned,
   which is the guard codex16 established for producer keys and codex12 for
   cellar keys.

   THE FINALS gains its other two pillars here. codex19 built a forty question
   theory paper; this chains a tasting section and a judgement section onto it
   so the sitting covers what the real examination covers, and reports all
   three separately, because an average across three different skills tells a
   reader nothing about which one is failing them.

   Data lives in data-floor.js and data-pairing.js. Both are optional at load:
   a tree without them loses these doors and keeps everything else. */

function v21Esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

ST.floor = ST.floor || {};
ST.pairs = ST.pairs || {};

function floorHave() { return typeof FLOOR !== 'undefined' && FLOOR && FLOOR.length; }
function pairHave() { return typeof PAIRS !== 'undefined' && PAIRS && PAIRS.length; }

/* The rank's own items, widened to the whole bank when a rank is thin, because
   a drill that runs out is worse than one pitched a little high. */
function byLevel(list, lvl) {
  var mine = list.filter(function (x) { return x.lvl === lvl; });
  return mine.length >= 4 ? mine : list;
}

/* ═══════════ the floor ═══════════ */

function floorStart(n) {
  if (!floorHave()) return;
  var deck = shuffle(byLevel(FLOOR, activeLevel)).slice(0, n || 8);
  S.fl = { deck: deck, idx: 0, picked: null, c: 0, n: 0 };
  stopTimer();
  if (S.qT) { clearInterval(S.qT); S.qT = null; }
  S.mode = null;
  S.view = 'floor';
  render();
  window.scrollTo(0, 0);
}

function floorPick(i) {
  var f = S.fl; if (!f || f.picked !== null) return;
  var it = f.deck[f.idx];
  f.picked = i;
  f.n++;
  var ok = i === it.best;
  if (ok) f.c++;
  var rec = ST.floor[it.id] = ST.floor[it.id] || { n: 0, c: 0 };
  rec.n++; if (ok) rec.c++;
  stSave();
  render();
}

function floorNext() {
  var f = S.fl; if (!f) return;
  f.idx++; f.picked = null;
  if (f.idx >= f.deck.length) { floorFinish(); return; }
  render();
  window.scrollTo(0, 0);
}

function floorFinish() {
  if (S._fin && S._fin.phase === 'floor') { finalsAfterFloor(); return; }
  S.view = 'floortally';
  render();
  window.scrollTo(0, 0);
}

function floorView() {
  var f = S.fl;
  if (!f || !f.deck.length) return el('<div><div class="viewhead"><h2>The Floor</h2><div class="sub">No scenarios are loaded.</div></div></div>');
  var it = f.deck[f.idx];
  var head = '<div class="quizbar"><span>The Floor · ' + (f.idx + 1) + ' of ' + f.deck.length +
    '</span><span>' + (f.picked === null ? 'your call' : 'marked') + '</span></div>';
  var situation = '<div class="card"><p class="px">' + v21Esc(it.s) + '</p></div>';

  var opts = '<div class="modes" style="margin-top:14px">' + it.opts.map(function (o, i) {
    var cls = 'mode flopt';
    if (f.picked !== null) {
      if (i === it.best) cls += ' correct';
      else if (i === f.picked) cls += ' wrong';
      else cls += ' dim';
    }
    return '<button class="' + cls + '" data-i="' + i + '"' + (f.picked !== null ? ' disabled' : '') + '>' +
      '<h3>' + v21Esc(o) + '</h3>' +
      (f.picked !== null && i === it.best ? '<p class="flmark">What a master does</p>' : '') +
      (f.picked !== null && i === f.picked && i !== it.best ? '<p class="flmark">Your call</p>' : '') +
      '</button>';
  }).join('') + '</div>';

  var why = f.picked === null ? '' :
    '<div class="card" style="margin-top:14px"><p class="pt">Why</p><p class="px">' +
      v21Esc(it.why) + '</p></div>' +
    '<div class="drawrow" style="justify-content:center;margin-top:18px">' +
      '<button class="btn flnext">' +
        ((f.idx + 1) >= f.deck.length ? 'Finish' : 'Next situation') + '</button></div>';

  var v = el('<div>' + head + situation + opts + why + '</div>');
  v.querySelectorAll('.flopt').forEach(function (b) {
    b.onclick = function () { floorPick(Number(b.getAttribute('data-i'))); };
  });
  v.querySelectorAll('.flnext').forEach(function (b) { b.onclick = floorNext; });
  return v;
}

function floorTallyView() {
  var f = S.fl, pct = f.n ? Math.round(100 * f.c / f.n) : 0;
  var v = el('<div><div class="viewhead"><h2>The Floor</h2>' +
    '<div class="sub">' + f.c + ' of ' + f.n + ' called the way a master would call them.</div></div>' +
    '<p class="px">Judgement is the part of this job that does not come from a book. ' +
    'Where you differed, read the reasoning again: the second best answer is usually the one ' +
    'that protects you rather than the guest.</p>' +
    '<div class="drawrow" style="justify-content:center;margin-top:20px">' +
    '<button class="btn flagain">Another set</button></div></div>');
  v.querySelectorAll('.flagain').forEach(function (b) { b.onclick = function () { floorStart(8); }; });
  return v;
}

/* ═══════════ the pairing ═══════════ */

var PAIR_LEVERS = [
  { k: 'acid', label: 'Acid', note: 'to cut fat and reset the palate' },
  { k: 'tannin', label: 'Tannin', note: 'to meet protein' },
  { k: 'low-tannin', label: 'Low tannin', note: 'because tannin would clash' },
  { k: 'sweet', label: 'Sweetness', note: 'to sit above the dish' },
  { k: 'body', label: 'Weight', note: 'to match the dish, not beat it' },
  { k: 'low-alc', label: 'Low alcohol', note: 'because alcohol makes heat worse' },
  { k: 'bubbles', label: 'Bubbles', note: 'to scour fat and salt' },
  { k: 'oak', label: 'Oak', note: 'to echo char or smoke' },
  { k: 'low-oak', label: 'No oak', note: 'because oak would bully the dish' }
];

function pairStart(n) {
  if (!pairHave()) return;
  var deck = shuffle(byLevel(PAIRS, activeLevel)).slice(0, n || 6);
  S.pr = { deck: deck, idx: 0, step: 0, levers: [], wine: null, lev: { n: 0, c: 0 }, win: { n: 0, c: 0 } };
  stopTimer();
  if (S.qT) { clearInterval(S.qT); S.qT = null; }
  S.mode = null;
  S.view = 'pairs';
  render();
  window.scrollTo(0, 0);
}

function pairToggle(k) {
  var p = S.pr; if (!p || p.step !== 0) return;
  var i = p.levers.indexOf(k);
  if (i >= 0) p.levers.splice(i, 1); else p.levers.push(k);
  render();
}

function pairCommitLevers() {
  var p = S.pr; if (!p || !p.levers.length) return;
  p.step = 1;
  render();
  window.scrollTo(0, 0);
}

function pairPickWine(i) {
  var p = S.pr; if (!p || p.step !== 1) return;
  var it = p.deck[p.idx];
  p.wine = i;
  p.step = 2;

  /* the levers are marked as a set: every one the dish needs, and none it does
     not, because naming an extra lever is as wrong as missing one */
  var want = it.needs.slice().sort().join(',');
  var got = p.levers.slice().sort().join(',');
  var levOk = want === got;
  p.lev.n++; if (levOk) p.lev.c++;
  var winOk = i === it.best;
  p.win.n++; if (winOk) p.win.c++;

  var rec = ST.pairs[it.id] = ST.pairs[it.id] || { n: 0, c: 0 };
  rec.n++; if (levOk && winOk) rec.c++;
  stSave();
  render();
  window.scrollTo(0, 0);
}

function pairNext() {
  var p = S.pr; if (!p) return;
  p.idx++; p.step = 0; p.levers = []; p.wine = null;
  if (p.idx >= p.deck.length) { pairFinish(); return; }
  render();
  window.scrollTo(0, 0);
}

function pairFinish() {
  if (S._fin && S._fin.phase === 'pairs') { finalsAfterPairs(); return; }
  S.view = 'pairtally';
  render();
  window.scrollTo(0, 0);
}

function pairView() {
  var p = S.pr;
  if (!p || !p.deck.length) return el('<div><div class="viewhead"><h2>Pairing</h2><div class="sub">No dishes are loaded.</div></div></div>');
  var it = p.deck[p.idx];
  var head = '<div class="quizbar"><span>Pairing · ' + (p.idx + 1) + ' of ' + p.deck.length +
    '</span><span>' + (p.step === 0 ? 'the lever' : p.step === 1 ? 'the wine' : 'marked') + '</span></div>';
  var dish = '<div class="card"><p class="pt">The dish</p><p class="px">' + v21Esc(it.dish) + '</p></div>';
  var body = '';

  if (p.step === 0) {
    body = '<div class="label" style="margin-top:16px">What does it need?</div>' +
      '<p class="px" style="color:var(--gold-soft)">Choose every lever the dish actually asks for, and nothing it does not.</p>' +
      '<div class="months" style="justify-content:flex-start;margin-top:10px">' +
      PAIR_LEVERS.map(function (l) {
        return '<button class="mchip prlev' + (p.levers.indexOf(l.k) >= 0 ? ' on' : '') +
          '" data-k="' + l.k + '">' + v21Esc(l.label) + '</button>';
      }).join('') + '</div>' +
      '<p class="px" style="margin-top:10px;color:var(--gold-soft)">' +
        v21Esc(PAIR_LEVERS.filter(function (l) { return p.levers.indexOf(l.k) >= 0; })
          .map(function (l) { return l.label + ' ' + l.note; }).join('. ')) + '</p>' +
      '<div class="drawrow" style="justify-content:center;margin-top:16px">' +
        '<button class="btn prgo"' + (p.levers.length ? '' : ' disabled') + '>Now the wine</button></div>';

  } else {
    body = '<div class="label" style="margin-top:16px">The wine</div>' +
      '<div class="modes" style="margin-top:10px">' + it.wines.map(function (w, i) {
        var cls = 'mode prwine';
        if (p.step === 2) {
          if (i === it.best) cls += ' correct';
          else if (i === p.wine) cls += ' wrong';
          else cls += ' dim';
        }
        return '<button class="' + cls + '" data-i="' + i + '"' + (p.step === 2 ? ' disabled' : '') + '>' +
          '<h3>' + v21Esc(w) + '</h3></button>';
      }).join('') + '</div>';

    if (p.step === 2) {
      var want = it.needs.map(function (k) {
        var l = PAIR_LEVERS.filter(function (x) { return x.k === k; })[0];
        return l ? l.label : k;
      }).join(', ');
      var mine = p.levers.map(function (k) {
        var l = PAIR_LEVERS.filter(function (x) { return x.k === k; })[0];
        return l ? l.label : k;
      }).join(', ');
      body += '<div class="lgrow" style="margin-top:14px"><b>The levers</b><span>you said ' +
        v21Esc(mine || 'nothing') + ', it needs ' + v21Esc(want) + '</span></div>' +
        '<div class="card" style="margin-top:12px"><p class="pt">Why</p><p class="px">' +
        v21Esc(it.why) + '</p></div>' +
        '<div class="drawrow" style="justify-content:center;margin-top:18px">' +
        '<button class="btn prnext">' + ((p.idx + 1) >= p.deck.length ? 'Finish' : 'Next dish') + '</button></div>';
    }
  }

  var v = el('<div>' + head + dish + body + '</div>');
  v.querySelectorAll('.prlev').forEach(function (b) {
    b.onclick = function () { pairToggle(b.getAttribute('data-k')); };
  });
  v.querySelectorAll('.prgo').forEach(function (b) { b.onclick = pairCommitLevers; });
  v.querySelectorAll('.prwine').forEach(function (b) {
    b.onclick = function () { pairPickWine(Number(b.getAttribute('data-i'))); };
  });
  v.querySelectorAll('.prnext').forEach(function (b) { b.onclick = pairNext; });
  return v;
}

function pairTallyView() {
  var p = S.pr;
  var lp = p.lev.n ? Math.round(100 * p.lev.c / p.lev.n) : 0;
  var wp = p.win.n ? Math.round(100 * p.win.c / p.win.n) : 0;
  var v = el('<div><div class="viewhead"><h2>Pairing</h2>' +
    '<div class="sub">Levers ' + lp + '%, wines ' + wp + '%.</div></div>' +
    '<p class="px">' + (lp >= wp
      ? 'You are reading the dish correctly, which is the half that carries to a menu you have never seen.'
      : 'You are picking good wines for the wrong reasons. Name the lever first and the wine follows.') +
    '</p><div class="drawrow" style="justify-content:center;margin-top:20px">' +
    '<button class="btn pragain">Another set</button></div></div>');
  v.querySelectorAll('.pragain').forEach(function (b) { b.onclick = function () { pairStart(6); }; });
  return v;
}

/* ═══════════ the Finals, in three pillars ═══════════

   codex19 built the theory paper and left the sitting there. A Court
   examination is theory, a blind flight and a practical, and a reader who is
   told one number across all three learns nothing about which is failing
   them. So the phases run in sequence and are reported apart. */

function finalsChainStart() {
  S._fin = { phase: 'theory', theory: null, grid: null, floor: null };
}

function finalsAfterTheory(correct, asked) {
  S._fin.theory = { c: correct, n: asked };
  if (typeof gridStart === 'function' && gridPool().length) {
    S._fin.phase = 'grid';
    gridStart(4);
    return true;
  }
  return finalsAfterGrid();
}

function finalsAfterGrid() {
  if (S.tg) S._fin.grid = { c: S.tg.struct.c + S.tg.concl.c, n: S.tg.struct.n + S.tg.concl.n };
  if (floorHave()) {
    S._fin.phase = 'floor';
    floorStart(6);
    return true;
  }
  return finalsReport();
}

function finalsAfterFloor() {
  S._fin.floor = { c: S.fl.c, n: S.fl.n };
  return finalsReport();
}

function finalsAfterPairs() { return finalsReport(); }

function finalsPct(x) { return x && x.n ? Math.round(100 * x.c / x.n) : null; }

function finalsReport() {
  S.view = 'finalsreport';
  render();
  window.scrollTo(0, 0);
  return true;
}

function finalsReportView() {
  var f = S._fin || {};
  var std = (typeof examStandard === 'function') ? examStandard() : 60;
  var rows = [
    ['Theory', finalsPct(f.theory), 'what you know'],
    ['Tasting', finalsPct(f.grid), 'what you can read in a glass'],
    ['The floor', finalsPct(f.floor), 'what you would do']
  ];
  var body = rows.map(function (r) {
    return '<div class="lgrow"><b>' + v21Esc(r[0]) + '</b><span>' +
      (r[1] === null ? 'not sat' : r[1] + '% · ' + v21Esc(r[2])) + '</span></div>';
  }).join('');

  var sat = rows.filter(function (r) { return r[1] !== null; });
  var weakest = sat.slice().sort(function (a, b) { return a[1] - b[1]; })[0];
  var advice = weakest
    ? (weakest[1] < std
        ? 'Your thinnest section is ' + v21Esc(weakest[0].toLowerCase()) + '. That is where the next month goes.'
        : 'All three sections are at or above the standard for this rank. Widen, do not repeat.')
    : '';

  var v = el('<div><div class="viewhead"><h2>The Finals</h2>' +
    '<div class="sub">Three sections, reported apart, because one number across three skills hides which is failing you.</div></div>' +
    '<p class="px">The standard at ' + v21Esc((LEVELS[activeLevel] && LEVELS[activeLevel].short) || activeLevel) +
      ' is ' + std + ' per cent in each.</p>' +
    '<div class="label" style="margin-top:18px">How it went</div>' + body +
    '<p class="px" style="margin-top:14px">' + advice + '</p>' +
    '<div class="drawrow" style="justify-content:center;margin-top:22px">' +
    '<button class="btn fnhome">Back</button></div></div>');
  v.querySelectorAll('.fnhome').forEach(function (b) {
    b.onclick = function () { S._fin = null; home(); };
  });
  return v;
}

/* codex19's finish records the exam; this intercepts the Finals before the
   results screen so the sitting can continue into its other two sections. */
var _v21Finish = finish;
finish = function () {
  if (S.mode === 'finals' && S._fin && S._fin.phase === 'theory') {
    var c = S.correct, n = S.results.length;
    var out = _v21Finish.apply(this, arguments);
    finalsAfterTheory(c, n);
    return out;
  }
  return _v21Finish.apply(this, arguments);
};

/* Grid completion inside a Finals moves to the floor rather than sitting on
   its own tally. */
var _v21GridAgain = (typeof gridAgain === 'function') ? gridAgain : null;
if (_v21GridAgain) {
  gridAgain = function () {
    if (S._fin && S._fin.phase === 'grid') { finalsAfterGrid(); return; }
    return _v21GridAgain.apply(this, arguments);
  };
}

var _v21StartFinals = (typeof startFinals === 'function') ? startFinals : null;
if (_v21StartFinals) {
  startFinals = function () {
    finalsChainStart();
    return _v21StartFinals.apply(this, arguments);
  };
}

/* ═══════════ views and doors ═══════════ */

var _v21Render = render;
render = function () {
  var app;
  if (S.view === 'floor' || S.view === 'floortally' || S.view === 'pairs' ||
      S.view === 'pairtally' || S.view === 'finalsreport') {
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    stopTimer();
    app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(topbar());
    app.appendChild(
      S.view === 'floor' ? floorView() :
      S.view === 'floortally' ? floorTallyView() :
      S.view === 'pairs' ? pairView() :
      S.view === 'pairtally' ? pairTallyView() :
      finalsReportView()
    );
    window.scrollTo(0, 0);
    return;
  }
  return _v21Render.apply(this, arguments);
};

var _v21DecorateHome = (typeof decorateHome === 'function') ? decorateHome : null;
if (_v21DecorateHome) {
  decorateHome = function () {
    var out = _v21DecorateHome.apply(this, arguments);
    try {
      var band = document.getElementById('t-exams');
      if (!band) return out;
      var grid = band.querySelector('.modes');
      if (!grid) return out;
      if (floorHave() && !grid.querySelector('[data-exdoor="floor"]')) {
        var b = el('<button class="mode" data-exdoor="floor"><h3>The Floor</h3>' +
          '<p>What you would actually do, when the bottle is corked and the curtain is in forty minutes.</p></button>');
        b.onclick = function () { floorStart(8); };
        grid.appendChild(b);
      }
      if (pairHave() && !grid.querySelector('[data-exdoor="pairs"]')) {
        var p = el('<button class="mode" data-exdoor="pairs"><h3>Pairing</h3>' +
          '<p>Name the lever the dish needs, then pull it. Mechanism, not a list.</p></button>');
        p.onclick = function () { pairStart(6); };
        grid.appendChild(p);
      }
    } catch (e) { }
    return out;
  };
}

/* Judgement and pairing never inflate a theory rank, the guard codex16 set
   for producer keys and codex12 for cellar keys. */
var _v21KeyOwned = (typeof keyOwned === 'function') ? keyOwned : null;
if (_v21KeyOwned) {
  keyOwned = function (k) {
    if (typeof k === 'string' && (k.indexOf('fl-') === 0 || k.indexOf('pr-') === 0)) return false;
    return _v21KeyOwned.apply(this, arguments);
  };
}

/* ═══════════ merge clauses ═══════════ */
var _v21MergeStats = mergeStats;
mergeStats = function (inc) {
  var before = {
    floor: JSON.parse(JSON.stringify(ST.floor || {})),
    pairs: JSON.parse(JSON.stringify(ST.pairs || {}))
  };
  var out = _v21MergeStats.apply(this, arguments);
  try {
    ['floor', 'pairs'].forEach(function (store) {
      var incoming = (inc && inc.stats && inc.stats[store]) || {};
      var merged = JSON.parse(JSON.stringify(before[store]));
      Object.keys(incoming).forEach(function (id) {
        var a = merged[id] || { n: 0, c: 0 }, b = incoming[id] || {};
        merged[id] = {
          n: Math.max(Number(a.n) || 0, Number(b.n) || 0),
          c: Math.max(Number(a.c) || 0, Number(b.c) || 0)
        };
      });
      ST[store] = merged;
    });
  } catch (e) { ST.floor = before.floor; ST.pairs = before.pairs; }
  return out;
};
