/* ═══════════════ CODEX XXIII: THE WORLD MAP ═══════════════

   The atlas was ninety eight pins on twelve outlines drawn by hand in SVG
   (codex7's atlasMapSVG), buried three taps inside the Compendium. It was the
   worst thing in the app to look at. The owner has drawn fifteen real maps,
   and this puts them where the reader can reach them: a third door at the top
   of the home page, beside Our Wine List and The Producers.

   THE DRAWINGS GO, THE DATA STAYS. Every one of the ninety eight regions
   keeps its grapes and its soil, listed under the map it belongs to, and
   forty nine of them now also carry the climate and the explanatory note out
   of reference.js, which has sat in a separate view since the beginning and
   has never been shown beside the atlas. data-maps.js is the join. The old
   atlasMapSVG is left in codex7 unreferenced rather than cut out of two
   diverged copies of that file.

   THE PICTURES ARE NOT PRECACHED, and this is the important part. sw.js
   installs its whole asset list in one atomic act; a missing or slow image in
   that list means the worker never installs and the reader keeps a stale app
   or none. So the maps are fetched normally, and stored, only when the
   reader asks, in a cache named codexmaps-v1. The name has no hyphen after
   "codex" on purpose: both workers reap every cache matching their own
   prefix on activate, and a cache called codex-maps-v1 would be deleted on
   the first deploy after somebody stored nine megabytes of maps. sw.js has a
   matching branch that serves /maps/ out of that cache, so an <img> works
   offline without this file knowing anything about blobs.

   NOTHING IS PERSISTED IN ST. What is stored offline is a property of the
   device, not of the record, so it is read live from the Cache API. That also
   means there is no new field for mergeStats to drop on import.

   HOUSE RULES. New layer, no edits to earlier files. Top-level declarations
   are var/function so a later layer can rebind them. The CSS is injected from
   here rather than added to css/codex.css, following codex16: this file is
   byte-identical in both trees and the stylesheet is not.

   ON THE INTERFACE RULE. CLAUDE.md says typography, not pictures. These are
   study material, the way the producer records and the question banks are,
   not chrome. The rule is unchanged everywhere else. */

function v23Esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

var V23_CACHE = 'codexmaps-v1';

/* have:   ids whose file actually exists, null until the probe answers
   stored: ids held in the offline cache
   probed: the probe has run once this page load */
var V23 = { have: null, stored: {}, probed: false };

function v23HaveCaches() {
  try { return typeof caches !== 'undefined' && !!caches.open; } catch (e) { return false; }
}

/* Which maps are in the offline cache. Resolves to an object, never rejects:
   a browser with Cache Storage switched off should cost the offline button,
   not the tab. */
function v23ReadStored() {
  if (!v23HaveCaches()) return Promise.resolve({});
  return caches.open(V23_CACHE).then(function (c) {
    return c.keys().then(function (reqs) {
      var out = {};
      MAP_SHEETS.forEach(function (s) {
        var f = mapFile(s.id);
        for (var i = 0; i < reqs.length; i++) {
          if (reqs[i].url.indexOf(f) >= 0) { out[s.id] = true; break; }
        }
      });
      return out;
    });
  }).catch(function () { return {}; });
}

/* Which map files exist at all.

   There is no manifest: the owner drops files into maps/ and the app has to
   find out. A HEAD costs headers and no body, and the worker ignores anything
   that is not a GET, so these go straight to the network. A map already in
   the offline cache counts as present without asking, which is what makes
   this work with no connection. */
function v23Probe() {
  if (V23.probed) return Promise.resolve(V23.have || []);
  V23.probed = true;
  return v23ReadStored().then(function (stored) {
    V23.stored = stored;
    return Promise.all(MAP_SHEETS.map(function (s) {
      if (stored[s.id]) return s.id;
      return fetch(mapFile(s.id), { method: 'HEAD' })
        .then(function (r) { return r && r.ok ? s.id : null; })
        .catch(function () { return null; });
    }));
  }).then(function (ids) {
    V23.have = ids.filter(Boolean);
    return V23.have;
  }).catch(function () { V23.have = []; return V23.have; });
}

function v23Sheets() {
  var have = V23.have || [];
  return MAP_SHEETS.filter(function (s) { return have.indexOf(s.id) >= 0; });
}

