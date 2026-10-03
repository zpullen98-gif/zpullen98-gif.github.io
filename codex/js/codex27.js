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

   7. READ AND KEEP, NO KEY. The cellar form gains what the House holds on
      a wine beyond the nine fields (the profile, what it goes with, how it
      is served, the first picks among the house's dishes, the five parts
      under WINE_PARTS and the three timed lines with a live count against
      LINE_CAPS), each a mark with Keep and Discard in place and the typed
      value saved as the person's, and the service note as a textarea under
      the fixed eyebrow, written through setItemField after the bottle's own
      save and never onto the row. The list rows draw every mark on the
      house wine with Keep, Edit, Discard and Keep all per bottle. Mine
      gains Hers, to look over (the shared review screen under five step
      chips) and the house view draws the shared read view under its doors,
      both through OOT.houseUI with this file's hooks. KEPT MEANS by ===
      'person', and only a kept mark reaches a guest screen or a drill.

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

/* The one write queue. Every engine write (a mark, a put, a removal, the
   service note) and every sync runs behind the one before it, because the
   engine computes each commit over the house in memory and that copy moves
   only when its save resolves: two writes started in one tick would each be
   computed over the same base and the second save would overwrite the
   first. Keep all on a shared screen presses the hook once per mark in one
   loop, and a Keep can land while a wake is in flight; both go through
   here. Returns the job's own promise, so a caller may await it; the chain
   itself never rejects. */
var V27_WRITING = Promise.resolve();
function v27Write(fn) {
  var run = V27_WRITING.then(function () { return fn(); });
  V27_WRITING = run.then(function () { }, function () { });
  return run;
}

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
   over a form, a review run or a row editor open on the list: a half-typed
   bottle or line must not be lost to a sync that landed from another tab.
   The render that closes the editor is called by the editor's own Save or
   Cancel, not through here. */
