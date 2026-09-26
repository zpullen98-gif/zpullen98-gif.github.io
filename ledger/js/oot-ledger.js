/* ============ The Ledger's half of the shared layer ============
   Kept out of the wing's own files so the wing stays readable and so this can
   be deleted in one piece if the shared layer ever goes away.

   NOBODY IS NAMED IN THIS WING. The profile row and the manager strip came out
   on the owner's call: they belong to a manager mode that has not been built,
   and asking a bartender who they are before the app will keep their work is a
   toll gate with nothing behind it. The Ledger keeps one record per device
   again, exactly as it did before names.

   The first week (the induction checklist and its click handler, with
   js/data-firstpath.js) went with the four levels on 26 September 2026: the
   home is the four levels and four doors and nothing else, and Level I is
   the first week now. progress.path stays in the backup as data, with its
   merge clause, so a restore from before keeps what it held.

   1. What this bar is weakest at, published for The Pass. A wing figure, never
      a person's, read from the device's one ledger.

   2. The cross-wing streak, wired but dormant: with no profile to mark it does
      nothing, and it is the seam that lights up when manager mode arrives.

   Loaded last, after the wing's own scripts, so every global it wraps exists.
   ============ */

(function () {
  'use strict';

  if (!window.OOT || !OOT.profiles) return;

  /* ---- 1. the shared streak (dormant) ---------------------------------
     Nobody can be named in this wing now, so markStudied has no profile to
     mark and does nothing. It is left wired rather than deleted because the
     day manager mode arrives this is the seam that lights up, and a streak
     that silently stopped counting is worse than one that never started.
     recordSessionComplete is the Ledger's own once-a-night writer and already
     handles its own streak. This adds the cross-wing one beside it rather than
     replacing it: the Ledger's `hands` streak means something this file has no
     business flattening.

     Also hooked to every graded card, because a bartender who drilled twenty
     cards and did not finish a whole session has still studied today.
     gradeCardKey is the one door every card answer goes through since the four
     levels (the deck's recordCard calls it by name, and so does the level
     test), so wrapping it here covers both. */
  if (typeof recordSessionComplete === 'function') {
    var _rsc = recordSessionComplete;
    recordSessionComplete = function () {
      try { OOT.profiles.markStudied(); OOT.profiles.touch(); } catch (e) {}
      return _rsc.apply(this, arguments);
    };
  }

  if (typeof gradeCardKey === 'function') {
    var _gk = gradeCardKey;
    gradeCardKey = function () {
      try { OOT.profiles.markStudied(); OOT.profiles.touch(); } catch (e) {}
      return _gk.apply(this, arguments);
    };
  }

  /* ---- 2. what the team is weakest at ---------------------------------
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
