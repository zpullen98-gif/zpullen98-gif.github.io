/* ================== CODEX LIV: THE FIVE-STAR CARD AND THE FLOW ==================

   The five-star card and the flow edition, 31 October 2026, rebuilt 2
   November 2026. Loaded after codex53.js, before boot.js. It edits no
   earlier layer and no data file; every wrapper is typeof guarded and
   outermost, every registry is extended key by key, never replaced, and the
   layer declares with var and function only.

   WHAT THIS LAYER OWNS:

   1. THE WORDS: V54_WORDS holds every string the layer shows, British and
      dash free; v54W reads them. The pack's own fields (the lines, the
      sale, the house's notes) are drawn as the house wrote them.

   2. THE STYLE: one style element, id v54-style, written by the layer.

   3. THE CARD (section 3): a wine's card as one flow, by a last string
      wrapper of v28CardHtml. The title row carries the position and one
      Next, the bin and the size on one line under the name. Then At the
      table (the forty-five large in the house reading face, The sale under
      a gold rule directly under it when the pack holds one, the ten and the
      twenty quiet, Say it); Where we pour it (first pick for, second choice
      for, by the bottle with the tier's word and its sayIt, on the
      tastings, the drink without alcohol; every list read from the dishes'
      own pairings); The wine; In the Codex (one door per destination: the
      grape page by v53GrapeKey, the region or country, one map, the
      producer, the chapter, the Court's subject by v54SubjectFor, the
      Court's grid by v54GridFor, the illustrated guide and the culinary
      lesson where mapped; Compare with as a sub list; The land closed);
      Who makes it without its library link; What it's made of without its
      per component films; Pronounced: for every respelling; The five parts
      closed; On the floor with The guide's line; the service note; Watch,
      each film once; Practise this wine as one row; the footer Edit,
      Previous, Next. Her own rows (a wine she added, with no house record)
      keep the card the earlier layers draw.

   4. THE DOORS: the new doors are codex28 acts (data-v28) listed in
      V28_DOORS, so a door pushes the card's own entry first and codex38
      keeps its open sections; Back reopens the card as it was left.

   5. THE FLASH CARD BACK: v28CardOf carries the sale, and the two faces
      that draw a house card's back (codex28's deck and codex32's runs) set
      it under the ten.

   6. THE DOM PASS: a cellarView wrapper registered after codex33's and
      codex37's. The culinary doors and the illustrated guides those two
      append to a card are taken off it (In the Codex carries both as
      doors), codex52's atlas box is hidden on the card only, and the open
      sections of the card are remembered for its next draw.

   7. THE FLOW (sections 7 to 14), each piece a wrapper or a DOM pass:
      the question bank gains The whole paper, The regions, Service
      references and Hands on, lifted from the chain's own Quizzes page
      (v53BankHtml), and #/quizzes draws the bank under its own scope
      (v32QuizzesHtml, v25MainName); the Practise root's rounds row points
      at the bank, its grape decks, Blind flight and level test leave
      (v32FlashcardsHtml); one Village tasting: codex39's 45 minute row is
      cut where it enters the bank, Grapes' Tasting reads The Court's grid
      drill, The Village tasting, Warm up: call the structure, The
      deductive grid (v53GrapesRootHtml), the method is How to taste: the
      method in the reading rooms only; the level page loses its search,
      the World Map row and the illustrated door (v32LevelHtml,
      v32LevelView); the Library loses the Terroir row, carries the
      regions door in The atlas and true lines (v32LibraryHtml,
      v32LibraryView, V32_WORDS); Another deck returns to the Library
      (v32Act); the search gains the Court's subjects and the grape pages
      (v44Index, v44Results); Brennan's rooms (v48RehearsalHtml,
      v48StudyHtml, the Culinary Companion's owner); the parents
      (v32ParentRoute, render for S._v54from, v25NavWord); the stale words
      at display (quizView, resultsView, V32_WORDS, V39_WORDS, V42_PATHS,
      V27_SAY_NONE, v32CardFace). A row renamed without a new line keeps
      its old line.

   8. THE OWNER'S RULE (section 15, 2 November 2026): the tool is the
      owner's own, so codex25's non-affiliation line (V25_NONAFFIL, kept as
      a constant) is drawn nowhere: v25Colophon draws nothing, and
      v32MoreHtml and v53CmsRootHtml lose the line from their strings.
*/

/* =========== 1. the words =========== */

var V54_WORDS = {
  atTable: 'At the table',
  fortyFive: 'In forty-five seconds',
  sale: 'The sale',
  ten: 'In ten seconds',
  twenty: 'In twenty seconds',
  say: 'Say it',
  where: 'Where we pour it',
  firstFor: 'First pick for',
  secondFor: 'Second choice for',
  byBottle: 'By the bottle',
  tastings: 'On the tastings',
  zeroHead: 'Without alcohol',
  zeroWith: '{drink}, without alcohol with the {dish}',
  course: 'course {n}',
  withDishes: 'with {dishes}',
  orWord: ' or ',
  wine: 'The wine',
  producer: 'Producer',
  wineName: 'Wine',
  vintage: 'Vintage',
  region: 'Region',
  grapes: 'Grapes',
  style: 'Style',
  byGlass: 'By the glass',
  onTastings: 'Poured on the tastings',
  bottle: 'Bottle',
  profile: 'The profile',
  served: 'How we pour it',
  goesWith: 'What it goes with',
  about: 'About it',
  codex: 'In the Codex',
  grapeDoor: 'The grape: {name}',
  mapDoor: 'The map: {sheet}',
  mapOverview: 'The map: {sheet}, a regional overview',
  producerDoor: 'The producer: {name}',
  chapterDoor: 'The chapter: {cat}',
  subjectDoor: 'The Court’s subject: {name}',
  gridDoor: 'On the Court’s grid: {grape}, {region}',
  illusDoor: 'Illustrated guide: {title}',
  culinaryDoor: 'Culinary lesson: {title}',
  compare: 'Compare with',
  land: 'The land',
  landGrapes: 'The grapes',
  landRegion: 'The region',
  structure: 'Structure',
  tell: 'The tell',
  confuse: 'Not to be confused with',
  climate: 'Climate',
  soil: 'Soil',
  note: 'Note',
  terroir: 'Open the Terroir Atlas',
  pronounced: 'Pronounced',
  parts: 'The five parts',
  floor: 'On the floor',
  guide: 'The guide’s line',
  houseWords: 'The house’s words',
  scenes: 'Guests at the table',
  serviceNote: 'The service note',
  watch: 'Watch',
  practise: 'Practise this wine',
  flashThis: 'Flash this wine',
  sayPour: 'Say the pour',
  guestPlay: 'Guest at the table',
  itsProducers: 'Its producers',
  itsComponents: 'Its components',
  itsGrapeCards: 'Its grape cards',
  itsGrapeCardsOf: 'Its grape cards: {grape}',
  drillSection: 'Drill this section',
  drillList: 'Drill the list',
  next: 'Next',
  sections: 'The card’s sections'
};

function v54W(key, vars) {
  var s = V54_WORDS[key] || '';
  if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(String(vars[k])); });
  return s;
}

function v54Esc(s) {
  if (typeof v28Esc === 'function') return v28Esc(s);
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function v54Str(s) { return typeof s === 'string' ? s.trim() : (typeof s === 'number' ? String(s) : ''); }
function v54List(x) { return Array.isArray(x) ? x : []; }
function v54Own(o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); }
function v54KV(item, field) { return (typeof v28KV === 'function') ? v28KV(item, field) : null; }
function v54Fold(s) {
  if (typeof v53cFold === 'function') return v53cFold(s);
  return (typeof v28Fold === 'function') ? v28Fold(s).trim() : String(s == null ? '' : s).toLowerCase().trim();
}
function v54House() { try { return (typeof v28House === 'function') ? v28House() : null; } catch (e) { return null; } }

/* =========== 2. the style =========== */

