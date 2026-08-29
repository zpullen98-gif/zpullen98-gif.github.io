/* ============ Codex IX: list-aware short-answer grading ============
   `matchSA` returns a boolean on the first accept-hit, so a question asking for
   all nine grands crus of Gevrey-Chambertin awards full marks for typing "Clos
   de Bèze", and under the Advanced clock the score-optimal move becomes typing
   the shortest accepted token, which is precisely the habit that loses marks on
   the real paper. This layer grades enumerations item by item instead: how many
   of the set did you actually produce, and which ones did you miss.

   Detection is precision-first and derived from data already in the banks: the
   stem states a count, the model answer parses into that many discrete items.
   Anything it cannot read confidently falls through to `matchSA` untouched.
   A question may also declare the shape outright: {list:1, items:[...], need:n}. */

var LIST_WORDNUM={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,
  ten:10,eleven:11,twelve:12,thirteen:13};
/* a second ask bolted on to the first is not a single enumeration */
var LIST_COMPOUND=/\band\s+(?:name|give|list|recite|state|one|two|three|four|five|their|its|a\b|an\b|what|why|how|the\s+\w+\b)/i;

/* split on delimiters that sit outside parentheses, so "Socalcos (narrow, walled)"
   survives as one item */
function listSplitTop(s){
  var out=[],buf='',depth=0;
  for(var i=0;i<s.length;i++){
    var ch=s.charAt(i);
    if(ch==='(')depth++;
    else if(ch===')')depth=Math.max(0,depth-1);
    if(depth===0&&(ch===','||ch===';'||ch==='·')){out.push(buf);buf='';continue;}
    buf+=ch;
  }
  out.push(buf);
  return out.map(function(x){return x.trim();}).filter(Boolean);
}
function listParseItems(ans){
  if(typeof ans!=='string')return null;
  var s=ans.trim().replace(/^e\.?g\.?,?\s*/i,'');
  if(s.indexOf(':')>=0)return null;                 /* a definition, not a list */
  var extras=[];
  s=s.replace(/\((?:also|plus|and|with|incl\.?|including)\s+([^)]*)\)/gi,function(_,inner){extras.push(inner);return ' ';});
  var parts=[];
  listSplitTop(s).forEach(function(p){
    /* "koji and yeast" is two items; "Bouchard Père et Fils" is not */
    if(/\s+and\s+/i.test(p)&&p.split(/\s+and\s+/i).every(function(x){return x.trim().split(/\s+/).length<=3;}))
      parts=parts.concat(p.split(/\s+and\s+/i));
    else parts.push(p);
  });
  extras.forEach(function(e){parts=parts.concat(listSplitTop(e));});
  var out=[],seen={};
  for(var i=0;i<parts.length;i++){
    var p=parts[i].replace(/^(?:and|or|also|plus)\s+/i,'').replace(/\.$/,'').trim();
    if(!p)continue;
    if(/^(?:etc|e\.?g\.?|and so on|among others|the rest|others)$/i.test(p))continue;
    if(p.length>40)return null;                     /* a clause, not an item */
    if(p.split(/\s+/).length>6)return null;
    var n=norm(p.replace(/\([^)]*\)/g,''));
    if(!n||n.length<3)continue;
    if(seen[n])continue;
    seen[n]=1; out.push(p.replace(/\s+/g,' '));
  }
  if(!out.length)return null;
  /* Some answers abbreviate a shared family name: "Chambertin, Chapelle-,
     Charmes-, ... Ruchottes-Chambertin". Restore it so the missed-items line
     reads as a sommelier would say it. */
  var family=null;
  out.forEach(function(x){
    var m=x.match(/[-–]\s*([A-Z][\wÀ-ÿ'’-]+)$/);
    if(m&&!family)family=m[1];
  });
  if(family)out=out.map(function(x){return /[-–]$/.test(x)?x.replace(/[-–]\s*$/,'-'+family):x;});
  return out;
}
function listParseNeed(stem,itemCount){
  var t=stem.toLowerCase(),m;
  if(LIST_COMPOUND.test(t))return null;
  m=t.match(/\(?\bany\s+(\w+)\)?/);            if(m&&LIST_WORDNUM[m[1]])return LIST_WORDNUM[m[1]];
  m=t.match(/\b(?:name|give|recite|list|state|identify)\s+(?:all\s+)?(?:the\s+)?(\w+)/);
                                               if(m&&LIST_WORDNUM[m[1]])return LIST_WORDNUM[m[1]];
  m=t.match(/\ball\s+(\w+)\b/);                 if(m&&LIST_WORDNUM[m[1]])return LIST_WORDNUM[m[1]];
  if(/\b(?:name|recite|list|give)\s+(?:all|every|each)\b/.test(t))return -1;
  /* a bare number word, trusted only when it agrees exactly with the item count */
  for(var w in LIST_WORDNUM){
    if(new RegExp('\\b'+w+'\\b').test(t)&&LIST_WORDNUM[w]===itemCount&&itemCount>=3)return itemCount;
  }
  return null;
}
/* cached on the question object; in-memory only, never persisted */
function saListSpec(q){
  if(!q||q._ls!==undefined)return q?q._ls:null;
  var sp=null;
  if(q.list&&q.items&&q.items.length>1){
    sp={items:q.items.slice(),need:q.need||q.items.length,declared:true};
  } else if(q.sa&&!q.mt&&!q.sel){
    var items=listParseItems(q.ans);
    if(items&&items.length>1){
      var need=listParseNeed(q.q,items.length);
      if(need!==null){
        if(need===-1)need=items.length;
        /* stem demands more than the answer holds, a content bug; do not grade */
        if(need>=1&&need<=items.length)sp={items:items,need:need};
      }
    }
  }
  try{Object.defineProperty(q,'_ls',{value:sp,enumerable:false,writable:true});}catch(e){q._ls=sp;}
  return sp;
}
/* the forms in which one item may legitimately be given */
function listAlts(it,all){
  var base=it.replace(/\([^)]*\)/g,'').trim(), list=[base];
  (it.match(/\(([^)]*)\)/g)||[]).forEach(function(z){list.push(z.slice(1,-1));});
  /* a hyphenated proper name may be given by its head alone (Ruchottes-Chambertin
     -> "Ruchottes"), but only where that head is not itself another item */
  var head=base.split(/[-–]/)[0].trim();
  if(head&&head.length>=5&&head!==base){
    var hn=norm(head), clash=all.some(function(o){return o!==it&&norm(o.replace(/\([^)]*\)/g,''))===hn;});
    if(!clash)list.push(head);
  }
  return list.map(norm).filter(function(z){return z&&z.length>=3;});
}
/* Grade against what the candidate actually typed as separate entries.
   `norm` strips punctuation, so "Chambertin, Clos de Bèze" would otherwise read
   as the single cru Chambertin-Clos de Bèze. Split on the delimiters first, then
   match item to entry: exact matches claimed before loose ones, and each entry
   spent only once so one word cannot satisfy two crus. */
