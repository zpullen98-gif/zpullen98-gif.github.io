/* The Wine Workshop. Technique readings use the canonical atlas pipeline;
   cards keep their original positions, questions keep their minted IDs.
   Depth and search are session choices, never a second progress store. */
var V46 = { query: '', group: '', depth: 'certified' };
var V46_GROUPS = [['sparkling','Sparkling'],['sweet','Sweet wines'],['fortified','Fortified wines'],['contact','Colour and skins'],['winery','In the cellar'],['vineyard','In the vineyard'],['terroir','Terroir'],['ageing','Ageing']];
function v46List() { return v39List(v39Data() && v39Data().techniques); }
function v46Find(id) { return v46List().filter(function (t) { return t.slug === id; })[0] || null; }
function v46Group(key) { var row = V46_GROUPS.filter(function (g) { return g[0] === key; })[0]; return row ? row[1] : 'Wine techniques'; }
function v46DepthName(depth) { return depth === 'master' ? 'Grand Cru' : depth === 'advanced' ? 'Premier Cru' : 'Village foundations'; }
function v46Allows(item, depth) { return !item.depth || (depth === 'master') || (depth === 'advanced' && item.depth === 'advanced'); }
function v46Button(label, action, arg, gold) {
  return '<button type="button" class="btn ' + (gold ? 'gold' : 'ghost') + '" data-v46="' + action + '" data-v46-arg="' + v39Esc(arg || '') + '">' + v39Esc(label) + '</button>';
}
function v46Go(id) { return v32Go({view:id ? 'technique' : 'techniques',arg:id || ''},'push'); }
function v46For(key) { return v46List().filter(function (t) { return v39List(t.usedBy).indexOf(key) >= 0; }); }
function v46DepthControl() {
  return '<fieldset class="v46-depth"><legend>Choose your study depth</legend><p>Begin with Village foundations. Add Premier Cru or Grand Cru when you want more detail. This choice changes workshop reading and new study rounds, not your course level or saved marks.</p><div class="v46-actions">'
    + ['certified','advanced','master'].map(function (d) { return '<button type="button" class="v28-chip" data-v46="depth" data-v46-arg="' + d + '" aria-pressed="' + (V46.depth === d) + '">' + v39Esc(d === 'certified' ? 'Village foundations' : 'Include ' + v46DepthName(d)) + '</button>'; }).join('') + '</div></fieldset>';
}

/* Extend the existing lazy reading loader, including its offline cache and
   late-arrival handling. No technique is a geographic alias target. */
var _v46Record = v39Record;
v39Record = function (key) { return _v46Record.apply(this, arguments) || v46Find(String(key || '').replace(/^technique:/,'')); };
var _v46PartName = v39PartName;
v39PartName = function (rec) { return rec && v46Find(rec.slug) === rec ? 'techniques' : _v46PartName.apply(this, arguments); };
['aka','group','usedBy'].forEach(function (key) { if (V39_INDEX_KEYS.indexOf(key) < 0) V39_INDEX_KEYS.push(key); });
var _v46TakePart = v39TakePart;
v39TakePart = function (name, data) {
  if (name === 'techniques' && (!data || data.part !== name || !data.records || !v46List().every(function (t) {
    var r = data.records[t.slug]; return r && typeof r.how === 'string' && Array.isArray(r.steps) && Array.isArray(r.deeper) && Array.isArray(r.sources);
  }))) return false;
  return _v46TakePart.apply(this, arguments);
};
var _v46PageRec = v39PageRec;
v39PageRec = function () { return S.view === 'technique' ? v46Find(S._v46technique) : _v46PageRec.apply(this, arguments); };
var _v46Index = v39Index;
v39Index = function () {
  var ix = _v46Index.apply(this, arguments);
  if (ix && !ix.v46Questions) { v46List().forEach(function (t) { v39List(t.questions).forEach(function (q) { if (q.id) ix.qids[q.id] = 1; }); }); ix.v46Questions = true; }
  return ix;
};

