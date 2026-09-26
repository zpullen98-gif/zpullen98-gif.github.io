/* ═══════════════ CODEX XXIV: THE MENU DESK, AND THE MAÎTRE D’ ═══════════════

   The owner pasted a restaurant's whole menu into this app and got nothing
   usable: the old paste screen read one line at a time with the price at the
   end, saved one bottle at a time, and read region, grape and vintage only
   from the 665-producer corpus, never from the printed text. A 150-bottle
   cellar list was 150 taps and a Puligny that the list called Chardonnay
   from Burgundy came back with neither word on it.

   THIS LAYER PUTS THE MENU DESK IN FRONT OF THE CELLAR. The reader is the
   World Table's, ported as js/menu-desk.js: paste a whole menu, or the wine
   list alone, and it comes back sorted into dishes, wines and cocktails,
   every row carrying the lines it came from. The wine half, js/wine-rows.js,
   turns each wine row into a draft bottle with the page's own region, grape,
   style and pours FIRST and the corpus asked only about what the page left
   empty, each field naming its source. This layer is the screens around
   that: the door, the review list, the one-tap adoption, the inbox the three
   apps share on one origin, and the two lines the Maître d’ may write on a
   bottle when she is brought in.

   FIVE THINGS THIS FILE DOES, and the rule each one keeps:

   1. THE REVIEW LIST IS READ-ONLY TEXT. This app has no caret preservation
      anywhere (codex16, note 2): a grid of forty editable rows would mint
      forty sets of live inputs and every re-render would throw the caret. So
      every row is text with per-row chips, and "Look at it" loads the ONE
      cellar form that is already proved safe, through codex16's own review
      path, one bottle at a time. The form is still the only place a field is
      typed.

   2. NOTHING IS SAVED UNTIL A PERSON SAYS SO, AND THEN ONCE. "Add as is"
      files one draft; "Add all N that read cleanly" files the high-confidence
      wines that are not already on the list, after showing their names, and
      cellarAddMany saves ONCE for the whole batch: stSave on every bottle of a
      150-row list is 150 writes of the whole record for no reason. Each draft
      goes through cellarSanitize, the same coercion an import gets, because a
      draft came from a page and a page is a file.

   3. THE DESK FILE IS A DRAFT, NEVER A STORE. The inbox (oot-menu-desk-v1,
      shared by the three apps on the one origin) and the downloadable desk
      file are read into THIS review list and nowhere else; a row reaches
      ST.cellar only through the form or cellarAddMany. A row the person says
      is a dish or a cocktail is read again as that kind and put back on the
      desk for the kitchen or the bar, never dropped. When the run ends with
      every row decided the wines are marked taken so the same share is never
      offered twice; with rows still undecided the share waits, and the band
      offers it again. A figure the page did not print never reaches a field:
      wineRowFromDesk blanks it and the row says so.

   4. HER LINES ARE HERS UNTIL KEPT. A bottle may carry `maitre`: the two
      lines she writes (say, guest), each marked by 'maitre' or 'person' with
      a stamp, and the answers a person chose to keep from her chat. Unkept
      marks are shown with the eyebrow "Hers, not yet kept" and reach no
      drill and no recitation; Keep and Edit both make a mark the person's.
      cellarSanitize is reassigned at call time to carry the field (the
      codebase's own way of extending an earlier layer) and the transfer
      merge unions `kept` on ts|q so two devices never lose an answer.
      NOTHING HERE WRITES IN HER VOICE: the UI never invents a line; a mark
      exists only because she wrote it or a person typed it.

   5. NO ALLERGEN ANYTHING. The desk row has no such field, the bottle has no
      such field, and nothing in this file derives one.

   THE MAÎTRE D’ HERSELF lives in the shared client, window.OOT.maitre, which
   the suite loads lazily on the one origin and which this standalone build
   never carries. Every door here asks three questions at press time and says
   the answer in words: she is here (with her key on this device the second
   engine reads the paste and says what it costs; with no key the door opens
   her settings); she is not here but the suite can fetch her (the door
   fetches her through OOT.loadShared and then opens her settings, so the
   first press on the suite is never a dead one); or this build has no way to
   bring her in (the sentence says so and names the family line). The trap
   the third question guards: on the suite she is absent until a door asks
   for her, so a door that reads only OOT.maitre would tell every suite
   visitor she is not in this build, which is false there. No door is ever
   dead and no button is ever disabled.

   THE SCREEN READER IS TOLD. index.html gains #live, a role=status region
   outside #app so no render() empties it, and say() writes every count,
   every adoption and every refusal there. toast() is visual only.

   House rules observed: a new layer, no edits to earlier files except the
   wine half this layer is built on; top-level declarations are var/function
   only so a later layer can rebind them; no pictorial glyphs; British
   English; every control at least 44px (css/codex.css, the .desk rules);
   word-plus-rule flags, never colour alone. */

/* ═══════════ helpers ═══════════ */

function v24Esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function v24Plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

function v24Fold(s) {
  return (typeof wineFold === 'function') ? wineFold(s) : String(s == null ? '' : s).toLowerCase();
}

function v24Clone(o) { return JSON.parse(JSON.stringify(o)); }

/* The three apps share an origin only in the suite, where this wing is served
   under /codex beside /table and /ledger. That is the one place the inbox can
   be read by the app it is meant for, so it is the whole test for whether the
   "waiting elsewhere" doors are shown. Anywhere else the download is the way
   a menu travels. */
function v24Shared() {
  try { return /^\/codex(\/|$)/.test(location.pathname); } catch (e) { return false; }
}

/* The shared client, when this build carries it. Checked at press time,
   never cached: the suite loads it lazily and it may arrive after this file. */
function v24Maitre() {
  try { return (typeof OOT !== 'undefined' && OOT && OOT.maitre) ? OOT.maitre : null; }
  catch (e) { return null; }
}

/* Whether this build can fetch her when she is not here. The suite's
   shared/oot-config.js carries OOT.loadShared, which appends a script tag
   beside the nine that load on every page so the file wears the same ?v=
   and the lockstep bump reaches it; the standalone build has no OOT at all.
   That is the whole test, and it is why "not in this build" is said only
   when this returns false. */
function v24MaitreLoadable() {
  try { return typeof OOT !== 'undefined' && !!OOT && typeof OOT.loadShared === 'function'; }
  catch (e) { return false; }
}

/* Opens her key screen, fetching the client first when the suite has not
   yet. Returns false only when this build has no way to bring her in, and
   the caller says so; every other path ends in her screen or in one honest
   sentence. `onHere(m)` runs once her screen is open, for a caller whose
   row must redraw around her; `onFail(text)` gets the sentence, and by
   default it is said and toasted, because the tile that presses this sits
   on the home screen with no error slot of its own.

   The name handed to the loader is the FILE name, 'oot-maitre.js', because
   that is what the Ledger (ui-import.js maitreOpenSettings) and the World
   Table (src/lib/maitre.ts MAITRE_SCRIPT) hand the same loader: one function
   serves three wings, and a wing that asked for a different spelling would
   be the one whose door never opens, with nothing on screen.

   The loader's promise settles on the tag's own load event, after the script
   has run, so OOT.maitre is there when it resolves; a rejection means the
   file did not come, which on a site that never blocks its own files means
   offline, and the loader forgets a failed load so the next press tries
   afresh. She is still looked for after the resolve rather than assumed: a
   copy of the file that loaded and defined nothing would otherwise open
   nothing and say nothing. */
function v24OpenMaitre(onHere, onFail) {
  var fail = function (text) {
    say(text);
    if (typeof toast === 'function') toast(text);
    if (typeof onFail === 'function') onFail(text);
  };
  var open = function (her) {
    her.openSettings();
    if (typeof onHere === 'function') onHere(her);
  };
  var m = v24Maitre();
  if (m) { open(m); return true; }
  if (!v24MaitreLoadable()) return false;
  var p = null;
  try { p = OOT.loadShared('oot-maitre.js'); } catch (e) { p = null; }
  if (!p || typeof p.then !== 'function') { fail(V24_ONLINE_ONLY); return true; }
  p.then(function () {
    var her = v24Maitre();
    if (her) open(her); else fail(V24_ONLINE_ONLY);
  }, function () { fail(V24_ONLINE_ONLY); });
  return true;
}

function v24Inbox() {
  try { return (typeof deskInbox !== 'undefined' && deskInbox) ? deskInbox.read() : null; }
  catch (e) { return null; }
}

function v24Share(file, kind) {
  try { return file ? deskInbox.share(file, kind) : []; } catch (e) { return []; }
}

/* THE WORDS ARE THE PORT'S OWN. "today at 14:02", "on the World Table" and
   "Read 47 lines: 31 dishes for the kitchen, 9 wines for the cellar, 4
   cocktails for the bar, 3 I could not place." come from desk-share.ts,
   carried into js/menu-desk.js with the reader, and are called rather than
   copied: a band that reads one way in the Codex and another on the World
   Table is two products, and a copy is how that happens. The three names
   below are the seam the screens call. Local time on the stamp, because the
   person reading it was there. */
function v24WhenRead(iso, now) { return whenRead(iso, now); }

function v24ReadIn(readIn) { return readInName(readIn); }

function v24CountsLine(file) {
  return countsLine(deskCounts((file && file.items) || [], (file && file.unsorted) || []));
}

/* ═══════════ the live region ═══════════
   One #live outside #app, so no render() takes it down. Cleared and then set
   on a tick, because a live region handed the same sentence twice announces
   it once. Created here if index.html did not carry it, which is the case for
   a wing whose shell has not been rebuilt yet. */
