/* The Sommelier's Codex: service worker.
   Bump CACHE on every deploy; that string is the whole update mechanism. */
const CACHE = 'oot-codex-v78';

const ASSETS = [
  './',
  '../shared/oot-config.js',
  '../shared/oot-profiles.js',
  '../shared/oot-home.js',
  '../shared/oot-home.css',
  '../shared/oot-auth.js',
  '../shared/oot-gate.js',
  '../shared/oot-locks.js',
  '../shared/oot-pass.js',
  '../shared/oot-log.js',
  '../shared/oot-bar.js',
  './index.html',
  '../manifest.webmanifest',
  './css/codex.css',
  './js/data-questions.js',
  './js/reference.js',
  './js/core.js',
  './js/codex2.js',
  './js/codex3.js',
  './js/codex4.js',
  './js/codex5.js',
  './js/data-primers.js',
  './js/codex6.js',
  './js/data-intro.js',
  './js/data-primers-intro.js',
  './js/data-grapes-plus.js',
  './js/data-advanced.js',
  './js/data-primers-advanced.js',
  './js/data-master.js',
  './js/data-primers-master.js',
  './js/codex7.js',
  './js/codex8.js',
  './js/codex9.js',
  './js/codex10.js',
  './js/codex11.js',
  './js/codex12.js',
  './js/codex14.js',
  './js/data-firstpath.js',
  './js/boot.js',
  './fonts/cinzel-normal-400-900-latin.woff2',
  './fonts/cinzel-normal-400-900-latin-ext.woff2',
  './fonts/cinzeldecorative-normal-700-latin.woff2',
  './fonts/cinzeldecorative-normal-700-latin-ext.woff2',
  './fonts/cinzeldecorative-normal-900-latin.woff2',
  './fonts/cinzeldecorative-normal-900-latin-ext.woff2',
  './fonts/ebgaramond-normal-400-800-latin.woff2',
  './fonts/ebgaramond-normal-400-800-latin-ext.woff2',
  './fonts/ebgaramond-italic-400-800-latin.woff2',
  './fonts/ebgaramond-italic-400-800-latin-ext.woff2',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  /* Precache one asset at a time rather than with addAll.

     addAll is atomic: one 404 rejects the whole call and the worker installs
     with NO cache, so the wing looks healthy online and is completely broken
     offline. That became a real risk when '../shared/oot-bar.js' was added to
     ASSETS: it is the only entry that leaves this directory, so a reorganised
     shared/ would take the entire Codex offline shell down with it. First
     Light already precaches this way, for exactly this reason.

     cache:'reload' bypasses the HTTP cache so a new SW never precaches stale copies. */
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const failed = [];
    for (const url of ASSETS) {
      try {
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (!res.ok) { failed.push(url + ' -> HTTP ' + res.status); continue; }
        await cache.put(url, res);
      } catch (err) {
        failed.push(url + ' -> ' + err.message);
      }
    }
    if (failed.length) {
      console.error("The Sommelier's Codex: " + failed.length + ' of ' + ASSETS.length +
        ' assets did not precache, so offline will be incomplete.\n' + failed.join('\n'));
    }
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      /* Cache Storage is per-ORIGIN, not per-scope. Inside Outside Of Time every wing
         shares one origin, so deleting everything that is not ours would wipe the
         offline shells of The Bartender's Ledger, First Light and Calendar For Life.
         Only ever reap our own prefix. */
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('oot-codex-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()));
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  /* Only paths this wing actually owns or precaches. Handling every same-origin
     GET meant root files fetched from a codex page (robots.txt, the hub's
     legal pages) were runtime-cached into OUR cache and served stale-forever
     by ignoreSearch, and the interception itself made crawler-style fetches
     flaky. Anything else, the browser handles natively. */
  if (!url.pathname.startsWith('/codex/') && !url.pathname.startsWith('/shared/')) return;
  e.respondWith(
    /* Scoped to OUR cache. The bare caches.match() walks every cache on the
       origin in creation order and returns the first hit, and since Phase 2
       every wing stores the shared scripts under the identical key
       /shared/oot-*.js, an older sibling wing's cache would answer for them.
       With ignoreSearch discarding the ?v= as well, no version bump could
       dislodge it: open the Codex after editing a shared file and you could be
       served the Ledger's copy from a fortnight ago. */
    caches.open(CACHE).then(cache =>
      cache.match(e.request, { ignoreSearch: true }).then(hit =>
        hit || fetch(e.request).then(res => {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        })
      ).catch(err => {
        /* offline fallback only makes sense for page navigations, since returning
           HTML for a failed font/script request would corrupt the cache story */
        if (e.request.mode === 'navigate') return cache.match('./index.html');
        throw err;
      })
    )
  );
});
