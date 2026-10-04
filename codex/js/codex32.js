/* ================== CODEX XXXI: FOUR TABS, BACK ON EVERY SCREEN ==================

   The consolidation (WorldTable docs/consolidation-design.md, sections 2 and
   5, designed 4 October 2026). The owner, a new server at Brennan's studying
   between shifts, found the Codex hard to move through: four nav words that
   differed from the other two apps, about forty views behind them, and a
   phone's back gesture that left the app from almost every screen. This
   layer is the Codex's half of the shared contract.

   WHAT IT DOES, and the rule each part keeps:

   1. THE BAR reads Home, Flashcards, Quizzes, Library, then a quiet More,
      in one row at 390px. V25_NAV is reassigned; the topbar wrapper codex25
      wrote draws it by global name. The lit word is the owner of the view
      (V32_OWNER), with aria-current and the existing underline. Flashcards
      carries the due count as a pill with a hidden word.

   2. HOME is the four level cards and nothing else: v25HomeHtml is
      reassigned to return codex25's section.levels alone.

   3. THE LEVEL PAGE (V25_VIEWS.level, and today and mine land where they
      should): Today's study (Due today, Quick quiz, Next reading, and Your
      first week while it is unfinished), My restaurant (the desk band, the
      house line, the count, three study doors, the sections as chips, the
      quiet setup links), Search, and a closed What {Level} holds.

   4. FLASHCARDS, QUIZZES, LIBRARY, MORE: one picker each, built from the
      engines that already exist. One deck screen and one card screen: every
      house deck, the grape cards and the menu's words are drawn in one
      frame, graded by the records the engines already keep (v27RecordHouse
      for the house, a per-device slot for the grapes, which kept nothing).

   5. THE ROUTER. Every render writes the hash from S.view and its argument:
      a push when the screen key changed, a replace when it did not, when the
      change is within a screen, or when a run moves on (its questions, its
      cards, its results share one entry). A popstate applies the hash and
      renders; a run reached by Back renders from memory while memory holds
      it, and falls to its parent otherwise. Each entry carries its depth as
      `ootd`, mirrored to sessionStorage. codex28's and codex29's own
      listeners are removed and their pushes folded in: v28Push marks the
      next render as a push, so one action makes one entry.

   6. BACK is one ghost button, the first thing in #view on every view but
      home, sticky under the masthead and moved clear of the suite's badge
      once it sticks. Depth above 0: history.back(). Depth 0: the view's
      logical parent, by a replace, so a cold deep link walks up one screen
      a press and the history never gains a loop. Every older way back on a
      screen (each "Back to" button) is removed as the screen is drawn.

   NO OOT AT ALL is the standalone build and every Node gate: no house, so
   My restaurant offers Our Wine List and the desk, and nothing is fetched.

   House rules observed: a new layer, no edits to earlier files; top-level
   declarations are var and function only, no arrow; CSS injected from here;
   no pictorial glyph and no mark at or above U+2190 in anything this file
   writes; no dash of any spelling; British spelling; levels named, never
   numbered; nobody named; every control at least 44px; every state a word. */

/* =========== the words =========== */

var V32_WORDS = {
  back: 'Back',
  more: 'More',
  due: ' due',
  from: 'Opened from {app}. Your phone\'s back gesture returns there.',
  scopeLabel: 'Level',
  showAll: 'show all levels',
  allLevels: 'All levels',
  showOnly: 'show {level} only',
  change: '{level}, change level',
  yourLevel: 'Your level',
  todayH: 'Today\'s study',
  dueRow: 'Due today',
  quickRow: 'Quick quiz',
  nextRow: 'Next reading',
  weekRow: 'Your first week',
  weekLine: '{done} of {total} steps done.',
  weekHead: 'Your first week. Finish it and you have been over the ground a new hire is expected to know.',
  restH: 'My restaurant',
  noHouse: 'No restaurant on this device yet.',
  countLine: '{house}: {n} wines in {s} sections.',
  studied: '{x} studied, {y} to see again.',
  studiedOnly: '{x} studied.',
  studiedNone: 'Nothing studied yet.',
  studyList: 'Study our list',
  studyListLine: 'every wine on the list, a card for each',
  cardsList: 'Flashcards for our list',
  cardsListLine: 'the whole list, front and back',
  drillList: 'Drill our list',
  drillListLine: 'four answers to choose from, the list\'s grapes, regions and pours',
  fullWine: 'The full wine list',
  menuDesk: 'The Menu Desk',
  theHouse: 'The house',
  herMarks: 'Look over her marks',
  secChips: 'Sections of our list',
  searchH: 'Search',
  searchLabel: 'Search the Codex and our list',
  searchHint: 'A wine, a grape, a producer',
  fromList: 'From our list',
  inCodex: 'In the Codex',
  nothing: 'Nothing found for "{q}".',
  nothingAt: 'Nothing at {level} for "{q}".',
  otherLevels: 'At other levels',
  holds: 'what {level} holds',
  dueLine2: '{d} due and {k} new: {parts}.',
  dueLineD: '{d} due: {parts}.',
  dueLineK: '{k} new cards to start: {parts}.',
  dueNone: 'Nothing due today and nothing new at {level}. Try the quick quiz.',
  dueWines: '{a} wines from our list',
  dueWine: '1 wine from our list',
  dueQs: '{b} questions at {level}',
  dueQ: '1 question at {level}',
  quickLine: 'Ten questions: five from our list, five from {level}.',
  quickLineLevel: 'Ten questions from {level}.',
  nextLine: '{title} \u00b7 {level}',
  nextNone: 'Everything at {level} is read. The Library holds the rest.',
  fcH: 'Flashcards',
  startToday: 'Start today\'s cards',
  fcRest: 'My restaurant',
  fcNoHouse: 'No restaurant on this device yet. Set one up from a level page.',
  everyLevel: 'Every level',
  words: 'Words',
  refCards: 'Reference cards',
  wholeList: 'The whole list',
  weakOnes: 'My weak ones',
  floorBottles: 'The floor\'s bottles',
  menuWords: 'The menu\'s words',
  grapeCards: 'Grape cards',
  redGrapes: 'Red grapes',
  whiteGrapes: 'White grapes',
  everyGrape: 'Every grape',
  rowLine: '{n} cards \u00b7 {m} learnt',
  deckLine: '{n} cards \u00b7 {m} learnt',
  ways: 'Choose how to study',
  nameFront: 'Name on the front',
  profileFront: 'Profile on the front',
  narrow: 'the filters to narrow this deck',
  start: 'Start',
  empty: 'No cards in this deck yet.',
  cardPos: 'Card {i} of {n} \u00b7 {deck}',
  front: 'Front',
  answer: 'Answer',
  flip: 'Flip',
  got: 'Got it',
  again: 'Again',
  deckDone: 'Deck done',
  doneLine: '{g} got it, {a} to see again.',
  doneLineAll: '{g} got it.',
  studyMisses: 'Study the misses',
  anotherDeck: 'Another deck',
  nowDue: 'Now the {n} questions due',
  missesDeck: 'The misses',
  oneWine: 'One wine',
  qzH: 'Quizzes',
  startQuick: 'Start the quick quiz',
  quickSection: 'Quick quiz',
  handsOn: 'Hands on',
  wholePaper: 'The whole paper',
  domainLine: 'Domain exam: {n} questions across {s}',
  movesYou: 'This moves you to {level}.',
  cellarDrill: 'The cellar drill',
  classicPairs: 'Classic pairings',
  recite: 'Recite our list',
  libH: 'Library',
  libLine: 'Reading for {level}. Nothing here is graded.',
  libLineAll: 'Reading for every level. Nothing here is graded.',
  chaptersAt: 'Study Chapters \u00b7 {level}',
  videosH: 'Videos for our list',
  videosLine: 'Each video opens in a new tab and needs a connection.',
  videosNone: 'No videos for this restaurant yet.',
  moreH: 'More',
  recordG: 'Record and progress',
  toolsG: 'Tools',
  backupG: 'Backup and data',
  maitreG: 'The Ma\u00eetre d\u2019',
  settingsG: 'Settings',
  aboutG: 'About',
  whoRow: 'Who is studying',
  missH: 'What you missed',
  missAns: 'Answer: ',
  missNone: 'Nothing missed.',
  studyCard: 'Study this card',
  readChapter: 'Read the chapter',
  dealAnother: 'Deal another',
  show: 'Show ',
  hide: 'Hide '
};

function v32W(key, vars) {
  var s = String(V32_WORDS[key] == null ? key : V32_WORDS[key]);
  if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(String(vars[k])); });
  return s;
}
function v32Esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function v32Str(s) { return typeof s === 'string' ? s.trim() : ''; }
function v32Fn(name) { try { return typeof window !== 'undefined' && window && typeof window[name] === 'function'; } catch (e) { return false; } }

/* The rooms of the suite, by their path, for the cross-room line. */
var V32_ROOMS = { table: 'The World Table', ledger: 'The Bartender\'s Ledger', codex: 'The Sommelier\'s Codex' };
var V32_QUICK = 'Quick quiz';

/* =========== per-device slots, never exported, every touch in try =========== */

var V32_NAV_KEY = 'oot-nav-codex-v1';
var V32_SCROLL_KEY = 'oot-scroll-codex-v1';
var V32_GRAPE_BASE = 'oot-codex-grapecards-v1';

