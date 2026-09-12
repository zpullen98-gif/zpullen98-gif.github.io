/* ═══════════════ CODEX XX: THE DEDUCTIVE GRID ═══════════════

   The blind flight this app shipped for a year printed a wine's own finished
   description and asked the student to pick its name from four. That is the
   examination inverted. Nobody hands a sommelier a description. What a
   sommelier is handed is a glass, and what they are trained to do is convert
   sensation into a call, and calls into a conclusion.

   So this grid gives sensation. Colour and rim, then the nose, then a line of
   evidence for each component in turn: the mouth waters and keeps watering,
   the gums feel scoured, warmth goes down the chest. The student calls the
   component from the evidence. Novices know the words for acid and tannin
   perfectly well and misread the sensations constantly, which is exactly the
   skill worth an hour a day.

   NOTHING IS REVEALED UNTIL THE GLASS IS FINISHED. Marking a call the moment
   it is made would hand over the answer for every call after it: a student
   told their acid call was high has been told the wine. The whole grid is
   shown at the end, the student's column beside the wine's, the way a real
   sheet is marked.

   HALF THE MARK IS STRUCTURE, HALF IS THE CONCLUSION, which is the owner's
   decision and the right one. A student who calls the structure correctly and
   names the wrong grape has done the work; a student who guesses Sancerre off
   the nose and cannot tell medium acid from high has done none of it, and the
   old flight would have scored the second one higher.

   NO CLOCK. The Court gives you twenty five minutes for six wines and that is
   a real constraint, but it is not the constraint worth training here, and the
   owner has taken the clock out of everything except the Lightning Round.

   TANNIN IS NOT ASKED OF A WHITE. A grid that asks teaches a student to answer
   questions nobody posed.

   State lives in S.tg for the sitting and ST.tgrid for the record: per grape
   and per component, so the app can eventually say which call a student keeps
   getting wrong. ST.tgrid carries a mergeStats clause, because a store nobody
   merges vanishes on import and this project has learned that four times. */

function v20Esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

ST.tgrid = ST.tgrid || {};

/* The grapes this rank taught, narrowed to those carrying a structure profile.
   GRAPES is rebound per rank by applyLevel, so this follows the rank without
   being told. */
function gridPool() {
  if (typeof GRAPES === 'undefined' || typeof TASTE === 'undefined') return [];
  return GRAPES.filter(function (g) { return !!tasteProfile(g.g); });
}

function gridCallsFor(isRed) {
  return TASTE_CALLS.filter(function (c) { return isRed || c.k !== 'tan'; });
}

/* ═══════════ a sitting ═══════════ */

function gridStart(n) {
  var pool = gridPool();
  if (!pool.length) return;
  var deck = shuffle(pool).slice(0, n || 6);
  S.tg = {
    deck: deck, idx: 0, step: 0,
    calls: {}, world: null, clim: null, grape: null,
    opts: [], revealed: false,
    struct: { n: 0, c: 0 }, concl: { n: 0, c: 0 },
    missed: []
  };
  stopTimer();
  if (S.qT) { clearInterval(S.qT); S.qT = null; }
  S.mode = null;
  S.view = 'grid';
  gridDealOpts();
  render();
  window.scrollTo(0, 0);
}

/* Four candidate grapes for the final conclusion: the true one and three of
   the same colour, preferring the ones its own `confuse` line names, which is
   how the existing flight picks distractors and is the right instinct. */
function gridDealOpts() {
  var tg = S.tg, g = tg.deck[tg.idx];
  if (!g) { tg.opts = []; return; }
  var same = gridPool().filter(function (x) { return x.c === g.c && x.g !== g.g; });
  var conf = String(g.confuse || '');
  same.sort(function (a, b) {
    var ap = conf.indexOf(a.g.split(' ')[0]) > -1 ? 0 : 1;
    var bp = conf.indexOf(b.g.split(' ')[0]) > -1 ? 0 : 1;
    return ap - bp;
  });
  var picks = same.slice(0, 6);
  picks = shuffle(picks).slice(0, 3);
  tg.opts = shuffle(picks.concat([g]).map(function (x) { return x.g; }));
}

function gridCurrent() { return S.tg && S.tg.deck[S.tg.idx]; }
function gridIsRed() { var g = gridCurrent(); return !!(g && g.c === 'r'); }

/* The ordered list of questions for this glass: the structure calls, then the
   two initial conclusions, then the grape. */
