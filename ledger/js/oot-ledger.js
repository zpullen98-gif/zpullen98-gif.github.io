/* ============ The Ledger's half of the shared layer ============
   Two small jobs, kept out of the wing's own files so the wing stays readable
   and so this can be deleted in one piece if the shared layer ever goes away.

   1. The profile chips on the home screen need a click handler. #view is
      replaced wholesale on every render(), so the listener goes on a container
      that survives, and the shared bindWho reloads the page on a switch.

   2. Studying here has to feed the streak that all three wings share, so a
      bartender who drilled specs tonight is not told tomorrow that they missed
      a day because they happened to open the Codex instead.

   Loaded last, after the wing's own scripts, so every global it wraps exists.
   ============ */

(function () {
  'use strict';

  if (!window.OOT || !OOT.profiles) return;

  /* ---- 1. the profile switcher ---------------------------------------
     .wrap survives every render; #view does not. bindWho is idempotent and
     guards itself, so calling it once here is enough for the life of the page. */
  function bind() {
    var host = document.querySelector('.wrap') || document.body;
    if (OOT.home && OOT.home.bindWho) OOT.home.bindWho(host, function () { render(); });
    if (OOT.pass && OOT.pass.bind) OOT.pass.bind(host, function () {});

    /* A first-path step marks itself done and opens the tab it points at.
       Marking on the way IN rather than on the way out is deliberate: there is
       no honest signal for "read that properly", and a checklist that never
       ticks is worse than a generous one. */
    host.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-oot-step]');
      if (!b || typeof FIRST_PATH === 'undefined') return;
      var id = b.getAttribute('data-oot-step');
      var step = FIRST_PATH.filter(function (s) { return s.id === id; })[0];
      OOT.profiles.markPathStep('ledger', id);
      if (step && step.go && typeof state !== 'undefined') { state.tab = step.go; }
      render();
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  /* ---- 2. the shared streak -------------------------------------------
     recordSessionComplete is the Ledger's own once-a-night writer and already
     handles its own streak. This adds the cross-wing one beside it rather than
     replacing it: the Ledger's `hands` streak means something this file has no
     business flattening.

     Also hooked to card recording, because a bartender who drilled twenty cards
     and did not finish a whole session has still studied today. */
  if (typeof recordSessionComplete === 'function') {
    var _rsc = recordSessionComplete;
    recordSessionComplete = function () {
      try { OOT.profiles.markStudied(); OOT.profiles.touch(); } catch (e) {}
      return _rsc.apply(this, arguments);
    };
  }

  if (typeof recordCard === 'function') {
    var _rc = recordCard;
    recordCard = function () {
      try { OOT.profiles.markStudied(); OOT.profiles.touch(); } catch (e) {}
      return _rc.apply(this, arguments);
    };
  }

  /* ---- 3. what the team is weakest at ---------------------------------
     Ranked by family, because that is how this wing organises the canon and
     how a bar manager would set a pre-shift. Summed across every profile on the
     device, read straight from their namespaced stores so nobody has to be
     switched into. Published for The Pass, which has no FAMILIES of its own. */
  function publishLedgerGaps() {
    try {
      if (!OOT.pass || typeof FAMILIES === 'undefined' || typeof COCKTAILS === 'undefined') return;
      var famOf = {};
      COCKTAILS.forEach(function (c) { famOf[c.name] = c.family; });

      var agg = {};
      OOT.profiles.list().forEach(function (p) {
        var key = p.legacy ? 'bartenders-ledger-v1' : 'bartenders-ledger-v1::' + p.id;
        var d;
        try { d = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return; }
        if (!d || !d.cards) return;
        Object.keys(d.cards).forEach(function (name) {
          var fam = famOf[name];
          if (!fam) return;                      /* shots, zero proof, My Bar */
          var s = d.cards[name];
          agg[fam] = agg[fam] || { name: fam, right: 0, answered: 0 };
          agg[fam].right += (s.r || 0);
          agg[fam].answered += (s.r || 0) + (s.w || 0);
        });
      });

      var gaps = Object.keys(agg).map(function (k) {
        var a = agg[k];
        return { name: a.name, answered: a.answered,
                 accuracy: a.answered ? Math.round(a.right / a.answered * 100) : 0 };
      }).filter(function (g) { return g.answered >= 5; })
        .sort(function (a, b) { return a.accuracy - b.accuracy; });

      if (gaps.length) OOT.pass.publishGaps('ledger', gaps);
    } catch (e) {}
  }

  /* Recomputed on every home render, which is often enough to stay current and
     cheap enough not to matter: it is a pass over one small object per person. */
  if (typeof renderHome === 'function') {
    var _rh = renderHome;
    renderHome = function () {
      try { publishLedgerGaps(); } catch (e) {}
      return _rh.apply(this, arguments);
    };
  }
})();
