/* ================== CODEX LVI: THE WINE ATLAS MADE A COURSE ==================

   The Wine Atlas made a course, 2 November 2026. Loaded after codex55.js,
   before boot.js. It edits no earlier layer and no data file; every wrapper
   is typeof guarded and outermost, every registry is extended key by key,
   never replaced, and the layer declares with var and function only. Every
   string it shows lives in V56_WORDS (read by v56W); the data's own fields
   (the readings, the maps' notes) are drawn as they are written, save the
   field atlas's American spellings and its en dashes, which are put right at
   display (section 9). Its CSS lives in its own v56-style element.

   The owner asked for the Wine Atlas to be reviewed, expanded and made
   easier to learn from. Two read-only reviews found the content strong and
   the learning hard to reach: no study door on the root, a region's drill
   below thousands of words of reading, no guided order, no schedule and no
   readiness for region study, the districts and the map drawn twice, and
   about 2 MB fetched on the first visit. This layer is the flow: the
   content (the fourteen places the Court names that the atlas lacked) is
   built into the data by the regions pipeline, and this layer reads it.

   WHAT THIS LAYER OWNS:

   1. THE WORDS AND THE STYLE: V56_WORDS, v56W, and the v56-style element.

   2. THE COURSE ORDER: every region and country in the Court's order (the
      subjects of CMS in their order, each subject's map regions then its
      map countries, each once), then whatever the subjects leave out, in the
      order of the maps; Previous and Next across the whole atlas, never one
      sheet; a country page read is kept in the layer's own slot.

   3. REGION STUDY SCHEDULED: due dates for the region and district cards
      and the region questions, by codex3's own spaced repetition rule (SM-2
      lite: one day, three days, then the interval times the ease), kept in
      the slot oot-codex-regionsrs-v1 beside codex39's grades, which stay;
      the due count; Today's region cards as a deck; the questions due as a
      drill; and a region's answers feeding the CMS readiness of every
      subject whose map names the region.

   4. THE ROOT OPENS ON THE LEARNER: Start here, or Continue with the next
      unread step of the course; the study doors (Today's region cards with
      the due count, Drill a country, Map quiz, District cards, Compare two
      regions); every country with its readiness line (read, cards known,
      questions right); then codex55's sheets and full list. The root fetches
      nothing on a visit: a district count comes from the index's field
      districts when the data carries it, else from a reading already on the
      device; a search reads the rest when it is first typed.

   5. THE REGION PAGE LEADS WITH STUDY: a sticky study row under the title
      (Summary, Map, Districts, Read, Flash, Drill, Map quiz, Previous,
      Next), In one minute (a summary card drawn from the record's own
      fields), the inline map loaded only as it nears the view, The
      districts showing eight with Show all, and a district marked beside
      itself, the page never thrown to the map.

   6. NEW DRILLS FROM THE DATA: a map quiz on any field map (find the named
      place on the map; name the marked place from four), district cards (a
      district to its note and region) and compare two regions side by side,
      each with an address and a parent in the Wine Atlas, with a chooser for
      a country's drill.

   7. DUPLICATES FOLDED: the field map screen draws as the region page (a
      country map as its country page) and the field atlas index as the root,
      their addresses kept; answer links open the region page; the regions
      index draws the root's country list; the sheet view gains its study
      doors; a technique opened from the atlas lights Wine Atlas and climbs
      back to it.

   8. THE ARTICLES OFF THE MAP: a record with mapless 1 and no index takes
      its place under its country on the root and in the course order, and
      its page shows its country's sheet with a line that its field map is to
      come.

   9. THE FIELD ATLAS SHOWN CLEANLY: its American spellings and en dashes
      put right where they are drawn; the data is untouched.

  10. THE SHELL: index.html loads js/codex56.js after codex55.js and before
      boot.js; the worker is codex-v115 and lists it.
*/

/* =========== 1. the words =========== */

var V56_WORDS = {
  /* the course */
  stepOf: 'Step {k} of {n}',
  prevTo: 'Previous: {name}',
  nextTo: 'Next: {name}',
  prev: 'Previous',
  next: 'Next',
  courseNone: 'The course is not on this device yet.',
  /* region study scheduled */
  dueDeck: 'Today’s region cards',
  dueSection: 'The regions',
  nothingDue: 'Nothing is due in the regions today.',
  readyRegions: 'The regions’ questions',
  readyRegionsNote: 'The questions of the regions and countries on the subject’s map count too, answered right at any level.',
  /* the root */
  startH: 'Start here',
  startLine: 'The course follows the Court’s subjects in their order: {n} steps, from {first} to {last}.',
  startBtn: 'Begin with {name}',
  contH: 'Continue',
  contLine: 'Step {k} of {n} in the Court’s order. {read} of {n} read so far.',
  contBtn: 'Continue with {name}',
  doneH: 'The course is read',
  doneLine: 'All {n} steps are read. Today’s cards and the drills keep them fresh.',
  doneBtn: 'Read {name} again',
  pathBtn: 'See the whole course',
  studyH: 'Study',
  todayRow: 'Today’s region cards',
  dueCQ: '{c} cards and {q} questions due',
  dueC: '{c} cards due',
  dueC1: '1 card due',
  dueQ: '{q} questions due',
  dueQ1: '1 question due',
  dueC1Q: '1 card and {q} questions due',
  dueCQ1: '{c} cards and 1 question due',
  dueC1Q1: '1 card and 1 question due',
  dueNone: 'Nothing due today. New cards from {name}.',
  dueNoneAll: 'Nothing due today.',
  dueDrillRow: 'The region questions due',
  dueDrillLine: 'Answer them now, then they move on',
  drillRow: 'Drill a country',
  drillLine: 'Ten questions from one country’s regions',
  quizRow: 'Map quiz',
  quizLine: 'Find a place on a field map, or name the one marked',
  districtRow: 'District cards',
  districtLine: 'A district to its note and its region',
  compareRow: 'Compare two regions',
  compareLine: 'Climate, soils, grapes, wines, the ladder and the exam, side by side',
  countriesH: 'Countries',
  countriesLine: 'Each country with how far you have read, the cards you know and the questions you have answered right.',
  countryReady: '{r} of {n} read · {k} of {c} cards known · {q} of {t} questions right',
  countryReadyNoCards: '{r} of {n} read · {q} of {t} questions right',
  /* the whole course */
  courseH: 'The course',
  courseSub: 'The Court’s subjects in their order, then the rest of the atlas',
  courseLine: '{read} of {n} steps read. Each step opens its page; Previous and Next on every page follow this order.',
  courseRest: 'The rest of the atlas',
  stepRead: 'Step {k}, read',
  stepToRead: 'Step {k}, to read',
  stepCountry: 'Step {k}, the country, read',
  stepCountryTo: 'Step {k}, the country, to read',
  /* the region page */
  rowLabel: 'Study {name}',
  sSummary: 'Summary',
  sMap: 'Map',
  sDistricts: 'Districts',
  sRead: 'Read',
  sFlash: 'Flash',
  sDrill: 'Drill',
  sQuiz: 'Map quiz',
  minuteH: 'In one minute',
  mClimate: 'The climate',
  mGrapes: 'The main grapes',
  mLadder: 'The ladder',
  mExam: 'One exam line',
  mTrap: 'One trap',
  mWait: 'The climate, the ladder, an exam line and a trap arrive with the reading.',
  mStep: 'Step {k} of {n} in the course',
  mDue: '{line} here today',
  showAll: 'Show all {n} districts and places',
  showFew: 'Show the first eight',
  dCards: 'District cards',
  insetSaid: '{name} is marked beside it and on the map, number {n}.',
  /* the map quiz */
  quizH: 'Map quiz',
  quizSub: 'Find a place on a field map, or name the one marked',
  quizPick: 'Choose a field map. Each round asks up to eight places, half found on the map, half named.',
  quizMapLine: '{n} places',
  quizMapLast: '{n} places · last round {r} of {t}',
  quizOf: '{title}: map quiz',
  quizStep: 'Question {k} of {n} · {r} right so far',
  quizFind: 'Find {name} on the map.',
  quizFindHow: 'Tap the map at its dot, or choose the number its dot carries.',
  quizName: 'Which place is marked?',
  quizNumbers: 'Its number',
  quizNumber: 'Number {n}',
  quizAlt: 'The field map of {title}, its places numbered. Tap a dot to answer.',
  quizRight: 'Right: number {n} is {name}.',
  quizWrong: 'Not quite: you chose number {m}, {picked}. {name} is number {n}.',
  quizWrongName: 'Not quite: number {n} is {name}.',
  quizNext: 'Next question',
  quizSee: 'See the round',
  quizDone: '{r} of {n} right',
  quizDoneLine: 'The round on {title} is done.',
  quizAgain: 'Another round on {title}',
  quizOther: 'Another map',
  quizRead: 'Read {name}',
  quizNoMap: 'That field map is not on this device.',
  /* district cards */
  districtsH: 'District cards',
  districtsSub: 'A district to its note and its region',
  districtsPick: 'Choose a region. Its cards turn a district’s name into its region and what the reading says of it.',
  districtsCount: '{n} districts',
  districtsOne: '1 district',
  districtsLater: 'Its districts open with its reading',
  dDeck: '{name}: district cards',
  dPrompt: 'Its region, and what it is known for',
  dBack: '{region}: {note}',
  /* compare two regions */
  cmpH: 'Compare two regions',
  cmpSub: 'Side by side, from each reading',
  cmpA: 'The first region',
  cmpB: 'The second region',
  cmpGo: 'Compare them',
  cmpWait: 'Opening the two readings.',
  cmpFail: 'One of the readings is not on this device yet. It opens with a connection.',
  cmpSame: 'Choose two different regions.',
  cmpClimate: 'The climate',
  cmpSoils: 'The soils',
  cmpGrapes: 'The grapes',
  cmpWines: 'The wines',
  cmpLadder: 'The ladder',
  cmpExam: 'What the exam asks',
  cmpNone: 'Not in the reading',
  cmpRead: 'Read {name}',
  /* drill a country */
  drillH: 'Drill a country',
  drillSub: 'Ten questions from one country’s regions',
  drillPick: 'Choose a country. Each drill deals ten of its questions; the ones you miss come back on their due day.',
  drillCountryLine: '{t} questions · {q} answered right',
  /* the folds */
  notesH: 'The field notes',
  sheetStudyH: 'Study {name}',
  sheetFlash: 'Flash {name}',
  sheetDrill: 'Drill {name}',
  sheetQuiz: 'Map quiz',
  sheetDistricts: 'District cards',
  /* the articles off the map */
  toCome: 'field map to come',
  toComeLine: 'The field map of {name} is to come. Until it is drawn, the map of {country} shows the country it belongs to; its districts are listed below.'
};

