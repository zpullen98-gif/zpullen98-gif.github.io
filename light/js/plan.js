/* First Light: the almanac calendar and the five reading plans.

   Loads after data-canon.js: it consumes BIBLE_BOOKS, TANAKH_BOOKS, JUZ,
   SURAH_AYAHS, JUZ_START, DHP_CH and RV_MANDALAS, and builds the 366-day plans
   plus HALL_YEARS from them.

   === THE DAY-OF-YEAR RULE ===
   The artifact computed the day of the year two different ways. `doyOf()` used a
   fixed table with February pinned at 29; `renderToday()` used the real calendar.
   In a common year these disagree by one from March onward, so the rotating
   reflection drifted out of step with the five canon readings for ten months.

   This file settles it: the fixed 366-slot table is the only one, and every
   caller uses it.

   That is a deliberate choice, not a convenience. The almanac is dated: the
   first of January is Seneca every year, and it would be a poor almanac if a
   given date drew a different voice depending on the year. A fixed table
   guarantees date → voice is permanent. The cost is that in a common year slot 60
   is never reached, so the leap-day voice appears once in four years. That is the
   right cost: the artifact's own subtitle promises "366 voices — one for every day
   of the year, including the leap day", and a voice reserved for the twenty-ninth
   of February should be rare. */

var MLEN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function doyOf(m, d) {
  var s = 0;
  for (var i = 0; i < m - 1; i++) s += MLEN[i];
  return s + d;
}
function doyToday() {
  /* the shift clock: at 2am a closer is still on the day they are closing */
  var n = flShiftedNow();
  return doyOf(n.getMonth() + 1, n.getDate());
}
/* Inverse, for the year heatmap and for any view that walks slots rather than dates. */
function doyToMD(doy) {
  var m = 0;
  while (m < 12 && doy > MLEN[m]) { doy -= MLEN[m]; m++; }
  return [m + 1, doy];
}
function isLeap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
/* True when this slot has no date in the given year: slot 60 outside a leap year. */
function doySkipped(doy, y) { return doy === 60 && !isLeap(y === undefined ? new Date().getFullYear() : y); }

/* --- plan construction (verbatim from the artifact) --- */

function chunkPlan(units, daysTotal) {
  var plan = [], i = 0;
  for (var d = 0; d < daysTotal; d++) {
    var remainDays = daysTotal - d, remainUnits = units.length - i;
    var take = Math.ceil(remainUnits / remainDays);
    plan.push(units.slice(i, i + take)); i += take;
  }
  return plan;
}
function bookUnits(books) {
  var u = [];
  books.forEach(function (bk) { for (var c = 1; c <= bk[1]; c++) u.push([bk[0], c]); });
  return u;
}
function rangeLabel(day) {
  var a = day[0], b = day[day.length - 1];
  if (a[0] === b[0]) return a[0] + ' ' + (a[1] === b[1] ? a[1] : a[1] + '–' + b[1]);
  return a[0] + ' ' + a[1] + ' to ' + b[0] + ' ' + b[1];
}

var PLAN_BIBLE_UNITS = chunkPlan(bookUnits(BIBLE_BOOKS), 366);
var PLAN_BIBLE = PLAN_BIBLE_UNITS.map(rangeLabel);
var PLAN_TANAKH_UNITS = chunkPlan(bookUnits(TANAKH_BOOKS), 366);
var PLAN_TANAKH = PLAN_TANAKH_UNITS.map(rangeLabel);

/* The Tanakh counts several books as one; map each composite to its fetchable parts.
   Note the chapter counts follow Jewish numbering (Joel 4, Malachi 3), which is why
   they differ from the same books in BIBLE_BOOKS (Joel 3, Malachi 4). That is not a
   typo in either list: the two canons genuinely divide those books differently. */
