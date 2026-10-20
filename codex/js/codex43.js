/* Small study rounds and clearer tasting rehearsal.
   Reuse every card identity, grading function and history token. Round-size
   choices live only in this tab; no saved progress or schema is added. */
var V43_SIZES = Object.create(null);
var V43_PENDING = null;

function v43FixedDeck(id) {
  return /^(due|misses|one:|cellar-compass$|cellar-path:)/.test(String(id || ''));
}
function v43Size(id) {
  var value = V43_SIZES[String(id || '')];
  return value === 10 || value === 'all' ? value : 20;
}
function v43Count(n) { return n + (n === 1 ? ' card' : ' cards'); }
function v43Shuffled(items) {
  var copy = items.slice();
  return typeof shuffle === 'function' ? shuffle(copy) : copy;
}
/* Read each existing record store once. These are the same verdicts used
   by the collection counts, not a second grading or scheduling system. */
function v43Verdicts(cards) {
  var house = Object.create(null), q = ST && ST.q || {};
  Object.keys(q).forEach(function (key) {
    var bare = key.indexOf('|') >= 0 ? key.slice(key.indexOf('|') + 1) : key;
    var match = /^h-([a-z]-[a-z0-9]{8})-/.exec(bare);
    if (!match) return;
    var rec = q[key] || {}, id = match[1];
    if ((Number(rec.w) || 0) > 0 && !(Number(rec.s) || 0)) house[id] = 'again';
    else if ((Number(rec.c) || 0) + (Number(rec.w) || 0) > 0 && house[id] !== 'again') house[id] = 'got';
  });
  var grapes = typeof v32GrapeRec === 'function' ? v32GrapeRec() : {};
  var regions = typeof v39CardRec === 'function' ? v39CardRec() : {};
  var service = typeof v39SvcRec === 'function' ? v39SvcRec() : {};
  var producers = typeof v38Verdicts === 'function' ? v38Verdicts() : {};
  return cards.map(function (card) {
    var verdict = card.kind === 'grape' ? grapes[card.id]
      : card.kind === 'region' ? regions[card.id]
      : card.kind === 'service' ? service[card.id]
      : card.kind === 'producer' ? producers[card.id + '/' + (Number(card.n) || 0)]
      : house[card.id];
    return { card: card, rank: verdict === 'again' ? 0 : verdict === 'got' ? 2 : 1 };
  });
}
function v43Selection(cards, limit, first, keepOrder) {
  var entries = v43Verdicts(cards), ordered;
  if (keepOrder) ordered = entries;
  else {
    ordered = [0, 1, 2].reduce(function (out, rank) {
      return out.concat(v43Shuffled(entries.filter(function (entry) { return entry.rank === rank; })));
    }, []);
  }
  if (first) {
    var at = ordered.findIndex(function (entry) { return entry.card.id === first; });
    if (at > 0) ordered.unshift(ordered.splice(at, 1)[0]);
  }
  return ordered.slice(0, limit).map(function (entry) { return entry.card; });
}

var _v43Words = v32W;
v32W = function (key, vars) {
  var text = _v43Words.apply(this, arguments);
  if ((key === 'rowLine' || key === 'deckLine') && vars && Number(vars.n) === 1) return text.replace('1 cards', '1 card');
  return text;
};

var _v43DeckHtml = v32DeckHtml;
v32DeckHtml = function () {
  var html = _v43DeckHtml.apply(this, arguments), id = S._v32deck;
  var def = v32DeckDef(id), size = v43Size(id);
  if (!def.cards.length || v43FixedDeck(id)) return html;
  var total = def.cards.length, dealt = size === 'all' ? total : Math.min(size, total);
  var controls = '<section class="v43-round" aria-labelledby="v43-round-title">'
    + '<h3 class="secgroup v32-gh" id="v43-round-title">A manageable round</h3>'
    + '<p class="v32-line">Recall the answer aloud, reveal it, then choose Got it or Again. Your existing marks are kept after each answer.</p>';
  if (total > 10) {
    controls += '<div class="v32chips" role="group" aria-label="Cards in this round">'
      + [10, 20, 'all'].map(function (choice) {
        return '<button type="button" class="v28-chip" data-v43-size="' + choice + '" aria-pressed="' + (choice === size ? 'true' : 'false') + '">'
          + (choice === 'all' ? 'Whole deck (' + total + ')' : v43Count(choice)) + '</button>';
      }).join('') + '</div>';
  }
  var selectionNote = /^item-(components|producers):/.test(String(id))
    ? ' These cards follow the wine card\'s reading order.'
    : ' Cards marked Again come first, then unseen cards. Equal-priority cards are shuffled.';
  controls += '<p class="v32-line" id="v43-round-summary">' + v43Count(dealt) + ' in this round'
    + (dealt < total ? ', from a collection of ' + total + '.' + selectionNote : '.')
    + (def.kind === 'grape' ? ' Cards marked Again return within the round until recalled.'
      : ' At the end, you can revisit the cards marked Again.') + '</p></section>';
  var at = html.indexOf('<button type="button" class="btn gold v32-go"');
  if (at < 0) return html;
  html = html.slice(0, at) + controls + html.slice(at);
  return html.replace(/(id="v32-start">)[^<]+/, '$1Start ' + v43Count(dealt));
};

