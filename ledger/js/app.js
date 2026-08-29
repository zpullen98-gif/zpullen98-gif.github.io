/* ---------------- RENDER & EVENTS ---------------- */
const prTicks = {};  /* one stopwatch interval per drill id */
const TABS = [['home','Ledger'],['mybar','My Bar'],['families','Families'],['library','Library'],['shots','Shots'],['na','Zero Proof'],['service','Behind the Stick'],['prep','Prep'],['producers','Producers'],['notes','Notes'],['flashcards','Flashcards'],['quiz','Quiz'],['practice','Practice'],['riffs','Riffs'],['tools','Tools']];
/* Announce something to assistive tech. The region is outside #view so it
   survives the innerHTML swap below. */
function say(msg){
  const el = document.getElementById('live');
  if(!el || !msg) return;
  el.textContent = '';                 /* force a change even if the text repeats */
  setTimeout(() => { el.textContent = msg; }, 30);
}

/* Every control carries a unique data-act/data-i/data-tab signature, so we can
   find "the same button" again after the DOM is rebuilt. Without this, render()
   destroys the focused element and the next Tab restarts from the masthead,
   which on a 365-row library is hundreds of presses. */
function focusSignature(el){
  if(!el || el === document.body) return null;
  const d = el.dataset || {};
  /* selects and inputs have no data-act but do have stable ids: without
     this, every filter change dropped focus to <body> and arrow-browsing a
     select was impossible */
  if(!d.act && !d.tab && !d.cluster) return el.id ? '#' + (window.CSS && CSS.escape ? CSS.escape(el.id) : el.id) : null;
  return ['act','tab','cluster','i','k','d','s','m','c','f','v','t','id','n']
    .filter(k => d[k] !== undefined)
    .map(k => '[data-' + k + '="' + String(d[k]).replace(/"/g, '\\"') + '"]')
    .join('');
}

function render(){
  const sig = focusSignature(document.activeElement);
  renderNav();
  syncRoute();
  const view = document.getElementById('view');
  view.innerHTML = ({home:renderHome, mybar:renderMyBar, families:renderFamilies, library:renderLibrary,
    shots:renderShots, na:renderNA, service:renderService, producers:renderProducers, prep:renderPrep,
    flashcards:renderFlashcards, quiz:renderQuiz, riffs:renderRiffs,
    practice:renderPractice, tools:renderTools, notes:renderNotes})[state.tab]();
  if(sig){
    let back = null;
    try{ back = document.querySelector(sig); }catch(e){}
    /* !back.disabled: focus() on a disabled control is a spec-defined no-op,
       so the designed fallback below was unreachable on the app's single most
       repeated act: answering a question disables the tapped option, the
       signature still matches it, and a Tab user restarted from the masthead
       after EVERY answer. A disabled match is a gone control. */
    if(back && back.focus && !back.disabled) back.focus();
    else view.focus();                 /* the control is gone: land in the view, not at the top */
  }
  /* bring whatever the user just opened into sight */
  const opened = document.querySelector('[data-open="1"]');
  if(opened && opened.scrollIntoView) opened.scrollIntoView({ block:'center' });
  const tc = document.getElementById('tst-cat');
  if(tc) tc.addEventListener('change', e => {
    /* snapshot the typed fields BEFORE the render eats them: the click
       handler's capture never runs for a select's change event */
    const l = document.getElementById('tst-label'); if(l) state.tast.label = l.value;
    const n = document.getElementById('tst-notes'); if(n) state.tast.notes = n.value;
    state.tast.cat = e.target.value; state.tast.nose = []; render();
  });
  /* Targeted repaints, the batch-out pattern: a render() per keystroke
     replaced the focused input after ONE character and the next keystroke
     went to <body>. The output block repaints; the input the user is typing
     in survives untouched. */
  [['conv-val','convVal','conv-out'],['cost-price','bottlePrice','cost-out'],['cost-ml','bottleMl','cost-out'],['cost-target','targetPour','cost-out']].forEach(function(o){
    const el2 = document.getElementById(o[0]);
    if(el2) el2.addEventListener('input', function(e){
      state.tools[o[1]] = e.target.value;
      const out = document.getElementById(o[2]);
      if(out) out.innerHTML = (o[2]==='conv-out' ? convOutHTML() : costTicketHTML());
      else render();
    });
  });
  const sd = document.getElementById('shot-drink');
  if(sd) sd.addEventListener('change', e => { state.shots.rDrink = Number(e.target.value); render(); });
  const sc = document.getElementById('shot-count');
  if(sc) sc.addEventListener('input', e => {
    state.shots.rCount = Math.max(1, Math.min(30, Number(e.target.value)||1));
    const out = document.getElementById('shot-round-out');
    if(out) out.innerHTML = shotRoundHTML();
  });
  const td = document.getElementById('tool-drink');
  if(td) td.addEventListener('change', e => { state.tools.drink = Number(e.target.value); render(); });
  const bd = document.getElementById('bar-drink');
  if(bd) bd.addEventListener('change', e => { state.tools.barDrink = Number(e.target.value); render(); });
  const ts = document.getElementById('tool-serv');
  if(ts) ts.addEventListener('input', e => {
    state.tools.serv = Math.max(1, Math.min(200, Number(e.target.value)||1));
    const out = document.getElementById('batch-out');
    if(out) out.innerHTML = batchOutHTML();
  });
  [['fc-family','fc','family'],['fc-spirit','fc','spirit'],['fc-tier','fc','tier'],['lib-tier','lib','tier']].forEach(([id,obj,key]) => {
    const sel = document.getElementById(id);
    if(sel) sel.addEventListener('change', e => {
      state[obj][key] = e.target.value;
      if(obj==='lib') state.lib.open = null;
      render();
    });
  });
  const impF = document.getElementById('data-import-file');
  if(impF){
    impF.addEventListener('change', e => { if(e.target.files[0]) dataImport(e.target.files[0]); });
    fillStorageLine();
  }
  const search = document.getElementById('lib-search');
  if(search){
    search.addEventListener('input', e => {
      state.lib.q = e.target.value; state.lib.open = null;
      syncRoute();
      document.getElementById('lib-list').innerHTML = libListHTML();
      document.getElementById('lib-count').textContent = libList().length + ' drinks';
    });
  }
}

/* ---------------- NAV EVENTS (clusters, bottom nav, sheet, search) ---------------- */
function navClick(e){
  const sc = e.target.closest('[data-search]');
  if(sc){ openSearch(); return; }
  const cl = e.target.closest('[data-cluster]');
  if(cl){
    const ck = cl.dataset.cluster;
    const tabs = NAV_CLUSTERS.find(([k]) => k===ck)[2];
    if(tabs.length === 1){ state.tab = tabs[0]; state.sheet = null; }
    else if(window.matchMedia('(max-width: 639px)').matches){
      state.sheet = state.sheet===ck ? null : ck;
    } else {
      state.tab = (state.lastSub && state.lastSub[ck]) || tabs[0];
      state.sheet = null;
    }
    render(); return;
  }
  const b = e.target.closest('[data-tab]');
  if(b){
    state.tab = b.dataset.tab;
    state.sheet = null;
    if(!state.lastSub) state.lastSub = {};
    state.lastSub[clusterOf(state.tab)] = state.tab;
    render();
  }
}
document.getElementById('tabs').addEventListener('click', navClick);
document.getElementById('bnav').addEventListener('click', navClick);
document.getElementById('sheet').addEventListener('click', e => {
  if(e.target.closest('[data-sheet-close]')){ state.sheet = null; render(); return; }
  navClick(e);
});
document.getElementById('search-ol').addEventListener('click', e => {
  const row = e.target.closest('[data-hash]');
  if(row){ gotoHash(row.dataset.hash); return; }
  if(e.target.closest('[data-search-close]')) closeSearch();
});

window.addEventListener('hashchange', () => { if(applyRoute()) render(); });

/* ---------------- KEYBOARD SHORTCUTS ---------------- */
document.addEventListener('keydown', e => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
  if(search.open){
    if(e.key === 'Escape'){ closeSearch(); e.preventDefault(); }
    else if(e.key === 'ArrowDown'){ search.sel++; renderSearch(); e.preventDefault(); }
    else if(e.key === 'ArrowUp'){ search.sel = Math.max(0, search.sel-1); renderSearch(); e.preventDefault(); }
    else if(e.key === 'Enter'){
      /* if the user tabbed to a row, honour THAT row, not the arrow highlight */
      const row = (e.target.closest && e.target.closest('.search-row')) || document.querySelector('.search-row.sel');
      if(row) gotoHash(row.dataset.hash);
      e.preventDefault();
    }
    return;
  }
  if(typing) return;
  if(e.key === '/'){ openSearch(); e.preventDefault(); return; }
  if(e.key === 'Escape' && state.sheet){ state.sheet = null; render(); return; }
  const click = sel => { const b = document.querySelector(sel); if(b){ b.click(); e.preventDefault(); return true; } return false; };
  if(state.tab==='flashcards' && state.fc.stage==='run'){
    if(e.key === ' ') {
      /* a focused button owns its own Space: the global flip was hijacking
         grade/pick/toggle activations and dead-ending cloze and service */
      const a = document.activeElement;
      if(a && a.closest && a.closest('button')) return;
      click('[data-act="fc-flip"]') || click('[data-act="fc-next"]');
      e.preventDefault(); return;
    }
    if(e.key === 'ArrowRight'){ if(click('[data-act="fc-grade"][data-ok="1"]')) return; }
    if(e.key === 'ArrowLeft'){ if(click('[data-act="fc-grade"][data-ok="0"]')) return; }
  }
  if(state.tab==='quiz' && state.quiz.stage==='run'){
    if(/^[1-4]$/.test(e.key)){
      const opts = document.querySelectorAll('[data-act="quiz-pick"]');
      const b = opts[Number(e.key)-1]; if(b) b.click();
      e.preventDefault(); return;
    }
    if(e.key === 'Enter' || e.key === ' '){
      const a = document.activeElement;
      if(a && a.closest && a.closest('button')) return;   /* native activation wins */
      click('[data-act="quiz-next"]');
      e.preventDefault();
    }
    return;
  }
  if(/^[1-4]$/.test(e.key)){
    const [ck,,tabs] = NAV_CLUSTERS[Number(e.key)-1];
    state.tab = (state.lastSub && state.lastSub[ck]) || tabs[0];
    state.sheet = null;
    render();
  }
});

document.getElementById('view').addEventListener('click', e => {
  if(e.target.closest('[data-search]')){ openSearch(); return; }
  const el = e.target.closest('[data-act]'); if(!el) return;
  const act = el.dataset.act;
  const _tn = document.getElementById('tst-notes'); if(_tn) state.tast.notes = _tn.value;
  const _tl = document.getElementById('tst-label'); if(_tl) state.tast.label = _tl.value;
  /* same rule for the My Bar form: render() destroys the inputs, so any act
     that repaints mid-edit must read them back into state first */
  if(state.mybar && state.mybar.form) captureBarForm();
  const fc = state.fc, z = state.quiz;
  if(act==='go'){ state.tab = el.dataset.tab;
    /* optional deep links, so "Quiz your list" opens the quiz ON the list
       instead of leaving the promise at the tab door */
    if(el.dataset.view) state.practice.view = el.dataset.view;
    if(el.dataset.mode){ state.quiz.mode = el.dataset.mode; state.quiz.stage = 'setup'; }
    if(el.dataset.src){ state.fc.src = el.dataset.src; state.fc.family='All'; state.fc.spirit='All'; state.fc.tier='All'; state.fc.stage = 'setup'; }
  }
  else if(act==='fam-open'){ state.famOpen = state.famOpen===el.dataset.fam ? null : el.dataset.fam; }
  else if(act==='fam-goto'){ state.lib = { q:'', fam:el.dataset.fam, tier:'All', open:null }; state.tab='library'; }
  else if(act==='lib-fam'){ state.lib.fam = el.dataset.fam; state.lib.open=null; }
  else if(act==='lib-toggle'){ const i=Number(el.dataset.i); state.lib.open = state.lib.open===i ? null : i; }
  else if(act==='lib-print'){ state.lib.print = true; }
  else if(act==='lib-print-go'){ window.print(); return; }
  else if(act==='lib-print-close'){ state.lib.print = false; }
  else if(act==='fc-drill-weak'){
    const key = el.dataset.k;
    const card = allDrinks().filter(d => cardKey(d) === key);
    if(card.length){
      state.tab = 'flashcards';
      Object.assign(fc, { stage:'run', mode:'name2spec', deck:card, idx:0, right:0, wrong:0, missed:[] });
      prepCard();
    } }
  else if(act==='fc-src'){
    fc.src = el.dataset.s; fc.family = 'All'; fc.spirit = 'All';
    if(fc.src!=='Cocktails' && fc.src!=='All') fc.tier = 'All'; }
  else if(act==='fc-board-src'){ fc.boardSrc = el.dataset.s; fc.boardOpen = null; }
  else if(act==='fc-special'){ fc.special = el.dataset.s; }
  else if(act==='fc-smart'){ fc.smart = !fc.smart; }
  else if(act==='fc-board'){ fc.stage='board'; fc.boardOpen=null; }
  else if(act==='fc-board-open'){ const i=Number(el.dataset.i); fc.boardOpen = fc.boardOpen===i ? null : i; }
  else if(act==='fc-reset'){
    if(confirm('Reset all flashcard records? Your quiz history will be kept.')){
      progress.cards = {}; saveProgress();
    } }
  else if(act==='fc-start'){
    const pool = fcPool(); if(!pool.length) return;
    const deck = fc.smart ? pool.slice().sort(function(a,b){ return weakScore(cardKey(b))-weakScore(cardKey(a)); }) : shuffle(pool);
    Object.assign(fc, { stage:'run', mode:el.dataset.mode, deck:deck, idx:0, right:0, wrong:0, missed:[] });
    prepCard(); }
  else if(act==='fc-rerun-miss'){
    const all = allDrinks();
    const deck = shuffle(fc.missed.map(function(k){
      return all.filter(function(d){ return cardKey(d)===k; })[0];
    }).filter(Boolean));
    if(!deck.length) return;
    Object.assign(fc, { stage:'run', deck:deck, idx:0, right:0, wrong:0, missed:[] });
    prepCard(); }
  else if(act==='fc-flip'){ fc.flipped = true; }
  else if(act==='fc-grade'){
    say(el.dataset.ok==='1' ? 'Marked correct.' : 'Marked missed.');
    recordCard(el.dataset.ok==='1');
    fc.idx++; prepCard(); }
  else if(act==='fc-toggle-line'){
    if(!fc.checked){ const i=Number(el.dataset.i); const p=fc.sel.indexOf(i);
      if(p>=0) fc.sel.splice(p,1); else fc.sel.push(i); } }
  else if(act==='fc-check'){
    if(!fc.checked && fc.sel.length){
      const required = fc.pool.map((p,i)=>(p.ok && !p.opt)?i:-1).filter(i=>i>=0);
      const decoys   = fc.pool.map((p,i)=>p.ok?-1:i).filter(i=>i>=0);
      const ok = required.every(i=>fc.sel.includes(i)) && !decoys.some(i=>fc.sel.includes(i));
      recordCard(ok); fc.lastOk = ok; fc.checked = true; } }
  else if(act==='fc-cloze-pick'){
    if(fc.picked===null){
      fc.picked = Number(el.dataset.i);
      const ok = fc.opts[fc.picked] === fc.deck[fc.idx].spec[fc.clozeIdx];
      recordCard(ok); fc.lastOk = ok; } }
  else if(act==='fc-svc-pick'){
    const s = fc.svc;
    if(s && s.picked[el.dataset.f] === undefined){
      s.picked[el.dataset.f] = Number(el.dataset.i);
      if(s.fields.every(f => s.picked[f] !== undefined)){
        const c = fc.deck[fc.idx];
        const ok = s.fields.every(f => s.opts[f][s.picked[f]] === (s.keyed && s.keyed[f] ? s.keyed[f](c[f]) : c[f]));
        recordCard(ok); fc.lastOk = ok;
        say(ok ? 'All three correct.' : 'Not clean: check the reveal.');
      }
    } }
  else if(act==='fc-next'){ fc.idx++; prepCard(); }
  else if(act==='fc-quit'){ fc.stage='setup'; if(state.sess) state.sess.active = false; }
  else if(act==='sess-start'){ startSession(); }
  else if(act==='sess-quiz'){
    state.sess.step = 'quiz';
    state.tab = 'quiz';
    /* quiz the deck you just drilled, not the whole 365-drink canon */
    Object.assign(state.quiz, { stage:'run', mode:'mixed', round:buildRound('mixed', state.fc.deck), idx:0, picked:null, score:0, missedQ:[], replay:false });
  }
  else if(act==='sess-resume'){
    const st = state.sess.step;
    state.tab = st==='cards' ? 'flashcards' : st==='quiz' ? 'quiz' : 'practice';
    if(st==='drill') state.practice.view = 'drills'; }
  else if(act==='sess-drill'){
    say('Quiz done. Last step: the drill.');
    state.sess.step = 'drill';
    state.quiz.stage = 'setup';
    state.tab = 'practice';
    state.practice.view = 'drills';
  }
  else if(act==='sess-nobar'){
    recordSessionComplete(false, state.sess && state.sess.night);
    state.sess.active = false;
    state.tab = 'home';
  }
  else if(act==='sess-hands'){
    state.sess = { active:true, step:'drill', night: dateKey(0) };
    state.tab = 'practice';
    state.practice.view = 'drills';
  }
  else if(act==='sess-end'){
    state.sess.active = false;
    state.fc.stage = 'setup';
    state.tab = 'home';
  }
  else if(act==='quiz-mode'){ z.mode = el.dataset.m; }
  else if(act==='quiz-quit'){ z.stage='setup'; if(state.sess) state.sess.active=false; }
  else if(act==='quiz-start'){ Object.assign(z, { stage:'run', round:buildRound(z.mode), idx:0, picked:null, score:0, missedQ:[], replay:false }); }
  else if(act==='quiz-pick'){
    if(z.picked!==null) return;
    z.picked = Number(el.dataset.i);
    const q = z.round[z.idx];
    const right = q.options[z.picked]===q.answer;
    if(right) z.score++;
    else z.missedQ.push(q);
    say((right ? 'Correct. ' : 'Not quite. The answer is ' + q.answer + '. ') + (q.explain||'')); }
  else if(act==='quiz-next'){
    if(z.idx+1 >= z.round.length){
      /* replays re-ask only the questions you already missed, so logging them
         as ordinary rounds inflates the dashboard trend most for the learner
         who is struggling most */
      progress.quizzes = [...(progress.quizzes||[]), { date:new Date().toLocaleDateString(), ts:Date.now(),
        score:z.score, total:z.round.length, mode:z.mode||'mixed', replay: !!z.replay }].slice(-20);
      saveProgress();
      /* cards + quiz banks the night even if the drill never happens: without
         this, closing the tab here loses the streak entirely */
      if(state.sess && state.sess.active && state.sess.step==='quiz') recordSessionComplete(false, state.sess.night);
      z.stage = 'done';
    } else { z.idx++; z.picked = null; } }
  else if(act==='quiz-replay'){
    if(z.missedQ.length){
      Object.assign(z, { stage:'run', round:shuffle(z.missedQ), idx:0, picked:null, score:0, missedQ:[], replay:true });
    } }
  else if(act==='riff-frame'){ state.riff.frame = RIFFS[Number(el.dataset.f)]; state.riff.critique = false; dealRiff(); }
  else if(act==='riff-deal'){ state.riff.critique = false; dealRiff(); }
  else if(act==='riff-reveal'){ state.riff.revealed = true; }
  else if(act==='riff-back'){ state.riff.frame = null; state.riff.deal = null; state.riff.critique = false; }
  else if(act==='riff-critique'){ state.riff.critique = true; }
  else if(act==='pr-view'){ state.practice.view = el.dataset.v; }
  else if(act==='pr-flight'){ const i=Number(el.dataset.i); state.practice.flightOpen = state.practice.flightOpen===i ? null : i; }
  else if(act==='pr-method'){ state.practice.methodOpen = state.practice.methodOpen===el.dataset.t ? null : el.dataset.t; }
  else if(act==='tst-app'){ state.tast.appearance = state.tast.appearance===el.dataset.v ? null : el.dataset.v; }
  else if(act==='tst-nose'){
    const v = el.dataset.v; const i = state.tast.nose.indexOf(v);
    if(i>=0) state.tast.nose.splice(i,1); else state.tast.nose.push(v); }
  else if(act==='tst-axis'){
    const k = el.dataset.k, v = Number(el.dataset.v);
    state.tast.palate[k] = state.tast.palate[k]===v ? null : v; }
  else if(act==='tst-finish'){ state.tast.finish = state.tast.finish===el.dataset.v ? null : el.dataset.v; }
  else if(act==='tst-clear'){
    state.tast = { cat:state.tast.cat, label:'', appearance:null, nose:[], palate:{}, finish:null, notes:'' }; }
  else if(act==='tst-save'){
    const t = state.tast;
    if(!t.nose.length && !t.notes && !t.appearance) return;
    if(!progress.tastings) progress.tastings = [];
    progress.tastings.push({ date:new Date().toLocaleDateString(), ts:Date.now(), cat:t.cat, label:t.label||'(unnamed)',
      appearance:t.appearance, nose:[...t.nose], palate:{...t.palate}, finish:t.finish, notes:t.notes });
    progress.tastings = progress.tastings.slice(-100);
    saveProgress();
    state.tast = { cat:t.cat, label:'', appearance:null, nose:[], palate:{}, finish:null, notes:'' }; }
  else if(act==='tst-open'){ const i=Number(el.dataset.i); state.practice.noteOpen = state.practice.noteOpen===i ? null : i; }
  else if(act==='tst-del'){
    const i=Number(el.dataset.i);
    if(progress.tastings && progress.tastings[i]){ progress.tastings.splice(i,1); saveProgress(); }
    state.practice.noteOpen = null; }
  else if(act==='rail-deal'){ state.practice.rail = { deck: railDeal(), revealed:false }; }
  else if(act==='hold-deal'){
    const band = state.practice.holdBand || 8;
    const h = holdDeal(band);
    state.practice.hold = h;
    setTimeout(() => holdFlip(h.nonce), band * 1000);
  }
  else if(act==='hold-band'){ state.practice.holdBand = Number(el.dataset.b) || 8;
    if(state.practice.hold && state.practice.hold.phase !== 'show'){ /* applies to the next deal */ } }
  else if(act==='hold-got'){ if(state.practice.hold){ state.practice.hold.phase = 'recall'; } }
  else if(act==='hold-pick'){
    const h = state.practice.hold;
    if(h && h.phase === 'recall'){
      const n = el.dataset.n; h.picks = h.picks || [];
      const i = h.picks.indexOf(n);
      if(i >= 0){ h.picks.splice(i, 1); if(h.modPick === n) h.modPick = null; }
      else if(h.picks.length < 4) h.picks.push(n);
    } }
  else if(act==='hold-mod'){ const h = state.practice.hold; if(h) h.modPick = el.dataset.n; }
  else if(act==='hold-check'){
    const h = state.practice.hold;
    if(h && h.phase === 'recall' && (h.picks||[]).length === 4 && (!h.mod || h.modPick)){
      const dealt = h.deck.map(e => e.name);
      let v = h.picks.filter(n => dealt.indexOf(n) >= 0).length;
      const of = h.mod ? 5 : 4;
      if(h.mod && h.modPick === h.mod.drink) v += 1;
      h.phase = 'done';
      h.scored = { v: v, of: of };
      if(!progress.practice) progress.practice = {};
      const arr = progress.practice.hold || [];
      arr.push({ d:new Date().toLocaleDateString(), ts:Date.now(), v:v, of:of });
      progress.practice.hold = arr.slice(-20);
      saveProgress();
      say(v + ' of ' + of + ' held.');
    } }
  else if(act==='pour-target'){ state.practice.pourTarget = Number(el.dataset.t) || 1.5; }
  else if(act==='cost-src'){ state.tools.costSrc = el.dataset.s; }
  else if(act==='spill-reason'){ state.tools.spillReason = el.dataset.r; }
  else if(act==='spill-log'){
    const what = (document.getElementById('spill-what')||{}).value || '';
    const costRaw = (document.getElementById('spill-cost')||{}).value;
    const cost = parseFloat(costRaw);
    if(what.trim()){
      if(!progress.spills) progress.spills = [];
      progress.spills.push({ ts:Date.now(), d:new Date().toLocaleDateString(),
        what:what.trim(), reason:state.tools.spillReason || 'remake',
        ...(isFinite(cost) && cost > 0 ? { cost:cost } : {}) });
      progress.spills = progress.spills.slice(-200);
      saveProgress();
      state.tools.spillWhat = ''; state.tools.spillCost = '';
      say('Logged \u2014 '+what.trim()+'.');
    } else {
      say('Nothing logged \u2014 say what went in the bin first.');
    }
  }
  else if(act==='spill-del'){
    progress.spills = (progress.spills||[]).filter(e => e.ts !== Number(el.dataset.ts));
    saveProgress();
  }
  else if(act==='ob-add'){
    const name = (document.getElementById('ob-name')||{}).value || '';
    const kind = (document.getElementById('ob-kind')||{}).value || 'vermouth';
    const daysAgo = Math.max(0, Math.min(365, Number((document.getElementById('ob-days')||{}).value) || 0));
    if(name.trim()){
      if(!progress.openBottles) progress.openBottles = [];
      let id = 'ob-'; while(id.length < 10) id += Math.floor(Math.random()*36).toString(36);
      progress.openBottles.push({ id:id, name:name.trim(), kind:kind, at:Date.now() - daysAgo*864e5 });
      progress.openBottles = progress.openBottles.slice(-60);
      saveProgress();
      state.tools.obName = ''; state.tools.obDays = '';
      say('Dated \u2014 '+name.trim()+'.');
    } else {
      say('Nothing dated \u2014 name the bottle first.');
    }
  }
  else if(act==='ob-del'){
    progress.openBottles = (progress.openBottles||[]).filter(b => b.id !== el.dataset.id);
    saveProgress();
  }
  else if(act==='cost-use-bottle'){
    const bk = (progress.bottles||[]).find(x => x.name === el.dataset.name);
    if(bk){ state.tools.bottlePrice = bk.price; state.tools.bottleMl = bk.sizeMl; }
  }
  else if(act==='cost-file-bottle'){
    const nameEl = document.getElementById('cost-bottle-name');
    /* read at file time, never on input: a re-render per keystroke would eat
       the field out from under the typist */
    if(recordBottle(nameEl && nameEl.value, state.tools.bottlePrice, state.tools.bottleMl)){
      saveProgress();
      state.tools.bottleName = '';
      say('Filed at $'+(Number(state.tools.bottlePrice)||0).toFixed(2)+'.');
    } else {
      say('Not filed \u2014 the book needs a name, a price, and a size.');
    }
  }
  else if(act==='pour-log'){
    const input = document.getElementById('pour-oz');
    const oz = parseFloat(input && input.value);
    const target = state.practice.pourTarget || 1.5;
    /* refuse what cannot be a pour: blank, zero, negative, or a glassful */
    if(!isNaN(oz) && oz > 0 && oz < 8){
      if(!progress.pours) progress.pours = [];
      progress.pours.push({ d:new Date().toLocaleDateString(), ts:Date.now(), target:target, oz:oz });
      progress.pours = progress.pours.slice(-100);
      saveProgress();
      state.practice.pourOz = '';
      say('Logged '+oz.toFixed(2)+' ounces against '+target+'.');
    } else {
      say('Not logged \u2014 measure the pour and enter the ounces.');
    }
  }
  else if(act==='rail-called'){ if(state.practice.rail) state.practice.rail.called = el.dataset.ok==='1'; }
  else if(act==='rail-tap'){
    const r = state.practice.rail;
    if(r && !r.revealed){
      const i = Number(el.dataset.i);
      r.taps = r.taps || [];
      const at = r.taps.indexOf(i);
      if(at >= 0) r.taps.splice(at, 1);   /* tap again to un-pick */
      else r.taps.push(i);
      if(r.taps.length === r.deck.length){
        /* grade: consecutive stage ranks may never DECREASE: equal ranks
           accept either order, because the rail does not care which of two
           sours you shake first */
        const ds = r.taps.map(ix => railResolve(r.deck[ix])).filter(Boolean);
        let ok = true, miss = '';
        for(let k = 1; k < ds.length; k++){
          if(railStage(ds[k]).rank < railStage(ds[k-1]).rank){
            ok = false;
            miss = ds[k].name + ' starts before ' + ds[k-1].name;
            break;
          }
        }
        r.autoCalled = ok; r.tapMiss = miss;
        r.called = ok;        /* feeds the same log the honesty buttons feed */
        r.revealed = true;
      }
    }
  }
  else if(act==='rail-reveal'){ if(state.practice.rail) state.practice.rail.revealed = true; }
  else if(act==='pr-deal'){
    const id = el.dataset.id;
    const d = DRILLS.find(x => x.id===id);
    if(d && d.pick){
      /* one per family first, so a Speed Round can't be four sours you like */
      const byFam = {};
      shuffle(COCKTAILS.filter(c => c.tier<=4)).forEach(c => { if(!byFam[c.family]) byFam[c.family]=c; });
      const spread = shuffle(Object.values(byFam));
      const picks = spread.slice(0, d.pick);
      while(picks.length < d.pick){
        const extra = sample(COCKTAILS.filter(c => c.tier<=4 && !picks.some(p=>p.name===c.name)),1)[0];
        if(!extra) break;
        picks.push(extra);
      }
      if(!state.practice.subjects) state.practice.subjects = {};
      state.practice.subjects[id] = picks.map(c => c.name);
    } }
  else if(act==='pr-timer'){
    const id = el.dataset.id;
    if(!state.practice.timers) state.practice.timers = {};
    const t = state.practice.timers;
    if(t[id]){
      const secs = Math.round((Date.now() - t[id]) / 100) / 10;
      delete t[id];
      const input = document.getElementById('pr-in-'+id);
      if(input) input.value = secs;
      (state.practice.drillIn = state.practice.drillIn || {})[id] = String(secs);
      if(prTicks[id]){ clearInterval(prTicks[id]); delete prTicks[id]; }
      el.textContent = 'Start';
      const disp = document.getElementById('pr-timer-'+id);
      if(disp) disp.classList.remove('running');
      return;
    }
    t[id] = Date.now();
    el.textContent = '0.0: Stop';
    el.classList.add('running');
    if(prTicks[id]) clearInterval(prTicks[id]);
    prTicks[id] = setInterval(() => {
      const btn = document.getElementById('pr-timer-'+id);
      if(!btn || !state.practice.timers[id]){ clearInterval(prTicks[id]); delete prTicks[id]; return; }
      btn.textContent = ((Date.now()-state.practice.timers[id])/1000).toFixed(1) + ': Stop';
    }, 100);
    return; }
  else if(act==='pr-log'){
    const id = el.dataset.id;
    const input = document.getElementById('pr-in-'+id);
    const v = parseFloat(input && input.value);
    /* Zero and negatives: a 0-second speed round or a -3 would become the
       permanent unbeatable best on every low-is-better drill. */
    const dd = DRILLS.find(x => x.id === id);
    if(isNaN(v) || v < 0 || (v === 0 && dd && dd.dir === 'low')) return;
    if(!progress.practice) progress.practice = {};
    const arr = progress.practice[id] || [];
    const entry = { d:new Date().toLocaleDateString(), ts:Date.now(), v:v };
    if(id === 'rail' && state.practice.rail && state.practice.rail.called !== undefined){
      entry.ok = state.practice.rail.called;
    }
    arr.push(entry);
    progress.practice[id] = arr.slice(-20);
    if(state.practice.drillIn) delete state.practice.drillIn[id];
    saveProgress();
    /* a logged drill is what upgrades tonight from recitation to hands:
       whether you took the session's own door or walked in through the nav */
    const sessDrillReady = state.sess && state.sess.active &&
      (state.sess.step==='drill' || (state.sess.step==='quiz' && state.quiz.stage==='done'));
    if(sessDrillReady){
      recordSessionComplete(true, state.sess.night);
      state.sess.active = false;
      state.tab = 'home';
    } else if(sessionDoneToday() && !handsDoneToday()){
      recordSessionComplete(true, (progress.streakData||{}).last);
    } }
  else if(act==='tool-view'){ state.tools.view = el.dataset.v; }
  else if(act==='data-export'){ dataExport(); return; }
  else if(act==='data-persist'){ requestPersistence(); return; }
  else if(act==='shelf-src'){ state.tools.shelfSrc = el.dataset.s; }
  else if(act==='shelf-mode'){ state.tools.eightySix = el.dataset.m==='86' ? '' : null; }
  else if(act==='shelf-86'){ state.tools.eightySix = state.tools.eightySix===el.dataset.k ? '' : el.dataset.k; }
  else if(act==='conv-unit'){ state.tools.convFrom = el.dataset.u; }
  else if(act==='dil-pct'){ state.tools.dilPct = Number(el.dataset.v); }
  else if(act==='tool-dilute'){ state.tools.dilute = !state.tools.dilute; }
  else if(act==='tool-preset'){
    const p = SHELF_PRESETS[Number(el.dataset.i)] || SHELF_PRESETS[0];
    state.tools.shelf = p[1].slice();
    progress.shelf = state.tools.shelf.slice(); saveProgress(); }
  else if(act==='tool-clear'){ state.tools.shelf = []; progress.shelf = []; saveProgress(); }
  else if(act==='shelf-toggle'){
    const k = el.dataset.k; const s = state.tools.shelf;
    const p = s.indexOf(k); if(p>=0) s.splice(p,1); else s.push(k);
    progress.shelf = s.slice(); saveProgress(); }
  else if(act==='tool-open'){
    const i = Number(el.dataset.i);
    state.lib = { q:'', fam:'All', tier:'All', open:i };
    state.tab = 'library'; }
  else if(act==='prep-cat'){ state.prep.cat = el.dataset.c; state.prep.open = null; }
  else if(act==='prep-open'){ const i=Number(el.dataset.i); state.prep.open = state.prep.open===i ? null : i; }
  else if(act==='prep-list'){ state.prep.listOpen = state.prep.listOpen===el.dataset.t ? null : el.dataset.t; }
  else if(act==='prep-safe'){ state.prep.safeOpen = state.prep.safeOpen===el.dataset.t ? null : el.dataset.t; }
  else if(act==='prod-cat'){ state.prod.cat = el.dataset.c; state.prod.open = null; state.prod.primerOpen = null; }
  else if(act==='prod-open'){ const i=Number(el.dataset.i); state.prod.open = state.prod.open===i ? null : i; }
  else if(act==='prod-primer'){ state.prod.primerOpen = state.prod.primerOpen===el.dataset.t ? null : el.dataset.t; }
  else if(act==='na-view'){ state.na.view = el.dataset.v; state.na.open = null; }
  else if(act==='na-cat'){ state.na.cat = el.dataset.c; state.na.open = null; }
  else if(act==='na-toggle'){ const i=Number(el.dataset.i); state.na.open = state.na.open===i ? null : i; }
  else if(act==='na-pantry'){ state.na.pOpen = state.na.pOpen===el.dataset.t ? null : el.dataset.t; }
  else if(act==='na-theory'){ state.na.tOpen = state.na.tOpen===el.dataset.t ? null : el.dataset.t; }
  else if(act==='na-service'){ state.na.sOpen = state.na.sOpen===el.dataset.t ? null : el.dataset.t; }
  else if(act==='na-drill'){
    const pool = NA_DRINKS.map((d,i)=>({d,i})).filter(({d}) => state.na.cat==='All' || d.cat===state.na.cat).map(o=>o.i);
    Object.assign(state.na, { drill:true, order:shuffle(pool), idx:0, revealed:false }); }
  else if(act==='na-flip'){ state.na.revealed = true; }
  else if(act==='na-next'){
    const nn = state.na;
    if(nn.idx+1 >= nn.order.length){ nn.drill=false; } else { nn.idx++; nn.revealed=false; } }
  else if(act==='na-exit'){ state.na.drill = false; }
  else if(act==='shots-view'){ state.shots.view = el.dataset.v; state.shots.open = null; }
  else if(act==='lay-start'){
    const i = Math.floor(Math.random()*LAYERED_BUILDS.length);
    state.shots.lay = { i:i, pool:shuffle(LAYERED_BUILDS[i].layers.map((_,n)=>n)), picks:[] }; }
  else if(act==='lay-pick'){
    const l = state.shots.lay; const i = Number(el.dataset.i);
    if(l && !l.picks.includes(i)) l.picks.push(i); }
  else if(act==='lay-reset'){ if(state.shots.lay) state.shots.lay.picks = []; }
  else if(act==='lay-quit'){ state.shots.lay = null; }
  else if(act==='shots-cat'){ state.shots.cat = el.dataset.c; state.shots.open = null; }
  else if(act==='shots-toggle'){ const i=Number(el.dataset.i); state.shots.open = state.shots.open===i ? null : i; }
  else if(act==='shots-svc'){ state.shots.svc = state.shots.svc===el.dataset.t ? null : el.dataset.t; }
  else if(act==='shots-drill'){
    const pool = SHOTS.map((s,i)=>({s,i})).filter(({s}) => state.shots.cat==='All' || s.cat===state.shots.cat).map(o=>o.i);
    Object.assign(state.shots, { drill:true, order:shuffle(pool), idx:0, revealed:false }); }
  else if(act==='shots-flip'){ state.shots.revealed = true; }
  else if(act==='shots-next'){
    const sh = state.shots;
    if(sh.idx+1 >= sh.order.length){ sh.drill=false; }
    else { sh.idx++; sh.revealed=false; } }
  else if(act==='shots-exit'){ state.shots.drill = false; }
  else if(act==='vid-chan'){
    if(!progress.vidPrefs) progress.vidPrefs = {};
    progress.vidPrefs.channel = el.dataset.c; saveProgress(); }
  else if(act==='vid-len'){
    if(!progress.vidPrefs) progress.vidPrefs = {};
    progress.vidPrefs.longform = el.dataset.v==='long'; saveProgress(); }
  else if(act==='mybar-new'){ state.mybar.form = blankBarForm(); state.mybar.editing = null; }
  else if(act==='mybar-cancel'){ state.mybar.form = null; state.mybar.editing = null; }
  else if(act==='mybar-edit'){
    const b = (progress.bar||[]).find(x => x.id===el.dataset.id);
    if(b){ state.mybar.form = { name:b.name, spec:b.spec.slice(), method:b.method||'', glass:b.glass===''?'':b.glass, garnish:b.garnish===''?'':b.garnish, note:b.note||'', family:b.family||'Other', spirit:b.spirit||'Other', price:b.price||'' };
      state.mybar.editing = b.id; } }
  else if(act==='mybar-del'){
    const b = (progress.bar||[]).find(x => x.id===el.dataset.id);
    if(b && confirm('Remove "'+b.name+'" from My Bar? Its practice record goes with it.')){
      progress.bar = progress.bar.filter(x => x.id!==b.id);
      /* the confirm promises the record goes too: keep the promise, or the
         orphaned key haunts the weakest list, the due counter and every
         backup as a phantom that can never be reviewed */
      delete progress.cards['My Bar · '+b.name];
      if(state.mybar.open===b.id) state.mybar.open = null;
      barChanged(); saveProgress(); say('Removed from My Bar.');
    } }
  else if(act==='mybar-add-line'){ state.mybar.form.spec.push(''); }
  else if(act==='mybar-del-line'){
    state.mybar.form.spec.splice(Number(el.dataset.i), 1);
    if(!state.mybar.form.spec.length) state.mybar.form.spec.push(''); }
  else if(act==='mybar-open'){ state.mybar.open = state.mybar.open===el.dataset.id ? null : el.dataset.id; }
  else if(act==='mybar-save'){
    const f = state.mybar.form;
    const spec = f.spec.map(s => s.trim()).filter(Boolean);
    const clash = (progress.bar||[]).find(x =>
      x.name.toLowerCase() === f.name.trim().toLowerCase() && x.id !== state.mybar.editing);
    if(!f.name.trim() || !spec.length){ say('A drink needs a name and at least one spec line.'); }
    /* the name IS the identity everywhere downstream: the SRS key, the rail
       lookup, the search slug, the import merge, so two drinks cannot share
       one, or they share one practice record and one rail answer too */
    else if(clash){ say('"'+clash.name+'" is already on the list. Rename one of them.'); }
    else {
      const rec = { id: state.mybar.editing || mintBarId(), name:f.name.trim(), spec:spec,
        method:f.method.trim(), glass:f.glass.trim()||'-', garnish:f.garnish.trim()||'-',
        note:f.note.trim(), family:f.family, spirit:f.spirit, price:f.price.trim(), ts:Date.now() };
      if(!progress.bar) progress.bar = [];
      const i = progress.bar.findIndex(x => x.id===rec.id);
      /* a rename must carry the practice record to the new key, not abandon
         it: the SRS keys by name, the drink's history is the drink's */
      if(i >= 0 && progress.bar[i].name !== rec.name){
        const old = 'My Bar · '+progress.bar[i].name;
        if(progress.cards[old]){ progress.cards['My Bar · '+rec.name] = progress.cards[old]; delete progress.cards[old]; }
      }
      if(i < 0) progress.bar.push(rec); else progress.bar[i] = rec;
      state.mybar.form = null; state.mybar.editing = null; state.mybar.open = rec.id;
      barChanged(); saveProgress(); say('Saved to My Bar.');
    } }
  else if(act==='note-open'){ state.noteOpen = state.noteOpen===el.dataset.t ? null : el.dataset.t; }
  else if(act==='svc-dom'){ state.svc.dom = el.dataset.d; state.svc.rowOpen = null; state.svc.refOpen = null; }
  else if(act==='svc-row'){ const i=Number(el.dataset.i); state.svc.rowOpen = state.svc.rowOpen===i ? null : i; }
  else if(act==='svc-ref'){ const n=el.dataset.n; state.svc.refOpen = state.svc.refOpen===n ? null : n; }
  captureLiveInputs();
  render();
});

/* THE CAPTURE RULE, systematised. render() rebuilds the whole view, so any
   text sitting in a live input dies with the DOM unless it is read back into
   state first; captureBarForm learned this for My Bar, and then four new
   forms shipped without it: tapping a reason chip wiped the spill you had
   just described, and picking a pour target ate the ounces you had measured.
   Called before EVERY render from the click handler; the views render these
   fields back out of state, and the log acts clear them on success. */
function captureLiveInputs(){
  const grab = (id, obj, key) => {
    const el2 = document.getElementById(id);
    if(el2 && el2.value !== undefined) obj[key] = el2.value;
  };
  grab('spill-what', state.tools, 'spillWhat');
  grab('spill-cost', state.tools, 'spillCost');
  grab('ob-name',    state.tools, 'obName');
  grab('ob-kind',    state.tools, 'obKind');
  grab('ob-days',    state.tools, 'obDays');
  grab('pour-oz',    state.practice, 'pourOz');
  grab('cost-bottle-name', state.tools, 'bottleName');
  /* every drill result field, by prefix: on the Ticket Rail an intervening
     act (revealing the order) is REQUIRED between typing and logging, so the
     render in between ate the seconds every single time */
  document.querySelectorAll('input[id^="pr-in-"]').forEach(el2 => {
    (state.practice.drillIn = state.practice.drillIn || {})[el2.id.slice(6)] = el2.value;
  });
}

(async () => {
  try{ const raw = await store.get(KEY()); if(raw) progress = JSON.parse(raw); }
  catch(e){
    /* The blob exists and does not parse. The old path discarded it silently
       and the first save overwrote it, the only copy of a year of records,
       gone because one write got truncated. Park it under a sibling key
       BEFORE anything can save, so a hand or a future build can recover it. */
    try{ const raw2 = localStorage.getItem(KEY()); if(raw2) localStorage.setItem(KEY() + '-corrupt-' + Date.now(), raw2); }catch(e2){}
  }
  if(!progress.cards) progress.cards = {};
  if(!progress.quizzes) progress.quizzes = [];
  if(!progress.practice) progress.practice = {};
  if(!progress.tastings) progress.tastings = [];
  if(!progress.vidPrefs) progress.vidPrefs = { channel:'auto', longform:false };
  if(!progress.bar) progress.bar = [];
  if(Array.isArray(progress.shelf)) state.tools.shelf = progress.shelf.slice();
  srsMigrate(progress.cards);
  applyRoute();
  render();
})();

/* ---------------- SERVICE WORKER & UPDATE TOAST ---------------- */
/* ?nosw = dev escape hatch: skips registration AND unregisters any active SW
   (takes effect on the next reload) so stale caches can't mask edits. */
let swWantReload = false;
if('serviceWorker' in navigator){
  if(location.search.includes('nosw')){
    /* getRegistration() (singular) returns only the registration whose scope covers
       this page. getRegistrations() returns EVERY registration on the origin, and
       inside Outside Of Time that is every other wing: one ?nosw visit here would
       have unregistered the Codex, First Light, the Almanac and the World Table too.
       Path-agnostic, so it stays correct wherever the wing is mounted. */
    navigator.serviceWorker.getRegistration().then(r => { if(r) r.unregister(); });
  } else {
    window.addEventListener('load', async () => {
      try{
        const reg = await navigator.serviceWorker.register('sw.js');
        /* an update that reached "waiting" on a previous visit */
        if(reg.waiting && navigator.serviceWorker.controller) showUpdateToast(reg.waiting, reg);
        /* A hash-routed SPA performs no navigations, so the browser never
           re-fetches sw.js on its own: a bar tablet that stays open all week
           would never see another update. Every return to the app checks, and
           an hourly tick covers the always-visible kiosk. Both stay silent
           offline. */
        document.addEventListener('visibilitychange', () => {
          if(document.visibilityState === 'visible') reg.update().catch(() => {});
        });
        setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          if(!nw) return;
          nw.addEventListener('statechange', () => {
            if(nw.state === 'installed' && navigator.serviceWorker.controller){
              showUpdateToast(nw, reg);
            }
          });
        });
        let reloading = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          /* only reload when the user tapped the toast: first-install claim()
             also fires controllerchange and must NOT reload mid-session */
          if(!swWantReload || reloading) return;
          reloading = true; location.reload();
        });
      }catch(e){ /* offline first load or unsupported, fine */ }
    });
  }
}

function showUpdateToast(worker, reg){
  if(document.getElementById('sw-toast')) return;
  const t = document.createElement('button');
  t.id = 'sw-toast';
  t.className = 'sw-toast';
  t.innerHTML = '<span class="font-display">A new edition is pressed</span><span class="tiny dim"> : tap to refresh</span>';
  /* resolve the target at CLICK time: if a second deploy landed while the
     toast sat there, the captured worker is already redundant and a message
     to it does nothing: reg.waiting is always the live one */
  t.addEventListener('click', () => {
    swWantReload = true;
    const w = (reg && reg.waiting) || worker;
    try{ w.postMessage('SKIP_WAITING'); }catch(e){}
  });
  document.body.appendChild(t);
}
