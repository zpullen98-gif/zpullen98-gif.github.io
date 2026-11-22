/* ================== CODEX LIX: THE CHAMPAGNE HOUSES ==================

   The Champagne houses tab of the house tab, November 2026. Loaded after
   codex58.js and js/data-champagne.js, before boot.js. It edits no earlier
   layer and no data file; every wrapper is typeof guarded and outermost,
   every registry is extended key by key, never replaced, and the layer
   declares with var and function only. Every string it shows lives in
   V59_WORDS (read by v59W); the records' own fields (CHAMPAGNE_HOUSES, built
   by .scripts/champagne) are drawn as they are written. Its CSS lives in its
   own v59-style element, every selector under .wrap, every colour one of the
   house's own tokens so the night page and day service both read well.

   The owner asked for a Champagne House tab under the house tab, with a deep
   study and a tableside description of each house and its prestige cuvée:
   the 23 houses of a class sheet, each matched to its cuvée. The content is
   one record a house in CHAMPAGNE_HOUSES.houses, in the sheet's order; this
   layer reads it as it grows and is not edited when it does. It is a display
   overlay: WINE_PRODUCERS, FLAGSHIPS, the house and every earlier view are
   never changed.

   WHAT THIS LAYER OWNS:

   1. THE WORDS AND THE STYLE: V59_WORDS, v59W, and the v59-style element
      (the layer's pages, and the house tab's row of rooms restyled for five:
      five columns on a wide screen, three then two between, two on a phone
      with the fifth across both).

   2. THE DATA AS READ: the records in the sheet's order, by their key; a
      house the device does not hold is not drawn.

   3. THE ROOM: Champagne houses, the fifth room of the house tab
      (V48_ROOMS extended once, last), so every room's row draws five.

   4. THE VIEWS, each owned by the house tab and lit with it, answering its
      address warm and cold with codex32's one Back:
      champagne (the root: what a prestige cuvée is, Study, a filter by a
      word typed, the houses in the sheet's order, each with its cuvée as
      the label prints it and the cuvée in a line; with a house's key, the
      house: its name, how to say it, the year it dates from, its place and
      what it is in the appellation's terms; At the table, the house's lines
      and then the cuvée's, the forty five second line first, the sale, the
      ten and the twenty; then the prestige cuvée in full, the second cuvée
      where there is one, the house style, the story, what guests ask, the
      traps, the class sheet beside the label, On the list, Study, In the
      Codex, the sources closed at the foot, the houses before and after);
      champdrill (the matching drill, the house to its cuvée and the cuvée
      to its house, dealt from the data with the wrong answers drawn from
      the other houses); champpresent (Present it: a house is shown, the
      learner speaks, the forty five second line is revealed and marked).
      On a house page the Champagne houses button of the row of rooms is the
      current room, and a tap on it climbs to the root (heard here before
      codex48 reads it as already here). Back climbs a house, the drill and
      Present it to the root, the root to the Wine list.

   5. ON THE LIST: a house page's wines of that house on the house's list,
      read live through codex58's own matching (v58HouseWines), by the
      house's name and, where the library files the cuvée under a name of
      its own (Dom Pérignon, Rare Champagne), that name too; the producer
      over the wine, never a price or a vintage; each opens its wine card
      through the list's own door and Back returns to the house; nothing is
      drawn when no house is loaded or it pours none.

   6. STUDY, THE CARDS: the decks champcards (every card), champmatch (the
      house and cuvée cards alone, the class's matching drill as recall
      cards), champcards:{key} (a house's three) and champdue (the cards due
      today) on codex32's one card screen; the card kind champ (the
      question over the house's name, then the answer with a door to the
      house); each grade a due date by the Codex's own steps (codex56's
      v56Step, v56Today and v56AddDays, typeof guarded, as codex58 calls
      them), kept per device in oot-codex-champrs-v1 under the profile key
      rule ({ c, q, p }: the cards, the questions and the houses presented,
      by id or key); no other slot is touched.

   7. STUDY, THE QUIZ: the questions dealt through the core engine as
      codex58 deals its own: a house's three, the matching questions alone,
      or ten a round from every house with the ones due first; the section
      named, so the results screen and codex19's report deal it again. A
      key of the tab is never level progress, never in codex3's rotation,
      never an orphan, and the ledger finds it.

   8. A DOOR FROM PRODUCERS AND FLAGSHIPS: a house of the sheet with a
      record there gains, through codex58's own registry of sections
      (V58_SECS, extended by key), a door to its page here, last.

   9. THE SHELL: index.html loads js/data-champagne.js then js/codex59.js
      after codex58.js and before boot.js; the worker lists both.
*/

/* =========== 1. the words =========== */

var V59_WORDS = {
  tab: 'Champagne houses',
  noData: 'The Champagne houses are not on this device yet.',
  /* the root */
  rootLead: 'Each house of the class sheet with its prestige cuvée: what to say at the table, the wine in depth and the story behind the house.',
  partialLine: '{built} of the {roster} houses of the class sheet are written so far; the rest follow as they are finished.',
  lessonH: 'What a prestige cuvée is',
  lesson1: 'Every house on the class sheet makes a non vintage wine a guest is likely to know it by, such as Bollinger\'s Special Cuvée or Veuve Clicquot\'s Yellow Label, and a prestige cuvée: the wine the house sets at the head of its range.',
  lesson2: 'Many prestige cuvées are vintage wines, the harvest of one year named on the label. A few are blends of several harvests made so on purpose: Krug Grande Cuvée, Grand Siècle and Brut Gold.',
  lesson3: 'A first vintage and a first release are often years apart: the first vintage of Dom Pérignon is 1921, and it was first released in 1936.',
  lesson4: 'The class sheet and the label do not always print the same words. Each house page sets the two side by side, so you can answer the sheet in class and say the label at the table.',
  housesH: 'The houses of the class sheet',
  housesLine: 'In the order of the sheet. Each row names the house, its prestige cuvée as the label prints it, and the cuvée in a line.',
  findLabel: 'Find a house or a cuvée',
  findHint: 'A house, a cuvée or a village',
  findCount: '{n} of {m} houses',
  findNone: 'No house or cuvée holds those words.',
  findClear: 'Clear',
  /* a house */
  sayIt: 'Say it',
  founded: 'Founded',
  where: 'Where',
  kindH: 'In the appellation\'s terms',
  code_NM: 'négociant manipulant',
  code_RM: 'récoltant manipulant',
  code_CM: 'coopérative de manipulation',
  code_RC: 'récoltant coopérateur',
  code_SR: 'société de récoltants',
  code_ND: 'négociant distributeur',
  code_MA: 'marque d\'acheteur',
  codeLine: '{code}, {term}',
  tableHouseH: 'At the table: the house',
  tableCuveeH: 'At the table: {name}',
  house45: 'The house in forty five seconds',
  house10: 'The house in ten seconds',
  cuvee45: 'The cuvée in forty five seconds',
  sale: 'The sale',
  cuvee10: 'In ten seconds',
  cuvee20: 'In twenty seconds',
  saySay: 'Say it: {say}',
  sectionsNav: 'Sections',
  cuveeH: 'The prestige cuvée in full',
  cuveeChip: 'The cuvée',
  firstRow: 'Its first year',
  kindRow: 'What it is',
  kind_vintage: 'A vintage wine, the harvest of one year',
  'kind_multi-vintage': 'A blend of several harvests, made so on purpose',
  'kind_non-vintage': 'A non vintage wine',
  rhythm: 'How often it has been made',
  blend: 'The grapes',
  sites: 'The vineyards',
  making: 'How it is made',
  lees: 'On its lees',
  bottle: 'The bottle',
  young: 'In the glass on release',
  aged: 'With age',
  forms: 'Its other forms',
  serve: 'Serving',
  alsoH_beside: 'The second cuvée: made beside it',
  alsoH_before: 'The second cuvée: made before it',
  alsoH_after: 'The second cuvée: made since',
  alsoChip: 'The second cuvée',
  alsoLine: 'Say it at the table',
  styleH: 'The house style',
  styleChip: 'The style',
  styleLine: 'The style',
  styleGrapes: 'The grapes',
  reserve: 'Reserve wines',
  vessels: 'Oak or steel',
  malolactic: 'Malolactic',
  styleLees: 'On the lees',
  dosage: 'Dosage',
  nvRow: 'The wine guests know',
  storyH: 'The story',
  storyChip: 'The story',
  guestsH: 'What guests ask',
  guestsChip: 'Guests ask',
  trapsH: 'Traps',
  trapsChip: 'Traps',
  sheetH: 'The class sheet and the label',
  sheetChip: 'Sheet and label',
  sheetPrints: 'The class sheet prints',
  labelPrints: 'The label prints',
  listH: 'On our list',
  listHOwn: 'On {house} list',
  listHAt: 'On the list at {house}',
  listChip: 'On our list',
  listOne: 'The list holds one wine of {name}. It opens its card.',
  listMany: 'The list holds {n} wines of {name}. Each opens its card.',
  studyH: 'Study',
  studyChip: 'Study',
  codexH: 'In the Codex',
  codexChip: 'In the Codex',
  codexProducerH: 'The producer profile',
  codexCuveeH: 'The library\'s own record of the cuvée',
  codexFlagH: 'Producers and flagships',
  codexFlagDoor: '{name} and its flagship',
  codexRegionH: 'The region',
  codexTabH: 'Champagne houses',
  rootDoor: 'Every house of the class sheet',
  sourcesH: 'Sources',
  opensNew: ' (opens in a new tab)',
  prev: 'Previous: {name}',
  next: 'Next: {name}',
  stepsH: 'The houses before and after',
  allDoor: 'All the houses',
  /* study: the doors */
  studyLine: 'Three cards and three questions a house. A card or a question answered comes back by the Codex\'s own steps: tomorrow, then in three days, then further apart.',
  drillRow: 'Match the house and its cuvée',
  drillRowLine: 'The class drill, both ways: name the cuvée of a house, then the house of a cuvée',
  matchRow: 'Matching cards',
  matchRowLine: '{cards}, the house to its cuvée and the cuvée to its house · {m} learnt',
  matchRowDue: '{d} due today · {cards}, the house to its cuvée and back · {m} learnt',
  cardsRow: 'Champagne cards',
  cardsRowDue: '{d} due today · {cards} · {m} learnt',
  cardsRowLine: '{cards}, three a house · {m} learnt',
  quizRow: 'Quiz on every house',
  quizRowDue: '{d} due today · ten a round from {qs}',
  quizRowLine: 'Ten a round from {qs}, the ones due first · {r} answered right',
  matchQuizRow: 'The matching questions',
  matchQuizLine: '{qs}, one a house: the house and its cuvée',
  presentRow: 'Present it',
  presentRowLine: 'A house is named: say it and its cuvée aloud, then read the line and mark yourself',
  presentRowSaid: '{m} of {n} said well · {d} to say again today',
  pageCardsNone: 'The three cards of {name}, not studied yet.',
  pageCardsDue: 'The three cards of {name}: {d} due today.',
  pageCardsLearnt: 'The three cards of {name}: {m} learnt, none due today.',
  pageCardsDoor: 'Cards of {name}',
  pageQuizDoor: 'Quiz on {name}',
  pagePresentDoor: 'Present {name}',
  pageDrillDoor: 'Match the houses',
  oneCard: '1 card',
  nCards: '{n} cards',
  oneQ: '1 question',
  nQs: '{n} questions',
  stateNew: 'New',
  stateDue: 'Due today',
  stateTomorrow: 'Due tomorrow',
  stateDays: 'Due in {n} days',
  /* study: the cards */
  cardsDeck: 'Champagne cards',
  matchDeck: 'Champagne matching cards',
  houseDeck: 'Champagne cards: {name}',
  dueDeck: 'Champagne cards due today',
  cardSide: '{side} · {name}',
  cardDoor: 'The page for {name}',
  noCards: 'No Champagne cards are on this device yet.',
  /* study: the quiz */
  quizAll: 'Champagne houses: every house',
  quizMatch: 'Champagne houses: the house and its cuvée',
  quizHouse: 'Champagne houses: {name}',
  qLevel: 'Champagne houses',
  noQuestions: 'No Champagne questions are on this device yet.',
  /* the matching drill */
  drillSub: 'The class drill: the house to its cuvée, the cuvée to its house.',
  wayNav: 'Which way',
  wayBoth: 'Both ways',
  wayHouse: 'House to cuvée',
  wayCuvee: 'Cuvée to house',
  drillCount: 'Question {i} of {n} · {r} right',
  askCuvee: 'Name its prestige cuvée',
  askHouse: 'Name its house',
  sheetSays: 'The class sheet prints: {text}',
  optsLabel: 'The answers',
  right: 'Right.',
  wrong: 'Not this one. The answer is {answer}.',
  againNote: 'It comes back at the end of the round.',
  drillNext: 'Next',
  drillEnd: 'Round over: {r} of {n} right at the first try.',
  drillMissed: 'Learn these again',
  drillAgain: 'Another round',
  drillNone: 'Two houses at least are needed for the drill.',
  openHouse: 'Open {name}',
  /* present it */
  presentSub: 'Say the house and its prestige cuvée aloud, as you would at the table, then read the line.',
  presentAsk: 'Say the house in a breath, then its prestige cuvée in forty five seconds, aloud.',
  presentNew: '{n} houses to present, none said yet.',
  presentCount: '{m} of {n} said well · {d} to say again today',
  reveal: 'Show the line',
  skip: 'Another house',
  markH: 'How did it go?',
  markAsk: 'Did you say the house and its cuvée clearly, with the facts in their place?',
  said: 'Said it well',
  notYet: 'Not yet',
  markedSaid: 'Marked said well: it comes back tomorrow.',
  markedSaidN: 'Marked said well: it comes back in {n} days.',
  markedNot: 'Marked not yet: it comes back today.',
  presentNext: 'Next: {name}',
  presentNone: 'No house with its lines is on this device yet.',
  /* the door from Producers and flagships */
  flagDoorH: 'On the class sheet',
  flagDoorChip: 'Champagne houses',
  flagDoorLine: '{house} is a house of the class sheet in Champagne houses, with {cuvee} studied in depth.',
  flagDoorOpen: '{house} in Champagne houses'
};

