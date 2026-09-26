/* ---------------- MENU: the bar you actually work behind ----------------

   The Ledger teaches 365 cocktails in the abstract. A working bartender does
   not need 365 drinks on a Tuesday. They need the eighteen on their own menu,
   cold, and they need to know what they can still put up when the amaro runs
   out at ten past eleven. This tab is those two questions and nothing else.

   It replaces two things that were built years apart and never connected: the
   My Bar tab, which held the venue’s list but could not match it against
   anything, and the My Shelf panel in Tools, which held the whole stock engine
   but was framed as home bartending, down to a preset called 'Starter home
   bar'. The framing is gone. The engine moved here, where the menu is.

   THE KEY DID NOT MOVE. Records still carry src:'My Bar', so the card key is
   still "My Bar · <name>", which is what keeps a house Margarita from
   colliding with the canon one in the SRS, the rail and the mastery board, and
   what lets a backup taken years ago restore into this tab. srcLabel() in
   ui-study.js is the join between the key and the word on screen, and the long
   note above DECK_SOURCES says which sites take which.

   Three sub-views, not seven. 190-odd stock chips above or below a drink list
   makes both unreadable, and seven tabs wrap on a phone: a wrapped tab row
   stops reading as a place you can be. Two nouns and one verb. */

function mintBarId(){
  let s = 'b-';
  while(s.length < 10) s += Math.floor(Math.random()*36).toString(36);
  return s;
}

/* ---- the record's shape, in one place ----------------------------------
   A bar record is rebuilt field by field in exactly one function, so a field
   that is not named here does not survive a save. That is the point and the
   trap: `maitre` (her marks) and `draft` (no spec yet) are named below, and
   every future field has to be, or the first edit after an import silently
   drops it. The backup merge in ui-new.js has its own clause for each.

   One shape wherever the record came from: the form, a backup from this app,
   a backup from the standalone Bartender’s Ledger (whose empty glass and
   garnish were a long dash), or a hand-edited file. Empty is '', and
   ticketHTML draws the dash at display time. Runs on every import, at boot,
   and (in this wing) under saveBarRecord, which files through it rather than
   rebuilding the record beside it. */
function barText(v){
  if(v === undefined || v === null) return '';
  const s = String(v).trim();
  /* the older dash placeholder for an empty glass or garnish (a hyphen, an
     en dash or an em dash), read as empty; the two dashes are escapes so no
     literal em dash spends the suite's dash headroom */
  return /^(?:-|\u2013|\u2014)$/.test(s) ? '' : s;
}

/* Her marks on a record: { field: { value, by:'maitre'|'person', ts, model? } }
   plus `kept`, the chat answers a person kept, [{ q, a, ts, model? }]. Only
   the fields the plan names survive, so a stray key cannot ride in through a
   hand-edited backup, and NO field about allergens exists to carry. Returns
   null when nothing is left, so a record without marks has no `maitre` key. */
var MAITRE_FIELDS = ['guest', 'say', 'why', 'pairs', 'origin', 'method', 'glass', 'garnish', 'ingredientsNamed'];
function normalizeMaitre(m){
  if(!m || typeof m !== 'object' || Array.isArray(m)) return null;
  const out = {};
  MAITRE_FIELDS.forEach(function(f){
    const mark = m[f];
    if(!mark || typeof mark !== 'object') return;
    const value = Array.isArray(mark.value) ? mark.value.map(barText).filter(Boolean) : barText(mark.value);
    if(!value || (Array.isArray(value) && !value.length)) return;
    const clean = { value: value, by: mark.by === 'person' ? 'person' : 'maitre', ts: Number(mark.ts) || 0 };
    if(mark.model) clean.model = barText(mark.model);
    out[f] = clean;
  });
  if(Array.isArray(m.kept)){
    const kept = m.kept.filter(function(k){ return k && typeof k === 'object' && barText(k.a); })
      .map(function(k){ const c = { q: barText(k.q), a: barText(k.a), ts: Number(k.ts) || 0 }; if(k.model) c.model = barText(k.model); return c; });
    if(kept.length) out.kept = kept;
  }
  return Object.keys(out).length ? out : null;
}

/* One record, read into the shape every engine expects. Null for a record
   with no name, which is nothing at all. A record with a name and NO spec is
   a DRAFT: the importer files one when the menu printed a name and nothing
   else, and `draft:true` is what keeps it out of the stock report, the rail
   and the spec quiz until a person gives it a line. */
function normalizeBarRecord(b){
  if(!b || typeof b !== 'object' || Array.isArray(b)) return null;
  const name = barText(b.name);
  const raw = Array.isArray(b.spec) ? b.spec : (typeof b.spec === 'string' ? b.spec.split(/\r?\n/) : []);
  const spec = raw.map(barText).filter(Boolean);
  if(!name) return null;
  const rec = { id: barText(b.id) || mintBarId(), name:name, spec:spec,
    method: barText(b.method), glass: barText(b.glass), garnish: barText(b.garnish), note: barText(b.note),
    family: barText(b.family) || 'Other', spirit: barText(b.spirit) || 'Other',
    price: barText(b.price), ts: Number(b.ts) || 0 };
  if(!spec.length) rec.draft = true;
  const maitre = normalizeMaitre(b.maitre);
  if(maitre) rec.maitre = maitre;
  return rec;
}
function normalizeBarRecords(list){
  const out = { bar:[], skipped:0 };
  (Array.isArray(list) ? list : []).forEach(b => {
    const r = normalizeBarRecord(b);
    if(r) out.bar.push(r); else out.skipped++;
  });
  return out;
}

function blankBarForm(){
  return { name:'', spec:['',''], method:'', glass:'', garnish:'', note:'', family:'Other', spirit:'Other', price:'' };
}

/* render() rebuilds the whole view, so any act that repaints mid-edit (adding a
   spec line, opening a row) must first read the live inputs back into state or
   the typed text dies with the DOM. Same rule as the tasting form’s notes. */
