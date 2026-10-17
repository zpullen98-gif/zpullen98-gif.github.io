/* The Cellar Compass. Authored readings are separate from wine grades.
   All bottle identities and card answers remain the current house's own.
   Optional recency metadata orders a balanced run without changing grades. */
function v40Data() { return typeof CODEX_CELLAR_COMPASS === 'object' && CODEX_CELLAR_COMPASS ? CODEX_CELLAR_COMPASS : {}; }
function v40Paths() { return Array.isArray(v40Data().paths) ? v40Data().paths : []; }
function v40Workshops() { return Array.isArray(v40Data().workshops) ? v40Data().workshops : []; }
function v40Find(items, id) { return items.find(function (item) { return item.id === id; }) || null; }
function v40Text(value) { return typeof value === 'string' ? value : ''; }
function v40Rows() {
  var h = v32House();
  return v28Wines(h).filter(function (wine) { return !!v28CardOf(wine, h); }).map(function (wine) {
    var parts = v28KV(wine, 'parts') || {}, lines = v28LinesShown(wine), producers = typeof v38RowsFor === 'function' ? v38RowsFor(h, wine.id) : [];
    return { id: wine.id, wine: wine, name: wine.name, section: v40Text(wine.section), bottle: v28IsBottle(wine),
      hay: v28Fold([wine.name, wine.section, wine.producer, wine.wine, wine.region, wine.grape, Array.isArray(wine.grapes) ? wine.grapes.join(' ') : wine.grapes, Object.keys(parts).map(function (key) { return v40Text(parts[key]); }).join(' '),
        producers.map(function (producer) { return producer.name || producer.title || ''; }).join(' '), lines.s10 || ''].join(' ')) };
  });
}
/* House grades deliberately never enter ST.srs. Recency is therefore a small
   separate timestamp map, not a scheduled exam answer or a new wine grade.
   Older answers without a timestamp are never assigned an invented date. */
