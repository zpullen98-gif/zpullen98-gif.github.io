/* First Light: the chart.

   Real positions, computed on the device. The artifact's astrology chapter was well
   written and computationally hollow: sun signs from a fixed date table (so a cusp
   birthday could be a day wrong) and a mean-synodic moon phase. It asked for a birth
   time it had no way to use.

   TRAPS, all of them verified rather than assumed:

   1. Astronomy.EclipticLongitude() is HELIOCENTRIC and throws on the Sun. For
      2026-08-16 it puts Mars in Gemini; the geocentric position, the one a chart
      means, is Cancer. Using it produces charts that look entirely plausible and
      are entirely wrong. Everything here goes through geoLon().

   2. The library returns ecliptic-of-date, which IS the tropical zodiac: precession
      and nutation are already applied. No ayanamsa, no J2000 correction. Confirmed
      by the Sun reading exactly 360.0000° at the March 2026 equinox.

   3. Obliquity must come from the polynomial below, not from the library's rotation
      matrices. Recovering it from Rotation_ECT_EQD yields a NEGATIVE value, which
      leaves the Midheaven correct (its formula uses only cos ε, an even function)
      and the Ascendant silently wrong. Half the output looking right is the hardest
      kind of bug to notice.

   4. Placidus is undefined above about 66.56°: not a rounding problem; the cusp
      genuinely does not exist because that degree never crosses the horizon. */

var DEG = Math.PI / 180, RAD = 180 / Math.PI;
var ZODIAC = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
              'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
var ZGLYPH = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
var PGLYPH = { Sun:'☉', Moon:'☽', Mercury:'☿', Venus:'♀', Mars:'♂', Jupiter:'♃',
               Saturn:'♄', Uranus:'♅', Neptune:'♆', Pluto:'♇', Node:'☊', Fortune:'⊗' };
var CHART_BODIES = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];

function norm360(x) { return ((x % 360) + 360) % 360; }

function signOf(lon) {
  var s = Math.floor(norm360(lon) / 30);
  var within = norm360(lon) - s * 30;
  return { i: s, name: ZODIAC[s], glyph: ZGLYPH[s],
           deg: Math.floor(within), min: Math.floor((within % 1) * 60), within: within };
}
function fmtLon(lon) {
  var s = signOf(lon);
  return s.deg + '° ' + s.name + ' ' + String(s.min).padStart(2, '0') + '′';
}

/* THE function. Never Astronomy.EclipticLongitude: see trap 1 above.
   aberration=true gives apparent position, which is what an ephemeris tabulates. */
function geoLon(body, date) {
  var A = window.Astronomy;
  if (body === 'Sun') return A.SunPosition(date).elon;
  if (body === 'Moon') return A.EclipticGeoMoon(date).lon;
  return A.Ecliptic(A.GeoVector(A.Body[body], date, true)).elon;
}

/* Mean obliquity of the ecliptic, degrees. Arcsecond-accurate across this app's
   supported range and four lines long. See trap 3. */
function meanObliquity(date) {
  var T = window.Astronomy.MakeTime(date).tt / 36525.0;
  return 23.439291111 - 0.0130041667 * T - 1.6666667e-7 * T * T + 5.027778e-7 * T * T * T;
}

/* Retrograde: is the geocentric longitude decreasing? The wrap guard is what keeps
   a body sitting on 0° Aries from reading as a station every time. */
function isRetrograde(body, date) {
  if (body === 'Sun' || body === 'Moon') return false;
  var d = geoLon(body, new Date(+date + 86400000)) - geoLon(body, date);
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d < 0;
}

/* Mean lunar node: a polynomial, and traditional enough that leaving it out would
   be conspicuous. The true node oscillates about this by up to ~1.5°. */
function meanNode(date) {
  var T = window.Astronomy.MakeTime(date).tt / 36525.0;
  return norm360(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T
                 + T * T * T / 467441 - T * T * T * T / 60616000);
}

/* --- angles --- */
function chartAngles(date, lat, lon) {
  var A = window.Astronomy;
  var gst = A.SiderealTime(date);                       // Greenwich apparent, hours
  var lst = ((gst + lon / 15) % 24 + 24) % 24;          // longitude EAST-positive
  var ramc = lst * 15 * DEG;
  var eps = meanObliquity(date) * DEG;
  var phi = lat * DEG;

  var mc = norm360(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps)) * RAD);
  var asc = norm360(Math.atan2(Math.cos(ramc),
             -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) * RAD);

  /* The Ascendant must lead the Midheaven by less than half a circle; without this
     the formula happily returns the Descendant. */
  if (norm360(asc - mc) > 180) asc = norm360(asc + 180);

  return { asc: asc, mc: mc, ramc: ramc * RAD, lst: lst, obliquity: eps * RAD };
}

