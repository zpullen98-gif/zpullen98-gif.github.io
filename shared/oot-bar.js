/* Outside Of Time: the return chip.
   The only thing injected into a wing's page besides the gate scripts, and the
   brief allows exactly one script tag and one chip. So this file is deliberately
   standalone: it depends on no other OOT script and on nothing a wing defines.

   Five constraints it is built around:

   1. Wing CSS must not reach it and it must not reach wing CSS. The chip lives
      in a shadow root, and the host element's own layout is set inline with
      !important so a stray `div{}` rule in a wing cannot move it.
   2. It must not touch location.hash. First Light routes on the hash; a chip
      that wrote to it would navigate the wing. The chip is a plain <a href>.
   3. It must sit below wing modals. Every wing puts toasts, sheets and search
      overlays between z-index 50 and 99, so this sits at 45 and is correctly
      covered by them. It is pinned top-left, 10px in from the safe-area insets:
      the Ledger pins a full-width nav to the bottom on mobile, and the Codex,
      Ledger and Almanac all centre transient toasts along the bottom. The
      corner is not empty, though: wing mastheads start about 20px in and
      24px down, so each wing clears the chip's lane itself, in its own CSS,
      in the monorepo tree only (no standalone carries the chip). The lane is
      the chip's footprint with its top-left corner at 10px,10px before the
      safe-area insets: a 44 by 44 disc at EVERY width (x 10 to 54, y 10 to
      54). The disc opens into a pill with the word mark only while a hovering
      pointer or keyboard focus is on it, so the resting footprint never
      changes with the viewport and no wing has to clear a second shape.
      Where each wing reserves it: Codex codex.css .topbar padding-top:52px
      under 600px (its centred title starts past x 54 on its own from there);
      Ledger ledger.css .wrap padding-top:48px under 640px (likewise); First
      Light firstlight.css .col padding-top:58px under 600px (likewise);
      Almanac .top-rail-inner padding-left:58px up to 1499px (its brand is
      left-aligned in a sticky rail); World Table (Svelte source
      +layout.svelte) .brandline padding-left:48px and .modebar-inner
      padding-left:60px up to 1267px (the 1200px shell centres both past x
      54 above that). Change the footprint here and every one of those
      numbers moves. The
      chip stays fixed while a wing scrolls, so those lanes protect the first
      screen only; a control that scrolls under the corner is still covered.
   4. It is typography only. The Codex forbids pictorial icons absolutely, so
      the chip carries no glyph: the monogram OOT in the chip's own face at
      rest, the word mark "Outside Of Time" while it is hovered or focused.
   5. It must pass AA at rest on the light wings as well as the dark ones. An
      earlier build rested at opacity .62 over a 72% pill, which measured 2.8:1
      on the World Table's paper and First Light's day ground. The chip now
      rests at full opacity on an 86% ink pill: text composites to 12.8:1 on
      the palest possible ground (#ffffff) and 18:1 or better on the dark wings,
      the pill edge reads at 10.7:1 or better against every light ground, and
      the .45 white ring keeps the edge at 3.4:1 or better on the dark ones
      (the Ledger's #14312a is the tightest). First Light's phase is set by the
      clock, not by prefers-color-scheme, so no media query can stand in for a
      resting colour that works on both grounds. */