function v56W(key, vars) {
  var v = vars || {};
  return String(Object.prototype.hasOwnProperty.call(V56_WORDS, key) ? V56_WORDS[key] : key).replace(/\{(\w+)\}/g, function (m, k) {
    return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m;
  });
}
function v56Esc(s) {
  if (typeof v32Esc === 'function') return v32Esc(s == null ? '' : String(s));
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function v56Str(s) { return typeof s === 'string' ? s.trim() : (typeof s === 'number' ? String(s) : ''); }
function v56List(x) { return Array.isArray(x) ? x : []; }
function v56Own(o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); }
function v56Fold(s) {
  if (typeof v39Fold === 'function') return v39Fold(s);
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD'); } catch (e) { }
  return t.replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
/* "one", "two and three", "one, two and three" */
function v56And(list) {
  var l = v56List(list).filter(Boolean);
  return l.length < 2 ? (l[0] || '') : l.slice(0, -1).join(', ') + ' and ' + l[l.length - 1];
}
/* The first sentence of a paragraph. */
function v56First(s) {
  var t = v56Str(s).split(/\n\s*\n/)[0] || '';
  var m = /^(.+?[.!?])(\s|$)/.exec(t);
  return m ? m[1] : t;
}
/* A line of a paragraph: its first sentence, and the next with it when the first is only a heading's length. */
function v56Line(s) {
  var t = v56Str(s).split(/\n\s*\n/)[0] || '';
  var one = v56First(t);
  if (one.length >= 60 || one.length >= t.length) return one;
  var rest = t.slice(one.length).trim();
  var two = v56First(rest);
  return two ? one + ' ' + two : one;
}
function v56Doc() { return (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') ? document : null; }

/* =========== the style =========== */

(function () {
  if (typeof document === 'undefined' || !document || typeof document.createElement !== 'function') return;
  var css = document.createElement('style');
  css.id = 'v56-style';
  css.textContent = [
    /* every control the layer draws stands at least 44px */
    '.wrap .v56 .btn,.wrap .v56 .v28-chip,.wrap .v56 .v25row{min-height:44px;box-sizing:border-box}',
    '.wrap .v56 .btn{white-space:normal;text-align:left;max-width:100%}',
    '.wrap .v56 [hidden]{display:none!important}',
    '.wrap .v56 [tabindex="-1"]:focus{outline:none}',
    '.wrap .v56 [tabindex="-1"]:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px}',
    '.wrap .v56 .v32-sec{margin-top:26px}',
    '.wrap .v56-line{font-size:16px;line-height:1.5;color:var(--parch2);margin:6px 0 0}',
    /* the root: Start here or Continue in a gold rule, the doors and the countries as codex32's rows */
    '.wrap .v56-start{padding:14px 16px 12px;border:1px solid var(--gold-soft);border-radius:3px;background:var(--house-panel,transparent)}',
    '.wrap .v56-start .v32-h2{border-bottom:0;padding-bottom:0;margin-bottom:4px}',
    '.wrap .v56-startrow{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}',
    '.wrap .v56-doors,.wrap .v56-countryrows{gap:8px}',
    '.wrap .v56-countryrows .v25row-line,.wrap .v56-doors .v25row-line{font-size:15px;line-height:1.4}',
    '@media(min-width:600px){.wrap .v56-doors,.wrap .v56-countryrows{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    /* the region page: the study row sticks under Back (its height measured at draw), one line that scrolls sideways */
    '.wrap .v56-srow{position:sticky;top:57px;z-index:29;display:flex;flex-wrap:nowrap;gap:6px;overflow-x:auto;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch;margin:10px 0 8px;padding:6px 0;background:var(--bg);border-bottom:1px solid var(--line);scrollbar-width:thin}',
    '.wrap .v56-srow .v28-chip{flex:0 0 auto;min-height:44px;padding:8px 12px;font-size:15px;white-space:nowrap;box-sizing:border-box}',
    /* In one minute: a parchment card, ink on it */
    '.wrap .v56-minute{margin:14px 0 6px;padding:14px 16px}',
    '.wrap .v56-minute .v56-minute-h{font-family:var(--house-display,Georgia,serif);font-weight:500;font-size:19px;letter-spacing:.03em;color:var(--claret);margin:0 0 8px}',
    '.wrap .v56-mdl{margin:0;display:grid;grid-template-columns:minmax(0,1fr);gap:2px 0}',
    '.wrap .v56-mdl dt{font-weight:600;color:var(--ink);font-size:15px;margin-top:8px}',
    '.wrap .v56-mdl dd{margin:0;color:var(--ink);font-size:17px;line-height:1.5}',
    '.wrap .v56-mfoot{margin:10px 0 0;font-size:15px;line-height:1.45;color:var(--ink-soft)}',
    /* the lazy map: its box drawn at the artwork's own shape before the artwork comes */
    '.wrap .v55-mapfig img[data-v56-lazy]{display:block;width:100%;height:auto;aspect-ratio:1200/1500;background:#071b14}',
    /* The districts: Show all, the district cards, and a district marked beside itself */
    '.wrap .v56-dacts{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 0}',
    '.wrap .v56-inset{position:relative;width:100%;max-width:360px;aspect-ratio:3/2;overflow:hidden;margin:10px 0 2px;border:1px solid var(--line);border-radius:3px;background:#071b14}',
    '.wrap .v56-inset img{position:absolute;left:0;top:0;max-width:none;height:auto}',
    '.wrap .v56-inset-ring{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;box-sizing:border-box;border-radius:50%;border:3px solid #f6d27a;box-shadow:0 0 0 2px #071b14,0 0 0 6px rgba(246,210,122,.42);pointer-events:none}',
    /* codex55's pressed district button in day service: the day palette's ghost ink (gold on gold) is put back to the page's own ink */
    'html[data-service] .wrap .v55 .v55-pinbtn[aria-pressed="true"]{color:var(--bg)}',
    /* the map quiz: the field map cropped to its map (the key beneath it left out), a tap answers */
    '.wrap .v56-qfig{position:relative;width:100%;max-width:650px;aspect-ratio:940/650;overflow:hidden;margin:12px 0 6px;border:1px solid var(--line);border-radius:3px;background:#071b14;cursor:crosshair;touch-action:manipulation}',
    '.wrap .v56-qfig img{position:absolute;max-width:none;height:auto;width:127.66%;left:-13.83%;top:-41.54%;pointer-events:none;user-select:none}',
    '.wrap .v56-qring{position:absolute;width:32px;height:32px;margin:-16px 0 0 -16px;box-sizing:border-box;border-radius:50%;border:3px solid #f6d27a;box-shadow:0 0 0 2px #071b14,0 0 0 7px rgba(246,210,122,.42);pointer-events:none}',
    '.wrap .v56-qring.v56-qmiss{border-color:#e8836f;box-shadow:0 0 0 2px #071b14,0 0 0 7px rgba(232,131,111,.38)}',
    '.wrap .v56-qprompt{font-size:20px;line-height:1.4;color:var(--gold-hi);margin:12px 0 2px}',
    '.wrap .v56-qnums{display:grid;grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:8px;margin:8px 0 0;padding:0;list-style:none}',
    '.wrap .v56-qnums .btn{width:100%;text-align:center;padding:8px 4px}',
    '.wrap .v56-qopts{display:grid;grid-template-columns:minmax(0,1fr);gap:8px;margin:10px 0 0;padding:0;list-style:none}',
    '.wrap .v56-qopts .btn{width:100%}',
    '.wrap .v56-qfeed{font-size:17px;line-height:1.5;color:var(--parch);margin:12px 0 4px}',
    '.wrap .v56-qnote{font-size:16px;line-height:1.5;color:var(--parch2);margin:0 0 8px}',
    '.wrap .v56-qacts{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 0}',
    /* compare: two columns of the same aspect, one under 340px */
    '.wrap .v56-cmpform{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;margin:14px 0 0;max-width:560px}',
    '.wrap .v56-cmpform label{display:block;font-size:16px;color:var(--parch);margin:0 0 4px}',
    '.wrap .v56-cmpform select{display:block;width:100%;min-height:44px;font-size:17px;box-sizing:border-box}',
    '.wrap .v56-cmprow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 14px;margin:6px 0 0}',
    '.wrap .v56-cmprow>div{min-width:0;font-size:16px;line-height:1.5;color:var(--parch);overflow-wrap:anywhere}',
    '.wrap .v56-cmprow b{display:block;color:var(--gold-hi);font-size:15px;margin:0 0 2px}',
    '.wrap .v56-cmprow ul{margin:0;padding-left:18px}',
    '@media(max-width:340px){.wrap .v56-cmprow{grid-template-columns:minmax(0,1fr)}}',
    '.wrap .v56-cmp h3{margin-top:18px}',
    /* a district card's prompt on its front */
    '.wrap .v56-dprompt{display:block;margin:10px 0 0;font-size:16px;color:var(--ink-soft)}',
    /* the sheet's study doors, in codex31's sheet */
    '.wrap .v56-sheetstudy{margin:12px 0 14px}',
    '.wrap .v56-sheetstudy h3{margin:0 0 8px}',
    '.wrap .v56-sheetstudy .v56-sdoors{display:flex;flex-wrap:wrap;gap:8px}',
    '.wrap .v56-sheetstudy .btn{min-height:44px}',
    '.wrap .v56-fieldnotes{margin:10px 0 0}',
    '.wrap .v56-inset-tag{position:absolute;left:8px;bottom:8px;max-width:calc(100% - 16px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;background:#071b14;color:#f3e9d5;border:1px solid #d5b16c;border-radius:3px;padding:0 7px;font-size:14px;line-height:24px}'
  ].join('\n');
  try { document.head.appendChild(css); } catch (e) { }
})();

/* =========== 2. the course order =========== */

/* ----- the layer's slot: per device, never exported, every touch in try -----
   { c: card schedules, q: question schedules, r: country pages read, m: map
   quiz rounds }, under codex39's profile key rule. */
var V56_SLOT = 'oot-codex-regionsrs-v1';
function v56Key() {
  try {
    return (typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function') ? OOT.profiles.key(V56_SLOT) : V56_SLOT;
  } catch (e) { return V56_SLOT; }
}
function v56Rec() {
  var o = null;
  try {
    var s = (typeof localStorage !== 'undefined' && localStorage) ? localStorage.getItem(v56Key()) : null;
    o = s ? JSON.parse(s) : null;
  } catch (e) { o = null; }
  if (!o || typeof o !== 'object' || Array.isArray(o)) o = {};
  ['c', 'q', 'r', 'm'].forEach(function (k) { if (!o[k] || typeof o[k] !== 'object' || Array.isArray(o[k])) o[k] = {}; });
  return o;
}
function v56Put(o) {
  try { if (typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(v56Key(), JSON.stringify(o)); } catch (e) { }
}

/* ----- the course ----- */

/* The atlas's countries in the order of the maps (codex55's own order). */
function v56Countries() {
  try { if (typeof v55CountryOrder === 'function') return v55CountryOrder(); } catch (e) { }
  var out = [];
  try {
    if (typeof v39Sheets === 'function') v39Sheets().forEach(function (id) { var c = v39CountryOf(id); if (c) out.push({ key: v39CountryKey(c), c: c, sheet: id, group: '' }); });
    if (typeof v39Mapless === 'function') v39Mapless().forEach(function (c) { out.push({ key: v39CountryKey(c), c: c, sheet: '', group: 'mapless' }); });
  } catch (e) { }
  return out;
}
function v56Subjects() {
  try { if (typeof v53Subjects === 'function') return v53Subjects(); } catch (e) { }
  try { return (typeof CMS !== 'undefined' && CMS && Array.isArray(CMS.subjects)) ? CMS.subjects : []; } catch (e) { return []; }
}
/* The course: each subject of the Court in its order, its map's regions then
   its map's countries, each step once; then every region and country the
   subjects leave out, country by country in the order of the maps (its
   regions, then the country), so Previous and Next reach the whole atlas.
   Rebuilt when the regions or the subjects change. */
var V56_COURSE = { src: null, cms: null, n: -1, list: [], at: {} };
function v56Course() {
  var d = (typeof v39Data === 'function') ? v39Data() : null;
  var cms = (typeof CMS !== 'undefined') ? CMS : null;
  var regions = (typeof v39Regions === 'function') ? v39Regions() : [];
  if (V56_COURSE.src === d && V56_COURSE.cms === cms && V56_COURSE.n === regions.length) return V56_COURSE.list;
  var list = [], at = {};
  var add = function (kind, key, subject) {
    var k = v56Str(key);
    if (!k) return;
    var id = kind + ':' + k;
    if (v56Own(at, id)) return;
    var rec = kind === 'region' ? v39Find(k) : v39Country(k);
    if (!rec) return;
    at[id] = list.length;
    list.push({ kind: kind, key: k, name: v56Str(rec.name) || k, subject: subject || '' });
  };
  if (d) {
    v56Subjects().forEach(function (s) {
      var map = s && s.map && typeof s.map === 'object' ? s.map : {};
      v56List(map.regions).forEach(function (k) { add('region', k, v56Str(s.id)); });
      v56List(map.countries).forEach(function (k) { add('country', k, v56Str(s.id)); });
    });
    v56Countries().forEach(function (row) {
      if (row.sheet && typeof v39SheetRegions === 'function') v39SheetRegions(row.sheet).forEach(function (a) { add('region', a.slug, ''); });
      add('country', row.key, '');
    });
    regions.forEach(function (a) { add('region', a.slug, ''); });
  }
  V56_COURSE = { src: d, cms: cms, n: regions.length, list: list, at: at };
  return list;
}
/* A step's place in the course, or -1. */
function v56At(kind, key) {
  v56Course();
  var id = kind + ':' + v56Str(key);
  return v56Own(V56_COURSE.at, id) ? V56_COURSE.at[id] : -1;
}
function v56Near(kind, key) {
  var list = v56Course();
  var i = v56At(kind, key);
  return { at: i, n: list.length, prev: i > 0 ? list[i - 1] : null, next: (i >= 0 && i + 1 < list.length) ? list[i + 1] : null };
}
/* Read: a region by codex39's own read slot, a country page by the layer's. */
function v56ReadRegions() {
  try { return (typeof v39Rec === 'function' && typeof V39_READ_BASE !== 'undefined') ? v39Rec(V39_READ_BASE) : {}; } catch (e) { return {}; }
}
function v56IsRead(item, regionsRead, rec) {
  if (!item) return false;
  if (item.kind === 'region') return !!(regionsRead || v56ReadRegions())[item.key];
  return !!(rec || v56Rec()).r[item.key];
}
function v56MarkCountry(key) {
  var k = v56Str(key);
  if (!k) return;
  var o = v56Rec();
  if (o.r[k]) return;
  o.r[k] = 1;
  v56Put(o);
}
/* How far the course is read, and its first unread step. */
function v56Progress() {
  var list = v56Course();
  var rr = v56ReadRegions(), rec = v56Rec();
  var read = 0, next = null, nextAt = -1;
  list.forEach(function (item, i) {
    if (v56IsRead(item, rr, rec)) read++;
    else if (!next) { next = item; nextAt = i; }
  });
  return { n: list.length, read: read, next: next, at: nextAt, first: list[0] || null, last: list[list.length - 1] || null };
}

/* A step of the course as a door: a region page, a country page. */
function v56CourseBtn(item, dir, cls, id) {
  if (!item) return '';
  return '<button type="button" class="' + (cls || 'btn ghost') + '" data-v56="course" data-kind="' + v56Esc(item.kind) + '" data-key="' + v56Esc(item.key) + '"'
    + (id ? ' id="' + v56Esc(id) + '"' : '') + '>' + v56Esc(v56W(dir === 'prev' ? 'prevTo' : 'nextTo', { name: item.name })) + '</button>';
}
/* Opens a step: a step to a step of the same kind is one screen moving on
   (a replace, as codex39's own Next), any other a push; the top of the page. */
function v56OpenStep(kind, key) {
  var view = kind === 'country' ? 'country' : 'region';
  if (typeof v39Open !== 'function') return;
  var same = S.view === view;
  v39Open(view, key, same ? 'replace' : 'push');
  try { if (same) window.scrollTo(0, 0); } catch (e) { }
}

/* The article's own doors: codex39's Previous and Next, bound to one sheet,
   give way to the course's, which cross the whole atlas. */
function v56ArticleShape(html, a) {
  var s = String(html || '');
  if (!a || !a.slug) return s;
  s = s.replace(/<button type="button" class="[^"]*" data-v39="(?:prev|next)" id="v39-act-(?:prev|next)"[^>]*>[^<]*<\/button>/g, '');
  var near = v56Near('region', a.slug);
  var btns = v56CourseBtn(near.prev, 'prev', 'btn ghost', 'v56-act-prev') + v56CourseBtn(near.next, 'next', 'btn ghost', 'v56-act-next');
  if (!btns) return s;
  var row = s.lastIndexOf('<div class="v28-btnrow v39-acts">');
  if (row >= 0) {
    var at = s.indexOf('<button type="button" class="btn ghost" data-v39="country" id="v39-act-country"', row);
    if (at < 0) at = s.indexOf('</div>', row);
    return s.slice(0, at) + btns + s.slice(at);
  }
  var close = s.lastIndexOf('</div>');
  return close >= 0 ? s.slice(0, close) + '<div class="v28-btnrow v39-acts">' + btns + '</div>' + s.slice(close) : s;
}
if (typeof v39ArticleHtml === 'function') {
  var _v56ArticleHtml = v39ArticleHtml;
  v39ArticleHtml = function (a) {
    var html = _v56ArticleHtml.apply(this, arguments);
    try { return v56ArticleShape(html, a); } catch (e) { return html; }
  };
}
/* The country page: the course's Previous and Next among its doors. */
function v56CountryShape(html, c) {
  var s = String(html || '');
  var key = (c && typeof v39CountryKey === 'function') ? v39CountryKey(c) : '';
  if (!key || s.indexOf('v56-act-next') >= 0 || s.indexOf('v56-act-prev') >= 0) return s;
  var near = v56Near('country', key);
  var btns = v56CourseBtn(near.prev, 'prev', 'btn ghost', 'v56-act-prev') + v56CourseBtn(near.next, 'next', 'btn ghost', 'v56-act-next');
  if (!btns) return s;
  var row = s.lastIndexOf('<div class="v28-btnrow v39-acts">');
  if (row >= 0) {
    var end = s.indexOf('</div>', row);
    return s.slice(0, end) + btns + s.slice(end);
  }
  var close = s.lastIndexOf('</div>');
  return close >= 0 ? s.slice(0, close) + '<div class="v28-btnrow v39-acts">' + btns + '</div>' + s.slice(close) : s;
}
if (typeof v39CountryHtml === 'function') {
  var _v56CountryHtml = v39CountryHtml;
  v39CountryHtml = function (c) {
    var html = _v56CountryHtml.apply(this, arguments);
    try { return v56CountryShape(html, c); } catch (e) { return html; }
  };
}
/* A country page drawn whole is a step read. */
if (typeof v39CountryView === 'function') {
  var _v56CountryView = v39CountryView;
  v39CountryView = function () {
    var view = _v56CountryView.apply(this, arguments);
    try {
      var c = (typeof v39CountryOf === 'function') ? v39CountryOf(S._v39country) : null;
      if (c && !c.bare && (typeof v39RecReady !== 'function' || v39RecReady(c))) v56MarkCountry(v39CountryKey(c));
    } catch (e) { }
    return view;
  };
}

/* ----- the layer's acts: one listener for every data-v56 control ----- */
var V56_ACTS = {};
V56_ACTS.course = function (node) { v56OpenStep(node.getAttribute('data-kind') || 'region', node.getAttribute('data-key') || ''); };
(function () {
  if (typeof document === 'undefined' || !document || typeof document.addEventListener !== 'function') return;
  document.addEventListener('click', function (e) {
    var t = e && e.target;
    var node = t && typeof t.closest === 'function' ? t.closest('[data-v56]') : null;
    if (!node || node.disabled) return;
    var act = node.getAttribute('data-v56');
    if (!v56Own(V56_ACTS, act) || typeof V56_ACTS[act] !== 'function') return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    try { if (typeof v32Remember === 'function') v32Remember(node); } catch (err) { }
    V56_ACTS[act](node, e);
  });
})();

/* =========== 3. region study scheduled =========== */

/* codex3's day helpers when they are there (the Codex's own dates), else the same arithmetic. */
function v56Today() {
  try { if (typeof today === 'function') return today(); } catch (e) { }
  return new Date().toISOString().slice(0, 10);
}
function v56AddDays(n) {
  try { if (typeof addDays === 'function') return addDays(n); } catch (e) { }
  return new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
}
/* codex3's rule, SM-2 lite, exactly as srsRecord applies it to a bank
   question: right, the count up and the interval one day, then three, then
   the last interval times the ease (the ease up a twentieth, to 2.8 at
   most); wrong, the count and the interval back to nothing and the ease down
   a fifth (to 1.3 at least), so the item is due today. */
function v56Step(r, ok) {
  var o = (r && typeof r === 'object') ? r : {};
  var ef = Number(o.ef) || 2.5, iv = Number(o.iv) || 0, n = Number(o.n) || 0;
  if (ok) {
    n++;
    iv = n === 1 ? 1 : (n === 2 ? 3 : Math.round(iv * ef));
    ef = Math.min(2.8, ef + 0.05);
  } else {
    n = 0; iv = 0; ef = Math.max(1.3, ef - 0.2);
  }
  var out = { ef: Math.round(ef * 100) / 100, iv: iv, n: n, due: v56AddDays(iv) };
  ['f', 'b', 'l', 'k'].forEach(function (k) { if (v56Own(o, k)) out[k] = o[k]; });
  return out;
}

/* The atlas's questions (every region's and country's; never a technique's),
   by id, with the key that owns each. */
var V56_QIDS = { src: null, n: -1, ids: {} };
function v56AtlasQs() {
  var d = (typeof v39Data === 'function') ? v39Data() : null;
  var regions = (typeof v39Regions === 'function') ? v39Regions() : [];
  if (V56_QIDS.src === d && V56_QIDS.n === regions.length) return V56_QIDS.ids;
  var ids = {};
  var take = function (rec, key) {
    v56List(rec && rec.questions).forEach(function (q) {
      if (q && typeof q.id === 'string' && /^r-/.test(q.id) && !v56Own(ids, q.id) && (typeof v39Valid !== 'function' || v39Valid(q))) ids[q.id] = { q: q, key: key };
    });
  };
  regions.forEach(function (a) { take(a, a.slug); });
  var cs = (typeof v39Countries === 'function') ? v39Countries() : {};
  Object.keys(cs).forEach(function (k) { if (v39Country(k)) take(cs[k], k); });
  V56_QIDS = { src: d, n: regions.length, ids: ids };
  return ids;
}
/* A card of the atlas: a region's or a country's (key/n), or a district's (d:slug/name). */
function v56CardKey(id) {
  var s = String(id || '');
  var m = /^d:([a-z0-9-]+)\//.exec(s);
  if (m) return v39Find(m[1]) ? m[1] : '';
  m = /^([a-z0-9-]+)\/\d+$/.exec(s);
  if (!m) return '';
  return (v39Find(m[1]) || v39Country(m[1])) ? m[1] : '';
}
function v56Sched(kind, id, ok, extra) {
  try {
    var o = v56Rec();
    var t = kind === 'q' ? o.q : o.c;
    var prev = t[id] || {};
    if (extra) Object.keys(extra).forEach(function (k) { prev[k] = extra[k]; });
    t[id] = v56Step(prev, !!ok);
    v56Put(o);
  } catch (e) { }
}
/* A card graded on codex32's card screen: codex39 keeps its grade, and an
   atlas card gains its due date here (a district card keeps its two faces,
   so Today's deck can deal it before its reading is on the device). */
if (typeof v32Grade === 'function') {
  var _v56Grade = v32Grade;
  v32Grade = function (got) {
    try {
      var r = S._v32run;
      var c = r && r.flip && r.deck && r.deck.length ? r.cards[r.deck[0]] : null;
      if (c && c.kind === 'region' && v56CardKey(c.id)) {
        v56Sched('c', c.id, !!got, c.district ? { f: v56Str(c.front), b: v56Str(c.back), k: v56CardKey(c.id) } : null);
      }
    } catch (e) { }
    return _v56Grade.apply(this, arguments);
  };
}
/* A region's question answered (and an answer overridden): codex39 keeps it
   out of codex3's rotation, and it gains its due date here, by the same rule. */
if (typeof srsRecord === 'function') {
  var _v56SrsRecord = srsRecord;
  srsRecord = function (q, ok) {
    try { if (q && typeof q.id === 'string' && v56Own(v56AtlasQs(), q.id)) v56Sched('q', q.id, !!ok); } catch (e) { }
    return _v56SrsRecord.apply(this, arguments);
  };
}

/* ----- what is due ----- */

/* The card a scheduled id names now: a region's or a country's from codex39's
   deck, a district's from its kept faces (or the layer's district deck). */
function v56CardById(id, rec) {
  var key = v56CardKey(id);
  if (!key) return null;
  if (/^d:/.test(id)) {
    var r = rec && rec[id];
    if (typeof v56DistrictCard === 'function') { var live = v56DistrictCard(id); if (live) return live; }
    if (r && r.f && r.b) return { id: id, kind: 'region', front: r.f, back: r.b, label: '', district: 1, slug: key };
    return null;
  }
  var cards = (typeof v39Cards === 'function') ? v39Cards(v39Find(key) || v39Country(key)) : [];
  for (var i = 0; i < cards.length; i++) if (cards[i].id === id) return cards[i];
  return null;
}
/* Due: scheduled on or before today. A key narrows it to one region or country. */
function v56Due(key) {
  var o = v56Rec(), t = v56Today();
  var ids = v56AtlasQs();
  var cards = [], qs = [];
  Object.keys(o.c).forEach(function (id) {
    var r = o.c[id];
    if (!r || !r.due || r.due > t) return;
    if (key && v56CardKey(id) !== key) return;
    var c = v56CardById(id, o.c);
    if (c) cards.push(c);
  });
  Object.keys(o.q).forEach(function (id) {
    var r = o.q[id];
    if (!r || !r.due || r.due > t || !v56Own(ids, id)) return;
    if (key && ids[id].key !== key) return;
    qs.push(ids[id].q);
  });
  return { cards: cards, qs: qs, total: cards.length + qs.length };
}

/* Today's region cards: a deck on codex32's one card screen, graded as every
   region card is (codex39's slot, and the due date here). */
var V56_DUE_DECK = 'regionsdue';
if (typeof v32DeckDef === 'function') {
  var _v56DeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    if (String(id || '') === V56_DUE_DECK) {
      var def = { id: V56_DUE_DECK, name: v56W('dueDeck'), cards: v56Due().cards, kind: 'region' };
      def.learnt = (typeof v32Learnt === 'function') ? v32Learnt(def) : 0;
      return def;
    }
    return _v56DeckDef.apply(this, arguments);
  };
}
/* The questions due: a drill through the core engine, as codex39 deals a region's. */
function v56StartDueDrill() {
  var qs = v56Due().qs;
  if (!qs.length) { if (typeof toast === 'function') toast(v56W('nothingDue')); return false; }
  if (typeof v39Shuffle === 'function') qs = v39Shuffle(qs);
  if (typeof stopTimer === 'function') stopTimer();
  S._fin = null; S._v25lt = null;
  S.mode = 'drill';
  S.section = (typeof v39W === 'function') ? v39W('drillSection') : v56W('dueSection');
  S._again = function () { v56StartDueDrill(); };
  S.pool = qs; S.idx = 0; S.correct = 0; S.results = [];
  if (typeof resetQ === 'function') resetQ();
  S.view = 'quiz';
  try { if (typeof V32 !== 'undefined' && V32 && !(typeof V32_RUN !== 'undefined' && V32_RUN && V32_RUN[V32.view])) V32.pend = 'push'; } catch (e) { }
  render();
  return true;
}
/* Today's door: the cards due, else the questions due, else the next step's own cards. */
function v56StartToday() {
  var d = v56Due();
  if (d.cards.length && typeof v32StartRun === 'function') return v32StartRun(V56_DUE_DECK, { push: true });
  if (d.qs.length) return v56StartDueDrill();
  var p = v56Progress();
  var step = p.next || p.first;
  if (step && typeof v32StartRun === 'function') return v32StartRun('region:' + step.key, { push: true });
  if (typeof toast === 'function') toast(v56W('nothingDue'));
  return false;
}
V56_ACTS.today = function () { v56StartToday(); };
V56_ACTS.duedrill = function () { v56StartDueDrill(); };

/* the layer's own views, lit Wine Atlas (filled as they are made) */
var V56_LIT = {};
/* The deck lights Wine Atlas and climbs to the root. */
if (typeof v25NavWord === 'function') {
  var _v56NavWord = v25NavWord;
  v25NavWord = function () {
    try {
      var id = '';
      if (S.view === 'deck') id = String(S._v32deck || '');
      else if (S.view === 'housedeck' || S.view === 'flash') { var run = S._v32run; id = (run && run.v32) ? String(run.deckId || '') : ''; }
      if (id && (id === V56_DUE_DECK || /^districts:/.test(id))) return 'worldmap';
      if (V56_LIT[S.view]) return 'worldmap';
      if ((S.view === 'technique' || S.view === 'techniques') && typeof v56TechFrom === 'function' && v56TechFrom()) return 'worldmap';
    } catch (e) { }
    return _v56NavWord.apply(this, arguments);
  };
}
if (typeof v32ParentRoute === 'function') {
  var _v56ParentRouteDue = v32ParentRoute;
  v32ParentRoute = function () {
    try { if (S.view === 'deck' && String(S._v32deck || '') === V56_DUE_DECK) return { view: 'worldmap', arg: '' }; } catch (e) { }
    return _v56ParentRouteDue.apply(this, arguments);
  };
}

/* ----- readiness: a region's answers count for every subject whose map names it ----- */

function v56Right(id) {
  try {
    var forms = (typeof v53KeyForms === 'function') ? v53KeyForms(id) : [id];
    return forms.some(function (k) { var r = (typeof ST !== 'undefined' && ST && ST.q) ? ST.q[k] : null; return !!(r && Number(r.c) >= 1); });
  } catch (e) { return false; }
}
function v56SubjectKeys(s) {
  var map = s && s.map && typeof s.map === 'object' ? s.map : {};
  return v56List(map.regions).concat(v56List(map.countries)).filter(function (k) { return !!(v39Find(k) || v39Country(k)); });
}
function v56SubjectRegions(s) {
  var qs = (typeof v39Questions === 'function') ? v39Questions(v56SubjectKeys(s)) : [];
  var met = 0;
  qs.forEach(function (q) { if (q && q.id && v56Right(q.id)) met++; });
  return { met: met, total: qs.length };
}
if (typeof v53Readiness === 'function') {
  var _v56Readiness = v53Readiness;
  v53Readiness = function (id) {
    var out = _v56Readiness.apply(this, arguments);
    try {
      var s = (typeof v53Subject === 'function') ? v53Subject(id) : null;
      if (!s || !out) return out;
      var r = v56SubjectRegions(s);
      out.regions = r;
      out.met += r.met;
      out.total += r.total;
      out.share = out.total ? out.met / out.total : 0;
      if (out.total) out.word = (typeof v25MetWord === 'function') ? v25MetWord(out.met, out.total) : (out.met + ' of ' + out.total);
    } catch (e) { }
    return out;
  };
}
if (typeof v53ReadyBody === 'function') {
  var _v56ReadyBody = v53ReadyBody;
  v53ReadyBody = function (s) {
    var html = _v56ReadyBody.apply(this, arguments);
    try {
      var r = (typeof v53Readiness === 'function' && s) ? v53Readiness(s.id).regions : null;
      if (!r || !r.total) return html;
      var row = '<dt>' + v56Esc(v56W('readyRegions')) + '</dt><dd>' + v56Esc(r.met + ' of ' + r.total) + '</dd>';
      var dl = html.indexOf('</dl>');
      html = dl >= 0 ? html.slice(0, dl) + row + html.slice(dl) : html + '<dl class="v39-pairs">' + row + '</dl>';
      var note = html.indexOf('<p class="v53-note">');
      var end = note >= 0 ? html.indexOf('</p>', note) : -1;
      if (end > 0) html = html.slice(0, end) + ' ' + v56Esc(v56W('readyRegionsNote')) + html.slice(end);
    } catch (e) { }
    return html;
  };
}

/* =========== 4. the root opens on the learner =========== */

/* ----- the layer's views: one registry, codex32's router extended key by key ----- */
var V56_VIEWS = {};
var V56_ARGS = {};
/* the earlier views whose addresses this layer folds, read again at load too (section 7) */
var V56_COLD = {};
function v56View(name, def) {
  V56_VIEWS[name] = def;
  V56_LIT[name] = 1;
  if (typeof V32_PARENT !== 'undefined' && V32_PARENT) V32_PARENT[name] = 'worldmap';
  if (typeof V32_OWNER !== 'undefined' && V32_OWNER) V32_OWNER[name] = 'worldmap';
  if (typeof V25_UNDER !== 'undefined' && V25_UNDER) V25_UNDER[name] = 'worldmap';
  if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB[name] = 'worldmap';
  if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA[name] = 'worldmap';
  if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS[name] = function () { return def.draw(V56_ARGS[name] || ''); };
  if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO[name] = function (arg) { v56Go(name, arg); };
}
function v56Go(view, arg, mode) {
  if (typeof v32Go === 'function') v32Go({ view: view, arg: arg == null ? '' : String(arg) }, mode || 'push');
}
function v56Build(html, after) {
  if (typeof v39Build === 'function') return v39Build(html, after);
  if (typeof v32Build === 'function') return v32Build(html, after);
  var box = document.createElement('div'); box.innerHTML = html; if (after) after(box); return box;
}
if (typeof v32Arg === 'function') {
  var _v56Arg = v32Arg;
  v32Arg = function (v) {
    if (v56Own(V56_VIEWS, v)) return String(V56_ARGS[v] || '');
    return _v56Arg.apply(this, arguments);
  };
}
if (typeof v32Apply === 'function') {
  var _v56Apply = v32Apply;
  v32Apply = function (r) {
    if (r && v56Own(V56_VIEWS, r.view)) {
      var def = V56_VIEWS[r.view];
      var arg = String(r.arg || '');
      if (typeof def.accept === 'function') { try { arg = def.accept(arg); } catch (e) { arg = ''; } }
      V56_ARGS[r.view] = arg;
      S._v25area = 'worldmap';
      S._v28edit = false;
      S.view = r.view;
      return { view: r.view, arg: arg };
    }
    return _v56Apply.apply(this, arguments);
  };
}
if (typeof v32ParentRoute === 'function') {
  var _v56ParentRouteViews = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      if (v56Own(V56_VIEWS, S.view)) {
        var def = V56_VIEWS[S.view];
        return typeof def.parent === 'function' ? def.parent(V56_ARGS[S.view] || '') : { view: 'worldmap', arg: '' };
      }
    } catch (e) { }
    return _v56ParentRouteViews.apply(this, arguments);
  };
}
if (typeof v25MainName === 'function') {
  var _v56MainName = v25MainName;
  v25MainName = function () {
    try { if (S && v56Own(V56_VIEWS, S.view) && typeof V56_VIEWS[S.view].name === 'function') return V56_VIEWS[S.view].name(V56_ARGS[S.view] || ''); } catch (e) { }
    return _v56MainName.apply(this, arguments);
  };
}

/* ----- the readiness of a country ----- */

function v56CardRec() { try { return (typeof v39CardRec === 'function') ? v39CardRec() : {}; } catch (e) { return {}; } }
/* read (its regions and its own page), cards known (codex39's got), questions right (at any level) */
function v56CountryReady(row, rr, rec, cr) {
  rr = rr || v56ReadRegions(); rec = rec || v56Rec(); cr = cr || v56CardRec();
  var key = row.key, c = row.c;
  var regions = (row.sheet && typeof v39SheetRegions === 'function') ? v39SheetRegions(row.sheet) : [];
  var read = regions.filter(function (a) { return !!rr[a.slug]; }).length + (rec.r[key] ? 1 : 0);
  var cards = row.sheet ? v39SheetCards(row.sheet) : v39Cards(c);
  var known = cards.filter(function (x) { return cr[x.id] === 'got'; }).length;
  var keys = row.sheet ? v39SheetKeys(row.sheet) : [key];
  var qs = v39Questions(keys);
  var right = qs.filter(function (q) { return q && q.id && v56Right(q.id); }).length;
  return { r: read, n: regions.length + 1, k: known, c: cards.length, q: right, t: qs.length };
}
function v56ReadyLine(x) {
  return v56W(x.c ? 'countryReady' : 'countryReadyNoCards', x);
}

/* ----- the root's own sections ----- */

function v56DueLine(d) {
  var c = d.cards.length, q = d.qs.length;
  if (c && q) return v56W(c === 1 ? (q === 1 ? 'dueC1Q1' : 'dueC1Q') : (q === 1 ? 'dueCQ1' : 'dueCQ'), { c: c, q: q });
  if (c) return c === 1 ? v56W('dueC1') : v56W('dueC', { c: c });
  if (q) return q === 1 ? v56W('dueQ1') : v56W('dueQ', { q: q });
  var p = v56Progress();
  var step = p.next || p.first;
  return step ? v56W('dueNone', { name: step.name }) : v56W('dueNoneAll');
}
function v56Row(attrs, name, line, id) {
  return '<li><button class="v25row" type="button" ' + attrs + (id ? ' id="' + v56Esc(id) + '"' : '') + '><span class="v25row-name">' + v56Esc(name) + '</span>'
    + (line ? '<span class="v25row-line">' + v56Esc(line) + '</span>' : '') + '</button></li>';
}
function v56CourseHtml() {
  var p = v56Progress();
  if (!p.n) return '';
  var head, line, btn;
  if (!p.read) {
    head = v56W('startH');
    line = v56W('startLine', { n: p.n, first: p.first.name, last: p.last.name });
    btn = '<button type="button" class="btn gold" data-v56="course" data-kind="' + v56Esc(p.first.kind) + '" data-key="' + v56Esc(p.first.key) + '" id="v56-continue">' + v56Esc(v56W('startBtn', { name: p.first.name })) + '</button>';
  } else if (p.next) {
    head = v56W('contH');
    line = v56W('contLine', { k: p.at + 1, n: p.n, read: p.read });
    btn = '<button type="button" class="btn gold" data-v56="course" data-kind="' + v56Esc(p.next.kind) + '" data-key="' + v56Esc(p.next.key) + '" id="v56-continue">' + v56Esc(v56W('contBtn', { name: p.next.name })) + '</button>';
  } else {
    head = v56W('doneH');
    line = v56W('doneLine', { n: p.n });
    btn = '<button type="button" class="btn gold" data-v56="course" data-kind="' + v56Esc(p.first.kind) + '" data-key="' + v56Esc(p.first.key) + '" id="v56-continue">' + v56Esc(v56W('doneBtn', { name: p.first.name })) + '</button>';
  }
  return '<section class="v32-sec v56 v56-start" aria-labelledby="v56-start-h"><h2 class="v32-h2" id="v56-start-h" tabindex="-1">' + v56Esc(head) + '</h2>'
    + '<p class="v32-line">' + v56Esc(line) + '</p><div class="v28-btnrow v56-startrow">' + btn
    + '<button type="button" class="btn ghost" data-go="v56course" id="v56-path">' + v56Esc(v56W('pathBtn')) + '</button></div></section>';
}
function v56StudyHtml() {
  var d = v56Due();
  var rows = v56Row('data-v56="today"', v56W('todayRow'), v56DueLine(d), 'v56-today');
  if (d.cards.length && d.qs.length) rows += v56Row('data-v56="duedrill"', v56W('dueDrillRow'), d.qs.length === 1 ? v56W('dueQ1') : v56W('dueQ', { q: d.qs.length }), 'v56-duedrill');
  rows += v56Row('data-go="v56drill"', v56W('drillRow'), v56W('drillLine'), 'v56-drill');
  rows += v56Row('data-go="v56mapquiz"', v56W('quizRow'), v56W('quizLine'), 'v56-mapquiz');
  rows += v56Row('data-go="v56districts"', v56W('districtRow'), v56W('districtLine'), 'v56-districts');
  rows += v56Row('data-go="v56compare"', v56W('compareRow'), v56W('compareLine'), 'v56-compare');
  return '<section class="v32-sec v56 v56-studydoors" aria-labelledby="v56-study-h"><h2 class="v32-h2" id="v56-study-h" tabindex="-1">' + v56Esc(v56W('studyH')) + '</h2>'
    + '<ul class="v25rows v32rows v56-doors">' + rows + '</ul></section>';
}
function v56CountriesHtml() {
  var rr = v56ReadRegions(), rec = v56Rec(), cr = v56CardRec();
  var rows = v56Countries().map(function (row) {
    var name = v56Str(row.c && row.c.name) || row.key;
    return v56Row('data-v39="country" data-key="' + v56Esc(row.key) + '"', name, v56ReadyLine(v56CountryReady(row, rr, rec, cr)), 'v56-c-' + row.key);
  }).join('');
  return '<section class="v32-sec v55-countries v56 v56-countries" aria-labelledby="v55-countries-h"><h2 class="v32-h2" id="v55-countries-h" tabindex="-1">' + v56Esc(v56W('countriesH')) + '</h2>'
    + '<p class="v32-line">' + v56Esc(v56W('countriesLine')) + '</p><ul class="v25rows v32rows v56-countryrows">' + rows + '</ul></section>';
}
/* codex55's root, opened on the learner: Start here or Continue and the
   study doors under the line; the field atlas's chip leaves (that index
   draws as this root now); codex55's country chips give way to the countries
   with their readiness; the sheets and the full list below. */
function v56HubShape(html) {
  var s = String(html || '');
  if (s.indexOf('v56-start') >= 0) return s;
  s = s.replace(/<button type="button" class="v28-chip" data-go="fieldatlas" id="v55-chip-fields">[^<]*<\/button>/, '');
  s = s.replace(/<section class="v32-sec v55-countries"[^>]*>[\s\S]*?<\/section>/, '');
  var chips = s.indexOf('<nav class="v32chips v55-chips"');
  var top = v56CourseHtml() + v56StudyHtml();
  if (chips >= 0) s = s.slice(0, chips) + top + s.slice(chips);
  var sheets = s.indexOf('<section class="v32-sec v55-sheets"');
  if (sheets >= 0) s = s.slice(0, sheets) + v56CountriesHtml() + s.slice(sheets);
  return s;
}
if (typeof v55HubHtml === 'function') {
  var _v56HubHtml = v55HubHtml;
  v55HubHtml = function () {
    var html = _v56HubHtml.apply(this, arguments);
    try { return v56HubShape(html); } catch (e) { return html; }
  };
}
/* No reading fetched on a visit: codex55's loader of every sheet waits for
   the first search, which reads the districts of every region. */
var V56_HUB = { loaded: false };
if (typeof v55HubLoad === 'function') {
  var _v56HubLoad = v55HubLoad;
  v55HubLoad = function () { };
  if (typeof v55Filter === 'function') {
    var _v56Filter = v55Filter;
    v55Filter = function (box, value) {
      var out = _v56Filter.apply(this, arguments);
      try {
        if (!V56_HUB.loaded && v56Fold(value)) { V56_HUB.loaded = true; _v56HubLoad(); }
      } catch (e) { }
      return out;
    };
  }
}
/* A district count from the index's own field when the reading is not on
   the device (the build writes it); from the reading when it is. */
if (typeof v55DistrictCount === 'function') {
  var _v56DistrictCount = v55DistrictCount;
  v55DistrictCount = function (a) {
    var n = _v56DistrictCount.apply(this, arguments);
    if (n >= 0) return n;
    return (a && typeof a.districts === 'number' && isFinite(a.districts) && a.districts >= 0) ? a.districts : -1;
  };
}

/* ----- the whole course, a page of its own ----- */

function v56CourseViewHtml() {
  var list = v56Course();
  var p = v56Progress();
  var html = '<div class="v25page v56 v56-coursepage" id="v56-course">' + v32Head(v56W('courseH'), v56W('courseSub'));
  if (!list.length) return html + '<p class="v32-line">' + v56Esc(v56W('courseNone')) + '</p></div>';
  html += '<p class="v32-line">' + v56Esc(v56W('courseLine', { read: p.read, n: p.n })) + '</p>';
  var rr = v56ReadRegions(), rec = v56Rec();
  var groups = [], by = {};
  list.forEach(function (item, i) {
    var g = item.subject || '';
    if (!v56Own(by, g)) { by[g] = []; groups.push(g); }
    by[g].push({ item: item, i: i });
  });
  var subjects = {};
  v56Subjects().forEach(function (sj) { if (sj && sj.id) subjects[sj.id] = v56Str(sj.name) || sj.id; });
  groups.forEach(function (g, gi) {
    var rows = by[g].map(function (x) {
      var read = v56IsRead(x.item, rr, rec);
      var line = x.item.kind === 'country' ? v56W(read ? 'stepCountry' : 'stepCountryTo', { k: x.i + 1 }) : v56W(read ? 'stepRead' : 'stepToRead', { k: x.i + 1 });
      return v56Row('data-v56="course" data-kind="' + v56Esc(x.item.kind) + '" data-key="' + v56Esc(x.item.key) + '"', x.item.name, line, 'v56-step-' + x.item.kind + '-' + x.item.key);
    }).join('');
    html += '<section class="v32-group" aria-labelledby="v56-cg-' + gi + '"><h3 class="secgroup v32-gh" id="v56-cg-' + gi + '">' + v56Esc(g ? (subjects[g] || g) : v56W('courseRest')) + '</h3><ul class="v25rows v32rows">' + rows + '</ul></section>';
  });
  return html + '</div>';
}
v56View('v56course', {
  draw: function () { return v56Build(v56CourseViewHtml()); },
  name: function () { return v56W('courseH'); },
  parent: function () { return { view: 'worldmap', arg: '' }; }
});

/* =========== 5. the region page leads with study =========== */

function v56Ready(rec) { try { return !rec || typeof v39RecReady !== 'function' || v39RecReady(rec); } catch (e) { return false; } }
function v56FieldMap(slug) { try { return (typeof v45Map === 'function' && slug) ? v45Map(String(slug)) : null; } catch (e) { return null; } }

/* The study row: the page's own places and the region's study, then the course. */
function v56StudyRowHtml(a, m, has) {
  var chip = function (attrs, label, id, aria) {
    return '<button type="button" class="v28-chip" ' + attrs + ' id="' + id + '"' + (aria ? ' aria-label="' + v56Esc(aria) + '"' : '') + '>' + v56Esc(label) + '</button>';
  };
  var near = v56Near('region', a.slug);
  var html = chip('data-v56="jump" data-to="v56-minute-h"', v56W('sSummary'), 'v56-s-summary');
  if (has.map) html += chip('data-v56="jump" data-to="v55-map-h"', v56W('sMap'), 'v56-s-map');
  if (has.districts) html += chip('data-v56="jump" data-to="v55-districts-h"', v56W('sDistricts'), 'v56-s-districts');
  html += chip('data-v56="jump" data-to="v56-read"', v56W('sRead'), 'v56-s-read');
  if (v56List(a.cards).length && typeof v32StartRun === 'function') html += chip('data-v39="flash" data-slug="' + v56Esc(a.slug) + '"', v56W('sFlash'), 'v56-s-flash');
  if (typeof v39Questions === 'function' && v39Questions([a.slug]).length) html += chip('data-v39="drill" data-slug="' + v56Esc(a.slug) + '"', v56W('sDrill'), 'v56-s-drill');
  if (m && v56List(m.places).length >= 4) html += chip('data-go="v56mapquiz" data-arg="' + v56Esc(m.id) + '"', v56W('sQuiz'), 'v56-s-quiz');
  if (near.prev) html += chip('data-v56="course" data-kind="' + v56Esc(near.prev.kind) + '" data-key="' + v56Esc(near.prev.key) + '"', v56W('prev'), 'v56-s-prev', v56W('prevTo', { name: near.prev.name }));
  if (near.next) html += chip('data-v56="course" data-kind="' + v56Esc(near.next.kind) + '" data-key="' + v56Esc(near.next.key) + '"', v56W('next'), 'v56-s-next', v56W('nextTo', { name: near.next.name }));
  return '<nav class="v56-srow v56" aria-label="' + v56Esc(v56W('rowLabel', { name: a.name })) + '">' + html + '</nav>';
}
/* In one minute: the record's own fields, each cut to a line. */
function v56MainGrapes(a) {
  var gs = v56List(a && a.grapes).filter(function (g) { return g && v56Str(g.name); });
  var lead = gs.filter(function (g) { return g.role === 'lead'; });
  return (lead.length ? lead : gs).slice(0, 4).map(function (g) { return v56Str(g.name); });
}
function v56Ladder(a) {
  var tiers = v56List(a && a.law && a.law.tiers).filter(function (t) { return Array.isArray(t) && v56Str(t[0]); }).map(function (t) { return v56Str(t[0]); });
  return tiers.slice(0, 5);
}
function v56MinuteHtml(a) {
  var ready = v56Ready(a);
  var rows = [];
  var t = (a && a.terroir && typeof a.terroir === 'object') ? a.terroir : {};
  if (ready && v56Str(t.climate)) rows.push(['mClimate', v56Line(t.climate)]);
  var grapes = v56MainGrapes(a);
  if (grapes.length) rows.push(['mGrapes', v56And(grapes)]);
  if (ready) {
    var ladder = v56Ladder(a);
    /* a tier's own name may hold a comma (Genérico, young), so the rungs stand apart by a point */
    if (ladder.length) rows.push(['mLadder', ladder.join(' · ')]);
    var exam = v56List(a.exam).filter(function (x) { return v56Str(x); })[0];
    if (exam) rows.push(['mExam', v56Str(exam)]);
    var trap = v56List(a.traps).filter(function (x) { return v56Str(x); })[0];
    if (trap) rows.push(['mTrap', v56Str(trap)]);
  }
  var foot = [];
  var at = v56At('region', a.slug);
  if (at >= 0) foot.push(v56W('mStep', { k: at + 1, n: v56Course().length }));
  var d = v56Due(a.slug);
  if (d.total) foot.push(v56W('mDue', { line: v56DueLine(d) }));
  return '<section class="card v56 v56-minute" aria-labelledby="v56-minute-h"><h2 class="v56-minute-h" id="v56-minute-h" tabindex="-1">' + v56Esc(v56W('minuteH')) + '</h2>'
    + (rows.length ? '<dl class="v56-mdl">' + rows.map(function (r) { return '<dt>' + v56Esc(v56W(r[0])) + '</dt><dd>' + v56Esc(r[1]) + '</dd>'; }).join('') + '</dl>' : '')
    + (ready ? '' : '<p class="v56-mfoot">' + v56Esc(v56W('mWait')) + '</p>')
    + (foot.length ? '<p class="v56-mfoot">' + v56Esc(foot.join(' · ')) + '</p>' : '') + '</section>';
}
/* The inline map waits: its artwork's address is kept aside and a blank of
   the artwork's own shape stands in, until the map nears the view. */
var V56_BLANK = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%201500%22%2F%3E';
function v56LazyShape(s) {
  var at = s.indexOf('<div class="v55-mapfig"');
  if (at < 0) return s;
  var img = s.indexOf('<img ', at);
  var end = img >= 0 ? s.indexOf('>', img) : -1;
  if (img < 0 || end < 0) return s;
  var tag = s.slice(img, end + 1);
  if (tag.indexOf(' data-v45-image') < 0) return s;
  var lazy = tag.replace(/ src="([^"]*)"/, function (m0, src) { return ' src="' + V56_BLANK + '" data-v56-src="' + src + '"'; }).replace(' data-v45-image', ' data-v56-lazy');
  return s.slice(0, img) + lazy + s.slice(end + 1);
}
function v56LazyLoad(img) {
  if (!img || typeof img.getAttribute !== 'function' || !img.hasAttribute('data-v56-lazy')) return;
  var src = img.getAttribute('data-v56-src');
  img.removeAttribute('data-v56-lazy');
  if (!src) return;
  img.setAttribute('data-v45-image', '');
  var holder = (typeof img.closest === 'function') ? img.closest('.v55-mapfig') : null;
  try {
    img.addEventListener('load', function () {
      try { if (typeof V55 !== 'undefined' && V55.pin) v55PinPlace(img.closest('.v55-page')); } catch (e) { }
    });
  } catch (e) { }
  img.setAttribute('src', src);
  if (holder && typeof v45Images === 'function') { try { v45Images(holder); } catch (e) { } }
}
function v56LazyAll(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return;
  Array.prototype.forEach.call(root.querySelectorAll('img[data-v56-lazy]'), v56LazyLoad);
}
var V56_IO = { io: null };
function v56LazyWire(box) {
  if (!box || typeof box.querySelectorAll !== 'function') return;
  var imgs = Array.prototype.slice.call(box.querySelectorAll('img[data-v56-lazy]'));
  if (!imgs.length) return;
  var Observer = (typeof IntersectionObserver === 'function') ? IntersectionObserver : null;
  if (!Observer) { imgs.forEach(v56LazyLoad); return; }
  try {
    if (V56_IO.io) V56_IO.io.disconnect();
    V56_IO.io = new Observer(function (entries, io) {
      entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); v56LazyLoad(en.target); } });
    }, { rootMargin: '200px 0px 200px 0px' });
    imgs.forEach(function (img) { V56_IO.io.observe(img); });
  } catch (e) { imgs.forEach(v56LazyLoad); }
}
/* The study row sits under Back whatever Back's height. */
function v56RowTop() {
  var d = v56Doc();
  if (!d) return;
  try {
    var back = d.querySelector('#view > .v32back');
    var h = back && back.getBoundingClientRect ? Math.round(back.getBoundingClientRect().height) : 0;
    /* one pixel more for the rule Back draws under itself once it sticks */
    Array.prototype.forEach.call(d.querySelectorAll('.v56-srow'), function (r) { if (h > 0) r.style.top = (h + (back.classList && back.classList.contains('is-stuck') ? 0 : 1)) + 'px'; });
  } catch (e) { }
}

