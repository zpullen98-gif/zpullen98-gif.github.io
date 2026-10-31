/* ================== CODEX LIII: THE CMS EDITION ==================

   The CMS edition, 29 October 2026. Loaded after codex52.js and
   atlas-context.js, before boot.js. It edits no earlier layer and no data
   file; every wrapper is typeof guarded, outermost, and every registry is
   extended key by key, never replaced (codex41's own() idiom).

   WHAT THIS LAYER OWNS:

   1. THE BAR reads Home, the house's name, CMS, Grapes, Library and the
      quiet More. V25_NAV is reassigned whole (codex47 spliced its word into
      codex41's array; a new array replaces it). The drawn bar loses
      codex47's v47nav class, so css/house-atlas-nav.css's two row grid never
      applies, and the due pill rides on Library. The second word is still
      codex41's, read again and escaped at every draw.

   2. THE OWNERS, PARENTS AND HUBS of the CMS views (cms, cmsday, cmstasting,
      cmsgrid, cmssubject, cmsready), the grape views (grapes, grape,
      griddrill, courttasting) and the bank view (bank). Every screen codex41
      gave to the retired tab word belongs to Library now, the house's own
      screens (cellarrecite, houserecite, housesay, houseguest) to the house;
      the atlas views codex47 took are the Library's again. The Cellar
      Compass keeps its parent, the level page (pinned by its own gate), and
      Quizzes keeps the Practise root.

   3. THE ROUTER: v32Arg, v32Route, v32Apply, v32ParentRoute, v25MainName and
      v25NavWord are wrapped last for the eleven new views; the cold address
      is read again once in codex51's form. V32_RUN is untouched: the grid
      drill and the tasting run are plain views whose state lives in
      S._v53grid and S._v53tg, so a cold address draws their start screen.
      A run's context word: S._v53drill holds the subject id of a CMS drill
      or 'grape:' + slug of a grape drill while S.section carries the
      'CMS: ' or 'Grape: ' prefix; both are read, so a later run of another
      kind never lights the wrong word. S._v53from is 'grapes' while a deck
      was opened from the Grapes views.

   4. THE HOUSE'S CONTENT OUTSIDE ITS TAB is taken off: Due today is the
      level's arithmetic alone and the house's count lives in Service
      rehearsal (v53HouseDue); the level page loses My restaurant and the
      Compass row; the Practise root, Quizzes, the Library and the search
      lose the house's decks, drills and doors, each found again in
      codex48's rooms, where the producers and components decks are added.
      The quick quiz deals eight from the level in its own mix of formats
      and two from the regions.

   5. THE LIBRARY'S NEW SHAPE: the jump chips, the Practise section (the
      Practise root's body, which carries a group of the Court's curriculum,
      a deck of each subject's rows), the bank, the reading rooms and the
      atlas; the
      bank view (#/v/bank) with Drill and Exam on every category; Home's
      level card counts and the one row to the house.

   6. THE CMS VIEWS (section 9): the root, the exam day, the tasting list,
      the grid, a subject on codex39's article pattern with its drill, its
      deck of the Court's rows and its readiness, and Readiness for every
      subject; the e- keys of the CMS bank kept out of level progress and
      the schedule and found by codex8's ledger. The
      section's small builders (v53Details, v53Chips, v53Sections, v53Lines,
      v53Pairs, v53Para, v53Door, v53Act, v53GoBtn, v53cStr, v53cList,
      v53cObj, v53cFold, v53cSlug) serve the grape views too: reuse them,
      never declare a second function of the same name in this file (the
      last declaration would win for the whole layer).

   7. THE GRAPE VIEWS (section 11): the joined book of 59 grapes
      (v53GrapeJoin, v53GrapeKey), the Grapes root, a grape's page with
      its one card deck grape:{slug} and its drill, the Court's grid drill
      (griddrill/{slug?}, marked line by line by v53GridGrade, kept per
      device in oot-codex-courtgrid-v1) and the Village tasting on the
      Court's grid (courttasting: two whites then two reds under a 30
      minute clock on codex39's rule, held when leaving).

   BAR WIDTHS, measured in Chromium by the phone walk (walk53.mjs) on 31
   October 2026, every box read with getBoundingClientRect: codex32's phone
   rule (12px Cinzel, letter spacing 0, the row 12px in from either edge,
   the lit word at 400 and the rest at 600 in both services), a fresh
   profile at Village with the house's pack, Home lit, Due today's pill
   reading two figures (20). Home, Brennan's, CMS, Grapes, Library with
   the pill, More:
     375 day    48.2  72.2  46.2  55.2  83.2  44   349 of a 351 row
     375 night  50    71    47    56    81    44   349 of 351
     390 day    51.2  75.2  49.2  58.2  86.2  44   364 of a 366 row
     390 night  53    74    50    59    84    44   364 of 366
   With CMS, Grapes or Library lit a word moves by one to four pixels and
   the sum holds (Library lit draws at 79.8 by day at 375, 82.8 at 390).
   At 320 the words wanted 301 of the 296 wide row (Brennan's 57, Library
   68), so under 340 px this layer takes a pixel of inline padding off each
   word (2px to 1px), narrows the pill and sets More's margin at 1px; the
   tabs draw at 44 (Home held at the 44 floor), 56.1, 44, 44, 62.9 and 44
   by day, 44, 56.6, 44, 44, 62.4 and 44 at night: 295 of 296, one row,
   every word whole. A house name too long for the row gives way alone,
   with an ellipsis and the name as its title; the five fixed words never
   shrink below their own width. Every tab 60 tall (More 44 by 44), every
   centre on one line, no sideways scroll at 320, 375 or 390, night or day;
   the pill rides on Library alone and codex47's class is gone.
*/

var V53_CMS_VIEWS = ['cms', 'cmsday', 'cmstasting', 'cmsgrid', 'cmssubject', 'cmsready'];
var V53_GRAPE_VIEWS = ['grapes', 'grape', 'griddrill', 'courttasting'];
var V53_VIEWS = V53_CMS_VIEWS.concat(V53_GRAPE_VIEWS).concat(['bank']);
var V53_HOUSE_RUNS = ['cellarrecite', 'houserecite', 'housesay', 'houseguest'];
var V53_ATLAS_VIEWS = ['worldmap', 'regions', 'country', 'region', 'fieldatlas', 'fieldmap'];
var V53_HOUSE_DECK = /^(list|list:|list-weak|one:|bottles|menu-words|misses|due|cellar-compass|cellar-path:|producers|components|item-|v51-recovery)/;
var V53_ADDRESS = /^#\/v\/(cms|cmsday|cmstasting|cmsgrid|cmssubject|cmsready|grapes|grape|griddrill|courttasting|bank)(\/|$)/;

function v53Esc(s) { return (typeof v32Esc === 'function') ? v32Esc(s) : String(s == null ? '' : s); }
function v53Lv() { return (typeof v32Lv === 'function') ? v32Lv() : { key: 'certified', name: 'Village', n: 2 }; }
function v53House() { try { return (typeof v32House === 'function') ? v32House() : null; } catch (e) { return null; } }
function v53HasHouse() { try { return typeof v32HasHouse === 'function' && v32HasHouse(); } catch (e) { return false; } }
function v53Cms() { return (typeof CMS !== 'undefined' && CMS) ? CMS : null; }
function v53Subjects() { var c = v53Cms(); return (c && Array.isArray(c.subjects)) ? c.subjects : []; }
function v53Subject(id) {
  var hit = null;
  v53Subjects().some(function (s) { if (s && s.id === id) { hit = s; return true; } return false; });
  return hit;
}

/* =========== 1. the bar =========== */

V25_NAV = [['home', 'Home'], ['brennans', (typeof v41TabWord === 'function') ? v41TabWord() : 'Brennan’s'], ['cms', 'CMS'], ['grapes', 'Grapes'], ['library', 'Library'], ['more', 'More']];

/* The drawn bar, outermost: codex47's class taken off (its stylesheet's
   every selector carries it, so the two row grid never applies), and the
   due pill on Library, as codex41 put it on its word. */
if (typeof v25NavHtml === 'function') {
  var _v53NavHtml = v25NavHtml;
  v25NavHtml = function () {
    var html = _v53NavHtml.apply(this, arguments);
    try {
      html = html.replace(' v47nav', '');
      var pill = '';
      try { pill = (typeof v32Pill === 'function') ? v32Pill() : ''; } catch (e) { pill = ''; }
      if (pill && html.indexOf('class="v32pill"') < 0) {
        html = html.replace(/(<button[^>]* data-nav="library"[^>]*>[^<]*)<\/button>/, function (m, open) { return open + pill + '</button>'; });
      }
      /* the house's name, already escaped, as the word's title, for the ellipsis a long name takes at 320 */
      html = html.replace(/(<button[^>]* data-nav="brennans"(?![^>]* title=)[^>]*)>([^<]*)<\/button>/, function (m, open, name) { return open + ' title="' + name + '">' + name + '</button>'; });
    } catch (e) { }
    return html;
  };
}

/* A tap on a word: CMS and Grapes open their roots (a push from anywhere
   else; on the root itself, back to the top); everything else falls through
   (codex41 still maps the retired word to the Practise root, codex32's
   table handles Library). */
if (typeof v25Nav === 'function') {
  var _v53Nav = v25Nav;
  v25Nav = function (word) {
    if (word !== 'cms' && word !== 'grapes') return _v53Nav.apply(this, arguments);
    if (S.view === word) {
      try { window.scrollTo(0, 0); } catch (e) { }
      return;
    }
    if (typeof v25Leave === 'function' && !v25Leave()) return;
    S._v32scopeOpen = false;
    v32Go({ view: word }, 'push');
  };
}

/* =========== 2. the owners, the parents, the hubs =========== */

(function () {
  var own = function (k, word) {
    if (typeof V32_OWNER !== 'undefined' && V32_OWNER) V32_OWNER[k] = word;
    if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER[k] = word;
    if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB[k] = word;
  };
  /* every screen under the retired word belongs to Library; the house's own runs to the house */
  if (typeof V32_OWNER !== 'undefined' && V32_OWNER) {
    Object.keys(V32_OWNER).forEach(function (k) { if (V32_OWNER[k] === 'practise') own(k, 'library'); });
  }
  if (typeof V25_UNDER !== 'undefined' && V25_UNDER) {
    Object.keys(V25_UNDER).forEach(function (k) { if (V25_UNDER[k] === 'practise') own(k, 'library'); });
  }
  if (typeof V25_HUB !== 'undefined' && V25_HUB) {
    Object.keys(V25_HUB).forEach(function (k) { if (V25_HUB[k] === 'practise') own(k, 'library'); });
  }
  V53_HOUSE_RUNS.forEach(function (k) { own(k, 'brennans'); });
  V53_CMS_VIEWS.forEach(function (k) { own(k, 'cms'); });
  V53_GRAPE_VIEWS.forEach(function (k) { own(k, 'grapes'); });
  own('bank', 'library');
  V53_ATLAS_VIEWS.forEach(function (k) { own(k, 'library'); });
  if (typeof V25_AREA !== 'undefined' && V25_AREA) {
    V25_AREA.worldmap = 'library';
    V25_AREA.cms = 'cms';
    V25_AREA.grapes = 'grapes';
    V25_AREA.bank = 'library';
  }
  if (typeof V32_PARENT !== 'undefined' && V32_PARENT) {
    V32_PARENT.cms = 'home';
    ['cmsday', 'cmstasting', 'cmsgrid', 'cmsready', 'cmssubject'].forEach(function (k) { V32_PARENT[k] = 'cms'; });
    V32_PARENT.grapes = 'home';
    ['grape', 'griddrill', 'courttasting'].forEach(function (k) { V32_PARENT[k] = 'grapes'; });
    V32_PARENT.bank = 'library';
    V32_PARENT.flashcards = 'library';
    V32_PARENT.worldmap = 'library';
    V32_PARENT.regions = 'library';
  }
})();

/* The lit word on the context screens: a deck or a card of the house's
   lights the house, a grape deck opened from Grapes lights Grapes, the rest
   Library; a run lights the house, CMS, Grapes or Library by what it deals. */
if (typeof v25NavWord === 'function') {
  var _v53NavWord = v25NavWord;
  v25NavWord = function () {
    try {
      var v = S.view;
      if (v === 'deck' || v === 'housedeck' || v === 'flash') {
        var id = '';
        if (v === 'deck') id = String(S._v32deck || '');
        else { var run = S._v32run; id = (run && run.v32) ? String(run.deckId || '') : 'grapes'; }
        if (V53_HOUSE_DECK.test(id)) return 'brennans';
        if (/^grapes?/.test(id) && S._v53from === 'grapes') return 'grapes';
        return 'library';
      }
      if (v === 'quiz' || v === 'results') {
        var sec = S.section;
        if (typeof V27_CELLAR_SECTION !== 'undefined' && sec === V27_CELLAR_SECTION) return 'brennans';
        if (typeof V27_PAIR_SECTION !== 'undefined' && sec === V27_PAIR_SECTION) return 'brennans';
        var first = S.pool && S.pool[0];
        if (first && /^h-/.test(String(first.id || ''))) return 'brennans';
        var drill = String(S._v53drill || '');
        if (drill && /^grape:/.test(drill) && /^Grape: /.test(String(sec || ''))) return 'grapes';
        if (drill && /^CMS: /.test(String(sec || ''))) return 'cms';
        return 'library';
      }
    } catch (e) { }
    return _v53NavWord.apply(this, arguments);
  };
}

/* =========== 3. the router =========== */

if (typeof v32Arg === 'function') {
  var _v53Arg = v32Arg;
  v32Arg = function (v) {
    if (v === 'cmssubject') return S._v53subject ? String(S._v53subject) : '';
    if (v === 'grape') return S._v53grape ? String(S._v53grape) : '';
    if (v === 'griddrill') return S._v53gridGrape ? String(S._v53gridGrape) : '';
    return _v53Arg.apply(this, arguments);
  };
}

/* A subject's page and a grape's page are one screen each, so Previous and
   Next replace (codex46's rule for a technique). */
if (typeof v32Route === 'function') {
  var _v53Route = v32Route;
  v32Route = function () {
    var r = _v53Route.apply(this, arguments);
    try {
      if (r && (S.view === 'cmssubject' || S.view === 'grape')) r.key = S.view;
    } catch (e) { }
    return r;
  };
}

if (typeof v32Apply === 'function') {
  var _v53Apply = v32Apply;
  v32Apply = function (r, state) {
    var v = r && r.view;
    if (!v || V53_VIEWS.indexOf(v) < 0) {
      var out = _v53Apply.apply(this, arguments);
      try {
        var keep = v === 'deck' || v === 'card' || v === 'housedeck' || v === 'flash';
        if (!keep) S._v53from = null;
      } catch (e) { }
      return out;
    }
    var arg = String(r.arg || '');
    S._v28edit = false;
    if (v === 'cmssubject') {
      if (!v53Subject(arg)) { S._v53subject = ''; S.view = 'cms'; S._v25area = 'cms'; S._v53from = null; return { view: 'cms' }; }
      S._v53subject = arg;
    } else if (v === 'grape') {
      var known = true;
      try { if (typeof v53GrapeFind === 'function') known = !!v53GrapeFind(arg); } catch (e) { known = true; }
      if (!arg || !known) { S._v53grape = ''; S.view = 'grapes'; S._v25area = 'grapes'; S._v53from = 'grapes'; return { view: 'grapes' }; }
      S._v53grape = arg;
    } else if (v === 'griddrill') {
      S._v53gridGrape = arg;
    }
    S._v25area = (V53_CMS_VIEWS.indexOf(v) >= 0) ? 'cms' : (V53_GRAPE_VIEWS.indexOf(v) >= 0 ? 'grapes' : 'library');
    S._v53from = (V53_GRAPE_VIEWS.indexOf(v) >= 0) ? 'grapes' : null;
    S.view = v;
    return arg ? { view: v, arg: arg } : { view: v };
  };
}

if (typeof v32ParentRoute === 'function') {
  var _v53ParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    var v = S.view;
    if (v === 'cmssubject') return { view: 'cms' };
    if (v === 'grape') return { view: 'grapes' };
    if (v === 'griddrill') return S._v53gridGrape ? { view: 'grape', arg: String(S._v53gridGrape) } : { view: 'grapes' };
    if (v === 'courttasting') return { view: 'grapes' };
    if (v === 'bank') return { view: 'library' };
    if (v === 'regions') return { view: 'library' };
    if (v === 'worldmap' && !S.wmap) return { view: 'library' };
    if (v === 'deck' && /^grapes?/.test(String(S._v32deck || '')) && S._v53from === 'grapes') return { view: 'grapes' };
    return _v53ParentRoute.apply(this, arguments);
  };
}

if (typeof v25MainName === 'function') {
  var _v53MainName = v25MainName;
  v25MainName = function () {
    var v = S && S.view;
    if (v === 'cms') return 'CMS';
    if (v === 'cmsday') return 'The exam day';
    if (v === 'cmstasting') return 'The Certified tasting list';
    if (v === 'cmsgrid') return 'The deductive grid';
    if (v === 'cmsready') return 'Readiness';
    if (v === 'cmssubject') { var s = v53Subject(S._v53subject); return s ? String(s.name || 'CMS') : 'CMS'; }
    if (v === 'grapes') return 'Grapes';
    if (v === 'grape') return (typeof v53GrapeName === 'function') ? v53GrapeName(S._v53grape) : String(S._v53grape || 'Grapes');
    if (v === 'griddrill') return 'The Court’s grid';
    if (v === 'courttasting') return 'The Village tasting';
    if (v === 'bank') return 'The ' + v53Lv().name + ' question bank';
    return _v53MainName.apply(this, arguments);
  };
}

/* =========== 4. the views and the doors =========== */

(function () {
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) {
    /* the CMS views are registered with their renderers in section 9, the grape views in section 11 */
    V25_VIEWS.bank = function () { return v53BankView(); };
  }
  if (typeof V25_GO !== 'undefined' && V25_GO) {
    ['cms', 'cmsday', 'cmstasting', 'cmsgrid', 'cmsready', 'grapes', 'bank', 'courttasting'].forEach(function (k) {
      V25_GO[k] = function () { v32Go({ view: k }, 'push'); };
    });
    V25_GO.cmssubject = function (arg) { v32Go({ view: 'cmssubject', arg: String(arg || '') }, 'push'); };
    V25_GO.cmsdrill = function (arg) { if (typeof v53StartDrill === 'function') v53StartDrill(String(arg || 'all')); };
    V25_GO.grape = function (arg) { v32Go({ view: 'grape', arg: String(arg || '') }, 'push'); };
    V25_GO.griddrill = function (arg) { v32Go({ view: 'griddrill', arg: String(arg || '') }, 'push'); };
    V25_GO.grapedrill = function (arg) { if (typeof v53StartGrapeDrill === 'function') v53StartGrapeDrill(String(arg || '')); };
    if (typeof V25_GO.mock !== 'function') V25_GO.mock = function () { if (typeof startMock === 'function') v32Push(function () { startMock(); }); };
    if (typeof V25_GO.serviceref !== 'function') V25_GO.serviceref = function (arg) { if (typeof v39Open === 'function') v39Open('serviceref', arg || '', 'push'); };
  }
})();

/* =========== a reload on one of the new addresses ===========
   codex32 read the address before these views were known; codex51's form. */
(function () {
  try {
    if (typeof V32 === 'undefined' || !V32 || V32.moved) return;
    var hash = (typeof V32.initialHash === 'string' && V32.initialHash) ? V32.initialHash : ((typeof location !== 'undefined' && location && location.hash) || '');
    if (!V53_ADDRESS.test(hash)) return;
    v32Apply(v32Parse(hash), typeof v32CurState === 'function' ? v32CurState() : null);
    V32.pend = 'replace';
    if (V32.booted && typeof render === 'function') render();
  } catch (e) { }
})();

/* =========== 5. the house's content outside its tab ===========

   Due today is the level's arithmetic alone (codex32's house step, the
   weak wines then the fresh, is kept as v53HouseDue and dealt from Service
   rehearsal); the level page loses My restaurant and the Compass row; the
   Practise root, Quizzes, the Library and the search lose the house's decks,
   drills and doors, each of which codex48's rooms already hold. */

var _v53DueToday = (typeof v32DueToday === 'function') ? v32DueToday : null;

/* The house step of codex32's Due today, verbatim: the wines last answered
   Again (twenty at most), or, with none, the wines never graded, in the
   list's order, ten at most. */
function v53HouseDue() {
  var weak = [], fresh = [];
  try {
    if (v53HasHouse()) {
      var all = v32Ids({});
      weak = v32Prog(all).againIds.slice(0, 20);
      if (!weak.length) fresh = all.filter(function (id) { return !v32Latest(id); }).slice(0, 10);
    }
  } catch (e) { weak = []; fresh = []; }
  var ids = weak.length ? weak : fresh;
  return { houseIds: ids, a: ids.length, weak: weak.length, fresh: fresh.length };
}

function v53HouseDueLine(t) {
  t = t || v53HouseDue();
  if (!t.a) return 'Nothing due from our list today. Open a deck below.';
  if (t.weak) return t.a === 1 ? '1 wine from our list to look at again.' : t.a + ' wines from our list to look at again.';
  return t.a === 1 ? '1 wine from our list not yet studied.' : t.a + ' wines from our list not yet studied.';
}

if (_v53DueToday) {
  v32DueToday = function () {
    var lv = v53Lv();
    var dueQ = 0, unseen = 0;
    try { dueQ = (typeof v25Due === 'function') ? v25Due() : 0; } catch (e) { dueQ = 0; }
    var newQ = 0;
    if (dueQ < 20) {
      try { unseen = (typeof v25Unseen === 'function') ? v25Unseen() : 0; } catch (e) { unseen = 0; }
      newQ = Math.min(20 - dueQ, unseen);
    }
    var dQ = Math.min(dueQ, 30);
    var nQ = Math.min(newQ, 30 - dQ);
    return { level: lv.name, houseIds: [], a: 0, b: dQ + nQ, d: dQ, k: nQ, total: dQ + nQ };
  };
}

/* The due deck by its id carries the house step (codex32 read it from
   v32DueToday, now the level's alone), so the room's run and the deck it is
   dealt under agree; no screen outside the house draws its row. */
if (typeof v32DeckDef === 'function') {
  var _v53DeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    var def = _v53DeckDef.apply(this, arguments);
    if (id === 'due' && def) {
      try {
        def.cards = (typeof v32HouseCards === 'function') ? v32HouseCards(v53HouseDue().houseIds) : [];
        if (typeof v32Learnt === 'function') def.learnt = v32Learnt(def);
      } catch (e) { }
    }
    return def;
  };
}

function v53StartHouseDue() {
  var t = v53HouseDue();
  if (!t.a || typeof v32HouseCards !== 'function' || typeof v32StartRun !== 'function') return false;
  var cards = v32HouseCards(t.houseIds);
  if (!cards.length) return false;
  return v32StartRun('due', { cards: cards, keepOrder: true, push: true });
}

/* The producers' and the components' deck groups, as codex38 and codex35
   drew them on the Practise root, for Service rehearsal. */
function v53ProducerDecks() {
  var h = v53House();
  if (!h || typeof v38Rows !== 'function' || typeof v32DeckRow !== 'function') return '';
  var rows = [];
  try { rows = v38Rows(h) || []; } catch (e) { rows = []; }
  if (!rows.length) return '';
  var decks = v32DeckRow('producers', 'Every producer');
  try {
    if (typeof v38ByGroup === 'function') decks += v38ByGroup(rows).map(function (g) { return v32DeckRow('producers:' + g.key, g.label); }).join('');
  } catch (e) { }
  return decks;
}
function v53ComponentDecks() {
  if (!v53House() || typeof v32DeckRow !== 'function') return '';
  var kinds = (typeof V35_KINDS !== 'undefined' && V35_KINDS) ? V35_KINDS : ['ingredient', 'technique', 'story'];
  var decks = v32DeckRow('components') + kinds.map(function (k) { return v32DeckRow('components:' + k); }).join('') + v32DeckRow('components-all');
  return decks;
}

