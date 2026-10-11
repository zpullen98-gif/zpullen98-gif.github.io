/* ================== CODEX XXXVIII: WHO MAKES IT ==================

   The producers deep dive (WorldTable plan, October 2026, section 3): the
   owner asked to know who stands behind every wine on the list, in words a
   server can say at the table. The House carries it (a component's optional
   producer mark: type, who, where, founded, history, facts, notes, sayIt,
   askKitchen, the shapes in the World Table's src/lib/house/house-schema.ts)
   and the engine deals it (buildFlashcards' producer kind, dealQuestion's
   producer kinds). The World Table and the Bartender's Ledger draw their
   halves; this layer is the Codex's. codex35 holds the components; new work
   belongs in the next layer, so this is codex38.

   WHAT IT DOES, and the rule each part keeps:

   1. WHO MAKES IT, ON A WINE'S CARD. Above codex35's What it's made of, the
      wine's components that carry a kept producer, each a closed disclosure
      that opens to where and since when, how to say it, the facts, the story
      in paragraphs, the notes for the floor and Ask the sommelier when the
      profile leaves a question for the floor. Where the Codex's own
      producers hold the same house, a link opens it through codex28's
      producer door. The match is the folded name, whole: the estate word at
      the front (Domaine, Château, Maison and their kin, with de, du or des)
      may differ and nothing else may, so Fichet is never Jean-Philippe
      Fichet and Comtes Lafon is never Les Héritiers du Comte Lafon. Under
      the block, Flash these producers and All producers. A component that
      holds nothing kept but its producer is drawn here alone, never as an
      empty story in What it's made of.

   2. THE HOUSE'S PRODUCERS, a view of its own (S.view 'houseproducers'),
      reached from Our Wine List, the level page's My restaurant and a card's
      All producers. It is titled with the house's name and grouped by the
      region of each producer's first wine on the list: Champagne, Burgundy,
      Bordeaux, the Rhône, the rest of France, Germany and Austria, Italy,
      Spain and Portugal, the United States, the rest of the world. A
      producer opens its whole profile, with its wines as chips that open
      their cards. A row of codex29's full list whose producer has a house
      profile offers Read the full profile. Every move goes through codex32's
      router: a producer opened pushes, a region chosen replaces, a popstate
      renders the entry it lands on, and Back at depth 0 climbs one screen.

   3. THE DECKS. codex32's one card screen gains three: producers, every
      producer's cards; producers:{region}, one region's; and
      item-producers:{wine id}, one wine's producers in the order its card
      shows them, never shuffled. The cards are the engine's (who and where,
      one thing to know, which of our wines), made here by the same rule when
      the engine is older. The Flashcards root lists them under the house. A
      grade is recorded as the words are, each card under its own key,
      h-{component id}-producer-{n}, so a deck's learnt count is the cards
      answered, never three for one answer.

   4. THE QUIZ. codex27's house drills (Drill our list, the quick quiz) gain
      four producer questions, dealt by the engine's one dealer over a view
      of the house that holds only the wines with a kept producer and only
      those producers, so every wrong answer is another of the list's wine
      producers: which producer makes a wine on the list (the wine named
      without its maker, so the stem never carries its answer), where a
      producer is, which of our wines a producer makes, and, when a kept
      pairing names the wine, which producer's wine pours with a dish (the
      pairing's first pick, said so, since a tasting may pour another). The
      first three ask about a dozen producers drawn afresh for each round,
      since the engine reads its whole view for every deal. Each is recorded
      like every other house drill question, under h-{item id}-{kind}.

   KEPT ONLY: every mark read here is a person's. NO OOT AT ALL is the
   standalone build and every Node gate: no house, no block, no button, no
   deck, no question, nothing drawn.

   House rules observed: a new layer, no edits to earlier files; top-level
   declarations are var and function only, no arrow; no pictorial glyph and
   no mark at or above U+2190 in anything this file writes; no dash of any
   spelling; British spelling in the app's own words, the producers' and
   the wines' names as the house wrote them; nobody named; every control at
   least 44px; every state a word; no allergen verdict, ever. */

/* =========== the words =========== */

var V38_WORDS = {
  whoMakes: 'Who makes it',
  flashThese: 'Flash these producers',
  allProducers: 'All producers',
  inLibrary: 'In the Codex\u2019s producers',
  where: 'Where',
  founded: 'Founded',
  say: 'Say it',
  facts: 'Facts',
  story: 'The story',
  notes: 'Notes for the floor',
  ask: 'Ask the sommelier',
  viewName: 'The producers',
  viewSub: 'Who makes our wines',
  countLine: '{n} behind {m} on our list.',
  regions: 'Regions',
  allChip: 'All {n}',
  onList: 'On our list',
  noneYet: 'No producer profiles for our wines yet.',
  noHouse: 'No restaurant on this device yet.',
  everyProducer: 'Every producer',
  groupDeck: 'Producers: {group}',
  itemDeck: '{name}: who makes it',
  fcGroup: 'Who makes our wines',
  ourProducers: 'Our producers',
  theProducers: 'The producers',
  readProfile: 'Read the full profile',
  cardLabel: 'Producer',
  whichWines: ': which of our wines?',
  qOf: 'Which producer makes this wine on our list?',
  qWhere: 'Where is this producer?',
  qDish: 'Which of our wines does this producer make?',
  qPour: 'Which producer\u2019s wine is the first pick with this dish?'
};

/* The regions, in the order the view and the root list them. A producer
   stands under the first whose words name its first wine's region (whole
   words, folded), the rest of the world when none does. */
var V38_GROUPS = [
  { key: 'champagne', label: 'Champagne', words: ['champagne'] },
  { key: 'burgundy', label: 'Burgundy', words: ['burgundy', 'bourgogne', 'beaujolais', 'chablis', 'maconnais', 'macon', 'cote de beaune', 'cote de nuits', 'cote chalonnaise', 'cote d or'] },
  { key: 'bordeaux', label: 'Bordeaux', words: ['bordeaux', 'medoc', 'haut medoc', 'sauternes', 'barsac', 'pomerol', 'saint emilion', 'st emilion', 'graves', 'pessac leognan', 'margaux', 'pauillac', 'saint julien', 'saint estephe', 'fronsac', 'entre deux mers'] },
  { key: 'rhone', label: 'Rh\u00f4ne', words: ['rhone', 'chateauneuf du pape', 'cote rotie', 'hermitage', 'crozes hermitage', 'condrieu', 'gigondas', 'cornas', 'vacqueyras', 'saint joseph', 'beaumes de venise'] },
  { key: 'france', label: 'The rest of France', words: ['france', 'alsace', 'loire', 'provence', 'languedoc', 'roussillon', 'jura', 'savoie', 'corsica', 'bandol', 'sancerre', 'vouvray', 'muscadet', 'cahors', 'madiran', 'bergerac'] },
  { key: 'germany-austria', label: 'Germany and Austria', words: ['germany', 'austria', 'mosel', 'saar', 'ruwer', 'nahe', 'rheingau', 'rheinhessen', 'pfalz', 'franken', 'baden', 'wachau', 'kamptal', 'kremstal', 'burgenland', 'wagram', 'steiermark', 'styria'] },
  { key: 'italy', label: 'Italy', words: ['italy', 'piedmont', 'piemonte', 'tuscany', 'toscana', 'veneto', 'trentino', 'alto adige', 'friuli', 'sicily', 'sicilia', 'campania', 'umbria', 'marche', 'abruzzo', 'puglia', 'sardinia', 'lombardy', 'franciacorta', 'barolo', 'barbaresco', 'chianti', 'montalcino', 'bolgheri', 'valpolicella', 'etna'] },
  { key: 'spain-portugal', label: 'Spain and Portugal', words: ['spain', 'portugal', 'rioja', 'ribera del duero', 'priorat', 'jerez', 'sherry', 'rias baixas', 'galicia', 'bierzo', 'navarra', 'penedes', 'douro', 'madeira', 'porto', 'dao', 'alentejo', 'vinho verde', 'andalucia', 'castilla y leon'] },
  { key: 'united-states', label: 'The United States', words: ['united states', 'usa', 'california', 'oregon', 'washington', 'new york', 'napa', 'sonoma', 'willamette', 'santa barbara', 'paso robles', 'virginia', 'texas', 'finger lakes'] },
  { key: 'world', label: 'The rest of the world', words: [] }
];
var V38_GROUP_RE = /^(champagne|burgundy|bordeaux|rhone|france|germany-austria|italy|spain-portugal|united-states|world)$/;
var V38_CID_RE = /^c-[a-z0-9]{8}$/;

