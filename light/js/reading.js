/* First Light: the day's reading, from the local library.

   This replaces canon.js, which fetched every passage live from four third-party
   services. The text is now in the repo, and this file's only job is to turn a
   day of a plan into library coordinates, load what is needed, and render it.

   A day of a plan is a run of atoms (js/data-plans.js, through plan.js): a
   chapter, a hymn, an ayah, a verse, a saying, a paragraph, an Upanishad verse
   with its commentary. The renderers below print exactly the day's atoms and
   the numbers its label cites, so a reader can check the passage against the
   label: verse numbers, "2.47", "1.164", Zhuangzi paragraph numbers, and
   "1.2.13" beside Paramananda's Roman headings.

   Also here: the day's teaching and the tradition courses (loaded lazily from
   js/texts/teachings and js/texts/courses, each under its own hash), drawn
   only once a complete, validated set has landed. */

/* Plan id to library work. The Gita plan reads Annie Besant's verse-numbered
   translation; Arnold's poem stays on the shelf and keeps a door to the plan. */
var CANON_WORK = { veda: 'rigveda', tanakh: 'tanakh', upanishads: 'upanishads', pali: 'dhammapada',
  analects: 'analects', tao: 'tao', zhuangzi: 'zhuangzi', gita: 'gita-besant', bible: 'bible', quran: 'quran' };

function readWorkOf(canonId) {
  var P = typeof planDef === 'function' ? planDef(canonId) : null;
  return P ? P.work : CANON_WORK[canonId];
}
function readWorkReady(canonId) {
  var w = readWorkOf(canonId);
  return !!(w && typeof FL_LIBRARY !== 'undefined' && FL_LIBRARY[w] && planDef(canonId));
}

/* The segments a day runs through: [{s, name, part, extra, count, k0, k1, a0, a1}],
   one per book, mandala, surah, chapter or section it touches. */
function readRuns(canonId, day) {
  var out = [], a = day.a0;
  while (a <= day.a1) {
    var A = planAtom(canonId, a);
    if (!A) break;
    var segEnd = a - A.k + A.count - 1;
    var last = Math.min(segEnd, day.a1);
    out.push({ s: A.s, name: A.name, part: A.part, extra: A.extra, count: A.count,
               k0: A.k, k1: A.k + (last - a), a0: a, a1: last });
    a = last + 1;
  }
  return out;
}

/* Which library parts day d of a plan needs. */
function readPartsFor(canonId, d) {
  var w = readWorkOf(canonId), day = planDay(canonId, d);
  if (!w || !day) return [];
  var seen = {}, out = [];
  readRuns(canonId, day).forEach(function (r) {
    if (seen[r.part]) return;
    seen[r.part] = 1;
    out.push({ work: w, part: r.part });
  });
  return out;
}

function readLoad(canonId, d) {
  var parts = readPartsFor(canonId, d);
  if (!parts.length) return Promise.reject(new Error('no-plan'));
  return Promise.all(parts.map(function (p) { return FLTextLoad(p.work, p.part); }));
}

function readHasLocally(canonId, d) {
  var parts = readPartsFor(canonId, d);
  return parts.length > 0 && parts.every(function (p) { return FLTextHas(p.work, p.part); });
}

/* --- rendering --- */

/* A heading or credit taken from a payload, with any em dash in it set as a
   colon: the Soul pages carry no dash, whatever the source file held. */
function readPlain(s) { return String(s == null ? '' : s).replace(/\s*\u2014\s*/g, ': '); }

function readVerses(list) {
  return '<p class="passage">' + list.map(function (v) {
    return '<span class="vnum">' + esc(String(v[0])) + '</span>' + esc(v[1]) + ' ';
  }).join('') + '</p>';
}
/* A block of hard-wrapped lines: verse keeps its lines, prose is rejoined
   (the Library's own rule). num, when given, is printed first in a .pnum. */
function readBlock(lines, num) {
  var lead = num ? '<span class="pnum">' + esc(num) + '</span>' : '';
  var avg = lines.reduce(function (s, l) { return s + String(l).length; }, 0) / (lines.length || 1);
  if (avg < 62 && lines.length > 1) return '<p class="passage verse">' + lead + lines.map(esc).join('<br>') + '</p>';
  return '<p class="passage">' + lead + esc(lines.join(' ')) + '</p>';
}
function readHead(s) { return '<div class="chaphead">' + s + '</div>'; }

var READ_ANALECTS_CHAP = /^CHAP\.\s+([IVXL]+)\.?\s+/;
var READ_UP_VERSE = /^[IVXL]+$/;
var READ_UP_HEADING = /^(?:[IVXL]+|Part \w+|Peace Chant|PEACE CHANT|Here ends this Upanishad\.?|[A-Z]+-UPANISHAD|[A-Z][a-z]+-Upanishad)$/;

