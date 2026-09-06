/* First Light: persistence.

   The artifact this app was rebuilt from wrote every kept quote, every checked
   goal, and the morning count through `window.storage.get/set`: the claude.ai
   artifact API. In an ordinary browser that object does not exist, the call threw,
   and the catch quietly parked the value in a plain object that died on refresh.
   Nothing the reader did was ever saved, and nothing ever said so.

   So: localStorage is the real home, one versioned key, one JSON blob. Every
   access is wrapped, and a write that genuinely fails raises an event instead of
   returning as if it had worked.

   SCHEMA RULE: additive only. Never rename or repurpose a field. Readers have a
   year of mornings in here and a rename silently orphans all of it. To change a
   meaning, add a new field and migrate in bootMigrate(). */

/* One record per person. Read the same way OOT.profiles.key() reads it, but
   without depending on the shared script: this wing's offline shell must open
   with or without shared/, and a missing script must never silently merge two
   people's journals into one blob. The first profile on a device is 'legacy'
   or 'adopted' and keeps the bare key, so a year of mornings written before
   anyone typed a name is inherited rather than orphaned. */
var FL_KEY_BASE = 'firstlight-v1';
function flProfileKey(base) {
  try {
    /* The plain key, always. The fallback under this used to parse the
       roster itself, which meant that on an offline load with a stale shell
       First Light could still be namespacing while every other wing read
       plainly, and two people's mornings would land in one blob. A fallback
       that can disagree with the shared layer is worse than none. */
    if (window.OOT && OOT.profiles && typeof OOT.profiles.key === 'function') {
      return OOT.profiles.key(base);
    }
    var raw = localStorage.getItem('oot-profiles-v1');
    if (!raw) return base;
    var d = JSON.parse(raw);
    if (!d || !d.current || !Array.isArray(d.list)) return base;
    var p = null;
    for (var i = 0; i < d.list.length; i++) if (d.list[i].id === d.current) p = d.list[i];
    if (!p || p.legacy) return base;
    return base + '::' + p.id;
  } catch (e) { return base; }
}
var FL_KEY = flProfileKey(FL_KEY_BASE);

/* The whole of the reader's record. Every field defaults to empty, so a missing
   key from an older version is indistinguishable from a fresh install, which is
   what makes additive migration safe. */
var FL = {
  v: 1,
  kept: {},          // "<track>:<m>-<d>"  -> 1        voices kept to the Vault
  byheart: {},       // "<track>:<m>-<d>"  -> 1|2      1 turning over, 2 by heart (absent = new)
  clear: {},         // "YYYY-MM-DD"       -> 1        clear mornings; counted, never chained
  sessions: {},      // "YYYY-MM-DD"       -> n        finished timed sequences (never the Walk-In)
  checks: {},        // "g-<tier>-<goal>"  -> 1        the goal ladder
  days: [],          // ["YYYY-MM-DD"]                 mornings observed, ascending
  practice: {},      // "YYYY-MM-DD"       -> 1        the day's practice marked done
  intents: {},       // "YYYY-MM-DD"       -> "Grief"  a named need, when one was named
  journal: {},       // id -> {d, ref, text, t}        writing; ref ties it to a day/quote/passage
  examen: {},        // "YYYY-MM-DD"       -> {well, short, tomorrow}
  canon: {},         // canonId -> {start:"YYYY-MM-DD", done:{<doy>:1}}
  prefs: {}          // theme, track, house system, coordinates, and so on
};

/* --- date keys ---
   Always local, never UTC. `toISOString()` is the obvious way to build these and
   it is wrong: east of Greenwich it rolls the date over before local midnight, so
   a 9pm entry lands on tomorrow and breaks the streak walk. */
function flDateKey(dt) {
  dt = dt || new Date();
  /* The shift clock. A bartender's Tuesday ends when they get home at 2am,
     not at midnight: with prefs.dayEnd set (2–6), any moment before that
     hour belongs to the previous calendar day. The examen written after
     close lands on the day it examines, and the streak counts lived days.
     Default 0 keeps civil midnight, so nothing changes until chosen. */
  var edge = Number(FL.prefs.dayEnd) || 0;
  if (edge) dt = new Date(dt.getTime() - edge * 3600000);
  return dt.getFullYear() + '-' +
         String(dt.getMonth() + 1).padStart(2, '0') + '-' +
         String(dt.getDate()).padStart(2, '0');
}
function flToday() { return flDateKey(new Date()); }
/* The same shift applied to a Date: for views that need the day's month,
   date, or weekday to agree with the record's idea of "today". */
function flShiftedNow() {
  var edge = Number(FL.prefs.dayEnd) || 0;
  return edge ? new Date(Date.now() - edge * 3600000) : new Date();
}