/* The districts: the first eight, in the reading's order at every depth,
   the rest behind Show all (the places off the reading with them); the
   district cards one door away. A district is drawn as codex55 draws it. */
var V56_FEW = 8;
function v56NodeHtml(n, count) {
  var i = count.n++;
  var depth = (typeof v39DepthWord === 'function') ? v39DepthWord(n.depth) : '';
  var many = n.pins.length > 1;
  var html = '<li class="v55-d' + (i >= V56_FEW ? ' v56-more" hidden' : '"') + ' data-v55-place="' + v56Esc(n.name) + '"><div class="v55-dhead"><b class="v55-dname">' + v56Esc(n.name) + '</b>'
    + (depth ? ' <span class="v39-depth">' + v56Esc(depth) + '</span>' : '') + '</div>';
  if (n.note) html += '<p class="v55-dnote">' + v56Esc(n.note) + '</p>';
  n.pins.forEach(function (pin) { html += v55PinHtml(pin, many || v56Fold(pin.name) !== v56Fold(n.name)); });
  if (n.kids.length) html += '<ul class="v55-dlist v55-sub">' + n.kids.map(function (k) { return v56NodeHtml(k, count); }).join('') + '</ul>';
  return html + '</li>';
}
function v56DistrictsShape(html, a, m, J) {
  var s = String(html || '');
  if (!s || typeof v55NodeHtml !== 'function' || typeof v55AlsoHtml !== 'function' || typeof v55PinHtml !== 'function') return s;
  var count = { n: 0 };
  var mine = J.tree.map(function (n) { return v56NodeHtml(n, count); }).join('');
  var orig = J.tree.map(v55NodeHtml).join('');
  if (orig) s = s.replace(orig, function () { return mine; });
  var nodes = count.n;
  var also = J.also.map(v55AlsoHtml);
  var keep = Math.max(0, V56_FEW - nodes);
  var total = nodes + also.length;
  if (total > V56_FEW) {
    if (also.length) {
      var fewAlso = also.slice(0, keep).join('') + also.slice(keep).map(function (li) { return li.replace(/^<li class="v55-d v55-alsoitem"/, '<li class="v55-d v55-alsoitem v56-more" hidden'); }).join('');
      s = s.replace(also.join(''), function () { return fewAlso; });
      if (!keep && nodes) {
        s = s.replace('<h3 class="secgroup v32-gh" id="v55-also-h">', '<h3 class="secgroup v32-gh v56-more" id="v55-also-h" hidden>');
        s = s.replace(/(<h3 class="secgroup v32-gh v56-more" id="v55-also-h" hidden>[\s\S]*?<\/h3>)<p class="v32-line">/, function (m0, h) { return h + '<p class="v32-line v56-more" hidden>'; });
      }
    }
    var btn = '<div class="v28-btnrow v56-dacts v56"><button type="button" class="btn ghost" data-v56="alld" aria-expanded="false" data-n="' + total + '" id="v56-alld">' + v56Esc(v56W('showAll', { n: total })) + '</button></div>';
    var close = s.lastIndexOf('</section>');
    s = s.slice(0, close) + btn + s.slice(close);
  }
  if (a && a.slug && v56Ready(a) && typeof v56DistrictCards === 'function' && v56DistrictCards(a.slug).length) {
    var line = s.indexOf('</p>', s.indexOf('<h2 class="v32-h2" id="v55-districts-h"'));
    if (line > 0) s = s.slice(0, line + 4) + '<div class="v28-btnrow v56-dacts v56"><button type="button" class="btn ghost" data-v56="dcards" data-slug="' + v56Esc(a.slug) + '" id="v56-dcards">' + v56Esc(v56W('dCards')) + '</button></div>' + s.slice(line + 4);
  }
  return s;
}
if (typeof v55DistrictsHtml === 'function') {
  var _v56DistrictsHtml = v55DistrictsHtml;
  v55DistrictsHtml = function (a, m, J) {
    var html = _v56DistrictsHtml.apply(this, arguments);
    try { return v56DistrictsShape(html, a, m, J); } catch (e) { return html; }
  };
}
V56_ACTS.alld = function (node) {
  var sec = (typeof node.closest === 'function') ? node.closest('.v55-districts') : null;
  if (!sec) return;
  var open = node.getAttribute('aria-expanded') !== 'true';
  Array.prototype.forEach.call(sec.querySelectorAll('.v56-more'), function (n) { n.hidden = !open; });
  node.setAttribute('aria-expanded', open ? 'true' : 'false');
  node.textContent = open ? v56W('showFew') : v56W('showAll', { n: node.getAttribute('data-n') || '' });
};

