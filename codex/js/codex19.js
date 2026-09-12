/* ═══════════════ CODEX XIX: THE EXAMINATIONS ═══════════════

   The Codex was built around one timed mock exam. That is the wrong centre of
   gravity for an app whose purpose is to make somebody good on a floor: a
   clock measures how fast you retrieve, which is a skill worth exactly one
   drill and not the shape of a whole product.

   So this layer gives the reader three examinations and takes the clock out
   of all of them:

     Section exam   one category, fifteen questions, or the whole section
                    where it holds fewer than that
     Domain exam    one of the seven bands DRILL_GROUPS already defines,
                    twenty five questions drawn in proportion across its
                    member sections
     The Finals     every section of the rank at once, forty questions, the
                    broadest honest picture of where somebody stands

   NO CLOCK, AND HOW THAT IS ACHIEVED WITHOUT TOUCHING core.js. The countdown
   is rendered only when S.mode is 'mock' (core.js) or 'mock'/'sim'
   (codex3.js). These three modes are none of those, so the timer markup is
   never reached and startTimer is never called. That matters because core.js
   is one of the two worst-diverged files between the standalone and the
   monorepo wing, and an edit there is two different edits. The Lightning
   Round keeps its per-question thirty seconds, which is correct: there speed
   IS the skill. Sudden Death is untouched.

   NO PASS MARK. codex11 already refuses to stamp PASS outside exam mode and
   says so in as many words. This layer goes further for its own three: it
   states the standard a sommelier at this rank is expected to meet, shows the
   result by section, and names the two or three sections to work on next. A
   reader is never told they failed, because they are not sitting anything.

   WHAT IS REUSED RATHER THAN REBUILT
     DRILL_GROUPS  core.js, already the seven-band grouping, already swapped
                   per rank by applyLevel. There is no second category map.
     stratMock     core.js, whose largest-remainder quota logic examSample
                   follows exactly, generalised to take a list and an n
                   instead of reading the MOCK_N global.
     doorAnchor    codex16, which already solves the two-tree problem of where
                   a band of doors goes on a home page built two ways.
     MODE_NOUNS    codex11, so there is one vocabulary and not two.

   House rules observed: var and function only at the top level, no pictorial
   glyphs, no em-dashes, and ST.exams carries a mergeStats clause because a
   store nobody merges silently vanishes on import, which this project has
   learned four times. */


/* The Codex builds HTML by concatenation and has no escape helper of its own,
   because every string it prints is authored rather than typed by a reader.
   These strings are authored too, but seven category names carry an ampersand
   (Spirits & Cocktails, Jura, Savoie & Corsica) and they travel through data
   attributes here, so they are escaped properly rather than relying on a
   browser's tolerance for a bare ampersand. */
function v19Esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ═══════════ what the examinations are ═══════════ */

var EXAM_LEN = { secexam: 15, domexam: 25, finals: 40 };

var EXAM_TITLE = {
  secexam: 'Section Exam',
  domexam: 'Domain Exam',
  finals: 'The Finals'
};

/* Named for the reader, not for the engine. MODE_NOUNS is codex11's, and the
   results screen reads it, so the three modes are registered there too. */
if (typeof MODE_NOUNS === 'object' && MODE_NOUNS) {
  MODE_NOUNS.secexam = 'Section Exam';
  MODE_NOUNS.domexam = 'Domain Exam';
  MODE_NOUNS.finals = 'The Finals';
}
if (typeof MODE_LABEL === 'object' && MODE_LABEL) {
  MODE_LABEL.secexam = 'Section Exam';
  MODE_LABEL.domexam = 'Domain Exam';
  MODE_LABEL.finals = 'The Finals';
}

function examIsOurs(m) { return m === 'secexam' || m === 'domexam' || m === 'finals'; }

/* The standard for the rank. LEVELS carries a pass fraction already; this
   layer reads it as a standard to reach rather than a bar to clear, which is
   the same number said honestly. */
