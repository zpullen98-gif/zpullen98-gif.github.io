/* Outside Of Time: one device preference for day and night service, shared by all five rooms.
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
  var listeners = [], host, root, saveFailed = false, subscribeLabel = null;
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
    if (subscribeLabel) subscribeLabel();
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
    var status = root && root.querySelector && root.querySelector('[role="status"]');
    if (status) status.textContent = saveFailed
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
  /* The control: one small round button in the top corner, over the masthead
     art and opposite the OOT badge. It is absolutely placed at the top of the
     page, so it takes no room in the layout, scrolls away with the masthead and
     never sits over a sticky bar. A crescent moon shows in night service, a sun
     in day service; a tap switches to the other. */
  var MOON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a.6.6 0 0 0-.8-.7A9.6 9.6 0 1 0 21.1 15.4a.6.6 0 0 0-.7-.8z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4.6" fill="currentColor"/><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.8 4.8l1.8 1.8M17.4 17.4l1.8 1.8M4.8 19.2l1.8-1.8M17.4 6.6l1.8-1.8"/></g></svg>';
  var CSS = ':host{all:initial;position:absolute!important;top:10px!important;right:10px!important;left:auto!important;z-index:45!important;display:block!important;width:44px!important;height:44px!important;margin:0!important;padding:0!important}' +
    'button{box-sizing:border-box;width:44px;height:44px;border-radius:50%;padding:0;display:flex;align-items:center;justify-content:center;cursor:pointer;' +
    'background:rgba(8,21,16,.72);color:#e1c184;border:1px solid rgba(225,193,132,.55);box-shadow:0 1px 4px rgba(0,0,0,.35);-webkit-tap-highlight-color:transparent}' +
    ':host([data-service="day"]) button{background:rgba(255,248,233,.86);color:#725315;border-color:rgba(114,83,21,.5)}' +
    'button:hover{border-color:currentColor}button:focus-visible{outline:3px solid #e1c184;outline-offset:3px}' +
    '.sr{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}@media print{:host{display:none!important}}';
  function label() {
    var b = root && root.querySelector && root.querySelector('button');
    if (!b) return;
    var next = service === 'day' ? 'night' : 'day';
    b.innerHTML = service === 'day' ? SUN : MOON;
    b.setAttribute('aria-label', (service === 'day' ? 'Day service on. ' : 'Night service on. ') + 'Switch to ' + next + ' service');
    b.setAttribute('title', 'Switch to ' + next + ' service');
    b.setAttribute('data-set-service', next);
  }
  subscribeLabel = label;
  function mount() {
    if (!d.body || (host && host.isConnected)) return;
    if (wing === 'table' && d.documentElement.dataset.hydrated !== 'true') return;
    host = d.createElement('div'); host.id = 'oot-service-toolbar';
    root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    root.innerHTML = '<style>' + CSS + '</style><button type="button"></button><span class="sr" role="status" aria-live="polite"></span>';
    var button = root.querySelector && root.querySelector('button');
    if (!button) { host = null; root = null; return; }
    button.addEventListener('click', function () {
      apply(service === 'day' ? 'night' : 'day', true);
    });
    d.body.appendChild(host);
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
