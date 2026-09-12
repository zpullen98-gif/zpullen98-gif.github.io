/* First Light: the day's reading, from the local library.

   This replaces canon.js, which fetched every passage live from four third-party
   services: bible-api.com, alquran.cloud, Sefaria and Wikisource. That was the
   artifact's design and it had three problems: it needed a connection for the one
   thing the app most wants to do offline, one of the four paths had been dead since
   before this rebuild, and reading a whole year through it meant thousands of
   requests against operators who explicitly ask people not to.

   The text is now in the repo. This file's only job is to translate a plan's units
   into library coordinates, load what is needed, and render it.

   The five plans address their canons differently, so each gets its own resolver:
     bible    [[book, chapter], …]      → one part per book
     tanakh   [[composite, chapter], …] → resolveTanakh() splits Samuel/Kings/etc.
     quran    [[surah, ayah], …]        → one part, indexed by surah
     pali     [verse, …]                → one part; verses may be pair-spans
     veda     [[mandala, hymn], …]      → one part per mandala */

var CANON_WORK = { bible: 'bible', tanakh: 'tanakh', quran: 'quran', pali: 'dhammapada', veda: 'rigveda',
  /* the short reads: each ships whole, and its plan id is its work id */
  gita: 'gita', tao: 'tao', analects: 'analects', zhuangzi: 'zhuangzi', upanishads: 'upanishads' };

/* Book name → part id, built once from the library index. The plans name books and
   the library files them by number, and nothing else knows how to bridge that. */
var READ_PART_OF = {};
(function () {
  if (typeof FL_LIBRARY === 'undefined') return;
  ['bible', 'tanakh'].forEach(function (w) {
    if (!FL_LIBRARY[w]) return;
    READ_PART_OF[w] = {};
    FL_LIBRARY[w].parts.forEach(function (p) { READ_PART_OF[w][p.book] = p.part; });
  });
})();

function readWorkOf(canonId) { return CANON_WORK[canonId]; }
function readWorkReady(canonId) {
  var w = readWorkOf(canonId);
  return !!(w && typeof FL_LIBRARY !== 'undefined' && FL_LIBRARY[w]);
}

/* Which library parts a given day of a given plan needs. */
function readPartsFor(canonId, doy) {
  var w = readWorkOf(canonId), need = {};
  if (!w) return [];

  if (canonId === 'bible' || canonId === 'tanakh') {
    var units = (canonId === 'bible' ? PLAN_BIBLE_UNITS : PLAN_TANAKH_UNITS)[doy - 1] || [];
    units.forEach(function (u) {
      var book = canonId === 'tanakh' ? resolveTanakh(u[0], u[1])[0] : u[0];
      var part = READ_PART_OF[w] && READ_PART_OF[w][book];
      if (part) need[part] = 1;
    });
  } else if (canonId === 'veda') {
    (PLAN_VEDA_UNITS[doy - 1] || []).forEach(function (u) {
      need[String(u[0]).padStart(2, '0')] = 1;
    });
  } else {
    need.all = 1;   // quran and dhammapada each ship whole
  }

  return Object.keys(need).map(function (p) { return { work: w, part: p }; });
}

function readLoad(canonId, doy) {
  var parts = readPartsFor(canonId, doy);
  if (!parts.length) return Promise.reject(new Error('no-plan'));
  return Promise.all(parts.map(function (p) { return FLTextLoad(p.work, p.part); }));
}

function readHasLocally(canonId, doy) {
  var parts = readPartsFor(canonId, doy);
  return parts.length > 0 && parts.every(function (p) { return FLTextHas(p.work, p.part); });
}

/* --- rendering --- */
function readVerses(list) {
  return '<p class="passage">' + list.map(function (v) {
    return '<span class="vnum">' + esc(String(v[0])) + '</span>' + esc(v[1]) + ' ';
  }).join('') + '</p>';
}

