/* Exact house-skill recovery. The original question key is the unit of
   recovery: a wine card never clears a separate service or pairing miss.
   No new persisted schema, no deleted history, and no house answers in SRS. */
var V51_KEYS = new WeakMap();
var V51_TARGET = null;
var V51_SKILLS = {
  card: 'Wine recall', word: 'Vocabulary recall', component: 'Ingredient or technique',
  serve: 'Service', section: 'List section', wineGoesWith: 'Food connection',
  firstPickFor: 'Saved pairing', zeroProofFor: 'Pairing without alcohol', wineGrapes: 'Grapes',
  producerOf: 'Producer identity', producerWhere: 'Producer origin', producerDish: 'Producer and wine',
  producerPour: 'Producer and pairing', 'producer-0': 'Producer origin and history',
  'producer-1': 'Producer knowledge', 'producer-2': 'Producer wines',
  'say-s10': '10-second description', 'say-s20': '20-second description', 'say-s45': '45-second description',
  guest: 'Guest response'
};
function v51Esc(value) { return v32Esc(String(value == null ? '' : value)); }
function v51ParseKey(key) {
  var match = /^(?:(intro|certified|advanced|master)\|)?(h-([a-z]-[a-z0-9]{8})-(.+))$/.exec(String(key || ''));
  return match ? { key: key, level: match[1] || 'certified', id: match[3], bare: match[2], skill: match[4] } : null;
}
function v51Level(level) {
  return { intro: 'Régionale / Introductory', certified: 'Village / Certified', advanced: 'Premier Cru / Advanced', master: 'Grand Cru / Master' }[level] || String(level);
}
function v51Unresolved(record) { return record && Number(record.w) > 0 && !(Number(record.s) > 0); }
function v51Entries() {
  var h = v27Current(), records = ST && ST.q || {}, out = [];
  Object.keys(records).forEach(function (key) {
    if (!v51Unresolved(records[key])) return;
    var parsed = v51ParseKey(key);
    if (!parsed) return;
    var item = v49Find(h, parsed.id);
    parsed.item = item;
    parsed.name = item ? item.name || item.term || item.title || parsed.id : 'Saved item no longer in this collection';
    parsed.label = V51_SKILLS[parsed.skill] || 'Archived exercise: ' + parsed.skill;
    parsed.known = !!item;
    out.push(parsed);
  });
  return out.sort(function (a, b) {
    return Number(b.known) - Number(a.known) || a.name.localeCompare(b.name) || a.label.localeCompare(b.label) || a.level.localeCompare(b.level);
  });
}
function v51Entry(key) { return v51Entries().find(function (row) { return row.key === key; }) || null; }
function v51WineEntries(id) {
  return v51Entries().filter(function (e) {
    return e.id === id || (e.item && ((e.item.itemIds || []).indexOf(id) >= 0 || e.item.aId === id || e.item.bId === id));
  });
}
function v51Mode(entry) {
  if (!entry || !entry.item) return 'unavailable';
  if (/^say-s(10|20|45)$/.test(entry.skill)) return 'say';
  if (entry.skill === 'guest') return 'guest';
  if (/^(card|word|component|producer-[012])$/.test(entry.skill)) return 'card';
  if (V27_CELLAR_KINDS.concat(V27_PAIR_KINDS).some(function (kind) { return kind.key === entry.skill; })) return 'quiz';
  return 'unavailable';
}
function v51Questions(entry) {
  var kind = V27_CELLAR_KINDS.concat(V27_PAIR_KINDS).find(function (candidate) { return candidate.key === entry.skill; });
  if (!kind) return [];
  /* Only this family is dealt; do not build the entire quiz on each render. */
  return v27HouseQs([kind], V27_CELLAR_SECTION);
}
function v51Card(entry) {
  if (entry.skill === 'card') return v32HouseCards([entry.id])[0] || null;
  if (entry.skill === 'word') return v32WordCards().find(function (card) { return card.id === entry.id; }) || null;
  if (entry.skill === 'component') return v35Cards(v27Current(), 'all').find(function (card) { return card.id === entry.id; }) || null;
  var producer = /^producer-(\d)$/.exec(entry.skill);
  return producer ? v38Cards(v27Current()).find(function (card) { return card.id === entry.id && card.n === Number(producer[1]); }) || null : null;
}
function v51Reading(entry) {
  if (!entry || !entry.item) return '';
  if (entry.skill === 'guest') {
    var item = entry.item, body = v49Part('The saved response', v49Text(v49Kept(item, 'you')) || v49Text(v49Kept(item, 'difference')))
      + v49Part('Service reasoning', v49Text(v49Kept(item, 'principle')));
    (item.itemIds || [item.aId, item.bId].filter(Boolean)).forEach(function (id) {
      var linked = v49Find(v27Current(), id); if (linked) body += v49Profile(linked, v27Current());
    });
    return v49Reading(entry.name, body || v49Profile(item, v27Current()));
  }
  if (/^producer-/.test(entry.skill)) return v49Reading(entry.name, v49Producer(v38RowById(v27Current(), entry.id), v27Current()));
  if (entry.skill === 'word') {
    var card = v51Card(entry); if (card) return v49Word(card);
  }
  if (entry.skill === 'firstPickFor' || entry.skill === 'zeroProofFor') return v49Reading(entry.name, v49Pairing(entry.item, entry.skill, v27Current()));
  return v49Reading(entry.name, v49Profile(entry.item, v27Current()));
}
function v51Door(title, line, wine) {
  return '<button class="v25row v51-door" type="button" data-v51-open="' + v51Esc(wine || '') + '">'
    + '<span class="v25row-name">' + v51Esc(title) + '</span><span class="v25row-line">' + v51Esc(line) + '</span></button>';
}
function v51Open(wine) {
  V51_TARGET = null;
  S._v51wine = /^w-[a-z0-9]{8}$/.test(wine || '') ? wine : '';
  S._v51notice = '';
  v32Go({ view: 'houserecovery', arg: S._v51wine }, 'push');
}
function v51ResolveButton(entry) {
  var mode = v51Mode(entry);
  return mode === 'unavailable'
    ? '<p class="v51-unavailable">This exact exercise is unavailable in the current collection. Its history is retained. Restore or confirm the source item before retesting; a different card cannot clear it.</p>'
    : '<button type="button" class="btn gold" data-v51-retest="' + v51Esc(entry.key) + '">Retest ' + v51Esc(entry.label.toLowerCase()) + '</button>'
      + (mode === 'quiz' ? '<p class="v51-small">A short mixed round places this exercise among related questions, without naming the target answer.</p>' : '');
}
function v51View() {
  var all = v51Entries(), wine = S._v51wine || '', entries = wine ? v51WineEntries(wine) : all;
  var current = entries.filter(function (e) { return e.known; }), archived = entries.filter(function (e) { return !e.known; });
  var html = '<div class="v25page v32-root v51-recovery">' + v32Head('Revisit exact skills', 'House practice with a precise route back to the answer')
    + v48NavHtml('houserehearsal') + '<p class="v51-lead">Retrieve the answer before revealing it. Then explain the reasoning. A corrected service answer repairs service; it does not erase a separate pairing or description miss.</p>'
    + '<p class="v51-scope">Current course: ' + v51Esc(v51Level(typeof activeLevel === 'string' ? activeLevel : 'certified')) + '. House practice stays separate from course scores. Each retest updates the original saved scope shown below.</p>'
    + '<p id="v51-count" role="status">' + current.length + ' outstanding skill' + (current.length === 1 ? '' : 's') + ' in this collection'
    + (archived.length ? '; ' + archived.length + ' unmatched saved record' + (archived.length === 1 ? '' : 's') : '') + '.</p>';
  if (S._v51notice) html += '<p class="v51-notice" role="status">' + v51Esc(S._v51notice) + '</p>';
  if (wine) html += v51Door('See all outstanding skills', 'Include the rest of your saved house practice');
  if (!current.length) html += '<section class="v51-clear"><h3>No unresolved skills in this selection</h3><p>This means no saved miss is waiting here. It does not certify tasting or service performance. Continue your next study or practise another wine.</p></section>';
  function row(entry) {
    return '<article class="v51-item" data-v51-key="' + v51Esc(entry.key) + '"><p class="v51-eyebrow">' + v51Esc(entry.label) + '</p><h3>' + v51Esc(entry.name) + '</h3>'
      + '<p class="v51-record-scope">Recorded while studying ' + v51Esc(v51Level(entry.level)) + (entry.level === activeLevel ? ' (current course)' : '') + '.</p>'
      + v51Reading(entry) + v51ResolveButton(entry) + '<details class="v51-key"><summary>Saved exercise identity</summary><code>' + v51Esc(entry.key) + '</code></details></article>';
  }
  html += current.map(row).join('');
  if (archived.length) html += '<details class="v51-archive"><summary>Unmatched saved house records (' + archived.length + ')</summary><p>These IDs are not in the loaded house. They may belong to another house or to an older version. They have not been deleted or reassigned.</p>' + archived.map(row).join('') + '</details>';
  html += '<div class="sarow"><button type="button" class="btn ghost" data-v48-route="houserehearsal">Return to Service rehearsal</button></div></div>';
  return v32Build(html, function (box) { v48WireKeep(box, 'houserecovery', v27Current()); v51Wire(box); });
}
function v51TargetMatches(question) {
  var target = V51_TARGET;
  if (!target || target.recorded || !question || question.id !== target.entry.bare || !v27Current() || v27Current().id !== target.houseId) return false;
  if (target.mode === 'quiz') return S.view === 'quiz' && S.pool === target.run && S.pool[S.idx] === question;
  /* The card engine shifts its queue before recording the grade. */
  if (target.mode === 'card') return S.view === 'housedeck' && S._v32run === target.run && target.run.cards.indexOf(target.card) >= 0;
  if (target.mode === 'say') return S.view === 'housesay' && S._v27say === target.run && target.run.id === target.entry.id && target.run.length === target.entry.skill.slice(4);
  return target.mode === 'guest' && S.view === 'houseguest' && S._v27guest === target.run && v27GuestCard() && v27GuestCard().id === target.entry.id;
}
var _v51QKey = qKey;
qKey = function (question) { return question && V51_KEYS.has(question) ? V51_KEYS.get(question) : _v51QKey.apply(this, arguments); };
var _v51StatRecord = statRecord;
statRecord = function (question, correct) {
  var matched = v51TargetMatches(question), target = V51_TARGET;
  if (matched) V51_KEYS.set(question, target.entry.key);
  var result = _v51StatRecord.apply(this, arguments);
  if (matched) { target.recorded = true; target.correct = !!correct; }
  return result;
};
function v51Start(key) {
  var entry = v51Entry(key);
  if (!entry) { S._v51notice = 'That skill is no longer unresolved. Your saved history is retained.'; render(); return false; }
  var mode = v51Mode(entry), h = v27Current(), question = null, card = null, peers = [];
  if (mode === 'quiz') {
    peers = v51Questions(entry);
    question = peers.find(function (candidate) { return candidate.id === entry.bare; }) || null;
  }
  if (mode === 'card') card = v51Card(entry);
  if (mode === 'unavailable' || (mode === 'quiz' && !question) || (mode === 'card' && !card)) {
    S._v51notice = 'This exact exercise cannot currently be dealt from the saved collection. Its record remains outstanding. Review its source or restore the original item; another exercise will not silently clear it.';
    render(); return false;
  }
  V51_TARGET = null;
  if (mode === 'quiz') {
    question = Object.assign({}, question);
    V51_KEYS.set(question, entry.key);
    var others = v27Shuffle(peers.filter(function (candidate) { return candidate.id !== entry.bare; })).slice(0, 3);
    /* A saved one-question drill length must not randomly discard the target.
       Use the normal quiz state, with the complete short recovery pool. */
    stopTimer(); S.mode = 'drill'; S.section = V27_CELLAR_SECTION;
    S.pool = v27Shuffle([question].concat(others)); S.idx = 0;
    S.correct = 0; S.results = []; S._again = function () { if (v51Entry(key)) v51Start(key); else v51Open(); };
    resetQ(); S.view = 'quiz'; V32.pend = 'push';
  } else if (mode === 'card') {
    v32StartRun('v51-recovery', { cards: [card], keepOrder: true, push: true });
    S._v32run.label = entry.label;
  } else if (mode === 'say') {
    if (!v27SayItems().some(function (item) { return item.id === entry.id && item.lengths.indexOf(entry.skill.slice(4)) >= 0; })) {
      S._v51notice = 'The saved timed description is no longer available. The unresolved record is retained.'; render(); return false;
    }
    v27OpenSay(); v27SayPick(entry.id); v27SayLength(entry.skill.slice(4));
  } else {
    if (!v27GuestDeck(h).some(function (item) { return item.id === entry.id; })) { S._v51notice = 'This guest exercise is no longer available. The unresolved record is retained.'; render(); return false; }
    v27OpenGuest(); v27GuestPick(entry.id);
  }
  V51_TARGET = { entry: entry, houseId: h.id, mode: mode, run: mode === 'quiz' ? S.pool : mode === 'card' ? S._v32run : mode === 'say' ? S._v27say : S._v27guest, card: card, recorded: false };
  render();
  return true;
}
function v51Banner() {
  var t = V51_TARGET;
  if (!t) return '';
  var present = (t.mode === 'quiz' && (S.view === 'quiz' || S.view === 'results') && S.pool === t.run)
    || (t.mode === 'card' && S.view === 'housedeck' && S._v32run === t.run)
    || (t.mode === 'say' && S.view === 'housesay' && S._v27say === t.run)
    || (t.mode === 'guest' && S.view === 'houseguest' && S._v27guest === t.run);
  if (!present) return '';
  var status = t.recorded ? (t.correct ? 'This exact skill was recovered.' : 'This skill still needs practice.') : 'Retrieve the answer first; then check the full explanation.';
  return '<aside class="v51-target" aria-label="Targeted recovery"><p class="v51-eyebrow">Targeted recovery: ' + v51Esc(t.entry.label) + '</p><p>'
    + v51Esc(status) + ' Original scope: ' + v51Esc(v51Level(t.entry.level)) + '.</p><p class="v51-small">'
    + (t.mode === 'quiz' ? 'The target is mixed with related questions. It repairs the original scope; other answers record in your current course scope. ' : '')
    + 'Each missed skill remains independent.</p>'
    + '<button type="button" class="btn ghost" data-v51-open="">Return to outstanding skills</button></aside>';
}
function v51Wire(box) {
  if (box._v51wired) return;
  box._v51wired = true;
  box.addEventListener('click', function (event) {
    var node = event.target && event.target.closest ? event.target.closest('[data-v51-open],[data-v51-retest]') : null;
    if (!node || !box.contains(node)) return;
    event.preventDefault(); event.stopPropagation();
    if (node.hasAttribute('data-v51-open')) v51Open(node.getAttribute('data-v51-open'));
    else v51Start(node.getAttribute('data-v51-retest'));
  });
}
/* Changing an exercise ends the targeted context. Typing a new answer does
   not change the exact skill; layer50 invalidates its previous assessment. */