function examStandard() {
  var lv = (typeof LEVELS !== 'undefined' && LEVELS[activeLevel]) || null;
  var p = lv && lv.pass;
  return Math.round((p || 0.6) * 100);
}

/* ═══════════ choosing the questions ═══════════

   stratMock's arithmetic, generalised. Take the questions of the categories
   asked for, give each category a quota proportional to its size, floor it,
   then hand the remaining places to the largest fractional remainders. A
   thin section is not padded by repetition: it contributes what it has and
   the paper is shorter, and the report says so. */
function examSample(cats, n) {
  var want = {}; var i;
  for (i = 0; i < cats.length; i++) want[cats[i]] = 1;
  var byCat = {};
  QUESTIONS.forEach(function (q) {
    if (!want[q.cat]) return;
    (byCat[q.cat] = byCat[q.cat] || []).push(q);
  });
  var keys = Object.keys(byCat);
  if (!keys.length) return [];
  var total = keys.reduce(function (s, c) { return s + byCat[c].length; }, 0);
  if (n >= total) return shuffle(QUESTIONS.filter(function (q) { return want[q.cat]; }));

  var quotas = keys.map(function (c) {
    var exact = n * byCat[c].length / total;
    return { c: c, exact: exact, base: Math.floor(exact) };
  });
  var used = quotas.reduce(function (s, x) { return s + x.base; }, 0);
  quotas.sort(function (a, b) { return (b.exact - b.base) - (a.exact - a.base); });
  for (i = 0; used < n; i++, used++) quotas[i % quotas.length].base++;
  var pool = [];
  quotas.forEach(function (x) { pool = pool.concat(shuffle(byCat[x.c]).slice(0, x.base)); });
  return shuffle(pool);
}

/* The seven bands, filtered to what this rank actually carries. Returns
   [label, [cat, ...]] exactly as drillPick builds it, including the More
   bucket, so a category that is added to a bank can never become unreachable
   from here either. */
function examDomains() {
  var c = cats();
  var grouped = {};
  DRILL_GROUPS.forEach(function (g) { g[1].forEach(function (k) { grouped[k] = 1; }); });
  var out = DRILL_GROUPS.map(function (g) {
    return [g[0], g[1].filter(function (k) { return c[k]; })];
  }).filter(function (g) { return g[1].length; });
  var extras = Object.keys(c).filter(function (k) { return !grouped[k]; }).sort();
  if (extras.length) out.push(['More', extras]);
  return out;
}

function examDomainByLabel(label) {
  var ds = examDomains();
  for (var i = 0; i < ds.length; i++) if (ds[i][0] === label) return ds[i];
  return null;
}

/* ═══════════ sitting one ═══════════

   Every one of these calls stopTimer first and never calls startTimer. The
   engine does the rest: the quiz view, the grader, statRecord and srsRecord
   all run exactly as they do for a drill. */
function examBegin(mode, scope, pool) {
  if (!pool || !pool.length) return;
  if (typeof pacerStop === 'function') { /* no pacer in this app; guard is harmless */ }
  S.mode = mode;
  S.section = scope;
  S._exam = { mode: mode, scope: scope, asked: pool.length };
  S.pool = pool;
  S.idx = 0; S.correct = 0; S.results = [];
  stopTimer();
  resetQ();
  S.view = 'quiz';
  render();
  window.scrollTo(0, 0);
}

function startSectionExam(cat) {
  examBegin('secexam', cat, examSample([cat], EXAM_LEN.secexam));
}

function startDomainExam(label) {
  var d = examDomainByLabel(label);
  if (!d) return;
  examBegin('domexam', label, examSample(d[1], EXAM_LEN.domexam));
}

function startFinals() {
  var all = Object.keys(cats());
  examBegin('finals', 'The Finals', examSample(all, EXAM_LEN.finals));
}

/* ═══════════ the record ═══════════

   ST.exams[level][mode + ':' + scope] = {best, last, n}
   best is the highest percentage reached, last the most recent, n how many
   sittings. Only sittings of five or more answers are recorded, matching
   codex4's threshold for the session history: a paper abandoned on the second
   question is not a result. */
