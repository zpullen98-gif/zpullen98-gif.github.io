/* =============== CODEX XXV: FOUR LEVELS, ONE HOME ===============

   The home was thirty-odd tiles in bands, and the four ranks were one row
   among them: tapping a rank re-scoped the same long page rather than opening
   anything. The owner asked for one home across the three apps of the family
   (the World Table, this Codex and the Bartender's Ledger): the four levels as
   the spine, each level broken into the same subsections at its own
   difficulty, and one quiet row of doors that are not study. This layer is
   the Codex's half of that shared contract.

   WHAT THE HOME IS, EXACTLY. `#view` holds two things and nothing else:

     <section class="levels" aria-label="Levels">   four button.level cards,
        data-level 1 to 4, ids lv-1 to lv-4, each lv-num, lv-name, lv-stat;
        the current one carries class "on", aria-pressed="true" and the words
        "Your level", so the state is never carried by colour alone
     <nav class="quiet" aria-label="Doors">          four doors, ids door-today,
        door-library, door-record, door-mine, each a door-name and a line

   The non-affiliation line COMPLIANCE.md requires leaves the hero it used to
   sit in and becomes a footer.colophon beside #view, in both trees.

   THE FIGURE. A card reads Untouched, then N% met, then Met. N is the MEAN of
   the level's counted subsections' shares (the domains, Tasting, The Floor,
   Pairing and Service; an empty one is left out), clamped to 1..99 so it never
   prints 0% or 100%. A mean rather than a pooled sum, so a question bank of a
   thousand cannot hide a floor of eleven. A question is met once it has been
   answered right once (ST.q[k].c >= 1); the Dashboard's "faced" and Readiness
   stay inside the Record. "The whole paper" is not counted, because it is the
   domains again, and says so in words where a figure would be.

   HOW IT TAKES OVER WITHOUT TOUCHING AN EARLIER FILE. Every decorateHome hook
   in the chain guards on a class this home does not carry (.hero, .modes,
   .mode, .homesec, .oot-sec, .courtstrip, .codexdoors, .codexdoor-row,
   .studyline and the old tile ids), so this layer reassigns homeView and the
   whole chain runs and does nothing. HOME_SECTIONS (codex14) and V22_TILES
   (codex22) are dead data from here on, kept because deleting them would be
   an edit to two diverged files.

   EVERY DOOR CALLS ITS HANDLER BY GLOBAL NAME AT CLICK TIME, and sets the
   state the old tile set first (S.tt before tasting, S.cmp before the
   Compendium, S._prod before the producers, S.wmap before the world map,
   S._desk before the Menu Desk, v24OpenMaitre before her screen). The wing
   loads shared/oot-locks.js after this file and wraps applyLevel and the
   cellar drills by name, so a lock the wing turns on is honoured here the
   moment it refuses, and while the edition is free nothing refuses.

   THE REGISTRIES. V25_TRAIN (the training doors of the level page),
   V25_LIBRARY, V25_RECORD and V25_MINE (the rows of those three pages) are
   the only places a destination is named; V25_GO is built from them and is
   what every data-go resolves through. .scripts/check-home.js reads them.

   THE LEVEL TEST IS THE FINALS, made scoreless by wrappers: the labels are
   renamed, the misses are captured theory, glass and floor, the grid's
   mid-test tally is dropped, and the report is replaced by what you missed,
   with the right answers, and no score. ST.exams still records the sitting,
   because that belongs to the Record.

   ONE NEW PIECE OF STATE, and it is not in ST: codexLevelChosen, a
   device-local flag written only when a person taps a level card (through
   OOT.profiles.key in the wing). A device that has never chosen opens on the
   lowest level not yet met; a device with answers and no flag is grandfathered
   on the level it already had.

   House rules observed: a new layer and no edits to earlier files; var and
   function only at the top level; CSS injected from here (codex.css is not
   touched); British English; no pictorial glyphs; no long dashes; every
   control at least 44px; the same file byte for byte in the standalone and in
   the Outside Of Time wing, with every wing global feature-detected. */

/* =========== the levels =========== */

var V25_LEVELS = [
  { n: 1, key: 'intro', num: 'I', name: 'Régionale',
    blurb: 'The whole district in one glass: the foundations, the world map and the classics, all of it multiple choice, and speed and certainty win it.' },
  { n: 2, key: 'certified', num: 'II', name: 'Village',
    blurb: 'Narrowing to a village means naming what you are given: multiple choice, matching and short answer, so you produce the answer rather than pick it.' },
  { n: 3, key: 'advanced', num: 'III', name: 'Premier Cru',
    blurb: 'A named parcel is claimed, not guessed: short answer deep in appellation law, producers and vintages, produced cold, because recognition is no longer enough.' },
  { n: 4, key: 'master', num: 'IV', name: 'Grand Cru',
    blurb: 'Grand cru needs no qualifier and neither may you: every answer from memory with nothing to lean on, in your own words, graded on your honour.' }
];

var V25_NONAFFIL = 'An independent study tool. Not affiliated with, endorsed by, or connected to the Court of Master Sommeliers.';

/* Level I's chapters are HTML bodies keyed by their own id and carry no
   category, so a section's Chapter door is found through this map. A section
   with no chapter of its own simply has no Chapter door. Where a category
   spans several chapters, the door opens the first and the chapter's own
   "All chapters" button leads on. */
var V25_INTRO_CHAPTERS = {
  'Alsace': 'alsace', 'Australia': 'australia', 'Austria': 'austria', 'Beer': 'beer',
  'Bordeaux': 'bordeaux', 'Burgundy': 'burgundy', 'Champagne': 'champagne',
  'Dessert & Sweet Wines': 'sweet', 'Germany': 'germany', 'Italy': 'piedmont',
  'Loire': 'loire', 'New Zealand': 'nz', 'Portugal': 'portugal', 'Rhône': 'rhone',
  'Sake & Spirits': 'sake', 'Soil & Terroir': 'vit', 'South Africa': 'safrica',
  'South America': 'chile', 'Spain': 'galicia', 'Sparkling/Fortified/Sweet': 'sparkling',
  'United States': 'calnorth', 'Viticulture & Winemaking': 'vit', 'Winemaking Techniques': 'vin'
};

function v25Esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function v25Num(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

function v25Plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

var V25_ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
  'eighteen', 'nineteen'];
var V25_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/* A count said in words, for the few lines that promise a shape rather than
   a score: the level test's own line carries no digit. */
function v25Words(n) {
  n = Math.max(0, Math.floor(Number(n) || 0));
  if (n < 20) return V25_ONES[n];
  if (n < 100) return V25_TENS[Math.floor(n / 10)] + (n % 10 ? '-' + V25_ONES[n % 10] : '');
  return v25Num(n);
}

function v25Cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

function v25Level(lv) {
  for (var i = 0; i < V25_LEVELS.length; i++) if (V25_LEVELS[i].key === lv) return V25_LEVELS[i];
  return null;
}

/* The levels this tree actually carries, in LEVEL_ORDER. */
function v25Present() {
  return V25_LEVELS.filter(function (L) { return typeof LEVELS !== 'undefined' && !!LEVELS[L.key]; });
}

function v25Here() { return v25Level(activeLevel) || V25_LEVELS[1]; }

/* =========== the met rule =========== */

/* codex7's key shape: Village keys are unprefixed, every other level's carry
   its key and a bar, so a record made before the levels existed still reads. */
function v25Prefix(lv) { return lv === 'certified' ? '' : lv + '|'; }

/* Per category: how many questions the level holds, and how many of them have
   been answered right at least once. keyOwned is still consulted, so a key
   that belongs to the cellar, the producers or the floor never counts. */
function v25CatTally(lv) {
  var by = {};
  var L = (typeof LEVELS !== 'undefined') ? LEVELS[lv] : null;
  if (!L || !L.bank) return by;
  var pre = v25Prefix(lv);
  var q = (ST && ST.q) || {};
  var owned = (typeof keyOwned === 'function') ? keyOwned : null;
  L.bank.forEach(function (x) {
    var k = pre + missKey(x);
    if (owned && !owned(k, lv)) return;
    var t = by[x.cat] || (by[x.cat] = { met: 0, total: 0 });
    t.total++;
    var r = q[k];
    if (r && Number(r.c) >= 1) t.met++;
  });
  return by;
}

/* The level's whole theory bank: {met, total}, the theory share. The card
   reads it through the domains, never as a subsection of its own. */
function v25Met(lv) {
  var by = v25CatTally(lv), met = 0, total = 0;
  Object.keys(by).forEach(function (c) { met += by[c].met; total += by[c].total; });
  return { met: met, total: total };
}

/* The clamp every app in the family uses: a share that is neither nothing nor
   everything never prints as 0% or 100%. */
function v25Figure(share) {
  var n = Math.round(100 * (Number(share) || 0));
  return Math.max(1, Math.min(99, n));
}

function v25MetWord(met, total) {
  met = Number(met) || 0; total = Number(total) || 0;
  if (met <= 0) return 'Untouched';
  if (met >= total) return 'Met';
  return v25Figure(met / total) + '% met';
}

/* The seven bands, per level, exactly as codex19's examDomains builds them for
   the level being sat (the More bucket included), so a category added to a
   bank can never fall out of a level page. */
function v25Domains(lv) {
  var L = (typeof LEVELS !== 'undefined') ? LEVELS[lv] : null;
  if (!L || !L.bank) return [];
  var c = {};
  L.bank.forEach(function (q) { c[q.cat] = (c[q.cat] || 0) + 1; });
  var groups = L.groups || [];
  var grouped = {};
  groups.forEach(function (g) { g[1].forEach(function (k) { grouped[k] = 1; }); });
  var out = groups.map(function (g) {
    return [g[0], g[1].filter(function (k) { return c[k]; })];
  }).filter(function (g) { return g[1].length; });
  var extras = Object.keys(c).filter(function (k) { return !grouped[k]; }).sort();
  if (extras.length) out.push(['More', extras]);
  return out;
}

