/* Codex XXXIV: colour, bottle shapes and one grape portrait.
   These are reference views only. Question runs, blind flights and flashcard
   faces keep their existing answer-concealment contract. */
var _v34Key = v33Key;
v33Key = function (item) {
  var view = _v34Key.apply(this, arguments);
  if (item.numbered === false) {
    // A botanical portrait has no numbered callouts. Its reading is a list of
    // observations, unlike the numbered comparisons in the other plates.
    var numbered = view.querySelector('.v33-key'), list = v33Node('ul', 'v33-key');
    if (numbered) {
      Array.prototype.slice.call(numbered.children).forEach(function (row) {
        numbered.removeChild(row); list.appendChild(row);
      });
      view.insertBefore(list, numbered); view.removeChild(numbered);
    }
  }
  return view;
};

var _v34TasteGridView = tasteGridView;
tasteGridView = function () {
  var view = _v34TasteGridView.apply(this, arguments);
  var corrections = {
    'Concentration': 'Pale, medium or deep. Judge against a white background in neutral light. Grape pigments and winemaking both influence depth of colour.',
    'Color & hue': 'Whites: straw, yellow, gold. Reds: purple, ruby, garnet. Describe what you see; colour alone cannot prove a grape variety or age.',
    'Rim variation': 'Compare the centre with the thinner edge. Note a pale, purple or orange rim as an observation, then assess it alongside aroma, flavour and structure.'
  };
  Array.prototype.forEach.call(view.querySelectorAll('.gridrow'), function (row) {
    var heading = row.querySelector('.gridt'), text = row.querySelector('.gridd');
    if (heading && text && corrections[heading.textContent]) text.textContent = corrections[heading.textContent];
  });
  var sight = Array.prototype.find.call(view.querySelectorAll('.secgroup'), function (section) { return section.textContent === 'Sight'; });
  if (sight) v33Append(sight.parentNode, ['grid-colour-rim'], sight.nextSibling);
  return view;
};

var _v34CompendiumView = compendiumView;
compendiumView = function () {
  var view = _v34CompendiumView.apply(this, arguments);
  if (S.cmp && S.cmp.sec === 'wine') {
    // Keep Grape to bottle and its topic doors together, with one optional
    // comparison beside them. Detail pages do not repeat the same guide.
    if (S.cmp.idx == null) v33Append(view, ['bottle-shapes'], view.querySelector('.seclist'));
  }
  return view;
};

var _v34GrapesView = grapesView;
grapesView = function () {
  var view = _v34GrapesView.apply(this, arguments);
  Array.prototype.forEach.call(view.querySelectorAll('.grape-row'), function (row) {
    var head = row.querySelector('.grape-head'), name = head && head.querySelector('b');
    if (name && name.textContent.trim() === 'Pinot Noir') v33Append(row, ['pinot-noir'], head.nextSibling);
  });
  return view;
};

var _v34LevelView = v32LevelView;
v32LevelView = function () {
  var view = _v34LevelView.apply(this, arguments);
  var fullList = view.querySelector('[data-v32="fullwine"]');
  if (fullList && fullList.parentNode && fullList.parentNode.parentNode) {
    // The house's existing full-list link remains in its quiet navigation row.
    // Add one closed teaching guide immediately before that row.
    var quiet = fullList.parentNode;
    v33Append(quiet.parentNode, ['bottle-shapes'], quiet);
  }
  return view;
};
V25_VIEWS.level = v32LevelView;
V25_VIEWS.today = v32LevelView;