function captureBarForm(){
  const f = state.menu.form; if(!f) return;
  const g = id => { const el2 = document.getElementById(id); return el2 ? el2.value : null; };
  ['name','method','glass','garnish','price'].forEach(k => { const v = g('mb-'+k); if(v !== null) f[k] = v; });
  const note = g('mb-note');   if(note !== null) f.note = note;
  const fam  = g('mb-family'); if(fam  !== null) f.family = fam;
  const sp   = g('mb-spirit'); if(sp   !== null) f.spirit = sp;
  f.spec = f.spec.map((line, i) => { const v = g('mb-spec-'+i); return v !== null ? v : line; });
}

/* Every cached view of the drink list must be told the list moved: the deck
   memo feeds every engine, and the search index holds a row per drink. */
function barChanged(){
  allDrinks._c = null;
  SEARCH_INDEX = null;
}

/* One door for filing a record, so the form and the importer both arrive the
   same way. Returns the record, or a string explaining the refusal. The
   caller decides what to do with the refusal, because the form shows it
   inline and a bulk import counts it.

   opts.allowEmptySpec is the importer's licence and nobody else's. A menu
   prints 'Negroni 13' and nothing else, and refusing that row meant the
   importer refused half of every real cocktail list. Filed with no spec it
   is a DRAFT, stamped draft:true, shown on the list as "needs a spec", and
   skipped by every engine that would read a blank spec as a fact (the stock
   report, the rail, the spec quiz). The form never passes the licence, so a
   person typing a drink in still has to give it a line; and a draft that is
   edited and given one stops being a draft, because the flag is derived from
   the spec here rather than carried. */
function saveBarRecord(f, editingId, opts){
  opts = opts || {};
  const name = (f.name||'').trim();
  const spec = (f.spec||[]).map(x => (x||'').trim()).filter(Boolean);
  if(!name) return 'Give the drink a name.';
  if(!spec.length && !opts.allowEmptySpec) return 'A drink needs at least one line of spec.';
  /* case-insensitive, because a menu that lists both 'Paloma' and 'paloma' is
     a typo rather than two drinks, and the SRS key would not tell them apart */
  const clash = (progress.bar||[]).find(x =>
    x.name.toLowerCase() === name.toLowerCase() && x.id !== editingId);
  if(clash) return 'Your list already has a ' + clash.name + '.';
  progress.bar = progress.bar || [];
  const i = editingId ? progress.bar.findIndex(x => x.id === editingId) : -1;
  const prev = i >= 0 ? progress.bar[i] : null;
  /* Her marks ride with the record: from the form when the importer or the
     lines pane put them there, else from the record being edited, because
     the edit form carries no marks and an edit that dropped every kept line
     would be a bug nobody could see until the next shift. The test is
     whether the form CARRIES a block, not whether the block has anything
     in it: Keep on her last mark hands over an empty block, and reading
     that as "no block, keep the record's" would put the mark straight
     back on the record it was just kept off. */
  const maitre = f.maitre !== undefined ? normalizeMaitre(f.maitre) : (prev ? normalizeMaitre(prev.maitre) : null);
  /* through the normaliser rather than beside it: one function decides what
     a bar record looks like, and the form is not a special case. It is the
     normaliser that stamps `draft` on an empty spec and reads `maitre` back
     through normalizeMaitre (a second pass over a block already cleaned,
     which changes nothing), so the form cannot file a shape the boot pass
     would then rewrite. The wing keeps '' for an empty glass or garnish and
     lets ticketHTML draw the dash at display time; the standalone writes the
     dash into the record, and that is the one place the two disagree. */
  const rec = normalizeBarRecord({ id: editingId || mintBarId(), name: name, spec: spec,
    method: f.method, glass: f.glass, garnish: f.garnish, note: f.note,
    family: f.family, spirit: f.spirit, price: f.price, ts: Date.now(), maitre: maitre });
  if(!rec) return 'Give the drink a name.';
  /* An edit whose record has gone is not an add. Falling through to push()
     RESURRECTED a drink the bartender had already deleted, keeping its old
     id and losing the practice record the delete confirm promised to take
     with it. The form is open on something that no longer exists, and the
     honest answer is to say so rather than to invent it back. */
  if(editingId && i < 0){
    return 'That drink was removed while this form was open, so there is nothing to save it back onto.';
  }
  if(i >= 0){
    /* a rename must carry its review history to the new key or the drink comes
       back unseen and the old key becomes an immortal orphan */
    const oldKey = 'My Bar · ' + progress.bar[i].name, newKey = 'My Bar · ' + name;
    /* Both keys can hold a card here too, if a rename collides with a name
       that was used before. Same rule as the import: merge, never strand. */
    if(oldKey !== newKey && progress.cards && progress.cards[oldKey]){
      progress.cards[newKey] = (typeof bestCard === 'function')
        ? bestCard(progress.cards[newKey], progress.cards[oldKey])
        : (progress.cards[newKey] || progress.cards[oldKey]);
      delete progress.cards[oldKey];
    }
    progress.bar[i] = rec;
  } else progress.bar.push(rec);
  barChanged();
  saveProgress();
  return rec;
}

/* ---- quiz constructors ----
   These take the RAW bar record. They stay out of the canon constructors on
   purpose: qFamily dereferences FAMILIES[c.family] and a house drink filed
   under 'Other' would throw it. Name decoys come from the rest of the list
   first, the drinks a colleague actually confuses, topped up from canon. */
function myBarNameDecoys(b, n){
  const own = (progress.bar||[]).filter(x => x.id !== b.id).map(x => x.name);
  const canon = COCKTAILS.map(c => c.name).filter(nm => nm !== b.name && own.indexOf(nm) < 0);
  return sample(own, n).concat(sample(canon, n)).slice(0, n);
}
function qMyBarTicket(b){
  return { prompt:'Name this drink from your own menu:', ticket:b, ticketType:'mybar',
    options: shuffle([b.name, ...myBarNameDecoys(b, 3)]), answer:b.name,
    explain: b.name+': '+(b.method||'as specced').toLowerCase()+(b.glass ? ', '+b.glass.toLowerCase() : '')+'. '+(b.note||'') };
}
function qMyBarGlass(b){
  const wrong = sample([...new Set(COCKTAILS.map(x => x.glass))].filter(g => g !== b.glass), 3);
  return { prompt:'Which glass does your '+b.name+' go in?',
    options: shuffle([b.glass, ...wrong]), answer:b.glass,
    explain: b.name+': '+b.glass+'. '+(b.garnish ? 'Garnish: '+b.garnish+'.' : '') };
}
function qMyBarSpecLine(b){
  const line = b.spec[Math.floor(Math.random()*b.spec.length)];
  const wrong = decoyLines({ name:b.name, spec:b.spec, src:'My Bar', group:b.family }, 3);
  return { prompt:'Which line belongs in your '+b.name+'?',
    options: shuffle([line, ...wrong]), answer:line,
    explain: b.name+': '+b.spec.join(' · ') };
}