function say(text) {
  try {
    var n = document.getElementById('live');
    if (!n) {
      n = document.createElement('div');
      n.id = 'live'; n.className = 'sr-only';
      n.setAttribute('role', 'status');
      n.setAttribute('aria-live', 'polite');
      n.setAttribute('aria-atomic', 'true');
      document.body.appendChild(n);
    }
    n.textContent = '';
    setTimeout(function () { n.textContent = String(text || ''); }, 30);
  } catch (e) { /* a voice that fails is not a reason to stop */ }
}

/* ═══════════ her marks on a bottle ═══════════ */

var V24_MARK_FIELDS = ['say', 'guest', 'why', 'pairs', 'origin'];
var V24_KEPT_CAP = 50;

/* One mark, coerced: a value, who made it, when. An import is a FILE. */
function v24SanitiseMark(m) {
  if (!m || typeof m !== 'object' || typeof m.value !== 'string' || !m.value) return null;
  var out = { value: m.value.slice(0, 600), by: m.by === 'person' ? 'person' : 'maitre', ts: Number(m.ts) || 0 };
  if (typeof m.model === 'string' && m.model) out.model = m.model.slice(0, 60);
  return out;
}

function v24SanitiseMaitre(m) {
  if (!m || typeof m !== 'object') return null;
  var out = {};
  V24_MARK_FIELDS.forEach(function (k) {
    var mark = v24SanitiseMark(m[k]);
    if (mark) out[k] = mark;
  });
  if (Array.isArray(m.kept)) {
    var kept = [];
    m.kept.forEach(function (k) {
      if (!k || typeof k !== 'object' || typeof k.q !== 'string' || typeof k.a !== 'string' || !k.a) return;
      var row = { q: k.q.slice(0, 600), a: k.a.slice(0, 2000), ts: Number(k.ts) || 0 };
      if (typeof k.model === 'string' && k.model) row.model = k.model.slice(0, 60);
      if (kept.length < V24_KEPT_CAP) kept.push(row);
    });
    if (kept.length) out.kept = kept;
  }
  return Object.keys(out).length ? out : null;
}

/* The winner's marks, and kept unioned on ts|q, the same rule the World
   Table's mergeMaitre and the Ledger's backup merge keep. Union is
   idempotent, which is what lets the same file land twice and change
   nothing the second time. */
function v24UnionKept(a, b) {
  var seen = {}, out = [];
  [].concat(a || [], b || []).forEach(function (k) {
    if (!k) return;
    var key = (k.ts || 0) + '|' + k.q;
    if (seen[key]) return;
    seen[key] = 1; out.push(k);
  });
  out.sort(function (x, y) { return (x.ts || 0) - (y.ts || 0); });
  return out.slice(-V24_KEPT_CAP);
}

/* cellarSanitize is codex12's coercion for a bottle that arrived in a file,
   and every import runs through it. Reassigned so `maitre` rides along,
   coerced the same way; the nine fields are untouched. */
var _v24CellarSanitize = (typeof cellarSanitize === 'function') ? cellarSanitize : null;
if (_v24CellarSanitize) {
  cellarSanitize = function (b) {
    var out = _v24CellarSanitize(b);
    var m = v24SanitiseMaitre(b && b.maitre);
    if (m) out.maitre = m;
    return out;
  };
}

function v24BottleById(id) {
  var hit = null;
  (ST.cellar || []).some(function (x) { if (x && x.id === id) { hit = x; return true; } return false; });
  return hit;
}

/* The same bottle, spelled twice: producer, wine and vintage folded. */
function v24BottleKey(b) {
  return v24Fold(b.producer) + '|' + v24Fold(b.name) + '|' + v24Fold(b.vintage);
}

/* ═══════════ the one-tap adoption ═══════════
   Mint ids, stamp ts, coerce each row, skip what is already on the list,
   push, and save ONCE. Returns the tally so the screen can say it. */
function cellarAddMany(rows) {
  ST.cellar = ST.cellar || [];
  var have = {};
  ST.cellar.forEach(function (b) { have[v24BottleKey(b)] = 1; });
  var added = 0, dup = 0, refused = 0, ts = Date.now();
  (rows || []).forEach(function (r) {
    if (!r) { refused++; return; }
    var rec = cellarSanitize({
      id: mintBottleId(), ts: ts,
      producer: r.producer, name: r.name, vintage: r.vintage, region: r.region,
      grapes: r.grapes, style: r.style, glass: r.glass, bottle: r.bottle, note: r.note,
      maitre: r.maitre
    });
    /* The cellar form's own rule: a bottle needs a producer or a wine name. */
    if (!rec.producer && !rec.name) { refused++; return; }
    var k = v24BottleKey(rec);
    if (have[k]) { dup++; return; }
    have[k] = 1;
    ST.cellar.push(rec);
    added++;
  });
  if (added) stSave();
  return { added: added, dup: dup, refused: refused };
}

/* ═══════════ the desk on this screen ═══════════
   S._desk = { from: 'paste'|'agent'|'inbox'|'file', file, rows, look, handed }
   rows[i] = { item, draft, status: ''|'added'|'left'|'moved', said }
   S._deskText keeps the paste across a re-render of the box. */

function v24Corpus() {
  try { return (typeof prodCorpus === 'function') ? prodCorpus() : []; } catch (e) { return []; }
}

function v24Row(item, corpus) {
  return { item: item, draft: wineRowFromDesk(item, corpus), status: '', said: '' };
}

/* Which of the file's rows this room shows. A paste made here, and her read
   of it, show every row: this is the wine list door and a person, not the
   sorter, has the last word. A desk file and the inbox are the whole menu
   sorted by another room, so the Codex takes its share and leaves the rest. */
function v24RowsFor(file, from) {
  var items = (from === 'paste' || from === 'agent') ? (file.items || []) : v24Share(file, 'wine');
  var corpus = v24Corpus();
  return items.map(function (item) { return v24Row(item, corpus); });
}

function v24LoadDesk(file, from) {
  S._desk = { from: from, file: file, rows: v24RowsFor(file, from), look: null, handed: false };
  S._wimp = null; S._wimpReport = null;
  S.view = 'menudesk';
  render();
  /* The file's notice (a photograph or a PDF she could not check) is said
     here, once, with the counts: the band on the list is plain text, because
     a role=alert node re-announces itself on every re-render of the list. */
  say(v24CountsLine(file) + (file.notice ? ' ' + file.notice : '')
    + (S._desk.rows.length ? '' : ' Nothing here is for the cellar.'));
}

function v24OpenDesk(from) {
  if (from === 'inbox') {
    var file = v24Inbox();
    if (file && v24Share(file, 'wine').length) { v24LoadDesk(file, 'inbox'); return; }
    /* Gone between the band and the tap: thirty days, or another tab. */
    S._desk = null; S.view = 'menudesk'; render();
    say('Nothing is waiting at the desk now.');
    return;
  }
  S._desk = null; S._wimp = null; S.view = 'menudesk'; render();
}

/* Word-plus-rule flags for a row. The rule is in the title so a reader who
   wants it has it; the word is what the row shows. */
function v24Flags(row, file) {
  var d = row.draft, flags = [];
  if (d.kindRead !== 'wine' && d.kindRead !== 'unsure') {
    flags.push('Read as a ' + d.kindRead);
  } else if (d.kindRead === 'unsure') {
    flags.push('Not sure what this is');
  }
  if (d.kindRead === 'wine' && d.confidence !== 'high') flags.push('Check this row');
  if (d.kindRead === 'wine' || d.kindRead === 'unsure') {
    if (v24IsOnList(d)) flags.push('Already on the list');
    /* wineRowFromDesk has already blanked every figure the page did not
       print and listed it in priceBlanked, so the flag here is a word for
       what was done, not a warning about what is about to be filed. The
       substring look stays as the belt for a draft built any other way. */
    var raw = v24Fold(d.raw).replace(/\s+/g, ' ');
    var missing = [d.glass, d.bottle].some(function (p) {
      return p && raw.indexOf(v24Fold(p).replace(/\s+/g, ' ')) < 0;
    });
    if (missing || (d.priceBlanked && d.priceBlanked.length)) flags.push('No price on this line');
  }
  if (file && file.source && file.source.kind === 'photo') flags.push('Photo: check the price');
  return flags;
}

function v24IsOnList(d) {
  var k = v24BottleKey(d);
  return (ST.cellar || []).some(function (b) { return v24BottleKey(b) === k; });
}

/* A wine the desk read with a price and without doubt, not yet on the list. */
function v24IsClean(row, file) {
  var d = row.draft;
  if (row.status || d.kindRead !== 'wine' || d.confidence !== 'high') return false;
  if (!d.producer && !d.name) return false;
  var flags = v24Flags(row, file);
  return flags.indexOf('Already on the list') < 0 && flags.indexOf('No price on this line') < 0
    && flags.indexOf('Photo: check the price') < 0;
}

function v24DraftLabel(d) {
  if (d.kindRead === 'wine' || d.kindRead === 'unsure') return bottleLabel(d);
  return d.name || 'Unnamed line';
}

