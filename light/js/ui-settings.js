/* First Light: Settings.

   Three jobs: let the reader see and correct what the app believes about their sky,
   choose how the palette behaves, and get their record out of the device. The last
   one matters most: localStorage is per-origin and does not survive a new phone, a
   cleared cache, or a change of hosting. A year of mornings has to be portable. */

FL_ACTS.setDayEnd = function (el) {
  var v = Number(el.value) || 0;
  FL.prefs.dayEnd = v;
  flSave(true);
  /* the day the reader is living under the NEW clock gets marked now:
     without this the streak shows a hole until the next app-open */
  if (flRoute.view !== 'lineup') flMarkDay();
  render();
  toast(v ? 'Your day now ends at ' + v + 'am: a night that runs past midnight still counts as tonight.'
          : 'Your day ends at midnight.');
};

FL_ACTS.setWeekAnchor = function (el) {
  FL.prefs.weekAnchor = Number(el.value) || 0;
  flSave(true);
  render();
  toast('The practice week now starts on your rest day.');
};

FL_ACTS.setTrack = function (el) {
  var t = flTrackById(el.value);
  /* Refuse a track that is not finished rather than stranding the reader on a day
     with no quotation: dayEntry() treats a missing day as a loud data bug. The
     select only offers complete tracks, so this is a guard against a stale value,
     not against the UI. */
  if (!t || !flTrackComplete(t)) { render(); return; }
  FL.prefs.track = t.id;
  flSave(true);
  render();
  toast('Now reading ' + t.label + '. Your kept voices are held per track, so the ones you saved are still where you left them.');
};

FL_ACTS.setCanonLines = function (el) {
  FL.prefs.canonLines = el.value === 'on' ? 'on' : 'off';
  flSave(true);
  render();
  toast(el.value === 'on'
    ? 'Today’s readings will appear on the morning page.'
    : 'The readings stay behind the Library’s own door.');
};

FL_ACTS.setTheme = function (el) {
  FL.prefs.theme = el.value;
  flSave(true);
  sunApply();
  render();
};

FL_ACTS.useLocation = function () {
  sunAskLocation().then(function () {
    toast('Location set. Sunrise and sunset are now yours.');
    render();
  }).catch(function (err) {
    toast(err && err.code === 1
      ? 'Location permission was declined: the app will keep estimating from your time zone.'
      : 'Could not read a location just now.');
  });
};

FL_ACTS.clearLocation = function () {
  delete FL.prefs.lat; delete FL.prefs.lon;
  flSave(true); sunApply(); render();
  toast('Back to estimating from your time zone.');
};

function flDownloadRecord(json, name) {
  var blob = new Blob([json], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  /* Revoke late: Safari has been known to cancel the download if the URL dies
     before it has finished reading the blob. */
  setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
  announce('Record exported.');
}

/* An installed iPhone app does not reliably honour a[download] on a blob URL,
   and this is the only way a year of writing leaves the device. When the app is
   running installed and the share sheet can take a file, the sheet goes first;
   a dismissed sheet is not an error, and anything else falls through to the
   download. "Copy the record" beside it is the path of last resort. */
function flInstalled() {
  try {
    return navigator.standalone === true ||
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  } catch (e) { return false; }
}

FL_ACTS.exportRecord = function () {
  var json = flExport(), name = flExportFilename();
  try {
    if (flInstalled() && navigator.share && navigator.canShare && typeof File === 'function') {
      var file = new File([json], name, { type: 'application/json' });
      if (navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: name })
          .then(function () { announce('Record shared.'); })
          .catch(function (err) { if (!err || err.name !== 'AbortError') flDownloadRecord(json, name); });
        return;
      }
    }
  } catch (e) {}
  flDownloadRecord(json, name);
};