function gradeList(sp,text){
  var raw=String(text||'');
  var toks=raw.split(/[,;\n·\/]+|\s+\band\b\s+/i)
    .map(function(t){return norm(t);}).filter(Boolean);
  var order=sp.items.slice().sort(function(x,y){return norm(y).length-norm(x).length;});
  var hit=[],missed=[];

  if(toks.length>1){
    var used={}, claimed={};
    /* pass one: an entry that IS the item (or one of its accepted forms) */
    order.forEach(function(it){
      var alts=listAlts(it,sp.items);
      for(var t=0;t<toks.length;t++){
        if(used[t])continue;
        for(var k=0;k<alts.length;k++){
          if(toks[t]===alts[k]||(' '+toks[t]+' ').indexOf(' '+alts[k]+' ')>=0){
            used[t]=1; claimed[it]=1; return;
          }
        }
      }
    });
    /* pass two: an entry that is a distinctive part of the item, or contains it */
    order.forEach(function(it){
      if(claimed[it])return;
      var alts=listAlts(it,sp.items);
      for(var t=0;t<toks.length;t++){
        if(used[t])continue;
        for(var k=0;k<alts.length;k++){
          var n=alts[k], tk=toks[t];
          if((tk.length>=5&&n.indexOf(tk)>=0)||(n.length>=6&&tk.indexOf(n)>=0)){
            used[t]=1; claimed[it]=1; return;
          }
        }
      }
    });
    sp.items.forEach(function(it){ (claimed[it]?hit:missed).push(it); });
  } else {
    /* one unbroken phrase: consume the span each item matched */
    var a=' '+norm(raw)+' ';
    order.forEach(function(it){
      var found=false, alts=listAlts(it,sp.items);
      for(var k=0;k<alts.length&&!found;k++){
        var n=alts[k], i=a.indexOf(' '+n+' ');
        if(i>=0){ a=a.slice(0,i+1)+new Array(n.length+1).join(' ')+a.slice(i+1+n.length); found=true; break; }
        if(n.length>=6){ i=a.indexOf(n);
          if(i>=0){ a=a.slice(0,i)+new Array(n.length+1).join(' ')+a.slice(i+n.length); found=true; } }
      }
      (found?hit:missed).push(it);
    });
    var ord0=function(x){return sp.items.indexOf(x);};
    hit.sort(function(x,y){return ord0(x)-ord0(y);});
    missed.sort(function(x,y){return ord0(x)-ord0(y);});
  }
  return {hit:hit,missed:missed,n:hit.length,need:sp.need,total:sp.items.length,ok:hit.length>=sp.need};
}

