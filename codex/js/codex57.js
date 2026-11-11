/* ================== CODEX LVII: THE GRAPES TAB AT THE TABLE ==================

   The Grapes tab at the table, 9 November 2026. Loaded after codex56.js and
   js/data-grapes-table.js, before boot.js. It edits no earlier layer and no
   data file; every wrapper is typeof guarded and outermost, every registry is
   extended key by key, never replaced, and the layer declares with var and
   function only. Every string it shows lives in V57_WORDS (read by v57W); the
   table's own fields (GRAPE_TABLE, built by .scripts/grapes) are drawn as
   they are written. Its CSS lives in its own v57-style element, every
   selector under .wrap, every colour one of the house's own tokens so the
   night page and day service both read well.

   The owner asked for the Grapes tab to be expanded and improved: a tableside
   description at the top of each grape, tasting language more descriptive
   than the bare word citrus, the difference between the Old World and the
   New World styles of the same grape, and whatever else a master sommelier
   would improve. A read-only review found no line to say at the table, a
   bare family word at the top of the glass, a one word flag where the two
   worlds should be described, twelve thin pages, house grapes with no page
   and nothing for service. The content is one record a grape in GRAPE_TABLE;
   this layer reads it. It is a display overlay on the Grapes tab's own
   surfaces: GRAPES, GRAPES_PLUS, INTRO_GRAPES, TASTE and the grid data are
   never changed, and no question id, stem or card name is touched. A grape
   with no record in the table is drawn exactly as codex53 draws it.

   WHAT THIS LAYER OWNS:

   1. THE WORDS AND THE STYLE: V57_WORDS, v57W, and the v57-style element.

   2. THE JOIN: codex53's joined book of grapes, decorated once per object.
      The grapes the table adds take the join's own record shape; a grape the
      Codex held without a profile takes the table's; the table's label names
      become keys, first writer wins, so a name that resolved before resolves
      as it did; a new grape's regions are its record's and the regions'
      join's. The decks grapes and grapes-all, the blind flight and the
      Régionale table read the raw lists and are untouched.

   3. THE PAGE: At the table first (the forty-five second line, a rule, the
      sale, the ten and the twenty second lines, Say it), the glass leading
      the fruit section in named fruit (the lead, the notes by family, the
      climate ladder, the line of structure), Old World and New World side by
      side (or At home and abroad) before the regions, then Service and the
      table, What guests ask, On the label and Compare with before the
      Court's grid, and Sources closed at the foot. Each new section has its
      chip, the chips one line that scrolls sideways; the glass and the two
      worlds stand open; the sections a reader opened on a grape's page are
      kept for the sitting, so Back returns to the page as it was left. The
      one word flag Where it is grown and the row of bare family words leave
      where the table says more.

   4. THE ROOT ROWS: each grape's row shows its glass in a line.

   5. ON THE HOUSE'S LIST: the house's wines of the grape under Old World and
      New World (the producer and the wine alone, read live from the house),
      each opening its wine card and Back returning to the grape; nothing is
      drawn when no house is loaded. The layer's controls carry data-v57;
      V57_ACTS says what each does and one listener hears them all.

   6. STUDY: the table's cards on codex32's one card screen (the decks
      grapecards, grapecards:{slug} and grapesdue, the card kind gtable), each
      grade a due date in the Codex's own steps, kept per device in
      oot-codex-grapesrs-v1 ({ c: cards by id, p: grapes presented by slug,
      w: the call drill's rounds }); the stock grape cards keep their own
      slot and their own decks. The table's questions join each grape's drill,
      without the bank questions a grape's notIn phrases shut out; a gt- key
      is never level progress, never in codex3's rotation and never an
      orphan. A grape's cards section gains Cards at the table.

   7. THE ROOT: At the table, a section ahead of Tasting with its chip among
      the jumps: the doors (the cards with their due count, the three views)
      and a filter of the rows (all, white, red, on our list) that hides rows
      on the page on screen without a redraw, is kept for the sitting and is
      applied as the root is drawn; a line under the jumps says what shows.

   8. THE THREE VIEWS, each owned by Grapes, climbing to the root, answering
      its address warm and cold: grapeworlds (the side by side grapes as an
      index; at grapeworlds/call a drill of ten glasses, each the tell of one
      world read from the grape's blind call, answered Old World or New
      World, scored, the round kept), grapecompare/{a}~{b} (two grapes
      chosen; the glass, the notes, the structure, the tell and service side
      by side, and what the table says between the two) and
      grapepresent/{slug} (the name shown, the learner speaks, the forty-five
      second line and the sale are shown, the learner marks it said or not
      yet; the mark is a due date by the grape's slug). A screen keeps
      codex32's one Back: the layer draws no Back of its own.

   9. THE SHELL: index.html loads js/data-grapes-table.js then js/codex57.js
      after codex56.js and before boot.js; the worker is codex-v116 and lists
      both.
*/

/* =========== 1. the words =========== */

var V57_WORDS = {
  /* at the table */
  atTable: 'At the table',
  fortyFive: 'In forty-five seconds',
  sale: 'The sale',
  ten: 'In ten seconds',
  twenty: 'In twenty seconds',
  say: 'Say it',
  /* the glass */
  ladderH: 'From cool to warm',
  climate_cool: 'Cool',
  climate_moderate: 'Moderate',
  climate_warm: 'Warm',
  structureH: 'Structure',
  cardH: 'As the grape card reads it',
  /* the two worlds */
  worldsH: 'Old World and New World',
  homeH: 'At home and abroad',
  oldWorld: 'Old World',
  newWorld: 'New World',
  where: 'Where',
  inGlass: 'In the glass',
  inCellar: 'In the cellar',
  why: 'Why they differ',
  blur: 'Where the line blurs',
  call: 'The blind call',
  atHome: 'At home',
  abroad: 'Abroad',
  /* service, the guest, the label, the neighbours, the sources */
  serviceH: 'Service and the table',
  temp: 'Temperature',
  glassware: 'Glass',
  decant: 'Decanting',
  age: 'Age',
  foodH: 'At the table, with food',
  guestH: 'What guests ask',
  labelH: 'On the label',
  compareH: 'Compare with',
  sourcesH: 'Sources',
  opensNew: ' (opens in a new tab)',
  /* the house's list */
  listH: 'On our list',
  listOne: 'One wine on our list is made with this grape. It opens its card.',
  listMany: '{n} wines on our list are made with this grape. Each opens its card.',
  worldCount: '{world} · {n}',
  elsewhere: 'Elsewhere',
  toList: 'On our list · {n}',
  /* study: the table's cards and questions */
  cardsDeck: 'Cards at the table',
  grapeDeck: 'Cards at the table: {name}',
  dueDeck: 'Table cards due today',
  front: 'Front',
  answer: 'Answer',
  cardSide: '{side} · {name}',
  cardDoor: 'The page for {name}',
  oneCard: '1 card',
  nCards: '{n} cards',
  gcNone: '{cards} on {name}, none studied yet.',
  gcDue: '{cards} on {name}, {d} due today.',
  gcLearnt: '{cards} on {name}, {m} learnt and none due today.',
  gcStudy: 'Study these cards',
  stateNew: 'New',
  stateDue: 'Due today',
  stateTomorrow: 'Due tomorrow',
  stateDays: 'Due in {n} days',
  drillTable: 'The {n} written for the table are among them.',
  qCat: 'Grape: {name}',
  qLevel: 'Grapes',
  noCards: 'No table cards are on this device yet.',
  allGrapes: 'All grapes',
  /* the root: At the table */
  rootLine: 'The grapes as they are spoken of at the table: their cards, the two worlds, two grapes side by side and a grape said aloud.',
  cardsRowDue: '{d} due today · {cards} · {m} learnt',
  cardsRowLine: '{cards}, three a grape · {m} learnt',
  worldsRowLine: '{n} grapes side by side, and a call drill of Old World or New World',
  worldsRowLast: '{n} grapes side by side · last round {r} of {of}',
  compareRow: 'Compare two grapes',
  compareRowLine: 'The glass, the structure, the tell and service, side by side',
  presentRow: 'Present it',
  presentRowLine: 'A grape is named, you say it aloud, then its forty-five second line is shown',
  presentRowDue: '{d} to present again today · {m} of {n} said',
  presentRowSaid: '{m} of {n} said · none due today',
  filterH: 'Show on this page',
  filter_all: 'All grapes ({n})',
  filter_white: 'White ({n})',
  filter_red: 'Red ({n})',
  filter_list: 'On our list ({n})',
  showing_white: 'Showing the white grapes, {n} of {all}.',
  showing_red: 'Showing the red grapes, {n} of {all}.',
  showing_list: 'Showing the grapes on our list, {n} of {all}.',
  showAll: 'Show all grapes',
  /* the view Old World and New World, and its call drill */
  worldsSub: 'The same grape from the two worlds, side by side',
  worldsLead: '{n} grapes are poured from both worlds in styles a guest meets on a list. Each row gives the blind call and opens the grape at its two sides.',
  callH: 'Call the glass',
  callLine: 'A glass is described by what tips the call. Say Old World or New World, then read the tell.',
  callLast: 'Last round: {r} of {of} called right.',
  callStart: 'Call {n} glasses',
  callAsk: 'Old World or New World?',
  callPos: 'Glass {i} of {n}',
  callGlass: 'A glass of {name}',
  callRight: 'Right: {world}.',
  callWrong: 'Not this time: {world}.',
  callNext: 'Next glass',
  callEnd: 'See the score',
  scoreH: 'The round',
  scoreLine: '{r} of {n} called right.',
  scoreAll: 'All {n} called right.',
  calledRight: '{world}, called right',
  calledWrong: '{world}, missed',
  callAgain: 'Call another {n}',
  callSides: '{name} at its two sides',
  callNone: 'No glass can be called yet: the two worlds are written for no grape on this device.',
  whitesH: 'Whites',
  redsH: 'Reds',
  homeNote: 'The other {n} grapes stay at home: each page says where, and abroad where the grape travels.',
  /* the view Compare two grapes */
  cmpSub: 'Side by side: the glass, the structure, the tell and service',
  cmpA: 'The first grape',
  cmpB: 'The second grape',
  cmpGo: 'Compare them',
  cmpPair: '{a} · {b}',
  cmpSame: 'Choose two different grapes.',
  cmpChoose: 'Choose two grapes the table describes.',
  cmpBetween: 'Between the two',
  cmpNotes: 'The notes',
  cmpTell: 'The tell',
  cmpService: 'Service',
  cmpNone: 'Not written yet',
  cmpOpen: 'The page for {name}',
  sideBySide: 'Side by side',
  /* the view Present it */
  presentSub: 'Say it aloud, then check yourself against the line',
  kind_white: 'A white grape',
  kind_red: 'A red grape',
  family_white: 'A family of white grapes',
  family_red: 'A family of red grapes',
  presentSay: 'Say it: {say}',
  presentAsk: 'Say it aloud, as you would at the table: what it is, where it is at home, how it tastes, how it is made and what it suits. Take about forty-five seconds, then make the sale in two sentences.',
  presentCount: '{m} of {n} said · {d} due today',
  presentNew: '{n} grapes to say aloud',
  reveal: 'Show the line',
  skip: 'Another grape',
  markH: 'Mark yourself',
  markAsk: 'Did you say what the line says, in your own words?',
  said: 'Said it',
  notYet: 'Not yet',
  markedSaid: 'Marked said. It comes back tomorrow.',
  markedSaidN: 'Marked said. It comes back in {n} days.',
  markedNot: 'Marked not yet. It stays due today.',
  presentNext: 'Next: {name}',
  presentNone: 'No grape has a line to say on this device yet.',
  gpresent: 'Say {name} aloud',
  gpNew: 'Not said aloud yet: the name is shown, you speak, then the line.',
  gpDue: 'Due to be said again today.',
  gpLater: 'Said. It comes back tomorrow.',
  gpLaterN: 'Said. It comes back in {n} days.'
};

