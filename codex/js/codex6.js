/* ============ Codex VI: deductive tasting, study primers, service ritual ============ */
ST.tast=ST.tast||{n:0,c:0};

/* ═══════════ Deductive Tasting ═══════════ */
var TT_COLORS=/purple|ruby|garnet|magenta|opaque|rim|brick|gold|straw|lemon|copper|pink|salmon/i;
function ttSplit(g){
  const sight=[],pal=[];
  g.st.split('·').forEach(function(seg){
    seg=seg.trim(); if(!seg)return;
    (TT_COLORS.test(seg)?sight:pal).push(seg);
  });
  return {sight:sight.join(' · '),pal:pal.join(' · ')};
}
function ttFirstName(g){ return g.g.split('/')[0].trim(); }
function ttOptions(ti){
  const t=GRAPES[ti];
  const cand=GRAPES.map(function(g,i){return i;}).filter(function(i){return i!==ti&&GRAPES[i].c===t.c;});
  const conf=(t.confuse||'').toLowerCase();
  const scored=shuffle(cand).map(function(i){
    const n=ttFirstName(GRAPES[i]).toLowerCase().split(' ')[0];
    return {i:i, hit: conf.indexOf(n)>=0 || (GRAPES[i].confuse||'').toLowerCase().indexOf(ttFirstName(t).toLowerCase().split(' ')[0])>=0};
  }).sort(function(a,b){return (b.hit?1:0)-(a.hit?1:0);});
  return shuffle([ti].concat(scored.slice(0,3).map(function(x){return x.i;})));
}
function startTastingFlight(){
  S.tt={deck:shuffle(GRAPES.map(function(g,i){return i;})).slice(0,6),idx:0,score:0,missed:[],answered:false,picked:null,opts:[]};
  S.tt.opts=ttOptions(S.tt.deck[0]);
  S.view='tasting'; render();
}
function ttPick(i){
  if(S.tt.answered)return;
  S.tt.picked=i; S.tt.answered=true;
  const ok=(S.tt.opts[i]===S.tt.deck[S.tt.idx]);
  if(ok)S.tt.score++; else S.tt.missed.push(S.tt.deck[S.tt.idx]);
  ST.tast.n++; if(ok)ST.tast.c++; stSave();
  render();
}
function ttNext(){
  S.tt.idx++;
  if(S.tt.idx<S.tt.deck.length){
    S.tt.answered=false;S.tt.picked=null;S.tt.opts=ttOptions(S.tt.deck[S.tt.idx]);
  }
  render();
}
function tastingView(){
  if(!S.tt) return tastingIntro();
  if(S.tt.idx>=S.tt.deck.length) return tastingTally();
  const ti=S.tt.deck[S.tt.idx], g=GRAPES[ti], sp=ttSplit(g);
  const keys=['A','B','C','D'];
  const sightLine = sp.sight || (g.c==='w'?'Star-bright white; pale straw to gold':'A red of moderate depth');
  const v=el('<div>'
    +'<div class="quizbar"><span>Blind Flight · Glass '+(S.tt.idx+1)+' of '+S.tt.deck.length+'</span><span class="timer" style="font-size:15px">'+S.tt.score+' right</span></div>'
    +'<div class="progress"><i style="width:'+Math.round(100*(S.tt.idx+1)/S.tt.deck.length)+'%"></i></div>'
    +'<div class="card"><div class="qmeta"><span class="qcat">Deductive Tasting</span><span class="qtype">'+(g.c==='w'?'White':'Red')+' wine</span></div>'
    +'<div class="ttgrid">'
    +'<div class="frow"><b>Sight</b>'+sightLine+'</div>'
    +'<div class="frow"><b>Nose · Fruit</b>'+g.fruit+'</div>'
    +'<div class="frow"><b>Nose · Non-fruit &amp; Oak</b>'+g.other+'</div>'
    +(sp.pal?'<div class="frow"><b>Palate &amp; Structure</b>'+sp.pal+'</div>':'')
    +'</div>'
    +'<div class="qtext" style="margin:14px 0 12px;font-size:18px">Initial conclusion, the grape is:</div>'
    +'<div class="opts"></div><div class="ttreveal"></div></div></div>');
  const box=v.querySelector('.opts');
  S.tt.opts.forEach(function(oi,i){
    const b=el('<button class="opt"><span class="key">'+keys[i]+'</span><span>'+GRAPES[oi].g+'</span></button>');
    if(S.tt.answered){
      b.disabled=true;
      if(oi===ti)b.classList.add('correct');
      else if(i===S.tt.picked)b.classList.add('wrong');
      else b.classList.add('dim');
    } else b.onclick=function(){ttPick(i);};
    box.appendChild(b);
  });
  if(S.tt.answered){
    const ok=(S.tt.opts[S.tt.picked]===ti);
    const last=S.tt.idx>=S.tt.deck.length-1;
    const r=el('<div class="reveal">'
      +'<div class="verdict '+(ok?'ok':'no')+'">'+(ok?'Correctly called':'Missed the call')+': '+g.g+'</div>'
      +'<div class="frow tellrow"><b>The giveaway</b>'+g.tell+'</div>'
      +'<div class="answer-line"><b>Where it shows:</b> '+g.regions+'</div>'
      +'<div class="exp">Do not confuse: '+g.confuse+'</div>'
      +'<div class="nextrow"><span></span><button class="btn gold" id="tt-next">'+(last?'Tally the flight →':'Next glass →')+'</button></div></div>');
    r.querySelector('#tt-next').onclick=ttNext;
    v.querySelector('.ttreveal').appendChild(r);
  }
  return v;
}
function tastingIntro(){
  const life=ST.tast.n?Math.round(100*ST.tast.c/ST.tast.n):null;
  const v=el('<div><div class="viewhead"><h2>The Deductive Tasting</h2>'
    +'<div class="sub">Tasting is graded on the deductive method: describe honestly, then conclude. Study the grid, then pour a blind flight built from the examinable grapes.</div></div>'
    +'<div class="statrow" style="margin:16px 0">'
    +'<div class="stat"><b>'+GRAPES.length+'</b><span>Grapes in play</span></div>'
    +'<div class="stat"><b>6</b><span>Glasses per flight</span></div>'
    +(life!==null?'<div class="stat"><b>'+life+'%</b><span>Lifetime calls · '+ST.tast.n+'</span></div>':'')
    +'</div>'
    +'<div class="modes">'
    +'<button class="mode" id="tt-start"><div class="band"></div><h3>Pour a Blind Flight</h3><p>Six mystery glasses. Sight, nose, and palate from the grid: you make the initial conclusion.</p></button>'
    +'<button class="mode" id="tt-grid"><div class="band"></div><h3>Study the Grid</h3><p>The full deductive tasting grid, step by step: what to say aloud, in order, and what each observation narrows.</p></button>'
    +'</div></div>');
  v.querySelector('#tt-start').onclick=startTastingFlight;
  v.querySelector('#tt-grid').onclick=function(){S.view='tastegrid';render();};
  return v;
}
function tastingTally(){
  const p=Math.round(100*S.tt.score/S.tt.deck.length);
  const missed=S.tt.missed||[];
  const missHtml=missed.length?'<div class="viewhead" style="margin-top:20px"><h2 style="font-size:19px">The ones that got away</h2></div>'
    +missed.map(function(i){const g=GRAPES[i];
      return '<div class="miss"><div class="mq">'+g.g+'</div><div class="ma">'+g.tell+'</div><div class="mexp">Do not confuse: '+g.confuse+'</div></div>';
    }).join(''):'';
  const v=el('<div><div class="result-hero"><div class="big">'+S.tt.score+'/'+S.tt.deck.length+'</div>'
    +'<div class="passfail '+(p>=67?'pass':'fail')+'">'+(p>=67?'A STEADY PALATE':'KEEP TASTING')+'</div>'
    +'<div class="sub2">Blind flight complete · lifetime '+(ST.tast.n?Math.round(100*ST.tast.c/ST.tast.n):0)+'% over '+ST.tast.n+' calls</div></div>'
    +missHtml
    +'<div class="centerrow"><button class="btn" id="tt-again">Pour another flight</button>'
    +'<button class="btn ghost" id="tt-back">Tasting hall</button></div></div>');
  v.querySelector('#tt-again').onclick=startTastingFlight;
  v.querySelector('#tt-back').onclick=function(){S.tt=null;render();};
  return v;
}
/* ---- the grid reference ---- */
var TASTING_GRID=[
 ['Sight',[
  ['Clarity & brightness','Clear or hazy; dull, bright, day-bright, star-bright. Nearly every sound wine today is clear and bright: say it and move on.'],
  ['Concentration','Pale, medium, or deep. Judge against a white page. Deep color in a red points toward thick-skinned grapes: Cabernet, Syrah, Malbec.'],
  ['Color & hue','Whites: straw, yellow, gold. Reds: purple, ruby, garnet. Purple says youth; garnet says age or a naturally lighter variety like Nebbiolo or Pinot Noir.'],
  ['Rim variation','A wide, pale or orange rim on a red suggests age or Nebbiolo/Sangiovese; magenta rim points to Malbec; little rim variation implies youth.'],
  ['Extract & staining','Tears that stain the glass suggest a deeply extracted wine; heavy, slow tears mean alcohol or residual sugar.']]],
 ['Nose',[
  ['Condition & intensity','Clean or showing a fault. Intensity: delicate, moderate, powerful. Aromatic grapes: Muscat, Gewürztraminer, Torrontés, Viognier, Riesling.'],
  ['Age assessment','Youthful (primary fruit dominates) versus developed (dried fruit, leather, earth, oxidative notes).'],
  ['Fruit: white wines','Citrus, apple/pear (cool climate), stone fruit (moderate), tropical (warm). Name real fruits: lime, green apple, apricot, pineapple.'],
  ['Fruit: red wines','Red fruit (cherry, cranberry, raspberry: cooler/lighter) versus black fruit (blackberry, cassis, plum: warmer/fuller). Note fresh vs baked or jammy.'],
  ['Non-fruit','Floral, herbal, vegetal, spice, animal, oxidative. Pyrazine (bell pepper) → Cabernet family; rotundone (black pepper) → Syrah/Grüner; petrol → Riesling.'],
  ['Earth & mineral','Forest floor, mushroom, wet stone, chalk, flint. Earth is a classic Old-World marker, but describe what is in the glass, not the theory.'],
  ['Oak','Vanilla, baking spice, toast, coconut (American oak), dill. New versus used, large versus small barrels.']]],
 ['Palate',[
  ['Sweetness','Bone dry, dry, off-dry, sweet. Confirm the nose’s promise: ripe fruit is not sugar.'],
  ['Body','Light, medium, full. Driven by alcohol, extract, and sugar.'],
  ['Acidity','Low, medium, high. The mouth waters; high acid says cool climate or high-acid variety.'],
  ['Tannin','Low to high; note texture: silky, plush, dusty, grippy, astringent. Structure grape-driven (Nebbiolo, Cabernet) or oak-driven.'],
  ['Alcohol','Warmth on the finish. Under ~11.5% low, 11.5–13.5 medium, above that high, a climate clue in the glass.'],
  ['Finish & complexity','Short, moderate, long. How many distinct flavors persist? Length is the fastest honest quality marker.']]],
 ['Initial conclusion',[
  ['Old World or New','Earth and restraint with higher acid → Old World; forward fruit, riper alcohol → New World. Say it with the evidence, not a guess.'],
  ['Climate','Cool, moderate, or warm: triangulate from fruit character, acid, and alcohol.'],
  ['Age range','1–3 years, 3–5, or older, from color, rim, and development on the nose.'],
  ['Grape candidates','Name two or three plausible varieties, then eliminate against structure: the acid/tannin/alcohol triangle rarely lies.']]],
 ['Final conclusion',[
  ['Commit','One grape, one country, one region, vintage within the range. A specific, defensible call scores; hedging does not.'],
  ['Quality & drinkability','Sound, good, outstanding; drink now or hold. Tie it to concentration, balance, length.'],
  ["The squire's bar",'As a squire you taste two wines and are graded on method and on the accuracy of the major calls (variety, origin, vintage range) not on mystical precision.']]]
];
function tasteGridView(){
  let html='<div><div class="viewhead"><h2>The Deductive Grid</h2><div class="sub">Speak it in this order, aloud, every time: the grid is the exam’s spine and the palate’s discipline.</div></div>';
  TASTING_GRID.forEach(function(sec){
    html+='<div class="secgroup">'+sec[0]+'</div>';
    sec[1].forEach(function(r){
      html+='<div class="gridrow"><div class="gridt">'+r[0]+'</div><div class="gridd">'+r[1]+'</div></div>';
    });
  });
  html+='<div class="centerrow"><button class="btn gold" id="gr-flight">Pour a blind flight</button>'
    +'<button class="btn ghost" id="gr-flash">Grape flashcards</button></div></div>';
  const v=el(html);
  v.querySelector('#gr-flight').onclick=startTastingFlight;
  v.querySelector('#gr-flash').onclick=startFlash;
  return v;
}