/* ---- the form ----
   opts exists so the importer can reuse this exact form for one row at a time
   rather than growing a second one that drifts. Today’s behaviour is every
   default, so the two call sites in this file pass nothing. */
function myBarFormHTML(opts){
  opts = opts || {};
  const f = state.menu.form;
  const specRows = f.spec.map((line, i) =>
    '<div class="row" style="gap:8px"><input class="input" id="mb-spec-'+i+'" aria-label="Spec line '+(i+1)+'" placeholder="'+(i===0?'2 oz house rum':'3/4 oz lime')+'" value="'+esc(line)+'" style="flex:1">'
    + (f.spec.length > 1 ? '<button class="chip" data-act="menu-del-line" data-i="'+i+'" title="Remove this line">✕</button>' : '')
    + '</div>').join('');
  const famOpts = Object.keys(FAMILIES).concat('Other').map(k =>
    '<option value="'+esc(k)+'"'+(f.family===k?' selected':'')+'>'+esc(k)+'</option>').join('');
  const spirits = [...new Set(COCKTAILS.map(c => c.spirit))].sort().concat('Other');
  const spOpts = spirits.map(s =>
    '<option value="'+esc(s)+'"'+(f.spirit===s?' selected':'')+'>'+esc(s)+'</option>').join('');
  const err = state.menu.err
    ? '<div class="small" style="color:var(--oxblood-text)">'+esc(state.menu.err)+'</div>' : '';
  return '<div class="panel p5 col" style="gap:14px">'
    + '<div class="eyebrow">'+esc(opts.title || (state.menu.editing ? 'Edit the drink' : 'Add a drink from your menu'))+'</div>'
    + '<div class="row" style="gap:10px">'
    + '<input class="input" id="mb-name" aria-label="Drink name" placeholder="What the menu calls it" value="'+esc(f.name)+'" style="flex:2;min-width:160px">'
    + '<input class="input" id="mb-price" aria-label="Price" placeholder="Price (optional)" value="'+esc(f.price)+'" style="flex:1;min-width:90px">'
    + '</div>'
    + '<div><div class="eyebrow mb1">The spec, one line per ingredient</div><div class="col-sm" style="gap:6px">'+specRows+'</div>'
    + '<div class="row mt1"><button class="chip" data-act="menu-add-line">+ Add a line</button></div></div>'
    + '<div class="row" style="gap:10px">'
    + '<input class="input" id="mb-method" aria-label="Method" placeholder="Method, e.g. Shake, strain up" value="'+esc(f.method)+'" style="flex:1;min-width:140px">'
    + '<input class="input" id="mb-glass" aria-label="Glass" placeholder="Glass" value="'+esc(f.glass)+'" style="flex:1;min-width:110px">'
    + '<input class="input" id="mb-garnish" aria-label="Garnish" placeholder="Garnish" value="'+esc(f.garnish)+'" style="flex:1;min-width:110px">'
    + '</div>'
    + '<div class="row" style="gap:10px">'
    + '<div style="flex:1;min-width:140px"><label class="eyebrow mb1" for="mb-family" style="display:block">Family</label><select class="input" id="mb-family">'+famOpts+'</select></div>'
    + '<div style="flex:1;min-width:140px"><label class="eyebrow mb1" for="mb-spirit" style="display:block">Base spirit</label><select class="input" id="mb-spirit">'+spOpts+'</select></div>'
    + '</div>'
    + '<div><div class="eyebrow mb1">Menu description or story (optional)</div>'
    + '<textarea class="input" id="mb-note" rows="2" aria-label="Menu description" placeholder="What the menu says, or what the guest gets told.">'+esc(f.note)+'</textarea></div>'
    + err
    + '<div class="row"><button class="btn btn-brass" data-act="menu-save">'+esc(opts.saveLabel || (state.menu.editing ? 'Save changes' : 'Add to the menu'))+'</button>'
    + '<button class="chip" data-act="menu-cancel">Cancel</button></div>'
    + '</div>';
}

/* The balance in words, and an honest answer when there is nothing to read.

   A menu is written without measures far more often than not, and balanceOf
   returns all zeros for a spec with no ounces in it. Printing 'strong 0 oz'
   over that would be the ledger inventing a reading it does not have, which
   is the same sin as the old matcher’s silent yes. So the zero case says why
   it is zero and what to do about it. */
function menuBalanceWords(b){
  const bal = balanceOf(b);
  const total = bal.strong + bal.sweet + bal.sour + bal.long + bal.modifier;
  if(total < 0.05){
    return 'No measures on this spec, so there is no balance to read. Put ounces on the lines and '
      + 'the ledger can weigh it, cost it and tell you its strength.';
  }
  const named = [['strong','spirit'],['sour','sour'],['sweet','sweet'],['modifier','wine or bitter'],['long','long']]
    .filter(function(p){ return bal[p[0]] > 0.05; })
    .sort(function(a,z){ return bal[z[0]] - bal[a[0]]; });
  const shape = bal.long > bal.strong ? 'a long drink'
    : bal.sour > 0.05 && bal.sweet > 0.05 ? 'a sour, built on the sweet and sour either side of the spirit'
    : bal.sour < 0.05 && bal.long < 0.05 ? 'spirit-forward, stirred territory'
    : 'a mixed build';
  return 'Reads as ' + shape + ': '
    + named.map(function(p){ return p[1] + ' ' + ozNice(bal[p[0]]); }).join(', ') + ' oz.';
}

/* ---- what a drink is short of, in one sentence -------------------------
   Silence is the default. A drink that is fine carries no badge at all,
   because a list where every row shouts is a list nobody reads. Only two
   things earn a mark: it died tonight, or the bar never carried the bottle. */
