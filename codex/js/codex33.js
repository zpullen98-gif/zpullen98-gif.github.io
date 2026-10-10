/* Codex XXXIII: illustrated reading guides, outside every question/card run.
   Opening a guide is the only trigger for its picture request. Its full text
   remains useful when the network is absent or no artwork has been delivered. */
function v33Node(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function v33Image(item, full) {
  var image = v33Node('img', 'v33-image');
  image.alt = item.alt; image.width = item.width; image.height = item.height;
  image.setAttribute('data-teaching-picture', item.id);
  image.decoding = 'async'; image.loading = 'lazy';
  image.addEventListener('load', function () {
    image.setAttribute('data-teaching-loaded', image.currentSrc || image.src);
  });
  if (navigator.onLine === false) {
    // Choose a saved rendition before requesting anything. A network timeout
    // should never blank a picture the reader already has on the device.
    var files = full ? [item.file, item.thumb && item.thumb.file] : [item.thumb && item.thumb.file, item.file];
    files = files.filter(Boolean);
    var saved = typeof caches === 'undefined' ? Promise.resolve(null) : caches.open(CodexTeachingCache.cacheName(item.kind, location.href)).then(function (cache) {
      return Promise.all(files.map(function (file) {
        return cache.match(new URL(file, location.href).href).then(function (hit) { return hit && hit.status === 200 ? file : null; });
      })).then(function (matches) { return matches.find(Boolean); });
    });
    saved.catch(function () { return null; }).then(function (file) { image.src = file || item.file; });
    return image;
  }
  if (!full && item.thumb && CodexTeachingCache.match(new URL(item.thumb.file, location.href).href, location.href)) {
    image.srcset = item.thumb.file + ' ' + item.thumb.width + 'w, ' + item.file + ' ' + item.width + 'w';
    image.sizes = '(max-width:599px) calc(100vw - 76px), 900px';
  }
  image.src = item.file;
  return image;
}
function v33ImageFallback(image, box) {
  var tried = {};
  var failed = function () {
    var item = CodexTeachingCache.entry(image.getAttribute('data-teaching-picture'));
    var failedUrl = image.currentSrc || image.src;
    tried[failedUrl] = true;
    // A phone may have saved only the thumbnail. Rotation or enlargement must
    // still use that rendition if the larger one is unavailable (and vice versa).
    var alternative = item && [item.file, item.thumb && item.thumb.file].filter(Boolean).map(function (file) {
      return new URL(file, location.href).href;
    }).find(function (url) { return url !== failedUrl && !tried[url] && CodexTeachingCache.match(url, location.href); });
    if (alternative) {
      tried[alternative] = true;
      image.removeAttribute('srcset'); image.removeAttribute('sizes');
      image.src = alternative;
      return;
    }
    image.hidden = true;
    var enlarge = box.querySelector('.v33-enlarge'); if (enlarge) enlarge.hidden = true;
    if (box.querySelector('.v33-unavailable')) return;
    box.appendChild(v33Node('p', 'v33-unavailable', 'The illustration is unavailable. Its reading guide is below; reconnect and reopen this guide to try the picture again.'));
  };
  image.addEventListener('error', failed);
  if (image.getAttribute('src') && image.complete && !image.naturalWidth) failed();
}
window.addEventListener('offline', function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-teaching-loaded]'), function (image) {
    var saved = image.getAttribute('data-teaching-loaded');
    if (!saved || !CodexTeachingCache.match(saved, location.href)) return;
    image.removeAttribute('srcset'); image.removeAttribute('sizes'); image.src = saved;
  });
});
function v33Key(item) {
  var text = v33Node('div', 'v33-reading');
  text.appendChild(v33Node('p', 'v33-caption', item.caption));
  if (item.kind === 'zoom' && item.scope) text.appendChild(v33Node('p', 'v33-note', item.scope));
  if (item.kind === 'zoom' && Array.isArray(item.reading)) {
    var reading = v33Node('ul');
    item.reading.forEach(function (line) { reading.appendChild(v33Node('li', '', line)); }); text.appendChild(reading);
  }
  var list = v33Node('ol', 'v33-key');
  item.key.forEach(function (row) {
    var li = v33Node('li'); li.appendChild(v33Node('strong', '', row[0] + '. '));
    li.appendChild(document.createTextNode(row[1])); list.appendChild(li);
  });
  text.appendChild(list);
  if (item.note) text.appendChild(v33Node('p', 'v33-note', item.note));
  var sources = v33Node('details', 'v33-sources');
  sources.appendChild(v33Node('summary', '', 'Sources and further reading'));
  var links = v33Node('ul');
  item.sources.forEach(function (source) {
    if (!source || !/^https:\/\//.test(source.url || '')) return;
    var li = v33Node('li'), a = v33Node('a', '', source.title);
    a.href = source.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    li.appendChild(a); links.appendChild(li);
  });
  sources.appendChild(links); text.appendChild(sources);
  return text;
}
function v33Enlarge(item, opener) {
  var dialog = v33Node('dialog', 'v33-viewer');
  var header = v33Node('div', 'v33-viewer-bar');
  var title = v33Node('h2', '', item.title); title.id = 'v33-viewer-title';
  dialog.setAttribute('aria-labelledby', title.id); header.appendChild(title);
  var zoom = v33Node('button', 'btn ghost', 'View at full size'); zoom.type = 'button'; zoom.setAttribute('aria-pressed', 'false');
  var close = v33Node('button', 'btn', 'Close illustration'); close.type = 'button';
  header.appendChild(zoom); header.appendChild(close); dialog.appendChild(header);
  var canvas = v33Node('div', 'v33-canvas'), image = v33Image(item, true);
  image.loading = 'eager'; canvas.tabIndex = 0; canvas.setAttribute('aria-label', 'Illustration; scroll to explore at full size');
  var resolution = v33Node('p', 'v33-resolution', 'Showing the smaller saved illustration. Reconnect for full detail.'); resolution.hidden = true;
  dialog.appendChild(resolution);
  image.addEventListener('load', function () { resolution.hidden = !(item.thumb && image.currentSrc === new URL(item.thumb.file, location.href).href); });
  canvas.appendChild(image); dialog.appendChild(canvas); v33ImageFallback(image, canvas);
  dialog.appendChild(v33Key(item));
  zoom.onclick = function () {
    var full = zoom.getAttribute('aria-pressed') !== 'true';
    zoom.setAttribute('aria-pressed', String(full)); zoom.textContent = full ? 'Fit illustration' : 'View at full size';
    var width = item.thumb && image.currentSrc === new URL(item.thumb.file, location.href).href ? item.thumb.width : item.width;
    image.style.width = full ? width + 'px' : ''; image.style.maxWidth = full ? 'none' : '';
  };
  close.onclick = function () { dialog.close(); };
  dialog.addEventListener('close', function () { dialog.remove(); if (opener && opener.isConnected) opener.focus(); });
  document.body.appendChild(dialog); dialog.showModal(); close.focus();
}
function v33TeachingFigure(id) {
  var item = CodexTeachingCache.entry(id);
  if (!item) return null;
  var details = v33Node('details', 'v33-guide'); details.setAttribute('data-teaching-id', id);
  details.appendChild(v33Node('summary', '', 'Illustrated guide: ' + item.title));
  var content = v33Node('div', 'v33-guide-content');
  var figure = v33Node('figure', 'v33-figure');
  var picture = v33Node('div', 'v33-picture'); figure.appendChild(picture);
  var caption = v33Node('figcaption'); caption.appendChild(v33Key(item)); figure.appendChild(caption);
  content.appendChild(figure); details.appendChild(content);
  var image = null;
  details.addEventListener('toggle', function () {
    if (!details.open || image && !image.hidden) return;
    picture.textContent = ''; image = v33Image(item); picture.appendChild(image);
    if (typeof HTMLDialogElement === 'function') {
      var enlarge = v33Node('button', 'btn ghost v33-enlarge', 'Enlarge illustration'); enlarge.type = 'button';
      enlarge.onclick = function () { v33Enlarge(item, enlarge); }; picture.appendChild(enlarge);
    }
    v33ImageFallback(image, picture);
  });
  return details;
}
function v33Append(root, ids, before) {
  if (!root || typeof root.querySelector !== 'function') return;
  ids.forEach(function (id) {
    if (root.querySelector('[data-teaching-id="' + id + '"]')) return;
    var figure = v33TeachingFigure(id); if (figure) root.insertBefore(figure, before || null);
  });
}
function v33PrimerIds(primer) {
  if (!primer) return [];
  var title = primer.cat || primer.t || '';
  if (title === 'Wine Trade & Aging') return ['bottle-ullage', 'bottle-heat-damage'];
  if (title === 'Viticulture & Winemaking') return ['bottle-heat-damage', 'glass-crystals-sediment-cork'];
  if (/^(?:Tasting|Deductive Tasting|Wine Faults|Faults & Flaws|Service)/i.test(title)) return ['bottle-heat-damage', 'glass-crystals-sediment-cork'];
  return [];
}
var _v33PrimerView = primerView;
primerView = function () {
  var view = _v33PrimerView.apply(this, arguments);
  var primer = PRIMERS.find(function (p) { return p.cat === S.primerKey; }) || PRIMERS[S.primerKey];
  v33Append(view, v33PrimerIds(primer), view.querySelector('.centerrow'));
  return view;
};
/* Future reviewed closer-look sheets are additive. An empty zoom collection
   draws no new controls and never changes the seventeen atlas map records. */
if (typeof v23SheetView === 'function') {
  var _v33SheetView = v23SheetView;
  v23SheetView = function (id) {
    var view = _v33SheetView.apply(this, arguments);
    var ids = CodexTeachingCache.entries().filter(function (item) {
      return item && item.kind === 'zoom' && item.parentAtlas === id && item.scope && Array.isArray(item.reading) && item.reading.length && CodexTeachingCache.entry(item.id);
    }).map(function (item) { return item.id; });
    if (ids.length) {
      var section = v33Node('section', 'v33-guides'); section.appendChild(v33Node('h3', '', 'Closer looks'));
      v33Append(section, ids); view.insertBefore(section, view.querySelector('.v31-study'));
    }
    return view;
  };
}
window.addEventListener('popstate', function () {
  var dialog = document.querySelector('.v33-viewer'); if (dialog && dialog.open) dialog.close();
});
/* A first visit can show art before the worker controls the page. Once that
   worker is ready, let its same bounded policy save those already-viewed files. */
var V33_WARM = { worker: null, files: {} };
function v33Warm(image) {
  if (!image || image.tagName !== 'IMG' || !image.getAttribute('data-teaching-picture') || !image.complete || !image.naturalWidth) return;
  var worker = navigator.serviceWorker && navigator.serviceWorker.controller;
  var base = new URL('./', location.href);
  if (!worker || worker.scriptURL !== new URL('sw.js', base).href) return;
  if (worker !== V33_WARM.worker) { V33_WARM.worker = worker; V33_WARM.files = {}; }
  var url = image.currentSrc || image.src;
  if (V33_WARM.files[url] || !CodexTeachingCache.match(url, base.href)) return;
  V33_WARM.files[url] = true;
  fetch(url, {cache: 'force-cache'}).then(function (response) { if (!response.ok) delete V33_WARM.files[url]; }, function () { delete V33_WARM.files[url]; });
}
if (typeof navigator !== 'undefined' && navigator.serviceWorker) {
  document.addEventListener('load', function (event) { v33Warm(event.target); }, true);
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    Array.prototype.forEach.call(document.querySelectorAll('[data-teaching-picture]'), v33Warm);
  });
}
var _v33TasteGridView = tasteGridView;
tasteGridView = function () {
  var view = _v33TasteGridView.apply(this, arguments);
  var rows = Array.prototype.slice.call(view.querySelectorAll('.gridrow'));
  rows.forEach(function (row) {
    var label = row.querySelector('.gridt');
    if (!label) return;
    if (label.textContent === 'Clarity & brightness') v33Append(row.parentNode, ['glass-crystals-sediment-cork'], row.nextSibling);
    if (label.textContent === 'Condition & intensity') v33Append(row.parentNode, ['bottle-heat-damage'], row.nextSibling);
  });
  return view;
};
var _v33CellarView = cellarView;
cellarView = function () {
  var view = _v33CellarView.apply(this, arguments);
  if (S._v28edit || !view || !view.querySelector) return view;
  var card = view.querySelector('#v28-card');
  if (card) {
    // Reference bottle cards, never house flashcards, a tasting run or a quiz.
    var state = v28State(), row = v28Find(v28Rows(), state.open), item = row && row.item;
    if (item) {
      // The reviewed study registry owns exact wine-to-lesson connections.
      // A skill link never implies this particular bottle has a defect.
      var ids = typeof v36WineGuides === 'function' ? v36WineGuides(item) : [];
      v33Append(card, ids, card.querySelector('.v28-foot'));
    }
  } else {
    var list = view.querySelector('#v28');
    if (list) {
      // A compact disclosure after the wine rows preserves the search-to-list flow.
      var guides = v33Node('section', 'v33-guides');
      guides.appendChild(v33Node('h3', '', 'Reading a bottle before service'));
      guides.appendChild(v33Node('p', '', 'Practise the visible clues, then ask the sommelier when a bottle needs a closer assessment.'));
      v33Append(guides, ['bottle-ullage', 'bottle-heat-damage', 'glass-crystals-sediment-cork']);
      // Leave the list's sticky search behind when reading a guide below it.
      if (guides.querySelector('.v33-guide')) view.insertBefore(guides, list.nextSibling);
    }
  }
  return view;
};
