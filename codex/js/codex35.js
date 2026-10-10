/* ================== CODEX XXXIV: WHAT IT IS MADE OF, AND COMPARE WITH ==================

   The component deep dive (WorldTable plan, 5 October 2026): the owner asked
   for an explanation and a flash card for every grape, region, method and
   story behind each wine on the list, and a comparison to something the app
   already holds. The House carries them (house.components, one card per
   component shared by every item that uses it, and an item's compare mark,
   the shapes in the World Table's src/lib/house/house-schema.ts). This layer
   is the Codex's half. codex33 holds the illustrated guides; new work belongs
   in the next layer, so this is codex35.

   WHAT IT DOES, and the rule each part keeps:

   1. WHAT IT IS MADE OF, ON A WINE'S CARD. Before the five parts, the wine's
      components grouped Ingredients, Techniques, Stories, each a closed
      disclosure that opens to how to say it, the explanation, the card's
      question and answer, and the videos that teach it (links out, never a
      player). Flash these components deals the wine's component deck.

   2. COMPARE WITH, ON A WINE'S CARD. One or two comparisons: a grape, a
      producer or a primer opens through codex28's own doors (the grape's
      profile run for a grape on the level's list, its profile in words for
      one beyond it), a house wine opens its card, a World Table recipe or
      technique and a Ledger cocktail are links into their rooms on the
      suite's path when the room answers, and a classic is words. Each says
      what is the same and what differs.

   3. THE DECKS. codex32's one card screen gains three: components, the wine
      components; components:{kind}, Ingredients, Techniques or Stories; and
      item-components:{id}, one wine's components in the order its card
      shows them, never shuffled. The Flashcards root lists a deck per kind
      under What it's made of. A grade is recorded as the words are, under
      h-{component id}-component. components-all is the explicit choice to
      study every house component, including food and cocktails.

   4. THE DOOR FROM ANOTHER ROOM. #ref={a grape, a producer or a primer} is
      read once at load and opens that door on the first render, so a
      comparison in the World Table or the Ledger lands where it points.

   KEPT ONLY: every mark read here is a person's (v28KV). NO OOT AT ALL is the
   standalone build and every Node gate: no house, no block, nothing drawn.

   House rules observed: a new layer, no edits to earlier files; top-level
   declarations are var and function only, no arrow; no pictorial glyph and
   no mark at or above U+2190 in anything this file writes; no dash of any
   spelling; British spelling in the app's own words; nobody named. */

/* =========== the words =========== */

var V35_WORDS = {
  madeOf: 'What it’s made of',
  flashThese: 'Flash these components',
  compareWith: 'Compare with',
  same: 'The same',
  different: 'What differs',
  classic: 'A classic, for comparison',
  cardFront: 'On the card',
  cardBack: 'The answer',
  say: 'Say it',
  inRoom: 'in the {room}',
  grapeCard: 'The grape card',
  producerDoor: 'The producer',
  primerDoor: 'The chapter',
  ourWine: 'On our list',
  everyComponent: 'Wine components',
  allComponents: 'All house components',
  componentScope: 'Choose your scope',
  wineScope: 'Components linked to the wines on our list.',
  allScope: 'Every house component, including food, wine and cocktails.',
  itemDeck: '{name}: what it is made of',
  videoNote: 'Each video opens on YouTube or Vimeo in a new tab, and needs a connection.',
  offlineRoom: '(open the {room} once online and it stays with you offline)'
};
var V35_KINDS = ['ingredient', 'technique', 'story'];
var V35_LABELS = { ingredient: 'Ingredients', technique: 'Techniques', story: 'Stories' };
var V35_ROOM_NAME = { table: 'World Table', ledger: 'Ledger' };

function v35W(key, vars) {
  var v = vars || {};
  return String(V35_WORDS[key] || key).replace(/\{(\w+)\}/g, function (m, k) { return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m; });
}
function v35Esc(s) { return (typeof v28Esc === 'function') ? v28Esc(s) : String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function v35Str(s) { return typeof s === 'string' ? s.trim() : ''; }
function v35Kept(m) { return m && typeof m === 'object' && m.by === 'person' && m.value !== undefined && m.value !== null ? m.value : null; }
function v35House() { try { return (typeof v28House === 'function') ? v28House() : null; } catch (e) { return null; } }
function v35Lib(name, local) {
  var lib = null;
  try { lib = (typeof OOT !== 'undefined' && OOT && OOT.houseLib) ? OOT.houseLib : null; } catch (e) { lib = null; }
  return lib && typeof lib[name] === 'function' ? lib[name] : local;
}
function v35Paras(s) {
  return String(s == null ? '' : s).split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean)
    .map(function (p) { return '<p>' + v35Esc(p) + '</p>'; }).join('');
}

