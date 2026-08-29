/* ============ Codex XI: honest readiness ============
   Three separate ways the app told a candidate they were ready when they were not.

   1. `LEVELS.master.pass` was 0.6. The Master Diploma requires 75% in each
      section, and at Master the score is self-reported, since the Gauntlet is
      spoken and graded on honour. A self-awarded 60% was being displayed with
      the same authority as a real result.

   2. `resultsView` stamped a verdict on every mode. Weakness Review exists to
      serve your worst material, so scoring badly there is the mode working;
      "BELOW 60%" was punishing the candidate for using the tool correctly. It
      also hard-coded both the word "Certified" and the figure 60%, so an
      Advanced or Master mock was judged against the wrong bar and told the
      wrong story about which exam it was.

   3. Readiness read theory alone. Certified, Advanced and Master are each
      examined on theory, tasting AND service, so "Passed" could be shown to
      someone who had never opened a tasting flight, and the service rehearsal
      was never persisted at all, so there was nothing to read even in principle.

   The fix is not to hide the score. It is to say which section it belongs to,
   which bar it was measured against, and what has not been measured at all. */

/* ---- 1. the Master bar ---- */
if(LEVELS.master){
  LEVELS.master.pass=0.75;
  /* codex7's boot may already have applied the level and copied the old bar */
  if(activeLevel==='master')PASS=LEVELS.master.pass;
}

/* Which sections each examination actually has. The Regionale examination (the
   Court's Introductory) is a written theory paper: it has no tasting or service section,
   so demanding them there would invent a requirement the Court does not set. */
var EXAM_SECTIONS={intro:['theory'],certified:['theory','tasting','service'],
                   advanced:['theory','tasting','service'],master:['theory','tasting','service']};
function levelSections(lvl){ return EXAM_SECTIONS[lvl||activeLevel]||['theory']; }
function levelHasSection(lvl,s){ return levelSections(lvl).indexOf(s)>=0; }

/* ---- 2. persist the service rehearsal ----
   codex6 keeps the ticked steps in S.svc, which dies with the session, so the
   readiness model had no service signal to read. This does not turn the ritual
   into a graded exercise (that is still open work); it just remembers it. */
if(typeof ST_DEFAULTS!=='undefined')ST_DEFAULTS.serv={};
ST.serv=ST.serv||{};

function servTotalSteps(){
  var n=0; (typeof SERVICE!=='undefined'?SERVICE:[]).forEach(function(r){n+=r.steps.length;});
  return n;
}
function servDoneSteps(svc){
  var n=0;
  Object.keys(svc||{}).forEach(function(r){
    (svc[r]||[]).forEach(function(on){ if(on)n++; });
  });
  return n;
}
function servSave(){ ST.serv={svc:S.svc||{},ts:today()}; stSave(); }
function servRestore(){
  if(!S.svc&&ST.serv&&ST.serv.svc){
    try{ S.svc=JSON.parse(JSON.stringify(ST.serv.svc)); }catch(e){ S.svc=null; }
  }
}
var _v10ServiceView=serviceView;
serviceView=function(){
  servRestore();
  var v=_v10ServiceView();
  /* codex6 assigns row.onclick and toggles in place; an added listener runs
     after it, so S.svc is already updated by the time we persist */
  v.querySelectorAll('.rite').forEach(function(row){ row.addEventListener('click',servSave); });
  var rb=v.querySelector('#svc-reset');
  if(rb)rb.onclick=function(){ S.svc={}; servSave(); render(); };
  return v;
};