ST.exams = ST.exams || {};

function examScopeKey(mode, scope) { return mode + ':' + scope; }

function examRecord() {
  var e = S._exam;
  if (!e) return;
  var done = S.results.length;
  if (done < 5) return;
  var pct = Math.round(100 * S.correct / done);
  var lvl = ST.exams[activeLevel] = ST.exams[activeLevel] || {};
  var k = examScopeKey(e.mode, e.scope);
  var rec = lvl[k] = lvl[k] || { best: 0, last: 0, n: 0 };
  if (pct > (rec.best || 0)) rec.best = pct;
  rec.last = pct;
  rec.n = (rec.n || 0) + 1;
  stSave();
}

var _v19Finish = finish;
finish = function () {
  var ours = examIsOurs(S.mode);
  var out = _v19Finish.apply(this, arguments);
  if (ours) { try { examRecord(); } catch (e) {} }
  return out;
};

/* ═══════════ the report ═══════════

   Not a verdict. The standard for the rank, what was reached, and the
   sections worth the next hour. codex11 already strips the PASS stamp for
   anything that is not S.mode 'mock' or 'sim', and these three are neither,
   so nothing here has to undo a pass mark: it only has to add the part that
   is actually useful. */
function examBySection() {
  var by = {};
  S.results.forEach(function (r) {
    var q = r.q || r;
    var cat = q.cat || 'Other';
    var row = by[cat] = by[cat] || { n: 0, c: 0 };
    row.n++;
    if (r.ok) row.c++;
  });
  return by;
}

function examReportHtml() {
  var e = S._exam;
  if (!e) return '';
  var done = S.results.length;
  if (!done) return '';
  var pct = Math.round(100 * S.correct / done);
  var std = examStandard();
  var by = examBySection();

  var rows = Object.keys(by).map(function (cat) {
    var r = by[cat];
    return { cat: cat, n: r.n, c: r.c, pct: Math.round(100 * r.c / r.n) };
  }).sort(function (a, b) { return a.pct - b.pct; });

  /* Only sections with enough asked to mean anything are named as work: one
     question answered wrongly is not evidence of a weak section. */
  var weak = rows.filter(function (r) { return r.n >= 2 && r.pct < std; }).slice(0, 3);

  var head = '<div class="label" style="margin-top:22px">The standard</div>' +
    '<p class="px">A sommelier at ' + v19Esc(LEVELS[activeLevel].short || activeLevel) +
    ' is expected to hold ' + std + ' per cent of this material. You answered ' +
    S.correct + ' of ' + done + ', which is ' + pct + ' per cent.' +
    (e.asked > done ? ' You stopped before the end, so this counts what you reached.' : '') +
    '</p>';

  var next = weak.length
    ? '<div class="label" style="margin-top:18px">Worth the next hour</div>' +
      weak.map(function (r) {
        return '<button class="secbtn" data-examdrill="' + v19Esc(r.cat) + '">' +
          '<span>' + v19Esc(r.cat) + '</span><span class="n">' + r.pct + '%</span></button>';
      }).join('')
    : '<div class="label" style="margin-top:18px">Worth the next hour</div>' +
      '<p class="px">Nothing in this paper fell below the standard. Take a wider one, or ' +
      'go and taste.</p>';

  var table = '<div class="label" style="margin-top:18px">By section</div>' +
    rows.map(function (r) {
      return '<div class="lgrow"><b>' + v19Esc(r.cat) + '</b><span>' + r.c + ' of ' + r.n +
        ' · ' + r.pct + '%</span></div>';
    }).join('');

  return '<div class="examreport">' + head + next + table + '</div>';
}

