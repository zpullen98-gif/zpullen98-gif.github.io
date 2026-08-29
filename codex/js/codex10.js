/* ============ Codex X: stable question identity ============
   Until now a question's primary key was the first 80 characters of its stem.
   That key is written into six stores: ST.q, ST.srs, ST.flags, ST.notes,
   ST.grader, ST.bad, so editing a stem silently orphaned every scrap of
   progress attached to it, and the banks carried a standing rule never to
   reword an existing question.

   Every bank entry now carries a minted `id` (`c-`/`i-`/`a-`/`m-` plus eight
   base36 characters, frozen at mint time and never recomputed: see
   .scripts/mint-ids.py). core.js's missKey prefers it; the text slice remains
   only as the legacy path for an object that predates minting.

   The ids deliberately contain no '|', because codex7's keyOwned() and codex8's
   keyLevel() still read the level from the prefix: certified keys stay
   unprefixed, exactly as before, so the level namespacing is untouched.

   This layer carries the one-time rekey. Everything downstream of it may now
   edit question text freely. */

/* Registered in codex8's canonical schema so the reset button preserves the
   field rather than dropping it (the rule in CLAUDE.md: any new store must be
   in ST_DEFAULTS). Reset clearing it is harmless: a cleared ledger has nothing
   left to migrate. */
if(typeof ST_DEFAULTS!=='undefined') ST_DEFAULTS.mig={};
ST.mig=ST.mig||{};

/* Every store whose keys are question keys. ST.flags is an array; the rest are
   objects keyed by qKey. ST.hist/days/best/ach/tast/court/exam/paceDays are not
   question-keyed and are left alone. */
var QID_STORES=['q','srs','notes','grader','bad'];

/* old (text-slice) key -> new (id) key, for every question in every bank.
   Object.create(null) because the old keys are raw question text and a stem
   reading 'constructor' would otherwise resolve against Object.prototype. */
function qidKeyMap(){
  var map=Object.create(null);
  (typeof LEVEL_ORDER!=='undefined'?LEVEL_ORDER:[]).forEach(function(lv){
    var L=LEVELS[lv]; if(!L||!L.bank)return;
    var pre=(lv==='certified'?'':lv+'|');
    L.bank.forEach(function(q){
      if(!q||!q.id)return;
      var oldK=pre+String(q.q||'').slice(0,80), newK=pre+q.id;
      if(oldK!==newK)map[oldK]=newK;
    });
  });
  return map;
}

/* Rewrite the question-keyed stores of any stats-shaped object in place.
   Non-destructive: a legacy key with no counterpart in the banks (a question
   since removed, or a stem edited before ids existed) is left exactly where it
   is rather than dropped. A key that is already an id simply isn't in the map. */
function qidRekeyStores(st){
  if(!st)return {moved:0,orphan:0};
  var map=qidKeyMap(), moved=0, orphan=0;

  QID_STORES.forEach(function(name){
    var store=st[name];
    if(!store||typeof store!=='object'||Array.isArray(store))return;
    var out={};
    Object.keys(store).forEach(function(k){
      var nk=map[k];
      if(nk&&!Object.prototype.hasOwnProperty.call(out,nk)&&
             !Object.prototype.hasOwnProperty.call(store,nk)){
        out[nk]=store[k]; moved++;
      }else{
        out[k]=store[k];
        if(!nk)orphan++;
      }
    });
    st[name]=out;
  });

  if(Array.isArray(st.flags)){
    var seen=new Set(), nf=[];
    st.flags.forEach(function(k){
      var nk=map[k]||k;
      if(seen.has(nk))return;
      seen.add(nk); nf.push(nk);
      if(map[k])moved++; else orphan++;
    });
    st.flags=nf;
  }
  return {moved:moved,orphan:orphan};
}

/* One-time and idempotent for the live store. */
function qidRekey(force){
  if(ST.mig.qid&&!force)return null;
  var r=qidRekeyStores(ST);
  ST.mig.qid=1;
  stSave();
  return r;
}

/* ---- imports carry their own generation ----
   codex4's mergeStats merges by raw key, so a progress file exported from an
   install that predates ids arrives full of stem-slice keys. The live store has
   already migrated, so nothing would ever rekey them and the imported progress
   would be silently invisible. Rekey the incoming payload *before* the merge, so
   the existing per-store merge logic still does the summing; rekeying after the
   merge would instead strand the imported counts behind keys that already exist. */
var _v10MergeStats=mergeStats;
mergeStats=function(inc){
  if(inc&&inc.stats)qidRekeyStores(inc.stats);
  return _v10MergeStats(inc);
};

/* Console helper for content work: what still has no id, and which stored keys
   no longer resolve to a question. Run qidAudit() before and after editing a
   bank to prove no progress was orphaned. */
function qidAudit(){
  var missing=[], ids=Object.create(null), dupes=[], known=Object.create(null);
  (typeof LEVEL_ORDER!=='undefined'?LEVEL_ORDER:[]).forEach(function(lv){
    var L=LEVELS[lv]; if(!L||!L.bank)return;
    var pre=(lv==='certified'?'':lv+'|');
    L.bank.forEach(function(q){
      if(!q.id){missing.push(lv+' :: '+String(q.q||'').slice(0,60));return;}
      if(ids[q.id])dupes.push(q.id); else ids[q.id]=1;
      known[pre+q.id]=1;
    });
  });
  var orphans={};
  QID_STORES.concat(['flags']).forEach(function(name){
    var store=ST[name]; if(!store)return;
    var keys=Array.isArray(store)?store:Object.keys(store);
    var bad=keys.filter(function(k){return !known[k];});
    if(bad.length)orphans[name]=bad;
  });
  var out={questions:Object.keys(ids).length,missingId:missing,duplicateIds:dupes,
           migrated:!!ST.mig.qid,orphanedKeys:orphans};
  try{console.log('[qidAudit]',JSON.stringify({questions:out.questions,
    missingId:missing.length,duplicateIds:dupes.length,migrated:out.migrated,
    orphaned:Object.keys(orphans).map(function(k){return k+':'+orphans[k].length;}).join(' ')||'none'}));}catch(e){}
  return out;
}

(function(){
  var r=qidRekey();
  if(r&&(r.moved||r.orphan)){
    try{console.log('[codex10] rekeyed '+r.moved+' stored entries to question ids'
      +(r.orphan?', '+r.orphan+' legacy keys left in place':''));}catch(e){}
  }
})();
