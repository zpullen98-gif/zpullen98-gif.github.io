/* ================== CODEX LV: THE WINE ATLAS TAB AND MORE'S LIBRARY ==================

   The Wine Atlas tab and More's Library, 2 November 2026. Loaded after
   codex54.js, before boot.js. It edits no earlier layer and no data file;
   every wrapper is typeof guarded and outermost, every registry is extended
   key by key, never replaced (V25_NAV alone is reassigned whole, as codex41
   and codex53 reassigned it), and the layer declares with var and function
   only. Every string it shows lives in V55_WORDS (read by v55W); the data's
   own fields (the readings, the maps' notes) are drawn as they are written.
   Its CSS lives in its own v55-style element.

   The owner asked for the Library tab to move into More, for the Wine Atlas
   to come back to the bar, and for every region to carry its maps, its
   knowledge and the districts within it. Nothing is written new: the layer
   assembles what the Codex already holds (codex31's seventeen sheets,
   codex45's 129 field maps, codex39's readings, codex46's techniques,
   codex53's grapes, subjects and the Court's grid reads).

   WHAT THIS LAYER OWNS:

   1. THE WORDS AND THE STYLE: V55_WORDS, v55W, and the v55-style element.

   2. THE BAR reads Home, the house's name, CMS, Grapes, Wine Atlas and the
      quiet More. V25_NAV is reassigned whole; the Wine Atlas word is
      codex47's key, worldmap. The drawn bar keeps codex47's v47nav class
      off (so css/house-atlas-nav.css's two row grid never applies) and the
      due pill rides on More, where Practise lives now. A tap on Wine Atlas
      opens the atlas root (a push from anywhere else; on the root itself,
      back to the top), a tap on More opens More the same way.

   3. THE OWNERS AND THE PARENTS: the six atlas views (worldmap, regions,
      country, region, fieldatlas, fieldmap) are owned by worldmap again;
      every view owned by library (the Library, the bank, Practise, the
      decks, the quizzes, the drills and the runs that lit Library) is owned
      by more, and V25_AREA follows. The atlas root climbs to Home, the
      regions index and the field atlas to the root, the Library to More.
      The lit word answers more wherever it answered library, with one rule
      on the content (codex54's rule for a grape deck): a region's deck, its
      cards and a region drill light Wine Atlas wherever they were opened
      from, and a region's deck climbs to its region.

   4. MORE AND THE LIBRARY: More opens with a group, The Library, whose rows
      open the Library page at its sections (Practise, The question bank,
      The reading rooms); then More's groups as before. The Library page
      keeps its address, climbs to More, and loses its atlas section, its
      jump chip and the atlas doors the earlier layers put in it (the atlas
      is the tab now).

   5. THE WINE ATLAS ROOT: #/v/worldmap with no sheet draws a hub: chips
      (The World Map, Countries, Every region, Field maps, Techniques), the
      seventeen sheets as doors in MAP_GROUPS order, every country as a
      door, then every country with each of its regions beneath, one row a
      region with its district count, opening the region page. A sheet's
      address (#/v/worldmap/{sheet}) still draws codex31's sheet. The hub
      fetches each sheet's reading through codex39's own loader, so the
      counts are whole and the readings are kept for offline use.

   6. THE REGION PAGE (codex39's region view wrapped): the head and the
      lead, then the field map drawn inline by codex45's own renderer (its
      figure, its enlarging viewer, its image failure note), else a door to
      the sheet with the region marked; then The districts, one list joining
      the reading's places (names, notes, sub-places, depth words) and the
      field map's places (kind and note), matched by folded name so a
      district shows once, each mapped place with a button that marks its
      point on the inline map; then the reading as codex39 draws it, its own
      The places folded into The districts; then In the Codex (the
      techniques used there, the Court's subject, the Court's grid reads for
      the region, the grapes' pages, the region's flashcards and drill);
      then codex39's own row of doors. The field map screen keeps its
      address; its Read in depth button opens this page.

   7. THE COUNTRY PAGE (codex39's country view wrapped): its map inline
      (the country's field map where one exists, chosen among several for
      the group of Eastern Europe; else its sheet), then the reading as
      codex39 draws it, its regions drawn as rows with their district
      counts in place of codex39's list.

   8. THE SHELL: index.html loads js/codex55.js after codex54.js and before
      boot.js; the worker is codex-v114 and lists it.

   BAR WIDTHS, measured in Chromium on 2 November 2026 (.wip/prove-atlas-dom.mjs
   at 375 and 390, a probe at 320), every box read with getBoundingClientRect:
   codex32's phone rule and codex53's narrowest rule as they stand, a fresh
   profile at Village with the house's pack, Home lit, Due today's pill
   reading two figures (20) on More's corner, inside its 44 px box. Home,
   Brennan's, CMS, Grapes, Wine Atlas, More:
     320 night  44    55.7  44    44    63.3  44   295 of a 296 row
     320 day    44    56.2  44    44    62.8  44   295 of 296
     375 night  50.9  71.0  48.5  55.9  78.7  44   349 of a 351 row
     375 day    49.3  72.3  48.1  56.4  78.9  44   349 of 351
     390 night  53.9  74.0  51.5  58.9  81.7  44   364 of a 366 row
     390 day    52.3  75.3  51.1  59.4  81.9  44   364 of 366
   With the pill inline (codex32's way) More drew at 66 to 68 and the row
   needed 302 of 296 at 320, the house's name cut to 44; on More's corner
   the pill costs the row nothing whatever the count. Every tab 60 tall (More
   44 by 44), every centre on one line, every word whole, no sideways scroll.
*/

/* =========== 1. the words =========== */

var V55_WORDS = {
  /* the bar */
  tab: 'Wine Atlas',
  /* the root */
  hubH: 'The Wine Atlas',
  hubSub: '{sheets} maps, {countries} countries and {regions} regions',
  hubLine: 'Every region opens on its field map, its districts and everything the Codex holds about it.',
  jumps: 'On this page',
  chipWorld: 'The World Map',
  chipCountries: 'Countries',
  chipRegions: 'Every region',
  chipField: 'Field maps',
  chipTech: 'Techniques',
  findLabel: 'Find a country, a region or a district',
  findHolder: 'For example, Burgundy or Chablis',
  findCount: '{n} of {m} regions',
  findNone: 'Nothing matches yet. Try a country or a region, or clear the search.',
  sheetsH: 'The World Map',
  sheetsLine: 'Seventeen sheets, each a country or a state with its regions numbered on it.',
  sheetOne: '1 numbered region',
  sheetMany: '{n} numbered regions',
  sheetFields: '{line}, {k} field maps',
  sheetField: '{line}, 1 field map',
  countriesH: 'Countries',
  countriesLine: 'Each country carries its map, the law, the label words and its regions.',
  regionsH: 'Every region',
  regionsLine: 'Every country in the order of the maps, with each of its regions and the districts within it.',
  countryRow: 'Read {name}',
  countryRowLine: 'Its map, the ladder and the label words',
  maplessH: 'Also asked',
  maplessLine: 'Asked by place, each with a field map of its own',
  maplessRow: 'A field map of {m} places',
  maplessRows: '{k} field maps',
  districtOne: '1 district',
  districtMany: '{n} districts',
  onMap: '{m} on its field map',
  regionNumber: 'Number {n} on the map',
  /* the map on a region or a country page */
  mapH: 'The map',
  fieldDoor: 'The field map and its notes',
  sheetDoor: 'See {name} on the map of {sheet}',
  sheetOpen: 'Open the map and its guide',
  sheetEnlarge: 'Enlarge map',
  sheetAlt: 'The map of {name}, its regions numbered. The regions are listed on this page.',
  chooseMap: 'Choose a map',
  sheetFail: 'The map artwork could not load; the regions are listed on this page.',
  /* the districts */
  districtsH: 'The districts',
  districtsLine: '{n} districts and places from the reading, {m} of them marked on the map.',
  districtsLineOne: '{n} districts and places from the reading, 1 of them marked on the map.',
  districtsWait: 'The places on the map, while the reading opens; its districts join them when it arrives.',
  dotKey: 'A numbered dot marks a town or a settlement; it never draws an appellation boundary or a single vineyard.',
  onMapAt: 'On the map, number {n}: {kind}.',
  pin: 'Show on the map',
  pinNamed: 'Show {name}',
  pinAria: 'Show {name} on the map',
  pinSaid: '{name} is marked on the map, number {n}.',
  pinGone: 'The map artwork is not on this device; the place is number {n} in the list.',
  alsoH: 'Also on the map',
  alsoLine: 'The region’s own marker, the towns and the reference places, for your bearings.',
  kind_study: 'the region’s own marker',
  kind_lesson: 'a town of the reading',
  kind_context: 'a town for your bearings',
  kind_commune: 'a commune',
  kind_town: 'a town',
  kind_reference: 'a reference place',
  kind_other: 'a place',
  /* In the Codex */
  codexH: 'In the Codex',
  techH: 'The techniques',
  subjectH: 'The Court’s subject',
  gridH: 'On the Court’s grid',
  gridDoor: '{grape}: {region}',
  grapesH: 'The grapes',
  studyH: 'Flashcards and drill',
  /* More and the Library */
  libraryG: 'The Library',
  libPractise: 'Practise',
  libPractiseLine: 'The decks, the short rounds and the Court’s curriculum',
  libPractiseDue: '{n} due today, then the decks and the short rounds',
  libBank: 'The question bank',
  libBankLine: 'The {level} bank by category, its mock and the level test',
  libReading: 'The reading rooms',
  libReadingLine: 'The chapters, the producers, the references and the Wine Workshop',
  libLine: 'For {level}: Practise and the question bank first, then the reading rooms.',
  libLineAll: 'For every level: Practise and the question bank first, then the reading rooms.',
  biblio: 'Read the atlas bibliography'
};

