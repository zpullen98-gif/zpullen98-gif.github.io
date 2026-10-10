/* The reviewed atlas: explicit inventory and installation-scoped offline maps.
   Maps are optional downloads, never part of the shell installation. The old
   shared JPG cache stays intact until this installation's reader removes it.
   No study record, answer, score, or localStorage field is written here. */
var ATLAS_CACHE_BASE = new URL('./', location.href);
var ATLAS_CACHE_NAME = 'codexmaps-v3-' + encodeURIComponent(ATLAS_CACHE_BASE.pathname);
var ATLAS_PREVIOUS_CACHE = 'codexmaps-v2-' + encodeURIComponent(ATLAS_CACHE_BASE.pathname);
var ATLAS_LEGACY_CACHE = 'codexmaps-v1';
var ATLAS_FETCH_TIMEOUT_MS = 15000;
var ATLAS_MAX_MAP_BYTES = 2 * 1024 * 1024;
var ATLAS_MAX_FRAME_BYTES = 320 * 1024;

function atlasCacheIds() {
  return MAP_SHEETS.map(function (sheet) { return sheet.id; });
}

/* Only the seventeen registered, versioned local files can be requested.
   Reject a changed/invalid manifest rather than fetch a guessed destination. */
mapFile = function (id) {
  if (typeof ATLAS_V2 === 'undefined' || ATLAS_V2.version !== '3' || !mapSheet(id)) return '';
  var sheet = ATLAS_V2.sheets && ATLAS_V2.sheets[id];
  var expected = 'maps/atlas-v3/' + id + '.svg';
  return sheet && sheet.file === expected ? expected : '';
};

function atlasCacheUrl(id) {
  var file = mapFile(id);
  if (!file) return null;
  var url = new URL(file, ATLAS_CACHE_BASE);
  return url.origin === ATLAS_CACHE_BASE.origin ? url.href : null;
}

function atlasCacheIsSvg(response) {
  return !!response && response.ok &&
    /^image\/svg\+xml(?:\s*;|\s*$)/i.test(response.headers.get('content-type') || '');
}

/* A single small, embedded WebP adds the house illustration without making
   the offline SVG depend on another request. All other resource references
   must be internal fragment IDs. A data URL cannot disguise HTML or an SVG. */
