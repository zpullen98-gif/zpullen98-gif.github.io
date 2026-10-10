/* ---------------- THE STUDY VIEW: the house's drinks, learned before service ----------------

   docs/study-menus-design.md in the World Table is the specification; this
   is the Ledger's part of it (sections 1.2 to 1.7, 2.3, 4.2 and 4.4).

   WHAT IT IS. When a house is current and holds cocktails, the Menu tab's
   first sub-view opens on a study view instead of the editing list: a short
   header, a sticky search box and a row of section chips, one compact row per
   drink, and a card per drink that reads top to bottom the way a server
   needs it at the table. Editing is one "Edit the menu" switch away (and one
   "Edit" on each card), and shows today's list unchanged. The switch is not
   stored: every load opens on the study view.

   LOADS WITH NO ENGINE AND DOES NOTHING THEN. Every read of the house goes
   through houseHere() (js/house-bar.js), read at call time, so the standalone
   Ledger, check-import.mjs and load-wing.mjs load this file with no OOT and
   every door here returns nothing.

   KEPT MARKS ONLY. A mark is the house's word only when by === 'person'.
   An unkept mark of hers is never drawn here; the card says in one line that
   there is something to look over behind Edit.

   NO ALLERGEN IS READ, INFERRED OR SHOWN. The service note is a person's own
   words, printed verbatim under the fixed eyebrow, and nothing here ticks a
   box or says what a guest may eat.

   THE RULES ARE THE TABLE'S. The pure part (the rows, the short line, the
   prices, the search, the notes, the parts, the cards, the progress) is the
   design's house-study module, carried here as the same functions until the
   engine ships it as OOT.houseLib.study; hsLib() prefers the engine's copy
   function by function when it is there.

   WRITES NOTHING TO progress.bar. A flash card is graded through
   gradeCardKey under 'My Bar · name', the deck's own record, so a card
   turned here and the same card on the Flashcards tab are one record.

   THE VIDEOS ARE LINKS OUT. The Watch block on a card and the Videos entry
   at the foot of the list draw the house's videos (house.videos) as plain
   links that open YouTube or Vimeo in a new tab with rel noopener. Nothing
   here embeds a player or plays on its own, unlike the Coffee & Tea films,
   and the words say a video needs a connection. A link the engine's rule
   would refuse is not drawn at all (hsVideoUrlOk, the same rule held here
   so a stale engine cannot let one through).

   NOBODY IS NAMED HERE, NO STRING CARRIES A DASH, AND THE WORDS ARE BRITISH. */

/* ---- the words (the design's section 9, the Ledger's share) -------------- */
var HS_WORDS = {
  back: 'Back to the menu',
  position: '{i} of {n} in {section}',
  found: '{i} of {n} found',
  find: 'Find a drink',
  all: 'All {n}',
  showing: 'Showing {section}: {n} {unit}',
  searchHits: '{n} found for {query}',
  searchNone: 'Nothing matches {query}.',
  clear: 'Clear the search',
  read: 'Menus read {date}',
  progress: '{studied} of {total} studied · {got} got it last time · {again} again',
  progressNone: 'Nothing studied yet: start with Flash cards.',
  cards: 'Flash cards',
  weak: 'My weak ones ({n})',
  weakNone: 'My weak ones: none yet',
  quizTab: 'Drill the menu (Quizzes)',
  editOff: 'Edit the menu',
  editOn: 'Edit the menu: on',
  edit: 'Edit',
  ten: 'In ten seconds',
  twenty: 'Twenty seconds',
  twentyHide: 'Hide twenty seconds',
  fortyFive: 'Forty-five seconds',
  fortyFiveHide: 'Hide forty-five seconds',
  say: 'Say it',
  asPrinted: 'Prices as printed on {date}. Confirm before quoting.',
  offerLine: 'Offer next: ',
  allDay: 'All day',
  elsewhere: 'Elsewhere in the house',
  inRoom: '{name}, in the {room}',
  alsoHouse: 'Also in the house: ',
  nextOnly: 'Next',
  offShift: 'Not on the {meal} list. Counting the whole menu.',
  offList: 'Not in the rows on screen. Counting the whole menu.',
  drillSection: 'Drill this section (Quizzes)',
  drillWhole: 'Drill the whole menu (Quizzes)',
  tooSmall: '{section} is too small to drill alone.',
  canonLine: 'The classic {name} is in the Library. Its build is the classic’s, not ours.',
  canonFamily: 'It comes from the {name}. The classic is in the Library; its build is the classic’s, not ours.',
  story: 'Read the whole story',
  libStory: 'The Library\u2019s story, not the house\u2019s',
  notPrinted: 'not printed; confirm with the bar',
  about: 'About it',
  parts: 'The five parts',
  build: 'The build',
  offerNext: 'Offer next',
  pouredWith: 'Poured with',
  pouredOn: 'Poured on',
  floor: 'On the floor',
  confirm: 'To confirm at lineup',
  disagree: 'Two sources disagree',
  mixUp: 'Not to be confused with',
  more: 'More notes',
  earlier: 'Earlier answers',
  eyebrow: 'Your words. Allergens: confirm at lineup.',
  noteNone: 'No service note yet. Ask at lineup.',
  here: 'In this app',
  rooms: 'In the other rooms',
  offlineRoom: '(open the {room} once online and it stays with you offline)',
  cardsThis: 'Flash cards for this',
  sayBack: 'Say it back',
  hers: 'The Ma\u00eetre d\u2019 has written lines here that nobody has kept yet. Edit to look them over.',
  prev: 'Previous: {name}',
  next: 'Next: {name}',
  got: 'Got it',
  again: 'Again',
  count: 'Got it {g} · Again {a}',
  done: 'Deck complete',
  againDeck: 'Again: the {n} you marked',
  shuffle: 'Shuffle again',
  close: 'Close the deck',
  front: 'Say the ten second line aloud, then flip.',
  flip: 'Flip',
  yourOwn: 'Your own',
  houseLists: 'The house: must-knows, words and the table',
  watch: 'Watch',
  videos: 'Videos',
  videosCount: 'Videos ({n})',
  videoNote: 'Each video opens on YouTube or Vimeo in a new tab, and needs a connection.',
  newTab: '(opens in a new tab)',
  videoFor: 'For: ',
  videoNone: 'More to watch',
  videoPlain: 'A video on {topic}',
  videoPlainOf: 'A video on {topic}, {i} of {n}',
  madeOf: 'What it\u2019s made of',
  flashThese: 'Flash these components',
  compareWith: 'Compare with',
  same: 'The same',
  different: 'What differs',
  classic: 'A classic, for comparison',
  cardFront: 'On the card',
  cardBack: 'The answer',
  inTheRoom: 'in the {room}',
  inLibrary: 'in the Library',
  whoMakes: 'Who makes it',
  flashProducers: 'Flash these producers',
  allProducers: 'All producers',
  producerSupplies: 'Supplies',
  producerWhere: 'Where',
  producerFounded: 'Founded',
  producerFacts: 'Facts',
  producerHistory: 'The story',
  producerNotes: 'Notes for the floor',
  askBar: 'Ask the bar',
  inLedgerLib: 'In the Ledger’s library',
  onTheMenu: 'On the menu',
  houseBar: '{house} bar',
  producersLine: '{n} behind {m} on the menu.',
  qProducerOf: 'Which producer is behind the {name} on your menu?',
  qProducerWhere: 'Where is {name} from?',
  qProducerDrink: 'Which drink on your menu uses {name}?'
};
function hsSay(key, vars){
  const v = vars || {};
  return String(HS_WORDS[key] || key).replace(/\{(\w+)\}/g, function(m, k){ return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m; });
}

/* The fixed questions, character for character */
var HS_ABOUT_Q = 'Tell me about it.';
var HS_COACH_ORDER = ['How do I sell it?', 'What do guests ask?', 'What should I watch for?', 'How do I pour it?'];
var HS_FIXED_QS = [HS_ABOUT_Q].concat(HS_COACH_ORDER);
/* The id shape every room accepts, and nothing looser */
var HS_ID_RE = /^[dbw]-[a-z0-9]{8}$/;
/* the shift filter's choice, one origin, so the three wings agree */
var HS_MEAL_KEY = 'oot-study-meal-v1';
var HS_ROOM_NAMES = { table: 'World Table', codex: 'Codex', ledger: 'Ledger' };
var HS_ROOM_ENTRIES = { table: ['/table/shell.html'], codex: ['/codex/index.html', '/codex/'], ledger: ['/ledger/index.html', '/ledger/'] };

/* ---- the screen's state --------------------------------------------------- */
function hsBlank(){
  return { q: '', sec: '', open: null, editAll: false, deck: null, y: 0, jump: null, pushed: false, l20: false, l45: false, lastId: null, from: null, scrollCard: false };
}
if(typeof state !== 'undefined' && state && state.menu && !state.menu.study) state.menu.study = hsBlank();
function hsState(){
  if(!state.menu.study) state.menu.study = hsBlank();
  return state.menu.study;
}
/* The card's open disclosures, kept in the screen's state against the card
   that holds them: a producer's profile ('p:' and its component id), a
   component ('c:' and its id) and the Library's story ('story'). A plain
   <details> forgets on every paint, and the paint after Back (from the
   library's entry, a deck of cards or the Producers tab) closed the profile
   the reader had open while the router put the old scroll back over a page
   thousands of pixels shorter, so the reader landed far down the card. The
   toggle is read as it happens (houseStudyAfterRender), the paint draws the
   kept ones open, and a card opened afresh (st.jump 'card') starts with none
   open. */
function hsOpenKept(cardId, key){
  const k = hsState().kept;
  return !!(k && k.card === cardId && k.open && k.open[key]);
}
function hsKeepOpen(cardId, key, open){
  const st = hsState();
  if(!cardId || !key) return;
  if(!st.kept || st.kept.card !== cardId) st.kept = { card: cardId, open: {} };
  if(open) st.kept.open[key] = true; else delete st.kept.open[key];
}
function hsOpenAttr(cardId, key){ return hsOpenKept(cardId, key) ? ' open' : ''; }
/* the key a card's disclosure is kept under, from its own data-keep or the row it sits in; '' for any other */
function hsKeepKeyOf(d){
  if(!d || typeof d.getAttribute !== 'function') return '';
  const own = d.getAttribute('data-keep');
  if(own) return own;
  const li = d.parentNode;
  if(!li || typeof li.getAttribute !== 'function') return '';
  if(li.getAttribute('data-producer')) return 'p:' + li.getAttribute('data-producer');
  if(li.getAttribute('data-component')) return 'c:' + li.getAttribute('data-component');
  return '';
}

/* ---- the engine's study module, when it ships ---------------------------- */
function hsLib(name, local){
  const lib = typeof houseLibHere === 'function' ? houseLibHere() : null;
  const s = lib && lib.study;
  return s && typeof s[name] === 'function' ? s[name] : local;
}

/* ---- small readers -------------------------------------------------------- */
function hsKept(m){
  return m && typeof m === 'object' && m.by === 'person' && m.value !== undefined && m.value !== null ? m.value : undefined;
}
function hsPlain(v){ return typeof v === 'string' ? v.trim() : ''; }
function hsKeptText(m){ const v = hsKept(m); return typeof v === 'string' ? v.trim() : ''; }
function hsIsMark(m){ return !!(m && typeof m === 'object' && !Array.isArray(m) && 'value' in m && (m.by === 'person' || m.by === 'maitre')); }
function hsCurrent(){
  const api = typeof houseHere === 'function' ? houseHere() : null;
  try { return api ? api.current() : null; } catch (e) { return null; }
}
function hsAllItems(h){ return [].concat(h.dishes || [], h.wines || [], h.cocktails || []); }
function hsFind(h, id){ return id ? hsAllItems(h).find(function(it){ return it && it.id === id; }) || null : null; }
function hsKindOf(id){ return /^d-/.test(id) ? 'dish' : /^w-/.test(id) ? 'wine' : 'cocktail'; }
function hsAnyMark(item, by){
  return Object.keys(item || {}).some(function(k){ const v = item[k]; return hsIsMark(v) && v.by === by; });
}

/* ---- folding and whole-word matching ------------------------------------- */
var HS_TRANSLIT = { 'ø':'o', 'Ø':'o', 'æ':'ae', 'Æ':'ae', 'œ':'oe', 'Œ':'oe', 'ß':'ss', 'ł':'l', 'Ł':'l',
  'đ':'d', 'Đ':'d', 'ð':'d', 'Ð':'d', 'þ':'th', 'Þ':'th', 'ı':'i' };
function hsFoldLocal(s){
  const t = String(s == null ? '' : s)
    .replace(/[øØæÆœŒßłŁđĐðÐþÞı]/g, function(c){ return HS_TRANSLIT[c] || c; })
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[‘’‚‛]/g, "'").replace(/[“”„‟]/g, '"')
    .toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
  return t ? ' ' + t + ' ' : ' ';
}
function hsFold(s){ return hsLib('fold', hsFoldLocal)(s); }
/* where a name first sits in a folded hay as a whole word, its plural too,
   or -1; a name under four characters never matches */
function hsNameIn(hay, name){
  const n = hsFold(name).trim();
  if(n.length < 4) return -1;
  let best = -1;
  [n, n + 's', n + 'es'].forEach(function(form){
    const i = hay.indexOf(' ' + form + ' ');
    if(i >= 0 && (best < 0 || i < best)) best = i;
  });
  return best;
}

/* ---- prices ---------------------------------------------------------------- */
function hsTastingsFor(h, id){
  const out = [];
  (h.tastings || []).forEach(function(t){
    (t.courses || []).forEach(function(c){
      if((c.dishIds || []).indexOf(id) >= 0) out.push({ tasting: t, course: c, as: 'dish' });
      if(c.pourId === id) out.push({ tasting: t, course: c, as: 'pour' });
    });
  });
  return out;
}
/* The one rule for a printed price: each printed string as the house holds
   it; once when every meal prints the same; else "meal printed" joined by a
   middle dot; a wine's "By the glass" label never printed; nothing when
   nothing is printed. */
