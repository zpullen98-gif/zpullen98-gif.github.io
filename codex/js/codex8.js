/* ============ Codex VIII: honest grading and the study coach ============
   Four additions that turn a practice tool into an exam coach: a grader that
   admits uncertainty, a countdown plan that says what to study today, an
   actionable dashboard, and a way to report a question the Codex got wrong. */

/* ═══════════ Part I: honest grading ═══════════
   Short answer is the dominant format at Advanced and Master, where the model
   answer is a sentence rather than a word. A fuzzy matcher cannot adjudicate
   that fairly — so it stops pretending to. When the grader is uncertain it says
   so, hands the call to the candidate, and records the disagreement so weak
   accept lists can be found and widened. */

ST.grader=ST.grader||{};   /* qKey -> {r:overrides-to-right, w:overrides-to-wrong, t:last user text} */

function saTrueSA(q){ return !!(q&&q.sa&&!q.mt&&!q.sel); }

/* Distinctive terms of the model answer — the vocabulary a correct answer should touch. */
var SA_STOP={the:1,and:1,for:1,with:1,its:1,are:1,was:1,were:1,also:1,that:1,this:1,from:1,
 into:1,than:1,then:1,them:1,they:1,their:1,there:1,when:1,what:1,which:1,while:1,where:1,
 have:1,has:1,had:1,but:1,not:1,any:1,all:1,one:1,two:1,you:1,your:1,over:1,under:1,after:1,
 before:1,each:1,other:1,more:1,most:1,less:1,such:1,only:1,both:1,plus:1,per:1,eg:1,etc:1,
 wine:1,wines:1,grape:1,grapes:1,style:1,styles:1,years:1,year:1};
function saKeyTerms(q){
  var a=q.ans;
  if(Array.isArray(a))return [];
  var seen={},out=[];
  norm(a).split(' ').forEach(function(w){
    if(w.length>=4&&!SA_STOP[w]&&!seen[w]){seen[w]=1;out.push(w);}
  });
  return out;
}
/* Fraction of the model answer's vocabulary the candidate actually produced. */
function saCoverage(q,text){
  var terms=saKeyTerms(q);
  if(!terms.length)return 0;
  var a=' '+norm(text)+' ';
  var hit=0;
  terms.forEach(function(t){ if(a.indexOf(' '+t+' ')>=0||a.indexOf(t)>=0)hit++; });
  return hit/terms.length;
}
var SA_UNSURE=0.35;   /* below this the grader is confident it was a miss */

function saAcceptList(q){
  var seen={},out=[];
  (q.accept||[]).forEach(function(a){
    var s=String(a).replace(/^~/,'').trim();
    if(!s||seen[s.toLowerCase()])return;
    seen[s.toLowerCase()]=1; out.push(s);
  });
  return out;
}

/* ---- the reveal, rebuilt for short answer ---- */
var _v7RevealBlock=revealBlock;
revealBlock=function(q,ok,isSA){
  var wrap=_v7RevealBlock(q,ok,isSA);
  if(!isSA||!saTrueSA(q))return wrap;

  var cov=ok?1:saCoverage(q,S.saText||'');
  var unsure=(!ok&&cov>=SA_UNSURE);

  /* When the grader cannot fairly call it, say so, but be honest about what has
     already happened. codex9's submitSA runs statRecord(q,false) and missAdd(q)
     BEFORE this display logic, so the miss is recorded by the time the student
     reads this; overrideGrade(true) is what undoes it, across the stat, the SRS
     queue and S.correct alike. Telling them it is unsure while silently keeping
     the miss is the kind of small dishonesty this app exists not to commit, so
     the prompt says what declining to answer costs.

     The threshold is doing its job and should not be lowered on a hunch: measured
     across the paid banks, 0.35 softens 85.9% of near-miss correct answers and
     only 0.4% of wrong ones. Dropping it to 0.25 buys five more points of
     softening at four times the leak. */
  if(unsure){
    var v=wrap.querySelector('.verdict');
    if(v){ v.className='verdict unsure'; v.textContent='The grader is unsure: call it yourself'; }
  }

  /* What the grader was looking for. */
  var acc=saAcceptList(q);
  if(acc.length){
    var line=wrap.querySelector('.exp');
    var box=el('<div class="acceptbox"><b>Accepted phrasings</b><span>'+acc.join(' · ')+'</span></div>');
    if(line)wrap.insertBefore(box,line); else wrap.appendChild(box);
  }

  /* Self-grade, promoted to a first-class control with single-key bindings. */
  var sg=wrap.querySelector('.selfgrade');
  if(sg){
    sg.className='selfgrade'+(unsure?' primary':'');
    sg.innerHTML='';
    sg.appendChild(el('<span>'+(unsure?'Were you right? Scored as a miss until you say.':'Grader off?')+'</span>'));
    var right=el('<button class="btn small '+(unsure?'gold':'ghost')+'" id="ir">I was right <span class="key2">R</span></button>');
    var wrong=el('<button class="btn small ghost" id="iw">I was wrong <span class="key2">W</span></button>');
    right.onclick=function(){overrideGrade(true);};
    wrong.onclick=function(){overrideGrade(false);};
    sg.appendChild(right); sg.appendChild(wrong);
  }
  return wrap;
};