function v57W(key, vars) {
  var v = vars || {};
  return String(Object.prototype.hasOwnProperty.call(V57_WORDS, key) ? V57_WORDS[key] : key).replace(/\{(\w+)\}/g, function (m, k) {
    return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m;
  });
}
function v57Esc(s) {
  if (typeof v32Esc === 'function') return v32Esc(s == null ? '' : String(s));
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function v57Str(s) { return typeof s === 'string' ? s.trim() : (typeof s === 'number' ? String(s) : ''); }
function v57List(x) { return Array.isArray(x) ? x : []; }
function v57Obj(x) { return (x && typeof x === 'object' && !Array.isArray(x)) ? x : {}; }
function v57Own(o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); }
function v57Fold(s) {
  if (typeof v53cFold === 'function') return v53cFold(s);
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD'); } catch (e) { }
  return t.replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/* The table: one record a grape, keyed by the join's slug; {} when the data is not on the device. */
function v57Table() {
  try { return (typeof GRAPE_TABLE !== 'undefined' && GRAPE_TABLE && typeof GRAPE_TABLE === 'object' && !Array.isArray(GRAPE_TABLE)) ? GRAPE_TABLE : {}; } catch (e) { return {}; }
}
/* A grape's record in the table, or null: a grape with none is drawn as codex53 draws it. */
function v57T(slug) {
  var t = v57Table();
  var s = v57Str(slug);
  var r = (s && v57Own(t, s)) ? t[s] : null;
  return (r && typeof r === 'object' && !Array.isArray(r)) ? r : null;
}

/* =========== the style =========== */

(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v57-style';
  css.textContent = [
    '.wrap .v57 [hidden]{display:none!important}',
    /* At the table, on the page's own ground: codex54's look restated (its rules reach a wine card alone). The
       forty-five large in the house reading face, the sale under a gold rule, the ten and the twenty quiet */
    '.wrap .v57-table{margin:6px 0 4px}',
    '.wrap .v57-table>.secgroup{font-family:var(--house-display,\'Cinzel\',Georgia,serif);border-bottom:1px solid var(--line);margin-top:14px}',
    '.wrap .v57-eyebrow{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:14px;letter-spacing:.07em;font-weight:500;color:var(--gold-soft);margin:14px 0 6px}',
    '.wrap .v57-fortyfive{font-family:var(--house-reading,Georgia,serif);font-size:20px;line-height:1.5;font-weight:600;color:var(--parch);margin:4px 0 0;padding-left:12px;border-left:2px solid var(--line)}',
    '.wrap .v57-rule{height:0;border:0;border-top:1px solid var(--gold);margin:16px 0 0}',
    '.wrap .v57-eyebrow.v57-sale-h{margin-top:10px;color:var(--gold)}',
    '.wrap .v57-sale{font-size:18px;line-height:1.5;color:var(--parch);margin:2px 0 4px}',
    '.wrap .v57-ten,.wrap .v57-twenty{font-size:16px;line-height:1.5;font-weight:400;color:var(--parch2);margin:2px 0 0}',
    '.wrap .v57-twenty{padding-left:12px;border-left:2px solid var(--line)}',
    '.wrap .v57-sayit{font-size:17px;line-height:1.5;color:var(--parch);margin:2px 0 0}',
    /* the sections' chips: fourteen on a phone, so one line that scrolls sideways, each chip whole */
    '.wrap .v57-page .v53-steps{flex-wrap:nowrap;overflow-x:auto;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch;scrollbar-width:thin;margin:18px 0 20px;padding:10px 0}',
    '.wrap .v57-page .v53-steps .v28-chip{flex:0 0 auto;white-space:nowrap}',
    /* the glass, in the parchment section: the lead in the reading face, each family a quiet label beside its notes */
    '.wrap .v39-body .v57-glead{font-family:var(--house-reading,Georgia,serif);font-size:19px;line-height:1.5;font-weight:600;color:var(--ink);margin:6px 0 12px}',
    '.wrap .v57-notes{display:grid;grid-template-columns:minmax(0,7.4em) minmax(0,1fr);gap:6px 12px;margin:0 0 6px}',
    '.wrap .v57-notes dt{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.05em;line-height:1.5;color:var(--ink-soft);padding-top:4px;overflow-wrap:anywhere}',
    '.wrap .v57-notes dd{margin:0;overflow-wrap:anywhere}',
    '.wrap .v57-ladder{list-style:none;margin:0 0 6px;padding:0}',
    '.wrap .v57-ladder li{margin:0 0 10px;padding:2px 0 2px 12px;border-left:3px solid var(--line)}',
    '.wrap .v57-ladder li.v57-cool{border-left-color:var(--green)}',
    '.wrap .v57-ladder li.v57-moderate{border-left-color:var(--gold)}',
    '.wrap .v57-ladder li.v57-warm{border-left-color:var(--claret)}',
    '.wrap .v57-climate{display:block;font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:14px;letter-spacing:.05em;color:var(--claret)}',
    '.wrap .v39-body .v57-where{display:block;font-size:15px;line-height:1.45;color:var(--ink-soft)}',
    '.wrap .v57-rnotes{display:block}',
    '.wrap .v39-body .v57-structure{margin:0 0 4px}',
    /* the two worlds: two cards of the same three rows, one under the other on a phone, side by side from 600px */
    '.wrap .v57-sides{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;margin:6px 0 14px}',
    '@media(min-width:600px){.wrap .v57-sides{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '.wrap .v57-side{min-width:0;padding:12px 14px 14px;border:1px solid var(--field-line,var(--line));border-top:3px solid var(--claret);border-radius:3px}',
    '.wrap .v57-side.v57-new{border-top-color:var(--green)}',
    '.wrap .v57-side .v57-side-h{margin:0 0 8px}',
    '.wrap .v57-side p{margin:0}',
    '.wrap .v57-side .v57-sidedoor,.wrap .v39-body .v57-sidedoor{margin:12px 0 0}',
    '.wrap .v57-sidedoor .btn{font-size:16px}',
    '.wrap .v57-page h4[tabindex="-1"]:focus{outline:none}',
    '.wrap .v57-page h4[tabindex="-1"]:focus-visible{outline:2px solid var(--claret);outline-offset:3px}',
    '.wrap .v57-rows{margin:0}',
    '.wrap .v57-rows dt{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.05em;line-height:1.5;color:var(--ink-soft);margin:10px 0 1px}',
    '.wrap .v57-rows dt:first-child{margin-top:0}',
    '.wrap .v57-rows dd{margin:0}',
    '.wrap .v57-rows.v57-after dt{font-size:14px;color:var(--claret);margin-top:14px}',
    /* what guests ask and the words on a label: the question or the word as it is written, its answer under it */
    '.wrap .v57-qa{margin:0 0 6px}',
    '.wrap .v57-qa dt{font-family:var(--house-reading,Georgia,serif);font-size:17px;line-height:1.45;font-weight:700;color:var(--ink);margin:14px 0 2px}',
    '.wrap .v57-qa dt:first-child{margin-top:4px}',
    '.wrap .v57-qa dd{margin:0}',
    '.wrap .v57-food{margin-top:0}',
    /* a neighbour: the door to its page, the tell under it */
    '.wrap .v57-compare{list-style:none;margin:6px 0 4px;padding:0}',
    '.wrap .v57-compare li{margin:0 0 16px}',
    '.wrap .v57-compare .btn{font-size:16px}',
    '.wrap .v39-body .v57-tell{margin:6px 0 0}',
    /* the house\'s wines of the grape: a row a wine, the producer over the wine, each a 44px door to its card */
    '.wrap .v39-body .v57-listline{margin:4px 0 0}',
    '.wrap .v57-wines{list-style:none;margin:0 0 6px;padding:0}',
    '.wrap .v57-wines li{margin:0;border-bottom:1px solid var(--field-line,var(--line))}',
    '.wrap .v57-wines li:last-child{border-bottom:0}',
    '.wrap .v57-wine{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:1px;width:100%;min-height:48px;box-sizing:border-box;padding:8px 0;margin:0;background:none;border:0;border-radius:0;text-align:left;cursor:pointer;font-family:inherit;color:var(--ink)}',
    '.wrap .v57-wine-p{font-size:17px;line-height:1.35;font-weight:700;color:var(--claret);overflow-wrap:anywhere}',
    '.wrap .v57-wine-w{font-size:16px;line-height:1.4;color:var(--ink);overflow-wrap:anywhere}',
    '.wrap .v57-wine:focus-visible{outline:2px solid var(--claret);outline-offset:2px}',
    /* study: a table card asks a question where the stock cards show a name, so its face is set in the reading
       face a size down; the answer under it, then the door to the grape */
    '.wrap .v57-card .v57-cq{font-family:var(--house-reading,Georgia,serif);font-size:21px;line-height:1.4;font-weight:700;letter-spacing:0;text-transform:none;overflow-wrap:anywhere}',
    '.wrap .v57-card .v57-ca{font-size:18px;line-height:1.55;margin:10px 0 0}',
    '.wrap .v57-cdoor{margin:18px 0 0}',
    '.wrap .v57-cdoor .btn{min-height:44px;font-size:16px;white-space:normal;text-align:left}',
    /* a grape\'s own three cards in its cards section: the question, and when it is due beside it */
    '.wrap .v39-body .v57-cardsline{margin:2px 0 6px}',
    '.wrap .v57-cardlist{list-style:none;margin:0 0 10px;padding:0}',
    '.wrap .v57-cardlist li{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:2px 14px;margin:0;padding:9px 0;border-bottom:1px solid var(--field-line,var(--line))}',
    '.wrap .v57-cardlist li:last-child{border-bottom:0}',
    '.wrap .v57-cardq{flex:1 1 13em;min-width:0;overflow-wrap:anywhere}',
    '.wrap .v57-cardstate{flex:0 0 auto;font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.05em;color:var(--claret)}',
    '.wrap .v57-carddoors{margin-top:4px}',
    /* the root: a row the filter leaves out is gone from the page; the line that says what shows, with the way back */
    '.wrap .v53-grapes [hidden]{display:none!important}',
    '.wrap .v57-gtable #v57-filter-h{margin-top:22px}',
    '.wrap .v57-gtable .v57-filter{margin:10px 0 4px}',
    '.wrap .v57-filterline{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin:12px 0 0;padding:10px 12px;border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:3px}',
    '.wrap .v57-filterline .v32-line{flex:1 1 12em;margin:0}',
    '.wrap .v57-filterline .btn{flex:0 0 auto}',
    '.wrap .v57-filterline:focus{outline:none}',
    '.wrap .v57-filterline:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}',
    '.wrap .v57-compare .btn{margin:0 8px 6px 0}',
    /* the three views, on the page\'s own ground: a heading moved to takes no ring unless a keyboard put it there */
    '.wrap .v57-view [tabindex="-1"]:focus{outline:none}',
    '.wrap .v57-view [tabindex="-1"]:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}',
    '.wrap .v57-view .v32-sec{margin-top:24px}',
    '.wrap .v57-view .v28-btnrow .btn{margin:0}',
    /* the call drill: the glass on a card, the two calls side by side and tall, the tell under the answer */
    '.wrap .v57-glasscard{margin:16px 0 0;padding:20px 18px}',
    '.wrap .v57-glasscard .v57-geyebrow{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:14px;letter-spacing:.06em;color:var(--ink-soft);margin:0 0 8px}',
    '.wrap .v57-glasscard .v57-gtext{font-family:var(--house-reading,Georgia,serif);font-size:22px;line-height:1.45;font-weight:600;color:var(--ink);margin:0;overflow-wrap:anywhere}',
    '.wrap .v57-callrow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:16px 0 0}',
    '.wrap .v57-callrow .btn{min-height:56px;margin:0;text-align:center;justify-content:center;white-space:normal}',
    '.wrap .v57-verdict{margin:18px 0 0;padding:12px 14px 14px;border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:3px}',
    '.wrap .v57-verdict.v57-missed{border-left-color:var(--red)}',
    '.wrap .v57-verdict .v57-verdict-h{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:19px;line-height:1.35;letter-spacing:.03em;font-weight:500;color:var(--gold-hi);margin:0 0 6px;border:0;padding:0}',
    '.wrap .v57-vrows{margin:0}',
    '.wrap .v57-vrows dt{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.05em;line-height:1.5;color:var(--gold-soft);margin:12px 0 2px}',
    '.wrap .v57-vrows dd{margin:0;font-size:17px;line-height:1.5;color:var(--parch);overflow-wrap:anywhere}',
    '.wrap .v57-view .v57-after{margin:16px 0 0}',
    '.wrap .v57-score{list-style:none;margin:10px 0 0;padding:0}',
    '.wrap .v57-score li{margin:0;padding:10px 0;border-bottom:1px solid var(--line)}',
    '.wrap .v57-score .v57-sname{display:block;font-size:17px;line-height:1.4;color:var(--parch)}',
    '.wrap .v57-score .v57-sline{display:block;font-size:15px;line-height:1.45;color:var(--gold-soft)}',
    '.wrap .v57-score .v57-stell{display:block;font-size:16px;line-height:1.5;color:var(--parch);margin:4px 0 8px}',
    /* compare two grapes: the chooser, then each matter as two columns that keep their width on a phone */
    '.wrap .v57-cmpform{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;margin:14px 0 0;max-width:560px}',
    '.wrap .v57-cmpform label{display:block;font-size:16px;color:var(--parch);margin:0 0 4px}',
    '.wrap .v57-cmpform select{display:block;width:100%;min-height:44px;font-size:17px;box-sizing:border-box}',
    '.wrap .v57-cmp h3{margin-top:20px}',
    '.wrap .v57-cmprow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 14px;margin:6px 0 0}',
    '.wrap .v57-cmprow>div{min-width:0;font-size:16px;line-height:1.5;color:var(--parch);overflow-wrap:anywhere}',
    '.wrap .v57-cmprow .v57-cname{display:block;font-weight:700;font-size:15px;color:var(--gold-hi);margin:0 0 2px}',
    '.wrap .v57-cmprow p{margin:0}',
    '.wrap .v57-cmprow ul{list-style:none;margin:0;padding:0}',
    '.wrap .v57-cmprow li{margin:0 0 6px}',
    '.wrap .v57-cmprow .v57-clabel{display:block;font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:12px;letter-spacing:.05em;color:var(--gold-soft)}',
    '.wrap .v57-between{margin:8px 0 0;padding:0 0 0 12px;border-left:2px solid var(--gold);font-size:17px;line-height:1.5;color:var(--parch)}',
    '.wrap .v57-between p{margin:0 0 6px}',
    /* present it: the name on a card, then the line as the grape\'s page sets it */
    '.wrap .v57-pcard{margin:16px 0 0;padding:20px 18px}',
    '.wrap .v57-pcard .v57-pkind{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:14px;letter-spacing:.06em;color:var(--ink-soft);margin:0 0 6px}',
    '.wrap .v57-pcard .v57-pname{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:28px;line-height:1.25;font-weight:600;letter-spacing:.02em;color:var(--claret);margin:0;border:0;padding:0;overflow-wrap:anywhere}',
    '.wrap .v57-pcard .v57-psay{font-size:17px;line-height:1.5;color:var(--ink-soft);margin:6px 0 0}',
    '.wrap .v57-pcard .v57-pask{font-size:17px;line-height:1.55;color:var(--ink);margin:14px 0 0}',
    '.wrap .v57-present .v57-ptable{margin-top:18px}',
    '.wrap .v57-present .v57-ptable .v57-fortyfive{font-size:18px}',
    '.wrap .v57-present .v57-ptable .v57-sale{font-size:17px}',
    '.wrap .v57-view .v57-marked{margin:16px 0 0;padding:6px 0 6px 12px;border-left:3px solid var(--gold);font-size:17px;line-height:1.5}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();

/* =========== 2. the join =========== */

/* The profile the join keeps for a grape, from the table's: the eight fields
   the stock grape card and page read. The name is the join's own, set here
   and never authored, so the card keeps the name its grade is stored under;
   the colour letter is the join's colour. null unless every field is written. */
var V57_PROFILE_FIELDS = ['st', 'fruit', 'other', 'tell', 'regions', 'confuse'];
function v57Profile(t, name, colour) {
  var p = v57Obj(t && t.profile);
  if (!v57Str(name) || !V57_PROFILE_FIELDS.every(function (k) { return !!v57Str(p[k]); })) return null;
  var g = { g: name, c: colour === 'white' ? 'w' : 'r' };
  V57_PROFILE_FIELDS.forEach(function (k) { g[k] = v57Str(p[k]); });
  return g;
}
/* The slugs the regions data holds: its articles and its countries. */
function v57Places() {
  var have = {};
  var R = null;
  try { R = (typeof REGIONS !== 'undefined' && REGIONS && typeof REGIONS === 'object') ? REGIONS : null; } catch (e) { R = null; }
  if (!R) return have;
  v57List(R.regions).forEach(function (a) { var s = v57Str(a && a.slug); if (s) have[s] = 1; });
  Object.keys(v57Obj(R.countries)).forEach(function (k) { have[k] = 1; });
  return have;
}
function v57TableAliases() {
  try { return (typeof GRAPE_TABLE_ALIASES !== 'undefined' && GRAPE_TABLE_ALIASES && typeof GRAPE_TABLE_ALIASES === 'object' && !Array.isArray(GRAPE_TABLE_ALIASES)) ? GRAPE_TABLE_ALIASES : {}; } catch (e) { return {}; }
}
/* The joined book of grapes, decorated once: the grapes the table adds in the
   join's own record shape, a profile for a grape the Codex held without one,
   the table's label names as keys (first writer wins, so a key the join held
   is never taken and a name that resolved before resolves as it did), and
   the regions of a grape the table adds: its record's own, each one the
   regions data holds, then the regions' own join read again, so a name that
   now resolves brings its places. The record shape is codex53's, field for
   field; nothing else is hung on a record. */
function v57JoinAdd(J) {
  var T = v57Table();
  var slugs = Object.keys(T).filter(function (s) { var t = v57T(s); return !!t && v57Str(t.slug) === s; });
  if (!slugs.length || !J || !Array.isArray(J.list) || !J.bySlug || !J.byKey) return;
  var key = function (k, slug) {
    if (!k || !v57Own(J.bySlug, slug)) return;
    if (!v57Own(J.byKey, k)) J.byKey[k] = slug;
    if (J.byKey[k] === slug && J.bySlug[slug].keys.indexOf(k) < 0) J.bySlug[slug].keys.push(k);
  };
  var parts = function (n) {
    if (typeof v53GrapeParts === 'function') return v53GrapeParts(n);
    return String(n == null ? '' : n).replace(/\([^)]*\)/g, ' ').split('/').map(v57Fold).filter(Boolean);
  };
  var names = function (n, slug) {
    var p = parts(n);
    key(p.join(' '), slug);
    p.forEach(function (x) { key(x, slug); });
  };
  var added = [];
  slugs.forEach(function (slug) {
    var t = v57T(slug);
    var r = v57Own(J.bySlug, slug) ? J.bySlug[slug] : null;
    if (r) {
      if (!r.g) { var p = v57Profile(t, r.name, r.colour); if (p) r.g = p; }
      return;
    }
    var name = v57Str(t.name);
    var colour = v57Str(t.colour) === 'white' ? 'white' : 'red';
    var g = v57Profile(t, name, colour);
    if (!g) return;
    r = { slug: slug, name: name, colour: colour, g: g, intro: null, taste: null, court: '', tasting: null, keys: [], targets: [] };
    J.bySlug[slug] = r;
    J.list.push(r);
    added.push(slug);
    names(name, slug);
  });
  slugs.forEach(function (slug) {
    if (!v57Own(J.bySlug, slug)) return;
    v57List(v57T(slug).aliases).forEach(function (a) { key(v57Fold(a), slug); });
  });
  var al = v57TableAliases();
  Object.keys(al).forEach(function (k) { if (typeof al[k] === 'string') key(v57Fold(k), al[k]); });
  var have = v57Places();
  added.forEach(function (slug) {
    var r = J.bySlug[slug];
    v57List(v57T(slug).targets).forEach(function (x) { var s = v57Str(x); if (s && v57Own(have, s) && r.targets.indexOf(s) < 0) r.targets.push(s); });
  });
  if (typeof v53GrapeResolve !== 'function') return;
  var jg = {};
  try { jg = v57Obj(v57Obj(v57Obj(typeof REGIONS !== 'undefined' ? REGIONS : null).join).grapes); } catch (e) { jg = {}; }
  Object.keys(jg).forEach(function (n) {
    var s = v53GrapeResolve(J, n);
    if (!s || !v57Own(J.bySlug, s)) return;
    var r = J.bySlug[s];
    var v = jg[n];
    (Array.isArray(v) ? v : [v]).forEach(function (x) { if (typeof x === 'string' && x && r.targets.indexOf(x) < 0) r.targets.push(x); });
  });
}
if (typeof v53GrapeJoin === 'function') {
  var _v57GrapeJoin = v53GrapeJoin;
  v53GrapeJoin = function () {
    var J = _v57GrapeJoin.apply(this, arguments);
    try { if (J && J.list && !J.v57) { J.v57 = 1; v57JoinAdd(J); } } catch (e) { }
    return J;
  };
}

/* =========== 3. the page =========== */

function v57Cap(s) { var t = v57Str(s); return t ? t.charAt(0).toUpperCase() + t.slice(1) : ''; }
function v57P(cls, s) { var t = v57Str(s); return t ? '<p' + (cls ? ' class="' + cls + '"' : '') + '>' + v57Esc(t) + '</p>' : ''; }
function v57H4(key, cls) { return '<h4' + (cls ? ' class="' + cls + '"' : '') + '>' + v57Esc(v57W(key)) + '</h4>'; }
function v57Eyebrow(key, cls) { return '<p class="v57-eyebrow' + (cls ? ' ' + cls : '') + '">' + v57Esc(v57W(key)) + '</p>'; }
/* Labelled rows, a label over its text: [[label, text], ...]; a row with no text is left out. */
function v57Rows(rows, cls) {
  var list = v57List(rows).filter(function (p) { return p && v57Str(p[0]) && v57Str(p[1]); });
  return list.length ? '<dl class="' + (cls || 'v57-rows') + '">' + list.map(function (p) { return '<dt>' + v57Esc(v57Str(p[0])) + '</dt><dd>' + v57Esc(v57Str(p[1])) + '</dd>'; }).join('') + '</dl>' : '';
}
/* A section of the page and its chip, in codex53's own markup. */
function v57Details(id, title, body, open) {
  if (!body) return '';
  if (typeof v53Details === 'function') return v53Details(id, title, body, !!open);
  return '<details class="v28-q v39-sec" id="' + v57Esc(id) + '" data-chip="' + v57Esc(id) + '"' + (open ? ' open' : '') + '><summary>' + v57Esc(title) + '</summary><div class="v39-body">' + body + '</div></details>';
}
function v57Chip(id, title) {
  return '<button type="button" class="v28-chip" data-v39="chip" data-sec="' + v57Esc(id) + '">' + v57Esc(title) + '</button>';
}
var V57_SEC_HEAD = '<details class="v28-q v39-sec" id="';
var V57_CHIP_HEAD = '<button type="button" class="v28-chip" data-v39="chip" data-sec="';
var V57_NAV_HEAD = '<nav class="v39-steps v53-steps" aria-label="Sections">';
/* Where a section stands in the page: from its opening tag to the end of its closing one, or null. No section
   of the page holds another. */
function v57SecAt(s, id) {
  var a = s.indexOf(V57_SEC_HEAD + id + '"');
  var b = a >= 0 ? s.indexOf('</details>', a) : -1;
  return b >= 0 ? { a: a, b: b + 10 } : null;
}

/* 3.1 At the table: the forty-five second line, a rule, the sale, the ten and the twenty second lines, Say it.
   The respelling is the table's, or the Court's own where the table writes none. '' when the table holds no line. */
function v57TableHtml(t, say0) {
  var l = v57Obj(t && t.lines);
  var s45 = v57Str(l.s45), s10 = v57Str(l.s10), s20 = v57Str(l.s20), sale = v57Str(l.sale);
  if (!s45 && !s10 && !s20 && !sale) return '';
  var say = v57Str(t && t.say) || v57Str(say0);
  var saleHtml = sale ? '<hr class="v57-rule">' + v57Eyebrow('sale', 'v57-sale-h') + v57P('v57-sale', sale) : '';
  var body = '';
  if (s45) body += v57Eyebrow('fortyFive') + v57P('v57-fortyfive', s45) + saleHtml;
  if (s10) body += v57Eyebrow('ten') + v57P('v57-ten', s10);
  if (!s45) body += saleHtml;
  if (s20) body += v57Eyebrow('twenty') + v57P('v57-twenty', s20);
  if (say) body += v57Eyebrow('say') + v57P('v57-sayit', say);
  return '<section class="v57 v57-table" aria-labelledby="v57-table-h"><h3 class="secgroup v57-h" id="v57-table-h">' + v57Esc(v57W('atTable')) + '</h3>' + body + '</section>';
}

/* 3.2 the glass: the lead, the notes by family (each family a quiet label, its notes named), the climate ladder
   from cool to warm with where, the line of structure. */
function v57GlassHtml(t) {
  var g = v57Obj(t && t.glass);
  var html = v57P('v57-glead', g.lead);
  var notes = v57List(g.notes).map(function (n) {
    var fam = v57Cap(n && n.family);
    var list = v57List(n && n.notes).map(v57Str).filter(Boolean);
    return (fam && list.length) ? '<dt>' + v57Esc(fam) + '</dt><dd>' + v57Esc(list.join(', ')) + '</dd>' : '';
  }).join('');
  if (notes) html += '<dl class="v57-notes">' + notes + '</dl>';
  var rungs = v57List(g.ladder).map(function (x) {
    var c = v57Str(x && x.climate).toLowerCase();
    var where = v57Str(x && x.where);
    var list = v57List(x && x.notes).map(v57Str).filter(Boolean);
    if (!c || (!where && !list.length)) return '';
    var known = v57Own(V57_WORDS, 'climate_' + c);
    return '<li' + (known ? ' class="v57-' + c + '"' : '') + '><span class="v57-climate">' + v57Esc(known ? v57W('climate_' + c) : v57Cap(c)) + '</span>'
      + (where ? '<span class="v57-where">' + v57Esc(where) + '</span>' : '')
      + (list.length ? '<span class="v57-rnotes">' + v57Esc(list.join(', ')) + '</span>' : '') + '</li>';
  }).join('');
  if (rungs) html += v57H4('ladderH') + '<ol class="v57-ladder">' + rungs + '</ol>';
  var st = v57P('v57-structure', g.structure);
  if (st) html += v57H4('structureH') + st;
  return html ? '<div class="v57-glass">' + html + '</div>' : '';
}

/* 3.3 Old World and New World: the two sides as two cards of the same three rows (where, in the glass, in the
   cellar), then why they differ, where the line blurs and the blind call; or, for a grape that stays at home,
   At home and Abroad. Given the house's wines of the grape (v57HouseWines), each side the house pours carries a
   door to its part of On our list. */
function v57ListDoor(world, n) {
  return n ? '<p class="v57-sidedoor"><button type="button" class="btn small ghost" data-v57="list" data-world="' + v57Esc(world) + '">' + v57Esc(v57W('toList', { n: n })) + '</button></p>' : '';
}
function v57WorldsMode(t) {
  var w = v57Obj(t && t.worlds);
  var c = v57Obj(w.contrast), h = v57Obj(w.home);
  if (v57Str(v57Obj(c.old).glass) && v57Str(v57Obj(c['new']).glass)) return 'contrast';
  return (v57Str(h.home) || v57Str(h.abroad)) ? 'home' : '';
}
function v57WorldsBody(t, hw) {
  var mode = v57WorldsMode(t);
  var w = v57Obj(t && t.worlds);
  var poured = v57Obj(hw);
  if (mode === 'contrast') {
    var c = v57Obj(w.contrast);
    var side = function (key, o, cls, world) {
      return '<div class="v57-side ' + cls + '">' + v57H4(key, 'v57-side-h') + v57Rows([[v57W('where'), o.where], [v57W('inGlass'), o.glass], [v57W('inCellar'), o.cellar]])
        + v57ListDoor(world, v57List(poured[world]).length) + '</div>';
    };
    return '<div class="v57-sides">' + side('oldWorld', v57Obj(c.old), 'v57-old', 'old') + side('newWorld', v57Obj(c['new']), 'v57-new', 'new') + '</div>'
      + v57Rows([[v57W('why'), c.why], [v57W('blur'), c.blur], [v57W('call'), c.call]], 'v57-rows v57-after');
  }
  if (mode === 'home') {
    var h = v57Obj(w.home);
    var card = function (key, s, cls) { return v57Str(s) ? '<div class="v57-side ' + cls + '">' + v57H4(key, 'v57-side-h') + v57P('', s) + '</div>' : ''; };
    return '<div class="v57-sides">' + card('atHome', h.home, 'v57-old') + card('abroad', h.abroad, 'v57-new') + '</div>' + v57ListDoor('', Number(poured.n) || 0);
  }
  return '';
}

/* 3.4 Service and the table: temperature, the glass, decanting and age, then the dishes with the reason. */
function v57ServiceBody(t) {
  var s = v57Obj(t && t.service);
  var html = v57Rows([[v57W('temp'), s.temp], [v57W('glassware'), s.glass], [v57W('decant'), s.decant], [v57W('age'), s.age]], 'v39-pairs');
  var food = v57List(v57Obj(t && t.food)['with']).map(function (f) {
    var d = v57Str(f && f.dish), why = v57Str(f && f.why);
    return d ? '<li><b>' + v57Esc(d) + '</b>' + (why ? ': ' + v57Esc(why) : '') + '</li>' : '';
  }).join('');
  if (food) html += v57H4('foodH') + '<ul class="v39-lines v57-food">' + food + '</ul>';
  return html;
}
/* 3.5 What guests ask, and the words a guest meets on a label. */
function v57GuestBody(t) {
  return v57Rows(v57List(t && t.guest).map(function (x) { return [x && x.q, x && x.a]; }), 'v57-qa');
}
function v57LabelBody(t) {
  return v57Rows(v57List(t && t.labels).map(function (x) { return [x && x.term, x && x.means]; }), 'v57-qa v57-terms');
}
/* 3.6 Compare with: each neighbour a door to its page and a door to the two side by side, the tell under them.
   A neighbour the Codex holds no page for yet keeps its tell and has no door. */
function v57CompareBody(t) {
  var here = v57Str(t && t.slug);
  var rows = v57List(t && t.compare).map(function (c) {
    var slug = v57Str(c && c.slug), tell = v57Str(c && c.tell);
    if (!tell) return '';
    var r = null;
    try { r = (slug && typeof v53GrapeFind === 'function') ? v53GrapeFind(slug) : null; } catch (e) { r = null; }
    var door = (r && r.slug === slug)
      ? '<button type="button" class="btn small ghost" data-go="grape" data-arg="' + v57Esc(r.slug) + '">' + v57Esc(r.name) + '</button>' : '';
    /* the two side by side, once the view is there and the table describes both */
    if (door && here && here !== slug && v57T(slug) && v57Own(V57_VIEWS, 'grapecompare')) {
      door += '<button type="button" class="btn small ghost v57-sbs" data-go="grapecompare" data-arg="' + v57Esc(here + '~' + slug) + '">' + v57Esc(v57W('sideBySide')) + '</button>';
    }
    return '<li>' + door + v57P('v57-tell', tell) + '</li>';
  }).join('');
  return rows ? '<ul class="v57-compare">' + rows + '</ul>' : '';
}
/* 3.7 Sources: codex39's own list of links, each opening a new tab. */
function v57SourcesBody(t) {
  var rows = v57List(t && t.sources).map(function (s) {
    var title = v57Str(s && s.title), url = v57Str(s && s.url);
    if (!title) return '';
    return '<li>' + (/^https?:\/\//i.test(url) ? '<a href="' + v57Esc(url) + '" target="_blank" rel="noopener">' + v57Esc(title) + '<span class="sr-only">' + v57Esc(v57W('opensNew')) + '</span></a>' : v57Esc(title)) + '</li>';
  }).join('');
  return rows ? '<ul class="v39-lines v39-sources v57-sources">' + rows + '</ul>' : '';
}

/* 3.8 the sections a reader opened on a grape's page, kept for the sitting: a card or a neighbour opened from
   one and Back returns to the page as it was left. Per grape, in memory only. */
var V57_OPEN = {};
function v57OpenApply(s, slug) {
  var rec = v57Own(V57_OPEN, slug) ? V57_OPEN[slug] : null;
  if (!rec) return s;
  Object.keys(rec).forEach(function (id) {
    if (!/^v5[37]-gs-[a-z]+$/.test(id)) return;
    var head = V57_SEC_HEAD + id + '" data-chip="' + id + '"';
    var at = s.indexOf(head);
    if (at < 0) return;
    var end = at + head.length;
    var isOpen = s.slice(end, end + 6) === ' open>';
    if (rec[id] && !isOpen && s.charAt(end) === '>') s = s.slice(0, end) + ' open' + s.slice(end);
    else if (!rec[id] && isOpen) s = s.slice(0, end) + s.slice(end + 5);
  });
  return s;
}
(function () {
  if (typeof document === 'undefined' || !document || typeof document.addEventListener !== 'function') return;
  document.addEventListener('toggle', function (e) {
    try {
      var d = e && e.target;
      if (!d || typeof d.closest !== 'function' || !/^v5[37]-gs-[a-z]+$/.test(String(d.id || ''))) return;
      var page = d.closest('.v57-page[data-grape]');
      var slug = page ? v57Str(page.getAttribute('data-grape')) : '';
      if (!slug || !v57T(slug)) return;
      if (!v57Own(V57_OPEN, slug)) V57_OPEN[slug] = {};
      V57_OPEN[slug][d.id] = d.open ? 1 : 0;
    } catch (err) { }
  }, true);
})();

/* 3.9 the page shaped. A grape with no record in the table is returned as codex53 drew it. The six sections of
   codex53, Previous, Next and All grapes stay; nothing of the Court's grid is touched. */
function v57PageShape(html, r) {
  var s = String(html || '');
  var t = v57T(r && r.slug);
  if (!t) return s;
  var root = '<div class="v25page v53 v53-grape"';
  if (s.indexOf(root) === 0) s = '<div class="v25page v53 v53-grape v57-page"' + s.slice(root.length);
  /* a family of vines under one name (Trebbiano, Lambrusco) is headed as the family it is */
  if (v57Str(t.kind) === 'family') {
    var hue = r.colour === 'white' ? 'white' : 'red';
    var kindSub = '<div class="sub">' + v57Esc(v57W('kind_' + hue));
    if (s.indexOf(kindSub) >= 0) s = s.replace(kindSub, '<div class="sub">' + v57Esc(v57W('family_' + hue)));
  }
  /* At the table, in place of the lone Say it line; where the page drew none, ahead of whatever follows the title */
  var say0 = '';
  try { say0 = (typeof v53GridSay === 'function') ? v57Str(v57Obj(v53GridSay())[r.slug]) : ''; } catch (e) { say0 = ''; }
  var block = v57TableHtml(t, say0);
  if (block) {
    var m = /<p class="v39-lead v53-say">[\s\S]*?<\/p>/.exec(s);
    if (m) s = s.slice(0, m.index) + block + s.slice(m.index + m[0].length);
    else {
      var nav = s.indexOf(V57_NAV_HEAD);
      var line = s.indexOf('<p class="v32-line">');
      var at = (line >= 0 && (nav < 0 || line < nav)) ? line : nav;
      if (at >= 0) s = s.slice(0, at) + block + s.slice(at);
    }
  }
  /* the glass leads the fruit section, shown open; the row of bare family words gives way to it */
  var glass = v57GlassHtml(t);
  var f = glass ? v57SecAt(s, 'v53-gs-fruit') : null;
  if (f) {
    var sec = s.slice(f.a, f.b);
    var mark = '</summary><div class="v39-body">';
    var k = sec.indexOf(mark);
    if (k >= 0) {
      var rest = sec.slice(k + mark.length).replace(/<dt>(?:In brief|Aromas)<\/dt><dd>[^<]*<\/dd>/, '').replace('<dl class="v39-pairs"></dl>', '');
      rest = v57NameRows(rest, t);
      if (rest.indexOf('<dl class="v39-pairs">') === 0) rest = v57H4('cardH') + rest;
      sec = sec.slice(0, k + mark.length) + glass + rest;
      var head = V57_SEC_HEAD + 'v53-gs-fruit" data-chip="v53-gs-fruit">';
      if (sec.indexOf(head) === 0) sec = head.slice(0, -1) + ' open>' + sec.slice(head.length);
      s = s.slice(0, f.a) + sec + s.slice(f.b);
    }
  }
  /* the new sections, each with its chip, each ahead of the first of its anchors the page draws */
  var mode = v57WorldsMode(t);
  var hw = v57HouseWines(r.slug);
  var put = function (id, title, body, open, anchors) {
    if (!body) return false;
    for (var i = 0; i < anchors.length; i++) {
      var at = s.indexOf(V57_SEC_HEAD + anchors[i] + '"');
      if (at < 0) continue;
      s = s.slice(0, at) + v57Details(id, title, body, open) + s.slice(at);
      var chip = s.indexOf(V57_CHIP_HEAD + anchors[i] + '"');
      if (chip >= 0) s = s.slice(0, chip) + v57Chip(id, title) + s.slice(chip);
      return true;
    }
    return false;
  };
  var worlds = put('v57-gs-worlds', v57W(mode === 'contrast' ? 'worldsH' : 'homeH'), v57WorldsBody(t, hw), true, ['v53-gs-regions', 'v53-gs-grid', 'v53-gs-cards']);
  var tail = ['v53-gs-grid', 'v53-gs-cards'];
  put('v57-gs-service', v57W('serviceH'), v57ServiceBody(t), false, tail);
  put('v57-gs-guest', v57W('guestH'), v57GuestBody(t), false, tail);
  put('v57-gs-label', v57W('labelH'), v57LabelBody(t), false, tail);
  put('v57-gs-compare', v57W('compareH'), v57CompareBody(t), false, tail);
  put('v57-gs-list', v57W('listH'), v57ListBody(r, hw), false, tail);
  /* Sources, closed at the foot: after the last section the page draws */
  var src = v57SourcesBody(t);
  var last = src ? (v57SecAt(s, 'v53-gs-watch') || v57SecAt(s, 'v53-gs-cards')) : null;
  if (last) {
    s = s.slice(0, last.b) + v57Details('v57-gs-sources', v57W('sourcesH'), src, false) + s.slice(last.b);
    var navAt = s.indexOf(V57_NAV_HEAD);
    var navEnd = navAt >= 0 ? s.indexOf('</nav>', navAt) : -1;
    if (navEnd >= 0) s = s.slice(0, navEnd) + v57Chip('v57-gs-sources', v57W('sourcesH')) + s.slice(navEnd);
  }
  /* the one word flag leaves where the two worlds are described */
  if (worlds) {
    var p = v57SecAt(s, 'v53-gs-profile');
    if (p) s = s.slice(0, p.a) + s.slice(p.a, p.b).replace(/<dt>Where it is grown<\/dt><dd>[^<]*<\/dd>/, '') + s.slice(p.b);
  }
  return v57OpenApply(s, r.slug);
}
if (typeof v53GrapeHtml === 'function') {
  var _v57GrapeHtml = v53GrapeHtml;
  v53GrapeHtml = function (r) {
    var html = String(_v57GrapeHtml.apply(this, arguments) || '');
    try { return v57PageShape(html, r); } catch (e) { return html; }
  };
}

/* 3.10 the stock card's rows under the glass. A Fruit or Non fruit item that is only the word for a family of fruit
   or flowers (Vermentino's Citrus, Godello's citrus, Albarino's white flowers) is drawn as the table's own notes of
   that family, the names the row already holds left out; a qualified word (sweet spice) or a family the table does
   not list stays as the card has it. Only the page is drawn so: the stock card itself is never changed. */
var V57_FAMILY_OF = {
  'citrus': 'citrus', 'citrus fruit': 'citrus', 'citrus fruits': 'citrus', 'orchard fruit': 'orchard fruit', 'stone fruit': 'stone fruit',
  'stone fruits': 'stone fruit', 'tropical fruit': 'tropical fruit', 'tropical fruits': 'tropical fruit', 'red fruit': 'red fruit',
  'red fruits': 'red fruit', 'black fruit': 'black fruit', 'black fruits': 'black fruit', 'dark fruit': 'black fruit',
  'floral': 'floral', 'flowers': 'floral', 'white flowers': 'floral', 'blossom': 'floral'
};
function v57NameRow(text, t) {
  var fam = {};
  v57List(v57Obj(t && t.glass).notes).forEach(function (n) {
    var k = v57Str(n && n.family).toLowerCase();
    if (k && !v57Own(fam, k)) fam[k] = v57List(n.notes).map(v57Str).filter(Boolean);
  });
  var parts = String(text == null ? '' : text).split(', ');
  var held = parts.map(function (p) { return v57Str(p).toLowerCase(); });
  return parts.map(function (p, i) {
    var key = v57Str(p).toLowerCase();
    var f = v57Own(V57_FAMILY_OF, key) ? V57_FAMILY_OF[key] : '';
    var named = (f && v57Own(fam, f)) ? fam[f].filter(function (x) { return held.indexOf(x.toLowerCase()) < 0; }) : [];
    if (!named.length) return p;
    var out = v57Esc(named.join(', '));
    return (i === 0 && /^[A-Z]/.test(v57Str(p))) ? out.charAt(0).toUpperCase() + out.slice(1) : out;
  }).join(', ');
}
function v57NameRows(html, t) {
  return String(html || '').replace(/(<dt>(?:Fruit|Non fruit)<\/dt><dd>)([^<]*)(<\/dd>)/g, function (m, a, text, b) {
    return a + v57NameRow(text, t) + b;
  });
}

/* 3.11 The regions that name it. codex53 reads the starred places of a grape's Regionale region line by cutting the
   line at every comma, so a starred place with a bracket of districts was cut inside its bracket (Piedmont (Barolo,
   Bordeaux Left Bank (Medoc). The line is cut at the commas outside a bracket; a star on a place keeps its bracket
   whole, and a star inside a bracket keeps the starred places of that bracket (Loire (Vouvray)). A line no bracket
   cut reads as before. */
function v57StarPlaces(s) {
  var str = String(s == null ? '' : s), parts = [], depth = 0, from = 0, i, ch;
  for (i = 0; i < str.length; i++) {
    ch = str.charAt(i);
    if (ch === '(') depth++;
    else if (ch === ')') depth = depth > 0 ? depth - 1 : 0;
    else if (ch === ',' && depth === 0) { parts.push(str.slice(from, i)); from = i + 1; }
  }
  parts.push(str.slice(from));
  return parts.filter(function (p) { return p.indexOf('★') >= 0; }).map(function (p) {
    var q = p.replace(/\(([^()]*)\)/g, function (m, inner) {
      if (inner.indexOf('★') < 0) return m;
      return '(' + inner.split(',').filter(function (x) { return x.indexOf('★') >= 0; }).join(',') + ')';
    });
    return v57Str(q.replace(/\s*★/g, ''));
  }).filter(Boolean);
}
if (typeof v53StarPlaces === 'function') {
  var _v57StarPlaces = v53StarPlaces;
  v53StarPlaces = function (s) {
    try { return v57StarPlaces(s); } catch (e) { return _v57StarPlaces.apply(this, arguments); }
  };
}

/* =========== 4. the root rows =========== */

/* A grape's line on the root: its glass in a line, for every grape the table describes. */
if (typeof v53GrapeShort === 'function') {
  var _v57GrapeShort = v53GrapeShort;
  v53GrapeShort = function (r) {
    try {
      var t = v57T(r && r.slug);
      var lead = t ? v57Str(v57Obj(t.glass).lead) : '';
      if (lead) return lead;
    } catch (e) { }
    return _v57GrapeShort.apply(this, arguments);
  };
}

/* =========== 5. on the house's list =========== */

/* Old World or New World, by the last part of a wine's region as the house writes it: a country, or a state of
   the United States. A part the map does not hold goes under neither (Georgia is left out: a country of the
   Old World and a state of the New). */
var V57_WORLD = {};
(function () {
  ['France', 'Italy', 'Spain', 'Portugal', 'Germany', 'Austria', 'Switzerland', 'Greece', 'Hungary', 'England', 'Wales', 'United Kingdom', 'Luxembourg',
    'Slovenia', 'Croatia', 'Romania', 'Bulgaria', 'Czech Republic', 'Slovakia', 'Moldova', 'Cyprus', 'Turkey', 'Lebanon', 'Israel', 'Armenia',
    'North Macedonia', 'Serbia'].forEach(function (n) { V57_WORLD[v57Fold(n)] = 'old'; });
  ['United States', 'USA', 'California', 'Oregon', 'Washington', 'Washington State', 'New York', 'Virginia', 'Texas', 'Michigan', 'Idaho', 'Arizona',
    'New Mexico', 'Canada', 'Mexico', 'Argentina', 'Chile', 'Uruguay', 'Brazil', 'Australia', 'New Zealand', 'South Africa'].forEach(function (n) { V57_WORLD[v57Fold(n)] = 'new'; });
})();
function v57WorldOf(region) {
  var parts = String(region == null ? '' : region).split(',').map(v57Fold).filter(Boolean);
  var last = parts.length ? parts[parts.length - 1] : '';
  return (last && v57Own(V57_WORLD, last)) ? V57_WORLD[last] : '';
}
/* A field of a house wine as plain text: the value as the pack holds it, or the value a person kept. */
function v57Field(item, k) {
  if (!item) return '';
  if (typeof item[k] === 'string') return item[k].trim();
  var v = null;
  try { v = (typeof v28KV === 'function') ? v28KV(item, k) : null; } catch (e) { v = null; }
  return typeof v === 'string' ? v.trim() : '';
}
function v57House() {
  try { return (typeof v53House === 'function') ? v53House() : ((typeof v32House === 'function') ? v32House() : null); } catch (e) { return null; }
}
/* The house's wines of a grape, in the list's own order: { old, new, other, n }, each wine { id, producer, wine }.
   A wine counts when one of its grapes resolves to the slug. The producer and the wine alone are read, never a
   price, a year, a bin or a note; a wine the list holds twice (by the glass and by the bottle, two sizes, two
   years) is one row, opening the first. Empty when no house is loaded. */
function v57HouseWines(slug) {
  var out = { old: [], 'new': [], other: [], n: 0 };
  var s = v57Str(slug);
  var h = v57House();
  if (!s || !h || typeof v28Wines !== 'function' || typeof v28Grapes !== 'function' || typeof v53GrapeKey !== 'function') return out;
  var seen = {};
  v28Wines(h).forEach(function (w) {
    var hit = false;
    try { hit = v28Grapes(w).some(function (g) { return v53GrapeKey(g) === s; }); } catch (e) { hit = false; }
    if (!hit) return;
    var producer = v57Field(w, 'producer'), wine = v57Field(w, 'wine');
    if (!producer && !wine) return;
    var k = v57Fold(producer) + '|' + v57Fold(wine);
    if (seen[k]) return;
    seen[k] = 1;
    var world = v57WorldOf(v57Field(w, 'region'));
    out[world || 'other'].push({ id: w.id, producer: producer, wine: wine });
    out.n++;
  });
  return out;
}
function v57ListBody(r, read) {
  var hw = (read && typeof read === 'object') ? read : v57HouseWines(r && r.slug);
  if (!hw.n) return '';
  var group = function (key, list, world) {
    if (!list.length) return '';
    return '<h4 id="v57-list-' + world + '" tabindex="-1">' + v57Esc(v57W('worldCount', { world: v57W(key), n: list.length })) + '</h4><ul class="v57-wines">' + list.map(function (x) {
      return '<li><button type="button" class="v57-wine" data-v57="wine" data-id="' + v57Esc(x.id) + '" id="v57-w-' + v57Esc(x.id) + '">'
        + '<span class="v57-wine-p">' + v57Esc(x.producer || x.wine) + '</span>'
        + ((x.producer && x.wine) ? '<span class="v57-wine-w">' + v57Esc(x.wine) + '</span>' : '') + '</button></li>';
    }).join('') + '</ul>';
  };
  return v57P('v57-listline', hw.n === 1 ? v57W('listOne') : v57W('listMany', { n: hw.n }))
    + group('oldWorld', hw.old, 'old') + group('newWorld', hw['new'], 'new') + group('elsewhere', hw.other, 'other');
}
/* On our list opened at a world's heading, from the door on that side of the two worlds. */
function v57Land(node) {
  if (typeof v39Land === 'function') { v39Land(node); return; }
  try {
    if (!node || typeof node.getBoundingClientRect !== 'function') return;
    window.scrollTo(0, Math.max(0, node.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) - 72));
    if (typeof node.focus === 'function') node.focus({ preventScroll: true });
  } catch (e) { }
}
function v57ToList(world) {
  var d = null;
  try { d = document.getElementById('v57-gs-list'); } catch (e) { d = null; }
  if (!d) return false;
  d.open = true;
  var w = v57Str(world);
  var at = null;
  try { at = (/^(old|new|other)$/.test(w) ? document.getElementById('v57-list-' + w) : null) || d.querySelector('summary'); } catch (e2) { at = null; }
  v57Land(at || d);
  return true;
}
/* A house wine's card, opened from a grape's page as codex39 opens one from a region's: the list's own card
   screen, pushed, so Back returns to the grape. */
function v57OpenWine(id) {
  var wid = v57Str(id);
  if (!wid) return false;
  var known = false;
  try { known = typeof v28Wines === 'function' && v28Wines(v57House()).some(function (w) { return w.id === wid; }); } catch (e) { known = false; }
  if (!known) return false;
  if (typeof v32OpenWine === 'function') { v32OpenWine(wid); return true; }
  if (typeof v28Open !== 'function') return false;
  try { S._v28edit = false; S.view = 'cellar'; } catch (e) { return false; }
  v28Open(wid, false);
  return true;
}

/* =========== the acts =========== */

/* What a control of the layer does, by its data-v57 word: extended key by key. One listener for them all. */
var V57_ACTS = {
  wine: function (node) { return v57OpenWine(node && typeof node.getAttribute === 'function' ? node.getAttribute('data-id') : ''); },
  list: function (node) { return v57ToList(node && typeof node.getAttribute === 'function' ? node.getAttribute('data-world') : ''); }
};
(function () {
  if (typeof document === 'undefined' || !document || typeof document.addEventListener !== 'function') return;
  document.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v57]') : null;
    if (!node || node.disabled) return;
    var act = node.getAttribute('data-v57');
    if (!v57Own(V57_ACTS, act) || typeof V57_ACTS[act] !== 'function') return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    try { if (typeof v32Remember === 'function') v32Remember(node); } catch (err) { }
    try { V57_ACTS[act](node, e); } catch (err2) { }
  });
})();