function v59W(key, vars) {
  var v = vars || {};
  return String(Object.prototype.hasOwnProperty.call(V59_WORDS, key) ? V59_WORDS[key] : key).replace(/\{(\w+)\}/g, function (m, k) {
    return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m;
  });
}
function v59Esc(s) {
  if (typeof v32Esc === 'function') return v32Esc(s == null ? '' : String(s));
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function v59Str(s) { return typeof s === 'string' ? s.trim() : (typeof s === 'number' ? String(s) : ''); }
function v59List(x) { return Array.isArray(x) ? x : []; }
function v59Obj(x) { return (x && typeof x === 'object' && !Array.isArray(x)) ? x : {}; }
function v59Own(o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); }
function v59Fold(s) {
  if (typeof v53cFold === 'function') { try { return String(v53cFold(s)); } catch (e) { } }
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD'); } catch (e2) { }
  return t.replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/* =========== the style =========== */

(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  if (typeof document.getElementById === 'function') { var had = document.getElementById('v59-style'); if (had && had.id === 'v59-style') return; }
  var css = document.createElement('style');
  css.id = 'v59-style';
  css.textContent = [
    '.wrap .v59 [hidden]{display:none!important}',
    '.wrap .v59-view [tabindex="-1"]:focus{outline:none}',
    '.wrap .v59-view [tabindex="-1"]:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}',
    /* the row of rooms, five of them: five columns on a wide screen, three then two between, two on a phone with the
       fifth across both, so no button stands alone at the width of one and every word stays whole */
    '.wrap .v48-nav{grid-template-columns:repeat(5,minmax(0,1fr))}',
    '@media(max-width:860px){.wrap .v48-nav{grid-template-columns:repeat(6,minmax(0,1fr))}}',
    '@media(max-width:860px){.wrap .v48-nav .v48-nav-button{grid-column:span 2}}',
    '@media(max-width:860px){.wrap .v48-nav .v48-nav-button:nth-child(n+4){grid-column:span 3}}',
    '@media(max-width:600px){.wrap .v48-nav{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '@media(max-width:600px){.wrap .v48-nav .v48-nav-button,.wrap .v48-nav .v48-nav-button:nth-child(n+4){grid-column:auto}}',
    '@media(max-width:600px){.wrap .v48-nav .v48-nav-button:nth-child(5){grid-column:1/-1}}',
    '.wrap .v48-nav .v48-nav-button{overflow-wrap:normal;word-break:normal;hyphens:manual}',
    /* the root: the lesson, Study, the filter and the rows */
    '.wrap .v59-root .v59-partial{color:var(--gold-soft)}',
    '.wrap .v59-lesson{margin:22px 0 8px;padding:16px 18px;border:1px solid var(--line);border-radius:6px;background:var(--bg2)}',
    '.wrap .v59-lesson h2{margin-top:0}',
    '.wrap .v59-lesson p{font-size:17px;line-height:1.6;color:var(--parch);margin:8px 0 0}',
    '.wrap .v59-find{margin:22px 0 6px}',
    '.wrap .v59-find label{display:block;font-size:16px;font-weight:600;color:var(--parch);margin:0 0 6px}',
    '.wrap .v59-findrow{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px}',
    '.wrap .v59-findrow input{min-width:0;width:100%;min-height:46px;box-sizing:border-box;padding:10px 12px;border:1px solid var(--line);border-radius:4px;background:var(--bg);color:var(--parch);font:inherit;font-size:17px}',
    '.wrap .v59-findrow .btn{margin:0;min-height:46px}',
    '.wrap .v59-findcount{font-size:15px;line-height:1.5;color:var(--parch2);margin:8px 0 0}',
    '.wrap .v59-houses .v25row-name{font-family:var(--house-display,\'Cinzel\',Georgia,serif);letter-spacing:.02em}',
    '.wrap .v59-houses .v59-rowcuvee{color:var(--gold-hi);font-weight:600}',
    '.wrap .v59-houses .v59-rowstyle{color:var(--parch2)}',
    /* a house: the name, the facts, At the table as codex57 and codex58 set their forty five second lines */
    '.wrap .v59-name{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:30px;line-height:1.25;font-weight:600;letter-spacing:.02em;color:var(--gold-hi);margin:6px 0 2px;overflow-wrap:anywhere}',
    '.wrap .v59-eyebrow{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.07em;font-weight:500;color:var(--gold-soft);margin:14px 0 4px}',
    '.wrap .v59-facts{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:6px 14px;align-items:baseline;margin:12px 0 0}',
    '.wrap .v59-facts dt{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.06em;color:var(--gold-soft);margin:0}',
    '.wrap .v59-facts dd{margin:0;font-size:17px;line-height:1.5;color:var(--parch);overflow-wrap:anywhere}',
    '@media(max-width:480px){.wrap .v59-facts{grid-template-columns:minmax(0,1fr)}}',
    '@media(max-width:480px){.wrap .v59-facts dd{margin:0 0 6px}}',
    '.wrap .v59-year{font-weight:700;color:var(--gold-hi)}',
    '.wrap .v59-code{font-weight:700;color:var(--gold-hi)}',
    '.wrap .v59-table{margin:22px 0 4px}',
    '.wrap .v59-table>.v59-table-h{font-family:var(--house-display,\'Cinzel\',Georgia,serif);border-bottom:1px solid var(--line);margin-top:14px}',
    '.wrap .v59-tline{font-family:var(--house-reading,Georgia,serif);font-size:20px;line-height:1.5;font-weight:600;color:var(--parch);margin:4px 0 0;padding-left:12px;border-left:2px solid var(--line)}',
    '.wrap .v59-tshort{font-size:18px;line-height:1.5;color:var(--parch);margin:2px 0 4px;padding-left:12px;border-left:2px solid var(--line)}',
    '.wrap .v59-tsale{font-size:18px;line-height:1.5;color:var(--parch);margin:2px 0 4px;padding-left:12px;border-left:2px solid var(--gold)}',
    '.wrap .v59-tsay{font-size:16px;line-height:1.5;color:var(--parch2);margin:6px 0 0}',
    /* the chips of the sections: one line that scrolls sideways, each chip whole */
    '.wrap .v59-jumps{flex-wrap:nowrap;overflow-x:auto;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch;scrollbar-width:thin;margin:18px 0 6px;padding:8px 0}',
    '.wrap .v59-jumps .v28-chip{flex:0 0 auto;white-space:nowrap}',
    /* the sections, on the page\'s own ground */
    '.wrap .v59-sec{margin:28px 0 0}',
    '.wrap .v59-sec p,.wrap .v59-sec li,.wrap .v59-sec dd{font-size:17px;line-height:1.6;color:var(--parch)}',
    '.wrap .v59-sec .v59-cname{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:23px;line-height:1.3;font-weight:600;letter-spacing:.02em;color:var(--gold-hi);margin:8px 0 2px;overflow-wrap:anywhere}',
    '.wrap .v59-sec .v59-csay{font-size:16px;color:var(--parch2);margin:0}',
    '.wrap .v59-rows{margin:8px 0 0}',
    '.wrap .v59-rows dt{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.05em;line-height:1.5;color:var(--gold-soft);margin:16px 0 2px}',
    '.wrap .v59-rows dd{margin:0;overflow-wrap:anywhere}',
    '.wrap .v59-forms,.wrap .v59-traps,.wrap .v59-guests{list-style:none;margin:8px 0 0;padding:0}',
    '.wrap .v59-forms li{margin:0;padding:8px 0;border-bottom:1px solid var(--line)}',
    '.wrap .v59-forms li:last-child{border-bottom:0}',
    '.wrap .v59-fname{display:block;font-weight:700;color:var(--gold-hi);overflow-wrap:anywhere}',
    '.wrap .v59-guests li{margin:0;padding:10px 0;border-bottom:1px solid var(--line)}',
    '.wrap .v59-guests li:last-child{border-bottom:0}',
    '.wrap .v59-sec .v59-gq{font-weight:700;color:var(--gold-hi);margin:0}',
    '.wrap .v59-sec .v59-ga{margin:4px 0 0}',
    '.wrap .v59-traps li{margin:0 0 12px;padding:2px 0 2px 12px;border-left:3px solid var(--claret)}',
    '.wrap .v59-sheet{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 18px;margin:10px 0 0}',
    '@media(max-width:480px){.wrap .v59-sheet{grid-template-columns:minmax(0,1fr)}}',
    '.wrap .v59-sheet>div{padding:12px 14px;border:1px solid var(--line);border-radius:6px;background:var(--bg2);min-width:0}',
    '.wrap .v59-sec .v59-sheet-h{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.06em;color:var(--gold-soft);margin:0}',
    '.wrap .v59-sec .v59-sheet-t{font-family:var(--house-reading,Georgia,serif);font-size:19px;line-height:1.4;font-weight:600;color:var(--parch);margin:4px 0 0;overflow-wrap:anywhere}',
    '.wrap .v59-sec .v59-also{font-family:var(--house-reading,Georgia,serif);font-size:18px;line-height:1.5;font-weight:600;color:var(--parch);padding-left:12px;border-left:2px solid var(--line)}',
    '.wrap .v59-sourcesbox{margin-top:28px}',
    /* codex39 colours its sources claret for the parchment of a region page; here they sit on the page\'s own ground,
       where claret reads poorly by night, so they take the dark page\'s gold */
    '.wrap .v59-sources a{color:var(--gold-hi)}',
    '.wrap .v59-doors{display:flex;flex-wrap:wrap;gap:8px 10px;margin:8px 0 10px}',
    '.wrap .v59-doors .btn{margin:0;min-height:44px;white-space:normal;text-align:left}',
    '.wrap .v59-cgroup .secgroup{margin-top:14px}',
    '.wrap .v59-steps{display:flex;flex-wrap:wrap;gap:10px;margin:28px 0 8px}',
    '.wrap .v59-steps .btn{margin:0;min-height:44px;flex:1 1 12em;white-space:normal;text-align:left}',
    '.wrap .v59-steps .v59-next{text-align:right}',
    /* the house\'s wines on the list: a row a wine, the producer over the wine, each a 48px door to its card */
    '.wrap .v59-sec .v59-listline{margin:4px 0 0}',
    '.wrap .v59-wines{list-style:none;margin:6px 0 0;padding:0}',
    '.wrap .v59-sec .v59-wines li{margin:0;border-bottom:1px solid var(--line)}',
    '.wrap .v59-sec .v59-wines li:last-child{border-bottom:0}',
    '.wrap .v59-wine{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:1px;width:100%;min-height:48px;box-sizing:border-box;padding:8px 0;margin:0;background:none;border:0;border-radius:0;text-align:left;cursor:pointer;font-family:inherit;color:var(--parch)}',
    '.wrap .v59-wine-p{font-size:17px;line-height:1.35;font-weight:700;color:var(--gold-hi);overflow-wrap:anywhere}',
    '.wrap .v59-wine-w{font-size:16px;line-height:1.4;color:var(--parch);overflow-wrap:anywhere}',
    '.wrap .v59-wine:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    /* study: the doors, a house\'s three cards with when each is due */
    '.wrap .v59-study{margin:22px 0 6px}',
    '.wrap .v59-study .v32-line{margin:4px 0 8px}',
    '.wrap .v59-cardlist{list-style:none;margin:6px 0 10px;padding:0}',
    '.wrap .v59-sec .v59-cardlist li{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:2px 14px;margin:0;padding:9px 0;border-bottom:1px solid var(--line)}',
    '.wrap .v59-sec .v59-cardlist li:last-child{border-bottom:0}',
    '.wrap .v59-cardq{flex:1 1 13em;min-width:0;overflow-wrap:anywhere}',
    '.wrap .v59-cardstate{flex:0 0 auto;font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.05em;color:var(--gold-soft)}',
    /* a Champagne card asks a question, so its face is set in the reading face a size down */
    '.wrap .v59-fcard .v59-cq{font-family:var(--house-reading,Georgia,serif);font-size:21px;line-height:1.4;font-weight:700;letter-spacing:0;text-transform:none;overflow-wrap:anywhere}',
    '.wrap .v59-fcard .v59-ca{font-size:18px;line-height:1.55;margin:10px 0 0}',
    '.wrap .v59-cdoor{margin:18px 0 0}',
    '.wrap .v59-cdoor .btn{min-height:44px;font-size:16px;white-space:normal;text-align:left}',
    /* the matching drill and Present it, on the page\'s own ground */
    '.wrap .v59-ways{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 4px}',
    '.wrap .v59-ways .v28-chip{min-height:44px}',
    '.wrap .v59-ask{margin:16px 0 0;padding:16px 18px;border:1px solid var(--gold);border-radius:6px;background:var(--bg2)}',
    '.wrap .v59-ask .v59-askh{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:13px;letter-spacing:.07em;color:var(--gold-soft);margin:0}',
    '.wrap .v59-ask .v59-askname{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:26px;line-height:1.3;font-weight:600;color:var(--gold-hi);margin:6px 0 0;overflow-wrap:anywhere}',
    '.wrap .v59-asksheet{font-size:16px;line-height:1.5;color:var(--parch2);margin:6px 0 0}',
    '.wrap .v59-opts{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px}',
    '.wrap .v59-opt{display:block;width:100%;min-height:52px;box-sizing:border-box;margin:0;padding:12px 14px;text-align:left;white-space:normal;font-size:18px;line-height:1.4}',
    '.wrap .v59-opt[disabled]{cursor:default;opacity:1}',
    '.wrap .v59-opt.v59-right{border-color:var(--gold-hi);color:var(--gold-hi);font-weight:700}',
    '.wrap .v59-opt.v59-miss{border-color:var(--parch2);color:var(--parch2);text-decoration:line-through}',
    '.wrap .v59-said{margin:14px 0 0;font-size:18px;line-height:1.5;color:var(--parch)}',
    '.wrap .v59-said .v59-verdict{font-weight:700;color:var(--gold-hi)}',
    '.wrap .v59-after{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 6px}',
    '.wrap .v59-after .btn{margin:0;min-height:44px;white-space:normal;text-align:left}',
    '.wrap .v59-missed{list-style:none;margin:8px 0 0;padding:0}',
    '.wrap .v59-missed li{margin:0;padding:6px 0;border-bottom:1px solid var(--line)}',
    '.wrap .v59-missed li:last-child{border-bottom:0}',
    '.wrap .v59-missed .btn{margin:0;min-height:44px;white-space:normal;text-align:left}',
    '.wrap .v59-pcard .v59-pname{font-family:var(--house-display,\'Cinzel\',Georgia,serif);font-size:28px;line-height:1.3;font-weight:600;margin:4px 0 0;overflow-wrap:anywhere}',
    '.wrap .v59-pcard .v59-psay{font-size:17px;line-height:1.5;margin:6px 0 0}',
    '.wrap .v59-pcard .v59-pask{font-size:17px;line-height:1.5;margin:12px 0 0}',
    '.wrap .v59-callrow{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0 0}',
    '.wrap .v59-callrow .btn{margin:0;min-height:44px}',
    /* the door on a page of Producers and flagships */
    '.wrap .v59-flagdoor .v58-doors{margin-top:10px}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();

/* =========== 2. the data as read =========== */

function v59Data() {
  try { return (typeof CHAMPAGNE_HOUSES !== 'undefined' && CHAMPAGNE_HOUSES && typeof CHAMPAGNE_HOUSES === 'object') ? CHAMPAGNE_HOUSES : {}; } catch (e) { return {}; }
}
function v59Meta() { return v59Obj(v59Data().meta); }
/* The records in the sheet's order, by key and by id; made once per edition of the data. */
var V59_BOOK = { d: null, list: [], by: {} };
function v59Book() {
  var d = v59Data();
  if (V59_BOOK.d === d && d) return V59_BOOK;
  var out = { d: d, list: [], by: {} };
  v59List(d.houses).forEach(function (r) {
    if (!r || typeof r !== 'object' || Array.isArray(r)) return;
    var k = v59Str(r.key);
    if (!k || !/^[a-z0-9-]+$/.test(k) || v59Own(out.by, k) || !v59Str(r.house) || !v59Str(v59Obj(r.cuvee).name)) return;
    out.by[k] = r;
    out.list.push(r);
  });
  V59_BOOK = out;
  return out;
}
function v59Houses() { return v59Book().list; }
function v59Rec(key) { var b = v59Book(); var k = v59Str(key); return (k && v59Own(b.by, k)) ? b.by[k] : null; }
function v59At(key) { var at = -1; v59Houses().forEach(function (r, i) { if (r.key === key) at = i; }); return at; }
function v59Cuvee(r) { return v59Str(v59Obj(r && r.cuvee).name); }
function v59AlsoName(r) { return v59Str(v59Obj(r && r.also).name); }
/* The cuvée as a row names it: the label's words, and the second cuvée's where the record has one. */
function v59CuveeLine(r) { var a = v59AlsoName(r); return v59Cuvee(r) + (a ? ' · ' + a : ''); }
function v59Count(n, one, many) { return Number(n) === 1 ? v59W(one) : v59W(many, { n: Number(n) || 0 }); }
function v59P(cls, s) { var t = v59Str(s); return t ? '<p' + (cls ? ' class="' + cls + '"' : '') + '>' + v59Esc(t) + '</p>' : ''; }
/* Labelled rows, a label over its text: [[label, html], ...], the text already escaped; a row with none is left out. */
function v59RowsHtml(rows, cls) {
  var list = v59List(rows).filter(function (p) { return p && v59Str(p[0]) && p[1]; });
  return list.length ? '<dl class="' + (cls || 'v59-rows') + '">' + list.map(function (p) { return '<dt>' + v59Esc(v59Str(p[0])) + '</dt><dd>' + p[1] + '</dd>'; }).join('') + '</dl>' : '';
}
/* A year and what it is the year of: the year set apart, then the sentence. */
function v59Dated(o) {
  var x = v59Obj(o);
  var y = v59Str(x.year), w = v59Str(x.what);
  if (!y && !w) return '';
  return (y ? '<span class="v59-year">' + v59Esc(y) + '</span>' + (w ? ' ' : '') : '') + v59Esc(w);
}
function v59Txt(s) { return v59Esc(v59Str(s)); }

/* =========== 3. the room =========== */

/* Champagne houses, the fifth room of the house tab, last, so the first four keep their places. Once. */
(function () {
  try {
    if (typeof V48_ROOMS === 'undefined' || !Array.isArray(V48_ROOMS)) return;
    if (V48_ROOMS.some(function (room) { return room && room[0] === 'champagne'; })) return;
    V48_ROOMS.push(['champagne', v59W('tab')]);
  } catch (e) { }
})();

/* =========== 4. the views =========== */

var V59_VIEWS = {};
var V59_ARGS = {};
function v59Go(view, arg, mode) {
  if (typeof v32Go === 'function') v32Go({ view: view, arg: arg == null ? '' : String(arg) }, mode || 'push');
}
function v59HouseNow() {
  try { return (typeof v41House === 'function') ? v41House() : ((typeof v53House === 'function') ? v53House() : null); } catch (e) { return null; }
}
function v59TabWord() {
  try { if (typeof v41TabWord === 'function') { var w = v59Str(v41TabWord()); if (w) return w; } } catch (e) { }
  return v59W('tab');
}
function v59Head(title, sub) {
  if (typeof v32Head === 'function') return v32Head(title, sub);
  return '<div class="viewhead"><h2 tabindex="-1" class="v32-h">' + v59Esc(title) + '</h2>' + (sub ? '<div class="sub">' + v59Esc(sub) + '</div>' : '') + '</div>';
}
function v59Nav() { try { return (typeof v48NavHtml === 'function') ? v48NavHtml('champagne') : ''; } catch (e) { return ''; } }
/* A page of the layer, built as codex53 builds its own and wired as a room of the house tab. */
function v59Build(view, html) {
  var h = v59HouseNow();
  var after = function (box) {
    v59Wire(box, view);
    if (typeof v39Wire === 'function') { try { v39Wire(box); } catch (e) { } }
    if (typeof v32WireDetails === 'function') { try { v32WireDetails(box); } catch (e2) { } }
    if (typeof v48WireKeep === 'function') { try { v48WireKeep(box, 'champagne', h); } catch (e3) { } }
  };
  if (typeof v32Build === 'function') return v32Build(html, after);
  var box = document.createElement('div');
  box.innerHTML = html;
  after(box);
  return box;
}
/* A view of the layer: owned by the house tab, lit with it, drawn from its own argument. A def holds draw(arg),
   accept(arg) (the argument the view keeps: '' when it names nothing the device holds), parent(arg) and name(arg). */
function v59View(name, def) {
  V59_VIEWS[name] = def;
  if (typeof V32_PARENT !== 'undefined' && V32_PARENT) V32_PARENT[name] = name === 'champagne' ? 'brennans' : 'champagne';
  if (typeof V32_OWNER !== 'undefined' && V32_OWNER) V32_OWNER[name] = 'brennans';
  if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER[name] = 'brennans';
  if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB[name] = 'brennans';
  if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA[name] = 'brennans';
  if (typeof V41_REDRAW !== 'undefined' && V41_REDRAW) V41_REDRAW[name] = 1;
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS[name] = function () { return v59Build(name, def.draw(V59_ARGS[name] || '')); };
  if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO[name] = function (arg) { v59Go(name, arg); };
}

/* 4.1 the root, #/v/champagne */
function v59StudyRow(attrs, name, line, id) {
  return '<li><button class="v25row" type="button" ' + attrs + (id ? ' id="' + v59Esc(id) + '"' : '') + '><span class="v25row-name">' + v59Esc(name) + '</span>'
    + (line ? '<span class="v25row-line">' + v59Esc(line) + '</span>' : '') + '</button></li>';
}
/* What the filter reads of a house: its name, its cuvées, the sheet's words and the label's, its place, the grapes. */
function v59FindText(r) {
  var c = v59Obj(r.cuvee), s = v59Obj(r.sheet);
  return v59Fold([r.house, c.name, v59AlsoName(r), s.prints, s.label, r.place, c.blend, v59Obj(r.style).grapes].join(' '));
}
/* Whether a house holds every word typed, each the start of one of its words. */
function v59Match(r, q) {
  var words = v59Fold(q).split(' ').filter(Boolean);
  if (!words.length) return true;
  var hay = ' ' + v59FindText(r) + ' ';
  return words.every(function (w) { return hay.indexOf(' ' + w) >= 0; });
}
var V59_FIND = { q: '' };
function v59HouseRow(r) {
  var style = v59Str(v59Obj(r.table).cuvee10);
  var hidden = V59_FIND.q && !v59Match(r, V59_FIND.q);
  return '<li data-v59-row="' + v59Esc(r.key) + '"' + (hidden ? ' hidden' : '') + '><button class="v25row v59-houserow" type="button" data-go="champagne" data-arg="' + v59Esc(r.key) + '" id="v59-h-' + v59Esc(r.key) + '">'
    + '<span class="v25row-name">' + v59Esc(v59Str(r.house)) + '</span>'
    + '<span class="v25row-line v59-rowcuvee">' + v59Esc(v59CuveeLine(r)) + '</span>'
    + (style ? '<span class="v25row-line v59-rowstyle">' + v59Esc(style) + '</span>' : '') + '</button></li>';
}
function v59FindCount() {
  var all = v59Houses();
  var n = all.filter(function (r) { return v59Match(r, V59_FIND.q); }).length;
  return n ? v59W('findCount', { n: n, m: all.length }) : v59W('findNone');
}
function v59RootHtml() {
  var list = v59Houses();
  var meta = v59Meta();
  var head = '<div class="v25page v32-root v48-flow v59 v59-view v59-root" id="v59-root">' + v59Head(v59TabWord(), v59W('tab')) + v59Nav();
  if (!list.length) return head + '<p class="v32-line">' + v59Esc(v59W('noData')) + '</p></div>';
  var roster = Number(meta.roster) || list.length;
  var html = head + '<p class="v48-lead">' + v59Esc(v59W('rootLead')) + '</p>';
  if (meta.partial && roster > list.length) html += '<p class="v32-line v59-partial">' + v59Esc(v59W('partialLine', { built: list.length, roster: roster })) + '</p>';
  html += '<section class="v32-sec v59-lesson" aria-labelledby="v59-lesson-h"><h2 class="v32-h2" id="v59-lesson-h" tabindex="-1">' + v59Esc(v59W('lessonH')) + '</h2>'
    + v59P('', v59W('lesson1')) + v59P('', v59W('lesson2')) + v59P('', v59W('lesson3')) + v59P('', v59W('lesson4')) + '</section>';
  html += v59StudyRootHtml();
  html += '<section class="v32-sec v59-list" aria-labelledby="v59-houses-h"><h2 class="v32-h2" id="v59-houses-h" tabindex="-1">' + v59Esc(v59W('housesH')) + '</h2>'
    + '<p class="v32-line">' + v59Esc(v59W('housesLine')) + '</p>'
    + '<div class="v59-find" role="search"><label for="v59-find-q">' + v59Esc(v59W('findLabel')) + '</label><div class="v59-findrow">'
    + '<input type="search" id="v59-find-q" autocomplete="off" spellcheck="false" placeholder="' + v59Esc(v59W('findHint')) + '" value="' + v59Esc(V59_FIND.q) + '">'
    + '<button type="button" class="btn ghost" data-v59="findclear" id="v59-find-clear">' + v59Esc(v59W('findClear')) + '</button></div>'
    + '<p class="v59-findcount" id="v59-find-n" role="status" aria-live="polite">' + v59Esc(v59FindCount()) + '</p></div>'
    + '<ul class="v25rows v32rows v59-houses">' + list.map(v59HouseRow).join('') + '</ul></section>';
  return html + '</div>';
}
/* The filter, heard as the words are typed: the rows that hold them stay, the count says how many. */
function v59Filter(box, q) {
  V59_FIND.q = String(q == null ? '' : q);
  if (!box || typeof box.querySelectorAll !== 'function') return;
  Array.prototype.forEach.call(box.querySelectorAll('[data-v59-row]'), function (li) {
    var r = v59Rec(li.getAttribute('data-v59-row'));
    li.hidden = !!(r && V59_FIND.q && !v59Match(r, V59_FIND.q));
  });
  var n = box.querySelector('#v59-find-n');
  if (n) n.textContent = v59FindCount();
}

/* 4.2 a house, #/v/champagne/{key} */
function v59KindLine(r) {
  var k = v59Obj(r.kind);
  var code = v59Str(k.code), means = v59Str(k.means);
  if (!code && !means) return '';
  var term = code && v59Own(V59_WORDS, 'code_' + code) ? v59W('code_' + code) : '';
  return (code ? '<span class="v59-code">' + v59Esc(term ? v59W('codeLine', { code: code, term: term }) : code) + '</span>' + (means ? '. ' : '') : '') + v59Esc(means);
}
function v59TableHtml(r) {
  var t = v59Obj(r.table), c = v59Obj(r.cuvee);
  var eb = function (k) { return '<p class="v59-eyebrow">' + v59Esc(v59W(k)) + '</p>'; };
  var html = '<section class="v59-table" id="v59-t-house" aria-labelledby="v59-t-house-h"><h3 class="secgroup v59-table-h" id="v59-t-house-h">' + v59Esc(v59W('tableHouseH')) + '</h3>'
    + (v59Str(t.house45) ? eb('house45') + v59P('v59-tline', t.house45) : '')
    + (v59Str(t.house10) ? eb('house10') + v59P('v59-tshort', t.house10) : '') + '</section>';
  html += '<section class="v59-table v59-ctable" id="v59-t-cuvee" aria-labelledby="v59-t-cuvee-h"><h3 class="secgroup v59-table-h" id="v59-t-cuvee-h">' + v59Esc(v59W('tableCuveeH', { name: v59Cuvee(r) })) + '</h3>'
    + (v59Str(c.say) ? v59P('v59-tsay', v59W('saySay', { say: v59Str(c.say) })) : '')
    + (v59Str(t.cuvee45) ? eb('cuvee45') + v59P('v59-tline', t.cuvee45) : '')
    + (v59Str(t.sale) ? eb('sale') + v59P('v59-tsale', t.sale) : '')
    + (v59Str(t.cuvee10) ? eb('cuvee10') + v59P('v59-tshort', t.cuvee10) : '')
    + (v59Str(t.cuvee20) ? eb('cuvee20') + v59P('v59-tshort', t.cuvee20) : '') + '</section>';
  return html;
}
function v59CuveeBody(r) {
  var c = v59Obj(r.cuvee);
  var kind = v59Str(c.kind);
  var forms = v59List(c.forms).map(function (f) {
    var n = v59Str(f && f.name), t = v59Str(f && f.note);
    return n ? '<li><span class="v59-fname">' + v59Esc(n) + '</span>' + v59Esc(t) + '</li>' : '';
  }).join('');
  return v59P('v59-cname', c.name) + (v59Str(c.say) ? v59P('v59-csay', v59W('saySay', { say: v59Str(c.say) })) : '')
    + v59RowsHtml([
      [v59W('firstRow'), v59Dated(c.first)],
      [v59W('kindRow'), kind && v59Own(V59_WORDS, 'kind_' + kind) ? v59Esc(v59W('kind_' + kind)) : ''],
      [v59W('rhythm'), v59Txt(c.rhythm)], [v59W('blend'), v59Txt(c.blend)], [v59W('sites'), v59Txt(c.sites)],
      [v59W('making'), v59Txt(c.making)], [v59W('lees'), v59Txt(c.lees)], [v59W('bottle'), v59Txt(c.bottle)],
      [v59W('young'), v59Txt(c.young)], [v59W('aged'), v59Txt(c.aged)],
      [v59W('forms'), forms ? '<ul class="v59-forms">' + forms + '</ul>' : ''],
      [v59W('serve'), v59Txt(c.serve)]
    ], 'v59-rows v59-cuveerows');
}
function v59AlsoBody(r) {
  var a = v59Obj(r.also);
  if (!v59Str(a.name)) return '';
  return v59P('v59-cname', a.name) + (v59Str(a.say) ? v59P('v59-csay', v59W('saySay', { say: v59Str(a.say) })) : '')
    + v59RowsHtml([[v59W('firstRow'), v59Dated(a.first)]], 'v59-rows')
    + v59P('', a.note) + (v59Str(a.line) ? '<p class="v59-eyebrow">' + v59Esc(v59W('alsoLine')) + '</p>' + v59P('v59-also', a.line) : '');
}
function v59AlsoTitle(r) {
  var s = v59Str(v59Obj(r.also).standing);
  return v59Own(V59_WORDS, 'alsoH_' + s) ? v59W('alsoH_' + s) : v59W('alsoChip');
}
function v59StyleBody(r) {
  var s = v59Obj(r.style), nv = v59Obj(s.nv);
  var nvHtml = v59Str(nv.name) ? '<span class="v59-fname">' + v59Esc(v59Str(nv.name)) + '</span>' + v59Txt(nv.note) : v59Txt(nv.note);
  return v59RowsHtml([
    [v59W('styleLine'), v59Txt(s.line)], [v59W('styleGrapes'), v59Txt(s.grapes)], [v59W('reserve'), v59Txt(s.reserve)],
    [v59W('vessels'), v59Txt(s.vessels)], [v59W('malolactic'), v59Txt(s.malolactic)], [v59W('styleLees'), v59Txt(s.lees)],
    [v59W('dosage'), v59Txt(s.dosage)], [v59W('nvRow'), nvHtml]
  ], 'v59-rows v59-stylerows');
}
function v59GuestsBody(r) {
  var rows = v59List(r.guests).map(function (g) {
    var q = v59Str(g && g.q), a = v59Str(g && g.a);
    return (q && a) ? '<li><p class="v59-gq">' + v59Esc(q) + '</p><p class="v59-ga">' + v59Esc(a) + '</p></li>' : '';
  }).join('');
  return rows ? '<ul class="v59-guests">' + rows + '</ul>' : '';
}
function v59TrapsBody(r) {
  var rows = v59List(r.traps).map(function (t) { var s = v59Str(t); return s ? '<li>' + v59Esc(s) + '</li>' : ''; }).join('');
  return rows ? '<ul class="v59-traps">' + rows + '</ul>' : '';
}
function v59SheetBody(r) {
  var s = v59Obj(r.sheet);
  if (!v59Str(s.prints) && !v59Str(s.label)) return '';
  return '<div class="v59-sheet"><div><p class="v59-sheet-h">' + v59Esc(v59W('sheetPrints')) + '</p><p class="v59-sheet-t">' + v59Txt(s.prints) + '</p></div>'
    + '<div><p class="v59-sheet-h">' + v59Esc(v59W('labelPrints')) + '</p><p class="v59-sheet-t">' + v59Txt(s.label) + '</p></div></div>' + v59P('', s.note);
}
function v59Library(id) {
  try { return (typeof prodById === 'function' && id) ? prodById(String(id)) : null; } catch (e) { return null; }
}
/* The house's record in Producers and flagships: the one whose key is the plan's pick. */
function v59Flagship(r) {
  var pick = v59Str(r && r.pick);
  if (!pick) return null;
  try {
    if (typeof FLAGSHIPS === 'undefined' || !FLAGSHIPS || typeof V58_VIEWS === 'undefined' || !V58_VIEWS || !V58_VIEWS.flagship) return null;
    var hit = null;
    Object.keys(FLAGSHIPS).some(function (id) { var f = FLAGSHIPS[id]; if (f && f.key === pick && f.id === id) { hit = f; return true; } return false; });
    return hit;
  } catch (e) { return null; }
}
function v59Region() {
  try { return (typeof v39Find === 'function') ? v39Find('champagne') : null; } catch (e) { return null; }
}
function v59Door(attrs, label, id) {
  return '<button type="button" class="btn ghost" ' + attrs + (id ? ' id="' + v59Esc(id) + '"' : '') + '>' + v59Esc(label) + '</button>';
}
function v59CodexBody(r) {
  var groups = [];
  var lib = v59Library(r.producerId);
  if (lib) groups.push(['codexProducerH', v59Door('data-v59="producer" data-id="' + v59Esc(lib.id) + '"', v59Str(lib.p) || v59Str(r.house), 'v59-lib-door')]);
  var own = v59Library(r.cuveeId);
  if (own && own.id !== (lib && lib.id)) groups.push(['codexCuveeH', v59Door('data-v59="producer" data-id="' + v59Esc(own.id) + '"', v59Str(own.p) || v59Cuvee(r), 'v59-cuvee-door')]);
  var f = v59Flagship(r);
  if (f) groups.push(['codexFlagH', v59Door('data-go="flagship" data-arg="' + v59Esc(f.id) + '"', v59W('codexFlagDoor', { name: v59Str(f.producer) || v59Str(r.house) }), 'v59-flag-door')]);
  var region = v59Region();
  if (region) groups.push(['codexRegionH', v59Door('data-v39="region" data-slug="' + v59Esc(region.slug) + '"', v59Str(region.name), 'v59-region-door')]);
  groups.push(['codexTabH', v59Door('data-go="champagne" data-arg=""', v59W('rootDoor'), 'v59-root-door')]);
  return groups.map(function (x) { return '<div class="v59-cgroup"><h3 class="secgroup v32-gh">' + v59Esc(v59W(x[0])) + '</h3><div class="v59-doors">' + x[1] + '</div></div>'; }).join('');
}
function v59SourcesBody(r) {
  var rows = v59List(r.sources).map(function (s) {
    var title = v59Str(s && s.title), url = v59Str(s && s.url);
    if (!title) return '';
    return '<li>' + (/^https:\/\//i.test(url) ? '<a href="' + v59Esc(url) + '" target="_blank" rel="noopener">' + v59Esc(title) + '<span class="sr-only">' + v59Esc(v59W('opensNew')) + '</span></a>' : v59Esc(title)) + '</li>';
  }).join('');
  return rows ? '<ul class="v39-lines v39-sources v59-sources">' + rows + '</ul>' : '';
}
function v59Sec(id, title, body, cls) {
  if (!body) return '';
  return '<section class="v59-sec' + (cls ? ' ' + cls : '') + '" aria-labelledby="' + id + '"><h2 class="v32-h2 v59-sec-h" id="' + id + '" tabindex="-1">' + v59Esc(title) + '</h2>' + body + '</section>';
}
/* The page's sections in their order: [id, its chip, body, class, its heading]; a section with no body is left out
   with its chip. */
function v59Sections(r) {
  return [
    ['v59-s-cuvee', v59W('cuveeChip'), v59CuveeBody(r), 'v59-cuveesec', v59W('cuveeH')],
    ['v59-s-also', v59W('alsoChip'), v59AlsoBody(r), 'v59-alsosec', v59AlsoTitle(r)],
    ['v59-s-style', v59W('styleChip'), v59StyleBody(r), 'v59-stylesec', v59W('styleH')],
    ['v59-s-story', v59W('storyChip'), v59P('v59-story', r.story), 'v59-storysec', v59W('storyH')],
    ['v59-s-guests', v59W('guestsChip'), v59GuestsBody(r), 'v59-guestsec', v59W('guestsH')],
    ['v59-s-traps', v59W('trapsChip'), v59TrapsBody(r), 'v59-trapssec', v59W('trapsH')],
    ['v59-s-sheet', v59W('sheetChip'), v59SheetBody(r), 'v59-sheetsec', v59W('sheetH')],
    ['v59-s-list', v59W('listChip'), v59ListBody(r), 'v59-listsec', v59ListTitle()],
    ['v59-s-study', v59W('studyChip'), v59PageStudyBody(r), 'v59-studysec', v59W('studyH')],
    ['v59-s-codex', v59W('codexChip'), v59CodexBody(r), 'v59-codex', v59W('codexH')]
  ].filter(function (x) { return !!x[2]; });
}
function v59StepsHtml(prev, next) {
  var b = function (x, key, dir) {
    if (!x) return '';
    return '<button type="button" class="btn ghost v59-step v59-' + dir + '" data-go="champagne" data-arg="' + v59Esc(x.key) + '" id="v59-' + dir + '">' + v59Esc(v59W(key, { name: v59Str(x.house) })) + '</button>';
  };
  return '<nav class="v59-steps" aria-label="' + v59Esc(v59W('stepsH')) + '">' + b(prev, 'prev', 'prev')
    + '<button type="button" class="btn ghost v59-step v59-all" data-go="champagne" data-arg="" id="v59-all">' + v59Esc(v59W('allDoor')) + '</button>'
    + b(next, 'next', 'next') + '</nav>';
}
function v59PageHtml(key) {
  var r = v59Rec(key);
  if (!r) return v59RootHtml();
  var list = v59Houses();
  var at = v59At(r.key);
  var html = '<div class="v25page v32-root v48-flow v59 v59-view v59-page" data-v59-house="' + v59Esc(r.key) + '">' + v59Head(v59TabWord(), v59Str(r.house)) + v59Nav();
  html += '<h3 class="v59-name" id="v59-name" tabindex="-1">' + v59Esc(v59Str(r.house)) + '</h3>';
  html += v59RowsHtml([[v59W('sayIt'), v59Txt(r.say)], [v59W('founded'), v59Dated(r.founded)], [v59W('where'), v59Txt(r.place)], [v59W('kindH'), v59KindLine(r)]], 'v59-facts');
  html += v59TableHtml(r);
  var secs = v59Sections(r);
  html += '<nav class="v32chips v59-jumps" aria-label="' + v59Esc(v59W('sectionsNav')) + '">' + secs.map(function (s) {
    return '<button type="button" class="v28-chip" data-v53="jump" data-to="' + s[0] + '" id="' + s[0] + '-chip">' + v59Esc(s[1]) + '</button>';
  }).join('') + '</nav>';
  html += secs.map(function (s) { return v59Sec(s[0], s[4], s[2], s[3]); }).join('');
  var src = v59SourcesBody(r);
  if (src) html += '<details class="v28-q v39-sec v59-sourcesbox" id="v59-s-sources" data-v48-keep="v59-sources-' + v59Esc(r.key) + '"><summary>' + v59Esc(v59W('sourcesH')) + '</summary><div class="v39-body">' + src + '</div></details>';
  html += v59StepsHtml(at > 0 ? list[at - 1] : null, at >= 0 && at < list.length - 1 ? list[at + 1] : null);
  return html + '</div>';
}

/* The library producer page and the library's record of a cuvée, from a house's In the Codex: pushed, so Back
   returns to the house. */
function v59OpenProducer(id) {
  var rec = v59Library(id);
  if (!rec) return false;
  if (typeof v58OpenProducer === 'function') { try { return !!v58OpenProducer(rec.id); } catch (e) { return false; } }
  v59Go('producers', rec.id, 'push');
  return true;
}

v59View('champagne', {
  draw: function (arg) { return arg ? v59PageHtml(arg) : v59RootHtml(); },
  accept: function (arg) { var r = v59Rec(arg); return r ? r.key : ''; },
  name: function (arg) { var r = v59Rec(arg); return r ? v59Str(r.house) : v59W('tab'); },
  parent: function (arg) { return v59Rec(arg) ? { view: 'champagne' } : { view: 'brennans' }; }
});

/* =========== 5. on the list =========== */

/* The house's wines of a record's house, in the list's own order, each { id, producer, wine }: by codex58's own
   matching, the house's name and, where the library files the cuvée under a name of its own, that name too (Dom
   Pérignon, Rare Champagne); a wine once. The vintage is never drawn: a year in the wine's name is left out. */
function v59HouseWines(r) {
  var out = [];
  if (!r || typeof v58HouseWines !== 'function') return out;
  var asks = [{ producer: v59Str(r.house), producerId: v59Str(r.producerId) }];
  var own = v59Library(r.cuveeId);
  if (own && v59Str(own.p)) asks.push({ producer: v59Str(own.p), producerId: v59Str(own.id) });
  var seen = {};
  asks.forEach(function (a) {
    var got = [];
    try { got = v58HouseWines(a) || []; } catch (e) { got = []; }
    got.forEach(function (x) {
      if (!x || !x.id || seen[x.id]) return;
      seen[x.id] = 1;
      out.push({ id: x.id, producer: v59Str(x.producer), wine: v59Str(x.wine).replace(/\s*\b(?:1[89]|20)\d{2}\b/g, '').replace(/\s{2,}/g, ' ').trim() });
    });
  });
  return out;
}
/* The heading names the house: On {name} list where its name is a possessive, else On the list at {name}. */
function v59ListTitle() {
  var h = v59HouseNow();
  var name = v59Str(h && h.name);
  if (!name) return v59W('listH');
  return /['’]s$/i.test(name) ? v59W('listHOwn', { house: name }) : v59W('listHAt', { house: name });
}
function v59ListBody(r) {
  var list = v59HouseWines(r);
  if (!list.length) return '';
  return v59P('v59-listline', list.length === 1 ? v59W('listOne', { name: v59Str(r.house) }) : v59W('listMany', { n: list.length, name: v59Str(r.house) }))
    + '<ul class="v59-wines">' + list.map(function (x) {
      return '<li><button type="button" class="v59-wine" data-v59="wine" data-id="' + v59Esc(x.id) + '" id="v59-w-' + v59Esc(x.id) + '">'
        + '<span class="v59-wine-p">' + v59Esc(x.producer || x.wine) + '</span>'
        + ((x.producer && x.wine) ? '<span class="v59-wine-w">' + v59Esc(x.wine) + '</span>' : '') + '</button></li>';
    }).join('') + '</ul>';
}
/* A house wine's card, opened through codex58's door (the list's own card screen, pushed, so Back returns here). */
function v59OpenWine(id) {
  if (typeof v58OpenWine === 'function') { try { return !!v58OpenWine(id); } catch (e) { return false; } }
  return false;
}

/* =========== 6. study: the cards =========== */

/* 6.1 the layer's slot: per device, never exported, every touch in try. { c: the cards by id, q: the questions by
   id, p: the houses presented by key }, each a record { ef, iv, n, due } in the Codex's own steps, under the
   profile key rule. No other slot is touched. */
var V59_SLOT = 'oot-codex-champrs-v1';
function v59Key() {
  try {
    return (typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function') ? OOT.profiles.key(V59_SLOT) : V59_SLOT;
  } catch (e) { return V59_SLOT; }
}
function v59Kept() {
  var o = null;
  try {
    var s = (typeof localStorage !== 'undefined' && localStorage) ? localStorage.getItem(v59Key()) : null;
    o = s ? JSON.parse(s) : null;
  } catch (e) { o = null; }
  if (!o || typeof o !== 'object' || Array.isArray(o)) o = {};
  ['c', 'q', 'p'].forEach(function (k) { if (!o[k] || typeof o[k] !== 'object' || Array.isArray(o[k])) o[k] = {}; });
  return o;
}
function v59Keep(o) {
  try { if (typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(v59Key(), JSON.stringify(o)); } catch (e) { }
}
/* The Codex's own days and steps (codex56's pure helpers over codex3's rule), else the same arithmetic. */
function v59Today() {
  try { if (typeof v56Today === 'function') return v56Today(); } catch (e) { }
  try { if (typeof today === 'function') return today(); } catch (e2) { }
  return new Date().toISOString().slice(0, 10);
}
function v59AddDays(n) {
  try { if (typeof v56AddDays === 'function') return v56AddDays(n); } catch (e) { }
  try { if (typeof addDays === 'function') return addDays(n); } catch (e2) { }
  return new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
}
function v59Step(r, ok) {
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
  return { ef: Math.round(ef * 100) / 100, iv: iv, n: n, due: v59AddDays(iv) };
}
/* One grade kept: a card ('c'), a question ('q') or a house presented ('p'). Returns the record written. */
function v59Sched(kind, id, ok) {
  var k = (kind === 'q' || kind === 'p') ? kind : 'c';
  var key = v59Str(id);
  if (!key) return null;
  try {
    var o = v59Kept();
    o[k][key] = v59Step(o[k][key] || {}, !!ok);
    v59Keep(o);
    return o[k][key];
  } catch (e) { return null; }
}
function v59IsDue(r, day) { return !!r && typeof r.due === 'string' && !!r.due && r.due <= (day || v59Today()); }
function v59DaysTo(due) {
  var a = Date.parse(v59Today() + 'T00:00:00Z'), b = Date.parse(v59Str(due) + 'T00:00:00Z');
  return (isFinite(a) && isFinite(b) && b > a) ? Math.round((b - a) / 864e5) : 0;
}
function v59Hash(s) {
  var h = 2166136261, t = String(s);
  for (var i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = (typeof Math.imul === 'function') ? Math.imul(h, 16777619) : ((h * 16777619) | 0); }
  return h >>> 0;
}
function v59Shuffle(a) {
  var out = v59List(a).slice();
  if (typeof shuffle === 'function') { try { return shuffle(out); } catch (e) { } }
  for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
  return out;
}

/* 6.2 the cards: every record's three in the sheet's order, each { kind: 'champ', id, front, back, label (the
   house), house (the record's key), ck (the card's own kind: house, cuvee or term) }. Made once per edition. */
var V59_CARDS = { d: null, list: [], by: {}, byHouse: {} };
function v59CardBook() {
  var d = v59Data();
  if (V59_CARDS.d === d && d) return V59_CARDS;
  var out = { d: d, list: [], by: {}, byHouse: {} };
  v59Houses().forEach(function (r) {
    var mine = [];
    v59List(r.cards).forEach(function (c) {
      var id = v59Str(c && c.id), front = v59Str(c && c.front), back = v59Str(c && c.back);
      if (!id || !front || !back || v59Own(out.by, id)) return;
      var card = { kind: 'champ', id: id, front: front, back: back, label: v59Str(r.house), house: r.key, ck: v59Str(c.kind) };
      out.by[id] = card;
      out.list.push(card);
      mine.push(card);
    });
    if (mine.length) out.byHouse[r.key] = mine;
  });
  V59_CARDS = out;
  return out;
}
function v59CardsOf(key) { var b = v59CardBook(); return v59Own(b.byHouse, key) ? b.byHouse[key] : []; }
function v59MatchCards() { return v59CardBook().list.filter(function (c) { return c.ck === 'house' || c.ck === 'cuvee'; }); }
/* The order a round takes cards in: the ones sent back first, then the ones due by the older date, then the cards
   never graded in the day's own deal, then the rest by the day they come back. */
function v59StudyOrder(cards) {
  var rec = v59Kept().c, day = v59Today();
  var rows = v59List(cards).map(function (c, i) {
    var r = rec[c.id];
    var k = (!r || !r.due) ? 2 : (r.due <= day ? (Number(r.n) >= 1 ? 1 : 0) : 3);
    return { c: c, k: k, s: k === 2 ? v59Hash(day + '|' + c.id) : 0, d: (r && r.due) || '', i: i };
  });
  rows.sort(function (a, b) { return (a.k - b.k) || (a.s - b.s) || (a.d < b.d ? -1 : (a.d > b.d ? 1 : 0)) || (a.i - b.i); });
  return rows.map(function (x) { return x.c; });
}
function v59DueCards() {
  var rec = v59Kept().c, day = v59Today();
  return v59StudyOrder(v59CardBook().list.filter(function (c) { return v59IsDue(rec[c.id], day); }));
}
function v59CardTally(cards) {
  var rec = v59Kept().c, day = v59Today();
  var t = { n: 0, due: 0, learnt: 0, graded: 0 };
  v59List(cards).forEach(function (c) {
    var r = rec[c.id];
    t.n++;
    if (r) t.graded++;
    if (v59IsDue(r, day)) t.due++;
    if (r && Number(r.n) >= 1) t.learnt++;
  });
  return t;
}
function v59CardState(r, day) {
  if (!r || !r.due) return v59W('stateNew');
  if (v59IsDue(r, day)) return v59W('stateDue');
  var n = v59DaysTo(r.due);
  return n <= 1 ? v59W('stateTomorrow') : v59W('stateDays', { n: n });
}

/* 6.3 the decks, on codex32's one card screen. */
var V59_DECK_RE = /^(?:champcards|champcards:([a-z0-9-]+)|champmatch|champdue)$/;
function v59IsDeck(id) { return V59_DECK_RE.test(String(id || '')); }
function v59DeckHouse(id) {
  var m = V59_DECK_RE.exec(String(id || ''));
  var r = (m && m[1]) ? v59Rec(m[1]) : null;
  return r ? r.key : '';
}
if (typeof v32DeckDef === 'function') {
  var _v59DeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    var s = String(id || '');
    if (!v59IsDeck(s)) return _v59DeckDef.apply(this, arguments);
    var def = { id: s, name: v59W('cardsDeck'), cards: [], kind: 'champ' };
    try {
      if (s === 'champdue') { def.name = v59W('dueDeck'); def.cards = v59DueCards(); }
      else if (s === 'champcards') def.cards = v59StudyOrder(v59CardBook().list);
      else if (s === 'champmatch') { def.name = v59W('matchDeck'); def.cards = v59StudyOrder(v59MatchCards()); }
      else {
        var r = v59Rec(v59DeckHouse(s));
        if (r) { def.name = v59W('houseDeck', { name: v59Str(r.house) }); def.cards = v59CardsOf(r.key).slice(); }
      }
    } catch (e) { def.cards = []; }
    try { def.learnt = (typeof v32Learnt === 'function') ? v32Learnt(def) : 0; } catch (e2) { def.learnt = 0; }
    return def;
  };
}
if (typeof v32Learnt === 'function') {
  var _v59Learnt = v32Learnt;
  v32Learnt = function (def) {
    if (def && def.kind === 'champ') return v59CardTally(def.cards).learnt;
    return _v59Learnt.apply(this, arguments);
  };
}
/* A Champagne card graded: its due date in the layer's slot; then the grade goes on down the chain, which marks no
   other slot for a card of this kind. */
if (typeof v32Grade === 'function') {
  var _v59Grade = v32Grade;
  v32Grade = function (got) {
    try {
      var run = S._v32run;
      var c = (run && run.flip && run.deck && run.deck.length) ? run.cards[run.deck[0]] : null;
      if (c && c.kind === 'champ' && v59Own(v59CardBook().by, c.id)) v59Sched('c', c.id, !!got);
    } catch (e) { }
    return _v59Grade.apply(this, arguments);
  };
}
/* The whole deck, the matching deck and the due deck are dealt in the order above; a house's three are shuffled. */
if (typeof v32StartRun === 'function') {
  var _v59StartRun = v32StartRun;
  v32StartRun = function (deckId, opts) {
    var o = opts;
    try {
      if ((deckId === 'champcards' || deckId === 'champdue' || deckId === 'champmatch') && !(opts && opts.cards)) {
        o = {};
        Object.keys(opts || {}).forEach(function (k) { o[k] = opts[k]; });
        o.keepOrder = true;
      }
    } catch (e) { o = opts; }
    return _v59StartRun.call(this, deckId, o);
  };
}
function v59CardFaceHtml(c, run) {
  var w = function (k) { return (typeof v32W === 'function') ? v32W(k) : k; };
  var side = function (k) { return v59Esc(c.label ? v59W('cardSide', { side: w(k), name: c.label }) : w(k)); };
  if (!run || !run.flip) {
    return '<button type="button" class="card v28-front v59-fcard" data-v32="flip" id="v32-face"><span class="v28-eyebrow v28-ink">' + side('front') + '</span>'
      + '<span class="v28-fname v59-cq">' + v59Esc(c.front) + '</span></button>';
  }
  var door = (c.house && c.label && v59Rec(c.house)) ? '<p class="v59-cdoor"><button type="button" class="btn small ghost" data-go="champagne" data-arg="' + v59Esc(c.house) + '" id="v59-cdoor">' + v59Esc(v59W('cardDoor', { name: c.label })) + '</button></p>' : '';
  return '<div class="card v28-back v59-fcard" id="v32-face"><p class="v28-eyebrow v28-ink">' + side('answer') + '</p>'
    + '<h3 class="v28-bname v59-cq" tabindex="-1" id="v32-ans">' + v59Esc(c.front) + '</h3><p class="v59-ca">' + v59Esc(c.back) + '</p>' + door + '</div>';
}
if (typeof v32CardFace === 'function') {
  var _v59CardFace = v32CardFace;
  v32CardFace = function (c, run) {
    if (c && c.kind === 'champ') { try { return v59CardFaceHtml(c, run); } catch (e) { return ''; } }
    return _v59CardFace.apply(this, arguments);
  };
}
/* A deck of the layer dealt to its end: codex32's Another deck leads to the Library, which holds none of these, so
   the door reads Every house of the class sheet and opens the root. */
if (typeof v32CardHtml === 'function') {
  var _v59CardHtml = v32CardHtml;
  v32CardHtml = function () {
    var html = String(_v59CardHtml.apply(this, arguments) || '');
    try {
      var run = S._v32run;
      if (run && run.v32 && v59IsDeck(run.deckId) && !run.deck.length) {
        html = html.replace(/<button type="button" class="btn ghost" data-v32="another">[^<]*<\/button>/, '<button type="button" class="btn ghost" data-go="champagne" data-arg="" id="v59-deck-all">' + v59Esc(v59W('rootDoor')) + '</button>');
      }
    } catch (e) { }
    return html;
  };
}
function v59DeckShown() {
  try {
    if (S.view === 'deck') return String(S._v32deck || '');
    if (S.view === 'housedeck' || S.view === 'flash') { var run = S._v32run; return (run && run.v32) ? String(run.deckId || '') : ''; }
  } catch (e) { }
  return '';
}
/* Starts a deck from one of the layer's doors: a named deck straight on the card screen; with none named, the
   cards due when any are, else the whole deck's own screen with its round sizes. */
function v59StartCards(deck) {
  var id = v59Str(deck);
  if (!id) {
    if (v59DueCards().length) id = 'champdue';
    else {
      if (!v59CardBook().list.length) { if (typeof toast === 'function') toast(v59W('noCards')); return false; }
      if (typeof v32OpenDeck !== 'function') return false;
      v32OpenDeck('champcards');
      return true;
    }
  }
  if (!v59IsDeck(id) || typeof v32StartRun !== 'function') return false;
  return v32StartRun(id, { push: true });
}

/* =========== 7. study: the quiz =========== */

/* The questions as the engine reads them: a copy a question, made once per edition, its section the house's (the
   name the quiz of that house carries), its options and key as the build dealt them. */
var V59_QS = { d: null, list: [], by: {}, byHouse: {} };
function v59QBook() {
  var d = v59Data();
  if (V59_QS.d === d && d) return V59_QS;
  var out = { d: d, list: [], by: {}, byHouse: {} };
  v59Houses().forEach(function (r) {
    var mine = [];
    v59List(r.questions).forEach(function (q) {
      var id = v59Str(q && q.id), stem = v59Str(q && q.q);
      var opts = v59List(q && q.opts).map(v59Str);
      if (!id || !stem || v59Own(out.by, id)) return;
      if (opts.length < 2 || opts.some(function (x) { return !x; }) || typeof q.a !== 'number' || q.a < 0 || q.a >= opts.length || Math.floor(q.a) !== q.a) return;
      var copy = { id: id, cat: v59W('quizHouse', { name: v59Str(r.house) }), q: stem, opts: opts, a: q.a, exp: v59Str(q.exp), house: r.key };
      if (v59Str(q.tag)) copy.tag = v59Str(q.tag);
      out.by[id] = copy;
      out.list.push(copy);
      mine.push(copy);
    });
    if (mine.length) out.byHouse[r.key] = mine;
  });
  V59_QS = out;
  return out;
}
function v59QsOf(key) { var b = v59QBook(); return v59Own(b.byHouse, key) ? b.byHouse[key] : []; }
function v59MatchQs() { return v59QBook().list.filter(function (q) { return q.tag === 'match'; }); }
function v59BareKey(k) {
  var s = String(k == null ? '' : k);
  var i = s.indexOf('|');
  return i >= 0 ? s.slice(i + 1) : s;
}
/* An id of the tab: its prefix (the data's meta) and eight base36 digits; read so even for a record no longer
   shipped, so an old key is never taken for a level's. */
function v59IsQId(id) {
  var p = v59Str(v59Meta().prefix);
  return typeof id === 'string' && !!p && id.indexOf(p) === 0 && /^[0-9a-z]{8}$/.test(id.slice(p.length));
}
function v59IsQKey(k) { return typeof k === 'string' && v59IsQId(v59BareKey(k)); }
function v59QById(id) { var b = v59QBook(); return v59Own(b.by, id) ? b.by[id] : null; }
function v59QTally(qs) {
  var rec = v59Kept().q, day = v59Today();
  var t = { n: 0, due: 0, right: 0, seen: 0 };
  v59List(qs).forEach(function (q) {
    var r = rec[q.id];
    t.n++;
    if (r) t.seen++;
    if (v59IsDue(r, day)) t.due++;
    if (r && Number(r.n) >= 1) t.right++;
  });
  return t;
}
var V59_ROUND = 10;
/* A round: a house's three, shuffled; the matching questions, shuffled; every house, ten: the ones due first, then
   the ones never answered, then the rest, each kind shuffled. */
function v59QuizPool(key, tag) {
  if (key) return v59Shuffle(v59QsOf(key));
  if (tag === 'match') return v59Shuffle(v59MatchQs());
  var rec = v59Kept().q, day = v59Today();
  var due = [], fresh = [], rest = [];
  v59QBook().list.forEach(function (q) {
    var r = rec[q.id];
    if (v59IsDue(r, day)) due.push(q);
    else if (!r) fresh.push(q);
    else rest.push(q);
  });
  return v59Shuffle(due).concat(v59Shuffle(fresh), v59Shuffle(rest)).slice(0, V59_ROUND);
}
function v59QuizName(key, tag) {
  var r = key ? v59Rec(key) : null;
  if (r) return v59W('quizHouse', { name: v59Str(r.house) });
  return tag === 'match' ? v59W('quizMatch') : v59W('quizAll');
}
function v59StartQuiz(key, tag) {
  var k = v59Str(key), t = v59Str(tag) === 'match' ? 'match' : '';
  var r = k ? v59Rec(k) : null;
  if (k && !r) return false;
  var qs = v59QuizPool(r ? r.key : '', t);
  if (!qs.length) { if (typeof toast === 'function') toast(v59W('noQuestions')); return false; }
  if (typeof stopTimer === 'function') stopTimer();
  S._fin = null; S._v25lt = null;
  S.mode = 'drill';
  S.section = v59QuizName(r ? r.key : '', t);
  S._v59quiz = r ? r.key : '';
  S._again = function () { v59StartQuiz(r ? r.key : '', t); };
  S.pool = qs; S.idx = 0; S.correct = 0; S.results = [];
  if (typeof resetQ === 'function') resetQ();
  S.view = 'quiz';
  try { if (typeof V32 !== 'undefined' && V32 && !(typeof V32_RUN !== 'undefined' && V32_RUN && V32_RUN[V32.view])) V32.pend = 'push'; } catch (e) { }
  if (typeof render === 'function') render();
  return true;
}
function v59QuizShown() {
  try {
    if (S.view !== 'quiz' && S.view !== 'results') return false;
    var first = S.pool && S.pool[0];
    return !!first && v59Own(v59QBook().by, String(first.id || ''));
  } catch (e) { return false; }
}
/* codex19's report and the results screen drill a section by its name: the layer's names deal their quiz again. */
if (typeof startDrill === 'function') {
  var _v59StartDrill = startDrill;
  startDrill = function (cat) {
    try {
      var c = v59Str(cat);
      if (c && c === v59W('quizAll') && v59QBook().list.length) return v59StartQuiz('', '');
      if (c && c === v59W('quizMatch') && v59MatchQs().length) return v59StartQuiz('', 'match');
      var hit = null;
      if (c) v59Houses().some(function (r) { if (v59W('quizHouse', { name: v59Str(r.house) }) === c) { hit = r; return true; } return false; });
      if (hit && v59QsOf(hit.key).length) return v59StartQuiz(hit.key, '');
    } catch (e) { }
    return _v59StartDrill.apply(this, arguments);
  };
}
/* A key of the tab in the engine, as codex58 keeps its own: never level progress, never in codex3's rotation (its
   due date is kept in the layer's slot instead), never an orphan; the ledger finds it and tags it. */
if (typeof keyOwned === 'function') {
  var _v59KeyOwned = keyOwned;
  keyOwned = function (k) {
    if (v59IsQKey(k)) return false;
    return _v59KeyOwned.apply(this, arguments);
  };
}
if (typeof srsRecord === 'function') {
  var _v59SrsRecord = srsRecord;
  srsRecord = function (q, ok) {
    if (q && v59IsQId(q.id)) {
      try { if (v59Own(v59QBook().by, q.id)) v59Sched('q', q.id, !!ok); } catch (e) { }
      return;
    }
    return _v59SrsRecord.apply(this, arguments);
  };
}
if (typeof qidAudit === 'function') {
  var _v59QidAudit = qidAudit;
  qidAudit = function () {
    var out = _v59QidAudit.apply(this, arguments);
    try {
      var known = v59QBook().by;
      var orph = out && out.orphanedKeys;
      if (orph && typeof orph === 'object') {
        Object.keys(orph).forEach(function (name) {
          var left = v59List(orph[name]).filter(function (k) { return !v59Own(known, v59BareKey(k)); });
          if (left.length) orph[name] = left; else delete orph[name];
        });
      }
    } catch (e) { }
    return out;
  };
}
if (typeof findByKey === 'function') {
  var _v59FindByKey = findByKey;
  findByKey = function (k) {
    if (v59IsQKey(k)) { var q = v59QById(v59BareKey(k)); if (q) return q; }
    return _v59FindByKey.apply(this, arguments);
  };
}
function v59TagRows(rows) {
  return v59List(rows).map(function (x) { if (x && v59IsQKey(x.k)) x.lvl = v59W('qLevel'); return x; });
}
if (typeof graderDisputes === 'function') {
  var _v59GraderDisputes = graderDisputes;
  graderDisputes = function () { return v59TagRows(_v59GraderDisputes.apply(this, arguments)); };
}
if (typeof badReports === 'function') {
  var _v59BadReports = badReports;
  badReports = function () { return v59TagRows(_v59BadReports.apply(this, arguments)); };
}

/* =========== 8. the matching drill =========== */

/* Every name a house answers to: its cuvée and its second cuvée, the sheet's words and the label's, each part read
   whole and with its bracket left out. A wrong answer may never be one of these, read as a name or a part of one,
   or the drill would mark a true answer wrong (Krug's Grande Cuvée beside the sheet's Grand Cuvée for Ayala;
   Delamotte's Blanc de Blancs beside Salon's Le Mesnil Blanc de Blancs). */
function v59Names(r) {
  var out = [];
  var add = function (s) { var f = v59Fold(s); if (f && out.indexOf(f) < 0) out.push(f); };
  var s = v59Obj(r && r.sheet);
  [v59Cuvee(r), v59AlsoName(r)].forEach(add);
  String(v59Str(s.prints)).split('/').concat(String(v59Str(s.label)).split(/[;\/]/)).forEach(function (p) {
    add(p);
    add(String(p).replace(/\([^)]*\)/g, ' '));
  });
  return out;
}
/* Whether two names are the same name, or one holds the other word for word. */
function v59Near(a, b) {
  var x = ' ' + v59Fold(a) + ' ', y = ' ' + v59Fold(b) + ' ';
  if (x.trim() === '' || y.trim() === '') return false;
  return x === y || x.indexOf(y) >= 0 || y.indexOf(x) >= 0;
}
function v59Clash(names, text) { return names.some(function (n) { return v59Near(n, text); }); }
var V59_STOP = { de: 1, des: 1, du: 1, la: 1, le: 1, les: 1, d: 1, l: 1, et: 1, and: 1, the: 1, of: 1 };
function v59Words(s) { return v59Fold(s).split(' ').filter(function (w) { return w && !v59Own(V59_STOP, w); }); }
/* One question of the drill: the house shown and its cuvée to name (way house), or the cuvée shown and its house to
   name (way cuvee). The answer is the record's own; the wrong answers are the other houses' (their cuvées, or the
   houses), never one the shown house or cuvée also answers to; those sharing a word with the answer first, as a
   candidate would confuse them (La Grande Année, La Grande Dame, Grand Siècle), the rest dealt. */
function v59DrillDeal(key, way) {
  var r = v59Rec(key);
  if (!r) return null;
  var w = way === 'cuvee' ? 'cuvee' : 'house';
  var mine = v59Names(r);
  var answer = w === 'house' ? v59Cuvee(r) : v59Str(r.house);
  var pool = [];
  v59Houses().forEach(function (x) {
    if (x.key === r.key) return;
    var text = w === 'house' ? v59Cuvee(x) : v59Str(x.house);
    if (!text) return;
    if (w === 'house' && v59Clash(mine, text)) return;
    if (w === 'cuvee' && v59Clash(v59Names(x), v59Cuvee(r))) return;
    if (v59Near(text, answer) || pool.some(function (p) { return v59Near(p.text, text); })) return;
    var share = v59Words(text).filter(function (t) { return v59Words(answer).indexOf(t) >= 0; }).length;
    pool.push({ key: x.key, text: text, share: share, s: Math.random() });
  });
  pool.sort(function (a, b) { return (b.share - a.share) || (a.s - b.s); });
  var near = pool.filter(function (p) { return p.share > 0; }).slice(0, 2);
  var rest = v59Shuffle(pool.filter(function (p) { return near.indexOf(p) < 0; }));
  var wrong = near.concat(rest).slice(0, 3);
  var opts = v59Shuffle([{ key: r.key, text: answer }].concat(wrong.map(function (p) { return { key: p.key, text: p.text }; })));
  var a = -1;
  opts.forEach(function (o, i) { if (o.key === r.key) a = i; });
  return { key: r.key, way: w, prompt: w === 'house' ? v59Str(r.house) : v59Cuvee(r), sheet: v59Str(v59Obj(r.sheet).prints), opts: opts, a: a };
}
var V59_DRILL = { way: '', items: [], at: 0, right: 0, n: 0, picked: -1, missed: [], back: {}, done: false };
/* A round: ten questions, or one a house where fewer are written; both ways, one way chosen at random a house, or
   the way asked. A question missed comes back once at the end of the round. */
function v59DrillRound(way) {
  var w = way === 'house' || way === 'cuvee' ? way : '';
  var houses = v59Shuffle(v59Houses()).slice(0, V59_ROUND);
  var items = houses.map(function (r) { return v59DrillDeal(r.key, w || (Math.random() < 0.5 ? 'house' : 'cuvee')); }).filter(function (x) { return x && x.opts.length >= 2; });
  V59_DRILL = { way: w, items: items, at: 0, right: 0, n: items.length, picked: -1, missed: [], back: {}, done: !items.length };
  return V59_DRILL;
}
function v59DrillItem() { var d = V59_DRILL; return (d && d.items && d.at < d.items.length) ? d.items[d.at] : null; }
/* An answer picked: right is counted once, at the first try; a wrong one sends the question to the end, once. */
function v59DrillPick(i) {
  var d = V59_DRILL, it = v59DrillItem();
  if (!it || d.picked >= 0) return null;
  var n = Number(i);
  if (!(n >= 0 && n < it.opts.length)) return null;
  d.picked = n;
  var ok = n === it.a;
  if (!it.again) { if (ok) d.right++; else d.missed.push({ key: it.key, way: it.way }); }
  if (!ok && !d.back[it.key + '|' + it.way]) {
    d.back[it.key + '|' + it.way] = 1;
    var again = v59DrillDeal(it.key, it.way);
    if (again) { again.again = true; d.items.push(again); }
  }
  return ok;
}
function v59DrillNext() {
  var d = V59_DRILL;
  if (!v59DrillItem() || d.picked < 0) return false;
  d.at++; d.picked = -1;
  if (d.at >= d.items.length) d.done = true;
  return true;
}
function v59WayChips(w) {
  return '<div class="v59-ways" role="group" aria-label="' + v59Esc(v59W('wayNav')) + '">' + [['', 'wayBoth'], ['house', 'wayHouse'], ['cuvee', 'wayCuvee']].map(function (x) {
    return '<button type="button" class="v28-chip" data-v59="dway" data-way="' + x[0] + '" id="v59-way-' + (x[0] || 'both') + '" aria-pressed="' + (w === x[0] ? 'true' : 'false') + '">' + v59Esc(v59W(x[1])) + '</button>';
  }).join('') + '</div>';
}
function v59DrillHtml(arg) {
  var w = arg === 'house' || arg === 'cuvee' ? arg : '';
  if (V59_DRILL.way !== w || (!V59_DRILL.items.length && !V59_DRILL.done)) v59DrillRound(w);
  var d = V59_DRILL;
  var html = '<div class="v25page v32-root v48-flow v59 v59-view v59-drill" id="v59-drill">' + v59Head(v59TabWord(), v59W('drillRow')) + v59Nav()
    + '<p class="v48-lead">' + v59Esc(v59W('drillSub')) + '</p>' + v59WayChips(w);
  if (v59Houses().length < 2 || !d.items.length) return html + '<p class="v32-line">' + v59Esc(v59W('drillNone')) + '</p></div>';
  if (d.done) {
    var missed = d.missed.map(function (m) { var r = v59Rec(m.key); return r ? '<li><button type="button" class="btn ghost" data-go="champagne" data-arg="' + v59Esc(r.key) + '" id="v59-miss-' + v59Esc(r.key) + '-' + m.way + '">' + v59Esc(v59W('openHouse', { name: v59Str(r.house) + ': ' + v59Cuvee(r) })) + '</button></li>' : ''; }).join('');
    return html + '<p class="v32-line v59-said" id="v59-d-end" role="status" tabindex="-1">' + v59Esc(v59W('drillEnd', { r: d.right, n: d.n })) + '</p>'
      + (missed ? '<h3 class="secgroup v32-gh">' + v59Esc(v59W('drillMissed')) + '</h3><ul class="v59-missed">' + missed + '</ul>' : '')
      + '<div class="v59-after"><button type="button" class="btn gold" data-v59="dagain" id="v59-d-again">' + v59Esc(v59W('drillAgain')) + '</button>'
      + v59Door('data-go="champagne" data-arg=""', v59W('rootDoor'), 'v59-d-root') + '</div></div>';
  }
  var it = v59DrillItem();
  html += '<p class="v32-line" id="v59-d-count">' + v59Esc(v59W('drillCount', { i: Math.min(d.at + 1, d.items.length), n: d.items.length, r: d.right })) + '</p>';
  html += '<div class="v59-ask" data-v59-ask="' + v59Esc(it.key) + '" data-v59-way="' + it.way + '"><p class="v59-askh">' + v59Esc(v59W(it.way === 'house' ? 'askCuvee' : 'askHouse')) + '</p>'
    + '<h3 class="v59-askname" id="v59-d-ask" tabindex="-1">' + v59Esc(it.prompt) + '</h3>'
    + (it.way === 'cuvee' && it.sheet && v59Fold(it.sheet) !== v59Fold(it.prompt) ? v59P('v59-asksheet', v59W('sheetSays', { text: it.sheet })) : '') + '</div>';
  html += '<ul class="v59-opts" aria-label="' + v59Esc(v59W('optsLabel')) + '">' + it.opts.map(function (o, i) {
    var cls = d.picked < 0 ? '' : (i === it.a ? ' v59-right' : (i === d.picked ? ' v59-miss' : ''));
    return '<li><button type="button" class="btn ghost v59-opt' + cls + '" data-v59="dpick" data-i="' + i + '" id="v59-opt-' + i + '"' + (d.picked >= 0 ? ' disabled' : '') + '>' + v59Esc(o.text) + '</button></li>';
  }).join('') + '</ul>';
  if (d.picked >= 0) {
    var r = v59Rec(it.key);
    var ok = d.picked === it.a;
    var said = ok ? v59W('right') : v59W('wrong', { answer: it.opts[it.a].text });
    var sheet = v59Str(v59Obj(r && r.sheet).prints);
    html += '<div class="v59-said" id="v59-d-said" role="status" tabindex="-1"><p><span class="v59-verdict">' + v59Esc(said) + '</span>' + (ok || it.again ? '' : ' ' + v59Esc(v59W('againNote'))) + '</p>'
      + v59P('', v59Str(v59Obj(r && r.table).cuvee10)) + (sheet ? v59P('v59-asksheet', v59W('sheetSays', { text: sheet })) : '') + '</div>'
      + '<div class="v59-after"><button type="button" class="btn gold" data-v59="dnext" id="v59-d-next">' + v59Esc(v59W('drillNext')) + '</button>'
      + v59Door('data-go="champagne" data-arg="' + v59Esc(it.key) + '"', v59W('openHouse', { name: v59Str(r && r.house) }), 'v59-d-house') + '</div>';
  }
  return html + '</div>';
}
v59View('champdrill', {
  draw: function (arg) { return v59DrillHtml(arg); },
  accept: function (arg) { return arg === 'house' || arg === 'cuvee' ? arg : ''; },
  name: function () { return v59W('drillRow'); },
  parent: function () { return { view: 'champagne' }; }
});

/* =========== 9. present it =========== */

/* A house is named, the learner says it and its cuvée aloud, the cuvée's forty five second line and the sale are
   shown, and the learner marks it said well or not yet; the mark is a due date by the house's key, in the same
   steps as a card. */
var V59_PRESENT = { key: '', shown: false, mark: '' };
var V59_PASSED = {};
function v59Spoken() { return v59Houses().filter(function (r) { return !!v59Str(v59Obj(r.table).cuvee45); }); }
function v59PresentNext(after) {
  var rec = v59Kept().p, day = v59Today();
  var rows = v59Spoken().map(function (r, i) {
    var p = rec[r.key];
    var k = (!p || !p.due) ? 2 : (p.due <= day ? (Number(p.n) >= 1 ? 1 : 0) : 3);
    return { r: r, k: k, d: (p && p.due) || '', i: i };
  });
  rows.sort(function (a, b) { return (a.k - b.k) || (a.d < b.d ? -1 : (a.d > b.d ? 1 : 0)) || (a.i - b.i); });
  var other = rows.filter(function (x) { return x.r.key !== after; });
  var fresh = other.filter(function (x) { return !v59Own(V59_PASSED, x.r.key); });
  var hit = fresh[0] || other[0] || rows[0] || null;
  return hit ? hit.r.key : '';
}
function v59PresentTally() {
  var rec = v59Kept().p, day = v59Today(), spoken = v59Spoken();
  return {
    n: spoken.length,
    seen: spoken.filter(function (x) { return !!rec[x.key]; }).length,
    m: spoken.filter(function (x) { return !!rec[x.key] && Number(rec[x.key].n) >= 1; }).length,
    d: spoken.filter(function (x) { return v59IsDue(rec[x.key], day); }).length
  };
}
function v59PresentHtml(arg) {
  var r = v59Rec(arg);
  var html = '<div class="v25page v32-root v48-flow v59 v59-view v59-present" id="v59-present"' + (r ? ' data-present="' + v59Esc(r.key) + '"' : '') + '>'
    + v59Head(v59TabWord(), v59W('presentRow')) + v59Nav() + '<p class="v48-lead">' + v59Esc(v59W('presentSub')) + '</p>';
  var t0 = v59PresentTally();
  if (!r || !v59Str(v59Obj(r.table).cuvee45)) return html + '<p class="v32-line">' + v59Esc(v59W('presentNone')) + '</p></div>';
  var st = V59_PRESENT.key === r.key ? V59_PRESENT : { key: r.key, shown: false, mark: '' };
  var t = v59Obj(r.table);
  html += '<p class="v32-line" id="v59-p-count">' + v59Esc(t0.seen ? v59W('presentCount', t0) : v59W('presentNew', t0)) + '</p>';
  html += '<div class="card v59-pcard"><p class="v28-eyebrow v28-ink">' + v59Esc(v59W('tab')) + '</p><h3 class="v59-pname" id="v59-pname" tabindex="-1">' + v59Esc(v59Str(r.house)) + '</h3>'
    + (v59Str(r.say) ? '<p class="v59-psay">' + v59Esc(v59W('saySay', { say: v59Str(r.say) })) + '</p>' : '') + '<p class="v59-pask">' + v59Esc(v59W('presentAsk')) + '</p></div>';
  var next = v59PresentNext(r.key);
  var nextR = (next && next !== r.key) ? v59Rec(next) : null;
  if (!st.shown) {
    return html + '<div class="v59-after"><button type="button" class="btn gold" data-v59="reveal" id="v59-reveal">' + v59Esc(v59W('reveal')) + '</button>'
      + (nextR ? '<button type="button" class="btn ghost" data-v59="pnext" id="v59-pskip">' + v59Esc(v59W('skip')) + '</button>' : '') + '</div></div>';
  }
  var eb = function (k) { return '<p class="v59-eyebrow">' + v59Esc(v59W(k)) + '</p>'; };
  html += '<section class="v59-table" aria-labelledby="v59-p-h"><h3 class="secgroup v59-table-h" id="v59-p-h" tabindex="-1">' + v59Esc(v59W('tableCuveeH', { name: v59Cuvee(r) })) + '</h3>'
    + (v59Str(t.house10) ? eb('house10') + v59P('v59-tshort', t.house10) : '')
    + eb('cuvee45') + v59P('v59-tline', t.cuvee45)
    + (v59Str(t.sale) ? eb('sale') + v59P('v59-tsale', t.sale) : '') + '</section>';
  if (!st.mark) {
    return html + '<section class="v32-sec" aria-labelledby="v59-mark-h"><h3 class="secgroup v32-gh" id="v59-mark-h">' + v59Esc(v59W('markH')) + '</h3><p class="v32-line">' + v59Esc(v59W('markAsk')) + '</p>'
      + '<div class="v59-callrow"><button type="button" class="btn gold" data-v59="mark" data-ok="1" id="v59-mark-yes">' + v59Esc(v59W('said')) + '</button>'
      + '<button type="button" class="btn ghost" data-v59="mark" data-ok="0" id="v59-mark-no">' + v59Esc(v59W('notYet')) + '</button></div></section></div>';
  }
  var p = v59Kept().p[r.key];
  var days = p ? v59DaysTo(p.due) : 0;
  var marked = st.mark === 'said' ? (days <= 1 ? v59W('markedSaid') : v59W('markedSaidN', { n: days })) : v59W('markedNot');
  return html + '<p class="v32-line v59-said" id="v59-p-marked" role="status" tabindex="-1">' + v59Esc(marked) + '</p><div class="v59-after">'
    + (nextR ? '<button type="button" class="btn gold" data-v59="pnext" id="v59-pnext">' + v59Esc(v59W('presentNext', { name: v59Str(nextR.house) })) + '</button>' : '')
    + v59Door('data-go="champagne" data-arg="' + v59Esc(r.key) + '"', v59W('openHouse', { name: v59Str(r.house) }), 'v59-p-page') + '</div></div>';
}
function v59PresentKey() { var r = v59Rec(V59_ARGS.champpresent); return r ? r.key : ''; }
v59View('champpresent', {
  draw: function (arg) { return v59PresentHtml(arg); },
  accept: function (arg) {
    var r = arg ? v59Rec(arg) : null;
    var key = (r && v59Str(v59Obj(r.table).cuvee45)) ? r.key : v59PresentNext('');
    if (V59_PRESENT.key !== key) V59_PRESENT = { key: key, shown: false, mark: '' };
    return key;
  },
  name: function () { return v59W('presentRow'); },
  parent: function () { return { view: 'champagne' }; }
});

/* =========== the router: the views, the decks and the quiz, one wrapper a function =========== */

if (typeof v32Arg === 'function') {
  var _v59Arg = v32Arg;
  v32Arg = function (v) {
    if (v59Own(V59_VIEWS, v)) return String(V59_ARGS[v] || '');
    return _v59Arg.apply(this, arguments);
  };
}
if (typeof v32Apply === 'function') {
  var _v59Apply = v32Apply;
  v32Apply = function (r) {
    if (r && v59Own(V59_VIEWS, r.view)) {
      var view = r.view;
      var def = V59_VIEWS[view];
      var arg = String(r.arg || '');
      if (typeof def.accept === 'function') { try { arg = String(def.accept(arg) || ''); } catch (e) { arg = ''; } }
      V59_ARGS[view] = arg;
      S._v25area = 'brennans';
      S._v28edit = false;
      S.view = view;
      return arg ? { view: view, arg: arg } : { view: view };
    }
    return _v59Apply.apply(this, arguments);
  };
}
/* Back: a house, the drill and Present it climb to the root, the root to the Wine list; a house's deck and its run
   climb to the house, the due run and every deck's own screen to the root; a quiz of a house to the house, every
   other to the root. */
if (typeof v32ParentRoute === 'function') {
  var _v59ParentRoute = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      if (v59Own(V59_VIEWS, S.view)) {
        var def = V59_VIEWS[S.view];
        return typeof def.parent === 'function' ? def.parent(V59_ARGS[S.view] || '') : { view: 'brennans' };
      }
      var id = v59DeckShown();
      if (v59IsDeck(id)) {
        var hk = v59DeckHouse(id);
        if (hk) return { view: 'champagne', arg: hk };
        if (S.view === 'deck' || id === 'champdue') return { view: 'champagne' };
      }
      if (v59QuizShown()) {
        var qr = v59Rec(S._v59quiz);
        return qr ? { view: 'champagne', arg: qr.key } : { view: 'champagne' };
      }
    } catch (e) { }
    return _v59ParentRoute.apply(this, arguments);
  };
}
if (typeof v25NavWord === 'function') {
  var _v59NavWord = v25NavWord;
  v25NavWord = function () {
    try { if (v59Own(V59_VIEWS, S.view) || v59IsDeck(v59DeckShown()) || v59QuizShown()) return 'brennans'; } catch (e) { }
    return _v59NavWord.apply(this, arguments);
  };
}
if (typeof v25MainName === 'function') {
  var _v59MainName = v25MainName;
  v25MainName = function () {
    try { if (S && v59Own(V59_VIEWS, S.view) && typeof V59_VIEWS[S.view].name === 'function') return V59_VIEWS[S.view].name(V59_ARGS[S.view] || ''); } catch (e) { }
    return _v59MainName.apply(this, arguments);
  };
}

/* =========== the acts =========== */

function v59Redraw(focusId) {
  try { if (typeof V32 !== 'undefined' && V32) V32.pend = 'replace'; } catch (e) { }
  if (typeof render === 'function') render();
  try {
    var n = focusId && typeof document !== 'undefined' ? document.getElementById(focusId) : null;
    if (n && n.id === focusId && typeof n.focus === 'function') n.focus();
    else if (typeof v25FocusMain === 'function') v25FocusMain();
  } catch (e2) { }
}
function v59Attr(node, k) { return node && typeof node.getAttribute === 'function' ? v59Str(node.getAttribute(k)) : ''; }
/* What a control of the layer does, by its data-v59 word: extended key by key. One listener for them all. */
var V59_ACTS = {
  producer: function (node) { return v59OpenProducer(v59Attr(node, 'data-id')); },
  wine: function (node) { return v59OpenWine(v59Attr(node, 'data-id')); },
  cards: function (node) { return v59StartCards(v59Attr(node, 'data-deck')); },
  quiz: function (node) { return v59StartQuiz(v59Attr(node, 'data-key'), v59Attr(node, 'data-tag')); },
  findclear: function () {
    var box = typeof document !== 'undefined' ? document.getElementById('v59-root') : null;
    var input = typeof document !== 'undefined' ? document.getElementById('v59-find-q') : null;
    if (input && input.id === 'v59-find-q') input.value = '';
    v59Filter(box && box.id === 'v59-root' ? box : null, '');
    try { if (input && input.id === 'v59-find-q') input.focus(); } catch (e) { }
    return true;
  },
  dway: function (node) {
    var w = v59Attr(node, 'data-way');
    v59DrillRound(w);
    v59Go('champdrill', w, 'replace');
    return true;
  },
  dpick: function (node) {
    if (v59DrillPick(v59Attr(node, 'data-i')) === null) return false;
    v59Redraw('v59-d-said');
    return true;
  },
  dnext: function () {
    if (!v59DrillNext()) return false;
    v59Redraw(V59_DRILL.done ? 'v59-d-end' : 'v59-d-ask');
    return true;
  },
  dagain: function () {
    v59DrillRound(V59_DRILL.way);
    v59Redraw('v59-d-ask');
    return true;
  },
  reveal: function () {
    var key = v59PresentKey();
    if (!key) return false;
    V59_PRESENT = { key: key, shown: true, mark: '' };
    v59Redraw('v59-p-h');
    return true;
  },
  mark: function (node) {
    var key = v59PresentKey();
    if (!key || V59_PRESENT.key !== key || !V59_PRESENT.shown || V59_PRESENT.mark) return false;
    var ok = v59Attr(node, 'data-ok') === '1';
    v59Sched('p', key, ok);
    if (v59Own(V59_PASSED, key)) delete V59_PASSED[key];
    V59_PRESENT.mark = ok ? 'said' : 'not';
    v59Redraw('v59-p-marked');
    return true;
  },
  pnext: function () {
    var cur = v59PresentKey();
    if (cur && !(V59_PRESENT.key === cur && V59_PRESENT.mark)) V59_PASSED[cur] = 1;
    var waiting = v59Spoken().some(function (r) { return r.key !== cur && !v59Own(V59_PASSED, r.key); });
    if (!waiting) { V59_PASSED = {}; if (cur && !(V59_PRESENT.key === cur && V59_PRESENT.mark)) V59_PASSED[cur] = 1; }
    var next = v59PresentNext(cur);
    if (!next) return false;
    V59_PRESENT = { key: next, shown: false, mark: '' };
    v59Go('champpresent', next, 'replace');
    try { window.scrollTo(0, 0); } catch (e) { }
    return true;
  }
};
(function () {
  if (typeof document === 'undefined' || !document || typeof document.addEventListener !== 'function') return;
  document.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v59]') : null;
    if (!node || node.disabled || typeof node.getAttribute !== 'function') return;
    var act = node.getAttribute('data-v59');
    if (!v59Own(V59_ACTS, act) || typeof V59_ACTS[act] !== 'function') return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    try { if (typeof v32Remember === 'function') v32Remember(node); } catch (err) { }
    try { V59_ACTS[act](node, e); } catch (err2) { }
  });
})();
/* A tap on the row of rooms' Champagne houses button from a house page (where it is the current room, and codex48
   would read the tap as already here): the root, pushed. Returns true when the tap was the layer's. */
