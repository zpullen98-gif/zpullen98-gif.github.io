/* First Light: the natal chart view.

   Birth details in, a real chart out. The whole point of doing the arithmetic
   properly is that the app can now be honest about what it does and does not know,
   so this view shows its working: the resolved time zone, the offset it used, and
   the UTC instant it computed from. If any of that is wrong the reader can see it
   and override it, rather than being handed a confident wrong wheel.

   Birth details are personal data. They live in FL.prefs.birth under the one
   localStorage key, are covered by the export, and are sent nowhere, there is
   nowhere to send them. */

var chartResult = null, chartError = null, chartResultKey = '', chartLoadError = false;

function chartBirth() { return (FL.prefs && FL.prefs.birth) || {}; }

function chartBirthKey(b) {
  return JSON.stringify([b.date, b.time, b.lat, b.lon, b.zone, b.offset, b.sys]);
}

function chartCaptureBirth() {
  var b = Object.assign({}, chartBirth());
  [['b-date','date'], ['b-time','time'], ['b-sys','sys'], ['b-place','place'], ['b-zone','zone']].forEach(function (pair) {
    var el = document.getElementById(pair[0]);
    if (el) b[pair[1]] = el.value;
  });
  [['b-lat','lat'], ['b-lon','lon'], ['b-offset','offset']].forEach(function (pair) {
    var el = document.getElementById(pair[0]);
    if (el) b[pair[1]] = el.value.trim() === '' ? null : Number(el.value);
  });
  FL.prefs.birth = b;
  return b;
}

FL_ACTS.chartDraft = function () {
  chartCaptureBirth();
  flSave(true);
  /* The existing wheel belongs to the last saved calculation. Hide it while
     editing so it can never be mistaken for the changed birth details. */
  var result = document.getElementById('chart-result');
  if (result && chartBirthKey(chartBirth()) !== chartResultKey) result.hidden = true;
};

function chartRestore() {
  var b = chartBirth(), key = chartBirthKey(b);
  if (key === chartResultKey) return;
  chartResult = null; chartError = null; chartResultKey = key;
  if (!b.date) return;
  try { chartResult = chartFromBirth(b); }
  catch (e) { chartError = e.message; }
}

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
  if (!c) return;
  var b = chartCaptureBirth();
  b.place = c[0] + ', ' + c[1];
  b.lat = c[2]; b.lon = c[3]; b.zone = FL_ZONES[c[4]];
  FL.prefs.birth = b; flSave(true);
  render();
  var selected = document.getElementById('chart-place-summary');
  if (selected) selected.focus();
};

FL_ACTS.chartCompute = function () {
  var b = chartCaptureBirth();
  flSave(true);
  chartError = null; chartResult = null; chartResultKey = chartBirthKey(b);
  try {
    chartResult = chartFromBirth(b);
    announce('Chart computed.');
  } catch (e) {
    chartError = e.message;
  }
  render();
  var result = document.getElementById(chartError ? 'chart-error' : 'chart-result');
  if (result) { result.focus(); result.scrollIntoView({ block: 'start' }); }
};

FL_ACTS.chartAspectsToggle = function () {
  chartCaptureBirth();
  FL.prefs.chartAspects = !FL.prefs.chartAspects;
  flSave();
  render();
};

FL_ACTS.chartForget = function () {
  delete FL.prefs.birth;
  chartResult = null; chartError = null; chartResultKey = '';
  flSave(true);
  toast('Birth details removed from this device.');
  render();
};

FL_ACTS.chartRetry = function () {
  chartLoadError = false;
  render();
};