function v32SessGet(k) {
  try {
    var s = (typeof sessionStorage !== 'undefined' && sessionStorage) ? sessionStorage.getItem(k) : null;
    return s ? JSON.parse(s) : null;
  } catch (e) { return null; }
}
function v32SessSet(k, v) {
  try { if (typeof sessionStorage !== 'undefined' && sessionStorage) sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { }
}
function v32GrapeKey() {
  try {
    return (typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function')
      ? OOT.profiles.key(V32_GRAPE_BASE) : V32_GRAPE_BASE;
  } catch (e) { return V32_GRAPE_BASE; }
}
/* { grapeName: 'got' | 'again' }, the last answer to each grape card. */
function v32GrapeRec() {
  try {
    var s = (typeof localStorage !== 'undefined' && localStorage) ? localStorage.getItem(v32GrapeKey()) : null;
    var o = s ? JSON.parse(s) : null;
    return o && typeof o === 'object' ? o : {};
  } catch (e) { return {}; }
}
function v32GrapeMark(name, got) {
  try {
    var o = v32GrapeRec();
    o[name] = got ? 'got' : 'again';
    if (typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(v32GrapeKey(), JSON.stringify(o));
  } catch (e) { }
}

/* =========== the house, read through codex28 =========== */

function v32House() { try { return (typeof v28House === 'function') ? v28House() : null; } catch (e) { return null; } }
function v32Wines() { try { return (typeof v28Wines === 'function') ? v28Wines(v32House()) : []; } catch (e) { return []; } }
function v32HasHouse() { return v32Wines().length > 0; }
function v32Ids(scope) { try { return (typeof v28DeckIds === 'function') ? v28DeckIds(scope || {}) : []; } catch (e) { return []; } }
function v32Prog(ids) {
  try { return (typeof v28Progress === 'function') ? v28Progress(ids) : { total: ids.length, studied: 0, got: 0, again: 0, againIds: [] }; }
  catch (e) { return { total: ids.length, studied: 0, got: 0, again: 0, againIds: [] }; }
}
function v32Latest(id) { try { return (typeof v28Latest === 'function') ? v28Latest(id) : null; } catch (e) { return null; } }
function v32Wine(id) {
  var hit = null;
  v32Wines().some(function (w) { if (w.id === id) { hit = w; return true; } return false; });
  return hit;
}

/* A section's name as an address segment: folded, words joined by hyphens.
   It sits after the literal "section/", so it can never be read as a wine's
   id (every house wine id is w- and eight letters or digits). */
function v32Slug(s) {
  var t = String(s == null ? '' : s).toLowerCase();
  try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  return t.replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/* The glass list's sections, all day, in the house's order, with counts. */
function v32Sections() {
  var out = [], by = {};
  try {
    v28Rows().forEach(function (r) {
      if (r.bottle || r.own) return;
      if (!(r.section in by)) { by[r.section] = 0; out.push(r.section); }
      by[r.section]++;
    });
  } catch (e) { }
  return out.map(function (s) { return { section: s, count: by[s] }; });
}
function v32FloorSections() {
  var out = [], by = {};
  try {
    v28Rows().forEach(function (r) {
      if (!r.bottle) return;
      if (!(r.section in by)) { by[r.section] = 0; out.push(r.section); }
      by[r.section]++;
    });
  } catch (e) { }
  return out.map(function (s) { return { section: s, count: by[s] }; });
}
function v32SecBySlug(slug, floor) {
  var hit = '';
  (floor ? v32FloorSections() : v32Sections()).some(function (s) { if (v32Slug(s.section) === slug) { hit = s.section; return true; } return false; });
  return hit;
}

/* =========== the level =========== */

function v32Lv() { return (typeof v25Here === 'function') ? v25Here() : { key: 'certified', name: 'Village', n: 2 }; }
function v32Levels() { return (typeof v25Present === 'function') ? v25Present() : []; }
function v32LvByKey(k) { return (typeof v25Level === 'function') ? v25Level(k) : null; }

/* The scope each root was left in, never stored: Flashcards, Quizzes, Library. */
function v32All() {
  if (!S._v32all) S._v32all = { flashcards: false, quizzes: false, library: false };
  return S._v32all;
}

/* =========== Due today: one count for the row, the root and the pill ===========

   The house step first: the wines last answered Again, or, with none, the
   wines never graded, in the list's order, ten at most. Then codex3's own
   spaced review, startDaily, exactly as it deals: what is due, topped up
   with unseen questions to twenty, thirty at most. */
function v32DueToday() {
  var lv = v32Lv();
  var weak = [], fresh = [];
  if (v32HasHouse()) {
    var all = v32Ids({});
    weak = v32Prog(all).againIds.slice(0, 20);
    if (!weak.length) fresh = all.filter(function (id) { return !v32Latest(id); }).slice(0, 10);
  }
  var dueQ = 0, unseen = 0;
  try { dueQ = (typeof v25Due === 'function') ? v25Due() : 0; } catch (e) { dueQ = 0; }
  var newQ = 0;
  if (dueQ < 20) {
    try { unseen = (typeof v25Unseen === 'function') ? v25Unseen() : 0; } catch (e) { unseen = 0; }
    newQ = Math.min(20 - dueQ, unseen);
  }
  var dQ = Math.min(dueQ, 30);
  var nQ = Math.min(newQ, 30 - dQ);
  var houseIds = weak.length ? weak : fresh;
  return {
    level: lv.name, houseIds: houseIds, a: houseIds.length, b: dQ + nQ,
    d: weak.length + dQ, k: fresh.length + nQ, total: houseIds.length + dQ + nQ
  };
}

function v32DueLine(t) {
  t = t || v32DueToday();
  if (!t.total) return v32W('dueNone', { level: t.level });
  var parts = [];
  if (t.a) parts.push(t.a === 1 ? v32W('dueWine') : v32W('dueWines', { a: t.a }));
  if (t.b) parts.push(t.b === 1 ? v32W('dueQ', { level: t.level }) : v32W('dueQs', { b: t.b, level: t.level }));
  var p = parts.join(', ');
  if (t.d && t.k) return v32W('dueLine2', { d: t.d, k: t.k, parts: p });
  if (t.d) return v32W('dueLineD', { d: t.d, parts: p });
  return v32W('dueLineK', { k: t.k, parts: p });
}

/* =========== the decks =========== */

/* Every grape profile the four levels taste, and the twenty-four extra
   ones, each once. */
function v32AllGrapes() {
  var seen = {}, out = [];
  var add = function (g) { if (g && typeof g.g === 'string' && !seen[g.g]) { seen[g.g] = 1; out.push(g); } };
  try {
    (typeof LEVEL_ORDER !== 'undefined' ? LEVEL_ORDER : []).forEach(function (k) {
      var L = LEVELS[k];
      (L && Array.isArray(L.grapes) ? L.grapes : []).forEach(add);
    });
  } catch (e) { }
  try { (typeof GRAPES !== 'undefined' && Array.isArray(GRAPES) ? GRAPES : []).forEach(add); } catch (e) { }
  try { (typeof GRAPES_PLUS !== 'undefined' && Array.isArray(GRAPES_PLUS) ? GRAPES_PLUS : []).forEach(add); } catch (e) { }
  return out;
}
function v32LevelGrapes() {
  try { return (typeof GRAPES !== 'undefined' && Array.isArray(GRAPES)) ? GRAPES.slice() : []; } catch (e) { return []; }
}

/* The house's words: the engine's term cards over the kept lexicon. */
function v32WordCards() {
  var h = v32House();
  if (!h) return [];
  var lib = null;
  try { lib = (typeof OOT !== 'undefined' && OOT && OOT.houseLib) ? OOT.houseLib : null; } catch (e) { lib = null; }
  var fn = lib && lib.drills && typeof lib.drills.buildFlashcards === 'function' ? lib.drills.buildFlashcards
    : lib && typeof lib.buildFlashcards === 'function' ? lib.buildFlashcards : null;
  if (!fn) return [];
  try {
    return (fn(h) || []).filter(function (c) { return c && c.kind === 'term' && c.front && c.back; })
      .map(function (c, i) { return { kind: 'word', id: String(c.itemId || ('t' + i)), front: String(c.front), back: String(c.back), n: i }; });
  } catch (e) { return []; }
}

/* The members of the misses deck, carried in its address. */
var V32_MISSES = [];

function v32HouseCards(ids) {
  var h = v32House();
  var out = [];
  ids.forEach(function (id) {
    var w = v32Wine(id);
    var c = null;
    try { c = w ? v28CardOf(w, h) : null; } catch (e) { c = null; }
    if (c) out.push({ kind: 'house', id: id, c: c });
  });
  return out;
}
function v32GrapeCards(list) { return list.map(function (g) { return { kind: 'grape', id: g.g, g: g }; }); }

/* A deck by its id: its name, its cards in dealing order, how many are learnt. */
function v32DeckDef(id) {
  id = String(id || '');
  var def = { id: id, name: '', cards: [], kind: 'house' };
  var m;
  if (id === 'list') { def.name = v32W('wholeList'); def.cards = v32HouseCards(v32Ids({})); }
  else if ((m = /^list:(.+)$/.exec(id))) {
    var sec = v32SecBySlug(m[1], false);
    def.name = sec || m[1]; def.cards = sec ? v32HouseCards(v32Ids({ section: sec })) : [];
  }
  else if (id === 'list-weak') { def.name = v32W('weakOnes'); def.cards = v32HouseCards(v32Prog(v32Ids({})).againIds); }
  else if ((m = /^one:(w-[a-z0-9]{8})$/.exec(id))) {
    var w = v32Wine(m[1]);
    def.name = w ? w.name : v32W('oneWine'); def.cards = v32HouseCards([m[1]]);
  }
  else if (id === 'bottles') { def.name = v32W('floorBottles'); def.cards = v32HouseCards(v32Ids({ section: '#bottles' })); }
  else if ((m = /^bottles:(.+)$/.exec(id))) {
    var fs = v32SecBySlug(m[1], true);
    def.name = fs || m[1]; def.cards = fs ? v32HouseCards(v32Ids({ section: '#bottles|' + fs })) : [];
  }
  else if (id === 'menu-words') { def.kind = 'word'; def.name = v32W('menuWords'); def.cards = v32WordCards(); }
  else if (id === 'grapes' || id === 'grapes:r' || id === 'grapes:w') {
    def.kind = 'grape';
    def.name = id === 'grapes' ? v32W('grapeCards') : id === 'grapes:r' ? v32W('redGrapes') : v32W('whiteGrapes');
    var c = id.slice(7);
    def.cards = v32GrapeCards(v32LevelGrapes().filter(function (g) { return !c || g.c === c; }));
  }
  else if (id === 'grapes-all' || id === 'grapes-all:r' || id === 'grapes-all:w') {
    def.kind = 'grape';
    def.name = id === 'grapes-all' ? v32W('everyGrape') : id === 'grapes-all:r' ? v32W('redGrapes') : v32W('whiteGrapes');
    var c2 = id.slice(11);
    def.cards = v32GrapeCards(v32AllGrapes().filter(function (g) { return !c2 || g.c === c2; }));
  }
  else if (id === 'misses') { def.name = v32W('missesDeck'); def.cards = v32HouseCards(V32_MISSES.slice()); }
  else if (id === 'due') { def.name = v32W('dueRow'); def.cards = v32HouseCards(v32DueToday().houseIds); }
  def.learnt = v32Learnt(def);
  return def;
}

function v32Learnt(def) {
  if (def.kind === 'grape') {
    var rec = v32GrapeRec();
    return def.cards.filter(function (c) { return rec[c.id] === 'got'; }).length;
  }
  if (def.kind === 'word') {
    var seen = {};
    return def.cards.filter(function (c) {
      if (seen[c.id]) return false;
      seen[c.id] = 1;
      return v32Latest(c.id) === 'got';
    }).length;
  }
  return v32Prog(def.cards.map(function (c) { return c.id; })).got;
}

function v32DeckRow(id, name) {
  var def = v32DeckDef(id);
  if (!def.cards.length) return '';
  return '<li><button class="v25row" type="button" data-v32="deck" data-deck="' + v32Esc(id) + '">'
    + '<span class="v25row-name">' + v32Esc(name || def.name) + '</span>'
    + '<span class="v25row-line">' + v32Esc(v32W('rowLine', { n: def.cards.length, m: def.learnt })) + '</span></button></li>';
}

/* =========== the run: one card screen for every deck =========== */

/* S._v32run = { v32, deckId, kind, label, cards, deck (indices still to
   deal, the first is showing), flip, done, again, total, missed, dir,
   filter }. While it deals grapes it is S.fc too, so core's keys (space to
   flip, 1 and 2 to grade) and codex28's grape door keep working on it. */
function v32StartRun(deckId, opts) {
  var o = opts || {};
  var def = v32DeckDef(deckId);
  if (o.cards) def.cards = o.cards;
  if (!def.cards.length) { if (typeof toast === 'function') toast(v32W('empty')); return false; }
  var order = def.cards.map(function (c, i) { return i; });
  if (def.kind !== 'house' || (deckId !== 'due' && deckId !== 'misses')) {
    if (typeof shuffle === 'function' && order.length > 1 && !o.keepOrder) order = shuffle(order);
  }
  if (o.first) {
    var at = -1;
    def.cards.forEach(function (c, i) { if (c.id === o.first) at = i; });
    if (at >= 0) order = [at].concat(order.filter(function (i) { return i !== at; }));
  }
  var prevDir = S._v32run && S._v32run.dir ? S._v32run.dir : (S.fc && S.fc.dir) || 'n2p';
  var run = {
    v32: 1, deckId: deckId, kind: def.kind, label: def.name, cards: def.cards, deck: order,
    flip: false, done: 0, again: 0, total: order.length, missed: [], dir: o.dir || prevDir,
    filter: 'all', after: o.after || null
  };
  S._v32run = run;
  S._v28deck = null;
  S.fc = def.kind === 'grape' ? run : null;
  S.view = def.kind === 'grape' ? 'flash' : 'housedeck';
  if (o.push) V32.pend = 'push';
  render();
  v32ShowCard();
  return true;
}

function v32RunCard() {
  var r = S._v32run;
  if (!r || !r.deck.length) return null;
  return r.cards[r.deck[0]] || null;
}

function v32Grade(got) {
  var r = S._v32run;
  if (!r || !r.flip || !r.deck.length) return;
  var i = r.deck.shift();
  var c = r.cards[i];
  if (c) {
    if (c.kind === 'house' && typeof v27RecordHouse === 'function') v27RecordHouse('h-' + c.id + '-card', 'Our List', c.c.name, !!got);
    else if (c.kind === 'word' && typeof v27RecordHouse === 'function') v27RecordHouse('h-' + c.id + '-word', 'Our List', c.front, !!got);
    else if (c.kind === 'grape') v32GrapeMark(c.id, !!got);
  }
  if (got) r.done++;
  else {
    r.again++;
    if (r.missed.indexOf(i) < 0) r.missed.push(i);
    /* the grape cards keep their own rule: a card sent back comes round again within four */
    if (c && c.kind === 'grape') r.deck.splice(Math.min(4, r.deck.length), 0, i);
  }
  r.flip = false;
}

/* =========== the router =========== */

/* d: the depth of the current entry; key: the screen it shows; pend: what
   the next render does with the history ('push', 'replace', 'none');
   liveRun and liveTok: the run the app holds in memory and its entry;
   toks: the token each run number was made for, so a pop to any entry,
   not only the newest, can tell whether memory still holds its run. */
var V32 = {
  d: 0, key: null, view: null, pend: 'none', booted: false, moved: false, rendering: false,
  run: 0, liveRun: 0, liveTok: null, toks: {}, lastPress: null, from: '', v28state: null, wantSec: null, focusFor: {}, renders: 0
};

var V32_RUN = { quiz: 1, results: 1, grid: 1, floor: 1, floortally: 1, pairs: 1, pairtally: 1, tasting: 1, finalsreport: 1, housedeck: 1, flash: 1 };

/* Who owns each view: the word lit in the bar. */
var V32_OWNER = {
  home: 'home', level: 'home', today: 'home', cellar: 'home', menudesk: 'home', winepaste: 'home', house: 'home', housereview: 'home', firstweek: 'home',
  flashcards: 'flashcards', deck: 'flashcards', flash: 'flashcards', housedeck: 'flashcards',
  quizzes: 'quizzes', quiz: 'quizzes', results: 'quizzes', drillpick: 'quizzes', sim: 'quizzes', grid: 'quizzes', floor: 'quizzes',
  floortally: 'quizzes', pairs: 'quizzes', pairtally: 'quizzes', finalsreport: 'quizzes', tasting: 'quizzes', service: 'quizzes',
  cellarrecite: 'quizzes', houserecite: 'quizzes', housesay: 'quizzes', houseguest: 'quizzes',
  library: 'library', primers: 'library', primer: 'library', ency: 'library', producers: 'library', worldmap: 'library',
  compendium: 'library', terroir: 'library', videos: 'library', tastegrid: 'library', fulllist: 'library', housevideos: 'library',
  more: 'more', mine: 'more', record: 'more', dash: 'more', hall: 'more', sync: 'more', plan: 'more', disputes: 'more',
  exams: 'more', maitre: 'more', 'oot-pass': 'more'
};

/* The logical parent of each view, for Back at depth 0 (5.9). */
var V32_PARENT = {
  home: null, level: 'home', today: 'home', firstweek: 'level',
  cellar: 'level', menudesk: 'level', winepaste: 'level', house: 'level', housereview: 'level',
  flashcards: 'home', deck: 'flashcards', housedeck: 'deck', flash: 'deck',
  quizzes: 'home', quiz: 'quizzes', results: 'quizzes', drillpick: 'quizzes', sim: 'quizzes', grid: 'quizzes', floor: 'quizzes',
  floortally: 'quizzes', pairs: 'quizzes', pairtally: 'quizzes', tasting: 'quizzes', service: 'quizzes', cellarrecite: 'quizzes',
  houserecite: 'quizzes', housesay: 'quizzes', houseguest: 'quizzes', finalsreport: 'quizzes',
  library: 'home', primers: 'library', primer: 'primers', ency: 'library', producers: 'library', worldmap: 'library',
  compendium: 'library', terroir: 'library', videos: 'library', tastegrid: 'library', fulllist: 'library', housevideos: 'library',
  more: 'home', mine: 'home', record: 'more', dash: 'more', hall: 'more', sync: 'more', plan: 'more', disputes: 'more',
  exams: 'more', maitre: 'more', 'oot-pass': 'more'
};

function v32Path() {
  try { return (location.pathname || '') + (location.search || ''); } catch (e) { return ''; }
}

/* The argument a view carries in its address. */
function v32Arg(v) {
  try {
    if (v === 'primer') return S.primerKey == null ? '' : String(S.primerKey);
    if (v === 'producers') {
      var p = S._prod || {};
      if (p.id) return String(p.id);
      return (p.c === null || p.c === undefined) ? '' : 'c' + p.c;
    }
    if (v === 'worldmap') return S.wmap ? String(S.wmap) : '';
    if (v === 'compendium') return S.cmp && S.cmp.sec ? String(S.cmp.sec) : '';
    if (v === 'videos') return S.vidFocus ? String(S.vidFocus) : '';
  } catch (e) { }
  return '';
}

function v32DeckSeg(id) {
  if (id === 'misses') return 'misses/' + V32_MISSES.join(',');
  return id;
}

/* The screen showing now: its key (what decides push or replace) and its
   address (which also carries the in-screen state a reload should keep). */
function v32Route() {
  var v = S.view, all = v32All();
  var R = function (key, hash) { return { view: v, key: key, hash: hash }; };
  if (v === 'home') return R('home', '#/');
  if (v === 'level' || v === 'today') return R('level', '#/level');
  if (v === 'flashcards') return R('flashcards', '#/flashcards' + (all.flashcards ? '/all' : ''));
  if (v === 'deck') return R('deck/' + S._v32deck, '#/flashcards/' + v32DeckSeg(S._v32deck));
  if (v === 'housedeck' || v === 'flash') {
    var r = S._v32run;
    var id = r && r.v32 ? r.deckId : 'grapes';
    return R('card/' + id, '#/flashcards/' + v32DeckSeg(id) + '/card');
  }
  if (v === 'quizzes') return R('quizzes', '#/quizzes' + (all.quizzes ? '/all' : ''));
  if (v === 'quiz' && S.section === V32_QUICK) return R('quiz', '#/quizzes/quick');
  if (v === 'library') return R('library', '#/library' + (all.library ? '/all' : ''));
  if (v === 'more' || v === 'mine') return R('more', '#/more');
  if (v === 'cellar') {
    var st = S._v28 || {};
    if (st.open) return R('cellar/' + st.open, '#/v/cellar/' + st.open);
    if (st.sec && st.sec.indexOf('#bottles|') === 0) return R('cellar', '#/v/cellar/section/floor/' + v32Slug(st.sec.slice(9)));
    if (st.sec === '#bottles') return R('cellar', '#/v/cellar/section/floor');
    if (st.sec) return R('cellar', '#/v/cellar/section/' + v32Slug(st.sec));
    return R('cellar', '#/v/cellar');
  }
  var arg = v32Arg(v);
  return R(v + (arg ? '/' + arg : ''), '#/v/' + v + (arg ? '/' + encodeURIComponent(arg) : ''));
}

/* An address read back into a route: { view, arg, all, deck, card, sec, floor }. */
function v32Parse(hash) {
  var h = String(hash || '');
  if (h === '' || h === '#' || h === '#/') return { view: 'home' };
  if (h.indexOf('#/') !== 0) return null;
  var parts = h.slice(2).split('/').map(function (p) { try { return decodeURIComponent(p); } catch (e) { return p; } });
  var a = parts[0];
  if (a === 'level') return { view: 'level' };
  if (a === 'flashcards') {
    if (!parts[1]) return { view: 'flashcards' };
    if (parts[1] === 'all') return { view: 'flashcards', all: true };
    if (parts[1] === 'misses') {
      var ids = String(parts[2] || '').split(',').filter(function (x) { return /^w-[a-z0-9]{8}$/.test(x); });
      return { view: parts[3] === 'card' ? 'card' : 'deck', deck: 'misses', ids: ids };
    }
    return { view: parts[2] === 'card' ? 'card' : 'deck', deck: parts[1] };
  }
  if (a === 'quizzes') {
    if (parts[1] === 'quick') return { view: 'quick' };
    return { view: 'quizzes', all: parts[1] === 'all' };
  }
  if (a === 'library') return { view: 'library', all: parts[1] === 'all' };
  if (a === 'more') return { view: 'more' };
  if (a === 'v' && parts[1]) {
    var v = parts[1];
    if (v === 'mine' || v === 'more') return { view: 'more' };
    if (v === 'today' || v === 'level') return { view: 'level' };
    if (!Object.prototype.hasOwnProperty.call(V32_PARENT, v)) return { view: 'home' };
    if (v === 'cellar') {
      if (parts[2] === 'section') {
        if (parts[3] === 'floor') return { view: 'cellar', floor: true, sec: parts[4] || '' };
        return { view: 'cellar', sec: parts[3] || '' };
      }
      if (/^w-[a-z0-9]{8}$/.test(parts[2] || '')) return { view: 'cellar', arg: parts[2] };
      return { view: 'cellar' };
    }
    return { view: v, arg: parts.slice(2).join('/') };
  }
  return { view: 'home' };
}

/* The token of the run a view shows, so a pop can tell whether memory still
   holds the run its entry was made for. */
function v32Tok(v) {
  if (v === 'quiz' || v === 'results') return (S.pool && S.pool.length) ? S.pool : null;
  if (v === 'housedeck' || v === 'flash') return S._v32run || null;
  if (v === 'grid') return S.tg || null;
  if (v === 'floor' || v === 'floortally') return S.fl || null;
  if (v === 'pairs' || v === 'pairtally') return S.pr || null;
  if (v === 'tasting') return S.tt || null;
  if (v === 'finalsreport') return S._v25lt || S._fin || null;
  return null;
}
function v32InMemory(v, state) {
  var tok = v32Tok(v);
  if (!tok) return false;
  /* an entry that names its run is held to that run's own token: Study the
     misses pushes a new run, and the results below it still render from
     memory while S.pool and S.results hold their round */
  var held = (state && typeof state.run === 'number')
    ? (Object.prototype.hasOwnProperty.call(V32.toks, state.run) ? V32.toks[state.run] : null)
    : V32.liveTok;
  if (!held) return false;
  if (S._v25lt && (v === 'quiz' || v === 'grid' || v === 'floor' || v === 'finalsreport')) return tok === held || held === S._v25lt;
  if (v === 'results') return !!(S.results && S.results.length) && tok === held;
  return tok === held;
}

/* The token a run number was made for, the newest sixty kept. */
function v32KeepTok(run, tok) {
  if (typeof run !== 'number' || !tok) return;
  V32.toks[run] = tok;
  var ks = Object.keys(V32.toks);
  if (ks.length > 60) {
    ks.map(Number).sort(function (a, b) { return a - b; }).slice(0, ks.length - 60).forEach(function (k) { delete V32.toks[k]; });
  }
}

/* Puts S where a route says. Returns the route actually shown, which for a
   run memory no longer holds is its parent. */
function v32Apply(r, state) {
  if (!r) r = { view: 'home' };
  var v = r.view;
  var all = v32All();
  S._v25area = null;
  if (v === 'home') { S.view = 'home'; S.mode = null; return r; }
  if (v === 'level') { S.view = 'level'; return r; }
  if (v === 'flashcards') { all.flashcards = !!r.all; S.view = 'flashcards'; return r; }
  if (v === 'deck') {
    if (r.deck === 'misses' && r.ids) V32_MISSES = r.ids.slice();
    S._v32deck = r.deck; S.view = 'deck'; return r;
  }
  if (v === 'card') {
    var run = S._v32run;
    if (run && run.v32 && run.deckId === r.deck && v32InMemory(run.kind === 'grape' ? 'flash' : 'housedeck', state)) {
      S.view = run.kind === 'grape' ? 'flash' : 'housedeck';
      if (run.kind === 'grape') S.fc = run;
      return r;
    }
    if (r.deck === 'due') { S.view = 'flashcards'; return { view: 'flashcards' }; }
    var one = /^one:(w-[a-z0-9]{8})$/.exec(r.deck || '');
    if (one) return v32Apply({ view: 'cellar', arg: one[1] }, null);
    if (r.deck === 'misses' && r.ids && r.ids.length) {
      V32_MISSES = r.ids.slice();
      var def = v32DeckDef('misses');
      if (def.cards.length) {
        S._v32run = null;
        var o = { v32: 1, deckId: 'misses', kind: 'house', label: def.name, cards: def.cards, deck: def.cards.map(function (c, i) { return i; }),
          flip: false, done: 0, again: 0, total: def.cards.length, missed: [], dir: 'n2p', filter: 'all' };
        S._v32run = o; S.view = 'housedeck';
        return r;
      }
    }
    S._v32deck = r.deck; S.view = 'deck';
    return { view: 'deck', deck: r.deck };
  }
  if (v === 'quizzes') { all.quizzes = !!r.all; S.view = 'quizzes'; return r; }
  if (v === 'quick') {
    if (S.section === V32_QUICK && v32InMemory('quiz', state)) { S.view = 'quiz'; return r; }
    S.view = 'quizzes'; return { view: 'quizzes' };
  }
  if (v === 'library') { all.library = !!r.all; S.view = 'library'; return r; }
  if (v === 'more') { S.view = 'more'; return r; }
  if (v === 'cellar') {
    var st = (typeof v28State === 'function') ? v28State() : (S._v28 || (S._v28 = {}));
    S._v28edit = false;
    st.door = null; st.q = st.q || '';
    S.view = 'cellar';
    if (r.arg) {
      var found = false;
      try { found = !!v28Find(v28Rows(), r.arg); } catch (e) { found = false; }
      if (found) { st.open = r.arg; st.pushed = true; st.focus = 'head'; }
      else { st.open = null; try { V28_WANT = { wine: r.arg }; } catch (e) { } }
    } else {
      st.open = null;
      if (r.sec !== undefined || r.floor) {
        if (r.floor && !r.sec) st.sec = '#bottles';
        else {
          var name = v32SecBySlug(r.sec, !!r.floor);
          if (name) st.sec = r.floor ? '#bottles|' + name : name;
          else V32.wantSec = { slug: r.sec, floor: !!r.floor };
        }
      } else st.sec = '';
      st.focus = 'restore';
    }
    return r;
  }
  if (V32_RUN[v]) {
    if (v32InMemory(v, state)) { S.view = v; return r; }
    var up = V32_PARENT[v] || 'quizzes';
    S.view = up;
    return { view: up };
  }
  var arg = r.arg || '';
  if (v === 'primer') {
    if (!arg) { S.view = 'primers'; return { view: 'primers' }; }
    S.primerKey = /^\d+$/.test(arg) && typeof activeLevel !== 'undefined' && activeLevel === 'intro' ? Number(arg) : arg;
  } else if (v === 'producers') {
    var pc = /^c(\d+)$/.exec(arg);
    if (pc) S._prod = { c: Number(pc[1]), id: null };
    else if (arg) {
      var ci = null;
      try {
        var rec = prodById(arg);
        if (rec) prodGroups().forEach(function (g, i) { if (g.rows.indexOf(rec) >= 0) ci = i; });
      } catch (e) { }
      S._prod = ci === null ? { c: null, id: null } : { c: ci, id: arg };
    } else S._prod = { c: null, id: null };
  } else if (v === 'worldmap') S.wmap = arg || null;
  else if (v === 'compendium') S.cmp = arg ? { sec: arg, idx: null, reg: null } : null;
  else if (v === 'videos') S.vidFocus = arg || null;
  S.view = v;
  return r;
}

/* The route one step up the tree from the screen showing. */
function v32ParentRoute() {
  var v = S.view;
  if (v === 'today') v = 'level';
  if (v === 'mine') v = 'more';
  if (v === 'cellar') {
    var st = S._v28 || {};
    if (st.open) {
      var sec = st.sec || '';
      if (!sec) return { view: 'cellar' };
      if (sec === '#bottles') return { view: 'cellar', floor: true, sec: '' };
      if (sec.indexOf('#bottles|') === 0) return { view: 'cellar', floor: true, sec: v32Slug(sec.slice(9)) };
      return { view: 'cellar', sec: v32Slug(sec) };
    }
    return { view: 'level' };
  }
  if (v === 'housedeck' || v === 'flash') {
    var r = S._v32run;
    if (!r || !r.v32) return { view: 'flashcards' };
    var one = /^one:(w-[a-z0-9]{8})$/.exec(r.deckId);
    if (one) return { view: 'cellar', arg: one[1] };
    if (r.deckId === 'due') return { view: 'flashcards' };
    return { view: 'deck', deck: r.deckId, ids: r.deckId === 'misses' ? V32_MISSES.slice() : null };
  }
  if (v === 'quiz' && S.section === V32_QUICK) return { view: 'quizzes' };
  var arg = v32Arg(v);
  if (v === 'producers' && arg) {
    if (/^c\d+$/.test(arg)) return { view: 'producers' };
    var p = S._prod || {};
    return (p.c === null || p.c === undefined) ? { view: 'producers' } : { view: 'producers', arg: 'c' + p.c };
  }
  if ((v === 'worldmap' || v === 'compendium' || v === 'videos') && arg) return { view: v };
  var up = Object.prototype.hasOwnProperty.call(V32_PARENT, v) ? V32_PARENT[v] : 'home';
  return { view: up || 'home' };
}

function v32Mirror() {
  var href = '';
  try { href = location.href; } catch (e) { href = ''; }
  v32SessSet(V32_NAV_KEY, { d: V32.d, href: href });
}

function v32Hist(kind, state, url) {
  try {
    if (typeof history === 'undefined' || !history) return false;
    if (kind === 'push' && typeof history.pushState === 'function') { history.pushState(state, '', url); return true; }
    if (kind === 'replace' && typeof history.replaceState === 'function') { history.replaceState(state, '', url); return true; }
  } catch (e) { }
  return false;
}

function v32CurState() {
  try { return (typeof history !== 'undefined' && history && history.state && typeof history.state === 'object') ? history.state : {}; }
  catch (e) { return {}; }
}

/* After every render: write the entry for the screen now showing. */
function v32After(prevView) {
  var r = v32Route();
  var url = v32Path() + r.hash;
  var mode = V32.pend;
  V32.pend = null;
  if (!V32.booted) mode = 'none';
  var runPair = !!(prevView && V32_RUN[prevView] && V32_RUN[S.view]);
  var cur = v32CurState();
  var tok = V32_RUN[S.view] ? v32Tok(S.view) : null;
  var state;
  if (mode === 'push' || (mode !== 'none' && mode !== 'replace' && r.key !== V32.key && !runPair)) {
    V32.d += 1;
    V32.moved = true;
    V32.from = '';
    state = Object.assign({}, V32.v28state || {}, { ootd: V32.d });
    if (tok) { V32.run += 1; V32.liveRun = V32.run; V32.liveTok = tok; state.run = V32.run; v32KeepTok(state.run, tok); }
    v32Hist('push', state, url);
  } else {
    state = Object.assign({}, cur, V32.v28state || {}, { ootd: V32.d });
    if (tok && tok !== V32.liveTok) {
      /* a new run in the same entry (Deal another, Study the misses after a deck) */
      if (typeof cur.run !== 'number' || mode !== 'none') { V32.run += 1; V32.liveRun = V32.run; state.run = V32.run; }
      else { state.run = cur.run; V32.liveRun = cur.run; }
      V32.liveTok = tok;
      v32KeepTok(state.run, tok);
    } else if (tok && typeof cur.run === 'number') { state.run = cur.run; V32.liveRun = cur.run; v32KeepTok(state.run, tok); }
    v32Hist('replace', state, url);
  }
  V32.v28state = null;
  V32.key = r.key;
  V32.view = S.view;
  V32.booted = true;
  v32Mirror();
}

function v32SaveScroll() {
  try {
    var href = location.href;
    var y = window.scrollY || window.pageYOffset || 0;
    var map = v32SessGet(V32_SCROLL_KEY) || { k: [], y: {} };
    if (!map.k || !map.y) map = { k: [], y: {} };
    if (!(href in map.y)) map.k.push(href);
    map.y[href] = y;
    while (map.k.length > 60) { var old = map.k.shift(); delete map.y[old]; }
    v32SessSet(V32_SCROLL_KEY, map);
  } catch (e) { }
}
function v32RestoreScroll() {
  var y = 0;
  try {
    var map = v32SessGet(V32_SCROLL_KEY);
    y = map && map.y && typeof map.y[location.href] === 'number' ? map.y[location.href] : 0;
  } catch (e) { y = 0; }
  var go = function () { try { window.scrollTo(0, y); } catch (e) { } };
  go();
  try {
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { requestAnimationFrame(go); });
  } catch (e) { }
}

/* The opener of a move, remembered so a Back can focus it again: by id
   where it has one, else by the data attributes that name it (codex28's
   rows carry data-id and no id). */
var V32_FOCUS_ATTRS = ['data-v28', 'data-v32', 'data-go', 'data-nav', 'data-id', 'data-deck', 'data-cat', 'data-g', 'data-lv', 'data-k', 'data-s', 'data-find-p'];
function v32FocusKey(el) {
  try {
    if (!el || el.nodeType !== 1 || typeof el.getAttribute !== 'function') return '';
    if (el === document.body || el === document.documentElement) return '';
    if (el.id) return 'id:' + el.id;
    var sel = '';
    V32_FOCUS_ATTRS.forEach(function (k) {
      var v = el.getAttribute(k);
      if (v !== null && v !== '') sel += '[' + k + '="' + String(v).replace(/["\\]/g, '\\$&') + '"]';
    });
    return sel ? 'sel:' + String(el.tagName || '').toLowerCase() + sel : '';
  } catch (e) { return ''; }
}
function v32Remember(el) {
  var k = v32FocusKey(el);
  try { if (k) V32.focusFor[location.href] = k; } catch (e) { }
}
/* The control pressed last: a tap on a phone does not always focus it. */
function v32PushOpener() {
  try {
    var a = document.activeElement;
    var c = V32.lastPress;
    if (a && a !== document.body && v32FocusKey(a)) { v32Remember(a); return; }
    if (c && c.isConnected !== false && document.contains && document.contains(c)) v32Remember(c);
  } catch (e) { }
}
function v32Focus(href) {
  var k = V32.focusFor[href];
  try {
    var n = null;
    if (k && k.indexOf('sel:') === 0) n = document.querySelector('#view ' + k.slice(4)) || document.querySelector(k.slice(4));
    else if (k) n = document.getElementById(k.indexOf('id:') === 0 ? k.slice(3) : k);
    if (n && typeof n.focus === 'function') { n.focus({ preventScroll: true }); return; }
  } catch (e) { }
  if (typeof v25FocusMain === 'function') v25FocusMain();
}

/* A running round left by a move: the guard each wing asks, and core's own
   teardown, exactly as a nav word does. */
function v32Running() {
  return S.view === 'quiz' && !!S.mode && !!(S.pool && S.pool.length);
}

/* A starter that may decline (a toast, nothing to deal) leaves no push
   waiting for some later render. */
function v32Push(fn) {
  var n = V32.renders;
  V32.pend = 'push';
  try { fn(); } finally { if (V32.renders === n) V32.pend = null; }
}

/* One move: apply a route, render, and record it as asked. */
function v32Go(route, mode) {
  try { v32Remember(document.activeElement); } catch (e) { }
  v32Apply(route, null);
  V32.pend = mode || 'push';
  render();
  if (typeof v25FocusMain === 'function') v25FocusMain();
}

/* The Back control. */
function v32Back() {
  if (v32Running() && typeof v25Leave === 'function' && !v25Leave()) return;
  if (V32.d > 0) {
    try { history.back(); return; } catch (e) { }
  }
  v32Go(v32ParentRoute(), 'replace');
}

function v32OnPop(e) {
  var st = (e && e.state && typeof e.state === 'object') ? e.state : null;
  if (!st || typeof st.ootd !== 'number') {
    /* an entry the browser made for the app (a hash link): adopted, one deeper */
    var adopt = Object.assign({}, st || {}, { ootd: V32.d + 1 });
    v32Hist('replace', adopt, null);
    st = adopt;
  }
  if (v32Running() && typeof v25Leave === 'function' && !v25Leave()) {
    /* the sitting stays: put back the entry the gesture took */
    v32Hist('push', Object.assign({}, v32CurState(), { ootd: V32.d }), v32Path() + v32Route().hash);
    return;
  }
  V32.d = st.ootd;
  /* the address is already the popped entry's: the page leaving is not saved under it */
  V32.popping = true;
  var route = null;
  try { route = v32Parse(location.hash); } catch (e2) { route = null; }
  v32Apply(route || { view: 'home' }, st);
  V32.pend = 'none';
  render();
  v32RestoreScroll();
  v32Focus(location.href);
}

/* An in-app link to an address goes through the push, never through a
   location.hash assignment, so it makes one entry with its depth. */
function v32LinkClick(e) {
  try {
    var t = e && e.target;
    var a = t && typeof t.closest === 'function' ? t.closest('a[href^="#/"]') : null;
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    v32Go(v32Parse(a.getAttribute('href')), 'push');
  } catch (err) { }
}

/* =========== the old pushes, folded in =========== */

if (typeof v28Push === 'function') {
  v28Push = function (state) { V32.pend = 'push'; V32.v28state = state || null; return true; };
}
/* codex28's own pushes (a row opening its card, a door) remember their
   opener too, so Back focuses the row that opened the card. */
if (typeof v28Push === 'function') {
  var _v32V28Push = v28Push;
  v28Push = function (state) { v32PushOpener(); return _v32V28Push.apply(this, arguments); };
}
if (typeof v28Replace === 'function') {
  v28Replace = function (state) { if (V32.pend !== 'push') V32.pend = 'replace'; V32.v28state = state || null; };
}
if (typeof v28Back === 'function') v28Back = function () { v32Back(); };
if (typeof v28CloseCard === 'function') v28CloseCard = function () { v32Back(); };
if (typeof v28DeckClose === 'function') v28DeckClose = function () { v32Back(); };
if (typeof v29Close === 'function') v29Close = function () { v32Back(); };
if (typeof v29Leave === 'function') v29Leave = function () { v32Back(); };
if (typeof V25_TRAIN !== 'undefined' && V25_TRAIN && V25_TRAIN.backlevel) {
  V25_TRAIN.backlevel.go = function () { v32Back(); };
  if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO.backlevel = V25_TRAIN.backlevel.go;
}
/* The deep link's wish, honoured at load or after the first sync, is the
   landing itself, not a move: it replaces. */
if (typeof v28Want === 'function') {
  var _v32Want = v28Want;
  v28Want = function () {
    var ok = _v32Want.apply(this, arguments);
    if (ok && !V32.moved) V32.pend = 'none';
    return ok;
  };
}
/* codex28's and codex29's own listeners leave: codex32's one listener
   renders every entry, theirs included. */
try {
  if (typeof window !== 'undefined' && window && typeof window.removeEventListener === 'function') {
    if (typeof v28OnPop === 'function') window.removeEventListener('popstate', v28OnPop);
    if (typeof v29OnPop === 'function') window.removeEventListener('popstate', v29OnPop);
  }
} catch (e) { }

/* Every house deck a codex28 button starts opens the one deck screen; a
   single wine's cards start at once. */
if (typeof startHouseDeck === 'function') {
  startHouseDeck = function (scope) {
    var s = scope || {};
    if (s.itemIds && s.itemIds.length === 1) return v32StartRun('one:' + s.itemIds[0], { push: true });
    var id = 'list';
    if (s.weak) id = 'list-weak';
    else if (typeof s.section === 'string' && s.section) {
      if (s.section === '#bottles') id = 'bottles';
      else if (s.section.indexOf('#bottles|') === 0) id = 'bottles:' + v32Slug(s.section.slice(9));
      else id = 'list:' + v32Slug(s.section);
    }
    v32OpenDeck(id);
    return true;
  };
}
/* The grape cards, from anywhere, are a run on the one card screen. */
if (typeof startFlash === 'function') {
  startFlash = function () { return v32StartRun('grapes', { push: true }); };
}
if (typeof flashGrade === 'function') {
  flashGrade = function (ok) { v32Grade(!!ok); render(); };
}

function v32OpenDeck(id) {
  S._v32deck = id;
  S.view = 'deck';
  V32.pend = 'push';
  render();
  if (typeof v25FocusMain === 'function') v25FocusMain();
}

/* =========== starting what Today's study offers =========== */

function v32StartDue() {
  var t = v32DueToday();
  if (t.a) {
    var cards = v32HouseCards(t.houseIds);
    if (cards.length) return v32StartRun('due', { cards: cards, keepOrder: true, push: true, after: t.b ? 'daily' : null });
  }
  if (t.b && typeof startDaily === 'function') { v32Push(function () { startDaily(); }); return true; }
  return v32StartQuick();
}

/* Five house questions, dealt one at a time by the engine (codex27's kinds
   and its question literal), never the whole round: dealing every question
   the house holds to keep five is seconds of work on a phone. */
function v32DealHouse(kinds, cat, want) {
  var out = [], seen = {};
  var h = v32House();
  var lib = (typeof v27Lib === 'function') ? v27Lib() : null;
  if (!h || !lib || typeof lib.dealQuestion !== 'function' || typeof v27Question !== 'function') return out;
  try { if (typeof v27HasKept === 'function' && !v27HasKept(h)) return out; } catch (e) { return out; }
  var ks = (typeof shuffle === 'function') ? shuffle((kinds || []).slice()) : (kinds || []).slice();
  if (!ks.length) return out;
  var views = {};
  for (var t = 0; t < want * 6 && out.length < want; t++) {
    var k = ks[t % ks.length];
    var house = h;
    if (k.view) { if (!views[k.key]) { try { views[k.key] = k.view(h); } catch (e) { views[k.key] = null; } } house = views[k.key]; }
    if (!house) continue;
    var dq = null;
    try { dq = lib.dealQuestion(house, k.kind, Math.random); } catch (e) { dq = null; }
    if (!dq || seen[dq.itemId + k.key]) continue;
    var q = null;
    try { q = v27Question(dq, k.key, k.label(), cat); } catch (e) { q = null; }
    if (!q) continue;
    seen[dq.itemId + k.key] = 1;
    out.push(q);
  }
  return out;
}

function v32QuickPool() {
  var house = v32DealHouse(typeof V27_CELLAR_KINDS !== 'undefined' ? V27_CELLAR_KINDS : [], typeof V27_CELLAR_SECTION !== 'undefined' ? V27_CELLAR_SECTION : 'Our List', 5);
  if (house.length < 5) house = house.concat(v32DealHouse(typeof V27_PAIR_KINDS !== 'undefined' ? V27_PAIR_KINDS : [], typeof V27_PAIR_SECTION !== 'undefined' ? V27_PAIR_SECTION : 'Pair the menu', 5 - house.length));
  house = house.slice(0, 5);
  var bank = (typeof QUESTIONS !== 'undefined' && QUESTIONS) ? QUESTIONS : [];
  var mc = shuffle(bank.filter(function (q) { return q && !q.sa && !q.mt && !q.sel && q.opts; }));
  var need = 10 - house.length;
  var lvl = mc.slice(0, need);
  if (lvl.length < need) {
    var rest = shuffle(bank.filter(function (q) { return lvl.indexOf(q) < 0; }));
    lvl = lvl.concat(rest.slice(0, need - lvl.length));
  }
  var out = [];
  var i = 0, j = 0;
  while (i < house.length || j < lvl.length) {
    if (i < house.length) out.push(house[i++]);
    if (j < lvl.length) out.push(lvl[j++]);
  }
  return out.slice(0, 10);
}

function v32StartQuick() {
  var pool = v32QuickPool();
  if (!pool.length) { render(); return false; }
  if (typeof stopTimer === 'function') stopTimer();
  S._fin = null; S._v25lt = null;
  S.mode = 'drill'; S.section = V32_QUICK; S._again = v32StartQuick;
  S.pool = pool; S.idx = 0; S.correct = 0; S.results = [];
  if (typeof resetQ === 'function') resetQ();
  S.view = 'quiz';
  if (!V32_RUN[V32.view]) V32.pend = 'push';
  render();
  return true;
}

/* Whether the house can deal its five, asked once per house record: dealing
   every question to count them is far too dear for a line drawn on every render. */
var V32_HQ = { h: null, n: 0 };
function v32HouseQCount() {
  var h = v32House();
  if (!h) return 0;
  var key = String(h.id) + '|' + JSON.stringify(h.lastWrite || h.createdAt || '') + '|' + (Array.isArray(h.wines) ? h.wines.length : 0);
  if (V32_HQ.h === key) return V32_HQ.n;
  var n = v32DealHouse(typeof V27_CELLAR_KINDS !== 'undefined' ? V27_CELLAR_KINDS : [], 'Our List', 1).length;
  V32_HQ.h = key; V32_HQ.n = n;
  return n;
}

function v32QuickLine() {
  var lv = v32Lv().name;
  return v32HouseQCount() ? v32W('quickLine', { level: lv }) : v32W('quickLineLevel', { level: lv });
}

/* The chapter of the first section at this level not yet met. */
function v32NextReading(lv) {
  lv = lv || activeLevel;
  var hit = null;
  try {
    v25Subs(lv).some(function (s) {
      if (s.kind !== 'domain') return false;
      return s.cats.some(function (c) {
        var t = s.tally[c] || { met: 0, total: 0 };
        if (t.total && t.met >= t.total) return false;
        if (!v25HasChapter(c, lv)) return false;
        hit = { cat: c, title: v32ChapterTitle(c, lv) };
        return true;
      });
    });
  } catch (e) { hit = null; }
  return hit;
}
function v32ChapterTitle(cat, lv) {
  if (lv === 'intro' && typeof V25_INTRO_CHAPTERS !== 'undefined') {
    var id = V25_INTRO_CHAPTERS[cat];
    var L = LEVELS[lv];
    var p = null;
    ((L && L.primers) || []).some(function (x) { if (x && x.id === id) { p = x; return true; } return false; });
    return p && p.t ? p.t : cat;
  }
  return cat;
}

function v32FirstWeek() { try { return (typeof v25FirstWeek === 'function') ? v25FirstWeek() : null; } catch (e) { return null; } }

/* =========== the pieces every page is built from =========== */

function v32Head(title, sub) {
  return '<div class="viewhead"><h2 tabindex="-1" class="v32-h">' + v32Esc(title) + '</h2>'
    + (sub ? '<div class="sub">' + v32Esc(sub) + '</div>' : '') + '</div>';
}
function v32Row(act, name, line, attrs) {
  return '<li><button class="v25row" type="button" data-v32="' + act + '"' + (attrs || '') + '>'
    + '<span class="v25row-name">' + v32Esc(name) + '</span>'
    + (line ? '<span class="v25row-line">' + v32Esc(line) + '</span>' : '') + '</button></li>';
}
function v32GoRow(key, name, line, arg) {
  return '<li><button class="v25row" type="button" data-go="' + v32Esc(key) + '"' + (arg != null ? ' data-arg="' + v32Esc(arg) + '"' : '') + '>'
    + '<span class="v25row-name">' + v32Esc(name) + '</span>'
    + (line ? '<span class="v25row-line">' + v32Esc(line) + '</span>' : '') + '</button></li>';
}
/* A registry row (V25_LIBRARY, V25_RECORD, V25_MINE, V27_DRILL_ROWS) by key, drawn only when it shows. */
function v32RegRow(list, key, name, line) {
  var r = null;
  (list || []).some(function (x) { if (x && x.key === key) { r = x; return true; } return false; });
  if (!r) return '';
  try { if (!r.show()) return ''; } catch (e) { return ''; }
  var l = line;
  if (l === undefined) { try { l = r.line(); } catch (e) { l = ''; } }
  if (typeof V25_GO !== 'undefined' && V25_GO && typeof V25_GO[key] !== 'function') V25_GO[key] = r.go;
  return v32GoRow(key, name || r.name, l);
}
function v32Rows(html) { return html ? '<ul class="v25rows v32rows">' + html + '</ul>' : ''; }
function v32Group(title, rows, id) {
  if (!rows) return '';
  return '<section class="v32-group"' + (id ? ' aria-labelledby="' + id + '"' : '') + '><h3 class="secgroup v32-gh"' + (id ? ' id="' + id + '"' : '') + '>' + v32Esc(title) + '</h3>' + v32Rows(rows) + '</section>';
}

/* The scope chip: the level by name and the way to every level, in words. */
function v32Scope(root) {
  var all = v32All()[root];
  var L = v32Lv();
  var open = !!S._v32scopeOpen;
  var html = '<div class="v32scope" role="group" aria-label="' + v32W('scopeLabel') + '">';
  if (all) {
    html += '<span class="v32scope-t">' + v32W('allLevels') + '</span><span class="v32scope-dot" aria-hidden="true"> \u00b7 </span>'
      + '<button type="button" class="v32scope-b" data-v32="scope-one">' + v32Esc(v32W('showOnly', { level: L.name })) + '</button>';
  } else {
    html += '<button type="button" class="v32scope-b v32scope-name" data-v32="scope-name" aria-expanded="' + (open ? 'true' : 'false') + '" aria-label="'
      + v32Esc(v32W('change', { level: L.name })) + '">' + v32Esc(L.name) + '</button><span class="v32scope-dot" aria-hidden="true"> \u00b7 </span>'
      + '<button type="button" class="v32scope-b" data-v32="scope-all">' + v32W('showAll') + '</button>';
  }
  html += '</div>';
  if (open && !all) {
    html += '<div class="v32scope-list" role="group" aria-label="' + v32W('scopeLabel') + '">' + v32Levels().map(function (x) {
      var on = x.key === L.key;
      return '<button type="button" class="v28-chip" data-v32="scope-pick" data-lv="' + x.key + '" aria-pressed="' + (on ? 'true' : 'false') + '">'
        + v32Esc(x.name) + (on ? ' \u00b7 ' + v32W('yourLevel') : '') + '</button>';
    }).join('') + '</div>';
  }
  return html;
}

/* =========== Home =========== */

var _v32HomeHtml = (typeof v25HomeHtml === 'function') ? v25HomeHtml : null;
if (_v32HomeHtml) {
  v25HomeHtml = function () {
    var html = _v32HomeHtml.apply(this, arguments);
    var at = html.indexOf('<nav class="quiet"');
    return at >= 0 ? html.slice(0, at) : html;
  };
}

/* =========== the level page =========== */

function v32TodayRows(lv) {
  var L = v32LvByKey(lv) || v32Lv();
  var t = v32DueToday();
  var rows = v32Row('due', v32W('dueRow'), v32DueLine(t), ' id="v32-due"')
    + v32Row('quick', v32W('quickRow'), v32QuickLine(), ' id="v32-quick"');
  var next = v32NextReading(lv);
  rows += next ? v32Row('chapter', v32W('nextRow'), v32W('nextLine', { title: next.title, level: L.name }), ' data-cat="' + v32Esc(next.cat) + '" id="v32-next"')
    : v32Row('library', v32W('nextRow'), v32W('nextNone', { level: L.name }), ' id="v32-next"');
  var fw = v32FirstWeek();
  if (fw && fw.done < fw.total) rows += v32Row('firstweek', v32W('weekRow'), v32W('weekLine', { done: fw.done, total: fw.total }), ' id="v32-week"');
  return rows;
}

function v32CountLine() {
  var h = v32House();
  var glass = v32Wines().filter(function (w) { return !(typeof v28IsBottle === 'function' && v28IsBottle(w)); });
  var secs = v32Sections();
  var p = v32Prog(v32Ids({ keepMeal: false }));
  var s = v32W('countLine', { house: (h && h.name) || '', n: glass.length, s: secs.length });
  if (!p.studied) return s + ' ' + v32W('studiedNone');
  return s + ' ' + (p.again ? v32W('studied', { x: p.studied, y: p.again }) : v32W('studiedOnly', { x: p.studied }));
}

function v32RestaurantHtml() {
  var html = '<section class="v32-sec" aria-labelledby="v32-rest-h"><h2 class="v32-h2" id="v32-rest-h">' + v32W('restH') + '</h2>';
  try { html += (typeof v25InboxHtml === 'function') ? v25InboxHtml() : ''; } catch (e) { }
  if (!v32HasHouse()) {
    html += '<p class="v32-line">' + v32W('noHouse') + '</p>';
    var setup = v32RegRow(typeof V25_MINE !== 'undefined' ? V25_MINE : [], 'house')
      || v32RegRow(typeof V25_MINE !== 'undefined' ? V25_MINE : [], 'cellar');
    var desk = v32RegRow(typeof V25_MINE !== 'undefined' ? V25_MINE : [], 'menudesk');
    return html + v32Rows(setup + desk) + '</section>';
  }
  var line = '';
  try { line = (typeof V27_HOUSE_ROW !== 'undefined' && V27_HOUSE_ROW) ? V27_HOUSE_ROW.line() : ''; } catch (e) { line = ''; }
  if (line) html += '<p class="v32-line v32-houseline">' + v32Esc(line) + '</p>';
  html += '<p class="v32-line">' + v32Esc(v32CountLine()) + '</p>';
  html += v32Rows(v32Row('studylist', v32W('studyList'), v32W('studyListLine'), ' id="v32-studylist"')
    + v32Row('deck', v32W('cardsList'), v32W('rowLine', { n: v32DeckDef('list').cards.length, m: v32DeckDef('list').learnt }), ' data-deck="list" id="v32-cardslist"')
    + v32Row('drilllist', v32W('drillList'), v32W('drillListLine'), ' id="v32-drilllist"'));
  var secs = v32Sections();
  if (secs.length) {
    html += '<div class="v32chips" role="group" aria-label="' + v32W('secChips') + '">' + secs.map(function (s) {
      return '<button type="button" class="v28-chip" data-v32="sec" data-s="' + v32Esc(s.section) + '">' + v32Esc(s.section) + ' ' + s.count + '</button>';
    }).join('') + '</div>';
  }
  var quiet = '';
  if (typeof V29_MINE_ROW !== 'undefined' && V29_MINE_ROW) {
    try { if (V29_MINE_ROW.show()) quiet += '<button type="button" class="v32quiet" data-v32="fullwine">' + v32W('fullWine') + '</button>'; } catch (e) { }
  }
  if (typeof deskView === 'function') quiet += '<button type="button" class="v32quiet" data-go="menudesk">' + v32W('menuDesk') + '</button>';
  if (typeof V27_HOUSE_ROW !== 'undefined' && V27_HOUSE_ROW) {
    try { if (V27_HOUSE_ROW.show()) quiet += '<button type="button" class="v32quiet" data-go="house">' + v32W('theHouse') + '</button>'; } catch (e) { }
  }
  if (typeof V27_REVIEW_ROW !== 'undefined' && V27_REVIEW_ROW) {
    try { if (V27_REVIEW_ROW.show()) quiet += '<button type="button" class="v32quiet" data-go="housereview">' + v32W('herMarks') + '</button>'; } catch (e) { }
  }
  if (quiet) html += '<div class="v32quietrow">' + quiet + '</div>';
  return html + '</section>';
}

function v32SearchHtml(id) {
  return '<section class="v32-sec" aria-labelledby="v32-search-h"><h2 class="v32-h2" id="v32-search-h">' + v32W('searchH') + '</h2>'
    + '<div class="codexfind v32find"><label class="sr-only" for="' + id + '">' + v32W('searchLabel') + '</label>'
    + '<input id="' + id + '" class="sainput" type="search" autocomplete="off" spellcheck="false" placeholder="' + v32W('searchHint') + '">'
    + '<div id="' + id + '-out" class="v32find-out" aria-live="polite"></div></div></section>';
}

/* The domains and the other subsections, each with its word and figure,
   each section a link to its chapter where the level has one. */
function v32HoldsHtml(lv) {
  var L = v32LvByKey(lv) || v32Lv();
  var subs = [];
  try { subs = v25Subs(lv); } catch (e) { subs = []; }
  var what = v32W('holds', { level: L.name });
  var html = '<details class="secs v32holds"><summary data-what="' + v32Esc(what) + '">' + v32Esc(v32W('show') + what) + '</summary>'
    + '<ol class="subsections v32subs">';
  subs.forEach(function (s) {
    html += '<li class="subsection sub-' + s.kind + '"><h3 class="v32-subh">' + v32Esc(s.name) + '</h3>'
      + '<p class="sub-meta"><span class="sub-n">' + v32Esc(s.line) + '</span><span class="sub-stat">' + v32Esc(s.word) + '</span></p>';
    if (s.kind === 'domain') {
      html += '<ul class="v32secs">' + s.cats.map(function (c) {
        var t = s.tally[c] || { met: 0, total: 0 };
        var meta = (typeof v25MetWord === 'function') ? v25MetWord(t.met, t.total) : '';
        var name = v25HasChapter(c, lv)
          ? '<button type="button" class="v32link" data-v32="chapter" data-cat="' + v32Esc(c) + '">' + v32Esc(c) + '</button>'
          : '<span class="v32plain">' + v32Esc(c) + '</span>';
        return '<li>' + name + '<span class="v32secmeta">' + v32Esc(t.total + ' at this level \u00b7 ' + meta) + '</span></li>';
      }).join('') + '</ul>';
    } else if (s.kind === 'tasting') {
      html += '<p class="v32secmeta"><button type="button" class="v32link" data-go="tastegrid">Study the grid</button></p>';
    }
    html += '</li>';
  });
  return html + '</ol></details>';
}

function v32LevelHtml(lv) {
  lv = lv || activeLevel;
  var L = v32LvByKey(lv);
  if (!L) return '';
  var stat = '';
  try { stat = v25LevelStat(lv).word; } catch (e) { stat = ''; }
  return '<div class="lv-page v32-level">'
    + '<h1 class="lv-h1" tabindex="-1">' + v32Esc(L.name) + '</h1>'
    + '<p class="lv-blurb">' + v32Esc(L.blurb) + '</p>'
    + '<p class="v32-stat">' + v32Esc(stat) + (lv === activeLevel ? ' \u00b7 <span class="v32-here">' + v32W('yourLevel') + '</span>' : '') + '</p>'
    + '<section class="v32-sec" aria-labelledby="v32-today-h"><h2 class="v32-h2" id="v32-today-h">' + v32W('todayH') + '</h2>'
    + v32Rows(v32TodayRows(lv)) + '</section>'
    + v32RestaurantHtml()
    + v32SearchHtml('v32-q')
    + v32HoldsHtml(lv)
    + '</div>';
}

/* The search: our list first, then the producers, the grapes and the
   chapters; a chapter at another level when none at this one matches. */
function v32SearchResults(q) {
  var t = v32Str(q);
  if (t.length < 2) return '';
  var html = '';
  var L = v32Lv();
  var house = [];
  try {
    var tokens = v28Tokens(t);
    house = v28Rows().filter(function (r) { return !r.own && v28Matches(v28Hay(r), tokens); }).slice(0, 8);
  } catch (e) { house = []; }
  if (house.length) {
    html += '<h3 class="secgroup">' + v32W('fromList') + '</h3><ul class="v32hits">' + house.map(function (r) {
      return '<li><button type="button" class="secbtn" data-v32="wine" data-id="' + v32Esc(r.id) + '"><span>' + v32Esc(r.name) + '</span><span class="n">' + v32Esc(r.section) + '</span></button></li>';
    }).join('') + '</ul>';
  }
  var inner = '';
  var f = t.toLowerCase();
  try { f = f.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  var fold = function (s) { var x = String(s || '').toLowerCase(); try { x = x.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { } return x; };
  try {
    var res = codexFind(t);
    (res && res.producers ? res.producers.slice(0, 6) : []).forEach(function (r) {
      inner += '<li><button type="button" class="secbtn" data-v32="prod" data-id="' + v32Esc(r.id) + '"><span>' + v32Esc(r.p) + '</span><span class="n">' + v32Esc(r.r || r.country || '') + '</span></button></li>';
    });
  } catch (e) { }
  v32AllGrapes().filter(function (g) { return fold(g.g).indexOf(f) >= 0; }).slice(0, 4).forEach(function (g) {
    inner += '<li><button type="button" class="secbtn" data-v32="grape" data-g="' + v32Esc(g.g) + '"><span>' + v32Esc(g.g) + '</span><span class="n">' + v32W('grapeCards') + '</span></button></li>';
  });
  var chapters = v32ChapterHits(activeLevel, f, fold);
  chapters.forEach(function (c) {
    inner += '<li><button type="button" class="secbtn" data-v32="chapter" data-cat="' + v32Esc(c.cat) + '"><span>' + v32Esc(c.title) + '</span><span class="n">Study Chapters \u00b7 ' + v32Esc(L.name) + '</span></button></li>';
  });
  if (inner) html += '<h3 class="secgroup">' + v32W('inCodex') + '</h3><ul class="v32hits">' + inner + '</ul>';
  if (!chapters.length) {
    var away = [];
    v32Levels().forEach(function (x) {
      if (x.key === activeLevel) return;
      v32ChapterHits(x.key, f, fold).forEach(function (c) { away.push({ lv: x, c: c }); });
    });
    if (away.length) {
      html += '<p class="v32-line">' + v32Esc(v32W('nothingAt', { level: L.name, q: t })) + '</p>'
        + '<h3 class="secgroup">' + v32W('otherLevels') + '</h3><ul class="v32hits">' + away.slice(0, 6).map(function (x) {
          return '<li><button type="button" class="secbtn" data-v32="chapterat" data-lv="' + x.lv.key + '" data-cat="' + v32Esc(x.c.cat) + '"><span>' + v32Esc(x.c.title) + '</span><span class="n">'
            + v32Esc(x.lv.name + '. ' + v32W('movesYou', { level: x.lv.name })) + '</span></button></li>';
        }).join('') + '</ul>';
    }
  }
  return html || '<p class="v32-line">' + v32Esc(v32W('nothing', { q: t })) + '</p>';
}
function v32ChapterHits(lv, f, fold) {
  var out = [];
  try {
    var L = LEVELS[lv];
    (L && L.primers ? L.primers : []).forEach(function (p) {
      if (!p) return;
      if (lv === 'intro') {
        if (fold(p.t).indexOf(f) < 0) return;
        var cat = null;
        Object.keys(V25_INTRO_CHAPTERS).some(function (k) { if (V25_INTRO_CHAPTERS[k] === p.id) { cat = k; return true; } return false; });
        if (cat) out.push({ cat: cat, title: p.t });
      } else if (fold(p.cat).indexOf(f) >= 0) out.push({ cat: p.cat, title: p.cat });
    });
  } catch (e) { }
  return out.slice(0, 4);
}

/* The query lives in S, per box, so every render of the screen, the one a
   Back makes included, draws the same results before the scroll returns. */
function v32Query(id, v) {
  if (!S._v32q || typeof S._v32q !== 'object') S._v32q = {};
  if (typeof v === 'string') S._v32q[id] = v;
  return typeof S._v32q[id] === 'string' ? S._v32q[id] : '';
}
function v32WireSearch(box, id) {
  var inp = box.querySelector('#' + id), out = box.querySelector('#' + id + '-out');
  if (!inp || !out || typeof inp.addEventListener !== 'function') return;
  var q = v32Query(id);
  if (q) { inp.value = q; out.innerHTML = v32SearchResults(q); }
  inp.addEventListener('input', function () { v32Query(id, String(inp.value || '')); out.innerHTML = v32SearchResults(inp.value); });
}

function v32WireDetails(box) {
  Array.prototype.forEach.call(box.querySelectorAll('details.secs'), function (d) {
    var sum = d.querySelector('summary');
    if (!sum || typeof d.addEventListener !== 'function') return;
    d.addEventListener('toggle', function () {
      sum.textContent = (d.open ? v32W('hide') : v32W('show')) + sum.getAttribute('data-what');
    });
  });
}

function v32Build(html, after) {
  var box = (typeof v25Build === 'function') ? v25Build(html) : (function () { var b = document.createElement('div'); b.innerHTML = html; return b; })();
  v32Wire(box);
  if (typeof after === 'function') { try { after(box); } catch (e) { } }
  return box;
}

function v32LevelView() {
  return v32Build(v32LevelHtml(activeLevel), function (box) { v32WireDetails(box); v32WireSearch(box, 'v32-q'); });
}

/* Your first week, the wing's path, on a screen of its own. */
function v32FirstWeekView() {
  var html = '<div class="v25page">' + v32Head(v32W('weekRow'), v32W('weekHead'));
  var fw = v32FirstWeek();
  try {
    if (fw && typeof OOT !== 'undefined' && OOT && OOT.home && typeof OOT.home.firstPath === 'function') {
      var p = (ST && ST.path) || {};
      var done = {};
      FIRST_PATH.forEach(function (s) { if (p[s.id]) done[s.id] = 1; });
      html += OOT.home.firstPath(FIRST_PATH.map(function (s) {
        return { id: s.id, t: s.t, mins: s.mins, act: 'data-go="path" data-arg="' + v32Esc(s.id) + '"' };
      }), done) || '';
    }
  } catch (e) { }
  return v32Build(html + '</div>');
}

/* =========== Flashcards =========== */

function v32FlashcardsHtml() {
  var all = v32All().flashcards;
  var L = v32Lv();
  var t = v32DueToday();
  var html = '<div class="v25page v32-root">' + v32Head(v32W('fcH')) + v32Scope('flashcards');
  html += '<section class="v32-due" aria-labelledby="v32-due-h"><h3 class="secgroup v32-gh" id="v32-due-h">' + v32W('dueRow') + '</h3>'
    + '<p class="v32-line">' + v32Esc(v32DueLine(t)) + '</p>'
    + (t.total ? '<button type="button" class="btn gold v32-go" data-v32="due" id="v32-due-go">' + v32W('startToday') + '</button>' : '') + '</section>';
  if (v32HasHouse()) {
    var rows = v32DeckRow('list');
    v32Sections().forEach(function (s) { rows += v32DeckRow('list:' + v32Slug(s.section), s.section); });
    rows += v32DeckRow('list-weak');
    rows += v32DeckRow('bottles');
    v32FloorSections().forEach(function (s) { rows += v32DeckRow('bottles:' + v32Slug(s.section), s.section); });
    html += v32Group(v32W('fcRest'), rows, 'v32-fc-rest');
  } else {
    html += '<section class="v32-group"><h3 class="secgroup v32-gh">' + v32W('fcRest') + '</h3><p class="v32-line">' + v32W('fcNoHouse') + '</p></section>';
  }
  if (all) {
    html += v32Group(v32W('everyLevel'), v32DeckRow('grapes-all') + v32DeckRow('grapes-all:r') + v32DeckRow('grapes-all:w'), 'v32-fc-lv');
  } else {
    html += v32Group(L.name, v32DeckRow('grapes') + v32DeckRow('grapes:r') + v32DeckRow('grapes:w'), 'v32-fc-lv');
  }
  html += v32Group(v32W('words'), v32DeckRow('menu-words'), 'v32-fc-words');
  if (!all) html += v32Group(v32W('refCards'), v32DeckRow('grapes-all'), 'v32-fc-ref');
  return html + '</div>';
}
function v32FlashcardsView() { return v32Build(v32FlashcardsHtml()); }

/* The deck screen. */
function v32DeckHtml() {
  var def = v32DeckDef(S._v32deck);
  var html = '<div class="v25page v32-deckpage">' + v32Head(def.name || v32W('fcH'));
  if (!def.cards.length) return html + '<p class="v32-line">' + v32W('empty') + '</p></div>';
  html += '<p class="v32-line">' + v32Esc(v32W('deckLine', { n: def.cards.length, m: def.learnt })) + '</p>';
  if (def.kind === 'grape') {
    var dir = (S._v32run && S._v32run.dir) || (S.fc && S.fc.dir) || S._v32dir || 'n2p';
    html += '<h3 class="secgroup v32-gh">' + v32W('ways') + '</h3><div class="v32chips" role="group" aria-label="' + v32W('ways') + '">'
      + '<button type="button" class="v28-chip" data-v32="dir" data-dir="n2p" aria-pressed="' + (dir === 'n2p' ? 'true' : 'false') + '">' + v32W('nameFront') + '</button>'
      + '<button type="button" class="v28-chip" data-v32="dir" data-dir="p2n" aria-pressed="' + (dir === 'p2n' ? 'true' : 'false') + '">' + v32W('profileFront') + '</button></div>';
    var base = S._v32deck.indexOf('grapes-all') === 0 ? 'grapes-all' : 'grapes';
    var cur = S._v32deck.slice(base.length + 1);
    var what = v32W('narrow');
    html += '<details class="secs v32narrow"><summary data-what="' + v32Esc(what) + '">' + v32Esc(v32W('show') + what) + '</summary><div class="v32chips">'
      + [['', 'All'], ['w', 'Whites'], ['r', 'Reds']].map(function (f) {
        return '<button type="button" class="v28-chip" data-v32="narrow" data-deck="' + base + (f[0] ? ':' + f[0] : '') + '" aria-pressed="' + (cur === f[0] ? 'true' : 'false') + '">' + f[1] + '</button>';
      }).join('') + '</div></details>';
  } else if (def.kind === 'house' && /^(list|list:|bottles)/.test(S._v32deck)) {
    var meals = [], meal = '';
    try { meals = v28MealNames(v32House(), v28Rows()); meal = v28Meal(meals); } catch (e) { meals = []; }
    if (meals.length) {
      html += '<details class="secs v32narrow"><summary data-what="' + v32Esc(v32W('narrow')) + '">' + v32Esc(v32W('show') + v32W('narrow')) + '</summary><div class="v32chips" role="group" aria-label="The shift">'
        + [''].concat(meals).map(function (m) {
          return '<button type="button" class="v28-chip" data-v32="meal" data-m="' + v32Esc(m) + '" aria-pressed="' + (m === meal ? 'true' : 'false') + '">' + v32Esc(m || 'All day') + '</button>';
        }).join('') + '</div></details>';
    }
  }
  return html + '<button type="button" class="btn gold v32-go" data-v32="start" id="v32-start">' + v32W('start') + '</button></div>';
}
function v32DeckView() { return v32Build(v32DeckHtml(), v32WireDetails); }

/* The card screen: the position line rides in the back row (one sticky
   strip), then the face, then the controls in one row. */
function v32CardFace(c, run) {
  if (c.kind === 'house') {
    var b = c.c.back || {};
    if (!run.flip) {
      return '<button type="button" class="card v28-front" data-v32="flip" id="v32-face"><span class="v28-eyebrow v28-ink">' + v32W('front') + (c.c.section ? ' \u00b7 ' + v32Esc(c.c.section) : '') + '</span>'
        + '<span class="v28-fname">' + v32Esc(c.c.name) + '</span>'
        + '<span class="v28-fhint">' + v32Esc(typeof v28W === 'function' ? v28W('front') : '') + '</span></button>';
    }
    return '<div class="card v28-back" id="v32-face"><p class="v28-eyebrow v28-ink">' + v32W('answer') + '</p>'
      + '<h3 class="v28-bname" tabindex="-1" id="v32-ans">' + v32Esc(c.c.name) + '</h3>'
      + (b.s10 ? '<p class="v28-eyebrow v28-ink">In ten seconds</p><p class="v28-ten">' + v32Esc(b.s10) + '</p>' : '')
      + (b.price ? '<p><span class="v28-ink-tag">' + v32Esc(b.price) + '</span></p>' : '')
      + (b.pairs || []).map(function (p) { return '<p><b>' + v32Esc(p[0]) + ':</b> ' + v32Esc(p[1]) + '</p>'; }).join('')
      + (b.parts && b.parts.length && typeof v28Dl === 'function' ? '<details class="v28-q"><summary>The five parts</summary>' + v28Dl(b.parts) + '</details>' : '')
      + (b.say ? '<p class="v28-eyebrow v28-ink">Say it</p><p>' + v32Esc(b.say) + '</p>' : '')
      + '</div>';
  }
  if (c.kind === 'word') {
    if (!run.flip) {
      return '<button type="button" class="card v28-front" data-v32="flip" id="v32-face"><span class="v28-eyebrow v28-ink">' + v32W('front') + '</span>'
        + '<span class="v28-fname">' + v32Esc(c.front) + '</span></button>';
    }
    return '<div class="card v28-back" id="v32-face"><p class="v28-eyebrow v28-ink">' + v32W('answer') + '</p>'
      + '<h3 class="v28-bname" tabindex="-1" id="v32-ans">' + v32Esc(c.front) + '</h3><p>' + v32Esc(c.back) + '</p></div>';
  }
  /* a grape: the reference data's own fields, quoted as they stand */
  var g = c.g;
  var colour = g.c === 'w' ? 'White' : 'Red';
  var row = function (tag, k, val) { return '<' + tag + ' class="v32-gl"><b>' + k + ':</b> ' + v32Esc(val) + '</' + tag + '>'; };
  var profile = row('p', 'Structure', g.st) + row('p', 'Fruit', g.fruit) + row('p', 'Non-fruit', g.other);
  var profileSpans = row('span', 'Structure', g.st) + row('span', 'Fruit', g.fruit) + row('span', 'Non-fruit', g.other);
  var idPack = '<p><b>Giveaway:</b> ' + v32Esc(g.tell) + '</p><p><b>Regions:</b> ' + v32Esc(g.regions) + '</p><p><b>Not to be confused with:</b> ' + v32Esc(g.confuse) + '</p>';
  if (!run.flip) {
    if (run.dir === 'p2n') {
      return '<button type="button" class="card v28-front v32-gfront" data-v32="flip" id="v32-face"><span class="v28-eyebrow v28-ink">' + v32W('front') + ' \u00b7 ' + colour + '</span>'
        + '<span class="v32-prof">' + profileSpans + '</span></button>';
    }
    return '<button type="button" class="card v28-front" data-v32="flip" id="v32-face"><span class="v28-eyebrow v28-ink">' + v32W('front') + ' \u00b7 ' + colour + '</span>'
      + '<span class="v28-fname">' + v32Esc(g.g) + '</span></button>';
  }
  return '<div class="card v28-back" id="v32-face"><p class="v28-eyebrow v28-ink">' + v32W('answer') + ' \u00b7 ' + colour + '</p>'
    + '<h3 class="v28-bname" tabindex="-1" id="v32-ans">' + v32Esc(g.g) + '</h3>'
    + (run.dir === 'p2n' ? '' : profile) + idPack + '</div>';
}

function v32PosText() {
  var r = S._v32run;
  if (!r || !r.deck.length) return '';
  return v32W('cardPos', { i: Math.min(r.total, r.total - r.deck.length + 1), n: r.total, deck: r.label });
}

function v32CardHtml() {
  var r = S._v32run;
  if (!r || !r.v32) return '<div class="v25page"><p class="v32-line">' + v32W('empty') + '</p></div>';
  var html = '<div class="v28 v28-deck v32card">';
  var c = v32RunCard();
  if (!c) {
    html += '<div class="viewhead v28-head"><h2 class="v32-h" tabindex="-1">' + v32W('deckDone') + '</h2></div>'
      + '<div class="card v28-end"><p>' + v32Esc(r.again ? v32W('doneLine', { g: r.done, a: r.again }) : v32W('doneLineAll', { g: r.done })) + '</p></div><div class="v28-btnrow v32-acts">';
    var missed = r.missed.map(function (i) { return r.cards[i]; }).filter(Boolean);
    if (missed.length) html += '<button type="button" class="btn gold" data-v32="runmisses">' + v32W('studyMisses') + '</button>';
    var dueN = 0;
    if (r.after === 'daily') { try { dueN = v32DueToday().b; } catch (e) { dueN = 0; } }
    if (dueN) html += '<button type="button" class="btn ' + (missed.length ? 'ghost' : 'gold') + '" data-v32="daily">' + v32Esc(v32W('nowDue', { n: dueN })) + '</button>';
    else html += '<button type="button" class="btn ghost" data-v32="another">' + v32W('anotherDeck') + '</button>';
    return html + '</div></div>';
  }
  html += v32CardFace(c, r);
  if (!r.flip) html += '<div class="v28-grade v32-ctrl"><button type="button" class="btn gold" data-v32="flip">' + v32W('flip') + '</button></div>';
  else {
    html += '<div class="v28-grade v32-ctrl"><button type="button" class="btn gold" data-v32="got">' + v32W('got') + '</button>'
      + '<button type="button" class="btn ghost" data-v32="again">' + v32W('again') + '</button></div>';
  }
  return html + '</div>';
}
function v32CardView() { return v32Build(v32CardHtml()); }

/* The card to the top of the screen, under the sticky back row, after the
   first card and every flip and grade. */
function v32ShowCard() {
  try {
    var row = document.querySelector('.v32back');
    if (!row || typeof row.getBoundingClientRect !== 'function') return;
    var top = row.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
    window.scrollTo(0, Math.max(0, top));
  } catch (e) { }
}

/* =========== Quizzes =========== */

function v32DomainRows(lv, other) {
  var L = v32LvByKey(lv);
  var out = '';
  var doms = [];
  try { doms = v25Domains(lv); } catch (e) { doms = []; }
  var tally = {};
  try { tally = v25CatTally(lv); } catch (e) { tally = {}; }
  doms.forEach(function (d) {
    var n = 0;
    d[1].forEach(function (c) { n += (tally[c] || { total: 0 }).total; });
    var line = v32W('domainLine', { n: n, s: d[1].length === 1 ? '1 section' : d[1].length + ' sections' });
    if (other) line += ' ' + v32W('movesYou', { level: L.name });
    out += '<li class="v32dom"><button class="v25row" type="button" data-v32="lvgo" data-lv="' + lv + '" data-k="domexam" data-arg="' + v32Esc(d[0]) + '">'
      + '<span class="v25row-name">' + v32Esc(d[0]) + '</span><span class="v25row-line">' + v32Esc(line) + '</span></button>';
    if (!other) {
      var what = d[1].length === 1 ? 'the section' : 'the ' + v25Words(d[1].length) + ' sections';
      out += '<details class="secs"><summary data-what="' + v32Esc(what) + '">' + v32Esc(v32W('show') + what) + '</summary><ol class="sections">'
        + d[1].map(function (c) {
          var t = tally[c] || { met: 0, total: 0 };
          return '<li class="section"><span class="sec-name">' + v32Esc(c) + '</span>'
            + '<span class="sec-meta">' + v32Esc(t.total + ' at this level \u00b7 ' + v25MetWord(t.met, t.total)) + '</span>'
            + '<span class="sec-trains">' + v25Train('drill', c, 'Drill', 'Drill ' + c) + v25Train('secexam', c, 'Exam', 'Exam, ' + c) + '</span></li>';
        }).join('') + '</ol></details>';
    }
    out += '</li>';
  });
  return out;
}

function v32TestRow(lv, other) {
  var L = v32LvByKey(lv);
  var line = '';
  try { line = v25TestLine(lv); } catch (e) { line = ''; }
  if (other) line += ' ' + v32W('movesYou', { level: L.name });
  return '<li><button class="v25row v32test" type="button" data-v32="lvgo" data-lv="' + lv + '" data-k="leveltest">'
    + '<span class="v25row-name">' + v32Esc('The ' + L.name + ' test') + '</span><span class="v25row-line">' + v32Esc(line) + '</span></button></li>';
}

function v32QuizzesHtml() {
  var all = v32All().quizzes;
  var L = v32Lv();
  var html = '<div class="v25page v32-root">' + v32Head(v32W('qzH')) + v32Scope('quizzes');
  html += '<section class="v32-due" aria-labelledby="v32-quick-h"><h3 class="secgroup v32-gh" id="v32-quick-h">' + v32W('quickRow') + '</h3>'
    + '<p class="v32-line">' + v32Esc(v32QuickLine()) + '</p>'
    + '<button type="button" class="btn gold v32-go" data-v32="quick" id="v32-quick-go">' + v32W('startQuick') + '</button></section>';
  var M = typeof V25_MINE !== 'undefined' ? V25_MINE : [];
  var D = typeof V27_DRILL_ROWS !== 'undefined' ? V27_DRILL_ROWS : [];
  if (v32HasHouse()) {
    var rest = v32Row('drilllist', v32W('drillList'), v32W('drillListLine'))
      + v32RegRow(M, 'cellarrecite', v32W('recite'))
      + v32RegRow(D, 'houserecite') + v32RegRow(D, 'housepair') + v32RegRow(D, 'housesay') + v32RegRow(D, 'houseguest')
      + v32RegRow(M, 'cellardrill', v32W('cellarDrill'));
    html += v32Group(v32W('fcRest'), rest, 'v32-qz-rest');
  } else {
    var mine = v32RegRow(M, 'cellardrill', v32W('cellarDrill')) + v32RegRow(M, 'cellarrecite', v32W('recite'));
    html += v32Group(v32W('fcRest'), mine, 'v32-qz-rest');
  }
  html += v32Group(L.name, v32DomainRows(activeLevel, false), 'v32-qz-lv');
  var paper = '';
  ['weak', 'endless', 'lightning', 'sudden'].forEach(function (k) {
    paper += v32GoRow(k, V25_TRAIN[k].label, v32PaperLine(k));
  });
  var nMiss = (typeof MISS !== 'undefined' && MISS) ? MISS.length : 0;
  if (nMiss) paper += v32GoRow('review', 'Review misses', nMiss + ' to retire by answering right');
  paper += v32RegRow(typeof V25_RECORD !== 'undefined' ? V25_RECORD : [], 'flagged');
  if (typeof FLOOR !== 'undefined' && FLOOR && FLOOR.length) paper += v32GoRow('floor', 'The Floor', 'a situation on the floor, and what a master does');
  if (typeof PAIRS !== 'undefined' && PAIRS && PAIRS.length) paper += v32GoRow('pairs', v32W('classicPairs'), 'a dish is set down, you choose the wine');
  html += v32Group(v32W('wholePaper'), paper, 'v32-qz-paper');
  var hands = '';
  var grapes = [];
  try { grapes = v25Grapes(activeLevel); } catch (e) { grapes = []; }
  if (grapes.length) {
    hands += v32GoRow('grid', 'The Blind Grid', 'a glass is poured blind, you call its structure and the grape');
    hands += v32GoRow('flight', 'Blind flight', 'a flight of glasses, the deductive grid out loud');
  }
  hands += v32GoRow('service', 'The Service Ritual', 'the steps of service, rehearsed until they are habit');
  html += v32Group(v32W('handsOn'), hands, 'v32-qz-hands');
  if (all) {
    v32Levels().forEach(function (x) {
      if (x.key === activeLevel) return;
      html += v32Group(x.name, v32DomainRows(x.key, true) + v32TestRow(x.key, true), 'v32-qz-' + x.key);
    });
  }
  html += '<section class="v32-group v32-testgroup">' + v32Rows(v32TestRow(activeLevel, false)) + '</section>';
  return html + '</div>';
}
function v32PaperLine(k) {
  return {
    weak: 'your weakest questions at this level first',
    endless: 'the whole paper, untimed, reshuffled forever',
    lightning: 'quick fire against the clock',
    sudden: 'the round ends at the first miss'
  }[k] || '';
}
function v32QuizzesView() { return v32Build(v32QuizzesHtml(), v32WireDetails); }

/* =========== Library =========== */

function v32LibraryHtml() {
  var all = v32All().library;
  var L = v32Lv();
  var lib = typeof V25_LIBRARY !== 'undefined' ? V25_LIBRARY : [];
  var html = '<div class="v25page v32-root">' + v32Head(v32W('libH')) + v32Scope('library')
    + '<p class="v32-line">' + v32Esc(all ? v32W('libLineAll') : v32W('libLine', { level: L.name })) + '</p>'
    + '<div class="codexfind"><input id="cf-in" class="sainput" autocomplete="off" spellcheck="false"'
    + ' aria-label="Find a producer, a wine, or a bottle on our list" placeholder="Find a producer, a wine, or a bottle on our list"><div id="cf-out"></div></div>';
  var rows = '';
  if (typeof V29_MINE_ROW !== 'undefined' && V29_MINE_ROW) {
    try { if (V29_MINE_ROW.show()) rows += v32Row('fullwine', v32W('fullWine'), V29_MINE_ROW.line()); } catch (e) { }
  }
  if (all) {
    v32Levels().forEach(function (x) {
      var n = 0;
      try { n = (LEVELS[x.key].primers || []).length; } catch (e) { n = 0; }
      var line = n + ' chapters at ' + x.name + (x.key === activeLevel ? '' : '. ' + v32W('movesYou', { level: x.name }));
      rows += v32Row('chaptersat', v32W('chaptersAt', { level: x.name }), line, ' data-lv="' + x.key + '"');
    });
  } else rows += v32RegRow(lib, 'primers');
  rows += v32RegRow(lib, 'compendium') + v32RegRow(lib, 'ency') + v32RegRow(lib, 'producers') + v32RegRow(lib, 'worldmap') + v32RegRow(lib, 'terroir');
  if (typeof tasteGridView === 'function') rows += v32GoRow('tastegrid', 'Study the grid', 'the deductive grid, step by step, to read before you taste');
  rows += v32RegRow(lib, 'videos');
  var h = v32House();
  if (h && typeof v30Groups === 'function') {
    var n2 = 0;
    try { n2 = v30Groups(h).reduce(function (t, g) { return t + g.videos.length; }, 0); } catch (e) { n2 = 0; }
    if (n2) rows += v32Row('housevideos', v32W('videosH'), n2 + ' videos \u00b7 ' + v32W('videosLine'));
  }
  return html + v32Rows(rows) + '</div>';
}
function v32LibraryView() {
  return v32Build(v32LibraryHtml(), function (box) {
    if (typeof v25WireFind !== 'function') return;
    v25WireFind(box);
    /* codex25's box, its query kept in S the same way as the level page's */
    var inp = box.querySelector('#cf-in');
    if (!inp || typeof inp.oninput !== 'function') return;
    var draw = inp.oninput;
    inp.oninput = function () { v32Query('cf-in', String(inp.value || '')); return draw.apply(this, arguments); };
    var q = v32Query('cf-in');
    if (q) { inp.value = q; draw.call(inp); }
  });
}

function v32VideosView() {
  var h = v32House();
  var body = '';
  try { body = (h && typeof v30VideosHtml === 'function') ? v30VideosHtml(h) : ''; } catch (e) { body = ''; }
  var html = '<div class="v25page v28">' + v32Head(v32W('videosH'), v32W('videosLine'))
    + (body || '<p class="v32-line">' + v32W('videosNone') + '</p>') + '</div>';
  var box = v32Build(html);
  /* a wine a video teaches opens its card, a push like any other */
  if (typeof box.addEventListener === 'function') {
    box.addEventListener('click', function (e) {
      var t = e && e.target;
      var n = t && typeof t.closest === 'function' ? t.closest('[data-v28="open"]') : null;
      if (!n) return;
      if (typeof e.preventDefault === 'function') e.preventDefault();
      v32OpenWine(n.getAttribute('data-id'));
    });
  }
  return box;
}

/* =========== More =========== */

function v32MoreHtml() {
  var R = typeof V25_RECORD !== 'undefined' ? V25_RECORD : [];
  var pass = (typeof v25Pass === 'function') ? v25Pass() : { strip: '', settings: '' };
  var html = '<div class="v25page v32-root">' + v32Head(v32W('moreH'));
  html += v32Group(v32W('recordG'), v32RegRow(R, 'dash') + v32RegRow(R, 'hall') + v32RegRow(R, 'exams') + v32RegRow(R, 'plan') + v32RegRow(R, 'disputes'), 'v32-more-rec');
  var backup = v32RegRow(R, 'sync');
  if (backup || pass.strip || pass.settings) {
    html += '<section class="v32-group" aria-labelledby="v32-more-bak"><h3 class="secgroup v32-gh" id="v32-more-bak">' + v32W('backupG') + '</h3>'
      + (pass.strip || '') + v32Rows(backup) + (pass.settings || '') + '</section>';
  }
  html += v32Group(v32W('maitreG'), v32RegRow(R, 'maitre'), 'v32-more-mai');
  var who = (typeof v25Who === 'function') ? v25Who() : '';
  if (who) html += '<section class="v32-group" aria-labelledby="v32-more-set"><h3 class="secgroup v32-gh" id="v32-more-set">' + v32W('settingsG') + '</h3>'
    + '<p class="v32-line">' + v32W('whoRow') + '</p>' + who + '</section>';
  html += '<section class="v32-group" aria-labelledby="v32-more-about"><h3 class="secgroup v32-gh" id="v32-more-about">' + v32W('aboutG') + '</h3>'
    + '<p class="v32-line">' + v32Esc(typeof V25_NONAFFIL !== 'undefined' ? V25_NONAFFIL : '') + '</p></section>';
  return html + '</div>';
}
function v32MoreView() { return v32Build(v32MoreHtml(), function (box) { if (typeof v25BindPass === 'function') v25BindPass(box); }); }

/* =========== the acts =========== */

function v32OpenWine(id) {
  if (!id || typeof v28State !== 'function') return;
  var st = v28State();
  S._v28edit = false;
  st.q = ''; st.sec = '';
  S.view = 'cellar';
  if (typeof v28Open === 'function') v28Open(id, false);
}

function v32Act(act, node) {
  var get = function (k) { return node && typeof node.getAttribute === 'function' ? (node.getAttribute(k) || '') : ''; };
  var all = v32All();
  switch (act) {
    case 'deck': v32OpenDeck(get('data-deck')); return;
    case 'start': v32StartRun(S._v32deck, { push: true }); return;
    case 'due': v32StartDue(); return;
    case 'quick': v32StartQuick(); return;
    case 'flip': {
      var r = S._v32run;
      if (r && r.deck.length) { r.flip = !r.flip; render(); v32ShowCard(); try { var a = document.getElementById(r.flip ? 'v32-ans' : 'v32-face'); if (a) a.focus({ preventScroll: true }); } catch (e) { } }
      return;
    }
    case 'got': v32Grade(true); render(); v32ShowCard(); return;
    case 'again': v32Grade(false); render(); v32ShowCard(); return;
    case 'runmisses': {
      var run = S._v32run;
      if (!run) return;
      var cards = run.missed.map(function (i) { return run.cards[i]; }).filter(Boolean);
      if (run.kind === 'house') {
        V32_MISSES = cards.map(function (c) { return c.id; });
        v32StartRun('misses', { push: false });
      } else v32StartRun(run.deckId, { cards: cards, push: false });
      return;
    }
    case 'daily': if (typeof startDaily === 'function') startDaily(); return;
    case 'another': v32Go({ view: 'flashcards' }, 'push'); return;
    case 'dir': {
      S._v32dir = get('data-dir');
      if (S._v32run) S._v32run.dir = S._v32dir;
      if (S.fc) S.fc.dir = S._v32dir;
      V32.pend = 'replace'; render(); return;
    }
    case 'narrow': S._v32deck = get('data-deck'); V32.pend = 'replace'; render(); return;
    case 'meal': if (typeof v28SetMeal === 'function') v28SetMeal(get('data-m')); V32.pend = 'replace'; render(); return;
    case 'scope-name': S._v32scopeOpen = !S._v32scopeOpen; V32.pend = 'replace'; render(); v32FocusSel('.v32scope-name'); return;
    case 'scope-all': case 'scope-one': {
      var root = S.view;
      if (all.hasOwnProperty(root)) all[root] = act === 'scope-all';
      S._v32scopeOpen = false;
      V32.pend = 'replace'; render(); v32FocusSel('.v32scope-b'); return;
    }
    case 'scope-pick': {
      var lv = get('data-lv');
      /* codex7's applyLevel sends S.view home; the choice refilters the
         screen it was made on, in place (design 2.4 and 5.5) */
      var keepView = S.view, keepDeck = S._v32deck, keepAll = Object.assign({}, all);
      S._v32scopeOpen = false;
      if (lv && lv !== activeLevel && typeof applyLevel === 'function') applyLevel(lv, true);
      if (activeLevel === lv && typeof v25Choose === 'function') v25Choose();
      S.view = keepView; S._v32deck = keepDeck; Object.assign(v32All(), keepAll);
      S._v32scopeOpen = false;
      V32.pend = 'replace'; render(); v32FocusSel('.v32scope-name'); return;
    }
    case 'sec': {
      var stc = v28State();
      S._v28edit = false; stc.open = null; stc.q = ''; stc.sec = get('data-s'); stc.focus = 'restore'; stc.y = 0;
      S.view = 'cellar'; V32.pend = 'push'; render(); return;
    }
    case 'studylist': {
      var sts = v28State();
      S._v28edit = false; sts.open = null; sts.q = ''; sts.sec = ''; sts.y = 0;
      S.view = 'cellar'; V32.pend = 'push'; render(); return;
    }
    case 'drilllist':
      if (typeof startHouseSectionDrill === 'function') v32Push(function () { startHouseSectionDrill(''); });
      return;
    case 'fullwine': if (typeof v29Open === 'function') v29Open('level'); return;
    case 'wine': v32OpenWine(get('data-id')); return;
    case 'chapter': if (typeof v25OpenChapter === 'function') v32Push(function () { v25OpenChapter(get('data-cat')); }); return;
    case 'chapterat': {
      var l2 = get('data-lv');
      if (l2 && l2 !== activeLevel) applyLevel(l2, true);
      if (typeof v25OpenChapter === 'function') v32Push(function () { v25OpenChapter(get('data-cat')); });
      return;
    }
    case 'chaptersat': {
      var l3 = get('data-lv');
      if (l3 && l3 !== activeLevel) applyLevel(l3, true);
      S.view = 'primers'; V32.pend = 'push'; render(); return;
    }
    case 'grape': v32StartRun('grapes-all', { push: true, first: get('data-g') }); return;
    case 'prod': {
      var id = get('data-id'), ci = 0;
      try { var rec = prodById(id); if (rec) prodGroups().forEach(function (g, i) { if (g.rows.indexOf(rec) >= 0) ci = i; }); } catch (e) { }
      S._prod = { c: ci, id: id }; S.view = 'producers'; V32.pend = 'push'; render(); return;
    }
    case 'lvgo': {
      var l4 = get('data-lv');
      if (l4 && l4 !== activeLevel) applyLevel(l4, true);
      if (typeof v25Go === 'function') v32Push(function () { v25Go(get('data-k'), get('data-arg') || null); });
      return;
    }
    case 'library': v32Go({ view: 'library' }, 'push'); return;
    case 'firstweek': v32Go({ view: 'firstweek' }, 'push'); return;
    case 'housevideos': v32Go({ view: 'housevideos' }, 'push'); return;
    case 'back': v32Back(); return;
    default: return;
  }
}

function v32FocusSel(sel) {
  try { var n = document.querySelector(sel); if (n && typeof n.focus === 'function') n.focus({ preventScroll: true }); } catch (e) { }
}

function v32Wire(box) {
  if (!box || typeof box.addEventListener !== 'function') return;
  box.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v32]') : null;
    if (!node || node.disabled) return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
    try { v32Remember(node); } catch (err) { }
    v32Act(node.getAttribute('data-v32'), node);
  }, true);
}

/* =========== the results: what you missed, each with its card =========== */

function v32MissLink(q) {
  if (!q) return null;
  var m = /^h-(w-[a-z0-9]{8})-/.exec(q.id || '');
  if (m && v32Wine(m[1]) && v32HouseCards([m[1]]).length) return { kind: 'card', id: m[1] };
  try { if (q.cat && v25HasChapter(q.cat)) return { kind: 'chapter', cat: q.cat }; } catch (e) { }
  return null;
}

function v32DecorateResults(v) {
  if (!v || typeof v.querySelectorAll !== 'function') return v;
  var misses = (S.results || []).filter(function (r) { return r && !r.ok; });
  Array.prototype.forEach.call(v.querySelectorAll('.viewhead h2'), function (h) {
    if (/^Review misses/.test(h.textContent || '')) h.textContent = v32W('missH');
  });
  var list = v.querySelector('.misslist');
  if (list) {
    if (!misses.length) list.innerHTML = '<div class="miss"><p class="lt-none">' + v32W('missNone') + '</p></div>';
    var nodes = list.querySelectorAll('.miss');
    var cardIds = [];
    misses.forEach(function (r, i) {
      var n = nodes[i];
      if (!n) return;
      var ma = n.querySelector('.ma');
      if (ma && ma.textContent.indexOf(v32W('missAns')) !== 0) ma.insertBefore(document.createTextNode(v32W('missAns')), ma.firstChild);
      var link = v32MissLink(r.q);
      if (!link) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn small ghost v32misslink';
      if (link.kind === 'card') {
        if (cardIds.indexOf(link.id) < 0) cardIds.push(link.id);
        b.textContent = v32W('studyCard');
        b.setAttribute('data-v32', 'wine'); b.setAttribute('data-id', link.id);
      } else {
        b.textContent = v32W('readChapter');
        b.setAttribute('data-v32', 'chapter'); b.setAttribute('data-cat', link.cat);
      }
      b.id = 'v32-miss-' + i;
      n.appendChild(b);
    });
    var row = v.querySelector('.centerrow');
    if (row && cardIds.length) {
      var sm = document.createElement('button');
      sm.type = 'button'; sm.className = 'btn gold'; sm.id = 'v32-studymisses';
      sm.textContent = v32W('studyMisses');
      sm.onclick = function () { V32_MISSES = cardIds.slice(); v32StartRun('misses', { push: true }); };
      row.insertBefore(sm, row.firstChild);
    }
  }
  if (S.section === V32_QUICK) {
    var again = v.querySelector('#again');
    if (again) { again.textContent = v32W('dealAnother'); again.onclick = function () { v32StartQuick(); }; }
  }
  v32Wire(v);
  return v;
}

var _v32ResultsView = (typeof resultsView === 'function') ? resultsView : null;
if (_v32ResultsView) {
  resultsView = function () {
    var v = _v32ResultsView.apply(this, arguments);
    try { v32DecorateResults(v); } catch (e) { }
    return v;
  };
}

/* The level test's report: each theory miss gains its chapter. */
var _v32FinalsReportView = (typeof finalsReportView === 'function') ? finalsReportView : null;
if (_v32FinalsReportView) {
  finalsReportView = function () {
    var v = _v32FinalsReportView.apply(this, arguments);
    try {
      var t = S._v25lt;
      var group = v && v.querySelector ? v.querySelector('.lt-group') : null;
      if (t && group) {
        var nodes = group.querySelectorAll('.miss');
        t.theory.forEach(function (m, i) {
          var link = v32MissLink(m.q);
          if (!link || !nodes[i]) return;
          var b = document.createElement('button');
          b.type = 'button'; b.className = 'btn small ghost v32misslink';
          if (link.kind === 'card') { b.textContent = v32W('studyCard'); b.setAttribute('data-v32', 'wine'); b.setAttribute('data-id', link.id); }
          else { b.textContent = v32W('readChapter'); b.setAttribute('data-v32', 'chapter'); b.setAttribute('data-cat', link.cat); }
          nodes[i].appendChild(b);
        });
      }
      v32Wire(v);
    } catch (e) { }
    return v;
  };
}

/* Our List's card: its own way back goes, the Back control is the one. */
if (typeof v28CardHtml === 'function') {
  var _v32CardHtml = v28CardHtml;
  v28CardHtml = function (id) {
    var html = _v32CardHtml(id);
    return String(html || '').replace(/<button type="button" class="btn small ghost" data-v28="back">[^<]*<\/button>/, '');
  };
}

/* =========== the nav =========== */

V25_NAV = [['home', 'Home'], ['flashcards', 'Flashcards'], ['quizzes', 'Quizzes'], ['library', 'Library'], ['more', 'More']];
V25_HUB = { home: 'home', level: 'home', today: 'home', flashcards: 'flashcards', deck: 'flashcards', quizzes: 'quizzes', library: 'library', more: 'more', mine: 'more', record: 'more' };
V25_UNDER = {};
Object.keys(V32_OWNER).forEach(function (k) { V25_UNDER[k] = V32_OWNER[k]; });

v25NavWord = function () { return V32_OWNER[S.view] || 'home'; };

function v32Pill() {
  var n = 0;
  try { n = v32DueToday().total; } catch (e) { n = 0; }
  return n ? ' <span class="v32pill">' + n + '<span class="sr-only">' + v32W('due') + '</span></span>' : '';
}

v25NavHtml = function () {
  var cur = v25NavWord();
  return '<nav class="appnav v32nav" aria-label="The Codex">' + V25_NAV.map(function (w) {
    var quiet = w[0] === 'more';
    return '<button type="button" class="navword' + (quiet ? ' v32more' : '') + '" id="nav-' + w[0] + '" data-nav="' + w[0] + '"'
      + (cur === w[0] ? ' aria-current="page"' : '') + '>' + w[1] + (w[0] === 'flashcards' ? v32Pill() : '') + '</button>';
  }).join('') + '</nav>';
};

v25Nav = function (word) {
  var root = { home: 'home', flashcards: 'flashcards', quizzes: 'quizzes', library: 'library', more: 'more', levels: 'level', mine: 'more' }[word] || 'home';
  if (S.view === root || (root === 'more' && S.view === 'mine')) {
    try { window.scrollTo(0, 0); } catch (e) { }
    return;
  }
  if (typeof v25Leave === 'function' && !v25Leave()) return;
  S._v32scopeOpen = false;
  v32Go({ view: root, all: root !== 'home' && root !== 'more' ? !!v32All()[root] : false }, 'push');
};

/* =========== the views =========== */

V25_VIEWS.level = v32LevelView;
V25_VIEWS.today = v32LevelView;
V25_VIEWS.mine = v32MoreView;
V25_VIEWS.more = v32MoreView;
V25_VIEWS.flashcards = v32FlashcardsView;
V25_VIEWS.deck = v32DeckView;
V25_VIEWS.quizzes = v32QuizzesView;
V25_VIEWS.library = v32LibraryView;
V25_VIEWS.housedeck = v32CardView;
V25_VIEWS.flash = v32CardView;
V25_VIEWS.housevideos = v32VideosView;
V25_VIEWS.firstweek = v32FirstWeekView;

if (typeof v25MainName === 'function') {
  var _v32MainName = v25MainName;
  v25MainName = function () {
    var v = S.view;
    if (v === 'flashcards') return v32W('fcH');
    if (v === 'quizzes') return v32W('qzH');
    if (v === 'library') return v32W('libH');
    if (v === 'more' || v === 'mine') return v32W('moreH');
    if (v === 'deck') return v32DeckDef(S._v32deck).name || v32W('fcH');
    if (v === 'housedeck' || v === 'flash') return (S._v32run && S._v32run.label) || v32W('fcH');
    if (v === 'housevideos') return v32W('videosH');
    if (v === 'firstweek') return v32W('weekRow');
    if (v === 'level' || v === 'today') return v32Lv().name;
    return _v32MainName.apply(this, arguments);
  };
}

/* =========== the Back row, drawn on every screen but home =========== */

var V32_OLD_BACK = /^(Back|Back to\b.*|All countries)$/;

function v32BackRow(main) {
  var row = document.createElement('div');
  row.className = 'v32back';
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'btn ghost'; b.id = 'v32-back';
  b.textContent = v32W('back');
  b.onclick = function () { v32Back(); };
  row.appendChild(b);
  if (S.view === 'housedeck' || S.view === 'flash') {
    var pos = v32PosText();
    if (pos) {
      var s = document.createElement('span');
      s.className = 'v32pos'; s.setAttribute('role', 'status');
      s.textContent = pos;
      row.appendChild(s);
    }
  }
  if (V32.from && V32.d === 0) {
    var p = document.createElement('p');
    p.className = 'v32from';
    p.textContent = v32W('from', { app: V32.from });
    row.appendChild(p);
  }
  var sentinel = document.createElement('div');
  sentinel.className = 'v32sentinel';
  sentinel.setAttribute('aria-hidden', 'true');
  main.insertBefore(row, main.firstChild);
  main.insertBefore(sentinel, row);
  try {
    if (typeof IntersectionObserver === 'function') {
      if (V32.io) V32.io.disconnect();
      V32.io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { row.classList.toggle('is-stuck', !en.isIntersecting); });
      }, { threshold: 0 });
      V32.io.observe(sentinel);
    }
  } catch (e) { }
}