function v38W(key, vars) {
  var v = vars || {};
  return String(V38_WORDS[key] || key).replace(/\{(\w+)\}/g, function (m, k) { return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m; });
}
function v38Esc(s) { return (typeof v28Esc === 'function') ? v28Esc(s) : String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function v38Str(s) { return typeof s === 'string' ? s.trim() : ''; }
function v38Kept(m) { return m && typeof m === 'object' && m.by === 'person' && m.value !== undefined && m.value !== null ? m.value : null; }
function v38House() { try { return (typeof v28House === 'function') ? v28House() : null; } catch (e) { return null; } }
function v38HouseLib() {
  try { return (typeof OOT !== 'undefined' && OOT && OOT.houseLib) ? OOT.houseLib : null; } catch (e) { return null; }
}
function v38Fold(s) {
  if (typeof v28Fold === 'function') return v28Fold(s);
  var t = String(s == null ? '' : s).toLowerCase();
  try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  return ' ' + t.replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
}
function v38Paras(s) {
  return String(s == null ? '' : s).split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean)
    .map(function (p) { return '<p>' + v38Esc(p) + '</p>'; }).join('');
}
function v38List(v) { return Array.isArray(v) ? v.map(v38Str).filter(Boolean) : []; }
function v38Plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
function v38Group(key) {
  var hit = V38_GROUPS[V38_GROUPS.length - 1];
  V38_GROUPS.some(function (g) { if (g.key === key) { hit = g; return true; } return false; });
  return hit;
}

