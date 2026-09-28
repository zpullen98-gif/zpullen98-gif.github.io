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
    /* the clear filter runs BEFORE the stats and the empty check: a journal
       holding only Clear Mornings notes must read as empty here */
    all = all.filter(function (e) { return String(e.ref).indexOf('clear:') !== 0; });
    var head = '<div class="kick">Your own words</div><h1>Journal</h1>';

    if (!all.length) {
      return head + '<p class="note" style="margin-top:26px">Nothing written yet. ' +
        'Reflection, under Heart, is the usual place to start, and a single sentence counts. ' +
        'Anything you write is kept on this device and appears here.</p>' +
        '<div class="drawrow" style="justify-content:center;margin-top:20px">' +
        '<a class="btn" href="#/reflect">Go to Reflection</a></div>';
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

/* ═══════════════ The Record, retired ═══════════════
   The year at a glance (a calendar of kept and blank days, a verdict on each
   month, and the counts with both streaks) was retired on 27 Sep 2026 on the
   owner's word: First Light is for rest and focus, and a calendar of kept and
   blank days is a streak by another name. Nothing it read is lost: FL.days,
   the journal, the kept voices and the practice all stay and export. An old
   #/stats link lands on Today. */
