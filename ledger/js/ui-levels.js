/* ---------------- THE FOUR LEVELS: THE SCREENS ----------------
   The home, a level's page, the level test and Mine, in the markup the three
   apps share (the World Table, the Codex and the Ledger read as one family;
   only the CSS is each app's own):

     section.levels   four button.level, each .lv-num .lv-name .lv-stat, the
                      current one .on with aria-current and "Your level"
     nav.quiet        four button.door: Today, Library, Record, Mine · My Bar

   and nothing else on the home. The masthead is the page's h1 on every tab
   of this app, so a level page is h2 then h3 beneath it.

   The Library, Levels and Mine clusters no longer draw a sub-row: the
   Library carries a shelf of its own tabs at the top of each, and a tab
   reached from a level or from Mine carries the one way back. */

/* ---- the home ---- */
function homeLevelsHTML(){
  const cur = firstUnmetLevel();
  return '<section class="levels" aria-label="Levels">' + LEVELS.map(function(l){
    const on = l.n === cur;
    return '<button class="level'+(on?' on':'')+'" data-act="level-open" data-n="'+l.n+'" data-level="'+l.n+'"'+(on?' aria-current="step"':'')+'>'
      + '<span class="lv-num">'+l.num+'</span>'
      + '<span class="lv-name">'+esc(l.name)+'</span>'
      + '<span class="lv-stat">'+esc(levelProgress(l.n).label)+'</span>'
      + (on ? '<span class="lv-here">Your level</span>' : '')
      + '</button>';
  }).join('') + '</section>';
}

/* Today's door carries the session's three states, in words. */
function todayDoor(){
  const lv = todayLevel();
  const parts = sessionDeckParts();
  /* what tonight's hand actually deals: the menu leads while it holds a
     card never seen, and a night of reviews deals from no level at all */
  const deals = !parts.newDeck.length ? 'Reviews only tonight.'
    : parts.newDeck.some(function(d){ return d.src === 'My Bar'; }) ? 'Today deals from your menu, then Level ' + roman(lv) + '.'
    : 'Today deals from Level ' + roman(lv) + '.';
  const drill = tonightDrill();
  if(state.sess && state.sess.active && !sessionDoneToday()){
    const where = state.sess.step==='cards' ? 'the cards' : state.sess.step==='quiz' ? 'the quiz round' : drill.name;
    return { line:'Tonight’s session is open, on ' + where + '.', sub:deals };
  }
  if(sessionDoneToday()){
    return handsDoneToday()
      ? { line:'Tonight is in the book, hands and all.', sub:deals }
      : { line:'Tonight is in the book without hands. ' + drill.name + ' still counts.', sub:deals };
  }
  const bits = [];
  if(parts.dueDeck.length) bits.push(parts.dueDeck.length + ' review' + (parts.dueDeck.length===1?'':'s') + ' due');
  if(parts.newDeck.length) bits.push(parts.newDeck.length + ' new card' + (parts.newDeck.length===1?'':'s'));
  return { line:'Pour tonight’s session: ' + (bits.length ? bits.join(', ') + ', ' : '') + 'a quiz round, then ' + drill.name + '.', sub:deals };
}
function deskWaitingCount(){
  try {
    const f = deskInbox.read();
    return f ? deskInbox.share(f, 'cocktail').length : 0;
  } catch(e){ return 0; }
}
function homeDoorsHTML(){
  const t = todayDoor();
  const desk = deskWaitingCount();
  const door = function(d, name, line, sub){
    return '<button class="door" data-act="door" data-d="'+d+'">'
      + '<span class="door-name">'+esc(name)+'</span>'
      + '<span class="door-line">'+esc(line)+'</span>'
      + (sub ? '<span class="door-sub">'+esc(sub)+'</span>' : '')
      + '</button>';
  };
  return '<nav class="quiet" aria-label="Doors">'
    + door('today', 'Today', t.line, t.sub)
    + door('library', 'Library', 'The ' + COCKTAILS.length + ' and the reference.', '')
    + door('record', 'Record', 'Standing, mastery, the night’s numbers.', '')
    + door('mine', 'Mine · My Bar', 'My Bar, the Menu Desk, tools and the Maître d’.',
        desk ? desk + ' cocktail' + (desk===1?'':'s') + ' from the Menu Desk ' + (desk===1?'is':'are') + ' waiting.' : '')
    + '</nav>';
}
function homeHTML(){
  return '<div class="home4">' + homeLevelsHTML() + homeDoorsHTML() + '</div>';
}
/* A door, applied. */
function openDoor(d){
  if(d === 'today'){
    if(state.sess && state.sess.active && !sessionDoneToday()){
      const st = state.sess.step;
      state.tab = st==='cards' ? 'flashcards' : st==='quiz' ? 'quiz' : 'practice';
      if(st==='drill') state.practice.view = 'drills';
      return;
    }
    if(sessionDoneToday()){
      if(!handsDoneToday()){ state.sess = { active:true, step:'drill', night: dateKey(0) }; state.tab = 'practice'; state.practice.view = 'drills'; }
      else openLevel(todayLevel());
      return;
    }
    startSession();
    return;
  }
  if(d === 'library'){ state.tab = 'library'; state.lib.level = null; return; }
  if(d === 'record'){ state.tab = 'mine'; state.mine.at = 'record'; return; }
  if(d === 'mine'){ state.tab = 'mine'; return; }
}
function openLevel(n){
  state.lt = null;
  state.level.n = n;
  state.tab = 'level';
}

