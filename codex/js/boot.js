/* ============ Boot: first paint + service worker ============ */
/* Core called render() before the later layers loaded their wrappers and
   home-tile decorations; render again now that every layer is in place. */
render();

/* ---- service worker + update toast ---- */
(function(){
  if(!('serviceWorker' in navigator))return;
  if(location.search.indexOf('nosw')>=0)return;
  /* RELOAD ONLY WHEN THIS PAGE'S OWN USER ASKED FOR THE NEW EDITION. sw.js
     claims the page in activate, so controllerchange fires in three cases
     that are not that: the very first install on a device with no previous
     worker (which reloaded the page out from under somebody four seconds into
     reading it); an arrival from the hub, whose root worker already controls
     this page, so the Codex worker's first claim is a real controller switch
     and a had-a-controller guard still reloaded; and a second Codex tab
     tapping its toast, which claims this tab too and would have dropped a
     live mock sitting here. Tapping the toast below is the one signal that
     this page wants a reload. The Ledger gates it the same way. */
  var swWantReload=false;
  window.addEventListener('load',function(){
    navigator.serviceWorker.register('sw.js').then(function(reg){
      if(reg.waiting&&navigator.serviceWorker.controller){offerUpdate(reg.waiting,reg);}
      reg.addEventListener('updatefound',function(){
        const nw=reg.installing;
        if(!nw)return;
        nw.addEventListener('statechange',function(){
          if(nw.state==='installed'&&navigator.serviceWorker.controller)offerUpdate(nw,reg);
        });
      });
    }).catch(function(){});
    let reloaded=false;
    navigator.serviceWorker.addEventListener('controllerchange',function(){
      if(!swWantReload||reloaded)return; reloaded=true; location.reload();
    });
  });
  function offerUpdate(sw,reg){
    const t=el('<div class="toast" style="cursor:pointer">A new edition of the Codex is pressed: tap to open it</div>');
    t.onclick=function(){
      swWantReload=true;
      /* resolve the target at tap time: if a second deploy landed while the
         toast sat there, the captured worker is already redundant and a
         message to it does nothing; reg.waiting is always the live one */
      var w=(reg&&reg.waiting)||sw;
      try{w.postMessage('skipWaiting');}catch(e){}
      t.remove();
    };
    document.body.appendChild(t);
    setTimeout(function(){t.classList.add('go');},20);
    setTimeout(function(){t.remove();},30000);
  }
})();