/* A district marked: its point on the inline map and a close crop of the
   artwork beside the district itself, so the page stays where the reader
   is (the map is never scrolled to); a second press takes the mark off. */
var V56_INSET = { w: 360, h: 240 };
function v56InsetHtml(src, p) {
  var b = (typeof V55_BOX !== 'undefined' && V55_BOX) ? V55_BOX : { x: 153, y: 298, w: 894, h: 600 };
  var cx = Math.min(Math.max(p.x, b.x + V56_INSET.w / 2), b.x + b.w - V56_INSET.w / 2);
  var cy = Math.min(Math.max(p.y, b.y + V56_INSET.h / 2), b.y + b.h - V56_INSET.h / 2);
  var x0 = cx - V56_INSET.w / 2, y0 = cy - V56_INSET.h / 2;
  var pct = function (v) { return (Math.round(v * 1000) / 1000) + '%'; };
  /* in percentages of the inset's own box, so it holds at any width */
  return '<div class="v56-inset" aria-hidden="true"><img alt="" src="' + v56Esc(src) + '" style="width:' + pct(1200 / V56_INSET.w * 100) + ';left:' + pct(-x0 / V56_INSET.w * 100) + ';top:' + pct(-y0 / V56_INSET.h * 100) + '">'
    + '<span class="v56-inset-ring" style="left:' + pct((p.x - x0) / V56_INSET.w * 100) + ';top:' + pct((p.y - y0) / V56_INSET.h * 100) + '"></span>'
    + '<span class="v56-inset-tag">' + v56Esc(p.n + ' · ' + p.name) + '</span></div>';
}
function v56PinShow(btn) {
  var page = btn && typeof btn.closest === 'function' ? btn.closest('.v55-page') : null;
  if (!page) return;
  var again = btn.getAttribute('aria-pressed') === 'true';
  Array.prototype.forEach.call(page.querySelectorAll('[data-v55="pin"][aria-pressed="true"]'), function (b) { b.setAttribute('aria-pressed', 'false'); });
  Array.prototype.forEach.call(page.querySelectorAll('.v55-d.v55-here'), function (d) { d.classList.remove('v55-here'); });
  Array.prototype.forEach.call(page.querySelectorAll('.v56-inset'), function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
  var mark = page.querySelector('.v55-mapfig .v55-pin');
  var said = page.querySelector('#v55-pin-said');
  if (again) { V55.pin = null; if (mark) mark.hidden = true; if (said) said.textContent = ''; return; }
  var n = btn.getAttribute('data-pin') || '', name = btn.getAttribute('data-name') || '';
  btn.setAttribute('aria-pressed', 'true');
  var li = btn.closest('.v55-d');
  if (li) li.classList.add('v55-here');
  V55.pin = { n: n, name: name, x: Number(btn.getAttribute('data-x')), y: Number(btn.getAttribute('data-y')) };
  var img = page.querySelector('.v55-mapfig img');
  if (img && img.hasAttribute('data-v56-lazy')) v56LazyLoad(img);
  var placed = v55PinPlace(page);
  var src = img ? (img.getAttribute('data-v56-src') || img.getAttribute('src') || '') : '';
  var shownInset = false;
  if (src && !img.hidden && src.indexOf('data:') !== 0) {
    var row = btn.closest('.v55-pinrow');
    var holder = document.createElement('div');
    holder.innerHTML = v56InsetHtml(src, V55.pin);
    var inset = holder.firstChild;
    if (row && row.parentNode && inset) {
      row.parentNode.insertBefore(inset, row.nextSibling);
      shownInset = true;
      var pic = inset.querySelector('img');
      if (pic) pic.addEventListener('error', function () { if (inset.parentNode) inset.parentNode.removeChild(inset); if (said) said.textContent = v55W('pinGone', { n: n }); });
    }
  }
  if (said) said.textContent = (placed || shownInset) ? v56W('insetSaid', { name: name, n: n }) : v55W('pinGone', { n: n });
}
if (typeof v55PinShow === 'function') {
  var _v56PinShow = v55PinShow;
  v55PinShow = function (btn) {
    try { return v56PinShow(btn); } catch (e) { return _v56PinShow.apply(this, arguments); }
  };
}

/* A jump within the page: the place under Back and the study row, focused. */
V56_ACTS.jump = function (node) {
  var d = v56Doc();
  var to = d ? d.getElementById(node.getAttribute('data-to') || '') : null;
  if (!to) return;
  try {
    var back = d.querySelector('#view > .v32back');
    var row = d.querySelector('.v56-srow');
    var off = (back ? back.getBoundingClientRect().height : 56) + (row ? row.getBoundingClientRect().height : 52) + 10;
    var y = to.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) - off;
    window.scrollTo(0, Math.max(0, Math.round(y)));
    if (typeof to.focus === 'function') to.focus({ preventScroll: true });
  } catch (e) { }
};