/* ---- a level's page ---- */
function familyNoteFor(n){
  const fams = {};
  levelCardsOf(n, 'cocktails', function(d){ return d.src === 'Cocktails'; }).forEach(function(d){ fams[d.group] = (fams[d.group]||0) + 1; });
  return Object.keys(fams).sort(function(a,b){ return fams[b] - fams[a] || a.localeCompare(b); })
    .map(function(f){ return f + ' ' + fams[f]; }).join(' · ');
}
function readLabel(n, sub){
  const t = readDoorTarget(n, sub);
  if(t.svc){ const s = SERVICE_STUDY.find(function(x){ return x.key === t.svc; }); if(s) return 'Read · ' + s.title; }
  if(t.ontap){ const s = ONTAP_STUDY.find(function(x){ return x.key === t.ontap; }); if(s) return 'Read · ' + s.title; }
  if(t.coffee){ const s = COFFEE_STUDY.find(function(x){ return x.key === t.coffee; }); if(s) return 'Read · ' + s.title; }
  if(t.note && t.note !== '__plates') return 'Read · ' + t.note;
  if(t.note === '__plates') return 'Read · The plates';
  if(t.prep !== undefined) return 'Read · ' + PREPS[t.prep].name;
  if(t.prod !== undefined) return 'Read · ' + PRODUCERS[t.prod].name;
  if(t.view === 'flights') return 'Read · The flights';
  if(t.tab === 'library') return 'Read · The Library at this level';
  const shelf = LIBRARY_SHELF.find(function(x){ return x[0] === t.tab; });
  if(shelf) return 'Read · ' + shelf[1];
  if(t.tab === 'riffs') return 'Read · The riff frames';
  return 'Read · ' + (TAB_LABEL[t.tab] || t.tab);
}
function handsLabel(n, sub){
  const t = trainTarget('hands', n, sub);
  if(t && t.drill){ const d = DRILLS.find(function(x){ return x.id === t.drill; }); if(d) return 'Hands on · ' + d.name; }
  return t && t.tab === 'riffs' ? 'Riff frames' : 'Hands on';
}
function trainDoorsHTML(n, sub){
  const doors = [['read', readLabel(n, sub)], ['cards', 'Flashcards'], ['quiz', 'Quiz'], ['hands', handsLabel(n, sub)]];
  return doors.filter(function(d){ return trainTarget(d[0], n, sub); })
    .map(function(d){ return '<button class="train" data-act="train" data-m="'+d[0]+'" data-n="'+n+'" data-s="'+sub+'">'+esc(d[1])+'</button>'; }).join('');
}
function renderLevel(){
  if(state.lt) return renderLevelTest();
  const n = state.level.n || firstUnmetLevel();
  state.level.n = n;
  const info = levelInfo(n);
  const p = levelProgress(n);
  const here = firstUnmetLevel() === n;
  const switcher = '<nav class="lv-switch" aria-label="The four levels">' + LEVELS.map(function(l){
    return '<button class="chip'+(l.n===n?' on':'')+'" data-act="level-open" data-n="'+l.n+'"'+(l.n===n?' aria-current="page"':'')+' aria-label="Level '+l.num+', '+esc(l.name)+'">'+l.num+'</button>';
  }).join('') + '</nav>';
  const subs = p.subs.map(function(s){
    const note = s.sub === 'cocktails' ? familyNoteFor(n) : '';
    return '<li class="subsection" data-sub="'+s.sub+'">'
      + '<h3 class="sub-head">'+esc(s.title)+'</h3>'
      + '<p class="sub-line">'+s.total+' at this level · '+esc(s.label)+'</p>'
      + (note ? '<p class="sub-note">'+esc(note)+'</p>' : '')
      + '<div class="trains">'+trainDoorsHTML(n, s.sub)+'</div>'
      + '</li>';
  }).join('');
  return '<div class="col level-page">'
    + switcher
    + '<h2 class="lv-title"><span class="lv-num">'+info.num+'</span> '+esc(info.name)+'</h2>'
    + '<p class="lv-blurb">'+esc(info.blurb)+'</p>'
    + '<p class="lv-statline">'+esc(p.label)+(here ? ' · <span class="lv-here">Your level</span>' : '')+'</p>'
    + '<ol class="subsections">'+subs+'</ol>'
    + '<button class="btn btn-brass leveltest" data-act="lt-start" data-n="'+n+'">The Level '+info.num+' test</button>'
    + '<p class="tiny dim lh tc">Seventeen questions across the eight subsections of Level '+info.num+'. No clock. It ends on what got away, with the right answers.</p>'
    + '</div>';
}

