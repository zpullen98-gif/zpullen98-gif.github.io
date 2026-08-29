/* First Light: The Library.

   Replaces the artifact's Study Hall, which was five reading plans that fetched a
   passage a day from four third-party services and had no way to open a book.

   Four surfaces, one route:
     #/library                    the shelf: traditions and what each holds
     #/library/<tradition>        the chamber: the authored orientation
     #/library/read/<work>        a work's contents
     #/library/read/<work>/<part> a book or chapter, with the text

   The reading plans keep their own view (#/hall), because the plan is a daily
   discipline and the Library is a place to wander. They link to each other. */

var libWork = null, libPart = null, libChapter = null;

function libHas(workId) { return !!(typeof FL_LIBRARY !== 'undefined' && FL_LIBRARY[workId]); }

/* --- rendering a block of text ---
   Verse works keep their lineation; prose is joined. The heuristic is average line
   length, because the source files preserve the translator's line breaks and there
   is no other marker: Arnold's Gita and the poem sections of Legge's Tao Te Ching
   are verse, and setting them as paragraphs would quietly destroy them. */
function libBlock(lines) {
  var avg = lines.reduce(function (s, l) { return s + l.length; }, 0) / lines.length;
  if (avg < 62 && lines.length > 1) {
    return '<p class="passage verse">' + lines.map(esc).join('<br>') + '</p>';
  }
  return '<p class="passage">' + esc(lines.join(' ')) + '</p>';
}

function libVerses(arr, startAt) {
  return '<p class="passage">' + arr.map(function (t, i) {
    return '<span class="vnum">' + ((startAt || 1) + i) + '</span>' + esc(t) + ' ';
  }).join('') + '</p>';
}

/* --- the shelf --- */
function libShelf() {
  /* Count what is actually here rather than asserting a number. The Upanishads are
     still unbaked, and a header claiming ten works while showing nine is exactly the
     kind of small untruth this app spends its effort avoiding elsewhere. */
  var works = 0, bytesAll = 0;
  FL_TRADITIONS.forEach(function (tr) {
    tr.works.forEach(function (w) { if (libHas(w)) { works++; bytesAll += FL_LIBRARY[w].bytes; } });
  });
  var words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
               'nine', 'ten', 'eleven', 'twelve'];
  var wordFor = function (n) { return words[n] || String(n); };

  var out = '<div class="kick">' + wordFor(FL_TRADITIONS.length) + ' traditions, ' +
      wordFor(works) + ' works</div><h1>The Library</h1>' +
    '<p class="note">Complete scriptures, ' + FLBytes(bytesAll) + ' of them, held on this device. ' +
    'Nothing here needs a connection once it has been opened.</p>' +
    '<div class="drawrow" style="justify-content:center;margin-top:18px">' +
      '<a class="keep" href="#/threads">The threads: one question, seven answers</a>' +
      '<a class="keep" href="#/hall">The year’s reading plans</a>' +
    '</div>';

  out += FL_TRADITIONS.map(function (tr) {
    var works = tr.works.filter(libHas);
    var pending = tr.works.filter(function (w) { return !libHas(w); });
    var bytes = works.reduce(function (s, w) { return s + FL_LIBRARY[w].bytes; }, 0);

    var titles = works.map(function (w) {
      return '<a class="readmini" href="#/library/read/' + w + '">' + esc(FL_LIBRARY[w].title) + '</a>';
    }).join(' ');
    /* Say plainly when a text has not been baked yet rather than omitting it: a
       tradition silently missing its scripture reads as an editorial judgement. */
    var missing = pending.length
      ? '<div class="ds" style="margin-top:8px;color:var(--faint)">' +
        pending.length + (pending.length === 1 ? ' work is' : ' works are') + ' still being prepared.</div>'
      : '';

    return '<div class="canon">' +
      '<p class="pt">' + esc(tr.name) + '</p>' +
      '<div class="ds">' + esc(tr.also) + '</div>' +
      '<p class="cep">“' + esc(tr.epigraph[0]) + '”</p>' +
      '<div class="ds" style="margin-bottom:10px">' + esc(tr.epigraph[1]) + '</div>' +
      '<p class="ct">' + esc(tr.era) + '</p>' +
      '<div style="margin-top:12px">' + titles + '</div>' + missing +
      (bytes ? '<div class="ds" style="margin-top:8px">' + FLBytes(bytes) + ' of text</div>' : '') +
      '<div style="margin-top:12px"><a class="keep" href="#/library/' + tr.id + '">Enter the chamber</a></div>' +
    '</div>';
  }).join('');

  return out;
}

