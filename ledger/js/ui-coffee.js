/* ---------------- COFFEE & TEA ---------------- */
/* renderOnTap with the identifiers swapped, which is deliberate: SERVICE_STUDY,
   ONTAP_STUDY and COFFEE_STUDY share a shape, so one renderer pattern and one
   gate cover all three, and serviceTicketHTML is reused rather than forked.

   It lives in its own file rather than beside the other two in ui-new.js
   because of the video layer below, and a video layer that grows inside the
   router file is a video layer nobody can find.

   Acts are cof-sec, cof-row, cof-ref and cof-play. Distinct names rather than a
   shared prefix with a state.tab discriminator, which is the standing rule in
   app.js: that chain is a flat if/else on el.dataset.act and has never once
   read state.tab to decide what an action meant. */
function renderCoffee(){
  const s = state.coffee;
  const sec = COFFEE_STUDY.find(x => x.key === s.sec) || COFFEE_STUDY[0];
  const chips = COFFEE_STUDY.map(x =>
    '<button class="tab-btn'+(s.sec===x.key?' active':'')+'"'+(s.sec===x.key?' aria-current="true"':'')+' data-act="cof-sec" data-d="'+x.key+'">'
    + esc(x.title)+'</button>').join('');
  const rows = sec.rows.map((r,i) => {
    const open = s.rowOpen === i;
    return '<div class="panel" style="padding:0 16px">'
      + '<button class="accordion-btn'+(open?' open':'')+'" aria-expanded="'+(open?'true':'false')+'" data-act="cof-row" data-i="'+i+'">'
      + '<span>'+esc(r[0])+'</span><span style="color:var(--brass)">'+(open?'−':'+')+'</span></button>'
      + (open ? '<div class="accordion-body"><div class="small dim lh">'+esc(r[1])+'</div>'
                + cofFilmHTML(sec.key, r[0]) + '</div>' : '')+'</div>';
  }).join('');
  return '<div class="col">'
    + '<nav class="tabs" style="margin-bottom:4px">'+chips+'</nav>'
    + '<div class="panel p4"><div class="eyebrow mb1">'+esc(sec.title)+'</div>'
    + '<div class="small dim lh">Coffee and tea are the two things a bar sells all day and teaches nobody to make. Everything here is a technique a guest can taste before you can.</div></div>'
    + '<div class="col-sm">'+rows+'</div>'
    + cofRefsHTML(s)
    + (sec.key === 'spiked' ? cofIndexHTML() : '')
    + '</div>';
}

/* Split out of renderCoffee because the cof-ref act repaints THIS alone rather
   than calling render(). With a film playing in an open lesson above, a full
   render would tear the iframe out of the page, and re-parenting an iframe
   reloads it in every browser. */
function cofRefsHTML(s){
  const refs = COFFEE_REF.filter(x => x.dom === s.sec);
  if(!refs.length) return '<div id="cof-refs"></div>';
  const cats = [...new Set(refs.map(x => x.cat))];
  return '<div id="cof-refs">' + cats.map(cat => {
    const items = refs.filter(x => x.cat === cat).map(x => {
      const open = s.refOpen === x.name;
      return '<div class="panel"><button class="drink-head" aria-expanded="'+(open?'true':'false')+'" data-act="cof-ref" data-n="'+esc(x.name)+'">'
        + '<span class="bold">'+esc(x.name)+'</span>'
        + '<span class="plusminus">'+(open?'−':'+')+'</span></button>'
        + (open ? '<div class="drink-body">'+serviceTicketHTML(x)+'</div>' : '')+'</div>';
    }).join('');
    return '<div class="eyebrow" style="padding:0 4px;margin-top:8px">'+esc(cat)+'</div><div class="col-sm">'+items+'</div>';
  }).join('') + '</div>';
}

/* ---------------- THE FILM ----------------
   This tab is the ONE place in the Ledger that pins a video id rather than
   building a search. The rest of the app argues against pinning, on screen and
   in four other places, and that argument is right: a pinned id rots. This tab
   earns the exception by being checked. tools/films-add.mjs is the only thing
   that may write one, every title and channel came back from YouTube rather
   than from anybody's memory, and tools/check-films.mjs asks again before each
   release. And every card still carries a search link beside the film, so a
   film that dies between releases costs one extra tap.

   Nothing here contacts YouTube until the reader opens a lesson that has a
   film, and then only for that one film. */
function cofFilm(sec, rowTitle){
  if(typeof COFFEE_FILMS === 'undefined') return null;
  const key = slugify(rowTitle);
  return COFFEE_FILMS.find(x => x.sec === sec && x.row === key) || null;
}