(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v54-style';
  css.textContent = [
    /* the title row: the position and one Next; the bin and the size on one line */
    '.wrap .v28 .v54-binline{display:flex;flex-wrap:nowrap;align-items:center;gap:0 12px;white-space:nowrap;margin:0 0 8px}',
    /* At the table: the forty-five large in the house reading face, the sale under a gold rule, the ten and the twenty quiet */
    '.wrap .v28 .v54-table .v28-eyebrow{margin-top:14px}',
    '.wrap .v28 .v54-table .v28-timed.v54-fortyfive{display:block;font-family:var(--house-reading);font-size:20px;line-height:1.5;font-weight:600;color:var(--parch);margin:4px 0 0}',
    '.wrap .v28 .v54-rule{height:0;border:0;border-top:1px solid var(--gold);margin:16px 0 0}',
    '.wrap .v28 .v54-table .v54-sale-h{margin-top:10px;color:var(--gold)}',
    '.wrap .v28 .v54-sale{font-size:18px;line-height:1.5;color:var(--parch);margin:2px 0 4px}',
    '.wrap .v28 .v54-table .v54-ten,.wrap .v28 .v54-table .v28-timed.v54-twenty{display:block;font-family:inherit;font-size:16px;line-height:1.5;font-weight:400;color:var(--parch2);margin:2px 0 0}',
    '.wrap .v28 .v54-table .v28-sayit{font-size:17px}',
    /* the doors In the Codex and the row of Practise this wine: chips that wrap, each 44px high */
    '.wrap .v28 .v54-chips{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 12px}',
    '.wrap .v28 .v54-chips .btn{display:inline-flex;align-items:center;min-height:44px;box-sizing:border-box;text-align:left;white-space:normal}',
    '.wrap .v28 .v54-chips.v37-doors{padding:0;border:0;background:none}',
    '.wrap .v28 .v54-fold{margin:0}',
    '.wrap .v28 .v54-fold>summary.secgroup{cursor:pointer;min-height:44px;display:flex;align-items:center}',
    '.wrap .v28 .v54-fold>.v54-foldbody{padding:4px 0 6px}',
    '.wrap .v28 .v54-guide{font-size:17px;line-height:1.5;color:var(--parch)}',
    '.wrap .v28 .v54-codex .v35-cmp{margin-top:4px}',
    '.wrap #v28-card .v52-atlas{display:none}',
    /* a short word's link in a list row (Sake, Loire on the level page) keeps a 44 px target; its text stays left */
    '.wrap li>.v32link{min-width:44px}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();

/* =========== 3. the card =========== */

/* The row a card draws and its neighbours, by codex28's own rule: the list
   as shown (the meal, the search, the section), the position in its
   section or among the found, Previous and Next in the list's order. */
function v54RowOf(id) {
  var h = v54House();
  var st = v28State();
  var rows = v28Rows();
  var meal = v28Meal(v28MealNames(h, rows));
  var list = v28Shown(v28MealRows(rows, meal), st);
  var r = v28Find(list, id) || v28Find(rows, id);
  if (!r) return null;
  if (!v28Find(list, id)) list = [r];
  var inSec = list.filter(function (x) { return x.section === r.section && x.bottle === r.bottle; });
  var pos = v54Str(st.q) ? v28W('found', { i: list.indexOf(r) + 1, n: list.length })
    : v28W('position', { i: inSec.indexOf(r) + 1, n: inSec.length, section: r.section });
  return { h: h, st: st, r: r, item: r.item || null, pos: pos, prev: v28Pick(r, list, -1), next: v28Pick(r, list, 1) };
}

function v54Open(id) {
  var st = (typeof v28State === 'function') ? v28State() : null;
  var card = st && st.v54open && st.v54open.card === id ? st.v54open : null;
  return function (sec) { return !!(card && card.secs && card.secs[sec]); };
}
function v54Block(id, title, body, cls) {
  if (!body) return '';
  return '<section class="v28-block v54-block' + (cls ? ' ' + cls : '') + '" id="v54-' + id + '" aria-labelledby="v54-' + id + '-h">'
    + '<h3 class="secgroup v54-h" id="v54-' + id + '-h">' + v54Esc(title) + '</h3>' + body + '</section>';
}
/* A closed section: a disclosure whose summary is the heading; its open state kept by the DOM pass. */
function v54Closed(id, title, body, open, cls) {
  if (!body) return '';
  return '<section class="v28-block v54-block' + (cls ? ' ' + cls : '') + '" id="v54-' + id + '">'
    + '<details class="v28-q v54-fold" data-v54-sec="' + v54Esc(id) + '"' + (open ? ' open' : '') + '><summary class="secgroup v54-h">' + v54Esc(title) + '</summary>'
    + '<div class="v54-foldbody">' + body + '</div></details></section>';
}
function v54Eyebrow(word) { return '<h4 class="v28-eyebrow">' + v54Esc(word) + '</h4>'; }
function v54Ul(items) { var list = items.filter(Boolean); return list.length ? '<ul class="v28-list">' + list.join('') + '</ul>' : ''; }
function v54Quote(s) { return s ? '<span class="v28-say">"' + v54Esc(s) + '"</span>' : ''; }
function v54Q(s) { return (typeof V28_QUOTE === 'function') ? V28_QUOTE(s) : v54Esc(s); }

/* A dish named once as a link on the card, plain words after (codex28's rule for a second mention). */
function v54Linker() {
  var seen = {};
  return function (d) {
    if (!d) return '';
    if (seen[d.id]) return v54Esc(d.name);
    seen[d.id] = 1;
    return v28RoomName('table', d.id, d.name);
  };
}

/* 3.1 the title row: the position and one Next, the eyebrow, the name, the bin and the size on one line, the price */
function v54TitleHtml(C) {
  var r = C.r, item = C.item, h = C.h;
  var html = '<div class="v28-cardnav v54-titlerow"><span class="v28-pos">' + v54Esc(C.pos) + '</span>'
    + (C.next ? '<button type="button" class="btn small ghost" data-v28="open" data-id="' + v54Esc(C.next.id) + '" data-step="1">' + v54W('next') + '</button>' : '')
    + '</div>';
  var brow = [r.section];
  if (item && item.signature) brow.push('Signature');
  html += '<p class="v28-eyebrow v28-top">' + v54Esc(brow.join(' · ')) + '</p>';
  html += '<h2 class="v28-title" id="v28-h" tabindex="-1">' + v54Esc(r.name) + '</h2>';
  var bits = '';
  if (v54Str(item.bin)) bits += '<span class="lvltag v29-bintag">' + v54Esc((typeof v29W === 'function') ? v29W('binOf', { bin: v54Str(item.bin) }) : 'Bin ' + v54Str(item.bin)) + '</span>';
  if (v54Str(item.size)) bits += '<span class="v29-size">' + v54Esc(item.size) + '</span>';
  if (bits) html += '<p class="v29-binline v54-binline">' + bits + '</p>';
  if (r.price && v28Printed(item)) {
    html += '<p class="v28-price-line"><span class="lvltag">' + v54Esc(r.price) + '</span></p>';
    if (h && h.menusReadOn) html += '<p class="v28-soft">' + v54Esc(v28W('asPrinted', { date: v28Date(h.menusReadOn) })) + '</p>';
  } else if (r.price) html += '<p class="v28-pour">' + v54Esc(r.price) + '</p>';
  return html;
}

/* 3.2 At the table */
function v54Lines(item) {
  var l = v28LinesShown(item);
  var raw = v54KV(item, 'lines') || {};
  l.sale = v54Str(raw.sale);
  return l;
}
function v54TableHtml(C) {
  var item = C.item;
  var l = v54Lines(item);
  var say = v54Str(v54KV(item, 'say'));
  var sale = l.sale ? '<hr class="v54-rule"><p class="v28-eyebrow v54-sale-h">' + v54W('sale') + '</p><p class="v54-sale">' + v54Esc(l.sale) + '</p>' : '';
  var body = '';
  if (l.s45) body += '<p class="v28-eyebrow">' + v54W('fortyFive') + '</p><p class="v28-timed v54-fortyfive" id="v28-s45">' + v54Esc(l.s45) + '</p>' + sale;
  if (l.s10) body += '<p class="v28-eyebrow">' + v54W('ten') + '</p><p class="v28-ten v54-ten" id="v28-s10">' + v54Esc(l.s10) + '</p>';
  if (!l.s45) body += sale;
  if (l.s20) body += '<p class="v28-eyebrow">' + v54W('twenty') + '</p><p class="v28-timed v54-twenty" id="v28-s20">' + v54Esc(l.s20) + '</p>';
  if (say) body += '<p class="v28-eyebrow">' + v54W('say') + '</p><p class="v28-sayit">' + v54Esc(say) + '</p>';
  return v54Block('table', v54W('atTable'), body, 'v54-table');
}

/* 3.3 Where we pour it: every list read from the dishes' own pairings */
function v54Pairings(h, id) {
  var out = { first: [], second: [], bottles: [], zero: [] };
  v54List(h && h.dishes).forEach(function (d) {
    var p = d && v54KV(d, 'pairing');
    if (!p || typeof p !== 'object') return;
    if (p.wineId === id) {
      out.first.push({ dish: d, sayIt: v54Str(p.sayIt) });
      var c = p.zeroProofId && typeof v28Drink === 'function' ? v28Drink(h, p.zeroProofId) : null;
      if (c) out.zero.push({ drink: c, dish: d });
    }
    if (p.secondId === id) out.second.push({ dish: d });
    var b = p.bottles;
    if (b && typeof b === 'object') {
      ['value', 'classic', 'splurge', 'half'].forEach(function (t) {
        if (b[t] && b[t].wineId === id) out.bottles.push({ dish: d, tier: t, sayIt: v54Str(b[t].sayIt) });
      });
    }
  });
  return out;
}
function v54TierWord(t) {
  var keys = { value: 'tierValue', classic: 'tierClassic', splurge: 'tierSplurge', half: 'tierHalf' };
  var w = (typeof v29W === 'function') ? v29W(keys[t] || '') : '';
  return w || t;
}
function v54WhereHtml(C, link) {
  var h = C.h, item = C.item;
  var P = v54Pairings(h, item.id);
  var body = '';
  if (P.first.length) body += v54Eyebrow(v54W('firstFor')) + v54Ul(P.first.map(function (x) { return '<li>' + link(x.dish) + v54Quote(x.sayIt) + '</li>'; }));
  if (P.second.length) body += v54Eyebrow(v54W('secondFor')) + v54Ul(P.second.map(function (x) { return '<li>' + link(x.dish) + '</li>'; }));
  if (P.bottles.length) body += v54Eyebrow(v54W('byBottle')) + v54Ul(P.bottles.map(function (x) {
    return '<li><span class="v29-tier">' + v54Esc(v54TierWord(x.tier)) + ':</span> ' + link(x.dish) + v54Quote(x.sayIt) + '</li>';
  }));
  var pours = (typeof v28Pours === 'function') ? v28Pours(h, item.id) : [];
  if (pours.length) body += v54Eyebrow(v54W('tastings')) + v54Ul(pours.map(function (p) {
    var dishes = v54List(p.course && p.course.dishIds).map(function (did) { return link(v28Dish(h, did)); }).filter(Boolean);
    var label = v54Str(p.course.label) || v54W('course', { n: p.course.n });
    return '<li>' + v54Esc(v54Str(p.tasting.name)) + ', ' + v54Esc(label) + (v54Str(p.course.pourText) ? ', ' + v54Esc(p.course.pourText) : '')
      + (dishes.length ? ', ' + v54W('withDishes', { dishes: dishes.join(v54W('orWord')) }) : '') + '</li>';
  }));
  if (P.zero.length) body += v54Eyebrow(v54W('zeroHead')) + v54Ul(P.zero.map(function (x) {
    return '<li>' + v54W('zeroWith', { drink: v28RoomName('ledger', x.drink.id, x.drink.name), dish: v54Esc(x.dish.name) }) + '</li>';
  }));
  return v54Block('where', v54W('where'), body, 'v54-where');
}

/* 3.4 The wine: the facts, the profile, how we pour it, what it goes with, and About it closed */
function v54WineHtml(C, open) {
  var h = C.h, item = C.item, r = C.r;
  var facts = [];
  var add = function (label, v) { if (v54Str(v)) facts.push([label, v54Str(v)]); };
  add(v54W('producer'), item.producer);
  add(v54W('wineName'), item.wine);
  add(v54W('vintage'), item.vintage);
  add(v54W('region'), item.region);
  add(v54W('grapes'), v28Grapes(item).join(', '));
  add(v54W('style'), item.style);
  if (v28IsBottle(item)) add(v54W('bottle'), v28PriceLine(item, h) || item.bottle);
  else {
    var hasPrice = v54List(item.prices).some(function (p) { return p && v54Str(p.printed); });
    if (hasPrice) add(v54W('byGlass'), v28PriceLine(item, h));
    else if (v28Pours(h, item.id).length) add(v54W('byGlass'), v54W('onTastings'));
    add(v54W('bottle'), v54Str(item.bottle) || v28W('bottleNone'));
  }
  var body = v28Dl(facts);
  if (v28IsBottle(item) && item.verifiedOn) body += '<p class="v28-soft">' + v54Esc(v28W('verified', { date: v28Date(item.verifiedOn) })) + '</p>';
  var profile = v54Str(v54KV(item, 'profile'));
  var serve = v54Str(v54KV(item, 'serve'));
  var goes = v54Str(v54KV(item, 'goesWith'));
  var pairs = v54Str(v54KV(item, 'pairs'));
  if (profile) body += v54Eyebrow(v54W('profile')) + '<p>' + v54Esc(profile) + '</p>';
  if (serve) body += v54Eyebrow(v54W('served')) + '<p>' + v54Esc(serve) + '</p>';
  if (goes || pairs) {
    body += v54Eyebrow(v54W('goesWith'));
    if (goes) body += '<p>' + v54Esc(goes) + '</p>';
    if (pairs && v28Fold(pairs) !== v28Fold(goes)) body += '<p>' + v54Esc(pairs) + '</p>';
  }
  var notes = v28NotesFor(item);
  if (notes.about) body += '<details class="v28-q v54-about" data-v54-sec="about"' + (open('about') ? ' open' : '') + '><summary>' + v54W('about') + '</summary><div class="v28-about">' + v28Paras(notes.about.a) + '</div></details>';
  void r;
  return v54Block('wine', v54W('wine'), body, 'v54-wine');
}

/* 3.5 In the Codex: one door per destination */

/* The Court's subject a wine belongs to: the subject whose map lists the
   wine's region slug, else the one place subject whose map lists its
   country key; a place subject before a styles one, a styles one before
   a foundation, and among those the one that names the fewest places (the
   narrowest), then the syllabus order. */
function v54Places(s) { var m = (s && s.map) || {}; return v54List(m.regions).length + v54List(m.countries).length; }
/* a place subject (a country's or a region's) is 0, a styles one 1, the rest (foundations, beyond wine, business) 2 */
var V54_PLACE_GROUPS = { france: 1, italy: 1, 'spain-portugal': 1, 'central-europe': 1, 'north-america': 1, 'southern-hemisphere': 1 };
function v54SubjectKind(s) { return v54Own(V54_PLACE_GROUPS, s && s.group) ? 0 : (s && s.group === 'styles' ? 1 : 2); }
function v54SubjectRank(a, b) {
  var sa = v54SubjectKind(a), sb = v54SubjectKind(b);
  if (sa !== sb) return sa - sb;
  var pa = v54Places(a), pb = v54Places(b);
  if (pa !== pb) return pa - pb;
  return (Number(a.order) || 0) - (Number(b.order) || 0);
}
function v54SubjectFor(item) {
  var region = v54Str(item && item.region);
  if (!region || typeof v39SlugFor !== 'function') return null;
  var subs = (typeof v53Subjects === 'function') ? v53Subjects() : ((typeof CMS !== 'undefined' && CMS && Array.isArray(CMS.subjects)) ? CMS.subjects : []);
  if (!subs.length) return null;
  var slug = v39SlugFor(region);
  if (!slug) return null;
  var art = (typeof v39Find === 'function') ? v39Find(slug) : null;
  var country = art ? v54Str(art.sheet) : ((typeof v39Country === 'function' && v39Country(slug)) ? slug : '');
  var hits = function (key, want) {
    if (!want) return [];
    return subs.filter(function (s) { return s && v54Str(s.id) && v54List(((s.map || {})[key])).indexOf(want) >= 0; }).sort(v54SubjectRank);
  };
  var byRegion = art ? hits('regions', slug) : [];
  if (byRegion.length) return byRegion[0];
  /* by the country only when one place subject holds it (France's seven never pick one for Arbois) */
  var byCountry = hits('countries', country);
  var places = byCountry.filter(function (s) { return v54SubjectKind(s) === 0; });
  if (places.length === 1) return places[0];
  return places.length ? null : (byCountry[0] || null);
}

/* The Court's grid reads a grape in named places; the card's door opens a
   grape's grid only when one of those places is, word for word, a part of
   the wine's own region (Côte de Beaune in "Meursault, Côte de Beaune,
   Burgundy, France"), never by a country or a near name. */
function v54GridReads() {
  if (typeof v53GridReads === 'function') { try { return v53GridReads() || {}; } catch (e) { return {}; } }
  return (typeof GRID_READS !== 'undefined' && GRID_READS && typeof GRID_READS === 'object') ? GRID_READS : {};
}
function v54GrapeSlugs(item) {
  var out = [];
  if (typeof v53GrapeKey !== 'function') return out;
  v28Grapes(item).forEach(function (g) { var s = v53GrapeKey(g); if (s && out.indexOf(s) < 0) out.push(s); });
  return out;
}
function v54GridFor(item) {
  var parts = v54Str(item && item.region).split(',').map(v54Fold).filter(Boolean);
  if (!parts.length) return null;
  var R = v54GridReads();
  var hit = null;
  v54GrapeSlugs(item).some(function (slug) {
    var g = v54Own(R, slug) ? R[slug] : null;
    return v54List(g && g.reads).some(function (read) {
      var places = v54Str(read && read.region).split(/,| and /).map(v54Fold).filter(Boolean);
      var at = places.filter(function (p) { return parts.indexOf(p) >= 0; })[0];
      if (!at) return false;
      hit = { slug: slug, grape: v54Str(g.name) || slug, region: v54Str(read.region) };
      return true;
    });
  });
  return hit;
}

function v54Chip(act, attrs, dest, label) {
  return '<button type="button" class="btn small ghost" data-v28="' + act + '"' + attrs + ' data-v54-dest="' + v54Esc(dest) + '">' + v54Esc(label) + '</button>';
}
function v54CodexDoors(item) {
  var doors = [];
  var seen = {};
  var add = function (dest, html) { if (!dest || !html || seen[dest]) return; seen[dest] = 1; doors.push(html); };
  /* the grape pages */
  v54GrapeSlugs(item).forEach(function (slug) {
    var name = (typeof v53GrapeName === 'function') ? v53GrapeName(slug) : slug;
    add('grape:' + slug, v54Chip('v54grape', ' data-k="' + v54Esc(slug) + '"', 'grape:' + slug, v54W('grapeDoor', { name: name })));
  });
  /* the region in depth, or its country: codex39's own door, named for this layer */
  if (typeof v39CardDoor === 'function') {
    var reg = '';
    try { reg = v39CardDoor(item) || ''; } catch (e) { reg = ''; }
    var m = /data-slug="([^"]+)"/.exec(reg);
    if (m) add('region:' + m[1], reg.replace('<button ', '<button data-v54-dest="region:' + m[1] + '" '));
  }
  /* one map */
  var terroir = (typeof v28Terroir === 'function') ? v28Terroir(item) : [];
  var sheet = (typeof v28Map === 'function') ? v28Map(item, terroir) : null;
  if (sheet && sheet.id) add('map:' + sheet.id, v54Chip('map', ' data-k="' + v54Esc(sheet.id) + '"', 'map:' + sheet.id, v54W(sheet.overview ? 'mapOverview' : 'mapDoor', { sheet: sheet.name || sheet.id })));
  /* the producer, the chapter */
  var prod = (typeof v28Producer === 'function') ? v28Producer(item) : null;
  if (prod && prod.id) add('producer:' + prod.id, v54Chip('producer', ' data-k="' + v54Esc(prod.id) + '"', 'producer:' + prod.id, v54W('producerDoor', { name: prod.p })));
  var primer = (typeof v28Primer === 'function') ? v28Primer(item) : null;
  if (primer) add('chapter:' + primer.key, v54Chip('primer', ' data-k="' + v54Esc(String(primer.key)) + '"', 'chapter:' + primer.key, v54W('chapterDoor', { cat: primer.name })));
  /* the Court's subject, the Court's grid */
  var sub = v54SubjectFor(item);
  if (sub) add('subject:' + sub.id, v54Chip('v54subject', ' data-k="' + v54Esc(sub.id) + '"', 'subject:' + sub.id, v54W('subjectDoor', { name: v54Str(sub.name) || sub.id })));
  var grid = v54GridFor(item);
  if (grid) add('grid:' + grid.slug, v54Chip('v54grid', ' data-k="' + v54Esc(grid.slug) + '"', 'grid:' + grid.slug, v54W('gridDoor', { grape: grid.grape, region: grid.region })));
  /* the illustrated guides codex36 maps to this wine */
  var guides = (typeof v36WineGuides === 'function') ? v36WineGuides(item) : [];
  guides.forEach(function (gid) {
    var e = (typeof CodexTeachingCache !== 'undefined' && CodexTeachingCache && typeof CodexTeachingCache.entry === 'function') ? CodexTeachingCache.entry(gid) : null;
    if (e) add('illus:' + gid, v54Chip('v54illus', ' data-k="' + v54Esc(gid) + '"', 'illus:' + gid, v54W('illusDoor', { title: v54Str(e.title) || gid })));
  });
  /* the culinary lessons codex37 maps to this wine, in a row of codex37's own class */
  var lessons = (typeof v37Mapped === 'function') ? v37Mapped('wineLessons', item.id) : [];
  var cul = lessons.map(function (lid) {
    var L = (typeof v37Lesson === 'function') ? v37Lesson(lid) : null;
    if (!L || seen['culinary:' + lid]) return '';
    seen['culinary:' + lid] = 1;
    return v54Chip('v54culinary', ' data-k="' + v54Esc(lid) + '"', 'culinary:' + lid, v54W('culinaryDoor', { title: v54Str(L.title) || lid }));
  }).filter(Boolean);
  return { doors: doors, culinary: cul, seen: seen, terroir: terroir };
}

