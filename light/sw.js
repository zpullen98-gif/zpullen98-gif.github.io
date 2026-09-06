/* First Light: service worker.

   Bump CACHE on every deploy. That string is the whole update mechanism: a new name
   means a fresh precache, and the activate handler reaps the old one.

   If you add a file, add it to ASSETS here AND to a <script>/<link> tag in
   index.html. A file in one and not the other is the single most common way this
   app breaks offline while looking fine online. */

const CACHE = 'oot-light-v59';

/* Scripture lives in its own cache, deliberately NOT versioned with the shell.
   The library is ~12 MB; tying it to CACHE would throw it away and re-download it
   on every deploy, which is both rude to the reader on mobile data and the fastest
   way to make "saved for offline" a lie. It is only ever cleared on request, from
   Settings or the Library. Bump this only if a text is re-baked. */
const TEXT_CACHE = 'oot-light-texts-v3';

const ASSETS = [
  './',
  './index.html',
  /* The nine shared scripts are the only content this wing loads from outside
     its own directory, and every page needs them: without them cached, an
     offline reader gets a wing with no return chip and no profile row. The
     other three vanilla wings have always precached these; this one did not. */
  '../shared/oot-config.js',
  '../shared/oot-profiles.js',
  '../shared/oot-home.js',
  '../shared/oot-auth.js',
  '../shared/oot-gate.js',
  '../shared/oot-locks.js',
  '../shared/oot-pass.js',
  '../shared/oot-log.js',
  '../shared/oot-bar.js',
  '../manifest.webmanifest',
  './css/firstlight.css',

  './js/data-year.js',
  './js/data-year-makers.js',
  './js/data-practice.js',
  './js/data-intent.js',
  './js/data-life.js',
  './js/data-body.js',
  './js/data-astro.js',
  './js/data-canon.js',
  './js/data-library.js',
  './js/data-traditions.js',
  './js/data-threads.js',

  './js/registry.js',
  './js/store.js',
  './js/tracks.js',
  './js/plan.js',
  './js/sun.js',
  './js/text-store.js',
  './js/reading.js',
  './js/journal.js',
  './js/search.js',
  './js/astro-chart.js',
  './js/astro-wheel.js',
  './js/practice.js',

  './js/ui-today.js',
  './js/ui-year.js',
  './js/ui-life.js',
  './js/ui-library.js',
  './js/ui-hall.js',
  './js/ui-body.js',
  './js/ui-floor.js',
  './js/ui-clear.js',
  './js/ui-lineup.js',
  './js/ui-astro.js',
  './js/ui-chart.js',
  './js/ui-journal.js',
  './js/ui-vault.js',
  './js/ui-settings.js',
  './js/app.js',
  './js/oot-light.js',

  './fonts/cormorant.woff2',
  './fonts/cormorant-italic.woff2',
  './fonts/karla.woff2',

  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  /* Precache one asset at a time rather than with addAll.

     addAll is atomic: one 404, or one duplicate entry, rejects the whole call and
     the worker installs with NO cache at all. The app then looks perfectly healthy
     online and is completely broken offline, the worst failure this file can
     produce, because nothing surfaces it until someone has no signal. Worse, the
     worker still activates, so install never runs again to fix itself.

     cache:'reload' bypasses the HTTP cache so a new worker never precaches the stale
     copies the browser happens to be holding. */
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const failed = [];
    let netFail = false;
    for (const url of ASSETS) {
      try {
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (!res.ok) { failed.push(url + ' → HTTP ' + res.status); continue; }
        await cache.put(url, res);
      } catch (err) {
        /* a rejected fetch is a network blip: retryable; an HTTP status is a
           deploy defect, permanent until the next deploy either way */
        failed.push(url + ' → ' + err.message);
        netFail = true;
      }
    }
    if (failed.length) {
      console.error('First Light: ' + failed.length + ' of ' + ASSETS.length +
        ' assets did not precache, so offline will be incomplete.\n' + failed.join('\n'));
      /* Fail the install ONLY for network failures: the browser discards this
         worker and retries the whole install on the next check while the old,
         complete worker keeps serving. HTTP errors install anyway: throwing
         on a genuinely missing file would recreate addAll's permanent wedge,
         and check-syntax now catches missing ASSETS before deploy. */
      if (netFail) throw new Error('precache incomplete over the network: retrying on the next update check');
    } else {
      console.log('First Light: precached ' + ASSETS.length + ' assets into ' + CACHE + '.');
    }
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      /* Cache Storage is per-ORIGIN, not per-scope. On zpullen98-gif.github.io every
         project page can see every other project's caches, so deleting everything
         that is not ours would wipe the offline shells of The Bartender's Ledger,
         The Sommelier's Codex, and Calendar For Life. Only ever reap our own prefix. */
      keys.filter(k => k.startsWith('oot-light-') && k !== CACHE && k !== TEXT_CACHE)
          .map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  /* Scripture, YouTube titles and thumbnails are all cross-origin. Let them go
     straight to the network: they are handled by their own code, which knows how to
     fail honestly, and caching them here would hide that from it. Phase 2 stores
     passages in IndexedDB: deliberately not here, where a naive sibling reap could
     reach them and where {ignoreSearch:true} would collide with the ?translation=
     and ?version= query strings that identify them. */
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  /* Scripture: cache-first into the permanent text cache, filling on first read.
     This is what makes "keep this book on the device" a plain script load rather
     than a second storage system: no IndexedDB schema, no quota negotiation, and
     the same code path serves a cached book and a fresh one.

     ignoreSearch is NOT used here. These URLs carry ?v=N identifying which bake of
     a text they are, and matching across that would serve last month's translation
     for this month's request. */
  if (url.pathname.indexOf('/js/texts/') > -1 ||
      url.pathname.indexOf('/js/vendor/') > -1 ||
      url.pathname.indexOf('/js/data-cities.js') > -1) {
    /* the chart's lazy payloads (astronomy engine, city list) ride the texts
       cache: versioned by ?v= like the books, cached on first use, and
       without this #/chart was permanently broken offline */
    e.respondWith(
      caches.open(TEXT_CACHE).then(cache =>
        cache.match(req).then(hit => hit || fetch(req).then(res => {
          /* Only keep a real answer. A 404 or an captive-portal login page cached
             here would be permanent, and would read to the app as a book that
             exists but is empty. */
          if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
          return res;
        }))
      )
    );
    return;
  }

  e.respondWith(
    /* ignoreSearch is what makes the ?v=N cache-busting free: the precached entries
       carry no query string, and this matches them anyway. */
    caches.open(CACHE).then(c => c.match(req, { ignoreSearch: true })).then(hit =>
      hit || fetch(req).catch(() =>
        /* Only navigations fall back to the shell. Returning HTML for a failed font
           or script would poison the page with a document where code was expected. */
        req.mode === 'navigate' ? caches.open(CACHE).then(c => c.match('./index.html')) : undefined
      )
    )
  );
});
