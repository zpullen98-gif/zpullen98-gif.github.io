/* ---------------- HOME ---------------- */
function renderHome(){
  const stats = progress.cards || {};
  const mastered = allDrinks().filter(function(d){ return isMastered(cardKey(d)); }).length;
  const totalCards = allDrinks().length;
  const studied = Object.keys(stats).length;
  const quizzes = progress.quizzes || [];
  const full = quizzes.filter(q => (q.total||10)===10);
  const best = full.length ? Math.max(...full.map(q=>q.score)) : null;
  const tastings = (progress.tastings || []).length;
  const drillLogs = Object.values(progress.practice || {}).reduce(function(n,a){ return n + (a?a.length:0); }, 0);
  /* volume is flattering and useless: what needs action is what is overdue and
     what keeps collapsing, so surface both */
  const overdue = (typeof srsDueKeys === 'function') ? srsDueKeys().length : 0;
  const weakest = Object.keys(progress.cards || {})
    .map(function(k){ const s2 = progress.cards[k];
      return { k:k, score:(s2.w||0)*2 + (s2.lapses||0)*1.5 - (s2.r||0) }; })
    .filter(function(x){ return x.score > 0; })
    .sort(function(a,b){ return b.score - a.score; })
    .slice(0,5)
    .map(function(x){ return '<button class="chip" data-act="fc-drill-weak" data-k="'+esc(x.k)+'">'+esc(x.k)+'</button>'; })
    .join(' ');
  const famBars = Object.keys(FAMILIES).map(f => {
    const mem = COCKTAILS.filter(c => c.family===f);
    const m = mem.filter(function(c){ return isMastered(c.name); }).length;
    const pct = mem.length ? Math.round(m/mem.length*100) : 0;
    return '<div class="row" style="gap:10px"><span class="tiny dim" style="width:130px;flex-shrink:0">'+esc(f)+'</span>'
      + '<div style="flex:1;height:6px;background:var(--felt-3);border-radius:3px;overflow:hidden">'
      + '<div style="width:'+pct+'%;height:100%;background:var(--brass)"></div></div>'
      + '<span class="tiny font-tix" style="color:var(--brass-2);width:38px;text-align:right">'+m+'/'+mem.length+'</span></div>';
  }).join('');
  /* The bands are shared with the other wings (shared/oot-home.js). A tile
     moves band by moving one line here; nothing else knows the difference. */
  const TILE_BANDS = [
    ['Learn', 'Read it first, then drill what you read', [
      ['families','The Families',FAMILIES ? Object.keys(FAMILIES).length+' templates unlock the whole canon, each with the marks that say a pour went right. Start here; this is the map.' : ''],
      ['library','The Library','All '+COCKTAILS.length+' specs, one for every day of the year, on ledger tickets with balance breakdowns.'],
      ['prep','The Prep Room','Syrups, infusions, cordials, juice and garnish specs, plus opening and closing checklists.'],
      ['producers','The Producers','Benchmark houses across nine categories: how they actually make it, and why it matters.'],
      ['na','Zero Proof','85 spirit-free drinks across nine families, the pantry behind them, and the ethics of sober service.'],
      ['shots','The Shot Board','75 calls, a round-batching builder, the layering density drill, and the service craft.'],
      ['service','Behind the Stick','Beer and draught, wine service, the legal floor, the register, conflict and glassware: the half of the job that is not a cocktail.'],
      ['notes','Study Notes','Spirits, technique, syrups, hospitality, sober service, and history.']
    ]],
    ['Practise', 'Until the spec comes without thinking', [
      ['flashcards','Flashcards',FC_MODES.length+' drill modes across every cocktail, shot, and zero-proof drink in the ledger.'],
      ['quiz','Quiz Rounds','Families, blind tickets, bar knowledge, real-service scenarios, and the dealer\'s-choice call.'],
      ['practice','Practice & Tasting','Nine hands-on drills, the Ticket Rail, the Hold-the-Round memory test, the free-pour bench, tasting scorecards, and twelve guided flights.'],
      ['riffs','Riff Builder','Improvise on the templates: the difference between knowing 50 drinks and 500.'],
      ['menu','Menu','The list you actually pour, what the bar stocks tonight, and what you can still put up when something runs out.'],
      ['tools','Bar Tools','Batching, strength estimates, pour costing with the bottle book, the spill log, open-bottle dating, unit conversion, and your backups.']
    ]]
  ];
  const tileGrid = (rows) => '<div class="card-grid">'
    + rows.map(([k,t,d]) => '<button class="panel click p4'+(tabLocked(k)?' oot-locked':'')+'" data-act="go" data-tab="'+k+'"'+(tabLocked(k)?' aria-disabled="true"':'')+'>'
      + '<div class="bold brass2">'+t+'</div><div class="small dim mt1 lh">'+d+'</div></button>').join('')
    + '</div>';
  const OH = (window.OOT && OOT.home) || null;
  const band = (name, blurb, inner) => OH ? OH.section(name, blurb, inner)
    : '<div class="panel p5"><div class="eyebrow mb2">'+name+'</div>'+inner+'</div>';
  /* No name row and no manager strip. Both are the same unbuilt feature: The
     Pass counts named people, and there is no way to name one here any more.
     Leaving the strip would have printed "ask each person to tap Studying,
     then add their name" over a control this wing no longer has. */
  /* The induction sits at the top of Learn until it is finished, then it stops
     taking up room. */
  const firstPath = (function(){
    /* OP is no longer part of this: the checklist ticks against this device's
       own record, so it works for whoever is standing at the bar. */
    if(!OH || typeof FIRST_PATH === 'undefined') return '';
    const done = {};
    FIRST_PATH.forEach(function(st){ if(progress.path && progress.path[st.id]) done[st.id] = 1; });
    const rows = OH.firstPath(FIRST_PATH.map(function(st){
      return { id: st.id, t: st.t, mins: st.mins, act: 'data-oot-step="'+st.id+'"' };
    }), done);
    return rows ? '<div class="oot-today-sub" style="margin:0 0 8px">Your first week. '
      + 'Finish it and you have been over the ground a new bartender is expected to know.</div>' + rows : '';
  })();
  /* First run: a stats panel of zeros, eight 0% bars and three empty donuts is
     a terrible first impression. Until there's anything to report, say what the
     ledger is and point at the one button that starts everything. */
  const fresh = !studied && !quizzes.length && !tastings && !drillLogs;
  if(fresh){
    return '<div class="col">'
      + band('Today', 'The whole routine, about ten minutes', sessionPanelHTML())
      + '<div class="panel p5 col" style="gap:12px">'
      + '<div class="eyebrow">Start here</div>'
      + '<div class="small dim lh" style="max-width:520px">This is a working bartender’s study ledger, not a recipe app. '
      + 'It holds '+COCKTAILS.length+' cocktails with the history behind each one, '+SHOTS.length+' shots, '+NA_DRINKS.length+' zero-proof drinks, '
      + PREPS.length+' prep sheets and a full behind-the-bar curriculum, and it drills you, offline, for as long as you keep showing up.</div>'
      + '<div class="small dim lh" style="max-width:520px"><span class="brass2">Pour tonight’s session</span> above is the whole routine: '
      + 'a handful of cards in canon order, a ten-question round, then a drill you do with your hands. '
      + 'Ten minutes. Come back tomorrow and it deals what you’re about to forget.</div>'
      + '<div class="tiny dim lh" style="max-width:520px">Your records live in this browser and go nowhere else. '
      + 'Back it up now and then from Tools → My Data.</div>'
      + '</div>'
      + '<div class="panel p4 col-sm">'
      + '<div class="eyebrow">Or just look around</div>'
      + '<div class="row" style="gap:6px">'
      + '<button class="chip brass" data-act="go" data-tab="families">The '+Object.keys(FAMILIES).length+' families</button>'
      + '<button class="chip" data-act="go" data-tab="library">The library</button>'
      + '<button class="chip" data-act="go" data-tab="service">Behind the stick</button>'
      + '<button class="chip" data-act="go" data-tab="practice">The drills</button>'
      + '<button class="chip" data-search="1">Search anything</button></div>'
      + '<div class="tiny dim mt1">Press <span class="font-tix brass2">/</span> anywhere to search all '
      + ((SEARCH_INDEX || (SEARCH_INDEX = buildSearchIndex())).length)+' entries.</div>'
      + '</div>'
      + TILE_BANDS.map(function(b){ return band(b[0], b[1],
          (b[0]==='Learn' ? firstPath : '') + tileGrid(b[2])); }).join('')
      + '</div>';
  }
  return '<div class="col">'
    + band('Today', 'The whole routine, about ten minutes', sessionPanelHTML())
    + TILE_BANDS.map(function(b){ return band(b[0], b[1],
        (b[0]==='Learn' ? firstPath : '') + tileGrid(b[2])); }).join('')
    + '<section class="oot-sec"><div class="oot-sec-head"><h3>Record</h3><span>What you have done, and where it lives</span></div>'
    + '<div class="panel p5"><div class="eyebrow mb2">Your standing at the bar</div>'
    + '<div class="stat-grid">'
    + '<div><div class="stat-num">'+mastered+'<span class="small dim">/'+totalCards+'</span></div><div class="tiny dim mt1">mastered, including self-graded cards</div></div>'
    + '<div><div class="stat-num">'+studied+'</div><div class="tiny dim mt1">cards drilled</div></div>'
    + '<div><div class="stat-num"'+(overdue?' style="color:var(--oxblood-text)"':'')+'>'+overdue+'</div><div class="tiny dim mt1">reviews overdue</div></div>'
    + '</div>'
    + '<div class="eyebrow mt3 mb2">Mastery by family</div>'
    + '<div class="col-sm" style="gap:6px">'+famBars+'</div>'
    + (weakest ? '<div class="eyebrow mt3 mb1">Where you are weakest</div>'
        + '<div class="small dim lh mb2">The five cards costing you the most. Tap one to drill just these.</div>'
        + '<div class="row" style="gap:6px">'+weakest+'</div>' : '')
    + '</div>'
    + dashboardHTML()
    + '<div class="panel p5">'
    + '<div class="eyebrow mt3 mb2">In the ledger</div>'
    + '<div class="row" style="gap:6px">'
    + '<span class="chip">'+COCKTAILS.length+' cocktails</span>'
    + '<span class="chip">'+SHOTS.length+' shots</span>'
    + '<span class="chip">'+NA_DRINKS.length+' zero-proof</span>'
    + '<span class="chip">'+PREPS.length+' prep sheets</span>'
    + '<span class="chip">'+PRODUCERS.length+' producers</span>'
    + '<span class="chip">'+FLIGHTS.length+' tasting flights</span>'
    + '<span class="chip">'+SERVICE_STUDY.reduce((n,x)=>n+x.rows.length,0)+' service lessons</span>'
    + '<span class="chip">'+KNOWLEDGE.length+' quiz questions</span></div>'
    + (tastings ? '<div class="tiny dim mt2">'+tastings+' tasting note'+(tastings===1?'':'s')+' logged'
        + (drillLogs ? ' · '+drillLogs+' practice result'+(drillLogs===1?'':'s')+' recorded' : '')+'</div>'
        : '<div class="tiny dim mt2">No tasting notes yet; the Practice tab has scorecards and twelve guided flights.</div>')
    + '</div>'
    + '<div class="panel p5"><div class="eyebrow mb2">The four pillars</div><div class="small dim lh">'
    + '<span style="color:var(--cream)">Craft</span> from the Bar-Tender\'s Guide of 1862: precision and pride in execution. '
    + '<span style="color:var(--cream)">Structure</span> from The Joy of Mixology (2003): learn the template, know a hundred drinks. '
    + '<span style="color:var(--cream)">Ingredients &amp; theater</span> from the Rainbow Room revival: fresh juice and the flamed peel. '
    + '<span style="color:var(--cream)">Hospitality</span> from PDT and the speakeasy era: the drink is only half the job.'
    + '</div></div>'
    + '</section></div>';
}