function v55W(key, vars) {
  var v = vars || {};
  return String(Object.prototype.hasOwnProperty.call(V55_WORDS, key) ? V55_WORDS[key] : key).replace(/\{(\w+)\}/g, function (m, k) {
    return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m;
  });
}
function v55Esc(s) {
  if (typeof v32Esc === 'function') return v32Esc(s == null ? '' : String(s));
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function v55Str(s) { return typeof s === 'string' ? s.trim() : (typeof s === 'number' ? String(s) : ''); }
function v55List(x) { return Array.isArray(x) ? x : []; }
function v55Own(o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); }
/* codex39's folding (regions-join.cjs's): accents off, lower case, every run of anything but a letter or a digit one space */
function v55Fold(s) {
  if (typeof v39Fold === 'function') return v39Fold(s);
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD'); } catch (e) { }
  return t.replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
function v55Num(n) { return String(Number(n) || 0); }

/* =========== the style =========== */

(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v55-style';
  css.textContent = [
    /* every control on the layer's pages stands at least 44px */
    '.wrap .v55 .btn,.wrap .v55 .v28-chip{min-height:44px;box-sizing:border-box}',
    '.wrap .v55 .btn{white-space:normal;text-align:left;max-width:100%}',
    '.wrap .v55 [tabindex="-1"]:focus{outline:none}',
    '.wrap .v55 [tabindex="-1"]:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}',
    '.wrap .v55 .v32-sec{margin-top:28px}',
    '.wrap .v55 [hidden]{display:none!important}',
    /* the root: the chips, the search, the sheets and the regions in two columns of compact rows (one under 340px) */
    '.wrap .v55-chips{margin:14px 0 6px}',
    '.wrap .v55-chips .v28-chip,.wrap .v55-countrychips .v28-chip,.wrap .v55-choose .v28-chip{padding:8px 12px;font-size:16px}',
    '.wrap .v55-countrychips,.wrap .v55-choose{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 4px}',
    '.wrap .v55-find{margin:16px 0 0}',
    '.wrap .v55-find label{display:block;margin:0 0 6px;font-size:17px;color:var(--parch)}',
    '.wrap .v55-find input{display:block;width:100%;max-width:520px;box-sizing:border-box;min-height:44px;font-size:17px}',
    '.wrap .v55-findcount{margin:6px 0 0;min-height:1em;font-size:15px;color:var(--parch2)}',
    '.wrap .v55-hub .v55-sheets .v25rows,.wrap .v55-hub .v55-regions .v25rows{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}',
    '.wrap .v55-hub .v55-sheets .v25row,.wrap .v55-hub .v55-regions .v25row{height:100%;min-height:44px;padding:10px 12px;gap:4px}',
    '.wrap .v55-hub .v25row-name{font-size:15.5px;line-height:1.3}',
    '.wrap .v55-hub .v25row-line{font-size:15px;line-height:1.35}',
    '.wrap .v55-hub .v55-regions .v25rows>li:first-child{grid-column:1/-1}',
    '.wrap .v55-hub .v55-country{margin-top:18px}',
    '@media(max-width:340px){.wrap .v55-hub .v55-sheets .v25rows,.wrap .v55-hub .v55-regions .v25rows{grid-template-columns:minmax(0,1fr)}}',
    /* the map on a page: the figure, the mark a district sets on it (inert to the pointer), its scope and its door */
    '.wrap .v55-map{margin:18px 0 6px}',
    '.wrap .v55-mapfig{position:relative;max-width:650px}',
    '.wrap .v55-mapfig .v45-figure{margin:10px 0 0}',
    '.wrap .v55-mapfig figcaption a{display:inline-flex;align-items:center;min-height:44px}',
    '.wrap .v55-sheetopen{display:block;appearance:none;width:100%;padding:0;margin:0;background:#071b14;border:1px solid var(--line);border-radius:3px;cursor:zoom-in}',
    '.wrap .v55-sheetopen>img{display:block;width:100%;height:auto}',
    '.wrap .v55-figure{margin:10px 0 0}',
    '.wrap .v55-figure figcaption{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin:12px 0}',
    '.wrap .v55-scope{font-size:15px;line-height:1.5;color:var(--parch2);margin:6px 0 10px}',
    '.wrap .v55-mapacts{margin:6px 0 0}',
    '.wrap .v55-pin{position:absolute;left:0;top:0;width:0;height:0;pointer-events:none;z-index:3}',
    '.wrap .v55-pin-ring{position:absolute;left:-17px;top:-17px;width:34px;height:34px;box-sizing:border-box;border-radius:50%;border:3px solid #f6d27a;box-shadow:0 0 0 2px #071b14,0 0 0 7px rgba(246,210,122,.42)}',
    '.wrap .v55-pin-tag{position:absolute;left:22px;top:-13px;white-space:nowrap;background:#071b14;color:#f3e9d5;border:1px solid #d5b16c;border-radius:3px;padding:0 7px;font-size:14px;line-height:24px}',
    '.wrap .v55-pin-left .v55-pin-tag{left:auto;right:22px}',
    /* the districts: the reading's tree, a rule a district, its sub-places under a quiet left rule */
    '.wrap .v55-districts{margin-top:26px}',
    '.wrap .v55-districts .v39-placeskey,.wrap .v55-districts .v55-dotkey{font-size:16px;line-height:1.5;color:var(--parch2)}',
    '.wrap .v55-districts .v39-placeskey{font-style:italic}',
    '.wrap .v55-dlist{list-style:none;margin:12px 0 0;padding:0}',
    '.wrap .v55-dlist>li{padding:12px 0 12px;border-top:1px solid var(--line)}',
    '.wrap .v55-dlist .v55-sub{margin:10px 0 0 2px;padding:0 0 0 14px;border-left:2px solid var(--line)}',
    '.wrap .v55-dlist .v55-sub>li{padding:8px 0;border-top:0}',
    '.wrap .v55-dhead{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px}',
    '.wrap .v55-dname{font-size:19px;line-height:1.35;color:var(--gold-hi);font-weight:600}',
    '.wrap .v55-sub .v55-dname{font-size:17px;color:var(--parch)}',
    '.wrap .v55-districts .v39-depth{margin-left:0;color:var(--parch2)}',
    '.wrap .v55-dnote{margin:4px 0 0;font-size:17px;line-height:1.5;color:var(--parch)}',
    '.wrap .v55-pinrow{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:6px 0 0}',
    '.wrap .v55-dmap{flex:1 1 180px;font-size:15px;line-height:1.45;color:var(--parch2)}',
    '.wrap .v55 .v55-pinbtn{flex:0 0 auto;min-height:44px;padding:6px 14px;font-size:15px}',
    '.wrap .v55 .v55-pinbtn[aria-pressed="true"]{background:var(--gold-hi);border-color:var(--gold-hi);color:var(--bg)}',
    '.wrap .v55-d.v55-here>.v55-dhead{box-shadow:inset 3px 0 0 var(--gold-hi);padding-left:9px}',
    /* In the Codex: a group a kind of door, the doors chips that wrap (codex46's box drawn plain here) */
    '.wrap .v55-codex{margin:28px 0 8px}',
    '.wrap .v55-cgroup{margin:10px 0 0}',
    '.wrap .v55-doors{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 12px}',
    '.wrap .v55-codex .v46-links{border:0;border-radius:0;padding:0;margin:8px 0 12px;background:none}',
    '.wrap .v55-cregions .v55-doorcount{color:var(--claret);font-size:15px}',
    /* the bar on a phone: the due pill sits on More's corner, so More keeps its 44 px box whatever the count and the
       five words keep their room (measured in the BAR WIDTHS note of the report and the walk) */
    '@media(max-width:420px){.wrap .house-topbar .appnav.v32nav .navword.v32more{position:relative;overflow:visible}'
      + '.wrap .house-topbar .appnav.v32nav .navword.v32more .v32pill{position:absolute;top:-9px;right:0;margin:0;min-width:18px;box-sizing:border-box;padding:0 3px;font-size:11px;line-height:16px;box-shadow:0 0 0 2px var(--bg)}}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();

/* =========== 2. the bar =========== */

var V55_ATLAS_VIEWS = ['worldmap', 'regions', 'country', 'region', 'fieldatlas', 'fieldmap'];

V25_NAV = [['home', 'Home'], ['brennans', (typeof v41TabWord === 'function') ? v41TabWord() : 'Brennan’s'], ['cms', 'CMS'], ['grapes', 'Grapes'], ['worldmap', v55W('tab')], ['more', 'More']];

/* The drawn bar, outermost: codex47's class kept off (every selector of its
   stylesheet carries it, so its two row grid never applies), and the due
   pill on More alone, where Practise lives now. */
function v55NavShape(html) {
  var out = String(html || '').split(' v47nav').join('');
  out = out.replace(/ <span class="v32pill">[\s\S]*?<\/span><\/span>/g, '');
  var pill = '';
  try { pill = (typeof v32Pill === 'function') ? v32Pill() : ''; } catch (e) { pill = ''; }
  if (pill) out = out.replace(/(<button[^>]* data-nav="more"[^>]*>[^<]*)<\/button>/, function (m, open) { return open + pill + '</button>'; });
  return out;
}
if (typeof v25NavHtml === 'function') {
  var _v55NavHtml = v25NavHtml;
  v25NavHtml = function () {
    var html = _v55NavHtml.apply(this, arguments);
    try { return v55NavShape(html); } catch (e) { return html; }
  };
}

/* A tap on a word: Wine Atlas opens the atlas root and More opens More (a
   push from anywhere else; on the root itself, back to the top); every
   other word falls through to the layers below. */
function v55OnRoot(word) {
  if (word === 'worldmap') return S.view === 'worldmap' && !S.wmap;
  if (word === 'more') return S.view === 'more' || S.view === 'mine';
  return false;
}
if (typeof v25Nav === 'function') {
  var _v55Nav = v25Nav;
  v25Nav = function (word) {
    if (word !== 'worldmap' && word !== 'more') return _v55Nav.apply(this, arguments);
    if (v55OnRoot(word)) {
      try { window.scrollTo(0, 0); } catch (e) { }
      return;
    }
    if (typeof v25Leave === 'function' && !v25Leave()) return;
    S._v32scopeOpen = false;
    v32Go(word === 'worldmap' ? { view: 'worldmap', arg: '' } : { view: 'more' }, 'push');
  };
}

/* =========== 3. the owners, the parents and the lit word =========== */

(function () {
  var tables = [];
  if (typeof V32_OWNER !== 'undefined' && V32_OWNER) tables.push(V32_OWNER);
  if (typeof V25_UNDER !== 'undefined' && V25_UNDER) tables.push(V25_UNDER);
  if (typeof V25_HUB !== 'undefined' && V25_HUB) tables.push(V25_HUB);
  /* every view the Library owned is More's now, key by key */
  tables.forEach(function (t) {
    Object.keys(t).forEach(function (k) { if (t[k] === 'library') t[k] = 'more'; });
  });
  /* the six atlas views are the Wine Atlas's again */
  V55_ATLAS_VIEWS.forEach(function (k) { tables.forEach(function (t) { t[k] = 'worldmap'; }); });
  if (typeof V25_AREA !== 'undefined' && V25_AREA) {
    Object.keys(V25_AREA).forEach(function (k) { if (V25_AREA[k] === 'library') V25_AREA[k] = 'more'; });
    V25_AREA.worldmap = 'worldmap';
    V25_AREA.regions = 'worldmap';
    V25_AREA.fieldatlas = 'worldmap';
    V25_AREA.v55lib = 'more';
  }
  if (typeof V32_PARENT !== 'undefined' && V32_PARENT) {
    V32_PARENT.worldmap = 'home';
    V32_PARENT.regions = 'worldmap';
    V32_PARENT.fieldatlas = 'worldmap';
    V32_PARENT.library = 'more';
  }
})();

/* A region's deck, its cards and a region drill are the atlas's content, so
   they light Wine Atlas wherever they were opened from (codex54's rule for a
   grape deck); every other screen that lit Library lights More. */
function v55DeckId() {
  var v = S.view;
  if (v === 'deck') return String(S._v32deck || '');
  if (v === 'housedeck' || v === 'flash') { var run = S._v32run; return (run && run.v32) ? String(run.deckId || '') : ''; }
  return '';
}
function v55RegionDeck(id) { return !!id && typeof V39_DECK_RE !== 'undefined' && V39_DECK_RE && V39_DECK_RE.test(String(id)); }
function v55RegionRun() {
  var v = S.view;
  if (v !== 'quiz' && v !== 'results') return false;
  var first = S.pool && S.pool[0];
  var section = (typeof v39W === 'function') ? v39W('drillSection') : 'The regions';
  return String(S.section || '') === section && !!first && typeof v39IsOwnId === 'function' && v39IsOwnId(String(first.id || ''));
}
if (typeof v25NavWord === 'function') {
  var _v55NavWord = v25NavWord;
  v25NavWord = function () {
    try { if (v55RegionDeck(v55DeckId()) || v55RegionRun()) return 'worldmap'; } catch (e) { }
    var word = _v55NavWord.apply(this, arguments);
    return word === 'library' ? 'more' : word;
  };
}

/* Back at depth 0: the atlas root to Home, a sheet and the regions index to
   the root, the Library to More, a region's deck to its region, a sheet's
   deck to its country and the deck of every region to the root. */
if (typeof v32ParentRoute === 'function') {
  var _v55ParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      var v = S.view;
      if (v === 'worldmap') return S.wmap ? { view: 'worldmap', arg: '' } : { view: 'home' };
      if (v === 'regions') return { view: 'worldmap', arg: '' };
      if (v === 'library') return { view: 'more' };
      if (v === 'deck') {
        var m = (typeof V39_DECK_RE !== 'undefined' && V39_DECK_RE) ? V39_DECK_RE.exec(String(S._v32deck || '')) : null;
        if (m) {
          if (m[3] && typeof v39Find === 'function' && v39Find(m[3])) return { view: 'region', arg: m[3] };
          if (m[3] && typeof v39Country === 'function' && v39Country(m[3])) return { view: 'country', arg: m[3] };
          if (m[2] && typeof v39SheetCountry === 'function') {
            var c = v39SheetCountry(m[2]);
            if (c && typeof v39CountryKey === 'function') return { view: 'country', arg: v39CountryKey(c) };
          }
          if (m[1] === 'regions') return { view: 'worldmap', arg: '' };
        }
      }
    } catch (e) { }
    return _v55ParentRoute.apply(this, arguments);
  };
}

/* The root's name in the main landmark. */
if (typeof v25MainName === 'function') {
  var _v55MainName = v25MainName;
  v25MainName = function () {
    if (S && S.view === 'worldmap' && !S.wmap) return v55W('hubH');
    return _v55MainName.apply(this, arguments);
  };
}

/* =========== 4. More and the Library =========== */

/* More opens with The Library: one row a section of the Library page, each
   opening the page at its heading (codex41's v41Jump, as the Library's own
   chips do). The page keeps its address (#/library) and climbs to More. */
var V55_LIB_ROWS = [['v53-practise-h', 'libPractise'], ['v53-bank-h', 'libBank'], ['v53-reading-h', 'libReading']];

function v55Due() {
  try { return (typeof v32DueToday === 'function') ? (Number(v32DueToday().total) || 0) : 0; } catch (e) { return 0; }
}
function v55LevelName() {
  try { if (typeof v53Lv === 'function') return v53Lv().name; } catch (e) { }
  try { if (typeof v32Lv === 'function') return v32Lv().name; } catch (e) { }
  return 'Village';
}
function v55LibLine(key) {
  if (key === 'libPractise') { var n = v55Due(); return n ? v55W('libPractiseDue', { n: n }) : v55W('libPractiseLine'); }
  if (key === 'libBank') return v55W('libBankLine', { level: v55LevelName() });
  return v55W('libReadingLine');
}
function v55LibraryGroupHtml() {
  var rows = V55_LIB_ROWS.map(function (r) {
    return '<li><button class="v25row" type="button" data-go="v55lib" data-arg="' + v55Esc(r[0]) + '" id="v55-lib-' + v55Esc(r[0].replace(/^v53-|-h$/g, '')) + '">'
      + '<span class="v25row-name">' + v55Esc(v55W(r[1])) + '</span><span class="v25row-line">' + v55Esc(v55LibLine(r[1])) + '</span></button></li>';
  }).join('');
  return '<section class="v32-group v55-libgroup" aria-labelledby="v55-more-lib"><h3 class="secgroup v32-gh" id="v55-more-lib">' + v55Esc(v55W('libraryG')) + '</h3>'
    + '<ul class="v25rows v32rows">' + rows + '</ul></section>';
}
function v55MoreShape(html) {
  var s = String(html || '');
  if (s.indexOf('v55-libgroup') >= 0) return s;
  var head = (typeof v32Head === 'function' && typeof v32W === 'function') ? v32Head(v32W('moreH')) : '';
  var at = head ? s.indexOf(head) : -1;
  if (at >= 0) { at += head.length; return s.slice(0, at) + v55LibraryGroupHtml() + s.slice(at); }
  var open = s.indexOf('>');
  return open >= 0 ? s.slice(0, open + 1) + v55LibraryGroupHtml() + s.slice(open + 1) : s + v55LibraryGroupHtml();
}
if (typeof v32MoreHtml === 'function') {
  var _v55MoreHtml = v32MoreHtml;
  v32MoreHtml = function () {
    var html = _v55MoreHtml.apply(this, arguments);
    try { return v55MoreShape(html); } catch (e) { return html; }
  };
}
if (typeof V25_GO !== 'undefined' && V25_GO) {
  V25_GO.v55lib = function (to) {
    if (typeof v32Go !== 'function') return;
    v32Go({ view: 'library' }, 'push');
    var id = String(to || '');
    if (id && typeof v41Jump === 'function') { try { v41Jump(id); } catch (e) { } }
  };
}

/* The Library loses its atlas section, its jump chip and its line's word
   for it (the atlas is the tab now); the DOM pass takes off the atlas doors
   the earlier layers put in it: codex39's regions door, codex45's field
   atlas door and any World Map row. The Wine Workshop stays in the reading
   rooms, where codex53 put it. */
if (typeof V32_WORDS !== 'undefined' && V32_WORDS) {
  V32_WORDS.libLine = v55W('libLine');
  V32_WORDS.libLineAll = v55W('libLineAll');
}
function v55LibraryShape(html) {
  var s = String(html || '');
  s = s.replace(/<section class="v32-sec v53-atlas"[^>]*>[\s\S]*?<\/section>/, '');
  s = s.replace(/<button type="button" class="v28-chip" data-v53="jump" data-to="v53-atlas-h">[^<]*<\/button>/, '');
  s = s.replace(/<li><button class="v25row" type="button" data-go="worldmap"[\s\S]*?<\/li>/g, '');
  return s;
}
if (typeof v32LibraryHtml === 'function') {
  var _v55LibraryHtml = v32LibraryHtml;
  v32LibraryHtml = function () {
    var html = _v55LibraryHtml.apply(this, arguments);
    try { return v55LibraryShape(html); } catch (e) { return html; }
  };
}
function v55LibraryDom(view) {
  if (!view || typeof view.querySelectorAll !== 'function') return;
  ['.v53-atlas', '.v39-door-regions', '.v45-door', '[data-go="worldmap"]', '[data-v53="jump"][data-to="v53-atlas-h"]'].forEach(function (sel) {
    Array.prototype.slice.call(view.querySelectorAll(sel)).forEach(function (n) {
      var row = (sel === '[data-go="worldmap"]' && n.parentNode && n.parentNode.tagName === 'LI') ? n.parentNode : n;
      if (row && row.parentNode) row.parentNode.removeChild(row);
    });
  });
}
if (typeof v32LibraryView === 'function') {
  var _v55LibraryView = v32LibraryView;
  v32LibraryView = function () {
    var view = _v55LibraryView.apply(this, arguments);
    try { v55LibraryDom(view); } catch (e) { }
    return view;
  };
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.library = v32LibraryView;
}

/* =========== 5. the Wine Atlas root =========== */

/* ----- the atlas's pieces, shared by the root, the region page and the country page ----- */

function v55Regions() { try { return (typeof v39Regions === 'function') ? v39Regions() : []; } catch (e) { return []; } }
function v55Ready(rec) { try { return !rec || typeof v39RecReady !== 'function' || v39RecReady(rec); } catch (e) { return false; } }
function v55FieldMap(slug) { try { return (typeof v45Map === 'function' && slug) ? v45Map(String(slug)) : null; } catch (e) { return null; } }
function v55CountryMaps(key) { try { return (typeof v45CountryMaps === 'function' && key) ? v45CountryMaps(String(key)) : []; } catch (e) { return []; } }
function v55Sheet(id) { try { return (typeof v31Sheet === 'function' && id) ? v31Sheet(id) : null; } catch (e) { return null; } }
function v55SheetFields(id) {
  try { return (typeof v45Maps === 'function') ? v45Maps().filter(function (m) { return m && m.type === 'region' && m.sheet === id; }).length : 0; } catch (e) { return 0; }
}

/* A field map place to the SVG's own units (1200 by 1500): the projection
   the atlas builder draws every dot with (.scripts/atlas-regions/drawing.cjs,
   equirectangular with the window's middle parallel as standard, into the
   box 153, 298, 894 by 600), so a mark lands on the dot the artwork carries. */
var V55_BOX = { x: 153, y: 298, w: 894, h: 600, W: 1200, H: 1500 };
function v55Project(m, p) {
  var b = m && m.bounds;
  if (!Array.isArray(b) || b.length !== 4 || !p || !isFinite(p.lon) || !isFinite(p.lat)) return null;
  var mid = (b[1] + b[3]) / 2, c = Math.cos(mid * Math.PI / 180);
  var w = (b[2] - b[0]) * c, h = b[3] - b[1];
  if (!(w > 0) || !(h > 0)) return null;
  var scale = Math.min(V55_BOX.w / w, V55_BOX.h / h);
  var ox = V55_BOX.x + (V55_BOX.w - w * scale) / 2, oy = V55_BOX.y + (V55_BOX.h - h * scale) / 2;
  return { x: ox + (p.lon - b[0]) * c * scale, y: oy + (b[3] - p.lat) * scale };
}
/* A field map place's kind, in our words. */
function v55KindWord(kind) {
  var k = String(kind || '').toLowerCase();
  if (k === 'study location') return v55W('kind_study');
  if (k === 'lesson town') return v55W('kind_lesson');
  if (/city context/.test(k)) return v55W('kind_context');
  if (k === 'commune') return v55W('kind_commune');
  if (k === 'town') return v55W('kind_town');
  if (k === 'reference place') return v55W('kind_reference');
  return v55W('kind_other');
}
var V55_GENERIC_NOTE = /^Town or settlement centre associated with /;
/* The items of a reading's place name read as a list ("Oger and Oiry", "Bar-sur-Aube, Bar-sur-Seine and Celles-sur-Ource"), folded. */
function v55Parts(name) {
  return String(name || '').split(/,|\band\b/).map(v55Fold).filter(Boolean);
}

/* The districts: the reading's places (every depth, in its order) and the
   field map's places joined. A map place joins the reading's place whose
   folded name is its own, else its lessonName (the heading the atlas
   builder matched it to), else one item of a place named as a list; the
   first such place in the reading's order takes it. A map place that joins
   none is drawn under Also on the map. Each map place is drawn once and
   each of the reading's places once. */
function v55Join(a, m) {
  var out = { tree: [], also: [], nodes: [], pins: [], deep: false, generic: false, count: 0, marked: 0 };
  var ready = !!a && v55Ready(a);
  var build = function (list) {
    return v55List(list).filter(function (p) { return p && v55Str(p.name); }).map(function (p) {
      var n = { name: v55Str(p.name), note: v55Str(p.note), depth: p.depth || '', pins: [], kids: [] };
      if (typeof v39DepthWord === 'function' && v39DepthWord(n.depth)) out.deep = true;
      out.nodes.push(n);
      n.kids = build(p.places);
      return n;
    });
  };
  if (ready) out.tree = build(a.places);
  var byName = {}, byPart = {};
  out.nodes.forEach(function (n) {
    var k = v55Fold(n.name);
    if (k && !v55Own(byName, k)) byName[k] = n;
  });
  out.nodes.forEach(function (n) {
    v55Parts(n.name).forEach(function (k) { if (!v55Own(byPart, k)) byPart[k] = n; });
  });
  v55List(m && m.places).forEach(function (p, i) {
    if (!p || !v55Str(p.name)) return;
    var at = v55Project(m, p);
    var pin = { n: i + 1, name: v55Str(p.name), kind: v55Str(p.kind), note: v55Str(p.note), x: at ? at.x : null, y: at ? at.y : null };
    if (V55_GENERIC_NOTE.test(pin.note)) { out.generic = true; pin.note = ''; }
    out.pins.push(pin);
    var k = v55Fold(p.name), lk = v55Fold(p.lessonName);
    var hit = (k && v55Own(byName, k)) ? byName[k] : ((lk && v55Own(byName, lk)) ? byName[lk] : ((k && v55Own(byPart, k)) ? byPart[k] : null));
    if (hit) hit.pins.push(pin); else out.also.push(pin);
  });
  out.count = out.nodes.length;
  out.marked = out.nodes.filter(function (n) { return n.pins.length; }).length;
  return out;
}
/* A region's district count, or -1 while its reading is still to come. */
function v55DistrictCount(a) {
  if (!a || !v55Ready(a)) return -1;
  return v55Join(a, null).count;
}
function v55RegionLine(a) {
  var m = v55FieldMap(a && a.slug);
  var bits = [];
  var n = v55DistrictCount(a);
  if (n >= 0) bits.push(n === 1 ? v55W('districtOne') : v55W('districtMany', { n: n }));
  if (m) bits.push(v55W('onMap', { m: v55List(m.places).length }));
  return bits.join(' · ');
}
/* The words a row is found by: its region, its country and every place either source names. */
function v55FindText(a, cname) {
  var words = [v55Str(a && a.name), v55Str(cname)];
  var m = v55FieldMap(a && a.slug);
  v55List(m && m.places).forEach(function (p) { if (p && p.name) words.push(p.name); if (p && p.lessonName) words.push(p.lessonName); });
  if (a && v55Ready(a)) v55Join(a, null).nodes.forEach(function (n) { words.push(n.name); });
  var seen = {};
  return v55Fold(words.join(' ')).split(' ').filter(function (w) { if (!w || seen[w]) return false; seen[w] = 1; return true; }).join(' ');
}

/* ----- the root ----- */

/* The countries in the order of the maps (MAP_GROUPS), then any sheet the
   groups leave out, then the countries asked by place with no sheet. */
function v55CountryOrder() {
  var out = [], seen = {};
  var add = function (c, sheet, group) {
    if (!c) return;
    var key = (typeof v39CountryKey === 'function') ? v39CountryKey(c) : v55Str(c.key);
    if (!key || seen[key]) return;
    seen[key] = 1;
    out.push({ key: key, c: c, sheet: sheet || '', group: group });
  };
  var sheets = (typeof v39Sheets === 'function') ? v39Sheets() : [];
  var groups = (typeof MAP_GROUPS !== 'undefined' && Array.isArray(MAP_GROUPS)) ? MAP_GROUPS : [];
  groups.forEach(function (g) {
    if (!Array.isArray(g) || !Array.isArray(g[1])) return;
    g[1].forEach(function (id) { if (sheets.indexOf(id) >= 0) add(v39CountryOf(id), id, String(g[0])); });
  });
  sheets.forEach(function (id) { add(v39CountryOf(id), id, ''); });
  if (typeof v39Mapless === 'function') v39Mapless().forEach(function (c) { add(c, '', 'mapless'); });
  return out;
}
function v55SheetLine(id) {
  var data = v55Sheet(id);
  var n = data ? v55List(data.regions).length : 0;
  var line = n === 1 ? v55W('sheetOne') : v55W('sheetMany', { n: n });
  var k = v55SheetFields(id);
  return k ? (k === 1 ? v55W('sheetField', { line: line }) : v55W('sheetFields', { line: line, k: k })) : line;
}
function v55SheetsHtml() {
  var sheets = (typeof v31Sheets === 'function') ? v31Sheets() : [];
  var ids = sheets.map(function (s) { return s.id; });
  var groups = (typeof MAP_GROUPS !== 'undefined' && Array.isArray(MAP_GROUPS)) ? MAP_GROUPS : [];
  var placed = {};
  var html = '';
  groups.forEach(function (g, i) {
    if (!Array.isArray(g) || !Array.isArray(g[1])) return;
    var rows = '';
    g[1].forEach(function (id) {
      if (ids.indexOf(id) < 0) return;
      placed[id] = 1;
      rows += v55SheetRow(id);
    });
    if (rows) html += '<h3 class="secgroup v32-gh" id="v55-sg-' + i + '">' + v55Esc(g[0]) + '</h3><ul class="v25rows v32rows">' + rows + '</ul>';
  });
  var rest = '';
  ids.forEach(function (id) { if (!placed[id]) rest += v55SheetRow(id); });
  if (rest) html += '<ul class="v25rows v32rows">' + rest + '</ul>';
  return { html: html, n: ids.length };
}
function v55SheetRow(id) {
  var name = (typeof v39SheetName === 'function') ? v39SheetName(id) : id;
  return '<li><button class="v25row" type="button" data-v39="openmap" data-sheet="' + v55Esc(id) + '" id="v55-sheet-' + v55Esc(id) + '">'
    + '<span class="v25row-name">' + v55Esc(name) + '</span><span class="v25row-line">' + v55Esc(v55SheetLine(id)) + '</span></button></li>';
}
function v55RegionRow(a, cname) {
  return '<li data-v55-find="' + v55Esc(v55FindText(a, cname)) + '" data-v55-slug="' + v55Esc(a.slug) + '"><button class="v25row" type="button" data-v39="region" data-slug="' + v55Esc(a.slug) + '" id="v55-r-' + v55Esc(a.slug) + '">'
    + '<span class="v25row-name">' + v55Esc(a.name) + '</span><span class="v25row-line" data-v55-count="' + v55Esc(a.slug) + '">' + v55Esc(v55RegionLine(a)) + '</span></button></li>';
}
function v55MaplessLine(key) {
  var maps = v55CountryMaps(key);
  if (!maps.length) return v55W('countryRowLine');
  return maps.length === 1 ? v55W('maplessRow', { m: v55List(maps[0].places).length }) : v55W('maplessRows', { k: maps.length });
}
function v55CountryGroupHtml(row) {
  var c = row.c, key = row.key, name = v55Str(c.name) || key;
  var regions = row.sheet && typeof v39SheetRegions === 'function' ? v39SheetRegions(row.sheet) : [];
  var lead = '<li data-v55-find="' + v55Esc(v55Fold(name)) + '"><button class="v25row" type="button" data-v39="country" data-key="' + v55Esc(key) + '" id="v55-c-' + v55Esc(key) + '">'
    + '<span class="v25row-name">' + v55Esc(v55W('countryRow', { name: name })) + '</span><span class="v25row-line">' + v55Esc(row.sheet ? v55W('countryRowLine') : v55MaplessLine(key)) + '</span></button></li>';
  return '<section class="v32-group v55-country" data-v55-country="' + v55Esc(key) + '" aria-labelledby="v55-ch-' + v55Esc(key) + '"><h3 class="secgroup v32-gh" id="v55-ch-' + v55Esc(key) + '">' + v55Esc(name) + '</h3>'
    + '<ul class="v25rows v32rows">' + lead + regions.map(function (a) { return v55RegionRow(a, name); }).join('') + '</ul></section>';
}
function v55HubHtml() {
  var order = v55CountryOrder();
  var sheets = v55SheetsHtml();
  var regions = v55Regions();
  var html = '<div class="v25page v55 v55-hub" id="v55-hub">'
    + v32Head(v55W('hubH'), v55W('hubSub', { sheets: sheets.n, countries: order.length, regions: regions.length }))
    + '<p class="v32-line">' + v55Esc(v55W('hubLine')) + '</p>'
    + '<nav class="v32chips v55-chips" aria-label="' + v55Esc(v55W('jumps')) + '">'
    + '<button type="button" class="v28-chip" data-v53="jump" data-to="v55-sheets-h">' + v55Esc(v55W('chipWorld')) + '</button>'
    + '<button type="button" class="v28-chip" data-v53="jump" data-to="v55-countries-h">' + v55Esc(v55W('chipCountries')) + '</button>'
    + '<button type="button" class="v28-chip" data-v53="jump" data-to="v55-regions-h">' + v55Esc(v55W('chipRegions')) + '</button>'
    + '<button type="button" class="v28-chip" data-go="fieldatlas" id="v55-chip-fields">' + v55Esc(v55W('chipField')) + '</button>'
    + '<button type="button" class="v28-chip" data-go="techniques" id="v55-chip-techniques">' + v55Esc(v55W('chipTech')) + '</button>'
    + '</nav>'
    + '<div class="v55-find"><label for="v55-find">' + v55Esc(v55W('findLabel')) + '</label>'
    + '<input id="v55-find" class="sainput" type="search" maxlength="160" autocomplete="off" spellcheck="false" placeholder="' + v55Esc(v55W('findHolder')) + '">'
    + '<p class="v55-findcount" id="v55-findcount" role="status" aria-live="polite"></p></div>';
  html += '<section class="v32-sec v55-sheets" aria-labelledby="v55-sheets-h"><h2 class="v32-h2" id="v55-sheets-h" tabindex="-1">' + v55Esc(v55W('sheetsH')) + '</h2>'
    + '<p class="v32-line">' + v55Esc(v55W('sheetsLine')) + '</p>' + sheets.html + '</section>';
  html += '<section class="v32-sec v55-countries" aria-labelledby="v55-countries-h"><h2 class="v32-h2" id="v55-countries-h" tabindex="-1">' + v55Esc(v55W('countriesH')) + '</h2>'
    + '<p class="v32-line">' + v55Esc(v55W('countriesLine')) + '</p><div class="v32chips v55-countrychips">'
    + order.map(function (row) { return '<button type="button" class="v28-chip" data-v39="country" data-key="' + v55Esc(row.key) + '">' + v55Esc(v55Str(row.c.name) || row.key) + '</button>'; }).join('')
    + '</div></section>';
  var sheetsPart = '', maplessPart = '';
  order.forEach(function (row) {
    if (row.group === 'mapless') maplessPart += v55CountryGroupHtml(row);
    else sheetsPart += v55CountryGroupHtml(row);
  });
  html += '<section class="v32-sec v55-regions" aria-labelledby="v55-regions-h"><h2 class="v32-h2" id="v55-regions-h" tabindex="-1">' + v55Esc(v55W('regionsH')) + '</h2>'
    + '<p class="v32-line">' + v55Esc(v55W('regionsLine')) + '</p>' + sheetsPart
    + (maplessPart ? '<h3 class="secgroup v32-gh v55-maplessh" id="v55-mapless-h">' + v55Esc(v55W('maplessH')) + '</h3><p class="v32-line">' + v55Esc(v55W('maplessLine')) + '</p>' + maplessPart : '')
    + '<p class="v32-line v55-findnone" hidden>' + v55Esc(v55W('findNone')) + '</p></section>';
  if (typeof v31StorageHtml === 'function') { try { html += v31StorageHtml(); } catch (e) { } }
  html += '<p class="v31-bibliography"><a href="atlas-sources.html">' + v55Esc(v55W('biblio')) + '</a></p>';
  return html + '</div>';
}

/* The search: every word found in a row's words; while it holds a word the
   sheets and the country chips step aside so the rows found sit under it. */
var V55 = { query: '' };
function v55Filter(box, value) {
  if (!box || typeof box.querySelectorAll !== 'function') return;
  V55.query = String(value || '');
  var words = v55Fold(V55.query).split(' ').filter(Boolean);
  var shown = 0, total = 0;
  Array.prototype.forEach.call(box.querySelectorAll('.v55-regions li[data-v55-find]'), function (li) {
    var hay = ' ' + (li.getAttribute('data-v55-find') || '') + ' ';
    var hit = !words.length || words.every(function (w) { return hay.indexOf(w) >= 0; });
    li.hidden = !hit;
    if (li.hasAttribute('data-v55-slug')) { total++; if (hit) shown++; }
  });
  Array.prototype.forEach.call(box.querySelectorAll('.v55-country'), function (g) {
    g.hidden = !!words.length && !g.querySelector('li[data-v55-find]:not([hidden])');
  });
  Array.prototype.forEach.call(box.querySelectorAll('.v55-sheets,.v55-countries,.v55-maplessh,.v55-maplessh+.v32-line'), function (n) { n.hidden = !!words.length; });
  var none = box.querySelector('.v55-findnone');
  if (none) none.hidden = !words.length || !!shown;
  var count = box.querySelector('#v55-findcount');
  if (count) count.textContent = words.length ? v55W('findCount', { n: shown, m: total }) : '';
}
/* Each sheet's reading fetched once through codex39's own loader (its
   wait, its timeout, its offline cache), so a row's district count is whole;
   a row is drawn again in place when its file lands, and a file that cannot
   come is left for the region's own page to try again. */
function v55HubPaint(part) {
  if (typeof document === 'undefined' || !document.getElementById('v55-hub')) return;
  v55Regions().forEach(function (a) {
    if (typeof v39PartName === 'function' && v39PartName(a) !== part) return;
    var line = document.querySelector('[data-v55-count="' + a.slug + '"]');
    if (line) line.textContent = v55RegionLine(a);
    var li = document.querySelector('li[data-v55-slug="' + a.slug + '"]');
    if (li) {
      var c = (typeof v39CountryOf === 'function') ? v39CountryOf(a.sheet) : null;
      li.setAttribute('data-v55-find', v55FindText(a, c ? c.name : ''));
    }
  });
  var hub = document.getElementById('v55-hub');
  if (hub && V55.query) v55Filter(hub, V55.query);
}
function v55HubLoad() {
  if (typeof v39LoadPart !== 'function' || typeof v39PartName !== 'function') return;
  var parts = [];
  v55Regions().forEach(function (a) { var p = v39PartName(a); if (p && parts.indexOf(p) < 0 && !v55Ready(a)) parts.push(p); });
  parts.forEach(function (p) {
    v39LoadPart(p, function (ok) {
      if (!ok) { try { delete V39_PARTS.failed[p]; } catch (e) { } }
      v55HubPaint(p);
    });
  });
}
function v55HubView() {
  return v39Build(v55HubHtml(), function (box) {
    var input = box.querySelector('#v55-find');
    if (input && typeof input.addEventListener === 'function') {
      input.value = V55.query;
      input.addEventListener('input', function () { v55Filter(box, input.value); });
      if (V55.query) v55Filter(box, V55.query);
    }
    if (typeof v31WireStorage === 'function') { try { v31WireStorage(box); } catch (e) { } }
    if (typeof v31RefreshStorage === 'function') { try { setTimeout(v31RefreshStorage, 0); } catch (e) { } }
    v55HubLoad();
  });
}
/* The world map with no sheet draws the root; a sheet still draws codex31's. */
if (typeof worldMapView === 'function') {
  var _v55WorldMapView = worldMapView;
  worldMapView = function () {
    if (S.wmap && v55Sheet(S.wmap)) return _v55WorldMapView.apply(this, arguments);
    try { S.wmap = null; return v55HubView(); } catch (e) { return _v55WorldMapView.apply(this, arguments); }
  };
}

/* =========== 6. the region page =========== */

/* A field map's figure, drawn by codex45's own renderer: its map view is
   built once with codex32's builder lent out for the string it is handed
   (the view's image, hydration and storage passes find nothing to touch on
   the stand in), and the figure is taken whole: the artwork as codex45
   versions it, the enlarging viewer behind its button (codex45's document
   listener answers data-v45 anywhere) and the image failure note. If that
   string ever lacks a figure, the same figure is drawn from codex45's own
   pieces. */
function v55FieldFigure(m) {
  if (!m) return '';
  var html = '';
  if (typeof v45MapView === 'function' && typeof v32Build === 'function') {
    var build = v32Build, was = S._v45map;
    try {
      S._v45map = m.id;
      v32Build = function (h) {
        html = String(h || '');
        return { querySelector: function () { return null; }, querySelectorAll: function () { return []; }, addEventListener: function () { } };
      };
      v45MapView();
    } catch (e) { html = ''; }
    finally { v32Build = build; S._v45map = was; }
  }
  var at = html.indexOf('<figure class="v45-figure">');
  var end = at >= 0 ? html.indexOf('</figure>', at) : -1;
  if (at >= 0 && end > at) return html.slice(at, end + '</figure>'.length);
  if (typeof v45File !== 'function' || typeof v45Button !== 'function') return '';
  return '<figure class="v45-figure"><button class="v45-image-open" type="button" data-v45="zoom" data-v45-arg="' + v55Esc(m.id) + '">'
    + '<img src="' + v55Esc(v45File(m)) + '" width="1200" height="1500" alt="' + v55Esc(m.title) + '" data-v45-image decoding="async"></button>'
    + '<figcaption>' + v45Button('Enlarge map', 'zoom', m.id) + '</figcaption></figure>';
}
/* The map's holder: the figure, the mark a district's button sets on it
   (inert to the pointer, so the figure's own button stays whole), the map's
   scope and the door to the field map screen (its notes, its sources and its
   offline copy). */
function v55MapHtml(m) {
  var fig = v55FieldFigure(m);
  if (!fig) return '';
  return '<section class="v55-map" aria-labelledby="v55-map-h"><h2 class="v32-h2" id="v55-map-h">' + v55Esc(v55W('mapH')) + '</h2>'
    + '<div class="v55-mapfig" data-v55-map="' + v55Esc(m.id) + '">' + fig
    + '<div class="v55-pin" hidden aria-hidden="true"><span class="v55-pin-ring"></span><span class="v55-pin-tag"></span></div></div>'
    + (v55Str(m.scope) ? '<p class="v45-scope v55-scope">' + v55Esc(m.scope) + '</p>' : '')
    + '<div class="v45-actions v55-mapacts">' + (typeof v45Button === 'function' ? v45Button(v55W('fieldDoor'), 'map', m.id) : '') + '</div>'
    + '<p class="sr-only" id="v55-pin-said" role="status" aria-live="polite"></p></section>';
}
/* No field map: a door to the region's sheet with its numbered row marked (codex39's map act). */
function v55SheetDoorHtml(a) {
  var c = (typeof v39CountryOf === 'function') ? v39CountryOf(a.sheet) : null;
  var ok = c && !c.mapless && !a.mapless && typeof a.index === 'number' && isFinite(a.index) && a.index >= 0 && (typeof v39HasMap !== 'function' || v39HasMap(a.sheet));
  if (!ok || typeof v39Btn !== 'function') return '';
  var sheet = (typeof v39SheetName === 'function') ? v39SheetName(a.sheet) : a.sheet;
  return '<section class="v55-map" aria-labelledby="v55-map-h"><h2 class="v32-h2" id="v55-map-h">' + v55Esc(v55W('mapH')) + '</h2><div class="v28-btnrow">'
    + v39Btn('btn gold', 'map', ' data-sheet="' + v55Esc(a.sheet) + '" data-index="' + v55Esc(a.index) + '"', v55W('sheetDoor', { name: a.name, sheet: sheet })) + '</div></section>';
}

/* ----- the districts ----- */

function v55PinHtml(pin, named) {
  var line = '<span class="v55-dmap">' + v55Esc(v55W('onMapAt', { n: pin.n, kind: v55KindWord(pin.kind) })) + (pin.note ? ' ' + v55Esc(pin.note) : '') + '</span>';
  var btn = '';
  if (pin.x !== null && pin.y !== null) {
    btn = '<button type="button" class="btn small ghost v55-pinbtn" data-v55="pin" data-pin="' + v55Esc(pin.n) + '" data-x="' + v55Esc(pin.x.toFixed(2)) + '" data-y="' + v55Esc(pin.y.toFixed(2)) + '"'
      + ' data-name="' + v55Esc(pin.name) + '" aria-pressed="false" aria-label="' + v55Esc(v55W('pinAria', { name: pin.name })) + '">'
      + v55Esc(named ? v55W('pinNamed', { name: pin.name }) : v55W('pin')) + '</button>';
  }
  return '<div class="v55-pinrow">' + line + btn + '</div>';
}
function v55NodeHtml(n) {
  var depth = (typeof v39DepthWord === 'function') ? v39DepthWord(n.depth) : '';
  var many = n.pins.length > 1;
  var html = '<li class="v55-d" data-v55-place="' + v55Esc(n.name) + '"><div class="v55-dhead"><b class="v55-dname">' + v55Esc(n.name) + '</b>'
    + (depth ? ' <span class="v39-depth">' + v55Esc(depth) + '</span>' : '') + '</div>';
  if (n.note) html += '<p class="v55-dnote">' + v55Esc(n.note) + '</p>';
  n.pins.forEach(function (pin) { html += v55PinHtml(pin, many || v55Fold(pin.name) !== v55Fold(n.name)); });
  if (n.kids.length) html += '<ul class="v55-dlist v55-sub">' + n.kids.map(v55NodeHtml).join('') + '</ul>';
  return html + '</li>';
}
function v55AlsoHtml(pin) {
  return '<li class="v55-d v55-alsoitem" data-v55-place="' + v55Esc(pin.name) + '"><div class="v55-dhead"><b class="v55-dname">' + v55Esc(pin.name) + '</b></div>' + v55PinHtml(pin, false) + '</li>';
}
function v55DistrictsHtml(a, m, J) {
  var ready = v55Ready(a);
  if (!J.count && !J.pins.length) return '';
  var html = '<section class="v55-districts" aria-labelledby="v55-districts-h"><h2 class="v32-h2" id="v55-districts-h" tabindex="-1">' + v55Esc(v55W('districtsH')) + '</h2>';
  if (!ready) {
    html += '<p class="v32-line">' + v55Esc(v55W('districtsWait')) + '</p>';
    if (J.generic) html += '<p class="v32-line v55-dotkey">' + v55Esc(v55W('dotKey')) + '</p>';
    return html + '<ul class="v55-dlist v55-also">' + J.also.map(v55AlsoHtml).join('') + '</ul></section>';
  }
  html += '<p class="v32-line">' + v55Esc(J.marked === 1 ? v55W('districtsLineOne', { n: J.count }) : v55W('districtsLine', { n: J.count, m: J.marked })) + '</p>';
  if (J.deep && typeof v39W === 'function' && typeof v39LevelName === 'function') {
    html += '<p class="v39-note v39-placeskey">' + v55Esc(v39W('placesKey', { advanced: v39LevelName('advanced'), master: v39LevelName('master') })) + '</p>';
  }
  if (J.generic) html += '<p class="v32-line v55-dotkey">' + v55Esc(v55W('dotKey')) + '</p>';
  if (J.tree.length) html += '<ul class="v55-dlist">' + J.tree.map(v55NodeHtml).join('') + '</ul>';
  if (J.also.length) {
    html += '<h3 class="secgroup v32-gh" id="v55-also-h">' + v55Esc(v55W('alsoH')) + '</h3><p class="v32-line">' + v55Esc(v55W('alsoLine')) + '</p>'
      + '<ul class="v55-dlist v55-also">' + J.also.map(v55AlsoHtml).join('') + '</ul>';
  }
  return html + '</section>';
}

/* ----- In the Codex ----- */

/* The Court's subject for the region: codex54's rule, by the region's own name and country. */
function v55Subject(a) {
  if (typeof v54SubjectFor !== 'function' || !a) return null;
  var c = (typeof v39CountryOf === 'function') ? v39CountryOf(a.sheet) : null;
  try { return v54SubjectFor({ region: v55Str(a.name) + (c && c.name ? ', ' + c.name : '') }) || null; } catch (e) { return null; }
}
/* The Court's grid reads whose place is the region: each named place of a
   read (split on commas and "and", a bracket's note left aside) resolved
   with the read's country by codex39's own resolver, never by a near name. */
function v55GridReads(a) {
  var R = {};
  try { R = (typeof v53GridReads === 'function') ? (v53GridReads() || {}) : ((typeof GRID_READS !== 'undefined' && GRID_READS) ? GRID_READS : {}); } catch (e) { R = {}; }
  var out = [], seen = {};
  if (!a || typeof v39SlugFor !== 'function') return out;
  Object.keys(R).forEach(function (slug) {
    var g = R[slug];
    v55List(g && g.reads).forEach(function (read) {
      var region = v55Str(read && read.region), country = v55Str(read && read.country);
      if (!region) return;
      var places = region.split(/,|\band\b/).map(function (p) { return p.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim(); }).filter(Boolean);
      var hit = places.some(function (p) { return v39SlugFor(p + (country ? ', ' + country : '')) === a.slug; });
      if (!hit) return;
      /* one door a grape: the grid drill is one screen, its places named together */
      if (!v55Own(seen, slug)) { seen[slug] = out.length; out.push({ slug: slug, grape: v55Str(g.name) || slug, places: [] }); }
      var row = out[seen[slug]];
      if (row.places.indexOf(region) < 0) row.places.push(region);
    });
  });
  out.forEach(function (row) { row.region = v55And(row.places); });
  return out;
}
function v55And(list) {
  var l = v55List(list).filter(Boolean);
  return l.length < 2 ? (l[0] || '') : l.slice(0, -1).join(', ') + ' and ' + l[l.length - 1];
}
/* The grapes' pages: each grape the reading names that the joined book of grapes knows. */
function v55Grapes(a) {
  var out = [], seen = {};
  if (!a || typeof v53GrapeKey !== 'function') return out;
  v55List(a.grapes).forEach(function (g) {
    var name = v55Str(g && g.name);
    var slug = name ? v53GrapeKey(name) : '';
    if (!slug || seen[slug]) return;
    if (typeof v53GrapeFind === 'function' && !v53GrapeFind(slug)) return;
    seen[slug] = 1;
    out.push({ slug: slug, name: (typeof v53GrapeName === 'function') ? v53GrapeName(slug) : name });
  });
  return out;
}
function v55Door(go, arg, label, id) {
  return '<button type="button" class="btn ghost" data-go="' + v55Esc(go) + '" data-arg="' + v55Esc(arg) + '"' + (id ? ' id="' + v55Esc(id) + '"' : '') + '>' + v55Esc(label) + '</button>';
}
function v55CodexHtml(a, study) {
  var groups = [];
  var techs = [];
  try { techs = (typeof v46For === 'function') ? v46For(a.slug) : []; } catch (e) { techs = []; }
  if (techs.length && typeof v46Button === 'function') {
    groups.push(['techH', 'v55-techs', '<div class="v46-links v55-doors">' + techs.map(function (t) { return v46Button(t.name, 'lesson', t.slug); }).join('') + '</div>']);
  }
  var subject = v55Subject(a);
  if (subject && subject.id) groups.push(['subjectH', 'v55-subject', '<div class="v55-doors">' + v55Door('cmssubject', subject.id, v55Str(subject.name) || subject.id, 'v55-subject-door') + '</div>']);
  var reads = v55GridReads(a);
  if (reads.length) {
    groups.push(['gridH', 'v55-grid', '<div class="v55-doors">' + reads.map(function (r) { return v55Door('griddrill', r.slug, v55W('gridDoor', { grape: r.grape, region: r.region })); }).join('') + '</div>']);
  }
  var grapes = v55Ready(a) ? v55Grapes(a) : [];
  if (grapes.length) groups.push(['grapesH', 'v55-grapes', '<div class="v55-doors">' + grapes.map(function (g) { return v55Door('grape', g.slug, g.name); }).join('') + '</div>']);
  if (study.length) groups.push(['studyH', 'v55-study', '<div class="v55-doors v39-acts">' + study.join('') + '</div>']);
  if (!groups.length) return '';
  return '<section class="v55-codex" aria-labelledby="v55-codex-h"><h2 class="v32-h2" id="v55-codex-h" tabindex="-1">' + v55Esc(v55W('codexH')) + '</h2>'
    + groups.map(function (g) { return '<div class="v55-cgroup ' + g[1] + '"><h3 class="secgroup v32-gh">' + v55Esc(v55W(g[0])) + '</h3>' + g[2] + '</div>'; }).join('') + '</section>';
}

/* ----- the page ----- */

var V55_HEAD_RE = /<div class="viewhead">[\s\S]*?<\/h2>(?:<div class="sub">[\s\S]*?<\/div>)?<\/div>(?:<p class="v39-lead">[\s\S]*?<\/p>)?/;
function v55RegionHtml(a) {
  var ready = v55Ready(a);
  var part = (typeof v39PartName === 'function') ? v39PartName(a) : '';
  var art = String(v39ArticleHtml(a, ready ? undefined : v39WaitHtml(part)) || '');
  /* codex39's The places is folded into The districts; its flashcards and drill move to In the Codex */
  art = art.replace(/<details class="v28-q v39-sec" id="v39-sec-places"[\s\S]*?<\/details>/, '');
  art = art.replace(/<button type="button" class="v28-chip" data-v39="chip" data-sec="v39-sec-places">[^<]*<\/button>/, '');
  var study = [];
  art = art.replace(/<button type="button" class="[^"]*" data-v39="(?:flash|drill)" id="v39-act-(?:flash|drill)"[^>]*>[^<]*<\/button>/g, function (b) { study.push(b); return ''; });
  art = art.replace('<div class="v28-btnrow v39-acts"></div>', '');
  art = art.replace('<div class="v25page v39 v39-article"', '<div class="v25page v39 v39-article v55 v55-page v55-region"');
  var m = v55FieldMap(a.slug);
  var J = v55Join(a, m);
  var top = (m ? v55MapHtml(m) : '') || v55SheetDoorHtml(a);
  top += v55DistrictsHtml(a, m, J);
  var head = V55_HEAD_RE.exec(art);
  if (head) art = art.slice(0, head.index + head[0].length) + top + art.slice(head.index + head[0].length);
  else art = art.replace(/(<div class="v25page[^>]*>)/, '$1' + top);
  var codex = v55CodexHtml(a, study);
  var acts = art.lastIndexOf('<div class="v28-btnrow v39-acts">');
  if (acts >= 0) art = art.slice(0, acts) + codex + art.slice(acts);
  else { var close = art.lastIndexOf('</div>'); art = close >= 0 ? art.slice(0, close) + codex + art.slice(close) : art + codex; }
  return art;
}
function v55PageWire(box) {
  if (typeof v45Images === 'function') { try { v45Images(box); } catch (e) { } }
  if (typeof v31WireImages === 'function') { try { v31WireImages(box); } catch (e) { } }
}
function v55RegionView(a) {
  V55.pin = null;
  var ready = v55Ready(a);
  if (!ready) { if (typeof v39Fetch === 'function') v39Fetch(v39PartName(a)); }
  else if (typeof v39MarkRead === 'function') v39MarkRead(a.slug);
  return v39Build(v55RegionHtml(a), v55PageWire);
}
if (typeof v39RegionView === 'function') {
  var _v55RegionView = v39RegionView;
  v39RegionView = function () {
    var a = (typeof v39Find === 'function') ? v39Find(S._v39region) : null;
    if (!a) return _v55RegionView.apply(this, arguments);
    try { return v55RegionView(a); } catch (e) { return _v55RegionView.apply(this, arguments); }
  };
}

/* ----- the mark on the map ----- */

/* A district's button marks its point: the mark placed over the artwork by
   the image's drawn box (the figure keeps the map whole with object-fit, so
   the box may be wider than the map), the district lit, the map brought
   into view and the mark said aloud. The mark follows the map on a resize. */
function v55PinPlace(page) {
  var p = V55.pin;
  if (!p || !page) return false;
  var holder = page.querySelector('.v55-mapfig');
  var pin = holder ? holder.querySelector('.v55-pin') : null;
  var img = holder ? holder.querySelector('img') : null;
  if (!holder || !pin || !img || img.hidden) { if (pin) pin.hidden = true; return false; }
  var r = img.getBoundingClientRect(), f = holder.getBoundingClientRect();
  if (!r.width || !r.height) { pin.hidden = true; return false; }
  var s = Math.min(r.width / V55_BOX.W, r.height / V55_BOX.H);
  var left = r.left - f.left + (r.width - V55_BOX.W * s) / 2 + p.x * s;
  var top = r.top - f.top + (r.height - V55_BOX.H * s) / 2 + p.y * s;
  pin.style.left = left.toFixed(1) + 'px';
  pin.style.top = top.toFixed(1) + 'px';
  var tag = pin.querySelector('.v55-pin-tag');
  if (tag) tag.textContent = p.n + ' · ' + p.name;
  if (pin.classList) { if (left > f.width * 0.6) pin.classList.add('v55-pin-left'); else pin.classList.remove('v55-pin-left'); }
  pin.hidden = false;
  return true;
}
function v55PinShow(btn) {
  var page = btn && typeof btn.closest === 'function' ? btn.closest('.v55-page') : null;
  if (!page) return;
  var n = btn.getAttribute('data-pin') || '', name = btn.getAttribute('data-name') || '';
  Array.prototype.forEach.call(page.querySelectorAll('[data-v55="pin"][aria-pressed="true"]'), function (b) { b.setAttribute('aria-pressed', 'false'); });
  Array.prototype.forEach.call(page.querySelectorAll('.v55-d.v55-here'), function (d) { d.classList.remove('v55-here'); });
  btn.setAttribute('aria-pressed', 'true');
  var li = btn.closest('.v55-d');
  if (li) li.classList.add('v55-here');
  V55.pin = { n: n, name: name, x: Number(btn.getAttribute('data-x')), y: Number(btn.getAttribute('data-y')) };
  var said = page.querySelector('#v55-pin-said');
  var placed = v55PinPlace(page);
  if (said) said.textContent = placed ? v55W('pinSaid', { name: name, n: n }) : v55W('pinGone', { n: n });
  if (!placed) return;
  try {
    var holder = page.querySelector('.v55-mapfig');
    var img = holder.querySelector('img');
    var r = img.getBoundingClientRect();
    var vh = window.innerHeight || 0;
    if (r.top < 56 || r.bottom > vh) window.scrollTo(0, Math.max(0, Math.round(r.top + (window.scrollY || window.pageYOffset || 0) - 64)));
  } catch (e) { }
}
(function () {
  if (typeof document === 'undefined' || !document || typeof document.addEventListener !== 'function') return;
  document.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v55]') : null;
    if (!node || node.disabled) return;
    var act = node.getAttribute('data-v55');
    if (act === 'pin') { if (typeof e.preventDefault === 'function') e.preventDefault(); v55PinShow(node); return; }
    if (act === 'choose') { if (typeof e.preventDefault === 'function') e.preventDefault(); v55Choose(node); return; }
  });
  if (typeof window !== 'undefined' && window && typeof window.addEventListener === 'function') {
    window.addEventListener('resize', function () {
      try { if (V55.pin) v55PinPlace(document.querySelector('.v55-page')); } catch (e) { }
    });
  }
})();