function menuStatus(b){
  if(!state.tools.shelf.length) return null;
  /* a draft has no spec to match, and the list already says "needs a spec" */
  if(b.draft) return null;
  const out = outFor(b);
  const miss = missingFor(b);
  if(!out.length && !miss.length) return null;
  /* Both at once is the common case on a bad night and it needs saying, not
     picking between: a drink whose rye just died AND that was already one
     orgeat short is not fixed by the delivery. Reporting only the 86 would
     send someone to the storeroom for the wrong bottle. */
  const bits = [];
  if(out.length) bits.push('86: no ' + out.map(reqLabel).join(', ').toLowerCase());
  if(miss.length) bits.push((miss.length > 2 ? miss.length + ' short' : 'short: ' + miss.map(reqLabel).join(', ').toLowerCase()));
  return { cls: out.length ? 'brass' : '', text: bits.join(' · ') };
}

/* ---- what to tell the guest: her line, kept or not ----------------------
   Shown on the Build pane whenever the record carries a guest line. Hers
   until a person keeps it (Keep and Edit both set by:'person'); an unkept
   line is marked so in words and reaches no drill, no rail and no deck. The
   textarea exists only while Edit is open, one at a time, and its id is in
   captureLiveInputs so a repaint cannot eat the edit. */
function menuGuestHTML(b){
  const m = b.maitre && b.maitre.guest;
  if(!m) return '';
  const kept = m.by === 'person';
  /* one edit box at a time across every mark on the drink, so an open edit
     on her glass must not open this textarea too */
  const ed = state.menu.lines && state.menu.lines.id === b.id && (state.menu.lines.f || 'guest') === 'guest' ? state.menu.lines : null;
  const chip = '<span class="chip tiny">' + (kept ? 'Kept' : 'Hers, not yet kept') + '</span>';
  const body = ed
    ? '<textarea class="input" id="mb-guest" rows="3" aria-label="What to tell the guest">' + esc(ed.text) + '</textarea>'
    : '<div class="small lh">' + esc(m.value) + '</div>';
  const chips = ed
    ? '<button class="chip" data-act="lines-keep" data-id="'+esc(b.id)+'">Keep</button>'
      + '<button class="chip" data-act="lines-cancel" data-id="'+esc(b.id)+'">Cancel</button>'
    : (kept ? '' : '<button class="chip" data-act="lines-keep" data-id="'+esc(b.id)+'">Keep</button>')
      + '<button class="chip" data-act="lines-edit" data-id="'+esc(b.id)+'">Edit</button>'
      + '<button class="chip" data-act="lines-discard" data-id="'+esc(b.id)+'">Discard</button>';
  return '<div class="panel p4 col-sm" style="gap:8px">'
    + '<div class="row between" style="flex-wrap:wrap;gap:6px"><div class="eyebrow">What to tell the guest</div>' + chip + '</div>'
    + body
    + (kept ? '' : '<div class="tiny dim lh">Written by the Maître d’, not yet yours. Keep it as it stands, edit it into your own words, or discard it. Until you keep it, it is shown here and nowhere else.</div>')
    + '<div class="row" style="gap:6px;flex-wrap:wrap">' + chips + '</div>'
    + '</div>';
}

/* ---- her method, glass and garnish: a mark each, kept INTO the field ----
   A menu prints none of the three, so the desk reads none; when she reads a
   menu they arrive as marks beside the row (importAskMaitre) and reach the
   record as rec.maitre.method, .glass and .garnish, never the plain fields.
   This block is the one door by which they can. Keep writes the value into
   the plain field through saveBarRecord, the door every record passes, and
   drops the mark: the field is the decision now, and an export carries it
   plain like anything typed. Edit does the same with the person's words.
   Discard drops the mark. Until Keep, the ticket above shows the field
   empty and the mark shows here and on no ticket, rail or card. The guest
   line is not here because it has no plain field to be kept into: it stays
   a mark, kept by its `by`. */
var MAITRE_PLAIN_FIELDS = ['method', 'glass', 'garnish'];
function menuFieldMarksHTML(b){
  const m = b.maitre; if(!m) return '';
  const fields = MAITRE_PLAIN_FIELDS.filter(function(f){ return m[f]; });
  if(!fields.length) return '';
  const ed = state.menu.lines && state.menu.lines.id === b.id ? state.menu.lines : null;
  const rows = fields.map(function(f){
    const mark = m[f];
    const editing = !!(ed && ed.f === f);
    const label = f.charAt(0).toUpperCase() + f.slice(1);
    /* a word, not a colour: a foreign backup can carry one of these already
       marked as a person's, which is theirs but still not on the drink */
    const chip = '<span class="chip tiny">' + (mark.by === 'person' ? 'Yours, not yet on the drink' : 'Hers, not yet kept') + '</span>';
    const body = editing
      ? '<input class="input" id="mb-hers" aria-label="' + esc(label) + ', as she read it" value="' + esc(ed.text) + '">'
      : '<div class="small lh">' + esc(String(mark.value)) + '</div>';
    const chips = editing
      ? '<button class="chip" data-act="lines-keep" data-id="'+esc(b.id)+'" data-f="'+f+'">Keep</button>'
        + '<button class="chip" data-act="lines-cancel" data-id="'+esc(b.id)+'">Cancel</button>'
      : '<button class="chip" data-act="lines-keep" data-id="'+esc(b.id)+'" data-f="'+f+'">Keep</button>'
        + '<button class="chip" data-act="lines-edit" data-id="'+esc(b.id)+'" data-f="'+f+'">Edit</button>'
        + '<button class="chip" data-act="lines-discard" data-id="'+esc(b.id)+'" data-f="'+f+'">Discard</button>';
    return '<div class="col-sm" style="gap:6px">'
      + '<div class="row between" style="flex-wrap:wrap;gap:6px"><div class="tiny dim">' + esc(label) + '</div>' + chip + '</div>'
      + body
      + '<div class="row" style="gap:6px;flex-wrap:wrap">' + chips + '</div></div>';
  }).join('');
  return '<div class="panel p4 col-sm" style="gap:10px">'
    + '<div class="eyebrow">Her method, glass and garnish</div>'
    + rows
    + '<div class="tiny dim lh">Read by the Maître d’, not printed on the menu. Keep one and it becomes the drink’s own field; until then it is shown here and on no ticket, rail or card.</div>'
    + '</div>';
}

