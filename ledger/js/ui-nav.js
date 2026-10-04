/* ---------------- THE FOUR TABS, BACK, AND THE HISTORY ----------------
   The consolidation of 4 October 2026 (WorldTable docs/consolidation-design.md,
   the Ledger's part): the same four tabs in all three apps, Home, Flashcards,
   Quizzes and Library, then a quiet More; Home is the four levels; a level's
   page opens on Today's study, My restaurant and a search; one deck picker,
   one list of quizzes, one shelf of reading; and a Back on every screen but
   Home that steps back exactly one screen.

   THE HISTORY MODEL, in one line: every screen change pushes one history
   entry, every change within a screen replaces it, popstate renders the
   entry, and Back calls history.back() when this app pushed the entry, else
   goes to the screen's logical parent with a replace.

   A screen is named by its KEY: the route without in-screen state (a flip,
   a chip, a search box, the next card, a section chosen on the study list).
   render() asks syncRoute to push when the key changed and to replace when
   it did not. Each entry carries its depth (`ootd`, the in-app depth), its
   key (`ootk`) and the key of the screen beneath it (`ootp`); the depth is
   mirrored to sessionStorage so a reload of the same address keeps it.

   Nothing here is stored in a record: the chosen level, the depth and the
   scroll are per-device conveniences, wrapped in try, never exported.

   Top level holds literals and function declarations only, so the checks
   can load this file in a sandbox with no document and no history. */

/* ---- the chosen level (design 2.4) ---------------------------------------
   One per device, the integer key 1 to 4. Absent, the first level not yet
   met, as the home has always marked. Choosing a level on Home sets it, and
   so does opening any level page or choosing one from the scope chip. */
var LEVEL_SLOT = 'oot-level-ledger-v1';
function levelSlotKey(){
  try { if(typeof OOT !== 'undefined' && OOT && OOT.profiles && typeof OOT.profiles.key === 'function') return OOT.profiles.key(LEVEL_SLOT); } catch (e) {}
  return LEVEL_SLOT;
}
function storedLevel(){
  try {
    if(typeof localStorage === 'undefined' || !localStorage) return null;
    const n = Number(localStorage.getItem(levelSlotKey()));
    return n >= 1 && n <= 4 ? n : null;
  } catch (e) { return null; }
}
function chosenLevel(){ return storedLevel() || firstUnmetLevel(); }
function setChosenLevel(n){
  n = Number(n);
  if(!(n >= 1 && n <= 4)) return;
  try { if(typeof localStorage !== 'undefined' && localStorage) localStorage.setItem(levelSlotKey(), String(n)); } catch (e) {}
}
/* the level Tonight's Session and Due today deal new cards from: the chosen
   level when the reader has chosen one, else the gate's own todayLevel (the
   lowest unmet level that still holds a card never seen), so a device that
   never chose deals exactly as before */
function dealLevel(){
  const s = storedLevel();
  if(s) return s;
  return typeof todayLevel === 'function' ? todayLevel() : firstUnmetLevel();
}

/* ---- the scope chip (design 2.4) ------------------------------------------ */
function navScope(){
  if(!state.scopeAll) state.scopeAll = { flashcards: false, quiz: false };
  return state.scopeAll;
}
/* the level a root is filtered to, or null for every level */
function scopeLevel(root){
  if(root === 'library') return Number(state.lib.level) || null;
  return navScope()[root] ? null : chosenLevel();
}
function scopeChipHTML(root){
  const lv = scopeLevel(root);
  const chosen = chosenLevel();
  const name = levelInfo(lv || chosen).name;
  let line;
  if(lv){
    line = '<button class="chip scope-name" data-act="scope-open" data-for="' + root + '" aria-expanded="' + (state.scopeOpen === root ? 'true' : 'false') + '"' + (state.scopeOpen === root ? ' aria-controls="scope-options-' + root + '"' : '') + ' aria-label="' + esc(name) + ', change level">' + esc(name) + '</button>'
      + '<span class="scope-dot" aria-hidden="true"> · </span>'
      + '<button class="chip" data-act="scope-all" data-for="' + root + '">show all levels</button>';
  } else {
    line = '<span class="scope-all">All levels</span><span class="scope-dot" aria-hidden="true"> · </span>'
      + '<button class="chip" data-act="scope-one" data-for="' + root + '">show ' + esc(name) + ' only</button>';
  }
  const list = state.scopeOpen === root ? '<div class="scope-list" id="scope-options-' + root + '" role="group" aria-label="Choose a level">' + LEVELS.map(function(l){
    const on = l.n === lv;
    return '<button class="chip' + (on ? ' on' : '') + '" data-act="scope-pick" data-for="' + root + '" data-n="' + l.n + '" aria-pressed="' + (on ? 'true' : 'false') + '">'
      + esc(l.name) + (l.n === chosen ? ' <span class="lv-here">Your level</span>' : '') + '</button>';
  }).join('') + '</div>' : '';
  return '<div class="scope" role="group" aria-label="Level"><div class="scope-row">' + line + '</div>' + list + '</div>';
}
/* Scope choices replace their own buttons. Keep keyboard focus on the
   surviving control in that same picker, never back at the whole page. */
function scopeFocusSelector(data){
  if(!data || ['flashcards','quiz','library'].indexOf(data.for) < 0) return null;
  return '[data-act="scope-' + (data.act === 'scope-all' ? 'one' : 'open') + '"][data-for="' + data.for + '"]';
}
function scopeAct(act, data){
  const root = data.for;
  if(act === 'scope-open'){ state.scopeOpen = state.scopeOpen === root ? '' : root; return; }
  state.scopeOpen = '';
  if(act === 'scope-pick'){
    const n = Number(data.n);
    setChosenLevel(n);
    if(root === 'library'){ state.lib.level = n; state.lib.open = null; }
    else navScope()[root] = false;
    if(state.fc.deckId) state.fc.level = state.fc.level ? n : state.fc.level;
    return;
  }
  const all = act === 'scope-all';
  if(root === 'library'){ state.lib.level = all ? null : chosenLevel(); state.lib.open = null; }
  else navScope()[root] = all;
}

/* ---- Due today: one function for the run, the row's line and the pill ----
   The cards due, then new cards to make the run up, up to twenty in a run
   and at most ten new, the way Tonight's Session already deals them
   (sessionDeckParts: the menu first, then the level book by book). The
   empty state is only for nothing due and nothing new. */
function dueToday(){
  const p = sessionDeckParts();
  const due = p.dueDeck.slice(0, 20);
  const fresh = p.newDeck.slice(0, Math.min(10, 20 - due.length));
  const deck = due.concat(fresh);
  const house = deck.filter(function(d){ return d.src === 'My Bar'; }).length;
  return { deck: deck, nDue: due.length, nNew: fresh.length, house: house, rest: deck.length - house, lv: dealLevel() };
}
function cardsWord(n){ return n === 1 ? 'card' : 'cards'; }
function dueTodayLine(t){
  t = t || dueToday();
  const L = levelInfo(t.lv).name;
  const sides = function(){
    if(t.house && t.rest) return ': ' + t.house + ' from the menu, ' + t.rest + ' at ' + L + '.';
    if(t.house) return ' from the menu.';
    return ' at ' + L + '.';
  };
  if(t.nDue && t.nNew) return t.nDue + ' due and ' + t.nNew + ' new' + (t.house && t.rest ? sides() : t.house ? ', from the menu.' : ', at ' + L + '.');
  if(t.nDue) return t.nDue + ' ' + cardsWord(t.nDue) + ' due' + sides();
  if(t.nNew) return t.nNew + ' new ' + cardsWord(t.nNew) + ' to start' + sides();
  return 'Nothing due today and nothing new at ' + L + '. Try the quick quiz.';
}
/* the run itself, pushed straight onto the card screen (one tap, answer 8) */
function startDueToday(){
  const t = dueToday();
  if(!t.deck.length) return startQuickQuiz();
  const fc = state.fc;
  state.tab = 'flashcards';
  Object.assign(fc, { stage: 'run', deckId: 'due', only: null, deckModes: null, mode: 'name2spec', deck: t.deck, idx: 0, right: 0, wrong: 0, missed: [] });
  prepCard();
  return true;
}

/* ---- the decks (design 4.7) ------------------------------------------------
   A deck is an id and a preset over state.fc; the deck screen is today's
   setup panel with the source chosen, and the card screen today's run. */
