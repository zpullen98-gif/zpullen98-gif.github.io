/* ---------------- THE FOUR LEVELS: THE SCREENS ----------------
   The home, a level's page, the level test and Mine, in the markup the three
   apps share (the World Table, the Codex and the Ledger read as one family;
   only the CSS is each app's own):

     section.levels   four button.level, each .lv-name .lv-stat, the
                      current one .on with aria-current and "Your level"
     nav.quiet        four button.door: Today, Library, Record, Mine · My Bar

   and nothing else on the home. The masthead is the page's h1 on every tab
   of this app, so a level page is h2 then h3 beneath it.

   The Library, Levels and Mine clusters no longer draw a sub-row: the
   Library carries a shelf of its own tabs at the top of each, and a tab
   reached from a level or from Mine carries the one way back. */

/* ---- the home ---- */
function homeLevelsHTML(){
  /* the chosen level (js/ui-nav.js), which falls back to the first unmet */
  const cur = typeof chosenLevel === 'function' ? chosenLevel() : firstUnmetLevel();
  return '<section class="levels" aria-label="Levels">' + LEVELS.map(function(l){
    const on = l.n === cur;
    return '<button class="level'+(on?' on':'')+'" data-act="level-open" data-n="'+l.n+'" data-level="'+l.n+'"'+(on?' aria-current="step"':'')+'>'
      /* the name is the whole label, on sight and to a screen reader: a level
         carries no numeral anywhere (the owner, 26 and 27 Sep 2026) */
      + '<span class="lv-name">'+esc(l.name)+'</span>'
      + '<span class="lv-stat">'+esc(levelProgress(l.n).label)+'</span>'
      + (on ? '<span class="lv-here">Your level</span>' : '')
      + '</button>';
  }).join('') + '</section>';
}

