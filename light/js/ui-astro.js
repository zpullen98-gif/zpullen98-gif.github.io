/* First Light: Astrology.

   Phase 1 ports the artifact's chapter intact. Phase 4 replaces the arithmetic with
   a real ephemeris: true planetary longitudes, Moon sign, Ascendant, Midheaven,
   house cusps, aspects, and a drawn wheel. Two things are worth knowing about what
   is here now, and both are stated in the copy rather than hidden:

   - Sun signs come from a fixed date table, so a birthday on a cusp can be wrong by
     a day. Real solar longitude fixes that in Phase 4.
   - The moon phase is a mean synodic approximation. Good to a few hours, which is
     fine for naming the phase and not good enough to time anything by. */

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
    '<div class="astrorow"><span class="k">Traditionally governs</span> ' + esc(s.body) + '</div>' +
  '</div>';
}

function relationBetween(a, b) {
  var ia = -1, ib = -1, i;
  for (i = 0; i < SIGNS.length; i++) { if (SIGNS[i].n === a) ia = i; if (SIGNS[i].n === b) ib = i; }
  if (ia < 0 || ib < 0) return null;
  var dd = Math.abs(ia - ib); if (dd > 6) dd = 12 - dd;
  var A = SIGNS[ia], B = SIGNS[ib];
  var map = {
    0: ['Conjunct: the same sign', 'Identical instincts: profound ease, and no external corrective. Two of the same strength, and two of the same blind spot.'],
    1: ['Semi-sextile: adjacent', 'No classical aspect. Different element and modality both; the tradition reads this as mutual incomprehension that can be learned past, but rarely felt past.'],
    2: ['Sextile: two apart', 'Compatible elements and easy cooperation, but an opportunity rather than a given: it works when both choose it.'],
    3: ['Square: three apart', 'Shared modality, clashing element. Read as the friction that produces growth, genuinely difficult, genuinely generative.'],
    4: ['Trine: four apart', 'Same element. The most harmonious classical aspect: instinctive understanding, with the risk of never being challenged.'],
    5: ['Quincunx: five apart', 'Nothing in common by element or modality. The tradition calls this the aspect of adjustment: workable only by continual deliberate accommodation.'],
    6: ['Opposition: opposite signs', 'The axis. Same modality, complementary elements: each carries what the other lacks. Read as the most instructive pairing and the most demanding.']
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

FL_VIEWS.astro = {
  label: 'Astrology',
  title: 'Astrology',
  render: function () {
    var now = new Date();
    var s = signFor(now.getMonth() + 1, now.getDate());
    var mp = moonPhase(now);
    var opts = SIGNS.map(function (x) { return '<option value="' + esc(x.n) + '">' + x.g + ' ' + esc(x.n) + '</option>'; }).join('');

    var list = function (arr, fn) { return arr.map(fn).join(''); };

    return '' +
      '<div class="kick">The symbolic heavens</div><h1>Astrology</h1>' +
      '<p class="note">The oldest continuously practiced symbolic system in the West: its history, its grammar, and how a chart is actually read.</p>' +

      '<div class="label">Today’s sky</div>' +
      '<div class="card" id="a-sky">' +
        '<p class="pt"><span class="glyph">' + s.g + '</span> The Sun is in ' + esc(s.n) + '</p>' +
        '<div class="ds">' + esc(s.el + ' · ' + s.mo + ' · ruled by ' + s.ru) + '</div>' +
        '<p class="px" style="margin-top:10px">Moon: <strong>' + esc(mp.name) + '</strong> · about ' +
          mp.illum + '% illuminated.</p>' +
        '<p class="vidnote" style="margin-top:8px">Approximate. Computing the real sky…</p>' +
      '</div>' +

      '<div class="label">Your chart</div>' +
      '<div class="card">' +
        '<p class="pt">The whole thing, properly computed</p>' +
        '<p class="px">Birth date, time and place give the real positions of all ten bodies, ' +
        'the Ascendant and Midheaven, the twelve house cusps and every aspect: worked out on ' +
        'this device from an ephemeris, not looked up in a table. The birth details never leave this device; ' +
        'Only a count of mornings and your streak are kept alongside them.</p>' +
        '<a class="keep" href="#/chart">Draw my chart</a>' +
      '</div>' +

      '<div class="label">Your placement</div>' +
      '<p class="px" style="color:var(--faint);margin-bottom:12px">Enter a birth date for the Sun sign and its full attributions. A complete chart also needs birth time and place: see <em>Reading a chart</em> below.</p>' +
      '<div class="drawrow">' +
        '<input type="date" id="a-date" aria-label="Birth date">' +
        '<button class="btn" data-act="lookupSign">Find</button>' +
      '</div><div id="a-result"></div>' +

      '<div class="label">Where it came from</div>' +
      list(A_HISTORY, function (h) { return '<div class="q"><p class="pt">' + esc(h[0]) + '</p><p class="px">' + esc(h[1]) + '</p></div>'; }) +

      '<div class="label">The four elements</div>' +
      list(A_ELEMENTS, function (e) {
        return '<div class="limb"><div class="limbn">' + esc(e[0][0]) + '</div><div><div class="gt">' + esc(e[0]) +
          '</div><div class="gp" style="color:var(--accent)">' + esc(e[1]) + '</div><div class="gp">' + esc(e[2]) + '</div></div></div>';
      }) +

      '<div class="label">The three modalities</div>' +
      list(A_MODES, function (e) {
        return '<div class="limb"><div class="limbn">·</div><div><div class="gt">' + esc(e[0]) +
          '</div><div class="gp" style="color:var(--accent)">' + esc(e[1]) + '</div><div class="gp">' + esc(e[2]) + '</div></div></div>';
      }) +

      '<div class="label">The twelve signs</div>' +
      list(SIGNS, function (x) {
        return signCard(x, x.from[1] + ' ' + MON3[x.from[0]] + ', ' + x.to[1] + ' ' + MON3[x.to[0]]);
      }) +

      '<div class="label">The planets</div>' +
      '<p class="px" style="color:var(--faint);margin-bottom:12px">Classical astrology used the seven visible bodies. The three outer planets were added after their discovery, Uranus 1781, Neptune 1846, Pluto 1930, and many traditional practitioners still work with the original seven.</p>' +
      list(A_PLANETS, function (p) {
        return '<div class="limb"><div><div class="gt">' + esc(p[0]) + ': ' + esc(p[1]) + '</div>' +
          '<div class="gp">' + esc(p[2]) + '</div><div class="gp" style="color:var(--accent)">Moves ' + esc(p[3]) + '</div></div></div>';
      }) +

      '<div class="label">The twelve houses</div>' +
      '<p class="px" style="color:var(--faint);margin-bottom:12px">Signs describe <em>how</em>; houses describe <em>where</em>. The houses are set by the birth time and place, which is why the hour matters.</p>' +
      list(A_HOUSES, function (h, i) {
        return '<div class="limb"><div class="limbn">' + (i + 1) + '</div><div><div class="gt">' + esc(h[0]) +
          '</div><div class="gp">' + esc(h[1]) + '</div></div></div>';
      }) +

      '<div class="label">The aspects</div>' +
      '<p class="px" style="color:var(--faint);margin-bottom:12px">The angles planets make to one another. An <em>orb</em> is the allowance either side of exactness within which the aspect still counts.</p>' +
      list(A_ASPECTS, function (a) {
        return '<div class="limb"><div class="limbn">' + esc(a[1]) + '</div><div><div class="gt">' + esc(a[0]) +
          '</div><div class="gp" style="color:var(--accent)">orb ' + esc(a[2]) + '</div><div class="gp">' + esc(a[3]) + '</div></div></div>';
      }) +

      '<div class="label">How signs relate</div>' +
      list(A_RELATIONS, function (r) {
        return '<div class="limb"><div><div class="gt">' + esc(r[0]) + '</div><div class="gp">' + esc(r[1]) + '</div></div></div>';
      }) +
      '<div class="drawrow" style="margin-top:14px">' +
        '<select id="a-sign1" class="sel" data-change="compareSigns" aria-label="First sign">' + opts + '</select>' +
        '<select id="a-sign2" class="sel" data-change="compareSigns" aria-label="Second sign">' + opts + '</select>' +
      '</div><div id="a-compare-result"></div>' +

      '<div class="label">Reading a chart</div>' +
      list(A_HOWTO, function (h, i) {
        return '<div class="limb"><div class="limbn">' + (i + 1) + '</div><div><div class="gt">' + esc(h[0]) +
          '</div><div class="gp">' + esc(h[1]) + '</div></div></div>';
      }) +

      '<p class="mintro" style="margin-top:30px">Presented as the tradition understands itself. Astrology is a symbolic and interpretive art with a long history, not a predictive science; it has not been borne out under controlled testing. Read it as you would a myth: for what it illuminates, not for what it forecasts.</p>';
  },

  after: function () {
    var s2 = document.getElementById('a-sign2');
    if (s2) s2.selectedIndex = 6;
    renderCompare();

    /* Replace the approximations with the real sky once the ephemeris is here. The
       page renders immediately from the old date table so there is never a blank
       card, then upgrades in place: the chapter should not wait on 116 KB to say
       anything. */
    if (typeof chartEnsureLoaded !== 'function') return;
    chartEnsureLoaded().then(function () {
      if (flRoute.view !== 'astro') return;
      var host = document.getElementById('a-sky');
      if (!host || typeof skyNow !== 'function') return;

      var sky = skyNow(new Date());
      var sun = sky.bodies[0];
      var sunSign = null;
      for (var i = 0; i < SIGNS.length; i++) if (SIGNS[i].n === sun.sign.name) sunSign = SIGNS[i];

      var rows = sky.bodies.map(function (b) {
        return '<tr><td class="ct-g">' + b.glyph + '</td><td>' + esc(b.name) + '</td>' +
          '<td>' + b.sign.deg + '° ' + b.sign.glyph + ' ' + String(b.sign.min).padStart(2, '0') + '′</td>' +
          '<td>' + esc(b.sign.name) + '</td><td>' + (b.retro ? '℞' : '') + '</td></tr>';
      }).join('');

      var retro = sky.bodies.filter(function (b) { return b.retro; })
                            .map(function (b) { return b.name; });

      host.innerHTML =
        '<p class="pt"><span class="glyph">' + (sunSign ? sunSign.g : '') + '</span> The Sun is in ' +
          esc(sun.sign.name) + ', at ' + sun.sign.deg + '°' + String(sun.sign.min).padStart(2, '0') + '′</p>' +
        (sunSign ? '<div class="ds">' + esc(sunSign.el + ' · ' + sunSign.mo + ' · ruled by ' + sunSign.ru) + '</div>' : '') +
        '<p class="px" style="margin-top:10px">Moon: <strong>' + esc(sky.moon.name) + '</strong> · ' +
          sky.moon.illum + '% illuminated · ' + esc(sky.bodies[1].sign.name) + '.</p>' +
        (retro.length
          ? '<p class="px" style="margin-top:6px">Retrograde now: ' + esc(retro.join(', ')) + '.</p>'
          : '<p class="px" style="margin-top:6px">Nothing is retrograde today.</p>') +
        '<div class="label" style="margin-top:16px">Every body, right now</div>' +
        '<div class="tablewrap"><table class="charttable"><tbody>' + rows + '</tbody></table></div>' +
        '<p class="vidnote" style="margin-top:10px">Geocentric apparent positions in the tropical zodiac, ' +
        'computed on this device. Not looked up in a table.</p>';
    }).catch(function () {
      var host = document.getElementById('a-sky');
      if (!host) return;
      var n = host.querySelector('.vidnote');
      if (n) n.textContent = 'Approximate: the sun-sign date ranges and the mean lunar cycle. ' +
        'The exact sky needs the ephemeris, which arrives with one connection and then stays.';
    });
  }
};