/* Legge's sayings in one book, split exactly as .scripts/plans/atoms.js
   splits them: a payload chapter is cut at every line after its first that
   opens with "CHAP. <numeral>" (the bake ran VII.17 into VII.16), and the
   pieces are numbered on through the book. Each saying: the payload chapter
   (pch, 0-based) and its first and last flat line. */
var READ_SAYINGS = {};
function readSayings(bk, bi) {
  if (READ_SAYINGS[bi] && READ_SAYINGS[bi].bk === bk) return READ_SAYINGS[bi].list;
  var list = [];
  bk.ch.forEach(function (c, ci) {
    var lines = [];
    c.b.forEach(function (b) { b.forEach(function (l) { lines.push(String(l)); }); });
    var starts = [0];
    lines.forEach(function (l, j) { if (j > 0 && READ_ANALECTS_CHAP.test(l)) starts.push(j); });
    starts.forEach(function (from, i) {
      list.push({ pch: ci, from: from, to: i + 1 < starts.length ? starts[i + 1] - 1 : lines.length - 1 });
    });
  });
  READ_SAYINGS[bi] = { bk: bk, list: list };
  return list;
}
/* One saying, keeping the payload's paragraph breaks inside it. */
function readSaying(c, sy, num) {
  var out = '', idx = 0, first = true;
  c.b.forEach(function (b) {
    var part = [];
    b.forEach(function (l) {
      if (idx >= sy.from && idx <= sy.to) {
        var t = String(l);
        if (idx === sy.from) t = t.replace(READ_ANALECTS_CHAP, '');
        part.push(t);
      }
      idx++;
    });
    if (part.length) { out += readBlock(part, first ? num : null); first = false; }
  });
  return out;
}

/* Muller's verse label: "44", or a pair he prints as one paragraph ("58" and
   "59" under one label). [lo, hi]. */
function readDhpSpan(label) {
  var m = String(label).match(/^(\d+)(?:\s*[\u2013-]\s*(\d+))?$/);
  if (!m) return null;
  return [+m[1], m[2] ? +m[2] : +m[1]];
}

