/* ============ CMS Certified 500: engine ============ */
var MOCK_N = 45, MOCK_SECS = 38*60, PASS = 0.60;

var S = {
  view:'home', mode:null, pool:[], idx:0, answered:false,
  correct:0, results:[], picked:null, saText:'', saGraded:null,
  timer:null, remain:MOCK_SECS, section:null
};

/* ---------- helpers ---------- */
function norm(s){
  return (s||'').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9%$ ]/g,' ')
    .replace(/\b(the|a|an|chateau|domaine|de|du|des|la|le)\b/g,' ')
    .replace(/\s+/g,' ').trim();
}
function normNum(s){ return (s||'').toString().toLowerCase().replace(/[,$%\s]/g,'').replace(/\.0+$/,'').replace(/dollars?/,'').trim(); }
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function cats(){ const m={}; QUESTIONS.forEach(q=>m[q.cat]=(m[q.cat]||0)+1); return m; }

/* A containment match cannot see a "not". Without this guard the grader marks a
   student CORRECT for saying the opposite of the answer: accept 'vibration'
   matches "absence of vibration", accept 'fifo' matches "not fifo, lifo", and
   accept 'oxidation' matches "reduction rather than oxidation". Measured across
   the banks before this landed, 1,750 of 1,773 short answers graded at least one
   negation of their own answer as correct.
   Exact and numeric matches are returned before this is consulted, so an answer
   that legitimately contains a negation (muroka = "no filtration") is unaffected,
   and the guard only fires when the negation is in the INPUT and not in the
   accepted phrase. */
var NEG_RE = /(^| )(not|no|never|without|lack|lacks|lacking|absence|opposite|rather|wrong|incorrect|dont)( |$)/;
var NEG_PHRASES = ['anything but', 'everything but', 'all but', 'don t',
  'stop buying', 'stops buying', 'stopped buying',
  'refuse to', 'refuses to', 'refused to',
  'avoid buying', 'avoids buying',
  'cease buying', 'ceases buying',
  'decline to', 'declines to', 'declined to'];
function negatedAgainst(input, acc){
  return (NEG_RE.test(input) || NEG_PHRASES.some(function(p){ return input.indexOf(p) !== -1; })) && !NEG_RE.test(acc);
}

/* Connector words a keyword-conjunction accept does not depend on. norm()
   has already dropped the/a/an/de/du/des/la/le/chateau/domaine. */
var SA_CONN={and:1,or:1,of:1,with:1,for:1,from:1,into:1,onto:1,over:1,under:1,
  then:1,that:1,this:1,than:1,also:1,plus:1,but:1,not:1,its:1,it:1,is:1,are:1,
  was:1,were:1,to:1,in:1,on:1,at:1,by:1,as:1};
function saSigWords(na){
  var seen={},out=[];
  na.split(' ').forEach(function(w){
    if(!w||SA_CONN[w])return;
    if(!(w.length>=4||/\d/.test(w)))return;
    if(seen[w])return; seen[w]=1; out.push(w);
  });
  return out;
}
/* The dominant accept style in the hand-authored banks is a keyword
   conjunction ('abbey of beze 630', 'philippe the bold 1395 disloyal plant'),
   which is not a phrase any student will ever type adjacently, so the
   whole-phrase rule below rejected answers containing every keyword in natural
   order. Require every keyword instead, in any order, as whole words.

   Two keywords are only distinctive enough when they are long: {below, cork}
   would otherwise grade the DIAM-closure answer as the ullage answer. With the
   floor, six near-duplicate-fact pairs still cross-accept inside Advanced and
   Master (rangen/schlossberg/hengst, six years three months, poulsard and
   trousseau, xinomavro nebbiolo, double pot distillation, and the 4 g/l acidity
   pair) against roughly 220 questions recovered: the trade is named here
   rather than left for the next reader to rediscover. */
function saConjHit(a,na){
  var sw=saSigWords(na);
  if(sw.length<2) return false;
  if(sw.length===2 && (sw[0].length+sw[1].length)<16) return false;
  for(var i=0;i<sw.length;i++){
    if(!new RegExp('(^| )'+escRe(sw[i])+'( |$)').test(a)) return false;
  }
  return true;
}

