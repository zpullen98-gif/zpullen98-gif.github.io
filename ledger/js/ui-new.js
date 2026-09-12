/* ---------------- NAVIGATION, ROUTER & SEARCH (Phase 2) ---------------- */

/* The nav uses the same three words as the home screen bands and as the other
   two wings: a bartender who learns one Outside Of Time app can read all of
   them. The band word is Practise, the verb, the house grammar shared with the
   Codex and the Table; the sub-tab "Practice & Tasting" is the noun and stays
   spelt that way. Tools folded into Practise rather than standing alone, because a
   one-tab cluster is a tab wearing a hat, and My Bar moved beside the drills it
   feeds instead of hiding under a cluster of its own. */
const NAV_CLUSTERS = [
  ['ledger', 'Home', ['home']],
  ['reference', 'Learn', ['families','library','prep','producers','na','shots','service','notes']],
  /* Menu sits beside Practice: it is where a bartender goes to work on
     their own list rather than to read about drinks. */
  ['study', 'Practise', ['flashcards','quiz','practice','menu','riffs','tools']],
];
const TAB_LABEL = {};
const TAB_CLUSTER = {};
NAV_CLUSTERS.forEach(([ck,,tabs]) => tabs.forEach(t => TAB_CLUSTER[t] = ck));

function clusterOf(tab){ return TAB_CLUSTER[tab] || 'ledger'; }

/* A tab the gate would bounce to the paywall. Fails open: no gate, no lock.
   Used to MARK locked tabs and tiles (the locks file's own rule is mark, do
   not hide) and to keep a cluster tap from landing on one. */
function tabLocked(tab){
  try{ return !!(window.OOT && OOT.gate && !OOT.gate.allow('ledger', tab)); }
  catch(e){ return false; }
}
/* Where a cluster tap lands: the sub-tab last visited, else the first, and
   for a free visitor the first one the gate allows, so the Practise cluster
   is never a paywall with its free My Bar and Tools hidden behind it. */
function clusterLanding(ck){
  const tabs = NAV_CLUSTERS.find(([k]) => k===ck)[2];
  const want = (state.lastSub && state.lastSub[ck]) || tabs[0];
  if(!tabLocked(want)) return want;
  return tabs.find(t => !tabLocked(t)) || want;
}

const NAV_ICONS = {
  ledger:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z"/><path d="M5 4a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h14"/><path d="M9 9h6M9 12.5h6"/></svg>',
  study:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="13" height="15" rx="1.5"/><path d="M8 3h13v15"/><path d="M6.5 11h6M6.5 14.5h6"/></svg>',
  reference:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3 L17 3 L15 9 C14.5 10.6 13 11.4 13 13 L13 19 L11 19 L11 13 C11 11.4 9.5 10.6 9 9 Z"/><path d="M9 21h6M12 19v2M8.2 6h7.6"/></svg>',
  toolkit:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3h6l-1 8a3.5 3.5 0 0 1-4 0z"/><path d="M10 4.5 L8 16.5 a4 2 0 0 0 8 0 L14 4.5"/><path d="M9.5 19.5h5"/></svg>',
  search:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15.5 15.5 5 5"/></svg>',
};

function renderNav(){
  if(!Object.keys(TAB_LABEL).length) TABS.forEach(([k,l]) => TAB_LABEL[k] = l);
  const activeCluster = clusterOf(state.tab);
  const clusterRow = NAV_CLUSTERS.map(([ck,label]) =>
    '<button class="cl-btn'+(activeCluster===ck?' active':'')+'"'+(activeCluster===ck?' aria-current="true"':'')+' data-cluster="'+ck+'">'+label+'</button>').join('');
  const subTabs = NAV_CLUSTERS.find(([ck]) => ck===activeCluster)[2];
  const subRow = subTabs.length > 1
    ? '<div class="subtabs">'+subTabs.map(k =>
        '<button class="tab-btn'+(state.tab===k?' active':'')+(tabLocked(k)?' oot-locked':'')+'"'+(state.tab===k?' aria-current="page"':'')+(tabLocked(k)?' aria-disabled="true"':'')+' data-tab="'+k+'">'+TAB_LABEL[k]+'</button>').join('')+'</div>'
    : '';
  document.getElementById('tabs').innerHTML =
    '<div class="clusters">'+clusterRow+'<button class="cl-btn cl-search" data-search="1" aria-label="Search" title="Search ( / )">'+NAV_ICONS.search+'</button></div>'+subRow;

  const b = document.getElementById('bnav');
  if(b) b.innerHTML = NAV_CLUSTERS.map(([ck,label]) =>
      '<button class="bnav-btn'+(activeCluster===ck?' active':'')+'"'+(activeCluster===ck?' aria-current="true"':'')+' data-cluster="'+ck+'">'+NAV_ICONS[ck]+'<span>'+label+'</span></button>'
    ).join('') +
    '<button class="bnav-btn" data-search="1">'+NAV_ICONS.search+'<span>Search</span></button>';

  const sh = document.getElementById('sheet');
  if(sh){
    if(state.sheet){
      const tabs = NAV_CLUSTERS.find(([ck]) => ck===state.sheet)[2];
      sh.innerHTML = '<div class="sheet-back" data-sheet-close="1"></div><div class="sheet-panel" role="dialog" aria-modal="true" aria-label="More sections">'
        + '<div class="eyebrow tc mb2">'+NAV_CLUSTERS.find(([ck])=>ck===state.sheet)[1]+'</div>'
        + tabs.map(k => '<button class="sheet-btn'+(state.tab===k?' active':'')+(tabLocked(k)?' oot-locked':'')+'"'+(state.tab===k?' aria-current="page"':'')+(tabLocked(k)?' aria-disabled="true"':'')+' data-tab="'+k+'">'+TAB_LABEL[k]+'</button>').join('')
        + '</div>';
      sh.classList.add('open');
    } else { sh.innerHTML=''; sh.classList.remove('open'); }
  }
}

/* ---- hash router ---- */
function slugify(s){ return String(s).toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }

const ROUTE_SOURCES = {
  menu:      { arr: () => progress.bar || [], name: x => x.name },
  library:   { arr: () => COCKTAILS,  name: x => x.name },
  shots:     { arr: () => SHOTS,      name: x => x.name },
  na:        { arr: () => NA_DRINKS,  name: x => x.name },
  prep:      { arr: () => PREPS,      name: x => x.name },
  producers: { arr: () => PRODUCERS,  name: x => x.name },
  notes:     { arr: () => STUDY,      name: x => x.title },
  service:   { arr: () => SERVICE_STUDY, name: x => x.key },
};

function findBySlug(tab, slug){
  const src = ROUTE_SOURCES[tab]; if(!src) return -1;
  return src.arr().findIndex(x => slugify(src.name(x)) === slug);
}

/* Tabs that have been renamed since a link was shared. A bookmarked
   #/mybar/<slug> must still open the drink and heal itself to the new form:
   without this it fails silently and syncRoute immediately rewrites the hash,
   erasing the evidence that the link ever pointed anywhere. Two lines, and it
   costs nothing to leave here forever. */
const TAB_WAS = { mybar: 'menu' };

function applyRoute(){
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if(!parts.length) return false;
  const tab = TAB_WAS[parts[0]] || parts[0], slug = parts[1];
  if(!TABS.some(([k]) => k===tab)) return false;
  state.tab = tab;
  const i = slug !== undefined ? findBySlug(tab, slug) : -1;
  if(i >= 0){
    if(tab==='library')      state.lib = { q:'', fam:'All', tier:'All', open:i };
    else if(tab==='shots')   Object.assign(state.shots, { view:'board', cat:'All', open:i, drill:false });
    else if(tab==='na')      Object.assign(state.na, { view:'list', cat:'All', open:i, drill:false });
    else if(tab==='prep')    Object.assign(state.prep, { cat: PREPS[i].cat, open:i });
    else if(tab==='producers') Object.assign(state.prod, { cat:'All', open:i });
    else if(tab==='notes'){  state.noteOpen = STUDY[i].title; state.noteJump = true; }
    else if(tab==='service') Object.assign(state.svc, { dom: SERVICE_STUDY[i].key, rowOpen:null, refOpen:null });
    else if(tab==='menu'){ state.menu.open = (progress.bar||[])[i] ? progress.bar[i].id : null;
                           state.menu.view = 'menu'; state.menu.pane = 'build'; }
  } else {
    /* slugless or unresolved slug: clear the tab's open item so syncRoute
       doesn't resurrect a previously-open drink into the shared URL */
    if(tab==='library')      state.lib.open = null;
    else if(tab==='shots')   Object.assign(state.shots, { open:null, drill:false });
    else if(tab==='na')      Object.assign(state.na, { open:null, drill:false });
    else if(tab==='prep')    state.prep.open = null;
    else if(tab==='producers') state.prod.open = null;
    /* the two accordions that are not STUDY entries: a search hit for a
       glossary term used to open Notes with the target collapsed at the bottom */
    else if(tab==='notes' && (slug==='glossary' || slug==='plates')){ state.noteOpen = '__'+slug; state.noteJump = true; }
  }
  return true;
}

function currentRoute(){
  const t = state.tab;
  let slug = null;
  if(t==='library' && state.lib.open!=null && COCKTAILS[state.lib.open]) slug = slugify(COCKTAILS[state.lib.open].name);
  else if(t==='shots' && state.shots.open!=null && SHOTS[state.shots.open]) slug = slugify(SHOTS[state.shots.open].name);
  else if(t==='na' && state.na.open!=null && NA_DRINKS[state.na.open]) slug = slugify(NA_DRINKS[state.na.open].name);
  else if(t==='prep' && state.prep.open!=null && PREPS[state.prep.open]) slug = slugify(PREPS[state.prep.open].name);
  else if(t==='producers' && state.prod.open!=null && PRODUCERS[state.prod.open]) slug = slugify(PRODUCERS[state.prod.open].name);
  else if(t==='notes' && state.noteOpen) slug = state.noteOpen === '__glossary' ? 'glossary' : state.noteOpen === '__plates' ? 'plates' : slugify(state.noteOpen);
  else if(t==='service' && state.svc.dom) slug = slugify(state.svc.dom);
  else if(t==='menu' && state.menu.open && state.menu.view === 'menu'){
    const b = (progress.bar||[]).find(x => x.id === state.menu.open);
    if(b) slug = slugify(b.name);
  }
  return '#/' + t + (slug ? '/' + slug : '');
}

