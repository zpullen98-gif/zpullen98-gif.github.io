/* First Light: the natal chart view.

   Birth details in, a real chart out. The whole point of doing the arithmetic
   properly is that the app can now be honest about what it does and does not know,
   so this view shows its working: the resolved time zone, the offset it used, and
   the UTC instant it computed from. If any of that is wrong the reader can see it
   and override it, rather than being handed a confident wrong wheel.

   Birth details are personal data. They live in FL.prefs.birth under the one
   localStorage key, are covered by the export, and are sent nowhere, there is
   nowhere to send them. */

var chartResult = null, chartError = null, chartBusy = false;

function chartBirth() { return (FL.prefs && FL.prefs.birth) || {}; }

function citySearch(q, limit) {
  q = String(q || '').trim().toLowerCase();
  if (q.length < 2 || typeof FL_CITIES === 'undefined') return [];
  var starts = [], contains = [];
  for (var i = 0; i < FL_CITIES.length; i++) {
    var n = FL_CITIES[i][0].toLowerCase();
    if (n.indexOf(q) === 0) starts.push(i);
    else if (n.indexOf(q) > -1) contains.push(i);
    if (starts.length >= (limit || 8)) break;
  }
  return starts.concat(contains).slice(0, limit || 8).map(function (i) {
    var c = FL_CITIES[i];
    return { i: i, name: c[0], country: c[1], lat: c[2], lon: c[3], zone: FL_ZONES[c[4]] };
  });
}

FL_ACTS.chartCity = function (el) {
  var q = el.value;
  var host = document.getElementById('city-hits');
  if (!host) return;
  var hits = citySearch(q);
  host.innerHTML = hits.length
    ? hits.map(function (h) {
        return '<button class="mchip" data-act="pickCity" data-i="' + h.i + '">' +
          esc(h.name) + ' <span class="ds">' + esc(h.country) + '</span></button>';
      }).join('')
    : (q.trim().length >= 2 ? '<span class="ds">No match. You can enter coordinates below instead.</span>' : '');
};

FL_ACTS.pickCity = function (el) {
  var c = FL_CITIES[+el.getAttribute('data-i')];
  var b = chartBirth();
  /* capture-before-render: the date, time, system and offset fields are
     uncontrolled, and the repaint below rebuilds them from the store:
     without this, choosing the city ate whatever was already typed */
  var d = (document.getElementById('b-date') || {}).value;   if (d) b.date = d;
  var t = (document.getElementById('b-time') || {}).value;   if (t) b.time = t;
  var sy = (document.getElementById('b-sys') || {}).value;   if (sy) b.sys = sy;
  var o = (document.getElementById('b-offset') || {}).value; if (o !== undefined && o !== '') b.offset = o;
  b.place = c[0] + ', ' + c[1];
  b.lat = c[2]; b.lon = c[3]; b.zone = FL_ZONES[c[4]];
  FL.prefs.birth = b; flSave(true);
  render();
};

FL_ACTS.chartCompute = function () {
  var b = chartBirth();
  var date = (document.getElementById('b-date') || {}).value;
  var time = (document.getElementById('b-time') || {}).value;
  var sys = (document.getElementById('b-sys') || {}).value || 'whole';
  var manualOffset = (document.getElementById('b-offset') || {}).value;

  chartError = null; chartResult = null;

  if (!date) { chartError = 'A birth date is needed.'; render(); return; }
  if (typeof b.lat !== 'number') { chartError = 'Choose a birth place, or enter coordinates.'; render(); return; }

  b.date = date; b.time = time || '12:00'; b.sys = sys;
  b.offset = manualOffset === '' ? null : Number(manualOffset);
  FL.prefs.birth = b; flSave(true);

  var dp = date.split('-').map(Number), tp = b.time.split(':').map(Number);
  var utc;
  if (b.offset !== null && !isNaN(b.offset)) {
    /* An explicit offset always wins. Someone reading their own birth certificate
       knows better than any database. */
    utc = new Date(Date.UTC(dp[0], dp[1] - 1, dp[2], tp[0], tp[1]) - b.offset * 3600000);
  } else if (b.zone) {
    utc = localToUTC(b.zone, dp[0], dp[1], dp[2], tp[0], tp[1]);
  } else {
    chartError = 'No time zone for that place. Enter a UTC offset.'; render(); return;
  }

  try {
    chartResult = computeChart({ utc: utc, lat: b.lat, lon: b.lon, houseSystem: sys });
    chartResult.usedOffset = Math.round((Date.UTC(dp[0], dp[1] - 1, dp[2], tp[0], tp[1]) - utc.getTime()) / 3600000 * 100) / 100;
    announce('Chart computed.');
  } catch (e) {
    chartError = e.message === 'out-of-range'
      ? 'The ephemeris is accurate from 1700 to 2200; that year is outside it.'
      : 'The chart could not be computed.';
  }
  render();
};

