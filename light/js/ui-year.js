/* First Light: The Year. All 366, month by month. */

var yearMonth = 0;   // 0 = no explicit pick; defaults per render on the shifted clock

FL_ACTS.pickMonth = function (el) { yearMonth = +el.getAttribute('data-m'); render(); };

FL_VIEWS.year = {
  label: 'The Year',
  title: 'The Year',
  render: function () {
    var ym = yearMonth || (flShiftedNow().getMonth() + 1);
    /* ?preview=<track>: an unfinished track, read here and nowhere else, with
       no keep buttons so nothing is filed under its key before it is offered */
    var pv = (typeof flPreviewTrack === 'function') ? flPreviewTrack() : null;
    var tq = pv ? pv.q() : trackQ();
    var tm = pv ? pv.months() : trackMonths();
    var chips = tm.map(function (mo, i) {
      return '<button class="mchip' + ((i + 1) === ym ? ' on' : '') + '" data-act="pickMonth" data-m="' + (i + 1) + '"' +
             ' aria-pressed="' + ((i + 1) === ym) + '">' + esc(mo[0].slice(0, 3)) + '</button>';
    }).join('');

    var rows = (tq[ym] || []).map(function (e) {
      return '<div class="dayrow"><div class="dn">' + e[0] + '</div><div>' +
        '<p class="dq">“' + esc(e[1]) + '”</p>' +
        '<span class="ds">' + esc(e[2]) + ' · ' + esc(e[3]) + '</span> ' +
        provNote(e[4]) +
        (pv ? '' : keepButton(ym, e[0], false)) +
      '</div></div>';
    }).join('');
    if (pv && !rows) rows = '<p class="px" style="color:var(--faint)">' + esc(tm[ym - 1][0]) + ' is not written yet.</p>';

    return '' +
      '<div class="kick">The almanac</div>' +
      '<h1>A Year of Mornings</h1>' +
      (pv
        ? '<p class="note">Previewing ' + esc(pv.label) + ': ' + flTrackDays(pv) + ' of 366 days so far. Nothing here can be kept until the year is complete.</p>'
        : '<p class="note">Three hundred sixty-six voices: one for every day of the year, including the leap day. Choose a month.</p>') +
      '<div class="months">' + chips + '</div>' +
      '<p class="mintro">' + esc(tm[ym - 1][1] + ', ' + tm[ym - 1][2]) + '</p>' +
      '<div>' + rows + '</div>';
  }
};
