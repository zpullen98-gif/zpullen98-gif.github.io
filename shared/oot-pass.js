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
     One per wing. Each takes that wing's parsed blob and returns a small,
     uniform summary. A wing whose data is absent returns null and simply does
     not appear in that person's row, which is the correct rendering of "this
     person has not opened the Ledger". */
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
        var due = 0, now = new Date().toISOString().slice(0, 10);
        if (d.srs) {
          Object.keys(d.srs).forEach(function (k) {
            if (d.srs[k] && d.srs[k].due && d.srs[k].due <= now) due++;
          });
        }
        return { seen: ids.length, answered: answered,
                 accuracy: Math.round(right / answered * 100), due: due,
                 days: d.days ? Object.keys(d.days).length : 0 };
      }
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
      }
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
      var today = new Date().toISOString().slice(0, 10);
      var y = new Date(Date.now() - DAY).toISOString().slice(0, 10);
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

  function ago(ts) {
    if (!ts) return 'never';
    var d = Math.floor((Date.now() - ts) / DAY);
    if (d <= 0) return 'today';
    if (d === 1) return 'yesterday';
    if (d < 7) return d + ' days ago';
    if (d < 14) return 'last week';
    return Math.floor(d / 7) + ' weeks ago';
  }

  /* ---- the strip ------------------------------------------------------
     Three numbers a manager reads in two seconds, and one honest caveat. */
  function strip() {
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
        '<td>' + (r.streak || '&mdash;') + '</td>' +
        '<td>' + r.answered + '</td>' +
        '<td>' + (r.due || '&mdash;') + '</td></tr>';
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
        var s = r.wings[w];
        var label = READERS[w].label + ': ' + s.seen + ' met, ' + s.accuracy + '% right';
        if (w === 'ledger' && s.mastered != null) label += ', ' + s.mastered + ' mastered';
        out += (H ? H.readiness(label, s.accuracy) : '<div>' + esc(label) + '</div>');
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