/* --- houses --- */
function housesWhole(asc) {
  var base = Math.floor(norm360(asc) / 30) * 30, c = [];
  for (var i = 0; i < 12; i++) c.push(norm360(base + i * 30));
  return c;
}
function housesEqual(asc) {
  var c = [];
  for (var i = 0; i < 12; i++) c.push(norm360(asc + i * 30));
  return c;
}
function housesPlacidus(angles, lat) {
  var eps = angles.obliquity * DEG, phi = lat * DEG, ramc = angles.ramc * DEG;
  var out = {};
  var spec = [[11, 30, 1 / 3, 1], [12, 60, 2 / 3, 1], [2, 120, 2 / 3, -1], [3, 150, 1 / 3, -1]];

  for (var s = 0; s < spec.length; s++) {
    var house = spec[s][0], offset = spec[s][1] * DEG, f = spec[s][2], sgn = spec[s][3];
    var H = ramc + offset, lam = 0, ok = false;
    for (var it = 0; it < 12; it++) {
      lam = Math.atan2(Math.sin(H), Math.cos(H) * Math.cos(eps));
      var dec = Math.asin(Math.sin(eps) * Math.sin(lam));
      var x = Math.tan(phi) * Math.tan(dec);
      /* |x| > 1 means that degree never meets the horizon at this latitude. This is
         the Arctic-circle failure, and it is a fact about the sky, not an error. */
      if (Math.abs(x) > 1) return null;
      var ad = Math.asin(x);
      var next = ramc + offset + sgn * f * ad;
      if (Math.abs(next - H) < 1e-9) { H = next; ok = true; break; }
      H = next;
    }
    if (!ok) lam = Math.atan2(Math.sin(H), Math.cos(H) * Math.cos(eps));
    out[house] = norm360(lam * RAD);
  }

  var c = new Array(12);
  c[0] = angles.asc; c[9] = angles.mc;
  c[10] = out[11]; c[11] = out[12]; c[1] = out[2]; c[2] = out[3];
  c[3] = norm360(c[9] + 180); c[4] = norm360(c[10] + 180); c[5] = norm360(c[11] + 180);
  c[6] = norm360(c[0] + 180); c[7] = norm360(c[1] + 180); c[8] = norm360(c[2] + 180);
  return c;
}

function houseOf(lon, cusps) {
  for (var i = 0; i < 12; i++) {
    var a = cusps[i], b = cusps[(i + 1) % 12];
    var span = norm360(b - a), pos = norm360(lon - a);
    if (pos < span || span === 0) return i + 1;
  }
  return 1;
}

/* --- aspects --- */
var ASPECTS = [
  { name: 'Conjunction', glyph: '☌', angle: 0,   orb: 8, kind: 'major' },
  { name: 'Opposition',  glyph: '☍', angle: 180, orb: 8, kind: 'major' },
  { name: 'Trine',       glyph: '△', angle: 120, orb: 7, kind: 'soft'  },
  { name: 'Square',      glyph: '□', angle: 90,  orb: 7, kind: 'hard'  },
  { name: 'Sextile',     glyph: '⚹', angle: 60,  orb: 5, kind: 'soft'  }
];

function chartAspects(points) {
  var out = [];
  for (var i = 0; i < points.length; i++) {
    for (var j = i + 1; j < points.length; j++) {
      var sep = Math.abs(norm360(points[i].lon - points[j].lon));
      if (sep > 180) sep = 360 - sep;
      for (var k = 0; k < ASPECTS.length; k++) {
        var a = ASPECTS[k], delta = Math.abs(sep - a.angle);
        if (delta <= a.orb) {
          out.push({ a: points[i], b: points[j], aspect: a, orb: delta,
                     exactness: 1 - delta / a.orb });
          break;
        }
      }
    }
  }
  return out.sort(function (x, y) { return x.orb - y.orb; });
}

/* --- local birth time → UTC ---
   The browser already holds the IANA database, including historical rules. Two
   passes: guess, measure the residual, correct, and re-measure: the second pass is
   what catches a birth inside a daylight-saving transition. */
function zoneOffsetMinutes(zone, date) {
  var dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: zone, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  var p = {};
  dtf.formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
  var asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, (+p.hour) % 24, +p.minute, +p.second);
  return Math.round((asUTC - date.getTime()) / 60000);
}