if (typeof v48RehearsalHtml === 'function') {
  var _v53RehearsalHtml = v48RehearsalHtml;
  v48RehearsalHtml = function () {
    var html = _v53RehearsalHtml.apply(this, arguments);
    try {
      var t = v53HouseDue();
      var line = '<p>' + v53Esc(v53HouseDueLine(t)) + '</p>'
        + (t.a ? '<button type="button" class="btn gold" data-v53="housedue" id="v53-housedue">Start the wines due</button>' : '');
      html = html.replace(/(<h3 id="v48-heading-today">[^<]*<\/h3>)<p>[\s\S]*?<\/p>(?:<button[^>]*data-v32="due"[^>]*>[^<]*<\/button>)?/, function (m, h3) { return h3 + line; });
      html = html.replace(/<button[^>]*data-v32="due"[^>]*>[^<]*<\/button>/g, '');
      var groups = '';
      var prod = v53ProducerDecks();
      if (prod && typeof v48Details === 'function') groups += v48Details('v53-producers', 'Who makes our wines', 'Every producer, and a deck per region', v32Rows(prod));
      var made = v53ComponentDecks();
      if (made && typeof v48Details === 'function') groups += v48Details('v53-components', 'What our wines are made of', 'The ingredients, the techniques and the stories behind the list', v32Rows(made));
      if (groups) {
        var at = html.indexOf('<details class="v48-disclosure" data-v48-keep="hands-on"');
        if (at < 0) at = html.indexOf('<section class="v48-group" aria-labelledby="v48-heading-rehearsal-next"');
        html = at >= 0 ? html.slice(0, at) + groups + html.slice(at) : html + groups;
      }
    } catch (e) { }
    return html;
  };
}

/* The level page's search names the Codex alone (codex32's searchLabel named the list). */
if (typeof v32W === 'function') {
  var _v53W = v32W;
  v32W = function (key) {
    if (key === 'searchLabel') return 'Search the Codex';
    return _v53W.apply(this, arguments);
  };
}

/* The level page: the Compass row leaves Today's study, My restaurant leaves whole. */
if (typeof v32TodayRows === 'function') {
  var _v53TodayRows = v32TodayRows;
  v32TodayRows = function () {
    var html = _v53TodayRows.apply(this, arguments);
    try { html = html.replace(/<li><button class="v25row" type="button" data-go="cellarcompass"[\s\S]*?<\/li>/g, ''); } catch (e) { }
    return html;
  };
}
if (typeof v32RestaurantHtml === 'function') {
  v32RestaurantHtml = function () { return ''; };
}

/* The Practise root: the house's groups and the words taken off, the bank
   row after Quick quiz. The order left: Due today, Quick quiz, the bank,
   the level's decks with the rounds, Reference cards, The regions, Service
   references, The Wine Workshop cards, Hands on, the level test. */
function v53BankRow() {
  var L = v53Lv();
  var n = 0, m = 0;
  try { n = (LEVELS[L.key].bank || []).length; } catch (e) { n = 0; }
  try { m = Object.keys(cats()).length; } catch (e) { m = 0; }
  return v32GoRow('bank', 'The ' + L.name + ' question bank', v53Num(n) + ' questions in ' + m + ' categories');
}
function v53Num(n) {
  var s = String(Math.round(Number(n) || 0));
  var out = '';
  while (s.length > 3) { out = ',' + s.slice(-3) + out; s = s.slice(0, -3); }
  return s + out;
}
function v53CutSection(html, id) {
  var open = html.indexOf('<section class="v32-group" aria-labelledby="' + id + '"');
  if (open < 0) return html;
  var end = html.indexOf('</section>', open);
  if (end < 0) return html;
  return html.slice(0, open) + html.slice(end + '</section>'.length);
}
function v53TakeSection(html, id) {
  var open = html.indexOf('<section class="v32-group" aria-labelledby="' + id + '"');
  if (open < 0) return { html: html, piece: '' };
  var end = html.indexOf('</section>', open);
  if (end < 0) return { html: html, piece: '' };
  end += '</section>'.length;
  return { html: html.slice(0, open) + html.slice(end), piece: html.slice(open, end) };
}
/* One deck per subject of the Court's guide that fills a Certified cell (codex53's cms:{id}, section 9), in the
   guide's order, as a group of the Practise root. */
function v53CmsDeckGroup() {
  if (typeof v32DeckRow !== 'function' || typeof v32Group !== 'function') return '';
  var rows = '';
  try {
    v53Subjects().forEach(function (s) { if (s && s.id) rows += v32DeckRow('cms:' + s.id, String(s.name || s.id)); });
  } catch (e) { rows = ''; }
  return rows ? v32Group('The Court’s curriculum', rows, 'v53-fc-cms') : '';
}
function v53StripPractise(html) {
  ['v32-fc-rest', 'v41-fc-drills', 'v38-fc-prod', 'v35-fc-made', 'v32-fc-words'].forEach(function (id) { html = v53CutSection(html, id); });
  /* codex46 appended the Workshop cards after the level test; they sit before Hands on */
  var cards = v53TakeSection(html, 'v46-cards');
  if (cards.piece) {
    var hands = cards.html.indexOf('<section class="v32-group" aria-labelledby="v41-fc-hands"');
    if (hands < 0) hands = cards.html.indexOf('<section class="v32-group v32-testgroup"');
    html = hands >= 0 ? cards.html.slice(0, hands) + cards.piece + cards.html.slice(hands) : html;
  }
  /* the no-house variant of My restaurant */
  html = html.replace(/<section class="v32-group"><h3 class="secgroup v32-gh">[^<]*<\/h3><p class="v32-line">[^<]*<\/p><\/section>/g, '');
  /* codex40's row before Due today */
  html = html.replace(/<ul class="v25rows v32rows">(?:(?!<\/ul>)[\s\S])*?data-deck="cellar-compass"[\s\S]*?<\/ul>/, '');
  /* the Court's curriculum, a deck of each subject's rows, after the service references and before the Workshop
     cards: with the house's decks gone, a search of the root for a region (codex42's filter offers Champagne) finds
     the subject that teaches it */
  var cms = v53CmsDeckGroup();
  if (cms) {
    var at = html.indexOf('<section class="v32-group" aria-labelledby="v46-cards"');
    if (at < 0) at = html.indexOf('<section class="v32-group" aria-labelledby="v41-fc-hands"');
    if (at < 0) at = html.indexOf('<section class="v32-group v32-testgroup"');
    html = at >= 0 ? html.slice(0, at) + cms + html.slice(at) : html;
  }
  /* the bank row after Quick quiz */
  var quick = html.indexOf('<section class="v32-due v41-quick"');
  var quickEnd = quick >= 0 ? html.indexOf('</section>', quick) : -1;
  if (quickEnd >= 0) {
    quickEnd += '</section>'.length;
    html = html.slice(0, quickEnd) + '<section class="v32-group v53-bankgroup">' + v32Rows(v53BankRow()) + '</section>' + html.slice(quickEnd);
  }
  return html;
}
if (typeof v32FlashcardsHtml === 'function') {
  var _v53FlashcardsHtml = v32FlashcardsHtml;
  v32FlashcardsHtml = function () {
    var html = _v53FlashcardsHtml.apply(this, arguments);
    try { return v53StripPractise(html); } catch (e) { return html; }
  };
}

/* Quizzes: the house's drills leave; the bank and the mock lead the level's group. */
function v53MockRow(lv) {
  var L = (typeof v32LvByKey === 'function') ? v32LvByKey(lv) : null;
  if (!L) return '';
  var mock = null;
  try { mock = LEVELS[lv].mock; } catch (e) { mock = null; }
  var line = '';
  if (mock && mock.oral) line = 'The Gauntlet: ' + mock.n + ' questions aloud in ' + Math.round(mock.secs / 60) + ' minutes';
  else if (mock) line = mock.n + ' questions in ' + Math.round(mock.secs / 60) + ' minutes, timed as the Court times it';
  return '<li><button class="v25row" type="button" data-v32="lvgo" data-lv="' + v53Esc(lv) + '" data-k="mock" id="v53-mock-' + v53Esc(lv) + '">'
    + '<span class="v25row-name">' + v53Esc('The ' + L.name + ' mock') + '</span>'
    + (line ? '<span class="v25row-line">' + v53Esc(line) + '</span>' : '') + '</button></li>';
}
if (typeof v32QuizzesHtml === 'function') {
  var _v53QuizzesHtml = v32QuizzesHtml;
  v32QuizzesHtml = function () {
    var html = _v53QuizzesHtml.apply(this, arguments);
    try {
      html = v53CutSection(html, 'v32-qz-rest');
      var lv = html.indexOf('<section class="v32-group" aria-labelledby="v32-qz-lv"');
      var ul = lv >= 0 ? html.indexOf('<ul class="v25rows v32rows">', lv) : -1;
      if (ul >= 0) {
        ul += '<ul class="v25rows v32rows">'.length;
        html = html.slice(0, ul) + v53BankRow() + v53MockRow(activeLevel) + html.slice(ul);
      }
    } catch (e) { }
    return html;
  };
}

/* The quick quiz: two from the regions, eight from the level in the bank's
   own mix of formats (matching and select left out, which the engine deals
   as screens of their own), with a floor of three multiple choice at
   Régionale and Village and none above, where the banks are short answer. */
function v53QuickEight(want) {
  var bank = (typeof QUESTIONS !== 'undefined' && QUESTIONS) ? QUESTIONS : [];
  var pool = bank.filter(function (q) { return q && !q.mt && !q.sel && (q.opts || q.sa); });
  var mix = (typeof shuffle === 'function') ? shuffle(pool) : pool.slice();
  var out = mix.slice(0, want);
  var lv = (typeof activeLevel !== 'undefined') ? activeLevel : 'certified';
  var floor = (lv === 'intro' || lv === 'certified') ? 3 : 0;
  if (floor) {
    var isMc = function (q) { return !q.sa && !!q.opts; };
    var have = out.filter(isMc).length;
    if (have < floor) {
      var spare = mix.slice(want).filter(isMc);
      for (var i = out.length - 1; i >= 0 && have < floor && spare.length; i--) {
        if (isMc(out[i])) continue;
        out[i] = spare.shift();
        have++;
      }
    }
  }
  if (out.length < want) {
    var rest = (typeof shuffle === 'function') ? shuffle(bank.filter(function (q) { return q && out.indexOf(q) < 0; })) : [];
    out = out.concat(rest.slice(0, want - out.length));
  }
  return out;
}
if (typeof v32QuickPool === 'function') {
  v32QuickPool = function () {
    var two = [];
    try { two = (typeof v39QuickTwo === 'function') ? v39QuickTwo() : []; } catch (e) { two = []; }
    var out = v53QuickEight(10 - two.length);
    two.forEach(function (rq) { out.splice(Math.floor(Math.random() * (out.length + 1)), 0, rq); });
    return out.slice(0, 10);
  };
}
if (typeof v32HouseQCount === 'function') {
  v32HouseQCount = function () { return 0; };
}

/* The Library's rows: the full list and the house videos leave (both live in
   the house's rooms); the search names what it finds now. */
if (typeof v32LibraryHtml === 'function') {
  var _v53LibraryHtmlStrip = v32LibraryHtml;
  v32LibraryHtml = function () {
    var html = _v53LibraryHtmlStrip.apply(this, arguments);
    try {
      html = html.replace(/<li><button class="v25row" type="button" data-v32="(?:fullwine|housevideos)"[\s\S]*?<\/li>/g, '');
      html = html.split('Find a producer, a wine, or a bottle on our list').join('Find a grape, a region, a chapter or a lesson');
    } catch (e) { }
    return html;
  };
}

/* The search: the house's wines and the person's own records are found on
   the house's tab; the Compass rows and the restaurant wording leave. */
if (typeof v44Results === 'function') {
  var _v53Results = v44Results;
  v44Results = function () {
    var groups = _v53Results.apply(this, arguments) || [];
    try {
      groups = groups.filter(function (g) { return g && g.key !== 'wines' && g.key !== 'own'; }).map(function (g) {
        if (g.key !== 'learn') return g;
        var rows = (g.rows || []).filter(function (r) { return !(r && r.arg === 'cellarcompass'); });
        return { key: g.key, title: g.title, rows: rows, limit: g.limit };
      }).filter(function (g) { return g.rows && g.rows.length; });
    } catch (e) { }
    return groups;
  };
}
/* codex45 and codex46 mark the search index as extended with two flags on the index object itself (_v45fields,
   _v46), so a walk over its groups (Object.values) met two booleans among the rows; the flags are kept, as values the
   two layers still read and write, but no longer enumerable, so the index holds groups of rows and nothing else. */
if (typeof v44Index === 'function') {
  var _v53Index = v44Index;
  v44Index = function () {
    var ix = _v53Index.apply(this, arguments);
    try {
      if (ix && typeof ix === 'object') Object.keys(ix).forEach(function (k) {
        if (!Array.isArray(ix[k])) Object.defineProperty(ix, k, { value: ix[k], enumerable: false, writable: true, configurable: true });
      });
    } catch (e) { }
    return ix;
  };
}
if (typeof v32SearchResults === 'function') {
  var _v53SearchResults = v32SearchResults;
  v32SearchResults = function () {
    var html = _v53SearchResults.apply(this, arguments);
    try {
      html = String(html || '').split('Searches include the reading guides and developed restaurant cards. The full printed list is a separate reference.')
        .join('Searches include the reading guides, the grapes, the regions, the producers and the chapters.');
    } catch (e) { }
    return html;
  };
}
function v53FixHelp(box, id) {
  try {
    var help = box && typeof box.querySelector === 'function' ? box.querySelector('#' + id + '-help') : null;
    if (help) help.textContent = 'Find teaching guides, grapes, regions, producers and chapters.';
  } catch (e) { }
}
if (typeof v32WireSearch === 'function') {
  var _v53WireSearch = v32WireSearch;
  v32WireSearch = function (box, id) {
    var out = _v53WireSearch.apply(this, arguments);
    v53FixHelp(box, id);
    return out;
  };
}

/* =========== 6. the Library's new shape ===========

   The Practise root keeps its own address and body; the Library carries
   that body as its Practise section, then the bank, the reading rooms and
   the atlas, with jump chips at the top (codex41's v41Jump, no address and
   no history). codex44's search stays where its wiring expects it (#cf-in
   and #cf-in-out kept) and the DOM pass below moves the earlier layers'
   doors into their rooms. */

var V53_JUMPS = [['v53-practise-h', 'Practise'], ['v53-bank-h', 'The question bank'], ['v53-reading-h', 'Reading rooms'], ['v53-atlas-h', 'The atlas']];

/* The Library's line under its head said "Nothing here is graded", true of
   codex32's reading room and untrue once the Practise section and the bank
   stand in it (the phone walk, 31 October 2026); codex32's words, key by key. */
if (typeof V32_WORDS !== 'undefined' && V32_WORDS) {
  V32_WORDS.libLine = 'For {level}: Practise and the question bank, which keep your marks, then the reading rooms and the atlas, which do not.';
  V32_WORDS.libLineAll = 'For every level: Practise and the question bank, which keep your marks, then the reading rooms and the atlas, which do not.';
}

function v53JumpsHtml() {
  return '<nav class="v32chips v53-jumps" aria-label="On this page">' + V53_JUMPS.map(function (j) {
    return '<button type="button" class="v28-chip" data-v53="jump" data-to="' + j[0] + '">' + v53Esc(j[1]) + '</button>';
  }).join('') + '</nav>';
}

/* The Practise root's body, between its scope chip and its closing div,
   drawn under the Library's own scope. */
function v53PractiseBody() {
  var all = v32All();
  var was = all.flashcards;
  all.flashcards = all.library;
  var html = '';
  try {
    html = v32FlashcardsHtml();
    var scope = v32Scope('flashcards');
    var at = html.indexOf(scope);
    var start = at >= 0 ? at + scope.length : html.indexOf('<section class="v32-due"');
    var end = html.lastIndexOf('</div>');
    html = (start >= 0 && end > start) ? html.slice(start, end) : '';
  } catch (e) { html = ''; } finally { all.flashcards = was; }
  return html;
}

function v53LibraryShape(html) {
  var find = html.indexOf('<div class="codexfind">');
  if (find < 0) return html;
  var findEnd = html.indexOf('<div id="cf-out"></div></div>', find);
  if (findEnd < 0) return html;
  findEnd += '<div id="cf-out"></div></div>'.length;
  var head = html.slice(0, find).replace('<div class="v25page v32-root">', '<div class="v25page v32-root v53-library">');
  var search = html.slice(find, findEnd);
  var tail = html.slice(findEnd);
  var close = tail.lastIndexOf('</div>');
  var rows = close >= 0 ? tail.slice(0, close) : tail;
  var atlasRow = '';
  rows = rows.replace(/<li><button class="v25row" type="button" data-go="worldmap"[\s\S]*?<\/li>/, function (m) { atlasRow = m; return ''; });
  var practise = v53PractiseBody();
  var out = head + v53JumpsHtml() + search;
  if (practise) out += '<section class="v32-sec v53-practise" aria-labelledby="v53-practise-h"><h2 class="v32-h2" id="v53-practise-h">Practise</h2>' + practise + '</section>';
  out += '<section class="v32-sec v53-reading" aria-labelledby="v53-reading-h"><h2 class="v32-h2" id="v53-reading-h">The reading rooms</h2>' + rows + '</section>';
  out += '<section class="v32-sec v53-atlas" aria-labelledby="v53-atlas-h"><h2 class="v32-h2" id="v53-atlas-h">The atlas</h2>'
    + '<p class="v32-line">The world map, the countries and the regions are read here; a field map opens from its country.</p>'
    + (atlasRow ? v32Rows(atlasRow) : '') + '</section>';
  return out + '</div>';
}
if (typeof v32LibraryHtml === 'function') {
  var _v53LibraryHtml = v32LibraryHtml;
  v32LibraryHtml = function () {
    var html = _v53LibraryHtml.apply(this, arguments);
    try {
      return v53LibraryShape(html);
    } catch (e) { return html; }
  };
}

/* The DOM pass, last: the culinary door leaves (Wine studies holds it), the
   search sits under the chips, the illustrated, regions, references and
   workshop doors join the reading rooms, the field atlas door the atlas,
   the bank row leads the bank section's place, and a chip whose heading is
   absent is hidden. */
function v53LibraryDom(box) {
  if (!box || typeof box.querySelector !== 'function') return;
  var root = box.querySelector('.v53-library') || box;
  var cul = box.querySelector('.v37-library-door');
  if (cul && cul.parentNode) cul.parentNode.removeChild(cul);
  var jumps = root.querySelector('.v53-jumps');
  var search = box.querySelector('.codexfind');
  if (jumps && search && jumps.parentNode) jumps.parentNode.insertBefore(search, jumps.nextSibling);
  var reading = root.querySelector('.v53-reading');
  if (reading) {
    ['.v36-library-door', '.v39-door-regions', '.v39-door-ref', '.v46-intro'].forEach(function (sel) {
      Array.prototype.forEach.call(box.querySelectorAll(sel), function (n) { if (n !== reading && !reading.contains(n)) reading.appendChild(n); });
    });
  }
  var atlas = root.querySelector('.v53-atlas');
  if (atlas) {
    Array.prototype.forEach.call(box.querySelectorAll('.v45-door'), function (n) { if (!atlas.contains(n)) atlas.appendChild(n); });
  }
  /* the bank's own heading, for the chip */
  var bankRow = root.querySelector('.v53-practise .v53-bankgroup');
  if (bankRow && !bankRow.querySelector('#v53-bank-h')) {
    var h = document.createElement('h3');
    h.className = 'secgroup v32-gh'; h.id = 'v53-bank-h'; h.setAttribute('tabindex', '-1'); h.textContent = 'The question bank';
    bankRow.insertBefore(h, bankRow.firstChild);
  }
  Array.prototype.forEach.call(root.querySelectorAll('.v53-jumps [data-to]'), function (b) {
    var t = b.getAttribute('data-to');
    var hit = t ? box.querySelector('#' + t) : null;
    if (!hit) b.hidden = true;
    else if (!hit.hasAttribute('tabindex')) hit.setAttribute('tabindex', '-1');
  });
  v53FixHelp(box, 'cf-in');
}
if (typeof v32LibraryView === 'function') {
  var _v53LibraryView = v32LibraryView;
  v32LibraryView = function () {
    var view = _v53LibraryView.apply(this, arguments);
    try { v53LibraryDom(view); } catch (e) { }
    return view;
  };
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.library = v32LibraryView;
}

/* =========== 7. the bank view =========== */

function v53BankCats(lv) {
  var by = {};
  try { (LEVELS[lv].bank || []).forEach(function (q) { if (q && q.cat) by[q.cat] = (by[q.cat] || 0) + 1; }); } catch (e) { }
  return by;
}
function v53BankHtml() {
  var all = v32All().library;
  var L = v53Lv();
  var lv = L.key;
  var n = 0;
  try { n = (LEVELS[lv].bank || []).length; } catch (e) { n = 0; }
  var m = Object.keys(v53BankCats(lv)).length;
  var html = '<div class="v25page v32-root v53-bank">' + v32Head('The ' + L.name + ' question bank', v53Num(n) + ' questions in ' + m + ' categories') + v32Scope('library');
  var lead = '<li><button class="v25row" type="button" data-v32="lvgo" data-lv="' + v53Esc(lv) + '" data-k="endless" id="v53-whole">'
    + '<span class="v25row-name">Whole bank</span><span class="v25row-line">' + v53Esc(v53Num(n) + ' questions, untimed, reshuffled forever') + '</span></button></li>'
    + v53MockRow(lv) + v32TestRow(lv, false);
  html += '<section class="v32-group" aria-labelledby="v53-bank-lead"><h3 class="secgroup v32-gh" id="v53-bank-lead">' + v53Esc(L.name) + '</h3>' + v32Rows(lead) + '</section>';
  var doms = [];
  try { doms = examDomains(); } catch (e) { doms = []; }
  var tally = {};
  try { tally = v25CatTally(lv); } catch (e) { tally = {}; }
  doms.forEach(function (d, i) {
    var total = 0;
    d[1].forEach(function (c) { total += (tally[c] || { total: 0 }).total; });
    var rows = '<li class="v32dom"><button class="v25row" type="button" data-v32="lvgo" data-lv="' + v53Esc(lv) + '" data-k="domexam" data-arg="' + v53Esc(d[0]) + '">'
      + '<span class="v25row-name">' + v53Esc('Domain exam: ' + d[0]) + '</span>'
      + '<span class="v25row-line">' + v53Esc('25 questions from the ' + (d[1].length === 1 ? 'section' : d[1].length + ' sections') + ', ' + v53Num(total) + ' in all') + '</span></button></li>';
    d[1].forEach(function (c) {
      var t = tally[c] || { met: 0, total: 0 };
      rows += '<li class="v53-cat"><div class="v53-catrow"><span class="v25row-name">' + v53Esc(c) + '</span>'
        + '<span class="v25row-line">' + v53Esc(v53Num(t.total) + (t.total === 1 ? ' question' : ' questions') + ' · ' + v53Num(t.met) + ' met') + '</span></div>'
        + '<span class="sec-trains v53-trains">' + v25Train('drill', c, 'Drill', 'Drill ' + c) + v25Train('secexam', c, 'Exam', 'Exam, ' + c) + '</span></li>';
    });
    html += '<section class="v32-group v53-domain" aria-labelledby="v53-dom-' + i + '"><h3 class="secgroup v32-gh" id="v53-dom-' + i + '">' + v53Esc(d[0]) + '</h3>' + v32Rows(rows) + '</section>';
  });
  if (all && typeof v32Levels === 'function') {
    v32Levels().forEach(function (x) {
      if (x.key === lv) return;
      var xn = 0;
      try { xn = (LEVELS[x.key].bank || []).length; } catch (e) { xn = 0; }
      var moves = (typeof v32W === 'function') ? v32W('movesYou', { level: x.name }) : '';
      var rows = '<li><button class="v25row" type="button" data-v32="lvgo" data-lv="' + v53Esc(x.key) + '" data-k="endless">'
        + '<span class="v25row-name">' + v53Esc('Whole bank at ' + x.name) + '</span><span class="v25row-line">' + v53Esc(v53Num(xn) + ' questions. ' + moves) + '</span></button></li>'
        + v53MockRow(x.key).replace('</span></button>', ' ' + v53Esc(moves) + '</span></button>') + v32TestRow(x.key, true);
      html += '<section class="v32-group" aria-labelledby="v53-bank-' + v53Esc(x.key) + '"><h3 class="secgroup v32-gh" id="v53-bank-' + v53Esc(x.key) + '">' + v53Esc(x.name) + '</h3>' + v32Rows(rows) + '</section>';
    });
  }
  return html + '</div>';
}
function v53BankView() { return v32Build(v53BankHtml(), function (box) { if (typeof v32WireDetails === 'function') v32WireDetails(box); }); }

