/* ---------------- THE HOUSE: the venue's own record, shared by the wings ----------------

   The House is one record per venue (its card, its dishes, wines and
   cocktails with the marks a person kept, its words and its scenarios),
   kept in the browser by the shared engine, ../shared/oot-house.js, and read
   by the three craft wings. The Ledger's menu, progress.bar, is a PROJECTION
   of the House's cocktails: the engine keeps the two in step (OOT.house.sync)
   and this file writes what the engine hands back through the Ledger's own
   doors, saveBarRecord and removeBarRecord, and nowhere else, so a record
   that reaches the list from the House has passed the same shape pass as one
   typed in. tools/check-house-wiring.mjs holds that: no write of progress.bar
   outside the doors it names.

   LOADS WITH NO ENGINE AND DOES NOTHING THEN. The standalone Ledger has no
   shared folder, so every read of the engine is behind houseHere(), which is
   typeof OOT !== 'undefined' && OOT.house, read at call time and never at
   load. With no engine: no line on Mine, no sync, no put, no listener's
   work, every count as it was. On the suite the wing shell loads the engine
   before this file.

   WHAT IS WRITTEN WHERE. Projection first, House second, everywhere: a
   person's save reaches progress.bar through saveBarRecord, which then calls
   housePut; the Remove act calls removeBarRecord, then houseRemove. The wake
   (houseSyncIn) is the other direction, the House telling the list, and its
   writes carry the engine's own id and stamp through saveBarRecord's licence
   (opts.id, opts.ts), so the two sides share one key and one stamp and the
   next wake has nothing to say. A wake never calls housePut back: the engine
   has just saved its side.

   THE SRS CARD IS KEYED BY NAME, 'My Bar · name', so a re-key by the House
   (a name twin, or an id its key sweep refuses) goes through saveBarRecord
   with the old id as the record being edited, the door that moves the card
   to the new name; and a switch of house removes the outgoing rows with
   keepCard, because a switch is not a delete. The orphan sweep in
   dataImport spares a card whose name is on ANY house on the device, read
   through houseNames(), a synchronous copy of the engine's names, refreshed
   on every change the engine reports.

   KEPT MEANS by === 'person', here as on every wing. A kept lines mark on a
   house item (the ten, twenty and forty five second lines) is what makes a
   spec-less house drink a card: isHouseCard(d) is hasSpec(d) ||
   hasKeptLines(d), and the three line modes on the flashcards deal exactly
   the drinks with a kept line. An unkept mark reaches no deck.

   NOBODY IS NAMED HERE, NO PROSE CARRIES A DASH, AND THE WORDS ARE BRITISH. */

/* ---- the engine, read at call time ------------------------------------ */
function houseHere(){
  return (typeof OOT !== 'undefined' && OOT && OOT.house) ? OOT.house : null;
}

/* The screen's own state on Mine: which panel is open, the three boxes, the
   sentence to show, a pack read and waiting on a choice, a house just added.
   Made here rather than in engine.js so the whole feature is one file. */
function houseBlankState(){
  return { panel:'', name:'', renameTo:'', address:'', err:'', live:'', pending:null, added:null, busy:false };
}
if(typeof state !== 'undefined' && state && !state.house) state.house = houseBlankState();

/* The eight build steps in the words a person would use for "next". Steps
   are named, never numbered, as the levels are. */
var HOUSE_STEP_WORDS = { card:'the house card', menus:'the menus', filed:'review and file', formula:'the formula',
  pairings:'the pairings', wines:'the wines', lexicon:'the words', scenarios:'the table' };
var HOUSE_NO_HOUSE_LINE = 'No house yet. Your menu belongs to a house: import a pack, or start one.';
var HOUSE_INDEX_KEY_NAME = 'oot-houses-v1';

/* ---- the synchronous copy of the engine's names, for the orphan sweep --- */
var houseNamesCache = null;
function houseNames(){ return houseNamesCache ? houseNamesCache.slice() : []; }
function houseNamesRefresh(){
  const api = houseHere();
  if(!api) return Promise.resolve([]);
  return api.ready().then(function(){ return api.names('cocktail'); })
    .then(function(names){ houseNamesCache = names.slice(); return houseNames(); })
    .catch(function(){ return houseNames(); });
}

