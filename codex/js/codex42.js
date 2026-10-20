/* A clear route through the existing cellar. Reading and navigation never
   create grades. All practice still uses the established engines and IDs. */
function v42Fold(value) {
  var text = String(value || '').toLowerCase();
  try { text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  return text.replace(/[’']/g, '').replace(/\s+/g, ' ').trim();
}
var _v42Words = v32W;
v32W = function (key, vars) {
  if (key === 'wholeList') return 'Menu wine cards';
  if (key === 'countLine') return _v42Words.apply(this, arguments).replace(' wines in ', ' menu wines in ');
  return _v42Words.apply(this, arguments);
};
function v42Button(label, action, arg, gold) {
  return '<button type="button" class="btn ' + (gold ? 'gold' : 'ghost') + '" data-v42="' + action + '"'
    + (arg ? ' data-v42-arg="' + v32Esc(arg) + '"' : '') + '>' + v32Esc(label) + '</button>';
}
var V42_PATHS = [
  { id: 'shift', title: 'Before a shift', time: 'About 10 minutes',
    intro: 'Recall a few wines, say a short description, then rehearse listening to a guest.',
    steps: [
      ['deck', 'cellar-compass', 'Review your cellar selection', 'Ten wines drawn from the menu and floor bottles.'],
      ['go', 'housesay', 'Rehearse Say the pour', 'Practise the ten second line before adding detail.'],
      ['go', 'houseguest', 'Meet a guest at the table', 'Ask about taste, food and budget before recommending.']
    ], finish: 'Ready to use: describe one wine clearly and offer a relevant alternative. Confirm the current vintage, price and availability before service.' },
  { id: 'begin', title: 'Build your foundations', time: 'One chapter at a time',
    intro: 'Use your current level. Read a small section, recall it without looking, then check what needs another visit.',
    steps: [
      ['next', '', 'Open your next reading', 'Continue from the chapters at your selected level.'],
      ['deck', 'grapes', 'Practise your grape cards', 'Compare structure and common styles, without treating them as guarantees.'],
      ['quick', '', 'Try a quick quiz', 'Ten questions to find what to revisit.']
    ], finish: 'Ready to move on: explain the idea in your own words. A missed answer tells you what to revisit next.' },
  { id: 'bottle', title: 'Choose and present a bottle', time: 'A service rehearsal',
    intro: 'Move from the guest’s request to an agreed bottle, then a careful presentation.',
    steps: [
      ['culinary', 'bottle-check', 'Confirm the bottle', 'Check the label, vintage, format, price and the guest’s agreement.'],
      ['culinary', 'guest-care', 'Handle dietary requests', 'Learn what to confirm and how to avoid guessing.'],
      ['go', 'service', 'Rehearse the service sequence', 'Practise the steps, then follow your restaurant’s service standard.']
    ], finish: 'Ready to use: present the correct bottle and explain what you will check if a guest raises a concern.' },
  { id: 'pair', title: 'Read the dish, choose the wine', time: 'One pairing conversation',
    intro: 'Consider the whole plate, the guest’s preference and the available wines.',
    steps: [
      ['culinary', 'sauce', 'Understand the whole dish', 'Start with the sauce, seasoning, richness and texture.'],
      ['compass', 'workshops', 'Explore the fall pairing workshops', 'Apply the principles to Brennan’s training dishes.'],
      ['go', 'housepair', 'Practise the menu pairings', 'Recall the house’s saved pairing lines. Check today’s details before using them.']
    ], finish: 'Ready to use: give one reason for a recommendation and one suitable alternative. A pairing is a conversation, not a universal rule.' },
  { id: 'taste', title: 'Describe what you taste', time: 'Observe, compare, explain',
    intro: 'Separate an observation from a conclusion. Use the same order each time.',
    steps: [
      ['culinary', 'describe', 'Describe before you identify', 'Colour is an observation, not proof of grape, age or quality.'],
      ['go', 'tastegrid', 'Read the tasting grid', 'Work from appearance to nose, palate and a reasoned conclusion.'],
      ['go', 'flight', 'Try a text tasting exercise', 'Reason from written clues. Sensory training requires real samples.']
    ], finish: 'Ready to use: support your conclusion with several observations and explain what remains uncertain.' },
  { id: 'region', title: 'Explore a wine region', time: 'One place, several connections',
    intro: 'Connect the place on the map with its grapes, styles and a bottle you might serve.',
    steps: [
      ['go', 'worldmap', 'Start with the Wine Atlas', 'Locate the region before learning the detail.'],
      ['route', 'regions', 'Read the region in depth', 'Connect climate, grapes, appellations and typical styles.'],
      ['compass', 'wines', 'Find a wine in the cellar', 'Use the study directory to connect the place with a house wine.']
    ], finish: 'Ready to use: locate the region and explain one reason its wines can taste the way they do. Maps show representative places; they are not legal boundary surveys.' }
];
function v42Action(action, arg) {
  if (action === 'today') return v32Go({ view: 'level' }, 'push');
  if (action === 'guide') return v32Go({ view: 'learning' }, 'push');
  if (action === 'deck') return arg === 'cellar-compass' && !v32HasHouse() ? v32Go({ view: 'brennans' }, 'push') : v32OpenDeck(arg);
  if (action === 'culinary') return v37Go(arg);
  if (action === 'compass') return v40Go(arg);
  if (action === 'quick') return v32StartQuick();
  if (action === 'next') {
    var next = v32NextReading(activeLevel);
    return next ? v32Push(function () { v25OpenChapter(next.cat); }) : v32Go({ view: 'primers' }, 'push');
  }
  if (action === 'route') return v32Go({ view: arg }, 'push');
  if (action === 'go' && /^(housesay|houseguest|housepair)$/.test(arg) && !v32HasHouse()) return v32Go({ view: 'brennans' }, 'push');
  if (action === 'go' && typeof V25_GO[arg] === 'function') return v32Push(function () { v25Go(arg); });
}
function v42Wire(root) {
  if (!root || !root.querySelectorAll) return;
  Array.prototype.forEach.call(root.querySelectorAll('[data-v42]'), function (button) {
    if (button._v42wired) return;
    button._v42wired = true;
    button.addEventListener('click', function () { v42Action(button.getAttribute('data-v42'), button.getAttribute('data-v42-arg') || ''); });
  });
}
var _v42HomeHtml = v25HomeHtml;
v25HomeHtml = function () {
  var level = v32Lv(), due = v32DueLine(v32DueToday());
  return '<section class="v42-welcome" aria-labelledby="v42-home-title"><p class="v42-eyebrow">A little study, a more confident service</p>'
    + '<h1 id="v42-home-title">Your wine study</h1><p>Start with a short review, explore a wine, then rehearse explaining it to a guest.</p>'
    + '<div class="v42-actions">' + v42Button('Today’s study', 'today', '', true)
    + v42Button('Find your learning path', 'guide') + '</div>'
    + '<p class="v42-current">' + v32Esc(level.name) + ' · ' + v32Esc(due) + '</p></section>'
    + '<h2 class="v42-level-heading">Choose your level</h2><p class="v42-level-help">Your selection sets the chapters and study questions. Change it whenever you need; your saved answers stay with each level.</p>'
    + _v42HomeHtml.apply(this, arguments);
};
function v42GuideView() {
  var html = '<div class="v25page v42-guide">' + v32Head('The Learning Compass', 'Choose a purpose. Follow a short path. Return with something you can explain.')
    + '<p class="v42-lead">You do not need to finish the library to become more confident at the table. Choose one of these paths, then use Today’s study to revisit what needs another look.</p>'
    + '<div class="v42-actions">' + v42Button('Open Today’s study', 'today', '', true) + v42Button('Browse Practise', 'route', 'flashcards') + '</div>'
    + '<div class="v42-paths">';
  V42_PATHS.forEach(function (path) {
    html += '<section class="v42-path" aria-labelledby="v42-path-' + path.id + '"><p class="v42-eyebrow">' + v32Esc(path.time) + '</p>'
      + '<h3 id="v42-path-' + path.id + '">' + v32Esc(path.title) + '</h3><p>' + v32Esc(path.intro) + '</p><ol>';
    path.steps.forEach(function (step) {
      html += '<li>' + v42Button(step[2], step[0], step[1]) + '<p>' + v32Esc(step[3]) + '</p></li>';
    });
    html += '</ol><p class="v42-outcome">' + v32Esc(path.finish) + '</p></section>';
  });
  html += '</div><section class="v42-reading"><h3>Make each review useful</h3><p>Try to answer before revealing. Choose <strong>Again</strong> when you need another look, and <strong>Got it</strong> when you can explain the answer without help. Opening a guide does not count as getting its questions right.</p>'
    + '<p>A chapter’s reading mark, a wine card’s recall record and a quiz answer measure different things. Use them to choose your next step; none of them certifies a service skill.</p>'
    + '<p>Today’s study includes house wines and questions at your current level. Your cellar selection adds floor bottles. They are different ways to review the same wine records, not duplicate progress.</p>'
    + '<h3>Keep your study with you</h3><p>Progress is saved in this browser. Use Progress Transfer before changing devices or clearing browser data. Export a copy regularly and import it on another device to merge your records.</p>'
    + v42Button('Open Progress Transfer', 'go', 'sync')
    + '<p>The app’s saved core can work offline after its first successful installation. Keep optional maps and teaching images using their download controls before you need them away from a connection. External sources and videos need internet access.</p></section></div>';
  var view = v32Build(html); v42Wire(view); return view;
}
V25_VIEWS.learning = v42GuideView;
V32_PARENT.learning = 'more'; V32_OWNER.learning = 'more';
V25_UNDER.learning = 'more'; V25_HUB.learning = 'more';
V25_GO.learning = function () { v42Action('guide'); };
var _v42MainName = v25MainName;
v25MainName = function () { return S.view === 'learning' ? 'The Learning Compass' : _v42MainName.apply(this, arguments); };
var _v42MoreHtml = v32MoreHtml;
v32MoreHtml = function () {
  var html = _v42MoreHtml.apply(this, arguments), at = html.indexOf('<section');
  var guide = v32Group('Learning and help', v32GoRow('learning', 'The Learning Compass', 'Six short paths through reading, recall and service rehearsal'), 'v42-more-learning');
  return at < 0 ? html : html.slice(0, at) + guide + html.slice(at);
};
function v42PracticeFilter(view) {
  var root = view.querySelector('.v32-root');
  if (!root || root.querySelector('.v42-practice-tools')) return;
  var tools = document.createElement('section'); tools.className = 'v42-practice-tools';
  tools.setAttribute('aria-label', 'Find a study activity');
  tools.innerHTML = '<p>Choose one topic for a short round. Start with today’s cards if you are unsure.</p>'
    + '<label for="v42-practice-search">Find a deck or activity</label><div class="v42-search-line"><input id="v42-practice-search" class="sainput" type="search" placeholder="Try Champagne, grapes or service" autocomplete="off">'
    + '<button type="button" class="btn ghost" id="v42-practice-clear">Clear search</button></div>'
    + '<p id="v42-practice-count" role="status" aria-live="polite"></p><label for="v42-practice-jump">Jump to a collection</label>'
    + '<select class="sainput" id="v42-practice-jump"><option value="">Choose a collection</option></select>'
    + '<p class="v42-help">' + v42Button('Help me choose', 'guide') + '</p>';
  var anchor = root.querySelector('.v32-due'); root.insertBefore(tools, anchor || root.querySelector('.v32-group'));
  var input = tools.querySelector('input'), clear = tools.querySelector('#v42-practice-clear'), count = tools.querySelector('#v42-practice-count'), jump = tools.querySelector('select');
  var groups = Array.prototype.slice.call(root.querySelectorAll('.v32-group,.v32-due,.v41-quick,.v32-testgroup')).filter(function (group, i, arr) { return arr.indexOf(group) === i; });
  var rows = Array.prototype.slice.call(root.querySelectorAll('.v25rows > li'));
  groups.forEach(function (group, i) {
    var heading = group.querySelector('h2,h3');
    if (!heading) return;
    if (!heading.id) heading.id = 'v42-collection-' + i;
    heading.tabIndex = -1;
    var option = document.createElement('option'); option.value = heading.id; option.textContent = heading.textContent; jump.appendChild(option);
  });
  function draw() {
    var query = String(input.value || '').slice(0, 180); S._v42practiceQuery = query;
    var tokens = v42Fold(query).split(' ').filter(Boolean), visible = 0;
    rows.forEach(function (row) {
      var section = row.closest('section'), heading = section && section.querySelector('h2,h3');
      var hay = v42Fold((heading ? heading.textContent + ' ' : '') + row.textContent);
      row.hidden = !tokens.every(function (token) { return hay.indexOf(token) >= 0; });
      if (!row.hidden) visible++;
    });
    groups.forEach(function (group) {
      var children = Array.prototype.slice.call(group.querySelectorAll('.v25rows > li'));
      group.hidden = tokens.length > 0 && (children.length ? !children.some(function (row) { return !row.hidden; }) : !tokens.every(function (token) { return v42Fold(group.textContent).indexOf(token) >= 0; }));
      if (!children.length && !group.hidden) visible++;
      var heading = group.querySelector('h2,h3');
      Array.prototype.forEach.call(jump.options, function (option) { if (heading && option.value === heading.id) option.hidden = group.hidden; });
    });
    clear.hidden = !query;
    count.textContent = tokens.length ? visible ? visible + ' matching activities. Clear search to see every collection.' : 'No matching activities. Try a grape, region or service topic, or clear your search.' : visible + ' activities, grouped below. A deck opens with its study options.';
  }
  input.value = S._v42practiceQuery || ''; input.addEventListener('input', draw);
  clear.addEventListener('click', function () { input.value = ''; draw(); input.focus(); });
  jump.addEventListener('change', function () {
    var heading = document.getElementById(jump.value);
    if (heading) { heading.scrollIntoView({ block: 'start', behavior: 'auto' }); heading.focus({ preventScroll: true }); }
    jump.value = '';
  });
  draw(); v42Wire(tools);
}
function v42Decorate() {
  var main = document.getElementById('view'); if (!main) return;
  v42Wire(main);
  if (S.view === 'flashcards') v42PracticeFilter(main);
  if (S.view === 'level') {
    var today = main.querySelector('#v32-today-h');
    if (today && !main.querySelector('.v42-today-help')) {
      var help = document.createElement('p'); help.className = 'v42-today-help';
      help.innerHTML = 'Read a little, recall without looking, then rehearse a guest conversation. ' + v42Button('Choose a learning path', 'guide');
      today.parentNode.insertBefore(help, today.nextSibling); v42Wire(help);
    }
  }
  if (typeof v37Lessons === 'function') {
    var n = v37Lessons().length, line = main.querySelector('.v37-library-door p'), door = main.querySelector('.v37-index-door button');
    if (line) line.textContent = n + ' short studies connect observation, food pairing and thoughtful service at the table.';
    if (door) door.textContent = 'Read the dish, describe the wine: ' + n + ' guided lessons';
  }
  if (S.view === 'pairs' && !main.querySelector('.v42-pairing-note')) {
    var note = document.createElement('p'); note.className = 'v32-line v42-pairing-note';
    note.textContent = 'These rounds mark one teaching model. Other pairings can work; use the explanation and the guest’s preference.';
    var heading = main.querySelector('h1,h2');
    if (heading) heading.parentNode.insertBefore(note, heading.nextSibling);
    else main.appendChild(note);
  }
}
var _v42Render = render;
render = function () { var result = _v42Render.apply(this, arguments); v42Decorate(); return result; };
(function () {
  if (typeof V32 === 'undefined' || V32.moved || !/^#\/v\/learning(?:\/|$)/.test(V32.initialHash || '')) return;
  v32Apply({ view: 'learning' }, v32CurState()); V32.pend = 'replace';
})();