/* =========== 8. Home: the level cards' counts and the one row to the house =========== */

function v53LevelKeyByN(n) {
  try {
    if (typeof V25_LEVELS !== 'undefined' && V25_LEVELS && V25_LEVELS[n - 1]) return V25_LEVELS[n - 1].key;
  } catch (e) { }
  try { if (typeof LEVEL_ORDER !== 'undefined' && LEVEL_ORDER) return LEVEL_ORDER[n - 1] || null; } catch (e) { }
  return null;
}
function v53BankLine(key) {
  var n = 0;
  try { n = (LEVELS[key].bank || []).length; } catch (e) { n = 0; }
  var m = Object.keys(v53BankCats(key)).length;
  return v53Num(n) + ' questions · ' + m + ' categories';
}
if (typeof v25HomeHtml === 'function') {
  var _v53HomeHtml = v25HomeHtml;
  v25HomeHtml = function () {
    var html = _v53HomeHtml.apply(this, arguments);
    try {
      html = html.replace(/(<button class="level[^>]*data-level="(\d)"[^>]*>)([\s\S]*?)(<\/button>)/g, function (m, open, n, body, close) {
        var key = v53LevelKeyByN(Number(n));
        if (!key || body.indexOf('class="lv-bank"') >= 0) return m;
        return open + body + '<span class="lv-bank">' + v53Esc(v53BankLine(key)) + '</span>' + close;
      });
      var sec = html.indexOf('<section class="levels"');
      var end = sec >= 0 ? html.indexOf('</section>', sec) : -1;
      if (end >= 0 && html.indexOf('v53-home-row') < 0) {
        end += '</section>'.length;
        var word = (typeof v41TabWord === 'function') ? v41TabWord() : 'Brennan’s';
        var row = '<ul class="v25rows v32rows v53-home-row">' + v32GoRow('brennans', word, 'The wine list, the studies, the rehearsal and the house') + '</ul>';
        html = html.slice(0, end) + row + html.slice(end);
      }
    } catch (e) { }
    return html;
  };
}

/* =========== 9. the CMS views ===========

   The Court's four documents as the study spine (design section E). Every
   view reads js/data-cms.js as built and takes any count of subjects: the
   root (cms), the exam day (cmsday), the tasting list (cmstasting), the
   grid (cmsgrid), one subject (cmssubject/{id}) on codex39's article
   pattern, and Readiness (cmsready). The Court's words are drawn as they
   are quoted, escaped; a cell the guide leaves blank reads as its own
   words, not essential at this level.

   THE QUESTIONS: a subject's CMS questions are its own list in the build
   (subjects[].questions), with any top level CMS.questions naming it, each
   with an id of e- and eight base36 digits. One is dealt as a copy carrying
   the subject's name as its section (the quiz and the results print it),
   so the data object is never touched; the id stays the key.

   THE DRILL (v53StartDrill): the ACTIVE level's questions in the subject's
   mapped categories (codex7's qKey prefixes by the active level, so another
   level's would be stored under the wrong key; Premier Cru and Grand Cru
   read the Village taxonomy, which their banks share) and the subject's
   CMS questions, or the CMS questions alone, through the core engine as
   codex39 deals the regions'. An e- key is never level progress
   (keyOwned), never scheduled (srsRecord) and never an orphan (qidAudit);
   codex8's ledger finds it (findByKey) and tags it CMS, and a section name
   that is a subject's and no bank category's (codex19's report hands one
   to startDrill) deals that subject's CMS questions.

   THE DECK cms:{id}: one card per row the guide fills in its Certified
   column, the topic on the front and the cell on the back, numbered by the
   row's place before any blank is skipped, graded in codex39's region card
   slot as codex46's technique cards are. Its deck screen climbs to the
   subject and lights CMS.

   READINESS (v53Readiness): answered right at least once, over the
   subject's mapped questions at Régionale ('intro|' keys) and Village
   (bare keys) and its CMS questions read under every key form. The
   tasting's figure reads the Court's grid record when the grape part
   keeps one (oot-codex-courtgrid-v1, by grape slug). */

var V53_CMS_BLANK = 'not essential at this level';
var V53_COURT_SLOT = 'oot-codex-courtgrid-v1';
var V53_CMS_ID = /^e-[a-z0-9]{8}$/;
var V53_QCOPY = { src: null, byId: {} };
var V53_CATIX = { banks: [], idx: [] };