function v59NavTap(node) {
  try {
    if (!node || typeof node.getAttribute !== 'function' || node.getAttribute('data-v48-route') !== 'champagne') return false;
    if (S.view !== 'champagne' || !V59_ARGS.champagne) return false;
    v59Go('champagne', '', 'push');
    return true;
  } catch (e) { return false; }
}
/* A page's own wiring: the tap above, heard before codex48's, and the filter of the root. */
function v59Wire(box, view) {
  if (!box || typeof box.addEventListener !== 'function') return;
  box.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('.v48-nav-button[data-v48-route]') : null;
    if (!node || (typeof box.contains === 'function' && !box.contains(node))) return;
    if (!v59NavTap(node)) return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }, true);
  if (view !== 'champagne' || typeof box.querySelector !== 'function') return;
  var input = box.querySelector('#v59-find-q');
  if (input && input.id === 'v59-find-q' && typeof input.addEventListener === 'function') input.addEventListener('input', function () { v59Filter(box, input.value); });
}

/* =========== 10. the doors to study =========== */

function v59CountCards(n) { return v59Count(n, 'oneCard', 'nCards'); }
function v59CountQs(n) { return v59Count(n, 'oneQ', 'nQs'); }
/* The root: Study, ahead of the houses: the matching drill, the matching cards, every card with the count due
   today, the quiz on every house, the matching questions, Present it. */
