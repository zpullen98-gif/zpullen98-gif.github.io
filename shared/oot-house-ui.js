/* Outside Of Time: the House, read and kept, for the two plain wings.

   WHAT THIS IS. One classic script, no build step, no dependency, that
   installs window.OOT.houseUI = { readView, review } and returns at once
   when it is already there. The Bartender's Ledger and the Sommelier's
   Codex call it inside their Mine pane, so a bartender or a sommelier reads
   the whole house and keeps what she wrote without the World Table, whose
   Svelte screens draw the same things their own way.

     readView(root, house, hooks)
       The house: the card (name, address, telephone, the meals as rows, the
       dress code, the history), the tastings as a table with every course
       resolved to its dish names and its pour, the must-knows, the lexicon,
       the guest conversations, the mix-ups and the lineup register.

     review(root, house, step, hooks)
       Hers, to look over, for one step: 'formula' (the five Floor Deck
       lines, the parts and the timed lines on dishes and cocktails),
       'pairings' (the pairing block on dishes), 'wines' (everything on a
       wine but its comparisons), 'lexicon' (the words), 'scenarios' (the
       table: the conversations, the mix-ups and the must-knows), 'compare'
       (each dish, cocktail and wine's comparisons) or 'components' (each
       component's say, explanation and flash card). Every item carrying
       a mark of hers that nobody has kept, with Keep, Edit and Discard on
       each mark, Keep all on this item, and Keep all that read cleanly.

   hooks = { setMark(kind, id, field, mark), discard(kind, id, field),
   problems(kind, id) }, each optional. `kind` is 'dish', 'wine' or
   'cocktail' for an item, the list's own name ('lexicon', 'scenarios',
   'mixUps', 'mustKnows', 'components') for the rest, and 'house' for the card's history:
   the first argument OOT.house.setMark takes, so a wing hands that through
   and a discard that calls it with null. problems(kind, id) may return a
   list of { field, said } for the item; a problem naming a field holds that
   mark back from Keep all that read cleanly, and one naming no field holds
   the whole item back. A line over its word cap or a string carrying a dash
   is held back by this file's own count whether or not problems is given.

   KEPT MEANS by === 'person'. A kept mark is drawn as text under the word
   Kept. A mark of hers, by 'maitre', is drawn under the eyebrow "Hers, not
   yet kept" with its three chips. Keep writes her value back with by
   'person' and a fresh stamp; Edit opens one editor (a box for a line, five
   labelled boxes for the parts, three with a live word count for the timed
   lines, thirteen for a pairing, one per line for a list) and Save writes
   the typed value the same way; Discard calls the discard hook. The press
   is shown at once, on this screen, and the wing redraws from the house it
   saves; nothing here writes a record and nothing here reads one.

   HOW IT DRAWS. Plain DOM into the root it is given, cleared and redrawn on
   every call, so calling it twice is the same as calling it once; one
   delegated click listener per root, on data-h, attached the first time and
   never again. No innerHTML anywhere: every string enters the page through
   esc(), which makes a TEXT NODE, so the words are drawn as characters and
   never read as markup. Every control is a button or a box at least 44px
   tall; every state is a word, never a colour alone; no pictorial icon, no
   emoji, no numeral for a level, no real person named.

   The words a person reads live in STRINGS at the top and nowhere else,
   British spelling, no dash of any kind; tools/check-house-ui.mjs renders
   both views over the fixture under node:vm and holds the file and every
   drawn string to the Codex's voice rules and the Ledger's rule that nobody
   is named. Pure ASCII: a letter outside it is written as an escape.

   Canonical source: WorldTable/static/shared/oot-house-ui.js, mirrored byte
   for byte to the site's shared/oot-house-ui.js. Loaded by the two wing
   shells after oot-house.js; the Table never loads it.
*/
(function (w) {
  'use strict';
  var OOT = w.OOT = w.OOT || {};
  if (OOT.houseUI) return; // loaded twice by two doors: the first install stands

  /* ---------------------------------------------------------------------
   * The words
   * ------------------------------------------------------------------ */

  var STRINGS = {
    house: 'The house',
    review: 'Hers, to look over',
    reviewHint: 'What she wrote, as she wrote it. Keep a line as it stands, edit it into your own words, or discard it. Until you keep it, it reaches no drill, no guest and no card.',
    nothingToReview: 'Nothing of hers waits on this step.',
    noStep: 'No such step.',
    noHouse: 'There is no house on this device yet.',
    waitOne: 'line of hers waits on this step.',
    waitMany: 'lines of hers wait on this step.',
    kept: 'Kept',
    unkept: 'Hers, not yet kept',
    keep: 'Keep',
    edit: 'Edit',
    discard: 'Discard',
    save: 'Save',
    cancel: 'Cancel',
    keepItem: 'Keep all on this item',
    keepClean: 'Keep all that read cleanly',
    card: 'The card',
    address: 'Address',
    phone: 'Telephone',
    site: 'Site',
    meals: 'Meals',
    meal: 'Meal',
    days: 'Days',
    hours: 'Hours',
    dressCode: 'Dress code',
    menusReadOn: 'Menus read on',
    history: 'The history',
    tastings: 'Tastings',
    price: 'Price',
    course: 'Course',
    dishes: 'Dishes',
    pour: 'Pour',
    noPour: 'No pour printed',
    drinksIn: 'Drinks included',
    drinksOut: 'Drinks not included',
    mustKnows: 'Must-knows',
    lexicon: 'The lexicon',
    scenarios: 'Guest conversations',
    guest: 'The guest',
    mixUps: 'Mix-ups',
    lineup: 'Ask at lineup',
    askThe: 'Ask the',
    whom: { chef: 'chef', sommelier: 'sommelier', bar: 'bar', manager: 'manager' },
    confirm: 'Confirm on shift',
    answered: 'Answered',
    on: 'on',
    about: 'About',
    or: 'or',
    nothingYet: 'Nothing here yet.',
    gone: 'an item no longer on the list',
    none: 'none',
    of: 'of',
    words: 'words',
    overCap: 'Over its cap',
    hasDash: 'Carries a dash',
    onePerLine: 'One per line',
    principlesHint: 'Separated by commas, from: acid, fat, weight, sweet, heat, tannin, salt, bridge, method',
    idHint: 'The id of a house wine or cocktail, or blank',
    steps: {
      formula: 'The formula',
      pairings: 'The pairings',
      wines: 'The wines',
      lexicon: 'The words',
      scenarios: 'The table',
      compare: 'The comparisons',
      components: 'The components'
    },
    kinds: {
      dishes: 'Dish',
      wines: 'Wine',
      cocktails: 'Cocktail',
      lexicon: 'Term',
      scenarios: 'Conversation',
      mixUps: 'Mix-up',
      mustKnows: 'Must-know',
      components: 'Component'
    },
    fields: {
      say: 'How to say it',
      guest: 'The guest line',
      why: 'Why it is on the menu',
      pairs: 'What it pairs with',
      origin: 'Where it comes from',
      ingredientsNamed: 'What the menu named',
      parts: 'The five parts',
      lines: 'The timed lines',
      pairing: 'The pairing',
      profile: 'The profile',
      goesWith: 'What it goes with',
      firstPickIds: 'First pick for',
      serve: 'How it is served',
      upsells: 'What to offer next',
      toGuest: 'To a guest',
      you: 'Your line',
      principle: 'The principle',
      difference: 'What tells them apart',
      ask: 'The question that settles it',
      body: 'What to know',
      history: 'The history',
      compare: 'Compare with',
      explain: 'The explanation',
      card: 'The flash card'
    },
    lines: { s10: 'Ten seconds', s20: 'Twenty seconds', s45: 'Forty five seconds' },
    card: { front: 'The front', back: 'The back' },
    compare: { app: 'Where', ref: 'What it opens', label: 'The comparison', same: 'What is the same', different: 'What is different' },
    compareEntry: 'Comparison',
    appHint: 'table, ledger, codex or classic',
    pairing: {
      wineId: 'The wine',
      why: 'Why',
      sayIt: 'Say it',
      whyThisWine: 'Why this wine',
      palate: 'On the palate',
      principles: 'The principles',
      secondId: 'The second pick',
      secondWhy: 'Why the second',
      stepUp: 'The step up',
      serve: 'Serve it',
      avoid: 'Avoid',
      zeroProofId: 'Without alcohol',
      zeroProofWhy: 'Why that one'
    }
  };

  /* ---------------------------------------------------------------------
   * The shape, copied from house-schema.ts so this file loads with no
   * engine beside it. tools/check-house-ui.mjs holds every value here
   * against the TypeScript, so a drift fails there before it ships.
   * ------------------------------------------------------------------ */

  var LINE_CAPS = { s10: 25, s20: 50, s45: 110 };
  var LINE_KEYS = ['s10', 's20', 's45'];
  var PART_KEYS = ['main', 'technique', 'sauce', 'sides', 'taste'];
  var PRINCIPLES = ['acid', 'fat', 'weight', 'sweet', 'heat', 'tannin', 'salt', 'bridge', 'method'];
  var PARTS = {
    dish: { main: 'main ingredient', technique: 'technique', sauce: 'sauce and key flavours', sides: 'accompaniments', taste: 'how it tastes' },
    cocktail: { main: 'the spirit', technique: 'the build', sauce: 'modifiers and key flavours', sides: 'glass and garnish', taste: 'how it tastes' },
    wine: { main: 'grape and region', technique: 'how it is made', sauce: 'the profile', sides: 'what it goes with', taste: 'how it tastes' }
  };
  var PAIRING_KEYS = ['wineId', 'why', 'sayIt', 'whyThisWine', 'palate', 'principles', 'secondId', 'secondWhy', 'stepUp', 'serve', 'avoid', 'zeroProofId', 'zeroProofWhy'];
  var ID_KEYS = { wineId: 1, secondId: 1, zeroProofId: 1 };
  var LIST_FIELDS = { ingredientsNamed: 1, firstPickIds: 1, upsells: 1 };
  var ID_LIST_FIELDS = { firstPickIds: 1, upsells: 1 };
  var CARD_KEYS = ['front', 'back'];
  var COMPARE_KEYS = ['app', 'ref', 'label', 'same', 'different'];
  var COMPARE_MAX = 2;

  /* The marks each step looks over, per list. Dishes, wines and cocktails
     are addressed by their kind; the other lists by their name. */
  var FLOOR_MARKS = ['say', 'guest', 'why', 'pairs', 'origin', 'ingredientsNamed', 'parts', 'lines'];
  var STEP_MARKS = {
    formula: { dishes: FLOOR_MARKS, cocktails: FLOOR_MARKS.concat(['upsells']) },
    pairings: { dishes: ['pairing'] },
    wines: { wines: ['say', 'guest', 'why', 'pairs', 'origin', 'profile', 'goesWith', 'firstPickIds', 'serve', 'parts', 'lines'] },
    lexicon: { lexicon: ['say', 'toGuest'] },
    scenarios: { scenarios: ['you', 'principle'], mixUps: ['difference', 'ask'], mustKnows: ['body'] },
    compare: { dishes: ['compare'], cocktails: ['compare'], wines: ['compare'] },
    components: { components: ['say', 'explain', 'card'] }
  };
  var LIST_ORDER = ['dishes', 'cocktails', 'wines', 'lexicon', 'scenarios', 'mixUps', 'mustKnows', 'components'];
  var KIND_OF = { dishes: 'dish', wines: 'wine', cocktails: 'cocktail', lexicon: 'lexicon', scenarios: 'scenarios', mixUps: 'mixUps', mustKnows: 'mustKnows', components: 'components' };
  var LIST_OF = { dish: 'dishes', wine: 'wines', cocktail: 'cocktails', lexicon: 'lexicon', scenarios: 'scenarios', mixUps: 'mixUps', mustKnows: 'mustKnows', components: 'components' };

  /* The dash in every spelling the House refuses, built from pieces so this
     file does not carry what it refuses; the word, as house-lines.ts counts
     it, with the accented letters as escapes so the pattern stays ASCII. */
  var DASH = new RegExp(['\\u2014', '\\u2013', '&' + 'mdash;', '&#' + '8212;', '&#' + 'x2014;', ' ' + '-- '].join('|'), 'i');
  var WORD = new RegExp("[A-Za-z0-9\\u00C0-\\u024F'\\u2019]+(?:-[A-Za-z0-9\\u00C0-\\u024F'\\u2019]+)*", 'g');

  var CSS =
    '.oot-h{font:inherit;color:inherit;line-height:1.5}' +
    '.oot-h h2,.oot-h h3,.oot-h h4{margin:18px 0 8px;font-size:1.05em;line-height:1.3}' +
    '.oot-h h2{font-size:1.25em}' +
    '.oot-h p{margin:6px 0}' +
    '.oot-h-eyebrow{display:block;font-size:.74em;letter-spacing:.08em;text-transform:uppercase;opacity:.78;margin:10px 0 2px}' +
    '.oot-h-label{display:block;font-weight:600;margin:0 0 2px}' +
    '.oot-h-row{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}' +
    '.oot-h-chip{min-height:44px;min-width:44px;padding:10px 14px;font:inherit;color:inherit;background:transparent;border:1px solid currentColor;border-radius:4px;cursor:pointer}' +
    '.oot-h textarea,.oot-h input{display:block;width:100%;box-sizing:border-box;min-height:44px;padding:10px;margin:4px 0 8px;font:inherit;color:inherit;background:transparent;border:1px solid currentColor;border-radius:4px}' +
    '.oot-h textarea{min-height:88px;resize:vertical}' +
    '.oot-h label{display:block;margin:6px 0}' +
    '.oot-h table{border-collapse:collapse;width:100%;margin:6px 0 12px}' +
    '.oot-h th,.oot-h td{text-align:left;vertical-align:top;padding:8px 10px;border-bottom:1px solid currentColor}' +
    '.oot-h th{font-size:.8em;letter-spacing:.06em;text-transform:uppercase;opacity:.8}' +
    '.oot-h-note{opacity:.82;font-size:.94em}' +
    '.oot-h-state{font-size:.88em;opacity:.88}' +
    '.oot-h-item{padding:12px 0;border-top:1px solid currentColor}' +
    '.oot-h-mark{margin:8px 0 12px}' +
    '.oot-h-count{display:block;font-size:.88em;opacity:.88;margin:0 0 6px}' +
    '.oot-h-sub{margin:2px 0 6px}';

  /* ---------------------------------------------------------------------
   * Drawing: esc() is the one door into the page
   * ------------------------------------------------------------------ */

  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function now() { return Date.now(); }

  /* Every string enters the page through here. A text node cannot carry
     markup, so whatever the string holds is drawn and never interpreted. */
  function esc(s) {
    return w.document.createTextNode(String(s == null ? '' : s));
  }

  function add(el, kids) {
    if (kids == null || kids === false) return;
    if (Array.isArray(kids)) { for (var i = 0; i < kids.length; i++) add(el, kids[i]); return; }
    if (typeof kids === 'string' || typeof kids === 'number') { el.appendChild(esc(kids)); return; }
    el.appendChild(kids);
  }

  function h(tag, attrs, kids) {
    var el = w.document.createElement(tag);
    if (attrs) for (var k in attrs) if (has(attrs, k) && attrs[k] != null) el.setAttribute(k, String(attrs[k]));
    add(el, kids);
    return el;
  }

  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }

  function chip(action, data, text) {
    var attrs = { type: 'button', 'class': 'oot-h-chip', 'data-h': action };
    for (var k in data) if (has(data, k)) attrs[k] = data[k];
    return h('button', attrs, text);
  }

  function eyebrow(text) { return h('span', { 'class': 'oot-h-eyebrow' }, text); }
  function note(text) { return h('p', { 'class': 'oot-h-note' }, text); }
  function line(label, text) { return h('p', null, [eyebrow(label), text]); }

  function ensureStyle() {
    var d = w.document;
    if (!d || !d.head || d.__ootHouseUIStyled) return;
    d.__ootHouseUIStyled = true;
    var s = h('style', { 'data-oot-house-ui': '1' }, CSS);
    d.head.appendChild(s);
  }

  /* ---------------------------------------------------------------------
   * The house, read
   * ------------------------------------------------------------------ */

  function wordCount(s) {
    if (typeof s !== 'string' || !s) return 0;
    var m = s.match(WORD);
    return m ? m.length : 0;
  }

  function anyDash(v) {
    if (typeof v === 'string') return DASH.test(v);
    if (Array.isArray(v)) { for (var i = 0; i < v.length; i++) if (anyDash(v[i])) return true; return false; }
    if (v && typeof v === 'object') { for (var k in v) if (has(v, k) && anyDash(v[k])) return true; }
    return false;
  }

  /* The wings' mark: a known by, a finite stamp, a value that is there. */
  function isMark(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v) &&
      (v.by === 'maitre' || v.by === 'person') &&
      typeof v.ts === 'number' && isFinite(v.ts) &&
      v.value !== undefined && v.value !== null;
  }

  function items(house, list) {
    var l = house && house[list];
    return Array.isArray(l) ? l : [];
  }

  function findIn(house, list, id) {
    var l = items(house, list);
    for (var i = 0; i < l.length; i++) if (l[i] && l[i].id === id) return l[i];
    return null;
  }

  /* A dish, wine or cocktail by id, from any of the three lists. */
  function nameOf(house, id) {
    if (!id) return STRINGS.none;
    var lists = ['dishes', 'wines', 'cocktails'];
    for (var i = 0; i < lists.length; i++) {
      var it = findIn(house, lists[i], id);
      if (it) return it.name || id;
    }
    return STRINGS.gone;
  }

  function namesOf(house, ids) {
    if (!Array.isArray(ids) || !ids.length) return STRINGS.none;
    var out = [];
    for (var i = 0; i < ids.length; i++) out.push(nameOf(house, ids[i]));
    return out.join(', ');
  }

  function nameOfItem(house, list, it) {
    if (list === 'lexicon') return it.term || '';
    if (list === 'scenarios' || list === 'mustKnows') return it.title || '';
    if (list === 'mixUps') return nameOf(house, it.aId) + ' ' + STRINGS.or + ' ' + nameOf(house, it.bId);
    return it.name || '';
  }

  function labelOf(field) { return has(STRINGS.fields, field) ? STRINGS.fields[field] : field; }

  function valueView(st, kind, field, value) {
    var house = st.house;
    var box = h('div', { 'class': 'oot-h-value' });
    if (field === 'parts' && value && typeof value === 'object') {
      var labels = PARTS[kind] || PARTS.dish;
      for (var i = 0; i < PART_KEYS.length; i++) {
        var pk = PART_KEYS[i];
        box.appendChild(h('p', { 'class': 'oot-h-sub' }, [eyebrow(labels[pk]), String(value[pk] || '')]));
      }
      return box;
    }
    if (field === 'lines' && value && typeof value === 'object') {
      for (var j = 0; j < LINE_KEYS.length; j++) {
        var lk = LINE_KEYS[j];
        var text = String(value[lk] || '');
        var n = wordCount(text);
        var count = n + ' ' + STRINGS.of + ' ' + LINE_CAPS[lk] + ' ' + STRINGS.words + (n > LINE_CAPS[lk] ? '. ' + STRINGS.overCap : '');
        box.appendChild(h('p', { 'class': 'oot-h-sub' }, [eyebrow(STRINGS.lines[lk]), text, h('span', { 'class': 'oot-h-count' }, count)]));
      }
      return box;
    }
    if (field === 'pairing' && value && typeof value === 'object') {
      for (var p = 0; p < PAIRING_KEYS.length; p++) {
        var key = PAIRING_KEYS[p];
        var v = value[key];
        var shown = has(ID_KEYS, key) ? nameOf(house, v) : (Array.isArray(v) ? v.join(', ') : String(v == null ? '' : v));
        box.appendChild(h('p', { 'class': 'oot-h-sub' }, [eyebrow(STRINGS.pairing[key]), shown]));
      }
      return box;
    }
    if (field === 'card' && value && typeof value === 'object') {
      for (var c = 0; c < CARD_KEYS.length; c++) box.appendChild(h('p', { 'class': 'oot-h-sub' }, [eyebrow(STRINGS.card[CARD_KEYS[c]]), String(value[CARD_KEYS[c]] || '')]));
      return box;
    }
    if (field === 'compare' && Array.isArray(value)) {
      for (var e = 0; e < value.length; e++) {
        var entry = value[e] && typeof value[e] === 'object' ? value[e] : {};
        var where = String(entry.app || '') + (entry.ref ? ', ' + String(entry.ref) : '');
        box.appendChild(h('p', { 'class': 'oot-h-sub' }, [eyebrow(String(entry.label || STRINGS.compareEntry) + (where ? ' (' + where + ')' : '')), String(entry.same || ''), ' ', String(entry.different || '')]));
      }
      return box;
    }
    if (Array.isArray(value)) {
      box.appendChild(h('p', null, has(ID_LIST_FIELDS, field) ? namesOf(house, value) : value.join(', ')));
      return box;
    }
    box.appendChild(h('p', null, String(value)));
    return box;
  }

  /* The problems that hold a mark back from Keep all that read cleanly:
     this file's own count (a timed line over its cap, a dash anywhere in
     the value) and the hook's, when a wing gives one. Each is a sentence. */
  function problemsFor(st, kind, id, field, value) {
    var out = [];
    if (field === 'lines' && value && typeof value === 'object') {
      for (var i = 0; i < LINE_KEYS.length; i++) {
        var lk = LINE_KEYS[i];
        var n = wordCount(String(value[lk] || ''));
        if (n > LINE_CAPS[lk]) out.push(STRINGS.overCap + ': ' + STRINGS.lines[lk] + ', ' + n + ' ' + STRINGS.of + ' ' + LINE_CAPS[lk] + ' ' + STRINGS.words);
      }
    }
    if (anyDash(value)) out.push(STRINGS.hasDash);
    var hook = st.hooks && st.hooks.problems;
    if (typeof hook === 'function') {
      var got = hook(kind, id);
      if (Array.isArray(got)) {
        for (var j = 0; j < got.length; j++) {
          var p = got[j];
          if (!p || typeof p !== 'object') continue;
          if (p.field && p.field !== field) continue;
          out.push(String(p.said || p.code || p.field || field));
        }
      }
    }
    return out;
  }

  /* ---------------------------------------------------------------------
   * The marks: where the press shows at once
   * ------------------------------------------------------------------ */

  function keyOf(kind, id, field) { return kind + '|' + id + '|' + field; }

  function itemOf(st, kind, id) {
    if (kind === 'house') return st.house;
    var list = LIST_OF[kind];
    return list ? findIn(st.house, list, id) : null;
  }

  /* The mark as this screen knows it: the press a person just made, when
     there was one, else the house's own. Cleared when a house arrives. */
  function markAt(st, kind, id, field, item) {
    var k = keyOf(kind, id, field);
    if (has(st.overlay, k)) return st.overlay[k];
    return item ? item[field] : undefined;
  }

  function write(st, kind, id, field, mark) {
    st.overlay[keyOf(kind, id, field)] = mark;
    if (st.hooks && typeof st.hooks.setMark === 'function') st.hooks.setMark(kind, id, field, mark);
  }

  function keepMark(st, kind, id, field, item) {
    var m = markAt(st, kind, id, field, item);
    if (!isMark(m) || m.by === 'person') return false;
    var mark = { value: m.value, by: 'person', ts: now() };
    if (typeof m.model === 'string' && m.model) mark.model = m.model;
    write(st, kind, id, field, mark);
    return true;
  }

  function discardMark(st, kind, id, field) {
    st.overlay[keyOf(kind, id, field)] = null;
    if (st.hooks && typeof st.hooks.discard === 'function') st.hooks.discard(kind, id, field);
  }

  function isEditing(st, kind, id, field) {
    var e = st.editing;
    return !!e && e.kind === kind && e.id === id && e.field === field;
  }

  function markRow(st, kind, id, field, label, item) {
    var m = markAt(st, kind, id, field, item);
    if (!isMark(m)) return null;
    var kept = m.by === 'person';
    var row = h('div', { 'class': 'oot-h-mark', 'data-mark': field, 'data-state': kept ? 'kept' : 'hers' });
    row.appendChild(eyebrow(kept ? STRINGS.kept : STRINGS.unkept));
    row.appendChild(h('span', { 'class': 'oot-h-label' }, label));
    if (!kept && isEditing(st, kind, id, field)) {
      row.appendChild(editor(st, kind, id, field, m.value));
      return row;
    }
    row.appendChild(valueView(st, kind, field, m.value));
    if (!kept) {
      var probs = problemsFor(st, kind, id, field, m.value);
      for (var i = 0; i < probs.length; i++) row.appendChild(h('p', { 'class': 'oot-h-state' }, probs[i]));
      var data = { 'data-kind': kind, 'data-id': id, 'data-field': field };
      row.appendChild(h('div', { 'class': 'oot-h-row' }, [
        chip('keep', data, STRINGS.keep),
        chip('edit', data, STRINGS.edit),
        chip('discard', data, STRINGS.discard)
      ]));
    }
    return row;
  }

  /* ---------------------------------------------------------------------
   * The editor: one box, or five, or three with a count, or thirteen
   * ------------------------------------------------------------------ */

  function field(label, control, hint) {
    var l = h('label', null, [h('span', { 'class': 'oot-h-label' }, label)]);
    if (hint) l.appendChild(h('span', { 'class': 'oot-h-note' }, hint));
    l.appendChild(control);
    return l;
  }

  function box(name, value, multi) {
    var el = h(multi ? 'textarea' : 'input', multi ? { 'data-e': name, rows: '3' } : { 'data-e': name, type: 'text' });
    el.value = value == null ? '' : String(value);
    return el;
  }

  function countText(lk, text) {
    var n = wordCount(text);
    return n + ' ' + STRINGS.of + ' ' + LINE_CAPS[lk] + ' ' + STRINGS.words + (n > LINE_CAPS[lk] ? '. ' + STRINGS.overCap : '');
  }

  function editor(st, kind, id, fieldName, value) {
    var ed = h('div', { 'class': 'oot-h-editor', 'data-editor': fieldName });
    var i, k;
    if (fieldName === 'parts') {
      var labels = PARTS[kind] || PARTS.dish;
      var parts = value && typeof value === 'object' ? value : {};
      for (i = 0; i < PART_KEYS.length; i++) {
        k = PART_KEYS[i];
        ed.appendChild(field(labels[k], box(k, parts[k], false)));
      }
    } else if (fieldName === 'lines') {
      var lines = value && typeof value === 'object' ? value : {};
      for (i = 0; i < LINE_KEYS.length; i++) {
        k = LINE_KEYS[i];
        var ta = box(k, lines[k], true);
        var count = h('span', { 'class': 'oot-h-count', 'data-count': k }, countText(k, ta.value));
        ta.addEventListener('input', (function (key, area, span) {
          return function () { clear(span); span.appendChild(esc(countText(key, area.value))); };
        })(k, ta, count));
        var l = field(STRINGS.lines[k], ta);
        l.appendChild(count);
        ed.appendChild(l);
      }
    } else if (fieldName === 'pairing') {
      var pairing = value && typeof value === 'object' ? value : {};
      for (i = 0; i < PAIRING_KEYS.length; i++) {
        k = PAIRING_KEYS[i];
        var v = pairing[k];
        var text = Array.isArray(v) ? v.join(', ') : (v == null ? '' : String(v));
        var hint = k === 'principles' ? STRINGS.principlesHint : (has(ID_KEYS, k) ? STRINGS.idHint : null);
        ed.appendChild(field(STRINGS.pairing[k], box(k, text, !has(ID_KEYS, k) && k !== 'principles'), hint));
      }
    } else if (fieldName === 'card') {
      var card = value && typeof value === 'object' ? value : {};
      for (i = 0; i < CARD_KEYS.length; i++) ed.appendChild(field(STRINGS.card[CARD_KEYS[i]], box(CARD_KEYS[i], card[CARD_KEYS[i]], true)));
    } else if (fieldName === 'compare') {
      var entries = Array.isArray(value) ? value : [];
      for (var n = 0; n < COMPARE_MAX; n++) {
        var en = entries[n] && typeof entries[n] === 'object' ? entries[n] : {};
        ed.appendChild(h('p', { 'class': 'oot-h-label' }, STRINGS.compareEntry + ' ' + (n + 1)));
        for (i = 0; i < COMPARE_KEYS.length; i++) {
          k = COMPARE_KEYS[i];
          ed.appendChild(field(STRINGS.compare[k], box(k + n, en[k], k === 'same' || k === 'different'), k === 'app' ? STRINGS.appHint : null));
        }
      }
    } else if (has(LIST_FIELDS, fieldName) || Array.isArray(value)) {
      ed.appendChild(field(labelOf(fieldName), box('list', Array.isArray(value) ? value.join('\n') : '', true), STRINGS.onePerLine));
    } else {
      ed.appendChild(field(labelOf(fieldName), box('text', value, true)));
    }
    var data = { 'data-kind': kind, 'data-id': id, 'data-field': fieldName };
    ed.appendChild(h('div', { 'class': 'oot-h-row' }, [chip('save', data, STRINGS.save), chip('cancel', data, STRINGS.cancel)]));
    return ed;
  }

  function trim(s) { return String(s == null ? '' : s).replace(/^\s+|\s+$/g, ''); }

  function boxValue(ed, name) {
    var el = ed.querySelector('[data-e="' + name + '"]');
    return el ? String(el.value == null ? '' : el.value) : '';
  }

  /* What was typed, brought to the field's shape; undefined when blank. */
  function readEditor(ed, fieldName) {
    var i, k, any = false, out;
    if (fieldName === 'parts') {
      out = {};
      for (i = 0; i < PART_KEYS.length; i++) { k = PART_KEYS[i]; out[k] = trim(boxValue(ed, k)); if (out[k]) any = true; }
      return any ? out : undefined;
    }
    if (fieldName === 'lines') {
      out = {};
      for (i = 0; i < LINE_KEYS.length; i++) { k = LINE_KEYS[i]; out[k] = trim(boxValue(ed, k)); if (out[k]) any = true; }
      return any ? out : undefined;
    }
    if (fieldName === 'card') {
      out = {};
      for (i = 0; i < CARD_KEYS.length; i++) { k = CARD_KEYS[i]; out[k] = trim(boxValue(ed, k)); if (out[k]) any = true; }
      return any ? out : undefined;
    }
    if (fieldName === 'compare') {
      out = [];
      for (var e = 0; e < COMPARE_MAX; e++) {
        var entry = {}, some = false;
        for (i = 0; i < COMPARE_KEYS.length; i++) { k = COMPARE_KEYS[i]; entry[k] = trim(boxValue(ed, k + e)); if (entry[k] && k !== 'app') some = true; }
        if (some) out.push(entry);
      }
      return out.length ? out : undefined;
    }
    if (fieldName === 'pairing') {
      out = {};
      for (i = 0; i < PAIRING_KEYS.length; i++) {
        k = PAIRING_KEYS[i];
        var text = trim(boxValue(ed, k));
        if (k === 'principles') {
          var names = text.split(','), kept = [];
          for (var n = 0; n < names.length; n++) {
            var name = trim(names[n]).toLowerCase();
            if (name && PRINCIPLES.indexOf(name) >= 0 && kept.indexOf(name) < 0) kept.push(name);
          }
          out[k] = kept;
          if (kept.length) any = true;
        } else {
          out[k] = text;
          if (text) any = true;
        }
      }
      return any ? out : undefined;
    }
    if (ed.querySelector('[data-e="list"]')) {
      var rows = boxValue(ed, 'list').split('\n'), list = [];
      for (i = 0; i < rows.length; i++) { var r = trim(rows[i]); if (r) list.push(r); }
      return list.length ? list : undefined;
    }
    var s = trim(boxValue(ed, 'text'));
    return s ? s : undefined;
  }

  /* ---------------------------------------------------------------------
   * The read view
   * ------------------------------------------------------------------ */

  function mealsTable(meals) {
    var t = h('table', null, [h('thead', null, h('tr', null, [h('th', null, STRINGS.meal), h('th', null, STRINGS.days), h('th', null, STRINGS.hours)]))]);
    var body = h('tbody');
    for (var i = 0; i < meals.length; i++) {
      var m = meals[i] || {};
      body.appendChild(h('tr', null, [h('td', null, m.name || ''), h('td', null, m.days || ''), h('td', null, m.hours || '')]));
    }
    t.appendChild(body);
    return t;
  }

  function tastingView(st, t) {
    var house = st.house;
    var sec = h('section', { 'class': 'oot-h-item' });
    sec.appendChild(h('h4', null, t.name || ''));
    var facts = [];
    if (t.price) facts.push(STRINGS.price + ' ' + t.price);
    if (t.meal) facts.push(t.meal);
    facts.push(t.includesDrinks ? STRINGS.drinksIn : STRINGS.drinksOut);
    sec.appendChild(note(facts.join('. ') + '.'));
    var table = h('table', null, [h('thead', null, h('tr', null, [h('th', null, STRINGS.course), h('th', null, STRINGS.dishes), h('th', null, STRINGS.pour)]))]);
    var body = h('tbody');
    var courses = Array.isArray(t.courses) ? t.courses : [];
    for (var i = 0; i < courses.length; i++) {
      var c = courses[i] || {};
      var pour = c.pourText || (c.pourId ? nameOf(house, c.pourId) : '') || STRINGS.noPour;
      body.appendChild(h('tr', null, [
        h('td', null, (c.n != null ? c.n + '. ' : '') + (c.label || '')),
        h('td', null, namesOf(house, c.dishIds)),
        h('td', null, pour)
      ]));
    }
    table.appendChild(body);
    sec.appendChild(table);
    if (t.note) sec.appendChild(note(t.note));
    return sec;
  }

  function aboutLine(house, ids) {
    if (!Array.isArray(ids) || !ids.length) return null;
    return note(STRINGS.about + ' ' + namesOf(house, ids));
  }

  function section(title, list, each) {
    var sec = h('section', { 'class': 'oot-h-section' });
    sec.appendChild(h('h3', null, title));
    if (!list.length) { sec.appendChild(note(STRINGS.nothingYet)); return sec; }
    for (var i = 0; i < list.length; i++) if (list[i]) sec.appendChild(each(list[i]));
    return sec;
  }

  function drawRead(st, out) {
    var house = st.house;
    out.appendChild(h('h2', null, STRINGS.house));

    var card = h('section', { 'class': 'oot-h-card' });
    card.appendChild(h('h3', null, house.name || STRINGS.card));
    if (house.address) card.appendChild(line(STRINGS.address, house.address));
    if (house.phone) card.appendChild(line(STRINGS.phone, house.phone));
    if (house.site) card.appendChild(line(STRINGS.site, house.site));
    var meals = items(house, 'meals');
    if (meals.length) { card.appendChild(eyebrow(STRINGS.meals)); card.appendChild(mealsTable(meals)); }
    if (house.dressCode) card.appendChild(line(STRINGS.dressCode, house.dressCode));
    if (house.menusReadOn) card.appendChild(line(STRINGS.menusReadOn, house.menusReadOn));
    var hist = markRow(st, 'house', house.id, 'history', STRINGS.history, house);
    if (hist) card.appendChild(hist);
    out.appendChild(card);

    out.appendChild(section(STRINGS.tastings, items(house, 'tastings'), function (t) { return tastingView(st, t); }));

    out.appendChild(section(STRINGS.mustKnows, items(house, 'mustKnows'), function (k) {
      var sec = h('section', { 'class': 'oot-h-item', 'data-item': k.id });
      sec.appendChild(h('h4', null, k.title || ''));
      var r = markRow(st, 'mustKnows', k.id, 'body', labelOf('body'), k);
      if (r) sec.appendChild(r);
      return sec;
    }));

    out.appendChild(section(STRINGS.lexicon, items(house, 'lexicon'), function (x) {
      var sec = h('section', { 'class': 'oot-h-item', 'data-item': x.id });
      sec.appendChild(h('h4', null, x.term || ''));
      var fields = ['say', 'toGuest'];
      for (var i = 0; i < fields.length; i++) {
        var r = markRow(st, 'lexicon', x.id, fields[i], labelOf(fields[i]), x);
        if (r) sec.appendChild(r);
      }
      var about = aboutLine(house, x.itemIds);
      if (about) sec.appendChild(about);
      return sec;
    }));

    out.appendChild(section(STRINGS.scenarios, items(house, 'scenarios'), function (s) {
      var sec = h('section', { 'class': 'oot-h-item', 'data-item': s.id });
      sec.appendChild(h('h4', null, s.title || ''));
      if (s.guest) sec.appendChild(line(STRINGS.guest, s.guest));
      var fields = ['you', 'principle'];
      for (var i = 0; i < fields.length; i++) {
        var r = markRow(st, 'scenarios', s.id, fields[i], labelOf(fields[i]), s);
        if (r) sec.appendChild(r);
      }
      var about = aboutLine(house, s.itemIds);
      if (about) sec.appendChild(about);
      return sec;
    }));

    out.appendChild(section(STRINGS.mixUps, items(house, 'mixUps'), function (m) {
      var sec = h('section', { 'class': 'oot-h-item', 'data-item': m.id });
      sec.appendChild(h('h4', null, nameOfItem(house, 'mixUps', m)));
      var fields = ['difference', 'ask'];
      for (var i = 0; i < fields.length; i++) {
        var r = markRow(st, 'mixUps', m.id, fields[i], labelOf(fields[i]), m);
        if (r) sec.appendChild(r);
      }
      return sec;
    }));

    out.appendChild(section(STRINGS.lineup, items(house, 'askAtLineup'), function (a) {
      var sec = h('section', { 'class': 'oot-h-item', 'data-item': a.id });
      sec.appendChild(h('p', null, a.question || ''));
      var whom = has(STRINGS.whom, a.askWhom) ? STRINGS.whom[a.askWhom] : String(a.askWhom || '');
      if (whom) sec.appendChild(note(STRINGS.askThe + ' ' + whom + '.'));
      var about = aboutLine(house, a.itemIds);
      if (about) sec.appendChild(about);
      if (a.answer) {
        sec.appendChild(eyebrow(STRINGS.answered + (a.answeredOn ? ' ' + STRINGS.on + ' ' + a.answeredOn : '')));
        sec.appendChild(h('p', null, a.answer));
      } else {
        sec.appendChild(eyebrow(STRINGS.confirm));
      }
      return sec;
    }));
  }

  /* ---------------------------------------------------------------------
   * Hers, to look over
   * ------------------------------------------------------------------ */

  /* Every item on the step's lists carrying a mark of hers, with the fields
     that carry one, in the order the lists and the fields are named. */
  function waitingOn(st, step) {
    var lists = STEP_MARKS[step];
    var out = [];
    if (!lists) return out;
    for (var l = 0; l < LIST_ORDER.length; l++) {
      var list = LIST_ORDER[l];
      if (!has(lists, list)) continue;
      var fields = lists[list];
      var kind = KIND_OF[list];
      var rows = items(st.house, list);
      for (var i = 0; i < rows.length; i++) {
        var it = rows[i];
        if (!it || !it.id) continue;
        var hers = [];
        for (var f = 0; f < fields.length; f++) {
          var m = markAt(st, kind, it.id, fields[f], it);
          if (isMark(m) && m.by === 'maitre') hers.push(fields[f]);
        }
        if (hers.length) out.push({ list: list, kind: kind, item: it, fields: hers });
      }
    }
    return out;
  }

  function drawReview(st, out) {
    out.appendChild(h('h2', null, STRINGS.review));
    if (!has(STEP_MARKS, st.step)) { out.appendChild(note(STRINGS.noStep)); return; }
    out.appendChild(h('h3', null, STRINGS.steps[st.step]));
    var waiting = waitingOn(st, st.step);
    if (!waiting.length) { out.appendChild(note(STRINGS.nothingToReview)); return; }
    var total = 0;
    for (var c = 0; c < waiting.length; c++) total += waiting[c].fields.length;
    out.appendChild(note(total + ' ' + (total === 1 ? STRINGS.waitOne : STRINGS.waitMany)));
    out.appendChild(note(STRINGS.reviewHint));
    out.appendChild(h('div', { 'class': 'oot-h-row' }, chip('keep-clean', {}, STRINGS.keepClean)));
    for (var i = 0; i < waiting.length; i++) {
      var e = waiting[i];
      var sec = h('section', { 'class': 'oot-h-item', 'data-item': e.item.id });
      sec.appendChild(h('h4', null, [eyebrow(STRINGS.kinds[e.list]), nameOfItem(st.house, e.list, e.item)]));
      if (e.item.section) sec.appendChild(note(e.item.section));
      for (var f = 0; f < e.fields.length; f++) {
        var r = markRow(st, e.kind, e.item.id, e.fields[f], labelOf(e.fields[f]), e.item);
        if (r) sec.appendChild(r);
      }
      sec.appendChild(h('div', { 'class': 'oot-h-row' }, chip('keep-item', { 'data-kind': e.kind, 'data-id': e.item.id }, STRINGS.keepItem)));
      out.appendChild(sec);
    }
  }

  function keepAllOnItem(st, kind, id) {
    var lists = STEP_MARKS[st.step];
    var list = LIST_OF[kind];
    if (!lists || !list || !has(lists, list)) return;
    var it = findIn(st.house, list, id);
    if (!it) return;
    var fields = lists[list];
    for (var f = 0; f < fields.length; f++) keepMark(st, kind, id, fields[f], it);
  }

  function keepAllClean(st) {
    var waiting = waitingOn(st, st.step);
    for (var i = 0; i < waiting.length; i++) {
      var e = waiting[i];
      for (var f = 0; f < e.fields.length; f++) {
        var m = markAt(st, e.kind, e.item.id, e.fields[f], e.item);
        if (!isMark(m)) continue;
        if (problemsFor(st, e.kind, e.item.id, e.fields[f], m.value).length) continue;
        keepMark(st, e.kind, e.item.id, e.fields[f], e.item);
      }
    }
  }

  /* ---------------------------------------------------------------------
   * The root, its state and the one click listener
   * ------------------------------------------------------------------ */

  function stateOf(root) {
    var st = root.__ootHouseUI;
    if (!st) {
      st = { house: null, hooks: {}, mode: 'read', step: '', editing: null, overlay: {} };
      root.__ootHouseUI = st;
      root.addEventListener('click', function (ev) { onClick(root, ev); });
    }
    return st;
  }

  function within(root, el) {
    for (var n = el; n; n = n.parentNode) if (n === root) return true;
    return false;
  }

  function onClick(root, ev) {
    var t = ev && ev.target;
    var btn = t && typeof t.closest === 'function' ? t.closest('[data-h]') : null;
    if (!btn || !within(root, btn)) return;
    var st = stateOf(root);
    if (!st.house) return;
    var act = btn.getAttribute('data-h');
    var kind = btn.getAttribute('data-kind') || '';
    var id = btn.getAttribute('data-id') || '';
    var fieldName = btn.getAttribute('data-field') || '';
    if (ev.preventDefault) ev.preventDefault();
    if (act === 'keep') {
      keepMark(st, kind, id, fieldName, itemOf(st, kind, id));
      st.editing = null;
    } else if (act === 'edit') {
      st.editing = { kind: kind, id: id, field: fieldName };
    } else if (act === 'cancel') {
      st.editing = null;
    } else if (act === 'discard') {
      discardMark(st, kind, id, fieldName);
      st.editing = null;
    } else if (act === 'save') {
      var ed = root.querySelector('[data-editor="' + fieldName + '"]');
      var value = ed ? readEditor(ed, fieldName) : undefined;
      st.editing = null;
      if (value !== undefined) {
        var prev = markAt(st, kind, id, fieldName, itemOf(st, kind, id));
        /* The pairing's bottle tiers have no box here: they ride over from the mark being replaced, so
           an edit to the why or the second pick never drops the bottles offered with the dish. */
        if (fieldName === 'pairing' && isMark(prev) && prev.value && typeof prev.value === 'object' && prev.value.bottles && typeof prev.value.bottles === 'object') {
          value.bottles = prev.value.bottles;
        }
        var mark = { value: value, by: 'person', ts: now() };
        if (isMark(prev) && typeof prev.model === 'string' && prev.model) mark.model = prev.model;
        write(st, kind, id, fieldName, mark);
      }
    } else if (act === 'keep-item') {
      keepAllOnItem(st, kind, id);
      st.editing = null;
    } else if (act === 'keep-clean') {
      keepAllClean(st);
      st.editing = null;
    } else {
      return;
    }
    draw(root);
  }

  function draw(root) {
    var st = stateOf(root);
    ensureStyle();
    clear(root);
    root.setAttribute('data-oot-house-ui', st.mode);
    var out = h('div', { 'class': 'oot-h' });
    if (!st.house || typeof st.house !== 'object') {
      out.appendChild(note(STRINGS.noHouse));
    } else if (st.mode === 'review') {
      drawReview(st, out);
    } else {
      drawRead(st, out);
    }
    root.appendChild(out);
    if (st.editing) {
      var ed = root.querySelector('[data-editor]');
      var first = ed ? ed.querySelector('[data-e]') : null;
      if (first && typeof first.focus === 'function') first.focus();
    }
  }

  function begin(root, house, hooks, mode, step) {
    var st = stateOf(root);
    st.house = house && typeof house === 'object' ? house : null;
    st.hooks = hooks && typeof hooks === 'object' ? hooks : {};
    st.mode = mode;
    st.step = step || '';
    st.editing = null;
    st.overlay = {};
    draw(root);
  }

  function readView(root, house, hooks) { begin(root, house, hooks, 'read', ''); }
  function review(root, house, step, hooks) { begin(root, house, hooks, 'review', String(step || '')); }

  OOT.houseUI = { readView: readView, review: review };
})(typeof window !== 'undefined' ? window : this);