/* The who as a question names it: up to its first bracket or comma, the engine's shortWho. */
function v38ShortWho(who) {
  var w = v38Str(who);
  var cut = w.split(/\s*\(|,\s/)[0].trim();
  return cut || w;
}

/* A name as the matches read it: folded whole, and its bare form with the
   estate word at the front taken away. The fold reads '&' as 'and'; the
   French 'et' is read the same, so Bouchard Père & Fils is Bouchard Père et
   Fils and Jean-Paul & Benoît Droin is Jean-Paul et Benoît Droin. The
   family word a label prints in the estate word's place (Famille, Familia,
   Familie) is read as one of them: the house's glass page prints Famille
   Durand where the list prints Domaine Durand for the same Loire glass. */
var V38_ESTATE = /^(?:domaine|domaines|chateau|maison|weingut|bodega|bodegas|tenuta|cantina|quinta|champagne|famille|familia|familie) (?:(?:des|de la|de l|du|de|d) )?/;
function v38Whole(s) { return v38Fold(s).replace(/ et(?= )/g, ' and').trim(); }
function v38Bare(s) {
  var f = v38Whole(s);
  var b = f.replace(V38_ESTATE, '').trim();
  return b || f;
}

/* The region a text names, by the first group whose words stand in it. */
function v38GroupOf(text) {
  var f = v38Fold(text);
  var hit = 'world';
  V38_GROUPS.some(function (g) {
    return g.words.some(function (w) { if (f.indexOf(' ' + w + ' ') >= 0) { hit = g.key; return true; } return false; });
  });
  return hit;
}

/* =========== the Codex's own producers =========== */

/* The names a record of WINE_PRODUCERS answers to: its own, then the
   names a label or a list prints for the same estate that the record keeps
   in aka (Thierry et Pascale Matrot for Domaine Matrot, as its trap says). */
function v38LibNames(r) {
  var out = [];
  if (r && typeof r.p === 'string' && r.p.trim()) out.push(r.p.trim());
  (r && Array.isArray(r.aka) ? r.aka : []).forEach(function (n) { var t = v38Str(n); if (t && out.indexOf(t) < 0) out.push(t); });
  return out;
}

/* The index of WINE_PRODUCERS by whole and bare name, read once per corpus
   size; a bare name two estates share answers neither. A record's name
   with an aside (Do Ferreiro (Gerardo Méndez)) is read bare up to its
   bracket or comma too, as the who is. The wine records (ids w-) are
   wines, not houses, and are left out as codex28 leaves them. */
var V38_LIB = null;
function v38LibIndex() {
  if (typeof WINE_PRODUCERS === 'undefined' || !Array.isArray(WINE_PRODUCERS)) return null;
  if (V38_LIB && V38_LIB.list === WINE_PRODUCERS && V38_LIB.n === WINE_PRODUCERS.length) return V38_LIB;
  var whole = {}, bare = {};
  var putBare = function (b, r) { if (b) bare[b] = Object.prototype.hasOwnProperty.call(bare, b) && bare[b] !== r ? false : r; };
  WINE_PRODUCERS.forEach(function (r) {
    if (!r || typeof r.p !== 'string' || !r.id || String(r.id).indexOf('w-') === 0) return;
    v38LibNames(r).forEach(function (n) {
      var w = v38Whole(n);
      if (w && !Object.prototype.hasOwnProperty.call(whole, w)) whole[w] = r;
      putBare(v38Bare(n), r);
    });
    var s = v38ShortWho(r.p);
    if (s && s !== r.p.trim()) putBare(v38Bare(s), r);
  });
  V38_LIB = { list: WINE_PRODUCERS, n: WINE_PRODUCERS.length, whole: whole, bare: bare };
  return V38_LIB;
}
/* The record one of the names holds, whole names first; null when none does. */
function v38Library(names) {
  var ix = v38LibIndex();
  if (!ix) return null;
  var hit = null;
  names.some(function (n) { var w = v38Whole(n); if (w && ix.whole[w]) { hit = ix.whole[w]; return true; } return false; });
  if (hit) return hit;
  names.some(function (n) { var b = v38Bare(n); if (b && ix.bare[b]) { hit = ix.bare[b]; return true; } return false; });
  return hit;
}

/* =========== the house's wine producers =========== */

/* Every component with a kept producer whose who is written and which
   reaches a wine of the house, in the house's order, with the wines it
   reaches. Kept against the house object it was read from: the engine hands
   back a new one for every saved change, and a screen asks several times a
   paint (read them, never change them). */
var V38_MEMO = { h: null, rows: [], byName: null };
function v38Rows(h) {
  if (!h) return [];
  if (V38_MEMO.h === h && V38_MEMO.lib === (typeof WINE_PRODUCERS !== 'undefined' && Array.isArray(WINE_PRODUCERS) ? WINE_PRODUCERS.length : 0)) return V38_MEMO.rows;
  var wines = {};
  (Array.isArray(h.wines) ? h.wines : []).forEach(function (w) { if (w && typeof w.id === 'string' && v38Str(w.name)) wines[w.id] = w; });
  var rows = [];
  (Array.isArray(h.components) ? h.components : []).forEach(function (c) {
    if (!c || typeof c.id !== 'string') return;
    var p = v38Kept(c.producer);
    if (!p || typeof p !== 'object' || Array.isArray(p) || !v38Str(p.who)) return;
    var mine = [];
    (Array.isArray(c.itemIds) ? c.itemIds : []).forEach(function (id) { var w = wines[id]; if (w && mine.indexOf(w) < 0) mine.push(w); });
    if (!mine.length) return;
    var who = v38Str(p.who);
    var row = {
      id: c.id, name: v38Str(c.name), who: who, short: v38ShortWho(who), type: v38Str(p.type), where: v38Str(p.where), founded: v38Str(p.founded),
      sayIt: v38Str(p.sayIt), facts: v38List(p.facts), history: v38Str(p.history), notes: v38List(p.notes), ask: v38List(p.askKitchen),
      wines: mine.map(function (w) { return { id: w.id, name: v38Str(w.name), producer: v38Str(w.producer), wine: v38Str(w.wine), vintage: v38Str(w.vintage), region: v38Str(w.region) }; })
    };
    var placed = '';
    row.wines.some(function (w) { if (w.region) { placed = w.region; return true; } return false; });
    row.group = v38GroupOf(placed || row.where);
    /* each wine's producer as the house prints it, and up to its aside as the
       who is read (Pazo das Bruxas (Familia Torres) is Pazo das Bruxas too) */
    row.names = [row.who, row.short].concat(row.wines.map(function (w) { return w.producer; }), row.wines.map(function (w) { return v38ShortWho(w.producer); })).filter(function (n, i, all) { return n && all.indexOf(n) === i; });
    row.lib = v38Library(row.names);
    /* the names the Codex's own record answers to, read by the full list's
       rows alone: the list may print the estate as the record does */
    row.alias = row.lib ? v38LibNames(row.lib) : [];
    rows.push(row);
  });
  V38_MEMO = { h: h, rows: rows, byName: null, lib: (typeof WINE_PRODUCERS !== 'undefined' && Array.isArray(WINE_PRODUCERS) ? WINE_PRODUCERS.length : 0) };
  return rows;
}
function v38RowById(h, cid) {
  var hit = null;
  v38Rows(h).some(function (r) { if (r.id === cid) { hit = r; return true; } return false; });
  return hit;
}
/* The producers behind one wine, in the house's order. */
function v38RowsFor(h, wid) {
  return v38Rows(h).filter(function (r) { return r.wines.some(function (w) { return w.id === wid; }); });
}
/* The house's producer a name names, by the same whole then bare rule, over
   its own names and its Codex record's; a name two producers share answers
   neither. */
function v38RowByName(h, name) {
  var rows = v38Rows(h);
  if (!rows.length || !v38Str(name)) return null;
  if (!V38_MEMO.byName) {
    var whole = {}, bare = {};
    var put = function (map, k, r) { if (!k) return; map[k] = Object.prototype.hasOwnProperty.call(map, k) && map[k] !== r ? false : r; };
    rows.forEach(function (r) { r.names.concat(r.alias || []).forEach(function (n) { put(whole, v38Whole(n), r); put(bare, v38Bare(n), r); }); });
    V38_MEMO.byName = { whole: whole, bare: bare };
  }
  var ix = V38_MEMO.byName;
  var w = v38Whole(name);
  if (w && ix.whole[w]) return ix.whole[w];
  if (Object.prototype.hasOwnProperty.call(ix.whole, w)) return null;
  var b = v38Bare(name);
  return b && ix.bare[b] ? ix.bare[b] : null;
}
/* The rows by region, in the groups' order, each group sorted by its bare name. */
function v38ByGroup(rows) {
  return V38_GROUPS.map(function (g) {
    var mine = rows.filter(function (r) { return r.group === g.key; }).slice().sort(function (a, b) {
      var x = v38Bare(a.short), y = v38Bare(b.short);
      return x < y ? -1 : x > y ? 1 : 0;
    });
    return { key: g.key, label: g.label, rows: mine };
  }).filter(function (g) { return g.rows.length; });
}
function v38WineCount(rows) {
  var seen = {};
  rows.forEach(function (r) { r.wines.forEach(function (w) { seen[w.id] = 1; }); });
  return Object.keys(seen).length;
}

/* =========== one producer, as the card and the view draw it =========== */

/* where and since when, how to say it, the facts, the story, the notes,
   Ask the sommelier, and the Codex's own entry when it holds one; door is the
   attribute that opens that entry (codex28's on a card, this view's here) */
function v38BodyHtml(r, door) {
  var dl = [];
  if (r.where) dl.push('<dt>' + v38W('where') + '</dt><dd>' + v38Esc(r.where) + '</dd>');
  if (r.founded) dl.push('<dt>' + v38W('founded') + '</dt><dd>' + v38Esc(r.founded) + '</dd>');
  var list = function (key, items) {
    return items.length ? '<h4 class="v28-eyebrow">' + v38W(key) + '</h4><ul class="v28-list">' + items.map(function (t) { return '<li>' + v38Esc(t) + '</li>'; }).join('') + '</ul>' : '';
  };
  return (dl.length ? '<dl class="v28-dl">' + dl.join('') + '</dl>' : '')
    + (r.sayIt ? '<p><span class="v28-soft">' + v38W('say') + ':</span> ' + v38Esc(r.sayIt) + '</p>' : '')
    + list('facts', r.facts)
    + (r.history ? '<h4 class="v28-eyebrow">' + v38W('story') + '</h4>' + v38Paras(r.history) : '')
    + list('notes', r.notes)
    + list('ask', r.ask)
    + (r.lib && r.lib.id ? '<p><button type="button" class="v28-link v35-door v38-lib" ' + door + ' data-k="' + v38Esc(r.lib.id) + '">' + v38W('inLibrary') + '</button></p>' : '');
}

/* Who makes it, on a wine's card: nothing when no kept producer reaches it. */
function v38WhoHtml(h, wid) {
  var rows = v38RowsFor(h, wid);
  if (!rows.length) return '';
  var cards = v38ItemCards(h, wid).length;
  return '<section class="v28-block v38-who" aria-labelledby="v38-who-h"><h3 class="secgroup" id="v38-who-h">' + v38W('whoMakes') + '</h3><ul class="v35-comps v38-prods">'
    + rows.map(function (r) {
      return '<li data-producer="' + v38Esc(r.id) + '"><details class="v28-q v35-comp v38-prod"><summary>' + v38Esc(r.who) + '</summary><div class="v35-body">'
        + v38BodyHtml(r, 'data-v28="producer" id="v38-lib-' + v38Esc(r.id) + '"') + '</div></details></li>';
    }).join('') + '</ul>'
    + '<div class="v28-btnrow">'
    + (cards ? '<button type="button" class="btn gold" data-v28="v38flash" data-id="' + v38Esc(wid) + '">' + v38W('flashThese') + '</button>' : '')
    + '<button type="button" class="btn ghost" data-v28="v38all">' + v38W('allProducers') + '</button></div></section>';
}

/* Above What it's made of when the card shows it, else before the five
   parts, else before the service note, as codex35 places its own. */
if (typeof v28CardHtml === 'function') {
  var _v38CardHtml = v28CardHtml;
  v28CardHtml = function (id) {
    var html = _v38CardHtml(id);
    var h = v38House();
    if (!html || !h) return html;
    var block = v38WhoHtml(h, id);
    if (!block) return html;
    var at = html.indexOf('<section class="v28-block v35-madeof"');
    if (at < 0 && typeof v28W === 'function') at = html.indexOf('<section class="v28-block"><h3 class="secgroup">' + v28W('parts') + '</h3>');
    if (at < 0 && typeof v28W === 'function') at = html.indexOf('<section class="v28-block"><p class="v28-eyebrow">' + v28W('eyebrow'));
    if (at < 0) return html;
    return html.slice(0, at) + block + html.slice(at);
  };
}

/* A producer is told once on a card, in Who makes it. codex35's What it's
   made of leaves out: a component that holds nothing kept but its
   producer (it would stand as an empty disclosure); the component of a
   producer Who makes it draws on this card (its explanation is the opening
   of the profile's story, said again); and a story under that producer's
   own name (an older story of the same house, Domaine Leflaive beside
   Domaine Leflaive). A component with a film stays, so the film is still
   on the card. Its card stays in the component decks of the Flashcards. */
if (typeof v35Groups === 'function') {
  var _v38Groups = v35Groups;
  v35Groups = function (h, id) {
    var groups = _v38Groups.apply(this, arguments);
    var told = {}, names = {};
    (h && id ? v38RowsFor(h, id) : []).forEach(function (r) {
      told[r.id] = 1;
      [r.name, r.short].forEach(function (n) { var f = v38Whole(n); if (f) names[f] = 1; });
    });
    var films = function (c) { return typeof v35Videos === 'function' && v35Videos(h, c.id).length > 0; };
    var drop = function (c) {
      if (!c || films(c)) return false;
      if (v38Kept(c.producer) && !v38Str(v38Kept(c.say)) && !v38Str(v38Kept(c.explain)) && !v38Kept(c.card)) return true;
      if (told[c.id]) return true;
      return c.kind === 'story' && Object.prototype.hasOwnProperty.call(names, v38Whole(c.name));
    };
    return (Array.isArray(groups) ? groups : []).map(function (g) {
      var out = {};
      Object.keys(g).forEach(function (k) { out[k] = g[k]; });
      out.components = (Array.isArray(g.components) ? g.components : []).filter(function (c) { return !drop(c); });
      return out;
    }).filter(function (g) { return g.components.length; });
  };
  /* The wine's own component deck keeps every kept component, the producer's
     among them: the trim above is for what the card draws, and the deck is
     built from the untrimmed groups, in the same order codex35 deals them. */
  if (typeof v35ItemCards === 'function' && typeof v35Cards === 'function') {
    v35ItemCards = function (h, id) {
      if (!h || !Array.isArray(h.wines) || !h.wines.some(function (w) { return w && w.id === id; })) return [];
      var cards = v35Cards(h, 'all');
      var out = [];
      _v38Groups(h, id).forEach(function (g) {
        g.components.forEach(function (c) { cards.forEach(function (x) { if (x.id === c.id) out.push(x); }); });
      });
      return out;
    };
  }
}

/* =========== the cards =========== */

/* The house as the engine should read it for the wine producers: the wines
   those producers reach and only their components, so a card's list of
   wines and a question's wrong answers are the list's own. */
function v38WineView(h, rows) {
  var keep = {}, reach = {};
  rows.forEach(function (r) { keep[r.id] = 1; r.wines.forEach(function (w) { reach[w.id] = 1; }); });
  var out = {};
  Object.keys(h).forEach(function (k) { out[k] = h[k]; });
  out.dishes = []; out.cocktails = []; out.lexicon = []; out.mixUps = []; out.scenarios = []; out.tastings = [];
  out.wines = (Array.isArray(h.wines) ? h.wines : []).filter(function (w) { return w && reach[w.id]; });
  out.components = (Array.isArray(h.components) ? h.components : []).filter(function (c) { return c && keep[c.id]; });
  return out;
}

/* The engine's own rules for a card's back, said here for an older engine. */
var V38_MONTH = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/;
function v38FoundedSentence(founded) {
  var f = v38Str(founded).replace(/[\s.]+$/, '');
  if (!f) return '';
  return /^[0-9a-z]/.test(f) || V38_MONTH.test(f) ? 'Founded ' + f : f;
}
function v38JoinSentences(parts) {
  var kept = parts.map(function (p) { return v38Str(p).replace(/[\s.]+$/, ''); }).filter(Boolean);
  return kept.length ? kept.join('. ') + '.' : '';
}
function v38FirstSentence(text) {
  var t = v38Str(String(text || '').split(/\n\s*\n/)[0]);
  var m = /^[\s\S]*?[.!?](?=\s|$)/.exec(t);
  return v38Str(m ? m[0] : t);
}
function v38SayList(names) {
  if (names.length < 2) return names.join('');
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
}
function v38CardsLocal(rows) {
  var out = [];
  rows.forEach(function (r) {
    var who = v38JoinSentences([r.where, v38FoundedSentence(r.founded)]);
    if (who) out.push({ kind: 'producer', front: r.short + (r.founded ? ': where, and since when?' : ': where from?'), back: who, itemId: r.id, n: 0 });
    var point = r.facts[0] || v38FirstSentence(r.history);
    if (point) out.push({ kind: 'producer', front: r.short + ': one thing to know', back: point, itemId: r.id, n: 1 });
    if (r.wines.length) out.push({ kind: 'producer', front: r.short + v38W('whichWines'), back: v38SayList(r.wines.map(function (w) { return w.name; })) + '.', itemId: r.id, n: 2 });
  });
  return out;
}

/* Every producer card of the house, in the house's order: the engine's
   buildFlashcards when it deals the producer kind, else the same three made
   here; each as the card screen deals it, { kind, id, n, front, back, label, group }. */
var V38_CARDS = { h: null, cards: [] };
function v38Cards(h) {
  if (!h) return [];
  if (V38_CARDS.h === h) return V38_CARDS.cards;
  var rows = v38Rows(h);
  var raw = [];
  if (rows.length) {
    var lib = v38HouseLib();
    var kinds = lib && lib.drills && Array.isArray(lib.drills.FLASHCARD_KINDS) ? lib.drills.FLASHCARD_KINDS : [];
    var build = kinds.indexOf('producer') >= 0 ? (typeof lib.buildFlashcards === 'function' ? lib.buildFlashcards : (lib.drills && typeof lib.drills.buildFlashcards === 'function' ? lib.drills.buildFlashcards : null)) : null;
    try { raw = build ? (build(v38WineView(h, rows)) || []).filter(function (c) { return c && c.kind === 'producer'; }) : v38CardsLocal(rows); }
    catch (e) { raw = v38CardsLocal(rows); }
  }
  var cards = [];
  raw.forEach(function (c) {
    var row = null;
    rows.some(function (r) { if (r.id === c.itemId) { row = r; return true; } return false; });
    var front = v38Str(c.front), back = v38Str(c.back);
    if (!row || !front || !back) return;
    /* the engine asks of drinks; the Codex asks of its wines */
    if (c.n === 2) front = front.replace(/: which drinks\?$/, v38W('whichWines'));
    cards.push({ kind: 'producer', id: row.id, n: c.n, front: front, back: back, label: v38W('cardLabel'), group: row.group });
  });
  V38_CARDS = { h: h, cards: cards };
  return cards;
}
/* One wine's producer cards, its producers in the card's order. */
function v38ItemCards(h, wid) {
  var cards = v38Cards(h);
  var out = [];
  v38RowsFor(h, wid).forEach(function (r) { cards.forEach(function (c) { if (c.id === r.id) out.push(c); }); });
  return out;
}

/* Each producer card is graded on its own, as the World Table grades
   card-producer-{n} under the component: h-{component id}-producer-{n},
   n the card's place among the producer's three (who and where, one thing
   to know, which of our wines). */
function v38CardKey(c) { return 'h-' + c.id + '-producer-' + (Number(c.n) || 0); }

/* The newest verdict on every producer card, read in one pass over the
   records: again when its key holds a wrong answer and no streak, got it
   when anything was answered; { 'component id/n': 'got' | 'again' }. */
function v38Verdicts() {
  var q = (typeof ST !== 'undefined' && ST && ST.q) ? ST.q : {};
  var out = {};
  Object.keys(q).forEach(function (k) {
    var bare = k.indexOf('|') > -1 ? k.slice(k.indexOf('|') + 1) : k;
    var m = /^h-(c-[a-z0-9]{8})-producer-(\d)$/.exec(bare);
    if (!m) return;
    var key = m[1] + '/' + m[2];
    var r = q[k] || {};
    if ((Number(r.w) || 0) > 0 && !(Number(r.s) || 0)) out[key] = 'again';
    else if ((Number(r.c) || 0) + (Number(r.w) || 0) > 0 && out[key] !== 'again') out[key] = 'got';
  });
  return out;
}
/* One card's verdict, or null when it was never answered. */
function v38Latest(c) { return c ? v38Verdicts()[c.id + '/' + (Number(c.n) || 0)] || null : null; }

/* =========== the decks =========== */

if (typeof v32DeckDef === 'function') {
  var _v38DeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    var s = String(id || '');
    var m = null;
    if (s === 'producers' || (m = /^producers:([a-z-]+)$/.exec(s)) || (m = /^item-producers:(w-[a-z0-9]{8})$/.exec(s))) {
      if (m && s.indexOf('producers:') === 0 && !V38_GROUP_RE.test(m[1])) return _v38DeckDef(id);
      var h = v38House();
      var def = { id: s, name: '', cards: [], kind: 'producer' };
      if (s === 'producers') { def.name = v38W('everyProducer'); def.cards = v38Cards(h); }
      else if (s.indexOf('producers:') === 0) { def.name = v38W('groupDeck', { group: v38Group(m[1]).label }); def.cards = v38Cards(h).filter(function (c) { return c.group === m[1]; }); }
      else {
        var w = h && Array.isArray(h.wines) ? h.wines.filter(function (x) { return x && x.id === m[1]; })[0] : null;
        def.name = v38W('itemDeck', { name: w ? w.name : 'One wine' });
        def.cards = v38ItemCards(h, m[1]);
      }
      def.learnt = v32Learnt(def);
      return def;
    }
    return _v38DeckDef(id);
  };
}
if (typeof v32Learnt === 'function') {
  var _v38Learnt = v32Learnt;
  v32Learnt = function (def) {
    if (def && def.kind === 'producer') { var v = v38Verdicts(); return def.cards.filter(function (c) { return v[c.id + '/' + (Number(c.n) || 0)] === 'got'; }).length; }
    return _v38Learnt(def);
  };
}
/* One wine's producers are dealt in the order its card shows them. */
if (typeof v32StartRun === 'function') {
  var _v38StartRun = v32StartRun;
  v32StartRun = function (deckId, opts) {
    var o = opts || {};
    if (/^item-producers:/.test(String(deckId || ''))) o.keepOrder = true;
    return _v38StartRun(deckId, o);
  };
}
/* A producer card's grade is recorded as a word's is, under the card's own key. */
if (typeof v32Grade === 'function') {
  var _v38Grade = v32Grade;
  v32Grade = function (got) {
    var r = S._v32run;
    var c = r && r.flip && r.deck && r.deck.length ? r.cards[r.deck[0]] : null;
    if (c && c.kind === 'producer' && typeof v27RecordHouse === 'function') v27RecordHouse(v38CardKey(c), 'Our List', c.front, !!got);
    return _v38Grade(got);
  };
}
if (typeof v32CardFace === 'function') {
  var _v38CardFace = v32CardFace;
  v32CardFace = function (c, run) {
    if (!c || c.kind !== 'producer') return _v38CardFace(c, run);
    var head = '<span class="v28-eyebrow v28-ink">' + v32W('front') + (c.label ? ' \u00b7 ' + v38Esc(c.label) : '') + '</span>';
    if (!run.flip) return '<button type="button" class="card v28-front" data-v32="flip" id="v32-face">' + head + '<span class="v28-fname">' + v38Esc(c.front) + '</span></button>';
    return '<div class="card v28-back" id="v32-face"><p class="v28-eyebrow v28-ink">' + v32W('answer') + (c.label ? ' \u00b7 ' + v38Esc(c.label) : '') + '</p>'
      + '<h3 class="v28-bname" tabindex="-1" id="v32-ans">' + v38Esc(c.front) + '</h3><p>' + v38Esc(c.back) + '</p></div>';
  };
}
/* The Flashcards root: every producer and a deck per region, under the house. */
if (typeof v32FlashcardsHtml === 'function') {
  var _v38FlashcardsHtml = v32FlashcardsHtml;
  v32FlashcardsHtml = function () {
    var html = _v38FlashcardsHtml();
    var h = v38House();
    if (!h || typeof v32Group !== 'function' || typeof v32DeckRow !== 'function') return html;
    var rows = v38Rows(h);
    if (!rows.length) return html;
    var decks = v32DeckRow('producers', v38W('everyProducer'))
      + v38ByGroup(rows).map(function (g) { return v32DeckRow('producers:' + g.key, g.label); }).join('');
    var group = v32Group(v38W('fcGroup'), decks, 'v38-fc-prod');
    if (!group) return html;
    var rest = html.indexOf('aria-labelledby="v32-fc-rest"');
    var at = rest >= 0 ? html.indexOf('</section>', rest) : -1;
    if (at >= 0) at += '</section>'.length;
    else {
      at = html.indexOf('<section class="v32-group" aria-labelledby="v35-fc-made"');
      if (at < 0) at = html.indexOf('<section class="v32-group" aria-labelledby="v32-fc-lv"');
      if (at < 0) at = html.lastIndexOf('</div>');
    }
    return at < 0 ? html : html.slice(0, at) + group + html.slice(at);
  };
}