/* Every older way back on the screen leaves: one Back per screen. */
function v32StripOldBacks(main) {
  Array.prototype.forEach.call(main.querySelectorAll('button, a'), function (b) {
    if (b.id === 'v32-back') return;
    var t = String(b.textContent || '').replace(/\s+/g, ' ').trim();
    var old = V32_OLD_BACK.test(t) || b.getAttribute('data-v28') === 'back' || b.getAttribute('data-v28') === 'deckclose'
      || b.getAttribute('data-go') === 'backlevel' || b.id === 'hr-back' || b.id === 'hs-back' || b.id === 'hg-back'
      || b.id === 'cw-back' || b.id === 'pr-back' || b.id === 'pr-up' || (b.className && /\bfnhome\b/.test(String(b.className)));
    if (old && b.parentNode) b.parentNode.removeChild(b);
  });
}

function v32Decorate() {
  var main = document.getElementById('view');
  if (!main || typeof main.insertBefore !== 'function') return;
  document.body.setAttribute('data-codex-page', S.view || 'home');
  if (S.view === 'home') return;
  v32StripOldBacks(main);
  v32BackRow(main);
}

/* =========== the render, outermost =========== */

function v32Normalise() {
  if (S.view === 'today') S.view = 'level';
  if (S.view === 'mine') S.view = 'more';
  if (V32.wantSec && S.view === 'cellar' && v32HasHouse()) {
    var w = V32.wantSec;
    V32.wantSec = null;
    var name = v32SecBySlug(w.slug, w.floor);
    if (name) v28State().sec = w.floor ? '#bottles|' + name : name;
  }
}