function hsPriceLineLocal(item, h){
  const prices = (item.prices || []).filter(function(p){ return p && hsPlain(p.printed); });
  if(prices.length){
    const strings = prices.map(function(p){ return hsPlain(p.printed); });
    if(strings.every(function(s){ return s === strings[0]; })) return strings[0];
    return prices.map(function(p){
      const meal = hsPlain(p.meal);
      const label = item.kind === 'wine' && hsFold(meal) === ' by the glass ' ? '' : meal;
      return label ? label + ' ' + hsPlain(p.printed) : hsPlain(p.printed);
    }).join(' · ');
  }
  if(hsPlain(item.price)) return hsPlain(item.price);
  if(item.kind === 'wine' && h){
    const on = hsTastingsFor(h, item.id).filter(function(t){ return t.as === 'pour'; });
    if(on.length){
      const names = [];
      on.forEach(function(t){ const n = hsPlain(t.tasting.name); if(n && names.indexOf(n) < 0) names.push(n); });
      const pour = (item.pours || []).map(hsPlain).find(Boolean) || '';
      return 'Poured on the ' + names.join(' and the ') + (pour ? ', ' + pour : '');
    }
  }
  return '';
}
function hsPriceLine(item, h){ return hsLib('priceLine', hsPriceLineLocal)(item, h); }