function syncRoute(){
  const h = currentRoute();
  if(location.hash !== h) history.replaceState(null, '', h);
}

/* ---- global search ---- */
let SEARCH_INDEX = null;
function buildSearchIndex(){
  const ix = [];
  COCKTAILS.forEach(c => ix.push({ t:c.name, s:c.family+' · '+c.spirit+' · Tier '+c.tier,
    body:(c.spec.join(' ')+' '+c.method+' '+c.garnish).toLowerCase(), h:'#/library/'+slugify(c.name) }));
  /* NOT the card key, though it is byte-identical to one: this is the
     subtitle under a search result. Grep for the string and you find both;
     changing this one is harmless and changing the other is not. */
  (progress.bar||[]).forEach(b => ix.push({ t:b.name, s:srcLabel('My Bar')+' · '+(b.family||''),
    body:((b.spec||[]).join(' ')+' '+(b.method||'')+' '+(b.note||'')).toLowerCase(), h:'#/menu/'+slugify(b.name) }));
  SHOTS.forEach(s => ix.push({ t:s.name, s:'Shot · '+s.cat,
    body:(s.spec||[]).join(' ').toLowerCase(), h:'#/shots/'+slugify(s.name) }));
  NA_DRINKS.forEach(d => ix.push({ t:d.name, s:'Zero proof · '+d.cat,
    body:(d.spec||[]).join(' ').toLowerCase(), h:'#/na/'+slugify(d.name) }));
  PREPS.forEach(p => ix.push({ t:p.name, s:'Prep · '+p.cat,
    body:(p.steps||[]).join(' ').toLowerCase(), h:'#/prep/'+slugify(p.name) }));
  PRODUCERS.forEach(p => ix.push({ t:p.name, s:'Producer · '+p.where,
    body:(p.cat+' '+(p.bar||'')).toLowerCase(), h:'#/producers/'+slugify(p.name) }));
  STUDY.forEach(n => ix.push({ t:n.title, s:'Study note', body:'', h:'#/notes/'+slugify(n.title) }));
  if(typeof GLOSSARY !== 'undefined') GLOSSARY.forEach(g =>
    ix.push({ t:g.term, s:'Glossary', body:g.def.toLowerCase(), h:'#/notes/glossary' }));
  PLATES.forEach(p => ix.push({ t:p.title.replace(/^Plate [IVX]+ · /,''), s:'Technique plate',
    body:p.caption.toLowerCase(), h:'#/notes/plates' }));
  if(typeof SERVICE_REF !== 'undefined') SERVICE_REF.forEach(x =>
    ix.push({ t:x.name, s:x.cat, body:(x.note+' '+x.facts.map(f=>f.join(' ')).join(' ')).toLowerCase(),
      h:'#/service/'+slugify(x.dom) }));
  if(typeof SERVICE_STUDY !== 'undefined') SERVICE_STUDY.forEach(sec => sec.rows.forEach(r =>
    ix.push({ t:r[0], s:sec.title, body:r[1].toLowerCase(), h:'#/service/'+slugify(sec.key) })));
  return ix;
}

const search = { open:false, q:'', sel:0 };

function searchResults(q){
  q = q.trim().toLowerCase();
  if(!q) return [];
  if(!SEARCH_INDEX) SEARCH_INDEX = buildSearchIndex();
  return SEARCH_INDEX
    .map(e => {
      const tl = e.t.toLowerCase();
      let score = tl.startsWith(q) ? 0 : tl.includes(q) ? 1 : e.body.includes(q) ? 2 : -1;
      return { e, score };
    })
    .filter(r => r.score >= 0)
    .sort((a,b) => a.score-b.score || a.e.t.localeCompare(b.e.t))
    .slice(0, 24)
    .map(r => r.e);
}

function renderSearch(){
  const ol = document.getElementById('search-ol');
  if(!ol) return;
  if(!search.open){ ol.innerHTML=''; ol.classList.remove('open'); return; }
  if(!ol.classList.contains('open')){
    /* build the shell once per open: the input element must survive
       keystrokes or the caret snaps to the end while editing mid-string */
    ol.innerHTML = '<div class="search-back" data-search-close="1"></div>'
      + '<div class="search-panel" role="dialog" aria-modal="true" aria-label="Search the ledger">'
      + '<input id="search-in" class="input" type="text" aria-label="Search the ledger" placeholder="Search the ledger: drinks, preps, producers, notes…" autocomplete="off">'
      + '<div class="search-results" id="search-results"></div></div>';
    ol.classList.add('open');
    const inp = document.getElementById('search-in');
    inp.value = search.q;
    inp.addEventListener('input', e => { search.q = e.target.value; search.sel = 0; renderSearchResults(); });
    inp.focus();
  }
  renderSearchResults();
}

function renderSearchResults(){
  const box = document.getElementById('search-results');
  if(!box) return;
  const results = searchResults(search.q);
  if(search.sel >= results.length) search.sel = Math.max(0, results.length-1);
  const rows = results.map((e,i) =>
    '<button class="search-row'+(i===search.sel?' sel':'')+'" data-hash="'+e.h+'">'
    + '<span class="bold">'+esc(e.t)+'</span><span class="tiny dim push">'+esc(e.s)+'</span></button>').join('');
  box.innerHTML = search.q
    ? (rows || '<div class="p3 small dim tc">Nothing on the ledger matches.</div>')
    : '<div class="p3 small dim tc">Type to search all '+SEARCH_INDEX.length+' entries · ↑↓ to move · Enter to open</div>';
  const sel = box.querySelector('.search-row.sel');
  if(sel) sel.scrollIntoView({ block:'nearest' });
}

function openSearch(){
  /* remember where the keyboard was: Escape should land the reader back on
     the control that summoned the dialog, not at the top of the document */
  search.returnTo = document.activeElement;
  search.open = true; search.q = ''; search.sel = 0;
  if(!SEARCH_INDEX) SEARCH_INDEX = buildSearchIndex();
  renderSearch();
}
function closeSearch(){
  search.open = false; renderSearch();
  try{ if(search.returnTo && search.returnTo.focus) search.returnTo.focus(); }catch(e){}
  search.returnTo = null;
}
function gotoHash(h){
  closeSearch();
  if(location.hash === h){ applyRoute(); render(); }
  else location.hash = h;
}

/* ---------------- BEHIND THE STICK: the rest of the job ---------------- */

function serviceTicketHTML(x){
  return '<div class="ticket"><div class="ticket-inner">'
    + '<div class="tc"><div class="tix-label">'+esc(x.cat)+'</div>'
    + '<div class="tix-name">'+esc(x.name.toUpperCase())+'</div></div>'
    + '<div class="tix-rule"></div>'
    + x.facts.map(f => '<div><span class="tix-label">'+esc(f[0])+' </span>'+esc(f[1])+'</div>').join('')
    + '<div class="tix-rule"></div><div class="tix-note">'+esc(x.note)+'</div></div></div>';
}

function renderService(){
  const s = state.svc;
  const sec = SERVICE_STUDY.find(x => x.key === s.dom) || SERVICE_STUDY[0];
  const DOM_LABEL = { beer:'Beer & Draught', wine:'Wine', law:'Law & Refusal',
    register:'The Register', conflict:'Conflict & Safety', glassware:'Glassware' };
  const chips = SERVICE_STUDY.map(x =>
    '<button class="tab-btn'+(s.dom===x.key?' active':'')+'"'+(s.dom===x.key?' aria-current="true"':'')+' data-act="svc-dom" data-d="'+x.key+'">'
    + esc(DOM_LABEL[x.key] || x.title)+'</button>').join('');
  const rows = sec.rows.map((r,i) => {
    const open = s.rowOpen === i;
    return '<div class="panel" style="padding:0 16px">'
      + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="svc-row" data-i="'+i+'">'
      + '<span>'+esc(r[0])+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
      + (open ? '<div class="accordion-body"><div class="small dim lh">'+esc(r[1])+'</div></div>' : '')+'</div>';
  }).join('');
  const refs = SERVICE_REF.filter(x => x.dom === s.dom);
  const cats = [...new Set(refs.map(x => x.cat))];
  const refHTML = refs.length
    ? cats.map(cat => {
        const items = refs.filter(x => x.cat === cat).map(x => {
          const open = s.refOpen === x.name;
          return '<div class="panel"><button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="svc-ref" data-n="'+esc(x.name)+'">'
            + '<span class="bold">'+esc(x.name)+'</span>'
            + '<span class="plusminus">'+(open?'−':'+')+'</span></button>'
            + (open ? '<div class="drink-body">'+serviceTicketHTML(x)+'</div>' : '')+'</div>';
        }).join('');
        return '<div class="eyebrow" style="padding:0 4px;margin-top:8px">'+esc(cat)+'</div><div class="col-sm">'+items+'</div>';
      }).join('')
    : '';
  return '<div class="col">'
    + '<nav class="tabs" aria-label="Service domains" style="margin-bottom:4px">'+chips+'</nav>'
    + '<div class="panel p4"><div class="eyebrow mb1">'+esc(sec.title)+'</div>'
    + '<div class="small dim lh">The half of the job that isn’t a cocktail. Most bartenders pour more of this than they ever shake, and it is where a trail shift is actually won or lost.</div>'
    + '<div class="tiny dim lh mt1">Written for US service: statutes vary by state, and nothing here is legal advice.</div></div>'
    + (sec.key === 'law'
        ? '<div class="tiny dim lh" style="padding:0 4px">These rows describe US law as it generally stands. The statute, the BAC limit and the certification that count are your state\'s, and this is training, not legal advice.</div>'
        : '')
    + '<div class="col-sm">'+rows+'</div>'
    + refHTML
    + '</div>';
}

/* ---------------- TECHNIQUE PLATES: engraved instructional figures ---------------- */
/* Line-art SVGs in the ledger's engraving style: currentColor so they take
   brass on felt. Rendered as an accordion in Notes; searchable. */