var TANAKH_PARTS = {
  'Samuel': [['I Samuel', 31], ['II Samuel', 24]],
  'Kings': [['I Kings', 22], ['II Kings', 25]],
  'Chronicles': [['I Chronicles', 29], ['II Chronicles', 36]],
  'Ezra–Nehemiah': [['Ezra', 10], ['Nehemiah', 13]],
  'The Twelve': [['Hosea', 14], ['Joel', 4], ['Amos', 9], ['Obadiah', 1], ['Jonah', 4], ['Micah', 7],
                 ['Nahum', 3], ['Habakkuk', 3], ['Zephaniah', 3], ['Haggai', 2], ['Zechariah', 14], ['Malachi', 3]]
};
function resolveTanakh(book, ch) {
  var parts = TANAKH_PARTS[book];
  if (!parts) return [book, ch];
  var n = ch;
  for (var i = 0; i < parts.length; i++) {
    if (n <= parts[i][1]) return [parts[i][0], n];
    n -= parts[i][1];
  }
  return [book, ch];
}

var PLAN_QURAN_UNITS = (function () {
  /* flatten (surah,ayah) pairs from a start point up to (not including) an end point */
  function flatten(fromS, fromA, toS, toA) {   // toS/toA null means "to the end"
    var u = [], s = fromS, a = fromA;
    for (;;) {
      if (toS !== null && (s > toS || (s === toS && a >= toA))) break;
      if (s > 114) break;
      u.push([s, a]);
      a++;
      if (a > SURAH_AYAHS[s - 1]) { s++; a = 1; }
    }
    return u;
  }
  var allDays = [];
  for (var j = 0; j < 30; j++) {
    var fs = JUZ_START[j][0], fa = JUZ_START[j][1];
    var next = j < 29 ? JUZ_START[j + 1] : null;
    var units = flatten(fs, fa, next ? next[0] : null, next ? next[1] : null);
    /* 6 juz' of 13 days + 24 of 12 = 366 exactly. */
    var dayCount = 12 + (j < 6 ? 1 : 0);
    chunkPlan(units, dayCount).forEach(function (c) { allDays.push(c); });
  }
  return allDays;
})();

var PLAN_QURAN = (function () {
  var p = [];
  for (var j = 0; j < 30; j++) {
    var days = 12 + (j < 6 ? 1 : 0);
    for (var k = 1; k <= days; k++) {
      p.push('Juz’ ' + (j + 1) + ': begins at ' + JUZ[j] + '  ·  day ' + k + ' of ' + days);
    }
  }
  return p;
})();

var DHP_CHAPTER_OF = function (v) {
  for (var i = 0; i < DHP_CH.length; i++) if (v <= DHP_CH[i][1]) return DHP_CH[i][0];
  return '';
};
var PLAN_PALI_UNITS = (function () {
  var u = [];
  for (var v = 1; v <= 423; v++) u.push(v);
  return chunkPlan(u, 366);
})();
var PLAN_PALI = PLAN_PALI_UNITS.map(function (day) {
  var a = day[0], b = day[day.length - 1];
  return 'Dhammapada ' + (a === b ? ('v. ' + a) : ('vv. ' + a + '–' + b)) + '  ·  ' + DHP_CHAPTER_OF(a);
});

var PLAN_VEDA_UNITS = (function () {
  var u = [];
  RV_MANDALAS.forEach(function (n, m) { for (var h = 1; h <= n; h++) u.push([m + 1, h]); });
  return chunkPlan(u, 366);
})();
var PLAN_VEDA = PLAN_VEDA_UNITS.map(function (day) {
  var a = day[0], b = day[day.length - 1];
  if (a[0] === b[0]) return 'Rig Veda, Mandala ' + a[0] + ', Hymn' + (a[1] === b[1] ? ' ' + a[1] : 's ' + a[1] + '–' + b[1]);
  return 'Rig Veda, Mandala ' + a[0] + ' Hymn ' + a[1] + ' to Mandala ' + b[0] + ' Hymn ' + b[1];
});

/* ——— the five canons ———
   [id, name, subtitle, planDescription, plan[], epigraph, epigraphSource, blurb, teachings] */