/* ---- grade the submission ----
   Replaces core's submitSA rather than wrapping it: the verdict has to be
   decided before statRecord runs, and core computes it inline. */
submitSA=function(){
  if(S.answered)return;
  var q=S.pool[S.idx];
  var txt=(document.getElementById('sa')||{}).value||'';
  S.saText=txt; S.answered=true;
  var sp=saListSpec(q), ok;
  if(sp){ S.saList=gradeList(sp,txt); ok=S.saList.ok; }
  else  { S.saList=null; ok=matchSA(q,txt); }
  S.saGraded=ok; if(ok)S.correct++;
  if(ok){ if(S.mode==='review')missRemove(q); }
  else  { missAdd(q); if(S.mode==='sudden')S.suddenDead=true; }
  statRecord(q,ok);
  S.results.push({q:q,ok:ok,user:txt||'(blank)'});
  render();
};
var _v8ResetQ=resetQ;
resetQ=function(){ S.saList=null; _v8ResetQ(); };

/* ---- show the tally, and name what was missed ---- */
var _v8RevealBlock=revealBlock;
revealBlock=function(q,ok,isSA){
  var wrap=_v8RevealBlock(q,ok,isSA);
  var g=S.saList;
  if(!isSA||!g||!saListSpec(q))return wrap;

  /* the accept blob is noise once every item is listed individually */
  var acc=wrap.querySelector('.acceptbox');
  if(acc)acc.remove();

  var v=wrap.querySelector('.verdict');
  if(v){
    var full=(g.n>=g.total);
    v.className='verdict '+(g.ok?'ok':(g.n?'unsure':'no'));
    v.textContent=g.ok
      ? (full?'All '+g.total+' named':'Correct: '+g.n+' of '+g.need+' needed')
      : (g.n?g.n+' of '+g.need+': not enough':'None of the '+g.need+' named');
  }
  var rows='';
  if(g.hit.length)rows+='<div class="lgrow lghit"><b>You named</b><span>'+g.hit.join(' · ')+'</span></div>';
  if(g.missed.length)rows+='<div class="lgrow lgmiss"><b>You missed</b><span>'+g.missed.join(' · ')+'</span></div>';
  var box=el('<div class="listgrade"><div class="lgscore">'+g.n+' of '+g.total
    +(g.need<g.total?' <em>('+g.need+' required)</em>':'')+'</div>'+rows+'</div>');
  var line=wrap.querySelector('.exp');
  if(line)wrap.insertBefore(box,line); else wrap.appendChild(box);
  return wrap;
};

/* ---- the Gauntlet is spoken, so score it against the same set by honour ---- */
var _v8RevealBlock2=revealBlock;
revealBlock=function(q,ok,isSA){
  var wrap=_v8RevealBlock2(q,ok,isSA);
  if(!oralActive()||!S._oralUngraded)return wrap;
  var sp=saListSpec(q);
  if(!sp)return wrap;
  var box=wrap.querySelector('.listgrade');
  if(box)box.remove();                       /* nothing was typed to compare */
  var line=wrap.querySelector('.exp');
  var chk=el('<div class="listgrade"><div class="lgscore">Did you name '+sp.need
    +' of these '+sp.items.length+'?</div><div class="lgrow"><span>'+sp.items.join(' · ')+'</span></div></div>');
  if(line)wrap.insertBefore(chk,line); else wrap.appendChild(chk);
  return wrap;
};