var DECK_BASE = { src: 'All', section: 'All', special: 'All', level: null, sub: null, tier: 'All', family: 'All', spirit: 'All', smart: false, only: null, deckModes: null };
var MENU_MODE_DECKS = { 'menu-line10': ['line10', 'The ten second line'], 'menu-line20': ['line20', 'The twenty second line'], 'menu-line45': ['line45', 'The forty five second line'], 'menu-parts': ['parts', 'The five parts'], 'menu-offer': ['upsell', 'What to offer next'] };
var SRC_DECKS = { 'shots': ['Shots', 'Shots'], 'zero-proof': ['Zero Proof', 'Zero Proof'], 'on-tap': ['On Tap', 'On Tap'], 'coffee': ['Coffee', 'Coffee & Tea'] };
var SPECIAL_DECKS = { 'everything': ['All', 'Every card'], 'trouble': ['trouble', 'Trouble cards'], 'unmastered': ['unmastered', 'Unmastered only'] };
/* the house's sections in menu order, each with its count of cards and a slug */
function houseSectionList(){
  if(typeof houseHere !== 'function' || !houseHere() || typeof houseStudySectionOf !== 'function') return [];
  const order = [], count = {};
  (progress.bar || []).forEach(function(b){
    const s = houseStudySectionOf(b.id);
    if(!s) return;
    if(!(s in count)){ count[s] = 0; order.push(s); }
    count[s]++;
  });
  /* the house's own order, not the list's */
  const h = typeof hsCurrent === 'function' ? hsCurrent() : null;
  if(h && Array.isArray(h.cocktails)){
    const rank = {};
    h.cocktails.forEach(function(c, i){ const s = (c && (typeof hsPlain === 'function' ? hsPlain(c.section) : c.section)) || 'The menu'; if(!(s in rank)) rank[s] = i; });
    order.sort(function(a, b){ return (a in rank ? rank[a] : 1e9) - (b in rank ? rank[b] : 1e9); });
  }
  return order.map(function(s){ return { name: s, slug: slugify(s), n: count[s] }; });
}
function sectionBySlug(slug){
  return houseSectionList().find(function(s){ return s.slug === slug; }) || null;
}
/* the house's lexicon as cards, from the shared engine, when it is here */
function menuWordCards(){
  try {
    const lib = typeof houseLibHere === 'function' ? houseLibHere() : null;
    const h = typeof hsCurrent === 'function' ? hsCurrent() : null;
    if(!lib || !lib.drills || typeof lib.drills.buildFlashcards !== 'function' || !h) return [];
    return lib.drills.buildFlashcards(h).filter(function(c){ return c && c.kind === 'term'; })
      .map(function(c){ return { src: 'Words', name: c.front, back: c.back, group: 'Words', ref: { id: c.itemId } }; });
  } catch (e) { return []; }
}
function wordCardByKey(key){
  return menuWordCards().find(function(d){ return cardKey(d) === key; }) || null;
}
/* a card key back to its card, of any engine here: the deck's own cards and
   the house's words */
function cardByKey(key){
  if(String(key).indexOf('Words · ') === 0) return wordCardByKey(key);
  return allDrinks().find(function(d){ return !d.draft && cardKey(d) === key; }) || null;
}
/* id to { name, preset } ; null for an id nothing answers */
function deckDef(id, lvArg){
  id = String(id || '');
  const lv = lvArg === undefined ? scopeLevel('flashcards') : lvArg;
  const L = lv ? levelInfo(lv).name : '';
  if(id === 'menu') return { name: 'The whole menu', preset: { src: 'My Bar' }, house: true };
  if(id === 'menu-weak') return { name: 'My weak ones', preset: { src: 'My Bar', special: 'trouble' }, house: true };
  if(id.indexOf('menu:') === 0){
    const s = sectionBySlug(id.slice(5));
    return s ? { name: s.name, preset: { src: 'My Bar', section: s.name }, house: true } : null;
  }
  if(MENU_MODE_DECKS[id]) return { name: MENU_MODE_DECKS[id][1], preset: { src: 'My Bar', deckModes: [MENU_MODE_DECKS[id][0]] }, house: true };
  if(id === 'menu-words'){
    const cards = menuWordCards();
    return cards.length ? { name: 'The menu’s words', preset: { only: cards, deckModes: ['word'] }, house: true } : null;
  }
  if(id.indexOf('drink:') === 0){
    const b = (progress.bar || []).find(function(x){ return x.id === id.slice(6); });
    if(!b) return null;
    const card = allDrinks().find(function(d){ return d.src === 'My Bar' && d.ref && d.ref.id === b.id; });
    return card ? { name: b.name, preset: { only: [card] }, house: true } : null;
  }
  if(id === 'cocktails') return { name: lv ? 'Cocktails at ' + L : 'Cocktails', preset: { src: 'Cocktails', level: lv } };
  if(id.indexOf('cocktails:') === 0){
    const t = Number(id.slice(10));
    if(!(t in TIER_NAMES)) return null;
    return { name: bookName(t), preset: { src: 'Cocktails', level: lv, tier: String(t) } };
  }
  if(SRC_DECKS[id]) return { name: SRC_DECKS[id][1], preset: { src: SRC_DECKS[id][0], level: lv } };
  if(SPECIAL_DECKS[id]) return { name: SPECIAL_DECKS[id][1], preset: { special: SPECIAL_DECKS[id][0] } };
  if(id === 'misses'){
    const keys = state.fc.missKeys || [];
    const cards = keys.map(cardByKey).filter(Boolean);
    return { name: 'The misses', preset: { only: cards } };
  }
  if(id === 'due') return { name: 'Due today', preset: {} };
  if(id === 'session') return { name: 'Tonight’s session', preset: {} };
  return null;
}
/* the pool a preset deals, through the deck's own fcPool, put back after */
function withFc(preset, fn){
  const fc = state.fc;
  const keys = Object.keys(DECK_BASE);
  const was = {};
  keys.forEach(function(k){ was[k] = fc[k]; });
  Object.assign(fc, DECK_BASE, preset || {});
  try { return fn(); } finally { keys.forEach(function(k){ fc[k] = was[k]; }); }
}
function deckModesFit(modes){
  return FC_MODES.filter(function(row){ return !modes || modes.indexOf(row[0]) >= 0; });
}
function deckStats(def){
  return withFc(def.preset, function(){
    const modes = deckModesFit(state.fc.deckModes);
    const pool = fcPool().filter(function(d){ return modes.some(function(row){ return !row[3] || row[3](d); }); });
    const learnt = pool.filter(function(d){ return isMastered(cardKey(d)); }).length;
    return { n: pool.length, learnt: learnt };
  });
}
function deckLine(st){ return st.n + ' ' + cardsWord(st.n) + ' · ' + st.learnt + ' learnt'; }
/* a deck chosen: its screen, with the preset put on state.fc */
function applyDeck(id){
  const def = deckDef(id);
  if(!def) return false;
  const fc = state.fc;
  if(id === 'misses') def.preset.only = def.preset.only || [];
  Object.assign(fc, DECK_BASE, def.preset, { stage: 'setup', deckId: id });
  state.tab = 'flashcards';
  return true;
}
function openDeck(id){ return applyDeck(id); }
/* the cards of a list of keys, dealt at once on the card screen */
function startMisses(keys){
  const fc = state.fc;
  fc.missKeys = keys.slice();
  const cards = keys.map(cardByKey).filter(Boolean);
  if(!cards.length) return false;
  applyDeck('misses');
  return startDeckRun();
}
/* Start on a deck screen: the first mode the deck can ask, as the setup's
   brass button does */
function startDeckRun(mode){
  const fc = state.fc;
  const modes = deckModesFit(fc.deckModes);
  const pool0 = fcPool();
  const row = mode ? FC_MODES.find(function(x){ return x[0] === mode; }) : modes.find(function(r){ return !r[3] || pool0.some(r[3]); });
  if(!row) return false;
  const pool = pool0.filter(row[3] || function(){ return true; });
  if(!pool.length) return false;
  const deck = fc.smart ? pool.slice().sort(function(a, b){ return weakScore(cardKey(b)) - weakScore(cardKey(a)); }) : shuffle(pool);
  Object.assign(fc, { stage: 'run', mode: row[0], deck: deck, idx: 0, right: 0, wrong: 0, missed: [] });
  prepCard();
  return true;
}
function deckNameNow(){
  const fc = state.fc;
  if(fc.deckId === 'due') return 'Due today';
  if(fc.deckId === 'session') return 'Tonight’s session';
  const def = fc.deckId ? deckDef(fc.deckId, fc.level || null) : null;
  return def ? def.name : 'Your deck';
}