/* ═══════════ Service Ritual ═══════════ */
var SERVICE=[
 {t:'Mise en Place',ic:'✦',steps:[
  ['Polish and inspect every glass against the light','Spots, lint, or water marks fail a table before a word is spoken. Hold stems by the base, breathe, polish, and rack.'],
  ['Serviette pressed and folded over the left forearm','It wipes the neck after every pour and shields the label from drips; it never touches the table.'],
  ['Waiter’s corkscrew, matches, and crumber in the pocket','A sommelier borrows nothing mid-service. The two-step (double-hinged) corkscrew is the professional standard.'],
  ['Know the list before the guest asks','By-the-glass pours, vintages currently in the cellar, and two confident recommendations at every price tier.'],
  ['Check service temperatures ahead of the seating','Sparkling and sweet wines on ice early; big reds pulled to cellar temperature: chasing temperature mid-service is too late.']]},
 {t:'Order of Service',ic:'❉',steps:[
  ['Approach from the right, serve with the right hand, move clockwise','Consistency is the courtesy: guests learn where you will appear and are never startled or reached across.'],
  ['Women first where practical, then men, host always last','The host tastes first but is served last: approval first, hospitality before rank thereafter.'],
  ['Never reach across a guest; never turn your back to the table','Walk the extra step around. Service is choreography seen from every chair.'],
  ['Pour to the sensible measure','Roughly 5–6 oz for still wine: a 750 ml bottle serves five to six. Champagne in a two-stage pour; never fill past two-thirds.'],
  ['Keep the table dressed','Fresh glasses for each new wine, crumb between courses, water topped without being asked.']]},
 {t:'Opening Still Wine',ic:'⚜',steps:[
  ['Present the bottle to the host, label forward','Announce producer, wine, appellation, and vintage aloud, and wait for confirmation: this is the moment mislistings are caught.'],
  ['Cut the capsule below the bottom lip','Two draws around with the knife, one vertical, lift the cap. The lip keeps any drip off the foil edge; the label never turns away from the host.'],
  ['Wipe the exposed cork and lip with the serviette','Cellar dust and mold live under capsules. Wipe before the worm goes anywhere near the cork.'],
  ['Insert the worm just off-center and screw to the last spiral','Off-center entry drives the worm down the cork’s true center. Never pierce through the bottom: cork dust in the wine is a fault of technique.'],
  ['Lever in two stages, ease the cork silently by hand','First notch, then second, then fingers for the last half-inch. A still wine opens with no sound at all.'],
  ['Wipe the neck inside and out; present the cork to the host’s right','The guest may read the cork’s branding and condition. Do not sniff it theatrically yourself.'],
  ['Pour the host a taste, about an ounce, and await approval','Then serve the table in order, return to top the host’s glass last, and station the bottle to the host’s right, label facing them.']]},
 {t:'Sparkling Wine',ic:'❈',steps:[
  ['Serve well chilled: 42–50°F (6–10°C)','Cold keeps the mousse fine and the cork docile. A warm bottle of Champagne is a projectile with a label.'],
  ['Present, then remove the foil above the cage','A neat tear at the tab or a knife-assisted peel: the presentation continues; the label still faces the host.'],
  ['Loosen the cage (six half-turns) and never let go of the cork again','From the instant the cage loosens, the thumb rides the cork until it is out. The cage stays on; it gives grip.'],
  ['Angle the bottle 30–45°, away from every guest and light fitting','Grip the cork and cage in the serviette hand and twist the bottle, not the cork, from the base.'],
  ['Release with a sigh, not a pop','Ease the cork out under control so pressure whispers away. The pop is for New Year’s at home; the sigh is professional.'],
  ['Pour in two stages against the mousse','A first pour to let the foam settle, then top to two-thirds. Or pour down the side of a tilted glass, never one foaming push.']]},
 {t:'The Decanting Ritual',ic:'✤',steps:[
  ['Stand the bottle upright the day before','Sediment settles to the base overnight. A bottle pulled flat from the rack cannot be decanted clean.'],
  ['Set the station: candle or torch, decanter, serviette, saucer for the cork','The flame sits under the shoulder of the bottle where sediment first shows. Everything within reach before the cork moves.'],
  ['Open gently, at the table or in the cradle, without disturbing the wine','Same still-wine ritual, softer hands. With very old corks, an ah-so (two-pronged puller) saves crumbling.'],
  ['Pour in one slow, continuous motion over the light','Stopping and restarting stirs the wine. Watch the shoulder: the first wisp of sediment reaching the neck ends the pour.'],
  ['Serve from the decanter; present the original bottle alongside','The empty bottle and cork stay on display: provenance remains visible through the last glass.'],
  ['Know why you decant, and when not to','Old wine: off sediment. Young, structured wine: aeration. Fragile old Burgundy often should not be decanted at all: offer, and follow the host.']]},
 {t:'Temperatures & Glassware',ic:'⚖',steps:[
  ['Sparkling: 42–50°F (6–10°C), flute or tulip','Cold preserves pressure and bead; a tulip gives the nose room the straight flute denies.'],
  ['Light whites & rosé: 45–50°F; fuller whites: 50–55°F','Over-chilling mutes aroma: the ice bucket is a tool, not a parking space. Oaked Chardonnay shows best nearer 55°F.'],
  ['Light reds: 55–60°F, lightly chilled','Beaujolais, Pinot Noir, Frappato gain lift with a quarter-hour in the bucket. “Room temperature” was written in a cold century.'],
  ['Full reds: 60–65°F, never warmer','Above 65°F alcohol rides over fruit. Cellar temperature, not radiator temperature.'],
  ['Fortified & sweet: Fino and Tokaji cold; Tawny cool; Vintage Port at red temperature','Sweetness and alcohol both magnify with warmth; chill disciplines them. Vintage Port needs decanting besides.'],
  ['All-purpose stem, generous bowl, tapering rim','One good glass beats six novelty shapes: swirl room below, aroma focus above, and a polish that survives candlelight.']]},
 {t:'The Practical, as Graded',ic:'❖',steps:[
  ['Salesmanship is scored, not just technique','Recommend an aperitif, a wine for the table, a digestif: by name, producer, and price bracket, with a reason.'],
  ['Expect theory fired at you mid-pour','Classic cocktail builds, spirit bases, vintages, and pairing calls come as conversation while your hands stay busy. The pour must not waver.'],
  ['Hospitality is the tiebreaker','Warmth, eye contact, unhurried confidence. The examiner plays a guest; treat the exam as a real table, never a demonstration.'],
  ['Recover, don’t freeze','A dropped cork or a missed question costs a point; flustering costs the room. Acknowledge, correct gracefully, continue the service.'],
  ['Practice the full rite against a clock, aloud','Choreograph until the words and hands run in parallel from greeting to final pour: rehearsal is the entire secret.']]}
];
function serviceView(){
  S.svc=S.svc||{};
  let html='<div><div class="viewhead"><h2>The Service Ritual</h2><div class="sub">The practical, step by step. Tick each movement as you rehearse it: the choreography must live in the hands, not the notes.</div></div>';
  SERVICE.forEach(function(rite,ri){
    const done=(S.svc[ri]||[]).filter(Boolean).length;
    html+='<div class="secgroup">'+rite.t+' <span class="ritecount">'+done+'/'+rite.steps.length+'</span></div>';
    rite.steps.forEach(function(st,si){
      const on=S.svc[ri]&&S.svc[ri][si];
      html+='<div class="rite'+(on?' done':'')+'" data-r="'+ri+'" data-s="'+si+'">'
        +'<div class="ritebox">'+(on?'✓':(si+1))+'</div>'
        +'<div><div class="ritet">'+st[0]+'</div><div class="ritew">'+st[1]+'</div></div></div>';
    });
  });
  html+='<div class="centerrow"><button class="btn ghost" id="svc-reset">Reset the rehearsal</button></div></div>';
  const v=el(html);
  /* toggle in place: a full render() would scroll the rehearsal back to the top */
  v.querySelectorAll('.rite').forEach(function(row){
    row.onclick=function(){
      const r=+row.dataset.r, s=+row.dataset.s;
      S.svc[r]=S.svc[r]||[];
      const on=S.svc[r][s]=!S.svc[r][s];
      row.classList.toggle('done',on);
      row.querySelector('.ritebox').textContent=on?'✓':(s+1);
      const counts=v.querySelectorAll('.ritecount');
      if(counts[r])counts[r].textContent=(S.svc[r]||[]).filter(Boolean).length+'/'+SERVICE[r].steps.length;
    };
  });
  v.querySelector('#svc-reset').onclick=function(){S.svc={};render();};
  return v;
}