/* =========== 6. study =========== */

/* 6.1 the layer's slot: per device, never exported, every touch in try. { c: the table's cards by id, p: the
   grapes presented by slug (each a record { ef, iv, n, due } in the Codex's own steps), w: the call drill's
   rounds { n, last, of } }, under the profile key rule. */
var V57_SLOT = 'oot-codex-grapesrs-v1';
function v57Key() {
  try {
    return (typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function') ? OOT.profiles.key(V57_SLOT) : V57_SLOT;
  } catch (e) { return V57_SLOT; }
}
function v57Rec() {
  var o = null;
  try {
    var s = (typeof localStorage !== 'undefined' && localStorage) ? localStorage.getItem(v57Key()) : null;
    o = s ? JSON.parse(s) : null;
  } catch (e) { o = null; }
  if (!o || typeof o !== 'object' || Array.isArray(o)) o = {};
  ['c', 'p', 'w'].forEach(function (k) { if (!o[k] || typeof o[k] !== 'object' || Array.isArray(o[k])) o[k] = {}; });
  return o;
}
function v57Put(o) {
  try { if (typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(v57Key(), JSON.stringify(o)); } catch (e) { }
}
/* The Codex's own days and its own steps (codex56's pure helpers over codex3's rule), else the same arithmetic:
   right, one day, then three, then the interval times the ease (the ease up a twentieth, to 2.8 at most); wrong,
   due today and the ease down a fifth (to 1.3 at least). */
function v57Today() {
  try { if (typeof v56Today === 'function') return v56Today(); } catch (e) { }
  try { if (typeof today === 'function') return today(); } catch (e2) { }
  return new Date().toISOString().slice(0, 10);
}
function v57AddDays(n) {
  try { if (typeof v56AddDays === 'function') return v56AddDays(n); } catch (e) { }
  try { if (typeof addDays === 'function') return addDays(n); } catch (e2) { }
  return new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
}
function v57Step(r, ok) {
  try { if (typeof v56Step === 'function') return v56Step(r, ok); } catch (e) { }
  var o = (r && typeof r === 'object') ? r : {};
  var ef = Number(o.ef) || 2.5, iv = Number(o.iv) || 0, n = Number(o.n) || 0;
  if (ok) {
    n++;
    iv = n === 1 ? 1 : (n === 2 ? 3 : Math.round(iv * ef));
    ef = Math.min(2.8, ef + 0.05);
  } else {
    n = 0; iv = 0; ef = Math.max(1.3, ef - 0.2);
  }
  return { ef: Math.round(ef * 100) / 100, iv: iv, n: n, due: v57AddDays(iv) };
}
/* One grade kept: a card by its id ('c'), a grape presented by its slug ('p'). Returns the record written. */
function v57Sched(kind, id, ok) {
  var k = kind === 'p' ? 'p' : 'c';
  var key = v57Str(id);
  if (!key) return null;
  try {
    var o = v57Rec();
    o[k][key] = v57Step(o[k][key] || {}, !!ok);
    v57Put(o);
    return o[k][key];
  } catch (e) { return null; }
}
function v57IsDue(r, day) { return !!r && typeof r.due === 'string' && !!r.due && r.due <= (day || v57Today()); }
/* The whole days from today to a date a record is due on; 0 for today and for a day already gone. */
function v57DaysTo(due) {
  var a = Date.parse(v57Today() + 'T00:00:00Z'), b = Date.parse(v57Str(due) + 'T00:00:00Z');
  return (isFinite(a) && isFinite(b) && b > a) ? Math.round((b - a) / 864e5) : 0;
}
function v57Count(n) { return Number(n) === 1 ? v57W('oneCard') : v57W('nCards', { n: Number(n) || 0 }); }

/* 6.2 the table's cards: every grape's three, in the root's order, each { kind: 'gtable', id, front, back, label
   (the grape's name), slug }. The id is the build's own (gt- and eight digits), the key its grade is kept under.
   Made once per edition of the data and of the join. */
var V57_ID = /^gt-[a-z0-9]{8}$/;
var V57_CARDS = { t: null, j: null, list: [], by: {}, bySlug: {} };
function v57GrapeList() {
  try { if (typeof v53GrapeOrder === 'function') return v57List(v53GrapeOrder().all); } catch (e) { }
  return [];
}
function v57Grape(slug) {
  var r = null;
  try { r = (typeof v53GrapeFind === 'function') ? v53GrapeFind(v57Str(slug)) : null; } catch (e) { r = null; }
  return r || null;
}
function v57CardBook() {
  var T = v57Table(), J = null;
  try { J = (typeof v53GrapeJoin === 'function') ? v53GrapeJoin() : null; } catch (e) { J = null; }
  if (V57_CARDS.t === T && V57_CARDS.j === J) return V57_CARDS;
  var out = { t: T, j: J, list: [], by: {}, bySlug: {} };
  v57GrapeList().forEach(function (r) {
    var t = v57T(r && r.slug);
    if (!t) return;
    var mine = [];
    v57List(t.cards).forEach(function (c) {
      var id = v57Str(c && c.id), front = v57Str(c && c.front), back = v57Str(c && c.back);
      if (!V57_ID.test(id) || !front || !back || v57Own(out.by, id)) return;
      var card = { kind: 'gtable', id: id, front: front, back: back, label: v57Str(r.name), slug: r.slug };
      out.by[id] = card;
      out.list.push(card);
      mine.push(card);
    });
    if (mine.length) out.bySlug[r.slug] = mine;
  });
  V57_CARDS = out;
  return out;
}
function v57CardsOf(slug) { var b = v57CardBook(); return v57Own(b.bySlug, slug) ? b.bySlug[slug] : []; }
function v57Hash(s) {
  var h = 2166136261, t = String(s);
  for (var i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = (typeof Math.imul === 'function') ? Math.imul(h, 16777619) : ((h * 16777619) | 0); }
  return h >>> 0;
}
/* The order a round takes cards in: the ones sent back first, then the ones due by the older date, then the cards
   never graded in the day's own deal (a shuffle that holds for the day, so the deck is the same deck each time it
   is drawn), then the rest by the day they come back. */
function v57StudyOrder(cards) {
  var rec = v57Rec().c, day = v57Today();
  var rows = v57List(cards).map(function (c, i) {
    var r = rec[c.id];
    var k = (!r || !r.due) ? 2 : (r.due <= day ? (Number(r.n) >= 1 ? 1 : 0) : 3);
    return { c: c, k: k, s: k === 2 ? v57Hash(day + '|' + c.id) : 0, d: (r && r.due) || '', i: i };
  });
  rows.sort(function (a, b) { return (a.k - b.k) || (a.s - b.s) || (a.d < b.d ? -1 : (a.d > b.d ? 1 : 0)) || (a.i - b.i); });
  return rows.map(function (x) { return x.c; });
}
/* The cards due: graded before and back on or before today. A slug narrows them to one grape. */
function v57DueCards(slug) {
  var rec = v57Rec().c, day = v57Today();
  var list = slug ? v57CardsOf(slug) : v57CardBook().list;
  return v57StudyOrder(list.filter(function (c) { return v57IsDue(rec[c.id], day); }));
}

/* 6.3 the decks, on codex32's one card screen: grapecards (every card of the table), grapecards:{slug} (a grape's
   three) and grapesdue (the cards due today). The stock decks grapes, grapes-all and grape:{slug} are untouched. */
var V57_DECK_RE = /^(?:grapecards|grapecards:([a-z0-9-]+)|grapesdue)$/;
function v57IsDeck(id) { return V57_DECK_RE.test(String(id || '')); }
function v57DeckSlug(id) {
  var m = V57_DECK_RE.exec(String(id || ''));
  var r = (m && m[1]) ? v57Grape(m[1]) : null;
  return r ? r.slug : '';
}
if (typeof v32DeckDef === 'function') {
  var _v57DeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    var s = String(id || '');
    if (!v57IsDeck(s)) return _v57DeckDef.apply(this, arguments);
    var def = { id: s, name: v57W('cardsDeck'), cards: [], kind: 'gtable' };
    try {
      if (s === 'grapesdue') { def.name = v57W('dueDeck'); def.cards = v57DueCards(); }
      else if (s === 'grapecards') def.cards = v57StudyOrder(v57CardBook().list);
      else {
        var r = v57Grape(v57DeckSlug(s));
        if (r) { def.name = v57W('grapeDeck', { name: r.name }); def.cards = v57CardsOf(r.slug).slice(); }
      }
    } catch (e) { def.cards = []; }
    try { def.learnt = (typeof v32Learnt === 'function') ? v32Learnt(def) : 0; } catch (e2) { def.learnt = 0; }
    return def;
  };
}
/* Learnt: last marked Got it, in the layer's slot. */
if (typeof v32Learnt === 'function') {
  var _v57Learnt = v32Learnt;
  v32Learnt = function (def) {
    if (def && def.kind === 'gtable') {
      var rec = v57Rec().c;
      return v57List(def.cards).filter(function (c) { var r = c && rec[c.id]; return !!r && Number(r.n) >= 1; }).length;
    }
    return _v57Learnt.apply(this, arguments);
  };
}
/* A table card graded: its due date in the layer's slot; then the grade goes on down the chain, so a stock grape
   card is still marked in its own slot and every other deck keeps its own. */
if (typeof v32Grade === 'function') {
  var _v57Grade = v32Grade;
  v32Grade = function (got) {
    try {
      var run = S._v32run;
      var c = (run && run.flip && run.deck && run.deck.length) ? run.cards[run.deck[0]] : null;
      if (c && c.kind === 'gtable' && v57Own(v57CardBook().by, c.id)) v57Sched('c', c.id, !!got);
    } catch (e) { }
    return _v57Grade.apply(this, arguments);
  };
}
/* The whole deck and the due deck are dealt in the order above, a round's worth from the top (codex43 takes the
   first cards of a deck dealt in its own order); a grape's three are shuffled as every small deck is. */
if (typeof v32StartRun === 'function') {
  var _v57StartRun = v32StartRun;
  v32StartRun = function (deckId, opts) {
    var o = opts;
    try {
      if ((deckId === 'grapecards' || deckId === 'grapesdue') && !(opts && opts.cards)) {
        o = {};
        Object.keys(opts || {}).forEach(function (k) { o[k] = opts[k]; });
        o.keepOrder = true;
      }
    } catch (e) { o = opts; }
    return _v57StartRun.call(this, deckId, o);
  };
}
/* The card's two faces: the question over the grape's name, then the answer with a door to the grape's page. */
function v57CardFaceHtml(c, run) {
  var w = function (k) { return (typeof v32W === 'function') ? v32W(k) : v57W(k); };
  var side = function (k) { return v57Esc(c.label ? v57W('cardSide', { side: w(k), name: c.label }) : w(k)); };
  if (!run || !run.flip) {
    return '<button type="button" class="card v28-front v57-card" data-v32="flip" id="v32-face"><span class="v28-eyebrow v28-ink">' + side('front') + '</span>'
      + '<span class="v28-fname v57-cq">' + v57Esc(c.front) + '</span></button>';
  }
  var door = (c.slug && c.label) ? '<p class="v57-cdoor"><button type="button" class="btn small ghost" data-go="grape" data-arg="' + v57Esc(c.slug) + '">' + v57Esc(v57W('cardDoor', { name: c.label })) + '</button></p>' : '';
  return '<div class="card v28-back v57-card" id="v32-face"><p class="v28-eyebrow v28-ink">' + side('answer') + '</p>'
    + '<h3 class="v28-bname v57-cq" tabindex="-1" id="v32-ans">' + v57Esc(c.front) + '</h3><p class="v57-ca">' + v57Esc(c.back) + '</p>' + door + '</div>';
}
if (typeof v32CardFace === 'function') {
  var _v57CardFace = v32CardFace;
  v32CardFace = function (c, run) {
    if (c && c.kind === 'gtable') { try { return v57CardFaceHtml(c, run); } catch (e) { return ''; } }
    return _v57CardFace.apply(this, arguments);
  };
}
/* A deck of the layer dealt to its end: codex32's Another deck leads to the Library, which holds none of these,
   so the door reads All grapes and opens the root. */
if (typeof v32CardHtml === 'function') {
  var _v57CardHtml = v32CardHtml;
  v32CardHtml = function () {
    var html = String(_v57CardHtml.apply(this, arguments) || '');
    try {
      var run = S._v32run;
      if (run && run.v32 && v57IsDeck(run.deckId) && !run.deck.length) {
        html = html.replace(/<button type="button" class="btn ghost" data-v32="another">[^<]*<\/button>/, '<button type="button" class="btn ghost" data-go="grapes" id="v57-deck-all">' + v57Esc(v57W('allGrapes')) + '</button>');
      }
    } catch (e) { }
    return html;
  };
}
/* The decks and their cards light Grapes. The deck screen of a grape's three climbs to the grape and so does
   their run; the due run climbs to the root, as the whole deck's screen does. */
function v57DeckShown() {
  try {
    if (S.view === 'deck') return String(S._v32deck || '');
    if (S.view === 'housedeck' || S.view === 'flash') { var run = S._v32run; return (run && run.v32) ? String(run.deckId || '') : ''; }
  } catch (e) { }
  return '';
}
if (typeof v25NavWord === 'function') {
  var _v57DeckNavWord = v25NavWord;
  v25NavWord = function () {
    try { if (v57IsDeck(v57DeckShown())) return 'grapes'; } catch (e) { }
    return _v57DeckNavWord.apply(this, arguments);
  };
}
if (typeof v32ParentRoute === 'function') {
  var _v57DeckParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      var id = v57DeckShown();
      if (v57IsDeck(id)) {
        var slug = v57DeckSlug(id);
        if (slug) return { view: 'grape', arg: slug };
        if (S.view === 'deck' || id === 'grapesdue') return { view: 'grapes' };
      }
    } catch (e) { }
    return _v57DeckParentRoute.apply(this, arguments);
  };
}
/* Starts a deck of the layer from one of its doors: a named deck straight on the card screen; with none named,
   the cards due when there are any, else the whole deck's own screen with its round sizes. */