/* The sentence that names the engine and the moment. */
function v24FromLine(desk) {
  var f = desk.file, s = f.source || {};
  if (desk.from === 'inbox') {
    return '<b>From the Menu Desk: ' + v24Plural(desk.rows.length, 'wine', 'wines') + ' waiting.</b> Read '
      + v24Esc(v24ReadIn(s.readIn)) + ', ' + v24Esc(v24WhenRead(s.at)) + '.';
  }
  if (desk.from === 'file') return 'From a desk file, read ' + v24Esc(v24ReadIn(s.readIn)) + ' ' + v24Esc(v24WhenRead(s.at)) + '.';
  if (s.kind === 'agent') return 'Read by the Maître d’. Every row still shows the line it came from.';
  return 'Read here, on this device. Every row shows the line it came from.';
}

/* ═══════════ the paste screen ═══════════ */

var V24_NOT_IN_BUILD = 'The Maître d’ is not in this build: this copy of the Codex reads lists on its own.';
var V24_FAMILY = 'Bring her in with a key of your own on the family site, or ask whoever runs the menu to send you theirs.';
var V24_ASK_ELSEWHERE = 'Ask her on the World Table, where the whole menu is.';
var V24_ONLINE_ONLY = 'The Maître d’ is online only. Read it here for now.';
var V24_HERS = 'Her key, her models, her cap and her ledger, for this device.';

/* The engine row under the paste box, in the three states the header names.
   "Not here yet" with the bring-her door covers both a client that is here
   with no key and one the suite has yet to fetch: the press is the same act
   either way, and the row cannot tell a fetched client with no key from an
   unfetched one without fetching, which is what the press is for. */
function v24EngineHtml(text) {
  var m = v24Maitre();
  var bring = '<span class="desk-note">The Maître d’ is not here yet.</span>'
    + '<button class="btn ghost" type="button" data-act="bring-her">Bring her in</button>';
  if (!m) {
    if (v24MaitreLoadable()) return bring;
    return '<span class="desk-note">' + v24Esc(V24_NOT_IN_BUILD) + ' ' + v24Esc(V24_FAMILY) + '</span>';
  }
  var hasKey = false;
  try { hasKey = !!m.settings.hasKey(); } catch (e) { hasKey = false; }
  if (!hasKey) return bring;
  var line = '';
  try {
    var est = m.estimate('read', { text: text || '' });
    var s = m.settings.get();
    line = v24Esc(est.text) + '. Sends the menu text to Anthropic. '
      + v24Esc(m.money(m.ledger.total())) + ' of ' + v24Esc(m.money(s.capUsd)) + ' used this month.';
  } catch (e) { line = 'Sends the menu text to Anthropic.'; }
  return '<button class="btn ghost" type="button" data-act="ask-her">Ask the Maître d’ to read it</button>'
    + '<span class="desk-note">' + line + '</span>';
}

/* The inbox, for this room and for the other two. */
function v24WaitingHtml() {
  var file = v24Inbox();
  if (!file) return '';
  var wines = v24Share(file, 'wine').length;
  var html = '';
  if (wines) {
    html += '<div class="deskband"><span class="deskband-t"><b>' + v24Plural(wines, 'wine', 'wines')
      + ' from the Menu Desk ' + (wines === 1 ? 'is' : 'are') + ' waiting.</b> Read '
      + v24Esc(v24ReadIn(file.source.readIn)) + ', ' + v24Esc(v24WhenRead(file.source.at)) + '.</span>'
      + '<button class="btn gold" type="button" data-act="look-inbox">Look them over</button></div>';
  }
  if (v24Shared()) {
    var dishes = v24Share(file, 'dish').length, cocktails = v24Share(file, 'cocktail').length;
    if (dishes || cocktails) {
      html += '<div class="desk-note desk-elsewhere">Waiting elsewhere: ';
      var links = [];
      if (dishes) links.push('<a href="../table/menu#desk">' + v24Plural(dishes, 'dish', 'dishes') + ' for the kitchen</a>');
      if (cocktails) links.push('<a href="../ledger/">' + v24Plural(cocktails, 'cocktail', 'cocktails') + ' for the bar</a>');
      html += links.join(' and ') + '.</div>';
    }
  }
  return html;
}

function deskPasteView() {
  var text = S._deskText || '';
  var html = '<div class="desk"><div class="viewhead"><h2>Bring in the list</h2>'
    + '<div class="sub">Paste the wine list as text, or the whole menu: the desk sorts the wines from the '
    + 'dishes and the cocktails. Nothing is saved until you say so, and what the list did not print is '
    + 'left blank rather than guessed.</div></div>'
    + v24WaitingHtml()
    + '<div id="dk-note"></div>'
    + '<textarea id="dk-text" class="sainput" rows="14" spellcheck="false" aria-label="The list, as text" '
    + 'placeholder="CHAMPAGNE\nKrug Grande Cuvee NV      45 / 260\n\nWHITE BY THE GLASS\n'
    + 'Domaine Leflaive Puligny-Montrachet 2021    24 / 110"></textarea>'
    /* The two engines, in this order and never the other way round: the
       offline reader is the normal route, and she is the second. */
    + '<div class="desk-engines"><div class="desk-engine">'
    + '<button class="btn gold" type="button" data-act="read">Read it here</button>'
    + '<span class="desk-note">On this device. Free, instant, works offline.</span></div>'
    + '<div class="desk-engine" id="dk-her">' + v24EngineHtml(text) + '</div></div>';

  /* The photograph and the address doors exist only where this build has a
     reader for them; the Codex has neither today, and a door that opens on
     nothing is worse than no door. */
  if (typeof imageToText === 'function') {
    html += '<div class="secgroup">Or photograph it</div>'
      + '<div class="sarow"><input type="file" id="dk-photo" class="sainput" accept="image/*" aria-label="Photograph the list"></div>'
      + '<div class="desk-note">Check the prices after a photograph: a reader mistakes 8 for 3 and drops decimals.</div>';
  }
  if (typeof linkToText === 'function') {
    html += '<div class="secgroup">Or give it the address</div>'
      + '<div class="sarow"><input type="url" id="dk-url" class="sainput" placeholder="https://" aria-label="The address of the list">'
      + '<button class="btn ghost" type="button" data-act="fetch">Fetch it</button></div>';
  }

  html += '<div class="secgroup">Or bring a desk file</div>'
    + '<div class="sarow"><input type="file" id="dk-file" class="sainput" accept="application/json,.json" aria-label="Import a desk file"></div>'
    + '<div class="desk-note">A desk file is what the World Table or the Ledger downloads after reading a menu: '
    + 'the whole menu, sorted. The Codex takes the wines and leaves the rest where they are.</div>'
    + '<div id="dk-err" class="wimp-note" style="font-style:normal" aria-live="off"></div>'
    + '<div class="sarow"><button class="btn ghost" type="button" data-act="cancel">Back to the list</button></div></div>';

  var v = el(html);
  var ta = v.querySelector('#dk-text');
  if (ta) {
    ta.value = text;
    /* The estimate follows the text; the box itself is never re-rendered. */
    ta.oninput = function () {
      S._deskText = ta.value;
      var her = v.querySelector('#dk-her');
      if (her && v24Maitre()) her.innerHTML = v24EngineHtml(ta.value);
    };
  }
  var fin = v.querySelector('#dk-file');
  if (fin) fin.onchange = function (e) { v24ImportDeskFile(v, e.target.files && e.target.files[0]); };
  var photo = v.querySelector('#dk-photo');
  if (photo) photo.onchange = function (e) { v24Photo(v, e.target.files && e.target.files[0]); };
  v.addEventListener('click', function (e) { v24PasteClick(v, e); });
  return v;
}

function v24Err(view, text) {
  var n = view.querySelector('#dk-err');
  if (n) n.textContent = String(text || '');
  if (text) say(text);
}

function v24PasteClick(v, e) {
  var b = e.target && e.target.closest ? e.target.closest('[data-act]') : null;
  if (!b) return;
  var act = b.getAttribute('data-act');
  if (act === 'read') v24ReadHere(v, false);
  else if (act === 'read-again') v24ReadHere(v, true);
  else if (act === 'look-inbox') v24OpenDesk('inbox');
  else if (act === 'ask-her') v24AskHer(v, false);
  else if (act === 'ask-her-anyway') v24AskHer(v, true);
  else if (act === 'bring-her') {
    /* The row redraws around her once she is here, so a key already on this
       device shows the ask door without a keystroke in the box; the failure
       lands in the row's own error slot as well as the live region. */
    var redraw = function () {
      var her = v.querySelector('#dk-her'), ta = v.querySelector('#dk-text');
      if (her) her.innerHTML = v24EngineHtml(ta ? ta.value : '');
    };
    if (!v24OpenMaitre(redraw, function (t) { v24Err(v, t); })) v24Err(v, V24_NOT_IN_BUILD);
  }
  else if (act === 'fetch') v24Fetch(v);
  else if (act === 'cancel') { S._desk = null; S.view = 'cellar'; render(); }
}

/* NEVER TWICE. The desk keeps a hash of the source; pasting the same text
   here after another room read it says so, and offers the share that is
   already waiting rather than reading it again. "Read it again anyway" is
   the one way past, and it is a deliberate tap. */
