/* ============ Codex II: adaptive engine, dashboard, encyclopedia ============ */
/* Storage keys go through OOT.profiles, which answers with the plain key: one
   their own record. With no profile chosen, key() returns 'codexStats'
   unchanged, which is why a venue that never names anyone loses nothing. */
function stKey(){try{return (window.OOT&&OOT.profiles)?OOT.profiles.key('codexStats'):'codexStats'}catch(e){return 'codexStats'}}
var ST=(function(){try{return JSON.parse(localStorage.getItem(stKey()))||{}}catch(e){return{}}})();
ST.q=ST.q||{}; ST.days=ST.days||{}; ST.best=ST.best||{}; ST.flags=ST.flags||[];
function stSave(){try{localStorage.setItem(stKey(),JSON.stringify(ST))}catch(e){}}
function qKey(q){return missKey(q);}
/* A day is a LOCAL day. toISOString stamped tomorrow's date for anyone west of
   Greenwich studying in the evening, so the streak and the 'answered today'
   count reset at seven or eight in the evening on exactly the nights people
   study. The profile layer (shared/oot-profiles.js dayKey) already counts
   local days; the Codex's own keys must agree with it. Same YYYY-MM-DD shape,
   so every stored key still reads. */
function localDay(d){
  const m=d.getMonth()+1, day=d.getDate();
  return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(day<10?'0':'')+day;
}
function statRecord(q,ok){
  const r=ST.q[qKey(q)]=ST.q[qKey(q)]||{c:0,w:0,s:0};
  if(ok){r.c++;r.s++;}else{r.w++;r.s=0;}
  const d=localDay(new Date());
  ST.days[d]=(ST.days[d]||0)+1; stSave();
}
function statOverride(q,toRight){
  const r=ST.q[qKey(q)]; if(!r)return;
  if(toRight){r.w=Math.max(0,r.w-1);r.c++;r.s++;}
  else{r.c=Math.max(0,r.c-1);r.w++;r.s=0;}
  stSave();
}
function dayStreak(){
  let n=0; const one=864e5; let t=new Date();
  for(;;){const k=localDay(t);
    if(ST.days[k]){n++;t=new Date(t.getTime()-one);}
    else{ if(n===0 && k===localDay(new Date())){t=new Date(t.getTime()-one);continue;} break;}
  } return n;
}
function catStats(){
  const m={};
  QUESTIONS.forEach(q=>{
    const s=m[q.cat]=m[q.cat]||{total:0,seen:0,c:0,w:0};
    s.total++;
    const r=ST.q[qKey(q)];
    if(r&&(r.c+r.w)>0){s.seen++;s.c+=r.c;s.w+=r.w;}
  });
  return m;
}
/* ---- adaptive + new modes ---- */
function startWeakness(){
  const scored=QUESTIONS.map(q=>{
    const r=ST.q[qKey(q)];
    let sc; if(!r||r.c+r.w===0) sc=1.1+Math.random()*0.3;
    else sc=(r.w/(r.c+r.w))*2+(r.s===0&&r.w>0?0.5:0)+Math.random()*0.2;
    return {q,sc};
  }).sort((a,b)=>b.sc-a.sc);
  S.pool=shuffle(scored.slice(0,25).map(x=>x.q));
  stopTimer(); S.mode='weak'; S.idx=0; S.correct=0; S.results=[]; resetQ(); S.view='quiz'; render();
}
function startLightning(){
  S.pool=shuffle(QUESTIONS.filter(function(q){return !q.mt;})).slice(0,50);
  stopTimer(); S.mode='lightning'; S.idx=0; S.correct=0; S.results=[]; resetQ(); S.view='quiz'; render();
}
function startSudden(){
  S.pool=shuffle(QUESTIONS);
  stopTimer(); S.mode='sudden'; S.suddenDead=false; S.idx=0; S.correct=0; S.results=[]; resetQ(); S.view='quiz'; render();
}
function startFlagged(){
  const set=new Set(ST.flags);
  const pool=QUESTIONS.filter(q=>set.has(qKey(q)));
  if(!pool.length)return;
  stopTimer(); S.pool=shuffle(pool); S.mode='flagged'; S.idx=0; S.correct=0; S.results=[]; resetQ(); S.view='quiz'; render();
}
var MODE_LABEL={weak:'Weakness Review',lightning:'Lightning Round',sudden:'Sudden Death',flagged:'Bookmark Review'};
/* ---- wrap next() for sudden death + lightning rearm ---- */
var _origNext=next;
next=function(){
  if(S.mode==='sudden'&&S.suddenDead){
    const run=Math.max(0,S.results.length-1);
    if(!ST.best.sudden||run>ST.best.sudden){ST.best.sudden=run;stSave();}
    finish(); return;
  }
  _origNext();
};
/* ---- lightning per-question countdown ----
   Wall time, like core's startTimer: a phone that sleeps on a question does
   not get its thirty seconds back. */