/* The grapes a level tastes: its own list, narrowed to those carrying a
   structure profile, which is what codex20's grid deals. */
function v25Grapes(lv) {
  var L = (typeof LEVELS !== 'undefined') ? LEVELS[lv] : null;
  if (!L || !L.grapes || typeof tasteProfile !== 'function') return [];
  return L.grapes.filter(function (g) { return !!tasteProfile(g.g); });
}

function v25Own(list, lv) {
  return (list || []).filter(function (x) { return x && x.lvl === lv; });
}

function v25FloorList() { return (typeof FLOOR !== 'undefined' && FLOOR) ? FLOOR : []; }
function v25PairList() { return (typeof PAIRS !== 'undefined' && PAIRS) ? PAIRS : []; }

/* How many a drill deals at this level: codex21's byLevel widens a level with
   fewer than four of its own to the whole list. */
function v25Dealt(list, lv) {
  var own = v25Own(list, lv);
  return own.length >= 4 ? own.length : list.length;
}

function v25CountLine(n, widened, noun) {
  var line = v25Num(n) + ' at this level';
  if (widened) line += n ? ' · the drill adds ' + noun + ' from every level' : ' · the drill deals from every level';
  return line;
}

var V25_PAPER_WORD = 'Counted in the domains above';

/* The twelve subsections of a level, in order: the domains, The whole paper,
   Tasting, The Floor, Pairing, Service. Each carries met and total; `counted`
   says whether it feeds the card. */
function v25Subs(lv) {
  if (typeof LEVELS === 'undefined' || !LEVELS[lv]) return [];
  var tally = v25CatTally(lv);
  var subs = v25Domains(lv).map(function (d) {
    var met = 0, total = 0;
    d[1].forEach(function (c) { var t = tally[c] || { met: 0, total: 0 }; met += t.met; total += t.total; });
    return {
      kind: 'domain', name: d[0], cats: d[1], met: met, total: total, counted: true, tally: tally,
      line: v25Plural(d[1].length, 'section', 'sections') + ' · ' + v25Num(total) + ' at this level'
    };
  });

  var paper = v25Met(lv);
  subs.push({ kind: 'paper', name: 'The whole paper', met: paper.met, total: paper.total, counted: false,
    line: v25Num(paper.total) + ' at this level' });

  var tgrid = (ST && ST.tgrid) || {};
  var grapes = v25Grapes(lv);
  var tMet = grapes.filter(function (g) { return tgrid[g.g] && Number(tgrid[g.g].c) >= 1; }).length;
  subs.push({ kind: 'tasting', name: 'Tasting', met: tMet, total: grapes.length, counted: true,
    line: v25Num(grapes.length) + ' at this level' });

  var floorOwn = v25Own(v25FloorList(), lv);
  var fl = (ST && ST.floor) || {};
  subs.push({ kind: 'floor', name: 'The Floor', counted: true, total: floorOwn.length,
    met: floorOwn.filter(function (x) { return fl[x.id] && Number(fl[x.id].c) >= 1; }).length,
    line: v25CountLine(floorOwn.length, floorOwn.length < 4 && v25FloorList().length > floorOwn.length, 'situations') });

  var pairOwn = v25Own(v25PairList(), lv);
  var pr = (ST && ST.pairs) || {};
  subs.push({ kind: 'pairs', name: 'Pairing', counted: true, total: pairOwn.length,
    met: pairOwn.filter(function (x) { return pr[x.id] && Number(pr[x.id].c) >= 1; }).length,
    line: v25CountLine(pairOwn.length, pairOwn.length < 4 && v25PairList().length > pairOwn.length, 'dishes') });

  var svc = (typeof serviceReadiness === 'function') ? serviceReadiness() : { done: 0, total: 0 };
  subs.push({ kind: 'service', name: 'Service', counted: true, met: Number(svc.done) || 0,
    total: Number(svc.total) || 0, line: v25Num(Number(svc.total) || 0) + ' at this level' });

  /* an uncounted subsection says so in place of a figure, as the contract
     asks, so every figure on the page is one the card is made of */
  subs.forEach(function (s) {
    s.word = s.kind === 'paper' ? V25_PAPER_WORD : s.total ? v25MetWord(s.met, s.total) : 'Nothing to meet here yet';
  });
  return subs;
}

/* The card: Untouched when nothing counted is met, Met when every counted
   item is, otherwise the mean of the counted subsections' shares, clamped. */
function v25StatOf(subs) {
  var counted = (subs || []).filter(function (s) { return s.counted && s.total > 0; });
  var any = counted.some(function (s) { return s.met > 0; });
  var all = counted.length > 0 && counted.every(function (s) { return s.met >= s.total; });
  if (!any) return { word: 'Untouched', share: 0, met: false };
  if (all) return { word: 'Met', share: 1, met: true };
  var mean = counted.reduce(function (a, s) { return a + s.met / s.total; }, 0) / counted.length;
  return { word: v25Figure(mean) + '% met', share: mean, met: false };
}

function v25LevelStat(lv) { return v25StatOf(v25Subs(lv)); }

/* The lowest level whose card does not read Met; the highest when all do. */
function v25FirstUnmet() {
  var present = v25Present();
  for (var i = 0; i < present.length; i++) {
    if (!v25LevelStat(present[i].key).met) return present[i].key;
  }
  return present.length ? present[present.length - 1].key : 'certified';
}

/* =========== the chosen level =========== */

