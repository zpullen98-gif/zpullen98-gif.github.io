/* ═══════════════ CODEX XXII: THE TILES SAY WHAT THEY ARE ═══════════════

   Twenty six tiles on the home page carried a sentence each, averaging eighty
   five characters, and most of that sentence explained what the tile was for.
   "Target one region or topic at a time: Burgundy, Fortified, BOS math, and
   more." "The examinable tasting list: structure, aroma markers, and
   blind-tasting giveaways for every grape you may be poured."

   That copy is useful exactly once. On every visit after the first it is a
   paragraph between the reader and the button, and a reader who opens this app
   every morning reads it a thousand times and takes nothing from it. What they
   actually want to know is what a tile holds and how big it is: how many
   questions are due, how many chapters there are, whether it is timed.

   So every description becomes facts, separated by a middle dot, in under
   forty characters. No sentences, no explanation of purpose, and the live
   numbers kept because the live numbers are the part worth reading.

   WHY THIS IS A LAYER AND NOT TWENTY SIX EDITS. The tiles are built across
   core.js, codex2, codex3, codex4, codex5, codex6, codex7, codex12 and the
   three newest layers, and the standalone and the wing have genuinely diverged
   in most of those files. Editing them in place is nine files times two trees
   for what is, in substance, one decision. This rewrites the rendered tile
   instead, from one file that is byte-identical in both trees.

   EVERY NUMBER IS COMPUTED, never copied, so none of them can go stale when a
   bank grows. Where a global is missing the tile is left exactly as it was:
   a missing description is worse than a long one. */

/* The count of questions the whole app holds, across every rank, not just the
   bank currently loaded. codex19 uses the same idea for the Encyclopedia tile. */
function v22AllQuestions() {
  try {
    if (typeof LEVEL_ORDER !== 'undefined' && typeof LEVELS !== 'undefined') {
      var n = 0;
      LEVEL_ORDER.forEach(function (lv) {
        if (LEVELS[lv] && LEVELS[lv].bank) n += LEVELS[lv].bank.length;
      });
      if (n) return n;
    }
  } catch (e) { }
  return (typeof QUESTIONS !== 'undefined') ? QUESTIONS.length : 0;
}