function v57StartCards(deck) {
  var id = v57Str(deck);
  try { S._v53from = 'grapes'; } catch (e) { }
  if (!id) {
    if (v57DueCards().length) id = 'grapesdue';
    else {
      if (!v57CardBook().list.length) { if (typeof toast === 'function') toast(v57W('noCards')); return false; }
      if (typeof v32OpenDeck !== 'function') return false;
      v32OpenDeck('grapecards');
      return true;
    }
  }
  if (!v57IsDeck(id) || typeof v32StartRun !== 'function') return false;
  return v32StartRun(id, { push: true });
}
V57_ACTS.cards = function (node) { return v57StartCards(node && typeof node.getAttribute === 'function' ? node.getAttribute('data-deck') : ''); };

/* 6.4 the table's questions: each grape's three, dealt as the bank's are. A copy a question, made once per
   edition of the data: its section is the grape's own (the name codex53 gives a grape's drill, so the results
   screen deals that grape again), its options and key as the build dealt them. */
var V57_QS = { t: null, j: null, by: {}, bySlug: {} };
function v57QBook() {
  var T = v57Table(), J = null;
  try { J = (typeof v53GrapeJoin === 'function') ? v53GrapeJoin() : null; } catch (e) { J = null; }
  if (V57_QS.t === T && V57_QS.j === J) return V57_QS;
  var out = { t: T, j: J, by: {}, bySlug: {} };
  v57GrapeList().forEach(function (r) {
    var t = v57T(r && r.slug);
    if (!t) return;
    var mine = [];
    v57List(t.questions).forEach(function (q) {
      var id = v57Str(q && q.id), stem = v57Str(q && q.q);
      var opts = v57List(q && q.opts).map(v57Str);
      if (!V57_ID.test(id) || !stem || v57Own(out.by, id)) return;
      if (opts.length < 2 || opts.some(function (x) { return !x; }) || typeof q.a !== 'number' || q.a < 0 || q.a >= opts.length || Math.floor(q.a) !== q.a) return;
      var copy = { id: id, cat: v57W('qCat', { name: v57Str(r.name) }), q: stem, opts: opts, a: q.a, exp: v57Str(q.exp), grape: r.slug };
      if (v57Str(q.tag)) copy.tag = v57Str(q.tag);
      out.by[id] = copy;
      mine.push(copy);
    });
    if (mine.length) out.bySlug[r.slug] = mine;
  });
  V57_QS = out;
  return out;
}
function v57Questions(slug) { var b = v57QBook(); return v57Own(b.bySlug, slug) ? b.bySlug[slug] : []; }
function v57BareKey(k) {
  var s = String(k == null ? '' : k);
  var i = s.indexOf('|');
  return i >= 0 ? s.slice(i + 1) : s;
}
function v57IsQId(id) { return typeof id === 'string' && V57_ID.test(id); }
function v57IsQKey(k) { return typeof k === 'string' && v57IsQId(v57BareKey(k)); }
function v57QById(id) { var b = v57QBook(); return v57Own(b.by, id) ? b.by[id] : null; }
/* The bank questions a grape's name gathers, without the ones its notIn phrases shut out: a name shared with a
   place (a montepulciano key and Vino Nobile di Montepulciano) would pull the place's questions into the grape's
   drill. A question the Court's data tags with the grape is the grape's whatever it says. */
