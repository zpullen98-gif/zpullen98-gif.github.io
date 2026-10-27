/* The house's learning rooms. These are reading and navigation helpers only:
   every practice door uses an existing deck or action and its existing keys. */
function houseFlowGroup(view){
  if(['studies', 'compass', 'brew'].indexOf(view) >= 0) return 'studies';
  if(view === 'rehearsal') return 'rehearsal';
  if(['reference', 'stock', 'add'].indexOf(view) >= 0) return 'reference';
  return 'menu';
}
function houseFlowNavHTML(view){
  const group = houseFlowGroup(view);
  const primary = [['menu', 'Menu'], ['studies', 'Bar studies'], ['rehearsal', 'Service rehearsal'], ['reference', 'House reference']];
  const buttons = function(items, current){
    return items.map(function(item){
      const on = current === item[0];
      return '<button class="tab-btn' + (on ? ' active' : '') + '" data-act="menu-view" data-v="' + item[0] + '"' + (on ? ' aria-current="page"' : '') + '>' + esc(item[1]) + '</button>';
    }).join('');
  };
  let secondary = [];
  if(group === 'menu') secondary = [['menu', 'The menu']].concat(typeof renderFallMenu === 'function' ? [['fall', 'Fall 2026']] : []);
  if(group === 'studies') secondary = [['studies', 'Overview']]
    .concat(typeof renderBarCompass === 'function' ? [['compass', 'The Bar Compass']] : [])
    .concat(typeof renderBrew === 'function' ? [['brew', 'Coffee and tea']] : []);
  if(group === 'reference') secondary = [['reference', 'Overview'], ['stock', 'The stock'], ['add', 'Add drinks']];
  return '<div class="house-flow-nav"><nav class="house-sections" aria-label="House learning sections">' + buttons(primary, group) + '</nav>'
    + (secondary.length > 1 ? '<nav class="house-subsections" aria-label="' + esc(primary.find(function(item){ return item[0] === group; })[1]) + ' pages">' + buttons(secondary, view) + '</nav>' : '') + '</div>';
}
function houseFlowHeader(title, line){
  return '<header class="house-flow-heading"><h2 class="lv-title" tabindex="-1">' + esc(title) + '</h2><p>' + esc(line) + '</p></header>';
}
function houseFlowLink(href, title, line){
  return '<a class="door" href="' + esc(href) + '"><span class="door-name">' + esc(title) + '</span><span class="door-line">' + esc(line) + '</span></a>';
}
function houseFlowDisclosure(id, title, line, body){
  if(!body) return '';
  return '<details class="house-flow-disclosure" data-flow-keep="' + esc(id) + '"><summary><span><strong>' + esc(title) + '</strong>'
    + (line ? '<span class="house-flow-caption">' + esc(line) + '</span>' : '') + '</span></summary><div class="house-flow-inside">' + body + '</div></details>';
}
/* Disclosure state is a reading convenience, held in memory only. Restore it
   in the HTML before the router returns focus to a door inside a disclosure. */