function v27Redraw() {
  if (S.view === 'cellar' && (S._cellarForm || S._wimp || S._v27edit)) return;
  if (S.view === 'home' || S.view === 'mine' || S.view === 'cellar' || S.view === 'house' || S.view === 'housereview') {
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
  /* behind every write in flight, and every write asked after it waits */
  V27_SYNCING = v27Write(function () {
    if (v27Busy()) { V27_PENDING = true; return null; }
    return api.ready().then(function () {
      if (!api.current()) return null;
      return api.sync('wine', ST.cellar || []);
    }).then(function (res) {
      if (res) v27Apply(res);
      return res;
    });
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
  return v27Write(function () {
    return api.ready().then(function () {
      if (!api.current()) return null;
      return api.put('wine', rec);
    });
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
  return v27Write(function () {
    return api.ready().then(function () {
      if (!api.current()) return false;
      return api.removeItem('wine', id);
    });
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
    /* the house's fields, above the save row: marks and the service note */
    var houseHtml = v27FormHouseHtml(S._cellarEdit || '');
    var houseBox = null;
    var saveRow = save.parentNode;
    if (houseHtml && saveRow && saveRow.parentNode) {
      houseBox = el(houseHtml);
      saveRow.parentNode.insertBefore(houseBox, saveRow);
      v27WireForm(houseBox);
    }
    var orig = save.onclick;
    save.onclick = function () {
      var editId = S._cellarEdit;
      var before = (ST.cellar || []).length;
      var prior = editId ? v27BottleById(editId) : null;
      var priorHouse = prior && typeof prior.house === 'string' ? prior.house : '';
      /* read before the chain's save redraws the page */
      var typed = houseBox ? v27ReadForm(houseBox) : null;
      if (typeof orig === 'function') orig();
      var rec = editId ? v27BottleById(editId)
        : ((ST.cellar || []).length > before ? ST.cellar[ST.cellar.length - 1] : null);
      if (!rec) return;   /* the form refused the row and has already said so */
      if (priorHouse && !rec.house) { rec.house = priorHouse; stSave(); }
      /* the bottle first, then what the house holds on it, then the note */
      v27Put(rec).then(function () {
        if (!typed) return null;
        return v27SaveHouseFields(rec.id, typed);
      }).then(function () { v27RedrawSoon(); });
    };
  }

  /* her lines on the list rows, with Keep, Edit, Discard and Keep all */
  try { v27DecorateRows(v); } catch (e) { /* the list stands without them */ }

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
    if (v27UI()) html += '<div id="h27-read"></div>';
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
  v27WireRead(box);
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

/* =========== 6. read and keep: her lines on a bottle, the review, the read view ===========

   Everything the House holds on a wine beyond the nine fields (the floor
   lines say, guest, why, pairs and origin; the profile, what it goes with,
   how it is served, the first picks among the house's dishes, the five
   parts and the three timed lines) is a MARK: hers until a person keeps
   it, by === 'person' once kept, and only a kept mark reaches a guest
   screen or a drill. Every write goes through OOT.house.setMark; the one
   plain field, the service note, goes through OOT.house.setItemField AFTER
   the bottle's own save, and never onto ST.cellar: it is a person's words
   under the fixed eyebrow and no line of hers. The five floor lines also
   ride on the row under maitre (codex24), so a keep or a discard on one of
   them is written to the row as well, and the sync agrees on both sides.
   The form's own nine fields still go through cellarSanitize and nothing
   here adds a tenth. Nothing here reads or writes an allergen. */

function v27Lib() {
  try { return (typeof OOT !== 'undefined' && OOT && OOT.houseLib) ? OOT.houseLib : null; }
  catch (e) { return null; }
}

function v27UI() {
  try { return (typeof OOT !== 'undefined' && OOT && OOT.houseUI) ? OOT.houseUI : null; }
  catch (e) { return null; }
}

var V27_LINE_CAPS = { s10: 25, s20: 50, s45: 110 };
var V27_WINE_PARTS = { main: 'grape and region', technique: 'how it is made', sauce: 'the profile', sides: 'what it goes with', taste: 'how it tastes' };
var V27_PART_KEYS = ['main', 'technique', 'sauce', 'sides', 'taste'];
var V27_LINE_KEYS = ['s10', 's20', 's45'];
var V27_LINE_WORDS = { s10: 'Ten seconds', s20: 'Twenty seconds', s45: 'Forty five seconds' };
/* The five that also ride on the row under maitre. */
var V27_FLOOR = ['say', 'guest', 'why', 'pairs', 'origin'];
/* The one-box marks, in the order the list draws them. */
var V27_TEXT_MARKS = ['say', 'guest', 'why', 'pairs', 'origin', 'profile', 'goesWith', 'serve'];
/* The marks the form carries beside the nine fields. */
var V27_FORM_TEXT = ['profile', 'goesWith', 'serve'];
var V27_WINE_MARKS = ['say', 'guest', 'why', 'pairs', 'origin', 'profile', 'goesWith', 'firstPickIds', 'serve', 'parts', 'lines'];
var V27_LABELS = {
  say: 'How to say it', guest: 'The guest line', why: 'Why it is on the list', pairs: 'What it pairs with',
  origin: 'Where it comes from', profile: 'The profile', goesWith: 'What it goes with', serve: 'How it is served',
  firstPickIds: 'First pick for', parts: 'The five parts', lines: 'The timed lines'
};
var V27_NOTE_EYEBROW = 'Your words. Allergens: confirm at lineup.';
var V27_HERS = 'Hers, not yet kept';
var V27_KEPT = 'Kept';
var V27_NONE = 'Nothing yet';
var V27_NO_DISHES = 'No dishes in this house yet. The World Table files them.';
var V27_GONE = 'a dish no longer on the menu';
var V27_LIST_OF = { dish: 'dishes', wine: 'wines', cocktail: 'cocktails', lexicon: 'lexicon', scenarios: 'scenarios', mixUps: 'mixUps', mustKnows: 'mustKnows' };
var V27_STEPS = [['formula', 'The formula'], ['pairings', 'The pairings'], ['wines', 'The wines'], ['lexicon', 'The words'], ['scenarios', 'The table']];

function v27Caps() { var lib = v27Lib(); return (lib && lib.LINE_CAPS) || V27_LINE_CAPS; }
function v27WineParts() { var lib = v27Lib(); return (lib && lib.WINE_PARTS) || V27_WINE_PARTS; }

/* The engine's count and dash rule when it is here. With no engine there is
   no house and no mark, so the fallbacks are only ever asked about nothing. */
function v27Words(s) {
  var lib = v27Lib();
  if (lib && typeof lib.wordCount === 'function') return lib.wordCount(String(s == null ? '' : s));
  var m = String(s == null ? '' : s).match(/[A-Za-z0-9']+/g);
  return m ? m.length : 0;
}
function v27HasDash(s) {
  var lib = v27Lib();
  return !!(lib && typeof lib.hasDash === 'function' && lib.hasDash(String(s == null ? '' : s)));
}

function v27IsMark(m) {
  return !!(m && typeof m === 'object' && m.value !== undefined && m.value !== null && (m.by === 'maitre' || m.by === 'person'));
}
function v27Kept(m) { return v27IsMark(m) && m.by === 'person'; }

/* One item of the house by kind and id, or the card for 'house'. */
function v27ItemOf(kind, id) {
  var h = v27Current();
  if (!h) return null;
  if (kind === 'house') return h;
  var list = h[V27_LIST_OF[kind]];
  if (!Array.isArray(list)) return null;
  var hit = null;
  list.some(function (x) { if (x && x.id === id) { hit = x; return true; } return false; });
  return hit;
}
function v27Wine(id) { return id ? v27ItemOf('wine', id) : null; }

/* The house's dishes, by name, for the first-picks picker: the house's
   dishes and nothing else, since a first pick is a dish of this house. */
function v27Dishes() {
  var h = v27Current();
  if (!h || !Array.isArray(h.dishes)) return [];
  return h.dishes.filter(function (d) { return d && typeof d.id === 'string' && typeof d.name === 'string' && d.name; });
}
function v27DishName(id) {
  var hit = null;
  v27Dishes().some(function (d) { if (d.id === id) { hit = d.name; return true; } return false; });
  return hit || V27_GONE;
}

/* How many lines of hers wait, unkept, over the whole house. */
function v27Waiting() {
  var h = v27Current();
  if (!h) return 0;
  var n = 0;
  if (h.history && h.history.by === 'maitre') n++;
  Object.keys(V27_LIST_OF).forEach(function (kind) {
    var list = h[V27_LIST_OF[kind]];
    if (!Array.isArray(list)) return;
    list.forEach(function (item) {
      if (!item || typeof item !== 'object') return;
      Object.keys(item).forEach(function (k) { if (v27IsMark(item[k]) && item[k].by === 'maitre') n++; });
    });
  });
  return n;
}

/* ---- the write doors: every mark through setMark, the five floor lines onto the row too ---- */

function v27RowMark(id, field, mark) {
  var b = v27BottleById(id);
  if (!b) return;
  if (mark === null) {
    if (b.maitre && b.maitre[field]) {
      delete b.maitre[field];
      if (!Object.keys(b.maitre).length) delete b.maitre;
      stSave();
    }
    return;
  }
  if (!v27IsMark(mark) || typeof mark.value !== 'string') return;
  b.maitre = b.maitre || {};
  var m = { value: mark.value.slice(0, 4000), by: mark.by === 'person' ? 'person' : 'maitre', ts: Number(mark.ts) || Date.now() };
  if (typeof mark.model === 'string' && mark.model) m.model = mark.model.slice(0, 60);
  b.maitre[field] = m;
  stSave();
}

/* One mark onto the engine, and onto the row where the field is a floor
   line: run inside the write queue, so `make` reads the house as it stands
   when the write's turn comes, not as it stood when the chip was pressed.
   `make` returns the mark to write, null to discard, or undefined to write
   nothing. Resolves to the engine's answer, false when nothing was written. */
function v27WriteMark(kind, id, field, make) {
  var api = v27Api();
  if (!api || !kind || !id || !field) return Promise.resolve(false);
  return v27Write(function () {
    return api.ready().then(function () {
      var mark = make();
      if (mark === undefined) return false;
      if (kind === 'wine' && V27_FLOOR.indexOf(field) >= 0) v27RowMark(id, field, mark);
      return api.setMark(kind, id, field, mark);
    });
  }).catch(function () { return false; });
}

function v27SetMark(kind, id, field, mark) {
  return v27WriteMark(kind, id, field, function () { return mark; });
}

/* Keep: her value back with by 'person' and a fresh stamp. */
function v27Keep(kind, id, field) {
  return v27WriteMark(kind, id, field, function () {
    var item = v27ItemOf(kind, id);
    var m = item ? item[field] : null;
    if (!v27IsMark(m) || m.by === 'person') return undefined;
    var mark = { value: m.value, by: 'person', ts: Date.now() };
    if (typeof m.model === 'string' && m.model) mark.model = m.model;
    return mark;
  });
}

/* Edit then Save: the typed value, the person's. */
function v27Edit(kind, id, field, value) {
  return v27WriteMark(kind, id, field, function () {
    var item = v27ItemOf(kind, id);
    var prev = item ? item[field] : null;
    var mark = { value: value, by: 'person', ts: Date.now() };
    if (v27IsMark(prev) && typeof prev.model === 'string' && prev.model) mark.model = prev.model;
    return mark;
  });
}

function v27Discard(kind, id, field) { return v27SetMark(kind, id, field, null); }

/* Keep all on one item: every mark of hers, one after another. */
function v27KeepAll(kind, id) {
  var item = v27ItemOf(kind, id);
  if (!item) return Promise.resolve(0);
  var fields = Object.keys(item).filter(function (k) { return v27IsMark(item[k]) && item[k].by === 'maitre'; });
  var n = 0;
  return fields.reduce(function (p, f) {
    return p.then(function () { return v27Keep(kind, id, f); }).then(function (ok) { if (ok) n++; });
  }, Promise.resolve()).then(function () { return n; });
}

/* The problems the shared screens ask about: the item's timed lines against
   LINE_CAPS, by the engine's own count, each as { field, said }. */
function v27Problems(kind, id) {
  var lib = v27Lib();
  var item = v27ItemOf(kind, id);
  if (!lib || typeof lib.lineProblems !== 'function' || !item || !v27IsMark(item.lines)) return [];
  var found = [];
  try { found = lib.lineProblems(item.lines.value, v27Caps()) || []; } catch (e) { found = []; }
  return found.map(function (p) {
    return { field: 'lines', said: (V27_LINE_WORDS[p.field] || p.field) + ': ' + p.words + ' of ' + p.cap + ' words' };
  });
}

/* The hooks the two shared screens take, as their header describes them.
   Each write returns its promise, so a screen may await it; the queue
   behind it keeps Keep all's loop of presses in order. */
function v27Hooks() {
  return {
    setMark: function (kind, id, field, mark) { return v27SetMark(kind, id, field, mark); },
    discard: function (kind, id, field) { return v27Discard(kind, id, field); },
    problems: function (kind, id) { return v27Problems(kind, id); }
  };
}

/* ---- the words a count and a state are drawn in ---- */

function v27CountText(key, text) {
  var n = v27Words(text);
  var cap = v27Caps()[key];
  return n + ' of ' + cap + ' words' + (n > cap ? '. Over its cap' : '');
}

function v27StateWord(m) { return v27IsMark(m) ? (m.by === 'person' ? V27_KEPT : V27_HERS) : V27_NONE; }

function v27Chip(act, id, field, text, kind) {
  return '<button class="btn small ghost" type="button" data-h27="' + act + '" data-kind="' + v27Esc(kind || 'wine')
    + '" data-id="' + v27Esc(id) + '" data-field="' + v27Esc(field) + '">' + text + '</button>';
}

/* The chips a mark gets: Keep while it is hers, Edit and Discard while it exists. */
function v27MarkChips(id, field, m, frozen) {
  if (!v27IsMark(m) || frozen) return '';
  return (m.by === 'person' ? '' : v27Chip('keep', id, field, 'Keep'))
    + v27Chip('edit', id, field, 'Edit') + v27Chip('discard', id, field, 'Discard');
}

/* A mark's value as one line of text. */
function v27MarkText(field, m) {
  if (!v27IsMark(m)) return '';
  var v = m.value;
  if (field === 'parts' && v && typeof v === 'object') {
    var parts = v27WineParts();
    return V27_PART_KEYS.filter(function (k) { return v[k]; }).map(function (k) { return parts[k] + ': ' + v[k]; }).join(' · ');
  }
  if (field === 'lines' && v && typeof v === 'object') {
    return V27_LINE_KEYS.filter(function (k) { return v[k]; }).map(function (k) {
      return V27_LINE_WORDS[k] + ' (' + v27CountText(k, v[k]) + '): ' + v[k];
    }).join(' · ');
  }
  if (field === 'firstPickIds' && Array.isArray(v)) return v.map(v27DishName).join(', ');
  return typeof v === 'string' ? v : '';
}

/* ---- the cellar form: the house's fields beside the nine ---- */

function v27FormTextHtml(id, field, m) {
  var val = v27IsMark(m) && typeof m.value === 'string' ? m.value : '';
  return '<div class="h27-mark" data-h27-mark="' + field + '">'
    + '<div class="mline"><label class="lvltag" for="cl-h-' + field + '">' + V27_LABELS[field] + '</label>'
    + '<span class="mline-eyebrow" data-h27-state="' + field + '">' + v27StateWord(m) + '</span>'
    + v27MarkChips(id, field, m, false) + '</div>'
    + '<textarea class="sainput" id="cl-h-' + field + '" rows="2">' + v27Esc(val) + '</textarea></div>';
}

function v27FormPicksHtml(id, m) {
  var picked = v27IsMark(m) && Array.isArray(m.value) ? m.value : [];
  var dishes = v27Dishes();
  var html = '<fieldset class="h27-mark" data-h27-mark="firstPickIds"><legend class="mline"><span class="lvltag">' + V27_LABELS.firstPickIds + '</span>'
    + '<span class="mline-eyebrow" data-h27-state="firstPickIds">' + v27StateWord(m) + '</span>'
    + v27MarkChips(id, 'firstPickIds', m, false) + '</legend>';
  if (!dishes.length) html += '<div class="sub">' + V27_NO_DISHES + '</div>';
  else html += '<div class="sarow">' + dishes.map(function (d) {
    return '<label class="h27-pick"><input type="checkbox" data-cl-pick="' + v27Esc(d.id) + '"'
      + (picked.indexOf(d.id) >= 0 ? ' checked' : '') + '> ' + v27Esc(d.name) + '</label>';
  }).join('') + '</div>';
  return html + '</fieldset>';
}

function v27FormPartsHtml(id, m) {
  var v = v27IsMark(m) && m.value && typeof m.value === 'object' ? m.value : {};
  var parts = v27WineParts();
  return '<fieldset class="h27-mark" data-h27-mark="parts"><legend class="mline"><span class="lvltag">' + V27_LABELS.parts + '</span>'
    + '<span class="mline-eyebrow" data-h27-state="parts">' + v27StateWord(m) + '</span>'
    + v27MarkChips(id, 'parts', m, false) + '</legend>'
    + V27_PART_KEYS.map(function (k) {
      return '<div class="sarow"><label class="lvltag" for="cl-h-part-' + k + '" style="min-width:86px;display:inline-block">' + parts[k] + '</label>'
        + '<input class="sainput" id="cl-h-part-' + k + '" data-cl-part="' + k + '" value="' + v27Esc(v[k] || '') + '"></div>';
    }).join('') + '</fieldset>';
}

function v27FormLinesHtml(id, m) {
  var v = v27IsMark(m) && m.value && typeof m.value === 'object' ? m.value : {};
  return '<fieldset class="h27-mark" data-h27-mark="lines"><legend class="mline"><span class="lvltag">' + V27_LABELS.lines + '</span>'
    + '<span class="mline-eyebrow" data-h27-state="lines">' + v27StateWord(m) + '</span>'
    + v27MarkChips(id, 'lines', m, false) + '</legend>'
    + V27_LINE_KEYS.map(function (k) {
      return '<div class="mline"><label class="lvltag" for="cl-h-line-' + k + '">' + V27_LINE_WORDS[k] + '</label>'
        + '<span class="mline-eyebrow" data-h27-count="' + k + '">' + v27CountText(k, v[k] || '') + '</span></div>'
        + '<textarea class="sainput" id="cl-h-line-' + k + '" data-cl-line="' + k + '" rows="2">' + v27Esc(v[k] || '') + '</textarea>';
    }).join('') + '</fieldset>';
}

/* The block the form gains, or nothing when there is no engine or no house.
   A new bottle has no item yet, so it gets the boxes and no chips. */
function v27FormHouseHtml(id) {
  var api = v27Api();
  if (!api || !v27Current()) return '';
  var item = id ? v27Wine(id) : null;
  var m = function (f) { return item ? item[f] : null; };
  var note = item && typeof item.serviceNote === 'string' ? item.serviceNote : '';
  return '<div class="h27 h27-form" id="cl-house">'
    + '<div class="secgroup">On the house</div>'
    + V27_FORM_TEXT.map(function (f) { return v27FormTextHtml(id, f, m(f)); }).join('')
    + v27FormPicksHtml(id, m('firstPickIds'))
    + v27FormPartsHtml(id, m('parts'))
    + v27FormLinesHtml(id, m('lines'))
    + '<div class="h27-mark" data-h27-mark="serviceNote"><div class="mline"><span class="mline-eyebrow">' + V27_NOTE_EYEBROW + '</span></div>'
    + '<textarea class="sainput" id="cl-h-note" rows="3">' + v27Esc(note) + '</textarea></div>'
    + '</div>';
}

/* What the form holds, read before the chain's save rebuilds the page. */
function v27ReadForm(box) {
  var q = function (sel) { return box && typeof box.querySelector === 'function' ? box.querySelector(sel) : null; };
  var val = function (sel) { var e = q(sel); return e && typeof e.value === 'string' ? e.value : ''; };
  var typed = { parts: {}, lines: {}, firstPickIds: [] };
  V27_FORM_TEXT.forEach(function (f) { typed[f] = val('#cl-h-' + f); });
  V27_PART_KEYS.forEach(function (k) { typed.parts[k] = val('#cl-h-part-' + k); });
  V27_LINE_KEYS.forEach(function (k) { typed.lines[k] = val('#cl-h-line-' + k); });
  var picks = box && typeof box.querySelectorAll === 'function' ? box.querySelectorAll('[data-cl-pick]') : [];
  Array.prototype.forEach.call(picks || [], function (c) {
    if (c && c.checked) typed.firstPickIds.push(c.getAttribute('data-cl-pick'));
  });
  typed.serviceNote = val('#cl-h-note');
  return typed;
}

function v27Trim(s) { return String(s == null ? '' : s).trim(); }
function v27SameJson(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

/* The typed values onto the house, after the bottle's own save: a changed
   value is the person's, an unchanged one stays whatever it was, an emptied
   one goes; a key the caller did not hand over is not touched. The note is
   the one plain field and goes through setItemField, never onto the row. */
function v27SaveHouseFields(id, typed) {
  var api = v27Api();
  if (!api || !id || !typed) return Promise.resolve(false);
  var item = v27Wine(id);
  if (!item) return Promise.resolve(false);
  var steps = [];
  var mark = function (field, value, empty) {
    var had = item[field];
    if (empty) { if (v27IsMark(had)) steps.push(function () { return v27Discard('wine', id, field); }); return; }
    if (!v27IsMark(had) || !v27SameJson(had.value, value)) steps.push(function () { return v27Edit('wine', id, field, value); });
  };
  V27_FORM_TEXT.forEach(function (f) {
    if (typeof typed[f] !== 'string') return;
    var v = v27Trim(typed[f]);
    mark(f, v, !v);
  });
  if (Array.isArray(typed.firstPickIds)) {
    var ok = v27Dishes().map(function (d) { return d.id; });
    var picks = typed.firstPickIds.filter(function (x) { return ok.indexOf(x) >= 0; });
    mark('firstPickIds', picks, !picks.length);
  }
  if (typed.parts && typeof typed.parts === 'object') {
    var parts = {}, anyPart = false;
    V27_PART_KEYS.forEach(function (k) { parts[k] = v27Trim(typed.parts[k]); if (parts[k]) anyPart = true; });
    mark('parts', parts, !anyPart);
  }
  if (typed.lines && typeof typed.lines === 'object') {
    var lines = {}, anyLine = false;
    V27_LINE_KEYS.forEach(function (k) { lines[k] = v27Trim(typed.lines[k]); if (lines[k]) anyLine = true; });
    mark('lines', lines, !anyLine);
  }
  if (typeof typed.serviceNote === 'string') {
    var note = v27Trim(typed.serviceNote);
    if (note !== (typeof item.serviceNote === 'string' ? item.serviceNote : '')) {
      steps.push(function () {
        return v27Write(function () {
          return api.ready().then(function () { return api.setItemField('wine', id, { serviceNote: note }); });
        }).catch(function () { return false; });
      });
    }
  }
  return steps.reduce(function (p, fn) { return p.then(fn); }, Promise.resolve()).then(function () { return true; });
}

/* A short said line under one mark block of the form, replaced on the next. */
function v27FormSaid(block, text) {
  if (!block || !block.querySelector) { v27Say(text); return; }
  var said = block.querySelector('[data-h27-said]');
  if (!said) {
    said = el('<p class="mline-eyebrow" data-h27-said="1" role="status"></p>');
    block.appendChild(said);
  }
  said.textContent = text;
  v27Say(text);
}

/* A chip pressed inside the open form: the press shows in place, because
   the form is never redrawn under the person's typing. */
function v27FormChip(box, btn) {
  var act = btn.getAttribute('data-h27');
  var id = btn.getAttribute('data-id');
  var field = btn.getAttribute('data-field');
  var block = btn.closest ? btn.closest('[data-h27-mark]') : null;
  var state = block && block.querySelector ? block.querySelector('[data-h27-state]') : null;
  if (act === 'keep') {
    /* the state word moves when the engine has answered, not before: the
       write can be refused (no item yet, another house switched in) */
    var had = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Keeping';
    v27Keep('wine', id, field).then(function (ok) {
      if (ok) {
        if (state) state.textContent = V27_KEPT;
        if (btn.parentNode) btn.parentNode.removeChild(btn);
        v27Say('Kept.');
        return;
      }
      btn.disabled = false;
      btn.textContent = had;
      v27FormSaid(block, 'Not kept. Save the bottle first, then keep her line.');
    });
  } else if (act === 'discard') {
    v27Discard('wine', id, field);
    if (block) {
      Array.prototype.forEach.call(block.querySelectorAll('textarea, input[type=text], input:not([type])'), function (f) { f.value = ''; });
      Array.prototype.forEach.call(block.querySelectorAll('[data-cl-pick]'), function (c) { c.checked = false; });
      Array.prototype.forEach.call(block.querySelectorAll('[data-h27-count]'), function (c) { c.textContent = v27CountText(c.getAttribute('data-h27-count'), ''); });
      Array.prototype.forEach.call(block.querySelectorAll('[data-h27]'), function (c) { if (c.parentNode) c.parentNode.removeChild(c); });
    }
    if (state) state.textContent = V27_NONE;
    v27Say('Discarded.');
  } else if (act === 'edit') {
    var first = block && block.querySelector ? block.querySelector('textarea, input') : null;
    if (first && typeof first.focus === 'function') first.focus();
  }
}

function v27WireForm(box) {
  if (!box || typeof box.addEventListener !== 'function') return;
  box.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-h27]') : null;
    if (!b) return;
    e.preventDefault();
    v27FormChip(box, b);
  });
  box.addEventListener('input', function (e) {
    var t = e.target;
    if (!t || !t.getAttribute) return;
    var k = t.getAttribute('data-cl-line');
    if (!k) return;
    var c = box.querySelector('[data-h27-count="' + k + '"]');
    if (c) c.textContent = v27CountText(k, t.value);
  });
}

/* ---- the list rows: her lines, with Keep, Edit, Discard and Keep all ---- */

/* S._v27edit = { id, field } while one row's mark is being edited on the list. */
function v27RowEditorHtml(id, field, m) {
  var v = v27IsMark(m) ? m.value : '';
  var html = '<div class="h27-editor" data-h27-editor="' + field + '">';
  if (field === 'parts') {
    var parts = v27WineParts();
    var pv = v && typeof v === 'object' ? v : {};
    html += V27_PART_KEYS.map(function (k) {
      return '<div class="sarow"><label class="lvltag" for="h27-e-' + k + '" style="min-width:86px;display:inline-block">' + parts[k] + '</label>'
        + '<input class="sainput" id="h27-e-' + k + '" data-h27-e="' + k + '" value="' + v27Esc(pv[k] || '') + '"></div>';
    }).join('');
  } else if (field === 'lines') {
    var lv = v && typeof v === 'object' ? v : {};
    html += V27_LINE_KEYS.map(function (k) {
      return '<div class="mline"><label class="lvltag" for="h27-e-' + k + '">' + V27_LINE_WORDS[k] + '</label>'
        + '<span class="mline-eyebrow" data-h27-count="' + k + '">' + v27CountText(k, lv[k] || '') + '</span></div>'
        + '<textarea class="sainput" id="h27-e-' + k + '" data-h27-e="' + k + '" data-cl-line="' + k + '" rows="2">' + v27Esc(lv[k] || '') + '</textarea>';
    }).join('');
  } else if (field === 'firstPickIds') {
    var picked = Array.isArray(v) ? v : [];
    var dishes = v27Dishes();
    html += dishes.length ? '<div class="sarow">' + dishes.map(function (d) {
      return '<label class="h27-pick"><input type="checkbox" data-cl-pick="' + v27Esc(d.id) + '"' + (picked.indexOf(d.id) >= 0 ? ' checked' : '') + '> ' + v27Esc(d.name) + '</label>';
    }).join('') + '</div>' : '<div class="sub">' + V27_NO_DISHES + '</div>';
  } else {
    html += '<label class="sr-only" for="h27-e-value">' + V27_LABELS[field] + '</label>'
      + '<textarea class="sainput" id="h27-e-value" data-h27-e="value" rows="2">' + v27Esc(typeof v === 'string' ? v : '') + '</textarea>';
  }
  return html + '<div class="mline">' + v27Chip('save', id, field, 'Save') + v27Chip('cancel', id, field, 'Cancel') + '</div></div>';
}

function v27RowLinesHtml(b, item, frozen) {
  if (!b || !item) return '';
  var editing = S._v27edit && S._v27edit.id === b.id ? S._v27edit.field : null;
  var html = '', hers = 0;
  V27_WINE_MARKS.forEach(function (f) {
    var m = item[f];
    if (!v27IsMark(m)) return;
    if (m.by === 'maitre') hers++;
    if (editing === f && !frozen) { html += v27RowEditorHtml(b.id, f, m); return; }
    html += '<div class="mline" data-h27-row="' + f + '"><span class="lvltag">' + V27_LABELS[f] + '</span>'
      + '<span>' + v27Esc(v27MarkText(f, m)) + '</span>'
      + '<span class="mline-eyebrow">' + v27StateWord(m) + '</span>'
      + v27MarkChips(b.id, f, m, frozen) + '</div>';
  });
  if (!html) return '';
  if (hers && !frozen) html += '<div class="mline">' + v27Chip('keep-all', b.id, '', 'Keep all on this bottle') + '</div>';
  return '<div class="h27 h27-rows">' + html + '</div>';
}

function v27ReadRowEditor(ed, field) {
  var val = function (k) { var e = ed.querySelector('[data-h27-e="' + k + '"]'); return e && typeof e.value === 'string' ? v27Trim(e.value) : ''; };
  var out, any = false;
  if (field === 'parts') {
    out = {};
    V27_PART_KEYS.forEach(function (k) { out[k] = val(k); if (out[k]) any = true; });
    return any ? out : undefined;
  }
  if (field === 'lines') {
    out = {};
    V27_LINE_KEYS.forEach(function (k) { out[k] = val(k); if (out[k]) any = true; });
    return any ? out : undefined;
  }
  if (field === 'firstPickIds') {
    out = [];
    Array.prototype.forEach.call(ed.querySelectorAll('[data-cl-pick]'), function (c) { if (c && c.checked) out.push(c.getAttribute('data-cl-pick')); });
    return out.length ? out : undefined;
  }
  var v = val('value');
  return v ? v : undefined;
}

function v27RowClick(v, e) {
  var b = e.target && e.target.closest ? e.target.closest('[data-h27]') : null;
  if (!b) return;
  var act = b.getAttribute('data-h27');
  var id = b.getAttribute('data-id');
  var field = b.getAttribute('data-field');
  var rec = v27BottleById(id);
  if (!rec) return;
  e.preventDefault();
  var after = function (said) { S._v27edit = null; if (said) v27Say(said); render(); };
  if (act === 'keep') { v27Keep('wine', id, field).then(function () { after('Kept on ' + bottleLabel(rec) + '.'); }); }
  else if (act === 'discard') { v27Discard('wine', id, field).then(function () { after('Discarded. ' + bottleLabel(rec) + ' keeps only what you kept.'); }); }
  else if (act === 'keep-all') { v27KeepAll('wine', id).then(function (n) { after(v27Plural(n, 'line', 'lines') + ' kept on ' + bottleLabel(rec) + '.'); }); }
  else if (act === 'edit') { S._v27edit = { id: id, field: field }; render(); }
  else if (act === 'cancel') { after(''); }
  else if (act === 'save') {
    var ed = v.querySelector('[data-h27-editor="' + field + '"]');
    var value = ed ? v27ReadRowEditor(ed, field) : undefined;
    if (value === undefined) { v27Discard('wine', id, field).then(function () { after('Discarded.'); }); return; }
    v27Edit('wine', id, field, value).then(function () { after('Saved on ' + bottleLabel(rec) + '.'); });
  }
}

function v27DecorateRows(v) {
  var api = v27Api();
  if (!api || !v27Current()) return;
  var frozen = !!(S._wimp || S._cellarForm);
  var any = false;
  (ST.cellar || []).forEach(function (b) {
    if (!b || !b.id) return;
    var item = v27Wine(b.id);
    if (!item) return;
    var edit = v.querySelector('[data-cl-edit="' + b.id + '"]');
    var lines = v27RowLinesHtml(b, item, frozen);
    if (!edit || !lines) return;
    var row = edit.parentNode;
    if (!row || !row.parentNode) return;
    /* codex24 drew say and guest here already; this block draws them with the rest */
    var prev = row.previousSibling;
    if (prev && prev.querySelector && prev.querySelector('.mline')) row.parentNode.removeChild(prev);
    row.parentNode.insertBefore(el(lines), row);
    any = true;
  });
  if (any && typeof v.addEventListener === 'function') {
    v.addEventListener('click', function (e) { v27RowClick(v, e); });
    v.addEventListener('input', function (e) {
      var t = e.target;
      if (!t || !t.getAttribute) return;
      var k = t.getAttribute('data-cl-line');
      if (!k) return;
      var c = v.querySelector('[data-h27-count="' + k + '"]');
      if (c) c.textContent = v27CountText(k, t.value);
    });
  }
}

/* ---- the review: hers, to look over, one step at a time ---- */

function v27ReviewState() {
  if (!S._v27rev) S._v27rev = { step: 'formula' };
  return S._v27rev;
}

function v27ReviewLine() {
  var n = v27Waiting();
  return n ? v27Plural(n, 'line', 'lines') + ' of hers to look over' : 'nothing of hers waits';
}

function v27ReviewHtml() {
  var st = v27ReviewState();
  var api = v27Api();
  var html = '<div class="v25page"><div class="viewhead"><h2>Hers, to look over</h2>'
    + '<div class="sub">' + v27Esc(v27HouseLine()) + '</div></div>';
  if (!api || !v27UI()) {
    html += '<div class="sub">This copy of the Codex carries no House: the shared engine is not in this build.</div></div>';
    return html;
  }
  html += '<div class="sarow h27" role="group" aria-label="Which step to look over">'
    + V27_STEPS.map(function (s) {
      return '<button class="btn ghost" type="button" data-h27-step="' + s[0] + '" aria-pressed="' + (st.step === s[0] ? 'true' : 'false') + '">' + s[1] + '</button>';
    }).join('') + '</div>'
    + '<div id="h27-review"></div></div>';
  return html;
}

function v27WireReview(box) {
  var st = v27ReviewState();
  Array.prototype.forEach.call(box.querySelectorAll('[data-h27-step]'), function (b) {
    b.onclick = function () { st.step = b.getAttribute('data-h27-step'); render(); };
  });
  var root = box.querySelector('#h27-review');
  var ui = v27UI();
  var h = v27Current();
  if (!root || !ui) return;
  try { ui.review(root, h, st.step, v27Hooks()); } catch (e) { /* the page must never go dark for a review */ }
}

function v27ReviewView() {
  if (typeof v25Build === 'function') return v25Build(v27ReviewHtml(), v27WireReview);
  var box = document.createElement('div');
  box.innerHTML = v27ReviewHtml();
  v27WireReview(box);
  return box;
}

var V27_REVIEW_ROW = {
  key: 'housereview', name: 'Hers, to look over',
  show: function () { return !!(v27Api() && v27UI()); },
  line: function () { return v27ReviewLine(); },
  go: function () { S.view = 'housereview'; render(); }
};
if (typeof V25_MINE !== 'undefined' && V25_MINE && typeof V25_MINE.splice === 'function') V25_MINE.splice(1, 0, V27_REVIEW_ROW);
if (typeof V25_GO !== 'undefined' && V25_GO) V25_GO.housereview = V27_REVIEW_ROW.go;
if (typeof V25_AREA !== 'undefined' && V25_AREA) V25_AREA.housereview = 'mine';
if (typeof V25_HUB !== 'undefined' && V25_HUB) V25_HUB.housereview = 'mine';
if (typeof V25_VIEWS !== 'undefined' && V25_VIEWS) V25_VIEWS.housereview = v27ReviewView;

/* ---- the read view under the house view's doors ---- */

function v27WireRead(box) {
  var root = box.querySelector('#h27-read');
  var ui = v27UI();
  var h = v27Current();
  if (!root || !ui || !h) return;
  try { ui.readView(root, h, v27Hooks()); } catch (e) { /* the doors still stand */ }
}

/* The house arrives again after any write: the screens that show it are
   drawn once more, coalesced, and never over an open form (v27Redraw). */
var V27_REDRAW_T = null;
function v27RedrawSoon() {
  if (V27_REDRAW_T) return;
  V27_REDRAW_T = setTimeout(function () { V27_REDRAW_T = null; v27Redraw(); }, 0);
}

/* Every end of a drill (home, another start) and of the form (save, cancel)
   draws the next screen, so the render is where a kept sync is run. */
var _v27Render = render;
render = function () {
  var out;
  var own = { house: v27HouseView, housereview: v27ReviewView };
  if (own[S.view] && !(typeof V25_VIEWS !== 'undefined' && V25_VIEWS && V25_VIEWS[S.view])) {
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    var app = document.getElementById('app');
    app.innerHTML = ''; app.appendChild(topbar()); app.appendChild(own[S.view]());
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
    if (typeof api.onChange === 'function') {
      api.onChange(function (h, what) {
        if (what === 'storage') { v27Sync(); return; }
        if (what === 'sync' || what === 'put') return;   /* those screens were drawn by the save itself */
        v27RedrawSoon();
      });
    }
  } catch (e) { }
})();