/* --- a tradition's chamber --- */
function libChamber(tr) {
  var list = function (arr, fn) { return arr.map(fn).join(''); };

  var works = tr.works.filter(libHas).map(function (w) {
    var L = FL_LIBRARY[w];
    return '<div class="limb"><div><div class="gt">' +
      '<a href="#/library/read/' + w + '">' + esc(L.title) + '</a></div>' +
      '<div class="gp">' + esc(L.translation) + ' · ' + FLBytes(L.bytes) + '</div></div></div>';
  }).join('');

  return '' +
    '<a class="keep" style="margin-bottom:20px" href="#/library">← The Library</a>' +
    '<div class="kick">' + esc(tr.era) + '</div>' +
    '<h1>' + esc(tr.name) + '</h1>' +
    '<p class="note">' + esc(tr.also) + '</p>' +
    '<p class="mintro">“' + esc(tr.epigraph[0]) + '”<br><span class="ds">' + esc(tr.epigraph[1]) + '</span></p>' +

    '<div class="label">What it is</div>' +
    tr.opening.map(function (p) { return '<p class="px" style="margin-bottom:14px">' + esc(p) + '</p>'; }).join('') +

    '<div class="label">Its scriptures</div>' + works +

    '<div class="label">The words it thinks in</div>' +
    list(tr.concepts, function (c) {
      return '<div class="limb"><div><div class="gt">' + esc(c[0]) + '</div>' +
             '<div class="gp">' + esc(c[1]) + '</div></div></div>';
    }) +

    '<div class="label">Voices</div>' +
    list(tr.figures, function (f) {
      return '<div class="limb"><div><div class="gt">' + esc(f[0]) +
             ' <span class="ds">' + esc(f[1]) + '</span></div>' +
             '<div class="gp">' + esc(f[2]) + '</div></div></div>';
    }) +

    '<div class="label">Its branches</div>' +
    list(tr.branches, function (b) {
      return '<div class="limb"><div><div class="gt">' + esc(b[0]) + '</div>' +
             '<div class="gp">' + esc(b[1]) + '</div></div></div>';
    }) +

    '<div class="label">What its people actually do</div>' +
    list(tr.practices, function (p) {
      return '<div class="limb"><div><div class="gt">' + esc(p[0]) + '</div>' +
             '<div class="gp">' + esc(p[1]) + '</div></div></div>';
    }) +

    '<div class="label">Its year</div>' +
    list(tr.festivals, function (f) {
      return '<div class="limb"><div><div class="gt">' + esc(f[0]) +
             ' <span class="qtr">' + esc(f[1]) + '</span></div>' +
             '<div class="gp">' + esc(f[2]) + '</div></div></div>';
    }) +

    '<div class="label">Where to begin</div>' +
    '<div class="card"><p class="px">' + esc(tr.reading) + '</p></div>';
}

/* --- a work's contents --- */
function libContents(workId) {
  var L = FL_LIBRARY[workId];
  var tr = traditionOfWork(workId);
  var head = '<a class="keep" style="margin-bottom:20px" href="' +
      (tr ? '#/library/' + tr.id : '#/library') + '">← ' + esc(tr ? tr.name : 'The Library') + '</a>' +
    '<div class="kick">' + esc(L.translation) + '</div>' +
    '<h1>' + esc(L.title) + '</h1>' +
    '<p class="note">' + esc(L.license) + ' · via ' + esc(L.source) + ' · ' + FLBytes(L.bytes) + '</p>';

  /* Multi-file works (Bible, Tanakh, Rig Veda) list their books. Single-file works
     list chapters straight away. */
  if (L.parts && L.parts.length > 1) {
    var sections = {}, order = [];
    L.parts.forEach(function (p) {
      var s = p.section || '';
      if (!sections[s]) { sections[s] = []; order.push(s); }
      sections[s].push(p);
    });
    return head + order.map(function (s) {
      return (s ? '<div class="label">' + esc(s) + '</div>' : '<div class="label">Books</div>') +
        '<div class="months" style="justify-content:flex-start">' +
        sections[s].map(function (p) {
          return '<a class="mchip" href="#/library/read/' + workId + '/' + p.part + '">' +
                 esc(p.book || ('Mandala ' + p.mandala)) + '</a>';
        }).join('') + '</div>';
    }).join('');
  }

  return head + '<div class="label">Open it</div>' +
    '<a class="btn" href="#/library/read/' + workId + '/all">Read</a>';
}