/* =========== the rules, the engine's when it ships them =========== */

function v35GroupsLocal(h, id) {
  var mine = (h && Array.isArray(h.components) ? h.components : []).filter(function (c) { return c && Array.isArray(c.itemIds) && c.itemIds.indexOf(id) >= 0; });
  return V35_KINDS.map(function (k) {
    return { kind: k, label: V35_LABELS[k], components: mine.filter(function (c) { return c.kind === k; }) };
  }).filter(function (g) { return g.components.length; });
}
function v35Groups(h, id) { return h ? v35Lib('componentGroups', v35GroupsLocal)(h, id) : []; }
function v35Videos(h, cid) {
  var ok = function (v) { return v && (typeof v30UrlOk === 'function' ? v30UrlOk(v.url) : false) && v35Str(v.title); };
  return (h && Array.isArray(h.videos) ? h.videos : []).filter(function (v) { return ok(v) && Array.isArray(v.componentIds) && v.componentIds.indexOf(cid) >= 0; });
}
function v35Card(c) {
  var v = v35Kept(c && c.card);
  return v && v35Str(v.front) && v35Str(v.back) ? { front: v35Str(v.front), back: v35Str(v.back) } : null;
}

/* The house's component cards, one per component with a kept card, as the
   card screen deals them: { kind: 'component', id, front, back, label }. */
function v35Cards(h, scope) {
  if (!h) return [];
  var out = [];
  var wineIds = (Array.isArray(h.wines) ? h.wines : []).filter(function (w) { return w && w.id; }).map(function (w) { return w.id; });
  (Array.isArray(h.components) ? h.components : []).forEach(function (c) {
    if (scope !== 'all' && !(c && Array.isArray(c.itemIds) && c.itemIds.some(function (id) { return wineIds.indexOf(id) >= 0; }))) return;
    var card = v35Card(c);
    if (card && c.id) out.push({ kind: 'component', id: c.id, ck: c.kind, front: card.front, back: card.back, label: V35_LABELS[c.kind] || '' });
  });
  return out;
}
/* One wine's component cards, Ingredients then Techniques then Stories. */
function v35ItemCards(h, id) {
  if (!h || !Array.isArray(h.wines) || !h.wines.some(function (w) { return w && w.id === id; })) return [];
  var cards = v35Cards(h, 'all');
  var out = [];
  v35Groups(h, id).forEach(function (g) {
    g.components.forEach(function (c) { cards.forEach(function (x) { if (x.id === c.id) out.push(x); }); });
  });
  return out;
}

/* =========== what it is made of =========== */

function v35MadeOfHtml(h, id) {
  var groups = v35Groups(h, id);
  if (!groups.length) return '';
  var cards = 0;
  var body = groups.map(function (g) {
    return '<h4 class="v28-eyebrow v35-kind" data-kind="' + v35Esc(g.kind) + '">' + v35Esc(g.label) + '</h4><ul class="v35-comps">'
      + g.components.map(function (c) {
        var say = v35Str(v35Kept(c.say));
        var explain = v35Str(v35Kept(c.explain));
        var card = v35Card(c);
        if (card) cards++;
        var vids = v35Videos(h, c.id);
        return '<li data-component="' + v35Esc(c.id) + '"><details class="v28-q v35-comp"><summary>' + v35Esc(v35Str(c.name)) + '</summary><div class="v35-body">'
          + (say ? '<p><span class="v28-soft">' + v35W('say') + ':</span> ' + v35Esc(say) + '</p>' : '')
          + (explain ? v35Paras(explain) : '')
          + (card ? '<dl class="v28-dl"><dt>' + v35W('cardFront') + '</dt><dd>' + v35Esc(card.front) + '</dd><dt>' + v35W('cardBack') + '</dt><dd>' + v35Esc(card.back) + '</dd></dl>' : '')
          + (vids.length && typeof v30Item === 'function' ? '<p class="v28-soft">' + v35W('videoNote') + '</p><ul class="v30-list">' + vids.map(function (v) { return v30Item(h, v, false); }).join('') + '</ul>' : '')
          + '</div></details></li>';
      }).join('') + '</ul>';
  }).join('');
  return '<section class="v28-block v35-madeof" aria-labelledby="v35-madeof-h"><h3 class="secgroup" id="v35-madeof-h">' + v35W('madeOf') + '</h3>' + body
    + (cards ? '<div class="v28-btnrow"><button type="button" class="btn gold" data-v28="v35flash" data-id="' + v35Esc(id) + '">' + v35W('flashThese') + '</button></div>' : '')
    + '</section>';
}