function v53cStr(s) { return typeof s === 'string' ? s.trim() : (typeof s === 'number' ? String(s) : ''); }
function v53cList(x) { return Array.isArray(x) ? x : []; }
function v53cObj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
function v53cFold(s) {
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD'); } catch (e) { }
  return t.replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
function v53cSlug(s) { return v53cFold(s).replace(/ /g, '-'); }
function v53cPlural(n, one, many) { return v53Num(n) + ' ' + (Number(n) === 1 ? one : many); }
function v53cWords(n) { return (typeof v25Words === 'function') ? v25Words(n) : String(n); }
function v53cCap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function v53cLvName(key) {
  try { var L = (typeof v32LvByKey === 'function') ? v32LvByKey(key) : null; if (L && L.name) return L.name; } catch (e) { }
  return { intro: 'Régionale', certified: 'Village', advanced: 'Premier Cru', master: 'Grand Cru' }[key] || String(key || '');
}
function v53cLevel() { return (typeof activeLevel !== 'undefined' && activeLevel) ? activeLevel : 'certified'; }
function v53cHasLevel(lv) { try { return typeof LEVELS !== 'undefined' && !!LEVELS[lv]; } catch (e) { return false; } }
function v53cKey(q) { return (typeof missKey === 'function') ? missKey(q) : String(q && (q.id || q.q) || ''); }

/* The subject groups in the build's order, each holding its subjects. */
function v53CmsGroups() {
  var c = v53Cms();
  var out = [], at = {};
  v53cList(c && c.groups).forEach(function (g) {
    var k = v53cStr(g && g.key);
    if (!k || at.hasOwnProperty(k)) return;
    at[k] = out.length;
    out.push({ key: k, name: v53cStr(g.name) || k, subjects: [] });
  });
  v53Subjects().forEach(function (s) {
    if (!s || !v53cStr(s.id)) return;
    var k = v53cStr(s.group) || 'other';
    if (!at.hasOwnProperty(k)) { at[k] = out.length; out.push({ key: k, name: k === 'other' ? 'Other subjects' : k, subjects: [] }); }
    out[at[k]].subjects.push(s);
  });
  return out.filter(function (g) { return g.subjects.length; });
}
function v53CmsGroupName(key) {
  var hit = '';
  v53CmsGroups().some(function (g) { if (g.key === key) { hit = g.name; return true; } return false; });
  return hit;
}
function v53SubjectList() { return v53Subjects().filter(function (s) { return s && v53cStr(s.id); }); }

/* =========== the questions =========== */

function v53IsCmsId(id) { return typeof id === 'string' && V53_CMS_ID.test(id); }
function v53BareKey(k) {
  var s = String(k == null ? '' : k);
  var i = s.indexOf('|');
  return i >= 0 ? s.slice(i + 1) : s;
}
function v53IsCmsKey(k) { return typeof k === 'string' && v53IsCmsId(v53BareKey(k)); }
function v53CmsValid(q) {
  if (!q || typeof q !== 'object' || !v53IsCmsId(q.id) || !v53cStr(q.q)) return false;
  if (q.sa) return !!v53cStr(q.ans);
  return Array.isArray(q.opts) && q.opts.length >= 2 && typeof q.a === 'number' && q.a >= 0 && q.a < q.opts.length;
}
/* A subject's CMS questions as built, each once. */
function v53CmsRaw(s) {
  var out = [], seen = {};
  var add = function (q) { if (v53CmsValid(q) && !seen[q.id]) { seen[q.id] = 1; out.push(q); } };
  if (!s) return out;
  v53cList(s.questions).forEach(add);
  var c = v53Cms();
  v53cList(c && c.questions).forEach(function (q) { if (q && q.subject === s.id) add(q); });
  return out;
}
/* The copy a CMS question is dealt as: the subject's name its section, an
   accept list always present for the core grader; made once per id. */
function v53CmsCopy(q, s) {
  var c = v53Cms();
  if (V53_QCOPY.src !== c) V53_QCOPY = { src: c, byId: {} };
  if (V53_QCOPY.byId.hasOwnProperty(q.id)) return V53_QCOPY.byId[q.id];
  var o = {};
  Object.keys(q).forEach(function (k) { o[k] = q[k]; });
  if (!v53cStr(o.cat)) o.cat = s ? (v53cStr(s.name) || 'CMS') : 'CMS';
  if (o.sa && !Array.isArray(o.accept)) o.accept = [];
  if (typeof o.exp !== 'string') o.exp = '';
  V53_QCOPY.byId[q.id] = o;
  return o;
}
function v53CmsQuestions(id) {
  var s = v53Subject(id);
  return s ? v53CmsRaw(s).map(function (q) { return v53CmsCopy(q, s); }) : [];
}
function v53CmsAll() {
  var out = [];
  v53SubjectList().forEach(function (s) { out = out.concat(v53CmsQuestions(s.id)); });
  return out;
}
function v53CmsById(id) {
  var hit = null;
  v53SubjectList().some(function (s) {
    var raw = v53CmsRaw(s);
    for (var i = 0; i < raw.length; i++) if (raw[i].id === id) { hit = v53CmsCopy(raw[i], s); return true; }
    return false;
  });
  return hit;
}

/* A level's bank by category, built once per bank. */
function v53CatIndex(lv) {
  var bank = null;
  try { bank = LEVELS[lv].bank; } catch (e) { bank = null; }
  if (!Array.isArray(bank)) return {};
  var at = V53_CATIX.banks.indexOf(bank);
  if (at >= 0) return V53_CATIX.idx[at];
  var by = {};
  bank.forEach(function (q) { if (q && q.cat) (by[q.cat] = by[q.cat] || []).push(q); });
  V53_CATIX.banks.push(bank);
  V53_CATIX.idx.push(by);
  return by;
}
/* The subject's mapped categories at a level: Régionale's own taxonomy, the
   Village one for every level above (their banks share it). */
function v53MapCats(s, lv) {
  var cats = v53cObj(v53cObj(s && s.map).cats);
  return v53cList(lv === 'intro' ? cats.intro : cats.certified).map(v53cStr).filter(Boolean);
}
function v53LevelQuestions(id, lv) {
  var s = v53Subject(id);
  if (!s) return [];
  lv = lv || v53cLevel();
  if (!v53cHasLevel(lv)) return [];
  var by = v53CatIndex(lv), out = [], seen = {};
  v53MapCats(s, lv).forEach(function (cat) {
    v53cList(by[cat]).forEach(function (q) { var k = v53cKey(q); if (!seen[k]) { seen[k] = 1; out.push(q); } });
  });
  return out;
}
/* The drill's pool: the active level's mapped questions and the subject's
   CMS questions, or the CMS questions alone ('cms'). */
function v53Questions(id, scope) {
  if (scope === 'cms') return v53CmsQuestions(id);
  return v53LevelQuestions(id, v53cLevel()).concat(v53CmsQuestions(id));
}

/* =========== the drill =========== */

function v53Shuffle(a) {
  if (typeof shuffle === 'function') return shuffle(a.slice());
  var out = a.slice();
  for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
  return out;
}
function v53StartDrill(id, scope) {
  var sid = v53cStr(id) || 'all';
  var sc = scope === 'cms' ? 'cms' : 'both';
  var s = sid === 'all' ? null : v53Subject(sid);
  if (sid !== 'all' && !s) { if (typeof toast === 'function') toast('That subject is not in the Court’s guide.'); return false; }
  var qs = s ? v53Shuffle(v53Questions(sid, sc)) : v53Shuffle(v53CmsAll()).slice(0, 10);
  if (!qs.length) { if (typeof toast === 'function') toast('No questions are written to this subject yet.'); return false; }
  if (typeof stopTimer === 'function') stopTimer();
  S._fin = null; S._v25lt = null;
  S.mode = 'drill';
  S.section = 'CMS: ' + (s ? v53cStr(s.name) : 'every subject');
  S._v53drill = sid;
  S._again = function () { v53StartDrill(sid, sc); };
  S.pool = qs; S.idx = 0; S.correct = 0; S.results = [];
  if (typeof resetQ === 'function') resetQ();
  S.view = 'quiz';
  try { if (typeof V32 !== 'undefined' && V32 && !(typeof V32_RUN !== 'undefined' && V32_RUN && V32_RUN[V32.view])) V32.pend = 'push'; } catch (e) { }
  render();
  return true;
}

/* =========== readiness =========== */

function v53Got(key) {
  try {
    var r = (typeof ST !== 'undefined' && ST && ST.q) ? ST.q[key] : null;
    return !!(r && Number(r.c) >= 1);
  } catch (e) { return false; }
}
function v53KeyForms(id) {
  var out = [id];
  try { Object.keys(LEVELS).forEach(function (lv) { if (lv !== 'certified') out.push(lv + '|' + id); }); } catch (e) { }
  return out;
}
function v53Readiness(id) {
  var part = function () { return { met: 0, total: 0 }; };
  var out = { intro: part(), village: part(), cms: part(), met: 0, total: 0, share: 0, word: 'Nothing to count yet' };
  var s = v53Subject(id);
  if (!s) return out;
  [['intro', 'intro', 'intro|'], ['certified', 'village', '']].forEach(function (p) {
    var t = out[p[1]];
    v53LevelQuestions(s.id, p[0]).forEach(function (q) { t.total++; if (v53Got(p[2] + v53cKey(q))) t.met++; });
  });
  v53CmsRaw(s).forEach(function (q) {
    out.cms.total++;
    if (v53KeyForms(q.id).some(v53Got)) out.cms.met++;
  });
  out.met = out.intro.met + out.village.met + out.cms.met;
  out.total = out.intro.total + out.village.total + out.cms.total;
  out.share = out.total ? out.met / out.total : 0;
  if (out.total) out.word = (typeof v25MetWord === 'function') ? v25MetWord(out.met, out.total) : (out.met + ' of ' + out.total);
  return out;
}

/* The tasting list's grapes, and the slug each answers to on the grape pages. */
function v53TastingList() {
  var t = v53cObj(v53Cms() && v53Cms().tasting);
  var row = function (colour) { return function (g) { return g && v53cStr(g.name) ? { name: v53cStr(g.name), colour: colour, regions: v53cList(g.regions) } : null; }; };
  return v53cList(t.whites).map(row('white')).concat(v53cList(t.reds).map(row('red'))).filter(Boolean);
}
function v53GrapeSlugFor(name) {
  try { if (typeof v53GrapeSlug === 'function') { var a = v53GrapeSlug(name); if (typeof a === 'string' && a) return a; } } catch (e) { }
  try { if (typeof v53GrapeKey === 'function') { var b = v53GrapeKey(name); if (typeof b === 'string' && b) return b; } } catch (e) { }
  var f = v53cFold(String(name || '').replace(/\([^)]*\)/g, ' ').split(' / ')[0]);
  try { if (typeof GRID_ALIASES !== 'undefined' && GRID_ALIASES && typeof GRID_ALIASES[f] === 'string' && GRID_ALIASES[f]) return GRID_ALIASES[f]; } catch (e) { }
  return f.replace(/ /g, '-');
}
function v53CourtRec() {
  try { if (typeof v53CourtGridRec === 'function') { var r = v53CourtGridRec(); if (r && typeof r === 'object' && !Array.isArray(r)) return r; } } catch (e) { }
  var key = V53_COURT_SLOT;
  try { if (typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function') key = OOT.profiles.key(V53_COURT_SLOT); } catch (e) { }
  try {
    var s = (typeof localStorage !== 'undefined' && localStorage) ? localStorage.getItem(key) : null;
    var o = s ? JSON.parse(s) : null;
    return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
  } catch (e) { return {}; }
}
function v53TastingReady() {
  var rec = v53CourtRec();
  var list = v53TastingList();
  var named = 0, tried = 0;
  list.forEach(function (g) {
    var r = rec[v53GrapeSlugFor(g.name)];
    if (r && Number(r.n) >= 1) tried++;
    if (r && Number(r.c) >= 1) named++;
  });
  return { met: named, tried: tried, total: list.length };
}

/* =========== the pieces =========== */

function v53Details(id, title, body, open) {
  if (!body) return '';
  return '<details class="v28-q v39-sec" id="' + v53Esc(id) + '" data-chip="' + v53Esc(id) + '"' + (open ? ' open' : '') + '><summary>' + v53Esc(title) + '</summary><div class="v39-body">' + body + '</div></details>';
}
function v53Chips(secs) {
  if (secs.length < 2) return '';
  return '<nav class="v39-steps v53-steps" aria-label="Sections">' + secs.map(function (s) {
    return '<button type="button" class="v28-chip" data-v39="chip" data-sec="' + v53Esc(s.id) + '">' + v53Esc(s.title) + '</button>';
  }).join('') + '</nav>';
}
function v53Sections(secs) {
  var list = secs.filter(function (s) { return s && s.body; });
  if (!list.length) return '';
  return v53Chips(list) + '<div class="card primerpage chapterbody v39-sections v53-sections">' + list.map(function (s) { return v53Details(s.id, s.title, s.body, !!s.open); }).join('') + '</div>';
}
function v53Lines(list) {
  var rows = v53cList(list).map(v53cStr).filter(Boolean);
  return rows.length ? '<ul class="v39-lines">' + rows.map(function (l) { return '<li>' + v53Esc(l) + '</li>'; }).join('') + '</ul>' : '';
}
function v53Pairs(rows) {
  var list = rows.filter(function (p) { return p && v53cStr(p[0]) && v53cStr(p[1]); });
  return list.length ? '<dl class="v39-pairs">' + list.map(function (p) { return '<dt>' + v53Esc(p[0]) + '</dt><dd>' + v53Esc(p[1]) + '</dd>'; }).join('') + '</dl>' : '';
}
function v53Para(s) { var t = v53cStr(s); return t ? '<p>' + v53Esc(t) + '</p>' : ''; }
/* A door inside a parchment section: codex39's list button, wired by data-go. */
function v53Door(go, arg, label, note) {
  return '<li><button type="button" class="btn small ghost" data-go="' + v53Esc(go) + '"' + (arg != null && arg !== '' ? ' data-arg="' + v53Esc(arg) + '"' : '') + '>' + v53Esc(label) + '</button>'
    + (note ? '<span class="v53-note">' + v53Esc(note) + '</span>' : '') + '</li>';
}
function v53Act(cls, act, attrs, label) {
  return '<button type="button" class="' + cls + '" data-v53="' + act + '"' + (attrs || '') + '>' + v53Esc(label) + '</button>';
}
function v53GoBtn(cls, go, arg, label, id) {
  return '<button type="button" class="' + cls + '" data-go="' + v53Esc(go) + '"' + (arg != null && arg !== '' ? ' data-arg="' + v53Esc(arg) + '"' : '') + (id ? ' id="' + v53Esc(id) + '"' : '') + '>' + v53Esc(label) + '</button>';
}
function v53CmsBuild(html) {
  return v32Build(html, function (box) {
    if (typeof v39Wire === 'function') v39Wire(box);
    if (typeof v32WireDetails === 'function') v32WireDetails(box);
  });
}
function v53NoData(title) {
  return '<div class="v25page v32-root v53 v53-cms">' + v32Head(title, '') + '<p class="v32-line">The Court’s documents are not on this device yet.</p></div>';
}

/* =========== the CMS root =========== */

function v53PassLine() {
  var y = v53cObj(v53Cms() && v53Cms().syllabus);
  var m = /(\d+)\s*percent/i.exec(v53cList(y.passing).join(' '));
  var n = v53cList(y.sections).length;
  var parts = ['One day'];
  if (n) parts.push(v53cWords(n) + ' sections');
  if (m) parts.push(m[1] + ' per cent in each, passed at one sitting');
  return parts.join(', ');
}
function v53SubjectLine(s, r) {
  var rows = v53cList(s.rows).length;
  var n = v53Questions(s.id).length;
  r = r || v53Readiness(s.id);
  var bits = [v53cPlural(rows, 'row', 'rows'), v53cPlural(n, 'question', 'questions') + ' at ' + v53Lv().name, r.word];
  if (s.certifiedOnly) bits.push('Certified only');
  return bits.join(' · ');
}
function v53AllReady() {
  var met = 0, total = 0;
  v53SubjectList().forEach(function (s) { var r = v53Readiness(s.id); met += r.met; total += r.total; });
  return { met: met, total: total };
}
function v53CmsRootHtml() {
  var c = v53Cms();
  var subjects = v53SubjectList();
  if (!c || !subjects.length) return v53NoData('CMS');
  var html = '<div class="v25page v32-root v53 v53-cms">' + v32Head('CMS', 'The Certified Sommelier Examination, as the Court sets it');
  if (typeof V25_NONAFFIL === 'string' && V25_NONAFFIL) html += '<p class="v32-line v53-nonaffil">' + v53Esc(V25_NONAFFIL) + '</p>';
  var exam = '';
  if (v53cObj(c.syllabus).schedule) exam += v32GoRow('cmsday', 'The exam day', v53PassLine());
  var t = v53TastingList();
  if (t.length) {
    var w = t.filter(function (g) { return g.colour === 'white'; }).length;
    exam += v32GoRow('cmstasting', 'The Certified tasting list', v53cPlural(w, 'white', 'whites') + ' and ' + v53cPlural(t.length - w, 'red', 'reds') + ', with the regions the Court examines');
  }
  var g = v53cObj(c.grid);
  if (g.white || g.red) exam += v32GoRow('cmsgrid', 'The deductive grid', 'The white and the red grid, line by line');
  var all = v53AllReady();
  exam += v32GoRow('cmsready', 'Readiness', all.total ? v53Num(all.met) + ' of ' + v53Num(all.total) + ' answered right at least once, subject by subject' : 'Subject by subject, as the questions are answered');
  var allQ = v53CmsAll().length;
  if (allQ) exam += v32GoRow('cmsdrill', 'Drill the CMS questions', v53cPlural(allQ, 'question', 'questions') + ' written to the Court’s rows, ten at a time', 'all');
  html += v32Group('The examination', exam, 'v53-cms-exam');
  html += '<p class="v32-line v53-cms-guide">The ' + v53Esc(v53cWords(subjects.length)) + ' subjects of the Court’s curriculum guide, in its order. Each opens with the Court’s rows, then the Codex’s chapters, regions, grapes and questions for it.</p>';
  v53CmsGroups().forEach(function (gr) {
    var rows = gr.subjects.map(function (s) { return v32GoRow('cmssubject', v53cStr(s.name) || s.id, v53SubjectLine(s), s.id); }).join('');
    html += v32Group(gr.name, rows, 'v53-cms-g-' + v53cSlug(gr.key));
  });
  return html + '</div>';
}

/* =========== the exam day =========== */

function v53CmsDayHtml() {
  var c = v53Cms();
  var y = v53cObj(c && c.syllabus);
  if (!c || !y.schedule) return v53NoData('The exam day');
  var src = v53cStr(y.source);
  var html = '<div class="v25page v53 v53-cmsday">' + v32Head('The exam day', 'The Certified Sommelier Examination, as the Court’s syllabus sets it' + (src ? ' (' + src + ')' : ''));
  if (v53cStr(y.description)) html += '<p class="v39-lead">' + v53Esc(y.description) + '</p>';
  var secs = [];
  var day = v53Pairs(v53cList(y.schedule).map(function (r) { return [v53cStr(r && r.at), v53cStr(r && r.what)]; }));
  if (day) secs.push({ id: 'v53-day-schedule', title: 'The day', body: day, open: true });
  var sections = v53cList(y.sections).map(function (x) { return v53cStr(x && x.name); }).filter(Boolean);
  var pass = v53Lines(sections) + v53Lines(y.passing);
  if (pass) secs.push({ id: 'v53-day-sections', title: sections.length ? 'The ' + v53cWords(sections.length) + ' sections' : 'The sections', body: pass });
  var before = v53Lines(y.prerequisites) + v53Para(y.who);
  if (before) secs.push({ id: 'v53-day-before', title: 'Before you sit', body: before });
  var skills = v53Lines(y.skills);
  if (skills) secs.push({ id: 'v53-day-skills', title: 'What the Court expects', body: skills });
  var roles = v53cObj(y.roles);
  var who = v53Pairs([['In a restaurant', roles.restaurant], ['Beyond the restaurant', roles.other]]);
  if (who) secs.push({ id: 'v53-day-roles', title: 'The roles it suits', body: who });
  var rules = v53cObj(y.rules);
  var room = v53Para(y.punctuality) + v53Para(rules.devices) + v53Para(rules.food) + v53Para(rules.cheating);
  if (room) secs.push({ id: 'v53-day-rules', title: 'The rules of the room', body: room });
  var after = v53Para(y.feedback) + v53Para(y.retake);
  if (after) secs.push({ id: 'v53-day-after', title: 'Results and a retake', body: after });
  var mock = null;
  try { mock = LEVELS.certified.mock; } catch (e) { mock = null; }
  var note = '<p>The syllabus gives the tasting the 8:15 to 8:45 slot, 30 minutes; the Court’s exam guide has named 45 minutes for four wines. The Village tasting on the Court’s grid, under Grapes, keeps the syllabus’s 30 minutes.</p>'
    + '<p>The theory paper sits in the 8:50 to 9:25 slot, 35 minutes.'
    + (mock && mock.n && mock.secs ? ' The Codex’s Village mock deals ' + v53Esc(mock.n) + ' questions in ' + v53Esc(Math.round(mock.secs / 60)) + ' minutes, as the level’s note gives them.' : '') + '</p>';
  secs.push({ id: 'v53-day-codex', title: 'The Codex beside the syllabus', body: note });
  html += v53Sections(secs);
  html += '<div class="v28-btnrow v39-acts v53-acts">' + v53GoBtn('btn gold', 'cmsready', '', 'Readiness', 'v53-day-ready')
    + v53GoBtn('btn ghost', 'cmstasting', '', 'The tasting list', 'v53-day-tasting') + v53GoBtn('btn ghost', 'cmsgrid', '', 'The deductive grid', 'v53-day-grid') + '</div>';
  return html + '</div>';
}

/* =========== the tasting list =========== */

function v53RegionLine(r) {
  var country = v53cStr(r && r.country);
  var places = v53cList(r && r.places).map(v53cStr).filter(Boolean).join(', ');
  var notes = v53cList(r && r.notes).map(v53cStr).filter(Boolean).join('; ');
  var line = (country && places) ? country + ': ' + places : (places || country);
  if (notes) line += (line ? '. ' : '') + notes;
  return line;
}
function v53TastingRow(g) {
  var lines = v53cList(g.regions).map(v53RegionLine).filter(Boolean);
  return '<li><button class="v25row" type="button" data-go="grape" data-arg="' + v53Esc(v53GrapeSlugFor(g.name)) + '">'
    + '<span class="v25row-name">' + v53Esc(g.name) + '</span>'
    + lines.map(function (l) { return '<span class="v25row-line">' + v53Esc(l) + '</span>'; }).join('') + '</button></li>';
}
function v53CmsTastingHtml() {
  var c = v53Cms();
  var list = v53TastingList();
  if (!c || !list.length) return v53NoData('The Certified tasting list');
  var t = v53cObj(c.tasting);
  var src = v53cStr(t.source);
  var whites = list.filter(function (g) { return g.colour === 'white'; });
  var reds = list.filter(function (g) { return g.colour === 'red'; });
  var html = '<div class="v25page v32-root v53 v53-cmstasting">' + v32Head('The Certified tasting list', 'The grapes and regions of the tasting examination, as the Court lists them' + (src ? ' (' + src + ')' : ''));
  html += '<p class="v39-lead">' + v53Esc(v53cPlural(whites.length, 'white', 'whites') + ' and ' + v53cPlural(reds.length, 'red', 'reds') + ', each with the regions the Court examines and its notes as printed. Each opens its grape.') + '</p>';
  if (whites.length) html += v32Group('The whites', whites.map(v53TastingRow).join(''), 'v53-tasting-whites');
  if (reds.length) html += v32Group('The reds', reds.map(v53TastingRow).join(''), 'v53-tasting-reds');
  html += v32Group('On the grid', v32GoRow('cmsgrid', 'The deductive grid', 'The lines every glass is answered on')
    + v32GoRow('courttasting', 'The Village tasting', 'Four wines, two white and two red, on the Court’s grid, 30 minutes'), 'v53-tasting-grid');
  return html + '</div>';
}

/* =========== the grid =========== */

function v53Opts(list) { return v53cList(list).map(v53cStr).filter(Boolean).join(' · '); }
function v53GridHtml(g) {
  g = v53cObj(g);
  var html = '';
  var col = v53cObj(g.colour);
  if (v53cStr(col.label)) html += '<h4>Sight</h4>' + v53Pairs([[col.label, v53Opts(col.options)]]);
  var fruit = v53cList(g.fruit).filter(function (f) { return f && v53cStr(f.label); });
  if (fruit.length) html += '<h4>Fruit</h4><dl class="v39-pairs">' + fruit.map(function (f) { return '<dt>' + v53Esc(f.label) + '</dt><dd>' + (v53cStr(f.note) ? v53Esc(f.note) : 'Yes or No') + '</dd>'; }).join('') + '</dl>';
  var cond = v53cObj(g.condition);
  var condRows = v53Pairs([['Choices', v53Opts(cond.options)], ['Nose', cond.nose], ['Palate', cond.palate]]);
  if (condRows) html += '<h4>Fruit condition</h4>' + condRows;
  var non = v53cList(g.nonFruit).map(function (n) { return v53cStr(n && n.label); }).filter(Boolean);
  if (non.length) html += '<h4>Non fruit</h4>' + v53Lines(non) + v53Para(g.nonFruitNote);
  var st = v53cList(g.structure).filter(function (x) { return x && v53cStr(x.label); });
  if (st.length) html += '<h4>Structure</h4>' + v53Pairs(st.map(function (x) { return [x.label, v53Opts(x.options)]; }));
  var con = v53cObj(g.conclusion);
  var gr = v53cObj(con.grape), cl = v53cObj(con.climate), co = v53cObj(con.country), ag = v53cObj(con.age);
  var conRows = v53Pairs([
    [gr.label, [v53cStr(gr.note), gr.choices ? v53cCap(v53cWords(gr.choices)) + ' to choose from' : '', v53cStr(gr.explain)].filter(Boolean).join('. ')],
    [cl.label, [v53Opts(cl.options), v53cStr(cl.explain)].filter(Boolean).join('. ')],
    [co.label, 'A written answer'],
    [ag.label, v53Opts(ag.options)]
  ]);
  if (conRows) html += '<h4>Conclusion</h4>' + conRows;
  if (v53cStr(g.sell)) html += '<h4>The sale</h4>' + v53Para(g.sell);
  return html;
}
function v53CmsGridHtml() {
  var c = v53Cms();
  var g = v53cObj(c && c.grid);
  if (!c || !(g.white || g.red)) return v53NoData('The deductive grid');
  var src = v53cStr(g.source);
  var html = '<div class="v25page v53 v53-cmsgrid">' + v32Head('The deductive grid', 'The white and the red grid, as the Court prints them' + (src ? ' (' + src + ')' : ''));
  if (v53cStr(g.instructions)) html += '<p class="v39-lead">' + v53Esc(g.instructions) + '</p>';
  html += v53Sections([
    { id: 'v53-grid-white', title: 'The white grid', body: g.white ? v53GridHtml(g.white) : '', open: true },
    { id: 'v53-grid-red', title: 'The red grid', body: g.red ? v53GridHtml(g.red) : '' }
  ]);
  html += '<div class="v28-btnrow v39-acts v53-acts">' + v53GoBtn('btn gold', 'griddrill', '', 'Drill the grid', 'v53-grid-drill')
    + v53GoBtn('btn ghost', 'courttasting', '', 'The Village tasting', 'v53-grid-tasting') + v53GoBtn('btn ghost', 'cmstasting', '', 'The tasting list', 'v53-grid-list') + '</div>';
  return html + '</div>';
}

/* =========== a subject =========== */

/* A cell as the guide prints it: items it separated with a bullet or a
   line (the extraction's "; ") drawn one to a line; a blank one in the
   guide's own words. */
function v53Cell(text) {
  var t = v53cStr(text);
  if (!t) return '<span class="v53-blank">' + V53_CMS_BLANK + '</span>';
  var items = t.split('; ').map(v53cStr).filter(Boolean);
  if (items.length < 2) return v53Esc(t);
  return '<ul class="v53-cell">' + items.map(function (i) { return '<li>' + v53Esc(i) + '</li>'; }).join('') + '</ul>';
}
function v53RowsTable(s) {
  var rows = v53cList(s.rows).filter(function (r) { return r && v53cStr(r.topic); });
  if (!rows.length) return '';
  var one = !!s.certifiedOnly;
  var html = '';
  if (one) html += '<p>The guide sets this subject for the Certified examination only.</p>';
  html += '<table class="v53-rows' + (one ? ' v53-rows-one' : '') + '"><caption class="sr-only">' + v53Esc('The Court’s rows for ' + (v53cStr(s.name) || s.id)) + '</caption><thead><tr><th scope="col">Topic</th>'
    + (one ? '' : '<th scope="col">Introductory</th>') + '<th scope="col">Certified</th></tr></thead><tbody>';
  rows.forEach(function (r) {
    var both = !v53cStr(r.intro) && !v53cStr(r.certified);
    var cert = both ? '<span class="v53-blank">named in the guide</span>' : v53Cell(r.certified);
    if (r.red && v53cStr(r.certified)) cert += '<span class="v53-tag">printed in red</span>';
    html += '<tr><th scope="row">' + v53Esc(r.topic) + '</th>'
      + (one ? '' : '<td data-col="Introductory">' + (both ? '<span class="v53-blank">named in the guide</span>' : v53Cell(r.intro)) + '</td>')
      + '<td data-col="Certified"' + (r.red ? ' class="v53-red"' : '') + '>' + cert + '</td></tr>';
  });
  return html + '</tbody></table>';
}
function v53ChapterDoors(s) {
  var ch = v53cObj(v53cObj(s.map).chapters);
  var lv = v53cLevel();
  var out = '';
  var has = function (cat, at) { try { return typeof v25HasChapter === 'function' && v25HasChapter(cat, at); } catch (e) { return false; } };
  v53cList(ch.certified).map(v53cStr).filter(Boolean).forEach(function (cat) {
    var at = (lv !== 'intro' && has(cat, lv)) ? lv : (has(cat, 'certified') ? 'certified' : '');
    if (!at) return;
    out += '<li>' + v53Act('btn small ghost', 'chapter', ' data-lv="' + v53Esc(at) + '" data-cat="' + v53Esc(cat) + '"', cat + ', the ' + v53cLvName(at) + ' chapter')
      + (at !== lv ? '<span class="v53-note">' + v53Esc('Opening it moves you to ' + v53cLvName(at) + '.') + '</span>' : '') + '</li>';
  });
  var intro = [];
  try { intro = v53cList(LEVELS.intro.primers); } catch (e) { intro = []; }
  v53cList(ch.intro).map(v53cStr).filter(Boolean).forEach(function (pid) {
    var p = null;
    intro.some(function (x) { if (x && x.id === pid) { p = x; return true; } return false; });
    if (!p) return;
    out += '<li>' + v53Act('btn small ghost', 'chapter', ' data-lv="intro" data-id="' + v53Esc(pid) + '"', (v53cStr(p.t) || pid) + ', the ' + v53cLvName('intro') + ' chapter')
      + (lv !== 'intro' ? '<span class="v53-note">' + v53Esc('Opening it moves you to ' + v53cLvName('intro') + '.') + '</span>' : '') + '</li>';
  });
  return out;
}
function v53CodexDoors(s) {
  var m = v53cObj(s.map);
  var groups = [];
  var chapters = v53ChapterDoors(s);
  if (chapters) groups.push(['Chapters', chapters]);
  var regions = '';
  v53cList(m.regions).map(v53cStr).filter(Boolean).forEach(function (slug) {
    var a = null;
    try { a = (typeof v39Find === 'function') ? v39Find(slug) : null; } catch (e) { a = null; }
    if (a) regions += v53Door('regions', 'region:' + slug, v53cStr(a.name) || slug);
  });
  if (regions) groups.push(['Region articles', regions]);
  var countries = '';
  v53cList(m.countries).map(v53cStr).filter(Boolean).forEach(function (key) {
    var c = null;
    try { c = (typeof v39Country === 'function') ? v39Country(key) : null; } catch (e) { c = null; }
    if (c) countries += v53Door('regions', 'country:' + key, v53cStr(c.name) || key);
  });
  if (countries) groups.push(['Countries', countries]);
  var grapes = '';
  v53cList(m.grapes).map(v53cStr).filter(Boolean).forEach(function (name) { grapes += v53Door('grape', v53GrapeSlugFor(name), name); });
  if (grapes) groups.push(['Grapes', grapes]);
  var tech = '';
  v53cList(m.techniques).map(v53cStr).filter(Boolean).forEach(function (slug) {
    var t = null;
    try { t = (typeof v46Find === 'function') ? v46Find(slug) : null; } catch (e) { t = null; }
    if (t && typeof V25_GO !== 'undefined' && V25_GO && typeof V25_GO.technique === 'function') tech += v53Door('technique', slug, v53cStr(t.name) || slug);
  });
  if (tech) groups.push(['The Wine Workshop', tech]);
  var svc = '';
  v53cList(m.serviceRef).map(v53cStr).filter(Boolean).forEach(function (key) {
    var t = null;
    try { t = (typeof v39Table === 'function') ? v39Table(key) : null; } catch (e) { t = null; }
    if (t) svc += v53Door('serviceref', key, v53cStr(t.title) || key);
  });
  if (svc) groups.push(['Service references', svc]);
  if (!groups.length) return '<p>The Codex’s doors for this subject are still being mapped.</p>';
  return groups.map(function (gr) { return '<h4>' + v53Esc(gr[0]) + '</h4><ul class="v39-lines v39-list v53-doors">' + gr[1] + '</ul>'; }).join('');
}
function v53DrillBody(s) {
  var lv = v53Lv();
  var level = v53LevelQuestions(s.id, v53cLevel()).length;
  var cms = v53CmsQuestions(s.id).length;
  var cards = v53RowCards(s).length;
  var cats = v53MapCats(s, v53cLevel());
  var html = '';
  if (level + cms) {
    var bits = [];
    if (level) bits.push(v53cPlural(level, 'question', 'questions') + ' from the ' + lv.name + ' bank' + (cats.length ? ' in ' + cats.join(', ') : ''));
    if (cms) bits.push(v53cPlural(cms, 'question', 'questions') + ' written to the Court’s rows');
    html += '<p>' + v53Esc('Drill this subject deals ' + v53cPlural(level + cms, 'question', 'questions') + ': ' + bits.join(' and ') + '.') + '</p>';
  } else html += '<p>' + v53Esc('No questions are mapped to this subject at ' + lv.name + ' yet.') + '</p>';
  var btns = '';
  if (level + cms) btns += '<li>' + v53Act('btn small ghost', 'drill', ' data-id="' + v53Esc(s.id) + '" data-scope="both" id="v53-drill-both"', 'Drill this subject, ' + v53cPlural(level + cms, 'question', 'questions')) + '</li>';
  if (cms) btns += '<li>' + v53Act('btn small ghost', 'drill', ' data-id="' + v53Esc(s.id) + '" data-scope="cms" id="v53-drill-cms"', 'The CMS questions alone, ' + v53Num(cms)) + '</li>';
  if (cards && typeof v32StartRun === 'function') btns += '<li>' + v53Act('btn small ghost', 'flash', ' data-id="' + v53Esc(s.id) + '" id="v53-flash"', 'Flash the rows, ' + v53cPlural(cards, 'card', 'cards')) + '</li>';
  if (btns) html += '<ul class="v39-lines v39-list v53-doors">' + btns + '</ul>';
  if (cards) html += '<p class="v53-note">The cards are the Court’s Certified cells, a topic on the front and its cell on the back.</p>';
  return html;
}
function v53ReadyBody(s) {
  var r = v53Readiness(s.id);
  var html = r.total
    ? '<p class="v53-ready-big">' + v53Esc(v53Num(r.met) + ' of ' + v53Num(r.total) + ' answered right at least once: ' + r.word + '.') + '</p>'
    : '<p class="v53-ready-big">Nothing to count yet: no questions are mapped to this subject.</p>';
  html += v53Pairs([
    [v53cLvName('intro'), r.intro.total ? v53Num(r.intro.met) + ' of ' + v53Num(r.intro.total) : ''],
    [v53cLvName('certified'), r.village.total ? v53Num(r.village.met) + ' of ' + v53Num(r.village.total) : ''],
    ['The CMS questions', r.cms.total ? v53Num(r.cms.met) + ' of ' + v53Num(r.cms.total) : '']
  ]);
  html += '<p class="v53-note">A question counts once it has been answered right at least once: the ' + v53Esc(v53cLvName('intro')) + ' and ' + v53Esc(v53cLvName('certified')) + ' questions in the subject’s categories, and its CMS questions at any level.</p>';
  html += '<ul class="v39-lines v39-list v53-doors">' + v53Door('cmsready', '', 'Readiness for every subject') + '</ul>';
  return html;
}
function v53SubjectHtml(s) {
  var list = v53SubjectList();
  var at = list.indexOf(s);
  var sub = [v53CmsGroupName(v53cStr(s.group))];
  if (s.certifiedOnly) sub.push('Certified only');
  var pages = v53cList(s.pages).filter(function (p) { return typeof p === 'number' && isFinite(p); });
  if (pages.length) sub.push(pages.length === 1 ? 'the guide, page ' + pages[0] : 'the guide, pages ' + pages[0] + ' to ' + pages[pages.length - 1]);
  var html = '<div class="v25page v53 v53-subject" id="v53" data-subject="' + v53Esc(s.id) + '">' + v32Head(v53cStr(s.name) || s.id, sub.filter(Boolean).join(' · '));
  var out = v53cObj(s.outcome);
  if (v53cStr(out.intro)) html += '<p class="v39-lead v53-outcome"><span class="v53-eyebrow">The Introductory course</span>' + v53Esc(out.intro) + '</p>';
  if (v53cStr(out.certified)) html += '<p class="v39-lead v53-outcome"><span class="v53-eyebrow">The Certified examination</span>' + v53Esc(out.certified) + '</p>';
  html += v53Sections([
    { id: 'v53-sec-rows', title: 'The Court’s rows', body: v53RowsTable(s), open: true },
    { id: 'v53-sec-codex', title: 'In the Codex', body: v53CodexDoors(s) },
    { id: 'v53-sec-drill', title: 'Drill this subject', body: v53DrillBody(s) },
    { id: 'v53-sec-ready', title: 'Readiness', body: v53ReadyBody(s) }
  ]);
  var acts = '';
  if (v53Questions(s.id).length) acts += v53Act('btn gold', 'drill', ' data-id="' + v53Esc(s.id) + '" data-scope="both" id="v53-act-drill"', 'Drill this subject');
  if (at > 0) acts += v53Act('btn ghost', 'subject', ' data-id="' + v53Esc(list[at - 1].id) + '" id="v53-act-prev"', 'Previous: ' + (v53cStr(list[at - 1].name) || list[at - 1].id));
  if (at >= 0 && at + 1 < list.length) acts += v53Act('btn ghost', 'subject', ' data-id="' + v53Esc(list[at + 1].id) + '" id="v53-act-next"', 'Next: ' + (v53cStr(list[at + 1].name) || list[at + 1].id));
  acts += v53GoBtn('btn ghost', 'cms', '', 'All subjects', 'v53-act-all');
  html += '<div class="v28-btnrow v39-acts v53-acts">' + acts + '</div>';
  return html + '</div>';
}
function v53CmsSubjectHtml() {
  var s = v53Subject(S._v53subject);
  if (!s) return v53NoData('CMS');
  return v53SubjectHtml(s);
}

/* =========== readiness, every subject =========== */

function v53CmsReadyHtml() {
  var subjects = v53SubjectList();
  if (!subjects.length) return v53NoData('Readiness');
  var rows = subjects.map(function (s, i) { return { s: s, r: v53Readiness(s.id), i: i }; });
  var all = rows.reduce(function (a, x) { a.met += x.r.met; a.total += x.r.total; return a; }, { met: 0, total: 0 });
  rows.sort(function (a, b) {
    if (!a.r.total !== !b.r.total) return a.r.total ? -1 : 1;
    if (a.r.share !== b.r.share) return a.r.share - b.r.share;
    return a.i - b.i;
  });
  var html = '<div class="v25page v32-root v53 v53-cmsready">' + v32Head('Readiness', all.total ? v53Num(all.met) + ' of ' + v53Num(all.total) + ' answered right at least once, weakest first' : 'Every subject, weakest first');
  html += '<p class="v39-lead">A question counts once it has been answered right at least once: the ' + v53Esc(v53cLvName('intro')) + ' and ' + v53Esc(v53cLvName('certified')) + ' questions in each subject’s categories, and its CMS questions at any level.</p>';
  var t = v53TastingReady();
  if (t.total) html += v32Group('The tasting', v32GoRow('cmstasting', 'The Certified tasting list', t.tried
    ? v53Num(t.met) + ' of ' + v53Num(t.total) + ' grapes named right on the Court’s grid at least once'
    : 'No glass poured on the Court’s grid yet: ' + v53cPlural(t.total, 'grape', 'grapes') + ' to learn'), 'v53-ready-tasting');
  html += v32Group('The subjects', rows.map(function (x) {
    var line = x.r.total ? v53Num(x.r.met) + ' of ' + v53Num(x.r.total) + ' · ' + x.r.word : 'Nothing to count yet';
    if (x.s.certifiedOnly) line += ' · Certified only';
    return v32GoRow('cmssubject', v53cStr(x.s.name) || x.s.id, line, x.s.id);
  }).join(''), 'v53-ready-subjects');
  return html + '</div>';
}

/* =========== the deck of a subject's rows =========== */

function v53RowCards(s) {
  if (!s) return [];
  var name = v53cStr(s.name) || s.id;
  return v53cList(s.rows).map(function (r, i) {
    return { id: 'cms:' + s.id + '/' + i, kind: 'region', front: v53cStr(r && r.topic), back: v53cStr(r && r.certified), label: name };
  }).filter(function (c) { return c.front && c.back; });
}
if (typeof v32DeckDef === 'function') {
  var _v53CmsDeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    var m = /^cms:(.+)$/.exec(String(id || ''));
    if (!m) return _v53CmsDeckDef.apply(this, arguments);
    var s = v53Subject(m[1]);
    var def = { id: String(id), kind: 'region', name: s ? (v53cStr(s.name) || s.id) + ' · the Court’s rows' : 'The Court’s rows', cards: v53RowCards(s) };
    try { def.learnt = (typeof v32Learnt === 'function') ? v32Learnt(def) : 0; } catch (e) { def.learnt = 0; }
    return def;
  };
}
/* The deck and its cards light CMS; the deck screen climbs to its subject. */
if (typeof v25NavWord === 'function') {
  var _v53CmsNavWord = v25NavWord;
  v25NavWord = function () {
    try {
      var v = S.view, id = '';
      if (v === 'deck') id = String(S._v32deck || '');
      else if (v === 'housedeck' || v === 'flash') { var run = S._v32run; id = (run && run.v32) ? String(run.deckId || '') : ''; }
      if (/^cms:/.test(id)) return 'cms';
    } catch (e) { }
    return _v53CmsNavWord.apply(this, arguments);
  };
}
if (typeof v32ParentRoute === 'function') {
  var _v53CmsParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      if (S.view === 'deck') {
        var m = /^cms:(.+)$/.exec(String(S._v32deck || ''));
        if (m && v53Subject(m[1])) return { view: 'cmssubject', arg: m[1] };
      }
    } catch (e) { }
    return _v53CmsParentRoute.apply(this, arguments);
  };
}

/* =========== the e- keys in the engine =========== */

