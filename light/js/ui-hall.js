/* First Light: the Readings.

   The practice half of the Library: every work divided into daily passages
   that end where the text itself pauses (js/data-plans.js, read through
   plan.js), and, once their sets have landed, a daily course of each
   tradition's teachings.

   Day one is the day you begin. A missed morning waits: today's reading is
   the first day not yet read, so nothing is ever skipped and nothing is
   owed. The page shows the exact passage and "Read X of Y"; it never shows
   minutes, word counts, dates missed or streaks.

   Reachable at #/hall, from the Library, and from Soul's sub-row. Soul is the
   one religious door, and nothing here reaches Today. Everything it renders
   comes from the local text via reading.js. */

var hallOpenKey = null;   // "plan|day|where" of the passage box now open, kept across a re-render
var hallSaving = {};      // plan id -> the progress line while a download is running
var hallGroup = {};       // plan id -> the 30-day group the reader picked
var hallHeld = null;      // {id, d, route, on}: the day just marked on the today card, held while this visit and this day last
var hallStoreSeen = {};   // plan id -> the last readCanonState answer, so a re-render draws the card at its height

var HALL_GROUP = 30;      // plans longer than HALL_LIST_ALL show their days thirty at a time
var HALL_LIST_ALL = 81;
var HALL_SECTION = { concepts: 'Concepts', practices: 'Practices', festivals: 'Festivals' };

function hallCourseOf(arg) {
  var m = /^course-(.+)$/.exec(arg || '');
  return m ? m[1] : null;
}
function hallTradition(tr) {
  if (typeof FL_TRADITIONS === 'undefined') return null;
  for (var i = 0; i < FL_TRADITIONS.length; i++) if (FL_TRADITIONS[i].id === tr) return FL_TRADITIONS[i];
  return null;
}
/* A day's words: the exact passage for a work, the chamber entry for a course. */
function hallDayLabel(id, d) {
  var tr = hallCourseOf(id);
  if (tr) { var e = courseDays(tr)[d - 1]; return e ? e.title : ''; }
  return planDayLabel(id, d);
}
/* The day the today card shows: the first not yet read, except that a day
   just marked from the card stays in front of the reader, marked, so the
   control they pressed is still where they pressed it. The hold lasts only
   for this visit to the page (parseHash makes a new route object on every
   navigation) and only for the day it was made: a return from the Library,
   or a tab left open overnight, shows planToday again. */
function hallTodayDay(id) {
  if (hallHeld && hallHeld.id === id && hallHeld.route === flRoute && hallHeld.on === flToday() &&
      planReadOf(id)[hallHeld.d]) return hallHeld.d;
  return planToday(id);
}
function hallKey(id, d, where) { return id + '|' + d + '|' + where; }

/* --- controls --- */

function hallMarkButton(id, d, where) {
  var on = !!planReadOf(id)[d];
  return '<button class="tick' + (on ? ' on' : '') + '" data-act="hallMark" data-plan="' + esc(id) +
    '" data-day="' + d + '" data-where="' + where + '" aria-pressed="' + on + '">' +
    (on ? 'Marked read' : 'Mark read') + '</button>';
}
/* The passage button and its box. A box open before a re-render (marking a
   day re-renders the page) is drawn open again, so the text the reader was
   in does not fold away under them. */
function hallReadPair(id, d, where) {
  var key = hallKey(id, d, where), long = where === 'today';
  var open = hallOpenKey === key && readHasLocally(id, d);
  return {
    btn: '<button class="' + (long ? 'keep' : 'readmini') + '" data-act="hallRead" data-plan="' + esc(id) +
      '" data-day="' + d + '" data-where="' + where + '" aria-expanded="' + open + '">' +
      (open ? 'Hide the passage' : (long ? 'Read the passage' : 'Read')) + '</button>',
    box: '<div class="readbox' + (open ? '' : ' hide') + '">' + (open ? readRender(id, d) : '') + '</div>'
  };
}
function hallReadLabel(btn, open) {
  var long = btn.getAttribute('data-where') === 'today';
  btn.textContent = open ? 'Hide the passage' : (long ? 'Read the passage' : 'Read');
  btn.setAttribute('aria-expanded', String(open));
}
/* Re-render in place: the scroll position stays where it was. Focus is put
   back on the pressed control by app.js, which finds it again by its data
   attributes (plan, day and where it sits). */