['v27SayPick', 'v27SayLength', 'v27GuestMove', 'v27GuestPick'].forEach(function (name) {
  if (typeof window[name] !== 'function') return;
  var before = window[name];
  window[name] = function () { V51_TARGET = null; return before.apply(this, arguments); };
});
/* A fresh answer to the same prompt remains a recovery of its original key,
   whether the learner presses Try again or edits and checks the response. */
['v27SayAgain', 'v27SayCheck', 'v27GuestAgain', 'v27GuestCheck'].forEach(function (name) {
  var before = window[name], mode = name.indexOf('Say') >= 0 ? 'say' : 'guest';
  if (typeof before !== 'function') return;
  window[name] = function () {
    var target = V51_TARGET, run = mode === 'say' ? S._v27say : S._v27guest;
    if (target && target.mode === mode && target.run === run) {
      var same = mode === 'say' ? run.id === target.entry.id && run.length === target.entry.skill.slice(4)
        : v27GuestCard() && v27GuestCard().id === target.entry.id;
      if (same) { target.recorded = false; target.correct = undefined; }
      else V51_TARGET = null;
    }
    return before.apply(this, arguments);
  };
});
var _v51Rehearsal = v48RehearsalHtml;
v48RehearsalHtml = function () {
  var entries = v51Entries(), known = entries.filter(function (entry) { return entry.known; }).length;
  return '<section class="v51-entry"><h3>Revisit exact skills</h3><p>Correct the precise point you missed, with the original explanation and an independent retest.</p>'
    + v51Door('Open outstanding skills', known + ' current skill' + (known === 1 ? '' : 's') + ' to revisit' + (entries.length > known ? '; unmatched saved records also available' : '')) + '</section>'
    + _v51Rehearsal.apply(this, arguments);
};
var _v51DeckHtml = v32DeckHtml;
v32DeckHtml = function () {
  var html = _v51DeckHtml.apply(this, arguments);
  if (S._v32deck === 'list-weak' || S._v32deck === 'due') html = html.replace('</div>', '</div><div class="v51-entry">' + v51Door('Revisit the exact missed skills', 'A general wine card does not clear a separate service, pairing or description miss.') + '</div>');
  return html;
};
var _v51CardHtml = v32CardHtml;
v32CardHtml = function () {
  var html = _v51CardHtml.apply(this, arguments), run = S._v32run, card = v32RunCard();
  var targetedCard = V51_TARGET && V51_TARGET.mode === 'card' && V51_TARGET.run === run;
  if (run && card && card.kind === 'house' && !targetedCard) {
    var entries = v51WineEntries(card.id);
    if (entries.length) html += '<div class="v51-entry">' + v51Door('Practise the outstanding skills for this wine', entries.map(function (entry) { return entry.label; }).filter(function (label, i, labels) { return labels.indexOf(label) === i; }).join(', '), card.id) + '<p class="v51-small">Got it on this card records general recall only.</p></div>';
  }
  return html;
};
var _v51Act = v32Act;
v32Act = function (action) {
  var target = V51_TARGET;
  if (action === 'runmisses' && target && target.mode === 'card' && target.run === S._v32run && v51Entry(target.entry.key)) return v51Start(target.entry.key);
  return _v51Act.apply(this, arguments);
};
var _v51Build = v32Build;
v32Build = function () { var box = _v51Build.apply(this, arguments); v51Wire(box); return box; };
var _v51Render = render;
render = function () {
  var result = _v51Render.apply(this, arguments), view = document.getElementById('view'), banner = v51Banner();
  if (view && banner && !view.querySelector('.v51-target')) { view.insertAdjacentHTML('afterbegin', banner); v51Wire(view.querySelector('.v51-target')); }
  return result;
};
V25_VIEWS.houserecovery = v51View;
V25_GO.houserecovery = function () { v51Open(''); };
V32_PARENT.houserecovery = 'houserehearsal';
V32_OWNER.houserecovery = 'brennans'; V25_UNDER.houserecovery = 'brennans'; V25_HUB.houserecovery = 'brennans'; V25_AREA.houserecovery = 'brennans'; V41_REDRAW.houserecovery = 1;
var _v51Route = v32Route;
v32Route = function () { if (S.view === 'houserecovery') return { view: 'houserecovery', key: 'houserecovery/' + (S._v51wine || ''), hash: '#/v/houserecovery' + (S._v51wine ? '/' + S._v51wine : '') }; return _v51Route.apply(this, arguments); };
var _v51Apply = v32Apply;
v32Apply = function (route) { if (route && route.view === 'houserecovery') { S._v51wine = /^w-[a-z0-9]{8}$/.test(route.arg || '') ? route.arg : ''; S.view = 'houserecovery'; return route; } return _v51Apply.apply(this, arguments); };
/* Layer registration precedes the normal boot. A warm script injection may
   already have read the route, so make the new deep link available once. */
if (typeof V32 !== 'undefined' && !V32.moved && /^#\/v\/houserecovery(?:\/|$)/.test(V32.initialHash || location.hash)) {
  v32Apply(v32Parse(V32.initialHash || location.hash), v32CurState()); V32.pend = 'replace';
  if (V32.booted) render();
}
