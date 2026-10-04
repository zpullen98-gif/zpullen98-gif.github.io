/* Codex XXXI: the teaching atlas.
   Geography is rendered from reviewed map metadata. Existing course records
   remain readable, and no study identity, answer or progress field is changed. */
var V31 = { query: '', viewer: null };

function v31Esc(value) { return v23Esc(value); }
function v31Sheet(id) {
  return typeof ATLAS_V2 !== 'undefined' && ATLAS_V2.sheets ? ATLAS_V2.sheets[id] : null;
}
function v31Sheets() {
  return (typeof MAP_SHEETS !== 'undefined' ? MAP_SHEETS : []).filter(function (s) { return !!v31Sheet(s.id); });
}
function v31Say(message) {
  if (typeof say === 'function') say(message);
}
function v31Name(id) { var sheet = mapSheet(id); return sheet ? sheet.name : id; }
function v31Heading(id) {
  var sheet = id && v31Sheet(id);
  var title = sheet ? (sheet.title || v31Name(id)) : 'The Wine Atlas';
  var intro = sheet ? sheet.intro : 'Read the shape of a place, follow its rivers and coasts, then connect the landscape to the wine.';
  return '<header class="v31-head' + (sheet ? ' v31-head-sheet' : '') + '">' +
    '<img class="v31-room" src="assets/codex-atlas-room-v2.webp" width="1536" height="512" alt="" decoding="async">' +
    '<div class="v31-head-copy"><p class="v31-eyebrow">The illustrated wine library</p><h2>' + v31Esc(title) + '</h2>' +
    '<p>' + v31Esc(intro) + '</p></div></header>';
}
function v31StoredCount() {
  return v31Sheets().filter(function (s) { return V23.stored && V23.stored[s.id]; }).length;
}
function v31StorageHtml() {
  if (typeof v23HaveCaches !== 'function' || !v23HaveCaches()) return '<p class="v31-storage-unavailable">The reading guides work offline with the app. This browser cannot keep extra map artwork on the device.</p>';
  return '<section class="v31-storage" aria-labelledby="atlas-storage-title"><div>' +
    '<h3 id="atlas-storage-title">Take the atlas with you</h3>' +
    '<p id="atlas-storage-status" role="status" aria-live="polite" aria-atomic="true"></p>' +
    '<p class="v31-small">Map downloads are optional. The region guides remain part of the app.</p></div>' +
    '<div class="v31-storage-actions"><button type="button" class="v31-btn" id="atlas-keep">Keep maps on this device</button>' +
    '<button type="button" class="v31-btn v31-secondary" id="atlas-remove">Remove saved maps</button></div></section>';
}
function v31RefreshStorage() {
  var count = v31StoredCount(), total = v31Sheets().length;
  var status = document.getElementById('atlas-storage-status');
  if (status) status.textContent = V23.lastMessage || count + ' of ' + total + ' maps saved on this device.';
  var keep = document.getElementById('atlas-keep'), remove = document.getElementById('atlas-remove');
  if (keep) { keep.disabled = !!V23.busy || count >= total; keep.textContent = count >= total ? 'All maps saved' : 'Keep maps on this device'; }
  if (remove) { remove.disabled = !!V23.busy || !count; }
  Array.prototype.forEach.call(document.querySelectorAll('[data-atlas-saved]'), function (node) {
    node.textContent = V23.stored && V23.stored[node.getAttribute('data-atlas-saved')] ? 'Saved on this device' : 'Artwork needs a connection';
  });
}
function v31WireStorage(view) {
  var update = function (message) {
    var target = document.getElementById('atlas-storage-status');
    if (target) target.textContent = message;
  };
  var keep = view.querySelector('#atlas-keep'), remove = view.querySelector('#atlas-remove');
  if (keep) keep.onclick = function () { v23StoreAll(keep, update); v31RefreshStorage(); };
  if (remove) remove.onclick = function () { v23Forget(remove, update); v31RefreshStorage(); };
}
window.addEventListener('codex-atlas-cachechange', function () {
  v31RefreshStorage();
  if (V23.lastMessage && !document.getElementById('atlas-storage-status')) v31Say(V23.lastMessage);
});