/* ---- the Flashcards root (design 2.6, 4.7) -------------------------------- */
function rowDoor(attrs, name, line){
  return '<button class="door" ' + attrs + '><span class="door-name">' + esc(name) + '</span>'
    + (line ? '<span class="door-line">' + esc(line) + '</span>' : '') + '</button>';
}
function deckRow(id, nameOverride, lineOverride){
  const def = deckDef(id);
  if(!def) return '';
  const st = deckStats(def);
  if(!st.n && id.indexOf('menu') === 0) return '';
  return rowDoor('data-act="deck" data-deck="' + esc(id) + '"', nameOverride || def.name, lineOverride || deckLine(st));
}
function rowsNav(label, rows){
  const inner = rows.filter(Boolean).join('');
  return inner ? '<nav class="quiet rows" aria-label="' + esc(label) + '">' + inner + '</nav>' : '';
}
function houseHasMenu(){
  return typeof houseHere === 'function' && !!houseHere() && !!(typeof hsCurrent === 'function' && hsCurrent());
}
function fcPickHTML(){
  const lv = scopeLevel('flashcards');
  const t = dueToday();
  const line = dueTodayLine(t);
  const due = '<section class="panel p4 col-sm" aria-labelledby="fc-due-h"><h3 class="sub-head" id="fc-due-h">Due today</h3>'
    + '<p class="door-line">' + esc(line) + '</p>'
    + (t.deck.length ? '<div class="row"><button class="btn btn-brass" data-act="fc-due">Start today’s cards</button></div>' : '')
    + '</section>';
  /* My restaurant: the whole menu, the sections, the weak ones, the house's other card kinds */
  let house;
  if(houseHasMenu() && menuCardCount()){
    const secs = houseSectionList();
    house = rowsNav('My restaurant', [deckRow('menu')]
      .concat(secs.length > 1 ? secs.map(function(s){ return deckRow('menu:' + s.slug); }) : [])
      .concat([deckRow('menu-weak'), deckRow('menu-line10'), deckRow('menu-line20'), deckRow('menu-line45'), deckRow('menu-parts'), deckRow('menu-offer')]));
  } else if(menuCardCount()){
    house = rowsNav('My restaurant', [deckRow('menu'), deckRow('menu-weak')]);
  } else {
    house = '<p class="door-line">No restaurant on this device yet. Set one up from a level page.</p>';
  }
  /* the level's subjects, or every level's */
  const L = lv ? levelInfo(lv).name : 'Every level';
  const books = levelBooks(lv || 0).map(function(b){
    const def = deckDef('cocktails:' + b.t);
    const st = deckStats(def);
    return rowDoor('data-act="deck" data-deck="cocktails:' + b.t + '"', b.name, b.n + ' drink' + (b.n === 1 ? '' : 's') + (lv ? ' at ' + L : '') + ' · ' + st.learnt + ' learnt');
  });
  const level = rowsNav(L, [deckRow('cocktails')].concat(books, [deckRow('shots'), deckRow('zero-proof'), deckRow('on-tap'), deckRow('coffee')]));
  const words = deckDef('menu-words') ? rowsNav('Words', [deckRow('menu-words')]) : '';
  const ref = rowsNav('Reference cards', [deckRow('everything'), deckRow('trouble'), deckRow('unmastered'),
    rowDoor('data-act="fc-board"', 'The mastery board', 'Every card and its record, by name.')]);
  return '<div class="col fc-pick">'
    + '<h2 class="lv-title" tabindex="-1">Flashcards</h2>'
    + scopeChipHTML('flashcards')
    + due
    + '<section class="col-sm" aria-labelledby="fc-house-h"><h3 class="sub-head" id="fc-house-h">My restaurant</h3>' + house + '</section>'
    + '<section class="col-sm" aria-labelledby="fc-level-h"><h3 class="sub-head" id="fc-level-h">' + esc(L) + '</h3>' + level + '</section>'
    + (words ? '<section class="col-sm" aria-labelledby="fc-words-h"><h3 class="sub-head" id="fc-words-h">Words</h3>' + words + '</section>' : '')
    + '<section class="col-sm" aria-labelledby="fc-ref-h"><h3 class="sub-head" id="fc-ref-h">Reference cards</h3>' + ref + '</section>'
    + '</div>';
}

/* ---- the quick quiz (design 4.8) ----------------------------------------
   Ten questions: five from the menu and five from the chosen level, each
   side topped up from the other. Built from the round builders that already
   exist; recorded as each builder records, and one progress.quizzes row
   with mode 'quick'. */
function quickHouseQuestions(){
  let qs = [];
  if(menuCardCount() >= 4){ try { qs = buildRound('mybar'); } catch (e) { qs = []; } }
  if(typeof housePairReady === 'function' && housePairReady().length && typeof houseQuizRound === 'function'){
    try { qs = qs.concat(houseQuizRound()); } catch (e) {}
  }
  return shuffle(qs);
}
function quickLevelQuestions(n, want){
  const out = [];
  const subs = LEVEL_SUBS.map(function(s){ return s.key; }).filter(function(sub){ return levelQuizSource(n, sub).length; });
  let guard = 0;
  while(out.length < want && subs.length && guard < 60){
    const sub = subs[guard % subs.length];
    const q = levelRound(n, sub, 1)[0];
    if(q && !out.some(function(x){ return x.prompt === q.prompt && x.answer === q.answer; })) out.push(q);
    guard++;
  }
  return out;
}
function buildQuickRound(){
  const n = chosenLevel();
  const house = quickHouseQuestions();
  const takeHouse = Math.min(5, house.length);
  const level = quickLevelQuestions(n, 10 - takeHouse);
  const fromHouse = house.slice(0, 10 - level.length);
  return shuffle(fromHouse.concat(level)).slice(0, 10);
}
function quickQuizLine(){
  const L = levelInfo(chosenLevel()).name;
  return menuCardCount() >= 4 || (typeof housePairReady === 'function' && housePairReady().length)
    ? 'Ten questions: five from the menu, five from ' + L + '.'
    : 'Ten questions from ' + L + '.';
}
function startRound(mode){
  const z = state.quiz;
  state.tab = 'quiz';
  z.section = null;
  z.mode = mode;
  const round = buildRound(mode);
  if(!round.length){ z.stage = 'setup'; return false; }
  Object.assign(z, { stage: 'run', round: round, idx: 0, picked: null, score: 0, missedQ: [], replay: false });
  return true;
}
function startQuickQuiz(){ return startRound('quick'); }

