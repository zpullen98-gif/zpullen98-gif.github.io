/* ============ Codex XV: the record has to survive the week ============

   Two ways a study record was being lost, both silent, both in the layer that
   exists to keep it. The HANDOFF has carried them under "Durability" since the
   content work finished; this is that entry.

   ONE. stSave swallowed every failure.

     function stSave(){try{localStorage.setItem(...)}catch(e){}}

   Once localStorage is full, or the browser is in a mode that refuses it, that
   catch runs on every answer for the rest of the session and the student is
   told nothing. They sit a mock exam, close the tab, and the evening is gone.
   The empty catch was written so a storage failure could not break a drill mid
   question, which is right; what it did NOT do was say so afterwards.

   So the write still never throws, and now it reports. The first failure raises
   a banner that stays up, because a toast that fades is exactly the wrong shape
   for "nothing you do from here is being kept": it appears while the student is
   reading a question and is gone before they look up. The banner offers the
   export, which is the one action that actually rescues the session, and it
   goes away by itself the moment a save succeeds again.

   TWO. mergeStats added counts, so moving between two devices inflated them.

   Every other store CODEX4 merges is idempotent by construction: days takes
   the max, srs takes the newer due date, hist dedupes on a composite key,
   flags and ach union, notes keep the first. Of codex4's, only the per
   question counters summed, and only sess.

   THAT SURVEY WAS INCOMPLETE and this paragraph is the correction. codex8
   wraps the same mergeStats and adds stores of its own, and three of those
   sum too: ST.tast, ST.grader[k].r/.w and ST.bad[k].n. They are repaired in
   codex17, in the shape this file established. Read that file next. So the merge as a whole was ALMOST re-runnable, and the two that
   were not made a laptop to phone to laptop round trip count the same answers
   twice, then four times, then eight.

   The counts are not decoration. codex2's startWeakness ranks what to drill by
   w/(c+w), and the Progress Transfer screen prints the total as "Answers
   logged". Doubling both halves leaves the ratio alone but makes the totals
   fiction, and the drift is unbounded.

   The fix is to make those two behave like everything else around them. For a
   question, the record with MORE ANSWERS IN IT wins, taken whole. Not a max of
   c and of w independently: that can mint a pair neither device ever saw (10/0
   here, 0/5 there, and the student is shown 10/5). Taking the fuller record
   whole always shows a real reading from a real device.

   What that costs, stated plainly: two devices that studied the SAME question
   apart, and only then synced, keep the busier device's count instead of the
   sum. The student is under credited rather than over credited, which is the
   safe direction for a study app, and it is the same trade days has always
   made. The alternative that loses nothing is a per device ledger on every
   question, and that is a schema change to the hottest record in the app for a
   case that needs two devices, the same question and no sync in between.

   With those two changed, THE WHOLE MERGE IS IDEMPOTENT, which is a property
   worth having a name for: importing the same file twice is now the same as
   importing it once. The export id below is therefore not what makes the merge
   safe. It is there to say something true and useful when it happens, because
   "you have already merged this file" is a better answer than doing nothing
   and looking broken. */

/* ---- one: a save that fails says so ------------------------------------- */

/* In memory only, and deliberately. It is a fact about THIS session, and the
   one thing we know for certain is that we cannot write it down. */
var ST_SAVE_BROKEN = null;

var _v15StSave = stSave;
stSave = function(){
  try{
    /* stKey(), not the literal. codex2 routes every read and write through
       it, and the two agree only while PERSONAL is true. The moment it is
       not, the app would load from codexStats::<id> and save to codexStats,
       so every answer goes to a key nothing reads and the record appears to
       reset on reload. */
    localStorage.setItem(typeof stKey === 'function' ? stKey() : 'codexStats', JSON.stringify(ST));
    if(ST_SAVE_BROKEN){ ST_SAVE_BROKEN = null; v15Banner(); }
  }catch(e){
    /* QuotaExceededError is the one worth naming, because the student can act
       on it. Everything else (a private window, storage disabled by policy)
       gets the honest general answer. */
    var quota = e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22);
    if(!ST_SAVE_BROKEN){
      ST_SAVE_BROKEN = quota
        ? 'This browser has run out of room for your study record, so nothing you answer from now on is being saved.'
        : 'This browser is refusing to store your study record, so nothing you answer from now on is being saved.';
      v15Banner();
    }
  }
};

/* A banner rather than a toast, and it lives outside the view so a render
   cannot take it away. Rebuilt on every state change so it cannot go stale. */