/* Keep for one of the three: the value into the field through saveBarRecord
   and the mark off the block, in one save. A draft keeps the importer's
   licence here, because Keep changes no spec: the draft was filed under it
   and stays a draft, and refusing to keep her glass on a draft until
   somebody typed a spec would be a door that only says no. Returns the
   record, or the refusal sentence, the way saveBarRecord does. */
function keepMaitreField(b, f, text){
  if(!b || MAITRE_PLAIN_FIELDS.indexOf(f) < 0 || !b.maitre || !b.maitre[f]) return 'Nothing of hers is on that field.';
  const value = barText(text);
  if(!value) return 'Nothing to keep: the line is empty. Discard it instead.';
  const block = Object.assign({}, b.maitre); delete block[f];
  const form = { name:b.name, spec:(b.spec||[]).slice(), method:barText(b.method), glass:barText(b.glass), garnish:barText(b.garnish),
    note:barText(b.note), family:b.family||'Other', spirit:b.spirit||'Other', price:barText(b.price), maitre:block };
  form[f] = value;
  return saveBarRecord(form, b.id, { allowEmptySpec: !!b.draft });
}

/* ---- the four panes inside an open drink ------------------------------- */
function menuPaneHTML(b, pane){
  if(pane === 'taste'){
    const words = menuBalanceWords(b);
    return '<div class="col-sm" style="gap:12px">'
      + (b.family && b.family !== 'Other' && typeof familyMarksHTML === 'function'
          ? familyMarksHTML(b.family, 'Judged as a '+b.family+': how to tell it went right')
          : '<div class="small dim lh">No family set, so there are no marks to judge it against. '
            + 'Set one on the drink and the standard appears here.</div>')
      + '<div><div class="eyebrow mb1">The balance</div><div class="small lh">'+esc(words)+'</div></div>'
      + (b.note ? '<div><div class="eyebrow mb1">What to say</div>'
          + '<div class="small lh">'+esc(b.note)+'</div>'
          + '<div class="tiny dim mt1">This is the line a guest hears. Say it the same way twice and it becomes the drink.</div></div>'
          : '<div class="tiny dim lh">No description on this one. Edit the drink and give it the sentence you would '
            + 'actually say to a guest, and it will be here on the next shift.</div>')
      + '</div>';
  }
  if(pane === 'canon'){
    const exact = COCKTAILS.find(c => c.name.toLowerCase() === b.name.toLowerCase());
    const kin = exact ? { match:exact, why:'same name' } : nearestKin(b, COCKTAILS);
    if(!kin.match){
      return '<div class="small dim lh">Nothing in the canon is close enough to this to compare it to honestly, '
        + 'which usually means it is genuinely yours. That is a good answer.</div>';
    }
    const c = kin.match;
    const diffs = [];
    const unknown = [];

    /* INGREDIENTS: identity only, which is all reqsOf can answer. */
    const mine = reqsOf(b).map(reqKey), theirs = reqsOf(c).map(reqKey);
    const extra = reqsOf(b).filter(r => theirs.indexOf(reqKey(r)) < 0);
    const absent = reqsOf(c).filter(r => mine.indexOf(reqKey(r)) < 0);
    if(extra.length) diffs.push('Yours adds ' + extra.map(reqLabel).join(', ').toLowerCase() + '.');
    if(absent.length) diffs.push('The canon has ' + absent.map(reqLabel).join(', ').toLowerCase() + ' and yours does not.');

    /* PROPORTIONS, which is where two drinks with the same ingredients stop
       being the same drink. This was missing entirely, so a Margarita at
       3 : 1/4 : 1 1/2 read as identical to the book’s 2 : 1 : 1. */
    const mineM = measureReport(b), theirsM = measureReport(c);
    if(mineM.kind === 'all' && theirsM.kind !== 'none'){
      const ba = balanceOf(b), bb = balanceOf(c);
      const moved = [['strong','spirit'],['sour','sour'],['sweet','sweet'],['modifier','wine or bitter'],['long','long']]
        .filter(function(p){ return Math.abs(ba[p[0]] - bb[p[0]]) >= 0.25; });
      if(moved.length){
        diffs.push('Proportions: ' + moved.map(function(p){
          return p[1] + ' ' + ozNice(ba[p[0]]) + ' against the canon\u2019s ' + ozNice(bb[p[0]]);
        }).join(', ') + ' oz.');
      }
    } else if(mineM.kind !== 'all'){
      /* THE CASE THAT PRODUCED THE FALSE CLAIM. A menu prints no measures, so
         an imported drink has none, and silence about proportions was being
         read as agreement about them. Say what could not be compared. */
      unknown.push('Proportions could not be compared: yours carries '
        + (mineM.measured ? 'measures on only ' + mineM.measured + ' of ' + mineM.total + ' lines' : 'no measures')
        + ', and the canon is a set of ratios.');
    }

    /* METHOD and GLASS. A blank is NOT a match: the importer leaves both empty
       on purpose because a menu prints neither, and the old guards read that
       silence as sameness. */
    /* The wing stores an empty glass as an empty string and lets ticketHTML
       draw the dash; the standalone stores the dash itself. Testing for both
       costs nothing and keeps the two files diffable. The escape is written
       out because the published dash baseline counts the character. */
    const said = function(v){ return v && v !== '\u2014' ? String(v) : ''; };
    [['method','Method'],['glass','Glass'],['garnish','Garnish']].forEach(function(p){
      const m = said(b[p[0]]), t = said(c[p[0]]);
      if(!t) return;
      if(!m) unknown.push(p[1] + ': yours does not say. The canon is ' + t.toLowerCase() + '.');
      else if(m.toLowerCase() !== t.toLowerCase()) diffs.push(p[1] + ': yours is ' + m.toLowerCase() + ', the canon is ' + t.toLowerCase() + '.');
    });
    return '<div class="col-sm" style="gap:12px">'
      + '<div class="small dim lh">' + (exact
          ? 'The canon carries a drink by this name. Yours is the house spec and it wins at your bar: this pane is here so you know what a guest who has drunk one elsewhere is expecting.'
          : 'Nothing in the canon shares the name, so this is the nearest relative'
            + (kin.why ? ' (' + esc(kin.why) + ')' : '') + '.')
      + '</div>'
      + '<div class="row" style="gap:12px;flex-wrap:wrap;align-items:flex-start">'
      + '<div style="flex:1;min-width:230px"><div class="eyebrow mb1">Yours</div>'+ticketHTML(b)+'</div>'
      + '<div style="flex:1;min-width:230px"><div class="eyebrow mb1">The canon</div>'+ticketHTML(c)+'</div>'
      + '</div>'
      + (diffs.length
          ? '<div><div class="eyebrow mb1">What is different</div><div class="col-sm" style="gap:4px">'
            + diffs.map(d => '<div class="small lh">'+esc(d)+'</div>').join('')+'</div></div>'
          : '')
      /* What could NOT be compared, kept apart from what differs. Saying
         nothing here is what let the pane claim two specs agreed when it had
         only checked their ingredient names. */
      + (unknown.length
          ? '<div><div class="eyebrow mb1">What could not be compared</div><div class="col-sm" style="gap:4px">'
            + unknown.map(function(u){ return '<div class="small dim lh">'+esc(u)+'</div>'; }).join('')+'</div></div>'
          : '')
      + ((!diffs.length && !unknown.length)
          ? '<div class="small lh">Everything this pane can compare matches: the ingredients, the proportions, the method and the glass. Yours is the canon spec.</div>'
          : '')
      + '</div>';
  }
  if(pane === 'cost'){
    return '<div class="col-sm" style="gap:10px">'
      + '<div style="display:flex;justify-content:center">'+costTicketHTML(b)+'</div>'
      + '<div class="tiny dim lh">The bottle price, size and target pour come from Tools → Pour Cost. '
      + 'Set them once and every drink on the menu is costed against the same numbers.</div>'
      + '</div>';
  }
  return (b.draft
      ? '<div class="small lh" style="padding:0 4px 8px">Needs a spec. The menu printed a name and nothing else, so this is a draft: '
        + 'it is on your list to remember, and out of the stock report, the rail and the spec quiz until you give it a line. '
        + 'Edit the drink and put the ingredients in, measures if you know them.</div>'
      : '')
    + ticketHTML(b) + menuGuestHTML(b) + menuFieldMarksHTML(b);
}