function hallRerender() {
  var y = window.scrollY || window.pageYOffset || 0;
  render();
  window.scrollTo(0, y);
}

FL_ACTS.hallRead = function (el) {
  var id = el.getAttribute('data-plan'), d = +el.getAttribute('data-day'), where = el.getAttribute('data-where');
  var key = hallKey(id, d, where);
  /* resolved relative to the button: the today card and a row can hold the same day */
  var box = el.parentElement.querySelector('.readbox');
  if (!box) return;
  if (hallOpenKey === key && !box.classList.contains('hide')) {
    hallOpenKey = null;
    box.classList.add('hide');
    box.innerHTML = '';
    hallReadLabel(el, false);
    return;
  }
  /* one passage open at a time */
  var others = document.querySelectorAll('[data-act="hallRead"][aria-expanded="true"]');
  for (var i = 0; i < others.length; i++) {
    var ob = others[i].parentElement.querySelector('.readbox');
    if (ob) { ob.classList.add('hide'); ob.innerHTML = ''; }
    hallReadLabel(others[i], false);
  }
  hallOpenKey = key;
  box.classList.remove('hide');
  hallReadLabel(el, true);

  if (readHasLocally(id, d)) { box.innerHTML = readRender(id, d); return; }
  box.innerHTML = '<p class="loadnote">Opening the passage.</p>';
  readLoad(id, d).then(function () {
    if (hallOpenKey === key && box.isConnected) { box.innerHTML = readRender(id, d); announce('Passage opened.'); }
  }).catch(function () {
    /* No navigator.onLine check: it reports true on a captive portal and again
       when the machine is online but this app's host is not. One sentence that
       is true either way, and a next step that works in both. */
    if (!box.isConnected) return;
    box.innerHTML = '<p class="loadnote">This book is not on the device yet and cannot be reached ' +
      'right now. Save it once while you have a connection and it stays for good.</p>';
  });
};

FL_ACTS.hallMark = function (el) {
  var id = el.getAttribute('data-plan'), d = +el.getAttribute('data-day');
  var on = !planReadOf(id)[d];
  planMarkRead(id, d, on);
  if (on && el.getAttribute('data-where') === 'today') hallHeld = { id: id, d: d, route: flRoute, on: flToday() };
  /* a row's group stays put: marking the last day of the group shown would
     otherwise move the list on to the next thirty, and the row pressed with it */
  if (el.getAttribute('data-where') === 'row' && !(hallGroup[id] >= 0)) hallGroup[id] = Math.floor((d - 1) / HALL_GROUP);
  hallRerender();
  announce(on ? 'Marked read.' : 'Unmarked.');
};

FL_ACTS.hallGroup = function (el) {
  hallGroup[el.getAttribute('data-plan')] = +el.getAttribute('data-g');
  hallRerender();
};

FL_ACTS.hallAgain = function (el) {
  var id = el.getAttribute('data-plan');
  planBeginAgain(id);
  hallHeld = null;
  hallGroup[id] = 0;
  render();
  announce('Begun again at day one.');
};

/* The line and button are looked up by id each time: a Mark read during a
   save re-renders the card, and hallStoreHTML draws it saving. */
function hallSaveLine(id, text) {
  var bar = document.getElementById('hall-save-' + id);
  if (bar) bar.textContent = text;
}
/* Ask the device again before re-rendering, so the card is redrawn at once
   with what is now true rather than with the answer from before; a line
   worth keeping (a save that only partly finished) is put back after. */
