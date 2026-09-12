/* First Light: router, render loop, and boot.

   Loads last. Every ui-*.js file has already registered itself into FL_VIEWS by the
   time this runs, so the nav builds itself from that registry rather than from a
   list kept in two places.

   The artifact toggled a .hide class on seven <section> elements. That works until
   you want a URL: there was no way to link to the Vault, no back button, and an
   installed home-screen icon could only ever land on Today. This is a hash router
   writing into one <main>, which is the house pattern and also just what a reader
   expects a page to do. */

/* FL_VIEWS and FL_ACTS are declared in registry.js, which loads before the views. */

/* --- escaping ---
   Every view builds HTML by string concatenation, so anything the reader typed -
   a journal entry, a city name, must pass through here. The artifact never
   interpolated user input, so it got away without one; this app has a journal. */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* --- announcements and toasts --- */
function announce(msg) {
  var el = document.getElementById('live');
  if (!el) return;
  /* Clearing first forces the change; setting the same text twice is otherwise
     silent in most screen readers. */
  el.textContent = '';
  setTimeout(function () { el.textContent = msg; }, 60);
}

var flToastTimer = null;
var flUpdateReady = false;   /* an accepted-not-yet-loaded update offer survives ordinary toasts */
function toast(msg, ms) {
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('on');
  if (flToastTimer) clearTimeout(flToastTimer);
  flToastTimer = setTimeout(function () {
    el.classList.remove('on');
    if (flUpdateReady) setTimeout(offerUpdate, 400);
  }, ms || 5200);
}

/* The one message the artifact could never send: your writing is not being saved. */
window.addEventListener('fl:storage', function (e) {
  if (e.detail && e.detail.state === 'fail') {
    toast('This device is refusing to save. Anything you write now will last only until you close the tab: try freeing space, or leaving private browsing.', 12000);
  }
});

/* --- routing ---
   "#/hall/bible" -> {view:'hall', arg:'bible'} */
