/* Codex XLV: regional field maps.
   Geographic artwork, reading and recall share the existing region identities.
   This layer owns no learning marks. Optional artwork uses a separate cache. */
var V45 = { query: '', country: '', type: '', shown: 24, stored: {}, cached: {}, hasFiles: false, checked: false, busy: false, stop: false, message: '', viewer: null };

function v45Maps() { return typeof FIELD_ATLAS !== 'undefined' && Array.isArray(FIELD_ATLAS.maps) ? FIELD_ATLAS.maps : []; }
function v45Map(id) { return v45Maps().filter(function (m) { return m.id === id; })[0] || null; }
function v45CountryMaps(key) { return v45Maps().filter(function (m) { return m.type === 'country' && m.countryKey === key; }); }
function v45Esc(value) { return v32Esc(value == null ? '' : String(value)); }
function v45List(value) { return Array.isArray(value) ? value : []; }
function v45Fold(value) { return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
function v45CountryName(key) {
  var c = typeof v39CountryOf === 'function' && v39CountryOf(key);
  if (c && c.name) return c.name;
  var m = v45Map('country-' + key);
  return m ? m.title : String(key || '').replace(/-/g, ' ').replace(/\b[a-z]/g, function (x) { return x.toUpperCase(); });
}
function v45File(m) {
  if (!m || !/^maps\/regions-v1\/[a-z0-9-]+\.svg$/.test(m.file || '')) return '';
  return m.file + (m.sha256 ? '?v=' + String(m.sha256).slice(0, 12) : '');
}
function v45Https(value) { return /^https:\/\//i.test(String(value || '')) ? String(value) : ''; }
function v45Button(label, action, arg, gold) {
  return '<button type="button" class="btn ' + (gold ? 'gold' : 'ghost') + '" data-v45="' + action + '"'
    + (arg ? ' data-v45-arg="' + v45Esc(arg) + '"' : '') + '>' + v45Esc(label) + '</button>';
}
function v45Link(label, url) {
  return '<a href="' + v45Esc(url) + '" target="_blank" rel="noopener noreferrer">' + v45Esc(label)
    + '<span class="sr-only"> (opens in a new tab)</span></a>';
}
function v45Go(id) { v32Go({ view: id ? 'fieldmap' : 'fieldatlas', arg: id || '' }, 'push'); }

/* Register before rereading a cold address. The generic router then encodes
   and decodes the id in exactly the same way as its other one-argument views. */
V32_PARENT.fieldatlas = 'worldmap'; V32_PARENT.fieldmap = 'fieldatlas';
V32_OWNER.fieldatlas = 'library'; V32_OWNER.fieldmap = 'library';
V25_UNDER.fieldatlas = 'library'; V25_UNDER.fieldmap = 'library';
V25_HUB.fieldatlas = 'library'; V25_HUB.fieldmap = 'library';
V25_GO.fieldatlas = function (arg) { v45Go(arg || ''); };
var _v45Arg = v32Arg;
v32Arg = function (view) { return view === 'fieldmap' ? S._v45map || '' : _v45Arg.apply(this, arguments); };
var _v45Apply = v32Apply;
v32Apply = function (route, state) {
  if (route && (route.view === 'fieldatlas' || route.view === 'fieldmap')) {
    var id = String(route.arg || ''), found = route.view === 'fieldmap' && v45Map(id);
    S.view = found ? 'fieldmap' : 'fieldatlas'; S._v45map = found ? id : '';
    S._v25area = 'library'; S._v28edit = false;
    return { view: S.view, arg: S._v45map };
  }
  return _v45Apply.apply(this, arguments);
};
var _v45Parent = v32ParentRoute;
v32ParentRoute = function () {
  if (S.view === 'fieldmap') return { view: 'fieldatlas' };
  if (S.view === 'fieldatlas') return { view: 'worldmap', arg: '' };
  return _v45Parent.apply(this, arguments);
};
var _v45MainName = v25MainName;
v25MainName = function () {
  if (S.view === 'fieldatlas') return 'The Regional Field Atlas';
  if (S.view === 'fieldmap') { var m = v45Map(S._v45map); return m ? m.title + ': field map' : 'The Regional Field Atlas'; }
  return _v45MainName.apply(this, arguments);
};

/* The index limits the first paint and search results to small collections.
   Searching never changes a deck, a question identity or a stored answer. */
function v45SearchText(m) {
  var grapes = m.notes && m.notes.grapes ? m.notes.grapes : m.grapes;
  return v45Fold([m.title, v45CountryName(m.countryKey), m.summary, Array.isArray(grapes) ? grapes.join(' ') : grapes]
    .concat(v45List(m.places).map(function (p) { return p.name; })).join(' '));
}
function v45Filtered() {
  var tokens = v45Fold(V45.query).trim().split(/\s+/).filter(Boolean);
  return v45Maps().filter(function (m) {
    return (!V45.country || m.countryKey === V45.country) && (!V45.type || m.type === V45.type)
      && tokens.every(function (word) { return v45SearchText(m).indexOf(word) >= 0; });
  });
}
function v45Card(m) {
  return '<article class="v45-card"><button type="button" class="v45-card-open" data-v45="map" data-v45-arg="' + v45Esc(m.id) + '">'
    + '<span class="v45-thumb"><img src="' + v45Esc(v45File(m)) + '" alt="" loading="lazy" decoding="async" data-v45-image>'
    + '<span class="v45-image-fail" hidden>Map image unavailable. Open the reading guide.</span></span>'
    + '<span class="v45-card-copy"><span class="v45-eyebrow">' + v45Esc(m.type === 'country' ? 'Country orientation' : v45CountryName(m.countryKey)) + '</span>'
    + '<span class="v45-card-title">' + v45Esc(m.title) + '</span><span class="v45-card-line">'
    + v45Esc(m.type === 'country' ? 'Explore the main study locations' : 'Locate the region, then connect land and wine') + '</span>'
    + '<span class="v45-card-saved" data-v45-saved="' + v45Esc(m.id) + '">Not saved for offline use</span></span></button></article>';
}
function v45Results(view) {
  var result = view.querySelector('#v45-results'), count = view.querySelector('#v45-count'), more = view.querySelector('#v45-more'), reset = view.querySelector('#v45-reset');
  if (!result) return;
  var maps = v45Filtered(), shown = maps.slice(0, V45.shown);
  result.innerHTML = shown.length ? shown.map(v45Card).join('') : '<p class="v45-empty">No maps match. Try a country, grape or place name, or clear the filters.</p>';
  count.textContent = maps.length + ' of ' + v45Maps().length + ' maps' + (maps.length > shown.length ? '. Showing the first ' + shown.length + '.' : '.');
  more.hidden = maps.length <= shown.length; more.textContent = 'Show the next ' + Math.min(24, maps.length - shown.length) + ' maps';
  reset.hidden = !V45.query && !V45.country && !V45.type;
  v45Images(result); v45RefreshStorage();
}
function v45IndexView() {
  var maps = v45Maps(), countries = {};
  maps.forEach(function (m) { countries[m.countryKey] = v45CountryName(m.countryKey); });
  var keys = Object.keys(countries).sort(function (a, b) { return countries[a].localeCompare(countries[b]); });
  var html = '<div class="v25page v45 v45-index">' + v32Head('The Regional Field Atlas', 'Explore a place. Understand the wine. Bring it to the table.')
    + '<section class="v45-intro"><p class="v45-eyebrow">The explorer’s reading room</p><p>Follow the rivers, find the study locations and connect the landscape to grapes, growing and cellar decisions. Open the existing regional reading and recall cards when you are ready to go deeper.</p>'
    + '<p class="v45-small">These are orientation maps. Their dots locate representative places; they do not draw appellation boundaries or vineyard parcels.</p>'
    + '<div class="v45-actions">' + v45Button('Begin with Champagne', 'map', 'champagne', true) + v45Button('Explore Tuscany', 'map', 'tuscany') + v45Button('Country overview maps', 'overview') + '</div></section>'
    + '<section class="v45-filters" aria-label="Find a field map"><div class="v45-search"><label for="v45-find">Find a place or grape</label><input class="sainput" id="v45-find" type="search" maxlength="160" autocomplete="off" placeholder="Champagne, Tuscany, Riesling…" value="' + v45Esc(V45.query) + '"></div>'
    + '<div><label for="v45-country">Country or atlas group</label><select class="sainput" id="v45-country"><option value="">Every country and group</option>'
    + keys.map(function (key) { return '<option value="' + v45Esc(key) + '"' + (key === V45.country ? ' selected' : '') + '>' + v45Esc(countries[key]) + '</option>'; }).join('') + '</select></div>'
    + '<div><label for="v45-type">Map collection</label><select class="sainput" id="v45-type"><option value="">Every field map</option><option value="region"' + (V45.type === 'region' ? ' selected' : '') + '>Regional maps</option><option value="country"' + (V45.type === 'country' ? ' selected' : '') + '>Additional country maps</option></select></div>'
    + '<div class="v45-filter-status"><p id="v45-count" role="status" aria-live="polite"></p><button type="button" class="btn ghost" id="v45-reset">Clear filters</button></div></section>'
    + '<div class="v45-grid" id="v45-results"></div><button type="button" class="btn ghost v45-more" id="v45-more">Show more maps</button>'
    + v45StorageHtml(null) + '<p class="v45-small v45-companion">For companion reading, '
    + v45Link('The Wine Bible, third edition', 'https://www.hachettebookgroup.com/titles/karen-macneil/the-wine-bible-3rd-edition/9781523510092/')
    + ' gives broader context. Use the official regional authorities linked with each map for current rules. These maps and teaching summaries are original work, not reproductions of the book.</p></div>';
  var view = v32Build(html);
  function filter() {
    V45.query = view.querySelector('#v45-find').value; V45.country = view.querySelector('#v45-country').value;
    V45.type = view.querySelector('#v45-type').value; V45.shown = 24; v45Results(view);
  }
  view.querySelector('#v45-find').addEventListener('input', filter);
  view.querySelector('#v45-country').addEventListener('change', filter);
  view.querySelector('#v45-type').addEventListener('change', filter);
  view.querySelector('#v45-reset').addEventListener('click', function () {
    view.querySelector('#v45-find').value = ''; view.querySelector('#v45-country').value = ''; view.querySelector('#v45-type').value = '';
    filter(); view.querySelector('#v45-find').focus();
  });
  view.querySelector('#v45-more').addEventListener('click', function () {
    var old = V45.shown; V45.shown += 24; v45Results(view);
    var cards = view.querySelectorAll('.v45-card-open'); if (cards[old]) cards[old].focus();
  });
  v45Results(view); v45CheckStorage(); return view;
}

function v45ReadingActions(m) {
  var rec = m.type === 'region' && typeof v39Find === 'function' ? v39Find(m.slug || m.id) : typeof v39CountryOf === 'function' ? v39CountryOf(m.countryKey) : null;
  var html = v45Button('All field maps', 'index');
  if (rec) {
    var key = rec.slug || (typeof v39CountryKey === 'function' ? v39CountryKey(rec) : m.countryKey);
    html += v45Button('Read ' + (m.type === 'region' ? m.title : rec.name || m.title) + ' in depth', m.type === 'region' ? 'reading' : 'country', key, true);
    if (v45List(rec.cards).length) html += v45Button('Recall cards', 'deck', 'region:' + key);
    if (v45List(rec.questions).length) html += v45Button('Region questions', 'drill', key);
  }
  if (m.sheet && typeof v31Sheet === 'function' && v31Sheet(m.sheet)) html += v45Button('See the wider country map', 'overview', m.sheet);
  return '<div class="v45-actions">' + html + '</div>';
}
function v45OwnNotes(m) {
  return !!m.notes && ['terroir', 'grapes', 'growing', 'cellar', 'service', 'compare'].some(function (key) { return v45List(m.notes[key]).length; });
}
function v45CourseRecord(m) { return m.type === 'region' && typeof v39Find === 'function' ? v39Find(m.slug || m.id) : null; }
function v45CourseNotes(m) {
  var rec = v45CourseRecord(m), land = rec && rec.terroir || {}, made = rec && rec.made || {};
  if (!rec) return {};
  return {
    terroir: [['Climate', land.climate], ['Soils', land.soils], ['Topography', land.topography], ['Water and landscape', land.water]]
      .filter(function (row) { return typeof row[1] === 'string' && row[1]; }).map(function (row) { return row[0] + ': ' + row[1]; }),
    grapes: v45List(rec.grapes).filter(function (g) { return g && g.name; }).map(function (g) { return g.name + (g.styles ? ': ' + g.styles : g.role ? ': ' + g.role + ' in this course reading.' : ''); }),
    growing: typeof made.viticulture === 'string' && made.viticulture ? [made.viticulture] : [],
    cellar: typeof made.winemaking === 'string' && made.winemaking ? [made.winemaking] : [],
    service: [
      'Begin with the actual producer, cuvée and vintage. Use the regional reading to frame a question about style, then check the bottle information before promising sweetness, oak, maturity or a particular grape blend.',
      'Describe one useful quality to the guest, such as freshness, texture or savoury development, and relate it to the dish and their preference. Follow the restaurant’s current glassware, serving and decanting procedure.'
    ],
    compare: [
      'Locate two places on this map. Compare their position, water influence, exposure or elevation where the reading gives evidence; do not infer exact vineyard conditions from a representative point.',
      'Name a characteristic grape and one vineyard or cellar decision that can change the result. Separate a regional tendency, a legal rule and an observation about the bottle in front of you.'
    ]
  };
}
function v45NotesHtml(m) {
  var notes = v45OwnNotes(m) ? m.notes : v45CourseNotes(m), sections = [
    ['terroir', 'Read the landscape'], ['grapes', 'Grapes and styles'], ['growing', 'In the vineyard'],
    ['cellar', 'In the cellar'], ['service', 'At the table'], ['compare', 'Compare and explain']
  ];
  return '<div class="v45-studies">' + sections.map(function (section, i) {
    var rows = v45List(notes[section[0]]).filter(function (row) { return typeof row === 'string' && row.trim(); });
    if (!rows.length) return '';
    return '<details class="v45-study"' + (i === 0 ? ' open' : '') + '><summary>' + v45Esc(section[1]) + '</summary><div class="v45-study-body"><ul>'
      + rows.map(function (row) { return '<li>' + v45Esc(row) + '</li>'; }).join('') + '</ul></div></details>';
  }).join('') + '</div>';
}
function v45CourseContext(m) {
  if (v45OwnNotes(m) || !v45CourseRecord(m)) return '';
  return '<p class="v45-small v45-course-note">Read the landscape alongside the grapes and winemaking choices. For rules tied to a vintage, follow the linked regional authority.</p>';
}
function v45CourseSources(m) {
  var rec = v45CourseRecord(m);
  if (!rec || v45OwnNotes(m)) return '';
  var sources = v45List(rec.sources).filter(function (source) { return source && v45Https(source.url); });
  return '<details class="v45-study v45-sources"><summary>References from the regional reading</summary><div class="v45-study-body"><p>The regional reading predates this map edition. The map review adds geographic context; it does not reverify every historical or regulatory claim in that reading. Check the regional authority and producer for current specifications and vintage details.</p>'
    + (sources.length ? '<ul>' + sources.map(function (source) { return '<li>' + v45Link(source.title || source.url, source.url) + (source.asOf ? ' <span class="v45-small">Source date recorded: ' + v45Esc(source.asOf) + '</span>' : '') + '</li>'; }).join('') + '</ul>' : '') + '</div></details>';
}
function v45Hydrate(m, view, retry) {
  var rec = v45CourseRecord(m), content = view.querySelector('#v45-note-content'), sources = view.querySelector('#v45-course-sources');
  if (!rec || v45OwnNotes(m) || !content) return;
  function draw(ok) {
    if (!view.isConnected || S.view !== 'fieldmap' || S._v45map !== m.id) return;
    if (ok) {
      content.innerHTML = v45CourseContext(m) + v45NotesHtml(m);
      if (sources) sources.innerHTML = v45CourseSources(m);
    } else {
      content.innerHTML = '<p class="v45-small" role="status">The detailed regional reading is not available yet. Reconnect or try again; the map and place key are still here.</p>'
        + v45Button('Try the reading again', 'retry-reading', m.id);
    }
  }
  if (v39RecReady(rec)) { setTimeout(function () { draw(true); }, 0); return; }
  var part = v39PartName(rec);
  if (retry) delete V39_PARTS.failed[part];
  if (V39_PARTS.failed[part]) { setTimeout(function () { draw(false); }, 0); return; }
  content.innerHTML = '<p class="v45-small" role="status">Opening the existing regional reading for terrain, grapes, growing and cellar work…</p>';
  v39LoadPart(part, draw);
}
function v45SourcesHtml(m) {
  var seen = {}, sources = v45List(m.sources).concat(v45List(m.sourcesGeo));
  sources = sources.filter(function (s) { if (!s || !v45Https(s.url) || seen[s.url]) return false; seen[s.url] = true; return true; });
  return '<details class="v45-study v45-sources"><summary>Sources and map scope</summary><div class="v45-study-body"><p>' + v45Esc(m.scope)
    + '</p><p>Use the regional authorities and producer information for current rules and the bottle being served. Place names and coordinates support orientation; the text key below remains readable when artwork is unavailable.</p>'
    + (sources.length ? '<ul>' + sources.map(function (s) { return '<li>' + v45Link(s.title || s.url, s.url) + '</li>'; }).join('') + '</ul>' : '')
    + '</div></details>';
}
function v45MapView() {
  var m = v45Map(S._v45map); if (!m) return v45IndexView();
  var places = v45List(m.places), notes = m.notes || {}, number = Math.min(3, places.length);
  var locate = number ? 'Find ' + ['no', 'one', 'two', 'three'][number] + ' ' + (number === 1 ? 'place' : 'places') + ' on the map and describe ' + (number === 1 ? 'its position.' : 'their relative positions.') : 'Locate the region and explain the map’s scope.';
  var html = '<article class="v25page v45 v45-map">' + v32Head(m.title + ': field map', v45CountryName(m.countryKey) + ' · ' + (m.type === 'country' ? 'Country orientation' : 'Regional exploration'))
    + v45ReadingActions(m)
    + '<p class="v45-lead">' + v45Esc(notes.overview || m.summary) + '</p><div class="v45-spread"><div class="v45-map-column">'
    + '<figure class="v45-figure"><button class="v45-image-open" type="button" data-v45="zoom" data-v45-arg="' + v45Esc(m.id) + '" aria-label="Enlarge the field map of ' + v45Esc(m.title) + '">'
    + '<img src="' + v45Esc(v45File(m)) + '" width="1200" height="1500" alt="Orientation map of ' + v45Esc(m.title) + '. The numbered locations are listed in the adjacent place key." data-v45-image decoding="async">'
    + '<span class="v45-image-fail" hidden>The artwork is unavailable. Continue with the place key and reading below.</span></button><figcaption>'
    + v45Button('Enlarge map', 'zoom', m.id) + v45Link('Open original map', v45File(m)) + '</figcaption></figure>'
    + '<p class="v45-scope">' + v45Esc(m.scope) + '</p>'
    + '<p class="v45-saved" data-v45-saved="' + v45Esc(m.id) + '">Not saved for offline use</p></div>'
    + '<section class="v45-key" aria-labelledby="v45-place-heading"><h3 id="v45-place-heading">Find your bearings</h3><p class="v45-small">The numbers below match the map. Coordinates are representative locators, not the extent of a wine region.</p>'
    + '<ol>' + places.map(function (p, i) {
      var coordinate = (Number.isFinite(p.lat) ? Math.abs(p.lat).toFixed(3) + '° ' + (p.lat < 0 ? 'S' : 'N') : '') + ', '
        + (Number.isFinite(p.lon) ? Math.abs(p.lon).toFixed(3) + '° ' + (p.lon < 0 ? 'W' : 'E') : '');
      return '<li><span class="v45-place-number" aria-hidden="true">' + (i + 1) + '</span><div><h4><span class="sr-only">Location ' + (i + 1) + ': </span>'
        + v45Esc(p.name) + '</h4><p class="v45-coordinate">' + v45Esc((p.kind || 'Study location') + ' · ' + coordinate) + '</p>'
        + (p.note ? '<p>' + v45Esc(p.note) + '</p>' : '') + (v45Https(p.sourceUrl) ? '<p class="v45-place-source">' + v45Link('Location reference', p.sourceUrl) + '</p>' : '') + '</div></li>';
    }).join('') + '</ol></section></div>'
    + '<section class="v45-learning" aria-labelledby="v45-study-heading"><h3 id="v45-study-heading">From the landscape to the guest</h3>'
    + '<p>Read one section, close it and explain the idea in your own words. Then connect it to a bottle you know.</p><div id="v45-note-content">' + v45CourseContext(m) + v45NotesHtml(m) + '</div>'
    + '<section class="v45-rehearse"><h4>A short recall round</h4><ol><li>' + v45Esc(locate) + '</li>'
    + '<li>Connect one growing condition to a decision in the vineyard or cellar, without treating it as a guarantee of flavour.</li>'
    + '<li>Give a clear tableside description using a verified producer, cuvée and vintage.</li></ol><p>These spoken prompts are unscored. The recall cards and questions use your existing regional study records.</p>'
    + v45ReadingActions(m) + '</section></section>' + v45SourcesHtml(m) + '<div id="v45-course-sources">' + v45CourseSources(m) + '</div>' + v45StorageHtml(m) + '</article>';
  var view = v32Build(html); v45Images(view); v45Hydrate(m, view); v45CheckStorage(); return view;
}
V25_VIEWS.fieldatlas = v45IndexView; V25_VIEWS.fieldmap = v45MapView;

function v45Images(view) {
  Array.prototype.forEach.call(view.querySelectorAll('[data-v45-image]'), function (image) {
    function fail() {
      image.hidden = true;
      var message = image.parentNode.querySelector('.v45-image-fail'); if (message) message.hidden = false;
    }
    image.addEventListener('error', fail);
    image.addEventListener('load', function () { if (image.naturalWidth) v45CheckStorage(); });
    if (image.complete && !image.naturalWidth) fail();
  });
}

/* Native dialog, normal scrollbars and explicit zoom controls. No gesture
   interception: browser page zoom and touch scrolling remain available. */
function v45Zoom(id, opener) {
  var m = v45Map(id); if (!m) return;
  if (V45.viewer) V45.viewer.close();
  var dialog = document.createElement('dialog'), zoom = 1, bodyOverflow = document.body.style.overflow;
  dialog.className = 'v45-viewer'; dialog.setAttribute('aria-labelledby', 'v45-viewer-title');
  dialog.innerHTML = '<div class="v45-viewer-head"><h2 id="v45-viewer-title">' + v45Esc(m.title) + '</h2><button type="button" class="btn ghost" data-v45-close>Close map</button></div>'
    + '<div class="v45-viewer-tools"><button type="button" class="btn ghost" data-v45-minus>Zoom out</button><button type="button" class="btn ghost" data-v45-plus>Zoom in</button>'
    + '<button type="button" class="btn ghost" data-v45-fit>Fit width</button><output id="v45-zoom-level" aria-live="polite">100 per cent</output></div>'
    + '<p id="v45-viewer-help">Use the controls to enlarge, then scroll to explore. Keyboard users can focus the map area and use the arrow keys. Escape closes this window.</p>'
    + '<div class="v45-canvas" tabindex="0" role="region" aria-label="Scrollable field map" aria-describedby="v45-viewer-help"><img src="' + v45Esc(v45File(m))
    + '" alt="Field map of ' + v45Esc(m.title) + '. A numbered text key is on the page beneath this window."><p class="v45-image-fail" hidden>The map could not load. Close this window to read the place key.</p></div>'
    + '<div class="v45-viewer-footer">' + v45Link('Open original map in a new tab', v45File(m)) + '</div>';
  document.body.appendChild(dialog);
  var image = dialog.querySelector('img'), canvas = dialog.querySelector('.v45-canvas'), plus = dialog.querySelector('[data-v45-plus]'), minus = dialog.querySelector('[data-v45-minus]');
  function draw() {
    image.style.width = (100 * zoom) + '%'; plus.disabled = zoom >= 4; minus.disabled = zoom <= 1;
    dialog.querySelector('output').textContent = Math.round(zoom * 100) + ' per cent';
  }
  function close() {
    if (!V45.viewer || V45.viewer.node !== dialog) return;
    V45.viewer = null; if (dialog.open) dialog.close(); dialog.remove(); document.body.style.overflow = bodyOverflow;
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  }
  V45.viewer = { node: dialog, close: close };
  dialog.querySelector('[data-v45-close]').onclick = close;
  plus.onclick = function () { zoom = Math.min(4, zoom + .5); draw(); };
  minus.onclick = function () { zoom = Math.max(1, zoom - .5); draw(); };
  dialog.querySelector('[data-v45-fit]').onclick = function () { zoom = 1; draw(); canvas.scrollLeft = 0; canvas.scrollTop = 0; };
  dialog.addEventListener('close', close);
  dialog.addEventListener('keydown', function (event) { event.stopPropagation(); });
  image.addEventListener('error', function () { image.hidden = true; canvas.querySelector('p').hidden = false; plus.disabled = true; minus.disabled = true; });
  document.body.style.overflow = 'hidden'; dialog.showModal(); draw();
}

/* Separate, scope-specific artwork storage. Partial downloads remain useful;
   stop cancels the current request, and never touches any study storage. */
function v45CacheName() { return 'codexfields-v1-' + new URL('./', document.baseURI).pathname.replace(/[^a-z0-9]/gi, '_'); }
function v45CanKeep() { return typeof caches !== 'undefined' && typeof fetch === 'function' && window.isSecureContext !== false; }
function v45StorageHtml(m) {
  if (!v45CanKeep()) return '<p class="v45-small">Optional map downloads are unavailable in this browser. The reading and source links remain available.</p>';
  var bytes = m ? Number(m.bytes) || 0 : v45Maps().reduce(function (sum, map) { return sum + (Number(map.bytes) || 0); }, 0);
  var size = bytes ? (bytes / 1048576).toFixed(m ? 1 : 0) + ' MiB of artwork' : 'Optional artwork download';
  return '<section class="v45-storage" aria-labelledby="v45-storage-heading"><div><h3 id="v45-storage-heading">Take this exploration with you</h3>'
    + '<p>' + (m ? 'Save this map' : 'Save all ' + v45Maps().length + ' field maps') + ' for reading away from a connection. ' + v45Esc(size) + '.</p>'
    + '<p class="v45-small">This saves the artwork only. Keep the regional readings using the separate control in The regions. External sources still need a connection.</p>'
    + '<p class="v45-cache-status" role="status" aria-live="polite" aria-atomic="true"></p></div><div class="v45-storage-actions">'
    + v45Button(m ? 'Keep this map' : 'Keep all field maps', 'keep', m ? m.id : 'all')
    + '<button type="button" class="btn ghost" data-v45="stop" hidden>Stop download</button>'
    + v45Button(m ? 'Remove this saved map' : 'Remove saved field maps', 'remove', m ? m.id : 'all')
    + '</div></section>';
}
function v45CheckStorage() {
  if (!v45CanKeep() || V45.checking) return;
  V45.checking = true;
  caches.open(v45CacheName()).then(function (cache) { return cache.keys(); }).then(function (keys) {
    var urls = {}, paths = {}; keys.forEach(function (key) { urls[key.url] = true; paths[new URL(key.url).pathname] = true; });
    V45.stored = {}; V45.cached = {}; V45.hasFiles = keys.length > 0;
    v45Maps().forEach(function (m) {
      var url = new URL(v45File(m), document.baseURI);
      if (urls[url.href]) V45.stored[m.id] = true;
      if (paths[url.pathname]) V45.cached[m.id] = true;
    });
    V45.checked = true;
  }).catch(function () { V45.message = 'Map storage is unavailable. You can still read with a connection.'; }).then(function () {
    V45.checking = false; v45RefreshStorage();
  });
}
function v45RefreshStorage() {
  var count = Object.keys(V45.stored).length, total = v45Maps().length;
  Array.prototype.forEach.call(document.querySelectorAll('.v45-cache-status'), function (node) {
    node.textContent = V45.message || (V45.checked ? count + ' of ' + total + ' current field maps saved on this device.' : 'Checking saved maps…');
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-v45-saved]'), function (node) {
    node.textContent = V45.stored[node.getAttribute('data-v45-saved')] ? 'Saved on this device' : 'Not saved for offline use';
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-v45="keep"]'), function (node) {
    var id = node.getAttribute('data-v45-arg'); node.disabled = V45.busy || (id === 'all' ? count === total && total > 0 : !!V45.stored[id]);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-v45="remove"]'), function (node) {
    var id = node.getAttribute('data-v45-arg'); node.disabled = V45.busy || (id === 'all' ? !V45.hasFiles && count === 0 : !V45.cached[id] && !V45.stored[id]);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-v45="stop"]'), function (node) { node.hidden = !V45.busy; node.disabled = V45.stop; });
}
function v45PruneVersions(cache, m, keep) {
  var target = new URL(v45File(m), document.baseURI);
  return cache.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) {
      var url = new URL(key.url);
      return url.origin === target.origin && url.pathname === target.pathname && key.url !== keep;
    }).map(function (key) { return cache.delete(key); }));
  });
}
function v45ValidateArtwork(response, m) {
  if (!response.ok) return Promise.reject(new Error('Map unavailable'));
  var saved = response.clone();
  return response.arrayBuffer().then(function (bytes) {
    if (!bytes.byteLength || (Number(m.bytes) > 0 && bytes.byteLength !== Number(m.bytes))) throw new Error('Incomplete map');
    var text = new TextDecoder('utf-8').decode(bytes);
    var doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    if (!doc.documentElement || doc.documentElement.localName !== 'svg' || doc.querySelector('parsererror')
      || doc.documentElement.namespaceURI !== 'http://www.w3.org/2000/svg') throw new Error('Invalid map');
    if (window.crypto && window.crypto.subtle && /^[a-f0-9]{64}$/i.test(m.sha256 || '')) {
      return window.crypto.subtle.digest('SHA-256', bytes).then(function (digest) {
        var hash = Array.prototype.map.call(new Uint8Array(digest), function (byte) { return ('0' + byte.toString(16)).slice(-2); }).join('');
        if (hash !== m.sha256.toLowerCase()) throw new Error('Map edition mismatch');
        return saved;
      });
    }
    /* SVG parsing and exact manifest byte length remain required on browsers
       without WebCrypto. No arbitrary text response enters the artwork cache. */
    return saved;
  });
}
function v45Keep(id) {
  if (!v45CanKeep() || V45.busy) return;
  var selected = id === 'all' ? v45Maps() : [v45Map(id)].filter(Boolean), queue = selected.filter(function (m) { return !V45.stored[m.id]; });
  if (!queue.length) return;
  V45.busy = true; V45.stop = false; V45.message = 'Preparing to save ' + queue.length + (queue.length === 1 ? ' field map…' : ' field maps…'); v45RefreshStorage();
  var finished = 0, failed = 0;
  caches.open(v45CacheName()).then(function (cache) {
    function next() {
      if (V45.stop || !queue.length) return Promise.resolve();
      var m = queue.shift(), url = new URL(v45File(m), document.baseURI).href;
      V45.message = 'Saving ' + m.title + '. ' + finished + ' completed, ' + failed + ' unavailable.'; v45RefreshStorage();
      V45.controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var options = { cache: 'reload', credentials: 'same-origin' }; if (V45.controller) options.signal = V45.controller.signal;
      return fetch(url, options).then(function (response) { return v45ValidateArtwork(response, m); }).then(function (response) {
        return cache.put(url, response).then(function () { return v45PruneVersions(cache, m, url); });
      }).then(function () { V45.stored[m.id] = true; V45.cached[m.id] = true; V45.hasFiles = true; finished++; }).catch(function (error) {
        if (!V45.stop) failed++;
      }).then(next);
    }
    return next();
  }).catch(function () { failed++; }).then(function () {
    V45.busy = false; V45.controller = null;
    V45.message = (V45.stop ? 'Download stopped. ' : '') + finished + (finished === 1 ? ' map saved in this download.' : ' maps saved in this download.')
      + (failed ? ' ' + failed + ' could not be saved. Check the connection or available storage, then try again.' : '')
      + ' Previously saved maps and your study records are unchanged.';
    v45RefreshStorage(); v45CheckStorage();
  });
}
function v45Remove(id) {
  if (!v45CanKeep() || V45.busy) return;
  V45.message = 'Removing saved artwork…'; v45RefreshStorage();
  var job = id === 'all' ? caches.delete(v45CacheName()) : caches.open(v45CacheName()).then(function (cache) {
    var m = v45Map(id); return m ? v45PruneVersions(cache, m, '') : false;
  });
  job.then(function () { V45.message = 'Saved field artwork removed. Your study records and other map collections are unchanged.'; v45CheckStorage(); })
    .catch(function () { V45.message = 'The saved artwork could not be removed. Please try again.'; v45RefreshStorage(); });
}