/* ---- 3. the three sections, read honestly ---- */
function theoryReadiness(lvl){
  var rec=(ST.court&&ST.court[lvl])||{};
  var need=Math.round(((LEVELS[lvl]&&LEVELS[lvl].pass)||0.6)*100);
  var oral=!!(LEVELS[lvl]&&LEVELS[lvl].mock&&LEVELS[lvl].mock.oral);
  if(rec.passed)return {state:'ok',best:rec.best||need,need:need,oral:oral};
  if(!rec.best)return {state:'none',best:null,need:need,oral:oral};
  return {state:(rec.best>=need-10)?'close':'thin',best:rec.best,need:need,oral:oral};
}
/* ST.tast is court-wide, and the flight is currently identical at every level,
   so this is honest about being a court-wide signal rather than faking a
   per-level one it cannot support. */
function tastingReadiness(lvl){
  var t=ST.tast||{n:0,c:0};
  var need=(lvl==='master')?75:60;
  var acc=t.n?Math.round(100*t.c/t.n):null;
  if(!t.n)return {state:'none',calls:0,acc:null,need:need};
  if(t.n<10)return {state:'thin',calls:t.n,acc:acc,need:need};
  return {state:(acc>=need)?'ok':'below',calls:t.n,acc:acc,need:need};
}
function serviceReadiness(){
  var tot=servTotalSteps();
  var svc=(ST.serv&&ST.serv.svc)||S.svc||{};
  var done=servDoneSteps(svc);
  var pct=tot?Math.round(100*done/tot):0;
  return {state:(pct>=100)?'ok':(pct>0?'partial':'none'),pct:pct,done:done,total:tot};
}
function sectionReadiness(lvl){
  lvl=lvl||activeLevel;
  var secs=levelSections(lvl);
  var r={lvl:lvl,sections:secs,missing:[]};
  r.theory=theoryReadiness(lvl);
  if(r.theory.state!=='ok')r.missing.push('theory');
  if(secs.indexOf('tasting')>=0){
    r.tasting=tastingReadiness(lvl);
    if(r.tasting.state!=='ok')r.missing.push('tasting');
  }
  if(secs.indexOf('service')>=0){
    r.service=serviceReadiness();
    if(r.service.state!=='ok')r.missing.push('service');
  }
  r.ready=!r.missing.length;
  return r;
}
function readinessLine(lvl){
  var r=sectionReadiness(lvl), L=LEVELS[lvl||activeLevel];
  if(r.ready)return 'Every examined section has a record that clears the bar.';
  if(r.missing.length===levelSections(r.lvl).length)return 'No section has been measured yet.';
  return 'Measured on '+(levelSections(r.lvl).length-r.missing.length)+' of '
    +levelSections(r.lvl).length+' sections — '+r.missing.join(' and ')+' still unproven.';
}

/* ---- 4. a verdict only where a verdict belongs ---- */
function isExamMode(){ return S.mode==='mock'||S.mode==='sim'; }
var MODE_NOUNS={review:'Weakness Review',weak:'Weakness Review',daily:'Daily Review',
  drill:'Section Drill',endless:'Endless Practice',flagged:'Flagged Review',
  lightning:'Lightning Round',sudden:'Sudden Death'};