/* Compare with, as a sub list: codex35's entries, a door already on the row above named in plain words */
function v54CompareHtml(h, item, seen) {
  if (typeof v35CompareHtml !== 'function') return '';
  var html = v35CompareHtml(h, item) || '';
  var m = /<ul class="v35-cmp">[\s\S]*<\/ul>/.exec(html);
  if (!m) return '';
  var list = m[0].replace(/<button type="button" class="v28-link v35-door" data-v28="(primer|producer)" data-k="([^"]*)">([\s\S]*?)<\/button>/g, function (all, act, k, label) {
    var dest = (act === 'primer' ? 'chapter:' : 'producer:') + k.replace(/&amp;/g, '&');
    return seen[dest] ? '<span class="v35-label">' + label + '</span>' : all;
  });
  return v54Eyebrow(v54W('compare')) + list;
}

/* The land, closed: the grapes and the region as the Codex's reference data has them */
function v54LandHtml(item, terroir) {
  var body = '';
  var grapes = (typeof v28GrapeProfiles === 'function') ? v28GrapeProfiles(item) : [];
  if (grapes.length) body += v54Eyebrow(v54W('landGrapes')) + grapes.map(function (g) {
    var p = g.p, rows = [];
    if (p.st) rows.push([v54W('structure'), v54Q(p.st), 1]);
    if (p.tell) rows.push([v54W('tell'), v54Q(p.tell), 1]);
    if (p.confuse) rows.push([v54W('confuse'), v54Q(p.confuse), 1]);
    return '<div class="v28-ref"><p class="v28-refname">' + v54Q(p.g) + '</p>' + v28Dl(rows) + '</div>';
  }).join('');
  if (terroir.length) body += v54Eyebrow(v54W('landRegion')) + terroir.map(function (t) {
    var rows = [];
    if (t.r.cl) rows.push([v54W('climate'), v54Q(t.r.cl), 1]);
    if (t.r.so) rows.push([v54W('soil'), v54Q(t.r.so), 1]);
    if (t.r.note) rows.push([v54W('note'), v54Q(t.r.note), 1]);
    return '<div class="v28-ref"><p class="v28-refname">' + v54Q(t.r.r) + '</p>' + v28Dl(rows) + '</div>';
  }).join('') + (typeof refView === 'function' ? '<div class="v28-btnrow"><button type="button" class="btn small ghost" data-v28="terroir" data-k="' + v54Esc(terroir[0].r.r) + '">' + v54W('terroir') + '</button></div>' : '');
  return body;
}