/* Today's door carries the session's three states, in words. */
function todayDoor(){
  const lv = typeof dealLevel === 'function' ? dealLevel() : todayLevel();
  const parts = sessionDeckParts();
  /* the counts are Due today's own (js/ui-nav.js), so the two rows never
     say two numbers for one evening */
  const t = typeof dueToday === 'function' ? dueToday() : null;
  /* what tonight's hand actually deals: the menu leads while it holds a
     card never seen, and a night of reviews deals from no level at all */
  const deals = !parts.newDeck.length ? 'Reviews only tonight.'
    : parts.newDeck.some(function(d){ return d.src === 'My Bar'; }) ? 'Today deals from your menu, then ' + levelInfo(lv).name + '.'
    : 'Today deals from ' + levelInfo(lv).name + '.';
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
  const nDue = t ? t.nDue : parts.dueDeck.length, nNew = t ? t.nNew : parts.newDeck.length;
  if(nDue) bits.push(nDue + ' review' + (nDue===1?'':'s') + ' due');
  if(nNew) bits.push(nNew + ' new card' + (nNew===1?'':'s'));
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
/* The home is the four level cards and nothing else (the owner, 4 October
   2026): the doors that stood under them have new homes (Today's study on a
   level page, the Library tab, More's record, My restaurant), and
   homeDoorsHTML and openDoor stay defined for the wing, which wraps
   renderHome by name. */
function homeHTML(){
  return '<div class="home4">' + homeLevelsHTML() + '</div>';
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
  if(d === 'record'){ state.tab = 'record'; state.mine.at = 'record'; return; }
  if(d === 'mine'){ state.tab = 'level'; state.level.n = typeof chosenLevel === 'function' ? chosenLevel() : firstUnmetLevel(); return; }
}
/* whatever level is opened is the level being studied (design 2.4) */
function openLevel(n){
  state.lt = null;
  state.level.n = n;
  state.tab = 'level';
  if(typeof setChosenLevel === 'function') setChosenLevel(n);
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
/* The books at a level, in book order, each a door into the Library at this
   level and that book, with its count here; a book that runs on to a higher
   level says where. This is how the twelve books sit inside the four
   levels: The Core Dozen and The Classics Canon at Barback, the Obscura
   mostly at Bar Manager, and never a book's number anywhere. */
function levelBooksHTML(n){
  const books = levelBooks(n);
  if(!books.length) return '';
  return '<div class="books" role="group" aria-label="The books at '+esc(levelInfo(n).name)+'">' + books.map(function(b){
    const next = bookContinues(b.t, n);
    return '<button class="book" data-act="book" data-n="'+n+'" data-t="'+b.t+'">'
      /* the spaces keep the words apart in the door's accessible name; a
         flex column never draws them */
      + '<span class="book-name">'+esc(b.name)+'</span> '
      + '<span class="book-count">'+b.n+' drink'+(b.n===1?'':'s')+'</span>'
      + (next ? ' <span class="book-more">Continues at '+esc(levelInfo(next).name)+'</span>' : '')
      + '</button>';
  }).join('') + '</div>';
}
function trainDoorsHTML(n, sub){
  const doors = [['read', readLabel(n, sub)], ['cards', 'Flashcards'], ['quiz', 'Quiz'], ['hands', handsLabel(n, sub)]];
  return doors.filter(function(d){ return trainTarget(d[0], n, sub); })
    .map(function(d){ return '<button class="train" data-act="train" data-m="'+d[0]+'" data-n="'+n+'" data-s="'+sub+'">'+esc(d[1])+'</button>'; }).join('');
}
function renderLevel(){
  if(state.lt) return renderLevelTest();
  const n = state.level.n || (typeof chosenLevel === 'function' ? chosenLevel() : firstUnmetLevel());
  state.level.n = n;
  const info = levelInfo(n);
  const p = levelProgress(n);
  const here = (typeof chosenLevel === 'function' ? chosenLevel() : firstUnmetLevel()) === n;
  const switcher = '<nav class="lv-switch" aria-label="The four levels">' + LEVELS.map(function(l){
    return '<button class="chip'+(l.n===n?' on':'')+'" data-act="level-open" data-n="'+l.n+'"'+(l.n===n?' aria-current="page"':'')+'>'+esc(l.name)+'</button>';
  }).join('') + '</nav>';
  /* the page, top to bottom (the consolidation, 4 October 2026): the name,
     what it asks, where you stand; Today's study; My restaurant; a search;
     what the level holds, closed; and the other levels at the foot, so
     Today's study is in the first screen at 390 by 844 (js/ui-nav.js) */
  const blocks = typeof todayStudyHTML === 'function'
    ? todayStudyHTML(n) + myRestaurantHTML() + levelSearchHTML() + levelHoldsHTML(n)
    : '';
  return '<div class="col level-page">'
    + '<h2 class="lv-title" tabindex="-1">'+esc(info.name)+'</h2>'
    + '<p class="lv-blurb">'+esc(info.blurb)+'</p>'
    + '<p class="lv-statline">'+esc(p.label)+(here ? ' · <span class="lv-here">Your level</span>' : '')+'</p>'
    + blocks
    + '<section class="lv-block" aria-labelledby="lv-other-h"><h3 class="sub-head" id="lv-other-h">Another level</h3>' + switcher + '</section>'
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
  const head = '<h2 class="lv-title">The '+esc(info.name)+' test</h2>';
  if(t.none){
    return '<div class="col level-page">'+head
      + '<div class="panel p5 small dim lh">This level cannot deal its test yet.</div></div>';
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
        /* the card to restudy, or where it is read (js/ui-nav.js) */
        + (typeof missLinkHTML === 'function' ? '<span class="row">'+missLinkHTML(q)+'</span>' : '')
        + '</li>';
    }).join('');
    return '<div class="col level-page">'+head
      + (t.misses.length
        ? '<div class="panel p5 col"><div class="eyebrow">What got away, with the right answers.</div><ul class="lt-misses">'+rows+'</ul></div>'
        : '<div class="panel p5 tc"><div class="font-display brass2" style="font-size:1.3rem">Nothing got away.</div></div>')
      + '<div class="row center"><button class="btn btn-ghost" data-act="lt-start" data-n="'+t.n+'">Take it again</button></div></div>';
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
    + '<div class="row between tiny dim"><span>Question '+(t.idx+1)+' of '+t.qs.length+' · '+esc(levelSubTitle(q.part))+'</span></div>'
    + '<div class="panel p5 col">'+ltQuestionBodyHTML(q)+'<div class="col-sm">'+opts+'</div>'+after+'</div></div>';
}

/* ---- Mine: the bar, the tools, and the record ---- */
function levelTestsHTML(){
  const L = progress.levels || {};
  const times = function(k){ return k === 1 ? 'taken once' : k === 2 ? 'taken twice' : 'taken ' + k + ' times'; };
  const rows = LEVELS.filter(function(l){ return (L[l.n] || []).length; }).map(function(l){
    const arr = L[l.n], last = arr[arr.length - 1];
    const when = new Date(last.ts).toLocaleDateString(undefined, { day:'numeric', month:'short' });
    return '<div class="hist-row"><span>'+esc(l.name)+'</span><span class="tiny dim">'+times(arr.length)+' · last '+esc(when)+'</span></div>';
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
    + '</div>';
}
/* In the ledger and the four pillars: More's About (the consolidation moved
   them off the record, worded as before) */
function aboutLedgerHTML(){
  const tastings = (progress.tastings || []).length;
  const drillLogs = Object.values(progress.practice || {}).reduce(function(n,a){ return n + (a?a.length:0); }, 0);
  return '<div class="col">'
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
/* More: the record, the tools, the data, the Maître d', settings and about,
   one tap each (js/ui-nav.js moreHTML); the id stays `mine`, so #/mine
   lands here */
function renderMine(){
  if(typeof moreHTML === 'function') return moreHTML();
  return '<div class="col mine"><h2 class="lv-title">More</h2>' + recordHTML() + '</div>';
}

/* ---- the chrome a cluster's tabs carry, in place of the sub-row ---- */
const LIBRARY_SHELF = [['library','The '+COCKTAILS.length],['families','Families'],['shots','Shots'],['na','Zero Proof'],['ontap','On Tap'],['coffee','Coffee & Tea'],['prep','The Prep Room'],['producers','Producers'],['service','Behind the Stick'],['notes','Notes & Glossary'],['videos','Videos']];
/* The one Back on every screen but Home (js/ui-nav.js backRowHTML), then on
   the Library's tabs its heading and scope chip on the root and the shelf of
   the eleven. No screen carries a second way back. */
function clusterChromeHTML(){
  const cl = clusterOf(state.tab);
  const back = typeof backRowHTML === 'function' ? backRowHTML() : '';
  if(cl === 'library'){
    const lv = Number(state.lib.level) || 0;
    const root = state.tab === 'library' && !state.lib.print && typeof scopeChipHTML === 'function'
      ? '<h2 class="lv-title" tabindex="-1">Library</h2>' + scopeChipHTML('library')
        + '<p class="door-line lib-line">'+(lv ? 'Reading for '+esc(levelInfo(lv).name)+'. Nothing here is graded.' : 'Reading for every level. Nothing here is graded.')+'</p>'
      : '';
    return back + root + '<nav class="shelf" aria-label="The Library">' + LIBRARY_SHELF.map(function(t){
      const on = state.tab === t[0];
      return '<button class="tab-btn'+(on?' active':'')+'"'+(on?' aria-current="page"':'')+' data-act="go" data-tab="'+t[0]+'">'+esc(t[1])+'</button>';
    }).join('') + '</nav>';
  }
  return back;
}