function v31WireImages(view) {
  Array.prototype.forEach.call(view.querySelectorAll('[data-atlas-image]'), function (image) {
    var failed = function () {
      image.hidden = true;
      var box = image.parentNode;
      var note = box.querySelector('.v31-image-fail');
      if (note) note.hidden = false;
      if (box.tagName === 'BUTTON') box.disabled = true;
    };
    image.addEventListener('error', failed);
    if (image.complete && !image.naturalWidth) failed();
  });
}
function v31SearchText(sheet) {
  var data = v31Sheet(sheet.id);
  return [sheet.name].concat((data.regions || []).map(function (r) { return r.name; })).join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
function v31Filter(view, value) {
  V31.query = value;
  var query = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(), count = 0;
  Array.prototype.forEach.call(view.querySelectorAll('.v31-map-card'), function (card) {
    var sheet = mapSheet(card.getAttribute('data-map'));
    var show = !query || v31SearchText(sheet).indexOf(query) >= 0;
    card.hidden = !show;
    if (show) count++;
  });
  Array.prototype.forEach.call(view.querySelectorAll('.v31-map-group'), function (group) {
    group.hidden = !group.querySelector('.v31-map-card:not([hidden])');
  });
  var status = view.querySelector('#atlas-filter-count');
  if (status) status.textContent = count + ' of ' + v31Sheets().length + ' maps';
  var empty = view.querySelector('.v31-empty');
  if (empty) empty.hidden = !!count;
}
v23GridView = function () {
  var sheets = v31Sheets();
  var html = '<div class="v31-atlas">' + v31Heading(null) +
    '<div class="v31-find"><label for="atlas-find">Find a country or region</label><input id="atlas-find" type="search" autocomplete="off" placeholder="For example, France or Mendoza" value="' + v31Esc(V31.query) + '">' +
    '<span id="atlas-filter-count" role="status" aria-live="polite"></span></div>';
  MAP_GROUPS.forEach(function (group, index) {
    var members = sheets.filter(function (s) { return group[1].indexOf(s.id) >= 0; });
    if (!members.length) return;
    html += '<section class="v31-map-group" aria-labelledby="atlas-group-' + index + '"><h3 id="atlas-group-' + index + '" class="v31-group-title">' + v31Esc(group[0]) + '</h3><div class="v31-grid">';
    members.forEach(function (sheet) {
      var data = v31Sheet(sheet.id);
      html += '<button type="button" class="v31-map-card" data-map="' + v31Esc(sheet.id) + '">' +
        '<span class="v31-thumb"><img data-atlas-image src="' + v31Esc(mapFile(sheet.id)) + '" alt="" width="' + data.width + '" height="' + data.height + '" loading="lazy" decoding="async">' +
        '<span class="v31-image-fail" hidden>Map artwork unavailable.<br>The guide is ready to read.</span></span>' +
        '<span class="v31-card-copy"><span class="v31-card-name">' + v31Esc(sheet.name) + '</span><span class="v31-card-count">' + data.regions.length + ' numbered ' + (data.regions.length === 1 ? 'region' : 'regions') + '</span>' +
        '<span class="v31-card-intro">' + v31Esc(data.intro) + '</span><span class="v31-card-saved" data-atlas-saved="' + v31Esc(sheet.id) + '"></span><span class="v31-card-open">Explore the map</span></span></button>';
    });
    html += '</div></section>';
  });
  html += '<p class="v31-empty" hidden>No maps match yet. Try a country name or clear the search.</p>' + v31StorageHtml() + '<p class="v31-bibliography"><a href="atlas-sources.html">Read the atlas bibliography</a></p></div>';
  var view = el(html);
  view.querySelector('#atlas-find').oninput = function (event) { v31Filter(view, event.target.value); };
  Array.prototype.forEach.call(view.querySelectorAll('[data-map]'), function (button) {
    button.onclick = function () { S.wmap = button.getAttribute('data-map'); render(); };
  });
  v31Filter(view, V31.query); v31WireStorage(view); v31WireImages(view);
  return view;
};

function v31CourseRow(row, data) {
  var match = (data.regions || []).filter(function (r) { return r.name === row.n; })[0];
  var patch = match && match.studyNotes;
  var result = { n: row.n, g: row.g, soil: row.soil, climate: row.climate, notes: row.notes.slice(), orphan: row.orphan };
  if (patch) ['g', 'soil', 'climate', 'notes'].forEach(function (key) { if (Object.prototype.hasOwnProperty.call(patch, key)) result[key] = patch[key]; });
  return result;
}
function v31CourseHtml(row) {
  return '<section class="v31-course-row"><h4>' + v31Esc(row.n) + '</h4><dl>' +
    '<div><dt>Grapes & styles</dt><dd>' + v31Esc(row.g) + '</dd></div><div><dt>Soil</dt><dd>' + v31Esc(row.soil) + '</dd></div>' +
    (row.climate ? '<div><dt>Climate</dt><dd>' + v31Esc(row.climate) + '</dd></div>' : '') + '</dl>' +
    (row.notes.length ? '<p>' + row.notes.map(v31Esc).join(' ') + '</p>' : '') + '</section>';
}
function v31Section(id, wanted) {
  var available = typeof cats === 'function' ? cats() : {};
  if (wanted && available[wanted]) return wanted;
  var intro = { italy: 'Italy', california: 'United States', oregon: 'United States', washington: 'United States', 'new-york': 'United States' };
  return activeLevel === 'intro' && intro[id] && available[intro[id]] ? intro[id] : '';
}
function v31StudyHtml(id, rows) {
  var sections = [];
  rows.forEach(function (row) { var section = v31Section(id, row.sec); if (section && sections.indexOf(section) < 0) sections.push(section); });
  if (!sections.length) return '';
  var html = '<section class="v31-study" aria-labelledby="atlas-study-title"><h3 id="atlas-study-title">Continue studying</h3><p>Connections to the course at your current level.</p><div class="v31-study-links">';
  sections.forEach(function (section) {
    html += '<div><span>' + v31Esc(section) + '</span><button type="button" class="v31-btn v31-secondary" data-atlas-drill="' + v31Esc(section) + '">Practise<span class="sr-only"> ' + v31Esc(section) + '</span></button>';
    if (typeof v25HasChapter === 'function' && v25HasChapter(section)) html += '<button type="button" class="v31-btn v31-secondary" data-atlas-chapter="' + v31Esc(section) + '">Read the chapter<span class="sr-only">: ' + v31Esc(section) + '</span></button>';
    html += '</div>';
  });
  return html + '</div></section>';
}
v23SheetView = function (id) {
  var data = v31Sheet(id), rows = mapRegions(id), sheets = v31Sheets();
  if (!data) return v23GridView();
  var at = sheets.map(function (s) { return s.id; }).indexOf(id);
  var html = '<article class="v31-atlas v31-sheet"><button type="button" class="v31-back" id="atlas-back">All maps</button>' + v31Heading(id) +
    '<div class="v31-spread"><div class="v31-art-column"><figure class="v31-figure"><button type="button" class="v31-map-open" id="atlas-open" aria-label="Enlarge the map of ' + v31Esc(v31Name(id)) + '">' +
    '<img data-atlas-image src="' + v31Esc(mapFile(id)) + '" width="' + data.width + '" height="' + data.height + '" alt="Wine geography of ' + v31Esc(v31Name(id)) + '. Numbered regions are described in the reading guide." decoding="async">' +
    '<span class="v31-image-fail" hidden>The map artwork could not load. The complete reading guide remains available.</span></button>' +
    '<figcaption><button type="button" class="v31-btn" id="atlas-enlarge">Enlarge map</button><span data-atlas-saved="' + v31Esc(id) + '"></span></figcaption></figure>' +
    '<p class="v31-map-note">Numbers connect the map to the guide. Locators represent places, not legal boundary lines.</p></div>' +
    '<section class="v31-guide" aria-labelledby="atlas-guide-title"><p class="v31-eyebrow">Read the landscape</p><h3 id="atlas-guide-title">A sense of place</h3><p class="v31-scope">' + v31Esc(data.scope) + '</p>';
  if (data.reading && data.reading.length) html += '<ul class="v31-reading">' + data.reading.map(function (text) { return '<li>' + v31Esc(text) + '</li>'; }).join('') + '</ul>';
  html += '<ol class="v31-regions" role="list" aria-label="Numbered map regions">';
  data.regions.forEach(function (region, index) {
    html += '<li id="atlas-region-' + index + '"><div class="v31-region-title"><span aria-hidden="true">' + (index + 1) + '</span><h4><span class="sr-only">Region ' + (index + 1) + ': </span>' + v31Esc(region.name) + '</h4></div>' +
      '<p class="v31-locators"><b>Locate</b> ' + region.anchors.map(function (a) { return v31Esc(a.label); }).join(' · ') + '</p>' +
      (region.note ? '<p>' + v31Esc(region.note) + '</p>' : '') + '</li>';
  });
  html += '</ol>';
  if (data.extraAnchors && data.extraAnchors.length) html += '<div class="v31-reference-places"><h4>Reference places</h4><ul>' + data.extraAnchors.map(function (a, index) { return '<li><span class="v31-reference-letter">' + String.fromCharCode(97 + index) + '</span> <b>' + v31Esc(a.label) + '</b>' + (a.note ? ': ' + v31Esc(a.note) : '') + '</li>'; }).join('') + '</ul></div>';
  html += '</section></div>';
  var beyond = rows.filter(function (r) { return r.orphan; });
  if (beyond.length) html += '<section class="v31-beyond" aria-labelledby="atlas-beyond-title"><h3 id="atlas-beyond-title">Beyond this map</h3><p>These existing course entries describe other states. They are retained here for study and are not locations on the New York map.</p>' + beyond.map(v31CourseHtml).join('') + '</section>';
  var courseCount = rows.filter(function (r) { return !r.orphan; }).length;
  html += '<details class="v31-disclosure"><summary>Grapes &amp; terroir study notes <span>' + courseCount + ' ' + (courseCount === 1 ? 'region' : 'regions') + '</span></summary><div class="v31-disclosure-body"><p class="v31-disclosure-intro">Existing course notes; the atlas review verifies locations, not every wine-law claim.</p>' +
    rows.filter(function (r) { return !r.orphan; }).map(function (row) { return v31CourseHtml(v31CourseRow(row, data)); }).join('') + '</div></details>' +
    '<details class="v31-disclosure v31-sources"><summary>Map sources &amp; reading <span>' + data.sources.length + ' ' + (data.sources.length === 1 ? 'reference' : 'references') + '</span></summary><div class="v31-disclosure-body"><p>The map is a study guide to relative location. Consult the source material for official definitions and boundaries.</p><ul>' +
    data.sources.map(function (source) { return '<li><a href="' + v31Esc(source.url) + '" target="_blank" rel="noopener">' + v31Esc(source.title) + '<span class="sr-only"> (opens in a new tab)</span></a></li>'; }).join('') + '</ul><p class="v31-bibliography"><a href="atlas-sources.html#' + v31Esc(id) + '">Read these references in the atlas bibliography</a></p></div></details>' +
    v31StudyHtml(id, rows.filter(function (r) { return !r.orphan; })) +
    '<nav class="v31-neighbours" aria-label="More maps">' + (at > 0 ? '<button type="button" class="v31-back" data-atlas-next="' + sheets[at - 1].id + '">Previous: ' + v31Esc(sheets[at - 1].name) + '</button>' : '') +
    '<button type="button" class="v31-back" data-atlas-next="">All maps</button>' + (at + 1 < sheets.length ? '<button type="button" class="v31-back" data-atlas-next="' + sheets[at + 1].id + '">Next: ' + v31Esc(sheets[at + 1].name) + '</button>' : '') + '</nav></article>';
  var view = el(html);
  view.querySelector('#atlas-back').onclick = function () { S.wmap = null; render(); };
  view.querySelector('#atlas-open').onclick = view.querySelector('#atlas-enlarge').onclick = function () { v23Open(id); };
  Array.prototype.forEach.call(view.querySelectorAll('[data-atlas-next]'), function (button) { button.onclick = function () { S.wmap = button.getAttribute('data-atlas-next') || null; render(); }; });
  Array.prototype.forEach.call(view.querySelectorAll('[data-atlas-drill]'), function (button) { button.onclick = function () { startDrill(button.getAttribute('data-atlas-drill')); }; });
  Array.prototype.forEach.call(view.querySelectorAll('[data-atlas-chapter]'), function (button) { button.onclick = function () { v25OpenChapter(button.getAttribute('data-atlas-chapter')); }; });
  v31WireImages(view);
  return view;
};
worldMapView = function () { return S.wmap && v31Sheet(S.wmap) ? v23SheetView(S.wmap) : v23GridView(); };

/* A native dialog isolates the map from the quiz and flashcard keyboard
   handlers. Pixel-sized artwork sits in a scrollable plane, so every corner
   remains reachable by pointer, touch and keyboard at every zoom level. */
v23Open = function (id) {
  var data = v31Sheet(id);
  if (!data) return;
  if (V31.viewer) V31.viewer.close();
  var restore = document.activeElement, priorOverflow = document.body.style.overflow;
  var dialog = document.createElement('dialog');
  dialog.className = 'v31-viewer';
  dialog.setAttribute('aria-labelledby', 'atlas-viewer-title');
  dialog.setAttribute('aria-describedby', 'atlas-viewer-help');
  dialog.innerHTML = '<div class="v31-viewer-top"><h2 id="atlas-viewer-title">' + v31Esc(v31Name(id)) + '</h2><button type="button" class="v31-btn" data-viewer="close" autofocus>Close map</button></div>' +
    '<div class="v31-viewer-tools"><button type="button" class="v31-btn" data-viewer="out">Zoom out</button><button type="button" class="v31-btn" data-viewer="fit">Fit map</button><button type="button" class="v31-btn" data-viewer="in">Zoom in</button><span class="v31-zoom-value" aria-live="polite">100%</span></div>' +
    '<p id="atlas-viewer-help">Zoom with the controls or + and −. Drag to pan, or focus the map and use arrow keys. Press 0 to fit and Escape to close.</p>' +
    '<div class="v31-canvas" tabindex="0" role="region" aria-label="Scrollable map of ' + v31Esc(v31Name(id)) + '"><div class="v31-plane"><img src="' + v31Esc(mapFile(id)) + '" width="' + data.width + '" height="' + data.height + '" alt="Numbered wine regions of ' + v31Esc(v31Name(id)) + '; names appear in the region key." draggable="false"></div><p class="v31-viewer-fail" role="status" hidden>Map artwork could not load. The numbered region key remains available.</p></div>' +
    '<details class="v31-viewer-key"><summary>Numbered region key</summary><ol>' + data.regions.map(function (r, index) { return '<li><span>' + (index + 1) + '</span><b>' + v31Esc(r.name) + '</b><small>' + r.anchors.map(function (a) { return v31Esc(a.label); }).join(' · ') + '</small></li>'; }).join('') + '</ol></details>';
  document.body.appendChild(dialog);
  var canvas = dialog.querySelector('.v31-canvas'), plane = dialog.querySelector('.v31-plane'), image = plane.querySelector('img');
  var zoom = 1, fitWidth = 1, failed = false, cleaned = false, pointers = {}, gesture = null;
  function draw() {
    var width = fitWidth * zoom, height = width * data.height / data.width;
    plane.style.width = width + 'px'; plane.style.height = height + 'px';
    image.style.width = width + 'px'; image.style.height = height + 'px';
    dialog.querySelector('.v31-zoom-value').textContent = Math.round(zoom * 100) + '%';
    dialog.querySelector('[data-viewer="out"]').disabled = failed || zoom <= 1;
    dialog.querySelector('[data-viewer="in"]').disabled = failed || zoom >= 8;
    dialog.querySelector('[data-viewer="fit"]').disabled = failed;
    canvas.classList.toggle('is-zoomed', zoom > 1);
  }
  function measure() {
    fitWidth = Math.max(1, Math.min(canvas.clientWidth, canvas.clientHeight * data.width / data.height));
    draw();
  }
  function zoomTo(next, x, y) {
    if (failed) return;
    x = x == null ? canvas.clientWidth / 2 : x; y = y == null ? canvas.clientHeight / 2 : y;
    var oldWidth = fitWidth * zoom, oldHeight = oldWidth * data.height / data.width;
    var fx = (canvas.scrollLeft + x - Math.max(canvas.clientWidth, oldWidth) / 2) / oldWidth;
    var fy = (canvas.scrollTop + y - Math.max(canvas.clientHeight, oldHeight) / 2) / oldHeight;
    zoom = Math.max(1, Math.min(8, next)); draw();
    var width = fitWidth * zoom, height = width * data.height / data.width;
    canvas.scrollLeft = Math.max(canvas.clientWidth, width) / 2 + fx * width - x;
    canvas.scrollTop = Math.max(canvas.clientHeight, height) / 2 + fy * height - y;
  }
  function fit() { zoom = 1; measure(); canvas.scrollLeft = 0; canvas.scrollTop = 0; }
  function close() { if (dialog.open) dialog.close(); clean(); }
  function clean() {
    if (cleaned) return;
    cleaned = true;
    window.removeEventListener('resize', measure);
    document.body.style.overflow = priorOverflow;
    if (dialog.parentNode) dialog.parentNode.removeChild(dialog);
    if (V31.viewer && V31.viewer.node === dialog) V31.viewer = null;
    if (restore && restore.isConnected && restore.focus) restore.focus({ preventScroll: true });
  }
  dialog.addEventListener('close', clean, { once: true });
  dialog.querySelector('[data-viewer="close"]').onclick = close;
  dialog.querySelector('[data-viewer="in"]').onclick = function () { zoomTo(zoom * 1.5); };
  dialog.querySelector('[data-viewer="out"]').onclick = function () { zoomTo(zoom / 1.5); };
  dialog.querySelector('[data-viewer="fit"]').onclick = fit;
  dialog.querySelector('.v31-viewer-key').addEventListener('toggle', measure);
  dialog.addEventListener('keydown', function (event) {
    event.stopPropagation();
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    var key = event.key;
    if (key === 'Tab') {
      var controls = Array.prototype.filter.call(dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex], summary'), function (node) {
        return !node.disabled && node.getAttribute('tabindex') !== '-1' && node.getClientRects().length > 0;
      });
      var index = controls.indexOf(document.activeElement);
      if (controls.length && ((event.shiftKey && index <= 0) || (!event.shiftKey && (index < 0 || index === controls.length - 1)))) {
        event.preventDefault(); controls[event.shiftKey ? controls.length - 1 : 0].focus();
      }
    }
    else if (key === '+' || key === '=') { event.preventDefault(); zoomTo(zoom * 1.3); }
    else if (key === '-') { event.preventDefault(); zoomTo(zoom / 1.3); }
    else if (key === '0') { event.preventDefault(); fit(); }
    else if (event.target === canvas && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(key) >= 0) {
      event.preventDefault(); var step = event.shiftKey ? 160 : 60;
      if (key === 'ArrowLeft') canvas.scrollLeft -= step;
      if (key === 'ArrowRight') canvas.scrollLeft += step;
      if (key === 'ArrowUp') canvas.scrollTop -= step;
      if (key === 'ArrowDown') canvas.scrollTop += step;
    }
  });
  canvas.addEventListener('wheel', function (event) {
    if (!event.ctrlKey) return;
    event.preventDefault(); var box = canvas.getBoundingClientRect();
    zoomTo(zoom * (event.deltaY < 0 ? 1.15 : 1 / 1.15), event.clientX - box.left, event.clientY - box.top);
  }, { passive: false });
  canvas.addEventListener('dblclick', function (event) { var box = canvas.getBoundingClientRect(); zoomTo(zoom > 1 ? 1 : 3, event.clientX - box.left, event.clientY - box.top); });
  canvas.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointers[event.pointerId] = { x: event.clientX, y: event.clientY };
    try { canvas.setPointerCapture(event.pointerId); } catch (e) { }
    var ids = Object.keys(pointers);
    if (ids.length === 2) {
      var a = pointers[ids[0]], b = pointers[ids[1]];
      gesture = { distance: Math.hypot(a.x - b.x, a.y - b.y) || 1, zoom: zoom };
    }
  });
  canvas.addEventListener('pointermove', function (event) {
    var previous = pointers[event.pointerId]; if (!previous) return;
    pointers[event.pointerId] = { x: event.clientX, y: event.clientY };
    var ids = Object.keys(pointers);
    if (ids.length === 2 && gesture) {
      var a = pointers[ids[0]], b = pointers[ids[1]], box = canvas.getBoundingClientRect();
      zoomTo(gesture.zoom * Math.hypot(a.x - b.x, a.y - b.y) / gesture.distance, (a.x + b.x) / 2 - box.left, (a.y + b.y) / 2 - box.top);
    } else if (ids.length === 1 && zoom > 1) {
      canvas.scrollLeft -= event.clientX - previous.x; canvas.scrollTop -= event.clientY - previous.y;
    }
  });
  function pointerUp(event) { delete pointers[event.pointerId]; gesture = null; }
  canvas.addEventListener('pointerup', pointerUp); canvas.addEventListener('pointercancel', pointerUp);
  image.addEventListener('load', measure);
  function fail() { failed = true; plane.hidden = true; dialog.querySelector('.v31-viewer-fail').hidden = false; draw(); }
  image.addEventListener('error', fail);
  document.body.style.overflow = 'hidden';
  V31.viewer = { node: dialog, close: close };
  dialog.showModal(); measure();
  if (image.complete && !image.naturalWidth) fail();
  window.addEventListener('resize', measure);
};