/* --- the raw store ---
   localStorage only. Reads and writes are separately guarded: a private-mode
   browser can permit reads and refuse writes, and we want to know which failed. */
var flMem = {};   // last-resort tier, so the session still works when storage is denied
var flStorageBroken = false;

function flRawGet(k) {
  try {
    var v = localStorage.getItem(k);
    if (v !== null) return v;
  } catch (e) { /* private mode, or storage disabled by policy */ }
  return Object.prototype.hasOwnProperty.call(flMem, k) ? flMem[k] : null;
}

function flRawSet(k, v) {
  try {
    localStorage.setItem(k, v);
    if (flStorageBroken) { flStorageBroken = false; flNotifyStorage('ok'); }
    return true;
  } catch (e) {
    /* Quota exceeded, or writes denied. The CalendarForLife lesson: never let this
       return silently: the reader is owed the truth that their words are only in
       memory for this session. */
    flMem[k] = v;
    if (!flStorageBroken) {
      flStorageBroken = true;
      flNotifyStorage('fail', e);
    }
    return false;
  }
}

function flNotifyStorage(state, err) {
  try {
    window.dispatchEvent(new CustomEvent('fl:storage', {
      detail: { state: state, error: err ? (err.name || String(err)) : null }
    }));
  } catch (e) { /* very old browser; the console line below still lands */ }
  if (state === 'fail') {
    console.warn('First Light: writes are failing; this session will not be saved.', err);
  }
}

/* --- save ---
   Debounced. Typing in the journal fires on every keystroke and re-serialising the
   whole record each time is wasteful, but the delay must be short enough that a
   reader who closes the tab mid-sentence keeps the sentence. */
var flSaveTimer = null;
function flSave(immediate) {
  if (flSaveTimer) { clearTimeout(flSaveTimer); flSaveTimer = null; }
  if (immediate) return flWriteNow();
  flSaveTimer = setTimeout(flWriteNow, 400);
  return true;
}
function flWriteNow() {
  flSaveTimer = null;
  /* under a corrupt-blob hold, the original IS the record: nothing this
     session produces may replace it */
  if (flHoldSaves) return false;
  try {
    return flRawSet(FL_KEY, JSON.stringify(FL));
  } catch (e) {
    flNotifyStorage('fail', e);
    return false;
  }
}
/* A tab being hidden or closed is the last chance to flush a pending debounce.
   'pagehide' fires where 'unload' is unreliable, and visibilitychange covers the
   phone-goes-to-sleep case, which on mobile is how most sessions actually end. */
window.addEventListener('pagehide', function () { if (flSaveTimer) flWriteNow(); });
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden' && flSaveTimer) flWriteNow();
});

/* --- streak ---
   Recovered from first-light.jsx, which had this right. The HTML rewrite replaced
   it with `days.length`, a count of distinct days ever opened, displayed as
   "Morning N of your record". That number never falls, so it measured nothing.
   A streak is consecutive days ending today or yesterday; walk backwards. */
function flStreak(days) {
  var set = {}, i;
  days = days || FL.days;
  for (i = 0; i < days.length; i++) set[days[i]] = 1;

  var cursor = new Date();
  /* Grace: at 6am on a day not yet observed the streak is still alive; it ends
     only once a full day has been missed. Without this the number reads zero every
     morning until the reader opens the app, which is exactly when they see it. */
  if (!set[flDateKey(cursor)]) cursor.setDate(cursor.getDate() - 1);

  var n = 0;
  while (set[flDateKey(cursor)]) { n++; cursor.setDate(cursor.getDate() - 1); }
  return n;
}

/* Formats a Date WITHOUT the dayEnd shift. flDateKey is for real clock
   moments only; a Date rebuilt from a stored key already carries the shift,
   and running it through flDateKey again subtracted the hours twice,
   which pinned the longest streak at 1 for every night worker. */
function flCivilKey(dt) {
  return dt.getFullYear() + '-' +
         String(dt.getMonth() + 1).padStart(2, '0') + '-' +
         String(dt.getDate()).padStart(2, '0');
}

function flLongestStreak(days) {
  days = (days || FL.days).slice().sort();
  var best = 0, run = 0, prev = null, i;
  for (i = 0; i < days.length; i++) {
    if (prev) {
      var d = new Date(prev + 'T00:00:00');
      d.setDate(d.getDate() + 1);
      run = (flCivilKey(d) === days[i]) ? run + 1 : 1;
    } else run = 1;
    if (run > best) best = run;
    prev = days[i];
  }
  return best;
}

