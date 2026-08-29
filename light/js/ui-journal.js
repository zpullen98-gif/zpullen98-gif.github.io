/* First Light: the Journal, Search, and the year at a glance.

   Three views that all answer "what has this year actually been": everything you
   wrote, everything the app holds, and a single grid of 366 days showing where you
   turned up. */

/* ═══════════════ the journal ═══════════════ */
FL_VIEWS.journal = {
  label: 'Journal',
  title: 'Journal',
  render: function () {
    var all = jAll();
    /* the clear filter runs BEFORE the stats and the empty check — a journal
       holding only Clear Mornings notes must read as empty here */
    all = all.filter(function (e) { return String(e.ref).indexOf('clear:') !== 0; });
    var head = '<div class="kick">Your own words</div><h1>Journal</h1>';

    if (!all.length) {
      return head + '<p class="note" style="margin-top:26px">Nothing written yet. ' +
        'The reflection on Today is the usual place to start, and a single sentence counts. ' +
        'Anything you write is kept on this device and appears here.</p>' +
        '<div class="drawrow" style="justify-content:center;margin-top:20px">' +
        '<a class="btn" href="#/today">Go to today</a></div>';
    }

    var days = jDays().length;
    var stats = '<p class="note">' + all.length + (all.length === 1 ? ' entry' : ' entries') +
      ' across ' + days + (days === 1 ? ' day' : ' days') + ' · ' + jWords().toLocaleString() + ' words.</p>';

    /* Grouped by the day the entry belongs to, newest first: a journal reads by
       date, not by the order things were edited. */
    var byDay = {}, order = [];
    all.forEach(function (e) {
      var k = e.d || 'undated';
      if (!byDay[k]) { byDay[k] = []; order.push(k); }
      byDay[k].push(e);
    });

    var body = order.map(function (day) {
      return '<div class="label">' + esc(jPrettyDate(day)) + '</div>' +
        byDay[day].map(function (e) {
          return '<div class="q">' +
            '<div class="qtr" style="margin-left:0"><a href="' + esc(jHref(e.ref)) + '">' + esc(jLabel(e.ref)) + '</a></div>' +
            '<p class="jtext">' + esc(e.text).replace(/\n/g, '<br>') + '</p>' +
          '</div>';
        }).join('');
    }).join('');

    return head + stats + body;
  }
};

/* ═══════════════ search ═══════════════ */
var searchQ = '';

FL_ACTS.doSearch = function () {
  var el = document.getElementById('q');
  searchQ = el ? el.value : '';
  var host = document.getElementById('sresults');
  if (host) host.innerHTML = searchRender();
};

function searchRender() {
  if (!searchQ || searchQ.trim().length < 2) {
    var scope = sScriptureScope();
    return '<p class="note" style="margin-top:20px">Two letters or more.</p>' +
      '<p class="mintro" style="margin-top:18px">Searches the year, your journal, the goal ladder, ' +
      'the chambers, the threads, the body and astrology chapters, and any scripture you have opened.' +
      (scope.loaded.length
        ? '<br><span class="ds">Scripture searchable now: ' + esc(scope.loaded.join(' · ')) + '</span>'
        : '<br><span class="ds">No scripture is open yet, so none is searched. Open a book and it joins.</span>') +
      '</p>';
  }

  var r = flSearch(searchQ);
  var q = sNorm(searchQ).trim();
  if (!r.results.length) {
    return '<p class="note" style="margin-top:20px">Nothing found for “' + esc(searchQ) + '”.</p>';
  }

  var counts = Object.keys(r.counts).map(function (k) { return k + ' ' + r.counts[k]; }).join(' · ');
  var groups = {}, order = [];
  r.results.forEach(function (x) {
    if (!groups[x.group]) { groups[x.group] = []; order.push(x.group); }
    groups[x.group].push(x);
  });

  return '<p class="note" style="margin-top:16px">' + r.total +
    (r.total === 1 ? ' match' : ' matches') + (r.total > r.results.length ? ', showing the first ' + r.results.length : '') +
    '</p><p class="ds" style="text-align:center;margin-bottom:10px">' + esc(counts) + '</p>' +
    order.map(function (g) {
      return '<div class="label">' + esc(g) + '</div>' +
        groups[g].map(function (x) {
          return '<div class="q" style="padding:16px 0">' +
            '<div class="gt"><a href="' + esc(x.href) + '">' + esc(x.title) + '</a></div>' +
            (x.sub ? '<div class="ds">' + esc(x.sub) + '</div>' : '') +
            '<p class="px" style="margin-top:6px;color:var(--faint)">' + sMark(sSnippet(x.snippet, q), q) + '</p>' +
          '</div>';
        }).join('');
    }).join('');
}

FL_VIEWS.search = {
  label: 'Search',
  title: 'Search',
  render: function () {
    return '<div class="kick">Everything at once</div><h1>Search</h1>' +
      '<div class="drawrow" style="margin-top:18px">' +
        '<input type="search" id="q" value="' + esc(searchQ) + '" placeholder="a word, a teacher, a half-remembered line"' +
        ' data-search="1" aria-label="Search">' +
      '</div>' +
      '<div id="sresults">' + searchRender() + '</div>';
  },
  after: function () {
    var el = document.getElementById('q');
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  }
};

