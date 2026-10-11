/* First Light: the shared quotation shelf. Source-led additions and the
   original Year and Lift collections are read here without copying their
   stored data or changing the reader's track, vault or personal record. */
var DAWN_COLLECTIONS = [
  ['trek', 'Star Trek & its library'],
  ['star-wars', 'Star Wars'],
  ['middle-earth', 'Middle-earth'],
  ['thrones', 'Game of Thrones'],
  ['witcher', 'The Witcher'],
  ['history', 'Voices of history'],
  ['stage', 'Poets & playwrights'],
  ['wisdom', 'Philosophy & tradition'],
  ['wizarding', 'The wizarding world'],
  ['comics', 'Heroes & shadow worlds'],
  ['year-philosophers', 'The Philosophers'],
  ['year-makers', 'The Makers'],
  ['year-classics', 'The Classics'],
  ['lift', 'The Lift']
];

function dawnCollection(id) {
  var c = DAWN_COLLECTIONS.find(function (row) { return row[0] === id; });
  return c ? c[1] : id;
}
function dawnYearId(track, month, day) { return 'year-' + track + '-' + month + '-' + day; }
/* The original lift bank is append-only for these permalinks: its existing
   slots retain their numbers when future lines are added. */
function dawnLiftId(index) { return 'lift-' + String(index + 1).padStart(3, '0'); }

