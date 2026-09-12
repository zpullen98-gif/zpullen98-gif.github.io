/* First Light: the sun, and the palette it drives.

   The app is named for a moment of the day, so it should know when that moment is.
   This computes real local sunrise, sunset and civil twilight, and puts the result
   on <html data-phase> so the stylesheet can move the whole surface through night,
   first light, day and dusk. It also gives Phase 3 its evening boundary: the examen
   appears when the sun has actually gone down, not when a hardcoded hour says so.

   The algorithm is NOAA's standard solar position approximation. It is accurate to
   about a minute at temperate latitudes, which is far beyond what choosing a
   background colour requires, and it costs nothing: no library, no network. The
   real ephemeris arrives in Phase 4 for the planets; this does not need it. */

var SUN_ZENITH_OFFICIAL = 90.833;   // includes refraction and the sun's radius
var SUN_ZENITH_CIVIL    = 96;       // civil twilight: enough light to read outdoors

function sunRad(d) { return d * Math.PI / 180; }
function sunDeg(r) { return r * 180 / Math.PI; }

/* Day of the year on the REAL calendar. Deliberately not plan.js's doyOf(), which
   is the almanac's fixed 366-slot table: the sun does not observe that fiction. */
function sunDayOfYear(dt) {
  return Math.floor((dt - new Date(dt.getFullYear(), 0, 0)) / 86400000);
}

/* Returns UTC minutes past midnight for the given zenith, or null when the sun
   neither rises nor sets that day. Above the Arctic and below the Antarctic circles
   that null is the correct answer, not an error: the palette falls back to clock
   hours there. */
function sunEventUTC(dt, lat, lon, zenith, rising) {
  var doy = sunDayOfYear(dt);
  var g = 2 * Math.PI / 365 * (doy - 1 + 0.5);   // fractional year, mid-day

  var eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g)
                       - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  var decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g)
           - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
           - 0.002697 * Math.cos(3 * g) + 0.001480 * Math.sin(3 * g);

  var latR = sunRad(lat);
  var cosH = Math.cos(sunRad(zenith)) / (Math.cos(latR) * Math.cos(decl)) - Math.tan(latR) * Math.tan(decl);
  if (cosH > 1 || cosH < -1) return null;        // polar day or polar night

  var ha = sunDeg(Math.acos(cosH));
  /* Longitude positive east. Sanity check that pinned this sign convention: at
     Greenwich on an equinox this must yield 06:00 and 18:00 UTC, and at +15° east
     it must yield 05:00, both of which it does. */
  return 720 - 4 * (lon + (rising ? ha : -ha)) - eqtime;
}

/* UTC minutes -> a Date on the same calendar day, in the viewer's local zone. */
function sunMinutesToDate(dt, utcMinutes) {
  if (utcMinutes === null) return null;
  var base = Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0);
  return new Date(base + Math.round(utcMinutes * 60000));
}

function sunTimes(dt, lat, lon) {
  dt = dt || new Date();
  return {
    dawn:    sunMinutesToDate(dt, sunEventUTC(dt, lat, lon, SUN_ZENITH_CIVIL, true)),
    sunrise: sunMinutesToDate(dt, sunEventUTC(dt, lat, lon, SUN_ZENITH_OFFICIAL, true)),
    sunset:  sunMinutesToDate(dt, sunEventUTC(dt, lat, lon, SUN_ZENITH_OFFICIAL, false)),
    dusk:    sunMinutesToDate(dt, sunEventUTC(dt, lat, lon, SUN_ZENITH_CIVIL, false))
  };
}

/* --- where the reader is ---
   Three tiers, and the app never asks for permission it doesn't need. If the reader
   has set coordinates we use them. Otherwise we infer longitude from the timezone
   offset, which is accurate to within half a zone and costs nothing, and assume a
   temperate latitude. Geolocation is offered in settings, never prompted for at
   boot: a permission dialog is a poor greeting at five in the morning. */
function sunWhere() {
  var p = (typeof FL !== 'undefined' && FL.prefs) ? FL.prefs : {};
  if (typeof p.lat === 'number' && typeof p.lon === 'number') {
    return { lat: p.lat, lon: p.lon, exact: true };
  }
  /* getTimezoneOffset is minutes BEHIND UTC, so it is positive west: negate it. */
  var lon = -(new Date().getTimezoneOffset() / 60) * 15;
  return { lat: 40, lon: lon, exact: false };
}

function sunAskLocation() {
  return new Promise(function (resolve, reject) {
    if (!navigator.geolocation) return reject(new Error('This browser cannot report a location.'));
    navigator.geolocation.getCurrentPosition(function (pos) {
      FL.prefs.lat = Math.round(pos.coords.latitude * 1000) / 1000;
      FL.prefs.lon = Math.round(pos.coords.longitude * 1000) / 1000;
      flSave(true);
      sunApply();
      resolve(FL.prefs);
    }, function (err) { reject(err); }, { timeout: 10000, maximumAge: 3600000 });
  });
}

/* --- solar altitude ---
   Degrees above the horizon, at an instant. This is what the palette runs on.

   Driving the palette off sunrise/sunset events instead is the obvious approach and
   it has two failure modes: inside the polar circles those events do not exist, so
   every branch has to guard a null and then invent a clock-based fallback; and the
   events are points, so "how far through twilight are we" needs interpolation
   between them. Altitude is continuous, defined at every latitude on every day of
   the year, and cheaper: no iterative search. Rise and set times are still
   computed above, but only to be shown to the reader, never to be depended on. */