function v40Timestamp(value, now) { return typeof value === 'number' && isFinite(value) && value > 0 && value <= now ? value : 0; }
function v40Day(value) { var date = new Date(value); return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'); }
function v40RecentClean(raw, now) {
  var clean = {}, time = now == null ? Date.now() : now;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return clean;
  Object.keys(raw).forEach(function (house) {
    if (!/^h-[a-z0-9]{8}$/.test(house) || !raw[house] || typeof raw[house] !== 'object' || Array.isArray(raw[house])) return;
    var wines = {}; Object.keys(raw[house]).forEach(function (id) { var stamp = v40Timestamp(raw[house][id], time); if (/^w-[a-z0-9]{8}$/.test(id) && stamp) wines[id] = stamp; });
    if (Object.keys(wines).length) clean[house] = wines;
  }); return clean;
}
if (typeof ST_DEFAULTS !== 'undefined') ST_DEFAULTS.cellarCompassSeen = {};
ST.cellarCompassSeen = v40RecentClean(ST.cellarCompassSeen);
var _v40StatRecord = statRecord;
statRecord = function (question) {
  var result = _v40StatRecord.apply(this, arguments), match = question && /^h-(w-[a-z0-9]{8})-/.exec(question.id || ''), house = v32House();
  if (match && house && /^h-[a-z0-9]{8}$/.test(house.id) && v28Wines(house).some(function (wine) { return wine.id === match[1]; })) {
    ST.cellarCompassSeen = v40RecentClean(ST.cellarCompassSeen);
    var recent = ST.cellarCompassSeen[house.id] || (ST.cellarCompassSeen[house.id] = {}); recent[match[1]] = Date.now(); stSave();
  } return result;
};
var _v40MergeStats = mergeStats;
mergeStats = function (incoming) {
  var result = _v40MergeStats.apply(this, arguments); if (result) return result;
  var recent = v40RecentClean(incoming && incoming.stats && incoming.stats.cellarCompassSeen), current = v40RecentClean(ST.cellarCompassSeen);
  Object.keys(recent).forEach(function (house) { var wines = current[house] || (current[house] = {}); Object.keys(recent[house]).forEach(function (id) { wines[id] = Math.max(wines[id] || 0, recent[house][id]); }); });
  ST.cellarCompassSeen = current; stSave(); return result;
};
var _v40Rekey = v27Rekey;
v27Rekey = function (from, to) {
  var result = _v40Rekey.apply(this, arguments); if (from === to || !/^w-[a-z0-9]{8}$/.test(to || '')) return result;
  var recent = v40RecentClean(ST.cellarCompassSeen);
  Object.keys(recent).forEach(function (house) { var wines = recent[house]; if (wines[from]) { wines[to] = Math.max(wines[from], wines[to] || 0); delete wines[from]; result++; } });
  ST.cellarCompassSeen = recent; return result;
};
function v40Records(now) {
  var out = Object.create(null), time = now == null ? Date.now() : now, house = v32House(), recent = v40RecentClean(ST.cellarCompassSeen, time);
  var stamps = house && recent[house.id] || {}, qs = ST && ST.q || {};
  Object.keys(qs).forEach(function (key) {
    var bare = key.indexOf('|') >= 0 ? key.slice(key.indexOf('|') + 1) : key, match = /^h-(w-[a-z0-9]{8})-/.exec(bare);
    if (!match) return;
    var q = qs[key] || {}, count = (Number(q.c) || 0) + (Number(q.w) || 0);
    if (!count) return;
    var record = out[match[1]] || (out[match[1]] = { seen: true, weak: false, day: '', stamp: 0 });
    if ((Number(q.w) || 0) > 0 && !(Number(q.s) || 0)) record.weak = true;
    if (stamps[match[1]]) { record.stamp = stamps[match[1]]; record.day = v40Day(record.stamp); }
  });
  return out;
}
function v40DailyIds(now) {
  var records = v40Records(now), day = v40Day(now == null ? Date.now() : now), rows = v40Rows();
  function sort(a, b) {
    var x = records[a.id] || {}, y = records[b.id] || {}, xd = x.day === day ? 1 : 0, yd = y.day === day ? 1 : 0;
    if (xd !== yd) return xd - yd;
    var xr = x.weak ? 0 : !x.seen ? 1 : 2, yr = y.weak ? 0 : !y.seen ? 1 : 2;
    if (xr !== yr) return xr - yr;
    return (x.stamp || 0) - (y.stamp || 0) || a.id.localeCompare(b.id);
  }
  var menu = rows.filter(function (row) { return !row.bottle; }).sort(sort), floor = rows.filter(function (row) { return row.bottle; }).sort(sort);
  var selected = menu.slice(0, 5).concat(floor.slice(0, 5)), used = Object.create(null);
  selected.forEach(function (row) { used[row.id] = true; });
  if (selected.length < 10) selected = selected.concat(rows.filter(function (row) { return !used[row.id]; }).sort(sort).slice(0, 10 - selected.length));
  /* Alternate the two collections, keeping each collection's review order. */
  menu = selected.filter(function (row) { return !row.bottle; }); floor = selected.filter(function (row) { return row.bottle; });
  var ids = []; while (menu.length || floor.length) { if (menu.length) ids.push(menu.shift().id); if (floor.length) ids.push(floor.shift().id); }
  return ids;
}
function v40WineIds(ids) {
  var wanted = Array.isArray(ids) ? ids : [];
  return v40Rows().filter(function (row) { return wanted.indexOf(row.id) >= 0; }).map(function (row) { return row.id; });
}
function v40Decode(arg) {
  var raw = String(arg || ''), split = raw.indexOf('?'), base = split < 0 ? raw : raw.slice(0, split), query = split < 0 ? '' : raw.slice(split + 1);
  var params = new URLSearchParams(query), match = /^(path|workshop)\/([a-z0-9-]+)$/.exec(base);
  return { kind: match ? match[1] : base === 'wines' ? 'wines' : base === 'workshops' ? 'workshops' : 'paths', id: match ? match[2] : '',
    q: (params.get('q') || '').slice(0, 180), type: /^(menu|bottle)$/.test(params.get('type') || '') ? params.get('type') : '',
    section: (params.get('section') || '').slice(0, 180), path: (params.get('path') || '').slice(0, 80) };
}
function v40State() { return v40Decode(S._v40arg || ''); }
function v40Encode(state) {
  if (state.kind === 'path' || state.kind === 'workshop') return state.kind + '/' + state.id;
  if (state.kind !== 'wines') return state.kind === 'workshops' ? 'workshops' : '';
  var params = new URLSearchParams(); ['q', 'type', 'section', 'path'].forEach(function (key) { if (state[key]) params.set(key, state[key]); });
  return 'wines' + (params.toString() ? '?' + params.toString() : '');
}
function v40Go(arg) { v32Go({ view: 'cellarcompass', arg: arg || '' }, 'push'); }
function v40Node(tag, cls, text) { return v33Node(tag, cls || '', text); }
function v40Button(text, handler, cls) { return v36Button(text, handler, cls || 'btn ghost'); }
function v40Paragraphs(target, content, cls) {
  (Array.isArray(content) ? content : content ? [content] : []).forEach(function (text) { if (typeof text === 'string') target.appendChild(v40Node('p', cls, text)); });
}
function v40Sources(ids) {
  var wanted = Array.isArray(ids) ? ids : [], sources = (v40Data().sources || []).filter(function (source) { return wanted.indexOf(source.id) >= 0 && /^https:\/\//.test(source.url || ''); });
  if (!sources.length) return null;
  var detail = v40Node('details', 'v40-sources'); detail.appendChild(v40Node('summary', '', 'Sources and further reading'));
  var list = v40Node('ul'); sources.forEach(function (source) {
    var row = v40Node('li'), link = v40Node('a', '', source.title); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; row.appendChild(link); list.appendChild(row);
  }); detail.appendChild(list); return detail;
}
function v40AppendSources(target, ids) { var sources = v40Sources(ids); if (sources) target.appendChild(sources); }
function v40WineLinks(ids, title) {
  var wines = v40Rows().filter(function (row) { return (ids || []).indexOf(row.id) >= 0; }), section = v40Node('section', 'v40-connections');
  if (title) section.appendChild(v40Node('h3', '', title));
  if (!wines.length) { section.appendChild(v40Node('p', 'v40-muted', 'These examples are not in the current house collection. The reading remains available.')); return section; }
  var list = v40Node('ul', 'v40-wine-links'); wines.forEach(function (row) {
    var li = v40Node('li'), button = v40Button(row.name, function () { v32OpenWine(row.id); }); button.setAttribute('data-v40-wine', row.id); li.appendChild(button); list.appendChild(li);
  }); section.appendChild(list); return section;
}
function v40Hero() {
  var rows = v40Rows(), menu = rows.filter(function (row) { return !row.bottle; }).length, section = v40Node('section', 'v40-hero');
  section.appendChild(v40Node('p', 'v40-eyebrow', 'From the cellar to the table'));
  section.appendChild(v40Node('h3', '', 'A little discovery, every day'));
  if (rows.length) {
    var n = v40DailyIds().length;
    section.appendChild(v40Button('Study ' + n + ' wines', function () { v32OpenDeck('cellar-compass'); }, 'btn gold'));
    section.appendChild(v40Node('p', 'v40-count', menu + ' menu wines + ' + (rows.length - menu) + ' floor bottles = ' + rows.length + ' study wines'));
    var about = v40Node('details', 'v40-about'); about.appendChild(v40Node('summary', '', 'How to use this collection'));
    v40Paragraphs(about, v40Data().intro);
    about.appendChild(v40Node('p', '', 'Recall a wine, explain its place and listen for what the guest enjoys. Carry one useful connection into service.'));
    about.appendChild(v40Node('p', '', 'The daily selection balances menu wines and floor bottles. It prioritises wines not yet studied today: first those to revisit, then unseen wines and older reviews. Older answers without a recorded date remain eligible.')); section.appendChild(about);
  } else {
    section.appendChild(v40Node('p', '', 'Your house wines will appear here when a collection is loaded. Guided studies and pairing workshops are ready to read.'));
    section.appendChild(v40Button('Open My Restaurant', function () { v32Go({ view: 'level' }, 'push'); }));
  }
  return section;
}
function v40Tabs(kind) {
  var nav = v40Node('nav', 'v40-tabs'); nav.setAttribute('aria-label', 'Cellar Compass sections');
  [['paths', '', 'Guided studies'], ['wines', 'wines', 'Every study wine'], ['workshops', 'workshops', 'Fall pairings']].forEach(function (tab) {
    var button = v40Button(tab[2], function () { v40Go(tab[1]); }, 'v28-chip');
    if (kind === tab[0]) button.setAttribute('aria-current', 'page'); nav.appendChild(button);
  }); return nav;
}
function v40Overview(kind) {
  var section = v40Node('section', 'v40-overview'), workshop = kind === 'workshops', items = workshop ? v40Workshops() : v40Paths();
  section.appendChild(v40Node('h3', '', workshop ? 'Read the whole dish' : 'Choose a path through the cellar'));
  section.appendChild(v40Node('p', '', workshop ? 'Compare possible wine approaches for the fall dishes. Confirm the current preparation and bottle before making a recommendation.' : 'Start with a question from the floor. Read the explanation, meet the wines, then rehearse the answer in your own words.'));
  var grid = v40Node('div', 'v40-grid'); items.forEach(function (item, i) {
    var article = v40Node('article', 'v40-tile'); article.appendChild(v40Node('p', 'v40-eyebrow', workshop ? 'At the table' : 'Study ' + (i + 1)));
    article.appendChild(v40Node('h4', '', item.title)); v40Paragraphs(article, item.intro || item.dish, 'v40-tile-intro');
    if (!workshop) article.appendChild(v40Node('p', 'v40-small', (item.prompts || []).length + ' recall prompts · ' + v40WineIds(item.wineIds).length + ' connected wines'));
    article.appendChild(v40Button('Open ' + item.title, function () { v40Go((workshop ? 'workshop/' : 'path/') + item.id); })); grid.appendChild(article);
  }); section.appendChild(grid); return section;
}
function v40Path(path) {
  var section = v40Node('article', 'v40-reading'); section.setAttribute('data-v40-path', path.id);
  v40Paragraphs(section, path.intro, 'v40-lead');
  (path.sections || []).forEach(function (item) {
    var block = v40Node('section', 'v40-reading-section'); block.appendChild(v40Node('h3', '', item.title)); v40Paragraphs(block, item.body); v40AppendSources(block, item.sourceIds); section.appendChild(block);
  });
  if (path.wineIds && path.wineIds.length) {
    section.appendChild(v40WineLinks(path.wineIds, 'Meet the wines'));
    if (v40WineIds(path.wineIds).length) section.appendChild(v40Button('Study these wine cards', function () { v32OpenDeck('cellar-path:' + path.id); }, 'btn gold'));
    section.appendChild(v40Node('p', 'v40-small', 'Open a wine for its producer, ingredients, region and guest description. Card grades use your existing wine record.'));
  }
  var prompts = v40Node('section', 'v40-prompts'); prompts.appendChild(v40Node('h3', '', 'Recall, then explain'));
  prompts.appendChild(v40Node('p', '', 'Say your response before revealing the notes. These reading prompts do not record a grade.'));
  (path.prompts || []).forEach(function (prompt, i) {
    var detail = v40Node('details', 'v40-prompt'); detail.setAttribute('data-v40-prompt', prompt.id);
    detail.appendChild(v40Node('summary', '', (i + 1) + '. ' + prompt.question));
    var answer = v40Node('div', 'v40-answer'); v40Paragraphs(answer, prompt.answer);
    if ((prompt.wineIds || []).length) answer.appendChild(v40WineLinks(prompt.wineIds)); v40AppendSources(answer, prompt.sourceIds); detail.appendChild(answer); prompts.appendChild(detail);
  }); section.appendChild(prompts);
  if ((path.guideIds || []).length) { var guides = v40Node('section', 'v40-guides'); guides.appendChild(v40Node('h3', '', 'Look more closely')); v33Append(guides, v36Ids(path.guideIds)); section.appendChild(guides); }
  var culinary = (path.culinaryIds || []).filter(function (id) { return !!v37Lesson(id); });
  if (culinary.length) {
    var links = v40Node('section', 'v40-connections'); links.appendChild(v40Node('h3', '', 'Connect the wine with the dish'));
    culinary.forEach(function (id) { links.appendChild(v40Button(v37Lesson(id).title, function () { v37Go(id); })); }); section.appendChild(links);
  }
  v40AppendSources(section, path.sourceIds);
  var next = v40Paths()[v40Paths().indexOf(path) + 1]; if (next) section.appendChild(v40Button('Continue: ' + next.title, function () { v40Go('path/' + next.id); }, 'btn gold v40-continue'));
  return section;
}
function v40Workshop(workshop) {
  var section = v40Node('article', 'v40-reading'); section.setAttribute('data-v40-workshop', workshop.id);
  v40Paragraphs(section, workshop.dish, 'v40-lead');
  if (workshop.foodSource) section.appendChild(v40Node('p', 'v40-small', workshop.foodSource));
  var components = v40Node('ul', 'v40-components'); (workshop.components || []).forEach(function (text) { components.appendChild(v40Node('li', '', text)); }); section.appendChild(components);
  section.appendChild(v40Node('h3', '', 'Ask before recommending')); v40Paragraphs(section, workshop.question);
  section.appendChild(v40Node('p', 'v40-boundary', 'These are training approaches to compare. They are not a confirmed Brennan\'s pairing or a promise of current availability.'));
  (workshop.approaches || []).forEach(function (approach) {
    var box = v40Node('section', 'v40-approach'); box.appendChild(v40Node('h3', '', approach.title)); v40Paragraphs(box, approach.explanation);
    if ((approach.wineIds || []).length) box.appendChild(v40WineLinks(approach.wineIds, 'Study the possible wines'));
    if ((approach.confirm || []).length) { box.appendChild(v40Node('h4', '', 'Check at lineup')); var list = v40Node('ul'); approach.confirm.forEach(function (text) { list.appendChild(v40Node('li', '', text)); }); box.appendChild(list); }
    v40AppendSources(box, approach.sourceIds); section.appendChild(box);
  });
  if (workshop.guestLine) { section.appendChild(v40Node('h3', '', 'A possible tableside explanation')); v40Paragraphs(section, workshop.guestLine, 'v40-guest'); }
  v40Paragraphs(section, workshop.limits, 'v40-boundary');
  var label = v40Node('label', 'v40-label', 'Rehearse in your own words'); label.htmlFor = 'v40-rehearsal'; section.appendChild(label);
  var input = v40Node('textarea', 'sainput'); input.id = 'v40-rehearsal'; input.rows = 4; input.maxLength = 1600; input.placeholder = 'I would suggest... because... If you prefer...'; input.setAttribute('aria-describedby', 'v40-rehearsal-note'); section.appendChild(input);
  var note = v40Node('p', 'v40-small', 'Your rehearsal stays on this screen only. It is not saved or graded.'); note.id = 'v40-rehearsal-note'; section.appendChild(note); v40AppendSources(section, workshop.sourceIds); return section;
}
function v40Directory() {
  var section = v40Node('section', 'v40-directory'), state = v40State(), rows = v40Rows(), shown = 30;
  section.appendChild(v40Node('h3', '', 'Every study wine'));
  section.appendChild(v40Node('p', '', 'Explore every wine with a study card in your current house collection, at any study level. Search names, producers, grapes, regions or the words in a wine\'s description.'));
  var form = v40Node('div', 'v40-filters');
  function control(label, id, element) { var wrap = v40Node('div'), text = v40Node('label', 'v40-label', label); text.htmlFor = id; element.id = id; wrap.appendChild(text); wrap.appendChild(element); form.appendChild(wrap); return element; }
  var search = control('Find a wine', 'v40-search', v40Node('input', 'sainput')); search.type = 'search'; search.maxLength = 180; search.autocomplete = 'off'; search.value = state.q; search.placeholder = 'Name, grape, producer or region';
  function select(label, id, values, value) { var node = v40Node('select', 'sainput'); values.forEach(function (pair) { var option = v40Node('option', '', pair[1]); option.value = pair[0]; node.appendChild(option); }); node.value = value; return control(label, id, node); }
  var type = select('Collection', 'v40-type', [['', 'All study wines'], ['menu', 'Menu wines'], ['bottle', 'Floor bottles']], state.type);
  var sections = rows.map(function (row) { return row.section; }).filter(function (name, i, all) { return name && all.indexOf(name) === i; }).sort();
  var place = select('Wine section', 'v40-section', [['', 'Every section']].concat(sections.map(function (name) { return [name, name]; })), state.section);
  var path = select('Study path', 'v40-path-filter', [['', 'Every path']].concat(v40Paths().map(function (item) { return [item.id, item.title]; })), state.path);
  section.appendChild(form);
  var count = v40Node('p', 'v40-count'); count.id = 'v40-result-count'; count.setAttribute('role', 'status'); count.setAttribute('aria-live', 'polite'); section.appendChild(count);
  var list = v40Node('ul', 'v40-wine-list'); section.appendChild(list);
  var more = v40Button('Show more wines', function () { shown += 30; draw(false); }, 'btn ghost v40-more'); section.appendChild(more);
  var clear = v40Button('Clear filters', function () { search.value = ''; type.value = ''; place.value = ''; path.value = ''; change(); search.focus(); }, 'btn ghost v40-clear'); section.appendChild(clear);
  function draw(updateAddress) {
    state.q = search.value; state.type = type.value; state.section = place.value; state.path = path.value;
    var selected = v40Find(v40Paths(), state.path), words = v28Fold(state.q).trim().split(/\s+/).filter(Boolean), records = v40Records();
    var matching = rows.filter(function (row) { return (!state.type || row.bottle === (state.type === 'bottle')) && (!state.section || row.section === state.section)
      && (!selected || (selected.wineIds || []).indexOf(row.id) >= 0) && words.every(function (word) { return row.hay.indexOf(word) >= 0; }); });
    count.textContent = matching.length + ' of ' + rows.length + ' study wines' + (matching.length > shown ? ' · showing ' + shown : ''); list.textContent = '';
    matching.slice(0, shown).forEach(function (row) {
      var item = v40Node('li'), button = v40Button('', function () { v32OpenWine(row.id); }, 'v40-wine-row'); button.setAttribute('data-v40-wine', row.id);
      button.appendChild(v40Node('span', 'v40-wine-name', row.name)); button.appendChild(v40Node('span', 'v40-wine-meta', (row.bottle ? 'Floor bottle' : 'Menu wine') + (row.section ? ' · ' + row.section : '')));
      var record = records[row.id]; button.appendChild(v40Node('span', 'v40-wine-status', record ? record.weak ? 'Revisit' : 'Studied' : 'Not yet studied')); item.appendChild(button); list.appendChild(item);
    });
    if (!matching.length) list.appendChild(v40Node('li', 'v40-empty', 'No wines match these filters. Try another word or clear the filters.'));
    more.hidden = matching.length <= shown; clear.hidden = !(state.q || state.type || state.section || state.path);
    S._v40shown = shown; S._v40arg = v40Encode(state);
    if (updateAddress) { var route = v32Route(); v32Hist('replace', v32CurState(), route.hash); V32.key = route.key; v32Mirror(); }
  }
  function change() { shown = 30; draw(true); }
  shown = Math.max(30, Number(S._v40shown) || 30); search.oninput = change; type.onchange = change; place.onchange = change; path.onchange = change; draw(false);
  section.appendChild(v40Node('p', 'v40-small', 'Studied and Revisit reflect your existing wine answers. They do not certify mastery or current bottle availability.'));
  var reference = v40Node('aside', 'v40-reference'); reference.appendChild(v40Node('h4', '', 'Looking beyond the study collection?'));
  var house = v32House(), isBrennans = house && house.id === ((v40Data().scope || {}).houseId || 'h-g02pdomw');
  reference.appendChild(v40Node('p', '', isBrennans ? 'The full printed list is a larger reference with thousands of entries, including different vintages and formats. Only some entries have a complete study card. Prices, vintages and availability must be checked before service.' : 'A full printed reference, where one is supplied for your house, is separate from these study cards. Confirm the current list, vintage, format, price and availability before service.'));
  if (v29ListUrl(house)) reference.appendChild(v40Button('Open the full printed list', function () { v29Open('cellar'); })); section.appendChild(reference); return section;
}
function v40View() {
  var state = v40State(), selected = state.kind === 'path' ? v40Find(v40Paths(), state.id) : state.kind === 'workshop' ? v40Find(v40Workshops(), state.id) : null;
  var view = v40Node('div', 'v25page v40-compass'), head = v40Node('header', 'viewhead');
  var title = v40Node('h2', 'v32-h', selected ? selected.title : v40Data().title || 'The Cellar Compass'); title.tabIndex = -1; head.appendChild(title);
  head.appendChild(v40Node('p', 'sub', selected ? state.kind === 'path' ? 'A guided study from The Cellar Compass' : 'A fall pairing workshop' : 'Explore the wine. Understand the dish. Welcome the guest.')); view.appendChild(head);
  var house = v32House();
  if (house && house.id !== ((v40Data().scope || {}).houseId || 'h-g02pdomw')) view.appendChild(v40Node('p', 'v40-boundary', 'These guided readings use Brennan\'s training examples. Your current house collection is different; only matching wine records are linked. Confirm your own menu and service details.'));
  if (selected) view.appendChild(state.kind === 'path' ? v40Path(selected) : v40Workshop(selected));
  else if (state.kind === 'path' || state.kind === 'workshop') {
    view.appendChild(v40Node('p', '', 'This study is not in the current collection.')); view.appendChild(v40Button('Open The Cellar Compass', function () { v40Go(''); }));
  } else {
    if (state.kind === 'paths') view.appendChild(v40Hero());
    view.appendChild(v40Tabs(state.kind));
    view.appendChild(state.kind === 'wines' ? v40Directory() : v40Overview(state.kind));
    if ((v40Data().scope || {}).note) view.appendChild(v40Node('p', 'v40-boundary', v40Data().scope.note));
    if (v40Data().reviewedOn) view.appendChild(v40Node('p', 'v40-small v40-edition', 'Teaching notes reviewed ' + v40Data().reviewedOn + '. Check the current list and lineup before service.'));
  }
  return view;
}
/* Existing house card machinery provides answers, grading, miss retry and
   answer-side references. Reading a path never records a wine answer. */
var _v40DeckDef = v32DeckDef;
v32DeckDef = function (id) {
  var match = /^cellar-path:([a-z0-9-]+)$/.exec(String(id || '')), path = match && v40Find(v40Paths(), match[1]);
  if (id !== 'cellar-compass' && !match) return _v40DeckDef.apply(this, arguments);
  var def = { id: id, name: id === 'cellar-compass' ? 'Your cellar selection' : path ? path.title : 'Wine study', kind: 'house',
    cards: v32HouseCards(id === 'cellar-compass' ? v40DailyIds() : path ? v40WineIds(path.wineIds) : []) };
  def.learnt = v32Learnt(def); return def;
};
var _v40StartRun = v32StartRun;
v32StartRun = function (id, options) {
  if (id === 'cellar-compass' || /^cellar-path:/.test(String(id))) { var opts = Object.assign({}, options || {}); opts.keepOrder = true; return _v40StartRun.call(this, id, opts); }
  return _v40StartRun.apply(this, arguments);
};
var _v40DeckHtml = v32DeckHtml;
v32DeckHtml = function () {
  var html = _v40DeckHtml.apply(this, arguments), id = S._v32deck;
  if (id === 'cellar-compass') {
    var ids = v40DailyIds(), menu = ids.filter(function (key) { return !v28IsBottle(v32Wine(key)); }).length;
    return html.replace('<button type="button" class="btn gold v32-go"', '<p class="v32-line">' + menu + ' menu wines and ' + (ids.length - menu) + ' floor bottles. This selection uses your existing wine answers and prioritises wines not yet studied today.</p><button type="button" class="btn gold v32-go"');
  }
  return html;
};
V25_VIEWS.cellarcompass = v40View; V32_PARENT.cellarcompass = 'level'; V32_OWNER.cellarcompass = 'home'; V25_UNDER.cellarcompass = 'home';
V25_GO.cellarcompass = function () { v40Go(''); };
var _v40Arg = v32Arg;
v32Arg = function (view) { return view === 'cellarcompass' ? S._v40arg || '' : _v40Arg.apply(this, arguments); };
var _v40Route = v32Route;
v32Route = function () { if (S.view === 'cellarcompass') { var arg = S._v40arg || ''; return { view: 'cellarcompass', key: 'cellarcompass/' + arg, hash: '#/v/cellarcompass' + (arg ? '/' + arg : '') }; } return _v40Route.apply(this, arguments); };
/* Preserve encoded search values: the generic parser decodes whole path
   segments before a view sees them, which would split a search for A&B. */
var _v40Parse = v32Parse;
v32Parse = function (hash) { var match = /^#\/v\/cellarcompass(?:\/(.*))?$/.exec(String(hash || '')); return match ? { view: 'cellarcompass', arg: match[1] || '' } : _v40Parse.apply(this, arguments); };
var _v40Apply = v32Apply;
v32Apply = function (route, state) {
  if (route && route.view === 'cellarcompass') {
    var arg = v40Encode(v40Decode(route.arg)); if (arg !== S._v40arg) S._v40shown = 30; S._v40arg = arg; S.view = 'cellarcompass'; S._v25area = 'home'; return { view: 'cellarcompass', arg: arg };
  } return _v40Apply.apply(this, arguments);
};
var _v40ParentRoute = v32ParentRoute;
v32ParentRoute = function () {
  if (S.view === 'cellarcompass') { var state = v40State(); return state.kind === 'path' || state.kind === 'workshop' ? { view: 'cellarcompass', arg: state.kind === 'workshop' ? 'workshops' : '' } : { view: 'level' }; }
  if (S.view === 'deck' && S._v32deck === 'cellar-compass') return { view: 'cellarcompass' };
  var match = S.view === 'deck' && /^cellar-path:(.+)$/.exec(S._v32deck || ''); if (match) return { view: 'cellarcompass', arg: 'path/' + match[1] };
  return _v40ParentRoute.apply(this, arguments);
};
var _v40MainName = v25MainName;
v25MainName = function () { return S.view === 'cellarcompass' ? 'The Cellar Compass' : _v40MainName.apply(this, arguments); };
var _v40Redraw = v27Redraw;
v27Redraw = function () { if (S.view === 'cellarcompass') { render(); return; } return _v40Redraw.apply(this, arguments); };
var _v40TodayRows = v32TodayRows;
v32TodayRows = function () { return _v40TodayRows.apply(this, arguments) + v32GoRow('cellarcompass', 'Your cellar study', 'The Cellar Compass: menu wines, floor bottles and thoughtful recommendations'); };
var _v40Restaurant = v32RestaurantHtml;
v32RestaurantHtml = function () {
  var html = _v40Restaurant.apply(this, arguments), door = v32Rows(v32GoRow('cellarcompass', 'The Cellar Compass', 'Explore every study wine, guided readings and fall pairing workshops'));
  return html.replace('</h2>', '</h2>' + door);
};
var _v40Flashcards = v32FlashcardsHtml;
v32FlashcardsHtml = function () {
  var html = _v40Flashcards.apply(this, arguments), at = html.indexOf('<section class="v32-due"');
  var door = v32Rows(v32DeckRow('cellar-compass', 'Your cellar selection'));
  return at < 0 ? html : html.slice(0, at) + door + html.slice(at);
};
if (V32_FOCUS_ATTRS.indexOf('data-v40-wine') < 0) V32_FOCUS_ATTRS.push('data-v40-wine');
(function () {
  if (typeof V32 === 'undefined' || V32.moved || typeof V32.initialHash !== 'string' || !/^#\/v\/cellarcompass(?:\/|$)/.test(V32.initialHash)) return;
  var route = v32Parse(V32.initialHash); if (!route || route.view !== 'cellarcompass') return; v32Apply(route, v32CurState()); V32.pend = 'replace';
})();
