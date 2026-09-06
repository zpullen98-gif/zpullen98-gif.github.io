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
const CACHE = 'oot-shell-v11';

/* Every page asks for shared/oot-config.js?v=23 and the cache is matched with
   ignoreSearch, so the precached copy answers whatever stamp the page wears:
   a ?v= bump on its own does NOT refetch anything here. What keeps the shell
   current is the fetch handler below, which revalidates every hit in the
   background, and this CACHE name, which moves in the same commit as any
   shared edit and drops the whole set. See the note in the fetch handler. */
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
  /* the jpg is the <picture> fallback for a browser without webp; it is
     stored at runtime by such a browser rather than downloaded by every one */
  './assets/fonts/cinzel-normal-400-900-latin.woff2',
  './assets/fonts/cinzel-normal-400-900-latin-ext.woff2',
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

  /* Two strategies, chosen by what is asked for, so a stale shell heals itself
     instead of waiting for somebody to remember this file.

     The HTML documents go network first. A page is what names every ?v= stamp,
     so a fresh copy of it is what pulls everything else forward: with a
     connection a visitor always gets the current hub, and the cache answers
     only when the network cannot.

     Everything else (shared/, assets/, icons/, the manifest) is served
     stale-while-revalidate: the cached copy answers at once and the network
     copy replaces it for next time, so a script or stylesheet is never more
     than one load behind and the page never waits on it.

     ignoreSearch is what makes the ?v=N stamps free: the precached entries
     carry no query string and this matches them anyway. Refetched copies are
     stored under the bare path for the same reason, so one file is one entry
     however many stamps it has worn. */
  const isDoc = req.mode === 'navigate' ||
    url.pathname.endsWith('/') || url.pathname.endsWith('.html');

  const store = (res) => {
    /* Opaque and error responses are not worth storing. */
    if (res && res.ok && res.type === 'basic') {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(url.pathname, copy)).catch(() => {});
    }
    return res;
  };
  const cached = () => caches.open(CACHE).then((c) => c.match(req, { ignoreSearch: true }));

  if (isDoc) {
    e.respondWith(
      fetch(req).then(store).catch(() =>
        cached().then((hit) =>
          /* Only a navigation falls back to the hub. Returning HTML for a failed
             script or image would poison the page with a document where code was
             expected. */
          hit || (req.mode === 'navigate'
            ? caches.open(CACHE).then((c) => c.match('./index.html'))
            : undefined)
        )
      )
    );
    return;
  }

  e.respondWith(
    cached().then((hit) => {
      const fresh = fetch(req).then(store).catch(() => undefined);
      /* Keep the worker alive until the background copy is stored; without
         this the browser may stop it the moment the cached hit is returned,
         and the revalidation never lands. */
      e.waitUntil(fresh);
      return hit || fresh;
    })
  );
});
