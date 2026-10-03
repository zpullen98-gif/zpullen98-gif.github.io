/* ================== CODEX XXVII: THE HOUSE ==================

   Our Wine List has always been the venue's own list, kept in ST.cellar and
   drilled like the Court's. From this layer on it is also a PROJECTION of
   the House: the one record of the restaurant a person works at, shared by
   the three craft wings on the one origin and kept by the shared engine,
   shared/oot-house.js, which installs window.OOT.house. The Table holds the
   dishes, the Ledger the drinks, and this wing the wines; a pack carries
   the whole house from device to device with no key.

   SIX THINGS THIS FILE DOES, and the rule each one keeps:

   1. THE SYNC. At load, when the engine is here, the list is brought into
      step with the current house through the engine's own codexWine
      adapter (api.sync), and what it reports is written back ONLY through
      cellarSanitize, the one door every bottle has ever entered by: one
      push per row-added, a rewrite per row-updated or adopted, the id
      replaced for renamed, a splice for row-removed. One stSave for the
      run, then one re-render. The sync removes nothing without a tombstone
      newer than the row's last touch, a kept line on the row beats hers
      whatever the stamps, and a name twin is re-keyed to the house's id
      with every record keyed on the old id (ST.q, ST.srs and the other
      question-keyed stores, under any rank prefix) moved to the new one,
      since codex12 keys each drill answer on the bottle's id and a record
      left behind would never be read again (keyOwned already keeps a w-
      key out of every rank's figures). Another tab's write reaches this
      one through the storage event on the house index, which runs the sync
      again. The sync WAITS while an Our List drill is running or the
      cellar form is open: a bottle removed or re-keyed under a drill
      records to a key no bottle holds, and a save over a bottle the sync
      took would push it back under a newer tombstone and lose the edit.
      The ask is kept and run by the next render once the drill or the
      form is over.

   2. THE HOUSE ON A BOTTLE. cellarSanitize is reassigned at call time to
      carry `house` when it is set, the way codex24 carries `maitre`, and
      everything else is still dropped. A bottle with no house is an
      implicit house and is adopted by the first sync that finds one.

   3. PROJECTION FIRST, HOUSE SECOND. The cellar form's save, cellarAddMany
      and the list's Remove each run unchanged and only then tell the
      engine (api.put, api.removeItem). A refused House write leaves the
      list as saved and is never thrown at the person.

   4. THE TRANSFER MERGE keeps `house`: codex12 takes the newer bottle whole,
      so a bottle that arrived without the stamp would lose it; the stamp
      is put back from a snapshot, then the sync runs so what arrived is
      adopted.

   5. THE MINE ROW AND THE HOUSE VIEW. One row, The house, joins V25_MINE
      and is registered in V25_GO, V25_AREA and V25_HUB like every other
      destination. It says which house the list belongs to and the next
      build step, or that there is no house yet, and opens the house view:
      Switch, New house, Import a pack (a file or an address, fetched by
      this browser alone on the press; a pack whose id is already here
      stops on Add as a new house / Merge into; every success ends on
      "{name} added. Open it now?"), Export (the pack, downloaded) and
      Rename. Nothing is advertised anywhere else.

   6. THE DRILL'S LENGTH. codex12 now reads ST.cellarDrillN; the chips that
      set it (15, 30, the whole list) are drawn beside Drill the list.

   NO OOT AT ALL is the standalone build and every Node gate: every read of
   OOT is behind typeof, the row's show() is false, the sync is a no-op, and
   this file never reads the page's address (the merge harness has none).

   House rules observed: a new layer, no edits to earlier files beyond the
   caps raised beside their reasons; top-level declarations are var and
   function only; no pictorial glyphs; British spelling; no dash of any
   spelling in anything drawn. */

/* =========== helpers =========== */

function v27Api() {
  try { return (typeof OOT !== 'undefined' && OOT && OOT.house) ? OOT.house : null; }
  catch (e) { return null; }
}

function v27Esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function v27Plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

function v27BottleById(id) {
  var hit = null;
  (ST.cellar || []).some(function (x) { if (x && x.id === id) { hit = x; return true; } return false; });
  return hit;
}

