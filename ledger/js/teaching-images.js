/* Optional teaching pictures: one exact inventory for the page and worker.
   Only a picture actually requested by the reader is downloaded. The cache
   belongs to this installation, survives shell updates, and cannot grow past
   either limit. This module never reads or writes learning or house records. */
(function (scope) {
  'use strict';
  var doc = typeof document === 'undefined' ? null : document;
  var script = doc && doc.currentScript;
  var base = new URL(script && script.src ? '../' : './', script && script.src || scope.location.href);
  var cacheName = 'ledgerart-v1-' + encodeURIComponent(base.pathname);
  var maxImageBytes = 512 * 1024, maxBytes = 16 * 1024 * 1024, maxEntries = 64;
  var timeoutMs = 15000, writes = Promise.resolve(), pending = new Map();
  var entries = Object.create(null), urls = new Set();
  var source = typeof LEDGER_TEACHING_IMAGES === 'undefined' ? {} : LEDGER_TEACHING_IMAGES;
  var pathPattern = /^img\/(?:brennans|cards|plates)\/[a-z0-9]+(?:-[a-z0-9]+)*-v[1-9][0-9]*(?:\.thumb)?\.webp$/;
  function dimensions(image) {
    return image && Number.isInteger(image.width) && Number.isInteger(image.height) &&
      image.width > 0 && image.height > 0 && image.width <= 4096 && image.height <= 4096;
  }
  function localPath(path) { return typeof path === 'string' && pathPattern.test(path); }
  function sourceLink(value) {
    try { if (typeof value !== 'string') return false; var url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; }
    catch (_) { return false; }
  }
  Object.keys(source).forEach(function (id) {
    var entry = source[id];
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !entry || !localPath(entry.src) ||
        !dimensions(entry) || typeof entry.alt !== 'string' || !entry.alt.trim() ||
        typeof entry.caption !== 'string' || !entry.caption.trim()) return;
    if (entry.thumb && (!localPath(entry.thumb.src) || !dimensions(entry.thumb) ||
        entry.thumb.width >= entry.width || entry.thumb.width * entry.height !== entry.thumb.height * entry.width)) return;
    if (entry.labels && (!Array.isArray(entry.labels) || entry.labels.length > 24 ||
        entry.labels.some(function (label) { return typeof label !== 'string' || !label.trim(); }))) return;
    if (entry.notes && (!Array.isArray(entry.notes) || !entry.labels || entry.notes.length !== entry.labels.length ||
        entry.notes.some(function (note) { return typeof note !== 'string' || !note.trim(); }))) return;
    if (['title','purpose','context'].some(function (name) { return entry[name] !== undefined && (typeof entry[name] !== 'string' || !entry[name].trim()); })) return;
    if (entry.reviewedOn !== undefined && (typeof entry.reviewedOn !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(entry.reviewedOn) ||
        !Number.isFinite(Date.parse(entry.reviewedOn)) || new Date(entry.reviewedOn).toISOString().slice(0,10) !== entry.reviewedOn)) return;
    if (entry.sources && (!Array.isArray(entry.sources) || entry.sources.length > 12 || entry.sources.some(function (item) {
      return !item || typeof item.title !== 'string' || !item.title.trim() || (item.url !== undefined && !sourceLink(item.url));
    }))) return;
    entries[id] = Object.freeze({ src: entry.src, width: entry.width, height: entry.height,
      alt: entry.alt, caption: entry.caption,
      title:entry.title || 'Teaching illustration', purpose:entry.purpose || '', context:entry.context || '', reviewedOn:entry.reviewedOn || '',
      sources:Object.freeze((entry.sources || []).map(function (item) { return Object.freeze({title:item.title,url:item.url || ''}); })),
      labels: Object.freeze((entry.labels || []).slice()),
      notes: Object.freeze((entry.notes || []).slice()),
      thumb: entry.thumb && Object.freeze({src:entry.thumb.src,width:entry.thumb.width,height:entry.thumb.height}) });
    urls.add(new URL(entry.src, base).href);
    if (entry.thumb) urls.add(new URL(entry.thumb.src, base).href);
  });
  Object.freeze(entries);
  function exactUrl(value) {
    try { var url = new URL(value, base); return urls.has(url.href) ? url.href : null; }
    catch (_) { return null; }
  }
  function handles(request) { return request.method === 'GET' && !!exactUrl(request.url); }
  function owns(request) {
    try {
      var url = new URL(request.url, base);
      return request.method === 'GET' && url.origin === base.origin &&
        ['brennans', 'cards', 'plates'].some(function (name) {
          return url.pathname.startsWith(base.pathname + 'img/' + name + '/');
        });
    } catch (_) { return false; }
  }
  function webp(response) {
    return response && response.status === 200 && !response.redirected &&
      /^image\/webp(?:\s*;|\s*$)/i.test(response.headers.get('content-type') || '');
  }
  async function validated(response) {
    if (!webp(response)) throw Error('Teaching picture is not a WebP image');
    if (Number(response.headers.get('content-length')) > maxImageBytes) throw Error('Teaching picture is too large');
    var reader = response.body && response.body.getReader(), chunks = [], length = 0;
    if (!reader) throw Error('Teaching picture has no body');
    while (true) {
      var part = await reader.read();
      if (part.done) break;
      length += part.value.byteLength;
      if (length > maxImageBytes) { await reader.cancel(); throw Error('Teaching picture is too large'); }
      chunks.push(part.value);
    }
    var bytes = new Uint8Array(length), offset = 0;
    chunks.forEach(function (chunk) { bytes.set(chunk, offset); offset += chunk.byteLength; });
    if (length < 16 || String.fromCharCode.apply(null, bytes.slice(0, 4)) !== 'RIFF' ||
        String.fromCharCode.apply(null, bytes.slice(8, 12)) !== 'WEBP' ||
        new DataView(bytes.buffer).getUint32(4, true) !== length - 8 ||
        !['VP8 ', 'VP8L', 'VP8X'].includes(String.fromCharCode.apply(null, bytes.slice(12, 16)))) {
      throw Error('Teaching picture has an invalid WebP body');
    }
    return new Response(bytes, { headers: { 'Content-Type':'image/webp', 'Content-Length':String(length) } });
  }
  async function keep(url, response) {
    if (!scope.caches) return false;
    var cache = await scope.caches.open(cacheName);
    /* Cache key order gives an eviction queue. Replacing an entry moves it to
       the newest end; all writes are serial so concurrent pictures cannot
       race the aggregate size check. A failed write still serves the image. */
    await cache.delete(url);
    await cache.put(url, response.clone());
    var keys = await cache.keys(), rows = [], total = 0;
    for (var key of keys) {
      var saved = await cache.match(key), size = Number(saved && saved.headers.get('content-length'));
      if (!webp(saved) || !Number.isFinite(size) || size < 16 || size > maxImageBytes) {
        await cache.delete(key); continue;
      }
      rows.push({key:key,size:size}); total += size;
    }
    while (rows.length > maxEntries || total > maxBytes) {
      var oldest = rows.shift(); total -= oldest.size; await cache.delete(oldest.key);
    }
    // A successful put alone is not evidence the entry survived eviction or
    // a storage failure. Read and validate the stored bytes before reporting it.
    var persisted = await cache.match(url);
    if (!persisted) return false;
    var actual = new Uint8Array(await (await validated(persisted)).arrayBuffer());
    var expected = new Uint8Array(await response.clone().arrayBuffer());
    return actual.length === expected.length && actual.every(function (byte, i) { return byte === expected[i]; });
  }
  function queueKeep(url, response) {
    writes = writes.catch(function () {}).then(function () { return keep(url, response); }).catch(function () { return false; });
    return writes;
  }
  async function download(url) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, timeoutMs);
    try {
      var response = await scope.fetch(url, { signal:controller.signal, credentials:'same-origin', cache:'no-cache', redirect:'error' });
      var checked = await validated(response);
      await queueKeep(url, checked);
      return checked;
    } finally { clearTimeout(timer); }
  }
  async function serve(request) {
    if (!handles(request)) throw Error('Unregistered teaching picture');
    var url = exactUrl(request.url), hit;
    if (scope.caches) {
      try { hit = await (await scope.caches.open(cacheName)).match(url); } catch (_) { }
    }
    if (hit) {
      try { var checked = await validated(hit); await queueKeep(url, checked); return checked; }
      catch (_) { try { await (await scope.caches.open(cacheName)).delete(url); } catch (_) {} }
    }
    if (!pending.has(url)) {
      pending.set(url, download(url).finally(function () { pending.delete(url); }));
    }
    return (await pending.get(url)).clone();
  }
  function esc(value) {
    return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function figure(id) {
    var entry = entries[id];
    if (!entry) return '';
    var responsive = entry.thumb ? ' srcset="' + esc(entry.thumb.src) + ' ' + entry.thumb.width + 'w, ' +
      esc(entry.src) + ' ' + entry.width + 'w" sizes="(max-width: 639px) calc(100vw - 72px), 500px"' : '';
    return '<figure class="teaching-image" data-teaching-image="' + esc(id) + '">' +
      '<img src="' + esc(entry.src) + '"' + responsive + ' width="' + entry.width + '" height="' + entry.height +
      '" alt="' + esc(entry.alt) + '" loading="lazy" decoding="async">' +
      '<figcaption>' + esc(entry.caption) + '</figcaption>' +
      '<button type="button" class="teaching-image-enlarge" data-teaching-open="' + esc(id) + '">Enlarge illustration with its key</button>' +
      '<a class="teaching-image-open" href="' + esc(entry.src) + '" target="_blank" rel="noopener">Open full illustration (new tab)</a>' +
      '<p class="teaching-image-missing" hidden>The illustration is unavailable. The lesson remains below.</p></figure>';
  }
  function disclosure(id, title) {
    var entry = entries[id];
    if (!entry) return '';
    return '<details class="teaching-reference" data-teaching-reference="' + esc(id) + '"><summary>' + esc(title) + '</summary>' +
      '<div data-teaching-slot></div>' +
      key(entry) + '</details>';
  }
  function key(entry) {
    return '<ol class="teaching-image-key' + (entry.notes.length ? ' teaching-image-guide' : '') + '">' +
      entry.labels.map(function (label, i) { return '<li>' + (entry.notes.length ? '<strong>' + esc(label) + '</strong><span>' + esc(entry.notes[i]) + '</span>' : esc(label)) + '</li>'; }).join('') + '</ol>';
  }
  function lesson(id) { return entries[id] ? figure(id) + key(entries[id]) : ''; }
  function metadata(entry) {
    return '<div class="teaching-context">' + (entry.purpose ? '<p><strong>Study purpose.</strong> ' + esc(entry.purpose) + '</p>' : '') +
      (entry.context ? '<p>' + esc(entry.context) + '</p>' : '') +
      (entry.reviewedOn ? '<p class="teaching-review-date">Illustration and key reviewed <time datetime="' + esc(entry.reviewedOn) + '">' + esc(entry.reviewedOn) + '</time>.</p>' : '') +
      (entry.sources.length ? '<h3>Sources and review context</h3><ul>' + entry.sources.map(function (item) {
        return '<li>' + (item.url ? '<a href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">' + esc(item.title) + ' (new tab)</a>' : esc(item.title)) + '</li>';
      }).join('') + '</ul>' : '') + '</div>';
  }
  async function cached(path) {
    var url = exactUrl(path);
    if (!url || !scope.caches) return false;
    try {
      var hit = await (await scope.caches.open(cacheName)).match(url);
      if (!hit) return false;
      await validated(hit); return true;
    } catch (_) { return false; }
  }
  async function saved(id) {
    var entry = entries[id];
    if (!entry) return {full:false,small:false};
    return {full:await cached(entry.src), small:!!entry.thumb && await cached(entry.thumb.src)};
  }
  async function saveOffline(id) {
    var entry = entries[id];
    if (!entry || !scope.caches) return false;
    try {
      var url = new URL(entry.src, base).href;
      var controller = scope.navigator && scope.navigator.serviceWorker && scope.navigator.serviceWorker.controller;
      if (doc && controller && controller.scriptURL === new URL('sw.js', base).href) {
        // The owning worker serialises writes across controlled pages. Wait for
        // its response, then verify its saved bytes instead of racing its queue.
        await validated(await scope.fetch(url, {cache:'reload'}));
        return await cached(url);
      }
      var response = await serve(new Request(url));
      return await queueKeep(url, response) && await cached(url);
    } catch (_) { return false; }
  }
  var viewer = null, opener = null, statusCheck = 0;
  function isViewerOpen() { return !!(viewer && viewer.open); }
  function closeViewer() {
    if (!viewer) return;
    var old = viewer, restore = opener;
    viewer = null; opener = null; statusCheck++;
    if (old.open) old.close();
    old.remove();
    if (restore && restore.isConnected && typeof restore.focus === 'function') restore.focus();
    else if (doc) { var main = doc.getElementById('view'); if (main && main.focus) main.focus(); }
  }
  async function refreshStatus(id, failure) {
    var current = viewer, revision = ++statusCheck;
    if (!current) return;
    var state = await saved(id);
    if (current !== viewer || revision !== statusCheck) return;
    var status = current.querySelector('[data-teaching-save-status]');
    if (!status) return;
    var controller = scope.navigator && scope.navigator.serviceWorker && scope.navigator.serviceWorker.controller;
    var controlled = controller && controller.scriptURL === new URL('sw.js', base).href;
    status.textContent = state.full
      ? (controlled ? 'Full illustration saved for offline on this device.' : 'Full illustration saved on this device. Finish opening the app online before relying on offline viewing.')
      : failure ? 'The full illustration could not be saved. Check your connection or browser storage and try again. The written key remains available.'
      : state.small ? 'Only the smaller illustration is saved on this device. Save the full illustration while online for a closer look later.'
      : 'The full illustration is not saved on this device yet.';
  }
  function openViewer(id, trigger) {
    var entry = entries[id];
    if (!entry || !doc || !doc.createElement || !doc.body) return false;
    var dialog = doc.createElement('dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return false;
    closeViewer();
    opener = trigger || doc.activeElement;
    dialog.className = 'teaching-viewer';
    dialog.setAttribute('aria-labelledby','teaching-viewer-title');
    dialog.innerHTML = '<div class="teaching-viewer-top"><h2 id="teaching-viewer-title" tabindex="-1">' + esc(entry.title) + '</h2>' +
      '<button type="button" class="teaching-viewer-close">Close illustration</button></div>' +
      '<figure class="teaching-image" data-teaching-image="' + esc(id) + '"><img src="' + esc(entry.src) + '" width="' + entry.width + '" height="' + entry.height + '" alt="' + esc(entry.alt) + '" decoding="async">' +
      '<figcaption>' + esc(entry.caption) + '</figcaption><p class="teaching-image-missing" hidden>The illustration is unavailable. The numbered key remains below.</p></figure>' +
      '<h3 class="teaching-key-title">Read the numbered illustration</h3>' + key(entry) + metadata(entry) +
      '<div class="teaching-save"><button type="button" data-teaching-save>Save full illustration for offline</button><p role="status" aria-live="polite" data-teaching-save-status>Checking the saved illustration...</p>' +
      '<p class="teaching-review-date">Saved artwork belongs to this browser and may be removed if its storage is cleared or runs short.</p></div>' +
      '<a class="teaching-image-open" href="' + esc(entry.src) + '" target="_blank" rel="noopener">Open full illustration (new tab)</a>';
    viewer = dialog;
    doc.body.appendChild(dialog);
    dialog.addEventListener('cancel', function (event) { event.preventDefault(); closeViewer(); });
    dialog.addEventListener('close', function () { if (viewer === dialog) closeViewer(); });
    dialog.querySelector('.teaching-viewer-close').addEventListener('click', closeViewer);
    dialog.querySelector('[data-teaching-save]').addEventListener('click', async function (event) {
      var button = event.currentTarget;
      button.disabled = true;
      statusCheck++;
      dialog.querySelector('[data-teaching-save-status]').textContent = 'Saving the full illustration...';
      var success = await saveOffline(id);
      if (viewer !== dialog) return;
      button.disabled = false;
      refreshStatus(id, !success);
    });
    dialog.querySelector('img').addEventListener('load', function () { if (viewer === dialog && !dialog.querySelector('[data-teaching-save]').disabled) refreshStatus(id); });
    dialog.addEventListener('keydown', function (event) {
      // Native modal inertness handles pointer focus; isolate keyboard shortcuts
      // from the active study card as well, including letter/Space grading.
      event.stopPropagation();
      if (event.key === 'Escape') { event.preventDefault(); closeViewer(); return; }
      if (event.key !== 'Tab') return;
      var focusable = Array.prototype.filter.call(dialog.querySelectorAll('button:not([disabled]),a[href],input,select,textarea,[tabindex="0"]'), function (node) { return !node.hidden; });
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (doc.activeElement === first || !dialog.contains(doc.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (doc.activeElement === last || !dialog.contains(doc.activeElement))) { event.preventDefault(); first.focus(); }
    });
    dialog.showModal();
    dialog.querySelector('.teaching-viewer-close').focus();
    refreshStatus(id);
    return true;
  }
  scope.LedgerTeaching = Object.freeze({ entries:entries, cacheName:cacheName, figure:figure, lesson:lesson, disclosure:disclosure, handles:handles, owns:owns, serve:serve,
    open:openViewer, close:closeViewer, isViewerOpen:isViewerOpen, saved:saved, saveOffline:saveOffline,
    maxImageBytes:maxImageBytes, maxBytes:maxBytes, maxEntries:maxEntries,
    forget:function () { return scope.caches ? scope.caches.delete(cacheName) : Promise.resolve(false); } });

  if (!doc) return;
  doc.addEventListener('click', function (event) {
    var trigger = event.target && event.target.closest && event.target.closest('[data-teaching-open]');
    if (!trigger) return;
    if (openViewer(trigger.getAttribute('data-teaching-open'), trigger)) event.preventDefault();
  });
  if (scope.addEventListener) scope.addEventListener('hashchange', closeViewer);
  /* No image URL exists in a closed reference. Opening it is the request,
     independent of a browser's optional lazy-loading heuristics. The key is
     normal document text, so a failed or unsaved picture cannot hide it. */
  doc.addEventListener('toggle', function (event) {
    var details = event.target;
    if (!details || details.tagName !== 'DETAILS' || !details.open || !details.getAttribute) return;
    var id = details.getAttribute('data-teaching-reference'), slot = details.querySelector('[data-teaching-slot]');
    if (entries[id] && slot && (!slot.firstChild || slot.querySelector('img[hidden]'))) {
      // Reopening a failed reference is an explicit retry. A successful image
      // stays in place, and neither closing nor an unopened reference fetches.
      slot.innerHTML = figure(id);
    }
  }, true);
  var worker = null, warmed = new Set();
  function warm(image) {
    var current = scope.navigator && scope.navigator.serviceWorker && scope.navigator.serviceWorker.controller;
    if (!current || current.scriptURL !== new URL('sw.js', base).href) return;
    if (current !== worker) { worker = current; warmed.clear(); }
    if (!image || image.tagName !== 'IMG' || !image.complete || !image.naturalWidth) return;
    var url = exactUrl(image.currentSrc || image.src);
    if (!url || warmed.has(url)) return;
    warmed.add(url);
    scope.fetch(url, {cache:'force-cache'}).then(function (response) {
      if (!webp(response)) warmed.delete(url);
    }).catch(function () { warmed.delete(url); });
  }
  function warmLoaded() { Array.prototype.forEach.call(doc.images || [], warm); }
  doc.addEventListener('load', function (event) { warm(event.target); }, true);
  doc.addEventListener('error', function (event) {
    var image = event.target;
    if (!image || image.tagName !== 'IMG' || !image.closest) return;
    var parent = image.closest('[data-teaching-image]');
    if (!parent || !entries[parent.getAttribute('data-teaching-image')]) return;
    var entry = entries[parent.getAttribute('data-teaching-image')];
    /* A reader may have saved the phone size before going offline and then
       rotated the device, or saved the full size on a wider screen. Try the
       other registered size once before hiding a still-useful illustration. */
    if (entry.thumb && image.getAttribute('data-teaching-alternate') !== '1') {
      image.setAttribute('data-teaching-alternate', '1');
      var current = new URL(image.currentSrc || image.src, base).href;
      image.removeAttribute('srcset'); image.removeAttribute('sizes');
      image.src = current === new URL(entry.src, base).href ? entry.thumb.src : entry.src;
      return;
    }
    image.hidden = true;
    var fallback = parent.querySelector('.teaching-image-missing');
    if (fallback) fallback.hidden = false;
  }, true);
  if (scope.navigator && scope.navigator.serviceWorker) {
    scope.navigator.serviceWorker.addEventListener('controllerchange', warmLoaded);
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', warmLoaded, {once:true});
  else warmLoaded();
})(typeof self === 'undefined' ? window : self);