function matchSA(q, ans){
  const a = norm(ans);
  if(!a) return false;
  /* The displayed answer always grades. A student reads `ans` on the reveal and
     types it back next time; being marked wrong for giving the answer the app
     just showed them teaches something false and costs the grader its trust.

     Rank I and II get this guarantee at BUILD time from rewrite/lib.py's SA(),
     which prepends the model answer to the accept list when it does not already
     grade. Advanced and Master were hand-authored as JSON, never passed through
     SA(), and recognised their own answer on only 328 of 920 questions: 67 of
     445 in Master. Nothing marked those WRONG, because codex8's coverage rule
     caught them and offered a self-grade, but submitSA has already run
     statRecord(q,false) and missAdd(q) by then. Every one recorded a miss,
     queued a question the student knew back into review, and cost a mark on any
     mock being sat. That tier is the one behind the paywall.

     Exact equality is the right shape and deliberately not an accept entry: it
     adds no containment surface, so unlike a widened list it cannot smuggle in a
     negation or grade a neighbouring question's answer. It can only turn a miss
     into a hit, and the only input it newly accepts is the model answer. */
  if(typeof q.ans === 'string' && q.ans && a === norm(q.ans)) return true;
  /* The natural retype drops the gloss. A student who reads "Grands Échezeaux
     (Clos de Vougeot)" and types the name without the parenthetical is giving
     the answer, and equality alone marked 299 of those wrong across the two
     hand-authored banks. Strip parentheticals and compare for equality again,
     still equality-shaped, so it adds no containment surface and cannot smuggle
     a negation or a neighbouring question's answer.

     Gated on coverage, because sometimes the parenthetical IS the thing asked
     for: "which two Cabernets, and their local names?" has an answer that is
     literally the parentheses, and stripping them leaves a fragment that should
     not pass. Requiring 0.70 of the model answer's vocabulary costs 93 of the
     299 recoveries and admits none of that class. saCoverage lives in codex8,
     which loads after this file, so it is reached lazily. */
  if(typeof q.ans === 'string' && q.ans && q.ans.indexOf('(') > -1){
    const stripped = q.ans.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim()
                          .replace(/[\s,;:\u2014-]+$/, '');
    if(stripped && a === norm(stripped)){
      /* never let the coverage probe take grading down with it: matchSA is
         the one function a wrong answer here costs a student a mark */
      let cov = 1;
      try { if(typeof saCoverage === 'function') cov = saCoverage(q, stripped); }
      catch(e){ cov = 1; }
      if(cov >= 0.70) return true;
    }
  }
  const inputNums = (a.match(/\d+(\.\d+)?/g)||[]);
  for(const acc of q.accept){
    if(acc.charAt(0)==='~'){                      // strict canonical accept:
      const nc = norm(acc.slice(1));              // equality or full-phrase containment only
      if(nc && (a===nc || (nc.length>=4 && !negatedAgainst(a,nc) && new RegExp('(^| )'+escRe(nc)+'( |$)').test(a)))) return true;
      continue;
    }
    const na = norm(acc);
    if(!na) continue;
    if(a===na) return true;                       // exact normalized match
    if(q.ex) continue;                            // exact-only questions stop here
    if(/^\$?\d+(\.\d+)?%?$/.test(acc.trim())){    // purely numeric accept:
      const target=normNum(acc);                  // match a whole number token only
      if(!negatedAgainst(a,na) && inputNums.some(n=>normNum(n)===target)) return true;
      continue;
    }
    // phrase appears as whole words inside the input
    if(na.length>=4 && !negatedAgainst(a,na) && new RegExp('(^| )'+escRe(na)+'( |$)').test(a)) return true;
    // input is a whole-word core of the accept phrase (must cover most of it)
    const aw=a.split(' ').length, nw=na.split(' ').length;
    if(a.length>=5 && !negatedAgainst(a,na) && aw>=Math.max(1,Math.ceil(nw*0.6)) && new RegExp('(^| )'+escRe(a)+'( |$)').test(na)) return true;
    // letter-bearing substring fallback (handles run-together like "dyquem").
    // The input inside the accept phrase must begin at a word boundary of it:
    // a bare suffix ('climate' for mesoclimate, 'right' for 'stood upright')
    // is the generic word, not the answer.
    if(na.length>=5 && !negatedAgainst(a,na) && /[a-z]/.test(na) && (a.includes(na) || (new RegExp('(^| )'+escRe(a)).test(na)&&a.length>=5&&aw>=Math.max(1,Math.ceil(nw*0.6))))) return true;
    // every keyword of a conjunction accept, in any order (see saConjHit)
    if(!negatedAgainst(a,na) && saConjHit(a,na)) return true;
  }
  return false;
}