const PLATES = [
  { id:'seal', title:'Plate I · The Two-Tin Seal',
    caption:'Set the small tin into the large at an angle, then strike the crown once with the heel of your hand. The vacuum of the cold does the rest: a straight-on jam sticks; the angle releases with a squeeze and a twist.',
    svg:'<path d="M62 138 L74 64 L130 64 L142 138 Z"/><path d="M78 66 L94 14 L146 26 L118 70" transform="rotate(-4 100 40)"/><path d="M70 96 L134 96" stroke-dasharray="3 4" opacity="0.5"/><path d="M155 40 C165 46 168 56 164 66" fill="none" marker-end="none"/><path d="M160 68 L164 66 L166 60" fill="none"/>' },
  { id:'gate', title:'Plate II · The Hawthorne Gate',
    caption:'The spring is the filter; your forefinger is the gate. Pressed forward, the strainer closes tight for a controlled pour; eased back, it opens wide. Ice shards and herb flecks stay behind: that is the whole job.',
    svg:'<circle cx="88" cy="78" r="46"/><circle cx="88" cy="78" r="36" stroke-dasharray="5 4" opacity="0.7"/><circle cx="88" cy="78" r="26" stroke-dasharray="5 4" opacity="0.45"/><rect x="132" y="72" width="52" height="12" rx="4"/><path d="M60 42 L54 30 M116 42 L122 30"/><circle cx="88" cy="78" r="3" fill="currentColor"/>' },
  { id:'dstrain', title:'Plate III · The Double Strain',
    caption:'Hawthorne on the tin, fine mesh held over the glass: the second net catches what the first forgives. Standard for every shaken drink served up: nothing should float in a coupe but the garnish.',
    svg:'<g transform="rotate(32 60 40)"><path d="M38 20 L46 72 L88 72 L96 20"/><path d="M30 20 L104 20"/></g><path d="M96 62 C100 72 104 82 106 92" stroke-dasharray="2 4"/><path d="M84 96 L128 96 L106 122 Z"/><path d="M90 102 L122 102 M96 109 L116 109" opacity="0.55"/><path d="M76 128 C82 140 96 146 106 146 C116 146 130 140 136 128 Z"/><path d="M106 146 L106 150" ' + '/>' },
  { id:'express', title:'Plate IV · Expressing the Peel',
    caption:'Hold the peel skin-side down a hand above the drink and snap it once, sharply: the oils rain, they don\'t drip. Then wipe the rim with the skin and drop it in or discard it, as the spec demands. Express high; the spray should fall like weather.',
    svg:'<path d="M34 36 C48 26 66 26 80 36" stroke-width="7" stroke-linecap="round"/><path d="M88 44 L102 56 M92 34 L110 44 M96 24 L114 30" stroke-dasharray="1 5" stroke-linecap="round"/><path d="M96 78 C102 90 116 96 128 96 C140 96 154 90 160 78 Z"/><path d="M128 96 L128 122 M112 128 C112 124 120 122 128 122 C136 122 144 124 144 128 Z"/>' },
  { id:'dome', title:'Plate V · The Julep Dome',
    caption:'Pack crushed ice past the rim and shape it into a dome: the meltwater is an ingredient, and the dome meters it. Swizzle until the metal frosts; the frost line is your doneness indicator.',
    svg:'<path d="M64 78 L72 140 L128 140 L136 78"/><path d="M60 78 L140 78"/><path d="M66 78 C66 52 84 40 100 40 C116 40 134 52 134 78" stroke-dasharray="3 3"/><circle cx="86" cy="64" r="4"/><circle cx="102" cy="54" r="4"/><circle cx="116" cy="66" r="4"/><circle cx="98" cy="70" r="4"/><path d="M112 44 L134 12 M120 20 C126 14 132 12 138 14" opacity="0.8"/>' },
  { id:'dryshake', title:'Plate VI · The Dry Shake',
    caption:'Egg-white drinks shake twice: first without ice (hard, ten seconds, to build the foam), then again with ice to chill. Skip the dry shake and the drink reads thin; do it lazily and the foam won\'t hold a straw.',
    svg:'<path d="M30 40 L38 108 L74 108 L82 40 Z"/><ellipse cx="56" cy="80" rx="13" ry="16" opacity="0.8"/><path d="M44 30 L68 54 M68 30 L44 54" stroke-width="2.2"/><rect x="42" y="28" width="28" height="28" rx="3" opacity="0.55"/><path d="M96 74 L118 74 M118 74 L112 68 M118 74 L112 80"/><path d="M132 40 L140 108 L176 108 L184 40 Z"/><rect x="144" y="58" width="14" height="14" rx="2"/><rect x="156" y="76" width="14" height="14" rx="2"/><rect x="142" y="84" width="12" height="12" rx="2"/>' },
  { id:'muddle', title:'Plate VII · The Muddle Press',
    caption:'Press, twist a quarter turn, lift: three or four times, no more. You are coaxing oil from the leaf and juice from the fruit, not making pesto: a ground herb releases chlorophyll and bitterness, and no amount of rum forgives it.',
    svg:'<path d="M132 10 L106 92" stroke-width="7" stroke-linecap="round"/><ellipse cx="101" cy="110" rx="11" ry="17" transform="rotate(18 101 110)"/><path d="M60 66 L66 140 L134 140 L140 66"/><path d="M74 130 C80 122 88 126 90 132 M110 134 C108 124 118 120 124 128" stroke-linecap="round"/><path d="M80 92 L80 108 M80 108 L75 102 M80 108 L85 102" opacity="0.8"/>' },
  { id:'float', title:'Plate VIII · The Float',
    caption:'Rest the back of the spoon against the inner wall, just above the drink, and pour slow: the liquid walks down the spoon, spreads across the surface, and sits. Wine on a New York Sour, scotch on a Penicillin: weather, not mixture.',
    svg:'<path d="M124 8 L86 68" stroke-width="2"/><ellipse cx="82" cy="74" rx="10" ry="6" transform="rotate(-28 82 74)"/><path d="M60 60 L66 140 L134 140 L140 60"/><path d="M67 92 L133 92" stroke-width="2.4"/><path d="M68 104 L132 104 M69 116 L131 116" stroke-dasharray="4 4" opacity="0.5"/><path d="M76 76 C86 80 96 82 108 80" stroke-dasharray="2 3" opacity="0.8"/>' },
];

function plateFigure(p){
  return '<figure class="plate"><svg viewBox="0 0 200 156" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" aria-label="'+esc(p.title)+'">'
    + p.svg + '</svg>'
    + '<figcaption><div class="tiny bold brass2" style="letter-spacing:0.08em">'+esc(p.title)+'</div>'
    + '<div class="tiny dim lh mt1">'+esc(p.caption)+'</div></figcaption></figure>';
}

function platesHTML(){
  const isOpen = state.noteOpen === '__plates';
  const body = isOpen
    ? '<div class="accordion-body"><div class="plate-grid">'+PLATES.map(plateFigure).join('')+'</div></div>' : '';
  return '<div class="panel" style="padding:0 16px">'
    + '<button class="accordion-btn'+(isOpen?' open':'')+'" aria-expanded="'+(isOpen?'true':'false')+'" data-act="note-open" data-t="__plates" data-open="'+noteOpenMark(isOpen)+'">'
    + '<span>Technique Plates <span class="tiny dim">· '+PLATES.length+' figures</span></span>'
    + '<span style="color:var(--brass)">'+(isOpen?'−':'+')+'</span></button>'+body+'</div>';
}

/* ---------------- TONIGHT'S SESSION: one-button guided study ---------------- */
/* Deals due reviews + a few new cards, then a quiz round, then prescribes a
   drill. Completing cards + quiz stamps the night and feeds the streak. */

/* setDate walks the local calendar, which is DST-aware. Subtracting a fixed
   86,400,000 ms is not: on the two transition days a year it lands on the
   wrong date and silently resets the streak. */
function dateKey(offsetDays){
  const d = new Date();
  if(offsetDays) d.setDate(d.getDate() - offsetDays);
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function sessionDoneToday(){ return (progress.streakData || {}).last === dateKey(0); }
function currentStreak(){
  const s = progress.streakData;
  if(!s || !s.last) return 0;
  /* a streak is alive if the last stamped night was today or yesterday */
  return (s.last === dateKey(0) || s.last === dateKey(1)) ? s.n : 0;
}
function handsStreak(){
  const s = progress.streakData;
  if(!s || !s.last) return 0;
  return (s.last === dateKey(0) || s.last === dateKey(1)) ? (s.hands || 0) : 0;
}
function handsDoneToday(){ return (progress.streakData || {}).lastHands === dateKey(0); }
/* withHands = the night included a logged physical drill. Recitation alone still
   counts as a night, but only the hands number predicts a trail shift. */
function recordSessionComplete(withHands, night){
  const s = progress.streakData || { last: null, n: 0, hands: 0, lastHands: null };
  if(s.hands === undefined){ s.hands = 0; s.lastHands = null; }
  /* `night` is the day the SESSION STARTED. A session straddling midnight
     used to stamp both calendar days (cards before twelve, the drill after),
     crediting two nights of streak for one sitting and pre-banking tomorrow.
     One sitting is one night, dated by when it began. */
  const today = night || dateKey(0);
  if(s.last !== today){
    /* "the night before" is computed from the STAMPED night, not the clock:
       a session straddling midnight stamps yesterday, and dateKey(1) would be
       the day before that, breaking a live streak at the moment it was kept */
    const parts = today.split('-').map(Number);
    const prev = new Date(parts[0], parts[1] - 1, parts[2]);
    prev.setDate(prev.getDate() - 1);
    const prevKey = prev.getFullYear() + '-' + String(prev.getMonth() + 1).padStart(2, '0') + '-' + String(prev.getDate()).padStart(2, '0');
    if(s.last === prevKey) s.n = s.n + 1;
    else { s.n = 1; s.hands = 0; }   /* streak broken: the hands count restarts with it */
    s.last = today;
  }
  if(withHands && s.lastHands !== today){ s.hands = (s.hands || 0) + 1; s.lastHands = today; }
  progress.streakData = s;
  saveProgress();
  return s;
}
function tonightDrill(){
  /* skip hidden entries (the Ticket Rail lives in its own view, so naming it
     here sent you to a drills list that didn't contain it), and rotate on the
     LOCAL calendar day so the prescribed drill doesn't change mid-evening */
  const pool = DRILLS.filter(d => !d.hidden);
  const n = new Date();
  const day = Math.floor(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) / 86400000);
  return pool[day % pool.length];
}