FL_ACTS.copyRecord = function () {
  var json = flExport();
  var done = function () { toast('The record is on the clipboard. Paste it into a note or a message you can open on your next phone, and import it there.', 9000); };
  var fail = function () { toast('The clipboard could not be reached. Export instead.'); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(done, fail);
  else fail();
};

FL_ACTS.importRecord = function () {
  var input = document.getElementById('fl-import');
  if (input) input.click();
};

FL_ACTS.importChosen = function (el) {
  var file = el.files && el.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function () {
    try {
      var added = flImport(String(reader.result));
      var bits = [];
      if (added.days) bits.push(added.days + ' mornings');
      if (added.kept) bits.push(added.kept + ' kept voices');
      if (added.journal) bits.push(added.journal + ' journal entries');
      if (added.checks) bits.push(added.checks + ' goals');
      toast(bits.length ? 'Merged in ' + bits.join(', ') + '.' : 'That record held nothing new: everything in it was already here.');
      render();
    } catch (err) {
      toast('That file could not be read as a First Light record.');
      console.warn(err);
    }
  };
  reader.readAsText(file);
  el.value = '';   // so choosing the same file twice still fires
};

/* Which months have been through the citation audit.

   THE AUDIT IS OF THE PHILOSOPHERS TRACK, and the line says so, because a second
   366 now exists. A reader standing on another track must not read "January ·
   February · March" as a statement about the corpus in front of them.

   Deliberately an explicit list, not derived from the data. The obvious derivation,
   "a month is audited when its entries carry work references", is wrong and
   flattering: February onward already arrived from the artifact with references like
   "Confucius, Analects 12.22", and that heuristic reports every month as partly done
   when only January has actually been checked. Carrying a citation and having had
   one verified are different things, and this app should not blur them.

   Update this when a month is finished, alongside SOURCES.md. */
var AUDITED_MONTHS = [1, 2, 3];
var AUDIT_PARTIAL = {};   // month -> "23 of 31", while a month is mid-audit

function auditedMonths() {
  if (!AUDITED_MONTHS.length && !Object.keys(AUDIT_PARTIAL).length) return 'not yet begun';
  var out = AUDITED_MONTHS.map(function (m) {
    return MONTHS[m - 1][0] + (AUDIT_PARTIAL[m] ? ' (' + AUDIT_PARTIAL[m] + ')' : '');
  });
  return out.join(' · ') + ', of twelve, on the Philosophers track';
}

/* The track picker.

   Only finished tracks are offered, flTracksOffered() filters on all 366 days
   being present, but an unfinished one is NAMED with its day count rather than
   hidden, because a reader who can see the shelf being built is better served than
   one who cannot tell whether it exists. When only one track is finished there is
   nothing to choose, so the card explains rather than showing a select with a
   single option in it. */
function trackCard() {
  var offered = flTracksOffered();
  var active = flActiveTrack();
  var coming = FL_TRACKS.filter(function (t) { return !flTrackComplete(t); });

  var pending = coming.map(function (t) {
    return '<p class="vidnote" style="margin-top:10px">' + esc(t.label) + ' is being written, ' +
      flTrackDays(t) + ' of 366 days so far. It is offered here once the year is complete.</p>';
  }).join('');

  if (offered.length < 2) {
    return '<div class="card">' +
      '<p class="px">You are reading <strong>' + esc(active.label) + '</strong>. ' + esc(active.blurb) + '</p>' +
      pending + '</div>';
  }

  var opts = offered.map(function (t) {
    return '<option value="' + esc(t.id) + '"' + (t.id === active.id ? ' selected' : '') + '>' +
      esc(t.label) + '</option>';
  }).join('');

  return '<div class="card">' +
    '<p class="px" style="margin-bottom:10px">Two years of voices, one per day, on the same twelve monthly ' +
    'themes, so switching lands you on the same subject rather than the same sentence. What you keep is ' +
    'held separately for each, and nothing you saved is lost by moving between them.</p>' +
    '<select class="sel" data-change="setTrack" aria-label="Which year you are reading">' + opts + '</select>' +
    '<p class="vidnote" style="margin-top:10px">' + esc(active.blurb) + '</p>' +
    pending + '</div>';
}

FL_VIEWS.settings = {
  label: 'Settings',
  title: 'Settings',
  render: function () {
    var sky = sunDescribe();
    var theme = FL.prefs.theme || 'auto';
    var opt = function (v, t) {
      return '<option value="' + v + '"' + (theme === v ? ' selected' : '') + '>' + t + '</option>';
    };

    var located = sky.exact
      ? '<p class="px">Using your location: ' + sky.lat.toFixed(2) + '°, ' + sky.lon.toFixed(2) + '°.</p>' +
        '<button class="keep" data-act="clearLocation">Forget it</button>'
      : '<p class="px">Estimating from your time zone: longitude about ' + sky.lon.toFixed(0) + '°, ' +
        'latitude assumed 40°. Good enough to know whether it is dark; not exact.</p>' +
        '<button class="keep" data-act="useLocation">Use my location</button>';

    var times = sky.polar
      ? '<p class="px" style="color:var(--faint)">At your latitude the sun does not rise or set today. ' +
        'The palette follows the sun’s height instead, which still works.</p>'
      : '<div class="astrorow"><span class="k">First light</span> ' + esc(sky.dawn) +
        '</div><div class="astrorow"><span class="k">Sunrise</span> ' + esc(sky.sunrise) +
        '</div><div class="astrorow"><span class="k">Sunset</span> ' + esc(sky.sunset) +
        '</div><div class="astrorow"><span class="k">Last light</span> ' + esc(sky.dusk) + '</div>';

    var totalKept = Object.keys(FL.kept).length;
    var totalChecks = Object.keys(FL.checks).length;

    return '' +
      '<div class="kick">The workings</div><h1>Settings</h1>' +

      '<div class="label">Light</div>' +
      '<div class="card">' +
        '<p class="px" style="margin-bottom:10px">The app follows your sky by default: night before first light, ' +
        'warm through sunrise, plain by day, cooler at dusk. You can hold it at one instead.</p>' +
        '<select class="sel" data-change="setTheme" aria-label="Palette">' +
          opt('auto', 'Follow the sun') + opt('firstlight', 'Always first light') +
          opt('day', 'Always day') + opt('dusk', 'Always dusk') + opt('night', 'Always night') +
        '</select>' +
        '<div class="astrorow" style="margin-top:12px"><span class="k">Right now</span> ' +
          esc(sky.phase) + ' · ' + esc(sky.season) + '</div>' +
        times +
      '</div>' +

      '<div class="label">Where you are</div>' +
      '<div class="card">' + located +
        '<p class="vidnote" style="margin-top:10px">Used only on this device, only to compute the hour of the sun. ' +
        'It never leaves this device; if you are signed in, only a count of mornings and your streak is recorded.</p>' +
      '</div>' +

      '<div class="label">Your record</div>' +
      '<div class="card">' +
        '<div class="astrorow"><span class="k">Mornings</span> ' + FL.days.length + '</div>' +
        '<div class="astrorow"><span class="k">Current streak</span> ' + flStreak() + '</div>' +
        '<div class="astrorow"><span class="k">Longest streak</span> ' + flLongestStreak() + '</div>' +
        '<div class="astrorow"><span class="k">Kept voices</span> ' + totalKept + '</div>' +
        '<div class="astrorow"><span class="k">Goals checked</span> ' + totalChecks + '</div>' +
        '<p class="px" style="margin:14px 0 10px;color:var(--faint)">Your words never leave this device; if you are signed in, a count of mornings and your streak is recorded. ' +
        'Anyone who taps your name on this device can read this room, so use your own phone for what is yours alone. ' +
        'Export before you change phones, clear your browser, or do anything you might regret.</p>' +
        '<button class="btn" data-act="exportRecord">Export</button> ' +
        '<button class="keep" data-act="importRecord">Import a backup</button> ' +
        '<button class="keep" data-act="copyRecord">Copy the record</button>' +
        '<input type="file" id="fl-import" accept="application/json,.json" class="sr-only" data-change="importChosen">' +
        '<p class="vidnote" style="margin-top:10px">Importing merges: it adds what is missing and never deletes what is here.</p>' +
      '</div>' +

      '<div class="label">The shape of your day</div>' +
      '<div class="card">' +
        '<p class="px" style="margin-bottom:10px">If you close late, midnight is a fiction. Set the hour your ' +
        'day actually ends and everything follows: the 2am examen lands on the night it examines, the streak ' +
        'counts lived days, and the morning voice waits for your morning.</p>' +
        '<select class="sel" data-change="setDayEnd" aria-label="When your day ends">' +
          [[0,'Midnight: the civil day'],[2,'2am'],[3,'3am'],[4,'4am'],[5,'5am'],[6,'6am']].map(function (o) {
            return '<option value="' + o[0] + '"' + ((Number(FL.prefs.dayEnd) || 0) === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
          }).join('') +
        '</select>' +
        '<p class="px" style="margin:14px 0 10px">The week’s practices rotate through seven movements. ' +
        'Name your own rest day and the cycle starts there: the heavier practices land where you have room for them.</p>' +
        '<select class="sel" data-change="setWeekAnchor" aria-label="Which day starts your week">' +
          ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map(function (n, i) {
            return '<option value="' + i + '"' + ((Number(FL.prefs.weekAnchor) || 0) === i ? ' selected' : '') + '>' + n + (i === 0 ? ', as written' : '') + '</option>';
          }).join('') +
        '</select>' +
      '</div>' +

      '<div class="label">The Library on your morning page</div>' +
      '<div class="card">' +
        '<p class="px" style="margin-bottom:10px">First Light includes a religious Library: scripture and ' +
        'reading plans across seven traditions. It has its own tab either way, and says nothing on your ' +
        'morning page unless you ask it to; this only decides whether today’s readings join the morning ' +
        'and your searches.</p>' +
        '<select class="sel" data-change="setCanonLines" aria-label="Readings on the morning page">' +
          '<option value="off"' + (FL.prefs.canonLines === 'on' ? '' : ' selected') + '>Keep them behind their own door</option>' +
          '<option value="on"' + (FL.prefs.canonLines === 'on' ? ' selected' : '') + '>Show today’s readings</option>' +
        '</select>' +
      '</div>' +

      '<div class="label">Which year you are reading</div>' +
      trackCard() +

      '<div class="label">Where the words come from</div>' +
      '<div class="card">' +
        '<p class="px">Every quotation in the year is being checked against primary texts. ' +
        'Where a line turns out not to belong to the author whose name it carried, the line stays ' +
        'and a note underneath says so: a much-loved sentence is not worth less for having the ' +
        'wrong byline, but the byline should not be wrong.</p>' +
        '<div class="astrorow" style="margin-top:12px"><span class="k">Audited so far</span> ' +
          esc(auditedMonths()) + '</div>' +
        (flActiveTrack().id === 'makers'
          ? '<p class="vidnote" style="margin-top:10px">Every line in The Makers was verified against its source before it entered the year.</p>'
          : '') +
        '<p class="vidnote" style="margin-top:10px">The full record of what was checked and what ' +
        'changed is in SOURCES.md in the repository.</p>' +
      '</div>' +

      '<div class="label">For the whole crew</div>' +
      '<div class="card">' +
        '<p class="px" style="margin-bottom:8px">The Line-Up is a pre-shift minute for a shared screen: ' +
        'today’s voice in large type and one steadying breath, run from the bar iPad before doors. ' +
        'It keeps no record and needs no login; what it shares is words.</p>' +
        '<a class="keep" href="#/lineup" style="text-decoration:none">Open the Line-Up</a>' +
      '</div>' +

      '<p class="px" style="margin-top:26px;text-align:center;color:var(--faint)">' +
        '<a class="readmini" href="#/clear">For anyone thinking about their drinking: a room of its own.</a></p>' +

      '<p class="mintro" style="margin-top:16px">Your words never leave this device; if you are signed in, a count of mornings and your streak is recorded.</p>';
  }
};
