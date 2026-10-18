/* ================== CODEX XLI: BRENNAN'S, THE HOUSE TAB ==================

   The house tab (17 October 2026), the World Table's finished shape carried
   to the Codex. Loaded after codex40, before boot. It wraps codex32's bar,
   router, level page and Flashcards root and codex28's list and card; it
   edits no earlier layer and no data file.

   WHAT IT DOES, and the rule each part keeps:

   1. THE BAR reads Home, the house's name, Practise, Library and a quiet
      More. The second word is the current house's name, read again at every
      draw (the literal Brennan's at first paint, which is the shipped pack's
      own name, so nothing moves when the house lands). The due pill rides on
      Practise. Every view codex32 put under Flashcards or Quizzes is owned
      by Practise; the list, the card, the house's screens, the full list,
      the producers, the videos and The Cellar Compass by the house's word.
      Owners and parents are set key by key, never by replacing a registry.

   2. THE ROUTES. #/v/brennans is the house's page, a root whose parent is
      Home; a bare #/v/cellar lands on it. The Practise tab's own address
      (with /all for every level) is the Flashcards root relabelled, its key
      the tab word in lower case; #/flashcards still reads as it, and
      every deck and card keeps its #/flashcards/{deck} address. #/quizzes
      stays, its parent now the Practise root. A section of the list, a card
      and the producers climb to the house's page; The Cellar Compass, lit
      by the house's word, keeps codex40's parent, the level page.

   3. THE HOUSE'S PAGE (v41View): the house's name, the date the menus were
      read, the list's sentence, a row of jump chips (each scrolls to a
      heading and focuses it, with no address and no history; a chip whose
      heading is absent is hidden, the search's own included), then the list itself (codex28's study
      view, whole: the shift, the buttons, the sticky search, the chips), its
      rows grouped by how the wine is sold: By the glass (inside it the
      guide's style sections), On the tastings, Bubbles at Brennan's and
      Birthday Bubbles, Dessert by the half bottle, By the bottle, then any
      bottles of the person's own. The grouping reads the pack's fields only
      (a printed price, a tasting pour, a bottle price, the section, the
      meals, the list); no section is renamed, so every chip, deck and the
      section quiz hold. A section chip opens the section as its own screen
      with its own address. Then the doors: The Cellar Compass, the
      producers, the videos and the house's quiet links.

   4. THE LEVEL PAGE keeps My restaurant, codex40's Compass door, the house
      line and the count line and the section chips; its three study rows
      become one door to the house's page and its quiet links move there.

   5. THE CARD opens on the three lines with no buttons: ten seconds in its
      box, then twenty, then forty-five in the reading face at the size the
      ten had; then the guest line where it differs, then the first picks,
      then About it and everything after as before. The ids v28-s20 and
      v28-s45 are kept. The flash card back and Say the pour are untouched.

   6. THE TAB Practise: the Flashcards root in this order: Due today, Quick quiz,
      the house's decks (Your cellar selection first), the drills on our
      list, Who makes our wines, the level's decks with a door to the
      level's rounds, What it's made of, Words, Reference cards, the regions
      and the service references, Hands on, and the level test last.

   Declarations are var and function only. Every string this layer draws is
   free of the long dash, names nobody, names a level and never numbers one,
   and draws no glyph from the arrows block up; the styles use the house's
   own tokens and classes, typography and no pictures.

   The bar's widths, measured in Chromium on the phone walk, are written
   with the styles below (BAR WIDTHS). */

/* =========== the words =========== */

var V41_WORDS = {
  tab: 'Brennan’s',
  pTab: 'Practise',
  sub: 'menus read {date}',
  jumps: 'On this page',
  jumpList: 'The list',
  jumpGlass: 'By the glass',
  jumpPour: 'On the tastings',
  jumpBubbles: 'Bubbles',
  jumpFloor: 'By the bottle',
  jumpCompass: 'The Cellar Compass',
  jumpProducers: 'Producers',
  jumpVideos: 'Videos',
  jumpHouse: 'The house',
  listH: 'The list',
  glass: 'By the glass',
  pour: 'On the tastings',
  bubbles: 'Bubbles at Brennan’s and Birthday Bubbles',
  half: 'Dessert by the half bottle',
  floor: 'By the bottle',
  own: 'Your own bottles',
  compassH: 'The Cellar Compass',
  compassRow: 'Your cellar study',
  compassLine: 'Explore every study wine, guided readings and fall pairing workshops',
  producersH: 'Producers',
  producersRow: 'Who makes our wines',
  producersLine: '{n} producers behind our wines, by region',
  producerLine: 'one producer behind our wines',
  videosH: 'Videos',
  videosLine: '{n} videos · {line}',
  houseH: 'The house',
  leadLine: 'by the glass, the tastings, the bubbles and the bottles; the Cellar Compass, the producers, the videos, the house',
  linesH: 'The lines',
  twenty: 'In twenty seconds',
  fortyFive: 'In forty-five seconds',
  drillsH: 'Drills on our list',
  rounds: 'The {level} rounds',
  roundsLine: 'every domain and its sections, and the whole paper four ways',
  grid: 'The Blind Grid',
  gridLine: 'a glass is poured blind, you call its structure and the grape',
  flight: 'Blind flight',
  flightLine: 'a flight of glasses, the deductive grid out loud',
  service: 'The Service Ritual',
  serviceLine: 'the steps of service, rehearsed until they are habit'
};