/* ---- record every disagreement: these are the accept lists that need widening ----
   A spoken answer was never submitted to the grader, so the grader cannot have
   been wrong about it. Logging those would fill the ledger with one entry per
   Gauntlet question and destroy the only signal it exists to carry. */
var ORAL_TEXT='(answered aloud)';
var _v7OverrideGrade=overrideGrade;
overrideGrade=function(toRight){
  var r=S.results[S.results.length-1];
  if(r&&r.ok!==toRight&&saTrueSA(r.q)&&S.saText!==ORAL_TEXT){
    var k=qKey(r.q);
    var g=ST.grader[k]=ST.grader[k]||{r:0,w:0};
    if(toRight){ g.r++; g.t=String(S.saText||'').slice(0,120); } else g.w++;
    stSave();
  }
  _v7OverrideGrade(toRight);
};
/* one-time cleanup of entries written before that guard existed */
(function(){
  var n=0;
  Object.keys(ST.grader).forEach(function(k){ if(ST.grader[k].t===ORAL_TEXT){ delete ST.grader[k]; n++; } });
  if(n)stSave();
})();

/* ---- R / W anywhere in the reveal, without stealing the text field ---- */
document.addEventListener('keydown',function(e){
  if(S.view!=='quiz'||!S.answered)return;
  if(oralActive())return;          /* the oral handler owns these keys; see Part III */
  var q=S.pool[S.idx];
  if(!saTrueSA(q))return;
  var tag=(e.target&&e.target.tagName||'').toLowerCase();
  if(tag==='input'||tag==='textarea'||tag==='select')return;
  var k=e.key.toLowerCase();
  if(k==='r'||k==='w'){ e.preventDefault(); e.stopPropagation(); overrideGrade(k==='r'); }
},true);

/* ---- the disagreement ledger ----
   Content problems belong to the Codex, not to whichever level you happen to be
   studying, so this ledger reaches across every bank and says where each entry
   came from. Keys carry their own level prefix; resolve against the right one. */