function parseHash() {
  /* "#view" is the skip link's fragment, not a route. A hash with no slash
     leaves the page where it is; treating it as a route sent every keyboard
     reader from the Library back to Today. */
  if (location.hash && location.hash.charAt(1) !== '/') return flRoute;
  var h = (location.hash || '').replace(/^#\/?/, '');
  var parts = h.split('/').filter(Boolean);
  var view = parts[0] || 'today';
  if (!FL_VIEWS[view]) view = 'today';
  /* Everything after the view is the argument, slashes included. Taking only
     parts[1] silently truncated "#/library/read/tao" to "read", so every reader
     route fell back to the shelf. */
  var rest = parts.slice(1).map(decodeURIComponent).join('/');
  return { view: view, arg: rest || null };
}
function go(view, arg) {
  location.hash = '#/' + view + (arg ? '/' + encodeURIComponent(arg) : '');
}

var flRoute = { view: 'today', arg: null };
var flRendered = false;   // true once the first navigate() has painted a view

/* Five clusters, because eleven equal items is not a menu, it is a list, and
   on a 375px screen it wrapped to three ragged rows with the Vault orphaned on
   its own line. The clusters follow what a reader is actually doing:

     Today          the daily loop: one tap, no sub-row
     The Practice   the work: the body, the Vault's rehearsal room, the ladder
     The Book       the reading: the 366 and the sky
     Prayer         the scripture: seven traditions, the reading plans, the threads
     The Desk       the instruments: writing, finding, the record, the workings

   The top row names the five; a second row appears only when the active
   cluster holds more than one room. Each cluster remembers the room you were
   last in for the session, so 'The Book' goes back to the chapter you left.
   Hidden rooms light their home cluster for orientation, except Clear
   Mornings, which deliberately lights nothing: no trace is part of that
   room's contract.

   THE LIBRARY IS ITS OWN CLUSTER ON PURPOSE. It used to sit inside 'The Book'
   between the secular 366 and the sky, which made scripture look like one more
   chapter of the same book rather than a room the reader chooses to enter. It
   is now a door of its own, standing beside the others and entered only by
   someone who meant to. Nothing here is hidden and nothing is pushed: the
   religious material is one tap away for a reader who wants it and appears
   nowhere in the morning for a reader who does not. */
var NAV_CLUSTERS = [
  ['today',    'Today',        ['today']],
  ['practice', 'The Practice', ['body', 'vault', 'life']],
  ['book',     'The Book',     ['year', 'astro']],
  ['canon',    'Prayer',       ['library']],
  ['desk',     'The Desk',     ['journal', 'search', 'stats', 'settings']]
];
/* hidden views borrow a cluster so the reader stays oriented. The reading plans
   and the threads are religious rooms reached from the Library, so they light
   the Library rather than the Book they used to sit under. */
var NAV_HOMES = { hall: 'canon', threads: 'canon', chart: 'book', reset: 'practice', floor: 'practice' };
var flLastSub = {};   // cluster id -> last visited view, session-only

function navClusterOf(view) {
  for (var i = 0; i < NAV_CLUSTERS.length; i++) {
    if (NAV_CLUSTERS[i][2].indexOf(view) > -1) return NAV_CLUSTERS[i][0];
  }
  return NAV_HOMES[view] || null;
}

function navLink(k) {
  var v = FL_VIEWS[k];
  if (!v) return '';
  return '<a href="#/' + k + '"' + (k === flRoute.view ? ' aria-current="page"' : '') +
         '>' + esc(v.label) + '</a>';
}

function renderNav() {
  var nav = document.getElementById('nav');
  var active = navClusterOf(flRoute.view);
  if (NAV_CLUSTERS.some(function (c) { return c[2].indexOf(flRoute.view) > -1; })) {
    flLastSub[active] = flRoute.view;
  }

  var top = NAV_CLUSTERS.map(function (c) {
    var dest = flLastSub[c[0]] || c[2][0];
    return '<a href="#/' + dest + '"' + (active === c[0] ? ' aria-current="true" class="on"' : '') +
           '>' + esc(c[1]) + '</a>';
  }).join('');

  /* Anything registered but unlisted still appears, so adding a view can never
     make it silently unreachable. */
  var known = [];
  NAV_CLUSTERS.forEach(function (c) { known = known.concat(c[2]); });
  var stray = Object.keys(FL_VIEWS).filter(function (k) {
    return !FL_VIEWS[k].hidden && known.indexOf(k) === -1;
  });
  top += stray.map(navLink).join('');

  var cluster = null;
  for (var i = 0; i < NAV_CLUSTERS.length; i++) if (NAV_CLUSTERS[i][0] === active) cluster = NAV_CLUSTERS[i];
  var sub = (cluster && cluster[2].length > 1)
    ? '<div class="nav-tools">' + cluster[2].map(navLink).join('') + '</div>'
    : '';

  nav.innerHTML = '<div class="nav-places">' + top + '</div>' + sub;
}

/* Number keys walk the clusters; the slash opens search, never while typing. */
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  var t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
  if (e.key === '/') { location.hash = '#/search'; e.preventDefault(); return; }
  if (/^[1-5]$/.test(e.key)) {
    var c = NAV_CLUSTERS[Number(e.key) - 1];
    location.hash = '#/' + (flLastSub[c[0]] || c[2][0]);
    e.preventDefault();
  }
});

/* First run: three honest answers and one choice, before anything else.
   Shown once, to a record with at most the boot-marked day in it: an
   imported year of mornings never sees this screen. */
function flOnboardHTML() {
  return '<div class="kick">First Light</div>' +
    '<h1>Two minutes, most mornings</h1>' +
    '<p class="note">Your words never leave this device. The count of mornings and your streak are kept here too. ' +
    'No manager, no feed: what you write stays in this browser, and exports to a file you own.</p>' +
    '<div class="pacer-disc" id="pacer-disc" aria-hidden="true"></div>' +
    '<div class="pacer-label" id="pacer-label">Ready</div>' +
    '<div class="ds" id="pacer-count"></div>' +
    '<div style="text-align:center;margin-top:10px">' +
      '<button class="mchip' + ((typeof pacer !== 'undefined' && pacer.on) ? ' on' : '') + '" data-act="onboardBreath">' +
      ((typeof pacer !== 'undefined' && pacer.on) ? 'Let it fade' : 'Try ten slow breaths first') + '</button></div>' +
    '<div class="label" style="margin-top:26px">One choice before you begin</div>' +
    '<div class="card">' +
      '<p class="px" style="margin-bottom:12px">First Light includes a religious Library: scripture and ' +
      'reading plans across seven traditions. It has its own tab either way, so you can go in whenever you ' +
      'like and it will never come to you. Show today’s readings on your morning page?</p>' +
      '<div class="drawrow">' +
        '<button class="btn" data-act="onboardChoice" data-v="on">Show the readings</button>' +
        '<button class="keep" data-act="onboardChoice" data-v="off">Keep them in the Library</button>' +
      '</div>' +
      '<p class="vidnote" style="margin-top:10px">You can change this any time in Settings.</p>' +
    '</div>';
}