function hallStoreRefresh(id, line) {
  readCanonState(id).then(function (st) { if (st.ready) hallStoreSeen[id] = st; }, function () {})
    .then(function () {
      if (flRoute.view !== 'hall' || flRoute.arg !== id) return;
      hallRerender();
      if (line) hallSaveLine(id, line);
    });
}

FL_ACTS.hallSave = function (el) {
  var id = el.getAttribute('data-plan');
  if (hallSaving[id]) return;
  hallSaving[id] = 'Saving.';
  el.disabled = true;
  hallSaveLine(id, hallSaving[id]);
  readSaveCanon(id, function (done, total) {
    hallSaving[id] = 'Saving: ' + done + ' of ' + total + '.';
    hallSaveLine(id, hallSaving[id]);
  }).then(function (r) {
    hallSaving[id] = false;
    var partly = r.failed.length ? r.loaded + ' of ' + (r.loaded + r.failed.length) + ' saved; the rest could not be reached.' : '';
    hallSaveLine(id, partly || 'Saved on this device.');
    announce(partly || 'Saved for offline.');
    hallStoreRefresh(id, partly);
  }).catch(function () {
    hallSaving[id] = false;
    hallSaveLine(id, 'That did not finish. Try again with a connection.');
    var btn = document.querySelector('[data-act="hallSave"][data-plan="' + id + '"]');
    if (btn) btn.disabled = false;
  });
};

FL_ACTS.hallForget = function (el) {
  var id = el.getAttribute('data-plan'), w = readWorkOf(id);
  FLTextForget(w).then(function (n) {
    toast('Removed ' + n + (n === 1 ? ' file' : ' files') + ' from this device.');
    hallStoreRefresh(id);
  });
};

/* --- pieces of the pages --- */

function hallProgressLine(id) {
  var p = planProgress(id);
  return '<div class="astrorow"><span class="k">Read</span> ' + p.done + ' of ' + p.total + '</div>' +
    '<div class="progtrack" role="progressbar" aria-label="Days read" aria-valuemin="0" aria-valuemax="' + p.total +
      '" aria-valuenow="' + p.done + '"><div class="progbar" style="width:' + p.pct + '%"></div></div>';
}
/* The one line a list card says about where the reader is. */
function hallStatus(id) {
  var n = planCount(id);
  if (!n) return 'This text is still being prepared.';
  var today = planToday(id), rec = planPeek(id);
  if (!today) return 'Finished';
  var begun = planProgress(id).done > 0 || !!(rec && rec.start);
  return (begun ? 'Day ' + today + ' of ' + n + ': ' : 'Not begun. Day ' + today + ': ') + hallDayLabel(id, today);
}

function hallProgressCard(id) {
  var rec = planPeek(id) || {}, finished = planCount(id) > 0 && planToday(id) === 0;
  var rounds = Array.isArray(rec.rounds) ? rec.rounds.length : 0;
  return '<div class="card" style="margin-top:14px">' + hallProgressLine(id) +
    (rec.start ? '<p class="px" style="margin-top:12px">Begun ' + esc(jPrettyDate(rec.start)) + '.</p>' : '') +
    (planToday(id) > 0 ? '<p class="px" style="margin-top:12px">A missed morning waits: today’s ' +
      (planIsCourse(id) ? 'teaching' : 'reading') + ' is the first one not yet read.</p>' : '') +
    (rounds ? '<p class="px" style="margin-top:8px">Read through ' + (rounds === 1 ? 'once' : rounds + ' times') + ' before.</p>' : '') +
    (finished ? '<button class="keep" data-act="hallAgain" data-plan="' + esc(id) + '">Begin again</button>' : '') +
    '</div>';
}

/* Every day, or thirty at a time for the long plans, each with its passage
   and its own Read and Mark read. */