function v57NotIn(list, r, t) {
  var phrases = v57List(t && t.notIn).map(v57Fold).filter(Boolean);
  if (!phrases.length) return list;
  return list.filter(function (q) {
    if (!q || typeof q !== 'object') return false;
    var tagged = false;
    try { tagged = v57List(q.grapes).some(function (n) { return v53GrapeKey(n) === r.slug; }); } catch (e) { tagged = false; }
    if (tagged) return true;
    var ans = (Array.isArray(q.opts) && typeof q.a === 'number') ? q.opts[q.a] : (typeof q.ans === 'string' ? q.ans : '');
    var hay = ' ' + v57Fold([q.q, ans, q.exp].join(' ')) + ' ';
    return !phrases.some(function (p) { return hay.indexOf(' ' + p + ' ') >= 0; });
  });
}
if (typeof v53GrapeQuestions === 'function') {
  var _v57GrapeQuestions = v53GrapeQuestions;
  v53GrapeQuestions = function (slug) {
    var out = _v57GrapeQuestions.apply(this, arguments);
    try {
      var r = v57Grape(slug);
      var t = r ? v57T(r.slug) : null;
      if (!r || !t || !Array.isArray(out)) return out;
      return v57NotIn(out, r, t).concat(v57Questions(r.slug));
    } catch (e) { return out; }
  };
}
/* A gt- key in the engine, as codex53 keeps an e- key: never level progress (keyOwned), never in codex3's
   rotation (srsRecord), never an orphan (qidAudit); the ledger finds it (findByKey) and tags it Grapes. */
if (typeof keyOwned === 'function') {
  var _v57KeyOwned = keyOwned;
  keyOwned = function (k) {
    if (v57IsQKey(k)) return false;
    return _v57KeyOwned.apply(this, arguments);
  };
}
if (typeof srsRecord === 'function') {
  var _v57SrsRecord = srsRecord;
  srsRecord = function (q) {
    if (q && v57IsQId(q.id)) return;
    return _v57SrsRecord.apply(this, arguments);
  };
}
if (typeof qidAudit === 'function') {
  var _v57QidAudit = qidAudit;
  qidAudit = function () {
    var out = _v57QidAudit.apply(this, arguments);
    try {
      var known = v57QBook().by;
      var orph = out && out.orphanedKeys;
      if (orph && typeof orph === 'object') {
        Object.keys(orph).forEach(function (name) {
          var left = v57List(orph[name]).filter(function (k) { return !v57Own(known, v57BareKey(k)); });
          if (left.length) orph[name] = left; else delete orph[name];
        });
      }
    } catch (e) { }
    return out;
  };
}
if (typeof findByKey === 'function') {
  var _v57FindByKey = findByKey;
  findByKey = function (k) {
    if (v57IsQKey(k)) return v57QById(v57BareKey(k));
    return _v57FindByKey.apply(this, arguments);
  };
}
function v57TagRows(rows) {
  return v57List(rows).map(function (x) { if (x && v57IsQKey(x.k)) x.lvl = v57W('qLevel'); return x; });
}
if (typeof graderDisputes === 'function') {
  var _v57GraderDisputes = graderDisputes;
  graderDisputes = function () { return v57TagRows(_v57GraderDisputes.apply(this, arguments)); };
}
if (typeof badReports === 'function') {
  var _v57BadReports = badReports;
  badReports = function () { return v57TagRows(_v57BadReports.apply(this, arguments)); };
}

/* 6.5 a grape's page: Cards at the table inside its cards section, after the stock card and the drill. The three
   fronts with what each is due, a line of where the grape stands, the door that deals them. */
