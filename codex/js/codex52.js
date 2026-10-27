/* Contextual atlas doors. Geography is shown after an answer, never as a
   clue on its front. Canonical atlas routes preserve the current study run. */
function v52AtlasHtml(targets, context) {
  var seen = {}, links = [];
  (Array.isArray(targets) ? targets : []).forEach(function (target) {
    if (!target || ['fieldmap', 'worldmap', 'country', 'region'].indexOf(target.view) < 0 || !/^[a-z0-9-]+$/.test(target.arg || '')) return;
    var key = target.view + '/' + target.arg;
    if (seen[key]) return;
    seen[key] = true;
    links.push('<a class="v52-atlas-link" data-v52-atlas="' + key + '" href="#/v/' + key + '">' + v32Esc(target.label || target.arg) + '</a>');
  });
  if (!links.length) return '';
  return '<aside class="v52-atlas" aria-label="Wine Atlas connections"><p class="v52-atlas-heading">Wine Atlas</p><div class="v52-atlas-links">' + links.join('') + '</div>'
    + '<p class="v52-atlas-note">' + (context === 'quiz' ? 'Explore the geography and regional study. Use Back to return to this answer.' : 'Connect this wine to its landscape, grapes and regional study.') + '</p></aside>';
}
function v52ForQuestion(q) {
  if (!q) return [];
  return Object.prototype.hasOwnProperty.call(q, '_v52atlasTargets') ? q._v52atlasTargets : v52QuestionTargets(q);
}
/* The dealt house answer and its atlas context refer to the same saved item. */
var _v52Question = v27Question;
v27Question = function (dq, key) {
  var q = _v52Question.apply(this, arguments);
  if (q) {
    q._v52itemId = dq && dq.itemId;
    q._v52kind = key;
    q._v52atlasTargets = v52QuestionTargets(q);
  }
  return q;
};
function v52ExamInProgress() { return S.view === 'quiz' && (S.mode === 'mock' || S.mode === 'sim' || S.mode === 'finals' || !!S._fin); }
var _v52Reveal = revealBlock;
revealBlock = function (q) {
  var box = _v52Reveal.apply(this, arguments);
  if (v52ExamInProgress()) {
    /* House readings can contain atlas doors too. Leave every model and
       explanation intact while withholding the reference shortcut here. */
    Array.prototype.forEach.call(box.querySelectorAll('.v52-atlas'), function (node) { node.remove(); });
    return box;
  }
  var html = v52AtlasHtml(v52ForQuestion(q), 'quiz'), next = box.querySelector('.nextrow');
  if (html) { if (next) next.insertAdjacentHTML('beforebegin', html); else box.insertAdjacentHTML('beforeend', html); }
  return box;
};
var _v52Results = resultsView;
resultsView = function () {
  var box = _v52Results.apply(this, arguments), rows = S.results || [], misses = rows.filter(function (r) { return r && !r.ok; });
  Array.prototype.forEach.call(box.querySelectorAll('.misslist .miss'), function (node, i) {
    if (misses[i]) node.insertAdjacentHTML('beforeend', v52AtlasHtml(v52ForQuestion(misses[i].q), 'quiz'));
  });
  var readCorrect = rows.filter(function (r) { return r && r.ok && v49ForQuestion(r.q); });
  Array.prototype.forEach.call(box.querySelectorAll('.v49-completed .miss'), function (node, i) {
    if (readCorrect[i]) node.insertAdjacentHTML('beforeend', v52AtlasHtml(v52ForQuestion(readCorrect[i].q), 'quiz'));
  });
  var otherCorrect = rows.filter(function (r) { return r && r.ok && !v49ForQuestion(r.q) && v52ForQuestion(r.q).length; });
  if (otherCorrect.length) {
    var html = '<details class="v52-correct"><summary>Explore regions from correct answers (' + otherCorrect.length + ')</summary>'
      + otherCorrect.map(function (r) { return '<section class="v52-result"><p>' + v32Esc(v52PlainText(r.q.q)) + '</p><p><strong>' + v32Esc(v52PlainText(ansOf(r.q))) + '</strong></p>' + v52AtlasHtml(v52ForQuestion(r.q), 'quiz') + '</section>'; }).join('') + '</details>';
    var actions = box.querySelector('.centerrow');
    if (actions) actions.insertAdjacentHTML('beforebegin', html); else box.insertAdjacentHTML('beforeend', html);
  }
  return box;
};
/* Full answers, revealed cards, pairings, guest scenarios and spoken practice
   already share v49Profile. A single wine door covers each of those readings. */
