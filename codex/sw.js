/* The Sommelier's Codex: service worker.
   Bump CACHE on every deploy; that string is the whole update mechanism. */
const CACHE = 'oot-codex-v130';
importScripts('./js/data-teaching-images.js?v=2', './js/teaching-cache.js?v=1');

/* Both the reviewed SVG atlas and original JPG maps stay out of ASSETS.

   This wing precaches one asset at a time rather than atomically, so a
   missing map would not take the offline shell down with it, but everything
   in ASSETS is still re-downloaded in full on every CACHE bump and these
   files are large.

   The reviewed maps use an installation-specific cache filled only on request.
   Both map cache names avoid the codex-/oot-codex- shell prefixes, so shell
   updates retain saved maps. Original JPGs remain readable from the legacy
   shared cache; atlas-cache.js removes only this installation's exact keys. */
const MAP_ROOT = new URL('./maps/', self.location.href);
const MAPS = 'codexmaps-v2-' + encodeURIComponent(new URL('./', self.location.href).pathname);
const LEGACY_MAPS = 'codexmaps-v1';

/* The house's whole bottle list (shared/packs/<pack id>.winelist.v1.json,
   read by codex29's The full list) lives in a cache of its own for the same
   reason as the maps: a codex-vN bump re-fetches only ASSETS and reaps the
   old CACHE, and a list kept there would go stale or go missing after a
   deploy. It is served NETWORK FIRST, so a new edition of the list is read as
   soon as the network answers, and the copy kept here answers offline after
   one visit. Again no hyphen after "codex", so activate never reaps it. */
const LIST = 'codexlist-v1';
const LIST_RE = /\/shared\/packs\/[a-z0-9-]+\.winelist\.v\d+\.json$/;

const ASSETS = [
  './',
  '../shared/oot-config.js',
  '../shared/oot-profiles.js',
  '../shared/oot-home.js',
  '../shared/oot-house.js',
  '../shared/oot-house-ui.js',
  '../shared/oot-home.css',
  '../shared/oot-auth.js',
  '../shared/oot-gate.js',
  '../shared/oot-locks.js',
  '../shared/oot-pass.js',
  '../shared/oot-log.js',
  '../shared/oot-bar.js',
  './index.html',
  './js/oot-service.js',
  './css/service-day.css',
  '../manifest.webmanifest',
  './css/codex.css',
  './css/house.css',
  './css/house-surfaces.css',
  './css/house-study.css',
  './css/house-list.css',
  './css/house-fulllist.css',
  './css/house-maps.css',
  './css/house-teaching.css',
  './assets/codex-library-v1.webp',
  './assets/codex-atlas-room-v2.webp',
  './atlas-sources.html',
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
  './js/data-tasting.js',
  './js/data-floor.js',
  './js/data-pairing.js',
  './js/data-maps.js',
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
  './js/codex15.js',
  './js/codex16.js',
  './js/codex17.js',
  './js/codex18.js',
  './js/codex19.js',
  './js/codex20.js',
  './js/codex21.js',
  './js/codex22.js',
  './js/codex23.js',
  './js/wine-rows.js',
  './js/menu-desk.js',
  './js/data-producers.js',
  './js/data-firstpath.js',
  './js/codex24.js',
  './js/codex25.js',
  './js/codex26.js',
  './js/codex27.js',
  './js/codex28.js',
  './js/codex29.js',
  './js/codex30.js',
  './js/data-atlas-v2.js',
  './js/atlas-cache.js',
  './js/codex31.js',
  './js/codex32.js',
  './js/data-teaching-images.js',
  './js/teaching-cache.js',
  './js/codex33.js',
  './js/codex34.js',
  './js/codex35.js',
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
  /* The list is answered before every other rule, so no broader one (the
     cache-first catch-all below, or the network-first rule for every house
     pack that the site's copy of this worker adds) can ever store it in
     CACHE, which each bump reaps. Kept first on purpose, ahead of the lines
     the site's copy edits, so a three-way merge lands it above that copy's
     own rules without a conflict. */
  if (e.request.method === 'GET' && new URL(e.request.url).origin === location.origin && LIST_RE.test(new URL(e.request.url).pathname)) {
    e.respondWith(caches.open(LIST).then(c =>
      fetch(e.request).then(res => {
        if (res.ok) c.put(e.request, res.clone());
        return res;
      }).catch(() => c.match(e.request, { ignoreSearch: true }).then(hit => {
        if (hit) return hit;
        throw new Error('the list is not on this device yet');
      }))));
    return;
  }
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  /* Only paths this wing actually owns or precaches. Handling every same-origin
     GET meant root files fetched from a codex page (robots.txt, the hub's
     legal pages) were runtime-cached into OUR cache and served stale-forever
     by ignoreSearch, and the interception itself made crawler-style fetches
     flaky. Anything else, the browser handles natively. */
  if (!url.pathname.startsWith('/codex/') && !url.pathname.startsWith('/shared/')) return;

  /* These namespaces must precede both the broad maps rule and shell fallback.
     Only exact reviewed manifest files are cached, within their own bounds.
     Empty or missing art never blocks installation or a written lesson. */
  if (CodexTeachingCache.owns(url.href, self.location.href)) {
    e.respondWith(CodexTeachingCache.respond(e.request, self.location.href));
    return;
  }

  /* Served out of the maps cache, never out of CACHE, so a deploy cannot
     throw away what the reader chose to keep. Falling through to the network
     covers a map that is present on the server and not yet stored. */
  if (url.pathname.startsWith(MAP_ROOT.pathname)) {
    // The original JPGs remain an archive. Exact legacy keys still work;
    // new SVGs use the current installation's own persistent map collection.
    const mapCache = /\.jpg$/i.test(url.pathname) ? LEGACY_MAPS : MAPS;
    e.respondWith(caches.open(mapCache).then(c =>
      c.match(e.request).then(hit => hit || fetch(e.request))));
    return;
  }

  /* A house pack under /shared/packs/ is network first: the file is read on
     the person's press of an import door and must be the one the site holds
     now, never the copy this cache-first worker stored a fortnight ago. The
     fresh copy is stored, and the cache answers only when the network does
     not, so an import still works offline once the pack has been fetched. */
  if (url.pathname.startsWith('/shared/packs/')) {
    e.respondWith(fetch(e.request).then(res => {
      if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
      return res;
    }).catch(() => caches.open(CACHE).then(c => c.match(e.request, { ignoreSearch: true }))));
    return;
  }
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