function v27IndexOf(id) {
  var at = -1;
  (ST.cellar || []).some(function (x, i) { if (x && x.id === id) { at = i; return true; } return false; });
  return at;
}

/* The eight build steps in the words a person would use for "next". */
var V27_STEP_WORDS = {
  card: 'the house card', menus: 'the menus', filed: 'review and file', formula: 'the formula',
  pairings: 'the pairings', wines: 'the wines', lexicon: 'the words', scenarios: 'the table'
};
var V27_NO_HOUSE = 'No house yet. Import a pack, or start one.';
var V27_INDEX_KEY = 'oot-houses-v1';

function v27Current() {
  var api = v27Api();
  if (!api) return null;
  try { return api.current(); } catch (e) { return null; }
}

function v27Step(h) {
  var api = v27Api();
  var steps = (api && api.BUILD_STEPS) || Object.keys(V27_STEP_WORDS);
  var build = (h && h.build) || {};
  var next = null;
  for (var i = 0; i < steps.length; i++) { if (!build[steps[i]]) { next = steps[i]; break; } }
  if (next) return 'next: ' + (V27_STEP_WORDS[next] || next);
  return 'complete, menus read ' + ((h && h.menusReadOn) || 'on no recorded date');
}

/* The Mine row's line: the house and its next step, or the no-house line. */
function v27Line() {
  var h = v27Current();
  return h ? h.name + ' · ' + v27Step(h) : V27_NO_HOUSE;
}

/* The house view's own line. */
function v27HouseLine() {
  var h = v27Current();
  return h ? 'The house: ' + h.name + ' · ' + v27Step(h) : V27_NO_HOUSE;
}

/* =========== 2. the house on a bottle =========== */

var _v27CellarSanitize = (typeof cellarSanitize === 'function') ? cellarSanitize : null;
if (_v27CellarSanitize) {
  cellarSanitize = function (b) {
    var out = _v27CellarSanitize(b);
    if (b && typeof b.house === 'string' && b.house) out.house = b.house.slice(0, 24);
    return out;
  };
}

/* =========== 1. the sync =========== */

var V27_SYNCING = null;
var V27_AGAIN = false;
var V27_PENDING = false;
var V27_LAST = null;

/* The list is being read or written by the person right now: an Our List
   drill is running (S.pool holds its questions by bottle id) or the cellar
   form is open on a bottle. The sync must not move the data under them. */
function v27Busy() {
  if (S._cellarForm) return true;
  return S.mode === 'drill' && S.section === 'Our List';
}

/* An ask kept while the list was busy, run once it is not. Called by the
   wrapped render, which every end of a drill or a form goes through. */
function v27Flush() {
  if (!V27_PENDING || v27Busy()) return;
  V27_PENDING = false;
  v27Sync();
}

/* The stores codex12's drill writes under a bottle's id: ST.q, ST.srs and
   the rest of codex10's QID_STORES, each keyed '<id>-<kind>' under an
   optional rank prefix, and ST.flags, an array of the same keys. */
function v27QidStores() {
  return (typeof QID_STORES !== 'undefined' && Array.isArray(QID_STORES)) ? QID_STORES : ['q', 'srs', 'notes', 'grader', 'bad'];
}

/* A key whose bare id is `from` plus a kind, rewritten to `to`; null otherwise. */
function v27RekeyOne(k, from, to) {
  var cut = k.indexOf('|');
  var pre = cut > -1 ? k.slice(0, cut + 1) : '';
  var bare = cut > -1 ? k.slice(cut + 1) : k;
  if (bare.indexOf(from + '-') !== 0) return null;
  return pre + to + bare.slice(from.length);
}

/* The rename door: every record kept under the former id follows the bottle
   to the house's id. A record already under the new key is kept and the old
   one dropped, the newer side having been written since. Returns how many
   keys moved. */