function sessionDeckParts(){
  const all = allDrinks();
  const due = [], fresh = [];
  all.forEach(d => {
    const s = progress.cards[cardKey(d)];
    if(s && s.due !== undefined && s.due <= Date.now()) due.push(d);
    else if(!s) fresh.push(d);
  });
  /* oldest debt first, weakness only as a tiebreak: sorting by weakness alone
     let a healthy-but-overdue card sit behind the same hard cards every night */
  const dueAll = due.length;
  const dueDeck = due.sort((a,b) => {
    const sa = progress.cards[cardKey(a)], sb = progress.cards[cardKey(b)];
    return (sa.due - sb.due) || (weakScore(cardKey(b)) - weakScore(cardKey(a)));
  }).slice(0, 20);
  /* the venue's own list outranks the canon: a fresh menu card is the drink
     someone will actually order tonight, so it deals first. After that, new
     cards come from the lowest tier that still has unseen cocktails, so the
     canon is learned in order; shots/NA join once cocktails run dry */
  let pool = fresh.filter(d => d.src === 'My Bar');
  for(let t = 1; t <= 12 && !pool.length; t++) pool = fresh.filter(d => d.src === 'Cocktails' && d.tier === t);
  if(!pool.length) pool = fresh;
  /* stop pouring new cards into a deep hole: dig out first */
  const newCount = dueAll > 50 ? 0 : (dueDeck.length ? 5 : 8);
  const newDeck = shuffle(pool).slice(0, newCount);
  return { dueDeck, newDeck, dueAll };
}

function startSession(){
  const { dueDeck, newDeck } = sessionDeckParts();
  let deck = [...dueDeck, ...newDeck];
  if(!deck.length) deck = shuffle(allDrinks()).slice(0, 10);
  state.sess = { active: true, step: 'cards', night: dateKey(0), dueN: dueDeck.length, newN: newDeck.length };
  state.tab = 'flashcards';
  Object.assign(state.fc, { stage:'run', mode:'name2spec', deck:deck, idx:0, right:0, wrong:0, missed:[] });
  prepCard();
}

function streakChipsHTML(){
  const n = currentStreak(), h = handsStreak();
  if(!n) return '';
  return '<span class="row" style="gap:6px">'
    + '<span class="chip brass" title="Consecutive nights with a completed session">✦ '+n+' night'+(n===1?'':'s')+'</span>'
    + '<span class="chip'+(h?' brass':'')+'" title="Nights in this streak where you actually made drinks. This is the number that predicts a trail shift.">'
    + '✋ '+h+' with hands</span></span>';
}

function sessionPanelHTML(){
  const drill = tonightDrill();
  /* a session is running: offer to resume it. The old panel showed the same
     brass "Pour tonight's session" button, which silently threw away the run. */
  if(state.sess && state.sess.active && !sessionDoneToday()){
    const where = state.sess.step==='cards' ? 'the cards' : state.sess.step==='quiz' ? 'the quiz round' : esc(drill.name);
    return '<div class="panel p5 col" style="gap:10px;border-color:var(--brass)">'
      + '<div class="row between"><div class="eyebrow">Tonight’s session · in progress</div>'+streakChipsHTML()+'</div>'
      + '<div class="small dim lh">You are partway through: currently on '+where+'.</div>'
      + '<div class="row"><button class="btn btn-brass" data-act="sess-resume">Back to '+where+'</button>'
      + '<button class="btn btn-ghost" data-act="sess-end">Abandon tonight</button></div></div>';
  }
  if(sessionDoneToday()){
    const handsTonight = handsDoneToday();
    return '<div class="panel p5 col" style="gap:10px">'
      + '<div class="row between"><div class="eyebrow">Tonight\'s session</div>'+streakChipsHTML()+'</div>'
      + (handsTonight
        ? '<div class="small dim lh">The ledger is closed for tonight: cards, quiz, and <span class="brass2">'+esc(drill.name)+'</span> logged. That is a complete night.</div>'
        : '<div class="small dim lh">Cards and quiz are done, but tonight went in the book without hands. '
          + 'If a bottle and a tin are within reach, <span class="brass2">'+esc(drill.name)+'</span> still counts: log it and tonight upgrades.</div>'
          + '<div class="row"><button class="btn btn-ghost tiny" data-act="sess-hands">Take it to the practice room →</button></div>')
      + '</div>';
  }
  const { dueDeck, newDeck, dueAll } = sessionDeckParts();
  const parts = [];
  /* say the true size of the backlog, not just tonight's slice of it */
  if(dueDeck.length) parts.push(dueAll > dueDeck.length
    ? dueDeck.length + ' of ' + dueAll + ' reviews due'
    : dueDeck.length + ' review' + (dueDeck.length===1?'':'s') + ' due');
  if(newDeck.length) parts.push(newDeck.length + ' new card' + (newDeck.length===1?'':'s'));
  else if(dueAll > 50) parts.push('no new cards until the backlog clears');
  parts.push('a 10-question quiz round');
  parts.push('then <span class="brass2">'+esc(drill.name)+'</span> with your hands');
  return '<div class="panel p5 col" style="gap:10px">'
    + '<div class="row between"><div class="eyebrow">Tonight\'s session</div>'+streakChipsHTML()+'</div>'
    + '<div class="small dim lh">One pour, everything in order: ' + parts.join(' · ') + '.</div>'
    + '<div class="row"><button class="btn btn-brass" data-act="sess-start">Pour tonight\'s session</button></div></div>';
}

function sessionQuizDoneHTML(){
  /* extra block on the quiz-done screen when a session is running */
  if(!(state.sess && state.sess.active && state.sess.step === 'quiz')) return '';
  return '<button class="btn btn-brass" data-act="sess-drill">Last: '+esc(tonightDrill().name)+' →</button>';
}

/* the banner that sits above the drill panel during the session's third step */
function sessionDrillHTML(){
  if(!(state.sess && state.sess.active && state.sess.step === 'drill')) return '';
  const d = tonightDrill();
  return '<div class="panel p4 col" style="gap:8px;border-color:var(--brass)">'
    + '<div class="eyebrow">Tonight\'s session · the last step</div>'
    + '<div class="small lh">Cards and quiz are behind you. Make the drinks: <span class="brass2">'+esc(d.name)+'</span>, '
    + 'logged below. That is what turns a streak into a skill.</div>'
    + '<div class="row"><button class="btn btn-ghost tiny" data-act="sess-nobar">No bar tonight: close without it</button></div></div>';
}

/* ---------------- ORNAMENTS & GLASSWARE (Phase 5) ---------------- */

const ORNAMENTS = {
  fan: '<svg viewBox="0 0 80 22" width="80" height="22" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M40 20 L40 4 M40 20 L28 6 M40 20 L52 6 M40 20 L18 10 M40 20 L62 10 M40 20 L10 16 M40 20 L70 16"/><circle cx="40" cy="20" r="1.8" fill="currentColor" stroke="none"/></svg>',
  rule: '<svg viewBox="0 0 120 12" width="120" height="12" fill="currentColor" stroke="currentColor"><line x1="0" y1="6" x2="48" y2="6" stroke-width="1"/><path d="M60 1 L65 6 L60 11 L55 6 Z" fill="currentColor" stroke="none"/><line x1="72" y1="6" x2="120" y2="6" stroke-width="1"/></svg>',
  pip: '<svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor"><path d="M6 0 L8 6 L6 12 L4 6 Z"/></svg>',
};
function orn(name, cls){ return '<span class="orn '+(cls||'')+'" aria-hidden="true">'+(ORNAMENTS[name]||'')+'</span>'; }

const GLASS_ICONS = {
  coupe: '<path d="M4 4 C4.5 9.5 8 12 12 12 C16 12 19.5 9.5 20 4 Z M12 12 L12 18 M8 20 C8 19 10 18.5 12 18.5 C14 18.5 16 19 16 20 Z"/>',
  martini: '<path d="M4 4 L12 13 L20 4 Z M12 13 L12 18 M8 20 C8 19 10 18.5 12 18.5 C14 18.5 16 19 16 20 Z"/>',
  rocks: '<path d="M6 5 L6.6 19 L17.4 19 L18 5 Z M6.3 11 L17.7 11"/>',
  collins: '<path d="M8 3 L8.4 20 L15.6 20 L16 3 Z M8.2 8 L15.8 8"/>',
  flute: '<path d="M9.5 3 C9.5 9 10.5 11.5 12 12.5 C13.5 11.5 14.5 9 14.5 3 Z M12 12.5 L12 18.5 M9 20.5 C9 19.6 10.5 19.2 12 19.2 C13.5 19.2 15 19.6 15 20.5 Z"/>',
  mug: '<path d="M6 5 L6.5 19 L15.5 19 L16 5 Z M16 8 C19 8 19 15 16 15 M6.4 9 L15.7 9"/>',
  hurricane: '<path d="M9 3 C9 7 8 8.5 8 11 C8 14 10 15.5 12 15.5 C14 15.5 16 14 16 11 C16 8.5 15 7 15 3 Z M12 15.5 L12 19 M9 21 C9 20.2 10.5 19.8 12 19.8 C13.5 19.8 15 20.2 15 21 Z"/>',
  shot: '<path d="M8.5 8 L9.5 19 L14.5 19 L15.5 8 Z"/>',
  wine: '<path d="M7.5 3 C7.5 8.5 9 11 12 11 C15 11 16.5 8.5 16.5 3 Z M12 11 L12 18 M8.5 20 C8.5 19.1 10 18.7 12 18.7 C14 18.7 15.5 19.1 15.5 20 Z"/>',
  julep: '<path d="M7 5 L8 19 L16 19 L17 5 Z M7 5 L17 5 M7.5 12 L16.5 12"/>',
  tumbler: '<path d="M7 5 L7.8 19 L16.2 19 L17 5 Z"/>',
};
function glassIcon(glassText){
  const g = String(glassText || '').toLowerCase();
  let key = 'tumbler';
  if(/coupe|nick/.test(g)) key = 'coupe';
  else if(/martini|cocktail glass/.test(g)) key = 'martini';
  else if(/flute/.test(g)) key = 'flute';
  else if(/wine|goblet|balloon|copa/.test(g)) key = 'wine';
  else if(/hurricane|tiki|pearl diver|footed/.test(g)) key = 'hurricane';
  else if(/mug|copper|toddy|irish coffee/.test(g)) key = 'mug';
  else if(/julep|tin cup/.test(g)) key = 'julep';
  else if(/shot|shooter|cordial/.test(g)) key = 'shot';
  else if(/collins|highball|tall|pint|pilsner|zombie/.test(g)) key = 'collins';
  else if(/rocks|old.fashioned|double|lowball/.test(g)) key = 'rocks';
  return '<svg class="glass-ic" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true">'+GLASS_ICONS[key]+'</svg>';
}

