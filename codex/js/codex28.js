/* ================== CODEX XXVIII: OUR LIST, TO STUDY ==================

   The owner looked at Our Wine List on 3 October 2026, two days before her
   first shift at Brennan's, and found an editing surface: every mark of
   every bottle under Kept, Edit and Discard, the list's own header buried
   under six drill buttons. This layer makes the list a study tool whenever
   a house is current and holds wines, and leaves today's screen exactly as
   it was behind one switch. The design is WorldTable's
   docs/study-menus-design.md (sections 1, 2.4, 4.3 and 9); this file is
   the Codex's half of it.

   WHAT IT DOES, and the rule each part keeps:

   1. THE DEEP LINK. At load, behind typeof and try, `#wine=<id>` (the id
      matched by /^w-[a-z0-9]{8}$/ and nothing looser) or `#list` is read
      into V28_WANT and the hash is cleared with a guarded replaceState. The
      wish is honoured by the first render that finds the wine in the
      current house, and dropped after the first sync that does not. A page
      with no location, or one with no pathname (the merge harness), reads
      nothing and writes nothing.

   2. THE STUDY VIEW. cellarView is wrapped: with a current house holding
      wines and the switch off, it returns the study view; otherwise the
      wrapped call is today's list with codex27's rows, unchanged. The view
      is a short header (the house, the menus' date, one sentence saying
      what the list is and is not, the progress line, the shift filter and
      one row of buttons), a sticky bar (the search box and one row of
      section chips that scrolls inside itself), and compact rows, each a
      button opening the wine's card. The switch is never stored: every load
      opens on the study view.

   3. THE CARD, in the order of the design's section 1.3: the way back and
      the position with Next, the eyebrow, the name and the price as
      printed, Say it, the ten second line, the first picks in one line,
      the twenty and forty-five second lines behind two toggles, About it,
      the wine itself, the five parts, On the floor (the coaching notes, the
      lineup asks, the disputes, the mix-ups, more and earlier notes), the
      service note under the fixed eyebrow, In this app (the grapes, the
      region, the chapter, the map, the producer, the house's words, the
      table), In the other rooms (the dishes in the Table and the drinks
      across in the Ledger), the three study buttons, Edit, and Previous
      and Next. ONLY KEPT MARKS (by === 'person') are drawn; a mark of hers
      nobody kept is never shown, and the card says in one line that there
      is something to look over behind Edit.

   4. EVERY LINK IS MATCHED, NEVER GUESSED, and drawn only when its target
      exists: a grape profile whose folded name equals the wine's grape, a
      Terroir row whose folded name equals a part of the wine's region or
      stands in it as whole words, the chapter of the current level whose
      name stands in the region, a map sheet that holds the region and is
      on this device, a producer record whose folded name equals the wine's
      producer or holds it as whole words. A link into another room is
      drawn only on the suite's own origin, for an item in the house, while
      online or when that room's entry point is in this device's caches;
      otherwise the name is plain words.

   5. THE DECK. startHouseDeck(scope) deals one card per house wine in
      scope with a kept ten second line or kept parts (the whole list, a
      section, one wine, or the weak ones); the whole front is one Flip
      button, Got it and Again appear only after the flip, and each answer
      is recorded through codex27's v27RecordHouse under 'h-<id>-card',
      which keyOwned keeps out of every level, readiness figure and exam.
      Bottles from a partial bottle list are never mixed into the glass
      list's deck.

   6. THE DRILLS stay codex27's house rounds: "Drill the list" deals the
      v27HouseQs cellar kinds through the Codex's own quiz engine, and
      startHouseSectionDrill narrows them to one section. Nothing here calls
      startCellarDrill or startCellarRecite.

   7. THE BACK GESTURE. Opening a card or the deck pushes one history entry
      (guarded); one popstate listener closes the card or the deck when the
      state it pops to does not hold it, restores the list's scroll and
      focuses the row that opened it. The deck's own steps push nothing.

   8. ALLERGENS STAY WITH THE KITCHEN. No allergen is drawn, ticked or
      inferred; the service note sits only under the fixed eyebrow.

   NO OOT AT ALL is the standalone build and every Node gate: the study view
   never shows, cellarView is today's, the deck deals nothing.

   House rules observed: a new layer, no edits to earlier files; top-level
   declarations are var and function only; no pictorial glyph and no mark
   at or above U+2190 in anything this file writes; no dash of any spelling;
   British spelling in the app's own words, the house's fields as the house
   wrote them; levels named, never numbered. */

/* =========== the words =========== */

var V28_ABOUT_Q = 'Tell me about it.';
var V28_COACH = ['How do I sell it?', 'What do guests ask?', 'What should I watch for?', 'How do I pour it?'];
var V28_WORDS = {
  backList: 'Back to the list',
  position: '{i} of {n} in {section}',
  found: '{i} of {n} found',
  findWine: 'Find a wine',
  all: 'All {n}',
  showing: 'Showing {section}: {n} {unit}',
  searchHits: '{n} found for {query}',
  searchNone: 'Nothing matches {query}.',
  read: 'menus read {date}',
  progress: '{studied} of {total} studied \u00b7 {got} got it last time \u00b7 {again} again',
  progressNone: 'Nothing studied yet: start with Flash cards.',
  cards: 'Flash cards',
  weak: 'My weak ones ({n})',
  weakNone: 'My weak ones: none yet',
  drillList: 'Drill the list',
  sayPour: 'Say the pour',
  editSwitch: 'Edit the list',
  editOn: 'Edit the list: on',
  edit: 'Edit',
  ten: 'In ten seconds',
  twenty: 'Twenty seconds', twentyHide: 'Hide twenty seconds',
  fortyFive: 'Forty-five seconds', fortyFiveHide: 'Hide forty-five seconds',
  guestLine: 'The guest line',
  say: 'Say it',
  asPrinted: 'Prices as printed on {date}. Confirm before quoting.',
  pickLine: 'First pick for: {names}',
  allDay: 'All day',
  elsewhere: 'Elsewhere in the house',
  inRoom: '{name}, in the {room}',
  alsoHouse: 'Also in the house: {dishes} in the Table, {drinks} in the Ledger',
  nextOnly: 'Next',
  drillSection: 'Drill this section',
  drillWhole: 'Drill the whole list',
  tooSmall: '{section} is too small to drill alone.',
  bottles: 'Bottles verified online ({n})',
  bottleConfirm: 'Confirm with the sommelier that it is on the list tonight.',
  about: 'About it',
  parts: 'The five parts',
  wine: 'The wine',
  bottleNone: 'Not in the guide: the bottle list is on the restaurant\'s own page',
  profile: 'The profile',
  served: 'How it is served',
  goesWith: 'What it goes with',
  firstPicks: 'First picks',
  secondFor: 'Also the second choice for',
  pouredOn: 'Poured on',
  floor: 'On the floor',
  confirm: 'To confirm at lineup',
  disagree: 'Two sources disagree',
  mixUp: 'Not to be confused with',
  more: 'More notes',
  earlier: 'Earlier answers',
  eyebrow: 'Your words. Allergens: confirm at lineup.',
  noteNone: 'No service note yet. Ask at lineup.',
  here: 'In this app',
  rooms: 'In the other rooms',
  offlineRoom: '(open the {room} once online and it stays with you offline)',
  cardsThis: 'Flash cards for this',
  hers: 'Her lines here are not kept yet. Edit to look them over.',
  prev: 'Previous: {name}',
  next: 'Next: {name}',
  got: 'Got it', again: 'Again',
  count: 'Got it {g} \u00b7 Again {a}',
  done: 'Deck complete',
  againDeck: 'Again: the {n} you marked',
  shuffle: 'Shuffle again',
  close: 'Close the deck',
  front: 'Say the ten second line aloud, then flip.',
  flip: 'Flip',
  cardOf: 'Card {i} of {n}',
  listLine: 'By the glass, as the house menus print it: {n} wines, {p} with a glass price and {t} poured on the tastings. The full bottle list is not in the guide.',
  listMenuBottles: 'Bottles the menus print: {b}, half bottles, large formats and the Bubbles rosés among them.',
  listBottles: 'From the bottle list: {b} bottles verified online on {date}, not the whole list; confirm with the sommelier before offering one.',
  own: 'Your own',
  deckNone: 'No wine here has a kept ten second line or kept parts yet, so there is no card to deal.',
  drillNone: 'Nothing kept to drill yet: keep a first pick, a serve line or a goes with on the list.',
  rowOpen: 'Open',
  verified: 'Verified online on {date}.',
  grapeCards: 'Open {grape} in the grape cards',
  atlas: 'Open the Terroir Atlas',
  chapter: 'Read {cat}, a chapter at {level}',
  map: 'See {sheet} on the World Map',
  producer: 'Open {name} in The Producers',
  guest: 'Play it in Guest at the table',
  zeroWith: '{drink}, without alcohol with the {dish}',
  houseWords: 'The house\'s words',
  atTable: 'At the table',
  grapesHead: 'The grapes',
  regionHead: 'The region',
  houseDoor: 'The house: must-knows, words and the table',
  drinksRoom: 'The drinks across, in the Ledger',
  structure: 'Structure', tell: 'The tell', confuse: 'Not to be confused with',
  climate: 'Climate', soil: 'Soil', note: 'Note',
  askWhom: 'Ask the {who}.',
  noHouse: 'No house yet. Import a pack, or start one.'
};

function v28W(key, vars) {
  var s = V28_WORDS[key] || '';
  if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(String(vars[k])); });
  return s;
}

/* Every field quoted verbatim from the Codex's own reference data (a grape's
   structure line, a Terroir note, a chapter's name) passes through here, so
   a gate can hold this file's own words to its rule and leave the quoted
   text to the sweep that already holds it. */
var V28_QUOTE = function (s) { return v28Esc(s); };

/* =========== helpers =========== */

function v28Esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function v28House() {
  try { return (typeof v27Current === 'function') ? v27Current() : null; } catch (e) { return null; }
}

function v28Kept(m) { return !!(m && typeof m === 'object' && m.by === 'person' && m.value !== undefined && m.value !== null); }
function v28KV(item, field) { return item && v28Kept(item[field]) ? item[field].value : null; }
function v28Str(s) { return typeof s === 'string' ? s.trim() : ''; }
function v28Plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

var V28_TRANSLIT = { '\u00f8': 'o', '\u00e6': 'ae', '\u0153': 'oe', '\u00df': 'ss', '\u0142': 'l', '\u0111': 'd', '\u00f0': 'd', '\u00fe': 'th', '\u0131': 'i' };

/* The folding every match reads: accents off, the letters NFD does not split
   transliterated, curly quotes straight, lower case, & read as and, every
   run of anything else one space, and one space at each end so a whole word
   test is a plain indexOf. */
function v28Fold(s) {
  var t = String(s == null ? '' : s).toLowerCase();
  try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  t = t.replace(/[\u00f8\u00e6\u0153\u00df\u0142\u0111\u00f0\u00fe\u0131]/g, function (c) { return V28_TRANSLIT[c] || c; });
  t = t.replace(/[\u2018\u2019]/g, '\'').replace(/[\u201c\u201d]/g, '"').replace(/&/g, ' and ');
  t = t.replace(/[^a-z0-9]+/g, ' ').trim();
  return ' ' + t + ' ';
}

/* Where a name first stands in folded text as whole words (or with the
   plural s or es), or -1; a name under four letters never matches. */
function v28NameIn(hay, name) {
  var n = v28Fold(name).trim();
  if (n.length < 4) return -1;
  var at = -1;
  [' ' + n + ' ', ' ' + n + 's ', ' ' + n + 'es '].forEach(function (w) {
    var i = hay.indexOf(w);
    if (i >= 0 && (at < 0 || i < at)) at = i;
  });
  return at;
}

