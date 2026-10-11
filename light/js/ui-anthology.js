/* The Dawn Anthology: Mind's searchable quotation shelf. Filters live only
   in this session; nothing is written to the reader's personal record. */
var dawnFilter = 'all', dawnQuery = '', dawnLimit = 12;

function dawnCaptureSearch() {
  var input = document.getElementById('dawn-search');
  if (input) dawnQuery = input.value.trim().slice(0, 180);
}

function dawnFiltered() {
  var query = dawnNorm(dawnQuery);
  return dawnLibrary().filter(function (q) {
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
      '<p class="note">The morning’s wisdom, stories from distant worlds, and voices from history. All our quotation shelves, gathered in one place.</p></div>';
    head += '<nav class="dawn-shelf-nav" aria-label="Anthology shelves"><a href="#/anthology"' + (!id ? ' aria-current="page"' : '') + '>Browse quotations</a><a href="#/anthology/writers"' + (id === 'writers' || (id && id.indexOf('writer-') === 0) ? ' aria-current="page"' : '') + '>The Lantern Stage</a><a href="#/anthology/cast"' + (id === 'cast' || (id && id.indexOf('person-') === 0) ? ' aria-current="page"' : '') + '>Meet the cast</a><a href="#/today">Back to Today</a></nav>';
    if (id === 'writers') return head + dawnWriterIndex();
    if (id && id.indexOf('writer-') === 0) return head + dawnWriterProfile(id.slice(7));
    if (id === 'cast') return head + dawnCastIndex();
    if (id && id.indexOf('person-') === 0) return head + dawnCastProfile(id.slice(7));
    if (id) {
      var q = dawnById(id);
      return head + '<p><a class="readmini" href="#/anthology">Back to all quotations</a></p>' +
        (q ? dawnCard(q, null, true) : '<p class="note" role="status">That quotation is not in this edition. Browse the anthology to find another.</p>');
    }
    var rows = dawnFiltered();
    var chip = function (c) {
      return '<button class="mchip' + (dawnFilter === c[0] ? ' on' : '') + '" data-act="dawnFilter" data-collection="' + c[0] + '" aria-pressed="' + (dawnFilter === c[0]) + '">' + esc(c[1]) + '</button>';
    };
    var original = function (c) { return c[0] === 'lift' || c[0].indexOf('year-') === 0; };
    var filters = '<div class="dawn-filter-shelves">' + chip(['all', 'All collections']) +
      '<fieldset class="dawn-filter-shelf"><legend>Source-checked selections</legend><div class="dawn-filters">' +
        DAWN_COLLECTIONS.filter(function (c) { return !original(c); }).map(chip).join('') + '</div></fieldset>' +
      '<fieldset class="dawn-filter-shelf"><legend>The original Year &amp; Lift</legend><div class="dawn-filters">' +
        DAWN_COLLECTIONS.filter(original).map(chip).join('') + '</div></fieldset></div>';
    var legacyCount = dawnLegacyQuotes().length;
    return head + '<p class="dawn-intro">' + DAWN_QUOTES.length + ' source-checked selections and ' + legacyCount.toLocaleString() + ' original Year and Lift entries. ' +
      'Choose a shelf or search them all. Original citations and notes remain distinct from the source-checked additions.</p>' +
      '<form id="dawn-search-form" class="dawn-search" role="search"><label for="dawn-search">Find a quote, person or work</label>' +
      '<div><input id="dawn-search" type="search" maxlength="180" value="' + esc(dawnQuery) + '" placeholder="Try courage, Picard or Mandela"><button class="btn" type="submit">Search</button></div></form>' +
      filters +
      '<div class="dawn-results"><p id="dawn-result-count" role="status">' + rows.length + ' quotation' + (rows.length === 1 ? '' : 's') +
      (rows.length > dawnLimit ? ' · showing ' + dawnLimit : '') + '</p>' +
      (dawnQuery || dawnFilter !== 'all' ? '<button class="keep" data-act="dawnClear">Clear search &amp; filters</button>' : '') +
      '<a href="#/today">Read Today’s three</a></div>' +
      '<div class="dawn-grid">' + rows.slice(0, dawnLimit).map(function (q) { return dawnCard(q); }).join('') + '</div>' +
      (!rows.length ? '<p class="note">No quotations match. Try a person’s surname, a shorter phrase, or another collection.</p>' : '') +
      (rows.length > dawnLimit ? '<button class="keep dawn-more" data-act="dawnMore">Show more quotations</button>' : '') +
      '<details class="dawn-policy"><summary>How to read these collections</summary><p>Source-checked selections include links to the original work or supporting evidence. Fictional dialogue is credited to its character and version; accounts retain their actual writer. Open Source &amp; context for editions, translations and limits of the evidence.</p>' +
      '<p>The original Year and Lift collections retain their existing wording, citations and provenance notes. They have not received a new source review here. Dates identify places in the reading year; the same words can appear in more than one shelf or edition.</p>' +
      '<p>Today keeps three quotations: your dated Year reading and two lines for a lift. The lift draws from The Lift and The Classics; Another offers a fresh pair for this session. The full library stays here. Browsing a different shelf does not change your Year track or your kept words.</p></details>';
  },
  after: function () {
    dawnCastAfter();
    dawnWriterAfter();
    var form = document.getElementById('dawn-search-form');
    if (!form) return;
    form.addEventListener('submit', function (event) {
      event.preventDefault(); dawnCaptureSearch(); dawnLimit = 12;
      render(); document.getElementById('dawn-search').focus();
      announce(dawnFiltered().length + ' quotations found.');
    });
  }
};