FL_ACTS.chartAspectsToggle = function () {
  FL.prefs.chartAspects = !FL.prefs.chartAspects;
  flSave();
  render();
};

FL_ACTS.chartForget = function () {
  delete FL.prefs.birth;
  chartResult = null;
  flSave(true);
  toast('Birth details removed from this device.');
  render();
};

FL_VIEWS.chart = {
  label: 'Your chart',
  title: 'Your Chart',
  hidden: true,
  render: function () {
    if (typeof FL_CITIES === 'undefined' || !window.Astronomy) {
      return '<a class="keep" href="#/astro">← Astrology</a><h1>Your chart</h1>' +
        '<p class="loadnote" id="chart-loading">Loading the ephemeris…</p>';
    }

    var b = chartBirth();
    var small = window.innerWidth < 480;

    var form =
      '<div class="label">Birth details</div>' +
      '<div class="drawrow">' +
        '<input type="date" id="b-date" value="' + esc(b.date || '') + '" aria-label="Birth date">' +
        '<input type="time" id="b-time" value="' + esc(b.time || '') + '" aria-label="Birth time">' +
      '</div>' +
      '<div class="drawrow">' +
        '<input type="text" id="b-city" placeholder="Birth place: start typing a city"' +
        ' data-input="chartCity" value="" aria-label="Birth place">' +
      '</div>' +
      '<div class="months" id="city-hits" style="justify-content:flex-start"></div>' +
      (b.place ? '<p class="px" style="margin:8px 0">' + esc(b.place) + ' · ' +
        b.lat.toFixed(3) + ', ' + b.lon.toFixed(3) + (b.zone ? ' · ' + esc(b.zone) : '') + '</p>' : '') +
      '<div class="drawrow" style="margin-top:12px">' +
        '<select id="b-sys" class="sel" aria-label="House system">' +
          '<option value="whole"' + (b.sys === 'whole' || !b.sys ? ' selected' : '') + '>Whole Sign houses</option>' +
          '<option value="equal"' + (b.sys === 'equal' ? ' selected' : '') + '>Equal houses</option>' +
          '<option value="placidus"' + (b.sys === 'placidus' ? ' selected' : '') + '>Placidus houses</option>' +
        '</select>' +
        '<input type="number" id="b-offset" step="0.25" placeholder="UTC offset (optional)"' +
        ' value="' + (b.offset === null || b.offset === undefined ? '' : b.offset) + '" aria-label="UTC offset override">' +
      '</div>' +
      '<p class="vidnote">Whole Sign is the default because it is what the Hellenistic tradition this chapter describes actually used, and because it is defined at every latitude. The offset field is an override for when you know your birth certificate says otherwise.</p>' +
      '<div class="drawrow" style="margin-top:12px">' +
        '<button class="btn" data-act="chartCompute">Draw the chart</button>' +
        (b.date ? ' <button class="keep" data-act="chartForget">Forget my details</button>' : '') +
      '</div>';

    var body = '';
    if (chartError) body = '<p class="loadnote" style="margin-top:16px">' + esc(chartError) + '</p>';
    else if (chartResult) {
      var c = chartResult;
      var showAsp = !!FL.prefs.chartAspects;
      body =
        '<div class="label">The wheel</div>' +
        drawWheel(c, { small: small, aspects: showAsp }) +
        '<div style="text-align:center;margin-top:8px">' +
          '<button class="readmini" data-act="chartAspectsToggle">' +
          (showAsp ? 'Hide aspect lines' : 'Show aspect lines') + '</button></div>' +
        (c.houseSystemNote ? '<p class="loadnote" style="margin-top:12px">' + esc(c.houseSystemNote) + '</p>' : '') +

        '<div class="label">The placements</div>' + chartTable(c) +
        '<div class="label">The houses · ' + esc(c.houseSystem) + '</div>' + houseTable(c) +
        '<div class="label">The aspects</div>' + aspectTable(c) +

        '<div class="label">The working</div>' +
        '<div class="card">' +
          '<div class="astrorow"><span class="k">Birth, local</span> ' + esc(b.date + ' ' + b.time) + '</div>' +
          '<div class="astrorow"><span class="k">Zone</span> ' + esc(b.zone || '(offset given by hand)') + '</div>' +
          '<div class="astrorow"><span class="k">Offset used</span> UTC' + (c.usedOffset >= 0 ? '+' : '') + c.usedOffset + '</div>' +
          '<div class="astrorow"><span class="k">Instant</span> ' + esc(c.utc.toISOString()) + '</div>' +
          '<div class="astrorow"><span class="k">Coordinates</span> ' + c.lat.toFixed(3) + ', ' + c.lon.toFixed(3) + '</div>' +
          '<div class="astrorow"><span class="k">Sidereal time</span> ' + c.lst.toFixed(4) + 'h</div>' +
          '<div class="astrorow"><span class="k">Sect</span> ' + esc(c.sect) + ' chart</div>' +
        '</div>' +
        '<p class="mintro" style="margin-top:22px">The largest error in almost every chart is the stated birth time. ' +
        '“About three in the afternoon” is give or take half an hour, which moves the Ascendant some seven degrees. ' +
        'Before 1970 the time-zone record itself is best-effort, and before standard time it is an approximation everywhere.</p>';
    }

    return '<a class="keep" style="margin-bottom:20px" href="#/astro">← Astrology</a>' +
      '<div class="kick">Computed on this device</div><h1>Your chart</h1>' +
      '<p class="note">Real positions for the ten bodies, the Ascendant and Midheaven, the house cusps and the aspects, worked out here and kept here; if you are signed in, only a count of mornings and your streak is recorded.</p>' +
      form + body;
  },

  after: function () {
    if (!window.Astronomy || typeof FL_CITIES === 'undefined') {
      chartEnsureLoaded().then(function () {
        if (flRoute.view === 'chart') render();
      }).catch(function () {
        var el = document.getElementById('chart-loading');
        if (el) el.textContent = 'The chart engine could not be loaded. It needs one connection to arrive, then stays.';
      });
    }
  }
};

/* The ephemeris and the city list are ~260 KB together: real weight for a feature
   most mornings will not touch. They load on demand and the service worker keeps
   them, so it is once per device rather than once per launch. */
var chartLoading = null;
function chartEnsureLoaded() {
  if (window.Astronomy && typeof FL_CITIES !== 'undefined') return Promise.resolve();
  if (chartLoading) return chartLoading;
  var load = function (src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = res; s.onerror = function () { rej(new Error(src)); };
      document.head.appendChild(s);
    });
  };
  chartLoading = Promise.all([
    window.Astronomy ? Promise.resolve() : load('js/vendor/astronomy.js?v=' + FL_TEXT_V),
    typeof FL_CITIES !== 'undefined' ? Promise.resolve() : load('js/data-cities.js?v=' + FL_TEXT_V)
  ]);
  return chartLoading;
}

/* The city field needs an input listener; the delegated click handler cannot see it. */
document.addEventListener('input', function (e) {
  var el = e.target;
  if (!el || !el.getAttribute) return;
  var act = el.getAttribute('data-input');
  if (act && FL_ACTS[act]) FL_ACTS[act](el, e);
});