/* ═══════════ Study Primers ═══════════ */
function primerList(){
  const byCat={}; PRIMERS.forEach(function(p){byCat[p.cat]=p;});
  let html='<div><div class="viewhead"><h2>Study Primers</h2><div class="sub">A written chapter for every section: what the examiners actually ask, the facts that anchor it, and the traps that catch candidates.</div></div>';
  DRILL_GROUPS.forEach(function(g){
    const rows=g[1].filter(function(c){return byCat[c];});
    if(!rows.length)return;
    html+='<div class="secgroup">'+g[0]+'</div><div class="seclist">'
      +rows.map(function(c){return '<button class="secbtn" data-p="'+c+'"><span>'+c+'</span><span class="n">›</span></button>';}).join('')
      +'</div>';
  });
  html+='</div>';
  const v=el(html);
  v.querySelectorAll('.secbtn').forEach(function(b){
    b.onclick=function(){S.primerKey=b.dataset.p;S.view='primer';render();};
  });
  return v;
}
function primerView(){
  const p=PRIMERS.filter(function(x){return x.cat===S.primerKey;})[0];
  if(!p){S.view='primers';return primerList();}
  const nQ=QUESTIONS.filter(function(q){return q.cat===p.cat;}).length;
  let html='<div><div class="viewhead"><h2>'+p.cat+'</h2><div class="sub">'+nQ+' questions wait in this section’s drill.</div></div>'
    +'<div class="card primerpage">'
    +'<div class="primerlead">'+p.lead+'</div>'
    +'<div class="primerexam"><b>What the examiners ask</b>'+p.exam+'</div>';
  p.facts.forEach(function(f){
    html+='<div class="frow"><b>'+f[0]+'</b>'+f[1]+'</div>';
  });
  if(p.traps&&p.traps.length){
    html+='<div class="primertraps"><b>Where candidates fall</b><ul>'
      +p.traps.map(function(t){return '<li>'+t+'</li>';}).join('')+'</ul></div>';
  }
  html+='</div><div class="centerrow">'
    +'<button class="btn gold" id="pr-drill">Drill '+p.cat+' →</button>'
    +'<button class="btn ghost" id="pr-back">All primers</button></div></div>';
  const v=el(html);
  v.querySelector('#pr-drill').onclick=function(){startDrill(p.cat);};
  v.querySelector('#pr-back').onclick=function(){S.view='primers';render();};
  return v;
}
/* primers surfaced in encyclopedia search */
var _v5EncyView=encyView;
encyView=function(){
  const v=_v5EncyView();
  const out=v.querySelector('#ency-out'), inp=v.querySelector('#ency-in');
  const orig=inp.oninput;
  inp.oninput=function(){
    orig();
    const t=inp.value.trim().toLowerCase();
    if(t.length<2)return;
    const hits=PRIMERS.filter(function(p){return JSON.stringify(p).toLowerCase().indexOf(t)>=0;});
    if(!hits.length)return;
    const block=el('<div><div class="secgroup">Primer Chapters ('+hits.length+')</div>'
      +hits.slice(0,8).map(function(p){
        /* fact-sheet chapters key by cat; html-body chapters (Intro) key by index */
        const key=p.cat!==undefined?p.cat:PRIMERS.indexOf(p);
        const teaser=(p.lead||String(p.body||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()).slice(0,160);
        return '<div class="encyq primerhit" data-p="'+key+'" style="cursor:pointer"><div class="encyqt">'+(p.cat||p.t)+'</div><div class="encyx">'+teaser+'…</div></div>';
      }).join('')+'</div>');
    block.querySelectorAll('.primerhit').forEach(function(h){
      h.onclick=function(){S.primerKey=isNaN(+h.dataset.p)?h.dataset.p:+h.dataset.p;S.view='primer';render();};
    });
    out.insertBefore(block,out.firstChild);
  };
  return v;
};

/* tasting record surfaced on the dashboard */
var _v5DashView=dashView;
dashView=function(){
  const v=_v5DashView();
  if(ST.tast&&ST.tast.n){
    const row=v.querySelector('.statrow');
    if(row)row.appendChild(el('<div class="stat"><b>'+Math.round(100*ST.tast.c/ST.tast.n)+'%</b><span>Tasting calls · '+ST.tast.n+'</span></div>'));
  }
  return v;
};

/* ═══════════ home tiles + routing + keys ═══════════ */
var _v5DecorateHome=decorateHome;
decorateHome=function(){
  _v5DecorateHome();
  const modes=document.querySelectorAll('.modes');
  const anchor=modes[modes.length-1];
  if(!anchor)return;
  const m6=el('<div class="modes" style="margin-top:14px"></div>');
  const tast=ST.tast.n?Math.round(100*ST.tast.c/ST.tast.n)+'% over '+ST.tast.n+' lifetime calls.':'The second half of the examination.';
  m6.appendChild(el('<button class="mode" id="t-tast"><div class="band"></div><h3>Deductive Tasting</h3><p>The grid, then blind flights of six built from the '+GRAPES.length+' examinable grapes. '+tast+'</p></button>'));
  m6.appendChild(el('<button class="mode" id="t-prim"><div class="band"></div><h3>Study Primers</h3><p>'+PRIMERS.length+' written chapters: what the exam asks per section, the anchor facts, and the classic traps.</p></button>'));
  m6.appendChild(el('<button class="mode" id="t-svc"><div class="band"></div><h3>The Service Ritual</h3><p>Still, sparkling, and decanting choreography as the examiners grade it, as a rehearsal checklist.</p></button>'));
  anchor.parentNode.insertBefore(m6,anchor.nextSibling);
  m6.querySelector('#t-tast').onclick=function(){S.tt=null;S.view='tasting';render();};
  m6.querySelector('#t-prim').onclick=function(){S.view='primers';render();};
  m6.querySelector('#t-svc').onclick=function(){S.view='service';render();};
};
var _v5Render=render;
render=function(){
  const v6={tasting:tastingView,tastegrid:tasteGridView,primers:primerList,primer:primerView,service:serviceView};
  if(v6[S.view]){
    if(S.qT){clearInterval(S.qT);S.qT=null;}
    const app=document.getElementById('app');
    app.innerHTML=''; app.appendChild(topbar()); app.appendChild(v6[S.view]());
    window.scrollTo(0,0); return;
  }
  _v5Render();
};
document.addEventListener('keydown',function(e){
  if(S.view!=='tasting'||!S.tt||S.tt.idx>=S.tt.deck.length)return;
  const tag=(e.target&&e.target.tagName||'').toLowerCase();
  if(tag==='input'||tag==='textarea')return;
  if(!S.tt.answered&&['1','2','3','4'].indexOf(e.key)>=0){e.preventDefault();ttPick(parseInt(e.key,10)-1);}
  else if(S.tt.answered&&(e.key==='Enter'||e.key===' ')){e.preventDefault();ttNext();}
});
