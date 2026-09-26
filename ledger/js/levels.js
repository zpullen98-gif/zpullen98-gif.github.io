/* ---------------- THE FOUR LEVELS ----------------
   The Ledger's ladder, shared in shape with the World Table and the Codex by
   the owner's decision of 26 September 2026: four levels (I Barback, II
   Bartender, III Head Bartender, IV Bar Manager), each the same eight
   subsections at that level's difficulty, training from there. Nothing is
   locked: a level guides, it never bars.

   What each level holds is js/data-levels.js (LEVEL_ITEMS), machine written
   from tools/levels/placements.json, where every item carries the reason it
   sits where it does. This file reads it; it never decides a level.

   WHAT COUNTS AS MET, per unit, from the records the app already keeps:
     a card        three honest wins, more right than wrong (isMastered's
                   rule without its expiry: a level met does not un-meet
                   itself the night a review falls due; the Today door deals
                   the review)
     a question    answered right at least once (progress.qa, new here)
     a drill       one logged result at its ready figure (DRILLS[].ready)
   Everything else a level holds (sections, producers, flights, prep sheets,
   plates, riff frames) is read, never graded.

   THE FIGURE on a level card is a word and a number and never a score:
   Untouched, then N% met with N clamped to 1..99, then Met. A level's N is
   the MEAN of its subsections' shares, empty ones excluded, so four hundred
   cocktails cannot hide eight coffee cards. Which level a reader is on is
   derived from the records every time it is asked, and never stored.

   Top level holds literals and function declarations only: tools/check-levels
   reads LEVEL_TEST_SHAPE out of this file in a bare sandbox. */

const LEVELS = [
  { n:1, num:'I', name:'Barback', slug:'barback',
    blurb:'The well, the glass and the station: the Core Dozen and the Classics Canon by heart, the families they belong to, the pour, the prep list, and the legal floor under all of it.' },
  { n:2, num:'II', name:'Bartender', slug:'bartender',
    blurb:'A full shift behind the stick: the extended canon and the house calls, the shots and the zero-proof list, the draught system, wine by the glass and the register, and drills timed to service.' },
  { n:3, num:'III', name:'Head Bartender', slug:'head-bartender',
    blurb:'The bar at speed and in depth: the themed books of the canon, the styles and faults on the wall, sake and the producers behind the bottles, conflict and safety on the floor, and the standards a trail is judged by.' },
  { n:4, num:'IV', name:'Bar Manager', slug:'bar-manager',
    blurb:'The whole house: the obscure and the frozen, cellar and condition, the money and the law in full, coffee and tea done properly, and the judgement that tells a good pour from a lucky one.' },
];

/* The eight, in the order a level page lists them. `tab` is where the
   subsection's reading lives when the level holds no section of its own. */
const LEVEL_SUBS = [
  { key:'cocktails', title:'Cocktails', tab:'library' },
  { key:'shots', title:'Shots and Zero Proof', tab:'shots' },
  { key:'ontap', title:'On Tap', tab:'ontap' },
  { key:'spirits', title:'Spirits and Producers', tab:'producers' },
  { key:'technique', title:'Technique and Method', tab:'notes' },
  { key:'stick', title:'Behind the Stick', tab:'service' },
  { key:'prep', title:'The Prep Room', tab:'prep' },
  { key:'coffee', title:'Coffee and Tea', tab:'coffee' },
];

/* Seventeen questions across the eight. `from` is where a question is drawn:
   a card of the subsection at the level, or a question of the bank placed
   there. The technique call (the glass or the build of a drink) is drawn
   from the level's cocktails and reported under Technique and Method. */
const LEVEL_TEST_SHAPE = [
  { sub:'cocktails', from:'card', kind:'ticket', n:2 },
  { sub:'cocktails', from:'card', kind:'line', n:1 },
  { sub:'cocktails', from:'card', kind:'family', n:1 },
  { sub:'shots', from:'card', kind:'ticket', n:2 },
  { sub:'ontap', from:'card', kind:'ticket', n:1 },
  { sub:'ontap', from:'bank', kind:'bank', n:1 },
  { sub:'spirits', from:'bank', kind:'bank', n:2 },
  { sub:'technique', from:'bank', kind:'bank', n:1 },
  { sub:'cocktails', from:'card', kind:'call', n:1, part:'technique' },
  { sub:'stick', from:'bank', kind:'bank', n:3 },
  { sub:'prep', from:'bank', kind:'bank', n:1 },
  { sub:'coffee', from:'card', kind:'ticket', n:1 },
];

