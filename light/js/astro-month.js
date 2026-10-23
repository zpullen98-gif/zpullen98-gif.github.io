/* First Light: a locally calculated month of the sky.
   Dependencies: Astronomy Engine and astro-chart.js. No network, stored birth
   details, forecasts or fixed monthly copy. Dates are astronomical estimates.
   Reference: https://github.com/cosinekitty/astronomy/blob/master/source/js/README.md
   GeoVector + Ecliptic are geocentric, tropical, ecliptic-of-date; the similarly
   named EclipticLongitude is heliocentric and must not be used here.

   Search six-hour longitude samples, split at refined stations, then bisect
   actual crossings. A nearby daily sample is never presented as an exact hit.
   The half-open calendar interval [start,end) keeps a midnight event in one month.
   Clock-zone month boundaries are separate from the app's shifted study day. */
var ASTRO_MONTH_BODIES = ['Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
var ASTRO_MONTH_ASPECTS = [
  { name: 'Conjunction', angle: 0 }, { name: 'Sextile', angle: 60 },
  { name: 'Square', angle: 90 }, { name: 'Trine', angle: 120 },
  { name: 'Opposition', angle: 180 }
];
var astroMonthMemo = [];

function astroMonthDelta(a, b) { return norm360(a - b + 180) - 180; }

/* A calendar boundary is not an ambiguous birth time. Choose the first instant
   of the month if midnight repeats, or the transition instant if midnight was
   skipped. Keep this separate from strict localToUTC birth-time validation. */
function astroMonthCivilStart(zone, year, month) {
  var want = Date.UTC(year, month - 1, 1), offsets = [], matches = [];
  var wall = function (at) { return at + zoneOffsetMinutes(zone, new Date(at)) * 60000; };
  for (var hour = -48; hour <= 48; hour += 6) {
    var offset = zoneOffsetMinutes(zone, new Date(want + hour * 3600000));
    if (offsets.indexOf(offset) < 0) offsets.push(offset);
  }
  offsets.forEach(function (offset) {
    var candidate = want - offset * 60000;
    if (Math.abs(wall(candidate) - want) < 1) matches.push(candidate);
  });
  if (matches.length) return new Date(Math.min.apply(null, matches));
  /* A forward clock jump can skip 00:00, or even a civil date. Bracket the first
     real entry into the month rather than assigning a time on the previous day. */
  var left = want - 72 * 3600000;
  for (var right = left + 3600000; right <= want + 72 * 3600000; right += 3600000) {
    if (wall(left) < want && wall(right) >= want) {
      while (right - left > 1) {
        var mid = Math.floor((left + right) / 2);
        if (wall(mid) >= want) right = mid;
        else left = mid;
      }
      return new Date(right);
    }
    left = right;
  }
  throw new Error('The calendar month boundary could not be resolved in this time zone.');
}

function astroMonthBounds(year, month, zone) {
  if (!Number.isInteger(year) || year < 1700 || year > 2200 ||
      !Number.isInteger(month) || month < 1 || month > 12) throw new Error('Invalid calendar month');
  zone = zone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  /* Validate the zone even if a browser resolves a fallback without throwing. */
  new Intl.DateTimeFormat('en', { timeZone: zone }).format(new Date(0));
  var nextYear = month === 12 ? year + 1 : year, nextMonth = month === 12 ? 1 : month + 1;
  return { year: year, month: month, zone: zone,
    start: astroMonthCivilStart(zone, year, month),
    end: astroMonthCivilStart(zone, nextYear, nextMonth) };
}

/* Every longitude requested in one calculation is memoised only in memory. */
function astroMonthLongitude(body) {
  var positions = new Map();
  return function (time) {
    time = Math.round(+time);
    if (!positions.has(time)) positions.set(time, norm360(geoLon(body, new Date(time))));
    return positions.get(time);
  };
}

/* Short central difference: degrees per day, with the 0-degree wrap removed. */
function astroMonthSpeed(longitude, time) {
  var half = 1800000;
  return astroMonthDelta(longitude(time + half), longitude(time - half)) * 24;
}

function astroMonthBisect(fn, left, right) {
  var a = fn(left), b = fn(right);
  if (Math.abs(a) < 1e-11) return left;
  if (Math.abs(b) < 1e-11) return right;
  if (a * b > 0) return null;
  for (var i = 0; i < 60 && right - left > 100; i++) {
    var mid = (left + right) / 2, value = fn(mid);
    if (Math.abs(value) < 1e-11) return mid;
    if (a * value <= 0) { right = mid; b = value; }
    else { left = mid; a = value; }
  }
  return (left + right) / 2;
}

function astroMonthTrack(body, start, end) {
  var longitude = astroMonthLongitude(body), step = 21600000, times = [], samples = [];
  /* Padding catches a turn just inside either month boundary. */
  for (var t = start - step; t < end + step; t += step) samples.push({ t: t, lon: longitude(t) });
  samples.push({ t: end + step, lon: longitude(end + step) });
  times.push(start, end);
  samples.forEach(function (p) { if (p.t > start && p.t < end) times.push(p.t); });
  var stations = [];
  if (body !== 'Sun') {
    for (var i = 1; i < samples.length - 1; i++) {
      var before = astroMonthDelta(samples[i].lon, samples[i - 1].lon);
      var after = astroMonthDelta(samples[i + 1].lon, samples[i].lon);
      if (before * after > 0) continue;
      var root = astroMonthBisect(function (at) { return astroMonthSpeed(longitude, at); }, samples[i - 1].t, samples[i + 1].t);
      if (root === null || root < start || root >= end || stations.some(function (s) { return Math.abs(s.t - root) < 60000; })) continue;
      times.push(root);
      stations.push({ t: root, direction: astroMonthSpeed(longitude, root + 21600000) < 0 ? 'retrograde' : 'direct' });
    }
  }
  times.sort(function (a, b) { return a - b; });
  var points = [], last;
  times.forEach(function (at) {
    if (last !== undefined && Math.abs(at - last) < 1) return;
    var lon = longitude(at), previous = points[points.length - 1];
    points.push({ t: at, lon: lon, unwrapped: previous ? previous.unwrapped + astroMonthDelta(lon, previous.lon) : lon });
    last = at;
  });
  return { body: body, longitude: longitude, points: points, stations: stations };
}

/* Return every crossing, including both sides of a retrograde loop. */
function astroMonthCrossings(track, target) {
  var out = [], points = track.points, start = points[0].t, end = points[points.length - 1].t;
  for (var i = 1; i < points.length; i++) {
    var left = points[i - 1], right = points[i];
    var low = Math.min(left.unwrapped, right.unwrapped), high = Math.max(left.unwrapped, right.unwrapped);
    var first = Math.ceil((low - target - 1e-10) / 360), last = Math.floor((high - target + 1e-10) / 360);
    for (var k = first; k <= last; k++) {
      var wanted = target + k * 360;
      var root = astroMonthBisect(function (at) {
        return left.unwrapped + astroMonthDelta(track.longitude(at), left.lon) - wanted;
      }, left.t, right.t);
      if (root === null || root < start || root >= end) continue;
      if (out.some(function (at) { return Math.abs(at - root) < 1000; })) continue;
      /* Reject a discontinuity or a merely close sample, even after refinement. */
      if (Math.abs(astroMonthDelta(track.longitude(root), target)) > 0.00001) continue;
      out.push(root);
    }
  }
  return out.sort(function (a, b) { return a - b; });
}

function astroMonthNatalPoints(natal) {
  if (!natal) return [];
  if (!Array.isArray(natal.points)) throw new Error('Invalid natal chart');
  var points = natal.points.filter(function (p) { return p && CHART_BODIES.indexOf(p.name) !== -1 && !p.minor; })
    .map(function (p) {
      if (!Number.isFinite(p.lon)) throw new Error('Invalid natal longitude');
      return { name: p.name, lon: norm360(p.lon) };
    });
  if (points.length !== 10 || new Set(points.map(function (p) { return p.name; })).size !== 10) throw new Error('Incomplete natal chart');
  [['Ascendant', natal.asc], ['Midheaven', natal.mc]].forEach(function (p) {
    if (!Number.isFinite(p[1])) throw new Error('Invalid natal angle');
    points.push({ name: p[0], lon: norm360(p[1]) });
  });
  if (!Array.isArray(natal.cusps) || natal.cusps.length !== 12 || !natal.cusps.every(Number.isFinite)) throw new Error('Invalid natal houses');
  return points;
}

function astroMonthBuild(year, month, natal, options) {
  options = options || {};
  if (!window.Astronomy) throw new Error('ephemeris not loaded');
  var bounds = astroMonthBounds(year, month, options.zone), points = astroMonthNatalPoints(natal);
  var memoKey = JSON.stringify([year, month, bounds.zone, points, natal ? natal.cusps : null]);
  for (var cached = 0; cached < astroMonthMemo.length; cached++) if (astroMonthMemo[cached].key === memoKey) return astroMonthMemo[cached].value;
  var start = +bounds.start, end = +bounds.end, events = [], ingresses = [], stations = [], positions = [];
  var inHouse = function (lon) { return natal ? houseOf(lon, natal.cusps) : null; };
  ASTRO_MONTH_BODIES.forEach(function (body) {
    var track = astroMonthTrack(body, start, end);
    positions.push({ body: body, startLon: track.longitude(start), endLon: track.longitude(end),
      startSign: signOf(track.longitude(start)), endSign: signOf(track.longitude(end)),
      startHouse: inHouse(track.longitude(start)), endHouse: inHouse(track.longitude(end)),
      retro: astroMonthSpeed(track.longitude, start) < 0 });
    points.forEach(function (point) {
      ASTRO_MONTH_ASPECTS.forEach(function (aspect) {
        var offsets = aspect.angle === 0 || aspect.angle === 180 ? [aspect.angle] : [aspect.angle, -aspect.angle];
        offsets.forEach(function (offset) {
          astroMonthCrossings(track, norm360(point.lon + offset)).forEach(function (at) {
            var lon = track.longitude(at);
            events.push({ type: 'aspect', utc: new Date(Math.round(at)), transit: body, natal: point.name,
              aspect: aspect.name, angle: aspect.angle, lon: lon, natalLon: point.lon,
              sign: signOf(lon), house: inHouse(lon), retro: astroMonthSpeed(track.longitude, at) < 0,
              orb: Math.abs(Math.abs(astroMonthDelta(lon, point.lon)) - aspect.angle) });
          });
        });
      });
    });
    for (var sign = 0; sign < 12; sign++) {
      astroMonthCrossings(track, sign * 30).forEach(function (at) {
        var retro = astroMonthSpeed(track.longitude, at) < 0;
        var after = signOf(track.longitude(at + 60000)), before = signOf(track.longitude(at - 60000));
        if (before.i === after.i) return;
        ingresses.push({ type: 'ingress', utc: new Date(Math.round(at)), body: body, from: before.name,
          to: after.name, sign: after, lon: track.longitude(at), retro: retro, house: inHouse(track.longitude(at + 60000)) });
      });
    }
    track.stations.forEach(function (station) {
      var lon = track.longitude(station.t);
      stations.push({ type: 'station', utc: new Date(Math.round(station.t)), body: body,
        direction: station.direction, lon: lon, sign: signOf(lon), house: inHouse(lon) });
    });
  });
  var phases = [], names = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter'];
  names.forEach(function (name, i) {
    var cursor = start - 1000;
    for (var count = 0; count < 3; count++) {
      var found = window.Astronomy.SearchMoonPhase(i * 90, new Date(cursor), (end - cursor) / 86400000 + 1);
      if (!found || +found.date >= end) break;
      var at = +found.date;
      if (at >= start) {
        var lon = geoLon('Moon', found.date);
        phases.push({ type: 'phase', utc: new Date(at), name: name, angle: i * 90,
          lon: lon, sign: signOf(lon), house: inHouse(lon) });
      }
      cursor = at + 60000;
    }
  });
  var byTime = function (a, b) { return +a.utc - +b.utc; };
  events.sort(byTime); phases.sort(byTime); ingresses.sort(byTime); stations.sort(byTime);
  /* Editorial focus, not strength, luck or a predicted outcome. The complete
     chronology remains available and never loses repeated passes. */
  var weights = { Sun: 2, Mercury: 1, Venus: 2, Mars: 3, Jupiter: 5, Saturn: 5, Uranus: 4, Neptune: 4, Pluto: 4 };
  var focus = function (e) { return weights[e.transit] + (['Sun', 'Moon', 'Ascendant', 'Midheaven'].indexOf(e.natal) >= 0 ? 3 : 0); };
  var highlights = events.slice().sort(function (a, b) { return focus(b) - focus(a) || byTime(a, b); }).slice(0, 8).sort(byTime);
  var result = { year: year, month: month, start: bounds.start, end: bounds.end, zone: bounds.zone,
    events: events, phases: phases, ingresses: ingresses, stations: stations, positions: positions,
    highlights: highlights, hasNatal: !!natal,
    method: 'Tropical geocentric ecliptic longitudes; refined major-aspect crossings; Astronomy Engine lunar phases.' };
  astroMonthMemo.unshift({ key: memoKey, value: result });
  if (astroMonthMemo.length > 4) astroMonthMemo.pop();
  return result;
}