V32_PARENT.techniques = 'library'; V32_PARENT.technique = 'techniques';
['techniques','technique'].forEach(function (key) { V32_OWNER[key] = 'library'; V25_UNDER[key] = 'library'; V25_HUB[key] = 'library'; });
V25_GO.techniques = function () { v46Go(''); };
V25_GO.technique = function (arg) { v46Go(arg); };
var _v46Arg = v32Arg;
v32Arg = function (view) { return view === 'technique' ? S._v46technique || '' : _v46Arg.apply(this, arguments); };
var _v46Apply = v32Apply;
v32Apply = function (route, state) {
  if (route && (route.view === 'technique' || route.view === 'techniques')) {
    var t = route.view === 'technique' && v46Find(route.arg);
    S.view = t ? 'technique' : 'techniques'; S._v46technique = t ? t.slug : ''; S._v25area = 'library'; S._v28edit = false;
    if (t) delete V39_PARTS.failed.techniques;
    return {view:S.view,arg:S._v46technique};
  }
  return _v46Apply.apply(this, arguments);
};
var _v46Parent = v32ParentRoute;
v32ParentRoute = function () {
  if (S.view === 'technique') return {view:'techniques'};
  if (S.view === 'techniques') return {view:'library'};
  if (S.view === 'deck' && /^technique:/.test(S._v32deck || '')) return {view:'technique',arg:S._v32deck.slice(10)};
  if (S.view === 'deck' && /^techniques($|:)/.test(S._v32deck || '')) return {view:'techniques'};
  return _v46Parent.apply(this, arguments);
};
var _v46MainName = v25MainName;
v25MainName = function () { var t = S.view === 'technique' && v46Find(S._v46technique); return t ? t.name : S.view === 'techniques' ? 'The Wine Workshop' : _v46MainName.apply(this, arguments); };