function lightArm(){
  if(S.qT){clearInterval(S.qT);S.qT=null;}
  if(S.view!=='quiz'||S.mode!=='lightning'||S.answered)return;
  S.qRemain=30; S.qEndAt=Date.now()+30000;
  const bar=document.querySelector('.quizbar');
  if(bar&&!document.getElementById('qtimer')){
    bar.appendChild(el('<span class="timer" id="qtimer">0:30</span>'));
  }
  S.qT=setInterval(lightTick,1000);
}
function lightTick(){
  if(!S.qT)return;
  S.qRemain=Math.max(0,Math.round((S.qEndAt-Date.now())/1000));
  const t=document.getElementById('qtimer');
  if(t){t.textContent=fmtTime(S.qRemain);if(S.qRemain<=10)t.classList.add('low');}
  if(S.qRemain<=0){clearInterval(S.qT);S.qT=null;skip();}
}
document.addEventListener('visibilitychange',function(){ if(!document.hidden)lightTick(); });
/* ---- render wrapper: new views + home/quiz decoration ---- */
var _origRender=render;
render=function(){
  if(S.qT){clearInterval(S.qT);S.qT=null;}
  if(S.view==='dash'||S.view==='ency'){
    const app=document.getElementById('app');
    app.innerHTML=''; app.appendChild(topbar());
    app.appendChild(S.view==='dash'?dashView():encyView());
    window.scrollTo(0,0); return;
  }
  _origRender();
  if(S.view==='home') decorateHome();
  if(S.view==='quiz') decorateQuiz();
};
function decorateQuiz(){
  const q=S.pool[S.idx]; if(!q)return;
  const lbl=MODE_LABEL[S.mode];
  if(lbl){const span=document.querySelector('.quizbar span');
    if(span&&span.textContent.indexOf(lbl)<0)span.textContent=lbl+' · '+span.textContent;}
  const meta=document.querySelector('#card .qmeta');
  if(meta&&!meta.querySelector('.flagbtn')){
    const on=ST.flags.indexOf(qKey(q))>=0;
    const b=el('<button class="flagbtn'+(on?' on':'')+'" title="Bookmark this question">'+(on?'Bookmarked':'Bookmark')+'</button>');
    b.onclick=function(){
      const i=ST.flags.indexOf(qKey(q));
      if(i>=0){ST.flags.splice(i,1);b.classList.remove('on');b.textContent='Bookmark';}
      else{ST.flags.push(qKey(q));b.classList.add('on');b.textContent='Bookmarked';}
      stSave();
    };
    meta.appendChild(b);
  }
  if(S.mode==='lightning')lightArm();
}
/* EVERY bank, one entry per id, which is exactly what encyView searches.
   QUESTIONS alone is the rank being sat, so "Search all 1283 questions" was
   true of Village and false of the Codex. */