/* ---------- flow ---------- */
var MISS=[];
/* Question identity. Every bank entry carries a minted `id` (see codex10's
   rekey migration); the 80-char text slice survives only as the legacy path for
   a question object that predates minting. Because identity no longer rides on
   the stem, question text is now safe to edit. See codex10. */
function missKey(q){ return q.id || q.q.slice(0,80); }
function missAdd(q){ if(!MISS.some(m=>missKey(m)===missKey(q))) MISS.push(q); }
function missRemove(q){ const i=MISS.findIndex(m=>missKey(m)===missKey(q)); if(i>=0)MISS.splice(i,1); }

function stratMock(){
  const byCat={}; QUESTIONS.forEach(q=>(byCat[q.cat]=byCat[q.cat]||[]).push(q));
  const total=QUESTIONS.length;
  const quotas=Object.keys(byCat).map(c=>{
    const exact=MOCK_N*byCat[c].length/total;
    return {c,exact,base:Math.floor(exact)};
  });
  let used=quotas.reduce((s,x)=>s+x.base,0);
  quotas.sort((a,b)=>(b.exact-b.base)-(a.exact-a.base));
  for(let i=0;used<MOCK_N;i++,used++) quotas[i%quotas.length].base++;
  let pool=[];
  quotas.forEach(x=>{ pool=pool.concat(shuffle(byCat[x.c]).slice(0,x.base)); });
  return shuffle(pool);
}
function startMock(){
  S.mode='mock'; S.pool=stratMock();
  S.idx=0; S.correct=0; S.results=[]; S.remain=MOCK_SECS;
  resetQ(); S.view='quiz'; startTimer(); render();
}
function startReview(){
  if(!MISS.length) return;
  S.mode='review'; S.pool=shuffle(MISS.slice());
  S.idx=0; S.correct=0; S.results=[]; stopTimer();
  resetQ(); S.view='quiz'; render();
}
function startEndless(){
  S.mode='endless'; S.pool=shuffle(QUESTIONS);
  S.idx=0; S.correct=0; S.results=[]; stopTimer();
  resetQ(); S.view='quiz'; render();
}
function startDrill(cat){
  const pool=QUESTIONS.filter(q=>q.cat===cat);
  if(!pool.length){ if(typeof toast==='function')toast('No questions for '+cat+' at this rank.'); return; }
  S.mode='drill'; S.section=cat; S._again=null;
  S.pool=shuffle(pool);
  S.idx=0; S.correct=0; S.results=[]; stopTimer();
  resetQ(); S.view='quiz'; render();
}
function resetQ(){ S.answered=false; S.picked=null; S.saText=''; S.saGraded=null; }

/* The clock is wall time, not a count of ticks. A phone that sleeps between
   questions suspends the interval; the sitting must not pause with it, so
   every tick and every return to the tab recompute from S.endAt. */
function startTimer(){
  stopTimer();
  S.endAt=Date.now()+S.remain*1000;
  S.timer=setInterval(timerTick,1000);
}
function timerTick(){
  if(!S.timer)return;
  S.remain=Math.max(0,Math.round((S.endAt-Date.now())/1000));
  if(S.remain<=0){ stopTimer(); finish(); return; }
  const el=document.getElementById('timer');
  if(el){ el.textContent=fmtTime(S.remain); el.classList.toggle('low',S.remain<=120); }
}
document.addEventListener('visibilitychange',()=>{ if(!document.hidden)timerTick(); });
function stopTimer(){ if(S.timer){clearInterval(S.timer);S.timer=null;} }
function fmtTime(s){ const m=Math.floor(s/60),ss=s%60; return m+':'+(ss<10?'0':'')+ss; }