if (typeof keyOwned === 'function') {
  var _v53KeyOwned = keyOwned;
  keyOwned = function (k) {
    if (v53IsCmsKey(k)) return false;
    return _v53KeyOwned.apply(this, arguments);
  };
}
if (typeof srsRecord === 'function') {
  var _v53SrsRecord = srsRecord;
  srsRecord = function (q) {
    if (q && v53IsCmsId(q.id)) return;
    return _v53SrsRecord.apply(this, arguments);
  };
}
if (typeof qidAudit === 'function') {
  var _v53QidAudit = qidAudit;
  qidAudit = function () {
    var out = _v53QidAudit.apply(this, arguments);
    try {
      var known = {};
      v53SubjectList().forEach(function (s) { v53CmsRaw(s).forEach(function (q) { known[q.id] = 1; }); });
      var orph = out && out.orphanedKeys;
      if (orph && typeof orph === 'object') {
        Object.keys(orph).forEach(function (name) {
          var left = v53cList(orph[name]).filter(function (k) { return !known[v53BareKey(k)]; });
          if (left.length) orph[name] = left; else delete orph[name];
        });
      }
    } catch (e) { }
    return out;
  };
}
/* codex8's ledger (grader overrides and reported errors) resolves a key
   against the level banks; a CMS key resolves against the CMS bank and is
   tagged CMS rather than with a level. */
if (typeof findByKey === 'function') {
  var _v53FindByKey = findByKey;
  findByKey = function (k) {
    if (v53IsCmsKey(k)) return v53CmsById(v53BareKey(k));
    return _v53FindByKey.apply(this, arguments);
  };
}
function v53TagCms(rows) {
  return v53cList(rows).map(function (x) { if (x && v53IsCmsKey(x.k)) x.lvl = 'CMS'; return x; });
}
if (typeof graderDisputes === 'function') {
  var _v53GraderDisputes = graderDisputes;
  graderDisputes = function () { return v53TagCms(_v53GraderDisputes.apply(this, arguments)); };
}
if (typeof badReports === 'function') {
  var _v53BadReports = badReports;
  badReports = function () { return v53TagCms(_v53BadReports.apply(this, arguments)); };
}
/* A section name that is a subject's and no category of the bank (codex19's
   report drills a section by its name) deals that subject's CMS questions. */
if (typeof startDrill === 'function') {
  var _v53StartDrillCat = startDrill;
  startDrill = function (cat) {
    try {
      var c = v53cStr(cat);
      var bank = (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS)) ? QUESTIONS : [];
      if (c && !bank.some(function (q) { return q && q.cat === c; })) {
        var hit = null;
        v53SubjectList().some(function (s) { if (v53cStr(s.name) === c) { hit = s; return true; } return false; });
        if (hit && v53CmsQuestions(hit.id).length) return v53StartDrill(hit.id, 'cms');
      }
    } catch (e) { }
    return _v53StartDrillCat.apply(this, arguments);
  };
}

/* =========== the views registered =========== */

function v53OpenChapter(lv, cat, pid) {
  try {
    if (lv && lv !== v53cLevel() && typeof applyLevel === 'function') applyLevel(lv, true);
    if (pid) {
      var idx = -1;
      v53cList(typeof PRIMERS !== 'undefined' ? PRIMERS : []).forEach(function (p, i) { if (idx < 0 && p && p.id === pid) idx = i; });
      if (idx < 0) return false;
      v32Go({ view: 'primer', arg: String(idx) }, 'push');
      return true;
    }
    if (cat && typeof v25OpenChapter === 'function') { v32Push(function () { v25OpenChapter(cat); }); return true; }
  } catch (e) { }
  return false;
}
function v53SubjectStep(id) {
  if (!v53Subject(id)) return;
  S._v53subject = id;
  try { V32.pend = 'replace'; } catch (e) { }
  render();
  if (typeof v25FocusMain === 'function') { try { v25FocusMain(); } catch (e) { } }
  try { window.scrollTo(0, 0); } catch (e) { }
}
function v53CmsAct(act, node) {
  var get = function (k) { return node && typeof node.getAttribute === 'function' ? (node.getAttribute(k) || '') : ''; };
  if (act === 'drill') return v53StartDrill(get('data-id'), get('data-scope'));
  if (act === 'flash') { if (typeof v32StartRun === 'function') return v32StartRun('cms:' + get('data-id'), { push: true }); return false; }
  if (act === 'subject') { v53SubjectStep(get('data-id')); return true; }
  if (act === 'chapter') return v53OpenChapter(get('data-lv'), get('data-cat'), get('data-id'));
  return false;
}

(function () {
  if (typeof V25_VIEWS === 'undefined' || !V25_VIEWS) return;
  V25_VIEWS.cms = function () { return v53CmsBuild(v53CmsRootHtml()); };
  V25_VIEWS.cmsday = function () { return v53CmsBuild(v53CmsDayHtml()); };
  V25_VIEWS.cmstasting = function () { return v53CmsBuild(v53CmsTastingHtml()); };
  V25_VIEWS.cmsgrid = function () { return v53CmsBuild(v53CmsGridHtml()); };
  V25_VIEWS.cmssubject = function () { return v53CmsBuild(v53CmsSubjectHtml()); };
  V25_VIEWS.cmsready = function () { return v53CmsBuild(v53CmsReadyHtml()); };
})();

/* =========== the open sections, kept across a door ===========
   A subject's page, a grape's page, the exam day and the grid draw their
   sections closed but the first. A door followed from inside an opened
   section (a region, a grape, a chapter, the deck, the drill) pushes its
   own entry, and Back drew the page again with that section closed: the
   pressed door hidden in it, the focus lost to the view and the saved
   scroll beyond the page's new height (the phone walk, 31 October 2026).
   codex39's rule for its articles (V39_OPEN), for these pages: the
   sections open when the page is left are noted against its address as
   codex32 saves the scroll, and opened again before codex32 puts the
   scroll back and focuses the door. The page is named by what it draws,
   since the state may already name the next screen. */
var V53_OPEN = {};
function v53PageKey() {
  try {
    var box = document.getElementById('view');
    var n = (box && typeof box.querySelector === 'function') ? box.querySelector('.v25page.v53') : null;
    if (!n || typeof n.getAttribute !== 'function') return '';
    var subject = n.getAttribute('data-subject'), grape = n.getAttribute('data-grape');
    if (subject) return 'subject:' + subject;
    if (grape) return 'grape:' + grape;
    var m = /\bv53-(cmsday|cmsgrid)\b/.exec(String(n.className || ''));
    return m ? m[1] : '';
  } catch (e) { return ''; }
}
function v53OpenSecs() {
  try {
    var box = document.getElementById('view');
    return (box && typeof box.querySelectorAll === 'function') ? Array.prototype.slice.call(box.querySelectorAll('.v25page.v53 details.v39-sec')) : [];
  } catch (e) { return []; }
}
function v53KeepOpen() {
  try {
    var k = v53PageKey();
    if (!k || typeof location === 'undefined' || !location) return;
    var secs = v53OpenSecs();
    if (!secs.length) return;
    V53_OPEN[location.href] = { key: k, open: secs.filter(function (d) { return d.open && d.id; }).map(function (d) { return d.id; }) };
  } catch (e) { }
}
function v53PutOpen() {
  try {
    if (typeof location === 'undefined' || !location) return;
    var o = V53_OPEN[location.href];
    if (!o || o.key !== v53PageKey()) return;
    v53OpenSecs().forEach(function (d) { if (d.id) d.open = o.open.indexOf(d.id) >= 0; });
  } catch (e) { }
}
if (typeof v32SaveScroll === 'function') {
  var _v53SaveScroll = v32SaveScroll;
  v32SaveScroll = function () { v53KeepOpen(); return _v53SaveScroll.apply(this, arguments); };
}
if (typeof v32RestoreScroll === 'function') {
  var _v53RestoreScroll = v32RestoreScroll;
  v32RestoreScroll = function () { v53PutOpen(); return _v53RestoreScroll.apply(this, arguments); };
}

/* =========== 10. the wiring and the styles =========== */

(function () {
  if (typeof document === 'undefined' || !document || typeof document.addEventListener !== 'function') return;
  document.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v53]') : null;
    if (!node || node.disabled) return;
    var act = node.getAttribute('data-v53');
    if (act === 'jump') {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof v41Jump === 'function') v41Jump(node.getAttribute('data-to'));
      return;
    }
    if (act === 'housedue') {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      try { if (typeof v32Remember === 'function') v32Remember(node); } catch (err) { }
      v53StartHouseDue();
      return;
    }
    if (act === 'drill' || act === 'flash' || act === 'subject' || act === 'chapter') {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      try { if (act !== 'subject' && typeof v32Remember === 'function') v32Remember(node); } catch (err) { }
      v53CmsAct(act, node);
      return;
    }
  });
})();

(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v53-style';
  css.textContent = [
    /* the bar: the five fixed words (Library with its pill) keep their own width; only the house's name gives way, with
       an ellipsis, so a long house name never pushes the pill out of Library's box at 320 */
    '.wrap .house-topbar .appnav.v32nav .navword:not([data-nav="brennans"]){flex-shrink:0}',
    '.wrap .house-topbar .appnav.v32nav .navword[data-nav="brennans"]{min-width:44px;overflow:hidden;text-overflow:ellipsis}',
    /* the narrowest phones: the day service sets the words not lit at 600 and Due today's pill reads two figures, which
       needed 301 of the 296 wide row at 320; a pixel less padding a word, a narrower pill and More's margin at 1px fit
       it with a pixel to spare (measured below) */
    '@media(max-width:340px){.wrap .house-topbar .appnav.v32nav .navword{padding-inline:1px}.wrap .house-topbar .appnav.v32nav .navword.v32more{margin-left:1px}.wrap .house-topbar .appnav.v32nav .v32pill{margin-left:1px;padding:0 2px;min-width:1.4em}}',
    /* the jump chips */
    '.wrap .v53-jumps{margin:14px 0 6px}',
    '.wrap .v53-jumps .v28-chip{min-height:44px;padding:8px 12px;font-size:16px}',
    '.wrap .v53-jumps .v28-chip[hidden]{display:none}',
    '.wrap .v53-library [tabindex="-1"]:focus{outline:none}',
    '.wrap .v53-library [tabindex="-1"]:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}',
    '.wrap .v53-library .v32-sec{margin-top:28px}',
    '.wrap .v53-library .v53-practise .v32-due{margin-top:8px}',
    '.wrap .v53-library .v53-reading>section{margin-top:18px}',
    /* the bank */
    '.wrap .v53-cat{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:10px 0;border-bottom:1px solid var(--line)}',
    '.wrap .v53-catrow{flex:1 1 200px;display:flex;flex-direction:column;gap:2px}',
    '.wrap .v53-catrow .v25row-name{font-size:17px;color:var(--parch)}',
    '.wrap .v53-catrow .v25row-line{font-size:14px;color:var(--gold-soft)}',
    '.wrap .v53-trains{display:flex;gap:8px}',
    '.wrap .v53-trains .train{min-height:44px;min-width:64px;padding:8px 14px;font-size:15px}',
    /* home */
    '.wrap .level .lv-bank{display:block;font-size:14px;color:var(--ink-soft);margin-top:4px}',
    '.wrap .v53-home-row{margin-top:18px}',
    /* the CMS views: every control 44px, the doors and notes on parchment */
    '.wrap .v53 .btn{min-height:44px;white-space:normal;text-align:left;max-width:100%}',
    '.wrap .v53 .v28-chip{min-height:44px}',
    '.wrap .v53-nonaffil{font-size:15px;color:var(--gold-soft)}',
    '.wrap .v53-cms-guide{margin-top:24px}',
    '.wrap .v53-outcome{font-size:18px;line-height:1.6}',
    '.wrap .v53-eyebrow{display:block;font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.06em;color:var(--gold-soft);margin-bottom:4px}',
    '.wrap .v53-doors{list-style:none;margin:6px 0 14px;padding:0}',
    '.wrap .v53-doors li{margin:0 0 8px}',
    '.wrap .v53-doors .btn{font-size:16px}',
    '.wrap .v53-note{display:block;font-size:14px;line-height:1.45;color:var(--ink-soft);margin-top:4px}',
    '.wrap .v53-ready-big{font-size:19px;line-height:1.5}',
    '.wrap .v53-acts .btn{margin:0 8px 8px 0}',
    /* the rows table of a subject, in the parchment section; three columns
       stack to a labelled list under 420px */
    '.wrap table.v53-rows{width:100%;border-collapse:collapse;font-size:16px;line-height:1.45;table-layout:auto}',
    '.wrap table.v53-rows th,.wrap table.v53-rows td{text-align:left;vertical-align:top;padding:8px 6px;border-bottom:1px solid var(--line);overflow-wrap:break-word;background:none}',
    '.wrap table.v53-rows thead th{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-weight:600;font-size:13px;letter-spacing:.04em;color:var(--claret)}',
    '.wrap table.v53-rows tbody th{font-weight:600;width:24%;color:var(--ink)}',
    '.wrap table.v53-rows .v53-blank{color:var(--ink-soft);font-style:italic}',
    '.wrap table.v53-rows .v53-red{color:var(--claret)}',
    '.wrap table.v53-rows .v53-tag{display:block;font-size:13px;font-style:italic;color:var(--ink-soft);margin-top:4px}',
    '.wrap table.v53-rows .v53-cell{margin:0;padding:0 0 0 18px}',
    '.wrap table.v53-rows .v53-cell li{margin:0 0 4px}',
    '@media (max-width:420px){.wrap table.v53-rows,.wrap table.v53-rows tbody,.wrap table.v53-rows tr,.wrap table.v53-rows th,.wrap table.v53-rows td{display:block;width:auto}.wrap table.v53-rows thead{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden}.wrap table.v53-rows tr{padding:10px 0;border-bottom:1px solid var(--line)}.wrap table.v53-rows th,.wrap table.v53-rows td{border:0;padding:3px 0}.wrap table.v53-rows tbody th{font-size:17px;width:auto}.wrap table.v53-rows td[data-col]::before{content:attr(data-col);display:block;font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:12px;letter-spacing:.05em;color:var(--claret);margin-top:6px}}',
    /* the Court's grid: a part to a fieldset, each line a radio group or a
       short field, every choice a 44px chip whose input fills it */
    '.wrap .v53-sheet{margin:12px 0 8px}',
    '.wrap .v53-part{border:0;margin:0 0 22px;padding:0;min-width:0}',
    '.wrap .v53-part>legend{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:15px;letter-spacing:.05em;color:var(--gold);padding:0;margin:0 0 4px}',
    '.wrap .v53-line{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:12px 0;border-bottom:1px solid var(--line)}',
    '.wrap .v53-line .v53-label{flex:1 1 100%;font-size:17px;line-height:1.4;color:var(--parch)}',
    '.wrap .v53-lnote{display:block;flex:1 1 100%;font-size:14px;line-height:1.45;color:var(--gold-soft)}',
    '.wrap .v53-opts{display:flex;flex-wrap:wrap;gap:8px;flex:1 1 100%}',
    '.wrap .v53-opt{position:relative;display:inline-flex;min-height:44px;min-width:56px}',
    '.wrap .v53-opt input{position:absolute;top:0;left:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer;z-index:1}',
    '.wrap .v53-opt span{display:inline-flex;align-items:center;justify-content:center;min-height:44px;width:100%;box-sizing:border-box;padding:6px 14px;border:1px solid var(--gold-soft);border-radius:22px;font-size:16px;line-height:1.25;color:var(--parch)}',
    '.wrap .v53-opt input:checked+span{background:var(--gold-hi);border-color:var(--gold-hi);color:var(--bg);font-weight:600}',
    '.wrap .v53-opt input:focus-visible+span{outline:2px solid var(--gold-hi);outline-offset:2px}',
    '.wrap .v53-opt input:disabled{cursor:default}',
    '.wrap .v53-opt input:disabled:not(:checked)+span{opacity:.6}',
    '.wrap .v53-textline input[type="text"],.wrap .v53-textline textarea{flex:1 1 100%;width:100%;box-sizing:border-box;min-height:44px;font-size:16px;line-height:1.4;padding:8px 10px;border:1px solid var(--gold-soft);border-radius:6px;background:transparent;color:var(--parch);font-family:inherit}',
    '.wrap .v53-textline textarea{min-height:96px;resize:vertical}',
    '.wrap .v53-mark{display:block;flex:1 1 100%;font-size:15px;line-height:1.4;padding-left:10px;border-left:3px solid var(--line);color:var(--parch)}',
    '.wrap .v53-mark.v53-ok{border-left-color:var(--green,#3c6045)}',
    '.wrap .v53-mark.v53-no{border-left-color:var(--claret)}',
    '.wrap .v53-self{display:flex;flex-wrap:wrap;gap:8px;flex:1 1 100%}',
    '.wrap .v53-glass{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:15px;letter-spacing:.05em;color:var(--gold-soft);margin:14px 0 4px}',
    '.wrap .v53-clock{margin:10px 0;padding:10px 0;font-size:20px;font-variant-numeric:tabular-nums;color:var(--parch);border-bottom:1px solid var(--line)}',
    '.wrap .v53-verdict{margin:14px 0;padding:12px 14px;border:1px solid var(--line);border-radius:8px;color:var(--parch)}',
    '.wrap .v53-verdict:focus{outline:none}',
    '.wrap .v53-verdict:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}',
    '.wrap .v53-clues{margin:10px 0 4px}',
    '.wrap .v53-clues>summary{display:inline-flex;align-items:center;min-height:44px;box-sizing:border-box;padding:6px 14px;border:1px solid var(--line);border-radius:6px;cursor:pointer;font-size:16px;color:var(--gold-soft);list-style:none}',
    '.wrap .v53-clues>summary::-webkit-details-marker{display:none}',
    '.wrap .v53-clues[open]>summary{border-color:var(--gold-soft)}',
    '.wrap .v53-cluebody{padding:4px 0 8px;color:var(--parch)}',
    '.wrap .v53-cluebody .v39-lines{color:var(--parch)}',
    '.wrap .v53-cluebody .v39-lines li{margin:0 0 8px;line-height:1.5}',
    /* the grape pages */
    '.wrap .v53-grapes .v32-sec{margin-top:26px}',
    '.wrap .v53-say{font-size:20px}',
    '.wrap .v53 a.btn{display:inline-flex;align-items:center;min-height:44px;box-sizing:border-box}',
    '.wrap .v53-exam{list-style:none;padding:0;margin:6px 0 14px}',
    '.wrap .v53-exam>li{margin:0 0 12px}',
    '.wrap .v53-exline{display:block;font-size:16px;line-height:1.45}',
    '.wrap table.v53-reads{width:100%;border-collapse:collapse;font-size:15px;line-height:1.45;margin:4px 0 10px}',
    '.wrap table.v53-reads th,.wrap table.v53-reads td{text-align:left;vertical-align:top;padding:6px;border-bottom:1px solid var(--line);overflow-wrap:break-word;background:none}',
    '.wrap table.v53-reads tbody th{font-weight:600;width:38%;color:var(--ink)}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();

/* =========== 11. the grape views ===========

   Grapes holds the grapes, the tasting and the grid (design section E).

   THE JOIN (v53GrapeJoin, v53GrapeKey): one record per grape over the
   Village list (codex7's CERT_GRAPES, whatever the level has rebound
   GRAPES to) and GRAPES_PLUS, TASTE by the exact name, INTRO_GRAPES by the
   folded name, REGIONS.join.grapes and the reading files' grape entries. A
   name is folded (marks off, lower case, anything not a letter or a digit a
   space), its aside in brackets dropped and split on the slash; the first
   part, through GRID_ALIASES or the layer's few aliases (the names a grid
   read may not carry, so the slugs hold on any build), is the slug. The 47
   profiles and the 12 Régionale alone draws make 59, and the twenty of the
   Court's tasting list resolve by name. REGIONS.join.grapes and the reading
   files add regions to a grape, never a grape: a name there resolves by
   its whole folded form or by a part, never by a synonym of INTRO_GRAPES
   (Auxerrois is Malbec in Cahors and its own grape in Alsace).

   THE PAGES: grapes (the root: the Certified twenty first with their
   examinable regions, the other grapes by colour, the tasting doors, the
   grape decks) and grape/{slug} (the profile from every source, the
   classic regions as doors with the examinable ones marked, what the grid
   reads per examinable region, the one card deck grape:{slug} graded in
   codex32's grape card slot under the card's name, the grape's drill, its
   record on the Court's grid, a search link out, Previous and Next, which
   replace). The drill deals the ACTIVE level's questions whose folded stem,
   answer or explanation names the grape as a whole word, with the CMS
   questions tagged with it; S._v53drill is 'grape:' + slug and S.section
   'Grape: ' + name, so the bar lights Grapes.

   THE COURT'S GRID (griddrill/{slug?}): one glass on the Court's lines as
   CMS.grid prints them, each line a radio group or a short text field,
   marked line by line (v53GridGrade) against a GRID_READS entry: a Yes or
   No exactly, a descriptor when its folded words hold one the read
   accepts, a structure, colour, climate or age call when it is one the
   read lists, one or two fruit conditions all of them listed, the grape by
   its slug from six of its colour, the country by its folded name, the
   sale self marked against the read's own two sentences (more than two, or
   none, is wrong). A blank line is a wrong line: the Court asks for every
   line. The Explain why lines are the candidate's own and never marked;
   the read's reasons are shown beside them. Each marked glass is kept per
   device in oot-codex-courtgrid-v1 (never exported), by slug: the glasses
   poured (n), the grapes named right (c) and each line's tally (lines). The
   address names the grape only when the glass was asked for by name, so a
   blind glass never prints its grape. With no glass to hand, a closed
   disclosure gives the structure as codex20's sensations (TASTE_EVIDENCE at
   the read's step) and, closed again, the region.

   THE VILLAGE TASTING (courttasting): two whites then two reds from the
   tasting list with grid reads, each on the same sheet, under a 30 minute
   clock on codex39's rule: the end time is stored at the first draw and
   read on every render, the clock reads a word when it is up and never
   stops the run, and leaving the screen holds what is left (the render
   wrapper below). A tally at the end and Pour another flight, which deals
   again in place. codex39's 45 minute run is codex20's grid and stays where
   it was, reached from Quizzes. */

var V53_GRAPE_ALIASES = {
  'pinot gris': 'pinot-grigio', 'pinot grigio': 'pinot-grigio', 'pinot gris grigio': 'pinot-grigio',
  'garnacha': 'grenache', 'grenache garnacha': 'grenache', 'shiraz': 'syrah', 'syrah shiraz': 'syrah',
  'alvarinho': 'albarino', 'muscat': 'muscat-blanc', 'moscato': 'muscat-blanc', 'mataro': 'mourvedre',
  'lemberger': 'blaufrankisch', 'kekfrankos': 'blaufrankisch', 'mazuelo': 'carignan', 'sylvaner': 'silvaner',
  'weissburgunder': 'pinot-blanc', 'pinot bianco': 'pinot-blanc', 'calabrese': 'nero-d-avola'
};
var V53_STEP_WORDS = ['low to medium minus', 'medium', 'medium plus', 'high'];
var V53_INTRO_WORDS = ['none', 'low', 'medium', 'high'];
var V53_US = ['united states', 'united states of america', 'usa', 'us', 'u s', 'u s a', 'america'];
var V53_RUN_SECS = 30 * 60;
var V53_GJ = { sig: null, list: [], bySlug: {}, byKey: {} };
var V53_HAY = { banks: [], hays: [] };
var V53_SYNTH = {};
var V53_CLOCK = { timer: null };
var V53_GACTS = ['gpour', 'gmark', 'gself', 'gnext', 'gagain', 'grunstart', 'gdrill', 'gstep'];

function v53Own(o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); }
function v53GridReads() {
  try { return (typeof GRID_READS !== 'undefined' && GRID_READS && typeof GRID_READS === 'object') ? GRID_READS : {}; } catch (e) { return {}; }
}
function v53GridSay() {
  try { return (typeof GRID_SAY !== 'undefined' && GRID_SAY && typeof GRID_SAY === 'object') ? GRID_SAY : {}; } catch (e) { return {}; }
}
function v53GridAliases() {
  try { return (typeof GRID_ALIASES !== 'undefined' && GRID_ALIASES && typeof GRID_ALIASES === 'object') ? GRID_ALIASES : {}; } catch (e) { return {}; }
}
function v53ReadsOf(slug) { return v53cList(v53cObj(v53GridReads()[slug]).reads).filter(function (r) { return r && typeof r === 'object'; }); }
function v53CourtGrid(colour) { return v53cObj(v53cObj(v53Cms() && v53Cms().grid)[colour]); }
function v53NoStar(s) { return v53cStr(String(s == null ? '' : s).replace(/\s*\u2605/g, '')); }
function v53StarPlaces(s) {
  return String(s == null ? '' : s).split(',').filter(function (p) { return p.indexOf('\u2605') >= 0; }).map(v53NoStar).filter(Boolean);
}

/* =========== the join =========== */

function v53GrapeParts(name) {
  var s = String(name == null ? '' : name).replace(/\([^)]*\)/g, ' ');
  return s.split('/').map(v53cFold).filter(Boolean);
}
function v53GrapeAlias(f) {
  var a = v53GridAliases();
  if (f && typeof a[f] === 'string' && a[f]) return a[f];
  return (f && v53Own(V53_GRAPE_ALIASES, f)) ? V53_GRAPE_ALIASES[f] : '';
}
function v53GrapeSlugOf(name) {
  var parts = v53GrapeParts(name);
  if (!parts.length) return '';
  return v53GrapeAlias(parts[0]) || v53GrapeAlias(parts.join(' ')) || parts[0].replace(/ /g, '-');
}
/* The Village list and the twenty four more, each once, whatever the level. */
function v53GrapeProfiles() {
  var out = [], seen = {};
  var add = function (g) { if (g && typeof g.g === 'string' && !seen[g.g]) { seen[g.g] = 1; out.push(g); } };
  try { v53cList(typeof CERT_GRAPES !== 'undefined' ? CERT_GRAPES : null).forEach(add); } catch (e) { }
  try { v53cList(typeof GRAPES !== 'undefined' ? GRAPES : null).forEach(add); } catch (e) { }
  try { v53cList(typeof GRAPES_PLUS !== 'undefined' ? GRAPES_PLUS : null).forEach(add); } catch (e) { }
  return out;
}
function v53IntroGrapes() {
  try { return (typeof INTRO_GRAPES !== 'undefined' && Array.isArray(INTRO_GRAPES)) ? INTRO_GRAPES : []; } catch (e) { return []; }
}
function v53Taste(name) {
  try {
    if (typeof TASTE === 'undefined' || !Array.isArray(TASTE)) return null;
    for (var i = 0; i < TASTE.length; i++) if (TASTE[i] && TASTE[i].g === name) return TASTE[i];
  } catch (e) { }
  return null;
}
function v53RegionsData() { try { return (typeof REGIONS !== 'undefined' && REGIONS && typeof REGIONS === 'object') ? REGIONS : null; } catch (e) { return null; } }