function cofFilmHTML(sec, rowTitle){
  const f = cofFilm(sec, rowTitle);
  if(!f) return '';
  const watch = 'https://www.youtube.com/watch?v='+encodeURIComponent(f.id)+(f.start ? '&t='+f.start+'s' : '');
  /* The fallback searches the FILM's title rather than the lesson's, because a
     reader who lands here wants that film or its nearest equivalent, and a
     re-upload keeps the title. scopeSuffix honours the longform preference the
     reader may have set in Notes. */
  const search = ytSearch(f.title + (typeof scopeSuffix === 'function' ? scopeSuffix() : ''));
  /* navigator.onLine false is the one thing we actually know. Emit no thumbnail
     and no play button rather than a broken image and a control that does
     nothing. Online but unrouted is the commoner bar case, and the image's own
     error event catches that one in cofAfter. */
  const off = (typeof navigator !== 'undefined' && navigator.onLine === false);
  const mins = f.start ? Math.floor(f.start/60)+':'+String(f.start%60).padStart(2,'0') : '';
  return '<div class="vid-card">'
    + (off ? '' :
       '<div class="vid-frame" id="cof-frame">'
       + '<button class="vid-thumb" data-act="cof-play" data-v="'+esc(f.id)+'"'
       + (f.start ? ' data-s="'+f.start+'"' : '')
       + ' aria-label="Play '+esc(f.title)+', by '+esc(f.channel)+'">'
       + '<img src="https://i.ytimg.com/vi/'+esc(f.id)+'/hqdefault.jpg" alt="">'
       + '<span class="vid-play" aria-hidden="true">&#9654;</span></button></div>')
    + '<div class="vid-meta">'
    + '<div class="eyebrow">Watch</div>'
    + '<div class="bold lh">'+esc(f.title)+'</div>'
    + '<div class="tiny dim">'+esc(f.channel)+(mins ? ' &middot; starts at '+mins : '')+'</div>'
    + '<div class="small dim lh mt1"><span class="brass2">Watch for: </span>'+esc(f.watchFor)+'</div>'
    + (off ? '<div class="tiny dim lh mt1">You are offline, so the film cannot load. The lesson above is the whole teaching; the links below work once you are back.</div>' : '')
    + '<div class="row mt1" style="gap:8px">'
    + '<a class="btn btn-ghost tiny" href="'+watch+'" target="_blank" rel="noopener noreferrer">Open on YouTube</a>'
    + '<a class="btn btn-ghost tiny" href="'+search+'" target="_blank" rel="noopener noreferrer">Search instead</a>'
    + '</div></div></div>';
}

/* THE PLAYING ID IS NEVER PUT IN state.
   Every act in app.js ends in render(), which does one innerHTML and destroys
   any iframe. If state knew a film was playing, the next render would rebuild
   the iframe with autoplay and the film would restart from zero, with sound,
   on every chip tap. So this mutates the DOM and returns, app.js gives cof-play
   an early return rather than a render, and a later render simply paints the
   thumbnail again. */
function cofPlay(el){
  const id = el.dataset.v, start = Number(el.dataset.s) || 0;
  const host = document.getElementById('cof-frame');
  if(!host) return;
  const src = 'https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)
    + '?autoplay=1&rel=0' + (start ? '&start='+start : '');
  host.innerHTML = '<iframe src="'+src+'" title="'+esc(el.getAttribute('aria-label')||'Video')+'"'
    + ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
    + ' allowfullscreen></iframe>';
  const fr = host.querySelector('iframe');
  if(fr) fr.focus();
}

/* Ran from the end of render(), guarded on the element being there rather than
   on state.tab, which is how every other post-paint hook in app.js is written. */
const cofProbe = {};        /* id -> 'ok' | 'gone', for this session only */
function cofAfter(){
  const host = document.getElementById('cof-frame');
  if(!host) return;
  const btn = host.querySelector('[data-act="cof-play"]');
  if(!btn) return;
  const id = btn.dataset.v;
  const img = host.querySelector('img');
  /* The thumbnail failing is the honest first signal that the network is not
     really there, and it costs nothing to listen for. */
  if(img) img.addEventListener('error', function(){ cofDemote(host, 'offline'); });
  if(cofProbe[id] === 'gone'){ cofDemote(host, 'gone'); return; }
  if(cofProbe[id] === 'ok') return;
  fetch('https://www.youtube.com/oembed?url='
    + encodeURIComponent('https://www.youtube.com/watch?v='+id) + '&format=json')
    .then(function(r){
      cofProbe[id] = r.ok ? 'ok' : 'gone';
      /* the reader may have opened another lesson while this was in flight */
      if(!r.ok && document.getElementById('cof-frame') === host) cofDemote(host, 'gone');
    })
    .catch(function(){
      /* THE EMPTY CATCH IS THE POINT. A dropped connection and a deleted video
         must never be confused, and a bar's wifi drops constantly. Saying
         nothing is the honest answer to a request that did not complete. */
    });
}

