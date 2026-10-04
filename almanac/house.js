/* Consistent wayfinding and presentation. The app keeps its own records and routes. */
(() => {
  const byId = id => document.getElementById(id);
  const almanac = byId('almanac');
  const charts = byId('charts-home');
  const pilgrimages = byId('pilgrimages');
  const wayfinder = document.createElement('section');
  wayfinder.className = 'house-wayfinder';
  wayfinder.innerHTML = '<nav aria-label="Calendar sections"><button type="button" data-calendar-view="months">Months</button><button type="button" data-calendar-view="today">Today</button><button type="button" data-calendar-view="saved">Saved voyages</button><button type="button" data-calendar-view="trails">Trails</button></nav><p>Browse a month, discover today\u2019s gatherings, or follow a trail. Save any entry to add your journal and food, drink or wine notes.</p>';
  document.querySelector('.house-masthead').after(wayfinder);
  wayfinder.querySelectorAll('button').forEach(button => button.addEventListener('click', () => window.calendarNavigate(button.dataset.calendarView)));
  document.body.classList.add('house-flow-ready');
  const updateView = () => {
    document.body.classList.toggle('house-atlas-home', almanac.style.display !== 'none' && charts.style.display !== 'none');
    const active = pilgrimages.style.display !== 'none' ? 'Pilgrimage trails' : charts.style.display !== 'none' ? 'The twelve charts' : 'Calendar pages';
    byId('skip-link').setAttribute('href', pilgrimages.style.display !== 'none' ? '#pilgrimages' : '#almanac');
    byId('house-home').title = active + '. Return to the twelve charts';
    const current = pilgrimages.style.display !== 'none' ? 'trails' : byId('goto-myvoyages').classList.contains('is-active') ? 'saved' : byId('goto-today').classList.contains('is-active') ? 'today' : 'months';
    wayfinder.querySelectorAll('button').forEach(button => {
      if (button.dataset.calendarView === current) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    window.dispatchEvent(new Event('calendar:viewchange'));
  };
  const viewObserver = new MutationObserver(updateView);
  [almanac, charts, pilgrimages, byId('results-view'), byId('pilgrim-home'), byId('pilgrim-results-view')].forEach(el => viewObserver.observe(el,{attributes:true,attributeFilter:['style','class']}));
  byId('house-home').addEventListener('click', () => {
    (pilgrimages.style.display !== 'none' ? byId('back-to-almanac') : byId('brand')).click();
  });
  byId('house-return').addEventListener('click', () => byId('back-to-almanac').click());
  const rail = byId('flag-rail');
  const updateRail = () => { rail.querySelectorAll('button').forEach(button => {
    if (button.classList.contains('is-active')) button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  }); updateView(); };
  new MutationObserver(updateRail).observe(rail,{subtree:true,attributes:true,attributeFilter:['class'],childList:true});
  const bookmark = byId('scroll-bookmark');
  const updateBookmark = () => {
    const saved = bookmark.getAttribute('aria-pressed') === 'true';
    bookmark.querySelector('.house-control-label').textContent = saved ? 'Saved' : 'Save';
    bookmark.setAttribute('aria-label', saved ? 'Remove saved voyage' : 'Save this voyage');
  };
  new MutationObserver(updateBookmark).observe(bookmark,{attributes:true,attributeFilter:['aria-pressed']});
  ['search-input','pilgrim-search'].forEach(id => {
    const input = byId(id);
    input.type = 'search';
    input.autocomplete = 'off';
    const clear = document.createElement('button');
    clear.type = 'button'; clear.className = 'house-search-clear'; clear.textContent = 'Clear';
    clear.setAttribute('aria-label', id === 'search-input' ? 'Clear calendar search' : 'Clear trail search');
    input.after(clear);
    const sync = () => { clear.hidden = !input.value; };
    input.addEventListener('input', sync);
    clear.addEventListener('click', () => { input.value = ''; input.dispatchEvent(new Event('input', {bubbles:true})); input.focus(); sync(); });
    window.addEventListener('calendar:viewchange', sync);
    sync();
  });
  // Removing a bookmark from its open page must update the shelf it came from.
  let scrollWasOpen = byId('scroll-overlay').classList.contains('is-open');
  new MutationObserver(() => {
    const open = byId('scroll-overlay').classList.contains('is-open');
    if (scrollWasOpen && !open && byId('goto-myvoyages').classList.contains('is-active')) window.calendarRefreshSaved();
    scrollWasOpen = open;
  }).observe(byId('scroll-overlay'), {attributes:true,attributeFilter:['class']});
  updateView(); updateRail(); updateBookmark();
})();
