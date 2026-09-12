/* ---------------- BRINGING A MENU IN ----------------

   Four doors into the same review step, and the review step is the point: what
   arrives is a DRAFT. Every row is meant to be looked at, and the two things
   that make that possible are that each row carries the source line it came
   from and that nothing was invented to fill a blank.

   THE ORDER IS DELIBERATE. Paste first, because it is the only one that works
   on every device with no connection at all. By hand second, offered even when
   the list is empty, because it always works and four drinks by hand opens the
   quiz round. Photograph third, and only where the device has its own reader.
   Address last, because refusal is its ordinary ending.

   NO INPUTS IN THE REVIEW LIST. render() rebuilds #view on every click, so a
   table of thirty editable rows cannot survive being looked at: the first tap
   anywhere would eat every other row’s typing. Collapsed rows are read-only
   text with buttons; an expanded row is the SAME form the Menu tab already
   uses, one at a time. The consequence is the whole reason for the shape: at
   most one row’s worth of live inputs exists at any moment, and they are the
   form’s existing ids, which captureBarForm already reads. Zero new capture
   ids for the review.

   The only two new live inputs in this entire feature are the paste box and
   the address box, and captureImport reads them both. It is wired in two
   places, and both are needed: at the top of the delegated handler, so that
   pressing Read sees what was just pasted, and inside captureLiveInputs, so
   that pressing anything else does not throw it away. */

/* Every id here is read by captureImport, and there are two of them on
   purpose. Adding a third means adding it there in the same edit. */
function captureImport(){
  const i = state.menu.imp; if(!i) return;
  const t = document.getElementById('imp-text'); if(t) i.text = t.value;
  const u = document.getElementById('imp-url');  if(u) i.url = u.value;
}

function blankImport(){
  return { door:'paste', text:'', url:'', drafts:null, skipped:[], open:null,
           form:null, busy:'', err:'', filed:0, dropped:0 };
}

/* Read whatever is in the paste box. Nothing is written; the review list is
   built in memory and the person decides row by row. */
function importFromText(text){
  const i = state.menu.imp;
  const out = menuDraftFromText(text || '');
  i.drafts = out.drafts;
  i.skipped = out.skipped;
  i.open = null; i.form = null; i.err = '';
  if(!out.drafts.length){
    i.err = 'Nothing in that read as a drink. A menu usually needs a name and a '
      + 'price on the same line, or a name with its ingredients after a dash. '
      + 'If it came off a photograph, the text may have arrived scrambled.';
  }
}

/* one door for filing a reviewed row, so 'Add as is' and 'Add the N that
   read cleanly' cannot drift apart. quiet:true is the bulk path, which
   counts rather than announcing each one. */
function importFileRow(k, quiet){
  const i = state.menu.imp, d = i.drafts[k];
  if(!d) return;
  const out = saveBarRecord(d.rec, null);
  if(typeof out === 'string'){ if(!quiet) say(out); return; }
  i.drafts.splice(k, 1); i.filed++;
  if(i.open === k) i.open = null;
  else if(i.open !== null && i.open > k) i.open--;
  if(!quiet) say(out.name + ' added to your menu.');
}