function pickMC(i){
  if(S.answered) return;
  const q=S.pool[S.idx]; S.picked=i; S.answered=true;
  const ok=(i===q.a); if(ok)S.correct++;
  if(ok){ if(S.mode==='review') missRemove(q); } else { missAdd(q); if(S.mode==='sudden') S.suddenDead=true; } statRecord(q,ok);
  S.results.push({q,ok,user:q.opts[i]});
  render();
}
function submitSA(){
  if(S.answered) return;
  const q=S.pool[S.idx]; const txt=(document.getElementById('sa')||{}).value||'';
  S.saText=txt; S.answered=true;
  const ok=matchSA(q,txt); S.saGraded=ok; if(ok)S.correct++;
  if(ok){ if(S.mode==='review') missRemove(q); } else { missAdd(q); if(S.mode==='sudden') S.suddenDead=true; } statRecord(q,ok);
  S.results.push({q,ok,user:txt||'(blank)'});
  render();
}
function overrideGrade(toRight){
  const r=S.results[S.results.length-1];
  if(r.ok===toRight) return;
  r.ok=toRight; S.saGraded=toRight; S.correct+=toRight?1:-1;
  if(toRight) missRemove(r.q); else missAdd(r.q); statOverride(r.q,toRight); if(S.mode==='sudden')S.suddenDead=!toRight;
  render();
}
function next(){
  S.idx++;
  if(S.mode==='endless' && S.idx>=S.pool.length){ S.pool=shuffle(QUESTIONS); S.idx=0; }
  if(S.idx>=S.pool.length){ finish(); return; }
  resetQ(); render();
}
function skip(){
  const q=S.pool[S.idx];
  missAdd(q); statRecord(q,false); if(S.mode==='sudden') S.suddenDead=true;
  S.results.push({q,ok:false,user:'(skipped)'});
  S.answered=true; render();
}
function finish(){ stopTimer(); S.view='results'; render(); }
function home(){ stopTimer(); S.view='home'; S.mode=null; render(); }
/* A live sitting is not thrown away by one mis-tap on Return. Answers already
   given make it a sitting; the confirm names what leaving does, and S.abandoned
   lets the history layer (codex4) record it. */
function liveSitting(){ return (S.mode==='mock'||S.mode==='sim')&&S.view==='quiz'&&S.results.length>0&&S.idx<S.pool.length; }
function leaveSitting(){
  if(!liveSitting())return true;
  if(!confirm('Leave this sitting? It will be recorded as abandoned.'))return false;
  S.abandoned=true;
  return true;
}
window.addEventListener('beforeunload',e=>{ if(liveSitting()){ e.preventDefault(); e.returnValue=''; } });

/* ---------- views ---------- */
function el(html){ const d=document.createElement('div'); d.innerHTML=html; return d.firstElementChild; }

/* Display form of a question's answer. Select-all questions (codex3) store
   `ans` as an array of option indices: map it to the option texts. */
function ansOf(q){
  const a = q.sa ? q.ans : q.opts[q.a];
  return Array.isArray(a) ? a.map(i=>q.opts[i]).join(', ') : a;
}

function render(){
  const app=document.getElementById('app');
  app.innerHTML='';
  app.appendChild(topbar());
  if(S.view==='home') app.appendChild(homeView());
  else if(S.view==='terroir') app.appendChild(refView());
  else if(S.view==='flash') app.appendChild(flashView());
  else if(S.view==='producers') app.appendChild(prodView());
  else if(S.view==='drillpick') app.appendChild(drillPick());
  else if(S.view==='quiz') app.appendChild(quizView());
  else if(S.view==='results') app.appendChild(resultsView());
  window.scrollTo(0,0);
}

function topbar(){
  const showHome = S.view!=='home';
  const t=el(`<div class="topbar">
    <div class="brand">
      <h1>The Sommelier’s Codex</h1>
    </div>
  </div>`);
  /* "Home", the same word the foot of the results screen uses for the same
     destination; "Return" belonged to the suite chip that leaves the wing. */
  if(showHome){ const b=el('<button class="homebtn">Home</button>'); b.onclick=()=>{ if(leaveSitting())home(); }; t.appendChild(b);}
  return t;
}

