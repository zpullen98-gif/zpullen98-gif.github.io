/* ---------------- A PARSED MENU ROW, READ AS A DRINK ----------------

   js/menu-parse.js is generic: it turns a page of text into rows with a name,
   a description, a price as printed and a confidence. This file is the part
   that knows the rows are cocktails, and it is deliberately small, because
   almost everything it could usefully add would be something it had to invent.

   WHAT IT MAY DO. Turn a description into a spec, but only when the
   description is an ingredient LIST rather than prose. Name a base spirit,
   because a quantity-less list is written base first. Carry the price across.

   WHAT IT MUST NOT DO, and the first of these is the whole reason the file
   exists:

   1. INVENT A QUANTITY. Not in front of the first ingredient, not from the
      family formula, not from the canon unless a person taps for it. lineOz
      feeds balanceOf, estimateABV, the batch sheet and the pour-cost sheet, so
      a made-up ounce becomes a printed percentage with a dollar sign in front
      of it: fiction wearing a suit. tools/check-import.mjs asserts that no
      produced spec line matches lineOz's own pattern.

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

/* A spec line the ledger can measure. If a produced line ever matches this,
   something above invented a quantity, and the gate fails on it. Kept in step
   with lineOz by the gate rather than by hope: check-import.mjs runs the real
   lineOz over every produced line. */
var MD_LIST_SEP = /\s*[,/+]\s*|\s+\+\s+/;

/* Past this a "part" is a sentence, not an ingredient. 'Amaro Nonino' is 12,
   'freshly pressed Amalfi lemon' is 27, and 'our house take on a classic' is
   28 but fails the lexicon test instead. */
var MD_PART_MAX = 34;

/* Is this description an ingredient list, or is it prose?

   The named test, so it can be argued with rather than tuned by feel:
     - two or more parts once split on comma, slash or plus;
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
  const parts = t.split(MD_LIST_SEP).map(function(p){ return p.trim(); }).filter(Boolean);
  if(parts.length < 2) return false;
  if(parts.some(function(p){ return p.length > MD_PART_MAX; })) return false;
  return parts.some(function(p){
    return specRefs(p).some(function(r){ return r.role === 'ingredient' && (r.id || r.anyOf); });
  });
}

/* The parts, cleaned but never corrected: a trailing full stop goes, because
   it is the sentence's and not the ingredient's, and nothing else moves. */
function MD_listParts(text){
  return String(text || '').split(MD_LIST_SEP)
    .map(function(p){ return p.trim().replace(/\.$/, ''); })
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

/* One parsed row, read as a draft drink.

   Returns { rec, why, confidence, raw }. `rec` is the shape myBarFormHTML
   edits and saveBarRecord files, so nothing downstream has to learn a second
   one. `why` is a short sentence for the review row, saying what was read and,
   more usefully, what was left blank on purpose. */
function menuDrinkFromRow(row){
  const name = String(row.name || '').trim();
  const desc = String(row.description || '').trim();
  const isList = MD_isIngredientList(desc);
  const spec = isList ? MD_listParts(desc) : [];
  const note = isList ? '' : desc;
  const sp = MD_spiritOf(spec);
  const family = MD_familyOf(row.section);
  const why = [];
  if(isList) why.push(spec.length + ' ingredient' + (spec.length === 1 ? '' : 's') + ' read off the menu, no measures');
  else if(desc) why.push('kept the description as the note: it reads as prose, not a list');
  else why.push('the menu gave a name and nothing else');
  if(sp.ambiguous) why.push('two spirits named, so the base is left open');
  if(family !== 'Other') why.push('filed as a ' + family + ' because the heading said so');
  return {
    /* NO method, glass or garnish: a menu prints none of them, and a blank is
       the true answer. NO ts either, so saveBarRecord stamps it at the moment
       a person actually agrees to the row. */
    rec: { name: name, spec: spec, method: '', glass: '', garnish: '',
           note: note, family: family, spirit: sp.spirit, price: String(row.price || '') },
    why: why.join('. ') + '.',
    /* the parser is already low on a comma split, which is the case where the
       first comma might have cut a name in half; a row with no spec is low too,
       because a name alone is not yet a drink anybody can practise */
    confidence: (row.confidence === 'low' || !spec.length) ? 'low' : 'high',
    raw: String(row.raw || ''),
  };
}

/* The whole pipeline: text in, draft rows out, plus what was skipped and why.
   Nothing here writes anything; the screen does that, one row at a time, after
   a person has looked at it. */
function menuDraftFromText(text){
  const parsed = parseMenuText(text);
  const drafts = parsed.dishes.map(menuDrinkFromRow).filter(function(d){ return d.rec.name; });
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
  return { drafts: drafts, skipped: parsed.skipped };
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
  const extra = canon.filter(function(id){ return !stockSatisfies(flat, id); }).length;
  return { name: c.name, spec: c.spec.slice(), extra: extra };
}

/* Why a tool is refusing to work on this drink, in the tool's own words rather
   than a shrug. Derived, so it is not a field on the record and so it needs no
   clause in the import merge. */
function unmeasuredReason(c){
  const spec = (c && c.spec) || [];
  if(!spec.length) return 'This drink has no spec yet.';
  const measured = spec.filter(function(l){ return lineOz(l) > 0; }).length;
  if(measured) return null;
  return 'This one came off a menu, which printed no measures. Put ounces on the '
    + 'lines and this sheet can read it; until then the honest answer is that nobody knows.';
}
