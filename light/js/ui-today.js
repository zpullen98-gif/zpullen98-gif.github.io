/* First Light: Today.

   The artifact's Today was one long scroll: quote, practice, reflection, five canon
   lines, all at once, asking nothing and recording nothing. This is the same
   material arranged as a passage you walk through, ending in a morning that is
   actually finished.

   Three states, and the app chooses between them by the sun rather than the clock:

     morning   the guided sequence: voice, practice, reflection, reading
     evening   the examen, after sunIsEvening() says the sun is down
     page      everything at once, for a reader with thirty seconds

   The evening switch is deliberate and reversible from the page itself. An app that
   silently becomes a different app at dusk would be alarming; one that offers the
   evening's work and lets you go back to the morning's is just attentive. */

var todayStep = 0;
var todayReturnSeen = false;   // the return card shows once per sitting
var todayKeptFired = null;     // the day key the kept event last went out for

/* After three or more missed days, the first thing Today says is not a broken
   number: it is a door. The record keeps what you kept; the year kept your
   place. One interaction and the card is gone. */
function todayReturnCard() {
  if (todayReturnSeen) return '';
  var today = flToday();
  var prior = FL.days.filter(function (k) { return k < today; });
  if (!prior.length) return '';
  var last = prior[prior.length - 1];
  var gap = Math.round((new Date(today + 'T12:00') - new Date(last + 'T12:00')) / 86400000);
  if (gap < 4) return '';
  return '<div class="card" style="margin-bottom:18px"><p class="pt">The record keeps what you kept</p>' +
    '<p class="px">' + gap + ' days since your last morning, and the year kept your place. ' +
    'No chain broke, because none of this was ever a chain. One voice, one breath, begin again.</p>' +
    '<button class="keep" data-act="returnBegin">Begin again</button></div>';
}
FL_ACTS.returnBegin = function () { todayReturnSeen = true; todayStep = 0; render(); };
var todayExamenKind = 'day';   // 'day' (Seneca's three) | 'shift' (the debrief)
var todayForceMode = null;     // 'morning' | 'evening' | null (= follow the sun)

/* Keyed by the track actually being read, not the raw preference: flActiveTrack()
   falls back to the Philosophers for a track that is unknown or unfinished, and
   a voice kept under that fallback must be filed where it was read. */
function trackKey(m, d) { return flActiveTrack().id + ':' + m + '-' + d; }

/* Entries are [day, quote, source, tradition, note?].

   The fifth element is provenance, added by the citation audit. A great deal of what
   circulates as Stoicism is Victorian paraphrase or twentieth-century invention, and
   an almanac that repeats it under a famous name is doing the reader a disservice.
   Where the line is a loose rendering of a real passage, or is not the named author's
   at all, the note says so plainly. A clean citation needs no note and stays four
   elements long. */
function dayEntry(m, d) {
  var arr = trackQ()[m] || [];
  var e = null;
  for (var i = 0; i < arr.length; i++) if (arr[i][0] === d) { e = arr[i]; break; }
  /* All 366 are present, so this is unreachable: if it fires it is a data bug and
     it should be loud rather than silently serving the wrong day. */
  if (!e) { console.error('First Light: no entry for ' + m + '-' + d); e = arr[arr.length - 1]; }
  return { q: e[1], s: e[2], t: e[3], n: e[4] || '' };
}

/* The provenance line, shown beneath a quotation that needs one. */
function provNote(n) {
  return n ? '<div class="prov">' + esc(n) + '</div>' : '';
}

function keepButton(m, d, longLabel) {
  var on = !!FL.kept[trackKey(m, d)];
  return '<button class="keep' + (on ? ' on' : '') + '" data-act="keep" data-m="' + m + '" data-d="' + d + '"' +
         (longLabel ? ' data-long="1"' : '') + ' aria-pressed="' + on + '">' +
         (on ? (longLabel ? 'In your vault' : 'Kept') : (longLabel ? 'Keep this' : 'Keep')) + '</button>';
}