function v41W(key, vars) {
  var s = String(V41_WORDS[key] == null ? key : V41_WORDS[key]);
  if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(String(vars[k])); });
  return s;
}
function v41Esc(s) { return (typeof v32Esc === 'function') ? v32Esc(s) : String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function v41Str(s) { return typeof s === 'string' ? s.trim() : ''; }
function v41House() { try { return (typeof v28House === 'function') ? v28House() : null; } catch (e) { return null; } }
function v41HasWines() { try { return v28Wines(v41House()).length > 0; } catch (e) { return false; } }

/* The house's word: its name when a house is here, else the shipped pack's. */
function v41TabWord() {
  var h = v41House();
  var n = h && typeof h.name === 'string' ? h.name.trim() : '';
  return n || v41W('tab');
}

/* =========== 0. one grape synonym the house's records need =========== */

/* The 15 October label review named the Banyuls' grapes as the bottle does, Grenache Noir: the full
   name of the same variety, so its card keeps its Grenache door. Grenache Gris and Grenache Blanc
   stay their own grapes (codex28's rule: authored synonyms only, never a partial match). */
if (typeof V28_GRAPE_ALIASES !== 'undefined' && V28_GRAPE_ALIASES) V28_GRAPE_ALIASES['grenache noir'] = 'grenache';

/* =========== 1. the bar and who owns what =========== */

V25_NAV = [['home', 'Home'], ['brennans', v41TabWord()], ['practise', 'Practise'], ['library', 'Library'], ['more', 'More']];

var V41_HOUSE_VIEWS = ['cellar', 'house', 'housereview', 'menudesk', 'winepaste', 'houseproducers', 'housevideos', 'fulllist', 'cellarcompass', 'brennans'];
var V41_DECK_VIEWS = ['flashcards', 'deck', 'flash', 'housedeck', 'quizzes', 'quiz', 'results', 'drillpick', 'sim', 'grid', 'floor', 'floortally',
  'pairs', 'pairtally', 'finalsreport', 'tasting', 'service', 'cellarrecite', 'houserecite', 'housesay', 'houseguest'];
/* The Cellar Compass is lit by the house's word but keeps codex40's parent,
   the level page, where two of its three doors are: a cold Back from it lands
   there, as its own gate holds (check-cellar-compass-ui.cjs); from
   the house's page a Back pops to the page as any pushed screen does. */
var V41_UNDER_HOUSE = ['cellar', 'fulllist', 'houseproducers', 'housevideos', 'house', 'housereview', 'menudesk', 'winepaste'];

(function () {
  var own = function (k, word) {
    if (typeof V32_OWNER !== 'undefined' && V32_OWNER) V32_OWNER[k] = word;
    if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER[k] = word;
    if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB[k] = word;
  };
  V41_HOUSE_VIEWS.forEach(function (k) { own(k, 'brennans'); });
  V41_DECK_VIEWS.forEach(function (k) { own(k, 'practise'); });
  /* a view a later layer left under a retired word follows it */
  if (typeof V32_OWNER !== 'undefined' && V32_OWNER) {
    Object.keys(V32_OWNER).forEach(function (k) { if (V32_OWNER[k] === 'flashcards' || V32_OWNER[k] === 'quizzes') own(k, 'practise'); });
  }
  if (typeof V32_PARENT !== 'undefined' && V32_PARENT) {
    V41_UNDER_HOUSE.forEach(function (k) { V32_PARENT[k] = 'brennans'; });
    V32_PARENT.brennans = 'home';
    V32_PARENT.quizzes = 'flashcards';
  }
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.brennans = function () { return v41View(); };
  if (typeof V25_GO !== 'undefined' && V25_GO) {
    V25_GO.brennans = function () { v32Go({ view: 'brennans' }, 'push'); };
    V25_GO.quizzes = function () { v32Go({ view: 'quizzes' }, 'push'); };
  }
  if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA.brennans = 'brennans';
})();

/* The second word read again at every draw (escaped while the bar is drawn,
   since codex32 writes the words as they stand), and the due pill on Practise. */
if (typeof v25NavHtml === 'function') {
  var _v41NavHtml = v25NavHtml;
  v25NavHtml = function () {
    var at = -1;
    V25_NAV.forEach(function (w, i) { if (w && w[0] === 'brennans') at = i; });
    var word = v41TabWord();
    if (at >= 0) V25_NAV[at][1] = v41Esc(word);
    var html = '';
    try { html = _v41NavHtml.apply(this, arguments); } finally { if (at >= 0) V25_NAV[at][1] = word; }
    var pill = '';
    try { pill = (typeof v32Pill === 'function') ? v32Pill() : ''; } catch (e) { pill = ''; }
    if (pill) html = html.replace(/(<button[^>]* data-nav="practise"[^>]*>[^<]*)<\/button>/, function (m, open) { return open + pill + '</button>'; });
    return html;
  };
}

/* A tap on a word: the house's word opens its page (a push from anywhere
   under it; on the page itself, back to the top); Practise opens the
   Flashcards root; the retired words still reach their roots. */
if (typeof v25Nav === 'function') {
  var _v41Nav = v25Nav;
  v25Nav = function (word) {
    if (word === 'practise') return _v41Nav.call(this, 'flashcards');
    if (word !== 'brennans') return _v41Nav.apply(this, arguments);
    if (S.view === 'brennans') {
      try { window.scrollTo(0, 0); } catch (e) { }
      return;
    }
    if (typeof v25Leave === 'function' && !v25Leave()) return;
    S._v32scopeOpen = false;
    v32Go({ view: 'brennans' }, 'push');
  };
}

if (typeof v25MainName === 'function') {
  var _v41MainName = v25MainName;
  v25MainName = function () {
    if (S && S.view === 'flashcards') return v41W('pTab');
    if (S && S.view === 'brennans') return v41TabWord();
    return _v41MainName.apply(this, arguments);
  };
}

/* =========== 2. the routes =========== */

if (typeof v32Route === 'function') {
  var _v41Route = v32Route;
  v32Route = function () {
    if (S.view === 'brennans') return { view: 'brennans', key: 'brennans', hash: '#/v/brennans' };
    var r = _v41Route.apply(this, arguments);
    if (r && S.view === 'flashcards') r.hash = '#/practise' + (v32All().flashcards ? '/all' : '');
    return r;
  };
}

if (typeof v32Parse === 'function') {
  var _v41Parse = v32Parse;
  v32Parse = function (hash) {
    var m = /^#\/practise(?:\/(all))?\/?$/.exec(String(hash || ''));
    if (m) return m[1] ? { view: 'flashcards', all: true } : { view: 'flashcards' };
    return _v41Parse.apply(this, arguments);
  };
}

/* The house's page is the list with no card open and no section chosen; a
   bare list address lands on it. */
function v41ToPage() {
  var st = (typeof v28State === 'function') ? v28State() : (S._v28 || (S._v28 = {}));
  S._v28edit = false;
  st.open = null; st.door = null; st.sec = ''; st.focus = 'restore';
  S._v25area = null;
  S.view = 'brennans';
}

if (typeof v32Apply === 'function') {
  var _v41Apply = v32Apply;
  v32Apply = function (r, state) {
    if (r && r.view === 'brennans') { v41ToPage(); return { view: 'brennans' }; }
    var out = _v41Apply.apply(this, arguments);
    if (r && r.view === 'cellar' && !r.arg && r.sec === undefined && !r.floor) { v41ToPage(); return { view: 'brennans' }; }
    return out;
  };
}

/* Back at depth 0: a section, the list and the house's own screens climb to
   the house's page; a card to its section or the page, as before; The
   Cellar Compass to the level page, as codex40 set it. */
if (typeof v32ParentRoute === 'function') {
  var _v41ParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    var v = S.view;
    if (v === 'brennans') return { view: 'home' };
    if (v === 'cellar' && !(S._v28 && S._v28.open)) return { view: 'brennans' };
    var r = _v41ParentRoute.apply(this, arguments);
    if (v === 'houseproducers' && r && r.view === 'cellar' && !r.arg && r.sec === undefined && !r.floor) return { view: 'brennans' };
    return r;
  };
}

