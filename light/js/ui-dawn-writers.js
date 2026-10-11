/* The Lantern Stage is a reading shelf, not a personal record. */
var dawnWriterQuery = '';

function dawnWriter(id) { return DAWN_WRITERS.find(function (p) { return p.id === id; }); }
function dawnWritersFor(id) {
  return typeof DAWN_WRITERS === 'undefined' ? [] : DAWN_WRITERS.filter(function (p) { return p.quoteIds.indexOf(id) > -1; });
}
function dawnWriterMatches() {
  var query = dawnNorm(dawnWriterQuery);
  return DAWN_WRITERS.filter(function (p) {
    var quotedWorks = p.quoteIds.map(dawnById).filter(Boolean).map(function (q) { return q.work; });
    return !query || dawnNorm([p.name, (p.aliases || []).join(' '), p.works.map(function (w) { return w.title; }).concat(quotedWorks).join(' ')].join(' ')).indexOf(query) > -1;
  });
}
function dawnWriterCapture() {
  var input = document.getElementById('dawn-writer-search');
  if (input) dawnWriterQuery = input.value.trim().slice(0, 180);
}
FL_ACTS.dawnWriterClear = function () {
  dawnWriterQuery = ''; render(); document.getElementById('dawn-writer-search').focus();
};
function dawnWriterIndex() {
  var writers = dawnWriterMatches();
  return '<div class="dawn-cast-opening"><p class="kick">Poets &amp; playwrights · Twelve voices</p><h2>The Lantern Stage</h2>' +
    '<p>Step into worlds of wit, wonder and human possibility. Follow a line to its writer, its dramatic setting, and the work that gave it life.</p>' +
    '<p class="note">Each writer has ten selections and links for further reading. Characters speak in their own voices; translation and edition notes stay beside the words.</p></div>' +
    '<form id="dawn-writer-search-form" class="dawn-search" role="search"><label for="dawn-writer-search">Find a writer or work</label><div><input id="dawn-writer-search" type="search" maxlength="180" value="' + esc(dawnWriterQuery) + '" placeholder="Try Shakespeare, Chekhov or Fences"><button class="btn" type="submit">Find</button></div></form>' +
    '<div class="dawn-results"><p role="status">' + writers.length + ' writer' + (writers.length === 1 ? '' : 's') + '</p>' +
    (dawnWriterQuery ? '<button class="keep" data-act="dawnWriterClear">Clear writer search</button>' : '') + '</div>' +
    '<div class="dawn-cast-grid">' + writers.map(function (p) {
      return '<a class="dawn-person" href="#/anthology/writer-' + esc(p.id) + '"><span class="dawn-person-group">The Lantern Stage</span><strong>' + esc(p.name) + '</strong><span>' + p.quoteIds.length + ' selections · ' + p.works.length + ' reading links</span></a>';
    }).join('') + '</div>' + (!writers.length ? '<p class="note">No writers match. Try a surname, a work’s title, or clear the search.</p>' : '');
}
function dawnWriterWorks(person) {
  return '<section class="dawn-reading-shelf" aria-labelledby="dawn-reading-title"><h3 id="dawn-reading-title">Read beyond the lines</h3>' +
    '<p class="note">Complete texts and excerpts are labelled below. These links open external editions and need an internet connection; they are not saved with the app.</p>' +
    '<div class="dawn-reading-grid">' + person.works.map(function (w) {
      var safeUrl = /^https:\/\/[^\s]+$/.test(w.url) ? w.url : '';
      return '<article class="dawn-reading-card"><p class="dawn-access">' + esc(w.access) + '</p><h4>' +
        (safeUrl ? '<a href="' + esc(safeUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(w.title) + '<span class="sr-only"> (opens a new tab)</span></a>' : esc(w.title)) +
        '</h4><p>' + esc(w.edition) + '</p>' + (w.note ? '<p class="note">' + esc(w.note) + '</p>' : '') + '</article>';
    }).join('') + '</div></section>';
}
function dawnWriterProfile(id) {
  var person = dawnWriter(id);
  if (!person) return '<p class="note" role="status">That writer is not on this shelf.</p><p><a href="#/anthology/writers">Browse The Lantern Stage</a></p>';
  var rows = person.quoteIds.map(dawnById).filter(Boolean);
  return '<p><a class="readmini" href="#/anthology/writers">Back to The Lantern Stage</a></p>' +
    '<div class="dawn-cast-opening"><p class="kick">The Lantern Stage</p><h2>' + esc(person.name) + '</h2><p>' + esc(person.intro) + '</p>' +
    '<p class="note">' + rows.length + ' selections. Open Source &amp; context for the speaker, location, edition and evidence.</p></div>' +
    dawnWriterWorks(person) + '<h3 class="dawn-selections-title">Ten lines to carry with you</h3><div class="dawn-grid">' + rows.map(function (q) { return dawnCard(q); }).join('') + '</div>';
}
function dawnWriterAfter() {
  var form = document.getElementById('dawn-writer-search-form');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault(); dawnWriterCapture(); render();
    document.getElementById('dawn-writer-search').focus();
    announce(dawnWriterMatches().length + ' writers found.');
  });
}