function v24ReadHere(v, again) {
  var ta = v.querySelector('#dk-text');
  var text = ta ? ta.value : '';
  if (!text.trim()) { v24Err(v, 'Paste the list first.'); return; }
  S._deskText = text;
  if (!again) {
    var inbox = v24Inbox();
    if (inbox && inbox.source && inbox.source.hash === wineDeskHash(text)) {
      var share = v24Share(inbox, 'wine');
      if (share.length) {
        var note = v.querySelector('#dk-note');
        if (note) {
          /* Plain text, not role=alert: say() below carries the sentence to
             the live region once, and an alert node would say it a second
             time on insertion. */
          note.innerHTML = '<div class="wimp-band"><div class="wimp-note" style="font-style:normal;opacity:.9">'
            + 'This menu was read ' + v24Esc(v24ReadIn(inbox.source.readIn)) + ' ' + v24Esc(v24WhenRead(inbox.source.at))
            + '. ' + v24Plural(share.length, 'wine is', 'wines are') + ' already waiting here.</div>'
            + '<div class="sarow"><button class="btn gold" type="button" data-act="look-inbox">Look them over</button>'
            + '<button class="btn ghost" type="button" data-act="read-again">Read it again anyway</button></div></div>';
        }
        say('This menu was already read. ' + v24Plural(share.length, 'wine is', 'wines are') + ' waiting here.');
        return;
      }
    }
  }
  var out;
  try { out = wineRows(text); }
  catch (e) { v24Err(v, 'The list could not be read: ' + e.message); return; }
  if (!out.rows.length) {
    v24Err(v, 'Nothing in that text looked like a line of a list. A line needs at least a name, and a price '
      + 'helps the reader find where each row ends.' + (out.skipped.length ? ' ' + out.skipped.join(' ') : ''));
    return;
  }
  v24LoadDesk(out.file, 'paste');
}

function v24ImportDeskFile(v, f) {
  if (!f) return;
  var r = new FileReader();
  r.onload = function () {
    var file = null;
    try { file = readDeskFile(String(r.result)); } catch (e) { file = null; }
    if (!file) {
      v24Err(v, 'That file is not a desk file. Choose one that the Menu Desk downloaded; one that was edited or cut short will not open.');
      return;
    }
    var share = v24Share(file, 'wine');
    if (!share.length) {
      v24Err(v, 'That desk file carries nothing for the cellar: ' + v24CountsLine(file));
      return;
    }
    v24LoadDesk(file, 'file');
  };
  r.onerror = function () { v24Err(v, 'That file could not be read.'); };
  r.readAsText(f);
}

/* The two doors this build has no reader for, kept behind their typeof
   guards above. Each reader is expected to take what the person chose and
   resolve to the text on it; the text then goes in the box, and reading it
   is still the person's press. */
function v24Photo(v, f) {
  if (!f || typeof imageToText !== 'function') return;
  v24Err(v, 'Reading the photograph.');
  Promise.resolve(imageToText(f)).then(function (text) {
    var ta = v.querySelector('#dk-text');
    if (ta) { ta.value = String(text || ''); S._deskText = ta.value; }
    v24Err(v, text ? 'The photograph is in the box. Check the prices, then read it.' : 'Nothing could be read off that photograph.');
  }, function (e) { v24Err(v, 'The photograph could not be read: ' + ((e && e.message) || 'no reader answered')); });
}

function v24Fetch(v) {
  if (typeof linkToText !== 'function') return;
  var inp = v.querySelector('#dk-url');
  var url = inp ? inp.value.trim() : '';
  if (!url) { v24Err(v, 'Type the address first.'); return; }
  v24Err(v, 'Fetching the page.');
  Promise.resolve(linkToText(url)).then(function (text) {
    var ta = v.querySelector('#dk-text');
    if (ta) { ta.value = String(text || ''); S._deskText = ta.value; }
    v24Err(v, text ? 'The page is in the box. Read it when you are ready.' : 'That page carried no text to read.');
  }, function (e) { v24Err(v, 'That address could not be fetched: ' + ((e && e.message) || 'no answer')); });
}

/* ═══════════ her read ═══════════
   The second engine. She reads the same paste and hands back a flat desk
   (dishes, wines, cocktails, unsure) with every price already checked
   against the source text by the client; this turns it into the desk file
   the review list reads, so both engines land in ONE shape. Nothing she says
   reaches a row unless readDeskFile accepts it. */
function v24AskHer(v, confirmed) {
  var m = v24Maitre();
  if (!m) return;
  var ta = v.querySelector('#dk-text');
  var text = ta ? ta.value : '';
  if (!text.trim()) { v24Err(v, 'Paste the list first.'); return; }
  var hasKey = false;
  try { hasKey = !!m.settings.hasKey(); } catch (e) { hasKey = false; }
  if (!hasKey) { m.openSettings(); return; }
  if (!m.online()) { v24Err(v, V24_ONLINE_ONLY); return; }
  S._deskText = text;
  v24Err(v, 'Asking the Maître d’.');
  m.readMenu({ text: text }, {
    wing: 'codex', confirmed: !!confirmed,
    onProgress: function (p) { if (p && p.text) v24Err(v, p.text); }
  }).then(function (r) {
    var file = v24DeskFromMaitre(r, text);
    if (!file) {
      v24Err(v, 'I answered in the wrong shape and the app will not take a row it cannot check. Nothing was written.');
      return;
    }
    if (!file.items.length) { v24Err(v, 'She read it and found no line she could place. Read it here instead.'); return; }
    v24LoadDesk(file, 'agent');
  }, function (e) {
    var code = e && e.code;
    if (code === 'confirm') {
      var n = v.querySelector('#dk-err');
      if (n) n.innerHTML = v24Esc(e.message) + ' <button class="btn ghost" type="button" data-act="ask-her-anyway">Yes, ask it</button>';
      say(e.message);
      return;
    }
    v24Err(v, (e && e.message) || 'The Maître d’ is online only. Nothing was sent.');
  });
}

/* THIS IS THE PLAIN-WING COPY OF WorldTable/src/lib/maitre-adopt.ts, rule
   for rule, and it must stay one: her read is turned into the desk file in
   two places (adoptRead there, this here), and a rule kept in one and not
   the other is a row that reads cleanly in one room and not in the next.
   The rules, in the order the file below keeps them: a pour is split on the
   measure word, not on position; the price line is the figures she gave,
   glass then pours then bottle, each a part with the word it came with; a
   row with no price, a name past sixty characters, or a price the client
   blanked is low, with the reason in `why`; a dish she marked low stays low;
   rows come back in page order where their lines were found; and a read the
   client could not check (a picture, a PDF) carries the notice. */

var V24_NO_PRICE_WHY = 'No price on this line: the price she read was not on the page, so it was blanked.';
var V24_UNVERIFIED = 'The Maître d’ read this from a picture or a PDF, so the app had no text to check her prices against. Check every price against the page before it goes on.';
var V24_POUR_SIZE = /\b\d+(?:[.,]\d+)?\s?(?:oz|ml|cl|l)\b/i;

function v24Ws(s) { return String(s == null ? '' : s).replace(/\s+/g, ' ').trim(); }

/* A pour as she wrote it, "5 oz 45.00" or "45.00 5 oz", into {price, size}.
   The size is the figure with a measure word on it; the price is the figure
   without one. Neither is parsed into a number, and a pour with no measure
   keeps its whole text as the price, so nothing she wrote is dropped on the
   way through; wineRowFromDesk holds every figure against the page after. */
function v24Pour(s) {
  var t = v24Ws(s);
  if (!t) return null;
  var size = V24_POUR_SIZE.exec(t);
  if (!size) return { price: t, size: '' };
  return { price: v24Ws(t.replace(size[0], '')), size: v24Ws(size[0]) };
}

function v24PriceParts(printed) {
  try { return (typeof priceParts === 'function') ? priceParts(printed) : []; } catch (e) { return []; }
}

/* One reason a row is low, in her words or the app's. Low stays low; nothing
   here promotes a row. */
function v24Settle(printed, name, flagged, why) {
  if (flagged) { why.push(V24_NO_PRICE_WHY); return 'low'; }
  if (!printed) { why.push('No price printed on this line.'); return 'low'; }
  if (String(name || '').length > 60) { why.push('A long name: check it is one item.'); return 'low'; }
  return 'high';
}

/* The source text as folded lines, so a row's first raw line can be found
   by a plain comparison. The numbers exist for page order and for the screen
   to point at; a row whose line is not found says [0, 0], as the validator
   does, because not found is not line nought. */
function v24SourceLines(text) {
  if (!text) return [];
  return String(text).replace(/\r\n?/g, '\n').split('\n').map(v24Ws);
}

function v24LinesOf(source, raw) {
  var own = String(raw || '').replace(/\r\n?/g, '\n').split('\n').map(v24Ws).filter(Boolean);
  if (!source.length || !own.length) return null;
  var at = source.indexOf(own[0]);
  if (at < 0) return null;
  return [at, Math.min(source.length - 1, at + own.length - 1)];
}