/* ---- the current house's item for a record, and its kept lines ---------- */
function houseItemFor(id){
  const api = houseHere();
  const h = api ? api.current() : null;
  if(!h || !id) return null;
  return (h.cocktails || []).find(function(c){ return c.id === id; }) || null;
}
/* d is a deck card (with ref) or a raw bar record; the lines are the mark's
   value only when the mark is a person's */
function keptLinesOf(d){
  const b = d && d.ref ? d.ref : d;
  if(!b || !b.id) return null;
  const item = houseItemFor(b.id);
  const m = item && item.lines;
  if(!m || m.by !== 'person' || !m.value || typeof m.value !== 'object') return null;
  return m.value;
}
function keptLineOf(d, key){
  const lines = keptLinesOf(d);
  const v = lines && lines[key];
  return typeof v === 'string' && v.trim() ? v : '';
}
function hasKeptLines(d){
  const lines = keptLinesOf(d);
  return !!(lines && ['s10','s20','s45'].some(function(k){ return typeof lines[k] === 'string' && lines[k].trim(); }));
}
/* A house drink is a card when it has a spec, or when a person kept a line
   for it: a line-only draft is dealt by the line modes and by nothing that
   needs a ticket. hasSpec is ui-study.js's own rule. */
function isHouseCard(d){
  return !!(hasSpec(d) || hasKeptLines(d));
}

/* The line modes' labels and the second each asks for, keyed the way the
   mark keeps them, so a mode's key is the lines' key. */
var HOUSE_LINE_MODES = { line10:['s10','ten seconds'], line20:['s20','twenty seconds'], line45:['s45','forty five seconds'] };

/* A quiz question off a kept line: which of four lines is this drink's.
   Decoys are other kept lines on the house first, then other drinks' notes
   off the list and the canon; three are needed, or no question is dealt. */
function qMyBarLine(b){
  const lines = keptLinesOf(b);
  if(!lines) return null;
  const key = ['s10','s20','s45'].find(function(k){ return typeof lines[k] === 'string' && lines[k].trim(); });
  if(!key) return null;
  const ans = lines[key].trim();
  const seen = { }; seen[ans] = true;
  const pool = [];
  const take = function(t){ t = (t || '').trim(); if(t && !seen[t]){ seen[t] = true; pool.push(t); } };
  (progress.bar || []).forEach(function(x){
    if(x.id === b.id) return;
    const l = keptLinesOf(x);
    if(l) ['s10','s20','s45'].forEach(function(k){ take(l[k]); });
  });
  const own = pool.slice();
  (progress.bar || []).forEach(function(x){ if(x.id !== b.id) take(x.note); });
  if(typeof COCKTAILS !== 'undefined') COCKTAILS.forEach(function(c){ take(c.note); });
  const decoys = sample(own, 3).concat(sample(pool.filter(function(t){ return own.indexOf(t) < 0; }), 3)).slice(0, 3);
  if(decoys.length < 3) return null;
  const secs = { s10:'ten seconds', s20:'twenty seconds', s45:'forty five seconds' }[key];
  return { prompt:'Which is the line for ' + b.name + ' on your menu, said in ' + secs + '?',
    options: shuffle([ans].concat(decoys)), answer: ans,
    explain: b.name + ': ' + ans };
}

/* ---- the rows the engine reads, and the form it writes back ------------- */
/* A record as the engine should read it: the glass and garnish placeholder
   read as empty (the engine reads the dash the same way, and never writes
   it), so a wake over an unchanged list has nothing to say. */
function houseRowOf(b){
  const row = Object.assign({}, b);
  row.glass = barText(b.glass);
  row.garnish = barText(b.garnish);
  return row;
}
function houseRows(){
  return (progress.bar || []).map(houseRowOf);
}
/* A row the engine hands back, as the form saveBarRecord takes: every named
   field, the house, and the block whole (null when the row has none, which
   is the engine's word that nothing of hers is on the row). */