function hallDayList(id, withRead) {
  var n = planCount(id);
  if (!n) return '';
  var today = planToday(id);
  var lo = 1, hi = n, chips = '';
  if (n > HALL_LIST_ALL) {
    var groups = Math.ceil(n / HALL_GROUP);
    var g = hallGroup[id];
    if (!(g >= 0 && g < groups)) g = today ? Math.floor((today - 1) / HALL_GROUP) : 0;
    lo = g * HALL_GROUP + 1; hi = Math.min(n, lo + HALL_GROUP - 1);
    var list = [];
    for (var i = 0; i < groups; i++) {
      var a = i * HALL_GROUP + 1, b = Math.min(n, a + HALL_GROUP - 1);
      list.push('<button class="mchip daygroup' + (i === g ? ' on' : '') + '" data-act="hallGroup" data-plan="' + esc(id) +
        '" data-g="' + i + '" aria-pressed="' + (i === g) + '">Days ' + a + ' to ' + b + '</button>');
    }
    chips = '<div class="months daygroups" role="group" aria-label="Which days to show">' + list.join('') + '</div>';
  }
  var read = planReadOf(id), rows = [];
  for (var d = lo; d <= hi; d++) {
    var pair = withRead ? hallReadPair(id, d, 'row') : null;
    rows.push('<div class="dayrow' + (read[d] ? ' done' : '') + '"><div class="dn">' + d + '</div><div class="dbody">' +
      (d === today ? '<div class="ds">' + (withRead ? 'Today’s reading' : 'Today’s teaching') + '</div>' : '') +
      '<p class="dlabel">' + esc(hallDayLabel(id, d)) + '</p>' +
      (pair ? pair.btn + ' ' : '') + hallMarkButton(id, d, 'row') +
      (pair ? pair.box : '') +
      '</div></div>');
  }
  return '<div class="label">' + (n > HALL_LIST_ALL ? 'The days' : 'Every day') + '</div>' + chips + '<div>' + rows.join('') + '</div>';
}

/* The offline card's contents. Drawn at once from the last answer on a
   re-render (hallStoreSeen), so the card keeps its height and the rows
   below it stay under the reader's finger; after() refreshes it. */
function hallStoreHTML(id, st) {
  if (st.whole) {
    return '<p class="px" id="hall-save-' + esc(id) + '">Saved on this device: it opens without a connection.</p>' +
      '<div class="ds" style="margin-top:6px">' + st.total + (st.total === 1 ? ' file, ' : ' files, ') + FLBytes(st.bytes) + '</div>' +
      '<button class="keep" data-act="hallForget" data-plan="' + esc(id) + '">Remove from this device</button>';
  }
  var saving = hallSaving[id];
  return '<p class="px" id="hall-save-' + esc(id) + '">' +
    (saving ? esc(saving) : st.have ? st.have + ' of ' + st.total + ' saved so far.' : 'Not saved on this device yet.') + '</p>' +
    '<div class="ds" style="margin-top:6px">' + FLBytes(st.bytes) + '</div>' +
    '<button class="keep" data-act="hallSave" data-plan="' + esc(id) + '"' + (saving ? ' disabled' : '') + '>Save the whole book</button>';
}

/* --- the three pages --- */

function hallListPage() {
  var works = HALL_YEARS.map(function (h) {
    var id = h[0], ready = readWorkReady(id);
    return '<div class="canon"><p class="pt"><a class="hallname" href="#/hall/' + id + '">' + esc(h[1]) + '</a></p>' +
      '<div class="ds">' + esc(h[2]) + '</div>' +
      '<p class="px" style="margin-top:10px">' + esc(ready ? hallStatus(id) : 'This text is still being prepared.') + '</p>' +
      (ready ? hallProgressLine(id) : '') +
      '<div style="margin-top:4px"><a class="keep" href="#/hall/' + id + '">Open the plan</a></div>' +
    '</div>';
  }).join('');

  /* The traditions in the chamber's own order, never ranked, each drawn
     only once its whole course has landed. */
  var courses = (typeof FL_TRADITIONS === 'undefined' ? [] : FL_TRADITIONS).filter(function (T) {
    return courseReady(T.id) || readCoursePreview(T.id);   // a course in preview shows only with ?preview=teachings
  }).map(function (T) {
    var id = 'course-' + T.id;
    return '<div class="canon"><p class="pt"><a class="hallname" href="#/hall/' + id + '">' + esc(T.name) + '</a></p>' +
      '<div class="ds">Its teachings, a day at a time</div>' +
      '<p class="px" style="margin-top:10px">' + esc(hallStatus(id)) + '</p>' +
      hallProgressLine(id) +
      '<div style="margin-top:4px"><a class="keep" href="#/hall/' + id + '">Open the course</a></div>' +
    '</div>';
  }).join('');

  return '<a class="keep" style="margin-bottom:20px" href="#/library">The Library</a>' +
    '<div class="kick">Ten works, a passage a day</div>' +
    '<h1>The Readings</h1>' +
    '<p class="note">Every work in the Library, divided into daily passages that end where the text itself pauses. ' +
      'Day one is the day you begin, and a missed morning waits for you.</p>' +
    '<div class="label">The works</div>' + works +
    (courses ? '<div class="label">The traditions</div>' + courses : '');
}