FL_VIEWS.chart = {
  label: 'Your chart',
  title: 'Your Chart',
  hidden: true,
  render: function () {
    if (typeof FL_CITIES === 'undefined' || !window.Astronomy) {
      return '<a class="keep" href="#/astro">Astrology</a><h1>Your chart</h1>' +
        (chartLoadError ? '<p class="loadnote" role="status">The chart engine could not be loaded. Connect and try again; once cached, it works offline.</p><button class="btn" data-act="chartRetry">Try again</button>' :
          '<p class="loadnote" id="chart-loading" role="status">Loading the ephemeris...</p>');
    }

    chartRestore();
    var b = chartBirth();
    var small = window.innerWidth < 480;

    var form =
      '<div class="label">Birth details</div>' +
      '<div class="drawrow">' +
        '<label class="chart-field">Birth date<input type="date" id="b-date" data-input="chartDraft" min="1700-01-01" max="2200-12-31" value="' + esc(b.date || '') + '"></label>' +
        '<label class="chart-field">Birth time (local)<input type="time" id="b-time" data-input="chartDraft" value="' + esc(b.time || '') + '"></label>' +
      '</div>' +
      '<p class="vidnote">Use the recorded local time, including AM or PM. A known time is required for the rising sign and houses; no time is guessed.</p>' +
      '<div class="drawrow">' +
        '<label class="chart-field">Find your birth city<input type="search" id="b-city" placeholder="Start typing a city"' +
        ' data-input="chartCity" value="" aria-controls="city-hits" autocomplete="off"></label>' +
      '</div>' +
      '<div class="months" id="city-hits" aria-live="polite" style="justify-content:flex-start"></div>' +
      (b.place ? '<p class="px" id="chart-place-summary" tabindex="-1" style="margin:8px 0">Selected place: ' + esc(b.place) +
        (b.zone ? ' · ' + esc(b.zone) : '') + '</p>' : '') +
      '<div class="drawrow" style="margin-top:12px">' +
        '<label class="chart-field">House system<select id="b-sys" class="sel" data-input="chartDraft">' +
          '<option value="whole"' + (b.sys === 'whole' || !b.sys ? ' selected' : '') + '>Whole Sign houses</option>' +
          '<option value="equal"' + (b.sys === 'equal' ? ' selected' : '') + '>Equal houses</option>' +
          '<option value="placidus"' + (b.sys === 'placidus' ? ' selected' : '') + '>Placidus houses</option>' +
        '</select></label>' +
      '</div>' +
      '<p class="vidnote">Whole Sign is the default: the rising sign is the first house and each following sign is another house. Equal houses begin at the exact rising degree. Placidus divides the daily motion of the sky. These are different interpretive conventions, not different planetary positions.</p>' +
      '<details class="card"><summary>Exact place, coordinates and time zone</summary>' +
        '<p class="vidnote">Choose a city above or enter the recorded location here. Coordinates use positive north/east and negative south/west. For a hospital, enter its location rather than your current location.</p>' +
        '<label class="chart-field">Place name<input type="text" id="b-place" data-input="chartDraft" value="' + esc(b.place || '') + '" placeholder="City or hospital"></label>' +
        '<div class="drawrow"><label class="chart-field">Latitude<input type="number" id="b-lat" data-input="chartDraft" step="any" min="-89.999999" max="89.999999" value="' + esc(b.lat === null || b.lat === undefined ? '' : b.lat) + '"></label>' +
        '<label class="chart-field">Longitude<input type="number" id="b-lon" data-input="chartDraft" step="any" min="-180" max="180" value="' + esc(b.lon === null || b.lon === undefined ? '' : b.lon) + '"></label></div>' +
        '<label class="chart-field">IANA time zone<input type="text" id="b-zone" data-input="chartDraft" value="' + esc(b.zone || '') + '" placeholder="For example, Europe/London" spellcheck="false"></label>' +
        '<label class="chart-field">UTC offset override, in hours (optional)<input type="number" id="b-offset" data-input="chartDraft" step="any" min="-14" max="14" value="' + esc(b.offset === null || b.offset === undefined ? '' : b.offset) + '" aria-describedby="chart-offset-help"></label>' +
        '<p class="vidnote" id="chart-offset-help">Leave this blank to use the location\'s historical daylight-saving rules. An entered offset always overrides the time zone, including after choosing another city. Clear it to restore automatic rules.</p>' +
      '</details>' +
      '<div class="drawrow" style="margin-top:12px">' +
        '<button class="btn" data-act="chartCompute">Draw the chart</button>' +
        (b.date ? ' <button class="keep" data-act="chartForget">Forget my details</button>' : '') +
      '</div>';

    var body = '';
    if (chartError) body = '<p class="loadnote" id="chart-error" tabindex="-1" role="alert" style="margin-top:16px">' + esc(chartError) + '</p>';
    else if (chartResult) {
      var c = chartResult;
      var showAsp = !!FL.prefs.chartAspects;
      body =
        '<section id="chart-result" tabindex="-1" aria-label="Your calculated birth chart">' +
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
          '<div class="astrorow"><span class="k">Time rule</span> ' + (c.offsetOverride ? 'Manual UTC offset overrides the named zone' : esc(c.zone)) + '</div>' +
          '<div class="astrorow"><span class="k">Offset used</span> UTC' + (c.usedOffset >= 0 ? '+' : '') + c.usedOffset + '</div>' +
          '<div class="astrorow"><span class="k">Instant</span> ' + esc(c.utc.toISOString()) + '</div>' +
          '<div class="astrorow"><span class="k">Coordinates</span> ' + c.lat.toFixed(3) + ', ' + c.lon.toFixed(3) + '</div>' +
          '<div class="astrorow"><span class="k">Sidereal time</span> ' + c.lst.toFixed(4) + 'h</div>' +
          '<div class="astrorow"><span class="k">Sect</span> ' + esc(c.sect) + ' chart</div>' +
        '</div>' +
        '<p class="mintro" style="margin-top:22px">The rising degree and houses depend strongly on the recorded birth time. A rough time produces a rough chart. Historical time-zone coverage before 1970 can also be incomplete. The Midheaven is a separate angle and does not always fall in the tenth house with Whole Sign or Equal houses.</p></section>';
    }

    return '<a class="keep" style="margin-bottom:20px" href="#/astro">Return to Astrology</a>' +
      '<div class="kick">Computed on this device</div><h1>Your chart</h1>' +
      '<p class="note">Your birth details are kept in this browser profile and included in your own exported backup. The astronomical positions are calculated here; the meanings belong to astrology as a reflective tradition, not a scientific personality test or prediction.</p>' +
      (typeof astroNav === 'function' ? astroNav('chart') : '') + form + body;
  },

  after: function () {
    if ((!window.Astronomy || typeof FL_CITIES === 'undefined') && !chartLoadError) {
      chartEnsureLoaded().then(function () {
        if (flRoute.view === 'chart') render();
      }).catch(function () {
        chartLoadError = true;
        if (flRoute.view === 'chart') render();
      });
    }
  }
};