function localToUTC(zone, y, mo, d, h, mi) {
  var want = Date.UTC(y, mo - 1, d, h, mi, 0);
  var guess = want;
  for (var i = 0; i < 3; i++) {
    var off = zoneOffsetMinutes(zone, new Date(guess));
    var next = want - off * 60000;
    if (next === guess) break;
    guess = next;
  }
  return new Date(guess);
}

/* --- the whole chart --- */
function computeChart(opts) {
  /* opts: {utc:Date, lat, lon, houseSystem:'whole'|'equal'|'placidus'} */
  var A = window.Astronomy;
  if (!A) throw new Error('ephemeris not loaded');
  var date = opts.utc, lat = opts.lat, lon = opts.lon;

  var y = date.getUTCFullYear();
  if (y < 1700 || y > 2200) throw new Error('out-of-range');

  var angles = chartAngles(date, lat, lon);

  var wanted = opts.houseSystem || 'whole';
  var cusps = null, used = wanted, note = '';
  if (wanted === 'placidus') {
    cusps = housesPlacidus(angles, lat);
    if (!cusps) {
      used = 'whole';
      note = 'Above the Arctic Circle, Placidus houses are undefined: these are Whole Sign. ' +
             'The Ascendant and Midheaven are unaffected.';
    }
  }
  if (!cusps) cusps = (used === 'equal') ? housesEqual(angles.asc) : housesWhole(angles.asc);

  var points = CHART_BODIES.map(function (b) {
    var l = geoLon(b, date);
    return { name: b, glyph: PGLYPH[b], lon: l, sign: signOf(l),
             retro: isRetrograde(b, date), house: houseOf(l, cusps) };
  });

  var node = meanNode(date);
  points.push({ name: 'Node', glyph: PGLYPH.Node, lon: node, sign: signOf(node),
                retro: true, house: houseOf(node, cusps), minor: true });

  /* Part of Fortune, by sect: the Sun above the horizon makes it a day chart.
     Pure arithmetic, deeply traditional, and it fits this app's framing. */
  var sun = points[0].lon, moon = points[1].lon;
  /* Sect is a horizon question, not a house question: under whole-sign houses
     a risen Sun in the Ascendant's sign lands in house 1 and the old test
     called the chart nocturnal, flipping the Part of Fortune. Longitudes from
     the Descendant round through the MC to the Ascendant are above the
     horizon in every house system. */
  var day = norm360(sun - angles.asc) >= 180;
  var fortune = norm360(day ? (angles.asc + moon - sun) : (angles.asc + sun - moon));
  points.push({ name: 'Fortune', glyph: PGLYPH.Fortune, lon: fortune, sign: signOf(fortune),
                retro: false, house: houseOf(fortune, cusps), minor: true });

  var aspectPoints = points.filter(function (p) { return !p.minor; });
  aspectPoints = aspectPoints.concat([
    { name: 'Ascendant', glyph: 'AC', lon: angles.asc, sign: signOf(angles.asc) },
    { name: 'Midheaven', glyph: 'MC', lon: angles.mc, sign: signOf(angles.mc) }
  ]);

  return {
    utc: date, lat: lat, lon: lon,
    asc: angles.asc, mc: angles.mc, lst: angles.lst, obliquity: angles.obliquity,
    sect: day ? 'day' : 'night',
    houseSystem: used, houseSystemNote: note, cusps: cusps,
    points: points, aspects: chartAspects(aspectPoints)
  };
}

/* --- today's sky, for the Astrology page --- */
function skyNow(date) {
  date = date || new Date();
  var A = window.Astronomy;
  var bodies = CHART_BODIES.map(function (b) {
    var l = geoLon(b, date);
    return { name: b, glyph: PGLYPH[b], lon: l, sign: signOf(l), retro: isRetrograde(b, date) };
  });
  var illum = A.Illumination(A.Body.Moon, date);
  var phaseAngle = A.MoonPhase(date);
  var names = [[0,'New Moon'],[45,'Waxing Crescent'],[90,'First Quarter'],[135,'Waxing Gibbous'],
               [180,'Full Moon'],[225,'Waning Gibbous'],[270,'Last Quarter'],[315,'Waning Crescent'],[360,'New Moon']];
  var phaseName = 'New Moon';
  for (var i = 0; i < names.length; i++) {
    if (phaseAngle >= names[i][0] - 22.5 && phaseAngle < names[i][0] + 22.5) { phaseName = names[i][1]; break; }
  }
  return { bodies: bodies, moon: { phase: phaseAngle, name: phaseName,
           illum: Math.round(illum.phase_fraction * 100) } };
}