function keyLevel(k){ var i=k.indexOf('|'); return i<0?'certified':k.slice(0,i); }
function findByKey(k){
  var lv=keyLevel(k), L=LEVELS[lv];
  if(!L)return null;
  var pre=(lv==='certified'?'':lv+'|');
  var bank=L.bank;
  for(var i=0;i<bank.length;i++){ if(pre+missKey(bank[i])===k)return bank[i]; }
  return null;
}
function graderDisputes(){
  var out=[];
  Object.keys(ST.grader).forEach(function(k){
    var g=ST.grader[k];
    if(!g.r)return;
    out.push({k:k,q:findByKey(k),g:g,lvl:keyLevel(k)});
  });
  return out.sort(function(a,b){return b.g.r-a.g.r;});
}
function disputesView(){
  var rows=graderDisputes();
  var html='<div><div class="viewhead"><h2>Where the Grader Was Wrong</h2><div class="sub">'
    +'Questions you overruled. Each one is an accept list too narrow for the answer you gave — '
    +'export your progress to carry these into a content fix.</div></div>';
  if(!rows.length){
    html+='<div class="fmtnote" style="margin-top:14px">No disagreements recorded at this level. '
      +'When the grader marks you wrong and you know you were right, press <b>R</b> — it is logged here.</div>';
  } else {
    rows.forEach(function(x){
      var lab=LEVELS[x.lvl]?LEVELS[x.lvl].short:x.lvl;
      html+='<div class="dispute"><div class="mq">'+(x.q?x.q.q:'(question no longer in the bank)')
        +' <span class="lvltag">'+lab+'</span></div>'
        +(x.q?'<div class="ma">Model answer: '+ansOf(x.q)+'</div>'
             +'<div class="disputea">Accepted: '+saAcceptList(x.q).join(' · ')+'</div>':'')
        +(x.g.t?'<div class="mu">You wrote: '+x.g.t+'</div>':'')
        +'<div class="mexp">Overruled '+x.g.r+'×'+(x.g.w?' · marked yourself wrong '+x.g.w+'×':'')+'</div></div>';
    });
  }
  html+='<div class="centerrow"><button class="btn ghost" id="dsp-back">Dashboard</button></div></div>';
  var v=el(html);
  v.querySelector('#dsp-back').onclick=function(){S.view='dash';render();};
  return v;
}
/* ---- a reset that knows about every store ----
   codex2's button replaces ST wholesale with the four fields that existed when
   it was written. Six stores have been added since; dropping them leaves later
   layers reading undefined, and render() dies in trendChart on ST.hist. Clear
   the fields in place instead, so the schema survives whatever adds to it. */
var ST_DEFAULTS={q:{},days:{},best:{},flags:[],srs:{},ach:[],sess:0,hist:[],notes:{},
  tast:{n:0,c:0},court:{},grader:{},bad:{},exam:{},paceDays:{}};
function stReset(){
  Object.keys(ST_DEFAULTS).forEach(function(k){
    var d=ST_DEFAULTS[k];
    ST[k]=Array.isArray(d)?[]:(d&&typeof d==='object'?JSON.parse(JSON.stringify(d)):d);
  });
  stSave();
}

/* one door to the Content Report, not two */
var _v7DashView3=dashView;
dashView=function(){
  var v=_v7DashView3();
  var rst=v.querySelector('#streset');
  if(rst)rst.onclick=function(){
    if(confirm('Erase all study statistics, streaks, bookmarks, notes, plans and reports?')){
      stReset(); S.view='dash'; render();
    }
  };
  var n=graderDisputes().length+badReports().length;
  if(n){
    var b=el('<button class="btn" id="godisp" style="margin-top:20px;margin-right:8px">Content report ('+n+')</button>');
    b.onclick=function(){S.view='disputes';render();};
    var reset=v.querySelector('#streset');
    if(reset)v.insertBefore(b,reset); else v.appendChild(b);
  }
  return v;
};
/* ═══════════ Part II: the study coach ═══════════
   Everything needed already exists: SRS due dates, per-section accuracy,
   coverage. What was missing is a deadline to measure them against and a
   sentence telling the candidate what to do this morning. */

ST.exam=ST.exam||{};   /* level -> ISO date */

function examDate(lvl){ return ST.exam[lvl||activeLevel]||null; }
function daysUntil(iso){
  if(!iso)return null;
  var d=Math.ceil((new Date(iso+'T00:00:00')-new Date(today()+'T00:00:00'))/864e5);
  return d;
}
/* Answers per day over the last week, counted PER LEVEL.
   ST.days is court-wide (it drives the streak); measuring pace against a
   level's own target needs a level's own tally, or grinding Intro would report
   you "on pace" for a Certified sitting you have not touched. */
