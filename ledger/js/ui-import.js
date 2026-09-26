/* ---------------- THE MENU DESK: BRINGING A MENU IN ----------------

   Four doors into the same review step, and the review step is the point: what
   arrives is a DRAFT. Every row is meant to be looked at, and the two things
   that make that possible are that each row carries the source line it came
   from and that nothing was invented to fill a blank.

   ONE DESK, THREE ROOMS. Whatever comes through a door is read by the Menu
   Desk (js/menu-desk.js) into a desk file: dishes for the World Table, wines
   for the Codex, cocktails for this bar, and rows it could not place. This
   screen shows the bar's share for review and, on the suite's one origin,
   hands the other rooms' rows to the shared desk inbox, where the World Table
   and the Codex find them the next time they open. Off that origin the desk
   file is downloadable instead, and importable in any of the three apps.
   The desk file is a draft read into this review list and never merged into
   progress.bar: a row reaches the list only through saveBarRecord, one at a
   time, after a person has looked at it.

   TWO ENGINES, ONE DESK FILE. "Read it here" is the offline reader: free,
   instant, every device. "Ask the Maître d' to read it" is the optional online
   agent (shared/oot-maitre.js, present only in the suite build and only once
   a person has brought her in with a key of their own): the menu text goes to
   Anthropic on that key and nowhere else, her answer is checked row by row
   (a price that is not in the line it came from is blanked and flagged), and
   what lands here is the same desk file the offline reader would have made.
   Paste stays first; she is the second engine, never a replacement.

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

   The only two live inputs in this entire feature are the paste box and
   the address box, and captureImport reads them both. It is wired in two
   places, and both are needed: at the top of the delegated handler, so that
   pressing Read sees what was just pasted, and inside captureLiveInputs, so
   that pressing anything else does not throw it away. The desk-file picker
   is a file input, which holds nothing a render can lose. */

/* Every id here is read by captureImport, and there are two of them on
   purpose. Adding a third means adding it there in the same edit. */
function captureImport(){
  const i = state.menu.imp; if(!i) return;
  const t = document.getElementById('imp-text'); if(t) i.text = t.value;
  const u = document.getElementById('imp-url');  if(u) i.url = u.value;
}

function blankImport(){
  return { door:'paste', text:'', url:'', drafts:null, skipped:[], open:null,
           form:null, busy:'', err:'', filed:0, dropped:0, moved:0, openUrl:null,
           /* the desk file the drafts came from, how it arrived ('read',
              'inbox', 'file', 'agent'), what the whole read counted, whether
              the other rooms' rows were handed on, the "already read" answer,
              her second-tap question, and whether the bar's share is marked
              taken on the shared desk */
           file:null, from:'', counts:null, handed:null, already:null, confirm:false, taken:false };
}

/* A refusal on this screen: kept on state, shown in words, and announced
   ONCE through #live, the persistent region app.js keeps outside #view.
   Not role=alert on the shown div: render() rebuilds #view on every act
   and re-inserts that div for as long as the sentence stands, and an
   inserted alert is announced again each time, so a standing refusal
   was read out at every tap. Every site that sets i.err goes through
   here or says its own sentence in the same breath. */
function importErr(sentence){
  const i = state.menu.imp;
  i.err = sentence;
  say(sentence);
}

/* ---- where the other rooms are ------------------------------------------
   The three apps share one origin only in the suite, where this app is served
   under /ledger and the World Table and the Codex under /table and /codex
   beside it; that is the one place the desk inbox can be read by the app it
   is meant for. Anywhere else the links point at the live suite and only the
   download is offered, because a wine list handed to an inbox nobody else can
   read is a wine list lost. */
var IMP_SUITE = 'https://zpullen98-gif.github.io';
function deskSharedHere(){
  try { return /^\/ledger(\/|$)/.test(location.pathname); } catch(e){ return false; }
}
function deskRoomHref(room){
  const wing = room === 'wine' ? 'codex/' : 'table/menu#desk';
  return deskSharedHere() ? '../' + wing : IMP_SUITE + '/' + wing;
}
function deskRoomName(room){ return room === 'wine' ? 'the Codex' : 'the World Table'; }

/* ---- the Maître d', when she is here ------------------------------------
   window.OOT.maitre is the shared client, loaded by the suite and never by
   this app: a standalone build has no OOT at all, and the suite loads her
   lazily through OOT.loadShared when a door opens. Every door here asks these
   three questions and says the answer in words: the client is here; it is
   not here but can be fetched; or this build has no way to bring her in. A
   door that only fails is worse than no door, so the last case is a sentence
   and not a button. */
var MAITRE_NAME = "The Maître d'";
var MAITRE_NOT_IN_BUILD = MAITRE_NAME + ' is not in this build.';
var MAITRE_FAMILY_LINE = 'Bring her in with a key of your own, or ask whoever runs the menu to send you theirs.';
var MAITRE_ONLINE_ONLY = MAITRE_NAME + ' is online only. Read it here for now.';
function maitreHere(){
  try { return (typeof OOT !== 'undefined' && OOT && OOT.maitre) ? OOT.maitre : null; } catch(e){ return null; }
}
function maitreLoadable(){
  try { return typeof OOT !== 'undefined' && !!OOT && typeof OOT.loadShared === 'function'; } catch(e){ return false; }
}
/* Waits for a lazily loaded client, because a script tag lands on its own
   clock: up to five seconds, then the honest sentence. */
