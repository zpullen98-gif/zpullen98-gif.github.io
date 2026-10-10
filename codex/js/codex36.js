/* Codex XXXVI: illustrated studies, exact teaching joins and ungraded recall.
   No new storage or marks. Closed guides make no picture request; card doors
   exist only on the revealed face and open a modal without changing the run. */
function v36Data() { return typeof CODEX_VISUAL_STUDIES === 'object' && CODEX_VISUAL_STUDIES ? CODEX_VISUAL_STUDIES : {}; }
function v36Ids(ids) {
  return (Array.isArray(ids) ? ids : []).filter(function (id, i, all) {
    return typeof id === 'string' && all.indexOf(id) === i && CodexTeachingCache.entry(id);
  });
}
function v36Mapped(kind, key) {
  var map = v36Data()[kind];
  return map && Object.prototype.hasOwnProperty.call(map, key) ? v36Ids(map[key]) : [];
}
function v36WineGuides(item) { return item && item.id ? v36Mapped('wineGuides', item.id) : []; }
function v36CardGuides(card) {
  if (!card) return [];
  if (card.kind === 'house') return v36WineGuides(card);
  if (card.kind === 'component') return v36Mapped('componentGuides', card.id);
  if (card.kind === 'grape' && card.g) return v36Mapped('grapeGuides', card.g.g);
  return [];
}
function v36Go(id) {
  S._v36study = CodexTeachingCache.entry(id) ? id : '';
  S.view = 'illustrations'; S._v25area = 'library';
  if (typeof V32 !== 'undefined') V32.pend = 'push';
  render();
}
function v36Button(text, action, className) {
  var button = v33Node('button', className || 'btn ghost', text);
  button.type = 'button'; button.onclick = action; return button;
}

/* Practice is deliberately outside the marked exercises. The answer remains
   closed in both the reading page and enlarged viewer until explicitly opened. */
var _v36Key = v33Key;
v33Key = function (item) {
  var view = _v36Key.apply(this, arguments), recall = (v36Data().recall || {})[item.id];
  if (item.id === 'service-bottle-check') {
    var labelStudy = v33Node('section', 'v36-label-study');
    labelStudy.appendChild(v33Node('h3', '', 'Practice example: fictional label'));
    labelStudy.appendChild(v33Node('p', '', 'Order requested: Example Estate Pinot Noir 2022 · 750 ml'));
    var label = v33Node('dl', 'v36-practice-label');
    [['Producer', 'Example Estate'], ['Wine', 'Pinot Noir'], ['Vintage', '2023'], ['Bottle size', '750 ml']].forEach(function (row) {
      label.appendChild(v33Node('dt', '', row[0])); label.appendChild(v33Node('dd', '', row[1]));
    });
    labelStudy.appendChild(label);
    var mismatch = v33Node('details', 'v36-answer');
    mismatch.appendChild(v33Node('summary', '', 'Reveal the detail to check'));
    mismatch.appendChild(v33Node('p', '', 'The bottle says 2023; the order requests 2022. Pause and confirm the vintage with the guest before opening. This fictional example teaches a comparison, not a Brennan’s bottle identity.'));
    labelStudy.appendChild(mismatch); view.insertBefore(labelStudy, view.querySelector('.v33-sources'));
  }
  if (recall && recall.question && recall.answer) {
    var box = v33Node('section', 'v36-recall');
    box.appendChild(v33Node('h3', '', 'Practise aloud'));
    box.appendChild(v33Node('p', '', recall.question));
    var reveal = v33Node('details', 'v36-answer');
    reveal.appendChild(v33Node('summary', '', 'Reveal practice answer'));
    reveal.appendChild(v33Node('p', '', recall.answer)); box.appendChild(reveal);
    if (recall.practise) box.appendChild(v33Node('p', 'v36-practise', recall.practise));
    box.appendChild(v33Node('p', 'v36-small', 'Optional practice. No score or study mark is recorded.'));
    view.insertBefore(box, view.querySelector('.v33-sources'));
  }
  return view;
};

/* Look only in this installation's exact, registered cache. A successful
   picture load does not by itself prove that the worker saved the picture. */
