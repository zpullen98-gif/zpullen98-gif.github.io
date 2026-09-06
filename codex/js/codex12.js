/* ═══════════════════ CODEX XII: OUR LIST ═══════════════════
   The venue's own wine list: entered bottle by bottle, kept in ST like every
   other record, and drilled with the same engine as the banks. A sommelier
   studies two lists: the Court's and the one the guest is holding.

   House rules observed: everything here is a NEW layer (no edits to earlier
   files); top-level declarations are var/function ONLY, because later wrappers
   reach these through window.* and a const would be invisible there; the list
   is court-wide (a wine list has no rank), so ST.cellar is unprefixed and
   survives every applyLevel; no pictorial glyphs. */

/* Deliberately NOT registered in ST_DEFAULTS: stReset walks that list, and
   "Erase all study statistics" must not take the venue's wine list with it;
   the list is the venue's property, not a statistic. The schema guarantee
   the registration would have given is covered by the line below. */
ST.cellar=ST.cellar||[];

/* Every render site below builds HTML by string, and every bottle field is
   user text: escape at the sink, always. accept[] stays raw: the grader
   normalizes it itself and never renders it. */
function escB(s){return escT(s==null?'':s);}

/* No '|' in ids: level-prefixed stat keys split on it. */
function mintBottleId(){
  var s='w-';
  while(s.length<10)s+=Math.floor(Math.random()*36).toString(36);
  return s;
}

function bottleLabel(b){
  var bits=[];
  if(b.producer)bits.push(b.producer);
  if(b.name)bits.push(b.name);
  if(b.vintage)bits.push(b.vintage);
  return bits.join(' ')||'Unnamed bottle';
}

/* ═══════════ the drill ═══════════
   startClassQuiz is the precedent: build plain question literals at click
   time, hand them to S.pool, and the whole quiz engine (timer, results view,
   stats, the OOT hooks) treats them as first-class. Per-question ids are
   minted off the bottle id so the stat store never records stem-slice keys. */
function cellarPriceOpts(correct){
  var m=String(correct).match(/(\d+(?:\.\d+)?)/);
  if(!m)return null;
  var v=parseFloat(m[1]);
  var pre=String(correct).slice(0,m.index), post=String(correct).slice(m.index+m[1].length);
  var deltas=v>=100?[-25,-10,15,30]:v>=40?[-12,-6,8,14]:[-4,-2,3,5];
  var opts=[correct];
  deltas.forEach(function(d){
    var n=Math.max(1,Math.round(v+d));
    var s=pre+n+post;
    if(opts.indexOf(s)<0&&opts.length<4)opts.push(s);
  });
  return opts.length===4?opts:null;
}

