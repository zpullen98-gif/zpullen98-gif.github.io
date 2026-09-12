/* ============ Codex VII: the Four-Level Court ============
   Regionale / Village / Premier Cru / Grand Cru as one app: the Court's four
   examinations under the names of Burgundy's pyramid, which climbs the same way
   a student does: the whole region, then one village, then a named parcel, then
   the few hectares that need no further qualification. The level KEYS below (intro/certified/advanced/
   master) are load-bearing: qKey bakes them into every stored stat key, so only
   the display strings may ever change. Levels switch by
   rebinding the data globals (all layers resolve them at call time); stats
   namespace by key prefix: certified keys stay UNPREFIXED so existing
   progress survives untouched. */

/* ---- snapshots of the certified globals (taken before any rebinding) ---- */
var CERT_QUESTIONS=QUESTIONS, CERT_GRAPES=GRAPES, CERT_PRIMERS=PRIMERS, CERT_GROUPS=DRILL_GROUPS;

var CORE12_NAMES=['Riesling','Chardonnay','Sauvignon Blanc','Pinot Gris / Grigio','Gewürztraminer','Chenin Blanc',
 'Pinot Noir','Cabernet Sauvignon','Merlot','Syrah / Shiraz','Zinfandel','Sangiovese'];
var INTRO_CORE12=CERT_GRAPES.filter(function(g){return CORE12_NAMES.indexOf(g.g)>=0;});

/* No numerals. The four ranks are named, not numbered: the strip below the
   title reads Regionale, Village, Premier Cru, Grand Cru, which is what a
   candidate actually calls them. A roman numeral asked the reader to decode a
   glyph to learn something the word already said. */
var LEVELS={
 intro:{key:'intro',label:"The Régionale Examination",short:'Régionale',
  bank:INTRO_QUESTIONS,grapes:INTRO_CORE12,primers:INTRO_PRIMERS,groups:INTRO_GROUPS,
  mock:{n:70,secs:45*60},pass:0.6,
  note:'A régionale wine is the whole district in one glass, and this is the whole subject in one paper: seventy questions in forty-five minutes, all multiple choice, sixty in a hundred to pass. Foundations, the world map, the classics: speed and certainty win it.'},
 certified:{key:'certified',label:"The Village Examination",short:'Village',
  bank:CERT_QUESTIONS,grapes:CERT_GRAPES,primers:CERT_PRIMERS,groups:CERT_GROUPS,
  mock:{n:45,secs:38*60},pass:0.6,
  note:'Narrowing to a village means naming what you are given: forty-five questions in thirty-eight minutes, mixing multiple choice and short answer: you must produce the answer, not pick it. The Codex mirrors that mix and grades typed answers by fuzzy match, with a self-grade override for when you know you were right.'}
};
if(typeof ADV_QUESTIONS!=='undefined')LEVELS.advanced={key:'advanced',label:"The Premier Cru Examination",short:'Premier Cru',
 bank:ADV_QUESTIONS,grapes:CERT_GRAPES.concat(typeof GRAPES_PLUS!=='undefined'?GRAPES_PLUS:[]),
 primers:typeof ADV_PRIMERS!=='undefined'?ADV_PRIMERS:CERT_PRIMERS,groups:CERT_GROUPS,
 mock:{n:60,secs:35*60},pass:0.6,
 note:'A named parcel is claimed, not guessed. Short-answer country: some sixty questions at thirty-five seconds each, deep in appellation law, producers and vintages. Produce the answer cold; recognition is no longer enough.'};
if(typeof MASTER_QUESTIONS!=='undefined')LEVELS.master={key:'master',label:"The Grand Cru Examination",short:'Grand Cru',
 bank:MASTER_QUESTIONS,grapes:CERT_GRAPES.concat(typeof GRAPES_PLUS!=='undefined'?GRAPES_PLUS:[]),
 primers:typeof MASTER_PRIMERS!=='undefined'?MASTER_PRIMERS:CERT_PRIMERS,groups:CERT_GROUPS,
 mock:{n:50,secs:50*60,oral:true},pass:0.6,
 note:'Grand cru needs no qualifier and neither may you: examined aloud, fifty minutes across the table, answers produced from memory with nothing to lean on, and seventy-five in a hundred demanded in every section. The Gauntlet mirrors it: rapid prompts, your own words, self-graded on your honour.'};
var LEVEL_ORDER=['intro','certified','advanced','master'];

var activeLevel='certified';
ST.court=ST.court||{};

/* ---- stats namespacing: certified unprefixed (existing progress), others prefixed ---- */
qKey=function(q){ return (activeLevel==='certified'?'':activeLevel+'|')+missKey(q); };
function keyOwned(k,lvl){ return lvl==='certified' ? k.indexOf('|')<0 : k.indexOf(lvl+'|')===0; }
function lvlAgg(lvl){
  lvl=lvl||activeLevel;
  var c=0,w=0;
  Object.keys(ST.q).forEach(function(k){ if(keyOwned(k,lvl)){c+=ST.q[k].c;w+=ST.q[k].w;} });
  return {c:c,w:w,n:c+w};
}
function lvlFlags(){ return ST.flags.filter(function(k){return keyOwned(k,activeLevel);}); }

