/* The Bartender's Ledger: service worker.
   Bump CACHE on every deploy; that string is the whole update mechanism. */
const CACHE = 'oot-ledger-v51';

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
  './css/ledger.css',
  './css/print.css',
  './js/data-core.js',
  './js/engine.js',
  './js/data-questions.js',
  './js/data-lore.js',
  './js/data-service.js',
  './js/srs.js',
  './js/ui-study.js',
  './js/ui-practice.js',
  './js/ui-reference.js',
  './js/ui-prep.js',
  './js/ui-new.js',
  './js/ui-mybar.js',
  './js/app.js',
  './js/data-firstpath.js',
  './js/oot-ledger.js',
  './fonts/rye-400.woff2',
  './fonts/courier-prime-400.woff2',
  './fonts/courier-prime-700.woff2',
  './fonts/libre-franklin-var.woff2',
  /* only the icon index.html links: the root manifest and its PNGs belong to
     the shell worker, and the fetch handler below never serves a root path */
  './icons/icon.svg'
];

self.addEventListener('install', e => {
  /* Precache one asset at a time rather than with addAll.

     addAll is atomic: one 404 rejects the whole call and the worker installs
     with NO cache, so the wing looks healthy online and is completely broken
     offline. That became a real risk when '../shared/oot-bar.js' was added to
     ASSETS: it is the only entry that leaves this directory, so a reorganised
     shared/ would take the entire Ledger offline shell down with it. First
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
      console.error("The Bartender's Ledger: " + failed.length + ' of ' + ASSETS.length +
        ' assets did not precache, so offline will be incomplete.\n' + failed.join('\n'));
    }
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      /* Cache Storage is per-ORIGIN, not per-scope. Inside Outside Of Time every wing
         shares one origin, so deleting everything that is not ours would wipe the
         offline shells of The Sommelier's Codex, First Light and Calendar For Life.
         Only ever reap our own prefix. */
      .then(keys => Promise.all(
        /* ONLY the oot- prefix. The standalone Bartender's Ledger lives on the
           same github.io origin and owns every 'ledger-*' cache there; sweeping
           that prefix from in here would delete a working app's offline shell.
           This wing has never deployed under any other name, so there is no
           legacy cache of its own to collect. */
        keys.filter(k => k.startsWith('oot-ledger-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // external links pass through
  /* Only paths this wing owns or precaches: root files fetched from a ledger
     page (robots.txt, the hub's legal pages) must not be runtime-cached into
     OUR cache and served stale-forever by ignoreSearch. */
  if (!url.pathname.startsWith('/ledger/') && !url.pathname.startsWith('/shared/')) return;
  e.respondWith(
    /* Scoped to OUR cache. The bare caches.match() walks every cache on the
       origin and returns the first hit, and since Phase 2 every wing stores the
       shared scripts under the identical key /shared/oot-*.js, so a sibling
       wing's older cache could answer for them, with ignoreSearch discarding
       the ?v= that was supposed to prevent exactly that. */
    caches.open(CACHE).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(hit =>
        hit || fetch(req).catch(() =>
          req.mode === 'navigate' ? cache.match('./index.html') : undefined)
      )
    )
  );
});
