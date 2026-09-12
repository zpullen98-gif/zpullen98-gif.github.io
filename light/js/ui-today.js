/* First Light: Today.

   The morning page. Two rules govern it.

   IT ASKS THE READER TO WRITE NOTHING. Every field lives in Reflection, one
   tab over.

   IT NEVER COUNTS AT THEM. No streak, no day number, no notice about how long
   it has been. A streak punishes hardest exactly when somebody is already
   struggling, and an absence notice is an app telling a person off for living.
   The totals still exist for anyone who goes looking for them, in Settings and
   in The Record. They are not brought to the reader unasked. This is the same
   position the journal heatmap already took when it chose to report a steady
   month or a fallow month rather than a verdict.

   WHAT IT DOES INSTEAD is give every morning the same shape. Four things, in
   the same order, whether it is day two or day two hundred:

     Read      the voice, the lift, the teaching
     Move      the day's session from the movement programme, run on this page
     Breathe   ten slow breaths on the pacer
     Reflect   the question, in the Reflection tab

   Three of the four tick themselves when the app can honestly know they are
   done. All four can be tapped, because an app that will not let you say you
   did it is worse than one that trusts you.

   Two ways to read the page, remembered in FL.prefs.todayMode:
     page      one flowing page, the default
     guided    the walk: voice, sit with it, the practice

   At dusk the page does not become something else. It adds one card that opens
   the examined evening in Reflection. */

var todayStep = 0;
var todayKeptFired = null;     // the day key the kept event last went out for
var todayForceMode = null;     // 'guided' | 'page' | null (= the saved preference)
var liftSeed = 0;              // "Another" deals a fresh pair for the session; nothing is recorded

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

/* 'page' and 'guided' are remembered; 'evening' is a door to Reflection, where
   the examen lives now; 'morning' is the old name for the guided walk and is
   kept so a stale button cannot do nothing. */
FL_ACTS.todayMode = function (el) {
  if (typeof pacer !== 'undefined' && pacer.on) pacerStop();
  var m = el.getAttribute('data-mode');
  if (m === 'evening') { location.hash = '#/reflect'; return; }
  if (m === 'morning') m = 'guided';
  FL.prefs.todayMode = m; flSave();
  todayForceMode = null;
  todayStep = 0;
  render();
  window.scrollTo(0, 0);
};