/* The page: codex55's, with the study row under the title, In one minute
   after the lead, the inline map waiting for the view, and an anchor where
   the reading begins. */
function v56RegionShape(html, a) {
  var s = String(html || '');
  if (!a || s.indexOf('v56-srow') >= 0) return s;
  var m = v56FieldMap(a.slug);
  var has = { map: s.indexOf('id="v55-map-h"') >= 0, districts: s.indexOf('id="v55-districts-h"') >= 0 };
  var head = /<div class="viewhead">[\s\S]*?<\/h2>(?:<div class="sub">[\s\S]*?<\/div>)?<\/div>/.exec(s);
  var row = v56StudyRowHtml(a, m, has);
  if (head) s = s.slice(0, head.index + head[0].length) + row + s.slice(head.index + head[0].length);
  else s = s.replace(/(<div class="v25page[^>]*>)/, function (m0) { return m0 + row; });
  var minute = v56MinuteHtml(a);
  var spots = ['<section class="v55-map"', '<section class="v55-districts"', '<nav class="v39-steps"', '<div class="card v39-wait"', '<div class="card primerpage'];
  var at = -1;
  spots.forEach(function (x) { var i = s.indexOf(x); if (i >= 0 && (at < 0 || i < at)) at = i; });
  if (at >= 0) s = s.slice(0, at) + minute + s.slice(at);
  else { var lead = s.indexOf('</p>', s.indexOf('<p class="v39-lead">')); s = lead > 0 ? s.slice(0, lead + 4) + minute + s.slice(lead + 4) : s; }
  s = s.replace('<nav class="v39-steps"', '<nav class="v39-steps" id="v56-read" tabindex="-1"');
  if (s.indexOf('id="v56-read"') < 0) s = s.replace('<div class="card v39-wait" id="v39-wait"', '<div class="card v39-wait" id="v39-wait" data-v56-read="1"').replace('data-to="v56-read"', 'data-to="v39-wait"');
  return v56LazyShape(s);
}
if (typeof v55RegionHtml === 'function') {
  var _v56RegionHtml = v55RegionHtml;
  v55RegionHtml = function (a) {
    var html = _v56RegionHtml.apply(this, arguments);
    try { return v56RegionShape(html, a); } catch (e) { return html; }
  };
}
if (typeof v55PageWire === 'function') {
  var _v56PageWire = v55PageWire;
  v55PageWire = function (box) {
    var out = _v56PageWire.apply(this, arguments);
    try { v56LazyWire(box); } catch (e) { }
    try { setTimeout(v56RowTop, 0); } catch (e) { }
    return out;
  };
}
(function () {
  if (typeof window === 'undefined' || !window || typeof window.addEventListener !== 'function') return;
  window.addEventListener('resize', function () { try { v56RowTop(); } catch (e) { } });
})();

/* The country page: its techniques under its map and reading, never above
   the map (codex46 adds its box after the head only where a page has none). */
function v56CountryPageShape(html, c) {
  var s = String(html || '');
  var key = (c && typeof v39CountryKey === 'function') ? v39CountryKey(c) : '';
  if (!key || s.indexOf('v46-links') >= 0 || typeof v46DoorHtml !== 'function') return s;
  var box = '';
  try { box = v46DoorHtml(key); } catch (e) { box = ''; }
  if (!box) return s;
  var acts = s.lastIndexOf('<div class="v28-btnrow v39-acts">');
  return acts >= 0 ? s.slice(0, acts) + box + s.slice(acts) : s.replace(/<\/div>$/, function () { return box + '</div>'; });
}
if (typeof v55CountryHtml === 'function') {
  var _v56CountryPage = v55CountryHtml;
  v55CountryHtml = function (c) {
    var html = _v56CountryPage.apply(this, arguments);
    try { return v56CountryPageShape(html, c); } catch (e) { return html; }
  };
}

/* =========== 6. new drills from the data =========== */

function v56Shuffle(a) {
  if (typeof v39Shuffle === 'function') return v39Shuffle(a.slice());
  var out = a.slice();
  for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
  return out;
}
function v56Maps() { try { return (typeof v45Maps === 'function') ? v45Maps() : []; } catch (e) { return []; } }
function v56MapName(m) {
  if (!m) return '';
  if (m.type === 'region') { var a = v39Find(m.slug || m.id); if (a) return v56Str(a.name); }
  return v56Str(m.title);
}
/* The map's own parent: its region, else its country. */
function v56MapHome(m) {
  if (!m) return { view: 'worldmap', arg: '' };
  if (m.type === 'region' && v39Find(m.slug || m.id)) return { view: 'region', arg: m.slug || m.id };
  if (m.countryKey && v39Country(m.countryKey)) return { view: 'country', arg: m.countryKey };
  return { view: 'worldmap', arg: '' };
}

/* ----- the map quiz ----- */

/* The field map cropped to its map: the SVG's own units 130 to 1070 across
   and 270 to 920 down (the drawing box with a margin), so the key printed
   under the map, which names every number, is never shown. */
var V56_QBOX = { x: 130, y: 270, w: 940, h: 650 };
var V56_QN = 8;
var V56_Q = { map: '', items: [], i: 0, right: 0, done: false, pick: null };
function v56QPlaces(m) {
  var title = v56Fold(m && m.title);
  var out = [];
  v56List(m && m.places).forEach(function (p, i) {
    if (!p || !v56Str(p.name) || v56Fold(p.name) === title) return;
    var at = (typeof v55Project === 'function') ? v55Project(m, p) : null;
    if (!at) return;
    out.push({ i: i, n: i + 1, name: v56Str(p.name), note: v56Str(p.note), x: at.x, y: at.y });
  });
  return out;
}
function v56QMaps() { return v56Maps().filter(function (m) { return v56QPlaces(m).length >= 4; }); }
function v56QNew(id) {
  var m = v56FieldMap(id);
  var places = m ? v56QPlaces(m) : [];
  var pool = v56Shuffle(places).slice(0, Math.min(V56_QN, places.length));
  var items = pool.map(function (p, k) {
    var it = { mode: k % 2 ? 'name' : 'find', p: p };
    if (it.mode === 'name') {
      var others = v56Shuffle(places.filter(function (q) { return q.i !== p.i && v56Fold(q.name) !== v56Fold(p.name); })).slice(0, 3);
      it.opts = v56Shuffle([p].concat(others));
    }
    return it;
  });
  V56_Q = { map: m ? m.id : '', items: items, i: 0, right: 0, done: false, pick: null };
}
function v56QPct(v, o, w) { return (Math.round((v - o) / w * 100000) / 1000) + '%'; }
function v56QRing(p, miss) {
  return '<span class="v56-qring' + (miss ? ' v56-qmiss' : '') + '" style="left:' + v56QPct(p.x, V56_QBOX.x, V56_QBOX.w) + ';top:' + v56QPct(p.y, V56_QBOX.y, V56_QBOX.h) + '" aria-hidden="true"></span>';
}
function v56QuizChooserHtml() {
  var rec = v56Rec();
  var html = '<div class="v25page v56 v56-quizpick" id="v56-quizpick">' + v32Head(v56W('quizH'), v56W('quizSub')) + '<p class="v32-line">' + v56Esc(v56W('quizPick')) + '</p>';
  var by = {}, order = [];
  v56QMaps().forEach(function (m) {
    var k = m.countryKey || '';
    if (!v56Own(by, k)) { by[k] = []; order.push(k); }
    by[k].push(m);
  });
  var rank = {};
  v56Countries().forEach(function (row, i) { rank[row.key] = i; });
  order.sort(function (a, b) { return (v56Own(rank, a) ? rank[a] : 999) - (v56Own(rank, b) ? rank[b] : 999); });
  order.forEach(function (k, gi) {
    var c = v39Country(k);
    var rows = by[k].map(function (m) {
      var n = v56QPlaces(m).length, last = rec.m[m.id];
      var line = last ? v56W('quizMapLast', { n: n, r: last.l, t: last.t }) : v56W('quizMapLine', { n: n });
      return v56Row('data-go="v56mapquiz" data-arg="' + v56Esc(m.id) + '"', v56MapName(m), line, 'v56-q-' + m.id);
    }).join('');
    html += '<section class="v32-group" aria-labelledby="v56-qg-' + gi + '"><h3 class="secgroup v32-gh" id="v56-qg-' + gi + '">' + v56Esc(c ? c.name : (typeof v45CountryName === 'function' ? v45CountryName(k) : k)) + '</h3><ul class="v25rows v32rows v56-doors">' + rows + '</ul></section>';
  });
  return html + '</div>';
}
function v56QuizHtml(m) {
  var Q = V56_Q;
  var title = v56MapName(m);
  var file = (typeof v45File === 'function') ? v45File(m) : '';
  var n = Q.items.length;
  var html = '<div class="v25page v56 v56-quiz" id="v56-quiz" data-map="' + v56Esc(m.id) + '">';
  if (Q.done) {
    html += v32Head(v56W('quizOf', { title: title }), v56W('quizDone', { r: Q.right, n: n }))
      + '<p class="v56-qprompt" id="v56-qprompt" tabindex="-1">' + v56Esc(v56W('quizDone', { r: Q.right, n: n })) + '</p><p class="v32-line">' + v56Esc(v56W('quizDoneLine', { title: title })) + '</p>'
      + '<div class="v56-qacts"><button type="button" class="btn gold" data-v56="qagain" id="v56-qagain">' + v56Esc(v56W('quizAgain', { title: title })) + '</button>'
      + '<button type="button" class="btn ghost" data-go="v56mapquiz" data-arg="" id="v56-qother">' + v56Esc(v56W('quizOther')) + '</button>';
    var home = v56MapHome(m);
    if (home.view === 'region') html += '<button type="button" class="btn ghost" data-v39="region" data-slug="' + v56Esc(home.arg) + '" id="v56-qread">' + v56Esc(v56W('quizRead', { name: title })) + '</button>';
    else if (home.view === 'country') html += '<button type="button" class="btn ghost" data-v39="country" data-key="' + v56Esc(home.arg) + '" id="v56-qread">' + v56Esc(v56W('quizRead', { name: v39Country(home.arg).name })) + '</button>';
    return html + '</div></div>';
  }
  var it = Q.items[Q.i];
  html += v32Head(v56W('quizOf', { title: title }), v56W('quizStep', { k: Q.i + 1, n: n, r: Q.right }));
  html += '<p class="v56-qprompt" id="v56-qprompt" tabindex="-1">' + v56Esc(it.mode === 'find' ? v56W('quizFind', { name: it.p.name }) : v56W('quizName')) + '</p>';
  if (it.mode === 'find' && !Q.pick) html += '<p class="v32-line">' + v56Esc(v56W('quizFindHow')) + '</p>';
  var rings = '';
  if (it.mode === 'name' || Q.pick) rings += v56QRing(it.p, false);
  if (Q.pick && it.mode === 'find' && Q.pick.i !== it.p.i) rings += v56QRing(Q.pick, true);
  html += '<div class="v56-qfig"' + (it.mode === 'find' && !Q.pick ? ' data-v56="qtap"' : '') + '><img src="' + v56Esc(file) + '" alt="' + v56Esc(v56W('quizAlt', { title: title })) + '" decoding="async">' + rings + '</div>';
  if (!Q.pick) {
    if (it.mode === 'find') {
      var all = v56QPlaces(m);
      html += '<h3 class="secgroup v32-gh">' + v56Esc(v56W('quizNumbers')) + '</h3><ul class="v56-qnums">' + all.map(function (p) {
        return '<li><button type="button" class="btn ghost" data-v56="qpick" data-i="' + p.i + '" aria-label="' + v56Esc(v56W('quizNumber', { n: p.n })) + '">' + v56Esc(String(p.n)) + '</button></li>';
      }).join('') + '</ul>';
    } else {
      html += '<ul class="v56-qopts">' + it.opts.map(function (p) {
        return '<li><button type="button" class="btn ghost" data-v56="qpick" data-i="' + p.i + '">' + v56Esc(p.name) + '</button></li>';
      }).join('') + '</ul>';
    }
  } else {
    var ok = Q.pick.i === it.p.i;
    var feed = ok ? v56W('quizRight', { n: it.p.n, name: it.p.name })
      : (it.mode === 'find' ? v56W('quizWrong', { m: Q.pick.n, picked: Q.pick.name, name: it.p.name, n: it.p.n }) : v56W('quizWrongName', { n: it.p.n, name: it.p.name }));
    html += '<p class="v56-qfeed" id="v56-qfeed" role="status" tabindex="-1">' + v56Esc(feed) + '</p>' + (it.p.note && !/^Town or settlement centre associated with /.test(it.p.note) ? '<p class="v56-qnote">' + v56Esc(it.p.note) + '</p>' : '')
      + '<div class="v56-qacts"><button type="button" class="btn gold" data-v56="qnext" id="v56-qnext">' + v56Esc(Q.i + 1 < n ? v56W('quizNext') : v56W('quizSee')) + '</button></div>';
  }
  return html + '</div>';
}
function v56QuizView(arg) {
  var m = arg ? v56FieldMap(arg) : null;
  if (!arg || !m || v56QPlaces(m).length < 4) return v56Build(v56QuizChooserHtml());
  if (V56_Q.map !== m.id || !V56_Q.items.length) v56QNew(m.id);
  return v56Build(v56QuizHtml(m));
}
function v56QRedraw(focus) {
  try { if (typeof V32 !== 'undefined' && V32) V32.pend = 'replace'; } catch (e) { }
  render();
  try { var d = v56Doc(); var f = d && d.getElementById(focus); if (f && typeof f.focus === 'function') f.focus({ preventScroll: true }); } catch (e) { }
}
/* An answer: the place picked (a tap's nearest dot, a number, a name). */
function v56QAnswer(i) {
  var Q = V56_Q;
  var it = Q.items[Q.i];
  if (!it || Q.pick || Q.done) return;
  var m = v56FieldMap(Q.map);
  var hit = null;
  v56QPlaces(m).forEach(function (p) { if (p.i === Number(i)) hit = p; });
  if (!hit) return;
  Q.pick = hit;
  if (hit.i === it.p.i) Q.right++;
  v56QRedraw('v56-qfeed');
}
V56_ACTS.qpick = function (node) { v56QAnswer(node.getAttribute('data-i')); };
V56_ACTS.qtap = function (node, e) {
  var Q = V56_Q;
  var m = v56FieldMap(Q.map);
  if (!m || !e || typeof node.getBoundingClientRect !== 'function') return;
  /* read through the artwork's own box (1200 by 1500 units), so the figure's frame and crop never shift a tap */
  var img = (typeof node.querySelector === 'function') ? node.querySelector('img') : null;
  var ir = (img && typeof img.getBoundingClientRect === 'function') ? img.getBoundingClientRect() : null;
  var x, y;
  if (ir && ir.width && ir.height) {
    x = (e.clientX - ir.left) / ir.width * 1200;
    y = (e.clientY - ir.top) / ir.height * 1500;
  } else {
    var r = node.getBoundingClientRect();
    if (!r.width || !r.height) return;
    x = V56_QBOX.x + (e.clientX - r.left) / r.width * V56_QBOX.w;
    y = V56_QBOX.y + (e.clientY - r.top) / r.height * V56_QBOX.h;
  }
  var best = null, bd = Infinity;
  v56QPlaces(m).forEach(function (p) { var dd = Math.hypot(p.x - x, p.y - y); if (dd < bd) { bd = dd; best = p; } });
  if (best) v56QAnswer(best.i);
};
V56_ACTS.qnext = function () {
  var Q = V56_Q;
  if (!Q.pick) return;
  Q.pick = null;
  if (Q.i + 1 < Q.items.length) Q.i++;
  else {
    Q.done = true;
    try { var o = v56Rec(); var last = o.m[Q.map] || {}; o.m[Q.map] = { l: Q.right, t: Q.items.length, n: (Number(last.n) || 0) + 1 }; v56Put(o); } catch (e) { }
  }
  v56QRedraw('v56-qprompt');
};
V56_ACTS.qagain = function () { v56QNew(V56_Q.map); v56QRedraw('v56-qprompt'); };
v56View('v56mapquiz', {
  draw: function (arg) { return v56QuizView(arg); },
  accept: function (arg) { var m = v56FieldMap(arg); return (m && v56QPlaces(m).length >= 4) ? m.id : ''; },
  name: function (arg) { var m = v56FieldMap(arg); return m ? v56W('quizOf', { title: v56MapName(m) }) : v56W('quizH'); },
  parent: function (arg) { var m = v56FieldMap(arg); return m ? v56MapHome(m) : { view: 'worldmap', arg: '' }; }
});
/* a new address starts a new round */
if (typeof V25_GO !== 'undefined' && V25_GO) {
  V25_GO.v56mapquiz = function (arg) {
    var id = String(arg || '');
    if (id) v56QNew(id);
    v56Go('v56mapquiz', id);
  };
}

/* ----- district cards ----- */

function v56LevelAllows(depth) {
  var lv = (typeof activeLevel !== 'undefined' && activeLevel) ? activeLevel : 'certified';
  if (depth === 'master') return lv === 'master';
  if (depth === 'advanced') return lv === 'advanced' || lv === 'master';
  return true;
}
/* A region's districts as cards: every place of the reading with a note (at
   the depth the level asks), else, while the reading is away, the places of
   its field map with a note of their own. One card a name. */
function v56DistrictCards(slug) {
  var a = v39Find(slug);
  if (!a || typeof v55Join !== 'function') return [];
  var m = v56FieldMap(a.slug);
  var J = v55Join(a, m);
  var out = [], seen = {};
  var add = function (name, note) {
    var k = v56Fold(name);
    if (!k || !note || seen[k]) return;
    seen[k] = 1;
    out.push({ id: 'd:' + a.slug + '/' + k.replace(/ /g, '-'), kind: 'region', front: name, back: v56W('dBack', { region: a.name, note: note }), label: '', district: 1, slug: a.slug });
  };
  if (v56Ready(a)) J.nodes.forEach(function (n) { if (v56LevelAllows(n.depth)) add(n.name, n.note); });
  else J.pins.forEach(function (p) { add(p.name, p.note); });
  return out;
}
function v56DistrictCard(id) {
  var mm = /^d:([a-z0-9-]+)\//.exec(String(id || ''));
  if (!mm) return null;
  var a = v39Find(mm[1]);
  if (!a || !v56Ready(a)) return null;
  var cards = v56DistrictCards(mm[1]);
  for (var i = 0; i < cards.length; i++) if (cards[i].id === id) return cards[i];
  return null;
}
var V56_DECK_RE = /^districts:([a-z0-9-]+)$/;
if (typeof v32DeckDef === 'function') {
  var _v56DeckDefDistricts = v32DeckDef;
  v32DeckDef = function (id) {
    var mm = V56_DECK_RE.exec(String(id || ''));
    var a = mm ? v39Find(mm[1]) : null;
    if (a) {
      v56DistrictsLoad(a);
      var def = { id: String(id), name: v56W('dDeck', { name: a.name }), cards: v56DistrictCards(a.slug), kind: 'region' };
      def.learnt = (typeof v32Learnt === 'function') ? v32Learnt(def) : 0;
      return def;
    }
    return _v56DeckDefDistricts.apply(this, arguments);
  };
}
/* A district card's front asks for its region and its note. */
if (typeof v32CardFace === 'function') {
  var _v56CardFace = v32CardFace;
  v32CardFace = function (c, run) {
    var html = _v56CardFace.apply(this, arguments);
    try {
      if (c && c.district && !(run && run.flip)) {
        var at = String(html).lastIndexOf('</button>');
        if (at > 0) html = html.slice(0, at) + '<span class="v56-dprompt">' + v56Esc(v56W('dPrompt')) + '</span>' + html.slice(at);
      }
    } catch (e) { }
    return html;
  };
}
/* A region's district cards want its reading: fetched once (a cold address
   too), the deck screen drawn again in place when it lands. */
function v56DistrictsLoad(a) {
  if (!a || v56Ready(a) || typeof v39LoadPart !== 'function') return;
  var part = v39PartName(a);
  if (typeof V39_PARTS !== 'undefined' && (V39_PARTS.wait[part] || V39_PARTS.failed[part])) return;
  var id = 'districts:' + a.slug;
  v39LoadPart(part, function () {
    try { if (S.view === 'deck' && S._v32deck === id) { if (typeof V32 !== 'undefined' && V32) V32.pend = 'replace'; render(); } } catch (e) { }
  });
}
function v56OpenDistricts(slug) {
  var a = v39Find(slug);
  if (!a || typeof v32OpenDeck !== 'function') return;
  try { if (typeof V39_PARTS !== 'undefined') delete V39_PARTS.failed[v39PartName(a)]; } catch (e) { }
  v56DistrictsLoad(a);
  v32OpenDeck('districts:' + a.slug);
}
V56_ACTS.dcards = function (node) { v56OpenDistricts(node.getAttribute('data-slug') || ''); };
if (typeof v32ParentRoute === 'function') {
  var _v56ParentRouteDistricts = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      var mm = (S.view === 'deck') ? V56_DECK_RE.exec(String(S._v32deck || '')) : null;
      if (mm && v39Find(mm[1])) return { view: 'region', arg: mm[1] };
    } catch (e) { }
    return _v56ParentRouteDistricts.apply(this, arguments);
  };
}
/* The chooser: every region by country, with its district count. */
function v56DistrictsHtml() {
  var html = '<div class="v25page v56 v56-districtpick" id="v56-districtpick">' + v32Head(v56W('districtsH'), v56W('districtsSub')) + '<p class="v32-line">' + v56Esc(v56W('districtsPick')) + '</p>';
  v56Countries().forEach(function (row, gi) {
    var regions = row.sheet ? v39SheetRegions(row.sheet) : [];
    if (!regions.length) return;
    var rows = regions.map(function (a) {
      var n = (typeof v55DistrictCount === 'function') ? v55DistrictCount(a) : -1;
      var line = n < 0 ? v56W('districtsLater') : (n === 1 ? v56W('districtsOne') : v56W('districtsCount', { n: n }));
      return v56Row('data-v56="dcards" data-slug="' + v56Esc(a.slug) + '"', a.name, line, 'v56-d-' + a.slug);
    }).join('');
    html += '<section class="v32-group" aria-labelledby="v56-dg-' + gi + '"><h3 class="secgroup v32-gh" id="v56-dg-' + gi + '">' + v56Esc(v56Str(row.c && row.c.name) || row.key) + '</h3><ul class="v25rows v32rows v56-doors">' + rows + '</ul></section>';
  });
  return html + '</div>';
}
v56View('v56districts', {
  draw: function () { return v56Build(v56DistrictsHtml()); },
  name: function () { return v56W('districtsH'); },
  parent: function () { return { view: 'worldmap', arg: '' }; }
});

