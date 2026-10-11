/* The Dawn Anthology: Mind's searchable quotation shelf. Filters live only
   in this session; nothing is written to the reader's personal record. */
var dawnFilter = 'all', dawnQuery = '', dawnLimit = 12;

function dawnCaptureSearch() {
  var input = document.getElementById('dawn-search');
  if (input) dawnQuery = input.value.trim().slice(0, 180);
}

function dawnFiltered() {
  var query = dawnNorm(dawnQuery);
  return DAWN_QUOTES.filter(function (q) {
    return (dawnFilter === 'all' || q.collection === dawnFilter) && (!query || dawnNorm(dawnSearchText(q)).indexOf(query) > -1);
  });
}
FL_ACTS.dawnFilter = function (el) {
  var choice = el.getAttribute('data-collection');
  if (choice !== 'all' && !DAWN_COLLECTIONS.some(function (c) { return c[0] === choice; })) return;
  dawnCaptureSearch();
  dawnFilter = choice; dawnLimit = 12; render();
  announce(dawnFiltered().length + ' quotations.');
};
FL_ACTS.dawnMore = function () {
  var previousQuery = dawnQuery;
  dawnCaptureSearch();
  if (previousQuery !== dawnQuery) {
    dawnLimit = 12; render(); document.getElementById('dawn-search').focus();
    announce(dawnFiltered().length + ' quotations found.'); return;
  }
  var firstNew = dawnFiltered()[dawnLimit];
  dawnLimit += 12; render();
  if (firstNew) {
    var card = document.querySelector('[data-quote-id="' + firstNew.id + '"]');
    if (card) { card.setAttribute('tabindex', '-1'); card.focus({ preventScroll: true }); }
  }
  announce('More quotations shown.');
};
FL_ACTS.dawnClear = function () {
  dawnQuery = ''; dawnFilter = 'all'; dawnLimit = 12; render();
  document.getElementById('dawn-search').focus();
};

FL_VIEWS.anthology = {
  label: 'The Dawn Anthology', title: 'The Dawn Anthology',
  render: function (id) {
    var head = '<div class="dawn-opening"><p class="kick">Mind · Words to travel by</p><h1>The Dawn Anthology</h1>' +
      '<p class="note">Stories, distant worlds and voices from history. Read the words, meet their source, and carry one thought into the day.</p></div>';
    head += '<nav class="dawn-shelf-nav" aria-label="Anthology shelves"><a href="#/anthology"' + (!id ? ' aria-current="page"' : '') + '>Browse quotations</a><a href="#/anthology/cast"' + (id === 'cast' || (id && id.indexOf('person-') === 0) ? ' aria-current="page"' : '') + '>Meet the cast</a><a href="#/today">Today’s ten</a></nav>';
    if (id === 'cast') return head + dawnCastIndex();
    if (id && id.indexOf('person-') === 0) return head + dawnCastProfile(id.slice(7));
    if (id) {
      var q = dawnById(id);
      return head + '<p><a class="readmini" href="#/anthology">Back to the anthology</a> <a class="readmini" href="#/today">Today’s ten</a></p>' +
        (q ? dawnCard(q, null, true) : '<p class="note" role="status">That quotation is not in this edition. Browse the anthology to find another.</p>');
    }
    var rows = dawnFiltered();
    var filters = [['all', 'All collections']].concat(DAWN_COLLECTIONS).map(function (c) {
      return '<button class="mchip' + (dawnFilter === c[0] ? ' on' : '') + '" data-act="dawnFilter" data-collection="' + c[0] + '" aria-pressed="' + (dawnFilter === c[0]) + '">' + esc(c[1]) + '</button>';
    }).join('');
    return head + '<p class="dawn-intro">' + DAWN_QUOTES.length + ' citable selections. Fictional dialogue is credited to its character and version; accounts retain their actual writer. Open the source notes for editions, translations and limits of the evidence.</p>' +
      '<form id="dawn-search-form" class="dawn-search" role="search"><label for="dawn-search">Find a quote, person or work</label>' +
      '<div><input id="dawn-search" type="search" maxlength="180" value="' + esc(dawnQuery) + '" placeholder="Try courage, Picard or Mandela"><button class="btn" type="submit">Search</button></div></form>' +
      '<div class="dawn-filters" role="group" aria-label="Quotation collections">' + filters + '</div>' +
      '<div class="dawn-results"><p id="dawn-result-count" role="status">' + rows.length + ' quotation' + (rows.length === 1 ? '' : 's') +
      (rows.length > dawnLimit ? ' · showing ' + dawnLimit : '') + '</p>' +
      (dawnQuery || dawnFilter !== 'all' ? '<button class="keep" data-act="dawnClear">Clear search &amp; filters</button>' : '') +
      '<a href="#/today">Read Today’s ten</a></div>' +
      '<div class="dawn-grid">' + rows.slice(0, dawnLimit).map(function (q) { return dawnCard(q); }).join('') + '</div>' +
      (!rows.length ? '<p class="note">No quotations match. Try a person’s surname, a shorter phrase, or another collection.</p>' : '') +
      (rows.length > dawnLimit ? '<button class="keep dawn-more" data-act="dawnMore">Show more quotations</button>' : '') +
      '<details class="dawn-policy"><summary>How to read this collection</summary><p>Open Source &amp; context to check the original work, its location and the evidence. Book and screen versions are distinguished, translations are named where known, and literary references are identified as dialogue, adaptations or title allusions.</p><p>Today pairs your Year reading with nine selections from this anthology. They stay the same through your chosen day boundary. Your Year reading follows your chosen track; the new source panels belong to this collection.</p></details>';
  },
  after: function () {
    dawnCastAfter();
    var form = document.getElementById('dawn-search-form');
    if (!form) return;
    form.addEventListener('submit', function (event) {
      event.preventDefault(); dawnCaptureSearch(); dawnLimit = 12;
      render(); document.getElementById('dawn-search').focus();
      announce(dawnFiltered().length + ' quotations found.');
    });
  }
};