function v24DeskFromMaitre(r, text) {
  var desk = r && r.desk;
  if (!desk) return null;
  var model = (r.provenance && r.provenance.model) || 'unknown';
  var flagged = {};
  (r.flags || []).forEach(function (f) { flagged[f.kind + ':' + f.index] = 1; });
  var readBy = 'Read by the Maître d’ on ' + model + '.';
  var source = String((r.sourceText != null) ? r.sourceText : (text || ''));
  var lines = v24SourceLines(source);

  /* Page order where it is known. A row whose line was not found sorts after
     every row whose line was, and the sort is stable by `i`, so her order
     (dishes, wines, cocktails) holds within them. */
  var placed = [];
  var place = function (raw, item) {
    var at = v24LinesOf(lines, raw);
    item.lines = at || [0, 0];
    placed.push({ it: item, at: at ? at[0] : Infinity, i: placed.length });
  };

  (desk.dishes || []).forEach(function (d, i) {
    var why = [readBy];
    var isFlagged = !!flagged['dish:' + i];
    var printed = isFlagged ? '' : v24Ws(d.price);
    var confidence = v24Settle(printed, d.name, isFlagged, why);
    if (d.confidence === 'low') { why.push('Marked low by the Maître d’.'); confidence = 'low'; }
    place(d.raw, {
      kind: 'dish', section: d.section, name: d.name, description: d.description,
      ingredientsNamed: (d.ingredientsNamed || []).filter(function (s) { return String(s).trim(); }),
      price: { printed: printed, parts: v24PriceParts(printed) }, marks: d.marks || [],
      confidence: confidence, why: why, raw: d.raw
    });
  });

  (desk.wines || []).forEach(function (w, i) {
    var why = [readBy];
    var pours = (w.pours || []).map(v24Pour).filter(function (p) { return p && (p.price || p.size); });
    /* The price line is the figures she gave, glass then pours then bottle,
       each kept as its own part with the word it came with. A repeated
       figure (a glass price that is also the first pour) is one part. */
    var parts = [], seen = {};
    var add = function (amount, label) {
      var a = v24Ws(amount);
      if (!a || seen[a + '|' + label]) return;
      seen[a + '|' + label] = 1;
      parts.push({ amount: a, label: label });
    };
    if (w.glass) add(w.glass, 'Glass');
    pours.forEach(function (p) { if (p.price) add(p.price, p.size); });
    if (w.bottle) add(w.bottle, 'Bottle');
    var amounts = [];
    parts.forEach(function (p) { if (amounts.indexOf(p.amount) < 0) amounts.push(p.amount); });
    var printed = amounts.join(' / ');
    if (parts.length > 1) why.push('Price line assembled from the figures she read: glass, pours, bottle.');
    if (!w.producer) why.push('No producer read from the name line; the Codex may fill it from its corpus.');
    var confidence = v24Settle(printed, w.name, !!flagged['wine:' + i], why);
    place(w.raw, {
      kind: 'wine', section: w.section, name: w.name,
      producer: w.producer, wine: w.name, vintage: w.vintage, region: w.region, country: '',
      grapes: (w.grapes || []).filter(function (g) { return String(g).trim(); }), style: w.style, bin: '',
      pours: pours, bottle: w.bottle, descriptors: '',
      price: { printed: printed, parts: parts }, marks: [],
      confidence: confidence, why: why, raw: w.raw
    });
  });

  (desk.cocktails || []).forEach(function (c, i) {
    var why = [readBy];
    var isFlagged = !!flagged['cocktail:' + i];
    /* The desk's cocktail carries a description and no fields for method,
       glass or garnish, so the three the page printed travel as labelled
       prose the Ledger shows under the name. The base spirit is left for the
       Ledger's own lexicon: the port does not expose the reader's, and a
       spirit word derived here from the name would be a guess. */
    var bits = [];
    if (c.method) bits.push('Method: ' + c.method + '.');
    if (c.glass) bits.push('Glass: ' + c.glass + '.');
    if (c.garnish) bits.push('Garnish: ' + c.garnish + '.');
    var printed = isFlagged ? '' : v24Ws(c.price);
    var confidence = v24Settle(printed, c.name, isFlagged, why);
    place(c.raw, {
      kind: 'cocktail', section: c.section, name: c.name,
      spec: (c.spec || []).filter(function (s) { return String(s).trim(); }), description: bits.join(' '),
      baseSpirit: '', price: { printed: printed, parts: v24PriceParts(printed) }, marks: [],
      confidence: confidence, why: why, raw: c.raw
    });
  });

  placed.sort(function (a, b) { return (a.at - b.at) || (a.i - b.i); });
  var items = placed.map(function (x) { return x.it; });

  var unsorted = [];
  (desk.unsure || []).forEach(function (u) {
    var raw = String((u && u.raw) || '');
    if (!raw.trim()) return;
    var at = v24LinesOf(lines, raw);
    unsorted.push({ raw: raw, line: at ? at[0] : 0, reason: (u && u.reason) || 'unsure' });
  });

  /* The source block is the port's own (through wineDeskSource), so the
     hash is the same hashText the paste path uses and the same menu pasted
     again in any room is recognised whichever engine read it first. A
     photograph has no text to hash, so the client's own fingerprint stands. */
  var src = wineDeskSource(source, 'agent', { reader: 'maitre/' + model });
  if (!source && r.provenance && r.provenance.sourceHash) src.hash = r.provenance.sourceHash;
  var file = {
    format: 'oot-menu-desk', version: 1, createdAt: new Date().toISOString(),
    source: src, items: items, unsorted: unsorted
  };
  if (r.provenance && r.provenance.priceCheck === 'unverified') file.notice = V24_UNVERIFIED;
  return readDeskFile(file);
}

/* ═══════════ the review list ═══════════ */

function v24RowHtml(row, i, file) {
  var d = row.draft;
  var isDraft = d.kindRead === 'wine' || d.kindRead === 'unsure';
  var flags = v24Flags(row, file);
  /* tabindex=-1 so focus can be handed back to the row after a re-render:
     the person who pressed a chip on it, or came back from the form, lands
     where they were and hears the row. */
  var html = '<div class="dispute deskrow' + (row.status === 'left' || !isDraft ? ' dim' : '') + '" data-i="' + i + '" tabindex="-1">'
    + '<div class="mq">' + v24Esc(v24DraftLabel(d))
    + (d.glass ? ' <span class="lvltag">' + v24Esc(d.glass) + ' gl</span>' : '')
    + (d.bottle ? ' <span class="lvltag">' + v24Esc(d.bottle) + ' btl</span>' : '') + '</div>';
  if (isDraft) {
    var facts = [];
    var mark = function (field, value) {
      if (!value) return;
      facts.push(v24Esc(value) + (d.fromCodex.indexOf(field) >= 0 ? ' <span class="pagewords">(from the Producers)</span>' : ''));
    };
    mark('region', d.region); mark('grapes', d.grapes); mark('style', d.style);
    if (facts.length) html += '<div class="ma">' + facts.join(' · ') + '</div>';
    if (d.note) html += '<div class="pagewords">' + v24Esc(d.note) + '</div>';
  }
  if (flags.length) html += '<div class="mu">' + flags.map(v24Esc).join(' · ') + '</div>';
  html += '<div class="wimp-raw">' + v24Esc(String(d.raw).replace(/\n/g, ' ')) + '</div>';
  if (d.why && d.why.length) html += '<div class="why">' + v24Esc(d.why.join(' ')) + '</div>';
  if (row.said) html += '<div class="mexp">' + v24Esc(row.said) + '</div>';

  var chips = [];
  var chip = function (act, label, gold) {
    chips.push('<button class="btn small' + (gold ? ' gold' : ' ghost') + '" type="button" data-act="' + act + '" data-i="' + i + '">' + label + '</button>');
  };
  if (row.status === '') {
    if (isDraft) {
      chip('look', 'Look at it', true);
      chip('add', 'Add as is');
      chip('leave', 'Leave it out');
      chip('dish', 'It is a dish');
      chip('cocktail', 'It is a cocktail');
    } else {
      chip('wine', 'It is a wine', true);
      chip('leave', 'Leave it out');
      chip(d.kindRead === 'dish' ? 'cocktail' : 'dish', d.kindRead === 'dish' ? 'It is a cocktail' : 'It is a dish');
    }
  } else if (row.status === 'left') {
    chip('back', 'Put it back');
  }
  if (chips.length) html += '<div class="sarow">' + chips.join('') + '</div>';
  return html + '</div>';
}

function deskReviewView() {
  var d = S._desk;
  var file = d.file;
  var clean = d.rows.filter(function (r) { return v24IsClean(r, file); });
  var undecided = d.rows.filter(function (r) { return r.status === ''; }).length;
  var others = (file.items || []).filter(function (i) { return i.kind === 'dish' || i.kind === 'cocktail'; });

  var html = '<div class="desk"><div class="viewhead"><h2>Check it before it goes on</h2>'
    + '<div class="sub">' + v24FromLine(d) + '</div></div>'
    + '<p class="desk-counts">' + v24Esc(v24CountsLine(file)) + '</p>';
  if (file.source && file.source.kind === 'photo') html += '<div class="wimp-note">Check the prices: a reader mistakes 8 for 3 and drops decimals.</div>';
  /* Plain text: this view is rebuilt on every chip press, and a role=alert
     node announces itself each time it is inserted, on top of say(). The
     notice is said once, by v24LoadDesk. */
  if (file.notice) html += '<div class="wimp-band">' + v24Esc(file.notice) + '</div>';
  if (!d.rows.length) html += '<div class="wimp-note" style="font-style:normal">Nothing here is for the cellar.</div>';

  html += '<div class="sarow">';
  if (clean.length) html += '<button class="btn gold" type="button" data-act="add-all">Add all ' + clean.length + ' that read cleanly</button>';
  html += '<button class="btn ghost" type="button" data-act="done">' + (undecided ? 'Done for now' : 'Done') + '</button>'
    + '<button class="btn ghost" type="button" data-act="download">Download the desk file</button>';
  if (others.length && (d.from === 'paste' || d.from === 'agent') && !d.handed) {
    var dishes = others.filter(function (i) { return i.kind === 'dish'; }).length;
    var cocktails = others.length - dishes;
    var hand = [];
    if (dishes) hand.push(v24Plural(dishes, 'dish', 'dishes'));
    if (cocktails) hand.push(v24Plural(cocktails, 'cocktail', 'cocktails'));
    html += '<button class="btn ghost" type="button" data-act="hand">Hand ' + hand.join(' and ') + ' on</button>';
  }
  html += '</div>';
  if (d.handed) html += '<div class="wimp-note" style="font-style:normal">' + v24Esc(d.handedSaid || '') + '</div>';

  html += '<div class="secgroup">The rows (' + d.rows.length + ')</div>';
  d.rows.forEach(function (row, i) { html += v24RowHtml(row, i, file); });
  html += '<div class="sarow"><button class="btn ghost" type="button" data-act="done">' + (undecided ? 'Done for now' : 'Done') + '</button></div></div>';

  var v = el(html);
  v.addEventListener('click', function (e) { v24ReviewClick(v, e); });
  return v;
}