/* ----- compare two regions ----- */

function v56CmpPair(arg) {
  var parts = String(arg || '').split('~');
  var a = v39Find(parts[0]), b = v39Find(parts[1]);
  return { a: a, b: b };
}
/* With no pair named: the region last open and the course's next region after it. */
function v56CmpDefault() {
  var a = (S && S._v39region && v39Find(S._v39region)) ? v39Find(S._v39region) : null;
  var list = v56Course().filter(function (x) { return x.kind === 'region'; });
  if (!a) { var p = v56Progress(); a = (p.next && p.next.kind === 'region') ? v39Find(p.next.key) : (list[0] ? v39Find(list[0].key) : null); }
  if (!a) return '';
  var at = -1;
  list.forEach(function (x, i) { if (x.key === a.slug) at = i; });
  var b = list[(at + 1) % Math.max(1, list.length)];
  if (!b || b.key === a.slug) b = list[0];
  return a.slug + '~' + (b ? b.key : '');
}
function v56CmpOptions(sel) {
  return v56Countries().map(function (row) {
    var regions = row.sheet ? v39SheetRegions(row.sheet) : [];
    if (!regions.length) return '';
    return '<optgroup label="' + v56Esc(v56Str(row.c && row.c.name) || row.key) + '">' + regions.map(function (a) {
      return '<option value="' + v56Esc(a.slug) + '"' + (a.slug === sel ? ' selected' : '') + '>' + v56Esc(a.name) + '</option>';
    }).join('') + '</optgroup>';
  }).join('');
}
function v56CmpCell(a, kind) {
  var t = (a.terroir && typeof a.terroir === 'object') ? a.terroir : {};
  var none = '<p>' + v56Esc(v56W('cmpNone')) + '</p>';
  var list = function (xs) { var l = xs.filter(Boolean); return l.length ? '<ul>' + l.map(function (x) { return '<li>' + v56Esc(x) + '</li>'; }).join('') + '</ul>' : none; };
  if (kind === 'climate') return v56Str(t.climate) ? '<p>' + v56Esc(v56Line(t.climate)) + '</p>' : none;
  if (kind === 'soils') return v56Str(t.soils) ? '<p>' + v56Esc(v56Line(t.soils)) + '</p>' : none;
  if (kind === 'grapes') return list(v56List(a.grapes).filter(function (g) { return g && v56Str(g.name); }).slice(0, 6).map(function (g) { return v56Str(g.name) + (v56Str(g.role) && g.role !== 'lead' ? ' (' + v56Str(g.role) + ')' : ''); }));
  if (kind === 'wines') return list(v56List(a.wines).filter(function (w) { return w && v56Str(w.style); }).slice(0, 6).map(function (w) { return v56Str(w.style); }));
  if (kind === 'ladder') return list(v56Ladder(a));
  if (kind === 'exam') return list(v56List(a.exam).map(v56Str).slice(0, 2));
  return none;
}
function v56CmpHtml(arg) {
  var P = v56CmpPair(arg);
  var html = '<div class="v25page v56 v56-cmp" id="v56-cmp">' + v32Head(v56W('cmpH'), P.a && P.b ? P.a.name + ' · ' + P.b.name : v56W('cmpSub'));
  html += '<div class="v56-cmpform"><div><label for="v56-cmp-a">' + v56Esc(v56W('cmpA')) + '</label><select id="v56-cmp-a" class="sainput">' + v56CmpOptions(P.a ? P.a.slug : '') + '</select></div>'
    + '<div><label for="v56-cmp-b">' + v56Esc(v56W('cmpB')) + '</label><select id="v56-cmp-b" class="sainput">' + v56CmpOptions(P.b ? P.b.slug : '') + '</select></div>'
    + '<div class="v28-btnrow"><button type="button" class="btn gold" data-v56="cmpgo" id="v56-cmpgo">' + v56Esc(v56W('cmpGo')) + '</button></div></div>';
  if (!P.a || !P.b) return html + '</div>';
  if (P.a === P.b) return html + '<p class="v32-line">' + v56Esc(v56W('cmpSame')) + '</p></div>';
  var parts = [v39PartName(P.a), v39PartName(P.b)];
  var ready = v56Ready(P.a) && v56Ready(P.b);
  if (!ready) {
    var failed = parts.some(function (p) { return typeof V39_PARTS !== 'undefined' && V39_PARTS.failed[p] && !V39_PARTS.wait[p]; });
    return html + '<p class="v32-line" role="status" id="v56-cmp-wait">' + v56Esc(v56W(failed ? 'cmpFail' : 'cmpWait')) + '</p></div>';
  }
  [['climate', 'cmpClimate'], ['soils', 'cmpSoils'], ['grapes', 'cmpGrapes'], ['wines', 'cmpWines'], ['ladder', 'cmpLadder'], ['exam', 'cmpExam']].forEach(function (k) {
    html += '<section class="v56-cmpsec" aria-labelledby="v56-cmp-' + k[0] + '"><h3 class="secgroup v32-gh" id="v56-cmp-' + k[0] + '">' + v56Esc(v56W(k[1])) + '</h3><div class="v56-cmprow">'
      + '<div><b>' + v56Esc(P.a.name) + '</b>' + v56CmpCell(P.a, k[0]) + '</div><div><b>' + v56Esc(P.b.name) + '</b>' + v56CmpCell(P.b, k[0]) + '</div></div></section>';
  });
  html += '<div class="v28-btnrow v56-qacts"><button type="button" class="btn ghost" data-v39="region" data-slug="' + v56Esc(P.a.slug) + '" id="v56-cmp-ra">' + v56Esc(v56W('cmpRead', { name: P.a.name })) + '</button>'
    + '<button type="button" class="btn ghost" data-v39="region" data-slug="' + v56Esc(P.b.slug) + '" id="v56-cmp-rb">' + v56Esc(v56W('cmpRead', { name: P.b.name })) + '</button></div>';
  return html + '</div>';
}
function v56CmpView(arg) {
  var P = v56CmpPair(arg);
  if (P.a && P.b && P.a !== P.b && typeof v39LoadPart === 'function') {
    [P.a, P.b].forEach(function (r) {
      if (v56Ready(r)) return;
      var part = v39PartName(r);
      if (typeof V39_PARTS !== 'undefined') delete V39_PARTS.failed[part];
      v39LoadPart(part, function () {
        try { if (S.view === 'v56compare' && V56_ARGS.v56compare === arg) { if (typeof V32 !== 'undefined' && V32) V32.pend = 'replace'; render(); } } catch (e) { }
      });
    });
  }
  return v56Build(v56CmpHtml(arg));
}
V56_ACTS.cmpgo = function () {
  var d = v56Doc();
  var a = d && d.getElementById('v56-cmp-a'), b = d && d.getElementById('v56-cmp-b');
  if (!a || !b) return;
  v56Go('v56compare', a.value + '~' + b.value, 'replace');
};
v56View('v56compare', {
  draw: function (arg) { return v56CmpView(arg); },
  accept: function (arg) { var P = v56CmpPair(arg); return (P.a && P.b) ? P.a.slug + '~' + P.b.slug : v56CmpDefault(); },
  name: function () { return v56W('cmpH'); },
  parent: function (arg) { var P = v56CmpPair(arg); return P.a ? { view: 'region', arg: P.a.slug } : { view: 'worldmap', arg: '' }; }
});