function v15Banner(){
  var id = 'v15-save-banner';
  var old = document.getElementById(id);
  if(old) old.remove();
  if(!ST_SAVE_BROKEN) return;
  var b = document.createElement('div');
  b.id = id;
  b.setAttribute('role', 'alert');
  b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;padding:12px 16px;'
    + 'background:#5a1720;color:#fbeee0;font-size:.92rem;line-height:1.45;'
    + 'display:flex;gap:12px;align-items:center;flex-wrap:wrap;box-shadow:0 -2px 14px rgba(0,0,0,.4)';
  var msg = document.createElement('span');
  msg.style.cssText = 'flex:1;min-width:220px';
  msg.textContent = ST_SAVE_BROKEN + ' Everything up to now is safe. Take a copy before you close this tab.';
  var go = document.createElement('button');
  go.textContent = 'Export my progress';
  go.style.cssText = 'background:#c9a227;color:#241206;border:0;border-radius:4px;padding:8px 14px;'
    + 'font:inherit;font-weight:600;cursor:pointer';
  go.onclick = function(){
    /* straight to the screen that can rescue it, in the app's own way */
    try{ S.view = 'sync'; render(); }catch(e){}
  };
  b.appendChild(msg); b.appendChild(go);
  document.body.appendChild(b);
}

/* ---- two: the merge becomes idempotent ---------------------------------- */

/* Wrapping rather than reimplementing, so codex4 keeps sole ownership of the
   sanitising. The original sums, so snapshot what the two summed fields held
   BEFORE, let it run, then write what they should have been. The incoming
   values are read from the payload the original just used, which is why this
   cannot drift out of step with it: there is only one place either number
   comes from. */
var _v15MergeStats = mergeStats;
mergeStats = function(inc){
  var beforeQ = Object.create(null), k;
  for(k in ST.q){
    if(!Object.prototype.hasOwnProperty.call(ST.q, k)) continue;
    beforeQ[k] = { c: Number(ST.q[k].c) || 0, w: Number(ST.q[k].w) || 0 };
  }
  var beforeSess = Number(ST.sess) || 0;

  /* the export id, checked before the original runs so a duplicate costs
     nothing at all */
  var seenId = null;
  if(inc && typeof inc.exportId === 'string' && /^[a-z0-9-]{6,64}$/.test(inc.exportId)) seenId = inc.exportId;
  ST.merged = Array.isArray(ST.merged) ? ST.merged : [];
  var already = seenId && ST.merged.indexOf(seenId) >= 0;

  var err = _v15MergeStats(inc);
  if(err) return err;

  /* repair the two fields that summed */
  var B = (inc && inc.stats) || {};
  var incQ = (B.q && typeof B.q === 'object') ? B.q : {};
  for(k in ST.q){
    if(!Object.prototype.hasOwnProperty.call(ST.q, k)) continue;
    var was = beforeQ[k];
    var raw = incQ[k];
    if(!was || !raw || typeof raw !== 'object') continue;   /* new key: the original wrote it straight */
    var inc_c = Number(raw.c) || 0, inc_w = Number(raw.w) || 0;
    var win = v15FullerRecord(was, { c: inc_c, w: inc_w });
    ST.q[k].c = win.c;
    ST.q[k].w = win.w;
    /* s is a streak, and the original already takes the max of the two, which
       is the right answer for it and is left alone */
  }
  ST.sess = Math.max(beforeSess, Number(B.sess) || 0);

  if(seenId && !already){ ST.merged.push(seenId); ST.merged = ST.merged.slice(-50); }
  /* the WRAPPED save, so a storage failure during a merge raises the banner
     like any other. The original mergeStats saved before these repairs. */
  stSave();

  /* The return value is the sentence the Progress Transfer screen prints, and
     a non-null one also keeps the student on that screen instead of bouncing
     them to the dashboard. Both are right here: nothing went wrong, nothing
     changed either, and saying so beats a cheerful 'Merged' that did nothing. */
  if(already) return 'You have already merged this file here. Nothing changed, which is the correct outcome.';
  return null;
};

/* Which of two readings of the same question is the real one? The one that
   holds more answers, taken whole, so the pair on screen is always a pair some
   device actually recorded. Ties go to the higher correct count, and then to
   what is already here, which is what makes this idempotent. */
function v15FullerRecord(a, b){
  var ta = a.c + a.w, tb = b.c + b.w;
  if(tb > ta) return b;
  if(ta > tb) return a;
  return b.c > a.c ? b : a;
}

/* ---- the export carries an id ------------------------------------------- */

var _v15ExportPayload = exportPayload;
exportPayload = function(){
  var raw = _v15ExportPayload();
  var o;
  try{ o = JSON.parse(raw); }catch(e){ return raw; }
  o.exportId = v15Id();
  return JSON.stringify(o);
};

/* Not crypto, and it does not need to be: this only has to be unlikely to
   collide with the handful of files one person moves between their own
   devices. crypto.randomUUID where it exists, because it is free. */
function v15Id(){
  try{ if(window.crypto && crypto.randomUUID) return crypto.randomUUID(); }catch(e){}
  var s = '';
  while(s.length < 24) s += Math.floor(Math.random() * 36).toString(36);
  return s;
}

/* Whether this payload has been merged here before, for the screen to say so
   rather than for the merge to depend on it. */
function v15AlreadyMerged(inc){
  if(!inc || typeof inc.exportId !== 'string') return false;
  return Array.isArray(ST.merged) && ST.merged.indexOf(inc.exportId) >= 0;
}
