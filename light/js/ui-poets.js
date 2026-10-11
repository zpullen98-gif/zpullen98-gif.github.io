/* Two literary studies. Filters are session-only; browsing writes no record. */
var POET_THEMES = ['attention', 'courage', 'power', 'love', 'time', 'truth', 'hospitality', 'imagination', 'language', 'justice', 'identity', 'grief'];
var poetFilters = {};
function poetById(id) { return DAWN_POETS.find(function (p) { return p.id === id; }); }
function poetState(id) {
  if (!poetById(id)) return null;
  if (!poetFilters[id]) poetFilters[id] = { query: '', theme: 'all', limit: 12 };
  return poetFilters[id];
}
function poetRoute(arg) {
  var bits = String(arg || '').split('/'), person = poetById(bits[0]);
  var mode = bits[1] || 'passages';
  var work = person && mode === 'work' ? person.works.find(function (w) { return w.id === bits[2]; }) : null;
  var valid = person && (mode === 'work' ? bits.length === 3 && work : bits.length <= 2 && ['passages', 'works', 'path'].indexOf(mode) > -1);
  return { person: person, mode: mode, work: work, valid: !!valid };
}
function poetRows(person, work) {
  var state = poetState(person.id), query = dawnNorm(state.query);
  return person.quoteIds.map(dawnById).filter(Boolean).filter(function (q) {
    return (!work || q.studyWorkId === work.id) &&
      (state.theme === 'all' || q.themes.indexOf(state.theme) > -1) &&
      (!query || dawnNorm(dawnSearchText(q)).indexOf(query) > -1);
  });
}
function poetTitle(text) { return text.charAt(0).toUpperCase() + text.slice(1); }
function poetTextLink(work, label) {
  if (!/^https:\/\/[^\s]+$/.test(work.url)) return esc(label);
  return '<a href="' + esc(work.url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + '<span class="sr-only"> of ' + esc(work.title) + ' (opens a new tab)</span></a>';
}
function poetStudyLink(q) {
  if (!q.studyWorkId || typeof DAWN_POETS === 'undefined') return '';
  var p = DAWN_POETS.find(function (person) { return person.quoteIds.indexOf(q.id) > -1; });
  return p ? '<p class="dawn-cast-links"><a href="#/poets/' + esc(p.id) + '/work/' + esc(q.studyWorkId) + '">Study this work in The Poets’ Study</a></p>' : '';
}
function poetHeader(person) {
  return '<div class="dawn-opening"><p class="kick">Mind · A lantern for the page</p><h1>The Poets’ Study</h1>' +
    '<p class="note">Two writers, many worlds. Read closely, hear the voice, and follow a question back to the work.</p></div>' +
    '<nav class="dawn-shelf-nav poet-authors" aria-label="Choose a poet"><a href="#/poets"' + (!person ? ' aria-current="page"' : '') + '>Begin here</a>' +
    DAWN_POETS.map(function (p) { return '<a href="#/poets/' + esc(p.id) + '"' + (person && person.id === p.id ? ' aria-current="page"' : '') + '>' + esc(p.name) + '</a>'; }).join('') +
    '<a href="#/anthology">The Dawn Anthology</a></nav>';
}
function poetWelcome() {
  return poetHeader(null) + '<div class="poet-door-grid">' + DAWN_POETS.map(function (p) {
    return '<article class="poet-door"><p class="kick">' + esc(p.subtitle) + '</p><h2>' + esc(p.name) + '</h2><p>' + esc(p.intro) + '</p>' +
      '<p class="note">100 fresh passages · ' + p.works.length + ' works and sections</p><a class="btn" href="#/poets/' + esc(p.id) + '">Enter ' + esc(p.shortName) + '’s study</a></article>';
  }).join('') + '</div><section class="poet-method"><h2>A practice of close reading</h2><ol>' +
    '<li><strong>Hear it.</strong> Read a passage aloud. Notice the beat, a repeated sound, or a word that changes the mood.</li>' +
    '<li><strong>Place it.</strong> Open Source &amp; context. Identify who speaks, to whom, and what the speaker hopes to achieve.</li>' +
    '<li><strong>Question it.</strong> Try the study prompt. Support your interpretation with a particular word or image.</li>' +
    '<li><strong>Return to the work.</strong> Read the surrounding scene or lines in the free edition. Let the larger passage challenge your first impression.</li></ol>' +
    '<p class="note">These 200 additions also live in The Dawn Anthology. Your earlier selections remain available there. Study prompts and plain-English reading aids are original commentary; the source quotations keep their own wording.</p></section>';
}
function poetNav(person, mode) {
  return '<nav class="dawn-shelf-nav poet-sections" aria-label="' + esc(person.shortName) + ' study sections">' +
    [['passages', 'Study passages'], ['works', 'Works & free editions'], ['path', 'A reading path']].map(function (tab) {
      return '<a href="#/poets/' + esc(person.id) + (tab[0] === 'passages' ? '' : '/' + tab[0]) + '"' + (mode === tab[0] || mode === 'work' && tab[0] === 'passages' ? ' aria-current="page"' : '') + '>' + esc(tab[1]) + '</a>';
    }).join('') + '</nav>';
}
function poetWorkIntro(person, work) {
  return '<section class="poet-work-intro"><p class="kick">' + esc(work.genre) + '</p><h3>' + esc(work.title) + '</h3><p>' + esc(work.orientation) + '</p>' +
    '<p>' + poetTextLink(work, 'Read the free text') + '</p><p class="note">' + esc(work.edition) + '. ' + esc(work.note) + '</p></section>';
}
function poetWorks(person) {
  return '<h3 class="poet-section-title">Works &amp; free editions</h3><p class="note">Each link opens the full work or its section within a complete volume. External editions need an internet connection. The study passages and their notes remain available offline.</p>' +
    '<div class="poet-work-grid">' + person.works.map(function (w) {
      var count = person.quoteIds.map(dawnById).filter(function (q) { return q && q.studyWorkId === w.id; }).length;
      return '<article class="poet-work-card"><p class="kick">' + esc(w.genre) + ' · ' + count + ' passages</p><h4>' + esc(w.title) + '</h4><p>' + esc(w.orientation) + '</p>' +
        '<p class="poet-work-actions"><a href="#/poets/' + esc(person.id) + '/work/' + esc(w.id) + '">Study this work</a>' + poetTextLink(w, 'Free full text') + '</p>' +
        '<details><summary>Edition &amp; questions</summary><p>' + esc(w.edition) + '</p><p>' + esc(w.note) + '</p><ul>' + w.questions.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></details></article>';
    }).join('') + '</div>';
}
function poetPath(person) {
  return '<h3 class="poet-section-title">A reading path</h3><p>' + esc(person.pathIntro) + '</p><ol class="poet-path">' + person.path.map(function (step) {
    var work = person.works.find(function (w) { return w.id === step.workId; });
    return '<li><h4>' + esc(step.title) + '</h4><p>' + esc(step.note) + '</p><a href="#/poets/' + esc(person.id) + '/work/' + esc(work.id) + '">Explore ' + esc(work.title) + '</a></li>';
  }).join('') + '</ol><section class="poet-method"><h3>Carry a question into the day</h3><p>After reading, write three sentences: what the speaker wants, which detail unsettles your first interpretation, and one question you would ask at the table. Return to that question after reading the full scene or tale.</p>' +
    '<p><a href="#/journal">Open your journal</a></p><p class="note">This suggested order is a reading invitation. Browsing here does not mark a task complete or change your saved reading plans.</p></section>';
}
function poetPassages(person, work) {
  var state = poetState(person.id), rows = poetRows(person, work);
  var options = function (value, title, selected) { return '<option value="' + esc(value) + '"' + (selected ? ' selected' : '') + '>' + esc(title) + '</option>'; };
  return (work ? poetWorkIntro(person, work) : '<p>' + esc(person.readingNote) + '</p>') +
    '<form id="poet-search-form" class="poet-search" role="search" data-poet="' + esc(person.id) + '"><label for="poet-query">Find words, speakers or ideas</label>' +
    '<div class="poet-search-line"><input id="poet-query" type="search" maxlength="180" value="' + esc(state.query) + '" placeholder="Try hospitality, courage or a character"><button class="btn" type="submit">Search</button></div>' +
    '<div class="poet-selects"><label for="poet-work">Work<select id="poet-work">' + options('all', 'All works', !work) + person.works.map(function (w) { return options(w.id, w.title, work && work.id === w.id); }).join('') + '</select></label>' +
    '<label for="poet-theme">Theme<select id="poet-theme">' + options('all', 'All themes', state.theme === 'all') + POET_THEMES.map(function (t) { return options(t, poetTitle(t), state.theme === t); }).join('') + '</select></label></div></form>' +
    '<div class="dawn-results"><p id="poet-result-count" role="status">' + rows.length + ' passage' + (rows.length === 1 ? '' : 's') + (rows.length > state.limit ? ' · showing ' + state.limit : '') + '</p>' +
    (state.query || state.theme !== 'all' ? '<button class="keep" data-act="poetClear" data-poet="' + esc(person.id) + '">Clear search &amp; theme</button>' : '') +
    (work ? '<a href="#/poets/' + esc(person.id) + '">All works</a>' : '') + '</div><div class="dawn-grid">' + rows.slice(0, state.limit).map(function (q) { return dawnCard(q); }).join('') + '</div>' +
    (!rows.length ? '<p class="note">No passages match these choices. Try a shorter phrase, another theme, or all works.</p>' : '') +
    (rows.length > state.limit ? '<button class="keep dawn-more" data-act="poetMore" data-poet="' + esc(person.id) + '">Show more passages</button>' : '') +
    '<p class="note poet-earlier">The earlier ten selections are in <a href="#/anthology/writer-' + esc(person.writerId) + '">' + esc(person.shortName) + '’s Lantern Stage shelf</a>.</p>';
}
function poetRender(arg) {
  if (!arg) return poetWelcome();
  var route = poetRoute(arg), person = route.person;
  if (!route.valid) return poetHeader(person) + '<p class="note" role="status">That study page could not be found.</p><p><a href="#/poets">Return to The Poets’ Study</a></p>';
  return poetHeader(person) + '<div class="poet-author-opening"><p class="kick">' + esc(person.subtitle) + '</p><h2>' + esc(person.name) + '</h2><p>' + esc(person.intro) + '</p><p class="note">100 fresh passages · ' + person.works.length + ' works and sections · Sources, context and questions beside every passage</p></div>' +
    poetNav(person, route.mode) + (route.mode === 'works' ? poetWorks(person) : route.mode === 'path' ? poetPath(person) : poetPassages(person, route.work));
}
function poetCapture(id) {
  var state = poetState(id), input = document.getElementById('poet-query'), theme = document.getElementById('poet-theme');
  if (!state || !input || !theme) return;
  state.query = input.value.trim().slice(0, 180);
  state.theme = POET_THEMES.indexOf(theme.value) > -1 ? theme.value : 'all';
}
FL_ACTS.poetClear = function (el) {
  var state = poetState(el.getAttribute('data-poet')); if (!state) return;
  state.query = ''; state.theme = 'all'; state.limit = 12; render();
  document.getElementById('poet-query').focus(); announce('Search and theme cleared.');
};
FL_ACTS.poetMore = function (el) {
  var id = el.getAttribute('data-poet'), state = poetState(id); if (!state) return;
  var previous = state.query + '|' + state.theme;
  poetCapture(id);
  if (previous !== state.query + '|' + state.theme) { state.limit = 12; render(); document.getElementById('poet-query').focus(); announce('Updated search results.'); return; }
  var route = poetRoute(flRoute.arg), firstNew = poetRows(route.person, route.work)[state.limit];
  state.limit += 12; render();
  if (firstNew) { var card = document.querySelector('[data-quote-id="' + firstNew.id + '"]'); if (card) { card.setAttribute('tabindex', '-1'); card.focus({ preventScroll: true }); } }
  announce('More passages shown.');
};
FL_VIEWS.poets = { label: 'The Poets’ Study', title: 'The Poets’ Study', render: poetRender, after: function () {
  var form = document.getElementById('poet-search-form'); if (!form) return;
  var id = form.getAttribute('data-poet'), state = poetState(id);
  form.addEventListener('submit', function (event) { event.preventDefault(); poetCapture(id); state.limit = 12; render(); document.getElementById('poet-query').focus(); announce(document.getElementById('poet-result-count').textContent); });
  document.getElementById('poet-theme').addEventListener('change', function () { poetCapture(id); state.limit = 12; render(); document.getElementById('poet-theme').focus(); announce(document.getElementById('poet-result-count').textContent); });
  document.getElementById('poet-work').addEventListener('change', function () {
    var work = this.value, person = poetById(id); poetCapture(id); state.limit = 12;
    if (work !== 'all' && !person.works.some(function (w) { return w.id === work; })) return;
    location.hash = '#/poets/' + id + (work === 'all' ? '' : '/work/' + work);
  });
} };
