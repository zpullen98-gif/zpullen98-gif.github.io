/* ═══════════════════ CODEX XVI: THE TWO DOORS ═══════════════════
   Two things a working sommelier reaches for before anything the Court sets:
   the list in their own hand, and the names behind the bottles on it. Both
   already existed in this app and both were buried.

   OUR LIST was one tile of twenty-one, filed under Study, between the video
   library and the compendium. It is a nine-field wine list with two study
   modes and its own merge clause, and it was sitting where nobody would find
   it on a first opening.

   THE PRODUCER CODEX was seventy-five static rows with nothing clickable: the
   one rich dataset in the app that had no list-to-detail step. Every other
   reference here drills down. This one printed and stopped.

   So this layer promotes both to a band above the sections, gives the producer
   codex a profile page on the classView pattern and a drill on the
   startClassQuiz pattern, and adds the one thing the app has never had: a
   search box on the first screen.

   THREE NOTES ON HOW, each of which is a rule some earlier layer paid for:

   1. THE BAND IS A DIV, NOT A SECTION. codex14 gives Today its full width with
      `.homesec:first-of-type`, and :first-of-type matches on ELEMENT TYPE, not
      on class. A <section> inserted above the sections would quietly stop that
      selector matching anything and Today would shrink to one column. A div
      sidesteps it with no override and no specificity fight.

   2. THE SEARCH BOX MUTATES ITS OWN RESULTS DIV AND NEVER CALLS render().
      This app has no caret preservation anywhere. The encyclopedia survives
      only because it writes to out.innerHTML and leaves the input alone, and
      this box is built to the same rule. Anything that navigates away is
      allowed to re-render, because the box is going with it.

   3. DRILL QUESTIONS ARE BUILT AT CLICK TIME, never authored into a bank.
      No minted ids, no mint-ids.py run, no risk to the 4,357 questions that
      already exist. startClassQuiz and startCellarDrill both do exactly this.
      Their keys are stable so answers enter the spaced-repetition rotation,
      and keyOwned is wrapped so a producer call never counts toward a rank's
      readiness, the same guard the cellar drill needed.

   House rules observed: a new layer, no edits to earlier files; top-level
   declarations are var/function only so a later layer can rebind them; no
   pictorial glyphs of any kind. */

/* ═══════════ the corpus ═══════════
   data-producers.js holds the full corpus. This layer must load and behave
   with or without it: if the file is absent the seventy-five legacy rows are
   folded into the same record shape, so the doors, the profile view and the
   drill all work on whatever is actually present. */

function prodSlug(s) {
  var t = String(s || '');
  try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

/* THE SAME ESTATE, SPELLED TWO WAYS.
   The old codex wrote "Château des Jacques (Jadot)", naming the owner in a
   parenthesis; the corpus writes "Château des Jacques". Slugged whole those
   are two different names and the estate appears TWICE, under two different
   country headings, which is worse than either version alone. A trailing
   parenthesis is the only difference this normalises, because it is the only
   one the old file actually uses and a looser rule would start merging
   estates that are genuinely different. */
function prodSlugBare(s) {
  return prodSlug(String(s || '').replace(/\s*\([^)]*\)\s*$/, ''));
}

/* WHERE A ROW THE CORPUS HAS NOT REACHED IS FILED.
   Not under its old country name. The old names and the corpus names describe
   the same places in different words ("Germany & Austria" against "Germany,
   Austria and Central Europe"), and putting both in the list shows the reader
   the same country twice and splits its producers across the two. So every
   row still waiting for a full write-up is filed together, under a heading
   that says exactly that, and the profile page repeats it. */
var PROD_UNPROFILED = 'Awaiting a full profile';

/* The legacy row carries its bottlings as one string, separated by a middle
   dot or a semicolon. Split it, and claim NOTHING about grape or reason: an
   empty field is a true answer and an invented one is a defect. */
function prodFromLegacy(row, country) {
  var wines = String(row.w || '').split(/\s*[;·]\s*/).filter(Boolean)
    .map(function (n) { return { n: n, grape: '', note: '' }; });
  return {
    id: 'p-' + prodSlug(row.p), p: row.p, country: country,
    group: PROD_UNPROFILED, r: row.r || '',
    sub: '', founded: '', holdings: '', style: '',
    wines: wines, t: row.t || '', why: '', traps: [], legacy: 1
  };
}