function v59StudyRootHtml() {
  var cards = v59CardBook().list, qs = v59QBook().list;
  var rows = '';
  if (v59Houses().length >= 2) rows += v59StudyRow('data-go="champdrill" data-arg=""', v59W('drillRow'), v59W('drillRowLine'), 'v59-door-drill');
  var mc = v59MatchCards();
  if (mc.length) {
    var tm = v59CardTally(mc);
    var mv = { d: tm.due, cards: v59CountCards(tm.n), m: tm.learnt };
    rows += v59StudyRow('data-v59="cards" data-deck="champmatch"', v59W('matchRow'), tm.due ? v59W('matchRowDue', mv) : v59W('matchRowLine', mv), 'v59-door-match');
  }
  if (cards.length) {
    var t = v59CardTally(cards);
    var vars = { d: t.due, cards: v59CountCards(t.n), m: t.learnt };
    rows += v59StudyRow('data-v59="cards" data-deck=""', v59W('cardsRow'), t.due ? v59W('cardsRowDue', vars) : v59W('cardsRowLine', vars), 'v59-door-cards');
  }
  if (qs.length) {
    var u = v59QTally(qs);
    var qv = { d: u.due, qs: v59CountQs(u.n), r: u.right };
    rows += v59StudyRow('data-v59="quiz" data-key="" data-tag=""', v59W('quizRow'), u.due ? v59W('quizRowDue', qv) : v59W('quizRowLine', qv), 'v59-door-quiz');
  }
  var mq = v59MatchQs();
  if (mq.length) rows += v59StudyRow('data-v59="quiz" data-key="" data-tag="match"', v59W('matchQuizRow'), v59W('matchQuizLine', { qs: v59CountQs(mq.length) }), 'v59-door-mquiz');
  if (v59Spoken().length) {
    var pt = v59PresentTally();
    rows += v59StudyRow('data-go="champpresent" data-arg=""', v59W('presentRow'), pt.seen ? v59W('presentRowSaid', pt) : v59W('presentRowLine'), 'v59-door-present');
  }
  if (!rows) return '';
  return '<section class="v32-sec v59-study" aria-labelledby="v59-study-h"><h2 class="v32-h2" id="v59-study-h" tabindex="-1">' + v59Esc(v59W('studyH')) + '</h2>'
    + '<p class="v32-line">' + v59Esc(v59W('studyLine')) + '</p><ul class="v25rows v32rows v59-studyrows">' + rows + '</ul></section>';
}
/* A house: its three cards with when each is due, then its cards, its quiz, Present it and the matching drill. */
function v59PageStudyBody(r) {
  var cards = v59CardsOf(r && r.key);
  if (!cards.length) return '';
  var rec = v59Kept().c, day = v59Today();
  var t = v59CardTally(cards);
  var name = v59Str(r.house);
  var vars = { name: name, d: t.due, m: t.learnt };
  var line = !t.graded ? v59W('pageCardsNone', vars) : (t.due ? v59W('pageCardsDue', vars) : v59W('pageCardsLearnt', vars));
  var doors = v59Door('data-v59="cards" data-deck="' + v59Esc('champcards:' + r.key) + '"', v59W('pageCardsDoor', { name: name }), 'v59-pdoor-cards');
  if (v59QsOf(r.key).length) doors += v59Door('data-v59="quiz" data-key="' + v59Esc(r.key) + '" data-tag=""', v59W('pageQuizDoor', { name: name }), 'v59-pdoor-quiz');
  if (v59Str(v59Obj(r.table).cuvee45)) doors += v59Door('data-go="champpresent" data-arg="' + v59Esc(r.key) + '"', v59W('pagePresentDoor', { name: name }), 'v59-pdoor-present');
  if (v59Houses().length >= 2) doors += v59Door('data-go="champdrill" data-arg=""', v59W('pageDrillDoor'), 'v59-pdoor-drill');
  return v59P('v59-cardsline', line) + '<ul class="v59-cardlist">' + cards.map(function (c) {
    return '<li><span class="v59-cardq">' + v59Esc(c.front) + '</span><span class="v59-cardstate">' + v59Esc(v59CardState(rec[c.id], day)) + '</span></li>';
  }).join('') + '</ul><div class="v59-doors">' + doors + '</div>';
}

