/* ================== CODEX XXIX: THE FLOOR'S BOTTLES AND THE FULL LIST ==================

   The wine deep dive (WorldTable plan, 4 October 2026). The owner chose two
   depths for Brennan's whole bottle list: full study cards for the bottles
   that matter on the floor, and every other bottle in a searchable list,
   described at producer and region level. This layer is the Codex's half.

   WHAT IT DOES, and the rule each part keeps:

   1. THE FLOOR'S BOTTLES GET WHOLE CARDS. A house wine on the bottle list
      (list 'bottle') with a kept ten second line or kept parts is a floor
      bottle: v28CardOf gives it a flash card, the decks deal it under its
      own scopes ('#bottles' for all of them, '#bottles|<section>' for one
      floor section), its card shows "Bin N" and the size under the name, the
      whole coaching block (codex28 drew only a line to confirm for the old
      verified bottles), the dishes it is offered with by the bottle, and
      Flash cards for this. The glass list's deck, its weak ones and its
      progress line count glasses only, as before.

   2. THE HEADER AND THE CHIPS COUNT APART. The header sentence counts the
      glasses, the bottles the menus print and the floor's bottles, each on
      its own; the bottle chip reads "The floor's bottles (N)" and, once
      pressed, a second row of chips names the floor sections (Champagne
      bottles, White Burgundy and the rest), each a scope of its own.

   3. THE FULL LIST, a view of its own (S.view 'fulllist'), reached from Our
      List's buttons and from Mine. It reads the house's list file
      (../shared/packs/<pack id>.winelist.v1.json, format oot-winelist v1)
      lazily, the first time the view opens, and says plainly when it cannot
      (offline before the first visit, or no file for this house). The
      folded search index is built once per load; the search runs over the
      name, the producer, the grape, the region and the bin; chips narrow by
      the list's own sections, by price band (under $100, $100 to $250, over
      $250, bottle prices only) and by size (half bottles, magnum and up);
      the results come 40 at a time behind "Show 40 more". A row opens in
      place to the producer's line and tell, the section's line, the Codex's
      own producer, grape and chapter where they match (v28Producer,
      v28GrapeProfiles, v28Primer), and "Open the full card" for a floor
      bottle. Every press repaints the results in place, so the scroll and
      the search box keep their place.

   4. OFFLINE. sw.js keeps the list file in a cache of its own,
      codexlist-v1, network first, so it survives every codex-vN bump and
      opens offline after one visit.

   5. THE BACK GESTURE. Opening the full list pushes one history entry; the
      back gesture leaves it for the screen that opened it. A door followed
      from a row (a producer, a grape, a chapter, a full card) comes back to
      the list with its search, its chips, its page and its open row.

   NO OOT AT ALL is the standalone build and every Node gate: no house, no
   floor bottle, no full list door; nothing is fetched at load, ever.

   House rules observed: a new layer, no edits to earlier files; top-level
   declarations are var and function only; no pictorial glyph and no mark at
   or above U+2190 in anything this file writes; no dash of any spelling;
   British spelling in the app's own words, the list's fields as printed;
   nobody named. */

/* =========== the words =========== */

var V29_WORDS = {
  floorChip: 'The floor\'s bottles ({n})',
  floorAll: 'All floor bottles {n}',
  floorSections: 'Sections of the floor\'s bottles',
  floorLabel: 'the floor\'s bottles',
  floorLine: 'The floor\'s bottles: {f} from the full bottle list, each with a card.',
  fullLine: 'The whole bottle list is in The full list.',
  binOf: 'Bin {bin}',
  binHead: 'Bin',
  binShared: 'The list prints Bin {bin} for another bottle too: {others}. Ring it by name and vintage, never by the bin alone.',
  binMore: 'And {n} more.',
  sizeHead: 'Size',
  withDishes: 'By the bottle with',
  tierValue: 'Value',
  tierClassic: 'Sweet spot',
  tierSplurge: 'Celebration',
  tierHalf: 'Half-bottle',
  fullList: 'The full list',
  fullListMine: 'every bottle on the house\'s list, searchable by name, producer, grape, region or bin',
  backList: 'Back to Our List',
  backMine: 'Back to Mine',
  lead: 'Every bottle on the list, {n} in all, as printed on {date}. Prices are per bottle except by the glass.',
  leadNoDate: 'Every bottle on the list, {n} in all. Prices are per bottle except by the glass.',
  find: 'Search the list',
  findLabel: 'Search by name, producer, grape, region or bin',
  sections: 'The list\'s sections',
  allSections: 'Every section {n}',
  bands: 'Price',
  bandAny: 'Any price',
  bandLow: 'Under $100',
  bandMid: '$100 to $250',
  bandHigh: 'Over $250',
  sizes: 'Size',
  sizeAny: 'Any size',
  sizeHalf: 'Half-bottles',
  sizeLarge: 'Magnum and up',
  count: '{n} bottles match.',
  countOne: '1 bottle matches.',
  showing: 'Showing {a} of {n}.',
  more: 'Show 40 more',
  none: 'Nothing on the list matches. Clear a chip or the search.',
  loading: 'Opening the full list…',
  cannot: 'The full list cannot be opened right now. It needs the network the first time; after one visit it stays on this device.',
  noList: 'This house has no full list yet.',
  retry: 'Try again',
  producerHead: 'The producer',
  placeHead: 'This part of the list',
  hereHead: 'In this app',
  openCard: 'Open the full card',
  grapeCards: 'Open {grape} in the grape cards',
  chapter: 'Read {cat}, a chapter at {level}',
  producerDoor: 'Open {name} in The Producers',
  glass: 'a glass',
  coravin: 'by Coravin',
  organic: 'organic',
  biodynamic: 'biodynamic',
  natural: 'natural',
  floorCards: 'Flash cards',
  sayPour: 'Say the pour',
  cardsThis: 'Flash cards for this'
};

function v29W(key, vars) {
  var s = V29_WORDS[key] || '';
  if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(String(vars[k])); });
  return s;
}

/* The chip codex28 drew for the old verified bottles now names the floor's. */
try { if (typeof V28_WORDS !== 'undefined' && V28_WORDS) V28_WORDS.bottles = V29_WORDS.floorChip; } catch (e) { }