function atlasCacheResourcesSafe(text) {
  var embedded = 0, attribute, refs = /\b(?:href|src)\s*=\s*(["'])([\s\S]*?)\1/gi;
  while ((attribute = refs.exec(text))) {
    var value = attribute[2];
    if (/^#[A-Za-z_][\w:.-]*$/.test(value)) continue;
    if (!/^data:image\/webp;base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)) return false;
    if (++embedded > 1) return false;
    var base64 = value.slice('data:image/webp;base64,'.length);
    var size = base64.length * 3 / 4 - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
    if (size < 12 || size > ATLAS_MAX_FRAME_BYTES) return false;
    try {
      var header = atob(base64.slice(0, 16));
      if (header.slice(0, 4) !== 'RIFF' || header.slice(8, 12) !== 'WEBP') return false;
    } catch (e) { return false; }
  }
  return true;
}

/* SVG responses must be actual pictures, not an HTML fallback served with 200.
   The generated atlas has no scripts or external resources; enforce that again
   before storing a response that would otherwise survive future app updates. */
function atlasCacheValidate(response) {
  if (!atlasCacheIsSvg(response)) return Promise.reject(new Error('Not an SVG map'));
  var length = Number(response.headers.get('content-length'));
  if (length > ATLAS_MAX_MAP_BYTES) return Promise.reject(new Error('Map too large'));
  return response.clone().text().then(function (text) {
    if (!text.length || text.length > ATLAS_MAX_MAP_BYTES ||
        !/^\s*(?:<\?xml[^>]*>\s*)?(?:<!--[\s\S]*?-->\s*)*<svg\b/i.test(text) ||
        !/<\/svg>\s*$/i.test(text) || /<(?:script|foreignObject)\b|\bon[a-z]+\s*=|<!DOCTYPE|<!ENTITY|@import/i.test(text) ||
        /url\(\s*["']?\s*(?!#)[^\s"')]/i.test(text) || !atlasCacheResourcesSafe(text)) {
      throw new Error('Invalid map response');
    }
    return response;
  });
}

function atlasCacheNotify() {
  try { window.dispatchEvent(new CustomEvent('codex-atlas-cachechange')); } catch (e) { }
}

function atlasCacheSay(say, message) {
  V23.lastMessage = message;
  try { if (say) say(message); } catch (e) { }
  atlasCacheNotify();
}

v23ReadStored = function () {
  if (!v23HaveCaches()) return Promise.resolve({});
  return caches.open(ATLAS_CACHE_NAME).then(function (cache) {
    var out = {};
    return Promise.all(atlasCacheIds().map(function (id) {
      var url = atlasCacheUrl(id);
      if (!url) return;
      return cache.match(url).then(function (response) {
        if (atlasCacheIsSvg(response)) out[id] = true;
      });
    })).then(function () { return out; });
  }).catch(function () { return {}; });
};

/* The prior edition stays available to an older tab until explicit removal.
   Only this installation's registered URLs count, even in the old shared cache. */
function atlasCacheOlderEntries() {
  return [
    { name: ATLAS_PREVIOUS_CACHE, folder: 'maps/atlas-v2/', suffix: '.svg' },
    { name: ATLAS_LEGACY_CACHE, folder: 'maps/', suffix: '.jpg' }
  ];
}
function atlasCacheReadOlder() {
  if (!v23HaveCaches()) return Promise.resolve(false);
  return caches.keys().then(function (names) {
    return Promise.all(atlasCacheOlderEntries().filter(function (entry) {
      return names.indexOf(entry.name) >= 0;
    }).map(function (entry) {
      return caches.open(entry.name).then(function (cache) {
        return Promise.all(atlasCacheIds().map(function (id) {
          return cache.match(new URL(entry.folder + id + entry.suffix, ATLAS_CACHE_BASE).href).then(function (response) { return !!response; });
        })).then(function (hits) { return hits.some(Boolean); });
      });
    })).then(function (hits) { return hits.some(Boolean); });
  }).catch(function () { return false; });
}

/* The explicit inventory is study content even when its picture is not saved.
   No HEAD probes or network request decide whether a lesson can be opened. */
V23.have = atlasCacheIds();
V23.probed = true;
V23.busy = '';
V23.lastMessage = '';
V23.olderStored = false;
v23Probe = function () {
  V23.have = atlasCacheIds();
  V23.probed = true;
  return Promise.all([v23ReadStored(), atlasCacheReadOlder()]).then(function (saved) {
    V23.stored = saved[0]; V23.olderStored = saved[1];
    atlasCacheNotify();
    return V23.have.slice();
  });
};

function atlasCacheFetch(id) {
  var url = atlasCacheUrl(id);
  if (!url) return Promise.reject(new Error('Unknown atlas map'));
  return new Promise(function (resolve, reject) {
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var settled = false;
    var timeout = setTimeout(function () {
      if (settled) return;
      settled = true;
      if (controller) controller.abort();
      reject(new Error('Map download timed out'));
    }, ATLAS_FETCH_TIMEOUT_MS);
    fetch(url, {
      cache: 'reload', mode: 'same-origin', redirect: 'error',
      signal: controller ? controller.signal : undefined
    }).then(atlasCacheValidate).then(function (response) {
      if (settled) return;
      settled = true; clearTimeout(timeout); resolve(response);
    }, function (error) {
      if (settled) return;
      settled = true; clearTimeout(timeout); reject(error);
    });
  });
}

v23StoreAll = function (btn, say) {
  if (V23.busy) return Promise.resolve();
  if (!v23HaveCaches()) {
    atlasCacheSay(say, 'Offline map storage is not available in this browser.');
    return Promise.resolve();
  }
  V23.busy = 'saving';
  if (btn) btn.disabled = true;
  var failures = [];
  atlasCacheSay(say, 'Checking the maps already saved on this device…');
  return v23ReadStored().then(function (stored) {
    V23.stored = stored;
    var ids = atlasCacheIds().filter(function (id) { return !stored[id]; });
    return caches.open(ATLAS_CACHE_NAME).then(function (cache) {
      var step = function (i) {
        if (i >= ids.length) return Promise.resolve();
        var id = ids[i];
        atlasCacheSay(say, 'Saving ' + (i + 1) + ' of ' + ids.length + ': ' + mapSheet(id).name + '…');
        return atlasCacheFetch(id).catch(function () {
          return atlasCacheFetch(id); // one bounded retry; failed maps remain retryable
        }).then(function (response) {
          return cache.put(atlasCacheUrl(id), response);
        }).then(function () { V23.stored[id] = true; }, function () { failures.push(id); })
          .then(function () { return step(i + 1); });
      };
      return step(0);
    });
  }).then(function () {
    return v23ReadStored().then(function (stored) {
      V23.stored = stored;
      var count = v23StoredCount(), total = atlasCacheIds().length;
      V23.busy = '';
      if (btn) btn.disabled = false;
      atlasCacheSay(say, count === total
        ? 'All ' + total + ' maps are on this device and open without a connection.'
        : count + ' of ' + total + ' maps are on this device. ' +
          (failures.length ? failures.length + ' could not be saved. ' : '') + 'Reconnect and choose Keep maps on this device to try again.');
    });
  }).catch(function () {
    V23.busy = '';
    if (btn) btn.disabled = false;
    atlasCacheSay(say, 'The maps could not be saved on this device. Existing saved maps have been kept.');
  });
};

v23Forget = function (btn, say) {
  if (V23.busy || !v23HaveCaches()) return Promise.resolve();
  V23.busy = 'removing';
  if (btn) btn.disabled = true;
  atlasCacheSay(say, 'Removing this Codex’s saved maps…');
  return caches.delete(ATLAS_CACHE_NAME).then(function () {
    // Remove exact own keys in prior editions only. Never delete their
    // caches wholesale or touch another installation's URLs.
    return caches.keys().then(function (names) {
      return Promise.all(atlasCacheOlderEntries().filter(function (entry) {
        return names.indexOf(entry.name) >= 0;
      }).map(function (entry) {
        return caches.open(entry.name).then(function (cache) {
          return Promise.all(atlasCacheIds().map(function (id) {
            return cache.delete(new URL(entry.folder + id + entry.suffix, ATLAS_CACHE_BASE).href);
          }));
        });
      }));
    });
  }).then(function () {
    V23.stored = {};
    V23.olderStored = false;
    V23.busy = '';
    if (btn) btn.disabled = false;
    atlasCacheSay(say, 'This Codex’s saved maps have been removed. They still open with a connection.');
  }).catch(function () {
    return Promise.all([v23ReadStored(), atlasCacheReadOlder()]).then(function (saved) {
      V23.stored = saved[0]; V23.olderStored = saved[1];
      V23.busy = '';
      if (btn) btn.disabled = false;
      atlasCacheSay(say, 'Some maps could not be removed. Please try again.');
    });
  });
};
