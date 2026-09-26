/* ---------------- A DESK ROW, TURNED INTO A BOTTLE ----------------

   js/menu-desk.js reads the page: it finds where a row starts and ends, where
   the price sits, which lines are headings, and, since the Menu Desk, which
   rows are wines and what a wine's descriptor line says. It is generated from
   the World Table's TypeScript and knows nothing about the Codex. This file
   is the wine half, and it is separate for one reason: THIS is the file that
   can invent something, so this is the file with a gate on it
   (.scripts/check-wine-import.js).

   WHAT MAY BE FILLED IN, AND FROM WHERE. There are exactly three sources, and
   every field names its own:

   1. THE PAGE. The producer, the wine, the vintage, the region, the grapes,
      the style, the pours and the bottle price are read out of the text the
      list printed, by the desk reader, and each one must be a substring of
      the raw lines or it is a bug. The fields the page gave are listed in
      `fromPage`, so the banner over the form can say which is which. A list
      that omits the vintage produces a bottle with no vintage, and that is
      the true answer. The Ledger's importer refuses to invent a measure for
      exactly this reason and its gate asserts it; this one refuses the same
      way. Before the desk, region and grape came ONLY from the corpus and the
      printed descriptor line was thrown away; now the page is read first and
      the corpus is asked only about what the page left empty.

   2. THE SECTION HEADING, for one thing only: whether a single printed price
      is by the glass or by the bottle, when the desk could not tell. A list
      that prints "BY THE GLASS" over a column of numbers has said which, and
      reading that is not a guess.

   3. THE PRODUCER CODEX, for two things. To CONFIRM the spelling of a
      producer the page named ("Ch. Margaux" is the Codex's "Château
      Margaux", and the Court's), and to FILL region, grapes and, where the
      page named only the wine, the producer, ONLY where the page left them
      empty and ONLY when a producer in the corpus matches the head of the
      line. This is the one inference in the file, so it is never silent: the
      fields it fills are named in `fromCodex`, the review screen marks them,
      and a person confirms every row before anything is saved. An estate
      makes more than one wine and the corpus answers for the estate, not for
      the bottle in hand, which is precisely why a human confirms it.

   Nothing else is ever filled. No style that was not printed, no tasting
   note beyond what the list itself printed, no price that was not on the
   page (every figure is held against the row's own lines by wineFigureOnPage
   before it becomes a field, and one that is not there is blanked and
   named), and no allergen anything: the desk row has no such field and
   neither does the bottle.

   Top-level declarations are var/function only, like every other file here. */

/* Fold for comparison: case, accents and punctuation all vary between a wine
   list and a reference book, and none of that variation is a different wine. */