function gridQuestions() {
  var qs = gridCallsFor(gridIsRed()).map(function (c) {
    return { kind: 'call', k: c.k, label: c.label, ask: c.ask };
  });
  qs.push({ kind: 'world', label: 'Old World or New' });
  qs.push({ kind: 'clim', label: 'Climate' });
  qs.push({ kind: 'grape', label: 'The grape' });
  return qs;
}

/* The Codex wires handlers with element.onclick, not a delegated action
   registry: there is no FL_ACTS here, that is First Light's idiom. Every
   button below is bound in gridView after the markup is built. */
function gridPick(kind, k, val) {
  var tg = S.tg; if (!tg) return;
  if (kind === 'call') tg.calls[k] = Number(val);
  else if (kind === 'world') tg.world = val;
  else if (kind === 'clim') tg.clim = val;
  else if (kind === 'grape') tg.grape = val;
  tg.step++;
  if (tg.step >= gridQuestions().length) gridMark();
  render();
  window.scrollTo(0, 0);
}

function gridBack() {
  var tg = S.tg; if (!tg || tg.step <= 0) return;
  tg.step--;
  render();
}

/* Marking. Half the glass is the structure, half is the conclusion, and the
   conclusion half is itself split: the grape is worth as much as the world and
   the climate together, because naming it is the harder call. */
function gridMark() {
  var tg = S.tg, g = gridCurrent(), p = tasteProfile(g.g);
  var calls = gridCallsFor(gridIsRed());
  var rec = ST.tgrid[g.g] = ST.tgrid[g.g] || { n: 0, c: 0, f: {} };

  var structGot = 0;
  calls.forEach(function (c) {
    var ok = tg.calls[c.k] === p[c.k];
    if (ok) structGot++;
    var f = rec.f[c.k] = rec.f[c.k] || { n: 0, c: 0 };
    f.n++; if (ok) f.c++;
  });
  tg.struct.n += calls.length;
  tg.struct.c += structGot;

  var worldOk = tasteWorldOk(p, tg.world);
  var climOk = tg.clim === p.clim;
  var grapeOk = tg.grape === g.g;
  tg.concl.n += 4;
  tg.concl.c += (worldOk ? 1 : 0) + (climOk ? 1 : 0) + (grapeOk ? 2 : 0);

  rec.n++; if (grapeOk) rec.c++;
  if (!grapeOk) tg.missed.push(g.g);
  tg.revealed = true;
  stSave();
}

function gridNext() {
  var tg = S.tg; if (!tg) return;
  tg.idx++;
  tg.step = 0; tg.calls = {}; tg.world = null; tg.clim = null; tg.grape = null;
  tg.revealed = false;
  if (tg.idx < tg.deck.length) gridDealOpts();
  render();
  window.scrollTo(0, 0);
}

function gridAgain() { gridStart(S.tg ? S.tg.deck.length : 6); }

/* ═══════════ the view ═══════════ */

function gridBar(tg) {
  return '<div class="quizbar"><span>Blind Grid · Glass ' + (tg.idx + 1) +
    ' of ' + tg.deck.length + '</span><span>' +
    (tg.revealed ? 'marked' : 'calling') + '</span></div>';
}

function gridChoices(kind, k, items) {
  return '<div class="modes" style="margin-top:12px">' + items.map(function (it, i) {
    return '<button class="mode gridopt" data-kind="' + kind +
      '" data-k="' + v20Esc(k || '') + '" data-val="' + v20Esc(it.val) + '">' +
      '<h3>' + v20Esc(it.label) + '</h3>' +
      (it.note ? '<p>' + v20Esc(it.note) + '</p>' : '') + '</button>';
  }).join('') + '</div>';
}

function gridGlassHead(g, p) {
  var isRed = g.c === 'r';
  return '<div class="card"><p class="pt">In the glass</p>' +
    '<p class="px"><b>Sight.</b> ' + v20Esc(tasteSight(p, isRed)) + '</p>' +
    '<p class="px" style="margin-top:8px"><b>Nose, fruit.</b> ' + v20Esc(g.fruit || '') + '</p>' +
    '<p class="px" style="margin-top:8px"><b>Nose, everything else.</b> ' + v20Esc(g.other || '') + '</p>' +
    '</div>';
}

function gridRevealRow(label, mine, theirs, ok) {
  return '<div class="lgrow"><b>' + v20Esc(label) + '</b><span>' +
    'you called ' + v20Esc(mine) + ', it is ' + v20Esc(theirs) +
    (ok ? '' : ' · missed') + '</span></div>';
}

