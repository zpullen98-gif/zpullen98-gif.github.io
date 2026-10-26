/* Reading belongs after an answer, and never records another attempt. Exact
   item IDs travel with house questions; no prompt substring guesses a source.
   Native disclosures keep the round in place. The full reading uses the
   existing router, whose Back restores the answered question and position. */
function quizLearnParas(value){
  return typeof value === 'string' ? value.split(/\n+/).filter(function(s){ return s.trim(); }).map(function(s){ return '<p>' + esc(s) + '</p>'; }).join('') : '';
}
function quizLearnSection(title, value){
  const body = quizLearnParas(value);
  return body ? '<section><h4>' + esc(title) + '</h4>' + body + '</section>' : '';
}
function quizLearnList(title, rows){
  const kept = (rows || []).filter(function(s){ return typeof s === 'string' && s.trim(); });
  return kept.length ? '<section><h4>' + esc(title) + '</h4><ul>' + kept.map(function(s){ return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></section>' : '';
}
function quizLearnDoor(href, title){
  return href ? '<a class="chip quiz-learn-link" href="' + esc(href) + '">Read the full ' + esc(title) + '</a>' : '';
}
function quizLearnDisclosure(title, body, links){
  if(!body && !links) return '';
  return '<details class="quiz-learn"><summary>Learn why<span class="sr-only">: ' + esc(title) + '</span></summary>'
    + '<div class="quiz-learn-body"><h3>' + esc(title) + '</h3>' + body
    + (links ? '<nav class="quiz-learn-links" aria-label="Full reading for ' + esc(title) + '">' + links + '</nav><p class="quiz-learn-note">Use Back after reading to return to this answer. Reading does not change your score.</p>' : '<p class="quiz-learn-note">Close Learn why to continue with the same question. Reading does not change your score.</p>')
    + '</div></details>';
}
function quizLearnCurrent(){ return typeof hsCurrent === 'function' ? hsCurrent() : null; }
function quizLearnItem(id){
  const h = quizLearnCurrent();
  return h ? [].concat(h.cocktails || [], h.dishes || [], h.wines || []).find(function(it){ return it.id === id; }) || null : null;
}
function quizLearnMark(mark){ return typeof hsKeptText === 'function' ? hsKeptText(mark) : ''; }
function quizLearnParts(item){
  const parts = typeof hsKept === 'function' ? hsKept(item.parts) : null;
  if(!parts || typeof parts !== 'object') return [];
  const lib = typeof houseLibHere === 'function' ? houseLibHere() : null;
  const fallback = item.kind === 'wine'
    ? { main:'grape and region', technique:'how it is made', sauce:'the profile', sides:'what it goes with', taste:'how it tastes' }
    : item.kind === 'dish'
      ? { main:'main ingredient', technique:'technique', sauce:'sauce and key flavours', sides:'accompaniments', taste:'how it tastes' }
      : { main:'the spirit', technique:'the build', sauce:'modifiers and key flavours', sides:'glass and garnish', taste:'how it tastes' };
  const labels = lib && lib[item.kind === 'wine' ? 'WINE_PARTS' : item.kind === 'dish' ? 'DISH_PARTS' : 'COCKTAIL_PARTS'] || fallback;
  return ['main','technique','sauce','sides','taste'].filter(function(k){ return typeof parts[k] === 'string' && parts[k].trim(); })
    .map(function(k){ return [labels[k] || k, parts[k]]; });
}
function quizLearnItemBody(item){
  if(!item) return '';
  const parts = quizLearnParts(item);
  const lines = typeof hsLinesShown === 'function' ? hsLinesShown(item) : {};
  const notes = typeof hsNotesFor === 'function' ? hsNotesFor(item) : {};
  const detail = item.kind === 'dish'
    ? quizLearnSection('The dish', item.description) + quizLearnList('Ingredients as recorded', item.ingredients)
    : item.kind === 'wine'
      ? quizLearnList('The wine as recorded', [item.producer, item.wine, item.vintage, item.region, (item.grapes || []).join(', '), item.style])
        + quizLearnSection('Profile', quizLearnMark(item.profile))
        + quizLearnSection('Food connections', quizLearnMark(item.goesWith))
        + quizLearnSection('Serving the wine', quizLearnMark(item.serve)) : '';
  return quizLearnSection('At the table', lines.s45 || lines.s20 || lines.s10 || lines.guest)
    + detail
    + quizLearnSection('About it', notes.about && notes.about.a)
    + quizLearnSection('Why it works', quizLearnMark(item.why))
    + (parts.length ? '<section><h4>The parts to remember</h4><dl>' + parts.map(function(row){ return '<dt>' + esc(row[0]) + '</dt><dd>' + esc(row[1]) + '</dd>'; }).join('') + '</dl></section>' : '')
    + quizLearnSection('Origin and context', quizLearnMark(item.origin))
    + quizLearnSection('Service notes', typeof item.serviceNote === 'string' ? item.serviceNote : '')
    + '<p class="quiz-learn-note">These are the current house notes. Confirm the build, availability and any allergy question with the team before service.</p>';
}
function quizLearnItemLink(item){
  if(!item) return '';
  const h = quizLearnCurrent();
  if(h && (h.cocktails || []).some(function(c){ return c.id === item.id; })) return quizLearnDoor('#/menu/' + slugify(item.name), 'drink description');
  /* Other wings are supplementary; the complete kept explanation is above,
     so the learner need not leave the current round to understand it. */
  return '';
}
function quizLearnCardData(card){
  if(!card) return null;
  const h = quizLearnCurrent();
  const id = card.ref && card.ref.id;
  let title = card.group || card.name, body = '', href = '';
  if(card.src === 'My Bar'){
    const item = quizLearnItem(id);
    const b = card.ref || card;
    title = item ? item.name : card.name;
    body = item ? quizLearnItemBody(item) : quizLearnSection('Menu description', b.note);
    body += quizLearnList('Specification as recorded', b.spec);
    body += quizLearnSection('Service as recorded', [b.method, b.glass, b.garnish].filter(function(s){ return s && s !== '\u2014'; }).join('. '));
    href = '#/menu/' + slugify(card.name);
  } else if(card.src === 'Producers' && h){
    const row = typeof hsDrinkProducerById === 'function' ? hsDrinkProducerById(h, id) : null;
    if(row){ title = row.who; body = hsProducerBodyHTML(row); href = '#/producers/house/' + navProducerId(id); }
  } else if(card.src === 'Components' && h){
    const item = (h.components || []).find(function(c){ return c.id === id; });
    if(item){ title = item.name; body = quizLearnSection('Full explanation', quizLearnMark(item.explain)) + quizLearnSection('At the table', quizLearnMark(item.toGuest));
      body += quizLearnList('Used in the house', (item.itemIds || []).map(quizLearnItem).filter(Boolean).map(function(it){ return it.name; })); }
  } else if(card.src === 'Words' && h){
    const item = (h.lexicon || []).find(function(t){ return t.id === id; });
    if(item){ title = item.term; body = quizLearnSection('At the table', quizLearnMark(item.toGuest)) + quizLearnSection('Say it', quizLearnMark(item.say));
      body += (h.components || []).filter(function(c){ return (c.termIds || []).indexOf(id) >= 0; }).map(function(c){ return quizLearnSection(c.name, quizLearnMark(c.explain)); }).join('');
      body += quizLearnList('On the menu', (item.itemIds || []).map(quizLearnItem).filter(Boolean).map(function(it){ return it.name; })); }
  } else if(card.src === 'Brew Guide' && typeof brewEntry === 'function'){
    const e = brewEntry(card.itemId);
    if(e){ title = e.name; href = brewHref(e.id); body = quizLearnSection('What it is', e.what) + quizLearnSection('How it tastes', e.taste) + quizLearnSection('At the table', e.serve) + quizLearnList('Watch for', e.watch) + quizLearnSection('What to say', e.guest); }
  } else if(card.src === 'Cocktails'){
    const c = card.ref || card;
    title = c.name; href = '#/library/' + slugify(c.name);
    const fam = typeof FAMILIES !== 'undefined' ? FAMILIES[c.family] : null;
    body = quizLearnSection('The drink', c.note) + quizLearnList('Classic specification', c.spec) + quizLearnSection('Family and structure', fam ? fam.formula + '. ' + fam.lesson : '')
      + '<p class="quiz-learn-note">This is the library standard. Follow your current house specification when serving it.</p>';
  }
  if(!body) body = quizLearnSection('Full answer', card.back || card.note || '');
  if(!href && typeof studyHashOf === 'function') href = studyHashOf(cardKey(card));
  return { title: title || card.name, body: body, links: quizLearnDoor(href, 'study') };
}
function quizLearnCardHTML(card){
  const data = quizLearnCardData(card);
  return data ? quizLearnDisclosure(data.title, data.body, data.links) : '';
}
function quizLearnQuestionHTML(q){
  if(!q) return '';
  let body = quizLearnSection('The answer and reasoning', q.explain || q.answer), links = '', title = q.answer;
  const key = q.ckey || (typeof missCardKey === 'function' ? missCardKey(q) : '');
  const card = q.houseItemId && /^b-/.test(q.houseItemId) && typeof allDrinks === 'function'
    ? allDrinks().find(function(c){ return c.src === 'My Bar' && c.ref && c.ref.id === q.houseItemId; }) || null
    : key && typeof cardByKey === 'function' ? cardByKey(key) : null;
  const data = quizLearnCardData(card);
  if(data){ title = data.title; body += data.body; links = data.links; }
  if(q.houseItemId && !card){
    const item = quizLearnItem(q.houseItemId);
    if(item){
      title = item.name;
      body += quizLearnItemBody(item);
      links += quizLearnItemLink(item);
      if(q.houseKind === 'firstPickFor' || q.houseKind === 'zeroProofFor'){
        const pairing = hsKept(item.pairing) || {};
        body += q.houseKind === 'zeroProofFor'
          ? quizLearnSection('Why this pairing was kept', pairing.zeroProofWhy)
          : quizLearnSection('Why this pairing was kept', pairing.whyThisWine || pairing.why)
            + quizLearnSection('At the table', pairing.sayIt) + quizLearnSection('Palate and service', [pairing.palate, pairing.serve].filter(Boolean).join('\n'));
        const paired = quizLearnItem(q.houseKind === 'firstPickFor' ? pairing.wineId : pairing.zeroProofId);
        if(paired){ body += '<section><h4>' + esc(paired.name) + '</h4>' + quizLearnItemBody(paired) + '</section>'; links += quizLearnItemLink(paired); }
        body += '<p class="quiz-learn-note">This question tests the house\u2019s kept recommendation. Other pairings can work; ask the guest what they enjoy.</p>';
      }
    }
  }
  if(!links && typeof readTargetOf === 'function'){
    const target = readTargetOf(q);
    if(target && target.n) links = '<button class="chip" data-act="read-at" data-n="' + target.n + '" data-s="' + esc(target.sub) + '">Read the full lesson</button>';
    else if(target && target.tab) links = '<button class="chip" data-act="go" data-tab="' + esc(target.tab) + '">Read the full lesson</button>';
  }
  return quizLearnDisclosure(title, body, links);
}
function quizLearnSayHTML(id){
  const item = quizLearnItem(id);
  return item ? quizLearnDisclosure(item.name, quizLearnItemBody(item) + '<p class="quiz-learn-note">The automatic check looks for kept words and length. It does not judge warmth, accuracy of delivery or every valid paraphrase. Compare the full meaning, then practise aloud.</p>', quizLearnItemLink(item)) : '';
}
function quizLearnRoleHTML(entry, grade){
  if(!entry || !grade) return '';
  const h = quizLearnCurrent();
  const scenario = h && (h.scenarios || []).find(function(s){ return s.id === entry.id; });
  const ids = scenario ? scenario.itemIds || [] : [entry.aId, entry.bId];
  const items = ids.map(quizLearnItem).filter(Boolean);
  const body = quizLearnSection('A complete response', grade.keptYou) + quizLearnSection('The service principle', grade.principle)
    + items.map(function(item){ return '<section><h4>' + esc(item.name) + '</h4>' + quizLearnItemBody(item) + '</section>'; }).join('')
    + '<p class="quiz-learn-note">The automatic check recognises kept wording. A different, accurate phrasing may still be useful; compare the principle and the guest\u2019s needs.</p>';
  return quizLearnDisclosure(entry.title, body, items.map(quizLearnItemLink).join(''));
}
/* Enter and Space open the focused disclosure or reading link; neither may
   silently advance the quiz. Arrow keys inside reading never grade a card. */
function quizLearnOwnsKey(event){
  return !!(event && event.target && event.target.closest && event.target.closest('.quiz-learn'));
}