/* ---- switching ---- */
function applyLevel(lvl,skipRender){
  if(!LEVELS[lvl])return;
  activeLevel=lvl;
  try{localStorage.setItem((window.OOT&&OOT.profiles)?OOT.profiles.key('codexLevel'):'codexLevel',lvl)}catch(e){}
  var L=LEVELS[lvl];
  QUESTIONS=L.bank; GRAPES=L.grapes; PRIMERS=L.primers; DRILL_GROUPS=L.groups;
  MOCK_N=L.mock.n; MOCK_SECS=L.mock.secs; PASS=L.pass;
  stopTimer(); if(S.qT){clearInterval(S.qT);S.qT=null;}
  S.mode=null;S.pool=[];S.idx=0;S.correct=0;S.results=[];S.answered=false;S.picked=null;
  S.saText='';S.saGraded=null;S.section=null;S.remain=MOCK_SECS;S.suddenDead=false;S._simN=null;
  S._mtKey=null;S._mtOrder=null;S._mtSel=null;S._selKey=null;S._selSet=null;
  S.primerKey=null;S.vidFocus=null;S.fc=null;S.tt=null;S.cmp=null;S._oral=false;S._again=null;
  MISS=[]; document.onkeydown=null;
  S.view='home';
  if(!skipRender)render();
}
(function(){
  var stored=null;
  try{stored=localStorage.getItem((window.OOT&&OOT.profiles)?OOT.profiles.key('codexLevel'):'codexLevel')}catch(e){}
  if(stored&&LEVELS[stored]&&stored!=='certified'){ applyLevel(stored,true); return; }
  if(stored) return;   /* chose Village once, and that choice stands */
  /* NEVER CHOSEN: begin at the beginning. activeLevel is declared 'certified'
     because certified stat keys are deliberately unprefixed and every existing
     record depends on that, so the declaration cannot move. What moves is what
     a device that has never chosen lands on: the second of four ranks framed
     the entire home screen, down to "0 of 1283 questions met", for somebody
     who had not started the first. ootFreshDevice() is the test this app
     already uses to ask exactly this question. */
  try{ if(typeof ootFreshDevice==='function'&&ootFreshDevice()&&LEVELS.intro) applyLevel('intro',true); }catch(e){}
})();

/* ---- per-level mock config (codex3's wrapper hard-codes 45/38min when S._simN is falsy) ---- */
var _c6StartMock=startMock;
startMock=function(){
  var L=LEVELS[activeLevel];
  if(L.mock.oral){ startGauntlet(); return; }
  S._simN=L.mock.n;
  MOCK_N=L.mock.n; MOCK_SECS=L.mock.secs;
  _c6StartMock();
};
startSim=function(n){
  var L=LEVELS[activeLevel];
  if(L.mock.oral){ startGauntlet(n); return; }
  S._simN=n; MOCK_N=n;
  MOCK_SECS=Math.round(n*(L.mock.secs/L.mock.n));
  _c6StartMock();
};
/* per-level sim menu labels */
simView=function(){
  var L=LEVELS[activeLevel];
  var lens=L.mock.oral?[20,35,50]:[20,L.mock.n,Math.round(L.mock.n*1.5),100];
  var pace=L.mock.secs/L.mock.n;
  var rows=lens.map(function(n,i){
    var mins=Math.round(n*pace/60);
    var name=n===L.mock.n?(L.mock.oral?'The Oral Gauntlet':L.short+' Exam'):(i===0?'Quick Sitting':(n>L.mock.n?(n>=100?'Marathon':'Extended'):'Sitting'));
    return '<button class="secbtn" data-n="'+n+'"><span>'+name+' · '+n+' questions</span><span class="n">'+mins+' min</span></button>';
  }).join('');
  var v=el('<div><div class="viewhead"><h2>Exam Simulations</h2><div class="sub">'+LEVELS[activeLevel].label+' · stratified draws across every section, timed at exam pace (~'+Math.round(pace)+' seconds per question).</div></div>'
   +'<div class="seclist" id="simlist">'+rows+'</div>'
   +'<div class="fmtnote" style="margin-top:14px">Every simulation draws proportionally from each section, so the mix mirrors the bank, and the sitting. '+Math.round(L.pass*100)+'% to pass.</div></div>');
  v.querySelectorAll('.secbtn').forEach(function(b){b.onclick=function(){startSim(+b.dataset.n);};});
  return v;
};

/* ---- the Oral Gauntlet (Grand Cru mock): rapid short-answer, self-graded ----
   Drawn through stratMock's per-category quotas over the true short answers,
   so the simulation copy ('draws proportionally from each section') is as true
   here as at the written ranks. stratMock reads the QUESTIONS and MOCK_N
   globals, so they are lent to it and restored. */
function startGauntlet(n){
  var all=QUESTIONS, sa=all.filter(function(q){return q.sa&&!q.mt&&!q.sel;});
  n=Math.min(n||LEVELS[activeLevel].mock.n,sa.length);
  if(!sa.length)return;
  var pool;
  QUESTIONS=sa; MOCK_N=n;
  try{ pool=stratMock(); } finally{ QUESTIONS=all; }
  if(!pool.length)return;
  S.mode='mock'; S._oral=true; S.pool=pool;
  MOCK_N=pool.length; MOCK_SECS=LEVELS[activeLevel].mock.secs;
  S.idx=0; S.correct=0; S.results=[]; S.remain=MOCK_SECS;
  resetQ(); S.view='quiz'; startTimer(); render();
}
var _c6DecorateQuiz=decorateQuiz;
decorateQuiz=function(){
  _c6DecorateQuiz();
  if(S._oral){
    var span=document.querySelector('.quizbar span');
    if(span&&span.textContent.indexOf('Oral Gauntlet')<0)span.textContent='Oral Gauntlet · '+span.textContent;
  }
};
var _c6ResultsView=resultsView;
resultsView=function(){
  var v=_c6ResultsView();
  if(S._oral){
    var sub=v.querySelector('.result-hero .sub2');
    var mins=Math.round((MOCK_SECS-S.remain)/60);
    if(sub)sub.textContent='The Oral Gauntlet · '+S.results.length+' answers produced in '+mins+' min · graded on your own honor, as the real table grades you';
  }
  return v;
};