function v25ChosenKey() {
  try {
    return (typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function')
      ? OOT.profiles.key('codexLevelChosen') : 'codexLevelChosen';
  } catch (e) { return 'codexLevelChosen'; }
}

function v25Chosen() {
  try { return !!localStorage.getItem(v25ChosenKey()); } catch (e) { return false; }
}

function v25Choose() {
  try { localStorage.setItem(v25ChosenKey(), '1'); } catch (e) { }
}

/* codex7 writes codexLevel even when it only defaulted, so the stored rank
   cannot say whether anybody chose it. The flag can. A device with answers
   and no flag chose by studying, and keeps the level it has; a device with
   neither opens on the lowest level not yet met, so "Today deals from Level
   N" is true by construction: the daily round reads the rebound QUESTIONS.
   Grandfathering writes nothing: codex7 restores the level on every load, and
   after a reset has emptied ST.q the device is a fresh one again. */
(function () {
  try {
    if (v25Chosen()) return;
    var answered = !!(ST && ST.q && Object.keys(ST.q).length);
    if (answered) return;
    var lv = v25FirstUnmet();
    if (lv && lv !== activeLevel && LEVELS[lv]) applyLevel(lv, true);
  } catch (e) { /* the level codex7 restored stands */ }
})();

/* A lock the wing has switched on, read from the gate the wing's own wrapper
   asks. Never true while the edition is free. */
function v25Locked(lv) {
  try {
    return typeof OOT !== 'undefined' && !!OOT && !!OOT.gate && typeof OOT.gate.allow === 'function'
      && !OOT.gate.allow('codex', lv);
  } catch (e) { return false; }
}

function v25Wing() {
  try {
    return typeof OOT !== 'undefined' && !!OOT && !!OOT.home && typeof OOT.home.todayCard === 'function';
  } catch (e) { return false; }
}

/* =========== leaving, and moving =========== */

/* core's home() teardown, for the three nav words that do not go home: the
   clock, the lightning timer, the voice, the oral flags, a Finals chain left
   half sat. The wing's own guard on a live mock is asked first, and an
   abandoned sitting is recorded the way the wing records it, on its way
   home. */
function v25Leave() {
  if (typeof leaveSitting === 'function') {
    try { if (!leaveSitting()) return false; } catch (e) { }
  }
  if (S.abandoned) { try { home(); } catch (e) { } }
  try { stopTimer(); } catch (e) { }
  if (S.qT) { clearInterval(S.qT); S.qT = null; }
  if (typeof speakStop === 'function') { try { speakStop(); } catch (e) { } }
  S._spokenFor = null; S._oralUngraded = false; S._oral = false;
  S.mode = null; S._fin = null; S._v25lt = null;
  return true;
}

function v25FocusMain() {
  try {
    var m = document.getElementById('view');
    if (!m || typeof m.focus !== 'function') return;
    if (typeof m.hasAttribute === 'function' && !m.hasAttribute('tabindex')) m.setAttribute('tabindex', '-1');
    try { m.focus({ preventScroll: true }); } catch (e) { m.focus(); }
  } catch (e) { }
}

function v25ChooseLevel(lv) {
  if (typeof LEVELS === 'undefined' || !LEVELS[lv]) return;
  if (!v25Leave()) return;
  if (lv !== activeLevel) applyLevel(lv, true);
  if (activeLevel !== lv) {
    /* the wing's lock refused: activeLevel is unchanged and the home repaints */
    S.view = 'home';
    render();
    return;
  }
  v25Choose();
  S._v25area = 'levels';
  S.view = 'level';
  render();
  v25FocusMain();
}

/* =========== the registries =========== */

function v25OpenChapter(cat) {
  if (activeLevel === 'intro') {
    var id = V25_INTRO_CHAPTERS[cat], idx = -1;
    (PRIMERS || []).forEach(function (p, i) { if (idx < 0 && p && p.id === id) idx = i; });
    if (idx < 0) return;
    S.primerKey = idx;
  } else {
    S.primerKey = cat;
  }
  S.view = 'primer';
  render();
}

function v25HasChapter(cat, lv) {
  lv = lv || activeLevel;
  var L = (typeof LEVELS !== 'undefined') ? LEVELS[lv] : null;
  var list = (L && L.primers) || [];
  if (lv === 'intro') {
    var id = V25_INTRO_CHAPTERS[cat];
    return !!id && list.some(function (p) { return p && p.id === id; });
  }
  return list.some(function (p) { return p && p.cat === cat; });
}

var V25_TRAIN = {
  chapter: { label: 'Chapter', go: function (cat) { v25OpenChapter(cat); } },
  drill: { label: 'Drill', go: function (cat) { startDrill(cat); } },
  secexam: { label: 'Exam', go: function (cat) { startSectionExam(cat); } },
  domexam: { label: 'Domain exam', go: function (label) { startDomainExam(label); } },
  weak: { label: 'Weakness Review', go: function () { startWeakness(); } },
  endless: { label: 'Endless', go: function () { startEndless(); } },
  lightning: { label: 'Lightning Round', go: function () { startLightning(); } },
  sudden: { label: 'Sudden Death', go: function () { startSudden(); } },
  review: { label: 'Review misses', go: function () { startReview(); } },
  grid: { label: 'The Blind Grid', go: function () { gridStart(6); } },
  flight: { label: 'Blind flight', go: function () { S.tt = null; startTastingFlight(); } },
  /* the grid reference the old tasting tile's hall offered beside the flight */
  tastegrid: { label: 'Study the grid', go: function () { S.view = 'tastegrid'; render(); } },
  flash: { label: 'Grape flashcards', go: function () { startFlash(); } },
  floor: { label: 'The Floor', go: function () { floorStart(8); } },
  pairs: { label: 'Pairing', go: function () { pairStart(6); } },
  service: { label: 'The Service Ritual', go: function () { S.view = 'service'; render(); } },
  leveltest: { label: 'The level test', go: function () { startFinals(); } },
  backlevel: { label: 'Back to the level', go: function () { S.view = 'level'; render(); } }
};

function v25MapSheets() {
  try { return (typeof v23Sheets === 'function') ? v23Sheets() : []; } catch (e) { return []; }
}

function v25QuestionsAll() {
  var seen = {}, n = 0;
  (typeof LEVEL_ORDER !== 'undefined' ? LEVEL_ORDER : []).forEach(function (lv) {
    var L = LEVELS[lv];
    if (!L || !L.bank) return;
    L.bank.forEach(function (q) { var k = q.id || q.q; if (seen[k]) return; seen[k] = 1; n++; });
  });
  return n;
}

var V25_LIBRARY = [
  { key: 'compendium', name: 'The Compendium',
    show: function () { return typeof compendiumView === 'function'; },
    line: function () {
      try {
        var regions = INTRO_ATLAS.reduce(function (a, c) { return a + c.r.length; }, 0);
        return regions + ' regions · ' + INTRO_CLASS.length + ' classifications · ' + INTRO_GRAPES.length + ' grapes';
      } catch (e) { return 'maps, classifications, soils and grapes'; }
    },
    go: function () { S.cmp = null; S.view = 'compendium'; render(); } },
  { key: 'ency', name: 'Encyclopedia',
    show: function () { return typeof encyView === 'function'; },
    line: function () { return 'search ' + v25Num(v25QuestionsAll()) + ' questions · every level'; },
    go: function () { S.view = 'ency'; render(); } },
  { key: 'producers', name: 'The Producers',
    show: function () { return typeof prodView === 'function'; },
    line: function () {
      try { return v25Num(prodCorpus().length) + ' estates and icon wines'; }
      catch (e) { return 'estates and icon wines'; }
    },
    go: function () { S._prod = { c: null, id: null }; S.view = 'producers'; render(); } },
  { key: 'worldmap', name: 'The World Map',
    show: function () { return v25MapSheets().length > 0; },
    line: function () {
      var have = v25MapSheets();
      var regions = 0;
      try { regions = have.reduce(function (a, s) { return a + mapRegions(s.id).length; }, 0); } catch (e) { }
      return v25Plural(have.length, 'map', 'maps') + (regions ? ' · ' + regions + ' regions' : '');
    },
    go: function () { S.wmap = null; S.view = 'worldmap'; render(); } },
  { key: 'primers', name: 'Study Chapters',
    show: function () { return typeof primerList === 'function'; },
    line: function () {
      var n = (typeof PRIMERS !== 'undefined' && PRIMERS) ? PRIMERS.length : 0;
      return v25Plural(n, 'chapter', 'chapters') + ' at Level ' + v25Here().num;
    },
    go: function () { S.view = 'primers'; render(); } },
  { key: 'videos', name: 'Video Scriptorium',
    show: function () { return typeof vidView === 'function'; },
    line: function () {
      try {
        var rows = VIDEOS.reduce(function (a, g) { return a + g.rows.length; }, 0);
        return rows + ' viewings · ' + VIDEOS.length + ' topics · needs a connection';
      } catch (e) { return 'curated viewing'; }
    },
    go: function () { S.vidFocus = null; S.view = 'videos'; render(); } },
  { key: 'terroir', name: 'Terroir Atlas',
    show: function () { return typeof refView === 'function'; },
    line: function () {
      try {
        var regions = TERROIR.reduce(function (a, c) { return a + c.regions.length; }, 0);
        return TERROIR.length + ' countries · ' + regions + ' regions';
      } catch (e) { return 'climate, soil, region by region'; }
    },
    go: function () { S.view = 'terroir'; render(); } }
];

function v25Disputes() {
  try { return graderDisputes().length + badReports().length; } catch (e) { return 0; }
}

function v25Flags() {
  try { return lvlFlags().length; } catch (e) { return 0; }
}

var V25_RECORD = [
  { key: 'dash', name: 'Dashboard',
    show: function () { return typeof dashView === 'function'; },
    line: function () { return 'accuracy, coverage and readiness at Level ' + v25Here().num; },
    go: function () { S.view = 'dash'; render(); } },
  { key: 'hall', name: 'Hall of Fame',
    show: function () { return typeof hallView === 'function'; },
    line: function () {
      try { return ST.ach.length + ' of ' + ACHIEVEMENTS.length + ' honours claimed'; }
      catch (e) { return 'honours claimed'; }
    },
    go: function () { S.view = 'hall'; render(); } },
  { key: 'sync', name: 'Progress Transfer',
    show: function () { return typeof syncView === 'function'; },
    line: function () {
      var h = (ST && ST.hist) ? ST.hist.length : 0;
      var n = (ST && ST.notes) ? Object.keys(ST.notes).length : 0;
      return v25Plural(h, 'session', 'sessions') + ' · ' + v25Plural(n, 'note', 'notes') + ' · export, import, merge';
    },
    go: function () { S.view = 'sync'; render(); } },
  { key: 'maitre', name: 'The Maître d’',
    show: function () { return typeof maitreView === 'function'; },
    line: function () {
      var can = false;
      try { can = !!((typeof v24Maitre === 'function' && v24Maitre()) || (typeof v24MaitreLoadable === 'function' && v24MaitreLoadable())); } catch (e) { }
      if (can && typeof V24_HERS !== 'undefined') return V24_HERS;
      if (!can && typeof V24_NOT_IN_BUILD !== 'undefined') return V24_NOT_IN_BUILD;
      return 'optional · online · your own key';
    },
    go: function () {
      if (typeof v24OpenMaitre === 'function' && v24OpenMaitre()) return;
      S.view = 'maitre'; render();
    } },
  { key: 'flagged', name: 'Bookmark Review',
    show: function () { return typeof startFlagged === 'function' && v25Flags() > 0; },
    line: function () { return v25Flags() + ' bookmarked at Level ' + v25Here().num; },
    go: function () { startFlagged(); } },
  { key: 'exams', name: 'Examination record',
    show: function () { return typeof examHallView === 'function'; },
    line: function () { return 'section exams, domain exams and the level test, untimed'; },
    go: function () { S.view = 'exams'; render(); } },
  { key: 'plan', name: 'The Study Plan',
    show: function () { return typeof planView === 'function'; },
    line: function () {
      var iso = null;
      try { iso = examDate(activeLevel); } catch (e) { }
      return iso ? 'your sitting is set for ' + iso : 'set your sitting date and the Codex prescribes the day';
    },
    go: function () { S.view = 'plan'; render(); } },
  { key: 'disputes', name: 'Content Report',
    show: function () { return typeof disputesView === 'function' && v25Disputes() > 0; },
    line: function () { return v25Plural(v25Disputes(), 'report or dispute', 'reports and disputes'); },
    go: function () { S.view = 'disputes'; render(); } }
];

function v25Bottles() { return (ST && ST.cellar) ? ST.cellar.length : 0; }

/* Wines another app of the family has left at the shared desk. */
function v25Waiting() {
  try {
    var file = (typeof v24Inbox === 'function') ? v24Inbox() : null;
    return file ? { file: file, n: v24Share(file, 'wine').length } : { file: null, n: 0 };
  } catch (e) { return { file: null, n: 0 }; }
}

var V25_MINE = [
  { key: 'cellar', name: 'Our Wine List',
    show: function () { return typeof cellarView === 'function'; },
    line: function () {
      var n = v25Bottles();
      return n ? v25Plural(n, 'bottle', 'bottles') + ' on the list' : 'Enter the list the guest is holding';
    },
    go: function () { S.view = 'cellar'; render(); } },
  { key: 'cellardrill', name: 'Drill our list',
    show: function () { return typeof startCellarDrill === 'function'; },
    line: function () { return v25Bottles() >= 3 ? 'grapes, regions, pours and producers' : 'three bottles make a drill'; },
    go: function () { startCellarDrill(); } },
  { key: 'cellarrecite', name: 'Recite our list',
    show: function () { return typeof startCellarRecite === 'function'; },
    line: function () { return 'the region is called, you produce the bottle'; },
    go: function () { startCellarRecite(); } },
  { key: 'menudesk', name: 'The Menu Desk',
    show: function () { return typeof deskView === 'function'; },
    line: function () { return 'bring in a whole wine list, read and sorted for you to check'; },
    go: function () { S._desk = null; S._wimp = null; S.view = 'menudesk'; render(); } }
];

/* The first week, in the wing: each step opens its place directly rather than
   clicking a tile that no longer exists. The first ten deal from the level
   being sat, not from Régionale. */
function v25FirstTen() {
  var bank = (typeof QUESTIONS !== 'undefined' && QUESTIONS) ? QUESTIONS : [];
  var mc = shuffle(bank.filter(function (q) { return !q.sa && !q.mt && !q.sel && q.opts; }));
  var pool = mc.slice(0, 10);
  if (pool.length < 10) {
    var rest = shuffle(bank.filter(function (q) { return mc.indexOf(q) < 0; }));
    pool = pool.concat(rest.slice(0, 10 - pool.length));
  }
  if (!pool.length) { render(); return; }
  stopTimer();
  S.mode = 'drill'; S.section = 'Your first ten'; S._again = v25FirstTen;
  S.pool = pool; S.idx = 0; S.correct = 0; S.results = []; resetQ(); S.view = 'quiz'; render();
}

var V25_PATH_GO = {
  words: function () { S.view = 'primers'; render(); },
  label: function () {
    if (activeLevel === 'intro' && typeof INTRO_CLASS !== 'undefined') {
      S.cmp = { sec: 'class', idx: null, reg: null }; S.view = 'compendium';
    } else {
      S.primerKey = 'Classifications & Labels'; S.view = 'primer';
    }
    render();
  },
  grapes: function () { startFlash(); },
  ourlist: function () { S.view = 'cellar'; render(); },
  service: function () { S.view = 'service'; render(); },
  faults: function () { S.vidFocus = 'Service Technique'; S.view = 'videos'; render(); },
  first: function () { v25FirstTen(); }
};

function v25PathStep(id) {
  ST.path = ST.path || {};
  if (!ST.path[id]) { ST.path[id] = Date.now(); stSave(); }
  var go = V25_PATH_GO[id];
  if (go) go(); else render();
}

/* Every data-go on every page this layer draws resolves through here, and
   the area a key belongs to decides which nav word is current afterwards. */
var V25_GO = {};
var V25_AREA = {};
(function () {
  Object.keys(V25_TRAIN).forEach(function (k) { V25_GO[k] = V25_TRAIN[k].go; V25_AREA[k] = 'levels'; });
  V25_LIBRARY.forEach(function (r) { V25_GO[r.key] = r.go; V25_AREA[r.key] = 'library'; });
  V25_RECORD.forEach(function (r) { V25_GO[r.key] = r.go; V25_AREA[r.key] = 'mine'; });
  V25_MINE.forEach(function (r) { V25_GO[r.key] = r.go; V25_AREA[r.key] = 'mine'; });
  V25_GO['door-today'] = function () {
    if (v25Wing()) { S.view = 'today'; render(); return; }
    startDaily();
  };
  V25_GO['door-library'] = function () { S.view = 'library'; render(); };
  V25_GO['door-record'] = function () { S.view = 'record'; render(); };
  V25_GO['door-mine'] = function () { S.view = 'mine'; render(); };
  V25_AREA['door-today'] = 'home'; V25_AREA['door-library'] = 'library';
  V25_AREA['door-record'] = 'mine'; V25_AREA['door-mine'] = 'mine';
  V25_GO['today-daily'] = function () { startDaily(); };
  V25_AREA['today-daily'] = 'home';
  V25_GO.path = function (id) { v25PathStep(id); };
  V25_AREA.path = 'home';
  V25_GO.deskinbox = function () {
    if (typeof v24OpenDesk === 'function') { v24OpenDesk('inbox'); return; }
    S._desk = null; S.view = 'menudesk'; render();
  };
  V25_AREA.deskinbox = 'mine';
  V25_GO.home = function () { home(); };
  V25_AREA.home = 'home';
})();

function v25Go(key, arg) {
  var fn = V25_GO[key];
  if (typeof fn !== 'function') return;
  if (V25_AREA[key]) S._v25area = V25_AREA[key];
  /* a Finals chain left half sat must not steer the next grid or floor */
  if (key !== 'leveltest') { S._fin = null; S._v25lt = null; }
  fn(arg);
  /* Safari never focuses a clicked button, so codex18 had nothing to restore
     and focus is left on the body of a page that has been replaced */
  try {
    var a = document.activeElement;
    if (V25_VIEWS[S.view] && (!a || a === document.body)) v25FocusMain();
  } catch (e) { }
}

/* =========== building a page =========== */

/* Every control gets an id before it is bound, so codex18 remembers the one
   pressed by id rather than by its class and index: the same page redrawn
   gives the same control its focus back, and a page without that id falls
   back to the named <main> instead of the control at the same index. */
function v25Bind(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return root;
  var n = 0;
  Array.prototype.forEach.call(root.querySelectorAll('[data-go]'), function (b) {
    if (!b.id) b.id = 'go-' + b.getAttribute('data-go') + '-' + (n++);
    b.onclick = function () { v25Go(b.getAttribute('data-go'), b.getAttribute('data-arg')); };
  });
  Array.prototype.forEach.call(root.querySelectorAll('button.level[data-level]'), function (b) {
    b.onclick = function () {
      var L = V25_LEVELS[Number(b.getAttribute('data-level')) - 1];
      if (L) v25ChooseLevel(L.key);
    };
  });
  return root;
}

function v25Build(html, after) {
  var box = document.createElement('div');
  box.innerHTML = html;
  v25Bind(box);
  if (typeof after === 'function') { try { after(box); } catch (e) { } }
  return box;
}

/* The home's two parts go into #view as siblings, with no wrapper between
   them and the contract. */
function v25Frag(html) {
  var box = v25Build(html);
  var frag = document.createDocumentFragment();
  Array.prototype.slice.call(box.childNodes || []).forEach(function (n) { frag.appendChild(n); });
  return frag;
}

function v25Train(key, arg, label, aria) {
  var t = V25_TRAIN[key];
  return '<button class="btn ghost train" type="button" data-go="' + key + '"' +
    (arg != null ? ' data-arg="' + v25Esc(arg) + '"' : '') +
    (aria ? ' aria-label="' + v25Esc(aria) + '"' : '') + '>' +
    v25Esc(label || (t && t.label) || key) + '</button>';
}

function v25Rows(list) {
  var rows = list.filter(function (r) { try { return r.show(); } catch (e) { return false; } });
  if (!rows.length) return '';
  return '<ul class="v25rows">' + rows.map(function (r) {
    var line = '';
    try { line = r.line(); } catch (e) { line = ''; }
    return '<li><button class="v25row" type="button" data-go="' + r.key + '">' +
      '<span class="v25row-name">' + v25Esc(r.name) + '</span>' +
      (line ? '<span class="v25row-line">' + v25Esc(line) + '</span>' : '') + '</button></li>';
  }).join('') + '</ul>';
}

/* =========== the home =========== */

function v25Due() {
  try { return dueList().length; } catch (e) { return 0; }
}

function v25Unseen() {
  try {
    var srs = (ST && ST.srs) || {};
    return QUESTIONS.filter(function (q) { return !srs[qKey(q)]; }).length;
  } catch (e) { return 0; }
}

function v25FirstWeek() {
  if (typeof FIRST_PATH === 'undefined' || !FIRST_PATH || !FIRST_PATH.length) return null;
  var p = (ST && ST.path) || {};
  var done = FIRST_PATH.filter(function (s) { return !!p[s.id]; }).length;
  return { done: done, total: FIRST_PATH.length };
}

/* What the Today door deals, and from which level: the daily round is the
   due reviews first, topped up to twenty with questions never seen. */
function v25TodayLine() {
  var line = 'Today deals from Level ' + v25Here().num;
  var due = v25Due();
  var fresh = due < 20 ? Math.min(20 - due, v25Unseen()) : 0;
  if (due) line += ' · ' + due + ' due';
  if (fresh) line += ' · ' + fresh + ' new';
  if (!due && !fresh) line += ' · nothing owed';
  var fw = v25FirstWeek();
  if (fw && fw.done < fw.total) line += ' · first week ' + fw.done + ' of ' + fw.total;
  return line;
}

function v25LibraryLine() {
  var parts = ['Encyclopedia', 'Producers'];
  if (v25MapSheets().length) parts.push('World Map');
  parts.push('Chapters', 'Videos');
  return parts.join(', ');
}

function v25MineLine() {
  var n = v25Bottles();
  var line = n ? v25Plural(n, 'bottle', 'bottles') : 'Enter the list the guest is holding';
  var w = v25Waiting();
  if (w.n) line += ' · ' + v25Plural(w.n, 'wine', 'wines') + ' waiting at the desk';
  return line;
}

function v25Door(id, name, line) {
  return '<button class="door" type="button" id="door-' + id + '" data-go="door-' + id + '">' +
    '<span class="door-name">' + v25Esc(name) + '</span>' +
    '<span class="door-line">' + v25Esc(line) + '</span></button>';
}

function v25HomeHtml() {
  var cur = activeLevel;
  var cards = v25Present().map(function (L) {
    var on = L.key === cur;
    var locked = v25Locked(L.key);
    var stat = locked ? 'Locked' : v25LevelStat(L.key).word;
    return '<button class="level' + (on ? ' on' : '') + (locked ? ' locked' : '') + '" type="button"' +
      ' id="lv-' + L.n + '" data-level="' + L.n + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
      '<span class="lv-num">' + L.num + '</span>' +
      '<span class="lv-name">' + v25Esc(L.name) + '</span>' +
      '<span class="lv-stat">' + v25Esc(stat) + '</span>' +
      (on ? '<span class="lv-here">Your level</span>' : '') +
      '</button>';
  }).join('');
  return '<section class="levels" aria-label="Levels">' + cards + '</section>' +
    '<nav class="quiet" aria-label="Doors">' +
      v25Door('today', 'Today', v25TodayLine()) +
      v25Door('library', 'Library', v25LibraryLine()) +
      v25Door('record', 'Record', 'Hall of Fame, Progress Transfer, the Maître d’') +
      v25Door('mine', 'Mine · Our Wine List', v25MineLine()) +
    '</nav>';
}

homeView = function () { return v25Frag(v25HomeHtml()); };

/* =========== the level page =========== */

/* The level test's shape, said in words: the Finals' forty, codex21's grid of
   four and floor of six, each capped by what the level can actually deal. */
function v25TestLine(lv) {
  var L = (typeof LEVELS !== 'undefined') ? LEVELS[lv] : null;
  var theory = Math.min((typeof EXAM_LEN !== 'undefined' && EXAM_LEN.finals) || 40, L && L.bank ? L.bank.length : 0);
  var grid = Math.min(4, v25Grapes(lv).length);
  var floor = Math.min(6, v25FloorList().length ? v25Dealt(v25FloorList(), lv) : 0);
  var parts = [v25Words(theory) + ' theory questions'];
  if (grid) parts.push('a ' + v25Words(grid) + ' glass grid');
  if (floor) parts.push(v25Words(floor) + ' floor situations');
  var shape = parts.length > 1 ? parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1] : parts[0];
  return v25Cap(shape) + '. No clock. It ends on what you missed, with the right answers.';
}