function encyQuestionCount(){
  if(typeof LEVEL_ORDER==='undefined'||typeof LEVELS==='undefined')return QUESTIONS.length;
  const seen=Object.create(null);let n=0;
  LEVEL_ORDER.forEach(function(lv){
    const L=LEVELS[lv];if(!L||!L.bank)return;
    L.bank.forEach(function(q){const k=q.id||q.q;if(seen[k])return;seen[k]=1;n++;});
  });
  return n;
}
function decorateHome(){
  const answered=Object.values(ST.q).reduce((a,r)=>a+r.c+r.w,0);
  const correct=Object.values(ST.q).reduce((a,r)=>a+r.c,0);
  const today=ST.days[localDay(new Date())]||0;
  const hero=document.querySelector('.hero');
  if(hero&&answered){
    hero.appendChild(el('<div class="studyline">'+dayStreak()+'-day streak \u00b7 '+today+' answered today \u00b7 lifetime '+Math.round(100*correct/Math.max(1,answered))+'% on '+answered+' answers</div>'));
  }
  const modes=document.querySelector('.modes');
  if(!modes)return;
  const m2=el('<div class="modes" style="margin-top:14px"></div>');
  const tiles=[
    ['t-weak','\u2020','Weakness Review','Adaptive 25: your misses, cold streaks, and unseen questions, served first.'],
    ['t-light','\u2607','Lightning Round','Fifty questions, thirty seconds each. The clock is the examiner.'],
    ['t-sudden','\u2620','Sudden Death','One mistake ends the run. Best: '+(ST.best.sudden||0)+'.'],
    ['t-dash','\u2726','Dashboard','Accuracy by section, coverage, streaks, and exam readiness.'],
    ['t-ency','\u2748','Encyclopedia','Search all '+encyQuestionCount()+' questions across every rank, the Atlas, the Producer Codex, and grape profiles.'],
    ['t-flag','\u2605','Bookmark Review','Drill your '+ST.flags.length+' bookmarked questions.']
  ];
  tiles.forEach(function(t){
    m2.appendChild(el('<button class="mode" id="'+t[0]+'"><div class="band"></div><h3>'+t[2]+'</h3><p>'+t[3]+'</p></button>'));
  });
  modes.parentNode.insertBefore(m2,modes.nextSibling);
  m2.querySelector('#t-weak').onclick=startWeakness;
  m2.querySelector('#t-light').onclick=startLightning;
  m2.querySelector('#t-sudden').onclick=startSudden;
  m2.querySelector('#t-dash').onclick=function(){S.view='dash';render();};
  m2.querySelector('#t-ency').onclick=function(){S.view='ency';render();};
  m2.querySelector('#t-flag').onclick=startFlagged;
  if(!ST.flags.length)m2.querySelector('#t-flag').disabled=true;
}
/* ---- dashboard ---- */
function dashView(){
  const cs=catStats();
  const answered=Object.values(ST.q).reduce((a,r)=>a+r.c+r.w,0);
  const correct=Object.values(ST.q).reduce((a,r)=>a+r.c,0);
  const seen=Object.keys(cs).reduce((a,k)=>a+cs[k].seen,0);
  const acc=answered?Math.round(100*correct/answered):0;
  const cov=Math.round(100*seen/QUESTIONS.length);
  const ready=Math.round(acc*Math.min(1,seen/(0.6*QUESTIONS.length)));
  let html='<div><div class="viewhead"><h2>Performance Dashboard</h2><div class="sub">Accuracy \u00d7 coverage, by section. Readiness weighs your accuracy by how much of the bank you\u2019ve faced.</div></div>';
  html+='<div class="statrow" style="margin:14px 0">'
    +'<div class="stat"><b>'+acc+'%</b><span>Accuracy</span></div>'
    +'<div class="stat"><b>'+cov+'%</b><span>Coverage</span></div>'
    +'<div class="stat"><b>'+ready+'%</b><span>Readiness</span></div>'
    +'<div class="stat"><b>'+dayStreak()+'</b><span>Day streak</span></div>'
    +'<div class="stat"><b>'+(ST.best.sudden||0)+'</b><span>Best sudden run</span></div></div>';
  const rated=Object.keys(cs).filter(k=>cs[k].c+cs[k].w>=5)
    .map(k=>({k,a:Math.round(100*cs[k].c/(cs[k].c+cs[k].w))}));
  if(rated.length>=2){
    const sorted=rated.slice().sort((a,b)=>a.a-b.a);
    html+='<div class="dashduo"><div><div class="secgroup">Weakest</div>'+sorted.slice(0,5).map(x=>'<div class="dashtag no">'+x.k+' \u00b7 '+x.a+'%</div>').join('')+'</div>';
    html+='<div><div class="secgroup">Strongest</div>'+sorted.slice(-5).reverse().map(x=>'<div class="dashtag ok">'+x.k+' \u00b7 '+x.a+'%</div>').join('')+'</div></div>';
  }
  DRILL_GROUPS.forEach(function(g){
    html+='<div class="secgroup">'+g[0]+'</div>';
    g[1].forEach(function(cat){
      const s=cs[cat]; if(!s)return;
      const a=(s.c+s.w)?Math.round(100*s.c/(s.c+s.w)):null;
      html+='<div class="dashrow"><div class="dashcat">'+cat+'</div>'
        +'<div class="dashbar"><i style="width:'+(a===null?0:a)+'%"'+(a!==null&&a<60?' class="low"':'')+'></i></div>'
        +'<div class="dashnum">'+(a===null?'\u00b7':a+'%')+'</div>'
        +'<div class="dashseen">'+s.seen+'/'+s.total+'</div></div>';
    });
  });
  html+='<button class="btn" id="streset" style="margin-top:20px">Reset all statistics</button></div>';
  const v=el(html);
  v.querySelector('#streset').onclick=function(){
    if(confirm('Erase all study statistics, streaks, and bookmarks?')){
      ST={q:{},days:{},best:{},flags:[]};stSave();render();
    }};
  return v;
}
/* ---- encyclopedia ---- */
function encyView(){
  const v=el('<div><div class="viewhead"><h2>Encyclopedia</h2><div class="sub">Search every question, the Terroir Atlas, the Producer Codex, and the grape profiles at once.</div></div>'
    +'<div class="sarow" style="margin:12px 0"><input id="ency-in" class="sainput" autocomplete="off" placeholder="Gamay, Pauillac, beneficio, DRC, Cornas\u2026"></div>'
    +'<div id="ency-out"></div></div>');
  const inp=v.querySelector('#ency-in'), out=v.querySelector('#ency-out');
  function go(){
    const t=inp.value.trim().toLowerCase();
    out.innerHTML='';
    if(t.length<2)return;
    let html='';
    /* EVERY question, which is what the subtitle above promises. QUESTIONS is
       rebound per rank by codex7 (QUESTIONS=L.bank), so filtering it searched
       only the rank being sat: 1,778 of 4,357 at Regionale. An encyclopedia
       that silently hides three quarters of the book is worse than one that
       admits its scope, and hiding it behind the word "every" is worse again.
       Each hit carries the rank it came from, because half the reason to
       search is to find out where a thing was written down. */
    const qh=(function(){
      const out=[], seen=Object.create(null);
      const haveLevels=(typeof LEVEL_ORDER!=='undefined'&&typeof LEVELS!=='undefined');
      const banks=haveLevels
        ? LEVEL_ORDER.filter(function(lv){return LEVELS[lv]&&LEVELS[lv].bank;})
            .map(function(lv){return {rank:LEVELS[lv].short||lv,bank:LEVELS[lv].bank};})
        : [{rank:'',bank:QUESTIONS}];
      banks.forEach(function(b){
        b.bank.forEach(function(q){
          /* one entry per question: the same id can sit in two banks */
          const key=q.id||q.q;
          if(seen[key])return;
          if(JSON.stringify(q).toLowerCase().indexOf(t)<0)return;
          seen[key]=1;
          out.push({q:q,rank:b.rank});
        });
      });
      return out;
    })();
    if(qh.length){
      html+='<div class="secgroup">Questions ('+qh.length+')</div>';
      qh.slice(0,30).forEach(function(h){
        const q=h.q;
        html+='<div class="encyq"><div class="encyqt">'+q.q+'</div><div class="encya">'+ansOf(q)+'</div><div class="encyx">'+q.exp+' <span class="encycat">'+q.cat+(h.rank?' \u00b7 '+h.rank:'')+'</span></div></div>';
      });
      if(qh.length>30)html+='<div class="sub" style="margin:6px 0">\u2026and '+(qh.length-30)+' more. Narrow the search.</div>';
    }
    function rows(DB,label){
      let h='';
      try{
        /* TERROIR keys its entries `regions`, PRODUCERS keys them `rows`, and
           this loop only ever read `rows`. The Terroir Atlas has therefore
           never been searchable, in a view whose own subtitle promises it. */
        DB.forEach(function(c){ (c.rows||c.regions||[]).forEach(function(r){
          if(JSON.stringify(r).toLowerCase().indexOf(t)>=0)
            h+='<div class="refrow">'+Object.values(r).map(function(x,i){return '<div class="'+(i===0?'refr':'refnote')+'">'+x+'</div>';}).join('')+'</div>';
        });});
      }catch(e){}
      return h?'<div class="secgroup">'+label+'</div>'+h:'';
    }
    if(typeof TERROIR!=='undefined')html+=rows(TERROIR,'Terroir Atlas');
    if(typeof PRODUCERS!=='undefined')html+=rows(PRODUCERS,'Producer Codex');
    if(typeof GRAPES!=='undefined'){
      let h='';
      /* every rank's grape list, one entry per name: GRAPES is rebound per
         rank by codex7 (twelve at Village, the full list plus GRAPES_PLUS
         above), and the subtitle promises the profiles "at once" */
      const gseen=Object.create(null), gall=[];
      const glists=(typeof LEVEL_ORDER!=='undefined'&&typeof LEVELS!=='undefined')
        ? LEVEL_ORDER.map(function(lv){return LEVELS[lv]&&LEVELS[lv].grapes;}).filter(Boolean)
        : [GRAPES];
      glists.forEach(function(list){list.forEach(function(g){const k=g.g||g.name;if(gseen[k])return;gseen[k]=1;gall.push(g);});});
      gall.forEach(function(g){
        if(JSON.stringify(g).toLowerCase().indexOf(t)>=0)
          h+='<div class="encyq"><div class="encyqt">'+(g.g||g.name||'')+'</div><div class="encyx">'+Object.keys(g).filter(k=>k!=='g'&&k!=='name').map(k=>'<b>'+k+':</b> '+g[k]).join(' \u00b7 ')+'</div></div>';
      });
      if(h)html+='<div class="secgroup">Grape Profiles</div>'+h;
    }
    out.innerHTML=html||'<div class="sub" style="margin-top:8px">Nothing in the Codex matches \u201c'+inp.value+'\u201d.</div>';
  }
  inp.oninput=go;
  setTimeout(function(){inp.focus();},30);
  return v;
}