function v54CodexHtml(C, open) {
  var item = C.item;
  var D = v54CodexDoors(item);
  var body = '';
  if (D.doors.length) body += '<div class="v28-btnrow v54-chips v54-doors">' + D.doors.join('') + '</div>';
  if (D.culinary.length) body += '<div class="v28-btnrow v54-chips v37-doors">' + D.culinary.join('') + '</div>';
  body += v54CompareHtml(C.h, item, D.seen);
  var land = v54LandHtml(item, D.terroir);
  if (land) body += '<details class="v28-q v54-land" data-v54-sec="land"' + (open('land') ? ' open' : '') + '><summary>' + v54W('land') + '</summary>' + land + '</details>';
  return v54Block('codex', v54W('codex'), body, 'v54-codex');
}

/* 3.6 Who makes it, What it's made of: codex38's and codex35's blocks as
   they draw them, less the producers' library link (the producer's door is
   In the Codex), less the per component films (each film is under Watch,
   once) and less their flash rows (Practise this wine carries both), with
   Pronounced: for every respelling. */
function v54Pronounced(html) {
  var said = [];
  if (typeof v35W === 'function') said.push(v35W('say'));
  if (typeof v38W === 'function') said.push(v38W('say'));
  said.filter(function (w, i, all) { return w && all.indexOf(w) === i; }).forEach(function (w) {
    html = html.split('<span class="v28-soft">' + w + ':</span>').join('<span class="v28-soft">' + v54W('pronounced') + ':</span>');
  });
  return html;
}
function v54Rehead(html, oldId, id, title) {
  var at = html.indexOf('<h3 class="secgroup" id="' + oldId + '">');
  var end = at >= 0 ? html.indexOf('</h3>', at) : -1;
  if (end < 0) return '';
  var open = html.slice(0, html.indexOf('>') + 1);
  var rest = html.slice(end + '</h3>'.length);
  var cls = (/class="([^"]*)"/.exec(open) || ['', 'v28-block'])[1];
  return '<section class="' + cls + ' v54-block" id="v54-' + id + '" aria-labelledby="v54-' + id + '-h"><h3 class="secgroup v54-h" id="v54-' + id + '-h">' + v54Esc(title) + '</h3>' + rest;
}
function v54CutRow(html) {
  /* the block's own button row, the last before its closing tag */
  return html.replace(/<div class="v28-btnrow">(?:(?!<div)[\s\S])*?<\/div><\/section>$/, '</section>');
}
function v54WhoHtml(C) {
  if (typeof v38WhoHtml !== 'function') return '';
  var html = v38WhoHtml(C.h, C.item.id) || '';
  if (!html) return '';
  html = html.replace(/<p><button type="button" class="v28-link v35-door v38-lib"[^>]*>[\s\S]*?<\/button><\/p>/g, '');
  html = v54CutRow(html);
  return v54Pronounced(v54Rehead(html, 'v38-who-h', 'who', (typeof v38W === 'function') ? v38W('whoMakes') : 'Who makes it'));
}
function v54MadeOfHtml(C) {
  if (typeof v35MadeOfHtml !== 'function') return '';
  var html = v35MadeOfHtml(C.h, C.item.id) || '';
  if (!html) return '';
  var note = (typeof v35W === 'function') ? v35W('videoNote') : '';
  if (note) html = html.split('<p class="v28-soft">' + note + '</p>').join('');
  html = html.replace(/<ul class="v30-list">[\s\S]*?<\/ul>/g, '');
  html = v54CutRow(html);
  return v54Pronounced(v54Rehead(html, 'v35-madeof-h', 'madeof', (typeof v35W === 'function') ? v35W('madeOf') : 'What it’s made of'));
}

/* 3.7 The five parts, closed */
function v54PartsHtml(C, open) {
  var parts = v28PartsShown(C.item);
  return parts.length ? v54Closed('parts', v54W('parts'), v28Dl(parts), open('parts'), 'v54-parts') : '';
}

/* 3.8 On the floor: The guide's line first, then codex28's coaching (as
   codex29 lets a floor bottle have it), the house's words and the guests
   at the table that name this wine */
function v54FloorHtml(C) {
  var h = C.h, item = C.item;
  var l = v28LinesShown(item);
  /* the guide's line once: not when it is word for word a timed line At the table already says */
  var body = l.guestShown && l.guest !== l.s10 && l.guest !== l.s45 ? v54Eyebrow(v54W('guide')) + '<p class="v54-guide">' + v54Esc(l.guest) + '</p>' : '';
  var floor = v28FloorBlock(h, item) || '';
  var m = /^<section class="v28-block"><h3 class="secgroup">[^<]*<\/h3>([\s\S]*)<\/section>$/.exec(floor);
  body += m ? m[1] : '';
  var lu = v28Lineup(h, item.id);
  var terms = lu.terms.filter(function (t) { return t && t.term; });
  if (terms.length) body += v54Eyebrow(v54W('houseWords')) + '<dl class="v28-dl">' + terms.map(function (t) {
    var say = v54Str(v54KV(t, 'say')), guest = v54Str(v54KV(t, 'toGuest'));
    return '<dt>' + v54Esc(t.term) + '</dt><dd>' + (say ? '<span class="v28-soft">' + v54Esc(say) + '</span> ' : '') + v54Esc(guest) + '</dd>';
  }).join('') + '</dl>';
  var scen = lu.scenarios.filter(function (s) { return s && (s.title || s.guest); });
  if (scen.length) body += v54Eyebrow(v54W('scenes')) + v54Ul(scen.map(function (s) {
    return '<li>' + v54Esc(v54Str(s.title) || v54Str(s.guest)) + (v54Str(s.guest) && v54Str(s.title) ? v54Quote(s.guest) : '') + '</li>';
  }));
  return v54Block('floor', v54W('floor'), body, 'v54-floor');
}

/* 3.9 The service note */
function v54NoteHtml(C) {
  var note = v54Str(C.item.serviceNote);
  return v54Block('note', v54W('serviceNote'), '<p class="v28-eyebrow">' + v28W('eyebrow') + '</p><p>' + (note ? v54Esc(note) : v28W('noteNone')) + '</p>', 'v54-note');
}