/* ---- court record: per-level best mock, gilded pins; certified-only legacy honors ---- */
var _v6Finish=finish;
finish=function(){
  var done=S.results.length;
  var isExam=(S.mode==='mock'||S.mode==='sim');
  var hadPassed='passed' in ST.best, hadPerfect='perfect' in ST.best;
  var wasPassed=ST.best.passed, wasPerfect=ST.best.perfect;
  if(isExam&&done>=10){
    var pct=Math.round(100*S.correct/done);
    var c=ST.court[activeLevel]=ST.court[activeLevel]||{};
    if(!c.best||pct>c.best)c.best=pct;
    if(done>=LEVELS[activeLevel].mock.n&&(S.correct/done)>=PASS)c.passed=true;
    stSave();
  }
  _v6Finish();
  if(activeLevel!=='certified'){
    if(hadPassed)ST.best.passed=wasPassed; else delete ST.best.passed;
    if(hadPerfect)ST.best.perfect=wasPerfect; else delete ST.best.perfect;
    stSave();
  }
};
/* honors stay a certified pursuit */
var _v6AchCheck=achCheck;
achCheck=function(){ if(activeLevel==='certified')_v6AchCheck(); };

/* The corner seal that used to stamp the active level beside the title is gone,
   and with it the only reason topbar() was ever wrapped here. The rank a reader
   is sitting in is named in full on the Court Standing strip immediately below,
   which is a better place for it: it is a label there, not a glyph to decode. */

/* ---- Court Standing strip + per-level home copy ---- */
function courtStrip(){
  var wrap=el('<div class="courtstrip"></div>');
  LEVEL_ORDER.forEach(function(lv){
    var L=LEVELS[lv];
    if(!L){
      wrap.appendChild(el('<div class="courtpin sealed"><div class="cpname">'+(lv==='advanced'?'Premier Cru':'Grand Cru')+'</div><div class="cpstat">In the cellar</div></div>'));
      return;
    }
    var rec=ST.court[lv]||{};
    var agg=lvlAgg(lv);
    var seen={}; var seenN=0;
    L.bank.forEach(function(q){
      var k=(lv==='certified'?'':lv+'|')+missKey(q);
      var r=ST.q[k]; if(r&&(r.c+r.w)>0)seenN++;
    });
    var cov=Math.round(100*seenN/L.bank.length);
    var on=lv===activeLevel;
    var p=el('<button class="courtpin'+(on?' on':'')+(rec.passed?' gilded':'')+'">'
      +'<div class="cpname">'+L.short+'</div>'
      +'<div class="cpstat">'+(rec.passed?'Passed':(rec.best?('Best '+rec.best+'%'):(cov?cov+'% faced':'Untouched')))+'</div></button>');
    p.onclick=function(){ if(lv!==activeLevel)applyLevel(lv); };
    wrap.appendChild(p);
  });
  return wrap;
}
var _v6DecorateHome=decorateHome;
decorateHome=function(){
  _v6DecorateHome();
  var L=LEVELS[activeLevel];
  /* The four rank pins are the ONLY control that changes rank, so they stay.
     They no longer open the page: codex14 moves them down into Examination,
     where choosing which paper you are working towards actually belongs. The
     hero they used to sit above is gone, along with the per-level copy that
     was written into it. */
  var modes=document.querySelector('.modes');
  if(modes&&modes.parentNode)modes.parentNode.insertBefore(courtStrip(),modes);
  /* mock tile copy */
  var mock=document.getElementById('m-mock');
  if(mock){
    if(L.mock.oral){ mock.querySelector('h3').textContent='The Oral Gauntlet';
      mock.querySelector('p').textContent='Fifty minutes of rapid prompts, answered in your own words and graded on your honour, the shape of the ruler\'s table.'; }
    else mock.querySelector('p').textContent=L.mock.n+' random questions, '+Math.round(L.mock.secs/60)+'-minute clock, '+Math.round(L.pass*100)+'% to pass. Drawn from every section, just like the day itself.';
  }
  /* level-true studyline */
  var sl=document.querySelector('.studyline');
  var agg=lvlAgg();
  if(sl){
    if(agg.n)sl.textContent=dayStreak()+'-day streak · lifetime '+Math.round(100*agg.c/Math.max(1,agg.n))+'% on '+agg.n+' '+L.short+' answers';
    else sl.remove();
  }
  /* honours are a Village pursuit (achCheck below): the tile leaves the other ranks */
  if(activeLevel!=='certified'){ var hallT=document.getElementById('t-hall'); if(hallT)hallT.remove(); }
  /* flagged tile counts only this level's bookmarks */
  var flag=document.getElementById('t-flag');
  if(flag){
    var nf=lvlFlags().length;
    flag.querySelector('p').textContent='Drill your '+nf+' bookmarked questions.';
    flag.disabled=!nf;
  }
  /* THE COMPENDIUM, AT EVERY RANK.
     It was gated to intro, which meant the twelve hand-drawn maps and their
     ninety eight regions were invisible at the three ranks where tasting and
     service are actually examined. A region does not move when a student is
     promoted, and a Premier Cru candidate needs the map more than a beginner
     does, not less. The tile keeps its own name at intro and loses the rank
     word above it, because it is no longer a Régionale thing. */
  if(true){
    var modes=document.querySelectorAll('.modes');
    var anchor=modes[modes.length-1];
    if(anchor&&!document.getElementById('t-compendium')){
      var m7=el('<div class="modes" style="margin-top:14px"></div>');
      m7.appendChild(el('<button class="mode" id="t-compendium"><div class="band"></div><h3>'+(activeLevel==='intro'?'The Régionale Compendium':'The Compendium')+'</h3><p>'
        +INTRO_ATLAS.length+' hand-drawn country maps with '+INTRO_ATLAS.reduce(function(a,c){return a+c.r.length;},0)+' regions, classification pyramids for '+INTRO_CLASS.length+' nations, winemaking, soils, sweet wines, and all '+INTRO_GRAPES.length+' grapes.</p></button>'));
      anchor.parentNode.insertBefore(m7,anchor.nextSibling);
      m7.querySelector('#t-compendium').onclick=function(){S.cmp=null;S.view='compendium';render();};
    }
  }
};
/* flagged review pools only this level's flags */
startFlagged=function(){
  var set={}; lvlFlags().forEach(function(k){set[k]=1;});
  var pool=QUESTIONS.filter(function(q){return set[qKey(q)];});
  if(!pool.length)return;
  stopTimer(); S.pool=shuffle(pool); S.mode='flagged'; S.idx=0; S.correct=0; S.results=[]; resetQ(); S.view='quiz'; render();
};
/* dashboard aggregates honor the level */
var _v6DashView2=dashView;
dashView=function(){
  var v=_v6DashView2();
  var agg=lvlAgg();
  var cs=catStats();
  var seen=Object.keys(cs).reduce(function(a,k){return a+cs[k].seen;},0);
  var acc=agg.n?Math.round(100*agg.c/agg.n):0;
  var ready=Math.round(acc*Math.min(1,seen/(0.6*QUESTIONS.length)));
  var bs=v.querySelectorAll('.statrow .stat b');
  if(bs[0])bs[0].textContent=acc+'%';
  if(bs[2])bs[2].textContent=ready+'%';
  var head=v.querySelector('.viewhead .sub');
  if(head)head.textContent=LEVELS[activeLevel].label+' · accuracy × coverage, by section. Readiness weighs your accuracy by how much of this level’s bank you’ve faced.';
  return v;
};

