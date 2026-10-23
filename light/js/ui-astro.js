/* First Light: astrology reference helpers.
   The monthly page is registered by ui-astro-month.js after the chart view.
   Saved charts and monthly dates use Astronomy Engine, never the legacy date
   ranges or mean lunar approximation retained here for older consumers. */

function elementOf(n) {
  for (var i = 0; i < SIGNS.length; i++) if (SIGNS[i].n === n) return SIGNS[i].el;
  return '';
}

function signFor(m, d) {
  for (var i = 0; i < SIGNS.length; i++) {
    var s = SIGNS[i], fm = s.from[0], fd = s.from[1], tm = s.to[0], td = s.to[1];
    if (fm <= tm) { if ((m === fm && d >= fd) || (m === tm && d <= td) || (m > fm && m < tm)) return s; }
    else { if ((m === fm && d >= fd) || (m === tm && d <= td) || m > fm || m < tm) return s; }  // Capricorn wraps the year
  }
  return SIGNS[0];
}

function moonPhase(date) {
  var synodic = 29.530588853;
  var epoch = Date.UTC(2000, 0, 6, 18, 14, 0);   // a known new moon
  var age = ((date.getTime() - epoch) / 86400000) % synodic;
  if (age < 0) age += synodic;
  var names = [['New Moon', 0], ['Waxing Crescent', 1.85], ['First Quarter', 5.54], ['Waxing Gibbous', 9.23],
               ['Full Moon', 12.92], ['Waning Gibbous', 16.61], ['Last Quarter', 20.30], ['Waning Crescent', 23.99]];
  var name = 'New Moon';
  names.forEach(function (n) { if (age >= n[1]) name = n[0]; });
  if (age >= 27.68) name = 'New Moon';
  return { age: age.toFixed(1), name: name, illum: Math.round((1 - Math.cos(2 * Math.PI * age / synodic)) / 2 * 100) };
}

function signCard(s, heading) {
  return '<div class="card" style="margin-bottom:14px">' +
    (heading ? '<div class="vidframe-label">' + esc(heading) + '</div>' : '') +
    '<p class="pt"><span class="glyph">' + s.g + '</span> ' + esc(s.n) + '</p>' +
    '<div class="ds">' + esc(s.el + ' · ' + s.mo + ' · ' + s.po + ' · ruled by ' + s.ru) + '</div>' +
    '<p class="px" style="margin:10px 0 8px"><em>' + esc(s.kw) + '</em></p>' +
    '<p class="px">' + esc(s.d) + '</p>' +
    '<div class="astrorow"><span class="k">Strengths</span> ' + esc(s.s) + '</div>' +
    '<div class="astrorow"><span class="k">Growth edge</span> ' + esc(s.gr) + '</div>' +
    '<div class="astrorow"><span class="k">Historical body symbolism</span> ' + esc(s.body) + '</div>' +
  '</div>';
}

function relationBetween(a, b) {
  var ia = -1, ib = -1, i;
  for (i = 0; i < SIGNS.length; i++) { if (SIGNS[i].n === a) ia = i; if (SIGNS[i].n === b) ib = i; }
  if (ia < 0 || ib < 0) return null;
  var dd = Math.abs(ia - ib); if (dd > 6) dd = 12 - dd;
  var A = SIGNS[ia], B = SIGNS[ib];
  var map = {
    0: ['Same sign', 'The same element and modality. Compare the shared vocabulary and the different ways an individual might express it.'],
    1: ['Adjacent signs', 'Different elements and modalities. The traditional sign-based framework treats these as different perspectives, not a verdict on relationships.'],
    2: ['Sextile by sign', 'Related elements with different modalities. A symbolic invitation to explore cooperation.'],
    3: ['Square by sign', 'A shared modality with different elements. Compare how the same wish to initiate, sustain or adapt could take different forms.'],
    4: ['Trine by sign', 'A shared element with different modalities. Compare how each sign begins, sustains or adapts that element.'],
    5: ['Quincunx by sign', 'Different elements and modalities. A useful exercise in explaining one symbolic perspective to another.'],
    6: ['Opposite signs', 'A shared modality across a symbolic axis. Explore the two perspectives without assuming that people must oppose or complete each other.']
  };
  return {
    title: map[dd][0], text: map[dd][1], a: A, b: B,
    note: (A.el === B.el ? 'Both ' + A.el.toLowerCase() + ' signs.' : A.el + ' and ' + B.el + '.') + ' ' +
          (A.mo === B.mo ? 'Both ' + A.mo.toLowerCase() + '.' : A.mo + ' and ' + B.mo + '.')
  };
}