/* 3.10 Watch: the wine's films and its components' films, each once, by id */
function v54Films(h, id) {
  var out = [], seen = {};
  var add = function (v) { if (v && v.id && !seen[v.id]) { seen[v.id] = 1; out.push(v); } };
  if (typeof v30VideosFor === 'function') v54List(v30VideosFor(h, id)).forEach(add);
  if (typeof v35Groups === 'function' && typeof v35Videos === 'function') {
    v54List(v35Groups(h, id)).forEach(function (g) { v54List(g && g.components).forEach(function (c) { if (c && c.id) v54List(v35Videos(h, c.id)).forEach(add); }); });
  }
  return out;
}
function v54WatchHtml(C) {
  if (typeof v30Item !== 'function') return '';
  var vids = v54Films(C.h, C.item.id);
  if (!vids.length) return '';
  var note = (typeof v30W === 'function') ? v30W('note') : '';
  return v54Block('watch', v54W('watch'), (note ? '<p class="v28-soft">' + v54Esc(note) + '</p>' : '')
    + '<ul class="v30-list">' + vids.map(function (v) { return v30Item(C.h, v, false); }).join('') + '</ul>', 'v30-watch');
}

/* 3.11 Practise this wine: one row */
function v54PractiseHtml(C) {
  var h = C.h, item = C.item, r = C.r;
  var b = function (cls, act, attrs, label) { return '<button type="button" class="btn ' + cls + '" data-v28="' + act + '"' + attrs + '>' + v54Esc(label) + '</button>'; };
  var id = ' data-id="' + v54Esc(item.id) + '"';
  var row = [];
  if (v28CardOf(item, h)) row.push(b('gold', 'cardsone', id, v54W('flashThis')));
  if (typeof v27OpenSay === 'function' && v28LinesShown(item).s10) row.push(b('ghost', 'say', id, v54W('sayPour')));
  var scen = v28Lineup(h, item.id).scenarios.filter(function (s) { return s && s.id && (s.title || s.guest); });
  if (scen.length && typeof v27OpenGuest === 'function') row.push(b('ghost', 'guest', ' data-k="' + v54Esc(scen[0].id) + '"', v54W('guestPlay')));
  if (typeof v38ItemCards === 'function' && v54List(v38ItemCards(h, item.id)).length) row.push(b('ghost', 'v38flash', id, v54W('itsProducers')));
  if (typeof v35ItemCards === 'function' && v54List(v35ItemCards(h, item.id)).length) row.push(b('ghost', 'v35flash', id, v54W('itsComponents')));
  var grapes = (typeof v28GrapeProfiles === 'function') ? v28GrapeProfiles(item).filter(function (g) { return g.flash; }) : [];
  grapes.forEach(function (g) {
    row.push(b('ghost', 'grape', ' data-g="' + v54Esc(g.p.g) + '"', grapes.length > 1 ? v54W('itsGrapeCardsOf', { grape: g.p.g }) : v54W('itsGrapeCards')));
  });
  var secN = v28Wines(h).filter(function (w) { return !v28IsBottle(w) && v54Str(w.section) === r.section; }).length;
  if (!v28IsBottle(item) && secN >= 3) row.push(b('ghost', 'drillsec', ' data-s="' + v54Esc(r.section) + '"', v54W('drillSection')));
  else row.push(b('ghost', 'drill', '', v54W('drillList')));
  return v54Block('practise', v54W('practise'), '<div class="v28-btnrow v54-practise-row">' + row.join('') + '</div>', 'v54-practise');
}

/* 3.12 the footer: Edit, Previous, Next */
function v54FootHtml(C) {
  var html = '';
  if (v28HasHers(C.item)) html += '<p class="v28-soft">' + v28W('hers') + '</p>';
  return html + '<div class="v28-btnrow v28-foot"><button type="button" class="btn small ghost" data-v28="edit" data-id="' + v54Esc(C.r.id) + '">' + v28W('edit') + '</button>'
    + (C.prev ? '<button type="button" class="btn small ghost" data-v28="open" data-id="' + v54Esc(C.prev.id) + '" data-step="1">' + v54Esc(v28W('prev', { name: C.prev.name })) + '</button>' : '')
    + (C.next ? '<button type="button" class="btn small ghost" data-v28="open" data-id="' + v54Esc(C.next.id) + '" data-step="1">' + v54Esc(v28W('next', { name: C.next.name })) + '</button>' : '')
    + '</div>';
}

/* The card as one flow. Null for her own rows (no house record), which keep the earlier layers' card. */
function v54CardHtml(id) {
  var C = v54RowOf(id);
  if (!C || !C.item) return null;
  var open = v54Open(id);
  var link = v54Linker();
  return '<div class="v28 v28-card v54-card" id="v28-card">'
    + v54TitleHtml(C)
    + v54TableHtml(C)
    + v54WhereHtml(C, link)
    + v54WineHtml(C, open)
    + v54CodexHtml(C, open)
    + v54WhoHtml(C)
    + v54MadeOfHtml(C)
    + v54PartsHtml(C, open)
    + v54FloorHtml(C)
    + v54NoteHtml(C)
    + v54WatchHtml(C)
    + v54PractiseHtml(C)
    + v54FootHtml(C)
    + '</div>';
}

if (typeof v28CardHtml === 'function') {
  var _v54CardHtml = v28CardHtml;
  v28CardHtml = function (id) {
    var html = _v54CardHtml.apply(this, arguments);
    if (!html) return html;
    try { return v54CardHtml(id) || html; } catch (e) { return html; }
  };
}

/* =========== 4. the doors =========== */

if (typeof V28_DOORS !== 'undefined' && V28_DOORS) {
  ['v54grape', 'v54subject', 'v54grid', 'v54illus', 'v54culinary'].forEach(function (k) { V28_DOORS[k] = 1; });
}
if (typeof v28Act === 'function') {
  var _v54Act = v28Act;
  v28Act = function (act, node) {
    var out = _v54Act.apply(this, arguments);
    if (!/^v54/.test(String(act || ''))) return out;
    var k = node && typeof node.getAttribute === 'function' ? (node.getAttribute('data-k') || '') : '';
    var go = (typeof V25_GO !== 'undefined' && V25_GO) ? V25_GO : {};
    try {
      if (act === 'v54grape' && typeof go.grape === 'function') go.grape(k);
      else if (act === 'v54subject' && typeof go.cmssubject === 'function') go.cmssubject(k);
      else if (act === 'v54grid' && typeof go.griddrill === 'function') go.griddrill(k);
      else if (act === 'v54illus' && typeof v36Go === 'function') v36Go(k);
      else if (act === 'v54culinary' && typeof v37Go === 'function') v37Go(k);
    } catch (e) { }
    return out;
  };
}

/* =========== 5. the flash card back: the sale under the ten =========== */

function v54SaleBack(html, sale) {
  if (!sale || !html || html.indexOf('v54-sale') >= 0) return html;
  var at = html.indexOf('<p class="v28-ten">');
  var end = at >= 0 ? html.indexOf('</p>', at) : -1;
  if (end < 0) return html;
  end += '</p>'.length;
  return html.slice(0, end) + '<p class="v28-eyebrow v28-ink v54-sale-h">' + v54W('sale') + '</p><p class="v54-sale">' + v54Esc(sale) + '</p>' + html.slice(end);
}
if (typeof v28CardOf === 'function') {
  var _v54CardOf = v28CardOf;
  v28CardOf = function (item, h) {
    var c = _v54CardOf.apply(this, arguments);
    if (!c || !c.back) return c;
    try { var sale = v54Lines(item).sale; if (sale) c.back.sale = sale; } catch (e) { }
    return c;
  };
}
if (typeof v28DeckHtml === 'function') {
  var _v54DeckHtml = v28DeckHtml;
  v28DeckHtml = function () {
    var html = _v54DeckHtml.apply(this, arguments);
    try {
      var d = S._v28deck;
      if (!d || !d.flipped || typeof v28DeckCard !== 'function') return html;
      var c = v28DeckCard();
      return v54SaleBack(html, c && c.back && c.back.sale);
    } catch (e) { return html; }
  };
}
if (typeof v32CardFace === 'function') {
  var _v54CardFace = v32CardFace;
  v32CardFace = function (c, run) {
    var html = _v54CardFace.apply(this, arguments);
    try {
      if (!c || c.kind !== 'house' || !run || !run.flip) return html;
      return v54SaleBack(html, c.c && c.c.back && c.c.back.sale);
    } catch (e) { return html; }
  };
}

/* =========== 6. the DOM pass =========== */

/* Registered after codex33's and codex37's cellarView wrappers, so it runs
   on the card they have finished: the illustrated guides codex33 appends
   and the culinary doors codex37 appends are taken off the card (In the
   Codex holds a door to each, the culinary ones in a row of codex37's own
   class), codex52's atlas box is hidden on the card only, and each closed
   section remembers being opened, so the card's next draw (a step back
   from a deck, a door, a drill) opens it again. Edit mode is left alone. */
function v54CardDom(view) {
  if (S._v28edit || !view || typeof view.querySelector !== 'function') return;
  var card = view.querySelector('#v28-card');
  if (!card || !card.classList || !card.classList.contains('v54-card')) return;
  var codex = card.querySelector('#v54-codex');
  var off = function (n) { if (n && n.parentNode && typeof n.parentNode.removeChild === 'function') n.parentNode.removeChild(n); };
  Array.prototype.slice.call(card.querySelectorAll('details.v33-guide[data-teaching-id], .v37-doors')).forEach(function (n) {
    if (codex && typeof codex.contains === 'function' && codex.contains(n)) return;
    off(n);
  });
  Array.prototype.slice.call(card.querySelectorAll('.v52-atlas')).forEach(off);
  var st = v28State();
  var id = st.open;
  Array.prototype.slice.call(card.querySelectorAll('details[data-v54-sec]')).forEach(function (d) {
    if (typeof d.addEventListener !== 'function') return;
    d.addEventListener('toggle', function () {
      var keep = (st.v54open && st.v54open.card === id) ? st.v54open : { card: id, secs: {} };
      keep.secs[d.getAttribute('data-v54-sec')] = !!d.open;
      st.v54open = keep;
    });
  });
}
if (typeof cellarView === 'function') {
  var _v54CellarView = cellarView;
  cellarView = function () {
    var view = _v54CellarView.apply(this, arguments);
    try { v54CardDom(view); } catch (e) { }
    return view;
  };
}

/* =========== 7. the flow: its words and its small tools =========== */