function readRender(canonId, doy) {
  var w = readWorkOf(canonId), L = FL_LIBRARY[w], out = '';

  if (canonId === 'bible' || canonId === 'tanakh') {
    var units = (canonId === 'bible' ? PLAN_BIBLE_UNITS : PLAN_TANAKH_UNITS)[doy - 1] || [];
    out = units.map(function (u) {
      var book = canonId === 'tanakh' ? resolveTanakh(u[0], u[1])[0] : u[0];
      var chNum = canonId === 'tanakh' ? resolveTanakh(u[0], u[1])[1] : u[1];
      var part = READ_PART_OF[w][book];
      var d = FL_TEXT[w] && FL_TEXT[w][part];
      if (!d) return '';
      var verses = d.ch[chNum - 1] || [];
      return '<div class="chaphead">' + esc(book) + ' ' + chNum + '</div>' +
             readVerses(verses.map(function (t, i) { return [i + 1, t]; }));
    }).join('');

  } else if (canonId === 'quran') {
    var qUnits = PLAN_QURAN_UNITS[doy - 1] || [];
    var all = FL_TEXT.quran && FL_TEXT.quran.all;
    if (!all) return '';
    var groups = [], cur = null;
    qUnits.forEach(function (u) {
      if (!cur || cur.n !== u[0]) { cur = { n: u[0], v: [] }; groups.push(cur); }
      cur.v.push(u[1]);
    });
    out = groups.map(function (g) {
      var s = all[g.n - 1];
      if (!s) return '';
      return '<div class="chaphead">' + s.n + '. ' + esc(s.name) + ': ' + esc(s.tr) + '</div>' +
             readVerses(g.v.map(function (a) { return [a, s.v[a - 1] || '']; }));
    }).join('');

  } else if (canonId === 'pali') {
    var nums = PLAN_PALI_UNITS[doy - 1] || [];
    var chs = FL_TEXT.dhammapada && FL_TEXT.dhammapada.all;
    if (!chs) return '';
    /* Müller sets nine verse pairs as one paragraph, stored under a span label like
       "58–59". A plan day asking for verse 58 must find that paragraph, and a day
       asking for both 58 and 59 must print it once. */
    var seen = {}, rows = [], chapterOf = {};
    chs.forEach(function (c) {
      c.v.forEach(function (v) {
        var label = String(v[0]);
        var lo = parseInt(label, 10);
        var hi = label.indexOf('–') > -1 ? parseInt(label.split('–')[1], 10) : lo;
        for (var n = lo; n <= hi; n++) { chapterOf[n] = c.title; }
        v._lo = lo; v._hi = hi; v._ch = c.title;
      });
    });
    var flat = chs.reduce(function (a, c) { return a.concat(c.v); }, []);
    nums.forEach(function (n) {
      var hit = null;
      for (var i = 0; i < flat.length; i++) if (n >= flat[i]._lo && n <= flat[i]._hi) { hit = flat[i]; break; }
      if (!hit || seen[hit._lo]) return;
      seen[hit._lo] = 1;
      rows.push(hit);
    });
    var byCh = [], curCh = null;
    rows.forEach(function (v) {
      if (!curCh || curCh.title !== v._ch) { curCh = { title: v._ch, v: [] }; byCh.push(curCh); }
      curCh.v.push([v[0], v[1]]);
    });
    out = byCh.map(function (c) {
      return '<div class="chaphead">' + esc(c.title) + '</div>' + readVerses(c.v);
    }).join('');

  } else if (canonId === 'veda') {
    var vUnits = PLAN_VEDA_UNITS[doy - 1] || [];
    out = vUnits.map(function (u) {
      var part = String(u[0]).padStart(2, '0');
      var d = FL_TEXT.rigveda && FL_TEXT.rigveda[part];
      if (!d) return '';
      var hy = null;
      for (var i = 0; i < d.hymns.length; i++) if (d.hymns[i].h === u[1]) { hy = d.hymns[i]; break; }
      if (!hy) return '';
      if (!hy.v.length) {
        return '<div class="chaphead">Mandala ' + u[0] + ', Hymn ' + u[1] + '</div>' +
               '<p class="loadnote">Not translated here. ' +
               (hy.note ? esc(hy.note) : 'Griffith omitted this hymn from the main text.') + '</p>';
      }
      return '<div class="chaphead">Mandala ' + u[0] + ', Hymn ' + u[1] +
             (hy.deity ? ' · ' + esc(hy.deity) : '') + '</div>' +
             readVerses(hy.v.map(function (t, i) { return [i + 1, t]; }));
    }).join('');

  } else if (typeof SHORT_UNITS !== 'undefined' && SHORT_UNITS[canonId]) {
    out = readShort(canonId, doy);
  }

  if (!out) return '<p class="loadnote">That passage could not be assembled.</p>';
  return out + '<div class="apicredit">' + esc(L.translation) + ' · ' + esc(L.license) +
         ' · via ' + esc(L.source) + '</div>';
}

