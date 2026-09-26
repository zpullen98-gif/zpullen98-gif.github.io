/* ---------------- A DESK ROW, READ AS A DRINK ----------------

   js/menu-desk.js is the Menu Desk: it turns a page of text into a desk file
   whose rows are dishes, wines, cocktails, or rows it could not place, each
   with a name, a price as printed, a confidence and the lines it came from.
   This file is the part that knows the cocktail share is the Ledger's, and it
   is deliberately small, because almost everything it could usefully add
   would be something it had to invent.

   WHAT IT MAY DO. Take the spec the desk read (parts as printed, no measures
   unless the menu printed them). Name a base spirit through the Ledger's own
   lexicon, because a quantity-less list is written base first, and fall back
   to the spirit WORD the desk saw only when the lexicon resolves nothing.
   Carry the price across, and blank it when it is not in the row's own lines.

   WHAT IT MUST NOT DO, and the first of these is the whole reason the file
   exists:

   1. INVENT A QUANTITY. Not in front of the first ingredient, not from the
      family formula, not from the canon unless a person taps for it. lineOz
      feeds balanceOf, estimateABV, the batch sheet and the pour-cost sheet, so
      a made-up ounce becomes a printed percentage with a dollar sign in front
      of it: fiction wearing a suit. tools/check-import.mjs asserts that every
      measure on a produced spec line is a substring of the raw line it came
      from, and that '3/4 oz lime' is one part reading 0.75, never '4 oz'.

   2. Invent an ingredient, a method, a glass, a garnish, a price, or a
      spelling repair. A menu that says 'Gin, elderflower, cucumber' has told
      you three ingredients and nothing else, and the blanks are true.

   3. Invent a FAMILY, except from a section heading that names one. With no
      quantities you cannot tell a Sour from a Highball, because the difference
      is proportion and not the ingredient list. 'Other' is already the safe
      fallback everywhere in this app, so it is what a row gets.

   The lexicon is Stage 1's vocabulary in js/data-ingredients.js, read through
   specRefs. There is no second regex table here, and that is the whole reason
   the vocabulary was built first. */

/* Where one part of a spec ends and the next begins: the desk's own SPEC_SEP
   (a pipe, a bullet, a middle dot, a comma, a slash, a plus, or a dash with
   spaces round it), copied here so a description the desk kept as prose and
   the Ledger's lexicon reads as a list splits the same way the desk would
   have split it. The slash is a separator ONLY between words: the slash of a
   fraction is masked before the split (MD_maskFractions), so '3/4 oz lime'
   stays one part and never becomes a part reading '4 oz lime'. No lookbehind,
   because old Safari has none. Every non-ASCII character in the class is
   written as an escape (bullet, middle dot, en dash, em dash), the way the
   generated port writes its own regexes: a literal em dash here would spend
   the suite's dash headroom, and a literal bullet would be the one byte a
   copy-paste through a different editor silently swaps. */
var MD_LIST_SEP = /\s*(?:[|\u2022\u00b7,+]|\/|\s[-\u2013\u2014]\s)\s*/;

/* The fraction slash stood in for by the fraction-slash character (U+2044),
   which MD_LIST_SEP cannot see, and put back after the split. */
var MD_FRACTION_SLASH = /(\d)\s*\/\s*(?=\d)/g;
var MD_FRACTION_MASK = '\u2044';
function MD_maskFractions(text){ return String(text || '').replace(MD_FRACTION_SLASH, '$1' + MD_FRACTION_MASK); }
function MD_unmaskFractions(text){ return String(text || '').replace(/\u2044/g, '/'); }

/* Past this a "part" is a sentence, not an ingredient. 'Amaro Nonino' is 12,
   'freshly pressed Amalfi lemon' is 27, and 'our house take on a classic' is
   28 but fails the lexicon test instead. */
var MD_PART_MAX = 34;

/* Is this description an ingredient list, or is it prose?

   The named test, so it can be argued with rather than tuned by feel:
     - two or more parts once split on the desk's separators;
     - every part short;
     - no sentence-internal full stop, because that is prose punctuation;
     - and at least one part the vocabulary recognises.

   The last clause is what stops 'Our house take on a classic, shaken hard and
   served long' becoming four bogus ingredients. The first three would let it
   through; the lexicon will not, because none of those parts is a bottle. */