function v24ReviewClick(v, e) {
  var b = e.target && e.target.closest ? e.target.closest('[data-act]') : null;
  if (!b) return;
  var d = S._desk;
  if (!d) return;
  var act = b.getAttribute('data-act');
  var i = b.hasAttribute('data-i') ? +b.getAttribute('data-i') : -1;
  var row = i >= 0 ? d.rows[i] : null;
  if (act === 'look' && row) v24Look(i);
  else if (act === 'add' && row) v24AddOne(row, i);
  else if (act === 'leave' && row) { row.status = 'left'; row.said = 'Left out.'; render(); v24FocusRow(i); say(v24DraftLabel(row.draft) + ' left out.'); }
  else if (act === 'back' && row) { row.status = ''; row.said = ''; render(); v24FocusRow(i); say(v24DraftLabel(row.draft) + ' is back in the list.'); }
  else if (act === 'wine' && row) v24ReRead(row, 'wine');
  else if ((act === 'dish' || act === 'cocktail') && row) v24MoveBack(row, act);
  else if (act === 'add-all') v24AddClean();
  else if (act === 'hand') v24HandOn();
  else if (act === 'download') v24Download();
  else if (act === 'done') v24Finish();
}

/* FOCUS GOES WITH THE PERSON. Every render() here rebuilds the view and
   scrolls to the top, which leaves focus on body and the row the person was
   on somewhere below the fold. So a chip press puts focus back on its row
   (the row is tabindex=-1 and a focus without preventScroll brings it into
   view, which is the point), and opening the form puts it on the first
   field, with preventScroll because wineLoadRow has already gone to the top
   where the banner is. The app's own idiom: core.js focuses #sa on a tick,
   codex18 focuses with preventScroll, codex23 restores focus on close. */
function v24FocusRow(i) {
  try {
    var n = document.querySelector('.deskrow[data-i="' + i + '"]');
    if (n) n.focus();
  } catch (e) { /* a row that cannot take focus is still on screen */ }
}

function v24FocusForm() {
  try {
    var n = document.getElementById('cl-producer') || document.getElementById('cl-save');
    if (!n) return;
    try { n.focus({ preventScroll: true }); } catch (e) { n.focus(); }
  } catch (e) { }
}

/* Through codex16's own review path: one draft, the one proved-safe form,
   the banner that names what came off the page and what the corpus filled.
   wineFinish is wrapped below to bring the person back here afterwards. */
function v24Look(i) {
  var d = S._desk;
  d.look = i;
  S._wimp = { stage: 'review', rows: [d.rows[i].draft], i: 0, added: 0, desk: true };
  wineLoadRow();
  v24FocusForm();
}

function v24AddOne(row, i) {
  var res = cellarAddMany([row.draft]);
  if (res.added) { row.status = 'added'; row.said = 'On the list.'; render(); v24FocusRow(i); say(v24DraftLabel(row.draft) + ' is on the list.'); return; }
  if (res.dup) { row.said = 'Already on the list; nothing added.'; render(); v24FocusRow(i); say(row.said); return; }
  row.said = 'A bottle needs at least a producer or a wine name. Look at it and give it one.';
  render(); v24FocusRow(i); say(row.said);
}

function v24AddClean() {
  var d = S._desk;
  var clean = d.rows.filter(function (r) { return v24IsClean(r, d.file); });
  if (!clean.length) return;
  var names = clean.map(function (r) { return v24DraftLabel(r.draft); });
  if (!confirm('Add these ' + v24Plural(clean.length, 'bottle', 'bottles') + ' to the list?\n\n' + names.join('\n'))) return;
  var res = cellarAddMany(clean.map(function (r) { return r.draft; }));
  /* cellarAddMany skips a duplicate inside the batch too; mark rows by
     asking the list, not by counting. */
  clean.forEach(function (r) {
    if (v24IsOnList(r.draft)) { r.status = 'added'; r.said = 'On the list.'; }
  });
  render();
  var line = v24Plural(res.added, 'bottle', 'bottles') + ' added.' + (res.dup ? ' ' + res.dup + ' already on the list.' : '');
  if (typeof toast === 'function') toast(line);
  say(line);
}

/* A row read again as the kind a person chose, from its own raw lines. */
function v24ReRead(row, kind) {
  var item = reReadAs(row.item, kind);
  row.item = item;
  row.draft = wineRowFromDesk(item, v24Corpus());
  row.status = ''; row.said = '';
  v24ReplaceInFile(item);
  render();
  say(v24DraftLabel(row.draft) + ' read again as a ' + kind + '.');
}

function v24ReplaceInFile(item) {
  var d = S._desk;
  if (!d || !d.file) return;
  var items = d.file.items || [];
  for (var j = 0; j < items.length; j++) if (items[j].id === item.id) { items[j] = item; return; }
  items.push(item);
}

/* Back onto the desk for another room: read again as that kind, written to
   the inbox as a one-row desk file (the inbox merges by kind and folded
   name), so the World Table or the Ledger finds it waiting. Off the shared
   origin the download at the foot carries it. A refusal is said, not hidden. */
function v24MoveBack(row, kind) {
  var d = S._desk;
  var item = reReadAs(row.item, kind);
  row.item = item;
  v24ReplaceInFile(item);
  var room = kind === 'dish' ? 'the kitchen' : 'the bar';
  var res;
  try {
    res = deskInbox.write({
      format: 'oot-menu-desk', version: 1, createdAt: new Date().toISOString(),
      source: d.file.source, items: [item], unsorted: []
    });
  } catch (e) { res = { ok: false, said: 'The desk between apps could not be written.' }; }
  row.status = 'moved';
  row.said = res && res.ok
    ? 'Read again as a ' + kind + ' and left at the Menu Desk for ' + room + '.'
    : 'Read again as a ' + kind + '. ' + ((res && res.said) || '') + ' The desk file at the foot carries it.';
  render();
  say(row.said);
}

/* The dishes and cocktails a paste made here, handed to the other rooms in
   one go: the whole file goes to the inbox, and the wines in it are marked
   taken when this run ends so they are never offered back to this room. */
function v24HandOn() {
  var d = S._desk;
  var res;
  try { res = deskInbox.write(d.file); }
  catch (e) { res = { ok: false, said: 'The desk between apps could not be written.' }; }
  if (res && res.ok) {
    d.handed = true;
    var dishes = v24Share(res.file, 'dish').length, cocktails = v24Share(res.file, 'cocktail').length;
    var bits = [];
    if (dishes) bits.push(v24Plural(dishes, 'dish is', 'dishes are') + ' waiting for the kitchen');
    if (cocktails) bits.push(v24Plural(cocktails, 'cocktail is', 'cocktails are') + ' waiting for the bar');
    d.handedSaid = (bits.join(' and ') || 'Handed on') + '.' + (v24Shared() ? '' : ' On this device only the download reaches them.');
  } else {
    d.handed = false;
    d.handedSaid = ((res && res.said) || 'The desk between apps could not be written.') + ' Download the desk file instead.';
  }
  render();
  say(d.handedSaid);
}

function v24Download() {
  var d = S._desk;
  if (!d) return;
  try { downloadDesk(d.file); say('The desk file is downloading.'); }
  catch (e) { say('The download was blocked.'); }
}

/* The run ends: what was added, what was left; the share marked taken when
   it came from the desk AND every row was decided; the report shown once on
   the list, where codex16 already shows one, and said aloud.

   "DONE FOR NOW" MEANS THE REST WAITS. A share is adopted when every row in
   it was added or left out, and only then is it stamped taken, because the
   port's deskShare returns nothing for a taken kind and the inbox deletes
   the key once every kind is taken: a stamp with rows still undecided would
   strand them where no screen could reach them again. With rows undecided
   the share is left as it is, the band on home and on the list offers it
   again, and the report says so. A row already added shows "Already on the
   list" when it is offered again, so nothing is filed twice. */
function v24Finish() {
  var d = S._desk;
  if (!d) { S.view = 'cellar'; render(); return; }
  var added = 0, left = [], undecided = 0;
  d.rows.forEach(function (r) {
    if (r.status === 'added') added++;
    else if (r.status === 'left') left.push(v24DraftLabel(r.draft));
    else if (r.status === '') undecided++;
  });
  var waits = (d.from === 'inbox' || d.handed);
  if (waits && !undecided) {
    try { deskInbox.taken('wine'); } catch (e) { /* a mark that did not land re-offers the share, which a person can see */ }
  }
  var skipped = left.map(function (n) { return n + ' was left out.'; });
  var still = '';
  if (undecided) {
    var rest = v24Plural(undecided, 'row was', 'rows were') + ' neither added nor left out';
    if (waits) {
      still = v24Plural(undecided, 'wine is', 'wines are') + ' still waiting at the desk.';
      rest += '; ' + (undecided === 1 ? 'it is' : 'they are') + ' still waiting at the desk.';
    } else if (d.from === 'file') {
      rest += '; bring the desk file in again to see ' + (undecided === 1 ? 'it' : 'them') + '.';
    } else {
      rest += '; the list is still in the box.';
    }
    skipped.push(rest);
  }
  S._wimpReport = (added || skipped.length) ? { added: added, skipped: skipped, unseen: 0 } : null;
  S._desk = null;
  S.view = 'cellar';
  render();
  var line = v24Plural(added, 'bottle', 'bottles') + ' added. ' + left.length + ' left out.' + (still ? ' ' + still : '');
  if (typeof toast === 'function') toast(line);
  say(line);
}