/* ---- primers: html-body chapters (Intro) alongside fact-sheet chapters ---- */
var _v6PrimerList=primerList;
primerList=function(){
  if(!PRIMERS.length||!PRIMERS[0].body)return _v6PrimerList();
  var groups=[]; var byG={};
  PRIMERS.forEach(function(p,i){
    if(!byG[p.g]){byG[p.g]=[];groups.push(p.g);}
    byG[p.g].push(i);
  });
  var html='<div><div class="viewhead"><h2>Study Chapters</h2><div class="sub">The Régionale course, chapter by chapter: read a region, then drill its section.</div></div>';
  groups.forEach(function(g){
    html+='<div class="secgroup">'+g+'</div><div class="seclist">'
      +byG[g].map(function(i){return '<button class="secbtn" data-p="'+i+'"><span>'+PRIMERS[i].t+'</span><span class="n">›</span></button>';}).join('')
      +'</div>';
  });
  html+='</div>';
  var v=el(html);
  v.querySelectorAll('.secbtn').forEach(function(b){
    b.onclick=function(){S.primerKey=+b.dataset.p;S.view='primer';render();};
  });
  return v;
};
var _v6PrimerView=primerView;
primerView=function(){
  var p=PRIMERS[S.primerKey];
  if(!p||!p.body)return _v6PrimerView();
  var v=el('<div><div class="viewhead"><h2>'+p.t+'</h2><div class="sub">'+p.g+' · a Régionale chapter</div></div>'
    +'<div class="card primerpage chapterbody">'+p.body+'</div>'
    +'<div class="centerrow"><button class="btn ghost" id="pr-back">All chapters</button></div></div>');
  v.querySelector('#pr-back').onclick=function(){S.view='primers';render();};
  return v;
};

