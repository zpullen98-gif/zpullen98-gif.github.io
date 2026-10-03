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
   spec-less house drink a card, as a kept parts or upsells mark is:
   isHouseCard(d) is hasSpec(d) || hasKeptLines(d) || hasKeptParts(d) ||
   hasKeptUpsells(d), and the three line modes on the flashcards deal exactly
   the drinks with a kept line, as the parts and the upsell modes deal the
   drinks with a kept parts mark and a kept upsells mark. An unkept mark
   reaches no deck and no question.

   THE DRILLS ARE FREE AND COUNT TOWARD NOTHING. The Menu round's house
   questions (qMyBarLine, qMyBarUpsell, qMyBarParts), the two card modes
   and Pair the menu (the engine's firstPickFor and zeroProofFor, dealt by
   OOT.houseLib.dealQuestion over the current house and drawn by the quiz)
   stand behind no lock, write nothing to progress.levels or a level test,
   and record nothing on progress.house; a card is graded through the deck
   under 'My Bar · name' as every menu card is.

   NOBODY IS NAMED HERE, NO PROSE CARRIES A DASH, AND THE WORDS ARE BRITISH. */

/* ---- the engine, read at call time ------------------------------------ */
function houseHere(){
  return (typeof OOT !== 'undefined' && OOT && OOT.house) ? OOT.house : null;
}

/* The screen's own state on Mine: which panel is open, the three boxes, the
   sentence to show, a pack read and waiting on a choice, a house just added.
   Made here rather than in engine.js so the whole feature is one file. */