var _v43Wire = v32Wire;
v32Wire = function (box) {
  _v43Wire.apply(this, arguments);
  Array.prototype.forEach.call(box.querySelectorAll('[data-v43-size]'), function (button) {
    button.onclick = function () {
      var value = button.getAttribute('data-v43-size');
      V43_SIZES[S._v32deck] = value === 'all' ? 'all' : Number(value);
      V32.pend = 'replace';
      render();
      var selected = document.querySelector('[data-v43-size="' + value + '"]');
      if (selected) selected.focus({ preventScroll: true });
    };
  });
  Array.prototype.forEach.call(box.querySelectorAll('[data-v43-another]'), function (button) {
    button.onclick = function () { v32StartRun(button.getAttribute('data-v43-another'), { push: false }); };
  });
};

var _v43StartRun = v32StartRun;
v32StartRun = function (id, options) {
  var opts = Object.assign({}, options || {});
  /* Explicit supplied cards are exact selections, notably miss retries.
     Daily and Compass runs keep their established selection and ordering. */
  if (opts.cards || v43FixedDeck(id)) return _v43StartRun.call(this, id, opts);
  var def = v32DeckDef(id), size = v43Size(id);
  var limit = size === 'all' ? def.cards.length : Math.min(size, def.cards.length);
  var ordered = opts.keepOrder || /^item-(components|producers):/.test(String(id));
  if (limit < def.cards.length) {
    opts.cards = v43Selection(def.cards, limit, opts.first, ordered);
    opts.keepOrder = true;
  }
  var info = { id: id, total: def.cards.length, size: limit, bounded: limit < def.cards.length };
  V43_PENDING = info;
  try {
    var result = _v43StartRun.call(this, id, opts);
    if (result && S._v32run && S._v32run.deckId === id) S._v32run.v43Round = info;
    return result;
  } finally { V43_PENDING = null; }
};

var _v43CardHtml = v32CardHtml;
v32CardHtml = function () {
  var html = _v43CardHtml.apply(this, arguments), run = S._v32run;
  var info = run && (run.v43Round || V43_PENDING);
  if (!run || !info || !info.bounded || run.deck.length) return html;
  html = html.replace(v32W('deckDone'), 'Round complete');
  var note = '<p class="v32-line v43-round-end">You worked through ' + v43Count(info.size)
    + ' from a collection of ' + info.total + '. Take a moment to say one useful idea in your own words.</p>';
  var at = html.indexOf('<div class="v28-btnrow');
  if (at >= 0) html = html.slice(0, at) + note + html.slice(at);
  return html.replace('</div></div>', '<button type="button" class="btn ghost" data-v43-another="' + v32Esc(info.id) + '">Another '
    + v43Count(info.size) + '</button></div></div>');
};

/* The plan already has an adaptive, bounded daily question engine.
   Give new learners that doorway instead of the endless mode. */
var _v43StudyPlan = studyPlan;
studyPlan = function () {
  var plan = _v43StudyPlan.apply(this, arguments);
  plan.acts = plan.acts.map(function (action) {
    if (action.go !== startEndless) return action;
    return Object.assign({}, action, {
      t: 'Build your knowledge in small rounds',
      d: 'You have met ' + plan.cov.pct + ' per cent of this level. Begin with today\'s review questions, then revisit the explanations for anything you missed.',
      go: function () { v32Push(function () { startDaily(); }); }
    });
  });
  return plan;
};

/* A written profile can teach reasoning, but cannot test a person's palate. */
var _v43TastingView = tastingView;
tastingView = function () {
  var view = _v43TastingView.apply(this, arguments);
  if (!view || !view.querySelector || view.querySelector('.v43-tasting-note')) return view;
  var note = document.createElement('p');
  note.className = 'v32-line v43-tasting-note';
  note.textContent = 'A text-based tasting exercise: compare the supplied clues and explain your conclusion. These marks measure profile recall, not sensory tasting ability. Use real wines to develop your palate.';
  view.insertBefore(note, view.firstChild);
  if (S.tt && !view.querySelector('h1,h2')) {
    var title = document.createElement('h2');
    title.className = 'v32-h v43-tasting-title';
    title.tabIndex = -1;
    title.textContent = S.tt.idx >= S.tt.deck.length ? 'Flight review' : 'Text tasting flight';
    view.insertBefore(title, note);
  }
  if (S.tt && S.tt.idx >= S.tt.deck.length) {
    var verdict = view.querySelector('.passfail');
    if (verdict) verdict.textContent = 'PROFILE RECALL COMPLETE';
    var rows = view.querySelectorAll('.miss');
    (S.tt.missed || []).forEach(function (index, position) {
      var grape = GRAPES[index], row = rows[position];
      if (!grape || !row) return;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn small ghost';
      button.textContent = 'Review ' + grape.g;
      button.onclick = function () {
        v32StartRun('grapes-all', { cards: v32GrapeCards([grape]), keepOrder: true, push: true });
      };
      row.appendChild(button);
    });
    var actions = view.querySelector('.centerrow');
    if (actions) {
      var grid = document.createElement('button');
      grid.type = 'button'; grid.className = 'btn ghost'; grid.textContent = 'Read the tasting grid';
      grid.onclick = function () { v32Go({ view: 'tastegrid' }, 'push'); };
      actions.appendChild(grid);
    }
  }
  return view;
};
