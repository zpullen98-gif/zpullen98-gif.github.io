/* First Light: The Line-Up.

   The one venue-facing surface in the app, built for the bar iPad or the
   kitchen screen during pre-shift line-up: today's voice in large type, the
   box breath running full-size, one line of intention, and nothing else.

   STATELESS BY CONSTRUCTION: the no-surveillance doctrine as architecture.
   This view never reads or writes the personal record: no keep button, no
   streak, no journal, no names, and app.js skips flMarkDay when the app
   boots straight into it, so a dedicated line-up screen accrues no record
   at all. What the crew shares is content, and because doyOf() is a fixed
   table, every venue in the program reads the same voice on the same date.
   A team ritual made entirely of words, never of people-data. */

FL_VIEWS.lineup = {
  label: 'The Line-Up',
  title: 'The Line-Up',
  hidden: true,   // reached from Settings; it belongs to a screen, not a nav
  render: function () {
    var now = new Date();   // the venue's clock, deliberately not the shift clock
    var m = now.getMonth() + 1, d = now.getDate();
    var e = dayEntry(m, d);
    var on = (typeof pacer !== 'undefined' && pacer.on);

    return '<div class="kick">' + esc(now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })) + ' · before doors</div>' +
      '<div class="q" style="margin-top:18px"><p class="qt" style="font-size:1.5em;line-height:1.45">“' + esc(e.q) + '”</p>' +
      '<span class="qs">' + esc(e.s) + '</span><span class="qtr">' + esc(e.t) + '</span></div>' +
      '<div class="pacer-disc" id="pacer-disc" aria-hidden="true" style="margin-top:26px"></div>' +
      '<div class="pacer-label" id="pacer-label">' + (on ? '' : 'Ready') + '</div>' +
      '<div class="ds" id="pacer-count"></div>' +
      '<div style="text-align:center;margin-top:12px">' +
        '<button class="btn" data-act="lineupBreath">' + (on ? 'Enough, doors' : 'One minute, together') + '</button></div>' +
      '<p class="mintro" style="margin-top:24px">Steady hands pour steady nights. Go be good to somebody.</p>' +
      '<div class="card" style="margin-top:30px">' +
        '<p class="px" style="color:var(--faint)"><strong>Running a one-minute line-up:</strong> read the voice ' +
        'aloud once: anyone can be the reader. Start the breath and let it run five or six rounds. Say the floor ' +
        'plan. Done. This screen keeps no record of anything and needs no login: it is a page of words, ' +
        'shared because everyone in the program sees the same voice on the same date. Staff who want the full ' +
        'practice open First Light on their own phones: what they do there is theirs alone.</p>' +
      '</div>';
  }
};

FL_ACTS.lineupBreath = function () {
  if (typeof pacer === 'undefined') return;
  if (pacer.on) pacerStop(); else pacerStart('box');
  render();
};