function v53GrapeResolve(J, name) {
  var parts = v53GrapeParts(name);
  if (!parts.length) return '';
  var whole = parts.join(' ');
  if (v53Own(J.byKey, whole)) return J.byKey[whole];
  for (var i = 0; i < parts.length; i++) if (v53Own(J.byKey, parts[i])) return J.byKey[parts[i]];
  var a = v53GrapeAlias(whole) || v53GrapeAlias(parts[0]);
  return (a && v53Own(J.bySlug, a)) ? a : '';
}
function v53GrapeJoin() {
  var R = v53RegionsData();
  var profiles = v53GrapeProfiles();
  var sig = [profiles.length, v53IntroGrapes(), R, v53Cms(), v53GridAliases(), v53GridReads()];
  if (V53_GJ.sig && V53_GJ.sig.length === sig.length && sig.every(function (x, i) { return V53_GJ.sig[i] === x; })) return V53_GJ;
  var J = { sig: sig, list: [], bySlug: {}, byKey: {} };
  var rec = function (slug, name, colour) {
    if (!v53Own(J.bySlug, slug)) {
      J.bySlug[slug] = { slug: slug, name: name, colour: colour, g: null, intro: null, taste: null, court: '', tasting: null, keys: [], targets: [] };
      J.list.push(J.bySlug[slug]);
    }
    return J.bySlug[slug];
  };
  var key = function (k, slug) {
    if (!k || !v53Own(J.bySlug, slug)) return;
    if (!v53Own(J.byKey, k)) J.byKey[k] = slug;
    if (J.byKey[k] === slug && J.bySlug[slug].keys.indexOf(k) < 0) J.bySlug[slug].keys.push(k);
  };
  var names = function (n, slug) {
    var parts = v53GrapeParts(n);
    key(parts.join(' '), slug);
    parts.forEach(function (p) { key(p, slug); });
  };
  profiles.forEach(function (g) {
    var slug = v53GrapeSlugOf(g.g);
    if (!slug) return;
    var r = rec(slug, g.g, g.c === 'w' ? 'white' : 'red');
    if (!r.g) { r.g = g; r.name = g.g; r.colour = g.c === 'w' ? 'white' : 'red'; }
    if (!r.taste) r.taste = v53Taste(g.g);
    names(g.g, slug);
  });
  v53IntroGrapes().forEach(function (g) {
    if (!g || typeof g.n !== 'string') return;
    var slug = v53GrapeSlugOf(g.n);
    if (!slug) return;
    var r = rec(slug, g.n, String(g.c) === 'white' ? 'white' : 'red');
    if (!r.intro) r.intro = g;
    names(g.n, slug);
  });
  [v53GridAliases(), V53_GRAPE_ALIASES].forEach(function (o) {
    Object.keys(o).forEach(function (k) { if (typeof o[k] === 'string') key(v53cFold(k), o[k]); });
  });
  v53TastingList().forEach(function (t) {
    var s = v53GrapeResolve(J, t.name);
    if (!s) return;
    if (!J.bySlug[s].tasting) { J.bySlug[s].tasting = t; J.bySlug[s].court = t.name; }
    names(t.name, s);
  });
  var jg = (R && R.join && R.join.grapes && typeof R.join.grapes === 'object') ? R.join.grapes : {};
  Object.keys(jg).forEach(function (n) {
    var s = v53GrapeResolve(J, n);
    if (!s) return;
    var r = J.bySlug[s];
    var v = jg[n];
    (Array.isArray(v) ? v : [v]).forEach(function (t) { if (typeof t === 'string' && t && r.targets.indexOf(t) < 0) r.targets.push(t); });
  });
  V53_GJ = J;
  return J;
}
/* A name to its grape's slug, or '' when it names none of the grapes. */
function v53GrapeKey(name) { return v53GrapeResolve(v53GrapeJoin(), name); }
function v53GrapeFind(slug) {
  var J = v53GrapeJoin();
  var s = v53cStr(slug);
  if (!s) return null;
  if (v53Own(J.bySlug, s)) return J.bySlug[s];
  var k = v53GrapeResolve(J, s.replace(/-/g, ' '));
  return k ? J.bySlug[k] : null;
}
function v53GrapeName(slug) { var r = v53GrapeFind(slug); return r ? r.name : 'Grapes'; }
function v53GrapeLabel(r) { return r ? (r.court || r.name) : ''; }
/* The twenty in the Court's order (whites, then reds), then the rest by colour and name. */
function v53GrapeOrder() {
  var J = v53GrapeJoin();
  var twenty = [], seen = {};
  v53TastingList().forEach(function (t) {
    var s = v53GrapeResolve(J, t.name);
    if (s && !seen[s]) { seen[s] = 1; twenty.push(J.bySlug[s]); }
  });
  var rest = J.list.filter(function (r) { return !seen[r.slug]; });
  var by = function (a, b) { var x = v53cFold(a.name), y = v53cFold(b.name); return x < y ? -1 : (x > y ? 1 : 0); };
  var whites = rest.filter(function (r) { return r.colour === 'white'; }).sort(by);
  var reds = rest.filter(function (r) { return r.colour !== 'white'; }).sort(by);
  return { twenty: twenty, whites: whites, reds: reds, all: twenty.concat(whites, reds) };
}
/* The tasting list's own lines for a grape, each with the articles its places resolve to. */
function v53Examinable(r) {
  var t = r && r.tasting;
  if (!t) return [];
  return v53cList(t.regions).map(function (g) {
    var where = v53cStr(g && g.country).replace(/\s+-\s+/g, ', ').replace(/;/g, ',');
    var doors = [];
    v53cList(g && g.places).map(v53cStr).filter(Boolean).forEach(function (p) {
      var slug = '';
      try { slug = (typeof v39SlugFor === 'function') ? v39SlugFor(p + ', ' + where) : ''; } catch (e) { slug = ''; }
      if (slug && !doors.some(function (d) { return d.slug === slug; })) doors.push({ place: p, slug: slug });
    });
    return { line: v53RegionLine(g), places: v53cList(g && g.places).map(v53cStr).filter(Boolean), doors: doors };
  });
}
function v53ExamSlugs(r) {
  var out = [];
  v53Examinable(r).forEach(function (e) { e.doors.forEach(function (d) { if (out.indexOf(d.slug) < 0) out.push(d.slug); }); });
  return out;
}
function v53ExamPlaces(r) {
  var out = [];
  v53Examinable(r).forEach(function (e) { e.places.forEach(function (p) { if (out.indexOf(p) < 0) out.push(p); }); });
  return out;
}

/* =========== the one card deck =========== */

/* The card a grape is dealt as: its GRAPES or GRAPES_PLUS profile, or, for a
   grape only Régionale draws, one written once from INTRO_GRAPES's fields. */
function v53GrapeCardRec(r) {
  if (!r) return null;
  if (r.g) return r.g;
  if (v53Own(V53_SYNTH, r.slug)) return V53_SYNTH[r.slug];
  var i = v53cObj(r.intro);
  var w = function (n) { var x = Number(n); return (x >= 0 && x <= 3 && Math.floor(x) === x) ? V53_INTRO_WORDS[x] : ''; };
  var st = [v53cStr(i.clim) ? 'Climate ' + v53cStr(i.clim).toLowerCase() : '', w(i.acid) ? 'Acid ' + w(i.acid) : '', w(i.body) ? 'Body ' + w(i.body) : '',
    (r.colour === 'red' && w(i.tan)) ? 'Tannin ' + w(i.tan) : '', v53cStr(i.sweet)].filter(Boolean).join(' · ');
  V53_SYNTH[r.slug] = {
    g: r.name, c: r.colour === 'white' ? 'w' : 'r', st: st, fruit: v53NoStar(i.aroma),
    other: v53cStr(i.wines) ? 'Wines to know: ' + v53NoStar(i.wines) : '', tell: v53NoStar(i.trap),
    regions: v53NoStar(i.reg), confuse: 'No comparison is written for this grape yet.'
  };
  return V53_SYNTH[r.slug];
}
if (typeof v32DeckDef === 'function') {
  var _v53GrapeDeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    var m = /^grape:(.+)$/.exec(String(id || ''));
    if (!m) return _v53GrapeDeckDef.apply(this, arguments);
    var r = v53GrapeFind(m[1]);
    var card = v53GrapeCardRec(r);
    var def = { id: String(id), kind: 'grape', name: r ? 'The card for ' + r.name : 'A grape card', cards: (card && typeof v32GrapeCards === 'function') ? v32GrapeCards([card]) : [] };
    try { def.learnt = (typeof v32Learnt === 'function') ? v32Learnt(def) : 0; } catch (e) { def.learnt = 0; }
    return def;
  };
}
/* A one card deck has nothing to narrow: the whites and reds chips leave its screen. */
if (typeof v32DeckHtml === 'function') {
  var _v53DeckHtml = v32DeckHtml;
  v32DeckHtml = function () {
    var html = _v53DeckHtml.apply(this, arguments);
    try {
      if (/^grape:/.test(String(S._v32deck || ''))) html = String(html).replace(/<details class="secs v32narrow">[\s\S]*?<\/details>/, '');
    } catch (e) { }
    return html;
  };
}
/* A grape's deck and its card light Grapes; the deck screen climbs to the grape. */
if (typeof v25NavWord === 'function') {
  var _v53GrapeNavWord = v25NavWord;
  v25NavWord = function () {
    try {
      var v = S.view, id = '';
      if (v === 'deck') id = String(S._v32deck || '');
      else if (v === 'housedeck' || v === 'flash') { var run = S._v32run; id = (run && run.v32) ? String(run.deckId || '') : ''; }
      if (/^grape:/.test(id)) return 'grapes';
    } catch (e) { }
    return _v53GrapeNavWord.apply(this, arguments);
  };
}
if (typeof v32ParentRoute === 'function') {
  var _v53GrapeParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      if (S.view === 'deck') {
        var m = /^grape:(.+)$/.exec(String(S._v32deck || ''));
        if (m && v53GrapeFind(m[1])) return { view: 'grape', arg: v53GrapeFind(m[1]).slug };
      }
    } catch (e) { }
    return _v53GrapeParentRoute.apply(this, arguments);
  };
}

/* =========== the grape's drill =========== */

function v53Hays(bank) {
  var at = V53_HAY.banks.indexOf(bank);
  if (at >= 0) return V53_HAY.hays[at];
  var hays = bank.map(function (q) {
    if (!q || typeof q !== 'object') return '';
    var ans = '';
    if (Array.isArray(q.opts) && typeof q.a === 'number') ans = q.opts[q.a];
    else if (typeof q.ans === 'string') ans = q.ans;
    return ' ' + v53cFold([q.q, ans, q.exp].join(' ')) + ' ';
  });
  V53_HAY.banks.push(bank);
  V53_HAY.hays.push(hays);
  return hays;
}
function v53GrapeQuestions(slug, lv) {
  var r = v53GrapeFind(slug);
  if (!r) return [];
  lv = lv || v53cLevel();
  var bank = [];
  try { bank = v53cList(LEVELS[lv].bank); } catch (e) { bank = []; }
  var keys = r.keys.filter(function (k) { return k.length >= 3; });
  var hays = v53Hays(bank);
  var out = bank.filter(function (q, i) {
    var h = hays[i];
    return !!h && keys.some(function (k) { return h.indexOf(' ' + k + ' ') >= 0; });
  });
  var tagged = v53CmsAll().filter(function (q) { return v53cList(q.grapes).some(function (n) { return v53GrapeKey(n) === r.slug; }); });
  return out.concat(tagged);
}
function v53StartGrapeDrill(slug) {
  var r = v53GrapeFind(slug);
  if (!r) { if (typeof toast === 'function') toast('That grape is not in the Codex.'); return false; }
  var qs = v53Shuffle(v53GrapeQuestions(r.slug));
  if (!qs.length) { if (typeof toast === 'function') toast('No questions name this grape at ' + v53Lv().name + ' yet.'); return false; }
  if (typeof stopTimer === 'function') stopTimer();
  S._fin = null; S._v25lt = null;
  S.mode = 'drill';
  S.section = 'Grape: ' + r.name;
  S._v53drill = 'grape:' + r.slug;
  S._again = function () { v53StartGrapeDrill(r.slug); };
  S.pool = qs; S.idx = 0; S.correct = 0; S.results = [];
  if (typeof resetQ === 'function') resetQ();
  S.view = 'quiz';
  try { if (typeof V32 !== 'undefined' && V32 && !(typeof V32_RUN !== 'undefined' && V32_RUN && V32_RUN[V32.view])) V32.pend = 'push'; } catch (e) { }
  render();
  return true;
}
/* codex19's report drills a section by its name: a grape's section or a
   subject's section with its prefix deals that drill again. */
if (typeof startDrill === 'function') {
  var _v53StartDrillGrape = startDrill;
  startDrill = function (cat) {
    try {
      var c = v53cStr(cat);
      var bank = (typeof QUESTIONS !== 'undefined' && Array.isArray(QUESTIONS)) ? QUESTIONS : [];
      if (c && !bank.some(function (q) { return q && q.cat === c; })) {
        var m = /^Grape: (.+)$/.exec(c);
        if (m) { var s = v53GrapeKey(m[1]); if (s) return v53StartGrapeDrill(s); }
        var n = /^CMS: (.+)$/.exec(c);
        if (n) {
          var hit = null;
          v53SubjectList().some(function (x) { if (v53cStr(x.name) === n[1]) { hit = x; return true; } return false; });
          if (hit) return v53StartDrill(hit.id, 'both');
        }
      }
    } catch (e) { }
    return _v53StartDrillGrape.apply(this, arguments);
  };
}

/* =========== the Court's grid: the lines, the marking, the record =========== */

/* The sheet's parts and lines, exactly as CMS.grid prints them for a colour. */
function v53SheetLines(colour) {
  var g = v53CourtGrid(colour);
  var parts = [];
  var col = v53cObj(g.colour);
  if (v53cList(col.options).length) parts.push({ id: 'sight', title: 'Sight', lines: [{ key: 'colour', kind: 'one', label: v53cStr(col.label) || 'The primary colour', options: v53cList(col.options) }] });
  var fruit = [];
  v53cList(g.fruit).forEach(function (f) {
    var k = v53cStr(f && f.key);
    if (!k) return;
    fruit.push({ key: 'fruit-' + k, fk: k, kind: 'yesno', label: v53cStr(f.label), note: v53cStr(f.note) });
    fruit.push({ key: 'word-' + k, fk: k, kind: 'word', label: v53cStr(f.label) + ', the fruit named' });
  });
  if (fruit.length) parts.push({ id: 'fruit', title: 'Fruit', lines: fruit });
  var cond = v53cObj(g.condition);
  if (v53cList(cond.options).length) parts.push({ id: 'condition', title: 'Fruit condition', lines: [
    { key: 'nose', kind: 'pick2', label: 'Nose', note: v53cStr(cond.nose), options: v53cList(cond.options) },
    { key: 'palate', kind: 'pick2', label: 'Palate', note: v53cStr(cond.palate), options: v53cList(cond.options) }
  ] });
  var non = v53cList(g.nonFruit).filter(function (n) { return n && v53cStr(n.key); }).map(function (n) { return { key: 'non-' + n.key, nk: n.key, kind: 'yesno', label: v53cStr(n.label) }; });
  if (non.length) parts.push({ id: 'nonfruit', title: 'Non fruit', note: v53cStr(g.nonFruitNote), lines: non });
  var st = v53cList(g.structure).filter(function (s) { return s && v53cStr(s.key); }).map(function (s) { return { key: 'st-' + s.key, sk: s.key, kind: 'one', label: v53cStr(s.label), options: v53cList(s.options) }; });
  if (st.length) parts.push({ id: 'structure', title: 'Structure', lines: st });
  var con = v53cObj(g.conclusion);
  var gr = v53cObj(con.grape), cl = v53cObj(con.climate), co = v53cObj(con.country), ag = v53cObj(con.age);
  parts.push({ id: 'conclusion', title: 'Conclusion', lines: [
    { key: 'grape', kind: 'grape', label: v53cStr(gr.label) || 'Primary grape variety', note: v53cStr(gr.note) },
    { key: 'grape-why', kind: 'why', label: v53cStr(gr.explain) || 'Explain why:', why: 'grape' },
    { key: 'climate', kind: 'one', label: v53cStr(cl.label) || 'Climate', options: v53cList(cl.options) },
    { key: 'climate-why', kind: 'why', label: v53cStr(cl.explain) || 'Explain why:', why: 'climate' },
    { key: 'country', kind: 'text', label: v53cStr(co.label) || 'Country of origin' },
    { key: 'age', kind: 'one', label: v53cStr(ag.label) || 'Age range', options: v53cList(ag.options) }
  ] });
  parts.push({ id: 'sell', title: 'The sale', lines: [{ key: 'sell', kind: 'sell', label: v53cStr(g.sell) || 'Sell this wine to a guest in two sentences or less.' }] });
  return parts;
}
function v53LineLabel(colour, key) {
  var hit = '';
  v53SheetLines(colour).some(function (p) { return p.lines.some(function (l) { if (l.key === key) { hit = l.label; return true; } return false; }); });
  return hit || key;
}
function v53Want(v) { return Array.isArray(v) ? v.map(v53cStr).filter(Boolean) : (v53cStr(v) ? [v53cStr(v)] : []); }
function v53OrText(list) { return v53Want(list).join(' or '); }
/* A word in its singular, so pears is pear and cherries cherry. */
function v53One(w) { return String(w).replace(/ies$/, 'y').replace(/(ch|sh|x|ss)es$/, '$1').replace(/([^s])s$/, '$1'); }
function v53WordOk(a, words) {
  var f = v53cFold(a);
  if (!f || f === 'none') return false;
  var hay = ' ' + f.split(' ').map(v53One).join(' ') + ' ';
  return v53cList(words).some(function (w) {
    var k = v53cFold(w).split(' ').map(v53One).join(' ');
    return !!k && hay.indexOf(' ' + k + ' ') >= 0;
  });
}
function v53CountryOk(a, want) {
  var x = v53cFold(a), w = v53cFold(want);
  if (!x || !w) return false;
  var hay = ' ' + x + ' ';
  if (hay.indexOf(' ' + w + ' ') >= 0) return true;
  if (V53_US.indexOf(w) >= 0) return V53_US.some(function (k) { return hay.indexOf(' ' + k + ' ') >= 0; });
  if (w === 'new zealand') return hay.indexOf(' nz ') >= 0;
  return false;
}
/* Sentences counted by their stops; a last one without its stop still counts. */
function v53Sentences(s) {
  var t = v53cStr(s);
  if (!t) return 0;
  var m = t.match(/[.!?]+(?=\s|$)/g);
  var n = m ? m.length : 0;
  if (!/[.!?]\W*$/.test(t)) n++;
  return n;
}
/* One sheet marked line by line against one read: { lines: [{ key, label,
   ok, want, got }], right, total, grapeOk }. The Explain why lines are not
   marked; a line the read does not carry is not counted. */
function v53GridGrade(read, answers, colour, slug) {
  read = v53cObj(read);
  answers = v53cObj(answers);
  var out = { lines: [], right: 0, total: 0, grapeOk: false };
  var add = function (l, ok, want, got) {
    out.lines.push({ key: l.key, label: l.label, ok: !!ok, want: String(want == null ? '' : want), got: String(got == null ? '' : got) });
    out.total++;
    if (ok) out.right++;
  };
  var fruit = v53cObj(read.fruit), cond = v53cObj(read.condition), yes = v53cList(read.nonFruit), st = v53cObj(read.structure);
  v53SheetLines(colour).forEach(function (part) {
    part.lines.forEach(function (l) {
      var a = answers[l.key];
      var one = v53cStr(Array.isArray(a) ? '' : a);
      var w;
      if (l.kind === 'why') return;
      if (l.key === 'colour') { w = v53Want(read.colour); if (w.length) add(l, w.indexOf(one) >= 0, v53OrText(w), one); return; }
      if (l.kind === 'yesno' && l.fk) { if (!v53Own(fruit, l.fk)) return; w = v53cList(fruit[l.fk]).length ? 'Yes' : 'No'; add(l, one === w, w, one); return; }
      if (l.kind === 'word') {
        var words = v53cList(fruit[l.fk]).map(v53cStr).filter(Boolean);
        if (!words.length) return;
        add(l, v53cStr(answers['fruit-' + l.fk]) === 'Yes' && v53WordOk(one, words), words.join(', '), one);
        return;
      }
      if (l.kind === 'pick2') {
        w = v53Want(cond[l.key]);
        if (!w.length) return;
        var picks = v53cList(a).map(v53cStr).filter(Boolean);
        add(l, picks.length >= 1 && picks.length <= 2 && picks.every(function (p) { return w.indexOf(p) >= 0; }), v53OrText(w), picks.join(', '));
        return;
      }
      if (l.kind === 'yesno' && l.nk) { w = yes.indexOf(l.nk) >= 0 ? 'Yes' : 'No'; add(l, one === w, w, one); return; }
      if (l.sk) { if (st[l.sk] == null) return; w = v53Want(st[l.sk]); add(l, w.indexOf(one) >= 0, v53OrText(w), one); return; }
      if (l.key === 'grape') {
        var ok = !!slug && one === slug;
        out.grapeOk = ok;
        add(l, ok, v53GrapeLabel(v53GrapeFind(slug)) || slug, one ? v53GrapeLabel(v53GrapeFind(one)) || one : '');
        return;
      }
      if (l.key === 'climate' || l.key === 'age') { w = v53Want(read[l.key]); if (w.length) add(l, w.indexOf(one) >= 0, v53OrText(w), one); return; }
      if (l.key === 'country') { if (v53cStr(read.country)) add(l, v53CountryOk(one, read.country), v53cStr(read.country), one); return; }
      if (l.key === 'sell') {
        var n = v53Sentences(one);
        add(l, n >= 1 && n <= 2 && answers.sellMark === 'right', v53cStr(read.sell), one);
      }
    });
  });
  return out;
}
/* The sheet a perfect taster would hand in for a read (the gates' fixture). */
function v53GridPerfect(read, colour, slug) {
  read = v53cObj(read);
  var a = {};
  var fruit = v53cObj(read.fruit), cond = v53cObj(read.condition), yes = v53cList(read.nonFruit), st = v53cObj(read.structure);
  v53SheetLines(colour).forEach(function (part) {
    part.lines.forEach(function (l) {
      if (l.key === 'colour') a.colour = v53Want(read.colour)[0] || '';
      else if (l.kind === 'yesno' && l.fk) a[l.key] = v53cList(fruit[l.fk]).length ? 'Yes' : 'No';
      else if (l.kind === 'word') a[l.key] = v53cList(fruit[l.fk]).length ? v53cStr(fruit[l.fk][0]) : 'None';
      else if (l.kind === 'pick2') a[l.key] = v53Want(cond[l.key]).slice(0, 2);
      else if (l.kind === 'yesno' && l.nk) a[l.key] = yes.indexOf(l.nk) >= 0 ? 'Yes' : 'No';
      else if (l.sk) a[l.key] = v53Want(st[l.sk])[0] || '';
      else if (l.key === 'grape') a.grape = slug;
      else if (l.key === 'climate' || l.key === 'age') a[l.key] = v53Want(read[l.key])[0] || '';
      else if (l.key === 'country') a.country = v53cStr(read.country);
      else if (l.key === 'sell') { a.sell = v53cStr(read.sell); a.sellMark = 'right'; }
    });
  });
  return a;
}