/* The flow's strings, key by key into the layer's one table. */
(function () {
  var add = {
    bankOf: 'The {level} question bank',
    revisit: 'Wine cards to revisit',
    producerCards: 'Producer cards',
    focusedLine: 'A wine section, floor bottles or vocabulary',
    ownBottles: 'Your own bottles',
    ownOne: '1 bottle you added to the list',
    ownMany: '{n} bottles you added to the list',
    warmUp: 'Warm up: call the structure',
    howToTaste: 'How to taste: the method',
    worldMap: 'The World Map',
    worldMapStart: 'Start with the World Map',
    subjects: 'The Court’s subjects',
    subjectLine: 'The Court’s subject: {group}',
    grapesGroup: 'Grapes',
    grapePage: 'Grape page',
    placeholder: 'A chapter, a grape, a place, a producer or a subject',
    searchAria: 'Search the chapters, grapes, places, producers and subjects',
    libLine: 'For {level}: Practise and the question bank first, then the reading rooms and the atlas.',
    libLineAll: 'For every level: Practise and the question bank first, then the reading rooms and the atlas.',
    startToday: 'Start today’s questions',
    ourList: 'Our wine list',
    sayNone: 'No wine in this house has a kept timed line yet. Keep one on a wine’s card in the wine list, then say it back here.'
  };
  Object.keys(add).forEach(function (k) { V54_WORDS[k] = add[k]; });
})();

/* Each row of an HTML string (an li with no li inside it) kept, changed or
   dropped by a test; a row holding another row is left as it is. */
function v54EachRow(html, fn) {
  return String(html || '').replace(/<li\b[^>]*>[\s\S]*?<\/li>/g, function (li) {
    if (li.indexOf('<li', 3) >= 0) return li;
    var out = fn(li);
    return out === undefined ? li : out;
  });
}
function v54CutRows(html, test) { return v54EachRow(html, function (li) { return test(li) ? '' : undefined; }); }
/* a row's name changed, its line kept */
function v54Rename(li, name) { return li.replace(/(<span class="v25row-name">)[\s\S]*?(<\/span>)/, function (m, a, b) { return a + v54Esc(name) + b; }); }
/* a group or a section left with no row is taken off whole */
function v54DropEmpty(html) {
  return String(html || '')
    .replace(/<ul class="v25rows v32rows"><\/ul>/g, '')
    .replace(/<section class="v32-group[^"]*"(?: aria-labelledby="[^"]*")?>(?:<h3\b[^>]*>[^<]*<\/h3>)?(?:<p class="v32-line">[^<]*<\/p>)?<\/section>/g, '');
}
var V54_GRAPE_DECK = /^grapes(?::[rw]|-all)?$/;
function v54IsGrapeDeckRow(li) { var m = /data-deck="([^"]*)"/.exec(li); return !!(m && V54_GRAPE_DECK.test(m[1])); }
function v54Go(li, key) { return li.indexOf('data-go="' + key + '"') >= 0; }

/* =========== 8. the question bank =========== */

/* The chain's own Quizzes page, before #/quizzes became the bank: the
   sections the bank lifts from it are read from this, drawn for the active
   level alone. */
var _v54QuizzesHtml = (typeof v32QuizzesHtml === 'function') ? v32QuizzesHtml : null;

/* The four sections the bank gains, in this order, each without the level
   test (the bank's lead carries it), without Blind flight (its view kept
   by address), without codex39's 45 minute tasting (Grapes carries the
   Village tasting on the Court's grid; the run still answers its address)
   and without Endless (the bank's Whole bank is the same round). */
var V54_LIFT = ['v32-qz-paper', 'v39-qz-regions', 'v39-qz-service', 'v32-qz-hands'];
function v54LiftQuizzes() {
  if (!_v54QuizzesHtml || typeof v53TakeSection !== 'function') return '';
  var all = v32All();
  var was = all.quizzes;
  all.quizzes = false;
  var html = '';
  try { html = String(_v54QuizzesHtml() || ''); } catch (e) { html = ''; } finally { all.quizzes = was; }
  var out = '';
  V54_LIFT.forEach(function (id) {
    var piece = v53TakeSection(html, id).piece;
    piece = v54CutRows(piece, function (li) {
      return li.indexOf('data-k="leveltest"') >= 0 || v54Go(li, 'flight') || v54Go(li, 'villagetasting') || v54Go(li, 'endless');
    });
    out += v54DropEmpty(piece);
  });
  return out;
}
if (typeof v53BankHtml === 'function') {
  var _v54BankHtml = v53BankHtml;
  v53BankHtml = function () {
    var html = String(_v54BankHtml.apply(this, arguments) || '');
    try {
      if (html.indexOf('v54-lifted') >= 0) return html;
      var lift = v54LiftQuizzes();
      if (!lift) return html;
      lift = '<div class="v54-lifted">' + lift + '</div>';
      var m = /<section class="v32-group" aria-labelledby="v53-bank-(?!lead")/.exec(html);
      var at = m ? m.index : html.lastIndexOf('</div>');
      return at >= 0 ? html.slice(0, at) + lift + html.slice(at) : html + lift;
    } catch (e) { return html; }
  };
}

/* #/quizzes draws the bank under its own scope chip, named as the bank is;
   its address, its parent (the Library) and its scope are its own. */
function v54QuizzesBank() {
  var all = v32All();
  var was = all.library;
  all.library = all.quizzes;
  var html = '';
  try { html = String(v53BankHtml() || ''); } finally { all.library = was; }
  return html.replace('<div class="v25page v32-root v53-bank">', '<div class="v25page v32-root v53-bank v54-quizbank">');
}
if (_v54QuizzesHtml && typeof v53BankHtml === 'function') {
  v32QuizzesHtml = function () {
    try { return v54QuizzesBank(); } catch (e) { return _v54QuizzesHtml.apply(this, arguments); }
  };
}
if (typeof v25MainName === 'function') {
  var _v54MainName = v25MainName;
  v25MainName = function () {
    if (S && S.view === 'quizzes') return v54W('bankOf', { level: v53Lv().name });
    return _v54MainName.apply(this, arguments);
  };
}

/* The Practise root: the rounds row points at the bank; the grape decks
   leave (Grapes owns them), so does Blind flight; the level test leaves
   (the bank's lead carries it); a group left empty leaves whole; the Due
   today button names what it deals. The Library's Practise section is this
   body, so it follows. */
if (typeof v32FlashcardsHtml === 'function') {
  var _v54FlashcardsHtml = v32FlashcardsHtml;
  v32FlashcardsHtml = function () {
    var html = String(_v54FlashcardsHtml.apply(this, arguments) || '');
    try {
      html = v54EachRow(html, function (li) {
        if (v54IsGrapeDeckRow(li) || v54Go(li, 'flight') || li.indexOf('data-k="leveltest"') >= 0) return '';
        if (v54Go(li, 'quizzes')) return li.replace('data-go="quizzes"', 'data-go="bank"');
        return undefined;
      });
      html = v54DropEmpty(html.replace(/<section class="v32-group v32-testgroup"><\/section>/g, ''));
    } catch (e) { }
    return html;
  };
}
if (typeof V32_WORDS !== 'undefined' && V32_WORDS) V32_WORDS.startToday = v54W('startToday');

/* =========== 9. one Village tasting, and the Grapes root =========== */

/* Grapes' Tasting section reads The Court's grid drill, The Village tasting
   (30 minutes, on the Court's grid), Warm up: call the structure (codex20's
   Blind Grid, its line kept), The deductive grid. Blind flight and Study
   the grid leave it (the flight's view is kept by address; the method is a
   reading room's). */
if (typeof v53GrapesRootHtml === 'function') {
  var _v54GrapesRootHtml = v53GrapesRootHtml;
  v53GrapesRootHtml = function () {
    var html = String(_v54GrapesRootHtml.apply(this, arguments) || '');
    try {
      var at = html.indexOf('aria-labelledby="v53-g-tasting"');
      var end = at >= 0 ? html.indexOf('</section>', at) : -1;
      if (end < 0) return html;
      var sec = v54EachRow(html.slice(at, end), function (li) {
        if (v54Go(li, 'flight') || v54Go(li, 'tastegrid')) return '';
        if (v54Go(li, 'grid')) return v54Rename(li, v54W('warmUp'));
        return undefined;
      });
      return html.slice(0, at) + sec + html.slice(end);
    } catch (e) { return html; }
  };
}

/* =========== 10. the level page and the Library =========== */

/* The level page: the search box leaves (the Library's stays), so does the
   World Map row and the method's link under what the level holds (the
   reading rooms carry it); the Workshop row stays. The illustrated door
   codex36 draws is taken off by the DOM pass below. */
if (typeof v32LevelHtml === 'function') {
  var _v54LevelHtml = v32LevelHtml;
  v32LevelHtml = function () {
    var html = String(_v54LevelHtml.apply(this, arguments) || '');
    try {
      html = html.replace(/<section class="v32-sec" aria-labelledby="v32-search-h">[\s\S]*?<\/section>/, '');
      html = v54CutRows(html, function (li) { return v54Go(li, 'worldmap'); });
      html = html.replace(/<p class="v32secmeta"><button type="button" class="v32link" data-go="tastegrid">[^<]*<\/button><\/p>/g, '');
    } catch (e) { }
    return html;
  };
}
function v54LevelDom(view) {
  if (!view || typeof view.querySelectorAll !== 'function') return;
  Array.prototype.slice.call(view.querySelectorAll('.v36-level-door')).forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
}
if (typeof v32LevelView === 'function') {
  var _v54LevelView = v32LevelView;
  v32LevelView = function () {
    var view = _v54LevelView.apply(this, arguments);
    try { v54LevelDom(view); } catch (e) { }
    return view;
  };
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) { V25_VIEWS.level = v32LevelView; V25_VIEWS.today = v32LevelView; }
}

/* The Library: the Terroir row leaves (the World Map and the regions hold
   the land), the method's row is named How to taste: the method, its line
   says what the page holds; the DOM pass moves the regions door into The
   atlas and names what the search finds. */
