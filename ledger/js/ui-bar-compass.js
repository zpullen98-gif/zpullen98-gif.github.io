/* Reviewed teaching is a separate collection, never a live House specification.
   Stable drink/recall IDs use the existing card scheduler and backup format. */
function barCompassData(){ return typeof BRENNANS_BAR_COMPASS === 'undefined' ? {drinks:[],families:[],sources:[],workshops:[]} : BRENNANS_BAR_COMPASS; }
function barCompassDrinks(){ return barCompassData().drinks || []; }
function barCompassDrink(id){ return barCompassDrinks().find(function(d){ return d.id === id; }) || null; }
function barCompassWorkshop(id){ return (barCompassData().workshops || []).find(function(w){ return w.id === id; }) || null; }
function barCompassState(){ if(!state.barCompass) state.barCompass = {item:'',workshop:'',q:'',family:'all'}; return state.barCompass; }
function barCompassHref(id){ return '#/menu/compass' + (id ? '/' + encodeURIComponent(id) : ''); }
function barCompassWorkshopHref(id){ return '#/menu/compass/workshop/' + encodeURIComponent(id); }
function barCompassSafeUrl(value){ if(value === '#/menu/fall') return value; try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch(e){ return ''; } }
function barCompassParas(value){ return String(value || '').split(/\n+/).filter(Boolean).map(function(p){ return '<p>'+esc(p)+'</p>'; }).join(''); }
function barCompassList(rows){ return '<ul>'+(rows || []).map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('')+'</ul>'; }
function barCompassSources(ids){
  const rows = (ids || []).map(function(id){ return (barCompassData().sources || []).find(function(s){ return s.id === id; }); }).filter(Boolean);
  if(!rows.length) return '';
  return '<details class="bc-sources"><summary>Sources and review</summary><p class="bc-caption">Reviewed '+esc(barCompassData().reviewedOn || '')+'. Menu evidence and general cocktail teaching are distinguished in these references.</p><ul>'+rows.map(function(s){
    const href = barCompassSafeUrl(s.url);
    return '<li>'+(href ? '<a href="'+esc(href)+'"'+(href[0] === '#' ? '' : ' target="_blank" rel="noopener noreferrer"')+'>'+esc(s.title)+(href[0] === '#' ? '' : ' <span class="sr-only">(new tab)</span>')+'</a>' : '<strong>'+esc(s.title)+'</strong>')+(s.note ? '<p>'+esc(s.note)+'</p>' : '')+'</li>';
  }).join('')+'</ul></details>';
}
function barCompassCards(scope){
  let drinks = barCompassDrinks();
  if(scope && scope.indexOf('item:') === 0) drinks = drinks.filter(function(d){ return d.id === scope.slice(5); });
  if(scope && scope.indexOf('family:') === 0) drinks = drinks.filter(function(d){ return d.familyId === scope.slice(7); });
  const cards = [];
  drinks.forEach(function(d){ (d.recall || []).forEach(function(r){ cards.push({src:'Bar Compass',name:r.prompt,back:r.answer,group:d.name,spec:[],bcKey:d.id+'/'+r.id,itemId:d.id,drillId:r.id,sourceIds:d.sourceIds || [],ref:{id:d.id}}); }); });
  return cards;
}
function barCompassCardByKey(key){ return barCompassCards().find(function(c){ return 'Bar Compass · '+c.bcKey === key; }) || null; }
function barCompassRecord(card, now){
  const rec = progress.cards && progress.cards['Bar Compass · '+card.bcKey];
  const last = Number(rec && rec.last), due = Number(rec && rec.due);
  const validLast = Number.isFinite(last) && last > 0 && last <= now;
  return {record:rec,last:validLast ? last : 0,today:validLast && new Date(last).toDateString() === new Date(now).toDateString(),
    due:!!rec && Number.isFinite(due) && due > 0 && due <= now,missed:!!rec && rec.w > 0 && rec.reps === 0};
}
function barCompassDaily(now){
  now = now === undefined ? Date.now() : now;
  const cards = barCompassCards(), drinkLast = {};
  cards.forEach(function(c){ drinkLast[c.itemId] = Math.max(drinkLast[c.itemId] || 0,barCompassRecord(c,now).last); });
  const pool = cards.map(function(c,i){
    const s = barCompassRecord(c,now);
    return {card:c,i:i,today:s.today ? 1 : 0,rank:s.missed ? 0 : s.due ? 1 : !s.record ? 2 : 3,last:s.last,drinkLast:drinkLast[c.itemId]};
  }).sort(function(a,b){ return a.today-b.today || a.rank-b.rank || a.drinkLast-b.drinkLast || a.last-b.last || a.i-b.i; });
  /* One prompt per drink in each pass. Today's answers move behind all other
     prompts, so continuing a daily run cannot trap the learner on ten misses. */
  const chosen = [], keys = new Set();
  for(let day = 0; day <= 1 && chosen.length < 10; day++){
    let added = true;
    while(added && chosen.length < 10){
      added = false; const drinks = new Set();
      pool.filter(function(row){ return row.today === day; }).forEach(function(row){
        if(chosen.length >= 10 || keys.has(row.card.bcKey) || drinks.has(row.card.itemId)) return;
        chosen.push(row.card); keys.add(row.card.bcKey); drinks.add(row.card.itemId); added = true;
      });
    }
  }
  return chosen;
}
function barCompassDeckDef(id){
  let name = 'The Bar Compass', cards;
  if(id === 'compass' || id === 'compass:all') cards = barCompassCards();
  else if(id === 'compass:today'){ name = 'The Bar Compass: today’s ten'; cards = barCompassDaily(); }
  else if(id === 'compass:again'){
    name = 'The Bar Compass: due or missed'; const now = Date.now();
    cards = barCompassCards().filter(function(c){ const s = barCompassRecord(c,now); return s.due || s.missed; });
  } else if(id.indexOf('compass:item:') === 0){
    const d = barCompassDrink(id.slice(13)); if(!d) return null;
    name = d.name+': Bar Compass'; cards = barCompassCards('item:'+d.id);
  } else if(id.indexOf('compass:family:') === 0){
    const f = (barCompassData().families || []).find(function(x){ return x.id === id.slice(15); }); if(!f) return null;
    name = f.name+': Bar Compass'; cards = barCompassCards('family:'+f.id);
  } else return null;
  return {name:name,preset:{only:cards,deckModes:['compass'],ordered:id === 'compass:today'},house:true};
}
function barCompassRecallHTML(card, flipped, head, front, answer, grade){
  const heading = '<div class="eyebrow">'+esc(card.group)+' · The Bar Compass</div>';
  const question = '<div class="bc-question">'+esc(card.name)+'</div>';
  if(!flipped) return '<div class="col">'+head+'<div class="panel p5 col tc study-face">'+front+heading+question+'<p class="small dim">Say your answer aloud, then compare it with the reviewed study.</p><button class="btn btn-brass" data-act="fc-flip">Flip</button></div></div>';
  const d = barCompassDrink(card.itemId);
  return '<div class="col">'+head+'<div class="panel p5 col study-face">'+answer+heading+question+'<div class="bc-answer">'+barCompassParas(card.back)+'</div>'
    +'<p class="bc-caption">Authored training notes. Confirm the current house build and availability before service.</p>'+barCompassSources(card.sourceIds)
    +(d && d.fallItemId && typeof fallArtHTML === 'function' ? fallArtHTML(d.fallItemId,true) : '')
    +'<a class="btn btn-ghost bc-read-link" href="'+esc(barCompassHref(card.itemId))+'">Read the full Bar Compass study</a>'+grade+'</div></div>';
}
function barCompassOpen(id, workshop){
  const s = barCompassState(); state.tab = 'menu'; state.menu.view = 'compass';
  s.item = barCompassDrink(id) ? id : ''; s.workshop = barCompassWorkshop(workshop) ? workshop : '';
}
function barCompassRoute(parts){
  if(parts[0] !== 'menu' || parts[1] !== 'compass') return false;
  let id = ''; try { id = decodeURIComponent(parts[2] === 'workshop' ? parts[3] || '' : parts[2] || ''); } catch(e) {}
  barCompassOpen(parts[2] === 'workshop' ? '' : id,parts[2] === 'workshop' ? id : ''); return true;
}
function barCompassRouteNow(){ const s=barCompassState(); const hash=s.workshop ? barCompassWorkshopHref(s.workshop) : barCompassHref(s.item); return {hash:hash,key:hash.slice(2)}; }
function barCompassDoorHTML(){ return '<a class="bc-door" href="'+barCompassHref()+'"><span class="eyebrow">Explore the structure. Serve the guest.</span><strong>The Bar Compass</strong><span>'+barCompassDrinks().length+' Brennan’s drink studies, with comparisons, guest language and recall practice.</span></a>'; }
function barCompassStudyDoorHTML(){
  return rowDoor('data-act="bc-practise" data-deck="compass:today"','The Bar Compass: today’s ten','A mixed practice in drink structure, comparisons and service. Due, missed and unseen prompts come first.')
    +'<a class="door" href="'+barCompassHref()+'"><span class="door-name">Explore The Bar Compass</span><span class="door-line">Browse every reviewed drink, cocktail family and guest workshop.</span></a>';
}
function barCompassHouseMatch(d){
  const h = typeof hsCurrent === 'function' ? hsCurrent() : null;
  const row = h && (h.cocktails || []).find(function(r){ return r.id === d.id && r.name === d.name; });
  return row || null;
}
function barCompassHouseContextHTML(id){
  const d = barCompassDrink(id); if(!d || !barCompassHouseMatch(d)) return '';
  return '<section class="hs-group bc-context"><div class="eyebrow">The Bar Compass · Reviewed teaching</div><h3 class="hs-h3">'+esc(d.familyLabel)+'</h3><p>'+esc(d.basis)+'</p><p class="hs-soft">The study uses a reviewed menu snapshot. Compare it with the current house card above, especially after editing the menu.</p><a class="btn btn-ghost" href="'+barCompassHref(d.id)+'">Explore structure and guest comparisons</a></section>';
}
function barCompassFallContextHTML(id){
  const d = barCompassDrinks().find(function(x){ return x.fallItemId === id; });
  return d ? '<a class="bc-door" href="'+barCompassHref(d.id)+'"><span class="eyebrow">Connect the studies</span><strong>'+esc(d.name)+' in The Bar Compass</strong><span>Understand the structure, compare related drinks and rehearse your recommendation.</span></a>' : '';
}
function barCompassClassicHref(name){
  const c = typeof COCKTAILS === 'undefined' ? null : COCKTAILS.find(function(d){ return d.name === name; });
  return c ? '#/library/'+slugify(c.name) : '';
}
function barCompassComparisonsHTML(d){
  return '<section class="bc-section"><h3>Find the familiar, explain the difference</h3><div class="bc-comparisons">'+(d.comparisons || []).map(function(c){
    const classic = barCompassClassicHref(c.canonName), house = c.houseId ? barCompassDrink(c.houseId) : null;
    return '<article class="bc-panel"><h4>'+esc(c.name)+'</h4><dl><dt>What connects them</dt><dd>'+esc(c.same)+'</dd><dt>What changes</dt><dd>'+esc(c.different)+'</dd><dt>Ask the guest</dt><dd>'+esc(c.ask)+'</dd></dl>'
      +(classic ? '<a class="btn btn-ghost" href="'+classic+'">Read the classic '+esc(c.canonName)+'</a><p class="bc-caption">The Library teaches its own classic recipe.</p>' : '')
      +(house ? '<a class="btn btn-ghost" href="'+barCompassHref(house.id)+'">Compare '+esc(house.name)+'</a>' : '')+barCompassSources(c.sourceIds)+'</article>';
  }).join('')+'</div></section>';
}
function barCompassLessonLinks(d){
  const family = (barCompassData().families || []).find(function(f){ return f.id === d.familyId; });
  const ids = (d.lessonIds || []).concat(family && family.lessonId ? [family.lessonId] : []).filter(function(id,i,a){ return a.indexOf(id) === i; });
  return ids.map(function(id){ const m = typeof methodStudy === 'function' ? methodStudy(id) : null; return m ? '<a class="btn btn-ghost" href="'+methodStudyHref(m.id)+'">'+esc(m.title)+'</a>' : ''; }).join('');
}
function barCompassProgressText(d){
  const cards=barCompassCards('item:'+d.id), now=Date.now();
  const studied=cards.filter(function(c){ return !!barCompassRecord(c,now).record; }).length;
  const due=cards.filter(function(c){ const s=barCompassRecord(c,now); return s.due || s.missed; }).length;
  return studied+' of '+cards.length+' prompts tried'+(due ? ' · '+due+' due or missed' : '');
}
function barCompassSearchText(d){
  const family=(barCompassData().families || []).find(function(f){ return f.id === d.familyId; });
  return [d.name,d.section,d.familyLabel,d.basis,d.kind,(d.listedIngredients || []).join(' '),d.guest,
    family ? family.name+' '+family.structure : '',(d.comparisons || []).map(function(c){ return c.name+' '+(c.canonName || '')+' '+c.same+' '+c.different; }).join(' ')].join(' ').toLowerCase();
}
function barCompassResultsHTML(){
  const s=barCompassState(), q=String(s.q || '').trim().toLowerCase();
  const drinks=barCompassDrinks().filter(function(d){
    return (s.family === 'all' || d.familyId === s.family) && (!q || barCompassSearchText(d).indexOf(q)>=0);
  });
  return '<p class="bc-caption" role="status">'+drinks.length+' of '+barCompassDrinks().length+' reviewed drinks'+(q ? ' matching “'+esc(s.q)+'”' : '')+'.</p>'
    +(drinks.length ? '<div class="bc-grid">'+drinks.map(function(d){ return '<a class="bc-card" href="'+barCompassHref(d.id)+'"><span class="eyebrow">'+esc(d.section)+'</span><h3>'+esc(d.name)+'</h3><span class="bc-family">'+esc(d.familyLabel)+'</span><p>'+esc(d.guest)+'</p><span class="bc-card-foot">'+esc(barCompassProgressText(d))+'</span></a>'; }).join('')+'</div>' : '<p class="bc-empty">No matching drinks. Try another ingredient or choose every family.</p>');
}
function barCompassWorkshopHTML(w){
  return '<article class="bc-study"><header class="bc-heading"><div class="eyebrow">The Bar Compass · Guest workshop</div><h2 tabindex="-1">'+esc(w.title)+'</h2><p>Rehearse a recommendation aloud, then compare your reasoning. This workshop is unscored.</p></header><section class="bc-panel"><h3>The guest’s request</h3>'+barCompassParas(w.prompt)+'<details class="bc-recall"><summary>Compare your approach</summary>'+barCompassParas(w.answer)+'</details></section><nav class="bc-links" aria-label="Drinks in this workshop">'
    +(w.drinkIds || []).map(function(id){ const d=barCompassDrink(id); return d ? '<a class="btn btn-ghost" href="'+barCompassHref(id)+'">Study '+esc(d.name)+'</a>' : ''; }).join('')+'</nav>'+barCompassSources(w.sourceIds)+'</article>';
}
function renderBarCompass(){
  const data=barCompassData(), s=barCompassState(), d=barCompassDrink(s.item), w=barCompassWorkshop(s.workshop);
  if(w) return barCompassWorkshopHTML(w);
  if(!d){
    const family=(data.families || []).find(function(f){ return f.id === s.family; });
    return '<div class="bc-index"><header class="bc-heading"><div class="eyebrow">Brennan’s · A field guide to the bar</div><h2 tabindex="-1">'+esc(data.title || 'The Bar Compass')+'</h2><p>Explore drink structure, familiar comparisons and thoughtful guest recommendations.</p><p class="bc-caption">'+barCompassDrinks().length+' reviewed drink profiles · '+barCompassCards().length+' recall prompts · '+(data.workshops || []).length+' guest workshops</p></header>'
      +'<div class="bc-practice"><button class="btn btn-brass" data-act="bc-practise" data-deck="compass:today">Practise today’s ten</button><button class="btn btn-ghost" data-act="deck" data-deck="compass:all">Every recall prompt</button><button class="btn btn-ghost" data-act="deck" data-deck="compass:again">Due or missed prompts</button></div>'
      +'<p class="bc-caption">New daily runs favour prompts you have not answered today. Your grades use the existing spaced review system; workshops and reading do not change them.</p>'
      +'<details class="bc-about"><summary>About this reviewed collection</summary>'+barCompassParas(data.intro)+'<p class="bc-boundary">Current recipes, prices and availability may change; the house card and the bar team remain your service references.</p></details>'
      +'<div class="bc-filters"><label for="bar-compass-q">Find a drink, ingredient or comparison<input class="input" type="search" id="bar-compass-q" value="'+esc(s.q)+'" placeholder="A drink, ingredient or familiar classic" autocomplete="off"></label><label for="bar-compass-family">Explore a family<select class="input" id="bar-compass-family"><option value="all">Every family</option>'
      +(data.families || []).map(function(f){ return '<option value="'+esc(f.id)+'"'+(s.family === f.id ? ' selected' : '')+'>'+esc(f.name)+'</option>'; }).join('')+'</select></label></div>'
      +'<div id="bar-compass-family-note">'+(family ? '<section class="bc-panel"><h3>'+esc(family.name)+'</h3><p>'+esc(family.structure)+'</p><button class="btn btn-ghost" data-act="deck" data-deck="compass:family:'+esc(family.id)+'">Practise this family</button></section>' : '')+'</div>'
      +'<div id="bar-compass-results">'+barCompassResultsHTML()+'</div><section class="bc-section"><div class="eyebrow">Hospitality in practice</div><h3>Read the guest, guide the choice</h3><p>Explore the guest’s needs before recommending a drink. Each workshop opens with a question to rehearse.</p><div class="bc-workshops">'
      +(data.workshops || []).map(function(x){ return '<a class="bc-card" href="'+barCompassWorkshopHref(x.id)+'"><h4>'+esc(x.title)+'</h4><span class="bc-caption">Unscored guest workshop</span></a>'; }).join('')+'</div></section></div>';
  }
  const match=barCompassHouseMatch(d);
  return '<article class="bc-study"><header class="bc-heading"><div class="eyebrow">The Bar Compass · '+esc(d.section)+'</div><h2 tabindex="-1">'+esc(d.name)+'</h2><p>'+esc(d.guest)+'</p><p class="bc-caption">'+esc(barCompassProgressText(d))+'</p></header>'
    +'<div class="bc-practice"><button class="btn btn-brass" data-act="bc-practise" data-deck="compass:item:'+esc(d.id)+'">Practise this drink</button>'+(match ? '<button class="btn btn-ghost" data-act="bc-house" data-id="'+esc(d.id)+'">Open the current house card</button>' : '')+'</div>'
    +'<p class="bc-boundary">Reviewed teaching, not a measured house build. Compare these notes with the current house recipe and confirm availability before recommending.</p>'
    +'<section class="bc-panel"><div class="eyebrow">Understand the structure</div><h3>'+esc(d.familyLabel)+'</h3>'+barCompassParas(d.basis)+'<h4>Ingredients in the reviewed source</h4>'+barCompassList(d.listedIngredients)+'<dl class="bc-roles">'
    +(d.structure || []).map(function(r){ return '<dt>'+esc(r.role)+'</dt><dd>'+esc(r.detail)+'</dd>'; }).join('')+'</dl></section>'
    +'<section class="bc-panel bc-tableside"><div class="eyebrow">Bring it to the table</div><h3>A clear, welcoming description</h3><blockquote>'+esc(d.tableside)+'</blockquote><h4>Confirm with the bar</h4>'+barCompassList(d.confirm)+'</section>'
    +barCompassComparisonsHTML(d)
    +'<section class="bc-panel"><div class="eyebrow">Recall before you reveal</div><h3>Build your explanation</h3>'+(d.recall || []).map(function(r){ return '<details class="bc-recall"><summary>'+esc(r.prompt)+'</summary>'+barCompassParas(r.answer)+'</details>'; }).join('')+'<p class="bc-caption">Reading these answers is unscored. Use “Practise this drink” to record a recall attempt.</p></section>'
    +(d.fallItemId && typeof fallArtHTML === 'function' ? fallArtHTML(d.fallItemId,true)+'<nav class="bc-links" aria-label="Fall menu study"><a class="btn btn-ghost" href="'+fallHref(d.fallItemId)+'">Read the fall ingredient and origin study</a></nav>' : '')
    +'<nav class="bc-links" aria-label="Related illustrated studies">'+barCompassLessonLinks(d)+'</nav>'+barCompassSources(d.sourceIds)+'</article>';
}
function barCompassAct(act,data){
  if(act === 'bc-practise'){
    if(!openDeck(data.deck || 'compass:today')) return 'done';
    if(!startDeckRun('compass')){ say('No prompts are due or missed in this deck yet.'); return 'render'; }
    return 'render';
  }
  if(act === 'bc-house'){
    const d=barCompassDrink(data.id);
    if(d && barCompassHouseMatch(d) && houseStudyOpenFrom(data.id)) return 'render';
    say('That reviewed drink is not in the current house menu.'); return 'done';
  }
  return null;
}
function barCompassAfterRender(){
  const input=document.getElementById('bar-compass-q'), family=document.getElementById('bar-compass-family');
  if(input) input.addEventListener('input',function(){ barCompassState().q=input.value; const results=document.getElementById('bar-compass-results'); if(results) results.innerHTML=barCompassResultsHTML(); });
  if(family) family.addEventListener('change',function(){ if(typeof captureLiveInputs === 'function') captureLiveInputs(); barCompassState().family=family.value; render(); const fresh=document.getElementById('bar-compass-family'); if(fresh) fresh.focus({preventScroll:true}); });
}
function barCompassSearchEntries(){ return barCompassDrinks().map(function(d){ return {t:d.name,s:'The Bar Compass · '+d.familyLabel,body:barCompassSearchText(d),h:barCompassHref(d.id)}; }); }
function barCompassOwnsKey(e){ return !!(e && e.target && e.target.closest && e.target.closest('.bc-index, .bc-study, .bc-sources, .bc-read-link')); }