FL_ACTS.keep = function (el) {
  var m = +el.getAttribute('data-m'), d = +el.getAttribute('data-d');
  var k = trackKey(m, d), on = !FL.kept[k];
  if (on) FL.kept[k] = 1; else delete FL.kept[k];
  flSave();
  announce(on ? 'Kept to your vault.' : 'Released from your vault.');
  render();
};

/* --- practice completion ---
   Recovered from first-light.jsx, which had it and the HTML rewrite dropped. */
FL_ACTS.practiceDone = function () {
  var k = flToday();
  if (FL.practice[k]) delete FL.practice[k]; else FL.practice[k] = 1;
  flSave();
  render();
};

FL_ACTS.sitBreath = function () {
  if (typeof pacer === 'undefined') return;
  if (pacer.on) pacerStop(); else pacerStart('box');
  render();
};

FL_ACTS.todayStep = function (el) {
  /* leaving the step should not leave a pacer breathing at nothing */
  if (typeof pacer !== 'undefined' && pacer.on) pacerStop();
  var to = el.getAttribute('data-to');
  todayStep = to === 'next' ? todayStep + 1 : to === 'back' ? todayStep - 1 : +to;
  if (todayStep < 0) todayStep = 0;
  render();
  var v = document.getElementById('view');
  if (v) v.focus({ preventScroll: true });
  window.scrollTo(0, 0);
};

FL_ACTS.todayMode = function (el) {
  if (typeof pacer !== 'undefined' && pacer.on) pacerStop();
  var m = el.getAttribute('data-mode');
  if (m === 'page' || m === 'guided') {
    FL.prefs.todayMode = m; flSave();
    /* clear the session override, or these buttons silently do nothing after
       a forced morning/evening. 'Guided' chosen during the evening forces the
       morning walk, that is what the button promises at that hour, while a
       daytime choice leaves the automatic dusk turn intact. */
    todayForceMode = (m === 'guided' && sunIsEvening()) ? 'morning' : null;
  }
  else { todayForceMode = m; }
  todayStep = 0;
  render();
  window.scrollTo(0, 0);
};

/* FL.intents is the ONLY source of truth for the chosen intent: a session
   mirror made the chip need two taps to clear after a reload. */
FL_ACTS.pickIntent = function (el) {
  var name = el.getAttribute('data-intent');
  var k = flToday();
  if (FL.intents[k] === name) delete FL.intents[k];
  else FL.intents[k] = name;
  flSave();
  render();
};

/* --- pieces --- */
function todayVoice(m, d, e) {
  return '<div class="q"><p class="qt">“' + esc(e.q) + '”</p>' +
    '<span class="qs">' + esc(e.s) + '</span><span class="qtr">' + esc(e.t) + '</span>' +
    provNote(e.n) + '<br>' +
    keepButton(m, d, true) + '</div>';
}

function todayIntentPanel() {
  var chosen = FL.intents[flToday()] || null;
  var chips = INTENTS.map(function (n) {
    return '<button class="mchip' + (chosen === n ? ' on' : '') + '" data-act="pickIntent" data-intent="' +
           esc(n) + '" aria-pressed="' + (chosen === n) + '">' + esc(n) + '</button>';
  }).join('');
  var body = '';
  if (chosen && LOCAL_THEMES[chosen]) {
    var t = LOCAL_THEMES[chosen];
    body = '<div class="card" style="margin-top:12px"><p class="pt">' + esc(t.theme) + '</p>' +
           '<p class="px">' + esc(t.themeNote) + '</p></div>';
  }
  return '<div class="label">If today needs something else</div>' +
    '<p class="px" style="color:var(--faint);margin-bottom:10px">The dated voice is the spine of the year. ' +
    'On a hard day you can name what you need instead; the day is still recorded either way.</p>' +
    '<div class="months" style="justify-content:flex-start">' + chips + '</div>' + body;
}