(function () {
  'use strict';

  if (window.__ootBar) return;          /* idempotent: safe if injected twice */
  window.__ootBar = true;

  /* Locate the site root from this script's own URL. shared/oot-bar.js always
     sits one directory below the root, so stripping that suffix yields the hub
     regardless of deployment root or how deep the current page is. */
  var root = (function () {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName('script');
      for (var i = all.length - 1; i >= 0; i--) {
        if (all[i].src && /oot-bar\.js/.test(all[i].src)) { s = all[i]; break; }
      }
    }
    if (s && s.src) return s.src.replace(/shared\/oot-bar\.js(\?.*)?$/, '');
    return '/';
  })();

  var CSS =
    ':host{all:initial}' +
    /* A 44px disc at every width: the suite's touch floor, and one resting
       footprint for the wings to keep clear of. It is sized outright rather
       than padded so the box is a true square and the radius draws a circle. */
    '.chip{' +
      'box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;' +
      'width:44px;height:44px;padding:0;border-radius:50%;' +
      'font:600 13px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;' +
      'letter-spacing:.06em;text-transform:uppercase;text-decoration:none;white-space:nowrap;' +
      'color:#fff;background:rgba(18,16,20,.86);' +
      '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);' +
      'border:1px solid rgba(255,255,255,.45);' +
      'cursor:pointer;pointer-events:auto;' +
      'box-shadow:0 2px 10px rgba(0,0,0,.35);' +
      'transition:background .18s ease;' +
      '-webkit-tap-highlight-color:transparent}' +
    '.chip:hover,.chip:focus-visible{background:rgba(18,16,20,.96)}' +
    /* Two rings, so the focus indicator reads on a dark page (the white ring)
       and on a light one (the ink ring on either side of it). */
    '.chip:focus-visible{outline:2px solid #fff;outline-offset:2px;' +
      'box-shadow:0 2px 10px rgba(0,0,0,.35),0 0 0 6px rgba(18,16,20,.9)}' +
    /* The monogram. Letter-spacing trails the last letter, so the same amount
       of left padding recentres it in the disc. */
    '.mark{letter-spacing:.08em;padding-left:.08em}' +
    /* The word mark is read by assistive tech at every width and seen only
       while the disc is open. */
    '.label{position:absolute;width:1px;height:1px;overflow:hidden;' +
      'clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}' +
    /* A pointer that can hover, or keyboard focus, opens the disc rightward
       into a pill carrying the word mark. It closes again when they leave, so
       nothing a wing laid out is under a pill for longer than a pointer rests
       on it. A touch screen never opens it: a tap is the journey home. */
    '@media (hover:hover){' +
      '.chip:hover,.chip:focus-visible{width:auto;padding:0 16px;border-radius:999px}' +
      '.chip:hover .mark,.chip:focus-visible .mark{display:none}' +
      '.chip:hover .label,.chip:focus-visible .label{position:static;width:auto;height:auto;' +
        'overflow:visible;clip:auto;clip-path:none}}' +
    '@media (prefers-reduced-motion:reduce){.chip{transition:none}}';

  function mount() {
    if (document.getElementById('oot-bar-host')) return;

    var host = document.createElement('div');
    host.id = 'oot-bar-host';
    host.setAttribute('style', [
      'position:fixed !important',
      'top:calc(10px + env(safe-area-inset-top,0px)) !important',
      'left:calc(10px + env(safe-area-inset-left,0px)) !important',
      'z-index:45 !important',
      'margin:0 !important', 'padding:0 !important', 'border:0 !important',
      'width:auto !important', 'height:auto !important',
      'background:none !important', 'pointer-events:none !important',
      'transform:none !important', 'inset-inline-end:auto !important'
    ].join(';'));

    var mark = '<span class="mark" aria-hidden="true">OOT</span>';
    var link =
      '<a class="chip" href="' + root + '" ' +
      'title="Return to Outside Of Time" aria-label="Return to Outside Of Time">' +
      mark + '<span class="label">Outside Of Time</span></a>';

    if (host.attachShadow) {
      var sr = host.attachShadow({ mode: 'open' });
      sr.innerHTML = '<style>' + CSS + '</style>' + link;
    } else {
      /* No shadow DOM (very old browsers): fall back to the bare link rather
         than leaking these rules into the wing's stylesheet. Without the CSS
         nothing hides the monogram, so the fallback carries the word mark
         alone. pointer-events is an inherited property, so the anchor has to
         opt back in explicitly or the host's pointer-events:none makes it a
         chip nobody can click. */
      host.innerHTML = link.replace(mark, '');
      if (host.firstChild && host.firstChild.style) {
        host.firstChild.style.pointerEvents = 'auto';
      }
    }

    document.body.appendChild(host);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