/* --- the reader --- */
function libReader(workId, part) {
  var L = FL_LIBRARY[workId];
  var data = FL_TEXT[workId] && FL_TEXT[workId][part];
  var back = '<a class="keep" style="margin-bottom:20px" href="#/library/read/' + workId + '">← ' + esc(L.title) + '</a>';
  if (!data) return back + '<p class="loadnote" id="lib-loading">Opening…</p>';

  /* bible / tanakh: {book, ch:[[verse,…],…]} */
  if (data.ch) {
    return back + '<h1>' + esc(data.book) + '</h1>' +
      '<p class="note">' + esc(L.translation) + '</p>' +
      data.ch.map(function (verses, i) {
        return '<div class="chaphead">' + esc(data.book) + ' ' + (i + 1) + '</div>' + libVerses(verses);
      }).join('') + libCredit(L);
  }

  /* rigveda: {mandala, hymns:[{h, deity, v:[…]}]} */
  if (data.hymns) {
    return back + '<h1>Mandala ' + data.mandala + '</h1>' +
      '<p class="note">' + esc(L.translation) + '</p>' +
      data.hymns.map(function (hy) {
        return '<div class="chaphead">Hymn ' + hy.h + (hy.deity ? ' · ' + esc(hy.deity) : '') + '</div>' +
               (hy.v.length ? libVerses(hy.v)
                 /* Griffith did translate this hymn; he exiled it to an appendix and
                    put part of it in Latin. Say that, rather than "unavailable": the
                    omission is a fact about the translation worth knowing. */
                 : '<p class="loadnote">Not translated here. ' +
                   (hy.note ? esc(hy.note) : 'Griffith omitted this hymn from the main text.') +
                   '</p>');
      }).join('') + libCredit(L);
  }

  /* quran: [{n,name,tr,ar,rev,v:[…]}] */
  if (workId === 'quran') {
    return back + '<h1>' + esc(L.title) + '</h1>' +
      '<p class="note">' + esc(L.translation) + ' · 114 surahs</p>' +
      data.map(function (s) {
        return '<div class="chaphead">' + s.n + '. ' + esc(s.name) + ': ' + esc(s.tr) +
               ' <span class="ds">' + esc(s.rev) + '</span></div>' + libVerses(s.v);
      }).join('') + libCredit(L);
  }

  /* dhammapada: [{title, v:[[num, text],…]}] */
  if (workId === 'dhammapada') {
    return back + '<h1>' + esc(L.title) + '</h1>' +
      '<p class="note">' + esc(L.translation) + ' · 423 verses</p>' +
      data.map(function (c, i) {
        return '<div class="chaphead">' + (i + 1) + '. ' + esc(c.title) + '</div><p class="passage">' +
          c.v.map(function (v) {
            return '<span class="vnum">' + esc(String(v[0])) + '</span>' + esc(v[1]) + ' ';
          }).join('') + '</p>';
      }).join('') + libCredit(L);
  }

  /* analects: [{n,title,ch:[{n,b:[[line,…],…]}]}] */
  if (workId === 'analects') {
    return back + '<h1>' + esc(L.title) + '</h1>' +
      '<p class="note">' + esc(L.translation) + ' · 20 books</p>' +
      data.map(function (bk) {
        return '<div class="chaphead">Book ' + bk.n + (bk.title ? ' · ' + esc(bk.title) : '') + '</div>' +
          bk.ch.map(function (c) {
            return '<div class="ds" style="margin:12px 0 4px">Chapter ' + c.n + '</div>' +
                   c.b.map(libBlock).join('');
          }).join('');
      }).join('') + libCredit(L);
  }

  /* gita / tao / zhuangzi / upanishads: [{n, title?, b:[[line,…],…]}]
     Use the section's own name where it has one: the Upanishads are Isa, Katha and
     Kena, not 1, 2 and 3. */
  return back + '<h1>' + esc(L.title) + '</h1>' +
    '<p class="note">' + esc(L.translation) + ' · ' + data.length +
      (data[0] && data[0].title ? ' sections' : ' chapters') + '</p>' +
    data.map(function (c) {
      var head = c.title ? esc(c.title) : ((workId === 'gita' ? 'Chapter ' : '') + c.n);
      return '<div class="chaphead">' + head + '</div>' + c.b.map(libBlock).join('');
    }).join('') + libCredit(L);
}

function libCredit(L) {
  return '<div class="apicredit">' + esc(L.translation) + ' · ' + esc(L.license) +
         ' · via ' + esc(L.source) + '</div>';
}

