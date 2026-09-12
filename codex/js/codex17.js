/* ═══════════════════ CODEX XVII: FINISHING WHAT XV CLAIMED ═══════════════════

   codex15's header says this, in these words:

     "Every other store in that merge is idempotent by construction: days takes
      the max, srs takes the newer due date, hist dedupes on a composite key,
      flags and ach union, notes keep the first. Only the per question counters
      summed, and only sess."

   THAT SENTENCE WAS WRONG, and this file exists because of it. It surveyed
   codex4's stores and stopped there. codex8 wraps the same mergeStats and adds
   five more stores of its own, and THREE of them sum:

     ST.tast.n / ST.tast.c     lifetime tasting calls, and how many were right
     ST.grader[k].r / .w       how often you overrode the grader, either way
     ST.bad[k].n               how many times a question was reported

   So the round trip codex15 was written to fix is still unbounded for those
   three. A laptop to phone to laptop trip doubles them, then quadruples them,
   and the app tells the student "you have already merged this file here.
   Nothing changed" while it happens, because codex15's duplicate detector
   returns that sentence AFTER the sums have already run.

   ST.tast is the one that shows. codex8 prints it as a lifetime accuracy on
   the tasting screen, so the number a student is being taught to trust is the
   one that drifts.

   The repair is codex15's own shape, applied to the fields it missed: snapshot
   what was there, let the chain run, then write what the numbers should have
   been. Nothing here reimplements a merge, so codex4 and codex8 keep sole
   ownership of their own sanitising, and there is exactly one place each
   number can come from.

   AND TWO STORES THAT ARE NOT MERGED AT ALL. `exportPayload` serialises ST
   whole, so a progress file carries them and the import throws them away:

     ST.serv   the service rehearsal (codex11). codex12's own comment calls
               this "the ST.serv lesson: a store nobody merges silently
               vanishes on import", names it as the reason the cellar got a
               clause, and then leaves ST.serv itself unmerged.
     ST.path   the first week induction. It does not exist in this tree at all;
               it is the monorepo wing's, added with its own home screen. The
               clause is written to be harmless where the store is absent so
               that ONE file serves both trees, which is the whole reason the
               fork is survivable.

   House rules: a new layer, var/function only at the top level, no pictorial
   glyphs. Two things it could not do from out here and that are fixed at
   source instead, both bugs rather than features: codex15's stSave wrote the
   literal key 'codexStats' where every other read and write in the app goes
   through stKey(), and codex4's Import screen still promised behaviour that
   codex15 deliberately ended. */

/* ═══════════ the three that still summed ═══════════ */

/* The same question codex15 asks of a per-question record, asked of a pair of
   counters: which reading is real? The one holding more events, taken whole,
   so the pair on screen is a pair some device actually recorded. Ties go to
   what is already here, and that is what makes a repeat import a no-op. */
function v17FullerPair(a, b) {
  var ta = (Number(a[0]) || 0) + (Number(a[1]) || 0);
  var tb = (Number(b[0]) || 0) + (Number(b[1]) || 0);
  if (tb > ta) return [Number(b[0]) || 0, Number(b[1]) || 0];
  return [Number(a[0]) || 0, Number(a[1]) || 0];
}

var _v17MergeStats = mergeStats;
mergeStats = function (inc) {
  /* ---- snapshot, before anything in the chain runs ---- */
  var k;
  var beforeTast = { n: Number(ST.tast && ST.tast.n) || 0, c: Number(ST.tast && ST.tast.c) || 0 };

  var beforeGrader = Object.create(null);
  for (k in (ST.grader || {})) {
    if (!Object.prototype.hasOwnProperty.call(ST.grader, k)) continue;
    beforeGrader[k] = [Number(ST.grader[k].r) || 0, Number(ST.grader[k].w) || 0];
  }
  var beforeBad = Object.create(null);
  for (k in (ST.bad || {})) {
    if (!Object.prototype.hasOwnProperty.call(ST.bad, k)) continue;
    beforeBad[k] = Number(ST.bad[k].n) || 0;
  }

  var err = _v17MergeStats(inc);
  if (err) {
    /* codex15 returns its "already merged" sentence as a non-null value, and
       the chain HAS still run underneath it, sums included. So a returned
       string is not a reason to skip the repair: it is the exact case that
       needs it most. A real validation failure returns before any store was
       touched, and repairing a snapshot onto itself is a no-op either way. */
    v17Repair(inc, beforeTast, beforeGrader, beforeBad);
    return err;
  }
  v17Repair(inc, beforeTast, beforeGrader, beforeBad);
  return null;
};

