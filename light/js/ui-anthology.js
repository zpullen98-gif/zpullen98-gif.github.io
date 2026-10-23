/* One anthology, three doors: today's readings, the year, and the complete library.
   Filters and return positions are session-only. Only an explicit reading tick saves. */
var dawnFilter = 'all', dawnQuery = '', dawnLimit = 12;
var dawnReturn = '#/anthology/library', dawnPositions = {}, dawnRestorePosition = false;
var dawnLastReading = '', dawnLastCalendar = '';
var DAWN_MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function dawnCaptureSearch() {
  var input = document.getElementById('dawn-search');
  if (input) dawnQuery = input.value.trim().slice(0, 180);
}
function dawnFiltered() {
  var query = dawnNorm(dawnQuery);
  return dawnLibrary().filter(function (q) {
    return (dawnFilter === 'all' || q.collection === dawnFilter) && (!query || dawnNorm(dawnSearchText(q)).indexOf(query) > -1);
  });
}
FL_ACTS.dawnFilter = function (el) {
  var choice = el.value || el.getAttribute('data-collection');
  if (choice !== 'all' && !DAWN_COLLECTIONS.some(function (c) { return c[0] === choice; })) return;
  dawnCaptureSearch(); dawnFilter = choice; dawnLimit = 12; render();
  var select = document.getElementById('dawn-collection');
  if (select) select.focus();
  announce(dawnFiltered().length + ' quotations.');
};
FL_ACTS.dawnMore = function () {
  var previousQuery = dawnQuery;
  dawnCaptureSearch();
  if (previousQuery !== dawnQuery) {
    dawnLimit = 12; render(); document.getElementById('dawn-search').focus();
    announce(dawnFiltered().length + ' quotations found.'); return;
  }
  var firstNew = dawnFiltered()[dawnLimit];
  dawnLimit += 12; render();
  if (firstNew) {
    var card = document.querySelector('[data-quote-id="' + firstNew.id + '"]');
    if (card) { card.setAttribute('tabindex', '-1'); card.focus({ preventScroll: true }); }
  }
  announce('More quotations shown.');
};
FL_ACTS.dawnClear = function () {
  dawnQuery = ''; dawnFilter = 'all'; dawnLimit = 12; render();
  document.getElementById('dawn-search').focus();
};
function dawnReadHref(key, part) { return '#/anthology/read/' + key + '/' + (part + 1); }
function dawnDateLabel(key) {
  var dt = dawnReadingDate(key);
  return dt ? dt.getDate() + ' ' + DAWN_MONTH_NAMES[dt.getMonth()] + ' ' + dt.getFullYear() : '';
}
function dawnOffsetDate(key, delta) {
  var dt = dawnReadingDate(key);
  if (!dt) return '';
  dt.setDate(dt.getDate() + delta);
  var result = dawnReadingKey(dt);
  return dawnReadingDate(result) ? result : '';
}
function dawnDayDone(key) {
  return [0, 1, 2].filter(function (part) { return dawnReadingDone(key, part); }).length;
}
function dawnHeading(id) {
  var daily = !id || id.indexOf('read/') === 0;
  var calendar = id && id.indexOf('calendar') === 0;
  var choices = [
    [dawnLastReading || '#/anthology', 'Daily readings', daily],
    [dawnLastCalendar || '#/anthology/calendar', 'Year calendar', calendar],
    ['#/anthology/library', 'Explore the library', !daily && !calendar]
  ];
  return '<div class="dawn-opening"><p class="kick">Mind · A year of discovery</p><h1>The Dawn Anthology</h1>' +
    '<p class="note">Twelve quotations a day. Three small journeys through wisdom, history and imagined worlds.</p></div>' +
    '<nav class="dawn-shelf-nav dawn-main-nav" aria-label="Anthology">' + choices.map(function (c) {
      return '<a href="' + esc(c[0]) + '"' + (c[2] ? ' aria-current="page"' : '') + '>' + c[1] + '</a>';
    }).join('') + '</nav>';
}
function dawnGuide() {
  return '<details class="dawn-policy"><summary>How this reading year works</summary>' +
    '<p>All ' + dawnLibrary().length.toLocaleString() + ' entries share this reading year: the source-checked selections, all three original Year tracks and The Lift. Each date offers twelve quotations, arranged into three readings of four. Open any date, at your own pace.</p>' +
    '<p>The year contains more reading places than the library has entries, so passages return for a second encounter. Identical wording is kept apart within a day, while separate editions and dated records remain available. The readings are a varied selection, not a claim that different speakers agree.</p>' +
    '<p>Source-checked selections retain their work, edition, speaker and evidence links. Accounts, portrayals and faith traditions remain labelled. The original Year and Lift citations have not received a new source review here. Open each source panel before treating a line as evidence.</p>' +
    '<p>Mark a reading only when you choose. Its tick is saved on this device with your First Light record and included in backups. Browsing a date changes neither your Year track nor your kept words. External editions need a connection.</p>' +
    '<p><a href="#/today">Read Today’s three</a>: the dated Year voice and two lines for a lift remain on Today.</p></details>';
}
function dawnDaily(key, part) {
  var dt = dawnReadingDate(key);
  if (!dt || !Number.isInteger(part) || part < 0 || part > 2) return dawnMissingDate();
  var rows = dawnReadingPlan(key), section = dawnReadingSections[part];
  dawnLastReading = dawnReadHref(key, part);
  var done = dawnReadingDone(key, part), complete = dawnDayDone(key);
  var prev = dawnOffsetDate(key, -1), next = dawnOffsetDate(key, 1);
  var nextHref = part < 2 ? dawnReadHref(key, part + 1) : next ? dawnReadHref(next, 0) : '';
  var previousHref = part > 0 ? dawnReadHref(key, part - 1) : prev ? dawnReadHref(prev, 2) : '';
  return '<section class="dawn-daily-intro" aria-labelledby="dawn-date-title"><div><p class="kick">' +
    (key === dawnReadingToday() ? 'Your reading for today' : 'From the reading year') + '</p><h2 id="dawn-date-title">' + dawnDateLabel(key) + '</h2>' +
    '<p class="note">12 quotations · 3 readings · ' + complete + ' of 3 marked read</p></div>' +
    '<a class="readmini" href="#/anthology/calendar/' + key.slice(0, 7) + '">Find a date</a></section>' +
    '<nav class="dawn-day-nav" aria-label="Reading dates">' +
      (prev ? '<a href="' + dawnReadHref(prev, 0) + '">Previous day</a>' : '<span>Start of calendar</span>') +
      '<a href="' + dawnReadHref(dawnReadingToday(), 0) + '">Today’s readings</a>' +
      (next ? '<a href="' + dawnReadHref(next, 0) + '">Next day</a>' : '<span>End of calendar</span>') + '</nav>' +
    '<nav class="dawn-reading-parts" aria-label="Three daily readings">' + dawnReadingSections.map(function (s, i) {
      return '<a href="' + dawnReadHref(key, i) + '"' + (i === part ? ' aria-current="page"' : '') + '><span>Reading ' + (i + 1) +
        (dawnReadingDone(key, i) ? ' · Read' : '') + '</span><strong>' + esc(s.title) + '</strong><small>4 quotations</small></a>';
    }).join('') + '</nav>' +
    '<section class="dawn-reading" aria-labelledby="dawn-reading-title"><div class="dawn-reading-intro"><p class="kick">Reading ' + (part + 1) + ' of 3</p>' +
      '<h2 id="dawn-reading-title">' + esc(section.title) + '</h2><p>' + esc(section.prompt) + '</p></div>' +
      '<div class="dawn-grid">' + rows.slice(part * 4, part * 4 + 4).map(function (q) { return dawnCard(q); }).join('') + '</div>' +
      '<div class="dawn-reading-finish"><button class="btn" data-act="dawnMarkReading" data-date="' + key + '" data-part="' + part + '" aria-pressed="' + done + '">' +
      (done ? 'Reading marked read' : 'Mark this reading read') + '</button><p class="note">' + (done ? 'Select again to remove this reading’s tick.' : 'A pause for reflection, with no deadline.') + '</p></div>' +
      '<nav class="dawn-day-nav" aria-label="Continue reading">' + (previousHref ? '<a href="' + previousHref + '">Previous reading</a>' : '') +
      (nextHref ? '<a class="readmini" href="' + nextHref + '">' + (part < 2 ? 'Continue to reading ' + (part + 2) : 'Continue to the next day') + '</a>' : '') + '</nav></section>' + dawnGuide();
}
FL_ACTS.dawnMarkReading = function (el) {
  var key = el.getAttribute('data-date'), part = Number(el.getAttribute('data-part'));
  if (!dawnReadingToggle(key, part)) { toast('This reading could not be saved. Please try again.'); return; }
  render();
  announce(dawnReadingDone(key, part) ? 'Reading marked read. ' + dawnDayDone(key) + ' of 3 for this date.' : 'Reading tick removed.');
};
function dawnMissingDate() {
  return '<p class="note" role="status">That reading date is not available. Choose a date between 1900 and 2100.</p><p><a href="#/anthology">Open today’s readings</a> · <a href="#/anthology/calendar">Open the calendar</a></p>';
}
function dawnCalendar(monthKey) {
  if (!monthKey) monthKey = dawnReadingToday().slice(0, 7);
  if (!/^\d{4}-\d{2}$/.test(monthKey) || !dawnReadingDate(monthKey + '-01')) return dawnMissingDate();
  dawnLastCalendar = '#/anthology/calendar/' + monthKey;
  var start = dawnReadingDate(monthKey + '-01'), year = start.getFullYear(), month = start.getMonth();
  var days = new Date(year, month + 1, 0).getDate(), today = dawnReadingToday();
  var prev = new Date(year, month - 1, 1, 12), next = new Date(year, month + 1, 1, 12);
  var count = 0, cells = '', offset = (start.getDay() + 6) % 7;
  for (var i = 0; i < offset; i++) cells += '<span aria-hidden="true"></span>';
  for (var d = 1; d <= days; d++) {
    var key = monthKey + '-' + String(d).padStart(2, '0'), read = dawnDayDone(key);
    if (read === 3) count++;
    cells += '<a class="dawn-calendar-day' + (read === 3 ? ' is-read' : '') + '" href="' + dawnReadHref(key, 0) + '"' +
      (key === today ? ' aria-current="date"' : '') + ' aria-label="' + dawnDateLabel(key) + ', ' + read + ' of 3 readings marked read' + (key === today ? ', today' : '') + '">' +
      '<strong>' + d + '</strong><span>' + (read === 3 ? 'Read' : read ? read + '/3' : '12 quotes') + '</span></a>';
  }
  return '<section class="dawn-calendar" aria-labelledby="dawn-calendar-title"><p class="kick">Every date is a doorway</p><h2 id="dawn-calendar-title">' +
    DAWN_MONTH_NAMES[month] + ' ' + year + '</h2><p class="note">' + count + ' of ' + days + ' days fully read this month. Choose any day to begin or revisit it.</p>' +
    '<div class="dawn-calendar-tools"><form id="dawn-year-form"><label for="dawn-year">Calendar year</label><div><input id="dawn-year" type="number" min="1900" max="2100" required value="' + year + '"><button class="btn" type="submit">Open year</button></div></form>' +
    '<form id="dawn-date-form"><label for="dawn-date">Jump to a reading date</label><div><input id="dawn-date" type="date" min="1900-01-01" max="2100-12-31" required value="' + (today.slice(0, 7) === monthKey ? today : monthKey + '-01') + '"><button class="btn" type="submit">Read date</button></div></form></div>' +
    '<nav class="dawn-months" aria-label="Months of ' + year + '">' + DAWN_MONTH_NAMES.map(function (name, m) {
      return '<a href="#/anthology/calendar/' + year + '-' + String(m + 1).padStart(2, '0') + '"' + (m === month ? ' aria-current="page"' : '') + '>' + name.slice(0, 3) + '</a>';
    }).join('') + '</nav>' +
    '<nav class="dawn-day-nav" aria-label="Calendar months">' + (prev.getFullYear() >= 1900 ? '<a href="#/anthology/calendar/' + dawnReadingKey(prev).slice(0, 7) + '">Previous month</a>' : '<span></span>') +
    '<a href="#/anthology/calendar/' + today.slice(0, 7) + '">This month</a>' +
    (next.getFullYear() <= 2100 ? '<a href="#/anthology/calendar/' + dawnReadingKey(next).slice(0, 7) + '">Next month</a>' : '') + '</nav>' +
    '<div class="dawn-calendar-grid"><div class="dawn-weekdays" aria-hidden="true">' + ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(function (n) { return '<span>' + n + '</span>'; }).join('') +
    '</div><div class="dawn-calendar-days">' + cells + '</div></div><p class="note">Each day contains twelve quotes. Read marks appear only after you mark the three readings; opening a date does not mark it.</p></section>' + dawnGuide();
}
function dawnStudyDoors() {
  return '<div class="dawn-study-doors"><a href="#/anthology/writers"><strong>The Lantern Stage</strong><span>Writers, works and free editions</span></a>' +
    '<a href="#/anthology/cast"><strong>Meet the cast</strong><span>Historical and fictional voices</span></a>' +
    '<a href="#/poets"><strong>The Poets’ Study</strong><span>Shakespeare, Chaucer and Canterbury</span></a></div>';
}
function dawnLibraryView() {
  var rows = dawnFiltered(), legacyCount = dawnLegacyQuotes().length;
  var original = function (c) { return c[0] === 'lift' || c[0].indexOf('year-') === 0; };
  var options = function (c) { return '<option value="' + c[0] + '"' + (dawnFilter === c[0] ? ' selected' : '') + '>' + esc(c[1]) + '</option>'; };
  return '<h2>One library, every voice</h2><p class="dawn-intro">' + DAWN_QUOTES.length.toLocaleString() + ' source-checked selections and ' + legacyCount.toLocaleString() +
    ' original Year and Lift entries. Search across them all, or follow a writer into a deeper study.</p>' + dawnStudyDoors() +
    '<form id="dawn-search-form" class="dawn-search" role="search"><label for="dawn-search">Find a quote, person or work</label>' +
    '<div><input id="dawn-search" type="search" maxlength="180" value="' + esc(dawnQuery) + '" placeholder="Try courage, Picard or Mandela"><button class="btn" type="submit">Search</button></div></form>' +
    '<div class="dawn-collection-field"><label for="dawn-collection">Collection</label><select id="dawn-collection" data-change="dawnFilter">' + options(['all', 'All collections']) +
    '<optgroup label="Source-checked selections">' + DAWN_COLLECTIONS.filter(function (c) { return !original(c); }).map(options).join('') + '</optgroup>' +
    '<optgroup label="The original Year &amp; Lift">' + DAWN_COLLECTIONS.filter(original).map(options).join('') + '</optgroup></select></div>' +
    '<div class="dawn-results"><p id="dawn-result-count" role="status">' + rows.length.toLocaleString() + ' quotation' + (rows.length === 1 ? '' : 's') +
    (rows.length > dawnLimit ? ' · showing ' + dawnLimit : '') + '</p>' + (dawnQuery || dawnFilter !== 'all' ? '<button class="keep" data-act="dawnClear">Clear search &amp; filters</button>' : '') + '</div>' +
    '<div class="dawn-grid">' + rows.slice(0, dawnLimit).map(function (q) { return dawnCard(q); }).join('') + '</div>' +
    (!rows.length ? '<p class="note">No quotations match. Try a person’s surname, a shorter phrase, or another collection.</p>' : '') +
    (rows.length > dawnLimit ? '<button class="keep dawn-more" data-act="dawnMore">Show more quotations</button>' : '') + dawnGuide();
}