/* A render that would draw the bare list (an old door, a deep link to the
   list, the end of a recital) draws the house's page instead. The editor,
   a form, a paste and a card stay where they are. */
function v41Normalise() {
  if (S.view !== 'cellar' || S._v28edit || S._cellarForm || S._wimp || S._v27edit) return;
  var st = S._v28 || {};
  if (st.open || st.sec) return;
  /* a card or a section an address asked for, still waiting on the house */
  if (typeof V28_WANT !== 'undefined' && V28_WANT) return;
  if (typeof V32 !== 'undefined' && V32 && V32.wantSec) return;
  if (!v41HasWines()) return;
  S.view = 'brennans';
}
/* What the last render drew, and whether the house was here for it: the
   screens below are drawn again once when the house arrives after them. */
var V41_DRAWN = null;
var V41_REDRAW = { flashcards: 1, quizzes: 1, level: 1, library: 1 };
var _v41Render = render;
render = function () {
  try {
    if (typeof V28_WANT !== 'undefined' && V28_WANT && typeof v28Want === 'function') v28Want();
    v41Normalise();
  } catch (e) { }
  var out = _v41Render.apply(this, arguments);
  try { V41_DRAWN = { view: S.view, house: v41HasWines() }; } catch (e) { V41_DRAWN = null; }
  return out;
};

/* When the house lands on its own page (a first visit), the page is drawn
   again in place; never over a search being typed. Practise, Quizzes, the
   level page and the Library, which codex27 never drew again, are drawn
   again once when the house arrives after they were drawn without it (a
   first visit, or a reload that drew before the house was read), so
   Practise shows the house's decks and drills, the level page its door to
   the house's page and the Library The full wine list; never over a search
   being typed or holding words. */