const LEVEL_UNTOUCHED = 'Untouched';
const LEVEL_MET = 'Met';

function roman(n){ return ['', 'I', 'II', 'III', 'IV'][n] || String(n); }
function levelInfo(n){ return LEVELS.find(function(l){ return l.n === n; }) || LEVELS[0]; }
function levelSubTitle(key){ const s = LEVEL_SUBS.find(function(x){ return x.key === key; }); return s ? s.title : key; }

/* ---- the placement, indexed once ---- */
let LV_INDEX = null;
function levelIndex(){
  if(LV_INDEX) return LV_INDEX;
  const level = {}, sub = {};
  Object.keys(LEVEL_ITEMS).forEach(function(s){
    Object.keys(LEVEL_ITEMS[s]).forEach(function(l){
      LEVEL_ITEMS[s][l].forEach(function(k){ level[k] = Number(l); sub[k] = s; });
    });
  });
  LV_INDEX = { level:level, sub:sub };
  return LV_INDEX;
}
/* null for anything not levelled: the Menu (My Bar) never is */
function levelOf(key){ return levelIndex().level[key] || null; }
function subOf(key){ return levelIndex().sub[key] || null; }
function levelKeys(n, sub){ return (LEVEL_ITEMS[sub] && LEVEL_ITEMS[sub][n]) || []; }
/* a key as the placement names it: the wing's key for an item it renamed
   becomes the Ledger's (LEVEL_KEY_ALIAS, emitted with LEVEL_ITEMS) */
function canonKey(k){ return (typeof LEVEL_KEY_ALIAS !== 'undefined' && LEVEL_KEY_ALIAS[k]) || k; }

/* cards and questions by key, rebuilt only when the deck itself changes */
let LV_CARDS = null, LV_CARDS_FOR = null, LV_QS = null;
function levelCards(){
  const all = allDrinks();
  if(LV_CARDS_FOR !== all){
    LV_CARDS = {};
    all.forEach(function(d){ if(d.src !== 'My Bar') LV_CARDS[cardKey(d)] = d; });
    LV_CARDS_FOR = all;
  }
  return LV_CARDS;
}
function levelQuestions(){
  if(!LV_QS){ LV_QS = {}; KNOWLEDGE.forEach(function(k){ LV_QS[qKey(k)] = k; }); }
  return LV_QS;
}

/* The met-able units a level holds in one subsection, in placement order. */
function levelUnits(n, sub){
  const cards = levelCards(), qs = levelQuestions(), out = [];
  levelKeys(n, sub).forEach(function(k){
    if(k.indexOf('q:') === 0){ if(qs[k]) out.push({ key:k, kind:'question', ref:qs[k] }); }
    else if(k.indexOf('drill:') === 0){
      const d = DRILLS.find(function(x){ return x.id === k.slice(6); });
      if(d) out.push({ key:k, kind:'drill', ref:d });
    }
    else if(cards[k]) out.push({ key:k, kind:'card', ref:cards[k] });
  });
  return out;
}
/* The read items: everything a level holds that is not graded. */
function levelReads(n, sub){
  return levelKeys(n, sub).filter(function(k){ return /^(sec|prod|flight|prep|preplist|prepsafe|plate|riff):/.test(k); });
}