ST.paceDays=ST.paceDays||{};
var _v7StatRecord=statRecord;
statRecord=function(q,ok){
  var d=ST.paceDays[activeLevel]=ST.paceDays[activeLevel]||{};
  d[today()]=(d[today()]||0)+1;
  var cutoff=addDays(-30);
  Object.keys(d).forEach(function(k){ if(k<cutoff)delete d[k]; });   /* keep it small */
  _v7StatRecord(q,ok);
};
function recentPace(){
  var d=ST.paceDays[activeLevel]||{}, n=0;
  for(var i=0;i<7;i++){ n+=d[addDays(-i)]||0; }
  return n/7;
}
function coverageNow(){
  var seen=0;
  QUESTIONS.forEach(function(q){ var r=ST.q[qKey(q)]; if(r&&(r.c+r.w)>0)seen++; });
  return {seen:seen,total:QUESTIONS.length,pct:Math.round(100*seen/QUESTIONS.length)};
}
function weakestSection(minAnswers){
  var cs=catStats(),best=null;
  Object.keys(cs).forEach(function(k){
    var s=cs[k], n=s.c+s.w;
    if(n<(minAnswers||8))return;
    var acc=Math.round(100*s.c/n);
    if(!best||acc<best.acc)best={cat:k,acc:acc,n:n};
  });
  return best;
}
/* The prescription: what to do today, in priority order. */
function studyPlan(){
  var lvl=activeLevel, L=LEVELS[lvl];
  var iso=examDate(lvl), days=daysUntil(iso);
  var due=dueList().length;
  var cov=coverageNow();
  var pace=recentPace();
  var weak=weakestSection();
  var target=Math.ceil(0.6*cov.total);            /* readiness saturates at 60% coverage */
  var remaining=Math.max(0,target-cov.seen);
  var needPerDay=(days&&days>0)?Math.ceil(remaining/days):null;
  var onTrack=(needPerDay===null)?null:(pace>=needPerDay);
  var acts=[];
  if(due)acts.push({t:'Daily Review',d:due+' question'+(due===1?'':'s')+' due today — the schedule decides, not you.',go:startDaily});
  if(weak&&weak.acc<70)acts.push({t:'Repair '+weak.cat,d:'Your weakest section at '+weak.acc+'% over '+weak.n+' answers. Read the chapter, then drill it.',
    go:function(){S.primerKey=weak.cat;S.view='primer';render();},go2:function(){startDrill(weak.cat);},go2t:'Drill it'});
  if(cov.pct<60)acts.push({t:'Widen your coverage',d:'You have faced '+cov.pct+'% of this level. '+(needPerDay?'About '+needPerDay+' new a day clears the bar.':'Endless practice serves unseen questions first.'),go:startEndless});
  if(days!==null&&days<=21)acts.push({t:L.mock.oral?'Sit the Gauntlet':'Sit a full mock',d:'Inside three weeks, rehearse the whole sitting under the clock.',go:startMock});
  if(!acts.length)acts.push({t:'Keep drilling',d:'Nothing is overdue and coverage is healthy. Pick a section, or pour a blind flight.',go:function(){S.view='drillpick';render();}});
  return {level:lvl,iso:iso,days:days,due:due,cov:cov,pace:pace,weak:weak,
    needPerDay:needPerDay,onTrack:onTrack,acts:acts};
}
function planPanel(){
  var p=studyPlan(), L=LEVELS[p.level];
  if(!p.iso){
    var prompt=el('<button class="planprompt">Set your '+L.short+' exam date: the Codex will build the plan</button>');
    prompt.onclick=function(){S.view='plan';render();};
    return prompt;
  }
  var when=p.days>1?p.days+' days out':(p.days===1?'Tomorrow':(p.days===0?'Today':Math.abs(p.days)+' days past'));
  var track=p.onTrack===null?'':(p.onTrack?'<span class="ontrack">on pace</span>':'<span class="behind">behind pace</span>');
  var a=p.acts[0];
  var v=el('<div class="planpanel"><div class="planhead"><b>'+L.short+' · '+when+'</b>'
    +'<span>'+p.cov.pct+'% faced · '+p.due+' due · '+Math.round(p.pace)+'/day '+track+'</span></div>'
    +'<div class="planact"><div class="planactt">'+a.t+'</div><div class="planactd">'+a.d+'</div></div>'
    +'<div class="planrow"><button class="btn small gold" id="plan-go">Begin</button>'
    +'<button class="btn small ghost" id="plan-all">Full plan</button></div></div>');
  v.querySelector('#plan-go').onclick=a.go;
  v.querySelector('#plan-all').onclick=function(){S.view='plan';render();};
  return v;
}
function planView(){
  var p=studyPlan(), L=LEVELS[p.level];
  var html='<div><div class="viewhead"><h2>The Study Plan</h2><div class="sub">'
    +L.label+' · the Codex reads your record and prescribes the next hour.</div></div>';
  html+='<div class="secgroup">Your sitting</div>'
    +'<div class="sarow" style="align-items:center"><input type="date" id="exdate" class="sainput" aria-label="Your examination date" value="'+(p.iso||'')+'">'
    +'<button class="btn" id="exsave">Set date</button>'
    +(p.iso?'<button class="btn ghost" id="exclear">Clear</button>':'')+'</div>';
  if(p.days!==null){
    html+='<div class="statrow" style="margin:16px 0">'
      +'<div class="stat"><b>'+(p.days<0?'--':p.days)+'</b><span>Days out</span></div>'
      +'<div class="stat"><b>'+p.cov.pct+'%</b><span>Bank faced</span></div>'
      +'<div class="stat"><b>'+p.due+'</b><span>Due today</span></div>'
      +'<div class="stat"><b>'+Math.round(p.pace)+'</b><span>Answers/day</span></div>'
      +(p.needPerDay!==null?'<div class="stat"><b>'+p.needPerDay+'</b><span>Needed/day</span></div>':'')
      +'</div>';
    if(p.onTrack!==null){
      html+='<div class="fmtnote'+(p.onTrack?' ontracknote':' behindnote')+'">'
        +(p.onTrack
          ? 'At '+Math.round(p.pace)+' answers a day you will have faced enough of the bank before the sitting. Hold the pace and let the schedule work.'
          : 'At '+Math.round(p.pace)+' answers a day you will arrive under-covered. You need about '+p.needPerDay+' a day to face 60% of this level before the sitting, or accept a narrower, deeper preparation and drill your weakest sections only.')
        +'</div>';
    }
  }
  html+='<div class="secgroup">Today</div>';
  p.acts.forEach(function(a,i){
    html+='<div class="planitem" data-i="'+i+'"><div class="planactt">'+(i+1)+'. '+a.t+'</div>'
      +'<div class="planactd">'+a.d+'</div><div class="planrow">'
      +'<button class="btn small gold" data-go="'+i+'">Begin</button>'
      +(a.go2?'<button class="btn small ghost" data-go2="'+i+'">'+a.go2t+'</button>':'')+'</div></div>';
  });
  html+='</div>';
  var v=el(html);
  v.querySelector('#exsave').onclick=function(){
    var val=v.querySelector('#exdate').value;
    if(val){ ST.exam[activeLevel]=val; stSave(); }
    render();
  };
  var clr=v.querySelector('#exclear');
  if(clr)clr.onclick=function(){ delete ST.exam[activeLevel]; stSave(); render(); };
  v.querySelectorAll('[data-go]').forEach(function(b){ b.onclick=p.acts[+b.dataset.go].go; });
  v.querySelectorAll('[data-go2]').forEach(function(b){ b.onclick=p.acts[+b.dataset.go2].go2; });
  return v;
}
var _v7DecorateHome4=decorateHome;
decorateHome=function(){
  _v7DecorateHome4();
  var strip=document.querySelector('.courtstrip');
  if(strip&&strip.parentNode)strip.parentNode.insertBefore(planPanel(),strip.nextSibling);
};

