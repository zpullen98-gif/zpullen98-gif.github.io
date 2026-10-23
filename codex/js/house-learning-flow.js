/* Four quiet rooms for the house collection. These helpers organise existing
   readings and drills; their original records, grading and routes remain in use.
   Open disclosures are session choices, scoped to the current house and room. */
var V48_ROOMS = [
  ['brennans', 'Wine list'], ['housestudies', 'Wine studies'],
  ['houserehearsal', 'Service rehearsal'], ['housereference', 'House reference']
];
var V48_OPEN = Object.create(null);
function v48E(value) { return v32Esc(String(value == null ? '' : value)); }
function v48RoomName(view) {
  var room = V48_ROOMS.filter(function (item) { return item[0] === view; })[0];
  return room ? room[1] : 'Wine list';
}
function v48NavHtml(active) {
  return '<nav class="v48-nav" aria-label="House learning sections">' + V48_ROOMS.map(function (room) {
    return '<button type="button" class="v48-nav-button" id="v48-nav-' + room[0] + '" data-v48-route="' + room[0] + '"'
      + (active === room[0] ? ' aria-current="page"' : '') + '>' + room[1] + '</button>';
  }).join('') + '</nav>';
}
function v48Door(view, title, line, arg) {
  return '<li><button type="button" class="v25row" data-v48-route="' + v48E(view) + '" data-v48-arg="' + v48E(arg || '') + '">'
    + '<span class="v25row-name">' + v48E(title) + '</span>'
    + (line ? '<span class="v25row-line">' + v48E(line) + '</span>' : '') + '</button></li>';
}
function v48Details(key, title, line, inner) {
  if (!inner) return '';
  return '<details class="v48-disclosure" data-v48-keep="' + key + '"><summary id="v48-summary-' + key + '">'
    + '<span>' + v48E(title) + '</span>' + (line ? '<span class="v48-summary-line">' + v48E(line) + '</span>' : '')
    + '</summary><div class="v48-disclosure-body">' + inner + '</div></details>';
}
function v48Group(key, title, line, rows) {
  if (!rows) return '';
  return '<section class="v48-group" aria-labelledby="v48-heading-' + key + '"><h3 class="secgroup" id="v48-heading-' + key + '">'
    + v48E(title) + '</h3>' + (line ? '<p class="v48-note">' + v48E(line) + '</p>' : '') + v32Rows(rows) + '</section>';
}
function v48Reg(key, title, line) {
  var all = (typeof V25_MINE !== 'undefined' ? V25_MINE : []).concat(typeof V27_DRILL_ROWS !== 'undefined' ? V27_DRILL_ROWS : []);
  return v32RegRow(all, key, title, line);
}
function v48Deck(id, title) { return typeof v32DeckRow === 'function' ? v32DeckRow(id, title) : ''; }
function v48StudyHtml(h) {
  var paths = typeof v40Paths === 'function' ? v40Paths().length : 0;
  var workshops = typeof v40Workshops === 'function' ? v40Workshops().length : 0;
  var rows = v48Door('cellarcompass', 'The Cellar Compass', paths + ' guided studies connecting place, wine and the guest')
    + v48Door('cellarcompass', 'Fall dish pairings', workshops + ' workshops: understand the dish and compare possible wines', 'workshops')
    + v48Door('cellarcompass', 'Every study wine', 'Search the developed profiles by name, grape, producer, region or study path', 'wines');
  var html = v48Group('studies', 'Follow a question through the cellar', 'Choose one study, meet its wines, then explain the connection in your own words.', rows);
  html += v48Details('illustrated', 'Look more closely', 'Illustrated studies, food and wine, and winemaking techniques', v32Rows(
    v48Door('illustrations', 'Illustrated teaching collection', 'Read the images alongside their explanations and recall prompts')
    + v48Door('culinary', 'The Culinary Companion', 'Understand ingredients, sauces, texture and the wine you suggest')
    + v48Door('techniques', 'The Wine Workshop', 'From the vineyard to the bottle: read how the wine is made')));
  var nv = 0;
  try { nv = v30Groups(h).reduce(function (n, group) { return n + group.videos.length; }, 0); } catch (e) { }
  if (nv) html += v48Details('videos', 'Watch the technique', nv + ' house video references', v32Rows(
    v48Door('housevideos', 'House videos', 'Choose the subject, watch with a question in mind, then rehearse it')));
  html += v48Details('wider-study', 'Explore a little further', 'Maps, grapes and service references', v32Rows(
    v48Door('worldmap', 'Wine Atlas', 'Country maps, regional field maps and their detailed readings')
    + v48Deck('grapes-all', 'Grape study cards')
    + v48Door('serviceref', 'Service reference', 'Look up the service details behind your explanation')));
  return html + v48Group('study-next', 'Put the reading into words', '', v48Door('houserehearsal', 'Continue to Service rehearsal', 'Recall the wine, describe it clearly and guide a guest'));
}
function v48RehearsalHtml() {
  var due = typeof v32DueToday === 'function' ? v32DueToday() : { total: 0 };
  var html = '<section class="v48-start" aria-labelledby="v48-heading-today"><p class="v48-eyebrow">A short rehearsal before service</p>'
    + '<h3 id="v48-heading-today">Today\'s study</h3><p>' + v48E(v32DueLine(due)) + '</p>';
  if (due.total) html += '<button type="button" class="btn gold" data-v32="due" id="v48-due">Start due today</button>';
  html += v32Rows(v48Deck('cellar-compass', 'Your daily cellar selection'))
    + '<p class="v48-note">Due today follows your existing review schedule. The cellar selection balances up to five menu wines and five floor bottles.</p></section>';
  html += '<ol class="v48-steps">';
  [
    ['recall', 'Recall the wine', 'Name the wine, place and grapes before checking the answer.',
      v48Deck('list', 'Study our wine cards') + (v32HasHouse() ? v32Row('drilllist', 'Quiz our wine list', 'Check the details you need at the table') : '')],
    ['describe', 'Describe the pour', 'Rehearse a short, clear introduction, then add detail when the guest wants it.',
      v32HasHouse() ? v48Reg('housesay', 'Say the pour') + v48Reg('houserecite', 'Our list by heart') : ''],
    ['guide', 'Guide the guest', 'Listen for preference, explain your recommendation and connect it to the dish.',
      v32HasHouse() ? v48Reg('houseguest', 'Guest at the table') + v48Reg('housepair', 'Pair the menu') : '']
  ].forEach(function (step, i) {
    if (!step[3]) return;
    html += '<li><section aria-labelledby="v48-step-' + step[0] + '"><p class="v48-eyebrow">Step ' + (i + 1) + '</p><h3 id="v48-step-' + step[0] + '">'
      + v48E(step[1]) + '</h3><p class="v48-note">' + v48E(step[2]) + '</p>' + v32Rows(step[3]) + '</section></li>';
  });
  html += '</ol>';
  var focused = v48Deck('list-weak', 'Wine cards to revisit') + v48Deck('bottles', 'Floor bottle cards');
  if (typeof v32Sections === 'function') v32Sections().forEach(function (sec) { focused += v48Deck('list:' + v32Slug(sec.section), sec.section); });
  if (typeof v32FloorSections === 'function') v32FloorSections().forEach(function (sec) { focused += v48Deck('bottles:' + v32Slug(sec.section), 'Floor bottles: ' + sec.section); });
  focused += v48Deck('menu-words', 'Menu vocabulary') + v48Reg('cellarrecite', 'Recite your cellar') + v48Reg('cellardrill', 'Quiz your cellar');
  html += v48Details('focused-rounds', 'Choose a focused round', 'A wine section, floor bottles, vocabulary or wines to revisit', v32Rows(focused));
  html += v48Details('hands-on', 'Rehearse service and tasting', 'Rehearse the sequence, then describe what is in the glass', v32Rows(
    v32GoRow('service', 'The Service Ritual', 'Rehearse the steps until they feel natural')
    + v32GoRow('grid', 'The Blind Grid', 'Read structure and recognise a possible grape')
    + v32GoRow('flight', 'Blind flight', 'Speak through the deductive tasting grid')));
  return html + v48Group('rehearsal-next', 'Return to the wine', '', v48Door('brennans', 'Browse the wine list', 'Open any wine for its full profile and tableside descriptions'));
}
function v48ReferenceHtml(h) {
  var rows = '', producers = 0, inlineHouse = typeof v28HouseDoorOn === 'function' && v28HouseDoorOn();
  try { producers = v38Rows(h).length; } catch (e) { }
  if (producers) rows += v48Door('houseproducers', 'Who makes our wines', producers + ' producer profiles, grouped by region');
  try { if (v29ListUrl(h)) rows += v32Row('fullwine', 'The full printed wine list', 'The larger reference, separate from the developed study profiles'); } catch (e) { }
  if (h && !inlineHouse) rows += v48Reg('house', 'House notes and vocabulary', 'Must-knows, terms, tableside situations, mix-ups and tastings in your house collection');
  var html = v48Group('references', 'Know the house and its wines', 'Use the study profiles to learn. Confirm the current list, vintage, price and availability before service.', rows);
  if (inlineHouse) {
    html += v48Details('house-notes', 'House notes and vocabulary', 'Must-knows, terms, tableside situations, mix-ups and tastings', '<div id="v48-house-read"></div>');
  }
  var tools = (h && !inlineHouse ? '' : v48Reg('house', 'The house collection')) + v48Reg('housereview', 'Review your saved notes');
  if (typeof deskView === 'function') tools += v32GoRow('menudesk', 'Menu Desk', 'Import or organise your menu material');
  tools += '<li><button type="button" class="v25row" data-v48-editlist="true" id="v48-edit-list"><span class="v25row-name">Edit the wine list</span>'
    + '<span class="v25row-line">Manage your own bottles and saved details</span></button></li>';
  html += v48Details('collection-tools', 'Manage the collection', 'Your notes, imports and wine-list tools', v32Rows(tools));
  return html + v48Group('reference-next', 'Take one connection into service', '', v48Door('houserehearsal', 'Return to Service rehearsal', 'Try the words aloud, then check what you still need to learn'));
}
function v48HubHtml(view, h) {
  var lines = {
    housestudies: 'Explore a place. Understand a wine. Bring the discovery to the table.',
    houserehearsal: 'Recall, describe and recommend, one useful step at a time.',
    housereference: 'The people, house notes and practical details behind your service.'
  };
  var html = '<div class="v25page v32-root v48-flow">' + v32Head(v41TabWord(), v48RoomName(view)) + v48NavHtml(view)
    + '<p class="v48-lead">' + v48E(lines[view] || '') + '</p>';
  if (!h) html += '<p class="v48-note">The house collection is not loaded. Its study cards and saved notes will appear when it is available.</p>'
    + v32Rows(v48Reg('house', 'Open the house collection'));
  html += view === 'housestudies' ? v48StudyHtml(h) : view === 'houserehearsal' ? v48RehearsalHtml() : v48ReferenceHtml(h);
  return v48KeepHtml(view, h, html + '</div>');
}
function v48OpenState(view, h) {
  var key = String(h && h.id || 'no-house') + '/' + view;
  return V48_OPEN[key] || (V48_OPEN[key] = Object.create(null));
}
function v48KeepHtml(view, h, html) {
  var kept = v48OpenState(view, h);
  return html.replace(/(<details\b[^>]*data-v48-keep="([^"]+)"[^>]*)(>)/g, function (all, start, key, end) {
    return start + (kept[key] && !/\sopen(?:\s|$|=)/.test(start) ? ' open' : '') + end;
  });
}
function v48WireKeep(box, view, h) {
  if (!box || !box.querySelectorAll) return;
  var kept = v48OpenState(view, h);
  function controls() {
    Array.prototype.forEach.call(box.querySelectorAll('button,summary,a[href],input,select,textarea'), function (node, i) {
      if (!node.id && !node.matches('.v28-row')) node.id = 'v48-' + view + '-control-' + i;
    });
  }
  function rememberDetails(root, nested) {
    Array.prototype.forEach.call(root.querySelectorAll(nested ? 'details' : '[data-v48-keep]'), function (detail, i) {
      if (detail._v48Wired) return;
      detail._v48Wired = true;
      var key = detail.getAttribute('data-v48-keep') || 'house-detail-' + i;
      if (kept[key]) detail.open = true;
      detail.addEventListener('toggle', function () {
        if (detail.isConnected === false) return;
        kept[key] = detail.open;
        if (detail.open && detail.getAttribute('data-v48-keep') === 'house-notes') drawHouse();
      });
    });
  }
  function drawHouse() {
    var target = box.querySelector('#v48-house-read');
    if (target && typeof v28HouseRead === 'function' && v28HouseRead(target)) { rememberDetails(target, true); controls(); }
  }
  controls(); rememberDetails(box);
  var houseDetail = box.querySelector('[data-v48-keep="house-notes"]');
  if (houseDetail && houseDetail.open) drawHouse();
  /* The registry handlers may start a screen before the browser focuses a
     tapped row. Give the existing history machinery the actual opener. */
  box.addEventListener('click', function (event) {
    var node = event.target && event.target.closest ? event.target.closest('[data-go]') : null;
    if (!node || !box.contains(node)) return;
    try { node.focus({ preventScroll: true }); } catch (e) { }
    v32Remember(node);
  }, true);
  box.addEventListener('click', function (event) {
    var node = event.target && event.target.closest ? event.target.closest('[data-v48-route],[data-v48-editlist]') : null;
    if (!node || !box.contains(node)) return;
    event.preventDefault();
    if (node.classList.contains('v48-nav-button') && node.getAttribute('data-v48-route') === S.view) {
      try { window.scrollTo(0, 0); } catch (e) { }
      if (typeof v25FocusMain === 'function') v25FocusMain();
      return;
    }
    try { node.focus({ preventScroll: true }); } catch (e) { }
    v32Remember(node);
    if (node.hasAttribute('data-v48-editlist')) {
      v32Push(function () { S.view = 'cellar'; v28Act('editall', node); });
    } else {
      v32Go({ view: node.getAttribute('data-v48-route'), arg: node.getAttribute('data-v48-arg') || '' }, 'push');
    }
  });
}
