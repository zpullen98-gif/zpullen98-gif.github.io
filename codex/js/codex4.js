/* ============ Codex IV: portability, history, notes, keyboard ============ */
ST.hist=ST.hist||[]; ST.notes=ST.notes||{};

/* ---- session history ---- */
var _v3Finish=finish;
finish=function(){
  const done=S.results.length;
  if(done>=5){
    ST.hist.push({d:today(),m:S.mode||'practice',n:done,c:S.correct});
    if(ST.hist.length>300)ST.hist=ST.hist.slice(-300);
    stSave();
  }
  _v3Finish();
};
/* An abandoned sitting is still a sitting: core's Return guard sets
   S.abandoned once the student confirms, and the record keeps the row. */
var _v3Home=home;
home=function(){
  if(S.abandoned){
    S.abandoned=false;
    if(S.results.length){
      ST.hist.push({d:today(),m:S.mode||'mock',n:S.results.length,c:S.correct,ab:1});
      if(ST.hist.length>300)ST.hist=ST.hist.slice(-300);
      stSave();
    }
  }
  _v3Home();
};

/* ---- notes ---- */
function noteFor(q){return ST.notes[qKey(q)]||'';}
function noteSet(q,txt){
  const k=qKey(q);
  if(txt.trim())ST.notes[k]=txt.trim(); else delete ST.notes[k];
  stSave();
}
var _v3DecorateQuiz=decorateQuiz;
decorateQuiz=function(){
  _v3DecorateQuiz();
  if(S.answered)addNoteUI();
  bindKeys();
};
function addNoteUI(){
  const rev=document.querySelector('.reveal');
  if(!rev||rev.querySelector('.notebox'))return;
  const q=S.pool[S.idx]; if(!q)return;
  const existing=noteFor(q);
  const box=el('<div class="notebox">'
    +'<button class="notetoggle">'+(existing?'Your note':'Add a note')+'</button>'
    +'<div class="notebody"'+(existing?'':' hidden')+'>'
    +'<textarea class="noteinput" rows="2" aria-label="Your note on this question" placeholder="Mnemonic, tasting memory, why you missed it\u2026"></textarea>'
    +'<div class="notesaved"></div></div></div>');
  const ta=box.querySelector('.noteinput'), saved=box.querySelector('.notesaved'), body=box.querySelector('.notebody');
  ta.value=existing;
  box.querySelector('.notetoggle').onclick=function(){
    body.hidden=!body.hidden; if(!body.hidden)ta.focus();
  };
  let tm=null;
  ta.oninput=function(){
    clearTimeout(tm);
    tm=setTimeout(function(){ noteSet(q,ta.value); saved.textContent=ta.value.trim()?'saved':''; },400);
  };
  const row=rev.querySelector('.nextrow');
  if(row)rev.insertBefore(box,row); else rev.appendChild(box);
}

/* ---- keyboard shortcuts ---- */
function bindKeys(){
  setTimeout(function(){
    document.onkeydown=function(e){
      if(S.view!=='quiz')return;
      const tag=(e.target&&e.target.tagName||'').toLowerCase();
      if(tag==='input'||tag==='textarea'||tag==='select'){
        if(e.key==='Enter'&&S.answered&&tag!=='textarea'){e.preventDefault();next();}
        return;
      }
      if(S.answered){
        /* a focused button or link keeps Enter and Space for itself (core's keyOnControl) */
        if((e.key==='Enter'||e.key===' ')&&!keyOnControl(e)){e.preventDefault();next();}
        return;
      }
      const q=S.pool[S.idx]; if(!q||q.sa||q.mt||q.sel)return;
      const map={'1':0,'2':1,'3':2,'4':3,'a':0,'b':1,'c':2,'d':3};
      const k=e.key.toLowerCase();
      if(map[k]!==undefined&&q.opts&&map[k]<q.opts.length){e.preventDefault();pickMC(map[k]);}
    };
  },60);
}

