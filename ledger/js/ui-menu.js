/* ---------------- MENU: the bar you actually work behind ----------------

   The Ledger teaches 365 cocktails in the abstract. A working bartender does
   not need 365 drinks on a Tuesday. They need the eighteen on their own menu,
   cold, and they need to know what they can still put up when the amaro runs
   out at ten past eleven. This tab is those two questions and nothing else.

   It replaces two things that were built years apart and never connected: the
   My Bar tab, which held the venue's list but could not match it against
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

/* One shape for a bar record, wherever it came from: the form, a backup from
   this app, a backup from the standalone Bartender's Ledger (whose empty
   glass and garnish were a long dash), or a hand-edited file. Empty is '',
   and ticketHTML draws the dash at display time; a record with no usable
   name or spec is dropped and counted, so an import can say so instead of
   throwing halfway through a merge. Runs on every import and at boot.

   It moved here with the tab rather than staying behind, because it is the
   gate every record passes through and it belongs beside saveBarRecord,
   which now files through it. */
function barText(v){
  if(v === undefined || v === null) return '';
  const s = String(v).trim();
  return /^(?:-|\u2013|\u2014)$/.test(s) ? '' : s;
}
function normalizeBarRecord(b){
  if(!b || typeof b !== 'object' || Array.isArray(b)) return null;
  const name = barText(b.name);
  const raw = Array.isArray(b.spec) ? b.spec : (typeof b.spec === 'string' ? b.spec.split(/\r?\n/) : []);
  const spec = raw.map(barText).filter(Boolean);
  if(!name || !spec.length) return null;
  return { id: barText(b.id) || mintBarId(), name:name, spec:spec,
    method: barText(b.method), glass: barText(b.glass), garnish: barText(b.garnish), note: barText(b.note),
    family: barText(b.family) || 'Other', spirit: barText(b.spirit) || 'Other',
    price: barText(b.price), ts: Number(b.ts) || 0 };
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
   the typed text dies with the DOM. Same rule as the tasting form's notes. */
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

/* One door for filing a record, so the form and, later, the importer both
   arrive the same way. Returns the record, or a string explaining the refusal.
   The caller decides what to do with the refusal, because the form shows it
   inline and a bulk import counts it. */
function saveBarRecord(f, editingId){
  const name = (f.name||'').trim();
  const spec = (f.spec||[]).map(x => (x||'').trim()).filter(Boolean);
  if(!name) return 'Give the drink a name.';
  if(!spec.length) return 'A drink needs at least one line of spec.';
  /* case-insensitive, because a menu that lists both 'Paloma' and 'paloma' is
     a typo rather than two drinks, and the SRS key would not tell them apart */
  const clash = (progress.bar||[]).find(x =>
    x.name.toLowerCase() === name.toLowerCase() && x.id !== editingId);
  if(clash) return 'Your list already has a ' + clash.name + '.';
  /* through the normaliser rather than beside it: one function decides what
     a bar record looks like, and the form is not a special case. */
  const rec = normalizeBarRecord({ id: editingId || mintBarId(), name: name, spec: spec,
    method: f.method, glass: f.glass, garnish: f.garnish, note: f.note,
    family: f.family, spirit: f.spirit, price: f.price, ts: Date.now() });
  if(!rec) return 'A drink needs a name and at least one line of spec.';
  progress.bar = progress.bar || [];
  const i = editingId ? progress.bar.findIndex(x => x.id === editingId) : -1;
  if(i >= 0){
    /* a rename must carry its review history to the new key or the drink comes
       back unseen and the old key becomes an immortal orphan */
    const oldKey = 'My Bar · ' + progress.bar[i].name, newKey = 'My Bar · ' + name;
    if(oldKey !== newKey && progress.cards && progress.cards[oldKey] && !progress.cards[newKey]){
      progress.cards[newKey] = progress.cards[oldKey];
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
   rather than growing a second one that drifts. Today's behaviour is every
   default, so the two call sites in this file pass nothing. */
function myBarFormHTML(opts){
  opts = opts || {};
  const f = state.menu.form;
  const specRows = f.spec.map((line, i) =>
    '<div class="row" style="gap:8px"><input class="input" id="mb-spec-'+i+'" placeholder="'+(i===0?'2 oz house rum':'3/4 oz lime')+'" value="'+esc(line)+'" style="flex:1">'
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
    + '<input class="input" id="mb-name" placeholder="What the menu calls it" value="'+esc(f.name)+'" style="flex:2;min-width:160px">'
    + '<input class="input" id="mb-price" placeholder="Price (optional)" value="'+esc(f.price)+'" style="flex:1;min-width:90px">'
    + '</div>'
    + '<div><div class="eyebrow mb1">The spec, one line per ingredient</div><div class="col-sm" style="gap:6px">'+specRows+'</div>'
    + '<div class="row mt1"><button class="chip" data-act="menu-add-line">+ Add a line</button></div></div>'
    + '<div class="row" style="gap:10px">'
    + '<input class="input" id="mb-method" placeholder="Method, e.g. Shake, strain up" value="'+esc(f.method)+'" style="flex:1;min-width:140px">'
    + '<input class="input" id="mb-glass" placeholder="Glass" value="'+esc(f.glass)+'" style="flex:1;min-width:110px">'
    + '<input class="input" id="mb-garnish" placeholder="Garnish" value="'+esc(f.garnish)+'" style="flex:1;min-width:110px">'
    + '</div>'
    + '<div class="row" style="gap:10px">'
    + '<select class="input" id="mb-family" style="flex:1;min-width:140px" title="Family">'+famOpts+'</select>'
    + '<select class="input" id="mb-spirit" style="flex:1;min-width:140px" title="Base spirit">'+spOpts+'</select>'
    + '</div>'
    + '<div><div class="eyebrow mb1">Menu description or story (optional)</div>'
    + '<textarea class="input" id="mb-note" rows="2" placeholder="What the menu says, or what the guest gets told.">'+esc(f.note)+'</textarea></div>'
    + err
    + '<div class="row"><button class="btn btn-brass" data-act="menu-save">'+esc(opts.saveLabel || (state.menu.editing ? 'Save changes' : 'Add to the menu'))+'</button>'
    + '<button class="chip" data-act="menu-cancel">Cancel</button></div>'
    + '</div>';
}

/* The balance in words, and an honest answer when there is nothing to read.

   A menu is written without measures far more often than not, and balanceOf
   returns all zeros for a spec with no ounces in it. Printing 'strong 0 oz'
   over that would be the ledger inventing a reading it does not have, which
   is the same sin as the old matcher's silent yes. So the zero case says why
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
    const mine = reqsOf(b).map(reqKey), theirs = reqsOf(c).map(reqKey);
    const extra = reqsOf(b).filter(r => theirs.indexOf(reqKey(r)) < 0);
    const absent = reqsOf(c).filter(r => mine.indexOf(reqKey(r)) < 0);
    if(extra.length) diffs.push('Yours adds ' + extra.map(reqLabel).join(', ').toLowerCase() + '.');
    if(absent.length) diffs.push('The canon has ' + absent.map(reqLabel).join(', ').toLowerCase() + ' and yours does not.');
    if(b.method && c.method && b.method.toLowerCase() !== c.method.toLowerCase()){
      diffs.push('Method: yours is ' + b.method.toLowerCase() + ', the canon is ' + c.method.toLowerCase() + '.');
    }
    if(b.glass && c.glass && b.glass.toLowerCase() !== c.glass.toLowerCase()){
      diffs.push('Glass: yours is ' + b.glass.toLowerCase() + ', the canon is ' + c.glass.toLowerCase() + '.');
    }
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
          : '<div class="small lh">Nothing meaningful differs. Yours is the canon spec.</div>')
      + '</div>';
  }
  if(pane === 'cost'){
    return '<div class="col-sm" style="gap:10px">'
      + '<div style="display:flex;justify-content:center">'+costTicketHTML(b)+'</div>'
      + '<div class="tiny dim lh">The bottle price, size and target pour come from Tools → Pour Cost. '
      + 'Set them once and every drink on the menu is costed against the same numbers.</div>'
      + '</div>';
  }
  return ticketHTML(b);
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
  const pourable = stocked ? bar.filter(b => !missingFor(b, liveShelf()).length).length : 0;
  const out86 = (progress.eightySix || []).length;
  const standing = '<div class="row between" style="padding:0 4px;flex-wrap:wrap;gap:6px">'
    + '<span class="eyebrow">'+bar.length+' drink'+(bar.length===1?'':'s')+' on the list</span>'
    + (stocked
        ? '<span class="tiny dim">'+pourable+' pourable right now'
          + (out86 ? ' · '+out86+' ingredient'+(out86===1?'':'s')+' 86\'d' : '')+'</span>'
        : '<button class="chip tiny" data-act="menu-view" data-v="stock">Tell it what the bar stocks</button>')
    + '</div>';
  const rows = bar.map(b => {
    const open = state.menu.open === b.id;
    const st = menuStatus(b);
    const head = '<button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="menu-open" data-id="'+esc(b.id)+'" data-open="'+(open?'1':'0')+'">'
      + '<span class="bold">'+esc(b.name)+'</span>'
      + '<span class="tiny dim"> · '+esc(b.family||'')+(b.spirit && b.spirit!=='Other' ? ' · '+esc(b.spirit) : '')
      + (b.price ? ' · '+esc(b.price) : '')+'</span>'
      + (st ? '<span class="chip '+st.cls+' tiny push">'+esc(st.text)+'</span>' : '')
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
   three canon sources, so a bartender's own menu could not be measured against
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

  /* the ready report, measured against the venue's own list by default */
  const sources = deckSources();
  const src = sources.indexOf(state.menu.src) >= 0 ? state.menu.src : 'Cocktails';
  const srcChips = sources.map(function(s){
    return '<button class="chip'+(src===s?' on':'')+'" aria-pressed="'+(src===s?'true':'false')+'" data-act="stock-src" data-s="'+esc(s)+'">'+esc(srcLabel(s))+'</button>';
  }).join(' ');
  const pool = allDrinks().filter(function(d){ return d.src===src; });
  const live = liveShelf();
  let ready=[], close=[], dead86=[];
  if(t.shelf.length){
    pool.forEach(function(d){
      const miss = missingFor(d, live);
      if(miss.length===0){ ready.push(d); return; }
      if(!missingFor(d).length){ dead86.push(d); return; }   /* stocked, but 86'd tonight */
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
    + '<span class="tiny dim push">'+t.shelf.length+' stocked'+(out.length? ' · '+out.length+' 86\'d':'')+'</span></div>'
    + '<div class="row" style="gap:6px">'+shelfChips+'</div></div>'
    + (t.shelf.length ? '<div class="panel p5 col" style="gap:12px">'
        + '<div class="row" style="gap:6px;flex-wrap:wrap">'+srcChips+'</div>'
        + '<div><div class="eyebrow mb1">Ready to pour: '+ready.length+' of '+pool.length+'</div>'
        + '<div class="row" style="gap:6px">'+(readyChips||'<span class="tiny dim">nothing yet, keep stocking</span>')+'</div></div>'
        + (dead86.length ? '<div><div class="eyebrow mb1">Off the board tonight: '+dead86.length+'</div>'
            + '<div class="row" style="gap:6px">'+dead86.map(function(d){ return '<span class="chip">'+esc(d.name)+'</span>'; }).join(' ')+'</div>'
            + '<div class="tiny dim mt1">Stocked, but something in them is 86\'d.</div></div>' : '')
        + (next.length ? '<div><div class="eyebrow mb1">Best next bottle</div>'
            + '<div class="small dim lh mb2">Each of these unlocks the listed drinks on its own.</div>'
            + '<div class="col-sm">'+nextRows+'</div></div>' : '')
        + (close.length ? '<div class="tiny dim">'+close.length+' more are a single ingredient away.</div>' : '')
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
      + '<div class="eyebrow">'+esc(shelfLabel(pick))+' is 86\'d</div>'
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
      + '\u2192 My Data backup, like everything else you have earned. Nothing leaves the device.</div>'
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
  return '<div class="col"><nav class="tabs" style="margin-bottom:4px">'+nav+'</nav>'+inner+'</div>';
}
