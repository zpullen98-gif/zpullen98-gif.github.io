/* Outside Of Time: the shell of the whole app.
 *
 * This is the only service worker registered at the origin root, and that makes
 * it the one with the widest reach on a shared host. The standalone Ledger,
 * Codex, First Light and Calendar are separate repositories served from
 * subfolders of this same github.io origin. A registration scoped to "/"
 * controls every page under it that no narrower registration has claimed, so a
 * careless fetch handler here could hand this app's HTML to an unrelated app or
 * eat its offline shell.
 *
 * The rule that prevents that: OWNS() lists what belongs to this shell, and any
 * request outside it returns without calling respondWith, which leaves the
 * browser to do exactly what it would have done with no service worker at all.
 * The five wings are outside it too. Each wing keeps its own worker on its own
 * narrower scope, and a narrower scope always wins, so /ledger/ is served by
 * ledger/sw.js and never by this file.
 */
const CACHE = 'oot-shell-v5';

/* The versioned query strings are deliberate. Every page asks for
   shared/oot-config.js?v=23, and the cache is matched with ignoreSearch, so a
   version bump misses the cache and refetches instead of serving last month's
   config. See the note on ignoreSearch in the fetch handler. */
const ASSETS = [
  './',
  './index.html',
  './privacy.html',
  './terms.html',
  './404.html',
  './pass/',
  './pass/index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './assets/hub-poster.css',
  './assets/hub-plate.js',
  './assets/hub-plate.webp',
  './assets/hub-plate.jpg',
  './shared/oot-home.css',
  './shared/oot-config.js',
  './shared/oot-profiles.js',
  './shared/oot-home.js',
  './shared/oot-auth.js',
  './shared/oot-gate.js',
  './shared/oot-locks.js',
  './shared/oot-pass.js',
  './shared/oot-log.js',
  './shared/oot-bar.js',
];

/* Everything this shell is allowed to answer for. Anything else is somebody
   else's: another app on the origin, or one of our own wings, both of which
   must be left entirely alone. */
const OWNED_PAGES = new Set([
  '/', '/index.html', '/privacy.html', '/terms.html', '/404.html',
  '/manifest.webmanifest', '/icon.svg', '/favicon.ico', '/sw.js',
]);
const OWNED_DIRS = ['/assets/', '/shared/', '/icons/', '/pass/'];

function owns(url) {
  if (url.origin !== self.location.origin) return false;
  if (OWNED_PAGES.has(url.pathname)) return true;
  return OWNED_DIRS.some((d) => url.pathname.startsWith(d));
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      /* One at a time, ignoring failures. addAll rejects the whole install if a
         single entry 404s, and an install that never completes leaves the app
         with no offline shell at all rather than an incomplete one. */
      .then((c) => Promise.all(ASSETS.map((a) => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      /* ONLY this shell's own prefix. Sweeping anything broader would delete the
         wings' offline shells, and on the shared origin it would delete the
         standalone apps' shells too. */
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('oot-shell-') && k !== CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (!owns(url)) return;          /* not ours: behave as if no worker existed */

  e.respondWith(
    /* ignoreSearch is what makes the ?v=N stamps free: the precached entries
       carry no query string and this matches them anyway. The cost is that a
       bumped version is served from cache until the worker itself updates,
       which is why CACHE is bumped in the same commit as any ?v= bump. */
    caches.open(CACHE).then((c) => c.match(req, { ignoreSearch: true })).then((hit) =>
      hit || fetch(req).then((res) => {
        /* Keep the shell current in the background. Opaque and error responses
           are not worth storing. */
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() =>
        /* Only a navigation falls back to the hub. Returning HTML for a failed
           script or image would poison the page with a document where code was
           expected. */
        req.mode === 'navigate'
          ? caches.open(CACHE).then((c) => c.match('./index.html'))
          : undefined
      )
    )
  );
});
