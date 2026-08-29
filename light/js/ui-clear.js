/* First Light: Clear Mornings.

   A room of its own, for anyone in the trade quietly thinking about their
   drinking. The voice is a colleague, not a counselor: no pledges, no labels,
   no diagnosis, and nothing in here ever touches a streak: chain-framing
   converts one lapse into "ruined," and these workers stand next to the tap
   again tomorrow. The mark is a count of clear days, total and this month,
   and it is the only arithmetic allowed in the room.

   PRIVACY IS STRUCTURAL, decided here and enforced at the surfaces: the room
   is hidden from the nav (the hall pattern), its door is one quiet line in
   Settings, its notes are excluded from the Journal view and from search
   (see the 'clear:' filters in ui-journal.js and search.js), and the mark
   appears in no stat, heatmap, or export summary. What happens in this room
   renders only in this room. */

const CLEAR_SECTIONS = [
  ["What this room is",
   "A place to think, with the door shut. Nothing here diagnoses you, labels you, or asks you to sign anything. " +
   "The trade runs on drink (pouring it is the craft this whole suite teaches) and that is exactly why the honest " +
   "question is harder here than anywhere else, and worth better tools than a hangover and a vow. " +
   "Nobody sees this room. It is not in the menu, not in your stats, not in search. The only person it reports to is you."],
  ["The honest ledger",
   "The shift drink works — that is the problem with it. It lands on an empty tank, after adrenaline, at the exact " +
   "hour the body is defenseless, which makes it the most efficient drink of the week. Efficiency builds tolerance; " +
   "tolerance quietly moves the goalposts; and one becomes the new zero without a single dramatic night. " +
   "No lecture follows. Just arithmetic worth doing while the pencil is yours: what did this week actually pour, " +
   "and who decided each one — you, or the end of the shift?"],
  ["Seneca kept this ledger too",
   "This is not a modern anxiety. Seneca wrote a whole letter on drunkenness — the eighty-third — and his sharpest " +
   "line is not about wine at all: he calls drunkenness 'voluntary madness,' chosen one cup at a time, and asks why " +
   "a man who would never sign away his judgment sells it nightly for the price of feeling nothing. " +
   "The letter is not temperance copy. It is a professional noticing what a habit does to the instrument he works " +
   "with — which is also your situation, exactly."],
  ["The pour question",
   "One question, asked after the night, never before it: did tonight's drink pour itself, or did you pour it? " +
   "A drink you poured (chose, wanted, enjoyed) needs no defending. A drink that poured itself — that arrived by " +
   "autopilot, because close-out ends that way, because everyone was having one, is information. Not guilt; " +
   "information. Noticing the difference is the entire practice, and nobody gets it right every night."],
  ["If it is bigger than this room",
   "A room in an app knows its size. If the question has stopped feeling like a question (if the counting scares " +
   "you, or the skipping fails more than it works) then the next conversation should be with someone whose craft " +
   "this is: a doctor, a meeting, the coworker who has been sober for years and never made it weird. Asking is a " +
   "trade skill. You ask the chef where the allergens are; you ask the old hand how they got out clean. " +
   "It is the same ask."]
];

function clearCounts() {
  var keys = Object.keys(FL.clear || {});
  var now = flShiftedNow();
  var monthPrefix = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-';
  var month = keys.filter(function (k) { return k.indexOf(monthPrefix) === 0; }).length;
  return { total: keys.length, month: month };
}

FL_ACTS.clearMark = function () {
  var k = flToday();
  if (FL.clear[k]) delete FL.clear[k]; else FL.clear[k] = 1;
  flSave();
  announce(FL.clear[k] ? 'Marked clear. Counted, never chained.' : 'Unmarked.');
  render();
};

FL_VIEWS.clear = {
  label: 'Clear Mornings',
  title: 'Clear Mornings',
  hidden: true,   // one quiet door in Settings; the nav never names this room
  render: function () {
    var c = clearCounts();
    var today = flToday();
    var marked = !!FL.clear[today];

    var sections = CLEAR_SECTIONS.map(function (s) {
      return '<div class="label">' + esc(s[0]) + '</div>' +
        '<div class="card"><p class="px">' + esc(s[1]) + '</p></div>';
    }).join('');

    var counts = c.total
      ? '<p class="note">' + c.total + ' clear ' + (c.total === 1 ? 'morning' : 'mornings') + ' in the record · ' +
        c.month + ' this month. Counted, never chained: a missed night breaks nothing, because there is no chain to break.</p>'
      : '<p class="note">No marks yet. There is no chain to start: only mornings, counted one at a time, ' +
        'visible only here.</p>';

    return '<div class="kick">A room of its own</div>' +
      '<h1>Clear Mornings</h1>' +
      counts +
      '<div style="text-align:center;margin:14px 0 22px">' +
        '<button class="keep' + (marked ? ' on' : '') + '" data-act="clearMark" aria-pressed="' + marked + '">' +
        (marked ? 'Tonight is marked clear' : 'Mark tonight clear') + '</button></div>' +
      sections +
      '<div class="label">Tonight, if you want it</div>' +
      '<p class="refl">Did tonight’s drink pour itself, or did you pour it?</p>' +
      '<div style="margin-top:12px">' + jField(jRef('clear', today), 'Noticing, not judging. A sentence counts.', today, 3) + '</div>' +
      '<p class="vidnote" style="margin-top:18px">Notes written here appear only here, not in the Journal, not in search. ' +
      'The door back out is just the door: nothing follows you.</p>';
  }
};