function v41Typing(any) {
  try {
    var a = document.activeElement;
    if (a && a.tagName === 'INPUT' && a.closest && a.closest('#view')) return true;
    if (any) {
      var ins = document.querySelectorAll('#view input');
      for (var i = 0; i < ins.length; i++) if (ins[i].value) return true;
    }
  } catch (e) { }
  return false;
}
function v41DrawAgain() {
  if (typeof V32 !== 'undefined' && V32 && V32.rendering) { setTimeout(v41DrawAgain, 0); return; }
  var y = 0;
  try { y = window.scrollY || window.pageYOffset || 0; } catch (e) { y = 0; }
  try { render(); } catch (e) { }
  try { window.scrollTo(0, y); } catch (e) { }
}
if (typeof v27Redraw === 'function') {
  var _v41Redraw = v27Redraw;
  v27Redraw = function () {
    if (S && S.view === 'brennans') {
      if (v41Typing(false)) return;
      v41DrawAgain();
      return;
    }
    if (S && V41_REDRAW[S.view] && V41_DRAWN && V41_DRAWN.view === S.view && V41_DRAWN.house !== v41HasWines() && !v41Typing(true)) {
      v41DrawAgain();
      return;
    }
    return _v41Redraw.apply(this, arguments);
  };
}

/* =========== 3. the list, by how the wine is sold =========== */

var V41_KINDS = ['glass', 'pour', 'bubbles', 'half', 'floor', 'own'];

function v41Kind(r, h) {
  if (!r) return 'glass';
  if (r.bottle) return 'floor';
  if (r.own) return 'own';
  var w = r.item;
  if (!w) return 'glass';
  var printed = v28Printed(w), menuBottle = v28MenuBottle(w);
  if (printed && !menuBottle) return 'glass';
  if (!printed && v28Pours(h, w.id).length) return 'pour';
  if (menuBottle) {
    var meals = Array.isArray(w.meals) ? w.meals : [];
    var bub = /bubbles/i.test(v41Str(w.section)) || meals.some(function (m) { return /bubbles/i.test(typeof m === 'string' ? m : (m && m.name) || ''); });
    return bub ? 'bubbles' : 'half';
  }
  return 'glass';
}

/* One group's rows by section, each section where it first appears. */
function v41BySection(list) {
  var order = [], by = {};
  list.forEach(function (r) {
    var k = 's:' + r.section;
    if (!by[k]) { by[k] = []; order.push(k); }
    by[k].push(r);
  });
  var out = [];
  order.forEach(function (k) { out = out.concat(by[k]); });
  return out;
}
function v41Order(rows, h) {
  var by = {};
  V41_KINDS.forEach(function (k) { by[k] = []; });
  rows.forEach(function (r) { by[v41Kind(r, h)].push(r); });
  var out = [];
  V41_KINDS.forEach(function (k) { out = out.concat(v41BySection(by[k])); });
  return out;
}

/* The order everything reads: the rows, the chips, Previous and Next. */
if (typeof v28MealRows === 'function') {
  var _v41MealRows = v28MealRows;
  v28MealRows = function (rows, meal) {
    var out = _v41MealRows.apply(this, arguments);
    try { return v41Order(out, v41House()); } catch (e) { return out; }
  };
}

function v41GroupHead(kind, n) {
  return '<h2 class="v32-h2 v41-group" id="v41-g-' + kind + '" tabindex="-1">' + v41Esc(v41W(kind)) + ' · ' + n + '</h2>';
}

/* A group head before each group's first row; inside it the section heads
   are codex29's, counted within the group. The search's own lines (nothing
   matches, elsewhere in the house) are drawn once, after the groups. */
if (typeof v28RowsHtml === 'function') {
  var _v41RowsHtml = v28RowsHtml;
  v28RowsHtml = function (all, st, prog, h) {
    try {
      var house = h || v41House();
      var s = st || {};
      var shown = v28Shown(all, s);
      var plain = { q: '', sec: s.sec || '', open: s.open, focus: s.focus };
      var html = '';
      V41_KINDS.forEach(function (k) {
        var rows = shown.filter(function (r) { return v41Kind(r, house) === k; });
        if (!rows.length) return;
        html += v41GroupHead(k, rows.length) + _v41RowsHtml(rows, plain, prog, h);
      });
      if (v41Str(s.q)) {
        var tail = _v41RowsHtml([], s, prog, h);
        if (shown.length) tail = tail.split('<p class="v28-soft">' + v28Esc(v28W('searchNone', { query: s.q })) + '</p>').join('');
        html += tail;
      }
      return html;
    } catch (e) { return _v41RowsHtml.apply(this, arguments); }
  };
}

/* On the house's page: a card and a section are screens of their own, each
   pushed, the chip that opened a section remembered so Back focuses it
   again. The editor is the list's own entry in its editing state, as
   codex28 has it: Edit the list and its way out replace the entry and never
   push one, so the page is never left twice in the history. */
function v41OpenSection(sec, node) {
  var st = v28State();
  if (node && typeof v32Remember === 'function') v32Remember(node);
  S._v28edit = false; st.open = null; st.q = ''; st.sec = sec; st.focus = 'restore'; st.y = 0;
  S.view = 'cellar';
  V32.pend = 'push';
  render();
  if (typeof v25FocusMain === 'function') v25FocusMain();
}
if (typeof v28Act === 'function') {
  var _v41Act = v28Act;
  v28Act = function (act, node) {
    if (S.view === 'brennans') {
      if (act === 'sec') {
        var sec = node && typeof node.getAttribute === 'function' ? (node.getAttribute('data-s') || '') : '';
        if (sec) { v41OpenSection(sec, node); return; }
      }
      if (act === 'open' || act === 'edit' || act === 'editall') S.view = 'cellar';
      if (act === 'editall') V32.pend = 'replace';
    }
    if (act === 'editoff' && S.view === 'cellar' && V32.pend !== 'push') V32.pend = 'replace';
    return _v41Act.apply(this, arguments);
  };
}

