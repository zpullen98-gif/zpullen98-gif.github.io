/* ---------------- A PARSED LINE, TURNED INTO A BOTTLE ----------------

   js/wine-parse.js reads the page: it finds where a row starts and ends, where
   the price sits, and which lines are headings. It knows nothing about wine.
   This file is the wine half, and it is separate for one reason: THIS is the
   file that can invent something, so this is the file with a gate on it
   (.scripts/check-wine-import.js).

   WHAT MAY BE FILLED IN, AND FROM WHERE. There are exactly three sources, and
   every field names its own:

   1. THE LINE ITSELF. The producer, the wine, the vintage and the price are
      read out of the text the list printed, and each one must be a substring
      of the raw line or it is a bug. A vintage is a four-digit year that is
      actually on the page, or NV if NV is on the page. A wine list that omits
      the vintage produces a bottle with no vintage, and that is the true
      answer. The Ledger's importer refuses to invent a measure for exactly
      this reason and its gate asserts it; this one refuses the same way.

   2. THE SECTION HEADING, for one thing only: whether a single printed price
      is by the glass or by the bottle. A list that prints "BY THE GLASS" over
      a column of numbers has said which, and reading that is not a guess. A
      heading that says nothing sends the price to the bottle column, because
      that is the one a wine list means when it prints one number.

   3. THE PRODUCER CODEX, for the region and the grapes, and ONLY when a
      producer in the corpus matches the head of the line. This is the one
      inference in the file, so it is never silent: the fields it fills are
      named in `fromCodex`, the review screen marks them, and a person confirms
      every row in the cellar form before anything is saved. An estate makes
      more than one wine and the corpus answers for the estate, not for the
      bottle in hand, which is precisely why a human confirms it.

   Nothing else is ever filled. No style, no tasting note beyond what the list
   itself printed, no price that was not on the page.

   Top-level declarations are var/function only, like every other file here. */

/* Fold for comparison: case, accents and punctuation all vary between a wine
   list and a reference book, and none of that variation is a different wine. */