/* ---- progress portability ---- */
function exportPayload(){
  return JSON.stringify({codex:'sommeliers-codex',v:4,exported:new Date().toISOString(),stats:ST});
}
/* An import is a FILE, and a file can be hand-edited or tampered with. Every
   value is coerced on the way in, exactly as codex12's cellarSanitize does for
   bottles: numbers through Number()||0, entries that are not objects dropped,
   user text string-checked and capped, dates held to YYYY-MM-DD. A tampered
   file must yield at worst a strange-looking record, never a strange-behaving
   one, and never a script on this origin. */
var DAY_RE=/^\d{4}-\d{2}-\d{2}$/;
function mergeObj(x){ return !!(x&&typeof x==='object'&&!Array.isArray(x)); }
function mergeNum(x){ return Number(x)||0; }
function mergeStr(x,cap){ return typeof x==='string'?x.slice(0,cap):''; }
function mergeStats(inc){
  if(!inc||!mergeObj(inc.stats))return 'That file is not a Codex progress export.';
  const B=inc.stats;
  Object.keys(mergeObj(B.q)?B.q:{}).forEach(function(k){
    const a=ST.q[k], b=B.q[k];
    if(!mergeObj(b))return;
    const c=mergeNum(b.c), w=mergeNum(b.w), s=mergeNum(b.s);
    if(!a)ST.q[k]={c:c,w:w,s:s};
    else{a.c=mergeNum(a.c)+c;a.w=mergeNum(a.w)+w;a.s=Math.max(mergeNum(a.s),s);}
  });
  Object.keys(mergeObj(B.days)?B.days:{}).forEach(function(d){ if(!DAY_RE.test(d))return; ST.days[d]=Math.max(ST.days[d]||0,mergeNum(B.days[d])); });
  Object.keys(mergeObj(B.srs)?B.srs:{}).forEach(function(k){
    const a=ST.srs[k], raw=B.srs[k];
    if(!mergeObj(raw)||typeof raw.due!=='string'||!DAY_RE.test(raw.due))return;
    const b={ef:Number(raw.ef)||2.5,iv:mergeNum(raw.iv),n:mergeNum(raw.n),due:raw.due};
    if(!a)ST.srs[k]=b; else if(b.due>a.due){ST.srs[k]=b;}
  });
  (Array.isArray(B.flags)?B.flags:[]).forEach(function(k){ if(typeof k==='string'&&ST.flags.indexOf(k)<0)ST.flags.push(k); });
  (Array.isArray(B.ach)?B.ach:[]).forEach(function(k){ if(typeof k==='string'&&ST.ach.indexOf(k)<0)ST.ach.push(k); });
  Object.keys(mergeObj(B.notes)?B.notes:{}).forEach(function(k){ const n=mergeStr(B.notes[k],2000); if(n&&!ST.notes[k])ST.notes[k]=n; });
  const seen={};
  const inHist=(Array.isArray(B.hist)?B.hist:[]).filter(function(h){
    return mergeObj(h)&&typeof h.n==='number'&&isFinite(h.n)&&typeof h.c==='number'&&isFinite(h.c);
  }).map(function(h){
    const row={d:String(h.d).slice(0,10),m:mergeStr(h.m,24)||'practice',n:h.n,c:h.c};
    if(h.ab)row.ab=1;
    return row;
  });
  ST.hist=ST.hist.concat(inHist).filter(function(h){
    const k=h.d+'|'+h.m+'|'+h.n+'|'+h.c; if(seen[k])return false; seen[k]=1; return true;
  }).sort(function(a,b){return a.d<b.d?-1:1;}).slice(-300);
  ST.best=ST.best||{};
  const bb=mergeObj(B.best)?B.best:{};
  ST.best.sudden=Math.max(ST.best.sudden||0,mergeNum(bb.sudden));
  if(bb.perfect)ST.best.perfect=true;
  if(bb.passed)ST.best.passed=true;
  ST.sess=(ST.sess||0)+mergeNum(B.sess);
  stSave(); achCheck();
  return null;
}
/* An import writes into whoever is current on this device. Name them before
   the merge, because a file pulled onto the wrong record cannot be pulled
   back out again. Cancel leaves the store untouched. */
/* One record on this device, so there is no longer a name to put in the
   question. */