function v27Rekey(from, to) {
  if (!from || !to || from === to) return 0;
  var moved = 0;
  v27QidStores().forEach(function (name) {
    var store = ST[name];
    if (!store || typeof store !== 'object' || Array.isArray(store)) return;
    Object.keys(store).forEach(function (k) {
      var nk = v27RekeyOne(k, from, to);
      if (nk === null) return;
      if (!(nk in store)) store[nk] = store[k];
      delete store[k];
      moved++;
    });
  });
  if (Array.isArray(ST.flags)) {
    var seen = {};
    var flags = [];
    ST.flags.forEach(function (k) {
      var nk = typeof k === 'string' ? v27RekeyOne(k, from, to) : null;
      if (nk !== null) { k = nk; moved++; }
      if (seen[k]) return;
      seen[k] = true;
      flags.push(k);
    });
    ST.flags = flags;
  }
  return moved;
}

/* A re-render only where the list or the house line is on screen, and never
   over a form or a review run: a half-typed bottle must not be lost to a
   sync that landed from another tab. */
function v27Redraw() {
  if (S.view === 'cellar' && (S._cellarForm || S._wimp)) return;
  if (S.view === 'home' || S.view === 'mine' || S.view === 'cellar' || S.view === 'house') {
    try { render(); } catch (e) { }
  }
}

/* What the sync reported, written back through cellarSanitize and nothing
   else. Returns how many rows were written. */
function v27Apply(res) {
  if (!res || !res.ok || !res.changes || !res.changes.length) return 0;
  ST.cellar = ST.cellar || [];
  var by = {};
  (res.rows || []).forEach(function (r) { if (r && r.id) by[r.id] = r; });
  var wrote = 0;
  res.changes.forEach(function (c) {
    if (!c || !c.id) return;
    var row = by[c.id];
    if (c.what === 'renamed') {
      var i = v27IndexOf(c.from);
      if (i >= 0 && row) { ST.cellar[i] = cellarSanitize(row); v27Rekey(c.from, c.id); wrote++; }
    } else if (c.what === 'row-updated' || c.what === 'adopted') {
      var j = v27IndexOf(c.id);
      if (j >= 0 && row) { ST.cellar[j] = cellarSanitize(row); wrote++; }
    } else if (c.what === 'row-added') {
      if (row && v27IndexOf(c.id) < 0) { ST.cellar.push(cellarSanitize(row)); wrote++; }
    } else if (c.what === 'row-removed') {
      var k = v27IndexOf(c.id);
      if (k >= 0) { ST.cellar.splice(k, 1); wrote++; }
    }
  });
  if (wrote) { stSave(); v27Redraw(); }
  return wrote;
}

/* The whole list into the current house and back. One run at a time: a
   second ask while one is in flight runs once more after it, so a storage
   event that lands mid-sync is not lost. An ask while the list is busy
   (v27Busy) is kept for the render that ends the drill or the form.
   Resolves to the engine's answer, or null when there is no engine, no
   house, or the ask was kept for later. */
function v27Sync() {
  var api = v27Api();
  if (!api) return Promise.resolve(null);
  if (v27Busy()) { V27_PENDING = true; return Promise.resolve(null); }
  if (V27_SYNCING) { V27_AGAIN = true; return V27_SYNCING; }
  V27_SYNCING = api.ready().then(function () {
    if (!api.current()) return null;
    return api.sync('wine', ST.cellar || []);
  }).then(function (res) {
    if (res) v27Apply(res);
    return res;
  }).catch(function () { return null; }).then(function (res) {
    V27_SYNCING = null;
    if (V27_AGAIN) { V27_AGAIN = false; return v27Busy() ? (V27_PENDING = true, res) : v27Sync(); }
    return res;
  });
  V27_LAST = V27_SYNCING;
  return V27_SYNCING;
}

/* =========== 3. projection first, House second =========== */

/* One bottle the list has already saved, into the house. Only a changed id
   (a name twin, or an id the engine's key sweep refuses) or the house stamp
   comes back onto the row, through cellarSanitize; the list's own save is
   the newer side and the engine keeps it. */
function v27Put(rec) {
  var api = v27Api();
  if (!api || !rec || !rec.id) return Promise.resolve(null);
  return api.ready().then(function () {
    if (!api.current()) return null;
    return api.put('wine', rec);
  }).then(function (res) {
    if (!res || !res.ok || !res.row) return res;
    var i = v27IndexOf(rec.id);
    if (i < 0) return res;
    var mine = ST.cellar[i];
    var moved = res.row.id !== mine.id || (res.row.house && res.row.house !== mine.house);
    if (moved) { ST.cellar[i] = cellarSanitize(res.row); stSave(); v27Redraw(); }
    return res;
  }).catch(function () { return null; });
}