/* ---- the Intro Compendium ---- */
function escT(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function atlasMapSVG(c,selIdx){
  function anc(a){return a==='s'?'start':a==='e'?'end':'middle';}
  var vb=c.vb.split(/\s+/).map(Number);
  var FF='EB Garamond,Georgia,serif';
  var s='<svg viewBox="'+c.vb+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of '+escT(c.name)+'">';
  s+='<defs><marker id="atlasArr" markerWidth="5" markerHeight="5" refX="2" refY="2.2" orient="auto"><path d="M0,0 L4,2.2 L0,4.4 Z" fill="#4f86ab"/></marker></defs>';
  s+='<path d="'+c.d+'" fill="#f3ead5" stroke="#9a7b45" stroke-width="0.8" stroke-linejoin="round"/>';
  if(c.dash)s+='<path d="'+c.dash+'" fill="none" stroke="#9a7b45" stroke-width="0.6" stroke-dasharray="2 2"/>';
  (c.mtns||[]).forEach(function(m){
    s+='<path d="'+m.d+'" fill="none" stroke="#9c7b4f" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="0.4 1.8" opacity="0.62"/>';
    s+='<text x="'+m.lx+'" y="'+m.ly+'" text-anchor="'+anc(m.a)+'" font-size="2.8" font-style="italic" fill="#7a5630" font-family="'+FF+'">'+escT(m.n)+'</text>';
  });
  (c.rivers||[]).forEach(function(r){
    s+='<path d="'+r.d+'" fill="none" stroke="#4f86ab" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" opacity="0.92"/>';
    s+='<text x="'+r.lx+'" y="'+r.ly+'" text-anchor="'+anc(r.a)+'" font-size="2.7" font-style="italic" fill="#3f6f93" font-family="'+FF+'">'+escT(r.n)+'</text>';
  });
  (c.lakes||[]).forEach(function(l){
    s+='<ellipse cx="'+l.cx+'" cy="'+l.cy+'" rx="'+l.rx+'" ry="'+l.ry+'" fill="#6f9fc0" stroke="#3f6f93" stroke-width="0.4"/>';
    s+='<text x="'+(l.cx+l.rx+1)+'" y="'+(l.cy+1)+'" text-anchor="start" font-size="2.6" font-style="italic" fill="#3f6f93" font-family="'+FF+'">'+escT(l.n)+'</text>';
  });
  (c.feats||[]).forEach(function(f){
    s+='<path d="'+f.d+'" fill="none" stroke="#4f86ab" stroke-width="0.8" stroke-dasharray="2 1.4" marker-end="url(#atlasArr)" opacity="0.9"/>';
    s+='<text x="'+f.lx+'" y="'+f.ly+'" text-anchor="'+anc(f.a)+'" font-size="2.5" font-style="italic" fill="#3f6f93" font-family="'+FF+'">'+escT(f.n)+'</text>';
  });
  (c.water||[]).forEach(function(w){
    s+='<text x="'+w.x+'" y="'+w.y+'" text-anchor="'+anc(w.a)+'" font-size="3.1" font-style="italic" fill="#6f9bbb" letter-spacing="0.3" font-family="'+FF+'">'+escT(w.n)+'</text>';
  });
  (c.cities||[]).forEach(function(ct){
    s+='<rect x="'+(ct.x-0.9)+'" y="'+(ct.y-0.9)+'" width="1.8" height="1.8" fill="#2a1d16"/>';
    s+='<text x="'+(ct.x+2.4)+'" y="'+(ct.y+1)+'" text-anchor="start" font-size="2.7" font-weight="600" fill="#2a1d16" font-family="'+FF+'">'+escT(ct.n)+'</text>';
  });
  c.r.forEach(function(rg,i){
    var sel=selIdx===i, rr=sel?3.8:2.7;
    s+='<g class="atlas-pin" data-ri="'+i+'">';
    s+='<circle cx="'+rg.x+'" cy="'+rg.y+'" r="'+(rr+2.5)+'" fill="transparent"/>';
    s+='<circle cx="'+rg.x+'" cy="'+rg.y+'" r="'+rr+'" fill="'+(sel?'#c8973f':'#8d2f3f')+'" stroke="#fff" stroke-width="0.7"/>';
    s+='<text x="'+rg.x+'" y="'+(rg.y+rr*0.55)+'" text-anchor="middle" font-size="'+(sel?3.7:3)+'" font-weight="700" fill="'+(sel?'#2a1d16':'#fff')+'" font-family="'+FF+'" style="pointer-events:none">'+(i+1)+'</text>';
    s+='</g>';
  });
  var ncx=vb[0]+vb[2]-7, ncy=vb[1]+8;
  s+='<g opacity="0.85"><path d="M'+ncx+','+(ncy-3)+' L'+(ncx-1.7)+','+(ncy+1.5)+' L'+ncx+','+(ncy+0.4)+' L'+(ncx+1.7)+','+(ncy+1.5)+' Z" fill="#8d2f3f"/><text x="'+ncx+'" y="'+(ncy+5.4)+'" text-anchor="middle" font-size="3" font-weight="700" fill="#7a5630" font-family="'+FF+'">N</text></g>';
  s+='</svg>';
  return s;
}
var CMP_SECTIONS=[
 ['atlas','🗺','Wine Atlas','Hand-drawn country maps: regions, rivers, mountains, soils'],
 ['class','⚖','Classifications & Labels','Quality pyramids, label terms, and the traps, nation by nation'],
 ['wine','🍇','Winemaking','Grape to bottle, and the signature techniques with their homes'],
 ['soil','🪨','Soil & Terroir','The famous rocks and everything that grows best in them'],
 ['dess','🍯','Dessert Wines','Sweetness by method: rot, raisin, freeze, late-pick, fortify'],
 ['grapes','✧','The Grapes',"Every variety on the Régionale list: structure, aromas, traps"]
];
function compendiumView(){
  S.cmp=S.cmp||{sec:null,idx:null,reg:null};
  var c=S.cmp;
  if(!c.sec){
    var v=el('<div><div class="viewhead"><h2>The Régionale Compendium</h2><div class="sub">The visual references of the Régionale course: study a map or a pyramid, then drill the matching section.</div></div><div class="modes" id="cmp-tiles"></div></div>');
    var box=v.querySelector('#cmp-tiles');
    CMP_SECTIONS.forEach(function(sec){
      var b=el('<button class="mode"><div class="band"></div><h3>'+sec[2]+'</h3><p>'+sec[3]+'</p></button>');
      b.onclick=function(){c.sec=sec[0];c.idx=null;c.reg=null;render();};
      box.appendChild(b);
    });
    return v;
  }
  var back='<button class="btn ghost small" id="cmp-back">Compendium</button>';
  if(c.sec==='atlas')return atlasView(c,back);
  if(c.sec==='class')return classView(c,back);
  if(c.sec==='grapes')return grapesView(c,back);
  var DB=c.sec==='wine'?INTRO_WINE:(c.sec==='soil'?INTRO_SOIL:INTRO_DESS);
  var title=c.sec==='wine'?'Winemaking':(c.sec==='soil'?'Soil & Terroir':'Dessert Wines');
  return topicView(DB,title,c,back);
}
function cmpBackBtn(v){
  var b=v.querySelector('#cmp-back');
  if(b)b.onclick=function(){
    if(S.cmp.idx!==null){S.cmp.idx=null;S.cmp.reg=null;}
    else S.cmp.sec=null;
    render();
  };
}
function atlasView(c,back){
  if(c.idx===null){
    var v=el('<div><div class="viewhead"><h2>Wine Atlas</h2><div class="sub">Tap a country; every region carries its grapes and signature soil.</div></div>'
      +'<div class="seclist">'+INTRO_ATLAS.map(function(x,i){return '<button class="secbtn" data-i="'+i+'"><span>'+escT(x.name)+'</span><span class="n">'+x.r.length+'</span></button>';}).join('')+'</div>'
      +'<div class="centerrow">'+back+'</div></div>');
    v.querySelectorAll('.secbtn').forEach(function(b){b.onclick=function(){c.idx=+b.dataset.i;c.reg=null;render();};});
    cmpBackBtn(v);
    return v;
  }
  var cy=INTRO_ATLAS[c.idx];
  var legend=cy.r.map(function(rg,i){
    var sel=c.reg===i;
    return '<button class="leg-row'+(sel?' sel':'')+'" data-ri="'+i+'"><span class="leg-badge">'+(i+1)+'</span><span class="leg-tx"><span class="leg-nm">'+escT(rg.n)+'</span><span class="leg-g">'+escT(rg.g)+'</span>'+(rg.soil?'<span class="leg-soil"><b>Soil:</b> '+escT(rg.soil)+'</span>':'')+'</span></button>';
  }).join('');
  var v=el('<div><div class="viewhead"><h2>'+escT(cy.name)+'</h2><div class="sub">Tap a pin or a row to highlight the region.</div></div>'
    +'<div class="card mapwrap">'+atlasMapSVG(cy,c.reg)+'</div>'
    +(cy.note?'<div class="fmtnote" style="margin-top:8px">'+escT(cy.note)+'</div>':'')
    +'<div class="maplegend">'+legend+'</div>'
    +'<div class="centerrow">'+back+'</div></div>');
  function sel(i){ c.reg=(c.reg===i?null:i); render(); }
  v.querySelectorAll('.atlas-pin').forEach(function(p){p.style.cursor='pointer';p.onclick=function(){sel(+p.dataset.ri);};});
  v.querySelectorAll('.leg-row').forEach(function(r){r.onclick=function(){sel(+r.dataset.ri);};});
  cmpBackBtn(v);
  return v;
}
function classView(c,back){
  if(c.idx===null){
    var v=el('<div><div class="viewhead"><h2>Classifications &amp; Labels</h2><div class="sub">A nation’s pyramid, label vocabulary, and the traps examiners love.</div></div>'
      +'<div class="seclist">'+INTRO_CLASS.map(function(x,i){return '<button class="secbtn" data-i="'+i+'"><span>'+escT(x.name)+'</span><span class="n">›</span></button>';}).join('')+'</div>'
      +'<div class="centerrow"><button class="btn gold" id="cls-quiz">Test me on all classifications →</button>'+back+'</div></div>');
    v.querySelectorAll('.secbtn').forEach(function(b){b.onclick=function(){c.idx=+b.dataset.i;render();};});
    v.querySelector('#cls-quiz').onclick=function(){startClassQuiz(null);};
    cmpBackBtn(v);
    return v;
  }
  var x=INTRO_CLASS[c.idx];
  var n=x.pyramid.length;
  var pyr=x.pyramid.map(function(p,i){
    var w=n<=1?100:Math.round(54+i*(46/(n-1)));
    return '<div class="pyr-row"><div class="pyr-bar" style="width:'+w+'%">'+escT(p.t)+'</div><div class="pyr-d">'+escT(p.d)+'</div></div>';
  }).join('');
  var html='<div><div class="viewhead"><h2>'+escT(x.name)+'</h2></div>'
    +'<div class="cls-framework">'+escT(x.framework)+'</div>'
    +'<div class="secgroup">Quality hierarchy</div><div class="pyramid">'+pyr+'</div>'
    +'<div class="secgroup">Classification systems</div>'+x.systems.map(function(s){return '<div class="sysitem"><b>'+escT(s.n)+'</b><span>'+escT(s.d)+'</span></div>';}).join('');
  if(x.aging&&x.aging.length)html+='<div class="secgroup">Aging &amp; ripeness</div>'+x.aging.map(function(a){return '<div class="sysitem"><b>'+escT(a.t)+'</b><span>'+escT(a.d)+'</span></div>';}).join('');
  html+='<div class="secgroup">Label terms to know</div>'+x.terms.map(function(t){return '<div class="sysitem"><b>'+escT(t.t)+'</b><span>'+escT(t.d)+'</span></div>';}).join('');
  html+='<div class="secgroup">Watch out for</div>'+x.traps.map(function(t){return '<div class="trap-i">'+escT(t)+'</div>';}).join('');
  html+='<div class="centerrow"><button class="btn gold" id="cls-quiz">Test me on '+escT(x.name)+' →</button>'+back+'</div></div>';
  var v=el(html);
  v.querySelector('#cls-quiz').onclick=function(){startClassQuiz(x.name);};
  cmpBackBtn(v);
  return v;
}
function topicView(DB,title,c,back){
  if(c.idx===null){
    var v=el('<div><div class="viewhead"><h2>'+title+'</h2><div class="sub">Pick a topic.</div></div>'
      +'<div class="seclist">'+DB.map(function(t,i){return '<button class="secbtn" data-i="'+i+'"><span>'+escT(t.name)+'</span><span class="n">'+escT(t.tag)+'</span></button>';}).join('')+'</div>'
      +'<div class="centerrow">'+back+'</div></div>');
    v.querySelectorAll('.secbtn').forEach(function(b){b.onclick=function(){c.idx=+b.dataset.i;render();};});
    cmpBackBtn(v);
    return v;
  }
  var t=DB[c.idx],html='<div><div class="viewhead"><h2>'+escT(t.name)+'</h2></div>'
    +'<div class="cls-framework">'+escT(t.intro)+'</div>';
  if(t.flow&&t.flow.length)html+='<div class="secgroup">Process steps</div>'
    +t.flow.map(function(s,i){return '<div class="flowstep"><b><span class="flow-n">'+(i+1)+'</span>'+escT(s.t)+'</b><div class="flow-d">'+escT(s.d)+'</div></div>';}).join('');
  if(t.tech&&t.tech.length)html+='<div class="secgroup">'+(title==='Winemaking'?'Techniques &amp; where they happen':'The wines &amp; where to find them')+'</div>'
    +t.tech.map(function(x){return '<div class="techitem"><b>'+escT(x.n)+'</b><div class="tech-d">'+escT(x.d)+'</div><span class="where-chip">'+escT(x.w)+'</span></div>';}).join('');
  if(t.terms&&t.terms.length)html+='<div class="secgroup">Key points</div>'
    +t.terms.map(function(x){return '<div class="sysitem"><b>'+escT(x.t)+'</b><span>'+escT(x.d)+'</span></div>';}).join('');
  if(t.traps&&t.traps.length)html+='<div class="secgroup">Watch out for</div>'
    +t.traps.map(function(x){return '<div class="trap-i">'+escT(x)+'</div>';}).join('');
  html+='<div class="centerrow">'+back+'</div></div>';
  var v=el(html);
  cmpBackBtn(v);
  return v;
}
function grapesView(c,back){
  function dots(v2){return '●●●'.slice(0,v2)+'○○○'.slice(0,3-v2);}
  var groups=[['White grapes','white'],['Red grapes','red']];
  var html='<div><div class="viewhead"><h2>The Grapes of the Régionale List</h2><div class="sub">'+INTRO_GRAPES.length+' varieties: structure on a three-dot scale, the aromas, the regions that imply them (marked *), and the traps.</div></div>';
  groups.forEach(function(g){
    html+='<div class="secgroup">'+g[0]+'</div>';
    INTRO_GRAPES.filter(function(x){return x.c===g[1];}).forEach(function(x){
      html+='<div class="grape-row"><div class="grape-head"><b>'+escT(x.n)+'</b><span class="grape-struct">Acid '+dots(x.acid)+' · Body '+dots(x.body)+(x.c==='red'?' · Tannin '+dots(x.tan):'')+(x.sweet?' · '+escT(x.sweet):'')+'</span></div>'
        +'<div class="grape-line"><b>Aromas</b> '+escT(x.aroma)+'</div>'
        +'<div class="grape-line"><b>Regions</b> '+escT(x.reg).replace(/★/g,'*')+(x.syn&&x.syn!=='-'?' · <b>Also called</b> '+escT(x.syn):'')+'</div>'
        +'<div class="grape-line trapline"><b>Trap</b> '+escT(x.trap)+'</div>'
        +(x.wines?'<div class="grape-line"><b>Look for</b> '+escT(x.wines)+'</div>':'')
        +'</div>';
    });
  });
  html+='<div class="centerrow">'+back+'</div></div>';
  var v=el(html);
  cmpBackBtn(v);
  return v;
}
/* ---- classifications quiz (generated from INTRO_CLASS) ---- */
function uniqOpts(correct,distrs){
  var seen={},out=[correct];seen[correct]=1;
  for(var k=0;k<distrs.length&&out.length<4;k++){var d=distrs[k];if(d&&!seen[d]){seen[d]=1;out.push(d);}}
  return out;
}
function startClassQuiz(cty){
  var qs=[],allTerms=[],meanCount={};
  INTRO_CLASS.forEach(function(x){x.terms.forEach(function(t){allTerms.push({term:t.t,mean:t.d,cty:x.name});});});
  allTerms.forEach(function(t){meanCount[t.mean]=(meanCount[t.mean]||0)+1;});
  var allTiers=INTRO_CLASS.reduce(function(acc,x){return acc.concat(x.pyramid.map(function(p){return p.t;}));},[]);
  INTRO_CLASS.filter(function(x){return !cty||x.name===cty;}).forEach(function(x){
    x.terms.forEach(function(t){
      var dm=shuffle(allTerms.filter(function(y){return y.mean!==t.d;}).map(function(y){return y.mean;}));
      var o1raw=uniqOpts(t.d,dm);
      if(o1raw.length===4){
        var perm=shuffle([0,1,2,3]);
        qs.push({cat:'Classifications',q:x.name+': what does “'+t.t+'” mean on a label?',opts:perm.map(function(i){return o1raw[i];}),a:perm.indexOf(0),exp:x.name+': “'+t.t+'” = '+t.d});
      }
      if(meanCount[t.d]===1&&!t.t.toLowerCase().split(/[^a-zà-ÿ]+/).some(function(w){return w.length>=4&&t.d.toLowerCase().indexOf(w)>=0;})){
        var dt=shuffle(allTerms.filter(function(y){return y.term!==t.t;}).map(function(y){return y.term;}));
        var o2raw=uniqOpts(t.t,dt);
        if(o2raw.length===4){
          var p2=shuffle([0,1,2,3]);
          qs.push({cat:'Classifications',q:'Which '+x.name+' label term means “'+t.d+'”?',opts:p2.map(function(i){return o2raw[i];}),a:p2.indexOf(0),exp:x.name+': “'+t.t+'” = '+t.d});
        }
      }
    });
    if(x.pyramid.length>=2){
      var tiers=x.pyramid.map(function(p){return p.t;});
      var others=shuffle(allTiers.filter(function(y){return tiers.indexOf(y)<0;}));
      [[tiers[0],'TOP (highest)'],[tiers[tiers.length-1],'most BASIC (entry)']].forEach(function(pair){
        var raw=uniqOpts(pair[0],shuffle(tiers.filter(function(t){return t!==pair[0];})).concat(others));
        if(raw.length===4){
          var p3=shuffle([0,1,2,3]);
          qs.push({cat:'Classifications',q:'In '+x.name+'’s quality hierarchy, which is the '+pair[1]+' tier?',opts:p3.map(function(i){return raw[i];}),a:p3.indexOf(0),exp:x.name+': '+pair[0]+'.'});
        }
      });
    }
  });
  INTRO_CLASS_TRAPQ.filter(function(t){return !cty||t.cty===cty;}).forEach(function(t){
    qs.push({cat:'Classifications',q:t.q,opts:t.opts.slice(),a:t.a,exp:t.exp});
  });
  qs=shuffle(qs);
  if(!cty&&qs.length>60)qs=qs.slice(0,60);
  if(!qs.length)return;
  stopTimer(); S.mode='drill'; S.section='Classifications Quiz'+(cty?' · '+cty:'');
  S._again=function(){startClassQuiz(cty);};   /* the results screen's Redrill rebuilds, not refilters */
  S.pool=qs; S.idx=0; S.correct=0; S.results=[]; resetQ(); S.view='quiz'; render();
}

/* ═══════════ Grand Cru flights: the origin call ═══════════
   At Grand Cru the grape alone is not a conclusion. After each variety call the
   candidate must place the wine, as the deductive grid's final conclusion demands. */
function ttRegionOf(g){ return String(g.regions||'').split(/[,;(]/)[0].trim(); }
function ttOriginOpts(ti){
  var t=GRAPES[ti], correct=ttRegionOf(t);
  var pool=GRAPES.map(function(g,i){return i;}).filter(function(i){
    return i!==ti && GRAPES[i].c===t.c && ttRegionOf(GRAPES[i]) && ttRegionOf(GRAPES[i])!==correct;
  });
  var seen={}; seen[correct.toLowerCase()]=1;
  var picks=[];
  shuffle(pool).forEach(function(i){
    var r=ttRegionOf(GRAPES[i]);
    if(picks.length<3&&!seen[r.toLowerCase()]){ seen[r.toLowerCase()]=1; picks.push(r); }
  });
  return shuffle([correct].concat(picks));
}
function ttPickOrigin(i){
  if(S.tt.originPicked!==null&&S.tt.originPicked!==undefined)return;
  S.tt.originPicked=i;
  if(S.tt.originOpts[i]===ttRegionOf(GRAPES[S.tt.deck[S.tt.idx]]))S.tt.originScore=(S.tt.originScore||0)+1;
  render();
}
var _v6TastingView=tastingView;
tastingView=function(){
  var v=_v6TastingView();
  if(!LEVELS[activeLevel].mock.oral)return v;              /* Master only */
  if(!S.tt||S.tt.idx>=S.tt.deck.length||!S.tt.answered)return v;
  var rev=v.querySelector('.reveal');
  if(!rev)return v;
  var ti=S.tt.deck[S.tt.idx], g=GRAPES[ti];
  if(!S.tt.originOpts||S.tt._originFor!==S.tt.idx){
    S.tt._originFor=S.tt.idx; S.tt.originOpts=ttOriginOpts(ti); S.tt.originPicked=null;
  }
  var picked=S.tt.originPicked;
  var row=rev.querySelector('.nextrow');
  var box=el('<div class="originblock"><div class="qtext" style="font-size:17px;margin:6px 0 10px">Final conclusion: where is it from?</div><div class="opts"></div></div>');
  var opts=box.querySelector('.opts'), keys=['A','B','C','D'];
  S.tt.originOpts.forEach(function(r,i){
    var b=el('<button class="opt"><span class="key">'+keys[i]+'</span><span>'+r+'</span></button>');
    if(picked!==null&&picked!==undefined){
      b.disabled=true;
      if(r===ttRegionOf(g))b.classList.add('correct');
      else if(i===picked)b.classList.add('wrong');
      else b.classList.add('dim');
    } else b.onclick=function(){ttPickOrigin(i);};
    opts.appendChild(b);
  });
  if(picked===null||picked===undefined){ if(row)row.style.display='none'; }
  else box.appendChild(el('<div class="exp" style="margin-top:8px">Full range: '+g.regions+'</div>'));
  if(row)rev.insertBefore(box,row); else rev.appendChild(box);
  return v;
};
var _v6TtNext=ttNext;
ttNext=function(){ if(S.tt){S.tt.originPicked=null;S.tt.originOpts=null;S.tt._originFor=null;} _v6TtNext(); };
var _v6TastingTally=tastingTally;
tastingTally=function(){
  var v=_v6TastingTally();
  if(LEVELS[activeLevel].mock.oral&&S.tt&&S.tt.originScore!==undefined){
    var sub=v.querySelector('.result-hero .sub2');
    if(sub)sub.textContent='Varieties '+S.tt.score+'/'+S.tt.deck.length+' · origins '+S.tt.originScore+'/'+S.tt.deck.length+' · '+sub.textContent;
  }
  return v;
};
/* the origin call claims the number keys once the variety is settled */
document.addEventListener('keydown',function(e){
  if(!LEVELS[activeLevel].mock.oral)return;
  if(S.view!=='tasting'||!S.tt||!S.tt.answered||S.tt.idx>=S.tt.deck.length)return;
  if(S.tt.originPicked!==null&&S.tt.originPicked!==undefined)return;
  var tag=(e.target&&e.target.tagName||'').toLowerCase();
  if(tag==='input'||tag==='textarea')return;
  if(['1','2','3','4'].indexOf(e.key)>=0){e.preventDefault();e.stopPropagation();ttPickOrigin(parseInt(e.key,10)-1);}
},true);

/* ---- routing ---- */
var _v6Render3=render;
render=function(){
  if(S.view==='compendium'){
    if(S.qT){clearInterval(S.qT);S.qT=null;}
    var app=document.getElementById('app');
    app.innerHTML=''; app.appendChild(topbar()); app.appendChild(compendiumView());
    if(!S.cmp||S.cmp.reg===null||S.cmp.reg===undefined)window.scrollTo(0,0);
    return;
  }
  _v6Render3();
};

/* ---- videos: map Intro's category names onto existing topics ---- */
(function(){
  var add={"Italy":"Italy","United States":"The New World","Sparkling/Fortified/Sweet":"Champagne & Sparkling",
   "Dessert & Sweet Wines":"Fortified & Sweet","Beer":"Spirits, Beer & Sake","Sake & Spirits":"Spirits, Beer & Sake",
   "Wine Law":"Bordeaux","Label Reading":"Germany & Austria","Winemaking Techniques":"The Deductive Tasting",
   "Soil & Terroir":"The Deductive Tasting","Tasting & Service":"Service Technique",
   "Grapes & Labels":"The Tasting Craft","History & Figures":"Exam Strategy","Classifications":"Bordeaux"};
  Object.keys(add).forEach(function(k){ if(!CAT_TOPIC[k])CAT_TOPIC[k]=add[k]; });
})();