function syncConfirm(what){
  return confirm('Merge '+what+' into this device\u2019s record?');
}
function syncView(){
  const answered=Object.values(ST.q).reduce(function(a,r){return a+r.c+r.w;},0);
  const v=el('<div><div class="viewhead"><h2>Progress Transfer</h2><div class="sub">Your full study record lives in this browser and goes nowhere else. Export it to move between phone and laptop, or to keep a backup before clearing browsing data.</div></div>'
   +'<div class="statrow" style="margin:14px 0">'
   +'<div class="stat"><b>'+answered+'</b><span>Answers logged</span></div>'
   +'<div class="stat"><b>'+Object.keys(ST.srs).length+'</b><span>In rotation</span></div>'
   +'<div class="stat"><b>'+ST.hist.length+'</b><span>Sessions</span></div>'
   +'<div class="stat"><b>'+Object.keys(ST.notes).length+'</b><span>Notes</span></div></div>'
   +'<div class="secgroup">Export</div>'
   +'<div class="sarow"><button class="btn gold" id="dl">Download progress file</button><button class="btn" id="copy">Copy to clipboard</button></div>'
   +'<textarea class="noteinput" id="outbox" rows="3" readonly aria-label="Your progress export code" style="margin-top:10px"></textarea>'
   +'<div class="secgroup">Import</div>'
   +'<div class="fmtnote">Importing <b>merges</b>: where both records know a question, the one with more answers in it is kept whole rather than the two being added together, so merging the same file twice changes nothing. Streaks and honors combine and the more recent review date wins.</div>'
   +'<div class="sarow" style="margin-top:10px"><input type="file" id="fin" accept="application/json,.json" class="sainput" aria-label="Choose a progress file to import"></div>'
   +'<textarea class="noteinput" id="inbox" rows="3" placeholder="\u2026or paste an exported progress code here" style="margin-top:10px"></textarea>'
   +'<div class="sarow" style="margin-top:8px"><button class="btn" id="imp">Merge pasted progress</button></div>'
   +'<div id="syncmsg" class="notesaved" style="margin-top:10px"></div></div>');
  const msg=v.querySelector('#syncmsg');
  v.querySelector('#outbox').value=exportPayload();
  v.querySelector('#dl').onclick=function(){
    try{
      const blob=new Blob([exportPayload()],{type:'application/json'});
      const a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download='codex-progress-'+today()+'.json';
      document.body.appendChild(a);a.click();a.remove();
      msg.textContent='Progress file downloaded.';
    }catch(e){msg.textContent='Download blocked; copy the code above instead.';}
  };
  v.querySelector('#copy').onclick=function(){
    const ta=v.querySelector('#outbox'); ta.select();
    try{document.execCommand('copy');msg.textContent='Copied to clipboard.';}
    catch(e){msg.textContent='Select the text above and copy manually.';}
  };
  v.querySelector('#imp').onclick=function(){
    let data=null;
    try{data=JSON.parse(v.querySelector('#inbox').value);}catch(e){msg.textContent='That is not valid progress data.';return;}
    if(!syncConfirm('this code'))return;
    const err=mergeStats(data);
    msg.textContent=err||'Merged. Your record is now combined.';
    if(!err)setTimeout(function(){S.view='dash';render();},900);
  };
  v.querySelector('#fin').onchange=function(e){
    const f=e.target.files&&e.target.files[0]; if(!f)return;
    const r=new FileReader();
    r.onload=function(){
      let data=null;
      try{data=JSON.parse(r.result);}catch(err){msg.textContent='That file is not valid progress data.';return;}
      if(!syncConfirm('this file')){e.target.value='';return;}
      const err2=mergeStats(data);
      msg.textContent=err2||'Merged from file. Your record is now combined.';
      if(!err2)setTimeout(function(){S.view='dash';render();},900);
    };
    r.readAsText(f);
  };
  return v;
}