function v23StoredCount() {
  var n = 0;
  (V23.have || []).forEach(function (id) { if (V23.stored[id]) n++; });
  return n;
}

/* ═══════════ storing them ═══════════ */

function v23StoreAll(btn, say) {
  if (!v23HaveCaches()) return;
  var ids = (V23.have || []).filter(function (id) { return !V23.stored[id]; });
  if (!ids.length) return;
  btn.disabled = true;
  var done = 0, failed = 0;

  caches.open(V23_CACHE).then(function (c) {
    var step = function (i) {
      if (i >= ids.length) return Promise.resolve();
      say('Storing ' + (i + 1) + ' of ' + ids.length + '…');
      return c.add(new Request(mapFile(ids[i]), { cache: 'reload' }))
        .then(function () { done++; V23.stored[ids[i]] = true; })
        .catch(function () { failed++; })
        .then(function () { return step(i + 1); });
    };
    return step(0);
  }).then(function () {
    btn.disabled = false;
    say(failed
      ? done + ' stored, ' + failed + ' could not be fetched.'
      : 'All ' + v23StoredCount() + ' maps are on this device.');
    if (S.view === 'worldmap') render();
  }).catch(function () {
    btn.disabled = false;
    say('They could not be stored on this device.');
  });
}

function v23Forget(btn, say) {
  if (!v23HaveCaches()) return;
  btn.disabled = true;
  caches.delete(V23_CACHE).then(function () {
    V23.stored = {};
    btn.disabled = false;
    say('Removed from this device. They still load with a connection.');
    if (S.view === 'worldmap') render();
  }).catch(function () { btn.disabled = false; });
}

/* ═══════════ the full screen viewer ═══════════

   The legends on these maps are unreadable at the size a phone will show the
   whole sheet, so being able to get close is the whole point of the feature
   rather than a refinement of it. One transform, driven by pointer events, so
   a mouse, a trackpad and two fingers all drive the same state. */

