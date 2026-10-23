/* ================== CODEX XXXIX: THE REGIONS IN DEPTH ==================

   The regions layer (the regions edition, October 2026). js/data-regions.js
   carries REGIONS, one article per numbered region of every atlas sheet and
   a record per country, built by .scripts/regions/build-regions.cjs from the
   writers' fragments and joined to the Codex's own data (the TERROIR rows,
   the chapters, the grapes, the house's region strings) through REGIONS.join.
   js/data-service-ref.js carries SERVICE_REF, the service tables. This layer
   draws both and opens every door to them; the data files are never edited
   here, and a device with neither draws a line saying so.

   WHAT IT DOES, and the rule each part keeps:

   1. FOUR VIEWS through codex32's router: regions (the index, grouped by the
      atlas's map groups, the map-less countries under Also asked), country
      (the ladder, the label words, the sheet's regions as doors), region (the
      article: the land, the grapes and wines, how it is made, the law and
      the labels, the places (a place asked only from a higher level says
      so framed, asked from Premier Cru, under a key, so a level name never
      passes for a place's own cru), the producers, the house wines that join at
      runtime, what the exam asks, the traps, how to say it, the sources, each
      a closed disclosure under a chip strip) and serviceref (the tables, one
      open at a time under a chip strip). A door is a push, a chip or a step
      to the next region a replace, Back is codex32's sticky one, and a cold
      address is read again at load so a reload lands where it was.

   2. THE DOORS. Today's study gains The Wine Atlas at every level. An atlas
      sheet's numbered rows gain Read {region} in depth, and its scope line
      Read {country} in depth. A house wine's card gains the same door when
      its region string resolves (v39SlugFor: the string's country found,
      then the parts left to right, most specific first, an exact name,
      alias or TERROIR row in that country first, then a name inside a part,
      then the country), and Back from the article reopens the card. A chapter
      lists the regions it covers as chips; a revealed grape card lists the
      regions that grow it; the Library carries two doors; the Terroir Atlas
      rows carry Read in depth.

   3. THE DECKS: regions, regions:{sheet} and region:{slug} on codex32's one
      card screen, graded in the per-device slot oot-codex-regioncards-v1,
      never exported, under a group of their own on the Flashcards root.

   4. THE DRILL AND THE QUIZ: the articles' questions, minted r- by the
      builder, dealt through the core engine as the quick quiz deals (ten by
      default, every question of one region when one is asked); an r- key is
      never level progress (keyOwned), never scheduled (srsRecord) and never
      an orphan to qidAudit. The quick quiz carries two region questions at
      every level. The Quizzes root gains a group with Every region, a row
      per sheet and The Village tasting: four wines, two white and two red,
      the written grid, 45 minutes. codex20's gridStart(4), re-dealt as two
      white GRAPES profiles of the level then two red, to the written grid,
      with a 45 minute countdown that reads a word when it is up and never
      stops the run. The Quick quiz row says what it deals: five from our
      list, three from the level and two from the regions.

   5. THE READING, A SHEET AT A TIME: js/data-regions.js is the index the
      shell precaches (names, levels, summaries, grapes by name and role,
      cards and questions, the join), so every deck and drill works from
      install; the rest of each article is js/regions/<sheet>.json (and
      mapless.json), fetched the first time a page of that sheet opens,
      merged into the index's records (v39TakePart) and kept by the worker
      in a cache of its own. A page waiting on its file says so in words and
      draws itself again in place when the file lands; the index offers
      Keep every region on this device.

   6. BACK INTO A PAGE: the sections open on an article or a country page
      when it is left are noted against its address and opened again on the
      way back, before codex32 restores the scroll and focuses the door, as
      codex38 does for the house card.

   7. THE SERVICE REFERENCES DEALT: the deck service on codex32's card screen
      (its own group on the Flashcards root beside The regions, graded in the
      per-device slot oot-codex-servicecards-v1), the drill Service references
      on Quizzes through the core engine, and Flash these and Drill these on
      the references page. A question is dealt only with the s- id minted
      into the data, and an s- key is handled as an r- key is.

   8. THE HOUSE ARRIVING: v27Redraw is wrapped, as codex38 wraps it, so the
      regions, a country and an article are drawn again in place when the
      house lands, the open sections, the scroll and the focus kept.

   House rules observed: a new layer that wraps and never edits; var and
   function only; every visible string in V39_WORDS; typography, not
   pictures; every control at least 44px; ink and claret on parchment, gold
   and parchment on the dark page; British spelling; no dash of any
   spelling; nobody living named; nothing volatile stated. */

/* =========== the words =========== */

var V39_WORDS = {
  indexH: 'The regions',
  indexSub: 'From the map to the law, each read in depth',
  indexLine: '{regions} regions and {countries} countries, from the map to the law.',
  indexNone: 'The regions are not on this device yet.',
  alsoAsked: 'Also asked',
  everyMap: 'The maps',
  rowLine: '{n} regions, {m} read',
  rowLineOne: '1 region, {m} read',
  rowNoMap: 'no map yet, asked by place',
  countrySub: '{n} regions on the map',
  countrySubOne: 'One region on the map',
  countryNoMap: 'A map for {name} is to come',
  askedFrom: 'Asked from {level}',
  theLand: 'The land',
  grapesWines: 'Grapes and wines',
  howMade: 'How it is made',
  lawLabels: 'The law and the labels',
  thePlaces: 'The places',
  producers: 'Producers to know',
  onList: 'On our list',
  examAsks: 'What the exam asks',
  traps: 'Traps',
  sayIt: 'Say it',
  sources: 'Sources',
  theRegions: 'The regions',
  theLadder: 'The ladder',
  labelWords: 'The label words',
  overview: 'The country',
  climate: 'Climate',
  soils: 'Soils',
  topography: 'Topography',
  water: 'Water',
  grapesHead: 'The grapes',
  winesHead: 'The wines',
  viticulture: 'Viticulture',
  winemaking: 'Winemaking',
  /* a place's depth is a level of the Codex, never the place's own rank, so the level name never stands bare beside a place */
  placeAsked: 'asked from {level}',
  placesKey: 'A place the exam asks only from {advanced} or {master} says so after its name. Those are levels of the Codex, never the place\'s own rank, which its note gives.',
  seeMap: 'See it on the map',
  openMap: 'Open the map',
  flashRegion: 'Flash this region',
  flashSheet: 'Flash every region of {name}',
  flashOne: 'Flash {name}',
  drillRegion: 'Drill this region',
  drillName: 'Drill {name}',
  previous: 'Previous: {name}',
  next: 'Next: {name}',
  readCountry: 'Read {name}',
  readRegion: 'Read {name} in depth',
  readInDepth: 'Read in depth',
  chapterRegions: 'The regions this chapter covers',
  grapeRegions: 'Read the regions',
  grapeRegionsLead: 'Read the regions where it leads',
  libRegionsH: 'The regions, in depth',
  libRegionsLine: '{regions} regions and {countries} countries, from the map to the law',
  libRegionsBtn: 'Open the regions',
  libRefH: 'Service references',
  libRefLine: 'Faults, glassware, bottle sizes, temperatures, decanting, aperitifs, digestifs, spirits and the classic cocktails',
  libRefBtn: 'Open the references',
  atlasRow: 'The Wine Atlas',
  atlasLine: '{maps} maps and {regions} regions, each read in depth. {read} read so far.',
  everyRegion: 'Every region',
  fcGroup: 'The regions',
  cardLabel: 'Region',
  qzGroup: 'The regions',
  qzEveryLine: '{n} questions over {m} regions',
  qzSheetRow: 'Drill {name}',
  qzSheetLine: '{n} questions, ten dealt',
  tastingRow: 'The Village tasting',
  tastingLine: 'four wines, two white and two red, the written grid, 45 minutes',
  drillSection: 'The regions',
  noQuestions: 'No questions for this region yet.',
  clockLeft: '{time} left',
  clockUp: 'Time is up: finish your calls',
  refH: 'Service references',
  refSub: 'The tables a server keeps in the head',
  refTables: 'The tables',
  refNone: 'The service references are not on this device yet.',
  notes: 'Notes',
  asOf: 'as of {date}',
  opensNew: ' (opens in a new tab)',
  sections: 'The sections of this article',
  regionsOf: 'The regions of {name}',
  opening: 'Opening the rest of this page.',
  notHere: 'The rest of this page is not on this device yet. It opens with a connection and is kept for reading offline after that.',
  tryAgain: 'Try again',
  keepBtn: 'Keep every region on this device',
  keeping: 'Keeping the regions on this device',
  keptLine: 'Kept on this device for reading offline: {n} of {m}. A page opened once is kept too.',
  keptAll: 'Every region is kept on this device for reading offline.',
  keptFail: 'Some regions could not be fetched. Try again with a connection.',
  quickRegions: 'Ten questions: five from our list, three from {level} and two from the regions.',
  quickRegionsLevel: 'Ten questions: eight from {level} and two from the regions.',
  /* the service references dealt: a deck on the Flashcards root, a drill on Quizzes, both doors on the references page */
  svcDeck: 'Service references',
  svcGroup: 'Service references',
  svcFlashRow: 'Every service card',
  svcDrillRow: 'Every service question',
  svcDrillLine: '{n} questions on the service tables, every one dealt',
  svcDrillSection: 'Service references',
  svcNone: 'No service questions on this device yet.',
  flashThese: 'Flash these',
  drillThese: 'Drill these',
  /* a wine's colour word as the page shows it (the data keeps the plain value) */
  colour_rose: 'rosé'
};

function v39W(key, vars) {
  var v = vars || {};
  return String(V39_WORDS[key] || key).replace(/\{(\w+)\}/g, function (m, k) { return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m; });
}
function v39Esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function v39Str(s) { return typeof s === 'string' ? s.trim() : (typeof s === 'number' ? String(s) : ''); }
function v39List(x) { return Array.isArray(x) ? x : []; }
function v39Obj(x) { return x && typeof x === 'object' && !Array.isArray(x) ? x : {}; }
function v39Shuffle(a) {
  if (typeof shuffle === 'function') { try { return shuffle(a); } catch (e) { } }
  var out = a.slice();
  for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
  return out;
}

/* The folding every match reads, regions-join.cjs's fold exactly (the
   rule the builder folds the alias keys by): accents off, lower case, every
   run of anything but a letter or a digit one space. */