/* How much of a canon is already on the device, for the honest state in the UI. */
function readCanonState(canonId) {
  var w = readWorkOf(canonId);
  if (!w || !FL_LIBRARY[w]) return Promise.resolve({ ready: false });
  var total = FL_LIBRARY[w].parts.length || 1;
  return FLTextCached(w).then(function (r) {
    var have = r ? r.have : 0;
    return { ready: true, work: w, have: have, total: total, bytes: FL_LIBRARY[w].bytes,
             whole: have >= total };
  });
}

/* Pull an entire canon onto the device. Same-origin script loads, so this is seconds
   rather than the forty-minute polite crawl the live-fetch design would have needed
   , and it asks nothing of anyone else's servers. */
function readSaveCanon(canonId, onProgress) {
  var w = readWorkOf(canonId);
  if (!w || !FL_LIBRARY[w]) return Promise.reject(new Error('unknown canon'));
  var parts = FL_LIBRARY[w].parts.map(function (p) { return p.part || 'all'; });
  return FLTextLoadMany(w, parts, onProgress);
}


/* ═══════════════ the short reads ═══════════════
   Each ships whole, so the part is always 'all' and readPartsFor's default
   branch already covers them. All that is needed here is the rendering, and
   the block helper the library uses for prose that keeps its line breaks. */

function readBlock(lines) {
  return '<p class="passage">' + lines.map(esc).join('<br>') + '</p>';
}

function readShort(canonId, doy) {
  var w = readWorkOf(canonId);
  var arr = FL_TEXT[w] && FL_TEXT[w].all;
  if (!arr) return '';
  var units = (SHORT_UNITS[canonId] || [])[doy - 1] || [];
  return units.map(function (n) {
    var c = null;
    for (var i = 0; i < arr.length; i++) if ((arr[i].n || (i + 1)) === n) { c = arr[i]; break; }
    if (!c) return '';
    var head = c.title ? esc(c.title) : ((canonId === 'analects' ? 'Book ' : 'Chapter ') + n);
    /* the Analects nest a second level: book, then numbered chapters */
    if (c.ch) {
      return '<div class="chaphead">Book ' + n + (c.title ? ' · ' + esc(c.title) : '') + '</div>' +
        c.ch.map(function (sub) {
          return '<div class="ds" style="margin:12px 0 4px">Chapter ' + sub.n + '</div>' +
                 (sub.b || []).map(readBlock).join('');
        }).join('');
    }
    return '<div class="chaphead">' + head + '</div>' + (c.b || []).map(readBlock).join('');
  }).join('');
}

/* Which plan reads a given work, for the door the Library puts on a work's
   contents page. The inverse of CANON_WORK, built once. */
var PLAN_OF_WORK = {};
(function () {
  for (var id in CANON_WORK) if (Object.prototype.hasOwnProperty.call(CANON_WORK, id)) PLAN_OF_WORK[CANON_WORK[id]] = id;
})();