function v27PutMany(recs) {
  return (recs || []).reduce(function (p, rec) {
    return p.then(function () { return v27Put(rec); });
  }, Promise.resolve(null));
}

/* A tombstone for a bottle the list has taken off, so no device brings it back. */
function v27Remove(id) {
  var api = v27Api();
  if (!api || !id) return Promise.resolve(false);
  return api.ready().then(function () {
    if (!api.current()) return false;
    return api.removeItem('wine', id);
  }).catch(function () { return false; });
}

var _v27CellarAddMany = (typeof cellarAddMany === 'function') ? cellarAddMany : null;
if (_v27CellarAddMany) {
  cellarAddMany = function (rows) {
    var before = (ST.cellar || []).length;
    var out = _v27CellarAddMany(rows);
    var added = (ST.cellar || []).slice(before);
    if (added.length) v27PutMany(added);
    return out;
  };
}

/* The drill length chips, beside Drill the list. */
function v27DrillChips() {
  var cur = (typeof cellarDrillLen === 'function') ? cellarDrillLen() : 15;
  var opts = [[15, '15 questions'], [30, '30 questions'], [0, 'The whole list']];
  return '<div class="sarow" role="group" aria-label="How many questions the drill asks">'
    + '<span class="lvltag" style="min-width:86px;display:inline-block">Drill length</span>'
    + opts.map(function (o) {
      return '<button class="btn small ghost" type="button" data-cl-len="' + o[0] + '" aria-pressed="'
        + (cur === o[0] ? 'true' : 'false') + '">' + o[1] + '</button>';
    }).join('') + '</div>';
}

function v27DecorateCellar(v) {
  /* the save: the house stamp survives codex12's rebuild of the record, and
     the bottle goes into the house after the whole chain has saved it */
  var save = v.querySelector('#cl-save');
  if (save && S._cellarForm) {
    var orig = save.onclick;
    save.onclick = function () {
      var editId = S._cellarEdit;
      var before = (ST.cellar || []).length;
      var prior = editId ? v27BottleById(editId) : null;
      var priorHouse = prior && typeof prior.house === 'string' ? prior.house : '';
      if (typeof orig === 'function') orig();
      var rec = editId ? v27BottleById(editId)
        : ((ST.cellar || []).length > before ? ST.cellar[ST.cellar.length - 1] : null);
      if (!rec) return;   /* the form refused the row and has already said so */
      if (priorHouse && !rec.house) { rec.house = priorHouse; stSave(); }
      v27Put(rec);
    };
  }

  /* the list's Remove: after the list has let the bottle go, the house does */
  Array.prototype.forEach.call(v.querySelectorAll('[data-cl-del]'), function (btn) {
    var del = btn.onclick;
    if (typeof del !== 'function') return;
    btn.onclick = function () {
      var id = btn.getAttribute('data-cl-del') || (btn.dataset && btn.dataset.clDel) || '';
      var had = v27IndexOf(id) >= 0;
      del();
      if (had && v27IndexOf(id) < 0) v27Remove(id);
    };
  });

  /* the drill length */
  var dr = v.querySelector('#cl-drill');
  if (dr && dr.parentNode && dr.parentNode.parentNode && !S._cellarForm) {
    var row = dr.parentNode;
    var chips = el(v27DrillChips());
    row.parentNode.insertBefore(chips, row.nextSibling);
    Array.prototype.forEach.call(chips.querySelectorAll('[data-cl-len]'), function (b) {
      b.onclick = function () {
        var n = Number(b.getAttribute('data-cl-len'));
        ST.cellarDrillN = n === 0 ? 'all' : n;
        stSave(); render();
      };
    });
  }
}

var _v27CellarView = (typeof cellarView === 'function') ? cellarView : null;
if (_v27CellarView) {
  cellarView = function () {
    var v = _v27CellarView();
    try { v27DecorateCellar(v); } catch (e) { /* the list must never go dark for the house */ }
    return v;
  };
}

/* =========== 4. the transfer merge =========== */