function renderCompare() {
  var s1 = document.getElementById('a-sign1'), s2 = document.getElementById('a-sign2');
  var out = document.getElementById('a-compare-result');
  if (!s1 || !s2 || !out) return;
  var r = relationBetween(s1.value, s2.value);
  if (!r) { out.innerHTML = ''; return; }
  out.innerHTML = '<div class="card" style="margin-top:12px">' +
    '<p class="pt"><span class="glyph">' + r.a.g + '</span>' + esc(r.a.n) + '  &amp;  <span class="glyph">' + r.b.g + '</span>' + esc(r.b.n) + '</p>' +
    '<div class="ds" style="margin-bottom:8px">' + esc(r.note) + '</div>' +
    '<p class="px"><strong>' + esc(r.title) + '</strong></p>' +
    '<p class="px" style="color:var(--faint);margin-top:6px">' + esc(r.text) + '</p></div>';
}
FL_ACTS.compareSigns = renderCompare;

FL_ACTS.lookupSign = function () {
  var v = document.getElementById('a-date').value;
  var out = document.getElementById('a-result');
  if (!v) { out.innerHTML = '<p class="loadnote">Choose a date first.</p>'; return; }
  var p = v.split('-').map(Number);

  /* Prefer the real solar longitude. The fixed date table this chapter used to rely
     on is wrong by up to a day at the sign boundaries, because the Sun does not cross
     into a sign at the same clock time every year, which is exactly the case a
     reader born on a cusp is asking about. */
  if (window.Astronomy && typeof geoLon === 'function') {
    var noon = new Date(Date.UTC(p[0], p[1] - 1, p[2], 12, 0));
    var lon = geoLon('Sun', noon);
    var sg = signOf(lon);
    var s = null;
    for (var i = 0; i < SIGNS.length; i++) if (SIGNS[i].n === sg.name) s = SIGNS[i];

    /* How far from a boundary? Inside a degree, the hour of birth decides the sign,
       and saying so is more useful than a confident answer that may be wrong. */
    var toEdge = Math.min(sg.within, 30 - sg.within);
    var cusp = toEdge < 1
      ? '<p class="loadnote" style="margin-top:10px">This birthday sits within a degree of the boundary, about a day\'s travel for the Sun. ' +
        'Which sign it falls in depends on the hour of birth. Draw the full chart for a definite answer.</p>'
      : '';

    out.innerHTML = (s ? signCard(s, 'Sun sign') : '') +
      '<div class="card" style="margin-bottom:14px">' +
        '<div class="astrorow"><span class="k">Computed</span> Sun at ' +
        sg.deg + '° ' + esc(sg.name) + ' ' + String(sg.min).padStart(2, '0') + '′, noon UTC on that date</div>' +
      '</div>' + cusp;
    announce('Sun sign computed.');
    return;
  }

  /* Ephemeris not loaded yet: fall back to the table and say which was used. */
  out.innerHTML = signCard(signFor(p[1], p[2]), 'Sun sign') +
    '<p class="loadnote">From the conventional date ranges. Reload once the ephemeris has loaded for an exact position.</p>';
  announce('Sun sign found.');
};

var MON3 = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