/* ---- the Quizzes root (design 2.6, 4.8) ---------------------------------- */
function quizRow(mode, name, line, extra){
  return rowDoor('data-act="quiz-go" data-m="' + esc(mode) + '"' + (extra || ''), name, line);
}
function quizBlurb(k){ const r = QUIZ_MODES.find(function(x){ return x[0] === k; }); return r ? r[2] : ''; }
function quizLabel(k){ const r = QUIZ_MODES.find(function(x){ return x[0] === k; }); return r ? r[1] : k; }
function quizRootHTML(){
  const lv = scopeLevel('quiz');
  const chosen = chosenLevel();
  const barN = menuCardCount();
  const houseRows = [];
  if(barN >= 4) houseRows.push(quizRow('mybar', 'Drill the menu', quizBlurb('mybar')));
  else if(barN || houseHasMenu()) houseRows.push('<div class="door door-off"><span class="door-name">Drill the menu</span><span class="door-line">Add four drinks with a spec to your menu and this round opens. ' + barN + ' of 4 so far.</span></div>');
  if(typeof housePairReady === 'function' && housePairReady().length) houseRows.push(quizRow('housepair', 'Pair the menu', quizBlurb('housepair')));
  if(typeof houseDrillsLib === 'function' && houseDrillsLib() && typeof houseSayItems === 'function'){
    const say = houseSayItems().length, role = houseRoleDeck().length;
    if(say) houseRows.push(rowDoor('data-act="hd-open" data-mode="say"', 'Say it back', 'Say a drink’s line aloud or type it, graded here against what you kept. ' + say + ' drinks.'));
    if(role) houseRows.push(rowDoor('data-act="hd-open" data-mode="role"', 'Guest at the table', 'A guest asks; answer as you would at the table, graded against what you kept.'));
  }
  if(barN || houseHasMenu()) houseRows.push(rowDoor('data-act="pr-go" data-v="rail"', 'The Ticket Rail', 'A rail of tickets: call the order you would make them in.'));
  const house = houseRows.length ? rowsNav('My restaurant', houseRows) : '<p class="door-line">No restaurant on this device yet. Set one up from a level page.</p>';
  const levelRows = function(n){
    return LEVEL_SUBS.filter(function(s){ return levelQuizSource(n, s.key).length >= 4; }).map(function(s){
      const m = 'level-' + n + '-' + s.key;
      return quizRow(m, levelModeLabel(m), 'Ten questions on ' + s.title + ' at ' + levelInfo(n).name + '.');
    });
  };
  const topics = ['mixed', 'service', 'ontap', 'wine', 'craft', 'tickets', 'dealer'].map(function(k){ return quizRow(k, quizLabel(k), quizBlurb(k)); });
  let levelBlock;
  if(lv){
    levelBlock = '<section class="col-sm" aria-labelledby="qz-level-h"><h3 class="sub-head" id="qz-level-h">' + esc(levelInfo(lv).name) + '</h3>'
      + rowsNav(levelInfo(lv).name, levelRows(lv).concat(topics)) + '</section>';
  } else {
    levelBlock = LEVELS.map(function(l){
      return '<section class="col-sm" aria-labelledby="qz-level-' + l.n + '"><h3 class="sub-head" id="qz-level-' + l.n + '">' + esc(l.name) + '</h3>' + rowsNav(l.name, levelRows(l.n)) + '</section>';
    }).join('') + '<section class="col-sm" aria-labelledby="qz-every-h"><h3 class="sub-head" id="qz-every-h">Every level</h3>' + rowsNav('Every level', topics) + '</section>';
  }
  const hands = rowsNav('Hands on', [
    rowDoor('data-act="pr-go" data-v="drills"', 'The drills', 'Timed and counted drills with a bottle, a tin and a jigger.'),
    rowDoor('data-act="pr-go" data-v="hold"', 'Hold the Round', 'Hold a round of tickets in your head, then call it back.'),
    rowDoor('data-act="pr-go" data-v="pour"', 'Free Pour', 'Pour to a count and measure what went in.'),
    rowDoor('data-act="pr-go" data-v="tasting"', 'The Tasting Room', 'A tasting scorecard for whatever is in the glass.'),
    rowDoor('data-act="pr-go" data-v="flights"', 'Flights', 'Guided tasting flights, side by side.'),
    rowDoor('data-act="pr-go" data-v="method"', 'How to Taste', 'The method behind every tasting note.'),
    rowDoor('data-act="go" data-tab="riffs"', 'Riffs', 'Pick a template, take a deal, build the drink in your head.')
  ]);
  const tl = levelInfo(chosen).name;
  const sitting = state.lt && !state.lt.done && state.lt.n === chosen;
  const test = '<section class="col-sm" aria-labelledby="qz-test-h"><h3 class="sub-head" id="qz-test-h">The ' + esc(tl) + ' test</h3>'
    + '<p class="door-line">Seventeen questions across the eight subsections of ' + esc(tl) + '. No clock. It ends on what got away, with the right answers.</p>'
    + '<button class="btn btn-brass leveltest" data-act="lt-start" data-n="' + chosen + '"' + (sitting ? ' data-resume="1"' : '') + '>' + (sitting ? 'Go on with the ' + esc(tl) + ' test' : 'The ' + esc(tl) + ' test') + '</button></section>';
  const hist = (progress.quizzes || []).slice(-5).reverse()
    .map(function(h){ return '<div class="hist-row"><span>' + esc(h.date) + (h.mode && h.mode !== 'mixed' ? ' · ' + esc(modeLabel(h.mode)) : '') + '</span><span class="font-tix brass2">' + h.score + '/' + (h.total || 10) + '</span></div>'; }).join('');
  return '<div class="col qz-root">'
    + '<h2 class="lv-title" tabindex="-1">Quizzes</h2>'
    + scopeChipHTML('quiz')
    + '<section class="panel p4 col-sm" aria-labelledby="qz-quick-h"><h3 class="sub-head" id="qz-quick-h">Quick quiz</h3>'
    + '<p class="door-line">' + esc(quickQuizLine()) + '</p>'
    + '<div class="row"><button class="btn btn-brass" data-act="quiz-go" data-m="quick">Start the quick quiz</button></div></section>'
    + '<section class="col-sm" aria-labelledby="qz-house-h"><h3 class="sub-head" id="qz-house-h">My restaurant</h3>' + house + '</section>'
    + levelBlock
    + '<section class="col-sm" aria-labelledby="qz-hands-h"><h3 class="sub-head" id="qz-hands-h">Hands on</h3>' + hands + '</section>'
    + test
    + (hist ? '<div class="panel p4"><div class="eyebrow mb2">Recent rounds</div>' + hist + '</div>' : '')
    + '</div>';
}

/* ---- a miss and where to study it (design 2.7) ---------------------------- */
function missCardKey(q){
  if(!q) return '';
  if(q.ckey) return q.ckey;
  if(q.ticket){
    if(q.ticketType === 'shot') return 'Shots · ' + q.ticket.name;
    if(q.ticketType === 'na') return 'Zero Proof · ' + q.ticket.name;
    if(q.ticketType === 'mybar') return 'My Bar · ' + q.ticket.name;
    return q.ticket.name;
  }
  if(q.factCard){
    const d = allDrinks().find(function(x){ return x.ref === q.factCard; });
    return d ? cardKey(d) : '';
  }
  /* a bank question is read, not carded; a pairing question names dishes */
  if(q.qkey || q.houseKind) return '';
  /* the drink a generated question names: the longest name it holds */
  const p = String(q.prompt || '');
  let best = '';
  (progress.bar || []).forEach(function(b){ if(!b.draft && b.name && p.indexOf(b.name) >= 0 && b.name.length > best.length) best = 'My Bar · ' + b.name; });
  if(best) return best;
  COCKTAILS.forEach(function(c){ if(p.indexOf(c.name) >= 0 && c.name.length > best.length) best = c.name; });
  return best;
}
/* the card's study place, as an address */
function studyHashOf(key){
  const d = cardByKey(key);
  if(!d) return '';
  if(d.src === 'Cocktails') return '#/library/' + slugify(d.name);
  if(d.src === 'My Bar') return '#/menu/' + slugify(d.name);
  if(d.src === 'Shots') return '#/shots/' + slugify(d.name);
  if(d.src === 'Zero Proof') return '#/na/' + slugify(d.name);
  if(d.src === 'On Tap' && d.ref && d.ref.dom) return '#/ontap/' + slugify(d.ref.dom);
  if(d.src === 'Coffee' && d.ref && d.ref.dom) return '#/coffee/' + slugify(d.ref.dom);
  return '';
}
/* a bank question's reading place: where its level reads it, else its topic's tab */
function readTargetOf(q){
  if(!q || !q.qkey) return null;
  try {
    const n = levelOf(q.qkey), sub = subOf(q.qkey);
    if(n && sub) return { n: n, sub: sub };
  } catch (e) {}
  const t = q.topic || '';
  return { tab: t === 'ontap' ? 'ontap' : t === 'craft' ? 'notes' : 'service' };
}
function missLinkHTML(q){
  const key = missCardKey(q);
  const href = key ? studyHashOf(key) : '';
  if(href) return '<button class="chip" data-act="hash" data-h="' + esc(href) + '">Study this card</button>';
  const t = readTargetOf(q);
  if(t && t.n) return '<button class="chip" data-act="read-at" data-n="' + t.n + '" data-s="' + esc(t.sub) + '">Read about it</button>';
  if(t && t.tab) return '<button class="chip" data-act="go" data-tab="' + t.tab + '">Read about it</button>';
  return '';
}
function missKeysOf(qs){
  const out = [];
  (qs || []).forEach(function(q){ const k = missCardKey(q); if(k && cardByKey(k) && out.indexOf(k) < 0) out.push(k); });
  return out;
}
function missesPanelHTML(qs){
  if(!qs.length) return '<div class="panel p4 col-sm" style="width:100%"><h3 class="sub-head">What you missed</h3><p class="small">Nothing missed.</p></div>';
  return '<div class="panel p4 col-sm" style="width:100%"><h3 class="sub-head">What you missed</h3>'
    + qs.map(function(q){
      return '<div class="small lh miss-row" style="border-bottom:1px solid var(--felt-3);padding:8px 0">'
        + '<span class="dim">' + esc(q.prompt) + (q.ticket ? ' [' + esc(q.ticket.name) + ']' : '') + (q.factCard ? ' [' + esc(q.factCard.name) + ']' : '') + '</span><br>'
        + '<span class="brass2">Answer: ' + esc(q.answer) + '</span>'
        + (q.explain ? '<br><span class="tiny dim">' + esc(q.explain) + '</span>' : '')
        + '<div class="row" style="margin-top:6px">' + missLinkHTML(q) + '</div>'
        + '</div>';
    }).join('') + '</div>';
}