if (typeof V32_WORDS !== 'undefined' && V32_WORDS) {
  V32_WORDS.libLine = v54W('libLine');
  V32_WORDS.libLineAll = v54W('libLineAll');
}
if (typeof v32LibraryHtml === 'function') {
  var _v54LibraryHtml = v32LibraryHtml;
  v32LibraryHtml = function () {
    var html = String(_v54LibraryHtml.apply(this, arguments) || '');
    try {
      html = v54EachRow(html, function (li) {
        if (v54Go(li, 'terroir')) return '';
        if (v54Go(li, 'tastegrid')) return v54Rename(li, v54W('howToTaste'));
        return undefined;
      });
      html = html.split('Find a grape, a region, a chapter or a lesson').join(v54W('placeholder'));
    } catch (e) { }
    return html;
  };
}
function v54LibraryDom(view) {
  if (!view || typeof view.querySelector !== 'function') return;
  var atlas = view.querySelector('.v53-atlas');
  var regions = view.querySelector('.v39-door-regions');
  if (atlas && regions && atlas.contains && !atlas.contains(regions)) {
    var field = atlas.querySelector('.v45-door');
    if (field && field.parentNode === atlas) atlas.insertBefore(regions, field);
    else atlas.appendChild(regions);
  }
  v54SearchWords(view, 'cf-in');
}
function v54SearchWords(box, id) {
  var input = box && typeof box.querySelector === 'function' ? box.querySelector('#' + id) : null;
  if (!input || typeof input.setAttribute !== 'function') return;
  input.placeholder = v54W('placeholder');
  input.setAttribute('aria-label', v54W('searchAria'));
}
if (typeof v32LibraryView === 'function') {
  var _v54LibraryView = v32LibraryView;
  v32LibraryView = function () {
    var view = _v54LibraryView.apply(this, arguments);
    try { v54LibraryDom(view); } catch (e) { }
    return view;
  };
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.library = v32LibraryView;
}
if (typeof v32WireSearch === 'function') {
  var _v54WireSearch = v32WireSearch;
  v32WireSearch = function (box, id) {
    var out = _v54WireSearch.apply(this, arguments);
    try { v54SearchWords(box, id); } catch (e) { }
    return out;
  };
}

/* A finished deck's Another deck returns to the Library, where Practise now lives. */
if (typeof v32Act === 'function') {
  var _v54V32Act = v32Act;
  v32Act = function (act) {
    if (act === 'another' && typeof v32Go === 'function') { v32Go({ view: 'library' }, 'push'); return; }
    return _v54V32Act.apply(this, arguments);
  };
}

/* =========== 11. the search: the subjects and the grape pages =========== */

/* codex44's index gains the Court's 44 subjects and one hit per grape page
   (the joined book's 59), and a grape hit opens the grape's page; the
   World Map and the method are named as their rooms name them. The flag is
   kept off the index's walk, as codex53 keeps codex45's and codex46's. */
function v54SubjectEntries() {
  var subs = (typeof v53SubjectList === 'function') ? v53SubjectList() : [];
  return subs.map(function (s) {
    var group = (typeof v53CmsGroupName === 'function') ? v53CmsGroupName(s.group) : '';
    return v44Entry(v54Str(s.name) || s.id, v54W('subjectLine', { group: group || v54Str(s.group) }),
      { court: s.court, outcome: s.outcome, rows: s.rows, map: s.map && { grapes: s.map.grapes, cats: s.map.cats } }, 'route', 'cmssubject', s.id);
  });
}
function v54GrapeEntries() {
  var J = (typeof v53GrapeJoin === 'function') ? v53GrapeJoin() : null;
  return v54List(J && J.list).filter(function (r) { return r && r.slug; }).map(function (r) {
    return v44Entry(v54Str(r.court) || v54Str(r.name) || r.slug, v54W('grapePage'),
      { name: r.name, g: r.g, intro: r.intro, keys: r.keys }, 'route', 'grape', r.slug);
  });
}
function v54Retitle(list, view, title, words) {
  v54List(list).forEach(function (e, i) {
    if (e && e.kind === 'route' && e.arg === view && !e.extra) list[i] = v44Entry(title, e.line, [e.hay, words], 'route', view);
  });
}
if (typeof v44Index === 'function' && typeof v44Entry === 'function') {
  var _v54Index = v44Index;
  v44Index = function () {
    var ix = _v54Index.apply(this, arguments);
    try {
      if (!ix || typeof ix !== 'object' || ix._v54) return ix;
      Object.defineProperty(ix, '_v54', { value: true, enumerable: false, writable: true, configurable: true });
      ix.subjects = v54SubjectEntries();
      var pages = v54GrapeEntries();
      if (pages.length) ix.grapes = pages;
      v54Retitle(ix.learn, 'worldmap', v54W('worldMap'), 'the wine atlas maps');
      v54Retitle(ix.learn, 'tastegrid', v54W('howToTaste'), 'study the grid');
    } catch (e) { }
    return ix;
  };
}
if (typeof v44Results === 'function') {
  var _v54Results = v44Results;
  v44Results = function (query) {
    var groups = _v54Results.apply(this, arguments) || [];
    try {
      groups.forEach(function (g) { if (g && g.key === 'grapes') g.title = v54W('grapesGroup'); });
      var ix = v44Index();
      var hits = (typeof v44Match === 'function') ? v44Match(v54List(ix && ix.subjects), query) : [];
      if (hits.length && !groups.some(function (g) { return g && g.key === 'subjects'; })) {
        var at = -1;
        groups.forEach(function (g, i) { if (g && g.key === 'places') at = i; });
        groups.splice(at + 1, 0, { key: 'subjects', title: v54W('subjects'), rows: hits, limit: 6 });
      }
    } catch (e) { }
    return groups;
  };
}

/* =========== 12. Brennan's rooms =========== */

/* The person's own bottles: codex28's rows marked own (a wine she added),
   never the house's list. */
function v54OwnCount() {
  try { return (typeof v28Rows === 'function') ? v28Rows().filter(function (r) { return r && r.own; }).length : 0; } catch (e) { return 0; }
}

/* Service rehearsal: the house due folded into Wine cards to revisit (one
   row in Today's study, dealt by codex53's house step: the wines last
   answered Again, else the wines never graded), the schedule note gone;
   the deck group of the producers named Producer cards; Recite your
   cellar and Quiz your cellar only when she holds bottles of her own, in a
   group of their own; Blind flight off the hands on group. */
function v54RevisitHtml() {
  var t = (typeof v53HouseDue === 'function') ? v53HouseDue() : { a: 0 };
  var line = (typeof v53HouseDueLine === 'function') ? v53HouseDueLine(t) : '';
  if (!t.a) return line ? '<p>' + v54Esc(line) + '</p>' : '';
  return '<ul class="v25rows v32rows v54-revisit"><li><button class="v25row" type="button" data-v53="housedue" id="v53-housedue">'
    + '<span class="v25row-name">' + v54W('revisit') + '</span><span class="v25row-line">' + v54Esc(line) + '</span></button></li></ul>';
}
function v54RehearsalShape(html) {
  html = html.replace(/(<h3 id="v48-heading-today">[^<]*<\/h3>)(?:<p>[^<]*<\/p>)?(?:<button[^>]*data-v53="housedue"[^>]*>[^<]*<\/button>)?/, function (m, h3) { return h3 + v54RevisitHtml(); });
  html = html.replace(/<p class="v48-note">Due today follows[^<]*<\/p>/, '');
  var own = [];
  html = v54EachRow(html, function (li) {
    if (/data-deck="list-weak"/.test(li) || v54Go(li, 'flight')) return '';
    if (v54Go(li, 'cellarrecite') || v54Go(li, 'cellardrill')) { own.push(li); return ''; }
    return undefined;
  });
  html = html.replace(/(<summary id="v48-summary-v53-producers"><span>)[^<]*(<\/span>)/, function (m, a, b) { return a + v54W('producerCards') + b; });
  /* the focused round's line, true once the wines to revisit have moved to Today's study */
  html = html.replace(/(<summary id="v48-summary-focused-rounds"><span>[^<]*<\/span><span class="v48-summary-line">)[^<]*(<\/span>)/, function (m, a, b) { return a + v54W('focusedLine') + b; });
  var n = v54OwnCount();
  if (n && own.length && typeof v48Details === 'function') {
    var group = v48Details('v54-own', v54W('ownBottles'), n === 1 ? v54W('ownOne') : v54W('ownMany', { n: n }), v32Rows(own.join('')));
    var at = html.indexOf('<details class="v48-disclosure" data-v48-keep="focused-rounds"');
    var end = at >= 0 ? html.indexOf('</details>', at) : -1;
    html = end >= 0 ? html.slice(0, end + '</details>'.length) + group + html.slice(end + '</details>'.length) : html;
  }
  return html;
}
if (typeof v48RehearsalHtml === 'function') {
  var _v54RehearsalHtml = v48RehearsalHtml;
  v48RehearsalHtml = function () {
    var html = String(_v54RehearsalHtml.apply(this, arguments) || '');
    try { return v54RehearsalShape(html); } catch (e) { return html; }
  };
}

/* Wine studies: the World Map, the grape study cards and the service
   reference leave (the Library and Grapes hold them); the Culinary
   Companion is the house's, under Wine studies. */
if (typeof v48StudyHtml === 'function') {
  var _v54StudyHtml = v48StudyHtml;
  v48StudyHtml = function () {
    var html = String(_v54StudyHtml.apply(this, arguments) || '');
    try { html = html.replace(/<details class="v48-disclosure" data-v48-keep="wider-study">[\s\S]*?<\/details>/, ''); } catch (e) { }
    return html;
  };
}
(function () {
  var own = function (k, word) {
    if (typeof V32_OWNER !== 'undefined' && V32_OWNER) V32_OWNER[k] = word;
    if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER[k] = word;
    if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB[k] = word;
  };
  own('culinary', 'brennans');
  if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA.culinary = 'brennans';
})();