var READ_RENDER = {
  bible: readRenderBooks,
  tanakh: readRenderBooks,

  rigveda: function (id, runs) {
    return runs.map(function (r) {
      var d = FL_TEXT.rigveda && FL_TEXT.rigveda[r.part];
      if (!d) return '';
      var out = '';
      for (var k = r.k0; k <= r.k1; k++) {
        var hy = d.hymns[k];
        if (!hy) continue;
        var ref = 'Rig Veda ' + (r.s + 1) + '.' + (k + 1);
        if (!hy.v.length) {
          out += readHead(esc(ref)) + '<p class="loadnote">Not translated here. ' +
            (hy.note ? esc(readPlain(hy.note)) : 'Griffith omitted this hymn from the main text.') + '</p>';
          continue;
        }
        out += readHead(esc(ref) + (hy.deity ? ': ' + esc(readPlain(hy.deity)) : '')) +
          readVerses(hy.v.map(function (t, i) { return [i + 1, t]; }));
      }
      return out;
    }).join('');
  },

  quran: function (id, runs) {
    var all = FL_TEXT.quran && FL_TEXT.quran.all;
    if (!all) return '';
    return runs.map(function (r) {
      var su = all[r.s];
      if (!su) return '';
      var v = [];
      for (var k = r.k0; k <= r.k1; k++) v.push([k + 1, su.v[k] || '']);
      return readHead((r.s + 1) + '. ' + esc(r.name) + (su.tr ? ': ' + esc(readPlain(su.tr)) : '')) + readVerses(v);
    }).join('');
  },

  /* A paired paragraph is printed once, under both its numbers. */
  dhammapada: function (id, runs) {
    var chs = FL_TEXT.dhammapada && FL_TEXT.dhammapada.all;
    if (!chs) return '';
    return runs.map(function (r) {
      var c = chs[r.s];
      if (!c) return '';
      var n0 = r.a0 + 1, n1 = r.a1 + 1, v = [];
      c.v.forEach(function (e) {
        var sp = readDhpSpan(e[0]);
        if (!sp || sp[1] < n0 || sp[0] > n1) return;
        v.push([sp[0] === sp[1] ? String(sp[0]) : sp[0] + ' and ' + sp[1], e[1]]);
      });
      return readHead((r.s + 1) + '. ' + esc(c.title)) + readVerses(v);
    }).join('');
  },

  'gita-besant': function (id, runs) {
    var data = FL_TEXT['gita-besant'] && FL_TEXT['gita-besant'].all;
    if (!data) return '';
    var said = function (v) { return v[2] ? '<div class="ds speaker">' + esc(v[2]) + ' said:</div>' : ''; };
    return runs.map(function (r) {
      var c = data[r.s];
      if (!c) return '';
      var out = readHead(c.n + '. ' + esc(c.title));
      if (r.k0 === 0 && c.pre) out += said(c.pre) + '<p class="passage">' + esc(c.pre[1]) + '</p>';
      for (var k = r.k0; k <= r.k1; k++) {
        var v = c.v[k];
        if (!v) continue;
        out += said(v) + '<p class="passage"><span class="vnum">' + c.n + '.' + v[0] + '</span>' + esc(v[1]) + '</p>';
      }
      if (r.k1 === r.count - 1 && c.end) out += '<p class="ds">' + esc(c.end) + '</p>';
      return out;
    }).join('');
  },

  tao: function (id, runs) {
    var data = FL_TEXT.tao && FL_TEXT.tao.all;
    if (!data) return '';
    return runs.map(function (r) {
      var out = '';
      for (var k = r.k0; k <= r.k1; k++) {
        var c = data[k];
        if (!c) continue;
        out += readHead('Chapter ' + (k + 1)) + (c.b || []).map(function (b) { return readBlock(b); }).join('');
      }
      return out;
    }).join('');
  },

  analects: function (id, runs) {
    var data = FL_TEXT.analects && FL_TEXT.analects.all;
    if (!data) return '';
    return runs.map(function (r) {
      var bk = data[r.s];
      if (!bk) return '';
      var list = readSayings(bk, r.s);
      var out = readHead('Book ' + (r.s + 1) + (bk.title ? ', ' + esc(bk.title) : ''));
      for (var k = r.k0; k <= r.k1; k++) {
        var sy = list[k];
        if (sy) out += readSaying(bk.ch[sy.pch], sy, (r.s + 1) + '.' + (k + 1));
      }
      return out;
    }).join('');
  },

  /* Giles: block 0 of a chapter is its title and paragraph n is block n.
     The plan's last day stops before his index, because the atoms do. */
  zhuangzi: function (id, runs) {
    var data = FL_TEXT.zhuangzi && FL_TEXT.zhuangzi.all;
    if (!data) return '';
    return runs.map(function (r) {
      var c = data[r.s];
      if (!c) return '';
      var first = r.extra || 1;
      var out = readHead((r.s + 1) + '. ' + esc(r.name));
      for (var k = r.k0; k <= r.k1; k++) {
        var n = k + first, b = c.b[n];
        if (b) out += readBlock(b, (r.s + 1) + '.' + n);
      }
      return out;
    }).join('');
  },

  /* Paramananda: each verse group is the block ranges the build recorded
     (FL_PLANS blocks), so his introductions and closing essays, which the
     bake filed among the verses, are left out exactly as the plan leaves
     them out. The verse's number sits beside his Roman heading. */
  upanishads: function (id, runs) {
    var data = FL_TEXT.upanishads && FL_TEXT.upanishads.all;
    var P = planDef(id);
    if (!data || !P || !P.blocks) return '';
    var out = '', lastName = null;
    runs.forEach(function (r) {
      for (var a = r.a0; a <= r.a1; a++) {
        var br = P.blocks[a];
        if (!br) continue;
        var e = data[br[0]];
        if (!e) continue;
        if (r.name !== lastName) { out += readHead(esc(r.name)); lastName = r.name; }
        var ref = (r.extra ? r.extra + '.' : '') + (a - r.a0 + r.k0 + 1);
        for (var j = 1; j + 1 < br.length; j += 2) {
          for (var k = br[j]; k <= br[j + 1]; k++) {
            var lines = e.b[k];
            if (!lines) continue;
            var head = lines.length === 1 ? String(lines[0]).trim() : '';
            if (READ_UP_VERSE.test(head)) out += '<div class="uphead"><span class="pnum">' + esc(ref) + '</span>' + esc(head) + '</div>';
            else if (READ_UP_HEADING.test(head)) out += '<div class="ds uphead">' + esc(head) + '</div>';
            else out += readBlock(lines);
          }
        }
      }
    });
    return out;
  }
};

/* Bible and Tanakh: chapter heads under the names the labels use ("1 Samuel",
   "Psalm 23"), then numbered verses. */
function readRenderBooks(id, runs) {
  var w = readWorkOf(id);
  return runs.map(function (r) {
    var d = FL_TEXT[w] && FL_TEXT[w][r.part];
    if (!d) return '';
    var out = '';
    for (var k = r.k0; k <= r.k1; k++) {
      var verses = d.ch[k] || [];
      out += readHead(esc(r.name === 'Psalms' ? 'Psalm' : r.name) + ' ' + (k + 1)) +
        readVerses(verses.map(function (t, i) { return [i + 1, t]; }));
    }
    return out;
  }).join('');
}