function todayPractice(p) {
  var done = !!FL.practice[flToday()];
  /* the two practices the app can now actually run link to their rooms */
  var door = '';
  if (p[0] === 'The Examined Evening') {
    door = ' <button class="keep" data-act="todayMode" data-mode="evening">Hold it tonight</button>';
  } else if (p[0] === 'Premeditatio Malorum') {
    door = ' <a class="keep" href="#/body" style="text-decoration:none">The Rehearsal: three minutes, timed</a>';
  }
  return '<div class="card"><p class="pt">' + esc(p[0]) + '</p><p class="px">' + esc(p[1]) + '</p>' +
    '<button class="keep' + (done ? ' on' : '') + '" data-act="practiceDone" aria-pressed="' + done + '">' +
    (done ? 'Done today' : 'Mark it done') + '</button>' + door + '</div>';
}

/* --- the Sorting ---
   Enchiridion 1, dealt as three calls before doors. Nothing is recorded:
   the drill is the repetition, not the tally. */
var todaySort = null;   // { deal:[idx,idx,idx], calls:{idx:'mine'|'not'} }

function todaySortDeal() {
  var idx = [];
  while (idx.length < 3) {
    var i = Math.floor(Math.random() * SORT_SITUATIONS.length);
    if (idx.indexOf(i) < 0) idx.push(i);
  }
  todaySort = { deal: idx, calls: {} };
}

FL_ACTS.sortCall = function (el) {
  if (!todaySort) return;
  todaySort.calls[+el.getAttribute('data-i')] = el.getAttribute('data-c');
  render();
};
FL_ACTS.sortAgain = function () { todaySortDeal(); render(); };

function todaySortPanel() {
  if (!todaySort) todaySortDeal();
  var allCalled = todaySort.deal.every(function (i) { return todaySort.calls[i]; });
  var rows = todaySort.deal.map(function (i) {
    var q = SORT_SITUATIONS[i];
    var call = todaySort.calls[i];
    var verdict = '';
    if (allCalled) {
      var right = (call === 'mine') === q.mine;
      verdict = right
        ? '<p class="px" style="color:var(--faint)">Called right.</p>'
        : '<p class="px" style="color:var(--faint)">' + esc(q.why || 'The other way: this one is yours entirely.') + '</p>';
    }
    var btn = function (c, label) {
      return '<button class="mchip' + (call === c ? ' on' : '') + '" data-act="sortCall" data-i="' + i +
        '" data-c="' + c + '" aria-pressed="' + (call === c) + '"' + (allCalled ? ' disabled' : '') + '>' + label + '</button>';
    };
    return '<div class="card" style="margin-bottom:10px"><p class="px">' + esc(q.s) + '</p>' +
      '<div class="months" style="justify-content:flex-start;margin-top:8px">' +
      btn('mine', 'Mine') + btn('not', 'Not mine') + '</div>' + verdict + '</div>';
  }).join('');
  return '<div class="label">The sorting: before the doors open</div>' +
    '<p class="px" style="color:var(--faint);margin-bottom:10px">Three calls. What is up to you, what is not. ' +
    'Epictetus opened his handbook with this sort because everything else depends on making it fast.</p>' +
    rows +
    (allCalled ? '<button class="keep" data-act="sortAgain">Sort again</button>' : '') +
    '<p class="px" style="margin-top:10px"><a class="readmini" href="#/floor">The floor book: reframes for real tables</a></p>';
}

function todayReadingLines(doy) {
  return HALL_YEARS.map(function (h) {
    return '<p class="px" style="margin-bottom:8px">' +
      '<a href="#/hall/' + h[0] + '" style="font-weight:600">' + esc(h[1]) + '</a>: ' +
      esc(h[4][doy - 1]) + '</p>';
  }).join('');
}