var _v52Profile = v49Profile;
v49Profile = function (item) {
  var html = _v52Profile.apply(this, arguments);
  if (!item || !(item.kind === 'wine' || /^w-[a-z0-9]{8}$/.test(item.id || ''))) return html;
  var atlas = v52AtlasHtml(v52WineTargets(item), 'wine');
  return atlas ? html.replace('</h3>', '</h3>' + atlas) : html;
};
/* Make the atlas visible near the identity, outside the longer reading. */
var _v52Card = v28CardHtml;
v28CardHtml = function (id) {
  var html = _v52Card.apply(this, arguments), row = v28Find(v28Rows(), id);
  var item = row && (row.item || row.row);
  var atlas = v52AtlasHtml(v52WineTargets(item), 'wine');
  return atlas ? html.replace('</h2>', '</h2>' + atlas) : html;
};
var _v52List = v29DetailHtml;
v29DetailHtml = function (row) { return v52AtlasHtml(v52ListTargets(row), 'wine') + _v52List.apply(this, arguments); };
var _v52FinalReport = finalsReportView;
finalsReportView = function () {
  var box = _v52FinalReport.apply(this, arguments), theory = S._v25lt && S._v25lt.theory;
  if (Array.isArray(theory)) Array.prototype.forEach.call(box.querySelectorAll('.lt-group:first-of-type .misslist .miss'), function (node, i) {
    if (theory[i]) node.insertAdjacentHTML('beforeend', v52AtlasHtml(v52ForQuestion(theory[i].q), 'quiz'));
  });
  return box;
};

/* Native links use layer32's router. Remember a repeatable opener for Back,
   and keep Enter on a link from also submitting or advancing the quiz. */
if (V32_FOCUS_ATTRS.indexOf('data-v52-atlas') < 0) V32_FOCUS_ATTRS.push('data-v52-atlas');
var V52_RETURN = {};
function v52PrepareLinks() {
  var view = document.getElementById('view');
  if (view) Array.prototype.forEach.call(view.querySelectorAll('.v52-atlas-link'), function (link, i) {
    link.id = 'v52-atlas-' + i + '-' + link.getAttribute('data-v52-atlas').replace(/\//g, '-');
  });
}
/* Printed-list rows expand in place without running the main renderer. */
var _v52ListAct = v29Act;
v29Act = function () { var result = _v52ListAct.apply(this, arguments); v52PrepareLinks(); return result; };
document.addEventListener('click', function (event) {
  var link = event.target && event.target.closest && event.target.closest('.v52-atlas-link');
  if (!link || event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.id) V52_RETURN[location.href] = link.id;
}, true);
var _v52Render = render;
render = function () {
  var result = _v52Render.apply(this, arguments), view = document.getElementById('view');
  v52PrepareLinks();
  /* Back must expose an opener inside a previously expanded Learn why or
     printed-list reading before the router restores keyboard focus. */
  var returnId = V52_RETURN[location.href], opener = returnId && document.getElementById(returnId);
  if (opener && view && view.contains(opener)) {
    for (var parent = opener.parentElement; parent && parent !== view; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS') parent.open = true;
    }
    delete V52_RETURN[location.href];
  }
  return result;
};
document.addEventListener('keydown', function (event) {
  var target = event.target;
  if (target && target.closest && target.closest('.v52-atlas,.v52-correct') && /^(Enter| |[1-4])$/.test(event.key)) event.stopPropagation();
}, true);