function v22Num(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

/* Pull the first number out of a tile's existing text, for the few tiles whose
   only useful content is a live count this layer has no cleaner way to reach. */
function v22Lead(txt, re) {
  var m = String(txt || '').match(re);
  return m ? m[1] : null;
}

/* id, or the heading where a tile has no id, mapped to what it should say.
   A function returns null to leave the tile untouched. */
var V22_TILES = {
  'Examinations': function () {
    var secs = (typeof cats === 'function') ? Object.keys(cats()).length : 0;
    var doms = (typeof examDomains === 'function') ? examDomains().length : 0;
    if (!secs) return null;
    return secs + ' sections · ' + doms + ' domains · the Finals';
  },
  'The Blind Grid': function () {
    var n = (typeof gridPool === 'function') ? gridPool().length : 0;
    return n ? '6 glasses · ' + n + ' grapes · untimed' : null;
  },
  'The Floor': function () {
    return (typeof FLOOR !== 'undefined') ? FLOOR.length + ' situations' : null;
  },
  'Pairing': function () {
    return (typeof PAIRS !== 'undefined') ? PAIRS.length + ' dishes' : null;
  },

  /* 'no questions due today' on a fresh record carries no digit, so a rule
     that insists on one silently leaves the longest description on the page
     for exactly the reader who has just arrived. */
  't-daily': function (txt) {
    var m = String(txt || '').match(/(\d+|no)\s+questions?\s+due/i);
    if (!m) return null;
    return m[1].toLowerCase() === 'no' ? 'nothing due today' : m[1] + ' due today';
  },
  'm-mock': function () {
    return (typeof MOCK_N !== 'undefined' && typeof MOCK_SECS !== 'undefined')
      ? MOCK_N + ' questions · ' + Math.round(MOCK_SECS / 60) + ' minutes' : null;
  },
  't-sim': function () { return 'timed sittings, 20 to 100'; },
  't-tast': function () {
    var n = (typeof GRAPES !== 'undefined') ? GRAPES.length : 0;
    return n ? 'the grid · flights of 6 · ' + n + ' grapes' : null;
  },
  't-svc': function () {
    try {
      var rites = SERVICE.length;
      var steps = SERVICE.reduce(function (a, r) { return a + r.steps.length; }, 0);
      return rites + ' rites · ' + steps + ' movements';
    } catch (e) { return null; }
  },
  't-light': function () { return '50 questions · 30 seconds each'; },
  't-sudden': function (txt) {
    var b = v22Lead(txt, /Best:\s*(\d+)/);
    return 'one mistake ends it' + (b === null ? '' : ' · best ' + b);
  },
  'm-drill': function () {
    var n = (typeof cats === 'function') ? Object.keys(cats()).length : 0;
    return n ? n + ' sections' : null;
  },
  'm-endless': function () { return 'untimed · reshuffles'; },
  't-weak': function () { return '25 questions · your worst first'; },
  't-flag': function (txt) {
    var n = v22Lead(txt, /(\d+)\s+bookmarked/);
    return n === null ? null : n + ' bookmarked';
  },
  't-prim': function () {
    return (typeof PRIMERS !== 'undefined') ? PRIMERS.length + ' chapters' : null;
  },
  'm-terroir': function () {
    try {
      var regions = TERROIR.reduce(function (a, c) { return a + c.regions.length; }, 0);
      return TERROIR.length + ' countries · ' + regions + ' regions';
    } catch (e) { return 'climate, soil, region by region'; }
  },
  'm-flash': function () {
    var n = (typeof GRAPES !== 'undefined') ? GRAPES.length : 0;
    return n ? n + ' grapes · both directions' : null;
  },
  'm-prod': function () {
    try { return v22Num(prodCorpus().length) + ' estates and icon wines'; }
    catch (e) { return null; }
  },
  't-compendium': function () {
    try {
      var regions = INTRO_ATLAS.reduce(function (a, c) { return a + c.r.length; }, 0);
      return INTRO_ATLAS.length + ' maps · ' + regions + ' regions · ' +
        INTRO_GRAPES.length + ' grapes';
    } catch (e) { return null; }
  },
  't-ency': function () {
    var n = v22AllQuestions();
    return n ? 'search ' + v22Num(n) + ' questions · every rank' : null;
  },
  't-vid': function () {
    try {
      var rows = VIDEOS.reduce(function (a, g) { return a + g.rows.length; }, 0);
      return rows + ' viewings · ' + VIDEOS.length + ' topics';
    } catch (e) { return null; }
  },
  't-cellar': function (txt) {
    var n = v22Lead(txt, /(\d+)\s+bottles?/);
    return n === null ? 'your venue list' : n + ' bottles';
  },
  't-dash': function () { return 'accuracy, coverage, readiness'; },
  't-hall': function (txt) {
    var m = String(txt || '').match(/(\d+)\s+of\s+(\d+)/);
    return m ? m[1] + ' of ' + m[2] + ' claimed' : null;
  },
  't-sync': function (txt) {
    var m = String(txt || '').match(/(\d+)\s+sessions?\s+and\s+(\d+)\s+notes?/);
    return m ? m[1] + ' sessions · ' + m[2] + ' notes' : 'export, import, merge';
  }
};

function v22Apply() {
  var tiles = document.querySelectorAll('.mode');
  for (var i = 0; i < tiles.length; i++) {
    var b = tiles[i];
    var p = b.querySelector('p');
    if (!p) continue;
    var h3 = b.querySelector('h3');
    var key = b.id || (h3 ? (h3.textContent || '').trim() : '');
    var fn = V22_TILES[key];
    if (!fn) continue;
    var next;
    try { next = fn(p.textContent); } catch (e) { next = null; }
    if (next && next !== p.textContent) p.textContent = next;
  }
}

/* APPLIED EXACTLY ONCE PER RENDER, at the end, and never inside
   decorateHome as well.

   The first version did both, and two of the rewrites read a number out of the
   tile's existing text: the second pass then parsed its own output, failed to
   match, and fell back. Sudden Death lost its best score and Progress Transfer
   lost its session count. Running once, after every builder has finished, is
   both correct and simpler: decorateHome is only ever called from render, the
   Compendium row is inserted inside it, and the newest doors are appended by
   their own layers before this point. */
var _v22Render = render;
render = function () {
  var out = _v22Render.apply(this, arguments);
  try { if (S.view === 'home') v22Apply(); } catch (e) { }
  return out;
};
