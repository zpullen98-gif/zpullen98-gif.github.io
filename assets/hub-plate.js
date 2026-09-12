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

  /* The order the cards are PAINTED in, left to right and then down: the top
     row is table, ledger, codex and the bottom row is light, almanac. The
     doors used to be built by walking OOT.config.wings, which runs codex,
     ledger, table, so tabbing across the top row went right to left and a
     screen reader read the three cards backwards. Same content, two orders,
     which is exactly what WCAG 1.3.2 and 2.4.3 are about. The config still
     supplies every name, path and motto; it just no longer decides the
     reading order of a picture it cannot see. */
  var PAINTED = ['table', 'ledger', 'codex', 'light', 'almanac'];

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
       hotspots themselves. */
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

    PAINTED.forEach(function (id) {
      var cls = SPOTS[id];
      var w = null;
      for (var i = 0; i < wings.length; i++) { if (wings[i].id === id) { w = wings[i]; break; } }
      /* A wing the config does not carry is skipped, exactly as before. */
      if (!cls || !w) return;
      var a = document.createElement('a');
      a.className = 'spot ' + cls;
      a.href = w.path;
      /* The card's lettering is pixels, so the link carries the name itself. */
      a.setAttribute('aria-label', w.name + (w.motto ? '. ' + w.motto : ''));
      a.title = w.name;
      plate.appendChild(a);
    });

    main.insertBefore(plate, main.firstChild);

    /* ON THE PAGE IS NOT THE SAME AS ON THE SCREEN, and this is where the
       front door went black.

       plate-live hides the DOM masthead and the door list, because the artwork
       stands in for them. It used to be set right here, one line after the
       plate was inserted, and at that moment the img has a src and nothing
       else: not loaded, not decoded, not painted. So for the whole of a first
       visit's download the masthead was hidden, the five doors were hidden,
       and the picture replacing them was blank. What a new visitor saw was an
       empty black page with Privacy and Terms in the corner.

       It only shows on a COLD cache, which is why it survived: once the
       artwork is in the HTTP cache it paints in the same frame and the bug is
       invisible. It was caught by clearing the cache on the live site.

       The error handler above was already the right shape, and this is the
       same idea: reveal when the artwork actually arrives, and until then
       leave the real masthead and the real list of five doors on screen, which
       is exactly what they are kept for. A cold visit now reads as a page
       loading rather than as a page that is broken.

       `complete` is tested first because a warm cache fires no load event.

       The list goes inert as well as clipped: clipping alone left its five
       links in the tab order and read every wing a second time to a screen
       reader, after the hotspots. */
    var revealPlate = function () {
      document.documentElement.classList.add('plate-live');
      pillars.setAttribute('inert', '');
    };
    if (img.complete && img.naturalWidth > 0) revealPlate();
    else img.addEventListener('load', revealPlate, { once: true });

    /* There is deliberately no row of names under the artwork. The five doors
       are the five painted cards and nothing sits outside the frame. The names
       are still real text to a screen reader, on the hotspots themselves, and a
       keyboard user sees which card has focus: .spot:focus-visible draws a gold
       ring on the card, which is why that rule is not decoration. */
  }

  /* The hub builds its doors from an end-of-body script; wait for that rather
     than racing it. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(build, 0); });
  } else {
    setTimeout(build, 0);
  }
})();