var _prodCorpus = null;
function prodCorpus() {
  if (_prodCorpus) return _prodCorpus;
  var out = [], seen = {};
  var push = function (r) {
    if (!r || !r.id || seen[r.id]) return;
    seen[r.id] = 1; out.push(r);
  };
  if (typeof WINE_PRODUCERS !== 'undefined' && WINE_PRODUCERS && WINE_PRODUCERS.length) {
    WINE_PRODUCERS.forEach(push);
  }
  /* Legacy rows the corpus does not already carry are kept, matched on the
     slug of the name. Fourteen of the seventy-five appear nowhere else in the
     app, and a rewrite that loses them is a rewrite that lost content. */
  if (typeof PRODUCERS !== 'undefined' && PRODUCERS && PRODUCERS.forEach) {
    var byName = {};
    out.forEach(function (r) { byName[prodSlug(r.p)] = 1; byName[prodSlugBare(r.p)] = 1; });
    PRODUCERS.forEach(function (c) {
      (c.rows || []).forEach(function (row) {
        if (byName[prodSlug(row.p)] || byName[prodSlugBare(row.p)]) return;
        push(prodFromLegacy(row, c.country));
      });
    });
  }
  _prodCorpus = out;
  return out;
}

function prodById(id) {
  var hit = null;
  prodCorpus().some(function (r) { if (r.id === id) { hit = r; return true; } return false; });
  return hit;
}

/* Country groups, in the order the corpus states them, so an authored order
   survives and an unknown country still gets a heading rather than vanishing. */
function prodGroups() {
  var order = [], by = {};
  prodCorpus().forEach(function (r) {
    var c = r.group || r.country || 'Elsewhere';
    if (!by[c]) { by[c] = []; order.push(c); }
    by[c].push(r);
  });
  return order.map(function (c) { return { country: c, rows: by[c] }; });
}

function prodIsWine(r) { return String(r.id || '').indexOf('w-') === 0; }

/* ═══════════ the profile ═══════════
   classView's shape: a framework paragraph, named sections, the traps last,
   and a button that drills what you just read. Every field is optional and
   every absent field is simply not printed, because the corpus is allowed to
   leave a field empty rather than guess at it. */
function prodProfileView(rec, back) {
  var maker = rec.by ? prodById(rec.by) : null;
  var html = '<div><div class="viewhead"><h2>' + escT(rec.p) + '</h2>'
    + '<div class="sub">' + escT([rec.sub, rec.r, rec.country].filter(Boolean).join(' · ')) + '</div></div>';

  if (rec.t) html += '<div class="cls-framework">' + escT(rec.t) + '</div>';

  var facts = [];
  if (rec.founded) facts.push(['Founded', rec.founded]);
  if (rec.holdings) facts.push(['Holdings', rec.holdings]);
  if (rec.style) facts.push(['House style', rec.style]);
  if (maker) facts.push(['Made by', maker.p]);
  if (facts.length) {
    html += '<div class="secgroup">The estate</div>'
      + facts.map(function (f) {
        return '<div class="sysitem"><b>' + escT(f[0]) + '</b><span>' + escT(f[1]) + '</span></div>';
      }).join('');
  }

  if (rec.wines && rec.wines.length) {
    html += '<div class="secgroup">' + (prodIsWine(rec) ? 'The wine' : 'The bottlings') + '</div>'
      + rec.wines.map(function (w) {
        return '<div class="techitem"><b>' + escT(w.n) + '</b>'
          + (w.note ? '<div class="tech-d">' + escT(w.note) + '</div>' : '')
          + (w.grape ? '<span class="where-chip">' + escT(w.grape) + '</span>' : '') + '</div>';
      }).join('');
  }

  if (rec.why) html += '<div class="secgroup">Why the Court asks</div>'
    + '<div class="sysitem"><span>' + escT(rec.why) + '</span></div>';

  if (rec.traps && rec.traps.length) html += '<div class="secgroup">Watch out for</div>'
    + rec.traps.map(function (t) { return '<div class="trap-i">' + escT(t) + '</div>'; }).join('');

  if (rec.legacy) html += '<div class="sub" style="margin-top:14px">This name is carried from the '
    + 'original Producer Codex and has not been profiled in full yet.</div>';

  html += '<div class="centerrow"><button class="btn gold" id="pr-quiz">Drill '
    + escT(rec.p) + ' →</button>'
    + '<button class="btn ghost" id="pr-back">' + escT(back) + '</button></div></div>';

  var v = el(html);
  v.querySelector('#pr-quiz').onclick = function () { startProducerDrill({ id: rec.id }); };
  v.querySelector('#pr-back').onclick = function () { S._prod.id = null; render(); };
  return v;
}