/* ---- the level test ---- */
function ltQuestionBodyHTML(q){
  let ticket = '';
  if(q.ticket) ticket = q.ticketType==='shot' ? shotTicketHTML(q.ticket,true) : q.ticketType==='na' ? naTicketHTML(q.ticket,true) : ticketHTML(q.ticket,true);
  if(q.factCard) ticket = tapTicketHTML(q.factCard, true);
  return '<div class="bold lh">'+esc(q.prompt)+'</div>' + ticket;
}
function renderLevelTest(){
  const t = state.lt;
  const info = levelInfo(t.n);
  const head = '<h2 class="lv-title">The Level '+info.num+' test</h2>';
  if(t.none){
    return '<div class="col level-page">'+head
      + '<div class="panel p5 small dim lh">This level cannot deal its test yet.</div>'
      + '<div class="row center"><button class="btn btn-ghost" data-act="lt-close">Back to Level '+info.num+'</button></div></div>';
  }
  if(t.done){
    const rows = t.misses.map(function(m){
      const q = m.q;
      return '<li class="lt-miss">'
        + '<span class="tiny eyebrow">'+esc(levelSubTitle(q.part))+'</span>'
        + '<span class="small dim lh">'+esc(q.factCard ? 'The blind card' : q.ticket ? 'The blind ticket' : q.prompt)+'</span>'
        + '<span class="small">You chose '+esc(m.chose)+'</span>'
        + '<span class="small brass2">The answer: '+esc(q.answer)+'</span>'
        + (q.explain ? '<span class="tiny dim lh">'+esc(q.explain)+'</span>' : '')
        + '</li>';
    }).join('');
    return '<div class="col level-page">'+head
      + (t.misses.length
        ? '<div class="panel p5 col"><div class="eyebrow">What got away, with the right answers.</div><ul class="lt-misses">'+rows+'</ul></div>'
        : '<div class="panel p5 tc"><div class="font-display brass2" style="font-size:1.3rem">Nothing got away.</div></div>')
      + '<div class="row center"><button class="btn btn-brass" data-act="lt-close">Back to Level '+info.num+'</button>'
      + '<button class="btn btn-ghost" data-act="lt-start" data-n="'+t.n+'">Take it again</button></div></div>';
  }
  const q = t.qs[t.idx];
  const answered = t.picked !== null;
  const opts = q.options.map(function(opt, i){
    let cls = 'opt-btn', mark = '', sr = '';
    if(answered && opt===q.answer){ cls += ' correct'; mark = '<span aria-hidden="true" class="opt-mark">✓</span> '; sr = '<span class="sr-only">Correct answer: </span>'; }
    else if(answered && i===t.picked){ cls += ' wrong'; mark = '<span aria-hidden="true" class="opt-mark">✗</span> '; sr = '<span class="sr-only">Your answer, incorrect: </span>'; }
    return '<button class="'+cls+'" data-act="lt-pick" data-i="'+i+'"'+(answered?' disabled':'')+'>'+mark+sr+esc(opt)+'</button>';
  }).join('');
  const after = answered
    ? '<div class="explain">'+esc(q.explain || '')+'</div>'
      + '<button class="btn btn-brass self-end" data-act="lt-next">'+(t.idx+1>=t.qs.length ? 'Finish the test' : 'Next question')+'</button>'
    : '';
  return '<div class="col level-page">'+head
    + '<div class="row between tiny dim"><span>Question '+(t.idx+1)+' of '+t.qs.length+' · '+esc(levelSubTitle(q.part))+'</span>'
    + '<button class="chip" data-act="lt-close">Leave the test</button></div>'
    + '<div class="panel p5 col">'+ltQuestionBodyHTML(q)+'<div class="col-sm">'+opts+'</div>'+after+'</div></div>';
}