function hallPlanPage(id) {
  var h = hallById(id);
  var ready = readWorkReady(id);
  var d = ready ? hallTodayDay(id) : 0, n = planCount(id);

  var today;
  if (!ready) today = '<p class="loadnote">This text is still being prepared.</p>';
  else if (!d) {
    today = '<p class="px">Finished. Every day of this plan is marked read.</p>';
  } else {
    var pair = hallReadPair(id, d, 'today');
    var next = 0;
    if (planReadOf(id)[d]) next = planToday(id);
    today = '<div class="ds">Day ' + d + ' of ' + n + '</div>' +
      '<p class="px dtoday">' + esc(planDayLabel(id, d)) + '</p>' +
      pair.btn + ' ' + hallMarkButton(id, d, 'today') +
      (next ? '<p class="px" style="margin-top:10px">Next: Day ' + next + ', ' + esc(planDayLabel(id, next)) + '.</p>' : '') +
      pair.box;
  }

  /* The day's teaching, once this work's whole set has landed. Filled in
     after(), from its own file; drawn at once when it is already loaded. */
  var teach = '';
  if (ready && d && readTeachReady(id)) {
    var t = readTeachFor(id, d);
    teach = '<div class="teach rteach' + (t ? '' : ' hide') + '" id="hall-teach" data-plan="' + esc(id) + '" data-day="' + d + '">' +
      (t ? readTeachHTML(t) : '') + '</div>';
  }

  return '<a class="keep" style="margin-bottom:20px" href="#/hall">All the readings</a>' +
    '<div class="canon"><h1 class="pt">' + esc(h[1]) + '</h1><div class="ds">' + esc(h[2]) + '</div>' +
      '<p class="cep">“' + esc(h[5]) + '”</p><div class="ds">' + esc(h[6]) + '</div>' +
      '<p class="ct" style="margin-top:10px">' + esc(h[3]) + '</p>' +
      '<p class="ct" style="margin-top:10px"><span style="color:var(--accent)">Core teachings:</span> ' + esc(h[8]) + '</p>' +
      '<div class="label" style="margin-top:18px">Today’s reading</div>' + today +
    '</div>' +
    teach +
    (ready ? hallProgressCard(id) : '') +
    (ready ? '<div class="card" style="margin-top:14px" id="hall-store-' + id + '">' +
      (hallStoreSeen[id] ? hallStoreHTML(id, hallStoreSeen[id])
        : '<p class="loadnote" id="hall-save-' + id + '">Checking what is on this device.</p>') + '</div>' : '') +
    (ready ? hallDayList(id, true) : '');
}