function gridRevealView(g, p, tg) {
  var calls = gridCallsFor(g.c === 'r');
  var rows = calls.map(function (c) {
    var mine = tg.calls[c.k], theirs = p[c.k];
    return gridRevealRow(c.label, TASTE_STEPS[mine] || 'nothing', TASTE_STEPS[theirs], mine === theirs);
  }).join('');

  var worldOk = tasteWorldOk(p, tg.world);
  var wLabel = function (k) { return k === 'old' ? 'Old World' : k === 'new' ? 'New World' : 'either'; };
  rows += gridRevealRow('Old or New', wLabel(tg.world), wLabel(p.world), worldOk);
  rows += gridRevealRow('Climate', tg.clim || 'nothing', p.clim, tg.clim === p.clim);
  rows += gridRevealRow('The grape', tg.grape || 'nothing', g.g, tg.grape === g.g);

  var last = (tg.idx + 1) >= tg.deck.length;
  return '<div class="card" style="margin-top:14px"><p class="pt">' + v20Esc(g.g) + '</p>' +
    '<p class="px" style="color:var(--ink-soft)">' + v20Esc(g.tell || '') + '</p>' +
    '<p class="px" style="margin-top:8px"><b>Where.</b> ' + v20Esc(g.regions || '') + '</p>' +
    '<p class="px" style="margin-top:8px"><b>Age.</b> ' + v20Esc(p.age) + '</p>' +
    (g.confuse ? '<p class="px" style="margin-top:8px"><b>Confused with.</b> ' + v20Esc(g.confuse) + '</p>' : '') +
    '</div>' +
    '<div class="label" style="margin-top:16px">Your grid against the wine</div>' + rows +
    '<div class="drawrow" style="margin-top:22px;justify-content:center">' +
      '<button class="btn gridgo" data-go="' + (last ? 'again' : 'next') + '">' +
        (last ? 'Pour another flight' : 'Next glass') + '</button>' +
    '</div>' +
    (last ? gridTally(tg) : '');
}

function gridTally(tg) {
  var sPct = tg.struct.n ? Math.round(100 * tg.struct.c / tg.struct.n) : 0;
  var cPct = tg.concl.n ? Math.round(100 * tg.concl.c / tg.concl.n) : 0;
  var overall = Math.round((sPct + cPct) / 2);
  var verdict = sPct >= 70
    ? 'Your structure calls are sound. That is the half that travels to every wine you will ever meet.'
    : 'Work the structure before the names. Acid and tannin are felt, not guessed, and every conclusion rests on them.';
  return '<div class="label" style="margin-top:26px">The flight</div>' +
    '<div class="lgrow"><b>Structure</b><span>' + tg.struct.c + ' of ' + tg.struct.n + ' · ' + sPct + '%</span></div>' +
    '<div class="lgrow"><b>Conclusion</b><span>' + tg.concl.c + ' of ' + tg.concl.n + ' · ' + cPct + '%</span></div>' +
    '<div class="lgrow"><b>Together</b><span>' + overall + '%</span></div>' +
    '<p class="px" style="margin-top:10px">' + verdict + '</p>' +
    (tg.missed.length ? '<p class="px" style="margin-top:8px;color:var(--gold-soft)">Named wrongly: ' +
      v20Esc(tg.missed.join(', ')) + '</p>' : '');
}