function houseRowForm(row){
  return { name: row.name, spec: Array.isArray(row.spec) ? row.spec.slice() : [],
    method: row.method || '', glass: row.glass || '', garnish: row.garnish || '', note: row.note || '',
    family: row.family || 'Other', spirit: row.spirit || 'Other', price: row.price || '',
    house: row.house || '', maitre: row.maitre ? row.maitre : null };
}

/* While the engine's rows are being written back, saveBarRecord's own call
   to housePut is stood down: the engine has just saved its side. */
var houseApplying = false;
/* The house the list was last brought into step with, so a pointer moved by
   another tab is told from a change inside the same house. */
var houseSyncedTo = null;

/* Every change the engine reports, through the doors. Returns the refusals
   in words, if any door refused. */
function houseApplyChanges(out){
  const byId = {};
  out.rows.forEach(function(r){ byId[r.id] = r; });
  const said = [];
  const file = function(form, editingId, id, ts){
    const res = saveBarRecord(form, editingId, { allowEmptySpec: true, id: id, ts: ts });
    if(typeof res === 'string') said.push(res);
  };
  houseApplying = true;
  try{
    out.changes.forEach(function(ch){
      if(ch.what === 'row-removed'){ removeBarRecord(ch.id); return; }
      const row = byId[ch.id];
      if(!row) return;
      /* a spec-less house drink is a draft: the licence is the engine's.
         A row the list already holds under the engine's id (a wake that
         crossed another, or a put whose answer the list filed first) is
         that record edited in place, never a second one the door would
         refuse by name. */
      if(ch.what === 'row-added') file(houseRowForm(row), houseListHas(row.id) ? row.id : null, row.id, row.ts);
      /* re-keyed by the engine: the old id is the record being edited, so
         the 'My Bar · name' card moves with the name */
      else if(ch.what === 'renamed') file(houseRowForm(row), ch.from, row.id, row.ts);
      else if(ch.what === 'row-updated' || ch.what === 'adopted') file(houseRowForm(row), row.id, row.id, row.ts);
    });
  } finally { houseApplying = false; }
  return said;
}

/* ---- the wake: the list and the current house brought into step --------- */
/* One wake at a time, and one projection, and never one beside the other.
   The boot and a storage event can ask together, and two syncs over the
   same rows would both report the same row as added: the second then files
   a drink the first already filed and the door refuses it by name. So a
   wake or a projection in flight is waited for, whatever became of it, and
   the next runs over the list as the first left it, where the engine finds
   nothing to change. houseSwitch and houseStorageDue go through these two
   doors, so they wait by construction. */
var houseWakeInFlight = null;
function houseOneAtATime(run){
  if(houseWakeInFlight){
    const again = function(){ return houseOneAtATime(run); };
    return houseWakeInFlight.then(again, again);
  }
  const done = function(){ houseWakeInFlight = null; };
  return (houseWakeInFlight = run().then(function(out){ done(); return out; }, function(err){ done(); throw err; }));
}
function houseListHas(id){
  return (progress.bar || []).some(function(b){ return b.id === id; });
}
function houseSyncIn(){
  const api = houseHere();
  if(!api) return Promise.resolve(null);
  houseAttach();
  return houseOneAtATime(function(){ return houseSyncInNow(api); });
}
function houseSyncInNow(api){
  return api.ready().then(function(){
    houseNamesRefresh();
    if(!api.current()){ houseSyncedTo = null; return null; }
    return api.sync('cocktail', houseRows()).then(function(out){
      houseSyncedTo = api.currentId();
      const said = houseApplyChanges(out);
      if(!out.ok && out.said) said.push(out.said);
      if(out.changes.length){ allDrinks._c = null; saveProgress(); }
      if(said.length && state.house) state.house.err = said.join(' ');
      return out;
    });
  });
}

/* The current house's rows REPLACE the list, through the doors: a switch, or
   the pointer moved by another tab. The outgoing rows leave with keepCard,
   because a switch is not a delete. Removals first, so a name the incoming
   house also uses cannot clash with a row on its way out. */