FL_ACTS.liftAgain = function () {
  liftSeed++;
  render();
  announce('Two more lines.');
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

/* ═══════════════ this morning ═══════════════ */

/* Whether anything at all was written for today, in either the morning's
   question or either evening bank. This is the one item the app can know
   about without being told, so it checks rather than asks. */
function todayReflected() {
  var k = flToday();
  if (jText(jRef('day', k)).trim()) return true;
  var banks = [['examen', EXAMEN_QUESTIONS], ['debrief', DEBRIEF_QUESTIONS]];
  for (var i = 0; i < banks.length; i++) {
    for (var j = 0; j < banks[i][1].length; j++) {
      if (jText(jRef(banks[i][0], k + ':' + banks[i][1][j].key)).trim()) return true;
    }
  }
  return false;
}

/* Anything the app can see for itself is ticked before the list is drawn, so
   the record is the single source of truth and a tick survives a reload. */
function todaySyncTicks() {
  var done = flMorningOf();
  if (!done.reflect && todayReflected()) flMorningTick('reflect');
  if (!done.move && (FL.moves[flToday()] || 0) > 0) flMorningTick('move');
}

FL_ACTS.mornTick = function (el) {
  var item = el.getAttribute('data-item');
  if (flMorningOf()[item]) flMorningUntick(item); else flMorningTick(item);
  render();
};

function todayMorningList() {
  var done = flMorningOf();
  var mv = moveToday();
  var items = [
    ['read', 'Read', 'The voice, a line to lift you, and the teaching for the month.'],
    ['move', 'Move', mv.name + ', ' + mv.mins + ' minutes.'],
    ['breathe', 'Breathe', 'Ten slow breaths, paced.'],
    ['reflect', 'Reflect', 'One question, in your own words.']
  ];
  var rows = items.map(function (it) {
    var on = !!done[it[0]];
    return '<button class="mrow' + (on ? ' on' : '') + '" data-act="mornTick" data-item="' + it[0] + '"' +
      ' aria-pressed="' + on + '">' +
      '<span class="mbox" aria-hidden="true">' + (on ? '&#10003;' : '') + '</span>' +
      '<span><span class="mname">' + esc(it[1]) + '</span>' +
      '<span class="mwhat">' + esc(it[2]) + '</span></span></button>';
  }).join('');
  return '<div class="label">This morning</div>' +
    '<div class="morn">' + rows + '</div>';
}

/* ═══════════════ the movement ═══════════════ */

FL_ACTS.moveStart = function (el) {
  if (typeof pacer !== 'undefined' && pacer.on) pacerStop();
  seqStart(el.getAttribute('data-id'), 0);
  render();
};
FL_ACTS.moveStop = function () { seqStop(); };

function todayMove() {
  var mv = moveToday();
  var focus = moveFocusFor(flShiftedNow().getDay());
  var lv = moveLevel();
  var toNext = moveToNext();
  var levelLine = 'Level ' + lv +
    (toNext === null ? ', the last one' : ', ' + toNext + ' more ' + (toNext === 1 ? 'session' : 'sessions') + ' to level ' + (lv + 1));

  /* running: the engine writes into #seq-time and #seq-bar, so all this has to
     do is print them and the step it is on */
  if (typeof seq !== 'undefined' && seq.on && String(seq.id).indexOf('mv-') === 0) {
    var s = seqFind(seq.id);
    var step = s.steps[seq.step] || s.steps[s.steps.length - 1];
    return '<div class="label">Today’s movement</div>' +
      '<div class="movecard">' +
        '<div class="mfocus">' + esc(s.name) + ' · step ' + (seq.step + 1) + ' of ' + s.steps.length + '</div>' +
        '<p class="movestep">' + esc(step[0]) + '</p>' +
        '<p class="px">' + esc(step[2]) + '</p>' +
        '<div class="seqtime" id="seq-time" style="margin-top:12px">0:00</div>' +
        '<div class="seqtrack"><div class="seqbar" id="seq-bar"></div></div>' +
        '<div style="margin-top:14px"><button class="keep" data-act="moveStop">Stop</button></div>' +
      '</div>';
  }

  return '<div class="label">Today’s movement</div>' +
    '<div class="movecard">' +
      '<div class="mfocus">' + esc(focus.name) + '</div>' +
      '<p class="pt">' + esc(mv.name) + '</p>' +
      '<p class="mwhy">' + esc(mv.why) + '</p>' +
      '<p class="px" style="color:var(--faint)">' + esc(mv.note) + '</p>' +
      '<div style="margin-top:14px">' +
        '<button class="btn" data-act="moveStart" data-id="' + esc(mv.id) + '">Begin, ' + mv.mins + ' minutes</button>' +
      '</div>' +
      '<p class="movelevel" style="margin-top:12px">' + esc(levelLine) + '</p>' +
    '</div>' +
    '<p class="px" style="margin-top:6px"><a class="readmini" href="#/body">The whole programme, and the week</a></p>';
}

/* ═══════════════ the breath ═══════════════ */

function todayBreath() {
  var on = (typeof pacer !== 'undefined' && pacer.on);
  return '<div class="label">The breath</div>' +
    '<div class="pacerbox">' +
      '<div class="pacer-disc" id="pacer-disc" aria-hidden="true"></div>' +
      '<div class="pacer-label" id="pacer-label">' + (on ? '' : 'Ready') + '</div>' +
      '<div class="ds" id="pacer-count"></div>' +
    '</div>' +
    '<p class="mintro">Follow the disc. In as it grows, out as it falls. Five full rounds is a morning’s worth, ' +
    'and the day’s Breathe marks itself when you get there.</p>' +
    '<div style="text-align:center;margin-top:10px">' +
      '<button class="mchip' + (on ? ' on' : '') + '" data-act="sitBreath">' +
      (on ? 'Let it fade' : 'Pace the breaths') + '</button></div>';
}

/* --- pieces --- */
function todayVoice(m, d, e) {
  return '<div class="q"><p class="qt">“' + esc(e.q) + '”</p>' +
    '<span class="qs">' + esc(e.s) + '</span><span class="qtr">' + esc(e.t) + '</span>' +
    provNote(e.n) + '<br>' +
    keepButton(m, d, true) + '</div>';
}

/* Two lines from the lift bank, chosen by the day; "Another" walks the seed. */
function todayLift(doy) {
  if (typeof UPLIFT === 'undefined' || !UPLIFT.length) return '';
  var n = UPLIFT.length;
  var a = (doy + liftSeed * 13) % n;
  var b = (doy * 7 + 3 + liftSeed * 17) % n;
  if (b === a) b = (b + 1) % n;
  var one = function (i) {
    var u = UPLIFT[i];
    return '<div class="lift"><p class="lq">“' + esc(u[0]) + '”</p>' +
      '<span class="ls">' + esc(u[1]) + '</span></div>';
  };
  return '<div class="label">A lift for the day</div>' + one(a) + one(b) +
    '<div style="text-align:center;margin-top:4px"><button class="keep" data-act="liftAgain">Another</button></div>';
}

/* One short teaching for the month, in the app's own voice. */
function todayTeaching(m, doy) {
  if (typeof TEACHINGS === 'undefined' || !TEACHINGS[m - 1]) return '';
  var set = TEACHINGS[m - 1];
  var t = set[doy % set.length];
  return '<div class="teach"><p class="pt">' + esc(trackMonths()[m - 1][1]) + '</p>' +
    '<p class="px">' + esc(t) + '</p></div>';
}

function todayEveningCard() {
  if (!sunIsEvening()) return '';
  return '<div class="card evecard" style="margin-bottom:18px"><p class="pt">The sun is down</p>' +
    '<p class="px">The examined evening is waiting in Reflection: Seneca’s three questions, or the shift’s last call.</p>' +
    '<a class="keep" href="#/reflect" style="text-decoration:none">Open the evening</a></div>';
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
    door = ' <a class="keep" href="#/reflect" style="text-decoration:none">Hold it tonight</a>';
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

/* Kept, and still read by the goal ladder and by search: those are the two
   places outside Prayer where scripture can still appear, and the preference is
   what decides it. Nothing on the morning page consults it. */
function todayCanonOn() { return FL.prefs.canonLines === 'on'; }

/* One event per day, the first time a morning renders. The shared layer in the
   suite listens for this rather than counting steps from outside, and the day
   latch keeps re-renders from sending it twice. Nothing in this file displays
   the streak it carries. */
function todayFireKept() {
  var keptDay = flToday();
  if (todayKeptFired === keptDay) return;
  todayKeptFired = keptDay;
  try {
    window.dispatchEvent(new CustomEvent('fl:morning-kept', { detail: { day: FL.days.length, streak: flStreak() } }));
  } catch (e) {}
}

function todayDateLine() {
  return '<div class="kick">' + esc(flShiftedNow().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })) + '</div>';
}