function maitreWhenHere(cb, tries){
  const m = maitreHere();
  if(m){ cb(m); return; }
  if(!tries){ say(MAITRE_ONLINE_ONLY); return; }
  setTimeout(function(){ maitreWhenHere(cb, tries - 1); }, 100);
}
/* Opens her key screen. Returns false when this build cannot bring her in,
   and the caller says so. */
function maitreOpenSettings(){
  const m = maitreHere();
  if(m){ m.openSettings(); return true; }
  if(!maitreLoadable()) return false;
  /* the script's FILE name, because that is what the World Table hands the
     same loader (MAITRE_SCRIPT in src/lib/maitre.ts): the hub's loader is
     one function for three wings, and a wing that asked for 'oot-maitre'
     while the others asked for 'oot-maitre.js' would be the one whose door
     never opens, with nothing on screen but a five-second wait */
  try { OOT.loadShared('oot-maitre.js'); } catch(e){ say(MAITRE_ONLINE_ONLY); return true; }
  maitreWhenHere(function(mm){ mm.openSettings(); }, 50);
  return true;
}

/* ---- reading -------------------------------------------------------------- */

/* Read whatever is in the paste box, or came off a photograph or a page.
   `kind` is the door ('paste', 'photo', 'link'), kept on the desk file's
   source so the review can say "Photo: check the price".

   NEVER TWICE. The desk file carries a hash of its source, minted by
   deskSource in every app, so pasting the same menu into a second app says
   "this was read on the World Table today at 14:02" instead of reading it
   again and offering the cellar a second copy of its wines. "Read it again
   anyway" passes `again` and reads. */
function importFromText(text, kind, opts){
  opts = opts || {};
  const i = state.menu.imp;
  const body = String(text || '');
  i.err = ''; i.already = null; i.confirm = false; i.openUrl = null;
  if(!opts.again && body.trim()){
    const inbox = deskInbox.read();
    if(inbox && inbox.source && inbox.source.hash === hashText(body)){
      i.already = { file: inbox, share: deskInbox.share(inbox, 'cocktail') };
      i.drafts = null; i.file = null; i.counts = null; i.handed = null;
      /* said once here; the panel that shows it is plain, for the reason
         importErr gives */
      say(importAlreadySaid(i.already));
      return;
    }
  }
  importTakeDesk(menuDraftFromText(body, kind || 'paste'), 'read');
}

/* Puts a desk's bar share on the review list, announces the count, and hands
   the other rooms their rows. `from` says how the desk arrived: a read here,
   the shared inbox, a desk file, or her. The inbox's rows are already where
   the other rooms look, so those are the one case not handed on again. */
function importTakeDesk(out, from){
  const i = state.menu.imp;
  i.drafts = out.drafts; i.skipped = out.skipped; i.file = out.file; i.counts = out.counts; i.from = from;
  i.open = null; i.form = null; i.err = ''; i.already = null; i.handed = null; i.taken = false; i.confirm = false;
  /* The Add view opens the hand form under the doors by default (app.js,
     menu-view), and a read that produced rows would leave that blank form
     sitting between the doors and the list it is not part of. Closed only
     while it is UNTOUCHED: the live inputs were captured into it before this
     act, so a name somebody had started typing is a form worth keeping. */
  if(out.drafts.length && state.menu.form && JSON.stringify(state.menu.form) === JSON.stringify(blankBarForm())) state.menu.form = null;
  const line = countsLine(i.counts);
  if(from !== 'inbox') importHandOn();
  if(!out.drafts.length){
    const others = i.counts.dishes + i.counts.wines;
    if(!i.counts.lines){
      i.err = 'Nothing in that read as a menu line. A menu usually needs a name and a price on the same line, '
        + 'a name with its ingredients after a dash, or a name with the price on the line under it. '
        + 'If it came off a photograph, the text may have arrived scrambled.';
    } else if(others){
      i.err = 'Nothing in that read as a cocktail. ' + line.replace(/^Read /, 'It read ')
        + ' The other rooms’ rows are handed on below.';
    } else {
      i.err = 'Nothing in that read as a cocktail. ' + line.replace(/^Read /, 'It read ')
        + ' The lines it set aside are listed below; a drink among them can be typed in by hand.';
    }
  }
  /* One announcement per read. The refusal carries the counts in its own
     words, so it is said INSTEAD of the counts line rather than after it
     (two changes to the live region thirty milliseconds apart and only the
     second is heard), and the desk file's size notice, when there is one,
     rides the same sentence. The screen shows the words too, plainly. */
  say((i.err || line) + (out.file && out.file.notice ? ' ' + out.file.notice : ''));
}

/* The whole desk file to the shared inbox, so the World Table finds its
   dishes and the Codex its wines. The bar's own rows ride along and are
   marked taken when this list is done with them, which also means a reload
   mid-review finds them waiting on the Menu tab rather than gone.

   A refusal (a private window, a full slot, a menu too big for it) writes
   nothing at all and comes back with a sentence, and the next move is the
   download. Off the shared origin the download is the only move, so nothing
   is written and the block below says so. */
