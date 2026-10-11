/* Illustrated studies use the existing Notes route and native disclosures.
   A contextual disclosure never changes the card, grade or stored record. */
function methodStudies(){ return typeof LEDGER_METHOD_STUDIES !== 'undefined' ? LEDGER_METHOD_STUDIES : []; }
function methodStudy(id){ return methodStudies().find(function(s){ return s.id === id; }) || null; }
function methodStudyHref(id){ return '#/notes/studies' + (id ? '/' + id : ''); }
function methodStudyActive(){ return state.tab === 'notes' && state.noteOpen === '__methods'; }
function methodStudyDoorHTML(house){
  return '<a class="method-door" href="'+methodStudyHref()+'"><span class="eyebrow">Illustrated studies</span><strong>'
    +(house ? 'Practise the Brennan’s bar essentials' : 'Explore the methods of service')+'</strong><span>Four unscored studies: stirring, shaking, coffee and cream, and building with bubbles.</span></a>';
}
function methodSourceHTML(s){
  return '<details class="method-sources"><summary>Sources and review</summary><p>Reviewed '+esc(s.reviewedOn)+'. House menu facts and general methods have different sources; the drawings are general studies.</p><ul>'
    + s.sources.map(function(x){ return '<li><a href="'+esc(x[1])+'" target="_blank" rel="noopener noreferrer">'+esc(x[0])+' <span class="sr-only">(new tab)</span></a></li>'; }).join('')+'</ul></details>';
}
function methodImageHTML(s){
  return '<figure class="method-figure"><img src="'+esc(s.image)+'" width="1200" height="600" loading="lazy" decoding="async" alt="'+esc(s.alt)+'"><figcaption>General method illustration. Read panels A, B and C with the steps below. The vessels, quantities and presentation are not a Brennan’s specification.</figcaption></figure>';
}
function methodStudyBodyHTML(s, compact){
  const steps='<ol class="method-steps">'+s.steps.map(function(x,i){ return '<li><span class="method-step-mark" aria-hidden="true">'+['A','B','C'][i]+'</span><div><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></div></li>'; }).join('')+'</ol>';
  const checks='<section class="method-checks"><h3>Look, then check</h3><ul>'+s.checks.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul></section>';
  const recall='<section class="method-recall"><div class="eyebrow">Recall before reading on</div><p>'+esc(s.recall)+'</p><details><summary>Compare your explanation</summary><p>'+esc(s.answer)+'</p></details></section>';
  const guest='<section class="method-guest"><h3>Bring it to the guest</h3><p>'+esc(s.guest)+'</p><p class="method-caption">Rehearsal language, to adapt to the actual drink and the guest.</p></section>';
  const house='<details class="method-house"><summary>Brennan’s: what is known, what to confirm</summary><p>'+esc(s.house)+'</p><p><strong>Confirm on shift:</strong> '+esc(s.confirm)+'</p></details>';
  const refs=typeof LedgerTeaching !== 'undefined' ? s.references.map(function(id){ return LedgerTeaching.disclosure(id,methodReferenceTitle(id)); }).join('') : '';
  const reading=compact ? '' : '<nav class="method-reading" aria-label="Continue reading">'+s.reading.map(function(x){ return '<a class="btn btn-ghost" href="'+esc(x[1])+'">'+esc(x[0])+'</a>'; }).join('')+'</nav>';
  return '<div class="method-content">'+methodImageHTML(s)+steps+checks+recall+guest+house+(refs ? '<section class="method-companions"><h3>Look more closely</h3>'+refs+'</section>' : '')+methodSourceHTML(s)+reading+'</div>';
}
function renderMethodStudies(){
  const s=methodStudy(state.methodStudyId);
  if(!s){
    return '<div class="method-index"><header class="method-heading"><div class="eyebrow">The illustrated field guide</div><h2 class="lv-title" tabindex="-1">Methods of service</h2><p>See the action. Explain its purpose. Bring it to the guest.</p><p class="method-caption">Four unscored studies for the Brennan’s bar, with general illustrations and clear house checkpoints.</p></header><div class="method-cards">'
      +methodStudies().map(function(x,i){ return '<a class="method-card" href="'+methodStudyHref(x.id)+'"><span class="eyebrow">Study '+(i+1)+' · '+esc(x.eyebrow)+'</span><h3>'+esc(x.title)+'</h3><img class="method-card-preview" src="'+esc(x.image)+'" width="1200" height="600" loading="lazy" decoding="async" alt=""><p>'+esc(x.intro)+'</p><span class="method-card-action">Open the study</span></a>'; }).join('')
      +'</div><details class="method-house"><summary>How to use this collection</summary><p>Read the three panels and their live steps. Explain the method aloud, compare your explanation, then practise under the bar’s guidance. The questions do not change a flashcard grade.</p><p>These illustrations teach general actions. They do not establish Brennan’s glassware, measures, garnish, current availability or allergy suitability. Use the actual house build and confirm its missing details.</p></details></div>';
  }
  const at=methodStudies().indexOf(s), next=methodStudies()[at+1];
  return '<article class="method-study"><header class="method-heading"><div class="eyebrow">'+esc(s.eyebrow)+'</div><h2 class="lv-title" tabindex="-1">'+esc(s.title)+'</h2><p>'+esc(s.intro)+'</p><p class="method-caption">Study '+(at+1)+' of '+methodStudies().length+' · Unscored practice</p></header>'
    +methodStudyBodyHTML(s,false)
    +'<nav class="method-next" aria-label="Study collection">'+(next ? '<a class="method-door" href="'+methodStudyHref(next.id)+'"><span class="eyebrow">Next study</span><strong>'+esc(next.title)+'</strong></a>' : '<a class="method-door" href="'+methodStudyHref()+'"><strong>Explore all four studies</strong></a>')+'</nav></article>';
}
function methodReferenceTitle(id){
  return {'bar-tools':'Bar tools: identify the working end',ice:'Ice: compare four forms','garnish-citrus':'Citrus: recognise the named cut','brennans-glassware':'Glass shapes: vocabulary, not a house assignment'}[id] || 'Illustrated reference';
}
function methodIdsForRecord(src,id,name){
  return methodStudies().filter(function(s){
    if(src === 'My Bar') return s.houseIds.indexOf(id) >= 0;
    if(src === 'Components') return s.componentIds.indexOf(id) >= 0;
    return src === 'Cocktails' && s.canonNames.indexOf(name) >= 0;
  }).map(function(s){ return s.id; });
}
function methodInlineHTML(ids){
  return ids.map(function(id){ const s=methodStudy(id); if(!s) return ''; return '<details class="method-inline"><summary><span>Practise the method</span><strong>'+esc(s.title)+'</strong></summary><div class="method-inline-body"><p>'+esc(s.intro)+'</p>'+methodStudyBodyHTML(s,true)+'<a class="btn btn-ghost" href="'+methodStudyHref(id)+'">Open this study on its own</a></div></details>'; }).join('');
}
function methodHouseStudyHTML(id){
  const ids=methodIdsForRecord('My Bar',id,'');
  return ids.length ? '<section class="hs-group method-house-studies"><h3 class="hs-h3">Practise the method</h3><p class="hs-soft">General technique studies. Your house build remains the reference for this drink.</p>'+methodInlineHTML(ids)+'</section>' : '';
}
function methodComponentStudyHTML(id){ return methodInlineHTML(methodIdsForRecord('Components',id,'')); }
function methodFeedbackHTML(c,mode){
  if(!c) return '';
  const ids=methodIdsForRecord(c.src,c.ref && c.ref.id,c.name);
  const refs=[];
  if(mode === 'service' && typeof c.glass === 'string' && c.glass.trim() && c.glass !== '-') refs.push('brennans-glassware');
  if(['service','build','cloze','name2spec'].indexOf(mode)>=0){
    if(typeof citrusGarnishLink === 'function' && citrusGarnishLink(c.garnish)) refs.push('garnish-citrus');
    if(typeof c.method === 'string' && /\b(shake|shaken|stir|stirred|strain)\b/i.test(c.method)) refs.push('bar-tools','ice');
  }
  const art=typeof LedgerTeaching !== 'undefined' ? refs.filter(function(id,i){ return refs.indexOf(id)===i && !ids.some(function(mid){ return methodStudy(mid).references.indexOf(id)>=0; }); }).map(function(id){ return LedgerTeaching.disclosure(id,methodReferenceTitle(id)); }).join('') : '';
  return ids.length || art ? '<aside class="method-feedback" aria-label="Optional visual study">'+methodInlineHTML(ids)+art+'</aside>' : '';
}
function methodDrillReferencesHTML(id){
  const refs={mise:['bar-tools','ice'],garnish:['garnish-citrus'],glassware:['brennans-glassware'],strain:['bar-tools'],consistency:['ice'],pour:['bar-tools'],foam:['bar-tools','ice']}[id] || [];
  const methods={strain:['shake-texture'],foam:['shake-texture'],consistency:['shake-texture']}[id] || [];
  return methodInlineHTML(methods)+(typeof LedgerTeaching !== 'undefined' ? refs.map(function(r){ return LedgerTeaching.disclosure(r,methodReferenceTitle(r)); }).join('') : '');
}
function methodStudySearchEntries(){
  return methodStudies().map(function(s){ return {t:s.title,s:'Illustrated method study',body:(s.intro+' '+s.house+' '+s.steps.map(function(x){ return x.join(' '); }).join(' ')).toLowerCase(),h:methodStudyHref(s.id)}; });
}
/* Native disclosures and links own their keyboard while being read. The
   application's global card shortcuts must not flip, grade or leave them. */
function methodStudyOwnsKey(event){
  return !!(event && event.target && event.target.closest && event.target.closest('.method-inline, .method-feedback, .method-study, .method-index'));
}