var V29_FLOOR = '#bottles';
var V29_FLOOR_SEC = '#bottles|';

function v29Esc(s) { return (typeof v28Esc === 'function') ? v28Esc(s) : String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function v29Str(s) { return typeof s === 'string' ? s.trim() : ''; }
function v29Fold(s) { return (typeof v28Fold === 'function') ? v28Fold(s) : ' ' + String(s == null ? '' : s).toLowerCase() + ' '; }

/* =========== 1. the floor's bottles =========== */

/* A floor bottle: on the bottle list, with a kept ten second line or kept parts. */
function v29Full(w) {
  if (!w || typeof v28IsBottle !== 'function' || !v28IsBottle(w)) return false;
  var l = v28KV(w, 'lines') || {};
  if (v29Str(l.s10)) return true;
  var p = v28KV(w, 'parts');
  return !!p && ['main', 'technique', 'sauce', 'sides', 'taste'].some(function (k) { return v29Str(p[k]); });
}

var V29_TIERS = ['value', 'classic', 'splurge', 'half'];
var V29_TIER_WORD = { value: 'tierValue', classic: 'tierClassic', splurge: 'tierSplurge', half: 'tierHalf' };

/* The dishes a wine is offered with by the bottle, from the kept pairings: { dish, tier, sayIt }. */
function v29OfferedWith(h, id) {
  var out = [];
  (h && Array.isArray(h.dishes) ? h.dishes : []).forEach(function (d) {
    var p = v28KV(d, 'pairing');
    var b = p && p.bottles;
    if (!b || typeof b !== 'object') return;
    V29_TIERS.forEach(function (t) {
      if (b[t] && b[t].wineId === id) out.push({ dish: d, tier: t, sayIt: v29Str(b[t].sayIt) });
    });
  });
  return out;
}

if (typeof v28CardOf === 'function') {
  var _v29CardOf = v28CardOf;
  v28CardOf = function (item, h) {
    if (!v29Full(item)) return _v29CardOf(item, h);
    var plain = {};
    Object.keys(item).forEach(function (k) { if (k !== 'list') plain[k] = item[k]; });
    var c = _v29CardOf(plain, h);
    if (!c) return null;
    var bits = [];
    if (v29Str(item.bin)) bits.push(v29W('binOf', { bin: v29Str(item.bin) }));
    if (c.back.price) bits.push(c.back.price);
    if (v29Str(item.size)) bits.push(v29Str(item.size));
    c.back.price = bits.join(' · ');
    var offers = v29OfferedWith(h, item.id).map(function (o) { return o.dish.name + ' (' + v29W(V29_TIER_WORD[o.tier]).toLowerCase() + ')'; });
    if (offers.length) c.back.pairs = c.back.pairs.concat([[v29W('withDishes'), offers.join(', ')]]);
    return c;
  };
}

if (typeof v28DeckIds === 'function') {
  v28DeckIds = function (scope) {
    var h = v28House();
    var meal = v28Meal(v28MealNames(h, v28Rows()));
    var all = v28Wines(h).filter(function (w) { return v28CardOf(w, h); });
    if (scope && scope.itemIds) {
      var want = scope.itemIds;
      return all.filter(function (w) { return want.indexOf(w.id) >= 0; }).map(function (w) { return w.id; });
    }
    var sec = scope && typeof scope.section === 'string' ? scope.section : '';
    var floor = sec === V29_FLOOR || sec.indexOf(V29_FLOOR_SEC) === 0;
    var wines = all.filter(function (w) { return floor ? v28IsBottle(w) : !v28IsBottle(w); });
    if (!(scope && scope.keepMeal === false)) wines = wines.filter(function (w) { return v28InMeal({ item: w }, meal); });
    if (floor && sec.indexOf(V29_FLOOR_SEC) === 0) {
      var fs = sec.slice(V29_FLOOR_SEC.length);
      wines = wines.filter(function (w) { return v29Str(w.section) === fs; });
    } else if (!floor && sec) wines = wines.filter(function (w) { return v29Str(w.section) === sec; });
    return wines.map(function (w) { return w.id; });
  };
}

if (typeof v28Shown === 'function') {
  v28Shown = function (all, st) {
    var rows = all;
    var sec = st && typeof st.sec === 'string' ? st.sec : '';
    if (sec === V29_FLOOR) rows = rows.filter(function (r) { return r.bottle; });
    else if (sec.indexOf(V29_FLOOR_SEC) === 0) {
      var fs = sec.slice(V29_FLOOR_SEC.length);
      rows = rows.filter(function (r) { return r.bottle && r.section === fs; });
    } else if (sec) rows = rows.filter(function (r) { return !r.bottle && r.section === sec; });
    var tokens = v28Tokens(st ? st.q : '');
    if (tokens.length) rows = rows.filter(function (r) { return v28Matches(v28Hay(r), tokens); });
    return rows;
  };
}

/* A bottle is found by its bin too. */
if (typeof v28Hay === 'function') {
  var _v29Hay = v28Hay;
  v28Hay = function (r) {
    var hay = _v29Hay(r);
    var bin = r && r.item ? v29Str(r.item.bin) : '';
    return bin ? hay + bin + ' ' : hay;
  };
}

if (typeof v28LiveText === 'function') {
  var _v29LiveText = v28LiveText;
  v28LiveText = function (all, st) {
    var sec = st && typeof st.sec === 'string' ? st.sec : '';
    if (!v29Str(st.q) && sec.indexOf(V29_FLOOR_SEC) === 0) {
      var shown = v28Shown(all, st);
      return v28W('showing', { section: sec.slice(V29_FLOOR_SEC.length), n: shown.length, unit: shown.length === 1 ? 'wine' : 'wines' });
    }
    if (!v29Str(st.q) && sec === V29_FLOOR) {
      var n = v28Shown(all, st).length;
      return v28W('showing', { section: v29W('floorLabel'), n: n, unit: n === 1 ? 'wine' : 'wines' });
    }
    return _v29LiveText(all, st);
  };
}

/* A floor bottle's row carries its bin before the name. */
if (typeof v28RowHtml === 'function') {
  var _v29RowHtml = v28RowHtml;
  v28RowHtml = function (r, againIds) {
    var html = _v29RowHtml(r, againIds);
    var bin = r && r.bottle && r.item ? v29Str(r.item.bin) : '';
    if (!bin) return html;
    return html.replace('<span class="v28-name">', '<span class="v28-name"><span class="v29-bin">' + v29Esc(v29W('binOf', { bin: bin })) + '</span> ');
  };
}

/* The rows under their section heads, each count made once, and a floor
   section's head carrying its own Flash cards like a glass section's. */
if (typeof v28RowsHtml === 'function') {
  v28RowsHtml = function (all, st, prog, h) {
    var shown = v28Shown(all, st);
    var counts = {};
    shown.forEach(function (x) { var k = (x.bottle ? 'b|' : 'g|') + x.section; counts[k] = (counts[k] || 0) + 1; });
    var html = '';
    var cur = null;
    shown.forEach(function (r) {
      var key = (r.bottle ? 'b|' : 'g|') + r.section;
      if (key !== cur) {
        cur = key;
        var scope = r.bottle ? V29_FLOOR_SEC + r.section : r.section;
        var deckable = !r.own && v28DeckIds({ section: scope }).length > 0;
        html += '<div class="v28-sechead"><h3 class="secgroup">' + v28Esc(r.section) + ' · ' + counts[key] + '</h3>'
          + (deckable ? '<button type="button" class="btn small ghost" data-v28="cards" data-s="' + v28Esc(scope) + '">' + v28W('cards') + '</button>' : '')
          + '</div>';
      }
      html += v28RowHtml(r, prog.againIds);
    });
    if (!shown.length && v28Str(st.q)) html += '<p class="v28-soft">' + v28Esc(v28W('searchNone', { query: st.q })) + '</p>';
    var away = v28Str(st.q) ? v28Elsewhere(h, st.q) : [];
    if (away.length) {
      html += '<h3 class="secgroup">' + v28W('elsewhere') + '</h3><ul class="v28-list">' + away.map(function (x) {
        return '<li>' + v28W('inRoom', { name: v28RoomName(x.room, x.id, x.name), room: V28_ROOM_NAME[x.room] }) + '</li>';
      }).join('') + '</ul>';
    }
    return html;
  };
}

/* The header sentence: the glasses, the menus' bottles and the floor's bottles, each counted on its own. */
if (typeof v28ListSentence === 'function') {
  var _v29ListSentence = v28ListSentence;
  v28ListSentence = function (h, all) {
    var plainH = h;
    var floor = v28Wines(h).filter(v28IsBottle);
    if (floor.length) {
      plainH = {};
      Object.keys(h).forEach(function (k) { plainH[k] = h[k]; });
      plainH.wines = v28Wines(h).filter(function (w) { return !v28IsBottle(w); });
    }
    var s = _v29ListSentence(plainH, all);
    var tail = ' The full bottle list is not in the guide.';
    var more = (floor.length ? ' ' + v29W('floorLine', { f: floor.length }) : '') + (v29ListUrl(h) ? ' ' + v29W('fullLine') : '');
    if (s.indexOf(tail) >= 0) return s.replace(tail, more || tail);
    return s + more;
  };
}

/* Bin and size among the wine's facts. */
if (typeof v28WineBlock === 'function') {
  var _v29WineBlock = v28WineBlock;
  v28WineBlock = function (h, item, row) {
    var html = _v29WineBlock(h, item, row);
    if (!item || !v28IsBottle(item)) return html;
    var add = '';
    if (v29Str(item.bin)) add += '<dt>' + v29W('binHead') + '</dt><dd>' + v29Esc(item.bin) + '</dd>';
    if (v29Str(item.size)) add += '<dt>' + v29W('sizeHead') + '</dt><dd>' + v29Esc(item.size) + '</dd>';
    return add ? html.replace('<dl class="v28-dl">', '<dl class="v28-dl">' + add) : html;
  };
}

/* A floor bottle's floor block is the whole coaching block, not the line to confirm. */
if (typeof v28FloorBlock === 'function') {
  var _v29FloorBlock = v28FloorBlock;
  v28FloorBlock = function (h, item) {
    if (!v29Full(item)) return _v29FloorBlock(h, item);
    var plain = {};
    Object.keys(item).forEach(function (k) { if (k !== 'list') plain[k] = item[k]; });
    return _v29FloorBlock(h, plain);
  };
}

/* A floor bottle's card: Bin N and the size under the name, the dishes it is
   offered with by the bottle, and Flash cards for this. */
if (typeof v28CardHtml === 'function') {
  var _v29CardHtml = v28CardHtml;
  v28CardHtml = function (id) {
    var html = _v29CardHtml(id);
    var h = v28House();
    var item = h ? v28Find(h.wines, id) : null;
    if (!html || !item || !v28IsBottle(item)) return html;
    var binline = '';
    if (v29Str(item.bin)) binline += '<span class="lvltag v29-bintag">' + v29Esc(v29W('binOf', { bin: item.bin })) + '</span>';
    if (v29Str(item.size)) binline += '<span class="v29-size">' + v29Esc(item.size) + '</span>';
    if (binline) html = html.replace('</h2>', '</h2><p class="v29-binline">' + binline + '</p>');
    var offers = v29OfferedWith(h, id);
    if (offers.length) {
      var block = '<section class="v28-block"><h3 class="secgroup">' + v29W('withDishes') + '</h3><ul class="v28-list">' + offers.map(function (o) {
        /* a dish the card already links (its first pick, its goes-with) is named here without a second link */
        var linked = html.indexOf('menu#' + o.dish.id + '"') >= 0;
        return '<li><span class="v29-tier">' + v29Esc(v29W(V29_TIER_WORD[o.tier])) + ':</span> ' + (linked ? v29Esc(o.dish.name) : v28RoomName('table', o.dish.id, o.dish.name))
          + (o.sayIt ? '<span class="v28-say">"' + v29Esc(o.sayIt) + '"</span>' : '') + '</li>';
      }).join('') + '</ul></section>';
      var at = html.indexOf('<section class="v28-block"><p class="v28-eyebrow">' + v28W('eyebrow'));
      html = at >= 0 ? html.slice(0, at) + block + html.slice(at) : html;
    }
    if (v29Full(item) && html.indexOf('v28-acts') < 0) {
      var acts = '';
      if (v28CardOf(item, h)) acts += '<button type="button" class="btn gold" data-v28="cardsone" data-id="' + v29Esc(item.id) + '">' + v29W('cardsThis') + '</button>';
      if (typeof v27OpenSay === 'function' && v28LinesShown(item).s10) acts += '<button type="button" class="btn ghost" data-v28="say" data-id="' + v29Esc(item.id) + '">' + v29W('sayPour') + '</button>';
      var foot = html.indexOf('<div class="v28-btnrow v28-foot">');
      if (acts && foot >= 0) html = html.slice(0, foot) + '<div class="v28-btnrow v28-acts">' + acts + '</div>' + html.slice(foot);
    }
    return html;
  };
}

/* The study view: The full list among the buttons, and the floor's sections
   as a second row of chips while the floor's bottles are chosen. */
if (typeof v28StudyHtml === 'function') {
  var _v29StudyHtml = v28StudyHtml;
  v28StudyHtml = function () {
    var html = _v29StudyHtml();
    var h = v28House();
    if (v29ListUrl(h)) {
      var open = '<div class="v28-actions">';
      var at = html.indexOf(open);
      if (at >= 0) {
        var end = html.indexOf('</div>', at);
        if (end > at) html = html.slice(0, end) + '<button type="button" class="btn small ghost" data-v28="fulllist">' + v29W('fullList') + '</button>' + html.slice(end);
      }
    }
    var st = v28State();
    var sec = typeof st.sec === 'string' ? st.sec : '';
    if (sec === V29_FLOOR || sec.indexOf(V29_FLOOR_SEC) === 0) {
      var rows = v28Rows();
      var meal = v28Meal(v28MealNames(h, rows));
      var floor = v28MealRows(rows, meal).filter(function (r) { return r.bottle; });
      var order = [], by = {};
      floor.forEach(function (r) { if (!by[r.section]) { by[r.section] = 0; order.push(r.section); } by[r.section]++; });
      var chips = '<div class="v28-chips v29-floorchips" role="group" aria-label="' + v29Esc(v29W('floorSections')) + '">'
        + '<button type="button" class="v28-chip" data-v28="sec" data-s="' + V29_FLOOR + '" aria-pressed="' + (sec === V29_FLOOR ? 'true' : 'false') + '">' + v29Esc(v29W('floorAll', { n: floor.length })) + '</button>'
        + order.map(function (s) {
          var key = V29_FLOOR_SEC + s;
          return '<button type="button" class="v28-chip" data-v28="sec" data-s="' + v29Esc(key) + '" aria-pressed="' + (sec === key ? 'true' : 'false') + '">' + v29Esc(s) + ' ' + by[s] + '</button>';
        }).join('') + '</div>';
      var live = html.indexOf('<div id="v28-live"');
      var close = live > 0 ? html.lastIndexOf('</div>', live - 1) : -1;
      if (close > 0) html = html.slice(0, close) + chips + html.slice(close);
      /* the floor chip stands pressed while one of its sections is chosen */
      html = html.replace('data-s="' + V29_FLOOR + '" aria-pressed="false">' + v28W('bottles', { n: floor.length }), 'data-s="' + V29_FLOOR + '" aria-pressed="true">' + v28W('bottles', { n: floor.length }));
    }
    return html;
  };
}

/* A deck over the floor's bottles says so in words. */
if (typeof startHouseDeck === 'function') {
  var _v29StartDeck = startHouseDeck;
  startHouseDeck = function (scope) {
    var ok = _v29StartDeck(scope);
    var sec = scope && typeof scope.section === 'string' ? scope.section : '';
    if (ok && S._v28deck && (sec === V29_FLOOR || sec.indexOf(V29_FLOOR_SEC) === 0)) {
      S._v28deck.label = sec === V29_FLOOR ? v29W('floorLabel') : sec.slice(V29_FLOOR_SEC.length);
      render();
    }
    return ok;
  };
}

if (typeof v28Act === 'function') {
  var _v29Act = v28Act;
  v28Act = function (act, node) {
    if (act === 'fulllist') { v29Open('cellar'); return; }
    return _v29Act(act, node);
  };
}

/* =========== 3. the full list =========== */

var V29_LIST = { url: '', status: 'idle', data: null, rows: [], sections: [], secCount: {}, promise: null, said: '' };
var V29_PAGE = 40;

/* The list file this house ships beside its pack, or '' when it ships none. */
function v29ListUrl(h) {
  var id = h && h.pack && typeof h.pack.id === 'string' ? h.pack.id : '';
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ? '../shared/packs/' + id + '.winelist.v1.json' : '';
}

function v29State() {
  if (!S._v29) S._v29 = { q: '', sec: '', band: '', size: '', shown: V29_PAGE, open: null, from: 'cellar', pushed: false, y: 0, restore: false };
  return S._v29;
}

var V29_SIZE_NAME = { '375ml': 'half-bottle', '1.5l': 'magnum', '3l': 'double magnum', '6l': 'methuselah', '12l': 'balthazar', '15l': 'nebuchadnezzar' };
function v29SizeKey(size) { return String(size || '').toLowerCase().replace(/\s+/g, ''); }
function v29Large(size) {
  var m = /^(\d+(?:\.\d+)?)l$/.exec(v29SizeKey(size));
  return !!m && Number(m[1]) >= 1.5;
}
function v29Price(n) {
  var x = Number(n);
  if (!isFinite(x)) return '';
  var s = String(Math.round(x * 100) / 100);
  var parts = s.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '$' + parts.join('.');
}

/* The list, read and indexed once: every entry a row with its folded search
   text, its section, its band and its size kind. */
function v29Index(data) {
  var producers = data.producers && typeof data.producers === 'object' ? data.producers : {};
  var places = data.places && typeof data.places === 'object' ? data.places : {};
  var cards = data.cards && typeof data.cards === 'object' ? data.cards : {};
  var sections = Array.isArray(data.sections) ? data.sections.filter(function (s) { return typeof s === 'string' && s; }) : [];
  var sectionOf = function (place) {
    var best = '';
    sections.forEach(function (s) { if ((place === s || place.indexOf(s + ' ~ ') === 0) && s.length > best.length) best = s; });
    return best;
  };
  var rows = [];
  var secCount = {};
  (Array.isArray(data.entries) ? data.entries : []).forEach(function (e) {
    if (!Array.isArray(e) || e.length < 9) return;
    var place = String(e[1] || '');
    var sec = sectionOf(place);
    var p = producers[e[7]] || null;
    var pl = places[place] || null;
    var grape = e.length > 9 ? String(e[9] || '') : '';
    var flags = String(e[8] || '');
    var row = {
      n: e[0], place: place, section: sec, bin: String(e[2] || ''), name: String(e[3] || ''), vintage: String(e[4] || ''),
      price: e[5], size: String(e[6] || ''), pk: String(e[7] || ''), flags: flags, grape: grape,
      glass: flags.indexOf('g') >= 0, card: typeof cards[e[0]] === 'string' ? cards[e[0]] : ''
    };
    row.hay = v29Fold([row.name, row.vintage, row.bin, p ? p.name : '', p ? p.region : '', p ? p.country : '', grape, pl ? pl.title : '', place, sec].join(' '));
    var price = Number(row.price);
    row.band = row.glass || !isFinite(price) ? '' : price < 100 ? 'low' : price <= 250 ? 'mid' : 'high';
    row.sizeKind = v29SizeKey(row.size) === '375ml' ? 'half' : v29Large(row.size) ? 'large' : '';
    rows.push(row);
    if (sec) secCount[sec] = (secCount[sec] || 0) + 1;
  });
  /* The bins the list prints for more than one bottle: a bin whose rows differ in vintage or price
     (one vintage at one price under one bin is the same bottle cross listed, a magnum under Large
     Formats and again under its region). Each such row keeps the others, so its details can say it. */
  var byBin = {};
  rows.forEach(function (r) { if (r.bin) (byBin[r.bin] = byBin[r.bin] || []).push(r); });
  Object.keys(byBin).forEach(function (b) {
    var list = byBin[b];
    if (list.length < 2) return;
    if (list.every(function (r) { return r.vintage === list[0].vintage && Number(r.price) === Number(list[0].price); })) return;
    list.forEach(function (r) {
      r.shared = list.filter(function (x) { return x !== r && !(x.vintage === r.vintage && Number(x.price) === Number(r.price)); });
    });
  });
  return { rows: rows, sections: sections, secCount: secCount, producers: producers, places: places };
}

/* Reads the list once per url; a failure is remembered so the view says it, and Try again reads afresh. */
function v29Load(h) {
  var url = v29ListUrl(h);
  if (!url) { V29_LIST.status = 'none'; return Promise.resolve(false); }
  if (V29_LIST.url === url && (V29_LIST.status === 'ready' || V29_LIST.status === 'loading')) return V29_LIST.promise || Promise.resolve(true);
  V29_LIST.url = url; V29_LIST.status = 'loading'; V29_LIST.data = null; V29_LIST.rows = [];
  var p;
  try {
    if (typeof fetch !== 'function') throw new Error('no fetch');
    p = Promise.resolve(fetch(url)).then(function (res) {
      /* a house that ships no list answers 404: said as no list, not as a network failure */
      if (res && res.status === 404) { V29_LIST.status = 'none'; return null; }
      if (!res || !res.ok) throw new Error('status ' + (res ? res.status : 'none'));
      return res.json();
    }).then(function (data) {
      if (data === null && V29_LIST.status === 'none') return false;
      if (!data || data.format !== 'oot-winelist' || data.version !== 1 || !Array.isArray(data.entries)) throw new Error('not an oot-winelist v1 file');
      var ix = v29Index(data);
      if (V29_LIST.url !== url) return false;
      V29_LIST.data = data; V29_LIST.rows = ix.rows; V29_LIST.sections = ix.sections; V29_LIST.secCount = ix.secCount;
      V29_LIST.producers = ix.producers; V29_LIST.places = ix.places;
      V29_LIST.status = 'ready';
      return true;
    }).catch(function (err) {
      if (V29_LIST.url === url) { V29_LIST.status = 'failed'; V29_LIST.said = String(err && err.message || err); }
      return false;
    });
  } catch (e) {
    V29_LIST.status = 'failed'; V29_LIST.said = String(e && e.message || e);
    p = Promise.resolve(false);
  }
  V29_LIST.promise = p;
  return p;
}

/* What the chips and the search leave, in the list's order. */
function v29Filtered(st) {
  var tokens = v29Fold(st.q).trim().split(' ').filter(Boolean);
  return V29_LIST.rows.filter(function (r) {
    if (st.sec && r.section !== st.sec) return false;
    if (st.band && r.band !== st.band) return false;
    if (st.size && r.sizeKind !== st.size) return false;
    for (var i = 0; i < tokens.length; i++) if (r.hay.indexOf(tokens[i]) < 0) return false;
    return true;
  });
}

function v29PlaceTitle(key) {
  var p = V29_LIST.places && V29_LIST.places[key];
  return p && v29Str(p.title) ? v29Str(p.title) : key;
}

/* One row: a button with the bin, the name and vintage, the price, and the
   size and section under it; open, the details follow it in place. */
function v29RowHtml(r, open) {
  var price = r.glass ? v29Price(r.price) + ' ' + v29W('glass') : v29Price(r.price);
  var size = V29_SIZE_NAME[v29SizeKey(r.size)];
  var under = [];
  if (r.size && v29SizeKey(r.size) !== '750ml') under.push(r.size + (size ? ', ' + size : ''));
  under.push(v29PlaceTitle(r.place));
  var id = 'v29-d' + r.n;
  var html = '<button type="button" class="v28-row v29-row" data-v29="row" data-n="' + r.n + '" aria-expanded="' + (open ? 'true' : 'false') + '" aria-controls="' + id + '">'
    + '<span class="v28-rowtop"><span class="v28-name">' + (r.bin ? '<span class="v29-bin">' + v29Esc(v29W('binOf', { bin: r.bin })) + '</span> ' : '')
    + v29Esc(r.name) + (r.vintage ? ' ' + v29Esc(r.vintage) : '') + '</span>'
    + (price ? '<span class="lvltag v28-price">' + v29Esc(price) + '</span>' : '') + '</span>'
    + '<span class="v28-short">' + v29Esc(under.join(' · ')) + '</span></button>';
  html += '<div class="v29-detail" id="' + id + '"' + (open ? '' : ' hidden') + '>' + (open ? v29DetailHtml(r) : '') + '</div>';
  return html;
}

/* The Codex's own grape profiles a row's words name: the grape the list
   prints, and any profile whose name stands in the name or its place. */
function v29Grapes(r) {
  var names = [];
  if (r.grape) names.push(r.grape);
  var hay = v29Fold([r.name, v29PlaceTitle(r.place), r.place].join(' '));
  [typeof GRAPES !== 'undefined' ? GRAPES : null, typeof GRAPES_PLUS !== 'undefined' ? GRAPES_PLUS : null].forEach(function (list) {
    (Array.isArray(list) ? list : []).forEach(function (x) {
      if (x && typeof x.g === 'string' && names.indexOf(x.g) < 0 && v28NameIn(hay, x.g) >= 0) names.push(x.g);
    });
  });
  return (typeof v28GrapeProfiles === 'function') ? v28GrapeProfiles({ grapes: names }) : [];
}

function v29DetailHtml(r) {
  var p = V29_LIST.producers ? V29_LIST.producers[r.pk] : null;
  var pl = V29_LIST.places ? V29_LIST.places[r.place] : null;
  var html = '';
  var flags = [];
  if (r.flags.indexOf('c') >= 0) flags.push(v29W('coravin'));
  if (r.flags.indexOf('o') >= 0) flags.push(v29W('organic'));
  if (r.flags.indexOf('b') >= 0) flags.push(v29W('biodynamic'));
  if (r.flags.indexOf('n') >= 0) flags.push(v29W('natural'));
  if (flags.length) html += '<p class="v28-soft">' + v29Esc(flags.join(', ')) + '</p>';
  if (r.shared && r.shared.length) {
    var named = r.shared.slice(0, 3).map(function (x) { return x.name + (x.vintage ? ' ' + x.vintage : '') + (x.glass ? '' : ', ' + v29Price(x.price)); });
    var more = r.shared.length > 3 ? ' ' + v29W('binMore', { n: r.shared.length - 3 }) : '';
    html += '<p class="v29-binshared">' + v29Esc(v29W('binShared', { bin: r.bin, others: named.join('; ') })) + v29Esc(more) + '</p>';
  }
  if (p) {
    html += '<h4 class="v28-eyebrow">' + v29W('producerHead') + '</h4>'
      + '<p class="v28-refname">' + v29Esc(p.name) + (v29Str(p.region) || v29Str(p.country) ? ' <span class="v28-soft">' + v29Esc([v29Str(p.region), v29Str(p.country)].filter(Boolean).join(', ')) + '</span>' : '') + '</p>'
      + (v29Str(p.line) ? '<p>' + v29Esc(p.line) + '</p>' : '')
      + (v29Str(p.tell) ? '<p class="v29-tell">' + v29Esc(p.tell) + '</p>' : '');
  }
  if (pl && v29Str(pl.line)) {
    html += '<h4 class="v28-eyebrow">' + v29W('placeHead') + '</h4><p class="v28-refname">' + v29Esc(pl.title || r.place) + '</p><p>' + v29Esc(pl.line) + '</p>';
    if (r.section && r.place !== r.section && V29_LIST.places[r.section] && v29Str(V29_LIST.places[r.section].line)) {
      var top = V29_LIST.places[r.section];
      html += '<p class="v28-soft">' + v29Esc(v29Str(top.title) || r.section) + ': ' + v29Esc(top.line) + '</p>';
    }
  }
  var doors = [];
  if (r.card) {
    var h = v28House();
    if (h && v28Find(h.wines, r.card)) doors.push('<button type="button" class="btn small gold" data-v29="card" data-id="' + v29Esc(r.card) + '">' + v29W('openCard') + '</button>');
  }
  var prod = (p && typeof v28Producer === 'function') ? v28Producer({ producer: p.name }) : null;
  if (prod) doors.push('<button type="button" class="btn small ghost" data-v29="producer" data-k="' + v29Esc(prod.id) + '">' + v29Esc(v29W('producerDoor', { name: prod.p })) + '</button>');
  v29Grapes(r).forEach(function (g) {
    if (g.flash) doors.push('<button type="button" class="btn small ghost" data-v29="grape" data-g="' + v29Esc(g.p.g) + '">' + v29Esc(v29W('grapeCards', { grape: g.p.g })) + '</button>');
  });
  var region = [p ? p.region : '', p ? p.country : '', pl ? pl.title : '', r.section].filter(function (x) { return v29Str(x); }).join(', ');
  var primer = (typeof v28Primer === 'function') ? v28Primer({ region: region }) : null;
  if (primer) doors.push('<button type="button" class="btn small ghost" data-v29="primer" data-k="' + v29Esc(String(primer.key)) + '">'
    + v29Esc(v29W('chapter', { cat: primer.name, level: (typeof v28LevelName === 'function') ? v28LevelName() : 'this level' })) + '</button>');
  if (doors.length) html += '<h4 class="v28-eyebrow">' + v29W('hereHead') + '</h4><div class="v28-btnrow">' + doors.join('') + '</div>';
  return html;
}

function v29CountText(n, a) {
  var big = function (x) { try { return Number(x).toLocaleString('en-GB'); } catch (e) { return String(x); } };
  return (n === 1 ? v29W('countOne') : v29W('count', { n: big(n) })) + (n > a ? ' ' + v29W('showing', { a: big(a), n: big(n) }) : '');
}

function v29ResultsHtml(st) {
  var rows = v29Filtered(st);
  if (!rows.length) return '<p class="v28-soft">' + v29W('none') + '</p>';
  var shown = rows.slice(0, st.shown);
  var html = shown.map(function (r) { return v29RowHtml(r, st.open === r.n); }).join('');
  if (rows.length > shown.length) html += '<div class="v28-btnrow v29-morerow"><button type="button" class="btn ghost" data-v29="more">' + v29W('more') + '</button></div>';
  return html;
}

function v29ChipHtml(group, value, label, on) {
  return '<button type="button" class="v28-chip" data-v29="' + group + '" data-v="' + v29Esc(value) + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + v29Esc(label) + '</button>';
}

function v29BarHtml(st) {
  var secs = '<div class="v28-chips" role="group" aria-label="' + v29Esc(v29W('sections')) + '">'
    + v29ChipHtml('sec', '', v29W('allSections', { n: V29_LIST.rows.length }), !st.sec)
    + V29_LIST.sections.map(function (s) { return v29ChipHtml('sec', s, v29PlaceTitle(s) + ' ' + (V29_LIST.secCount[s] || 0), st.sec === s); }).join('') + '</div>';
  var bands = '<div class="v28-chips" role="group" aria-label="' + v29Esc(v29W('bands')) + '">'
    + v29ChipHtml('band', '', v29W('bandAny'), !st.band) + v29ChipHtml('band', 'low', v29W('bandLow'), st.band === 'low')
    + v29ChipHtml('band', 'mid', v29W('bandMid'), st.band === 'mid') + v29ChipHtml('band', 'high', v29W('bandHigh'), st.band === 'high') + '</div>';
  var sizes = '<div class="v28-chips" role="group" aria-label="' + v29Esc(v29W('sizes')) + '">'
    + v29ChipHtml('size', '', v29W('sizeAny'), !st.size) + v29ChipHtml('size', 'half', v29W('sizeHalf'), st.size === 'half')
    + v29ChipHtml('size', 'large', v29W('sizeLarge'), st.size === 'large') + '</div>';
  return '<div class="v28-bar v29-bar"><div class="v28-find"><label class="sr-only" for="v29-q">' + v29W('findLabel') + '</label>'
    + '<input id="v29-q" class="sainput v28-q" type="search" autocomplete="off" spellcheck="false" placeholder="' + v29W('find') + '" value="' + v29Esc(st.q) + '"></div>'
    + secs + bands + sizes + '</div>';
}

function v29ViewHtml() {
  var h = v28House();
  var st = v29State();
  var date = (typeof v28Date === 'function') ? v28Date(V29_LIST.data && V29_LIST.data.readOn) : '';
  var html = '<div class="v28 v29" id="v29">';
  html += '<div class="v28-cardnav v29-nav"><button type="button" class="btn small ghost" data-v29="back">' + (st.from === 'mine' ? v29W('backMine') : v29W('backList')) + '</button></div>';
  html += '<div class="viewhead v28-head"><h2>' + v29W('fullList') + '</h2><div class="sub">' + v29Esc((h && h.name) || '') + '</div></div>';
  if (!v29ListUrl(h)) return html + '<p class="v28-soft" role="status">' + v29W('noList') + '</p></div>';
  if (V29_LIST.status === 'ready') {
    var n = V29_LIST.rows.length;
    html += '<p class="v28-lede">' + v29Esc(date ? v29W('lead', { n: n.toLocaleString('en-GB'), date: date }) : v29W('leadNoDate', { n: n.toLocaleString('en-GB') })) + '</p>';
    html += v29BarHtml(st);
    var count = v29Filtered(st).length;
    html += '<p id="v29-live" class="v29-count" role="status" aria-live="polite">' + v29Esc(v29CountText(count, Math.min(count, st.shown))) + '</p>';
    html += '<div id="v29-rows" class="v28-rows">' + v29ResultsHtml(st) + '</div>';
  } else if (V29_LIST.status === 'none') {
    html += '<p class="v28-soft" role="status">' + v29W('noList') + '</p>';
  } else if (V29_LIST.status === 'failed') {
    html += '<p class="v28-soft" role="status">' + v29W('cannot') + '</p><div class="v28-btnrow"><button type="button" class="btn ghost" data-v29="retry">' + v29W('retry') + '</button></div>';
  } else {
    html += '<p class="v28-soft" role="status">' + v29W('loading') + '</p>';
  }
  html += '</div>';
  return html;
}

/* The results and the count repainted in place, the search box left alone. */
function v29Repaint(box) {
  var st = v29State();
  var root = box || (typeof document !== 'undefined' ? document : null);
  if (!root || typeof root.querySelector !== 'function') return;
  var out = root.querySelector('#v29-rows');
  var live = root.querySelector('#v29-live');
  var count = v29Filtered(st).length;
  if (out) out.innerHTML = v29ResultsHtml(st);
  if (live) live.textContent = v29CountText(count, Math.min(count, st.shown));
}

function v29PressChips(box, group, value) {
  try {
    Array.prototype.forEach.call(box.querySelectorAll('[data-v29="' + group + '"]'), function (b) {
      b.setAttribute('aria-pressed', (b.getAttribute('data-v') || '') === value ? 'true' : 'false');
    });
  } catch (e) { }
}

function v29ScrollY() { return (typeof v28ScrollY === 'function') ? v28ScrollY() : 0; }

/* A door from a row: the list's place is kept and an entry pushed, so the back gesture comes back to it. */
function v29Door() {
  var st = v29State();
  st.y = v29ScrollY();
  st.restore = true;
  if (typeof v28Push === 'function') v28Push({ v29: 'door' });
}

function v29Act(act, node, box) {
  var get = function (k) { return node && typeof node.getAttribute === 'function' ? (node.getAttribute(k) || '') : ''; };
  var st = v29State();
  switch (act) {
    case 'back': v29Close(); return;
    case 'retry': V29_LIST.status = 'idle'; V29_LIST.url = ''; v29Start(); return;
    case 'sec': case 'band': case 'size':
      st[act] = get('data-v'); st.shown = V29_PAGE; st.open = null;
      v29PressChips(box, act, st[act]); v29Repaint(box); return;
    case 'more': st.shown += V29_PAGE; v29Repaint(box); return;
    case 'row': {
      var n = Number(get('data-n'));
      st.open = st.open === n ? null : n;
      var detail = box && typeof box.querySelector === 'function' ? box.querySelector('#v29-d' + n) : null;
      Array.prototype.forEach.call(box.querySelectorAll('.v29-row[aria-expanded="true"]'), function (b) {
        if (b === node) return;
        b.setAttribute('aria-expanded', 'false');
        var d = box.querySelector('#v29-d' + b.getAttribute('data-n'));
        if (d) { d.hidden = true; d.innerHTML = ''; }
      });
      var row = null;
      V29_LIST.rows.some(function (r) { if (r.n === n) { row = r; return true; } return false; });
      if (detail && row) {
        detail.hidden = st.open !== n;
        detail.innerHTML = st.open === n ? v29DetailHtml(row) : '';
      }
      node.setAttribute('aria-expanded', st.open === n ? 'true' : 'false');
      return;
    }
    case 'card': {
      var id = get('data-id');
      /* no entry of its own: the card pushes one, and back from the card lands on the list's */
      st.y = v29ScrollY();
      st.restore = true;
      S._v28edit = false;
      S._v25area = 'mine';
      S.view = 'cellar';
      var vs = v28State();
      vs.q = ''; vs.sec = '';
      v28Open(id, false);
      return;
    }
    case 'producer': case 'grape': case 'primer':
      v29Door();
      v28Act(act, node);
      return;
    default: return;
  }
}

function v29Wire(box) {
  if (!box || typeof box.addEventListener !== 'function') return;
  box.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v29]') : null;
    if (!node || node.disabled) return;
    if (typeof e.preventDefault === 'function' && node.tagName === 'BUTTON') e.preventDefault();
    v29Act(node.getAttribute('data-v29'), node, box);
  });
  var q = typeof box.querySelector === 'function' ? box.querySelector('#v29-q') : null;
  if (q && typeof q.addEventListener === 'function') {
    q.addEventListener('input', function () {
      var st = v29State();
      st.q = String(q.value || '');
      st.shown = V29_PAGE;
      st.open = null;
      v29Repaint(box);
    });
  }
}