function startCellarDrill(){
  var list=ST.cellar||[];
  if(list.length<3){ if(typeof toast==='function')toast('Add three bottles first: a drill needs neighbours to confuse.'); return; }
  var qs=[];
  /* Distractor pools compare FOLDED (case/space-insensitive): the banks are
     authored consistently, a venue list is not, and 'Chardonnay' next to
     'chardonnay' is the same right answer wearing two coats. */
  var fold=function(s){return String(s||'').trim().toLowerCase();};
  var byFold=function(arr){var seen={};return arr.filter(function(x){var f=fold(x);if(!f||seen[f])return false;seen[f]=1;return true;});};
  var regions=byFold(list.map(function(b){return b.region;}));
  var grapes=byFold(list.map(function(b){return b.grapes;}));
  var grapeNames=(typeof GRAPES!=='undefined'&&GRAPES&&GRAPES.map)?GRAPES.map(function(g){return g&&(g.n||g.name);}).filter(Boolean):[];
  var regionFallback=['Chablis','Rioja','Barolo','Mosel','Willamette Valley','Marlborough','Stellenbosch','Mendoza'];
  list.forEach(function(b){
    var label=escB(bottleLabel(b));
    if(b.grapes){
      var raw=uniqOpts(b.grapes,shuffle(grapes.filter(function(g){return fold(g)!==fold(b.grapes);}).concat(shuffle(grapeNames.filter(function(g){return fold(g)!==fold(b.grapes);})))));
      if(raw.length===4){
        var p=shuffle([0,1,2,3]);
        qs.push({id:b.id+'-gr',cat:'Our List',q:'What is in the glass when a guest orders our '+label+'?',
          opts:p.map(function(i){return escB(raw[i]);}),a:p.indexOf(0),exp:label+': '+escB(b.grapes)+(b.style?'. '+escB(b.style):'.')});
      }
    }
    if(b.region){
      var rraw=uniqOpts(b.region,shuffle(regions.filter(function(r){return fold(r)!==fold(b.region);}).concat(shuffle(regionFallback.filter(function(r){return fold(r)!==fold(b.region);})))));
      if(rraw.length===4){
        var p2=shuffle([0,1,2,3]);
        qs.push({id:b.id+'-rg',cat:'Our List',q:'Where does our '+label+' come from?',
          opts:p2.map(function(i){return escB(rraw[i]);}),a:p2.indexOf(0),exp:label+': '+escB(b.region)+'.'});
      }
    }
    if(b.glass){
      var praw=cellarPriceOpts(b.glass);
      if(praw){
        var p3=shuffle([0,1,2,3]);
        var shuffled=p3.map(function(i){return praw[i];});
        qs.push({id:b.id+'-pg',cat:'Our List',q:'By the glass, what does our '+label+' pour for?',
          opts:shuffled.map(escB),a:shuffled.indexOf(b.glass),exp:label+': '+escB(b.glass)+' by the glass'+(b.bottle?', '+escB(b.bottle)+' by the bottle.':'.')});
      }
    }
    if(b.producer&&b.name){
      qs.push({id:b.id+'-pr',cat:'Our List',sa:1,q:'Who makes our '+escB(b.name)+(b.vintage?' '+escB(b.vintage):'')+'? Name the producer.',
        accept:[b.producer],ans:escB(b.producer),exp:escB(b.producer)+': '+label+'.'});
    }
  });
  if(!qs.length){ if(typeof toast==='function')toast('The list needs grapes, regions or producers before it can ask about them.'); return; }
  stopTimer(); S.mode='drill'; S.section='Our List';
  S._again=startCellarDrill;   /* the results screen's Redrill rebuilds from the list */
  S.pool=shuffle(qs).slice(0,15); S.idx=0; S.correct=0; S.results=[]; resetQ(); S.view='quiz'; render();
}

/* ═══════════ recitation ═══════════
   The floor skill, not the exam skill: the region is called, you produce the
   bottle. A flip deck, self-paced, nothing graded and nothing recorded. */
function startCellarRecite(){
  var list=ST.cellar||[];
  if(!list.length){ if(typeof toast==='function')toast('Nothing on the list yet.'); return; }
  S._cw={deck:shuffle(list.slice()),idx:0,revealed:false};
  S.view='cellarrecite'; render();
}