function v25SubHtml(s, lv) {
  var trains = '', extra = '';
  if (s.kind === 'domain') {
    trains = v25Train('domexam', s.name, 'Domain exam', 'Domain exam, ' + s.name);
    var what = s.cats.length === 1 ? 'the section' : 'the ' + v25Words(s.cats.length) + ' sections';
    extra = '<details class="secs"><summary data-what="' + v25Esc(what) + '">Show ' + v25Esc(what) +
      '</summary><ol class="sections">' + s.cats.map(function (c) {
        var t = s.tally[c] || { met: 0, total: 0 };
        return '<li class="section"><span class="sec-name">' + v25Esc(c) + '</span>' +
          '<span class="sec-meta">' + v25Num(t.total) + ' at this level · ' + v25Esc(v25MetWord(t.met, t.total)) + '</span>' +
          '<span class="sec-trains">' +
            (v25HasChapter(c, lv) ? v25Train('chapter', c, 'Chapter', 'Chapter, ' + c) : '') +
            v25Train('drill', c, 'Drill', 'Drill ' + c) +
            v25Train('secexam', c, 'Exam', 'Exam, ' + c) +
          '</span></li>';
      }).join('') + '</ol></details>';
  } else if (s.kind === 'paper') {
    trains = v25Train('weak') + v25Train('endless') + v25Train('lightning') + v25Train('sudden');
    var nMiss = (typeof MISS !== 'undefined' && MISS) ? MISS.length : 0;
    if (nMiss) trains += v25Train('review', null, 'Review misses · ' + nMiss);
  } else if (s.kind === 'tasting') {
    if (s.total) trains = v25Train('grid') + v25Train('flight') + v25Train('tastegrid') + v25Train('flash');
    else trains = v25Train('tastegrid') + v25Train('flash');
  } else if (s.kind === 'floor') {
    if (v25FloorList().length) trains = v25Train('floor');
  } else if (s.kind === 'pairs') {
    if (v25PairList().length) trains = v25Train('pairs');
  } else if (s.kind === 'service') {
    trains = v25Train('service');
  }
  return '<li class="subsection sub-' + s.kind + '">' +
    '<h2>' + v25Esc(s.name) + '</h2>' +
    '<p class="sub-meta"><span class="sub-n">' + v25Esc(s.line) + '</span>' +
    '<span class="sub-stat">' + v25Esc(s.word) + '</span></p>' +
    (trains ? '<div class="trains">' + trains + '</div>' : '') +
    extra + '</li>';
}