/* =========== the quiz =========== */

/* The engine's dealer, when it knows the producer kinds. */
function v38Dealer() {
  var lib = v38HouseLib();
  return lib && typeof lib.dealQuestion === 'function' && lib.drills && Array.isArray(lib.drills.PRODUCER_KINDS) ? lib : null;
}
/* A wine named without its maker: its own name and vintage, else the name
   the list prints, whichever carries none of its producers' names. */
function v38Stem(w, rows) {
  var names = [];
  var add = function (n) {
    [v38Whole(n), v38Bare(n)].forEach(function (f) { if (f.length >= 3 && names.indexOf(f) < 0) names.push(f); });
  };
  rows.forEach(function (r) { r.names.forEach(add); });
  if (w.producer) add(w.producer);
  var tries = [[v38Str(w.wine), v38Str(w.vintage)].filter(Boolean).join(' '), v38Str(w.name)];
  var hit = '';
  tries.some(function (t) {
    if (!t) return false;
    var f = v38Fold(t);
    if (names.some(function (n) { return f.indexOf(' ' + n + ' ') >= 0; })) return false;
    hit = t;
    return true;
  });
  return hit;
}
/* What the producer kinds deal over, read once per house: the wines a kept
   producer reaches, each named without its maker, two wines of different
   producers that would read the same left out, two of the same producers
   that would read the same kept once (the house's glass and bottle of one
   Champagne, whose labels differ only in a straight and a curly
   apostrophe, are one answer, never two options), each with the producers
   it is theirs. */