/* A card opened while the house's page shows (a search result, a row, a
   door of a later layer) opens on the list's own card screen, so the entry
   it pushes carries the card's address and Back returns to the page. */
if (typeof v28Open === 'function') {
  var _v41Open = v28Open;
  v28Open = function (id, step) {
    if (S.view === 'brennans') S.view = 'cellar';
    return _v41Open.apply(this, arguments);
  };
}

/* =========== the house's page =========== */

var V41_JUMPS = [['jumpList', 'v41-list-h'], ['jumpGlass', 'v41-g-glass'], ['jumpPour', 'v41-g-pour'], ['jumpBubbles', 'v41-g-bubbles'],
  ['jumpFloor', 'v41-g-floor'], ['jumpCompass', 'v41-compass-h'], ['jumpProducers', 'v41-producers-h'], ['jumpVideos', 'v41-videos-h'], ['jumpHouse', 'v41-house-h']];

function v41JumpsHtml() {
  return '<nav class="v32chips v41-jumps" aria-label="' + v41Esc(v41W('jumps')) + '">' + V41_JUMPS.map(function (j) {
    return '<button type="button" class="v28-chip" data-v41="jump" data-to="' + j[1] + '">' + v41Esc(v41W(j[0])) + '</button>';
  }).join('') + '</nav>';
}

/* A heading to the top of the screen, clear of the sticky Back and, inside
   the list, of the list's sticky search; then it takes the focus. */
function v41Jump(id) {
  try {
    var t = document.getElementById(id);
    if (!t || typeof t.getBoundingClientRect !== 'function') return;
    var y = t.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
    var back = document.querySelector('#view > .v32back');
    var off = back ? back.offsetHeight : 0;
    var list = document.getElementById('v41-list');
    var bar = list ? list.querySelector('.v28-bar') : null;
    if (bar && list.contains(t) && id !== 'v41-list-h') off = Math.max(off, 58) + bar.offsetHeight;
    window.scrollTo(0, Math.max(0, Math.round(y - off - 8)));
    if (typeof t.focus === 'function') t.focus({ preventScroll: true });
    if (typeof v32StuckNow === 'function') v32StuckNow();
  } catch (e) { }
}

function v41Group(title, inner, id) {
  if (!inner) return '';
  return '<section class="v32-group v41-door" aria-labelledby="' + id + '"><h3 class="secgroup v32-gh" id="' + id + '" tabindex="-1">' + v41Esc(title) + '</h3>' + inner + '</section>';
}

/* The doors after the list: The Cellar Compass, the producers, the videos
   and the house's quiet links, each drawn only when it leads somewhere. */
function v41DoorsHtml(h) {
  var html = '';
  if (typeof V25_GO !== 'undefined' && V25_GO && typeof V25_GO.cellarcompass === 'function') {
    html += v41Group(v41W('compassH'), v32Rows(v32GoRow('cellarcompass', v41W('compassRow'), v41W('compassLine'))), 'v41-compass-h');
  }
  var n = 0;
  try { n = (typeof v38Rows === 'function') ? v38Rows(h).length : 0; } catch (e) { n = 0; }
  if (n && typeof V25_GO !== 'undefined' && V25_GO && typeof V25_GO.houseproducers === 'function') {
    html += v41Group(v41W('producersH'), v32Rows(v32GoRow('houseproducers', v41W('producersRow'), n === 1 ? v41W('producerLine') : v41W('producersLine', { n: n }))), 'v41-producers-h');
  }
  var nv = 0;
  try { nv = (typeof v30Groups === 'function') ? v30Groups(h).reduce(function (t, g) { return t + g.videos.length; }, 0) : 0; } catch (e) { nv = 0; }
  if (nv) html += v41Group(v41W('videosH'), v32Rows(v32Row('housevideos', v32W('videosH'), v41W('videosLine', { n: nv, line: v32W('videosLine') }))), 'v41-videos-h');
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
  if (quiet) html += v41Group(v41W('houseH'), '<div class="v32quietrow">' + quiet + '</div>', 'v41-house-h');
  return html;
}

/* codex28's study view inside the page: its heading becomes the list's own
   (a jump target), and what the page already says above it (the house and
   date, the sentence) and the videos (a door below) leave it. */
function v41TrimList(box) {
  if (!box || typeof box.querySelector !== 'function') return;
  var head = box.querySelector('.v28-head');
  if (head) {
    if (head.classList) head.classList.remove('viewhead');
    var h2 = head.querySelector('h2');
    if (h2) {
      h2.id = 'v41-list-h';
      h2.setAttribute('tabindex', '-1');
      h2.className = 'v32-h2';
      h2.textContent = v41W('listH');
    }
    var sub = head.querySelector('.sub');
    if (sub && sub.parentNode) sub.parentNode.removeChild(sub);
  }
  ['.v28-lede', '.v30-videos'].forEach(function (sel) {
    var n = box.querySelector(sel);
    if (n && n.parentNode) n.parentNode.removeChild(n);
  });
}

