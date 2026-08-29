/* ============ Boot: first paint + service worker ============ */
/* Core called render() before the later layers loaded their wrappers and
   home-tile decorations; render again now that every layer is in place. */
render();

/* ---- service worker + update toast ---- */
(function(){
  if(!('serviceWorker' in navigator))return;
  if(location.search.indexOf('nosw')>=0)return;
  window.addEventListener('load',function(){
    navigator.serviceWorker.register('sw.js').then(function(reg){
      if(reg.waiting&&navigator.serviceWorker.controller){offerUpdate(reg.waiting);}
      reg.addEventListener('updatefound',function(){
        const nw=reg.installing;
        if(!nw)return;
        nw.addEventListener('statechange',function(){
          if(nw.state==='installed'&&navigator.serviceWorker.controller)offerUpdate(nw);
        });
      });
    }).catch(function(){});
    let reloaded=false;
    navigator.serviceWorker.addEventListener('controllerchange',function(){
      if(reloaded)return; reloaded=true; location.reload();
    });
  });
  function offerUpdate(sw){
    const t=el('<div class="toast" style="cursor:pointer">A new edition of the Codex is pressed: tap to open it</div>');
    t.onclick=function(){sw.postMessage('skipWaiting');t.remove();};
    document.body.appendChild(t);
    setTimeout(function(){t.classList.add('go');},20);
    setTimeout(function(){t.remove();},30000);
  }
})();