var _v19ResultsView = resultsView;
resultsView = function () {
  var v = _v19ResultsView.apply(this, arguments);
  try {
    if (examIsOurs(S.mode)) {
      /* codex11 subtitles every non-mock result 'not an examination, so no pass
         mark is given'. True of a drill, and odd on a screen headed Section
         Exam: these ARE examinations, they simply are not marked pass or fail.
         The wording is corrected here rather than in codex11, whose sentence is
         right for the modes it was written for. */
      var sub = v.querySelector('.result-hero .sub2');
      if (sub && /no pass mark/.test(sub.textContent || '')) {
        sub.textContent = (MODE_NOUNS[S.mode] || 'Examination') +
          ' · measured against the standard for this rank, not marked pass or fail.';
      }
      var extra = examReportHtml();
      if (extra) {
        var box = el('<div>' + extra + '</div>');
        box.querySelectorAll('[data-examdrill]').forEach(function (b) {
          b.onclick = function () { startDrill(b.getAttribute('data-examdrill')); };
        });
        v.appendChild(box);
      }
    }
  } catch (e) { /* a report that will not build must never eat the score */ }
  return v;
};

/* ═══════════ the examination hall ═══════════ */

function examPctOf(mode, scope) {
  var lvl = ST.exams[activeLevel];
  var r = lvl && lvl[examScopeKey(mode, scope)];
  return r ? r.best : null;
}

function examStatLine(mode, scope) {
  var p = examPctOf(mode, scope);
  return p === null ? 'not yet sat' : 'best ' + p + '%';
}

function examHallView() {
  var c = cats();
  var std = examStandard();
  var domains = examDomains();

  var finalsLine = examStatLine('finals', 'The Finals');
  var finals = '<div class="label">The Finals</div>' +
    '<p class="px" style="color:var(--gold-soft)">Every section of ' +
      v19Esc(LEVELS[activeLevel].short || activeLevel) + ' at once, ' + EXAM_LEN.finals +
      ' questions, drawn in proportion to how much of the rank each section is. ' +
      'No clock. The broadest honest picture of where you stand.</p>' +
    '<button class="btn" id="ex-finals">Sit the Finals · ' + v19Esc(finalsLine) + '</button>';

  var doms = '<div class="label" style="margin-top:24px">Domain exams</div>' +
    '<p class="px" style="color:var(--gold-soft)">Twenty five questions across a whole ' +
      'band. This is the real test of a region.</p>' +
    '<div class="seclist">' + domains.map(function (d) {
      var n = d[1].reduce(function (s, k) { return s + (c[k] || 0); }, 0);
      return '<button class="secbtn" data-dom="' + v19Esc(d[0]) + '">' +
        '<span>' + v19Esc(d[0]) + '</span><span class="n">' + v19Esc(examStatLine('domexam', d[0])) +
        '</span></button>';
    }).join('') + '</div>';

  var secs = '<div class="label" style="margin-top:24px">Section exams</div>' +
    '<p class="px" style="color:var(--gold-soft)">Fifteen questions on one topic, or the whole ' +
      'section where it holds fewer. A quick and honest check.</p>' +
    domains.map(function (d) {
      return '<div class="secgroup">' + v19Esc(d[0]) + '</div><div class="seclist">' +
        d[1].map(function (k) {
          return '<button class="secbtn" data-sec="' + v19Esc(k) + '">' +
            '<span>' + v19Esc(k) + '</span><span class="n">' + v19Esc(examStatLine('secexam', k)) +
            '</span></button>';
        }).join('') + '</div>';
    }).join('');

  var v = el('<div>' +
    '<div class="viewhead"><h2>Examinations</h2><div class="sub">' +
      'The standard at this rank is ' + std + ' per cent. None of these is timed: ' +
      'the clock belongs to the Lightning Round, where speed is the point.</div></div>' +
    finals + doms + secs +
    '</div>');

  var fb = v.querySelector('#ex-finals');
  if (fb) fb.onclick = function () { startFinals(); };
  v.querySelectorAll('[data-dom]').forEach(function (b) {
    b.onclick = function () { startDomainExam(b.getAttribute('data-dom')); };
  });
  v.querySelectorAll('[data-sec]').forEach(function (b) {
    b.onclick = function () { startSectionExam(b.getAttribute('data-sec')); };
  });
  return v;
}