function houseProject(){
  const api = houseHere();
  if(!api) return Promise.resolve(null);
  return houseOneAtATime(function(){ return houseProjectNow(api); });
}
function houseProjectNow(api){
  return api.ready().then(function(){
    const cur = api.current();
    houseSyncedTo = api.currentId();
    if(!cur) return null;
    const prev = houseRows();
    const rows = api.rows('cocktail', prev);
    const keep = {};
    rows.forEach(function(r){ keep[r.id] = true; });
    houseApplying = true;
    const said = [];
    try{
      prev.forEach(function(b){ if(!keep[b.id]) removeBarRecord(b.id, { keepCard: true }); });
      rows.forEach(function(row){
        const res = saveBarRecord(houseRowForm(row), houseListHas(row.id) ? row.id : null, { allowEmptySpec: true, id: row.id, ts: row.ts });
        if(typeof res === 'string') said.push(res);
      });
    } finally { houseApplying = false; }
    allDrinks._c = null;
    saveProgress();
    houseNamesRefresh();
    if(said.length && state.house) state.house.err = said.join(' ');
    return rows;
  });
}

/* ---- one record into the House, after the Ledger's own save ------------- */
/* the last put's promise, so a check can wait for the House's side */
var houseLastPut = null;
function housePut(rec){
  const api = houseHere();
  if(!api || houseApplying || !rec || !rec.id) return Promise.resolve(null);
  return (houseLastPut = api.ready().then(function(){
    if(!api.current()) return null;
    return api.put('cocktail', houseRowOf(rec)).then(function(res){
      const row = res && res.row;
      if(!row) return res;
      /* the engine re-keyed it, or stamped it with the house: the record
         follows, through the door, with the engine's id and stamp */
      if(row.id !== rec.id || barText(row.house) !== barText(rec.house)){
        houseApplying = true;
        try{ saveBarRecord(houseRowForm(row), rec.id, { allowEmptySpec: true, id: row.id, ts: row.ts }); }
        finally{ houseApplying = false; }
      }
      houseNamesRefresh();
      return res;
    });
  }).catch(function(){ return null; }));
}

/* A tombstone, after the Ledger's own delete, so no device brings it back. */
function houseRemove(id){
  const api = houseHere();
  if(!api || !id) return Promise.resolve(false);
  return api.ready().then(function(){
    if(!api.current()) return false;
    return api.removeItem('cocktail', id);
  }).then(function(ok){ houseNamesRefresh(); return ok; }).catch(function(){ return false; });
}

/* ---- another tab's write: re-run the wake, once the person is not typing --- */
var houseStorageTimer = null;
function houseStorageDue(){
  const busy = (state.menu && (state.menu.form || state.menu.editing)) || (state.menu && state.menu.imp && state.menu.imp.busy);
  if(busy){ houseStorageTimer = setTimeout(houseStorageDue, 2000); return; }
  houseStorageTimer = null;
  const api = houseHere();
  if(!api) return;
  houseAttach();
  /* whether the pointer moved is read when this wake's turn comes, not
     when it was asked for: a wake in flight may be the one that moved it */
  houseOneAtATime(function(){
    const moved = api.currentId() !== houseSyncedTo;
    return moved ? houseProjectNow(api) : houseSyncInNow(api);
  }).then(function(){ houseRepaint(); }).catch(function(){});
}
function houseOnStorage(e){
  const key = e && e.key;
  if(key !== null && key !== undefined && key !== HOUSE_INDEX_KEY_NAME) return;
  if(!houseHere()) return;
  if(houseStorageTimer) clearTimeout(houseStorageTimer);
  houseStorageTimer = setTimeout(houseStorageDue, 600);
}
if(typeof window !== 'undefined' && window && typeof window.addEventListener === 'function'){
  window.addEventListener('storage', houseOnStorage);
}

/* The repaint after asynchronous work: the live inputs first, so a box the
   person is typing in survives the render, as every act's render does. */
function houseRepaint(){
  if(typeof captureLiveInputs === 'function') captureLiveInputs();
  if(typeof render === 'function') render();
}