function v41View() {
  var h = v41House();
  var name = v41TabWord();
  var date = '';
  try { date = h && h.menusReadOn ? v28Date(h.menusReadOn) : ''; } catch (e) { date = ''; }
  var html = '<div class="v25page v32-root v41-brennans">' + v32Head(name, date ? v41W('sub', { date: date }) : '');
  if (!v41HasWines()) {
    var M = typeof V25_MINE !== 'undefined' ? V25_MINE : [];
    html += '<p class="v32-line">' + v41Esc(v32W('noHouse')) + '</p>'
      + v32Rows((v32RegRow(M, 'house') || v32RegRow(M, 'cellar')) + v32RegRow(M, 'menudesk'));
    return v32Build(html + '</div>');
  }
  var st = v28State();
  S._v28edit = false; st.open = null; st.sec = '';
  var rows = v28Rows();
  var all = v28MealRows(rows, v28Meal(v28MealNames(h, rows)));
  html += '<p class="v32-line v41-lede">' + v41Esc(v28ListSentence(h, all)) + '</p>'
    + v41JumpsHtml()
    + '<section class="v41-list" id="v41-list" aria-labelledby="v41-list-h"></section>'
    + v41DoorsHtml(h)
    + '</div>';
  return v32Build(html, function (box) {
    var slot = box.querySelector('#v41-list');
    var list = null;
    try { list = cellarView(); } catch (e) { list = null; }
    if (slot && list) { v41TrimList(list); slot.appendChild(list); }
    /* a chip shows while its heading is on the page: the search repaints the
       rows in place, so the chips follow every keystroke */
    var jumps = function () {
      Array.prototype.forEach.call(box.querySelectorAll('[data-v41="jump"]'), function (b) {
        var to = b.getAttribute('data-to');
        b.hidden = !to || !box.querySelector('#' + to);
      });
    };
    jumps();
    var q = box.querySelector('#v28-q');
    if (q && typeof q.addEventListener === 'function') q.addEventListener('input', jumps);
    if (typeof box.addEventListener === 'function') {
      box.addEventListener('click', function (e) {
        var t = e && e.target;
        var b = t && typeof t.closest === 'function' ? t.closest('[data-v41="jump"]') : null;
        if (!b) return;
        if (typeof e.preventDefault === 'function') e.preventDefault();
        v41Jump(b.getAttribute('data-to'));
      });
    }
  });
}

/* =========== 4. the level page: one door to the house's page =========== */

if (typeof v32RestaurantHtml === 'function') {
  var _v41RestaurantHtml = v32RestaurantHtml;
  v32RestaurantHtml = function () {
    var html = _v41RestaurantHtml.apply(this, arguments);
    try {
      if (!v32HasHouse()) return html;
      var at = html.indexOf(' id="v32-studylist"');
      if (at >= 0) {
        var ul = html.lastIndexOf('<ul class="v25rows v32rows">', at);
        var end = html.indexOf('</ul>', at);
        if (ul >= 0 && end > at) html = html.slice(0, ul) + v32Rows(v32GoRow('brennans', v41TabWord(), v41W('leadLine'))) + html.slice(end + '</ul>'.length);
      }
      var q = html.indexOf('<div class="v32quietrow">');
      var qe = q >= 0 ? html.indexOf('</div>', q) : -1;
      if (qe > q) html = html.slice(0, q) + html.slice(qe + '</div>'.length);
    } catch (e) { }
    return html;
  };
}

/* =========== 5. the card: the three lines at the top =========== */

function v41LinesHtml(l) {
  return '<section class="v41-lines" aria-labelledby="v41-lines-h"><h3 class="sr-only" id="v41-lines-h">' + v41W('linesH') + '</h3>'
    + (l.s10 ? '<div class="card v28-tenbox v41-ten"><p class="v28-eyebrow v28-ink">' + v28W('ten') + '</p><p class="v28-ten">' + v28Esc(l.s10) + '</p></div>' : '')
    + (l.s20 ? '<p class="v28-eyebrow">' + v41W('twenty') + '</p><p class="v28-timed v41-twenty" id="v28-s20">' + v28Esc(l.s20) + '</p>' : '')
    + (l.s45 ? '<p class="v28-eyebrow">' + v41W('fortyFive') + '</p><p class="v28-timed v41-fortyfive" id="v28-s45">' + v28Esc(l.s45) + '</p>' : '')
    + '</section>';
}

/* Cuts the ten second box, the first picks, the two buttons with their
   hidden lines and the guest line, and writes them back in the new order
   where the box stood. */