/* ---------------- MY DATA: EXPORT / IMPORT (Phase 4) ---------------- */

function progressSummaryHTML(){
  const cards = Object.keys(progress.cards || {}).length;
  const q = (progress.quizzes || []).length;
  const t = (progress.tastings || []).length;
  const p = Object.values(progress.practice || {}).reduce((n,a) => n + (a ? a.length : 0), 0);
  return cards+' card records · '+q+' quiz rounds · '+t+' tasting notes · '+p+' practice logs';
}

function dataToolHTML(){
  return '<div class="col">'
    + '<div class="panel p5 col" style="gap:12px">'
    + '<div class="eyebrow">Back up the ledger</div>'
    + '<div class="small dim lh">Everything you\'ve earned (mastery records, quiz history, tasting notes, practice logs, your menu and what the bar stocks) lives in this browser and goes nowhere else. Export a copy now and then; paper burns and browsers forget.</div>'
    + '<div class="tiny font-tix dim">'+progressSummaryHTML()+'</div>'
    + '<div class="row" style="gap:8px"><button class="btn btn-brass" data-act="data-export">Export my records</button>'
    + (canShareBackup() ? '<button class="btn btn-ghost" data-act="data-share">Share the backup…</button>' : '')
    + '<button class="chip" data-act="data-copy">Copy backup to clipboard</button></div>'
    + '<div class="tiny dim" id="data-export-status" aria-live="polite"></div>'
    + '</div>'
    + '<div class="panel p5 col" style="gap:12px">'
    + '<div class="eyebrow">Restore from a backup</div>'
    + '<div class="small dim lh"><span class="brass2">Merge</span> keeps the better record wherever both files know a card. <span class="brass2">Replace</span> throws out everything here first.</div>'
    + '<div class="row" style="gap:10px">'
    + '<label class="btn btn-ghost" for="data-import-file" style="cursor:pointer">Choose backup file…</label>'
    + '<input type="file" id="data-import-file" accept=".json,application/json" style="display:none">'
    + '<span class="tiny dim" id="data-import-status"></span></div>'
    + '</div>'
    + storageWarningHTML()
    + '<div class="panel p4 col" style="gap:8px"><div class="eyebrow">Storage</div>'
    + '<div class="tiny dim" id="data-storage-line">Checking what the browser will promise…</div>'
    + '<div class="row"><button class="chip" id="data-persist-btn" data-act="data-persist">Ask the browser to keep it</button></div></div>'
    + '</div>';
}

/* Shown wherever records are discussed, the moment a save has fallen through
   to memory: the truth is "this session's records die with this tab". */
function storageWarningHTML(){
  if(!store.degraded) return '';
  return '<div class="panel p4" style="border-color:var(--oxblood)">'
    + '<div class="small bold" style="color:var(--oxblood-text)">The browser is refusing to save.</div>'
    + '<div class="tiny dim lh">Everything from this session lives only until this tab closes. '
    + 'Export a backup NOW (Tools \u2192 My Data), then check free space and site permissions.</div></div>';
}