/* The reader decides whether scripture appears on the morning page. Until they
   say yes, at first run or in Settings, the default path stays secular and
   the Library keeps its own tab. This is the promise the suite makes out loud:
   the religious rooms exist, and nobody is walked into them.

   When this is off the morning says NOTHING about the Library. There was once a
   todayCanonQuiet() here that rendered a faint "there is a Library, when you
   want it" line into the reading slot; it is gone. A reader who answered the
   question at first run should not be re-offered the answer every morning, and
   the Library now stands in the top nav where anyone who changes their mind can
   see it without being told. */
/* Kept, and still read by the goal ladder and by search: those are the two
   places outside Prayer where scripture can still appear, and the preference is
   what decides it. Nothing on the morning page consults it any more. */
function todayCanonOn() { return FL.prefs.canonLines === 'on'; }

/* --- the guided morning --- */
function todayGuided(m, d, e, doy, p) {
  var steps = [
    { label: 'The voice', body: function () {
        return todayVoice(m, d, e) +
          '<p class="mintro" style="margin-top:18px">Read it twice. The second time is the one that lands.</p>' +
          '<p class="refl" style="margin-top:14px">' + esc(TURN_PROMPTS[doy % TURN_PROMPTS.length]) + '</p>';
      } },
    { label: 'Sit with it', body: function () {
        var on = (typeof pacer !== 'undefined' && pacer.on);
        return '<div class="pacer-disc" id="pacer-disc" aria-hidden="true"></div>' +
          '<div class="pacer-label" id="pacer-label">' + (on ? '' : 'Ready') + '</div>' +
          '<div class="ds" id="pacer-count"></div>' +
          '<p class="mintro">A minute, or the length of ten slow breaths. Nothing to achieve: ' +
          'this is the interval in which the line stops being information and becomes yours.</p>' +
          '<div style="text-align:center;margin-top:10px">' +
          '<button class="mchip' + (on ? ' on' : '') + '" data-act="sitBreath">' +
          (on ? 'Let it fade' : 'Pace the breaths') + '</button></div>';
      } },
    { label: 'The practice', body: function () { return todayPractice(p); } },
    { label: 'The reflection', body: function () {
        var ref = jRef('day', flToday());
        return '<p class="refl">' + esc(REFLECTIONS[doy % REFLECTIONS.length]) + '</p>' +
          '<div style="margin-top:16px">' + jField(ref, 'Answer it, or don’t. A sentence counts.', flToday(), 5) + '</div>';
      } },
  ];

  /* There is no reading step, for anybody, on any setting. The scripture lives
     in Prayer and is entered on purpose. It was a step for a reader who had
     asked for it, which was already a long way from where this began, and the
     morning is now four steps for everyone: voice, practice, reflection, and
     what you write. A person who wants the day's readings goes and gets them. */

  if (todayStep >= steps.length) {
    var streak = flStreak();
    /* One event per day, the first time the kept state renders. The shared
       layer listens for this rather than counting steps from outside, and the
       day latch keeps "Walk it again" and every re-render from sending it twice. */
    var keptDay = flToday();
    if (todayKeptFired !== keptDay) {
      todayKeptFired = keptDay;
      try {
        window.dispatchEvent(new CustomEvent('fl:morning-kept', { detail: { day: FL.days.length, streak: streak } }));
      } catch (e) {}
    }
    /* one line the reader knows by heart goes onto the floor with them,
       rotating through the by-heart shelf by the day */
    var prefix = flActiveTrack().id + ':';
    var known = Object.keys(FL.byheart).filter(function (k) {
      return FL.byheart[k] === 2 && k.indexOf(prefix) === 0;
    }).sort();
    var ready = '';
    if (known.length) {
      var kk = known[doy % known.length].slice(prefix.length).split('-').map(Number);
      var ke = dayEntry(kk[0], kk[1]);
      ready = '<div class="label" style="margin-top:20px">Ready at hand today</div>' +
        '<p class="refl">“' + esc(ke.q) + '”</p>' +
        '<p class="px" style="color:var(--faint)">' + esc(ke.s) + ', you know this one. Take it with you.</p>';
    }
    return '<div class="disc" aria-hidden="true"></div>' +
      '<div class="kick">' + esc(flShiftedNow().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })) + '</div>' +
      '<h1>The morning is kept</h1>' +
      '<p class="note">' + (streak > 1 ? streak + ' consecutive mornings. ' : '') +
      FL.days.length + ' in the record.</p>' +
      '<div class="drawrow" style="justify-content:center;margin-top:24px">' +
        '<button class="keep" data-act="todayStep" data-to="0">Walk it again</button>' +
        '<button class="keep" data-act="todayMode" data-mode="page">See the whole page</button>' +
      '</div>' +
      ready +
      '<p class="px" style="text-align:center;margin-top:10px"><a class="readmini" href="#/reset">' +
        'Later, mid-shift: the Walk-In: ninety seconds</a></p>' +
      (sunIsEvening() ? '<div class="drawrow" style="justify-content:center">' +
        '<button class="btn" data-act="todayMode" data-mode="evening">The evening examen</button></div>' : '');
  }

  var s = steps[todayStep];
  var returnCard = todayStep === 0 ? todayReturnCard() : '';
  var dots = steps.map(function (x, i) {
    return '<button class="stepdot' + (i === todayStep ? ' on' : '') + (i < todayStep ? ' past' : '') +
      '" data-act="todayStep" data-to="' + i + '" aria-label="' + esc(x.label) + '"' +
      (i === todayStep ? ' aria-current="step"' : '') + '></button>';
  }).join('');

  return returnCard +
    '<div class="kick">' + esc(flShiftedNow().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })) + '</div>' +
    '<h1>' + esc(trackMonths()[m - 1][1]) + '</h1>' +
    '<div class="steprow">' + dots + '</div>' +
    '<div class="label" style="margin-top:8px">' + esc(s.label) + '</div>' +
    s.body() +
    '<div class="drawrow" style="margin-top:26px">' +
      (todayStep > 0 ? '<button class="keep" data-act="todayStep" data-to="back">Back</button>' : '<span></span>') +
      '<button class="btn" data-act="todayStep" data-to="next">' +
        (todayStep === steps.length - 1 ? 'Finish' : 'Next') + '</button>' +
    '</div>' +
    '<div style="text-align:center;margin-top:20px">' +
      '<button class="readmini" data-act="todayMode" data-mode="page">Show the whole page instead</button>' +
    '</div>';
}