/* ═══════════ the list, and the country beneath it ═══════════ */
function prodListView() {
  var groups = prodGroups();
  var c = S._prod.c;

  if (c === null || !groups[c]) {
    var n = prodCorpus().length;
    var html = '<div><div class="viewhead"><h2>The Producers</h2>'
      + '<div class="sub">' + n + ' names, by country: who they are, what they bottle, '
      + 'how it tastes, and the confusion each one is set to catch. Open a country, then a name.</div></div>'
      + '<div class="sarow" style="margin:10px 0"><button class="btn gold" id="pr-all">Drill every country</button></div>'
      + '<div class="seclist">' + groups.map(function (g, i) {
        return '<button class="secbtn" data-i="' + i + '"><span>' + escT(g.country)
          + '</span><span class="n">' + g.rows.length + '</span></button>';
      }).join('') + '</div></div>';
    var v = el(html);
    v.querySelector('#pr-all').onclick = function () { startProducerDrill({}); };
    v.querySelectorAll('.secbtn').forEach(function (b) {
      b.onclick = function () { S._prod.c = +b.dataset.i; render(); };
    });
    return v;
  }

  var g = groups[c];
  if (S._prod.id) {
    var rec = prodById(S._prod.id);
    if (rec) return prodProfileView(rec, 'Back to ' + g.country);
    S._prod.id = null;
  }

  var makers = g.rows.filter(function (r) { return !prodIsWine(r); });
  var icons = g.rows.filter(prodIsWine);
  var body = '<div><div class="viewhead"><h2>' + escT(g.country) + '</h2>'
    + '<div class="sub">' + g.rows.length + ' records. Open a name for the profile.</div></div>'
    + '<div class="sarow" style="margin:10px 0"><button class="btn gold" id="pr-drillc">Drill '
    + escT(g.country) + '</button><button class="btn ghost" id="pr-up">All countries</button></div>';

  var block = function (label, rows) {
    if (!rows.length) return '';
    return '<div class="secgroup">' + label + '</div>' + rows.map(function (r) {
      return '<button class="secbtn" data-id="' + escT(r.id) + '"><span>' + escT(r.p)
        + '</span><span class="n">' + escT(r.sub || r.r || '') + '</span></button>';
    }).join('');
  };
  body += '<div class="seclist">' + block(icons.length ? 'Estates' : '', makers)
    + block('Wines in their own right', icons) + '</div></div>';

  var v2 = el(body);
  v2.querySelector('#pr-drillc').onclick = function () { startProducerDrill({ country: g.country }); };
  v2.querySelector('#pr-up').onclick = function () { S._prod.c = null; render(); };
  v2.querySelectorAll('.secbtn').forEach(function (b) {
    b.onclick = function () { S._prod.id = b.dataset.id; render(); window.scrollTo(0, 0); };
  });
  return v2;
}

/* prodView is rebound rather than edited: reference.js still holds the
   seventy-five rows and still renders them if this layer never loads. */
var _v16ProdView = prodView;
prodView = function () {
  if (!S._prod) S._prod = { c: null, id: null };
  try { return prodListView(); }
  catch (e) { return _v16ProdView(); }   /* the reference must never go dark */
};

/* ═══════════ the drill ═══════════
   Four facets, each generated from a field the record actually carries. A
   record with an empty field simply produces fewer questions; nothing is
   invented to fill a slot.

   The traps are NOT auto-quizzed. They are free prose ("Mouton was promoted in
   1973", "Haut-Brion sits in Graves, not the Medoc") and a question machined
   out of prose asks a worse question than the prose already is. They are read
   on the profile, where they belong, and the four facts below are what the
   engine grades. */