FL_VIEWS.anthology = {
  label: 'The Dawn Anthology', title: 'The Dawn Anthology',
  render: function (id) {
    var body;
    if (!id) body = dawnDaily(dawnReadingToday(), 0);
    else if (id.indexOf('read/') === 0) {
      var parts = id.split('/');
      body = parts.length === 3 && /^[123]$/.test(parts[2]) ? dawnDaily(parts[1], Number(parts[2]) - 1) : dawnMissingDate();
    } else if (id === 'calendar' || id.indexOf('calendar/') === 0) body = dawnCalendar(id.slice(9));
    else if (id === 'library') body = dawnLibraryView();
    else if (id === 'studies') body = '<h2>Read more deeply</h2>' + dawnStudyDoors();
    else if (id === 'writers') body = dawnWriterIndex();
    else if (id.indexOf('writer-') === 0) body = dawnWriterProfile(id.slice(7));
    else if (id === 'cast') body = dawnCastIndex();
    else if (id.indexOf('person-') === 0) body = dawnCastProfile(id.slice(7));
    else {
      var q = dawnById(id);
      body = '<p><a class="readmini" href="' + esc(dawnReturn) + '">Return to your place</a> · <a href="#/anthology/library">All quotations</a></p>' +
        (q ? dawnCard(q, null, true) : '<p class="note" role="status">That quotation is not in this edition. Browse the anthology to find another.</p>');
    }
    return dawnHeading(id) + body;
  },
  after: function (id) {
    dawnCastAfter(); dawnWriterAfter();
    var form = document.getElementById('dawn-search-form');
    if (form) form.addEventListener('submit', function (event) {
      event.preventDefault(); dawnCaptureSearch(); dawnLimit = 12;
      render(); document.getElementById('dawn-search').focus(); announce(dawnFiltered().length + ' quotations found.');
    });
    var yearForm = document.getElementById('dawn-year-form');
    if (yearForm) yearForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var year = document.getElementById('dawn-year').value;
      if (/^\d{4}$/.test(year) && dawnReadingDate(year + '-01-01')) location.hash = '#/anthology/calendar/' + year + '-' + dawnLastCalendar.slice(-2);
    });
    var dateForm = document.getElementById('dawn-date-form');
    if (dateForm) dateForm.addEventListener('submit', function (event) {
      event.preventDefault(); var key = document.getElementById('dawn-date').value;
      if (dawnReadingDate(key)) location.hash = dawnReadHref(key, 0);
    });
  }
};
if (typeof document.addEventListener === 'function') {
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('#view a[href]');
    if (!link || typeof flRoute === 'undefined' || ['anthology', 'poets'].indexOf(flRoute.view) === -1) return;
    var href = link.getAttribute('href');
    if (href.indexOf('#/') !== 0 || href === location.hash) return;
    dawnPositions[location.hash] = { y: window.scrollY, href: href };
    var arg = flRoute.arg;
    if (flRoute.view === 'poets' || !arg || arg === 'library' || /^(read\/|person-|writer-)/.test(arg)) dawnReturn = location.hash || '#/anthology';
    dawnRestorePosition = !!dawnPositions[href];
  }, true);
  window.addEventListener('popstate', function () { dawnRestorePosition = true; });
  window.addEventListener('hashchange', function () {
    /* Run after the router's reset, including a return into The Poets' Study. */
    var pos = dawnPositions[location.hash], restore = dawnRestorePosition;
    dawnRestorePosition = false;
    if (restore && pos && /^#\/(anthology|poets)(\/|$)/.test(location.hash)) requestAnimationFrame(function () {
      var links = document.querySelectorAll('#view a[href]');
      for (var i = 0; i < links.length; i++) if (links[i].getAttribute('href') === pos.href) { links[i].focus({preventScroll: true}); break; }
      window.scrollTo(0, pos.y);
    });
  });
}