/* ---- sub-view 1: the menu ---------------------------------------------- */
function menuListHTML(){
  const bar = progress.bar || [];
  if(!bar.length){
    return '<div class="panel p5 col tc" style="align-items:center;gap:12px">'
      + '<div class="small dim lh" style="max-width:440px">Nothing on the list yet. Start with the drink you make most. '
      + 'Four drinks in, the quiz opens a round built entirely from your menu.</div>'
      + '<button class="btn btn-brass" data-act="menu-view" data-v="add">Add the first drink</button></div>';
  }
  const stocked = state.tools.shelf.length;
  /* drafts are not pourable: they have no spec to match, and missingFor
     fails closed on them rather than reading a blank spec as "needs nothing" */
  const pourable = stocked ? bar.filter(b => !b.draft && !missingFor(b, liveShelf()).length).length : 0;
  const drafts = bar.filter(b => b.draft).length;
  const out86 = (progress.eightySix || []).length;
  const standing = '<div class="row between" style="padding:0 4px;flex-wrap:wrap;gap:6px">'
    + '<span class="eyebrow">'+bar.length+' drink'+(bar.length===1?'':'s')+' on the list'
    + (drafts ? ' · '+drafts+' need'+(drafts===1?'s':'')+' a spec' : '')+'</span>'
    + (stocked
        ? '<span class="tiny dim">'+pourable+' pourable right now'
          + (out86 ? ' · '+out86+' ingredient'+(out86===1?'':'s')+' 86’d' : '')+'</span>'
        : '<button class="chip tiny" data-act="menu-view" data-v="stock">Tell it what the bar stocks</button>')
    + '</div>';
  const rows = bar.map(b => {
    const open = state.menu.open === b.id;
    const st = menuStatus(b);
    const head = '<button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="menu-open" data-id="'+esc(b.id)+'" data-open="'+(open?'1':'0')+'">'
      + '<span class="bold">'+esc(b.name)+'</span>'
      + '<span class="tiny dim"> · '+esc(b.family||'')+(b.spirit && b.spirit!=='Other' ? ' · '+esc(b.spirit) : '')
      + (b.price ? ' · '+esc(b.price) : '')+'</span>'
      + (b.draft ? '<span class="chip tiny push">needs a spec</span>' : '')
      + (st ? '<span class="chip '+st.cls+' tiny'+(b.draft?'':' push')+'">'+esc(st.text)+'</span>' : '')
      + '</button>';
    if(!open) return '<div class="panel p4 col" style="gap:0">'+head+'</div>';
    const pane = state.menu.pane || 'build';
    const chips = [['build','Build'],['taste','Taste and tell'],['canon','Against the classics'],['cost','Cost and pour']]
      .map(p => '<button class="chip'+(pane===p[0]?' on':'')+'" aria-pressed="'+(pane===p[0]?'true':'false')+'" data-act="menu-pane" data-p="'+p[0]+'">'+p[1]+'</button>').join(' ');
    const body = '<div class="col-sm" style="gap:10px;padding:10px 0 4px">'
      + '<div class="row" style="gap:6px;flex-wrap:wrap">'+chips+'</div>'
      + menuPaneHTML(b, pane)
      + '<div class="row" style="gap:8px"><button class="chip" data-act="menu-edit" data-id="'+esc(b.id)+'">Edit</button>'
      + '<button class="chip" data-act="menu-del" data-id="'+esc(b.id)+'">Remove</button></div></div>';
    return '<div class="panel p4 col" style="gap:0">'+head+body+'</div>';
  }).join('');
  return '<div class="col-sm" style="gap:8px">'+standing+rows+'</div>';
}

/* ---- sub-view 2: the stock ---------------------------------------------
   The gap this tab exists to close. The matcher used to be hardcoded to the
   three canon sources, so a bartender’s own menu could not be measured against
   their own stock. It needed no engine work: missingFor reads .spec, and a bar
   record has one. */