function v23Open(id) {
  var sheet = mapSheet(id);
  if (!sheet) return;
  var restore = document.activeElement;

  var ov = document.createElement('div');
  ov.className = 'wmv';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', 'Map of ' + sheet.name);
  ov.innerHTML =
    '<div class="wmv-bar">' +
      '<span class="wmv-ttl">' + v23Esc(sheet.name) + '</span>' +
      '<span class="wmv-tip">Pinch, scroll or double tap to zoom. Drag to move.</span>' +
      '<button class="wmv-x" type="button">Close</button>' +
    '</div>' +
    '<div class="wmv-stage">' +
      '<img class="wmv-img" alt="Map of the wine regions of ' + v23Esc(sheet.name) + '" ' +
        'src="' + v23Esc(mapFile(id)) + '">' +
      '<div class="wmv-fail" hidden>This map is not on the device and there is no connection.</div>' +
    '</div>';

  document.body.appendChild(ov);
  document.body.classList.add('wmv-lock');

  var stage = ov.querySelector('.wmv-stage');
  var img = ov.querySelector('.wmv-img');
  var fail = ov.querySelector('.wmv-fail');
  var closeBtn = ov.querySelector('.wmv-x');

  var s = 1, tx = 0, ty = 0, base = { w: 0, h: 0 };

  function measure() {
    /* The natural laid-out size at scale 1, which is what every clamp is
       measured against. Read with the transform off so a mid-gesture resize
       cannot feed the scaled size back into itself. */
    var t = img.style.transform;
    img.style.transform = 'none';
    base.w = img.clientWidth;
    base.h = img.clientHeight;
    img.style.transform = t;
  }

  function clamp() {
    if (s <= 1) { tx = 0; ty = 0; return; }
    var mx = Math.max(0, (base.w * s - stage.clientWidth) / 2);
    var my = Math.max(0, (base.h * s - stage.clientHeight) / 2);
    tx = Math.min(mx, Math.max(-mx, tx));
    ty = Math.min(my, Math.max(-my, ty));
  }

  function apply() {
    clamp();
    img.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')';
  }

  /* Zoom to ns while holding the point (px, py), measured from the centre of
     the stage, still under the finger. */
  function zoomTo(ns, px, py) {
    ns = Math.min(8, Math.max(1, ns));
    if (ns === s) return;
    tx = px - (ns / s) * (px - tx);
    ty = py - (ns / s) * (py - ty);
    s = ns;
    apply();
  }

  function centreOf(e) {
    var r = stage.getBoundingClientRect();
    return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 };
  }

  img.addEventListener('load', function () { measure(); apply(); });
  img.addEventListener('error', function () { img.hidden = true; fail.hidden = false; });

  /* ---- pointers ---- */
  var pts = {}, gesture = null, lastTap = 0;

  function count() { var n = 0; for (var k in pts) if (pts.hasOwnProperty(k)) n++; return n; }

  stage.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    try { stage.setPointerCapture(e.pointerId); } catch (err) { }
    pts[e.pointerId] = { x: e.clientX, y: e.clientY };
    if (count() === 2) {
      var ids = Object.keys(pts);
      var a = pts[ids[0]], b = pts[ids[1]];
      gesture = {
        d: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        s: s,
        c: centreOf({ clientX: (a.x + b.x) / 2, clientY: (a.y + b.y) / 2 })
      };
    }
  });

  stage.addEventListener('pointermove', function (e) {
    if (!pts[e.pointerId]) return;
    var prev = pts[e.pointerId];
    pts[e.pointerId] = { x: e.clientX, y: e.clientY };
    var n = count();

    if (n >= 2 && gesture) {
      var ids = Object.keys(pts);
      var a = pts[ids[0]], b = pts[ids[1]];
      var d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      zoomTo(gesture.s * (d / gesture.d), gesture.c.x, gesture.c.y);
      return;
    }
    if (n === 1 && s > 1) {
      e.preventDefault();
      tx += e.clientX - prev.x;
      ty += e.clientY - prev.y;
      apply();
    }
  });

  function up(e) {
    delete pts[e.pointerId];
    if (count() < 2) gesture = null;
  }
  stage.addEventListener('pointerup', function (e) {
    /* Double tap toggles between the whole sheet and close enough to read a
       legend. Tracked here rather than with dblclick because dblclick does not
       fire reliably for touch. */
    var now = Date.now();
    if (count() === 1 && now - lastTap < 320) {
      var p = centreOf(e);
      zoomTo(s > 1.05 ? 1 : 3, p.x, p.y);
      lastTap = 0;
    } else {
      lastTap = now;
    }
    up(e);
  });
  stage.addEventListener('pointercancel', up);

  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    var p = centreOf(e);
    zoomTo(s * (e.deltaY < 0 ? 1.18 : 1 / 1.18), p.x, p.y);
  }, { passive: false });

  /* ---- closing ---- */
  function close() {
    document.removeEventListener('keydown', key, true);
    window.removeEventListener('resize', onResize);
    document.body.classList.remove('wmv-lock');
    if (ov.parentNode) ov.parentNode.removeChild(ov);
    try { if (restore && restore.focus) restore.focus(); } catch (err) { }
  }
  function key(e) {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key === '+' || e.key === '=') { zoomTo(s * 1.3, 0, 0); }
    else if (e.key === '-') { zoomTo(s / 1.3, 0, 0); }
    else if (e.key === '0') { s = 1; tx = 0; ty = 0; apply(); }
  }
  function onResize() { measure(); apply(); }

  closeBtn.onclick = close;
  document.addEventListener('keydown', key, true);
  window.addEventListener('resize', onResize);
  measure();
  apply();
  closeBtn.focus();
}

/* ═══════════ the tab ═══════════ */

function v23RegionRows(id) {
  var rows = mapRegions(id);
  if (!rows.length) return '';
  var have = (typeof cats === 'function') ? cats() : {};
  var html = '<div class="wmregions">';
  rows.forEach(function (r, i) {
    var drill = (r.sec && have[r.sec]) ? r.sec : '';
    html += '<div class="wmreg' + (r.orphan ? ' wmreg-orphan' : '') + '">' +
      '<div class="wmreg-h"><span class="wmreg-n">' + v23Esc(r.n) + '</span>' +
      (r.climate ? '<span class="wmreg-cl">' + v23Esc(r.climate) + '</span>' : '') + '</div>' +
      '<div class="wmreg-g">' + v23Esc(r.g) + '</div>' +
      '<div class="wmreg-s"><b>Soil:</b> ' + v23Esc(r.soil) + '</div>' +
      (r.notes.length
        ? '<div class="wmreg-note">' + r.notes.map(v23Esc).join(' ') + '</div>' : '') +
      (r.orphan
        ? '<div class="wmreg-flag">Examined, and on no map yet.</div>' : '') +
      (drill
        ? '<button class="wmreg-d" type="button" data-sec="' + v23Esc(drill) + '">' +
          'Drill ' + v23Esc(drill) + '</button>' : '') +
      '</div>';
  });
  return html + '</div>';
}