/* --- the evening examen ---
   Seneca's three questions, recovered from first-light.jsx. The artifact still named
   "The Examined Evening" as a practice but had nowhere to actually do it. */
FL_ACTS.examKind = function (el) {
  todayExamenKind = el.getAttribute('data-kind') === 'shift' ? 'shift' : 'day';
  render();
};

function todayExamen() {
  var key = flToday();   /* respects prefs.dayEnd: a 2am debrief lands on the shift's own day */
  var shift = todayExamenKind === 'shift';
  var bank = shift ? DEBRIEF_QUESTIONS : EXAMEN_QUESTIONS;
  var kind = shift ? 'debrief' : 'examen';
  var fields = bank.map(function (q) {
    var ref = jRef(kind, key + ':' + q.key);
    return '<div class="label">' + esc(q.label) + '</div>' + jField(ref, '', key, 3, q.label);
  }).join('');

  var wrote = bank.some(function (q) { return jText(jRef(kind, key + ':' + q.key)).trim(); });

  var tabs = '<div class="months" style="justify-content:center;margin-bottom:14px">' +
    '<button class="mchip' + (!shift ? ' on' : '') + '" data-act="examKind" data-kind="day" aria-pressed="' + !shift + '">The day</button>' +
    '<button class="mchip' + (shift ? ' on' : '') + '" data-act="examKind" data-kind="shift" aria-pressed="' + shift + '">The shift</button>' +
    '</div>';

  var kept = shift
    ? '<p class="mintro" style="margin-top:22px">Kept. What got left here, stays here.</p>' +
      '<p class="px" style="text-align:center"><a href="#/body">After close: twelve minutes on the floor before bed</a></p>'
    : '<p class="mintro" style="margin-top:22px">Kept. The day is closed.</p>';

  return '<div class="disc" aria-hidden="true"></div>' +
    '<div class="kick">' + esc(flShiftedNow().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })) + '</div>' +
    '<h1>' + (shift ? 'Last call' : 'The examined evening') + '</h1>' +
    (shift
      ? '<p class="note">The shift has a residue, and it does not belong in your bed. ' +
        'Four questions. No one else reads the answers, not a manager, not anyone.</p>'
      : '<p class="note">Seneca pleaded his case before his own court each night, and hid nothing from himself. ' +
        'His three questions, and a fourth to leave at the door. No one else reads the answers.</p>') +
    tabs +
    fields +
    (wrote ? kept : '') +
    '<div style="text-align:center;margin-top:22px">' +
      '<button class="readmini" data-act="todayMode" data-mode="morning">Back to the morning</button> ' +
      '<button class="readmini" data-act="todayMode" data-mode="page">The whole page</button>' +
    '</div>';
}