/* ---- the level page's blocks (design 2.6, 4.6) --------------------------- */
function nextReading(n){
  const p = levelProgress(n);
  const s = p.subs.find(function(x){ return x.total > 0 && x.label !== LEVEL_MET; });
  if(!s) return null;
  return { sub: s.sub, title: readLabel(n, s.sub).replace(/^Read · /, '') };
}
function todayStudyHTML(n){
  const L = levelInfo(n).name;
  const t = dueToday();
  const nr = nextReading(n);
  const tn = todayDoor();
  return '<section class="lv-block" aria-labelledby="lv-today-h"><h3 class="sub-head" id="lv-today-h">Today’s study</h3>'
    + '<nav class="quiet rows today" aria-label="Today’s study">'
    + rowDoor('data-act="today" data-d="due"', 'Due today', dueTodayLine(t))
    + rowDoor('data-act="today" data-d="quick"', 'Quick quiz', quickQuizLine())
    + rowDoor('data-act="today" data-d="read" data-n="' + n + '"', 'Next reading', nr ? nr.title + ' · ' + L : 'Everything at ' + L + ' is read. The Library holds the rest.')
    + '<button class="door" data-act="door" data-d="today"><span class="door-name">Tonight’s session</span><span class="door-line">' + esc(tn.line) + '</span>' + (tn.sub ? '<span class="door-sub">' + esc(tn.sub) + '</span>' : '') + '</button>'
    + '</nav></section>';
}
function houseCountLine(){
  const h = typeof hsCurrent === 'function' ? hsCurrent() : null;
  if(!h) return '';
  const ids = (h.cocktails || []).map(function(c){ return c && c.id; }).filter(Boolean);
  const secs = houseSectionList().length || 1;
  const pr = typeof hsProgress === 'function' ? hsProgress(ids) : { studied: 0, again: 0 };
  const tail = !pr.studied ? 'Nothing studied yet.' : pr.again ? pr.studied + ' studied, ' + pr.again + ' to see again.' : pr.studied + ' studied.';
  return h.name + ': ' + ids.length + ' drink' + (ids.length === 1 ? '' : 's') + ' in ' + secs + ' section' + (secs === 1 ? '' : 's') + '. ' + tail;
}
function myRestaurantHTML(){
  const engine = typeof houseHere === 'function' && houseHere();
  const h = engine && typeof hsCurrent === 'function' ? hsCurrent() : null;
  const desk = typeof deskWaitingHTML === 'function' ? deskWaitingHTML('home') : '';
  const line = engine && typeof houseLineHTML === 'function' ? houseLineHTML() : '';
  const own = (progress.bar || []).length;
  const doors = (h || own) ? rowsNav('Study the menu', [
    rowDoor('data-act="lv-menu"', 'Study the whole menu', ''),
    rowDoor('data-act="deck" data-deck="menu"', 'Flashcards for the menu', ''),
    menuCardCount() >= 4 ? rowDoor('data-act="quiz-go" data-m="mybar"', 'Drill the menu', '') : ''
  ]) : '';
  const secs = h ? houseSectionList() : [];
  const chips = secs.length > 1 ? '<div class="row lv-secs" role="group" aria-label="The menu’s sections">' + secs.map(function(s){
    return '<button class="chip" data-act="lv-sec" data-s="' + esc(s.name) + '">' + esc(s.name) + ' ' + s.n + '</button>';
  }).join('') + '</div>' : '';
  const quiet = '<div class="row lv-quiet"><button class="chip" data-act="lv-desk">The Menu Desk</button></div>';
  return '<section class="lv-block" aria-labelledby="lv-house-h"><h3 class="sub-head" id="lv-house-h">My restaurant</h3>'
    + (h ? '' : '<p class="door-line">No restaurant on this device yet.</p>')
    + line
    + desk
    + (h ? '<p class="door-line">' + esc(houseCountLine()) + '</p>' : '')
    + doors + chips + quiet
    + '</section>';
}
function levelSearchHTML(){
  const q = (state.level && state.level.q) || '';
  return '<section class="lv-block" aria-labelledby="lv-search-h"><h3 class="sub-head" id="lv-search-h">Search</h3>'
    + '<label class="sr-only" for="lv-q">Search the ledger and the menu</label>'
    + '<input class="input" id="lv-q" type="search" autocomplete="off" placeholder="A drink, a spirit, a word" value="' + esc(q) + '">'
    + '<div id="lv-results" class="col-sm" aria-live="polite">' + levelSearchResultsHTML(q) + '</div></section>';
}
function levelSearchResultsHTML(q){
  q = String(q || '');
  if(!q.trim()) return '';
  const hits = searchResults(q);
  const menu = hits.filter(function(e){ return e.h.indexOf('#/menu/') === 0; }).slice(0, 8);
  const rest = hits.filter(function(e){ return e.h.indexOf('#/menu/') !== 0; }).slice(0, 8);
  if(!menu.length && !rest.length) return '<p class="door-line">Nothing found for "' + esc(q) + '".</p>';
  const group = function(title, list){
    return list.length ? '<div class="col-sm"><div class="eyebrow">' + title + '</div>' + list.map(function(e){
      return '<button class="search-row" data-act="hash" data-h="' + esc(e.h) + '"><span class="bold">' + esc(e.t) + '</span><span class="tiny dim push">' + esc(e.s) + '</span></button>';
    }).join('') + '</div>' : '';
  };
  return group('From the menu', menu) + group('In the ledger', rest);
}
function levelHoldsHTML(n){
  const info = levelInfo(n);
  const p = levelProgress(n);
  const subs = p.subs.map(function(s){
    const note = s.sub === 'cocktails' ? familyNoteFor(n) : '';
    return '<li class="subsection" data-sub="' + s.sub + '">'
      + '<h4 class="sub-head"><button class="sub-read" data-act="read-at" data-n="' + n + '" data-s="' + s.sub + '">' + esc(s.title) + '</button></h4>'
      + '<p class="sub-line">' + s.total + ' at this level · ' + esc(s.label) + '</p>'
      + (note ? '<p class="sub-note">' + esc(note) + '</p>' : '')
      + (s.sub === 'cocktails' ? levelBooksHTML(n) : '')
      + '</li>';
  }).join('');
  return '<details class="lv-holds"><summary><span class="when-closed">Show what ' + esc(info.name) + ' holds</span><span class="when-open">Hide what ' + esc(info.name) + ' holds</span></summary>'
    + '<ol class="subsections">' + subs + '</ol></details>';
}

/* ---- More, the record, the videos (design 2.5, 4.9) ---------------------- */
function moreHTML(){
  const group = function(id, title, rows){
    return '<section class="col-sm" aria-labelledby="more-' + id + '"><h3 class="sub-head" id="more-' + id + '">' + title + '</h3>' + rowsNav(title, rows) + '</section>';
  };
  const tool = function(v, name){ return rowDoor('data-act="go" data-tab="tools" data-v="' + v + '"', name, ''); };
  const maitre = (typeof maitreHere === 'function' && (maitreHere() || maitreLoadable())) ? 'data-act="maitre-open"' : 'data-act="go" data-tab="tools" data-v="maitre"';
  return '<div class="col mine">'
    + '<h2 class="lv-title" tabindex="-1">More</h2>'
    + group('record', 'Record and progress', [rowDoor('data-act="go" data-tab="record"', 'The record', 'Standing, mastery, the night’s numbers.')])
    + group('tools', 'Tools', [tool('batch', 'Batching'), tool('dates', 'Open Bottles'), tool('strength', 'Strength'), tool('cost', 'Pour Cost'), tool('spills', 'Spill Log'), tool('convert', 'Convert'),
        rowDoor('data-act="menu-stock"', 'The stock', '')])
    + group('data', 'Backup and data', [rowDoor('data-act="go" data-tab="tools" data-v="data"', 'My Data', 'Back up and restore everything this ledger has recorded.')])
    + group('maitre', 'The Maître d’', [rowDoor(maitre, 'The Maître d’', 'Optional, with a key of your own: she reads a menu with you.')])
    + group('settings', 'Settings', [rowDoor('data-act="go" data-tab="tools" data-v="video"', 'Video settings', '')])
    + '<section class="col-sm" aria-labelledby="more-about"><h3 class="sub-head" id="more-about">About</h3>'
    + '<p class="door-line">Your records live in this browser and go nowhere else, unless you bring in the Maître d’ with a key of your own, and then only the menu you hand her goes to Anthropic. Back them up now and then from My Data.</p>'
    + (typeof aboutLedgerHTML === 'function' ? aboutLedgerHTML() : '')
    + '</section></div>';
}
function renderRecord(){
  const at = state.mine.at;
  state.mine.at = null;
  return '<div class="col mine"><section id="record" aria-labelledby="record-head">'
    + '<h2 class="lv-title" id="record-head" tabindex="-1"' + (at === 'record' ? ' data-open="1"' : '') + '>The record</h2>'
    + recordHTML()
    + '</section></div>';
}
function renderVideos(){
  const h = typeof hsCurrent === 'function' ? hsCurrent() : null;
  const list = h && typeof hsVideosHTML === 'function' ? hsVideosHTML(h) : '';
  return '<div class="col">'
    + '<h2 class="lv-title" tabindex="-1">Videos</h2>'
    + '<p class="door-line">Each video opens in a new tab and needs a connection.</p>'
    + (list ? '<div class="hs">' + list + '</div>' : '<p class="door-line">No videos for this restaurant yet.</p>')
    + rowsNav('More films', [rowDoor('data-act="go" data-tab="coffee"', 'Coffee & Tea films', 'The pinned films on the Coffee & Tea shelf.')])
    + '</div>';
}
function videoSettingsScreenHTML(){
  return '<div class="col"><h2 class="lv-title" tabindex="-1">Video settings</h2>' + videoSettingsHTML() + '</div>';
}