/* ----- after every draw: the doors the region's own page now holds ----- */

/* codex45 puts a door to the field map under the head of a region and a
   country page (the map is on the page now, its field map door under it),
   and codex46 its techniques there (In the Codex holds them, in codex46's
   own v46-links box, so it adds none); the door is taken off a page this
   layer drew. */
function v55AfterDraw() {
  if (S.view !== 'region' && S.view !== 'country') return;
  if (typeof document === 'undefined' || !document) return;
  var view = document.getElementById('view');
  if (!view || typeof view.querySelector !== 'function' || !view.querySelector('.v55-page')) return;
  Array.prototype.slice.call(view.querySelectorAll('.v45-door')).forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
}
if (typeof render === 'function') {
  var _v55Render = render;
  render = function () {
    var out = _v55Render.apply(this, arguments);
    try { v55AfterDraw(); } catch (e) { }
    return out;
  };
}

/* =========== 7. the country page =========== */

/* Its map, inline: the country's own field map where the field atlas holds
   one (the countries asked by place); for the group of Eastern Europe, one
   of its eight at a time, chosen by a chip; else the country's sheet, its
   artwork opening codex31's sheet and its guide (codex39's openmap act), with
   codex31's own enlarging viewer under it. */
function v55SheetMapHtml(c, sheet) {
  var data = v55Sheet(sheet);
  if (!data || typeof mapFile !== 'function') return '';
  var name = v55Str(c.name) || sheet;
  return '<section class="v55-map" aria-labelledby="v55-map-h"><h2 class="v32-h2" id="v55-map-h">' + v55Esc(v55W('mapH')) + '</h2>'
    + '<div class="v55-mapfig v55-sheetfig" data-v55-sheet="' + v55Esc(sheet) + '"><figure class="v55-figure">'
    + '<button type="button" class="v55-sheetopen" data-v39="openmap" data-sheet="' + v55Esc(sheet) + '" aria-label="' + v55Esc(v55W('sheetOpen') + ': ' + name) + '">'
    + '<img data-atlas-image src="' + v55Esc(mapFile(sheet)) + '" width="' + v55Esc(data.width) + '" height="' + v55Esc(data.height) + '" alt="' + v55Esc(v55W('sheetAlt', { name: name })) + '" decoding="async">'
    + '<span class="v31-image-fail" hidden>' + v55Esc(v55W('sheetFail')) + '</span></button>'
    + '<figcaption><button type="button" class="btn ghost" data-v55="enlarge" data-sheet="' + v55Esc(sheet) + '">' + v55Esc(v55W('sheetEnlarge')) + '</button></figcaption>'
    + '</figure></div></section>';
}
var V55_CHOSEN = {};
function v55CountryFieldHtml(key, maps) {
  var chosen = null;
  maps.forEach(function (m) { if (m.id === V55_CHOSEN[key]) chosen = m; });
  chosen = chosen || maps[0];
  var html = v55MapHtml(chosen);
  if (!html || maps.length < 2) return html;
  var chips = '<nav class="v32chips v55-choose" aria-label="' + v55Esc(v55W('chooseMap')) + '">' + maps.map(function (m) {
    return '<button type="button" class="v28-chip" data-v55="choose" data-key="' + v55Esc(key) + '" data-map="' + v55Esc(m.id) + '" aria-pressed="' + (m === chosen ? 'true' : 'false') + '">' + v55Esc(m.title) + '</button>';
  }).join('') + '</nav>';
  return html.replace('<div class="v55-mapfig"', chips + '<div class="v55-mapfig"');
}
/* A chip of the chooser: the figure redrawn in place (no entry, no scroll),
   the chip pressed, the field map door pointed at the map chosen. */