var V38_QV = { h: null, base: null, pour: null };
function v38QuizMemo(h) {
  if (V38_QV.h !== h) V38_QV = { h: h, base: undefined, pour: undefined };
  return V38_QV;
}
function v38ProducerBase(h) {
  var memo = v38QuizMemo(h);
  if (memo.base !== undefined) return memo.base;
  var rows = v38Rows(h);
  if (rows.length < 2) { memo.base = null; return null; }
  var by = {};
  var named = v38WineView(h, rows).wines.map(function (w) {
    var mine = rows.filter(function (r) { return r.wines.some(function (x) { return x.id === w.id; }); });
    var stem = v38Stem(w, mine);
    var who = mine.map(function (r) { return r.id; }).sort().join('|');
    var key = v38Whole(stem);
    if (stem) { if (!by[key]) by[key] = {}; by[key][who] = 1; }
    return { w: w, stem: stem, key: key, owners: mine.map(function (r) { return r.id; }) };
  });
  var once = {};
  memo.base = {
    rows: rows,
    wines: named.filter(function (x) {
      if (!x.stem || Object.keys(by[x.key]).length !== 1 || once[x.key]) return false;
      once[x.key] = 1;
      return true;
    }).map(function (x) {
      var c = {};
      Object.keys(x.w).forEach(function (k) { c[k] = x.w[k]; });
      c.name = x.stem;
      return { w: c, owners: x.owners };
    })
  };
  return memo.base;
}
/* The engine deals a kind by dealing every item it can ask about, each deal
   reading the whole view, so a list of two hundred producers is asked about
   a dozen at a time: each call draws its own dozen, and every wrong answer
   is another of the list's wine producers. */
