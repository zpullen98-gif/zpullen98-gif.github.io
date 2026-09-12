/* ============ Outside Of Time: one record per device ============
   THIS IS THE PERSONAL EDITION. Nothing asks who is studying, nothing offers
   to send a record, and every wing keeps ONE record on the device it is on.
   The owner asked for that in one sentence: a personal app, at their own pace
   and progression.

   Everything the roster ever knew is still here, in this file and on the
   device. PERSONAL below is the whole of the change: it makes four functions
   answer personally and leaves the rest of the file exactly as it was, so the
   manager mode the owner wants back in about a year is one flag away rather
   than an archaeology exercise. The restore checklist is at the foot of this
   comment. Nothing is deleted, here or on anybody's device.

   THE FILE ITSELF MUST NOT BE DELETED, whatever else happens. Four wing
   service workers precache shared/oot-profiles.js by name, and cache.addAll
   rejects atomically on a single 404, so removing it would fail the install
   handler and take the whole offline app down for every wing.

   What it used to be, and will be again: a venue buys one subscription and
   its staff share one sign-in, so the product could not tell two people
   apart. A device kept a short list of names, whoever was about to study
   tapped theirs, and every wing's storage key was namespaced to them from
   that moment on.

   WHAT THIS IS NOT. It is not authentication and it does not pretend to be.
   Anyone can tap any name, exactly as anyone can pick up anyone else's notebook.
   The UI says so rather than implying a security it does not have.

   WHY NAMESPACING RATHER THAN A REWRITE. Each wing already persists its own
   progress under its own key, with its own shape, its own migrations and its own
   export format. None of that has to change. A wing asks for its key through
   OOT.profiles.key() and gets a per-person one back; everything downstream is
   untouched. When real seats arrive, a profile becomes a member row and this
   file becomes the local half of a sync.

   Load order: this must come after oot-config.js (it wants window.OOT) and
   BEFORE any wing script that reads its own storage, or the wing will read the
   unnamespaced key once and cache it.
   ============ */