function hallCoursePage(tr) {
  var T = hallTradition(tr), id = 'course-' + tr;
  var days = courseDays(tr), n = days.length;
  var d = hallTodayDay(id), e = d ? days[d - 1] : null;
  var today;
  if (!e) today = '<p class="px">Finished. Every day of this course is marked read.</p>';
  else {
    var t = readCourseFor(tr, d);
    today = '<div class="ds">Day ' + d + ' of ' + n + ', ' + esc(HALL_SECTION[e.sec] || e.sec) + '</div>' +
      '<p class="pt" style="margin-top:6px">' + esc(e.title) + '</p>' +
      (e.when ? '<div class="ds">' + esc(e.when) + '</div>' : '') +
      '<p class="px" style="margin-top:8px">' + esc(e.gloss) + '</p>' +
      '<div class="teach rteach' + (t ? '' : ' hide') + '" id="hall-course" data-course="' + esc(tr) + '" data-day="' + d + '">' +
        (t ? readCourseHTML(t) : '') + '</div>' +
      hallMarkButton(id, d, 'today');
    var next = planReadOf(id)[d] ? planToday(id) : 0;
    if (next) today += '<p class="px" style="margin-top:10px">Next: Day ' + next + ', ' + esc(days[next - 1].title) + '.</p>';
  }
  return '<a class="keep" style="margin-bottom:20px" href="#/hall">All the readings</a>' +
    '<div class="canon"><h1 class="pt">' + esc(T.name) + '</h1><div class="ds">Its teachings, a day at a time</div>' +
      '<p class="ct" style="margin-top:10px">Its concepts, then its practices, then its festivals, as the chamber gives them: ' +
        'each with a line from the tradition’s own texts and one sentence on how it has been read.</p>' +
      '<div class="label" style="margin-top:18px">Today’s teaching</div>' + today +
    '</div>' +
    hallProgressCard(id) +
    hallDayList(id, false) +
    '<div style="margin-top:18px"><a class="keep" href="#/library/' + esc(tr) + '">The chamber: ' + esc(T.name) + '</a></div>';
}

FL_VIEWS.hall = {
  label: 'The Readings',
  title: 'The Readings',
  hidden: true,        // listed under Soul as The Readings; also reached from the Library.
                       // Soul is the one religious door; its sub-row appears only inside it
  render: function (arg) {
    var tr = hallCourseOf(arg);
    if (hallHeld && hallHeld.id !== arg) hallHeld = null;
    if (hallOpenKey && hallOpenKey.split('|')[0] !== arg) hallOpenKey = null;
    if (tr && (courseReady(tr) || readCoursePreview(tr)) && hallTradition(tr)) return hallCoursePage(tr);
    if (arg && !tr && hallById(arg)) return hallPlanPage(arg);
    hallHeld = null;
    return hallListPage();
  },

  after: function (arg) {
    var tr = hallCourseOf(arg);
    if (tr) {
      var ch = document.getElementById('hall-course');
      if (!ch || !ch.classList.contains('hide') || !(courseReady(tr) || readCoursePreview(tr))) return;
      var cd = +ch.getAttribute('data-day');
      readCourseLoad(tr).then(function () {
        var t = readCourseFor(tr, cd);
        if (t && ch.isConnected) { ch.innerHTML = readCourseHTML(t); ch.classList.remove('hide'); }
      }).catch(function () { /* the course page reads without its lines */ });
      return;
    }
    if (!arg || !hallById(arg) || !readWorkReady(arg)) return;

    var th = document.getElementById('hall-teach');
    if (th && th.classList.contains('hide')) {
      var td = +th.getAttribute('data-day');
      readTeachLoad(arg).then(function () {
        var t = readTeachFor(arg, td);
        if (t && th.isConnected) { th.innerHTML = readTeachHTML(t); th.classList.remove('hide'); }
      }).catch(function () { /* the plan reads without its teaching */ });
    }

    var host = document.getElementById('hall-store-' + arg);
    if (!host) return;
    readCanonState(arg).then(function (st) {
      if (!st.ready) return;
      hallStoreSeen[arg] = st;
      if (!host.isConnected) return;
      /* refreshed in place, at the same height; a save in progress draws itself saving */
      var html = hallStoreHTML(arg, st);
      if (host.innerHTML !== html) host.innerHTML = html;
    });
  }
};