function v23SheetView(id) {
  var sheet = mapSheet(id);
  var rows = mapRegions(id);
  var v = el('<div>' +
    '<div class="viewhead"><h2>' + v23Esc(sheet.name) + '</h2>' +
    '<div class="sub">' + rows.length + ' region' + (rows.length === 1 ? '' : 's') +
    '. Tap the map to open it full screen, then pinch to read the legend.</div></div>' +
    '<button class="wmfull" type="button" id="wm-open">' +
      '<img src="' + v23Esc(mapFile(id)) + '" alt="Map of the wine regions of ' +
      v23Esc(sheet.name) + '" loading="lazy">' +
    '</button>' +
    v23RegionRows(id) +
    '<button class="btn" id="wm-back" style="width:100%;margin-top:18px">All maps</button>' +
    '</div>');

  v.querySelector('#wm-open').onclick = function () { v23Open(id); };
  v.querySelector('#wm-back').onclick = function () { S.wmap = null; render(); };
  v.querySelectorAll('.wmreg-d').forEach(function (b) {
    b.onclick = function () { startDrill(b.getAttribute('data-sec')); };
  });
  return v;
}

function v23GridView() {
  var have = v23Sheets();
  var total = MAP_SHEETS.length;
  var stored = v23StoredCount();

  var html = '<div class="viewhead"><h2>The World Map</h2><div class="sub">' +
    have.length + ' of ' + total + ' maps · ' +
    have.reduce(function (a, s) { return a + mapRegions(s.id).length; }, 0) + ' regions' +
    '</div></div>';

  MAP_GROUPS.forEach(function (g) {
    var ids = g[1].filter(function (id) {
      return have.some(function (s) { return s.id === id; });
    });
    if (!ids.length) return;
    html += '<div class="secgroup">' + v23Esc(g[0]) + '</div><div class="wmgrid">';
    ids.forEach(function (id) {
      var sheet = mapSheet(id);
      var n = mapRegions(id).length;
      html += '<button class="wmcard" type="button" data-map="' + v23Esc(id) + '">' +
        '<img src="' + v23Esc(mapFile(id)) + '" alt="" loading="lazy">' +
        '<span class="wmcard-n">' + v23Esc(sheet.name) + '</span>' +
        '<span class="wmcard-r">' + n + ' region' + (n === 1 ? '' : 's') +
        (V23.stored[id] ? ' · on this device' : '') + '</span>' +
        '</button>';
    });
    html += '</div>';
  });

  if (v23HaveCaches() && have.length) {
    html += '<div class="wmoffline"><div class="wmoff-say" id="wm-say">' +
      (stored >= have.length
        ? 'All ' + have.length + ' maps are on this device and open without a connection.'
        : stored + ' of ' + have.length + ' maps are on this device. ' +
          'The rest need a connection.') +
      '</div><div class="wmoff-row">' +
      (stored < have.length
        ? '<button class="btn gold" type="button" id="wm-store">Keep all maps on this device</button>' : '') +
      (stored ? '<button class="btn" type="button" id="wm-forget">Remove them</button>' : '') +
      '</div><div class="wmoff-why">They are kept out of the app’s own download on purpose, ' +
      'so a slow connection can never leave you with a broken app.</div></div>';
  }

  var v = el('<div>' + html + '</div>');
  v.querySelectorAll('[data-map]').forEach(function (b) {
    b.onclick = function () { S.wmap = b.getAttribute('data-map'); render(); };
  });
  var say = function (t) {
    var n = document.getElementById('wm-say');
    if (n) n.textContent = t;
  };
  var sb = v.querySelector('#wm-store');
  if (sb) sb.onclick = function () { v23StoreAll(sb, say); };
  var fb = v.querySelector('#wm-forget');
  if (fb) fb.onclick = function () { v23Forget(fb, say); };
  return v;
}

