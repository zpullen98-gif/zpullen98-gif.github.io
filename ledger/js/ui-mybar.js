/* ---------------- MY BAR: the venue's own menu ---------------- */
/* The drink you actually sell is the drink you actually get asked for. My Bar
   holds the venue's own cocktail list, entered by hand, kept in this browser
   inside the same ledger store as everything else, and drilled by the same
   engines as the canon 365: flashcards, quiz rounds, the Ticket Rail, and
   tonight's session.

   Records carry src:'My Bar', NEVER 'Cocktails': the card key becomes
   "My Bar · <name>", which is what keeps a house Margarita from colliding with
   the canon one in the SRS, the rail, and the mastery board. */

function mintBarId(){
  let s = 'b-';
  while(s.length < 10) s += Math.floor(Math.random()*36).toString(36);
  return s;
}

function blankBarForm(){
  return { name:'', spec:['',''], method:'', glass:'', garnish:'', note:'', family:'Other', spirit:'Other', price:'' };
}

/* render() rebuilds the whole view, so any act that repaints mid-edit (adding a
   spec line, opening a row) must first read the live inputs back into state or
   the typed text dies with the DOM. Same rule as the tasting form's notes. */
function captureBarForm(){
  const f = state.mybar.form; if(!f) return;
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

/* ---- quiz constructors ----
   These take the RAW bar record. They stay out of the canon constructors on
   purpose: qFamily dereferences FAMILIES[c.family] and a house drink filed
   under 'Other' would throw it. Name decoys come from the rest of the bar
   first, the drinks a colleague actually confuses, topped up from canon. */
function myBarNameDecoys(b, n){
  const own = (progress.bar||[]).filter(x => x.id !== b.id).map(x => x.name);
  const canon = COCKTAILS.map(c => c.name).filter(nm => nm !== b.name && own.indexOf(nm) < 0);
  return sample(own, n).concat(sample(canon, n)).slice(0, n);
}
function qMyBarTicket(b){
  return { prompt:'Name this drink from your own menu:', ticket:b, ticketType:'mybar',
    options: shuffle([b.name, ...myBarNameDecoys(b, 3)]), answer:b.name,
    explain: b.name+': '+(b.method||'as specced').toLowerCase()+(b.glass && b.glass!=='none' ? ', '+b.glass.toLowerCase() : '')+'. '+(b.note||'') };
}
function qMyBarGlass(b){
  const wrong = sample([...new Set(COCKTAILS.map(x => x.glass))].filter(g => g !== b.glass), 3);
  return { prompt:'Which glass does your '+b.name+' go in?',
    options: shuffle([b.glass, ...wrong]), answer:b.glass,
    explain: b.name+': '+b.glass+'. '+(b.garnish && b.garnish!=='-' ? 'Garnish: '+b.garnish+'.' : '') };
}
function qMyBarSpecLine(b){
  const line = b.spec[Math.floor(Math.random()*b.spec.length)];
  const wrong = decoyLines({ name:b.name, spec:b.spec, src:'My Bar', group:b.family }, 3);
  return { prompt:'Which line belongs in your '+b.name+'?',
    options: shuffle([line, ...wrong]), answer:line,
    explain: b.name+': '+b.spec.join(' · ') };
}

/* ---- the tab ---- */
function myBarFormHTML(){
  const f = state.mybar.form;
  const specRows = f.spec.map((line, i) =>
    '<div class="row" style="gap:8px"><input class="input" id="mb-spec-'+i+'" placeholder="'+(i===0?'2 oz house rum':'3/4 oz lime')+'" value="'+esc(line)+'" style="flex:1">'
    + (f.spec.length > 1 ? '<button class="chip" data-act="mybar-del-line" data-i="'+i+'" title="Remove this line">✕</button>' : '')
    + '</div>').join('');
  const famOpts = Object.keys(FAMILIES).concat('Other').map(k =>
    '<option value="'+esc(k)+'"'+(f.family===k?' selected':'')+'>'+esc(k)+'</option>').join('');
  const spirits = [...new Set(COCKTAILS.map(c => c.spirit))].sort().concat('Other');
  const spOpts = spirits.map(s =>
    '<option value="'+esc(s)+'"'+(f.spirit===s?' selected':'')+'>'+esc(s)+'</option>').join('');
  return '<div class="panel p5 col" style="gap:14px">'
    + '<div class="eyebrow">'+(state.mybar.editing ? 'Edit the drink' : 'Add a drink from your menu')+'</div>'
    + '<div class="row" style="gap:10px">'
    + '<input class="input" id="mb-name" placeholder="What the menu calls it" value="'+esc(f.name)+'" style="flex:2;min-width:160px">'
    + '<input class="input" id="mb-price" placeholder="Price (optional)" value="'+esc(f.price)+'" style="flex:1;min-width:90px">'
    + '</div>'
    + '<div><div class="eyebrow mb1">The spec: one line per ingredient</div><div class="col-sm" style="gap:6px">'+specRows+'</div>'
    + '<div class="row mt1"><button class="chip" data-act="mybar-add-line">+ Add a line</button></div></div>'
    + '<div class="row" style="gap:10px">'
    + '<input class="input" id="mb-method" placeholder="Method: Shake, strain up" value="'+esc(f.method)+'" style="flex:1;min-width:140px">'
    + '<input class="input" id="mb-glass" placeholder="Glass" value="'+esc(f.glass)+'" style="flex:1;min-width:110px">'
    + '<input class="input" id="mb-garnish" placeholder="Garnish" value="'+esc(f.garnish)+'" style="flex:1;min-width:110px">'
    + '</div>'
    + '<div class="row" style="gap:10px">'
    + '<select class="input" id="mb-family" style="flex:1;min-width:140px" title="Family">'+famOpts+'</select>'
    + '<select class="input" id="mb-spirit" style="flex:1;min-width:140px" title="Base spirit">'+spOpts+'</select>'
    + '</div>'
    + '<div><div class="eyebrow mb1">Menu description or story (optional)</div>'
    + '<textarea class="input" id="mb-note" rows="2" placeholder="What the menu says, or what the guest gets told.">'+esc(f.note)+'</textarea></div>'
    + '<div class="row"><button class="btn btn-brass" data-act="mybar-save">'+(state.mybar.editing ? 'Save changes' : 'Add to My Bar')+'</button>'
    + '<button class="chip" data-act="mybar-cancel">Cancel</button></div>'
    + '</div>';
}

function renderMyBar(){
  const bar = progress.bar || [];
  const intro = '<div class="panel p5 col" style="gap:10px">'
    + '<div class="eyebrow">My Bar</div>'
    + '<div class="small dim lh" style="max-width:520px">The list you actually pour. Enter the menu drink by drink and the ledger '
    + 'drills it like the canon: your specs in the flashcards, your names on the blind tickets, one of yours on the rail.</div>'
    + '<div class="tiny dim lh" style="max-width:520px">Lives in this browser and rides the Tools → My Data backup, like everything else you\'ve earned.</div>'
    + (bar.length && !state.mybar.form
        ? '<div class="row" style="gap:8px">'
          + '<button class="btn btn-brass" data-act="mybar-new">Add a drink</button>'
          + '<button class="btn btn-ghost" data-act="go" data-tab="flashcards" data-src="My Bar">Drill the cards</button>'
          + '<button class="btn btn-ghost" data-act="go" data-tab="quiz" data-mode="mybar">Quiz your list</button>'
          + '<button class="btn btn-ghost" data-act="go" data-tab="practice" data-view="rail">The rail</button>'
          + '</div>'
        : '')
    + '</div>';
  const form = state.mybar.form ? myBarFormHTML() : '';
  const empty = !bar.length && !state.mybar.form
    ? '<div class="panel p5 col tc" style="align-items:center;gap:12px">'
      + '<div class="small dim lh" style="max-width:440px">Nothing on the list yet. Start with the drink you make most: '
      + 'four drinks in, the quiz opens a round built entirely from your menu.</div>'
      + '<button class="btn btn-brass" data-act="mybar-new">Add the first drink</button></div>'
    : '';
  const rows = bar.map(b => {
    const open = state.mybar.open === b.id;
    const head = '<button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="mybar-open" data-id="'+esc(b.id)+'" data-open="'+(open?'1':'0')+'">'
      + '<span class="bold">'+esc(b.name)+'</span>'
      + '<span class="tiny dim"> · '+esc(b.family||'')+(b.spirit && b.spirit!=='Other' ? ' · '+esc(b.spirit) : '')
      + (b.price ? ' · '+esc(b.price) : '')+'</span></button>';
    const body = open
      ? '<div class="col-sm" style="gap:10px;padding:10px 0 4px">'+ticketHTML(b)
        + (b.family && b.family !== 'Other' && typeof familyMarksHTML === 'function'
            ? familyMarksHTML(b.family, 'Judged as a '+b.family+': how to tell it went right')
            : '')
        + '<div class="row" style="gap:8px"><button class="chip" data-act="mybar-edit" data-id="'+esc(b.id)+'">Edit</button>'
        + '<button class="chip" data-act="mybar-del" data-id="'+esc(b.id)+'">Remove</button></div></div>'
      : '';
    return '<div class="panel p4 col" style="gap:0">'+head+body+'</div>';
  }).join('');
  const list = bar.length
    ? '<div class="col-sm" style="gap:8px"><div class="eyebrow" style="padding:0 4px">'+bar.length+' drink'+(bar.length===1?'':'s')+' on the list</div>'+rows+'</div>'
    : '';
  return '<div class="col">'+intro+form+empty+list+'</div>';
}