/* ═══════════ codex16's review path, bent back to the desk ═══════════
   wineLoadRow drives the cellar form and calls wineFinish when the one row
   is done; that finish goes to the cellar. When a desk row was being looked
   at, the person is brought back to the desk instead, with the row marked. */
var _v24WineFinish = (typeof wineFinish === 'function') ? wineFinish : null;
if (_v24WineFinish) {
  wineFinish = function () {
    var w = S._wimp, d = S._desk;
    var look = (d && d.look != null) ? d.look : null;
    _v24WineFinish();
    if (look === null || !d) return;
    var row = d.rows[look];
    if (row && w && w.added) { row.status = 'added'; row.said = 'On the list.'; }
    d.look = null;
    S._wimpReport = null;
    S.view = 'menudesk';
    render();
    v24FocusRow(look);
    say(w && w.added ? 'On the list. Back at the desk.' : 'Nothing added. Back at the desk.');
  };
}

/* The banner over the form names what the corpus filled; it now also names
   what came off the page, because a person confirming a row deserves to know
   which is which. */
var _v24WineBanner = (typeof wineBanner === 'function') ? wineBanner : null;
if (_v24WineBanner) {
  wineBanner = function () {
    var html = _v24WineBanner();
    var w = S._wimp;
    if (!html || !w || w.stage !== 'review') return html;
    var r = w.rows[w.i];
    if (!r || !r.fromPage || !r.fromPage.length) return html;
    var note = '<div class="wimp-note">Read off the page: ' + v24Esc(r.fromPage.join(', ')) + '.</div>';
    var at = '<div class="sarow"><button class="btn small ghost" id="wi-skip">';
    return html.indexOf(at) >= 0 ? html.replace(at, note + at) : html;
  };
}

/* ═══════════ the cellar view: the door, the band, the form, the lines ═══════════ */

function v24FormMarks() {
  var b = S._cellarEdit ? v24BottleById(S._cellarEdit) : null;
  var m = (b && b.maitre) || null;
  if (!m && S._wimp && S._wimp.stage === 'review') {
    var r = S._wimp.rows[S._wimp.i];
    m = (r && r.maitre) || null;
  }
  return {
    say: (m && m.say && m.say.value) || '',
    guest: (m && m.guest && m.guest.value) || ''
  };
}

/* The two fields, typed: a changed value is the person's; an unchanged one
   stays whatever it was, hers or kept; an emptied one goes. */
function v24MaitreFromForm(prior, typed) {
  var out = prior ? v24Clone(prior) : {};
  ['say', 'guest'].forEach(function (k) {
    var val = String(typed[k] || '').trim();
    var had = out[k] && typeof out[k].value === 'string' ? out[k] : null;
    if (!val) delete out[k];
    else if (!had || had.value !== val) out[k] = { value: val.slice(0, 600), by: 'person', ts: Date.now() };
  });
  return Object.keys(out).length ? out : null;
}

/* `frozen` leaves the two chips off: while a run or the form is open a Keep
   would re-render the list under the banner and lose the draft being typed
   with no sign, the same trap codex16 closes by disabling Edit and Remove
   for the length of a run. The line itself still shows. */
function v24MarkChips(b, field, mark, frozen) {
  if (!mark || mark.by === 'person' || frozen) return '';
  return '<button class="btn small ghost" type="button" data-act="m-keep" data-id="' + v24Esc(b.id) + '" data-field="' + field + '">Keep</button>'
    + '<button class="btn small ghost" type="button" data-act="m-discard" data-id="' + v24Esc(b.id) + '" data-field="' + field + '">Discard</button>';
}

function v24LinesHtml(b, frozen) {
  var m = b.maitre;
  if (!m) return '';
  var html = '';
  if (m.say && m.say.value) {
    html += '<div class="mline"><span class="lvltag">Say it</span><span>' + v24Esc(m.say.value) + '</span>'
      + (m.say.by === 'person' ? '' : '<span class="mline-eyebrow">Hers, not yet kept</span>')
      + v24MarkChips(b, 'say', m.say, frozen) + '</div>';
  }
  if (m.guest && m.guest.value) {
    html += '<div class="mline"><span class="lvltag">' + (m.guest.by === 'person' ? 'The guest line' : 'Hers, not yet kept')
      + '</span><span>' + v24Esc(m.guest.value) + '</span>' + v24MarkChips(b, 'guest', m.guest, frozen) + '</div>';
  }
  return html;
}

function v24CellarClick(e) {
  var b = e.target && e.target.closest ? e.target.closest('[data-act]') : null;
  if (!b) return;
  var act = b.getAttribute('data-act');
  if (act === 'desk-inbox') { v24OpenDesk('inbox'); return; }
  if (act !== 'm-keep' && act !== 'm-discard') return;
  var rec = v24BottleById(b.getAttribute('data-id'));
  var field = b.getAttribute('data-field');
  if (!rec || !rec.maitre || !rec.maitre[field]) return;
  if (act === 'm-keep') {
    rec.maitre[field].by = 'person';
    rec.maitre[field].ts = Date.now();
    say('Kept on ' + bottleLabel(rec) + '.');
  } else {
    delete rec.maitre[field];
    if (!Object.keys(rec.maitre).length) delete rec.maitre;
    say('Discarded. ' + bottleLabel(rec) + ' keeps only what you kept.');
  }
  stSave();
  render();
}

function v24DecorateCellar(v) {
  /* 1. the door codex16 put beside Add a bottle */
  var paste = v.querySelector('#cl-paste');
  if (paste) {
    paste.textContent = 'Bring in the list';
    paste.onclick = function () { v24OpenDesk('paste'); };
  }

  /* 2. the band, while a share is waiting and no run is on */
  if (!S._wimp && !S._cellarForm) {
    var file = v24Inbox();
    var n = file ? v24Share(file, 'wine').length : 0;
    if (n) {
      var band = el('<div class="deskband"><span class="deskband-t"><b>' + v24Plural(n, 'wine', 'wines')
        + ' from the Menu Desk ' + (n === 1 ? 'is' : 'are') + ' waiting.</b> Read '
        + v24Esc(v24ReadIn(file.source.readIn)) + ', ' + v24Esc(v24WhenRead(file.source.at)) + '.</span>'
        + '<button class="btn gold" type="button" data-act="desk-inbox">Look them over</button></div>');
      var head = v.querySelector('.viewhead');
      if (head && head.parentNode === v) v.insertBefore(band, head.nextSibling);
      else v.insertBefore(band, v.firstChild);
    }
  }

  /* 3. the form gains her two lines, and the save carries them */
  var save = v.querySelector('#cl-save');
  if (save && S._cellarForm) {
    var marks = v24FormMarks();
    var rowOf = save.parentNode;
    if (rowOf && rowOf.parentNode) {
      rowOf.parentNode.insertBefore(el(cellarFieldRow('cl-say', 'Say it', marks.say, 'gwan-CHAH-leh')), rowOf);
      rowOf.parentNode.insertBefore(el(cellarFieldRow('cl-guest', 'Guest line', marks.guest, 'What to say at the table, in one breath')), rowOf);
    }
    var orig = save.onclick;
    save.onclick = function () {
      var read = function (id) { var x = document.getElementById(id); return x ? x.value : ''; };
      var editId = S._cellarEdit;
      var before = (ST.cellar || []).length;
      var prior = editId ? v24BottleById(editId) : null;
      var priorMaitre = prior && prior.maitre ? v24Clone(prior.maitre) : null;
      var typed = { say: read('cl-say'), guest: read('cl-guest') };
      /* The original runs first and unchanged: it validates, writes the nine
         fields, saves and re-renders. It rebuilds the record without
         `maitre`, so the marks are put back afterwards, from the snapshot. */
      if (typeof orig === 'function') orig();
      var rec = editId ? v24BottleById(editId)
        : ((ST.cellar || []).length > before ? ST.cellar[ST.cellar.length - 1] : null);
      if (!rec) return;   /* the form refused the row and has already said so */
      var m = v24MaitreFromForm(priorMaitre, typed);
      if (m) rec.maitre = m; else delete rec.maitre;
      if (priorMaitre || m) {
        stSave();
        if (S.view === 'cellar' && !S._wimp) render();
      }
    };
  }

  /* 4. her lines on the list rows. The chips wait while a run or the form is
     open (see v24MarkChips): codex16 disables the list's own Edit and Remove
     for the same reason, and section 2 above holds the band back likewise. */
  var frozen = !!(S._wimp || S._cellarForm);
  (ST.cellar || []).forEach(function (b) {
    if (!b || !b.maitre) return;
    var edit = v.querySelector('[data-cl-edit="' + b.id + '"]');
    var lines = v24LinesHtml(b, frozen);
    if (!edit || !lines) return;
    var row = edit.parentNode;
    if (row && row.parentNode) row.parentNode.insertBefore(el('<div>' + lines + '</div>'), row);
  });

  /* 5. one handler for the band and the chips */
  v.addEventListener('click', v24CellarClick);
}