function menuStockHTML(){
  const t = state.tools;
  const out = progress.eightySix || [];
  const chipFor = function(s){
    const on = t.shelf.indexOf(s[0])>=0;
    const dead = out.indexOf(s[0])>=0;
    return '<button class="chip'+(on?' on':'')+(dead?' brass':'')+'" aria-pressed="'+(on?'true':'false')+'" data-act="stock-toggle" data-k="'+s[0]+'">'+esc(s[1])+(dead?' ✕':'')+'</button>';
  };
  const shelfChips = SHELF_GROUPS.map(function(g){
    const rows = SHELF.filter(function(s){ return (ING[s[0]]||{}).kind === g[0]; });
    if(!rows.length) return '';
    const nOn = rows.filter(function(s){ return t.shelf.indexOf(s[0])>=0; }).length;
    return '<div class="col-sm" style="gap:6px">'
      + '<div class="row between"><span class="eyebrow">'+esc(g[1])+'</span>'
      + '<span class="tiny dim push">'+nOn+' of '+rows.length+'</span></div>'
      + '<div class="row" style="gap:6px">'+rows.map(chipFor).join(' ')+'</div></div>';
  }).join('');
  const presets = SHELF_PRESETS.map(function(p,i){
    return '<button class="btn btn-ghost tiny" data-act="stock-preset" data-i="'+i+'">'+esc(p[0])+'</button>';
  }).join(' ');

  /* 86 tonight. Renders only when something is out, because a panel that is
     empty six nights a week teaches the eye to skip it on the seventh. */
  const outPanel = out.length
    ? '<div class="panel p5 col" style="gap:10px">'
      + '<div class="row between"><div class="eyebrow">86 tonight</div>'
      + '<button class="chip tiny" data-act="stock-86-clear">All back on</button></div>'
      + '<div class="row" style="gap:6px;flex-wrap:wrap">'
      + out.map(function(k){ return '<button class="chip brass" data-act="stock-86" data-k="'+esc(k)+'" title="Put it back on">'+esc(shelfLabel(k))+' ✕</button>'; }).join(' ')
      + '</div>'
      + '<div class="tiny dim lh">Tap one to put it back on. The list clears itself after the shift.</div></div>'
    : '';

  /* the ready report, measured against the venue’s own list by default.
     pourSources, not deckSources: On Tap is drillable and is not pourable,
     and a record with no spec requires nothing, so every beer style would
     report as ready off an empty shelf. */
  const sources = pourSources();
  const src = sources.indexOf(state.menu.src) >= 0 ? state.menu.src : 'Cocktails';
  const srcChips = sources.map(function(s){
    return '<button class="chip'+(src===s?' on':'')+'" aria-pressed="'+(src===s?'true':'false')+'" data-act="stock-src" data-s="'+esc(s)+'">'+esc(srcLabel(s))+'</button>';
  }).join(' ');
  /* and never a draft: a record with no spec requires nothing, so it would
     report as ready off an empty shelf, the same false YES On Tap is kept
     out of this list for */
  const pool = allDrinks().filter(function(d){ return d.src===src && !d.draft; });
  const live = liveShelf();
  let ready=[], close=[], dead86=[];
  if(t.shelf.length){
    pool.forEach(function(d){
      const miss = missingFor(d, live);
      if(miss.length===0){ ready.push(d); return; }
      if(!missingFor(d).length){ dead86.push(d); return; }   /* stocked, but 86’d tonight */
      if(miss.length===1) close.push({d:d, miss:miss[0]});
    });
    ready.sort(function(a,b){ return a.name.localeCompare(b.name); });
    dead86.sort(function(a,b){ return a.name.localeCompare(b.name); });
  }
  const readyChips = ready.map(function(d){ return '<span class="chip brass">'+esc(d.name)+'</span>'; }).join(' ');
  const next = t.shelf.length ? bestNextBottles(pool) : [];
  const nextRows = next.map(function(n){
    return '<div class="panel p3 col-sm" style="gap:4px"><div class="row between">'
      + '<span class="bold small">'+esc(shelfLabel(n.id))+'</span>'
      + '<span class="font-tix brass2">+'+n.n+' drinks</span></div>'
      + '<div class="tiny dim">'+esc(n.drinks.join(', '))+(n.n>n.drinks.length?', …':'')+'</div>'
      + '<button class="chip" data-act="stock-toggle" data-k="'+n.id+'">Add to the stock list</button></div>';
  }).join('');

  return outPanel
    + '<div class="panel p5 col" style="gap:14px">'
    + '<div class="eyebrow">What the bar stocks</div>'
    + '<div class="small dim lh">Tap what is on the shelf tonight. The ledger tells you what you can pour, what is '
    + 'one bottle away, and what dies when something runs out. It saves between shifts.</div>'
    + '<div class="row" style="gap:6px;flex-wrap:wrap">'+presets+'<button class="chip" data-act="stock-clear">Clear</button>'
    + '<span class="tiny dim push">'+t.shelf.length+' stocked'+(out.length? ' · '+out.length+' 86’d':'')+'</span></div>'
    + '<div class="row" style="gap:6px">'+shelfChips+'</div></div>'
    + (t.shelf.length ? '<div class="panel p5 col" style="gap:12px">'
        + '<div class="row" style="gap:6px;flex-wrap:wrap">'+srcChips+'</div>'
        + '<div><div class="eyebrow mb1">Ready to pour: '+ready.length+' of '+pool.length+'</div>'
        + '<div class="row" style="gap:6px">'+(readyChips||'<span class="tiny dim">nothing yet, keep stocking</span>')+'</div></div>'
        + (dead86.length ? '<div><div class="eyebrow mb1">Off the board tonight: '+dead86.length+'</div>'
            + '<div class="row" style="gap:6px">'+dead86.map(function(d){ return '<span class="chip">'+esc(d.name)+'</span>'; }).join(' ')+'</div>'
            + '<div class="tiny dim mt1">Stocked, but something in them is 86’d.</div></div>' : '')
        + (next.length ? '<div><div class="eyebrow mb1">Best next bottle</div>'
            + '<div class="small dim lh mb2">Each of these unlocks the listed drinks on its own.</div>'
            + '<div class="col-sm">'+nextRows+'</div></div>' : '')
        /* A '?' requirement is an ingredient the ledger could not name, and
           bestNextBottles already refuses to suggest one. Counting it here as
           'a single ingredient away' promises a drink that no bottle unlocks. */
        + (function(){
            const real = close.filter(function(x){ return String(reqKey(x.miss)).charAt(0) !== '?'; });
            if(!real.length) return '';
            return '<div class="tiny dim">' + real.length
              + (real.length === 1 ? ' more is' : ' more are') + ' a single ingredient away.</div>';
          })()
        + '</div>' : '')
    + menuDrillHTML(pool);
}