function sunAltitude(dt, lat, lon) {
  var doy = sunDayOfYear(dt);
  var minutes = dt.getUTCHours() * 60 + dt.getUTCMinutes() + dt.getUTCSeconds() / 60;
  var g = 2 * Math.PI / 365 * (doy - 1 + (minutes / 60 - 12) / 24);

  var eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g)
                       - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  var decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g)
           - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
           - 0.002697 * Math.cos(3 * g) + 0.001480 * Math.sin(3 * g);

  var tst = minutes + eqtime + 4 * lon;          // true solar time, minutes
  var ha = sunRad(tst / 4 - 180);                // hour angle
  var latR = sunRad(lat);
  return sunDeg(Math.asin(Math.sin(latR) * Math.sin(decl) +
                          Math.cos(latR) * Math.cos(decl) * Math.cos(ha)));
}

/* --- the four phases ---
   Thresholds in degrees of solar altitude, with the direction of travel separating
   morning from evening at the same height. Under a polar night the sun stays below
   -6 all day and the app simply remains in night, which is correct and honest. In
   a high-latitude winter it may never climb past 10, so the whole short day reads
   as first light, also true, and the nicest thing this model does. */
var SUN_ALT_NIGHT = -6;    // civil twilight: the sky stops giving usable light
var SUN_ALT_DAY   = 10;    // clear of the golden band

function sunPhase(now) {
  now = now || new Date();
  var w = sunWhere();
  var alt = sunAltitude(now, w.lat, w.lon);
  if (alt < SUN_ALT_NIGHT) return 'night';
  if (alt >= SUN_ALT_DAY) return 'day';
  /* Ten minutes on tells us which side of noon we are on without needing the
     transit time, and it works at the poles, where transit is meaningless. */
  var later = sunAltitude(new Date(now.getTime() + 600000), w.lat, w.lon);
  return (later > alt) ? 'firstlight' : 'dusk';
}

/* True once the sun is down for the day. Phase 3's examen keys off this: the app
   turns toward the evening because the evening has arrived, not because a hardcoded
   hour says six o'clock, which in Oslo in June would be broad daylight and in
   December would be four hours late.

   The sun being below the horizon is not sufficient on its own, because that is
   equally true at five in the morning. So: below the horizon, and on the far side
   of the day. The clock is used only to answer "which side", never "is it dark",
   and the 4am cut keeps a late night attached to the evening it belongs to. */
function sunIsEvening(now) {
  now = now || new Date();
  var w = sunWhere();
  var h = now.getHours();
  /* the small hours count as evening up to the reader's own day boundary,
     so evening mode and the record agree on when a day rolls; 4 stands in
     when no boundary has been chosen, which was the old fixed behaviour */
  var edge = Number(FL.prefs.dayEnd) || 4;
  if (sunAltitude(now, w.lat, w.lon) >= 0) {
    /* polar day: the sun will not set for weeks, and an examen gated on
       darkness would simply vanish. Where there is genuinely no sunset
       today, the clock stands in, the same promise the palette keeps. */
    var t = sunTimes(now, w.lat, w.lon);
    if (t.sunset === null) return h >= 21 || h < edge;
    return false;
  }
  return h >= 12 || h < edge;
}

function sunSeason(now) {
  now = now || new Date();
  var w = sunWhere();
  var m = now.getMonth() + 1;
  var s = (m >= 3 && m <= 5) ? 'spring' : (m >= 6 && m <= 8) ? 'summer'
        : (m >= 9 && m <= 11) ? 'autumn' : 'winter';
  /* South of the equator the seasons are opposite, and an almanac that calls
     August "high summer" to a reader in Melbourne has stopped paying attention. */
  if (w.lat < 0) s = { spring: 'autumn', summer: 'winter', autumn: 'spring', winter: 'summer' }[s];
  return s;
}

/* --- apply ---
   Writes data-phase and data-season on <html>. All colour lives in the stylesheet;
   this file never touches a hex value. */
var sunTimer = null;
function sunApply() {
  var pref = (typeof FL !== 'undefined' && FL.prefs && FL.prefs.theme) ? FL.prefs.theme : 'auto';
  var phase = (pref === 'auto') ? sunPhase() : pref;
  var root = document.documentElement;
  if (root.getAttribute('data-phase') !== phase) root.setAttribute('data-phase', phase);
  root.setAttribute('data-season', sunSeason());

  /* Keep the meta theme-color in step so the phone's status bar matches the app
     rather than flashing the wrong colour on every launch. */
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    var bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    if (bg) meta.setAttribute('content', bg);
  }

  /* Re-check on the minute. Cheap, and it means the surface actually changes under
     a reader who is sitting with the app as the sun comes up, which is the point. */
  if (sunTimer) clearTimeout(sunTimer);
  var msToNextMinute = 60000 - (Date.now() % 60000) + 250;
  sunTimer = setTimeout(sunApply, msToNextMinute);
  return phase;
}

/* A readable summary for the settings panel, so the reader can see what the app
   believes about their sky and correct it if it is wrong. */
function sunDescribe() {
  var w = sunWhere();
  var t = sunTimes(new Date(), w.lat, w.lon);
  var fmt = function (d) {
    return d ? d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : '-';
  };
  return {
    exact: w.exact,
    lat: w.lat, lon: w.lon,
    phase: sunPhase(), season: sunSeason(),
    dawn: fmt(t.dawn), sunrise: fmt(t.sunrise), sunset: fmt(t.sunset), dusk: fmt(t.dusk),
    polar: !t.sunrise || !t.sunset
  };
}