/* Day d of a plan, exactly its atoms, with its numbers. */
function readRender(canonId, d) {
  var P = planDef(canonId), day = planDay(canonId, d);
  var w = readWorkOf(canonId), L = typeof FL_LIBRARY !== 'undefined' ? FL_LIBRARY[w] : null;
  var fn = P && READ_RENDER[P.work];
  var out = (fn && day && L) ? fn(canonId, readRuns(canonId, day)) : '';
  if (!out) return '<p class="loadnote">That passage could not be assembled.</p>';
  return out + '<div class="apicredit">' + esc(readPlain(L.translation)) + '. ' + esc(L.license) +
         '. From ' + esc(L.source) + '.</div>';
}

/* How much of a work is already on the device, for the honest state in the UI. */
function readCanonState(canonId) {
  var w = readWorkOf(canonId);
  if (!w || typeof FL_LIBRARY === 'undefined' || !FL_LIBRARY[w]) return Promise.resolve({ ready: false });
  var total = FL_LIBRARY[w].parts.length || 1;
  return FLTextCached(w).then(function (r) {
    var have = r ? r.have : 0;
    return { ready: true, work: w, have: have, total: total, bytes: FL_LIBRARY[w].bytes,
             whole: have >= total };
  });
}

/* Pull a whole work onto the device, and the plan's teachings with it when a
   set has landed. Same-origin script loads: seconds, and nothing asked of
   anyone else's servers. */
function readSaveCanon(canonId, onProgress) {
  var w = readWorkOf(canonId);
  if (!w || typeof FL_LIBRARY === 'undefined' || !FL_LIBRARY[w]) return Promise.reject(new Error('unknown canon'));
  var parts = FL_LIBRARY[w].parts.map(function (p) { return p.part || 'all'; });
  return FLTextLoadMany(w, parts, onProgress).then(function (r) {
    if (!readTeachReady(canonId)) return r;
    return readTeachLoad(canonId).then(function () { return r; }, function () { return r; });
  });
}


/* ═══════════════ the day's teaching ═══════════════
   js/texts/teachings/<planId>.js, listed in FL_PLANS.teach only when the set
   is complete and validated (check-plans.js), and loaded under its own hash:
   a teaching file stamped with FL_TEXT_V would never update once cached. */

function readTeachReady(canonId) {
  return !!(typeof FL_PLANS !== 'undefined' && FL_PLANS && FL_PLANS.teach && FL_PLANS.teach[canonId] && planDef(canonId));
}
function readTeachLoad(canonId) {
  if (!readTeachReady(canonId)) return Promise.reject(new Error('no-teachings'));
  return FLTextLoad('teachings', canonId, FL_PLANS.teach[canonId].v);
}
/* A teaching belongs to one division; a set written against another is never shown. */
function readTeachFor(canonId, d) {
  var T = FL_TEXT.teachings && FL_TEXT.teachings[canonId], P = planDef(canonId);
  if (!T || !P || T.div !== P.div || !T.days) return null;
  var t = T.days[d - 1];
  return t && t.d === d ? t : null;
}
function readTeachHTML(t) {
  if (!t) return '';
  return '<div class="label">The teaching</div>' +
    '<p class="tkey">“' + esc(t.key) + '”</p>' +
    '<div class="ds">' + esc(t.ref) + '</div>' +
    '<p class="px ts">' + esc(t.s) + '</p>';
}

/* ═══════════════ the tradition courses ═══════════════
   js/texts/courses/<tr>.js: one day per chamber entry, in the chamber's order.
   The titles and glosses stay in FL_TRADITIONS (courseDays); the file holds
   the key line, its reference and the one sentence. */

function readCourseLoad(tr) {
  if (!courseReady(tr)) return Promise.reject(new Error('no-course'));
  return FLTextLoad('courses', tr, FL_PLANS.courses[tr].v);
}
function readCourseFor(tr, d) {
  var C = FL_TEXT.courses && FL_TEXT.courses[tr];
  if (!C || !C.days) return null;
  var t = C.days[d - 1];
  return t && t.d === d ? t : null;
}
function readCourseHTML(t) {
  if (!t) return '';
  return '<p class="tkey">“' + esc(t.line) + '”</p>' +
    '<div class="ds">' + esc(t.ref) + (t.loc ? '' : (t.ext ? ', ' + esc(t.ext) : '')) + '</div>' +
    '<p class="px ts">' + esc(t.s) + '</p>';
}

/* Which plan reads a given work, for the door the Library puts on a work's
   contents page. The inverse of CANON_WORK, plus Arnold's Gita, which keeps
   its door to the plan that now reads Besant's. */
var PLAN_OF_WORK = {};
(function () {
  for (var id in CANON_WORK) if (Object.prototype.hasOwnProperty.call(CANON_WORK, id)) PLAN_OF_WORK[CANON_WORK[id]] = id;
  PLAN_OF_WORK.gita = 'gita';
})();