var _v24CellarView = (typeof cellarView === 'function') ? cellarView : null;
if (_v24CellarView) {
  cellarView = function () {
    var v = _v24CellarView();
    try { v24DecorateCellar(v); } catch (e) { /* the list must never go dark for a band */ }
    return v;
  };
}

/* ═══════════ the transfer merge ═══════════
   codex12 unions bottles by id, the newer edit winning whole, and now carries
   `maitre` through cellarSanitize. What that loses is `kept`: a line kept on
   one device and a different line kept on the other should both survive, so
   after the chain runs, kept is unioned from both sides on ts|q. The marks
   themselves stay the winner's. */
var _v24MergeStats = (typeof mergeStats === 'function') ? mergeStats : null;
if (_v24MergeStats) {
  mergeStats = function (inc) {
    var before = {};
    (ST.cellar || []).forEach(function (b) { if (b && b.id && b.maitre) before[b.id] = v24Clone(b.maitre); });
    var err = _v24MergeStats(inc);
    if (err || !inc || !inc.stats || !Array.isArray(inc.stats.cellar)) return err;
    var incoming = {};
    inc.stats.cellar.forEach(function (raw) {
      if (!raw || !raw.id) return;
      var m = v24SanitiseMaitre(raw.maitre);
      if (m) incoming[String(raw.id).slice(0, 24)] = m;
    });
    var changed = false;
    (ST.cellar || []).forEach(function (b) {
      if (!b || !b.id) return;
      var a = before[b.id], c = incoming[b.id];
      if (!a && !c) return;
      var kept = v24UnionKept(v24UnionKept((a && a.kept), (c && c.kept)), (b.maitre && b.maitre.kept));
      if (!kept.length) return;
      var had = (b.maitre && b.maitre.kept) ? JSON.stringify(b.maitre.kept) : '';
      if (had === JSON.stringify(kept)) return;
      b.maitre = b.maitre || {};
      b.maitre.kept = kept;
      changed = true;
    });
    if (changed) stSave();
    return err;
  };
}

/* ═══════════ the home page ═══════════ */

/* The tile goes under Record, beside Progress Transfer, the way codex14
   files tiles: it is appended before the chain runs so organiseHome finds it
   by id and places it. HOME_SECTIONS is the standalone's; the wing's home
   module files an unknown id under its own last band, which is fine. */
try {
  if (typeof HOME_SECTIONS !== 'undefined' && HOME_SECTIONS && HOME_SECTIONS.length) {
    HOME_SECTIONS.forEach(function (sec) {
      if (sec && sec[0] === 'Record' && sec[2] && sec[2].indexOf('t-maitre') < 0) sec[2].push('t-maitre');
    });
  }
} catch (e) { }

try {
  if (typeof V22_TILES !== 'undefined') {
    V22_TILES['t-maitre'] = function () { return 'optional · online · your own key'; };
  }
} catch (e) { }

function v24Tile() {
  if (document.getElementById('t-maitre')) return;
  var modes = document.querySelectorAll('.modes');
  var anchor = modes[modes.length - 1];
  if (!anchor || !anchor.parentNode) return;
  var m24 = el('<div class="modes" style="margin-top:14px"></div>');
  /* The tile's line is decided by whether a press can reach her screen, not
     by whether she has been fetched yet: on the suite she is absent until
     asked for, and a tile that read only her presence would tell every
     suite visitor she is not in this build. */
  var can = v24Maitre() || v24MaitreLoadable();
  m24.appendChild(el('<button class="mode" id="t-maitre"><div class="band"></div><h3>The Maître d’</h3><p>'
    + v24Esc(can ? V24_HERS : V24_NOT_IN_BUILD) + '</p></button>'));
  anchor.parentNode.insertBefore(m24, anchor.nextSibling);
  m24.querySelector('#t-maitre').onclick = function () {
    if (v24OpenMaitre()) return;
    S.view = 'maitre'; render();
  };
}

function v24HomeBand() {
  if (document.querySelector('.deskband')) return;
  var file = v24Inbox();
  var n = file ? v24Share(file, 'wine').length : 0;
  if (!n) return;
  var band = el('<div class="deskband"><span class="deskband-t"><b>' + v24Plural(n, 'wine', 'wines')
    + ' from the Menu Desk ' + (n === 1 ? 'is' : 'are') + ' waiting.</b> Read '
    + v24Esc(v24ReadIn(file.source.readIn)) + ', ' + v24Esc(v24WhenRead(file.source.at)) + '.</span>'
    + '<button class="btn gold" type="button" id="d-desk">Look them over</button></div>');
  band.querySelector('#d-desk').onclick = function () { v24OpenDesk('inbox'); };
  /* Under the two doors codex16 built, or, where they are absent, above the
     first section, the same anchor codex16 climbs to. */
  var doors = document.querySelector('.codexdoors');
  if (doors && doors.parentNode) { doors.parentNode.insertBefore(band, doors.nextSibling); return; }
  var anchor = (typeof doorAnchor === 'function') ? doorAnchor() : document.querySelector('.modes');
  if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(band, anchor);
}

var _v24DecorateHome = (typeof decorateHome === 'function') ? decorateHome : null;
if (_v24DecorateHome) {
  decorateHome = function () {
    try { v24Tile(); } catch (e) { }
    var out = _v24DecorateHome.apply(this, arguments);
    try { v24HomeBand(); } catch (e) { /* a broken band must never hide the tiles */ }
    return out;
  };
}

/* The Maître d’ tile's screen when she is not in this build: the sentence,
   the family line, and where to ask her. Never a dead door. Reached on the
   suite only through a stale view name in a saved state, since the tile
   opens her screen directly there; it still asks the same three questions,
   so that path ends at her settings too. */
function maitreView() {
  var can = v24Maitre() || v24MaitreLoadable();
  var html = '<div><div class="viewhead"><h2>The Maître d’</h2>'
    + '<div class="sub">Optional. Online. Your own key.</div></div>'
    + '<div class="wimp-band"><div class="wimp-note" style="font-style:normal;opacity:.9">'
    + v24Esc(can ? V24_HERS : V24_NOT_IN_BUILD) + '</div>'
    + '<div class="wimp-note" style="font-style:normal;opacity:.9">' + v24Esc(V24_FAMILY) + '</div>'
    + '<div class="wimp-note" style="font-style:normal;opacity:.9">' + v24Esc(V24_ASK_ELSEWHERE) + '</div>'
    + '<div class="wimp-note" style="font-style:normal;opacity:.9">Every line she writes on a bottle is hers until you keep it, '
    + 'and your progress export never carries a key.</div></div>'
    + '<div class="sarow">' + (can ? '<button class="btn gold" type="button" id="mt-open">Her settings</button>' : '')
    + '<button class="btn ghost" type="button" id="mt-back">Home</button></div></div>';
  var v = el(html);
  var open = v.querySelector('#mt-open');
  if (open) open.onclick = function () { v24OpenMaitre(); };
  v.querySelector('#mt-back').onclick = function () { home(); };
  return v;
}

/* The Progress Transfer sentence says the record lives in this browser; the
   key never rides in that file, and the sentence should say so where the
   file is made. Appended at render rather than edited in codex4, which is
   diverged between the two trees. */
var _v24SyncView = (typeof syncView === 'function') ? syncView : null;
if (_v24SyncView) {
  syncView = function () {
    var v = _v24SyncView.apply(this, arguments);
    try {
      var sub = v.querySelector('.viewhead .sub');
      if (sub && String(sub.textContent).indexOf('Maître') < 0) {
        sub.textContent = sub.textContent + ' If the Maître d’ has been brought in on this device, her key stays here and never rides in this file; every line she wrote and you kept does.';
      }
    } catch (e) { }
    return v;
  };
}

/* ═══════════ routing, level hygiene ═══════════ */

var _v24Render = (typeof render === 'function') ? render : null;
if (_v24Render) {
  render = function () {
    /* codex16's paste screen is retired in favour of the desk; a stale view
       name from a saved state lands on the desk rather than nowhere. */
    if (S.view === 'winepaste') { S.view = 'menudesk'; }
    var v24 = { menudesk: deskView, maitre: maitreView };
    if (v24[S.view]) {
      if (S.qT) { clearInterval(S.qT); S.qT = null; }
      try { stopTimer(); } catch (e) { }
      /* codex18's landmarks and focus placement run inside the render it
         wrapped, which these two views never reach; they are called here so
         the desk has a <main> and focus lands somewhere, as on every other
         view. The signature is taken before the page is rebuilt, as there. */
      var sig = null;
      try { sig = (typeof v18Signature === 'function') ? v18Signature(document.activeElement) : null; } catch (e) { sig = null; }
      var app = document.getElementById('app');
      app.innerHTML = '';
      app.appendChild(topbar());
      app.appendChild(v24[S.view]());
      try {
        if (typeof v18Landmarks === 'function') {
          var main = v18Landmarks();
          if (typeof v18Focus === 'function') v18Focus(sig, main);
        }
      } catch (e) { /* a page without landmarks is still a page */ }
      window.scrollTo(0, 0);
      return;
    }
    return _v24Render.apply(this, arguments);
  };
}

function deskView() {
  var d = S._desk;
  if (d && d.rows) return deskReviewView();
  return deskPasteView();
}

var _v24ApplyLevel = (typeof applyLevel === 'function') ? applyLevel : null;
if (_v24ApplyLevel) {
  applyLevel = function (lvl, skipRender) {
    S._desk = null;
    return _v24ApplyLevel(lvl, skipRender);
  };
}
