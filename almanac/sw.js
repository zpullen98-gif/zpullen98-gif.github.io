/* ============================================================
   Calendar For Life - service worker
   Cache-first for the app shell, stale-while-revalidate for Google Fonts,
   which are also warmed at install into a cache that outlives version bumps.
   Bump CACHE_VERSION whenever index.html or icons change so old
   clients refresh on next load.
   ============================================================ */

const CACHE_VERSION = 'oot-cfl-v99';
const APP_CACHE     = `${CACHE_VERSION}-app`;
// The fonts live in their own cache, deliberately NOT keyed to CACHE_VERSION:
// a version bump used to reap them, so every deploy cost the reader a fresh
// download of six families and, offline, a fallback face until it happened.
const FONT_CACHE    = 'oot-cfl-fonts-v1';
// Must match the <link> in index.html byte for byte, or the page's request
// misses the warmed copy.
const FONT_CSS      = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cinzel+Decorative:wght@400;700;900&family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=Pinyon+Script&family=UnifrakturMaguntia&display=swap';

const APP_SHELL = [
  './',
  './index.html',
  '../shared/oot-config.js',
  '../shared/oot-profiles.js',
  '../shared/oot-home.js',
  '../shared/oot-auth.js',
  '../shared/oot-gate.js',
  '../shared/oot-locks.js',
  '../shared/oot-pass.js',
  '../shared/oot-bar.js',
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
];

self.addEventListener('install', event => {
  event.waitUntil(warmFonts());
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
  const cached = await cache.match(req, { ignoreVary: true });
  const networkPromise = fetch(req).then(res => {
    if (res && res.status === 200) cache.put(req, res.clone());
    return res;
  }).catch(err => {
    // With nothing cached this used to resolve to `undefined`, and respondWith()
    // given a non-Response throws a TypeError instead of failing cleanly. Reachable
    // on a first load while offline for a Google Fonts URL that warmFonts() did
    // not reach. Re-throw so the fetch handler sees a real error.
    if (cached) return cached;
    throw err;
  });
  return cached || networkPromise;
}

// Fetch the Google Fonts stylesheet and every woff2 it names into FONT_CACHE
// so an installed almanac has its faces on the first offline open. Best
// effort: install succeeds without it (offline at install time, say), and the
// stale-while-revalidate branch fills the gaps on the next online open.
async function warmFonts() {
  try {
    const cache = await caches.open(FONT_CACHE);
    const res = await fetch(FONT_CSS);
    if (!res || !res.ok) return;
    await cache.put(FONT_CSS, res.clone());
    const css = await res.text();
    const urls = Array.from(new Set(
      (css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g) || [])
        .map(m => m.slice(4, -1))));
    await Promise.all(urls.map(async u => {
      if (await cache.match(u)) return;
      try {
        const r = await fetch(u);
        if (r && r.ok) await cache.put(u, r);
      } catch (e) { /* one face short; the runtime branch tries again next open */ }
    }));
  } catch (e) { console.warn('[sw] fonts not warmed', e.message); }
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
