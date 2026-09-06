/* Outside Of Time: the entitlement gate.
   Resolves tier = 'anon' | 'free' | 'paid' and caches it with a 7-day offline
   grace. Classic script, loaded after oot-auth.js. Phase 3 adds the paywall
   overlay on top of this; nothing here draws UI.

   tier() is deliberately SYNCHRONOUS. A wing has to branch on it during its
   first render, and an async answer would mean every wing painting free content
   and then correcting itself, which reads as a flicker and, on a slow link, as
   a bug. The cache is the source of truth for the current paint; the network
   only ever updates it for the next one.

   The grace window is the whole point of the design. Someone studying on a
   train has paid, and an unreachable server is not evidence that they have not.
   So: verified within 7 days means paid, offline or not. Past 7 days with no
   verification, access falls back to free rather than staying paid forever,
   because the cache is client-side and trivially editable. This is a soft
   paywall by construction, not by concession. */
(function (w) {
  'use strict';
  var OOT = w.OOT = w.OOT || {};

  var CACHE_KEY = 'oot-entitlement-v1';
  var MOCK_KEY = 'oot-mock-tier';
  var GRACE_MS = 7 * 24 * 60 * 60 * 1000;
  var TIERS = ['anon', 'free', 'paid'];

  var listeners = [];
  var current = 'anon';
  var readyResolve;
  var inflight = null;
  /* Bumped whenever the question changes: a refresh, or a different account
     signing in. A verify that was already in flight when that happened is
     answering a stale question, and its result must be dropped rather than
     applied; otherwise signing out while a check is in flight can re-grant
     the previous account's tier a moment later. */
  var gen = 0;

  function get(k) { try { return w.localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { w.localStorage.setItem(k, v); } catch (e) {} }
  function drop(k) { try { w.localStorage.removeItem(k); } catch (e) {} }

  function readCache() {
    try {
      var c = JSON.parse(get(CACHE_KEY) || 'null');
      if (!c || !c.userId || TIERS.indexOf(c.tier) === -1) return null;
      if (typeof c.expiresAt !== 'number' || typeof c.checkedAt !== 'number') return null;
      /* An expiry further out than the grace allows did not come from
         writeCache. Either the clock moved or somebody edited it; both mean the
         window is not evidence of anything, so treat the entry as absent. */
      if (c.expiresAt - c.checkedAt > GRACE_MS) return null;
      if (c.checkedAt > Date.now() + 60000) return null;   /* written in the future */
      return c;
    } catch (e) {}
    return null;
  }

  function writeCache(userId, tier, periodEnd) {
    var now = Date.now();
    put(CACHE_KEY, JSON.stringify({
      userId: userId,
      tier: tier,
      checkedAt: now,
      expiresAt: now + GRACE_MS,
      periodEnd: periodEnd || null
    }));
  }

  /* The dev override, deliberately fenced. It outranks the server, so left
     unscoped it would follow a tester's browser from mock mode into the live
     project: fill in the Supabase keys and every device that ever ran
     setMockTier('paid') keeps reading paid, silently, with no request. It is
     honoured only in mock mode or on a local host. */
  function mockTier() {
    if (OOT.auth.mode !== 'mock' && !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(w.location.hostname)) {
      return null;
    }
    var m = get(MOCK_KEY);
    return (m && TIERS.indexOf(m) > -1) ? m : null;
  }

  function setTier(t) {
    if (t === current) return;
    current = t;
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](t); } catch (e) {}
    }
  }

  /* Which statuses count as paid.

     'canceled' and 'past_due' keep access while current_period_end is in the
     future: the customer paid for that period, and cutting them off the instant
     a card bounces is both hostile and the fastest way to lose someone who
     would have updated it.

     The grace is scoped to those two statuses by name. It used to apply to any
     row with a future current_period_end, and Stripe sets that field the moment
     a subscription is created, including one left 'incomplete' by a declined
     card or an abandoned 3DS challenge. So starting a checkout and never paying
     bought a full billing period. Anything not named here is not paid, which is
     also what makes a status we have never seen fail closed. */
  function tierFromRow(row) {
    if (!row) return 'free';
    if (row.status === 'active' || row.status === 'trialing') return 'paid';
    if (row.status === 'past_due' || row.status === 'canceled') {
      var end = row.current_period_end ? Date.parse(row.current_period_end) : null;
      if (end !== null && !isNaN(end) && end > Date.now()) return 'paid';
    }
    return 'free';
  }

  /* Ask the server. Resolves { tier, periodEnd }, or null meaning "could not
     tell", which is NOT the same as free, and callers must not treat it as
     such. Deliberately writes nothing: the cache write has to happen behind the
     same generation check as the answer, or a slow verify for a signed-out
     account lands afterwards and re-creates the entitlement it just lost. */
  function verify(user) {
    if (!user) return Promise.resolve({ tier: 'anon', periodEnd: null });

    if (OOT.auth.mode === 'mock') {
      /* No project yet. A signed-in person is free, which is the true answer
         with no entitlements table. Still cached, so the grace window is
         exercised by the mock and the offline path is tested before Supabase
         exists rather than after. */
      return Promise.resolve({ tier: 'free', periodEnd: null });
    }

    if (w.navigator && w.navigator.onLine === false) return Promise.resolve(null);

    /* A request behind a captive portal never settles, and inflight would pin
       the gate forever. Lose the race and the cache answers instead. */
    var timeout = new Promise(function (res) { w.setTimeout(function () { res(null); }, 10000); });

    var query = OOT.auth._client()
      .then(function (c) {
        return c.from('entitlements')
          .select('plan,status,current_period_end')
          .eq('user_id', user.id)
          .maybeSingle();
      })
      .then(function (r) {
        if (r && r.error) throw r.error;
        var row = r && r.data;
        return { tier: tierFromRow(row), periodEnd: (row && row.current_period_end) || null };
      })
      .catch(function () { return null; });   /* offline, or RLS refused */

    return Promise.race([query, timeout]);
  }

  /* The synchronous answer: cache if it is still inside the grace window and
     belongs to this user, otherwise the safe floor. */
  function fromCacheFor(user) {
    if (!user) return 'anon';
    var c = readCache();
    if (!c || c.userId !== user.id) return 'free';
    if (Date.now() > c.expiresAt) return 'free';   /* grace lapsed */
    return c.tier;
  }

  /* The founder's signed-in identity holds the whole subscription, in every
     mode. The email in config is public knowledge; the INBOX is the
     credential, exactly as it is for every other account: the magic link must
     be completed as this address. In mock mode (no Supabase keys) any device
     can type the address into the mock sign-in and read as the founder; that
     is the mock's nature, not a fence, and only the oot-mock-tier override
     above is scoped to localhost. Client-side, like the rest of the gate, and
     accepted for the same reason the soft paywall is. */
  function isFounder(user) {
    var f = OOT.config && OOT.config.founder;
    return !!(f && user && user.email &&
              String(user.email).toLowerCase() === String(f).toLowerCase());
  }

  function resolve(user) {
    /* THE FREE EDITION: while OOT.config.free is true, everyone, signed in
       or not, is 'paid'. Every lock boundary passes, the paywall can never
       open, and the machinery below stays intact for the day the flag flips
       back. This line outranks everything, including the anon check. */
    if (OOT.config && OOT.config.free) { setTier('paid'); return Promise.resolve('paid'); }

    /* Signed out is checked BEFORE the override. A visitor with a leftover
       oot-mock-tier used to read as 'paid' with no account at all, which made
       isSignedIn() disagree with OOT.auth.user and would have handed Phase 3's
       paywall a contradiction. */
    if (!user) { setTier('anon'); return Promise.resolve('anon'); }

    /* Outranks the server, the cache and the mock override: the entitlement
       IS the identity here, and the sign-in already proved it. Recomputed on
       every load from the persisted session, so it works offline with no
       grace window to lapse. */
    if (isFounder(user)) { setTier('paid'); return Promise.resolve('paid'); }

    var mock = mockTier();
    if (mock) { setTier(mock); return Promise.resolve(mock); }

    setTier(fromCacheFor(user));

    if (inflight) return inflight;
    var mine = gen;
    inflight = verify(user).then(function (r) {
      if (mine !== gen) return current;      /* superseded; drop this answer */
      inflight = null;
      /* null means we could not reach the server. Keep whatever the cache said
         rather than demoting someone who has simply gone offline. */
      if (r !== null) {
        writeCache(user.id, r.tier, r.periodEnd);
        setTier(r.tier);
      }
      return current;
    });
    return inflight;
  }

  /* ------------------------------------------------------- the paywall --- */

  /* Per-wing boundary predicates, registered by oot-locks.js. */
  var boundaries = {};

  var host = null;
  var lastFocus = null;
  var onCloseCb = null;

  /* Computed NOW, while the script is still evaluating. document.currentScript
     is null inside any later call, so working this out inside showPaywall meant
     the plan links always fell back to '/': correct only because this site
     happens to sit at the origin root, and silently wrong the day it does not. */
  var SITE_ROOT = (function () {
    var s = document.currentScript;
    if (s && s.src) return s.src.replace(/shared\/oot-gate\.js(\?.*)?$/, '');
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) {
      if (all[i].src && /oot-gate\.js/.test(all[i].src)) {
        return all[i].src.replace(/shared\/oot-gate\.js(\?.*)?$/, '');
      }
    }
    return '/';
  })();

  function money(n) {
    return (n % 1 === 0) ? String(n) : n.toFixed(2);
  }

  var PAYWALL_CSS =
    ':host{all:initial}' +
    '.back{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;' +
      'justify-content:center;padding:20px;background:rgba(8,7,6,.78);' +
      '-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);' +
      'font:400 16px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;' +
      'color:#f0eae0;overflow-y:auto}' +
    '.panel{background:#12100e;border:1px solid rgba(198,166,100,.4);border-radius:4px;' +
      'max-width:440px;width:100%;padding:28px 26px;box-shadow:0 20px 60px rgba(0,0,0,.6);' +
      'margin:auto;text-align:center}' +
    '.what{font-family:Georgia,serif;font-size:1.35rem;line-height:1.25;margin:0 0 .5em;color:#f0eae0}' +
    '.detail{margin:0 0 1.4em;font-size:.94rem;color:rgba(240,234,224,.68)}' +
    '.bundle{border-top:1px solid rgba(198,166,100,.18);border-bottom:1px solid rgba(198,166,100,.18);' +
      'padding:1.1em 0;margin:0 0 1.4em;text-align:left}' +
    '.bundle h3{margin:0 0 .7em;font:600 .64rem/1 ui-sans-serif,system-ui,sans-serif;' +
      'letter-spacing:.16em;text-transform:uppercase;color:#c6a664;text-align:center}' +
    '.bundle ul{margin:0;padding:0;list-style:none;display:grid;gap:.42em}' +
    '.bundle li{font-size:.86rem;color:rgba(240,234,224,.82);padding-left:1.1em;position:relative}' +
    '.bundle li::before{content:"";position:absolute;left:0;top:.62em;width:5px;height:5px;' +
      'border-radius:50%;background:#c6a664}' +
    /* One price means one card: a single column at every width. */
    '.plans{display:grid;gap:9px;grid-template-columns:1fr}' +
    '.plan{display:block;width:100%;border-radius:2px;padding:13px 10px;cursor:pointer;' +
      'font:600 .78rem/1.25 ui-sans-serif,system-ui,sans-serif;letter-spacing:.08em;' +
      'text-transform:uppercase;text-decoration:none;text-align:center;min-height:52px;' +
      'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}' +
    '.plan b{font-size:1rem;letter-spacing:.02em}' +
    '.go{background:#c6a664;color:#191512;border:1px solid #c6a664}' +
    '.go:hover{background:#e0c48b;border-color:#e0c48b}' +
    '.free{margin:1.3em 0 0;font-size:.8rem}' +
    '.free button{background:none;border:none;padding:8px;cursor:pointer;font:inherit;' +
      'color:rgba(240,234,224,.62);text-decoration:underline;text-underline-offset:3px}' +
    '.free button:hover{color:#f0eae0}' +
    '*:focus-visible{outline:2px solid #e0c48b;outline-offset:2px}' +
    '@media(prefers-reduced-motion:no-preference){.panel{animation:rise .18s ease-out}' +
      '@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}}';

  function closePaywall() {
    if (!host) return false;
    host.remove();
    host = null;
    document.removeEventListener('keydown', onKeydown, true);
    if (lastFocus && document.contains(lastFocus)) {
      try { lastFocus.focus(); } catch (e) {}
    }
    lastFocus = null;
    var cb = onCloseCb; onCloseCb = null;
    if (cb) { try { cb(); } catch (e) {} }
    return true;
  }

  function onKeydown(e) {
    if (!host) return;
    if (e.key === 'Escape') { e.preventDefault(); closePaywall(); return; }
    if (e.key !== 'Tab') return;
    /* Keep Tab inside the panel. Without this, focus walks off into the locked
       page behind the overlay, which is both confusing and a way to operate
       content the overlay is supposed to be covering. */
    var f = host.shadowRoot.querySelectorAll('a[href],button');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    var active = host.shadowRoot.activeElement;
    if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  }

  function showPaywall(opts) {
    if (host) return true;                 /* already up; do not stack */
    if (!document.body) return false;

    var C = (OOT.config || {});
    var P = C.price || {};
    var root = SITE_ROOT;
    /* The hub's money section is id="free" in the free edition and id="pricing"
       when there is something to buy (restored from commit 163b7551 on flip
       day). Point at whichever the flag says exists; checkPricingAnchor()
       below says so in the console if the flip forgot the section. */
    var anchor = C.free ? '#free' : '#pricing';

    lastFocus = document.activeElement;
    onCloseCb = typeof opts.onClose === 'function' ? opts.onClose : null;

    host = document.createElement('div');
    host.id = 'oot-paywall-host';
    host.setAttribute('style', 'all:initial;position:fixed !important;inset:0 !important;z-index:2147483000 !important');

    var wings = (C.wings || []).map(function (w) {
      return '<li>' + esc(w.name) + ' · ' + esc(w.paid || w.free || '') + '</li>';
    }).join('');

    var sr = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    sr.innerHTML =
      '<style>' + PAYWALL_CSS + '</style>' +
      '<div class="back" role="dialog" aria-modal="true" aria-labelledby="oot-pw-t">' +
        '<div class="panel">' +
          '<h2 class="what" id="oot-pw-t">' + esc(opts.what || 'This is part of the subscription') + '</h2>' +
          '<p class="detail">' + esc(opts.detail || '') + '</p>' +
          /* The bundle is the pitch: someone hitting a wall in one wing should
             see that the price covers four more. */
          '<div class="bundle"><h3>One subscription, five wings</h3><ul>' + wings + '</ul></div>' +
          '<div class="plans">' +
            '<a class="plan go" href="' + root + anchor + '"><span>Your venue</span><b>$' + money(P.monthly || 49.99) + '/month</b></a>' +
          '</div>' +
          '<p class="free"><button type="button" id="oot-pw-x">Keep exploring what is free</button></p>' +
        '</div>' +
      '</div>';

    document.body.appendChild(host);

    var closeBtn = sr.getElementById ? sr.getElementById('oot-pw-x') : sr.querySelector('#oot-pw-x');
    if (closeBtn) closeBtn.addEventListener('click', closePaywall);
    /* Clicking the backdrop backs out too. A paywall you cannot dismiss is the
       hostile kind the brief rules out. */
    var back = sr.querySelector('.back');
    if (back) back.addEventListener('click', function (e) { if (e.target === back) closePaywall(); });
    document.addEventListener('keydown', onKeydown, true);
    if (closeBtn) closeBtn.focus();
    return true;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* A tier change while the overlay is up means the answer changed underneath
     it. Buying access should clear it without a reload. */
  listeners.push(function (t) { if (t === 'paid') closePaywall(); });

  /* The paywall's button sends a visitor to root + '#pricing' once the free
     flag is off. Only the hub can check that the section exists, and this file
     runs there too, so the check runs on the hub and nowhere else: a warning in
     a wing's console about the hub's markup would be noise nobody reads. */
  function checkPricingAnchor() {
    try {
      if (!OOT.config || OOT.config.free) return;
      var here = w.location.origin + w.location.pathname;
      if (here !== SITE_ROOT && here !== SITE_ROOT + 'index.html') return;
      if (!document.getElementById('pricing') && w.console && w.console.warn) {
        w.console.warn('Outside Of Time: OOT.config.free is false but the hub has no #pricing ' +
                       'section, so every paywall button lands on a page with nothing to buy. ' +
                       'Restore the pricing section (see HANDOFF.md).');
      }
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', checkPricingAnchor);
  else checkPricingAnchor();

  OOT.gate = {
    /* Synchronous. Safe to call during a wing's first render. */
    tier: function () { return current; },

    isPaid: function () { return current === 'paid'; },
    isSignedIn: function () { return current !== 'anon'; },

    /* Resolves once the first server answer (or its absence) has been folded in. */
    ready: new Promise(function (res) { readyResolve = res; }),

    /* Force a re-check. Phase 4 calls this after a successful checkout. */
    refresh: function () {
      gen++;
      inflight = null;
      return resolve(OOT.auth.user);
    },

    onChange: function (fn) {
      if (typeof fn !== 'function') return function () {};
      listeners.push(fn);
      try { fn(current); } catch (e) {}
      return function off() {
        var i = listeners.indexOf(fn);
        if (i > -1) listeners.splice(i, 1);
      };
    },

    /* The single question every lock asks. wingId is 'codex' | 'ledger' |
       'table' | 'light' | 'almanac'; key identifies the thing being reached,
       and its meaning is per-wing (a rank, a cocktail tier, a route, a view).
       oot-locks.js owns the boundaries and registers them here, so this file
       never needs to know what a "rank" is.

       Fails OPEN. An unregistered wing, an unknown key, or a boundary file that
       failed to load all mean "not gated": a paywall that appears by accident
       over free content is worse for this product than a leak, and the brief
       already accepts that the client-side gate is soft. */
    allow: function (wingId, key) {
      if (current === 'paid') return true;
      var rule = boundaries[wingId];
      if (typeof rule !== 'function') return true;
      try { return rule(key, current) !== false; }
      catch (e) { return true; }
    },

    /* oot-locks.js calls this once per wing at load. */
    registerBoundary: function (wingId, fn) {
      if (typeof fn === 'function') boundaries[wingId] = fn;
    },

    /* Show the paywall. Idempotent: asking twice does not stack overlays, and
       asking as a paid user does nothing at all.

       opts.what   short noun phrase for the locked thing, e.g. 'The Certified rank'
       opts.detail one sentence on what opening it gives you
       opts.onClose optional; called when the visitor backs out */
    paywall: function (opts) {
      if (current === 'paid') return false;
      return showPaywall(opts || {});
    },

    closePaywall: closePaywall,
    paywallOpen: function () { return !!host; },

    /* Dev override. In the console:  OOT.gate.setMockTier('paid')
       Explicit rather than automatic, and it wins over the server, so it is the
       one thing to clear before trusting a test. */
    setMockTier: function (t) {
      if (TIERS.indexOf(t) === -1) throw new Error('tier must be one of ' + TIERS.join(', '));
      put(MOCK_KEY, t);
      /* Bump the generation: without it, a verify already in flight lands a
         moment later and silently undoes the override you just set. */
      gen++;
      inflight = null;
      setTier(t);
      return t;
    },
    clearMockTier: function () {
      drop(MOCK_KEY);
      return OOT.gate.refresh();
    },

    /* Called by oot-auth when the signed-in identity changes. A cache keyed to
       the previous user must never answer for the next one. */
    _onIdentityChange: function (user) {
      var c = readCache();
      if (c && (!user || c.userId !== user.id)) drop(CACHE_KEY);
      gen++;
      inflight = null;
      resolve(user);
    },

    /* For diagnostics: when the current answer stops being trusted. */
    _cache: readCache
  };

  OOT.auth.ready.then(function (user) {
    resolve(user).then(function (t) { readyResolve(t); });
  });

  /* Coming back online is the moment a stale cache can be corrected for free. */
  w.addEventListener('online', function () {
    if (OOT.auth.user) OOT.gate.refresh();
  });
})(window);