/* ---- the history ----------------------------------------------------------- */
var NAV = { d: 0, key: null, href: '', booted: false, kind: '', from: '', openers: {} };
var NAV_SLOT = 'oot-nav-ledger-v1';
var SCROLL_SLOT = 'oot-scroll-ledger-v1';
function navHistory(){ return typeof history !== 'undefined' && history && typeof history.pushState === 'function' ? history : null; }
function navOwnsHistory(){ return NAV.booted && !!navHistory(); }
function navSession(){ try { return typeof sessionStorage !== 'undefined' ? sessionStorage : null; } catch (e) { return null; } }
function navMirror(){
  const s = navSession();
  try { if(s) s.setItem(NAV_SLOT, JSON.stringify({ d: NAV.d, href: String(location.href) })); } catch (e) {}
}
/* The depth of the entry the page opened on. The entry's own state comes
   first, since a browser keeps it across a reload. The sessionStorage mirror
   is read only when the browser says this load was a reload: a fresh
   arrival at the address the app last showed (a link from another room, the
   hub) is a new entry at depth 0, or Back would take it out of the app. */
function navWasReload(){
  try {
    if(typeof performance === 'undefined' || !performance || typeof performance.getEntriesByType !== 'function') return false;
    const e = performance.getEntriesByType('navigation')[0];
    return !!(e && e.type === 'reload');
  } catch (e) { return false; }
}
function navBootDepth(){
  const h = navHistory();
  const st = h ? h.state : null;
  if(st && typeof st.ootd === 'number') return st.ootd;
  if(!navWasReload()) return 0;
  const s = navSession();
  try {
    const m = s ? JSON.parse(s.getItem(NAV_SLOT) || 'null') : null;
    if(m && typeof m.d === 'number' && m.href === String(location.href)) return m.d;
  } catch (e) {}
  return 0;
}
function navScrollMap(){
  const s = navSession();
  try { return (s && JSON.parse(s.getItem(SCROLL_SLOT) || 'null')) || {}; } catch (e) { return {}; }
}
function navSaveScroll(href){
  const s = navSession();
  if(!s || typeof window === 'undefined') return;
  try {
    const m = navScrollMap();
    delete m[href];
    m[href] = window.scrollY || 0;
    const keys = Object.keys(m);
    while(keys.length > 60){ delete m[keys.shift()]; }
    s.setItem(SCROLL_SLOT, JSON.stringify(m));
  } catch (e) {}
}
function navRestoreScroll(){
  if(typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') return;
  const y = navScrollMap()[String(location.href)] || 0;
  window.requestAnimationFrame(function(){ window.requestAnimationFrame(function(){ try { window.scrollTo(0, y); } catch (e) {} }); });
}

/* The route of the screen showing: its address and its key. */
function routeNow(){
  const t = state.tab;
  let hash = '#/' + t, key = t;
  if(t === 'level'){
    const n = state.lt ? state.lt.n : (state.level.n || chosenLevel());
    const slug = slugify(levelInfo(n).name);
    hash += '/' + slug; key += '/' + slug;
    if(state.lt){ hash += '/test'; key += '/test'; }
  } else if(t === 'flashcards'){
    const fc = state.fc;
    if(fc.stage === 'pick' || !fc.stage){ if(navScope().flashcards) hash += '/all'; }
    else if(fc.stage === 'board'){ hash += '/board'; key += '/board'; }
    else {
      const seg = deckSegment(fc.deckId || 'everything');
      hash += '/' + seg; key += '/' + seg;
      if(fc.stage === 'run'){ hash += '/card'; key += '/card'; }
    }
  } else if(t === 'quiz'){
    const z = state.quiz;
    if(z.stage === 'house'){ const m = state.house && state.house.drill === 'role' ? 'guest' : 'say'; hash += '/' + m; key += '/' + m; }
    else if(z.stage === 'run' || z.stage === 'done'){ const m = z.mode || 'mixed'; hash += '/' + m; key += '/' + m; if(z.stage === 'done') hash += '/done'; }
    else if(navScope().quiz) hash += '/all';
  } else if(t === 'practice'){
    const v = state.practice.view || 'drills'; hash += '/' + v; key += '/' + v;
  } else if(t === 'tools'){
    const v = state.tools.view || 'batch'; hash += '/' + v; key += '/' + v;
  } else if(t === 'menu'){
    const v = state.menu.view || 'menu';
    const study = typeof houseStudyOn === 'function' && houseStudyOn();
    const slug = study && typeof houseStudyRouteSlug === 'function' ? houseStudyRouteSlug() : null;
    if(v !== 'menu'){ hash += '/view/' + v; key += '/view/' + v; }
    else if(slug){ hash += '/' + slug; key += '/card'; }
    else if(study && state.menu.study && state.menu.study.sec){ hash += '/section/' + slugify(state.menu.study.sec); }
    else if(NAV_WANT_SEC){ hash += '/section/' + NAV_WANT_SEC; }
    else if(!study && state.menu.open){
      const b = (progress.bar || []).find(function(x){ return x.id === state.menu.open; });
      if(b) hash += '/' + slugify(b.name);
    }
  } else {
    /* the reading tabs: currentRoute's own address; an opened item is its
       own screen on the lists, a section or note is in-screen on the rest */
    hash = legacyRoute();
    const parts = hash.replace(/^#\/?/, '').split('/');
    if(['library', 'shots', 'na', 'prep', 'producers'].indexOf(t) >= 0 && parts[1]) key = t + '/' + parts[1];
    if(t === 'library' && !parts[1] && !state.lib.level) hash += '/all';
    /* Print cards is a screen of its own, the Library beneath it */
    if(t === 'library' && state.lib.print){ hash = '#/library/print'; key = 'library/print'; }
  }
  return { hash: hash, key: key };
}
function deckSegment(id){
  if(id === 'misses') return 'misses/' + (state.fc.missKeys || []).map(encodeURIComponent).join(',');
  return id;
}
function screenKey(){ return routeNow().key; }

/* The section a cold #/menu/section/{slug} asked for before the house
   woke: held like house-study.js's HS_WANT, applied after each wake and
   repaint, dropped once a house with drinks lacks it or the menu is left. */
var NAV_WANT_SEC = null;
function navHouseUnanswered(){
  if(typeof houseHere !== 'function' || !houseHere()) return false;
  return !(typeof hsHouseHasDrinks === 'function' && hsHouseHasDrinks());
}
function navTryWantSection(final){
  if(!NAV_WANT_SEC) return false;
  const s = sectionBySlug(NAV_WANT_SEC);
  const st = typeof hsState === 'function' ? hsState() : null;
  if(s && st && state.tab === 'menu' && (state.menu.view || 'menu') === 'menu'){
    NAV_WANT_SEC = null;
    st.sec = s.name;
    state.navForce = 'replace';
    return true;
  }
  if(final && !navHouseUnanswered()) NAV_WANT_SEC = null;
  return false;
}

/* Push, replace or nothing. kind undefined: push when the key changed. */
function navSync(kind){
  const h = navHistory();
  if(NAV_WANT_SEC && (state.tab !== 'menu' || (state.menu.view || 'menu') !== 'menu' || (state.menu.study && state.menu.study.open))) NAV_WANT_SEC = null;
  const r = routeNow();
  NAV.kind = '';
  if(!h){ return r; }
  if(state.navForce){ kind = state.navForce; state.navForce = ''; }
  if(kind === undefined || kind === null || kind === '') kind = NAV.key !== null && r.key !== NAV.key ? 'push' : 'replace';
  if(kind === 'push' && NAV.key === null) kind = 'replace';
  if(kind === 'push'){
    const st = h.state || {};
    /* stepping onto the screen beneath this one: take this entry back, so
       closing what was opened never leaves a dead entry behind it */
    if(NAV.d > 0 && st.ootp === r.key){
      NAV.key = r.key;
      NAV.kind = 'back';
      try { h.back(); } catch (e) {}
      return r;
    }
    navSaveScroll(String(location.href));
    NAV.from = String(location.href);
    NAV.d += 1;
    try { h.pushState({ ootd: NAV.d, ootk: r.key, ootp: NAV.key }, '', r.hash); } catch (e) {}
    NAV.kind = 'push';
  } else {
    const st = h.state || {};
    if(location.hash !== r.hash || st.ootd !== NAV.d || st.ootk !== r.key){
      try { h.replaceState(Object.assign({}, st, { ootd: NAV.d, ootk: r.key }), '', r.hash); } catch (e) {}
    }
    NAV.kind = kind === 'none' ? 'none' : 'replace';
  }
  NAV.key = r.key;
  NAV.href = String(location.href);
  navMirror();
  return r;
}
/* After a push, the control that opened the screen is kept against the
   screen it was on; after a pop, it is the control to focus, when it is
   still there (render falls back to the view). */
function navOpener(sig){
  if(NAV.kind === 'push'){ if(NAV.from) NAV.openers[NAV.from] = sig; return null; }
  if(NAV.kind === 'none') return NAV.openers[String(location.href)] || null;
  return sig;
}
/* the first paint: the depth this entry carries, or the reload's, or 0 */
function navBoot(){
  NAV.d = navBootDepth();
  NAV.key = null;
  NAV.booted = true;
  try { if(typeof history !== 'undefined' && 'scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
}
/* the phone's back gesture and the Back control's history.back() land here */
function navPop(e){
  const st = e && e.state;
  if(st && typeof st.ootd === 'number'){ NAV.d = st.ootd; }
  else {
    /* an entry the browser made for a hash link: adopted, one deeper */
    NAV.d += 1;
    const h = navHistory();
    try { if(h) h.replaceState(Object.assign({}, st || {}, { ootd: NAV.d, ootp: NAV.key }), '', location.hash); } catch (err) {}
  }
  if(typeof search !== 'undefined' && search.open && typeof closeSearch === 'function') closeSearch();
  state.scopeOpen = '';
  if(!applyRoute()) state.tab = state.tab || 'home';
  NAV.key = null;
  render('none');
  navRestoreScroll();
}
/* a typed or linked address: rendered once, never twice for one pop */
function navHashChange(){
  if(String(location.href) === NAV.href) return;
  const h = navHistory();
  const st = h ? h.state : null;
  if(!(st && typeof st.ootd === 'number')){
    NAV.d += 1;
    try { if(h) h.replaceState(Object.assign({}, st || {}, { ootd: NAV.d, ootp: NAV.key }), '', location.hash); } catch (e) {}
  } else NAV.d = st.ootd;
  if(applyRoute()){ NAV.key = null; render('none'); }
}
/* Back: the entry this app pushed, else the screen's logical parent */
function navBack(){
  const h = navHistory();
  if(NAV.d > 0 && h){ try { h.back(); return true; } catch (e) {} }
  if(!applyParent()) return false;
  state.navForce = 'replace';
  render();
  return true;
}

/* ---- the logical parent of every screen (design 4.10) --------------------- */
function parentTab(){
  const t = state.tab;
  if(t === 'home') return null;
  if(t === 'level') return state.lt ? 'quiz' : 'home';
  if(t === 'menu'){
    const st = state.menu.study;
    const v = state.menu.view || 'menu';
    if(v !== 'menu') return 'menu';
    if(st && st.open && typeof houseStudyOn === 'function' && houseStudyOn()) return 'menu';
    return 'level';
  }
  if(t === 'flashcards'){
    const fc = state.fc;
    if(fc.stage === 'pick') return 'home';
    return 'flashcards';
  }
  if(t === 'quiz') return state.quiz.stage === 'setup' ? 'home' : 'quiz';
  if(t === 'practice' || t === 'riffs') return 'quiz';
  if(t === 'library') return state.lib.print || state.lib.open != null ? 'library' : 'home';
  if(t === 'shots') return state.shots.open != null ? 'shots' : 'library';
  if(t === 'na') return state.na.open != null ? 'na' : 'library';
  if(t === 'prep') return state.prep.open != null ? 'prep' : 'library';
  if(t === 'producers') return state.prod.open != null ? 'producers' : 'library';
  if(['families', 'notes', 'service', 'ontap', 'coffee', 'videos'].indexOf(t) >= 0) return 'library';
  if(t === 'mine') return 'home';
  if(t === 'record' || t === 'tools') return 'mine';
  return 'home';
}
function applyParent(){
  const t = state.tab;
  const p = parentTab();
  if(!p) return false;
  if(t === 'level' && state.lt){ state.tab = 'quiz'; state.quiz.stage = 'setup'; return true; }
  if(t === 'menu'){
    const st = state.menu.study;
    if((state.menu.view || 'menu') !== 'menu'){ state.menu.view = 'menu'; return true; }
    if(p === 'menu' && st){ st.open = null; st.sec = ''; st.jump = 'back'; return true; }
    openLevel(chosenLevel());
    return true;
  }
  if(t === 'flashcards'){
    const fc = state.fc;
    if(fc.stage === 'run' && fc.deckId && fc.deckId !== 'due' && fc.deckId !== 'session' && deckDef(fc.deckId, fc.level || null)){ fc.stage = 'setup'; return true; }
    if(fc.stage === 'pick'){ state.tab = 'home'; return true; }
    fc.stage = 'pick';
    return true;
  }
  if(t === 'quiz'){
    if(state.quiz.stage !== 'setup'){ state.quiz.stage = 'setup'; if(state.house) state.house.drill = ''; return true; }
    state.tab = 'home'; return true;
  }
  if(p === t){
    if(t === 'library'){ if(state.lib.print) state.lib.print = false; else state.lib.open = null; }
    else if(t === 'shots') state.shots.open = null;
    else if(t === 'na') state.na.open = null;
    else if(t === 'prep') state.prep.open = null;
    else if(t === 'producers') state.prod.open = null;
    return true;
  }
  if(p === 'library'){ goLibraryRoot(false); return true; }
  if(p === 'quiz'){ state.tab = 'quiz'; state.quiz.stage = 'setup'; return true; }
  state.tab = p;
  return true;
}
function goLibraryRoot(fresh){
  state.tab = 'library';
  if(fresh) state.lib = { q: '', fam: 'All', tier: 'All', open: null, level: chosenLevel() };
  else state.lib.open = null;
}

/* ---- the Back row (design 2.2) --------------------------------------------- */
var OOT_ROOMS = [['/table', 'The World Table'], ['/codex', 'The Sommelier’s Codex'], ['/ledger', 'The Bartender’s Ledger']];
function openedFromLine(){
  if(NAV.d !== 0) return '';
  try {
    if(typeof document === 'undefined' || !document.referrer || typeof location === 'undefined') return '';
    const ref = new URL(document.referrer);
    if(ref.origin !== location.origin) return '';
    const here = OOT_ROOMS.find(function(r){ return location.pathname.indexOf(r[0] + '/') === 0 || location.pathname === r[0]; });
    const from = OOT_ROOMS.find(function(r){ return ref.pathname.indexOf(r[0] + '/') === 0 || ref.pathname === r[0]; });
    if(!from || from === here) return '';
    return '<span class="back-from door-line">Opened from ' + esc(from[1]) + '. Your phone’s back gesture returns there.</span>';
  } catch (e) { return ''; }
}
function backRowHTML(){
  if(state.tab === 'home') return '';
  return '<div class="back-sentinel" aria-hidden="true"></div><div class="crumb backrow"><button class="chip" data-act="back">Back</button>' + openedFromLine() + '</div>';
}
/* one observer, no scroll handler: the row is marked stuck once its sentinel
   rises into the suite's badge's band, which moves the button clear of it */
var NAV_OBSERVER = null;
var NAV_BADGE_BAND = 56;
function navWatchBack(){
  if(typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') return;
  const s = document.querySelector('.back-sentinel');
  const row = document.querySelector('.backrow');
  if(NAV_OBSERVER){ try { NAV_OBSERVER.disconnect(); } catch (e) {} NAV_OBSERVER = null; }
  if(!s || !row) return;
  /* the badge's band is the top 54px: the row counts as stuck once its
     sentinel rises above 56px, before the button can reach the badge */
  NAV_OBSERVER = new IntersectionObserver(function(es){
    es.forEach(function(en){ row.classList.toggle('is-stuck', !en.isIntersecting && en.boundingClientRect.top < NAV_BADGE_BAND); });
  }, { rootMargin: '-' + NAV_BADGE_BAND + 'px 0px 0px 0px' });
  NAV_OBSERVER.observe(s);
}

/* ---- the screens' own acts ---------------------------------------------------- */
function navAct(act, data, el){
  if(act === 'back'){ navBack(); return 'done'; }
  if(act === 'hash'){ gotoHash(data.h); return 'done'; }
  if(act === 'deck'){ if(!openDeck(data.deck)) return 'done'; return 'render'; }
  if(act === 'fc-due'){ startDueToday(); return 'render'; }
  if(act === 'quiz-go'){
    const m = data.m;
    if(!startRound(m)) say('That round has nothing to deal yet.');
    return 'render';
  }
  if(act === 'pr-go'){ state.tab = 'practice'; state.practice.view = data.v; return 'render'; }
  if(act === 'today'){
    if(data.d === 'due') startDueToday();
    else if(data.d === 'quick') startQuickQuiz();
    else if(data.d === 'read'){
      const n = Number(data.n);
      const nr = nextReading(n);
      if(nr) applyTarget(readDoorTarget(n, nr.sub)); else goLibraryRoot(true);
    }
    return 'render';
  }
  if(act === 'read-at'){ applyTarget(readDoorTarget(Number(data.n), data.s)); return 'render'; }
  if(act === 'lv-menu'){
    state.tab = 'menu'; state.menu.view = 'menu';
    if(state.menu.study){ state.menu.study.open = null; state.menu.study.sec = ''; state.menu.study.editAll = false; }
    return 'render';
  }
  if(act === 'lv-sec'){
    state.tab = 'menu'; state.menu.view = 'menu';
    const st = typeof hsState === 'function' ? hsState() : null;
    if(st){ st.open = null; st.sec = data.s || ''; st.editAll = false; }
    return 'render';
  }
  if(act === 'lv-desk'){
    state.tab = 'menu'; state.menu.view = 'add'; state.menu.err = null;
    if(state.menu.imp) state.menu.imp.open = null;
    if(!state.menu.form && typeof blankBarForm === 'function') state.menu.form = blankBarForm();
    return 'render';
  }
  if(act === 'menu-stock'){ state.tab = 'menu'; state.menu.view = 'stock'; return 'render'; }
  if(act === 'search-all'){ openSearch(); return 'done'; }
  if(act.indexOf('scope-') === 0){ scopeAct(act, data); return 'render'; }
  if(act === 'fc-misses'){
    const keys = (data.from === 'quiz' ? missKeysOf(state.quiz.missedQ) : (state.fc.missed || []).slice());
    if(!startMisses(keys)) say('None of those has a card to study.');
    return 'render';
  }
  if(act === 'fc-another'){ state.fc.stage = 'pick'; if(state.sess) state.sess.active = false; return 'render'; }
  return null;
}
/* the search box on a level page: its results repaint alone */
function navAfterRender(){
  navWatchBack();
  if(typeof document === 'undefined') return;
  const q = document.getElementById('lv-q');
  if(q && !q.__lv){
    q.__lv = true;
    q.addEventListener('input', function(e){
      state.level.q = e.target.value;
      const out = document.getElementById('lv-results');
      if(out) out.innerHTML = levelSearchResultsHTML(state.level.q);
    });
  }
}
/* the state a screen must hold before its address is written */
function navNormalise(){
  if(state.tab !== 'library' && state.lib && state.lib.print) state.lib.print = false;
  const z = state.quiz;
  if(state.tab === 'quiz' && z.stage === 'house' && !(state.house && (state.house.drill === 'say' || state.house.drill === 'role'))) z.stage = 'setup';
  if(state.tab === 'quiz' && (z.stage === 'run' || z.stage === 'done') && !(z.round && z.round.length)) z.stage = 'setup';
  const fc = state.fc;
  if(state.tab === 'flashcards' && fc.stage === 'run' && !(fc.deck && fc.deck.length)) fc.stage = fc.deckId && deckDef(fc.deckId, fc.level || null) && fc.deckId !== 'due' && fc.deckId !== 'session' ? 'setup' : 'pick';
  if(state.tab === 'flashcards' && fc.stage === 'setup' && !fc.deckId && !fc.level && fc.src === 'All' && fc.special === 'All') fc.deckId = 'everything';
}

/* ---- the routes this file adds, read back (applyRoute calls this first) ----
   true when it applied the address, false for applyRoute's own branches. */
function applyNavRoute(parts){
  const tab = parts[0], a = parts[1], b = parts[2];
  /* Print cards shows only at its own address */
  if(state.lib) state.lib.print = tab === 'library' && a === 'print';
  if(state.lib && state.lib.print){ state.tab = 'library'; state.lib.open = null; return true; }
  if(tab === 'flashcards'){
    const fc = state.fc;
    state.tab = 'flashcards';
    if(!a){ fc.stage = 'pick'; navScope().flashcards = false; return true; }
    if(a === 'all'){ fc.stage = 'pick'; navScope().flashcards = true; return true; }
    if(a === 'board'){ fc.stage = 'board'; return true; }
    let id = a, run = b === 'card';
    if(a === 'misses'){
      const keys = (b && b !== 'card' ? b.split(',') : []).map(function(k){ try { return decodeURIComponent(k); } catch (e) { return k; } });
      run = parts[3] === 'card' || b === 'card';
      if(keys.length && keys.join('|') !== (fc.missKeys || []).join('|')){ fc.missKeys = keys; if(fc.deckId === 'misses') fc.deck = []; }
    }
    const held = fc.deckId === id && fc.deck && fc.deck.length && (fc.stage === 'run' || fc.stage === 'setup');
    if(run && held){ fc.stage = 'run'; return true; }
    if(id === 'due' || id === 'session'){ fc.stage = 'pick'; return true; }
    if(fc.deckId === id && (fc.stage === 'run' || fc.stage === 'setup')){ fc.stage = 'setup'; return true; }
    if(!applyDeck(id)){ fc.stage = 'pick'; }
    return true;
  }
  if(tab === 'quiz'){
    const z = state.quiz;
    state.tab = 'quiz';
    if(!a){ z.stage = 'setup'; navScope().quiz = false; return true; }
    if(a === 'all'){ z.stage = 'setup'; navScope().quiz = true; return true; }
    if(a === 'say' || a === 'guest'){
      const mode = a === 'say' ? 'say' : 'role';
      if(typeof houseDrillOpen === 'function' && houseDrillsLib && houseDrillsLib() && houseDrillState().drill === mode){ z.stage = 'house'; return true; }
      if(typeof houseDrillOpen === 'function' && houseDrillsLib && houseDrillsLib() && houseDrillOpen(mode)) return true;
      z.stage = 'setup';
      return true;
    }
    const held = z.mode === a && z.round && z.round.length;
    if(held && b === 'done' && z.stage === 'done') return true;
    if(held && !b && (z.stage === 'run' || z.stage === 'done')){ return true; }
    z.stage = 'setup';
    return true;
  }
  if(tab === 'practice'){
    state.tab = 'practice';
    if(a && ['drills', 'rail', 'hold', 'pour', 'tasting', 'flights', 'method'].indexOf(a) >= 0) state.practice.view = a;
    return true;
  }
  if(tab === 'tools'){
    state.tab = 'tools';
    if(a && ['batch', 'dates', 'strength', 'cost', 'spills', 'convert', 'maitre', 'data', 'video'].indexOf(a) >= 0) state.tools.view = a;
    return true;
  }
  if(tab === 'level' && b === 'test'){
    const i = findBySlug('level', a);
    const n = i >= 0 ? LEVELS[i].n : null;
    if(n && state.lt && state.lt.n === n){ state.tab = 'level'; state.level.n = n; return true; }
    state.tab = 'quiz'; state.quiz.stage = 'setup';
    return true;
  }
  if(tab === 'menu' && (a === 'section' || a === 'view')){
    state.tab = 'menu';
    if(a === 'view'){ state.menu.view = ['stock', 'add'].indexOf(b) >= 0 ? b : 'menu'; return true; }
    state.menu.view = 'menu';
    if(typeof houseStudyRoute === 'function') houseStudyRoute(null);
    const s = sectionBySlug(b || '');
    if(state.menu.study) state.menu.study.sec = s ? s.name : '';
    /* a section the house has not yet answered for (a cold load before the
       wake) is held, and its address kept, until the house holds it */
    NAV_WANT_SEC = !s && b && navHouseUnanswered() ? String(b).toLowerCase().replace(/[^a-z0-9-]/g, '') : null;
    return true;
  }
  if(tab === 'library' && a === 'all'){ state.tab = 'library'; state.lib.level = null; state.lib.open = null; return true; }
  return false;
}