function v25LevelHtml(lv) {
  lv = lv || activeLevel;
  var L = v25Level(lv);
  if (!L) return '';
  var subs = v25Subs(lv);
  return '<h1 class="lv-h1"><span class="lv-num">' + L.num + '</span> ' + v25Esc(L.name) + '</h1>' +
    '<p class="lv-blurb">' + v25Esc(L.blurb) + '</p>' +
    '<ol class="subsections">' + subs.map(function (s) { return v25SubHtml(s, lv); }).join('') + '</ol>' +
    '<div class="lt-wrap"><button class="btn gold leveltest" type="button" data-go="leveltest">The Level ' +
      L.num + ' test</button><p class="lt-line">' + v25Esc(v25TestLine(lv)) + '</p></div>';
}

/* The summary says whether it is open in words, because the marker a
   disclosure normally carries is a glyph, and hidden here. */
function v25WireSecs(box) {
  Array.prototype.forEach.call(box.querySelectorAll('details.secs'), function (d) {
    var sum = d.querySelector('summary');
    if (!sum || typeof d.addEventListener !== 'function') return;
    d.addEventListener('toggle', function () {
      sum.textContent = (d.open ? 'Hide ' : 'Show ') + sum.getAttribute('data-what');
    });
  });
}

function v25LevelView() {
  return v25Build('<div class="lv-page">' + v25LevelHtml(activeLevel) + '</div>', v25WireSecs);
}

/* =========== Library, Record, Mine, Today =========== */

function v25Head(title, sub) {
  return '<div class="viewhead"><h2>' + v25Esc(title) + '</h2>' +
    (sub ? '<div class="sub">' + v25Esc(sub) + '</div>' : '') + '</div>';
}

function v25LibraryHtml() {
  return '<div class="v25page">' +
    v25Head('Library', 'The reference: read it, look things up, and come back to a level to train.') +
    '<div class="codexfind"><input id="cf-in" class="sainput" autocomplete="off" spellcheck="false"' +
      ' aria-label="Find a producer, a wine, or a bottle on our list"' +
      ' placeholder="Find a producer, a wine, or a bottle on our list"><div id="cf-out"></div></div>' +
    v25Rows(V25_LIBRARY) + '</div>';
}

/* codex16's search, wired the way codex16 wires it: the box mutates its own
   results and never calls render(), so the caret stays where it was. */
function v25WireFind(box) {
  var inp = box.querySelector('#cf-in'), out = box.querySelector('#cf-out');
  if (!inp || !out || typeof codexFind !== 'function') return;
  inp.oninput = function () {
    var res = codexFind(inp.value);
    out.innerHTML = res ? '<div class="seclist">' + codexFindHtml(res) + '</div>' : '';
    Array.prototype.forEach.call(out.querySelectorAll('[data-find-p]'), function (b) {
      b.onclick = function () {
        var rec = prodById(b.getAttribute('data-find-p'));
        if (!rec) return;
        var ci = 0;
        prodGroups().forEach(function (g, i) { if (g.rows.indexOf(rec) >= 0) ci = i; });
        S._v25area = 'library';
        S._prod = { c: ci, id: rec.id }; S.view = 'producers'; render();
      };
    });
    Array.prototype.forEach.call(out.querySelectorAll('[data-find-b]'), function (b) {
      b.onclick = function () { S._v25area = 'mine'; S.view = 'cellar'; render(); };
    });
  };
}

function v25LibraryView() { return v25Build(v25LibraryHtml(), v25WireFind); }

function v25Pass() {
  try {
    if (typeof OOT === 'undefined' || !OOT || !OOT.pass) return { strip: '', settings: '' };
    return { strip: OOT.pass.strip() || '', settings: OOT.pass.settings() || '' };
  } catch (e) { return { strip: '', settings: '' }; }
}

/* The wing's held-records card, which codex14's home used to draw: the only
   way inside the Codex to take back a record the migration parked. It is
   empty on every device holding none, and the streak stays off, because the
   contract keeps streaks off the family's surfaces. */
function v25Who() {
  try {
    if (typeof OOT !== 'undefined' && OOT && OOT.home && typeof OOT.home.who === 'function') {
      return OOT.home.who({ streak: false }) || '';
    }
  } catch (e) { }
  return '';
}

function v25BindPass(box) {
  try {
    if (typeof OOT !== 'undefined' && OOT && OOT.pass && typeof OOT.pass.bind === 'function') {
      OOT.pass.bind(box, function () { S.view = 'oot-pass'; render(); });
    }
  } catch (e) { }
  try {
    if (typeof OOT !== 'undefined' && OOT && OOT.home && typeof OOT.home.who === 'function'
        && typeof OOT.home.bindWho === 'function') {
      OOT.home.bindWho(box, function () { render(); });
    }
  } catch (e) { }
}

function v25RecordHtml() {
  var pass = v25Pass();
  return '<div class="v25page">' +
    v25Head('Record', 'What you have done, and where it lives. The figures are here, not on the home.') +
    v25Who() + pass.strip + v25Rows(V25_RECORD) + pass.settings + '</div>';
}

function v25RecordView() { return v25Build(v25RecordHtml(), v25BindPass); }

function v25InboxHtml() {
  var w = v25Waiting();
  if (!w.n || !w.file) return '';
  var when = '', where = '';
  try { where = v24ReadIn(w.file.source.readIn); } catch (e) { }
  try { when = v24WhenRead(w.file.source.at); } catch (e) { }
  return '<div class="deskband"><span class="deskband-t"><b>' + v25Plural(w.n, 'wine', 'wines') +
    ' from the Menu Desk ' + (w.n === 1 ? 'is' : 'are') + ' waiting.</b>' +
    (where || when ? ' Read ' + v25Esc([where, when].filter(Boolean).join(', ')) + '.' : '') + '</span>' +
    '<button class="btn gold" type="button" data-go="deskinbox">Look them over</button></div>';
}

function v25MineHtml() {
  return '<div class="v25page">' +
    v25Head('Mine · Our Wine List', 'The list the guest is holding, the desk that reads one in, and your own record.') +
    v25InboxHtml() + v25Rows(V25_MINE) +
    '<h3 class="secgroup">Your record</h3>' + v25Rows(V25_RECORD) + '</div>';
}

function v25MineView() { return v25Build(v25MineHtml()); }