/* ═══════════ Part III: the oral gauntlet, spoken ═══════════
   The Master theory examination is conducted aloud. Typing rehearses the wrong
   skill: the hand is slower than the mouth and the eye reads what the ear must
   catch. In voice mode the Codex reads the prompt, you answer to the room, and
   you grade yourself, which is what the examiners' table amounts to. */

if(ST.oralVoice===undefined)ST.oralVoice=true;
function speechOK(){ return typeof window!=='undefined'&&!!window.speechSynthesis; }
function speakStop(){ try{ if(speechOK())window.speechSynthesis.cancel(); }catch(e){} }
function speak(text){
  if(!ST.oralVoice||!speechOK())return;
  try{
    window.speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(String(text).replace(/[«»""]/g,'"'));
    u.rate=0.95; u.lang='en-GB';
    window.speechSynthesis.speak(u);
  }catch(e){}
}
/* Voice mode belongs to the Gauntlet only; every other mode stays silent.
   S._oral survives a return to the home screen (the results view still needs it
   to frame the tally), so the mode is checked too: otherwise the next Master
   drill would open with no typing field at all. */
function oralActive(){ return !!(S._oral&&S.view==='quiz'&&S.mode==='mock'); }

/* Answering aloud leaves nothing to match, so the grade is the candidate's from the start. */
function answerAloud(){
  if(S.answered)return;
  var q=S.pool[S.idx];
  S.saText=ORAL_TEXT; S.answered=true; S.saGraded=false; S._oralUngraded=true;
  missAdd(q); statRecord(q,false);
  S.results.push({q:q,ok:false,user:'(answered aloud)'});
  speakStop();
  render();
}
function oralGrade(right){
  if(!S._oralUngraded)return;
  S._oralUngraded=false;
  if(right)overrideGrade(true); else render();
}
var _v7RevealBlock2=revealBlock;
revealBlock=function(q,ok,isSA){
  var wrap=_v7RevealBlock2(q,ok,isSA);
  if(!oralActive()||!S._oralUngraded)return wrap;
  var v=wrap.querySelector('.verdict');
  if(v){ v.className='verdict unsure'; v.textContent='You answered aloud — now grade yourself'; }
  var sg=wrap.querySelector('.selfgrade');
  if(sg){
    sg.className='selfgrade primary';
    sg.innerHTML='';
    sg.appendChild(el('<span>How did you do?</span>'));
    var right=el('<button class="btn small gold">I had it <span class="key2">R</span></button>');
    var wrong=el('<button class="btn small ghost">I missed it <span class="key2">W</span></button>');
    right.onclick=function(){oralGrade(true);};
    wrong.onclick=function(){oralGrade(false);};
    sg.appendChild(right); sg.appendChild(wrong);
  }
  var row=wrap.querySelector('.nextrow');
  if(row)row.style.display='none';         /* the grade is not optional in rehearsal */
  return wrap;
};
var _v7OverrideGrade2=overrideGrade;
overrideGrade=function(toRight){ S._oralUngraded=false; _v7OverrideGrade2(toRight); };