function v36SavedText(item) {
  if (typeof caches === 'undefined') return Promise.resolve('Offline saving is unavailable here. The reading guide remains available.');
  var name = CodexTeachingCache.cacheName(item.kind, location.href);
  return caches.keys().then(function (names) {
    if (names.indexOf(name) < 0) return [];
    return caches.open(name).then(function (cache) {
      return Promise.all([item.file, item.thumb && item.thumb.file].map(function (file) {
        if (!file) return false;
        var url = new URL(file, location.href).href;
        if (!CodexTeachingCache.match(url, location.href)) return false;
        return cache.match(url).then(function (hit) { return !!(hit && hit.status === 200); });
      }));
    });
  }).then(function (saved) {
    if (saved[0]) return 'Full illustration saved on this device for offline reading.';
    if (saved[1]) return 'Smaller illustration saved on this device for offline reading.';
    return 'An offline copy has not been confirmed. The reading guide remains available.';
  }).catch(function () { return 'Offline saving could not be checked. The reading guide remains available.'; });
}
function v36ImageStatus(image, box, item) {
  var status = box.querySelector('.v36-save-status');
  if (!status) { status = v33Node('p', 'v36-save-status'); box.appendChild(status); }
  var token = (status._v36token || 0) + 1; status._v36token = token;
  v36SavedText(item).then(function (text) { if (status._v36token === token) status.textContent = text; });
}

/* One deliberate retry starts a fresh pair of attempts at the same registered
   URLs. No cache-busting URL and no unregistered download is introduced. */
v33ImageFallback = function (image, box) {
  var tried = {}, retried = false, item = CodexTeachingCache.entry(image.getAttribute('data-teaching-picture'));
  if (!item) return;
  function clearFailure() {
    var message = box.querySelector('.v33-unavailable'), retry = box.querySelector('.v36-retry');
    if (message) message.remove(); if (retry) retry.remove();
  }
  function loaded() {
    image.hidden = false; clearFailure();
    var enlarge = box.querySelector('.v33-enlarge'); if (enlarge) enlarge.hidden = false;
    if (retried) { retried = false; if (enlarge) enlarge.focus(); else if (box.classList.contains('v33-canvas')) box.focus(); }
    v36ImageStatus(image, box, item);
  }
  function failed() {
    var failedUrl = image.currentSrc || image.src; tried[failedUrl] = true;
    var next = [item.file, item.thumb && item.thumb.file].filter(Boolean).map(function (file) { return new URL(file, location.href).href; })
      .find(function (url) { return url !== failedUrl && !tried[url] && CodexTeachingCache.match(url, location.href); });
    if (next) {
      tried[next] = true; image.removeAttribute('srcset'); image.removeAttribute('sizes'); image.src = next; return;
    }
    image.hidden = true;
    var enlarge = box.querySelector('.v33-enlarge'); if (enlarge) enlarge.hidden = true;
    if (!box.querySelector('.v33-unavailable')) {
      box.appendChild(v33Node('p', 'v33-unavailable', 'The illustration could not be loaded. Its reading guide and practice remain below.'));
      box.appendChild(v36Button('Retry illustration', function () {
        tried = {}; retried = true; clearFailure(); image.hidden = false;
        image.removeAttribute('srcset'); image.removeAttribute('sizes');
        image.removeAttribute('data-teaching-loaded'); image.removeAttribute('src');
        image.src = item.file;
      }, 'btn ghost v36-retry'));
    }
    if (retried) { retried = false; box.querySelector('.v36-retry').focus(); }
    v36ImageStatus(image, box, item);
  }
  image.addEventListener('load', loaded); image.addEventListener('error', failed);
  if (image.getAttribute('src') && image.complete) { if (image.naturalWidth) loaded(); else failed(); }
};

var _v36Enlarge = v33Enlarge;
v33Enlarge = function (item, opener) {
  if (!item || !CodexTeachingCache.entry(item.id) || typeof HTMLDialogElement !== 'function') return;
  _v36Enlarge.apply(this, arguments);
  var dialogs = document.querySelectorAll('.v33-viewer'), dialog = dialogs[dialogs.length - 1];
  if (dialog) {
    // Native button activation, Tab and Escape remain intact. Stop the event
    // before it can reach the document's flip/grade/next keyboard shortcuts.
    dialog.addEventListener('keydown', function (event) { event.stopPropagation(); }, true);
    dialog.addEventListener('keyup', function (event) { event.stopPropagation(); }, true);
  }
};