var _v10ResultsView=resultsView;
resultsView=function(){
  var v=_v10ResultsView();
  var done=S.results.length, score=S.correct;
  var pct=done?Math.round(100*score/done):0;
  var pf=v.querySelector('.passfail');
  var sub=v.querySelector('.result-hero .sub2');
  var L=LEVELS[activeLevel];
  var need=Math.round(((L&&L.pass)||PASS||0.6)*100);

  if(pf){
    if(isExamMode()){
      var ok=pct>=need;
      pf.className='passfail '+(ok?'pass':'fail');
      pf.textContent=(ok?'PASS':'BELOW '+need+'%')+' · '+score+'/'+done;
    }else{
      /* practice is not an examination; report the tally and nothing more */
      pf.className='passfail neutral';
      pf.textContent=score+' of '+done+' correct';
    }
  }

  if(sub&&!S._oral){
    if(isExamMode()){
      var name=(L&&L.short)||'This level';
      sub.textContent=(pct>=need)
        ? name+' mock · that clears the '+need+'% theory bar for '+name+'.'
        : name+' mock · '+name+' theory needs '+need+'% in one sitting. Keep drilling.';
    }else{
      var noun=MODE_NOUNS[S.mode]||'Practice';
      sub.textContent=noun+' · not an examination, so no pass mark is given'
        +((S.mode==='review'||S.mode==='weak')?': this mode serves your worst material by design.':'.');
    }
  }
  /* the Gauntlet is spoken and self-graded; say so wherever a figure is shown */
  if(isExamMode()&&L&&L.mock&&L.mock.oral){
    var hero=v.querySelector('.result-hero');
    if(hero&&!hero.querySelector('.selfnote'))
      hero.appendChild(el('<div class="sub2 selfnote">Self-reported: you graded these aloud. The Court awards this section across the table, at 75% per section.</div>'));
  }
  /* what this result does NOT cover */
  if(isExamMode()){
    var r=sectionReadiness(activeLevel);
    if(r.missing.length&&r.missing.join()!=='theory'){
      var un=r.missing.filter(function(s){return s!=='theory';});
      if(un.length){
        var hero2=v.querySelector('.result-hero');
        if(hero2&&!hero2.querySelector('.covernote'))
          hero2.appendChild(el('<div class="sub2 covernote">This is the theory section only. '
            +un.map(function(s){return s.charAt(0).toUpperCase()+s.slice(1);}).join(' and ')
            +' '+(un.length>1?'remain':'remains')+' unmeasured.</div>'));
      }
    }
  }
  return v;
};

/* ---- 5. the Court Standing strip stops over-claiming ----
   A gilded pin read as "you are done". It was awarded for one theory mock. */
var _v10CourtStrip=(typeof courtStrip==='function')?courtStrip:null;
if(_v10CourtStrip){
  courtStrip=function(){
    var wrap=_v10CourtStrip();
    var pins=wrap.querySelectorAll('.courtpin');
    LEVEL_ORDER.forEach(function(lv,i){
      var pin=pins[i]; if(!pin||!LEVELS[lv])return;
      var stat=pin.querySelector('.cpstat'); if(!stat)return;
      var rec=(ST.court&&ST.court[lv])||{};
      if(!rec.passed)return;                     /* untouched / best-% text is already honest */
      var r=sectionReadiness(lv);
      if(r.ready){ stat.textContent='Ready'; pin.title=LEVELS[lv].label+': every section measured'; }
      else{
        stat.textContent='Theory passed';
        pin.classList.remove('gilded');          /* gilding is for a whole examination */
        pin.title=LEVELS[lv].label+': '+readinessLine(lv);
      }
    });
    return wrap;
  };
}