function v29ListView() {
  v29Start();
  var box = document.createElement('div');
  box.innerHTML = v29ViewHtml();
  v29Wire(box);
  return box;
}

/* Starts the read when the list is not read yet, and draws the view again once it is. */
function v29Start() {
  var h = v28House();
  if (!v29ListUrl(h)) { V29_LIST.status = 'none'; return; }
  if (V29_LIST.url === v29ListUrl(h) && V29_LIST.status !== 'idle') return;
  v29Load(h).then(function () { if (S && S.view === 'fulllist') { try { render(); } catch (e) { } } });
}

function v29Open(from) {
  var st = v29State();
  st.from = from === 'mine' ? 'mine' : 'cellar';
  st.restore = false;
  st.pushed = (typeof v28Push === 'function') ? v28Push({ v29: 'list' }) : false;
  S._v25area = 'mine';
  S.view = 'fulllist';
  render();
}

function v29Leave() {
  var st = v29State();
  st.pushed = false;
  st.restore = false;
  S.view = st.from === 'mine' ? 'mine' : 'cellar';
  render();
}

function v29Close() {
  var st = v29State();
  var pushed = st.pushed;
  v29Leave();
  if (pushed && typeof v28Back === 'function') v28Back();
}

/* After codex28's own listener: back onto the list's entry shows the list
   again (from a door or a full card); back off it leaves for the screen that
   opened it. */