var _v27MergeStats = (typeof mergeStats === 'function') ? mergeStats : null;
if (_v27MergeStats) {
  mergeStats = function (inc) {
    var before = {};
    (ST.cellar || []).forEach(function (b) { if (b && b.id && typeof b.house === 'string' && b.house) before[b.id] = b.house; });
    var err = _v27MergeStats(inc);
    if (err) return err;
    var changed = false;
    (ST.cellar || []).forEach(function (b) {
      if (b && b.id && !b.house && before[b.id]) { b.house = before[b.id]; changed = true; }
    });
    if (changed) stSave();
    if (inc && inc.stats && Array.isArray(inc.stats.cellar)) v27Sync();
    return err;
  };
}

/* =========== 5. the house view =========== */

/* S._v27 = { panel, error, live, pending, added, busy } */
function v27State() {
  if (!S._v27) S._v27 = { panel: '', error: '', live: '', pending: null, added: null, busy: false };
  return S._v27;
}

function v27Say(text) {
  v27State().live = text;
  if (typeof say === 'function') { try { say(text); } catch (e) { } }
}

function v27List() {
  var api = v27Api();
  try { return api ? api.list() : []; } catch (e) { return []; }
}

function v27CurrentId() {
  var api = v27Api();
  try { return api ? api.currentId() : null; } catch (e) { return null; }
}

function v27Field(id, label, val, ph) {
  return '<label class="lvltag" for="' + id + '" style="min-width:86px;display:inline-block">' + label + '</label>'
    + '<input class="sainput" id="' + id + '" value="' + v27Esc(val) + '" placeholder="' + v27Esc(ph) + '">';
}

function v27HouseHtml() {
  var st = v27State();
  var api = v27Api();
  var h = v27Current();
  var list = v27List();
  var html = '<div class="v25page"><div class="viewhead"><h2>The house</h2>'
    + '<div class="sub">' + v27Esc(v27HouseLine()) + '</div></div>';
  if (!api) {
    html += '<div class="sub">This copy of the Codex carries no House: the shared engine is not in this build.</div></div>';
    return html;
  }
  html += '<p class="sub" id="h27-live" role="status" aria-live="polite">' + v27Esc(st.live) + '</p>';
  html += '<div class="sarow" role="group" aria-label="The house">'
    + (list.length > 1 ? '<button class="btn ghost" type="button" id="h27-switch-door" aria-expanded="' + (st.panel === 'switch') + '">Switch</button>' : '')
    + '<button class="btn ghost" type="button" id="h27-new-door" aria-expanded="' + (st.panel === 'new') + '">New house</button>'
    + '<button class="btn ghost" type="button" id="h27-import-door" aria-expanded="' + (st.panel === 'import') + '">Import a pack</button>'
    + (h ? '<button class="btn ghost" type="button" id="h27-export">Export</button>' : '')
    + (h ? '<button class="btn ghost" type="button" id="h27-rename-door" aria-expanded="' + (st.panel === 'rename') + '">Rename</button>' : '')
    + '</div>';
  if (st.panel === 'switch') {
    html += '<div class="secgroup">Open another house on this device</div><div class="sarow">'
      + '<label class="lvltag" for="h27-switch" style="min-width:86px;display:inline-block">House</label>'
      + '<select class="sainput" id="h27-switch">' + list.map(function (s) {
        return '<option value="' + v27Esc(s.id) + '"' + (s.id === v27CurrentId() ? ' selected' : '') + '>' + v27Esc(s.name) + '</option>';
      }).join('') + '</select></div>';
  } else if (st.panel === 'new') {
    html += '<div class="secgroup">A new house</div><div class="sarow">' + v27Field('h27-new', 'Name', '', 'My house')
      + '</div><div class="sarow"><button class="btn gold" type="button" id="h27-mint">Start it</button></div>';
  } else if (st.panel === 'import') {
    html += '<div class="secgroup">Import a pack</div>'
      + '<div class="sub">A pack is the file another app or device exported: the house, its wines, and every line kept on them. Nothing is sent anywhere.</div>'
      + '<div class="sarow"><label class="btn ghost" for="h27-file">Choose a pack file</label>'
      + '<input type="file" id="h27-file" class="sr-only" accept=".json,application/json"></div>'
      + '<div class="sarow">' + v27Field('h27-address', 'Address', '', 'packs/house.oothouse.json')
      + '<button class="btn ghost" type="button" id="h27-fetch">Fetch</button></div>';
    if (st.pending) {
      html += '<div class="sub">' + v27Esc(st.pending.name) + ' is already on this device.</div>'
        + '<div class="sarow" role="group" aria-label="What to do with the pack">'
        + '<button class="btn gold" type="button" id="h27-asnew">Add as a new house</button>'
        + '<button class="btn ghost" type="button" id="h27-merge">Merge into ' + v27Esc(st.pending.intoName) + '</button></div>';
    }
  } else if (st.panel === 'rename') {
    html += '<div class="secgroup">Rename this house</div><div class="sarow">' + v27Field('h27-rename', 'Name', h ? h.name : '', 'My house')
      + '</div><div class="sarow"><button class="btn gold" type="button" id="h27-rename-go">Save the name</button></div>';
  }
  if (st.added) {
    html += '<div class="secgroup">' + v27Esc(st.added.name) + ' added. Open it now?</div>'
      + '<div class="sarow" role="group" aria-label="Open ' + v27Esc(st.added.name) + '">'
      + '<button class="btn gold" type="button" id="h27-open">Open</button>'
      + '<button class="btn ghost" type="button" id="h27-notnow">Not now</button></div>';
  }
  if (st.error) html += '<div class="sub" role="alert">' + v27Esc(st.error) + '</div>';
  if (h) {
    html += '<div class="secgroup">On the list</div><div class="sub">'
      + v27Plural(h.wines.length, 'wine', 'wines') + ' in this house, '
      + v27Plural((ST.cellar || []).length, 'bottle', 'bottles') + ' on the list here.</div>';
  }
  html += '</div>';
  return html;
}