function houseFlowKept(view, h){
  if(!state.menu.flowKept) state.menu.flowKept = {};
  const key = String(h && (h.id || h.name) || 'no-house') + ':' + view;
  if(!state.menu.flowKept[key]) state.menu.flowKept[key] = {};
  return state.menu.flowKept[key];
}
function houseFlowKeepHTML(view, h, body){
  const kept = houseFlowKept(view, h), used = {};
  const out = body.replace(/<details\b([^>]*)>(\s*)<summary\b([^>]*)>([\s\S]*?)<\/summary>/gi, function(all, attrs, space, summaryAttrs, label){
    const explicit = attrs.match(/\bdata-flow-keep="([^"]+)"/);
    const base = explicit ? explicit[1] : slugify(label.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
    used[base] = (used[base] || 0) + 1;
    const key = base + (used[base] > 1 ? '-' + used[base] : '');
    if(Object.prototype.hasOwnProperty.call(kept, key)){
      attrs = attrs.replace(/\sopen(?:="[^"]*")?(?=\s|$)/gi, '');
      if(kept[key]) attrs += ' open';
    }
    return '<details' + attrs + ' data-flow-key="' + esc(key) + '">' + space + '<summary' + summaryAttrs
      + (/\bid=/.test(summaryAttrs) ? '' : ' id="house-flow-' + esc(view) + '-' + esc(key) + '"') + '>' + label + '</summary>';
  });
  const links = {};
  return out.replace(/<a\b([^>]*)>/gi, function(all, attrs){
    if(/\bid=/.test(attrs)) return all;
    const href = attrs.match(/\bhref="([^"]+)"/);
    if(!href) return all;
    const key = slugify(href[1]);
    links[key] = (links[key] || 0) + 1;
    return '<a' + attrs + ' id="house-link-' + esc(view) + '-' + esc(key) + (links[key] > 1 ? '-' + links[key] : '') + '">';
  });
}
function houseFlowAfterRender(){
  if(typeof document === 'undefined' || typeof document.querySelector !== 'function') return;
  const root = document.querySelector('.house-flow[data-house-flow]');
  if(!root || root.__houseFlow) return;
  root.__houseFlow = true;
  const view = root.getAttribute('data-house-flow');
  const h = typeof hsCurrent === 'function' ? hsCurrent() : null;
  const kept = houseFlowKept(view, h);
  root.addEventListener('toggle', function(e){
    const detail = e.target;
    if(!detail || String(detail.tagName).toLowerCase() !== 'details') return;
    const key = detail.getAttribute('data-flow-key');
    if(key) kept[key] = !!detail.open;
  }, true);
}
function houseFlowOwnsKey(e){
  return !!(e && e.target && e.target.closest && e.target.closest('.house-flow, .house-flow-nav'));
}
function houseFlowStudiesHTML(h){
  const doors = (typeof barCompassDoorHTML === 'function' ? barCompassDoorHTML() : '')
    + (typeof brewDoorHTML === 'function' ? brewDoorHTML() : '')
    + (typeof methodStudyDoorHTML === 'function' ? methodStudyDoorHTML(!!h) : '');
  const reference = rowsNav('Explore the craft', [
    houseFlowLink('#/families', 'Cocktail families', 'Learn the shared structures that help you recognise and compare drinks.'),
    houseFlowLink('#/notes', 'Technique and method', 'Build a clear understanding of balance, preparation and service.'),
    houseFlowLink('#/service', 'Behind the Stick', 'Guest care, glassware, wine service and the working bar.'),
    houseFlowLink('#/ontap', 'On Tap', 'Beer, cider, sake and mead, from the pour to the guest.'),
    houseFlowLink('#/coffee', 'Coffee and tea reference', 'The Library\u2019s lessons, reference cards and films.'),
    houseFlowLink('#/prep', 'The Prep Room', 'Revisit the preparations behind a well organised service.')
  ]);
  const videos = h && typeof hsVideosHTML === 'function' ? hsVideosHTML(h) : '';
  const videoCount = h && typeof hsVideoGroups === 'function' ? hsVideoGroups(h).reduce(function(n, g){ return n + g.videos.length; }, 0) : 0;
  return houseFlowHeader('Bar studies', 'Choose one drink or method, understand why it works, then rehearse it in your own words.')
    + '<div class="house-flow-collections">' + doors + '</div>'
    + (typeof caskDoorHTML === 'function' ? caskDoorHTML() : '')
    + houseFlowDisclosure('craft', 'Explore the craft', 'Families, methods, guest care and the wider drinks library.', reference)
    + houseFlowDisclosure('videos', 'Watch the technique', videoCount + ' videos connected to the house training.', videos)
    + '<div class="house-flow-next">' + rowDoor('data-act="menu-view" data-v="rehearsal"', 'Continue to service rehearsal', 'Recall the ingredients, describe the drink and guide the guest.') + '</div>';
}
function houseFlowStep(number, title, line, body){
  return '<section class="house-flow-step" aria-labelledby="house-step-' + number + '"><div class="house-flow-step-title"><span class="house-flow-number" aria-hidden="true">' + number + '</span><h3 id="house-step-' + number + '">' + esc(title) + '</h3></div><p>' + esc(line) + '</p>' + body + '</section>';
}
function houseFlowRehearsalHTML(h){
  const menuCount = typeof menuCardCount === 'function' ? menuCardCount() : 0;
  const canSpeak = typeof houseDrillsLib === 'function' && houseDrillsLib();
  const sayCount = canSpeak && typeof houseSayItems === 'function' ? houseSayItems().length : 0;
  const guestCount = canSpeak && typeof houseRoleDeck === 'function' ? houseRoleDeck().length : 0;
  const pairing = typeof housePairReady === 'function' && housePairReady().length;
  const today = typeof dueToday === 'function' ? dueToday() : null;
  const daily = rowsNav('Today\u2019s study', [
    today ? rowDoor('data-act="today" data-d="due"', 'Due today', dueTodayLine(today)) : '',
    typeof barCompassDeckDef === 'function' ? rowDoor('data-act="bc-practise" data-deck="compass:today"', 'The Bar Compass: today\u2019s ten', 'A short round of drink structure, comparisons and guest language.') : '',
    typeof fallDeckDef === 'function' ? deckRow('fall:today') : ''
  ]);
  const recall = menuCount ? rowsNav('Recall the ingredients', [deckRow('menu', 'Recall the menu'), menuCount >= 4 ? quizRow('mybar', 'Check your recall', quizBlurb('mybar')) : ''])
    : '<p class="house-flow-caption">The menu\u2019s recall cards appear when drinks have been added to this device.</p>';
  const describe = rowsNav('Describe the drink', [h ? deckRow('menu-line20') : '', sayCount ? rowDoor('data-act="hd-open" data-mode="say"', 'Say it back', 'Say or type the house\u2019s description, then compare it with the kept training. ' + sayCount + ' drinks.') : '']);
  const guest = rowsNav('Guide the guest', [guestCount ? rowDoor('data-act="hd-open" data-mode="role"', 'Guest at the table', 'Listen to the request, give your answer and compare it with the house training.') : '', pairing ? quizRow('housepair', 'Pair the menu', quizBlurb('housepair')) : '']);
  const sections = menuCount && typeof houseSectionList === 'function' ? houseSectionList().map(function(s){ return deckRow('menu:' + s.slug); }) : [];
  const menuDecks = menuCount ? rowsNav('Focused menu cards', sections.concat([deckRow('menu-weak'), deckRow('menu-line10'), deckRow('menu-line45'), deckRow('menu-parts'), deckRow('menu-offer'), deckRow('menu-words'), deckRow('producers')])) : '';
  const compass = typeof barCompassDeckDef === 'function' ? rowsNav('The Bar Compass practice', [deckRow('compass:all'), deckRow('compass:again')]) : '';
  const fall = typeof fallDeckDef === 'function' ? rowsNav('Fall menu practice', [deckRow('fall:cocktail'), deckRow('fall:food'), deckRow('fall:tableside'), deckRow('fall:again')]) : '';
  const brew = typeof brewDeckDef === 'function' ? rowsNav('Coffee and tea practice', [deckRow('brew'), deckRow('brew:coffee'), deckRow('brew:tea'), deckRow('brew:again'), quizRow('brew', 'The coffee and tea quiz', typeof brewQuizLine === 'function' ? brewQuizLine() : '')]) : '';
  const hands = rowsNav('Working the bar', [menuCount || h ? rowDoor('data-act="pr-go" data-v="rail"', 'The Ticket Rail', 'Arrange the menu\u2019s tickets in the order you would make them.') : '', rowDoor('data-act="pr-go" data-v="hold"', 'Hold the Round', 'Hold a round of tickets in memory and call it back.'), rowDoor('data-act="pr-go" data-v="drills"', 'The practical drills', 'Practise with a bottle, a tin and a jigger.')]);
  return houseFlowHeader('Service rehearsal', 'Work through one small round: remember the drink, describe it clearly, then respond to the guest.')
    + '<section class="house-flow-today" aria-labelledby="house-today-h"><h3 id="house-today-h">Today\u2019s study</h3>' + daily + '</section>'
    + '<div class="house-flow-steps">'
    + houseFlowStep(1, 'Recall the ingredients', 'Name the ingredients before you reveal the answer.', recall)
    + houseFlowStep(2, 'Describe the drink', 'Turn the ingredients into a short, welcoming description.', describe || '<p class="house-flow-caption">Kept house descriptions are needed for this rehearsal.</p>')
    + houseFlowStep(3, 'Guide the guest', 'Use what the guest tells you to explain a choice or a pairing.', guest || '<p class="house-flow-caption">Kept house scenarios and pairings appear here when available.</p>')
    + '</div>'
    + houseFlowDisclosure('menu-rounds', 'Focus on part of the menu', 'Sections, missed cards, descriptions, ingredients and producers.', menuDecks)
    + houseFlowDisclosure('compass-rounds', 'The Bar Compass rounds', 'Drink families, comparisons and recommendations.', compass)
    + houseFlowDisclosure('fall-rounds', 'Fall menu rounds', 'Cocktails, food and tableside descriptions.', fall)
    + houseFlowDisclosure('brew-rounds', 'Coffee and tea rounds', 'Recall the methods, revisit misses or take a quiz.', brew)
    + houseFlowDisclosure('hands', 'Rehearse a working service', 'Tickets, memory and practical bar skills.', hands);
}
function houseFlowReferenceHTML(h){
  const producers = h && typeof hsProducersLine === 'function' ? hsProducersLine(h) : '';
  const lists = h && typeof hsHouseListsHTML === 'function' ? hsHouseListsHTML(h) : '';
  const glasses = typeof glassShapesHTML === 'function' ? glassShapesHTML() : '';
  const tools = rowsNav('Manage the house menu', [
    h ? rowDoor('data-act="hs-editall"', 'Edit the menu', 'Review or update your saved drinks and their training details.') : '',
    rowDoor('data-act="menu-view" data-v="stock"', 'The stock', 'Keep the bar\u2019s bottles and availability together.'),
    rowDoor('data-act="menu-view" data-v="add"', 'Add drinks', 'Read a menu or add a drink, then review it before saving.')
  ]);
  return houseFlowHeader('House reference', 'Keep the service notes, producers and working menu close at hand.')
    + (producers ? '<section class="house-flow-reference-block" aria-labelledby="hs-producers-h"><h3 id="hs-producers-h">The producers</h3>' + rowsNav('The producers', [rowDoor('data-act="lv-producers"', 'Explore the house\u2019s producers', producers)]) + '</section>' : '')
    + (lists || '<p class="house-flow-caption">The house\u2019s kept service notes appear here once a house is loaded.</p>')
    + (glasses ? '<section class="house-flow-reference-block" aria-labelledby="house-glasses-h"><h3 id="house-glasses-h">Glassware</h3>' + glasses + '</section>' : '')
    + houseFlowDisclosure('tools', 'Manage the menu and stock', 'Editing and menu tools, together in one place.', tools);
}
function houseFlowHTML(view){
  const h = typeof hsCurrent === 'function' ? hsCurrent() : null;
  let body = '';
  if(view === 'studies') body = houseFlowStudiesHTML(h);
  if(view === 'rehearsal') body = houseFlowRehearsalHTML(h);
  if(view === 'reference') body = houseFlowReferenceHTML(h);
  return body ? '<div class="house-flow hs col-sm" data-house-flow="' + esc(view) + '">' + houseFlowKeepHTML(view, h, body) + '</div>' : '';
}