function importHandOn(){
  const i = state.menu.imp;
  const file = i.file; if(!file) return;
  const forRoom = function(k){ return file.items.filter(function(it){ return it.kind === k || (it.kind === 'unsure' && it.could.indexOf(k) >= 0); }).length; };
  const dishes = forRoom('dish'), wines = forRoom('wine');
  if(!dishes && !wines){ i.handed = null; return; }
  if(!deskSharedHere()){ i.handed = { ok:false, shared:false, said:'', dishes:dishes, wines:wines }; return; }
  const r = deskInbox.write(file);
  i.handed = { ok: r.ok, shared:true, said: r.ok ? '' : r.said, dishes:dishes, wines:wines };
}

/* The bar's share of a desk file that arrived whole: from the shared inbox
   (the World Table or the Codex read it) or from a desk file another device
   downloaded. */
function importLoadDesk(file, from){
  importTakeDesk(menuDraftsFromDesk(file), from);
}

/* The Menu tab's chip and the home line both land here: the inbox's bar
   share onto the review list, prefilled. */
function importOpenInbox(){
  const f = deskInbox.read();
  if(!f || !deskInbox.share(f, 'cocktail').length){ say('Nothing is waiting at the Menu Desk.'); return; }
  state.tab = 'menu'; state.menu.view = 'add'; state.menu.form = null; state.menu.editing = null;
  state.menu.imp = blankImport();
  importLoadDesk(f, 'inbox');
}

/* A desk file off the disk. readDeskFile never throws and refuses what it
   cannot vouch for, so the only error here is the honest one. */
function importDeskFile(file){
  const i = state.menu.imp;
  const reader = new FileReader();
  reader.onload = function(){
    const f = readDeskFile(String(reader.result || ''));
    if(!f){
      importErr('That is not a desk file. It should be the menu-desk-YYYY-MM-DD.json another device downloaded from one of the three apps.');
      render(); return;
    }
    i.door = 'paste';
    importLoadDesk(f, 'file');
    render();
  };
  reader.onerror = function(){ importErr('Could not read that file.'); render(); };
  reader.readAsText(file);
}

/* Marks the bar's share taken on the shared desk, once. Only when the desk
   waiting there is still the one this list came from: another read may have
   replaced it since, and marking a stranger's cocktails taken would hide them
   from the person who read them. `force` is the bulk run, which takes the
   share whether or not low rows remain: the rows still on screen are the
   ones a person is looking at right now. */
function importMaybeTaken(force){
  const i = state.menu.imp;
  if(!i.file || i.taken || !deskSharedHere()) return;
  if(!force && i.drafts && i.drafts.length) return;
  const inbox = deskInbox.read();
  if(!inbox || !inbox.source || inbox.source.hash !== i.file.source.hash) return;
  deskInbox.taken('cocktail');
  i.taken = true;
}

/* one door for filing a reviewed row, so 'Add as is' and 'Add the N that
   read cleanly' cannot drift apart. quiet:true is the bulk path, which
   counts rather than announcing each one. allowEmptySpec is the importer's
   licence and nobody else's: a row the menu printed as a name and nothing
   else is filed as a DRAFT, marked so on the list, and kept out of every
   sheet that would read its blank spec as a fact. */
function importFileRow(k, quiet){
  const i = state.menu.imp, d = i.drafts[k];
  if(!d) return;
  const out = saveBarRecord(d.rec, null, { allowEmptySpec: true });
  if(typeof out === 'string'){ if(!quiet) say(out); return; }
  i.drafts.splice(k, 1); i.filed++;
  if(i.open === k) i.open = null;
  else if(i.open !== null && i.open > k) i.open--;
  if(!quiet){
    say(out.name + (out.draft ? ' added to your menu as a draft: it needs a spec.' : ' added to your menu.'));
    importMaybeTaken(false);
  }
}

/* "It is a dish" / "It is a wine": the row leaves this list and goes back to
   the desk as the kind a person said, read again off its own lines so a wine
   gets its vintage and pours from the lines it always had. On the shared
   origin the inbox's copy of the row is replaced BY ID (importReKindInbox);
   elsewhere the file in memory follows, so the download carries it. */
function importReKind(k, kind){
  const i = state.menu.imp;
  const d = i.drafts && i.drafts[k];
  if(!d || !i.file || (kind !== 'dish' && kind !== 'wine')) return;
  const item = reReadAs(d.item, kind);
  i.drafts.splice(k, 1); i.moved++;
  if(i.open === k){ i.open = null; state.menu.form = null; }
  else if(i.open !== null && i.open > k) i.open--;
  let found = false;
  const items = i.file.items.map(function(it){ if(it.id === item.id){ found = true; return item; } return it; });
  if(!found) items.push(item);
  i.file = Object.assign({}, i.file, { items: items });
  i.counts = deskCounts(i.file.items, i.file.unsorted);
  const room = deskRoomName(kind);
  if(deskSharedHere()){
    const r = importReKindInbox(item);
    if(r.ok){
      if(!i.handed) i.handed = { ok:true, shared:true, said:'', dishes:0, wines:0 };
      i.handed[kind === 'wine' ? 'wines' : 'dishes']++;
      say(d.rec.name + ' is now a ' + kind + ', waiting for ' + room + '.');
    } else if(r.reason === 'replaced'){
      /* the slot holds somebody else's read now, so this row rides the file
         in memory and the block below offers the download */
      i.handed = Object.assign({ dishes:0, wines:0 }, i.handed || {}, { ok:false, shared:true, said:r.said });
      i.handed[kind === 'wine' ? 'wines' : 'dishes']++;
      say(d.rec.name + ' is now a ' + kind + ' for ' + room + '. ' + r.said);
    } else {
      importErr(r.said);
    }
  } else {
    if(!i.handed) i.handed = { ok:false, shared:false, said:'', dishes:0, wines:0 };
    i.handed[kind === 'wine' ? 'wines' : 'dishes']++;
    say(d.rec.name + ' is now a ' + kind + ' for ' + room + '. Download the desk file to take it there.');
  }
  importMaybeTaken(false);
}

