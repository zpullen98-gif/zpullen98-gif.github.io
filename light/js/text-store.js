/* First Light: loading scripture.

   The library is about 12 MB of text. That cannot be precached with the shell and it
   cannot sit in localStorage, so it lives in js/texts/<work>/<part>.js and loads on
   demand: one <script> injection per book, cached by the service worker the first
   time it is asked for, and then permanently local.

   Why classic script injection rather than fetch + JSON:
   - It matches the house rule that content ships as .js declaring globals, never
     .json fetched at runtime.
   - The service worker caches it like any other same-origin script, so "download
     this book for offline" is just "load it once": no second storage system, no
     IndexedDB schema to migrate, no quota negotiation.
   - It works from file:// as well as http://.

   The tradeoff is that a failed load is silent unless you watch for it, which is
   what the pending-promise bookkeeping below is for. */

var FL_TEXT = {};            // work -> part -> payload
var FL_TEXT_PENDING = {};    // "work/part" -> {promise, resolve, reject, script}
var FL_TEXT_V = 3;           // bump with the cache version when a text is re-baked

/* Called by every js/texts/**.js file as its entire body. */
function FLTextPut(work, part, data) {
  (FL_TEXT[work] || (FL_TEXT[work] = {}))[part] = data;
  var key = work + '/' + part;
  var p = FL_TEXT_PENDING[key];
  if (p) { delete FL_TEXT_PENDING[key]; p.resolve(data); }
}

function FLTextHas(work, part) {
  return !!(FL_TEXT[work] && FL_TEXT[work][part]);
}

function FLTextLoad(work, part) {
  if (FLTextHas(work, part)) return Promise.resolve(FL_TEXT[work][part]);

  var key = work + '/' + part;
  if (FL_TEXT_PENDING[key]) return FL_TEXT_PENDING[key].promise;

  var entry = {};
  entry.promise = new Promise(function (resolve, reject) {
    entry.resolve = resolve;
    entry.reject = reject;

    var s = document.createElement('script');
    s.src = 'js/texts/' + work + '/' + part + '.js?v=' + FL_TEXT_V;
    s.async = true;

    s.onerror = function () {
      delete FL_TEXT_PENDING[key];
      s.remove();
      reject(new Error('offline-or-missing'));
    };
    /* A script can load successfully and still not call FLTextPut: a truncated
       file, or a proxy that served an error page with a 200. Without this the
       promise would hang forever and the reader would watch a spinner that never
       resolves, which is precisely the failure the old Study Hall shipped. */
    s.onload = function () {
      setTimeout(function () {
        if (FL_TEXT_PENDING[key]) {
          delete FL_TEXT_PENDING[key];
          reject(new Error('loaded-but-empty'));
        }
      }, 0);
    };

    document.head.appendChild(s);
    entry.script = s;
  });

  FL_TEXT_PENDING[key] = entry;
  return entry.promise;
}

/* Load several parts, reporting progress. Used by "keep this book on the device".
   Sequential on purpose: these are same-origin and already fast, and a burst of
   sixty-six parallel script tags on a phone is a worse experience than a steady
   bar. */
function FLTextLoadMany(work, parts, onProgress) {
  var done = 0, failed = [];
  return parts.reduce(function (chain, part) {
    return chain.then(function () {
      return FLTextLoad(work, part)
        .catch(function (e) { failed.push(part); })
        .then(function () {
          done++;
          if (onProgress) onProgress(done, parts.length, failed.length);
        });
    });
  }, Promise.resolve()).then(function () {
    return { loaded: done - failed.length, failed: failed };
  });
}

/* --- what is already on the device ---
   Asks the cache directly rather than tracking it in localStorage, so the answer
   stays true after a browser eviction, a version bump, or a reader who cleared
   storage on one device but not another. */
function FLTextCached(work) {
  if (!('caches' in window)) return Promise.resolve(null);
  return caches.keys().then(function (keys) {
    var mine = keys.filter(function (k) { return k.indexOf('oot-light-texts') === 0; });
    if (!mine.length) return { have: 0 };
    return caches.open(mine[0]).then(function (c) {
      return c.keys().then(function (reqs) {
        var prefix = 'js/texts/' + work + '/';
        var have = reqs.filter(function (r) { return r.url.indexOf(prefix) > -1; }).length;
        return { have: have };
      });
    });
  }).catch(function () { return null; });
}

function FLTextForget(work) {
  if (!('caches' in window)) return Promise.resolve(0);
  return caches.keys().then(function (keys) {
    var mine = keys.filter(function (k) { return k.indexOf('oot-light-texts') === 0; });
    if (!mine.length) return 0;
    return caches.open(mine[0]).then(function (c) {
      return c.keys().then(function (reqs) {
        var prefix = 'js/texts/' + work + '/';
        var doomed = reqs.filter(function (r) { return r.url.indexOf(prefix) > -1; });
        return Promise.all(doomed.map(function (r) { return c.delete(r); }))
          .then(function () {
            /* Drop the in-memory copy too, or the app keeps happily serving a book
               the reader just asked it to forget. */
            if (FL_TEXT[work]) delete FL_TEXT[work];
            return doomed.length;
          });
      });
    });
  }).catch(function () { return 0; });
}

function FLBytes(n) {
  if (n < 1024) return n + ' B';
  if (n < 1048576) return Math.round(n / 1024) + ' KB';
  return (n / 1048576).toFixed(1) + ' MB';
}
