/* First Light: Reflection.

   Everything that asks the reader to write lives here, in its own tab, and
   nowhere on the morning page. The morning's reflection question with its
   field, and the evening examen (the day, or the shift) with its four. The
   refs are the ones the journal has always used (day:, examen:, debrief:), so
   every entry a reader has already written appears exactly where it did.

   The page reads by the sun: in the evening the examen comes first and the
   morning question sits beneath it; by day the order is the other way. Both
   are always present, so a closer writing the morning's answer at 2am is not
   sent looking for it. */

var todayExamenKind = 'day';   /* 'day' (Seneca's three) | 'shift' (the debrief); app.js resets it at midnight */

FL_ACTS.examKind = function (el) {
  todayExamenKind = el.getAttribute('data-kind') === 'shift' ? 'shift' : 'day';
  render();
};

function reflectMorning(doy) {
  var ref = jRef('day', flToday());
  var wrote = !!jText(ref).trim();
  return '<div class="label">This morning</div>' +
    '<p class="refl">' + esc(REFLECTIONS[doy % REFLECTIONS.length]) + '</p>' +
    '<div style="margin-top:14px">' + jField(ref, 'Answer it, or do not. A sentence counts.', flToday(), 5) + '</div>' +
    (wrote ? '<p class="px" style="color:var(--faint);margin-top:6px">Kept. It is in your journal.</p>' : '');
}

/* Seneca's three questions, and the shift's debrief. Recovered from
   first-light.jsx, kept here since the morning page stopped writing. */
function reflectExamen() {
  var key = flToday();   /* respects prefs.dayEnd: a 2am debrief lands on the shift's own day */
  var shift = todayExamenKind === 'shift';
  var bank = shift ? DEBRIEF_QUESTIONS : EXAMEN_QUESTIONS;
  var kind = shift ? 'debrief' : 'examen';
  var fields = bank.map(function (q) {
    var ref = jRef(kind, key + ':' + q.key);
    return '<div class="label">' + esc(q.label) + '</div>' + jField(ref, '', key, 3, q.label);
  }).join('');
  var wrote = bank.some(function (q) { return jText(jRef(kind, key + ':' + q.key)).trim(); });

  var tabs = '<div class="months" style="justify-content:flex-start;margin-bottom:14px">' +
    '<button class="mchip' + (!shift ? ' on' : '') + '" data-act="examKind" data-kind="day" aria-pressed="' + !shift + '">The day</button>' +
    '<button class="mchip' + (shift ? ' on' : '') + '" data-act="examKind" data-kind="shift" aria-pressed="' + shift + '">The shift</button>' +
    '</div>';

  var kept = shift
    ? '<p class="mintro" style="margin-top:18px">Kept. What got left here, stays here.</p>' +
      '<p class="px" style="text-align:center"><a href="#/body">After close: twelve minutes on the floor before bed</a></p>'
    : '<p class="mintro" style="margin-top:18px">Kept. The day is closed.</p>';

  return '<div class="label">This evening</div>' +
    '<p class="pt">' + (shift ? 'Last call' : 'The examined evening') + '</p>' +
    (shift
      ? '<p class="px" style="color:var(--faint);margin-bottom:12px">The shift has a residue, and it does not belong in your bed. Four questions. No one else reads the answers.</p>'
      : '<p class="px" style="color:var(--faint);margin-bottom:12px">Seneca pleaded his case before his own court each night, and hid nothing from himself. His three questions, and a fourth to leave at the door.</p>') +
    tabs + fields + (wrote ? kept : '');
}

FL_VIEWS.reflect = {
  label: 'Reflection',
  title: 'Reflection',
  render: function () {
    var now = flShiftedNow();
    var doy = doyOf(now.getMonth() + 1, now.getDate());
    var evening = sunIsEvening();
    var morning = reflectMorning(doy);
    var exam = reflectExamen();
    return '<div class="kick">' + esc(now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })) + '</div>' +
      '<h1>Reflection</h1>' +
      '<p class="note">Your own words, kept on this device and read by no one else.</p>' +
      '<div class="flow">' +
        (evening ? exam + '<div style="height:26px"></div>' + morning : morning + '<div style="height:26px"></div>' + exam) +
      '</div>' +
      '<div style="text-align:center;margin-top:28px">' +
        '<a class="readmini" href="#/journal">Everything you have written</a> ' +
        '<a class="readmini" href="#/today">Back to the morning</a>' +
      '</div>';
  }
};
