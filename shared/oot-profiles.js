/* ============ Outside Of Time: who is studying ============
   A venue buys one subscription and its staff share one sign-in. That was a
   deliberate decision and it stays: no seats, no invites, no roster on a server.
   But it leaves the product unable to tell two people apart, and a manager
   paying $49.99 a month is buying proof that training happened.

   This closes that gap without a backend. A device keeps a short list of names.
   Whoever is about to study taps theirs, and every wing's storage key is
   namespaced to them from that moment on. Maria's streak is Maria's; Devon's
   due cards are Devon's; the manager view can add them up.

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

  var KEY = 'oot-profiles-v1';
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
  function isManagerDevice() { return !!data.manager; }
  function setManagerDevice(on) {
    data.manager = !!on;
    write(data);
    fire();
    return data.manager;
  }

  /* ---- moving a record between devices --------------------------------
     Every wing already has its own export/import with its own merge rules. This
     does not replace them; it wraps a named person's slice of localStorage so a
     staff member can hand a manager one blob rather than three. */
  function exportProfile(id) {
    var p = find(id) || current();
    if (!p) return null;
    var out = { app: 'outside-of-time', kind: 'profile', v: 1, exported: Date.now(),
                profile: { name: p.name, created: p.created, lastSeen: p.lastSeen }, keys: {} };
    var suffix = p.legacy ? null : '::' + p.id;
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || k === KEY) continue;
        if (suffix ? k.slice(-suffix.length) === suffix : k.indexOf('::') === -1) {
          out.keys[suffix ? k.slice(0, -suffix.length) : k] = localStorage.getItem(k);
        }
      }
    } catch (e) {}
    return out;
  }

  /* Import is deliberately additive and non-destructive: it creates a NEW
     profile rather than overwriting an existing one, because a manager
     importing four staff records must never be able to flatten their own. */
  function importProfile(blob) {
    if (!blob || blob.kind !== 'profile' || !blob.keys) return null;
    var name = clean(blob.profile && blob.profile.name) || 'Imported';
    var taken = data.list.some(function (p) { return p.name === name; });
    var p = add(taken ? name + ' (imported)' : name);
    var n = 0;
    try {
      Object.keys(blob.keys).forEach(function (base) {
        localStorage.setItem(base + '::' + p.id, blob.keys[base]);
        n++;
      });
    } catch (e) {}
    if (blob.profile && blob.profile.created) p.created = blob.profile.created;
    if (blob.profile && blob.profile.lastSeen) p.lastSeen = blob.profile.lastSeen;
    write(data);
    fire();
    return { profile: p, restored: n };
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

  function markStudied() {
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
    var p = current();
    if (!p || !p.lastDay) return 0;
    /* A streak survives yesterday and dies the day after. */
    return (p.lastDay === dayKey(0) || p.lastDay === dayKey(-1)) ? (p.streak || 0) : 0;
  }

  function studiedToday() {
    var p = current();
    return !!(p && p.lastDay === dayKey(0));
  }

  /* ---- the first path -------------------------------------------------
     A short, finishable induction. Completion is per person and per wing, and
     it lives on the profile rather than in a wing's store for one reason: the
     manager view has to read every person's progress without switching to them,
     and the roster is the only thing it can already see.

     Keyed wing -> stepId -> true. Small enough to sit beside the name. */
  function pathDone(wing, stepId, id) {
    var p = id ? find(id) : current();
    return !!(p && p.path && p.path[wing] && p.path[wing][stepId]);
  }

  function markPathStep(wing, stepId) {
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
    var p = id ? find(id) : current();
    var done = (p && p.path && p.path[wing]) ? Object.keys(p.path[wing]).length : 0;
    return done;
  }

  OOT.profiles = {
    list: function () { return data.list.slice(); },
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
    markStudied: markStudied,
    streak: streak,
    studiedToday: studiedToday,
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
