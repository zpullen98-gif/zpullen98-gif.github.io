/* ============ The Pass: what a manager can actually see ============
   In a kitchen the pass is where the kitchen meets the floor: the one surface
   where a manager sees everything going out. This is that, for training.

   WHAT IT CAN HONESTLY SHOW, AND WHY THAT IS THE SHAPE IT IS. A venue buys one
   subscription and its staff share one sign-in, and every wing keeps its
   progress in the browser it was made in. There is no server-side roster and no
   read path on `results` that could ever return another person's rows. So this
   reads what is genuinely available: every named profile ON THIS DEVICE, plus
   whatever has been imported from other devices.

   The strip says exactly that, rather than implying a live view of a whole
   team. A manager who is told the truth about the scope will trust the numbers;
   one who discovers the limit later will not trust anything again.

   HOW IT READS OTHER PEOPLE WITHOUT BECOMING THEM. Each wing's store sits at a
   namespaced localStorage key, so a manager's device can parse every profile's
   blob directly. That means this file knows the SHAPE of each wing's saved
   data, which is real coupling; it is confined to READERS below, documented,
   and it is coupling to a serialised format rather than to running code, which
   is the version that survives a wing being rewritten.

   Nothing here writes to a wing's store. It is a reader.
   ============ */

(function () {
  'use strict';

  var OOT = (window.OOT = window.OOT || {});
  if (OOT.pass) return;

  var DAY = 86400000;

  /* A day is a LOCAL day, the same one oot-profiles stamps p.lastDay with.
     toISOString here read tomorrow's date from 8pm Eastern, so the strip said
     nobody had studied on exactly the nights a closing crew opens it, while
     the chip beside it counted the streak. One definition, borrowed from
     oot-profiles; the fallback is the same arithmetic for a page that loaded
     this file without it. */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function localDay(offset) {
    if (OOT.profiles && typeof OOT.profiles.dayKey === 'function') return OOT.profiles.dayKey(offset);
    var d = new Date();
    if (offset) d.setDate(d.getDate() + offset);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  /* Where the site root is, discovered from this script's own src the way
     oot-bar.js does it, so The Pass is reachable from a wing at any depth and
     from the World Table's root-absolute paths alike. */
  function root() {
    try {
      var src = (document.currentScript && document.currentScript.src) || '';
      if (!src) {
        var t = document.querySelector('script[src*="oot-pass.js"]');
        src = t ? t.src : '';
      }
      return src ? src.replace(/shared\/oot-pass\.js.*$/, '') : '/';
    } catch (e) { return '/'; }
  }

  function esc(s) {
    return (OOT.home && OOT.home.esc) ? OOT.home.esc(s)
      : String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
      });
  }

  function readKey(base, profile) {
    var k = profile.legacy ? base : base + '::' + profile.id;
    try {
      var raw = localStorage.getItem(k);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  /* ---- the wing readers ----------------------------------------------
     One per wing. Each takes that wing's parsed blob and returns a small
     summary carrying at least { answered, due }, which the roster sums, plus
     whatever its own line() needs. A wing whose data is absent returns null
     and simply does not appear in that person's row, which is the correct
     rendering of "this person has not opened the Ledger".

     line(s) is the sentence the per-wing panel prints; pct(s) is the meter
     beside it, and a reader with no honest denominator leaves pct out, so
     the row renders without a bar rather than with an invented one. */
  var READERS = {
    codex: {
      label: 'Codex',
      base: 'codexStats',
      /* { q: { <questionId>: {c,w} }, days: { 'YYYY-MM-DD': n }, srs: {...} } */
      read: function (d) {
        if (!d || !d.q) return null;
        var ids = Object.keys(d.q), right = 0, wrong = 0;
        ids.forEach(function (k) { right += (d.q[k].c || 0); wrong += (d.q[k].w || 0); });
        var answered = right + wrong;
        if (!answered) return null;
        /* The Codex writes srs.due as a LOCAL YYYY-MM-DD (codex3.js addDays,
           since 5 Sep 2026), so the comparison is against the local day too. */
        var due = 0, now = localDay(0);
        if (d.srs) {
          Object.keys(d.srs).forEach(function (k) {
            if (d.srs[k] && d.srs[k].due && d.srs[k].due <= now) due++;
          });
        }
        return { seen: ids.length, answered: answered,
                 accuracy: Math.round(right / answered * 100), due: due,
                 days: d.days ? Object.keys(d.days).length : 0 };
      },
      /* The meter is raw accuracy over every answer ever given, so the
         line says 'right', not readiness: a person can be right 90% of the
         time across 20 questions and nowhere near ready for the exam. */
      line: function (s) { return 'Codex: ' + s.seen + ' met, ' + s.accuracy + '% right'; },
      pct: function (s) { return s.accuracy; }
    },
    ledger: {
      label: 'Ledger',
      base: 'bartenders-ledger-v1',
      /* { cards: { <name>: {r,w,due,lapses} }, quizzes: [...], streakData: {...} } */
      read: function (d) {
        if (!d || !d.cards) return null;
        var names = Object.keys(d.cards), right = 0, wrong = 0, mastered = 0, due = 0;
        var now = Date.now();
        names.forEach(function (n) {
          var s = d.cards[n];
          right += (s.r || 0); wrong += (s.w || 0);
          if (s.r >= 3 && s.r > s.w && (s.due === undefined || s.due > now)) mastered++;
          if (s.due !== undefined && s.due <= now) due++;
        });
        var answered = right + wrong;
        if (!answered) return null;
        return { seen: names.length, answered: answered,
                 accuracy: Math.round(right / answered * 100), due: due,
                 mastered: mastered,
                 quizzes: (d.quizzes || []).length };
      },
      /* 'mastered' counts flashcards the person graded themselves as well
         as quiz answers the wing marked, and the line says so: a manager
         reading it as an examined figure would trust it more than it earns. */
      line: function (s) {
        return 'Ledger: ' + s.seen + ' met, ' + s.accuracy + '% right, ' +
               s.mastered + ' mastered (self-graded cards included)';
      },
      pct: function (s) { return s.accuracy; }
    },
    light: {
      label: 'First Light',
      base: 'firstlight-v1',
      /* { days: ['YYYY-MM-DD', ...], kept: {...}, journal: {...}, ... }
         Only `days` is read: the mornings observed, as LOCAL date strings
         (light/js/store.js). Never the journal, never a word of text; The
         Pass counts mornings and nothing else. 'This week' is the last seven
         local days including today (the strip's 'active this week' counts a
         rolling seven days by the clock, which is the right measure for a
         timestamp but not for a day). A morning is not an answer, so
         answered stays 0. Only a YYYY-MM-DD string is a morning. */
      read: function (d) {
        if (!d || !Array.isArray(d.days) || !d.days.length) return null;
        var week = {};
        for (var i = 0; i < 7; i++) week[localDay(-i)] = 1;
        var seen = {}, all = 0, thisWeek = 0;
        d.days.forEach(function (k) {
          if (typeof k !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(k) || seen[k]) return;
          seen[k] = 1; all++;
          if (week[k]) thisWeek++;
        });
        if (!all) return null;
        return { answered: 0, due: 0, week: thisWeek, all: all };
      },
      line: function (s) { return 'Mornings: ' + s.week + ' this week · ' + s.all + ' in all'; }
    },
    table: {
      label: 'World Table',
      base: 'world-table-summary-v1',
      /* { dishesCooked: n, roundsAnswered: n, lastDay: 'YYYY-MM-DD' }
         The Table's full record (sessions, cooked log, drills) lives in
         IndexedDB, which a cross-wing page cannot read cheaply and should not
         learn the schema of. This localStorage key is the Table's OWN export
         of that record, rewritten on every session save, so The Pass reads
         the summary the wing chose to publish and nothing underneath it.
         lastDay is a LOCAL day. A round is an answer, so roundsAnswered
         joins the roster's Answered column; nothing here is ever owed. */
      read: function (d) {
        if (!d || typeof d !== 'object') return null;
        var cooked = Math.max(0, Math.floor(+d.dishesCooked || 0));
        var rounds = Math.max(0, Math.floor(+d.roundsAnswered || 0));
        if (!cooked && !rounds) return null;
        return { answered: rounds, due: 0, cooked: cooked, rounds: rounds,
                 lastDay: (typeof d.lastDay === 'string') ? d.lastDay : null };
      },
      line: function (s) { return 'Dishes cooked: ' + s.cooked + ' · rounds: ' + s.rounds; }
    }
  };

  /* ---- gaps, published by whoever can compute them --------------------
     Ranking sections needs a wing's own content: the Codex needs its question
     bank to know that a stat key belongs to Fortified Wines, the Ledger needs
     FAMILIES. A cross-wing page has neither and should not be made to load a
     megabyte of questions to find out.

     So each wing computes its own ranking while it is open and leaves it here.
     The Pass then shows what each wing last knew, with the date, which is
     honest about being a snapshot rather than pretending to be live. */
  var GAPS_KEY = 'oot-gaps-v1';

  function publishGaps(wing, gaps) {
    if (!wing || !gaps || !gaps.length) return false;
    try {
      var all = JSON.parse(localStorage.getItem(GAPS_KEY) || '{}');
      all[wing] = { at: Date.now(), gaps: gaps.slice(0, 8) };
      localStorage.setItem(GAPS_KEY, JSON.stringify(all));
      return true;
    } catch (e) { return false; }
  }

  function readGaps() {
    try { return JSON.parse(localStorage.getItem(GAPS_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  /* ---- one row per person --------------------------------------------- */
  function roster() {
    if (!OOT.profiles) return [];
    return OOT.profiles.list().map(function (p) {
      var row = { id: p.id, name: p.name, lastSeen: p.lastSeen || 0,
                  streak: 0, wings: {}, answered: 0, due: 0, path: 0 };

      /* The streak on the profile is the shared one, but it is only "live" if
         it was touched today or yesterday; an old number would read as current
         activity when it is the opposite. */
      var today = localDay(0);
      var y = localDay(-1);
      row.streak = (p.lastDay === today || p.lastDay === y) ? (p.streak || 0) : 0;
      row.studiedToday = p.lastDay === today;
      row.days = p.days || 0;

      Object.keys(READERS).forEach(function (wing) {
        var r = READERS[wing];
        var summary = r.read(readKey(r.base, p));
        if (summary) {
          row.wings[wing] = summary;
          row.answered += summary.answered;
          row.due += summary.due;
        }
      });

      if (p.path) {
        Object.keys(p.path).forEach(function (w) { row.path += Object.keys(p.path[w]).length; });
      }
      return row;
    }).sort(function (a, b) { return (b.lastSeen || 0) - (a.lastSeen || 0); });
  }

  /* The local day a stamp fell on, in the same YYYY-MM-DD shape as
     localDay(), so the two compare as strings. */
  function dayOf(ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  /* 'today' means the same LOCAL calendar day, nothing looser. Counting
     elapsed hours said 'today' for a stamp from 11pm last night when read at
     1am, while the streak beside it, which goes by oot-profiles.dayKey, had
     already turned over; the two must agree on what a day is. Days are
     counted between local midnights for the same reason. */
  function ago(ts) {
    if (!ts) return 'never';
    var day = dayOf(ts);
    if (day === localDay(0)) return 'today';
    if (day === localDay(-1)) return 'yesterday';
    var then = new Date(ts); then.setHours(0, 0, 0, 0);
    var now = new Date(); now.setHours(0, 0, 0, 0);
    var d = Math.round((now - then) / DAY);
    if (d < 1) return 'today';   /* a stamp ahead of the clock: the clock moved */
    if (d < 7) return d + ' days ago';
    if (d < 14) return 'last week';
    return Math.floor(d / 7) + ' weeks ago';
  }

  /* ---- the strip ------------------------------------------------------
     Three numbers a manager reads in two seconds, and one honest caveat. */
  function strip() {
    /* No edit needed for the personal edition: isManagerDevice() answers
       false for every device now, so this already returns nothing. */
    if (!OOT.profiles || !OOT.profiles.isManagerDevice()) return '';
    var rows = roster();
    var active = rows.filter(function (r) { return r.lastSeen && Date.now() - r.lastSeen < 7 * DAY; }).length;
    var today = rows.filter(function (r) { return r.studiedToday; }).length;
    var owed = rows.reduce(function (n, r) { return n + r.due; }, 0);

    if (!rows.length) {
      return '<div class="oot-pass"><span class="oot-pass-label">The Pass</span>' +
        '<div class="oot-pass-stat"><b>0</b><span>names on this device</span></div>' +
        '<div class="oot-today-sub" style="flex:1 1 220px">Nobody has put their name to a ' +
        'record yet. Ask each person to tap Studying, then add their name, once.</div></div>';
    }

    return '<div class="oot-pass"><span class="oot-pass-label">The Pass</span>' +
      '<div class="oot-pass-stat"><b>' + today + ' of ' + rows.length + '</b><span>studied today</span></div>' +
      '<div class="oot-pass-stat"><b>' + active + '</b><span>active this week</span></div>' +
      '<div class="oot-pass-stat"><b>' + owed + '</b><span>reviews owed across the team</span></div>' +
      '<a class="oot-chip oot-pass-go" href="' + root() + 'pass/">Open The Pass</a></div>';
  }

  /* ---- the full view --------------------------------------------------
     Four panels, matching the four things a manager asked to see. Where a
     figure genuinely cannot be produced, the panel says so rather than
     rendering a plausible zero. */
  function view(opts) {
    /* The Pass reads a roster. There is not one while the app is personal. */
    if (OOT.profiles && OOT.profiles.personal && OOT.profiles.personal()) return '';
    opts = opts || {};
    var rows = roster();
    var H = OOT.home;
    var out = '';

    /* h2: the pass page's own h1 is the site title, and a jump from h1 to
       h3 leaves a hole in the outline a screen-reader user navigates by */
    out += '<div class="oot-sec-head"><h2>The roster</h2>' +
      '<span>Everyone who has studied on this device</span></div>';

    out += '<div class="oot-today-sub" style="margin:0 0 16px">' +
      'This is this device, plus any record imported into it. Progress is kept in ' +
      'the browser it was made in, so a person who studies on their own phone will ' +
      'not appear here until they send you their record.</div>';

    if (!rows.length) {
      return out + '<div class="oot-today"><div class="oot-today-main">' +
        '<div class="oot-today-line">No names yet.</div>' +
        '<div class="oot-today-sub">Ask each person to tap Studying at the top of the ' +
        'home screen and add their name once. Everything after that is theirs.</div>' +
        '</div></div>';
    }

    /* 1. who is doing it */
    out += '<div class="oot-sec-head" style="margin-top:20px"><h3>Who is doing it</h3></div>';
    out += '<div class="tablewrap"><table style="width:100%;border-collapse:collapse">' +
      '<thead><tr><th style="text-align:left">Name</th><th>Last studied</th>' +
      '<th>Streak</th><th>Answered</th><th>Owed</th></tr></thead><tbody>';
    rows.forEach(function (r) {
      out += '<tr><td style="text-align:left">' + esc(r.name) + '</td>' +
        '<td>' + ago(r.lastSeen) + '</td>' +
        '<td>' + (r.streak || '·') + '</td>' +
        '<td>' + r.answered + '</td>' +
        '<td>' + (r.due || '·') + '</td></tr>';
    });
    out += '</tbody></table></div>';

    /* 2. readiness, per wing, only where that wing has been opened */
    out += '<div class="oot-sec-head" style="margin-top:22px"><h3>Where each person stands</h3></div>';
    var anyWing = false;
    rows.forEach(function (r) {
      var wings = Object.keys(r.wings);
      if (!wings.length) return;
      anyWing = true;
      out += '<div style="margin:12px 0">' +
        '<div class="oot-today-line" style="font-size:.95rem">' + esc(r.name) + '</div>';
      wings.forEach(function (w) {
        var R = READERS[w], s = r.wings[w];
        var label = R.line(s);
        var pct = (typeof R.pct === 'function') ? R.pct(s) : null;
        if (pct != null) {
          out += (H ? H.readiness(label, pct) : '<div>' + esc(label) + '</div>');
        } else {
          /* The same row as readiness() draws, minus the bar: a count of
             mornings or dishes has no percentage to be honest about. */
          out += '<div class="oot-meter"><div class="oot-meter-top"><span>' + esc(label) +
                 '</span></div></div>';
        }
      });
      out += '</div>';
    });
    if (!anyWing) {
      out += '<div class="oot-today-sub">Nobody has answered anything yet.</div>';
    }

    /* 3. team gaps, as last computed by each wing that can */
    out += '<div class="oot-sec-head" style="margin-top:22px"><h3>Where the team is weakest</h3></div>';
    var published = readGaps();
    if (opts.gaps && opts.gaps.length && opts.gapsWing) {
      published = JSON.parse(JSON.stringify(published));
      published[opts.gapsWing] = { at: Date.now(), gaps: opts.gaps };
    }
    var wings = Object.keys(published).filter(function (w) {
      return published[w] && published[w].gaps && published[w].gaps.length;
    });
    if (wings.length) {
      wings.forEach(function (w) {
        var block = published[w];
        out += '<div class="oot-today-sub" style="margin:10px 0 6px">' +
          esc((READERS[w] && READERS[w].label) || w) + ', as of ' + ago(block.at) +
          ' &middot; summed across everyone on this device</div>';
        block.gaps.slice(0, 6).forEach(function (g) {
          out += (H ? H.readiness(g.name + '  (' + g.answered + ' answered)', g.accuracy)
                    : '<div>' + esc(g.name) + ' ' + g.accuracy + '%</div>');
        });
      });
    } else {
      out += '<div class="oot-today-sub">Nothing ranked yet. Each app works out its own ' +
        'weakest sections while it is open, so open one and come back.</div>';
    }

    /* 4. the induction, across every wing that ships one */
    out += '<div class="oot-sec-head" style="margin-top:22px"><h3>The first week</h3></div>';
    var paths = opts.paths || (opts.pathWing ? [{ wing: opts.pathWing, total: opts.pathTotal }] : []);
    paths = paths.filter(function (p) { return p && p.total; });
    if (!paths.length) {
      out += '<div class="oot-today-sub">No induction set up yet.</div>';
    } else {
      paths.forEach(function (pw) {
        var label = (READERS[pw.wing] && READERS[pw.wing].label) || pw.wing;
        out += '<div class="oot-today-sub" style="margin:10px 0 6px">' + esc(label) + '</div>';
        rows.forEach(function (r) {
          var done = OOT.profiles.pathProgress(pw.wing, r.id);
          out += (H ? H.readiness(r.name + '  ' + done + ' of ' + pw.total,
                                  pw.total ? (done / pw.total) * 100 : 0)
                    : '<div>' + esc(r.name) + ' ' + done + '/' + pw.total + '</div>');
        });
      });
    }

    return out;
  }

  /* ---- manager mode is a switch a person has to find on purpose --------
     Not a hidden gesture and not on by default: a bartender should never
     stumble into a screen listing their colleagues' scores. */
  function settings() {
    /* The important one. This renders the Turn on the manager view chip on
       the Codex Record band and on the Pass page, and that chip is the only
       way a device ever became a manager device. */
    if (OOT.profiles && OOT.profiles.personal && OOT.profiles.personal()) return '';
    var on = OOT.profiles && OOT.profiles.isManagerDevice();
    return '<div class="oot-who" style="margin-top:14px">' +
      '<span class="oot-who-label">This device</span>' +
      '<button class="oot-chip' + (on ? ' on' : '') + '" data-oot-pass="toggle">' +
      (on ? 'Manager view is on' : 'Turn on the manager view') + '</button>' +
      '<span class="oot-today-sub" style="flex:1 1 220px">Shows everyone who studies ' +
      'on this device. Leave it off on a tablet the whole floor uses.</span></div>';
  }

  function bind(root, onOpen) {
    if (!root || root.__ootPassBound) return;
    root.__ootPassBound = true;
    root.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-oot-pass]');
      if (!b) return;
      var v = b.getAttribute('data-oot-pass');
      if (v === 'toggle') {
        OOT.profiles.setManagerDevice(!OOT.profiles.isManagerDevice());
        window.location.reload();
      } else if (v === 'open' && typeof onOpen === 'function') {
        onOpen();
      }
    });
  }

  OOT.pass = {
    roster: roster,
    strip: strip,
    view: view,
    settings: settings,
    bind: bind,
    ago: ago,
    root: root,
    publishGaps: publishGaps,
    readGaps: readGaps,
    readers: READERS
  };
})();