/* ---------------- FAMILIES ---------------- */
function renderFamilies(){
  const intro = '<div class="small dim lh" style="padding:0 4px">The great insight of the modern bar: nearly every cocktail is a variation on a handful of templates. Learn the skeleton and you can reconstruct any drink from memory.</div>';
  const rows = Object.entries(FAMILIES).map(([name,f]) => {
    const isOpen = state.famOpen === name;
    const members = COCKTAILS.filter(c => c.family === name);
    const chips = members.map(m => '<button class="chip" data-act="fam-goto" data-fam="'+esc(name)+'">'+esc(m.name)+'</button>').join(' ');
    const body = isOpen ? '<div class="accordion-body">'
      + '<div class="small dim lh">'+esc(f.lesson)+'</div>'
      + familyMarksHTML(name, 'How to tell it went right')
      + '<div class="eyebrow">Parent drink: '+esc(f.parent)+' · '+members.length+' in the ledger</div>'
      + '<div class="row">'+chips+'</div>'
      + '<div class="row">'+categoryVideoHTML(name,'family')+'</div></div>' : '';
    return '<div class="panel" style="padding:0 16px">'
      + '<button class="accordion-btn'+(isOpen?' open':'')+'" aria-expanded="'+(isOpen?'true':'false')+'" data-act="fam-open" data-fam="'+esc(name)+'">'
      + '<span>'+esc(name)+' <span class="font-tix tiny" style="color:var(--brass); margin-left:6px">'+esc(f.formula)+'</span></span>'
      + '<span style="color:var(--brass)">'+(isOpen?'−':'+')+'</span></button>' + body + '</div>';
  }).join('');
  return '<div class="col-sm">'+intro+rows+'</div>';
}

