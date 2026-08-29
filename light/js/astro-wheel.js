/* First Light: the chart wheel.

   Inline SVG on a 1000×1000 viewBox, scaled by CSS. One coordinate system, any
   screen.

     r 500–458   zodiac ring, sign glyphs at 479
     r 458–441   degree ticks
     r 441–360   planet band, glyphs at 398 with leader lines to their true degree
     r 360–312   house ring, numerals at 336
     r < 300     aspect chords

   ORIENTATION. Ascendant at nine o'clock, zodiac running counterclockwise, which is
   the convention every printed chart uses:  screenAngle = 180 − (lon − ASC).

   THE PART THAT MATTERS is collision avoidance. Stelliums are common: five planets
   inside eight degrees is an ordinary Tuesday, and drawing glyphs at their true
   angles produces an illegible knot. Glyphs are pushed apart by relaxation and then
   joined to their real positions by leader lines. Without the leader lines the
   displacement would be a quiet lie; with them it reads as a considered layout.

   AND: the table underneath is not a fallback. It is the information; the wheel is
   the picture of it. That is also the accessibility answer, and it costs nothing. */

var WHEEL_MIN_SEP = 7;      // degrees between glyph centres before they are pushed apart

function wheelXY(angleDeg, r) {
  var a = angleDeg * DEG;
  return [500 + r * Math.cos(a), 500 - r * Math.sin(a)];
}
function wheelAngle(lon, asc) { return 180 - (norm360(lon) - norm360(asc)); }

/* Push overlapping glyphs apart, keeping their order, then hand back the displaced
   angles. Damped and capped so a six-planet cluster fans rather than wrapping. */