/* =========== 13. the parents =========== */

/* The run screens (a quiz, its results and the drill screens codex32 put
   under Quizzes) climb to the view that started them, kept in S._v54from
   when a run begins (the route of the last screen drawn before it), else
   to the question bank. The house's own drills climb to Service rehearsal,
   so do its decks and its due run; the grape decks climb to Grapes;
   Quizzes to the Library; the Culinary Companion to Wine studies. The
   Cellar Compass and its decks, one wine's deck and the recovery keep
   their parents. */
var V54_RUNS = ['quiz', 'results', 'drillpick', 'sim', 'grid', 'floor', 'floortally', 'pairs', 'pairtally', 'tasting', 'service', 'finalsreport'];
var V54_HOUSE_RUNS = ['housesay', 'houseguest', 'houserecite', 'cellarrecite'];
var V54_HOUSE_DECKS = /^(?:list(?:-weak)?|bottles|menu-words|misses|due|producers|components(?:-all)?)(?::.*)?$/;
var V54_FROM = { prev: null, last: null };

(function () {
  if (typeof V32_PARENT === 'undefined' || !V32_PARENT) return;
  V54_HOUSE_RUNS.forEach(function (k) { V32_PARENT[k] = 'houserehearsal'; });
  V32_PARENT.quizzes = 'library';
  V32_PARENT.culinary = 'housestudies';
})();

function v54Here() {
  try {
    if (typeof v32Route !== 'function' || typeof v32Parse !== 'function') return S.view ? { view: S.view } : null;
    var r = v32Parse(v32Route().hash);
    return r && r.view ? r : (S.view ? { view: S.view } : null);
  } catch (e) { return S.view ? { view: S.view } : null; }
}
/* Read at every draw, before it: a run's first screen keeps the screen that started it. */
function v54NoteFrom() {
  var v = S && S.view;
  if (!v) return;
  if (V54_RUNS.indexOf(v) >= 0) {
    if (V54_FROM.prev === null || V54_RUNS.indexOf(V54_FROM.prev) < 0) S._v54from = V54_FROM.last;
  } else {
    V54_FROM.last = v54Here();
  }
  V54_FROM.prev = v;
}
if (typeof render === 'function') {
  var _v54Render = render;
  render = function () {
    try { v54NoteFrom(); } catch (e) { }
    return _v54Render.apply(this, arguments);
  };
}
function v54Copy(r) {
  var out = {};
  Object.keys(r || {}).forEach(function (k) { if (r[k] !== undefined && r[k] !== null && r[k] !== '' && r[k] !== false) out[k] = r[k]; });
  return out;
}
if (typeof v32ParentRoute === 'function') {
  var _v54ParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      var v = S.view;
      if (V54_HOUSE_RUNS.indexOf(v) >= 0) return { view: 'houserehearsal' };
      if (v === 'quizzes') return { view: 'library' };
      if (v === 'culinary' && !(typeof v32Arg === 'function' && v32Arg('culinary'))) return { view: 'housestudies' };
      if (V54_RUNS.indexOf(v) >= 0) {
        var from = S._v54from;
        return (from && from.view && V54_RUNS.indexOf(from.view) < 0) ? v54Copy(from) : { view: 'bank' };
      }
      if (v === 'deck') {
        var id = String(S._v32deck || '');
        if (V54_GRAPE_DECK.test(id)) return { view: 'grapes' };
        if (V54_HOUSE_DECKS.test(id)) return { view: 'houserehearsal' };
      }
      if ((v === 'housedeck' || v === 'flash') && S._v32run && S._v32run.v32 && S._v32run.deckId === 'due') return { view: 'houserehearsal' };
    } catch (e) { }
    return _v54ParentRoute.apply(this, arguments);
  };
}
/* A grape deck lights Grapes wherever it was opened from. */
if (typeof v25NavWord === 'function') {
  var _v54NavWord = v25NavWord;
  v25NavWord = function () {
    try {
      var v = S.view, id = '';
      if (v === 'deck') id = String(S._v32deck || '');
      else if (v === 'housedeck' || v === 'flash') { var run = S._v32run; id = (run && run.v32) ? String(run.deckId || '') : ''; }
      if (id && V54_GRAPE_DECK.test(id)) return 'grapes';
    } catch (e) { }
    return _v54NavWord.apply(this, arguments);
  };
}

/* =========== 14. the stale words, at display =========== */

/* The section screens (a quiz and its results) name codex12's list section
   Our wine list; the section's stored key ('Our List', S.section and every
   record under it) is unchanged. A pass over the drawn text only. */
var V54_OLD_LIST = ['Our Wine List', 'Our List'];
function v54TextPass(node, fn) {
  if (!node) return;
  if (node.nodeType === 3) { var t = node.nodeValue, u = fn(t); if (u !== t) node.nodeValue = u; return; }
  var kids = node.childNodes;
  if (!kids || typeof kids.length !== 'number') return;
  for (var i = 0; i < kids.length; i++) v54TextPass(kids[i], fn);
}
function v54ListWords(view) {
  var sec = String((S && S.section) || '');
  if (!view || V54_OLD_LIST.indexOf(sec) < 0) return;
  v54TextPass(view, function (t) {
    V54_OLD_LIST.forEach(function (w) { t = t.split(w).join(v54W('ourList')); });
    return t;
  });
}
['quizView', 'resultsView'].forEach(function (name) {
  try {
    var was = (name === 'quizView') ? (typeof quizView === 'function' ? quizView : null) : (typeof resultsView === 'function' ? resultsView : null);
    if (!was) return;
    var wrapped = function () {
      var view = was.apply(this, arguments);
      try { v54ListWords(view); } catch (e) { }
      return view;
    };
    if (name === 'quizView') quizView = wrapped; else resultsView = wrapped;
  } catch (e) { }
});

/* The World Map named as the Library names it, in our rows. */
if (typeof V39_WORDS !== 'undefined' && V39_WORDS) V39_WORDS.atlasRow = v54W('worldMap');
if (typeof V42_PATHS !== 'undefined' && Array.isArray(V42_PATHS)) {
  V42_PATHS.forEach(function (p) {
    v54List(p && p.steps).forEach(function (s) { if (Array.isArray(s) && s[0] === 'go' && s[1] === 'worldmap' && /Wine Atlas/.test(String(s[2]))) s[2] = v54W('worldMapStart'); });
  });
}
/* The Say the pour screen's empty line names where a line is kept now. */
if (typeof V27_SAY_NONE !== 'undefined') V27_SAY_NONE = v54W('sayNone');

/* codex53 wrote "No comparison is written for this grape yet." on the
   twelve grapes it draws from Régionale's fields alone; the card's back
   drops the line rather than print it. */
var V54_NO_COMPARE = '<p><b>Not to be confused with:</b> No comparison is written for this grape yet.</p>';
function v54NoCompare(html) { return String(html || '').split(V54_NO_COMPARE).join(''); }
if (typeof v32CardFace === 'function') {
  var _v54GrapeFace = v32CardFace;
  v32CardFace = function () {
    var html = _v54GrapeFace.apply(this, arguments);
    try { return v54NoCompare(html); } catch (e) { return html; }
  };
}

/* =========== 15. the owner's rule: no notice at display (2 November 2026) =========== */

/* Outside Of Time is the owner's own study tool, never sold and used by the
   owner alone, so it carries no disclaimer. codex25's V25_NONAFFIL line is kept as
   the constant it is and drawn nowhere: codex25's colophon under the home
   (v25Colophon) draws nothing and takes off one already drawn; codex32's
   More (its About group, which held the line alone) and codex53's CMS root
   lose the line from their strings. */
function v54NoticeForms() {
  var raw = (typeof V25_NONAFFIL === 'string') ? V25_NONAFFIL : '';
  if (!raw) return [];
  var out = [raw];
  [typeof v32Esc === 'function' ? v32Esc : null, typeof v53Esc === 'function' ? v53Esc : null, v54Esc].forEach(function (f) {
    try { var e = f ? String(f(raw)) : ''; if (e && out.indexOf(e) < 0) out.push(e); } catch (x) { }
  });
  return out;
}
function v54NoNotice(html) {
  var s = String(html == null ? '' : html);
  v54NoticeForms().forEach(function (n) {
    s = s.replace(new RegExp('<p\\b[^>]*>\\s*' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*</p>', 'g'), '');
  });
  /* More's About group, left holding its heading alone, leaves whole */
  return s.replace(/<section\b[^>]*aria-labelledby="v32-more-about"[^>]*>\s*<h3\b[^>]*>[^<]*<\/h3>\s*<\/section>/g, '');
}
function v54DropNotice(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return;
  var forms = v54NoticeForms();
  v54List(Array.prototype.slice.call(root.querySelectorAll('footer.colophon, .nonaffil, .v53-nonaffil') || [])).forEach(function (el) {
    var t = String(el.textContent || '').replace(/\s+/g, ' ').trim();
    if (el.parentNode && (forms.indexOf(t) >= 0 || (/\bcolophon\b/.test(String(el.className || '')) && !t))) el.parentNode.removeChild(el);
  });
}
if (typeof v25Colophon === 'function') {
  var _v54Colophon = v25Colophon;
  v25Colophon = function (app) {
    try { v54DropNotice(app); } catch (e) { }
  };
}
['v32MoreHtml', 'v53CmsRootHtml'].forEach(function (name) {
  try {
    var was = (name === 'v32MoreHtml') ? (typeof v32MoreHtml === 'function' ? v32MoreHtml : null) : (typeof v53CmsRootHtml === 'function' ? v53CmsRootHtml : null);
    if (!was) return;
    var wrapped = function () {
      var html = was.apply(this, arguments);
      try { return v54NoNotice(html); } catch (e) { return html; }
    };
    if (name === 'v32MoreHtml') v32MoreHtml = wrapped; else v53CmsRootHtml = wrapped;
  } catch (e) { }
});
