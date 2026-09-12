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
    /* stamped so a browser's own cache cannot serve the previous artwork; the
       worker matches with ignoreSearch, so the precached bare path still answers */
    src.srcset = 'assets/hub-plate.webp?v=2';
    src.type = 'image/webp';
    var img = document.createElement('img');
    img.src = 'assets/hub-plate.jpg?v=2';
    img.width = 1024;
    img.height = 1536;
    img.decoding = 'async';
    /* The masthead's words are painted into this image, so they are described
       here for anyone who cannot see it. The five wings are named by the
       hotspots themselves. */
    img.alt = 'Outside Of Time Hospitality. Five wings, shown as illuminated cards ' +
      'below a set table on a terrace above the sea at sunset.';
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
      /* The card's lettering is pixels, so the link carries the name itself,
         and then the one line the painting does not carry: what the wing IS
         (four examinations, 365 cocktails, 1,844 recipes). The motto is
         already painted on the card, so repeating it here told a screen
         reader nothing new, and a title of the bare name gave a mouse a
         tooltip that repeated the largest words on the card. */
      var what = w.name + (w.line ? '. ' + w.line : (w.motto ? '. ' + w.motto : ''));
      a.setAttribute('aria-label', what);
      a.title = what;
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
       reader, after the hotspots. The one exception is a magnified window,
       below, where the list comes back and the hotspots step aside. */
    var revealPlate = function () {
      document.documentElement.classList.add('plate-live');
      pillars.setAttribute('inert', '');
      syncMagnified();
    };
    if (img.complete && img.naturalWidth > 0) revealPlate();
    else img.addEventListener('load', revealPlate, { once: true });

    /* There is deliberately no row of names under the artwork. The five doors
       are the five painted cards and nothing sits outside the frame. The names
       are still real text to a screen reader, on the hotspots themselves, and a
       keyboard user sees which card has focus: .spot:focus-visible draws a gold
       ring on the card, which is why that rule is not decoration. The single
       exception is the magnified window, next. */

    /* MAGNIFIED IS THE EXCEPTION, and the painting stays exactly as it is.

       Every word on this page is pixels, and the plate is sized from the
       height of the window. Browser zoom shrinks the CSS window in the same
       proportion, so from 100% to 200% the picture lands on the same device
       pixels every time: a reader who pressed ctrl+= four times to read a
       motto painted at a 5px cap height got a page that did not move. The
       masthead and the list of doors are real text and were here all along,
       clipped to a pixel under .plate-live for the artwork to stand in for
       them. When a reader has magnified the page, they come back out in the
       reader's own size, the masthead above the painting and the list of
       doors below it, and the list is no longer inert so its links are real
       again. The plate itself is not resized, moved or captioned: nothing
       changes for anyone who has not zoomed.

       Zoom is not a media feature, and no engine reports it, so it is
       inferred, and the engines disagree about what zoom moves. Two witnesses,
       either of which is enough:

       THE FRAME AGAINST THE PAGE. outerWidth is the window's own width and
       innerWidth is the CSS width the zoom divides. In Chrome, Edge and
       desktop Safari outerWidth is in screen pixels and does not move with
       zoom, so their ratio is the zoom factor: 1.6 at 160%, 2 at 200%. The
       bar is 1.6 rather than 1.4 so a browser sidebar (Edge's is about 400 of
       1366, a ratio of 1.44) does not open the index for a reader at 100%.
       What still can: developer tools docked at half width, a browser that
       tiles two pages in one window, or a 400px side panel in a 1000px
       window, which is a reader at 100% given the masthead and the list in
       words. That costs them nothing but the owner's intended silence, so it
       is accepted rather than guarded against with a density test, because a
       density test would refuse desktop Safari on a plain monitor, where
       devicePixelRatio never moves with zoom at all. Inside a frame the test
       is refused outright: there innerWidth is the frame's width and
       outerWidth the host window's, a ratio that says nothing about zoom,
       and the hub is a top-level page.

       A DENSE, SHORT, NARROW WINDOW, IN FIREFOX ONLY. Firefox reports
       outerWidth in the page's own zoomed pixels, so there the ratio above
       reads 1 at every zoom, and what Firefox moves instead is
       devicePixelRatio: the OS scale multiplied by the zoom. Density alone
       cannot tell a plain monitor at 200% from a Retina screen at 100%, so
       it is read with the window's size, and the size bar is set where the
       OS scale alone cannot reach it on a maximised window. A 1080-line
       laptop at Windows' 175% is 1097 by about 540 CSS px with the browser's
       own bars taken off, and 175% is the largest scale Windows offers a
       1080p screen, so the window must be SHORTER than that: 480 or under.
       Zoomed, it is: 1366 by 768 at 160% is 853 by about 425; 1080p at 150%
       zoomed to 160% is 800 by about 400. The witness is confined to Firefox
       (mozInnerScreenX is Firefox's own) because it is only there that the
       frame witness cannot see zoom; in Chrome and Edge the same numbers
       (a 1080p laptop at 200% scaling, 960 by about 460 CSS px) would
       otherwise open the index for a reader who never zoomed, and that engine
       has already answered through the ratio. The pointer test keeps phones
       and tablets out, which are dense and small by nature and have pinch
       zoom, which does magnify the painting. What remains: a Firefox window
       at 200% OS scale on a 1080p screen, which Windows does not offer that
       screen, or a Firefox window deliberately dragged short on a Retina
       display at 100%, and both are handed real text. The miss is Firefox
       on a 1x monitor wider than 1100 CSS px after zooming (1920 at 160% is
       1200), where the plate is already painted close to its full 1024 and
       the words in it are near the size they were drawn.

       Between 110% and 150% neither witness fires, on purpose: that is the
       range a sidebar or a scaled display can imitate, and a reader who
       needs more than the painting gives will go past it.

       A webview reporting 0 for either width counts as not magnified.
       Measured on this machine (Windows at 150%, the pane at 1024 wide):
       outerWidth 1024, innerWidth 1024, ratio 1.0, density 1.5, so an
       unzoomed reader does not open the index; the pane at 683 by 384 keeps
       density 1.5, under the bar, so a narrow window alone does not either.

       WHILE MAGNIFIED THE HOTSPOTS STEP ASIDE for assistive technology: they
       are hidden from the accessibility tree and taken out of the tab order,
       because the list below the painting now carries the same five names and
       lines as real, visible text, and two copies of every door is exactly
       what inert was put on the list to prevent. A mouse can still click a
       card. Everything is put back the moment the zoom comes off. */
    function magnified() {
      try {
        if (window.top !== window.self) return false;
        var iw = window.innerWidth, ih = window.innerHeight, ow = window.outerWidth;
        if (!iw) return false;
        if (ow && ow / iw >= 1.6) return true;
        if (!('mozInnerScreenX' in window)) return false;
        var dpr = window.devicePixelRatio || 1;
        var fine = false;
        try { fine = !!(window.matchMedia && window.matchMedia('(pointer: fine)').matches); } catch (e2) {}
        return fine && dpr >= 1.6 && iw <= 1100 && ih <= 480;
      } catch (e) { return false; }
    }
    function syncMagnified() {
      var root = document.documentElement;
      if (!root.classList.contains('plate-live')) return;
      var on = magnified();
      if (on) root.classList.add('plate-zoomed'); else root.classList.remove('plate-zoomed');
      if (on) pillars.removeAttribute('inert'); else pillars.setAttribute('inert', '');
      Array.prototype.forEach.call(plate.querySelectorAll('.spot'), function (a) {
        if (on) { a.setAttribute('aria-hidden', 'true'); a.setAttribute('tabindex', '-1'); }
        else { a.removeAttribute('aria-hidden'); a.removeAttribute('tabindex'); }
      });
    }
    /* A zoom change fires resize, and so does a sidebar opening. Firefox's
       zoom also moves the resolution, which a media query can watch, and a
       page restored from the back-forward cache or shown after being loaded
       in the background is read again rather than trusted from before. */
    window.addEventListener('resize', syncMagnified);
    window.addEventListener('pageshow', syncMagnified);
    document.addEventListener('visibilitychange', syncMagnified);
    try {
      var dpr0 = window.devicePixelRatio || 1;
      var mq = window.matchMedia && window.matchMedia('(resolution: ' + dpr0 + 'dppx)');
      if (mq && mq.addEventListener) mq.addEventListener('change', syncMagnified);
    } catch (e3) {}
    setTimeout(syncMagnified, 300);
  }

  /* The hub builds its doors from an end-of-body script; wait for that rather
     than racing it. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(build, 0); });
  } else {
    setTimeout(build, 0);
  }
})();