/* The 86 drill stays a drill: a training exercise you point at one bottle to
   rehearse the answer out loud, kept apart from the 86 list above, which is a
   claim about tonight. Same engine, different question. */
function menuDrillHTML(pool){
  const t = state.tools;
  const pick = state.menu.drill;
  const on = pick !== null && pick !== undefined;
  if(!t.shelf.length) return '';
  const dead = on && pick ? eightySixReport(pick, pool) : null;
  const head = '<div class="row between"><div class="eyebrow">86 drill</div>'
    + '<button class="chip'+(on?' on':'')+'" aria-pressed="'+(on?'true':'false')+'" data-act="stock-drill" data-m="'+(on?'off':'on')+'">'+(on?'Close the drill':'Run the drill')+'</button></div>';
  if(!on) return '<div class="panel p5 col" style="gap:10px">'+head
    + '<div class="small dim lh">The guest is standing there and the bottle is empty. Pick what just died and say '
    + 'what died with it before you read the answer.</div></div>';
  const owned = t.shelf.map(function(k){
    return '<button class="chip'+(pick===k?' on':'')+'" aria-pressed="'+(pick===k?'true':'false')+'" data-act="stock-drill-pick" data-k="'+esc(k)+'">'+esc(shelfLabel(k))+'</button>';
  }).join(' ');
  return '<div class="panel p5 col" style="gap:12px">'+head
    + '<div class="small dim lh">Answer out loud before you read the substitutes.</div>'
    + '<div class="row" style="gap:6px;flex-wrap:wrap">'+owned+'</div></div>'
    + (dead ? '<div class="panel p5 col" style="gap:12px">'
      + '<div class="eyebrow">'+esc(shelfLabel(pick))+' is 86’d</div>'
      + '<div class="small lh">'+(dead.lostCount
          ? '<span class="brass2 bold">'+dead.lostCount+' drink'+(dead.lostCount===1?'':'s')+' just died.</span>'
            + (dead.lostCount > dead.lost.length ? ' <span class="tiny dim">Showing the first '+dead.lost.length+'.</span>' : '')
          : '<span class="brass2 bold">Nothing on your shelf depended on it.</span>')+'</div>'
      + (dead.lost.length ? '<div class="col-sm">'+dead.lost.map(function(x){
          return '<div class="panel p3 col-sm" style="gap:4px"><div class="row between">'
            + '<span class="bold small">'+esc(x.name)+'</span>'
            + '<span class="tiny dim">'+esc(x.family)+' · '+esc(x.spirit)+'</span></div>'
            + '<div class="tiny dim">'+(x.sub
              ? 'Closest survivor: <span class="brass2">'+esc(x.sub)+'</span>'
                + (x.why ? ': '+esc(x.why)+'.' : '.')
              : 'Nothing close on this shelf. Take it to the riff builder and improvise.')+'</div></div>';
        }).join('')+'</div>' : '')
      + '<div class="tiny dim lh">'+dead.stillReady+' drinks still pour without it.</div>'
      + '<div class="row"><button class="chip" data-act="stock-86-add" data-k="'+esc(pick)+'">It really is out: 86 it for tonight</button></div>'
      + '</div>' : '');
}

/* ---- the tab ----------------------------------------------------------- */
function renderMenu(){
  const bar = progress.bar || [];
  const v = state.menu.view || 'menu';
  const nav = [['menu','The menu'],['stock','The stock'],['add','Add drinks']]
    .map(function(o){ return '<button class="tab-btn'+(v===o[0]?' active':'')+'"'+(v===o[0]?' aria-current="true"':'')+' data-act="menu-view" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('');
  let inner;
  if(v === 'stock') inner = menuStockHTML();
  else if(v === 'add'){
    /* the four doors, the review step and the form, all drawn by renderImport,
       so that an expanded review row and a from-scratch add can never both be
       on screen at once: two forms means two sets of live inputs with the same
       ids, and captureBarForm would read whichever the DOM found first. */
    const drilling = bar.length && !state.menu.form && !(state.menu.imp && state.menu.imp.drafts);
    inner = '<div class="panel p5 col" style="gap:8px">'
      + '<div class="small dim lh" style="max-width:560px">However it arrives, what you get is a draft: '
      + 'every row shows the line it came from, nothing is saved until you say so, and no measure, method or '
      + 'glass is ever invented to fill a blank the menu left empty.</div>'
      + '<div class="tiny dim lh" style="max-width:560px">It lives in this browser and rides the Tools '
      + '\u2192 My Data backup, like everything else you have earned. Nothing leaves the device unless you '
      + 'ask the Ma\u00eetre d\u2019 to read a menu, on your own key, and then only that menu goes to Anthropic.</div>'
      + '</div>'
      + renderImport()
      + (drilling
          ? '<div class="panel p5 col" style="gap:10px"><div class="eyebrow">Drill what is on it</div>'
            + '<div class="row" style="gap:8px;flex-wrap:wrap">'
            + '<button class="btn btn-ghost" data-act="go" data-tab="flashcards" data-src="My Bar">Drill the cards</button>'
            + '<button class="btn btn-ghost" data-act="go" data-tab="quiz" data-mode="mybar">Quiz your list</button>'
            + '<button class="btn btn-ghost" data-act="go" data-tab="practice" data-view="rail">The rail</button>'
            + '</div></div>'
          : '');
  }
  else inner = menuListHTML();
  /* the desk's share, above every sub-view: what another room read and left
     for this bar is the first thing to know on opening the Menu tab */
  const waiting = (typeof deskWaitingHTML === 'function') ? deskWaitingHTML('menu') : '';
  return '<div class="col"><nav class="tabs" style="margin-bottom:4px">'+nav+'</nav>'+waiting+inner+'</div>';
}