/* ---- progress trend chart ---- */
function trendChart(){
  const h=ST.hist.slice(-24);
  if(h.length<2)return '';
  const W=680,H=150,pad=26;
  const pts=h.map(function(s,i){
    const x=pad+(W-pad*2)*(h.length===1?0:i/(h.length-1));
    const acc=Math.round(100*s.c/s.n);
    return {x:x,y:H-pad-(H-pad*2)*(acc/100),acc:acc,s:s};
  });
  const line=pts.map(function(p,i){return (i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1);}).join(' ');
  const y60=H-pad-(H-pad*2)*0.6;
  const first=pts.slice(0,Math.ceil(pts.length/2)), last=pts.slice(-Math.ceil(pts.length/2));
  const avg=function(a){return Math.round(a.reduce(function(s,p){return s+p.acc;},0)/a.length);};
  const delta=avg(last)-avg(first);
  let svg='<svg viewBox="0 0 '+W+' '+H+'" class="trend" preserveAspectRatio="none">';
  svg+='<line x1="'+pad+'" y1="'+y60.toFixed(1)+'" x2="'+(W-pad)+'" y2="'+y60.toFixed(1)+'" class="tpass"/>';
  svg+='<path d="'+line+'" class="tline"/>';
  pts.forEach(function(p){svg+='<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="3.2" class="tdot'+(p.acc>=60?' ok':'')+'"/>';});
  svg+='</svg>';
  return '<div class="secgroup">Trend \u00b7 last '+h.length+' sessions</div>'+svg
    +'<div class="trendfoot">Dotted line marks the 60% pass mark \u00b7 recent half vs earlier half: '
    +(delta>=0?'<b class="up">+'+delta+' points</b>':'<b class="down">'+delta+' points</b>')+'</div>';
}
var _v3DashView=dashView;
dashView=function(){
  const v=_v3DashView();
  const chart=trendChart();
  const reset=v.querySelector('#streset');
  if(chart){
    const wrap=el('<div>'+chart+'</div>');
    if(reset)v.insertBefore(wrap,reset); else v.appendChild(wrap);
  }
  const btn=el('<button class="btn" id="gosync" style="margin-top:20px;margin-right:8px">Export / import progress</button>');
  btn.onclick=function(){S.view='sync';render();};
  if(reset)v.insertBefore(btn,reset); else v.appendChild(btn);
  return v;
};

/* ---- notes surfaced in encyclopedia ---- */
var _v3EncyView=encyView;
encyView=function(){
  const v=_v3EncyView();
  const out=v.querySelector('#ency-out'), inp=v.querySelector('#ency-in');
  const orig=inp.oninput;
  inp.oninput=function(){
    orig();
    const t=inp.value.trim().toLowerCase();
    if(t.length<2)return;
    const hits=QUESTIONS.filter(function(q){
      const n=noteFor(q); return n && (n.toLowerCase().indexOf(t)>=0 || JSON.stringify(q).toLowerCase().indexOf(t)>=0);
    });
    if(!hits.length)return;
    const block=el('<div><div class="secgroup">Your Notes ('+hits.length+')</div>'
      +hits.slice(0,20).map(function(q){
        return '<div class="encyq"><div class="encyqt">'+q.q+'</div><div class="encynote">'+escT(noteFor(q))+'</div></div>';
      }).join('')+'</div>');
    out.insertBefore(block,out.firstChild);
  };
  return v;
};

/* ---- home tile + view routing ---- */
var _v3DecorateHome=decorateHome;
decorateHome=function(){
  _v3DecorateHome();
  const modes=document.querySelectorAll('.modes');
  const anchor=modes[modes.length-1];
  if(!anchor)return;
  const nNotes=Object.keys(ST.notes).length;
  const m4=el('<div class="modes" style="margin-top:14px"></div>');
  m4.appendChild(el('<button class="mode" id="t-sync"><div class="band"></div><h3>Progress Transfer</h3><p>Move your record between phone and laptop, or back it up. Imports merge. '+ST.hist.length+' sessions and '+nNotes+' notes so far.</p></button>'));
  anchor.parentNode.insertBefore(m4,anchor.nextSibling);
  m4.querySelector('#t-sync').onclick=function(){S.view='sync';render();};
};
var _v3Render=render;
render=function(){
  if(S.view==='sync'){
    if(S.qT){clearInterval(S.qT);S.qT=null;}
    const app=document.getElementById('app');
    app.innerHTML=''; app.appendChild(topbar()); app.appendChild(syncView());
    window.scrollTo(0,0); return;
  }
  _v3Render();
};