/* ---- Mine: the bar, the tools, and the record ---- */
function levelTestsHTML(){
  const L = progress.levels || {};
  const times = function(k){ return k === 1 ? 'taken once' : k === 2 ? 'taken twice' : 'taken ' + k + ' times'; };
  const rows = LEVELS.filter(function(l){ return (L[l.n] || []).length; }).map(function(l){
    const arr = L[l.n], last = arr[arr.length - 1];
    const when = new Date(last.ts).toLocaleDateString(undefined, { day:'numeric', month:'short' });
    return '<div class="hist-row"><span>Level '+l.num+' · '+esc(l.name)+'</span><span class="tiny dim">'+times(arr.length)+' · last '+esc(when)+'</span></div>';
  }).join('');
  return '<div class="panel p5"><div class="eyebrow mb2">The level tests</div>'
    + (rows || '<div class="small dim lh">None sat yet. Every level page ends on its test.</div>') + '</div>';
}
function recordHTML(){
  const stats = progress.cards || {};
  const deckCards = allDrinks().filter(function(d){ return !d.draft; });
  const mastered = deckCards.filter(function(d){ return isMastered(cardKey(d)); }).length;
  const studied = Object.keys(stats).length;
  const tastings = (progress.tastings || []).length;
  const drillLogs = Object.values(progress.practice || {}).reduce(function(n,a){ return n + (a?a.length:0); }, 0);
  const overdue = (typeof srsDueKeys === 'function') ? srsDueKeys().length : 0;
  const weakest = Object.keys(stats)
    .map(function(k){ const s2 = stats[k]; return { k:k, score:(s2.w||0)*2 + (s2.lapses||0)*1.5 - (s2.r||0) }; })
    .filter(function(x){ return x.score > 0; })
    .sort(function(a,b){ return b.score - a.score; })
    .slice(0,5)
    .map(function(x){ return '<button class="chip" data-act="fc-drill-weak" data-k="'+esc(x.k)+'">'+esc(x.k)+'</button>'; })
    .join(' ');
  const famBars = Object.keys(FAMILIES).map(function(f){
    const mem = COCKTAILS.filter(function(c){ return c.family===f; });
    const m = mem.filter(function(c){ return isMastered(c.name); }).length;
    const pct = mem.length ? Math.round(m/mem.length*100) : 0;
    return '<div class="row" style="gap:10px"><span class="tiny dim" style="width:130px;flex-shrink:0">'+esc(f)+'</span>'
      + '<div style="flex:1;height:6px;background:var(--felt-3);border-radius:3px;overflow:hidden">'
      + '<div style="width:'+pct+'%;height:100%;background:var(--brass)"></div></div>'
      + '<span class="tiny font-tix" style="color:var(--brass-2);width:38px;text-align:right">'+m+'/'+mem.length+'</span></div>';
  }).join('');
  return '<div class="col">'
    + '<div class="panel p5"><div class="row between"><div class="eyebrow mb2">Your standing at the bar</div>'+streakChipsHTML()+'</div>'
    + '<div class="stat-grid">'
    + '<div><div class="stat-num">'+mastered+'<span class="small dim">/'+deckCards.length+'</span></div><div class="tiny dim mt1">mastered, including self-graded cards</div></div>'
    + '<div><div class="stat-num">'+studied+'</div><div class="tiny dim mt1">cards drilled</div></div>'
    + '<div><div class="stat-num"'+(overdue?' style="color:var(--oxblood-text)"':'')+'>'+overdue+'</div><div class="tiny dim mt1">reviews overdue</div></div>'
    + '</div>'
    + '<div class="eyebrow mt3 mb2">Mastery by family</div>'
    + '<div class="col-sm" style="gap:6px">'+famBars+'</div>'
    + (weakest ? '<div class="eyebrow mt3 mb1">Where you are weakest</div>'
        + '<div class="small dim lh mb2">The five cards costing you the most. Tap one to drill just these.</div>'
        + '<div class="row" style="gap:6px">'+weakest+'</div>' : '')
    + '</div>'
    + levelTestsHTML()
    + dashboardHTML()
    + '<div class="panel p5">'
    + '<div class="eyebrow mb2">In the ledger</div>'
    + '<div class="row" style="gap:6px">'
    + '<span class="chip">'+COCKTAILS.length+' cocktails</span>'
    + '<span class="chip">'+SHOTS.length+' shots</span>'
    + '<span class="chip">'+NA_DRINKS.length+' zero-proof</span>'
    + '<span class="chip">'+PREPS.length+' prep sheets</span>'
    + '<span class="chip">'+PRODUCERS.length+' producers</span>'
    + '<span class="chip">'+FLIGHTS.length+' tasting flights</span>'
    + '<span class="chip">'+SERVICE_STUDY.reduce(function(n,x){ return n+x.rows.length; },0)+' service lessons</span>'
    + '<span class="chip">'+ONTAP_STUDY.reduce(function(n,x){ return n+x.rows.length; },0)+' draught lessons</span>'
    + '<span class="chip">'+KNOWLEDGE.length+' quiz questions</span></div>'
    + (tastings ? '<div class="tiny dim mt2">'+tastings+' tasting note'+(tastings===1?'':'s')+' logged'
        + (drillLogs ? ' · '+drillLogs+' practice result'+(drillLogs===1?'':'s')+' recorded' : '')+'</div>'
        : '<div class="tiny dim mt2">No tasting notes yet. The practice room has scorecards and twelve guided flights.</div>')
    + '</div>'
    + '<div class="panel p5"><div class="eyebrow mb2">The four pillars</div><div class="small dim lh">'
    + '<span style="color:var(--cream)">Craft</span> from the Bar-Tender’s Guide of 1862: precision and pride in execution. '
    + '<span style="color:var(--cream)">Structure</span> from The Joy of Mixology (2003): learn the template, know a hundred drinks. '
    + '<span style="color:var(--cream)">Ingredients and theatre</span> from the Rainbow Room revival: fresh juice and the flamed peel. '
    + '<span style="color:var(--cream)">Hospitality</span> from PDT and the speakeasy era: the drink is only half the job.'
    + '</div></div></div>';
}
function renderMine(){
  const at = state.mine.at;
  state.mine.at = null;
  const door = function(attrs, name, line){
    return '<button class="door" '+attrs+'><span class="door-name">'+esc(name)+'</span><span class="door-line">'+esc(line)+'</span></button>';
  };
  return '<div class="col mine">'
    + '<h2 class="lv-title">Mine</h2>'
    + (typeof deskWaitingHTML === 'function' ? deskWaitingHTML('home') : '')
    + '<nav class="quiet" aria-label="Your bar and your tools">'
    + door('data-act="go" data-tab="menu"', 'My Bar', 'The venue’s own list, the stock, and what can be poured tonight.')
    + door('data-act="go" data-tab="tools"', 'Tools', 'Batching, strength, pour cost, the spill log, open bottles, conversion.')
    + door('data-act="go" data-tab="tools" data-v="data"', 'My Data', 'Back up and restore everything this ledger has recorded.')
    /* her own door where her client is here or can be fetched; elsewhere the
       Tools page that says, in words, how she is brought in */
    + door((typeof maitreHere === 'function' && (maitreHere() || maitreLoadable())) ? 'data-act="maitre-open"' : 'data-act="go" data-tab="tools" data-v="maitre"',
        'The Maître d’', 'Optional, with a key of your own: she reads a menu with you.')
    + '</nav>'
    + '<p class="tiny dim lh">Your records live in this browser and go nowhere else, unless you bring in the Maître d’ with a key of your own, and then only the menu you hand her goes to Anthropic. Back them up now and then from My Data.</p>'
    + '<section id="record" aria-labelledby="record-head">'
    + '<h3 class="sub-head" id="record-head" tabindex="-1"'+(at==='record' ? ' data-open="1"' : '')+'>The record</h3>'
    + recordHTML()
    + '</section></div>';
}

