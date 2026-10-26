/* The answer opens a reading, not another round. House identities and grades
   are unchanged. Question readings are captured when dealt so a later house
   refresh cannot silently change the explanation of a completed answer. */
function v49Text(value) { return typeof value === 'string' ? value : ''; }
function v49Kept(item, key) { var mark = item && item[key]; return v27Kept(mark) ? mark.value : null; }
function v49Find(h, id) {
  var found = null;
  ['wines', 'dishes', 'cocktails', 'lexicon', 'components', 'scenarios', 'mixUps'].some(function (key) {
    return (h && Array.isArray(h[key]) ? h[key] : []).some(function (item) { if (item.id !== id) return false; found = item; return true; });
  });
  return found;
}
function v49Paras(text) {
  return v49Text(text).split(/\n\s*\n/).filter(Boolean).map(function (p) { return '<p>' + v27Esc(p) + '</p>'; }).join('');
}
function v49Part(label, text) { return v49Text(text).trim() ? '<section class="v49-part"><h4>' + v27Esc(label) + '</h4>' + v49Paras(text) + '</section>' : ''; }
function v49Identity(item) {
  return ['producer', 'vintage', 'region', 'style'].map(function (key) { return v49Text(item[key]); })
    .concat(Array.isArray(item.grapes) ? item.grapes.join(', ') : v49Text(item.grapes)).filter(Boolean).join(' · ');
}
function v49Profile(item, h) {
  if (!item) return '';
  var isWine = item.kind === 'wine' || /^w-[a-z0-9]{8}$/.test(item.id || '');
  var html = '<article class="v49-profile"><h3>' + v27Esc(item.name || item.term || item.title || 'House reference') + '</h3>';
  var identity = v49Identity(item); if (identity) html += '<p class="v49-identity">' + v27Esc(identity) + '</p>';
  var notes = (Array.isArray(item.kept) ? item.kept : []).filter(function (note) { return /tell me about it/i.test(note.q || ''); });
  var about = notes[notes.length - 1];
  html += v49Part('The full description', about && about.a || v49Text(v49Kept(item, 'profile')) || v49Text(item.description) || v49Text(item.note));
  var parts = v49Kept(item, 'parts');
  if (parts && typeof parts === 'object') {
    var labels = isWine ? { main:'Place and grapes', technique:'How it is made', sauce:'Style', sides:'Food connections', taste:'Taste and texture' }
      : { main:'Main ingredient', technique:'Preparation', sauce:'Sauce or seasoning', sides:'Accompaniments', taste:'Taste and texture' };
    var rows = Object.keys(labels).filter(function (key) { return v49Text(parts[key]); }).map(function (key) {
      return '<div><dt>' + labels[key] + '</dt><dd>' + v27Esc(parts[key]) + '</dd></div>';
    }).join('');
    if (rows) html += '<dl class="v49-facts">' + rows + '</dl>';
  }
  html += v49Part(isWine ? 'Food and wine' : 'Pairing notes', v49Text(v49Kept(item, 'goesWith')) || v49Text(v49Kept(item, 'pairs')));
  html += v49Part(isWine ? 'Serving the wine' : 'Service', v49Text(v49Kept(item, 'serve')));
  if (isWine) html += v49Part('Saved list prices', [v49Text(item.glass) ? item.glass + ' by the glass' : '', v49Text(item.bottle) ? item.bottle + ' by the bottle' : ''].filter(Boolean).join('\n\n'));
  var lines = v49Kept(item, 'lines');
  html += v49Part('Put it into words', lines && (lines.s45 || lines.s20 || lines.s10) || v49Text(v49Kept(item, 'guest')) || v49Text(v49Kept(item, 'toGuest')));
  html += v49Part('Pronunciation', v49Text(v49Kept(item, 'say')));
  html += v49Part('Understand the ingredient or technique', v49Text(v49Kept(item, 'explain')));
  if (isWine && /^w-[a-z0-9]{8}$/.test(item.id)) {
    html += '<p><a class="v49-profile-link" href="#/v/cellar/' + item.id + '">Open the complete wine profile</a></p>';
  }
  html += v49Part('Before service', v49Text(item.serviceNote));
  return html + '</article>';
}
function v49Reading(title, body, extra) {
  if (!body) return '';
  return '<details class="v49-learn"><summary>Learn why<span class="v49-summary">' + v27Esc(title || 'Read the full explanation') + '</span></summary>'
    + '<div class="v49-reading">' + body + (extra || '')
    + '<p class="v49-foot">This reading does not change your answer or study record. Close it to continue the same round.</p></div></details>';
}
function v49Pairing(item, kind, h) {
  var p = v49Kept(item, 'pairing');
  if (!p || typeof p !== 'object') return '';
  var zero = kind === 'zeroProofFor', wine = v49Find(h, zero ? p.zeroProofId : p.wineId);
  var html = v49Part('Why this is the saved answer', zero ? p.zeroProofWhy : p.whyThisWine || p.why);
  if (!zero) {
    html += v49Part('How the pairing works', p.palate);
    html += v49Part('A tableside explanation', p.sayIt);
    html += v49Part('An alternative', p.secondWhy);
  }
  html += v49Part('Service context', p.serve);
  html += '<p class="v49-boundary">This question recalls the house\'s saved recommendation. Other pairings can work; the choice still depends on the dish, the guest and the bottle available.</p>';
  return html + v49Profile(wine, h);
}
function v49Producer(row, h) {
  if (!row) return '';
  var body = '<article class="v49-profile"><h3>' + v27Esc(row.who || row.name) + '</h3>'
    + v49Part('Place and history', [row.where, row.founded ? 'Founded ' + row.founded : '', row.history].filter(Boolean).join('\n\n'))
    + v49Part('What to remember', (row.facts || []).join('\n\n'))
    + v49Part('Put it into words', row.sayIt) + v49Part('Details to confirm', (row.notes || []).concat(row.ask || []).join('\n\n'));
  (row.wines || []).forEach(function (wine) {
    body += '<details class="v49-example"><summary>Our wine: ' + v27Esc(wine.name) + '</summary>' + v49Profile(v49Find(h, wine.id), h) + '</details>';
  });
  return body + '</article>';
}
function v49QuestionReading(dq, kind, h) {
  var item = v49Find(h, dq && dq.itemId); if (!item) return '';
  var body = '';
  if (/^producer/.test(kind)) {
    var rows = [];
    if (kind === 'producerOf') rows = v38RowsFor(h, item.id);
    else if (kind === 'producerPour') { var pair = v49Kept(item, 'pairing'); rows = pair ? v38RowsFor(h, pair.wineId) : []; }
    else { var row = v38RowById(h, item.id); if (row) rows = [row]; }
    body = v49Part('Why this is the saved answer', 'Use the kept producer record and its linked house wines below. Distinguish the estate, the place and the individual bottling; a producer can make more than one wine.');
    if (kind === 'producerPour') body += v49Part('The dish', item.description) + v49Pairing(item, 'firstPickFor', h);
    body += rows.map(function (row) { return v49Producer(row, h); }).join('');
  } else if (kind === 'firstPickFor' || kind === 'zeroProofFor') {
    body = v49Part('The dish', item.description) + v49Pairing(item, kind, h);
  } else {
    var reason = kind === 'section' ? 'The saved list places this wine in ' + (item.section || dq.answer) + '. A menu section is an organising choice, not a legal wine classification.'
      : kind === 'serve' ? 'The service description in the question belongs to this wine in the saved house notes. It is a recognition exercise, not a claim that no other wine can use similar service.'
      : kind === 'wineGoesWith' ? 'The food description in the question is the saved connection for this wine. Compare the structure and flavour notes below, then explain the connection in your own words.'
      : kind === 'wineGrapes' ? 'The recorded grapes identify the saved wine in this question. Use its place, style and production notes below to connect those grapes to what you would describe at the table.'
      : 'The answer follows the saved house record. Read the identity and description below, then explain which details connect the question to this answer.';
    body = v49Part('Why this is the saved answer', reason) + v49Profile(item, h);
  }
  return v49Reading(item.name, body, '<p class="v49-boundary">Study the saved collection. Confirm the current list, vintage, price and availability before service.</p>');
}
var _v49Question = v27Question;
v27Question = function (dq, key, label, cat) {
  var q = _v49Question.apply(this, arguments);
  if (q) {
    var labels = { firstPickFor: 'Which wine is the saved first recommendation for this dish?', zeroProofFor: 'Which drink is the saved recommendation without alcohol for this dish?',
      serve: 'Which wine has this saved service note?', wineGoesWith: 'Which wine has this saved food description?', section: 'Where is this wine filed in the saved list?',
      producerOf: 'Who makes this wine in the saved house collection?', producerWhere: 'Where is this producer based in the saved notes?',
      producerDish: 'Which of our wines belongs to this producer in the saved collection?', producerPour: 'Whose wine is the saved first recommendation for this dish?' };
    if (labels[key]) q.q = v27Esc(labels[key]) + '<br>' + v27Esc(dq.stem);
    q._v49reading = v49QuestionReading(dq, key, v27Current());
  }
  return q;
};
function v49ForQuestion(q) {
  if (!q) return '';
  if (q._v49reading) return q._v49reading;
  var m = /^(?:h-)?(w-[a-z0-9]{8})-/.exec(q.id || ''), h = v27Current();
  if (!m) return '';
  var item = v49Find(h, m[1]) || v27BottleById(m[1]);
  if (!item) return '';
  return v49Reading(item.name || bottleLabel(item), v49Part('Why this is the saved answer',
    'Use the recorded identity and profile below to explain the answer. Printed prices and vintages are study details; confirm today\'s list before quoting them.') + v49Profile(item, h));
}
var _v49Reveal = revealBlock;
revealBlock = function (q) {
  var box = _v49Reveal.apply(this, arguments), html = v49ForQuestion(q);
  if (html) {
    var row = box.querySelector('.nextrow');
    if (row) row.insertAdjacentHTML('beforebegin', html); else box.insertAdjacentHTML('beforeend', html);
  }
  return box;
};
var _v49Results = resultsView;
resultsView = function () {
  var box = _v49Results.apply(this, arguments), misses = (S.results || []).filter(function (r) { return r && !r.ok; });
  Array.prototype.forEach.call(box.querySelectorAll('.misslist .miss'), function (node, i) {
    var html = misses[i] && v49ForQuestion(misses[i].q); if (html) node.insertAdjacentHTML('beforeend', html);
  });
  var correct = (S.results || []).filter(function (r) { return r && r.ok && v49ForQuestion(r.q); });
  if (correct.length) {
    var html = '<details class="v49-completed"><summary>Revisit correct answers (' + correct.length + ')</summary>'
      + correct.map(function (r) { return '<section class="miss"><div class="mq">' + r.q.q + '</div><div class="ma">' + ansOf(r.q) + '</div>' + v49ForQuestion(r.q) + '</section>'; }).join('') + '</details>';
    var actions = box.querySelector('.centerrow');
    if (actions) actions.insertAdjacentHTML('beforebegin', html); else box.insertAdjacentHTML('beforeend', html);
  }
  return box;
};
function v49Word(c) {
  var h = v27Current(), term = v49Find(h, c.id);
  var body = v49Part('Meaning at the table', c.back);
  if (term) {
    body += v49Part('Pronunciation', v49Text(v49Kept(term, 'say')));
    (h.components || []).filter(function (component) { return (component.termIds || []).indexOf(term.id) !== -1 && v49Text(v49Kept(component, 'explain')); }).forEach(function (component) {
      body += '<details class="v49-example"><summary>Understand ' + v27Esc(component.name || component.title || term.term) + '</summary>' + v49Profile(component, h) + '</details>';
    });
    (term.itemIds || []).forEach(function (id) {
      var item = v49Find(h, id); if (item) body += '<details class="v49-example"><summary>' + v27Esc(item.name) + '</summary>' + v49Profile(item, h) + '</details>';
    });
  }
  return v49Reading(c.front, body);
}
var _v49CardFace = v32CardFace;
v32CardFace = function (c, run) {
  var html = _v49CardFace.apply(this, arguments);
  if (!run || !run.flip || !c) return html;
  if (c.kind === 'word') return html + v49Word(c);
  if (c.kind === 'house') {
    var h = v27Current(), item = v49Find(h, c.id);
    return html + v49Reading(item && item.name, v49Profile(item, h));
  }
  if (c.kind === 'producer') return html + v49Reading(c.front, v49Producer(v38RowById(v27Current(), c.id), v27Current()));
  if (c.kind === 'component') {
    var house = v27Current(), component = v49Find(house, c.id);
    var body = v49Part('The full answer', c.back) + v49Profile(component, house);
    (component && component.itemIds || []).forEach(function (id) {
      var item = v49Find(house, id);
      if (item) body += '<details class="v49-example"><summary>In our collection: ' + v27Esc(item.name) + '</summary>' + v49Profile(item, house) + '</details>';
    });
    return html + v49Reading(c.front, body);
  }
  return html;
};
var _v49ReciteBack = v27ReciteBack;
v27ReciteBack = function (wine) { return _v49ReciteBack.apply(this, arguments) + v49Reading(wine.name, v49Profile(wine, v27Current())); };
var _v49CellarRecite = cellarReciteView;
cellarReciteView = function () {
  var box = _v49CellarRecite.apply(this, arguments), run = S._cw;
  if (run && run.revealed && run.deck[run.idx]) {
    var wine = run.deck[run.idx], h = v27Current(), detail = v49Find(h, wine.id) || wine;
    var answer = box.querySelector('.dispute');
    if (answer) answer.insertAdjacentHTML('afterend', v49Reading(detail.name, v49Profile(detail, h)));
  }
  return box;
};
if (V25_VIEWS.cellarrecite) V25_VIEWS.cellarrecite = cellarReciteView;
var _v49SayResult = v27SayResultHtml;
v27SayResultHtml = function (grade) {
  var h = v27Current(), item = v49Find(h, grade.itemId);
  return _v49SayResult.apply(this, arguments) + v49Reading(item && item.name,
    v49Part('Build a useful description', 'Start with the wine and its place, add the most useful flavour or texture, then connect it to the guest. The word check is a rehearsal aid; review the meaning and accuracy yourself.') + v49Profile(item, h));
};
var _v49GuestResult = v27GuestResultHtml;
v27GuestResultHtml = function (grade) {
  var h = v27Current(), card = v27GuestCard(), source = card && v49Find(h, card.id);
  var body = v49Part('The full response', grade.keptYou) + v49Part('The service principle', grade.principle);
  var ids = source ? source.itemIds || [source.aId, source.bId].filter(Boolean) : [];
  ids.forEach(function (id) {
    var item = v49Find(h, id); if (item) body += '<details class="v49-example"><summary>Understand ' + v27Esc(item.name) + '</summary>' + v49Profile(item, h) + '</details>';
  });
  body += v49Part('Practise the reasoning', 'Name what the guest needs, explain the recommendation and identify any detail that requires confirmation. Matching words alone does not establish a safe or thoughtful response.');
  return _v49GuestResult.apply(this, arguments) + v49Reading(card && card.title, body);
};

/* The original quiz binds Enter to Next on document. Let native summaries,
   reading links and controls keep their own keys instead of skipping a question. */
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener('keydown', function (event) {
    var target = event.target;
    if (target && target.closest && target.closest('.v49-learn,.v49-completed') && /^(Enter| |[1-4])$/.test(event.key)) event.stopPropagation();
  }, true);
}