(function () {
  'use strict';

  var OOT = (window.OOT = window.OOT || {});
  if (OOT.profiles) return;                      // idempotent, like the rest of shared/

  /* THE ONE FLAG. True is the personal edition. Setting it false restores the
     roster whole: key() namespaces again for every wing including the almanac
     and the World Table, current() and list() answer again, isManagerDevice()
     alone brings back the Pass strip, the Open The Pass link, the Pass panels
     and the World Table's manager block, and the streak and the induction go
     back onto the profile.

     THE REST OF THE RESTORE, in the order it has to happen:
       1. PERSONAL = false here.
       2. shared/oot-home.js who() and bindWho(): delete the personal branch at
          the top of each. The row, the chips, the plus chip, Send my record
          and its note are all still underneath, byte for byte.
       3. shared/oot-pass.js: delete the two early returns in view() and
          settings().
       4. pass/index.html paint(): delete the personal branch.
       5. light/js/store.js flProfileKey and light/index.html's pre-paint
          block: both old bodies are kept verbatim in their own comments.
          almanac manifestOwnedByCurrent goes back to requiring an id.
       6. WorldTable src/lib/persistence/db.ts: KEY() reads OOT again (the old
          body is in its comment) and denameSession is gated off. Rebuild the
          wing and re-inject.

     THE ONE THING THAT DOES NOT REVERSE ITSELF: work done while personal
     landed on the plain keys and on oot-streak-v1. When PERSONAL goes false,
     the FIRST profile created on that device must be an adopt(), never an
     add(), so it inherits those plain keys. oot-home.js already does that
     when hasHistory() is true; do not replace it with add(). And a manager's
     numbers will show a hole for however long the personal edition ran,
     because the profile's own streak and lastSeen stopped moving. */
  var PERSONAL = true;

  var KEY = 'oot-profiles-v1';
  var STREAK_KEY = 'oot-streak-v1';    /* the device's own pace, see markStudied */
  var PERSONAL_FLAG = 'oot-personal-v1';
  /* A parked record carries one colon and never two, so the scan below can
     never mistake it for a person. */
  var PARK_PREFIX = 'kept:';
  var LEGACY_NAME = 'The bar';   // what pre-profile progress becomes, see adopt()

  /* ---- storage, defensively ------------------------------------------
     A kitchen iPad in private mode throws on write. Losing the roster is
     survivable; throwing during boot and taking the wing down with it is not. */
  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var d = JSON.parse(raw);
      if (!d || !Array.isArray(d.list)) return null;
      return d;
    } catch (e) { return null; }
  }

  function write(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); return true; }
    catch (e) { return false; }
  }

  var data = read() || { v: 1, list: [], current: null, manager: false, adopted: false };

  var listeners = [];
  function fire() {
    var p = current();
    listeners.slice().forEach(function (fn) {
      try { fn(p); } catch (e) {}
    });
  }

  function mint() {
    return 'p-' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
  }

  function clean(name) {
    return String(name == null ? '' : name).replace(/\s+/g, ' ').trim().slice(0, 32);
  }

  function find(id) {
    for (var i = 0; i < data.list.length; i++) if (data.list[i].id === id) return data.list[i];
    return null;
  }

  var pinned = null;   /* set when another tab switched and a reload is in flight */

  function current() {
    if (PERSONAL) return null;
    /* while a cross-tab reload is in flight, keep answering with the identity
       this document has been writing under all along */
    var id = pinned || data.current;
    return id ? find(id) : null;
  }

  /* ---- the roster ---------------------------------------------------- */
  function add(name) {
    var n = clean(name) || 'Someone';
    var p = { id: mint(), name: n, created: Date.now(), lastSeen: Date.now() };
    data.list.push(p);
    if (!data.current) data.current = p.id;
    write(data);
    fire();
    return p;
  }

  function switchTo(id) {
    if (!find(id) || data.current === id) return false;
    data.current = id;
    /* Persist immediately. touch() only writes about once an hour, so relying
       on it here meant the choice of person was lost on the next reload and
       the device silently reverted to whoever was picked before. */
    write(data);
    touch();
    fire();
    return true;
  }

  function rename(id, name) {
    var p = find(id);
    if (!p) return false;
    p.name = clean(name) || p.name;
    write(data);
    fire();
    return true;
  }

  /* Removing a profile deliberately leaves its namespaced data in place. The
     roster entry is cheap to recreate; a wiped study history is not, and the
     usual reason someone is removed is that they left, not that anyone wants
     their record destroyed. */
  function remove(id) {
    var before = data.list.length;
    data.list = data.list.filter(function (p) { return p.id !== id; });
    if (data.list.length === before) return false;
    if (data.current === id) data.current = data.list.length ? data.list[0].id : null;
    write(data);
    fire();
    return true;
  }

  function touch() {
    /* lastSeen is a roster field. With no roster there is nobody it describes. */
    if (PERSONAL) return;
    var p = current();
    if (!p) return;
    var now = Date.now();
    /* A write per keystroke is pointless; a write per hour is plenty to answer
       "was anyone on this today". */
    if (!p.lastSeen || now - p.lastSeen > 36e5) { p.lastSeen = now; write(data); }
    else { p.lastSeen = now; }
  }

  /* ---- the namespacing helper ---------------------------------------
     Returns the key a wing should actually use.

     Two cases return the BASE key unchanged, and both matter:
       nobody chosen  a venue that never creates a profile keeps working
                      exactly as it does today and loses nothing
       the adopted    the first profile on a device that already had progress
       profile        keeps reading the old keys, so months of study are not
                      orphaned the moment somebody types their name */
  function key(base) {
    /* The plain key, which is what every wing was written against before
       names existed and what they are all written against again. */
    if (PERSONAL) return base;
    var p = current();
    if (!p || p.legacy) return base;
    return base + '::' + p.id;
  }

  /* ---- adoption ------------------------------------------------------
     The first time a device creates a profile, whatever progress already exists
     under the unnamespaced keys belongs to somebody, and that somebody has been
     studying on this device for months. It is adopted rather than orphaned:
     the first profile simply keeps reading the old keys, because key() returns
     the base key for it.

     Implemented by marking the first profile 'legacy' and having key() skip
     the suffix for it. Idempotent: it can only ever happen once per device. */
  function adopt(name) {
    if (data.adopted) return current();
    var p = add(name || LEGACY_NAME);
    p.legacy = true;
    data.adopted = true;
    data.current = p.id;
    write(data);
    fire();
    return p;
  }

  /* ---- manager mode --------------------------------------------------
     A property of the DEVICE, not of a person: the tablet in the office is the
     manager's, the one on the pass is not. */
  /* Still stored, so a device that opted in stays opted in for the day the
     roster comes back; answered false meanwhile, which is what silences the
     Pass strip, the Pass panels and the World Table's manager block without
     one line changing in any of them. */
  function isManagerDevice() { return PERSONAL ? false : !!data.manager; }
  function setManagerDevice(on) {
    data.manager = !!on;
    write(data);
    fire();
    return data.manager;
  }

  /* ---- moving a record between devices --------------------------------
     Every wing already has its own export/import with its own merge rules. This
     does not replace them; it wraps a named person's slice of localStorage so a
     staff member can hand a manager one blob rather than three.

     THE BASES A RECORD MAY CARRY. Import writes only these, because a record
     is a file somebody was sent and localStorage is where this device keeps
     its credential ('sb-<ref>-auth-token') and its entitlement ('oot-*'). A
     key outside the list is skipped and reported, never written. Each value
     has to be a string the wing will accept on load: JSON for every store
     that is one, and a short level id for the Codex's codexLevel, which the
     Codex checks against its own LEVELS table before it applies it.

     The World Table's kitchen record is not here on purpose: it lives in
     IndexedDB and travels by the Table's own export on its My Menu page. Only
     its summary for The Pass (contract B) rides along. */
  var BASES = {
    'codexStats':             { wing: 'Codex' },
    'codexLevel':             { wing: 'Codex', token: true },
    'bartenders-ledger-v1':   { wing: 'Ledger' },
    'firstlight-v1':          { wing: 'First Light' },
    'cfl-bookmarks-v1':       { wing: 'Calendar' },
    'cfl-journals-v1':        { wing: 'Calendar' },
    'cfl-fnb-v1':             { wing: 'Calendar' },
    'cfl-manifest-v1':        { wing: 'Calendar' },
    'world-table-summary-v1': { wing: 'World Table' }
  };

  function validValue(base, v) {
    if (typeof v !== 'string') return false;
    if (BASES[base].token) return /^[a-z0-9_-]{1,32}$/i.test(v);
    try { JSON.parse(v); return true; } catch (e) { return false; }
  }

  /* Looks a record over without writing anything. Answers what the Pass needs
     to show before it asks the manager to confirm: the name, which wings the
     file carries, which keys it will ignore, and why it is refused if it is.
     Accepts the bare exportProfile() shape and the wrapped one that the
     "Send my record" chip produces (see oot-home.js sendRecord). */
  function validateRecord(blob) {
    if (typeof blob === 'string') { try { blob = JSON.parse(blob); } catch (e) { return { ok: false, reason: 'not JSON' }; } }
    if (!blob || typeof blob !== 'object') return { ok: false, reason: 'not a record' };
    var rec = (blob.record && typeof blob.record === 'object') ? blob.record : blob;
    if (rec.kind !== 'profile' || !rec.keys || typeof rec.keys !== 'object' || Array.isArray(rec.keys)) {
      return { ok: false, reason: 'not an Outside Of Time record' };
    }
    var name = clean((rec.profile && rec.profile.name) || (blob.profile && blob.profile.name));
    if (!name) return { ok: false, reason: 'the record carries no name' };
    var keys = {}, wings = [], skipped = [], bad = [];
    Object.keys(rec.keys).forEach(function (base) {
      if (!Object.prototype.hasOwnProperty.call(BASES, base)) { skipped.push(base); return; }
      if (!validValue(base, rec.keys[base])) { bad.push(base); return; }
      keys[base] = rec.keys[base];
      if (wings.indexOf(BASES[base].wing) === -1) wings.push(BASES[base].wing);
    });
    if (bad.length) return { ok: false, reason: 'damaged entry for ' + bad.join(', '), name: name };
    if (!Object.keys(keys).length) return { ok: false, reason: 'the record carries nothing this product reads', name: name, skipped: skipped };
    return { ok: true, name: name, record: rec, keys: keys, wings: wings, skipped: skipped };
  }

  function exportProfile(id) {
    var p = find(id) || current();
    if (!p) return null;
    var out = { app: 'outside-of-time', kind: 'profile', v: 1, exported: Date.now(),
                profile: { name: p.name, created: p.created, lastSeen: p.lastSeen,
                           streak: p.streak || 0, lastDay: p.lastDay || null, days: p.days || 0,
                           path: p.path || {} },
                keys: {} };
    var suffix = p.legacy ? null : '::' + p.id;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k === KEY) continue;
        /* The shared layer's own keys are never part of a person's record:
           'sb-<ref>-auth-token' carries the venue's refresh token, and
           'oot-entitlement-v1', 'oot-mock-*' and 'oot-gaps-v1' are device
           state. A legacy profile matches every unsuffixed key, so without
           this the blob a staff member hands over WhatsApp would carry the
           venue's live credential. */
        if (k.indexOf('oot-') === 0 || k.indexOf('sb-') === 0) continue;
        if (suffix ? k.slice(-suffix.length) === suffix : k.indexOf('::') === -1) {
          out.keys[suffix ? k.slice(0, -suffix.length) : k] = localStorage.getItem(k);
        }
      }
    } catch (e) {}
    return out;
  }

  /* Import is deliberately additive and non-destructive by default: it creates
     a NEW profile rather than overwriting an existing one, because a manager
     importing four staff records must never be able to flatten their own.
     The one way to overwrite is opts.replace, and the Pass only passes it
     after the manager has confirmed by name (see pass/index.html).

     Only allowlisted bases are written, only with values the wing will
     accept, and never an oot- or sb- key: see BASES and validateRecord. A
     record with a damaged entry is refused whole rather than half-applied. */
  function importProfile(blob, opts) {
    opts = opts || {};
    var v = validateRecord(blob);
    if (!v.ok) return null;
    var rec = v.record;
    var name = v.name;
    var existing = null;
    for (var i = 0; i < data.list.length; i++) if (data.list[i].name === name) { existing = data.list[i]; break; }
    var replaced = false;
    var p;
    if (existing && opts.replace) { p = existing; replaced = true; }
    else p = add(existing ? name + ' (imported)' : name);
    /* On a personal device the plain key IS the record, so that is where a
       restored file goes. Whatever it displaces is parked first, under a
       prefix carrying one colon and never two, so the owner scan below can
       never read a parked record as a person. */
    var suffix = PERSONAL ? '' : (p.legacy ? '' : '::' + p.id);
    var n = 0;
    try {
      Object.keys(v.keys).forEach(function (base) {
        if (PERSONAL) {
          var had = localStorage.getItem(base);
          if (had !== null) localStorage.setItem(PARK_PREFIX + base + ':' + Date.now(), had);
        }
        localStorage.setItem(base + suffix, v.keys[base]);
        n++;
      });
    } catch (e) {}
    var prof = rec.profile || {};
    if (!replaced && typeof prof.created === 'number') p.created = prof.created;
    if (typeof prof.lastSeen === 'number' && (!replaced || prof.lastSeen > (p.lastSeen || 0))) p.lastSeen = prof.lastSeen;
    /* The shared streak and the first path live on the profile, so they
       travel in the record's profile block rather than in a wing key. */
    if (typeof prof.streak === 'number' && typeof prof.lastDay === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(prof.lastDay)) {
      if (!replaced || !p.lastDay || prof.lastDay >= p.lastDay) { p.streak = prof.streak; p.lastDay = prof.lastDay; }
    }
    if (typeof prof.days === 'number' && (!replaced || prof.days > (p.days || 0))) p.days = prof.days;
    if (prof.path && typeof prof.path === 'object' && !Array.isArray(prof.path)) {
      p.path = p.path || {};
      Object.keys(prof.path).forEach(function (wing) {
        var steps = prof.path[wing];
        if (!steps || typeof steps !== 'object') return;
        p.path[wing] = p.path[wing] || {};
        Object.keys(steps).forEach(function (s) { if (steps[s]) p.path[wing][s] = steps[s]; });
      });
    }
    write(data);
    fire();
    return { profile: p, restored: n, replaced: replaced, wings: v.wings, skipped: v.skipped };
  }

  /* ---- the shared streak ---------------------------------------------
     Studying in any wing keeps one flame alive, because a person who drilled
     cocktails today has studied today. Stored on the profile so it namespaces
     for free and travels with an export. */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  /* LOCAL, never UTC, and an OFFSET IN DAYS rather than a date: dayKey(0) is
     today and dayKey(-1) is yesterday, which is the whole of what the streak
     asks. toISOString stamped tomorrow's date for anyone west of Greenwich
     studying in the evening (7pm in Chicago is already tomorrow in UTC), so
     a streak built on it broke on exactly the nights people study. First
     Light's own store learned this the same way; the two streak systems in
     one product have to agree on what a day is. */
  function dayKey(offset) {
    var d = new Date();
    if (offset) d.setDate(d.getDate() + offset);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  /* THE ONE DEFINITION OF "STUDIED" IN THE PRODUCT (contract A).
     A person studied today when they COMPLETED something, and each wing calls
     this at exactly that moment and nowhere else:

       Codex        an answered question (codex14.js wraps statRecord)
       Ledger       a graded card or a finished session (oot-ledger.js wraps
                    recordCard and recordSessionComplete)
       World Table  a finished round of the lexicon quiz, the menu quiz, the
                    firing drill or the service drill, and a dish marked
                    cooked (session.markCooked)
       First Light  a kept morning: the completed guided morning, which fires
                    fl:morning-kept once a day (oot-light.js listens for that
                    event and deliberately never wraps flMarkDay, which the
                    wing calls the moment Today opens)
       Calendar     never. The almanac is read and written, not studied.

     Opening an app is not studying, and neither is browsing a page. The Pass
     reads p.lastDay against dayKey(0) for "studied today", and streak() reads
     the same fields, so this is the only writer of both. */
  /* THE DEVICE'S OWN PACE. The owner asked for a personal app "at their own
     pace and progression", and the streak is the only thing in the product
     that is the progression, so it had to survive losing the profile that
     used to carry it. It gets its own small key rather than a slot inside
     the roster blob, so a device that never had a name never grows one.
     Seeded once from the single profile's run by the adoption below, so
     nobody's streak breaks on the day this ships. */
  function readStreak() {
    try {
      var raw = localStorage.getItem(STREAK_KEY);
      if (!raw) return { v: 1, streak: 0, lastDay: null, days: 0 };
      var d = JSON.parse(raw);
      if (!d || typeof d !== 'object') return { v: 1, streak: 0, lastDay: null, days: 0 };
      return { v: 1, streak: d.streak || 0, lastDay: d.lastDay || null, days: d.days || 0 };
    } catch (e) { return { v: 1, streak: 0, lastDay: null, days: 0 }; }
  }
  function writeStreak(d) {
    try { localStorage.setItem(STREAK_KEY, JSON.stringify(d)); } catch (e) {}
  }

  function markStudied() {
    if (PERSONAL) {
      var d = readStreak();
      var t = dayKey(0);
      if (d.lastDay === t) return d.streak || 1;
      d.streak = (d.lastDay === dayKey(-1)) ? (d.streak || 0) + 1 : 1;
      d.lastDay = t;
      d.days = (d.days || 0) + 1;
      writeStreak(d);
      fire();
      return d.streak;
    }
    var p = current();
    if (!p) return 0;
    var today = dayKey(0);
    if (p.lastDay === today) return p.streak || 1;
    p.streak = (p.lastDay === dayKey(-1)) ? (p.streak || 0) + 1 : 1;
    p.lastDay = today;
    p.days = (p.days || 0) + 1;
    write(data);
    fire();
    return p.streak;
  }

  function streak() {
    if (PERSONAL) {
      var d = readStreak();
      if (!d.lastDay) return 0;
      return (d.lastDay === dayKey(0) || d.lastDay === dayKey(-1)) ? (d.streak || 0) : 0;
    }
    var p = current();
    if (!p || !p.lastDay) return 0;
    /* A streak survives yesterday and dies the day after. */
    return (p.lastDay === dayKey(0) || p.lastDay === dayKey(-1)) ? (p.streak || 0) : 0;
  }

  function studiedToday() {
    if (PERSONAL) return readStreak().lastDay === dayKey(0);
    var p = current();
    return !!(p && p.lastDay === dayKey(0));
  }

  /* ---- the first path -------------------------------------------------
     A short, finishable induction. Completion is per person and per wing, and
     it lives on the profile rather than in a wing's store for one reason: the
     manager view has to read every person's progress without switching to them,
     and the roster is the only thing it can already see.

     Keyed wing -> stepId -> true. Small enough to sit beside the name. */
  /* With no profile there is nothing here to answer for. Each wing keeps its
     own induction ticks in its own record now, which is where the Ledger has
     kept them since names came out of it. The explicit-id form still works,
     because that is what a manager view reads. */
  function pathDone(wing, stepId, id) {
    if (PERSONAL && !id) return false;
    var p = id ? find(id) : current();
    return !!(p && p.path && p.path[wing] && p.path[wing][stepId]);
  }

  function markPathStep(wing, stepId) {
    if (PERSONAL) return false;
    var p = current();
    if (!p || !wing || !stepId) return false;
    p.path = p.path || {};
    p.path[wing] = p.path[wing] || {};
    if (p.path[wing][stepId]) return false;
    p.path[wing][stepId] = Date.now();
    write(data);
    fire();
    return true;
  }

  function pathProgress(wing, id) {
    if (PERSONAL && !id) return 0;
    var p = id ? find(id) : current();
    var done = (p && p.path && p.path[wing]) ? Object.keys(p.path[wing]).length : 0;
    return done;
  }

  /* ---- the one-time move onto the plain keys -------------------------

     A record written while this device DID namespace sits at
     "<base>::<id>" and nothing reads it any more. Where the answer is not
     in doubt it is moved across; where it is, nothing is touched and the
     recovery card below offers it.

     THE UNIT IS THE PERSON, ACROSS ALL WINGS, not the key and not the wing.
     Deciding per key would file one person's bookmarks and another's
     journals as one record on a device where each used one wing. Deciding
     per wing would make the device two people, which is the property this
     whole change exists to remove.

     A LEGACY PROFILE STOPS EVERYTHING. The first name ever typed on a
     device is marked legacy and keeps reading the PLAIN keys, so on a
     device with a legacy profile the plain keys are already somebody's
     months of work. Writing over them is the one mistake that cannot be
     undone. This is also why most devices need no migration at all: with
     nobody named, or one name, nothing was ever namespaced.

     COPY, NEVER MOVE. Every "<base>::<id>" record stays exactly where it
     is, for the recovery card, for a manager mode in a year, and because a
     migration that deletes has to be right the first time. */

  /* mint() is "p-" + 6 base36 + 4 base36, so an owner id is p- and exactly
     ten of [0-9a-z]. Checking it matters: First Light has been known to
     write "<base>::<id>-corrupt" beside a record it could not parse, and a
     loose split would read that as a second person and refuse a device that
     has only one. */
  function validOwnerId(id) { return /^p-[0-9a-z]{10}$/.test(id); }

  function namedRecords() {
    var byId = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k.indexOf(PARK_PREFIX) === 0) continue;
        var cut = k.indexOf('::');
        if (cut <= 0) continue;
        var base = k.slice(0, cut);
        var id = k.slice(cut + 2);
        if (!BASES[base] || !validOwnerId(id)) continue;
        (byId[id] = byId[id] || []).push({ base: base, key: k });
      }
    } catch (e) {}
    return byId;
  }

  function hasLegacyProfile() {
    try {
      for (var i = 0; i < data.list.length; i++) if (data.list[i].legacy) return true;
    } catch (e) {}
    return false;
  }

  /* Copies a person's records onto whichever plain keys are free. Answers
     false if a write failed, so the caller can hold the whole person rather
     than leave them half moved. */
  function copyInto(list) {
    var cfl = false, ok = true;
    for (var i = 0; i < list.length; i++) {
      try {
        if (localStorage.getItem(list[i].base) !== null) continue;   /* never overwrite */
        var v = localStorage.getItem(list[i].key);
        if (v === null) continue;
        localStorage.setItem(list[i].base, v);
        if (list[i].base.indexOf('cfl-') === 0) cfl = true;
      } catch (e) { ok = false; }
    }
    return { ok: ok, cfl: cfl };
  }

  /* The almanac stamps three flags when it has rewritten its journal keys
     for the Books that folded into the months. A blob that arrives on the
     plain key never had that rewrite, so the flags come off and the wing
     does it again; the almanac says in its own comment that it is
     idempotent. */
  function clearCflFlags() {
    var f = ['cfl-lp-migration-v1', 'cfl-ow-migration-v1', 'cfl-dy-migration-v1'];
    for (var i = 0; i < f.length; i++) { try { localStorage.removeItem(f[i]); } catch (e) {} }
  }

  /* Nobody's run should break on the day this ships. With exactly one name
     on the device its streak is unambiguously this device's. With two,
     nobody can say whose pace it was, and inventing an answer is worse than
     starting again. */
  function seedStreak() {
    try {
      if (localStorage.getItem(STREAK_KEY) !== null) return;
      if (data.list.length !== 1) return;
      var p = data.list[0];
      if (!p || !p.lastDay) return;
      writeStreak({ v: 1, streak: p.streak || 0, lastDay: p.lastDay, days: p.days || 0 });
    } catch (e) {}
  }

  function personalise() {
    if (!PERSONAL) return;
    try { if (localStorage.getItem(PERSONAL_FLAG)) return; } catch (e) { return; }
    var byId = namedRecords();
    var owners = Object.keys(byId);
    var verdict = 'adopted';
    if (owners.length === 1 && !hasLegacyProfile()) {
      var moved = copyInto(byId[owners[0]]);
      if (moved.cfl) clearCflFlags();
      if (!moved.ok) verdict = 'held';
    } else if (owners.length) {
      verdict = 'held';
    }
    seedStreak();
    try { localStorage.setItem(PERSONAL_FLAG, verdict); } catch (e) {}
  }
  personalise();

  /* What is still on this device under a name, for the recovery card. It is
     empty on every device that never had two names, which is why the card
     appears on almost none of them. */
  function dormant() {
    if (!PERSONAL) return [];
    var byId = namedRecords();
    return Object.keys(byId).map(function (id) {
      var p = find(id);
      var wings = [];
      byId[id].forEach(function (r) {
        var w = BASES[r.base] && BASES[r.base].wing;
        if (w && wings.indexOf(w) < 0) wings.push(w);
      });
      return { id: id, name: (p && p.name) || 'A name no longer on the roster',
               wings: wings, bases: byId[id].slice() };
    });
  }

  /* The World Table has to ask this because list() answers empty. */
  function dormantLegacy() { return hasLegacyProfile(); }

  /* Move one held person onto the plain keys, parking whatever is displaced
     rather than losing it. Refuses the base if the park will not write. */
  function adoptDormant(id) {
    var byId = namedRecords();
    var list = byId[id];
    if (!list || !list.length) return false;
    var stamp = Date.now(), moved = 0, cfl = false;
    for (var i = 0; i < list.length; i++) {
      try {
        var v = localStorage.getItem(list[i].key);
        if (v === null) continue;
        var had = localStorage.getItem(list[i].base);
        if (had !== null) localStorage.setItem(PARK_PREFIX + list[i].base + ':' + stamp, had);
        localStorage.setItem(list[i].base, v);
        if (list[i].base.indexOf('cfl-') === 0) cfl = true;
        moved++;
      } catch (e) {}
    }
    if (cfl) clearCflFlags();
    try { localStorage.setItem(PERSONAL_FLAG, 'adopted'); } catch (e) {}
    return moved > 0;
  }

  /* Answering the card with "keep what is here" settles it for good without
     touching a byte of anybody's record. */
  function settlePersonal() {
    try { localStorage.setItem(PERSONAL_FLAG, 'adopted'); } catch (e) {}
    return true;
  }

  OOT.profiles = {
    personal: function () { return PERSONAL; },
    dormant: dormant,
    dormantLegacy: dormantLegacy,
    adoptDormant: adoptDormant,
    settlePersonal: settlePersonal,
    list: function () { return PERSONAL ? [] : data.list.slice(); },
    pathDone: pathDone,
    markPathStep: markPathStep,
    pathProgress: pathProgress,
    current: current,
    get: find,
    add: add,
    switch: switchTo,
    rename: rename,
    remove: remove,
    adopt: adopt,
    touch: touch,
    key: function (base) { return key(base); },
    isManagerDevice: isManagerDevice,
    setManagerDevice: setManagerDevice,
    exportProfile: exportProfile,
    importProfile: importProfile,
    validateRecord: validateRecord,
    /* The bases a record may carry, keyed to the wing they belong to, so a
       reader can name the wings a file holds without a second list. */
    recordBases: function () {
      var o = {};
      Object.keys(BASES).forEach(function (b) { o[b] = BASES[b].wing; });
      return o;
    },
    markStudied: markStudied,
    streak: streak,
    studiedToday: studiedToday,
    /* The one definition of "a day" in the product: LOCAL, offset in days.
       oot-pass.js reads it so the manager's numbers agree with the chip. */
    dayKey: dayKey,
    onChange: function (fn) {
      if (typeof fn !== 'function') return function () {};
      listeners.push(fn);
      try { fn(current()); } catch (e) {}
      return function () {
        listeners = listeners.filter(function (f) { return f !== fn; });
      };
    }
  };

  /* Another tab switched profile. Following it in memory is NOT enough and was
     actively harmful: every wing loads its record once under the old key and
     recomputes the key on each save, so a silent swap sends this tab's next
     save (a half-finished journal entry, a quiz result) into the other
     person's record under their key. The acting tab reloads for exactly this
     reason (see oot-home.js bindWho); a following tab must do the same.

     The identity is pinned before the reload, because reload() does not stop
     the document: a keystroke or timer firing in the meantime would otherwise
     resolve the new key. Pinning keeps every save in flight addressed to the
     record it was written for. */
  window.addEventListener('storage', function (e) {
    /* Nobody can switch while this is personal, so a roster write in another
       tab describes nothing this document is reading. */
    if (PERSONAL) return;
    if (e.key !== KEY) return;
    var fresh = read();
    if (!fresh) return;
    var changed = fresh.current !== data.current;
    if (!changed) { data = fresh; return; }
    if (pinned) return;                 /* a reload is already on its way */
    pinned = data.current;
    fire();
    try { window.location.reload(); } catch (err) { data = fresh; }
  });
})();