/* ---- met ---- */
function qaRecord(key, ok){
  if(!key) return;
  if(!progress.qa) progress.qa = {};
  const r = progress.qa[key] || { r:0, w:0, last:0 };
  progress.qa[key] = { r: r.r + (ok ? 1 : 0), w: r.w + (ok ? 0 : 1), last: Date.now() };
  saveProgress();
}
function drillReady(d, e){
  const r = d && d.ready;
  if(!r || !e) return false;
  if(r.op === 'lt') return typeof e.v === 'number' && e.v > 0 && e.v < r.v;
  if(r.op === 'ge') return typeof e.v === 'number' && e.v >= r.v;
  if(r.op === 'order') return e.ok === true;
  if(r.op === 'whole') return typeof e.of === 'number' && e.v >= e.of;
  return false;
}
function drillMet(id){
  const d = DRILLS.find(function(x){ return x.id === id; });
  const log = (progress.practice && progress.practice[id]) || [];
  return log.some(function(e){ return drillReady(d, e); });
}
function cardMet(key){
  const s = progress.cards && progress.cards[key];
  return !!(s && s.r >= 3 && s.r > s.w);
}
function unitMet(u){
  if(u.kind === 'card') return cardMet(u.key);
  if(u.kind === 'question'){ const r = progress.qa && progress.qa[u.key]; return !!(r && r.r >= 1); }
  if(u.kind === 'drill') return drillMet(u.ref.id);
  return false;
}

/* ---- the word and the figure ---- */
function progressWord(met, total, share){
  if(!total || met <= 0) return LEVEL_UNTOUCHED;
  if(met >= total) return LEVEL_MET;
  const s = share === undefined ? met / total : share;
  return Math.min(99, Math.max(1, Math.round(s * 100))) + '% met';
}
function subsectionProgress(n, sub){
  const units = levelUnits(n, sub);
  const met = units.filter(unitMet).length;
  return { sub:sub, title:levelSubTitle(sub), units:units, reads:levelReads(n, sub), met:met, total:units.length, label:progressWord(met, units.length) };
}
function levelProgress(n){
  const subs = LEVEL_SUBS.map(function(s){ return subsectionProgress(n, s.key); });
  const counted = subs.filter(function(s){ return s.total > 0; });
  const met = counted.reduce(function(a, s){ return a + s.met; }, 0);
  const total = counted.reduce(function(a, s){ return a + s.total; }, 0);
  const share = counted.length ? counted.reduce(function(a, s){ return a + s.met / s.total; }, 0) / counted.length : 0;
  const all = counted.length > 0 && counted.every(function(s){ return s.met >= s.total; });
  return { n:n, subs:subs, met:met, total:total, share:share, label: all ? LEVEL_MET : progressWord(met, total, share) };
}
/* The lowest level not yet met. Never null: IV once every level is. */
function firstUnmetLevel(){
  for(let n = 1; n <= 4; n++) if(levelProgress(n).label !== LEVEL_MET) return n;
  return 4;
}
/* Where Tonight's Session deals new cards from: the lowest unmet level that
   still holds a card never seen, so the door can say which level it deals
   from and be right. */
function todayLevel(){
  const cards = levelCards();
  for(let n = firstUnmetLevel(); n <= 4; n++){
    const unseen = LEVEL_SUBS.some(function(s){
      return levelKeys(n, s.key).some(function(k){ return cards[k] && !cards[k].draft && !progress.cards[k]; });
    });
    if(unseen) return n;
  }
  return firstUnmetLevel();
}
/* A level's fresh cards for the session, cocktails in tier order first. */
function levelFreshCards(n){
  const cards = levelCards(), out = [];
  LEVEL_SUBS.forEach(function(s){
    levelKeys(n, s.key).forEach(function(k){ const d = cards[k]; if(d && !d.draft && !progress.cards[k]) out.push(d); });
  });
  return out;
}

/* ---- the doors on a level page ----
   One pure descriptor per door, so tools/check-home.mjs can prove every door
   a page draws goes somewhere, and app.js applies it. */