FL_ACTS.onboardBreath = function () {
  if (typeof pacer === 'undefined') return;
  if (pacer.on) pacerStop(); else pacerStart('box');
  render();
};

FL_ACTS.onboardChoice = function (el) {
  FL.prefs.canonLines = el.getAttribute('data-v') === 'on' ? 'on' : 'off';
  FL.prefs.onboarded = 1;
  flSave(true);
  if (typeof pacer !== 'undefined' && pacer.on) pacerStop();
  render();
  announce('Welcome. The morning is ready.');
};

function render() {
  /* capture-before-repaint, the suite's oldest rule: every jField rerenders
     from the store, so anything typed since the last debounce tick must reach
     the store before the DOM is replaced */
  if (typeof jFlush === 'function') { try { jFlush(); } catch (e) {} }
  var v = FL_VIEWS[flRoute.view];
  var host = document.getElementById('view');
  /* the venue screen, the mid-shift refuge, the floor book, and the private
     room answer their own doors; onboarding waits for a personal one */
  var noOnboard = { lineup: 1, reset: 1, clear: 1, floor: 1 };
  if (!FL.prefs.onboarded && FL.days.length <= 1 && !noOnboard[flRoute.view]) {
    host.innerHTML = flOnboardHTML();
    renderNav();
    document.title = 'First Light';
    return;
  }
  try {
    host.innerHTML = v.render(flRoute.arg) || '';
  } catch (err) {
    /* A view that throws must not take the whole app down: the reader should still
       be able to navigate away from the broken one. */
    console.error('First Light: the ' + flRoute.view + ' view failed to render.', err);
    host.innerHTML = '<div class="kick">Something went wrong</div>' +
      '<h1>This page did not open</h1>' +
      '<p class="note">The rest of the app still works. If this keeps happening, the console has the detail.</p>';
  }
  renderNav();
  document.title = (v.title ? v.title + ' · ' : '') + 'First Light';
  if (v.after) { try { v.after(flRoute.arg); } catch (e) { console.error(e); } }
}

function navigate() {
  var next = parseHash();
  /* the skip link: carry focus to the main column and change nothing else */
  if (next === flRoute && flRendered) { var col = document.getElementById('view'); if (col) col.focus(); return; }
  var viewChanged = next.view !== flRoute.view;
  flRoute = next;
  render();
  flRendered = true;
  if (viewChanged) {
    window.scrollTo(0, 0);
    /* Move focus to the new content. Without this a keyboard or screen-reader user
       stays parked in the nav and has to tab through it again on every move. */
    var host = document.getElementById('view');
    host.focus({ preventScroll: true });
    announce((FL_VIEWS[flRoute.view].title || flRoute.view) + ': loaded');
  }
}

window.addEventListener('hashchange', navigate);

/* --- one delegated handler ---
   Views emit data-act attributes rather than inline onclick, so the markup carries
   no executable strings and re-rendering never leaves a dangling listener. */
