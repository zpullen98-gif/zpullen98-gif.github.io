/* ============================================================
   Calendar For Life - service worker
   Cache-first for the app shell, network-first for Google Fonts.
   Bump CACHE_VERSION whenever index.html or icons change so old
   clients refresh on next load.
   ============================================================ */

const CACHE_VERSION = 'oot-cfl-v90';
const APP_CACHE     = `${CACHE_VERSION}-app`;
const FONT_CACHE    = `${CACHE_VERSION}-fonts`;

const APP_SHELL = [
  './',
  '../shared/oot-config.js',
  '../shared/oot-profiles.js',
  '../shared/oot-home.js',
  '../shared/oot-auth.js',
  '../shared/oot-gate.js',
  '../shared/oot-locks.js',
  '../shared/oot-bar.js',
  './index.html',
  '../manifest.webmanifest',
  './offline.html',
  './privacy.html',
  './icons/icon.svg',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-192-maskable.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './images/cover.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(APP_CACHE);
    // addAll is atomic - if one URL fails the whole install fails.
    // Use individual adds so a missing icon during dev doesn't break the SW.
    // cache:'reload' bypasses the HTTP cache, so a new worker never precaches a
    // stale copy the browser happens to be holding. cache.add() does an ordinary
    // fetch, which on GitHub Pages could serve a shared script from up to ten
    // minutes of max-age. The other three wings already do this.
    await Promise.all(APP_SHELL.map(async url => {
      try {
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (!res.ok) throw new Error('HTTP ' + res.status);
        await cache.put(url, res);
      } catch (e) { console.warn('[sw] skip', url, e.message); }
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Cache Storage is per-ORIGIN, not per-scope. On a shared host such as
    // <user>.github.io every project page sees every other project's caches,
    // so deleting everything that is not ours would wipe the offline shells of
    // the sibling PWAs on the same account. Only ever reap our own prefix.
    await Promise.all(keys
      .filter(k => k.startsWith('oot-cfl-') && k !== APP_CACHE && k !== FONT_CACHE)
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Google Fonts - stale-while-revalidate so updates land but offline still works.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, FONT_CACHE));
    return;
  }

  // Same-origin app shell - cache-first. Only paths this wing owns or
  // precaches: root files fetched from an almanac page (robots.txt, the hub's
  // legal pages) must not be runtime-cached into OUR cache and served
  // stale-forever by ignoreSearch. The browser handles them natively.
  if (url.origin === self.location.origin) {
    if (!url.pathname.startsWith('/almanac/') && !url.pathname.startsWith('/shared/')) return;
    event.respondWith(cacheFirst(req, APP_CACHE));
    return;
  }

  // Anything else - try network, fall back to cache if present.
  event.respondWith(networkFirst(req, APP_CACHE));
});

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res && res.status === 200 && res.type !== 'opaque') {
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    // Offline + miss - surface the parchment fallback for navigations.
    if (req.mode === 'navigate') {
      const fallback = await cache.match('./offline.html');
      if (fallback) return fallback;
    }
    throw err;
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const networkPromise = fetch(req).then(res => {
    if (res && res.status === 200) cache.put(req, res.clone());
    return res;
  }).catch(err => {
    // With nothing cached this used to resolve to `undefined`, and respondWith()
    // given a non-Response throws a TypeError instead of failing cleanly. Reachable
    // on a first load while offline for the Google Fonts URLs, which are the only
    // resources not precached. Re-throw so the fetch handler sees a real error.
    if (cached) return cached;
    throw err;
  });
  return cached || networkPromise;
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res && res.status === 200 && res.type !== 'opaque') {
      cache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    throw err;
  }
}
