/* First Light: a source-led anthology. No reader record is changed here.
   The daily selection follows the same shifted local day as Today. */
var DAWN_COLLECTIONS = [
  ['trek', 'Star Trek & its library'],
  ['star-wars', 'Star Wars'],
  ['middle-earth', 'Middle-earth'],
  ['thrones', 'Game of Thrones'],
  ['witcher', 'The Witcher'],
  ['history', 'Voices of history'],
  ['wisdom', 'Philosophy & tradition'],
  ['wizarding', 'The wizarding world'],
  ['comics', 'Heroes & shadow worlds']
];

function dawnCollection(id) {
  var c = DAWN_COLLECTIONS.find(function (row) { return row[0] === id; });
  return c ? c[1] : id;
}
function dawnById(id) { return DAWN_QUOTES.find(function (q) { return q.id === id; }); }
function dawnNorm(text) {
  return String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
function dawnSearchText(q) {
  return [q.text, q.speaker, dawnCollection(q.collection), q.work, q.locator, q.context, q.connection || '', dawnPeopleFor(q.id).map(function (p) { return p.name + ' ' + (p.aliases || []).join(' '); }).join(' ')].join(' ');
}
function dawnDaily(dayKey, excludeText) {
  /* UTC is used only to count whole calendar dates, after flToday has selected
     the local shift date. This avoids DST-length days changing the rotation. */
  var p = dayKey.split('-').map(Number);
  var day = Math.floor(Date.UTC(p[0], p[1] - 1, p[2]) / 86400000);
  var selected = [], seen = {};
  seen[dawnNorm(excludeText)] = true;
  var buckets = DAWN_COLLECTIONS.map(function (c) {
    return DAWN_QUOTES.filter(function (q) { return q.collection === c[0] && q.daily !== false; });
  });
  var largest = Math.max.apply(null, buckets.map(function (b) { return b.length; }));
  for (var round = 0; round < largest && selected.length < 9; round++) {
    for (var i = 0; i < buckets.length && selected.length < 9; i++) {
      var pool = buckets[(day + i) % buckets.length];
      if (!pool.length) continue;
      var q = pool[(day + round) % pool.length], key = dawnNorm(q.text);
      if (!seen[key]) { seen[key] = true; selected.push(q); }
    }
  }
  return selected;
}

function dawnCard(q, number, expanded) {
  var people = dawnPeopleFor(q.id);
  var kinds = {words: 'Words in the source', account: 'An account about the character', portrayal: 'A literary or screen portrayal', tradition: 'Words preserved in a faith tradition'};
  var evidence = q.kind ? '<p class="dawn-evidence">' + esc(kinds[q.kind] || q.kind) + '</p>' : '';
  var castLinks = people.length ? '<p class="dawn-cast-links">' + people.map(function (p) { return '<a href="#/anthology/person-' + esc(p.id) + '">' + (q.kind === 'account' ? 'About ' : 'Explore ') + esc(p.name) + '</a>'; }).join(' · ') + '</p>' : '';
  var links = q.sources.map(function (s) {
    return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + '<span class="sr-only"> (opens a new tab)</span></a></li>';
  }).join('');
  return '<article class="dawn-card" data-quote-id="' + esc(q.id) + '">' +
    '<p class="dawn-kicker">' + (number ? '<span>' + number + ' of 10</span> · ' : '') + esc(dawnCollection(q.collection)) + '</p>' +
    evidence + '<blockquote><p>“' + esc(q.text) + '”</p></blockquote>' +
    '<p class="dawn-speaker">' + esc(q.speaker) + '</p>' +
    '<p class="dawn-work"><cite>' + esc(q.work) + '</cite>' + (q.year ? ' · ' + esc(q.year) : '') + '</p>' +
    '<details' + (expanded ? ' open' : '') + '><summary>Source &amp; context<span class="sr-only"> for ' + esc(q.speaker) + '</span></summary>' +
      '<div class="dawn-provenance"><p class="dawn-locator">' + esc(q.locator) + '</p>' +
      '<p>' + esc(q.context) + '</p>' +
      (q.translation ? '<p class="dawn-translation"><strong>Translation.</strong> ' + esc(q.translation) + '</p>' : '') +
      (q.originalText ? '<p class="dawn-original"><strong>Source wording' + (q.originalLanguage ? ' (' + esc(q.originalLanguage) + ')' : '') + '.</strong> ' + esc(q.originalText) + '</p>' : '') +
      (q.connection ? '<p><strong>The literary connection.</strong> ' + esc(q.connection) + '</p>' : '') +
      '<ul>' + links + '</ul><p class="dawn-checked">Sources checked ' + esc(q.verified) + '. External sources need a connection.</p></div></details>' +
    castLinks + '<a class="dawn-permalink" href="#/anthology/' + esc(q.id) + '">Open this quotation<span class="sr-only"> by ' + esc(q.speaker) + '</span></a></article>';
}