function wineFold(s) {
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/* A YEAR THAT IS ACTUALLY A YEAR.
   1900 to the near future, as a standalone token, so that "Ridge Lytton
   Springs 2019" yields 2019 and "Chateau Musar 1000 Cases" does not yield a
   vintage at all. NV and MV are read because a list prints them meaning
   something definite. */
var WINE_VINTAGE_RE = /(^|[\s(\[])((?:19|20)\d{2})(?=$|[\s)\],.;])/;
var WINE_NV_RE = /(^|[\s(\[])(NV|MV|N\.V\.)(?=$|[\s)\],.;])/i;

function wineTakeVintage(name) {
  var y = WINE_VINTAGE_RE.exec(name);
  if (y) {
    return {
      vintage: y[2],
      rest: (name.slice(0, y.index) + ' ' + name.slice(y.index + y[0].length)).replace(/\s{2,}/g, ' ').trim()
    };
  }
  var nv = WINE_NV_RE.exec(name);
  if (nv) {
    return {
      vintage: 'NV',
      rest: (name.slice(0, nv.index) + ' ' + name.slice(nv.index + nv[0].length)).replace(/\s{2,}/g, ' ').trim()
    };
  }
  return { vintage: '', rest: name };
}

/* THE PRODUCER, BY LONGEST MATCH AT THE HEAD OF THE LINE.
   Longest wins for the same reason it does in the Ledger's ingredient
   vocabulary: "Domaine Leflaive" must beat "Domaine", or every Burgundian
   estate on the list collapses into one name.

   A match is only accepted at the HEAD of the line. A producer named in the
   middle of a tasting note is being described, not bottled, and a list reading
   "Chardonnay, in the manner of Coche-Dury" must not come back as a
   Coche-Dury. */
function wineMatchProducer(name, corpus) {
  /* Both strings are padded, so a head match sits at index 0 and the trailing
     space is what stops "Krug" matching inside "Krugmann". */
  var f = ' ' + wineFold(name) + ' ';
  var best = null, bestLen = 0;
  (corpus || []).forEach(function (rec) {
    if (!rec || !rec.p) return;
    var pf = wineFold(rec.p);
    if (!pf || pf.length <= bestLen) return;
    if (f.indexOf(' ' + pf + ' ') === 0) { best = rec; bestLen = pf.length; }
  });
  return best;
}

/* TWO PRICES MEAN GLASS THEN BOTTLE. A wine list that prints "24 / 110" is
   printing the pour and the bottle in that order, and it prints them that way
   because the smaller number comes first. If they arrive the other way round
   the numbers say so, and they are swapped: reading the page is allowed,
   guessing is not. A single price is placed by the heading. */
function winePlacePrice(price, section) {
  var out = { glass: '', bottle: '' };
  if (!price) return out;
  var parts = String(price).split(/\s*[\/|]\s*/).filter(Boolean);
  if (parts.length >= 2) {
    var a = parseFloat(String(parts[0]).replace(/[^0-9.]/g, ''));
    var b = parseFloat(String(parts[1]).replace(/[^0-9.]/g, ''));
    if (isFinite(a) && isFinite(b) && a > b) { out.glass = parts[1]; out.bottle = parts[0]; }
    else { out.glass = parts[0]; out.bottle = parts[1]; }
    return out;
  }
  if (/glass|by the glass|\bpour\b|coravin/i.test(String(section || ''))) out.glass = price;
  else out.bottle = price;
  return out;
}

/* One parsed line becomes one draft bottle. */
function wineRowFrom(dish, corpus) {
  var v = wineTakeVintage(dish.name || '');
  var rec = wineMatchProducer(v.rest, corpus);
  var producer = '', name = v.rest;

  if (rec) {
    /* Take the corpus's spelling of the name, which is the one the Court uses,
       and leave whatever the list printed after it as the wine. */
    var pf = wineFold(rec.p);
    var words = v.rest.split(/\s+/);
    var take = 0, acc = '';
    while (take < words.length) {
      acc = (acc ? acc + ' ' : '') + words[take];
      take++;
      if (wineFold(acc) === pf) break;
    }
    producer = rec.p;
    name = words.slice(take).join(' ').trim();
  }

  var price = winePlacePrice(dish.price, dish.section);
  var fromCodex = [];
  var region = '', grapes = '';
  if (rec) {
    var where = [rec.sub, rec.r].filter(Boolean).join(', ');
    if (where) { region = where; fromCodex.push('region'); }
    var g = ((rec.wines || [])[0] || {}).grape || '';
    if (g) { grapes = g; fromCodex.push('grapes'); }
  }

  return {
    producer: producer, name: name, vintage: v.vintage,
    region: region, grapes: grapes, style: '',
    glass: price.glass, bottle: price.bottle,
    note: dish.description || '',
    raw: dish.raw || '', section: dish.section || '',
    confidence: dish.confidence || 'low',
    matched: rec ? rec.id : '',
    fromCodex: fromCodex
  };
}

/* THE WHOLE PASTE. Returns drafts and the parser's own notes about what it
   dropped, both of which the review screen shows: a row silently discarded is
   a bottle the venue thinks it entered and did not. */
function wineRows(text, corpus) {
  if (typeof corpus === 'undefined' || corpus === null) {
    corpus = (typeof prodCorpus === 'function') ? prodCorpus() : [];
  }
  var parsed = parseWineText(String(text == null ? '' : text));
  var rows = [], dropped = 0;
  (parsed.dishes || []).forEach(function (d) {
    if (!d || d.noise) return;
    var r = wineRowFrom(d, corpus);
    /* The cellar form's own rule: a bottle needs a producer or a wine name.
       A row with neither is a heading the parser let through, not a bottle. */
    if (!r.producer && !r.name) { dropped++; return; }
    rows.push(r);
  });
  var skipped = (parsed.skipped || []).slice();
  if (dropped) skipped.push(dropped + ' line' + (dropped === 1 ? '' : 's')
    + ' carried neither a producer nor a wine name and were left out.');
  return { rows: rows, skipped: skipped };
}