function homeView(){
  const c=cats(); const nCat=Object.keys(c).length; const nQ=QUESTIONS.length;
  /* THE FRONT DOOR IS NOT AN EXAMINATION HALL. What stood here was a square
     announcing "Prove your knowledge as the guilds did: from memory, without
     prompt", the size of the bank, the length of a mock and the mark needed to
     pass. Every one of those is true and every one of them is a wall to a
     person who came to learn something about wine tonight: a total is only
     encouraging once it is nearly met, and on day one it is the distance left
     to run. This is a study guide somebody keeps at their own pace, so the
     first thing on it is the one round the Codex asks of a person today, and
     the counts live where somebody goes looking for them.

     The motto and the non-affiliation line survive, at the foot: the first is
     the only ornament the wing has ever had, and the second is a statement the
     product is required to make and is not free to drop. */
  const v=el(`<div>
    <div class="modes">
      <button class="mode" id="m-mock"><div class="band"></div><h3>Mock Exam</h3><p>45 random questions, 38-minute clock, 60% to pass. Mixed format, just like exam day.</p></button>
      <button class="mode" id="m-drill"><div class="band"></div><h3>Drill by Section</h3><p>Target one region or topic at a time: Burgundy, Fortified, BOS math, and more.</p></button>
      <button class="mode" id="m-endless"><div class="band"></div><h3>Endless Practice</h3><p>Untimed, reshuffles forever. Immediate answer and rationale after every question.</p></button>
      <button class="mode" id="m-terroir"><div class="band"></div><h3>Terroir Atlas</h3><p>Climate, soil, and defining features of every major region. Study first, then drill the matching section.</p></button>
      <button class="mode" id="m-flash"><div class="band"></div><h3>Grape Flashcards</h3><p>The examinable tasting list: structure, aroma markers, and blind-tasting giveaways for every grape you may be poured.</p></button>
      <button class="mode" id="m-prod"><div class="band"></div><h3>Producer Codex</h3><p>The icon houses of every country: signature bottlings and their tasting profiles. Then drill the matching section.</p></button>
    </div>
    <div class="colophon">
      <div class="motto">In Vino Veritas</div>
      <div class="nonaffil">An independent study tool. Not affiliated with, endorsed by, or connected to the Court of Master Sommeliers.</div>
    </div>
  </div>`);
  v.querySelector('#m-mock').onclick=startMock;
  v.querySelector('#m-endless').onclick=startEndless;
  v.querySelector('#m-drill').onclick=()=>{S.view='drillpick';render();};
  v.querySelector('#m-terroir').onclick=()=>{S.view='terroir';render();};
  v.querySelector('#m-flash').onclick=startFlash;
  v.querySelector('#m-prod').onclick=()=>{S.view='producers';render();};
  if(MISS.length){
    const rb=el('<button class="btn gold" id="review-btn" style="margin-top:16px;width:100%">Review Misses ('+MISS.length+'): retire them by answering correctly</button>');
    rb.onclick=startReview;
    v.appendChild(rb);
  }
  return v;
}

var DRILL_GROUPS=[
 ["France",["Burgundy","Bordeaux","Champagne","Loire","Alsace","Rhône","Southern France","Jura, Savoie & Corsica"]],
 ["Europe",["Italy North","Italy Central & South","Spain","Portugal","Germany","Austria","Hungary & Greece"]],
 ["Icons",["Producers & Icons"]],
 ["New World",["California","Pacific NW, NY & Canada","South America","Australia","New Zealand","South Africa"]],
 ["Styles",["Sparkling Wine World","Fortified Wines","Sweet Wines","Terroir: Climate & Soil"]],
 ["Beyond Wine",["Spirits & Cocktails","Beer & Cider","Sake"]],
 ["The Craft",["Wine Fundamentals","Classifications & Labels","Viticulture & Winemaking","Wine Trade & Aging","Service & Hospitality","Food & Pairing","Business of the Sommelier"]]
];
function drillPick(){
  const c=cats();
  const grouped=new Set(DRILL_GROUPS.flatMap(g=>g[1]));
  const extras=Object.keys(c).filter(k=>!grouped.has(k)).sort();
  const groups=DRILL_GROUPS.map(g=>[g[0],g[1].filter(k=>c[k])]).filter(g=>g[1].length);
  if(extras.length) groups.push(["More",extras]);
  let html='';
  groups.forEach(([label,keys])=>{
    html+='<div class="secgroup">'+label+'</div><div class="seclist">'+
      keys.map(k=>`<button class="secbtn" data-cat="${k}"><span>${k}</span><span class="n">${c[k]}</span></button>`).join('')+'</div>';
  });
  const v=el(`<div>
    <div class="viewhead"><h2>Drill by Section</h2><div class="sub">Pick a topic; questions shuffle within it.</div></div>
    ${html}
  </div>`);
  v.querySelectorAll('.secbtn').forEach(b=>b.onclick=()=>startDrill(b.dataset.cat));
  return v;
}

