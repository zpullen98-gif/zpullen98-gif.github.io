/* First Light: search.

   The artifact had none, and there is a lot in here: 366 dated voices, 31 goals,
   seven chambers, eight threads, the body chapter, the astrology chapter, whatever
   you have written, and up to 62,000 verses of scripture. Without search, a
   half-remembered line is gone.

   HOW IT WORKS, and why it is not an index.

   Building an inverted index over 62,000 verses at boot would cost a second or two
   of blocking work on a phone, every launch, to serve a feature used occasionally.
   So this scans instead, but only over what is already in memory. Scripture is
   scanned per work and only for works the reader has actually opened, which is
   exactly the set they can search meaningfully anyway.

   The corpus that is always searchable (the almanac, goals, chambers, threads,
   journal) is small, a few hundred kilobytes, and a linear scan over it is
   imperceptible. */

var SEARCH_MAX = 60;

function sNorm(s) {
  /* Fold diacritics so "Patanjali" finds "Patañjali" and "Sunyata" finds "Śūnyatā".
     Readers do not type the marks, and a search that requires them is a search that
     silently fails for the most interesting words in the app. */
  return String(s == null ? '' : s).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, "'");
}

function sHit(text, q) { return sNorm(text).indexOf(q) > -1; }

/* A short window around the match, so results show why they matched. */
function sSnippet(text, q, span) {
  var t = String(text), n = sNorm(t), i = n.indexOf(q);
  span = span || 110;
  if (i < 0) return t.slice(0, span) + (t.length > span ? '…' : '');
  var start = Math.max(0, i - Math.floor(span / 3));
  var end = Math.min(t.length, start + span);
  return (start > 0 ? '…' : '') + t.slice(start, end).trim() + (end < t.length ? '…' : '');
}

function sMark(text, q) {
  var n = sNorm(text), i = n.indexOf(q);
  if (i < 0) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}