/* =========== compare with =========== */

function v35Fold(s) { return (typeof v28Fold === 'function') ? v28Fold(s) : String(s || '').toLowerCase(); }
function v35Grape(ref) {
  var key = typeof v28GrapeKey === 'function' ? v28GrapeKey : v35Fold;
  var f = key(ref);
  var hit = null;
  [['GRAPES', true], ['CERT_GRAPES', false], ['GRAPES_PLUS', false]].some(function (p) {
    var list = null;
    try {
      if (p[0] === 'GRAPES') list = typeof GRAPES !== 'undefined' ? GRAPES : null;
      else if (p[0] === 'CERT_GRAPES') list = typeof CERT_GRAPES !== 'undefined' ? CERT_GRAPES : null;
      else list = typeof GRAPES_PLUS !== 'undefined' ? GRAPES_PLUS : null;
    } catch (e) { list = null; }
    return Array.isArray(list) && list.some(function (g) { if (g && typeof g.g === 'string' && key(g.g) === f) { hit = { g: g, flash: p[1] }; return true; } return false; });
  });
  return hit;
}
function v35Producer(ref) {
  if (typeof WINE_PRODUCERS === 'undefined' || !Array.isArray(WINE_PRODUCERS)) return null;
  var f = v35Fold(ref);
  var hit = null;
  WINE_PRODUCERS.some(function (r) { if (r && typeof r.p === 'string' && v35Fold(r.p) === f) { hit = r; return true; } return false; });
  return hit;
}
/* A chapter at the current level by its category: the level's own chapter of
   that name, else the Regionale chapter the home's map files under it (the
   Intro chapters carry no category, codex28's rule); { key, name } or null. */