function prodDrillPool(scope) {
  var all = prodCorpus();
  var pick = all.filter(function (r) {
    if (scope.id) return r.id === scope.id;
    if (scope.country) return r.country === scope.country;
    return true;
  });
  if (!pick.length) return [];

  /* Distractors come from the widest pool available, then narrow: a region
     from the same country is a harder and fairer wrong answer than one from
     the other side of the world. */
  var fold = function (s) { return String(s || '').trim().toLowerCase(); };
  var uniqBy = function (arr) {
    var seen = {}, out = [];
    arr.forEach(function (x) { var f = fold(x); if (f && !seen[f]) { seen[f] = 1; out.push(x); } });
    return out;
  };
  var near = function (rec, field) {
    var same = all.filter(function (r) { return r.country === rec.country && r.id !== rec.id; });
    var far = all.filter(function (r) { return r.country !== rec.country; });
    return uniqBy(shuffle(same).map(field).concat(shuffle(far).map(field)));
  };

  /* HOW MANY ESTATES BOTTLE A WINE OF THIS NAME?
     "Who makes X?" is only a question when exactly one answer is accepted, and
     the grader accepts one. Two estates whose lead bottling share a name (two
     Barolos, two Grand Vins) would produce a question that marks a correct
     answer wrong, which is the worst thing a study app can do.

     COUNT ESTATES, NOT RECORDS. Sassicaia is in the corpus twice on purpose:
     once inside Tenuta San Guido's bottlings and once as a wine famous enough
     to be looked up by its own name. Those are one estate listing one wine, and
     counting records rather than estates read them as two rival claimants and
     silently suppressed the question for a hundred and forty wines. An icon
     record's estate is whatever its `by` names; a record with no `by` answers
     for itself. */
  var nameOwners = {};
  all.forEach(function (r) {
    var estate = r.by || r.id;
    (r.wines || []).forEach(function (w) {
      var f = fold(w.n); if (!f) return;
      var set = nameOwners[f] = nameOwners[f] || {};
      set[estate] = 1;
    });
  });
  var soleMaker = function (n) {
    var set = nameOwners[fold(n)];
    return !!set && Object.keys(set).length === 1;
  };

  var qs = [];
  pick.forEach(function (rec) {
    var name = escT(rec.p);
    var w0 = (rec.wines || [])[0];

    /* A LEGACY ROW CANNOT BE ASKED ABOUT ITS BOTTLINGS. The old codex stored
       them as one descriptive string, so the split yields "Grand Vin (1st
       Growth)" and "Pinot Noir & Chardonnay": labels, not wines. Asking who
       makes "Grand Vin (1st Growth)" has five right answers in Bordeaux alone.
       Legacy rows are asked only where they hold a real fact, which is the
       region, and the profile already says they await a full write-up. */
    var named = !rec.legacy && w0 && w0.n && soleMaker(w0.n);

    /* 1. the place */
    if (rec.r) {
      var rd = near(rec, function (r) { return r.r; }).filter(function (x) { return fold(x) !== fold(rec.r); });
      var ro = uniqOpts(rec.r, rd);
      if (ro.length === 4) {
        var p1 = shuffle([0, 1, 2, 3]);
        qs.push({
          id: 'pr-' + rec.id + '-rg', cat: 'Producers & Icons',
          q: 'Where is ' + name + ' based?',
          opts: p1.map(function (i) { return escT(ro[i]); }), a: p1.indexOf(0),
          exp: name + ': ' + escT([rec.sub, rec.r, rec.country].filter(Boolean).join(', ')) + '.'
        });
      }
    }

    /* 2. the maker, from the bottling. Short answer, because on the floor
          nobody offers you four names to choose between. */
    if (named && !prodIsWine(rec)) {
      qs.push({
        id: 'pr-' + rec.id + '-mk', cat: 'Producers & Icons', sa: 1,
        q: 'Who makes ' + escT(w0.n) + '?',
        accept: [rec.p], ans: name,
        exp: name + (rec.r ? ', ' + escT(rec.r) : '') + '.'
      });
    }

    /* 3. what is in it */
    if (w0 && w0.grape) {
      var gpool = all.reduce(function (acc, r) {
        return acc.concat((r.wines || []).map(function (w) { return w.grape; }));
      }, []).filter(Boolean);
      var gd = uniqBy(shuffle(gpool)).filter(function (x) { return fold(x) !== fold(w0.grape); });
      var go = uniqOpts(w0.grape, gd);
      if (go.length === 4) {
        var p3 = shuffle([0, 1, 2, 3]);
        qs.push({
          id: 'pr-' + rec.id + '-gr', cat: 'Producers & Icons',
          q: 'What is ' + escT(w0.n) + ' made from?',
          opts: p3.map(function (i) { return escT(go[i]); }), a: p3.indexOf(0),
          exp: escT(w0.n) + ': ' + escT(w0.grape) + (w0.note ? '. ' + escT(w0.note) : '.')
        });
      }
    }

    /* 4. the signature bottling, from the estate */
    if (named && !prodIsWine(rec)) {
      var wd = all.filter(function (r) { return r.id !== rec.id; })
        .map(function (r) { return (r.wines || [])[0]; }).filter(Boolean)
        .map(function (w) { return w.n; });
      /* No distractor may name a wine this estate actually makes, and none may
         fold-match the answer: uniqOpts dedupes on the exact string, so a
         difference of case alone would put the right answer in twice. */
      var mine = {};
      (rec.wines || []).forEach(function (w) { mine[fold(w.n)] = 1; });
      var wo = uniqOpts(w0.n, uniqBy(shuffle(wd)).filter(function (x) {
        return !mine[fold(x)] && fold(x) !== fold(w0.n);
      }));
      if (wo.length === 4) {
        var p4 = shuffle([0, 1, 2, 3]);
        qs.push({
          id: 'pr-' + rec.id + '-wn', cat: 'Producers & Icons',
          q: 'Which wine is ' + name + ' known for?',
          opts: p4.map(function (i) { return escT(wo[i]); }), a: p4.indexOf(0),
          exp: name + ': ' + escT(w0.n) + (w0.note ? '. ' + escT(w0.note) : '.')
        });
      }
    }
  });
  return qs;
}

