/* The Cask Atlas: independent study, the existing scheduler and canonical
   navigation. No house inventory or academic-level pool is rewritten. */
function caskChapters(){ return typeof CASK_CHAPTERS !== 'undefined' && Array.isArray(CASK_CHAPTERS) ? CASK_CHAPTERS : []; }
function caskChapter(id){ return caskChapters().find(function(c){ return c.id === id; }) || null; }
function caskState(){ if(!state.casks) state.casks = {page:'index',item:'',q:'',category:'all',scope:'all',run:null}; return state.casks; }
function caskHref(id){ return '#/casks' + (id ? '/' + encodeURIComponent(id) : ''); }
function caskSafeUrl(value){ try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch(e){ return ''; } }
function caskText(value){ return '<p>' + esc(value || '') + '</p>'; }
function caskScope(id){ return caskChapter(id) ? id : 'all'; }
function caskEntries(scope, mode){
  return caskChapters().filter(function(c){ return !scope || scope === 'all' || c.id === scope; }).reduce(function(out,c){
    (mode === 'quiz' ? c.quiz || [] : c.recall || []).forEach(function(q){ out.push({chapter:c.id,id:q.id,q:q.q,a:q.a,options:q.options,answer:q.answer,why:q.why || '',key:'Cask Atlas · ' + c.id + '/' + (mode === 'quiz' ? 'quiz' : 'recall') + '/' + q.id}); });
    return out;
  },[]);
}
function caskRecord(entry){ const r = progress.cards[entry.key]; return {seen:!!r,due:!!(r && (!r.due || r.due <= Date.now())),missed:!!(r && r.w > 0 && r.reps === 0)}; }
function caskReviewed(chapters){ const dates=(chapters || caskChapters()).reduce(function(out,c){return out.concat((c.sources || []).map(function(s){return s.checked || '';}));},[]).filter(Boolean).sort();return dates.length ? '<p class="cask-muted">Sources reviewed '+esc(dates[dates.length-1])+'. Follow the chapter sources for current rules and further study.</p>' : ''; }
function caskDaily(){
  const rows = caskEntries('all','cards');
  const last = function(r){ const p = progress.cards[r.key]; return p ? Number(p.last) || 0 : 0; };
  const due = rows.filter(function(r){ return caskRecord(r).due; }).sort(function(a,b){ return last(a)-last(b); });
  const fresh = rows.filter(function(r){ return !caskRecord(r).seen; });
  const spread = [], groups = {};
  fresh.forEach(function(r){ (groups[r.chapter] || (groups[r.chapter]=[])).push(r); });
  let remaining = true;
  while(remaining){ remaining=false; Object.keys(groups).forEach(function(k){ if(groups[k].length){ spread.push(groups[k].shift()); remaining=true; } }); }
  return due.concat(spread).slice(0,10);
}
function caskStart(mode, scope, selection, entries){
  const s = caskState(); scope=caskScope(scope); mode=mode === 'quiz' ? 'quiz' : 'cards';
  let rows = entries || (selection === 'today' ? caskDaily() : caskEntries(scope,mode));
  if(selection === 'due') rows=rows.filter(function(r){ const x=caskRecord(r); return x.due || x.missed; });
  if(!rows.length){ say('No cards are due in this selection. Choose all cards to practise again.'); return false; }
  rows=selection === 'today' || entries ? rows.slice() : shuffle(rows.slice());
  if(mode === 'quiz') rows=rows.slice(0,Math.min(10,rows.length)).map(function(r){
    const order=shuffle(r.options.map(function(value,i){ return {value:value,correct:i===r.answer}; }));
    return Object.assign({},r,{choices:order});
  });
  s.page='run';s.item='';s.scope=scope;
  s.run={scope:scope,mode:mode,rows:rows,idx:0,flipped:false,graded:false,picked:null,results:[],done:false,saved:false,started:Date.now()};
  state.tab='casks'; return true;
}
function caskFinish(){
  const run=caskState().run; if(!run || run.saved || run.results.length!==run.rows.length) return;
  run.done=true;run.saved=true;
  if(run.mode==='quiz'){
    progress.quizzes.push({date:new Date().toLocaleDateString(),ts:Date.now(),mode:'casks',score:run.results.filter(function(r){return r.ok;}).length,total:run.results.length,replay:!!run.replay});
    progress.quizzes=progress.quizzes.slice(-20);saveProgress();
  }
}
function caskGrade(ok){
  const run=caskState().run; if(!run || run.done || run.graded || run.mode==='cards' && !run.flipped || run.mode==='quiz' && run.picked===null) return;
  const row=run.rows[run.idx]; if(!row) return;
  gradeCardKey(row.key,!!ok);run.graded=true;run.results.push({entry:row,ok:!!ok});
  say(ok ? 'Recorded as correct.' : 'Recorded for more practice.');
}
function caskRouteNow(){
  const s=caskState();let tail='';
  if(s.page==='chapter' && caskChapter(s.item)) tail='/' + s.item;
  else if(s.page==='practice' || s.page==='run') tail='/practice/' + caskScope(s.scope) + (s.page==='run' && s.run ? '/' + s.run.mode : '');
  return {hash:'#/casks' + tail,key:'casks' + tail};
}
function caskRoute(parts){
  if(parts[0]!=='casks') return false;
  const s=caskState();state.tab='casks';
  if(parts[1]==='practice'){
    s.scope=caskScope(parts[2]);
    const mode=parts[3];s.page=s.run && s.run.scope===s.scope && s.run.mode===mode ? 'run' : 'practice';s.item='';
  } else { s.item=caskChapter(parts[1]) ? parts[1] : '';s.page=s.item ? 'chapter' : 'index'; }
  return true;
}
function caskReference(key){ return state.tab==='casks' && caskState().page==='chapter' && /^casks\/practice\//.test(key || ''); }
function caskParent(){
  const s=caskState();
  if(s.page==='run'){s.page='practice';return;}
  if(s.page==='practice' && caskChapter(s.scope)){s.item=s.scope;s.page='chapter';return;}
  if(s.page!=='index'){s.page='index';s.item='';return;}
  state.tab='home';
}
function caskOpen(id){ const s=caskState();state.tab='casks';s.item=caskChapter(id)?id:'';s.page=s.item?'chapter':'index'; }
function caskButton(id,label,cls){ return '<button class="btn ' + (cls || 'btn-ghost') + '" data-act="cask-open" data-id="' + esc(id || '') + '">' + esc(label) + '</button>'; }
function caskSources(chapter){
  return '<details class="cask-sources"><summary>Sources and further reading</summary><ul>' + (chapter.sources || []).map(function(src){const url=caskSafeUrl(src.url);return '<li>'+(url?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(src.title)+'<span class="sr-only"> (opens in a new tab)</span></a>':esc(src.title))+(src.checked?' <span class="cask-muted">Checked '+esc(src.checked)+'</span>':'')+'</li>';}).join('')+'</ul><p class="cask-muted">Saved chapters work offline. External sources need a connection.</p></details>';
}
function caskFacts(chapter){ return '<dl class="cask-facts">' + (chapter.facts || []).map(function(f){return '<div><dt>'+esc(f.label)+'</dt><dd>'+esc(f.value)+'</dd></div>';}).join('')+'</dl>'; }
function caskChapterHTML(c){
  const chapters=caskChapters(), at=chapters.indexOf(c), next=chapters[at+1];
  return '<article class="cask-atlas"><header class="cask-heading"><p class="eyebrow">The Cask Atlas · '+esc(c.category)+'</p><h2 tabindex="-1">'+esc(c.title)+'</h2><p>'+esc(c.summary)+'</p>'+caskReviewed([c])+'</header>'
    +'<div class="cask-actions"><button class="btn btn-brass" data-act="cask-practice" data-id="'+esc(c.id)+'">Practise this chapter</button>'+caskButton('','All chapters')+'</div>'
    +'<nav class="cask-contents" aria-label="Chapter contents"><p class="cask-label">In this chapter</p>'+c.sections.map(function(s,i){return '<button class="btn btn-ghost" data-act="cask-jump" data-id="cask-section-'+i+'">'+esc(s.title)+'</button>';}).join('')+'</nav>'
    +caskFacts(c)
    +(c.id==='production'?'<figure class="cask-process"><figcaption>From grain to glass</figcaption><ol><li>Grain and malt</li><li>Mash and ferment</li><li>Distil and select</li><li>Mature in wood</li><li>Select and bottle</li></ol><p>Each decision changes the spirit. The chapter explains how.</p></figure>':'')
    +c.sections.map(function(s,i){return '<section class="cask-section" id="cask-section-'+i+'"><h3 tabindex="-1">'+esc(s.title)+'</h3>'+(s.paragraphs || []).map(caskText).join('')+((s.bullets || []).length?'<ul>'+s.bullets.map(function(b){return '<li>'+esc(b)+'</li>';}).join('')+'</ul>':'')+'</section>';}).join('')
    +(c.service?'<section class="cask-section cask-service"><h3>At the table</h3><p class="cask-label">Ask first</p>'+caskText(c.service.ask)+'<p class="cask-label">A concise guest explanation</p><blockquote>'+esc(c.service.say || '')+'</blockquote><p class="cask-label">Pairing and application</p>'+caskText(c.service.pairing)+'</section>':'')
    +((c.pitfalls || []).length?'<section class="cask-section"><h3>Avoid these traps</h3><ul>'+c.pitfalls.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul></section>':'')
    +'<section class="cask-section"><h3>Recall before revealing</h3>'+(c.recall || []).map(function(r){return '<details><summary>'+esc(r.q)+'</summary>'+caskText(r.a)+'</details>';}).join('')+'<p class="cask-muted">These reading prompts are unscored. Use practice to record your recall.</p></section>'
    +caskSources(c)
    +'<section class="cask-section"><h3>Continue exploring</h3><div class="cask-actions">'+(c.related || []).map(function(id){const d=caskChapter(id);return d?caskButton(d.id,d.title):'';}).join('')+'</div></section>'
    +'<div class="cask-actions"><button class="btn btn-brass" data-act="cask-practice" data-id="'+esc(c.id)+'">Practise this chapter</button>'+(next?caskButton(next.id,'Next: '+next.title):caskButton('','Return to the atlas'))+'</div></article>';
}
function caskSearchText(c){ return [c.title,c.category,c.summary].concat((c.facts||[]).map(function(f){return f.label+' '+f.value;}),(c.sections||[]).map(function(s){return s.title+' '+(s.paragraphs||[]).join(' ')+' '+(s.bullets||[]).join(' ');})).join(' ').toLowerCase(); }
function caskResultsHTML(){
  const s=caskState(),q=s.q.trim().toLowerCase(), list=caskChapters().filter(function(c){return (s.category==='all'||c.category===s.category)&&(!q||caskSearchText(c).indexOf(q)>=0);});
  return '<p class="cask-muted" role="status">'+list.length+' '+(list.length===1?'chapter':'chapters')+' found</p>'+(list.length?'<div class="cask-grid">'+list.map(function(c){return '<article class="cask-tile"><p class="eyebrow">'+esc(c.category)+'</p><h3>'+esc(c.title)+'</h3><p>'+esc(c.summary)+'</p>'+caskButton(c.id,'Study '+c.title)+'</article>';}).join('')+'</div>':'<p>No chapters match. Try another word or clear the filters.</p><button class="btn btn-ghost" data-act="cask-clear">Clear filters</button>');
}
function caskCompareHTML(){
  const chapters=caskChapters().filter(function(c){return ['American','Scotch','Irish','Japanese','World','Brandy'].indexOf(c.category)>=0;});
  return '<details class="cask-comparison"><summary>Compare the traditions</summary><p>Read the category and its actual rules before assuming how a bottle tastes. Cognac and the other brandies begin with fruit rather than grain.</p><div class="cask-compare-grid">'+chapters.map(function(c){return '<section><h3>'+esc(c.title)+'</h3>'+caskFacts(c)+caskButton(c.id,'Read the distinctions')+'</section>';}).join('')+'</div></details>';
}
function caskIndexHTML(){
  const s=caskState(),chapters=caskChapters(),cats=[...new Set(chapters.map(function(c){return c.category;}))],daily=caskDaily(),cards=caskEntries('all','cards'),quiz=caskEntries('all','quiz');
  return '<div class="cask-atlas"><header class="cask-heading cask-cover"><div class="cask-compass" aria-hidden="true"><svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="32" cy="32" r="23"/><path d="M32 2L38 26L62 32L38 38L32 62L26 38L2 32L26 26Z"/><circle cx="32" cy="32" r="5"/></svg></div><p class="eyebrow">Whisky &amp; Brandy</p><h2 tabindex="-1">The Cask Atlas</h2><p>Follow grain, fruit, copper and oak from their origins to the guest\u2019s glass.</p><p class="cask-muted">'+chapters.length+' chapters · '+cards.length+' recall cards · '+quiz.length+' knowledge checks</p></header>'
    +'<section class="cask-section"><h3>Your path through the atlas</h3><p>Begin with production and maturation, compare the traditions, then practise tasting, service and cocktail choices. Each chapter keeps its full explanation and sources together.</p><div class="cask-actions">'+(chapters[0]?caskButton(chapters[0].id,'Begin the journey','btn-brass'):'')+'<button class="btn btn-ghost" data-act="cask-practice" data-id="all">Choose practice</button></div></section>'
    +'<section class="cask-section cask-daily"><h3>Today\u2019s cask study</h3><p>'+ (daily.length?daily.length+' cards selected from due reviews and new material across chapters.':'You have no due or unseen cards. Return for your next review, or practise any chapter now.')+'</p><button class="btn btn-brass" data-act="cask-start" data-mode="cards" data-s="today" data-id="all"'+(!daily.length?' disabled':'')+'>Start today\u2019s study</button></section>'
    +caskReviewed()+caskCompareHTML()
    +'<section class="cask-browse" aria-labelledby="cask-browse-title"><h3 id="cask-browse-title">Explore the chapters</h3><div class="cask-filter"><label for="cask-q">Search topics, regions or techniques<input class="input" type="search" id="cask-q" value="'+esc(s.q)+'" placeholder="Try oak, peat, bourbon or Cognac"></label><label for="cask-category">Tradition or subject<select class="input" id="cask-category"><option value="all">All chapters</option>'+cats.map(function(c){return '<option value="'+esc(c)+'"'+(s.category===c?' selected':'')+'>'+esc(c)+'</option>';}).join('')+'</select></label></div><div id="cask-results">'+caskResultsHTML()+'</div></section></div>';
}
function caskPracticeHTML(){
  const s=caskState(),c=caskChapter(s.scope),daily=caskDaily(),cards=caskEntries(s.scope,'cards'),qs=caskEntries(s.scope,'quiz'),due=cards.filter(function(r){const a=caskRecord(r);return a.due||a.missed;});
  const dueQuiz=qs.filter(function(r){const a=caskRecord(r);return a.due||a.missed;});
  return '<section class="cask-atlas"><header class="cask-heading"><p class="eyebrow">The Cask Atlas · Practice</p><h2 tabindex="-1">'+esc(c?c.title:'Whisky and brandy practice')+'</h2><p>Recall the detail, explain the distinction and apply it at the table.</p></header>' + (!c?'<section class="cask-section"><h3>Today\u2019s cask study</h3><p>'+daily.length+' due and new cards across the atlas.</p><button class="btn btn-brass" data-act="cask-start" data-mode="cards" data-s="today" data-id="all"'+(!daily.length?' disabled':'')+'>Start today\u2019s study</button></section>':'') + '<div class="cask-grid"><section class="cask-tile"><h3>Recall cards</h3><p>'+cards.length+' prompts. Answer out loud, reveal the explanation, then assess your recall.</p><button class="btn btn-brass" data-act="cask-start" data-mode="cards" data-id="'+esc(s.scope)+'">Practise all cards</button><button class="btn btn-ghost" data-act="cask-start" data-mode="cards" data-s="due" data-id="'+esc(s.scope)+'"'+(!due.length?' disabled':'')+'>Due or missed ('+due.length+')</button></section><section class="cask-tile"><h3>Knowledge check</h3><p>A shuffled round of up to ten questions, with full explanations and a route back to the chapter after every answer.</p><button class="btn btn-brass" data-act="cask-start" data-mode="quiz" data-id="'+esc(s.scope)+'"'+(!qs.length?' disabled':'')+'>Start knowledge check</button><button class="btn btn-ghost" data-act="cask-start" data-mode="quiz" data-s="due" data-id="'+esc(s.scope)+'"'+(!dueQuiz.length?' disabled':'')+'>Due or missed checks ('+dueQuiz.length+')</button></section></div><p class="cask-muted">Your recall and quiz results are saved with your study record. The atlas is an independent course alongside the four academic levels.</p>'+caskButton(c?c.id:'',c?'Read this chapter':'Explore the atlas')+'</section>';
}
function caskRunHTML(){
  const run=caskState().run;if(!run)return caskPracticeHTML();
  if(run.done){const correct=run.results.filter(function(r){return r.ok;}).length;return '<section class="cask-atlas"><header class="cask-heading"><p class="eyebrow">The Cask Atlas</p><h2 tabindex="-1">Your study review</h2><p>'+correct+' of '+run.rows.length+' '+(run.mode==='quiz'?'correct':'recalled by your assessment')+'.</p></header><div class="cask-actions"><button class="btn btn-brass" data-act="cask-retry"'+(correct===run.rows.length?' disabled':'')+'>Practise the misses</button><button class="btn btn-ghost" data-act="cask-practice" data-id="'+esc(run.scope)+'">Choose another round</button></div>'+run.results.map(function(r){const e=r.entry;return '<article class="cask-section"><p class="cask-label">'+(r.ok?'Correct':'Revisit')+'</p><h3>'+esc(e.q)+'</h3>'+caskText(run.mode==='quiz'?e.options[e.answer]:e.a)+(run.mode==='quiz'?caskText(e.why):'')+caskButton(e.chapter,'Read the full chapter')+'</article>';}).join('')+'</section>';}
  const row=run.rows[run.idx];if(!row)return caskPracticeHTML();
  const answer=run.mode==='quiz'?run.graded:run.flipped;
  let body='';
  if(run.mode==='quiz') body='<div class="cask-options" role="group" aria-label="Answer choices">'+row.choices.map(function(o,i){return '<button class="btn btn-ghost cask-option'+(run.graded&&o.correct?' cask-right':'')+'" data-act="cask-pick" data-i="'+i+'"'+(run.graded?' disabled':'')+'>'+esc(o.value)+(run.graded&&o.correct?' <strong>Correct answer</strong>':'')+(run.graded&&run.picked===i?' <span>Your choice</span>':'')+'</button>';}).join('')+'</div>';
  else if(!run.flipped)body='<button class="btn btn-brass" data-act="cask-flip">Reveal the answer</button>';
  if(answer){body+='<section class="cask-answer" aria-label="Answer explanation"><h3>Answer and understanding</h3>'+caskText(run.mode==='quiz'?row.options[row.answer]:row.a)+(run.mode==='quiz'?caskText(row.why):'')+caskButton(row.chapter,'Learn why: read the full chapter')+'</section>';
    if(run.mode==='cards')body+='<div class="cask-actions" role="group" aria-label="Assess your recall"><button class="btn btn-brass" data-act="cask-grade" data-k="yes"'+(run.graded?' disabled':'')+'>Recalled it</button><button class="btn btn-ghost" data-act="cask-grade" data-k="no"'+(run.graded?' disabled':'')+'>Needs practice</button></div>';
  }
  if(run.graded)body+='<p class="cask-muted" role="status">'+(run.results[run.results.length-1].ok?'Recorded as correct.':'Saved for another review.')+'</p><button class="btn btn-brass" data-act="cask-next">'+(run.idx===run.rows.length-1?'See the review':'Next question')+'</button>';
  return '<section class="cask-atlas cask-run"><p class="eyebrow">The Cask Atlas · '+(run.mode==='quiz'?'Knowledge check':'Recall')+'</p><h2 tabindex="-1">'+esc(row.q)+'</h2><p class="cask-muted">'+(run.idx+1)+' of '+run.rows.length+'</p>'+body+'</section>';
}
function renderCasks(){const s=caskState();if(s.page==='chapter'&&caskChapter(s.item))return caskChapterHTML(caskChapter(s.item));if(s.page==='run')return caskRunHTML();if(s.page==='practice')return caskPracticeHTML();return caskIndexHTML();}
function caskAct(act,data){
  if(act==='fc-drill-weak'){
    const card=caskEntries('all','cards').find(function(r){return r.key===data.k;});
    const quiz=card ? null : caskEntries('all','quiz').find(function(r){return r.key===data.k;});
    const row=card || quiz;
    if(!row)return null;
    return caskStart(card?'cards':'quiz',row.chapter,'review',[row])?'render':'done';
  }
  if(act.indexOf('cask-')!==0)return null;
  const s=caskState(),run=s.run;
  if(act==='cask-jump'){
    const section=document.getElementById(data.id || '');
    if(section){section.scrollIntoView({block:'start',behavior:'auto'});const heading=section.querySelector('h3');if(heading)heading.focus({preventScroll:true});}
    return 'done';
  }
  if(act==='cask-open')caskOpen(data.id);
  else if(act==='cask-practice'){state.tab='casks';s.page='practice';s.item='';s.scope=caskScope(data.id);}
  else if(act==='cask-start'){if(!caskStart(data.mode,data.id,data.s))return 'done';}
  else if(act==='cask-clear'){
    s.q='';s.category='all';
    const input=document.getElementById('cask-q'),select=document.getElementById('cask-category'),out=document.getElementById('cask-results');
    if(input)input.value='';if(select)select.value='all';
    if(out){out.innerHTML=caskResultsHTML();if(input)input.focus();return 'done';}
  }
  else if(act==='cask-flip'&&run&&!run.done){run.flipped=true;}
  else if(act==='cask-grade'&&run&&run.mode==='cards'){caskGrade(data.k==='yes');}
  else if(act==='cask-pick'&&run&&run.mode==='quiz'&&!run.graded&&!run.done){const n=Number(data.i),q=run.rows[run.idx];if(!q.choices[n])return 'done';run.picked=n;caskGrade(q.choices[n].correct);}
  else if(act==='cask-next'&&run&&run.graded&&!run.done){if(run.idx===run.rows.length-1)caskFinish();else{run.idx++;run.flipped=false;run.graded=false;run.picked=null;}}
  else if(act==='cask-retry'&&run&&run.done){const rows=run.results.filter(function(r){return !r.ok;}).map(function(r){return r.entry;});if(!rows.length)return 'done';caskStart(run.mode,run.scope,'misses',rows);caskState().run.replay=true;}
  return 'render';
}
function caskAfterRender(){
  const input=document.getElementById('cask-q'),select=document.getElementById('cask-category');
  function update(){const s=caskState();if(input)s.q=input.value;if(select)s.category=select.value;const out=document.getElementById('cask-results');if(out)out.innerHTML=caskResultsHTML();}
  if(input)input.addEventListener('input',update);if(select)select.addEventListener('change',update);
}
function caskOwnsKey(e){return !!(e&&e.target&&e.target.closest&&e.target.closest('.cask-atlas'));}
function caskSearchEntries(){return [{t:'The Cask Atlas',s:'Whisky & Brandy',body:'whiskey whisky bourbon Scotch Cognac Japanese brandy cask oak',h:caskHref()}].concat(caskChapters().map(function(c){return {t:c.title,s:'The Cask Atlas · '+c.category,body:caskSearchText(c),h:caskHref(c.id)};}));}
function caskDoorHTML(){return '<section class="cask-door"><h3>The Cask Atlas</h3><p>Whisky and brandy, from production and provenance to a confident recommendation.</p>'+caskButton('','Explore whisky and brandy')+'</section>';}