function cofDemote(host, why){
  if(!host || host.dataset.demoted) return;
  host.dataset.demoted = '1';
  host.innerHTML = '<div class="vid-off small dim lh">'
    + (why === 'gone'
      ? 'This film is no longer available on YouTube. The lesson above still stands, and Search instead will find another.'
      : 'The film cannot be reached from here. The lesson above is the whole teaching.')
    + '</div>';
}

/* ---------------- WHAT THE BAR ALREADY POURS ----------------
   The app holds 42 drinks built on coffee or tea, each with its own spec and
   its own lore, and every one of them lives somewhere else: in the Library, on
   the Shot Board, in Zero Proof. This section indexes them and links out. It
   does not copy a single spec, because a drink name is a spaced repetition
   primary key and moving one rewrites study records for no gain.

   MEMBERSHIP IS COMPUTED, NEVER TYPED. A hand-written list of names is a list
   of links that rot silently the first time a drink is renamed: findBySlug
   returns -1, applyRoute still succeeds because the TAB is valid, the reader
   lands at the top of a 365 row Library, and syncRoute erases the evidence on
   the first paint. Asking the ingredient vocabulary instead means the index
   cannot be stale and picks up any coffee drink added later on its own. */
var cofIndexCache = null;
function cofIndex(){
  if(cofIndexCache) return cofIndexCache;
  var BREW = ['brewedcoffee', 'espresso', 'tea'], LIQ = ['coffee'];
  var out = { brew: [], liq: [] };
  var lists = [['library', typeof COCKTAILS === 'undefined' ? [] : COCKTAILS],
    ['shots', typeof SHOTS === 'undefined' ? [] : SHOTS],
    ['na', typeof NA_DRINKS === 'undefined' ? [] : NA_DRINKS]];
  lists.forEach(function(pair){
    pair[1].forEach(function(d){
      var r = [];
      try { r = reqsOf(d) || []; } catch(e) { return; }
      /* Three coffee beans floated on a sambuca is a garnish, and the matcher
         reads it as the coffee row like any other mention. A countable solid
         is not what this section is about, so a drink qualifies on beans
         alone is not a coffee drink. */
      var beansOnly = (d.spec || []).every(function(line){
        return !/coffee|espresso|\btea\b|matcha|chai/i.test(line) || /\bbeans?\b/i.test(line);
      });
      var has = function(ids){ return ids.some(function(i){ return r.indexOf(i) >= 0; }); };
      if(has(BREW) && !beansOnly) out.brew.push({ src: pair[0], name: d.name });
      else if(has(LIQ)) out.liq.push({ src: pair[0], name: d.name });
    });
  });
  cofIndexCache = out;
  return out;
}

function cofIndexHTML(){
  var ix = cofIndex();
  /* An anchor, not a button. Nothing in this app has ever put an in-content
     #/ link on screen, and data-hash is wired to exactly one listener, the
     search overlay. A button carrying data-hash here would look like a button
     and do nothing at all. An href goes through hashchange, which applyRoute
     already answers. */
  var chips = function(list){
    return '<div class="row" style="flex-wrap:wrap;gap:6px">' + list.map(function(x){
      return '<a class="chip" href="#/' + x.src + '/' + slugify(x.name) + '">' + esc(x.name) + '</a>';
    }).join('') + '</div>';
  };
  if(!ix.brew.length && !ix.liq.length) return '';
  return '<div class="panel p4 col-sm" style="margin-top:8px">'
    + '<div class="eyebrow">What the bar already pours</div>'
    + '<div class="small dim lh">Every one of these is already in the ledger with its full spec and its lore. This is the index, not a second copy.</div>'
    + '<div class="eyebrow" style="margin-top:8px">Built on brewed coffee or tea <span class="font-tix">' + ix.brew.length + '</span></div>'
    + chips(ix.brew)
    + '<div class="eyebrow" style="margin-top:8px">Built on coffee liqueur <span class="font-tix">' + ix.liq.length + '</span></div>'
    + chips(ix.liq)
    + '<div class="tiny dim lh">The split is the vocabulary’s, not a judgement: the first group needs something brewed, the second needs a bottle. A guest asking for a coffee drink might mean either, which is the whole reason to ask.</div>'
    + '</div>';
}