function houseBlankState(){
  return { panel:'', name:'', renameTo:'', address:'', err:'', live:'', pending:null, added:null, busy:false,
    /* the formula pane's one open editor, the service note being typed, the
       picker's choice, the review door's step and the pane's last sentence */
    edit:null, note:null, pick:'', step:'formula', said:'' };
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
/* A house drink is a card when it has a spec, or when a person kept a line,
   its parts or its offers: a draft with no spec is dealt by the modes that
   fit what was kept and by nothing that needs a ticket, each mode's own fit
   holding the rest back. hasSpec is ui-study.js's own rule. */
function isHouseCard(d){
  return !!(hasSpec(d) || hasKeptLines(d) || hasKeptParts(d) || hasKeptUpsells(d));
}

/* The line modes' labels and the second each asks for, keyed the way the
   mark keeps them, so a mode's key is the lines' key. */
var HOUSE_LINE_MODES = { line10:['s10','ten seconds'], line20:['s20','twenty seconds'], line45:['s45','forty five seconds'] };

/* ---- the kept parts and the kept upsells, read the way the lines are ----
   Every read here is of a mark a person kept (by === 'person'); hers, not
   yet kept, is nothing to a card and nothing to a question. */
function keptMarkValueOf(d, field){
  const b = d && d.ref ? d.ref : d;
  if(!b || !b.id) return null;
  const item = houseItemFor(b.id);
  const m = item && item[field];
  if(!m || m.by !== 'person' || m.value === undefined || m.value === null) return null;
  return m.value;
}
/* the five parts a person kept, only the ones with words in them */
function keptPartsOf(d){
  const v = keptMarkValueOf(d, 'parts');
  if(!v || typeof v !== 'object') return null;
  const out = {};
  let any = false;
  ['main', 'technique', 'sauce', 'sides', 'taste'].forEach(function(k){
    if(typeof v[k] === 'string' && v[k].trim()){ out[k] = v[k].trim(); any = true; }
  });
  return any ? out : null;
}
function hasKeptParts(d){ return !!keptPartsOf(d); }
/* the kept upsells, by name: the ids resolved against the house's own
   cocktails, so a drink since taken off the house names nothing */
function keptUpsellsOf(d){
  const v = keptMarkValueOf(d, 'upsells');
  if(!Array.isArray(v) || !v.length) return null;
  const b = d && d.ref ? d.ref : d;
  const byId = {};
  houseCocktailsNow().forEach(function(c){ byId[c.id] = c; });
  const names = [];
  v.forEach(function(id){
    const c = byId[id];
    if(c && c.id !== b.id && names.indexOf(c.name) < 0) names.push(c.name);
  });
  return names.length ? names : null;
}
function hasKeptUpsells(d){ return !!keptUpsellsOf(d); }
/* the current house's named cocktails */
function houseCocktailsNow(){
  const api = houseHere();
  const cur = api ? api.current() : null;
  return cur ? (cur.cocktails || []).filter(function(c){ return c && c.id && typeof c.name === 'string' && c.name.trim(); }) : [];
}
/* lower case, whitespace collapsed: how two options are told apart and how
   a stem is searched for its answer, the engine's own fold */
function houseFold(s){ return String(s || '').trim().toLowerCase().replace(/\s+/g, ' '); }
function houseDistinct(list){
  const seen = {}; const out = [];
  list.forEach(function(s){ const t = String(s || '').trim(); const f = houseFold(t); if(f && !seen[f]){ seen[f] = true; out.push(t); } });
  return out;
}
/* the two card modes over the kept marks: what the face asks for */
var HOUSE_CARD_MODES = { parts: 'Say its five parts, in your own words, then flip.', upsell: 'Say what you would offer after it, then flip.' };
function houseCardFits(mode, d){
  if(mode === 'parts') return hasKeptParts(d);
  if(mode === 'upsell') return hasKeptUpsells(d);
  return false;
}
/* the back of a card: the kept parts under the engine's labels, or the
   kept upsells by name */
function houseCardBackHTML(mode, c){
  if(mode === 'parts'){
    const parts = keptPartsOf(c) || {};
    const labels = housePartLabels();
    return '<div class="col-sm" style="gap:6px;max-width:520px;width:100%">' + Object.keys(parts).map(function(k){
      return '<div class="small lh"><span class="tiny dim">' + esc(labels[k] || k) + '</span><br>' + esc(parts[k]) + '</div>';
    }).join('') + '</div>';
  }
  if(mode === 'upsell'){
    const names = keptUpsellsOf(c) || [];
    return '<div class="col-sm" style="gap:6px;max-width:520px;width:100%"><span class="tiny dim">What you kept to offer next</span>'
      + names.map(function(n){ return '<div class="small lh">' + esc(n) + '</div>'; }).join('') + '</div>';
  }
  return '';
}

/* The floor on the offer next question: four cocktails on the house, so
   every option is a real drink of this house and the drink itself can
   stand among the wrong answers. */
var HOUSE_UPSELL_FLOOR = 4;
function houseUpsellWhy(){
  if(!houseHere()) return '';
  const n = houseDistinct(houseCocktailsNow().map(function(c){ return c.name; })).length;
  if(n < HOUSE_UPSELL_FLOOR) return 'The offer next question opens at four cocktails on the house: ' + n + ' here.';
  const short = (progress.bar || []).filter(function(b){
    return keptUpsellsOf(b) && houseUpsellOthers(b).length < 3;
  }).map(function(b){ return b.name; });
  if(!short.length) return '';
  return 'The offer next question needs three cocktails on the house beyond the ones kept as offers: ' + short.join(', ') + (short.length === 1 ? ' has' : ' have') + ' fewer.';
}
/* the wrong answers an offer next question may draw for a drink: the
   house's cocktails, this one among them, less every kept upsell */
function houseUpsellOthers(b){
  const kept = (keptUpsellsOf(b) || []).map(houseFold);
  return houseDistinct(houseCocktailsNow().map(function(c){ return c.name; })).filter(function(n){ return kept.indexOf(houseFold(n)) < 0; });
}
/* A quiz question off the kept upsells: after this drink, which drink on
   the house do you offer? Every option is a house cocktail; the wrong ones
   are the house's other drinks, this one among them, and never another
   kept upsell, which would be a second right answer. */
function qMyBarUpsell(b){
  const names = keptUpsellsOf(b);
  if(!names) return null;
  const all = houseDistinct(houseCocktailsNow().map(function(c){ return c.name; }));
  if(all.length < HOUSE_UPSELL_FLOOR) return null;
  const stem = 'A guest has finished the ' + b.name + '. Which drink on your menu do you offer next?';
  const fit = names.filter(function(n){ return houseFold(stem).indexOf(houseFold(n)) < 0; });
  if(!fit.length) return null;
  const ans = sample(fit, 1)[0];
  const others = houseUpsellOthers(b);
  if(others.length < 3) return null;
  return { prompt: stem, options: shuffle([ans].concat(sample(others, 3))), answer: ans,
    explain: b.name + ', then ' + names.join(' or ') + '.' };
}
/* A quiz question off the kept parts: which modifiers and key flavours are
   this drink's. Every option is the kept line of a drink on this house, so
   four drinks with kept parts open it. */
function qMyBarParts(b){
  const parts = keptPartsOf(b);
  if(!parts || !parts.sauce) return null;
  const ans = parts.sauce;
  const stem = 'Which are the ' + housePartLabels().sauce + ' of your ' + b.name + '?';
  if(houseFold(stem).indexOf(houseFold(ans)) >= 0) return null;
  const field = houseDistinct((progress.bar || []).map(function(x){
    const p = x.id === b.id ? null : keptPartsOf(x);
    return p ? p.sauce : '';
  }).filter(function(t){ return t && houseFold(t) !== houseFold(ans); }));
  if(field.length < 3) return null;
  return { prompt: stem, options: shuffle([ans].concat(sample(field, 3))), answer: ans,
    explain: b.name + ': ' + ans };
}

/* ---- Pair the menu: the engine's own questions, drawn by the quiz ----
   firstPickFor and zeroProofFor are dealt by OOT.houseLib.dealQuestion over
   the current house, the one dealer, and read into the quiz's own shape.
   The engine reads kept pairings only and refuses a kind under its floor. */
var HOUSE_PAIR_KINDS = ['firstPickFor', 'zeroProofFor'];
function houseDrillLib(){
  const lib = houseLibHere();
  return lib && lib.drills && typeof lib.dealQuestion === 'function' && typeof lib.readyKinds === 'function' ? lib : null;
}
function housePairReady(){
  const lib = houseDrillLib(); const api = houseHere();
  const cur = api ? api.current() : null;
  if(!lib || !cur) return [];
  return lib.readyKinds(cur).filter(function(k){ return HOUSE_PAIR_KINDS.indexOf(k) >= 0; });
}
function housePairWhy(){
  const lib = houseDrillLib(); const api = houseHere();
  const cur = api ? api.current() : null;
  if(!lib || !cur || typeof lib.drillableCounts !== 'function') return '';
  const n = lib.drillableCounts(cur);
  return 'Pair the menu opens at four dishes with a kept pairing: ' + n.firstPickFor + ' name a wine and ' + n.zeroProofFor + ' a drink without alcohol here.';
}
function houseQuestionOf(q, lib){
  const label = (lib.drills.DRILL_LABELS && lib.drills.DRILL_LABELS[q.kind]) || 'Which?';
  return { prompt: q.stem + '. ' + label, options: q.options.slice(), answer: q.answer,
    explain: q.stem + ': ' + q.answer + '.', houseKind: q.kind };
}
/* up to ten, the two kinds in turn, no stem asked twice; empty when the
   house is not ready for either */
function houseQuizRound(){
  const lib = houseDrillLib(); const api = houseHere();
  const cur = api ? api.current() : null;
  const kinds = housePairReady();
  if(!lib || !cur || !kinds.length) return [];
  const qs = []; const seen = {};
  for(let i = 0; i < 40 && qs.length < 10; i++){
    const q = lib.dealQuestion(cur, kinds[i % kinds.length], Math.random);
    if(!q) continue;
    const key = q.kind + '|' + houseFold(q.stem);
    if(seen[key]) continue;
    seen[key] = true;
    qs.push(houseQuestionOf(q, lib));
  }
  return qs;
}

/* ---- the drill panel on the Menu tab, and the two doors it opens ----
   Free in every wing: no lock stands here, and nothing a round records
   reaches a level, a rank or a test. A card is graded through the deck as
   every card is, under 'My Bar · name'. */
function houseDrillModes(){
  if(!houseHere() || typeof FC_MODES === 'undefined' || typeof fcPool !== 'function') return [];
  const fc = state.fc;
  const was = { src: fc.src, level: fc.level, sub: fc.sub, special: fc.special, family: fc.family, spirit: fc.spirit, tier: fc.tier };
  Object.assign(fc, { src: 'My Bar', level: null, sub: null, special: 'All', family: 'All', spirit: 'All', tier: 'All' });
  let pool;
  try { pool = fcPool(); } finally { Object.assign(fc, was); }
  const house = Object.keys(HOUSE_LINE_MODES).concat(Object.keys(HOUSE_CARD_MODES));
  return FC_MODES.filter(function(row){ return house.indexOf(row[0]) >= 0; }).map(function(row){
    return { mode: row[0], label: row[1], n: pool.filter(row[3]).length };
  });
}
function houseDrillPanelHTML(){
  if(!houseHere()) return '';
  const modes = houseDrillModes();
  const open = modes.filter(function(m){ return m.n > 0; });
  const pair = housePairReady();
  const btn = function(act, label, mode){ return '<button class="btn btn-ghost" data-act="' + act + '"' + (mode ? ' data-mode="' + mode + '"' : '') + '>' + esc(label) + '</button>'; };
  const cards = open.map(function(m){ return btn('house-fc', m.label + ' (' + m.n + ')', m.mode); }).join('');
  const pairBtn = pair.length ? btn('house-pair', 'Pair the menu') : '';
  const why = [];
  if(!open.length) why.push('Nothing kept yet: keep a line, the five parts or an offer on a drink\'s formula pane and its cards open here.');
  const up = houseUpsellWhy(); if(up) why.push(up);
  const lw = houseLineWhy(); if(lw) why.push(lw);
  if(!pair.length){ const pw = housePairWhy(); if(pw) why.push(pw); }
  return '<div class="col-sm" style="gap:8px"><div class="tiny dim">From the house, free, and counted toward no level.</div>'
    + ((cards || pairBtn) ? '<div class="row" style="gap:8px;flex-wrap:wrap">' + cards + pairBtn + '</div>' : '')
    + why.map(function(w){ return '<div class="tiny dim lh">' + esc(w) + '</div>'; }).join('')
    + '</div>';
}
/* the deck of one house mode, over the menu alone, started as fc-start does */
function houseStartCards(mode){
  if(typeof FC_MODES === 'undefined' || typeof fcPool !== 'function') return false;
  const row = FC_MODES.find(function(x){ return x[0] === mode; });
  if(!row) return false;
  const fc = state.fc;
  Object.assign(fc, { src: 'My Bar', level: null, sub: null, special: 'All', family: 'All', spirit: 'All', tier: 'All' });
  const pool = fcPool().filter(row[3] || function(){ return true; });
  state.tab = 'flashcards';
  if(!pool.length){ fc.stage = 'setup'; return false; }
  Object.assign(fc, { stage: 'run', mode: mode, deck: shuffle(pool), idx: 0, right: 0, wrong: 0, missed: [] });
  if(typeof prepCard === 'function') prepCard();
  return true;
}
/* the pair round, dealt and opened on the quiz */
function houseStartPair(){
  const round = houseQuizRound();
  state.tab = 'quiz';
  if(!round.length){ state.quiz.stage = 'setup'; return false; }
  Object.assign(state.quiz, { stage: 'run', mode: 'housepair', round: round, idx: 0, picked: null, score: 0, missedQ: [], replay: false });
  return true;
}

/* A quiz question off a kept line: which of four lines is this drink's.
   Every wrong answer is a line a person kept for another drink on this
   house, so every option is a real item of the house; three are needed, or
   no question is dealt and houseLineWhy says so on the Menu tab. */
function houseLineKey(b){
  const lines = keptLinesOf(b);
  if(!lines) return '';
  return ['s10','s20','s45'].find(function(k){ return typeof lines[k] === 'string' && lines[k].trim(); }) || '';
}
function houseLineDecoys(b, ans){
  const seen = {}; seen[houseFold(ans)] = true;
  const pool = [];
  (progress.bar || []).forEach(function(x){
    if(x.id === b.id) return;
    const l = keptLinesOf(x);
    if(l) ['s10','s20','s45'].forEach(function(k){
      const t = typeof l[k] === 'string' ? l[k].trim() : '';
      if(t && !seen[houseFold(t)]){ seen[houseFold(t)] = true; pool.push(t); }
    });
  });
  return pool;
}
function qMyBarLine(b){
  const key = houseLineKey(b);
  if(!key) return null;
  const ans = keptLinesOf(b)[key].trim();
  const decoys = houseLineDecoys(b, ans);
  if(decoys.length < 3) return null;
  const secs = { s10:'ten seconds', s20:'twenty seconds', s45:'forty five seconds' }[key];
  return { prompt:'Which is the line for ' + b.name + ' on your menu, said in ' + secs + '?',
    options: shuffle([ans].concat(sample(decoys, 3))), answer: ans,
    explain: b.name + ': ' + ans };
}
/* why a drink with a kept line deals no which line question */
function houseLineWhy(){
  if(!houseHere()) return '';
  const short = (progress.bar || []).filter(function(b){
    const key = houseLineKey(b);
    return key && houseLineDecoys(b, keptLinesOf(b)[key]).length < 3;
  }).map(function(b){ return b.name; });
  if(!short.length) return '';
  return 'The which line question needs three lines kept on the house\'s other drinks: ' + short.join(', ') + (short.length === 1 ? ' has' : ' have') + ' fewer.';
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
  const busy = (state.menu && (state.menu.form || state.menu.editing)) || (state.menu && state.menu.imp && state.menu.imp.busy) || houseUIEditing();
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
    + chip('house-panel', 'Rename', 'rename', !cur)
    + houseDoorsHTML(h, cur, busy);
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
  } else if(h.panel === 'read' || h.panel === 'review'){
    panel = cur ? houseDoorPanelHTML(h) : '';
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
/* The service notes on the current house, by kind and id, before a merge:
   the engine's merge takes the newer item whole, so a pack from another
   device that never had a note would blank the one written here. Every
   note the merge emptied is written back through setItemField after. */
var HOUSE_NOTE_KINDS = { dish: 'dishes', wine: 'wines', cocktail: 'cocktails' };
function houseNotesOf(cur){
  const out = [];
  if(!cur) return out;
  Object.keys(HOUSE_NOTE_KINDS).forEach(function(kind){
    (cur[HOUSE_NOTE_KINDS[kind]] || []).forEach(function(it){
      if(it && it.id && typeof it.serviceNote === 'string' && it.serviceNote.trim()) out.push({ kind: kind, id: it.id, note: it.serviceNote });
    });
  });
  return out;
}
function houseNotesBack(api, notes){
  return houseOneAtATime(function(){
    const cur = api.current();
    let chain = Promise.resolve(true);
    notes.forEach(function(n){
      const it = cur && (cur[HOUSE_NOTE_KINDS[n.kind]] || []).find(function(x){ return x && x.id === n.id; });
      if(!it || (typeof it.serviceNote === 'string' && it.serviceNote.trim())) return;
      chain = chain.then(function(){ return api.setItemField(n.kind, n.id, { serviceNote: n.note }); });
    });
    return chain;
  }).catch(function(){ return false; });
}
function houseFinishImport(text, name, choice){
  const api = houseHere(); const h = state.house;
  h.busy = true;
  const notes = choice.mode === 'merge' && choice.into === api.currentId() ? houseNotesOf(api.current()) : [];
  return api.importPack(text, choice).then(function(result){
    if(!result.ok || !notes.length || !result.current) return result;
    return houseNotesBack(api, notes).then(function(){ return result; });
  }).then(function(result){
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
    /* a mark, a field or an entry written on the house, by this screen or
       another tab's wake: the formula pane and the two doors' panels are
       drawn from the house, so they are drawn again */
    if(what === 'mark' || what === 'field' || what === 'entry' || what === 'remove-item' || what === 'import') houseRedrawIfShown();
  });
}
houseAttach();

/* ======================================================================
   READ AND KEEP, NO KEY: the formula pane on an open drink, the two doors
   on Mine, and the pack in My Data.

   Every mark here lives on the HOUSE cocktail and nowhere on the row: the
   five parts, the three timed lines and the upsells are House-only marks,
   written through OOT.house.setMark('cocktail', id, field, mark) and
   discarded with null; the service note is a plain House-only field, a
   person's own words, written through OOT.house.setItemField and never
   through the row or saveBarRecord. Nothing here reads, writes or infers
   an allergen: the note's eyebrow is fixed and the words under it are the
   person's. A mark is hers until by === 'person'; Keep writes her value
   back with by 'person' and a fresh stamp, Edit then Save writes the typed
   value the same way, Discard removes the mark. One editor is open at a
   time across the pane, keyed on state.house.edit.

   The pane and the panels are drawn from the house every render, and the
   engine's onChange (above) asks for a render after every write, so what
   is shown is what was saved. The boxes' ids (hf-part-*, hf-line-*,
   hf-upsell, hf-note) are in captureLiveInputs in app.js, so a render
   between typing and Save cannot eat the edit; and every act below reads
   the boxes itself first, because captureLiveInputs runs after an act.

   The two doors hand the shared reader and reviewer, OOT.houseUI, a root
   under the house line after every render (houseAfterRender, called from
   render in app.js) and the three hooks; the problems hook returns the
   engine's own count over the item's lines. With no OOT.houseUI the doors
   are not drawn; with no engine nothing here is. */

function houseUIHere(){
  return (typeof OOT !== 'undefined' && OOT && OOT.houseUI && typeof OOT.houseUI.readView === 'function') ? OOT.houseUI : null;
}
function houseLibHere(){
  return (typeof OOT !== 'undefined' && OOT && OOT.houseLib) ? OOT.houseLib : null;
}
var HOUSE_PART_KEYS = ['main', 'technique', 'sauce', 'sides', 'taste'];
var HOUSE_LINE_KEYS = ['s10', 's20', 's45'];
var HOUSE_LINE_WORDS = { s10: 'Ten seconds', s20: 'Twenty seconds', s45: 'Forty five seconds' };
var HOUSE_FORMULA_FIELDS = ['parts', 'lines', 'upsells'];
var HOUSE_NOTE_EYEBROW = 'Your words. Allergens: confirm at lineup.';

/* the engine's own labels, caps and counts, read at call time */
function housePartLabels(){
  const api = houseHere(); const lib = houseLibHere();
  return (api && api.COCKTAIL_PARTS) || (lib && lib.COCKTAIL_PARTS)
    || { main: 'the spirit', technique: 'the build', sauce: 'modifiers and key flavours', sides: 'glass and garnish', taste: 'how it tastes' };
}
function houseLineCaps(){
  const api = houseHere(); const lib = houseLibHere();
  return (api && api.LINE_CAPS) || (lib && lib.LINE_CAPS) || { s10: 25, s20: 50, s45: 110 };
}
function houseWordCount(s){
  const lib = houseLibHere();
  return lib && typeof lib.wordCount === 'function' ? lib.wordCount(s) : 0;
}
function houseHasDash(s){
  const lib = houseLibHere();
  return !!(lib && typeof lib.hasDash === 'function' && lib.hasDash(s));
}
function houseIsMark(m){
  return !!m && typeof m === 'object' && !Array.isArray(m) && (m.by === 'maitre' || m.by === 'person')
    && typeof m.ts === 'number' && m.value !== undefined && m.value !== null;
}
/* the count a line shows, in the reviewer's own words */
function houseCountText(key, text){
  const caps = houseLineCaps();
  const n = houseWordCount(text || '');
  return n + ' of ' + caps[key] + ' words' + (n > caps[key] ? '. Over its cap' : '');
}

/* ---- the chip and the pane ---------------------------------------------- */
/* the fifth chip on an open drink, only where the engine is here */
function menuFormulaChip(){
  return houseHere() ? [['formula', 'The formula']] : [];
}
function houseStatusChip(item, field){
  const m = item[field];
  const word = !houseIsMark(m) ? 'Nothing yet' : (m.by === 'person' ? 'Kept' : 'Hers, not yet kept');
  return '<span class="chip tiny">' + word + '</span>';
}
function houseMarkChips(id, field, item, ed){
  const m = item[field];
  const isM = houseIsMark(m);
  const a = function(act, label, extra){ return '<button class="chip" data-act="' + act + '" data-id="' + esc(id) + '" data-f="' + field + '"' + (extra || '') + '>' + label + '</button>'; };
  if(ed) return a('hf-save', 'Save') + a('hf-cancel', 'Cancel');
  return (isM && m.by !== 'person' ? a('hf-keep', 'Keep') : '')
    + a('hf-edit', isM ? 'Edit' : 'Write it')
    + (isM ? a('hf-discard', 'Discard') : '');
}
function housePartsHTML(b, item, ed){
  const labels = housePartLabels();
  const m = item.parts;
  const value = houseIsMark(m) && m.value && typeof m.value === 'object' ? m.value : {};
  let body;
  if(ed){
    body = HOUSE_PART_KEYS.map(function(k){
      const v = ed.parts && typeof ed.parts[k] === 'string' ? ed.parts[k] : '';
      return '<label class="col-sm" style="gap:4px"><span class="tiny dim">' + esc(labels[k]) + '</span>'
        + '<input class="input" id="hf-part-' + k + '" value="' + esc(v) + '"></label>';
    }).join('');
  } else if(houseIsMark(m)){
    body = HOUSE_PART_KEYS.map(function(k){
      return '<div class="small lh"><span class="tiny dim">' + esc(labels[k]) + '</span><br>' + esc(String(value[k] || '')) + '</div>';
    }).join('');
  } else {
    body = '<div class="tiny dim lh">Nothing written yet: the five parts of the drink, in the words you would say them.</div>';
  }
  return '<div class="panel p4 col-sm" style="gap:8px">'
    + '<div class="row between" style="flex-wrap:wrap;gap:6px"><div class="eyebrow">The five parts</div>' + houseStatusChip(item, 'parts') + '</div>'
    + body
    + '<div class="row" style="gap:6px;flex-wrap:wrap">' + houseMarkChips(b.id, 'parts', item, ed) + '</div>'
    + '</div>';
}
function houseLinesHTML(b, item, ed){
  const m = item.lines;
  const value = houseIsMark(m) && m.value && typeof m.value === 'object' ? m.value : {};
  let body;
  if(ed){
    body = HOUSE_LINE_KEYS.map(function(k){
      const v = ed.lines && typeof ed.lines[k] === 'string' ? ed.lines[k] : '';
      return '<label class="col-sm" style="gap:4px"><span class="tiny dim">' + HOUSE_LINE_WORDS[k] + '</span>'
        + '<textarea class="input" id="hf-line-' + k + '" rows="3">' + esc(v) + '</textarea>'
        + '<span class="tiny dim" id="hf-count-' + k + '">' + esc(houseCountText(k, v)) + '</span></label>';
    }).join('');
  } else if(houseIsMark(m)){
    body = HOUSE_LINE_KEYS.map(function(k){
      const t = String(value[k] || '');
      return '<div class="small lh"><span class="tiny dim">' + HOUSE_LINE_WORDS[k] + '</span><br>' + esc(t)
        + '<br><span class="tiny dim">' + esc(houseCountText(k, t)) + (houseHasDash(t) ? '. Carries a dash' : '') + '</span></div>';
    }).join('');
  } else {
    body = '<div class="tiny dim lh">Nothing written yet: what you would say about it in ten, twenty and forty five seconds.</div>';
  }
  return '<div class="panel p4 col-sm" style="gap:8px">'
    + '<div class="row between" style="flex-wrap:wrap;gap:6px"><div class="eyebrow">The timed lines</div>' + houseStatusChip(item, 'lines') + '</div>'
    + body
    + '<div class="row" style="gap:6px;flex-wrap:wrap">' + houseMarkChips(b.id, 'lines', item, ed) + '</div>'
    + '</div>';
}
/* the house's cocktails other than this one, by id, for the picker */
function houseOtherCocktails(id){
  const api = houseHere(); const cur = api ? api.current() : null;
  return cur ? (cur.cocktails || []).filter(function(c){ return c && c.id !== id; }) : [];
}
function houseUpsellIds(item){
  const m = item.upsells;
  return houseIsMark(m) && Array.isArray(m.value) ? m.value.slice() : [];
}
function houseUpsellsHTML(b, item){
  const h = state.house;
  const ids = houseUpsellIds(item);
  const others = houseOtherCocktails(b.id);
  const byId = {}; others.forEach(function(c){ byId[c.id] = c; });
  const rows = ids.map(function(id){
    const name = byId[id] ? byId[id].name : 'a drink no longer on the house';
    return '<div class="row between" style="flex-wrap:wrap;gap:6px"><span class="small">' + esc(name) + '</span>'
      + '<button class="chip" data-act="hf-upsell-drop" data-id="' + esc(b.id) + '" data-up="' + esc(id) + '">Remove</button></div>';
  }).join('');
  const free = others.filter(function(c){ return ids.indexOf(c.id) < 0; });
  const picker = free.length
    ? '<div class="row" style="gap:8px;flex-wrap:wrap;align-items:center"><select class="input" id="hf-upsell" aria-label="A drink to offer next" style="flex:1;min-width:180px">'
      + '<option value="">Choose a drink</option>'
      + free.map(function(c){ return '<option value="' + esc(c.id) + '"' + (h.pick === c.id ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('')
      + '</select><button class="chip" data-act="hf-upsell-add" data-id="' + esc(b.id) + '">Add it</button></div>'
    : '<div class="tiny dim lh">' + (others.length ? 'Every other drink on the house is already here.' : 'No other drink on the house yet to offer.') + '</div>';
  const m = item.upsells;
  const chips = (houseIsMark(m) && m.by !== 'person' ? '<button class="chip" data-act="hf-keep" data-id="' + esc(b.id) + '" data-f="upsells">Keep</button>' : '')
    + (houseIsMark(m) ? '<button class="chip" data-act="hf-discard" data-id="' + esc(b.id) + '" data-f="upsells">Discard</button>' : '');
  return '<div class="panel p4 col-sm" style="gap:8px">'
    + '<div class="row between" style="flex-wrap:wrap;gap:6px"><div class="eyebrow">What to offer next</div>' + houseStatusChip(item, 'upsells') + '</div>'
    + (rows || '<div class="tiny dim lh">Nothing yet: the drinks on this house to offer after this one.</div>')
    + picker
    + (chips ? '<div class="row" style="gap:6px;flex-wrap:wrap">' + chips + '</div>' : '')
    + '</div>';
}
function houseNoteHTML(b, item){
  const h = state.house;
  const draft = h.note && h.note.id === b.id ? h.note.text : (item.serviceNote || '');
  return '<div class="panel p4 col-sm" style="gap:8px">'
    + '<div class="eyebrow">' + HOUSE_NOTE_EYEBROW + '</div>'
    + '<textarea class="input" id="hf-note" data-id="' + esc(b.id) + '" rows="3" aria-label="The service note, in your words">' + esc(draft) + '</textarea>'
    + '<div class="row" style="gap:6px;flex-wrap:wrap"><button class="chip" data-act="hf-note-save" data-id="' + esc(b.id) + '">Save the note</button></div>'
    + '<div class="tiny dim lh">Yours alone, on the house and on no record here. It leaves this device only in a pack you export.</div>'
    + '</div>';
}
/* the pane: everything of hers and yours on the house cocktail this drink is */
function menuFormulaHTML(b){
  const api = houseHere();
  if(!api || !b) return '';
  const h = state.house || (state.house = houseBlankState());
  const item = houseItemFor(b.id);
  if(!item) return '<div class="small dim lh">' + (api.current() ? 'This drink is not on the house yet. Edit and save it once and it joins.' : 'No house holds this drink yet. Start one on Mine, or import a pack.') + '</div>';
  const ed = h.edit && h.edit.id === b.id ? h.edit : null;
  const unkept = HOUSE_FORMULA_FIELDS.filter(function(f){ return houseIsMark(item[f]) && item[f].by !== 'person'; });
  return '<div class="col-sm" style="gap:12px">'
    + '<div class="row between" style="flex-wrap:wrap;gap:6px"><div class="tiny dim lh">Hers until you keep it; until then it reaches no drill, no card and no guest.</div>'
    + (unkept.length ? '<button class="chip" data-act="hf-keep-all" data-id="' + esc(b.id) + '">Keep all on the drink</button>' : '') + '</div>'
    + housePartsHTML(b, item, ed && ed.field === 'parts' ? ed : null)
    + houseLinesHTML(b, item, ed && ed.field === 'lines' ? ed : null)
    + houseUpsellsHTML(b, item)
    + houseNoteHTML(b, item)
    + (h.said ? '<div class="tiny dim" role="status">' + esc(h.said) + '</div>' : '')
    + '</div>';
}

/* ---- the live word count: the boxes heard at the document ---------------- */
function houseOnInput(e){
  const t = e && e.target;
  const id = t && typeof t.id === 'string' ? t.id : '';
  if(id.indexOf('hf-line-') !== 0) return;
  const key = id.slice(8);
  const out = document.getElementById('hf-count-' + key);
  if(out) out.textContent = houseCountText(key, t.value || '');
}
if(typeof document !== 'undefined' && document && typeof document.addEventListener === 'function'){
  document.addEventListener('input', houseOnInput);
}

/* ---- the acts ------------------------------------------------------------ */
/* the boxes into state, then the act; every write ends on a repaint */
function houseFormulaAct(act, data){
  const api = houseHere(); const h = state.house;
  if(!api || !h){ houseRepaint(); return Promise.resolve(false); }
  if(typeof captureLiveInputs === 'function') captureLiveInputs();
  const id = data && data.id; const f = data && data.f;
  const item = houseItemFor(id);
  h.said = '';
  const mark = function(value, prev){
    const m = { value: value, by: 'person', ts: Date.now() };
    if(prev && typeof prev.model === 'string' && prev.model) m.model = prev.model;
    return m;
  };
  /* every write waits its turn with the wake (houseOneAtATime): a Keep
     pressed while another tab's write is being brought in would otherwise
     read the house before the wake and save over it, or be saved over */
  const write = function(field, m, said){
    return houseOneAtATime(function(){ return api.setMark('cocktail', id, field, m); }).then(function(ok){
      h.said = ok ? said : 'The house refused that write.';
      return ok;
    }).catch(function(){ h.said = 'The house could not be written on this device.'; return false; })
      .then(function(ok){ houseRepaint(); return ok; });
  };
  if(!item){ houseRepaint(); return Promise.resolve(false); }
  if(act === 'hf-edit'){
    const m = item[f]; const v = houseIsMark(m) ? m.value : null;
    h.edit = { id: id, field: f,
      parts: f === 'parts' ? Object.assign({ main: '', technique: '', sauce: '', sides: '', taste: '' }, v && typeof v === 'object' ? v : {}) : null,
      lines: f === 'lines' ? Object.assign({ s10: '', s20: '', s45: '' }, v && typeof v === 'object' ? v : {}) : null };
    houseRepaint(); return Promise.resolve(true);
  }
  if(act === 'hf-cancel'){ h.edit = null; houseRepaint(); return Promise.resolve(true); }
  if(act === 'hf-keep'){
    const m = item[f];
    if(!houseIsMark(m) || m.by === 'person'){ houseRepaint(); return Promise.resolve(false); }
    return write(f, mark(m.value, m), 'Kept. It is yours now and goes with the drink.');
  }
  if(act === 'hf-discard'){ h.edit = null; return write(f, null, 'Discarded.'); }
  if(act === 'hf-save'){
    const ed = h.edit && h.edit.id === id && h.edit.field === f ? h.edit : null;
    if(!ed){ houseRepaint(); return Promise.resolve(false); }
    let value = null;
    if(f === 'parts'){ value = {}; HOUSE_PART_KEYS.forEach(function(k){ value[k] = String(ed.parts[k] || '').trim(); }); }
    else if(f === 'lines'){ value = {}; HOUSE_LINE_KEYS.forEach(function(k){ value[k] = String(ed.lines[k] || '').trim(); }); }
    if(!value || !Object.keys(value).some(function(k){ return value[k]; })){ h.said = 'Nothing to save: every box is empty. Discard it instead.'; houseRepaint(); return Promise.resolve(false); }
    h.edit = null;
    /* a line over its cap is saved as typed and shown over its cap: the
       count is a word on the screen, not a lock on the door */
    return write(f, mark(value, item[f]), 'Saved, in your words.');
  }
  if(act === 'hf-keep-all'){
    const fields = HOUSE_FORMULA_FIELDS.filter(function(x){ return houseIsMark(item[x]) && item[x].by !== 'person'; });
    let n = 0;
    return houseOneAtATime(function(){
      let chain = Promise.resolve(true);
      fields.forEach(function(x){
        chain = chain.then(function(){ return api.setMark('cocktail', id, x, mark(item[x].value, item[x])).then(function(ok){ if(ok) n++; return ok; }); });
      });
      return chain;
    }).catch(function(){ return false; }).then(function(){
      h.said = n ? 'Kept, all ' + n + ' on the drink.' : 'Nothing of hers waits on this drink.';
      houseRepaint(); return n > 0;
    });
  }
  if(act === 'hf-upsell-add'){
    const pick = String(h.pick || '').trim();
    const ids = houseUpsellIds(item);
    const okPick = pick && pick !== id && houseOtherCocktails(id).some(function(c){ return c.id === pick; });
    if(!okPick || ids.indexOf(pick) >= 0){ h.said = 'Choose a drink on this house first.'; houseRepaint(); return Promise.resolve(false); }
    h.pick = '';
    return write('upsells', mark(ids.concat([pick]), item.upsells), 'Added.');
  }
  if(act === 'hf-upsell-drop'){
    const ids = houseUpsellIds(item).filter(function(x){ return x !== data.up; });
    return write('upsells', ids.length ? mark(ids, item.upsells) : null, 'Removed.');
  }
  if(act === 'hf-note-save'){
    const text = h.note && h.note.id === id ? String(h.note.text || '') : String(item.serviceNote || '');
    return houseOneAtATime(function(){ return api.setItemField('cocktail', id, { serviceNote: text.trim() }); }).then(function(ok){
      if(ok){
        h.note = null;
        /* the box as saved, so the repaint's grab reads the trimmed words */
        const box = document.getElementById('hf-note');
        if(box && box.value !== undefined) box.value = text.trim();
      }
      h.said = ok ? 'Saved. Your words, on the house.' : 'The house refused the note.';
      return ok;
    }).catch(function(){ h.said = 'The house could not be written on this device.'; return false; })
      .then(function(ok){ houseRepaint(); return ok; });
  }
  houseRepaint();
  return Promise.resolve(false);
}

/* ---- the two doors on Mine ---------------------------------------------- */
var HOUSE_REVIEW_STEPS = [['formula', 'The formula'], ['pairings', 'The pairings'], ['wines', 'The wines'], ['lexicon', 'The words'], ['scenarios', 'The table']];
/* the chips beside the house line, drawn only where the shared screens are */
function houseDoorsHTML(h, cur, busy){
  if(!houseUIHere() || !cur) return '';
  const chip = function(p, label){
    const open = h.panel === p;
    return '<button class="chip' + (open ? ' on' : '') + '" data-act="house-panel" data-p="' + p + '" aria-expanded="' + (open ? 'true' : 'false') + '"' + (busy ? ' disabled' : '') + '>' + label + '</button>';
  };
  return chip('read', 'The house') + chip('review', 'Hers, to look over');
}
/* the panel under the line: the step chips for the review, and the root
   the shared screen draws into after the render */
function houseDoorPanelHTML(h){
  if(!houseUIHere()) return '';
  if(h.panel === 'read') return '<div id="house-ui-root"></div>';
  if(h.panel === 'review'){
    const steps = HOUSE_REVIEW_STEPS.map(function(s){
      const on = h.step === s[0];
      return '<button class="chip' + (on ? ' on' : '') + '" data-act="house-step" data-s="' + s[0] + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + s[1] + '</button>';
    }).join('');
    return '<div class="row" style="gap:6px;flex-wrap:wrap" aria-label="The steps">' + steps + '</div><div id="house-ui-root"></div>';
  }
  return '';
}
function houseStep(s){
  const h = state.house;
  if(HOUSE_REVIEW_STEPS.some(function(x){ return x[0] === s; })) h.step = s;
}
/* the engine's own problems over an item's lines: a line over its cap, or
   one carrying a dash, each naming the lines mark */
function houseProblems(kind, id){
  const api = houseHere(); const lib = houseLibHere();
  const cur = api ? api.current() : null;
  if(!cur || !lib || typeof lib.lineProblems !== 'function') return [];
  const listName = { dish: 'dishes', wine: 'wines', cocktail: 'cocktails' }[kind];
  if(!listName) return [];
  const item = (cur[listName] || []).find(function(x){ return x && x.id === id; });
  const m = item && item.lines;
  if(!houseIsMark(m) || !m.value || typeof m.value !== 'object') return [];
  const out = [];
  (lib.lineProblems(m.value) || []).forEach(function(p){
    out.push({ field: 'lines', said: 'By the engine, the ' + HOUSE_LINE_WORDS[p.field].toLowerCase() + ' line runs ' + p.words + ' words against its cap of ' + p.cap + '.' });
  });
  HOUSE_LINE_KEYS.forEach(function(k){
    if(houseHasDash(m.value[k])) out.push({ field: 'lines', said: 'By the engine, the ' + HOUSE_LINE_WORDS[k].toLowerCase() + ' line carries a dash.' });
  });
  return out;
}
function houseUIHooks(){
  const api = houseHere();
  /* each hook's write waits its turn with the wake, as the pane's do */
  const quiet = function(run){ return houseOneAtATime(run).catch(function(){ return false; }); };
  return {
    setMark: function(kind, id, field, mark){ return api ? quiet(function(){ return api.setMark(kind, id, field, mark); }) : Promise.resolve(false); },
    discard: function(kind, id, field){ return api ? quiet(function(){ return api.setMark(kind, id, field, null); }) : Promise.resolve(false); },
    problems: houseProblems
  };
}
/* The root the shared screen was last drawn into. render() replaces #view
   whole, so the next root is a new element with no state of its own; an
   editor open in the old one, and the words typed in it, are read off that
   root before the draw and put back after, the way captureLiveInputs keeps
   the wing's own boxes. */
var houseUIRoot = null;
/* the open editor on a drawn root: which field, and what its boxes hold */
function houseUIEditorOf(root){
  const st = root && root.__ootHouseUI;
  const e = st && st.editing;
  if(!e || !e.kind || !e.id || !e.field || typeof root.querySelector !== 'function') return null;
  const ed = root.querySelector('[data-editor="' + e.field + '"]');
  const boxes = {};
  if(ed && typeof ed.querySelectorAll === 'function'){
    const all = ed.querySelectorAll('[data-e]');
    for(let i = 0; i < all.length; i++){
      const name = all[i].getAttribute('data-e');
      if(name) boxes[name] = all[i].value == null ? '' : String(all[i].value);
    }
  }
  return { kind: e.kind, id: e.id, field: e.field, mode: st.mode, step: st.step, boxes: boxes };
}
/* the same editor opened on the new root, by its own Edit chip, and its
   boxes filled with the words that were typed */
function houseUIReopen(root, open){
  const st = root && root.__ootHouseUI;
  if(!open || !st || st.mode !== open.mode || st.step !== open.step || typeof root.querySelector !== 'function') return;
  const sel = '[data-h="edit"][data-kind="' + open.kind + '"][data-id="' + open.id + '"][data-field="' + open.field + '"]';
  const chip = root.querySelector(sel);
  if(!chip || typeof chip.click !== 'function') return;
  chip.click();
  const ed = root.querySelector('[data-editor="' + open.field + '"]');
  if(!ed || typeof ed.querySelector !== 'function') return;
  Object.keys(open.boxes).forEach(function(name){
    const box = ed.querySelector('[data-e="' + name + '"]');
    if(box && box.value !== undefined) box.value = open.boxes[name];
  });
}
/* an editor open in a door: a storage wake waits for it, as for a form */
function houseUIEditing(){
  return !!(houseUIRoot && houseUIRoot.__ootHouseUI && houseUIRoot.__ootHouseUI.editing);
}
/* after every render: the shared screen drawn into its root, from the house */
function houseAfterRender(){
  if(typeof document === 'undefined' || !document || typeof document.getElementById !== 'function') return;
  const root = document.getElementById('house-ui-root');
  if(!root){ houseUIRoot = null; return; }
  const api = houseHere(); const ui = houseUIHere(); const h = state.house;
  if(!api || !ui || !h) return;
  const cur = api.current();
  const open = houseUIEditorOf(houseUIRoot);
  if(h.panel === 'review') ui.review(root, cur, h.step, houseUIHooks());
  else ui.readView(root, cur, houseUIHooks());
  houseUIRoot = root;
  houseUIReopen(root, open);
}
/* the engine changed: the pane or a panel that is showing is drawn again */
function houseRedrawIfShown(){
  const h = state.house;
  const paneOpen = state.menu && state.menu.open && state.menu.pane === 'formula';
  const doorOpen = h && (h.panel === 'read' || h.panel === 'review');
  if(paneOpen || doorOpen) houseRepaint();
}

/* ---- the pack, from My Data ---------------------------------------------- */
function housePackPanelHTML(){
  const api = houseHere();
  const cur = api ? api.current() : null;
  if(!cur) return '';
  const n = (cur.cocktails || []).length;
  return '<div class="panel p5 col" style="gap:12px">'
    + '<div class="eyebrow">The house</div>'
    + '<div class="small dim lh">' + esc(cur.name) + ', with its ' + n + ' drink' + (n === 1 ? '' : 's') + ' and everything kept on them, as one pack file another device or another wing can import.</div>'
    + '<div class="row"><button class="btn btn-ghost" data-act="house-export">Export the house as a pack</button></div>'
    + '</div>';
}