function v39Fold(s) {
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD'); } catch (e) { }
  return t.replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
/* Whole words of a folded name inside a folded part. */
function v39NameIn(hay, name) {
  if (!name) return false;
  return (' ' + hay + ' ').indexOf(' ' + name + ' ') >= 0;
}

/* =========== the data =========== */

function v39Data() {
  try { return (typeof REGIONS !== 'undefined' && REGIONS && typeof REGIONS === 'object') ? REGIONS : null; } catch (e) { return null; }
}
function v39Regions() { var d = v39Data(); return d ? v39List(d.regions).filter(function (a) { return a && typeof a === 'object' && v39Str(a.slug); }) : []; }
function v39Countries() { var d = v39Data(); return d ? v39Obj(d.countries) : {}; }
function v39Join() {
  var d = v39Data();
  var j = d ? v39Obj(d.join) : {};
  return { aliases: v39Obj(j.aliases), terroir: v39Obj(j.terroir), cats: v39Obj(j.cats), grapes: v39Obj(j.grapes), countryOnly: v39List(j.countryOnly) };
}
function v39Has() { return v39Regions().length > 0 || Object.keys(v39Countries()).length > 0; }

/* The lookups, built once per REGIONS object. The article and country
   tables (a LIST of targets per folded key, so one key may name an article
   in each of two countries), the target's country and the US words are the
   ones .scripts/regions/regions-join.cjs builds (joinIndex), in the same
   order (names, then TERROIR rows, then aliases; for the countries their
   keys and names first), so the resolver below is its mirror rule for rule. */
var V39_US_SHEETS = ['california', 'oregon', 'washington', 'new-york'];
var V39_US_WORDS = ['usa', 'us', 'u s', 'u s a', 'united states', 'united states of america'];
function v39Own(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
/* A country key to its country: the four US sheets are one. */
function v39CountryGroup(key) { return V39_US_SHEETS.indexOf(key) >= 0 ? 'usa' : String(key == null ? '' : key); }
/* A join value (a target, or a list of targets in different countries) as a list. */
function v39Targets(v) {
  var out = [], i;
  if (typeof v === 'string') { if (v) out.push(v); }
  else if (Array.isArray(v)) { for (i = 0; i < v.length; i++) if (typeof v[i] === 'string' && v[i] && out.indexOf(v[i]) < 0) out.push(v[i]); }
  return out;
}
function v39AddTarget(table, key, t) {
  if (!key || !t) return;
  if (!v39Own(table, key)) table[key] = [];
  if (table[key].indexOf(t) < 0) table[key].push(t);
}
var V39_IDX = { src: null };
function v39Index() {
  var d = v39Data();
  if (!d) return null;
  if (V39_IDX.src === d) return V39_IDX;
  var ix = { src: d, bySlug: {}, bySheet: {}, byIndex: {}, countryBySheet: {}, terroir: {}, qids: {}, article: {}, country: {}, group: {}, words: {}, articleKeys: [], countryKeys: [] };
  var cs = v39Countries();
  var keys = {};
  Object.keys(cs).forEach(function (k) { if (cs[k] && typeof cs[k] === 'object') { keys[k] = 1; ix.group[k] = v39CountryGroup(k); } });
  v39Regions().forEach(function (a) {
    ix.bySlug[a.slug] = a;
    if (v39Str(a.name)) { ix.group[a.slug] = v39CountryGroup(a.sheet); v39AddTarget(ix.article, v39Fold(a.name), a.slug); }
    var sheet = v39Str(a.sheet);
    (ix.bySheet[sheet] = ix.bySheet[sheet] || []).push(a);
    ix.byIndex[sheet + '/' + Number(a.index)] = a;
    v39List(a.questions).forEach(function (q) { if (q && v39Str(q.id)) ix.qids[q.id] = 1; });
  });
  Object.keys(ix.bySheet).forEach(function (k) { ix.bySheet[k].sort(function (a, b) { return Number(a.index) - Number(b.index); }); });
  Object.keys(keys).forEach(function (k) {
    var c = cs[k];
    v39AddTarget(ix.country, v39Fold(k), k);
    if (c.name) v39AddTarget(ix.country, v39Fold(c.name), k);
    if (v39Str(c.sheet)) ix.countryBySheet[c.sheet] = c;
    v39List(c.questions).forEach(function (q) { if (q && v39Str(q.id)) ix.qids[q.id] = 1; });
  });
  var j = v39Join();
  Object.keys(j.terroir).forEach(function (k) {
    v39Targets(j.terroir[k]).forEach(function (t) {
      v39AddTarget(keys[t] ? ix.country : ix.article, v39Fold(k), t);
      if (!keys[t] && !ix.terroir[v39Fold(k)]) ix.terroir[v39Fold(k)] = t;
    });
  });
  Object.keys(j.aliases).forEach(function (k) {
    v39Targets(j.aliases[k]).forEach(function (t) { v39AddTarget(keys[t] ? ix.country : ix.article, v39Fold(k), t); });
  });
  V39_US_WORDS.forEach(function (w) { ix.words[w] = 'usa'; });
  ix.articleKeys = Object.keys(ix.article);
  ix.countryKeys = Object.keys(ix.country);
  V39_IDX = ix;
  return ix;
}

/* The article by its slug, or null. */
function v39Find(slug) {
  var ix = v39Index();
  var s = v39Str(slug);
  return ix && s && Object.prototype.hasOwnProperty.call(ix.bySlug, s) ? ix.bySlug[s] : null;
}
/* The country by its key, or null. */
function v39Country(key) {
  var cs = v39Countries();
  var k = v39Str(key);
  var c = k && Object.prototype.hasOwnProperty.call(cs, k) ? cs[k] : null;
  return c && typeof c === 'object' ? c : null;
}
/* A record by a slug or a country key: the article first. */
function v39Record(key) { return v39Find(key) || v39Country(key); }
/* The country page's record: the country when the data holds it, else the
   sheet alone (its atlas name, its regions) while the record is still to come. */
function v39CountryOf(key) {
  var c = v39Country(key);
  if (c) return c;
  var k = v39Str(key);
  if (k && v39SheetRegions(k).length) return { key: k, name: v39SheetName(k), sheet: k, bare: 1 };
  return null;
}
function v39SheetCountry(sheet) {
  var ix = v39Index();
  var s = v39Str(sheet);
  return ix && s && ix.countryBySheet[s] ? ix.countryBySheet[s] : null;
}
/* The sheet's articles in the country's regionsOrder, else by map index. */
function v39SheetRegions(sheet) {
  var ix = v39Index();
  var s = v39Str(sheet);
  if (!ix || !s) return [];
  var c = v39SheetCountry(s);
  var order = c ? v39List(c.regionsOrder).map(function (x) { return v39Find(x); }).filter(Boolean) : [];
  var rest = (ix.bySheet[s] || []).filter(function (a) { return order.indexOf(a) < 0; });
  return order.concat(rest);
}
/* The sheets that carry articles or a country, in the atlas's order. */
function v39Sheets() {
  var ix = v39Index();
  if (!ix) return [];
  var seen = {}, out = [];
  var add = function (id) { if (id && !seen[id]) { seen[id] = 1; out.push(id); } };
  if (typeof MAP_SHEETS !== 'undefined' && Array.isArray(MAP_SHEETS)) MAP_SHEETS.forEach(function (s) { if (s && (ix.bySheet[s.id] || ix.countryBySheet[s.id])) add(s.id); });
  Object.keys(ix.bySheet).forEach(add);
  Object.keys(ix.countryBySheet).forEach(add);
  return out;
}
function v39Mapless() {
  var cs = v39Countries();
  return Object.keys(cs).filter(function (k) { var c = cs[k]; return c && typeof c === 'object' && (c.mapless || !v39Str(c.sheet)); }).map(function (k) { return cs[k]; });
}
function v39SheetName(sheet) {
  var c = v39SheetCountry(sheet);
  var hit = null;
  if (typeof MAP_SHEETS !== 'undefined' && Array.isArray(MAP_SHEETS)) MAP_SHEETS.some(function (s) { if (s && s.id === sheet) { hit = s; return true; } return false; });
  return hit && v39Str(hit.name) ? hit.name : (c ? v39Str(c.name) : v39Str(sheet));
}
function v39CountryKey(c) {
  var cs = v39Countries();
  var hit = '';
  Object.keys(cs).some(function (k) { if (cs[k] === c) { hit = k; return true; } return false; });
  return hit || v39Str(c && c.key) || v39Str(c && c.sheet);
}
/* Whether the device holds the sheet's map (the world map falls home without one). */
function v39HasMap(sheet) {
  if (typeof v25MapSheets !== 'function') return typeof worldMapView === 'function';
  try { return v25MapSheets().some(function (s) { return s && s.id === sheet; }); } catch (e) { return false; }
}

var V39_LEVEL_ORDER = ['intro', 'certified', 'advanced', 'master'];
var V39_LEVEL_NAMES = { intro: 'Régionale', certified: 'Village', advanced: 'Premier Cru', master: 'Grand Cru' };
function v39LevelName(key) {
  try { if (typeof v25Level === 'function') { var L = v25Level(key); if (L && L.name) return L.name; } } catch (e) { }
  return V39_LEVEL_NAMES[key] || '';
}
function v39AskedFrom(asked) {
  var list = v39List(asked);
  for (var i = 0; i < V39_LEVEL_ORDER.length; i++) if (list.indexOf(V39_LEVEL_ORDER[i]) >= 0) return v39LevelName(V39_LEVEL_ORDER[i]);
  return '';
}
/* A place's depth, framed: 'asked from Premier Cru', never the bare level
   name, which would read as the place's own cru beside a Grand Cru village. */
function v39DepthWord(depth) {
  if (depth !== 'advanced' && depth !== 'master') return '';
  var level = v39LevelName(depth);
  return level ? v39W('placeAsked', { level: level }) : '';
}

/* A region string (a house wine's, a form's) to a slug or a country key,
   the rule of .scripts/regions/regions-join.cjs, step for step: fold and
   split on commas; the string's country from the parts right to left (usa,
   us or united states, else a country key, name, alias or TERROIR row whose
   targets lie in one country); then MOST SPECIFIC FIRST, the parts left to
   right, a part that is exactly a region name, an alias or a TERROIR row
   names its first article in that country (another country's is refused);
   then a part holding a key of that country as whole words (the longest),
   or held inside one (the shortest), skipping an exact country part so it
   cannot become one of its regions; then the country table, exactly first,
   then by the same containment; '' when nothing answers. */
function v39Pick(list, where, ix) {
  var i;
  if (!list || !list.length) return '';
  if (!where) return list[0];
  for (i = 0; i < list.length; i++) if (ix.group[list[i]] === where) return list[i];
  return '';
}
function v39ByContainment(part, table, tableKeys, where, ix) {
  var best = null, bestLen = 0, j, key;
  for (j = 0; j < tableKeys.length; j++) {
    key = tableKeys[j];
    if (key !== part && key.length > bestLen && v39NameIn(part, key) && v39Pick(table[key], where, ix)) { best = key; bestLen = key.length; }
  }
  if (best) return v39Pick(table[best], where, ix);
  bestLen = 0;
  for (j = 0; j < tableKeys.length; j++) {
    key = tableKeys[j];
    if (key !== part && (bestLen === 0 || key.length < bestLen) && v39NameIn(key, part) && v39Pick(table[key], where, ix)) { best = key; bestLen = key.length; }
  }
  return best ? v39Pick(table[best], where, ix) : '';
}
function v39CountryOfParts(parts, ix) {
  var i, j, list, g, many;
  for (i = parts.length - 1; i >= 0; i--) {
    if (v39Own(ix.words, parts[i])) return ix.words[parts[i]];
    if (!v39Own(ix.country, parts[i])) continue;
    list = ix.country[parts[i]];
    g = ix.group[list[0]] || '';
    many = false;
    for (j = 1; j < list.length; j++) if (ix.group[list[j]] !== g) many = true;
    if (g && !many) return g;
  }
  return '';
}
function v39SlugFor(region) {
  var ix = v39Index();
  if (!ix || region == null) return '';
  var raw = String(region).split(',');
  var parts = [];
  var i, p, hit;
  for (i = 0; i < raw.length; i++) { p = v39Fold(raw[i]); if (p) parts.push(p); }
  var where = v39CountryOfParts(parts, ix);
  for (i = 0; i < parts.length; i++) { hit = v39Own(ix.article, parts[i]) ? v39Pick(ix.article[parts[i]], where, ix) : ''; if (hit) return hit; }
  for (i = 0; i < parts.length; i++) {
    if (v39Own(ix.country, parts[i]) && v39Pick(ix.country[parts[i]], where, ix)) continue;
    hit = v39ByContainment(parts[i], ix.article, ix.articleKeys, where, ix); if (hit) return hit;
  }
  for (i = 0; i < parts.length; i++) { hit = v39Own(ix.country, parts[i]) ? v39Pick(ix.country[parts[i]], where, ix) : ''; if (hit) return hit; }
  for (i = 0; i < parts.length; i++) { hit = v39ByContainment(parts[i], ix.country, ix.countryKeys, where, ix); if (hit) return hit; }
  return '';
}

/* =========== the reading, a sheet at a time ===========
   REGIONS.parts (version 2 of the data) names one reading file per sheet,
   and one for the map-less countries, with the stamp of its bytes. A
   record's reading (everything the index leaves out) is merged into it when
   its file is fetched; a data file without parts holds everything already.
   The worker keeps each file in its own cache, so a page opened once reads
   offline. Every callback is asynchronous, so nothing draws inside a draw. */
var V39_PARTS = { got: {}, wait: {}, failed: {}, restore: '' };
var V39_INDEX_KEYS = ['asked', 'cards', 'index', 'key', 'mapless', 'name', 'questions', 'regionsOrder', 'sheet', 'slug', 'summary'];
var V39_PART_TIMEOUT_MS = 15000;
function v39PartStamps() {
  var d = v39Data();
  return d && d.parts && typeof d.parts === 'object' && !Array.isArray(d.parts) ? d.parts : null;
}
/* The file a record reads from: an article's sheet, a sheet country's sheet, mapless for the rest. */
function v39PartName(rec) {
  if (!rec || typeof rec !== 'object') return '';
  if (v39Str(rec.slug)) return v39Str(rec.sheet);
  return (rec.mapless || !v39Str(rec.sheet)) ? 'mapless' : v39Str(rec.sheet);
}
function v39PartReady(name) {
  var st = v39PartStamps();
  if (!st || !name || !v39Own(st, name)) return true;
  return !!V39_PARTS.got[name];
}
function v39RecReady(rec) { return v39PartReady(v39PartName(rec)); }
function v39PartUrl(name) {
  var st = v39PartStamps();
  return 'js/regions/' + encodeURIComponent(name) + '.json?v=' + encodeURIComponent(v39Str(st && st[name]));
}
/* One file's reading put on the index's records. A file from an older
   edition (offline, the worker's last copy) gives what it holds; a field the
   index owns is never overwritten. */
function v39TakePart(name, data) {
  if (!name || !data || typeof data !== 'object' || data.part !== name) return false;
  var recs = v39Obj(data.records);
  Object.keys(recs).forEach(function (k) {
    var rec = v39Record(k);
    var src = recs[k];
    if (!rec || !src || typeof src !== 'object' || v39PartName(rec) !== name) return;
    Object.keys(src).forEach(function (f) { if (V39_INDEX_KEYS.indexOf(f) < 0) rec[f] = src[f]; });
  });
  V39_PARTS.got[name] = 1;
  delete V39_PARTS.failed[name];
  return true;
}
/* Fetches a file once; callers while it is in flight share the answer. */
function v39LoadPart(name, done) {
  var later = function (f, ok) { try { setTimeout(function () { try { f(ok); } catch (e) { } }, 0); } catch (e) { } };
  if (v39PartReady(name)) { if (done) later(done, true); return; }
  if (V39_PARTS.wait[name]) { if (done) V39_PARTS.wait[name].push(done); return; }
  V39_PARTS.wait[name] = done ? [done] : [];
  var settled = false;
  var finish = function (ok) {
    if (settled) return;
    settled = true;
    var list = V39_PARTS.wait[name] || [];
    delete V39_PARTS.wait[name];
    if (!ok) V39_PARTS.failed[name] = 1;
    list.forEach(function (f) { later(f, ok); });
  };
  if (typeof fetch !== 'function') { later(finish, false); return; }
  try { setTimeout(function () { finish(false); }, V39_PART_TIMEOUT_MS); } catch (e) { }
  try {
    fetch(v39PartUrl(name)).then(function (res) {
      if (!res || !res.ok) throw new Error('no reading');
      return res.json();
    }).then(function (data) {
      var ok = false;
      try { ok = v39TakePart(name, data); } catch (e) { ok = false; }
      /* a file that lands after the wait gave up is still merged, and the page drawn again */
      if (settled && ok) v39Landed(name);
      finish(ok);
    }, function () { finish(false); });
  } catch (e) { later(finish, false); }
}
/* The page on screen, when it waits on this file. */
function v39PageRec() {
  if (S.view === 'region') return v39Find(S._v39region);
  if (S.view === 'country') return v39CountryOf(S._v39country);
  return null;
}
function v39WaitsOn(name) { var rec = v39PageRec(); return !!rec && v39PartName(rec) === name; }
function v39WaitingHere() { var rec = v39PageRec(); return !!rec && !v39RecReady(rec); }
/* Starts the page's file unless it failed already (Try again clears that). */
function v39Fetch(name) {
  if (!name || v39PartReady(name) || V39_PARTS.failed[name]) return;
  v39LoadPart(name, function () { v39Landed(name); });
}
function v39FocusBack(key) {
  try {
    var n = null;
    if (key && key.indexOf('sel:') === 0) n = document.querySelector('#view ' + key.slice(4)) || document.querySelector(key.slice(4));
    else if (key && key.indexOf('id:') === 0) n = document.getElementById(key.slice(3));
    if (n && typeof n.focus === 'function') n.focus({ preventScroll: true });
  } catch (e) { }
}
/* The file landed (or failed): the waiting page drawn again in place, no
   entry made and no scroll saved over; a page a Back was restoring takes
   its scroll and its door back now that it is whole. */
function v39Landed(name) {
  try {
    if (typeof V32 !== 'undefined' && V32 && V32.rendering) { setTimeout(function () { v39Landed(name); }, 0); return; }
    if (!v39WaitsOn(name)) return;
    var href = (typeof location !== 'undefined' && location) ? location.href : '';
    var restore = !!href && V39_PARTS.restore === href;
    V39_PARTS.restore = '';
    var fk = '';
    try { var ae = document.activeElement; if (ae && ae !== document.body && typeof v32FocusKey === 'function') fk = v32FocusKey(ae); } catch (e) { fk = ''; }
    var y = v39ScrollY();
    try { if (typeof V32 !== 'undefined' && V32) V32.popping = true; } catch (e) { }
    v39Pend('replace');
    render();
    if (restore && typeof v32RestoreScroll === 'function') {
      v32RestoreScroll();
      if (typeof v32Focus === 'function') v32Focus(href);
      return;
    }
    try { window.scrollTo(0, y); } catch (e) { }
    if (fk) v39FocusBack(fk);
  } catch (e) { }
}
function v39WaitHtml(name) {
  var failed = !V39_PARTS.wait[name] && V39_PARTS.failed[name];
  return '<div class="card v39-wait" id="v39-wait" tabindex="-1" role="status"><p>' + v39Esc(v39W(failed ? 'notHere' : 'opening')) + '</p>'
    + (failed ? '<div class="v28-btnrow">' + v39Btn('btn ghost', 'retry', ' id="v39-retry" data-part="' + v39Esc(name) + '"', v39W('tryAgain')) + '</div>' : '') + '</div>';
}

/* Keep every region on this device: each file not yet in the worker's cache
   fetched through the worker, which keeps it. Only with a worker in charge. */
var V39_KEEP = { busy: false, n: -1, m: 0, failed: false };
function v39CanKeep() {
  try {
    return !!(v39PartStamps() && typeof caches !== 'undefined' && caches && typeof caches.open === 'function' && typeof fetch === 'function'
      && typeof navigator !== 'undefined' && navigator && navigator.serviceWorker && navigator.serviceWorker.controller);
  } catch (e) { return false; }
}
/* The worker's cache for the reading (sw.js REGIONS_CACHE): its name carries the installation's folder. */
function v39KeepName() { return 'codexregions-v1-' + encodeURIComponent(new URL('./', location.href).pathname); }
function v39KeepCount(done) {
  var names = Object.keys(v39PartStamps() || {});
  try {
    caches.open(v39KeepName()).then(function (c) {
      return Promise.all(names.map(function (n) { return c.match(new URL(v39PartUrl(n), location.href).href); }));
    }).then(function (hits) {
      done(hits.filter(Boolean).length, names.length, names.filter(function (n, i) { return !hits[i]; }));
    }, function () { done(-1, names.length, names); });
  } catch (e) { done(-1, names.length, names); }
}
function v39KeepPaint() {
  try {
    var st = document.getElementById('v39-keep-status');
    var b = document.getElementById('v39-keep');
    var all = V39_KEEP.m > 0 && V39_KEEP.n >= V39_KEEP.m;
    if (st) st.textContent = V39_KEEP.busy ? v39W('keeping') : (V39_KEEP.failed ? v39W('keptFail') : (all ? v39W('keptAll') : (V39_KEEP.n >= 0 ? v39W('keptLine', { n: V39_KEEP.n, m: V39_KEEP.m }) : '')));
    if (b) { b.disabled = !!V39_KEEP.busy; b.style.display = (all && !V39_KEEP.busy) ? 'none' : ''; b.textContent = V39_KEEP.busy ? v39W('keeping') : v39W('keepBtn'); }
  } catch (e) { }
}
function v39KeepRefresh() {
  if (!v39CanKeep()) return;
  v39KeepCount(function (n, m) { V39_KEEP.n = n; V39_KEEP.m = m; v39KeepPaint(); });
}
function v39KeepAll() {
  if (V39_KEEP.busy || !v39CanKeep()) return;
  V39_KEEP.busy = true; V39_KEEP.failed = false;
  v39KeepPaint();
  v39KeepCount(function (n, m, missing) {
    var left = missing.length, bad = 0;
    var end = function () { V39_KEEP.busy = false; V39_KEEP.failed = bad > 0; v39KeepRefresh(); v39KeepPaint(); };
    if (!left) { end(); return; }
    missing.forEach(function (name) {
      fetch(v39PartUrl(name)).then(function (res) {
        if (!res || !res.ok) throw new Error('no reading');
        return res.json();
      }).then(function (d) { try { if (!v39TakePart(name, d)) bad++; } catch (e) { bad++; } }, function () { bad++; })
        .then(function () { left--; if (!left) end(); });
    });
  });
}

/* =========== per-device slots, never exported, every touch in try =========== */

var V39_READ_BASE = 'oot-codex-regions-read-v1';
var V39_CARD_BASE = 'oot-codex-regioncards-v1';
var V39_SVC_BASE = 'oot-codex-servicecards-v1';
function v39Key(base) {
  try {
    return (typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function') ? OOT.profiles.key(base) : base;
  } catch (e) { return base; }
}
function v39Rec(base) {
  try {
    var s = (typeof localStorage !== 'undefined' && localStorage) ? localStorage.getItem(v39Key(base)) : null;
    var o = s ? JSON.parse(s) : null;
    return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
  } catch (e) { return {}; }
}
function v39Put(base, o) {
  try { if (typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(v39Key(base), JSON.stringify(o)); } catch (e) { }
}
function v39MarkRead(slug) {
  try {
    var s = v39Str(slug);
    if (!s) return;
    var o = v39Rec(V39_READ_BASE);
    if (o[s]) return;
    o[s] = 1;
    v39Put(V39_READ_BASE, o);
  } catch (e) { }
}
function v39ReadCount(slugs) {
  var o = v39Rec(V39_READ_BASE);
  return v39List(slugs).filter(function (s) { return !!o[s]; }).length;
}
function v39CardRec() { return v39Rec(V39_CARD_BASE); }
/* The service cards' slot, the region cards' twin: per device, never exported. */
function v39SvcRec() { return v39Rec(V39_SVC_BASE); }
function v39SvcMark(id, got) {
  try {
    var o = v39SvcRec();
    o[id] = got ? 'got' : 'again';
    v39Put(V39_SVC_BASE, o);
  } catch (e) { }
}
function v39CardMark(id, got) {
  try {
    var o = v39CardRec();
    o[id] = got ? 'got' : 'again';
    v39Put(V39_CARD_BASE, o);
  } catch (e) { }
}

/* =========== the state and the router =========== */

var V39_VIEWS = { regions: 1, country: 1, region: 1, serviceref: 1 };

function v39Pend(mode) { try { if (typeof V32 !== 'undefined' && V32) V32.pend = mode; } catch (e) { } }

/* Opens one of the four views: the state set, the render recorded as a push
   or a replace (codex36's v36Go), the main landmark focused. */
function v39Open(view, arg, mode) {
  var a = v39Str(arg);
  if (!V39_VIEWS[view]) return false;
  try { if (typeof v32PushOpener === 'function') v32PushOpener(); } catch (e) { }
  if (view === 'region') S._v39region = a;
  else if (view === 'country') S._v39country = a;
  else if (view === 'regions') S._v39sheet = a;
  else if (view === 'serviceref') S._v39table = a;
  S._v28edit = false;
  S._v25area = 'library';
  S.view = view;
  try { var opened = view === 'region' ? v39Find(a) : (view === 'country' ? v39CountryOf(a) : null); if (opened) delete V39_PARTS.failed[v39PartName(opened)]; } catch (e) { }
  v39Pend(mode === 'replace' ? 'replace' : 'push');
  render();
  if (typeof v25FocusMain === 'function') { try { v25FocusMain(); } catch (e) { } }
  return true;
}

(function () {
  Object.keys(V39_VIEWS).forEach(function (v) {
    if (typeof V32_OWNER !== 'undefined' && V32_OWNER) V32_OWNER[v] = 'library';
    if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER[v] = 'library';
  });
  if (typeof V32_PARENT !== 'undefined' && V32_PARENT) {
    V32_PARENT.regions = 'library';
    V32_PARENT.country = 'regions';
    V32_PARENT.region = 'country';
    V32_PARENT.serviceref = 'library';
  }
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) {
    V25_VIEWS.regions = function () { return v39IndexView(); };
    V25_VIEWS.country = function () { return v39CountryView(); };
    V25_VIEWS.region = function () { return v39RegionView(); };
    V25_VIEWS.serviceref = function () { return v39RefView(); };
  }
  if (typeof V25_GO !== 'undefined' && V25_GO) {
    V25_GO.regions = function (arg) {
      var a = v39Str(arg);
      if (a.indexOf('region:') === 0) v39Open('region', a.slice(7), 'push');
      else if (a.indexOf('country:') === 0) v39Open('country', a.slice(8), 'push');
      else v39Open('regions', '', 'push');
    };
    V25_GO.regiondrill = function (arg) {
      var a = v39Str(arg);
      if (a === 'all' || !a) v39StartDrill(v39AllKeys());
      else if (a.indexOf('sheet:') === 0) v39StartDrill(v39SheetKeys(a.slice(6)));
      else v39StartDrill([a]);
    };
    V25_GO.villagetasting = function () { v39GridStart(); };
    V25_GO.servicedrill = function () { v39StartServiceDrill(); };
    if (typeof V25_AREA !== 'undefined' && V25_AREA) { V25_AREA.regions = 'library'; V25_AREA.regiondrill = 'levels'; V25_AREA.villagetasting = 'levels'; V25_AREA.servicedrill = 'levels'; }
  }
})();

/* The argument each view carries in its address. */
if (typeof v32Arg === 'function') {
  var _v39Arg = v32Arg;
  v32Arg = function (v) {
    if (v === 'region') return v39Str(S._v39region);
    if (v === 'country') return v39Str(S._v39country);
    if (v === 'regions') return v39Str(S._v39sheet);
    if (v === 'serviceref') return v39Str(S._v39table);
    return _v39Arg.apply(this, arguments);
  };
}
/* The article is one screen whichever region it shows: a step to the next is a replace. */
if (typeof v32Route === 'function') {
  var _v39Route = v32Route;
  v32Route = function () {
    var r = _v39Route.apply(this, arguments);
    if (r && S.view === 'region') r.key = 'region';
    return r;
  };
}
/* An address read back: an unknown slug or key lands on the index. */
if (typeof v32Apply === 'function') {
  var _v39Apply = v32Apply;
  v32Apply = function (r, state) {
    if (r && V39_VIEWS[r.view]) {
      var v = r.view, arg = v39Str(r.arg);
      S._v25area = 'library';
      S._v28edit = false;
      if (v === 'region' && v39Find(arg)) { S._v39region = arg; S.view = 'region'; return { view: 'region', arg: arg }; }
      if (v === 'country' && v39CountryOf(arg)) { S._v39country = arg; S.view = 'country'; return { view: 'country', arg: arg }; }
      if (v === 'serviceref') { S._v39table = v39Table(arg) ? arg : ''; S.view = 'serviceref'; return { view: 'serviceref', arg: S._v39table }; }
      S._v39sheet = (v === 'regions' && v39CountryOf(arg)) ? arg : '';
      S.view = 'regions';
      return { view: 'regions', arg: S._v39sheet };
    }
    return _v39Apply.apply(this, arguments);
  };
}
/* Back at depth 0: the article to its country, the country to the index on its row, the index and the references to the Library. */
if (typeof v32ParentRoute === 'function') {
  var _v39ParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    var v = S.view;
    if (v === 'region') {
      var a = v39Find(S._v39region);
      var c = a ? v39CountryOf(a.sheet) : null;
      return c ? { view: 'country', arg: v39CountryKey(c) } : { view: 'regions', arg: a ? v39Str(a.sheet) : '' };
    }
    if (v === 'country') {
      var co = v39CountryOf(S._v39country);
      return { view: 'regions', arg: co && v39Str(co.sheet) ? co.sheet : '' };
    }
    if (v === 'regions' || v === 'serviceref') return { view: 'library' };
    return _v39ParentRoute.apply(this, arguments);
  };
}
if (typeof v25MainName === 'function') {
  var _v39MainName = v25MainName;
  v25MainName = function () {
    if (S && S.view === 'region') { var a = v39Find(S._v39region); return a ? v39Str(a.name) : v39W('theRegions'); }
    if (S && S.view === 'country') { var c = v39CountryOf(S._v39country); return c ? v39Str(c.name) : v39W('theRegions'); }
    if (S && S.view === 'regions') return v39W('indexH');
    if (S && S.view === 'serviceref') return v39W('refH');
    return _v39MainName.apply(this, arguments);
  };
}
/* A reload on one of these views: codex32 read the address before the views
   were known, so it is read again here, once, and the first render replaces. */
(function () {
  try {
    if (typeof V32 === 'undefined' || !V32 || V32.moved || typeof v32Parse !== 'function' || typeof v32Apply !== 'function') return;
    var hash = typeof V32.initialHash === 'string' ? V32.initialHash : '';
    if (!hash && typeof location !== 'undefined' && location && typeof location.hash === 'string') hash = location.hash;
    if (!/^#\/v\/(regions|country|region|serviceref)(\/|$)/.test(hash)) return;
    var r = v32Parse(hash);
    if (!r || !V39_VIEWS[r.view]) return;
    v32Apply(r, typeof v32CurState === 'function' ? v32CurState() : null);
    V32.pend = 'replace';
  } catch (e) { }
})();

/* =========== the pieces every page is built from =========== */

function v39Head(title, sub) {
  if (typeof v32Head === 'function') return v32Head(title, sub);
  return '<div class="viewhead"><h2 tabindex="-1" class="v32-h">' + v39Esc(title) + '</h2>' + (sub ? '<div class="sub">' + v39Esc(sub) + '</div>' : '') + '</div>';
}
function v39Paras(s) {
  return String(s == null ? '' : s).split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean)
    .map(function (p) { return '<p>' + v39Esc(p) + '</p>'; }).join('');
}
/* A labelled paragraph: the label in bold, the text after a colon. */
function v39Labelled(label, text) {
  var t = v39Str(text);
  if (!t) return '';
  var parts = t.split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
  var first = parts.shift() || '';
  return '<p><b>' + v39Esc(label) + ':</b> ' + v39Esc(first) + '</p>' + parts.map(function (p) { return '<p>' + v39Esc(p) + '</p>'; }).join('');
}
/* A closed disclosure; the country page's list of doors stands open, since the doors are the page. */
function v39Details(id, title, body, open) {
  if (!body) return '';
  return '<details class="v28-q v39-sec" id="' + v39Esc(id) + '" data-chip="' + v39Esc(id) + '"' + (open ? ' open' : '') + '><summary>' + v39Esc(title) + '</summary><div class="v39-body">' + body + '</div></details>';
}
/* A two-column list of [name, note] pairs. */
function v39Pairs(list) {
  var rows = v39List(list).filter(function (p) { return Array.isArray(p) && v39Str(p[0]); });
  if (!rows.length) return '';
  return '<dl class="v39-pairs">' + rows.map(function (p) { return '<dt>' + v39Esc(p[0]) + '</dt><dd>' + v39Esc(p[1] == null ? '' : p[1]) + '</dd>'; }).join('') + '</dl>';
}
function v39Lines(list) {
  var rows = v39List(list).filter(function (l) { return v39Str(l); });
  return rows.length ? '<ul class="v39-lines">' + rows.map(function (l) { return '<li>' + v39Esc(l) + '</li>'; }).join('') + '</ul>' : '';
}
/* The places, nested; a place with depth carries a quiet framed word after its name (asked from Premier Cru). */
function v39Places(list) {
  var rows = v39List(list).filter(function (p) { return p && v39Str(p.name); });
  if (!rows.length) return '';
  return '<ul class="v39-places">' + rows.map(function (p) {
    var depth = v39DepthWord(p.depth);
    return '<li><b>' + v39Esc(p.name) + '</b>' + (depth ? ' <span class="v39-depth">' + v39Esc(depth) + '</span>' : '')
      + (v39Str(p.note) ? ': ' + v39Esc(p.note) : '') + v39Places(p.places) + '</li>';
  }).join('') + '</ul>';
}
/* Any place of the list, at any nesting, carrying a depth word. */
function v39PlacesDeep(list) {
  return v39List(list).some(function (p) { return p && v39Str(p.name) && (!!v39DepthWord(p.depth) || v39PlacesDeep(p.places)); });
}
/* The places section's body: the key at its head when any place carries a depth word, then the nested list. */
function v39PlacesBody(list) {
  var html = v39Places(list);
  if (!html || !v39PlacesDeep(list)) return html;
  return '<p class="v39-note v39-placeskey">' + v39Esc(v39W('placesKey', { advanced: v39LevelName('advanced'), master: v39LevelName('master') })) + '</p>' + html;
}
function v39Sources(list) {
  var rows = v39List(list).filter(function (s) { return s && v39Str(s.title); });
  if (!rows.length) return '';
  /* a linked source is one block (its date inside the link), so the bullet sits on its first line and the date never wraps alone */
  return '<ul class="v39-lines v39-sources">' + rows.map(function (s) {
    var t = v39Esc(s.title) + (v39Str(s.asOf) ? ', ' + v39Esc(v39W('asOf', { date: s.asOf })) : '');
    var url = v39Str(s.url);
    var safe = /^https?:\/\//i.test(url);
    return '<li>' + (safe ? '<a href="' + v39Esc(url) + '" target="_blank" rel="noopener">' + t + '<span class="sr-only">' + v39W('opensNew') + '</span></a>' : t) + '</li>';
  }).join('') + '</ul>';
}
function v39Say(list) {
  var rows = v39List(list).filter(function (p) { return Array.isArray(p) && v39Str(p[0]); });
  return rows.length ? v39Pairs(rows) : '';
}
function v39Chips(secs) {
  if (!secs.length) return '';
  return '<nav class="v39-steps" aria-label="' + v39Esc(v39W('sections')) + '">' + secs.map(function (s) {
    return '<button type="button" class="v28-chip" data-v39="chip" data-sec="' + v39Esc(s.id) + '">' + v39Esc(s.title) + '</button>';
  }).join('') + '</nav>';
}
function v39Btn(cls, act, attrs, label) {
  return '<button type="button" class="' + cls + '" data-v39="' + act + '"' + (attrs || '') + '>' + v39Esc(label) + '</button>';
}
function v39FirstSentence(s) {
  var t = v39Str(s);
  var m = /^(.+?[.!?])(\s|$)/.exec(t);
  return m ? m[1] : t;
}

/* The common closing sections of an article or a country. */
function v39TailSections(rec) {
  var out = [];
  var exam = v39Lines(rec.exam);
  if (exam) out.push({ id: 'v39-sec-exam', title: v39W('examAsks'), body: exam });
  var traps = v39Lines(rec.traps);
  if (traps) out.push({ id: 'v39-sec-traps', title: v39W('traps'), body: traps });
  var say = v39Say(rec.say);
  if (say) out.push({ id: 'v39-sec-say', title: v39W('sayIt'), body: say });
  var src = v39Sources(rec.sources);
  if (src) out.push({ id: 'v39-sec-sources', title: v39W('sources'), body: src });
  return out;
}
function v39SectionsHtml(secs) {
  if (!secs.length) return '';
  return '<div class="card primerpage chapterbody v39-sections">' + secs.map(function (s) { return v39Details(s.id, s.title, s.body, !!s.open); }).join('') + '</div>';
}

/* =========== the article =========== */

/* The house wines whose region string resolves to this slug. */
function v39OnList(slug) {
  var out = [];
  try {
    if (typeof v28House !== 'function' || typeof v28Wines !== 'function') return out;
    v28Wines(v28House()).forEach(function (w) { if (w && w.id && v39SlugFor(w.region) === slug) out.push(w); });
  } catch (e) { return []; }
  return out;
}

/* A wine's colour as the page shows it: the data's plain value (rose) is
   drawn as the word is spelt (rosé); a value with no entry shows as it stands. */
function v39ColourWord(c) {
  var v = v39Str(c);
  var k = 'colour_' + v.toLowerCase();
  return v && v39Own(V39_WORDS, k) ? V39_WORDS[k] : v;
}

function v39ArticleSections(a) {
  var secs = [];
  var t = v39Obj(a.terroir);
  var land = v39Labelled(v39W('climate'), t.climate) + v39Labelled(v39W('soils'), t.soils) + v39Labelled(v39W('topography'), t.topography) + v39Labelled(v39W('water'), t.water);
  if (land) secs.push({ id: 'v39-sec-land', title: v39W('theLand'), body: land });
  var grapes = v39List(a.grapes).filter(function (g) { return g && v39Str(g.name); });
  var wines = v39List(a.wines).filter(function (w) { return w && v39Str(w.style); });
  var gw = '';
  if (grapes.length) gw += '<h4>' + v39W('grapesHead') + '</h4><ul class="v39-lines">' + grapes.map(function (g) {
    return '<li><b>' + v39Esc(g.name) + '</b>' + (v39Str(g.role) ? ' <span class="v39-role">' + v39Esc(g.role) + '</span>' : '') + (v39Str(g.styles) ? ': ' + v39Esc(g.styles) : '') + '</li>';
  }).join('') + '</ul>';
  if (wines.length) gw += '<h4>' + v39W('winesHead') + '</h4><ul class="v39-lines">' + wines.map(function (w) {
    return '<li><b>' + v39Esc(w.style) + '</b>' + (v39Str(w.colour) ? ' <span class="v39-role">' + v39Esc(v39ColourWord(w.colour)) + '</span>' : '') + (v39Str(w.note) ? ': ' + v39Esc(w.note) : '') + '</li>';
  }).join('') + '</ul>';
  if (gw) secs.push({ id: 'v39-sec-grapes', title: v39W('grapesWines'), body: gw });
  var m = v39Obj(a.made);
  var made = v39Labelled(v39W('viticulture'), m.viticulture) + v39Labelled(v39W('winemaking'), m.winemaking);
  if (made) secs.push({ id: 'v39-sec-made', title: v39W('howMade'), body: made });
  var law = v39Obj(a.law);
  var lawHtml = v39Paras(law.classification);
  var tiers = v39Pairs(law.tiers);
  if (tiers) lawHtml += '<h4>' + v39W('theLadder') + '</h4>' + tiers;
  var labels = v39Pairs(law.labels);
  if (labels) lawHtml += '<h4>' + v39W('labelWords') + '</h4>' + labels;
  if (lawHtml) secs.push({ id: 'v39-sec-law', title: v39W('lawLabels'), body: lawHtml });
  var places = v39PlacesBody(a.places);
  if (places) secs.push({ id: 'v39-sec-places', title: v39W('thePlaces'), body: places });
  var prods = v39List(a.producers).filter(function (p) { return p && v39Str(p.name); });
  if (prods.length) {
    var canOpen = (typeof v28Act === 'function' && typeof prodById === 'function') || (typeof V25_GO !== 'undefined' && V25_GO && (typeof V25_GO.producer === 'function' || typeof V25_GO.producers === 'function'));
    secs.push({ id: 'v39-sec-producers', title: v39W('producers'), body: '<ul class="v39-lines v39-list">' + prods.map(function (p) {
      var id = v39Str(p.id);
      var known = false;
      if (id && typeof prodById === 'function') { try { known = !!prodById(id); } catch (e) { known = false; } }
      var name = (id && canOpen && known) ? v39Btn('btn small ghost', 'producer', ' data-id="' + v39Esc(id) + '"', p.name) : '<b>' + v39Esc(p.name) + '</b>';
      return '<li>' + name + (v39Str(p.why) ? ': ' + v39Esc(p.why) : '') + '</li>';
    }).join('') + '</ul>' });
  }
  if (typeof v28Open === 'function') {
    var list = v39OnList(a.slug);
    if (list.length) secs.push({ id: 'v39-sec-list', title: v39W('onList'), body: '<ul class="v39-lines v39-list">' + list.map(function (w) {
      var label = [v39Str(w.name), v39Str(w.producer), v39Str(w.vintage)].filter(Boolean).join(' · ');
      return '<li>' + v39Btn('btn small ghost', 'wine', ' data-id="' + v39Esc(w.id) + '"', label) + '</li>';
    }).join('') + '</ul>' });
  }
  return secs.concat(v39TailSections(a));
}

function v39ArticleHtml(a, wait) {
  var c = v39CountryOf(a.sheet);
  var cname = c ? v39Str(c.name) : '';
  var sheetName = v39SheetName(a.sheet);
  var sub = [];
  if (cname) sub.push(cname);
  if (sheetName && sheetName !== cname) sub.push(sheetName);
  var asked = v39AskedFrom(a.asked);
  if (asked) sub.push(v39W('askedFrom', { level: asked }));
  var html = '<div class="v25page v39 v39-article" id="v39" data-slug="' + v39Esc(a.slug) + '">' + v39Head(a.name, sub.join(' · '));
  if (v39Str(a.summary)) html += '<p class="v39-lead">' + v39Esc(a.summary) + '</p>';
  if (wait) html += wait;
  else {
    var secs = v39ArticleSections(a);
    html += v39Chips(secs) + v39SectionsHtml(secs);
  }
  var acts = '';
  if (c && !c.mapless && !a.mapless && typeof a.index === 'number' && isFinite(a.index) && a.index >= 0 && Math.floor(a.index) === a.index && v39HasMap(a.sheet)) acts += v39Btn('btn gold', 'map', ' id="v39-act-map" data-sheet="' + v39Esc(a.sheet) + '" data-index="' + v39Esc(a.index) + '"', v39W('seeMap'));
  if (typeof v32StartRun === 'function' && v39List(a.cards).length) acts += v39Btn('btn ghost', 'flash', ' id="v39-act-flash" data-slug="' + v39Esc(a.slug) + '"', v39W('flashRegion'));
  if (v39Questions([a.slug]).length) acts += v39Btn('btn ghost', 'drill', ' id="v39-act-drill" data-slug="' + v39Esc(a.slug) + '"', v39W('drillRegion'));
  var order = v39SheetRegions(a.sheet);
  var at = order.indexOf(a);
  if (at > 0) acts += v39Btn('btn ghost', 'prev', ' id="v39-act-prev" data-slug="' + v39Esc(order[at - 1].slug) + '"', v39W('previous', { name: order[at - 1].name }));
  if (at >= 0 && at + 1 < order.length) acts += v39Btn('btn ghost', 'next', ' id="v39-act-next" data-slug="' + v39Esc(order[at + 1].slug) + '"', v39W('next', { name: order[at + 1].name }));
  if (c) acts += v39Btn('btn ghost', 'country', ' id="v39-act-country" data-key="' + v39Esc(v39CountryKey(c)) + '"', v39W('readCountry', { name: cname }));
  if (acts) html += '<div class="v28-btnrow v39-acts">' + acts + '</div>';
  return html + '</div>';
}

function v39RegionView() {
  var a = v39Find(S._v39region);
  var html;
  if (!a) html = '<div class="v25page v39 v39-article" id="v39">' + v39Head(v39W('theRegions')) + '<p class="v32-line">' + v39W('indexNone') + '</p></div>';
  else if (!v39RecReady(a)) {
    /* the index draws the head, the summary and the doors at once; the rest arrives with the sheet's file */
    v39Fetch(v39PartName(a));
    html = v39ArticleHtml(a, v39WaitHtml(v39PartName(a)));
  } else { html = v39ArticleHtml(a); v39MarkRead(a.slug); }
  return v39Build(html);
}

/* =========== the country page =========== */

function v39CountryHtml(c, wait) {
  var key = v39CountryKey(c);
  var sheet = v39Str(c.sheet);
  var regions = sheet ? v39SheetRegions(sheet) : [];
  var mapless = !!c.mapless || !sheet;
  var sub = mapless ? v39W('countryNoMap', { name: c.name }) : (regions.length === 1 ? v39W('countrySubOne') : v39W('countrySub', { n: regions.length }));
  var html = '<div class="v25page v39 v39-country" id="v39" data-key="' + v39Esc(key) + '">' + v39Head(c.name, sub);
  if (v39Str(c.summary)) html += '<p class="v39-lead">' + v39Esc(c.summary) + '</p>';
  var secs = [];
  var over = wait ? '' : v39Paras(c.overview);
  if (over) secs.push({ id: 'v39-sec-overview', title: v39W('overview'), body: over });
  var ladder = wait ? '' : v39Pairs(c.ladder);
  var labels = wait ? '' : v39Pairs(c.labels);
  if (ladder || labels) secs.push({ id: 'v39-sec-law', title: v39W('lawLabels'), body: (ladder ? '<h4>' + v39W('theLadder') + '</h4>' + ladder : '') + (labels ? '<h4>' + v39W('labelWords') + '</h4>' + labels : '') });
  if (regions.length) {
    secs.push({ id: 'v39-sec-regions', title: v39W('theRegions'), open: true, body: '<ol class="v39-doors">' + regions.map(function (a) {
      return '<li>' + v39Btn('btn small ghost v39-doorbtn', 'region', ' data-slug="' + v39Esc(a.slug) + '"', a.name) + (v39Str(a.summary) ? '<span class="v39-doorline">' + v39Esc(v39FirstSentence(a.summary)) + '</span>' : '') + '</li>';
    }).join('') + '</ol>' });
  }
  if (mapless && !wait) {
    var places = v39PlacesBody(c.places);
    secs.push({ id: 'v39-sec-places', title: v39W('thePlaces'), body: '<p class="v39-note">' + v39Esc(v39W('countryNoMap', { name: c.name })) + '</p>' + places });
  }
  html += v39Chips(secs) + v39SectionsHtml(secs);
  if (wait) html += wait;
  var acts = '';
  if (!mapless && v39HasMap(sheet)) acts += v39Btn('btn gold', 'openmap', ' id="v39-act-openmap" data-sheet="' + v39Esc(sheet) + '"', v39W('openMap'));
  if (typeof v32StartRun === 'function') {
    if (!mapless && v39SheetCards(sheet).length) acts += v39Btn('btn ghost', 'flashsheet', ' id="v39-act-flashsheet" data-sheet="' + v39Esc(sheet) + '"', v39W('flashSheet', { name: c.name }));
    else if (v39List(c.cards).length) acts += v39Btn('btn ghost', 'flash', ' id="v39-act-flash" data-slug="' + v39Esc(key) + '"', v39W('flashOne', { name: c.name }));
  }
  var keys = mapless ? [key] : v39SheetKeys(sheet);
  if (v39Questions(keys).length) acts += v39Btn('btn ghost', mapless ? 'drill' : 'drillsheet', mapless ? ' id="v39-act-drill" data-slug="' + v39Esc(key) + '"' : ' id="v39-act-drillsheet" data-sheet="' + v39Esc(sheet) + '"', v39W('drillName', { name: c.name }));
  if (acts) html += '<div class="v28-btnrow v39-acts">' + acts + '</div>';
  if (!wait) html += v39SectionsHtml(v39TailSections(c));
  return html + '</div>';
}

function v39CountryView() {
  var c = v39CountryOf(S._v39country);
  var html;
  if (!c) html = '<div class="v25page v39 v39-country" id="v39">' + v39Head(v39W('theRegions')) + '<p class="v32-line">' + v39W('indexNone') + '</p></div>';
  else if (!v39RecReady(c)) { v39Fetch(v39PartName(c)); html = v39CountryHtml(c, v39WaitHtml(v39PartName(c))); }
  else html = v39CountryHtml(c);
  return v39Build(html);
}

/* =========== the index =========== */

function v39CountryRow(c, sheet) {
  var key = v39CountryKey(c);
  var regions = sheet ? v39SheetRegions(sheet) : [];
  var line = sheet
    ? (regions.length === 1 ? v39W('rowLineOne', { m: v39ReadCount([regions[0].slug]) }) : v39W('rowLine', { n: regions.length, m: v39ReadCount(regions.map(function (a) { return a.slug; })) }))
    : v39W('rowNoMap');
  var cur = sheet && S._v39sheet === sheet;
  return '<li><button class="v25row" type="button" data-v39="country" data-key="' + v39Esc(key) + '" id="v39-row-' + v39Esc(key) + '"' + (cur ? ' aria-current="true"' : '') + '>'
    + '<span class="v25row-name">' + v39Esc(c.name) + '</span><span class="v25row-line">' + v39Esc(line) + '</span></button></li>';
}
function v39Group(title, rows, id) {
  if (!rows) return '';
  if (typeof v32Group === 'function') return v32Group(title, rows, id);
  return '<section class="v32-group" aria-labelledby="' + id + '"><h3 class="secgroup v32-gh" id="' + id + '">' + v39Esc(title) + '</h3><ul class="v25rows v32rows">' + rows + '</ul></section>';
}

function v39IndexHtml() {
  var html = '<div class="v25page v39 v39-index" id="v39">' + v39Head(v39W('indexH'), v39W('indexSub'));
  if (!v39Has()) return html + '<p class="v32-line">' + v39W('indexNone') + '</p></div>';
  var regions = v39Regions();
  var countries = Object.keys(v39Countries()).filter(function (k) { return v39Country(k); });
  html += '<p class="v32-line">' + v39Esc(v39W('indexLine', { regions: regions.length, countries: countries.length })) + '</p>';
  if (v39CanKeep()) {
    html += '<div class="v39-keep"><p class="v32-line v39-keepline" id="v39-keep-status" role="status"></p><div class="v28-btnrow v39-acts">'
      + v39Btn('btn ghost', 'keep', ' id="v39-keep"', v39W('keepBtn')) + '</div></div>';
  }
  var sheets = v39Sheets();
  var placed = {};
  var groups = (typeof MAP_GROUPS !== 'undefined' && Array.isArray(MAP_GROUPS)) ? MAP_GROUPS : [];
  groups.forEach(function (g, i) {
    if (!Array.isArray(g) || !Array.isArray(g[1])) return;
    var rows = '';
    g[1].forEach(function (id) {
      if (sheets.indexOf(id) < 0) return;
      var c = v39CountryOf(id);
      if (!c) return;
      placed[id] = 1;
      rows += v39CountryRow(c, id);
    });
    html += v39Group(String(g[0]), rows, 'v39-g-' + i);
  });
  var rest = '';
  sheets.forEach(function (id) { if (!placed[id]) { var c = v39CountryOf(id); if (c) rest += v39CountryRow(c, id); } });
  if (rest) html += v39Group(v39W('everyMap'), rest, 'v39-g-rest');
  var also = '';
  v39Mapless().forEach(function (c) { also += v39CountryRow(c, ''); });
  if (also) html += v39Group(v39W('alsoAsked'), also, 'v39-g-also');
  return html + '</div>';
}

function v39IndexView() {
  return v39Build(v39IndexHtml(), function (box) {
    try { if (v39CanKeep()) { v39KeepPaint(); setTimeout(v39KeepRefresh, 0); } } catch (e) { }
    if (!S._v39sheet || !box || typeof box.querySelector !== 'function') return;
    try {
      var row = box.querySelector('[aria-current="true"]');
      if (row && typeof row.focus === 'function') setTimeout(function () { try { row.focus({ preventScroll: true }); } catch (e) { } }, 0);
    } catch (e) { }
  });
}

/* =========== the service references =========== */

function v39RefData() {
  try { return (typeof SERVICE_REF !== 'undefined' && SERVICE_REF && typeof SERVICE_REF === 'object') ? SERVICE_REF : null; } catch (e) { return null; }
}
function v39Tables() {
  var d = v39RefData();
  return d ? v39List(d.tables).filter(function (t) { return t && typeof t === 'object' && v39Str(t.key) && v39Str(t.title); }) : [];
}
function v39Table(key) {
  var k = v39Str(key);
  var hit = null;
  if (k) v39Tables().some(function (t) { if (t.key === k) { hit = t; return true; } return false; });
  return hit;
}
function v39TableHtml(t) {
  var cols = v39List(t.columns).map(function (c) { return v39Str(c); });
  var rows = v39List(t.rows).filter(function (r) { return Array.isArray(r) && r.length; });
  var html = '<div class="card v39-table-card"><p class="v39-caption">' + v39Esc(t.title) + (v39Str(t.line) ? ': ' + v39Esc(t.line) : '') + '</p>';
  if (cols.length && rows.length) {
    html += '<div class="v39-tablewrap"><table class="v39-table"><caption class="sr-only">' + v39Esc(t.title) + '</caption><thead><tr>'
      + cols.map(function (c) { return '<th scope="col">' + v39Esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>'
      + rows.map(function (r) {
        return '<tr>' + cols.map(function (c, i) {
          var cell = r[i] == null ? '' : String(r[i]);
          return (i === 0 ? '<th scope="row"' : '<td') + ' data-col="' + v39Esc(c) + '">' + v39Esc(cell) + (i === 0 ? '</th>' : '</td>');
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }
  var notes = v39Lines(t.notes);
  if (notes) html += '<h4>' + v39W('notes') + '</h4>' + notes;
  var say = v39Say(t.say);
  if (say) html += '<h4>' + v39W('sayIt') + '</h4>' + say;
  var src = v39Sources(t.sources);
  if (src) html += '<h4>' + v39W('sources') + '</h4>' + src;
  return html + '</div>';
}
function v39RefHtml() {
  var html = '<div class="v25page v39 v39-ref" id="v39">' + v39Head(v39W('refH'), v39W('refSub'));
  var tables = v39Tables();
  if (!tables.length) return html + '<p class="v32-line">' + v39W('refNone') + '</p></div>';
  var cur = v39Table(S._v39table) || tables[0];
  html += '<nav class="v39-steps" aria-label="' + v39Esc(v39W('refTables')) + '">' + tables.map(function (t) {
    return '<button type="button" class="v28-chip" data-v39="table" data-key="' + v39Esc(t.key) + '"' + (t === cur ? ' aria-current="step"' : '') + '>' + v39Esc(t.title) + '</button>';
  }).join('') + '</nav>';
  html += v39TableHtml(cur);
  /* the references dealt: their cards on codex32's card screen, their questions through the core engine */
  var acts = '';
  if (typeof v32StartRun === 'function' && v39ServiceCards().length) acts += v39Btn('btn gold', 'svcflash', ' id="v39-act-svcflash"', v39W('flashThese'));
  if (v39ServiceQs().length) acts += v39Btn('btn ghost', 'svcdrill', ' id="v39-act-svcdrill"', v39W('drillThese'));
  if (acts) html += '<div class="v28-btnrow v39-acts">' + acts + '</div>';
  return html + '</div>';
}
function v39RefView() { return v39Build(v39RefHtml()); }

/* The service references as a deck and a drill. A card is graded in its own
   per-device slot, never exported, as the region cards are; a question
   carries the s- id it was minted (s- plus eight base36 of FNV-1a 64 over
   ["service", stem], frozen in data-service-ref.js), and one without is
   never dealt, so no answer is ever kept under a stem. */
var V39_SVC_ID = /^s-[0-9a-z]{8}$/;
function v39ServiceCards() {
  var d = v39RefData();
  if (!d) return [];
  var out = [];
  v39List(d.cards).forEach(function (c, n) {
    if (c && v39Str(c.f) && v39Str(c.b)) out.push({ id: 'service/' + n, kind: 'service', front: c.f, back: c.b, label: v39W('svcDeck') });
  });
  return out;
}
function v39ServiceQs() {
  var d = v39RefData();
  return d ? v39List(d.questions).filter(function (q) { return v39Valid(q) && !q.sa && typeof q.id === 'string' && V39_SVC_ID.test(q.id); }) : [];
}
function v39ServiceIds() {
  var o = {};
  v39ServiceQs().forEach(function (q) { o[q.id] = 1; });
  return o;
}
/* The drill: every service question, shuffled, through the core engine as v39StartDrill deals the regions'. */
function v39StartServiceDrill() {
  var qs = v39Shuffle(v39ServiceQs());
  if (!qs.length) { if (typeof toast === 'function') toast(v39W('svcNone')); return false; }
  if (typeof stopTimer === 'function') stopTimer();
  S._fin = null; S._v25lt = null;
  S.mode = 'drill'; S.section = v39W('svcDrillSection'); S._again = v39StartServiceDrill;
  S.pool = qs; S.idx = 0; S.correct = 0; S.results = [];
  if (typeof resetQ === 'function') resetQ();
  S.view = 'quiz';
  try { if (typeof V32 !== 'undefined' && V32 && !(typeof V32_RUN !== 'undefined' && V32_RUN && V32_RUN[V32.view])) V32.pend = 'push'; } catch (e) { }
  render();
  return true;
}

/* =========== building and wiring =========== */

function v39Build(html, after) {
  var wire = function (box) { v39Wire(box); if (typeof after === 'function') { try { after(box); } catch (e) { } } };
  if (typeof v32Build === 'function') return v32Build(html, wire);
  var box = document.createElement('div');
  box.innerHTML = html;
  wire(box);
  return box;
}

function v39Wire(box) {
  if (!box || typeof box.addEventListener !== 'function') return;
  box.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v39]') : null;
    if (!node || node.disabled) return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
    try { if (typeof v32Remember === 'function') v32Remember(node); } catch (err) { }
    v39Act(node.getAttribute('data-v39'), node, box);
  }, true);
  /* a disclosure opened by its own summary lights its chip */
  if (typeof box.querySelectorAll !== 'function') return;
  Array.prototype.forEach.call(box.querySelectorAll('details[data-chip]'), function (d) {
    if (typeof d.addEventListener !== 'function') return;
    d.addEventListener('toggle', function () {
      var id = d.getAttribute('data-chip');
      var chip = box.querySelector('[data-v39="chip"][data-sec="' + id + '"]');
      if (!chip) return;
      if (d.open) v39ChipCurrent(box, chip);
      else if (chip.getAttribute('aria-current') === 'step') chip.removeAttribute('aria-current');
    });
  });
}
function v39ChipCurrent(box, chip) {
  try {
    Array.prototype.forEach.call(box.querySelectorAll('[data-v39="chip"][aria-current]'), function (c) { if (c !== chip) c.removeAttribute('aria-current'); });
    chip.setAttribute('aria-current', 'step');
  } catch (e) { }
}
function v39ScrollY() {
  try { return (typeof window !== 'undefined' && window) ? (window.scrollY || window.pageYOffset || 0) : 0; } catch (e) { return 0; }
}
/* A node to the top of the screen, clear of the suite's badge, and focused. */
function v39Land(node) {
  try {
    if (!node || typeof node.getBoundingClientRect !== 'function') return;
    window.scrollTo(0, Math.max(0, node.getBoundingClientRect().top + v39ScrollY() - 72));
    if (typeof node.focus === 'function') node.focus({ preventScroll: true });
  } catch (e) { }
}
/* The atlas opened on a region the article showed: that numbered row to the
   top of the screen and focused, as codex28's v28AtRegion does for the Terroir rows. */
function v39AtRegion(index) {
  try {
    var hit = document.getElementById('atlas-region-' + index);
    if (!hit || typeof hit.getBoundingClientRect !== 'function') return;
    hit.setAttribute('tabindex', '-1');
    if (hit.classList && typeof hit.classList.add === 'function') hit.classList.add('v28-here');
    v39Land(hit);
  } catch (e) { }
}

function v39OpenProducer(id) {
  var pid = v39Str(id);
  if (!pid) return;
  var known = false;
  if (typeof prodById === 'function') { try { known = !!prodById(pid); } catch (e) { known = false; } }
  if (known && typeof v28Act === 'function') {
    v39Pend('push');
    v28Act('producer', { getAttribute: function (k) { return k === 'data-k' ? pid : null; } });
    return;
  }
  if (typeof V25_GO !== 'undefined' && V25_GO) {
    if (typeof V25_GO.producer === 'function') { v39Pend('push'); V25_GO.producer(pid); }
    else if (typeof V25_GO.producers === 'function') { v39Pend('push'); V25_GO.producers(); }
  }
}
function v39OpenWine(id) {
  var wid = v39Str(id);
  if (!wid || typeof v28Open !== 'function') return;
  if (typeof v32OpenWine === 'function') { v32OpenWine(wid); return; }
  S._v28edit = false;
  S.view = 'cellar';
  v28Open(wid, false);
}

function v39Act(act, node, box) {
  var get = function (k) { return node && typeof node.getAttribute === 'function' ? (node.getAttribute(k) || '') : ''; };
  switch (act) {
    case 'region': v39Open('region', get('data-slug'), 'push'); return;
    case 'country': v39Open('country', get('data-key'), 'push'); return;
    case 'index': v39Open('regions', '', 'push'); return;
    case 'table': {
      S._v39table = get('data-key');
      v39Pend('replace');
      render();
      try { var chip = document.querySelector('[data-v39="table"][data-key="' + S._v39table + '"]'); if (chip && typeof chip.focus === 'function') chip.focus({ preventScroll: true }); } catch (e) { }
      return;
    }
    case 'chip': {
      var id = get('data-sec');
      var d = null;
      try { d = (box && typeof box.querySelector === 'function' ? box.querySelector('#' + id) : null) || document.getElementById(id); } catch (e) { d = null; }
      if (!d) return;
      d.open = true;
      if (box) v39ChipCurrent(box, node);
      var sum = (typeof d.querySelector === 'function') ? d.querySelector('summary') : null;
      v39Land(sum || d);
      return;
    }
    case 'map': case 'openmap': {
      var sheet = get('data-sheet');
      if (!sheet) return;
      S._v25area = 'library';
      S.wmap = sheet;
      S._v39land = act === 'map' && get('data-index') !== '' ? Number(get('data-index')) : null;
      v39Pend('push');
      S.view = 'worldmap';
      render();
      return;
    }
    case 'flash': if (typeof v32StartRun === 'function') v32StartRun('region:' + get('data-slug'), { push: true }); return;
    case 'flashsheet': if (typeof v32StartRun === 'function') v32StartRun('regions:' + get('data-sheet'), { push: true }); return;
    case 'drill': v39StartDrill([get('data-slug')]); return;
    case 'drillsheet': v39StartDrill(v39SheetKeys(get('data-sheet'))); return;
    case 'prev': case 'next': {
      var slug = get('data-slug');
      if (!v39Find(slug)) return;
      S._v39region = slug;
      v39Pend('replace');
      render();
      if (typeof v25FocusMain === 'function') { try { v25FocusMain(); } catch (e) { } }
      try { window.scrollTo(0, 0); } catch (e) { }
      return;
    }
    case 'producer': v39OpenProducer(get('data-id')); return;
    case 'wine': v39OpenWine(get('data-id')); return;
    case 'retry': {
      var part = get('data-part');
      if (!part) return;
      delete V39_PARTS.failed[part];
      v39Pend('replace');
      render();
      try { var w = document.getElementById('v39-wait'); if (w && typeof w.focus === 'function') w.focus({ preventScroll: true }); } catch (e) { }
      return;
    }
    case 'keep': v39KeepAll(); return;
    case 'svcflash': if (typeof v32StartRun === 'function') v32StartRun('service', { push: true }); return;
    case 'svcdrill': v39StartServiceDrill(); return;
    default: return;
  }
}

/* =========== the doors =========== */

/* (a) Today's study: The Wine Atlas, after Next reading and before Your first week. */
function v39AtlasRow() {
  if (!v39Has() || typeof v32GoRow !== 'function') return '';
  if (typeof V25_GO === 'undefined' || !V25_GO || typeof V25_GO.worldmap !== 'function') return '';
  if (typeof v25MapSheets === 'function') { try { if (!v25MapSheets().length) return ''; } catch (e) { return ''; } }
  var regions = v39Regions();
  return v32GoRow('worldmap', v39W('atlasRow'), v39W('atlasLine', { maps: v39Sheets().length, regions: regions.length, read: v39ReadCount(regions.map(function (a) { return a.slug; })) }));
}
if (typeof v32TodayRows === 'function') {
  var _v39TodayRows = v32TodayRows;
  v32TodayRows = function () {
    var rows = _v39TodayRows.apply(this, arguments);
    try {
      var row = v39AtlasRow();
      if (!row) return rows;
      var at = rows.indexOf(' id="v32-week"');
      if (at >= 0) { var li = rows.lastIndexOf('<li>', at); if (li >= 0) return rows.slice(0, li) + row + rows.slice(li); }
      return rows + row;
    } catch (e) { return rows; }
  };
}

/* (b) The atlas sheet: Read {region} in depth inside each numbered row, Read {country} in depth after the scope line. */
function v39DoorNode(label, act, slug) {
  var p = document.createElement('p');
  p.className = 'v39-door';
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'v31-btn v31-secondary';
  b.setAttribute('data-v39', act);
  b.setAttribute('data-slug', slug);
  b.textContent = label;
  b.onclick = function () { if (act === 'country') v39Open('country', slug, 'push'); else v39Open('region', slug, 'push'); };
  p.appendChild(b);
  return p;
}
function v39DecorateSheet(view, id) {
  if (!view || typeof view.querySelector !== 'function') return;
  var ix = v39Index();
  if (!ix) return;
  /* the sheet's reading fetched while its map is read, so its articles open whole */
  if (v39PartStamps() && !v39PartReady(id) && !V39_PARTS.failed[id] && (ix.bySheet[id] || ix.countryBySheet[id])) v39LoadPart(id);
  var ol = view.querySelector('.v31-regions');
  var items = ol && ol.children ? Array.prototype.slice.call(ol.children) : [];
  items.forEach(function (li) {
    var lid = (typeof li.getAttribute === 'function' ? li.getAttribute('id') : null) || li.id || '';
    var m = /^atlas-region-(\d+)$/.exec(String(lid));
    if (!m) return;
    var a = ix.byIndex[id + '/' + Number(m[1])];
    if (!a || typeof li.appendChild !== 'function') return;
    li.appendChild(v39DoorNode(v39W('readRegion', { name: a.name }), 'region', a.slug));
  });
  var c = v39SheetCountry(id);
  if (!c) return;
  var scope = view.querySelector('p.v31-scope');
  if (!scope || !scope.parentNode || typeof scope.parentNode.insertBefore !== 'function') return;
  scope.parentNode.insertBefore(v39DoorNode(v39W('readRegion', { name: c.name }), 'country', v39CountryKey(c)), scope.nextSibling);
}
if (typeof v23SheetView === 'function') {
  var _v39SheetView = v23SheetView;
  v23SheetView = function (id) {
    var view = _v39SheetView.apply(this, arguments);
    try { v39DecorateSheet(view, id); } catch (e) { }
    return view;
  };
}

/* (c) The house card: Read {region} in depth among its doors, Read {country} in depth when only the country answers. */
function v39CardDoor(item) {
  var r = v39SlugFor(item && item.region);
  if (!r) return '';
  var a = v39Find(r);
  if (a) return '<button type="button" class="btn small ghost" data-v28="region" data-slug="' + v39Esc(a.slug) + '">' + v39Esc(v39W('readRegion', { name: a.name })) + '</button>';
  var c = v39Country(r);
  if (c) return '<button type="button" class="btn small ghost" data-v28="region" data-slug="country:' + v39Esc(v39CountryKey(c)) + '">' + v39Esc(v39W('readRegion', { name: c.name })) + '</button>';
  return '';
}
if (typeof V28_DOORS !== 'undefined' && V28_DOORS) V28_DOORS.region = 1;
if (typeof v28Act === 'function') {
  var _v39V28Act = v28Act;
  v28Act = function (act, node) {
    var out = _v39V28Act.apply(this, arguments);
    if (act === 'region') {
      var slug = node && typeof node.getAttribute === 'function' ? (node.getAttribute('data-slug') || '') : '';
      if (slug.indexOf('country:') === 0) v39Open('country', slug.slice(8), 'push');
      else if (slug) v39Open('region', slug, 'push');
    }
    return out;
  };
}
if (typeof v28HereBlock === 'function') {
  var _v39HereBlock = v28HereBlock;
  v28HereBlock = function (h, item) {
    var html = _v39HereBlock.apply(this, arguments);
    try {
      var btn = v39CardDoor(item);
      if (!btn) return html;
      var at = html.indexOf('<div class="v28-btnrow v28-doors">');
      if (at >= 0) { var end = html.indexOf('</div>', at); if (end >= 0) return html.slice(0, end) + btn + html.slice(end); }
      var row = '<div class="v28-btnrow v28-doors">' + btn + '</div>';
      var words = (typeof v28W === 'function') ? v28W('houseWords') : '';
      var hw = words ? html.indexOf('<h4 class="v28-eyebrow">' + words) : -1;
      return hw >= 0 ? html.slice(0, hw) + row + html.slice(hw) : html + row;
    } catch (e) { return html; }
  };
}

/* (d) A chapter: the regions it covers, as chips at the foot of its card. */
function v39PrimerKey() {
  try {
    if (typeof PRIMERS === 'undefined' || !Array.isArray(PRIMERS)) return '';
    var k = S.primerKey;
    var p = null;
    PRIMERS.some(function (x) { if (x && x.cat === k) { p = x; return true; } return false; });
    if (!p && (typeof k === 'number' || /^\d+$/.test(String(k)))) p = PRIMERS[Number(k)] || null;
    if (!p) return '';
    return v39Str(p.cat) || v39Str(p.id);
  } catch (e) { return ''; }
}
function v39ChipNodes(slugs, label) {
  var list = v39List(slugs).map(function (s) { return v39Find(s); }).filter(Boolean);
  if (!list.length) return null;
  var frag = document.createElement('div');
  frag.className = 'v39-chipblock';
  var h = document.createElement('h4');
  h.textContent = label;
  frag.appendChild(h);
  var row = document.createElement('div');
  row.className = 'v39-chips';
  row.setAttribute('role', 'group');
  row.setAttribute('aria-label', label);
  list.forEach(function (a) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'v28-chip';
    b.setAttribute('data-go', 'regions');
    b.setAttribute('data-arg', 'region:' + a.slug);
    b.textContent = a.name;
    b.onclick = function () { v39Open('region', a.slug, 'push'); };
    row.appendChild(b);
  });
  frag.appendChild(row);
  return frag;
}
function v39DecoratePrimer(view) {
  if (!view || typeof view.querySelector !== 'function') return;
  var key = v39PrimerKey();
  if (!key) return;
  var cats = v39Join().cats;
  var slugs = Object.prototype.hasOwnProperty.call(cats, key) ? cats[key] : null;
  if (!slugs || !slugs.length) return;
  var card = view.querySelector('.card.primerpage');
  if (!card || typeof card.appendChild !== 'function') return;
  var block = v39ChipNodes(slugs, v39W('chapterRegions'));
  if (block) card.appendChild(block);
}
if (typeof primerView === 'function') {
  var _v39PrimerView = primerView;
  primerView = function () {
    var view = _v39PrimerView.apply(this, arguments);
    try { v39DecoratePrimer(view); } catch (e) { }
    return view;
  };
}

/* (e) A revealed grape card: Read the regions, from join.grapes. A grape the
   articles grow everywhere (Chardonnay is in 65) lists only the regions where
   it leads, so the face stays a card; one that leads nowhere lists them all. */
/* A grape name's folded names: Grenache / Garnacha is grenache and garnacha,
   so the GRAPES card, the Regionale card and an article that spells it
   Gewurztraminer or Nero d'Avola all meet. */
function v39GrapeNames(name) {
  return String(name == null ? '' : name).split('/').map(function (p) { return v39Fold(p); }).filter(Boolean);
}
function v39SameGrape(a, b) {
  var na = v39GrapeNames(a), nb = v39GrapeNames(b);
  return na.some(function (n) { return nb.indexOf(n) >= 0; });
}
function v39GrapeChipsHtml(name) {
  var g = v39Join().grapes;
  var all = [];
  Object.keys(g).forEach(function (k) {
    if (!v39SameGrape(k, name)) return;
    v39List(g[k]).forEach(function (s) { var a = v39Find(s); if (a && all.indexOf(a) < 0) all.push(a); });
  });
  if (!all.length) return '';
  var order = v39Regions();
  all.sort(function (x, y) { return order.indexOf(x) - order.indexOf(y); });
  var lead = all.filter(function (a) { return v39List(a.grapes).some(function (x) { return x && x.role === 'lead' && v39SameGrape(x.name, name); }); });
  var slugs = lead.length ? lead : all;
  var label = lead.length && lead.length < all.length ? v39W('grapeRegionsLead') : v39W('grapeRegions');
  return '<section class="v39-card-regions" aria-label="' + v39Esc(label) + '"><p class="v28-eyebrow">' + v39Esc(label) + '</p><div class="v39-chips">'
    + slugs.map(function (a) { return '<button type="button" class="v28-chip" data-go="regions" data-arg="region:' + v39Esc(a.slug) + '">' + v39Esc(a.name) + '</button>'; }).join('') + '</div></section>';
}

/* (f) The Library: two doors above the search box. */
function v39DoorSection(cls, title, line, label, onOpen) {
  var sec = document.createElement('section');
  sec.className = 'v36-library-door v39-library-door ' + cls;
  var h = document.createElement('h3');
  h.textContent = title;
  sec.appendChild(h);
  var p = document.createElement('p');
  p.textContent = line;
  sec.appendChild(p);
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn gold';
  b.textContent = label;
  b.onclick = onOpen;
  sec.appendChild(b);
  return sec;
}
function v39LibraryDoors(view) {
  if (!view || typeof view.querySelector !== 'function') return;
  var anchor = view.querySelector('.codexfind');
  var into = anchor && anchor.parentNode ? anchor.parentNode : view;
  if (!into || typeof into.insertBefore !== 'function') return;
  if (v39Has()) {
    into.insertBefore(v39DoorSection('v39-door-regions', v39W('libRegionsH'), v39W('libRegionsLine', { regions: v39Regions().length, countries: Object.keys(v39Countries()).length }), v39W('libRegionsBtn'), function () { v39Open('regions', '', 'push'); }), anchor);
  }
  if (v39Tables().length) {
    into.insertBefore(v39DoorSection('v39-door-ref', v39W('libRefH'), v39W('libRefLine'), v39W('libRefBtn'), function () { v39Open('serviceref', '', 'push'); }), anchor);
  }
}
if (typeof v32LibraryView === 'function') {
  var _v39LibraryView = v32LibraryView;
  v32LibraryView = function () {
    var view = _v39LibraryView.apply(this, arguments);
    try { v39LibraryDoors(view); } catch (e) { }
    return view;
  };
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.library = v32LibraryView;
}

/* (g) The Terroir Atlas: Read in depth on every row an article answers for. */
function v39DecorateRef(view) {
  if (!view || typeof view.querySelectorAll !== 'function') return;
  var ix = v39Index();
  if (!ix) return;
  Array.prototype.forEach.call(view.querySelectorAll('.refrow'), function (row) {
    var nameNode = typeof row.querySelector === 'function' ? row.querySelector('.refr') : null;
    var name = v39Fold(nameNode ? nameNode.textContent : '');
    var slug = name && ix.terroir[name] ? ix.terroir[name] : '';
    var a = slug ? v39Find(slug) : null;
    if (!a || typeof row.appendChild !== 'function') return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn small ghost v39-ref-btn';
    b.setAttribute('data-v39', 'region');
    b.setAttribute('data-slug', a.slug);
    b.innerHTML = v39Esc(v39W('readInDepth')) + '<span class="sr-only">: ' + v39Esc(a.name) + '</span>';
    b.onclick = function () { v39Open('region', a.slug, 'push'); };
    row.appendChild(b);
  });
}
if (typeof refView === 'function') {
  var _v39RefView = refView;
  refView = function () {
    var view = _v39RefView.apply(this, arguments);
    try { v39DecorateRef(view); } catch (e) { }
    return view;
  };
}

/* =========== the decks =========== */

function v39Cards(rec) {
  if (!rec) return [];
  var key = v39Str(rec.slug) || v39CountryKey(rec);
  return v39List(rec.cards).filter(function (c) { return c && v39Str(c.f) && v39Str(c.b); }).map(function (c, n) {
    return { id: key + '/' + n, kind: 'region', front: c.f, back: c.b, label: v39Str(rec.name), sheet: v39Str(rec.sheet) };
  });
}
function v39SheetCards(sheet) {
  var out = [];
  v39SheetRegions(sheet).forEach(function (a) { out = out.concat(v39Cards(a)); });
  var c = v39SheetCountry(sheet);
  if (c) out = out.concat(v39Cards(c));
  return out;
}
function v39AllCards() {
  var out = [];
  v39Regions().forEach(function (a) { out = out.concat(v39Cards(a)); });
  var cs = v39Countries();
  Object.keys(cs).forEach(function (k) { if (v39Country(k)) out = out.concat(v39Cards(cs[k])); });
  return out;
}
var V39_DECK_RE = /^(regions|regions:([a-z0-9-]+)|region:([a-z0-9-]+))$/;

if (typeof v32DeckDef === 'function') {
  var _v39DeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    var s = String(id || '');
    if (s === 'service') {
      var sd = { id: s, name: v39W('svcDeck'), cards: v39ServiceCards(), kind: 'service' };
      sd.learnt = v32Learnt(sd);
      return sd;
    }
    var m = V39_DECK_RE.exec(s);
    if (m) {
      var def = { id: s, name: '', cards: [], kind: 'region' };
      if (s === 'regions') { def.name = v39W('everyRegion'); def.cards = v39AllCards(); }
      else if (m[2]) {
        var c = v39SheetCountry(m[2]);
        if (!c && !v39SheetRegions(m[2]).length) return _v39DeckDef(id);
        def.name = c ? v39Str(c.name) : v39SheetName(m[2]);
        def.cards = v39SheetCards(m[2]);
      } else {
        var rec = v39Record(m[3]);
        if (!rec) return _v39DeckDef(id);
        def.name = v39Str(rec.name);
        def.cards = v39Cards(rec);
      }
      def.learnt = v32Learnt(def);
      return def;
    }
    return _v39DeckDef(id);
  };
}
if (typeof v32Learnt === 'function') {
  var _v39Learnt = v32Learnt;
  v32Learnt = function (def) {
    if (def && def.kind === 'region') { var rec = v39CardRec(); return def.cards.filter(function (c) { return rec[c.id] === 'got'; }).length; }
    if (def && def.kind === 'service') { var srec = v39SvcRec(); return def.cards.filter(function (c) { return srec[c.id] === 'got'; }).length; }
    return _v39Learnt(def);
  };
}
if (typeof v32Grade === 'function') {
  var _v39Grade = v32Grade;
  v32Grade = function (got) {
    var r = S._v32run;
    var c = r && r.flip && r.deck && r.deck.length ? r.cards[r.deck[0]] : null;
    if (c && c.kind === 'region') v39CardMark(c.id, !!got);
    else if (c && c.kind === 'service') v39SvcMark(c.id, !!got);
    return _v39Grade(got);
  };
}
/* A region card's two faces, and a service card's the same way; a revealed grape card gains its regions. */
if (typeof v32CardFace === 'function') {
  var _v39CardFace = v32CardFace;
  v32CardFace = function (c, run) {
    if (c && (c.kind === 'region' || c.kind === 'service')) {
      var w = (typeof v32W === 'function') ? v32W : function (k) { return k === 'front' ? 'Front' : 'Answer'; };
      var head = w('front') + (c.label ? ' · ' + v39Esc(c.label) : '');
      if (!run || !run.flip) return '<button type="button" class="card v28-front" data-v32="flip" id="v32-face"><span class="v28-eyebrow v28-ink">' + head + '</span><span class="v28-fname">' + v39Esc(c.front) + '</span></button>';
      return '<div class="card v28-back" id="v32-face"><p class="v28-eyebrow v28-ink">' + w('answer') + (c.label ? ' · ' + v39Esc(c.label) : '') + '</p>'
        + '<h3 class="v28-bname" tabindex="-1" id="v32-ans">' + v39Esc(c.front) + '</h3><p>' + v39Esc(c.back) + '</p></div>';
    }
    var html = _v39CardFace.apply(this, arguments);
    try {
      if (c && c.kind === 'grape' && run && run.flip && c.g && v39Str(c.g.g)) html += v39GrapeChipsHtml(c.g.g);
    } catch (e) { }
    return html;
  };
}
/* The Flashcards root: The regions, after every other group, and the Service references beside it. */
if (typeof v32FlashcardsHtml === 'function') {
  var _v39FlashcardsHtml = v32FlashcardsHtml;
  v32FlashcardsHtml = function () {
    var html = _v39FlashcardsHtml.apply(this, arguments);
    try {
      if (typeof v32DeckRow !== 'function') return html;
      var group = '';
      if (v39Has()) {
        var rows = v32DeckRow('regions', v39W('everyRegion'));
        v39Sheets().forEach(function (id) { var c = v39SheetCountry(id); rows += v32DeckRow('regions:' + id, c ? c.name : v39SheetName(id)); });
        group += v39Group(v39W('fcGroup'), rows, 'v39-fc-regions');
      }
      if (v39ServiceCards().length) group += v39Group(v39W('svcGroup'), v32DeckRow('service', v39W('svcFlashRow')), 'v39-fc-service');
      if (!group) return html;
      var at = html.lastIndexOf('</div>');
      return at < 0 ? html + group : html.slice(0, at) + group + html.slice(at);
    } catch (e) { return html; }
  };
}

/* =========== the drill and the quiz =========== */

function v39Valid(q) {
  if (!q || typeof q !== 'object' || !v39Str(q.q)) return false;
  if (q.sa) return !!v39Str(q.ans);
  return Array.isArray(q.opts) && q.opts.length >= 2 && typeof q.a === 'number' && q.a >= 0 && q.a < q.opts.length;
}
/* The questions of a list of slugs and country keys, each once. */
function v39Questions(keys) {
  var out = [], seen = {};
  v39List(keys).forEach(function (k) {
    var rec = v39Record(k);
    if (!rec) return;
    v39List(rec.questions).forEach(function (q) {
      if (!v39Valid(q)) return;
      var id = v39Str(q.id) || (k + '/' + q.q);
      if (seen[id]) return;
      seen[id] = 1;
      out.push(q);
    });
  });
  return out;
}
function v39SheetKeys(sheet) {
  var keys = v39SheetRegions(sheet).map(function (a) { return a.slug; });
  var c = v39SheetCountry(sheet);
  if (c) keys.push(v39CountryKey(c));
  return keys;
}
function v39AllKeys() {
  var keys = v39Regions().map(function (a) { return a.slug; });
  Object.keys(v39Countries()).forEach(function (k) { if (v39Country(k)) keys.push(k); });
  return keys;
}

/* The drill: the articles' questions through the core engine, as the quick
   quiz deals them; ten by default, every question of one region when one is asked. */
function v39StartDrill(slugs) {
  var list = v39List(Array.isArray(slugs) ? slugs : [slugs]).map(function (s) { return v39Str(s); }).filter(Boolean);
  var qs = v39Shuffle(v39Questions(list));
  if (!qs.length) { if (typeof toast === 'function') toast(v39W('noQuestions')); return false; }
  if (list.length !== 1) qs = qs.slice(0, 10);
  if (typeof stopTimer === 'function') stopTimer();
  S._fin = null; S._v25lt = null;
  S.mode = 'drill'; S.section = v39W('drillSection'); S._again = function () { v39StartDrill(list); };
  S.pool = qs; S.idx = 0; S.correct = 0; S.results = [];
  if (typeof resetQ === 'function') resetQ();
  S.view = 'quiz';
  try { if (typeof V32 !== 'undefined' && V32 && !(typeof V32_RUN !== 'undefined' && V32_RUN && V32_RUN[V32.view])) V32.pend = 'push'; } catch (e) { }
  render();
  return true;
}

/* Two region multiple choice questions for the quick quiz, from the articles
   the current level asks (any article when none does). */
function v39QuickTwo() {
  var lv = (typeof activeLevel !== 'undefined') ? activeLevel : 'certified';
  var all = v39Regions();
  var asked = all.filter(function (a) { return v39List(a.asked).indexOf(lv) >= 0; });
  var pool = (asked.length ? asked : all);
  var qs = [];
  pool.forEach(function (a) { v39List(a.questions).forEach(function (q) { if (v39Valid(q) && !q.sa) qs.push({ q: q, slug: a.slug }); }); });
  qs = v39Shuffle(qs);
  var out = [], seen = {};
  qs.forEach(function (x) { if (out.length < 2 && !seen[x.slug]) { seen[x.slug] = 1; out.push(x.q); } });
  if (out.length < 2) qs.forEach(function (x) { if (out.length < 2 && out.indexOf(x.q) < 0) out.push(x.q); });
  return out;
}
if (typeof v32QuickPool === 'function') {
  var _v39QuickPool = v32QuickPool;
  v32QuickPool = function () {
    var pool = _v39QuickPool.apply(this, arguments) || [];
    try {
      var two = v39QuickTwo();
      if (!two.length) return pool;
      var room = Math.max(0, pool.length + two.length - 10);
      for (var i = pool.length - 1; i >= 0 && room > 0; i--) {
        var q = pool[i];
        if (!(q && typeof q.id === 'string' && q.id.indexOf('h-') === 0)) { pool.splice(i, 1); room--; }
      }
      two.forEach(function (rq) { pool.splice(Math.floor(Math.random() * (pool.length + 1)), 0, rq); });
      return pool.slice(0, 10);
    } catch (e) { return pool; }
  };
}

/* The Quick quiz row says what the quiz now deals: codex32's line counted
   five from the level, but two of those places go to the regions. */
function v39QuickCount() {
  var lv = (typeof activeLevel !== 'undefined') ? activeLevel : 'certified';
  var all = v39Regions();
  var asked = all.filter(function (a) { return v39List(a.asked).indexOf(lv) >= 0; });
  var pool = asked.length ? asked : all;
  var n = 0;
  for (var i = 0; i < pool.length && n < 2; i++) {
    var qs = v39List(pool[i].questions);
    for (var j = 0; j < qs.length && n < 2; j++) if (v39Valid(qs[j]) && !qs[j].sa) n++;
  }
  return n;
}
if (typeof v32QuickLine === 'function') {
  var _v39QuickLine = v32QuickLine;
  v32QuickLine = function () {
    try {
      var L = (typeof v32Lv === 'function') ? v32Lv() : null;
      if (L && L.name && v39QuickCount() >= 2) {
        var house = (typeof v32HouseQCount === 'function') ? v32HouseQCount() : 0;
        return v39W(house ? 'quickRegions' : 'quickRegionsLevel', { level: L.name });
      }
    } catch (e) { }
    return _v39QuickLine.apply(this, arguments);
  };
}

/* An r- key (a region's question) or an s- key (a service reference's) is
   never level progress, never scheduled, never an orphan. */
function v39BareKey(k) {
  var s = String(k == null ? '' : k);
  var i = s.indexOf('|');
  return i >= 0 ? s.slice(i + 1) : s;
}
function v39IsOwnId(id) { return typeof id === 'string' && (id.indexOf('r-') === 0 || id.indexOf('s-') === 0); }
function v39IsRegionKey(k) { return typeof k === 'string' && v39IsOwnId(v39BareKey(k)); }
if (typeof keyOwned === 'function') {
  var _v39KeyOwned = keyOwned;
  keyOwned = function (k) {
    if (v39IsRegionKey(k)) return false;
    return _v39KeyOwned.apply(this, arguments);
  };
}
if (typeof srsRecord === 'function') {
  var _v39SrsRecord = srsRecord;
  srsRecord = function (q) {
    if (q && v39IsOwnId(q.id)) return;
    return _v39SrsRecord.apply(this, arguments);
  };
}
if (typeof qidAudit === 'function') {
  var _v39QidAudit = qidAudit;
  qidAudit = function () {
    var out = _v39QidAudit.apply(this, arguments);
    try {
      var ix = v39Index();
      var known = {};
      if (ix) Object.keys(ix.qids).forEach(function (k) { known[k] = 1; });
      Object.keys(v39ServiceIds()).forEach(function (k) { known[k] = 1; });
      var orph = out && out.orphanedKeys;
      if (orph && typeof orph === 'object') {
        Object.keys(orph).forEach(function (name) {
          var left = v39List(orph[name]).filter(function (k) { return !known[v39BareKey(k)]; });
          if (left.length) orph[name] = left; else delete orph[name];
        });
      }
    } catch (e) { }
    return out;
  };
}

/* The Quizzes root: The regions, with Every region, a row per sheet and The Village tasting. */
if (typeof v32QuizzesHtml === 'function') {
  var _v39QuizzesHtml = v32QuizzesHtml;
  v32QuizzesHtml = function () {
    var html = _v39QuizzesHtml.apply(this, arguments);
    try {
      if (typeof v32GoRow !== 'function') return html;
      var rows = '';
      if (v39Has()) {
        var allQ = v39Questions(v39AllKeys()).length;
        if (allQ) rows += v32GoRow('regiondrill', v39W('everyRegion'), v39W('qzEveryLine', { n: allQ, m: v39Regions().length }), 'all');
        v39Sheets().forEach(function (id) {
          var c = v39SheetCountry(id);
          var n = v39Questions(v39SheetKeys(id)).length;
          if (n) rows += v32GoRow('regiondrill', v39W('qzSheetRow', { name: c ? c.name : v39SheetName(id) }), v39W('qzSheetLine', { n: n }), 'sheet:' + id);
        });
      }
      if (typeof gridStart === 'function' && typeof gridView === 'function') rows += v32GoRow('villagetasting', v39W('tastingRow'), v39W('tastingLine'));
      var group = v39Group(v39W('qzGroup'), rows, 'v39-qz-regions');
      var nSvc = v39ServiceQs().length;
      if (nSvc) group += v39Group(v39W('svcGroup'), v32GoRow('servicedrill', v39W('svcDrillRow'), v39W('svcDrillLine', { n: nSvc })), 'v39-qz-service');
      if (!group) return html;
      var at = html.indexOf('<section class="v32-group v32-testgroup">');
      if (at < 0) at = html.lastIndexOf('</div>');
      return at < 0 ? html + group : html.slice(0, at) + group + html.slice(at);
    } catch (e) { return html; }
  };
}

/* =========== the Village tasting: four wines, two white and two red, the written grid, 45 minutes ===========

   The Court pours the Village candidate four wines, two white and two red, to
   be described and named on the written grid in 45 minutes (the Court's
   Certified Sommelier Examination page and exam guide, read 11 October 2026).
   codex20's gridStart deals a random slice of the level's pool with no regard
   to colour, so the run re-deals the four: two whites, then two reds, the
   whites first as the guide advises. A level whose pool lacks two of either
   colour keeps gridStart's four. The clock reads a word when it is up and
   never stops the run. It counts from a stored end time, so a render (every
   answer draws the grid again) never resets it and a throttled timer never
   slows it; leaving the grid holds what is left, and coming back runs it on
   from there. Pour another flight (codex20's gridAgain) deals the Village
   tasting again, with codex21's Finals branch kept ahead of it. */

var V39_CLOCK = { timer: null };
function v39ClockStop() {
  if (V39_CLOCK.timer) { try { clearInterval(V39_CLOCK.timer); } catch (e) { } V39_CLOCK.timer = null; }
}
function v39Fmt(s) {
  var n = Math.max(0, Math.floor(Number(s) || 0));
  var m = Math.floor(n / 60), ss = n % 60;
  return m + ':' + (ss < 10 ? '0' : '') + ss;
}
function v39ClockText(s) { return s > 0 ? v39W('clockLeft', { time: v39Fmt(s) }) : v39W('clockUp'); }
/* the seconds left, read from the stored end time while the clock runs */
function v39ClockNow(tg) {
  if (typeof tg.clockEnd === 'number') tg.clock = Math.max(0, Math.ceil((tg.clockEnd - Date.now()) / 1000));
  return tg.clock;
}
/* leaving the grid: keep what is left and drop the end time */
function v39ClockHold() {
  var tg = S.tg;
  if (tg && typeof tg.clockEnd === 'number') { v39ClockNow(tg); tg.clockEnd = null; }
  v39ClockStop();
}
function v39ClockTick() {
  var tg = S.tg;
  if (!tg || S.view !== 'grid' || typeof tg.clock !== 'number') { v39ClockStop(); return; }
  v39ClockNow(tg);
  try { var n = document.getElementById('v39-clock'); if (n) n.textContent = v39ClockText(tg.clock); } catch (e) { }
  if (tg.clock <= 0) v39ClockStop();
}
/* a running clock is left alone: a render never restarts the count */
function v39ClockStart() {
  if (V39_CLOCK.timer) return;
  V39_CLOCK.timer = setInterval(v39ClockTick, 1000);
}
function v39GridDeck() {
  if (typeof gridPool !== 'function' || typeof shuffle !== 'function') return null;
  var pool = gridPool() || [];
  var whites = shuffle(pool.filter(function (g) { return g && g.c === 'w'; })).slice(0, 2);
  var reds = shuffle(pool.filter(function (g) { return g && g.c === 'r'; })).slice(0, 2);
  return whites.length === 2 && reds.length === 2 ? whites.concat(reds) : null;
}
/* again: Pour another flight, a new run on the same screen, so no push */
function v39GridStart(again) {
  if (typeof gridStart !== 'function') return false;
  v39ClockStop();
  if (!again) v39Pend('push');
  gridStart(4);
  if (!S.tg || S.view !== 'grid') return false;
  var deck = v39GridDeck();
  if (deck) {
    S.tg.deck = deck;
    S.tg.idx = 0;
    if (typeof gridDealOpts === 'function') gridDealOpts();
  }
  S.tg.clock = 45 * 60;
  S.tg.clockEnd = null;
  S.tg.shape = 'four-wines';
  render();
  return true;
}
if (typeof gridView === 'function') {
  var _v39GridView = gridView;
  gridView = function () {
    var v = _v39GridView.apply(this, arguments);
    try {
      var tg = S.tg;
      if (tg && tg.shape === 'four-wines' && typeof tg.clock === 'number' && v && typeof v.insertBefore === 'function') {
        if (typeof tg.clockEnd !== 'number' && tg.clock > 0) tg.clockEnd = Date.now() + tg.clock * 1000;
        v39ClockNow(tg);
        var p = document.createElement('p');
        p.className = 'v39-clock';
        p.id = 'v39-clock';
        p.setAttribute('role', 'timer');
        p.textContent = v39ClockText(tg.clock);
        v.insertBefore(p, v.firstChild || null);
        if (tg.clock > 0) v39ClockStart(); else v39ClockStop();
      }
    } catch (e) { }
    return v;
  };
}
/* Pour another flight at the end of the Village tasting deals the tasting
   again; inside a Finals codex21's branch (the grid moves on to the floor)
   still comes first, and any other grid keeps codex20's own again */
if (typeof gridAgain === 'function') {
  var _v39GridAgain = gridAgain;
  gridAgain = function () {
    if (S._fin && S._fin.phase === 'grid') return _v39GridAgain.apply(this, arguments);
    if (S.tg && S.tg.shape === 'four-wines') { v39GridStart(true); return; }
    return _v39GridAgain.apply(this, arguments);
  };
}
if (typeof applyLevel === 'function') {
  var _v39ApplyLevel = applyLevel;
  applyLevel = function () {
    v39ClockStop();
    return _v39ApplyLevel.apply(this, arguments);
  };
}

/* =========== the render, outermost =========== */

var _v39Render = render;
render = function () {
  var out = _v39Render.apply(this, arguments);
  try {
    if (S.view !== 'grid') v39ClockHold();
    if (S.view === 'worldmap' && S._v39land !== null && S._v39land !== undefined) {
      var at = S._v39land;
      S._v39land = null;
      v39AtRegion(at);
    } else if (S.view !== 'worldmap') S._v39land = null;
  } catch (e) { }
  return out;
};

/* =========== a page's place, kept across a door ===========

   A door followed from an article or a country page (a producer, a house
   wine, the map, a deck, a drill, a region, the country, or the bar above)
   pushes its own entry, and Back draws the page again: every section
   closed, so the page is far shorter than the one the scroll was saved on
   and the reader lands near the top with the door they pressed hidden in a
   closed section. The sections open when the page is left are noted against
   its address (codex32 saves the scroll at the same moment, v32SaveScroll)
   and opened again on the way back (v32RestoreScroll), before codex32 puts
   the scroll back and focuses the door: the same page, the same height,
   the same place. The page is named by what it draws (#v39's data-slug or
   data-key), since the state may already name the next screen. */
var V39_OPEN = {};
function v39PageKey() {
  try {
    var n = document.getElementById('v39');
    if (!n || typeof n.getAttribute !== 'function') return '';
    var slug = n.getAttribute('data-slug'), key = n.getAttribute('data-key');
    return slug ? 'region:' + slug : (key ? 'country:' + key : '');
  } catch (e) { return ''; }
}
function v39Sections() {
  try {
    var box = document.getElementById('view');
    return box && typeof box.querySelectorAll === 'function' ? Array.prototype.slice.call(box.querySelectorAll('details.v39-sec')) : [];
  } catch (e) { return []; }
}
function v39KeepOpen() {
  try {
    var k = v39PageKey();
    if (!k || typeof location === 'undefined' || !location) return;
    var secs = v39Sections();
    if (!secs.length) return;
    V39_OPEN[location.href] = { key: k, open: secs.filter(function (d) { return d.open && d.id; }).map(function (d) { return d.id; }) };
  } catch (e) { }
}
function v39PutOpen() {
  try {
    if (typeof location === 'undefined' || !location) return;
    var o = V39_OPEN[location.href];
    if (!o || o.key !== v39PageKey()) return;
    v39Sections().forEach(function (d) { if (d.id) d.open = o.open.indexOf(d.id) >= 0; });
  } catch (e) { }
}
if (typeof v32SaveScroll === 'function') {
  var _v39SaveScroll = v32SaveScroll;
  v32SaveScroll = function () { v39KeepOpen(); return _v39SaveScroll.apply(this, arguments); };
}
if (typeof v32RestoreScroll === 'function') {
  var _v39RestoreScroll = v32RestoreScroll;
  v32RestoreScroll = function () {
    v39PutOpen();
    /* a page still waiting on its file is not yet its full height: the place is put back again when it lands */
    try { if (v39WaitingHere() && typeof location !== 'undefined' && location) V39_PARTS.restore = location.href; } catch (e) { }
    return _v39RestoreScroll.apply(this, arguments);
  };
}

/* =========== the house arriving: these views drawn again ===========
   codex27 draws again, when the house lands or changes, only the screens it
   knew, and codex38 adds its own; a first visit opened on an article's
   address drew before the house landed, so On our list stayed missing until
   a reload. The regions, a country and an article are drawn again too, in
   place: no entry made, no scroll saved over, the sections that stood open
   opened again and the place and the focus put back. None holds a form. */
var V39_REDRAW = { regions: 1, country: 1, region: 1 };
function v39Redraw() {
  try {
    if (typeof V32 !== 'undefined' && V32 && V32.rendering) { setTimeout(v39Redraw, 0); return; }
    if (!V39_REDRAW[S.view]) return;
    var key = v39PageKey();
    var open = v39Sections().filter(function (d) { return d.open && d.id; }).map(function (d) { return d.id; });
    var fk = '';
    try { var ae = document.activeElement; if (ae && ae !== document.body && typeof v32FocusKey === 'function') fk = v32FocusKey(ae); } catch (e) { fk = ''; }
    var y = v39ScrollY();
    try { if (typeof V32 !== 'undefined' && V32) V32.popping = true; } catch (e) { }
    v39Pend('replace');
    render();
    if (key && key === v39PageKey()) v39Sections().forEach(function (d) { if (d.id) d.open = open.indexOf(d.id) >= 0; });
    try { window.scrollTo(0, y); } catch (e) { }
    if (fk) v39FocusBack(fk);
  } catch (e) { }
}
if (typeof v27Redraw === 'function') {
  var _v39Redraw = v27Redraw;
  v27Redraw = function () {
    if (typeof S !== 'undefined' && S && V39_REDRAW[S.view]) { v39Redraw(); return; }
    return _v39Redraw.apply(this, arguments);
  };
}

/* =========== the styles ===========
   The art's own tokens: ink and claret inside a card, gold and parchment on
   the dark page; every control at least 44px. */
(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v39-style';
  css.textContent = [
    '.wrap .v39-lead{font-size:21px;line-height:1.6;margin:0 0 14px;color:var(--parch)}',
    '.wrap .v39-steps{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0 28px;padding:14px 0;border-block:1px solid var(--line)}',
    '.wrap .v39-steps .v28-chip{min-height:44px;white-space:normal;text-align:left;max-width:100%}',
    '.wrap .v39-steps [aria-current=step]{background:var(--gold);color:var(--bg);border-color:var(--gold)}',
    '.wrap .card.v39-sections{padding-top:10px;padding-bottom:10px}',
    '.wrap .card.v39-sections .v28-q{border-bottom-color:var(--field-line)}',
    '.wrap .card.v39-sections .v28-q>summary{color:var(--claret);font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:16px;letter-spacing:.04em}',
    '.wrap .card.v39-sections .v28-q>summary::after{color:var(--ink-soft)}',
    '.wrap .card.v39-sections .v28-q:last-child{border-bottom:0}',
    '.wrap .v39-body{padding:2px 0 14px}',
    '.wrap .v39-body p,.wrap .v39-body li,.wrap .v39-body dd{font-size:17px;line-height:1.55;color:var(--ink)}',
    '.wrap .v39-body h4{margin:14px 0 6px}',
    '.wrap .v39-lines{margin:0 0 10px 20px;padding:0}',
    '.wrap .v39-lines li{margin-bottom:6px}',
    '.wrap .v39-sources a{display:block;min-height:44px;padding:10px 0;box-sizing:border-box;color:var(--claret);text-decoration:underline;text-underline-offset:3px}',
    '.wrap .v39-list{list-style:none;margin-left:0}',
    '.wrap .v39-list li{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px}',
    '.wrap .v39-list .btn{min-height:44px;white-space:normal;text-align:left}',
    '.wrap .v39-pairs{display:grid;grid-template-columns:minmax(7em,.55fr) minmax(0,1fr);gap:6px 12px;margin:0 0 12px}',
    '.wrap .v39-pairs dt{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:14px;letter-spacing:.05em;color:var(--claret);padding-top:3px;overflow-wrap:anywhere}',
    '.wrap .v39-pairs dd{margin:0;overflow-wrap:anywhere}',
    '.wrap .v39-places,.wrap .v39-places ul{margin:4px 0 6px 18px;padding:0}',
    '.wrap .v39-places li{margin-bottom:6px}',
    '.wrap .v39-depth,.wrap .v39-role{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:12px;letter-spacing:.08em;color:var(--ink-soft);margin-left:4px;text-transform:uppercase}',
    '.wrap .v39-doors{list-style:decimal;margin:0 0 10px 22px;padding:0}',
    '.wrap .v39-doors li{margin-bottom:10px}',
    '.wrap .v39-doors .btn{min-height:44px;white-space:normal;text-align:left;font-size:16px}',
    '.wrap .v39-doorline{display:block;margin-top:4px;color:var(--ink-soft);font-size:16px;line-height:1.5}',
    '.wrap .v39-note{font-style:italic;color:var(--ink-soft)}',
    '.wrap .v39-acts{margin:18px 0 12px}',
    '.wrap .v39-acts .btn{min-height:44px;white-space:normal;text-align:left;max-width:100%}',
    '.wrap .v39-index .v25row[aria-current=true]{outline:1px solid var(--gold-soft);outline-offset:2px}',
    /* a page waiting on its sheet's file: a card on the page, ink on parchment */
    '.wrap .v39-wait{padding:16px 18px;margin:0 0 18px}',
    '.wrap .v39-wait p{font-size:17px;line-height:1.55;color:var(--ink);margin:0 0 10px}',
    '.wrap .v39-wait p:last-child{margin-bottom:0}',
    '.wrap .v39-wait .btn{min-height:44px}',
    '.wrap .v39-keep{margin:4px 0 18px}',
    '.wrap .v39-keep .v39-keepline:empty{display:none}',
    /* the chips at the foot of a chapter sit on parchment */
    '.wrap .v39-chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 0}',
    '.wrap .v39-chips .v28-chip{min-height:44px;white-space:normal;text-align:left;max-width:100%}',
    '.wrap .card .v39-chips .v28-chip{color:var(--claret);border-color:var(--claret);background:rgba(123,30,46,.06)}',
    '.wrap .card .v39-chips .v28-chip:hover{background:rgba(123,30,46,.12);border-color:var(--claret-deep,var(--claret))}',
    '.wrap .v39-chipblock{margin-top:16px}',
    '.wrap .v39-card-regions{margin:12px 0 0}',
    '.wrap .v39-card-regions .v28-eyebrow{margin-top:0}',
    /* the atlas doors, the Terroir rows, the Library doors */
    '.wrap .v39-door{margin:10px 0 0}',
    '.wrap .v39-door .v31-btn{white-space:normal;text-align:left;max-width:100%;min-height:44px}',
    '.wrap .refrow .v39-ref-btn{grid-column:1/-1;justify-self:start;min-height:44px}',
    '.wrap .v39-library-door{margin:18px 0 24px;padding:22px;border:1px solid var(--gold);background:var(--bg2)}',
    '.wrap .v39-library-door h3{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-weight:500;color:var(--gold-hi);line-height:1.4;margin:0 0 8px}',
    '.wrap .v39-library-door p{font-size:18px;line-height:1.6;color:var(--parch);margin:0 0 12px}',
    '.wrap .v39-library-door .btn{min-height:44px}',
    /* the service tables: a table on a wide screen, a labelled block per row on a phone */
    '.wrap .v39-caption{font-size:17px;line-height:1.5;color:var(--ink);margin:0 0 10px}',
    '.wrap .v39-tablewrap{overflow-x:auto;margin:0 0 12px}',
    '.wrap .v39-table{width:100%;border-collapse:collapse;font-size:15px}',
    '.wrap .v39-table th,.wrap .v39-table td{border:1px solid rgba(42,28,20,.25);padding:6px 8px;text-align:left;vertical-align:top;color:var(--ink);line-height:1.45}',
    '.wrap .v39-table thead th{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:12px;letter-spacing:.08em;color:var(--claret)}',
    '.wrap .v39-table tbody th{font-weight:600}',
    '.wrap .v39-table-card h4{margin:14px 0 6px}',
    '.wrap .v39-table-card li,.wrap .v39-table-card dd{color:var(--ink);font-size:16px;line-height:1.5}',
    '@media(max-width:599px){',
    '.wrap .v39-lead{font-size:19px}',
    '.wrap .v39-steps .v28-chip{font-size:15px}',
    '.wrap .v39-table thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}',
    '.wrap .v39-table,.wrap .v39-table tbody,.wrap .v39-table tr,.wrap .v39-table th,.wrap .v39-table td{display:block;width:auto}',
    '.wrap .v39-table tr{border:1px solid rgba(42,28,20,.25);border-radius:3px;padding:8px 10px;margin:0 0 10px}',
    '.wrap .v39-table th,.wrap .v39-table td{border:0;padding:3px 0;font-size:16px}',
    '.wrap .v39-table tbody th{font-size:17px}',
    '.wrap .v39-table td::before{content:attr(data-col) ": ";font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:12px;letter-spacing:.06em;color:var(--claret)}',
    '.wrap .v39-pairs{grid-template-columns:minmax(0,1fr)}',
    '.wrap .v39-pairs dd{margin-bottom:6px}',
    '}',
    /* the Village tasting's clock, on the dark page above the grid */
    '.wrap .v39-clock{margin:0 0 10px;padding:10px 12px;min-height:44px;box-sizing:border-box;border:1px solid var(--line);border-radius:3px;font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:17px;letter-spacing:.04em;color:var(--gold-hi);background:var(--bg2)}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();