/* The inbox's copy of a re-kinded row, replaced BY ID. The inbox merges by
   kind and folded name, so a plain write of the re-kinded row landed BESIDE
   the cocktail row it replaces (another kind is another key), and nothing
   in the inbox's own API removes a row by id: the bar was offered again the
   very row a person had just said is not a cocktail, and the World Table
   saw it under both kinds. So the slot is rebuilt: the old row goes by id,
   the re-kinded one comes in, the taken marks stay, and the write lands
   against a cleared slot, where a write is a plain store. Only while the
   slot still holds the desk this list came from: another read may have
   replaced it since, and a stranger's desk is not ours to edit, so that
   case comes back as 'replaced' and the row rides the download. An empty
   slot takes the whole file, the way the first hand-on does. A refused
   rebuild puts the old file back, because a slot emptied by a write that
   then failed would be the one way this screen could lose a desk. */
function importReKindInbox(item){
  const i = state.menu.imp;
  const inbox = deskInbox.read();
  if(!inbox) return deskInbox.write(i.file);
  if(!inbox.source || !i.file || !i.file.source || inbox.source.hash !== i.file.source.hash){
    return { ok:false, reason:'replaced', said:'The desk between apps holds a newer read now, so download the desk file to take this row there.' };
  }
  const items = inbox.items.filter(function(it){ return it.id !== item.id; }).concat([item]);
  deskInbox.clear();
  const r = deskInbox.write(Object.assign({}, inbox, { items: items }));
  if(!r.ok) deskInbox.write(inbox);
  return r;
}

/* ---- the Maître d' as the second engine -----------------------------------
   Her answer is a flat desk (dishes, wines, cocktails, unsure) checked by the
   client against its schema and against the source text before it gets here;
   this turns it into the desk file every review list reads, through
   readDeskFile, which mints the ids, caps every string and keeps only a price
   part that is a substring of the printed price. The reader's own price
   tokeniser (priceParts) breaks her printed price into parts, so nothing is
   parsed into a number on the way.

   HER METHOD, GLASS AND GARNISH ARE HERS. A DeskCocktail has no such fields,
   because a menu prints none of them and the desk reads only what is printed.
   Her three ride beside the row as marks (by: 'maitre') and reach the record
   as rec.maitre, where the drink's Build pane shows them under "Her method,
   glass and garnish" with Keep, Edit and Discard (menuFieldMarksHTML and
   keepMaitreField in ui-menu.js): Keep writes one INTO the plain field and
   drops the mark, Discard drops it. They never land in rec.method,
   rec.glass or rec.garnish on their own, because an unkept line of hers
   reaches no drill and no rail. */
function deskFromMaitre(res, text){
  if(!res || !res.desk) return null;
  const d = res.desk;
  const model = (res.provenance && res.provenance.model) || 'unknown';
  const now = new Date().toISOString();
  const price = function(p){ p = String(p || ''); return { printed: p, parts: priceParts(p) }; };
  const items = [];
  const hers = {};
  (d.dishes || []).forEach(function(x){
    items.push({ kind:'dish', section:x.section, name:x.name, description:x.description, price:price(x.price),
      marks:x.marks || [], confidence:x.confidence === 'high' ? 'high' : 'low', why:['Read by ' + MAITRE_NAME + ' on ' + model + '.'],
      raw:x.raw, lines:[0,0], ingredientsNamed:x.ingredientsNamed || [] });
  });
  (d.wines || []).forEach(function(x){
    const pours = [];
    if(x.glass) pours.push({ price: String(x.glass), size: '' });
    (x.pours || []).forEach(function(s){
      /* "5 oz 45.00" as printed: the last figure is the price, the rest the
         size; a string with no figure is a size with no price, kept whole */
      const m = /^(.*?)\s*([£$€]?\d[\d.,]*)\s*$/.exec(String(s || ''));
      pours.push(m ? { price: m[2], size: m[1].trim() } : { price: '', size: String(s || '') });
    });
    const name = [x.producer, x.name].filter(Boolean).join(' ').trim() || String(x.name || '');
    items.push({ kind:'wine', section:x.section, name:name, price:price(x.bottle || x.glass || ''),
      marks:[], confidence: (x.bottle || x.glass) ? 'high' : 'low', why:['Read by ' + MAITRE_NAME + ' on ' + model + '.'],
      raw:x.raw, lines:[0,0], producer:x.producer || '', wine:x.name || '', vintage:x.vintage || '',
      region:x.region || '', country:'', grapes:x.grapes || [], style:x.style || '', bin:'',
      pours:pours, bottle:x.bottle || '', descriptors:'' });
  });
  (d.cocktails || []).forEach(function(x){
    const spec = (x.spec || []).slice();
    items.push({ kind:'cocktail', section:x.section, name:x.name, price:price(x.price), marks:[],
      confidence: (spec.length && x.price) ? 'high' : 'low', why:['Read by ' + MAITRE_NAME + ' on ' + model + '.'],
      raw:x.raw, lines:[0,0], spec:spec, description:'', baseSpirit:'' });
    if(x.method || x.glass || x.garnish) hers[String(x.raw || '')] = { method:x.method || '', glass:x.glass || '', garnish:x.garnish || '' };
  });
  const unsorted = (d.unsure || []).map(function(u){ return { raw:u.raw, line:0, reason:u.reason || 'unsure' }; });
  const source = deskSource('agent', 'ledger', String(text || ''), { reader: 'maitre/' + model });
  const file = readDeskFile({ format:'oot-menu-desk', version:1, createdAt: now, source: source, items: items, unsorted: unsorted });
  if(!file) return null;
  file.hers = hers;   /* not a desk field: read once by importAskMaitre and dropped */
  return file;
}