function startProducerDrill(scope) {
  scope = scope || {};
  var qs = prodDrillPool(scope);
  if (!qs.length) {
    if (typeof toast === 'function') toast('Nothing here carries enough detail to ask about yet.');
    return;
  }
  qs = shuffle(qs);
  if (!scope.id && qs.length > 25) qs = qs.slice(0, 25);
  stopTimer();
  S.mode = 'drill';
  S.section = 'Producers' + (scope.id ? ' · ' + (prodById(scope.id) || {}).p
    : scope.country ? ' · ' + scope.country : '');
  S.pool = qs; S.idx = 0; S.correct = 0; S.results = []; resetQ();
  S.view = 'quiz'; render();
}

/* A producer call is study, not a rank's bank. keyOwned is the one chokepoint
   every readiness aggregate walks through, and the cellar drill needed exactly
   this guard for exactly this reason. */
var _v16KeyOwned = keyOwned;
keyOwned = function (k, lvl) {
  var bare = k.indexOf('|') > -1 ? k.slice(k.indexOf('|') + 1) : k;
  if (bare.indexOf('pr-') === 0) return false;
  return _v16KeyOwned(k, lvl);
};

/* ═══════════ search ═══════════
   The app has had none. Five hundred producer records and a venue's own wine
   list are a filing cabinet without one. */
/* SEARCH IS ACCENT-BLIND, AND HAS TO BE.
   Spelling the corpus properly created this problem: Bründlmayer, Disznókő and
   Château Lafite are now correct, and nobody is typing an umlaut into a search
   box. Both sides are stripped of their marks before comparing, so "bundl" and
   "bründl" find the same estate and "chateau" finds every Château. */