/* Doors extend existing pages, retaining the reviewed overview maps and
   canonical v39 articles, cards and question banks. */
function v45Door(label, text, id) {
  var node = document.createElement('section'); node.className = 'v45-door';
  node.innerHTML = '<h3>' + v45Esc(label) + '</h3><p>' + v45Esc(text) + '</p><div class="v45-actions">'
    + v45Button(id ? 'Explore this field map' : 'Open the Regional Field Atlas', id ? 'map' : 'index', id || '', true) + '</div>';
  return node;
}
var _v45GridView = v23GridView;
var _v45OverviewFilter = v31Filter;
v31Filter = function (view, value) {
  _v45OverviewFilter.apply(this, arguments);
  var section = view.querySelector('.v45-country-doors'); if (!section) return;
  var query = v45Fold(value).trim(), visible = 0;
  Array.prototype.forEach.call(section.querySelectorAll('[data-v45="map"]'), function (button) {
    var map = v45Map(button.getAttribute('data-v45-arg'));
    button.hidden = !!query && (!map || v45SearchText(map).indexOf(query) < 0);
    if (!button.hidden) visible++;
  });
  section.hidden = !visible;
  var overviews = view.querySelectorAll('.v31-map-card:not([hidden])').length, status = view.querySelector('#atlas-filter-count'), empty = view.querySelector('.v31-empty');
  if (status) status.textContent = overviews + ' overview maps and ' + visible + ' additional country maps';
  if (empty) empty.hidden = !!(overviews + visible);
};
v23GridView = function () {
  var view = _v45GridView.apply(this, arguments), header = view.querySelector('.v31-head'), maps = v45Maps();
  if (!maps.length) return view;
  var door = v45Door('Go closer: regional field maps', maps.filter(function (m) { return m.type === 'region'; }).length
    + ' regional explorations connect place, terroir, grapes, growing, cellar work and service. Begin with Champagne or Tuscany, then follow any region in the course.');
  if (header) header.after(door); else view.prepend(door);
  var extra = maps.filter(function (m) { return m.type === 'country'; });
  if (extra.length) {
    var section = document.createElement('section'); section.className = 'v45-country-doors';
    section.innerHTML = '<h3>More countries to explore</h3><p>These ' + extra.length + ' additional country maps fill gaps in the earlier illustrated atlas. They are study windows, not complete national vineyard inventories.</p>'
      + '<div class="v45-actions">' + extra.map(function (m) { return v45Button(m.title, 'map', m.id); }).join('') + '</div>';
    door.after(section);
  }
  v31Filter(view, V31.query);
  return view;
};
var _v45SheetView = v23SheetView;
v23SheetView = function (id) {
  var view = _v45SheetView.apply(this, arguments), maps = v45Maps().filter(function (m) { return m.type === 'region' && m.sheet === id; });
  maps.forEach(function (m) {
    var rec = typeof v39Find === 'function' && v39Find(m.slug || m.id), row = rec && view.querySelector('#atlas-region-' + rec.index);
    if (!row) return;
    var p = document.createElement('p'); p.className = 'v45-regional-door';
    p.innerHTML = v45Button('Explore the ' + m.title + ' field map', 'map', m.id); row.appendChild(p);
  });
  return view;
};
function v45DecorateReading() {
  var view = document.getElementById('view'); if (!view || view.querySelector('.v45-door')) return;
  var additions = S.view === 'country' ? v45CountryMaps(S._v39country) : [];
  var m = S.view === 'region' ? v45Map(S._v39region) : additions.length === 1 ? additions[0] : null;
  if (m) {
    var root = view.querySelector('.v39-article,.v39-country'), head = root && root.querySelector('.viewhead');
    if (head) head.after(v45Door('Explore ' + m.title + ' on the map', 'Find the study locations, connect the growing conditions and rehearse a clear explanation for a guest.', m.id));
    if (S.view === 'country') {
      var subtitle = root && root.querySelector('.viewhead .sub');
      if (subtitle) subtitle.textContent = 'Country reading with a field map';
      Array.prototype.forEach.call(root ? root.querySelectorAll('.v39-note') : [], function (node) {
        if (/no map|not mapped|without a map|map.*to come/i.test(node.textContent)) node.textContent = 'Use the field map above to locate representative study places.';
      });
    }
  } else if (S.view === 'country') {
    var c = typeof v39CountryOf === 'function' && v39CountryOf(S._v39country), sheet = c && c.sheet;
    if (additions.length) {
      var groupHead = view.querySelector('.v39-country .viewhead');
      if (groupHead) {
        var groupDoor = document.createElement('section'); groupDoor.className = 'v45-door';
        groupDoor.innerHTML = '<h3>Explore the countries on the map</h3><p>Use these country field maps alongside the regional reading below.</p><div class="v45-actions">'
          + additions.map(function (map) { return v45Button(map.title, 'map', map.id); }).join('') + '</div>';
        groupHead.after(groupDoor);
        var sub = groupHead.querySelector('.sub'); if (sub) sub.textContent = 'Regional reading with ' + additions.length + ' country field maps';
      }
      Array.prototype.forEach.call(view.querySelectorAll('.v39-note'), function (node) {
        if (/no map|not mapped|without a map|map.*to come/i.test(node.textContent)) node.textContent = 'Use the country field maps above to locate representative study places.';
      });
    } else if (sheet && v45Maps().some(function (map) { return map.sheet === sheet; })) {
      var heading = view.querySelector('.v39-country .viewhead');
      if (heading) heading.after(v45Door('Explore the regions of ' + c.name, 'Open the field atlas and choose a region for a closer reading of its landscape.'));
    }
  } else if (S.view === 'regions') {
    Array.prototype.forEach.call(view.querySelectorAll('.v39-index [data-v39="country"]'), function (button) {
      var maps = v45CountryMaps(button.getAttribute('data-key')), line = button.querySelector('.v25row-line');
      if (maps.length && line) line.textContent = maps.length === 1 ? 'Country reading and an illustrated field map' : maps.length + ' country field maps and regional reading';
    });
  }
}
var _v45MoreLibrary = v32LibraryView;
v32LibraryView = function () {
  var view = _v45MoreLibrary.apply(this, arguments);
  var anchor = view.querySelector('.v39-door-regions');
  if (anchor) anchor.after(v45Door('The Regional Field Atlas', 'Illustrated regional maps, additional countries and a path from geography to service.'));
  return view;
};
V25_VIEWS.library = v32LibraryView;

