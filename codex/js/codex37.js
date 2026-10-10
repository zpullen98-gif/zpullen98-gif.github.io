/* Codex XXXVII: a culinary companion for observation and gracious service.
   All teaching joins are authored identities. Practice stays outside marks,
   timers and storage; a card's answer must be revealed before its door exists. */
function v37Data() { return typeof CODEX_CULINARY_STUDIES === 'object' && CODEX_CULINARY_STUDIES ? CODEX_CULINARY_STUDIES : {}; }
function v37Lessons() { var data = v37Data(); return Array.isArray(data.lessons) ? data.lessons : []; }
function v37Lesson(id) { return v37Lessons().find(function (lesson) { return lesson.id === id; }) || null; }
function v37Mapped(kind, id) {
  var map = v37Data()[kind], list = map && Object.prototype.hasOwnProperty.call(map, id) ? map[id] : [];
  return (Array.isArray(list) ? list : []).filter(function (key, i, all) { return all.indexOf(key) === i && v37Lesson(key); });
}
function v37CardLessons(card) {
  if (!card) return [];
  if (card.kind === 'house') return v37Mapped('wineLessons', card.id);
  if (card.kind === 'component') return v37Mapped('componentLessons', card.id);
  if (card.kind === 'grape' && card.g) return v37Mapped('grapeLessons', card.g.g);
  return [];
}
function v37Go(id) {
  v32Go({ view: 'culinary', arg: v37Lesson(id) ? id : '' }, 'push');
}
function v37Sources(ids) {
  var sources = (v37Data().sources || []).filter(function (source) { return (!ids || ids.indexOf(source.id) >= 0) && /^https:\/\//.test(source.url || ''); });
  if (!sources.length) return null;
  var detail = v33Node('details', 'v37-sources'); detail.appendChild(v33Node('summary', '', 'Sources and further reading'));
  var list = v33Node('ul'); sources.forEach(function (source) {
    var row = v33Node('li'), link = v33Node('a', '', source.title);
    link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; row.appendChild(link); list.appendChild(row);
  }); detail.appendChild(list); return detail;
}
function v37Practice(practice) {
  if (!practice || !practice.question || !practice.answer) return null;
  var box = v33Node('section', 'v37-practice'); box.appendChild(v33Node('h3', '', 'Rehearse the hospitality'));
  box.appendChild(v33Node('p', '', practice.question));
  var answer = v33Node('details', 'v36-answer'); answer.appendChild(v33Node('summary', '', 'Reveal a practice response'));
  answer.appendChild(v33Node('p', '', practice.answer)); box.appendChild(answer);
  if (practice.practise) box.appendChild(v33Node('p', '', practice.practise));
  box.appendChild(v33Node('p', 'v37-small', 'Optional practice. No score or study mark is recorded.')); return box;
}
function v37Structure() {
  var section = v33Node('section', 'v37-structure'); section.appendChild(v33Node('h3', '', 'Separate the sensations'));
  section.appendChild(v33Node('p', '', 'Choose a sensation and compare what you can observe with what it cannot tell you.'));
  var grid = v33Node('div', 'v37-structure-grid');
  (v37Data().structure || []).forEach(function (item) {
    var detail = v33Node('details', 'v37-sensation'); detail.appendChild(v33Node('summary', '', item.label));
    detail.appendChild(v33Node('h4', '', 'Observe')); detail.appendChild(v33Node('p', '', item.observe));
    detail.appendChild(v33Node('h4', '', 'Keep distinct')); detail.appendChild(v33Node('p', '', item.distinguish)); grid.appendChild(detail);
  }); section.appendChild(grid); return section;
}
var V37_CONTROL_ID = 0;
function v37DishStudy(dish, adapt, modal) {
  var box = v33Node('article', 'v37-dish'); box.setAttribute('data-v37-dish', dish.id);
  box.appendChild(v33Node('h3', '', dish.title)); box.appendChild(v33Node('p', '', dish.description));
  var variables = v33Node('dl', 'v37-variables'); (dish.variables || []).forEach(function (item) {
    variables.appendChild(v33Node('dt', '', item.label)); variables.appendChild(v33Node('dd', '', item.detail));
  }); box.appendChild(variables);
  if (dish.art && dish.art.guideId) v33Append(box, [dish.art.guideId]);
  if (dish.boundary) box.appendChild(v33Node('p', 'v37-boundary', dish.boundary));
  var id = 'v37-choice-' + (++V37_CONTROL_ID), field = v33Node('fieldset', 'v37-options');
  field.appendChild(v33Node('legend', '', 'Compare two possible approaches'));
  box.appendChild(v33Node('p', 'v37-small', 'These are training options, not a single correct answer or a promise of current availability.'));
  var result = v33Node('div', 'v37-choice-result'); result.setAttribute('aria-live', 'polite'); result.setAttribute('aria-atomic', 'true');
  result.appendChild(v33Node('p', '', 'Choose an approach to read its benefit and trade-off.'));
  (dish.options || []).forEach(function (option, i) {
    var label = v33Node('label', 'v37-option'), radio = v33Node('input');
    radio.type = 'radio'; radio.name = id; radio.value = option.id; radio.id = id + '-' + i;
    label.appendChild(radio); label.appendChild(v33Node('span', '', option.label)); field.appendChild(label);
    radio.onchange = function () {
      if (!radio.checked) return;
      result.textContent = ''; result.appendChild(v33Node('h4', '', option.label));
      result.appendChild(v33Node('p', '', option.benefit));
      result.appendChild(v33Node('h4', '', 'Consider the trade-off')); result.appendChild(v33Node('p', '', option.tradeoff));
      var house = typeof v35House === 'function' ? v35House() : null;
      var wine = house && Array.isArray(house.wines) ? house.wines.find(function (item) { return item.id === option.wineId; }) : null;
      if (!modal && wine) result.appendChild(v36Button('Study ' + wine.name, function () {
        v32Go({ view: 'cellar', arg: wine.id }, 'push');
      }, 'v36-text-button'));
    };
  }); box.appendChild(field); box.appendChild(result);
  box.appendChild(v33Node('h4', '', 'Ask the guest')); box.appendChild(v33Node('p', '', dish.guestQuestion));
  if (adapt) {
    var label = v33Node('label', 'v37-rehearsal-label', 'Practise your recommendation'); label.htmlFor = id + '-rehearsal';
    var input = v33Node('textarea', 'sainput v37-rehearsal'); input.id = label.htmlFor; input.rows = 4; input.maxLength = 1200;
    input.placeholder = 'I would suggest... because... If you prefer... we could instead...';
    var note = v33Node('p', 'v37-small', 'Use the guest\'s stated preference, the actual dish and a checked bottle. This rehearsal stays only on this screen and is not saved.');
    note.id = id + '-note'; input.setAttribute('aria-describedby', note.id); box.appendChild(label); box.appendChild(input); box.appendChild(note);
  }
  var sources = v37Sources(dish.sources); if (sources) box.appendChild(sources); return box;
}
function v37Dishes(adapt, modal) {
  var section = v33Node('section', 'v37-dishes'), dishes = v37Data().dishes || [];
  if (!dishes.length) return section;
  var label = v33Node('label', 'v37-dish-label', 'Choose a dish comparison'), select = v33Node('select', 'sainput v37-dish-select');
  select.id = 'v37-dishes-' + (++V37_CONTROL_ID); label.htmlFor = select.id;
  dishes.forEach(function (dish) { var option = v33Node('option', '', dish.title); option.value = dish.id; select.appendChild(option); });
  var content = v33Node('div', 'v37-dish-content'), studies = Object.create(null);
  function draw() {
    var dish = dishes.find(function (item) { return item.id === select.value; }) || dishes[0];
    // Keep each comparison's unsaved rehearsal while this screen is open.
    // Leaving the screen still discards it; no browser storage is introduced.
    if (!studies[dish.id]) studies[dish.id] = v37DishStudy(dish, adapt, modal);
    content.replaceChildren(studies[dish.id]);
  }
  select.onchange = draw; section.appendChild(label); section.appendChild(select); section.appendChild(content); draw(); return section;
}
function v37LessonContent(lesson, modal) {
  var view = v33Node('div', 'v37-lesson'); view.setAttribute('data-v37-lesson', lesson.id);
  view.appendChild(v33Node('p', 'v37-lead', lesson.intro));
  (lesson.body || []).forEach(function (text) { view.appendChild(v33Node('p', '', text)); });
  v33Append(view, v36Ids(lesson.guideIds));
  if (lesson.id === 'describe') view.appendChild(v37Structure());
  if (lesson.id === 'sauce' || lesson.id === 'recommend') view.appendChild(v37Dishes(lesson.id === 'recommend', modal));
  var practice = v37Practice(lesson.practice); if (practice) view.appendChild(practice);
  var sources = v37Sources(lesson.sources); if (sources) view.appendChild(sources); return view;
}
function v37Open(id, opener) {
  var lesson = v37Lesson(id); if (!lesson || typeof HTMLDialogElement !== 'function') return;
  var dialog = v33Node('dialog', 'v37-viewer'), header = v33Node('div', 'v37-viewer-bar');
  var title = v33Node('h2', '', lesson.title); title.id = 'v37-dialog-title-' + (++V37_CONTROL_ID); dialog.setAttribute('aria-labelledby', title.id);
  var close = v36Button('Close practice', function () { dialog.close(); }, 'btn'); header.appendChild(title); header.appendChild(close); dialog.appendChild(header);
  dialog.appendChild(v37LessonContent(lesson, true));
  dialog.addEventListener('keydown', function (event) { event.stopPropagation(); }, true);
  dialog.addEventListener('keyup', function (event) { event.stopPropagation(); }, true);
  dialog.addEventListener('close', function () { dialog.remove(); if (opener && opener.isConnected) opener.focus(); });
  document.body.appendChild(dialog); dialog.showModal(); close.focus();
}
window.addEventListener('popstate', function () { var dialog = document.querySelector('.v37-viewer'); if (dialog && dialog.open) dialog.close(); });
function v37Doors(ids, modal) {
  var keys = (ids || []).filter(function (id, i, all) { return all.indexOf(id) === i && v37Lesson(id); }); if (!keys.length) return null;
  var box = v33Node('section', 'v37-doors'); box.appendChild(v33Node('p', '', 'Read the dish, describe the wine'));
  var buttons = v33Node('div'); keys.forEach(function (id) {
    var button = v36Button(v37Lesson(id).title, function () { if (modal) v37Open(id, button); else v37Go(id); }, 'btn ghost'); buttons.appendChild(button);
  }); box.appendChild(buttons); return box;
}
function v37CulinaryView() {
  var data = v37Data(), selected = v37Lesson(S._v37lesson), view = v33Node('div', 'v25page v37-culinary');
  var head = v33Node('div', 'viewhead'), title = v33Node('h2', 'v32-h', selected ? selected.title : data.title || 'Read the dish, describe the wine'); title.tabIndex = -1; head.appendChild(title);
  head.appendChild(v33Node('p', 'sub', data.subtitle || 'Observe. Compare. Listen. Recommend.')); view.appendChild(head);
  if (selected) {
    var nav = v33Node('nav', 'v37-steps'); nav.setAttribute('aria-label', 'Culinary lessons');
    nav.appendChild(v36Button('Collection overview', function () { v37Go(''); }, 'v36-text-button'));
    v37Lessons().forEach(function (lesson, i) {
      var button = v36Button((i + 1) + '. ' + lesson.title, function () { v37Go(lesson.id); }, 'v28-chip');
      if (lesson.id === selected.id) button.setAttribute('aria-current', 'step'); nav.appendChild(button);
    }); view.appendChild(nav); view.appendChild(v37LessonContent(selected, false));
    var index = v37Lessons().indexOf(selected), next = v37Lessons()[index + 1];
    if (next) view.appendChild(v36Button('Continue: ' + next.title, function () { v37Go(next.id); }, 'btn gold v37-continue'));
  } else {
    view.appendChild(v33Node('p', 'v37-lead', 'Start with a sensory observation, then practise a recommendation for a Brennan\'s dish. Check the current list and kitchen details before service.'));
    var grid = v33Node('div', 'v37-lessons'); v37Lessons().forEach(function (lesson, i) {
      var article = v33Node('article', 'v37-lesson-card'); article.appendChild(v33Node('p', 'v37-step-number', 'Study ' + (i + 1)));
      article.appendChild(v33Node('h3', '', lesson.title)); article.appendChild(v33Node('p', '', lesson.intro));
      article.appendChild(v36Button('Open ' + lesson.title, function () { v37Go(lesson.id); }, 'btn ghost')); grid.appendChild(article);
    }); view.appendChild(grid);
    var notes = v33Node('details', 'v37-boundaries'); notes.appendChild(v33Node('summary', '', 'About these training examples'));
    (data.boundaries || []).forEach(function (text) { notes.appendChild(v33Node('p', '', text)); }); view.appendChild(notes);
    view.appendChild(v36Button('Browse every illustrated study', function () { v32Go({ view: 'illustrations', arg: '' }, 'push'); }, 'v36-text-button'));
    var sources = v37Sources(); if (sources) view.appendChild(sources);
  } return view;
}
V25_VIEWS.culinary = v37CulinaryView; V32_PARENT.culinary = 'library'; V32_OWNER.culinary = 'library';
if (typeof V25_UNDER !== 'undefined') V25_UNDER.culinary = 'library';
var _v37Arg = v32Arg;
v32Arg = function (view) { return view === 'culinary' ? S._v37lesson || '' : _v37Arg.apply(this, arguments); };
var _v37Apply = v32Apply;
v32Apply = function (route, state) {
  if (route && route.view === 'culinary') { S._v37lesson = v37Lesson(route.arg) ? route.arg : ''; S.view = 'culinary'; S._v25area = 'library'; return { view: 'culinary', arg: S._v37lesson }; }
  return _v37Apply.apply(this, arguments);
};
(function () {
  if (typeof V32 === 'undefined' || V32.moved || typeof v32Parse !== 'function') return;
  if (typeof V32.initialHash !== 'string' || !/^#\/v\/culinary(?:\/|$)/.test(V32.initialHash)) return;
  var route = v32Parse(V32.initialHash); if (!route || route.view !== 'culinary') return;
  v32Apply(route, typeof v32CurState === 'function' ? v32CurState() : null); V32.pend = 'replace';
})();
var _v37Library = v32LibraryView;
v32LibraryView = function () {
  var view = _v37Library.apply(this, arguments), door = v33Node('section', 'v36-library-door v37-library-door');
  door.appendChild(v33Node('h3', '', v37Data().title || 'Read the dish, describe the wine'));
  door.appendChild(v33Node('p', '', 'Five short studies connect aroma, texture and the whole dish with a thoughtful guest recommendation.'));
  door.appendChild(v36Button('Explore the culinary companion', function () { v37Go(''); }, 'btn gold'));
  var anchor = view.querySelector('.codexfind'); (anchor ? anchor.parentNode : view).insertBefore(door, anchor); return view;
}; V25_VIEWS.library = v32LibraryView;
var _v37Illustrations = v36IllustrationsView;
v36IllustrationsView = function () {
  var view = _v37Illustrations.apply(this, arguments), door = v33Node('p', 'v37-index-door');
  door.appendChild(v36Button('Read the dish, describe the wine: five guided lessons', function () { v37Go(''); }, 'v36-text-button'));
  var head = view.querySelector('.viewhead'); view.insertBefore(door, head ? head.nextSibling : view.firstChild); return view;
}; V25_VIEWS.illustrations = v36IllustrationsView;
var _v37Primer = primerView;
primerView = function () {
  var view = _v37Primer.apply(this, arguments), primer = typeof PRIMERS !== 'undefined' ? PRIMERS.find(function (item) { return item.cat === S.primerKey; }) || PRIMERS[S.primerKey] : null;
  var door = primer && v37Doors(v37Mapped('primerLessons', primer.cat || primer.id), false); if (door) view.insertBefore(door, view.querySelector('.centerrow')); return view;
};
var _v37Grid = tasteGridView;
tasteGridView = function () {
  var view = _v37Grid.apply(this, arguments), door = v37Doors(['describe', 'fruit', 'aromas'], false);
  if (door) view.insertBefore(door, view.querySelector('.centerrow')); return view;
};
var _v37Cellar = cellarView;
cellarView = function () {
  var view = _v37Cellar.apply(this, arguments); if (S._v28edit || !view || !view.querySelector) return view;
  var card = view.querySelector('#v28-card'); if (!card) return view;
  var state = v28State(), row = v28Find(v28Rows(), state.open), door = row && row.item && v37Doors(v37Mapped('wineLessons', row.item.id), false);
  if (door) card.insertBefore(door, card.querySelector('.v28-foot')); return view;
};
var _v37CardFace = v32CardFace;
v32CardFace = function (card, run) {
  var html = _v37CardFace.apply(this, arguments); if (!run || !run.flip || typeof HTMLDialogElement !== 'function') return html;
  var ids = v37CardLessons(card); if (!ids.length) return html;
  return html + '<section class="v36-card-guides v37-card-guides" aria-label="Culinary practice"><p>Connect this answer with the table</p><div>' + ids.map(function (id) {
    return '<button type="button" class="btn ghost" data-v37-lesson="' + v32Esc(id) + '">' + v32Esc(v37Lesson(id).title) + '</button>';
  }).join('') + '</div></section>';
};
var _v37CardView = v32CardView;
v32CardView = function () {
  var view = _v37CardView.apply(this, arguments); Array.prototype.forEach.call(view.querySelectorAll('[data-v37-lesson]'), function (button) {
    button.onclick = function () {
      var run = S._v32run, card = typeof v32RunCard === 'function' ? v32RunCard() : null, id = button.getAttribute('data-v37-lesson');
      if (run && run.flip && v37CardLessons(card).indexOf(id) >= 0) v37Open(id, button);
    }; button.addEventListener('keydown', function (event) { event.stopPropagation(); });
  }); return view;
}; V25_VIEWS.housedeck = v32CardView; V25_VIEWS.flash = v32CardView;