function codexFold(s) {
  var t = String(s == null ? '' : s);
  try { t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { }
  return t.toLowerCase();
}

function codexFind(term) {
  var t = codexFold(String(term || '').trim());
  if (t.length < 2) return null;
  var hit = function (o) { return codexFold(JSON.stringify(o)).indexOf(t) >= 0; };
  return {
    producers: prodCorpus().filter(hit).slice(0, 40),
    bottles: (ST.cellar || []).filter(hit).slice(0, 20),
    t: t
  };
}

function codexFindHtml(res) {
  if (!res) return '';
  var html = '';
  if (res.producers.length) {
    html += '<div class="secgroup">Producers and wines (' + res.producers.length + ')</div>';
    res.producers.forEach(function (r) {
      html += '<button class="secbtn" data-find-p="' + escT(r.id) + '"><span>' + escT(r.p)
        + '</span><span class="n">' + escT(r.r || r.country || '') + '</span></button>';
    });
  }
  if (res.bottles.length) {
    html += '<div class="secgroup">On our list (' + res.bottles.length + ')</div>';
    res.bottles.forEach(function (b) {
      html += '<button class="secbtn" data-find-b="1"><span>' + escT(bottleLabel(b))
        + '</span><span class="n">' + escT(b.glass || b.bottle || '') + '</span></button>';
    });
  }
  return html || '<div class="sub" style="margin-top:8px">Nothing under that name. '
    + 'The Encyclopedia searches the questions themselves.</div>';
}

/* ═══════════ pasting a list in ═══════════
   Entering a wine list a bottle at a time is nine fields times however many
   bottles the venue pours, and nobody does it twice. A list already exists as
   text on somebody's phone, so this reads the text.

   THE REVIEW STEP FEEDS THE EXISTING FORM, ONE ROW AT A TIME, and that is a
   deliberate constraint rather than a shortcut. This app has no caret
   preservation anywhere: the cellar form survives being typed into only
   because nothing re-renders while it is open. A grid of forty editable rows
   would mint forty sets of live inputs and every keystroke that triggered a
   render would throw the caret to the end of a different box. So the importer
   drives the one form that is already proved safe, and a person sees every
   bottle before it is saved. */

function wineImportView() {
  var w = S._wimp || {};
  var v = el('<div><div class="viewhead"><h2>Paste the list</h2>'
    + '<div class="sub">Copy the wine list as text and paste it here. Nothing is saved yet: '
    + 'every bottle is shown to you in the form first, and anything the list did not '
    + 'print is left blank rather than guessed.</div></div>'
    + '<textarea id="wi-text" class="sainput" rows="14" spellcheck="false" '
    + 'style="width:100%;min-height:220px;font-family:inherit;line-height:1.5" '
    + 'placeholder="CHAMPAGNE\nKrug Grande Cuvee NV      45 / 260\n\nWHITE BY THE GLASS\n'
    + 'Domaine Leflaive Puligny-Montrachet 2021    24 / 110"></textarea>'
    + '<div class="sarow" style="margin-top:10px"><button class="btn gold" id="wi-go">Read the list</button>'
    + '<button class="btn ghost" id="wi-cancel">Cancel</button></div>'
    + '<div id="wi-err"></div></div>');

  var ta = v.querySelector('#wi-text');
  if (w.text) ta.value = w.text;

  v.querySelector('#wi-cancel').onclick = function () {
    S._wimp = null; S.view = 'cellar'; render();
  };
  v.querySelector('#wi-go').onclick = function () {
    var out;
    try { out = wineRows(ta.value); }
    catch (e) { out = { rows: [], skipped: ['The list could not be read: ' + e.message] }; }
    if (!out.rows.length) {
      v.querySelector('#wi-err').innerHTML = '<div class="sub" style="margin-top:10px">'
        + 'Nothing in that text looked like a bottle. A line needs at least a name, and a '
        + 'price helps the reader find where each row ends.'
        + (out.skipped.length ? '<br>' + out.skipped.map(escT).join('<br>') : '') + '</div>';
      return;
    }
    S._wimp = { stage: 'review', rows: out.rows, skipped: out.skipped, i: 0, added: 0 };
    wineLoadRow();
  };
  return v;
}

/* Load draft i into the cellar form and show the cellar view. */
function wineLoadRow() {
  var w = S._wimp;
  if (!w || w.i >= w.rows.length) { wineFinish(); return; }
  var r = w.rows[w.i];
  S._cellarForm = {
    producer: r.producer, name: r.name, vintage: r.vintage, region: r.region,
    grapes: r.grapes, style: r.style, glass: r.glass, bottle: r.bottle, note: r.note
  };
  S._cellarEdit = null;
  S.view = 'cellar';
  render();
  window.scrollTo(0, 0);
}

function wineFinish() {
  var w = S._wimp || {};
  var n = w.added || 0;
  S._wimp = null; S._cellarForm = null; S._cellarEdit = null;
  S.view = 'cellar'; render();
  if (typeof toast === 'function') {
    toast(n ? n + ' bottle' + (n === 1 ? '' : 's') + ' added to the list.' : 'Nothing added.');
  }
}

/* The banner that sits above the form while an import is running: which bottle
   this is, the line it was read from, and which fields did NOT come off the
   page. Naming the inferred fields is the whole honesty of the feature. */
function wineBanner() {
  var w = S._wimp;
  if (!w || w.stage !== 'review' || w.i >= w.rows.length) return '';
  var r = w.rows[w.i];
  var html = '<div class="wimp-band"><div class="wimp-count">Bottle ' + (w.i + 1)
    + ' of ' + w.rows.length + (r.section ? ' &middot; under ' + escT(r.section) : '') + '</div>'
    + '<div class="wimp-raw">' + escT(String(r.raw).replace(/\n/g, ' ')) + '</div>';
  if (r.fromCodex.length) {
    var m = prodById(r.matched);
    html += '<div class="wimp-note">The ' + r.fromCodex.join(' and ') + ' below '
      + (r.fromCodex.length > 1 ? 'were' : 'was') + ' not on the list. '
      + (m ? escT(m.p) + ' is in the Producers, and this is what it says for the estate. '
        : '') + 'Check it against the bottle before you save.</div>';
  }
  if (r.confidence !== 'high') {
    html += '<div class="wimp-note">This line was hard to read, so look at it closely.</div>';
  }
  html += '<div class="sarow"><button class="btn small ghost" id="wi-skip">Skip this one</button>'
    + '<button class="btn small ghost" id="wi-stop">Stop importing</button></div></div>';
  return html;
}

/* cellarView is wrapped rather than rewritten: codex12 owns the form, its save
   path and its escaping, and an importer that re-implemented any of that would
   be a second place for the same bug to live. */
var _v16CellarView = cellarView;
cellarView = function () {
  var v = _v16CellarView();
  var w = S._wimp;

  /* The door onto the paste screen, beside "Add a bottle". */
  var add = v.querySelector('#cl-add');
  if (add && !w) {
    var paste = el('<button class="btn ghost" id="cl-paste">Paste the whole list</button>');
    paste.onclick = function () { S._wimp = { stage: 'paste', text: '' }; S.view = 'winepaste'; render(); };
    if (add.parentNode) add.parentNode.insertBefore(paste, add.nextSibling);
  }

  if (!w || w.stage !== 'review') return v;

  /* The banner goes above everything the original view built. */
  var band = el('<div>' + wineBanner() + '</div>');
  if (band.firstElementChild) v.insertBefore(band.firstElementChild, v.firstChild);

  var skip = v.querySelector('#wi-skip');
  if (skip) skip.onclick = function () { w.i++; wineLoadRow(); };
  var stop = v.querySelector('#wi-stop');
  if (stop) stop.onclick = function () { wineFinish(); };

  /* Saving advances to the next draft. The original handler runs first and
     unchanged: it validates, writes ST.cellar, calls stSave and re-renders.
     Only once it has done all of that is the next row loaded, because it
     clears S._cellarForm on its way out and would wipe a row set up early. */
  var save = v.querySelector('#cl-save');
  if (save) {
    var orig = save.onclick;
    save.onclick = function () {
      var before = (ST.cellar || []).length;
      orig();
      if ((ST.cellar || []).length > before) { w.added++; w.i++; wineLoadRow(); }
      /* No growth means the form refused the row (no producer and no name) and
         has already said so. Stay where we are so it can be corrected. */
    };
  }

  /* Cancel abandons the whole import, not just this bottle: a half-finished
     import that leaves the banner up with no form under it is worse than
     stopping cleanly. */
  var cancel = v.querySelector('#cl-cancel');
  if (cancel) cancel.onclick = function () { wineFinish(); };

  return v;
};

var _v16Render = render;
render = function () {
  if (S.view === 'winepaste') {
    if (S.qT) { clearInterval(S.qT); S.qT = null; }
    var app = document.getElementById('app');
    app.innerHTML = ''; app.appendChild(topbar()); app.appendChild(wineImportView());
    window.scrollTo(0, 0); return;
  }
  _v16Render();
};

/* ═══════════ the doors ═══════════ */
/* WHERE THE BAND GOES, IN TWO TREES THAT NAME THE SAME THING DIFFERENTLY.
   The standalone's codex14 builds `.homesec` sections; the monorepo wing's
   codex14 has moved on and builds `.oot-sec` ones through the shared home
   module. Both are sections holding a `.modes` grid, and this layer has to
   land above the first of them in either. The last resort is a bare `.modes`
   grid, for a tree where no sectioning layer ran at all: climbing to the
   outermost one matters, because once sections exist the first `.modes` is
   nested INSIDE one and inserting there would file the doors under Today. */
function doorAnchor() {
  /* THE TOP MEANS THE TOP. The monorepo wing has no hero: the owner's pass
     took it out, so there the first section IS the top of the page and the
     band lands under the masthead. The standalone still carries the hero, and
     landing below it would put these two doors most of a phone screen down.
     So a hero, where one exists, is what the band goes above. */
  var hero = document.querySelector('.hero');
  if (hero && hero.parentNode) return hero;
  var sec = document.querySelector('.homesec, .oot-sec');
  if (sec && sec.parentNode) return sec;
  var grid = document.querySelector('.modes');
  while (grid && grid.parentNode && grid.parentNode.querySelector
    && grid.parentNode !== document.body
    && grid.parentNode.classList
    && (grid.parentNode.classList.contains('homesec')
      || grid.parentNode.classList.contains('oot-sec'))) grid = grid.parentNode;
  return grid;
}

function buildDoors() {
  if (document.querySelector('.codexdoors')) return;
  var first = doorAnchor();
  if (!first || !first.parentNode) return;

  var n = (ST.cellar || []).length;
  var np = prodCorpus().length;

  /* A DIV, not a section: see note 1 at the head of this file. */
  var band = el('<div class="codexdoors"></div>');
  band.appendChild(el('<div class="codexdoor-row">'
    + '<button class="codexdoor" id="d-list"><span class="cd-k">Our Wine List</span>'
    + '<span class="cd-b">' + (n
      ? n + ' bottle' + (n === 1 ? '' : 's') + ' entered. Drill the pours you actually sell, or recite them.'
      : 'Enter the list the guest is holding, bottle by bottle or all at once, and drill it like the Court’s.')
    + '</span></button>'
    + '<button class="codexdoor" id="d-prod"><span class="cd-k">The Producers</span>'
    + '<span class="cd-b">' + np + ' names by country: estates, bottlings, house style, '
    + 'and the confusion each one is set to catch.</span></button></div>'));

  band.appendChild(el('<div class="codexfind">'
    + '<input id="cf-in" class="sainput" autocomplete="off" spellcheck="false" '
    + 'placeholder="Find a producer, a wine, or a bottle on our list">'
    + '<div id="cf-out"></div></div>'));

  first.parentNode.insertBefore(band, first);

  band.querySelector('#d-list').onclick = function () { S.view = 'cellar'; render(); };
  band.querySelector('#d-prod').onclick = function () {
    S._prod = { c: null, id: null }; S.view = 'producers'; render();
  };

  var inp = band.querySelector('#cf-in'), out = band.querySelector('#cf-out');
  inp.oninput = function () {
    /* Mutate the results only. Touching anything above this div, or calling
       render(), takes the caret with it: see note 2 at the head of this file. */
    var res = codexFind(inp.value);
    out.innerHTML = res ? '<div class="seclist">' + codexFindHtml(res) + '</div>' : '';
    out.querySelectorAll('[data-find-p]').forEach(function (b) {
      b.onclick = function () {
        var rec = prodById(b.dataset.findP);
        if (!rec) return;
        var groups = prodGroups(), ci = 0;
        groups.forEach(function (g, i) { if (g.country === rec.country) ci = i; });
        S._prod = { c: ci, id: rec.id }; S.view = 'producers'; render();
      };
    });
    out.querySelectorAll('[data-find-b]').forEach(function (b) {
      b.onclick = function () { S.view = 'cellar'; render(); };
    });
  };
}

var _v16DecorateHome = decorateHome;
decorateHome = function () {
  _v16DecorateHome();
  try { buildDoors(); } catch (e) { /* a broken band must never hide the tiles */ }
};

/* A rank switch clears the producer view the way every other layer clears
   its own, so a half-opened country does not survive into the next rank. */
var _v16ApplyLevel = applyLevel;
applyLevel = function (lvl, skipRender) {
  S._prod = { c: null, id: null };
  S._wimp = null;
  return _v16ApplyLevel(lvl, skipRender);
};

(function () {
  var css = document.createElement('style');
  css.textContent = [
    '.codexdoors{margin:20px 0 4px}',
    '.codexdoor-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '@media(max-width:640px){.codexdoor-row{grid-template-columns:1fr}}',
    '.codexdoor{display:flex;flex-direction:column;gap:7px;text-align:left;cursor:pointer;',
    '  padding:17px 18px 18px;border:1px solid var(--line);border-radius:3px;',
    '  background:linear-gradient(160deg,rgba(201,162,39,.10),rgba(123,30,46,.10));',
    '  color:var(--parch);font:inherit;transition:border-color .18s,transform .18s}',
    '.codexdoor:hover{border-color:var(--gold);transform:translateY(-2px)}',
    '.codexdoor:focus-visible{outline:2px solid var(--gold-hi);outline-offset:2px}',
    '.cd-k{font-size:1.06rem;letter-spacing:.05em;color:var(--gold-soft);font-weight:600}',
    '.cd-b{font-size:.86rem;line-height:1.5;opacity:.72}',
    '.codexfind{margin:12px 0 0}',
    '.wimp-band{margin:0 0 16px;padding:12px 14px;border:1px solid var(--line);',
    '  border-radius:3px;background:rgba(201,162,39,.07)}',
    '.wimp-count{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;',
    '  color:var(--gold-soft);margin-bottom:6px}',
    '.wimp-raw{font-size:.86rem;opacity:.78;white-space:pre-wrap;word-break:break-word;',
    '  padding:6px 8px;border-left:2px solid var(--line);margin-bottom:8px}',
    '.wimp-note{font-size:.82rem;line-height:1.5;opacity:.68;font-style:italic;margin-bottom:8px}',
    '.codexfind .sainput{width:100%}',
    '.codexfind .seclist{margin-top:8px}',
    /* .seclist is an auto-fill grid, so a heading dropped into it takes a
       cell and sits BESIDE the first two results instead of above them. */
    '.codexfind .seclist .secgroup{grid-column:1/-1;margin:10px 0 0}',
    '.codexfind .seclist .secgroup:first-child{margin-top:0}',
    '.codexfind .sub{grid-column:1/-1}',
    '@media(prefers-reduced-motion:reduce){.codexdoor{transition:none}',
    '  .codexdoor:hover{transform:none}}'
  ].join('\n');
  document.head.appendChild(css);
})();