function v35Primer(ref) {
  if (typeof PRIMERS === 'undefined' || !Array.isArray(PRIMERS)) return null;
  var f = v35Fold(ref);
  var hit = null;
  PRIMERS.some(function (p) { if (p && typeof p.cat === 'string' && v35Fold(p.cat) === f) { hit = { key: p.cat, name: p.cat }; return true; } return false; });
  if (hit) return hit;
  if (typeof V25_INTRO_CHAPTERS !== 'undefined' && V25_INTRO_CHAPTERS) {
    Object.keys(V25_INTRO_CHAPTERS).some(function (cat) {
      if (v35Fold(cat) !== f) return false;
      PRIMERS.forEach(function (p, i) { if (!hit && p && typeof p.cat !== 'string' && p.id === V25_INTRO_CHAPTERS[cat]) hit = { key: i, name: cat }; });
      return true;
    });
  }
  return hit;
}
function v35Suite() {
  try { return typeof location !== 'undefined' && location && typeof location.pathname === 'string' && location.pathname.indexOf('/codex') === 0; } catch (e) { return false; }
}
/* A link into another room on the suite's path when the room answers, else words with the offline note. */
function v35RoomLink(room, href, label) {
  if (!href || !v35Suite()) return '<span class="v35-label">' + v35Esc(label) + '</span>';
  var online = typeof v28Online === 'function' ? v28Online() : true;
  var installed = typeof V28_ROOMS !== 'undefined' && V28_ROOMS && V28_ROOMS[room] === true;
  if (online || installed) return '<a class="v28-link v35-label" href="' + v35Esc(href) + '">' + v35Esc(label) + '</a> <span class="v28-soft">' + v35W('inRoom', { room: V35_ROOM_NAME[room] }) + '</span>';
  return '<span class="v35-label">' + v35Esc(label) + '</span> <span class="v28-soft">' + v35W('offlineRoom', { room: V35_ROOM_NAME[room] }) + '</span>';
}
function v35LedgerSlug(name) { return String(name).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

/* The head of one comparison: its label and the door it opens. */
function v35CompareHead(h, e) {
  var label = v35Str(e.label);
  var ref = v35Str(e.ref);
  if (e.app === 'classic' || !ref) return '<span class="v35-label">' + v35Esc(label) + '</span>' + (e.app === 'classic' ? ' <span class="v28-soft">' + v35W('classic') + '</span>' : '');
  if (e.app === 'table') return v35RoomLink('table', /^(recipe|technique)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(ref) ? '/table/' + ref : '', label);
  if (e.app === 'ledger') return v35RoomLink('ledger', '/ledger/#/library/' + v35LedgerSlug(ref), label);
  /* the Codex's own doors */
  var wine = /^w-[a-z0-9]{8}$/.test(ref) && h && Array.isArray(h.wines) ? h.wines.filter(function (w) { return w && w.id === ref; })[0] : null;
  if (wine) return '<button type="button" class="v28-link v35-door" data-v28="open" data-id="' + v35Esc(ref) + '">' + v35Esc(label) + '</button> <span class="v28-soft">' + v35W('ourWine') + '</span>';
  var grape = v35Grape(ref);
  if (grape && grape.flash) return '<button type="button" class="v28-link v35-door" data-v28="grape" data-g="' + v35Esc(grape.g.g) + '">' + v35Esc(label) + '</button> <span class="v28-soft">' + v35W('grapeCard') + '</span>';
  if (grape) {
    var rows = [];
    if (grape.g.st) rows.push(['Structure', grape.g.st]);
    if (grape.g.tell) rows.push(['Giveaway', grape.g.tell]);
    return '<span class="v35-label">' + v35Esc(label) + '</span>' + (rows.length && typeof v28Dl === 'function' ? v28Dl(rows) : '');
  }
  var prod = v35Producer(ref);
  if (prod && prod.id) return '<button type="button" class="v28-link v35-door" data-v28="producer" data-k="' + v35Esc(prod.id) + '">' + v35Esc(label) + '</button> <span class="v28-soft">' + v35W('producerDoor') + '</span>';
  var primer = v35Primer(ref);
  if (primer) return '<button type="button" class="v28-link v35-door" data-v28="primer" data-k="' + v35Esc(String(primer.key)) + '">' + v35Esc(label) + '</button> <span class="v28-soft">' + v35W('primerDoor') + '</span>';
  return '<span class="v35-label">' + v35Esc(label) + '</span>';
}
function v35CompareHtml(h, item) {
  var entries = v35Kept(item && item.compare);
  if (!Array.isArray(entries)) return '';
  var rows = entries.filter(function (e) { return e && v35Str(e.label); }).map(function (e) {
    return '<li data-app="' + v35Esc(e.app) + '">' + v35CompareHead(h, e)
      + (v35Str(e.same) ? '<span class="v35-sub"><span class="v28-soft">' + v35W('same') + ':</span> ' + v35Esc(v35Str(e.same)) + '</span>' : '')
      + (v35Str(e.different) ? '<span class="v35-sub"><span class="v28-soft">' + v35W('different') + ':</span> ' + v35Esc(v35Str(e.different)) + '</span>' : '')
      + '</li>';
  });
  if (!rows.length) return '';
  return '<section class="v28-block v35-compare" aria-labelledby="v35-compare-h"><h3 class="secgroup" id="v35-compare-h">' + v35W('compareWith') + '</h3><ul class="v35-cmp">' + rows.join('') + '</ul></section>';
}

/* =========== on the card =========== */

/* Before the five parts when the card shows them, else before the service note. */
if (typeof v28CardHtml === 'function') {
  var _v35CardHtml = v28CardHtml;
  v28CardHtml = function (id) {
    var html = _v35CardHtml(id);
    var h = v35House();
    if (!html || !h) return html;
    var item = Array.isArray(h.wines) ? h.wines.filter(function (w) { return w && w.id === id; })[0] : null;
    if (!item) return html;
    var blocks = v35MadeOfHtml(h, id) + v35CompareHtml(h, item);
    if (!blocks) return html;
    var parts = typeof v28W === 'function' ? '<section class="v28-block"><h3 class="secgroup">' + v28W('parts') + '</h3>' : '';
    var note = typeof v28W === 'function' ? '<section class="v28-block"><p class="v28-eyebrow">' + v28W('eyebrow') : '';
    var at = parts ? html.indexOf(parts) : -1;
    if (at < 0 && note) at = html.indexOf(note);
    if (at < 0) return html;
    return html.slice(0, at) + blocks + html.slice(at);
  };
}

/* The card's flash button: the wine's component deck, dealt at once. */
if (typeof v28Act === 'function') {
  var _v35Act = v28Act;
  v28Act = function (act, node) {
    if (act === 'v35flash') {
      var id = node && typeof node.getAttribute === 'function' ? node.getAttribute('data-id') || '' : '';
      if (typeof v32StartRun === 'function') v32StartRun('item-components:' + id, { push: true, keepOrder: true });
      return;
    }
    return _v35Act(act, node);
  };
}

/* =========== the decks =========== */

if (typeof v32DeckDef === 'function') {
  var _v35DeckDef = v32DeckDef;
  v32DeckDef = function (id) {
    var s = String(id || '');
    var m;
    if ((m = /^(components(?:-all)?)(?::(ingredient|technique|story))?$/.exec(s)) || /^item-components:(w-[a-z0-9]{8})$/.test(s)) {
      var h = v35House();
      var def = { id: s, name: '', cards: [], kind: 'component' };
      if (m) {
        var all = m[1] === 'components-all';
        var kind = m[2];
        def.name = kind ? V35_LABELS[kind] : v35W(all ? 'allComponents' : 'everyComponent');
        def.cards = v35Cards(h, all ? 'all' : 'wine').filter(function (c) { return !kind || c.ck === kind; });
      }
      else {
        var id = s.slice('item-components:'.length);
        var w = h && Array.isArray(h.wines) ? h.wines.filter(function (x) { return x && x.id === id; })[0] : null;
        def.name = v35W('itemDeck', { name: w ? w.name : 'One wine' });
        def.cards = v35ItemCards(h, id);
      }
      def.learnt = v32Learnt(def);
      return def;
    }
    return _v35DeckDef(id);
  };
}
/* Scope choices replace only the deck setup route. A running card keeps its
   original cards, position and history token until the reader leaves it. */
if (typeof v32DeckHtml === 'function') {
  var _v35DeckHtml = v32DeckHtml;
  v32DeckHtml = function () {
    var html = _v35DeckHtml();
    var m = /^(components(?:-all)?)(?::(ingredient|technique|story))?$/.exec(String(S._v32deck || ''));
    if (!m) return html;
    var all = m[1] === 'components-all';
    var suffix = m[2] ? ':' + m[2] : '';
    var scope = '<p class="v32-line">' + v35W(all ? 'allScope' : 'wineScope') + '</p>'
      + '<div class="v32chips" role="group" aria-label="' + v35W('componentScope') + '">'
      + [['components', 'everyComponent'], ['components-all', 'allComponents']].map(function (choice) {
        return '<button type="button" class="v28-chip" data-v32="narrow" data-deck="' + choice[0] + suffix + '" aria-pressed="' + (choice[0] === m[1] ? 'true' : 'false') + '">' + v35W(choice[1]) + '</button>';
      }).join('') + '</div>';
    var at = html.indexOf('<button type="button" class="btn gold v32-go"');
    if (at < 0) at = html.lastIndexOf('</div>');
    return at < 0 ? html : html.slice(0, at) + scope + html.slice(at);
  };
}
if (typeof v32Learnt === 'function') {
  var _v35Learnt = v32Learnt;
  v32Learnt = function (def) {
    if (def && def.kind === 'component') return def.cards.filter(function (c) { return typeof v32Latest === 'function' && v32Latest(c.id) === 'got'; }).length;
    return _v35Learnt(def);
  };
}
/* One wine's components are dealt in the order its card shows them. */
if (typeof v32StartRun === 'function') {
  var _v35StartRun = v32StartRun;
  v32StartRun = function (deckId, opts) {
    var o = opts || {};
    if (/^item-components:/.test(String(deckId || ''))) o.keepOrder = true;
    return _v35StartRun(deckId, o);
  };
}
/* A component's grade is recorded as a word's is, under its own key. */
if (typeof v32Grade === 'function') {
  var _v35Grade = v32Grade;
  v32Grade = function (got) {
    var r = S._v32run;
    var c = r && r.flip && r.deck && r.deck.length ? r.cards[r.deck[0]] : null;
    if (c && c.kind === 'component' && typeof v27RecordHouse === 'function') v27RecordHouse('h-' + c.id + '-component', 'Our List', c.front, !!got);
    return _v35Grade(got);
  };
}
if (typeof v32CardFace === 'function') {
  var _v35CardFace = v32CardFace;
  v32CardFace = function (c, run) {
    if (!c || c.kind !== 'component') return _v35CardFace(c, run);
    var head = '<span class="v28-eyebrow v28-ink">' + v32W('front') + (c.label ? ' · ' + v35Esc(c.label) : '') + '</span>';
    if (!run.flip) return '<button type="button" class="card v28-front" data-v32="flip" id="v32-face">' + head + '<span class="v28-fname">' + v35Esc(c.front) + '</span></button>';
    return '<div class="card v28-back" id="v32-face"><p class="v28-eyebrow v28-ink">' + v32W('answer') + (c.label ? ' · ' + v35Esc(c.label) : '') + '</p>'
      + '<h3 class="v28-bname" tabindex="-1" id="v32-ans">' + v35Esc(c.front) + '</h3><p>' + v35Esc(c.back) + '</p></div>';
  };
}
/* The Flashcards root: a deck per kind, under What it's made of, before the words. */
if (typeof v32FlashcardsHtml === 'function') {
  var _v35FlashcardsHtml = v32FlashcardsHtml;
  v32FlashcardsHtml = function () {
    var html = _v35FlashcardsHtml();
    if (!v35House() || typeof v32Group !== 'function' || typeof v32DeckRow !== 'function') return html;
    var rows = v32DeckRow('components') + V35_KINDS.map(function (k) { return v32DeckRow('components:' + k); }).join('') + v32DeckRow('components-all');
    var group = v32Group(v35W('madeOf'), rows, 'v35-fc-made');
    if (!group) return html;
    var at = html.indexOf('<section class="v32-group" aria-labelledby="v32-fc-words"');
    if (at < 0) at = html.lastIndexOf('</div>');
    return at < 0 ? html : html.slice(0, at) + group + html.slice(at);
  };
}

/* =========== the door from another room =========== */

var V35_WANT = null;
(function () {
  try {
    if (typeof location === 'undefined' || !location) return;
    var hash = typeof location.hash === 'string' ? location.hash : '';
    var m = /^#ref=(.+)$/.exec(hash);
    if (!m) return;
    var ref = '';
    try { ref = decodeURIComponent(m[1]); } catch (e) { ref = m[1]; }
    if (!ref || ref.length > 200) return;
    V35_WANT = ref;
    if (typeof history !== 'undefined' && history && typeof history.replaceState === 'function') {
      history.replaceState(null, '', (location.pathname || '') + (typeof location.search === 'string' ? location.search : ''));
    }
  } catch (e) { V35_WANT = null; }
})();

/* Opens the door a ref names: a grape's profile in the run of every grape, a producer, a primer. True when one opened. */
function v35OpenRef(ref) {
  var grape = v35Grape(ref);
  if (grape && typeof v32StartRun === 'function') {
    /* This is the reference deck across every level, not the active list.
       Guard the exact destination so a partial installation cannot silently
       substitute the first card when the requested profile is unavailable. */
    var deck = typeof v32DeckDef === 'function' ? v32DeckDef('grapes-all') : null;
    if (!deck || !Array.isArray(deck.cards) || !deck.cards.some(function (card) { return card.id === grape.g.g; })) return false;
    return v32StartRun('grapes-all', { push: true, first: grape.g.g }) !== false;
  }
  var prod = v35Producer(ref);
  if (prod && prod.id) {
    var ci = 0;
    try { if (typeof prodGroups === 'function') prodGroups().forEach(function (g, i) { if (g.rows.indexOf(prod) >= 0) ci = i; }); } catch (e) { }
    S._v25area = 'library'; S._prod = { c: ci, id: prod.id }; S.view = 'producers';
    if (typeof V32 !== 'undefined' && V32) V32.pend = 'push';
    render();
    return true;
  }
  var primer = v35Primer(ref);
  if (primer) {
    S._v25area = 'library'; S.primerKey = primer.key; S.view = 'primer';
    if (typeof V32 !== 'undefined' && V32) V32.pend = 'push';
    render();
    return true;
  }
  return false;
}

/* The outermost render: the first one honours the door, once. */
var _v35Render = render;
render = function () {
  if (V35_WANT) {
    var want = V35_WANT;
    V35_WANT = null;
    var out = _v35Render.apply(this, arguments);
    try { v35OpenRef(want); } catch (e) { }
    return out;
  }
  return _v35Render.apply(this, arguments);
};