/* Today and Library search use the same navigation entries as the atlas.
   No new result renderer or parallel reading destination is introduced. */
var _v45SearchIndex = v44Index;
v44Index = function () {
  var index = _v45SearchIndex.apply(this, arguments);
  if (index._v45fields) return index;
  index._v45fields = true;
  index.learn.push(v44Entry('The Regional Field Atlas', 'Regional maps and additional countries',
    'map atlas geography terroir grapes growing winemaking exploration', 'route', 'fieldatlas'));
  v45Maps().forEach(function (m) {
    index.places.push(v44Entry(m.title + ': field map', (m.type === 'country' ? 'Country orientation' : 'Regional map') + ': ' + v45CountryName(m.countryKey),
      [m.summary, m.grapes, v45List(m.places).map(function (place) { return place.name; })], 'route', 'fieldmap', m.id));
  });
  return index;
};

document.addEventListener('click', function (event) {
  var node = event.target && event.target.closest ? event.target.closest('[data-v45]') : null;
  if (!node || node.disabled) return;
  var action = node.getAttribute('data-v45'), arg = node.getAttribute('data-v45-arg') || '';
  event.preventDefault();
  if (action === 'map') v45Go(arg);
  else if (action === 'index') v45Go('');
  else if (action === 'zoom') v45Zoom(arg, node);
  else if (action === 'overview') v32Go({ view: 'worldmap', arg: arg }, 'push');
  else if (action === 'reading') v39Open('region', arg, 'push');
  else if (action === 'country') v39Open('country', arg, 'push');
  else if (action === 'deck') v32OpenDeck(arg);
  else if (action === 'drill') v39StartDrill([arg]);
  else if (action === 'retry-reading') { var m = v45Map(arg), view = node.closest('.v45-map'); if (m && view) v45Hydrate(m, view, true); }
  else if (action === 'keep') v45Keep(arg);
  else if (action === 'remove') v45Remove(arg);
  else if (action === 'stop') { V45.stop = true; if (V45.controller) V45.controller.abort(); V45.message = 'Stopping this download…'; v45RefreshStorage(); }
});
var _v45Render = render;
render = function () {
  if (V45.viewer) V45.viewer.close();
  var result = _v45Render.apply(this, arguments); v45DecorateReading(); v45RefreshStorage(); return result;
};
(function () {
  if (typeof V32 === 'undefined' || V32.moved || !/^#\/v\/(fieldatlas|fieldmap)(\/|$)/.test(V32.initialHash || '')) return;
  v32Apply(v32Parse(V32.initialHash), v32CurState()); V32.pend = 'replace';
})();