/* =========== 11. a door from Producers and flagships =========== */

/* A house of the class sheet whose record in Producers and flagships is the plan's pick gains, last on that page, a
   door to its page here (codex58's own registry of sections, extended by key). */
function v59ForPick(fkey) {
  var k = v59Str(fkey);
  if (!k) return null;
  var hit = null;
  v59Houses().some(function (r) { if (v59Str(r.pick) === k) { hit = r; return true; } return false; });
  return hit;
}
if (typeof V58_SECS !== 'undefined' && V58_SECS && typeof V58_SECS === 'object' && !v59Own(V58_SECS, 'champagne')) {
  V58_SECS.champagne = {
    after: 'v58-s-codex',
    make: function (f) {
      var r = v59ForPick(f && f.key);
      if (!r) return null;
      var body = '<div class="v59 v59-flagdoor">' + v59P('', v59W('flagDoorLine', { house: v59Str(r.house), cuvee: v59Cuvee(r) }))
        + '<div class="v58-doors">' + v59Door('data-go="champagne" data-arg="' + v59Esc(r.key) + '"', v59W('flagDoorOpen', { house: v59Str(r.house) }), 'v59-flag-house') + '</div></div>';
      return ['v58-s-champ', v59W('flagDoorChip'), body, 'v59-flagsec', v59W('flagDoorH')];
    }
  };
}

/* =========== the cold address =========== */

/* A reload on one of the layer's views: codex32 read the address before they were known, so it is read again here,
   once, and the first render replaces (codex39's way). This block stays last. */
(function () {
  try {
    if (typeof V32 === 'undefined' || !V32 || V32.moved || typeof v32Parse !== 'function' || typeof v32Apply !== 'function') return;
    var hash = typeof V32.initialHash === 'string' ? V32.initialHash : '';
    if (!hash && typeof location !== 'undefined' && location && typeof location.hash === 'string') hash = location.hash;
    var m = /^#\/v\/([a-z0-9]+)(\/|$)/.exec(hash);
    if (!m || !v59Own(V59_VIEWS, m[1])) return;
    var r = v32Parse(hash);
    if (!r) return;
    v32Apply(r, typeof v32CurState === 'function' ? v32CurState() : null);
    V32.pend = 'replace';
  } catch (e) { }
})();