function v27Open(panel) {
  var st = v27State();
  st.error = ''; st.added = null; st.pending = null;
  st.panel = st.panel === panel ? '' : panel;
  render();
}

function v27Done(fn) {
  var st = v27State();
  st.busy = false;
  if (typeof fn === 'function') fn();
  if (S.view === 'house') render();
}

/* The pointer moved to another house: the list is synced OUT first (an edit
   made since the last wake is kept, a bottle with no house adopted), then the
   projection is replaced by the new house's wines through cellarSanitize,
   saved once. A bottle of the outgoing house leaves the list, not the world:
   it is in its house for the day that house comes back. ST.q keys survive by id. */
function v27Switch(id) {
  var api = v27Api();
  var st = v27State();
  if (!api || !id) return Promise.resolve(false);
  st.busy = true;
  return v27Sync().then(function () {
    return api.switchTo(id);
  }).then(function (next) {
    if (!next) { st.error = 'That house could not be opened on this device.'; return false; }
    var rows = api.rows('wine', ST.cellar || []);
    ST.cellar = rows.map(function (r) { return cellarSanitize(r); });
    stSave();
    st.added = null; st.panel = '';
    v27Say(next.name + ' is open.');
    return true;
  }).catch(function () { st.error = 'That house could not be opened on this device.'; return false; })
    .then(function (ok) { v27Done(); return ok; });
}

function v27Mint(name) {
  var api = v27Api();
  var st = v27State();
  if (!api) return Promise.resolve(null);
  name = String(name || '').trim();
  if (!name) return Promise.resolve(null);
  st.busy = true;
  return api.mintHouse(name, 'hand').then(function (made) {
    if (!made) { st.error = 'The house could not be written on this device. Export a pack to make room.'; return null; }
    if (api.currentId() === made.id) {
      /* the first house on the device: the bottles already here join it */
      return v27Sync().then(function () { st.panel = ''; v27Say(made.name + ' is your house now.'); return made; });
    }
    st.added = { id: made.id, name: made.name };
    v27Say(made.name + ' added.');
    return made;
  }).catch(function () { st.error = 'The house could not be written on this device.'; return null; })
    .then(function (made) { v27Done(); return made; });
}