/* --- the guided morning --- */
function todayGuided(m, d, e, doy, p) {
  var steps = [
    { label: 'The voice', body: function () {
        return todayVoice(m, d, e) +
          '<p class="mintro" style="margin-top:18px">Read it twice. The second time is the one that lands.</p>' +
          '<p class="refl" style="margin-top:14px">' + esc(TURN_PROMPTS[doy % TURN_PROMPTS.length]) + '</p>';
      } },
    { label: 'Sit with it', body: function () {
        return todayBreath();
      } },
    { label: 'Move', body: function () { return todayMove(); } },
    { label: 'The practice', body: function () { return todayPractice(p) + todayLift(doy); } }
  ];

  if (todayStep >= steps.length) {
    todayFireKept();
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
      todayDateLine() +
      '<h1>The morning is kept</h1>' +
      '<p class="note">Whatever else today asks of you, this part is done.</p>' +
      '<div class="drawrow" style="justify-content:center;margin-top:24px">' +
        '<a class="btn" href="#/reflect">Write your reflection</a>' +
        '<button class="keep" data-act="todayStep" data-to="0">Walk it again</button>' +
        '<button class="keep" data-act="todayMode" data-mode="page">See the whole page</button>' +
      '</div>' +
      todayTeaching(m, doy) +
      ready +
      '<p class="px" style="text-align:center;margin-top:10px"><a class="readmini" href="#/reset">' +
        'Later, mid-shift: the Walk-In, ninety seconds</a></p>' +
      (sunIsEvening() ? '<div class="drawrow" style="justify-content:center">' +
        '<a class="btn" href="#/reflect">The evening examen</a></div>' : '');
  }

  var s = steps[todayStep];
  var dots = steps.map(function (x, i) {
    return '<button class="stepdot' + (i === todayStep ? ' on' : '') + (i < todayStep ? ' past' : '') +
      '" data-act="todayStep" data-to="' + i + '" aria-label="' + esc(x.label) + '"' +
      (i === todayStep ? ' aria-current="step"' : '') + '></button>';
  }).join('');

  return todayDateLine() +
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

/* --- the whole page --- */
function todayPage(m, d, e, doy, p) {
  todayFireKept();
  return '<div class="disc" aria-hidden="true"></div>' +
    todayDateLine() +
    '<h1>' + esc(trackMonths()[m - 1][1]) + '</h1>' +
    '<p class="note">' + esc(trackMonths()[m - 1][2]) + '</p>' +
    '<div class="flow">' +
      todayEveningCard() +
      todayMorningList() +
      todayVoice(m, d, e) +
      '<p class="refl" style="margin-top:10px">' + esc(TURN_PROMPTS[doy % TURN_PROMPTS.length]) + '</p>' +
      todayLift(doy) +
      todayTeaching(m, doy) +
      todayMove() +
      todayBreath() +
      '<div class="label">Today’s practice</div>' + todayPractice(p) +
      todayIntentPanel() +
      todaySortPanel() +
    '</div>' +
    '<div style="text-align:center;margin-top:26px">' +
      '<a class="readmini" href="#/reflect">Write your reflection</a> ' +
      '<button class="readmini" data-act="todayMode" data-mode="guided">Walk it through instead</button> ' +
      '<a class="readmini" href="#/reset">The Walk-In: ninety seconds, mid-shift</a>' +
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

    todaySyncTicks();

    var mode = todayForceMode || (FL.prefs.todayMode === 'guided' ? 'guided' : 'page');
    if (mode === 'guided') return todayGuided(m, d, e, doy, p);
    return todayPage(m, d, e, doy, p);
  }
};