function v57CardState(r, day) {
  if (!r || !r.due) return v57W('stateNew');
  if (v57IsDue(r, day)) return v57W('stateDue');
  var n = v57DaysTo(r.due);
  return n <= 1 ? v57W('stateTomorrow') : v57W('stateDays', { n: n });
}
function v57GrapeCardsHtml(r) {
  var cards = v57CardsOf(r && r.slug);
  if (!cards.length) return '';
  var rec = v57Rec().c, day = v57Today();
  var due = cards.filter(function (c) { return v57IsDue(rec[c.id], day); }).length;
  var learnt = cards.filter(function (c) { return !!rec[c.id] && Number(rec[c.id].n) >= 1; }).length;
  var graded = cards.filter(function (c) { return !!rec[c.id]; }).length;
  var vars = { cards: v57Count(cards.length), name: r.name, d: due, m: learnt };
  var line = !graded ? v57W('gcNone', vars) : (due ? v57W('gcDue', vars) : v57W('gcLearnt', vars));
  return '<h4 id="v57-gcards-h">' + v57Esc(v57W('cardsDeck')) + '</h4>' + v57P('v57-cardsline', line)
    + '<ul class="v57-cardlist">' + cards.map(function (c) {
      return '<li><span class="v57-cardq">' + v57Esc(c.front) + '</span><span class="v57-cardstate">' + v57Esc(v57CardState(rec[c.id], day)) + '</span></li>';
    }).join('') + '</ul>'
    + '<ul class="v39-lines v39-list v53-doors v57-carddoors"><li><button type="button" class="btn small ghost" data-v57="cards" data-deck="' + v57Esc('grapecards:' + r.slug) + '" id="v57-gcards">' + v57Esc(v57W('gcStudy')) + '</button></li>'
    + v57GrapePresentDoor(r) + '</ul>';
}
/* The door from a grape's page to saying it aloud (the view Present it), with where its mark stands. */
function v57GrapePresentDoor(r) {
  var t = v57T(r && r.slug);
  if (!t || !v57Str(v57Obj(t.lines).s45) || !v57Own(V57_VIEWS, 'grapepresent')) return '';
  var p = v57Rec().p[r.slug];
  var n = p ? v57DaysTo(p.due) : 0;
  var note = !p ? v57W('gpNew') : (v57IsDue(p) ? v57W('gpDue') : (n <= 1 ? v57W('gpLater') : v57W('gpLaterN', { n: n })));
  return '<li><button type="button" class="btn small ghost" data-go="grapepresent" data-arg="' + v57Esc(r.slug) + '" id="v57-gpresent">' + v57Esc(v57W('gpresent', { name: r.name })) + '</button>'
    + '<span class="v53-note">' + v57Esc(note) + '</span></li>';
}
if (typeof v53GrapeCardsBody === 'function') {
  var _v57GrapeCardsBody = v53GrapeCardsBody;
  v53GrapeCardsBody = function (r) {
    var html = String(_v57GrapeCardsBody.apply(this, arguments) || '');
    try {
      if (!r || !v57T(r.slug)) return html;
      var nq = v57Questions(r.slug).length;
      if (nq) {
        var note = 'with the CMS questions written to it.</span>';
        var na = html.indexOf(note);
        if (na >= 0) html = html.slice(0, na + note.length - 7) + ' ' + v57Esc(v57W('drillTable', { n: nq })) + html.slice(na + note.length - 7);
      }
      var block = v57GrapeCardsHtml(r);
      if (!block) return html;
      var doors = '<ul class="v39-lines v39-list v53-doors">';
      var end = html.indexOf(doors) === 0 ? html.indexOf('</ul>') : -1;
      return end >= 0 ? html.slice(0, end + 5) + block + html.slice(end + 5) : block + html;
    } catch (e) { return html; }
  };
}

/* =========== 7. the root: At the table =========== */

/* the layer's own views (section 8 makes them); a door to one is drawn only once it is there */
var V57_VIEWS = {};
var V57_ARGS = {};

/* 7.1 the filter of the root's rows: all, white, red, or the grapes the house pours. Kept for the sitting, so the
   root comes back from a grape as it was left; applied to the page as it is drawn, and to the page on screen
   without a redraw when a chip is pressed. */
var V57_FILTER = { f: 'all' };
/* The grapes the house pours, by slug: {} when no house is loaded. */
function v57HouseSlugs() {
  var out = {};
  var h = v57House();
  if (!h || typeof v28Wines !== 'function' || typeof v28Grapes !== 'function' || typeof v53GrapeKey !== 'function') return out;
  try {
    v28Wines(h).forEach(function (w) {
      var names = [];
      try { names = v57List(v28Grapes(w)); } catch (e) { names = []; }
      names.forEach(function (g) { var s = v53GrapeKey(g); if (s) out[s] = 1; });
    });
  } catch (e2) { }
  return out;
}
function v57FilterHit(r, f, poured) {
  if (!r) return true;
  if (f === 'white') return r.colour === 'white';
  if (f === 'red') return r.colour !== 'white';
  if (f === 'list') return v57Own(poured, r.slug);
  return true;
}
function v57FilterCounts(poured) {
  var list = v57GrapeList();
  return {
    all: list.length,
    white: list.filter(function (r) { return r.colour === 'white'; }).length,
    red: list.filter(function (r) { return r.colour !== 'white'; }).length,
    list: list.filter(function (r) { return v57Own(poured, r.slug); }).length
  };
}
/* The filter in force: the one chosen, or all when the house's grapes were chosen and no house pours one now. */
function v57FilterNow(counts) {
  var f = V57_FILTER.f;
  if (f !== 'white' && f !== 'red' && f !== 'list') return 'all';
  if (f === 'list' && !(counts && counts.list)) return 'all';
  return f;
}
function v57FilterSay(f, counts) {
  return f === 'all' ? '' : v57W('showing_' + f, { n: counts[f], all: counts.all });
}
var V57_ROW_HEAD = '<li><button class="v25row" type="button" data-go="grape" data-arg="';
/* The root's HTML with the filter applied: a row out of it hidden, and a group or a section left with no row. */
function v57FilterHtml(html, f, poured) {
  var s = String(html || '');
  if (f === 'all') return s;
  s = s.split(V57_ROW_HEAD).map(function (part, i) {
    if (!i) return part;
    var r = v57Grape(part.slice(0, part.indexOf('"')));
    return (v57FilterHit(r, f, poured) ? V57_ROW_HEAD : '<li hidden>' + V57_ROW_HEAD.slice(4)) + part;
  }).join('');
  var group = '<section class="v32-group" aria-labelledby="v53-g-';
  s = s.split(group).map(function (part, i) {
    if (!i) return part;
    var end = part.indexOf('</section>');
    var body = end >= 0 ? part.slice(0, end) : part;
    var none = body.indexOf('data-go="grape"') >= 0 && body.indexOf(V57_ROW_HEAD) < 0;
    return (none ? '<section class="v32-group" hidden aria-labelledby="v53-g-' : group) + part;
  }).join('');
  ['v53-g-twenty', 'v53-g-every'].forEach(function (id) {
    var head = '<section class="v32-sec v53-gsec" aria-labelledby="' + id + '"';
    var a = s.indexOf(head);
    var b = a >= 0 ? s.indexOf('</section></section>', a) : -1;
    if (b < 0 || s.slice(a, b).indexOf(V57_ROW_HEAD) >= 0) return;
    s = s.slice(0, a) + '<section class="v32-sec v53-gsec" hidden aria-labelledby="' + id + '"' + s.slice(a + head.length);
  });
  /* a jump to a list the filter has emptied leaves with the list */
  var gone = /<section class="v32-(?:group|sec v53-gsec)" hidden aria-labelledby="(v53-g-[a-z-]+)"/g, m;
  while ((m = gone.exec(s))) {
    var chip = '<button type="button" class="v28-chip" data-v53="jump" data-to="' + m[1] + '">';
    var at = s.indexOf(chip);
    if (at >= 0 && at < m.index) s = s.slice(0, at) + chip.slice(0, -1) + ' hidden>' + s.slice(at + chip.length);
  }
  return s;
}
/* The same on the page on screen: nothing is redrawn. Returns how many rows show. */
function v57FilterDom() {
  var root = null;
  try { root = document.querySelector('.v53-grapes'); } catch (e) { root = null; }
  if (!root || typeof root.querySelectorAll !== 'function') return 0;
  var poured = v57HouseSlugs();
  var counts = v57FilterCounts(poured);
  var f = v57FilterNow(counts);
  var each = function (sel, fn) { Array.prototype.forEach.call(root.querySelectorAll(sel), fn); };
  var shown = 0;
  each('button.v25row[data-go="grape"][data-arg]', function (b) {
    var hit = v57FilterHit(v57Grape(b.getAttribute('data-arg')), f, poured);
    var li = typeof b.closest === 'function' ? b.closest('li') : null;
    if (li) li.hidden = !hit;
    if (hit) shown++;
  });
  each('section.v32-group, section.v53-gsec', function (sec) {
    if (!sec.querySelector('button.v25row[data-go="grape"]')) return;
    sec.hidden = !sec.querySelector('li:not([hidden]) > button.v25row[data-go="grape"]');
  });
  each('.v53-jumps [data-to]', function (b) {
    var t = null;
    try { t = document.getElementById(b.getAttribute('data-to')); } catch (e) { t = null; }
    var sec = (t && typeof t.closest === 'function') ? t.closest('section') : null;
    b.hidden = !!(sec && sec.hidden);
  });
  each('[data-v57="filter"][data-f]', function (b) { if (b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', b.getAttribute('data-f') === f ? 'true' : 'false'); });
  var line = root.querySelector('#v57-filterline'), say = root.querySelector('#v57-filtersay');
  if (say) say.textContent = v57FilterSay(f, counts);
  if (line) line.hidden = f === 'all';
  return shown;
}
function v57FilterSet(f) {
  V57_FILTER.f = (f === 'white' || f === 'red' || f === 'list') ? f : 'all';
  v57FilterDom();
  /* the rows are above the chips: the line that says what shows comes to the top with the rows under it; with
     every grape back, the first list's heading */
  try {
    var at = null;
    ['v57-filterline', 'v53-g-twenty', 'v53-g-every'].some(function (id) {
      var h = document.getElementById(id);
      var sec = h && typeof h.closest === 'function' ? h.closest('section') : null;
      if (h && !h.hidden && !(sec && sec.hidden)) { at = id; return true; }
      return false;
    });
    if (!at) return true;
    if (typeof v41Jump === 'function') v41Jump(at);
    else v57Land(document.getElementById(at));
  } catch (e) { }
  return true;
}
V57_ACTS.filter = function (node) { return v57FilterSet(node && typeof node.getAttribute === 'function' ? node.getAttribute('data-f') : 'all'); };

/* 7.2 the section: the doors, then the filter's chips. A door is drawn only when it leads somewhere. */
function v57RootRow(attrs, name, line, id) {
  return '<li><button class="v25row" type="button" ' + attrs + (id ? ' id="' + v57Esc(id) + '"' : '') + '><span class="v25row-name">' + v57Esc(name) + '</span>'
    + (line ? '<span class="v25row-line">' + v57Esc(line) + '</span>' : '') + '</button></li>';
}
/* The grapes the two worlds are written for, the grapes with a line to say, in the root's order. */
function v57ContrastList() { return v57GrapeList().filter(function (r) { return v57WorldsMode(v57T(r.slug)) === 'contrast'; }); }
function v57SpokenList() { return v57GrapeList().filter(function (r) { var t = v57T(r.slug); return !!t && !!v57Str(v57Obj(t.lines).s45); }); }
function v57RootDoors() {
  var rows = '';
  var book = v57CardBook();
  var rec = v57Rec(), day = v57Today();
  if (book.list.length) {
    var due = book.list.filter(function (c) { return v57IsDue(rec.c[c.id], day); }).length;
    var learnt = book.list.filter(function (c) { return !!rec.c[c.id] && Number(rec.c[c.id].n) >= 1; }).length;
    var vars = { d: due, cards: v57Count(book.list.length), m: learnt };
    rows += v57RootRow('data-v57="cards"', v57W('cardsDeck'), due ? v57W('cardsRowDue', vars) : v57W('cardsRowLine', vars), 'v57-door-cards');
  }
  if (v57Own(V57_VIEWS, 'grapeworlds')) {
    var both = v57ContrastList().length;
    var w = v57Obj(rec.w);
    if (both) rows += v57RootRow('data-go="grapeworlds"', v57W('worldsH'), Number(w.of) > 0 ? v57W('worldsRowLast', { n: both, r: Number(w.last) || 0, of: Number(w.of) }) : v57W('worldsRowLine', { n: both }), 'v57-door-worlds');
  }
  if (v57Own(V57_VIEWS, 'grapecompare') && Object.keys(v57Table()).length >= 2) rows += v57RootRow('data-go="grapecompare"', v57W('compareRow'), v57W('compareRowLine'), 'v57-door-compare');
  if (v57Own(V57_VIEWS, 'grapepresent')) {
    var spoken = v57SpokenList();
    if (spoken.length) {
      var said = spoken.filter(function (r) { return !!rec.p[r.slug] && Number(rec.p[r.slug].n) >= 1; }).length;
      var again = spoken.filter(function (r) { return v57IsDue(rec.p[r.slug], day); }).length;
      var seen = spoken.filter(function (r) { return !!rec.p[r.slug]; }).length;
      var pv = { d: again, m: said, n: spoken.length };
      rows += v57RootRow('data-go="grapepresent"', v57W('presentRow'), again ? v57W('presentRowDue', pv) : (seen ? v57W('presentRowSaid', pv) : v57W('presentRowLine')), 'v57-door-present');
    }
  }
  return rows;
}
function v57RootFilterHtml(f, counts) {
  var chips = ['all', 'white', 'red', 'list'].filter(function (k) { return k !== 'list' || counts.list > 0; }).map(function (k) {
    return '<button type="button" class="v28-chip" data-v57="filter" data-f="' + k + '" aria-pressed="' + (k === f ? 'true' : 'false') + '">' + v57Esc(v57W('filter_' + k, { n: counts[k] })) + '</button>';
  }).join('');
  return '<h3 class="secgroup v32-gh" id="v57-filter-h">' + v57Esc(v57W('filterH')) + '</h3><div class="v32chips v57-filter" role="group" aria-labelledby="v57-filter-h">' + chips + '</div>';
}
/* 7.3 the root shaped: the section ahead of Tasting with its chip among the jumps, a line under the jumps that
   says what the filter shows (with the way back to every grape), the rows as the filter leaves them. With no
   table on the device the root is codex54's. */
function v57RootShape(html) {
  var s = String(html || '');
  if (!Object.keys(v57Table()).length || s.indexOf('id="v57-g-table"') >= 0) return s;
  var doors = v57RootDoors();
  var poured = v57HouseSlugs();
  var counts = v57FilterCounts(poured);
  var f = v57FilterNow(counts);
  var sec = '<section class="v32-sec v57 v57-gtable" aria-labelledby="v57-g-table"><h2 class="v32-h2" id="v57-g-table" tabindex="-1">' + v57Esc(v57W('atTable')) + '</h2>'
    + (doors ? '<p class="v32-line">' + v57Esc(v57W('rootLine')) + '</p><ul class="v25rows v32rows v57-doors">' + doors + '</ul>' : '')
    + v57RootFilterHtml(f, counts) + '</section>';
  var mark = s.indexOf('aria-labelledby="v53-g-tasting"');
  if (mark < 0) mark = s.indexOf('aria-labelledby="v53-g-cards"');
  var at = mark >= 0 ? s.lastIndexOf('<section', mark) : -1;
  if (at < 0) at = s.lastIndexOf('</div>');
  if (at < 0) return s;
  s = s.slice(0, at) + sec + s.slice(at);
  var nav = s.indexOf('<nav class="v32chips v53-jumps"');
  var navEnd = nav >= 0 ? s.indexOf('</nav>', nav) : -1;
  if (navEnd >= 0) {
    var chip = '<button type="button" class="v28-chip" data-v53="jump" data-to="v57-g-table">' + v57Esc(v57W('atTable')) + '</button>';
    var line = '<div class="v57 v57-filterline" id="v57-filterline" tabindex="-1"' + (f === 'all' ? ' hidden' : '') + '><p class="v32-line" id="v57-filtersay" role="status">' + v57Esc(v57FilterSay(f, counts)) + '</p>'
      + '<button type="button" class="btn small ghost" data-v57="filter" data-f="all" id="v57-filter-clear">' + v57Esc(v57W('showAll')) + '</button></div>';
    var before = s.indexOf('<button type="button" class="v28-chip" data-v53="jump" data-to="v53-g-tasting">', nav);
    if (before < 0 || before > navEnd) before = navEnd;
    s = s.slice(0, navEnd + 6) + line + s.slice(navEnd + 6);
    s = s.slice(0, before) + chip + s.slice(before);
  }
  return v57FilterHtml(s, f, poured);
}
if (typeof v53GrapesRootHtml === 'function') {
  var _v57GrapesRootHtml = v53GrapesRootHtml;
  v53GrapesRootHtml = function () {
    var html = String(_v57GrapesRootHtml.apply(this, arguments) || '');
    try { return v57RootShape(html); } catch (e) { return html; }
  };
}

/* =========== 8. the three views =========== */

/* 8.1 the registry: each view is owned by Grapes, climbs to the Grapes root and answers its own address, warm
   and cold. codex32's router is extended key by key; one arg a view, read back through the view's accept. */
function v57Go(view, arg, mode) {
  if (typeof v32Go === 'function') v32Go({ view: view, arg: arg == null ? '' : String(arg) }, mode || 'push');
}
function v57Build(html) {
  if (typeof v53CmsBuild === 'function') return v53CmsBuild(html);
  if (typeof v32Build === 'function') return v32Build(html);
  var box = document.createElement('div');
  box.innerHTML = html;
  return box;
}
/* The view drawn again in its own entry (an answer given, a line shown): the part named comes to the top, clear
   of the Back row, and what changed takes the focus without moving the page again. */
function v57Redraw(focusId, topId) {
  try { if (typeof V32 !== 'undefined' && V32) V32.pend = 'replace'; } catch (e) { }
  if (typeof render === 'function') render();
  try {
    var top = topId ? document.getElementById(topId) : null;
    if (top && typeof top.getBoundingClientRect === 'function') window.scrollTo(0, Math.max(0, top.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) - 72));
    else window.scrollTo(0, 0);
    var n = focusId ? document.getElementById(focusId) : null;
    if (n && typeof n.focus === 'function') n.focus({ preventScroll: true });
    else if (typeof v25FocusMain === 'function') v25FocusMain();
  } catch (e2) { }
}
function v57View(name, def) {
  V57_VIEWS[name] = def;
  if (typeof V32_PARENT !== 'undefined' && V32_PARENT) V32_PARENT[name] = 'grapes';
  if (typeof V32_OWNER !== 'undefined' && V32_OWNER) V32_OWNER[name] = 'grapes';
  if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER[name] = 'grapes';
  if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB[name] = 'grapes';
  if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA[name] = 'grapes';
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS[name] = function () { return v57Build(def.draw(V57_ARGS[name] || '')); };
  if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO[name] = function (arg) { v57Go(name, arg); };
}
if (typeof v32Arg === 'function') {
  var _v57Arg = v32Arg;
  v32Arg = function (v) {
    if (v57Own(V57_VIEWS, v)) return String(V57_ARGS[v] || '');
    return _v57Arg.apply(this, arguments);
  };
}
if (typeof v32Apply === 'function') {
  var _v57Apply = v32Apply;
  v32Apply = function (r) {
    if (r && v57Own(V57_VIEWS, r.view)) {
      var def = V57_VIEWS[r.view];
      var arg = String(r.arg || '');
      if (typeof def.accept === 'function') { try { arg = String(def.accept(arg) || ''); } catch (e) { arg = ''; } }
      V57_ARGS[r.view] = arg;
      S._v25area = 'grapes';
      S._v28edit = false;
      S._v53from = 'grapes';
      S.view = r.view;
      return arg ? { view: r.view, arg: arg } : { view: r.view };
    }
    return _v57Apply.apply(this, arguments);
  };
}
if (typeof v32ParentRoute === 'function') {
  var _v57ViewParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      if (v57Own(V57_VIEWS, S.view)) {
        var def = V57_VIEWS[S.view];
        return typeof def.parent === 'function' ? def.parent(V57_ARGS[S.view] || '') : { view: 'grapes' };
      }
    } catch (e) { }
    return _v57ViewParentRoute.apply(this, arguments);
  };
}
if (typeof v25NavWord === 'function') {
  var _v57ViewNavWord = v25NavWord;
  v25NavWord = function () {
    try { if (v57Own(V57_VIEWS, S.view)) return 'grapes'; } catch (e) { }
    return _v57ViewNavWord.apply(this, arguments);
  };
}
if (typeof v25MainName === 'function') {
  var _v57MainName = v25MainName;
  v25MainName = function () {
    try { if (S && v57Own(V57_VIEWS, S.view) && typeof V57_VIEWS[S.view].name === 'function') return V57_VIEWS[S.view].name(V57_ARGS[S.view] || ''); } catch (e) { }
    return _v57MainName.apply(this, arguments);
  };
}
function v57Head(title, sub) {
  if (typeof v32Head === 'function') return v32Head(title, sub);
  return '<div class="viewhead"><h2 tabindex="-1" class="v32-h">' + v57Esc(title) + '</h2>' + (sub ? '<div class="sub">' + v57Esc(sub) + '</div>' : '') + '</div>';
}
function v57Shuffle(a) {
  if (typeof shuffle === 'function') return shuffle(a.slice());
  var out = a.slice();
  for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = out[i]; out[i] = out[j]; out[j] = x; }
  return out;
}