function worldMapView() {
  if (S.wmap && mapSheet(S.wmap) && (V23.have || []).indexOf(S.wmap) >= 0) {
    return v23SheetView(S.wmap);
  }
  S.wmap = null;
  return v23GridView();
}

/* ═══════════ routing ═══════════ */

var _v23Render = render;
render = function () {
  /* The Compendium's atlas section becomes the world map. codex7's render
     wrapper was installed first and therefore runs after this one, so
     redirecting here means the old drawings are never built at all. With no
     map files present the condition fails and codex7 draws them as before,
     which is what makes this safe to ship ahead of the pictures. */
  if (S.view === 'compendium' && S.cmp && S.cmp.sec === 'atlas' && (V23.have || []).length) {
    S.wmap = null;
    S.view = 'worldmap';
  }
  if (S.view === 'worldmap') {
    if (!(V23.have || []).length) { S.view = 'home'; return _v23Render.apply(this, arguments); }
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    try { stopTimer(); } catch (e) { }
    var app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(topbar());
    app.appendChild(worldMapView());
    window.scrollTo(0, 0);
    return;
  }
  return _v23Render.apply(this, arguments);
};

/* ═══════════ the third door ═══════════

   codex16 builds the band and owns its CSS, and its row is a hard two column
   grid. Rather than edit that file in both trees, this appends to the row it
   finds and widens it from here. If the band is absent, or no map file is
   there yet, nothing is inserted: a missing door is a far smaller failure
   than a home page that throws. */
var _v23DecorateHome = (typeof decorateHome === 'function') ? decorateHome : null;
if (_v23DecorateHome) {
  decorateHome = function () {
    var out = _v23DecorateHome.apply(this, arguments);
    try {
      if (document.getElementById('d-maps')) return out;
      var have = v23Sheets();
      if (!have.length) return out;
      var row = document.querySelector('.codexdoor-row');
      if (!row) return out;

      var regions = have.reduce(function (a, s) { return a + mapRegions(s.id).length; }, 0);
      var stored = v23StoredCount();
      var b = el('<button class="codexdoor" id="d-maps">' +
        '<span class="cd-k">The World Map</span>' +
        '<span class="cd-b">' + have.length + ' maps · ' + regions + ' regions' +
        (stored ? ' · ' + stored + ' on this device' : '') + '</span></button>');
      b.onclick = function () { S.wmap = null; S.view = 'worldmap'; render(); };
      row.appendChild(b);
    } catch (e) { }
    return out;
  };
}

/* The Compendium tile promised "12 maps" from the retired drawings. */
try {
  if (typeof V22_TILES !== 'undefined') {
    V22_TILES['t-compendium'] = function () {
      try {
        var regions = INTRO_ATLAS.reduce(function (a, c) { return a + c.r.length; }, 0);
        return regions + ' regions · ' + INTRO_GRAPES.length + ' grapes';
      } catch (e) { return null; }
    };
  }
} catch (e) { }

/* The probe cannot be synchronous, so the first home render happens without
   it and the door arrives a moment later. Re-rendering only on the home view
   keeps it from interrupting anything the reader has started. */
(function () {
  var go = function () {
    v23Probe().then(function (have) {
      if (have.length && S.view === 'home') render();
    });
  };
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(go, 0);
  } else {
    window.addEventListener('DOMContentLoaded', go);
  }
})();