function flSearch(query) {
  var q = sNorm(query).trim();
  var results = [];
  if (q.length < 2) return { query: query, tooShort: true, results: results, counts: {} };

  var counts = {};
  var push = function (group, title, sub, snippet, href) {
    counts[group] = (counts[group] || 0) + 1;
    if (results.length < SEARCH_MAX * 4) {
      results.push({ group: group, title: title, sub: sub, snippet: snippet, href: href });
    }
  };

  /* --- the almanac --- */
  var track = FL.prefs.track || 'philosophers';
  var TQ = trackQ();
  Object.keys(TQ).forEach(function (m) {
    TQ[m].forEach(function (e) {
      if (sHit(e[1], q) || sHit(e[2], q) || sHit(e[3], q)) {
        push('The Year', trackMonths()[m - 1][0] + ' ' + e[0], e[2] + ' · ' + e[3], e[1], '#/year');
      }
    });
  });
  trackMonths().forEach(function (mo, i) {
    if (sHit(mo[1], q) || sHit(mo[2], q)) push('The Year', mo[0], mo[1], mo[2], '#/year');
  });

  /* --- the goal ladder --- */
  LIFE.forEach(function (tier) {
    tier[2].forEach(function (g) {
      /* the same substitution ui-life makes: with the readings off, search
         must neither match nor display the scriptural originals */
      var quote = FL.prefs.canonLines === 'on' ? g[1] : (LIFE_ALT[g[0]] || g[1]);
      if (sHit(g[0], q) || sHit(quote, q)) push('A Life Well Lived', g[0], 'The ' + tier[0] + ' Goals', quote, '#/life');
    });
  });

  /* --- practices and reflections --- */
  PRACTICES.forEach(function (p) {
    if (sHit(p[0], q) || sHit(p[1], q)) push('Practices', p[0], 'Daily practice', p[1], '#/today');
  });
  REFLECTIONS.forEach(function (r) {
    if (sHit(r, q)) push('Practices', 'Reflection', '', r, '#/today');
  });

  /* --- the chambers ---
     Gated on the same choice as the morning page: a reader who kept the Library
     behind its door should not meet scripture through the side door of search.
     Opening the readings opens the search with them. */
  if (FL.prefs.canonLines === 'on' && typeof FL_TRADITIONS !== 'undefined') FL_TRADITIONS.forEach(function (tr) {
    var href = '#/library/' + tr.id;
    if (sHit(tr.name, q) || sHit(tr.also, q) || sHit(tr.era, q)) {
      push('Traditions', tr.name, tr.also, tr.era, href);
    }
    tr.opening.forEach(function (p) { if (sHit(p, q)) push('Traditions', tr.name, 'What it is', p, href); });
    tr.concepts.forEach(function (c) {
      if (sHit(c[0], q) || sHit(c[1], q)) push('Traditions', c[0], tr.name + ' · concept', c[1], href);
    });
    tr.figures.forEach(function (f) {
      if (sHit(f[0], q) || sHit(f[2], q)) push('Traditions', f[0], tr.name + ' · ' + f[1], f[2], href);
    });
    tr.practices.forEach(function (p) {
      if (sHit(p[0], q) || sHit(p[1], q)) push('Traditions', p[0], tr.name + ' · practice', p[1], href);
    });
    tr.festivals.forEach(function (f) {
      if (sHit(f[0], q) || sHit(f[2], q)) push('Traditions', f[0], tr.name + ' · ' + f[1], f[2], href);
    });
    if (sHit(tr.reading, q)) push('Traditions', tr.name, 'Where to begin', tr.reading, href);
  });

  /* --- the threads --- */
  if (FL.prefs.canonLines === 'on' && typeof FL_THREADS !== 'undefined') FL_THREADS.forEach(function (th) {
    var href = '#/threads/' + th.id;
    if (sHit(th.title, q) || sHit(th.question, q) || sHit(th.intro, q) || sHit(th.close, q)) {
      push('Threads', th.title, th.question, th.intro, href);
    }
    th.voices.forEach(function (v) {
      if (sHit(v.text, q) || sHit(v.cite, q)) {
        var tr = traditionById(v.t);
        push('Threads', th.title, (tr ? tr.name : v.t) + ' · ' + v.cite, v.text, href);
      }
    });
  });

  /* --- the body --- */
  BODY_TEACH.forEach(function (t) {
    if (sHit(t[0], q) || sHit(t[1], q)) push('The Body', t[0], 'Teaching', String(t[1]).replace(/<[^>]+>/g, ''), '#/body');
  });
  EIGHT_LIMBS.forEach(function (l, i) {
    if (sHit(l[0], q) || sHit(l[1], q)) push('The Body', l[0], 'Limb ' + (i + 1), l[1], '#/body');
  });

  /* --- astrology --- */
  SIGNS.forEach(function (s) {
    if (sHit(s.n, q) || sHit(s.d, q) || sHit(s.kw, q) || sHit(s.s, q)) {
      push('Astrology', s.n, s.el + ' · ' + s.mo + ' · ruled by ' + s.ru, s.d, '#/astro');
    }
  });
  A_PLANETS.forEach(function (p) {
    if (sHit(p[0], q) || sHit(p[1], q) || sHit(p[2], q)) push('Astrology', p[0], p[1], p[2], '#/astro');
  });
  A_HOUSES.forEach(function (h, i) {
    if (sHit(h[0], q) || sHit(h[1], q)) push('Astrology', h[0], 'House ' + (i + 1), h[1], '#/astro');
  });

  /* --- your own writing ---
     First among equals: what you wrote is the hardest thing to find any other way. */
  jAll().forEach(function (e) {
    /* Clear Mornings notes render only in their own room: structural privacy,
       not a preference */
    if (String(e.ref).indexOf('clear:') === 0) return;
    if (sHit(e.text, q)) push('Your journal', jLabel(e.ref), jPrettyDate(e.d), e.text, jHref(e.ref));
  });

  /* --- scripture already on the device --- */
  sSearchScripture(q, push);

  /* Journal first, then the almanac, then everything else: ordered by how likely
     the reader is to be looking for it rather than by corpus size. */
  var order = ['Your journal', 'The Year', 'Scripture', 'Threads', 'Traditions',
               'A Life Well Lived', 'Practices', 'The Body', 'Astrology'];
  results.sort(function (a, b) { return order.indexOf(a.group) - order.indexOf(b.group); });

  return { query: query, results: results.slice(0, SEARCH_MAX), counts: counts,
           total: Object.keys(counts).reduce(function (s, k) { return s + counts[k]; }, 0) };
}

