/* ---------------- WHEN THE BROWSER REFUSES TO SAVE ----------------

   engine.js already knows. `store.set` tries window.storage, then
   localStorage, and when both refuse it writes to an in-memory object and
   sets `store.degraded = true`. Its own comment says why the flag exists:

     "Every save was reporting success while the browser refused to persist,
      so the flag lets the UI say so while there is still time to export."

   THE FLAG WAS NEVER SHOWN TO ANYBODY WHO WOULD SEE IT. The only thing that
   reads it is storageWarningHTML(), and the only place that is called is
   inside Tools, My Data: a panel nobody opens mid-shift. So a bartender drills
   cards, logs pours, records a spill and 86s three bottles on a tablet whose
   storage is full, every save reports success, the session looks completely
   normal, and the whole night dies with the tab.

   That is the same defect the Sommelier's Codex had and codex15 fixed, and it
   is fixed the same way here, for the same reasons:

   A BANNER, NOT A TOAST. A toast fades, and this one is worth reading twice.
   It is appended to document.body rather than into the view, because every
   view here re-renders and a warning that a re-render removes is a warning
   that vanishes the moment the person taps anything.

   IT OFFERS THE EXPORT, which is the only action that actually rescues the
   session, rather than telling somebody to go and find it.

   IT CLEARS ITSELF the moment a save succeeds again, because the tablet that
   was full at eight o'clock may not be at nine, and a warning that outlives
   its cause teaches people to ignore banners.

   WRAPPING, NOT EDITING. store.set keeps sole ownership of deciding whether a
   write worked; this only watches what it decided. Loaded last so `store` and
   `dataExport` both exist. */

(function () {
  if (typeof store === 'undefined' || !store || typeof store.set !== 'function') return;

  var BANNER_ID = 'storage-alarm';

  function clear() {
    var b = document.getElementById(BANNER_ID);
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }

  function raise() {
    if (document.getElementById(BANNER_ID)) return;

    var b = document.createElement('div');
    b.id = BANNER_ID;
    b.setAttribute('role', 'alert');
    /* Docked to the bottom, not the top: the top of every view here carries the
       masthead and the tab row, and the World Table already learned what
       happens when a docked notice lands on a control somebody has to press. */
    b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;'
      + 'background:#7c332d;color:#f6efdf;border-top:1px solid #a1453d;'
      + 'padding:12px 14px;display:flex;gap:12px;align-items:center;'
      + 'flex-wrap:wrap;justify-content:space-between;'
      + 'font:inherit;box-shadow:0 -6px 18px rgba(0,0,0,.35)';

    var msg = document.createElement('div');
    msg.style.cssText = 'flex:1 1 260px;min-width:0;line-height:1.45;font-size:.86rem';
    msg.innerHTML = '<b>The browser is refusing to save.</b><br>'
      + 'Everything from this session lives only until this tab closes. '
      + 'Take a backup now.';

    var go = document.createElement('button');
    go.type = 'button';
    go.textContent = 'Export a backup';
    go.style.cssText = 'background:#c9a44c;color:#26231c;border:0;border-radius:4px;'
      + 'padding:9px 15px;font:inherit;font-weight:700;cursor:pointer;flex:0 0 auto';
    go.onclick = function () {
      /* straight to the one action that saves the night */
      try {
        if (typeof dataExport === 'function') { dataExport(); return; }
        if (typeof state !== 'undefined' && typeof render === 'function') {
          state.view = 'new'; render();
        }
      } catch (e) { /* a failed export must not take the banner with it */ }
    };

    b.appendChild(msg);
    b.appendChild(go);
    document.body.appendChild(b);
  }

  var _origSet = store.set;
  store.set = function (k, v) {
    var r = _origSet.call(store, k, v);
    /* store.set is async, so the flag is only settled once it resolves. A
       thenable is awaited; anything else is checked immediately, so this keeps
       working if that signature ever changes. */
    var check = function () {
      try { if (store.degraded) raise(); else clear(); } catch (e) { }
    };
    if (r && typeof r.then === 'function') r.then(check, check);
    else check();
    return r;
  };

  /* A tab that reloads into a storage that is still refusing gets told at once,
     rather than only after the next thing it fails to write. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { if (store.degraded) raise(); });
  } else if (store.degraded) {
    raise();
  }
})();