function MD_isIngredientList(text){
  const t = String(text || '').trim();
  if(!t) return false;
  if(/[.!?]\s+\S/.test(t)) return false;          /* prose punctuation, mid-string */
  const parts = MD_maskFractions(t).split(MD_LIST_SEP).map(function(p){ return MD_unmaskFractions(p).trim(); }).filter(Boolean);
  if(parts.length < 2) return false;
  if(parts.some(function(p){ return p.length > MD_PART_MAX; })) return false;
  return parts.some(function(p){
    return specRefs(p).some(function(r){ return r.role === 'ingredient' && (r.id || r.anyOf); });
  });
}

/* The parts, cleaned but never corrected: a trailing full stop goes, because
   it is the sentence's and not the ingredient's, and nothing else moves. */
function MD_listParts(text){
  return MD_maskFractions(text).split(MD_LIST_SEP)
    .map(function(p){ return MD_unmaskFractions(p).trim().replace(/\.$/, ''); })
    .filter(Boolean);
}

/* Which spirit is this? Answerable, because a quantity-less list is written
   base first: take the first part the vocabulary resolves to something whose
   is-a chain reaches a spirit. Two distinct bases means the row is a guess and
   says so, rather than picking the earlier one and sounding certain. */
function MD_spiritOf(lines){
  const found = [];
  (lines || []).forEach(function(line){
    specRefs(line).forEach(function(r){
      const ids = r.anyOf || (r.id ? [r.id] : []);
      ids.forEach(function(id){
        const chain = isaChain(id);
        if(chain.indexOf('spirit') < 0) return;
        /* the named base, not the exact bottle: a menu saying 'Plymouth' is a
           gin drink, and Gin is what the Ledger's spirit field holds */
        for(let i = 0; i < chain.length; i++){
          const row = ING[chain[i]];
          if(row && row.parent === 'spirit' && found.indexOf(row.label) < 0) found.push(row.label);
        }
      });
    });
  });
  return { spirit: found.length === 1 ? found[0] : 'Other', ambiguous: found.length > 1 };
}

/* A section heading only names a family when it IS one. 'COCKTAILS' is not a
   family, 'SOURS' is; and the match is on the Ledger's own list rather than on
   anything this file knows, so adding a family adds it here too. */
function MD_familyOf(section){
  const s = String(section || '').trim().toLowerCase().replace(/s$/, '');
  if(!s) return 'Other';
  const hit = Object.keys(FAMILIES).find(function(f){
    const g = f.toLowerCase();
    return g === s || g.replace(/s$/, '') === s;
  });
  return hit || 'Other';
}

/* One desk row, read as a draft drink.

   Takes a DeskCocktail, or any desk row the desk offered to the bar (an
   unsure row that could be a cocktail), which is read again as a cocktail off
   its own lines first. Returns { rec, why, confidence, raw, item, unsure,
   priceBlanked }. `rec` is the shape myBarFormHTML edits and saveBarRecord
   files, so nothing downstream has to learn a second one. `why` is a short
   sentence for the review row, saying what was read and, more usefully, what
   was left blank on purpose. `item` is the desk row the draft came from, kept
   so "It is a dish" can read it again as one.

   THE SPEC IS THE DESK'S. The desk split the printed list with its fractions
   masked, so the parts arrive as printed and a measure the menu printed stays
   on its part. When the desk kept the line as prose and the Ledger's own
   lexicon, which is the authority on what is a bottle in this app, reads it as
   a list, the list is taken and the row says so; the desk's vocabulary is a
   few hundred words, the Ledger's is the whole ingredient book.

   THE PRICE IS CHECKED ONE LAST TIME. A price that does not occur in the lines
   the row came from is blanked and the row flagged, whichever engine read it.
   The offline reader cannot produce such a row, because it only ever copies
   a price out of the line; the guard exists for the engine that can. */
