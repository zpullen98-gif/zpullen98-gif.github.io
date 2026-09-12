/* ============ The Ledger's half of the shared layer ============
   Kept out of the wing's own files so the wing stays readable and so this can
   be deleted in one piece if the shared layer ever goes away.

   NOBODY IS NAMED IN THIS WING. The profile row and the manager strip came out
   on the owner's call: they belong to a manager mode that has not been built,
   and asking a bartender who they are before the app will keep their work is a
   toll gate with nothing behind it. The Ledger keeps one record per device
   again, exactly as it did before names, and the first-week induction ticks
   into that record rather than onto a person.

   1. The first week: one click handler for the induction steps. #view is
      replaced wholesale on every render(), so the listener goes on a container
      that survives.

   2. What this bar is weakest at, published for The Pass. A wing figure, never
      a person's, read from the device's one ledger.

   3. The cross-wing streak, wired but dormant: with no profile to mark it does
      nothing, and it is the seam that lights up when manager mode arrives.

   Loaded last, after the wing's own scripts, so every global it wraps exists.
   ============ */

(function () {
  'use strict';

  if (!window.OOT || !OOT.profiles) return;

  /* ---- 1. the first week ----------------------------------------------
     There is no profile switcher here any more, and no manager strip to bind:
     naming a person came out of this wing and goes back in with the manager
     mode it belongs to. .wrap survives every render; #view does not, so the
     one listener still goes here. */
  function bind() {
    var host = document.querySelector('.wrap') || document.body;

    /* A first-path step marks itself done and opens the tab it points at.
       Marking on the way IN rather than on the way out is deliberate: there is
       no honest signal for "read that properly", and a checklist that never
       ticks is worse than a generous one. */
    host.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-oot-step]');
      if (!b || typeof FIRST_PATH === 'undefined') return;
      var id = b.getAttribute('data-oot-step');
      var step = FIRST_PATH.filter(function (s) { return s.id === id; })[0];
      /* Ticked in this device's own ledger rather than on a person. */
      if (typeof progress !== 'undefined') {
        progress.path = progress.path || {};
        if (!progress.path[id]) {
          progress.path[id] = Date.now();
          if (typeof saveProgress === 'function') saveProgress();
        }
      }
      if (step && typeof state !== 'undefined') {
        if (step.go) state.tab = step.go;
        /* the optional deep links: a step lands on the thing its title
           promises, not at the tab door. "Shake, stir, build" opens the
           technique note; "Your first ten cards" deals those ten cards. */
        if (step.open) { state.noteOpen = step.open; state.noteJump = true; }
        if (step.deal === 'first-ten' && typeof allDrinks === 'function' && typeof prepCard === 'function') {
          var deck = allDrinks().filter(function (d) { return d.src === 'Cocktails' && d.tier === 1; }).slice(0, 10);
          if (deck.length) {
            Object.assign(state.fc, { stage: 'run', mode: 'name2spec', deck: deck, idx: 0, right: 0, wrong: 0, missed: [] });
            prepCard();
          }
        }
      }
      render();
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  /* ---- 2. the shared streak (dormant) ---------------------------------
     Nobody can be named in this wing now, so markStudied has no profile to
     mark and does nothing. It is left wired rather than deleted because the
     day manager mode arrives this is the seam that lights up, and a streak
     that silently stopped counting is worse than one that never started.
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

      /* One record, because this wing keeps one. publishGaps takes a WING and
         a ranking, never a person, so the figure it wants is what this bar is
         weakest at, which is exactly what the device's own ledger says. */
      var agg = {};
      var d = null;
      try { d = JSON.parse(localStorage.getItem('bartenders-ledger-v1') || 'null'); } catch (e) { d = null; }
      if (d && d.cards) {
        Object.keys(d.cards).forEach(function (name) {
          var fam = famOf[name];
          if (!fam) return;                      /* shots, zero proof, My Bar */
          var s = d.cards[name];
          agg[fam] = agg[fam] || { name: fam, right: 0, answered: 0 };
          agg[fam].right += (s.r || 0);
          agg[fam].answered += (s.r || 0) + (s.w || 0);
        });
      }

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