/* Record that today was observed. Idempotent: safe to call on every render. */
function flMarkDay() {
  var k = flToday();
  if (FL.days.indexOf(k) === -1) { FL.days.push(k); FL.days.sort(); flSave(); return true; }
  return false;
}

/* --- boot ---
   Load, then migrate. Both steps must survive a corrupted blob: a reader whose
   localStorage was mangled by another tool should get an empty app, not a white
   screen. */
var flHoldSaves = false;   /* set when a corrupt blob could not be parked durably */

function flBoot() {
  var raw = flRawGet(FL_KEY), loaded = null;
  if (raw) {
    try { loaded = JSON.parse(raw); }
    catch (e) {
      console.warn('First Light: saved record was unreadable; keeping a copy aside.', e);
      /* Deterministic aside key: repeated boots under a hold must not mint a
         fresh copy each time. Only when the copy has landed DURABLY may this
         session ever write FL_KEY again; otherwise the first save would
         destroy the only copy of whatever the blob still holds. */
      var asideKey = FL_KEY + '-corrupt';
      var kept = false;
      try {
        kept = flRawGet(asideKey) !== null || flRawSet(asideKey, raw);
        try { kept = kept && localStorage.getItem(asideKey) !== null; } catch (e3) { kept = false; }
      } catch (e2) { kept = false; }
      if (!kept) {
        flHoldSaves = true;
        console.error('First Light: the unreadable record could not be copied aside, refusing to overwrite it this session.');
        flNotifyStorage('fail', e);
      }
    }
  }
  if (loaded && typeof loaded === 'object') flAdopt(loaded);
  flBootMigrate();
  return FL;
}

/* Merge a loaded blob over the defaults rather than replacing FL wholesale, so a
   record written by an older version simply lacks the newer keys instead of
   deleting them. This is the mechanism that makes the additive rule work. */
function flAdopt(obj) {
  Object.keys(FL).forEach(function (k) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) return;
    var incoming = obj[k];
    if (Array.isArray(FL[k])) { if (Array.isArray(incoming)) FL[k] = incoming; }
    else if (FL[k] && typeof FL[k] === 'object') {
      if (incoming && typeof incoming === 'object') FL[k] = incoming;
    } else FL[k] = incoming;
  });
  /* Carry forward any key this version doesn't know about. A reader who used a
     newer build and then loaded an older one would otherwise lose that data on the
     next save. */
  Object.keys(obj).forEach(function (k) {
    if (!Object.prototype.hasOwnProperty.call(FL, k)) FL[k] = obj[k];
  });
}

/* Idempotent. Runs every boot; must be safe to run twice. */
function flBootMigrate() {
  /* The canon-lines choice arrived after some readers had already begun a
     reading plan. Starting a plan IS the answer to the question the first-run
     screen now asks, so those records are grandfathered to 'on' rather than
     having their readings silently vanish. Everyone else stays unanswered
     (treated as off) until they choose. */
  if (FL.prefs.canonLines === undefined && FL.canon) {
    var started = Object.keys(FL.canon).some(function (k) { return FL.canon[k] && FL.canon[k].start; });
    if (started) FL.prefs.canonLines = 'on';
  }
  var changed = false;

  /* The artifact's three keys. On the small chance a reader used it somewhere
     `window.storage` did resolve, or in a build where these reached localStorage,
     their vault is still on the device under the old names. Take it once. */
  if (!FL.prefs.migratedFl2) {
    changed = flAdoptLegacy('fl2:kept', function (v) {
      Object.keys(v).forEach(function (k) {
        /* Old keys were "<m>-<d>"; the track prefix arrives with the second year. */
        if (!FL.kept['philosophers:' + k]) FL.kept['philosophers:' + k] = 1;
      });
    }) || changed;
    changed = flAdoptLegacy('fl2:checks', function (v) {
      Object.keys(v).forEach(function (k) { if (!FL.checks[k]) FL.checks[k] = 1; });
    }) || changed;
    changed = flAdoptLegacy('fl2:days', function (v) {
      if (!Array.isArray(v)) return;
      v.forEach(function (d) {
        /* Stored as "YYYY-M-D" without padding; normalise or the streak walk,
           which builds padded keys, will never match any of them. */
        var p = String(d).split('-');
        if (p.length !== 3) return;
        var k = p[0] + '-' + String(+p[1]).padStart(2, '0') + '-' + String(+p[2]).padStart(2, '0');
        if (FL.days.indexOf(k) === -1) FL.days.push(k);
      });
      FL.days.sort();
    }) || changed;
    FL.prefs.migratedFl2 = 1;
    changed = true;
  }

  /* theme and track are NOT written here: every consumer already defaults at
     read time, and a boot-written default made flImport's fill-if-undefined
     clause unable to restore a backup's chosen theme and track on a new
     device. An undefined pref is a pref the reader has not chosen yet. */
  if (FL.prefs.clearOpened !== undefined) { delete FL.prefs.clearOpened; changed = true; }

  if (changed) flSave(true);
  return changed;
}