function v17Repair(inc, beforeTast, beforeGrader, beforeBad) {
  var B = (inc && inc.stats) || {};
  var k, pair;

  /* tasting: one pair of lifetime counters */
  if (B.tast && typeof B.tast === 'object' && ST.tast) {
    pair = v17FullerPair([beforeTast.n, beforeTast.c],
      [Number(B.tast.n) || 0, Number(B.tast.c) || 0]);
    ST.tast.n = pair[0];
    ST.tast.c = pair[1];
  }

  /* grader overrides: a pair per question */
  var incG = (B.grader && typeof B.grader === 'object') ? B.grader : {};
  for (k in (ST.grader || {})) {
    if (!Object.prototype.hasOwnProperty.call(ST.grader, k)) continue;
    var wasG = beforeGrader[k], rawG = incG[k];
    /* a key this device did not have was written straight by codex8, not summed */
    if (!wasG || !rawG || typeof rawG !== 'object') continue;
    pair = v17FullerPair(wasG, [Number(rawG.r) || 0, Number(rawG.w) || 0]);
    ST.grader[k].r = pair[0];
    ST.grader[k].w = pair[1];
  }

  /* reports: a single count per question */
  var incB = (B.bad && typeof B.bad === 'object') ? B.bad : {};
  for (k in (ST.bad || {})) {
    if (!Object.prototype.hasOwnProperty.call(ST.bad, k)) continue;
    var wasB = beforeBad[k], rawB = incB[k];
    if (wasB === undefined || !rawB || typeof rawB !== 'object') continue;
    ST.bad[k].n = Math.max(wasB, Number(rawB.n) || 0);
  }

  /* ═══════════ the two that were never merged ═══════════ */

  /* THE SERVICE REHEARSAL. One record for the whole rehearsal, stamped with
     the day it was saved, so the newer stamp wins whole. Taking it field by
     field would blend two different run-throughs into a third that nobody
     performed, which is the same mistake as a max of c and w independently. */
  if (B.serv && typeof B.serv === 'object' && !Array.isArray(B.serv)) {
    var mine = (ST.serv && typeof ST.serv === 'object') ? ST.serv : null;
    var theirTs = String(B.serv.ts || '');
    var myTs = String((mine && mine.ts) || '');
    if (B.serv.svc && typeof B.serv.svc === 'object' && theirTs > myTs) {
      try {
        ST.serv = { svc: JSON.parse(JSON.stringify(B.serv.svc)), ts: theirTs.slice(0, 10) };
      } catch (e) { /* a tampered file leaves the local rehearsal alone */ }
    }
  }

  /* THE FIRST WEEK. A set of steps, each stamped when it was finished, so the
     union is the honest answer and the EARLIER stamp wins: the step was
     finished the first time it was finished. Guarded on the store existing,
     because it is the wing's and not this tree's, and one file has to serve
     both. */
  if (B.path && typeof B.path === 'object' && !Array.isArray(B.path)) {
    ST.path = (ST.path && typeof ST.path === 'object') ? ST.path : {};
    Object.keys(B.path).forEach(function (id) {
      if (!/^[a-z0-9_-]{1,40}$/.test(id)) return;
      var t = Number(B.path[id]);
      if (!isFinite(t) || t <= 0) return;
      ST.path[id] = ST.path[id] ? Math.min(ST.path[id], t) : t;
    });
  }

  stSave();
}

/* A store this layer adds to ST_DEFAULTS would be taken by "Reset all
   statistics", and neither of these should be: the rehearsal and the induction
   are things a person DID, not statistics about how well they did. codex12
   made the same call for the wine list and wrote down why. Nothing is
   registered here on purpose, and the merge clauses above are what the
   registration would otherwise have guaranteed. */

/* ═══════════ two dead ends behind the producer drill ═══════════

   codex16 builds its questions at click time, which is what keeps them out of
   the banks. Two pieces of machinery further down assume the opposite: that
   every question a person answers can be found again in QUESTIONS.

   THE ROTATION THAT NOTHING CAN COME OUT OF. codex3 hooks statRecord to call
   srsRecord for every answered question, so each producer call wrote an
   ST.srs record keyed pr-<id>-<facet>. dueList() builds its pool by filtering
   QUESTIONS, which never holds a runtime question, so not one of those records
   could ever be served. They sat in the store, and the Progress Transfer
   screen counted them as "In rotation", which made the figure a student reads
   to decide what to study tonight climb by four every time they opened a
   producer. keyOwned already decided that a producer call is study and not a
   rank's bank; this is the same decision applied to the same keys.

   THE BOOKMARK THAT DOES NOTHING. codex2 offers Bookmark on every question and
   stores qKey(q) in ST.flags, and the Bookmarks tile drills them by looking
   them up in the bank. A bookmarked producer question is therefore saved and
   then never found: the tile's count goes up and the drill it opens is short
   by exactly that many. Better to not offer it than to offer it broken, so the
   button is removed for a producer question and left alone everywhere else. */
function v17IsRuntimeKey(k) {
  var bare = String(k).indexOf('|') > -1 ? String(k).slice(String(k).indexOf('|') + 1) : String(k);
  return bare.indexOf('pr-') === 0;
}

var _v17SrsRecord = (typeof srsRecord === 'function') ? srsRecord : null;
if (_v17SrsRecord) {
  srsRecord = function (q, ok) {
    try { if (q && v17IsRuntimeKey(qKey(q))) return; } catch (e) { }
    return _v17SrsRecord(q, ok);
  };
}

/* Anything already written by the versions that shipped before this file is
   swept once, so a record that has been drilling producers does not carry a
   permanently inflated "In rotation" figure. */
(function () {
  if (!ST || !ST.srs) return;
  var gone = 0;
  Object.keys(ST.srs).forEach(function (k) {
    if (v17IsRuntimeKey(k)) { delete ST.srs[k]; gone++; }
  });
  if (gone) { try { stSave(); } catch (e) { } }
})();

var _v17DecorateQuiz = decorateQuiz;
decorateQuiz = function () {
  _v17DecorateQuiz();
  try {
    var q = S.pool && S.pool[S.idx];
    if (!q || !v17IsRuntimeKey(qKey(q))) return;
    var b = document.querySelector('#card .qmeta .flagbtn');
    if (b && b.parentNode) b.parentNode.removeChild(b);
  } catch (e) { /* a missing bookmark button is not worth breaking a quiz over */ }
};