function gridView() {
  var tg = S.tg;
  if (!tg || !tg.deck.length) {
    return el('<div><div class="viewhead"><h2>The Blind Grid</h2>' +
      '<div class="sub">No grape at this rank carries a structure profile yet.</div></div></div>');
  }
  var g = gridCurrent(), p = tasteProfile(g.g);
  var body;

  if (tg.revealed) {
    body = gridBar(tg) + gridGlassHead(g, p) + gridRevealView(g, p, tg);
  } else {
    var qs = gridQuestions(), q = qs[tg.step];
    var head = gridBar(tg) + gridGlassHead(g, p);
    var prog = '<div class="label" style="margin-top:16px">Call ' + (tg.step + 1) +
      ' of ' + qs.length + ' · ' + v20Esc(q.label) + '</div>';
    var ask, choices;

    if (q.kind === 'call') {
      ask = '<p class="px" style="margin-bottom:4px">' + v20Esc(TASTE_EVIDENCE[q.k][p[q.k]]) + '</p>' +
        '<p class="px" style="color:var(--gold-soft)">' + v20Esc(q.ask) + '</p>';
      choices = gridChoices('call', q.k, TASTE_STEPS.map(function (s, i) {
        return { val: String(i), label: s };
      }));
    } else if (q.kind === 'world') {
      ask = '<p class="px">On what you have called so far, where was this grown?</p>';
      choices = gridChoices('world', '', TASTE_WORLD.map(function (w) {
        return { val: w.k, label: w.label };
      }));
    } else if (q.kind === 'clim') {
      ask = '<p class="px">And the climate it ripened in?</p>';
      choices = gridChoices('clim', '', TASTE_CLIM.map(function (c) {
        return { val: c.k, label: c.label };
      }));
    } else {
      ask = '<p class="px">Commit. Structure first, then the nose.</p>';
      choices = gridChoices('grape', '', tg.opts.map(function (n) {
        return { val: n, label: n };
      }));
    }

    body = head + prog + ask + choices +
      (tg.step > 0 ? '<div style="text-align:center;margin-top:16px">' +
        '<button class="readmini gridback">Back a call</button></div>' : '');
  }

  var v = el('<div>' + body + '</div>');
  v.querySelectorAll('.gridopt').forEach(function (b) {
    b.onclick = function () {
      gridPick(b.getAttribute('data-kind'), b.getAttribute('data-k'), b.getAttribute('data-val'));
    };
  });
  v.querySelectorAll('.gridgo').forEach(function (b) {
    b.onclick = function () { if (b.getAttribute('data-go') === 'again') gridAgain(); else gridNext(); };
  });
  v.querySelectorAll('.gridback').forEach(function (b) { b.onclick = gridBack; });
  return v;
}

/* ═══════════ wiring ═══════════ */

var _v20Render = render;
render = function () {
  if (S.view === 'grid') {
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    stopTimer();
    var app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(topbar());
    app.appendChild(gridView());
    window.scrollTo(0, 0);
    return;
  }
  return _v20Render.apply(this, arguments);
};

/* The door goes into the band codex19 built, so the examinations and the grid
   stand together rather than in two competing places. */
var _v20DecorateHome = (typeof decorateHome === 'function') ? decorateHome : null;
if (_v20DecorateHome) {
  decorateHome = function () {
    var out = _v20DecorateHome.apply(this, arguments);
    try {
      var band = document.getElementById('t-exams');
      if (!band) return out;
      var grid = band.querySelector('.modes');
      if (!grid || grid.querySelector('[data-exdoor="grid"]')) return out;
      var b = el('<button class="mode" data-exdoor="grid"><h3>The Blind Grid</h3>' +
        '<p>Six glasses. Call the structure from what you feel, then commit. Untimed.</p></button>');
      b.onclick = function () { gridStart(6); };
      grid.appendChild(b);
    } catch (e) { /* a missing tile never takes the home page down */ }
    return out;
  };
}

/* ═══════════ the merge clause ═══════════
   Counts take the larger of the two rather than the sum, for the reason
   codex17 exists: a count that sums is not idempotent and this store will be
   carried between a laptop and a phone and back. */
var _v20MergeStats = mergeStats;
mergeStats = function (inc) {
  var before = JSON.parse(JSON.stringify(ST.tgrid || {}));
  var out = _v20MergeStats.apply(this, arguments);
  try {
    var incoming = (inc && inc.stats && inc.stats.tgrid) || {};
    var merged = JSON.parse(JSON.stringify(before));
    Object.keys(incoming).forEach(function (g) {
      var a = merged[g] || { n: 0, c: 0, f: {} };
      var b = incoming[g] || {};
      var f = {};
      Object.keys(a.f || {}).forEach(function (k) { f[k] = { n: a.f[k].n || 0, c: a.f[k].c || 0 }; });
      Object.keys(b.f || {}).forEach(function (k) {
        var x = f[k] || { n: 0, c: 0 }, y = b.f[k] || {};
        f[k] = { n: Math.max(x.n, Number(y.n) || 0), c: Math.max(x.c, Number(y.c) || 0) };
      });
      merged[g] = {
        n: Math.max(Number(a.n) || 0, Number(b.n) || 0),
        c: Math.max(Number(a.c) || 0, Number(b.c) || 0),
        f: f
      };
    });
    ST.tgrid = merged;
  } catch (e) { ST.tgrid = before; }
  return out;
};
