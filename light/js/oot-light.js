/* ============ First Light's half of the shared layer ============
   Three small jobs, kept out of the wing's own files so the wing stays a copy
   of its own repo plus this one file, and so this can be deleted in one piece
   if the shared layer ever goes away.

   1. The profile row (Add your name) and, on a manager's device, The Pass
      strip sit at the top of Today. #view is replaced wholesale on every
      render(), so the click handlers go on .col, which survives, and the
      shared bindWho reloads the page on a switch.

   2. The shared streak. Across the product a person has studied today when
      they completed a round, cooked a dish, or kept a morning. Opening an
      app is not studying, so this file never marks the roster at load and
      never wraps flMarkDay, which the wing calls the moment Today opens. The
      one signal that counts is the wing's own fl:morning-kept event, sent
      once a day when the guided morning renders in its kept state.

   3. The product's frame: the document title ends with the product name,
      and the footer carries the Privacy and Terms pair that every wing and
      The Pass share. Both are added here so index.html and app.js stay
      copies of the source.

   There is no first-path handler here: First Light has no FIRST_PATH, its
   onboarding is its own. Loaded after js/app.js and before the shared
   post-block, so every global it wraps exists and boot() has already painted.
   ============ */

(function () {
  'use strict';

  if (!window.OOT || !OOT.profiles) return;

  var SUFFIX = ' · Outside Of Time';

  /* ---- 1. the row at the top of Today ---------------------------------
     Today only, and on the onboarding door as much as on the day itself: a
     second person who tapped Add your name lands on that door with an empty
     record, and the chips are their way back if they tapped by mistake. */
  function topRow() {
    var html = '';
    try { if (OOT.pass && OOT.pass.strip) html += OOT.pass.strip(); } catch (e) {}
    try { if (OOT.home && OOT.home.who) html += OOT.home.who(); } catch (e) {}
    return html;
  }

  /* ---- 3a. the title ----------------------------------------------------
     render() writes document.title fresh on every paint, so the suffix goes
     on after each one, and only when it is not already there. */
  function suffixTitle() {
    try {
      var t = document.title || '';
      if (t.slice(-SUFFIX.length) !== SUFFIX) document.title = t + SUFFIX;
    } catch (e) {}
  }

  if (typeof render === 'function') {
    var _render = render;
    render = function () {
      var out = _render.apply(this, arguments);
      try {
        if (flRoute.view === 'today') {
          var host = document.getElementById('view');
          var html = topRow();
          if (host && html) host.insertAdjacentHTML('afterbegin', html);
        }
      } catch (e) {}
      suffixTitle();
      return out;
    };
  }

  /* ---- 2. the shared streak --------------------------------------------
     One event, sent by the Today view the first time the kept state renders
     each day. The wing's own record and streak are untouched: flMarkDay goes
     on writing them the moment the app opens, as it always has. */
  function studied() {
    try { OOT.profiles.markStudied(); OOT.profiles.touch(); } catch (e) {}
  }
  window.addEventListener('fl:morning-kept', studied);

  /* ---- 3b. the footer ---------------------------------------------------
     The footer lives outside #view and survives every render, so the pair
     is added once, at bind, and guarded so a second bind cannot double it. */
  function footerLinks() {
    try {
      var foot = document.querySelector('footer');
      if (!foot || foot.querySelector('a[href="../privacy.html"]')) return;
      foot.insertAdjacentHTML('beforeend',
        ' · <a href="../privacy.html" style="color:inherit">Privacy</a>' +
        ' · <a href="../terms.html" style="color:inherit">Terms</a>');
    } catch (e) {}
  }

  function bind() {
    var host = document.querySelector('.col') || document.body;
    if (OOT.home && OOT.home.bindWho) OOT.home.bindWho(host, function () { render(); });
    if (OOT.pass && OOT.pass.bind) OOT.pass.bind(host, function () {});
    footerLinks();
    /* boot() painted before this file loaded. Paint Today once more so the
       row is on the first screen, not only after the first navigation. */
    try { if (typeof flRoute !== 'undefined' && flRoute.view === 'today') render(); } catch (e) {}
    suffixTitle();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