function menuDrinkFromDeskItem(item){
  const unsure = item.kind !== 'cocktail';
  const c = unsure ? reReadAs(item, 'cocktail') : item;
  const name = String(c.name || '').trim();
  const desc = String(c.description || '').trim();
  let spec = (c.spec || []).slice();
  let note = desc;
  const why = [];
  let lexiconList = false;
  if(!spec.length && desc && MD_isIngredientList(desc)){
    spec = MD_listParts(desc);
    note = '';
    lexiconList = true;
  }
  const sp = MD_spiritOf(spec);
  let spirit = sp.spirit;
  /* the desk's spirit WORD as the fallback, only when the lexicon resolved
     nothing: it is a word the menu printed, run through the same lexicon, so
     it can never name a base the menu did not */
  if(spirit === 'Other' && !sp.ambiguous && c.baseSpirit){
    spirit = MD_spiritOf([c.baseSpirit]).spirit;
  }
  const family = MD_familyOf(c.section);
  const printed = String((c.price && c.price.printed) || '');
  const raw = String(c.raw || '');
  const priceOk = priceInRaw(printed, raw);
  if(spec.length){
    /* Count what the VOCABULARY recognised, not how many parts there were.
       A prose tail on an otherwise list-shaped description ships as an
       ingredient, and saying '4 ingredients read off the menu' about three
       ingredients and a fragment is the row overstating its own confidence. */
    const known = spec.filter(function(p){
      return specRefs(p).some(function(r){ return r.role === 'ingredient' && (r.id || r.anyOf); });
    }).length;
    const measured = spec.filter(function(p){ return lineOz(p) > 0; }).length;
    why.push((known === spec.length
      ? spec.length + ' ingredient' + (spec.length === 1 ? '' : 's') + ' read off the menu'
      : known + ' of ' + spec.length + ' parts recognised as ingredients: check the rest')
      + (measured ? ', ' + measured + ' with the measure the menu printed' : ', no measures')
      + (lexiconList ? ' (the desk read the line as prose; the Ledger’s lexicon reads it as a list)' : ''));
  }
  else if(note) why.push('kept the description as the note: it reads as prose, not a list');
  else why.push('the menu gave a name and nothing else');
  if(sp.ambiguous) why.push('two spirits named, so the base is left open');
  if(family !== 'Other') why.push('filed as a ' + family + ' because the heading said so');
  if(!priceOk) why.push('the price read (' + printed + ') is not in the line it came from, so it was blanked');
  if(unsure) why.push('the desk could not tell what this row is; read here as a cocktail at your say-so');
  return {
    /* NO method, glass or garnish: a menu prints none of them, and a blank is
       the true answer. NO ts either, so saveBarRecord stamps it at the moment
       a person actually agrees to the row. */
    rec: { name: name, spec: spec, method: '', glass: '', garnish: '',
           note: note, family: family, spirit: spirit, price: priceOk ? printed : '' },
    why: why.join('. ') + '.',
    /* the desk is already low when it guessed at a comma split or found no
       price; a row with no spec is low too, because a name alone is not yet a
       drink anybody can practise; and a blanked price or an unsure kind is a
       row a person has to look at */
    confidence: (c.confidence === 'low' || !spec.length || !priceOk || unsure) ? 'low' : 'high',
    raw: raw,
    item: c,
    unsure: unsure,
    priceBlanked: !priceOk,
  };
}

/* The bar's share of a desk file as draft rows, plus what was set aside.

   deskInbox.share is the one definition of "the rows for this room": the
   cocktails, plus the unsure rows that could be one, and nothing once the bar
   has taken its share. It is used here for a fresh read as well as for the
   inbox, so the two doors cannot disagree about which rows are the bar's.
   Nothing here writes anything; the screen does that, one row at a time,
   after a person has looked at it. */
function menuDraftsFromDesk(file){
  const share = deskInbox.share(file, 'cocktail');
  const drafts = share.map(menuDrinkFromDeskItem).filter(function(d){ return d.rec.name; });
  /* A name the list already holds is not an error and not a duplicate to
     merge: it is almost always the same drink pasted twice, or a second pass
     over the same menu. Marked rather than dropped, so the person decides. */
  const have = (progress.bar || []).map(function(b){ return b.name.toLowerCase(); });
  const seen = {};
  drafts.forEach(function(d){
    const k = d.rec.name.toLowerCase();
    d.existing = have.indexOf(k) >= 0 || !!seen[k];
    seen[k] = 1;
  });
  /* what was read and is not the bar's: the lines the desk set aside, and the
     rows it could not place that could not be a cocktail either (a spirits
     list, a row torn between the kitchen and the cellar). Listed, so a person
     can see them and type a drink in by hand if one is hiding there. */
  const skipped = file.unsorted.map(function(u){ return u.raw; });
  file.items.forEach(function(it){
    if(it.kind === 'unsure' && it.could.indexOf('cocktail') < 0) skipped.push(it.raw);
  });
  if(file.notice) skipped.push(file.notice);
  return { drafts: drafts, skipped: skipped, file: file, counts: deskCounts(file.items, file.unsorted) };
}