var HALL_YEARS = [
 ['bible', 'The Bible', 'The Christian Scriptures',
  'Whole Bible in a year — all 1,189 chapters, Genesis to Revelation, three to four chapters a day.', PLAN_BIBLE,
  'In the beginning was the Word, and the Word was with God, and the Word was God.', 'John 1:1',
  'Two testaments, one arc: creation, covenant, incarnation, and the promised restoration of all things.',
  'Incarnation · Grace · Resurrection · the Kingdom of God · Agape'],
 ['quran', 'The Qur’an', 'The Recitation',
  'The thirty ajza’ across the year: each juz’ held for twelve or thirteen days, as the month of Ramadan holds it for one.', PLAN_QURAN,
  'In the name of God, the Most Gracious, the Most Merciful.', 'The Basmala',
  'Revealed over twenty-three years, held whole in living memory by millions.',
  'Tawhid · Prophethood · the Day of Judgment · Rahma · the Straight Path'],
 ['veda', 'The Vedas', 'Śruti: That Which Was Heard',
  'All 1,028 hymns of the Rig Veda in a year: two to three hymns a day through the ten mandalas.', PLAN_VEDA,
  'Truth is one; the wise call it by many names.', 'Rig Veda 1.164.46',
  'The oldest scriptures still in daily use, carried by voice for three millennia, culminating in the Upanishads.',
  'Ṛta · Brahman and Atman · Yajña · Om · the Four Ends of Life'],
 ['pali', 'The Tripiṭaka', 'The Pali Canon',
  'The complete Dhammapada in a year — all 423 verses, one or two a day, chapter by chapter.', PLAN_PALI,
  'Mind precedes all things; mind is their chief, mind is their maker.', 'Dhammapada 1',
  'The Buddha’s teaching as his first hearers preserved it: discipline, discourse, and analysis.',
  'the Four Noble Truths · the Eightfold Path · the Three Marks · Dependent Origination · the Brahmavihāras'],
 ['tanakh', 'The Hebrew Bible', 'Tanakh',
  'The whole Tanakh in a year, all 929 chapters in the traditional order: Torah, Prophets, Writings.', PLAN_TANAKH,
  'Hear, O Israel: the Lord our God, the Lord is one.', 'Deuteronomy 6:4',
  'Teaching, Prophets, and Writings: a covenant carried in a portable homeland of words.',
  'Brit · Torah as Teaching · Tzedek · Teshuvah · Shabbat']
];

function hallById(id) {
  for (var i = 0; i < HALL_YEARS.length; i++) if (HALL_YEARS[i][0] === id) return HALL_YEARS[i];
  return null;
}

/* ——— personal reading progress ———
   The artifact locked every plan to the calendar: open the Bible year in August and
   you begin at day 227, with no way to read the first 226 chapters. These helpers
   back the Phase 2 UI, where a canon starts the day you enter it and remembers what
   you actually finished. `start` null means the reader has chosen to follow the
   calendar instead, which stays available on purpose — a shared cycle is the older
   and in some ways better discipline. */
function canonState(id) {
  if (!FL.canon[id]) FL.canon[id] = { start: null, done: {} };
  if (!FL.canon[id].done) FL.canon[id].done = {};
  return FL.canon[id];
}
/* Which slot of the plan is "today" for this reader. */
function canonDoy(id) {
  var st = canonState(id);
  if (!st.start) return doyToday();
  /* start was stamped with the shift-aware flToday(), so "days since" must be
     measured against the same clock, or a plan begun after midnight skips
     Day 1 forever. Math.round, not floor: two local midnights across a DST
     spring-forward differ by 23h and floor silently dropped a day. */
  var n = flShiftedNow();
  var start = new Date(st.start + 'T00:00:00');
  var days = Math.round((new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime() - start.getTime()) / 86400000);
  if (days < 0) days = 0;
  return (days % 366) + 1;      // wraps, so a second year through is a second year, not an overrun
}
function canonProgress(id) {
  var done = canonState(id).done, n = 0;
  for (var k in done) if (Object.prototype.hasOwnProperty.call(done, k)) n++;
  return { done: n, total: 366, pct: Math.round(n / 366 * 100) };
}
function canonMarkRead(id, doy, on) {
  var st = canonState(id);
  if (on === false) delete st.done[doy]; else st.done[doy] = 1;
  flSave();
}
