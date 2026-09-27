/* Reflect visible views in the artwork, without changing navigation or records. */
(() => {
  const byId = id => document.getElementById(id);
  const almanac = byId('almanac');
  const charts = byId('charts-home');
  const pilgrimages = byId('pilgrimages');
  const updateView = () => {
    document.body.classList.toggle('house-atlas-home', almanac.style.display !== 'none' && charts.style.display !== 'none');
    const active = pilgrimages.style.display !== 'none' ? 'Pilgrimage trails' : charts.style.display !== 'none' ? 'The twelve charts' : 'Calendar pages';
    byId('skip-link').setAttribute('href', pilgrimages.style.display !== 'none' ? '#pilgrimages' : '#almanac');
    byId('house-home').title = active + '. Return to the twelve charts';
  };
  const viewObserver = new MutationObserver(updateView);
  [almanac, charts, pilgrimages].forEach(el => viewObserver.observe(el,{attributes:true,attributeFilter:['style','class']}));
  byId('house-home').addEventListener('click', () => {
    (pilgrimages.style.display !== 'none' ? byId('back-to-almanac') : byId('brand')).click();
  });
  byId('house-return').addEventListener('click', () => byId('back-to-almanac').click());
  const rail = byId('flag-rail');
  const updateRail = () => rail.querySelectorAll('button').forEach(button => {
    if (button.classList.contains('is-active')) button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  });
  new MutationObserver(updateRail).observe(rail,{subtree:true,attributes:true,attributeFilter:['class'],childList:true});
  const bookmark = byId('scroll-bookmark');
  const updateBookmark = () => {
    const saved = bookmark.getAttribute('aria-pressed') === 'true';
    bookmark.querySelector('.house-control-label').textContent = saved ? 'Saved' : 'Save';
    bookmark.setAttribute('aria-label', saved ? 'Remove saved voyage' : 'Save this voyage');
  };
  new MutationObserver(updateBookmark).observe(bookmark,{attributes:true,attributeFilter:['aria-pressed']});
  updateView(); updateRail(); updateBookmark();
})();