function v27Rename(name) {
  var api = v27Api();
  var st = v27State();
  var h = v27Current();
  if (!api || !h) return Promise.resolve(false);
  name = String(name || '').trim();
  if (!name || name === h.name) { st.panel = ''; render(); return Promise.resolve(false); }
  st.busy = true;
  return api.rename(name).then(function (ok) {
    if (!ok) st.error = 'The name could not be written on this device.';
    else { st.panel = ''; v27Say('Renamed to ' + name + '.'); }
    return ok;
  }).catch(function () { st.error = 'The name could not be written on this device.'; return false; })
    .then(function (ok) { v27Done(); return ok; });
}

function v27Export() {
  var api = v27Api();
  var st = v27State();
  if (!api) return null;
  var built = null;
  try { built = api.buildPack('codex'); } catch (e) { built = null; }
  if (!built) { st.error = V27_NO_HOUSE; render(); return null; }
  try {
    var blob = new Blob([built.text], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = built.filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  } catch (e) { }
  v27Say(built.pack.house.name + ' exported as ' + built.filename + '.');
  render();
  return built;
}

/* The pack itself goes through the engine's door, which reads it again: the
   import never takes a house a screen has held. */
function v27FinishImport(text, read, choice) {
  var api = v27Api();
  var st = v27State();
  if (!api) return Promise.resolve(null);
  st.busy = true;
  return api.importPack(text, choice).then(function (result) {
    st.pending = null;
    if (!result || !result.ok) { st.error = (result && result.said) || 'That pack could not be imported.'; return result; }
    var name = read.house.name;
    if (result.current) {
      /* the pack became the current house: its wines reach the list now */
      return v27Sync().then(function () { st.panel = ''; v27Say(result.said + ' It is open.'); return result; });
    }
    st.added = { id: result.added, name: name };
    v27Say(choice.mode === 'merge' ? result.said : name + ' added. Open it now?');
    return result;
  }).catch(function () { st.error = 'That pack could not be imported.'; return null; })
    .then(function (result) { v27Done(); return result; });
}

/* A pack's text, from a file or an address: read, then imported or held
   for the choice when its id is already on the device. */
function v27TakePack(text) {
  var api = v27Api();
  var st = v27State();
  if (!api) return Promise.resolve(null);
  st.error = ''; st.added = null; st.pending = null;
  var read = null;
  try { read = api.readPack(text); } catch (e) { read = null; }
  if (!read || !read.ok) { st.error = (read && read.said) || 'That file is not a house pack.'; render(); return Promise.resolve(null); }
  var twin = null;
  v27List().some(function (s) { if (s.id === read.house.id) { twin = s; return true; } return false; });
  if (twin) {
    st.pending = { text: text, read: read, name: read.house.name, id: read.house.id, intoName: twin.name };
    v27Say(read.house.name + ' is already on this device. Add it as a new house, or merge it into ' + twin.name + '.');
    render();
    return Promise.resolve(null);
  }
  return v27FinishImport(text, read, { mode: 'new' });
}

/* The address is fetched by this browser alone, on the press, never cached
   and never sent anywhere else; a relative address is accepted as it is. */
function v27Fetch(url) {
  var st = v27State();
  url = String(url || '').trim();
  if (!url) return Promise.resolve(null);
  if (typeof fetch !== 'function') { st.error = 'This browser cannot fetch an address from here.'; render(); return Promise.resolve(null); }
  st.busy = true; st.error = '';
  render();
  return fetch(url, { cache: 'reload' }).then(function (res) {
    if (!res.ok) { st.error = 'That address answered ' + res.status + ', not a pack.'; return null; }
    return res.text().then(function (text) { st.busy = false; return v27TakePack(text); });
  }).catch(function () { st.error = 'That address could not be fetched from here.'; return null; })
    .then(function (out) { if (st.busy) v27Done(); return out; });
}

function v27WireHouse(box) {
  var st = v27State();
  var api = v27Api();
  if (!api) return;
  var q = function (id) { return box.querySelector('#' + id); };
  var on = function (id, fn) { var b = q(id); if (b) b.onclick = fn; };
  var read = function (id) { var f = q(id); return f && typeof f.value === 'string' ? f.value : ''; };
  on('h27-switch-door', function () { v27Open('switch'); });
  on('h27-new-door', function () { v27Open('new'); });
  on('h27-import-door', function () { v27Open('import'); });
  on('h27-rename-door', function () { v27Open('rename'); });
  on('h27-export', function () { v27Export(); });
  var sel = q('h27-switch');
  if (sel) sel.onchange = function () { var id = sel.value; if (id && id !== v27CurrentId()) v27Switch(id); };
  on('h27-mint', function () { v27Mint(read('h27-new')); });
  on('h27-rename-go', function () { v27Rename(read('h27-rename')); });
  on('h27-fetch', function () { v27Fetch(read('h27-address')); });
  var file = q('h27-file');
  if (file) file.onchange = function () {
    var f = file.files && file.files[0];
    if (!f || typeof f.text !== 'function') return;
    f.text().then(function (text) { v27TakePack(text); })
      .catch(function () { st.error = 'That file could not be read.'; render(); });
  };
  on('h27-asnew', function () { if (st.pending) v27FinishImport(st.pending.text, st.pending.read, { mode: 'new' }); });
  on('h27-merge', function () { if (st.pending) v27FinishImport(st.pending.text, st.pending.read, { mode: 'merge', into: st.pending.id }); });
  on('h27-open', function () { if (st.added) v27Switch(st.added.id); });
  on('h27-notnow', function () { st.added = null; render(); });
}

function v27HouseView() {
  if (typeof v25Build === 'function') return v25Build(v27HouseHtml(), v27WireHouse);
  var box = document.createElement('div');
  box.innerHTML = v27HouseHtml();
  v27WireHouse(box);
  return box;
}

/* The row on Mine, and the view it opens. The view is drawn by codex25's
   render through V25_VIEWS, with its landmarks; a tree without codex25's
   registry gets the plain draw below. */
var V27_HOUSE_ROW = {
  key: 'house', name: 'The house',
  show: function () { return !!v27Api(); },
  line: function () { return v27Line(); },
  go: function () { S.view = 'house'; render(); }
};
if (typeof V25_MINE !== 'undefined' && V25_MINE && typeof V25_MINE.unshift === 'function') V25_MINE.unshift(V27_HOUSE_ROW);
if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO.house = V27_HOUSE_ROW.go;
if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA.house = 'mine';
if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB.house = 'mine';
if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.house = v27HouseView;

/* Every end of a drill (home, another start) and of the form (save, cancel)
   draws the next screen, so the render is where a kept sync is run. */
var _v27Render = render;
render = function () {
  var out;
  if (S.view === 'house' && !(typeof V25_VIEWS !== 'undefined' && V25_VIEWS && V25_VIEWS.house)) {
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    var app = document.getElementById('app');
    app.innerHTML = ''; app.appendChild(topbar()); app.appendChild(v27HouseView());
    window.scrollTo(0, 0);
  } else {
    out = _v27Render.apply(this, arguments);
  }
  try { v27Flush(); } catch (e) { }
  return out;
};

/* A rank switch resets the view like every other layer's views. */
var _v27ApplyLevel = (typeof applyLevel === 'function') ? applyLevel : null;
if (_v27ApplyLevel) {
  applyLevel = function (lvl, skipRender) {
    S._v27 = null;
    return _v27ApplyLevel(lvl, skipRender);
  };
}

/* =========== the boot =========== */

(function () {
  var api = v27Api();
  if (!api) return;
  V27_LAST = v27Sync();
  var key = api.HOUSE_INDEX_KEY || V27_INDEX_KEY;
  /* Another tab's write: the storage event on the house index runs the sync
     again. The engine listens to the same event and reloads its memory copy
     from the database before it says 'storage', so the sync is asked once
     more then, over the house as the device now holds it; a run already in
     flight takes the second ask as one more run after it. */
  try {
    if (typeof window !== 'undefined' && window && typeof window.addEventListener === 'function') {
      window.addEventListener('storage', function (e) {
        var k = e ? e.key : null;
        if (k === null || k === undefined || k === key) v27Sync();
      });
    }
  } catch (e) { }
  try {
    if (typeof api.onChange === 'function') api.onChange(function (h, what) { if (what === 'storage') v27Sync(); });
  } catch (e) { }
})();
