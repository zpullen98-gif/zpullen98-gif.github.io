/* Brennan's focused learning flow. Only reading and navigation state lives
   here; the wine records, card identities and grading remain unchanged. */
var V48_LISTS = Object.create(null);
var V48_HUBS = ['housestudies', 'houserehearsal', 'housereference'];
function v48ListState() {
  var h = v41House(), key = h && (h.id || h.name) || 'no-house';
  return V48_LISTS[key] || (V48_LISTS[key] = { q: '', sec: '', expanded: Object.create(null) });
}
function v48SectionOptions(rows, selected) {
  var menu = [], floor = [];
  rows.forEach(function (r) {
    var list = r.bottle ? floor : menu;
    if (list.indexOf(r.section) < 0) list.push(r.section);
  });
  function option(value, label) {
    return '<option value="' + v41Esc(value) + '"' + (value === selected ? ' selected' : '') + '>' + v41Esc(label) + '</option>';
  }
  return option('', 'Every section') + menu.map(function (s) { return option(s, s); }).join('')
    + (floor.length ? '<optgroup label="By the bottle">' + option('#bottles', 'Every bottle section')
      + floor.map(function (s) { return option('#bottles|' + s, s); }).join('') + '</optgroup>' : '');
}
var _v48RowsHtml = v28RowsHtml;
v28RowsHtml = function (all, st, prog, h) {
  if (S.view !== 'brennans') return _v48RowsHtml.apply(this, arguments);
  var shown = v28Shown(all, st), held = v48ListState(), filtering = !!(v28Str(st.q) || st.sec);
  var html = '';
  V41_KINDS.forEach(function (kind) {
    var rows = shown.filter(function (r) { return v41Kind(r, h) === kind; });
    if (!rows.length) return;
    var key = 'kind:' + kind;
    html += '<details class="v48-wine-group" data-v48-kind="' + kind + '" data-v48-list="' + key + '"'
      + (filtering || held.expanded[key] ? ' open' : '') + '><summary id="v48-kind-' + kind + '"><span>'
      + v41Esc(v41W(kind)) + '</span><span class="v48-count">' + rows.length + '</span></summary><div class="v48-wines">';
    var sections = [];
    rows.forEach(function (r) { if (sections.indexOf(r.section) < 0) sections.push(r.section); });
    sections.forEach(function (section) {
      var subset = rows.filter(function (r) { return r.section === section; });
      var sectionKey = key + ':' + section;
      if (kind === 'floor') html += '<details class="v48-wine-section" data-v48-section="' + v41Esc(section) + '" data-v48-list="' + v41Esc(sectionKey) + '"'
        + (filtering || held.expanded[sectionKey] ? ' open' : '') + '><summary id="v48-floor-' + v32Slug(section) + '"><span>' + v41Esc(section || 'Bottles') + '</span><span class="v48-count">' + subset.length + '</span></summary><div>';
      else html += '<h3 class="secgroup">' + v41Esc(section || 'Wines') + '</h3>';
      html += subset.map(function (r) { return v28RowHtml(r, prog.againIds); }).join('');
      if (kind === 'floor') html += '</div></details>';
    });
    html += '</div></details>';
  });
  if (v28Str(st.q)) {
    var tail = _v48RowsHtml([], st, prog, h);
    if (shown.length) tail = tail.split('<p class="v28-soft">' + v28Esc(v28W('searchNone', { query: st.q })) + '</p>').join('');
    html += tail;
  } else if (!shown.length) html += '<p class="v28-soft">No wines in this selection. Choose another section or shift.</p>';
  return html;
};

function v48RefreshList(box) {
  var st = v28State(), rows = v28Rows(), h = v41House(), held = v48ListState();
  var all = v28MealRows(rows, v28Meal(v28MealNames(h, rows)));
  held.q = st.q; held.sec = st.sec;
  var output = box.querySelector('#v28-rows');
  if (output) output.innerHTML = v28RowsHtml(all, st, v28Progress(v28DeckIds({})), h);
  var count = box.querySelector('#v48-count');
  if (count) count.textContent = v28Shown(all, st).length + ' of ' + all.length + ' wines in this shift';
  var clear = box.querySelector('#v48-clear');
  if (clear) clear.disabled = !st.q && !st.sec;
}
var _v48StudyHtml = v28StudyHtml;
v28StudyHtml = function () {
  var html = _v48StudyHtml.apply(this, arguments);
  if (S.view !== 'brennans') return html;
  var box = document.createElement('div'); box.innerHTML = html;
  ['.v28-head', '.v28-lede', '.v28-actions', '.v28-chips', '.v28-also', '.v28-housedoor', '.v30-videos', '#v28-live'].forEach(function (sel) {
    Array.prototype.forEach.call(box.querySelectorAll(sel), function (node) { node.remove(); });
  });
  var bar = box.querySelector('.v28-bar'), st = v28State(), rows = v28Rows(), h = v41House();
  var all = v28MealRows(rows, v28Meal(v28MealNames(h, rows)));
  if (bar) bar.insertAdjacentHTML('beforeend', '<div class="v48-filter"><label for="v48-section">Wine section</label><select id="v48-section">'
    + v48SectionOptions(all, st.sec) + '</select><button type="button" class="btn ghost" id="v48-clear">Clear filters</button></div>'
    + '<p class="v48-result" id="v48-count" role="status" aria-live="polite">' + v28Shown(all, st).length + ' of ' + all.length + ' wines in this shift</p>');
  return box.innerHTML;
};