function dawnLegacyQuotes() {
  var rows = [];
  /* Resolve globals on demand, after the classic scripts have loaded.
     Browsing another track never selects it or writes to FL.prefs. */
  if (typeof FL_TRACKS !== 'undefined') FL_TRACKS.forEach(function (track) {
    if (!flTrackComplete(track)) return;
    var quotes = track.q(), months = track.months();
    for (var m = 1; m <= 12; m++) (quotes[m] || []).forEach(function (entry) {
      rows.push({
        id: dawnYearId(track.id, m, entry[0]),
        text: entry[1], speaker: entry[2], collection: 'year-' + track.id,
        work: track.label, locator: months[m - 1][0] + ' ' + entry[0],
        context: entry[4] || '', tag: entry[3] || '', legacy: 'year',
        /* This one original Year entry explicitly cites Dhammapada 204.
           Global search honours the faith-reading preference; the reader
           may still open this shelf deliberately. Do not infer faith from
           an author's name or religious language in a literary work. */
        faithSource: track.id === 'philosophers' && m === 11 && entry[0] === 20,
        track: track.id, month: m, day: entry[0]
      });
    });
  });
  if (typeof UPLIFT !== 'undefined') UPLIFT.forEach(function (entry, index) {
    rows.push({
      id: dawnLiftId(index), text: entry[0], speaker: entry[1],
      collection: 'lift', work: 'The Lift', locator: 'Original Lift collection',
      context: '', tag: entry[2] === 'film' ? 'Film' : 'Voice', legacy: 'lift',
      liftIndex: index
    });
  });
  return rows;
}
function dawnLibrary() {
  return (typeof DAWN_QUOTES === 'undefined' ? [] : DAWN_QUOTES).concat(dawnLegacyQuotes());
}
function dawnById(id) {
  var source = typeof DAWN_QUOTES === 'undefined' ? null : DAWN_QUOTES.find(function (q) { return q.id === id; });
  return source || dawnLegacyQuotes().find(function (q) { return q.id === id; });
}
function dawnNorm(text) {
  return String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
function dawnSearchText(q) {
  var people = q.legacy || typeof dawnPeopleFor !== 'function' ? [] : dawnPeopleFor(q.id);
  var writers = typeof dawnWritersFor === 'function' ? dawnWritersFor(q.id) : [];
  return [q.text, q.speaker, q.author || '', q.authorCredit || '', dawnCollection(q.collection), q.work, q.locator, q.context, q.gloss || '', q.studyPrompt || '', (q.themes || []).join(' '), q.tag || '', q.connection || '', people.concat(writers).map(function (p) { return p.name + ' ' + (p.aliases || []).join(' '); }).join(' ')].join(' ');
}

function dawnLegacyCard(q, expanded) {
  return '<article class="dawn-card dawn-legacy" data-quote-id="' + esc(q.id) + '">' +
    '<p class="dawn-kicker">' + esc(dawnCollection(q.collection)) + '</p>' +
    '<p class="dawn-evidence">' + (q.legacy === 'year' ? 'Original Year collection' : 'Original Lift collection') + '</p>' +
    '<blockquote><p>“' + esc(q.text) + '”</p></blockquote>' +
    '<p class="dawn-speaker">' + esc(q.speaker) + '</p>' +
    '<p class="dawn-work">' + (q.legacy === 'year' ? esc(q.locator) + (q.tag ? ' · ' : '') : '') + esc(q.tag) + '</p>' +
    '<details' + (expanded ? ' open' : '') + '><summary>Original citation &amp; notes<span class="sr-only"> for ' + esc(q.work) + '</span></summary>' +
      '<div class="dawn-provenance"><p class="dawn-locator">' + esc(q.work) + (q.legacy === 'year' ? ' · ' + esc(q.locator) : '') + '</p>' +
      (q.context ? '<p><strong>Provenance note.</strong> ' + esc(q.context) + '</p>' : '') +
      '<p>The wording and citation above are preserved from First Light’s existing ' + (q.legacy === 'year' ? 'Year' : 'Lift') + ' collection, including any attribution or translation qualifications. This entry has not received a new source review here.</p>' +
      (q.legacy === 'year' ? '<p>A date marks its place in the reading year. The same words may also appear in another collection or edition.</p>' : '') +
    '</div></details>' +
    '<a class="dawn-permalink" href="#/anthology/' + esc(q.id) + '">Open this quotation<span class="sr-only"> from ' + esc(q.work) + '</span></a></article>';
}

function dawnCard(q, number, expanded) {
  if (q.legacy) return dawnLegacyCard(q, expanded);
  var people = dawnPeopleFor(q.id);
  var writers = typeof dawnWritersFor === 'function' ? dawnWritersFor(q.id) : [];
  var kinds = {words: 'Words in the source', account: 'An account about the character', portrayal: 'A literary or screen portrayal', tradition: 'Words preserved in a faith tradition'};
  var evidence = q.kind ? '<p class="dawn-evidence">' + esc(kinds[q.kind] || q.kind) + '</p>' : '';
  var castLinks = people.length ? '<p class="dawn-cast-links">' + people.map(function (p) { return '<a href="#/anthology/person-' + esc(p.id) + '">' + (q.kind === 'account' ? 'About ' : 'Explore ') + esc(p.name) + '</a>'; }).join(' · ') + '</p>' : '';
  var writerLinks = writers.length ? '<p class="dawn-cast-links">' + writers.map(function (p) { return '<a href="#/anthology/writer-' + esc(p.id) + '">Explore ' + esc(p.name) + ' &amp; read the works</a>'; }).join(' · ') + '</p>' : '';
  var links = q.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + '<span class="sr-only"> (opens a new tab)</span></a></li>';
  }).join('');
  return '<article class="dawn-card" data-quote-id="' + esc(q.id) + '">' +
    '<p class="dawn-kicker">' + (number ? '<span>' + number + ' of 10</span> · ' : '') + esc(dawnCollection(q.collection)) + '</p>' +
    evidence + '<blockquote><p>“' + esc(q.text) + '”</p></blockquote>' +
    '<p class="dawn-speaker">' + esc(q.speaker) + '</p>' +
    (q.author && q.author !== q.speaker ? '<p class="dawn-author">' + esc(q.authorCredit || 'Written by ' + q.author) + '</p>' : '') +
    '<p class="dawn-work"><cite>' + esc(q.work) + '</cite>' + (q.year ? ' · ' + esc(q.year) : '') + '</p>' +
    '<details' + (expanded ? ' open' : '') + '><summary>Source &amp; context<span class="sr-only"> for ' + esc(q.speaker) + '</span></summary>' +
      '<div class="dawn-provenance"><p class="dawn-locator">' + esc(q.locator) + '</p>' +
      '<p>' + esc(q.context) + '</p>' +
      (q.translation ? '<p class="dawn-translation"><strong>Translation.</strong> ' + esc(q.translation) + '</p>' : '') +
      (q.originalText ? '<p class="dawn-original"><strong>Source wording' + (q.originalLanguage ? ' (' + esc(q.originalLanguage) + ')' : '') + '.</strong> ' + esc(q.originalText) + '</p>' : '') +
      (q.connection ? '<p><strong>The literary connection.</strong> ' + esc(q.connection) + '</p>' : '') +
      '<ul>' + links + '</ul><p class="dawn-checked">Sources checked ' + esc(q.verified) + '. External sources need a connection.</p></div></details>' +
    (q.studyPrompt ? '<details class="poet-reflection"><summary>Study this passage</summary><div class="dawn-provenance">' +
      (q.gloss ? '<p><strong>In plain English.</strong> ' + esc(q.gloss) + '</p><p class="note">An original reading aid, not a quotation or a substitute for the Middle English.</p>' : '') +
      '<p><strong>Consider.</strong> ' + esc(q.studyPrompt) + '</p>' +
      ((q.themes || []).length ? '<p class="note">Themes: ' + q.themes.map(esc).join(' · ') + '</p>' : '') + '</div></details>' : '') +
    (typeof poetStudyLink === 'function' ? poetStudyLink(q) : '') + castLinks + writerLinks + '<a class="dawn-permalink" href="#/anthology/' + esc(q.id) + '">Open this quotation<span class="sr-only"> by ' + esc(q.speaker) + '</span></a></article>';
}