function readDoorTarget(n, sub){
  /* the cocktails are read in the Library, filtered to the level: a family
     note or a plate among the cell's reads is not where its drinks are */
  if(sub === 'cocktails') return { tab:'library', libLevel:n };
  const reads = levelReads(n, sub);
  for(let i = 0; i < reads.length; i++){
    const k = reads[i], m = k.match(/^sec:(\w+)\/(.+)$/);
    if(m){
      if(m[1] === 'service') return { tab:'service', svc:m[2] };
      if(m[1] === 'ontap') return { tab:'ontap', ontap:m[2] };
      if(m[1] === 'coffee') return { tab:'coffee', coffee:m[2] };
      if(m[1] === 'notes'){
        const st = STUDY.find(function(x){ return canonKey('sec:notes/' + slugify(x.title)) === k; });
        if(st) return { tab:'notes', note:st.title };
      }
    }
    if(k.indexOf('prep:') === 0){
      const i2 = PREPS.findIndex(function(p){ return canonKey('prep:' + slugify(p.name)) === k; });
      if(i2 >= 0) return { tab:'prep', prep:i2 };
    }
    if(k.indexOf('prod:') === 0){
      const i3 = PRODUCERS.findIndex(function(p){ return canonKey('prod:' + slugify(p.name)) === k; });
      if(i3 >= 0) return { tab:'producers', prod:i3 };
    }
    if(k.indexOf('plate:') === 0) return { tab:'notes', note:'__plates' };
    if(k.indexOf('flight:') === 0) return { tab:'practice', view:'flights' };
    if(k.indexOf('riff:') === 0) return { tab:'riffs' };
  }
  const s = LEVEL_SUBS.find(function(x){ return x.key === sub; });
  return sub === 'cocktails' ? { tab:'library', libLevel:n } : { tab: s ? s.tab : 'library' };
}
/* m: read | cards | quiz | hands. Null when the cell holds nothing for it,
   and a null door is never drawn. */
function trainTarget(m, n, sub){
  const units = levelUnits(n, sub);
  if(m === 'read') return readDoorTarget(n, sub);
  if(m === 'cards') return units.some(function(u){ return u.kind === 'card'; }) ? { tab:'flashcards', fcLevel:n, fcSub:sub } : null;
  if(m === 'quiz') return levelQuizSource(n, sub).length >= 4 ? { tab:'quiz', quiz:'level-' + n + '-' + sub } : null;
  if(m === 'hands'){
    /* the first drill not yet met at its figure, else the first */
    const drills = units.filter(function(u){ return u.kind === 'drill'; });
    const drill = drills.find(function(u){ return !unitMet(u); }) || drills[0];
    if(drill) return { tab:'practice', view: drill.ref.id === 'rail' || drill.ref.id === 'hold' ? drill.ref.id : 'drills', drill: drill.ref.id };
    if(n === 4 && sub === 'cocktails' && typeof RIFFS !== 'undefined' && RIFFS.length) return { tab:'riffs' };
    return null;
  }
  return null;
}
/* Put the app where a door points. The one place a descriptor becomes state. */
function applyTarget(t){
  if(!t) return false;
  state.tab = t.tab;
  if(t.svc) Object.assign(state.svc, { dom:t.svc, rowOpen:null, refOpen:null });
  if(t.ontap) Object.assign(state.ontap, { sec:t.ontap, rowOpen:null, refOpen:null });
  if(t.coffee) Object.assign(state.coffee, { sec:t.coffee, rowOpen:null, refOpen:null });
  if(t.note){ state.noteOpen = t.note; state.noteJump = true; }
  if(t.prep !== undefined){ state.prep.cat = PREPS[t.prep].cat; state.prep.open = t.prep; }
  if(t.prod !== undefined) Object.assign(state.prod, { cat:'All', open:t.prod });
  if(t.view) state.practice.view = t.view;
  /* the drill's panel carries data-open once, so render() brings it into sight */
  if(t.drill) state.practice.jump = t.drill;
  if(t.libLevel){ state.lib = { q:'', fam:'All', tier:'All', open:null, level:t.libLevel }; }
  if(t.fcLevel){ Object.assign(state.fc, { stage:'setup', src:'All', family:'All', spirit:'All', tier:'All', special:'All', level:t.fcLevel, sub:t.fcSub || null }); }
  if(t.quiz){
    const round = levelRoundFromMode(t.quiz);
    if(!round.length) return false;
    Object.assign(state.quiz, { stage:'run', mode:t.quiz, round:round, idx:0, picked:null, score:0, missedQ:[], replay:false });
  }
  return true;
}