/* ---------------- LIBRARY ---------------- */
function libList(){
  const {q,fam,tier} = state.lib;
  const sorted = COCKTAILS.map((c,i)=>({c,i})).sort((a,b) =>
    a.c.tier===b.c.tier ? a.c.name.localeCompare(b.c.name) : a.c.tier-b.c.tier);
  return sorted.filter(({c}) => {
    if(fam!=='All' && c.family!==fam) return false;
    if(tier!=='All' && c.tier!==Number(tier)) return false;
    if(q && !(c.name+' '+c.spirit+' '+c.family+' '+c.spec.join(' ')+' '+c.method+' '+c.glass+' '+c.garnish+' '+(c.note||'')).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
}
function libListHTML(){
  const list = libList();
  if(!list.length) return '<div class="panel p5 tc small dim">Nothing on the ledger matches. Clear a filter or try another ingredient.</div>';
  return list.map(({c,i}) => {
    const isOpen = state.lib.open === i;
    const story = LORE[c.name]
      ? '<details class="story"><summary><span class="story-orn">❦</span> The Story</summary><div class="story-body">'+esc(LORE[c.name])+'</div></details>' : '';
    const tip = BALANCE_TIPS[c.family] ? '<div class="tiny dim lh" style="max-width:400px"><span class="brass2 bold">Balance notes · </span>'+esc(BALANCE_TIPS[c.family])+'</div>' : '';
    const vd = { src:'Cocktails', name:c.name, group:c.family, tier:c.tier };
    /* The standard sits between the ticket and the lore: first what to make,
       then how to tell you made it, then why it matters. */
    const body = isOpen ? '<div class="drink-body">'+ticketHTML(c)
      + familyMarksHTML(c.family, 'Judged as a '+c.family+': how to tell it went right')
      + story+tip+videoRowHTML(vd)+'</div>' : '';
    return '<div class="panel"><button class="drink-head" aria-expanded="'+(isOpen?'true':'false')+'" data-act="lib-toggle" data-i="'+i+'"'+(isOpen?' data-open="1"':'')+'>'
      + glassIcon(c.glass)
      + '<span class="bold">'+esc(c.name)+'</span>'
      + '<span class="chip">'+esc(c.spirit)+'</span>'
      + '<span class="chip brass">'+esc(c.family)+'</span>'
      + '<span class="chip">Tier '+c.tier+'</span>'
      + '<span class="plusminus">'+(isOpen?'−':'+')+'</span></button>'+body+'</div>';
  }).join('');
}
function renderLibrary(){
  if(state.lib.print){
    const list = libList();
    return '<div id="print-sheet">'
      + '<div class="print-bar panel p4 row between" style="grid-column:1/-1">'
      + '<span class="small dim">'+list.length+' spec card'+(list.length===1?'':'s')+': ready for paper. Landscape fits more; portrait reads bigger.</span>'
      + '<span class="row"><button class="btn btn-brass" data-act="lib-print-go">Print</button>'
      + '<button class="btn btn-ghost" data-act="lib-print-close">← Back to the library</button></span></div>'
      + list.map(({c}) => ticketHTML(c)).join('')
      + '</div>';
  }
  const fams = ['All', ...Object.keys(FAMILIES)];
  const famChips = fams.map(f => '<button class="chip'+(state.lib.fam===f?' on':'')+'" aria-pressed="'+(state.lib.fam===f?'true':'false')+'" data-act="lib-fam" data-fam="'+esc(f)+'">'+esc(f)+'</button>').join(' ');
  const tierSel = '<select class="input" id="lib-tier" aria-label="Filter by tier" style="max-width:340px;flex:1">'+tierOptions(state.lib.tier)+'</select>';
  return '<div class="col">'
    + '<input class="input" id="lib-search" aria-label="Search the library" placeholder="Search by name, spirit, or ingredient…" value="'+esc(state.lib.q)+'">'
    + '<div class="row">'+famChips+'</div>'
    + '<div class="row">'+tierSel
    + '<button class="chip" data-act="lib-print" title="Print the currently filtered specs as ticket cards">🖶 Print cards</button>'
    + '<span class="tiny dim push" id="lib-count">'+libList().length+' drinks</span></div>'
    + '<div class="col-sm" id="lib-list">'+libListHTML()+'</div></div>';
}

/* ---------------- FLASHCARDS ---------------- */
/* ---- unified deck: cocktails + shots + zero-proof all drillable ---- */
/* THIS ARRAY IS A SET OF PRIMARY KEYS, not a set of labels.

   cardKey() returns src + ' · ' + name, so the string 'My Bar' is baked
   into every SRS record, every rail entry and every mastery row a bartender
   has ever earned, and into every backup file ever exported. It is also a
   filter value in six engines. Renaming it would either strand every existing
   record or make the orphan sweep in dataImport blind to keys arriving from an
   older backup, and both failures are silent.

   So the tab is called Menu and the key is still 'My Bar'. srcLabel() is the
   join between them: route it through every site that PRINTS a source, and
   leave the literal at every site that COMPARES one. If you are about to grep
   for 'My Bar' and change what you find, that is the distinction to make on
   each hit.

   The label lives here rather than in the view because five files print it. */
const DECK_SOURCES = ['Cocktails','My Bar','Shots','Zero Proof'];
const SRC_LABEL = { 'My Bar': 'Menu' };
function srcLabel(s){ return SRC_LABEL[s] || s; }
/* the venue's own list earns its chips only once something is on it: an empty
   source is zero noise everywhere it would appear */
function deckSources(){ return DECK_SOURCES.filter(s => s !== 'My Bar' || (progress.bar||[]).length); }
function allDrinks(){
  if(allDrinks._c) return allDrinks._c;
  const out = [];
  COCKTAILS.forEach(function(c){
    out.push({ src:'Cocktails', name:c.name, spec:c.spec, method:c.method, glass:c.glass,
      garnish:c.garnish, note:c.note, group:c.family, spirit:c.spirit, tier:c.tier, ref:c });
  });
  (progress.bar||[]).forEach(function(b){
    out.push({ src:'My Bar', name:b.name, spec:b.spec, method:b.method, glass:b.glass,
      garnish:b.garnish, note:b.note, group:b.family, spirit:b.spirit, tier:null, ref:b });
  });
  SHOTS.forEach(function(s){
    out.push({ src:'Shots', name:s.name, spec:s.spec, method:s.method, glass:'Shot glass',
      garnish:'-', note:s.note, group:s.cat, spirit:'-', tier:null, ref:s });
  });
  NA_DRINKS.forEach(function(d){
    out.push({ src:'Zero Proof', name:d.name, spec:d.spec, method:d.method, glass:d.glass,
      garnish:d.garnish, note:d.why, group:d.cat, spirit:'Spirit-free', tier:null, ref:d });
  });
  allDrinks._c = out;
  return out;
}
function cardKey(d){ return d.src==='Cocktails' ? d.name : d.src+' · '+d.name; }
function cardTicket(d, hideName){
  if(d.src==='Cocktails' || d.src==='My Bar') return ticketHTML(d.ref, hideName);
  if(d.src==='Shots') return shotTicketHTML(d.ref, hideName);
  return naTicketHTML(d.ref, hideName);
}
function groupsFor(src){
  if(src==='Cocktails') return Object.keys(FAMILIES);
  if(src==='My Bar') return [...new Set((progress.bar||[]).map(b => b.family).filter(Boolean))];
  if(src==='Shots') return SHOT_CATS;
  if(src==='Zero Proof') return NA_CATS;
  return [];
}

/* Mastery has to be able to lapse. Without the recency term a card answered
   three times in week one reads "mastered" forever, and the home screen ends
   up reporting 100% while hundreds of cards sit silently overdue. */
/* Collapse the free-text glass and method prose into the handful of categories
   the question actually asks about, so grading matches the prompt. */
function svcGlassKey(g){
  const s = String(g || '').toLowerCase();
  if(/coupe|nick/.test(s)) return 'Coupe or Nick & Nora';
  if(/martini|cocktail glass/.test(s)) return 'Martini glass';
  if(/flute/.test(s)) return 'Flute';
  if(/wine|goblet|balloon|copa/.test(s)) return 'Wine glass';
  if(/hurricane|tiki|pearl diver|footed/.test(s)) return 'Tiki or hurricane';
  if(/mug|copper|toddy|irish coffee/.test(s)) return 'Mug';
  if(/julep|tin cup/.test(s)) return 'Julep tin';
  if(/shot|shooter|cordial/.test(s)) return 'Shot glass';
  if(/collins|highball|tall|pint|pilsner|zombie/.test(s)) return 'Collins or highball';
  if(/rocks|old.fashioned|double|lowball/.test(s)) return 'Rocks glass';
  return 'Other';
}
function svcMethodKey(m){
  const s = String(m || '').toLowerCase();
  if(/dry shake/.test(s)) return 'Dry shake, then shake';
  /* "Stir the marmalade loose FIRST, then shake" is a shaken drink. The
     anchored stir only wins when no sequential shake follows it. */
  if(/^\s*stir\b/.test(s) && !/then shake|and shake/.test(s)) return 'Stirred';
  if(/blend/.test(s)) return 'Blended';
  if(/swizzle/.test(s)) return 'Swizzled';
  if(/roll/.test(s)) return 'Rolled';
  if(/muddle/.test(s)) return 'Muddled, then built';
  if(/shake/.test(s)) return 'Shaken';
  if(/build|layer|float/.test(s)) return 'Built in the glass';
  return 'Other';
}

function isMastered(name){
  const s = progress.cards[name];
  if(!(s && s.r>=3 && s.r>s.w)) return false;
  return s.due === undefined || s.due > Date.now();
}
/* lapses weigh in, mirroring the home screen's weakness list: a card that
   keeps collapsing accumulates r on every relearn cycle and w*2-r alone
   buries exactly the cards this ordering exists to surface */
function weakScore(name){ const s=progress.cards[name]; return s ? (s.w*2 + (s.lapses||0)*1.5 - s.r + Math.random()*0.5) : (1 + Math.random()*0.5); }
function fcPool(){
  const f = state.fc;
  return allDrinks().filter(function(d){
    if(f.src!=='All' && d.src!==f.src) return false;
    if(f.tier!=='All'){ if(d.src!=='Cocktails' || d.tier!==Number(f.tier)) return false; }
    if(f.family!=='All' && d.group!==f.family) return false;
    if(f.spirit!=='All'){ if(d.src!=='Cocktails' || d.spirit!==f.spirit) return false; }
    const key = cardKey(d);
    if(f.special==='unmastered' && isMastered(key)) return false;
    if(f.special==='trouble'){ const s=progress.cards[key]; if(!(s && s.w>0 && (s.w >= s.r*0.5 || (s.lapses||0) >= 2))) return false; }
    if(f.special==='due'){ const s=progress.cards[key]; if(!(s && s.due !== undefined && s.due <= Date.now())) return false; }
    return true;
  });
}
/* Take AT MOST ONE line per donor, and try the drink's own family first.
   Pushing every line of one donor meant five decoys came from ~1.8 drinks, so
   the task became "spot the foreign spec" instead of discriminating between the
   neighbours a learner actually confuses (Manhattan / Rob Roy / Boulevardier). */
function decoyLines(c, n){
  const out = [];
  const all = allDrinks();
  const same = all.filter(x => x.src === c.src);
  const base = (same.length > 6 ? same : all).filter(x => x.name !== c.name);
  const kin = base.filter(x => x.group && c.group && x.group === c.group);
  const donors = shuffle(kin).concat(shuffle(base.filter(x => kin.indexOf(x) < 0)));
  donors.forEach(function(x){
    if(out.length >= n) return;
    /* No optional-tagged donors: Assemble-the-Ticket's own copy says
       "optional lines are up to you", and a foreign "(optional)" decoy
       failed the build for including something it had just called free. */
    const usable = x.spec.filter(l => !/optional/i.test(l) && !c.spec.includes(l) && out.indexOf(l) < 0);
    if(usable.length) out.push(usable[Math.floor(Math.random()*usable.length)]);
  });
  return out.slice(0, n);
}
function prepCard(){
  const fc=state.fc;
  if(fc.idx >= fc.deck.length) return;
  const c=fc.deck[fc.idx];
  fc.flipped=false; fc.checked=false; fc.picked=null; fc.lastOk=null;
  if(fc.mode==='build'){
    const decoys = decoyLines(c, Math.min(5, 3 + Math.floor(Math.random()*3)));
    /* a line marked optional is defensible either way: building a Martini
       without the orange bitters is not a miss */
    fc.pool = shuffle([...c.spec.map(l=>({l,ok:true,opt:/optional/i.test(l)})), ...decoys.map(l=>({l,ok:false}))]);
    fc.sel = [];
  }
  if(fc.mode==='cloze'){
    fc.clozeIdx = Math.floor(Math.random()*c.spec.length);
    const ans = c.spec[fc.clozeIdx];
    /* the blanked line's own role and unit shouldn't give it away: a decoy in
       ounces against a "2 dashes" answer is answerable without knowing the drink */
    const role = classifyLine(ans);
    const unit = (ans.match(/\b(oz|dash|dashes|drops?|barspoon|part|leaves|sprig|cube|splash|top)\b/i)||[''])[0].toLowerCase();
    const wide = decoyLines(c, 40).filter(l => l !== ans);
    let picked = wide.filter(l => classifyLine(l) === role
      && (!unit || new RegExp('\\b'+unit.replace(/es$/,'(es)?')+'\\b','i').test(l)));
    if(picked.length < 3) picked = wide.filter(l => classifyLine(l) === role);
    if(picked.length < 3) picked = wide;
    fc.opts = shuffle([ans, ...sample(picked, 3)]);
  }
  if(fc.mode==='service'){
    const pool = allDrinks();
    /* Grade the CATEGORY, not the prose. There are ~100 distinct glass strings
       and ~260 method strings across the deck, so sampling raw text offered
       "Coupe" against a correct answer of "Coupe or Nick & Nora" and scored it
       a miss, which then went into the scheduler as a lapse. */
    const fields = ['glass','garnish','method']
      .filter(f => c[f] && c[f] !== '-' && !(f==='glass' && c.src==='Shots'));
    /* A menu drink saved as name+spec only has nothing to ask here; a
       zero-question card would render an instant 'Not clean.' and record
       nothing. Skip it: the deck end check above is the recursion floor. */
    if(!fields.length){ fc.idx++; return prepCard(); }
    const opts = {}, keyed = {};
    fields.forEach(f => {
      if(f === 'garnish'){                       /* free text: no clean categories */
        const others = [...new Set(pool.map(x => x[f]).filter(v => v && v !== '-' && v !== c[f]))];
        opts[f] = shuffle([c[f], ...sample(others, 3)]);
        keyed[f] = null;
        return;
      }
      const keyOf = f === 'glass' ? svcGlassKey : svcMethodKey;
      const mine = keyOf(c[f]);
      const others = [...new Set(pool.map(x => x[f]).filter(Boolean).map(keyOf))].filter(k => k !== mine);
      opts[f] = shuffle([mine, ...sample(others, 3)]);
      keyed[f] = keyOf;
    });
    fc.svc = { fields, opts, keyed, picked:{} };
  }
}
function recordCard(ok){
  const fc=state.fc; const name=cardKey(fc.deck[fc.idx]);
  const s=progress.cards[name]||{r:0,w:0};
  const rec={ ...s, r:s.r+(ok?1:0), w:s.w+(ok?0:1) };
  scheduleCard(rec, ok);
  progress.cards[name]=rec;
  saveProgress();
  if(ok) fc.right++; else { fc.wrong++; if(fc.missed.indexOf(name)<0) fc.missed.push(name); }
}
function clozeTicketHTML(c, hideIdx){
  const specLines = c.spec.map((l,i) => '<div class="spec-line"><span>·</span><span>'
    + (i===hideIdx ? '<span class="bold" style="letter-spacing:0.15em">- ? ? ? -</span>' : esc(l)) + '</span></div>').join('');
  const label = c.src==='Cocktails' ? "The Bartender's Ledger · Drink Ticket"
    : c.src==='Shots' ? esc(c.group)+' · Shot Call' : esc(c.group)+' · Zero Proof';
  return '<div class="ticket"><div class="ticket-inner">'
    + '<div class="tc"><div class="tix-label">'+label+'</div>'
    + '<div class="tix-name">'+esc(c.name.toUpperCase())+'</div></div>'
    + '<div class="tix-rule"></div>' + specLines + '<div class="tix-rule"></div>'
    + '<div><span class="tix-label">Method </span>'+esc(c.method)+'</div>'
    + (c.src!=='Shots' ? '<div><span class="tix-label">Glass </span>'+esc(c.glass)+'</div>'
       + '<div><span class="tix-label">Garnish </span>'+esc(c.garnish)+'</div>' : '')
    + '</div></div>';
}
const FC_MODES = [
  ['name2spec','Name → Spec','The order comes in. Recite the whole build out loud, then flip and grade yourself.'],
  ['spec2name','Spec → Name','Read a blind ticket and call the drink, the service-printer skill.'],
  ['build','Assemble the Ticket','An ingredient bank with decoys mixed in. Select every line that belongs in the spec.'],
  ['cloze','Fill the Missing Line','One line of the ticket is blanked. Pick the exact line that completes it.'],
  ['service','Service Details','Glass, garnish and method with no spec to lean on, the part the guest actually sees.'],
];

function renderFlashcards(){
  const fc = state.fc;

  /* -------- setup -------- */
  if(fc.stage==='setup'){
    const srcChips = ['All'].concat(deckSources()).map(function(s){
      const n = allDrinks().filter(function(d){ return s==='All' || d.src===s; }).length;
      return '<button class="chip'+(fc.src===s?' on':'')+'" aria-pressed="'+(fc.src===s?'true':'false')+'" data-act="fc-src" data-s="'+esc(s)+'">'+(s==='All'?'Everything':esc(srcLabel(s)))+' <span class="font-tix">'+n+'</span></button>';
    }).join(' ');
    const isCocktail = fc.src==='Cocktails' || fc.src==='All';
    const tierSel = isCocktail ? '<select class="input" id="fc-tier" aria-label="Filter by tier" style="max-width:380px">'+tierOptions(fc.tier)+'</select>' : '';
    const groupList = fc.src==='All' ? [].concat(Object.keys(FAMILIES), SHOT_CATS, NA_CATS) : groupsFor(fc.src);
    const groupLabel = fc.src==='Shots' ? 'All shot categories' : fc.src==='Zero Proof' ? 'All zero-proof families' : 'All families';
    const fams = ['All'].concat(groupList);
    const famOpts = fams.map(f => '<option value="'+esc(f)+'"'+(fc.family===f?' selected':'')+'>'+(f==='All'?groupLabel:esc(f))+'</option>').join('');
    const spirits = ['All'].concat([...new Set(COCKTAILS.map(c=>c.spirit))].sort());
    const spOpts = spirits.map(s => '<option value="'+esc(s)+'"'+(fc.spirit===s?' selected':'')+'>'+(s==='All'?'All spirits':esc(s))+'</option>').join('');
    /* due count respects the current src/tier/family/spirit filters,
       so the chip promises exactly what the deck will deal */
    const dueN = (function(){ const s = fc.special; fc.special = 'due'; const n = fcPool().length; fc.special = s; return n; })();
    const specials = [['All','Full deck'],['unmastered','Unmastered only'],['trouble','Trouble cards'],['due','Due for review'+(dueN?' · '+dueN:'')]]
      .map(([k,l]) => '<button class="chip'+(fc.special===k?' on':'')+'" aria-pressed="'+(fc.special===k?'true':'false')+'" data-act="fc-special" data-s="'+k+'">'+l+'</button>').join(' ');
    const pool = fcPool();
    const masteredIn = pool.filter(function(d){ return isMastered(cardKey(d)); }).length;
    const modeBtns = FC_MODES.map(([m,t,d],i) =>
      '<button class="btn '+(i===0?'btn-brass':'btn-ghost')+'" data-act="fc-start" data-mode="'+m+'" style="text-align:left"'+(pool.length?'':' disabled')+'>'
      + '<span class="bold">'+t+'</span><br><span class="tiny'+(i===0?'':' dim')+'" style="font-weight:400">'+d+'</span></button>').join('');
    return '<div class="col">'
      + '<div class="panel p5 col" style="gap:14px">'
      + '<div class="eyebrow">Build your deck</div>'
      + '<div class="row">'+srcChips+'</div>'
      + (tierSel ? '<div class="row">'+tierSel+'</div>' : '')
      + '<div class="row" style="gap:10px"><select class="input" id="fc-family" aria-label="Filter by '+(fc.src==='Shots'?'shot category':fc.src==='Zero Proof'?'zero-proof family':'family')+'" style="flex:1;min-width:150px">'+famOpts+'</select>'
      + (isCocktail ? '<select class="input" id="fc-spirit" aria-label="Filter by base spirit" style="flex:1;min-width:150px">'+spOpts+'</select>' : '')+'</div>'
      + '<div class="row">'+specials
      + '<button class="chip'+(fc.smart?' on':'')+'" aria-pressed="'+(fc.smart?'true':'false')+'" data-act="fc-smart" title="Orders the deck so your weakest and unseen cards come first">'+(fc.smart?'✓ ':'')+'Weakest first</button></div>'
      + '<div class="tiny dim">'+pool.length+' cards in this deck · '+masteredIn+' already mastered'+(pool.length? '' : ': loosen a filter to deal')+'</div>'
      + '<div class="eyebrow" style="margin-top:4px">Choose your drill</div>'
      + '<div class="col-sm">'+modeBtns+'</div>'
      + '</div>'
      + '<div class="row center"><button class="btn btn-ghost" data-act="fc-board">Mastery board →</button></div>'
      + '<div class="tiny dim lh" style="padding:0 4px">Every drink in the ledger is drillable: all '+COCKTAILS.length+' cocktails, '+SHOTS.length+' shots, '+((progress.bar||[]).length ? NA_DRINKS.length+' zero-proof drinks, and your '+progress.bar.length+' menu drink'+(progress.bar.length===1?'':'s') : 'and '+NA_DRINKS.length+' zero-proof drinks')+', '+allDrinks().length+' cards in total. Path to mastery: run <span class="brass2">Name \u2192 Spec</span> until clean, prove it in <span class="brass2">Assemble the Ticket</span>, then keep <span class="brass2">Trouble cards</span> + <span class="brass2">Weakest first</span> in rotation. Three honest wins with a winning record masters a card.</div>'
      + '</div>';
  }

  /* -------- mastery board -------- */
  if(fc.stage==='board'){
    const all = allDrinks();
    const shown = all.map(function(d,i){ return {d:d,i:i}; })
      .filter(function(o){ return fc.boardSrc==='All' || o.d.src===fc.boardSrc; })
      .sort(function(a,b){ return a.d.name.localeCompare(b.d.name); });
    const srcChips = ['All'].concat(deckSources()).map(function(s){
      return '<button class="chip'+(fc.boardSrc===s?' on':'')+'" aria-pressed="'+(fc.boardSrc===s?'true':'false')+'" data-act="fc-board-src" data-s="'+esc(s)+'">'+(s==='All'?'All':esc(srcLabel(s)))+'</button>';
    }).join(' ');
    const rows = shown.map(function(o){
      const key = cardKey(o.d);
      const s = progress.cards[key];
      const open = fc.boardOpen===o.i;
      const rec = s ? '<span class="font-tix tiny" style="color:#7fbf95">✓'+s.r+'</span> <span class="font-tix tiny" style="color:var(--oxblood-text)">✗'+s.w+'</span>' : '<span class="tiny dim">unseen</span>';
      const badge = isMastered(key) ? '<span class="chip brass">Mastered</span>' : '';
      const srcChip = o.d.src==='Cocktails' ? '' : '<span class="chip">'+esc(o.d.src)+'</span>';
      return '<div class="panel"><button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="fc-board-open" data-i="'+o.i+'">'
        + '<span class="bold">'+esc(o.d.name)+'</span>'+srcChip+badge+'<span class="push">'+rec+'</span>'
        + '<span class="plusminus">'+(open?'−':'+')+'</span></button>'
        + (open ? '<div class="drink-body">'+cardTicket(o.d)+videoRowHTML(o.d)+'</div>' : '') + '</div>';
    }).join('');
    const mastered = shown.filter(function(o){ return isMastered(cardKey(o.d)); }).length;
    return '<div class="col-sm">'
      + '<div class="row between"><button class="btn btn-ghost" data-act="fc-quit">← Back to decks</button>'
      + '<span class="tiny dim">'+mastered+' of '+shown.length+' mastered</span>'
      + '<button class="chip" data-act="fc-reset">Reset records</button></div>'
      + '<div class="row">'+srcChips+'</div>'
      + rows + '</div>';
  }

  /* -------- end of deck -------- */
  if(fc.idx >= fc.deck.length){
    const total = Math.max(1, fc.right+fc.wrong);
    const pct = Math.round(fc.right/total*100);
    const verdict = pct>=90 ? 'Rainbow Room ready.' : pct>=70 ? 'Solid shift. Run the misses again.' : 'Back to the well: repetition is the whole trick.';
    const missList = fc.missed.length
      ? '<div class="tix-rule"></div><div class="tix-label">Missed</div>' + fc.missed.map(function(n){ return '<div>· '+esc(n)+'</div>'; }).join('')
      : '';
    return '<div class="col" style="align-items:center">'
      + '<div class="ticket"><div class="ticket-inner tc">'
      + '<div class="tix-label">End of round</div><div class="tix-name">DECK COMPLETE</div>'
      + '<div class="tix-rule"></div><div>Called correctly: '+fc.right+'</div><div>Missed: '+fc.wrong+'</div>'
      + '<div class="bold mt1">'+pct+'% clean</div>'
      + missList
      + '<div class="tix-rule"></div><div class="tix-note tiny">'+verdict+'</div></div></div>'
      + '<div class="row center">'
      + (state.sess && state.sess.active && state.sess.step==='cards'
        ? (fc.missed.length ? '<button class="btn btn-ox" data-act="fc-rerun-miss">Drill the misses ('+fc.missed.length+')</button>' : '')
          + '<button class="btn btn-brass" data-act="sess-quiz">Next: the quiz round →</button>'
          + '<button class="btn btn-ghost" data-act="sess-end">End the session</button>'
        : (fc.missed.length ? '<button class="btn btn-ox" data-act="fc-rerun-miss">Drill the misses ('+fc.missed.length+')</button>' : '')
          + '<button class="btn btn-brass" data-act="fc-start" data-mode="'+fc.mode+'">Run it again</button>'
          + '<button class="btn btn-ghost" data-act="fc-quit">Change deck</button>')
      + '</div></div>';
  }

  /* -------- running -------- */
  const c = fc.deck[fc.idx];
  const head = '<div class="row between tiny dim"><span>Card '+(fc.idx+1)+' of '+fc.deck.length+'</span>'
    + '<span>✓ '+fc.right+' &nbsp; ✗ '+fc.wrong+'</span>'
    + '<button class="chip" data-act="fc-quit">Quit deck</button></div>';

  if(fc.mode==='name2spec' || fc.mode==='spec2name'){
    if(!fc.flipped){
      const face = fc.mode==='name2spec'
        ? '<div class="eyebrow">The order comes in:</div><div class="font-display" style="font-size:1.5rem;color:var(--brass-2)">'+esc(c.name)+'</div><div class="small dim">Say the spec, method, glass, and garnish out loud.</div>'
        : '<div class="eyebrow">Read the ticket. Call the drink.</div>'+cardTicket(c,true);
      return '<div class="col">'+head+'<div class="panel p5 col tc" style="align-items:center">'+face
        + '<button class="btn btn-brass" data-act="fc-flip">Flip the card</button></div></div>';
    }
    const back = fc.mode==='name2spec'
      ? cardTicket(c)
      : '<div class="font-display tc" style="font-size:1.5rem;color:var(--brass-2)">'+esc(c.name)+'</div>';
    const foot = (c.src==='Cocktails' && typeof loreFootnote==='function' && loreFootnote(c))
      ? '<div class="tiny dim italic tc lh" style="max-width:400px">❦ '+esc(loreFootnote(c))+'</div>' : '';
    return '<div class="col">'+head+'<div class="panel p5 col" style="align-items:center">'+back+foot+videoRowHTML(c)
      + '<div class="row center"><button class="btn btn-brass" data-act="fc-grade" data-ok="1">Nailed it</button>'
      + '<button class="btn btn-ox" data-act="fc-grade" data-ok="0">Missed it</button></div></div></div>';
  }

  if(fc.mode==='build'){
    const lines = fc.pool.map((p,i) => {
      let cls='opt-btn'; const selected=fc.sel.includes(i);
      if(!fc.checked){ if(selected) cls+=' picked'; }
      else {
        if(p.ok && selected) cls+=' correct';
        else if(!p.ok && selected) cls+=' wrong';
        else if(p.ok && !selected) cls+=' missedline';
      }
      const tag = fc.checked && p.ok && !selected ? ' <span class="tiny">(belongs in the spec)</span>' : '';
      /* the quiz's own ✓/✗-plus-sr pattern: the verdict was border colour
         alone here, invisible to assistive tech and to anyone colour-blind */
      let mark = '', sr = '';
      if(fc.checked && selected && p.ok){ mark='<span aria-hidden="true" class="opt-mark">✓</span> '; sr='<span class="sr-only">Correct, kept: </span>'; }
      else if(fc.checked && selected && !p.ok){ mark='<span aria-hidden="true" class="opt-mark">✗</span> '; sr='<span class="sr-only">Decoy you picked: </span>'; }
      return '<button class="'+cls+' font-tix" data-act="fc-toggle-line" data-i="'+i+'" aria-pressed="'+(selected?'true':'false')+'"'+(fc.checked?' disabled':'')+'>'+mark+sr+esc(p.l)+tag+'</button>';
    }).join('');
    const after = fc.checked
      ? '<div class="explain"><span class="brass2 bold">'+(fc.lastOk?'Clean build. ':'Not quite. ')+'</span>'
        + esc(c.method)+' · '+esc(c.glass)+' · '+esc(c.garnish)+'.'+(c.note?' '+esc(c.note):'')+'</div>'
        + videoRowHTML(c)
        + '<button class="btn btn-brass self-end" data-act="fc-next">Next card</button>'
      : '<button class="btn btn-brass self-end" data-act="fc-check"'+(fc.sel.length?'':' disabled')+'>Check the build</button>';
    return '<div class="col">'+head+'<div class="panel p5 col">'
      + '<div><div class="eyebrow mb1">Assemble the ticket</div>'
      + '<div class="bold">Select every line that belongs in a <span class="brass2">'+esc(c.name)+'</span>.</div>'
      + '<div class="tiny dim mt1">Select every line that belongs: the count is part of the question. Optional lines are up to you.</div></div>'
      + '<div class="col-sm">'+lines+'</div>'+after+'</div></div>';
  }

  if(fc.mode==='cloze'){
    const answered = fc.picked !== null;
    const opts = fc.opts.map((o,i) => {
      let cls='opt-btn font-tix';
      let mark='', sr='';
      if(answered && o===c.spec[fc.clozeIdx]){ cls+=' correct'; mark='<span aria-hidden="true" class="opt-mark">✓</span> '; sr='<span class="sr-only">Correct answer: </span>'; }
      else if(answered && i===fc.picked){ cls+=' wrong'; mark='<span aria-hidden="true" class="opt-mark">✗</span> '; sr='<span class="sr-only">Your answer, incorrect: </span>'; }
      return '<button class="'+cls+'" data-act="fc-cloze-pick" data-i="'+i+'"'+(answered?' disabled':'')+'>'+mark+sr+esc(o)+'</button>';
    }).join('');
    const after = answered
      ? '<div class="explain"><span class="brass2 bold">'+(fc.lastOk?'Correct. ':'Not quite. ')+'</span>The missing line is "'+esc(c.spec[fc.clozeIdx])+'".'+(c.note?' '+esc(c.note):'')+'</div>'
        + videoRowHTML(c)
        + '<button class="btn btn-brass self-end" data-act="fc-next">Next card</button>'
      : '';
    return '<div class="col">'+head+'<div class="panel p5 col" style="align-items:stretch">'
      + '<div class="eyebrow">Fill the missing line</div>'
      + '<div style="align-self:center">'+clozeTicketHTML(c, fc.clozeIdx)+'</div>'
      + '<div class="col-sm">'+opts+'</div>'+after+'</div></div>';
  }

  if(fc.mode==='service'){
    const s = fc.svc || { fields:[], opts:{}, picked:{} };
    const allPicked = s.fields.every(f => s.picked[f] !== undefined);
    const blocks = s.fields.map(f => {
      const label = f==='glass' ? 'Which glass?' : f==='garnish' ? 'What garnish?' : 'Shaken, stirred, or built?';
      const right = s.keyed && s.keyed[f] ? s.keyed[f](c[f]) : c[f];
      const rows = s.opts[f].map((o,i) => {
        let cls = 'opt-btn';
        let mark = '', sr = '';
        if(allPicked){
          if(o === right){ cls += ' correct'; mark='<span aria-hidden="true" class="opt-mark">✓</span> '; sr='<span class="sr-only">Correct answer: </span>'; }
          else if(s.picked[f] === i){ cls += ' wrong'; mark='<span aria-hidden="true" class="opt-mark">✗</span> '; sr='<span class="sr-only">Your answer, incorrect: </span>'; }
        } else if(s.picked[f] === i) cls += ' picked';
        return '<button class="'+cls+'" data-act="fc-svc-pick" data-f="'+f+'" data-i="'+i+'" aria-pressed="'+(s.picked[f]===i?'true':'false')+'"'
          + (allPicked?' disabled':'')+'>'+mark+sr+esc(o)+'</button>';
      }).join('');
      return '<div><div class="eyebrow mb1">'+label+'</div><div class="col-sm">'+rows+'</div></div>';
    }).join('');
    const after = allPicked
      ? '<div class="explain"><span class="brass2 bold">'+(fc.lastOk?'All three. ':'Not clean. ')+'</span>'
        + s.fields.map(f => '<span class="brass2">'+f+':</span> '+esc(c[f])).join(' · ')+'</div>'
        + videoRowHTML(c)
        + '<button class="btn btn-brass self-end" data-act="fc-next">Next card</button>'
      : '';
    return '<div class="col">'+head+'<div class="panel p5 col" style="align-items:stretch">'
      + '<div class="eyebrow">Service details</div>'
      + '<div class="font-display tc" style="font-size:1.4rem;color:var(--brass-2)">'+esc(c.name)+'</div>'
      + '<div class="tiny dim tc">Nobody on a trail shift asks what is in it. They watch which glass you reach for.</div>'
      + blocks + after + '</div></div>';
  }
  return '';
}

/* ---------------- QUIZ ---------------- */
/* ---- quiz rounds: mixed, or a single domain drilled deliberately ---- */
const QUIZ_MODES = [
  ['mixed','Mixed round','Families, blind tickets and bar knowledge, the shape of a shift.'],
  ['mybar','Menu','Your own list: name, glass and spec, straight off the menu.'],
  ['service','Service & law','Guests, pacing, refusal, the register and the legal floor.'],
  ['beerwine','Beer & wine','Draught, bottle, varietal and glassware, the high-volume half.'],
  ['craft','Spirits & craft','Technique, production, ingredients and the balance behind the specs.'],
  ['tickets','Blind tickets','Ten blind tickets. Read the spec, call the drink.'],
  ['dealer','Dealer\'s choice','A guest who knows what they like but not what it\'s called. Read the ask, make the call.'],
];

/* ---- DEALER'S CHOICE: constraints-to-drink, computed from the live data ----
   The most common real interaction is not "make a Boulevardier", it is
   "something with mezcal, not too sweet." Every axis here is derived from the
   spec by the same engines the Tools tab uses (estimateABV, balanceOf,
   strengthBand), so the answer key can never drift from the book, the same
   emitted-and-gated discipline the copy counts follow. */
function dealerAxes(c){
  const e = estimateABV(c, 25);
  if(!e) return null;   /* parts/counts specs have no computable strength */
  const bal = balanceOf(c);
  /* liqueur/aperitivo bases: balanceOf promotes the sweet base into strong,
     so the remaining sweet column understates the drink: a Midori Sour is
     not 'on the dry side'. No lean claim where the base carries the sugar. */
  const lean = /liqueur|aperitivo|amaro|sparkling/i.test(c.spirit || '') ? null
    : Math.abs(bal.sweet - bal.sour) >= 0.25
    ? (bal.sweet > bal.sour ? 'sweet' : 'dry') : null;
  return { spirit: c.spirit, band: strengthBand(e.abvServed).key, lean: lean, fam: c.family, abv: e.abvServed, alcOz: e.alcOz };
}
let DEALER_POOL = null;
/* A drink with no computed alcohol (Lava Flow's colada base carries no
   volume, the zero-proof shelf) has no strength to ask for, and a drink whose
   spirit is "Any" (Clarified Milk Punch) would prompt "Something with any".
   Neither is dealt. tools/check-abv.mjs asserts this over the live canon. */
function dealerPool(){
  if(!DEALER_POOL) DEALER_POOL = COCKTAILS.map(c => ({ c: c, ax: dealerAxes(c) }))
    .filter(x => x.ax && x.ax.alcOz > 0 && x.c.spirit !== 'Any');
  return DEALER_POOL;
}
const DEALER_BAND_PHRASE = {
  'very strong':'strong enough to sip slow', 'spirit-forward':'spirit-forward',
  'moderate':'middling strength', 'sessionable':'easy-drinking', 'light':'light on the alcohol',
};
function qDealer(cands, used){
  const fresh = cands.filter(x => !used.has(x.c.name));
  const pick = sample(fresh.length ? fresh : cands, 1)[0];
  used.add(pick.c.name);
  const A = pick.ax;
  const axes = { spirit: A.spirit, band: A.band };
  if(A.lean) axes.lean = A.lean; else axes.fam = A.fam;
  const satisfies = ax => ax.spirit === axes.spirit && ax.band === axes.band
    && (axes.lean === undefined || ax.lean === axes.lean)
    && (axes.fam === undefined || ax.fam === axes.fam);
  const missCount = ax => (ax.spirit !== axes.spirit ? 1 : 0) + (ax.band !== axes.band ? 1 : 0)
    + (axes.lean !== undefined && ax.lean !== axes.lean ? 1 : 0)
    + (axes.fam !== undefined && ax.fam !== axes.fam ? 1 : 0);
  /* the hard invariant: no distractor may satisfy EVERY axis; a second
     valid answer is the failure mode, an imperfect near-miss is not */
  const others = cands.filter(x => x.c.name !== pick.c.name && !satisfies(x.ax));
  const oneOff = shuffle(others.filter(x => missCount(x.ax) === 1));
  const rest = shuffle(others.filter(x => missCount(x.ax) > 1));
  const distractors = oneOff.concat(rest).slice(0, 3);
  const bandPhrase = DEALER_BAND_PHRASE[axes.band] || axes.band;
  const leanPhrase = axes.lean === 'sweet' ? 'a touch sweet' : axes.lean === 'dry' ? 'on the dry side, not sweet' : null;
  const famPhrase = axes.fam ? 'built like ' + (/^[AEIOU]/.test(axes.fam) ? 'an ' : 'a ') + axes.fam : null;
  const prompt = 'Guest: “Something with ' + axes.spirit.toLowerCase() + ', ' + bandPhrase
    + (leanPhrase ? ', ' + leanPhrase : '') + (famPhrase ? ', ' + famPhrase.toLowerCase() : '') + '.” Your call?';
  const missWhy = x => x.ax.spirit !== axes.spirit ? 'wrong spirit (' + x.ax.spirit.toLowerCase() + ')'
    : x.ax.band !== axes.band ? (DEALER_BAND_PHRASE[x.ax.band] || x.ax.band) + ' where the guest asked ' + bandPhrase
    : (axes.lean !== undefined && x.ax.lean !== axes.lean) ? (x.ax.lean ? 'leans ' + x.ax.lean : 'leans neither way')
    : 'a different build (' + x.ax.fam + ')';
  const explain = pick.c.name + ' fits every ask: ' + axes.spirit.toLowerCase() + ', ' + bandPhrase
    + (leanPhrase ? ', ' + leanPhrase : '') + '. '
    + distractors.map(x => x.c.name + ': ' + missWhy(x) + '.').join(' ')
    + ' All computed from the specs: the sheet cannot drift from the book.';
  return { prompt: prompt, options: shuffle([pick.c.name].concat(distractors.map(x => x.c.name))), answer: pick.c.name, explain: explain };
}
/* legacy entries carry no topic; the authored SCENARIO ones are service
   questions and must land in the service pool, not default to craft */
const topicOf = (k) => k.topic || (/^\s*SCENARIO/i.test(k.q || '') ? 'service' : 'craft');
function knowledgeByTopic(t){
  const pool = KNOWLEDGE.filter(k => topicOf(k) === t);
  return pool.length ? pool : KNOWLEDGE;
}
/* options MUST be shuffled: 68 of the authored entries put the answer second */
function qKnowledge(k){
  return { prompt:k.q, options:shuffle(k.options), answer:k.options[k.a], explain:k.explain, topic:topicOf(k) };
}
function qFamily(c){
  const wrong = sample(Object.keys(FAMILIES).filter(f=>f!==c.family),3);
  return { prompt:'Which family does the '+c.name+' belong to?',
    options: shuffle([c.family,...wrong]), answer:c.family,
    explain: FAMILIES[c.family].formula+': '+FAMILIES[c.family].lesson.split('.')[0]+'.' };
}
function qCocktailTicket(c){
  const sameFam = COCKTAILS.filter(x=>x.name!==c.name && x.family===c.family).map(x=>x.name);
  const others = COCKTAILS.filter(x=>x.name!==c.name && x.family!==c.family).map(x=>x.name);
  const wrong = sample(sameFam, Math.min(2,sameFam.length)).concat(sample(others,3)).slice(0,3);
  return { prompt:'Name this drink from the ticket:', ticket:c,
    options: shuffle([c.name,...wrong]), answer:c.name,
    explain: c.name+': '+c.method.toLowerCase()+', '+c.glass.toLowerCase()+'. '+(c.note||'') };
}
function qBlindOther(){
  if(Math.random() < 0.5){
    const s = sample(SHOTS,1)[0];
    const wrong = sample(SHOTS.filter(x=>x.name!==s.name).map(x=>x.name),3);
    return { prompt:'Name this shot from the ticket:', ticket:s, ticketType:'shot',
      options: shuffle([s.name,...wrong]), answer:s.name,
      explain: s.name+': '+s.cat.toLowerCase()+'. '+(s.note||'') };
  }
  const d = sample(NA_DRINKS,1)[0];
  const wrong = sample(NA_DRINKS.filter(x=>x.name!==d.name).map(x=>x.name),3);
  return { prompt:'Name this zero-proof drink from the ticket:', ticket:d, ticketType:'na',
    options: shuffle([d.name,...wrong]), answer:d.name,
    explain: d.name+': '+d.method.toLowerCase()+'. '+(d.why||'') };
}
/* Graded through the CATEGORY keys, the way service mode already does. Raw
   prose graded raw prose, so "Coupe" and "Coupe or Nick & Nora" could stand
   as separate options with one marked wrong, a distinction no bar makes, and
   and two methods differing only in phrasing collided the same way. The raw
   spec text stays in the explain line, where prose belongs. */
function qGlass(c){
  const mine = svcGlassKey(c.glass);
  const wrong = sample([...new Set(COCKTAILS.map(x=>svcGlassKey(x.glass)))].filter(g=>g!==mine),3);
  return { prompt:'Which glass does the '+c.name+' go in?',
    options: shuffle([mine,...wrong]), answer:mine,
    explain: c.name+': '+c.glass+'. '+(c.garnish?'Garnish: '+c.garnish+'.':'') };
}
function qMethod(c){
  const mine = svcMethodKey(c.method);
  const wrong = sample([...new Set(COCKTAILS.map(x=>svcMethodKey(x.method)))].filter(m=>m!==mine),3);
  return { prompt:'How is the '+c.name+' built?',
    options: shuffle([mine,...wrong]), answer:mine,
    explain: c.name+': '+c.method+'. Shake anything cloudy; stir anything all-spirit.' };
}

/* Draw n authored questions spread across the topics, so a mixed round
   actually visits the bank instead of the same corner of it. */
function spreadKnowledge(n){
  const picked = [], used = new Set();
  const take = (pool) => {
    const fresh = pool.filter(k => !used.has(k));
    if(!fresh.length) return;
    const k = sample(fresh, 1)[0];
    used.add(k); picked.push(qKnowledge(k));
  };
  ['service','beerwine','craft'].forEach(t => { if(picked.length < n) take(knowledgeByTopic(t)); });
  while(picked.length < n) {
    const before = picked.length;
    take(KNOWLEDGE);
    if(picked.length === before) break;      /* bank exhausted */
  }
  return picked;
}

function buildRound(mode, pool){
  mode = mode || 'mixed';
  /* the session passes the deck it just drilled, so the quiz reinforces
     tonight's drinks rather than quizzing tier 9 at a tier 2 learner */
  const drinkPool = (pool && pool.length >= 8)
    ? COCKTAILS.filter(c => pool.some(d => d.src === 'Cocktails' && d.name === c.name))
    : COCKTAILS;
  const cocktails = drinkPool.length >= 8 ? drinkPool : COCKTAILS;
  const qs = [];
  if(mode === 'mybar'){
    /* the whole round off the venue's own list: up to three question shapes
       per drink, sliced to ten. The setup chip guards the <4-drink case. */
    shuffle((progress.bar||[]).slice()).forEach(b => {
      qs.push(qMyBarTicket(b));
      if(b.glass && b.glass !== '-') qs.push(qMyBarGlass(b));
      if((b.spec||[]).length) qs.push(qMyBarSpecLine(b));
    });
    return shuffle(qs).slice(0,10);
  }
  if(mode === 'tickets'){
    sample(cocktails,7).forEach(c => qs.push(qCocktailTicket(c)));
    for(let i=0;i<3;i++) qs.push(qBlindOther());
    return shuffle(qs);
  }
  if(mode === 'dealer'){
    const cands = dealerPool();
    const used = new Set();
    for(let i = 0; i < 10; i++) qs.push(qDealer(cands, used));
    return qs;
  }
  if(mode !== 'mixed'){
    sample(knowledgeByTopic(mode),10).forEach(k => qs.push(qKnowledge(k)));
    return shuffle(qs);
  }
  /* mixed: six generated items, four drawn from the authored bank with a
     deliberate topic spread. Previously only two were authored, so weeks of
     study could pass without meeting most of the 196 questions. */
  /* ONE sample partitioned across every drink question, so the same cocktail
     can't turn up as a blind ticket and a glass question in the same round */
  const picks = sample(cocktails, 5);
  const fam = picks.find(c => FAMILIES[c.family]);
  if(fam) qs.push(qFamily(fam));
  picks.filter(c => c !== fam).slice(0,2).forEach(c => qs.push(qCocktailTicket(c)));
  const rest2 = picks.filter(c => c !== fam).slice(2);
  if(rest2[0]) qs.push(qGlass(rest2[0]));
  if(rest2[1]) qs.push(qMethod(rest2[1]));
  qs.push(qBlindOther());
  /* one question from the venue's own list rides every mixed round, and so
     rides Tonight's Session, whose quiz step deals a mixed round over the
     deck it just drilled */
  const bar = (pool || allDrinks()).filter(d => d.src === 'My Bar');
  if(bar.length) qs.push(qMyBarTicket(sample(bar,1)[0].ref));
  spreadKnowledge(10 - qs.length).forEach(q => qs.push(q));
  return shuffle(qs).slice(0,10);
}
function renderQuiz(){
  const z = state.quiz;
  if(z.stage==='setup'){
    const barN = (progress.bar||[]).length;
    /* the mode can outlive the list that justified it: drinks deleted below
       the floor drop the round back to mixed rather than dealing a thin one */
    if(z.mode==='mybar' && barN < 4) z.mode = 'mixed';
    const mode = z.mode || 'mixed';
    const hist = (progress.quizzes||[]).slice(-5).reverse()
      .map(h => '<div class="hist-row"><span>'+esc(h.date)+(h.mode&&h.mode!=='mixed'?' · '+esc(h.mode):'')+'</span><span class="font-tix brass2">'+h.score+'/'+(h.total||10)+'</span></div>').join('');
    const chips = QUIZ_MODES.map(([k,l]) => {
      if(k==='mybar' && barN < 4) return '<button class="chip" disabled title="Add four drinks to your menu and this round opens">'+esc(l)+' <span class="font-tix">'+barN+'/4</span></button>';
      return '<button class="chip'+(mode===k?' on':'')+'" aria-pressed="'+(mode===k?'true':'false')+'" data-act="quiz-mode" data-m="'+k+'">'+esc(l)+'</button>';
    }).join(' ');
    const blurb = (QUIZ_MODES.find(([k]) => k===mode) || QUIZ_MODES[0])[2];
    const pool = mode==='mixed' || mode==='tickets' || mode==='mybar' ? null : knowledgeByTopic(mode);
    const thin = pool && pool === KNOWLEDGE
      ? '<div class="tiny dim">Nothing written for this domain yet; you\'ll get a mixed pool until there is.</div>' : '';
    return '<div class="col">'
      + '<div class="panel p5 tc col" style="align-items:center">'
      + '<div class="eyebrow">Quiz rounds</div>'
      + '<div class="row center">'+chips+'</div>'
      + '<div class="small dim lh" style="max-width:460px">'+esc(blurb)+'</div>'
      + thin
      + '<button class="btn btn-brass" data-act="quiz-start">Deal a round</button></div>'
      + (hist ? '<div class="panel p4"><div class="eyebrow mb2">Recent rounds</div>'+hist+'</div>' : '')
      + '</div>';
  }
  if(z.stage==='done'){
    const total = z.round.length;
    const pct = z.score/total;
    const verdict = pct>=0.9 ? 'Clean round. Recognition is not the same as doing it: take it to the drills.'
      : pct>=0.7 ? 'Solid. Read the misses below before you deal another.'
      : pct>=0.5 ? 'Half is a start. The explanations are where the round pays you back.'
      : 'Everyone starts by polishing glassware. Run it again.';
    const missPanel = z.missedQ.length
      ? '<div class="panel p4 col-sm" style="width:100%"><div class="eyebrow mb1">Where the round got away from you</div>'
        + z.missedQ.map(q => '<div class="small lh" style="border-bottom:1px solid var(--felt-3);padding:8px 0">'
          + '<span class="dim">'+esc(q.prompt)+(q.ticket? ' ['+esc(q.ticket.name)+']':'')+'</span><br>'
          + '<span class="brass2">→ '+esc(q.answer)+'</span>'
          /* the explanation is the whole point of reviewing a miss */
          + (q.explain ? '<br><span class="tiny dim">'+esc(q.explain)+'</span>' : '')
          + '</div>').join('')
        + '</div>' : '';
    return '<div class="col" style="align-items:center">'
      + '<div class="ticket"><div class="ticket-inner tc">'
      + '<div class="tix-label">Round complete</div><div class="tix-name" style="font-size:1.5rem">'+z.score+' / '+total+'</div>'
      + '<div class="tix-rule"></div><div class="tix-note tiny">'+verdict+'</div></div></div>'
      + missPanel
      + '<div class="row center">'
      + sessionQuizDoneHTML()
      + (z.missedQ.length ? '<button class="btn btn-ox" data-act="quiz-replay">Replay the misses ('+z.missedQ.length+')</button>' : '')
      /* only suppress Deal another while the SESSION is actually on its quiz step:
         suppressing on `active` alone left this screen with zero buttons */
      + (state.sess && state.sess.active && state.sess.step==='quiz' ? '' : '<button class="btn btn-brass" data-act="quiz-start">Deal another round</button>')
      + '</div></div>';
  }
  const q = z.round[z.idx];
  const answered = z.picked !== null;
  const opts = q.options.map((opt,i) => {
    let cls = 'opt-btn', mark = '', sr = '';
    /* dark green vs dark red is the ONLY signal for a deuteranopic user, and no
       signal at all in forced-colors mode: carry it in text and a glyph too */
    if(answered && opt===q.answer){ cls += ' correct'; mark = '<span aria-hidden="true" class="opt-mark">✓</span> '; sr = '<span class="sr-only">Correct answer: </span>'; }
    else if(answered && i===z.picked){ cls += ' wrong'; mark = '<span aria-hidden="true" class="opt-mark">✗</span> '; sr = '<span class="sr-only">Your answer, incorrect: </span>'; }
    return '<button class="'+cls+'" data-act="quiz-pick" data-i="'+i+'"'+(answered?' disabled':'')+'>'+mark+sr+esc(opt)+'</button>';
  }).join('');
  const after = answered
    ? '<div class="explain"><span class="brass2 bold">'+(q.options[z.picked]===q.answer?'Correct. ':'Not quite. ')+'</span>'+esc(q.explain)+'</div>'
      + '<button class="btn btn-brass self-end" data-act="quiz-next">'+(z.idx+1>=z.round.length?'Close out the round':'Next question')+'</button>'
    : '';
  return '<div class="col">'
    + '<div class="row between tiny dim"><span>Question '+(z.idx+1)+' of '+z.round.length+'</span>'
    + '<span>Score: '+z.score+'</span>'
    + '<button class="chip" data-act="quiz-quit">Quit round</button></div>'
    + '<div class="panel p5 col"><div class="bold lh">'+esc(q.prompt)+'</div>'
    + (q.ticket ? (q.ticketType==='shot' ? shotTicketHTML(q.ticket,true) : q.ticketType==='na' ? naTicketHTML(q.ticket,true) : q.ticketType==='mybar' ? ticketHTML(q.ticket,true) : ticketHTML(q.ticket,true)) : '')
    + '<div class="col-sm">'+opts+'</div>'+after+'</div></div>';
}


/* ---------------- NOTES ---------------- */
function videoSettingsHTML(){
  const p = progress.vidPrefs || {};
  const chips = [['auto','Auto (best per drink)']].concat(CHANNELS.map(function(c){ return [c.id, c.name]; }))
    .map(function(o){
      const on = (p.channel||'auto')===o[0];
      return '<button class="chip'+(on?' on':'')+'" aria-pressed="'+(on?'true':'false')+'" data-act="vid-chan" data-c="'+esc(o[0])+'">'+esc(o[1])+'</button>';
    }).join(' ');
  return '<div class="panel p5 col" style="gap:12px">'
    + '<div class="eyebrow">Video settings</div>'
    + '<div class="small dim lh">Every drink, prep, and technique in this guide links out to a live YouTube search. These two settings shape every one of those links.</div>'
    + '<div><div class="tiny eyebrow mb1">Preferred channel</div><div class="row" style="gap:6px">'+chips+'</div>'
    + '<div class="tiny dim mt1">Auto routes each drink to the channel that covers it best. Pin one if you like a particular bartender\'s style; it becomes the first button everywhere.</div></div>'
    + '<div><div class="tiny eyebrow mb1">Result length</div><div class="row" style="gap:6px">'
    + '<button class="chip'+(!p.longform?' on':'')+'" aria-pressed="'+(!p.longform?'true':'false')+'" data-act="vid-len" data-v="any">Any length</button>'
    + '<button class="chip'+(p.longform?' on':'')+'" aria-pressed="'+(p.longform?'true':'false')+'" data-act="vid-len" data-v="long">Full tutorials only</button></div>'
    + '<div class="tiny dim mt1">Full tutorials adds a filter that pushes past 30-second Shorts toward videos that actually explain the technique.</div></div>'
    + '</div>';
}

function glossaryHTML(){
  const isOpen = state.noteOpen === '__glossary';
  const body = isOpen ? '<div class="accordion-body"><div class="gloss-grid">' + GLOSSARY.map(g =>
    '<div><div class="small bold brass2">'+esc(g.term)+'</div><div class="small dim lh">'+esc(g.def)+'</div></div>').join('') + '</div></div>' : '';
  return '<div class="panel" style="padding:0 16px">'
    + '<button class="accordion-btn'+(isOpen?' open':'')+'" aria-expanded="'+(isOpen?'true':'false')+'" data-act="note-open" data-t="__glossary" data-open="'+noteOpenMark(isOpen)+'">'
    + '<span>Glossary of the Craft <span class="tiny dim">· '+GLOSSARY.length+' terms</span></span><span style="color:var(--brass)">'+(isOpen?'−':'+')+'</span></button>'+body+'</div>';
}
/* data-open="1" is what render() scrolls into sight. Only the accordion the
   reader JUST opened (a search hit, a deep link, a tap) earns it: the
   default-open first note must not drag every plain visit down the page. */
function noteOpenMark(isOpen){ return (isOpen && state.noteJump) ? '1' : '0'; }
function renderNotes(){
  /* the notes first and the video settings last: a reader arriving from the
     induction or a search hit should meet the note, not a settings panel */
  const html = '<div class="col-sm">' + STUDY.map(sec => {
    const isOpen = state.noteOpen === sec.title;
    const body = isOpen ? '<div class="accordion-body">' + sec.rows.map(([h,p]) =>
      '<div><div class="small bold brass2">'+esc(h)+'</div><div class="small dim lh">'+esc(p)+'</div></div>').join('') + '</div>' : '';
    return '<div class="panel" style="padding:0 16px">'
      + '<button class="accordion-btn'+(isOpen?' open':'')+'" aria-expanded="'+(isOpen?'true':'false')+'" data-act="note-open" data-t="'+esc(sec.title)+'" data-open="'+noteOpenMark(isOpen)+'">'
      + '<span>'+esc(sec.title)+'</span><span style="color:var(--brass)">'+(isOpen?'−':'+')+'</span></button>'+body+'</div>';
  }).join('') + platesHTML() + glossaryHTML() + videoSettingsHTML() + '</div>';
  state.noteJump = false;
  return html;
}

function renderRiffs(){
  const r = state.riff;
  if(!r.frame){
    const frames = RIFFS.map((f,i) =>
      '<button class="btn btn-ghost" style="text-align:left" data-act="riff-frame" data-f="'+i+'">'
      + '<span class="bold">'+esc(f.label)+'</span><br>'
      + '<span class="tiny dim font-tix" style="font-weight:400">'+f.lines.join(' / ')+'</span></button>').join('');
    return '<div class="col">'
      + '<div class="panel p5 col" style="gap:14px">'
      + '<div class="eyebrow">Riff builder</div>'
      + '<div class="small dim lh">The templates aren\'t for memorizing; they\'re for improvising. Pick a frame; the ledger deals you a random base and modifiers. Build the full drink in your head (amounts, method, glass, garnish) then reveal the frame\'s answer and see which classics already live in that slot.</div>'
      + '<div class="col-sm">'+frames+'</div></div>'
      + '<div class="tiny dim lh" style="padding:0 4px">This is how the Boulevardier was born: someone looked at a Negroni and asked "what if bourbon?" Every classic was once a riff.</div>'
      + '</div>';
  }
  const d = r.deal;
  const picksLine = Object.entries(d.picks).map(([k,v]) =>
    '<span class="chip brass" style="text-transform:none;letter-spacing:0.03em">'+esc(k)+': '+esc(v)+'</span>').join(' ');
  if(!r.revealed){
    return '<div class="col">'
      + '<div class="row between tiny dim"><span>'+esc(r.frame.label)+'</span><button class="chip" data-act="riff-back">Change frame</button></div>'
      + '<div class="panel p5 col tc" style="align-items:center">'
      + '<div class="eyebrow">Your challenge</div>'
      + '<div class="row center">'+picksLine+'</div>'
      + '<div class="small dim lh" style="max-width:420px">Build the complete drink out loud: exact amounts, shake or stir, glass, garnish. What would you name it? Then check your work.</div>'
      + '<div class="row center"><button class="btn btn-brass" data-act="riff-reveal">Reveal the frame</button>'
      + '<button class="btn btn-ghost" data-act="riff-deal">Re-deal</button></div></div></div>';
  }
  const sp = baseSpirit(d.picks.base || '');
  let neighbors = COCKTAILS.filter(c => c.family===r.frame.fam && (!sp || c.spirit===sp)).slice(0,3);
  if(!neighbors.length) neighbors = COCKTAILS.filter(c => c.family===r.frame.fam).slice(0,3);
  const nChips = neighbors.map(n => '<button class="chip" data-act="tool-open" data-i="'+idxOf(n.name)+'">'+esc(n.name)+'</button>').join(' ');
  const lines = d.resolved.map(l => '<div class="spec-line"><span>·</span><span>'+esc(l)+'</span></div>').join('');
  const ask = r.critique
    ? critiqueHTML(r.frame, d)
    : '<button class="btn btn-ghost tiny" data-act="riff-critique">Slide it to the bar manager for a critique →</button>';
  return '<div class="col">'
    + '<div class="row between tiny dim"><span>'+esc(r.frame.label)+'</span><button class="chip" data-act="riff-back">Change frame</button></div>'
    + '<div class="panel p5 col" style="align-items:center">'
    + '<div class="ticket"><div class="ticket-inner">'
    + '<div class="tc"><div class="tix-label">Riff on the '+esc(r.frame.fam)+' family</div>'
    + '<div class="tix-name">UNNAMED: YOURS TO CHRISTEN</div></div>'
    + '<div class="tix-rule"></div>'+lines+'<div class="tix-rule"></div>'
    + '<div><span class="tix-label">Push it </span>'+esc(d.twist)+'</div>'
    + '</div></div>'
    + '<div class="tc"><div class="eyebrow mb1">Classics living in this slot</div><div class="row center">'+(nChips||'<span class="tiny dim">uncharted territory, even better</span>')+'</div></div>'
    + '<div class="row center">'+categoryVideoHTML(r.frame.fam,'family')+'</div>'
    + ask
    + '<div class="row center"><button class="btn btn-brass" data-act="riff-deal">Deal another</button></div>'
    + '</div></div>';
}