function wineFold(s) {
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/* ═══════════ the source of a read ═══════════
   readMenu wants to know where the text came from and what it looked like,
   so that pasting the same list into a second app can say "this was read on
   the World Table today" instead of reading it twice. THE HASH IS THE PORT'S
   OWN, hashText in js/menu-desk.js (desk-text.ts, transpiled), and is never
   copied here: the three apps compare the hash strings and nothing else, so
   a mirror that drifted by one character, an invisible one above all, would
   say "never read" about a list the World Table read this morning. The two
   names below are the seam the screens call, and check-wine-import.js pins
   them to the port's value so a stale port and a stale caller are both loud. */
function wineDeskHash(text) {
  return hashText(String(text == null ? '' : text));
}

/* The source block, built by the port's own deskSource so `hash` and `at`
   are never derived twice, and always marked as read in the Codex. */
function wineDeskSource(text, kind, opts) {
  opts = opts || {};
  var o = {};
  if (opts.url) o.url = opts.url;
  if (opts.reader) o.reader = opts.reader;
  if (opts.now) o.now = opts.now;
  return deskSource(kind || 'paste', 'codex', String(text == null ? '' : text), o);
}

/* A FIGURE IS ON THE PAGE WHEN THE PAGE PRINTED THAT FIGURE.
   The port's priceInRaw is the shared rule (the printed string, whitespace
   folded, is a substring of the row's lines) and it runs first, so this room
   never accepts a figure the World Table's review table would refuse. It is
   a substring test, though, and "4 oz" is a substring of "3/4 oz", "45" of
   "145" and "9" of "9.50", each a figure the page never printed. So a second
   look refuses a match that sits inside a larger figure: the character
   before it may not be a digit, a point, a comma or a slash, and what
   follows may not be a digit, or a point or comma leading to one. An empty
   figure is always fine; it is the true answer for a line that had none. */
function wineFigureOnPage(v, raw) {
  var p = String(v == null ? '' : v).replace(/\s+/g, ' ').trim();
  if (!p) return true;
  var hay = String(raw == null ? '' : raw).replace(/\s+/g, ' ');
  if (typeof priceInRaw === 'function' && !priceInRaw(p, hay)) return false;
  var at = hay.indexOf(p);
  while (at >= 0) {
    var before = at > 0 ? hay.charAt(at - 1) : '';
    var after = hay.slice(at + p.length, at + p.length + 2);
    if (!/[0-9.,\/]/.test(before) && !/^[0-9]/.test(after) && !/^[.,][0-9]/.test(after)) return true;
    at = hay.indexOf(p, at + 1);
  }
  return false;
}

/* A YEAR THAT IS ACTUALLY A YEAR.
   1900 to the near future, as a standalone token, so that "Ridge Lytton
   Springs 2019" yields 2019 and "Chateau Musar 1000 Cases" does not yield a
   vintage at all. NV and MV are read because a list prints them meaning
   something definite. The desk reads the vintage itself now; this stays for
   the row the desk could not place, whose whole name is still the line. */
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

/* A LIST INDEX IN FRONT OF THE NAME. A cellar list prints "201  Domaine
   Leflaive Puligny-Montrachet": the number is the bin, not the estate, and
   head-matching a line that starts with it matched nothing. The desk moves
   the index into `bin` when it reads the line, so this only ever fires on a
   row the desk could not place or on text handed straight to the matcher.
   The same rule as the desk's LIST_INDEX: up to four digits and a GAP (two
   spaces or a tab), because "2015 Ch. Margaux" with one space is a vintage. */
var WINE_LIST_INDEX = /^\s*\d{1,4}(?:[ ]{2,}|\t)(?=\S)/;
function wineStripIndex(name) {
  return String(name == null ? '' : name).replace(WINE_LIST_INDEX, '');
}

/* THE PRODUCER, BY LONGEST MATCH AT THE HEAD OF THE LINE.
   Longest wins for the same reason it does in the Ledger's ingredient
   vocabulary: "Domaine Leflaive" must beat "Domaine", or every Burgundian
   estate on the list collapses into one name.

   A match is only accepted at the HEAD of the line. A producer named in the
   middle of a tasting note is being described, not bottled, and a list reading
   "Chardonnay, in the manner of Coche-Dury" must not come back as a
   Coche-Dury. */
/* WHAT A LIST PUTS IN FRONT OF AN ESTATE'S NAME.
   A German list writes "Weingut Donnhoff", a Portuguese one "Quinta do Noval",
   an Italian one "Azienda Agricola Gaja". These words mean "wine estate"; they
   are not part of the name that distinguishes one producer from another, and
   the codex stores the name without them. Head-matching the raw line therefore
   missed every such bottle and silently left the producer blank.

   Skipping them is reading the page, not guessing at it. And nothing is lost
   where the prefix IS part of the name: the full string is always tried first,
   so "Domaine Leflaive" still matches as itself rather than as "Leflaive".

   THE SAME WORD, ON THE CORPUS SIDE. The list is as likely to drop the estate
   word as to add one: a cellar PDF prints "Leflaive Bourgogne Blanc" and
   "Ch. Margaux", and the corpus writes "Domaine Leflaive" and "Château
   Margaux". So each corpus name is also tried with ITS OWN leading estate
   word taken off, which is what lets "Leflaive" find Domaine Leflaive. The
   unstripped forms keep priority, and a corpus name that is nothing but an
   estate word ("Domaine", the gate's trap) has no stripped form at all. */
var WINE_ESTATE_WORDS = ['weingut', 'weinhaus', 'domaine', 'domaines', 'dom',
  'chateau', 'ch', 'quinta do', 'quinta da', 'quinta de', 'quinta',
  'azienda agricola', 'azienda', 'tenuta', 'cantina', 'cantine', 'fattoria',
  'podere', 'bodegas', 'bodega', 'vinedos', 'vinicola', 'celler', 'cellers',
  'maison', 'champagne', 'castello', 'marques de', 'casa', 'herdade',
  'schloss', 'weinbau', 'estate', 'winery', 'vineyards', 'vineyard', 'cave',
  'caves', 'clos', 'mas', 'finca', 'vina', 'vinas'];

/* A folded name with one leading estate word removed, or '' when none leads it. */
function wineStripEstate(folded) {
  for (var i = 0; i < WINE_ESTATE_WORDS.length; i++) {
    var w = WINE_ESTATE_WORDS[i];
    if (folded.indexOf(w + ' ') === 0) return folded.slice(w.length + 1);
  }
  return '';
}

/* Every folded form a corpus record answers to: its name, and its name with
   its own estate word taken off. */
function wineCorpusForms(rec) {
  var pf = wineFold(rec.p);
  var forms = pf ? [pf] : [];
  var bare = pf ? wineStripEstate(pf) : '';
  if (bare) forms.push(bare);
  return forms;
}

function wineMatchProducer(name, corpus) {
  /* Both strings are padded, so a head match sits at index 0 and the trailing
     space is what stops "Krug" matching inside "Krugmann". */
  var folded = wineFold(wineStripIndex(name));

  /* The whole line first, then the line with one estate word taken off the
     front. Longest match still wins within each attempt, and an earlier
     attempt beats a later one, so the unstripped reading always has priority. */
  var tries = [folded];
  var stripped = wineStripEstate(folded);
  if (stripped) tries.push(stripped);

  for (var t = 0; t < tries.length; t++) {
    var f = ' ' + tries[t] + ' ';
    var best = null, bestLen = 0;
    (corpus || []).forEach(function (rec) {
      if (!rec || !rec.p) return;
      wineCorpusForms(rec).forEach(function (form) {
        if (form.length <= bestLen) return;
        if (f.indexOf(' ' + form + ' ') === 0) { best = rec; bestLen = form.length; }
      });
    });
    if (best) return best;
  }
  return null;
}

/* THE WORDS AFTER THE PRODUCER. Walk the printed text a word at a time until
   the accumulated head equals the corpus name in any of its forms, with or
   without an estate word on either side, and hand back what follows: that is
   the wine. If the walk never lands, the text is shaped in a way this does
   not understand, and the caller keeps it whole rather than losing half. */
function wineAfterMatch(text, rec) {
  var forms = wineCorpusForms(rec);
  var words = String(text || '').split(/\s+/).filter(Boolean);
  var acc = '';
  for (var take = 0; take < words.length; take++) {
    acc = (acc ? acc + ' ' : '') + words[take];
    var a = wineFold(acc);
    var bare = wineStripEstate(a);
    var hit = false;
    for (var i = 0; i < forms.length && !hit; i++) {
      if (a === forms[i] || (bare && bare === forms[i])) hit = true;
    }
    if (hit) return { found: true, rest: words.slice(take + 1).join(' ') };
  }
  return { found: false, rest: '' };
}

/* TWO PRICES MEAN GLASS THEN BOTTLE. A wine list that prints "24 / 110" is
   printing the pour and the bottle in that order, and it prints them that way
   because the smaller number comes first. If they arrive the other way round
   the numbers say so, and they are swapped: reading the page is allowed,
   guessing is not. A single price is placed by the heading. The desk does
   this itself for a row it read as a wine; this is the fallback for a row it
   could not place, whose price is still one printed string. */
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

/* The corpus record that is actually the maker. AN ICON RECORD NAMES A WINE,
   NOT A HOUSE: 103 corpus records exist so a candidate can look up Sassicaia
   or Grange without knowing the estate, and head-matching finds them first.
   The maker is in the record's `by`, which is what the profile page prints as
   "Made by". */
function wineMakerOf(rec, corpus) {
  if (!rec || String(rec.id).indexOf('w-') !== 0 || !rec.by) return { maker: rec, icon: null };
  var maker = null;
  (corpus || []).some(function (x) { if (x && x.id === rec.by) { maker = x; return true; } return false; });
  return maker ? { maker: maker, icon: rec } : { maker: rec, icon: null };
}

/* THE ICON'S OWN NAME, WITHOUT ITS MAKER IN FRONT. The corpus names an icon
   wine the way a candidate says it, "Penfolds Grange", and the maker is
   Penfolds; a bottle labelled producer Penfolds and wine "Penfolds Grange"
   prints the house twice. The maker's head is walked off the icon's name
   where it leads it, and the name is kept whole where it does not. */
function wineIconName(icon, maker) {
  var after = wineAfterMatch(icon.p, maker);
  return (after.found && after.rest) ? after.rest : icon.p;
}

/* ═══════════ one desk row becomes one draft bottle ═══════════

   The desk row carries the page's reading of the line: producer and wine
   split at the first vocabulary hit, the vintage, the descriptor line read
   against the desk's regions, grapes and styles, the pours and the bottle.
   This takes those fields FIRST, names each one in `fromPage`, and asks the
   corpus only about what is still empty, naming each of those in `fromCodex`.

   A row the desk read as a dish or a cocktail is handed back as a row too,
   with `kindRead` saying so and no wine fields filled: the review screen shows
   it beside the rest, and a person decides whether it is a wine after all.
   Dropping it would be the importer deciding in silence. */
function wineRowFromDesk(item, corpus) {
  item = item || {};
  var row = {
    id: String(item.id || ''),
    kindRead: String(item.kind || 'unsure'),
    could: Array.isArray(item.could) ? item.could.slice() : [],
    producer: '', name: '', vintage: '', region: '', country: '', grapes: '', style: '',
    glass: '', bottle: '', pours: [], note: '',
    raw: String(item.raw || ''), section: String(item.section || ''),
    confidence: item.confidence === 'high' ? 'high' : 'low',
    why: Array.isArray(item.why) ? item.why.slice() : [],
    matched: '', fromCodex: [], fromPage: []
  };
  var isWine = item.kind === 'wine';
  var isUnsure = item.kind === 'unsure';
  if (!isWine && !isUnsure) {
    /* not a draft: the name only, so the review can print the line */
    row.name = wineStripIndex(item.name || '');
    return row;
  }

  var page = function (field) { if (row.fromPage.indexOf(field) < 0) row.fromPage.push(field); };
  var codex = function (field) { if (row.fromCodex.indexOf(field) < 0) row.fromCodex.push(field); };
  var rawFold = ' ' + wineFold(row.raw) + ' ';
  var onPage = function (v) { return !!v && rawFold.indexOf(wineFold(v)) >= 0; };

  /* An unsure row has no wine fields; its whole name is the line, minus a
     year the page printed on it. A wine row's name still carries the year
     when the desk left it there, and the vintage field says what it read. */
  var printed = wineStripIndex(item.name || '');
  var v = wineTakeVintage(printed);
  var pageProducer = isWine ? String(item.producer || '') : '';
  var pageWine = isWine ? String(item.wine || '') : '';
  var vintage = isWine ? String(item.vintage || '') : '';
  if (!vintage) vintage = v.vintage;
  if (vintage) { row.vintage = vintage; page('vintage'); }

  var rec = null, after = null;
  if (pageProducer) {
    /* The page named the producer. The corpus may CONFIRM the spelling, and
       whatever of the printed producer string the corpus name did not cover
       goes back onto the wine: "Weingut Donnhoff Oberhauser Brucke" is
       Dönnhoff, and Oberhäuser Brücke is the wine. */
    row.producer = pageProducer; page('producer');
    row.name = pageWine; if (pageWine) page('name');
    rec = wineMatchProducer(pageProducer, corpus);
    if (rec) {
      var who = wineMakerOf(rec, corpus);
      after = wineAfterMatch(pageProducer, rec);
      row.producer = who.maker.p; row.matched = who.maker.id;
      if (who.icon) { row.name = wineIconName(who.icon, who.maker); codex('producer'); }
      else if (after.found && after.rest) row.name = (after.rest + ' ' + row.name).trim();
    }
  } else {
    /* The page named only the wine. The corpus may say who makes it, and
       that is an inference, declared as one. */
    var whole = pageWine || v.rest;
    row.name = whole; if (whole) page('name');
    rec = wineMatchProducer(whole, corpus);
    if (rec) {
      var maker = wineMakerOf(rec, corpus);
      row.producer = maker.maker.p; row.matched = maker.maker.id; codex('producer');
      if (maker.icon) row.name = wineIconName(maker.icon, maker.maker);
      else {
        after = wineAfterMatch(whole, rec);
        /* If the walk never landed the line is shaped in a way this does not
           understand. Keep the line whole as the wine rather than throwing
           away the half of it that was never matched. */
        row.name = after.found ? after.rest : whole;
      }
    }
  }

  /* THE PAGE'S OWN DESCRIPTOR LINE. Region and country as printed; the two
     are joined only when the joined form is itself on the page, because the
     cellar keeps one Region field and "Burgundy, France" is what a list
     prints, while an order the list never printed would be this file's
     invention. Grapes joined with a comma; the gate checks each one. Style
     is a printed word or nothing. */
  var region = isWine ? String(item.region || '') : '';
  var country = isWine ? String(item.country || '') : '';
  if (region && country && onPage(region + ', ' + country)) region = region + ', ' + country;
  else if (!region && country) region = country;
  if (region) { row.region = region; page('region'); }
  var grapes = isWine && Array.isArray(item.grapes) ? item.grapes.filter(Boolean).join(', ') : '';
  if (grapes) { row.grapes = grapes; page('grapes'); }
  if (isWine && item.style) { row.style = String(item.style); page('style'); }

  /* What the page left empty, the corpus may fill, and says so. THE REGION
     COMES FROM `r` ALONE, NEVER FROM `sub`: `sub` is a commune on 565 records,
     a classification on 69 and neither on the rest, and "Premier Cru Classé
     (1855), Margaux" is a classification wearing a region's label that the
     drill would then teach. `r` is a place on all 665 records. */
  if (rec) {
    var src = wineMakerOf(rec, corpus);
    var estate = src.maker;
    if (!row.region && estate.r) { row.region = estate.r; codex('region'); }
    var g = ((src.icon || estate).wines || [])[0];
    g = (g && g.grape) || '';
    if (!row.grapes && g) { row.grapes = g; codex('grapes'); }
  }

  /* Prices: the desk's pours and bottle, as printed, AND ONLY IF PRINTED.
     The reader's own figures are substrings of the line by construction, but
     a desk file is a file: one hand-edited on another device, or her read on
     a path the client could not check, can carry a figure the page never
     printed, and readDeskFile keeps any string it finds in `bottle`, in
     `price.printed` and in a pour. So every figure is held against the row's
     raw lines before it becomes a field. One that is not there is blanked,
     listed in `priceBlanked` for the flag on screen, named in `why` for the
     reader, and kept out of the note; the field that failed is the only one
     that goes, so a printed size outlives a price that was not printed.
     Blank is the true answer for a figure the page did not print; a price
     this file let through would be a price the app invented. A row the desk
     could not place still carries one printed price string, placed by the
     heading, and it is held to the same rule. */
  var blanked = [];
  var pours = isWine && Array.isArray(item.pours) ? item.pours : [];
  row.pours = [];
  pours.forEach(function (p) {
    var price = String(p.price || ''), size = String(p.size || '');
    if (!wineFigureOnPage(price, row.raw)) { blanked.push(price); price = ''; }
    if (!wineFigureOnPage(size, row.raw)) { blanked.push(size); size = ''; }
    if (price || size) row.pours.push({ price: price, size: size });
  });
  if (row.pours.length) { row.glass = row.pours[0].price; if (row.glass) page('glass'); }
  var bottle = isWine ? String(item.bottle || '') : '';
  if (!wineFigureOnPage(bottle, row.raw)) { blanked.push(bottle); bottle = ''; }
  if (bottle) { row.bottle = bottle; page('bottle'); }
  if (!row.glass && !row.bottle && item.price && item.price.printed) {
    var one = String(item.price.printed);
    if (!wineFigureOnPage(one, row.raw)) blanked.push(one);
    else {
      var placed = winePlacePrice(one, row.section);
      if (placed.glass) { row.glass = placed.glass; page('glass'); }
      if (placed.bottle) { row.bottle = placed.bottle; page('bottle'); }
    }
  }
  if (blanked.length) {
    row.priceBlanked = blanked;
    row.why.push('No price on this line: ' + blanked.join(', ') + ' is not on the page, so it was blanked.');
  }

  /* The note is the descriptor line verbatim, and, when the list printed
     more than one pour, the pours with their sizes, from printed figures
     only: "Pours: 5 oz 45.00, 2.5 oz 22.50". A pour whose price was blanked
     above shows its printed size alone. */
  var note = isWine ? String(item.descriptors || '') : '';
  var sized = row.pours.filter(function (p) { return p.size; });
  if (row.pours.length > 1 || sized.length) {
    note = (note ? note + ' ' : '') + 'Pours: ' + row.pours.map(function (p) {
      return [p.size, p.price].filter(Boolean).join(' ');
    }).join(', ');
  }
  if (note) { row.note = note; page('note'); }

  return row;
}

/* ═══════════ the whole paste ═══════════
   Returns drafts and the desk's own notes about what it set aside, both of
   which the review screen shows: a row silently discarded is a bottle the
   venue thinks it entered and did not. Every desk row comes back, including
   the ones the desk read as something other than a wine, because this is the
   wine list door and a person, not the sorter, has the last word here. */
function wineRows(text, corpus) {
  if (typeof corpus === 'undefined' || corpus === null) {
    corpus = (typeof prodCorpus === 'function') ? prodCorpus() : [];
  }
  var body = String(text == null ? '' : text);
  var file = readMenu(body, wineDeskSource(body, 'paste'));
  var rows = (file.items || []).map(function (item) { return wineRowFromDesk(item, corpus); });
  var skipped = (file.unsorted || []).map(function (u) { return u.raw; });
  if (file.notice) skipped.push(file.notice);
  return { rows: rows, skipped: skipped, file: file };
}