/* Exact, conservative links for named profiles. Open as a reading overlay:
   neither the deck order nor the revealed card changes when the map closes. */
var V31_GRAPE_MAPS = {
  'Cabernet Sauvignon': ['france', 'california'], 'Chardonnay': ['france', 'california', 'australia'],
  'Pinot Noir': ['france', 'oregon', 'new-zealand'], 'Riesling': ['germany', 'austria', 'france'],
  'Malbec': ['argentina', 'france'], 'Nebbiolo': ['italy']
};
function v31FlashMaps() {
  if (S.view !== 'flash' || !S.fc || !S.fc.flip || !S.fc.deck || !S.fc.deck.length) return;
  var grape = GRAPES[S.fc.deck[0]], ids = grape && V31_GRAPE_MAPS[grape.g];
  var card = document.getElementById('fcard');
  if (!ids || !card || document.querySelector('.v31-flash-maps')) return;
  ids = ids.filter(function (id) { return !!v31Sheet(id); });
  if (!ids.length) return;
  var box = el('<aside class="v31-flash-maps" aria-label="Maps for this grape"><h3>Place it on the map</h3><p>Open a map, then return to this same card.</p><div>' + ids.map(function (id) { return '<button type="button" class="v31-btn v31-secondary" data-flash-map="' + id + '">' + v31Esc(v31Name(id)) + '</button>'; }).join('') + '</div></aside>');
  var stage = card.parentNode;
  stage.parentNode.insertBefore(box, stage.nextSibling);
  Array.prototype.forEach.call(box.querySelectorAll('[data-flash-map]'), function (button) {
    button.onclick = function () { v23Open(button.getAttribute('data-flash-map')); };
    button.onkeydown = function (event) { event.stopPropagation(); };
  });
}
var _v31Render = render;
render = function () {
  if (V31.viewer) V31.viewer.close();
  var result = _v31Render.apply(this, arguments);
  v31RefreshStorage(); v31FlashMaps();
  return result;
};