function importAskMaitre(confirmed){
  const i = state.menu.imp;
  const m = maitreHere();
  const text = String(i.text || '');
  if(!m){ importErr(MAITRE_NOT_IN_BUILD); render(); return; }
  if(!text.trim()){ importErr('Paste the menu first: she reads what is in the box.'); render(); return; }
  if(!m.online()){ importErr(MAITRE_ONLINE_ONLY); render(); return; }
  if(!m.settings.hasKey()){ m.openSettings(); return; }
  i.busy = 'Asking ' + MAITRE_NAME.replace(/^The/, 'the') + '. Nothing is saved until you say so.';
  i.err = ''; i.confirm = false; render();
  m.readMenu({ text: text }, { wing:'ledger', confirmed: !!confirmed, onProgress: function(p){
    if(p && p.text){ i.busy = p.text; const el = document.getElementById('imp-busy'); if(el) el.textContent = p.text; }
  } }).then(function(res){
    i.busy = '';
    const file = deskFromMaitre(res, text);
    if(!file){ importErr(m.copy.schema); render(); return; }
    const hers = file.hers || {}; delete file.hers;
    const out = menuDraftsFromDesk(file);
    out.drafts.forEach(function(d){
      const h = hers[d.item.raw];
      if(!h) return;
      const block = {};
      ['method','glass','garnish'].forEach(function(f){ if(h[f]) block[f] = { value: h[f], by:'maitre', ts: Date.now(), model: file.source.reader.replace(/^maitre\//, '') }; });
      if(Object.keys(block).length) d.rec.maitre = block;
    });
    importTakeDesk(out, 'agent');
    render();
  }, function(e){
    i.busy = '';
    if(e && e.code === 'confirm'){ importErr(e.message); i.confirm = true; }
    else if(e && e.code === 'no-key'){ m.openSettings(); }
    else importErr((e && e.message) || m.copy.offline);
    render();
  });
}

/* ---- the doors ---------------------------------------------------------- */

/* The two engines, in this order and never the other way round: the offline
   reader is the normal route, and she is the second. Every state has words:
   here with a key (the estimate and this month's spend), here without one
   (bring her in), here but offline (read it here for now), fetchable (bring
   her in), or not in this build (a sentence, not a button). */
function importEngineRowHTML(){
  const i = state.menu.imp;
  const m = maitreHere();
  const bring = '<button class="chip" data-act="maitre-open">' + esc(MAITRE_NAME) + ' is not here yet: bring her in ▸</button>';
  let hers;
  if(m){
    if(!m.settings.hasKey()) hers = bring;
    else if(!m.online()) hers = '<span class="tiny dim lh">' + esc(MAITRE_ONLINE_ONLY) + '</span>';
    else {
      let est = null, spend = '';
      try {
        est = m.estimate('read', { text: i.text || '' });
        spend = m.money(m.ledger.total()) + ' of ' + m.money(m.settings.get().capUsd) + ' used this month.';
      } catch(e){ est = null; }
      hers = (i.confirm
          ? '<button class="btn btn-ghost" data-act="desk-engine" data-c="1">Yes, ask her</button>'
          : '<button class="btn btn-ghost" data-act="desk-engine">Ask ' + esc(MAITRE_NAME.replace(/^The/, 'the')) + ' to read it</button>')
        + '<span class="tiny dim lh">' + (est ? esc(est.text) + '. ' : '') + 'Sends the menu text to Anthropic. ' + esc(spend) + '</span>';
    }
  } else if(maitreLoadable()) hers = bring;
  else hers = '<span class="tiny dim lh">' + esc(MAITRE_NOT_IN_BUILD) + '</span>';
  return '<div class="col-sm" style="gap:8px">'
    + '<div class="row" style="gap:8px;flex-wrap:wrap;align-items:center"><button class="btn btn-brass" data-act="imp-read">Read it here</button>'
    + '<span class="tiny dim lh">On this device. Free, instant, works offline.</span>'
    + (i.text ? '<button class="chip" data-act="imp-clear">Clear</button>' : '') + '</div>'
    + '<div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">' + hers + '</div>'
    + '</div>';
}

/* "This menu was read on the World Table today at 14:02. 4 cocktails are
   already waiting here." The never-twice answer, with the two ways on. */
function importAlreadySaid(a){
  const n = a.share.length;
  const taken = a.file.taken && a.file.taken.cocktail;
  return 'This menu was read ' + readInName(a.file.source.readIn) + ' ' + whenRead(a.file.source.at) + '. '
    + (n ? n + ' cocktail' + (n === 1 ? ' is' : 's are') + ' already waiting here.'
         : taken ? 'Its cocktails were taken here ' + whenRead(taken) + '.'
         : 'None of its rows was read as a cocktail.');
}
function importAlreadyHTML(){
  const a = state.menu.imp.already;
  if(!a) return '';
  const n = a.share.length;
  const said = importAlreadySaid(a);
  /* a plain panel: the sentence was said through #live when it was found
     (importFromText), and a role=alert here would say it again on every
     act while the panel stands, wrapped round two buttons */
  return '<div class="panel p4 col-sm" style="gap:8px">'
    + '<div class="small lh">' + esc(said) + '</div>'
    + '<div class="row" style="gap:6px;flex-wrap:wrap">'
    + (n ? '<button class="chip" data-act="desk-open">Look them over</button>' : '')
    + '<button class="chip" data-act="imp-again">Read it again anyway</button></div></div>';
}

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
      + '<div class="small dim lh">Select the menu wherever it lives, copy it, and drop the whole thing in: the desk sorts it. '
      + 'Cocktails stay here for the bar, dishes go to the World Table and wines to the Codex. This is the '
      + 'door that works on every device with no connection at all.</div>'
      + '<textarea class="input" id="imp-text" rows="8" aria-label="The menu" placeholder="COCKTAILS&#10;&#10;Garden Gimlet - Gin, elderflower, cucumber, lime   14&#10;Paloma&#10;12&#10;tequila | grapefruit | lime | soda">'+esc(i.text)+'</textarea>'
      + importEngineRowHTML()
      + (i.busy ? '<div class="small" id="imp-busy" role="status">'+esc(i.busy)+'</div>' : '')
      + importAlreadyHTML()
      + '<div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">'
      + '<button class="chip" data-act="desk-import-file">Import a desk file</button>'
      + '<input type="file" id="desk-file" accept=".json,application/json" aria-label="Desk file" style="display:none">'
      + '<span class="tiny dim lh">The menu-desk file another device downloaded from one of the three apps. Its rows come here to look over; nothing is saved until you add them.</span>'
      + '</div></div>';
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
      + '<div class="tiny dim lh">Your bar’s address is fetched from this browser or not at all. There is no relay '
      + 'of ours in the middle, because the promise that the venue’s list lives only on this device would stop '
      + 'being true the moment there was one. The one exception is a button you press yourself: ask '
      + esc(MAITRE_NAME.replace(/^The/, 'the')) + ' to read a menu and the text you hand her goes to Anthropic on your own key, '
      + 'and nowhere else.</div></div>';
  }
  return '<div class="panel p5 col" style="gap:12px">'
    + '<div class="eyebrow">The Menu Desk</div>'
    + '<div class="row" style="gap:6px;flex-wrap:wrap">'+chips+'</div>'
    + body
    + (i.err ? '<div class="small lh" style="color:var(--oxblood-text)">'+esc(i.err)+'</div>' : '')
    /* the way through, as a control rather than as a sentence: a refusal that
       only describes the next step makes the reader do the work of finding it */
    + (i.openUrl ? '<div class="row"><a class="btn btn-ghost tiny" href="'+esc(i.openUrl)+'" target="_blank" rel="noopener noreferrer">Open the page</a></div>' : '')
    + '</div>';
}

/* ---- the other rooms ------------------------------------------------------
   "9 wines are waiting in the Codex ▸ · 31 dishes are waiting on the World
   Table ▸" once they are handed on; the inbox's own sentence and the download
   when they could not be; the download and the live suite's doors when this
   build is not on the shared origin. */
function importRoomsHTML(){
  const i = state.menu.imp;
  const h = i.handed;
  if(!h || (!h.dishes && !h.wines)) return '';
  const room = function(n, kind){
    if(!n) return '';
    const noun = kind === 'wine' ? (n === 1 ? 'wine' : 'wines') : (n === 1 ? 'dish' : 'dishes');
    return n + ' ' + noun;
  };
  const link = function(n, kind){
    if(!n) return '';
    const verb = n === 1 ? ' is' : ' are';
    return '<a class="chip" href="'+esc(deskRoomHref(kind))+'">' + esc(room(n, kind) + verb + ' waiting ' + (kind === 'wine' ? 'in' : 'on') + ' ' + deskRoomName(kind)) + ' ▸</a>';
  };
  const dl = '<button class="chip" data-act="desk-download">Download the desk file</button>';
  let inner;
  if(h.ok){
    inner = '<div class="row" style="gap:6px;flex-wrap:wrap">' + link(h.wines, 'wine') + link(h.dishes, 'dish') + '</div>';
  } else if(h.shared){
    inner = '<div class="small lh">' + esc(h.said) + '</div><div class="row">' + dl + '</div>';
  } else {
    const what = [room(h.wines, 'wine'), room(h.dishes, 'dish')].filter(Boolean).join(' and ');
    inner = '<div class="small lh">' + esc(what + ' read for ' + [h.wines ? 'the Codex' : '', h.dishes ? 'the World Table' : ''].filter(Boolean).join(' and ')
      + '. This copy of the Ledger does not share a desk with them, so download the desk file and import it there.') + '</div>'
      + '<div class="row" style="gap:6px;flex-wrap:wrap">' + dl
      + (h.wines ? '<a class="chip" href="'+esc(deskRoomHref('wine'))+'" target="_blank" rel="noopener noreferrer">The Codex ▸</a>' : '')
      + (h.dishes ? '<a class="chip" href="'+esc(deskRoomHref('dish'))+'" target="_blank" rel="noopener noreferrer">The World Table ▸</a>' : '')
      + '</div>';
  }
  return '<div class="col-sm" style="gap:6px"><div class="eyebrow">Waiting elsewhere</div>' + inner + '</div>';
}

/* ---- the review list ---------------------------------------------------- */
function importReviewHTML(){
  const i = state.menu.imp;
  if(!i.drafts) return '';
  const n = i.drafts.length;
  const fromLine = i.file && (i.from === 'inbox' || i.from === 'file')
    ? '<div class="small lh"><span class="bold">From the Menu Desk.</span> Read ' + esc(readInName(i.file.source.readIn) + ', ' + whenRead(i.file.source.at)) + '.</div>'
    : i.from === 'agent'
      ? '<div class="small lh">Read by ' + esc(MAITRE_NAME.replace(/^The/, 'the')) + '. Every row still shows the line it came from.</div>'
      : '';
  if(!n){
    const done = i.filed || i.dropped || i.moved;
    return (done || i.handed)
      ? '<div class="panel p5 col" style="gap:10px">'
        + (done ? '<div class="small lh tc">'+i.filed+' drink'+(i.filed===1?'':'s')+' added to your menu'
          + (i.dropped ? ', '+i.dropped+' left behind' : '')
          + (i.moved ? ', '+i.moved+' sent to the other rooms' : '')+'.</div>' : '')
        + importRoomsHTML()
        + (done ? '<div class="row" style="justify-content:center"><button class="btn btn-ghost" data-act="menu-view" data-v="menu">See the menu</button></div>' : '')
        + '</div>'
      : '';
  }
  /* "the N that read cleanly": high confidence, a spec of two or more parts,
     and not already on the list. Everything else still has to be looked at,
     which is the point of the screen. */
  const sure = i.drafts.filter(importReadCleanly).length;
  const photo = i.file && i.file.source.kind === 'photo';
  const head = '<div class="panel p5 col" style="gap:10px">'
    + '<div class="row between"><div class="eyebrow">'+n+' row'+(n===1?'':'s')+' to look at</div>'
    + '<button class="chip tiny" data-act="imp-clear">Start over</button></div>'
    + (i.counts ? '<div class="small lh">' + esc(countsLine(i.counts)) + '</div>' : '')
    + fromLine
    + (photo ? '<div class="small lh">Check the prices: a reader mistakes 8 for 3 and drops decimals.</div>' : '')
    + (i.file && i.file.notice ? '<div class="small lh">' + esc(i.file.notice) + '</div>' : '')
    + '<div class="small dim lh">Nothing is saved until you say so. Every row shows the line it came from, and '
    + 'every blank is a blank on purpose: a menu prints no measures, no method and no glass, and guessing them '
    + 'would put numbers in the batching and costing sheets that came from nowhere.</div>'
    + (sure ? '<div class="row"><button class="btn btn-brass" data-act="imp-file-sure">Add the '+sure+' that read cleanly</button></div>' : '')
    + importRoomsHTML()
    + (i.skipped.length ? '<div class="tiny dim lh">'+i.skipped.length+' line'+(i.skipped.length===1?'':'s')
        +' were read and left out: '+esc(i.skipped.slice(0,4).join(' · '))
        +(i.skipped.length>4?' · …':'')+'</div>' : '')
    + '</div>';

  const rows = i.drafts.map(function(d, k){
    const open = i.open === k;
    if(open) return importOpenRowHTML(d, k);
    /* A word and a rule, never a colour on its own: this gets read at an
       angle on a bench under a hot lamp. */
    const flags = [];
    if(d.existing) flags.push('already on your list');
    if(d.unsure) flags.push('Not sure what this is');
    else if(d.confidence === 'low') flags.push('needs a look');
    if(d.priceBlanked) flags.push('No price on this line');
    if(photo && d.rec.price) flags.push('Photo: check the price');
    const flagHTML = flags.map(function(f){ return '<span class="chip tiny">'+esc(f)+'</span>'; }).join(' ');
    const hers = d.rec.maitre
      ? '<div class="tiny dim">Hers, not yet kept: ' + esc(['method','glass','garnish'].filter(function(f){ return d.rec.maitre[f]; }).map(function(f){ return f + ' ' + d.rec.maitre[f].value; }).join(' · ')) + '. Keep or discard each on the drink once it is added.</div>'
      : '';
    return '<div class="panel p4 col-sm" style="gap:6px">'
      + '<div class="row between" style="flex-wrap:wrap;gap:6px">'
      + '<span class="bold">'+esc(d.rec.name)+'</span>'
      + '<span class="tiny dim">'+esc(d.rec.spirit)+(d.rec.price ? ' · '+esc(d.rec.price) : '')+(d.item && d.item.section ? ' · '+esc(d.item.section) : '')+'</span>'
      + flagHTML + '</div>'
      + (d.rec.spec.length
          ? '<div class="tiny dim">'+esc(d.rec.spec.join(' · '))+'</div>'
          : '<div class="tiny dim">no spec read</div>')
      + hers
      + '<div class="tiny dim">'+esc(d.why)+'</div>'
      + ((d.confidence === 'low' || d.priceBlanked) && d.raw ? '<div class="tiny dim">from: '+esc(d.raw)+'</div>' : '')
      + '<div class="row" style="gap:6px;flex-wrap:wrap">'
      + '<button class="chip" data-act="imp-open" data-k="'+k+'">Look at it</button>'
      + '<button class="chip" data-act="imp-file" data-k="'+k+'">Add as is</button>'
      + '<button class="chip" data-act="imp-drop" data-k="'+k+'">Leave it out</button>'
      + '<button class="chip" data-act="desk-kind" data-k="'+k+'" data-d="dish">It is a dish</button>'
      + '<button class="chip" data-act="desk-kind" data-k="'+k+'" data-d="wine">It is a wine</button>'
      + '</div></div>';
  }).join('');
  return head + '<div class="col-sm" style="gap:8px">'+rows+'</div>';
}

/* The rule "Add the N that read cleanly" files by, in one place so the count
   on the button and the run behind it cannot disagree. */
function importReadCleanly(d){
  return d.confidence === 'high' && !d.existing && !d.unsure && d.rec.spec.length >= 2;
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

/* ---- the desk's share, where the Menu tab and Home can see it -------------
   The inbox is read here and nowhere earlier, and only when a share is
   waiting is there anything to draw. Hidden while that very share is on the
   review list, or the chip would offer what is already on screen. */
function deskWaitingHTML(where){
  let f = null;
  try { f = deskInbox.read(); } catch(e){ f = null; }
  if(!f) return '';
  const share = deskInbox.share(f, 'cocktail');
  if(!share.length) return '';
  const i = state.menu.imp;
  if(where === 'menu' && i && i.drafts && i.file && i.file.source && i.file.source.hash === f.source.hash) return '';
  const n = share.length;
  const when = readInName(f.source.readIn) + ', ' + whenRead(f.source.at);
  if(where === 'home'){
    return '<div class="panel p4 col-sm" style="gap:6px">'
      + '<div class="small lh"><span class="bold">'+n+' cocktail'+(n===1?'':'s')+' from the Menu Desk '+(n===1?'is':'are')+' waiting.</span> Read '+esc(when)+'.</div>'
      + '<div class="row"><button class="chip" data-act="desk-open">Look them over</button></div></div>';
  }
  return '<div class="panel p4 row" style="gap:10px;flex-wrap:wrap;align-items:center">'
    + '<button class="chip brass" data-act="desk-open">'+n+' cocktail'+(n===1?'':'s')+' from the Menu Desk</button>'
    + '<span class="tiny dim lh">Read '+esc(when)+'. Nothing is saved until you look them over.</span></div>';
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
      importErr((res && res.note) || 'Nothing legible came off that photograph. A flat, straight shot in good '
        + 'light reads best. Failing that, most phones will let you select the text on the photo itself: '
        + 'copy it and use Paste the text.');
      render(); return;
    }
    i.door = 'paste'; i.text = res.text;
    importFromText(res.text, 'photo');
    render();
  }).catch(function(){
    i.busy = '';
    importErr('That file could not be read as an image.');
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
    importErr(host + ' does not let another site read its pages, and a menu posted there is usually a picture '
      + 'anyway. Open the post, select the text if there is any, and use Paste the text.');
    i.openUrl = /^https?:/i.test(url) ? url : 'https://' + url;
    render(); return;
  }
  i.busy = 'Asking that page…'; i.err = ''; render();
  linkToText(url).then(function(res){
    i.busy = '';
    if(res && res.ok && res.text && res.text.trim()){
      i.door = 'paste'; i.text = res.text;
      importFromText(res.text, 'link');
      render(); return;
    }
    /* The refusal is the main path, not the error path. Say the reason, give a
       way to open the page, and say the thing that actually works. */
    const open = (res && res.openUrl) || url;
    importErr(((res && res.reason) || 'That page could not be read from here.')
      + ' Open it, select the menu, and use Paste the text: that always works.');
    i.openUrl = open;
    render();
  }).catch(function(){
    i.busy = '';
    importErr('That did not look like a web address. It needs to start with https://');
    render();
  });
}