/* ---- 6. the prescription stops ignoring two thirds of the exam ---- */
var _v10StudyPlan=studyPlan;
studyPlan=function(){
  var p=_v10StudyPlan();
  var r=sectionReadiness(p.level);
  p.readiness=r;
  var L=LEVELS[p.level], near=(p.days!==null&&p.days<=45);
  var add=[];

  if(levelHasSection(p.level,'tasting')&&r.tasting){
    if(r.tasting.state==='none')
      add.push({t:'Pour a blind flight',d:'No tasting calls on record. A '+L.short+' is examined on tasting as well as theory: no amount of paper answers this section.',go:function(){S.tt=null;S.view='tasting';render();}});
    else if(r.tasting.state==='thin')
      add.push({t:'Keep tasting',d:'Only '+r.tasting.calls+' call'+(r.tasting.calls===1?'':'s')+' on record — too few to read as a trend. Ten is a beginning.',go:function(){S.tt=null;S.view='tasting';render();}});
    else if(r.tasting.state==='below')
      add.push({t:'Tasting is your weakest section',d:'Calling '+r.tasting.acc+'% across '+r.tasting.calls+' flights, against a '+r.tasting.need+'% bar. Theory will not carry it.',go:function(){S.tt=null;S.view='tasting';render();}});
  }
  if(levelHasSection(p.level,'service')&&r.service){
    if(r.service.state==='none')
      add.push({t:'Walk the service ritual',d:'Not one movement rehearsed. The practical is examined at '+L.short+' rank, and it lives in the hands.',go:function(){S.view='service';render();}});
    else if(r.service.state==='partial')
      add.push({t:'Finish the service ritual',d:r.service.done+' of '+r.service.total+' movements rehearsed. Walk the rest before the sitting.',go:function(){S.view='service';render();}});
  }

  if(add.length){
    /* Daily Review is the schedule and keeps its place; an unmeasured section
       outranks the softer coverage nudges once a date is in sight. */
    var at=(p.acts.length&&(p.acts[0].t==='Daily Review'))?1:0;
    if(near)p.acts=p.acts.slice(0,at).concat(add,p.acts.slice(at));
    else p.acts=p.acts.concat(add);
    /* "Keep drilling" is the no-work-left filler; it is no longer true */
    p.acts=p.acts.filter(function(a){return a.t!=='Keep drilling';});
    if(!p.acts.length)p.acts=add;
  }
  return p;
};

/* ---- the readiness breakdown, wherever the plan is shown ---- */
function readinessRows(lvl){
  var r=sectionReadiness(lvl);
  var cls={ok:'rdy-ok',close:'rdy-part',thin:'rdy-part',partial:'rdy-part',below:'rdy-part',none:'rdy-none'};
  var rows='';
  var add=function(name,state,text){
    rows+='<div class="rdyrow"><span class="rdyname">'+name+'</span>'
      +'<span class="rdystate '+(cls[state]||'rdy-part')+'">'+text+'</span></div>';
  };
  var t=r.theory;
  add('Theory',t.state,
    t.state==='ok'?('passed at '+t.best+'%'+(t.oral?', self-reported':'')):
    t.state==='none'?('no mock sat: '+t.need+'% to pass'):
    ('best '+t.best+'%, needs '+t.need+'%'));
  if(r.tasting)add('Tasting',r.tasting.state,
    r.tasting.state==='none'?'no calls on record':
    r.tasting.state==='thin'?(r.tasting.calls+' call'+(r.tasting.calls===1?'':'s')+' — too few to read'):
    (r.tasting.acc+'% over '+r.tasting.calls+' calls, needs '+r.tasting.need+'%'));
  if(r.service)add('Service',r.service.state,
    r.service.state==='none'?'not rehearsed':
    (r.service.done+' of '+r.service.total+' movements'));
  return '<div class="rdy">'+rows+'<div class="rdyverdict">'+readinessLine(lvl)+'</div></div>';
}

var _v10PlanPanel=planPanel;
planPanel=function(){
  var v=_v10PlanPanel();
  if(v&&v.classList&&v.classList.contains('planpanel')){
    var rows=el(readinessRows(activeLevel));
    var row=v.querySelector('.planrow');
    if(row)v.insertBefore(rows,row); else v.appendChild(rows);
  }
  return v;
};

var _v10PlanView=planView;
planView=function(){
  var v=_v10PlanView();
  var head=v.querySelector('.secgroup');
  if(head){
    var block=el('<div><div class="secgroup">Where you stand</div>'+readinessRows(activeLevel)
      +'<div class="fmtnote" style="margin-top:10px">'
      +(levelSections(activeLevel).length>1
        ? 'The Court examines a '+LEVELS[activeLevel].short+' on '+levelSections(activeLevel).join(', ')
          +'. A theory score is one section of three, and the Codex will not call you ready on it alone.'
        : "The Régionale examination is theory only — there is no tasting or service section to measure.")
      +'</div></div>');
    /* sits above "Your sitting" so the standing frames the plan */
    v.insertBefore(block,head);
  }
  return v;
};