FL_VIEWS.library = {
  label: 'The Library',
  title: 'The Library',
  render: function (arg) {
    if (typeof FL_LIBRARY === 'undefined') {
      return '<h1>The Library</h1><p class="note">The library index did not load.</p>';
    }
    var parts = (arg || '').split('/');

    if (parts[0] === 'read' && parts[1]) {
      if (!libHas(parts[1])) {
        return '<a class="keep" href="#/library">← The Library</a>' +
               '<h1>Not here yet</h1><p class="note">That text has not been prepared.</p>';
      }
      libWork = parts[1];
      libPart = parts[2] || null;
      /* a mistyped part id must say 'not here', not promise a book that will
         appear 'once you open it online': that promise would be false forever */
      if (libPart && !(FL_LIBRARY[libWork].parts || []).some(function (pp) { return String(pp.part) === libPart; })) {
        return '<a class="keep" href="#/library/read/' + libWork + '">← ' + esc(FL_LIBRARY[libWork].title) + '</a>' +
               '<h1>Not here yet</h1><p class="note">That chapter is not part of this work.</p>';
      }
      return libPart ? libReader(libWork, libPart) : libContents(libWork);
    }

    if (parts[0]) {
      var tr = traditionById(parts[0]);
      if (tr) return libChamber(tr);
    }
    return libShelf();
  },

  after: function (arg) {
    var parts = (arg || '').split('/');
    if (parts[0] !== 'read' || !parts[1] || !parts[2]) return;
    var work = parts[1], part = parts[2];
    if (!FL_LIBRARY[work] || !(FL_LIBRARY[work].parts || []).some(function (pp) { return String(pp.part) === part; })) return;
    if (FLTextHas(work, part)) return;

    FLTextLoad(work, part).then(function () {
      /* Only re-render if the reader is still on this page: a slow book must not
         yank someone who has already navigated away. */
      if (flRoute.view === 'library' && (flRoute.arg || '') === arg) render();
    }).catch(function () {
      /* same guard as the success path: a slow failure must not write its
         message into whatever page the reader has since moved to */
      if (flRoute.view !== 'library' || (flRoute.arg || '') !== arg) return;
      var el = document.getElementById('lib-loading');
      if (!el) return;
      /* Do not branch on navigator.onLine. It reports true on a captive portal, and
         true again when the machine has a connection but this app's own host is
         unreachable, which is precisely the case a reader hits most often. The
         browser gives a script load no error detail, so the honest move is one
         sentence that is true whichever it was, and a next step that works for both. */
      el.innerHTML = 'This book has not been opened on this device yet, and it cannot be ' +
        'reached right now. Open it once while you have a connection and it stays for good.' +
        '<br><a class="readmini" style="margin-top:10px" href="#/library">← Back to the Library</a>';
    });
  }
};

/* --- the threads --- */
FL_VIEWS.threads = {
  label: 'Threads',
  title: 'The Threads',
  hidden: true,
  render: function (arg) {
    if (arg) {
      var th = threadById(arg);
      if (th) {
        return '<a class="keep" style="margin-bottom:20px" href="#/threads">← All threads</a>' +
          '<div class="kick">' + esc(th.question) + '</div>' +
          '<h1>' + esc(th.title) + '</h1>' +
          '<p class="px" style="margin:16px 0 8px">' + esc(th.intro) + '</p>' +
          th.voices.map(function (v) {
            var tr = traditionById(v.t);
            return '<div class="q">' +
              '<div class="qtr" style="margin-left:0">' + esc(tr ? tr.name : v.t) + '</div>' +
              '<p class="qt" style="margin-top:6px">“' + esc(v.text) + '”</p>' +
              '<span class="ds">' + esc(v.cite) + '</span></div>';
          }).join('') +
          '<div class="label">And yet</div>' +
          '<div class="card"><p class="px">' + esc(th.close) + '</p></div>';
      }
    }
    return '<a class="keep" style="margin-bottom:20px" href="#/library">← The Library</a>' +
      '<div class="kick">One question, seven answers</div>' +
      '<h1>The Threads</h1>' +
      '<p class="note">The same question put to every tradition in the Library, in its own words. Some of these converge remarkably. Others do not, and are left where they disagree.</p>' +
      FL_THREADS.map(function (t) {
        return '<div class="canon">' +
          '<p class="pt"><a href="#/threads/' + t.id + '">' + esc(t.title) + '</a></p>' +
          '<div class="ds">' + esc(t.question) + '</div>' +
          '<p class="ct" style="margin-top:10px">' + esc(t.intro.slice(0, 190)) + '…</p>' +
          '<div class="ds" style="margin-top:10px">' + t.voices.length + ' voices</div>' +
        '</div>';
      }).join('');
  }
};