function wheelSpread(angles) {
  var n = angles.length;
  if (n < 2) return angles.slice();
  var idx = angles.map(function (a, i) { return i; })
                  .sort(function (i, j) { return angles[i] - angles[j]; });
  var pos = idx.map(function (i) { return angles[i]; });

  for (var pass = 0; pass < 40; pass++) {
    var moved = false;
    for (var k = 0; k < n; k++) {
      var a = k, b = (k + 1) % n;
      var gap = pos[b] - pos[a];
      if (b === 0) gap += 360;
      if (gap < WHEEL_MIN_SEP) {
        var push = (WHEEL_MIN_SEP - gap) / 2 * 0.5;
        pos[a] -= push; pos[b] += push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  var out = new Array(n);
  idx.forEach(function (orig, k) { out[orig] = pos[k]; });
  return out;
}

function drawWheel(chart, opts) {
  opts = opts || {};
  var small = !!opts.small;
  var showAspects = !!opts.aspects;
  var asc = chart.asc;
  var s = [];

  s.push('<svg viewBox="0 0 1000 1000" class="wheel" xmlns="http://www.w3.org/2000/svg" ' +
         'role="img" aria-label="Natal chart wheel. The same information is in the table below.">');

  /* zodiac ring */
  s.push('<circle cx="500" cy="500" r="500" class="w-ring"/>');
  s.push('<circle cx="500" cy="500" r="458" class="w-ring"/>');
  s.push('<circle cx="500" cy="500" r="360" class="w-ring"/>');
  s.push('<circle cx="500" cy="500" r="312" class="w-ring"/>');

  for (var i = 0; i < 12; i++) {
    var a0 = wheelAngle(i * 30, asc);
    var p1 = wheelXY(a0, 458), p2 = wheelXY(a0, 500);
    s.push('<line x1="' + p1[0].toFixed(1) + '" y1="' + p1[1].toFixed(1) +
           '" x2="' + p2[0].toFixed(1) + '" y2="' + p2[1].toFixed(1) + '" class="w-div"/>');
    var g = wheelXY(wheelAngle(i * 30 + 15, asc), 479);
    s.push('<text x="' + g[0].toFixed(1) + '" y="' + g[1].toFixed(1) +
           '" class="w-sign" text-anchor="middle" dominant-baseline="central">' + ZGLYPH[i] + '</text>');
  }

  /* degree ticks: the 1° ticks alias into mush on a phone, so they are dropped there */
  for (var d = 0; d < 360; d++) {
    var isTen = d % 10 === 0, isFive = d % 5 === 0;
    if (small && !isFive) continue;
    var len = isTen ? 17 : isFive ? 11 : 6;
    var ta = wheelAngle(d, asc);
    var q1 = wheelXY(ta, 458 - len), q2 = wheelXY(ta, 458);
    s.push('<line x1="' + q1[0].toFixed(1) + '" y1="' + q1[1].toFixed(1) +
           '" x2="' + q2[0].toFixed(1) + '" y2="' + q2[1].toFixed(1) +
           '" class="w-tick' + (isTen ? ' w-tick-major' : '') + '"/>');
  }

  /* house cusps and numerals */
  chart.cusps.forEach(function (c, hi) {
    var a = wheelAngle(c, asc);
    var r1 = wheelXY(a, 312), r2 = wheelXY(a, 441);
    var angular = (hi === 0 || hi === 3 || hi === 6 || hi === 9);
    s.push('<line x1="' + r1[0].toFixed(1) + '" y1="' + r1[1].toFixed(1) +
           '" x2="' + r2[0].toFixed(1) + '" y2="' + r2[1].toFixed(1) +
           '" class="w-cusp' + (angular ? ' w-cusp-angular' : '') + '"/>');
    var mid = c + norm360(chart.cusps[(hi + 1) % 12] - c) / 2;
    var np = wheelXY(wheelAngle(mid, asc), 336);
    s.push('<text x="' + np[0].toFixed(1) + '" y="' + np[1].toFixed(1) +
           '" class="w-house" text-anchor="middle" dominant-baseline="central">' + (hi + 1) + '</text>');
  });

  /* the angles, labelled */
  [['AC', chart.asc], ['MC', chart.mc],
   ['DC', norm360(chart.asc + 180)], ['IC', norm360(chart.mc + 180)]].forEach(function (pair) {
    var a = wheelAngle(pair[1], asc);
    var p = wheelXY(a, 520 - 520 + 436);
    s.push('<text x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) +
           '" class="w-angle" text-anchor="middle" dominant-baseline="central">' + pair[0] + '</text>');
  });

  /* aspect chords, drawn first so glyphs sit above them */
  if (showAspects) {
    chart.aspects.forEach(function (a) {
      if (a.a.glyph === 'AC' || a.a.glyph === 'MC' || a.b.glyph === 'AC' || a.b.glyph === 'MC') return;
      var p = wheelXY(wheelAngle(a.a.lon, asc), 300);
      var q = wheelXY(wheelAngle(a.b.lon, asc), 300);
      /* Colour by kind AND dash by kind: never colour alone, both because the app's
         palette shifts through the day and because a lot of readers cannot rely on it. */
      s.push('<line x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) +
             '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) +
             '" class="w-asp w-asp-' + a.aspect.kind + '" opacity="' +
             (0.25 + 0.55 * a.exactness).toFixed(2) + '"/>');
    });
  }

  /* planets: true degree ticks, leader lines, spread glyphs */
  var pts = chart.points;
  var trueAngles = pts.map(function (p) { return wheelAngle(p.lon, asc); });
  var spread = wheelSpread(trueAngles);

  pts.forEach(function (p, i) {
    var ta = trueAngles[i], sa = spread[i];
    var t1 = wheelXY(ta, 441), t2 = wheelXY(ta, 428);
    s.push('<line x1="' + t1[0].toFixed(1) + '" y1="' + t1[1].toFixed(1) +
           '" x2="' + t2[0].toFixed(1) + '" y2="' + t2[1].toFixed(1) + '" class="w-ptick"/>');
    var g = wheelXY(sa, 398);
    if (Math.abs(sa - ta) > 0.4) {
      s.push('<line x1="' + t2[0].toFixed(1) + '" y1="' + t2[1].toFixed(1) +
             '" x2="' + g[0].toFixed(1) + '" y2="' + g[1].toFixed(1) + '" class="w-lead"/>');
    }
    s.push('<text x="' + g[0].toFixed(1) + '" y="' + g[1].toFixed(1) +
           '" class="w-planet' + (p.minor ? ' w-minor' : '') + '" text-anchor="middle" ' +
           'dominant-baseline="central">' + p.glyph + '</text>');
    if (p.retro) {
      var r = wheelXY(sa, 366);
      s.push('<text x="' + r[0].toFixed(1) + '" y="' + r[1].toFixed(1) +
             '" class="w-retro" text-anchor="middle" dominant-baseline="central">℞</text>');
    }
  });

  s.push('</svg>');
  return s.join('');
}

/* The table. Always rendered, at every screen size. */
function chartTable(chart) {
  var rows = chart.points.map(function (p) {
    return '<tr><td class="ct-g">' + p.glyph + '</td><td>' + esc(p.name) + '</td>' +
      '<td>' + p.sign.deg + '° ' + p.sign.glyph + ' ' + String(p.sign.min).padStart(2, '0') + '′</td>' +
      '<td>' + esc(p.sign.name) + '</td>' +
      '<td>' + p.house + '</td>' +
      '<td>' + (p.retro ? '℞' : '') + '</td></tr>';
  }).join('');

  var angles = '<tr><td class="ct-g">AC</td><td>Ascendant</td><td>' +
      signOf(chart.asc).deg + '° ' + signOf(chart.asc).glyph + ' ' + String(signOf(chart.asc).min).padStart(2,'0') + '′</td>' +
      '<td>' + signOf(chart.asc).name + '</td><td>1</td><td></td></tr>' +
    '<tr><td class="ct-g">MC</td><td>Midheaven</td><td>' +
      signOf(chart.mc).deg + '° ' + signOf(chart.mc).glyph + ' ' + String(signOf(chart.mc).min).padStart(2,'0') + '′</td>' +
      '<td>' + signOf(chart.mc).name + '</td><td>10</td><td></td></tr>';

  return '<div class="tablewrap"><table class="charttable">' +
    '<thead><tr><th></th><th>Body</th><th>Degree</th><th>Sign</th><th>House</th><th></th></tr></thead>' +
    '<tbody>' + angles + rows + '</tbody></table></div>';
}

function aspectTable(chart) {
  if (!chart.aspects.length) return '<p class="loadnote">No aspects within orb.</p>';
  return '<div class="tablewrap"><table class="charttable">' +
    '<thead><tr><th>Between</th><th>Aspect</th><th>Orb</th></tr></thead><tbody>' +
    chart.aspects.map(function (a) {
      return '<tr><td>' + esc(a.a.name) + '–' + esc(a.b.name) + '</td>' +
        '<td>' + a.aspect.glyph + ' ' + esc(a.aspect.name) + '</td>' +
        '<td>' + a.orb.toFixed(1) + '°</td></tr>';
    }).join('') + '</tbody></table></div>';
}

function houseTable(chart) {
  return '<div class="tablewrap"><table class="charttable">' +
    '<thead><tr><th>House</th><th>Cusp</th><th>Sign</th></tr></thead><tbody>' +
    chart.cusps.map(function (c, i) {
      var sg = signOf(c);
      return '<tr><td>' + (i + 1) + '</td><td>' + sg.deg + '° ' + sg.glyph + ' ' +
        String(sg.min).padStart(2, '0') + '′</td><td>' + sg.name + '</td></tr>';
    }).join('') + '</tbody></table></div>';
}