/* ---- questions from a cell ---- */
function levelCardsOf(n, sub, pred){
  return levelUnits(n, sub).filter(function(u){ return u.kind === 'card' && (!pred || pred(u.ref)); }).map(function(u){ return u.ref; });
}
function levelBankOf(n, sub){
  return levelUnits(n, sub).filter(function(u){ return u.kind === 'question'; }).map(function(u){ return u.ref; });
}
/* A blank-a-line question over any spec'd drink: the Menu round's own
   question, generalised, with decoys from the drink's neighbours. */
function qSpecLine(c){
  const line = c.spec[Math.floor(Math.random() * c.spec.length)];
  const wrong = decoyLines({ name:c.name, spec:c.spec, src:'Cocktails', group:c.family }, 3);
  return { prompt:'Which line belongs in the '+c.name+'?', options:shuffle([line].concat(wrong)), answer:line,
    explain: c.name+': '+c.spec.join(' · ') };
}
/* A blind fact card, On Tap or coffee: read the facts, call the name. */
function qFactTicket(d, pool){
  const same = pool.filter(function(x){ return x.name !== d.name && x.src === d.src; });
  const kin = same.filter(function(x){ return x.group === d.group; });
  const wrong = sample(kin, Math.min(2, kin.length)).concat(sample(same.filter(function(x){ return kin.indexOf(x) < 0; }), 3)).slice(0, 3).map(function(x){ return x.name; });
  return { prompt:'Name this from the card:', factCard:d.ref, options:shuffle([d.name].concat(wrong)), answer:d.name, ckey:cardKey(d),
    explain: d.name+': '+(d.ref.note || '') };
}
/* shots and zero proof, over a pool */
function qBlindFrom(d, pool){
  const same = pool.filter(function(x){ return x.src === d.src && x.name !== d.name; }).map(function(x){ return x.name; });
  const r = d.ref;
  if(d.src === 'Shots') return { prompt:'Name this shot from the ticket:', ticket:r, ticketType:'shot', options:shuffle([d.name].concat(sample(same, 3))), answer:d.name, ckey:cardKey(d),
    explain: d.name+': '+String(r.cat).toLowerCase()+'. '+(r.note || '') };
  return { prompt:'Name this zero-proof drink from the ticket:', ticket:r, ticketType:'na', options:shuffle([d.name].concat(sample(same, 3))), answer:d.name, ckey:cardKey(d),
    explain: d.name+': '+String(r.method || '').toLowerCase()+'. '+(r.why || '') };
}
function keyedCocktail(q, c){ q.ckey = c.name; return q; }
/* qKnowledge carries its own key since the four levels */
function withQKey(k){ return qKnowledge(k); }

/* Every question a cell can ask, one entry per unit and each entry the ways
   that unit can be asked (as thunks, so a round builds only what it deals).
   A round takes one question from each unit it draws, so ten questions are
   ten drinks or facts and never one cocktail three ways. The pools for
   decoys are the whole book. */
function levelQuizSource(n, sub){
  const out = [];
  const all = allDrinks().filter(function(d){ return !d.draft && d.src !== 'My Bar'; });
  levelUnits(n, sub).forEach(function(u){
    if(u.kind === 'question'){ out.push([function(){ return withQKey(u.ref); }]); return; }
    if(u.kind !== 'card') return;
    const d = u.ref;
    if(d.src === 'Cocktails'){
      const c = d.ref, ways = [function(){ return keyedCocktail(qCocktailTicket(c), c); }];
      if(FAMILIES[c.family]) ways.push(function(){ return qFamily(c); });
      ways.push(function(){ return qSpecLine(c); });
      out.push(ways);
    }
    else if(d.src === 'Shots' || d.src === 'Zero Proof') out.push([function(){ return qBlindFrom(d, all); }]);
    else if(d.src === 'On Tap' || d.src === 'Coffee') out.push([function(){ return qFactTicket(d, all); }]);
  });
  return out;
}
function levelRound(n, sub, len){
  return shuffle(levelQuizSource(n, sub)).slice(0, len || 10).map(function(ways){
    return ways[Math.floor(Math.random() * ways.length)]();
  });
}
/* 'level-2-cocktails' -> a fresh round from that cell; how Deal another
   round and a stored mode find their way back here. */
