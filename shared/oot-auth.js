/* Outside Of Time: auth.
   Email magic link via Supabase, with a local mock when the project does not
   exist yet. Classic script, no build step, loaded after oot-config.js.

   Two things shape this file:

   1. The SDK is loaded LAZILY, from the CDN, and only when something actually
      needs it: a sign-in, a sign-out, or a token for the gate to re-verify
      with. A wing with a warm entitlement cache makes no network request at
      all. Loading ~40KB of SDK on every page of an offline-first app, in five
      wings, to answer a question the cache already answered, would be a poor
      trade and it would fail on a train.

   2. Session restore does NOT need the SDK. Supabase v2 persists the session to
      localStorage, so who-is-signed-in is answerable synchronously and offline.
      That is read behind a shape check and falls back to the SDK if the format
      ever moves.

   Mock mode is not a stub: it genuinely signs you in, to a local-only identity,
   so the whole Phase 2 acceptance path is testable before the project exists.
   OOT.auth.mode says which you are in, and the hub says so out loud. */
(function (w) {
  'use strict';
  var OOT = w.OOT = w.OOT || {};
  var cfg = (OOT.config && OOT.config.supabase) || {};

  var SDK_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
  var MOCK_KEY = 'oot-mock-session';

  /* supabase-js derives its storage key from the project ref in the URL. Compute
     the same key rather than scanning for one that looks right: two projects can
     share an origin (the redirect allowlist has localhost in it precisely so dev
     and production both land here), and localStorage iteration is insertion
     order, so a scan adopts the OLDEST session forever. */
  var PROJECT_REF = null;
  try {
    if (cfg.url) PROJECT_REF = new URL(cfg.url).hostname.split('.')[0];
  } catch (e) { /* malformed url: falls through to mock below */ }

  /* PROJECT_REF is part of the test: a URL that does not parse cannot reach a
     project, so booting "configured" on it would produce a broken Supabase
     mode instead of the working mock the comment above always promised. */
  var CONFIGURED = !!(cfg.url && cfg.anonKey && PROJECT_REF);
  var SESSION_KEY = PROJECT_REF ? 'sb-' + PROJECT_REF + '-auth-token' : null;

  var listeners = [];
  var client = null;
  var clientPromise = null;
  var sdkPromise = null;
  var readyResolve;
  var readySettled = false;

  function store(k) {
    try { return w.localStorage.getItem(k); } catch (e) { return null; }
  }
  function put(k, v) {
    try { w.localStorage.setItem(k, v); } catch (e) {}
  }
  function drop(k) {
    try { w.localStorage.removeItem(k); } catch (e) {}
  }

  /* ---------------------------------------------------- session, no SDK --- */

  /* Supabase v2 writes one localStorage entry per project. Reading OUR key
     directly is what makes a wing's first paint offline-capable. Every access
     is guarded: if the shape is not what we expect, we return null and the SDK
     path takes over. */
  function persistedSession() {
    if (!SESSION_KEY) return null;
    try {
      var raw = w.localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      /* supabase-js has stored this both bare and wrapped over its life */
      if (s && s.currentSession) s = s.currentSession;
      if (!s || !s.access_token || !s.user || !s.user.id) return null;
      /* An EXPIRED access token is still an identity: the refresh token
         stored beside it can mint a new one, and the SDK does exactly that
         when it loads. Treating expiry as sign-out looked cautious and was
         the opposite: access tokens live for about an hour, the ordinary
         page load never loads the SDK, so every subscriber was signed out
         by their next visit and the gate's whole 7-day offline grace was
         unreachable. Freshness is the caller's business: accessToken()
         re-checks expires_at itself before handing a token to anyone. */
      return s;
    } catch (e) { /* unparseable or storage blocked: fall through to the SDK */ }
    return null;
  }

  /* Everything this origin holds about who is signed in. Sign-out clears all of
     it, unconditionally, before it goes anywhere near the network. */
  function forgetLocally() {
    drop(MOCK_KEY);
    /* The mock result store pairs rounds with 'mock-<email>' ids. On a shared
       device, "signing out clears the account from the device" (privacy.html)
       has to include them; the live store has no such key: results live
       server-side there. */
    drop('oot-mock-results');
    if (SESSION_KEY) {
      drop(SESSION_KEY);
      drop(SESSION_KEY + '-code-verifier');
    }
  }

  function shape(u) {
    return u ? { id: u.id, email: u.email || null } : null;
  }

  function emit() {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](OOT.auth.user); } catch (e) {}
    }
  }

  function setUser(u) {
    var before = OOT.auth.user && OOT.auth.user.id;
    OOT.auth.user = u;
    if ((u && u.id) !== before) {
      /* The gate caches per user, so it has to be told before anyone repaints. */
      if (OOT.gate && typeof OOT.gate._onIdentityChange === 'function') {
        OOT.gate._onIdentityChange(u);
      }
      emit();
    }
  }

  /* -------------------------------------------------------------- the SDK --- */

  function loadSdk() {
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise(function (resolve, reject) {
      if (w.supabase && w.supabase.createClient) return resolve(w.supabase);
      var s = document.createElement('script');
      s.src = SDK_URL;
      s.async = true;
      s.onload = function () {
        if (w.supabase && w.supabase.createClient) resolve(w.supabase);
        else reject(new Error('Supabase SDK loaded but createClient is missing'));
      };
      s.onerror = function () {
        /* Almost always offline. Let the caller decide; the gate falls back to
           its cache rather than treating this as a sign-out. The message is
           written for the person in front of the screen, because the hub shows
           it verbatim; naming the CDN told them nothing they could act on. */
        sdkPromise = null;
        var e = new Error('Could not reach the sign-in service. Check your connection and try again.');
        e.code = 'sdk-unreachable';
        reject(e);
      };
      document.head.appendChild(s);
    });
    return sdkPromise;
  }

  /* Memoizes the PROMISE, not just the settled client. Two callers arriving
     together (the gate verifying while the hub signs in) both used to find
     client === null and each build one, producing two clients and two
     onAuthStateChange subscriptions on the same storage key. */
  function getClient() {
    if (clientPromise) return clientPromise;
    clientPromise = loadSdk().then(function (sb) {
      client = sb.createClient(cfg.url, cfg.anonKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
      client.auth.onAuthStateChange(function (_evt, session) {
        setUser(shape(session && session.user));
      });
      return client;
    }).catch(function (err) {
      /* Let the next caller try again rather than caching the failure: the
         usual cause is a network that has since come back. */
      clientPromise = null;
      throw err;
    });
    return clientPromise;
  }

  /* ---------------------------------------------------------------- api --- */

  OOT.auth = {
    mode: CONFIGURED ? 'supabase' : 'mock',

    /* null until known. { id, email } once signed in. */
    user: null,

    /* Resolves once the initial restore has run. Never rejects. */
    ready: new Promise(function (res) { readyResolve = res; }),

    isSignedIn: function () { return !!(this.user && this.user.id); },

    /* Supabase: sends a magic link, resolves { sent: true }. The user is not
       signed in until they follow it and land back here.
       Mock: signs in immediately, resolves { sent: false }. */
    signIn: function (email) {
      email = (email || '').trim();
      if (!email) return Promise.reject(new Error('An email address is required.'));

      if (!CONFIGURED) {
        var user = { id: 'mock-' + email.toLowerCase(), email: email };
        put(MOCK_KEY, JSON.stringify(user));
        setUser(user);
        return Promise.resolve({ sent: false, mode: 'mock' });
      }

      return getClient().then(function (c) {
        return c.auth.signInWithOtp({
          email: email,
          options: { emailRedirectTo: w.location.origin + '/' }
        });
      }).then(function (r) {
        if (r && r.error) throw r.error;
        return { sent: true, mode: 'supabase' };
      });
    },

    /* Forgets locally FIRST, then tells the server. The old order meant an
       offline sign-out, or one where the CDN is blocked, left the persisted
       session in localStorage while reporting success: the next load restored
       the account, so signing out of a venue's shared iPad handed it to the
       next person. Revoking the refresh token server-side is the nice-to-have;
       not leaving credentials on the device is the requirement. */
    signOut: function () {
      forgetLocally();
      setUser(null);
      if (!CONFIGURED) return Promise.resolve();
      return getClient()
        .then(function (c) { return c.auth.signOut(); })
        .then(function () { forgetLocally(); })  /* the SDK may rewrite it */
        .catch(function () { forgetLocally(); });
    },

    /* The gate needs a live token to re-verify. Resolves null when offline or
       signed out, which the gate reads as "keep using the cache", not "free". */
    accessToken: function () {
      if (!CONFIGURED) return Promise.resolve(this.isSignedIn() ? 'mock-token' : null);
      var s = persistedSession();
      if (s && s.expires_at && s.expires_at * 1000 > Date.now() + 60000) {
        return Promise.resolve(s.access_token);
      }
      return getClient()
        .then(function (c) { return c.auth.getSession(); })
        .then(function (r) {
          var sess = r && r.data && r.data.session;
          return sess ? sess.access_token : null;
        })
        .catch(function () { return null; });
    },

    /* Fires immediately with the current value, then on every change. */
    onChange: function (fn) {
      if (typeof fn !== 'function') return function () {};
      listeners.push(fn);
      try { fn(OOT.auth.user); } catch (e) {}
      return function off() {
        var i = listeners.indexOf(fn);
        if (i > -1) listeners.splice(i, 1);
      };
    },

    /* Exposed so the gate can reach the client without duplicating the loader. */
    _client: getClient
  };

  /* ------------------------------------------------------------ restore --- */

  /* ready must settle exactly once, and must settle on every path: the hub and
     the gate both await it, so a branch that forgets leaves the whole page
     waiting on a promise nobody will resolve. */
  function settleReady() {
    if (readySettled) return;
    readySettled = true;
    readyResolve(OOT.auth.user);
  }

  /* Another tab changing who is signed in must reach THIS tab too. Without
     this, a venue iPad where one person signs out in a second tab leaves the
     first tab holding the old identity: it keeps painting the old name, and
     every result it logs pairs the old user_id with the new tab's token:
     refused by RLS, silently, forever. The storage event is exactly the
     cross-tab signal for this; e.key === null means storage.clear(). */
  w.addEventListener('storage', function (e) {
    if (e && e.key !== null && e.key !== MOCK_KEY && e.key !== SESSION_KEY) return;
    if (!CONFIGURED) {
      var raw = store(MOCK_KEY);
      var u = null;
      if (raw) { try { u = JSON.parse(raw); } catch (err) {} }
      setUser(u && u.id ? u : null);
      return;
    }
    var s = persistedSession();
    setUser(s ? shape(s.user) : null);
  });

  (function restore() {
    if (!CONFIGURED) {
      var raw = store(MOCK_KEY);
      if (raw) {
        try { OOT.auth.user = JSON.parse(raw); } catch (e) { drop(MOCK_KEY); }
      }
      settleReady();
      emit();
      return;
    }

    var s = persistedSession();
    if (s) {
      OOT.auth.user = shape(s.user);
      emit();
      /* The identity stands; if its access token has lapsed, wake the SDK in
         the background to spend the refresh token. Online only. Offline the
         gate's grace window is exactly what covers this. If the refresh token
         is dead, onAuthStateChange delivers the sign-out and everything
         corrects on the normal path. */
      if (s.expires_at && s.expires_at * 1000 <= Date.now() &&
          !(w.navigator && w.navigator.onLine === false)) {
        getClient().catch(function () {});
      }
    }

    /* A magic-link landing carries its tokens in the URL fragment, and only the
       SDK can exchange them. Load it in that one case, and otherwise trust the
       persisted session so an ordinary page load stays offline-clean. */
    var hash = w.location.hash || '';
    var hasAuthFragment = /[#&](access_token|error_description)=/.test(hash);
    if (hasAuthFragment) {
      /* Surface what the link actually said. A used or expired magic link comes
         back as error_description, and silently swallowing it left the visitor
         staring at a signed-out page with no idea why. */
      var m = /[#&]error_description=([^&]*)/.exec(hash);
      if (m) {
        try { OOT.auth.linkError = decodeURIComponent(m[1].replace(/\+/g, ' ')); }
        catch (e) { OOT.auth.linkError = 'That sign-in link did not work.'; }
      }

      getClient()
        .then(function (c) { return c.auth.getSession(); })
        .then(function (r) {
          var sess = r && r.data && r.data.session;
          if (sess) setUser(shape(sess.user));
        })
        .catch(function () {})
        .then(function () {
          /* Strip the fragment on EVERY branch. It used to live inside the
             success handler, so a blocked CDN or an offline device left
             #access_token=... in the address bar and in history, where it is a
             live credential anyone can copy out of a shared screen. */
          if (w.history && w.history.replaceState) {
            w.history.replaceState(null, '', w.location.pathname + w.location.search);
          }
          settleReady();
        });

      /* The SDK fetch can stall indefinitely behind a captive portal, and
         everything downstream awaits this promise. Settle on a timer so the
         page becomes usable as a signed-out visitor instead of never
         rendering; a later success still calls setUser and repaints. */
      w.setTimeout(settleReady, 8000);
    } else {
      settleReady();
    }
  })();
})(window);