function v25TodayHtml() {
  var L = v25Here();
  var due = v25Due();
  var started = !!(ST && ST.q && Object.keys(ST.q).length);
  var mins = due ? Math.max(5, Math.round(due * 0.4)) : 0;
  var card;
  if (v25Wing()) {
    /* the page's own line already says which level it deals from, so the
       card leaves its sub to the shared card: the minutes when something is
       due, its own sentence when nothing is */
    card = OOT.home.todayCard({
      due: due, started: started, mins: mins,
      cta: due ? 'Begin the review' : (started ? 'Study anyway' : 'Begin'),
      act: 'data-go="today-daily"', btnClass: 'btn gold'
    });
  } else {
    card = '<div class="v25today"><p>' + v25Esc(v25TodayLine()) + '.</p>' +
      '<button class="btn gold" type="button" data-go="today-daily">' + (due ? 'Begin the review' : 'Begin') + '</button></div>';
  }
  var path = '';
  var fw = v25FirstWeek();
  if (fw && fw.done < fw.total && v25Wing() && typeof OOT.home.firstPath === 'function') {
    var p = (ST && ST.path) || {};
    var done = {};
    FIRST_PATH.forEach(function (s) { if (p[s.id]) done[s.id] = 1; });
    var steps = FIRST_PATH.map(function (s) {
      return { id: s.id, t: s.t, mins: s.mins, act: 'data-go="path" data-arg="' + v25Esc(s.id) + '"' };
    });
    var html = OOT.home.firstPath(steps, done);
    if (html) {
      path = '<div class="oot-today-sub" style="margin:14px 0 8px">Your first week. Finish it and you ' +
        'have been over the ground a new hire is expected to know.</div>' + html;
    }
  }
  return '<div class="v25page">' + v25Head('Today', 'Today deals from Level ' + L.num + ': ' + L.name + '.') +
    card + path + '</div>';
}

function v25TodayView() { return v25Build(v25TodayHtml()); }

/* =========== the level test: the Finals, made scoreless =========== */

function v25TestName() { return 'The Level ' + v25Here().num + ' test'; }

function v25InTest(phase) {
  return !!(S._v25lt && S._fin && (!phase || S._fin.phase === phase));
}

var _v25StartFinals = (typeof startFinals === 'function') ? startFinals : null;
if (_v25StartFinals) {
  startFinals = function () {
    var name = v25TestName();
    if (typeof MODE_LABEL === 'object' && MODE_LABEL) MODE_LABEL.finals = name;
    if (typeof MODE_NOUNS === 'object' && MODE_NOUNS) MODE_NOUNS.finals = name;
    S._v25lt = { lv: activeLevel, theory: [], grid: [], floor: [], gridSat: false, floorSat: false };
    return _v25StartFinals.apply(this, arguments);
  };
}

/* The theory paper's misses, taken from the results before the chain moves on
   to the glasses. */
var _v25FinalsAfterTheory = (typeof finalsAfterTheory === 'function') ? finalsAfterTheory : null;
if (_v25FinalsAfterTheory) {
  finalsAfterTheory = function () {
    if (S._v25lt) {
      S._v25lt.theory = (S.results || []).filter(function (r) { return r && !r.ok; })
        .map(function (r) { return { q: r.q, user: r.user }; });
    }
    return _v25FinalsAfterTheory.apply(this, arguments);
  };
}

function v25WorldWord(k) { return k === 'old' ? 'Old World' : k === 'new' ? 'New World' : 'either'; }

/* Each glass's wrong calls, read the moment codex20 marks it. */
var _v25GridMark = (typeof gridMark === 'function') ? gridMark : null;
if (_v25GridMark) {
  gridMark = function () {
    var tg = S.tg, g = (typeof gridCurrent === 'function') ? gridCurrent() : null;
    var p = (g && typeof tasteProfile === 'function') ? tasteProfile(g.g) : null;
    var out = _v25GridMark.apply(this, arguments);
    try {
      if (v25InTest('grid') && tg && g && p) {
        S._v25lt.gridSat = true;
        var steps = (typeof TASTE_STEPS !== 'undefined') ? TASTE_STEPS : [];
        var wrong = [];
        gridCallsFor(g.c === 'r').forEach(function (c) {
          if (tg.calls[c.k] !== p[c.k]) {
            wrong.push({ label: c.label, mine: steps[tg.calls[c.k]] || 'nothing', right: steps[p[c.k]] || '' });
          }
        });
        if (!tasteWorldOk(p, tg.world)) wrong.push({ label: 'Old or New', mine: v25WorldWord(tg.world), right: v25WorldWord(p.world) });
        if (tg.clim !== p.clim) wrong.push({ label: 'Climate', mine: tg.clim || 'nothing', right: p.clim });
        var named = tg.grape === g.g;
        if (wrong.length || !named) {
          S._v25lt.grid.push({ grape: g.g, named: named, said: tg.grape || 'nothing', wrong: wrong, tell: g.tell || '' });
        }
      }
    } catch (e) { }
    return out;
  };
}

/* A situation called differently from the master's answer. */
var _v25FloorPick = (typeof floorPick === 'function') ? floorPick : null;
if (_v25FloorPick) {
  floorPick = function (i) {
    var f = S.fl, fresh = !!(f && f.picked === null), it = f && f.deck ? f.deck[f.idx] : null;
    var out = _v25FloorPick.apply(this, arguments);
    try {
      if (fresh && it && v25InTest('floor')) {
        S._v25lt.floorSat = true;
        if (f.picked === i && i !== it.best) {
          S._v25lt.floor.push({ s: it.s, mine: it.opts[i], right: it.opts[it.best], why: it.why });
        }
      }
    } catch (e) { }
    return out;
  };
}

/* The mid-test percentage tally is dropped inside a level test; the reveal of
   each glass stays, because that is the answer. */
var _v25GridTally = (typeof gridTally === 'function') ? gridTally : null;
if (_v25GridTally) {
  gridTally = function () {
    if (v25InTest('grid')) return '';
    return _v25GridTally.apply(this, arguments);
  };
}

var _v25GridView = (typeof gridView === 'function') ? gridView : null;
if (_v25GridView) {
  gridView = function () {
    var v = _v25GridView.apply(this, arguments);
    try {
      if (v25InTest('grid') && v && v.querySelector) {
        var span = v.querySelector('.quizbar span');
        if (span && String(span.textContent).indexOf(v25TestName()) < 0) span.textContent = v25TestName() + ' · ' + span.textContent;
        var again = v.querySelector('.gridgo[data-go="again"]');
        if (again) again.textContent = (typeof floorHave === 'function' && floorHave()) ? 'On to the floor' : 'See what you missed';
      }
    } catch (e) { }
    return v;
  };
}

var _v25FloorView = (typeof floorView === 'function') ? floorView : null;
if (_v25FloorView) {
  floorView = function () {
    var v = _v25FloorView.apply(this, arguments);
    try {
      if (v25InTest('floor') && v && v.querySelector) {
        var span = v.querySelector('.quizbar span');
        if (span && String(span.textContent).indexOf(v25TestName()) < 0) span.textContent = v25TestName() + ' · ' + span.textContent;
        var f = S.fl;
        var last = v.querySelector('.flnext');
        if (last && f && (f.idx + 1) >= f.deck.length) last.textContent = 'See what you missed';
      }
    } catch (e) { }
    return v;
  };
}

/* The theory paper's own buttons talk about a score; inside the level test
   they say where they go instead. */
var _v25DecorateQuiz = (typeof decorateQuiz === 'function') ? decorateQuiz : null;
if (_v25DecorateQuiz) {
  decorateQuiz = function () {
    var out = _v25DecorateQuiz.apply(this, arguments);
    try {
      if (S.mode === 'finals' && S._v25lt) {
        var eb = document.getElementById('endbtn');
        if (eb && eb.textContent) eb.textContent = 'End the theory paper';
        var nb = document.getElementById('nextbtn');
        if (nb && S.idx >= S.pool.length - 1) nb.textContent = 'Continue';
      }
    } catch (e) { }
    return out;
  };
}

/* The examination hall names the Finals for what it now is. */
var _v25ExamHallView = (typeof examHallView === 'function') ? examHallView : null;
if (_v25ExamHallView) {
  examHallView = function () {
    var v = _v25ExamHallView.apply(this, arguments);
    try {
      var lab = v.querySelector('.label');
      if (lab) lab.textContent = v25TestName();
      var px = v.querySelector('.px');
      if (px) px.textContent = v25TestLine(activeLevel);
      var b = v.querySelector('#ex-finals');
      if (b) b.textContent = 'Sit ' + v25TestName().charAt(0).toLowerCase() + v25TestName().slice(1) +
        (typeof examStatLine === 'function' ? ' · ' + examStatLine('finals', 'The Finals') : '');
    } catch (e) { }
    return v;
  };
}

function v25GroupHead(name, count) {
  return '<h3 class="lt-group-h">' + v25Esc(name) + ' · ' + v25Esc(count) + '</h3>';
}

function v25NothingMissed() { return '<p class="lt-none">Nothing missed.</p>'; }

