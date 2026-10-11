/* The cast is an index of sources, never a new personal record. */
var dawnCastQuery = '', dawnCastGroup = 'all';

function dawnPerson(id) { return DAWN_CAST.find(function (p) { return p.id === id; }); }
function dawnPeopleFor(id) { return DAWN_CAST.filter(function (p) { return p.quoteIds.indexOf(id) > -1; }); }
function dawnCastGroupName(id) {
  var group = DAWN_CAST_GROUPS.find(function (g) { return g.id === id; });
  return group ? group.title : 'The host';
}
function dawnCastMatches() {
  var query = dawnNorm(dawnCastQuery);
  return DAWN_CAST.filter(function (p) {
    return (dawnCastGroup === 'all' || p.group === dawnCastGroup) &&
      (!query || dawnNorm(p.name + ' ' + (p.aliases || []).join(' ') + ' ' + dawnCastGroupName(p.group)).indexOf(query) > -1);
  });
}
function dawnCastCapture() {
  var input = document.getElementById('dawn-cast-search');
  if (input) dawnCastQuery = input.value.trim().slice(0, 180);
}
FL_ACTS.dawnCastGroup = function (el) {
  var group = el.getAttribute('data-cast-group');
  if (group !== 'all' && group !== 'host' && !DAWN_CAST_GROUPS.some(function (g) { return g.id === group; })) return;
  dawnCastCapture(); dawnCastGroup = group; render();
  announce(dawnCastMatches().length + ' characters found.');
};
FL_ACTS.dawnCastClear = function () {
  dawnCastQuery = ''; dawnCastGroup = 'all'; render();
  document.getElementById('dawn-cast-search').focus();
};
function dawnCastIndex() {
  var people = dawnCastMatches();
  var filters = [{id: 'all', title: 'All evenings'}].concat(DAWN_CAST_GROUPS).map(function (g) {
    return '<button class="mchip' + (dawnCastGroup === g.id ? ' on' : '') + '" data-act="dawnCastGroup" data-cast-group="' + esc(g.id) + '" aria-pressed="' + (dawnCastGroup === g.id) + '">' + esc(g.title) + '</button>';
  }).join('');
  return '<div class="dawn-cast-opening"><p class="kick">Six evenings · A table beyond time</p><h2>Meet the cast</h2>' +
    '<p>Explore the voices at your table. Each guest has a shelf of citable passages, with the speaker, edition and setting kept close to the words.</p>' +
    '<p class="note">Accounts about a person and later portrayals are labelled beside the passage. They are never presented as that person’s own recorded words.</p></div>' +
    '<form id="dawn-cast-search-form" class="dawn-search" role="search"><label for="dawn-cast-search">Find a character</label><div><input id="dawn-cast-search" type="search" maxlength="180" value="' + esc(dawnCastQuery) + '" placeholder="Try Gandalf, Sacagawea or Tony Stark"><button class="btn" type="submit">Find</button></div></form>' +
    '<div class="dawn-filters" role="group" aria-label="Cast evenings">' + filters + '</div>' +
    '<div class="dawn-results"><p role="status">' + people.length + ' character' + (people.length === 1 ? '' : 's') + '</p>' +
    (dawnCastQuery || dawnCastGroup !== 'all' ? '<button class="keep" data-act="dawnCastClear">Clear character filters</button>' : '') + '</div>' +
    '<div class="dawn-cast-grid">' + people.map(function (p) {
      return '<a class="dawn-person" href="#/anthology/person-' + esc(p.id) + '"><span class="dawn-person-group">' + esc(dawnCastGroupName(p.group)) + '</span><strong>' + esc(p.name) + '</strong><span>' + (p.group === 'host' ? 'Awaiting original text' : p.quoteIds.length + ' selections') + '</span></a>';
    }).join('') + '</div>' + (!people.length ? '<p class="note">No characters match. Try a surname or clear the filters.</p>' : '');
}
function dawnCastProfile(id) {
  var person = dawnPerson(id);
  if (!person) return '<p class="note" role="status">That character is not in this edition.</p><p><a href="#/anthology/cast">Browse the cast</a></p>';
  var rows = person.quoteIds.map(dawnById).filter(Boolean);
  return '<p><a class="readmini" href="#/anthology/cast">Back to the cast</a></p>' +
    '<div class="dawn-cast-opening"><p class="kick">' + esc(dawnCastGroupName(person.group)) + '</p><h2>' + esc(person.name) + '</h2>' +
    (person.group === 'host' ? '<p>Lizzy is your original host. Her shelf awaits your original writing, so every future quotation can be credited to its real source.</p>' :
      '<p>' + rows.length + ' citable selections. Open Source &amp; context for the original work, location and evidence.</p>') +
    (person.note ? '<p class="note">' + esc(person.note) + '</p>' : '') + '</div>' +
    '<div class="dawn-grid">' + rows.map(function (q) { return dawnCard(q); }).join('') + '</div>';
}
function dawnCastAfter() {
  var form = document.getElementById('dawn-cast-search-form');
  if (!form) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault(); dawnCastCapture(); render();
    document.getElementById('dawn-cast-search').focus();
    announce(dawnCastMatches().length + ' characters found.');
  });
}