/* One listener, bound once. Debounced because scanning the loaded scripture on every
   keystroke of a long query is real work on a phone. */
var searchTimer = null;
document.addEventListener('input', function (e) {
  if (!e.target || !e.target.getAttribute || !e.target.getAttribute('data-search')) return;
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(FL_ACTS.doSearch, 180);
});

/* ═══════════════ the year at a glance ═══════════════ */
FL_VIEWS.stats = {
  label: 'The Record',
  title: 'The Record',
  render: function () {
    var year = flShiftedNow().getFullYear();
    var track = FL.prefs.track || 'philosophers';

    /* One cell per almanac slot. A day can carry up to four marks: turned up, kept
       a voice, wrote, marked the practice done, and the cell's weight shows how
       many, so a year of real practice looks different from a year of visits. */
    /* one pass over the journal, so debriefs and every examen field count as
       writing, and the private room's notes never do */
    var wrote = {};
    Object.keys(FL.journal).forEach(function (k) {
      var e = FL.journal[k];
      if (e.d && String(e.ref).indexOf('clear:') !== 0) wrote[e.d] = 1;
    });
    var cells = [];
    for (var doy = 1; doy <= 366; doy++) {
      var md = doyToMD(doy);
      var m = md[0], d = md[1];
      var dateKey = year + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      var skipped = doySkipped(doy, year);

      var marks = 0;
      if (FL.days.indexOf(dateKey) > -1) marks++;
      if (FL.kept[track + ':' + m + '-' + d]) marks++;
      if (wrote[dateKey]) marks++;
      if (FL.practice[dateKey] || FL.sessions[dateKey]) marks++;

      var title = MONTHS[m - 1][0] + ' ' + d + (skipped ? ' — leap day only' : (marks ? ' — ' + marks + ' marks' : ''));
      cells.push('<span class="cell l' + Math.min(marks, 4) + (skipped ? ' skip' : '') +
                 '" title="' + esc(title) + '"></span>');
    }

    var written = jDays().length;
    var practiced = Object.keys(FL.practice).length;
    var kept = Object.keys(FL.kept).filter(function (k) { return k.indexOf(track + ':') === 0; }).length;

    /* seasons, not streaks: the month named in words, never numbers. The
       heatmap already refuses verdicts; this gives the refusal a vocabulary. */
    var season = function (y2, m2) {
      var mp = y2 + '-' + String(m2).padStart(2, '0') + '-';
      var got = FL.days.filter(function (k) { return k.indexOf(mp) === 0; }).length;
      var len = new Date(y2, m2, 0).getDate();
      return got >= len * 0.6 ? 'a steady month' : got >= len * 0.25 ? 'a returning month'
           : got > 0 ? 'a quiet month' : 'a fallow month';
    };
    var nowS = flShiftedNow();
    var pm = nowS.getMonth() === 0 ? [nowS.getFullYear() - 1, 12] : [nowS.getFullYear(), nowS.getMonth()];
    var seasonLine = '<p class="px" style="color:var(--faint)">' +
      esc(MONTHS[nowS.getMonth()][0]) + ' so far: ' + season(nowS.getFullYear(), nowS.getMonth() + 1) +
      ' · ' + esc(MONTHS[pm[1] - 1][0]) + ' was ' + season(pm[0], pm[1]) + '. ' +
      'Months have seasons; a quiet one is not a verdict.</p>';

    return '<div class="kick">' + year + '</div><h1>The Record</h1>' +
      '<p class="note">Every day of the almanac. The darker a day, the more of it you kept.</p>' +
      seasonLine +
      '<div class="heat">' + cells.join('') + '</div>' +
      '<div class="heatkey"><span class="cell l0"></span><span class="cell l1"></span>' +
        '<span class="cell l2"></span><span class="cell l3"></span><span class="cell l4"></span>' +
        '<span class="ds" style="margin-left:8px">nothing → turned up, kept, wrote, practised</span></div>' +
      '<div class="label">The count</div>' +
      '<div class="card">' +
        '<div class="astrorow"><span class="k">Mornings</span> ' + FL.days.length + '</div>' +
        '<div class="astrorow"><span class="k">Current streak</span> ' + flStreak() + '</div>' +
        '<div class="astrorow"><span class="k">Longest streak</span> ' + flLongestStreak() + '</div>' +
        '<div class="astrorow"><span class="k">Days written</span> ' + written + '</div>' +
        '<div class="astrorow"><span class="k">Words written</span> ' + jWords().toLocaleString() + '</div>' +
        '<div class="astrorow"><span class="k">Practices marked</span> ' + practiced + '</div>' +
        '<div class="astrorow"><span class="k">Voices kept</span> ' + kept + '</div>' +
      '</div>' +
      '<p class="mintro" style="margin-top:26px">A blank stretch is not a verdict. ' +
      'Beginning again is the practice.</p>';
  }
};