/* ----- drill a country ----- */

function v56DrillHtml() {
  var html = '<div class="v25page v56 v56-drillpick" id="v56-drillpick">' + v32Head(v56W('drillH'), v56W('drillSub')) + '<p class="v32-line">' + v56Esc(v56W('drillPick')) + '</p>';
  var rows = v56Countries().map(function (row) {
    var keys = row.sheet ? v39SheetKeys(row.sheet) : [row.key];
    var qs = v39Questions(keys);
    if (!qs.length) return '';
    var right = qs.filter(function (q) { return q && q.id && v56Right(q.id); }).length;
    return v56Row('data-v56="drillc" data-key="' + v56Esc(row.key) + '"', v56Str(row.c && row.c.name) || row.key, v56W('drillCountryLine', { t: qs.length, q: right }), 'v56-dr-' + row.key);
  }).join('');
  return html + '<ul class="v25rows v32rows v56-doors">' + rows + '</ul></div>';
}
V56_ACTS.drillc = function (node) {
  var key = node.getAttribute('data-key') || '';
  var c = v39CountryOf(key);
  if (!c || typeof v39StartDrill !== 'function') return;
  v39StartDrill((c.sheet && !c.mapless) ? v39SheetKeys(c.sheet) : [key]);
};
v56View('v56drill', {
  draw: function () { return v56Build(v56DrillHtml()); },
  name: function () { return v56W('drillH'); },
  parent: function () { return { view: 'worldmap', arg: '' }; }
});

/* =========== 7. duplicates folded =========== */

/* ----- the field map screen, the field atlas index and the regions index -----
   Their addresses keep answering: a region's field map opens the region's
   page (a country's map, its country page with that map chosen), the field
   atlas and the regions index open the root (the regions index at its
   countries, a sheet's row at that country). */
var V56_JUMP = { id: '' };
function v56FoldRoute(r) {
  if (!r) return null;
  var arg = String(r.arg || '');
  if (r.view === 'fieldmap') {
    var m = v56FieldMap(arg);
    if (m && m.type === 'region' && v39Find(m.slug || m.id)) return { view: 'region', arg: m.slug || m.id };
    if (m && m.countryKey && v39Country(m.countryKey)) {
      if (typeof V55_CHOSEN !== 'undefined' && V55_CHOSEN) V55_CHOSEN[m.countryKey] = m.id;
      return { view: 'country', arg: m.countryKey };
    }
    return { view: 'worldmap', arg: '' };
  }
  if (r.view === 'fieldatlas') return { view: 'worldmap', arg: '' };
  if (r.view === 'regions') {
    var c = arg ? v39CountryOf(arg) : null;
    V56_JUMP.id = c ? 'v56-c-' + v39CountryKey(c) : 'v55-countries-h';
    return { view: 'worldmap', arg: '' };
  }
  return null;
}
V56_COLD.fieldmap = 1;
V56_COLD.fieldatlas = 1;
V56_COLD.regions = 1;
if (typeof v32Apply === 'function') {
  var _v56ApplyFold = v32Apply;
  v32Apply = function (r) {
    var to = null;
    try { to = v56FoldRoute(r); } catch (e) { to = null; }
    if (to) {
      var args = Array.prototype.slice.call(arguments);
      args[0] = to;
      try { if (to.view !== 'worldmap' && typeof V39_PARTS !== 'undefined') { var rec = to.view === 'region' ? v39Find(to.arg) : v39CountryOf(to.arg); if (rec) delete V39_PARTS.failed[v39PartName(rec)]; } } catch (e) { }
      return _v56ApplyFold.apply(this, args);
    }
    return _v56ApplyFold.apply(this, arguments);
  };
}
/* codex39's own way to its index (its doors, V25_GO.regions) opens the root at its countries. */
if (typeof v39Open === 'function') {
  var _v56Open = v39Open;
  v39Open = function (view, arg) {
    if (view === 'regions' && typeof v32Go === 'function') {
      try { if (typeof v32PushOpener === 'function') v32PushOpener(); } catch (e) { }
      v32Go({ view: 'regions', arg: String(arg || '') }, 'push');
      return true;
    }
    return _v56Open.apply(this, arguments);
  };
}
if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS && typeof worldMapView === 'function') {
  /* a draw that still finds one of these views set draws the root */
  ['regions', 'fieldatlas'].forEach(function (k) { V25_VIEWS[k] = function () { S.view = 'worldmap'; S.wmap = null; return worldMapView(); }; });
}
/* The root brought to its countries, or to a country's row, after the draw. */
function v56DoJump() {
  var id = V56_JUMP.id;
  if (!id || S.view !== 'worldmap' || S.wmap) return;
  V56_JUMP.id = '';
  var d = v56Doc();
  var n = d ? d.getElementById(id) : null;
  if (!n) return;
  try {
    var back = d.querySelector('#view > .v32back');
    var off = (back ? back.getBoundingClientRect().height : 56) + 10;
    window.scrollTo(0, Math.max(0, Math.round(n.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) - off)));
    if (typeof n.focus === 'function') n.focus({ preventScroll: true });
  } catch (e) { }
}
if (typeof render === 'function') {
  var _v56Render = render;
  render = function () {
    var out = _v56Render.apply(this, arguments);
    try { if (V56_JUMP.id) setTimeout(v56DoJump, 0); } catch (e) { }
    try { if (S.view === 'region') setTimeout(v56RowTop, 0); } catch (e) { }
    return out;
  };
}