var V38_SAMPLE = 12;
function v38Sample(rows) {
  if (rows.length <= V38_SAMPLE) return rows.slice();
  var pick = (typeof shuffle === 'function') ? shuffle(rows.slice()) : rows.slice();
  return pick.slice(0, V38_SAMPLE);
}
/* The view the three producer kinds deal over: a dozen of the list's wine
   producers, only their components and only their wines, named as the base
   names them. */
function v38ProducerView(h) {
  if (!h || !v38Dealer()) return null;
  var base = v38ProducerBase(h);
  if (!base) return null;
  var keep = {};
  v38Sample(base.rows).forEach(function (r) { keep[r.id] = 1; });
  var view = {};
  Object.keys(h).forEach(function (k) { view[k] = h[k]; });
  view.dishes = []; view.cocktails = []; view.lexicon = []; view.mixUps = []; view.scenarios = []; view.tastings = [];
  view.components = (Array.isArray(h.components) ? h.components : []).filter(function (c) { return c && keep[c.id]; });
  view.wines = base.wines.filter(function (x) { return x.owners.some(function (id) { return keep[id]; }); }).map(function (x) { return x.w; });
  return view;
}
/* The view the pour question deals over: the dishes as they are, and each
   wine a kept producer reaches named by its producer, so the engine's first
   pick round asks whose wine it is. */
function v38PourView(h) {
  if (!h || !v38Dealer()) return null;
  var memo = v38QuizMemo(h);
  if (memo.pour !== undefined) return memo.pour;
  var rows = v38Rows(h);
  if (rows.length < 2) { memo.pour = null; return null; }
  var whose = {};
  rows.forEach(function (r) { r.wines.forEach(function (w) { if (!whose[w.id]) whose[w.id] = r.short; }); });
  var out = {};
  Object.keys(h).forEach(function (k) { out[k] = h[k]; });
  out.cocktails = []; out.lexicon = []; out.mixUps = []; out.scenarios = []; out.tastings = []; out.components = [];
  out.dishes = Array.isArray(h.dishes) ? h.dishes : [];
  out.wines = (Array.isArray(h.wines) ? h.wines : []).filter(function (w) { return w && whose[w.id]; }).map(function (w) {
    var c = {};
    Object.keys(w).forEach(function (k) { c[k] = w[k]; });
    c.name = whose[w.id];
    return c;
  });
  memo.pour = out;
  return out;
}
var V38_KINDS = [
  { key: 'producerOf', kind: 'producerOf', view: v38ProducerView, label: function () { return v38W('qOf'); } },
  { key: 'producerWhere', kind: 'producerWhere', view: v38ProducerView, label: function () { return v38W('qWhere'); } },
  { key: 'producerDish', kind: 'producerDish', view: v38ProducerView, label: function () { return v38W('qDish'); } },
  { key: 'producerPour', kind: 'firstPickFor', view: v38PourView, label: function () { return v38W('qPour'); } }
];
(function () {
  if (typeof V27_CELLAR_KINDS === 'undefined' || !V27_CELLAR_KINDS || typeof V27_CELLAR_KINDS.push !== 'function') return;
  V38_KINDS.forEach(function (k) { if (!V27_CELLAR_KINDS.some(function (x) { return x && x.key === k.key; })) V27_CELLAR_KINDS.push(k); });
})();

/* =========== the house's producers, a view of its own =========== */

function v38State() {
  if (!S._v38 || typeof S._v38 !== 'object') S._v38 = { open: null, g: '' };
  return S._v38;
}

function v38Head(title, sub) {
  if (typeof v32Head === 'function') return v32Head(title, sub);
  return '<div class="viewhead"><h2 tabindex="-1">' + v38Esc(title) + '</h2>' + (sub ? '<div class="sub">' + v38Esc(sub) + '</div>' : '') + '</div>';
}

function v38ListHtml(h, rows, st) {
  var groups = v38ByGroup(rows);
  if (st.g && !groups.some(function (g) { return g.key === st.g; })) st.g = '';
  var shown = st.g ? groups.filter(function (g) { return g.key === st.g; }) : groups;
  var html = '<p class="v32-line">' + v38Esc(v38W('countLine', { n: v38Plural(rows.length, 'producer', 'producers'), m: v38Plural(v38WineCount(rows), 'wine', 'wines') })) + '</p>';
  html += '<div class="v32chips v38-chips" role="group" aria-label="' + v38W('regions') + '">'
    + '<button type="button" class="v28-chip" id="v38-g-all" data-v38="group" data-g="" aria-pressed="' + (!st.g ? 'true' : 'false') + '">' + v38W('allChip', { n: rows.length }) + '</button>'
    + groups.map(function (g) {
      return '<button type="button" class="v28-chip" id="v38-g-' + g.key + '" data-v38="group" data-g="' + g.key + '" aria-pressed="' + (st.g === g.key ? 'true' : 'false') + '">' + v38Esc(g.label) + ' ' + g.rows.length + '</button>';
    }).join('') + '</div>';
  var deck = st.g ? 'producers:' + st.g : 'producers';
  var def = typeof v32DeckDef === 'function' ? v32DeckDef(deck) : null;
  if (def && def.cards.length) html += '<div class="v28-btnrow"><button type="button" class="btn gold" id="v38-flash" data-v38="flash" data-deck="' + deck + '">' + v38W('flashThese') + '</button></div>';
  shown.forEach(function (g) {
    var items = g.rows.map(function (r) {
      var line = [r.where, v38Plural(r.wines.length, 'wine', 'wines') + ' on our list'].filter(Boolean).join(' \u00b7 ');
      return '<li><button class="v25row" type="button" id="v38-p-' + v38Esc(r.id) + '" data-v38="open" data-k="' + v38Esc(r.id) + '">'
        + '<span class="v25row-name">' + v38Esc(r.who) + '</span><span class="v25row-line">' + v38Esc(line) + '</span></button></li>';
    }).join('');
    html += '<section class="v32-group" aria-labelledby="v38-h-' + g.key + '"><h3 class="secgroup v32-gh" id="v38-h-' + g.key + '">' + v38Esc(g.label) + '</h3>'
      + '<ul class="v25rows v32rows">' + items + '</ul></section>';
  });
  return html;
}

function v38ProfileHtml(h, r) {
  var name = v38Str(h && h.name);
  var html = '<div class="v25page v28 v38 v38-profile" id="v38">'
    + v38Head(r.who, [name, v38Group(r.group).label].filter(Boolean).join(' \u00b7 '))
    + '<div class="v38-body">' + v38BodyHtml(r, 'data-v38="lib" id="v38-lib"') + '</div>'
    + '<section class="v32-group" aria-labelledby="v38-onlist"><h3 class="secgroup v32-gh" id="v38-onlist">' + v38W('onList') + '</h3>'
    + '<div class="v38-wines" role="group" aria-label="' + v38W('onList') + '">'
    + r.wines.map(function (w) { return '<button type="button" class="v28-chip" id="v38-w-' + v38Esc(w.id) + '" data-v38="wine" data-id="' + v38Esc(w.id) + '">' + v38Esc(w.name) + '</button>'; }).join('')
    + '</div></section>';
  return html + '</div>';
}

function v38ViewHtml() {
  var h = v38House();
  var st = v38State();
  var rows = v38Rows(h);
  if (st.open && h) {
    var r = v38RowById(h, st.open);
    if (r) return v38ProfileHtml(h, r);
    st.open = null;
  }
  var html = '<div class="v25page v28 v38" id="v38">' + v38Head((h && v38Str(h.name)) || v38W('viewName'), v38W('viewSub'));
  if (!h) return html + '<p class="v32-line">' + v38W('noHouse') + '</p></div>';
  if (!rows.length) return html + '<p class="v32-line">' + v38W('noneYet') + '</p></div>';
  return html + v38ListHtml(h, rows, st) + '</div>';
}