var _v19Render = render;
render = function () {
  if (S.view === 'exams') {
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    stopTimer();
    var app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(topbar());
    app.appendChild(examHallView());
    window.scrollTo(0, 0);
    return;
  }
  return _v19Render.apply(this, arguments);
};

/* ═══════════ the door ═══════════

   codex16's doorAnchor already solves where a band goes on a home page that
   two trees build two different ways, so this borrows it rather than solving
   it again. If it is absent, the door is simply not inserted: a missing tile
   is a smaller failure than a home page that throws. */
var _v19DecorateHome = (typeof decorateHome === 'function') ? decorateHome : null;
if (_v19DecorateHome) {
  decorateHome = function () {
    var out = _v19DecorateHome.apply(this, arguments);
    try {
      if (document.getElementById('t-exams')) return out;
      if (typeof doorAnchor !== 'function') return out;
      var anchor = doorAnchor();
      if (!anchor || !anchor.parentNode) return out;
      var band = el('<div class="oot-sec homesec" id="t-exams">' +
        '<div class="oot-sec-head homesec-head"><h2>Examinations</h2>' +
        '<span>Section, domain and the Finals. No clock.</span></div>' +
        '<div class="modes">' +
          '<button class="mode" data-exdoor="exams"><h3>Examinations</h3>' +
            '<p>Sit a section, a domain, or the whole rank. Untimed.</p></button>' +
        '</div></div>');
      band.querySelectorAll('[data-exdoor]').forEach(function (b) {
        b.onclick = function () { S.view = 'exams'; render(); };
      });
      anchor.parentNode.insertBefore(band, anchor);

      /* The old timed mock and its simulation menu come off the home page.
         They are not deleted: startMock, startSim and the Gauntlet still work
         and codex8's oral machinery still depends on them, so anything that
         reaches them by another door is untouched. They simply stop being the
         first thing a reader is offered, because a clock is not what this app
         is for any more. Hidden rather than removed from the markup, since
         codex14 builds these tiles and it is the worst-diverged file in the
         two trees. */
      ['m-mock', 't-sim'].forEach(function (id) {
        var t = document.getElementById(id);
        if (t) t.hidden = true;
      });
    } catch (e) { /* never take the home page down for a tile */ }
    return out;
  };
}

/* ═══════════ the merge clause ═══════════

   ST.exams is a new store, and a store with no clause here is thrown away by
   every import. Best takes the higher of the two, n sums the sittings, last
   takes the incoming value because the file being imported is the more recent
   account of what the reader did. */
var _v19MergeStats = mergeStats;
mergeStats = function (inc) {
  var before = JSON.parse(JSON.stringify(ST.exams || {}));
  var out = _v19MergeStats.apply(this, arguments);
  try {
    /* the stores live under inc.stats, not on the root: an import is a file,
       and codex4 and codex8 both unwrap it the same way. Reading inc.exams
       here would have merged nothing and the store would have been dropped on
       every import, which is the exact defect this clause exists to prevent. */
    var incoming = (inc && inc.stats && inc.stats.exams) || {};
    var merged = JSON.parse(JSON.stringify(before));
    Object.keys(incoming).forEach(function (lvl) {
      merged[lvl] = merged[lvl] || {};
      Object.keys(incoming[lvl] || {}).forEach(function (k) {
        var a = merged[lvl][k] || { best: 0, last: 0, n: 0 };
        var b = incoming[lvl][k] || {};
        merged[lvl][k] = {
          best: Math.max(Number(a.best) || 0, Number(b.best) || 0),
          last: (Number(b.last) || Number(a.last) || 0),
          /* MAX, NOT SUM. codex17 exists because three stores summed on
             import, so a laptop to phone to laptop trip doubled them and then
             quadrupled them while the app said nothing had changed. A count
             that sums is not idempotent and this store will be re-imported.
             Max never inflates, and the worst it costs is that sittings done
             on two devices are not added together, which is a smaller lie
             than a number that grows every time a file is opened. */
          n: Math.max(Number(a.n) || 0, Number(b.n) || 0)
        };
      });
    });
    ST.exams = merged;
  } catch (e) { ST.exams = before; }
  return out;
};