document.addEventListener('click', function (e) {
  var el = e.target.closest ? e.target.closest('[data-act]') : null;
  if (!el) return;
  var act = el.getAttribute('data-act');
  if (!FL_ACTS[act]) return;
  e.preventDefault();
  /* Focus signature: most acts re-render, which destroys the pressed button
     and drops a keyboard user to <body>, hundreds of Tab presses from where
     they were. Rebuild the signature after the act and put focus back; a
     control that vanished or disabled itself hands focus to the view. Acts
     that place focus themselves (todayStep) are untouched: we only act when
     focus actually fell to the body. */
  var sig = '[data-act="' + act.replace(/"/g, '') + '"]';
  for (var ai = 0; ai < el.attributes.length; ai++) {
    var at = el.attributes[ai];
    if (at.name.indexOf('data-') === 0 && at.name !== 'data-act') {
      sig += '[' + at.name + '="' + String(at.value).replace(/"/g, '\\"') + '"]';
    }
  }
  FL_ACTS[act](el, e);
  if (!document.activeElement || document.activeElement === document.body) {
    var back = null;
    try { back = document.querySelector(sig); } catch (err) {}
    if (back && back.focus && !back.disabled) back.focus({ preventScroll: true });
    else { var vw = document.getElementById('view'); if (vw) vw.focus({ preventScroll: true }); }
  }
});
/* Checkboxes and selects need change, not click. */
document.addEventListener('change', function (e) {
  var el = e.target.closest ? e.target.closest('[data-change]') : null;
  if (!el) return;
  var act = el.getAttribute('data-change');
  if (FL_ACTS[act]) FL_ACTS[act](el, e);
});

/* --- service worker ---
   ?nosw on the URL skips registration, which is how you debug a caching problem
   without fighting the cache to do it. */
var flReloading = false;

FL_ACTS.applyUpdate = function () {
  flUpdateReady = false;
  navigator.serviceWorker.getRegistration().then(function (reg) {
    if (reg && reg.waiting) reg.waiting.postMessage('SKIP_WAITING');
  });
};

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  if (location.search.indexOf('nosw') !== -1) return;

  /* A new worker takes control only after skipWaiting; when it does, reload once so
     the page is running the code that matches the cache it is now being served. The
     guard matters: without it two tabs can bounce each other in a reload loop. */
  /* clients.claim() fires controllerchange on the very FIRST install too:
     a page that started uncontrolled must not reload out from under a reader
     mid-onboarding; only a page that already had a controller is switching
     code and needs the refresh */
  var hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (!hadController) { hadController = true; return; }
    if (flReloading) return;
    flReloading = true;
    location.reload();
  });

  navigator.serviceWorker.register('./sw.js').then(function (reg) {
    /* A worker may already be waiting from a previous visit, in which case
       'updatefound' has long since fired and will not fire again. */
    if (reg.waiting && navigator.serviceWorker.controller) offerUpdate();
    reg.addEventListener('updatefound', function () {
      var sw = reg.installing;
      if (!sw) return;
      sw.addEventListener('statechange', function () {
        /* A controller means this is an update rather than the first install: only
           then is there anything for the reader to accept. */
        if (sw.state === 'installed' && navigator.serviceWorker.controller) offerUpdate();
      });
    });
  }).catch(function (e) {
    console.warn('First Light: service worker did not register.', e);
  });
}

function offerUpdate() {
  var el = document.getElementById('toast');
  if (!el) return;
  /* An update must never interrupt a morning. It waits behind a button, and the
     reader decides when. Saying "reload" and leaving it at that would be a lie: a
     plain reload does not activate a waiting worker. */
  flUpdateReady = true;
  el.innerHTML = 'A new version is ready. ' +
    '<button class="keep" style="margin:6px 0 0" data-act="applyUpdate">Load it now</button>';
  el.classList.add('on');
  if (flToastTimer) clearTimeout(flToastTimer);
}

/* --- boot --- */
(function boot() {
  flBoot();
  sunApply();
  /* a dedicated Line-Up screen (bar iPad) must accrue no personal record:
     stateless by construction, which is the whole point of that view */
  if (location.hash.indexOf('#/lineup') !== 0) flMarkDay();
  navigate();
  registerSW();

  /* A tab left open overnight should wake up on the right day. Without this the
     app still shows yesterday's voice at 9am because nothing told it to re-render. */
  var bootDay = flToday();
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible') return;
    sunApply();
    /* a hash-routed PWA performs no navigations, so the browser never
       re-fetches sw.js on its own; a bar tablet open all week would never
       see an update. Every wake becomes a check; offline it fails silently. */
    if ('serviceWorker' in navigator && location.search.indexOf('nosw') === -1) {
      navigator.serviceWorker.getRegistration().then(function (r) {
        if (r) return r.update();
      }).catch(function () {});
    }
    if (flToday() !== bootDay) {
      bootDay = flToday();
      if (flRoute.view !== 'lineup') flMarkDay();
      /* yesterday's session posture must not leak into the new morning:
         a tab that slept in the evening examen would otherwise wake there */
      todayForceMode = null;
      todayStep = 0;
      todaySort = null;
      todayReturnSeen = false;
      todayExamenKind = 'day';
      render();
    }
  });
})();
