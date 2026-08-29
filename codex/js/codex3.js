/* ============ Codex III: spaced repetition, new formats, hall of fame ============ */
ST.srs=ST.srs||{}; ST.ach=ST.ach||[]; ST.sess=ST.sess||0;
function today(){return new Date().toISOString().slice(0,10);}
function addDays(n){return new Date(Date.now()+n*864e5).toISOString().slice(0,10);}
/* ---- SM-2 lite ---- */
function srsRecord(q,ok){
  const k=qKey(q); const r=ST.srs[k]=ST.srs[k]||{ef:2.5,iv:0,n:0,due:today()};
  if(ok){
    r.n++;
    r.iv = r.n===1?1 : (r.n===2?3 : Math.round(r.iv*r.ef));
    r.ef = Math.min(2.8, r.ef+0.05);
  } else {
    r.n=0; r.iv=0; r.ef=Math.max(1.3, r.ef-0.2);
  }
  r.due = addDays(r.iv);
  stSave();
}
function dueList(){
  const t=today();
  return QUESTIONS.filter(function(q){const r=ST.srs[qKey(q)];return r&&r.due<=t;});
}
function startDaily(){
  let pool=dueList();
  if(pool.length<20){
    const unseen=QUESTIONS.filter(function(q){return !ST.srs[qKey(q)];});
    pool=pool.concat(shuffle(unseen).slice(0,20-pool.length));
  }
  if(!pool.length){ toast('Nothing is due. Every question is scheduled ahead.'); return; }
  stopTimer();
  S.pool=shuffle(pool).slice(0,30);
  S.mode='daily'; S.idx=0; S.correct=0; S.results=[]; resetQ(); S.view='quiz'; render();
}
MODE_LABEL.daily='Daily Review'; MODE_LABEL.sim='Exam Simulation';
/* ---- hook statRecord for SRS + achievements ---- */
var _origStatRecord=statRecord;
statRecord=function(q,ok){ _origStatRecord(q,ok); srsRecord(q,ok); achCheck(); };
var _origStatOverride=statOverride;
statOverride=function(q,toRight){ _origStatOverride(q,toRight); srsRecord(q,toRight); achCheck(); };
/* ---- exam simulations ---- */
var _coreStartMock=startMock;
startMock=function(){
  if(!S._simN){ MOCK_N=45; MOCK_SECS=38*60; }
  S._simN=null;
  _coreStartMock();
};
function startSim(n){
  S._simN=n; MOCK_N=n; MOCK_SECS=Math.round(n*(38*60/45));
  startMock();
}
function simView(){
  const v=el('<div><div class="viewhead"><h2>Exam Simulations</h2><div class="sub">Stratified draws across all '+Object.keys(cats()).length+' sections, timed at a squire\'s pace (~50 seconds per question).</div></div>'
   +'<div class="seclist" id="simlist">'
   +'<button class="secbtn" data-n="20"><span>Quick Sitting \u00b7 20 questions</span><span class="n">17 min</span></button>'
   +'<button class="secbtn" data-n="45"><span>Village Sitting \u00b7 45 questions</span><span class="n">38 min</span></button>'
   +'<button class="secbtn" data-n="50"><span>Extended \u00b7 50 questions</span><span class="n">42 min</span></button>'
   +'<button class="secbtn" data-n="100"><span>Marathon \u00b7 100 questions</span><span class="n">84 min</span></button>'
   +'</div><div class="fmtnote" style="margin-top:14px">Every simulation draws proportionally from each section, so the mix mirrors the bank, and the sitting. '+Math.round(PASS*100)+'% to pass.</div></div>');
  v.querySelectorAll('.secbtn').forEach(function(b){b.onclick=function(){startSim(+b.dataset.n);};});
  return v;
}
/* ---- achievements ---- */
var ACHIEVEMENTS=[
 {id:'first',n:'First Pour',d:'Answer 25 questions',t:function(s){return s.ans>=25;}},
 {id:'century',n:'Century',d:'Answer 100 questions',t:function(s){return s.ans>=100;}},
 {id:'millesime',n:'Mill\u00e9sime',d:'Answer 1,000 questions',t:function(s){return s.ans>=1000;}},
 {id:'bdx',n:'Bordeaux Expert',d:'80% in Bordeaux (10+ answers)',t:function(s){return s.cat('Bordeaux')>=80;}},
 {id:'bgy',n:'Burgundy Scholar',d:'80% in Burgundy (10+ answers)',t:function(s){return s.cat('Burgundy')>=80;}},
 {id:'cham',n:'Champagne King',d:'80% in Champagne (10+ answers)',t:function(s){return s.cat('Champagne')>=80;}},
 {id:'rhone',n:'Rh\u00f4ne Ranger',d:'80% in Rh\u00f4ne (10+ answers)',t:function(s){return s.cat('Rh\u00f4ne')>=80;}},
 {id:'ital',n:'Italophile',d:'80% across both Italian sections',t:function(s){return s.group(['Italy North','Italy Central & South'])>=80;}},
 {id:'iber',n:'Iberian Hand',d:'80% across Spain and Portugal',t:function(s){return s.group(['Spain','Portugal'])>=80;}},
 {id:'riesl',n:'Riesling Rider',d:'80% across Germany and Austria',t:function(s){return s.group(['Germany','Austria'])>=80;}},
 {id:'nw',n:'New World Navigator',d:'80% across the New World sections',t:function(s){return s.group(['California','Pacific NW, NY & Canada','South America','Australia','New Zealand','South Africa'])>=80;}},
 {id:'law',n:'Master of Law',d:'80% in Classifications & Labels',t:function(s){return s.cat('Classifications & Labels')>=80;}},
 {id:'icons',n:'Name Dropper',d:'80% in Producers & Icons',t:function(s){return s.cat('Producers & Icons')>=80;}},
 {id:'serv',n:'Service Professional',d:'80% in Service & Hospitality',t:function(s){return s.cat('Service & Hospitality')>=80;}},
 {id:'pair',n:'The Pairing Hand',d:'80% in Food & Pairing',t:function(s){return s.cat('Food & Pairing')>=80;}},
 {id:'beyond',n:'Beyond the Vine',d:'80% across Spirits, Beer & Cider, Sake',t:function(s){return s.group(['Spirits & Cocktails','Beer & Cider','Sake'])>=80;}},
 {id:'math',n:'The Ledger',d:'80% in Business of the Sommelier',t:function(s){return s.cat('Business of the Sommelier')>=80;}},
 {id:'d7',n:'Seven Days',d:'A 7-day study streak',t:function(s){return s.streak>=7;}},
 {id:'d40',n:'Forty Days',d:'A 40-day study streak',t:function(s){return s.streak>=40;}},
 {id:'d100',n:'The Hundred',d:'A 100-day study streak',t:function(s){return s.streak>=100;}},
 {id:'sd25',n:'Nerves of Oak',d:'A 25-run in Sudden Death',t:function(s){return (ST.best.sudden||0)>=25;}},
 {id:'perfect',n:'Clean Sweep',d:'100% on a 20+ question session',t:function(s){return !!ST.best.perfect;}},
 {id:'passed',n:'Above the Line',d:'Pass a 45-question simulation',t:function(s){return !!ST.best.passed;}},
 {id:'cov50',n:'Half the Codex',d:'Face 50% of the bank',t:function(s){return s.cov>=50;}},
 {id:'cov100',n:'Codex Complete',d:'Face every question in the bank',t:function(s){return s.cov>=100;}}
];
function achSnap(){
  const cs=catStats();
  const ans=Object.values(ST.q).reduce(function(a,r){return a+r.c+r.w;},0);
  const seen=Object.keys(cs).reduce(function(a,k){return a+cs[k].seen;},0);
  function pct(list){
    let c=0,w=0; list.forEach(function(k){const s=cs[k]; if(s){c+=s.c;w+=s.w;}});
    return (c+w)>=10?Math.round(100*c/(c+w)):0;
  }
  return {ans:ans, cov:Math.round(100*seen/QUESTIONS.length), streak:dayStreak(),
    cat:function(k){return pct([k]);}, group:function(l){return pct(l);}};
}
function achCheck(){
  const s=achSnap(); let gained=null;
  ACHIEVEMENTS.forEach(function(a){
    if(ST.ach.indexOf(a.id)<0 && a.t(s)){ ST.ach.push(a.id); gained=a; }
  });
  if(gained){ stSave(); toast(gained.n + ': ' + gained.d); }
}
function toast(msg){
  const t=el('<div class="toast">'+msg+'</div>');
  document.body.appendChild(t);
  setTimeout(function(){t.classList.add('go');},20);
  setTimeout(function(){t.remove();},4200);
}
function hallView(){
  const s=achSnap();
  const got=ST.ach.length;
  let html='<div><div class="viewhead"><h2>Hall of Fame</h2><div class="sub">'+got+' of '+ACHIEVEMENTS.length+' honors claimed \u00b7 earned through study, not luck.</div></div><div class="hall">';
  ACHIEVEMENTS.forEach(function(a){
    const on=ST.ach.indexOf(a.id)>=0;
    html+='<div class="medal'+(on?' on':'')+'"><div class="mname">'+a.n+'</div><div class="mdesc">'+a.d+'</div></div>';
  });
  html+='</div></div>';
  return el(html);
}
/* ---- new question formats ---- */
function isMT(q){return !!q.mt;} function isSEL(q){return !!q.sel;}
function gradeCustom(q,ok,userText){
  S.answered=true; if(ok)S.correct++;
  if(ok){ if(S.mode==='review')missRemove(q); } else { missAdd(q); if(S.mode==='sudden')S.suddenDead=true; }
  statRecord(q,ok);
  S.results.push({q:q,ok:ok,user:userText});
  render();
}
function mtCard(q){
  const key=qKey(q)+'|'+S.idx;
  if(S._mtKey!==key){ S._mtKey=key; S._mtOrder=shuffle(q.pairs.map(function(p,i){return i;})); S._mtSel=q.pairs.map(function(){return '';}); }
  const c=el('<div><div class="qmeta"><span class="qcat">'+q.cat+'</span><span class="qtype">Matching</span></div>'
    +'<div class="qtext">'+q.q+'</div><div class="mtbox"></div></div>');
  const box=c.querySelector('.mtbox');
  q.pairs.forEach(function(p,i){
    const row=el('<div class="mtrow"><div class="mtl">'+p[0]+'</div></div>');
    if(S.answered){
      const chosen=S._mtSel[i];
      const right=(chosen!=='' && q.pairs[+chosen][1]===p[1]);
      row.appendChild(el('<div class="mtr '+(right?'ok':'no')+'">'+(chosen===''?'no answer':q.pairs[+chosen][1])+(right?'':' \u2192 '+p[1])+'</div>'));
    } else {
      let opts='<option value="">Choose one</option>';
      S._mtOrder.forEach(function(j){ opts+='<option value="'+j+'"'+(S._mtSel[i]===String(j)?' selected':'')+'>'+q.pairs[j][1]+'</option>'; });
      const sel=el('<select class="mtsel">'+opts+'</select>');
      sel.onchange=function(){ S._mtSel[i]=sel.value; };
      row.appendChild(sel);
    }
    box.appendChild(row);
  });
  if(!S.answered){
    const b=el('<div class="sarow" style="margin-top:10px"><button class="btn" id="mtsub">Submit matches</button></div>');
    b.querySelector('#mtsub').onclick=function(){
      const ok=q.pairs.every(function(p,i){return S._mtSel[i]!=='' && q.pairs[+S._mtSel[i]][1]===p[1];});
      gradeCustom(q,ok,S._mtSel.map(function(v,i){return q.pairs[i][0]+' \u2192 '+(v===''?'no answer':q.pairs[+v][1]);}).join('; '));
    };
    c.appendChild(b);
  } else {
    c.appendChild(revealBlock(q,S.results[S.results.length-1].ok,true));
  }
  return c;
}
function selCard(q){
  const key=qKey(q)+'|'+S.idx;
  if(S._selKey!==key){ S._selKey=key; S._selSet=[]; }
  const c=el('<div><div class="qmeta"><span class="qcat">'+q.cat+'</span><span class="qtype">Select all that apply</span></div>'
    +'<div class="qtext">'+q.q+'</div><div class="opts"></div></div>');
  const box=c.querySelector('.opts');
  q.opts.forEach(function(opt,i){
    const chosen=S._selSet.indexOf(i)>=0, isAns=q.ans.indexOf(i)>=0;
    const b=el('<button class="opt sel'+(chosen?' picked':'')+'"><span class="key">'+(chosen?'\u2611':'\u2610')+'</span><span>'+opt+'</span></button>');
    if(S.answered){
      b.disabled=true;
      if(isAns)b.classList.add('correct');
      else if(chosen)b.classList.add('wrong');
      else b.classList.add('dim');
    } else {
      b.onclick=function(){
        const k=S._selSet.indexOf(i);
        if(k>=0)S._selSet.splice(k,1); else S._selSet.push(i);
        const on=S._selSet.indexOf(i)>=0;
        if(on)b.classList.add('picked'); else b.classList.remove('picked');
        b.querySelector('.key').textContent=on?'\u2611':'\u2610';
      };
    }
    box.appendChild(b);
  });
  if(!S.answered){
    const b=el('<div class="sarow" style="margin-top:10px"><button class="btn" id="selsub">Submit selection</button></div>');
    b.querySelector('#selsub').onclick=function(){
      const a=q.ans.slice().sort(), u=S._selSet.slice().sort();
      const ok=a.length===u.length&&a.every(function(x,i){return x===u[i];});
      gradeCustom(q,ok,S._selSet.length?S._selSet.map(function(i){return q.opts[i];}).join(', '):'(none)');
    };
    c.appendChild(b);
  } else {
    c.appendChild(revealBlock(q,S.results[S.results.length-1].ok,true));
  }
  return c;
}
/* ---- dispatch wrapper ---- */
var _origQuizView=quizView;
quizView=function(){
  const q=S.pool[S.idx];
  if(q&&(isMT(q)||isSEL(q))){
    const total=(S.mode==='mock'||S.mode==='sim')?MOCK_N:(S.mode==='drill'?S.pool.length:null);
    const pos=S.idx+1, pct=total?Math.round(100*pos/total):0;
    const timerHtml=(S.mode==='mock'||S.mode==='sim')?'<span id="timer" class="timer'+(S.remain<=120?' low':'')+'">'+fmtTime(S.remain)+'</span>':'';
    const v=el('<div><div class="quizbar"><span>'+(S.mode==='drill'?S.section+' \u00b7 ':'')+(total?'Question '+pos+' of '+total:'Question '+pos)+'</span>'+timerHtml+'</div>'
      +(total?'<div class="progress"><i style="width:'+pct+'%"></i></div>':'<div style="height:8px"></div>')
      +'<div class="card" id="card"></div></div>');
    v.querySelector('#card').appendChild(isMT(q)?mtCard(q):selCard(q));
    return v;
  }
  return _origQuizView();
};
/* ---- finish wrapper: session records ---- */
var _origFinish=finish;
finish=function(){
  const done=S.results.length;
  if(done>=20 && S.correct===done){ ST.best.perfect=true; }
  if((S.mode==='mock'||S.mode==='sim') && done>=45 && S.correct/done>=PASS){ ST.best.passed=true; }
  ST.sess++; stSave(); achCheck();
  _origFinish();
};
/* ---- home tiles (wrap v2 decoration) ---- */
var _origDecorateHome=decorateHome;
decorateHome=function(){
  _origDecorateHome();
  const due=dueList().length;
  const modes=document.querySelectorAll('.modes');
  const anchor=modes[modes.length-1];
  if(!anchor)return;
  const m3=el('<div class="modes" style="margin-top:14px"></div>');
  [['t-daily','\u2735','Daily Review','Spaced repetition: '+(due||'no')+' question'+(due===1?'':'s')+' due today. Answer right, it returns later; answer wrong, it returns tomorrow.'],
   ['t-sim','\u2696','Exam Simulations','Timed sittings of 20, 45, 50, or 100 questions, drawn proportionally from every section.'],
   ['t-hall','\u2748','Hall of Fame','' + ST.ach.length + ' of ' + ACHIEVEMENTS.length + ' honors claimed: regional mastery, streaks, and clean sweeps.']
  ].forEach(function(t){
    m3.appendChild(el('<button class="mode" id="'+t[0]+'"><div class="band"></div><h3>'+t[2]+'</h3><p>'+t[3]+'</p></button>'));
  });
  anchor.parentNode.insertBefore(m3,anchor.nextSibling);
  m3.querySelector('#t-daily').onclick=startDaily;
  m3.querySelector('#t-sim').onclick=function(){S.view='sim';render();};
  m3.querySelector('#t-hall').onclick=function(){S.view='hall';render();};
  if(due){
    const b=el('<button class="btn gold" style="margin-top:14px;width:100%">'+due+' due for review today: begin daily session</button>');
    b.onclick=startDaily;
    m3.parentNode.insertBefore(b,m3.nextSibling);
  }
};
/* ---- render wrapper for new views ---- */
var _v2Render=render;
render=function(){
  if(S.view==='sim'||S.view==='hall'){
    if(S.qT){clearInterval(S.qT);S.qT=null;}
    const app=document.getElementById('app');
    app.innerHTML=''; app.appendChild(topbar());
    app.appendChild(S.view==='sim'?simView():hallView());
    window.scrollTo(0,0); return;
  }
  _v2Render();
};