function v38FocusId(id) {
  try { var n = document.getElementById(id); if (n && typeof n.focus === 'function') n.focus({ preventScroll: true }); } catch (e) { }
}
function v38Pend(mode) { try { if (typeof V32 !== 'undefined' && V32) V32.pend = mode; } catch (e) { } }
function v38Remember(node) { try { if (typeof v32Remember === 'function') v32Remember(node); } catch (e) { } }

/* Opens the view, on one producer's profile when a component id is given. */
function v38Open(cid) {
  var st = v38State();
  st.open = cid && V38_CID_RE.test(cid) ? cid : null;
  if (!st.open) st.g = '';
  try { if (typeof v32PushOpener === 'function') v32PushOpener(); } catch (e) { }
  S._v28edit = false;
  S.view = 'houseproducers';
  v38Pend('push');
  render();
  if (typeof v25FocusMain === 'function') { try { v25FocusMain(); } catch (e) { } }
  return true;
}

function v38Act(act, node) {
  var get = function (k) { return node && typeof node.getAttribute === 'function' ? (node.getAttribute(k) || '') : ''; };
  var st = v38State();
  switch (act) {
    case 'open': {
      var k = get('data-k');
      if (!V38_CID_RE.test(k)) return;
      v38Remember(node);
      st.open = k;
      v38Pend('push'); render();
      if (typeof v25FocusMain === 'function') { try { v25FocusMain(); } catch (e) { } }
      return;
    }
    case 'group': {
      var g = get('data-g');
      st.g = V38_GROUP_RE.test(g) ? g : '';
      v38Pend('replace'); render();
      v38FocusId(st.g ? 'v38-g-' + st.g : 'v38-g-all');
      return;
    }
    case 'flash':
      v38Remember(node);
      if (typeof v32StartRun === 'function') v32StartRun(get('data-deck'), { push: true });
      return;
    case 'wine': {
      var id = get('data-id');
      v38Remember(node);
      if (typeof v32OpenWine === 'function') { v32OpenWine(id); return; }
      if (typeof v28State === 'function' && typeof v28Open === 'function') { var vs = v28State(); vs.q = ''; vs.sec = ''; S.view = 'cellar'; v28Open(id, false); }
      return;
    }
    case 'lib':
      v38Remember(node);
      if (typeof v28Act === 'function') v28Act('producer', node);
      return;
    default: return;
  }
}

function v38Wire(box) {
  if (!box || typeof box.addEventListener !== 'function') return;
  box.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v38]') : null;
    if (!node || node.disabled) return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    v38Act(node.getAttribute('data-v38'), node);
  });
}

function v38View() {
  var html = v38ViewHtml();
  if (typeof v32Build === 'function') return v32Build(html, v38Wire);
  var box = document.createElement('div');
  box.innerHTML = html;
  v38Wire(box);
  return box;
}

/* =========== the doors into the view =========== */

/* A card's two buttons. */
if (typeof v28Act === 'function') {
  var _v38Act = v28Act;
  v28Act = function (act, node) {
    if (act === 'v38flash') {
      var id = node && typeof node.getAttribute === 'function' ? node.getAttribute('data-id') || '' : '';
      if (typeof v32StartRun === 'function') v32StartRun('item-producers:' + id, { push: true, keepOrder: true });
      return;
    }
    if (act === 'v38all') { v38Open(null); return; }
    return _v38Act(act, node);
  };
}

/* Our Wine List: Our producers among its buttons. */
if (typeof v28StudyHtml === 'function') {
  var _v38StudyHtml = v28StudyHtml;
  v28StudyHtml = function () {
    var html = _v38StudyHtml.apply(this, arguments);
    if (!html || !v38Rows(v38House()).length) return html;
    var at = html.indexOf('<div class="v28-actions">');
    var end = at >= 0 ? html.indexOf('</div>', at) : -1;
    if (end < 0) return html;
    return html.slice(0, end) + '<button type="button" class="btn small ghost" data-v28="v38all">' + v38W('ourProducers') + '</button>' + html.slice(end);
  };
}

/* The level page's My restaurant: The producers among its quiet links. */
if (typeof v32RestaurantHtml === 'function') {
  var _v38RestaurantHtml = v32RestaurantHtml;
  v32RestaurantHtml = function () {
    var html = _v38RestaurantHtml.apply(this, arguments);
    if (!html || !v38Rows(v38House()).length) return html;
    var link = '<button type="button" class="v32quiet" data-go="houseproducers">' + v38W('theProducers') + '</button>';
    var at = html.indexOf('<div class="v32quietrow">');
    var end = at >= 0 ? html.indexOf('</div>', at) : -1;
    if (end >= 0) return html.slice(0, end) + link + html.slice(end);
    var close = html.lastIndexOf('</section>');
    return close >= 0 ? html.slice(0, close) + '<div class="v32quietrow">' + link + '</div>' + html.slice(close) : html;
  };
}

/* The list's own word for a producer: the list files every bottle under a
   producer key, and the bottles of one key that have a card of their own
   (a house wine) say whose they are. A key whose cards reach one house
   producer and no other is that producer, however the list prints its
   name (Duckhorn for Duckhorn Vineyards, Banfi for Castello Banfi); a key
   whose cards reach two answers neither. Read once per list and house. */
var V38_PK = { rows: null, list: null, map: null };
function v38ByListKey(h, pk) {
  var rows = v38Rows(h);
  var list = (typeof V29_LIST !== 'undefined' && V29_LIST && Array.isArray(V29_LIST.rows)) ? V29_LIST.rows : null;
  if (!pk || !list || !rows.length) return null;
  if (V38_PK.rows !== rows || V38_PK.list !== list) {
    var byWine = {};
    rows.forEach(function (r) { r.wines.forEach(function (w) { (byWine[w.id] = byWine[w.id] || []).push(r); }); });
    var map = {};
    list.forEach(function (x) {
      if (!x || !x.pk || !x.card || !Object.prototype.hasOwnProperty.call(byWine, x.card)) return;
      var m = Object.prototype.hasOwnProperty.call(map, x.pk) ? map[x.pk] : (map[x.pk] = []);
      byWine[x.card].forEach(function (r) { if (m.indexOf(r) < 0) m.push(r); });
    });
    V38_PK = { rows: rows, list: list, map: map };
  }
  var hit = Object.prototype.hasOwnProperty.call(V38_PK.map, pk) ? V38_PK.map[pk] : null;
  return hit && hit.length === 1 ? hit[0] : null;
}

/* The list's producer named for a label: the list may file a bottle under
   the name its label carries rather than the estate's (Moulin d'Issan, the
   label Château d'Issan makes outside Margaux). A list name of two words or
   more that opens the label of a house wine, word for word, is that wine's
   producer; a name whose labels reach two producers answers neither. */
function v38ByLabel(h, name) {
  var f = v38Whole(name);
  if (!f || f.split(' ').length < 2) return null;
  var hit = [];
  v38Rows(h).forEach(function (r) {
    if (r.wines.some(function (w) { var l = v38Whole(w.wine); return l === f || l.indexOf(f + ' ') === 0; }) && hit.indexOf(r) < 0) hit.push(r);
  });
  return hit.length === 1 ? hit[0] : null;
}

/* The full list: a row whose producer has a house profile offers it, the
   bottle itself first (the row's own card), else its producer by name,
   else the list's own word for its producer (another bottle of the same
   key with a card), so a name the house prints wins over a key, and last
   the list's name as the opening of a house wine's label. */