/* Speak the prompt, and swap the keyboard for a voice-first control. */
var _v7DecorateQuiz2=decorateQuiz;
decorateQuiz=function(){
  _v7DecorateQuiz2();
  /* This wrapper is outermost, so every layer has now added its trailing links.
     Order them by how often they are wanted: study, annotate, then report. */
  var rev=document.querySelector('.reveal');
  if(rev){
    var row=rev.querySelector('.nextrow'), rep=rev.querySelector('.reportbox');
    if(row&&rep)rev.insertBefore(rep,row);
  }
  if(!oralActive())return;
  var q=S.pool[S.idx]; if(!q)return;
  var bar=document.querySelector('.quizbar');
  if(bar&&!document.getElementById('oraltoggle')){
    var t=el('<button id="oraltoggle" class="oraltoggle'+(ST.oralVoice?' on':'')+'">'
      +(ST.oralVoice?'Voice on':'Voice off')+'</button>');
    t.onclick=function(){ ST.oralVoice=!ST.oralVoice; stSave(); speakStop(); if(ST.oralVoice)speak(q.q); render(); };
    bar.insertBefore(t,bar.firstChild);
  }
  if(!S.answered){
    var row=document.querySelector('.sarow');
    if(row){
      row.innerHTML='';
      var b=el('<button class="btn gold oralreveal">Answered — reveal <span class="key2">space</span></button>');
      b.onclick=answerAloud;
      row.appendChild(b);
      row.appendChild(el('<div class="oralhint">Say the answer out loud, in full, as you would across the table.</div>'));
    }
    if(S._spokenFor!==S.idx){ S._spokenFor=S.idx; speak(q.q); }
  }
};
/* Space reveals; R and W grade. The text field is gone, so the keys are free. */
document.addEventListener('keydown',function(e){
  if(!oralActive())return;
  var tag=(e.target&&e.target.tagName||'').toLowerCase();
  if(tag==='input'||tag==='textarea')return;
  if(!S.answered&&(e.key===' '||e.key==='Enter')){ e.preventDefault(); e.stopPropagation(); answerAloud(); return; }
  if(S._oralUngraded){
    var k=e.key.toLowerCase();
    if(k==='r'||k==='w'){ e.preventDefault(); e.stopPropagation(); oralGrade(k==='r'); }
    if(e.key===' '||e.key==='Enter'){ e.preventDefault(); e.stopPropagation(); }   /* no skipping the grade */
  }
},true);
/* Silence on the way out. */
var _v7Home=home;
home=function(){ speakStop(); S._spokenFor=null; S._oralUngraded=false; S._oral=false; _v7Home(); };
var _v7Finish2=finish;
finish=function(){ speakStop(); S._spokenFor=null; S._oralUngraded=false; _v7Finish2(); };
var _v7ApplyLevel=applyLevel;
applyLevel=function(lvl,skip){ speakStop(); S._spokenFor=null; S._oralUngraded=false; _v7ApplyLevel(lvl,skip); };

