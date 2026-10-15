/* A reading companion within Chaucer's study. No saved progress or personal data. */
var canterburyQuery = '';
function canterburyUrl(part) { return '#/poets/chaucer/canterbury' + (part ? '/' + part : ''); }
function canterburyEntries() { return CANTERBURY_GUIDE.frames.concat(CANTERBURY_GUIDE.tales); }
function canterburyRoute(bits) {
  bits = bits || [];
  var mode = bits[0] || 'begin', entry = null;
  if (mode === 'tale') entry = canterburyEntries().find(function (item) { return item.id === bits[1]; });
  if (mode === 'lesson') entry = CANTERBURY_GUIDE.lessons.find(function (item) { return item.id === bits[1]; });
  return { mode: mode, entry: entry, valid: mode === 'tale' || mode === 'lesson' ? bits.length === 2 && !!entry : bits.length <= 1 && ['begin', 'tales', 'lessons', 'words'].indexOf(mode) > -1 };
}
function canterburyParagraphs(rows) { return (rows || []).map(function (s) { return '<p>' + esc(s) + '</p>'; }).join(''); }
function canterburyList(rows) { return '<ul>' + (rows || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>'; }
function canterburyExternal(url, label) {
  if (!/^https:\/\/[^\s]+$/.test(url || '')) return esc(label);
  return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + '<span class="sr-only"> (opens a new tab)</span></a>';
}
function canterburyRelated(ids) {
  var person = poetById('chaucer');
  var works = (ids || []).map(function (id) { return person.works.find(function (w) { return w.id === id; }); }).filter(Boolean);
  return works.length ? '<aside class="canterbury-related"><h4>Return to the passages</h4><ul>' + works.map(function (w) { return '<li><a href="#/poets/chaucer/work/' + esc(w.id) + '">' + esc(w.title.replace('The Canterbury Tales: ', '')) + ': original words &amp; plain English</a></li>'; }).join('') + '</ul></aside>' : '';
}
function canterburyInvitation(workId) {
  var match = workId && canterburyEntries().find(function (item) { return (item.relatedWorkIds || []).indexOf(workId) > -1; });
  if (workId && !match) return '';
  return '<aside class="poet-study-invitation"><p class="kick">The Canterbury Tales · A companion for the road</p><p>' +
    (match ? 'Place these words in the wider story, then return to the original with a clearer picture.' : 'Meet the pilgrims, understand all 24 tales, and read selected passages beside simple current English.') +
    '</p><a class="btn" href="' + canterburyUrl(match ? 'tale/' + match.id : '') + '">' + (match ? 'Understand ' + esc(match.title) : 'Begin the Canterbury journey') + '</a></aside>';
}
function canterburyNav(mode) {
  var active = mode === 'tale' ? 'tales' : mode === 'lesson' ? 'lessons' : mode;
  return '<nav class="canterbury-nav" aria-label="Canterbury reading companion">' + [['begin', 'Begin the journey'], ['tales', 'The 24 tales'], ['lessons', 'Read side by side'], ['words', 'Words & sources']].map(function (tab) {
    return '<a href="' + canterburyUrl(tab[0] === 'begin' ? '' : tab[0]) + '"' + (active === tab[0] ? ' aria-current="page"' : '') + '>' + esc(tab[1]) + '</a>';
  }).join('') + '</nav>';
}
function canterburyBegin() {
  return '<section class="canterbury-opening"><p class="kick">A companion for the road</p><h3>The Canterbury Tales, in clearer English</h3><p>' + esc(CANTERBURY_GUIDE.intro) + '</p>' +
    '<p class="note">A guide to the whole collection, with modern-English readings of selected passages. Plot summaries include endings. The translations and explanations are original study aids; Chaucer’s source text remains beside them.</p>' +
    '<div class="canterbury-actions"><a class="btn" href="' + canterburyUrl('lesson/' + CANTERBURY_GUIDE.lessons[0].id) + '">Start with the spring opening</a><a href="' + canterburyUrl('tales') + '">Explore the 24 tales</a></div></section>' +
    '<section class="canterbury-essentials"><h3>Find your bearings</h3>' + CANTERBURY_GUIDE.essentials.map(function (item, i) {
      return '<details' + (i === 0 ? ' open' : '') + '><summary>' + esc(item.title) + '</summary><div>' + canterburyParagraphs(item.body) +
        (item.sourceUrls || []).map(function (url, n) { return '<p class="note">' + canterburyExternal(url, 'Read the supporting source' + (item.sourceUrls.length > 1 ? ' ' + (n + 1) : '')) + '</p>'; }).join('') + '</div></details>';
    }).join('') + '</section><section><h3>A gentle route through the book</h3><ol class="poet-path">' + CANTERBURY_GUIDE.path.map(function (step) {
      var target = step.lessonId ? 'lesson/' + step.lessonId : step.taleId ? 'tale/' + step.taleId : 'tales';
      return '<li><h4>' + esc(step.title) + '</h4><p>' + esc(step.note) + '</p><a href="' + canterburyUrl(target) + '">Open this step</a></li>';
    }).join('') + '</ol></section>';
}
function canterburyTaleCard(item, frame) {
  return '<article class="canterbury-tale-card"><p class="kick">' + esc(frame ? 'The frame of the journey' : item.genre) + '</p><h4><a href="' + canterburyUrl('tale/' + item.id) + '">' + esc(item.title) + '</a></h4><p class="note">' + esc(item.teller) + ' · ' + esc(item.status) + '</p><p>' + esc(item.summary[0]) + '</p></article>';
}
function canterburyMatches() {
  var query = dawnNorm(canterburyQuery);
  return CANTERBURY_GUIDE.tales.filter(function (item) { return !query || dawnNorm([item.title, item.teller, item.genre, item.status, item.summary.join(' '), item.meaning.join(' '), item.connection, item.caution || ''].join(' ')).indexOf(query) > -1; });
}
function canterburyTales() {
  var rows = canterburyMatches();
  return '<h3>The 24 tales</h3><p>' + esc(CANTERBURY_GUIDE.orderNote) + '</p><p class="note">Begin with the General Prologue to meet the company. The Retraction closes the book after the Parson. These two framing pieces sit outside the count of 24 tales.</p>' +
    '<div class="canterbury-grid">' + CANTERBURY_GUIDE.frames.map(function (item) { return canterburyTaleCard(item, true); }).join('') + '</div>' +
    '<form id="canterbury-search" class="poet-search" role="search"><label for="canterbury-query">Find a tale, pilgrim or idea</label><div class="poet-search-line"><input id="canterbury-query" type="search" maxlength="180" placeholder="Try generosity, marriage or the Miller" value="' + esc(canterburyQuery) + '"><button class="btn" type="submit">Find tales</button></div></form>' +
    '<div class="dawn-results"><p id="canterbury-result-count" role="status">' + rows.length + ' of 24 tales</p>' + (canterburyQuery ? '<button class="keep" data-act="canterburyClear">Clear search</button>' : '') + '</div>' +
    (rows.length ? '<div class="canterbury-grid">' + rows.map(function (item) { return canterburyTaleCard(item, false); }).join('') + '</div>' : '<p class="note">No tales match that search. Try a shorter phrase, a pilgrim’s name, or clear the search.</p>');
}
function canterburyStepLinks(items, entry, kind) {
  var index = items.findIndex(function (item) { return item.id === entry.id; });
  var previous = items[index - 1], next = items[index + 1];
  return '<nav class="canterbury-next" aria-label="Continue reading">' + (previous ? '<a href="' + canterburyUrl(kind + '/' + previous.id) + '">Previous: ' + esc(previous.title) + '</a>' : '<span></span>') +
    (next ? '<a href="' + canterburyUrl(kind + '/' + next.id) + '">Next: ' + esc(next.title) + '</a>' : '<a href="' + canterburyUrl(kind === 'tale' ? 'tales' : 'lessons') + '">Return to all ' + (kind === 'tale' ? 'tales' : 'lessons') + '</a>') + '</nav>';
}
function canterburyTale(item) {
  var readingOrder = [CANTERBURY_GUIDE.frames[0]].concat(CANTERBURY_GUIDE.tales, CANTERBURY_GUIDE.frames.slice(1));
  return '<article class="canterbury-reading"><p><a href="' + canterburyUrl('tales') + '">All tales &amp; framing pieces</a></p><p class="kick">' + esc(item.genre) + '</p><h3>' + esc(item.title) + '</h3><p class="note">' + esc(item.teller) + ' · ' + esc(item.status) + '</p>' +
    '<section><h4>What happens, in plain English</h4>' + canterburyParagraphs(item.summary) + '</section><section><h4>What to make of it</h4>' + canterburyList(item.meaning) + '</section>' +
    '<section><h4>The storyteller and the company</h4><p>' + esc(item.connection) + '</p></section>' + (item.caution ? '<aside class="canterbury-context"><h4>Read with care</h4><p>' + esc(item.caution) + '</p></aside>' : '') +
    '<section><h4>Notice as you read</h4>' + canterburyList(item.notice) + '</section>' + canterburyRelated(item.relatedWorkIds) +
    '<footer class="canterbury-source"><p>' + canterburyExternal(item.sourceUrl, 'Read the original free text') + '</p><p class="note">' + esc(item.locator) + ' · ' + esc(CANTERBURY_GUIDE.edition) + '</p><p class="note">The summary describes the plot; the interpretation offers ways to read it, not a single settled moral. External editions need a connection.</p></footer></article>' + canterburyStepLinks(readingOrder, item, 'tale');
}
function canterburyLessons() {
  return '<h3>Read side by side</h3><p>Six short lessons bridge the Middle English and the story behind it. Read the original aloud, try the current-English version, then return to a word that has become clearer.</p><p class="note">' + esc(CANTERBURY_GUIDE.translationNote) + '</p><div class="canterbury-grid">' + CANTERBURY_GUIDE.lessons.map(function (item, i) {
    return '<article class="canterbury-tale-card"><p class="kick">Reading lesson ' + (i + 1) + '</p><h4><a href="' + canterburyUrl('lesson/' + item.id) + '">' + esc(item.title) + '</a></h4><p>' + esc(item.why) + '</p><p class="note">' + esc(item.locator) + '</p></article>';
  }).join('') + '</div>';
}
function canterburyLesson(item) {
  return '<article class="canterbury-reading canterbury-lesson"><p><a href="' + canterburyUrl('lessons') + '">All reading lessons</a></p><p class="kick">Read, understand, return</p><h3>' + esc(item.title) + '</h3><p>' + esc(item.why) + '</p><p class="note">' + esc(item.locator.replace(/[.]+$/, '')) + '. Each current-English version below is an original learning translation, not Chaucer’s wording. Brackets or explanations belong to the reading aid.</p>' +
    item.chunks.map(function (chunk, i) {
      return '<section class="canterbury-passage"><h4>' + esc(chunk.locator || 'Passage ' + (i + 1)) + '</h4><div class="canterbury-parallel"><div><p class="kick">Chaucer’s Middle English</p><blockquote lang="enm">' + esc(chunk.original) + '</blockquote></div><div><p class="kick">In current English</p><p class="canterbury-modern">' + esc(chunk.modern) + '</p></div></div>' +
        (chunk.wordNotes && chunk.wordNotes.length ? '<dl class="canterbury-word-notes">' + chunk.wordNotes.map(function (word) { return '<div><dt>' + esc(word.word) + '</dt><dd>' + esc(word.meaning) + '</dd></div>'; }).join('') + '</dl>' : '') + '</section>';
    }).join('') + '<section><h4>Understanding the passage</h4>' + canterburyParagraphs(item.understanding) + '</section><section><h4>Try your own reading</h4>' + canterburyList(item.questions) + '<p><a href="#/journal">Take a thought to your journal</a></p></section>' + canterburyRelated(item.relatedWorkIds) +
    '<footer class="canterbury-source"><p>' + canterburyExternal(item.sourceUrl, 'Read the passage in the free original') + '</p><p class="note">' + esc(CANTERBURY_GUIDE.edition) + '</p></footer></article>' + canterburyStepLinks(CANTERBURY_GUIDE.lessons, item, 'lesson');
}
function canterburyWords() {
  return '<section class="canterbury-reading"><h3>Words that open the door</h3><p>Use context before choosing a meaning. Middle English words can have several senses; the notes here explain common uses and terms in this companion.</p><dl class="canterbury-glossary">' + CANTERBURY_GUIDE.glossary.map(function (item) {
    return '<div><dt>' + esc(item.word) + '</dt><dd><strong>' + esc(item.meaning) + '</strong><p>' + esc(item.note) + '</p></dd></div>';
  }).join('') + '</dl><h3>Free texts &amp; sources</h3><p>' + esc(CANTERBURY_GUIDE.edition) + '</p><p>Line and group references follow this edition. Other editions may arrange the tales or number the fragments differently. The original excerpts retain the source’s spelling; the simple translations, summaries and questions are newly written for this study.</p><ul class="canterbury-sources">' + CANTERBURY_GUIDE.sources.map(function (s) {
    return '<li>' + canterburyExternal(s.url, s.title) + '<p class="note">' + esc(s.note) + '</p></li>';
  }).join('') + '</ul><p class="note">This companion and its selected passages are available offline after the app has loaded. Linked editions and outside teaching resources need an internet connection.</p></section>';
}
function canterburyRender(bits) {
  var route = canterburyRoute(bits);
  if (!route.valid) return '<p>That reading page could not be found. <a href="' + canterburyUrl() + '">Begin the Canterbury journey</a>.</p>';
  return '<div class="canterbury-companion">' + canterburyNav(route.mode) + (route.mode === 'tale' ? canterburyTale(route.entry) : route.mode === 'lesson' ? canterburyLesson(route.entry) : route.mode === 'tales' ? canterburyTales() : route.mode === 'lessons' ? canterburyLessons() : route.mode === 'words' ? canterburyWords() : canterburyBegin()) + '</div>';
}
function canterburyAfter() {
  var form = document.getElementById('canterbury-search'); if (!form) return;
  form.addEventListener('submit', function (event) { event.preventDefault(); canterburyQuery = document.getElementById('canterbury-query').value.trim().slice(0, 180); render(); document.getElementById('canterbury-query').focus(); announce(document.getElementById('canterbury-result-count').textContent); });
}
FL_ACTS.canterburyClear = function () { canterburyQuery = ''; render(); var input = document.getElementById('canterbury-query'); if (input) input.focus(); announce('All 24 tales shown.'); };