function quizView(){
  const q=S.pool[S.idx];
  const total=S.mode==='mock'?MOCK_N:(S.mode==='drill'?S.pool.length:null);
  const pos=S.idx+1;
  const pct=total?Math.round(100*pos/total):0;
  const timerHtml = S.mode==='mock'
    ? `<span id="timer" class="timer${S.remain<=120?' low':''}">${fmtTime(S.remain)}</span>` : '';
  const counter = total ? `Question ${pos} of ${total}` : `Question ${pos}`;
  const v=el(`<div>
    <div class="quizbar">
      <span>${S.mode==='drill'?S.section+' · ':''}${counter}</span>
      ${timerHtml}
    </div>
    ${total?`<div class="progress"><i style="width:${pct}%"></i></div>`:'<div style="height:8px"></div>'}
    <div class="card" id="card"></div>
  </div>`);
  v.querySelector('#card').appendChild(q.sa?saCard(q):mcCard(q));
  return v;
}

function mcCard(q){
  const c=el(`<div>
    <div class="qmeta"><span class="qcat">${q.cat}</span><span class="qtype">Multiple choice</span></div>
    <div class="qtext">${q.q}</div>
    <div class="opts"></div>
  </div>`);
  const keys=['A','B','C','D'];
  const box=c.querySelector('.opts');
  q.opts.forEach((opt,i)=>{
    const b=el(`<button class="opt"><span class="key">${keys[i]}</span><span>${opt}</span></button>`);
    if(S.answered){
      b.disabled=true;
      if(i===q.a)b.classList.add('correct');
      else if(i===S.picked)b.classList.add('wrong');
      else b.classList.add('dim');
    } else { b.onclick=()=>pickMC(i); }
    box.appendChild(b);
  });
  if(S.answered) c.appendChild(revealBlock(q, S.picked===q.a));
  return c;
}

function saCard(q){
  const c=el(`<div>
    <div class="qmeta"><span class="qcat">${q.cat}</span><span class="qtype">Short answer</span></div>
    <div class="qtext">${q.q}</div>
  </div>`);
  if(!S.answered){
    const row=el(`<div class="sarow">
      <input id="sa" class="sainput" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="Type your answer…">
      <button class="btn" id="sasub">Submit</button>
    </div>`);
    c.appendChild(row);
    setTimeout(()=>{const i=document.getElementById('sa'); if(i){i.focus(); i.onkeydown=e=>{if(e.key==='Enter')submitSA();};}},30);
    row.querySelector('#sasub').onclick=submitSA;
  } else {
    c.appendChild(el(`<div class="sarow"><div class="sainput" style="opacity:.85">${escT(S.saText||'(blank)')}</div></div>`));
    c.appendChild(revealBlock(q, S.saGraded, true));
  }
  return c;
}

function revealBlock(q, ok, isSA){
  const wrap=el(`<div class="reveal"></div>`);
  wrap.appendChild(el(`<div class="verdict ${ok?'ok':'no'}">${ok?'Correct':'Incorrect'}</div>`));
  const ansText = isSA ? ansOf(q) : q.opts[q.a];
  wrap.appendChild(el(`<div class="answer-line">Answer: <b>${ansText}</b></div>`));
  wrap.appendChild(el(`<div class="exp">${q.exp}</div>`));
  if(isSA){
    const sg=el(`<div class="selfgrade"><span>Grader off? </span>
      <button class="btn small ghost" id="ir">I was right</button>
      <button class="btn small ghost" id="iw">I was wrong</button></div>`);
    sg.querySelector('#ir').onclick=()=>overrideGrade(true);
    sg.querySelector('#iw').onclick=()=>overrideGrade(false);
    wrap.appendChild(sg);
  }
  const isLast = (S.mode!=='endless') && (S.idx>=S.pool.length-1);
  const row=el(`<div class="nextrow">
    <button class="skipbtn" id="endbtn">${isLast?'':'End & see score'}</button>
    <button class="btn gold" id="nextbtn">${isLast?'See results →':'Next →'}</button>
  </div>`);
  row.querySelector('#nextbtn').onclick=next;
  const eb=row.querySelector('#endbtn'); if(eb) eb.onclick=finish;
  wrap.appendChild(row);
  setTimeout(()=>{
    document.onkeydown=e=>{ if(e.key==='Enter' && S.answered && !keyOnControl(e)){e.preventDefault();next();} };
    /* the option just pressed is disabled now, so focus would fall to the page
       top; carry it to the verdict, and the Tab order runs on from there */
    const vd=document.querySelector('.reveal .verdict');
    if(vd){ vd.setAttribute('tabindex','-1'); try{ vd.focus({preventScroll:true}); }catch(e){} }
  },30);
  return wrap;
}
/* Enter and Space on a focused button or link must activate it, not advance
   the quiz: the hotkey handlers stand aside for any control. */
