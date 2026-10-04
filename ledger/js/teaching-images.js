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
    entries[id] = Object.freeze({ src: entry.src, width: entry.width, height: entry.height,
      alt: entry.alt, caption: entry.caption,
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
    if (!scope.caches) return;
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
  }
  function queueKeep(url, response) {
    writes = writes.catch(function () {}).then(function () { return keep(url, response); }).catch(function () {});
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
  scope.LedgerTeaching = Object.freeze({ entries:entries, cacheName:cacheName, figure:figure, lesson:lesson, disclosure:disclosure, handles:handles, owns:owns, serve:serve,
    maxImageBytes:maxImageBytes, maxBytes:maxBytes, maxEntries:maxEntries,
    forget:function () { return scope.caches ? scope.caches.delete(cacheName) : Promise.resolve(false); } });

  if (!doc) return;
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
