/* The Wine Atlas has its own place beside Practise. Reuse the complete
   atlas and its existing addresses, readings, maps and study records. */
(function () {
  var at = -1;
  V25_NAV.forEach(function (word, i) { if (word[0] === 'practise') at = i; });
  V25_NAV.splice(at + 1, 0, ['worldmap', 'Wine Atlas']);
  ['worldmap', 'regions', 'country', 'region', 'fieldatlas', 'fieldmap'].forEach(function (view) {
    V32_OWNER[view] = 'worldmap';
    V25_UNDER[view] = 'worldmap';
    V25_HUB[view] = 'worldmap';
  });
  V25_AREA.worldmap = 'worldmap';
  V32_PARENT.worldmap = 'home';
  V32_PARENT.regions = 'worldmap';
})();

/* Keep the house-name escaping and the Practise due pill from layer 41. */
var _v47NavHtml = v25NavHtml;
v25NavHtml = function () {
  return _v47NavHtml.apply(this, arguments).replace('class="appnav v32nav"', 'class="appnav v32nav v47nav"');
};
var _v47Nav = v25Nav;
v25Nav = function (word) {
  if (word !== 'worldmap') return _v47Nav.apply(this, arguments);
  if (S.view === 'worldmap' && !S.wmap) {
    try { window.scrollTo(0, 0); } catch (e) { }
    return;
  }
  if (typeof v25Leave === 'function' && !v25Leave()) return;
  S._v32scopeOpen = false;
  v32Go({ view: 'worldmap', arg: '' }, 'push');
};

/* The country and region reading index now belongs to the Atlas.
   Country, region and field-map parents retain their existing hierarchy. */
var _v47Parent = v32ParentRoute;
v32ParentRoute = function () {
  if (S.view === 'regions') return { view: 'worldmap', arg: '' };
  return _v47Parent.apply(this, arguments);
};

/* Put all reading paths beside the existing regional field-map door. */
var _v47GridView = v23GridView;
v23GridView = function () {
  var view = _v47GridView.apply(this, arguments);
  var actions = view.querySelector('.v45-door .v45-actions');
  if (actions) {
    var readings = document.createElement('button');
    readings.type = 'button'; readings.className = 'btn ghost';
    readings.setAttribute('data-v47', 'readings');
    readings.textContent = 'Country and region readings';
    readings.onclick = function () { v39Open('regions', '', 'push'); };
    actions.appendChild(readings);
    var workshop = document.createElement('button');
    workshop.type = 'button'; workshop.className = 'btn ghost';
    workshop.setAttribute('data-v47', 'workshop');
    workshop.textContent = 'The Wine Workshop';
    workshop.onclick = function () { v46Go(''); };
    actions.appendChild(workshop);
  }
  return view;
};