/* The region page's map holder: the door to the field map screen (which is
   this page now) gives way to the map's own field notes, where it has them,
   and its offline copy. */
function v56MapActsShape(html, a) {
  var s = String(html || '');
  var m = a ? v56FieldMap(a.slug) : null;
  if (!m) return s;
  var at = s.indexOf('<div class="v45-actions v55-mapacts">');
  if (at < 0) return s;
  var end = s.indexOf('</div>', at);
  var notes = '';
  try {
    var own = typeof v45OwnNotes === 'function' && v45OwnNotes(m);
    var drawNotes = (typeof _v46Notes === 'function') ? _v46Notes : (typeof v45NotesHtml === 'function' ? v45NotesHtml : null);
    if (own && drawNotes) notes = '<details class="v28-q v56-fieldnotes"><summary>' + v56Esc(v56W('notesH')) + '</summary><div class="v39-body">' + drawNotes(m) + '</div></details>';
  } catch (e) { notes = ''; }
  var keep = '';
  try { keep = (typeof v45StorageHtml === 'function') ? v45StorageHtml(m) : ''; } catch (e) { keep = ''; }
  return s.slice(0, at) + notes + keep + s.slice(end + '</div>'.length);
}
if (typeof v55RegionHtml === 'function') {
  var _v56RegionHtmlActs = v55RegionHtml;
  v55RegionHtml = function (a) {
    var html = _v56RegionHtmlActs.apply(this, arguments);
    try { return v56MapActsShape(html, a); } catch (e) { return html; }
  };
}

/* ----- answer links: a region's field map opens its region page ----- */
if (typeof v52AtlasHtml === 'function') {
  var _v56AtlasHtml = v52AtlasHtml;
  v52AtlasHtml = function (targets) {
    var args = Array.prototype.slice.call(arguments);
    try {
      args[0] = (Array.isArray(targets) ? targets : []).map(function (t) {
        if (!t || t.view !== 'fieldmap') return t;
        var m = v56FieldMap(t.arg);
        var a = (m && m.type === 'region') ? v39Find(m.slug || m.id) : null;
        return a ? { view: 'region', arg: a.slug, label: v56Str(a.name) } : t;
      });
    } catch (e) { args[0] = targets; }
    return _v56AtlasHtml.apply(this, args);
  };
}

/* ----- the sheet view gains its study doors ----- */
function v56SheetDoorsHtml(id) {
  var c = (typeof v39SheetCountry === 'function') ? v39SheetCountry(id) : null;
  var name = c ? v56Str(c.name) : ((typeof v39SheetName === 'function') ? v39SheetName(id) : id);
  var doors = '';
  if (typeof v39SheetCards === 'function' && v39SheetCards(id).length && typeof v32StartRun === 'function') doors += '<button type="button" class="btn ghost" data-v56="sheetflash" data-sheet="' + v56Esc(id) + '" id="v56-sh-flash">' + v56Esc(v56W('sheetFlash', { name: name })) + '</button>';
  if (c && typeof v39SheetKeys === 'function' && v39Questions(v39SheetKeys(id)).length) doors += '<button type="button" class="btn ghost" data-v56="drillc" data-key="' + v56Esc(v39CountryKey(c)) + '" id="v56-sh-drill">' + v56Esc(v56W('sheetDrill', { name: name })) + '</button>';
  doors += '<button type="button" class="btn ghost" data-v56="go" data-view="v56mapquiz" id="v56-sh-quiz">' + v56Esc(v56W('sheetQuiz')) + '</button>';
  doors += '<button type="button" class="btn ghost" data-v56="go" data-view="v56districts" id="v56-sh-districts">' + v56Esc(v56W('sheetDistricts')) + '</button>';
  return '<section class="v56 v56-sheetstudy" aria-labelledby="v56-sh-h"><h3 id="v56-sh-h">' + v56Esc(v56W('sheetStudyH', { name: name })) + '</h3><div class="v56-sdoors">' + doors + '</div></section>';
}
V56_ACTS.sheetflash = function (node) { if (typeof v32StartRun === 'function') v32StartRun('regions:' + (node.getAttribute('data-sheet') || ''), { push: true }); };
V56_ACTS.go = function (node) { v56Go(node.getAttribute('data-view') || '', node.getAttribute('data-arg') || ''); };
if (typeof v23SheetView === 'function') {
  var _v56SheetView = v23SheetView;
  v23SheetView = function (id) {
    var view = _v56SheetView.apply(this, arguments);
    try {
      var d = v56Doc();
      if (d && view && typeof view.querySelector === 'function' && !view.querySelector('.v56-sheetstudy')) {
        var holder = d.createElement('div');
        holder.innerHTML = v56SheetDoorsHtml(id);
        var box = holder.firstChild;
        var spread = view.querySelector('.v31-spread');
        if (box && spread && spread.parentNode) spread.parentNode.insertBefore(box, spread);
      }
    } catch (e) { }
    return view;
  };
}

/* ----- a technique opened from the atlas lights Wine Atlas and climbs back to it -----
   The atlas page it was opened from is kept (in the tab's session store too,
   so a reload keeps it); a technique opened from anywhere else is the
   Workshop's, as before. */
var V56_TECH = { from: null };
var V56_TECH_KEY = 'oot-codex-v56-techfrom';
(function () {
  try {
    var raw = (typeof sessionStorage !== 'undefined' && sessionStorage) ? sessionStorage.getItem(V56_TECH_KEY) : null;
    var o = raw ? JSON.parse(raw) : null;
    if (o && typeof o === 'object' && typeof o.view === 'string') V56_TECH.from = { view: o.view, arg: String(o.arg || '') };
  } catch (e) { }
})();
function v56AtlasRoute() {
  var v = S.view;
  if (v === 'worldmap') return { view: 'worldmap', arg: S.wmap ? String(S.wmap) : '' };
  if (v === 'region' && S._v39region) return { view: 'region', arg: String(S._v39region) };
  if (v === 'country' && S._v39country) return { view: 'country', arg: String(S._v39country) };
  if (v56Own(V56_VIEWS, v)) return { view: v, arg: String(V56_ARGS[v] || '') };
  return null;
}
function v56TechFrom() {
  return (S.view === 'technique' || S.view === 'techniques') ? V56_TECH.from : null;
}
if (typeof v46Go === 'function') {
  var _v56TechGo = v46Go;
  v46Go = function () {
    var from = v56AtlasRoute();
    if (!from && (S.view === 'technique' || S.view === 'techniques')) from = V56_TECH.from;
    V56_TECH.from = from;
    try {
      if (typeof sessionStorage !== 'undefined' && sessionStorage) {
        if (from) sessionStorage.setItem(V56_TECH_KEY, JSON.stringify(from)); else sessionStorage.removeItem(V56_TECH_KEY);
      }
    } catch (e) { }
    return _v56TechGo.apply(this, arguments);
  };
}
if (typeof v32ParentRoute === 'function') {
  var _v56ParentRouteTech = v32ParentRoute;
  v32ParentRoute = function () {
    try {
      var from = v56TechFrom();
      if (from) return { view: from.view, arg: from.arg };
    } catch (e) { }
    return _v56ParentRouteTech.apply(this, arguments);
  };
}

/* =========== 8. the articles off the map =========== */

/* An article the Court names that the maps do not number: mapless 1, no
   index, its reading in its country's sheet file. Until its own field map is
   drawn it takes its place under its country (codex39 lists it with the
   sheet's articles), in the course and on its country page, and its page
   shows its country's sheet with a line that its field map is to come. */
function v56OffMap(a) {
  return !!a && !!v56Str(a.slug) && (!!a.mapless || typeof a.index !== 'number') && !v56FieldMap(a.slug);
}
if (typeof v55RegionLine === 'function') {
  var _v56RegionLine = v55RegionLine;
  v55RegionLine = function (a) {
    var line = _v56RegionLine.apply(this, arguments);
    try { if (v56OffMap(a)) return line ? line + ' · ' + v56W('toCome') : v56W('toCome'); } catch (e) { }
    return line;
  };
}
function v56OffMapShape(html, a) {
  var s = String(html || '');
  if (!v56OffMap(a) || s.indexOf('id="v55-map-h"') >= 0) return s;
  var c = (typeof v39CountryOf === 'function') ? v39CountryOf(a.sheet) : null;
  var sheet = c ? v56Str(c.sheet) : '';
  var map = (c && sheet && !c.mapless && typeof v55SheetMapHtml === 'function') ? v55SheetMapHtml(c, sheet) : '';
  var line = '<p class="v32-line v56-tocome">' + v56Esc(v56W('toComeLine', { name: a.name, country: c ? c.name : '' })) + '</p>';
  if (map) map = map.replace(/(<h2 class="v32-h2" id="v55-map-h">[^<]*<\/h2>)/, function (m0) { return m0 + line; });
  else map = '<section class="v55-map" aria-labelledby="v55-map-h"><h2 class="v32-h2" id="v55-map-h">' + v56Esc(typeof v55W === 'function' ? v55W('mapH') : 'The map') + '</h2>' + line + '</section>';
  var minute = s.indexOf('<section class="card v56 v56-minute"');
  var at = minute >= 0 ? s.indexOf('</section>', minute) + '</section>'.length : -1;
  if (at < 0) at = s.indexOf('<section class="v55-districts"');
  if (at < 0) return s;
  s = s.slice(0, at) + map + s.slice(at);
  /* the study row gains its Map */
  var chip = '<button type="button" class="v28-chip" data-v56="jump" data-to="v55-map-h" id="v56-s-map">' + v56Esc(v56W('sMap')) + '</button>';
  var sum = s.indexOf('id="v56-s-summary"');
  var end = sum >= 0 ? s.indexOf('</button>', sum) : -1;
  if (end > 0 && s.indexOf('id="v56-s-map"') < 0) s = s.slice(0, end + '</button>'.length) + chip + s.slice(end + '</button>'.length);
  return s;
}
if (typeof v55RegionHtml === 'function') {
  var _v56RegionHtmlOff = v55RegionHtml;
  v55RegionHtml = function (a) {
    var html = _v56RegionHtmlOff.apply(this, arguments);
    try { return v56OffMapShape(html, a); } catch (e) { return html; }
  };
}

/* =========== 9. the field atlas shown cleanly =========== */

/* The field atlas's data (generated outside the house) carries American
   spellings and en dashes in the words it shows. Every layer reads its maps
   through codex45's v45Maps, so a clean copy of each map is handed out there,
   made once per edition of the data: its title, summary, scope, water, grapes,
   notes, and each place's kind and notes put right. Names (a place's own, the
   heading it joins), sources and the artwork's fields are left as written. */
var V56_DASH = String.fromCharCode(8211) + String.fromCharCode(8212);
var V56_DASH_SPACED = new RegExp('\\s+[' + V56_DASH + ']\\s+', 'g');
var V56_DASH_JOIN = new RegExp('([A-Za-z0-9\\u00C0-\\u024F]+)[' + V56_DASH + ']([A-Za-z0-9\\u00C0-\\u024F]+)', 'g');
var V56_DASH_ANY = new RegExp('[' + V56_DASH + ']', 'g');
var V56_COMPASS = { north: 1, south: 1, east: 1, west: 1, northeast: 1, northwest: 1, southeast: 1, southwest: 1 };
var V56_SPELL = [
  [/\b([Nn])eighbor(s|ing|ed|hood|hoods)?\b/g, '$1eighbour$2'],
  [/\b([Cc])enter(s|ed)?\b/g, '$1entre$2'],
  [/\b([Tt])oward\b/g, '$1owards'],
  [/\b([Cc])olor(s|ed|ful|ing)?\b/g, '$1olour$2'],
  [/\b([Ff])lavor(s|ed|ful)?\b/g, '$1lavour$2'],
  [/\b([Ff])avor(s|ed|ite|ites|able)?\b/g, '$1avour$2'],
  [/\b([Hh])arbor(s)?\b/g, '$1arbour$2'],
  [/\b([Gg])ray\b/g, '$1rey'],
  [/\b([Mm])eters?\b/g, function (m0, a) { return a + (m0.slice(-1) === 's' ? 'etres' : 'etre'); }],
  [/\b([Pp])rogram(s)?\b/g, '$1rogramme$2'],
  [/\b([Aa])ging\b/g, '$1geing'],
  [/\b([Nn]orth|[Ss]outh)(east|west)(ern)?\b/g, '$1-$2$3']
];
function v56CleanText(s) {
  if (typeof s !== 'string' || !s) return s;
  var t = s.replace(V56_DASH_SPACED, ', ');
  t = t.replace(V56_DASH_JOIN, function (m0, a, b) {
    var both = (V56_COMPASS[a.toLowerCase()] && V56_COMPASS[b.toLowerCase()]) || (/^\d+$/.test(a) && /^\d+$/.test(b));
    return a + (both ? ' to ' : ' and ') + b;
  });
  t = t.replace(V56_DASH_ANY, ', ');
  V56_SPELL.forEach(function (r) { t = t.replace(r[0], r[1]); });
  return t;
}
function v56CleanDeep(v) {
  if (typeof v === 'string') return v56CleanText(v);
  if (Array.isArray(v)) return v.map(v56CleanDeep);
  if (v && typeof v === 'object') { var o = {}; Object.keys(v).forEach(function (k) { o[k] = v56CleanDeep(v[k]); }); return o; }
  return v;
}
function v56CleanMap(m) {
  if (!m || typeof m !== 'object') return m;
  var c = {};
  Object.keys(m).forEach(function (k) { c[k] = m[k]; });
  ['title', 'summary', 'scope', 'water'].forEach(function (k) { if (typeof m[k] === 'string') c[k] = v56CleanText(m[k]); });
  if (m.grapes !== undefined) c.grapes = v56CleanDeep(m.grapes);
  if (m.notes && typeof m.notes === 'object') c.notes = v56CleanDeep(m.notes);
  if (Array.isArray(m.places)) c.places = m.places.map(function (p) {
    if (!p || typeof p !== 'object') return p;
    var q = {};
    Object.keys(p).forEach(function (k) { q[k] = p[k]; });
    ['note', 'kind', 'lessonNote'].forEach(function (k) { if (typeof p[k] === 'string') q[k] = v56CleanText(p[k]); });
    return q;
  });
  return c;
}
var V56_FA = { src: null, maps: [] };
if (typeof v45Maps === 'function') {
  var _v56Maps = v45Maps;
  v45Maps = function () {
    var src = _v56Maps.apply(this, arguments);
    try {
      if (!Array.isArray(src)) return src;
      if (V56_FA.src !== src || V56_FA.n !== src.length) V56_FA = { src: src, n: src.length, maps: src.map(v56CleanMap) };
      return V56_FA.maps;
    } catch (e) { return src; }
  };
}

/* =========== the cold address =========== */

/* A reload on one of the layer's views: codex32 read the address before
   they were known, so it is read again here, once, and the first render
   replaces (codex39's and codex45's way). This block stays last. */
(function () {
  try {
    if (typeof V32 === 'undefined' || !V32 || V32.moved || typeof v32Parse !== 'function' || typeof v32Apply !== 'function') return;
    var hash = typeof V32.initialHash === 'string' ? V32.initialHash : '';
    if (!hash && typeof location !== 'undefined' && location && typeof location.hash === 'string') hash = location.hash;
    var m = /^#\/v\/([a-z0-9]+)(\/|$)/.exec(hash);
    if (!m || !(v56Own(V56_VIEWS, m[1]) || v56Own(V56_COLD, m[1]))) return;
    var r = v32Parse(hash);
    if (!r) return;
    v32Apply(r, typeof v32CurState === 'function' ? v32CurState() : null);
    V32.pend = 'replace';
  } catch (e) { }
})();