function backupPayload(){
  const payload = {
    app: 'bartenders-ledger', version: 1,
    exported: new Date().toISOString(),
    progress: progress,
  };
  /* whose file this is: a manager collecting staff backups on one day was
     getting identically named, indistinguishable files */
  try{
    /* No name on a backup any more: nobody is asked for one. When manager mode
       arrives and records move between devices again, this is where the name
       goes back on, beside the export it belongs to. */
    const who = null;
    if(who && who.name) payload.profile = { name: String(who.name) };
  }catch(e){}
  return payload;
}
function backupFilename(payload){
  const d = new Date();
  const who = (payload.profile && payload.profile.name) ? '-' + slugify(payload.profile.name) : '';
  return 'bartenders-ledger-backup' + who + '-' + d.getFullYear() + '-'
    + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') + '.json';
}
function exportStatus(msg){
  const el = document.getElementById('data-export-status');
  if(el) el.textContent = msg;
  if(typeof say === 'function') say(msg);
}
function dataExport(){
  const payload = backupPayload();
  const blob = new Blob([JSON.stringify(payload, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = backupFilename(payload);
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
/* The phone path. An installed app's share sheet saves to Files, mails the
   backup or drops it in the venue's chat, where an <a download> can open a
   blank sheet instead. Offered only where the browser says it can share a
   File; the download stays as the desktop path, and the clipboard is the
   fallback that works everywhere. */
function canShareBackup(){
  try{
    if(!navigator.canShare || typeof File !== 'function') return false;
    return navigator.canShare({ files: [new File(['{}'], 'probe.json', { type: 'application/json' })] });
  }catch(e){ return false; }
}
function dataShare(){
  const payload = backupPayload();
  const file = new File([JSON.stringify(payload, null, 1)], backupFilename(payload), { type: 'application/json' });
  navigator.share({ files: [file], title: 'Bartender\'s Ledger backup' })
    .then(() => exportStatus('Shared.'))
    .catch(e => { if(!e || e.name !== 'AbortError') dataExport(); });
}
function dataCopy(){
  const text = JSON.stringify(backupPayload());
  const done = () => exportStatus('Copied. Paste it into a note or a message and keep it somewhere safe.');
  const fail = () => exportStatus('The browser would not hand over the clipboard. Use Export instead.');
  try{
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fail);
    else fail();
  }catch(e){ fail(); }
}

/* Which of two records of the same card survives, and what it keeps.

   Net record (right minus wrong) decides the winner, and the loser's SRS
   schedule is grafted on when the winner never earned one, so a mastered
   card cannot be demoted and an earned interval is not reset. `lapses` rides
   with the graft: the counter that says HOW a card has been hard was being
   dropped, which quietly reset every card's difficulty history while keeping
   its schedule.

   EXTRACTED because the rename path needs the same rule. It had its own,
   weaker one (`take the old card only if the new key is empty`), and the
   card loop above runs FIRST and fills that key, so on a cross-device rename
   the graft never fired, the record was renamed, and the orphan sweep then
   deleted the local card as unreachable. Two rules for one question is how
   that happened; there is one now. */
function bestCard(mine, theirs){
  if(!mine) return theirs;
  if(!theirs) return mine;
  const theirsWins = ((theirs.r||0) - (theirs.w||0)) > ((mine.r||0) - (mine.w||0));
  const winner = { ...(theirsWins ? theirs : mine) };
  const loser = theirsWins ? mine : theirs;
  if(winner.due === undefined && loser.due !== undefined){
    ['ef','ivl','reps','due','last','lapses'].forEach(f => { winner[f] = loser[f]; });
  }
  return winner;
}

function dataImport(file){
  const status = msg => { const el = document.getElementById('data-import-status'); if(el) el.textContent = msg; };
  const reader = new FileReader();
  reader.onload = () => {
    let p, who = '', barSkipped = 0;
    try{
      const parsed = JSON.parse(reader.result);
      p = parsed && parsed.app === 'bartenders-ledger' ? parsed.progress : parsed;
      if(parsed && parsed.profile && parsed.profile.name) who = ' for ' + String(parsed.profile.name);
      if(!p || typeof p !== 'object' || typeof p.cards !== 'object') throw new Error('bad shape');
      /* sanitize EVERY store before either path touches it: the oldest merge
         clauses call .forEach on these, and a hand-edited or truncated backup
         with a string where an array belongs crashed mid-merge, leaving a
         half-merged progress in memory */
      ['quizzes','tastings','shelf','pours','spills','openBottles','bottles','bar'].forEach(k => {
        if(p[k] !== undefined && !Array.isArray(p[k])) p[k] = [];
      });
      ['cards','practice','vidPrefs'].forEach(k => {
        if(p[k] !== undefined && (!p[k] || typeof p[k] !== 'object' || Array.isArray(p[k]))) p[k] = {};
      });
      if(p.cards) Object.keys(p.cards).forEach(k => {
        const v = p.cards[k];
        if(!v || typeof v !== 'object' || Array.isArray(v)) delete p.cards[k];
      });
      if(p.practice) Object.keys(p.practice).forEach(k => {
        if(!Array.isArray(p.practice[k])) delete p.practice[k];
      });
      /* every bar record to one shape before the merge reads a single field:
         the standalone app's dash placeholder, a numeric name, a string spec */
      if(p.bar){ const nb = normalizeBarRecords(p.bar); p.bar = nb.bar; barSkipped = nb.skipped; }
    }catch(e){ status('That file isn\'t a ledger backup.'); return; }
    const theirs = Object.keys(p.cards || {}).length;
    /* name the record the merge lands in: on a shared device a backup for
       Devon merged into Maria's record is the one mistake a backup cannot undo */
    const target = (() => {
      try{ return 'this ledger'; }
      catch(e){ return 'the unnamed record'; }
    })();
    const merge = confirm('Backup' + who + ': ' + theirs + ' card records.\n\nMerge this backup into ' + target + ' on this device?\n\nOK = merge (keeps the better of each).\nCancel = choose Replace instead.');
    const byTs = (a,b) => (a.ts || 0) - (b.ts || 0);
    if(merge){
      Object.entries(p.cards || {}).forEach(([k, s]) => {
        progress.cards[k] = bestCard(progress.cards[k], s);
      });
      ['quizzes','tastings'].forEach(key => {
        const seen = new Set((progress[key] || []).map(x => JSON.stringify(x)));
        (p[key] || []).forEach(x => { if(!seen.has(JSON.stringify(x))) (progress[key] = progress[key] || []).push(x); });
      });
      progress.quizzes = (progress.quizzes || []).sort(byTs).slice(-20);
      progress.tastings = (progress.tastings || []).sort(byTs).slice(-100);
      Object.entries(p.practice || {}).forEach(([id, arr]) => {
        const mine = progress.practice[id] || [];
        const seen = new Set(mine.map(x => JSON.stringify(x)));
        (arr || []).forEach(x => { if(!seen.has(JSON.stringify(x))) mine.push(x); });
        progress.practice[id] = mine.sort(byTs).slice(-20);
      });
      /* UNION, not adopt-if-empty: the old clause kept any non-empty local
         shelf and dropped the backup's entirely: merging two devices' owned
         bottles should own both sets. Ids, so the union is exact. */
      if(Array.isArray(p.shelf)){
        /* The backup may predate the vocabulary, so its ids are migrated on
           the way in. Forgetting this is the same bug as forgetting the boot
           call, only harder to notice: it only shows on a restore. */
        progress.shelf = [...new Set([...(progress.shelf || []), ...migrateShelf(p.shelf)])];
      }
      /* the additive-only rule in person: every store the merge does not name
         is silently dropped, so the venue's own list gets an explicit clause: union by id
         (name as the fallback for hand-edited files), newer edit wins */
      /* pours: union by timestamp; two devices' pours are disjoint
         observations, and the additive-only rule says every new store gets a
         named clause HERE or the next import silently drops it. */
      if(Array.isArray(p.pours)){
        progress.pours = progress.pours || [];
        const seen = new Set(progress.pours.map(x => x.ts));
        p.pours.forEach(x => { if(x && x.ts && !seen.has(x.ts)) progress.pours.push(x); });
        progress.pours = progress.pours.sort((a,b) => (a.ts||0)-(b.ts||0)).slice(-100);
      }
      /* bottles: union by name, HISTORY unioned inside each: newer-wins-whole
         would discard every price change the losing device recorded, which is
         the one thing the book exists to keep. Same conclusion the World
         Table's item book reached, ported with its reasoning. */
      /* spills and open bottles: union by ts/id, the additive-only rule,
         paid in the same commit that minted the fields. */
      if(Array.isArray(p.spills)){
        progress.spills = progress.spills || [];
        const seen = new Set(progress.spills.map(x => x.ts));
        p.spills.forEach(x => { if(x && x.ts && !seen.has(x.ts)) progress.spills.push(x); });
        progress.spills = progress.spills.sort((a,b) => (a.ts||0)-(b.ts||0)).slice(-200);
      }
      if(Array.isArray(p.openBottles)){
        progress.openBottles = progress.openBottles || [];
        const seen = new Set(progress.openBottles.map(x => x.id));
        p.openBottles.forEach(x => { if(x && x.id && !seen.has(x.id)) progress.openBottles.push(x); });
        progress.openBottles = progress.openBottles.slice(-60);
      }
      if(Array.isArray(p.bottles)){
        progress.bottles = progress.bottles || [];
        p.bottles.forEach(tb => {
          if(!tb || !tb.name) return;
          const i = progress.bottles.findIndex(x => x.name.toLowerCase() === tb.name.toLowerCase());
          if(i < 0){ progress.bottles.push(tb); return; }
          const mine = progress.bottles[i];
          /* normalised FIRST: a hand-edited or older-build record without a
             history array crashed the sort below, mid-merge, leaving progress
             half-merged in memory. A guard beats a wreck. */
          mine.history = Array.isArray(mine.history) ? mine.history : [];
          const seen = new Set(mine.history.map(h => h.at + '|' + h.price + '|' + h.sizeMl));
          (Array.isArray(tb.history) ? tb.history : []).forEach(h => {
            if(h && !seen.has(h.at + '|' + h.price + '|' + h.sizeMl)) mine.history.push(h);
          });
          mine.history.sort((a,b) => (b.at||0) - (a.at||0));
          mine.history = mine.history.slice(0, 12);
          const head = mine.history[0];
          if(head){ mine.price = head.price; mine.sizeMl = head.sizeMl; mine.ts = Math.max(mine.ts||0, tb.ts||0); }
        });
      }
      /* streak: a RECORD, not a pref, the additive-only rule's reach. A
         merge-restore onto a new phone zeroed a 200-night streak because
         nothing named it. More recent night wins (last is YYYY-MM-DD, so
         string compare IS date compare); ties keep the longer run. vidPrefs
         stays unnamed on purpose: a preference is device-local. */
      if(p.streakData && p.streakData.last){
        const mineS = progress.streakData;
        if(!mineS || !mineS.last){ progress.streakData = p.streakData; }
        else {
          /* {n, last} guarantees contiguity, so two records are date SPANS.
             When the spans touch or overlap they are one unbroken streak:
             winner-take-all was zeroing the old device's 200 nights the
             moment the new device stamped one newer night. */
          const T = p.streakData, M = mineS;
          const parseK = (k) => { const q = k.split('-').map(Number); return new Date(q[0], q[1] - 1, q[2]); };
          const keyOf = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
          const addDays = (k, n) => { const d = parseK(k); d.setDate(d.getDate() + n); return keyOf(d); };
          const nT = Math.max(1, +T.n || 1), nM = Math.max(1, +M.n || 1);
          const startT = addDays(T.last, -(nT - 1)), startM = addDays(M.last, -(nM - 1));
          if(startT <= addDays(M.last, 1) && startM <= addDays(T.last, 1)){
            const last = T.last > M.last ? T.last : M.last;
            const start = startT < startM ? startT : startM;
            const nights = Math.round((parseK(last) - parseK(start)) / 86400000) + 1;
            const lastHands = ((T.lastHands || '') > (M.lastHands || '')) ? T.lastHands : M.lastHands;
            progress.streakData = { last: last, n: nights, hands: Math.max(T.hands || 0, M.hands || 0), lastHands: lastHands || null };
          } else if(T.last > M.last || (T.last === M.last && nT > nM)){
            progress.streakData = T;
          }
        }
      }
      /* A UNION, and this reverses the rule that shipped first.

         Newest-wins-whole was chosen to avoid taking a bottle off the board
         that the other device had already restocked. That reasoning was only
         half the picture: whole replacement produces the OPPOSITE error, and
         it is the worse one. Two tablets behind the same bar, A 86s the rye at
         eight and B 86s the gin at nine; merge A into B and the rye is back on
         the board, so the ledger tells a bartender the Sazerac is pourable out
         of an empty bottle. That is a false YES, which reqsOf's own sentinel
         comment refuses in as many words: the ledger would rather say it does
         not know than say yes.

         The union's error is the cheap one. A bottle that has been restocked
         shows as off the board, the bartender taps it back on, and it is
         right. The false yes is invisible until somebody reaches for the
         bottle in front of a guest.

         The stamp goes to the NEWER of the two, so the eighteen hour expiry
         still measures from the most recent shift either device worked.

         Which sub-view of the Menu tab you were last looking at is NOT stored
         at all, so it has nothing to merge: it lives in state, and a fresh
         open should land on the menu rather than wherever last night ended. */
      if(Array.isArray(p.eightySix)){
        progress.eightySix = [...new Set([...(progress.eightySix || []), ...p.eightySix.filter(k => typeof k === 'string')])];
        progress.eightySixAt = Math.max(progress.eightySixAt || 0, p.eightySixAt || 0) || Date.now();
      }
      if(Array.isArray(p.bar)){
        progress.bar = progress.bar || [];
        p.bar.forEach(b => {
          if(!b || !b.name) return;
          /* case-insensitive, matching saveBarRecord's own uniqueness rule, and
             when the kept record's name differs in case, its card record rides
             along to the new key instead of stranding */
          const i = progress.bar.findIndex(x => (b.id && x.id === b.id) || x.name.toLowerCase() === b.name.toLowerCase());
          if(i < 0) progress.bar.push(b);
          else if((b.ts || 0) > (progress.bar[i].ts || 0)){
            const oldKey = 'My Bar · ' + progress.bar[i].name, newKey = 'My Bar · ' + b.name;
            /* The record is being renamed, so its history has to move with it,
               and BOTH keys may already hold a card: the card loop above ran
               first and may have written newKey from the other device. Merge
               them by the same rule every other card in this import uses, then
               drop the old key, rather than letting the orphan sweep delete a
               forty-review card because its name changed on another machine. */
            if(oldKey !== newKey && progress.cards && progress.cards[oldKey]){
              progress.cards[newKey] = bestCard(progress.cards[newKey], progress.cards[oldKey]);
              delete progress.cards[oldKey];
            }
            progress.bar[i] = b;
          }
        });
      }
    } else {
      if(!confirm('REPLACE everything in this browser with the backup?\nYour current records here will be gone for good.')){ status('Left everything as it was.'); return; }
      progress = p;
    }
    if(!progress.cards) progress.cards = {};
    if(!progress.quizzes) progress.quizzes = [];
    if(!progress.practice) progress.practice = {};
    if(!progress.tastings) progress.tastings = [];
    if(!progress.vidPrefs) progress.vidPrefs = { channel:'auto', longform:false };
    if(!progress.bar) progress.bar = [];
    if(!progress.pours) progress.pours = [];
    if(!progress.bottles) progress.bottles = [];
    if(!progress.spills) progress.spills = [];
    if(!progress.openBottles) progress.openBottles = [];
    srsMigrate(progress.cards);
    /* a backup can carry card records for My Bar drinks renamed or deleted
       since, unreviewable by construction, but they inflate the overdue
       count forever. The rename/delete paths already keep cards consistent;
       imports now do too. */
    const barNames = new Set((progress.bar || []).map(b => 'My Bar · ' + b.name));
    Object.keys(progress.cards || {}).forEach(k => {
      if(k.indexOf('My Bar · ') === 0 && !barNames.has(k)) delete progress.cards[k];
    });
    /* migrateShelf here as well as in the merge branch above, because a whole
       REPLACE assigns the backup's raw shelf straight onto progress and would
       otherwise land pre-vocabulary ids that satisfy nothing. Idempotent, so
       running it on an already-migrated list costs a comparison. */
    progress.shelf = Array.isArray(progress.shelf) ? migrateShelf(progress.shelf) : [];
    state.tools.shelf = progress.shelf.slice();
    /* The same eighteen hour rule the boot applies. It lived ONLY in the boot
       sequence, so a restore brought a dead shift's 86 list back to life and
       kept it there until the next reload: drinks off the board for a
       bartender who never 86'd anything. One function, both call sites. */
    expireStaleEightySix();
    dropDeadEightySix();
    barChanged();
    saveProgress();
    render();
    const el = document.getElementById('data-import-status');
    if(el) el.textContent = (merge ? 'Merged. The ledger remembers.' : 'Restored from backup.')
      + (barSkipped ? ' ' + barSkipped + ' My Bar record' + (barSkipped===1 ? '' : 's') + ' could not be read and ' + (barSkipped===1 ? 'was' : 'were') + ' skipped.' : '');
  };
  reader.onerror = () => status('Could not read that file.');
  reader.readAsText(file);
}

function fillStorageLine(){
  const el = document.getElementById('data-storage-line');
  if(!el || !navigator.storage || !navigator.storage.estimate){ if(el) el.textContent = 'This browser keeps its storage promises to itself.'; return; }
  /* read-only status check: persist() is only requested from the explicit
     button, because some browsers surface it as a permission prompt */
  Promise.all([
    navigator.storage.estimate(),
    navigator.storage.persisted ? navigator.storage.persisted() : Promise.resolve(false),
  ]).then(([est, persisted]) => {
    const used = est.usage ? (est.usage/1024/1024).toFixed(1) + ' MB used' : '';
    el.textContent = (persisted
      ? 'Storage is persistent: the browser has promised not to evict the ledger. '
      : 'Storage is best-effort: a storage-pressed browser could evict it, so export now and then. ') + used;
    const btn = document.getElementById('data-persist-btn');
    if(btn && persisted) btn.remove();
  }).catch(() => { el.textContent = ''; });
}

function requestPersistence(){
  if(!(navigator.storage && navigator.storage.persist)) return;
  navigator.storage.persist().then(() => fillStorageLine());
}

/* ---------------- DASHBOARD: INLINE SVG CHARTS (Phase 4) ---------------- */

function svgDonut(segments, size, label, sub){
  size = size || 92;
  const total = segments.reduce((n,s) => n + s.v, 0) || 1;
  const r = 38, cx = 50, cy = 50, circ = 2 * Math.PI * r;
  let off = -circ / 4;
  const arcs = segments.map(s => {
    const len = s.v / total * circ;
    const a = '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+s.c+'" stroke-width="12" '
      + 'stroke-dasharray="'+len+' '+(circ-len)+'" stroke-dashoffset="'+(-off)+'"><title>'+esc(s.t+': '+s.v)+'</title></circle>';
    off += len;
    return a;
  }).join('');
  return '<svg viewBox="0 0 100 100" width="'+size+'" height="'+size+'" role="img" aria-label="'+esc(label)+'">'
    + arcs
    + '<text x="50" y="47" text-anchor="middle" font-size="20" font-family="Courier Prime, monospace" font-weight="700" fill="var(--brass-2)">'+esc(label)+'</text>'
    + '<text x="50" y="62" text-anchor="middle" font-size="9" fill="var(--cream-dim)">'+esc(sub)+'</text></svg>';
}

function svgSpark(values, w, h, max){
  w = w || 220; h = h || 44;
  if(!values.length) return '';
  max = max || Math.max(...values, 1);
  const pts = values.map((v,i) => {
    const x = values.length === 1 ? w/2 : i / (values.length-1) * (w-8) + 4;
    const y = h - 5 - (v / max) * (h - 12);
    return [x, y];
  });
  const path = pts.map((p,i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const dots = pts.map((p,i) => '<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="2.4" fill="var(--brass-2)"><title>'+values[i]+'</title></circle>').join('');
  return '<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" style="max-width:100%">'
    + '<path d="'+path+'" fill="none" stroke="var(--brass)" stroke-width="1.6"/>' + dots + '</svg>';
}

function svgBars(values, labels, w, h){
  w = w || 220; h = h || 56;
  const max = Math.max(...values, 1);
  const bw = w / values.length;
  const bars = values.map((v,i) => {
    const bh = Math.max(v ? 3 : 1, (v / max) * (h - 18));
    const col = v ? 'var(--brass)' : 'var(--felt-3)';
    return '<rect x="'+(i*bw+3)+'" y="'+(h-14-bh)+'" width="'+(bw-6)+'" height="'+bh+'" rx="1.5" fill="'+col+'"><title>'+esc(labels[i]+': '+v)+'</title></rect>'
      + '<text x="'+(i*bw+bw/2)+'" y="'+(h-3)+'" text-anchor="middle" font-size="8.5" fill="var(--cream-dim)">'+esc(labels[i])+'</text>'
      + (v ? '<text x="'+(i*bw+bw/2)+'" y="'+(h-17-bh)+'" text-anchor="middle" font-size="8.5" font-family="Courier Prime, monospace" fill="var(--brass-2)">'+v+'</text>' : '');
  }).join('');
  return '<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" style="max-width:100%">'+bars+'</svg>';
}

function dashboardHTML(){
  const all = allDrinks();
  const donuts = deckSources().map(src => {
    const pool = all.filter(d => d.src === src);
    const m = pool.filter(d => isMastered(cardKey(d))).length;
    const seen = pool.filter(d => !isMastered(cardKey(d)) && progress.cards[cardKey(d)]).length;
    const unseen = pool.length - m - seen;
    return '<div class="tc">'+svgDonut([
      { v:m, c:'var(--brass)', t:'Mastered' },
      { v:seen, c:'var(--oxblood)', t:'In progress' },
      { v:unseen, c:'#274f43', t:'Unseen' },
    ], 92, String(m), 'of '+pool.length)
    + '<div class="tiny dim mt1">'+esc(srcLabel(src))+'</div></div>';
  }).join('');

  /* replays only re-ask what you already missed, so they would read as a
     spike exactly when you were struggling: keep them out of the trend */
  const quizzes = (progress.quizzes || []).filter(q => !q.replay);
  const qVals = quizzes.slice(-20).map(q => Math.round(q.score / (q.total || 10) * 100));
  const quizBlock = qVals.length >= 2
    ? svgSpark(qVals, 220, 44, 100) + '<div class="tiny dim">last '+qVals.length+' rounds · best '+Math.max(...qVals)+'%</div>'
    : '<div class="tiny dim lh">Two quiz rounds unlock the trend line.</div>';

  const fc = srsForecast(7);
  const dayNames = ['Now','+1','+2','+3','+4','+5','+6'];
  const dueTotal = fc.reduce((a,b) => a+b, 0);
  const forecastBlock = dueTotal
    ? svgBars(fc, dayNames, 230, 58)
    : '<div class="tiny dim lh">Drill some flashcards and the review schedule builds itself.</div>';

  const drills = Object.entries(progress.practice || {}).filter(([,a]) => a && a.length >= 2);
  const drillBlock = drills.length
    ? drills.map(([id, arr]) => {
        const d = DRILLS.find(x => x.id === id);
        const vals = arr.slice(-12).map(e => e.v);
        const latest = vals[vals.length-1];
        return '<div class="row" style="gap:10px"><span class="tiny dim" style="width:120px;flex-shrink:0">'+esc(d ? d.name : id)+'</span>'
          + svgSpark(vals, 130, 30)
          + '<span class="tiny font-tix brass2">'+latest+(d ? ' '+esc(d.unit) : '')+'</span></div>';
      }).join('')
    : '';

  return '<div class="panel p5"><div class="eyebrow mb2">The night\'s numbers</div>'
    + '<div class="row" style="gap:18px;justify-content:space-around;flex-wrap:wrap">'+donuts+'</div>'
    + '<div class="row mt3" style="gap:24px;align-items:flex-start;flex-wrap:wrap">'
    + '<div style="flex:1;min-width:230px"><div class="eyebrow mb1">Quiz trend</div>'+quizBlock+'</div>'
    + '<div style="flex:1;min-width:230px"><div class="eyebrow mb1">Reviews coming due</div>'+forecastBlock+'</div>'
    + '</div>'
    + (drillBlock ? '<div class="eyebrow mt3 mb1">Drill progress</div><div class="col-sm" style="gap:6px">'+drillBlock+'</div>' : '')
    + '</div>';
}

/* ---------------- THE BAR MANAGER'S NOTE: rules-based riff critique ---------------- */
/* Replaces the old Ask-Claude button. Deterministic per deal (seeded from the spec). */

function riffSeed(str){
  let h = 2166136261;
  for(let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h = Math.imul(h ^ (h>>>15), 2246822507); h = Math.imul(h ^ (h>>>13), 3266489909); return ((h ^= h>>>16) >>> 0) / 4294967296; };
}
const pickSeeded = (rnd, arr) => arr[Math.floor(rnd()*arr.length)];

const RIFF_INGREDIENT_NOTES = [
  [/mezcal/i, "Mezcal will dominate the room: its smoke reads at half an ounce. If you want the template to still show through, split the base: one ounce mezcal, one ounce blanco."],
  [/blended scotch/i, "Blended scotch is gentler than its reputation: this will drink soft and malty. A bar spoon of Islay over the top would give it weather without taking over."],
  [/honey/i, "Honey syrup is richer and rounder than simple: most palates read it a shade sweeter at the same measure. Consider pulling it back an eighth, or lean in and call it deliberate."],
  [/maple/i, "Maple brings autumn and a faint bitterness at the finish. It loves aged spirits and quarrels politely with unaged ones."],
  [/orgeat/i, "Orgeat is doing two jobs: sweetness and almond body. Your drink now has one foot in tiki; a lime component and it's fully across the border."],
  [/ginger syrup/i, "Ginger syrup bites back. It pairs beautifully with whiskey and rum, and it will happily bully a delicate gin."],
  [/demerara/i, "Demerara deepens without complicating: the safest upgrade in the well. Good call."],
  [/fino sherry/i, "Fino instead of vermouth is a dry, saline, nutty read: the drink gets quieter and more adult. Serve it colder than usual; sherry blooms with the chill."],
  [/blanc vermouth/i, "Blanc vermouth is sweeter than dry but brighter than rosso; it flatters citrus-forward gins and makes tequila taste expensive."],
  [/dry vermouth/i, "With dry vermouth this leans Continental: crisp, pale, before-dinner. Watch that your bitters don't outweigh the wine."],
  [/^campari/i, "Campari as the base makes this an aperitivo drink, full stop: low-slung, bitter, sessionable. Own it: serve it before dinner and garnish with something orange."],
  [/pisco/i, "Pisco brings grape and altitude: floral, unoaked, a little wild. It rewards fresh citrus and resents heavy syrup."],
  [/cachaça|cacha/i, "Cachaça's green funk is the point: don't sand it down. Lime is its oldest friend."],
  [/mole bitters/i, "Mole bitters bring chocolate and chile warmth: made for agave and aged rum, surprisingly good over cognac."],
  [/peychaud/i, "Peychaud's is lighter and more anise-forward than Angostura; it perfumes rather than anchors. Two dashes is a whisper, not a wall."],
  [/apple brandy/i, "Apple brandy is orchard-in-a-glass: it makes old templates taste like October. Bonded if you can get it; the 80-proof stuff disappears under sugar."],
  [/aged rum/i, "Aged rum slots into whiskey templates almost one-for-one: expect it rounder and a touch sweeter than the rye version of the same math."],
  [/tonic/i, "Tonic's quinine is a flavor, not just fizz; it argues with heavily sweet drinks and loves botanical and bitter ones."],
  [/grapefruit soda/i, "Grapefruit soda self-balances: sweet, sour and bitter in one pour. Keep any added syrup out or it turns to candy."],
  [/cola/i, "Cola is already a finished cocktail's worth of spice and sugar: the spirit is seasoning. A squeeze of lime keeps it honest."],
  [/dry sparkling wine/i, "Sparkling wine as mixer turns any build into an occasion: pour it last, over the back of a spoon, and don't stir the wedding away."],
];

const RIFF_TWIST_NOTES = [
  [/egg white/i, "The egg white wants a dry shake first (hard, no ice) then the cold shake. It'll mute the sharp edges and add three minutes of theater. Worth it."],
  [/soda/i, "Topping with soda makes it a long drink; rebalance in your head: the dilution is built in now, so keep the shake short and the ice fresh."],
  [/maraschino/i, "That quarter ounce of maraschino is the Martinez move, funky cherry-almond that reads as 'old money.' It counts toward your sweet total; adjust accordingly."],
  [/red wine/i, "The wine float is pure New York Sour lineage: pour it over the back of a spoon and let it sit like a sunset. Tell the guest to drink through it, not stir."],
  [/absinthe/i, "Absinthe is a seasoning here: rinse and dump, or one dash. At two dashes the anise annexes the drink."],
  [/half lemon, half lime/i, "Splitting the citrus is a bartender's hedge that usually wins: lemon for lift, lime for bite. No spec change needed."],
  [/amaro/i, "Swapping toward amaro deepens and darkens: you're trading wine's freshness for root-and-herb weight. Start 1:1 with the original modifier before going all in."],
  [/split the base/i, "A split base is how half the modern classics were born: keep the two spirits in the same weight class or one will disappear."],
  [/campari/i, "Equal parts with Campari is Negroni logic: it will work, it always works, but it stops being your riff and starts being their family."],
  [/citrus peels/i, "Two expressed peels layer the aromatics: orange for warmth, lemon for lift. Express high and let the oils rain."],
  [/salt/i, "The pinch of salt isn't for salinity: it suppresses bitterness and rounds sweetness. The cheapest upgrade in bartending."],
  [/bitters over the top|dash of bitters/i, "Bitters over the top aromatize every sip without recoloring the drink beneath; drag a straw through for marbling."],
  [/rich liqueur/i, "A bar-spoon of rich liqueur as the sweetener is the Sazerac school, flavor and sugar in one move. Choose one that agrees with your base's barrel time."],
];

const RIFF_GLASS = {
  'Sour': ["Coupe, up, no ice", "A fat lemon twist, expressed and perched"],
  'Spirit & Vermouth': ["Nick & Nora, stirred silk-cold", "Brandied cherry, or a twist if it leans dry"],
  'Old Fashioned': ["Rocks glass over one large cube", "Expressed orange peel, skin-side down first"],
  'Highball': ["Collins over spear ice, built cold", "Match the garnish to the mixer: citrus for soda, botanical for tonic"],
};

const RIFF_NAME_BANKS = {
  lead: {
    'Whiskey': ['Rail Yard','Copper','Kentucky','Porter’s','Night Shift','Foundry','Ember'],
    'Rum': ['Harbor','Trade Wind','Cane','Lighthouse','Corsair','Galley'],
    'Gin': ['Botanist’s','Juniper','Greenhouse','Parlor','Marlow’s','Vesper Street'],
    'Vodka': ['Silver','Northern','Midnight','Icehouse','Loyal'],
    'Tequila': ['Agave','Sonoran','Vaquero’s','Blue Hour','Cantina'],
    'Brandy': ['Orchard','Vineyard','Coach House','Armistice','October'],
    'Aperitivo': ['Piazza','Vermilion','Sundown','Milanese','Aperitivo Hour'],
    'default': ['House','Ledger’s','Corner Booth','Last Call','Well’s End'],
  },
  tail: {
    smoke: ['Smoke Signal','Bonfire','Signal Fire','Ash & Oak'],
    honey: ['Beeline','Apiary','Gold Rush Redux','Honey Trap'],
    maple: ['Cabin Fever','Sugarhouse','Late Harvest'],
    ginger: ['Sting','Rickshaw','Sharp Word'],
    sherry: ['Fino Point','Solera','Andalusia'],
    wine: ['Sunset District','Claret Cloud','Vin Rouge'],
    egg: ['Silk Road','Cloud Cover','Feather Bed'],
    absinthe: ['Green Hour','Wormwood','Old Ghost'],
    default: ['Accord','Correction','Detour','Alibi','Overture','Postscript','Handshake','Sidebar'],
  },
};

function critiqueRiff(frame, deal){
  const pseudo = { spec: deal.resolved };
  const b = balanceOf(pseudo);
  const notes = [];

  /* 1: the math, checked against the family's target */
  if(frame.fam === 'Sour'){
    const gap = b.sweet - b.sour;
    if(Math.abs(gap) <= 0.25) notes.push("The math checks out: "+ozNice(b.strong)+" strong against "+ozNice(b.sour)+" sour and "+ozNice(b.sweet)+" sweet, textbook sour architecture.");
    else if(gap > 0.25) notes.push("You're running "+ozNice(gap)+" oz sweet-heavy. With a rich syrup in play that will read as dessert: pull the sweet back or brighten the citrus.");
    else notes.push("You're running "+ozNice(-gap)+" oz tart-heavy: bracing on the first sip, hollow by the third. Nudge the sweet up an eighth.");
  } else if(frame.fam === 'Spirit & Vermouth'){
    const ratio = b.modifier ? (b.strong / b.modifier) : 99;
    if(ratio >= 1.8 && ratio <= 2.4) notes.push("Two-to-one spirit to wine, the modern standard, and the right place to start any new marriage of the two.");
    else if(ratio < 1.8) notes.push("You're wine-forward of the modern 2:1: that's the 1880s ratio, silkier and lower octane. Legitimate, just know you chose it.");
    else notes.push("Spirit-heavy of 2:1; it will drink hot unless your stir is patient. Count thirty revolutions minimum.");
  } else if(frame.fam === 'Old Fashioned'){
    if(b.sweet <= 0.375) notes.push("Sweetness at "+ozNice(b.sweet)+" oz, a whisper, which is exactly what this family wants. The water from the stir is your real second ingredient.");
    else notes.push("At "+ozNice(b.sweet)+" oz of sweet this is drifting toward a slow-motion sour. The old-fashioned way is stingier: a quarter ounce, then let dilution finish the argument.");
  } else if(frame.fam === 'Highball'){
    const ratio = b.strong ? (b.long / b.strong) : 0;
    if(ratio >= 1.5) notes.push("Mixer at "+ozNice(b.long)+" oz over "+ozNice(b.strong)+" of spirit: proper highball proportions. The drink is temperature and bubbles now; build it ice-cold and barely stir.");
    else notes.push("Your mixer's running short at "+ozNice(b.long)+" oz: under 1.5× the spirit, it's a strong drink with fizz, not a highball. Either commit taller or serve it over one big rock and call it something else.");
  }

  /* 2: ingredient-aware observations */
  const allPicks = Object.values(deal.picks).join(' ');
  RIFF_INGREDIENT_NOTES.forEach(([re, note]) => { if(re.test(allPicks)) notes.push(note); });

  /* 3: the twist */
  const twistNote = RIFF_TWIST_NOTES.find(([re]) => re.test(deal.twist));
  if(twistNote) notes.push(twistNote[1]);

  /* 4: glass & garnish */
  const gg = RIFF_GLASS[frame.fam] || RIFF_GLASS['Sour'];

  /* 5: three names, seeded so the note doesn't reshuffle on re-render */
  const rnd = riffSeed(deal.resolved.join('|') + deal.twist);
  const sp = baseSpirit(deal.picks.base || '') || 'default';
  const leads = RIFF_NAME_BANKS.lead[sp] || RIFF_NAME_BANKS.lead.default;
  let tailKey = 'default';
  if(/mezcal|scotch/i.test(allPicks)) tailKey = 'smoke';
  else if(/honey/i.test(allPicks)) tailKey = 'honey';
  else if(/maple/i.test(allPicks)) tailKey = 'maple';
  else if(/ginger/i.test(allPicks)) tailKey = 'ginger';
  else if(/sherry/i.test(allPicks)) tailKey = 'sherry';
  else if(/red wine/i.test(deal.twist)) tailKey = 'wine';
  else if(/egg white/i.test(deal.twist)) tailKey = 'egg';
  else if(/absinthe/i.test(deal.twist)) tailKey = 'absinthe';
  const tails = RIFF_NAME_BANKS.tail[tailKey];
  const names = new Set();
  let guard = 0;
  while(names.size < 3 && guard++ < 24){
    names.add(rnd() < 0.5 ? 'The ' + pickSeeded(rnd, leads) + ' ' + pickSeeded(rnd, RIFF_NAME_BANKS.tail.default)
                          : 'The ' + pickSeeded(rnd, tails));
  }

  return { notes, glass: gg[0], garnish: gg[1], names: [...names] };
}

function critiqueHTML(frame, deal){
  const c = critiqueRiff(frame, deal);
  return '<div class="mgr-note">'
    + '<div class="mgr-seal">✿</div>'
    + '<div class="eyebrow" style="color:var(--oxblood)">Bar manager’s note</div>'
    + c.notes.map(n => '<div class="small lh">'+esc(n)+'</div>').join('')
    + '<div class="tix-rule"></div>'
    + '<div class="small"><span class="tix-label">Serve it </span>'+esc(c.glass)+'</div>'
    + '<div class="small"><span class="tix-label">Garnish </span>'+esc(c.garnish)+'</div>'
    + '<div class="small"><span class="tix-label">Call it </span>'+c.names.map(esc).join(' · ')+'</div>'
    + '</div>';
}