/* ---- the line on Mine, and the doors beside it ---------------------------- */
function houseNextStep(api, cur){
  const steps = api.BUILD_STEPS || [];
  const build = cur.build || {};
  const next = steps.find(function(s){ return !build[s]; });
  if(next) return 'next: ' + (HOUSE_STEP_WORDS[next] || next);
  return 'complete · menus read ' + (cur.menusReadOn || 'on no recorded date');
}
function houseLine(api){
  const cur = api.current();
  if(!cur) return HOUSE_NO_HOUSE_LINE;
  const n = (cur.cocktails || []).length;
  return cur.name + ' · ' + n + ' drink' + (n === 1 ? '' : 's') + ' here · ' + houseNextStep(api, cur);
}
function houseLineHTML(){
  const api = houseHere();
  if(!api) return '';
  const h = state.house || (state.house = houseBlankState());
  const cur = api.current();
  const list = api.list();
  const busy = h.busy;
  const chip = function(act, label, p, off){
    const open = p && h.panel === p;
    return '<button class="chip' + (open ? ' on' : '') + '" data-act="' + act + '"' + (p ? ' data-p="' + p + '" aria-expanded="' + (open ? 'true' : 'false') + '"' : '')
      + (off || busy ? ' disabled' : '') + '>' + label + '</button>';
  };
  const chips = chip('house-panel', 'Switch', 'switch', list.length < 2)
    + chip('house-panel', 'New house', 'new')
    + chip('house-panel', 'Import a pack', 'import')
    + chip('house-export', 'Export', null, !cur)
    + chip('house-panel', 'Rename', 'rename', !cur);
  let panel = '';
  if(h.panel === 'switch'){
    panel = '<label class="tiny dim" for="house-switch">Open another house on this device</label>'
      + '<select class="input" id="house-switch" style="max-width:380px">' + list.map(function(s){
        return '<option value="' + esc(s.id) + '"' + (s.id === api.currentId() ? ' selected' : '') + '>' + esc(s.name) + '</option>';
      }).join('') + '</select>';
  } else if(h.panel === 'new'){
    panel = '<label class="tiny dim" for="house-name">The house, by the name on its door</label>'
      + '<div class="row" style="gap:8px;flex-wrap:wrap"><input class="input" id="house-name" value="' + esc(h.name) + '" style="flex:1;min-width:180px">'
      + '<button class="chip" data-act="house-mint">Start it</button></div>';
  } else if(h.panel === 'import'){
    panel = '<div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">'
      + '<input type="file" id="house-file" accept=".json,application/json" class="sr-only" aria-label="A pack file">'
      + '<button class="chip" data-act="house-import-file">Choose a pack file</button>'
      + '<span class="tiny dim">or by address</span></div>'
      + '<div class="row" style="gap:8px;flex-wrap:wrap"><input class="input" id="house-url" value="' + esc(h.address) + '" placeholder="https://" aria-label="The address of a pack" style="flex:1;min-width:180px">'
      + '<button class="chip" data-act="house-fetch">Fetch it</button></div>'
      + '<div class="tiny dim lh">A pack is fetched by this browser alone, on the press, and goes nowhere else. It carries no allergen information: mark each drink at lineup.</div>';
  } else if(h.panel === 'rename' && cur){
    panel = '<label class="tiny dim" for="house-rename">Rename ' + esc(cur.name) + '</label>'
      + '<div class="row" style="gap:8px;flex-wrap:wrap"><input class="input" id="house-rename" value="' + esc(h.renameTo) + '" style="flex:1;min-width:180px">'
      + '<button class="chip" data-act="house-rename-go">Rename</button></div>';
  }
  let after = '';
  if(h.pending){
    after = '<div class="small lh">' + esc(h.pending.name) + ' is already on this device. Add it as a new house, or merge it into ' + esc(h.pending.intoName) + '.</div>'
      + '<div class="row" style="gap:8px;flex-wrap:wrap"><button class="chip" data-act="house-import-new">Add as a new house</button>'
      + '<button class="chip" data-act="house-import-merge">Merge into ' + esc(h.pending.intoName) + '</button></div>';
  } else if(h.added){
    after = '<div class="small lh">' + esc(h.added.name) + ' added. Open it now?</div>'
      + '<div class="row" style="gap:8px;flex-wrap:wrap"><button class="chip brass" data-act="house-open-added">Open</button>'
      + '<button class="chip" data-act="house-not-now">Not now</button></div>';
  }
  return '<section class="panel p4 col-sm house-line" style="gap:10px" aria-labelledby="house-line-head">'
    + '<h3 class="sub-head" id="house-line-head" style="margin:0">' + esc(houseLine(api)) + '</h3>'
    + '<div class="row" style="gap:6px;flex-wrap:wrap">' + chips + '</div>'
    + (panel ? '<div class="col-sm" style="gap:8px">' + panel + '</div>' : '')
    + after
    + (h.err ? '<div class="small" style="color:var(--oxblood-text)">' + esc(h.err) + '</div>' : '')
    + (h.live ? '<div class="tiny dim">' + esc(h.live) + '</div>' : '')
    + (api.volatile ? '<div class="tiny dim lh">This browser offers no database, so the house lives only as long as the page. Export a pack before you leave.</div>' : '')
    + '</section>';
}