function v36Related(id) {
  var house = typeof v35House === 'function' ? v35House() : null;
  var wines = house && Array.isArray(house.wines) ? house.wines.filter(function (wine) { return v36WineGuides(wine).indexOf(id) >= 0; }) : [];
  if (!wines.length) return null;
  var detail = v33Node('details', 'v36-related');
  detail.appendChild(v33Node('summary', '', 'Practise with our wine list (' + wines.length + ')'));
  var built = false;
  detail.addEventListener('toggle', function () {
    if (!detail.open || built) return;
    built = true;
    var search = null, limit = 8, query = '', matches = wines;
    if (wines.length > 8) {
      var label = v33Node('label', 'v36-related-label', 'Find a wine for this study');
      label.htmlFor = 'v36-related-search-' + id;
      search = v33Node('input', 'sainput v36-related-search');
      search.type = 'search'; search.id = label.htmlFor; search.placeholder = 'Wine, producer, grape or region'; search.autocomplete = 'off';
      detail.appendChild(label); detail.appendChild(search);
    }
    var count = v33Node('p', 'v36-small'); count.setAttribute('role', 'status'); count.setAttribute('aria-live', 'polite');
    var list = v33Node('ul'), more = v36Button('Show more wines', function () { limit += 8; draw(); }, 'btn ghost v36-related-more');
    detail.appendChild(count); detail.appendChild(list); detail.appendChild(more);
    function fold(text) { var value = String(text || '').toLocaleLowerCase(); return typeof value.normalize === 'function' ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : value; }
    function draw() {
      matches = wines.filter(function (wine) { return !query || fold([wine.name, wine.producer, wine.grapes, wine.region, wine.section].join(' ')).indexOf(query) >= 0; });
      list.textContent = '';
      matches.slice(0, limit).forEach(function (wine) {
        var row = v33Node('li');
        row.appendChild(v36Button(wine.name, function () {
          v32Apply({ view: 'cellar', arg: wine.id }, null);
          if (typeof V32 !== 'undefined') V32.pend = 'push'; render();
        }, 'v36-text-button')); list.appendChild(row);
      });
      count.textContent = matches.length ? 'Showing ' + Math.min(limit, matches.length) + ' of ' + matches.length + (matches.length === 1 ? ' wine.' : ' wines.') : 'No wines match. Try a shorter name, grape or region.';
      more.hidden = limit >= matches.length;
      more.textContent = 'Show more wines (' + Math.max(0, matches.length - limit) + ' remaining)';
    }
    if (search) search.oninput = function () { query = fold(search.value.trim()); limit = 8; draw(); };
    draw();
  });
  return detail;
}
function v36IllustrationsView() {
  var data = v36Data(), selected = CodexTeachingCache.entry(S._v36study);
  var view = v33Node('div', 'v25page v36-studies');
  var head = v33Node('div', 'viewhead'), title = v33Node('h2', 'v32-h', selected ? selected.title : 'Illustrated studies');
  title.tabIndex = -1; head.appendChild(title);
  head.appendChild(v33Node('p', 'sub', 'Observe the detail. Explain what it means. Rehearse the hospitality.'));
  view.appendChild(head);
  view.appendChild(v33Node('p', 'v36-intro', 'Open one guide at a time for the picture, readable teaching notes and a short practice question. Wine colours and physical actions stay true to the subject in both day and night service.'));
  var state = S._v36filter || (S._v36filter = { q: '', group: '' });
  var groups = Array.isArray(data.groups) ? data.groups : [];
  if (state.group && !groups.some(function (group) { return group.id === state.group; })) state.group = '';
  var controls = v33Node('div', 'v36-controls'), search, filters = [], rows = [], sections = [];
  var count = v33Node('p', 'v36-count'); count.setAttribute('role', 'status'); count.setAttribute('aria-live', 'polite');
  if (selected) controls.appendChild(v36Button('All illustrated studies', function () { v36Go(''); }));
  else {
    var label = v33Node('label', 'v36-search-label', 'Find an illustrated study'); label.htmlFor = 'v36-search';
    search = v33Node('input', 'sainput'); search.id = 'v36-search'; search.type = 'search'; search.value = state.q || '';
    search.placeholder = 'Try cork, colour, sparkling or sediment'; search.autocomplete = 'off';
    controls.appendChild(label); controls.appendChild(search);
    var filter = v33Node('div', 'v36-filters'); filter.setAttribute('role', 'group'); filter.setAttribute('aria-label', 'Study collection');
    [{ id: '', title: 'All studies' }].concat(groups).forEach(function (group) {
      var button = v36Button(group.title, function () { state.group = group.id; update(); }, 'v28-chip');
      filters.push({ button: button, id: group.id }); filter.appendChild(button);
    });
    controls.appendChild(filter);
  }
  view.appendChild(controls); view.appendChild(count);
  var seen = [];
  groups.forEach(function (group) {
    var ids = v36Ids(group.ids).filter(function (id) { return seen.indexOf(id) < 0 && (!selected || selected.id === id); });
    if (!ids.length) return;
    var section = v33Node('section', 'v36-collection'); section.appendChild(v33Node('h3', '', group.title));
    var own = [];
    ids.forEach(function (id) {
      seen.push(id); var item = CodexTeachingCache.entry(id), article = v33Node('article', 'v36-study');
      var purpose = (data.purposes || {})[id];
      if (purpose) article.appendChild(v33Node('p', 'v36-purpose', purpose));
      var figure = v33TeachingFigure(id); if (!figure) return;
      article.appendChild(figure);
      var related = v36Related(id); if (related) article.appendChild(related);
      if (selected) figure.open = true;
      var row = { node: article, group: group.id, text: [item.title, purpose, item.caption, item.key.map(function (k) { return k.join(' '); }).join(' ')].join(' ').toLocaleLowerCase() };
      rows.push(row); own.push(row); section.appendChild(article);
    });
    sections.push({ node: section, rows: own }); view.appendChild(section);
  });
  // An exact registered deep link remains useful even if an editorial group
  // is temporarily absent from a partial local installation.
  if (selected && seen.indexOf(selected.id) < 0) { var single = v33TeachingFigure(selected.id); if (single) { view.appendChild(single); single.open = true; } }
  var empty = v33Node('p', 'v36-empty', 'No studies match. Try a shorter search or choose All studies.'); view.appendChild(empty);
  function update() {
    var q = String(state.q || '').trim().toLocaleLowerCase(), n = 0;
    rows.forEach(function (row) { row.node.hidden = !selected && (!!state.group && state.group !== row.group || !!q && row.text.indexOf(q) < 0); if (!row.node.hidden) n++; });
    sections.forEach(function (section) { section.node.hidden = section.rows.every(function (row) { return row.node.hidden; }); });
    filters.forEach(function (f) { f.button.setAttribute('aria-pressed', String(f.id === state.group)); });
    empty.hidden = !!selected || n > 0; count.textContent = selected ? 'One illustrated study' : n + (n === 1 ? ' study' : ' studies');
  }
  if (search) search.oninput = function () { state.q = search.value; update(); };
  update(); return view;
}

