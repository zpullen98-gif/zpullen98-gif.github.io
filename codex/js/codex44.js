/* Codex XLIV: one useful search for the reading room and Today's study.
   Search only the text already on the device. Reading doors use the existing
   route handlers; no question, mark, reading flag or stored schema changes.
   Queries and result limits live in S and survive Back, not a new visit. */
function v44Fold(value) {
  var text = String(value == null ? '' : value).replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
  try { text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
function v44Text(value) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(v44Text).join(' ');
  if (!value || typeof value !== 'object') return '';
  return Object.keys(value).filter(function (key) {
    return !/^(id|url|file|sources|sourceIds|guideIds|wineIds|dishId|sourcePhoto|questionIds|sha256|thumb)$/.test(key) && key.charAt(0) !== '_';
  }).map(function (key) { return v44Text(value[key]); }).join(' ');
}
function v44Entry(title, line, body, kind, arg, extra) {
  return { title: title, line: line, hay: v44Fold([title, line, v44Text(body)].join(' ')),
    name: v44Fold(title), kind: kind, arg: arg || '', extra: extra || '' };
}
var V44_INDEX = null;
function v44Index() {
  if (V44_INDEX) return V44_INDEX;
  var out = { learn: [], places: [], grapes: [], producers: [], chapters: [] };
  function door(title, line, keywords, view) { out.learn.push(v44Entry(title, line, keywords, 'route', view)); }
  door('The Cellar Compass', 'Guided Brennan\'s wine studies', 'Brennans restaurant wine cellar food pairing hospitality', 'cellarcompass');
  door('Read the dish, describe the wine', 'The culinary companion', 'food pairing tasting aroma acidity acid tannin body sweetness sauce guest recommendation', 'culinary');
  door('Study the grid', 'Read the deductive tasting steps', 'tasting sight nose palate aroma finish acidity acid tannin sweetness body alcohol', 'tastegrid');
  door('The Wine Atlas', 'Maps with reading guides and course connections', 'geography country map region terroir', 'worldmap');
  if (typeof v42GuideView === 'function') door('The Learning Compass', 'Choose a short learning path', 'start learn study guide help first week daily review hospitality service', 'learning');
  if (typeof v37Lessons === 'function') v37Lessons().forEach(function (lesson) {
    out.learn.push(v44Entry(lesson.title, 'Culinary lesson', [lesson.intro, lesson.body], 'route', 'culinary', lesson.id));
  });
  if (typeof v40Paths === 'function') v40Paths().forEach(function (path) {
    out.learn.push(v44Entry(path.title, 'Cellar Compass study', [path.intro, path.sections], 'route', 'cellarcompass', 'path/' + path.id));
  });
  if (typeof v40Workshops === 'function') v40Workshops().forEach(function (workshop) {
    out.learn.push(v44Entry(workshop.dish || workshop.title, 'Pairing workshop: ' + workshop.title, [workshop.components, workshop.approaches], 'route', 'cellarcompass', 'workshop/' + workshop.id));
  });
  if (typeof v36Data === 'function' && typeof CodexTeachingCache !== 'undefined') {
    var seen = {};
    (v36Data().groups || []).forEach(function (group) {
      (group.ids || []).forEach(function (id) {
        var entry = CodexTeachingCache.entry(id);
        if (!entry || seen[id]) return;
        seen[id] = true;
        out.learn.push(v44Entry(entry.title, 'Illustrated study: ' + group.title,
          [entry.caption, entry.key, (v36Data().purposes || {})[id]], 'route', 'illustrations', id));
      });
    });
  }
  if (typeof SERVICE_REF !== 'undefined') (SERVICE_REF.tables || []).forEach(function (table) {
    out.learn.push(v44Entry(table.title, 'Service reference', [table.line, table.rows, table.notes], 'regionroute', 'serviceref', table.key));
  });
  if (typeof v39Regions === 'function') v39Regions().forEach(function (region) {
    out.places.push(v44Entry(region.name, 'Region in depth: ' + v39SheetName(region.sheet),
      [region.summary, region.grapes, region.aliases], 'regionroute', 'region', region.slug));
  });
  if (typeof v39Countries === 'function') {
    var countries = v39Countries();
    Object.keys(countries).forEach(function (key) {
      var country = countries[key];
      out.places.push(v44Entry(country.name, 'Country overview', [country.summary, country.grapes], 'regionroute', 'country', key));
    });
  }
  if (typeof v32AllGrapes === 'function') v32AllGrapes().forEach(function (grape) {
    out.grapes.push(v44Entry(grape.g, 'Grape study card', [grape.st, grape.fruit, grape.other, grape.regions, grape.aliases], 'grape', grape.g));
  });
  if (typeof prodCorpus === 'function') prodCorpus().forEach(function (producer) {
    out.producers.push(v44Entry(producer.p, producer.r || producer.country || 'Producer profile', producer, 'producer', producer.id));
  });
  if (typeof v32Levels === 'function') v32Levels().forEach(function (level) {
    var data = LEVELS[level.key];
    (data && data.primers || []).forEach(function (chapter, position) {
      var category = chapter.cat;
      if (level.key === 'intro' && typeof V25_INTRO_CHAPTERS !== 'undefined') {
        Object.keys(V25_INTRO_CHAPTERS).some(function (key) {
          if (V25_INTRO_CHAPTERS[key] === chapter.id) { category = key; return true; } return false;
        });
      }
      if (category) out.chapters.push(v44Entry(chapter.t || category, 'Study chapter: ' + level.name,
        [chapter.body, chapter.lead, chapter.facts, chapter.traps], 'chapter', category, level.key));
      else if (level.key === 'intro' && chapter.t) out.chapters.push(v44Entry(chapter.t, 'Study chapter: ' + level.name,
        chapter.body, 'primer', String(position), level.key));
    });
  });
  V44_INDEX = out;
  return out;
}
function v44Match(rows, query) {
  var folded = v44Fold(query), tokens = folded.split(' ').filter(Boolean);
  if (!tokens.length) return [];
  return rows.filter(function (row) {
    return tokens.every(function (token) { return row.hay.indexOf(token) >= 0; });
  }).map(function (row, index) {
    var score = row.name === folded ? 100 : row.name.indexOf(folded) === 0 ? 70 : row.name.indexOf(folded) >= 0 ? 50 : 0;
    tokens.forEach(function (token) { if (row.name.indexOf(token) >= 0) score += 5; });
    return { row: row, score: score, index: index };
  }).sort(function (a, b) { return b.score - a.score || a.index - b.index; }).map(function (hit) { return hit.row; });
}
function v44Results(query) {
  var index = v44Index(), groups = [];
  var wines = typeof v40Rows === 'function' ? v40Rows().map(function (wine) {
    return v44Entry(wine.name, wine.section || 'Restaurant study wine', wine.hay, 'wine', wine.id);
  }) : [];
  var own = typeof v28Rows === 'function' ? v28Rows().filter(function (wine) { return wine.own; }).map(function (wine) {
    return v44Entry(wine.name, 'Your own wine record', wine.row, 'wine', wine.id);
  }) : [];
  [
    ['learn', 'Learn and serve', index.learn, 8],
    ['places', 'Regions and countries', index.places, 6],
    ['wines', 'Restaurant study wines', wines, 6],
    ['own', 'Your own wines', own, 4],
    ['grapes', 'Grape study cards', index.grapes, 4],
    ['producers', 'Producer profiles', index.producers, 6],
    ['chapters', 'Chapters at your level', index.chapters.filter(function (row) { return row.extra === activeLevel; }), 4],
    ['other', 'Chapters at other levels', index.chapters.filter(function (row) { return row.extra !== activeLevel; }), 4]
  ].forEach(function (spec) {
    var hits = v44Match(spec[2], query);
    if (hits.length) groups.push({ key: spec[0], title: spec[1], rows: hits, limit: spec[3] });
  });
  return groups;
}
function v44Limits(query) {
  var key = v44Fold(query);
  if (!S._v44limits || S._v44limits.query !== key) S._v44limits = { query: key, groups: {} };
  return S._v44limits.groups;
}
function v44ResultHtml(row, key) {
  var line = row.line;
  if ((row.kind === 'chapter' || row.kind === 'primer') && row.extra !== activeLevel) line += '. Opening this changes your level.';
  return '<li><button type="button" class="secbtn v44-hit" data-v44="open" data-v44-kind="' + v32Esc(row.kind)
    + '" data-v44-arg="' + v32Esc(row.arg) + '" data-v44-extra="' + v32Esc(row.extra) + '" id="' + v32Esc(key)
    + '"><span>' + v32Esc(row.title) + '</span><span class="n">' + v32Esc(line) + '</span></button></li>';
}
function v44SearchResults(query) {
  var clean = String(query || '').trim();
  if (v44Fold(clean).length < 2) return '<p class="v44-search-note">Enter at least two letters. Try a grape, region, service skill, dish or wine.</p>';
  var groups = v44Results(clean), limits = v44Limits(clean);
  var total = groups.reduce(function (sum, group) { return sum + group.rows.length; }, 0);
  if (!total) return '<div class="v44-empty"><p>No matches for “' + v32Esc(clean) + '”. Try fewer words or a broader term.</p>'
    + '<p>Searches include the reading guides and developed restaurant cards. The full printed list is a separate reference.</p>'
    + '<div class="v44-actions"><button type="button" class="btn ghost" data-v44="query" data-v44-value="decanting">Explore decanting</button>'
    + '<button type="button" class="btn ghost" data-v44="open" data-v44-kind="route" data-v44-arg="ency">Search the question reference</button></div></div>';
  var html = '<p class="v44-search-count">' + total + (total === 1 ? ' result' : ' results') + ' for “' + v32Esc(clean) + '”.</p>';
  groups.forEach(function (group) {
    var count = Math.min(group.rows.length, limits[group.key] || group.limit);
    html += '<section class="v44-result-group" aria-labelledby="v44-group-' + group.key + '"><h3 class="secgroup" id="v44-group-' + group.key + '">'
      + v32Esc(group.title) + ' <span class="v44-count">' + group.rows.length + '</span></h3>';
    if (group.key === 'wines') html += '<p class="v44-search-note">Saved study profiles. Confirm current bottles, vintages and availability with the team.</p>';
    html += '<ul class="v32hits">' + group.rows.slice(0, count).map(function (row, i) {
      return v44ResultHtml(row, 'v44-hit-' + group.key + '-' + i);
    }).join('') + '</ul>';
    if (count < group.rows.length) html += '<p class="v44-search-note">Showing ' + count + ' of ' + group.rows.length + '.</p><button type="button" class="btn ghost v44-show-more" data-v44="more" data-v44-group="' + group.key + '" data-v44-count="' + count + '">Show more ' + v32Esc(group.title.toLowerCase()) + '</button>';
    html += '</section>';
  });
  return html;
}
var _v44SearchResults = v32SearchResults;
v32SearchResults = function (query) {
  try { return v44SearchResults(query); } catch (e) { return _v44SearchResults.apply(this, arguments); }
};
function v44SetQuery(container, value) {
  var input = container && container.querySelector('input[type="search"]'), output = input && container.querySelector('#' + input.id + '-out');
  if (!input || !output) return;
  input.value = value; v32Query(input.id, value);
  output.innerHTML = v32SearchResults(value);
  var clear = container.querySelector('[data-v44="clear"]');
  if (clear) clear.hidden = !value;
}
function v44WireSearch(box, id) {
  var input = box.querySelector('#' + id);
  if (!input || input._v44ready) return;
  input._v44ready = true; input.type = 'search'; input.maxLength = 160;
  input.setAttribute('aria-label', 'Search wines, regions, lessons and service');
  input.placeholder = 'A wine, region, lesson or service skill';
  var container = input.closest('.codexfind');
  if (!container) return;
  container.classList.add('v44-search');
  var output = box.querySelector('#' + id + '-out');
  if (!output) { output = document.createElement('div'); output.id = id + '-out'; container.appendChild(output); }
  output.setAttribute('aria-live', 'polite');
  var controls = document.createElement('div');
  controls.className = 'v44-search-tools';
  controls.innerHTML = '<p class="v44-search-note" id="' + id + '-help">Find teaching guides, grapes, regions, producers and restaurant wine cards.</p>'
    + '<button type="button" class="btn ghost v44-clear" data-v44="clear">Clear search</button>';
  input.setAttribute('aria-describedby', id + '-help');
  container.insertBefore(controls, output);
  var suggestions = document.createElement('div');
  suggestions.className = 'v44-suggestions'; suggestions.setAttribute('aria-label', 'Suggested searches');
  suggestions.innerHTML = ['Decanting', 'Champagne', 'Food pairing', 'Pinot Noir'].map(function (word) {
    return '<button type="button" class="v28-chip" data-v44="query" data-v44-value="' + word + '">' + word + '</button>';
  }).join('');
  container.insertBefore(suggestions, output);
  input.oninput = null;
  input.addEventListener('input', function () { v44SetQuery(container, input.value); });
  v44SetQuery(container, v32Query(id));
}
var _v44WireSearch = v32WireSearch;
v32WireSearch = function (box, id) {
  /* This replaces only search wiring; every reading door still uses the
     shared router. A second input listener would redraw a result twice. */
  try { v44WireSearch(box, id); } catch (e) { _v44WireSearch.apply(this, arguments); }
};
var _v44LibraryView = v32LibraryView;
v32LibraryView = function () {
  var view = _v44LibraryView.apply(this, arguments);
  var input = view.querySelector('#cf-in'), container = input && input.closest('.codexfind');
  if (container) {
    var oldOutput = container.querySelector('#cf-out');
    if (oldOutput) oldOutput.id = 'cf-in-out';
    v44WireSearch(view, 'cf-in');
    var firstDoor = view.querySelector('.v36-library-door');
    if (firstDoor && firstDoor.parentNode === container.parentNode) container.parentNode.insertBefore(container, firstDoor);
  }
  return view;
};
V25_VIEWS.library = v32LibraryView;
function v44Open(node) {
  var kind = node.getAttribute('data-v44-kind'), arg = node.getAttribute('data-v44-arg') || '', extra = node.getAttribute('data-v44-extra') || '';
  try { v32Remember(node); } catch (e) { }
  if (kind === 'route') { v32Go({ view: arg, arg: extra }, 'push'); return; }
  if (kind === 'regionroute') { v39Open(arg, extra, 'push'); return; }
  if (kind === 'wine') { v32OpenWine(arg); return; }
  if (kind === 'primer') {
    if (extra && extra !== activeLevel) applyLevel(extra, true);
    v32Go({ view: 'primer', arg: arg }, 'push'); return;
  }
  var helper = document.createElement('button');
  if (kind === 'producer') { helper.setAttribute('data-id', arg); v32Act('prod', helper); }
  else if (kind === 'grape') { helper.setAttribute('data-g', arg); v32Act('grape', helper); }
  else if (kind === 'chapter') { helper.setAttribute('data-cat', arg); helper.setAttribute('data-lv', extra); v32Act(extra === activeLevel ? 'chapter' : 'chapterat', helper); }
}
document.addEventListener('click', function (event) {
  var node = event.target && event.target.closest ? event.target.closest('[data-v44]') : null;
  if (!node || node.disabled) return;
  var action = node.getAttribute('data-v44'), container = node.closest('.v44-search');
  event.preventDefault();
  if (action === 'open') { v44Open(node); return; }
  if (!container) return;
  var input = container.querySelector('input[type="search"]');
  if (!input) return;
  if (action === 'clear' || action === 'query') {
    v44SetQuery(container, action === 'clear' ? '' : node.getAttribute('data-v44-value') || '');
    input.focus(); return;
  }
  if (action === 'more') {
    var group = node.getAttribute('data-v44-group'), count = Number(node.getAttribute('data-v44-count')) || 0;
    v44Limits(input.value)[group] = count + 12;
    v44SetQuery(container, input.value);
    var next = container.querySelector('#v44-hit-' + group + '-' + count);
    if (next) next.focus();
  }
});
