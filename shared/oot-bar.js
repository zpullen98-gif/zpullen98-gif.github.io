/* Outside Of Time: the return chip.
   The only thing injected into a wing's page besides the gate scripts, and the
   brief allows exactly one script tag and one chip. So this file is deliberately
   standalone: it depends on no other OOT script and on nothing a wing defines.

   Three constraints it is built around:

   1. Wing CSS must not reach it and it must not reach wing CSS. The chip lives
      in a shadow root, and the host element's own layout is set inline with
      !important so a stray `div{}` rule in a wing cannot move it.
   2. It must not touch location.hash. First Light routes on the hash; a chip
      that wrote to it would navigate the wing. The chip is a plain <a href>.
   3. It must sit below wing modals. Every wing puts toasts, sheets and search
      overlays between z-index 50 and 99, so this sits at 45 and is correctly
      covered by them. Top-left is the one edge no wing has claimed: the Ledger
      pins a full-width nav to the bottom on mobile, and the Codex, Ledger and
      Almanac all centre transient toasts along the bottom. */
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
    '.chip{' +
      'display:inline-flex;align-items:center;gap:.5em;' +
      'font:600 13px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;' +
      'letter-spacing:.06em;text-transform:uppercase;text-decoration:none;' +
      'color:rgba(255,255,255,.92);background:rgba(18,16,20,.72);' +
      '-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);' +
      'border:1px solid rgba(255,255,255,.22);border-radius:999px;' +
      'padding:8px 13px;cursor:pointer;pointer-events:auto;' +
      'box-shadow:0 2px 10px rgba(0,0,0,.35);' +
      'opacity:.62;transition:opacity .18s ease,background .18s ease;' +
      '-webkit-tap-highlight-color:transparent}' +
    '.chip:hover,.chip:focus-visible{opacity:1;background:rgba(18,16,20,.92)}' +
    '.chip:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
    '.mark{font-size:15px;line-height:1}' +
    /* Under 600px the label collapses and the chip becomes a round icon, so it
       never crowds a wing's own header on a phone. */
    '@media (max-width:599px){.label{' +
      'position:absolute;width:1px;height:1px;overflow:hidden;' +
      'clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}' +
      '.chip{padding:9px;border-radius:50%}}' +
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

    var link =
      '<a class="chip" href="' + root + '" ' +
      'title="Return to Outside Of Time" aria-label="Return to Outside Of Time">' +
      '<span class="mark" aria-hidden="true">&#8962;</span>' +
      '<span class="label">Outside Of Time</span></a>';

    if (host.attachShadow) {
      var sr = host.attachShadow({ mode: 'open' });
      sr.innerHTML = '<style>' + CSS + '</style>' + link;
    } else {
      /* No shadow DOM (very old browsers): fall back to the bare link rather
         than leaking these rules into the wing's stylesheet. pointer-events is
         an inherited property, so the anchor has to opt back in explicitly or
         the host's pointer-events:none makes it a chip nobody can click. */
      host.innerHTML = link;
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