/* ---- the chrome a cluster's tabs carry, in place of the sub-row ---- */
const LIBRARY_SHELF = [['library','The '+COCKTAILS.length],['families','Families'],['shots','Shots'],['na','Zero Proof'],['ontap','On Tap'],['coffee','Coffee & Tea'],['prep','The Prep Room'],['producers','Producers'],['service','Behind the Stick'],['notes','Notes & Glossary']];
function clusterChromeHTML(){
  const cl = clusterOf(state.tab);
  if(cl === 'library'){
    return '<nav class="shelf" aria-label="The Library">' + LIBRARY_SHELF.map(function(t){
      const on = state.tab === t[0];
      return '<button class="tab-btn'+(on?' active':'')+'"'+(on?' aria-current="page"':'')+' data-act="go" data-tab="'+t[0]+'">'+esc(t[1])+'</button>';
    }).join('') + '</nav>';
  }
  if(cl === 'levels' && state.tab !== 'level'){
    const n = state.level.n || firstUnmetLevel();
    return '<div class="crumb"><button class="chip" data-act="level-open" data-n="'+n+'">Back to Level '+roman(n)+'</button></div>';
  }
  if(cl === 'mine' && state.tab !== 'mine'){
    return '<div class="crumb"><button class="chip" data-act="go" data-tab="mine">Back to Mine</button></div>';
  }
  return '';
}