/* ═══════════ Part IV: a dashboard that acts, and a way to report a bad question ═══════════
   The weakest-section list was diagnostic and inert; now every row is a door.
   And since roughly nine hundred of these questions were written for this
   Codex, there must be a way to say "this one is wrong" and carry that out. */

ST.bad=ST.bad||{};    /* qKey -> {n:reports, note:'', q:text} */

function reportQuestion(q,note){
  var k=qKey(q);
  var b=ST.bad[k]=ST.bad[k]||{n:0,q:q.q.slice(0,120)};
  b.n++; if(note)b.note=String(note).slice(0,300);
  stSave();
  toast('Reported. It will appear in your Content Report.');
}
function badReports(){
  var out=[];
  Object.keys(ST.bad).forEach(function(k){
    out.push({k:k,b:ST.bad[k],q:findByKey(k),lvl:keyLevel(k)});
  });
  return out.sort(function(a,b){return b.b.n-a.b.n;});
}
/* A flag in every reveal: errors are not confined to short answer. */
var _v7RevealBlock3=revealBlock;
revealBlock=function(q,ok,isSA){
  var wrap=_v7RevealBlock3(q,ok,isSA);
  if(wrap.querySelector('.reportbox'))return wrap;
  var box=el('<div class="reportbox"><button class="reporttoggle">Report an error in this question</button>'
    +'<div class="reportbody" hidden><textarea class="noteinput reportinput" rows="2" placeholder="What is wrong — the answer, the accepted phrasings, a fact?"></textarea>'
    +'<div class="planrow"><button class="btn small ghost rsend">Send report</button></div></div></div>');
  var body=box.querySelector('.reportbody'), ta=box.querySelector('textarea');
  box.querySelector('.reporttoggle').onclick=function(){ body.hidden=!body.hidden; if(!body.hidden)ta.focus(); };
  box.querySelector('.rsend').onclick=function(){ reportQuestion(q,ta.value); body.hidden=true; ta.value=''; };
  var row=wrap.querySelector('.nextrow');
  if(row)wrap.insertBefore(box,row); else wrap.appendChild(box);
  return wrap;
};

/* Every weak row becomes an action: read the chapter, or drill the section. */
var _v7DashView4=dashView;
dashView=function(){
  var v=_v7DashView4();
  var haveP={}; (PRIMERS||[]).forEach(function(p){ if(p.cat)haveP[p.cat]=1; });
  v.querySelectorAll('.dashrow').forEach(function(row){
    var cell=row.querySelector('.dashcat'); if(!cell)return;
    var cat=cell.textContent.trim();
    row.classList.add('actionable');
    row.title='Drill '+cat;
    row.onclick=function(e){ if(e.target.classList.contains('dashprimer'))return; startDrill(cat); };
    if(haveP[cat]){
      var p=el('<button class="dashprimer" title="Read the '+cat+' chapter">Chapter</button>');
      p.onclick=function(e){ e.stopPropagation(); S.primerKey=cat; S.view='primer'; render(); };
      row.appendChild(p);
    }
  });
  /* the weakest/strongest tags lead to their chapters too */
  v.querySelectorAll('.dashtag.no').forEach(function(tag){
    var cat=tag.textContent.split(' · ')[0].trim();
    if(!haveP[cat])return;
    tag.classList.add('actionable');
    tag.onclick=function(){ S.primerKey=cat; S.view='primer'; render(); };
  });
  return v;
};

