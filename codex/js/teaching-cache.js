/* Optional raster teaching art. Shared by the worker and page, with no work
   on load. Exact approved URLs only; separate installation-scoped collections
   keep future closer-look maps away from the reviewed SVG atlas contract. */
var CodexTeachingCache = (function () {
  'use strict';
  var MAX_BYTES = 256000, TIMEOUT_MS = 15000;
  var LIMITS = { teach: 48, zoom: 24 };
  var queue = Promise.resolve();
  function entries() {
    return typeof CODEX_TEACHING_IMAGES !== 'undefined' && CODEX_TEACHING_IMAGES.version === 1 && Array.isArray(CODEX_TEACHING_IMAGES.entries)
      ? CODEX_TEACHING_IMAGES.entries : [];
  }
  function validFile(file, kind) {
    if (typeof file !== 'string') return false;
    return kind === 'teach' ? /^assets\/teach\/(?:[a-z0-9-]+\/)*[a-z0-9-]+-v[1-9]\d*(?:\.thumb)?\.webp$/.test(file)
      : kind === 'zoom' && /^maps\/atlas-zoom-v[1-9]\d*\/[a-z0-9-]+(?:\.thumb)?\.webp$/.test(file);
  }
  function entry(id) {
    return entries().find(function (item) {
      return item && item.id === id && validFile(item.file, item.kind) && item.alt && item.title && item.caption &&
        Number.isInteger(item.width) && item.width > 0 && Number.isInteger(item.height) && item.height > 0 &&
        Array.isArray(item.key) && item.key.length && Array.isArray(item.sources) && item.sources.length;
    }) || null;
  }
  function baseUrl(base) { return new URL('./', base); }
  function fileUrl(file, base) { return new URL(file, baseUrl(base)).href; }
  function match(url, base) {
    var found = null;
    entries().some(function (item) {
      if (!item || !entry(item.id)) return false;
      var files = [item.file];
      if (item.thumb && validFile(item.thumb.file, item.kind)) files.push(item.thumb.file);
      if (!files.some(function (file) { return fileUrl(file, base) === url; })) return false;
      found = item; return true;
    });
    return found;
  }
  function owns(url, base) {
    var u = new URL(url), root = baseUrl(base);
    if (u.origin !== root.origin) return false;
    var relative = u.pathname.slice(root.pathname.length);
    return u.pathname.indexOf(root.pathname) === 0 && (/^assets\/teach\//.test(relative) || /^maps\/atlas-zoom-v\d+\//.test(relative));
  }
  function cacheName(kind, base) {
    if (!LIMITS[kind]) throw new Error('Unknown teaching collection');
    return (kind === 'zoom' ? 'codexzoom-v1-' : 'codexteach-v1-') + encodeURIComponent(baseUrl(base).pathname);
  }
  async function validate(response) {
    if (!response || response.status !== 200 || response.redirected || !/^image\/webp(?:\s*;|\s*$)/i.test(response.headers.get('content-type') || '')) throw new Error('Not a WebP teaching image');
    if (Number(response.headers.get('content-length')) > MAX_BYTES) throw new Error('Teaching image too large');
    var reader = response.body && response.body.getReader(), chunks = [], size = 0;
    if (!reader) throw new Error('Teaching image has no readable body');
    try {
      for (;;) {
        var part = await reader.read();
        if (part.done) break;
        size += part.value.byteLength;
        if (size > MAX_BYTES) throw new Error('Teaching image too large');
        chunks.push(part.value);
      }
    } catch (error) { try { await reader.cancel(); } catch (_) {} throw error; }
    var bytes = new Uint8Array(size), offset = 0;
    chunks.forEach(function (chunk) { bytes.set(chunk, offset); offset += chunk.byteLength; });
    function text(start, end) { return String.fromCharCode.apply(null, bytes.slice(start, end)); }
    if (size < 20 || text(0, 4) !== 'RIFF' || text(8, 12) !== 'WEBP' || !/^(VP8 |VP8L|VP8X)$/.test(text(12, 16)) || new DataView(bytes.buffer).getUint32(4, true) + 8 !== size) throw new Error('Invalid WebP response');
    return new Response(bytes, { status: 200, headers: { 'Content-Type': 'image/webp', 'Content-Length': String(size) } });
  }
  function download(url) {
    var controller = new AbortController(), timer;
    return Promise.race([
      fetch(url, { mode: 'same-origin', redirect: 'error', signal: controller.signal }).then(validate),
      new Promise(function (_, reject) { timer = setTimeout(function () { controller.abort(); reject(new Error('Teaching image timed out')); }, TIMEOUT_MS); })
    ]).finally(function () { clearTimeout(timer); });
  }
  function store(response, item, url, base) {
    var save = queue.catch(function () {}).then(async function () {
      var cache = await caches.open(cacheName(item.kind, base));
      // FIFO eviction is serialized, so simultaneous lazy loads cannot grow it.
      await cache.delete(url);
      var keys = await cache.keys();
      while (keys.length >= LIMITS[item.kind]) await cache.delete(keys.shift());
      await cache.put(url, response.clone());
    });
    queue = save;
    return save.catch(function () {}); // quota/private browsing must not hide art
  }
  async function respond(request, base) {
    var item = match(request.url, base);
    // Unregistered files may be inspected online, but never enter any cache.
    if (!item) return fetch(request);
    var cache;
    try { cache = await caches.open(cacheName(item.kind, base)); } catch (_) {}
    if (cache) {
      var hit;
      try { hit = await cache.match(request.url); } catch (_) { cache = null; }
      if (hit) {
        try { return await validate(hit); } catch (_) { try { await cache.delete(request.url); } catch (_) {} }
      }
    }
    var response = await download(request.url);
    if (cache) await store(response, item, request.url, base);
    return response;
  }
  return { entry: entry, entries: entries, match: match, owns: owns, cacheName: cacheName, respond: respond, validate: validate, maxBytes: MAX_BYTES, limits: LIMITS };
})();