function v25TestReportHtml() {
  var t = S._v25lt || { theory: [], grid: [], floor: [], gridSat: false, floorSat: false };
  var L = v25Level(t.lv) || v25Here();
  var html = '<div class="v25page lt-report">' +
    '<div class="viewhead"><h2>The Level ' + L.num + ' test</h2>' +
    '<div class="sub">What you missed, with the right answers. No score.</div></div>';

  html += '<section class="lt-group">' +
    v25GroupHead('Theory', t.theory.length ? t.theory.length + ' missed' : 'none missed');
  if (t.theory.length) {
    html += '<div class="misslist">' + t.theory.map(function (m) {
      var q = m.q || {};
      var typed = q.sa && !q.mt && !q.sel;
      var user = typed ? v25Esc(m.user) : String(m.user == null ? '' : m.user);
      var ans = '';
      try { ans = ansOf(q); } catch (e) { ans = ''; }
      return '<div class="miss"><div class="mq">' + (q.q || '') + '</div>' +
        '<div class="mu">Your answer: ' + user + '</div>' +
        '<div class="ma">The answer: ' + ans + '</div>' +
        (q.exp ? '<div class="mexp">' + q.exp + '</div>' : '') + '</div>';
    }).join('') + '</div>';
  } else {
    html += v25NothingMissed();
  }
  html += '</section>';

  if (t.gridSat || t.grid.length) {
    var wrongly = t.grid.filter(function (g) { return !g.named; }).length;
    html += '<section class="lt-group">' + v25GroupHead('Tasting',
      wrongly ? v25Plural(wrongly, 'glass', 'glasses') + ' named wrongly' : 'no glass named wrongly');
    if (t.grid.length) {
      html += '<div class="misslist">' + t.grid.map(function (g) {
        return '<div class="miss"><div class="mq">' + v25Esc(g.grape) + '</div>' +
          (g.named ? '<div class="ma">Named rightly.</div>'
            : '<div class="mu">You named: ' + v25Esc(g.said) + '</div><div class="ma">The grape: ' + v25Esc(g.grape) + '</div>') +
          g.wrong.map(function (w) {
            return '<div class="mu">' + v25Esc(w.label) + ': you called ' + v25Esc(w.mine) + '. It is ' + v25Esc(w.right) + '.</div>';
          }).join('') +
          (g.tell ? '<div class="mexp">' + v25Esc(g.tell) + '</div>' : '') + '</div>';
      }).join('') + '</div>';
    } else {
      html += v25NothingMissed();
    }
    html += '</section>';
  }

  if (t.floorSat || t.floor.length) {
    html += '<section class="lt-group">' +
      v25GroupHead('The floor', t.floor.length ? t.floor.length + ' missed' : 'none missed');
    if (t.floor.length) {
      html += '<div class="misslist">' + t.floor.map(function (m) {
        return '<div class="miss"><div class="mq">' + v25Esc(m.s) + '</div>' +
          '<div class="mu">Your call: ' + v25Esc(m.mine) + '</div>' +
          '<div class="ma">What a master does: ' + v25Esc(m.right) + '</div>' +
          (m.why ? '<div class="mexp">' + v25Esc(m.why) + '</div>' : '') + '</div>';
      }).join('') + '</div>';
    } else {
      html += v25NothingMissed();
    }
    html += '</section>';
  }

  /* A section missed twice in one sitting is worth a drill; once is not
     evidence. */
  var byCat = {}, order = [];
  t.theory.forEach(function (m) {
    var c = m.q && m.q.cat;
    if (!c) return;
    if (!byCat[c]) { byCat[c] = 0; order.push(c); }
    byCat[c]++;
  });
  var drills = order.filter(function (c) { return byCat[c] >= 2; });
  html += '<div class="trains lt-doors">' +
    drills.map(function (c) { return v25Train('drill', c, 'Drill ' + c); }).join('') +
    v25Train('backlevel', null, 'Back to Level ' + L.num) +
    '<button class="btn ghost train" type="button" data-go="home">Home</button>' +
    '</div></div>';
  return html;
}

var _v25FinalsReportView = (typeof finalsReportView === 'function') ? finalsReportView : null;
finalsReportView = function () {
  if (!S._v25lt && _v25FinalsReportView) return _v25FinalsReportView.apply(this, arguments);
  return v25Build(v25TestReportHtml());
};

/* The results screens the level page's trains end on still used the retired
   study word: codex11 names Endless for it, and core's button under every
   mode but a mock or a drill read "Keep" and the word. That button starts
   Endless (core's onclick, left untouched), so it is named for where it goes,
   the same name as the train on the level page. */
if (typeof MODE_NOUNS === 'object' && MODE_NOUNS) MODE_NOUNS.endless = 'Endless';
var _v25ResultsView = (typeof resultsView === 'function') ? resultsView : null;
if (_v25ResultsView) {
  resultsView = function () {
    var v = _v25ResultsView.apply(this, arguments);
    try {
      var b = v && v.querySelector ? v.querySelector('#again') : null;
      if (b && /practi/i.test(b.textContent || '')) b.textContent = 'Endless';
    } catch (e) { }
    return v;
  };
}

/* =========== the nav =========== */

var V25_NAV = [['home', 'Home'], ['levels', 'Levels'], ['library', 'Library'], ['mine', 'Mine']];

/* The four hubs name their own word; every other view takes the area the
   door that opened it belongs to, and failing that the word it has always
   sat under. */
var V25_HUB = { home: 'home', today: 'home', level: 'levels', library: 'library', mine: 'mine', record: 'mine' };
var V25_UNDER = {
  quiz: 'levels', results: 'levels', grid: 'levels', floor: 'levels', floortally: 'levels',
  pairs: 'levels', pairtally: 'levels', finalsreport: 'levels', tasting: 'levels',
  tastegrid: 'levels', flash: 'levels', service: 'levels', drillpick: 'levels', sim: 'levels',
  primers: 'library', primer: 'library', ency: 'library', producers: 'library',
  worldmap: 'library', compendium: 'library', terroir: 'library', videos: 'library',
  cellar: 'mine', cellarrecite: 'mine', menudesk: 'mine', maitre: 'mine', dash: 'mine',
  hall: 'mine', sync: 'mine', plan: 'mine', disputes: 'mine', exams: 'mine', 'oot-pass': 'mine'
};

function v25NavWord() {
  return V25_HUB[S.view] || S._v25area || V25_UNDER[S.view] || null;
}

function v25NavHtml() {
  var cur = v25NavWord();
  return '<nav class="appnav" aria-label="The Codex">' + V25_NAV.map(function (w) {
    return '<button type="button" class="navword" id="nav-' + w[0] + '" data-nav="' + w[0] + '"' +
      (cur === w[0] ? ' aria-current="page"' : '') + '>' + w[1] + '</button>';
  }).join('') + '</nav>';
}

function v25Nav(word) {
  if (!v25Leave()) return;
  S._v25area = word;
  if (word === 'home') { home(); }
  else { S.view = word === 'levels' ? 'level' : word; render(); }
  v25FocusMain();
}

var _v25Topbar = topbar;
topbar = function () {
  var t = _v25Topbar.apply(this, arguments);
  try {
    /* the old Home button is retired: Home is the first word of the nav */
    Array.prototype.forEach.call(t.querySelectorAll('.homebtn'), function (b) {
      if (b.parentNode) b.parentNode.removeChild(b);
    });
    var box = document.createElement('div');
    box.innerHTML = v25NavHtml();
    var nav = box.firstElementChild || box.firstChild;
    if (nav && nav.querySelectorAll) {
      Array.prototype.forEach.call(nav.querySelectorAll('[data-nav]'), function (b) {
        b.onclick = function () { v25Nav(b.getAttribute('data-nav')); };
      });
      /* codex4's document.onkeydown takes Enter and Space on an answered
         question as "next", and codex6's does the same in a flight; stopped
         here, the key reaches the nav word and still activates it */
      if (typeof nav.addEventListener === 'function') {
        nav.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') e.stopPropagation();
        });
      }
      t.appendChild(nav);
    }
    /* the level page's own h1 is the page's one h1; the masthead keeps its
       look and stays inside the named header */
    if (S.view === 'level') {
      var mast = t.querySelector('.brand h1');
      if (mast && mast.setAttribute) mast.setAttribute('role', 'none');
    }
  } catch (e) { /* a masthead without its nav is still a masthead */ }
  return t;
};

/* =========== routing =========== */

var V25_VIEWS = {
  level: v25LevelView, library: v25LibraryView, record: v25RecordView,
  mine: v25MineView, today: v25TodayView,
  finalsreport: function () { return finalsReportView(); }
};

/* codex18 would otherwise borrow the first h2 or h3, which on the grid and
   the floor is an answer choice: inside the level test that reads a possible
   answer out as the page's name. */
function v25MainName() {
  if (S.view === 'level') { var L = v25Here(); return 'Level ' + L.num + ', ' + L.name; }
  if (S.view === 'finalsreport') return v25TestName();
  var name = {
    library: 'Library', record: 'Record', mine: 'Mine', today: 'Today',
    grid: 'The Blind Grid', floor: 'The Floor', floortally: 'The Floor',
    pairs: 'Pairing', pairtally: 'Pairing'
  }[S.view] || null;
  if (name && v25InTest()) name = v25TestName() + ', ' + name;
  return name;
}

/* codex24's pattern: codex18's landmarks and focus run inside the render it
   wrapped, which a later layer's view never reaches, so they are called here;
   <main> is named here too, because codex18 looks only for an h2 or h3. */
function v25Landmarks(sig, name) {
  if (typeof v18Landmarks !== 'function') return null;
  var main = v18Landmarks();
  if (main && name) main.setAttribute('aria-label', name);
  if (typeof v18Focus === 'function') v18Focus(sig, main);
  return main;
}

function v25HasMain(app) {
  var m = document.getElementById('view');
  return !!(m && m.parentNode === app);
}

function v25Colophon(app) {
  if (!app || app.querySelector('footer.colophon')) return;
  var f = document.createElement('footer');
  f.className = 'colophon';
  f.innerHTML = '<p class="nonaffil">' + V25_NONAFFIL + '</p>';
  var main = document.getElementById('view');
  if (main && main.parentNode === app && main.nextSibling) app.insertBefore(f, main.nextSibling);
  else app.appendChild(f);
}

/* The wing's manager view reads each wing's section ranking; codex14 used to
   publish it from the home it built. */
function v25PublishGaps() {
  try {
    if (typeof OOT !== 'undefined' && OOT && OOT.pass && typeof OOT.pass.publishGaps === 'function'
        && typeof ootCodexGaps === 'function') OOT.pass.publishGaps('codex', ootCodexGaps());
  } catch (e) { }
}