function v41Lines(html, id) {
  var h = v41House();
  var item = h ? v28Find(h.wines, id) : null;
  if (!html || !item) return html;
  var l = v28LinesShown(item);
  if (!l.s10 && !l.s20 && !l.s45) return html;
  var MARK = '<!--v41-lines-->';
  var out = String(html);
  var picks = '';
  out = out.replace(/<p class="v28-pick">[\s\S]*?<\/p>/, function (m) { picks = m; return ''; });
  out = out.replace(/<div class="v28-btnrow v28-toggles">[\s\S]*?<\/div>/, '');
  out = out.replace(/<p class="v28-timed" id="v28-s20" hidden>[\s\S]*?<\/p>/, '');
  out = out.replace(/<p class="v28-timed" id="v28-s45" hidden>[\s\S]*?<\/p>/, '');
  var guest = l.guestShown ? '<p class="v28-eyebrow">' + v28W('guestLine') + '</p><p>' + v28Esc(l.guest) + '</p>' : '';
  if (guest) {
    var g = out.indexOf(guest);
    if (g >= 0) out = out.slice(0, g) + out.slice(g + guest.length);
  }
  var ten = /<div class="card v28-tenbox">[\s\S]*?<\/div>/;
  if (ten.test(out)) out = out.replace(ten, function () { return MARK; });
  else {
    var say = /<p class="v28-sayit">[\s\S]*?<\/p>/.exec(out);
    var at = say ? say.index + say[0].length : out.indexOf('<section class="v28-block">');
    if (at < 0) at = out.lastIndexOf('</div>');
    if (at < 0) return html;
    out = out.slice(0, at) + MARK + out.slice(at);
  }
  var block = v41LinesHtml(l) + guest + picks;
  return out.replace(MARK, function () { return block; });
}

if (typeof v28CardHtml === 'function') {
  var _v41CardHtml = v28CardHtml;
  v28CardHtml = function (id) {
    var html = _v41CardHtml.apply(this, arguments);
    try { return v41Lines(html, id); } catch (e) { return html; }
  };
}

/* =========== 6. Practise: the Flashcards root, in its new order =========== */

function v41QuickHtml() {
  return '<section class="v32-due v41-quick" aria-labelledby="v41-quick-h"><h3 class="secgroup v32-gh" id="v41-quick-h">' + v32W('quickRow') + '</h3>'
    + '<p class="v32-line">' + v41Esc(v32QuickLine()) + '</p>'
    + '<button type="button" class="btn gold v32-go" data-v32="quick" id="v41-quick-go">' + v32W('startQuick') + '</button></section>';
}

function v41DrillsHtml() {
  var M = typeof V25_MINE !== 'undefined' ? V25_MINE : [];
  var D = typeof V27_DRILL_ROWS !== 'undefined' ? V27_DRILL_ROWS : [];
  var rows = '';
  if (v32HasHouse()) {
    rows = v32Row('drilllist', v32W('drillList'), v32W('drillListLine'))
      + v32RegRow(M, 'cellarrecite', v32W('recite'))
      + v32RegRow(D, 'houserecite') + v32RegRow(D, 'housepair') + v32RegRow(D, 'housesay') + v32RegRow(D, 'houseguest')
      + v32RegRow(M, 'cellardrill', v32W('cellarDrill'));
  } else {
    rows = v32RegRow(M, 'cellardrill', v32W('cellarDrill')) + v32RegRow(M, 'cellarrecite', v32W('recite'));
  }
  return v32Group(v41W('drillsH'), rows, 'v41-fc-drills');
}

function v41HandsHtml() {
  var hands = '';
  var grapes = [];
  try { grapes = v25Grapes(activeLevel); } catch (e) { grapes = []; }
  if (grapes.length) {
    hands += v32GoRow('grid', v41W('grid'), v41W('gridLine'));
    hands += v32GoRow('flight', v41W('flight'), v41W('flightLine'));
  }
  hands += v32GoRow('service', v41W('service'), v41W('serviceLine'));
  return v32Group(v32W('handsOn'), hands, 'v41-fc-hands');
}

function v41RootOrder(html) {
  var UL = '<ul class="v25rows v32rows">';
  var head = v32Head(v32W('fcH'));
  if (html.indexOf(head) >= 0) html = html.replace(head, function () { return v32Head(v41W('pTab')); });
  /* codex40's row before Due today, taken out to lead the house's group */
  var compass = '';
  var due = html.indexOf('<section class="v32-due"');
  if (due >= 0) {
    var ul = html.lastIndexOf(UL, due);
    var piece = ul >= 0 ? html.slice(ul, due) : '';
    if (piece && piece.indexOf('data-deck="cellar-compass"') >= 0 && /<\/ul>\s*$/.test(piece)) {
      compass = piece.slice(UL.length, piece.lastIndexOf('</ul>'));
      html = html.slice(0, ul) + html.slice(due);
    }
  }
  /* Quick quiz after Due today */
  due = html.indexOf('<section class="v32-due"');
  var dueEnd = due >= 0 ? html.indexOf('</section>', due) : -1;
  if (dueEnd >= 0) { dueEnd += '</section>'.length; html = html.slice(0, dueEnd) + v41QuickHtml() + html.slice(dueEnd); }
  /* the house's decks, then the drills on our list */
  var rest = html.indexOf('aria-labelledby="v32-fc-rest"');
  if (rest < 0) rest = html.indexOf('<section class="v32-group"><h3 class="secgroup v32-gh">' + v32W('fcRest') + '</h3>');
  if (rest >= 0) {
    var restEnd = html.indexOf('</section>', rest);
    if (restEnd >= 0) {
      if (compass) {
        var at = html.indexOf(UL, rest);
        if (at >= 0 && at < restEnd) {
          at += UL.length;
          html = html.slice(0, at) + compass + html.slice(at);
          restEnd += compass.length;
        }
      }
      restEnd += '</section>'.length;
      html = html.slice(0, restEnd) + v41DrillsHtml() + html.slice(restEnd);
    }
  }
  /* the level's decks, and the door to the level's rounds */
  var lv = html.indexOf('aria-labelledby="v32-fc-lv"');
  var lvEnd = lv >= 0 ? html.indexOf('</ul>', lv) : -1;
  if (lvEnd >= 0) html = html.slice(0, lvEnd) + v32GoRow('quizzes', v41W('rounds', { level: v32Lv().name }), v41W('roundsLine')) + html.slice(lvEnd);
  /* Hands on and the level test, last */
  var close = html.lastIndexOf('</div>');
  if (close >= 0) {
    html = html.slice(0, close) + v41HandsHtml()
      + '<section class="v32-group v32-testgroup">' + v32Rows(v32TestRow(activeLevel, false)) + '</section>' + html.slice(close);
  }
  return html;
}