function v46Sources(rec, indexes) {
  var sources = v39List(rec.sources), chosen = Array.isArray(indexes) ? indexes : sources.map(function (_, i) { return i; });
  return '<ul class="v46-sources">' + chosen.filter(function (i) { return sources[i]; }).map(function (i) {
    var s = sources[i], text = v39Esc(s.title) + (s.asOf ? ' · ' + v39Esc(s.asOf) : '');
    return '<li>' + (i + 1) + '. ' + (/^https:\/\//.test(s.url || '') ? '<a href="' + v39Esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + text + '<span class="sr-only"> (opens in a new tab)</span></a>' : text) + '</li>';
  }).join('') + '</ul>';
}
function v46Deeper(rec, sec) {
  var rows = v39List(rec.deeper).filter(function (d) { return d.sec === sec && v46Allows(d,V46.depth); });
  return rows.map(function (d) { return '<aside class="v46-deeper"><p class="v46-eyebrow">' + v39Esc(v46DepthName(d.depth)) + ' study</p>'
    + (d.head ? '<h4>' + v39Esc(d.head) + '</h4>' : '') + v39Paras(d.text) + '<details><summary>Sources for this explanation</summary>' + v46Sources(rec,d.src) + '</details></aside>'; }).join('');
}
function v46Section(rec, key, title, body, open) {
  var deep = v46Deeper(rec,key);
  return body || deep ? '<details class="v46-section" data-v46-section="' + key + '"' + (open ? ' open' : '') + '><summary>' + title + '</summary><div class="v46-body">' + body + deep + '</div></details>' : '';
}
function v46Reading(rec) {
  var steps = '<ol class="v46-steps">' + v39List(rec.steps).map(function (step) { return '<li><h4>' + v39Esc(step[0]) + '</h4><p>' + v39Esc(step[1]) + '</p></li>'; }).join('') + '</ol>';
  var html = v46Section(rec,'how','How it works',v39Paras(rec.how) + steps,true)
    + v46Section(rec,'why','What it can give the wine',v39Paras(rec.why))
    + v46Section(rec,'law','Rules and label language',v39Paras(rec.law))
    + v46Section(rec,'where','Explore it in the atlas',v39Pairs(rec.where) + v46PlaceDoors(rec))
    + v46Section(rec,'exam','Recall and avoid common mix-ups','<h4>Recall aloud</h4>' + v39Lines(rec.exam) + '<h4>Keep these distinctions clear</h4>' + v39Lines(rec.traps))
    + v46Section(rec,'say','Say it with confidence',v39Pairs(rec.say));
  if (V46.depth === 'certified') html += '<p class="v46-small">The foundation is complete here. Choose a deeper study level above to add the Premier Cru and Grand Cru explanations.</p>';
  return html + '<details class="v46-section" data-v46-section="sources"><summary>Sources and further reading</summary><div class="v46-body">' + v46Sources(rec) + '</div></details>';
}
function v46PlaceDoors(rec) {
  var keys = v39List(rec.usedBy).slice();
  v39List(rec.where).forEach(function (row) { var key = v39SlugFor(row[0]); if (key && keys.indexOf(key) < 0) keys.push(key); });
  return '<div class="v46-actions">' + keys.map(function (key) {
    var r = _v46Record(key); return r ? v46Button(r.name,'place',key) : '';
  }).join('') + '</div>';
}
function v46StudyActions(rec) {
  return '<div class="v46-actions">' + v46Button('Recall cards (' + v46Cards(rec).length + ')','deck',rec.slug,true)
    + v46Button('Test your understanding (' + v46Questions([rec.slug]).length + ')','drill',rec.slug) + '</div>';
}
function v46LessonView() {
  var rec = v46Find(S._v46technique); if (!rec) return v46IndexView();
  var ready = v39RecReady(rec);
  if (!ready) v39Fetch('techniques');
  var html = '<div class="v25page v46 v46-lesson">' + v32Head(rec.name,v46Group(rec.group) + ' · The Wine Workshop')
    + '<p class="v46-lead">' + v39Esc(rec.summary) + '</p><div class="v46-actions">' + v46Button('All techniques','index') + '</div>'
    + v46DepthControl() + v46StudyActions(rec)
    + (ready ? v46Reading(rec) : v39WaitHtml('techniques'))
    + '<section class="v46-rehearsal"><h3>Bring it to the table</h3><ol><li>Name the technique and explain one step without looking.</li><li>Describe one possible effect on flavour or texture, then say what could change that result.</li><li>Choose a verified bottle from the cellar. Give a short guest explanation, checking the producer’s information before attributing a technique to that wine.</li></ol><p>These spoken prompts are unscored. The cards and questions record your answers through the existing study tools.</p>'
    + v46StudyActions(rec) + v46Button('Explore the cellar studies','cellar') + '</section>';
  if (ready && v39List(rec.related).length) html += '<section class="v46-related"><h3>Follow the next connection</h3><div class="v46-actions">' + rec.related.map(function (id) { var t = v46Find(id); return t ? v46Button(t.name,'lesson',id) : ''; }).join('') + '</div></section>';
  html += '</div>';
  var view = document.createElement('div'); view.innerHTML = html; v39Wire(view); return view;
}
function v46Filtered() {
  var tokens = v39Fold(V46.query).split(' ').filter(Boolean);
  return v46List().filter(function (t) {
    var hay = v39Fold([t.name,t.summary,v46Group(t.group)].concat(v39List(t.aka)).join(' '));
    return (!V46.group || t.group === V46.group) && tokens.every(function (token) { return hay.indexOf(token) >= 0; });
  });
}
function v46Results(view) {
  var root = view.querySelector('#v46-results'); if (!root) return;
  var rows = v46Filtered();
  root.innerHTML = V46_GROUPS.map(function (group) {
    var members = rows.filter(function (t) { return t.group === group[0]; }); if (!members.length) return '';
    return '<section class="v46-group"><h3>' + group[1] + '</h3><ul>' + members.map(function (t) {
      return '<li><button type="button" data-v46="lesson" data-v46-arg="' + v39Esc(t.slug) + '"><span>' + v39Esc(t.name) + '</span><small>' + v39Esc(t.summary) + '</small></button></li>';
    }).join('') + '</ul></section>';
  }).join('') || '<p class="v46-empty">No techniques match. Try a method, a flavour or a group, or clear the filters.</p>';
  view.querySelector('#v46-count').textContent = rows.length + ' of ' + v46List().length + ' techniques';
}
function v46IndexView() {
  var html = '<div class="v25page v46 v46-index">' + v32Head('The Wine Workshop','From vineyard and cellar to a confident conversation')
    + '<section class="v46-intro"><p class="v46-eyebrow">The explorer’s workshop</p><h3>Learn the choice behind the wine</h3><p>Read one technique, recall how it works, then connect it to a place and a bottle. Follow a short route below or explore all ' + v46List().length + ' lessons.</p>'
    + '<div class="v46-actions">' + v46Button('Begin with bubbles','lesson','traditional-method',true) + v46Button('Understand texture','lesson','lees-batonnage') + v46Button('Read the landscape','lesson','soils-drainage') + '</div></section>'
    + v46DepthControl() + '<div class="v46-filters"><div><label for="v46-find">Find a technique</label><input id="v46-find" class="sainput" type="search" maxlength="160" autocomplete="off" placeholder="Oak, lees, frost…" value="' + v39Esc(V46.query) + '"></div><div><label for="v46-group">Explore a group</label><select id="v46-group" class="sainput"><option value="">Every group</option>'
    + V46_GROUPS.map(function (g) { return '<option value="' + g[0] + '"' + (V46.group === g[0] ? ' selected' : '') + '>' + g[1] + '</option>'; }).join('') + '</select></div></div>'
    + '<div class="v46-actions"><p id="v46-count" role="status" aria-live="polite"></p>' + v46Button('Clear filters','clear') + '</div><div id="v46-results"></div>'
    + '<section class="v46-rehearsal"><h3>A small recall round</h3><p>Use the current study depth. Start with a few cards, then revisit anything marked Again.</p><div class="v46-actions">'
    + v46Button('Study technique cards','all-cards','',true) + v46Button('Ten technique questions','drill') + '</div></section></div>';
  var view = document.createElement('div'); view.innerHTML = html; v46Results(view);
  view.querySelector('#v46-find').addEventListener('input',function (e) { V46.query = e.target.value; v46Results(view); });
  view.querySelector('#v46-group').addEventListener('change',function (e) { V46.group = e.target.value; v46Results(view); });
  return view;
}
V25_VIEWS.techniques = v46IndexView; V25_VIEWS.technique = v46LessonView;
V42_PATHS.forEach(function (path) {
  if (path.id === 'region') path.steps.splice(2,0,['route','techniques','Understand a growing or cellar choice','Connect a technique to the region, then explain its possible effect in plain language.']);
});

/* Build identity before filtering, so a card never inherits a different
   mark when the reader changes depth. Existing region cards are untouched. */
function v46Cards(rec) {
  return v39List(rec.cards).map(function (c,i) {
    return {id:'t:' + rec.slug + '/' + i,kind:'region',front:c.f,back:c.b,label:rec.name,technique:rec.slug,depth:c.depth};
  }).filter(function (c) { return c.front && c.back && v46Allows(c,V46.depth); });
}
function v46DeckRecords(id) {
  if (id === 'techniques') return v46List();
  if (/^technique:/.test(id)) { var rec = v46Find(id.slice(10)); return rec ? [rec] : []; }
  if (/^techniques:/.test(id)) return v46List().filter(function (t) { return t.group === id.slice(11); });
  return [];
}
var _v46DeckDef = v32DeckDef;
v32DeckDef = function (id) {
  if (!/^techniques?($|:)/.test(String(id))) return _v46DeckDef.apply(this,arguments);
  var records = v46DeckRecords(String(id)), cards = [];
  records.forEach(function (t) { cards = cards.concat(v46Cards(t)); });
  var def = {id:id,kind:'region',name:(records.length === 1 ? records[0].name : 'The Wine Workshop') + ' · ' + v46DepthName(V46.depth),cards:cards};
  def.learnt = v32Learnt(def); return def;
};
var _v46DeckHtml = v32DeckHtml;
v32DeckHtml = function () {
  var html = _v46DeckHtml.apply(this,arguments);
  if (!/^techniques?($|:)/.test(S._v32deck || '')) return html;
  var at = html.indexOf('<section class="v43-round"'); if (at < 0) at = html.indexOf('<button type="button" class="btn gold v32-go"');
  return at < 0 ? html : html.slice(0,at) + '<div class="v46">' + v46DepthControl() + '</div>' + html.slice(at);
};
var _v46CardFace = v32CardFace;
v32CardFace = function (card, run) {
  var html = _v46CardFace.apply(this,arguments);
  if (card && card.technique && run && run.flip) html += '<div class="v46"><p class="v46-small">' + v39Esc(v46DepthName(card.depth)) + ' study</p>'
    + v46Button('Return to the technique reading','lesson',card.technique) + '</div>';
  return html;
};
function v46Questions(ids) {
  var out = [], seen = {};
  ids.forEach(function (id) { var t = v46Find(id); if (t) v39List(t.questions).forEach(function (q) {
    if (q.id && !seen[q.id] && v39Valid(q) && v46Allows(q,V46.depth)) { seen[q.id] = true; out.push(q); }
  }); }); return out;
}
function v46StartDrill(id) {
  var ids = id ? [id] : v46List().map(function (t) { return t.slug; });
  var qs = v39Shuffle(v46Questions(ids)); if (!qs.length) return false;
  if (!id) qs = qs.slice(0,10);
  if (typeof stopTimer === 'function') stopTimer();
  S._fin = null; S._v25lt = null; S.mode = 'drill'; S.section = 'The Wine Workshop';
  S._again = function () { v46StartDrill(id); }; S.pool = qs; S.idx = 0; S.correct = 0; S.results = [];
  if (typeof resetQ === 'function') resetQ(); S.view = 'quiz';
  if (!(typeof V32_RUN !== 'undefined' && V32_RUN && V32_RUN[V32.view])) V32.pend = 'push';
  render(); return true;
}

/* Doors use exact authored links, not guesses about an individual bottle. */
function v46DoorHtml(key) {
  var rows = v46For(key); if (!rows.length) return '';
  return '<section class="v46 v46-links"><h3>Understand the techniques</h3><p>Connect the regional reading to how the wine is grown and made.</p><div class="v46-actions">' + rows.map(function (t) { return v46Button(t.name,'lesson',t.slug); }).join('') + '</div></section>';
}
var _v46Notes = v45NotesHtml;
v45NotesHtml = function (m) { return _v46Notes.apply(this,arguments) + v46DoorHtml(m.type === 'region' ? m.id : m.countryKey); };
function v46Decorate() {
  var view = document.getElementById('view'); if (!view) return;
  if ((S.view === 'region' || S.view === 'country') && !view.querySelector('.v46-links')) {
    var root = view.querySelector('.v39-article,.v39-country'), head = root && root.querySelector('.viewhead');
    var html = v46DoorHtml(S.view === 'region' ? S._v39region : S._v39country);
    if (head && html) { var holder = document.createElement('div'); holder.innerHTML = html; head.after(holder); }
  }
}
var _v46Library = v32LibraryView;
v32LibraryView = function () {
  var view = _v46Library.apply(this,arguments), anchor = view.querySelector('.v45-door,.viewhead');
  if (anchor && v46List().length) { var door = document.createElement('section'); door.className = 'v46 v46-intro'; door.innerHTML = '<h3>The Wine Workshop</h3><p>Explore vineyard and cellar techniques, with clear foundations, deeper study and recall.</p>' + v46Button('Enter the workshop','index','',true); anchor.after(door); }
  return view;
};
V25_VIEWS.library = v32LibraryView;
var _v46Today = v32TodayRows;
v32TodayRows = function () { return _v46Today.apply(this,arguments) + (v46List().length ? v32GoRow('techniques','The Wine Workshop','Learn one technique, explain it aloud, then recall it.') : ''); };
var _v46Flashcards = v32FlashcardsHtml;
v32FlashcardsHtml = function () {
  var html = _v46Flashcards.apply(this,arguments); if (!v46List().length) return html;
  var group = v39Group('The Wine Workshop',v32DeckRow('techniques','Technique cards'),'v46-cards');
  var at = html.lastIndexOf('</div>'); return at < 0 ? html + group : html.slice(0,at) + group + html.slice(at);
};
var _v46Search = v44Index;
v44Index = function () {
  var ix = _v46Search.apply(this,arguments); if (ix._v46) return ix; ix._v46 = true;
  ix.learn.push(v44Entry('The Wine Workshop','Vineyard and cellar techniques','methods making wine growing sensory texture', 'route','techniques'));
  v46List().forEach(function (t) { ix.learn.push(v44Entry(t.name,'Technique study: ' + v46Group(t.group),[t.summary,t.aka],'route','technique',t.slug)); }); return ix;
};

document.addEventListener('click',function (event) {
  var node = event.target && event.target.closest ? event.target.closest('[data-v46]') : null;
  if (!node || node.disabled) return; event.preventDefault();
  var action = node.getAttribute('data-v46'), arg = node.getAttribute('data-v46-arg') || '';
  if (action === 'lesson') v46Go(arg);
  else if (action === 'index') v46Go('');
  else if (action === 'deck') v32OpenDeck('technique:' + arg);
  else if (action === 'all-cards') v32OpenDeck('techniques');
  else if (action === 'drill') v46StartDrill(arg);
  else if (action === 'cellar') v40Go('wines');
  else if (action === 'place') { if (v39Find(arg)) v39Open('region',arg,'push'); else if (v39Country(arg)) v39Open('country',arg,'push'); }
  else if (action === 'clear') {
    V46.query = ''; V46.group = ''; var view = node.closest('.v46-index');
    if (view) { view.querySelector('#v46-find').value = ''; view.querySelector('#v46-group').value = ''; v46Results(view); view.querySelector('#v46-find').focus(); }
  } else if (action === 'depth' && ['certified','advanced','master'].indexOf(arg) >= 0) {
    V46.depth = arg; var y = window.scrollY || 0;
    var opened = Array.prototype.map.call(document.querySelectorAll('[data-v46-section][open]'),function (d) { return d.getAttribute('data-v46-section'); });
    V32.pend = 'replace'; render();
    Array.prototype.forEach.call(document.querySelectorAll('[data-v46-section]'),function (d) { d.open = opened.indexOf(d.getAttribute('data-v46-section')) >= 0; });
    window.scrollTo(0,y); var focus = document.querySelector('[data-v46="depth"][data-v46-arg="' + arg + '"]'); if (focus) focus.focus({preventScroll:true});
  }
});
var _v46Render = render;
render = function () { var result = _v46Render.apply(this,arguments); v46Decorate(); return result; };
(function () {
  if (!V32.moved && /^#\/v\/(techniques|technique)(\/|$)/.test(V32.initialHash || '')) { v32Apply(v32Parse(V32.initialHash),v32CurState()); V32.pend = 'replace'; }
})();