function v29OnPop(e) {
  var to = (e && e.state && e.state.v29) || null;
  var st = v29State();
  if (to === 'list' && S.view !== 'fulllist') {
    S._v28deck = null;
    S.view = 'fulllist';
    S._v25area = 'mine';
    st.pushed = true;
    render();
    return;
  }
  if (S.view === 'fulllist' && !to) {
    st.pushed = false;
    st.restore = false;
    S.view = st.from === 'mine' ? 'mine' : 'cellar';
    render();
  }
}

/* =========== the wraps =========== */

(function () {
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.fulllist = v29ListView;
  if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER.fulllist = 'mine';
  if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB.fulllist = 'mine';
})();

if (typeof v25MainName === 'function') {
  var _v29MainName = v25MainName;
  v25MainName = function () {
    if (S && S.view === 'fulllist') return v29W('fullList');
    return _v29MainName.apply(this, arguments);
  };
}

var _v29Render = render;
render = function () {
  var out;
  var own = S.view === 'fulllist' && !(typeof V25_VIEWS !== 'undefined' && V25_VIEWS && V25_VIEWS.fulllist);
  if (own) {
    var app = document.getElementById('app');
    app.innerHTML = ''; app.appendChild(topbar()); app.appendChild(v29ListView());
  } else out = _v29Render.apply(this, arguments);
  try {
    var st = S._v29;
    if (S.view === 'fulllist' && st && st.restore) {
      st.restore = false;
      var y = st.y || 0;
      window.scrollTo(0, y);
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { try { window.scrollTo(0, y); } catch (e) { } });
    }
  } catch (e) { }
  return out;
};

try { if (typeof window !== 'undefined' && window && typeof window.addEventListener === 'function') window.addEventListener('popstate', v29OnPop); } catch (e) { }

/* =========== the row on Mine =========== */

var V29_MINE_ROW = {
  key: 'fulllist', name: 'The full list',
  show: function () { try { return !!v29ListUrl(v28House()); } catch (e) { return false; } },
  line: function () { return v29W('fullListMine'); },
  go: function () { v29Open('mine'); }
};
(function () {
  if (typeof V25_MINE === 'undefined' || !V25_MINE || typeof V25_MINE.splice !== 'function') return;
  var at = -1;
  V25_MINE.forEach(function (r, i) { if (r && (r.key === 'ourlistcards' || (at < 0 && r.key === 'cellar'))) at = i; });
  V25_MINE.splice(at >= 0 ? at + 1 : V25_MINE.length, 0, V29_MINE_ROW);
  if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO.fulllist = V29_MINE_ROW.go;
  if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA.fulllist = 'mine';
})();