var _v32Render = render;
render = function () {
  if (V32.rendering) return _v32Render.apply(this, arguments);
  V32.rendering = true;
  V32.renders++;
  var prevView = V32.view;
  var out;
  try {
    if (V32.booted && !V32.popping) v32SaveScroll();
    V32.popping = false;
    v32Normalise();
    out = _v32Render.apply(this, arguments);
  } finally { V32.rendering = false; }
  try { v32Decorate(); } catch (e) { }
  try { v32After(prevView); } catch (e) { }
  return out;
};

/* Escape closes the scope chip's list and never navigates. */
function v32Key(e) {
  if (!e || e.key !== 'Escape' || !S._v32scopeOpen) return;
  S._v32scopeOpen = false;
  V32.pend = 'replace';
  render();
  v32FocusSel('.v32scope-name');
}

/* =========== at load: the address, the depth, the room it came from =========== */

(function () {
  try { if (typeof history !== 'undefined' && history && 'scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) { }
  try {
    var st = v32CurState();
    var href = location.href;
    if (typeof st.ootd === 'number') V32.d = st.ootd;
    else {
      var m = v32SessGet(V32_NAV_KEY);
      V32.d = (m && m.href === href && typeof m.d === 'number') ? m.d : 0;
    }
    if (typeof st.run === 'number') V32.liveRun = -1;
    /* run numbers begin past any an earlier load of this tab gave out, so an
       entry left by that load never names a run of this one */
    V32.run = Math.max(V32.run, typeof st.run === 'number' ? st.run : 0, Date.now());
  } catch (e) { V32.d = 0; }
  try {
    var hash = (typeof location !== 'undefined' && location && typeof location.hash === 'string') ? location.hash : '';
    if (hash.indexOf('#/') === 0) {
      var r = v32Parse(hash);
      if (r) v32Apply(r, v32CurState());
    }
  } catch (e) { }
  try {
    var ref = (typeof document !== 'undefined' && document && typeof document.referrer === 'string') ? document.referrer : '';
    if (ref && V32.d === 0) {
      var u = new URL(ref);
      var here = location.pathname || '';
      if (u.origin === location.origin) {
        ['table', 'ledger', 'codex'].forEach(function (k) {
          if (u.pathname.indexOf('/' + k + '/') === 0 && here.indexOf('/' + k + '/') !== 0) V32.from = V32_ROOMS[k];
        });
      }
    }
  } catch (e) { }
  try {
    if (typeof window !== 'undefined' && window && typeof window.addEventListener === 'function') {
      window.addEventListener('popstate', v32OnPop);
      if (typeof document !== 'undefined' && document && typeof document.addEventListener === 'function') {
        document.addEventListener('click', function (ev) {
          try {
            var t = ev && ev.target;
            V32.lastPress = (t && typeof t.closest === 'function') ? t.closest('button,a,[role="button"]') : null;
          } catch (e) { V32.lastPress = null; }
        }, true);
      }
      window.addEventListener('pageshow', function (ev) {
        if (!ev || !ev.persisted) return;
        var s = v32CurState();
        if (typeof s.ootd === 'number') V32.d = s.ootd;
      });
    }
    if (typeof document !== 'undefined' && document && typeof document.addEventListener === 'function') {
      document.addEventListener('click', v32LinkClick);
      document.addEventListener('keydown', v32Key);
    }
  } catch (e) { }
})();

/* =========== the styles ===========
   The art's own tokens and components only: the navword box, the ghost
   button's ink for More, the codex28 chips and deck bars, the v25 rows. */
(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v32-style';
  css.textContent = [
    /* the bar: four tabs and a quiet More, one row at 390px */
    '.wrap .house-topbar .appnav.v32nav,.appnav.v32nav{display:flex;flex-wrap:nowrap;align-items:stretch;gap:0}',
    '.appnav.v32nav .navword{flex:1 1 auto;min-width:44px;padding-inline:4px;white-space:nowrap}',
    /* More is quieter than the tabs (design 2.1): the tabs' type and ink, a
       muted ghost border, lit only when it is the screen showing */
    '.appnav.v32nav .navword.v32more{flex:0 0 auto;margin:8px 0 8px 4px;padding:4px 8px;min-height:44px;border:1px solid var(--line);border-radius:3px;color:var(--parch2)}',
    '.wrap .house-topbar .appnav.v32nav .navword.v32more{min-height:44px;margin:8px 0 8px 4px;padding:4px 8px;border:1px solid var(--line);border-radius:3px;color:var(--parch2);opacity:.86}',
    '.wrap .house-topbar .appnav.v32nav .navword.v32more:hover{opacity:1;color:var(--gold-hi)}',
    '.wrap .house-topbar .appnav.v32nav .navword.v32more[aria-current="page"]{opacity:1;color:var(--gold-hi);border-color:var(--gold);box-shadow:inset 0 -2px 0 var(--gold-hi);background:#d5b16c0a}',
    '.v32pill{display:inline-block;min-width:1.6em;margin-left:4px;padding:0 5px;border-radius:9px;background:var(--claret);color:var(--parch);font-family:var(--house-reading,Georgia),serif;font-size:13px;line-height:1.5;letter-spacing:0;font-variant:normal;text-align:center}',
    /* at a phone's width the tab words keep the house's 12px; the room comes
       from the letter spacing, the bar's side margins and More's padding */
    '@media(max-width:420px){.wrap .house-topbar .appnav.v32nav{margin-left:12px;margin-right:12px}.wrap .house-topbar .appnav.v32nav .navword{font-size:12px;letter-spacing:0;padding-inline:2px}.wrap .house-topbar .appnav.v32nav .navword.v32more{padding:4px 6px;margin-left:2px}.v32pill{font-size:12px;margin-left:2px;padding:0 4px}}',

    /* Back: the first thing in #view, sticky, clear of the badge once stuck */
    '.v32sentinel{height:1px;margin:0}',
    '.v32back{position:sticky;top:0;z-index:30;display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;margin:0 0 6px;padding:6px 0;background:var(--bg)}',
    '.v32back.is-stuck{padding-left:calc(64px + env(safe-area-inset-left, 0px));border-bottom:1px solid var(--line)}',
    '.v32back #v32-back{min-height:44px;min-width:44px;padding:8px 18px}',
    '.v32back .v32pos{font-size:16px;color:var(--gold-soft)}',
    '.v32back .v32from{flex:1 0 100%;margin:0;font-size:15px;line-height:1.5;color:var(--parch2)}',
    'body[data-codex-page="cellar"] .wrap .v28-bar{top:58px}',

    /* the level page */
    '.v32-stat{margin:0 0 6px;font-size:16px;color:var(--gold-soft)}',
    '.v32-here{font-variant:small-caps;letter-spacing:.05em;color:var(--gold-hi)}',
    '.v32-sec{margin:18px 0 0}',
    '.v32-h2{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-weight:500;font-size:21px;line-height:1.3;letter-spacing:.03em;color:var(--gold-hi);margin:0 0 6px;padding-bottom:6px;border-bottom:1px solid var(--line)}',
    '.wrap .v32rows{margin-top:10px}',
    '.wrap .v32rows .v25row{min-height:0}',
    '.v32-line{margin:8px 0;font-size:16px;line-height:1.5;color:var(--parch)}',
    '.v32-houseline{color:var(--gold-soft)}',
    '.v32chips{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 0}',
    '.v32quietrow{display:flex;flex-wrap:wrap;gap:4px 16px;margin:12px 0 0}',
    '.v32quiet,.v32link{min-height:44px;padding:8px 2px;background:none;border:0;color:var(--gold-soft);font-family:var(--house-reading,\'EB Garamond\',Georgia,serif);font-size:16px;text-decoration:underline;text-underline-offset:3px;cursor:pointer;text-align:left}',
    '.v32quiet:hover,.v32link:hover{color:var(--gold-hi)}',
    '.v32find{margin-top:10px}',
    '.v32find .sainput{width:100%;min-height:44px;box-sizing:border-box}',
    '.v32hits{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:8px}',
    '.v32hits .secbtn{width:100%;min-height:44px}',
    '.v32holds{margin-top:20px}',
    '.wrap .v32subs{margin-top:12px}',
    '.v32-subh{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-weight:500;font-size:18px;color:var(--gold-hi);margin:0 0 6px}',
    '.v32secs{list-style:none;margin:8px 0 0;padding:0}',
    '.v32secs li{display:flex;flex-wrap:wrap;align-items:center;gap:0 12px;border-bottom:1px solid rgba(201,162,39,.13)}',
    '.v32plain{min-height:44px;display:inline-flex;align-items:center;font-size:16px;color:var(--parch)}',
    '.v32secmeta{font-size:15px;color:var(--parch2)}',

    /* the roots */
    '.v32scope{display:flex;flex-wrap:wrap;align-items:center;gap:0 4px;margin:0 0 6px;font-size:16px;color:var(--parch2)}',
    '.v32scope-b{min-height:44px;padding:8px 4px;background:none;border:0;color:var(--gold-hi);font-family:var(--house-reading,\'EB Garamond\',Georgia,serif);font-size:16px;text-decoration:underline;text-underline-offset:3px;cursor:pointer}',
    '.v32scope-name{font-weight:600}',
    '.v32scope-t{font-weight:600;color:var(--parch)}',
    '.v32scope-list{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 10px}',
    '.v32-due{margin:10px 0 0;padding:16px;border:1px solid var(--line);border-radius:3px;background:var(--house-panel,transparent)}',
    '.v32-due .secgroup{margin-top:0}',
    '.v32-go{min-height:48px;width:100%;margin-top:6px}',
    '.v32-group{margin-top:22px}',
    '.v32-gh{font-family:var(--house-display,\'Cinzel\',Georgia,serif)}',
    '.v32dom{display:flex;flex-direction:column;gap:6px}',
    '.v32dom .secs{margin-top:0}',
    '.v32-testgroup{margin-top:28px;padding-top:18px;border-top:3px double var(--line)}',
    '.v32-deckpage .v32-go{margin-top:18px}',
    '.v32narrow{margin-top:14px}',

    /* the card screen */
    '.wrap .v32card .v28-front{min-height:240px}',
    '.wrap .v32card .v32-gfront{align-items:flex-start;text-align:left}',
    '.wrap .v32card .v32-prof .v32-gl{display:block;color:var(--ink);font-size:17px;line-height:1.5;margin:0 0 8px}',
    '.wrap .v32card .v32-ctrl .btn{flex:1 1 50%;min-height:56px}',
    '.wrap .v32card .v32-acts{display:flex;flex-wrap:wrap;gap:10px}',
    '.v32misslink{margin-top:10px;min-height:44px}',
    '@media(max-width:599px){.v32-h2{font-size:19px}.v32-due{padding:14px}}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();