if (typeof v32FlashcardsHtml === 'function') {
  var _v41FlashcardsHtml = v32FlashcardsHtml;
  v32FlashcardsHtml = function () {
    var html = _v41FlashcardsHtml.apply(this, arguments);
    try { return v41RootOrder(html); } catch (e) { return html; }
  };
}

/* =========== the styles ===========
   The house's tokens and codex28's and codex32's classes; typography only.
   BAR WIDTHS, measured in Chromium on 17 October 2026 (codex32's phone
   rule: 12px Cinzel, letter spacing 0, 2px padding each side, the row 12px
   in from either edge), each tab's own width with nothing to share out:
   Home 44 (its word 29, held at the 44 floor), Brennan's 54 (57 in the day
   service, whose words not lit are set at 600), Practise 70 or 72 with the
   due pill, Library 44, More 44 with its 2px margin: 258 to 263 in all. At
   375 the row is 351 wide and the tabs draw at about 59, 81, 97, 67 and 44;
   at 390 the row is 366 and they draw at about 63, 84, 101, 71 and 44.
   Every tab 60 tall (More 44), one row, no sideways scroll, night or day;
   the 11px fallback the plan held in reserve is not needed. */
(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v41-style';
  css.textContent = [
    /* the house's page */
    'body[data-codex-page="brennans"] .wrap .v28-bar{top:58px}',
    '.wrap .v41-brennans .v41-lede{color:var(--parch)}',
    '.wrap .v41-jumps{margin:14px 0 6px}',
    '.wrap .v41-jumps .v28-chip{min-height:44px;padding:8px 12px;font-size:16px}',
    '.wrap .v41-jumps .v28-chip[hidden]{display:none}',
    '.wrap .v41-list{margin-top:20px}',
    '.wrap .v41-list .v28-head{margin:0 0 8px;padding-bottom:0;border-bottom:1px solid var(--line)}',
    '.wrap .v41-list .v28-headrow .v32-h2{margin:0;padding-bottom:6px;border-bottom:0}',
    '.wrap .v41-group{margin:28px 0 2px}',
    '.wrap .v28-rows>.v41-group:first-child{margin-top:14px}',
    '.wrap .v41-group+.v28-sechead{margin-top:6px}',
    '.wrap .v41-door{margin-top:28px}',
    '.wrap .v41-brennans [tabindex="-1"]:focus{outline:none}',
    '.wrap .v41-brennans [tabindex="-1"]:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}',
    /* the card's three lines */
    '.wrap .v41-lines{margin:10px 0 4px}',
    '.wrap .v41-lines>.v28-eyebrow{margin-top:18px}',
    '.wrap .v41-lines .v28-tenbox.v41-ten{margin:10px 0 4px}',
    '.wrap .v41-lines .v28-tenbox.v41-ten .v28-ten{font-size:17px}',
    '.wrap .v28 .v41-lines .v28-timed.v41-twenty{font-size:18px;line-height:1.55;color:var(--parch);margin:0 0 4px}',
    '.wrap .v28 .v41-lines .v28-timed.v41-fortyfive{font-family:var(--house-reading);font-size:20px;line-height:1.5;font-weight:600;color:var(--parch);border-left:3px solid var(--gold);padding-left:12px;margin:0 0 6px}',
    /* Practise */
    '.wrap .v41-quick{margin-top:12px}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();

/* =========== a reload on one of the new addresses ===========
   codex32 read the address before this layer's routes were known, so the
   house's page, Practise and the bare list are read again here, once, and
   the first render replaces. The producers' address too: codex38 reads it
   again from location.hash, which a render before it loaded (the house
   arriving) may already have written over with Home's, so a first visit on
   #/v/houseproducers could land on Home; the address codex32 kept is read. */
(function () {
  try {
    if (typeof V32 === 'undefined' || !V32 || V32.moved || typeof V32.initialHash !== 'string') return;
    var hash = V32.initialHash;
    var mine = /^#\/(practise(\/all)?|v\/brennans|v\/cellar)\/?$/.test(hash);
    var producers = /^#\/v\/houseproducers(\/|$)/.test(hash) && S.view !== 'houseproducers';
    if (!mine && !producers) return;
    var r = v32Parse(hash);
    if (!r || (producers && r.view !== 'houseproducers')) return;
    v32Apply(r, typeof v32CurState === 'function' ? v32CurState() : null);
    V32.pend = 'replace';
  } catch (e) { }
})();