/* ---- the doors ---------------------------------------------------------- */
function importDoorsHTML(){
  const i = state.menu.imp;
  const plan = (typeof ocrPlan === 'function') ? ocrPlan() : { native:false };
  const door = function(k, label){
    return '<button class="chip'+(i.door===k?' on':'')+'" aria-pressed="'+(i.door===k?'true':'false')+'" data-act="imp-door" data-d="'+k+'">'+label+'</button>';
  };
  const chips = door('paste','Paste the text') + ' ' + door('hand','Type it in')
    + (plan.native ? ' ' + door('photo','Photograph it') : '')
    + ' ' + door('link','From an address');

  let body = '';
  if(i.door === 'paste'){
    body = '<div class="col-sm" style="gap:10px">'
      + '<div class="small dim lh">Select the menu wherever it lives, copy it, and drop it in. This is the '
      + 'one that works on every device with no connection at all.</div>'
      + '<textarea class="input" id="imp-text" rows="8" placeholder="COCKTAILS&#10;&#10;Garden Gimlet - Gin, elderflower, cucumber, lime   14&#10;Paloma - Tequila, grapefruit, lime, soda   12">'+esc(i.text)+'</textarea>'
      + '<div class="row" style="gap:8px"><button class="btn btn-brass" data-act="imp-read">Read it</button>'
      + (i.text ? '<button class="chip" data-act="imp-clear">Clear</button>' : '')+'</div></div>';
  } else if(i.door === 'hand'){
    body = '<div class="col-sm" style="gap:10px">'
      + '<div class="small dim lh">Always works, and four drinks in the quiz opens a round built entirely '
      + 'from your menu. Slower than the others and the only one that is never wrong.</div>'
      + '<div class="row"><button class="btn btn-brass" data-act="menu-new">Add a drink</button></div></div>';
  } else if(i.door === 'photo'){
    body = '<div class="col-sm" style="gap:10px">'
      + '<div class="small dim lh">Your device reads the text itself. Nothing is uploaded and nothing is '
      + 'downloaded. A flat, straight photograph in good light reads best; a menu at an angle rarely does.</div>'
      + '<input type="file" id="imp-photo" accept="image/*" class="input">'
      + (i.busy ? '<div class="small">'+esc(i.busy)+'</div>' : '')
      + '<div class="tiny dim lh">No camera is opened for you on purpose: the photograph of the menu is very '
      + 'often one taken last week, and forcing the camera would hide the camera roll.</div></div>';
  } else {
    body = '<div class="col-sm" style="gap:10px">'
      + '<div class="small dim lh">Paste the menu page’s address. This app has no server of its own, so it '
      + 'can only read a page whose own site allows it, and most do not. That is the ordinary ending here '
      + 'rather than a fault, and there is always a way through underneath.</div>'
      + '<input class="input" id="imp-url" aria-label="Menu page address" placeholder="https://" value="'+esc(i.url)+'">'
      + '<div class="row" style="gap:8px"><button class="btn btn-brass" data-act="imp-link">Try it</button></div>'
      + (i.busy ? '<div class="small">'+esc(i.busy)+'</div>' : '')
      + '<div class="tiny dim lh">Your bar’s address goes nowhere: it is fetched from this browser or not at '
      + 'all. There is no relay in the middle, because the promise that the venue’s list lives only on this '
      + 'device would stop being true the moment there was one.</div></div>';
  }
  return '<div class="panel p5 col" style="gap:12px">'
    + '<div class="eyebrow">Bring the menu in</div>'
    + '<div class="row" style="gap:6px;flex-wrap:wrap">'+chips+'</div>'
    + body
    + (i.err ? '<div class="small lh" style="color:var(--oxblood-text)">'+esc(i.err)+'</div>' : '')
    /* the way through, as a control rather than as a sentence: a refusal that
       only describes the next step makes the reader do the work of finding it */
    + (i.openUrl ? '<div class="row"><a class="btn btn-ghost tiny" href="'+esc(i.openUrl)+'" target="_blank" rel="noopener noreferrer">Open the page</a></div>' : '')
    + '</div>';
}

/* ---- the review list ---------------------------------------------------- */
function importReviewHTML(){
  const i = state.menu.imp;
  if(!i.drafts) return '';
  const n = i.drafts.length;
  if(!n){
    return i.filed
      ? '<div class="panel p5 col tc" style="align-items:center;gap:8px">'
        + '<div class="small lh">'+i.filed+' drink'+(i.filed===1?'':'s')+' added to your menu'
        + (i.dropped ? ', '+i.dropped+' left behind' : '')+'.</div>'
        + '<button class="btn btn-ghost" data-act="menu-view" data-v="menu">See the menu</button></div>'
      : '';
  }
  const sure = i.drafts.filter(function(d){ return d.confidence === 'high' && !d.existing; }).length;
  const head = '<div class="panel p5 col" style="gap:10px">'
    + '<div class="row between"><div class="eyebrow">'+n+' row'+(n===1?'':'s')+' to look at</div>'
    + '<button class="chip tiny" data-act="imp-clear">Start over</button></div>'
    + '<div class="small dim lh">Nothing is saved until you say so. Every row shows the line it came from, and '
    + 'every blank is a blank on purpose: a menu prints no measures, no method and no glass, and guessing them '
    + 'would put numbers in the batching and costing sheets that came from nowhere.</div>'
    + (sure ? '<div class="row"><button class="btn btn-brass" data-act="imp-file-sure">Add the '+sure+' that read cleanly</button></div>' : '')
    + (i.skipped.length ? '<div class="tiny dim lh">'+i.skipped.length+' line'+(i.skipped.length===1?'':'s')
        +' were read and left out: '+esc(i.skipped.slice(0,4).join(' · '))
        +(i.skipped.length>4?' · …':'')+'</div>' : '')
    + '</div>';

  const rows = i.drafts.map(function(d, k){
    const open = i.open === k;
    if(open) return importOpenRowHTML(d, k);
    const flag = d.existing
      ? '<span class="chip tiny">already on your list</span>'
      : d.confidence === 'low' ? '<span class="chip tiny">needs a look</span>' : '';
    return '<div class="panel p4 col-sm" style="gap:6px">'
      + '<div class="row between" style="flex-wrap:wrap;gap:6px">'
      + '<span class="bold">'+esc(d.rec.name)+'</span>'
      + '<span class="tiny dim">'+esc(d.rec.spirit)+(d.rec.price ? ' · '+esc(d.rec.price) : '')+'</span>'
      + flag + '</div>'
      + (d.rec.spec.length
          ? '<div class="tiny dim">'+esc(d.rec.spec.join(' · '))+'</div>'
          : '<div class="tiny dim">no spec read</div>')
      + '<div class="tiny dim">'+esc(d.why)+'</div>'
      + (d.confidence === 'low' && d.raw ? '<div class="tiny dim">from: '+esc(d.raw)+'</div>' : '')
      + '<div class="row" style="gap:6px">'
      + '<button class="chip" data-act="imp-open" data-k="'+k+'">Look at it</button>'
      + '<button class="chip" data-act="imp-file" data-k="'+k+'">Add as is</button>'
      + '<button class="chip" data-act="imp-drop" data-k="'+k+'">Leave it out</button>'
      + '</div></div>';
  }).join('');
  return head + '<div class="col-sm" style="gap:8px">'+rows+'</div>';
}