function v53CourtGridKey() {
  try {
    return (typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function') ? OOT.profiles.key(V53_COURT_SLOT) : V53_COURT_SLOT;
  } catch (e) { return V53_COURT_SLOT; }
}
/* { slug: { n, c, lines: { key: { n, c } } } }, per device, never exported. */
function v53CourtGridRec() {
  try {
    var s = (typeof localStorage !== 'undefined' && localStorage) ? localStorage.getItem(v53CourtGridKey()) : null;
    var o = s ? JSON.parse(s) : null;
    return (o && typeof o === 'object' && !Array.isArray(o)) ? o : {};
  } catch (e) { return {}; }
}
function v53CourtGridNote(slug, lines, glass) {
  if (!slug) return;
  try {
    var o = v53CourtGridRec();
    var r = v53cObj(o[slug]);
    r.n = Number(r.n) || 0;
    r.c = Number(r.c) || 0;
    r.lines = v53cObj(r.lines);
    if (glass) { r.n++; if (glass.grapeOk) r.c++; }
    v53cList(lines).forEach(function (l) {
      var t = v53cObj(r.lines[l.key]);
      t.n = (Number(t.n) || 0) + 1;
      t.c = (Number(t.c) || 0) + (l.ok ? 1 : 0);
      r.lines[l.key] = t;
    });
    o[slug] = r;
    if (typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(v53CourtGridKey(), JSON.stringify(o));
  } catch (e) { }
}

/* =========== a glass, the drill's and the run's =========== */

function v53GrapeChoices(slug, colour) {
  var J = v53GrapeJoin();
  var same = [];
  v53TastingList().forEach(function (t) {
    if (t.colour !== colour) return;
    var s = v53GrapeResolve(J, t.name);
    if (s && s !== slug && same.indexOf(s) < 0) same.push(s);
  });
  return v53Shuffle(v53Shuffle(same).slice(0, 5).concat([slug]));
}
function v53NewGlass(slug, colour, named) {
  var reads = v53ReadsOf(slug);
  if (!reads.length) return null;
  var e = v53cObj(v53GridReads()[slug]);
  var col = colour || (v53cStr(e.colour) === 'red' ? 'red' : 'white');
  var ix = Math.floor(Math.random() * reads.length);
  return { grape: slug, colour: col, read: ix, region: v53cStr(reads[ix].region), choices: v53GrapeChoices(slug, col), answers: {}, marked: null, sellMark: '', named: !!named };
}
function v53GlassRead(gl) { return gl ? (v53ReadsOf(gl.grape)[gl.read] || null) : null; }
/* The tasting list's grapes that carry a grid read, of a colour or both. */
function v53PourList(colour) {
  var J = v53GrapeJoin();
  var out = [];
  v53TastingList().forEach(function (t) {
    if (colour && t.colour !== colour) return;
    var s = v53GrapeResolve(J, t.name);
    if (s && !out.some(function (x) { return x.slug === s; }) && v53ReadsOf(s).length) out.push({ slug: s, colour: t.colour });
  });
  return out;
}
function v53DealGlass(slug, colour) {
  if (slug) { var r = v53GrapeFind(slug); return r ? v53NewGlass(r.slug, '', true) : null; }
  var list = v53PourList(colour || '');
  if (!list.length) return null;
  var x = list[Math.floor(Math.random() * list.length)];
  return v53NewGlass(x.slug, x.colour, false);
}
function v53CurGlass() {
  if (S.view === 'courttasting') { var tg = S._v53tg; return (tg && Array.isArray(tg.deck)) ? (tg.deck[tg.idx] || null) : null; }
  return S._v53grid || null;
}
function v53GlassGrade(gl) {
  var a = {};
  Object.keys(gl.answers || {}).forEach(function (k) { a[k] = gl.answers[k]; });
  a.sellMark = gl.sellMark || '';
  return v53GridGrade(v53GlassRead(gl), a, gl.colour, gl.grape);
}

/* =========== the clock of the Village tasting, codex39's rule =========== */

function v53Fmt(s) {
  var n = Math.max(0, Math.floor(Number(s) || 0));
  var m = Math.floor(n / 60), ss = n % 60;
  return m + ':' + (ss < 10 ? '0' : '') + ss;
}
function v53ClockText(s) { return s > 0 ? v53Fmt(s) + ' left' : 'Time is up: finish your calls'; }
function v53ClockStop() {
  if (V53_CLOCK.timer) { try { clearInterval(V53_CLOCK.timer); } catch (e) { } V53_CLOCK.timer = null; }
}
function v53ClockNow(tg) {
  if (typeof tg.clockEnd === 'number') tg.clock = Math.max(0, Math.ceil((tg.clockEnd - Date.now()) / 1000));
  return tg.clock;
}
/* leaving the run: keep what is left and drop the end time */
function v53ClockHold() {
  var tg = S._v53tg;
  if (tg && typeof tg.clockEnd === 'number') { v53ClockNow(tg); tg.clockEnd = null; }
  v53ClockStop();
}
function v53ClockTick() {
  var tg = S._v53tg;
  if (!tg || S.view !== 'courttasting' || typeof tg.clock !== 'number') { v53ClockStop(); return; }
  v53ClockNow(tg);
  try { var n = document.getElementById('v53-clock'); if (n) n.textContent = v53ClockText(tg.clock); } catch (e) { }
  if (tg.clock <= 0) v53ClockStop();
}
function v53ClockStart() {
  if (V53_CLOCK.timer) return;
  try { V53_CLOCK.timer = setInterval(v53ClockTick, 1000); } catch (e) { V53_CLOCK.timer = null; }
}
function v53ClockHtml(tg) {
  if (typeof tg.clockEnd !== 'number' && tg.clock > 0) tg.clockEnd = Date.now() + tg.clock * 1000;
  v53ClockNow(tg);
  if (tg.clock > 0) v53ClockStart(); else v53ClockStop();
  return '<p class="v53-clock" id="v53-clock" role="timer">' + v53Esc(v53ClockText(tg.clock)) + '</p>';
}
if (typeof render === 'function') {
  var _v53Render = render;
  render = function () {
    var out = _v53Render.apply(this, arguments);
    try { if (S.view !== 'courttasting') v53ClockHold(); } catch (e) { }
    return out;
  };
}

/* The run: two whites then two reds, one read each, the clock at 30 minutes.
   Again (Pour another flight) deals in place, so the entry is replaced. */
function v53TastingDeal() {
  var pick = function (colour) { return v53Shuffle(v53PourList(colour)).slice(0, 2); };
  var w = pick('white'), r = pick('red');
  if (w.length < 2 || r.length < 2) return null;
  return w.concat(r).map(function (x) { return v53NewGlass(x.slug, x.colour, false); });
}
function v53TastingStart(again) {
  var deck = v53TastingDeal();
  if (!deck || deck.some(function (g) { return !g; })) {
    if (typeof toast === 'function') toast('The grid reads for two whites and two reds are not on this device yet.');
    return false;
  }
  v53ClockStop();
  var here = S.view === 'courttasting';
  S._v53tg = { deck: deck, idx: 0, results: [], clock: V53_RUN_SECS, clockEnd: null };
  S.view = 'courttasting';
  S._v25area = 'grapes';
  S._v53from = 'grapes';
  S._v28edit = false;
  try { if (typeof V32 !== 'undefined' && V32) V32.pend = (again || here) ? 'replace' : 'push'; } catch (e) { }
  render();
  try { window.scrollTo(0, 0); } catch (e) { }
  if (typeof v25FocusMain === 'function') { try { v25FocusMain(); } catch (e) { } }
  return true;
}

/* =========== the sheet =========== */

function v53OptHtml(type, name, k, value, label, checked, off) {
  return '<label class="v53-opt"><input type="' + type + '" name="' + v53Esc(name) + '" value="' + v53Esc(value) + '" data-k="' + v53Esc(k) + '"'
    + (checked ? ' checked' : '') + (off ? ' disabled' : '') + '><span>' + v53Esc(label) + '</span></label>';
}
function v53MarkHtml(m, show) {
  if (!m) return '';
  var text = m.ok ? 'Right' : (show || ('Wrong: ' + (m.want ? 'the read is ' + m.want : 'left blank')));
  return '<span class="v53-mark ' + (m.ok ? 'v53-ok' : 'v53-no') + '">' + v53Esc(text) + '</span>';
}
function v53LineHtml(l, gl, m, rd) {
  var a = gl.answers[l.key];
  var off = !!gl.marked;
  var id = 'v53-l-' + l.key;
  var name = 'v53g-' + l.key;
  var one = Array.isArray(a) ? '' : v53cStr(a);
  if (l.kind === 'one' || l.kind === 'yesno' || l.kind === 'grape') {
    var opts = l.kind === 'yesno' ? [['Yes', 'Yes'], ['No', 'No']]
      : (l.kind === 'grape' ? v53cList(gl.choices).map(function (s) { return [s, v53GrapeLabel(v53GrapeFind(s)) || s]; })
        : v53cList(l.options).map(function (o) { return [v53cStr(o), v53cStr(o)]; }));
    return '<div class="v53-line" role="radiogroup" aria-labelledby="' + id + '"><span class="v53-label" id="' + id + '">' + v53Esc(l.label) + '</span>'
      + (l.note ? '<span class="v53-lnote">' + v53Esc(l.note) + '</span>' : '')
      + '<span class="v53-opts">' + opts.map(function (o) { return v53OptHtml('radio', name, l.key, o[0], o[1], one === o[0], off); }).join('') + '</span>'
      + v53MarkHtml(m) + '</div>';
  }
  if (l.kind === 'pick2') {
    var picks = v53cList(a).map(v53cStr);
    return '<div class="v53-line" role="group" aria-labelledby="' + id + '"><span class="v53-label" id="' + id + '">' + v53Esc(l.label) + '</span>'
      + (l.note ? '<span class="v53-lnote">' + v53Esc(l.note) + '</span>' : '')
      + '<span class="v53-opts">' + v53cList(l.options).map(function (o) { return v53OptHtml('checkbox', name, l.key, v53cStr(o), v53cStr(o), picks.indexOf(v53cStr(o)) >= 0, off); }).join('') + '</span>'
      + v53MarkHtml(m) + '</div>';
  }
  if (l.kind === 'word' || l.kind === 'text' || l.kind === 'why') {
    var hint = l.kind === 'word' ? 'One specific fruit, or None' : (l.kind === 'text' ? 'The country' : 'Your reasons');
    var label = l.kind === 'word' ? 'Name one' : l.label;
    var html = '<div class="v53-line v53-textline' + (l.kind === 'word' ? ' v53-wordline' : '') + '"><label class="v53-label" for="' + id + '">' + v53Esc(label) + '</label>'
      + '<input type="text" id="' + id + '" data-k="' + v53Esc(l.key) + '" value="' + v53Esc(one) + '" placeholder="' + v53Esc(hint) + '"'
      + (l.kind === 'word' ? ' aria-label="' + v53Esc(l.label + ': one specific fruit, or None') + '"' : '')
      + ' autocomplete="off" autocapitalize="off" spellcheck="false"' + (off ? ' disabled' : '') + '>';
    if (l.kind === 'why' && off && rd) {
      var why = v53cStr(v53cObj(rd.why)[l.why]);
      if (why) html += '<span class="v53-lnote">' + v53Esc('The read: ' + why) + '</span>';
    }
    return html + v53MarkHtml(m) + '</div>';
  }
  if (l.kind === 'sell') {
    var out = '<div class="v53-line v53-textline v53-sellline"><label class="v53-label" for="' + id + '">' + v53Esc(l.label) + '</label>'
      + '<textarea id="' + id + '" data-k="sell" rows="3" placeholder="Two sentences or fewer"' + (off ? ' disabled' : '') + '>' + v53Esc(one) + '</textarea>';
    if (off && rd) {
      out += '<span class="v53-lnote">' + v53Esc('The read: ' + v53cStr(rd.sell)) + '</span>';
      var n = v53Sentences(one);
      if (!one) out += v53MarkHtml(m, 'Wrong: left blank');
      else if (n > 2) out += v53MarkHtml(m, 'Wrong: ' + v53cWords(n) + ' sentences, where the Court asks for two or fewer');
      else if (!gl.sellMark) out += '<span class="v53-self" role="group" aria-label="Mark your sale against the read">'
        + v53Act('btn small gold', 'gself', ' data-ok="1" id="v53-self-right"', 'Right: it sells the wine')
        + v53Act('btn small ghost', 'gself', ' data-ok="0" id="v53-self-wrong"', 'Wrong: it misses') + '</span>';
      else out += v53MarkHtml(m, 'Wrong, by your own mark');
    }
    return out + '</div>';
  }
  return '';
}
/* The structure with no glass to hand: codex20's sensations at the read's steps. */
function v53CluesHtml(gl, rd) {
  var ev = null;
  try { ev = (typeof TASTE_EVIDENCE !== 'undefined' && TASTE_EVIDENCE) ? TASTE_EVIDENCE : null; } catch (e) { ev = null; }
  var st = v53cObj(rd.structure);
  var grid = v53CourtGrid(gl.colour);
  var opts = {};
  v53cList(grid.structure).forEach(function (s) { if (s && s.key) opts[s.key] = v53cList(s.options); });
  var lines = [];
  [['acidity', 'acid'], ['tannin', 'tan'], ['alcohol', 'alc']].forEach(function (p) {
    if (!ev || !Array.isArray(ev[p[1]]) || st[p[0]] == null || !opts[p[0]]) return;
    var i = v53cList(opts[p[0]]).indexOf(v53Want(st[p[0]])[0]);
    if (i >= 0 && ev[p[1]][i]) lines.push(ev[p[1]][i]);
  });
  var where = [v53cStr(rd.region), v53cStr(rd.country)].filter(Boolean).join(', ');
  return '<details class="v53-clues"><summary>No glass to hand: what it shows</summary><div class="v53-cluebody">'
    + (lines.length ? '<p class="v53-lnote">On the palate, in the order the grid asks:</p>' + v53Lines(lines) : '')
    + (where ? '<details class="v53-clues"><summary>Where it grew, if you need it</summary><p>' + v53Esc(where) + '</p></details>' : '')
    + '</div></details>';
}
function v53SheetHtml(gl, ctx) {
  ctx = ctx || {};
  var rd = v53GlassRead(gl);
  var r = v53GrapeFind(gl && gl.grape);
  if (!rd || !r) return '<p class="v32-line">This glass cannot be poured: its grid read is not on this device.</p>';
  var marks = {};
  if (gl.marked) gl.marked.lines.forEach(function (m) { marks[m.key] = m; });
  var html = '<p class="v53-glass">' + v53Esc(ctx.prefix || '') + '</p>';
  if (gl.marked) {
    var m = gl.marked;
    var called = v53cStr(gl.answers.grape);
    html += '<div class="v53-verdict" id="v53-verdict" tabindex="-1"><p class="v53-ready-big">' + v53Esc(v53Num(m.right) + ' of ' + v53Num(m.total) + ' lines right.') + '</p>'
      + '<p>' + v53Esc('It was ' + r.name + ', ' + [v53cStr(rd.region), v53cStr(rd.country)].filter(Boolean).join(', ') + '. '
        + (m.grapeOk ? 'You named the grape.' : (called ? 'You called it ' + (v53GrapeLabel(v53GrapeFind(called)) || called) + '.' : 'No grape was called.'))) + '</p></div>';
  } else html += v53CluesHtml(gl, rd);
  html += '<form class="v53-sheet" action="#" novalidate>' + v53SheetLines(gl.colour).map(function (p) {
    return '<fieldset class="v53-part" id="v53-part-' + p.id + '"><legend>' + v53Esc(p.title) + '</legend>'
      + (p.note ? '<p class="v53-lnote">' + v53Esc(p.note) + '</p>' : '')
      + p.lines.map(function (l) { return v53LineHtml(l, gl, marks[l.key], rd); }).join('') + '</fieldset>';
  }).join('') + '</form>';
  var acts = '';
  if (!gl.marked) acts = v53Act('btn gold', 'gmark', ' id="v53-gmark"', 'Mark the sheet');
  else if (ctx.run) acts = v53Act('btn gold', 'gnext', ' id="v53-gnext"', ctx.last ? 'See the tally' : 'Next glass');
  else {
    acts = v53Act('btn gold', 'gpour', ' data-grape="' + v53Esc(gl.named ? gl.grape : '') + '" data-colour="" id="v53-gpour"', gl.named ? 'Pour another glass of ' + r.name : 'Pour another glass')
      + v53GoBtn('btn ghost', 'grape', r.slug, r.name + ', the page', 'v53-glass-grape');
  }
  return html + '<div class="v28-btnrow v53-acts">' + acts + '</div>';
}

/* =========== the Court's grid drill =========== */

function v53GridDrillHtml() {
  var named = v53cStr(S._v53gridGrape);
  var nr = named ? v53GrapeFind(named) : null;
  var html = '<div class="v25page v53 v53-sheetpage">' + v32Head('The Court’s grid', nr ? nr.name + ', on the Court’s lines' : 'One glass on the Court’s lines, every line answered');
  var gl = S._v53grid;
  var live = !!gl && (nr ? (gl.named && gl.grape === nr.slug) : !gl.named);
  if (live) return html + v53SheetHtml(gl, { prefix: nr ? nr.name + ', from a region the Court examines' : 'A ' + gl.colour + ', poured blind' }) + '</div>';
  var c = v53Cms();
  var lead = v53cStr(c && c.grid && c.grid.instructions);
  if (lead) html += '<p class="v39-lead">' + v53Esc(lead) + '</p>';
  html += '<p class="v32-line">Each line is marked against what the grid reads for the wine: the colour, the fruit and its condition, every non fruit line, the structure, the conclusion and the sale.</p>';
  var acts = '';
  if (nr && v53ReadsOf(nr.slug).length) acts += v53Act('btn gold', 'gpour', ' data-grape="' + v53Esc(nr.slug) + '" data-colour="" id="v53-pour-named"', 'Pour a glass of ' + nr.name);
  else {
    if (nr) html += '<p class="v32-line">' + v53Esc('What the grid reads for ' + nr.name + ' is not written yet; a blind glass from the tasting list is.') + '</p>';
    if (v53PourList('').length) {
      acts += v53Act('btn gold', 'gpour', ' data-grape="" data-colour="" id="v53-pour-any"', 'Pour a glass');
      if (v53PourList('white').length) acts += v53Act('btn ghost', 'gpour', ' data-grape="" data-colour="white" id="v53-pour-white"', 'Pour a white');
      if (v53PourList('red').length) acts += v53Act('btn ghost', 'gpour', ' data-grape="" data-colour="red" id="v53-pour-red"', 'Pour a red');
    } else html += '<p class="v32-line">What the grid reads is not on this device yet.</p>';
  }
  if (acts) html += '<div class="v28-btnrow v53-acts">' + acts + '</div>';
  html += v32Group('On the grid', v32GoRow('courttasting', 'The Village tasting', 'Four wines, two white and two red, on the Court’s grid, 30 minutes')
    + v32GoRow('cmsgrid', 'The deductive grid', 'Both grids, line by line, as the Court prints them'), 'v53-gd-more');
  return html + '</div>';
}

/* =========== the Village tasting on the Court's grid =========== */

function v53TallyHtml(tg) {
  var named = 0, right = 0, total = 0;
  var rows = tg.deck.map(function (gl, i) {
    var r = v53GrapeFind(gl.grape);
    var rd = v53GlassRead(gl);
    var m = gl.marked;
    if (m) { right += m.right; total += m.total; if (m.grapeOk) named++; }
    var called = v53cStr(gl.answers && gl.answers.grape);
    var line = m ? ((m.grapeOk ? 'Named right' : (called ? 'Called ' + (v53GrapeLabel(v53GrapeFind(called)) || called) : 'No grape called')) + ' · ' + v53Num(m.right) + ' of ' + v53Num(m.total) + ' lines') : 'Not marked';
    return v32GoRow('grape', 'Glass ' + (i + 1) + ', ' + gl.colour + ': ' + (r ? r.name : gl.grape) + (rd && rd.region ? ', ' + rd.region : ''), line, gl.grape);
  }).join('');
  var html = '<div class="v53-verdict" id="v53-verdict" tabindex="-1"><p class="v53-ready-big">' + v53Esc(v53Num(named) + ' of ' + v53Num(tg.deck.length) + ' grapes named, ' + v53Num(right) + ' of ' + v53Num(total) + ' lines right.') + '</p>'
    + '<p>' + v53Esc(tg.clock > 0 ? 'Finished with ' + v53Fmt(tg.clock) + ' left on the clock.' : 'Time was called before the last line.') + '</p></div>';
  html += v32Group('The flight', rows, 'v53-tally');
  html += '<div class="v28-btnrow v53-acts">' + v53Act('btn gold', 'gagain', ' id="v53-gagain"', 'Pour another flight') + v53GoBtn('btn ghost', 'grapes', '', 'All grapes', 'v53-tally-grapes') + '</div>';
  return html;
}
function v53CourtTastingHtml() {
  var tg = S._v53tg;
  var html = '<div class="v25page v53 v53-sheetpage v53-run">' + v32Head('The Village tasting', 'Four wines, two white then two red, on the Court’s grid, 30 minutes');
  if (!tg || !Array.isArray(tg.deck) || !tg.deck.length) {
    html += '<p class="v39-lead">Four glasses, the whites first, each answered on every line of the Court’s grid, under one clock. The clock reads a word when it is up and never stops the run; leaving the screen holds it.</p>'
      + '<p class="v32-line">The syllabus gives the tasting the 8:15 to 8:45 slot, 30 minutes, and this run keeps it; the Court’s exam guide has named 45 minutes for four wines.</p>';
    if (v53PourList('white').length >= 2 && v53PourList('red').length >= 2) html += '<div class="v28-btnrow v53-acts">' + v53Act('btn gold', 'grunstart', ' id="v53-grunstart"', 'Pour the flight') + '</div>';
    else html += '<p class="v32-line">What the grid reads for two whites and two reds is not on this device yet.</p>';
    html += v32Group('On the grid', v32GoRow('griddrill', 'The Court’s grid drill', 'One glass at a time, no clock') + v32GoRow('cmsgrid', 'The deductive grid', 'Both grids, line by line, as the Court prints them'), 'v53-ct-more');
    return html + '</div>';
  }
  if (tg.idx >= tg.deck.length) { v53ClockHold(); return html + v53TallyHtml(tg) + '</div>'; }
  var gl = tg.deck[tg.idx];
  html += v53ClockHtml(tg);
  return html + v53SheetHtml(gl, { run: true, last: tg.idx + 1 >= tg.deck.length, prefix: 'Glass ' + (tg.idx + 1) + ' of ' + tg.deck.length + ' · ' + gl.colour }) + '</div>';
}

/* =========== the grapes root and a grape's page =========== */

function v53GrapeRowHtml(r, line) { return v32GoRow('grape', v53GrapeLabel(r), line, r.slug); }
function v53GrapeShort(r) {
  if (r.g && v53cStr(r.g.tell)) return v53cStr(r.g.tell);
  return v53NoStar(r.intro && r.intro.aroma);
}
function v53GrapesRootHtml() {
  var o = v53GrapeOrder();
  var html = '<div class="v25page v32-root v53 v53-grapes">' + v32Head('Grapes', 'Every grape the Codex profiles, the Court’s tasting list first');
  var jumps = [['v53-g-whites', 'Whites'], ['v53-g-reds', 'Reds'], ['v53-g-twenty', 'The Certified twenty'], ['v53-g-every', 'Every grape'], ['v53-g-tasting', 'Tasting']];
  html += '<nav class="v32chips v53-jumps" aria-label="On this page">' + jumps.map(function (j) {
    return '<button type="button" class="v28-chip" data-v53="jump" data-to="' + j[0] + '">' + v53Esc(j[1]) + '</button>';
  }).join('') + '</nav>';
  var sec = function (id, title, body) { return body ? '<section class="v32-sec v53-gsec" aria-labelledby="' + id + '"><h2 class="v32-h2" id="' + id + '" tabindex="-1">' + v53Esc(title) + '</h2>' + body + '</section>' : ''; };
  var group = function (id, title, rows) { return rows ? '<section class="v32-group" aria-labelledby="' + id + '"><h3 class="secgroup v32-gh" id="' + id + '" tabindex="-1">' + v53Esc(title) + '</h3>' + v32Rows(rows) + '</section>' : ''; };
  var tw = o.twenty.filter(function (r) { return r.colour === 'white'; }), tr = o.twenty.filter(function (r) { return r.colour !== 'white'; });
  var exam = function (r) { var p = v53ExamPlaces(r); return p.length ? 'Examinable: ' + p.join(', ') : ''; };
  if (o.twenty.length) {
    html += sec('v53-g-twenty', 'The Certified tasting list', '<p class="v32-line">' + v53Esc('The ' + v53cWords(o.twenty.length) + ' grapes of the tasting examination, each with the regions the Court examines.') + '</p>'
      + group('v53-g-twenty-w', 'The whites', tw.map(function (r) { return v53GrapeRowHtml(r, exam(r)); }).join(''))
      + group('v53-g-twenty-r', 'The reds', tr.map(function (r) { return v53GrapeRowHtml(r, exam(r)); }).join('')));
  }
  var rest = o.whites.length + o.reds.length;
  if (rest) {
    html += sec('v53-g-every', o.twenty.length ? 'Every other grape' : 'Every grape', '<p class="v32-line">' + v53Esc(v53cPlural(rest, 'more grape', 'more grapes') + ' the Codex profiles, by colour.') + '</p>'
      + group('v53-g-whites', 'Whites', o.whites.map(function (r) { return v53GrapeRowHtml(r, v53GrapeShort(r)); }).join(''))
      + group('v53-g-reds', 'Reds', o.reds.map(function (r) { return v53GrapeRowHtml(r, v53GrapeShort(r)); }).join('')));
  }
  var t = '';
  if (v53PourList('').length) t += v32GoRow('griddrill', 'The Court’s grid drill', 'One glass on every line of the Court’s grid, marked line by line');
  if (v53PourList('white').length >= 2 && v53PourList('red').length >= 2) t += v32GoRow('courttasting', 'The Village tasting', 'Four wines, two white and two red, on the Court’s grid, 30 minutes');
  if (typeof V25_GO !== 'undefined' && V25_GO) {
    if (typeof V25_GO.grid === 'function') t += v32GoRow('grid', 'The Blind Grid', 'The structure called from its sensations, then the grape');
    if (typeof V25_GO.flight === 'function') t += v32GoRow('flight', 'Blind flight', 'Six glasses, each named from its profile');
    if (typeof V25_GO.tastegrid === 'function') t += v32GoRow('tastegrid', 'Study the grid', 'The deductive method, step by step');
  }
  t += v32GoRow('cmsgrid', 'The deductive grid', 'Both grids, line by line, as the Court prints them');
  html += sec('v53-g-tasting', 'Tasting', v32Rows(t));
  var cards = '';
  if (typeof v32DeckRow === 'function') ['grapes', 'grapes:w', 'grapes:r', 'grapes-all'].forEach(function (d) { try { cards += v32DeckRow(d); } catch (e) { } });
  html += sec('v53-g-cards', 'Cards', v32Rows(cards));
  return html + '</div>';
}

function v53StepWord(n) { var x = Number(n); return (x >= 0 && x <= 3 && Math.floor(x) === x) ? V53_STEP_WORDS[x] : ''; }
function v53IntroWord(n) { var x = Number(n); return (x >= 0 && x <= 3 && Math.floor(x) === x) ? V53_INTRO_WORDS[x] : ''; }
function v53ProfileBody(r) {
  var html = '';
  var g = r.g, t = r.taste, i = r.intro;
  if (g && v53cStr(g.st)) html += '<h4>The structure</h4>' + v53Lines(String(g.st).split(' · '));
  if (t) {
    var calls = [['Acidity', t.acid], ['Tannin', r.colour === 'red' ? t.tan : null], ['Body', t.body], ['Alcohol', t.alc], ['Oak', t.oak]];
    html += '<h4>On the four steps</h4>' + v53Pairs(calls.filter(function (c) { return c[1] != null && v53StepWord(c[1]); }).map(function (c) { return [c[0], v53cCap(v53StepWord(c[1]))]; }));
    var world = { old: 'The Old World', 'new': 'The New World', both: 'Old World and New' }[t.world] || '';
    var sweet = t.sweet === 1 ? 'Often off dry' : (t.sweet === 2 ? 'Sweet' : (t.sweet === 0 ? 'Dry' : ''));
    html += v53Pairs([['Climate', v53cCap(v53cStr(t.clim))], ['Where it is grown', world], ['Sweetness', sweet], ['Age', v53cCap(v53cStr(t.age))]]);
  }
  if (i) {
    html += '<h4>As Régionale reads it</h4>' + v53Pairs([['Climate', v53cStr(i.clim)], ['Acidity', v53cCap(v53IntroWord(i.acid))], ['Body', v53cCap(v53IntroWord(i.body))],
      ['Tannin', r.colour === 'red' ? v53cCap(v53IntroWord(i.tan)) : ''], ['Sweetness', v53cStr(i.sweet)]]);
  }
  return html || '<p>The Codex has no structure written for this grape yet.</p>';
}
function v53FruitBody(r) {
  var g = r.g, i = r.intro, t = r.taste;
  var pairs = [];
  if (g) pairs.push(['Fruit', g.fruit], ['Non fruit', g.other]);
  if (i) pairs.push([g ? 'In brief' : 'Aromas', v53NoStar(i.aroma)]);
  if (t && v53StepWord(t.oak)) pairs.push(['Oak', v53cCap(v53StepWord(t.oak)) + ' on the four steps']);
  return v53Pairs(pairs);
}
function v53TellBody(r) {
  var g = r.g, i = r.intro;
  var pairs = [];
  if (g) pairs.push(['The tell', g.tell], ['Not to be confused with', g.confuse]);
  if (i) pairs.push(['The trap', v53NoStar(i.trap)], ['Also called', v53NoStar(i.syn)], ['Wines to know', v53NoStar(i.wines)]);
  return v53Pairs(pairs);
}
/* A door to a region article or a country page, or '' when neither is in the data. */
function v53PlaceDoor(slug, note) {
  var a = null, c = null;
  try { a = (typeof v39Find === 'function') ? v39Find(slug) : null; } catch (e) { a = null; }
  if (a) return v53Door('regions', 'region:' + slug, v53cStr(a.name) || slug, note);
  try { c = (typeof v39Country === 'function') ? v39Country(slug) : null; } catch (e) { c = null; }
  if (c) return v53Door('regions', 'country:' + slug, v53cStr(c.name) || slug, note);
  return '';
}
/* What a loaded reading says of the grape in a region: its role and styles. */
function v53ReadingNote(slug, r) {
  var a = null;
  try { a = (typeof v39Find === 'function') ? v39Find(slug) : null; } catch (e) { a = null; }
  if (!a || !Array.isArray(a.grapes)) return null;
  var hit = null;
  a.grapes.some(function (g) { if (g && v53cStr(g.name) && v53GrapeKey(g.name) === r.slug) { hit = g; return true; } return false; });
  return hit ? [v53cStr(hit.role), v53cStr(hit.styles)].filter(Boolean).join(': ') : '';
}
function v53RegionsBody(r) {
  var html = '';
  var ex = v53Examinable(r);
  var examSlugs = v53ExamSlugs(r);
  if (ex.length) {
    html += '<h4>Examinable at Certified</h4><ul class="v39-lines v53-exam">' + ex.map(function (e) {
      var doors = e.doors.map(function (d) { return v53PlaceDoor(d.slug, ''); }).filter(Boolean).join('');
      return '<li><span class="v53-exline">' + v53Esc(e.line) + '</span>' + (doors ? '<ul class="v39-lines v39-list v53-doors">' + doors + '</ul>' : '') + '</li>';
    }).join('') + '</ul>';
  }
  var g = r.g, i = r.intro;
  var text = [];
  if (g && v53cStr(g.regions)) text.push(['The classic regions', g.regions]);
  if (i && v53cStr(i.reg)) text.push([g ? 'In brief' : 'The classic regions', v53NoStar(i.reg)]);
  var star = i ? v53StarPlaces(i.reg) : [];
  if (star.length) text.push(['The regions that name it', star.join('; ')]);
  html += v53Pairs(text);
  var regions = '', countries = '', unread = 0;
  r.targets.forEach(function (t) {
    var isArticle = false;
    try { isArticle = typeof v39Find === 'function' && !!v39Find(t); } catch (e) { isArticle = false; }
    var note = examSlugs.indexOf(t) >= 0 ? 'Examinable at Certified' : '';
    if (isArticle) {
      var rn = v53ReadingNote(t, r);
      if (rn === null) unread++;
      else if (rn) note = note ? note + '. ' + rn : rn;
      regions += v53PlaceDoor(t, note);
    } else countries += v53PlaceDoor(t, note);
  });
  if (regions) html += '<h4>Region articles</h4><ul class="v39-lines v39-list v53-doors">' + regions + '</ul>';
  if (countries) html += '<h4>Countries</h4><ul class="v39-lines v39-list v53-doors">' + countries + '</ul>';
  if (regions && unread) html += '<p class="v53-note">More as the regions’ readings are read: each region’s page brings what it says of its grapes onto this device.</p>';
  return html || '<p>No region is joined to this grape yet.</p>';
}
function v53ReadTable(rd, r) {
  var grid = v53CourtGrid(r.colour);
  var rows = [];
  var col = v53cObj(grid.colour);
  rows.push([v53cStr(col.label) || 'Colour', v53OrText(rd.colour)]);
  var fruit = v53cObj(rd.fruit);
  v53cList(grid.fruit).forEach(function (f) {
    if (!f || !v53Own(fruit, f.key)) return;
    var w = v53cList(fruit[f.key]).map(v53cStr).filter(Boolean);
    rows.push([v53cStr(f.label), w.length ? 'Yes: ' + w.join(', ') : 'No']);
  });
  var cond = v53cObj(rd.condition);
  rows.push(['Fruit condition, nose', v53OrText(cond.nose)], ['Fruit condition, palate', v53OrText(cond.palate)]);
  var yes = v53cList(rd.nonFruit);
  var nf = v53cList(grid.nonFruit).filter(function (n) { return n && yes.indexOf(n.key) >= 0; }).map(function (n) { return v53cStr(n.label); });
  rows.push(['Non fruit, Yes', nf.length ? nf.join('; ') : 'None'], ['Non fruit, No', 'Every other line']);
  var st = v53cObj(rd.structure);
  v53cList(grid.structure).forEach(function (s) { if (s && st[s.key] != null) rows.push([v53cStr(s.label), v53OrText(st[s.key])]); });
  var con = v53cObj(grid.conclusion);
  rows.push([v53cStr(v53cObj(con.climate).label) || 'Climate', v53OrText(rd.climate)], [v53cStr(v53cObj(con.country).label) || 'Country', v53cStr(rd.country)], [v53cStr(v53cObj(con.age).label) || 'Age', v53OrText(rd.age)]);
  var why = v53cObj(rd.why);
  return '<table class="v53-reads"><caption class="sr-only">' + v53Esc('What the grid reads for ' + r.name + ', ' + v53cStr(rd.region)) + '</caption><tbody>'
    + rows.filter(function (x) { return v53cStr(x[0]) && v53cStr(x[1]); }).map(function (x) { return '<tr><th scope="row">' + v53Esc(x[0]) + '</th><td>' + v53Esc(x[1]) + '</td></tr>'; }).join('')
    + '</tbody></table>' + v53Pairs([['Why the grape', why.grape], ['Why the climate', why.climate], ['The sale', rd.sell]]);
}
function v53ReadsBody(r) {
  var reads = v53ReadsOf(r.slug);
  if (!reads.length) return '';
  var html = '<p>' + v53Esc('What a taster should mark on the Court’s grid for a classic ' + r.name + ' from ' + (reads.length === 1 ? 'its examinable region' : 'each of its examinable regions') + '.') + '</p>';
  html += reads.map(function (rd) { return '<h4>' + v53Esc(v53cStr(rd.region) || r.name) + '</h4>' + v53ReadTable(rd, r); }).join('');
  html += '<ul class="v39-lines v39-list v53-doors">' + v53Door('griddrill', r.slug, 'Pour a glass of ' + r.name + ' on the Court’s grid') + '</ul>';
  return html;
}
function v53GrapeCardsBody(r) {
  var lv = v53Lv();
  var rows = '';
  var def = null;
  try { def = v32DeckDef('grape:' + r.slug); } catch (e) { def = null; }
  if (def && def.cards && def.cards.length) {
    rows += '<li><button type="button" class="btn small ghost" data-v32="deck" data-deck="' + v53Esc('grape:' + r.slug) + '" id="v53-gcard">' + v53Esc('The card for ' + r.name) + '</button>'
      + '<span class="v53-note">' + v53Esc(def.learnt ? 'Learnt: you last marked it Got it.' : 'Not yet learnt.') + ' Graded with the grape decks.</span></li>';
  }
  var n = v53GrapeQuestions(r.slug).length;
  if (n) rows += '<li>' + v53Act('btn small ghost', 'gdrill', ' data-grape="' + v53Esc(r.slug) + '" id="v53-gdrill"', 'Drill this grape, ' + v53cPlural(n, 'question', 'questions'))
    + '<span class="v53-note">' + v53Esc('The ' + lv.name + ' questions that name it, with the CMS questions written to it.') + '</span></li>';
  var html = rows ? '<ul class="v39-lines v39-list v53-doors">' + rows + '</ul>' : '<p>' + v53Esc('No card or question names this grape at ' + lv.name + ' yet.') + '</p>';
  if (v53ReadsOf(r.slug).length) {
    var rec = v53cObj(v53CourtGridRec()[r.slug]);
    if (Number(rec.n) >= 1) {
      html += '<h4>On the Court’s grid</h4><p>' + v53Esc('Named right ' + v53Num(rec.c) + ' of ' + v53Num(rec.n) + (Number(rec.n) === 1 ? ' glass.' : ' glasses.')) + '</p>';
      var lines = v53cObj(rec.lines);
      var weak = Object.keys(lines).map(function (k) { var t = v53cObj(lines[k]); return { k: k, n: Number(t.n) || 0, c: Number(t.c) || 0 }; })
        .filter(function (x) { return x.n > 0 && x.c < x.n; })
        .sort(function (a, b) { return (a.c / a.n) - (b.c / b.n) || b.n - a.n; }).slice(0, 3);
      if (weak.length) html += '<p>' + v53Esc('The lines to work on: ' + weak.map(function (x) { return v53LineLabel(r.colour, x.k) + ' (' + x.c + ' of ' + x.n + ')'; }).join('; ') + '.') + '</p>';
    } else html += '<h4>On the Court’s grid</h4><p>' + v53Esc('No glass of ' + r.name + ' marked on the Court’s grid yet.') + '</p>';
    html += '<ul class="v39-lines v39-list v53-doors">' + v53Door('griddrill', r.slug, 'Pour a glass of ' + r.name) + '</ul>';
  }
  return html;
}
function v53WatchBody(r) {
  var q = encodeURIComponent(r.name.replace(/\s*\/\s*/g, ' ') + ' wine');
  return '<p><a class="btn small ghost" href="https://www.youtube.com/results?search_query=' + q + '" target="_blank" rel="noopener">' + v53Esc('Search for films of ' + r.name)
    + '<span class="sr-only"> (opens in a new tab)</span></a></p><p class="v53-note">A search on YouTube, outside the Codex: no film is chosen or vouched for here.</p>';
}
function v53GrapeHtml(r) {
  var order = v53GrapeOrder().all;
  var at = order.indexOf(r);
  var sub = [r.colour === 'white' ? 'A white grape' : 'A red grape'];
  if (r.court) sub.push('on the Court’s tasting list' + (v53cFold(r.court) !== v53cFold(r.name) ? ' as ' + r.court : ''));
  var html = '<div class="v25page v53 v53-grape" data-grape="' + v53Esc(r.slug) + '">' + v32Head(r.name, sub.join(', '));
  var say = v53cStr(v53GridSay()[r.slug]);
  if (say) html += '<p class="v39-lead v53-say"><span class="v53-eyebrow">Say it</span>' + v53Esc(say) + '</p>';
  var ex = v53ExamPlaces(r);
  if (ex.length) html += '<p class="v32-line">' + v53Esc('Examinable at Certified: ' + ex.join(', ') + '.') + '</p>';
  html += v53Sections([
    { id: 'v53-gs-profile', title: 'Colour and structure', body: v53ProfileBody(r), open: true },
    { id: 'v53-gs-fruit', title: 'Fruit, non fruit and oak', body: v53FruitBody(r) },
    { id: 'v53-gs-tell', title: 'The tell', body: v53TellBody(r) },
    { id: 'v53-gs-regions', title: 'Classic regions', body: v53RegionsBody(r) },
    { id: 'v53-gs-grid', title: 'What the grid reads', body: v53ReadsBody(r) },
    { id: 'v53-gs-cards', title: 'Cards and drills', body: v53GrapeCardsBody(r) },
    { id: 'v53-gs-watch', title: 'Watch', body: v53WatchBody(r) }
  ]);
  var acts = '';
  if (at > 0) acts += v53Act('btn ghost', 'gstep', ' data-grape="' + v53Esc(order[at - 1].slug) + '" id="v53-g-prev"', 'Previous: ' + v53GrapeLabel(order[at - 1]));
  if (at >= 0 && at + 1 < order.length) acts += v53Act('btn ghost', 'gstep', ' data-grape="' + v53Esc(order[at + 1].slug) + '" id="v53-g-next"', 'Next: ' + v53GrapeLabel(order[at + 1]));
  acts += v53GoBtn('btn ghost', 'grapes', '', 'All grapes', 'v53-g-all');
  html += '<div class="v28-btnrow v39-acts v53-acts">' + acts + '</div>';
  return html + '</div>';
}

/* =========== the wiring =========== */

function v53WireSheet(box) {
  if (!box || typeof box.addEventListener !== 'function') return;
  var take = function (e) {
    var t = e && e.target;
    if (!t || typeof t.getAttribute !== 'function') return;
    var k = t.getAttribute('data-k');
    var gl = v53CurGlass();
    if (!k || !gl || gl.marked) return;
    if (t.type === 'radio') { if (t.checked) gl.answers[k] = String(t.value || ''); return; }
    if (t.type === 'checkbox') {
      var picks = [];
      Array.prototype.forEach.call(box.querySelectorAll('input[type="checkbox"][data-k="' + k + '"]'), function (n) { if (n.checked) picks.push(String(n.value || '')); });
      if (picks.length > 2) {
        t.checked = false;
        picks = picks.filter(function (p) { return p !== String(t.value || ''); });
        if (typeof toast === 'function') toast('One or two, as the grid asks.');
      }
      gl.answers[k] = picks;
      return;
    }
    gl.answers[k] = String(t.value || '');
  };
  box.addEventListener('change', take);
  box.addEventListener('input', take);
  try {
    var form = box.querySelector('form.v53-sheet');
    if (form && typeof form.addEventListener === 'function') form.addEventListener('submit', function (e) { if (e && typeof e.preventDefault === 'function') e.preventDefault(); });
  } catch (e) { }
}
function v53GrapeStep(slug) {
  var r = v53GrapeFind(slug);
  if (!r) return;
  S._v53grape = r.slug;
  S._v53from = 'grapes';
  try { V32.pend = 'replace'; } catch (e) { }
  render();
  if (typeof v25FocusMain === 'function') { try { v25FocusMain(); } catch (e) { } }
  try { window.scrollTo(0, 0); } catch (e) { }
}
function v53Redraw(focusId) {
  try { V32.pend = 'replace'; } catch (e) { }
  render();
  try {
    var n = focusId ? document.getElementById(focusId) : null;
    if (n && typeof n.focus === 'function') { n.focus(); if (typeof n.scrollIntoView === 'function') n.scrollIntoView({ block: 'start' }); }
    else window.scrollTo(0, 0);
  } catch (e) { }
}
function v53GrapeAct(act, node) {
  var get = function (k) { return node && typeof node.getAttribute === 'function' ? (node.getAttribute(k) || '') : ''; };
  var gl;
  if (act === 'gpour') {
    var g = v53DealGlass(get('data-grape'), get('data-colour'));
    if (!g) { if (typeof toast === 'function') toast('No grid read for that glass is on this device yet.'); return false; }
    S._v53grid = g;
    /* the address names the grape only for a glass asked for by name, so a
       blind glass poured from a named address (a grape with no read yet)
       draws, and its address drops the name in place */
    S._v53gridGrape = g.named ? g.grape : '';
    v53Redraw('');
    if (typeof v25FocusMain === 'function') { try { v25FocusMain(); } catch (e) { } }
    return true;
  }
  if (act === 'gmark') {
    gl = v53CurGlass();
    if (!gl || gl.marked) return false;
    gl.marked = v53GlassGrade(gl);
    var sell = null;
    v53cList(gl.marked.lines).forEach(function (l) { if (l.key === 'sell') sell = l; });
    var n = v53Sentences(gl.answers.sell);
    var settled = !n || n > 2;
    v53CourtGridNote(gl.grape, gl.marked.lines.filter(function (l) { return l.key !== 'sell' || settled; }), gl.marked);
    v53Redraw('v53-verdict');
    return true;
  }
  if (act === 'gself') {
    gl = v53CurGlass();
    if (!gl || !gl.marked || gl.sellMark) return false;
    gl.sellMark = get('data-ok') === '1' ? 'right' : 'wrong';
    var was = gl.marked;
    gl.marked = v53GlassGrade(gl);
    gl.marked.grapeOk = was.grapeOk;
    v53cList(gl.marked.lines).forEach(function (l) { if (l.key === 'sell') v53CourtGridNote(gl.grape, [l], null); });
    v53Redraw('v53-l-sell');
    return true;
  }
  if (act === 'gnext') {
    var tg = S._v53tg;
    if (!tg || !Array.isArray(tg.deck)) return false;
    gl = tg.deck[tg.idx];
    if (gl && !gl.marked) return false;
    tg.idx = Math.min(tg.idx + 1, tg.deck.length);
    v53Redraw(tg.idx >= tg.deck.length ? 'v53-verdict' : '');
    return true;
  }
  if (act === 'gagain' || act === 'grunstart') return v53TastingStart(true);
  if (act === 'gdrill') return v53StartGrapeDrill(get('data-grape'));
  if (act === 'gstep') { v53GrapeStep(get('data-grape')); return true; }
  return false;
}
(function () {
  if (typeof document === 'undefined' || !document || typeof document.addEventListener !== 'function') return;
  document.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v53]') : null;
    if (!node || node.disabled) return;
    var act = node.getAttribute('data-v53');
    if (V53_GACTS.indexOf(act) < 0) return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    try { if ((act === 'gdrill' || act === 'gpour') && typeof v32Remember === 'function') v32Remember(node); } catch (err) { }
    v53GrapeAct(act, node);
  });
})();

/* =========== the grape views registered =========== */

(function () {
  if (typeof V25_VIEWS === 'undefined' || !V25_VIEWS) return;
  V25_VIEWS.grapes = function () { return v53CmsBuild(v53GrapesRootHtml()); };
  V25_VIEWS.grape = function () {
    var r = v53GrapeFind(S._v53grape);
    return v53CmsBuild(r ? v53GrapeHtml(r) : v53GrapesRootHtml());
  };
  V25_VIEWS.griddrill = function () { return v32Build(v53GridDrillHtml(), v53WireSheet); };
  V25_VIEWS.courttasting = function () { return v32Build(v53CourtTastingHtml(), v53WireSheet); };
})();