/* The content report: everything the Codex may have got wrong, in one exportable place. */
var _v7DisputesView=disputesView;
disputesView=function(){
  var v=_v7DisputesView();
  var head=v.querySelector('.viewhead h2'); if(head)head.textContent='Content Report';
  var sub=v.querySelector('.viewhead .sub');
  if(sub)sub.textContent='Where this Codex disagreed with you, and where you say it is simply wrong. '
    +'Both travel inside your progress export.';
  var rows=badReports();
  if(rows.length){
    var html='<div class="secgroup">Reported errors ('+rows.length+')</div>';
    rows.forEach(function(x){
      var lab=LEVELS[x.lvl]?LEVELS[x.lvl].short:x.lvl;
      html+='<div class="dispute"><div class="mq">'+(x.q?x.q.q:x.b.q)+' <span class="lvltag">'+lab+'</span></div>'
        +(x.q?'<div class="ma">Codex answer: '+ansOf(x.q)+'</div>':'')
        +(x.b.note?'<div class="mu">Your report: '+x.b.note+'</div>':'')
        +'<div class="mexp">Flagged '+x.b.n+'×</div></div>';
    });
    var block=el('<div>'+html+'</div>');
    var back=v.querySelector('.centerrow');
    if(back)v.insertBefore(block,back); else v.appendChild(block);
  }
  return v;
};

/* codex4's merge predates these stores; without this they vanish on import. */
var _v7MergeStats=mergeStats;
mergeStats=function(inc){
  var err=_v7MergeStats(inc);
  if(err)return err;
  var B=(inc&&inc.stats)||{};
  Object.keys(B.grader||{}).forEach(function(k){
    var a=ST.grader[k], b=B.grader[k];
    if(!a)ST.grader[k]={r:b.r||0,w:b.w||0,t:b.t};
    else{ a.r=(a.r||0)+(b.r||0); a.w=(a.w||0)+(b.w||0); if(b.t&&!a.t)a.t=b.t; }
  });
  Object.keys(B.bad||{}).forEach(function(k){
    var a=ST.bad[k], b=B.bad[k];
    if(!a)ST.bad[k]={n:b.n||0,q:b.q,note:b.note};
    else{ a.n=(a.n||0)+(b.n||0); if(b.note&&!a.note)a.note=b.note; }
  });
  Object.keys(B.exam||{}).forEach(function(k){ if(!ST.exam[k])ST.exam[k]=B.exam[k]; });
  Object.keys(B.paceDays||{}).forEach(function(lv){
    var a=ST.paceDays[lv]=ST.paceDays[lv]||{}, b=B.paceDays[lv]||{};
    Object.keys(b).forEach(function(d){ a[d]=Math.max(a[d]||0,b[d]); });
  });
  Object.keys(B.court||{}).forEach(function(k){
    var a=ST.court[k]||{}, b=B.court[k]||{};
    ST.court[k]={best:Math.max(a.best||0,b.best||0),passed:!!(a.passed||b.passed)};
  });
  if(B.tast){ ST.tast.n=(ST.tast.n||0)+(B.tast.n||0); ST.tast.c=(ST.tast.c||0)+(B.tast.c||0); }
  stSave();
  return null;
};

var _v7Render4=render;
render=function(){
  var v8={disputes:disputesView,plan:planView};
  if(v8[S.view]){
    if(S.qT){clearInterval(S.qT);S.qT=null;}
    var app=document.getElementById('app');
    app.innerHTML=''; app.appendChild(topbar()); app.appendChild(v8[S.view]());
    window.scrollTo(0,0); return;
  }
  _v7Render4();
};