/* The whole pipeline: text in, the desk file and the bar's draft rows out.
   `kind` is the door the text came through ('paste', 'photo', 'link'), kept
   on the file's source so the review can say "Photo: check the price". The
   source block is minted by deskSource and nowhere else, so the hash that
   says "this menu was already read" is the same hash in all three apps. */
function menuDraftFromText(text, kind){
  const body = String(text || '');
  const file = readMenu(body, deskSource(kind || 'paste', 'ledger', body));
  return menuDraftsFromDesk(file);
}

/* THE CANON MEASURES, OFFERED AND NEVER APPLIED.

   Where the name matches a canon cocktail AND every ingredient the menu named
   appears in the canon's spec, the book's measures are worth one tap. The
   canon may carry MORE lines than the menu, because menus omit syrup and
   bitters constantly; it may not carry fewer, because then it is a different
   drink wearing the same name.

   Never in bulk and never without the tap. Inheriting them silently would
   assert that the house Margarita is the book's, which is the exact thing
   progress.bar exists to deny; and prompting as a gate would mean the import
   never lands, and would teach people to type '2 oz' down the column to get
   past it. */
function menuCanonMeasures(rec){
  const c = COCKTAILS.find(function(x){ return x.name.toLowerCase() === String(rec.name || '').toLowerCase(); });
  if(!c || !rec.spec || !rec.spec.length) return null;
  const canon = [];
  reqsOf(c).forEach(function(r){ (Array.isArray(r) ? r : [r]).forEach(function(id){ canon.push(id); }); });
  const mine = [];
  rec.spec.forEach(function(line){
    specRefs(line).forEach(function(r){
      if(r.role !== 'ingredient') return;
      if(r.anyOf) mine.push(r.anyOf);
      else if(r.id) mine.push(r.id);
      else mine.push('?' + r.text);   /* unreadable counts as a stranger, and refuses */
    });
  });
  if(!mine.length) return null;
  /* stockSatisfies, not set membership: a menu writes 'Tequila' where the book
     writes 'blanco tequila', and the book's blanco IS a tequila. Asking the
     shipped matcher whether the canon's ingredients answer the menu's call is
     the same question the stock list asks, so there is one comparison in this
     app rather than a third one written specially for here. */
  const answered = function(m){
    return Array.isArray(m) ? m.some(function(x){ return stockSatisfies(canon, x); })
                            : stockSatisfies(canon, m);
  };
  if(!mine.every(answered)) return null;
  /* how many lines the book carries that the menu never mentioned. Menus omit
     syrup and bitters constantly, so this is expected and worth saying out
     loud on the offer rather than hiding. */
  const flat = [];
  mine.forEach(function(m){ (Array.isArray(m) ? m : [m]).forEach(function(x){ flat.push(x); }); });
  /* LINES, not requirement ids. The tap fills in c.spec, so a count taken
     over reqsOf (which drops optional lines and flattens either/or into
     separate ids) disagreed with what the button then did. */
  const named = {};
  rec.spec.forEach(function(line){
    specRefs(line).forEach(function(r){
      if(r.role !== 'ingredient') return;
      (r.anyOf || (r.id ? [r.id] : [])).forEach(function(id){ named[id] = 1; });
    });
  });
  const extra = c.spec.filter(function(line){
    const ids = [];
    specRefs(line).forEach(function(r){
      if(r.role !== 'ingredient') return;
      (r.anyOf || (r.id ? [r.id] : [])).forEach(function(id){ ids.push(id); });
    });
    return ids.length && !ids.some(function(id){ return named[id]; });
  }).length;
  return { name: c.name, spec: c.spec.slice(), extra: extra };
}

/* unmeasuredReason moved to js/engine.js beside lineOz, because four screens in
   three files ask it and it now has to answer the PARTIALLY measured case too.
   Left here as a pointer so the next reader looks in one place. */