/* 8.2 Old World and New World: the grapes the two worlds are written for as an index, each row its blind call
   and a door to the grape at its two sides; and the call drill. */

/* A grape's page opened at its two sides. */
function v57OpenWorlds(slug) {
  var r = v57Grape(slug);
  if (!r) return false;
  if (!v57Own(V57_OPEN, r.slug)) V57_OPEN[r.slug] = {};
  V57_OPEN[r.slug]['v57-gs-worlds'] = 1;
  v57Go('grape', r.slug);
  try {
    var d = document.getElementById('v57-gs-worlds');
    if (d && typeof d.querySelector === 'function') { d.open = true; v57Land(d.querySelector('summary') || d); }
  } catch (e) { }
  return true;
}
V57_ACTS.worlds = function (node) { return v57OpenWorlds(node && typeof node.getAttribute === 'function' ? node.getAttribute('data-slug') : ''); };

/* The glasses a grape gives the drill, read from its blind call: the line is written both ways (what leans one
   world; what leans the other), so each half is a glass described by its tell. The world a half leans to is the
   one it names (Old World or New World said outright, or a country or a state of the house's map), else the side
   whose places it names (a word of the place found in one side's own text and not in the other's), else its place
   in the line (the Old World is written first). A half that names both worlds (Spain or the New World) leans
   neither, so it gives no glass: its answer would be marked wrong whichever world was said. A grape whose call
   does not give both worlds sits the drill out. */
var V57_LEAN = /^(.+)\s+(?:leans?|points?|suggests?|says?|means?|signals?|indicates?|favours?)\s+(?:to\s+|towards\s+)?(.+)$/i;
var V57_PLAIN = { the: 1, and: 1, world: 1, wine: 1, wines: 1, style: 1, styles: 1, valley: 1, coast: 1, north: 1, south: 1, east: 1, west: 1, northern: 1, southern: 1 };
function v57CallSide(target, c, i, n) {
  var f = ' ' + v57Fold(target) + ' ';
  var named = {};
  if (f.indexOf(' old world ') >= 0) named.old = 1;
  if (f.indexOf(' new world ') >= 0) named['new'] = 1;
  Object.keys(V57_WORLD).forEach(function (k) { if (f.indexOf(' ' + k + ' ') >= 0) named[V57_WORLD[k]] = 1; });
  if (named.old && named['new']) return '';
  if (named.old || named['new']) return named.old ? 'old' : 'new';
  var hay = function (o) { return ' ' + v57Fold([o.where, o.glass, o.cellar].join(' ')) + ' '; };
  var ho = hay(v57Obj(c.old)), hn = hay(v57Obj(c['new']));
  var inOld = false, inNew = false;
  f.trim().split(' ').forEach(function (p) {
    if (p.length < 4 || v57Own(V57_PLAIN, p)) return;
    if (ho.indexOf(' ' + p + ' ') >= 0) inOld = true;
    if (hn.indexOf(' ' + p + ' ') >= 0) inNew = true;
  });
  if (inOld !== inNew) return inOld ? 'old' : 'new';
  if (n >= 2 && i === 0) return 'old';
  if (n >= 2 && i === n - 1) return 'new';
  return '';
}
function v57CallGlasses(t) {
  if (v57WorldsMode(t) !== 'contrast') return [];
  var c = v57Obj(v57Obj(t.worlds).contrast);
  /* the halves: parted by a semicolon, or written as sentences */
  var parts = v57Str(c.call).replace(/\.\s*$/, '').split(/\s*;\s*|\.\s+(?=[A-Z])/).filter(Boolean);
  var out = [];
  parts.forEach(function (p, i) {
    var m = V57_LEAN.exec(p);
    if (!m) return;
    var side = v57CallSide(m[2], c, i, parts.length);
    var text = v57Cap(m[1].replace(/[,\s]+$/, ''));
    if (side && text) out.push({ side: side, text: text + '.' });
  });
  var has = function (s) { return out.some(function (x) { return x.side === s; }); };
  return (has('old') && has('new')) ? out : [];
}
function v57CallPool() {
  var out = [];
  v57ContrastList().forEach(function (r) {
    v57CallGlasses(v57T(r.slug)).forEach(function (g) { out.push({ slug: r.slug, name: r.name, side: g.side, text: g.text }); });
  });
  return out;
}
/* A round: ten glasses, each of a different grape while the table holds ten to call (a grape's other glass only
   when it does not); kept in memory, so a reload deals a new one. */
var V57_ROUND = 10;
var V57_CALL = { deck: [], i: 0, right: 0, pick: '', log: [], kept: false };
function v57CallDeal() {
  var by = {}, slugs = [];
  v57CallPool().forEach(function (g) { if (!v57Own(by, g.slug)) { by[g.slug] = []; slugs.push(g.slug); } by[g.slug].push(g); });
  slugs = v57Shuffle(slugs);
  var deck = [], rest = [];
  slugs.forEach(function (s) { var g = v57Shuffle(by[s]); deck.push(g[0]); rest = rest.concat(g.slice(1)); });
  if (deck.length < V57_ROUND) deck = v57Shuffle(deck.concat(v57Shuffle(rest).slice(0, V57_ROUND - deck.length)));
  V57_CALL = { deck: deck.slice(0, V57_ROUND), i: 0, right: 0, pick: '', log: [], kept: false };
  return V57_CALL.deck.length;
}
function v57CallSize() {
  var seen = {}, n = 0, all = 0;
  v57CallPool().forEach(function (g) { all++; if (!seen[g.slug]) { seen[g.slug] = 1; n++; } });
  return Math.min(V57_ROUND, n >= V57_ROUND ? n : all);
}
function v57WorldWord(side) { return v57W(side === 'new' ? 'newWorld' : 'oldWorld'); }
function v57CallHtml() {
  var st = V57_CALL;
  var n = st.deck.length;
  var html = '<div class="v25page v53 v57 v57-view v57-call" id="v57-call">';
  if (!n) return html + v57Head(v57W('callAsk'), '') + '<p class="v32-line">' + v57Esc(v57W('callNone')) + '</p></div>';
  if (st.i >= n) {
    html += v57Head(v57W('scoreH'), st.right === n ? v57W('scoreAll', { n: n }) : v57W('scoreLine', { r: st.right, n: n }));
    html += '<ul class="v57-score" id="v57-call-score">' + st.log.map(function (x) {
      var t = v57T(x.slug);
      var call = x.ok ? '' : v57Str(v57Obj(v57Obj(v57Obj(t).worlds).contrast).call);
      return '<li><span class="v57-sname">' + v57Esc(x.name) + '</span><span class="v57-sline">' + v57Esc(v57W(x.ok ? 'calledRight' : 'calledWrong', { world: v57WorldWord(x.side) })) + '</span>'
        + (call ? '<span class="v57-stell">' + v57Esc(call) + '</span><button type="button" class="btn small ghost" data-v57="worlds" data-slug="' + v57Esc(x.slug) + '">' + v57Esc(v57W('callSides', { name: x.name })) + '</button>' : '') + '</li>';
    }).join('') + '</ul>';
    /* one Back a screen: codex32's own control climbs to the index, so the round ends on the next round alone */
    return html + '<div class="v28-btnrow v57-after"><button type="button" class="btn gold" data-v57="callstart" id="v57-callagain">' + v57Esc(v57W('callAgain', { n: v57CallSize() })) + '</button></div></div>';
  }
  var g = st.deck[st.i];
  html += v57Head(v57W('callAsk'), v57W('callPos', { i: st.i + 1, n: n }));
  html += '<div class="card v57-glasscard"><p class="v57-geyebrow">' + v57Esc(v57W('callGlass', { name: g.name })) + '</p><p class="v57-gtext" id="v57-call-glass" tabindex="-1">' + v57Esc(g.text) + '</p></div>';
  if (!st.pick) {
    var btn = function (side) { return '<button type="button" class="btn gold" data-v57="callpick" data-side="' + side + '" id="v57-call-' + side + '">' + v57Esc(v57WorldWord(side)) + '</button>'; };
    return html + '<div class="v57-callrow" role="group" aria-label="' + v57Esc(v57W('callAsk')) + '">' + btn('old') + btn('new') + '</div></div>';
  }
  var ok = st.pick === g.side;
  var c = v57Obj(v57Obj(v57Obj(v57T(g.slug)).worlds).contrast);
  var o = v57Obj(c[g.side]);
  var rows = [[v57W('call'), c.call], [v57W('where'), o.where], [v57W('inGlass'), o.glass]].filter(function (p) { return v57Str(p[1]); })
    .map(function (p) { return '<dt>' + v57Esc(p[0]) + '</dt><dd>' + v57Esc(v57Str(p[1])) + '</dd>'; }).join('');
  html += '<section class="v57-verdict ' + (ok ? 'v57-called' : 'v57-missed') + '" aria-labelledby="v57-call-verdict"><h3 class="v57-verdict-h" id="v57-call-verdict" tabindex="-1">'
    + v57Esc(v57W(ok ? 'callRight' : 'callWrong', { world: v57WorldWord(g.side) })) + '</h3>' + (rows ? '<dl class="v57-vrows">' + rows + '</dl>' : '') + '</section>';
  return html + '<div class="v28-btnrow v57-after"><button type="button" class="btn gold" data-v57="callnext" id="v57-call-next">' + v57Esc(v57W(st.i + 1 >= n ? 'callEnd' : 'callNext')) + '</button>'
    + '<button type="button" class="btn ghost" data-v57="worlds" data-slug="' + v57Esc(g.slug) + '">' + v57Esc(v57W('callSides', { name: g.name })) + '</button></div></div>';
}
function v57WorldsHtml() {
  var list = v57ContrastList();
  var html = '<div class="v25page v32-root v53 v57 v57-view v57-worlds" id="v57-worlds">' + v57Head(v57W('worldsH'), v57W('worldsSub'));
  if (!list.length) return html + '<p class="v32-line">' + v57Esc(v57W('callNone')) + '</p></div>';
  html += '<p class="v32-line">' + v57Esc(v57W('worldsLead', { n: list.length })) + '</p>';
  var size = v57CallSize();
  if (size) {
    var w = v57Obj(v57Rec().w);
    html += '<section class="v32-sec v57-callbox" aria-labelledby="v57-call-h"><h2 class="v32-h2" id="v57-call-h" tabindex="-1">' + v57Esc(v57W('callH')) + '</h2>'
      + '<p class="v32-line">' + v57Esc(v57W('callLine') + (Number(w.of) > 0 ? ' ' + v57W('callLast', { r: Number(w.last) || 0, of: Number(w.of) }) : '')) + '</p>'
      + '<div class="v28-btnrow"><button type="button" class="btn gold" data-v57="callstart" id="v57-callstart">' + v57Esc(v57W('callStart', { n: size })) + '</button></div></section>';
  }
  var group = function (key, id, rows) {
    if (!rows.length) return '';
    return '<section class="v32-sec" aria-labelledby="' + id + '"><h2 class="v32-h2" id="' + id + '" tabindex="-1">' + v57Esc(v57W(key)) + '</h2><ul class="v25rows v32rows v57-doors">' + rows.map(function (r) {
      var call = v57Str(v57Obj(v57Obj(v57T(r.slug).worlds).contrast).call);
      return v57RootRow('data-v57="worlds" data-slug="' + v57Esc(r.slug) + '"', r.name, call, 'v57-w-' + r.slug);
    }).join('') + '</ul></section>';
  };
  html += group('whitesH', 'v57-w-whites', list.filter(function (r) { return r.colour === 'white'; }));
  html += group('redsH', 'v57-w-reds', list.filter(function (r) { return r.colour !== 'white'; }));
  var home = v57GrapeList().filter(function (r) { return v57WorldsMode(v57T(r.slug)) === 'home'; }).length;
  if (home > 1) html += '<p class="v32-line v57-homenote">' + v57Esc(v57W('homeNote', { n: home })) + '</p>';
  return html + '</div>';
}
V57_ACTS.callstart = function () {
  if (!v57CallDeal()) { if (typeof toast === 'function') toast(v57W('callNone')); return false; }
  if (S.view === 'grapeworlds' && V57_ARGS.grapeworlds === 'call') v57Redraw('v57-call-glass', 'v57-call');
  else v57Go('grapeworlds', 'call');
  return true;
};
V57_ACTS.callpick = function (node) {
  var st = V57_CALL, g = st.deck[st.i];
  var side = node && typeof node.getAttribute === 'function' ? node.getAttribute('data-side') : '';
  if (!g || st.pick || (side !== 'old' && side !== 'new')) return false;
  st.pick = side;
  var ok = side === g.side;
  if (ok) st.right++;
  st.log.push({ slug: g.slug, name: g.name, side: g.side, ok: ok });
  v57Redraw('v57-call-verdict', 'v57-call');
  return true;
};
V57_ACTS.callnext = function () {
  var st = V57_CALL;
  if (!st.deck.length || !st.pick) return false;
  st.i++;
  st.pick = '';
  if (st.i >= st.deck.length && !st.kept) {
    st.kept = true;
    try {
      var o = v57Rec();
      o.w = { n: (Number(o.w.n) || 0) + 1, last: st.right, of: st.deck.length };
      v57Put(o);
    } catch (e) { }
  }
  v57Redraw('v57-call-glass', 'v57-call');
  return true;
};
v57View('grapeworlds', {
  draw: function (arg) {
    if (arg !== 'call') return v57WorldsHtml();
    if (!V57_CALL.deck.length) v57CallDeal();
    return v57CallHtml();
  },
  accept: function (arg) { return arg === 'call' ? 'call' : ''; },
  name: function (arg) { return arg === 'call' ? v57W('callAsk') : v57W('worldsH'); },
  parent: function (arg) { return arg === 'call' ? { view: 'grapeworlds' } : { view: 'grapes' }; }
});

