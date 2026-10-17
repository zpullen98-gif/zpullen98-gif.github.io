/* Fall 2026: a curated reading and practice collection, never a House import.
   The canonical data is WorldTable/src/lib/data/fall-menu-2026.json. Its generated
   data-fall-menu.js copy holds only teaching content. No function here changes the
   restaurant, a build, a measured specification, or a person's kept notes. */
function fallMenuData(){
  return typeof FALL_MENU_2026 !== 'undefined' && FALL_MENU_2026 ? FALL_MENU_2026 : { items: [], sources: [] };
}
function fallItems(){
  return Array.isArray(fallMenuData().items) ? fallMenuData().items : [];
}
function fallKind(item){ return item && item.kind === 'cocktail' ? 'cocktail' : 'food'; }
function fallItem(id){ return fallItems().find(function(item){ return item.id === id; }) || null; }
function fallState(){
  if(!state.fallMenu) state.fallMenu = { kind: 'cocktail', item: '', q: '', part: 'read' };
  return state.fallMenu;
}
function fallText(value){
  return typeof value === 'string' ? value : value == null ? '' : String(value);
}
function fallList(value){ return Array.isArray(value) ? value : value ? [value] : []; }
function fallSource(id){
  return fallList(fallMenuData().sources).find(function(source){ return source.id === id; }) || null;
}
function fallHref(id){ return '#/menu/fall' + (id ? '/' + encodeURIComponent(id) : ''); }
function fallLink(url){
  try { const parsed = new URL(url); return parsed.protocol === 'https:' ? parsed.href : ''; } catch(e){ return ''; }
}
function fallCites(ids){
  const sources = [...new Set(fallList(ids))].map(fallSource).filter(Boolean);
  if(!sources.length) return '';
  return '<div class="fall-cites">' + sources.map(function(source){
    const url = fallLink(source.url);
    return url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(source.title) + '<span class="sr-only"> (opens in a new tab)</span></a>'
      : '<span>' + esc(source.title) + '</span>';
  }).join('') + '</div>';
}
function fallParagraph(text){ return '<p>' + esc(fallText(text)).replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') + '</p>'; }
function fallBulletList(values){
  return '<ul>' + fallList(values).map(function(value){ return '<li>' + esc(fallText(typeof value === 'object' && value ? value.text || value.note || value.label : value)) + '</li>'; }).join('') + '</ul>';
}
function fallCards(scope){
  let items = fallItems();
  if(scope === 'food' || scope === 'cocktail') items = items.filter(function(item){ return fallKind(item) === scope; });
  else if(scope && scope.indexOf('item:') === 0) items = items.filter(function(item){ return item.id === scope.slice(5); });
  const cards = [];
  items.forEach(function(item){
    fallList(item.drills).forEach(function(drill){
      if(!drill || !drill.id || !drill.prompt || !drill.answer) return;
      cards.push({ src: 'Fall 2026', name: drill.prompt, back: drill.answer, group: item.name, spec: [],
        fallKey: item.id + '/' + drill.id, itemId: item.id, drillId: drill.id,
        topic: drill.topic || 'Recall', sourceIds: drill.sourceIds || [], ref: { id: item.id } });
    });
  });
  return cards;
}
function fallCardByKey(key){
  return fallCards().find(function(card){ return 'Fall 2026 · ' + card.fallKey === key; }) || null;
}
/* A short daily hand, spread across dishes and drinks before a second
   question from any item. The existing scheduler supplies the latest lapse
   and review date; no new progress field or personal menu row is written. */
function fallTodayCards(){
  const groups = ['cocktail', 'food'].map(function(kind){ return fallItems().filter(function(item){ return fallKind(item) === kind; }); });
  const items = [];
  for(let i = 0; i < Math.max(groups[0].length, groups[1].length); i++) groups.forEach(function(group){ if(group[i]) items.push(group[i]); });
  const byItem = items.map(function(item){ return fallCards('item:' + item.id); });
  const cards = [];
  for(let i = 0; i < Math.max(0, ...byItem.map(function(list){ return list.length; })); i++) byItem.forEach(function(list){ if(list[i]) cards.push(list[i]); });
  return cards.map(function(card, i){
    const record = progress.cards && progress.cards[cardKey(card)];
    const missed = record && record.w > 0 && record.reps === 0;
    return { card: card, i: i, rank: missed ? 0 : !record ? 1 : 2, last: record && record.last || 0 };
  }).sort(function(a, b){ return a.rank - b.rank || (a.rank !== 1 ? a.last - b.last : 0) || a.i - b.i; })
    .slice(0, 10).map(function(row){ return row.card; });
}
function fallDeckDef(id){
  let scope = '', label = 'Fall 2026: food and cocktails';
  if(id === 'fall') {}
  else if(id === 'fall:food' || id === 'fall:dish'){ scope = 'food'; label = 'Fall food menu'; }
  else if(id === 'fall:cocktail'){ scope = 'cocktail'; label = 'Fall cocktails'; }
  else if(id === 'fall:today'){ label = 'Today’s fall practice'; }
  else if(id === 'fall:tableside'){ label = 'Fall 2026: at the table'; }
  else if(id === 'fall:again'){ label = 'Fall 2026: practise again'; }
  else if(id.indexOf('fall:item:') === 0){
    const item = fallItem(id.slice(10));
    if(!item) return null;
    scope = 'item:' + item.id; label = item.name;
  } else return null;
  let cards = fallCards(scope);
  if(id === 'fall:today') cards = fallTodayCards();
  if(id === 'fall:tableside') cards = cards.filter(function(card){ return /table|guest|describe|sell/i.test(card.topic); });
  if(id === 'fall:again') cards = cards.filter(function(card){
    const record = progress.cards && progress.cards[cardKey(card)];
    return record && (record.w > 0 && record.w >= record.r * 0.5 || record.due && record.due <= Date.now());
  });
  return { name: label, preset: { only: cards, deckModes: ['fall'], ordered: id === 'fall:today' }, house: true };
}
function fallRecallHTML(card, flipped, head, front, answer, grade){
  const heading = '<div class="eyebrow">' + esc(card.group) + ' · ' + esc(card.topic) + '</div>';
  const question = '<div class="font-display fall-question">' + esc(card.name) + '</div>';
  if(!flipped) return '<div class="col">' + head + '<div class="panel p5 col tc study-face">' + front + heading + question
    + '<p class="small dim">Say your answer aloud before you reveal it.</p><button class="btn btn-brass" data-act="fc-flip">Flip</button></div></div>';
  return '<div class="col">' + head + '<div class="panel p5 col study-face">' + answer + heading + question
    + '<div class="fall-answer">' + fallParagraph(card.back) + '</div>' + fallCites(card.sourceIds) + fallArtHTML(card.itemId, true)
    + '<a class="chip fall-read-link" href="' + esc(fallHref(card.itemId)) + '">Read the full study card</a>' + grade + '</div></div>';
}
function fallArtHTML(itemId, collapsed){
  const id = 'fall-art-' + itemId;
  if(typeof LedgerTeaching === 'undefined' || !LedgerTeaching.entries[id]) return '';
  if(collapsed) return '<div class="fall-art-answer">' + LedgerTeaching.disclosure(id, 'Explore the teaching illustration and ingredient cues') + '</div>';
  return '<section class="fall-panel fall-art"><div class="eyebrow">The autumn field guide</div><h3>Read the ingredients</h3>'
    + LedgerTeaching.lesson(id) + '</section>';
}
function fallArtThumbnailHTML(itemId){
  const id = 'fall-art-' + itemId;
  const entry = typeof LedgerTeaching === 'undefined' ? null : LedgerTeaching.entries[id];
  if(!entry || !entry.thumb) return '';
  return '<span class="fall-card-art" data-teaching-image="' + esc(id) + '"><img src="' + esc(entry.thumb.src)
    + '" width="' + entry.thumb.width + '" height="' + entry.thumb.height + '" alt="' + esc(entry.alt)
    + '" loading="lazy" decoding="async"><span class="teaching-image-missing" hidden>The ingredient study remains available inside.</span></span>';
}
function fallMenuDoorHTML(){
  return '<a class="fall-door" href="#/menu/fall"><strong>Fall 2026</strong><span>Food, cocktails and the stories to tell at the table.</span></a>';
}
function fallStudyDoorHTML(){
  return rowDoor('data-act="fall-practise" data-deck="fall:today"', 'Fall menu practice', 'Ten recall prompts across food and cocktails, with missed and unseen cards first.');
}
function fallOpen(id){
  const fs = fallState(), item = fallItem(id);
  state.tab = 'menu'; state.menu.view = 'fall';
  fs.item = item ? item.id : '';
  if(item) fs.kind = fallKind(item);
  if(fs.lastItem !== fs.item) fs.part = 'read';
  fs.lastItem = fs.item;
}
function fallMenuRoute(parts){
  if(parts[0] !== 'menu' || parts[1] !== 'fall') return false;
  let id = '';
  try { id = decodeURIComponent(parts[2] || ''); } catch(e){}
  fallOpen(id);
  return true;
}
function fallMenuRouteNow(){
  const fs = fallState();
  return { hash: fallHref(fs.item), key: 'menu/fall' + (fs.item ? '/' + fs.item : '') };
}
function fallTabsHTML(){
  const fs = fallState();
  return '<div class="fall-tabs" role="group" aria-label="Fall menu collections">' + ['cocktail', 'food'].map(function(kind){
    const count = fallItems().filter(function(item){ return fallKind(item) === kind; }).length;
    return '<button class="chip' + (fs.kind === kind ? ' on' : '') + '" data-act="fall-kind" data-k="' + kind + '" aria-pressed="' + (fs.kind === kind ? 'true' : 'false') + '">'
      + (kind === 'food' ? 'Food' : 'Cocktails') + ' <span>' + count + '</span></button>';
  }).join('') + '</div>';
}
function fallRowsHTML(){
  const fs = fallState();
  const query = fs.q.trim().toLowerCase();
  const rows = fallItems().filter(function(item){
    return fallKind(item) === fs.kind && (!query || [item.name, item.shortDescription, item.menuSection].concat(fallList(item.listedIngredients)).join(' ').toLowerCase().indexOf(query) >= 0);
  });
  if(!rows.length) return '<p class="fall-empty">No matches. Try an ingredient or another name.</p>';
  return '<div class="fall-grid">' + rows.map(function(item){
    const count = fallList(item.drills).length;
    return '<a class="fall-card" href="' + esc(fallHref(item.id)) + '">' + fallArtThumbnailHTML(item.id) + '<span class="eyebrow">' + esc(item.menuSection || (fallKind(item) === 'food' ? 'The autumn table' : 'The autumn bar')) + '</span>'
      + '<h3>' + esc(item.name) + '</h3><p>' + esc(item.shortDescription || fallList(item.listedIngredients).join(', ')) + '</p>'
      + '<span class="fall-card-foot">Explore and practise · ' + count + ' recall prompts</span></a>';
  }).join('') + '</div>';
}
function fallTablesideHTML(item){
  const lines = typeof item.tableside === 'string' ? { s20: item.tableside } : item.tableside || {};
  const rows = [['s10','A quick introduction'],['s20','At the table'],['s45','If the guest wants the story']].filter(function(row){ return lines[row[0]]; });
  return '<section class="fall-panel"><h3>At the table</h3><p class="fall-caption">Practise these suggested words, then make them your own. Confirm the current preparation at lineup.</p>'
    + rows.map(function(row){ return '<div class="fall-line"><h4>' + row[1] + '</h4><blockquote>' + esc(lines[row[0]]) + '</blockquote></div>'; }).join('') + '</section>';
}
function fallIngredientsHTML(item){
  return '<section class="fall-panel"><h3>What is listed</h3>' + fallBulletList(item.listedIngredients)
    + (item.price ? '<p class="fall-caption">Price on the uploaded sheet: ' + esc(typeof item.price === 'number' ? '$' + item.price : item.price) + '. Confirm the current menu.</p>' : '')
    + '</section><section class="fall-panel"><h3>Ingredient field notes</h3>'
    + fallList(item.ingredientNotes).map(function(note){
      return '<details class="fall-note"><summary>' + esc(note.name) + '</summary><div>' + fallParagraph(note.explanation)
        + (note.houseBoundary ? '<p class="fall-boundary">' + esc(note.houseBoundary) + '</p>' : '') + fallCites(note.sourceIds) + '</div></details>';
    }).join('') + '</section>';
}
function fallOriginsHTML(item){
  return '<section class="fall-panel"><h3>Origins and connections</h3>'
    + fallList(item.originNotes).map(function(note){ return '<div class="fall-origin">' + fallParagraph(note.text || note) + fallCites(note.sourceIds) + '</div>'; }).join('')
    + '</section>';
}
function fallChecksHTML(item){
  return '<section class="fall-panel"><h3>Before service</h3>' + fallBulletList(item.serviceChecks)
    + '<details class="fall-note"><summary>Dietary notes from the uploaded sheet</summary><div>'
    + (fallList(item.sheetDietaryNotes).length ? fallBulletList(item.sheetDietaryNotes) : '<p>No dietary list was supplied for this item.</p>')
    + '<p class="fall-caption">These are the sheet’s notes, not a complete allergy clearance. Confirm ingredients, substitutions and cross-contact with the kitchen or bar for each guest.</p></div></details></section>';
}
function fallSourcesHTML(item){
  const ids = new Set(fallList(item.sourceIds));
  fallList(item.ingredientNotes).concat(fallList(item.originNotes)).concat(fallList(item.drills)).forEach(function(note){ fallList(note.sourceIds).forEach(function(id){ ids.add(id); }); });
  return '<details class="fall-panel fall-note"><summary>Sources and the menu sheet</summary><div><p class="fall-caption">Menu ingredients and the listed price come from the uploaded training sheet'
    + (item.photoFile ? ' (' + esc(item.photoFile) + ')' : '') + '. The linked sources explain ingredients and history; they do not establish Brennan’s exact recipe. External reading needs a connection.</p>'
    + [...ids].map(function(id){ const source = fallSource(id); return source ? '<div class="fall-source">' + fallCites([id]) + (source.note ? fallParagraph(source.note) : '') + '</div>' : ''; }).join('')
    + '</div></details>';
}
function renderFallMenu(){
  const fs = fallState(), item = fallItem(fs.item);
  if(!item) return '<div class="fall-index"><header class="fall-heading"><div class="eyebrow">Brennan’s · The autumn field guide</div><h2 tabindex="-1">Fall 2026</h2>'
    + '<p>Know the ingredients. Follow their stories. Welcome the guest with a clear, natural description.</p></header>'
    + '<p class="fall-caption">A study companion to your uploaded menu sheets, with researched ingredient notes and suggested tableside language.</p>'
    + fallTabsHTML() + '<div class="fall-practice-bar"><button class="btn btn-brass" data-act="fall-practise" data-deck="fall:' + fs.kind + '">Practise ' + (fs.kind === 'food' ? 'the food menu' : 'the cocktails') + '</button>'
    + '<button class="btn btn-ghost" data-act="deck" data-deck="fall">Study both collections</button><button class="btn btn-ghost" data-act="deck" data-deck="fall:again">Practise again</button></div>'
    + '<label class="fall-search-label" for="fall-menu-q">Find a dish, drink or ingredient</label><input class="input" id="fall-menu-q" type="search" autocomplete="off" value="' + esc(fs.q) + '" placeholder="A name or ingredient">'
    + '<div id="fall-menu-results" aria-live="polite">' + fallRowsHTML() + '</div>'
    + '<p class="fall-caption">Practice uses the Flashcards record. Reading does not change your saved restaurant menu. Cocktail quantities, methods, glassware and garnishes remain unconfirmed unless the sheet states them.</p></div>';
  const part = ['read','ingredients','origins','service'].indexOf(fs.part) >= 0 ? fs.part : 'read';
  const tabs = [['read','At the table'],['ingredients','Ingredients'],['origins','Origins'],['service','Before service']];
  return '<article class="fall-study"><header class="fall-heading"><div class="eyebrow">Fall 2026 · ' + esc(item.menuSection || (fallKind(item) === 'food' ? 'Food' : 'Cocktails')) + '</div>'
    + '<h2 tabindex="-1">' + esc(item.name) + '</h2><p>' + esc(item.shortDescription) + '</p>'
    + (item.pronunciation ? '<p class="fall-caption">Say it (approximate): ' + esc(item.pronunciation) + '</p>' : '') + '</header>'
    + '<div class="fall-practice-bar"><button class="btn btn-brass" data-act="fall-practise" data-deck="fall:item:' + esc(item.id) + '">Practise this item</button>'
    + '<a class="btn btn-ghost" href="#/menu/fall">All fall items</a></div>'
    + '<div class="fall-tabs" role="group" aria-label="Study this menu item">' + tabs.map(function(row){ return '<button class="chip' + (part === row[0] ? ' on' : '') + '" data-act="fall-part" data-k="' + row[0] + '" aria-pressed="' + (part === row[0] ? 'true' : 'false') + '">' + row[1] + '</button>'; }).join('') + '</div>'
    + '<div class="fall-content">' + (part === 'read' ? fallArtHTML(item.id, false) + fallTablesideHTML(item) + '<section class="fall-panel"><h3>Remember the ingredients</h3>' + fallBulletList(item.listedIngredients) + '</section>'
      : part === 'ingredients' ? fallIngredientsHTML(item) : part === 'origins' ? fallOriginsHTML(item) : fallChecksHTML(item))
    + (typeof barCompassFallContextHTML === 'function' ? barCompassFallContextHTML(item.id) : '')
    + fallSourcesHTML(item) + '</div></article>';
}
function fallAct(act, data){
  if(act === 'fall-kind'){
    fallState().kind = data.k === 'food' ? 'food' : 'cocktail';
    return 'render';
  }
  if(act === 'fall-part'){
    fallState().part = ['read','ingredients','origins','service'].indexOf(data.k) >= 0 ? data.k : 'read';
    return 'render';
  }
  if(act === 'fall-practise'){
    if(!openDeck(data.deck || 'fall:cocktail') || !startDeckRun('fall')) return 'done';
    return 'render';
  }
  return null;
}
function fallAfterRender(){
  if(typeof document === 'undefined') return;
  const input = document.getElementById('fall-menu-q');
  if(input) input.addEventListener('input', function(e){
    fallState().q = e.target.value;
    const results = document.getElementById('fall-menu-results');
    if(results) results.innerHTML = fallRowsHTML();
  });
}
function fallSearchEntries(){
  return fallItems().map(function(item){ return { t: item.name, s: 'Fall 2026 · ' + (fallKind(item) === 'food' ? 'Food' : 'Cocktails'),
    body: [item.shortDescription].concat(fallList(item.listedIngredients)).join(' ').toLowerCase(), h: fallHref(item.id) }; });
}
function fallOwnsKey(e){
  return !!(e && e.target && e.target.closest && e.target.closest('.fall-study details, .fall-index a, .fall-cites a, .fall-study a, .fall-read-link, .fall-art-answer'));
}