function v55Choose(btn) {
  var page = btn && typeof btn.closest === 'function' ? btn.closest('.v55-page') : null;
  var m = v55FieldMap(btn && btn.getAttribute('data-map'));
  if (!page || !m) return;
  V55_CHOSEN[btn.getAttribute('data-key') || ''] = m.id;
  var holder = page.querySelector('.v55-mapfig');
  if (holder) {
    holder.setAttribute('data-v55-map', m.id);
    holder.innerHTML = v55FieldFigure(m) + '<div class="v55-pin" hidden aria-hidden="true"><span class="v55-pin-ring"></span><span class="v55-pin-tag"></span></div>';
    if (typeof v45Images === 'function') { try { v45Images(holder); } catch (e) { } }
  }
  var door = page.querySelector('.v55-mapacts [data-v45="map"]');
  if (door) door.setAttribute('data-v45-arg', m.id);
  var scope = page.querySelector('.v55-scope');
  if (scope) scope.textContent = v55Str(m.scope);
  Array.prototype.forEach.call(page.querySelectorAll('[data-v55="choose"]'), function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
  V55.pin = null;
}
/* codex39's regions of the country, each with its district count and its field map's count under its name. */
function v55CountryRegionsHtml(sheet) {
  var regions = (sheet && typeof v39SheetRegions === 'function') ? v39SheetRegions(sheet) : [];
  if (!regions.length) return '';
  return '<ol class="v39-doors v55-cregions">' + regions.map(function (a) {
    var first = (typeof v39FirstSentence === 'function') ? v39FirstSentence(a.summary) : '';
    return '<li data-v55-slug="' + v55Esc(a.slug) + '">' + v39Btn('btn small ghost v39-doorbtn', 'region', ' data-slug="' + v55Esc(a.slug) + '"', a.name)
      + '<span class="v39-doorline v55-doorcount" data-v55-count="' + v55Esc(a.slug) + '">' + v55Esc(v55RegionLine(a)) + '</span>'
      + (first ? '<span class="v39-doorline">' + v55Esc(first) + '</span>' : '') + '</li>';
  }).join('') + '</ol>';
}
function v55CountryHtml(c) {
  var ready = v55Ready(c);
  var part = (typeof v39PartName === 'function') ? v39PartName(c) : '';
  var html = String(v39CountryHtml(c, ready ? undefined : v39WaitHtml(part)) || '');
  html = html.replace('<div class="v25page v39 v39-country"', '<div class="v25page v39 v39-country v55 v55-page v55-country"');
  var key = (typeof v39CountryKey === 'function') ? v39CountryKey(c) : v55Str(c.key);
  var sheet = v55Str(c.sheet);
  var maps = v55CountryMaps(key);
  var top = maps.length ? v55CountryFieldHtml(key, maps) : ((sheet && !c.mapless) ? v55SheetMapHtml(c, sheet) : '');
  var head = V55_HEAD_RE.exec(html);
  if (top) {
    if (head) html = html.slice(0, head.index + head[0].length) + top + html.slice(head.index + head[0].length);
    else html = html.replace(/(<div class="v25page[^>]*>)/, '$1' + top);
  }
  var rows = v55CountryRegionsHtml(sheet);
  if (rows) html = html.replace(/(<details class="v28-q v39-sec" id="v39-sec-regions"[^>]*><summary>[\s\S]*?<\/summary><div class="v39-body">)<ol class="v39-doors">[\s\S]*?<\/ol>/, function (m, open) { return open + rows; });
  return html;
}
function v55CountryView(c) {
  V55.pin = null;
  if (!v55Ready(c) && typeof v39Fetch === 'function') v39Fetch(v39PartName(c));
  return v39Build(v55CountryHtml(c), v55PageWire);
}
if (typeof v39CountryView === 'function') {
  var _v55CountryView = v39CountryView;
  v39CountryView = function () {
    var c = (typeof v39CountryOf === 'function') ? v39CountryOf(S._v39country) : null;
    if (!c) return _v55CountryView.apply(this, arguments);
    try { return v55CountryView(c); } catch (e) { return _v55CountryView.apply(this, arguments); }
  };
}
/* the sheet's Enlarge map: codex31's own viewer */
(function () {
  if (typeof document === 'undefined' || !document || typeof document.addEventListener !== 'function') return;
  document.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v55="enlarge"]') : null;
    if (!node || node.disabled) return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof v23Open === 'function') v23Open(node.getAttribute('data-sheet'));
  });
})();