function v28Upper(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function v28FirstSentence(s) {
  var t = v28Str(s);
  var m = t.match(/^[\s\S]*?[.!?](\s|$)/);
  return m ? m[0].trim() : t;
}

function v28Paras(s) {
  return String(s == null ? '' : s).split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean)
    .map(function (p) { return '<p>' + v28Esc(p) + '</p>'; }).join('');
}

function v28Grapes(item) {
  if (!item) return [];
  if (Array.isArray(item.grapes)) return item.grapes.filter(function (g) { return typeof g === 'string' && g.trim(); });
  return String(item.grapes || '').split(/[,/]/).map(function (g) { return g.trim(); }).filter(Boolean);
}

function v28Date(iso) {
  if (!iso) return '';
  try {
    return new Date(String(iso).slice(0, 10) + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  } catch (e) { return String(iso); }
}

function v28Online() {
  try { return !(typeof navigator !== 'undefined' && navigator && navigator.onLine === false); } catch (e) { return true; }
}

/* =========== the house's items =========== */

function v28Wines(h) {
  return (h && Array.isArray(h.wines) ? h.wines : []).filter(function (w) { return w && typeof w.id === 'string' && typeof w.name === 'string' && w.name; });
}
function v28IsBottle(w) { return !!(w && w.list === 'bottle'); }
function v28Find(list, id) {
  var hit = null;
  (Array.isArray(list) ? list : []).some(function (x) { if (x && x.id === id) { hit = x; return true; } return false; });
  return hit;
}
function v28Dish(h, id) { return h ? v28Find(h.dishes, id) : null; }
function v28Drink(h, id) { return h ? v28Find(h.cocktails, id) : null; }

/* The wines this wing studies: the house's own, in the pack's order. */
function v28StudyOn() {
  if (S && S._v28edit) return false;
  return v28Wines(v28House()).length > 0;
}

/* =========== the short line and the price =========== */

var V28_STOP = { the: 1, a: 1, an: 1, our: 1, from: 1, by: 1, 'in': 1 };

function v28ShortLine(item) {
  if (!item) return '';
  var lines = v28KV(item, 'lines') || {};
  var s10 = v28Str(lines.s10);
  if (s10) {
    var cut = s10.search(/[:,]/);
    if (cut > 0) {
      var clause = s10.slice(0, cut);
      var rest = s10.slice(cut + 1).trim();
      var fc = v28Fold(clause).trim();
      var fn = v28Fold(item.name).trim();
      var strip = rest && (fc === fn || fc === 'the ' + fn);
      if (!strip && rest && item.kind !== 'dish' && item.kind !== 'cocktail') {
        var join = v28Fold([item.name, item.producer, item.wine, item.region, v28Grapes(item).join(' ')].join(' '));
        strip = fc.split(' ').every(function (w) { return !w || V28_STOP[w] || join.indexOf(' ' + w + ' ') >= 0; });
      }
      if (strip) return v28Upper(rest);
    }
    return s10;
  }
  var guest = v28Str(v28KV(item, 'guest'));
  if (guest) return v28FirstSentence(guest);
  return v28Str(item.style);
}

/* Which tastings pour a wine, with the pour as printed. */
function v28Pours(h, id) {
  var out = [];
  (h && Array.isArray(h.tastings) ? h.tastings : []).forEach(function (t) {
    (t && Array.isArray(t.courses) ? t.courses : []).forEach(function (c) {
      if (c && c.pourId === id) out.push({ tasting: t, course: c });
    });
  });
  return out;
}

/* The one rule for a printed price: each string exactly as the house holds
   it, once when every meal prints the same, and for a wine never a meal
   label (the string already names its measure). */
function v28PriceLine(item, h) {
  if (!item) return '';
  var prices = (Array.isArray(item.prices) ? item.prices : []).filter(function (p) { return p && v28Str(p.printed); });
  if (prices.length) {
    var first = v28Str(prices[0].printed);
    if (prices.every(function (p) { return v28Str(p.printed) === first; })) return first;
    if (item.kind === 'wine') return prices.map(function (p) { return v28Str(p.printed); }).join(' \u00b7 ');
    return prices.map(function (p) { return (v28Str(p.meal) ? v28Str(p.meal) + ' ' : '') + v28Str(p.printed); }).join(' \u00b7 ');
  }
  var pours = v28Pours(h, item.id);
  if (pours.length) {
    var names = [];
    pours.forEach(function (p) { var n = v28Str(p.tasting.name); if (n && names.indexOf(n) < 0) names.push(n); });
    var measure = Array.isArray(item.pours) && item.pours.length ? v28Str(item.pours[0]) : '';
    return 'Poured on the ' + names.join(' and the ') + (measure ? ', ' + measure : '');
  }
  return '';
}

/* True when the house printed a price for this item. */
function v28Printed(item) {
  return (item && Array.isArray(item.prices) ? item.prices : []).some(function (p) { return p && v28Str(p.printed); });
}

/* A bottle of the person's own, from the list row's fields. */
function v28RowPrice(r) {
  var bits = [];
  if (v28Str(r.glass)) bits.push(v28Str(r.glass) + ' glass');
  if (v28Str(r.bottle)) bits.push(v28Str(r.bottle) + ' bottle');
  return bits.join(' \u00b7 ');
}

/* =========== notes, lines and parts =========== */

function v28NotesFor(item) {
  var kept = (item && Array.isArray(item.kept) ? item.kept : []).filter(function (n) { return n && typeof n.q === 'string' && typeof n.a === 'string'; });
  var newestFirst = kept.slice().sort(function (a, b) { return (Number(b.ts) || 0) - (Number(a.ts) || 0); });
  var fixed = [V28_ABOUT_Q].concat(V28_COACH);
  var taken = [];
  var pick = function (q) {
    var hit = null;
    newestFirst.some(function (n) { if (n.q.trim() === q) { hit = n; return true; } return false; });
    if (hit) taken.push(hit);
    return hit;
  };
  var about = pick(V28_ABOUT_Q);
  var coaching = [];
  V28_COACH.forEach(function (q) { var n = pick(q); if (n) coaching.push({ q: q, note: n }); });
  var earlier = [], more = [];
  newestFirst.forEach(function (n) {
    if (taken.indexOf(n) >= 0) return;
    if (fixed.indexOf(n.q.trim()) >= 0) earlier.push(n); else more.push(n);
  });
  return { about: about, coaching: coaching, more: more, earlier: earlier };
}

function v28LinesShown(item) {
  var l = v28KV(item, 'lines') || {};
  var s20 = v28Str(l.s20);
  var guest = v28Str(v28KV(item, 'guest'));
  return { s10: v28Str(l.s10), s20: s20, s45: v28Str(l.s45), guest: guest, guestShown: !!guest && guest !== s20 };
}

var V28_PART_KEYS = ['main', 'technique', 'sauce', 'sides', 'taste'];
function v28PartLabels() {
  try { if (typeof v27WineParts === 'function') return v27WineParts(); } catch (e) { }
  return { main: 'grape and region', technique: 'how it is made', sauce: 'the profile', sides: 'what it goes with', taste: 'how it tastes' };
}

/* The kept parts in order, empty ones left out; a part already contained in
   the field the card shows in its own block is left out too. */
function v28PartsShown(item) {
  var p = v28KV(item, 'parts');
  if (!p || typeof p !== 'object') return [];
  var labels = v28PartLabels();
  var profile = v28Fold(v28KV(item, 'profile') || '');
  var goes = v28Fold(v28KV(item, 'goesWith') || '');
  var out = [];
  V28_PART_KEYS.forEach(function (k) {
    var v = v28Str(p[k]);
    if (!v) return;
    var f = v28Fold(v);
    if (k === 'sauce' && profile.trim() && profile.indexOf(f) >= 0) return;
    if (k === 'sides' && goes.trim() && goes.indexOf(f) >= 0) return;
    out.push([labels[k] || k, v]);
  });
  return out;
}

/* Her marks nobody kept, on one wine. */
var V28_MARKS = ['say', 'guest', 'why', 'pairs', 'origin', 'profile', 'goesWith', 'firstPickIds', 'serve', 'parts', 'lines'];
function v28HasHers(item) {
  return !!item && V28_MARKS.some(function (k) { var m = item[k]; return !!(m && typeof m === 'object' && m.by && m.by !== 'person' && m.value != null); });
}

/* =========== rows, sections, the shift filter, the search =========== */

var V28_OWN_SEC = 'Your own';
var V28_BOTTLE_CHIP = '#bottles';

function v28Rows() {
  var h = v28House();
  var rows = [];
  var ids = {};
  v28Wines(h).forEach(function (w) {
    ids[w.id] = 1;
    rows.push({
      id: w.id, name: w.name, section: v28Str(w.section) || 'The list', item: w, row: null,
      bottle: v28IsBottle(w), own: false, price: v28PriceLine(w, h), line: v28ShortLine(w)
    });
  });
  ((typeof ST !== 'undefined' && ST && ST.cellar) || []).forEach(function (r) {
    if (!r || !r.id || ids[r.id]) return;
    var name = (typeof bottleLabel === 'function') ? bottleLabel(r) : [r.producer, r.name, r.vintage].filter(Boolean).join(' ');
    rows.push({ id: r.id, name: name, section: V28_OWN_SEC, item: null, row: r, bottle: false, own: true, price: v28RowPrice(r), line: v28Str(r.style) || v28Str(r.note) });
  });
  return rows;
}

function v28MealNames(h, rows) {
  var names = [];
  (h && Array.isArray(h.meals) ? h.meals : []).forEach(function (m) {
    var n = typeof m === 'string' ? m : (m && m.name);
    if (typeof n === 'string' && n && names.indexOf(n) < 0) names.push(n);
  });
  return names.filter(function (n) {
    return rows.some(function (r) { return r.item && Array.isArray(r.item.meals) && r.item.meals.indexOf(n) >= 0; });
  });
}

var V28_MEAL_KEY = 'oot-study-meal-v1';
function v28Meal(names) {
  var m = '';
  try { m = (typeof localStorage !== 'undefined' && localStorage) ? (localStorage.getItem(V28_MEAL_KEY) || '') : ''; } catch (e) { m = ''; }
  return names.indexOf(m) >= 0 ? m : '';
}
function v28SetMeal(m) {
  try { if (typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(V28_MEAL_KEY, m || ''); } catch (e) { }
}

function v28InMeal(r, meal) {
  if (!meal || !r.item) return true;
  var ms = Array.isArray(r.item.meals) ? r.item.meals : [];
  return !ms.length || ms.indexOf(meal) >= 0;
}

function v28Hay(r) {
  var w = r.item || r.row || {};
  var l = v28KV(w, 'lines') || {};
  return v28Fold([r.name, r.section, l.s10, w.producer, w.wine || (r.row ? r.row.name : ''), w.vintage, w.region, v28Grapes(w).join(' '), w.style].join(' '));
}

function v28Tokens(q) { return v28Fold(q).trim().split(' ').filter(Boolean); }
function v28Matches(hay, tokens) { return tokens.every(function (t) { return hay.indexOf(t) >= 0; }); }

function v28State() {
  if (!S._v28) S._v28 = { q: '', sec: '', open: null, y: 0, pushed: false, focus: '' };
  return S._v28;
}

/* The rows the header's meal leaves, in order: the glass list, then the
   bottles, then the person's own. */
function v28MealRows(rows, meal) {
  var keep = rows.filter(function (r) { return v28InMeal(r, meal); });
  return keep.filter(function (r) { return !r.bottle && !r.own; })
    .concat(keep.filter(function (r) { return r.bottle; }))
    .concat(keep.filter(function (r) { return r.own; }));
}

function v28Sections(rows) {
  var order = [], by = {};
  rows.forEach(function (r) {
    if (r.bottle) return;
    if (!by[r.section]) { by[r.section] = 0; order.push(r.section); }
    by[r.section]++;
  });
  return order.map(function (s) { return { section: s, count: by[s] }; });
}

/* What is shown: the meal, then the chip, then the search. */
function v28Shown(all, st) {
  var rows = all;
  if (st.sec === V28_BOTTLE_CHIP) rows = rows.filter(function (r) { return r.bottle; });
  else if (st.sec) rows = rows.filter(function (r) { return !r.bottle && r.section === st.sec; });
  var tokens = v28Tokens(st.q);
  if (tokens.length) rows = rows.filter(function (r) { return v28Matches(v28Hay(r), tokens); });
  return rows;
}

/* The house's other two kinds, under the same search: at most five. */
function v28Elsewhere(h, q) {
  var tokens = v28Tokens(q);
  if (!h || !tokens.length) return [];
  var out = [];
  (Array.isArray(h.dishes) ? h.dishes : []).forEach(function (d) {
    if (!d || !d.name || out.length >= 5) return;
    var l = v28KV(d, 'lines') || {};
    if (v28Matches(v28Fold([d.name, d.section, l.s10, d.description, Array.isArray(d.ingredients) ? d.ingredients.join(' ') : d.ingredients].join(' ')), tokens)) out.push({ room: 'table', id: d.id, name: d.name });
  });
  (Array.isArray(h.cocktails) ? h.cocktails : []).forEach(function (c) {
    if (!c || !c.name || out.length >= 5) return;
    var l = v28KV(c, 'lines') || {};
    var spec = Array.isArray(c.spec) ? c.spec.join(' ') : c.spec;
    if (v28Matches(v28Fold([c.name, c.section, l.s10, spec, c.family, c.spirit].join(' ')), tokens)) out.push({ room: 'ledger', id: c.id, name: c.name });
  });
  return out;
}

/* =========== records, progress, the weak ones =========== */

/* The newest verdict on one wine from the Codex's own records: again when
   any h-<id>- key, under any rank prefix, holds a wrong answer and no
   streak; else got it when anything was answered. */
function v28Latest(id) {
  var q = (typeof ST !== 'undefined' && ST && ST.q) ? ST.q : {};
  var pre = 'h-' + id + '-';
  var any = false, again = false;
  Object.keys(q).forEach(function (k) {
    var bare = k.indexOf('|') > -1 ? k.slice(k.indexOf('|') + 1) : k;
    if (bare.indexOf(pre) !== 0) return;
    var r = q[k] || {};
    if ((Number(r.c) || 0) + (Number(r.w) || 0) > 0) any = true;
    if ((Number(r.w) || 0) > 0 && !(Number(r.s) || 0)) again = true;
  });
  return again ? 'again' : (any ? 'got' : null);
}

function v28Progress(ids) {
  var out = { total: ids.length, studied: 0, got: 0, again: 0, againIds: [] };
  ids.forEach(function (id) {
    var v = v28Latest(id);
    if (!v) return;
    out.studied++;
    if (v === 'again') { out.again++; out.againIds.push(id); } else out.got++;
  });
  return out;
}

/* =========== the cards =========== */

function v28CardOf(item, h) {
  if (!item || v28IsBottle(item)) return null;
  var l = v28LinesShown(item);
  var parts = v28PartsShown(item);
  var allParts = v28KV(item, 'parts');
  var hasParts = !!allParts && V28_PART_KEYS.some(function (k) { return v28Str(allParts[k]); });
  if (!l.s10 && !hasParts) return null;
  var picks = (v28KV(item, 'firstPickIds') || []).map(function (id) { var d = v28Dish(h, id); return d ? d.name : ''; }).filter(Boolean);
  return {
    itemId: item.id, kind: 'wine', name: item.name, section: v28Str(item.section),
    back: { s10: l.s10, parts: parts.length ? parts : [], pairs: picks.length ? [[v28W('firstPicks'), picks.join(', ')]] : [], say: v28Str(v28KV(item, 'say')), price: v28PriceLine(item, h) }
  };
}

/* The ids a scope deals, in the list's order, each a house wine with a card. */
function v28DeckIds(scope) {
  var h = v28House();
  var meal = v28Meal(v28MealNames(h, v28Rows()));
  var wines = v28Wines(h).filter(function (w) { return !v28IsBottle(w) && v28CardOf(w, h); });
  if (scope && scope.itemIds) {
    var want = scope.itemIds;
    return wines.filter(function (w) { return want.indexOf(w.id) >= 0; }).map(function (w) { return w.id; });
  }
  if (!(scope && scope.keepMeal === false)) wines = wines.filter(function (w) { return v28InMeal({ item: w }, meal); });
  if (scope && scope.section) wines = wines.filter(function (w) { return v28Str(w.section) === scope.section; });
  return wines.map(function (w) { return w.id; });
}

/* =========== the links in this app =========== */

function v28GrapeProfiles(item) {
  var out = [];
  var pools = [];
  if (typeof GRAPES !== 'undefined' && Array.isArray(GRAPES)) pools.push({ list: GRAPES, flash: true });
  if (typeof GRAPES_PLUS !== 'undefined' && Array.isArray(GRAPES_PLUS)) pools.push({ list: GRAPES_PLUS, flash: false });
  v28Grapes(item).forEach(function (g) {
    var f = v28Fold(g);
    var hit = null;
    pools.some(function (p) {
      return p.list.some(function (x, i) {
        if (x && typeof x.g === 'string' && v28Fold(x.g) === f) { hit = { p: x, flash: p.flash, idx: i }; return true; }
        return false;
      });
    });
    if (hit && !out.some(function (o) { return o.p === hit.p; })) out.push(hit);
  });
  return out;
}

function v28Terroir(item) {
  var out = [];
  var region = item && (item.region || '');
  if (!region || typeof TERROIR === 'undefined' || !Array.isArray(TERROIR)) return out;
  var hay = v28Fold(region);
  var parts = String(region).split(',').map(function (p) { return v28Fold(p); });
  TERROIR.forEach(function (c) {
    (c && Array.isArray(c.regions) ? c.regions : []).forEach(function (r) {
      if (!r || typeof r.r !== 'string') return;
      var f = v28Fold(r.r);
      if (parts.indexOf(f) >= 0 || v28NameIn(hay, r.r) >= 0) out.push({ country: c.country, r: r });
    });
  });
  return out;
}

function v28LevelName() {
  try { if (typeof v25Here === 'function') return v25Here().name; } catch (e) { }
  return 'this level';
}

/* The chapter at the current level whose name stands in the region, earliest
   in the region first; failing that, the section the map data names for a
   region that stands in it. */
function v28Primer(item) {
  var region = item && item.region;
  if (!region || typeof PRIMERS === 'undefined' || !Array.isArray(PRIMERS)) return null;
  var hay = v28Fold(region);
  var best = null;
  PRIMERS.forEach(function (p, i) {
    if (!p) return;
    var name = typeof p.cat === 'string' ? p.cat : '';
    if (!name) return;
    var at = v28NameIn(hay, name);
    if (at >= 0 && (!best || at < best.at)) best = { at: at, name: name, key: typeof p.cat === 'string' ? p.cat : i };
  });
  if (best) return best;
  /* the Regionale chapters carry no category; the home's own map names them */
  if (typeof V25_INTRO_CHAPTERS !== 'undefined' && V25_INTRO_CHAPTERS) {
    Object.keys(V25_INTRO_CHAPTERS).forEach(function (cat) {
      var at = v28NameIn(hay, cat);
      if (at < 0 || (best && at >= best.at)) return;
      var idx = -1;
      PRIMERS.forEach(function (p, i) { if (idx < 0 && p && typeof p.cat !== 'string' && p.id === V25_INTRO_CHAPTERS[cat]) idx = i; });
      if (idx >= 0) best = { at: at, name: cat, key: idx };
    });
    if (best) return best;
  }
  if (typeof MAP_REGION_SEC !== 'undefined' && MAP_REGION_SEC) {
    var sec = null;
    Object.keys(MAP_REGION_SEC).some(function (k) { if (v28NameIn(hay, k) >= 0) { sec = MAP_REGION_SEC[k]; return true; } return false; });
    if (sec) {
      var hit = null;
      PRIMERS.forEach(function (p) { if (!hit && p && p.cat === sec) hit = { at: 0, name: sec, key: sec }; });
      return hit;
    }
  }
  return null;
}

/* A map sheet on this device that holds the wine's region. */
function v28Map(item, terroir) {
  var region = item && item.region;
  if (!region || typeof v25MapSheets !== 'function' || typeof mapRegions !== 'function') return null;
  var have = [];
  try { have = v25MapSheets() || []; } catch (e) { have = []; }
  var hay = v28Fold(region);
  var tnames = (terroir || []).map(function (t) { return t.r.r; });
  var hit = null;
  have.some(function (s) {
    var rows = [];
    try { rows = mapRegions(s.id) || []; } catch (e) { rows = []; }
    var found = rows.some(function (r) {
      var n = r && (r.n || r.name);
      if (typeof n !== 'string') return false;
      if (v28NameIn(hay, n) >= 0) return true;
      var tm = (typeof MAP_REGION_TERROIR !== 'undefined' && MAP_REGION_TERROIR && MAP_REGION_TERROIR[n]) || [];
      return tm.some(function (t) { return tnames.indexOf(t) >= 0; });
    });
    if (found) { hit = s; return true; }
    return false;
  });
  return hit;
}

function v28Producer(item) {
  var prod = item && v28Str(item.producer);
  if (!prod || typeof WINE_PRODUCERS === 'undefined' || !Array.isArray(WINE_PRODUCERS)) return null;
  var f = v28Fold(prod);
  var hit = null;
  WINE_PRODUCERS.some(function (r) {
    if (!r || typeof r.p !== 'string' || String(r.id || '').indexOf('w-') === 0) return false;
    var rp = v28Fold(r.p);
    if (rp === f || (f.trim().length >= 6 && v28NameIn(rp, prod) >= 0)) { hit = r; return true; }
    return false;
  });
  return hit;
}

/* =========== the other rooms =========== */

var V28_SUITE = false;
var V28_ROOMS = { table: null, ledger: null };
var V28_ROOM_NAME = { table: 'Table', ledger: 'Ledger' };

function v28RoomHref(room, id) {
  if (!V28_SUITE || !id) return '';
  var h = v28House();
  if (!h) return '';
  if (room === 'table' && /^d-[a-z0-9]{8}$/.test(id) && v28Dish(h, id)) return '/table/menu#' + id;
  if (room === 'ledger' && /^b-[a-z0-9]{8}$/.test(id) && v28Drink(h, id)) return '/ledger/#drink=' + id;
  return '';
}

/* A name as a link into its room, or plain words with the offline note. */
function v28RoomName(room, id, name) {
  var href = v28RoomHref(room, id);
  if (!href) return v28Esc(name);
  if (v28Online() || V28_ROOMS[room] === true) return '<a class="v28-link" href="' + v28Esc(href) + '">' + v28Esc(name) + '</a>';
  return v28Esc(name) + ' <span class="v28-soft">' + v28Esc(v28W('offlineRoom', { room: V28_ROOM_NAME[room] })) + '</span>';
}

function v28RoomsCheck() {
  try {
    if (!V28_SUITE || typeof caches === 'undefined' || !caches || typeof caches.match !== 'function') return;
    var ask = function (room, urls) {
      var i = 0;
      var next = function () {
        if (i >= urls.length) { V28_ROOMS[room] = false; return null; }
        var u = urls[i++];
        return Promise.resolve(caches.match(u, { ignoreSearch: true })).then(function (res) {
          if (res) { V28_ROOMS[room] = true; return true; }
          return next();
        });
      };
      return next();
    };
    Promise.all([ask('table', ['/table/shell.html']), ask('ledger', ['/ledger/index.html', '/ledger/'])]).then(function () {
      if (!v28Online() && S && S.view === 'cellar') { try { render(); } catch (e) { } }
    }).catch(function () { });
  } catch (e) { }
}

/* =========== the study view =========== */

function v28RowHtml(r, againIds) {
  var tags = '';
  if (r.item && r.item.signature) tags += '<span class="v28-tag">Signature</span>';
  if (againIds.indexOf(r.id) >= 0) tags += '<span class="v28-tag">Again</span>';
  /* a price is a tag at the right; a sentence (a pour on the tastings) is a line of its own */
  var tag = r.price && r.price.length <= 18;
  return '<button type="button" class="v28-row" data-v28="open" data-id="' + v28Esc(r.id) + '">'
    + '<span class="v28-rowtop"><span class="v28-name">' + tags + v28Esc(r.name) + '</span>'
    + (tag ? '<span class="lvltag v28-price">' + v28Esc(r.price) + '</span>' : '') + '</span>'
    + (r.price && !tag ? '<span class="v28-pour">' + v28Esc(r.price) + '</span>' : '')
    + (r.line ? '<span class="v28-short">' + v28Esc(r.line) + '</span>' : '')
    + '</button>';
}

function v28RowsHtml(all, st, prog, h) {
  var shown = v28Shown(all, st);
  var html = '';
  var cur = null;
  shown.forEach(function (r) {
    var sec = r.section;
    if (sec !== cur) {
      cur = sec;
      var n = shown.filter(function (x) { return x.section === sec && x.bottle === r.bottle; }).length;
      var deckable = !r.own && !r.bottle && v28DeckIds({ section: sec }).length > 0;
      html += '<div class="v28-sechead"><h3 class="secgroup">' + v28Esc(sec) + ' \u00b7 ' + n + '</h3>'
        + (deckable ? '<button type="button" class="btn small ghost" data-v28="cards" data-s="' + v28Esc(sec) + '">' + v28W('cards') + '</button>' : '')
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
}

function v28LiveText(all, st) {
  var shown = v28Shown(all, st);
  if (v28Str(st.q)) return shown.length ? v28W('searchHits', { n: shown.length, query: st.q }) : v28W('searchNone', { query: st.q });
  var sec = st.sec === V28_BOTTLE_CHIP ? 'the bottles' : (st.sec || 'the whole list');
  return v28W('showing', { section: sec, n: shown.length, unit: shown.length === 1 ? 'wine' : 'wines' });
}

/* A wine the menus print only by the bottle (a half bottle, a magnum, a
   Bubbles rosé): a bottle price and no glass price. Counted apart, so the
   glass sentence counts glasses. */
function v28MenuBottle(w) { return !!(w && !v28IsBottle(w) && !v28Str(w.glass) && v28Str(w.bottle)); }

function v28ListSentence(h, all) {
  var menuBottles = v28Wines(h).filter(v28MenuBottle);
  var glass = v28Wines(h).filter(function (w) { return !v28IsBottle(w) && !v28MenuBottle(w); });
  var priced = glass.filter(function (w) { return (Array.isArray(w.prices) ? w.prices : []).some(function (p) { return p && v28Str(p.printed); }); }).length;
  var poured = glass.filter(function (w) {
    var hasPrice = (Array.isArray(w.prices) ? w.prices : []).some(function (p) { return p && v28Str(p.printed); });
    return !hasPrice && v28Pours(h, w.id).length > 0;
  }).length;
  var s = v28W('listLine', { n: glass.length, p: priced, t: poured });
  if (menuBottles.length) s = s.replace(' The full bottle list', ' ' + v28W('listMenuBottles', { b: menuBottles.length }) + ' The full bottle list');
  var bottles = v28Wines(h).filter(v28IsBottle);
  if (bottles.length) {
    var on = '';
    bottles.some(function (b) { if (b.verifiedOn) { on = b.verifiedOn; return true; } return false; });
    s = s.replace(' The full bottle list is not in the guide.', ' ' + v28W('listBottles', { b: bottles.length, date: v28Date(on) || 'the date it was checked' }));
  }
  return s;
}

function v28StudyHtml() {
  var h = v28House();
  var st = v28State();
  var rows = v28Rows();
  var meals = v28MealNames(h, rows);
  var meal = v28Meal(meals);
  var all = v28MealRows(rows, meal);
  var deck = v28DeckIds({});
  var prog = v28Progress(deck);
  var date = v28Date(h && h.menusReadOn);
  var html = '<div class="v28" id="v28">';
  html += '<div class="viewhead v28-head"><div class="v28-headrow"><h2>Our List</h2>'
    + '<button type="button" class="v28-switch" data-v28="editall">' + v28W('editSwitch') + '</button></div>'
    + '<div class="sub">' + v28Esc((h && h.name) || '') + (date ? ' \u00b7 ' + v28Esc(v28W('read', { date: date })) : '') + '</div></div>';
  html += '<p class="v28-lede">' + v28Esc(v28ListSentence(h, all)) + '</p>';
  html += '<div class="v28-progrow"><p class="v28-progress">' + v28Esc(prog.studied ? v28W('progress', prog) : v28W('progressNone')) + '</p>';
  if (meals.length) {
    html += '<div class="v28-meals" role="group" aria-label="The shift">'
      + [''].concat(meals).map(function (m) {
        return '<button type="button" class="v28-chip" data-v28="meal" data-m="' + v28Esc(m) + '" aria-pressed="' + (m === meal ? 'true' : 'false') + '">'
          + v28Esc(m || v28W('allDay')) + '</button>';
      }).join('') + '</div>';
  }
  html += '</div>';
  html += '<div class="v28-actions">'
    + (deck.length ? '<button type="button" class="btn small gold" data-v28="cards">' + v28W('cards') + '</button>' : '')
    + '<button type="button" class="btn small ghost" data-v28="weak"' + (prog.againIds.length ? '' : ' disabled') + '>'
      + (prog.againIds.length ? v28W('weak', { n: prog.againIds.length }) : v28W('weakNone')) + '</button>'
    + '<button type="button" class="btn small ghost" data-v28="drill">' + v28W('drillList') + '</button>'
    + (typeof v27OpenSay === 'function' ? '<button type="button" class="btn small ghost" data-v28="sayopen">' + v28W('sayPour') + '</button>' : '')
    + '</div>';
  var secs = v28Sections(all);
  var bottles = all.filter(function (r) { return r.bottle; }).length;
  html += '<div class="v28-bar"><div class="v28-find"><label class="sr-only" for="v28-q">' + v28W('findWine') + '</label>'
    + '<input id="v28-q" class="sainput v28-q" type="search" autocomplete="off" spellcheck="false" placeholder="' + v28W('findWine') + '" value="' + v28Esc(st.q) + '"></div>'
    + '<div class="v28-chips" role="group" aria-label="Sections of the list">'
    + '<button type="button" class="v28-chip" data-v28="sec" data-s="" aria-pressed="' + (!st.sec ? 'true' : 'false') + '">' + v28W('all', { n: all.length }) + '</button>'
    + secs.map(function (s) {
      return '<button type="button" class="v28-chip" data-v28="sec" data-s="' + v28Esc(s.section) + '" aria-pressed="' + (st.sec === s.section ? 'true' : 'false') + '">'
        + v28Esc(s.section) + ' ' + s.count + '</button>';
    }).join('')
    + (bottles ? '<button type="button" class="v28-chip" data-v28="sec" data-s="' + V28_BOTTLE_CHIP + '" aria-pressed="' + (st.sec === V28_BOTTLE_CHIP ? 'true' : 'false') + '">' + v28W('bottles', { n: bottles }) + '</button>' : '')
    + '</div></div>';
  html += '<div id="v28-live" class="sr-only" role="status" aria-live="polite">' + v28Esc(v28LiveText(all, st)) + '</div>';
  html += '<div id="v28-rows" class="v28-rows">' + v28RowsHtml(all, st, prog, h) + '</div>';
  var dishes = h && Array.isArray(h.dishes) ? h.dishes.length : 0;
  var drinks = h && Array.isArray(h.cocktails) ? h.cocktails.length : 0;
  if (dishes || drinks) {
    var d = v28Plural(dishes, 'dish', 'dishes'), k = v28Plural(drinks, 'drink', 'drinks');
    if (V28_SUITE && v28Online()) { d = '<a class="v28-link" href="/table/menu">' + d + '</a>'; k = '<a class="v28-link" href="/ledger/#/menu">' + k + '</a>'; }
    html += '<p class="v28-soft v28-also">' + v28W('alsoHouse', { dishes: d, drinks: k }) + '</p>';
  }
  if (v28HouseDoorOn()) {
    html += '<details class="v28-q v28-housedoor"><summary>' + v28W('houseDoor') + '</summary><div id="v28-houseread"></div></details>';
  }
  html += '</div>';
  return html;
}

/* The design's 2.1 door into the house's own lists (the must-knows, the
   words, at the table, the mix-ups, the tastings), read-only and kept-only.
   It opens the shared OOT.houseUI.readView with { study: true }, and stands
   only once that read view takes the option (a fourth parameter, or a study
   flag on houseUI): until then the shared screen draws Kept, Edit and Discard
   on every mark, which is the editing surface this view replaces. */
function v28HouseUI() {
  try { return (typeof OOT !== 'undefined' && OOT && OOT.houseUI && typeof OOT.houseUI.readView === 'function') ? OOT.houseUI : null; } catch (e) { return null; }
}
function v28HouseDoorOn() {
  var ui = v28HouseUI();
  if (!ui || !v28House() || typeof v27Hooks !== 'function') return false;
  return ui.study === true || ui.readView.length >= 4;
}
function v28HouseRead(root) {
  var ui = v28HouseUI();
  var h = v28House();
  if (!root || !ui || !h || root.getAttribute('data-drawn')) return false;
  try { ui.readView(root, h, v27Hooks(), { study: true }); root.setAttribute('data-drawn', '1'); return true; } catch (e) { return false; }
}

/* =========== the card =========== */

function v28Dl(pairs) {
  if (!pairs.length) return '';
  return '<dl class="v28-dl">' + pairs.map(function (p) { return '<dt>' + v28Esc(p[0]) + '</dt><dd>' + (p[2] ? p[1] : v28Esc(p[1])) + '</dd>'; }).join('') + '</dl>';
}

function v28Block(title, body) { return body ? '<section class="v28-block"><h3 class="secgroup">' + title + '</h3>' + body + '</section>' : ''; }

function v28Pick(r, list, dir) {
  var i = -1;
  list.some(function (x, j) { if (x.id === r.id) { i = j; return true; } return false; });
  if (i < 0) return null;
  return list[i + dir] || null;
}

/* The house's lineup asks, disputes, mix-ups, words, scenarios and tastings
   that name one wine. */
function v28Lineup(h, id) {
  var by = function (list, f) { return (h && Array.isArray(h[list]) ? h[list] : []).filter(function (x) { return x && f(x); }); };
  var has = function (x) { return Array.isArray(x.itemIds) && x.itemIds.indexOf(id) >= 0; };
  return {
    asks: by('askAtLineup', has),
    disputes: by('disputes', function (x) { return x.itemId === id || has(x); }),
    mixUps: by('mixUps', function (x) { return x.aId === id || x.bId === id; }),
    terms: by('lexicon', has),
    scenarios: by('scenarios', has),
    pours: v28Pours(h, id)
  };
}

function v28OtherName(h, id) {
  var w = v28Find(h && h.wines, id); if (w) return { kind: 'wine', name: w.name };
  var d = v28Dish(h, id); if (d) return { kind: 'dish', name: d.name };
  var c = v28Drink(h, id); if (c) return { kind: 'drink', name: c.name };
  return null;
}

function v28WineBlock(h, item, row) {
  var w = item || {};
  var r = row || {};
  var facts = [];
  var add = function (label, v) { if (v28Str(v)) facts.push([label, v28Str(v)]); };
  add('Producer', w.producer || r.producer);
  add('Wine', w.wine || r.name);
  add('Vintage', w.vintage || r.vintage);
  add('Region', w.region || r.region);
  add('Grapes', item ? v28Grapes(item).join(', ') : r.grapes);
  add('Style', w.style || r.style);
  if (item) {
    if (v28IsBottle(item)) {
      add('Bottle', v28PriceLine(item, h) || item.bottle);
    } else {
      var glass = v28PriceLine(item, h);
      var hasPrice = (Array.isArray(item.prices) ? item.prices : []).some(function (p) { return p && v28Str(p.printed); });
      if (hasPrice) add('By the glass', glass);
      else if (v28Pours(h, item.id).length) add('By the glass', 'Poured on the tastings');
      add('Bottle', v28Str(item.bottle) || v28W('bottleNone'));
    }
  } else {
    add('By the glass', r.glass);
    add('Bottle', r.bottle);
  }
  var html = v28Dl(facts);
  if (item && v28IsBottle(item) && item.verifiedOn) html += '<p class="v28-soft">' + v28Esc(v28W('verified', { date: v28Date(item.verifiedOn) })) + '</p>';
  if (!item) {
    if (v28Str(r.note)) html += '<p>' + v28Esc(r.note) + '</p>';
    return v28Block(v28W('wine'), html);
  }
  var profile = v28Str(v28KV(item, 'profile'));
  var serve = v28Str(v28KV(item, 'serve'));
  var goes = v28Str(v28KV(item, 'goesWith'));
  var pairs = v28Str(v28KV(item, 'pairs'));
  if (profile) html += '<h4 class="v28-eyebrow">' + v28W('profile') + '</h4><p>' + v28Esc(profile) + '</p>';
  if (serve) html += '<h4 class="v28-eyebrow">' + v28W('served') + '</h4><p>' + v28Esc(serve) + '</p>';
  if (goes || pairs) {
    html += '<h4 class="v28-eyebrow">' + v28W('goesWith') + '</h4>';
    if (goes) html += '<p>' + v28Esc(goes) + '</p>';
    if (pairs && v28Fold(pairs) !== v28Fold(goes)) html += '<p>' + v28Esc(pairs) + '</p>';
  }
  var picks = (v28KV(item, 'firstPickIds') || []).map(function (id) { return v28Dish(h, id); }).filter(Boolean);
  if (picks.length) {
    html += '<h4 class="v28-eyebrow">' + v28W('firstPicks') + '</h4><ul class="v28-list">' + picks.map(function (d) {
      var p = v28KV(d, 'pairing') || {};
      var say = p.wineId === item.id ? v28Str(p.sayIt) : '';
      return '<li>' + v28RoomName('table', d.id, d.name) + (say ? '<span class="v28-say">"' + v28Esc(say) + '"</span>' : '') + '</li>';
    }).join('') + '</ul>';
  }
  var seconds = (h && Array.isArray(h.dishes) ? h.dishes : []).filter(function (d) { var p = v28KV(d, 'pairing'); return p && p.secondId === item.id; });
  if (seconds.length) {
    html += '<h4 class="v28-eyebrow">' + v28W('secondFor') + '</h4><ul class="v28-list">' + seconds.map(function (d) {
      return '<li>' + v28RoomName('table', d.id, d.name) + '</li>';
    }).join('') + '</ul>';
  }
  var pours = v28Pours(h, item.id);
  if (pours.length) {
    html += '<h4 class="v28-eyebrow">' + v28W('pouredOn') + '</h4><ul class="v28-list">' + pours.map(function (p) {
      /* a dish the card already links above (a first pick or a second choice) is named here in plain words */
      var dishes = (Array.isArray(p.course.dishIds) ? p.course.dishIds : []).map(function (id) {
        var d = v28Dish(h, id);
        if (!d) return '';
        return (picks.indexOf(d) >= 0 || seconds.indexOf(d) >= 0) ? v28Esc(d.name) : v28RoomName('table', d.id, d.name);
      }).filter(Boolean);
      return '<li>' + v28Esc(v28Str(p.tasting.name)) + ', ' + v28Esc(v28Str(p.course.label) || ('course ' + p.course.n))
        + (v28Str(p.course.pourText) ? ', ' + v28Esc(p.course.pourText) : '') + (dishes.length ? ', with ' + dishes.join(' or ') : '') + '</li>';
    }).join('') + '</ul>';
  }
  return v28Block(v28W('wine'), html);
}

function v28FloorBlock(h, item) {
  if (v28IsBottle(item)) return v28Block(v28W('floor'), '<p>' + v28W('bottleConfirm') + '</p>');
  var notes = v28NotesFor(item);
  var lu = v28Lineup(h, item.id);
  var html = '';
  notes.coaching.forEach(function (c, i) {
    html += '<details class="v28-q"' + (i === 0 && c.q === V28_COACH[0] ? ' open' : '') + '><summary>' + v28Esc(c.q) + '</summary>' + v28Paras(c.note.a) + '</details>';
  });
  if (lu.asks.length) html += '<h4 class="v28-eyebrow">' + v28W('confirm') + '</h4><ul class="v28-list">' + lu.asks.map(function (a) {
    return '<li>' + v28Esc(v28Str(a.question)) + (v28Str(a.askWhom) ? ' <span class="v28-soft">' + v28Esc(v28W('askWhom', { who: a.askWhom })) + '</span>' : '') + '</li>';
  }).join('') + '</ul>';
  if (lu.disputes.length) html += '<h4 class="v28-eyebrow">' + v28W('disagree') + '</h4><ul class="v28-list">' + lu.disputes.map(function (d) {
    var side = function (x) { return x ? '"' + v28Esc(v28Str(x.text)) + '" (' + v28Esc([v28Str(x.source), v28Str(x.date)].filter(Boolean).join(', ')) + ')' : ''; };
    return '<li>' + (v28Str(d.field) ? v28Esc(v28Upper(d.field)) + ': ' : '') + side(d.a) + ' or ' + side(d.b) + '</li>';
  }).join('') + '</ul>';
  if (lu.mixUps.length) html += '<h4 class="v28-eyebrow">' + v28W('mixUp') + '</h4><ul class="v28-list">' + lu.mixUps.map(function (m) {
    var other = m.aId === item.id ? m.bId : m.aId;
    var o = v28OtherName(h, other);
    if (!o) return '';
    var name = o.kind === 'wine' ? '<button type="button" class="btn small ghost" data-v28="open" data-id="' + v28Esc(other) + '">' + v28Esc(o.name) + '</button>'
      : o.kind === 'dish' ? v28RoomName('table', other, o.name) : v28RoomName('ledger', other, o.name);
    var diff = v28Str(v28KV(m, 'difference'));
    return '<li>' + name + (diff ? '<span class="v28-say">' + v28Esc(diff) + '</span>' : '') + '</li>';
  }).join('') + '</ul>';
  if (notes.more.length) html += '<details class="v28-q"><summary>' + v28W('more') + ' (' + notes.more.length + ')</summary>'
    + notes.more.map(function (n) { return '<h4 class="v28-eyebrow">' + v28Esc(n.q) + '</h4>' + v28Paras(n.a); }).join('') + '</details>';
  if (notes.earlier.length) html += '<details class="v28-q"><summary>' + v28W('earlier') + ' (' + notes.earlier.length + ')</summary>'
    + notes.earlier.map(function (n) { return '<h4 class="v28-eyebrow">' + v28Esc(n.q) + '</h4>' + v28Paras(n.a); }).join('') + '</details>';
  return v28Block(v28W('floor'), html);
}

function v28HereBlock(h, item) {
  var html = '';
  var grapes = v28GrapeProfiles(item);
  if (grapes.length) {
    html += '<h4 class="v28-eyebrow">' + v28W('grapesHead') + '</h4>' + grapes.map(function (g) {
      var p = g.p;
      var rows = [];
      if (p.st) rows.push([v28W('structure'), V28_QUOTE(p.st), 1]);
      if (p.tell) rows.push([v28W('tell'), V28_QUOTE(p.tell), 1]);
      if (p.confuse) rows.push([v28W('confuse'), V28_QUOTE(p.confuse), 1]);
      return '<div class="v28-ref"><p class="v28-refname">' + V28_QUOTE(p.g) + '</p>' + v28Dl(rows)
        + (g.flash ? '<button type="button" class="btn small ghost" data-v28="grape" data-g="' + v28Esc(p.g) + '">' + v28W('grapeCards', { grape: V28_QUOTE(p.g) }) + '</button>' : '')
        + '</div>';
    }).join('');
  }
  var terroir = v28Terroir(item);
  if (terroir.length) {
    html += '<h4 class="v28-eyebrow">' + v28W('regionHead') + '</h4>' + terroir.map(function (t) {
      var rows = [];
      if (t.r.cl) rows.push([v28W('climate'), V28_QUOTE(t.r.cl), 1]);
      if (t.r.so) rows.push([v28W('soil'), V28_QUOTE(t.r.so), 1]);
      if (t.r.note) rows.push([v28W('note'), V28_QUOTE(t.r.note), 1]);
      return '<div class="v28-ref"><p class="v28-refname">' + V28_QUOTE(t.r.r) + '</p>' + v28Dl(rows) + '</div>';
    }).join('') + (typeof refView === 'function' ? '<button type="button" class="btn small ghost" data-v28="terroir" data-k="' + v28Esc(terroir[0].r.r) + '">' + v28W('atlas') + '</button>' : '');
  }
  var doors = [];
  var primer = v28Primer(item);
  if (primer) doors.push('<button type="button" class="btn small ghost" data-v28="primer" data-k="' + v28Esc(String(primer.key)) + '">'
    + v28W('chapter', { cat: V28_QUOTE(primer.name), level: v28Esc(v28LevelName()) }) + '</button>');
  var sheet = v28Map(item, terroir);
  if (sheet) doors.push('<button type="button" class="btn small ghost" data-v28="map" data-k="' + v28Esc(sheet.id) + '">' + v28W('map', { sheet: V28_QUOTE(sheet.name) }) + '</button>');
  var prod = v28Producer(item);
  if (prod) doors.push('<button type="button" class="btn small ghost" data-v28="producer" data-k="' + v28Esc(prod.id) + '">' + v28W('producer', { name: V28_QUOTE(prod.p) }) + '</button>');
  if (doors.length) html += '<div class="v28-btnrow v28-doors">' + doors.join('') + '</div>';
  var lu = v28Lineup(h, item.id);
  var terms = lu.terms.filter(function (t) { return t && t.term; });
  if (terms.length) html += '<h4 class="v28-eyebrow">' + v28W('houseWords') + '</h4><dl class="v28-dl">' + terms.map(function (t) {
    var say = v28Str(v28KV(t, 'say')), guest = v28Str(v28KV(t, 'toGuest'));
    return '<dt>' + v28Esc(t.term) + '</dt><dd>' + (say ? '<span class="v28-soft">' + v28Esc(say) + '</span> ' : '') + v28Esc(guest) + '</dd>';
  }).join('') + '</dl>';
  var scen = lu.scenarios.filter(function (s) { return s && (s.title || s.guest); });
  if (scen.length) html += '<h4 class="v28-eyebrow">' + v28W('atTable') + '</h4><ul class="v28-list">' + scen.map(function (s) {
    return '<li>' + v28Esc(v28Str(s.title) || v28Str(s.guest)) + (v28Str(s.guest) && v28Str(s.title) ? '<span class="v28-say">"' + v28Esc(s.guest) + '"</span>' : '')
      + (typeof v27OpenGuest === 'function' ? '<button type="button" class="btn small ghost" data-v28="guest" data-k="' + v28Esc(s.id) + '">' + v28W('guest') + '</button>' : '') + '</li>';
  }).join('') + '</ul>';
  return v28Block(v28W('here'), html);
}

/* The drinks across only: the dishes in the Table are already linked by the
   wine block's First picks and second choices (the design's 1.4 and 1.7), and
   a third list of the same names made the card a wall of links. */
function v28RoomsBlock(h, item) {
  var html = '';
  var drinks = [];
  (h && Array.isArray(h.dishes) ? h.dishes : []).forEach(function (d) {
    var p = v28KV(d, 'pairing');
    if (!p || p.wineId !== item.id || !p.zeroProofId) return;
    var c = v28Drink(h, p.zeroProofId);
    if (c) drinks.push({ c: c, d: d });
  });
  if (drinks.length) html += '<h4 class="v28-eyebrow">' + v28W('drinksRoom') + '</h4><ul class="v28-list">' + drinks.map(function (x) {
    return '<li>' + v28W('zeroWith', { drink: v28RoomName('ledger', x.c.id, x.c.name), dish: v28Esc(x.d.name) }) + '</li>';
  }).join('') + '</ul>';
  return v28Block(v28W('rooms'), html);
}

function v28CardHtml(id) {
  var h = v28House();
  var st = v28State();
  var rows = v28Rows();
  var meal = v28Meal(v28MealNames(h, rows));
  var list = v28Shown(v28MealRows(rows, meal), st);
  var r = v28Find(list, id) || v28Find(rows, id);
  if (!r) return '';
  if (!v28Find(list, id)) list = [r];
  var item = r.item;
  var inSec = list.filter(function (x) { return x.section === r.section && x.bottle === r.bottle; });
  var searching = !!v28Str(st.q);
  var pos = searching ? v28W('found', { i: list.indexOf(r) + 1, n: list.length })
    : v28W('position', { i: inSec.indexOf(r) + 1, n: inSec.length, section: r.section });
  var prev = v28Pick(r, list, -1), next = v28Pick(r, list, 1);
  var html = '<div class="v28 v28-card" id="v28-card">';
  html += '<div class="v28-cardnav"><button type="button" class="btn small ghost" data-v28="back">' + v28W('backList') + '</button>'
    + '<span class="v28-pos">' + v28Esc(pos) + '</span>'
    + (next ? '<button type="button" class="btn small ghost" data-v28="open" data-id="' + v28Esc(next.id) + '" data-step="1">' + v28W('nextOnly') + '</button>' : '')
    + '</div>';
  var brow = [r.section];
  if (item && item.signature) brow.push('Signature');
  html += '<p class="v28-eyebrow v28-top">' + v28Esc(brow.join(' \u00b7 ')) + '</p>';
  html += '<h2 class="v28-title" id="v28-h" tabindex="-1">' + v28Esc(r.name) + '</h2>';
  /* the row's rule: a tag only for a price (a printed one, or her own row's);
     a pour on the tastings is a sentence, a plain line, and says nothing of prices */
  var printed = item ? v28Printed(item) : !!r.price;
  if (r.price && printed) {
    html += '<p class="v28-price-line"><span class="lvltag">' + v28Esc(r.price) + '</span></p>';
    if (item && h && h.menusReadOn) html += '<p class="v28-soft">' + v28Esc(v28W('asPrinted', { date: v28Date(h.menusReadOn) })) + '</p>';
  } else if (r.price) html += '<p class="v28-pour">' + v28Esc(r.price) + '</p>';
  if (item) {
    var say = v28Str(v28KV(item, 'say'));
    if (say) html += '<p class="v28-eyebrow">' + v28W('say') + '</p><p class="v28-sayit">' + v28Esc(say) + '</p>';
    var l = v28LinesShown(item);
    if (l.s10) html += '<div class="card v28-tenbox"><p class="v28-eyebrow v28-ink">' + v28W('ten') + '</p><p class="v28-ten">' + v28Esc(l.s10) + '</p></div>';
    var picks = (v28KV(item, 'firstPickIds') || []).map(function (pid) { var d = v28Dish(h, pid); return d ? v28RoomName('table', d.id, d.name) : ''; }).filter(Boolean);
    if (picks.length) html += '<p class="v28-pick">' + v28W('pickLine', { names: picks.join(', ') }) + '</p>';
    if (l.s20 || l.s45) {
      html += '<div class="v28-btnrow v28-toggles">'
        + (l.s20 ? '<button type="button" class="btn small ghost" data-v28="line" data-l="s20" aria-expanded="false" aria-controls="v28-s20">' + v28W('twenty') + '</button>' : '')
        + (l.s45 ? '<button type="button" class="btn small ghost" data-v28="line" data-l="s45" aria-expanded="false" aria-controls="v28-s45">' + v28W('fortyFive') + '</button>' : '')
        + '</div>'
        + (l.s20 ? '<p class="v28-timed" id="v28-s20" hidden>' + v28Esc(l.s20) + '</p>' : '')
        + (l.s45 ? '<p class="v28-timed" id="v28-s45" hidden>' + v28Esc(l.s45) + '</p>' : '');
    }
    if (l.guestShown) html += '<p class="v28-eyebrow">' + v28W('guestLine') + '</p><p>' + v28Esc(l.guest) + '</p>';
    var notes = v28NotesFor(item);
    if (notes.about) html += v28Block(v28W('about'), '<div class="v28-about">' + v28Paras(notes.about.a) + '</div>');
  }
  html += v28WineBlock(h, item, r.row);
  if (item) {
    var parts = v28PartsShown(item);
    if (parts.length) html += v28Block(v28W('parts'), v28Dl(parts));
    html += v28FloorBlock(h, item);
  }
  var note = item ? v28Str(item.serviceNote) : '';
  html += '<section class="v28-block"><p class="v28-eyebrow">' + v28W('eyebrow') + '</p><p>' + (note ? v28Esc(note) : v28W('noteNone')) + '</p></section>';
  if (item) {
    html += v28HereBlock(h, item);
    html += v28RoomsBlock(h, item);
  }
  /* the three study buttons */
  var acts = '';
  var floorNote = '';
  if (item && !v28IsBottle(item)) {
    if (v28CardOf(item, h)) acts += '<button type="button" class="btn gold" data-v28="cardsone" data-id="' + v28Esc(item.id) + '">' + v28W('cardsThis') + '</button>';
    if (typeof v27OpenSay === 'function' && v28LinesShown(item).s10) acts += '<button type="button" class="btn ghost" data-v28="say" data-id="' + v28Esc(item.id) + '">' + v28W('sayPour') + '</button>';
    var secN = v28Wines(h).filter(function (w) { return !v28IsBottle(w) && v28Str(w.section) === r.section; }).length;
    if (secN >= 3) acts += '<button type="button" class="btn ghost" data-v28="drillsec" data-s="' + v28Esc(r.section) + '">' + v28W('drillSection') + '</button>';
    else {
      acts += '<button type="button" class="btn ghost" data-v28="drill">' + v28W('drillWhole') + '</button>';
      floorNote = '<p class="v28-soft">' + v28Esc(v28W('tooSmall', { section: r.section })) + '</p>';
    }
  }
  if (acts) html += '<div class="v28-btnrow v28-acts">' + acts + '</div>' + floorNote;
  if (item && v28HasHers(item)) html += '<p class="v28-soft">' + v28W('hers') + '</p>';
  html += '<div class="v28-btnrow v28-foot"><button type="button" class="btn small ghost" data-v28="edit" data-id="' + v28Esc(r.id) + '">' + v28W('edit') + '</button>'
    + (prev ? '<button type="button" class="btn small ghost" data-v28="open" data-id="' + v28Esc(prev.id) + '" data-step="1">' + v28Esc(v28W('prev', { name: prev.name })) + '</button>' : '')
    + (next ? '<button type="button" class="btn small ghost" data-v28="open" data-id="' + v28Esc(next.id) + '" data-step="1">' + v28Esc(v28W('next', { name: next.name })) + '</button>' : '')
    + '</div>';
  html += '</div>';
  return html;
}

/* =========== the deck =========== */

function startHouseDeck(scope) {
  var ids = [];
  try {
    if (scope && scope.weak) ids = v28Progress(v28DeckIds({})).againIds;
    else ids = v28DeckIds(scope || {});
  } catch (e) { ids = []; }
  if (!ids.length) {
    if (typeof toast === 'function') toast(v28W('deckNone'));
    return false;
  }
  var h = v28House();
  var label = scope && scope.section ? scope.section : scope && scope.weak ? 'my weak ones'
    : scope && scope.itemIds && ids.length === 1 ? ((v28Find(h && h.wines, ids[0]) || {}).name || 'this wine') : 'the whole list';
  var st = v28State();
  if (S.view === 'cellar') st.y = v28ScrollY();
  S._v28deck = {
    ids: (typeof shuffle === 'function' && ids.length > 1) ? shuffle(ids.slice()) : ids.slice(),
    idx: 0, flipped: false, got: 0, again: 0, label: label, missed: [], from: S.view === 'cellar' ? st.open : null, pushed: false
  };
  S._v28deck.pushed = v28Push({ v28: 'deck' });
  S.view = 'housedeck';
  render();
  return true;
}

function v28DeckCard() {
  var d = S._v28deck;
  if (!d || d.idx >= d.ids.length) return null;
  var h = v28House();
  return v28CardOf(v28Find(h && h.wines, d.ids[d.idx]), h);
}

function v28DeckHtml() {
  var d = S._v28deck;
  if (!d) return '';
  var head = '<div class="viewhead v28-head"><h2>' + v28W('cards') + ': ' + v28Esc(d.label) + '</h2></div>';
  var tools = '<div class="v28-btnrow v28-deckbar"><button type="button" class="btn small ghost" data-v28="deckclose">' + v28W('close') + '</button>'
    + '<span class="v28-count" role="status">' + v28Esc(v28W('count', { g: d.got, a: d.again })) + '</span></div>';
  var c = v28DeckCard();
  if (!c) {
    return '<div class="v28 v28-deck">' + head
      + '<div class="card v28-end"><h3 class="v28-fname">' + v28W('done') + '</h3><p>' + v28Esc(v28W('count', { g: d.got, a: d.again })) + '</p></div>'
      + '<div class="v28-btnrow">'
      + (d.missed.length ? '<button type="button" class="btn gold" data-v28="deckagain">' + v28W('againDeck', { n: d.missed.length }) + '</button>' : '')
      + '<button type="button" class="btn ghost" data-v28="deckshuffle">' + v28W('shuffle') + '</button>'
      + '<button type="button" class="btn ghost" data-v28="deckclose">' + v28W('backList') + '</button></div></div>';
  }
  var eyebrow = v28W('cardOf', { i: d.idx + 1, n: d.ids.length }) + (c.section ? ' \u00b7 ' + c.section : '');
  var html = '<div class="v28 v28-deck">' + head + tools;
  if (!d.flipped) {
    html += '<button type="button" class="card v28-front" data-v28="flip" aria-describedby="v28-fronthint">'
      + '<span class="v28-eyebrow v28-ink">' + v28Esc(eyebrow) + '</span>'
      + '<span class="v28-fname">' + v28Esc(c.name) + '</span>'
      + '<span class="v28-fhint" id="v28-fronthint">' + v28W('front') + '</span>'
      + '<span class="v28-flipword">' + v28W('flip') + '</span></button>';
  } else {
    var b = c.back;
    html += '<div class="card v28-back"><p class="v28-eyebrow v28-ink">' + v28Esc(eyebrow) + '</p>'
      + '<h3 class="v28-bname" id="v28-h" tabindex="-1">' + v28Esc(c.name) + '</h3>'
      + (b.s10 ? '<p class="v28-eyebrow v28-ink">' + v28W('ten') + '</p><p class="v28-ten">' + v28Esc(b.s10) + '</p>' : '')
      + (b.price ? '<p><span class="v28-ink-tag">' + v28Esc(b.price) + '</span></p>' : '')
      + b.pairs.map(function (p) { return '<p><b>' + v28Esc(p[0]) + ':</b> ' + v28Esc(p[1]) + '</p>'; }).join('')
      + (b.parts.length ? '<details class="v28-q"><summary>' + v28W('parts') + '</summary>' + v28Dl(b.parts) + '</details>' : '')
      + (b.say ? '<p class="v28-eyebrow v28-ink">' + v28W('say') + '</p><p>' + v28Esc(b.say) + '</p>' : '')
      + '</div>'
      + '<div class="v28-grade"><button type="button" class="btn ghost" data-v28="again">' + v28W('again') + '</button>'
      + '<button type="button" class="btn gold" data-v28="got">' + v28W('got') + '</button></div>';
  }
  html += '</div>';
  return html;
}

function v28DeckGrade(got) {
  var d = S._v28deck;
  if (!d || !d.flipped || d.idx >= d.ids.length) return null;
  var id = d.ids[d.idx];
  var h = v28House();
  var w = v28Find(h && h.wines, id);
  var key = (typeof v27RecordHouse === 'function') ? v27RecordHouse('h-' + id + '-card', 'Our List', w ? w.name : id, !!got) : null;
  if (got) d.got++; else { d.again++; if (d.missed.indexOf(id) < 0) d.missed.push(id); }
  d.idx++; d.flipped = false;
  return key;
}

function v28DeckView() {
  var box = document.createElement('div');
  box.innerHTML = v28DeckHtml();
  v28Wire(box);
  return box;
}

function v28DeckClose() {
  var d = S._v28deck;
  var st = v28State();
  S._v28deck = null;
  S.view = 'cellar';
  st.open = d ? d.from : null;
  st.focus = st.open ? 'head' : 'restore';
  render();
  if (d && d.pushed) v28Back();
}

/* =========== the drills: codex27's house rounds =========== */

function v28DrillQs(section) {
  var qs = [];
  /* the whole list: only the round's own questions are dealt (codex27's
     v27CellarRound); a section deals every question and keeps its own */
  if (!section && typeof v27CellarRound === 'function') {
    var cut = (typeof cellarDrillLen === 'function') ? cellarDrillLen() : 15;
    try { return v27CellarRound(cut, []); } catch (e) { return []; }
  }
  try { qs = (typeof v27CellarHouseQs === 'function') ? v27CellarHouseQs() : []; } catch (e) { qs = []; }
  if (!section) return qs;
  var h = v28House();
  var wines = v28Wines(h).filter(function (w) { return !v28IsBottle(w) && v28Str(w.section) === section; });
  var ids = wines.map(function (w) { return w.id; });
  var names = wines.map(function (w) { return v28Esc(w.name); });
  return qs.filter(function (q) {
    var m = /^h-([a-z]-[a-z0-9]{8})-/.exec(q.id || '');
    if (m && ids.indexOf(m[1]) >= 0) return true;
    return Array.isArray(q.opts) && names.indexOf(q.opts[q.a]) >= 0;
  });
}

function v28RunDrill(qs, again) {
  if (!qs.length) { if (typeof toast === 'function') toast(v28W('drillNone')); return false; }
  if (typeof stopTimer === 'function') stopTimer();
  var cut = (typeof cellarDrillLen === 'function') ? cellarDrillLen() : 15;
  var all = (typeof shuffle === 'function') ? shuffle(qs.slice()) : qs.slice();
  S.mode = 'drill'; S.section = (typeof V27_CELLAR_SECTION !== 'undefined') ? V27_CELLAR_SECTION : 'Our List';
  S.pool = cut ? all.slice(0, cut) : all;
  S.idx = 0; S.correct = 0; S.results = [];
  S._again = again;
  if (typeof resetQ === 'function') resetQ();
  S.view = 'quiz';
  render();
  return true;
}

function v28DrillList() { return v28RunDrill(v28DrillQs(''), function () { v28DrillList(); }); }

function startHouseSectionDrill(section) {
  return v28RunDrill(v28DrillQs(section), function () { startHouseSectionDrill(section); });
}

/* =========== history =========== */

function v28Push(state) {
  try {
    if (typeof history !== 'undefined' && history && typeof history.pushState === 'function') { history.pushState(state, ''); return true; }
  } catch (e) { }
  return false;
}
function v28Back() {
  try { if (typeof history !== 'undefined' && history && typeof history.back === 'function') history.back(); } catch (e) { }
}
function v28Replace(state) {
  try { if (typeof history !== 'undefined' && history && typeof history.replaceState === 'function') history.replaceState(state, ''); } catch (e) { }
}
function v28ScrollY() {
  try { return (typeof window !== 'undefined' && window) ? (window.scrollY || window.pageYOffset || 0) : 0; } catch (e) { return 0; }
}

function v28OnPop(e) {
  var to = (e && e.state && e.state.v28) || null;
  var st = v28State();
  /* back from a door the card opened (the grape cards, the atlas, a chapter,
     the map, a producer, Say it, Guest at the table): the door pushed its own
     entry, so the press lands on the card's entry and the card comes back */
  if (st.door && S.view !== 'cellar' && S.view !== 'housedeck') {
    var from = st.door;
    st.door = null;
    if (S._v28deck) S._v28deck = null;
    S.view = 'cellar';
    if (st.doorArea) S._v25area = st.doorArea;
    st.doorArea = '';
    st.open = (to && to !== 'deck' && to !== 'door') ? to : from;
    if (!to) st.pushed = false;
    st.focus = 'head';
    render();
    return;
  }
  if (S.view === 'housedeck' && S._v28deck) {
    if (to === 'deck') return;
    S._v28deck = null; S.view = 'cellar';
    st.open = to || null;
    st.focus = st.open ? 'head' : 'restore';
    render();
    return;
  }
  if (S.view !== 'cellar') return;
  if (st.open && !to) {
    var id = st.open;
    st.open = null; st.pushed = false; st.focus = 'row:' + id;
    render();
    return;
  }
  /* an entry naming another card (the forward button, or an entry below one
     the reader stepped through): show that card, never leave this one */
  if (to && to !== 'deck' && to !== 'door' && to !== st.open && v28Find(v28Rows(), to)) {
    st.open = to; st.pushed = true; st.focus = 'head';
    render();
  }
}

/* A door followed from an open card pushes one entry of its own, so the back
   gesture returns to the card instead of popping the card's entry while the
   door's page is on screen. */
function v28DoorPush() {
  var st = v28State();
  if (S.view !== 'cellar' || !st.open) return;
  st.door = st.open;
  st.doorArea = S._v25area || '';
  v28Push({ v28: 'door', card: st.open });
}

/* =========== acts =========== */

function v28Open(id, step) {
  var st = v28State();
  /* a step replaces only the entry this card pushed; a card that pushed none
     (one the deep link opened) pushes its own, so the entry below is never
     stamped with a card */
  if (step && st.pushed) v28Replace({ v28: id });
  else {
    if (!step) st.y = v28ScrollY();
    st.pushed = v28Push({ v28: id });
  }
  st.door = null;
  st.open = id;
  st.focus = 'head';
  render();
}

function v28CloseCard() {
  var st = v28State();
  var id = st.open;
  var pushed = st.pushed;
  st.open = null; st.pushed = false; st.focus = id ? 'row:' + id : 'restore';
  render();
  if (pushed) v28Back();
}

function v28EditOne(id) {
  var b = null;
  ((typeof ST !== 'undefined' && ST && ST.cellar) || []).some(function (x) { if (x && x.id === id) { b = x; return true; } return false; });
  var st = v28State();
  st.open = null;
  S._v28edit = true;
  if (b) {
    S._cellarForm = { producer: b.producer || '', name: b.name || '', vintage: b.vintage || '', region: b.region || '',
      grapes: b.grapes || '', style: b.style || '', glass: b.glass || '', bottle: b.bottle || '', note: b.note || '' };
    S._cellarEdit = b.id;
  }
  render();
  try { window.scrollTo(0, 0); } catch (e) { }
}

function v28Act(act, node) {
  var get = function (k) { return node && typeof node.getAttribute === 'function' ? (node.getAttribute(k) || '') : ''; };
  var st = v28State();
  var h = v28House();
  if (V28_DOORS[act]) v28DoorPush();
  switch (act) {
    case 'open': v28Open(get('data-id'), !!get('data-step')); return;
    case 'back': v28CloseCard(); return;
    case 'sec': st.sec = get('data-s'); render(); return;
    case 'meal': v28SetMeal(get('data-m')); st.sec = ''; render(); return;
    case 'editall': S._v28edit = true; st.open = null; render(); return;
    case 'editoff': S._v28edit = false; S._cellarForm = null; S._cellarEdit = null; render(); return;
    case 'edit': v28EditOne(get('data-id')); return;
    case 'cards': startHouseDeck(get('data-s') ? { section: get('data-s') } : {}); return;
    case 'cardsone': startHouseDeck({ itemIds: [get('data-id')] }); return;
    case 'weak': startHouseDeck({ weak: true }); return;
    case 'drill': v28DrillList(); return;
    case 'drillsec': startHouseSectionDrill(get('data-s')); return;
    case 'sayopen': if (typeof v27OpenSay === 'function') v27OpenSay(); return;
    case 'say':
      if (typeof v27OpenSay === 'function') { v27OpenSay(); if (typeof v27SayPick === 'function' && v27SayPick(get('data-id'))) render(); }
      return;
    case 'guest':
      if (typeof v27OpenGuest === 'function') { v27OpenGuest(); if (typeof v27GuestPick === 'function' && v27GuestPick(get('data-k'))) render(); }
      return;
    case 'grape': {
      var g = get('data-g');
      if (typeof startFlash !== 'function' || typeof GRAPES === 'undefined') return;
      startFlash();
      var at = -1;
      GRAPES.forEach(function (x, i) { if (x && x.g === g) at = i; });
      if (at >= 0 && S.fc && Array.isArray(S.fc.deck)) {
        S.fc.deck = [at].concat(S.fc.deck.filter(function (i) { return i !== at; }));
        S.fc.flip = false;
        render();
      }
      return;
    }
    case 'terroir': S._v25area = 'library'; S.view = 'terroir'; render(); v28AtRegion(get('data-k')); return;
    case 'primer': {
      var k = get('data-k');
      S._v25area = 'library';
      S.primerKey = /^\d+$/.test(k) ? Number(k) : k;
      S.view = 'primer'; render(); return;
    }
    case 'map': S._v25area = 'library'; S.wmap = get('data-k'); S.view = 'worldmap'; render(); return;
    case 'producer': {
      var id = get('data-k');
      var ci = 0;
      try {
        var rec = (typeof prodById === 'function') ? prodById(id) : null;
        if (rec && typeof prodGroups === 'function') prodGroups().forEach(function (gr, i) { if (gr.rows.indexOf(rec) >= 0) ci = i; });
      } catch (e) { }
      S._v25area = 'library';
      S._prod = { c: ci, id: id }; S.view = 'producers'; render(); return;
    }
    case 'line': {
      var l = get('data-l');
      var open = get('aria-expanded') !== 'true';
      var box = (typeof document !== 'undefined') ? document.getElementById('v28-' + l) : null;
      if (box) box.hidden = !open;
      node.setAttribute('aria-expanded', open ? 'true' : 'false');
      node.textContent = l === 's20' ? v28W(open ? 'twentyHide' : 'twenty') : v28W(open ? 'fortyFiveHide' : 'fortyFive');
      return;
    }
    case 'flip': if (S._v28deck) { S._v28deck.flipped = true; render(); v28FocusId('v28-h'); v28ShowCard(); } return;
    case 'got': v28DeckGrade(true); render(); v28ShowCard(); return;
    case 'again': v28DeckGrade(false); render(); v28ShowCard(); return;
    case 'deckagain':
      if (S._v28deck && S._v28deck.missed.length) {
        var d = S._v28deck;
        d.ids = d.missed.slice(); d.missed = []; d.idx = 0; d.got = 0; d.again = 0; d.flipped = false; render();
      }
      return;
    case 'deckshuffle':
      if (S._v28deck) {
        var e = S._v28deck;
        e.ids = (typeof shuffle === 'function') ? shuffle(e.ids.slice()) : e.ids; e.missed = []; e.idx = 0; e.got = 0; e.again = 0; e.flipped = false; render();
      }
      return;
    case 'deckclose': v28DeckClose(); return;
    default: return;
  }
}

var V28_DOORS = { grape: 1, terroir: 1, primer: 1, map: 1, producer: 1, say: 1, guest: 1 };

/* The atlas opened on the region the card showed: that row to the top of the
   screen, clear of the suite's badge, and focused. reference.js is not
   touched: the row is found by its text after the render. */
function v28AtRegion(name) {
  if (!name) return;
  try {
    var want = v28Fold(name);
    var hit = null;
    Array.prototype.some.call(document.querySelectorAll('.refrow .refr'), function (n) {
      if (v28Fold(n.textContent) === want) { hit = n.parentNode; return true; }
      return false;
    });
    if (!hit || typeof hit.getBoundingClientRect !== 'function') return;
    hit.setAttribute('tabindex', '-1');
    hit.classList.add('v28-here');
    window.scrollTo(0, Math.max(0, hit.getBoundingClientRect().top + v28ScrollY() - 72));
    if (typeof hit.focus === 'function') hit.focus({ preventScroll: true });
  } catch (e) { }
}

/* The back and its two grades onto the screen together: the top of the card
   to the top of the viewport, the masthead scrolled away above it. */
function v28ShowCard() {
  try {
    /* the deck's bar (Close and the count, padded clear of the suite's badge)
       to the top, so the card's eyebrow is never under the badge */
    var c = document.querySelector('.v28-deck .v28-deckbar') || document.querySelector('.v28-deck .v28-back, .v28-deck .v28-front');
    if (!c || typeof c.getBoundingClientRect !== 'function') return;
    var top = c.getBoundingClientRect().top + v28ScrollY() - 8;
    window.scrollTo(0, Math.max(0, top));
  } catch (e) { }
}

function v28FocusId(id) {
  try {
    var n = document.getElementById(id);
    if (n && typeof n.focus === 'function') n.focus({ preventScroll: true });
  } catch (e) { }
}

/* One listener for every press, and the search box repainting only the rows
   and the live region, so the caret never leaves it. */
function v28Wire(box) {
  if (!box || typeof box.addEventListener !== 'function') return;
  box.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v28]') : null;
    if (!node || node.disabled) return;
    if (typeof e.preventDefault === 'function' && node.tagName === 'BUTTON') e.preventDefault();
    v28Act(node.getAttribute('data-v28'), node);
  });
  var door = typeof box.querySelector === 'function' ? box.querySelector('.v28-housedoor') : null;
  if (door && typeof door.addEventListener === 'function') {
    door.addEventListener('toggle', function () { if (door.open) v28HouseRead(door.querySelector('#v28-houseread')); });
  }
  var q = typeof box.querySelector === 'function' ? box.querySelector('#v28-q') : null;
  if (q && typeof q.addEventListener === 'function') {
    q.addEventListener('input', function () {
      var st = v28State();
      st.q = String(q.value || '');
      var h = v28House();
      var rows = v28Rows();
      var all = v28MealRows(rows, v28Meal(v28MealNames(h, rows)));
      var prog = v28Progress(v28DeckIds({}));
      var out = box.querySelector('#v28-rows');
      var live = box.querySelector('#v28-live');
      if (out) out.innerHTML = v28RowsHtml(all, st, prog, h);
      if (live) live.textContent = v28LiveText(all, st);
    });
  }
}

function v28StudyView() {
  var st = v28State();
  var html = st.open ? v28CardHtml(st.open) : '';
  if (!html) { st.open = null; html = v28StudyHtml(); }
  var box = document.createElement('div');
  box.innerHTML = html;
  v28Wire(box);
  return box;
}

/* =========== 1. the deep link, read once at load =========== */

var V28_WANT = null;
(function () {
  try {
    if (typeof location === 'undefined' || !location) return;
    var path = typeof location.pathname === 'string' ? location.pathname : '';
    V28_SUITE = path.indexOf('/codex') === 0;
    var hash = typeof location.hash === 'string' ? location.hash : '';
    var m = /^#wine=(w-[a-z0-9]{8})$/.exec(hash);
    if (m) V28_WANT = { wine: m[1] };
    else if (hash === '#list') V28_WANT = { list: true };
    if (V28_WANT && path && typeof history !== 'undefined' && history && typeof history.replaceState === 'function') {
      history.replaceState(null, '', path + (typeof location.search === 'string' ? location.search : ''));
    }
  } catch (e) { V28_WANT = null; }
})();

/* Honours the wish when the house can: returns true when it was applied. */
function v28Want() {
  var w = V28_WANT;
  if (!w) return false;
  var h = v28House();
  if (!h) return false;
  if (w.list) {
    if (!v28Wines(h).length) return false;
    V28_WANT = null; S._v28edit = false; S.view = 'cellar'; v28State().open = null;
    return true;
  }
  if (v28Find(h.wines, w.wine)) {
    V28_WANT = null; S._v28edit = false; S.view = 'cellar';
    var st = v28State(); st.open = w.wine; st.focus = 'head'; st.q = ''; st.sec = '';
    return true;
  }
  return false;
}

/* After a sync: apply the wish, or drop it when the house is here and the
   wine is not. */
function v28AfterSync() {
  if (!V28_WANT) return;
  var h = v28House();
  if (!h) return;
  if (v28Want()) { try { render(); } catch (e) { } return; }
  if (V28_WANT && V28_WANT.wine && !v28Find(h.wines, V28_WANT.wine)) V28_WANT = null;
}

/* =========== the wraps =========== */

var _v28CellarView = (typeof cellarView === 'function') ? cellarView : null;
if (_v28CellarView) {
  cellarView = function () {
    var on = false;
    try { on = v28StudyOn(); } catch (e) { on = false; }
    if (on) {
      try { return v28StudyView(); } catch (e) { /* the list must never go dark for the study view */ }
    }
    var v = _v28CellarView.apply(this, arguments);
    try {
      if (S._v28edit && v28Wines(v28House()).length && v && typeof v.insertBefore === 'function') {
        var sw = document.createElement('div');
        sw.className = 'sarow v28-editbar';
        sw.innerHTML = '<button type="button" class="btn ghost" data-v28="editoff">' + v28W('editOn') + '</button>';
        sw.addEventListener('click', function () { v28Act('editoff', null); });
        var head = v.firstChild;
        v.insertBefore(sw, head ? head.nextSibling : null);
      }
    } catch (e) { }
    return v;
  };
}

var _v28Render = render;
render = function () {
  try { v28Want(); } catch (e) { }
  var out;
  var own = S.view === 'housedeck' && !(typeof V25_VIEWS !== 'undefined' && V25_VIEWS && V25_VIEWS.housedeck);
  if (own) {
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    var app = document.getElementById('app');
    app.innerHTML = ''; app.appendChild(topbar()); app.appendChild(v28DeckView());
    try { window.scrollTo(0, 0); } catch (e) { }
  } else {
    out = _v28Render.apply(this, arguments);
  }
  try { v28AfterRender(); } catch (e) { }
  return out;
};

/* The card's top to the top of the screen, the masthead scrolled away, so the
   first screen holds the name, the price, Say it, the ten second line and the
   first picks; the card's own bar is padded clear of the suite's badge. */
function v28CardTop() {
  try {
    var c = document.getElementById('v28-card');
    if (c && typeof c.getBoundingClientRect === 'function') return Math.max(0, c.getBoundingClientRect().top + v28ScrollY() - 8);
  } catch (e) { }
  return null;
}
function v28ScrollCard() {
  var top = v28CardTop();
  try { window.scrollTo(0, top || 0); } catch (e) { }
}

function v28AfterRender() {
  var st = S._v28;
  if (!st || !st.focus) return;
  var f = st.focus;
  st.focus = '';
  if (S.view !== 'cellar') return;
  if (f === 'head') {
    v28ScrollCard();
    v28FocusId('v28-h');
    /* a cold deep link opens the card while the page is still settling (the
       masthead, the fonts, a render after the sync): the same scroll once more
       after layout, unless the reader has scrolled since */
    var open = st.open;
    var again = function () {
      try {
        if (S.view !== 'cellar' || !S._v28 || S._v28.open !== open) return;
        var want = v28CardTop();
        if (want !== null && Math.abs(v28ScrollY() - want) > 4 && v28ScrollY() < want) v28ScrollCard();
      } catch (e) { }
    };
    try { if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { again(); setTimeout(again, 250); }); } catch (e) { }
    return;
  }
  try { window.scrollTo(0, st.y || 0); } catch (e) { }
  if (f.indexOf('row:') === 0 && typeof document !== 'undefined' && typeof document.querySelector === 'function') {
    try {
      var id = f.slice(4).replace(/[^a-z0-9-]/gi, '');
      var row = document.querySelector('.v28-row[data-id="' + id + '"]');
      if (row && typeof row.focus === 'function') row.focus({ preventScroll: true });
    } catch (e) { }
  }
}

var _v28ApplyLevel = (typeof applyLevel === 'function') ? applyLevel : null;
if (_v28ApplyLevel) {
  applyLevel = function (lvl, skipRender) {
    S._v28deck = null;
    if (S._v28) { S._v28.open = null; S._v28.focus = ''; }
    return _v28ApplyLevel(lvl, skipRender);
  };
}

/* The wish is tried after every sync, the one already running at load
   included. */
var _v28Sync = (typeof v27Sync === 'function') ? v27Sync : null;
if (_v28Sync) {
  v27Sync = function () {
    var p = _v28Sync.apply(this, arguments);
    Promise.resolve(p).then(function () { try { v28AfterSync(); } catch (e) { } });
    return p;
  };
}
try { if (typeof V27_LAST !== 'undefined' && V27_LAST) Promise.resolve(V27_LAST).then(function () { try { v28AfterSync(); } catch (e) { } }); } catch (e) { }

try { if (typeof window !== 'undefined' && window && typeof window.addEventListener === 'function') window.addEventListener('popstate', v28OnPop); } catch (e) { }

v28RoomsCheck();

/* =========== the row on Mine =========== */

var V28_MINE_ROW = {
  key: 'ourlistcards', name: 'Flash cards: our list',
  show: function () { try { return v28DeckIds({ keepMeal: false }).length > 0; } catch (e) { return false; } },
  line: function () { return 'every wine on the list, front and back'; },
  go: function () { startHouseDeck({}); }
};
(function () {
  if (typeof V25_MINE === 'undefined' || !V25_MINE || typeof V25_MINE.splice !== 'function') return;
  var at = -1;
  V25_MINE.forEach(function (r, i) { if (r && r.key === 'cellar') at = i; });
  V25_MINE.splice(at >= 0 ? at + 1 : V25_MINE.length, 0, V28_MINE_ROW);
  if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO.ourlistcards = V28_MINE_ROW.go;
  if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA.ourlistcards = 'mine';
  if (typeof V25_HUB !== 'undefined' && V25_HUB) { V25_HUB.ourlistcards = 'mine'; V25_HUB.housedeck = 'mine'; }
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.housedeck = v28DeckView;
})();
