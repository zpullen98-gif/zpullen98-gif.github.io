/*
 * sw-shared.js: warm the Outside Of Time shared stack into this worker's
 * runtime cache at install.
 *
 * Pulled into the generated sw.js by importScripts (vite.config.ts), and only
 * in the wing build (BASE_PATH=/table): a standalone build carries this file
 * and never imports it.
 *
 * The scripts listed below live at the ORIGIN ROOT of Outside Of Time, outside
 * this project, so the precache glob cannot see them and the precache manifest
 * must not list them: precache install is atomic, and a file this repo does
 * not own would cost the entire offline shell if it were ever missing. This
 * is the non-atomic half. Every URL is fetched on its own, every failure is
 * swallowed, and the install never waits on a rejection.
 *
 * Why it exists: the hub's "store every wing offline" registers this worker
 * and stops. The runtime route in vite.config.ts caches /shared/ on first use,
 * so until the wing had been opened once online the cache stayed empty, and
 * an offline first open got the whole cookbook with no return chip, no
 * identity row and no streak credit. Now the install fills it, and a new
 * worker (every rebuild) fills it again.
 *
 * The URLs are BARE. shell.html loads them as /shared/oot-x.js?v=N and the
 * stamp is written by the monorepo's inject-oot-bar.mjs, which this file
 * cannot see. The runtime route (vite.config.ts) strips the search from its
 * cache KEY on every read and write, so a ?v=N request is answered from the
 * bare entry written here and the revalidation refreshes that same entry, not
 * a stamped twin nothing reads. Order matters nowhere here: the page's own
 * script tags decide the load order.
 *
 * ONE LIST. inject-oot-bar.mjs --check reads OOT_SHARED out of the built copy
 * of this file and fails when its own SHARED list disagrees, so a script added
 * on one side cannot be forgotten on the other. The cache name must match the
 * runtimeCaching entry in vite.config.ts.
 */
var OOT_SHARED_CACHE = 'oot-shared-v1';
var OOT_SHARED = [
	'oot-config.js',
	'oot-profiles.js',
	'oot-home.js',
	'oot-auth.js',
	'oot-gate.js',
	'oot-locks.js',
	'oot-pass.js',
	'oot-log.js',
	'oot-bar.js'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches
			.open(OOT_SHARED_CACHE)
			.then(function (cache) {
				return Promise.allSettled(
					OOT_SHARED.map(function (name) {
						return cache.add('/shared/' + name);
					})
				);
			})
			.catch(function () {
				/* No cache storage, or nothing reachable: the install goes on. */
			})
	);
});