function levelRoundFromMode(mode){
  const m = String(mode || '').match(/^level-(\d)-(\w+)$/);
  return m ? levelRound(Number(m[1]), m[2], 10) : [];
}
function levelModeLabel(mode){
  const m = String(mode || '').match(/^level-(\d)-(\w+)$/);
  return m ? 'Level ' + roman(Number(m[1])) + ' · ' + levelSubTitle(m[2]) : null;
}

/* ---- the level test ----
   Seventeen questions across the eight subsections, untimed, ending on what
   got away with the right answers and never on a score. Decoys come from
   the whole book; the questions from the level. Null when a cell cannot
   supply its share, which tools/check-levels.mjs makes impossible. */
function buildLevelTest(n){
  const all = allDrinks().filter(function(d){ return !d.draft && d.src !== 'My Bar'; });
  const fresh = function(list){
    /* what is not yet met leads, then the rest, each shuffled */
    const un = shuffle(list.filter(function(x){ return !x.met; })), met = shuffle(list.filter(function(x){ return x.met; }));
    return un.concat(met);
  };
  const qs = [], used = new Set();
  for(let i = 0; i < LEVEL_TEST_SHAPE.length; i++){
    const s = LEVEL_TEST_SHAPE[i];
    const part = s.part || s.sub;
    const units = levelUnits(n, s.sub).filter(function(u){
      if(used.has(u.key)) return false;
      if(s.from === 'bank') return u.kind === 'question';
      if(u.kind !== 'card') return false;
      if(s.sub === 'cocktails') return u.ref.src === 'Cocktails';
      return true;
    }).map(function(u){ return { u:u, met:unitMet(u) }; });
    const picks = fresh(units).slice(0, s.n);
    if(picks.length < s.n) return null;
    picks.forEach(function(p){
      const u = p.u; used.add(u.key);
      let q;
      if(u.kind === 'question') q = withQKey(u.ref);
      else if(u.ref.src === 'Cocktails'){
        const c = u.ref.ref;
        if(s.kind === 'line') q = qSpecLine(c);
        else if(s.kind === 'family') q = qFamily(c);
        else if(s.kind === 'call') q = Math.random() < 0.5 ? qGlass(c) : qMethod(c);
        else q = keyedCocktail(qCocktailTicket(c), c);
      }
      else if(u.ref.src === 'Shots' || u.ref.src === 'Zero Proof') q = qBlindFrom(u.ref, all);
      else q = qFactTicket(u.ref, all);
      q.part = part;
      qs.push(q);
    });
  }
  return qs;
}
function levelTestRecord(n, total, miss){
  if(!progress.levels) progress.levels = {};
  const arr = progress.levels[n] || [];
  arr.push({ ts:Date.now(), total:total, miss:miss });
  progress.levels[n] = arr.slice(-12);
  saveProgress();
}
/* The test's own acts, as functions, so tools/check-home.mjs can sit it. */
function ltStart(n){
  const qs = buildLevelTest(n);
  state.lt = qs ? { n:n, qs:qs, idx:0, picked:null, misses:[], done:false } : { n:n, qs:[], idx:0, picked:null, misses:[], done:false, none:true };
  return state.lt;
}
function ltPick(i){
  const t = state.lt;
  if(!t || t.done || t.picked !== null || !t.qs[t.idx]) return;
  t.picked = i;
  const q = t.qs[t.idx];
  const ok = q.options[i] === q.answer;
  /* every answer is evidence, recorded before anything advances */
  if(q.qkey) qaRecord(q.qkey, ok);
  else if(q.ckey && typeof gradeCardKey === 'function') gradeCardKey(q.ckey, ok);
  if(!ok) t.misses.push({ q:q, chose:q.options[i] });
  return ok;
}
function ltNext(){
  const t = state.lt;
  if(!t || t.picked === null) return;
  if(t.idx + 1 >= t.qs.length){
    t.done = true;
    levelTestRecord(t.n, t.qs.length, t.misses.length);
  } else { t.idx++; t.picked = null; }
}
