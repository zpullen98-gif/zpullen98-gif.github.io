/* ============ The plate: the artwork, made clickable ============
   Builds the poster and its five hotspots from OOT.config.wings, so a wing that
   is renamed or repathed keeps working without this file being edited.

   Everything here is additive. If it never runs, the hub is the working list of
   doors it has always been; that list is still in the DOM underneath, kept for
   screen readers and used as the visible fallback if the artwork fails to load.
   ============ */

(function () {
  'use strict';

  /* Measured off the 1024x1536 artwork. Keyed by wing id, so the order of the
     config cannot put a hotspot over the wrong card. */
  var SPOTS = {
    table:   'spot-table',
    ledger:  'spot-ledger',
    codex:   'spot-codex',
    light:   'spot-light',
    almanac: 'spot-almanac'
  };

  function build() {
    if (document.querySelector('.plate')) return;
    var main = document.querySelector('main');
    var pillars = document.getElementById('pillars');
    if (!main || !pillars) return;

    var C = (window.OOT && OOT.config) || {};
    var wings = C.wings || [];
    if (!wings.length) return;

    /* Venue Mode narrows the hub to The Craft. The artwork paints all five, so
       rather than lie about it the plate stays whole and the text index below
       narrows, which is the honest version of the same idea. */
    var VENUE = false;
    try { VENUE = localStorage.getItem('oot-venue') === '1'; } catch (e) {}

    var plate = document.createElement('div');
    plate.className = 'plate';

    var pic = document.createElement('picture');
    var src = document.createElement('source');
    src.srcset = 'assets/hub-plate.webp';
    src.type = 'image/webp';
    var img = document.createElement('img');
    img.src = 'assets/hub-plate.jpg';
    img.width = 1024;
    img.height = 1536;
    img.decoding = 'async';
    /* The masthead's words are painted into this image, so they are described
       here for anyone who cannot see it. The five wings are named by the
       hotspots themselves and by the index below. */
    img.alt = 'Outside Of Time Hospitality. Master the timeless art of hospitality. ' +
      'Five wings, shown as illuminated cards on a set table at dusk.';
    /* If the artwork cannot load, fall back to the real list of doors rather
       than to a page of invisible links over nothing. */
    img.addEventListener('error', function () {
      document.documentElement.classList.add('plate-failed');
      document.documentElement.classList.remove('plate-live');
      pillars.removeAttribute('inert');
    });
    pic.appendChild(src);
    pic.appendChild(img);
    plate.appendChild(pic);

    wings.forEach(function (w) {
      var cls = SPOTS[w.id];
      if (!cls) return;
      var a = document.createElement('a');
      a.className = 'spot ' + cls;
      a.href = w.path;
      /* The card's lettering is pixels, so the link carries the name itself. */
      a.setAttribute('aria-label', w.name + (w.motto ? '. ' + w.motto : ''));
      a.title = w.name;
      plate.appendChild(a);
    });

    main.insertBefore(plate, main.firstChild);

    /* Only now may the poster CSS hide the DOM masthead and the door list:
       the artwork it replaces them with is on the page. The list goes inert
       as well as clipped: clipping alone left its five links in the tab order
       and read every wing a third time to a screen reader, after the hotspot
       and the index row. */
    document.documentElement.classList.add('plate-live');
    pillars.setAttribute('inert', '');

    /* Real text under the artwork: selectable, searchable, and what a keyboard
       user tabs through instead of hunting an invisible rectangle. */
    var index = document.createElement('ul');
    index.className = 'plate-index';
    wings.forEach(function (w) {
      if (VENUE && w.pillar !== 'craft') return;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = w.path;
      a.textContent = w.short || w.name;
      li.appendChild(a);
      index.appendChild(li);
    });
    plate.parentNode.insertBefore(index, plate.nextSibling);
  }

  /* The hub builds its doors from an end-of-body script; wait for that rather
     than racing it. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(build, 0); });
  } else {
    setTimeout(build, 0);
  }
})();