/* The ephemeris and city list execute on demand. The worker also precaches both,
   so visiting Astrology before first worker control cannot leave it broken offline. */
var chartLoading = null;
function chartEnsureLoaded() {
  if (window.Astronomy && typeof FL_CITIES !== 'undefined') return Promise.resolve();
  if (chartLoading) return chartLoading;
  var load = function (src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      var timer = setTimeout(function () { s.remove(); rej(new Error(src)); }, 20000);
      s.onload = function () { clearTimeout(timer); res(); };
      s.onerror = function () { clearTimeout(timer); s.remove(); rej(new Error(src)); };
      document.head.appendChild(s);
    });
  };
  chartLoading = Promise.all([
    window.Astronomy ? Promise.resolve() : load('js/vendor/astronomy.js?v=' + FL_TEXT_V),
    typeof FL_CITIES !== 'undefined' ? Promise.resolve() : load('js/data-cities.js?v=' + FL_TEXT_V)
  ]).catch(function (e) { chartLoading = null; throw e; });
  return chartLoading;
}

/* The city field needs an input listener; the delegated click handler cannot see it. */
document.addEventListener('input', function (e) {
  var el = e.target;
  if (!el || !el.getAttribute) return;
  var act = el.getAttribute('data-input');
  if (act && FL_ACTS[act]) FL_ACTS[act](el, e);
});
document.addEventListener('change', function (e) {
  if (e.target && e.target.getAttribute && e.target.getAttribute('data-input') === 'chartDraft') FL_ACTS.chartDraft();
});