var _v25Render = render;
render = function () {
  var sig = null;
  try { sig = (typeof v18Signature === 'function') ? v18Signature(document.activeElement) : null; } catch (e) { sig = null; }
  var draw = V25_VIEWS[S.view];
  if (draw) {
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    try { stopTimer(); } catch (e) { }
    var app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(topbar());
    app.appendChild(draw());
    try { v25Landmarks(sig, v25MainName()); } catch (e) { /* a page without landmarks is still a page */ }
    window.scrollTo(0, 0);
    return;
  }
  var out = _v25Render.apply(this, arguments);
  try {
    var app2 = document.getElementById('app');
    /* the views of codex19 onward return before codex18 runs */
    if (app2 && !v25HasMain(app2)) v25Landmarks(sig, v25MainName());
    if (S.view === 'home') { v25Colophon(app2); v25PublishGaps(); }
  } catch (e) { }
  return out;
};

/* =========== the styles ===========
   On parchment (the level cards) the ink tokens; on the dark page the parch
   and gold ones, per the contrast rule in CLAUDE.md. Every control stands at
   least 44px at every width. */
(function () {
  var css = document.createElement('style');
  css.id = 'v25-style';
  css.textContent = [
    '.topbar{flex-wrap:wrap}',
    /* four equal words on a row of their own: the standalone masthead sits
       left and the wing's is centred, and an even row reads right under both */
    '.appnav{flex:1 0 100%;display:flex;gap:6px;margin-top:10px}',
    '.appnav .navword{flex:1 1 0;min-width:0;min-height:44px;padding:10px 6px;background:transparent;color:var(--gold-soft);',
    '  border:1px solid var(--line);border-radius:3px;font-family:\'EB Garamond\',Georgia,serif;',
    '  font-variant:small-caps;letter-spacing:1.2px;font-size:16px;line-height:1.2;cursor:pointer}',
    '.appnav .navword:hover{border-color:var(--gold);color:var(--gold-hi)}',
    '.appnav .navword[aria-current="page"]{color:var(--gold-hi);border-color:var(--gold);box-shadow:inset 0 -3px 0 var(--gold)}',
    '.appnav .navword:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    '@media(max-width:599px){.appnav{align-self:stretch;width:100%}.appnav .navword{padding:10px 2px;font-size:15px;letter-spacing:.8px}}',

    '.levels{display:grid;grid-template-columns:repeat(auto-fit,minmax(132px,1fr));gap:12px;margin:6px 0 0}',
    '.level{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-height:44px;',
    '  padding:16px 16px 14px;text-align:left;cursor:pointer;font:inherit;',
    '  background:linear-gradient(160deg,var(--parch) 0%,var(--parch2) 100%);color:var(--ink);',
    '  border:1px solid var(--line);border-radius:3px;',
    '  box-shadow:inset 0 0 0 3px var(--bg2),inset 0 0 0 4px rgba(201,162,39,.18)}',
    '.level:hover{border-color:var(--gold)}',
    '.level:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    '.level .lv-num{font-family:\'Cinzel\',Georgia,serif;font-weight:700;font-size:26px;line-height:1;color:var(--claret);letter-spacing:1px}',
    '.level .lv-name{font-family:\'Cinzel\',Georgia,serif;font-weight:600;font-size:16px;letter-spacing:.5px;color:var(--ink);line-height:1.25}',
    '.level .lv-stat{font-family:\'EB Garamond\',Georgia,serif;font-size:15.5px;color:var(--ink-soft)}',
    '.level .lv-here{font-family:\'EB Garamond\',Georgia,serif;font-variant:small-caps;letter-spacing:1.2px;font-size:14px;',
    '  color:var(--claret);border-top:1px solid rgba(123,30,46,.4);padding-top:4px;margin-top:3px;align-self:stretch}',
    '.level.on{border:2px solid var(--claret);box-shadow:inset 0 0 0 3px var(--parch),inset 0 0 0 4px var(--claret)}',
    '.level.locked .lv-stat{font-style:italic}',

    '.quiet{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;',
    '  margin:22px 0 0;padding-top:16px;border-top:1px solid var(--line)}',
    '.door{display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-height:44px;padding:12px 14px;',
    '  text-align:left;cursor:pointer;font:inherit;background:transparent;color:var(--parch);',
    '  border:1px solid var(--line);border-radius:3px}',
    '.door:hover{border-color:var(--gold)}',
    '.door:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    '.door-name{font-family:\'Cinzel\',Georgia,serif;font-size:14.5px;letter-spacing:.8px;color:var(--gold-soft)}',
    '.door-line{font-family:\'EB Garamond\',Georgia,serif;font-size:15px;line-height:1.4;color:var(--parch)}',

    '.lv-h1{font-family:\'Cinzel\',Georgia,serif;font-weight:600;font-size:27px;letter-spacing:.8px;color:var(--gold-soft);margin:4px 0 6px;line-height:1.2}',
    '.lv-h1 .lv-num{color:var(--gold);margin-right:4px}',
    '.lv-blurb{font-family:\'EB Garamond\',Georgia,serif;font-style:italic;font-size:17px;line-height:1.5;color:var(--parch);max-width:62ch;margin:0 0 14px}',
    '.subsections{list-style:none;margin:0;padding:0}',
    '.subsection{border-top:1px solid var(--line);padding:16px 0 14px}',
    '.subsection h2{font-family:\'Cinzel\',Georgia,serif;font-weight:600;font-size:18px;letter-spacing:.6px;color:var(--gold);margin:0 0 4px;line-height:1.25}',
    '.sub-meta{display:flex;flex-wrap:wrap;gap:4px 14px;margin:0;font-family:\'EB Garamond\',Georgia,serif;font-size:15px}',
    '.sub-n{color:var(--gold-soft)}',
    '.sub-stat{color:var(--parch)}',
    '.trains{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}',
    '.train{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;text-align:center}',
    '.secs{margin-top:10px}',
    /* a control, not a caption: the ghost button's border, and the state in
       its own words (Show, Hide) in place of the marker */
    '.secs>summary{min-height:44px;display:inline-flex;align-items:center;cursor:pointer;color:var(--gold-soft);',
    '  padding:8px 14px;border:1px solid rgba(201,162,39,.55);border-radius:3px;list-style:none;',
    '  font-family:\'EB Garamond\',Georgia,serif;font-variant:small-caps;letter-spacing:1.2px;font-size:15.5px}',
    '.secs>summary::-webkit-details-marker{display:none}',
    '.secs>summary:hover{border-color:var(--gold);color:var(--gold-hi)}',
    '.secs>summary:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    '.sections{list-style:none;margin:4px 0 0;padding:0}',
    '.section{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:8px 0;border-bottom:1px solid rgba(201,162,39,.13)}',
    '.sec-name{flex:1 1 170px;color:var(--parch);font-family:\'EB Garamond\',Georgia,serif;font-size:16px}',
    '.sec-meta{flex:1 1 150px;color:var(--gold-soft);font-family:\'EB Garamond\',Georgia,serif;font-size:14.5px}',
    '.sec-trains{display:flex;flex-wrap:wrap;gap:6px}',
    '.lt-wrap{margin:22px 0 0;padding-top:18px;border-top:3px double var(--line)}',
    '.leveltest{width:100%;min-height:52px;font-size:17px}',
    '.lt-line{text-align:center;color:var(--gold-soft);font-family:\'EB Garamond\',Georgia,serif;font-style:italic;font-size:15px;margin:8px 0 0}',

    '.v25rows{list-style:none;margin:12px 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}',
    '.v25row{width:100%;min-height:44px;display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;',
    '  padding:12px 14px;cursor:pointer;font:inherit;background:rgba(242,232,213,.05);color:var(--parch);',
    '  border:1px solid var(--line);border-radius:3px}',
    '.v25row:hover{border-color:var(--gold)}',
    '.v25row:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    '.v25row-name{font-family:\'Cinzel\',Georgia,serif;font-size:14.5px;letter-spacing:.6px;color:var(--gold-soft)}',
    '.v25row-line{font-family:\'EB Garamond\',Georgia,serif;font-size:15px;line-height:1.4;color:var(--parch)}',
    '.v25page .codexfind{margin:12px 0 0}',
    '.v25page .codexfind .sainput{width:100%;min-height:44px}',
    '.v25page .secgroup{margin-top:24px}',
    '.v25today{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:12px}',
    '.v25today p{flex:1 1 220px;margin:0;color:var(--parch)}',
    '.v25today .btn,.v25page .deskband .btn{min-height:44px}',

    /* core's end-the-paper link, the only way out of the level test's theory
       paper, stands 44px; on the last question core leaves it empty, and an
       empty button has no name, so it keeps its place in the row and leaves
       the tab order and the accessibility tree */
    '.nextrow .skipbtn{min-height:44px;padding:10px 12px;display:inline-flex;align-items:center}',
    '#endbtn:empty{visibility:hidden}',

    '.lt-group{margin-top:20px}',
    '.lt-group-h{font-family:\'Cinzel\',Georgia,serif;font-weight:600;font-size:16px;letter-spacing:.8px;color:var(--gold);',
    '  margin:0 0 8px;padding-bottom:5px;border-bottom:1px solid var(--line)}',
    '.lt-report .misslist{display:flex;flex-direction:column;gap:10px}',
    '.lt-none{color:var(--parch);font-family:\'EB Garamond\',Georgia,serif;font-size:16px;margin:4px 0 0}',
    '.lt-doors{justify-content:center;margin-top:24px}',

    '.colophon{text-align:center;margin:36px 0 8px;padding-top:14px;border-top:1px solid var(--line)}',
    '.colophon .nonaffil{margin:0;font-size:12.5px;line-height:1.5;letter-spacing:.3px;color:var(--gold-soft)}',

    /* the current state takes a border, so the outline stays the focus ring */
    '@media (forced-colors: active){',
    '  .level.on{border:3px double CanvasText}',
    '  .appnav .navword[aria-current="page"]{border:2px solid CanvasText}',
    '}',
    '@media(prefers-reduced-motion:reduce){.level,.door,.v25row{transition:none}}'
  ].join('\n');
  document.head.appendChild(css);
})();