function v38ListRowProducer(r) {
  var h = v38House();
  var rows = v38Rows(h);
  if (!rows.length || !r) return null;
  if (r.card) {
    var hit = null;
    rows.some(function (x) { if (x.wines.some(function (w) { return w.id === r.card; })) { hit = x; return true; } return false; });
    if (hit) return hit;
  }
  var p = (typeof V29_LIST !== 'undefined' && V29_LIST && V29_LIST.producers) ? V29_LIST.producers[r.pk] : null;
  var byName = p && v38Str(p.name) ? v38RowByName(h, p.name) : null;
  return byName || v38ByListKey(h, r.pk) || (p && v38Str(p.name) ? v38ByLabel(h, p.name) : null);
}
if (typeof v29DetailHtml === 'function') {
  var _v38DetailHtml = v29DetailHtml;
  v29DetailHtml = function (r) {
    var html = _v38DetailHtml.apply(this, arguments);
    var row = null;
    try { row = v38ListRowProducer(r); } catch (e) { row = null; }
    if (!row) return html;
    var btn = '<div class="v28-btnrow v38-listrow"><button type="button" class="btn small gold" data-v29="v38prof" data-k="' + v38Esc(row.id) + '">' + v38W('readProfile') + '</button></div>';
    var marks = typeof v29W === 'function' ? ['<h4 class="v28-eyebrow">' + v29W('placeHead') + '</h4>', '<h4 class="v28-eyebrow">' + v29W('hereHead') + '</h4>'] : [];
    var at = -1;
    marks.some(function (m) { at = html.indexOf(m); return at >= 0; });
    return at >= 0 ? html.slice(0, at) + btn + html.slice(at) : html + btn;
  };
}
if (typeof v29Act === 'function') {
  var _v38V29Act = v29Act;
  v29Act = function (act, node, box) {
    if (act === 'v38prof') {
      var k = node && typeof node.getAttribute === 'function' ? node.getAttribute('data-k') || '' : '';
      if (!V38_CID_RE.test(k)) return;
      /* the list's place is kept and its entry pushed, so Back comes back to the open row */
      if (typeof v29Door === 'function') v29Door();
      v38Open(k);
      return;
    }
    return _v38V29Act.apply(this, arguments);
  };
}

/* =========== a card's place, kept across a door ===========

   A door followed from a wine's card (In the Codex's producers, a grape, a
   chapter, the atlas) pushes its own entry, and Back draws the card again:
   every disclosure closed, so the page is shorter than the one the scroll
   was saved on and the person lands far below where they were, with the
   door they pressed hidden in a closed disclosure. The disclosures open on
   the card when the door was followed are noted against the card's address
   and opened again on the way back, before codex32 restores the scroll and
   focuses the door: the same card, the same height, the same place. */
var V38_OPEN = {};
function v38CardDetails() {
  try {
    var box = document.getElementById('view');
    return box && typeof box.querySelectorAll === 'function' ? Array.prototype.slice.call(box.querySelectorAll('details')) : [];
  } catch (e) { return []; }
}
function v38KeepOpen() {
  try {
    var st = typeof v28State === 'function' ? v28State() : null;
    if (S.view !== 'cellar' || !st || !st.open || typeof location === 'undefined' || !location) return;
    var all = v38CardDetails();
    var open = [];
    all.forEach(function (d, i) { if (d && d.open) open.push(i); });
    V38_OPEN[location.href] = { card: st.open, n: all.length, open: open };
  } catch (e) { }
}
function v38PutOpen() {
  try {
    if (typeof location === 'undefined' || !location) return;
    var k = V38_OPEN[location.href];
    var st = typeof v28State === 'function' ? v28State() : null;
    if (!k || S.view !== 'cellar' || !st || st.open !== k.card) return;
    var all = v38CardDetails();
    if (all.length !== k.n) return;
    k.open.forEach(function (i) { if (all[i]) all[i].open = true; });
  } catch (e) { }
}
if (typeof v28DoorPush === 'function') {
  var _v38DoorPush = v28DoorPush;
  v28DoorPush = function () { v38KeepOpen(); return _v38DoorPush.apply(this, arguments); };
}
if (typeof v32RestoreScroll === 'function') {
  var _v38RestoreScroll = v32RestoreScroll;
  v32RestoreScroll = function () { v38PutOpen(); return _v38RestoreScroll.apply(this, arguments); };
}

/* =========== the house arriving: this view drawn again ===========
   codex27 draws again, when the house lands or changes, only the screens it
   knew (home, Mine, the list, the house, the review); a first visit opened
   on a producer's address saw no house until a reload. This view is drawn
   again too: it holds no form to lose. */
if (typeof v27Redraw === 'function') {
  var _v38Redraw = v27Redraw;
  v27Redraw = function () {
    if (typeof S !== 'undefined' && S && S.view === 'houseproducers') { try { render(); } catch (e) { } return; }
    return _v38Redraw.apply(this, arguments);
  };
}

/* =========== the router: codex32's, with one more view =========== */

(function () {
  if (typeof V32_OWNER !== 'undefined' && V32_OWNER) V32_OWNER.houseproducers = 'home';
  if (typeof V32_PARENT !== 'undefined' && V32_PARENT) V32_PARENT.houseproducers = 'cellar';
  if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER.houseproducers = 'home';
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.houseproducers = function () { return v38View(); };
  if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO.houseproducers = function () { v38Open(null); };
})();

/* The address: a producer open is a screen of its own (a push), a region
   chosen is the same screen (a replace). */
if (typeof v32Route === 'function') {
  var _v38Route = v32Route;
  v32Route = function () {
    if (S.view === 'houseproducers') {
      var st = v38State();
      if (st.open) return { view: 'houseproducers', key: 'houseproducers/' + st.open, hash: '#/v/houseproducers/' + st.open };
      return { view: 'houseproducers', key: 'houseproducers', hash: '#/v/houseproducers' + (st.g ? '/g/' + st.g : '') };
    }
    return _v38Route.apply(this, arguments);
  };
}
/* An address read back: codex32 parses #/v/houseproducers/{arg}; the arg is put back here. */
if (typeof v32Apply === 'function') {
  var _v38Apply = v32Apply;
  v32Apply = function (r, state) {
    var out = _v38Apply.apply(this, arguments);
    if (r && r.view === 'houseproducers') {
      var st = v38State();
      var a = String(r.arg || '');
      var m = /^g\/([a-z-]+)$/.exec(a);
      if (V38_CID_RE.test(a)) st.open = a;
      else { st.open = null; st.g = m && V38_GROUP_RE.test(m[1]) ? m[1] : ''; }
    }
    return out;
  };
}
/* Back at depth 0: a profile climbs to the list (its region kept), the list to Our Wine List. */
if (typeof v32ParentRoute === 'function') {
  var _v38ParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    if (S.view === 'houseproducers') {
      var st = v38State();
      if (st.open) return { view: 'houseproducers', arg: st.g ? 'g/' + st.g : '' };
      return { view: 'cellar' };
    }
    return _v38ParentRoute.apply(this, arguments);
  };
}
if (typeof v25MainName === 'function') {
  var _v38MainName = v25MainName;
  v25MainName = function () {
    if (S && S.view === 'houseproducers') return v38W('viewName');
    return _v38MainName.apply(this, arguments);
  };
}
/* A reload on the view: codex32 read the address before this view was
   known, so it is read again here, once. */
(function () {
  try {
    if (typeof location === 'undefined' || !location || typeof location.hash !== 'string') return;
    if (location.hash.indexOf('#/v/houseproducers') !== 0 || typeof v32Parse !== 'function' || typeof v32Apply !== 'function') return;
    var r = v32Parse(location.hash);
    if (r && r.view === 'houseproducers') v32Apply(r, typeof v32CurState === 'function' ? v32CurState() : null);
  } catch (e) { }
})();

/* =========== the styles ===========
   The art's own components only: a wine's chip wraps its long name inside
   the screen instead of running past it. */
(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v38-style';
  css.textContent = [
    '.wrap .v38-wines{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 12px}',
    '.wrap .v38-wines .v28-chip{white-space:normal;text-align:left;max-width:100%}',
    '.wrap .v38-body{margin-top:6px}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();