/* --- the whole page --- */
function todayPage(m, d, e, doy, p) {
  var streak = flStreak();
  var count = streak > 1
    ? 'Morning ' + FL.days.length + ' of your record · ' + streak + ' consecutive'
    : 'Morning ' + FL.days.length + ' of your record.';

  return '<div class="disc" aria-hidden="true"></div>' +
    '<div class="kick">' + esc(flShiftedNow().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })) + '</div>' +
    '<div class="streakline">' + esc(count) + '</div>' +
    '<h1>' + esc(trackMonths()[m - 1][1]) + '</h1>' +
    '<p class="note">' + esc(trackMonths()[m - 1][2]) + '</p>' +
    todayVoice(m, d, e) +
    '<p class="refl" style="margin-top:10px">' + esc(TURN_PROMPTS[doy % TURN_PROMPTS.length]) + '</p>' +
    '<div class="label">Today’s practice</div>' + todayPractice(p) +
    '<div class="label">Reflection</div>' +
    '<p class="refl">' + esc(REFLECTIONS[doy % REFLECTIONS.length]) + '</p>' +
    '<div style="margin-top:14px">' + jField(jRef('day', flToday()), 'Answer it, or don’t. A sentence counts.', flToday(), 4) + '</div>' +
    /* "Today in the five canons" stood here. Nothing does now: the morning page
       carries no scripture on any setting, and Prayer is a tab you open. */
    todayIntentPanel() +
    todaySortPanel() +
    '<div style="text-align:center;margin-top:26px">' +
      '<a class="readmini" href="#/reset">The Walk-In: ninety seconds, mid-shift</a> ' +
      '<button class="readmini" data-act="todayMode" data-mode="guided">Walk it through instead</button>' +
      (sunIsEvening() ? ' <button class="readmini" data-act="todayMode" data-mode="evening">The evening examen</button>' : '') +
    '</div>';
}

FL_VIEWS.today = {
  label: 'Today',
  title: 'Today',
  render: function () {
    /* the shifted clock: at 2am a closer sees the day they are closing,
       not tomorrow's voice. The weekly practice also rotates around the
       reader's own rest day: 'The Examined Evening' on a bartender's
       civil Friday was landing on the industry's hardest night. */
    var now = flShiftedNow(), m = now.getMonth() + 1, d = now.getDate();
    var e = dayEntry(m, d);
    var doy = doyOf(m, d);
    var p = PRACTICES[(now.getDay() + 7 - (Number(FL.prefs.weekAnchor) || 0)) % 7];

    var mode = todayForceMode ||
               (FL.prefs.todayMode === 'page' ? 'page'
                : sunIsEvening() ? 'evening' : 'guided');

    if (mode === 'evening') return todayExamen();
    if (mode === 'page') return todayPage(m, d, e, doy, p);
    return todayGuided(m, d, e, doy, p);
  }
};