var _v48View = v41View;
v41View = function () {
  var h = v41House();
  if (!v41HasWines()) {
    var empty = _v48View.apply(this, arguments), root = empty.querySelector('.v41-brennans');
    if (root) { root.classList.add('v48-flow'); root.insertAdjacentHTML('afterbegin', v48NavHtml('brennans')); }
    v48WireKeep(empty, 'brennans', h); return empty;
  }
  var held = v48ListState(), st = v28State();
  S._v28edit = false; st.open = null; st.sec = held.sec; st.q = held.q;
  var html = '<div class="v25page v32-root v41-brennans v48-flow">' + v32Head(v41TabWord(), h.menusReadOn ? v41W('sub', { date: v28Date(h.menusReadOn) }) : '')
    + v48NavHtml('brennans') + '<section class="v41-list" id="v41-list" aria-labelledby="v41-list-h"><h2 class="v32-h2" id="v41-list-h">Wine list</h2>'
    + '<p class="v48-intro">Open a collection or find a wine. Each card brings its story, tableside descriptions and food pairings together.</p>'
    + '<div id="v48-list-slot"></div></section><button type="button" class="btn gold" id="v48-menu-rehearse" data-v48-route="houserehearsal">Rehearse the wine list</button></div>';
  return v32Build(html, function (box) {
    box.querySelector('#v48-list-slot').appendChild(v28StudyView());
    var q = box.querySelector('#v28-q'), section = box.querySelector('#v48-section');
    q.addEventListener('input', function () { v48RefreshList(box); });
    section.addEventListener('change', function () { st.sec = section.value; v48RefreshList(box); });
    box.querySelector('#v48-clear').addEventListener('click', function () {
      st.q = ''; st.sec = ''; q.value = ''; section.value = ''; v48RefreshList(box); q.focus();
    });
    box.addEventListener('toggle', function (event) {
      var node = event.target;
      if (!node || node.isConnected === false || !node.matches('[data-v48-list]') || st.q || st.sec) return;
      held.expanded[node.getAttribute('data-v48-list')] = node.open;
    }, true);
    box.querySelector('#v48-clear').disabled = !st.q && !st.sec;
    v48WireKeep(box, 'brennans', h);
  });
};

/* The source list uses the same exact wine cards and shift filters. */
var _v48Act = v28Act;
v28Act = function (act, node) {
  if (S.view === 'brennans' && act === 'meal') {
    var held = v48ListState(); held.sec = '';
  }
  return _v48Act.apply(this, arguments);
};

V48_HUBS.forEach(function (view) {
  V32_OWNER[view] = 'brennans'; V25_UNDER[view] = 'brennans'; V25_HUB[view] = 'brennans'; V25_AREA[view] = 'brennans';
  V32_PARENT[view] = 'brennans'; V41_REDRAW[view] = 1;
  V25_GO[view] = function () { v32Go({ view: view }, 'push'); };
  V25_VIEWS[view] = function () {
    var h = v41House();
    return v32Build(v48HubHtml(view, h), function (box) { v48WireKeep(box, view, h); });
  };
});
var _v48Parent = v32ParentRoute;
v32ParentRoute = function () {
  if (S.view === 'housevideos') return { view: 'housestudies' };
  if (S.view === 'fulllist' || S.view === 'house' || S.view === 'housereview' || S.view === 'menudesk' || S.view === 'winepaste') return { view: 'housereference' };
  var r = _v48Parent.apply(this, arguments);
  if (S.view === 'houseproducers' && r && r.view !== 'houseproducers') return { view: 'housereference' };
  return r;
};

/* An early render may have read an unknown new address before this layer
   loaded. Reapply the original address once, as the other late layers do. */
(function () {
  if (V32.moved) return;
  var m = /^#\/v\/(housestudies|houserehearsal|housereference)\/?$/.exec(V32.initialHash || '');
  if (m) { v32Apply({ view: m[1] }, v32CurState()); V32.pend = 'replace'; }
})();