/* An expanded row IS the Menu tab’s own form. One at a time, so the live
   inputs on screen are always exactly one row’s, and always the ids
   captureBarForm already knows. */
function importOpenRowHTML(d, k){
  const offer = (typeof menuCanonMeasures === 'function') ? menuCanonMeasures(state.menu.form || d.rec) : null;
  return '<div class="col-sm" style="gap:8px" data-open="1">'
    + (d.raw ? '<div class="tiny dim" style="padding:0 4px">from the menu: '+esc(d.raw)+'</div>' : '')
    + myBarFormHTML({ title:'Row '+(k+1)+' of '+state.menu.imp.drafts.length, saveLabel:'Add to the menu' })
    + (offer
        ? '<div class="panel p4 col-sm" style="gap:6px">'
          + '<div class="eyebrow">The book has a '+esc(offer.name)+'</div>'
          + '<div class="small dim lh">Its measures are one tap away, and they are the book’s rather than '
          + 'yours: take them as a starting point and change what your bar actually pours.'
          + (offer.extra ? ' The book also carries '+offer.extra+' line'+(offer.extra===1?'':'s')+' your menu did not print.' : '')
          + '</div>'
          + '<div class="row"><button class="chip" data-act="imp-canon">Fill in the book’s measures</button></div></div>'
        : '')
    + '</div>';
}

/* ---- the whole screen ---------------------------------------------------- */
function renderImport(){
  if(!state.menu.imp) state.menu.imp = blankImport();
  return '<div class="col">'
    + importDoorsHTML()
    + (state.menu.form && state.menu.imp.open === null ? myBarFormHTML() : '')
    + importReviewHTML()
    + '</div>';
}

/* ---- the two doors that are not a text box ------------------------------- */
function importPhoto(file){
  const i = state.menu.imp;
  i.busy = 'Reading the photograph…'; i.err = ''; render();
  imageToText(file, function(pct, note){
    i.busy = note || ('Reading… ' + Math.round(pct) + '%');
  }).then(function(res){
    i.busy = '';
    if(!res || !res.text || !res.text.trim()){
      i.err = (res && res.note) || 'Nothing legible came off that photograph. A flat, straight shot in good '
        + 'light reads best. Failing that, most phones will let you select the text on the photo itself: '
        + 'copy it and use Paste the text.';
      render(); return;
    }
    i.door = 'paste'; i.text = res.text;
    importFromText(res.text);
    render();
  }).catch(function(){
    i.busy = '';
    i.err = 'That file could not be read as an image.';
    render();
  });
}

/* The two addresses most likely to be pasted, and the two that can never work.
   Neither serves its page to another origin and both are behind a login wall,
   so trying is twelve seconds of spinner ending in the same sentence. Refusing
   up front is a statement of fact rather than a shortcut, and it is HERE rather
   than in js/menu-read.js so that file keeps diffing against the World Table’s
   copy: which hostnames are worth trying is a decision about this screen. */
var IMP_NEVER = /(?:^|\.)(?:instagram\.com|facebook\.com|fb\.com|threads\.net)$/i;

function importLink(url){
  const i = state.menu.imp;
  let host = '';
  try { host = new URL(/^https?:\/\//i.test(url) ? url : 'https://' + url).hostname; } catch(e){}
  if(host && IMP_NEVER.test(host)){
    i.busy = '';
    i.err = host + ' does not let another site read its pages, and a menu posted there is usually a picture '
      + 'anyway. Open the post, select the text if there is any, and use Paste the text.';
    i.openUrl = /^https?:/i.test(url) ? url : 'https://' + url;
    render(); return;
  }
  i.busy = 'Asking that page…'; i.err = ''; render();
  linkToText(url).then(function(res){
    i.busy = '';
    if(res && res.ok && res.text && res.text.trim()){
      i.door = 'paste'; i.text = res.text;
      importFromText(res.text);
      render(); return;
    }
    /* The refusal is the main path, not the error path. Say the reason, give a
       way to open the page, and say the thing that actually works. */
    const open = (res && res.openUrl) || url;
    i.err = ((res && res.reason) || 'That page could not be read from here.')
      + ' Open it, select the menu, and use Paste the text: that always works.';
    i.openUrl = open;
    render();
  }).catch(function(){
    i.busy = '';
    i.err = 'That did not look like a web address. It needs to start with https://';
    render();
  });
}