function cellarReciteView(){
  var w=S._cw;
  if(!w||w.idx>=w.deck.length){
    var done=el('<div><div class="viewhead"><h2>The list, recited</h2>'
      +'<div class="sub">'+(w?w.deck.length:0)+' pours called. Again tomorrow: the list changes faster than the Court does.</div></div>'
      +'<div class="sarow"><button class="btn gold" id="cw-again">Walk it again</button>'
      +'<button class="btn ghost" id="cw-back">Back to the list</button></div></div>');
    done.querySelector('#cw-again').onclick=function(){startCellarRecite();};
    done.querySelector('#cw-back').onclick=function(){S.view='cellar';render();};
    return done;
  }
  var b=w.deck[w.idx];
  var prompt=b.region?'The '+escB(b.region)+' pour'+(b.glass?' at '+escB(b.glass):'')+': call it.':
             b.style?'The '+escB(b.style.toLowerCase())+': call it.':'Pour '+(w.idx+1)+': call it.';
  var card='<div class="viewhead"><h2>Recite the list</h2><div class="sub">Card '+(w.idx+1)+' of '+w.deck.length+'. Say it out loud before you flip.</div></div>'
    +'<div class="secgroup">'+prompt+'</div>';
  if(w.revealed){
    card+='<div class="dispute"><div class="mq">'+escB(bottleLabel(b))+'</div>'
      +(b.grapes?'<div class="ma">'+escB(b.grapes)+(b.style?' · '+escB(b.style):'')+'</div>':'')
      +((b.glass||b.bottle)?'<div class="mu">'+[b.glass?escB(b.glass)+' glass':'',b.bottle?escB(b.bottle)+' bottle':''].filter(Boolean).join(' · ')+'</div>':'')
      +(b.note?'<div class="mexp">'+escB(b.note)+'</div>':'')+'</div>'
      +'<div class="sarow"><button class="btn gold" id="cw-next">'+(w.idx+1>=w.deck.length?'Finish the walk':'Next pour')+'</button></div>';
  }else{
    card+='<div class="sarow"><button class="btn gold" id="cw-flip">Flip the card</button>'
      +'<button class="btn small ghost" id="cw-skip">Skip</button></div>';
  }
  var v=el('<div>'+card+'</div>');
  var f=v.querySelector('#cw-flip'); if(f)f.onclick=function(){w.revealed=true;render();};
  var s=v.querySelector('#cw-skip'); if(s)s.onclick=function(){w.idx++;w.revealed=false;render();};
  var n=v.querySelector('#cw-next'); if(n)n.onclick=function(){w.idx++;w.revealed=false;render();};
  return v;
}