function flAdoptLegacy(key, apply) {
  var raw = flRawGet(key);
  if (!raw) return false;
  try { apply(JSON.parse(raw)); return true; }
  catch (e) { return false; }
}

/* --- export / import ---
   localStorage is per-origin and does not survive a move to a new phone, a cleared
   cache, or a change of hosting. A year of writing has to be portable or it isn't
   really the reader's. */
function flExport() {
  return JSON.stringify({
    app: 'First Light',
    schema: FL.v,
    exported: new Date().toISOString(),
    record: FL
  }, null, 2);
}

function flExportFilename() {
  return 'first-light-' + flToday() + '.json';
}

/* Merges rather than replaces, and never deletes. Importing a backup onto a device
   that has since accumulated new mornings should end with both, not whichever file
   was newer. Returns a summary so the UI can say what actually happened. */
function flImport(text) {
  var parsed = JSON.parse(text);
  var rec = (parsed && parsed.record) ? parsed.record : parsed;
  if (!rec || typeof rec !== 'object') throw new Error('That file is not a First Light record.');

  var added = { kept: 0, checks: 0, days: 0, journal: 0, examen: 0, practice: 0 };

  /* byheart merges keep-the-higher-band: two devices disagreeing about how
     well you know a line resolve toward the stronger claim: you can always
     step a band back by rehearsing. */
  if (rec.byheart) Object.keys(rec.byheart).forEach(function (k) {
    if ((rec.byheart[k] || 0) > (FL.byheart[k] || 0)) FL.byheart[k] = rec.byheart[k];
  });
  /* sessions merge toward the larger count per day: two devices cannot
     double-bill a morning, and neither can erase the other's */
  if (rec.sessions) Object.keys(rec.sessions).forEach(function (k) {
    if ((rec.sessions[k] || 0) > (FL.sessions[k] || 0)) FL.sessions[k] = rec.sessions[k];
  });

  ['kept', 'checks', 'practice', 'intents', 'clear'].forEach(function (bucket) {
    if (!rec[bucket]) return;
    Object.keys(rec[bucket]).forEach(function (k) {
      if (!FL[bucket][k]) { FL[bucket][k] = rec[bucket][k]; if (added[bucket] !== undefined) added[bucket]++; }
    });
  });

  if (Array.isArray(rec.days)) rec.days.forEach(function (d) {
    if (FL.days.indexOf(d) === -1) { FL.days.push(d); added.days++; }
  });
  FL.days.sort();

  /* Journal and examen entries are the irreplaceable part. On a collision keep the
     longer text: a truncated entry is the likelier accident, and losing sentences
     someone wrote is the one failure this app must never commit. */
  if (rec.journal) Object.keys(rec.journal).forEach(function (id) {
    var mine = FL.journal[id], theirs = rec.journal[id];
    if (!mine) { FL.journal[id] = theirs; added.journal++; }
    else if (theirs && String(theirs.text || '').length > String(mine.text || '').length) {
      FL.journal[id] = theirs;
    }
  });
  if (rec.examen) Object.keys(rec.examen).forEach(function (d) {
    if (!FL.examen[d]) { FL.examen[d] = rec.examen[d]; added.examen++; }
  });

  if (rec.canon) Object.keys(rec.canon).forEach(function (id) {
    var mine = FL.canon[id] || (FL.canon[id] = { start: null, done: {} });
    var theirs = rec.canon[id] || {};
    if (theirs.start && (!mine.start || theirs.start < mine.start)) mine.start = theirs.start;
    if (theirs.done) Object.keys(theirs.done).forEach(function (d) { mine.done[d] = 1; });
  });

  if (rec.prefs) Object.keys(rec.prefs).forEach(function (k) {
    if (k === 'clearOpened') return;   /* a scrubbed trace never rides back in */
    if (FL.prefs[k] === undefined) FL.prefs[k] = rec.prefs[k];
  });

  /* the additive promise held on boot (flAdopt carries unknown keys) but not
     on import: a backup from a newer build lost its new buckets here */
  var trusted = (parsed && parsed.app === 'First Light') || (rec && rec.v !== undefined);
  if (trusted) Object.keys(rec).forEach(function (k) {
    if (!Object.prototype.hasOwnProperty.call(FL, k)) FL[k] = rec[k];
  });

  flSave(true);
  return added;
}
