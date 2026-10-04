/* Outside Of Time: one device preference and a quiet way between all five rooms.
 * Canonical copy: WorldTable/static/service/oot-service.js.
 * Plain wings carry this exact file as js/oot-service.js; the hub uses service/.
 * Load in the head with data-wing, before any wing reads its own preferences.
 * User records, routes and study progress are never read or written here. */
(function (w, d) {
  'use strict';
  var OOT = w.OOT = w.OOT || {};
  if (OOT.service) return;
  var KEY = 'oot.service.v1';
  var script = d.currentScript;
  var wing = script && script.getAttribute('data-wing') || 'hub';
  var valid = function (v) { return v === 'day' || v === 'night'; };
  var listeners = [], host, root, saveFailed = false;
  var media = w.matchMedia ? w.matchMedia('(prefers-color-scheme: light)') : { matches: false };
  function read(key) { try { return w.localStorage.getItem(key); } catch (_) { return null; } }
  var chosen = read(KEY);
  if (!valid(chosen)) {
    try { chosen = JSON.parse(read('wt.prefs.v1') || '{}').service; } catch (_) { chosen = null; }
  }
  if (!valid(chosen)) chosen = null;
  var service = chosen || (media.matches ? 'day' : 'night');
  function paint() {
    d.documentElement.setAttribute('data-service', service);
    d.documentElement.style.colorScheme = service === 'day' ? 'light' : 'dark';
    Array.prototype.forEach.call(d.querySelectorAll('meta[name="theme-color"]'), function (m) {
      m.content = service === 'day' ? '#f3ead8' : '#081510';
    });
    if (host) host.setAttribute('data-service', service);
    if (root) Array.prototype.forEach.call(root.querySelectorAll('[data-set-service]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-service') === service));
    });
  }
  function apply(next, persist) {
    if (!valid(next)) return false;
    chosen = next;
    service = next;
    if (persist) {
      saveFailed = false;
      try { w.localStorage.setItem(KEY, next); } catch (_) { saveFailed = true; }
    }
    paint();
    listeners.slice().forEach(function (fn) { fn(service); });
    w.dispatchEvent(new CustomEvent('oot:servicechange', { detail: { service: service } }));
    if (root) root.querySelector('[role="status"]').textContent = saveFailed
      ? 'Appearance changed for this visit. This browser could not save the preference.'
      : (service === 'day' ? 'Day service' : 'Night service') + '. Your choice follows you through the collection on this browser.';
    return true;
  }
  paint();
  w.addEventListener('storage', function (e) {
    if (e.key !== KEY && e.key !== null) return;
    var next = read(KEY);
    if (valid(next)) apply(next, false);
    else { apply(media.matches ? 'day' : 'night', false); chosen = null; }
  });
  if (media.addEventListener) media.addEventListener('change', function () {
    if (!chosen) { apply(media.matches ? 'day' : 'night', false); chosen = null; }
  });
  var rooms = [
    ['table', 'The World Table', 'Food, recipes and the art of service'],
    ['ledger', "The Bartender's Ledger", 'Cocktails, ingredients and bar craft'],
    ['codex', "The Sommelier's Codex", 'Wine, regions and the art of tasting'],
    ['light', 'First Light', 'Movement, reflection and a daily reset'],
    ['almanac', 'Calendar For Life', 'Festivals, traditions and places to discover']
  ];
  var guides = {
    table: ['Choose a level on Home and begin Today\'s study.', 'Use Flashcards to remember, Quizzes to practise, and Library to look something up.', 'More holds your tools and progress. Back returns to the screen you came from.'],
    ledger: ['Choose a level on Home and begin Today\'s study.', 'Use Flashcards to remember, Quizzes to practise, and Library to explore cocktails and ingredients.', 'More holds your tools and progress. Back returns to the screen you came from.'],
    codex: ['Choose a level on Home and begin Today\'s study.', 'Use Flashcards to remember, Quizzes to practise, and Library for wine, maps and reading.', 'More holds your tools and progress. Back returns to the screen you came from.'],
    light: ['Begin on Today with movement, a reading or a moment of reflection.', 'Count completed workout sets beneath the videos; Undo corrects a tap.', 'Use the main tabs to explore your practice and return to Today whenever you need a starting point.'],
    almanac: ['Start with Today, explore a month, or search for a place or tradition.', 'Save celebrations you want to return to in Saved voyages.', 'Trails connects related celebrations into a journey. Back returns to your previous view.'],
    hub: ['Choose a room below for food, cocktails, wine, daily practice or exploration.', 'Each room keeps its own place and progress on this browser.', 'Day service and Night service change the whole collection. Explore opens these doors from every room.']
  };
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  var CSS = ':host{display:block!important;box-sizing:border-box!important;width:100%!important;max-width:1200px!important;min-width:0!important;margin:0 auto!important;padding:10px 16px 10px 60px!important;color:#f3e9d5;font:15px/1.5 Georgia,serif;--bg:#102119;--text:#f3e9d5;--dim:#c5c4ae;--line:#829073;--accent:#e1c184;--active:#e1c184;--on:#102119}' +
    ':host([data-service="day"]){color:#21382a;--bg:#fff8e9;--text:#21382a;--dim:#5c5948;--line:#88795d;--accent:#725315;--active:#35563d;--on:#fff8e9}' +
    '*{box-sizing:border-box}.rail{display:flex;align-items:center;justify-content:space-between;gap:8px 16px;flex-wrap:wrap}button,summary,a{font:inherit;color:var(--text)}button,summary{min-height:44px;border:1px solid var(--line);border-radius:3px;background:var(--bg);padding:8px 12px;cursor:pointer}summary{display:list-item;list-style-position:inside}summary::marker{color:var(--accent)}.switch{display:flex;gap:4px;margin-left:auto}button[aria-pressed="true"]{background:var(--active);color:var(--on);border-color:var(--active);font-weight:bold}button:focus-visible,summary:focus-visible,a:focus-visible{outline:3px solid var(--accent);outline-offset:3px}.explore{min-width:0}.panel{background:var(--bg);color:var(--text);border:1px solid var(--line);border-radius:3px;margin-top:10px;padding:18px}.panel[hidden]{display:none}.links{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;list-style:none;padding:0;margin:12px 0}.links a{display:block;border:1px solid var(--line);padding:12px;text-decoration:none;min-height:44px}.links a[aria-current]{border:2px solid var(--accent)}.links strong{display:block;color:var(--accent);font-weight:normal}.links small{display:block;font-size:14px;color:var(--dim)}h2{font:normal 20px/1.3 Georgia,serif;color:var(--accent);margin:0 0 12px}p{margin:0 0 12px}.help{padding-left:22px;margin:0}.help li{margin-bottom:8px}.home{display:inline-block;min-height:44px;padding:10px 0;color:var(--accent)}.sr{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap} @media(max-width:500px){:host{padding-left:60px;padding-right:10px}.rail{gap:6px}.switch{margin-left:0;width:100%}.switch button{flex:1;padding:8px;font-size:14px}.links{grid-template-columns:1fr}.panel{margin-left:-44px}} @media print{:host{display:none!important}}';
  function mount() {
    if (!d.body || (host && host.isConnected)) return;
    if (wing === 'table' && d.documentElement.dataset.hydrated !== 'true') return;
    var slot = d.getElementById('oot-service-slot');
    var selectors = { table: '.house-masthead', ledger: '.wrap', codex: '#app', light: '.col', almanac: '.house-masthead', hub: 'header.top' };
    var anchor = d.querySelector(selectors[wing] || 'main');
    if (!slot && !anchor) return;
    host = d.createElement('div'); host.id = 'oot-service-toolbar';
    root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    var ownRoom = script && script.src ? new URL('../', script.src).href : location.href;
    var hub = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
      ? new URL('/', location.href).href : 'https://zpullen98-gif.github.io/';
    root.innerHTML = '<style>' + CSS + '</style><div class="rail"><details class="explore"><summary>Explore &amp; guide</summary></details>' +
      '<div class="switch" role="group" aria-label="Service colour scheme"><button type="button" data-set-service="day">Day service</button><button type="button" data-set-service="night">Night service</button></div></div>' +
      '<section class="panel" hidden aria-label="Explore Outside Of Time"><h2>Five rooms. One collection.</h2><nav aria-label="Outside Of Time apps"><ul class="links">' + rooms.map(function (r) {
        return '<li><a href="' + (r[0] === wing ? ownRoom : hub + r[0] + '/') + '"' + (r[0] === wing ? ' aria-current="page"' : '') + '><strong>' + esc(r[1]) + '</strong><small>' + r[2] + (r[0] === wing ? ' · You are here' : '') + '</small></a></li>';
      }).join('') + '</ul><a class="home" href="' + hub + '">Return to Outside Of Time</a></nav><h2>A place to begin</h2><ol class="help">' + (guides[wing] || guides.hub).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol><p>Appearance is shared on this browser. Progress stays with the app and profile you use.</p></section><span class="sr" role="status" aria-live="polite"></span>';
    var details = root.querySelector('details'), panel = root.querySelector('.panel');
    details.addEventListener('toggle', function () { panel.hidden = !details.open; });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-set-service]');
      if (b) apply(b.getAttribute('data-set-service'), true);
    });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && details.open) { details.open = false; panel.hidden = true; details.querySelector('summary').focus(); e.preventDefault(); }
    });
    if (slot) slot.appendChild(host); else anchor.parentNode.insertBefore(host, anchor);
    paint();
  }
  OOT.service = {
    get: function () { return service; },
    set: function (mode) { return apply(mode, true); },
    subscribe: function (fn) { listeners.push(fn); fn(service); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; },
    mount: mount
  };
  function ready() {
    mount();
    if (w.MutationObserver) new MutationObserver(function () { if (!host || !host.isConnected) mount(); }).observe(d.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-hydrated'] });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', ready); else ready();
})(window, document);