/* ═══════════ the list itself ═══════════ */
function cellarFieldRow(id,label,val,ph){
  return '<div class="sarow"><span class="lvltag" style="min-width:86px;display:inline-block">'+label+'</span>'
    +'<input class="sainput" id="'+id+'" value="'+String(val==null?'':val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')+'" placeholder="'+ph+'"></div>';
}

function cellarView(){
  var list=ST.cellar||[];
  var f=S._cellarForm;
  var html='<div class="viewhead"><h2>Our List</h2>'
    +'<div class="sub">The list the guest is holding. Enter it bottle by bottle and drill it like the Court’s; '
    +'it lives in this browser and travels inside your progress export.</div></div>';
  if(!f){
    html+='<div class="sarow"><button class="btn gold" id="cl-add">Add a bottle</button>'
      +(list.length?'<button class="btn ghost" id="cl-drill">Drill the list</button>'
        +'<button class="btn ghost" id="cl-recite">Recite the list</button>':'')+'</div>';
    if(list.length&&list.length<3)html+='<div class="sub" style="margin-top:6px">'+list.length+' of 3 bottles: the drill opens at three.</div>';
  }else{
    html+='<div class="secgroup">'+(S._cellarEdit?'Edit the bottle':'A new bottle')+'</div>'
      +cellarFieldRow('cl-producer','Producer',f.producer,'Domaine Leflaive')
      +cellarFieldRow('cl-name','Wine',f.name,'Puligny-Montrachet')
      +cellarFieldRow('cl-vintage','Vintage',f.vintage,'2021 or NV')
      +cellarFieldRow('cl-region','Region',f.region,'Burgundy, France')
      +cellarFieldRow('cl-grapes','Grapes',f.grapes,'Chardonnay')
      +cellarFieldRow('cl-style','Style',f.style,'Dry white, taut, flinty')
      +cellarFieldRow('cl-glass','By the glass',f.glass,'$24')
      +cellarFieldRow('cl-bottle','Bottle',f.bottle,'$110')
      +cellarFieldRow('cl-note','Note',f.note,'What you tell the table')
      +'<div class="sarow"><button class="btn gold" id="cl-save">'+(S._cellarEdit?'Save the bottle':'Add to the list')+'</button>'
      +'<button class="btn ghost" id="cl-cancel">Cancel</button></div>';
  }
  if(list.length){
    html+='<div class="secgroup">On the list ('+list.length+')</div>';
    list.forEach(function(b){
      html+='<div class="dispute"><div class="mq">'+escB(bottleLabel(b))
        +(b.glass?' <span class="lvltag">'+escB(b.glass)+' gl</span>':'')+'</div>'
        +((b.region||b.grapes)?'<div class="ma">'+[b.region,b.grapes].filter(Boolean).map(escB).join(' · ')+'</div>':'')
        +(b.style?'<div class="mu">'+escB(b.style)+'</div>':'')
        +(b.note?'<div class="mexp">'+escB(b.note)+'</div>':'')
        +'<div class="sarow"><button class="btn small ghost" data-cl-edit="'+escB(b.id)+'">Edit</button>'
        +'<button class="btn small ghost" data-cl-del="'+escB(b.id)+'">Remove</button></div></div>';
    });
  }else if(!f){
    html+='<div class="sub">Nothing entered yet. Start with the by-the-glass pours: they are the ones the floor asks about.</div>';
  }
  var v=el('<div>'+html+'</div>');
  var add=v.querySelector('#cl-add'); if(add)add.onclick=function(){
    S._cellarForm={producer:'',name:'',vintage:'',region:'',grapes:'',style:'',glass:'',bottle:'',note:''};
    S._cellarEdit=null; render();
  };
  var dr=v.querySelector('#cl-drill'); if(dr)dr.onclick=function(){startCellarDrill();};
  var rc=v.querySelector('#cl-recite'); if(rc)rc.onclick=function(){startCellarRecite();};
  var save=v.querySelector('#cl-save'); if(save)save.onclick=function(){
    var read=function(id){var e=document.getElementById(id);return e?e.value.trim():'';};
    var rec={id:S._cellarEdit||mintBottleId(),producer:read('cl-producer'),name:read('cl-name'),
      vintage:read('cl-vintage'),region:read('cl-region'),grapes:read('cl-grapes'),style:read('cl-style'),
      glass:read('cl-glass'),bottle:read('cl-bottle'),note:read('cl-note'),ts:Date.now()};
    if(!rec.producer&&!rec.name){ if(typeof toast==='function')toast('A bottle needs at least a producer or a wine name.'); return; }
    var i=-1; ST.cellar.some(function(x,j){ if(x.id===rec.id){i=j;return true;} return false; });
    if(i<0)ST.cellar.push(rec); else ST.cellar[i]=rec;
    S._cellarForm=null; S._cellarEdit=null; stSave();
    if(typeof toast==='function')toast('On the list.');
    render();
  };
  var cancel=v.querySelector('#cl-cancel'); if(cancel)cancel.onclick=function(){S._cellarForm=null;S._cellarEdit=null;render();};
  v.querySelectorAll('[data-cl-edit]').forEach(function(btn){
    btn.onclick=function(){
      var b=null; ST.cellar.some(function(x){ if(x.id===btn.dataset.clEdit){b=x;return true;} return false; });
      if(!b)return;
      S._cellarForm={producer:b.producer||'',name:b.name||'',vintage:b.vintage||'',region:b.region||'',
        grapes:b.grapes||'',style:b.style||'',glass:b.glass||'',bottle:b.bottle||'',note:b.note||''};
      S._cellarEdit=b.id; render(); window.scrollTo(0,0);
    };
  });
  v.querySelectorAll('[data-cl-del]').forEach(function(btn){
    btn.onclick=function(){
      var b=null; ST.cellar.some(function(x){ if(x.id===btn.dataset.clDel){b=x;return true;} return false; });
      if(b&&confirm('Take "'+bottleLabel(b)+'" off the list?')){
        ST.cellar=ST.cellar.filter(function(x){return x.id!==b.id;});
        stSave(); render();
      }
    };
  });
  return v;
}

/* ═══════════ tile, routing, level hygiene, import ═══════════ */
var _v12DecorateHome=decorateHome;
decorateHome=function(){
  _v12DecorateHome();
  var modes=document.querySelectorAll('.modes');
  var anchor=modes[modes.length-1];
  if(!anchor)return;
  var n=(ST.cellar||[]).length;
  var m12=el('<div class="modes" style="margin-top:14px"></div>');
  m12.appendChild(el('<button class="mode" id="t-cellar"><div class="band"></div><h3>Our List</h3><p>'
    +(n?n+' bottle'+(n===1?'':'s')+' on the venue’s own list. Drill the pours you actually sell.'
       :'Enter the venue’s wine list and drill it like the Court’s. The guest is holding it right now.')+'</p></button>'));
  anchor.parentNode.insertBefore(m12,anchor.nextSibling);
  m12.querySelector('#t-cellar').onclick=function(){S.view='cellar';render();};
};

var _v12Render=render;
render=function(){
  var v12={cellar:cellarView,cellarrecite:cellarReciteView};
  if(v12[S.view]){
    if(S.qT){clearInterval(S.qT);S.qT=null;}
    var app=document.getElementById('app');
    app.innerHTML=''; app.appendChild(topbar()); app.appendChild(v12[S.view]());
    window.scrollTo(0,0); return;
  }
  _v12Render();
};

/* A rank switch resets the view to home like every other layer's views; a
   half-typed bottle must not survive into the next rank's session. */
var _v12ApplyLevel=applyLevel;
applyLevel=function(lvl,skipRender){
  S._cellarForm=null; S._cellarEdit=null; S._cw=null;
  return _v12ApplyLevel(lvl,skipRender);
};

/* The ST.serv lesson: a store nobody merges silently vanishes on import.
   Union by bottle id, the newer edit wins. Fields are coerced to plain
   strings on the way in: an import is a FILE, and a tampered file must
   yield at worst a strange-looking bottle, never a strange-behaving one. */
function cellarSanitize(b){
  var out={id:String(b.id).slice(0,24),ts:Number(b.ts)||0};
  ['producer','name','vintage','region','grapes','style','glass','bottle','note'].forEach(function(k){
    out[k]=typeof b[k]==='string'?b[k].slice(0,300):'';
  });
  return out;
}
var _v12MergeStats=mergeStats;
mergeStats=function(inc){
  var err=_v12MergeStats(inc);
  if(!err&&inc&&inc.stats&&Array.isArray(inc.stats.cellar)){
    ST.cellar=ST.cellar||[];
    inc.stats.cellar.forEach(function(raw){
      if(!raw||!raw.id)return;
      var b=cellarSanitize(raw);
      var i=-1; ST.cellar.some(function(x,j){ if(x.id===b.id){i=j;return true;} return false; });
      if(i<0)ST.cellar.push(b);
      else if((b.ts||0)>(ST.cellar[i].ts||0))ST.cellar[i]=b;
    });
    stSave();
  }
  return err;
};

/* Cellar drill answers are recorded like any others (statRecord is engine
   plumbing), but they are the venue's list, not a rank's bank: the home
   studyline and the readiness gauges must not count wine-list calls toward
   Court readiness. keyOwned is the one chokepoint every rank aggregate
   walks through; a cellar key's bare id is w-<8>-<kind> under any prefix. */
var _v12KeyOwned=keyOwned;
keyOwned=function(k,lvl){
  var bare=k.indexOf('|')>-1?k.slice(k.indexOf('|')+1):k;
  if(/^w-[a-z0-9]{8}-/.test(bare))return false;
  return _v12KeyOwned(k,lvl);
};