/* Scans only what is loaded. A work the reader has never opened is not in memory and
   is not scanned, which is honest, and the UI says so rather than pretending the
   whole library was searched. */
function sSearchScripture(q, push) {
  if (typeof FL_TEXT === 'undefined' || typeof FL_LIBRARY === 'undefined') return;

  Object.keys(FL_TEXT).forEach(function (work) {
    var L = FL_LIBRARY[work];
    if (!L) return;
    var title = L.title;

    Object.keys(FL_TEXT[work]).forEach(function (part) {
      var d = FL_TEXT[work][part];
      if (!d) return;

      if (d.ch) {                                   // bible / tanakh
        d.ch.forEach(function (verses, ci) {
          verses.forEach(function (t, vi) {
            if (sHit(t, q)) push('Scripture', d.book + ' ' + (ci + 1) + ':' + (vi + 1), title, t,
                                 '#/library/read/' + work + '/' + part);
          });
        });
      } else if (d.hymns) {                          // rigveda
        d.hymns.forEach(function (hy) {
          hy.v.forEach(function (t, vi) {
            if (sHit(t, q)) push('Scripture', 'Mandala ' + d.mandala + '.' + hy.h + '.' + (vi + 1), title, t,
                                 '#/library/read/' + work + '/' + part);
          });
        });
      } else if (work === 'quran') {
        d.forEach(function (s) {
          s.v.forEach(function (t, vi) {
            if (sHit(t, q)) push('Scripture', s.name + ' ' + s.n + ':' + (vi + 1), title, t,
                                 '#/library/read/quran/all');
          });
        });
      } else if (work === 'dhammapada') {
        d.forEach(function (c) {
          c.v.forEach(function (v) {
            if (sHit(v[1], q)) push('Scripture', 'Dhammapada ' + v[0], title + ' · ' + c.title, v[1],
                                    '#/library/read/dhammapada/all');
          });
        });
      } else if (work === 'analects') {
        d.forEach(function (bk) {
          bk.ch.forEach(function (c) {
            var t = c.b.map(function (b) { return b.join(' '); }).join(' ');
            if (sHit(t, q)) push('Scripture', 'Analects ' + bk.n + '.' + c.n, title, t,
                                 '#/library/read/analects/all');
          });
        });
      } else if (Array.isArray(d)) {                 // gita / tao / zhuangzi
        d.forEach(function (c) {
          var t = c.b.map(function (b) { return b.join(' '); }).join(' ');
          if (sHit(t, q)) push('Scripture', title + ' ' + c.n, title, t,
                               '#/library/read/' + work + '/' + part);
        });
      }
    });
  });
}

/* Which works are in memory and therefore searchable: the UI is explicit about it. */
function sScriptureScope() {
  if (typeof FL_TEXT === 'undefined') return { loaded: [], all: [] };
  var loaded = Object.keys(FL_TEXT).filter(function (w) {
    return FL_LIBRARY[w] && Object.keys(FL_TEXT[w]).length;
  }).map(function (w) { return FL_LIBRARY[w].title; });
  var all = Object.keys(FL_LIBRARY || {}).map(function (w) { return FL_LIBRARY[w].title; });
  return { loaded: loaded, all: all };
}