/* ═══════════ style ═══════════ */
(function () {
  var css = [
    /* three doors where codex16 declared two */
    '@media(min-width:901px){.codexdoor-row{grid-template-columns:repeat(3,1fr)}}',
    '@media(min-width:641px) and (max-width:900px){.codexdoor-row>#d-maps{grid-column:1/-1}}',

    '.wmgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));',
    '  gap:12px;margin:10px 0 20px}',
    '.wmcard{display:flex;flex-direction:column;gap:0;padding:0;cursor:pointer;text-align:left;',
    '  border:1px solid var(--line);border-radius:3px;background:rgba(0,0,0,.14);',
    '  color:var(--parch);font:inherit;overflow:hidden;transition:border-color .18s,transform .18s}',
    '.wmcard:hover{border-color:var(--gold);transform:translateY(-2px)}',
    '.wmcard:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    /* contain, not cover. The sheets are not one shape: eleven are landscape,
       four are portrait and one is neither, and every one carries its name in
       large letters in a top corner. A cover crop takes that name off the
       portrait ones entirely, which is the one thing a thumbnail must keep. */
    '.wmcard img{display:block;width:100%;aspect-ratio:4/3;object-fit:contain;background:#100e0b}',
    '.wmcard-n{font-size:1rem;color:var(--gold-soft);font-weight:600;padding:9px 11px 0}',
    '.wmcard-r{font-size:.8rem;opacity:.66;padding:2px 11px 10px}',

    '.wmfull{display:block;width:100%;padding:0;margin:6px 0 4px;cursor:zoom-in;',
    '  border:1px solid var(--line);border-radius:3px;background:rgba(0,0,0,.14);overflow:hidden}',
    '.wmfull:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    '.wmfull img{display:block;width:100%;height:auto}',

    '.wmregions{display:flex;flex-direction:column;gap:10px;margin-top:16px}',
    '.wmreg{border:1px solid var(--line);border-radius:3px;padding:11px 13px;background:rgba(0,0,0,.10)}',
    '.wmreg-orphan{border-style:dashed;opacity:.85}',
    '.wmreg-h{display:flex;justify-content:space-between;align-items:baseline;gap:10px}',
    '.wmreg-n{color:var(--gold-soft);font-weight:600;font-size:1rem}',
    '.wmreg-cl{font-size:.74rem;letter-spacing:.04em;text-transform:uppercase;opacity:.6}',
    '.wmreg-g{font-size:.88rem;margin-top:4px}',
    '.wmreg-s{font-size:.82rem;opacity:.74;margin-top:3px}',
    '.wmreg-note{font-size:.84rem;font-style:italic;opacity:.78;margin-top:6px;line-height:1.5}',
    '.wmreg-flag{font-size:.78rem;color:var(--gold-soft);margin-top:6px}',
    '.wmreg-d{margin-top:9px;padding:7px 12px;min-height:38px;cursor:pointer;font:inherit;',
    '  font-size:.82rem;color:var(--parch);background:transparent;',
    '  border:1px solid var(--line);border-radius:3px}',
    '.wmreg-d:hover{border-color:var(--gold);color:var(--gold-soft)}',

    '.wmoffline{margin:22px 0 8px;padding:14px 15px;border:1px solid var(--line);border-radius:3px}',
    '.wmoff-say{font-size:.9rem}',
    '.wmoff-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:11px}',
    '.wmoff-row .btn{flex:1 1 200px}',
    '.wmoff-why{font-size:.78rem;opacity:.6;margin-top:10px;line-height:1.5}',

    /* the viewer */
    '.wmv-lock{overflow:hidden}',
    '.wmv{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;',
    '  background:#12100d}',
    '.wmv-bar{display:flex;align-items:center;gap:12px;padding:10px 12px;',
    '  border-bottom:1px solid var(--line);background:rgba(0,0,0,.35)}',
    '.wmv-ttl{color:var(--gold-soft);font-size:1rem;font-weight:600}',
    '.wmv-tip{flex:1;font-size:.76rem;opacity:.55}',
    '.wmv-x{padding:9px 15px;min-height:44px;cursor:pointer;font:inherit;font-size:.85rem;',
    '  color:var(--parch);background:transparent;border:1px solid var(--line);border-radius:3px}',
    '.wmv-x:hover{border-color:var(--gold);color:var(--gold-soft)}',
    '.wmv-stage{flex:1;position:relative;display:flex;align-items:center;justify-content:center;',
    '  overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none}',
    '.wmv-img{max-width:100%;max-height:100%;display:block;will-change:transform;',
    '  -webkit-user-drag:none;user-drag:none}',
    /* display:block above outranks the user agent rule for [hidden], so the
       failure message would otherwise appear underneath the broken image. */
    '.wmv-img[hidden]{display:none}',
    '.wmv-fail{padding:20px;font-size:.9rem;opacity:.7;text-align:center}',
    '@media(max-width:560px){.wmv-tip{display:none}}'
  ].join('\n');
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);
})();