function keyOnControl(e){
  const t=e&&e.target; if(!t||!t.tagName)return false;
  const tag=t.tagName.toLowerCase();
  return tag==='button'||tag==='a'||tag==='input'||tag==='select'||tag==='textarea'||(t.getAttribute&&t.getAttribute('role')==='button');
}

function resultsView(){
  document.onkeydown=null;
  const done=S.results.length;
  const score=S.correct, pctv=done?Math.round(100*score/done):0;
  const pass=pctv>=PASS*100;
  // per category
  const per={};
  S.results.forEach(r=>{ const c=r.q.cat; per[c]=per[c]||{n:0,ok:0}; per[c].n++; if(r.ok)per[c].ok++; });
  const rows=Object.entries(per).sort((a,b)=>b[1].n-a[1].n).map(([k,v])=>{
    const p=Math.round(100*v.ok/v.n);
    return `<div class="catrow"><span class="cname">${k}</span><span class="bar"><i style="width:${p}%"></i></span><span class="pct">${v.ok}/${v.n}</span></div>`;
  }).join('');
  const misses=S.results.filter(r=>!r.ok);
  const missHtml = misses.length? misses.map(r=>`
    <div class="miss">
      <div class="mq">${r.q.q}</div>
      <div class="ma">${ansOf(r.q)}</div>
      <div class="mu">Your answer: ${r.q.sa&&!r.q.mt&&!r.q.sel?escT(r.user):r.user}</div>
      <div class="mexp">${r.q.exp}</div>
    </div>`).join('') : '<div class="miss" style="text-align:center">Clean sweep. No misses.</div>';

  const modeLabel = S.mode==='mock'?'Mock Exam':(S.mode==='drill'?S.section:(S.mode==='review'?'Reviewing Misses':'Practice'));
  const v=el(`<div>
    <div class="result-hero">
      <div class="big">${pctv}%</div>
      <div class="passfail ${pass?'pass':'fail'}">${pass?'PASS':'BELOW 60%'} · ${score}/${done}</div>
      <div class="sub2">${modeLabel}${S.mode==='mock'?(pass?'. That clears the Certified theory bar.':'. Certified theory needs 60% in one sitting. Keep drilling.'):''}</div>
    </div>
    <div class="viewhead"><h2 style="font-size:19px">By section</h2></div>
    <div class="catbreak">${rows}</div>
    <div class="viewhead" style="margin-top:24px"><h2 style="font-size:19px">Review misses (${misses.length})</h2></div>
    <div class="misslist">${missHtml}</div>
    <div class="centerrow">
      <button class="btn" id="again">${S.mode==='mock'?'New Mock':(S.mode==='drill'?'Redrill '+S.section:'Keep practicing')}</button>
      <button class="btn ghost" id="tohome">Home</button>
    </div>
  </div>`);
  /* A drill built at runtime (Our List, the Classifications quiz) has no
     category in the bank to refilter; the layer that built it leaves S._again. */
  v.querySelector('#again').onclick=()=>{ if(S.mode==='mock')startMock(); else if(S.mode==='drill'){ if(typeof S._again==='function')S._again(); else startDrill(S.section); } else startEndless(); };
  v.querySelector('#tohome').onclick=home;
  return v;
}

/* ---------- global keys: 1-4 for MC, flashcard controls ---------- */
document.addEventListener('keydown',e=>{
  if(S.view==='flash'){
    if(e.key===' '||e.key==='Enter'){e.preventDefault();if(!S.fc.flip)flashFlip();return;}
    if(S.fc.flip&&e.key==='1'){flashGrade(false);return;}
    if(S.fc.flip&&e.key==='2'){flashGrade(true);return;}
    return;
  }
  if(S.view!=='quiz'||S.answered) return;
  const q=S.pool[S.idx]; if(!q||q.sa) return;
  if(['1','2','3','4'].includes(e.key)) pickMC(parseInt(e.key)-1);
});

render();