/* ---- the acts --------------------------------------------------------- */
function houseSaid(text){
  if(state.house) state.house.live = text;
  if(typeof say === 'function') say(text);
}
function houseOpenPanel(p){
  const h = state.house;
  h.err = ''; h.added = null; h.pending = null;
  h.panel = h.panel === p ? '' : p;
  const api = houseHere();
  if(h.panel === 'rename' && api && api.current()) h.renameTo = api.current().name;
}
function houseBox(id, key){
  const el = document.getElementById(id);
  const v = el && el.value !== undefined ? el.value : (state.house ? state.house[key] : '');
  if(state.house) state.house[key] = v;
  return (v || '').trim();
}
function houseMint(){
  const api = houseHere(); const h = state.house;
  const name = houseBox('house-name', 'name');
  if(!api || !name){ houseRepaint(); return Promise.resolve(null); }
  h.busy = true; h.err = '';
  return api.ready().then(function(){ return api.mintHouse(name, 'hand'); }).then(function(made){
    if(!made){ h.err = 'The house could not be written on this device. Export a pack to make room.'; return null; }
    h.name = '';
    if(api.currentId() === made.id){
      /* the first house on the device: the drinks already here join it */
      return houseSyncIn().then(function(){ h.panel = ''; houseSaid(made.name + ' is your house now.'); return made; });
    }
    h.added = { id: made.id, name: made.name };
    houseSaid(made.name + ' added. Open it now?');
    return made;
  }).catch(function(){ h.err = 'The house could not be written on this device.'; return null; })
    .then(function(r){ h.busy = false; houseRepaint(); return r; });
}
function houseRenameGo(){
  const api = houseHere(); const h = state.house;
  const name = houseBox('house-rename', 'renameTo');
  const cur = api ? api.current() : null;
  if(!api || !cur || !name || name === cur.name){ h.panel = ''; houseRepaint(); return Promise.resolve(false); }
  h.busy = true; h.err = '';
  return api.rename(name).then(function(ok){
    if(!ok) h.err = 'The name could not be written on this device.';
    else { h.panel = ''; houseSaid('Renamed to ' + name + '.'); }
    return ok;
  }).catch(function(){ h.err = 'The name could not be written on this device.'; return false; })
    .then(function(r){ h.busy = false; houseRepaint(); return r; });
}
function houseExport(){
  const api = houseHere();
  const built = api ? api.buildPack('ledger') : null;
  if(!built){ houseRepaint(); return null; }
  try{
    const blob = new Blob([built.text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = built.filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  }catch(e){}
  houseSaid(built.pack.house.name + ' exported as ' + built.filename + '.');
  houseRepaint();
  return built;
}
function houseSwitch(id){
  const api = houseHere(); const h = state.house;
  if(!api || !id || id === api.currentId()){ return Promise.resolve(false); }
  h.busy = true; h.err = '';
  /* the list into the house it belongs to first, so an edit made since the
     last wake is kept; then the pointer; then the new house's rows */
  return houseSyncIn().then(function(){ return api.switchTo(id); }).then(function(opened){
    if(!opened){ h.err = 'That house could not be opened on this device.'; return false; }
    return houseProject().then(function(){ h.panel = ''; h.added = null; houseSaid(opened.name + ' is open.'); return true; });
  }).catch(function(){ h.err = 'That house could not be opened on this device.'; return false; })
    .then(function(r){ h.busy = false; houseRepaint(); return r; });
}
/* A pack's text, from a file or an address: read, then imported, or held
   for the person's choice when its id is already on the device. */
function houseTakePack(text){
  const api = houseHere(); const h = state.house;
  h.err = ''; h.added = null; h.pending = null;
  const read = api.readPack(text);
  if(!read.ok){ h.err = read.said; return Promise.resolve(null); }
  const twin = api.list().find(function(s){ return s.id === read.house.id; });
  if(twin){
    h.pending = { text: text, id: read.house.id, name: read.house.name, intoName: twin.name };
    houseSaid(read.house.name + ' is already on this device. Add it as a new house, or merge it into ' + twin.name + '.');
    return Promise.resolve(null);
  }
  return houseFinishImport(text, read.house.name, { mode: 'new' });
}
function houseFinishImport(text, name, choice){
  const api = houseHere(); const h = state.house;
  h.busy = true;
  return api.importPack(text, choice).then(function(result){
    h.pending = null;
    if(!result.ok){ h.err = result.said; return result; }
    h.address = '';
    if(result.current){
      /* the pack became the current house: its rows reach the list now */
      return houseProject().then(function(){ h.panel = ''; houseSaid(result.said + ' It is open.'); return result; });
    }
    if(choice.mode === 'merge'){ houseSaid(result.said); h.added = { id: result.added, name: name }; return result; }
    h.added = { id: result.added, name: name };
    houseSaid(name + ' added. Open it now?');
    return result;
  }).catch(function(){ h.err = 'That pack could not be written on this device.'; return null; })
    .then(function(r){ h.busy = false; houseRepaint(); return r; });
}
function houseImportChoice(mode){
  const h = state.house;
  const p = h.pending;
  if(!p || !houseHere()){ houseRepaint(); return Promise.resolve(null); }
  return houseFinishImport(p.text, p.name, mode === 'merge' ? { mode: 'merge', into: p.id } : { mode: 'new' });
}
function houseImportFile(file){
  const api = houseHere(); const h = state.house;
  if(!api || !file) return Promise.resolve(null);
  h.busy = true; h.err = '';
  return new Promise(function(resolve){
    const reader = new FileReader();
    reader.onload = function(){ resolve(String(reader.result || '')); };
    reader.onerror = function(){ resolve(null); };
    reader.readAsText(file);
  }).then(function(text){
    h.busy = false;
    if(text === null){ h.err = 'That file could not be read.'; houseRepaint(); return null; }
    return houseTakePack(text).then(function(r){ houseRepaint(); return r; });
  });
}
/* The address is fetched by this browser alone, on the press, never cached
   and never sent anywhere else; a relative address is accepted as it is. */
function houseFetch(){
  const api = houseHere(); const h = state.house;
  const url = houseBox('house-url', 'address');
  if(!api || !url){ houseRepaint(); return Promise.resolve(null); }
  h.busy = true; h.err = '';
  return fetch(url, { cache: 'reload' }).then(function(res){
    if(!res.ok){ h.err = 'That address answered ' + res.status + ', not a pack.'; return null; }
    return res.text();
  }, function(){ h.err = 'That address could not be fetched from here.'; return null; })
  .then(function(text){
    h.busy = false;
    if(text === null){ houseRepaint(); return null; }
    return houseTakePack(text).then(function(r){ houseRepaint(); return r; });
  });
}
function houseOpenAdded(){
  const h = state.house;
  const added = h.added;
  if(!added){ houseRepaint(); return Promise.resolve(false); }
  return houseSwitch(added.id);
}
function houseNotNow(){
  const h = state.house;
  h.added = null;
}

/* ---- the engine's own changes: the names kept current ----------------------- */
/* Attached once per engine: at load where the engine is here, else on the
   first wake that finds it. */
var houseAttachedTo = null;
function houseAttach(){
  const api = houseHere();
  if(!api || api === houseAttachedTo || typeof api.onChange !== 'function') return;
  houseAttachedTo = api;
  api.onChange(function(house, what){
    if(what === 'ready' || what === 'storage') return;
    houseNamesRefresh();
  });
}
houseAttach();