/* 8.3 Compare two grapes: two of the grapes the table describes, chosen; the glass, the notes, the structure,
   the tell and service side by side, and what the table says between the two when either names the other. */
function v57TableGrapes() { return v57GrapeList().filter(function (r) { return !!v57T(r.slug); }); }
function v57CmpPair(arg) {
  var parts = String(arg || '').split('~');
  var pick = function (s) { var r = s ? v57Grape(s) : null; return (r && v57T(r.slug)) ? r : null; };
  return { a: pick(parts[0]), b: pick(parts[1]) };
}
/* With one grape named or none: the first grape of the table, and the first neighbour its record compares it
   with (else the next grape of the table). */
function v57CmpDefault(a) {
  var list = v57TableGrapes();
  var first = a || list[0] || null;
  if (!first) return '';
  var second = null;
  v57List(v57T(first.slug).compare).some(function (c) {
    var r = v57Grape(c && c.slug);
    if (r && r.slug !== first.slug && v57T(r.slug)) { second = r; return true; }
    return false;
  });
  if (!second && list.length > 1) second = list[(list.indexOf(first) + 1) % list.length];
  return first.slug + '~' + (second && second !== first ? second.slug : '');
}
function v57CmpOptions(sel) {
  var list = v57TableGrapes();
  var group = function (key, rows) {
    return rows.length ? '<optgroup label="' + v57Esc(v57W(key)) + '">' + rows.map(function (r) {
      return '<option value="' + v57Esc(r.slug) + '"' + (r.slug === sel ? ' selected' : '') + '>' + v57Esc(r.name) + '</option>';
    }).join('') + '</optgroup>' : '';
  };
  return group('whitesH', list.filter(function (r) { return r.colour === 'white'; })) + group('redsH', list.filter(function (r) { return r.colour !== 'white'; }));
}
function v57CmpCell(r, kind) {
  var t = v57T(r.slug);
  var g = v57Obj(t.glass), s = v57Obj(t.service);
  var none = '<p>' + v57Esc(v57W('cmpNone')) + '</p>';
  var para = function (x) { return v57Str(x) ? '<p>' + v57Esc(v57Str(x)) + '</p>' : none; };
  var rows = function (list) {
    var l = list.filter(function (p) { return v57Str(p[0]) && v57Str(p[1]); });
    return l.length ? '<ul>' + l.map(function (p) { return '<li><span class="v57-clabel">' + v57Esc(v57Str(p[0])) + '</span>' + v57Esc(v57Str(p[1])) + '</li>'; }).join('') + '</ul>' : none;
  };
  if (kind === 'glass') return para(g.lead);
  if (kind === 'notes') return rows(v57List(g.notes).map(function (n) { return [v57Cap(n && n.family), v57List(n && n.notes).map(v57Str).filter(Boolean).join(', ')]; }));
  if (kind === 'structure') return para(g.structure);
  if (kind === 'tell') return para(r.g && r.g.tell);
  if (kind === 'service') return rows([[v57W('temp'), s.temp], [v57W('glassware'), s.glass], [v57W('decant'), s.decant], [v57W('age'), s.age]]);
  return none;
}
function v57CmpHtml(arg) {
  var P = v57CmpPair(arg);
  var html = '<div class="v25page v53 v57 v57-view v57-cmp" id="v57-cmp">' + v57Head(v57W('compareRow'), (P.a && P.b) ? v57W('cmpPair', { a: P.a.name, b: P.b.name }) : v57W('cmpSub'));
  if (v57TableGrapes().length < 2) return html + '<p class="v32-line">' + v57Esc(v57W('cmpChoose')) + '</p></div>';
  html += '<div class="v57-cmpform"><div><label for="v57-cmp-a">' + v57Esc(v57W('cmpA')) + '</label><select id="v57-cmp-a" class="sainput">' + v57CmpOptions(P.a ? P.a.slug : '') + '</select></div>'
    + '<div><label for="v57-cmp-b">' + v57Esc(v57W('cmpB')) + '</label><select id="v57-cmp-b" class="sainput">' + v57CmpOptions(P.b ? P.b.slug : '') + '</select></div>'
    + '<div class="v28-btnrow"><button type="button" class="btn gold" data-v57="cmpgo" id="v57-cmpgo">' + v57Esc(v57W('cmpGo')) + '</button></div></div>';
  if (!P.a || !P.b) return html + '<p class="v32-line" id="v57-cmp-say" role="status">' + v57Esc(v57W('cmpChoose')) + '</p></div>';
  if (P.a === P.b) return html + '<p class="v32-line" id="v57-cmp-say" role="status">' + v57Esc(v57W('cmpSame')) + '</p></div>';
  var tells = [];
  [[P.a, P.b], [P.b, P.a]].forEach(function (p) {
    v57List(v57T(p[0].slug).compare).forEach(function (c) { if (v57Str(c && c.slug) === p[1].slug && v57Str(c.tell) && tells.indexOf(v57Str(c.tell)) < 0) tells.push(v57Str(c.tell)); });
  });
  if (tells.length) html += '<section class="v57-cmpsec" aria-labelledby="v57-cmp-between"><h3 class="secgroup v32-gh" id="v57-cmp-between">' + v57Esc(v57W('cmpBetween')) + '</h3><div class="v57-between">'
    + tells.map(function (x) { return '<p>' + v57Esc(x) + '</p>'; }).join('') + '</div></section>';
  [['glass', 'inGlass'], ['notes', 'cmpNotes'], ['structure', 'structureH'], ['tell', 'cmpTell'], ['service', 'cmpService']].forEach(function (k) {
    html += '<section class="v57-cmpsec" aria-labelledby="v57-cmp-' + k[0] + '"><h3 class="secgroup v32-gh" id="v57-cmp-' + k[0] + '">' + v57Esc(v57W(k[1])) + '</h3><div class="v57-cmprow">'
      + '<div><span class="v57-cname">' + v57Esc(P.a.name) + '</span>' + v57CmpCell(P.a, k[0]) + '</div><div><span class="v57-cname">' + v57Esc(P.b.name) + '</span>' + v57CmpCell(P.b, k[0]) + '</div></div></section>';
  });
  var door = function (r, id) { return '<button type="button" class="btn ghost" data-go="grape" data-arg="' + v57Esc(r.slug) + '" id="' + id + '">' + v57Esc(v57W('cmpOpen', { name: r.name })) + '</button>'; };
  return html + '<div class="v28-btnrow v57-after">' + door(P.a, 'v57-cmp-pa') + door(P.b, 'v57-cmp-pb') + '</div></div>';
}
V57_ACTS.cmpgo = function () {
  var a = null, b = null;
  try { a = document.getElementById('v57-cmp-a'); b = document.getElementById('v57-cmp-b'); } catch (e) { a = null; }
  if (!a || !b) return false;
  v57Go('grapecompare', String(a.value || '') + '~' + String(b.value || ''), 'replace');
  try {
    var n = document.getElementById('v57-cmp-between') || document.getElementById('v57-cmp-glass') || document.getElementById('v57-cmp-say');
    if (n) { n.setAttribute('tabindex', '-1'); v57Land(n); }
  } catch (e2) { }
  return true;
};
v57View('grapecompare', {
  draw: function (arg) { return v57CmpHtml(arg); },
  accept: function (arg) {
    var P = v57CmpPair(arg);
    return (P.a && P.b) ? P.a.slug + '~' + P.b.slug : v57CmpDefault(P.a || P.b);
  },
  name: function () { return v57W('compareRow'); },
  parent: function () { return { view: 'grapes' }; }
});

/* 8.4 Present it: a grape is named, the learner says it aloud, the forty-five second line and the sale are
   shown, and the learner marks it said or not yet; the mark is a due date by the grape's slug, in the same
   steps as a card. */
var V57_PRESENT = { slug: '', shown: false, mark: '' };
/* The grapes passed over with Another grape this sitting, by slug: in memory only. Without it the order below
   hands the same two grapes back and forth, so Another grape could never reach a third. A grape marked leaves it;
   once every grape has been passed over it starts again. */
var V57_PASSED = {};
/* The grape to say next: one marked not yet, then one due by the older date, then one never said (the root's
   order), then the rest by the day they come back; never the one just said while another waits, and never one
   passed over this sitting while another has not been. */
function v57PresentNext(after) {
  var rec = v57Rec().p, day = v57Today();
  var rows = v57SpokenList().map(function (r, i) {
    var p = rec[r.slug];
    var k = (!p || !p.due) ? 2 : (p.due <= day ? (Number(p.n) >= 1 ? 1 : 0) : 3);
    return { r: r, k: k, d: (p && p.due) || '', i: i };
  });
  rows.sort(function (a, b) { return (a.k - b.k) || (a.d < b.d ? -1 : (a.d > b.d ? 1 : 0)) || (a.i - b.i); });
  var other = rows.filter(function (x) { return x.r.slug !== after; });
  var fresh = other.filter(function (x) { return !v57Own(V57_PASSED, x.r.slug); });
  var hit = fresh[0] || other[0] || rows[0] || null;
  return hit ? hit.r.slug : '';
}
function v57PresentHtml(arg) {
  var r = v57Grape(arg);
  var t = r ? v57T(r.slug) : null;
  var l = v57Obj(t && t.lines);
  var html = '<div class="v25page v53 v57 v57-view v57-present" id="v57-present"' + (r ? ' data-present="' + v57Esc(r.slug) + '"' : '') + '>';
  var spoken = v57SpokenList();
  var rec = v57Rec().p, day = v57Today();
  var seen = spoken.filter(function (x) { return !!rec[x.slug]; }).length;
  var count = seen ? v57W('presentCount', { m: spoken.filter(function (x) { return !!rec[x.slug] && Number(rec[x.slug].n) >= 1; }).length, n: spoken.length, d: spoken.filter(function (x) { return v57IsDue(rec[x.slug], day); }).length })
    : v57W('presentNew', { n: spoken.length });
  html += v57Head(v57W('presentRow'), v57W('presentSub'));
  if (!r || !v57Str(l.s45)) return html + '<p class="v32-line">' + v57Esc(v57W('presentNone')) + '</p></div>';
  var st = V57_PRESENT.slug === r.slug ? V57_PRESENT : { slug: r.slug, shown: false, mark: '' };
  var white = r.colour === 'white';
  var kind = v57W((v57Str(t.kind) === 'family' ? 'family_' : 'kind_') + (white ? 'white' : 'red'));
  var say = v57Str(t.say);
  html += '<p class="v32-line v57-pcount">' + v57Esc(count) + '</p>';
  html += '<div class="card v57-pcard"><p class="v57-pkind">' + v57Esc(kind) + '</p><h3 class="v57-pname" id="v57-pname" tabindex="-1">' + v57Esc(r.name) + '</h3>'
    + (say ? '<p class="v57-psay">' + v57Esc(v57W('presentSay', { say: say })) + '</p>' : '') + '<p class="v57-pask">' + v57Esc(v57W('presentAsk')) + '</p></div>';
  var next = v57PresentNext(r.slug);
  var nextR = (next && next !== r.slug) ? v57Grape(next) : null;
  if (!st.shown) {
    return html + '<div class="v28-btnrow v57-after"><button type="button" class="btn gold" data-v57="reveal" id="v57-reveal">' + v57Esc(v57W('reveal')) + '</button>'
      + (nextR ? '<button type="button" class="btn ghost" data-v57="pnext" id="v57-pskip">' + v57Esc(v57W('skip')) + '</button>' : '') + '</div></div>';
  }
  var sale = v57Str(l.sale);
  html += '<section class="v57 v57-table v57-ptable" aria-labelledby="v57-p-h"><h3 class="secgroup v57-h" id="v57-p-h" tabindex="-1">' + v57Esc(v57W('fortyFive')) + '</h3>' + v57P('v57-fortyfive', l.s45)
    + (sale ? '<hr class="v57-rule">' + v57Eyebrow('sale', 'v57-sale-h') + v57P('v57-sale', sale) : '') + '</section>';
  if (!st.mark) {
    return html + '<section class="v32-sec" aria-labelledby="v57-mark-h"><h3 class="secgroup v32-gh" id="v57-mark-h">' + v57Esc(v57W('markH')) + '</h3><p class="v32-line">' + v57Esc(v57W('markAsk')) + '</p>'
      + '<div class="v57-callrow"><button type="button" class="btn gold" data-v57="mark" data-ok="1" id="v57-mark-yes">' + v57Esc(v57W('said')) + '</button>'
      + '<button type="button" class="btn ghost" data-v57="mark" data-ok="0" id="v57-mark-no">' + v57Esc(v57W('notYet')) + '</button></div></section></div>';
  }
  var p = rec[r.slug];
  var days = p ? v57DaysTo(p.due) : 0;
  var marked = st.mark === 'said' ? (days <= 1 ? v57W('markedSaid') : v57W('markedSaidN', { n: days })) : v57W('markedNot');
  return html + '<p class="v32-line v57-marked" id="v57-p-marked" role="status" tabindex="-1">' + v57Esc(marked) + '</p><div class="v28-btnrow v57-after">'
    + (nextR ? '<button type="button" class="btn gold" data-v57="pnext" id="v57-pnext">' + v57Esc(v57W('presentNext', { name: nextR.name })) + '</button>' : '')
    + '<button type="button" class="btn ghost" data-go="grape" data-arg="' + v57Esc(r.slug) + '" id="v57-p-page">' + v57Esc(v57W('cmpOpen', { name: r.name })) + '</button></div></div>';
}
function v57PresentSlug() {
  var r = v57Grape(V57_ARGS.grapepresent);
  return r ? r.slug : '';
}
V57_ACTS.reveal = function () {
  var slug = v57PresentSlug();
  if (!slug) return false;
  V57_PRESENT = { slug: slug, shown: true, mark: '' };
  v57Redraw('v57-p-h', 'v57-p-h');
  return true;
};
V57_ACTS.mark = function (node) {
  var slug = v57PresentSlug();
  if (!slug || V57_PRESENT.slug !== slug || !V57_PRESENT.shown || V57_PRESENT.mark) return false;
  var ok = !!node && typeof node.getAttribute === 'function' && node.getAttribute('data-ok') === '1';
  v57Sched('p', slug, ok);
  if (v57Own(V57_PASSED, slug)) delete V57_PASSED[slug];
  V57_PRESENT.mark = ok ? 'said' : 'not';
  v57Redraw('v57-p-marked', 'v57-p-h');
  return true;
};
V57_ACTS.pnext = function () {
  var cur = v57PresentSlug();
  /* passed over unmarked: it waits behind every grape not yet passed over; with none left, the round starts again */
  if (cur && !(V57_PRESENT.slug === cur && V57_PRESENT.mark)) V57_PASSED[cur] = 1;
  var waiting = v57SpokenList().some(function (r) { return r.slug !== cur && !v57Own(V57_PASSED, r.slug); });
  if (!waiting) { V57_PASSED = {}; if (cur && !(V57_PRESENT.slug === cur && V57_PRESENT.mark)) V57_PASSED[cur] = 1; }
  var next = v57PresentNext(cur);
  if (!next) return false;
  V57_PRESENT = { slug: next, shown: false, mark: '' };
  v57Go('grapepresent', next, 'replace');
  try { window.scrollTo(0, 0); } catch (e) { }
  return true;
};
v57View('grapepresent', {
  draw: function (arg) { return v57PresentHtml(arg); },
  accept: function (arg) {
    var r = arg ? v57Grape(arg) : null;
    var slug = (r && v57T(r.slug) && v57Str(v57Obj(v57T(r.slug).lines).s45)) ? r.slug : v57PresentNext('');
    if (V57_PRESENT.slug !== slug) V57_PRESENT = { slug: slug, shown: false, mark: '' };
    return slug;
  },
  name: function () { return v57W('presentRow'); },
  parent: function () { return { view: 'grapes' }; }
});

/* =========== the cold address =========== */

/* A reload on one of the layer's views: codex32 read the address before they were known, so it is read again
   here, once, and the first render replaces (codex39's way). This block stays last. */
(function () {
  try {
    if (typeof V32 === 'undefined' || !V32 || V32.moved || typeof v32Parse !== 'function' || typeof v32Apply !== 'function') return;
    var hash = typeof V32.initialHash === 'string' ? V32.initialHash : '';
    if (!hash && typeof location !== 'undefined' && location && typeof location.hash === 'string') hash = location.hash;
    var m = /^#\/v\/([a-z0-9]+)(\/|$)/.exec(hash);
    if (!m || !v57Own(V57_VIEWS, m[1])) return;
    var r = v32Parse(hash);
    if (!r) return;
    v32Apply(r, typeof v32CurState === 'function' ? v32CurState() : null);
    V32.pend = 'replace';
  } catch (e) { }
})();