/* ---- the short line ------------------------------------------------------- */
function hsRaise(s){ const t = s.trim(); return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
function hsFirstSentence(s){ const t = s.trim(); const m = /^(.+?[.!?])(\s|$)/.exec(t); return m ? m[1] : t; }
function hsShortLineLocal(item){
  const lines = hsKept(item.lines);
  const s10 = hsPlain(lines && lines.s10);
  if(s10){
    const cut = s10.search(/[:,]/);
    if(cut > 0){
      const head = hsFold(s10.slice(0, cut));
      const rest = s10.slice(cut + 1).trim();
      const name = hsFold(item.name);
      if((head === name || head === ' the' + name) && rest) return hsRaise(rest);
    }
    return s10;
  }
  const guest = hsKeptText(item.guest);
  if(guest) return hsFirstSentence(guest);
  if(item.kind === 'dish') return hsPlain(item.description);
  if(item.kind === 'wine') return hsPlain(item.style);
  return (item.spec || []).map(hsPlain).filter(Boolean).join(', ');
}
function hsShortLine(item){ return hsLib('shortLine', hsShortLineLocal)(item); }

/* ---- the shift filter ----------------------------------------------------- */
function hsMeals(h){
  const out = [];
  (h && h.meals || []).forEach(function(m){ const n = hsPlain(m && m.name); if(n && out.indexOf(n) < 0) out.push(n); });
  return out;
}
/* an item shows under a meal when it names that meal, or when it names none
   of the house's meals: untagged, or tagged only with a room or a tasting
   ("Roost Bar & Lounge", "Breakfast tasting") that no chip offers, so no
   choice of shift can hide a drink nobody tagged for it */
function hsInMeal(item, meal, known){
  if(!meal) return true;
  const meals = (item.meals || []).map(hsPlain).filter(Boolean);
  if(meals.indexOf(meal) >= 0) return true;
  const names = known || [meal];
  return !meals.some(function(m){ return names.indexOf(m) >= 0; });
}
function hsMealGet(h){
  let v = '';
  try { v = (typeof localStorage !== 'undefined' && localStorage) ? (localStorage.getItem(HS_MEAL_KEY) || '') : ''; } catch (e) { v = ''; }
  return h && hsMeals(h).indexOf(v) >= 0 ? v : '';
}
function hsMealSet(v){
  try { if(typeof localStorage !== 'undefined' && localStorage){ if(v) localStorage.setItem(HS_MEAL_KEY, v); else localStorage.removeItem(HS_MEAL_KEY); } } catch (e) {}
}

/* ---- the rows ---------------------------------------------------------------
   The house's drinks in the house's own order, each joined to its record on
   the list by id; then the list's drinks that are on no house, under "Your
   own", with what they have. */
function hsRows(h, mealOverride){
  const out = [];
  if(!h) return out;
  const meal = mealOverride === undefined ? hsMealGet(h) : mealOverride;
  const known = hsMeals(h);
  const ids = {};
  (h.cocktails || []).forEach(function(c){
    const name = hsPlain(c && c.name);
    if(!name) return;
    ids[c.id] = true;
    if(!hsInMeal(c, meal, known)) return;
    out.push({ id: c.id, name: name, section: hsPlain(c.section) || 'The menu', price: hsPriceLine(c, h), line: hsShortLine(c), own: false });
  });
  (typeof progress !== 'undefined' && progress && progress.bar || []).forEach(function(b){
    if(!b || ids[b.id] || !hsPlain(b.name)) return;
    out.push({ id: b.id, name: hsPlain(b.name), section: hsWords('yourOwn'), price: hsPlain(b.price),
      line: hsPlain(b.note) || (b.spec || []).map(hsPlain).filter(Boolean).join(', '), own: true });
  });
  return out;
}
function hsWords(k){ return HS_WORDS[k]; }
function hsSections(rows){
  const order = [], counts = {};
  rows.forEach(function(r){ if(!counts[r.section]){ counts[r.section] = 0; order.push(r.section); } counts[r.section]++; });
  return order.map(function(s){ return { section: s, count: counts[s] }; });
}

/* ---- search ---------------------------------------------------------------- */
function hsSearchHay(item){
  const lines = hsKept(item.lines);
  const bits = [item.name, item.section, hsPlain(lines && lines.s10)];
  if(item.kind === 'dish') bits.push(item.description, ...(item.ingredients || []));
  else if(item.kind === 'wine') bits.push(item.producer, item.wine, item.vintage, item.region, ...(item.grapes || []), item.style);
  else bits.push(...(item.spec || []), item.family, item.spirit);
  return hsFold(bits.map(hsPlain).join(' '));
}
function hsMatches(item, q){
  const tokens = hsFold(q).trim().split(' ').filter(Boolean);
  if(!tokens.length) return true;
  const hay = hsSearchHay(item);
  return tokens.every(function(t){ return hay.indexOf(t) >= 0; });
}
/* the rows a search keeps, in order; a row of no house matches on its own fields */
function hsSearchRows(h, rows, q){
  if(!hsFold(q).trim()) return rows.slice();
  return rows.filter(function(r){
    const it = hsFind(h, r.id);
    if(it) return hsMatches(it, q);
    const b = (progress.bar || []).find(function(x){ return x.id === r.id; });
    return b ? hsMatches(Object.assign({ kind: 'cocktail' }, b), q) : false;
  });
}
/* the same match over the house's dishes and wines: at most five */
function hsElsewhere(h, q){
  if(!h || !hsFold(q).trim()) return [];
  const out = [];
  [['dish', h.dishes || []], ['wine', h.wines || []]].forEach(function(pair){
    pair[1].forEach(function(it){
      if(out.length < 5 && it && hsPlain(it.name) && hsMatches(it, q)) out.push({ kind: pair[0], id: it.id, name: hsPlain(it.name) });
    });
  });
  return out;
}

/* ---- notes, lines, parts ---------------------------------------------------- */
function hsNotesFor(item){
  const notes = (item.kept || []).filter(function(n){ return n && typeof n.q === 'string' && typeof n.a === 'string' && n.a.trim(); });
  const newestFirst = notes.slice().sort(function(a, b){ return (b.ts || 0) - (a.ts || 0); });
  const newest = {}, earlier = [], more = [];
  newestFirst.forEach(function(n){
    const q = n.q.trim();
    if(HS_FIXED_QS.indexOf(q) >= 0){ if(newest[q]) earlier.push(n); else newest[q] = n; }
    else more.push(n);
  });
  const coaching = HS_COACH_ORDER.filter(function(q){ return newest[q]; }).map(function(q){ return { q: q, note: newest[q] }; });
  return { about: newest[HS_ABOUT_Q] || null, coaching: coaching, more: more, earlier: earlier };
}
function hsLinesShown(item){
  const l = hsKept(item.lines) || {};
  const s20 = hsPlain(l.s20), guest = hsKeptText(item.guest);
  return { s10: hsPlain(l.s10), s20: s20, s45: hsPlain(l.s45), guest: guest, guestShown: !!guest && guest !== s20 };
}
function hsPartsShown(item){
  const parts = hsKept(item.parts);
  if(!parts || typeof parts !== 'object') return [];
  const labels = typeof housePartLabels === 'function' ? housePartLabels() : {};
  return ['main', 'technique', 'sauce', 'sides', 'taste'].filter(function(k){ return hsPlain(parts[k]); })
    .map(function(k){ return [labels[k] || k, hsPlain(parts[k])]; });
}
function hsLineupFor(h, id){
  return {
    asks: (h.askAtLineup || []).filter(function(a){ return (a.itemIds || []).indexOf(id) >= 0; }),
    disputes: (h.disputes || []).filter(function(d){ return d.itemId === id; }),
    mixUps: (h.mixUps || []).filter(function(m){ return m.aId === id || m.bId === id; }),
    terms: (h.lexicon || []).filter(function(t){ return (t.itemIds || []).indexOf(id) >= 0; }),
    scenarios: (h.scenarios || []).filter(function(s){ return (s.itemIds || []).indexOf(id) >= 0; }),
    tastings: hsTastingsFor(h, id)
  };
}
/* the kept upsells, as house drinks other than this one */
function hsUpsells(h, item){
  const ids = hsKept(item.upsells);
  if(!Array.isArray(ids)) return [];
  const out = [];
  ids.forEach(function(id){
    const c = (h.cocktails || []).find(function(x){ return x && x.id === id; });
    if(c && c.id !== item.id && hsPlain(c.name) && !out.some(function(o){ return o.id === c.id; })) out.push(c);
  });
  return out;
}
/* the house dishes whose kept pairing names this drink as the one without alcohol */
function hsPouredWith(h, item){
  return (h.dishes || []).filter(function(d){
    const p = hsKept(d && d.pairing);
    return p && p.zeroProofId === item.id && hsPlain(d.name);
  });
}

/* ---- the flash cards --------------------------------------------------------- */
function hsCardBack(h, item){
  const up = hsUpsells(h, item);
  return { s10: hsLinesShown(item).s10, price: hsPriceLine(item, h), parts: hsPartsShown(item),
    pairs: up.length ? [['Offer next', up.map(function(c){ return hsPlain(c.name); }).join(', ')]] : [], say: hsKeptText(item.say) };
}
/* one card per drink in scope with a kept ten second line or kept parts */
function hsItemCards(h, scope){
  const out = [];
  if(!h) return out;
  (h.cocktails || []).forEach(function(it){
    const name = hsPlain(it && it.name);
    if(!name) return;
    if(scope && scope.section && (hsPlain(it.section) || 'The menu') !== scope.section) return;
    if(scope && scope.itemIds && scope.itemIds.indexOf(it.id) < 0) return;
    const back = hsCardBack(h, it);
    if(!back.s10 && !back.parts.length) return;
    out.push({ itemId: it.id, kind: 'cocktail', name: name, section: hsPlain(it.section) || 'The menu', back: back });
  });
  return out;
}

/* ---- progress, from the deck's own records -----------------------------------
   Again when the card meets the trouble rule; else got when it was ever
   answered; a Say it back entry for the drink counts as studied. */
function hsCardOf(id){
  const b = (progress.bar || []).find(function(x){ return x.id === id; });
  return b ? { src: 'My Bar', name: b.name, ref: b } : null;
}
function hsKeyOf(id){
  const c = hsCardOf(id);
  return c && typeof cardKey === 'function' ? cardKey(c) : '';
}
function hsVerdict(id){
  const key = hsKeyOf(id);
  const s = key && progress.cards ? progress.cards[key] : null;
  if(s && s.w > 0 && (s.w >= s.r * 0.5 || (s.lapses || 0) >= 2)) return 'again';
  if(s && (s.r || 0) + (s.w || 0) > 0) return 'got';
  const said = progress.house && Array.isArray(progress.house.say) ? progress.house.say : [];
  if(said.some(function(e){ return e && e.id === id; })) return 'got';
  return '';
}
function hsProgress(ids){
  let got = 0, again = 0; const againIds = [];
  ids.forEach(function(id){ const v = hsVerdict(id); if(v === 'got') got++; else if(v === 'again'){ again++; againIds.push(id); } });
  return { total: ids.length, studied: got + again, got: got, again: again, againIds: againIds };
}

/* ---- dates ------------------------------------------------------------------ */
function hsDate(iso){
  if(!iso) return '';
  try {
    const d = new Date(iso + (String(iso).length === 10 ? 'T00:00:00Z' : ''));
    if(isNaN(d.getTime())) return String(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  } catch (e) { return String(iso); }
}

/* ---- the links across the rooms (1.7) -----------------------------------------
   Drawn only on the suite's shared origin, only for an item in the current
   house, and only while the network is up or the room is installed here.
   Installed means the cache answers for the room's own entry point, asked
   once per page; until it answers, the name is plain words. */
var HS_INSTALLED = {};
function hsShared(){
  try { return typeof location !== 'undefined' && !!location && typeof location.pathname === 'string' && location.pathname.indexOf('/ledger') === 0; } catch (e) { return false; }
}
function hsRoomHref(room, id, h){
  if(!h || !hsShared() || !HS_ID_RE.test(id || '')) return '';
  if(room === 'codex') return (h.wines || []).some(function(w){ return w.id === id; }) ? '/codex/#wine=' + id : '';
  if(room === 'table') return (h.dishes || []).some(function(d){ return d.id === id; }) ? '/table/menu#' + id : '';
  return '';
}
function hsRoomListHref(room){
  if(!hsShared()) return '';
  return room === 'codex' ? '/codex/#list' : room === 'table' ? '/table/menu' : '';
}
function hsOnline(){
  return !(typeof navigator !== 'undefined' && navigator && navigator.onLine === false);
}
function hsAskInstalled(room){
  if(Object.prototype.hasOwnProperty.call(HS_INSTALLED, room)) return;
  HS_INSTALLED[room] = null;
  try {
    if(typeof caches === 'undefined' || !caches || typeof caches.match !== 'function'){ HS_INSTALLED[room] = false; return; }
    const urls = HS_ROOM_ENTRIES[room] || [];
    let p = Promise.resolve(false);
    urls.forEach(function(u){ p = p.then(function(hit){ return hit || caches.match(u, { ignoreSearch: true }).then(function(r){ return !!r; }); }); });
    p.then(function(hit){ HS_INSTALLED[room] = !!hit; if(hsState().open && state.tab === 'menu' && typeof houseRepaint === 'function') houseRepaint(); },
      function(){ HS_INSTALLED[room] = false; });
  } catch (e) { HS_INSTALLED[room] = false; }
}
/* a link when every condition holds, else the name in words */
function hsRoomLink(room, href, name){
  const words = esc(name);
  if(!href) return words;
  if(hsOnline()) return '<a class="hs-link" href="' + esc(href) + '">' + words + '</a>';
  hsAskInstalled(room);
  const known = HS_INSTALLED[room];
  if(known === true) return '<a class="hs-link" href="' + esc(href) + '">' + words + '</a>';
  if(known === false) return words + ' <span class="hs-soft">' + esc(hsSay('offlineRoom', { room: HS_ROOM_NAMES[room] })) + '</span>';
  return words;
}

/* ---- when the study view shows --------------------------------------------------- */
function hsHouseHasDrinks(){
  const h = hsCurrent();
  return !!(h && (h.cocktails || []).some(function(c){ return c && hsPlain(c.name); }));
}
function houseStudyOn(){
  if(typeof houseHere !== 'function' || !houseHere()) return false;
  if(typeof state === 'undefined' || !state || !state.menu) return false;
  if(hsState().editAll) return false;
  if((state.menu.view || 'menu') !== 'menu') return false;
  return hsHouseHasDrinks();
}
/* the house section of a record on the list, for the deck's and the round's filters */
function houseStudySectionOf(id){
  const h = hsCurrent();
  const it = h && (h.cocktails || []).find(function(c){ return c && c.id === id; });
  return it ? (hsPlain(it.section) || 'The menu') : '';
}

/* ---- the rows a reader sees under the current filter ----------------------------- */
function hsVisible(h){
  const st = hsState();
  const rows = hsSearchRows(h, hsRows(h), st.q || '');
  return st.sec ? rows.filter(function(r){ return r.section === st.sec; }) : rows;
}
function hsUnit(n){ return n === 1 ? 'drink' : 'drinks'; }

/* ---- the videos: a link out, never a player -------------------------------------
   The engine's videosFor, videoGroups and videoMeta when it ships them, else
   the same rules here, so a page holding an older engine still lists them. */
var HS_VIDEO_HOSTS = ['youtube.com', 'youtu.be', 'vimeo.com'];
function hsVideoUrlOk(url){
  if(typeof url !== 'string' || url.length > 500) return false;
  const m = /^https:\/\/([A-Za-z0-9.-]+)(?:[\/?#][^\s]*)?$/.exec(url);
  if(!m) return false;
  const host = m[1].toLowerCase();
  return HS_VIDEO_HOSTS.some(function(x){ return host === x || host.slice(-(x.length + 1)) === '.' + x; });
}
function hsVideoList(h){ return (h && Array.isArray(h.videos) ? h.videos : []).filter(function(v){ return v && hsVideoUrlOk(v.url) && hsPlain(v.title); }); }
function hsVideosForLocal(h, id){
  const terms = {};
  (h.lexicon || []).forEach(function(t){ if(t && (t.itemIds || []).indexOf(id) >= 0) terms[t.id] = true; });
  const direct = [], viaTerm = [];
  (Array.isArray(h.videos) ? h.videos : []).forEach(function(v){
    if((v.itemIds || []).indexOf(id) >= 0) direct.push(v);
    else if((v.termIds || []).some(function(t){ return terms[t]; })) viaTerm.push(v);
  });
  return direct.concat(viaTerm);
}
function hsVideoGroupsLocal(h){
  const all = Array.isArray(h.videos) ? h.videos : [];
  const ordered = all.filter(function(v){ return v.house; }).concat(all.filter(function(v){ return !v.house; }));
  const groups = [], at = {};
  ordered.forEach(function(v){
    const topic = hsPlain(v.topic) || hsSay('videoNone');
    if(!Object.prototype.hasOwnProperty.call(at, topic)){ at[topic] = groups.length; groups.push({ topic: topic, videos: [] }); }
    groups[at[topic]].videos.push(v);
  });
  return groups;
}
function hsVideoMetaLocal(v){
  const parts = [];
  if(hsPlain(v.channel)) parts.push(hsPlain(v.channel));
  if(typeof v.mins === 'number' && v.mins > 0) parts.push(Math.max(1, Math.round(v.mins)) + ' min');
  return parts.join(', ');
}
/* NOBODY IS NAMED, VIDEOS INCLUDED. A house video's title, channel and why
   are quoted from the pack, and a pack may name a living cook or bartender
   there: a channel that is a person, a title "with" a chef. So the Ledger
   draws a video's own title and channel only when its channel is one of the
   schools, houses and publishers below, which name nobody, and its title
   does not take the shape a person's name takes in a title ("with" or
   "Chef" before two capitalised words). Any other video is drawn under a
   plain label made from its topic, with no channel. A why in that shape is
   left out too. The list names no person, so a channel nobody has vetted
   fails safe: a false alarm costs a title, a miss would name somebody. */
var HS_VIDEO_INSTITUTIONS = ['le cordon bleu', 'americas test kitchen', 'food network', 'hog island oyster co',
  'saveur', 'wine spirit education trust', 'wset', 'court of master sommeliers', 'guildsomm', 'wine folly',
  'diffords guide', 'educated barfly', 'the historic new orleans collection', 'sazerac house', 'brennans'];
var HS_VIDEO_PERSON_SHAPE = /\b(?:with|Chef)\s+(?:Master\s+Chef\s+)?[A-Z][A-Za-z\u00c0-\u024f'.]+\s+[A-Z][A-Za-z\u00c0-\u024f'.]+/;
function hsVideoFold(t){
  return hsPlain(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '');
}
function hsInstitution(channel){
  const c = hsVideoFold(channel);
  return !!c && HS_VIDEO_INSTITUTIONS.some(function(x){ return c.indexOf(hsVideoFold(x)) === 0; });
}
function hsPersonShape(text){ return HS_VIDEO_PERSON_SHAPE.test(hsPlain(text)); }
function hsVideoNamesPerson(v){ return !v || !hsInstitution(v.channel) || hsPersonShape(v.title); }
/* What the Ledger draws for one video: the title, the meta line and the why,
   each with any person left out. */
function hsVideoShown(v, meta, ord){
  const why = hsPersonShape(v.why) ? '' : hsPlain(v.why);
  if(!hsVideoNamesPerson(v)) return { title: hsPlain(v.title), meta: meta, why: why };
  const mins = typeof v.mins === 'number' && v.mins > 0 ? Math.max(1, Math.round(v.mins)) + ' min' : '';
  const topic = hsPlain(v.topic) || hsSay('videoNone');
  const title = ord && ord.n > 1 ? hsSay('videoPlainOf', { topic: topic, i: ord.i, n: ord.n }) : hsSay('videoPlain', { topic: topic });
  return { title: title, meta: mins, why: why };
}
/* Two plain labels in one list would read as one link twice, so the plain
   videos that share a topic in a list are counted: "1 of 2", "2 of 2". */
function hsVideoOrdinals(vids){
  const total = {}, seen = {}, out = {};
  vids.forEach(function(v){ if(hsVideoNamesPerson(v)){ const t = hsPlain(v.topic); total[t] = (total[t] || 0) + 1; } });
  vids.forEach(function(v){ if(hsVideoNamesPerson(v)){ const t = hsPlain(v.topic); seen[t] = (seen[t] || 0) + 1; out[v.id] = { i: seen[t], n: total[t] }; } });
  return out;
}
function hsHouseFn(name, local){
  const lib = typeof houseLibHere === 'function' ? houseLibHere() : null;
  return lib && typeof lib[name] === 'function' ? lib[name] : local;
}
function hsVideosFor(h, id){
  const ok = {};
  hsVideoList(h).forEach(function(v){ ok[v.id] = true; });
  return hsHouseFn('videosFor', hsVideosForLocal)(h, id).filter(function(v){ return ok[v.id]; });
}
function hsVideoGroups(h){
  const ok = {};
  hsVideoList(h).forEach(function(v){ ok[v.id] = true; });
  return hsHouseFn('videoGroups', hsVideoGroupsLocal)(h).map(function(g){
    return { topic: g.topic, videos: g.videos.filter(function(v){ return ok[v.id]; }) };
  }).filter(function(g){ return g.videos.length; });
}
/* One video: the title as a link out, the channel and length, why it helps,
   and, in the study view's list, the items it teaches (a drink opens its
   card; a dish or a wine is a link into its room, or words). */
function hsVideoLI(h, v, withFor, ord){
  const shown = hsVideoShown(v, hsHouseFn('videoMeta', hsVideoMetaLocal)(v), ord);
  const meta = shown.meta;
  let names = '';
  if(withFor){
    const items = (v.itemIds || []).map(function(i){ return hsFind(h, i); }).filter(function(it){ return it && hsPlain(it.name); });
    if(items.length) names = '<span class="hs-vfor">' + esc(hsSay('videoFor')) + items.map(function(it){
      const kind = hsKindOf(it.id);
      if(kind === 'cocktail') return '<button class="hs-inline" data-act="hs-open" data-id="' + esc(it.id) + '">' + esc(hsPlain(it.name)) + '</button>';
      const room = kind === 'wine' ? 'codex' : 'table';
      return hsRoomLink(room, hsRoomHref(room, it.id, h), hsPlain(it.name));
    }).join(', ') + '</span>';
  }
  return '<li class="hs-video" data-video="' + esc(v.id) + '">'
    + '<a class="hs-vlink" href="' + esc(v.url) + '" target="_blank" rel="noopener">' + esc(shown.title) + '<span class="sr-only"> ' + esc(hsSay('newTab')) + '</span></a>'
    + (meta ? '<span class="hs-vmeta">' + esc(meta) + '</span>' : '')
    + (shown.why ? '<span class="hs-vwhy">' + esc(shown.why) + '</span>' : '')
    + names
    + '</li>';
}
/* The Watch block on a card: nothing when the house names no video for the drink. */
function hsWatchHTML(h, id){
  const vids = hsVideosFor(h, id);
  if(!vids.length) return '';
  const ords = hsVideoOrdinals(vids);
  return '<section class="hs-group hs-watch" aria-labelledby="hs-watch-h"><h3 class="hs-h3" id="hs-watch-h">' + esc(hsSay('watch')) + '</h3>'
    + '<p class="hs-soft">' + esc(hsSay('videoNote')) + '</p>'
    + '<ul class="hs-vlist">' + vids.map(function(v){ return hsVideoLI(h, v, false, ords[v.id]); }).join('') + '</ul></section>';
}
/* The Videos entry at the foot of the list: every video by topic, the house's
   own first, one closed disclosure per topic so the first screen stays the menu's. */
function hsVideosHTML(h){
  const groups = hsVideoGroups(h);
  const n = groups.reduce(function(t, g){ return t + g.videos.length; }, 0);
  if(!n) return '';
  const ords = hsVideoOrdinals(groups.reduce(function(all, g){ return all.concat(g.videos); }, []));
  return '<section class="panel hs-sec hs-videos" aria-labelledby="hs-videos-h"><h3 class="eyebrow hs-sec-name" id="hs-videos-h">' + esc(hsSay('videosCount', { n: n })) + '</h3>'
    + '<p class="hs-soft hs-vnote">' + esc(hsSay('videoNote')) + '</p>'
    + groups.map(function(g){
      return '<details class="hs-more"><summary>' + esc(g.topic) + ' (' + g.videos.length + ')</summary><ul class="hs-vlist">'
        + g.videos.map(function(v){ return hsVideoLI(h, v, true, ords[v.id]); }).join('') + '</ul></details>';
    }).join('')
    + '</section>';
}

/* ---- the view ------------------------------------------------------------------- */
function houseStudyHTML(){
  if(!houseStudyOn()) return '';
  const h = hsCurrent();
  const st = hsState();
  /* the study view keeps no card of its own: its Flash cards buttons open
     the Flashcards tab's decks, one card style (the consolidation) */
  st.deck = null;
  if(st.open){
    const card = hsCardHTML(h, st.open);
    if(card) return card;
    st.open = null;
  }
  return hsListHTML(h);
}

function hsHeaderHTML(h, rows){
  const st = hsState();
  const houseIds = rows.filter(function(r){ return !r.own; }).map(function(r){ return r.id; });
  const pr = hsProgress(houseIds);
  const progressLine = pr.studied ? hsSay('progress', pr) : hsSay('progressNone');
  const meals = hsMeals(h);
  const meal = hsMealGet(h);
  const mealChips = meals.length > 1 ? '<div class="hs-meals" role="group" aria-label="The shift">'
    + [['', hsSay('allDay')]].concat(meals.map(function(m){ return [m, m]; })).map(function(m){
      const on = m[0] === meal;
      return '<button class="chip hs-chip' + (on ? ' on' : '') + '" aria-pressed="' + (on ? 'true' : 'false') + '" data-act="hs-meal" data-m="' + esc(m[0]) + '">' + esc(m[1]) + '</button>';
    }).join('') + '</div>' : '';
  const weakBtn = pr.again ? '<button class="btn btn-ghost" data-act="hs-cards" data-weak="1">' + esc(hsSay('weak', { n: pr.again })) + '</button>'
    : '<button class="btn btn-ghost" disabled>' + esc(hsSay('weakNone')) + '</button>';
  return '<section class="panel hs-head" aria-labelledby="hs-house">'
    + '<div class="hs-head-top"><h2 class="hs-house" id="hs-house">' + esc(h.name) + '</h2>'
    + '<button class="hs-quiet" data-act="hs-editall">' + esc(hsSay('editOff')) + '</button></div>'
    + '<div class="hs-progress">' + esc(progressLine) + '</div>'
    + mealChips
    + '<div class="hs-btns"><button class="btn btn-brass" data-act="hs-cards">' + esc(hsSay('cards')) + '</button>'
    + weakBtn
    + '<button class="btn btn-ghost" data-act="hs-drill">' + esc(hsSay('quizTab')) + '</button></div>'
    + '</section>';
}

function hsRowHTML(r, againIds){
  return '<button class="hs-row" data-act="hs-open" data-id="' + esc(r.id) + '">'
    + '<span class="hs-row-top"><span class="hs-row-name">' + esc(r.name)
    + (againIds.indexOf(r.id) >= 0 ? ' <span class="hs-tag">' + esc(hsSay('again')) + '</span>' : '') + '</span>'
    + (r.price ? '<span class="hs-row-price">' + esc(r.price) + '</span>' : '') + '</span>'
    + (r.line ? '<span class="hs-row-line">' + esc(r.line) + '</span>' : '')
    + '</button>';
}

/* the rows block, repainted alone on every keystroke in the search box */
function houseStudyRowsHTML(){
  const h = hsCurrent();
  if(!h) return '';
  const st = hsState();
  const shown = hsVisible(h);
  const againIds = hsProgress(shown.filter(function(r){ return !r.own; }).map(function(r){ return r.id; })).againIds;
  let out = '';
  hsSections(shown).forEach(function(s){
    const rows = shown.filter(function(r){ return r.section === s.section; });
    const own = rows.length && rows[0].own;
    out += '<section class="panel hs-sec" aria-label="' + esc(s.section) + '">'
      + '<div class="hs-sec-head"><h3 class="eyebrow hs-sec-name">' + esc(s.section) + ' · ' + s.count + '</h3>'
      + (own ? '' : '<button class="btn btn-ghost hs-sec-cards" data-act="hs-cards" data-s="' + esc(s.section) + '">' + esc(hsSay('cards')) + '</button>') + '</div>'
      + rows.map(function(r){ return hsRowHTML(r, againIds); }).join('')
      + '</section>';
  });
  const q = st.q || '';
  if(hsFold(q).trim()){
    if(!shown.length) out += '<div class="hs-none">' + esc(hsSay('searchNone', { query: q })) + '</div>';
    const away = hsElsewhere(h, q);
    if(away.length){
      out += '<section class="panel hs-sec"><h3 class="eyebrow hs-sec-name">' + esc(hsSay('elsewhere')) + '</h3><ul class="hs-list">'
        + away.map(function(a){
          const room = a.kind === 'wine' ? 'codex' : 'table';
          return '<li>' + hsRoomLink(room, hsRoomHref(room, a.id, h), a.name) + ', in the ' + esc(HS_ROOM_NAMES[room]) + '</li>';
        }).join('') + '</ul></section>';
    }
  }
  return out;
}
function hsShowingWords(h){
  const st = hsState();
  const shown = hsVisible(h);
  const q = st.q || '';
  if(hsFold(q).trim()) return shown.length ? hsSay('searchHits', { n: shown.length, query: q }) : hsSay('searchNone', { query: q });
  return hsSay('showing', { section: st.sec || 'the whole menu', n: shown.length, unit: hsUnit(shown.length) });
}

function hsListHTML(h){
  const st = hsState();
  const all = hsRows(h);
  if(st.sec && !all.some(function(r){ return r.section === st.sec; })) st.sec = '';
  const chips = [['', hsSay('all', { n: all.length })]].concat(hsSections(all).map(function(s){ return [s.section, s.section + ' ' + s.count]; }))
    .map(function(c){
      const on = c[0] === (st.sec || '');
      return '<button class="chip hs-chip' + (on ? ' on' : '') + '" aria-pressed="' + (on ? 'true' : 'false') + '" data-act="hs-sec" data-s="' + esc(c[0]) + '">' + esc(c[1]) + '</button>';
    }).join('');
  const nd = (h.dishes || []).length, nw = (h.wines || []).length;
  const also = (nd || nw) ? '<div class="hs-also">' + esc(hsSay('alsoHouse'))
    + [nd ? hsRoomLink('table', hsRoomListHref('table'), nd + ' dish' + (nd === 1 ? '' : 'es') + ' in the World Table') : '',
       nw ? hsRoomLink('codex', hsRoomListHref('codex'), nw + ' wine' + (nw === 1 ? '' : 's') + ' in the Codex') : ''].filter(Boolean).join(', ')
    + '</div>' : '';
  /* the facts sit at the foot, beside the other rooms: at 390 by 844 the
     header gives its line to the first row of the menu, and every card
     still says the date its prices were printed */
  const n = (h.cocktails || []).length;
  const facts = [h.menusReadOn ? hsSay('read', { date: hsDate(h.menusReadOn) }) : '', n + ' ' + hsUnit(n)].filter(Boolean).join(' · ');
  return '<div class="hs col-sm">'
    + hsHeaderHTML(h, all)
    + '<div class="hs-bar">'
    + '<div class="hs-find"><label class="sr-only" for="hs-q">' + esc(hsSay('find')) + '</label>'
    + '<input class="input hs-q" id="hs-q" type="search" autocomplete="off" placeholder="' + esc(hsSay('find')) + '" value="' + esc(st.q || '') + '">'
    + (st.q ? '<button class="btn btn-ghost hs-clear" data-act="hs-clear">' + esc(hsSay('clear')) + '</button>' : '') + '</div>'
    + '<div class="hs-chips" role="group" aria-label="Sections">' + chips + '</div>'
    + '</div>'
    + '<div id="hs-rows" class="col-sm">' + houseStudyRowsHTML() + '</div>'
    + hsHouseListsHTML(h)
    + hsVideosHTML(h)
    + '<div class="hs-facts">' + esc(facts) + '</div>'
    + also
    + '</div>';
}

/* The house's own lists, read only and kept only, about the drinks: one
   closed disclosure each. The must-knows are the house's whole. */
function hsHouseListsHTML(h){
  const drinks = {};
  (h.cocktails || []).forEach(function(c){ if(c && c.id) drinks[c.id] = true; });
  const aboutDrinks = function(ids){ return (ids || []).some(function(i){ return drinks[i]; }); };
  const lists = [];
  const must = (h.mustKnows || []).filter(function(k){ return hsKeptText(k.body); });
  if(must.length) lists.push(['Must-knows', must.map(function(k){ return '<li><span class="hs-strong">' + esc(k.title) + '</span><br>' + esc(hsKeptText(k.body)) + '</li>'; })]);
  const words = (h.lexicon || []).filter(function(t){ return aboutDrinks(t.itemIds) && (hsKeptText(t.say) || hsKeptText(t.toGuest)); });
  if(words.length) lists.push(['The words', words.map(hsTermLI)]);
  const table = (h.scenarios || []).filter(function(s){ return aboutDrinks(s.itemIds) && hsKeptText(s.you); });
  if(table.length) lists.push(['At the table', table.map(function(s){ return '<li><span class="hs-strong">' + esc(s.title) + '</span><br>“' + esc(s.guest) + '”<br>' + esc(hsKeptText(s.you)) + '</li>'; })]);
  const mixes = (h.mixUps || []).filter(function(m){ return (drinks[m.aId] || drinks[m.bId]) && hsKeptText(m.difference); });
  if(mixes.length) lists.push(['Mix-ups', mixes.map(function(m){
    const a = hsFind(h, m.aId), b = hsFind(h, m.bId);
    return '<li><span class="hs-strong">' + esc(a ? a.name : '') + ' and ' + esc(b ? b.name : '') + '</span><br>' + esc(hsKeptText(m.difference)) + '</li>';
  })]);
  const tastings = (h.tastings || []).filter(function(t){ return t && hsPlain(t.name); });
  if(tastings.length) lists.push(['The tastings', tastings.map(function(t){
    return '<li><span class="hs-strong">' + esc(t.name) + '</span>' + (t.courses || []).map(function(c){
      const pour = hsFind(h, c.pourId);
      return '<br>' + esc(c.label || '') + (pour ? ': ' + esc(pour.name) : c.pourText ? ': ' + esc(c.pourText) : '');
    }).join('') + '</li>';
  })]);
  if(!lists.length) return '';
  return '<section class="panel hs-sec" aria-label="' + esc(hsSay('houseLists')) + '"><h3 class="eyebrow hs-sec-name">' + esc(hsSay('houseLists')) + '</h3>'
    + lists.map(function(l){ return '<details class="hs-more"><summary>' + esc(l[0]) + ' (' + l[1].length + ')</summary><ul class="hs-list">' + l[1].join('') + '</ul></details>'; }).join('')
    + '</section>';
}
function hsTermLI(t){
  const say = hsKeptText(t.say), to = hsKeptText(t.toGuest);
  return '<li><span class="hs-strong">' + esc(t.term) + '</span>' + (say ? ' (' + esc(say) + ')' : '') + (to ? '<br>' + esc(to) : '') + '</li>';
}

/* paragraphs from a note's text */
function hsParas(text){
  return String(text || '').split(/\n\s*\n/).map(function(p){ return p.trim(); }).filter(Boolean)
    .map(function(p){ return '<p>' + esc(p) + '</p>'; }).join('');
}

/* ---- In this app: the links the Ledger already holds (1.5) ---------------------- */
function hsCanonFor(item){
  if(typeof COCKTAILS === 'undefined' || !Array.isArray(COCKTAILS)) return null;
  const hay = hsFold(item.name);
  let best = null;
  COCKTAILS.forEach(function(c){
    const f = hsFold(c.name).trim();
    if(!(f.length >= 7 || f.indexOf(' ') > 0)) return;
    if(hsNameIn(hay, c.name) < 0) return;
    if(!best || f.length > hsFold(best.name).trim().length) best = c;
  });
  if(best) return { c: best, by: 'name' };
  const fam = hsFold(String(item.family || '').split(',')[0]);
  if(fam.trim()){
    const c = COCKTAILS.find(function(x){ return hsFold(x.name) === fam; });
    if(c) return { c: c, by: 'family' };
  }
  return null;
}
function hsLinkHay(item, row){
  const parts = hsKept(item.parts) || {};
  const bits = [].concat(row.spec || item.spec || [], [row.method || item.method, row.glass || item.glass, row.garnish || item.garnish],
    ['main', 'technique', 'sauce', 'sides', 'taste'].map(function(k){ return parts[k]; }));
  return hsFold(bits.map(hsPlain).join(' '));
}
function hsGlossaryFor(item, row){
  if(typeof GLOSSARY === 'undefined' || !Array.isArray(GLOSSARY)) return [];
  const hay = hsLinkHay(item, row);
  return GLOSSARY.filter(function(g){ return g && hsFold(g.term).trim().length >= 4; })
    .map(function(g){ return { g: g, at: hsNameIn(hay, g.term) }; })
    .filter(function(x){ return x.at >= 0; })
    .sort(function(a, b){ return a.at - b.at; }).slice(0, 6).map(function(x){ return x.g; });
}
function hsProducersFor(item, row){
  if(typeof PRODUCERS === 'undefined' || !Array.isArray(PRODUCERS)) return [];
  const hay = hsFold([item.name].concat(row.spec || item.spec || []).map(hsPlain).join(' '));
  const seen = {};
  return PRODUCERS.filter(function(p){ return p && hsFold(p.name).trim().length >= 5; })
    .map(function(p){ return { p: p, at: hsNameIn(hay, p.name) }; })
    .filter(function(x){ if(x.at < 0 || seen[x.p.name]) return false; seen[x.p.name] = true; return true; })
    .sort(function(a, b){ return a.at - b.at; }).slice(0, 6).map(function(x){ return x.p; });
}
function hsShelfFor(row){
  if(typeof reqsOf !== 'function' || typeof reqLabel !== 'function') return [];
  /* only what the vocabulary reads: a '?' sentinel is a line it cannot name */
  try {
    return reqsOf(row).filter(function(r){ return Array.isArray(r) ? r.every(function(x){ return String(x).charAt(0) !== '?'; }) : String(r).charAt(0) !== '?'; })
      .map(reqLabel).filter(Boolean).slice(0, 12);
  } catch (e) { return []; }
}
function hsFirstSentences(text, n){
  const out = [];
  const re = /[^.!?]+[.!?]+(?=\s|$)/g;
  let m;
  while(out.length < n && (m = re.exec(String(text || '')))) out.push(m[0].trim());
  return out.join(' ');
}
function hsHereHTML(h, item, row){
  const blocks = [];
  const canon = hsCanonFor(item);
  if(canon){
    const href = '#/library/' + slugify(canon.c.name);
    const line = canon.by === 'name' ? hsSay('canonLine', { name: canon.c.name }) : hsSay('canonFamily', { name: canon.c.name });
    blocks.push('<div class="hs-block"><div class="eyebrow">The canon</div><p><a class="hs-link" href="' + esc(href) + '">' + esc(line) + '</a></p></div>');
  }
  const gloss = hsGlossaryFor(item, row);
  if(gloss.length) blocks.push('<div class="hs-block"><div class="eyebrow">Words in the spec</div><dl class="hs-dl">'
    + gloss.map(function(g){ return '<dt>' + esc(g.term) + '</dt><dd>' + esc(g.def) + '</dd>'; }).join('') + '</dl></div>');
  const prods = hsProducersFor(item, row);
  if(prods.length) blocks.push('<div class="hs-block"><div class="eyebrow">The producers</div><ul class="hs-list">'
    + prods.map(function(p){ return '<li><a class="hs-link" href="#/producers/' + esc(slugify(p.name)) + '">' + esc(p.name) + '</a></li>'; }).join('') + '</ul></div>');
  const shelf = hsShelfFor(row);
  if(shelf.length) blocks.push('<div class="hs-block"><div class="eyebrow">On the shelf as</div><p>' + esc(shelf.join(', ')) + '</p>'
    + '<button class="btn btn-ghost" data-act="menu-view" data-v="stock">See what the bar stocks</button></div>');
  const lu = hsLineupFor(h, item.id);
  const terms = lu.terms.filter(function(t){ return hsKeptText(t.say) || hsKeptText(t.toGuest); });
  if(terms.length) blocks.push('<div class="hs-block"><div class="eyebrow">The house’s words</div><ul class="hs-list">' + terms.map(hsTermLI).join('') + '</ul></div>');
  const deck = typeof houseRoleDeck === 'function' ? houseRoleDeck() : [];
  const scen = lu.scenarios.filter(function(s){ return deck.some(function(e){ return e.kind === 'scenario' && e.id === s.id; }); });
  if(scen.length) blocks.push('<div class="hs-block"><div class="eyebrow">At the table</div><div class="hs-stack">'
    + scen.slice(0, 6).map(function(s){ return '<button class="btn btn-ghost hs-left" data-act="hs-guest" data-id="' + esc(s.id) + '">' + esc(s.title) + '</button>'; }).join('') + '</div></div>');
  /* the Library's story, last and closed: it is the Library's telling, not
     the house's, and the house's own coaching above may say otherwise */
  if(canon && typeof LORE !== 'undefined' && LORE[canon.c.name]){
    const href = '#/library/' + slugify(canon.c.name);
    blocks.push('<details class="hs-more" data-keep="story"' + hsOpenAttr(item.id, 'story') + '><summary>' + esc(hsSay('libStory')) + '</summary><div class="hs-read"><p>' + esc(hsFirstSentences(LORE[canon.c.name], 2)) + '</p>'
      + '<p><a class="hs-link" href="' + esc(href) + '">' + esc(hsSay('story')) + '</a></p></div></details>');
  }
  return blocks.length ? '<section class="hs-group" aria-label="' + esc(hsSay('here')) + '"><h3 class="hs-h3">' + esc(hsSay('here')) + '</h3>' + blocks.join('') + '</section>' : '';
}

/* ---- What it is made of, and Compare with (the component deep dive) ------------- */
/* An item's components grouped Ingredients, Techniques, Stories, the engine's
   componentGroups when it is here (OOT.houseLib), else the same rule read
   here: the house's components whose itemIds name the item, in the house's
   order, a kind with none left out. */
var HS_COMPONENT_KINDS = ['ingredient', 'technique', 'story'];
var HS_COMPONENT_LABELS = { ingredient: 'Ingredients', technique: 'Techniques', story: 'Stories' };
function hsComponentGroupsLocal(h, id){
  const mine = (h && Array.isArray(h.components) ? h.components : []).filter(function(c){ return c && Array.isArray(c.itemIds) && c.itemIds.indexOf(id) >= 0; });
  return HS_COMPONENT_KINDS.map(function(k){
    return { kind: k, label: HS_COMPONENT_LABELS[k], components: mine.filter(function(c){ return c.kind === k; }) };
  }).filter(function(g){ return g.components.length; });
}
function hsComponentGroups(h, id){ return hsHouseFn('componentGroups', hsComponentGroupsLocal)(h, id); }
function hsComponentVideos(h, cid){
  return hsVideoList(h).filter(function(v){ return Array.isArray(v.componentIds) && v.componentIds.indexOf(cid) >= 0; });
}
/* A component's kept card, or null: a front and a back, both kept. */
function hsComponentCard(c){
  const v = hsKept(c && c.card);
  return v && hsPlain(v.front) && hsPlain(v.back) ? { front: hsPlain(v.front), back: hsPlain(v.back) } : null;
}
function hsMadeOfHTML(h, id){
  const groups = hsComponentGroups(h, id);
  if(!groups.length) return '';
  let cards = 0;
  const body = groups.map(function(g){
    return '<div class="eyebrow hs-kind" data-kind="' + esc(g.kind) + '">' + esc(g.label) + '</div><ul class="hs-comps">'
      + g.components.map(function(c){
        const say = hsKeptText(c.say);
        const explain = hsKeptText(c.explain);
        const card = hsComponentCard(c);
        if(card) cards++;
        const vids = hsComponentVideos(h, c.id);
        const ords = vids.length ? hsVideoOrdinals(vids) : {};
        return '<li data-component="' + esc(c.id) + '"><details class="hs-more hs-comp"' + hsOpenAttr(id, 'c:' + c.id) + '><summary>' + esc(hsPlain(c.name)) + '</summary><div class="hs-read">'
          + (say ? '<p><span class="hs-soft">' + esc(hsSay('say')) + ':</span> ' + esc(say) + '</p>' : '')
          + (explain ? hsParas(explain) : '')
          + (card ? '<dl class="hs-dl"><dt>' + esc(hsSay('cardFront')) + '</dt><dd>' + esc(card.front) + '</dd><dt>' + esc(hsSay('cardBack')) + '</dt><dd>' + esc(card.back) + '</dd></dl>' : '')
          + (vids.length ? '<p class="hs-soft">' + esc(hsSay('videoNote')) + '</p><ul class="hs-vlist">' + vids.map(function(v){ return hsVideoLI(h, v, false, ords[v.id]); }).join('') + '</ul>' : '')
          + '</div></details></li>';
      }).join('') + '</ul>';
  }).join('');
  return '<section class="hs-group hs-madeof" aria-labelledby="hs-madeof-h"><h3 class="hs-h3" id="hs-madeof-h">' + esc(hsSay('madeOf')) + '</h3>' + body
    + (cards ? '<div class="hs-btns"><button class="btn btn-brass" data-act="hs-comp-cards" data-id="' + esc(id) + '">' + esc(hsSay('flashThese')) + '</button></div>' : '')
    + '</section>';
}
/* An item's kept comparisons: a Ledger cocktail opens its Library page here,
   a Table recipe or technique and a Codex door open in their rooms on the
   shared origin when the room is installed or the network is up (hsRoomLink),
   and a classic is words. */
function hsCompareHref(e, h){
  const ref = hsPlain(e && e.ref);
  if(!ref) return { href: '', room: '' };
  if(e.app === 'ledger') return { href: '#/library/' + slugify(ref), room: 'ledger' };
  if(!hsShared()) return { href: '', room: '' };
  if(e.app === 'table') return { href: /^(recipe|technique)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(ref) ? '/table/' + ref : '', room: 'table' };
  if(e.app === 'codex') return { href: /^w-[a-z0-9]{8}$/.test(ref) ? hsRoomHref('codex', ref, h) : '/codex/#ref=' + encodeURIComponent(ref), room: 'codex' };
  return { href: '', room: '' };
}
function hsCompareHTML(h, item){
  const entries = hsKept(item && item.compare);
  if(!Array.isArray(entries)) return '';
  const rows = entries.filter(function(e){ return e && hsPlain(e.label); }).map(function(e){
    const to = e.app === 'classic' ? { href: '', room: '' } : hsCompareHref(e, h);
    const label = hsPlain(e.label);
    let head;
    if(to.room === 'ledger' && to.href) head = '<a class="hs-link" href="' + esc(to.href) + '">' + esc(label) + '</a> <span class="hs-soft">' + esc(hsSay('inLibrary')) + '</span>';
    else if(to.href) head = hsRoomLink(to.room, to.href, label) + ' <span class="hs-soft">' + esc(hsSay('inTheRoom', { room: HS_ROOM_NAMES[to.room] })) + '</span>';
    else head = '<span class="hs-strong">' + esc(label) + '</span>' + (e.app === 'classic' ? ' <span class="hs-soft">' + esc(hsSay('classic')) + '</span>' : '');
    return '<li data-app="' + esc(e.app) + '">' + head
      + (hsPlain(e.same) ? '<br><span class="hs-soft">' + esc(hsSay('same')) + ':</span> ' + esc(hsPlain(e.same)) : '')
      + (hsPlain(e.different) ? '<br><span class="hs-soft">' + esc(hsSay('different')) + ':</span> ' + esc(hsPlain(e.different)) : '')
      + '</li>';
  });
  if(!rows.length) return '';
  return '<section class="hs-group hs-compare" aria-labelledby="hs-compare-h"><h3 class="hs-h3" id="hs-compare-h">' + esc(hsSay('compareWith')) + '</h3><ul class="hs-list">' + rows.join('') + '</ul></section>';
}

/* ---- Who makes it: the producers behind the house's drinks ------------------------
   A component of the house may carry a producer mark (the engine's
   ProducerProfile: type, who, where, founded, history, facts, notes, sayIt,
   askKitchen). The bar's producers are the kept profiles whose component
   reaches a drink of the house; a producer of the kitchen's alone is never
   drawn in this app, since a food profile may name the people behind a
   farm or a bakery and the Ledger names nobody living. Read only, kept
   only (hsKept), and nothing here says what a guest may eat or drink: a
   question about that is the bar's or the kitchen's, at lineup. */
var HS_PRODUCER_TYPES = { maker: 'Maker', farm: 'Farm', fishery: 'Fishery', origin: 'Origin', house: 'Made in house' };
var HS_PRODUCER_KINDS = ['producerOf', 'producerWhere', 'producerDish'];
function hsProducerProfile(c){
  const v = hsKept(c && c.producer);
  return v && typeof v === 'object' && !Array.isArray(v) && hsPlain(v.who) ? v : null;
}
/* the who as a question names it: up to its first bracket or comma, the engine's shortWho */
function hsShortWho(who){
  const w = hsPlain(who);
  const cut = w.split(/\s*\(|,\s/)[0].trim();
  return cut || w;
}
function hsTextList(v){ return Array.isArray(v) ? v.map(hsPlain).filter(Boolean) : []; }
/* whether a component's name only repeats its producer's who */
function hsEchoes(who, supplies){
  const w = hsFold(who).trim(), s = hsFold(supplies).trim();
  if(!w || !s) return false;
  return s === w || w.indexOf(s) >= 0 || s.indexOf(w + ' ') === 0;
}
/* The general library's entry for a producer, matched on folded words, never
   mapped by hand: the library name that sits earliest in the who, else in the
   component's name, the longer name winning a tie. A name is read as its
   forms: the whole name, and where it carries a bracket or a slash, each part
   ('Toschi (Nocello)' is Toschi and Nocello, 'Rhum J.M / Neisson' Rhum J.M
   and Neisson), a form under four characters never matching. A form matches
   as a whole run of words, or, when it has two words or more, as every one of
   its words standing whole somewhere in the text ('Mattei Cap Corse' in 'L.N.
   Mattei, makers of Cap Corse Mattei'). A one-word form does not match behind
   a capitalised word of the same name, unless that word opens the text: the
   Hennessy of 'Moët Hennessy' is the group's name, not the cognac house's,
   while the Dudognon of 'Maison Dudognon' is the house. */
function hsLibraryForms(name){
  const whole = hsPlain(name);
  const parts = [whole].concat(whole.split(/\s*[()\/]\s*/));
  const seen = {}, out = [];
  parts.forEach(function(p){
    const f = hsFold(p).trim();
    if(f.length >= 4 && !seen[f]){ seen[f] = true; out.push(f); }
  });
  return out;
}
/* a text as the matcher reads it: its folded hay, and the same hay with every
   word that sits behind a capitalised word of the same name (no comma or
   bracket between, the first word of the text excepted) blanked, for a
   one-word form; the two are the same length, so a place in one is a place in
   the other */
function hsLibraryHay(text){
  const raw = hsPlain(text).split(/\s+/).filter(Boolean);
  const plain = [], masked = [];
  raw.forEach(function(w, i){
    const f = hsFold(w).trim();
    if(!f) return;
    const prev = i > 0 ? raw[i - 1] : '';
    const behind = i > 1 && /^[^\p{L}\p{N}]*\p{Lu}/u.test(prev) && !/[,;:)\]]$/.test(prev) && !/^[(\[]/.test(w);
    plain.push(f);
    masked.push(behind ? f.replace(/[a-z0-9]/g, '_') : f);
  });
  return { plain: ' ' + plain.join(' ') + ' ', masked: ' ' + masked.join(' ') + ' ' };
}
function hsLibraryAt(hay, form){
  const words = form.split(' ');
  if(words.length === 1) return hsNameIn(hay.masked, form);
  const run = hsNameIn(hay.plain, form);
  if(run >= 0) return run;
  let first = -1;
  for(let i = 0; i < words.length; i++){
    const at = hay.plain.indexOf(' ' + words[i] + ' ');
    if(at < 0) return -1;
    if(first < 0 || at < first) first = at;
  }
  return first;
}
function hsLibraryProducer(who, supplies){
  if(typeof PRODUCERS === 'undefined' || !Array.isArray(PRODUCERS)) return null;
  const find = function(text){
    const hay = hsLibraryHay(text);
    let best = null, at = -1;
    PRODUCERS.forEach(function(p){
      if(!p || !hsPlain(p.name)) return;
      let i = -1;
      hsLibraryForms(p.name).forEach(function(f){ const j = hsLibraryAt(hay, f); if(j >= 0 && (i < 0 || j < i)) i = j; });
      if(i < 0) return;
      if(!best || i < at || (i === at && hsFold(p.name).length > hsFold(best.name).length)){ best = p; at = i; }
    });
    return best;
  };
  return find(who) || find(supplies);
}
/* one producer as the card and the Producers tab draw it, with the drinks of the house it reaches */
function hsProducerRow(h, c){
  const p = hsProducerProfile(c);
  if(!p) return null;
  const who = hsPlain(p.who);
  const type = HS_PRODUCER_TYPES[p.type] ? p.type : 'maker';
  const drinks = [];
  (c.itemIds || []).forEach(function(id){
    const it = (h.cocktails || []).find(function(x){ return x && x.id === id; });
    if(it && hsPlain(it.name) && !drinks.some(function(d){ return d.id === id; })) drinks.push({ id: id, name: hsPlain(it.name) });
  });
  const history = hsPlain(p.history);
  return { id: c.id, supplies: hsPlain(c.name), suppliesShown: hsEchoes(who, c.name) ? '' : hsPlain(c.name),
    type: type, typeLabel: HS_PRODUCER_TYPES[type], who: who, short: hsShortWho(who),
    where: hsPlain(p.where), founded: hsPlain(p.founded), sayIt: hsPlain(p.sayIt),
    facts: hsTextList(p.facts), paragraphs: history ? history.split(/\n\s*\n/).map(function(x){ return x.trim(); }).filter(Boolean) : [],
    notes: hsTextList(p.notes), ask: hsTextList(p.askKitchen), drinks: drinks, lib: hsLibraryProducer(who, c.name) };
}
/* every kept producer whose component reaches a drink of the house, in the
   house's order; kept against the house object it was read from, since the
   engine hands back a new object for every saved change and a screen asks
   for these several times a paint (read them, never change them) */
var HS_PRODUCER_MEMO = { h: null, rows: [] };
function hsDrinkProducers(h){
  if(!h) return [];
  if(HS_PRODUCER_MEMO.h === h) return HS_PRODUCER_MEMO.rows;
  const drinks = {};
  (h.cocktails || []).forEach(function(c){ if(c && c.id && hsPlain(c.name)) drinks[c.id] = true; });
  const rows = (Array.isArray(h.components) ? h.components : [])
    .filter(function(c){ return c && Array.isArray(c.itemIds) && c.itemIds.some(function(id){ return drinks[id]; }); })
    .map(function(c){ return hsProducerRow(h, c); }).filter(Boolean);
  HS_PRODUCER_MEMO = { h: h, rows: rows };
  return rows;
}
/* the producers behind one drink, in the house's order */
function hsWhoMakesRows(h, id){
  return hsDrinkProducers(h).filter(function(r){ return r.drinks.some(function(d){ return d.id === id; }); });
}
function hsDrinkProducerById(h, cid){
  return hsDrinkProducers(h).find(function(r){ return r.id === cid; }) || null;
}
/* The house as the engine should read it for the bar's producers: its
   drinks, and only the components whose producers reach them, so a card's
   "which drinks?" and a question's wrong answers are the bar's alone. */
function hsDrinkProducerHouse(h){
  const keep = {};
  hsDrinkProducers(h).forEach(function(r){ keep[r.id] = true; });
  return Object.assign({}, h, { dishes: [], wines: [], lexicon: [], mixUps: [], scenarios: [], tastings: [],
    components: (Array.isArray(h.components) ? h.components : []).filter(function(c){ return c && keep[c.id]; }) });
}
/* "The producers": how many, behind how many drinks; empty when none */
function hsProducersLine(h){
  const rows = hsDrinkProducers(h);
  if(!rows.length) return '';
  const drinks = {};
  rows.forEach(function(r){ r.drinks.forEach(function(d){ drinks[d.id] = true; }); });
  const m = Object.keys(drinks).length;
  return hsSay('producersLine', { n: rows.length + (rows.length === 1 ? ' producer' : ' producers'), m: m + (m === 1 ? ' drink' : ' drinks') });
}

/* The cards: up to three per producer (who and where, one thing to know, which
   drinks), the engine's buildFlashcards when it deals the producer kind, else
   the same three made here. */
function hsFirstSentenceOf(text){
  const t = hsPlain(String(text || '').split(/\n\s*\n/)[0]);
  const m = /^[\s\S]*?[.!?](?=\s|$)/.exec(t);
  return hsPlain(m ? m[0] : t);
}
function hsSayList(names){
  if(names.length < 2) return names.join('');
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
}
/* A founded value as the who card says it, without its closing stop, by the
   engine's rule (house-drills.ts foundedSentence): after Founded when it
   opens on a date (a figure, a month, or a lower case word that carries one,
   'between 1849 and 1857'), and as a sentence of its own when it opens on
   any other capital ('Distillery 1896; brand 1992 or 1993'), never 'Founded
   The family has...'. */
var HS_MONTH_WORD = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)\b/;
function hsFoundedSentence(founded){
  const f = hsPlain(founded).replace(/[\s.]+$/, '');
  if(!f) return '';
  return /^[0-9a-z]/.test(f) || HS_MONTH_WORD.test(f) ? 'Founded ' + f : f;
}
/* sentences as a card's back joins them: each without its own stop, one stop at the end */
function hsJoinSentences(parts){
  const kept = parts.map(function(p){ return hsPlain(p).replace(/[\s.]+$/, ''); }).filter(Boolean);
  return kept.length ? kept.join('. ') + '.' : '';
}
function hsProducerCardsLocal(house){
  const out = [];
  hsDrinkProducers(house).forEach(function(r){
    const who = hsJoinSentences([r.where, hsFoundedSentence(r.founded)]);
    if(who) out.push({ kind: 'producer', front: r.short + (r.founded ? ': where, and since when?' : ': where from?'), back: who, itemId: r.id, n: 0 });
    const point = r.facts[0] || hsFirstSentenceOf(r.paragraphs.join('\n\n'));
    if(point) out.push({ kind: 'producer', front: r.short + ': one thing to know', back: point, itemId: r.id, n: 1 });
    if(r.drinks.length) out.push({ kind: 'producer', front: r.short + ': which drinks?', back: hsSayList(r.drinks.map(function(d){ return d.name; })) + '.', itemId: r.id, n: 2 });
  });
  return out;
}
function hsProducerFlashcards(h){
  if(!h) return [];
  const lib = typeof houseLibHere === 'function' ? houseLibHere() : null;
  const kinds = lib && lib.drills && Array.isArray(lib.drills.FLASHCARD_KINDS) ? lib.drills.FLASHCARD_KINDS : [];
  const build = kinds.indexOf('producer') >= 0 ? hsHouseFn('buildFlashcards', hsProducerCardsLocal) : hsProducerCardsLocal;
  try { return build(hsDrinkProducerHouse(h)).filter(function(c){ return c && c.kind === 'producer' && hsPlain(c.front) && hsPlain(c.back); }); }
  catch (e) { return hsProducerCardsLocal(h); }
}

/* The questions: which producer is behind a drink, where a producer is
   from, which drink uses a producer. The engine's dealQuestion when it
   knows the producer kinds, else the same rule here: four options, every
   wrong one another of the bar's producers (or its places, or its drinks),
   a second right answer never offered, nothing dealt under the floor. */
function hsDealProducerLocal(view, kind, rand){
  const rows = hsDrinkProducers(view);
  const fold = function(s){ return hsPlain(s).toLowerCase().replace(/\s+/g, ' '); };
  const distinct = function(list){ const seen = {}, out = []; list.forEach(function(s){ const t = hsPlain(s), f = fold(t); if(f && !seen[f]){ seen[f] = true; out.push(t); } }); return out; };
  const selfAnswers = function(stem, answer){ return hsFold(stem).indexOf(hsFold(answer)) >= 0; };
  let pool = [], field = [];
  if(kind === 'producerOf'){
    (view.cocktails || []).forEach(function(it){
      const whos = distinct(rows.filter(function(r){ return r.drinks.some(function(d){ return d.id === it.id; }); }).map(function(r){ return r.short; }));
      if(whos.length && hsPlain(it.name) && !selfAnswers(it.name, whos[0])) pool.push({ itemId: it.id, stem: hsPlain(it.name), answer: whos[0], others: whos.slice(1) });
    });
    field = distinct(rows.map(function(r){ return r.short; }));
  } else if(kind === 'producerWhere'){
    rows.forEach(function(r){ if(r.where && !selfAnswers(r.short, r.where)) pool.push({ itemId: r.id, stem: r.short, answer: r.where, others: [] }); });
    field = distinct(rows.map(function(r){ return r.where; }));
  } else if(kind === 'producerDish'){
    rows.forEach(function(r){
      const names = distinct(r.drinks.map(function(d){ return d.name; }));
      if(names.length && !selfAnswers(r.short, names[0])) pool.push({ itemId: r.id, stem: r.short, answer: names[0], others: names.slice(1) });
    });
    field = distinct((view.cocktails || []).map(function(c){ return c && c.name; }));
  } else return null;
  if(pool.length < 2 || field.length < 4) return null;
  const pick = function(n){ const r = rand(); return Math.min(n - 1, Math.max(0, Math.floor((r >= 0 && r < 1 ? r : 0) * n))); };
  const mix = function(list){ const out = list.slice(); for(let i = out.length - 1; i > 0; i--){ const j = pick(i + 1); const t = out[i]; out[i] = out[j]; out[j] = t; } return out; };
  const c = pool[pick(pool.length)];
  const right = [c.answer].concat(c.others).map(fold);
  const wrong = mix(field.filter(function(s){ return right.indexOf(fold(s)) < 0; })).slice(0, 3);
  if(wrong.length < 3) return null;
  return { kind: kind, stem: c.stem, options: mix([c.answer].concat(wrong)), answer: c.answer, itemId: c.itemId };
}
function hsDealProducer(view, kind, rand){
  const lib = typeof houseLibHere === 'function' ? houseLibHere() : null;
  const known = lib && lib.drills && Array.isArray(lib.drills.PRODUCER_KINDS) ? lib.drills.PRODUCER_KINDS : [];
  const deal = known.indexOf(kind) >= 0 ? hsHouseFn('dealQuestion', hsDealProducerLocal) : hsDealProducerLocal;
  try { return deal(view, kind, rand); } catch (e) { return hsDealProducerLocal(view, kind, rand); }
}
/* A dealt question in the quiz's own shape: its prompt in the Ledger's
   words, the producer's card as its study place (so a miss offers Study
   this card and the misses deal it), and the kind, so a miss is never read
   as a drink's own card. */
function hsProducerQuestion(q, rows){
  let row = null, n = 0, prompt = '', explain = '';
  if(q.kind === 'producerOf'){
    row = rows.find(function(r){ return r.short === q.answer && r.drinks.some(function(d){ return d.id === q.itemId; }); }) || null;
    n = 2;
    prompt = hsSay('qProducerOf', { name: q.stem });
    explain = q.stem + ': ' + q.answer + '.';
  } else if(q.kind === 'producerWhere'){
    row = rows.find(function(r){ return r.id === q.itemId; }) || null;
    prompt = hsSay('qProducerWhere', { name: q.stem });
    explain = q.stem + ': ' + q.answer + '.';
  } else {
    row = rows.find(function(r){ return r.id === q.itemId; }) || null;
    n = 2;
    prompt = hsSay('qProducerDrink', { name: q.stem });
    explain = q.stem + ': ' + (row ? hsSayList(row.drinks.map(function(d){ return d.name; })) : q.answer) + '.';
  }
  const out = { prompt: prompt, options: q.options.slice(), answer: q.answer, explain: explain, houseKind: q.kind };
  const cards = typeof producerCards === 'function' && row ? producerCards().filter(function(d){ return d.ref && d.ref.id === row.id; }) : [];
  const card = cards.find(function(d){ return d.n === n; }) || cards[0];
  if(card && typeof cardKey === 'function') out.ckey = cardKey(card);
  return out;
}
/* Up to `want` producer questions over the current house, the three kinds in
   turn and no stem asked twice; a section's round (state.quiz.section) asks
   only about the producers of that section's drinks. Empty with no house,
   no producer, or too few to make four options. */
function houseProducerQuestions(want){
  const h = hsCurrent();
  if(!h) return [];
  const rows = hsDrinkProducers(h);
  if(rows.length < 2) return [];
  const view = hsDrinkProducerHouse(h);
  const sec = typeof state !== 'undefined' && state && state.quiz ? state.quiz.section : null;
  const inSec = function(id){ return !sec || houseStudySectionOf(id) === sec; };
  const out = [], seen = {};
  for(let i = 0; i < 40 && out.length < (want || 3); i++){
    const kind = HS_PRODUCER_KINDS[i % HS_PRODUCER_KINDS.length];
    const q = hsDealProducer(view, kind, Math.random);
    if(!q) continue;
    if(sec){
      const ok = kind === 'producerOf' ? inSec(q.itemId) : rows.some(function(r){ return r.id === q.itemId && r.drinks.some(function(d){ return inSec(d.id); }); });
      if(!ok) continue;
    }
    const key = kind + '|' + hsFold(q.stem);
    if(seen[key]) continue;
    seen[key] = true;
    out.push(hsProducerQuestion(q, rows));
  }
  return out;
}

/* One producer's profile inside the card's disclosure: what it supplies,
   where and since when, the line to say, the facts, the story, the notes,
   Ask the bar when the bar has something to answer, and the general
   library's entry when it holds one. */
function hsProducerBodyHTML(r){
  const facts = [];
  if(r.suppliesShown) facts.push('<dt>' + esc(hsSay('producerSupplies')) + '</dt><dd>' + esc(r.suppliesShown) + '</dd>');
  if(r.where) facts.push('<dt>' + esc(hsSay('producerWhere')) + '</dt><dd>' + esc(r.where) + '</dd>');
  if(r.founded) facts.push('<dt>' + esc(hsSay('producerFounded')) + '</dt><dd>' + esc(r.founded) + '</dd>');
  const list = function(key, items){ return items.length ? '<div class="eyebrow">' + esc(hsSay(key)) + '</div><ul class="hs-list">' + items.map(function(t){ return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : ''; };
  return '<div class="hs-read">'
    + (facts.length ? '<dl class="hs-dl">' + facts.join('') + '</dl>' : '')
    + (r.sayIt ? '<p><span class="hs-soft">' + esc(hsSay('say')) + ':</span> “' + esc(r.sayIt) + '”</p>' : '')
    + list('producerFacts', r.facts)
    + (r.paragraphs.length ? '<div class="eyebrow">' + esc(hsSay('producerHistory')) + '</div>' + r.paragraphs.map(function(p){ return '<p>' + esc(p) + '</p>'; }).join('') : '')
    + list('producerNotes', r.notes)
    + list('askBar', r.ask)
    + (r.lib ? '<p><a class="hs-link" href="#/producers/' + esc(slugify(r.lib.name)) + '">' + esc(hsSay('inLedgerLib')) + '</a></p>' : '')
    + '</div>';
}
/* Who makes it, on the card above What it's made of: nothing when no kept
   producer reaches the drink. */
function hsWhoMakesHTML(h, id){
  const rows = hsWhoMakesRows(h, id);
  if(!rows.length) return '';
  const cards = typeof producerCards === 'function' ? producerCards().filter(function(d){ return rows.some(function(r){ return d.ref && d.ref.id === r.id; }); }).length : 0;
  return '<section class="hs-group hs-whomakes" aria-labelledby="hs-whomakes-h"><h3 class="hs-h3" id="hs-whomakes-h">' + esc(hsSay('whoMakes')) + '</h3>'
    + '<ul class="hs-comps hs-prods">' + rows.map(function(r){
      return '<li data-producer="' + esc(r.id) + '"><details class="hs-more hs-comp"' + hsOpenAttr(id, 'p:' + r.id) + '><summary>' + esc(r.who) + '</summary>' + hsProducerBodyHTML(r) + '</details></li>';
    }).join('') + '</ul>'
    + '<div class="hs-btns">'
    + (cards ? '<button class="btn btn-brass" data-act="hs-prod-cards" data-id="' + esc(id) + '">' + esc(hsSay('flashProducers')) + '</button>' : '')
    + '<button class="btn btn-ghost" data-act="hs-producers">' + esc(hsSay('allProducers')) + '</button></div>'
    + '</section>';
}

/* ---- the card (1.3) -------------------------------------------------------------- */
function hsBarRow(id){ return (progress.bar || []).find(function(b){ return b.id === id; }) || null; }
function hsCardHTML(h, id){
  const st = hsState();
  const item = (h.cocktails || []).find(function(c){ return c && c.id === id; }) || null;
  const row = hsBarRow(id);
  if(!item && !row) return '';
  const src = item || Object.assign({ kind: 'cocktail' }, row);
  const ticketRow = row || { name: src.name, spec: src.spec || [], method: src.method || '', glass: src.glass || '', garnish: src.garnish || '', note: src.note || '' };
  /* the ticket as drawn: an empty glass, method or garnish says so in words
     rather than a dash, and nothing is printed twice beneath it */
  const blankWord = function(v){ const t = hsPlain(v); return t && t !== '\u2014' ? t : hsSay('notPrinted'); };
  const ticketShown = Object.assign({}, ticketRow, { spec: ticketRow.spec || [], method: blankWord(ticketRow.method), glass: blankWord(ticketRow.glass), garnish: blankWord(ticketRow.garnish) });
  const name = hsPlain(src.name);
  /* the position and the way on come from the rows on screen; a drink the
     chosen shift or search hides (a deep link, an Offer next, a Poured with)
     counts over the whole menu instead, and the card says so */
  const nav = hsVisible(h);
  let at = nav.findIndex(function(r){ return r.id === id; });
  const offList = at < 0;
  const navList = offList ? hsRows(h, '') : nav;
  if(offList) at = navList.findIndex(function(r){ return r.id === id; });
  const offMeal = offList ? hsMealGet(h) : '';
  const here = navList[at] || { section: hsPlain(src.section) || hsSay('yourOwn') };
  const prevRow = at > 0 ? navList[at - 1] : null;
  const nextRow = at >= 0 && at < navList.length - 1 ? navList[at + 1] : null;
  const inSec = navList.filter(function(r){ return r.section === here.section; });
  const position = hsFold(st.q || '').trim() && !offList
    ? hsSay('found', { i: at + 1, n: navList.length })
    : hsSay('position', { i: inSec.findIndex(function(r){ return r.id === id; }) + 1, n: inSec.length, section: here.section });
  const jump = st.jump === 'card'; if(jump){ st.jump = null; st.scrollCard = true; st.kept = { card: id, open: {} }; }
  const price = item ? hsPriceLine(item, h) : hsPlain(row.price);
  const lines = item ? hsLinesShown(item) : { s10: '', s20: '', s45: '', guest: '', guestShown: false };
  const say = item ? hsKeptText(item.say) : '';
  const ups = item ? hsUpsells(h, item) : [];
  const notes = item ? hsNotesFor(item) : { about: null, coaching: [], more: [], earlier: [] };
  const parts = item ? hsPartsShown(item) : [];
  const lu = item ? hsLineupFor(h, id) : { asks: [], disputes: [], mixUps: [], terms: [], scenarios: [], tastings: [] };
  const offerBtn = function(c, cls){
    const p = hsPriceLine(c, h);
    return '<button class="' + cls + '" data-act="hs-open" data-id="' + esc(c.id) + '">' + esc(hsPlain(c.name)) + (p ? ' ' + esc(p) : '') + '</button>';
  };
  let out = '<article class="hs hs-card col-sm" aria-labelledby="hs-name">';
  /* 1. the way back, the position, and Next */
  /* the one Back above the screen takes the card back to its list (the
     consolidation): no second way back here, only the position and Next */
  out += '<div class="hs-cardnav">'
    + '<span class="hs-pos">' + esc(position) + '</span>'
    + (nextRow ? '<button class="btn btn-ghost" data-act="hs-next">' + esc(hsSay('nextOnly')) + '</button>' : '') + '</div>'
    + (offList ? '<div class="hs-soft">' + esc(offMeal && !hsFold(st.q || '').trim() ? hsSay('offShift', { meal: offMeal }) : hsSay('offList')) + '</div>' : '');
  /* 2 and 3. the eyebrow, the name and the price */
  out += '<div class="eyebrow">' + esc(here.section) + '</div>'
    + '<div class="hs-namerow"><h2 class="hs-name" id="hs-name" tabindex="-1"' + (jump ? ' data-open="1"' : '') + '>' + esc(name) + '</h2>'
    + (price ? '<span class="hs-price">' + esc(price) + '</span>' : '') + '</div>'
    + (price && h.menusReadOn ? '<div class="hs-soft">' + esc(hsSay('asPrinted', { date: hsDate(h.menusReadOn) })) + '</div>' : '');
  /* 4. Say it */
  if(say) out += '<div class="hs-block"><div class="eyebrow">' + esc(hsSay('say')) + '</div><p class="hs-say">' + esc(say) + '</p></div>';
  /* 5. In ten seconds, and 5a, what to offer next */
  if(lines.s10) out += '<div class="hs-block"><div class="eyebrow">' + esc(hsSay('ten')) + '</div><p class="hs-ten">' + esc(lines.s10) + '</p></div>';
  /* each name keeps its comma: the line never strands one on its own */
  if(ups.length) out += '<p class="hs-offer">' + esc(hsSay('offerLine')) + ups.map(function(c, i){
    return '<span class="hs-offer-item">' + offerBtn(c, 'hs-inline') + (i < ups.length - 1 ? ',' : '') + '</span>';
  }).join(' ') + '</p>';
  /* 6. the two longer lines */
  if(lines.s20 || lines.s45){
    out += '<div class="hs-toggles">'
      + (lines.s20 ? '<button class="btn btn-ghost" aria-expanded="' + (st.l20 ? 'true' : 'false') + '" data-act="hs-toggle" data-l="s20">' + esc(hsSay(st.l20 ? 'twentyHide' : 'twenty')) + '</button>' : '')
      + (lines.s45 ? '<button class="btn btn-ghost" aria-expanded="' + (st.l45 ? 'true' : 'false') + '" data-act="hs-toggle" data-l="s45">' + esc(hsSay(st.l45 ? 'fortyFiveHide' : 'fortyFive')) + '</button>' : '')
      + '</div>'
      + (st.l20 && lines.s20 ? '<p class="hs-line">' + esc(lines.s20) + '</p>' : '')
      + (st.l45 && lines.s45 ? '<p class="hs-line">' + esc(lines.s45) + '</p>' : '');
  }
  if(lines.guestShown) out += '<p class="hs-line">' + esc(lines.guest) + '</p>';
  /* 7. About it */
  if(notes.about) out += '<section class="hs-group"><h3 class="hs-h3">' + esc(hsSay('about')) + '</h3><div class="hs-read">' + hsParas(notes.about.a) + '</div></section>';
  /* 8. the build, what to offer next, what it is poured with */
  out += '<section class="hs-group"><h3 class="hs-h3">' + esc(hsSay('build')) + '</h3>'
    + (typeof ticketHTML === 'function' ? '<div class="hs-ticket">' + ticketHTML(ticketShown) + '</div>'
      : '<ul class="hs-list">' + [['Glass', ticketShown.glass], ['Method', ticketShown.method], ['Garnish', ticketShown.garnish]].map(function(p){
        return '<li>' + esc(p[0]) + ': ' + esc(p[1]) + '</li>';
      }).join('') + '</ul>');
  if(ups.length) out += '<div class="eyebrow">' + esc(hsSay('offerNext')) + '</div><div class="hs-stack">' + ups.map(function(c){ return offerBtn(c, 'btn btn-ghost hs-left'); }).join('') + '</div>';
  const withDishes = item ? hsPouredWith(h, item) : [];
  if(withDishes.length) out += '<div class="eyebrow">' + esc(hsSay('pouredWith')) + '</div><ul class="hs-list">'
    + withDishes.map(function(d){ return '<li>' + hsRoomLink('table', hsRoomHref('table', d.id, h), d.name) + '</li>'; }).join('') + '</ul>';
  const pours = lu.tastings.filter(function(t){ return t.as === 'pour'; });
  if(pours.length) out += '<div class="eyebrow">' + esc(hsSay('pouredOn')) + '</div><ul class="hs-list">'
    + pours.map(function(t){ return '<li>' + esc(t.tasting.name) + (t.course.label ? ', ' + esc(t.course.label) : '') + '</li>'; }).join('') + '</ul>';
  out += '</section>';
  /* 8a. who makes it, what it is made of, and what to compare it with */
  if(item) out += hsWhoMakesHTML(h, id) + hsMadeOfHTML(h, id) + hsCompareHTML(h, item);
  /* 9. the five parts */
  if(parts.length) out += '<section class="hs-group"><h3 class="hs-h3">' + esc(hsSay('parts')) + '</h3><dl class="hs-dl">'
    + parts.map(function(p){ return '<dt>' + esc(p[0]) + '</dt><dd>' + esc(p[1]) + '</dd>'; }).join('') + '</dl></section>';
  /* 10. On the floor */
  const floor = [];
  notes.coaching.forEach(function(c, i){
    floor.push('<details class="hs-more"' + (i === 0 ? ' open' : '') + '><summary>' + esc(c.q) + '</summary><div class="hs-read">' + hsParas(c.note.a) + '</div></details>');
  });
  if(lu.asks.length) floor.push('<div class="eyebrow">' + esc(hsSay('confirm')) + '</div><ul class="hs-list">'
    + lu.asks.map(function(a){ return '<li>' + esc(a.question) + (a.askWhom ? ' <span class="hs-soft">(ask the ' + esc(a.askWhom) + ')</span>' : '') + '</li>'; }).join('') + '</ul>');
  if(lu.disputes.length) floor.push('<div class="eyebrow">' + esc(hsSay('disagree')) + '</div><ul class="hs-list">'
    + lu.disputes.map(function(d){
      const side = function(x){ return x ? esc(x.text) + ' <span class="hs-soft">(' + esc([x.source, x.date].filter(Boolean).join(', ')) + ')</span>' : ''; };
      return '<li>' + esc(d.field || '') + ': ' + side(d.a) + ', or ' + side(d.b) + '</li>';
    }).join('') + '</ul>');
  const mixes = lu.mixUps.filter(function(m){ return hsKeptText(m.difference); });
  if(mixes.length) floor.push('<div class="eyebrow">' + esc(hsSay('mixUp')) + '</div><ul class="hs-list">'
    + mixes.map(function(m){
      const otherId = m.aId === id ? m.bId : m.aId;
      const other = hsFind(h, otherId);
      if(!other) return '';
      const kind = hsKindOf(otherId);
      const link = kind === 'cocktail' ? '<button class="hs-inline" data-act="hs-open" data-id="' + esc(otherId) + '">' + esc(other.name) + '</button>'
        : hsRoomLink(kind === 'wine' ? 'codex' : 'table', hsRoomHref(kind === 'wine' ? 'codex' : 'table', otherId, h), other.name);
      return '<li>' + link + '<br>' + esc(hsKeptText(m.difference)) + '</li>';
    }).join('') + '</ul>');
  if(notes.more.length) floor.push('<details class="hs-more"><summary>' + esc(hsSay('more')) + ' (' + notes.more.length + ')</summary>'
    + notes.more.map(function(n){ return '<div class="hs-read"><p class="hs-strong">' + esc(n.q) + '</p>' + hsParas(n.a) + '</div>'; }).join('') + '</details>');
  if(notes.earlier.length) floor.push('<details class="hs-more"><summary>' + esc(hsSay('earlier')) + ' (' + notes.earlier.length + ')</summary>'
    + notes.earlier.map(function(n){ return '<div class="hs-read"><p class="hs-strong">' + esc(n.q) + '</p>' + hsParas(n.a) + '</div>'; }).join('') + '</details>');
  if(floor.length) out += '<section class="hs-group"><h3 class="hs-h3">' + esc(hsSay('floor')) + '</h3>' + floor.join('') + '</section>';
  /* 11. the service note, under its fixed eyebrow */
  const note = item ? hsPlain(item.serviceNote) : '';
  out += '<section class="hs-group"><div class="eyebrow">' + esc(hsSay('eyebrow')) + '</div><p class="hs-read">' + esc(note || hsSay('noteNone')) + '</p></section>';
  /* 11a. Watch: the house's videos for the drink, each a link out */
  if(item) out += hsWatchHTML(h, id);
  /* 12. In this app, and the other rooms */
  if(item) out += hsHereHTML(h, item, ticketRow);
  const roomLinks = [];
  const tl = hsRoomListHref('table'), cl = hsRoomListHref('codex');
  if((h.dishes || []).length) roomLinks.push(hsRoomLink('table', tl, 'The dishes in the World Table'));
  if((h.wines || []).length) roomLinks.push(hsRoomLink('codex', cl, 'The wines in the Codex'));
  if(roomLinks.length && (tl || cl)) out += '<section class="hs-group" aria-label="' + esc(hsSay('rooms')) + '"><h3 class="hs-h3">' + esc(hsSay('rooms')) + '</h3><ul class="hs-list">'
    + roomLinks.map(function(l){ return '<li>' + l + '</li>'; }).join('') + '</ul></section>';
  /* 13. the three doors */
  if(item){
    const sayable = typeof houseSayItems === 'function' && houseSayItems().some(function(i){ return i.id === id; });
    const secRows = hsRows(h, '').filter(function(r){ return !r.own && r.section === here.section; });
    const drillable = secRows.filter(function(r){ const b = hsBarRow(r.id); return b && typeof isHouseCard === 'function' && isHouseCard(b); }).length;
    const small = drillable < 4;
    out += '<div class="hs-btns">'
      + (hsItemCards(h, { itemIds: [id] }).length ? '<button class="btn btn-brass" data-act="hs-cards" data-id="' + esc(id) + '">' + esc(hsSay('cardsThis')) + '</button>' : '')
      + (sayable ? '<button class="btn btn-ghost" data-act="hs-say" data-id="' + esc(id) + '">' + esc(hsSay('sayBack')) + '</button>' : '')
      + (small ? '<button class="btn btn-ghost" data-act="hs-drill">' + esc(hsSay('drillWhole')) + '</button>'
               : '<button class="btn btn-ghost" data-act="hs-drill" data-s="' + esc(here.section) + '">' + esc(hsSay('drillSection')) + '</button>')
      + '</div>'
      + (small ? '<div class="hs-soft">' + esc(hsSay('tooSmall', { section: here.section })) + '</div>' : '');
    /* 14. her unkept lines, said in one line */
    if(hsAnyMark(item, 'maitre')) out += '<div class="hs-soft">' + esc(hsSay('hers')) + '</div>';
  }
  /* 15. Edit, then the named neighbours */
  out += '<div class="hs-foot"><button class="btn btn-ghost" data-act="hs-edit" data-id="' + esc(id) + '">' + esc(hsSay('edit')) + '</button>'
    + (prevRow ? '<button class="btn btn-ghost hs-left" data-act="hs-prev">' + esc(hsSay('prev', { name: prevRow.name })) + '</button>' : '')
    + (nextRow ? '<button class="btn btn-ghost hs-left" data-act="hs-next">' + esc(hsSay('next', { name: nextRow.name })) + '</button>' : '')
    + '</div>';
  out += '</article>';
  return out;
}

/* ---- the deck that stood in the Menu tab ------------------------------------------
   Gone with the consolidation: the house's cards are the Flashcards tab's
   decks (js/ui-nav.js: menu, a section, my weak ones, one drink), graded
   through gradeCardKey under the same keys as before. */

/* ---- the address of an open card, and the back gesture (1.7) --------------------- */
/* One user action, one entry: where the app's history model runs
   (js/ui-nav.js), the render that follows writes the card's entry with its
   depth, so nothing is pushed here; elsewhere the card pushes its own. */
function hsPush(hash){
  if(typeof navOwnsHistory === 'function' && navOwnsHistory()) return true;
  try { if(typeof history !== 'undefined' && history && typeof history.pushState === 'function'){ history.pushState(null, '', hash); return true; } } catch (e) {}
  return false;
}
function hsReplace(hash){
  if(typeof navOwnsHistory === 'function' && navOwnsHistory()) return true;
  try { if(typeof history !== 'undefined' && history && typeof history.replaceState === 'function'){ history.replaceState(history.state || null, '', hash); return true; } } catch (e) {}
  return false;
}
/* the address of the drink a study card shows, for currentRoute */
function houseStudyRouteSlug(){
  if(!houseStudyOn()) return null;
  const st = hsState();
  if(!st.open || st.deck) return null;
  const h = hsCurrent();
  const it = h && (h.cocktails || []).find(function(c){ return c && c.id === st.open; });
  const b = hsBarRow(st.open);
  const name = it ? it.name : b ? b.name : '';
  return name ? slugify(name) : null;
}
/* applyRoute's menu branch while the study view shows: a drink's address
   opens its study card, the menu's address closes it. Returns false when the
   study view is not what the Menu tab shows, so today's route runs. */
function houseStudyRoute(row){
  if(typeof houseHere !== 'function' || !houseHere() || hsState().editAll || !hsHouseHasDrinks()) return false;
  const st = hsState();
  state.menu.view = 'menu';
  st.deck = null;
  if(row && row.id){
    if(st.open !== row.id){ if(!st.open) st.from = row.id; st.open = row.id; st.jump = 'card'; st.l20 = false; st.l45 = false; }
  } else if(st.open){
    st.open = null; st.jump = 'back'; st.pushed = false;
  }
  return true;
}
/* #drink=<id>: the cross-room address, read once at boot */
var HS_WANT = null;
function houseStudyDeepLink(){
  try {
    if(typeof location === 'undefined' || !location) return false;
    const m = /^#drink=(.*)$/.exec(String(location.hash || ''));
    if(!m || !HS_ID_RE.test(m[1])) return false;
    HS_WANT = m[1];
    return houseStudyTryWant(false);
  } catch (e) { return false; }
}
/* the drink asked for, opened once the house holds it; dropped after the
   first sync of a house with drinks that does not */
function houseStudyTryWant(final){
  if(!HS_WANT) return false;
  const h = hsCurrent();
  const item = h && (h.cocktails || []).find(function(c){ return c && c.id === HS_WANT; });
  if(!item){ if(final && hsHouseHasDrinks()) HS_WANT = null; return false; }
  HS_WANT = null;
  const st = hsState();
  state.tab = 'menu';
  state.menu.view = 'menu';
  st.editAll = false; st.deck = null; st.open = item.id; st.from = item.id; st.jump = 'card'; st.pushed = false;
  /* the card takes the place of the entry the browser made for the link,
     at its depth: held until a wake, it is still that arrival, not a push */
  state.navForce = 'replace';
  hsReplace('#/menu/' + slugify(item.name));
  return true;
}
/* A drink's card opened from another screen (a producer's drinks on the
   Producers tab): the Menu tab's study view with the card open, one screen
   change, so the render's push makes its entry and Back returns. */
function houseStudyOpenFrom(id){
  const h = hsCurrent();
  const item = h && (h.cocktails || []).find(function(c){ return c && c.id === id; });
  if(!item || typeof state === 'undefined' || !state || !state.menu) return false;
  const st = hsState();
  state.tab = 'menu';
  state.menu.view = 'menu';
  st.editAll = false; st.deck = null; st.sec = ''; st.q = '';
  st.open = item.id; st.from = item.id; st.jump = 'card'; st.l20 = false; st.l45 = false; st.pushed = false;
  return true;
}
function houseStudyRetry(){
  if(typeof navTryWantSection === 'function') navTryWantSection(true);
  return houseStudyTryWant(true);
}

/* ---- the acts --------------------------------------------------------------------- */
function houseStudyAct(act, data){
  if(typeof captureLiveInputs === 'function') captureLiveInputs();
  const st = hsState();
  const h = hsCurrent();
  const ds = data || {};
  const scrollY = function(){ try { return typeof window !== 'undefined' && window && typeof window.scrollY === 'number' ? window.scrollY : 0; } catch (e) { return 0; } };
  const openRow = function(id, push){
    const it = h && (h.cocktails || []).find(function(c){ return c && c.id === id; });
    const b = hsBarRow(id);
    if(!it && !b) return false;
    /* the row that opened the card, kept apart from lastId, which Next and
       Previous move: Back focuses this one (design test 2) */
    if(!st.open){ st.y = scrollY(); st.from = id; }
    st.open = id; st.jump = 'card'; st.l20 = false; st.l45 = false; st.deck = null;
    if(push){ if(hsPush('#/menu/' + slugify(it ? it.name : b.name))) st.pushed = true; }
    else hsReplace('#/menu/' + slugify(it ? it.name : b.name));
    return true;
  };
  const step = function(dir){
    const nav = hsVisible(h);
    let i = nav.findIndex(function(r){ return r.id === st.open; });
    if(i < 0){ const all = hsRows(h, ''); i = all.findIndex(function(r){ return r.id === st.open; }); const r = all[i + dir]; return r ? openRow(r.id, false) : false; }
    const r = nav[i + dir];
    return r ? openRow(r.id, false) : false;
  };
  let done = true;
  if(act === 'hs-open'){ done = openRow(ds.id, !st.open); }
  else if(act === 'hs-back'){
    if(typeof navBack === 'function' && typeof navOwnsHistory === 'function' && navOwnsHistory()){ navBack(); return true; }
    if(st.pushed && typeof history !== 'undefined' && history && typeof history.back === 'function'){
      /* the entry hs-open pushed is taken back; the hashchange closes the card */
      st.pushed = false;
      try { history.back(); return true; } catch (e) {}
    }
    st.open = null; st.jump = 'back'; st.pushed = false;
    hsReplace('#/menu');
  }
  else if(act === 'hs-next') done = step(1);
  else if(act === 'hs-prev') done = step(-1);
  else if(act === 'hs-sec'){ st.sec = ds.s || ''; if(typeof say === 'function') say(hsShowingWords(h)); }
  else if(act === 'hs-clear'){ st.q = ''; if(typeof say === 'function') say(hsShowingWords(h)); }
  else if(act === 'hs-meal'){ hsMealSet(ds.m || ''); st.sec = ''; if(typeof say === 'function') say(hsShowingWords(h)); }
  else if(act === 'hs-toggle'){ if(ds.l === 's20') st.l20 = !st.l20; else if(ds.l === 's45') st.l45 = !st.l45; else done = false; }
  else if(act === 'hs-edit'){
    st.editAll = true; st.open = null; st.deck = null;
    state.menu.view = 'menu'; state.menu.open = ds.id || null; state.menu.pane = 'build';
  }
  else if(act === 'hs-editall'){
    st.editAll = !st.editAll; st.open = null; st.deck = null;
    if(!st.editAll) state.menu.open = null;
    state.menu.view = 'menu';
  }
  else if(act === 'hs-cards'){
    /* the Flashcards tab's deck: the whole menu, a section, the weak ones or
       one drink (js/ui-nav.js) */
    if(!st.open) st.y = scrollY();
    const id = ds.id ? 'drink:' + ds.id : ds.weak ? 'menu-weak' : ds.s ? 'menu:' + slugify(ds.s) : 'menu';
    done = typeof openDeck === 'function' ? openDeck(id) : false;
  }
  else if(act === 'hs-comp-cards'){
    /* the drink's components on the Flashcards tab's card screen, dealt at once (js/ui-nav.js) */
    if(!st.open) st.y = scrollY();
    done = typeof openDeck === 'function' && openDeck('item-components:' + ds.id) && typeof startDeckRun === 'function' ? startDeckRun('component') : false;
  }
  else if(act === 'hs-prod-cards'){
    /* the drink's producers on the Flashcards tab's card screen, dealt at once (js/ui-nav.js) */
    if(!st.open) st.y = scrollY();
    done = typeof openDeck === 'function' && openDeck('item-producers:' + ds.id) && typeof startDeckRun === 'function' ? startDeckRun('producer') : false;
  }
  else if(act === 'hs-producers'){
    /* the Producers tab, its house group at the top (js/ui-nav.js) */
    if(!st.open) st.y = scrollY();
    done = typeof openHouseProducers === 'function' ? openHouseProducers() : false;
  }
  else if(act === 'hs-say'){
    if(typeof houseDrillOpen === 'function' && houseDrillOpen('say')){ if(typeof houseSayChoose === 'function') houseSayChoose(ds.id); }
    else done = false;
  }
  else if(act === 'hs-guest'){
    if(typeof houseDrillOpen === 'function' && houseDrillOpen('role')) state.house.role = { kind: 'scenario', id: ds.id, text: '', grade: null, recorded: false };
    else done = false;
  }
  else if(act === 'hs-drill'){
    /* a Menu round over one section, or over the whole menu; the Quiz tab's
       own engine, with the section held in state.quiz.section */
    state.quiz.section = ds.s || null;
    const round = typeof buildRound === 'function' ? buildRound('mybar') : [];
    state.tab = 'quiz';
    if(round.length) Object.assign(state.quiz, { stage: 'run', mode: 'mybar', round: round, idx: 0, picked: null, score: 0, missedQ: [], replay: false, section: ds.s || null });
    else { state.quiz.section = null; state.quiz.stage = 'setup'; }
  }
  else done = false;
  if(typeof render === 'function') render();
  return done;
}

/* ---- after every paint: the search box, the scroll and the focus on Back ---------- */
function houseStudyAfterRender(){
  if(typeof document === 'undefined' || !document || typeof document.getElementById !== 'function') return;
  if(typeof state === 'undefined' || !state || !state.menu || state.tab !== 'menu') return;
  const st = hsState();
  /* a disclosure on the card opened or closed: kept against the card, so
     the next paint (Back from where its links lead) draws it as it was. The
     toggle event does not bubble, so the view listens in its capture phase,
     once for the life of the page. */
  const view = document.getElementById('view');
  if(view && !view.__hsKeep && typeof view.addEventListener === 'function'){
    view.__hsKeep = true;
    view.addEventListener('toggle', function(e){
      const d = e && e.target;
      if(!d || String(d.tagName || '').toUpperCase() !== 'DETAILS') return;
      if(typeof state === 'undefined' || !state || state.tab !== 'menu') return;
      const cur = hsState();
      const key = hsKeepKeyOf(d);
      if(cur.open && key) hsKeepOpen(cur.open, key, !!d.open);
    }, true);
  }
  const box = document.getElementById('hs-q');
  if(box && !box.__hs){
    box.__hs = true;
    box.addEventListener('input', function(e){
      st.q = e.target.value;
      const rows = document.getElementById('hs-rows');
      const h = hsCurrent();
      if(rows && h) rows.innerHTML = houseStudyRowsHTML();
      const live = document.getElementById('live');
      if(live && h) live.textContent = hsShowingWords(h);
    });
  }
  if(st.jump === 'back'){
    st.jump = null;
    const y = st.y || 0;
    const id = st.from || st.lastId;
    st.from = null;
    try { if(typeof window !== 'undefined' && window && typeof window.scrollTo === 'function') window.scrollTo(0, y); } catch (e) {}
    if(id){
      let row = null;
      try { row = document.querySelector('[data-act="hs-open"][data-id="' + String(id).replace(/[^a-z0-9-]/gi, '') + '"]'); } catch (e) {}
      if(row && row.focus) try { row.focus({ preventScroll: true }); } catch (e) {}
    }
  }
  /* a card just opened: its top in sight, the way back and Next included,
     clear of the suite's badge (scroll-margin-top in css/house-menu.css) */
  if(st.scrollCard){
    st.scrollCard = false;
    const card = document.querySelector('.hs-card, .hs-deck');
    if(card && card.scrollIntoView) try { card.scrollIntoView({ block: 'start' }); } catch (e) {}
  }
  if(st.open) st.lastId = st.open;
}

/* ---- the switch's other face, at the top of today's list ------------------------- */
function houseStudyEditBarHTML(){
  if(typeof houseHere !== 'function' || !houseHere() || !hsState().editAll || !hsHouseHasDrinks()) return '';
  return '<div class="row" style="padding:0 4px"><button class="chip hs-chip on" aria-pressed="true" data-act="hs-editall">' + esc(hsSay('editOn')) + '</button></div>';
}