V25_VIEWS.illustrations = v36IllustrationsView;
V32_PARENT.illustrations = 'library'; V32_OWNER.illustrations = 'library';
if (typeof V25_UNDER !== 'undefined') V25_UNDER.illustrations = 'library';
var _v36Arg = v32Arg;
v32Arg = function (view) { return view === 'illustrations' ? S._v36study || '' : _v36Arg.apply(this, arguments); };
var _v36Apply = v32Apply;
v32Apply = function (route, state) {
  if (route && route.view === 'illustrations') {
    S._v36study = CodexTeachingCache.entry(route.arg) ? route.arg : '';
    S.view = 'illustrations'; S._v25area = 'library'; return { view: 'illustrations', arg: S._v36study };
  }
  return _v36Apply.apply(this, arguments);
};
/* The base router parsed the address before this view was registered. Adopt
   only this layer's initial route after its argument handler is ready. Keep
   the existing entry and reload depth, and never undo a later navigation. */
(function () {
  if (typeof V32 === 'undefined' || V32.moved || typeof v32Parse !== 'function') return;
  var hash = V32.initialHash;
  if (typeof hash !== 'string' || !/^#\/v\/illustrations(?:\/|$)/.test(hash)) return;
  var route = v32Parse(hash);
  if (!route || route.view !== 'illustrations') return;
  v32Apply(route, typeof v32CurState === 'function' ? v32CurState() : null);
  V32.pend = 'replace';
})();

var _v36Library = v32LibraryView;
v32LibraryView = function () {
  var view = _v36Library.apply(this, arguments), door = v33Node('section', 'v36-library-door');
  door.appendChild(v33Node('h3', '', 'Learn through the details'));
  door.appendChild(v33Node('p', '', 'Bottle clues, wine in the glass and the hands of service, with short spoken practice.'));
  door.appendChild(v36Button('Explore illustrated studies', function () { v36Go(''); }, 'btn gold'));
  var anchor = view.querySelector('.codexfind');
  (anchor ? anchor.parentNode : view).insertBefore(door, anchor); return view;
};
V25_VIEWS.library = v32LibraryView;
var _v36Level = v32LevelView;
v32LevelView = function () {
  var view = _v36Level.apply(this, arguments), container = view.querySelector('.v32-level') || view;
  var line = v33Node('p', 'v36-level-door');
  line.appendChild(v36Button('Illustrated studies: observe, explain, rehearse', function () { v36Go(''); }, 'v36-text-button'));
  container.insertBefore(line, container.querySelector('.v32-sec')); return view;
};
V25_VIEWS.level = v32LevelView; V25_VIEWS.today = v32LevelView;

var _v36Primer = primerView;
primerView = function () {
  var view = _v36Primer.apply(this, arguments), primer = typeof PRIMERS !== 'undefined' ? PRIMERS.find(function (p) { return p.cat === S.primerKey; }) || PRIMERS[S.primerKey] : null;
  if (primer) v33Append(view, v36Mapped('primerGuides', primer.cat || primer.id), view.querySelector('.centerrow'));
  return view;
};
var _v36Service = serviceView;
serviceView = function () {
  var view = _v36Service.apply(this, arguments), headings = Array.prototype.slice.call(view.querySelectorAll('.secgroup'));
  var mapping = { 'Mise en Place': ['service-bottle-check'], 'Opening Still Wine': ['service-still-opening'], 'Sparkling Wine': ['service-sparkling-control'], 'The Decanting Ritual': ['service-decanting'] };
  headings.forEach(function (head, i) {
    var name = String(head.firstChild && head.firstChild.textContent || head.textContent).trim(), ids = mapping[name];
    if (ids) v33Append(view, v36Ids(ids), headings[i + 1] || view.querySelector('.centerrow'));
  });
  return view;
};

/* Append after the face, ahead of grade controls. Buttons request no picture
   until pressed; no hidden answer, image URL or alt appears on the front. */
var _v36CardFace = v32CardFace;
v32CardFace = function (card, run) {
  var html = _v36CardFace.apply(this, arguments);
  if (!run || !run.flip || typeof HTMLDialogElement !== 'function') return html;
  var ids = v36CardGuides(card); if (!ids.length) return html;
  return html + '<section class="v36-card-guides" aria-label="Illustrated practice"><p>Look closer before the next card</p><div>' + ids.map(function (id) {
    var item = CodexTeachingCache.entry(id);
    return '<button type="button" class="btn ghost" data-v36-guide="' + v32Esc(id) + '">' + v32Esc(item.title) + '</button>';
  }).join('') + '</div></section>';
};
var _v36CardView = v32CardView;
v32CardView = function () {
  var view = _v36CardView.apply(this, arguments);
  Array.prototype.forEach.call(view.querySelectorAll('[data-v36-guide]'), function (button) {
    button.onclick = function () {
      var run = S._v32run, id = button.getAttribute('data-v36-guide'), card = typeof v32RunCard === 'function' ? v32RunCard() : null;
      if (!run || !run.flip || v36CardGuides(card).indexOf(id) < 0) return;
      v33Enlarge(CodexTeachingCache.entry(id), button);
    };
    button.addEventListener('keydown', function (event) { event.stopPropagation(); });
  });
  return view;
};
V25_VIEWS.housedeck = v32CardView; V25_VIEWS.flash = v32CardView;
