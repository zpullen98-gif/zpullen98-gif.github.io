/* Outside Of Time: the free/paid boundaries, and the hooks that enforce them.
   Loaded after oot-gate.js and before oot-bar.js, which means it loads AFTER
   everything a wing defines. That ordering is the whole design: this file wraps
   the wing's own functions from outside, so no wing's code is restructured and
   removing this script leaves every wing exactly as it was.

   THIS IS THE FILE TO EDIT WHEN TUNING WHAT IS FREE. The BOUNDARIES table below
   is the single source of truth; the copy shown to a visitor lives in
   oot-config.js and the two are meant to be read together.

   Three rules the hooks follow:

   1. Paid users take the untouched path. Every wrapper either checks the tier
      before calling through, or calls through first and returns the wing's own
      result unaltered, so nothing here changes what a paying visitor sees.
   2. Fail open on the mechanism, closed on the content. An unknown wing, a
      missing global or a boundary that throws all mean "not gated", because a
      paywall over free content is worse than a leak. But where a route IS
      gated, the content is masked rather than merely covered: an overlay that
      Escape dismisses is not a gate.
   3. Mark, do not delete. Locked ranks, tabs and semesters stay visible and
      reachable, because a locked door someone can see is the pitch and a
      disappeared one is just a smaller app. */
(function (w) {
  'use strict';
  var OOT = w.OOT;
  if (!OOT || !OOT.gate) return;

  /* ============================ THE BOUNDARIES ============================ */

  var BOUNDARIES = {
    /* TWO key kinds, like the Ledger's: a level id from LEVEL_ORDER, or the
       'cellardrill' surface key for the Our List study surfaces.

       Ranks I AND II are free, by owner decision (17 Aug 2026): the Page and
       Squire banks were imported from established material whose rights chain
       is unconfirmed, and nothing with an unconfirmed provenance belongs
       behind a paywall. The paid tier is the Knight and Ruler banks: 1,007
       questions written for this product, plus the drills generated from the
       venue's own wine list (entering and READING the list is own-data and
       stays free; the generated study surfaces are the product). */
    codex: function (key) {
      if (key === 'cellardrill') return false;
      return key === 'intro' || key === 'certified';
    },

    /* key is a cocktail tier number, or a surface name */
    ledger: function (key) {
      if (typeof key === 'number') return key <= 2;
      return LEDGER_FREE_TABS.indexOf(key) > -1;
    },

    /* key is location.pathname with /table stripped */
    table: function (key) {
      if (TABLE_FREE_ROUTES.indexOf(key) > -1) return true;
      if (key.indexOf('/recipe/') === 0) return TABLE_FREE_RECIPES.indexOf(key.slice(8)) > -1;
      if (key.indexOf('/chapter/') === 0) return true;   /* browsing the shelf is free */
      if (key.indexOf('/family/') === 0) return true;    /* the visitor's own saved work */
      return false;
    },

    /* key is an FL_VIEWS id */
    light: function (key) { return LIGHT_FREE_VIEWS.indexOf(key) > -1; }

    /* almanac: deliberately absent. It is free in full, as the lead engine for
       Calendar For Life Voyages, so it registers no boundary and never gates. */
  };

  /* The Ledger's free surfaces. Gated: practice (the drills and the Ticket
     Rail), flashcards and quiz. Everything else stays reachable, so the free
     tier is a real app rather than a demo.

     `tools` is free despite the brief listing it as paid, for the same reason
     First Light's vault is: it is the only place the Ledger offers My Data
     backup and restore, and locking somebody out of their own study history
     when their card expires is not a paywall, it is a hostage. The calculators
     that sit alongside it are not worth the trade. */
  /* mybar is the venue's own menu: entry and viewing are own-data, free at
     every tier. The DRILLS built from it need no listing here: they live on
     the flashcards/quiz/practice tabs, which stay gated below. */
  var LEDGER_FREE_TABS = ['home', 'mybar', 'families', 'library', 'shots', 'na',
                          'service', 'producers', 'prep', 'riffs', 'notes', 'tools'];

  /* Semester 1 of the Path of Study, plus the routes that sell the rest: the
     study index and the lexicon stay reachable so somebody can see the shape of
     what they would be buying. Their locked parts are masked in place (below)
     rather than removed.

     /family and /menu are the visitor's OWN saved work, not guide content, so
     they are free at every tier on the same principle as the Ledger's tools and
     First Light's vault. /pantry is the free matcher. There is no /about route
     in this build; listing one would be a promise nothing keeps. */
  var TABLE_FREE_ROUTES = ['', '/', '/study', '/lexicon', '/pantry',
                           '/family', '/menu', '/menu/guest',
                           /* Added 27 Aug 2026, when the Table's navigation was rebuilt
                              around five tabs. BOUNDARIES.table is exact-match with
                              `return false` as its default, so a route that is not
                              listed here is PAID the day it ships, and four of the
                              five new tabs would have locked on arrival, which would
                              have delivered the new IA as a paywall.

                              /recipes is the 970-card browse index, moved off the
                              front door. It is free on the rule three lines above:
                              browsing the shelf is free, and every /chapter/ page
                              already is. Gating the index while leaving all 94
                              chapters open protects nothing.

                              /learn, /practise and /service are hub pages. They hold
                              no guide content, each is a set of links and counts,
                              and they are the pitch for what is behind them. Gate the
                              CONTENT, not the tab that describes it.

                              /repertoire is the visitor's own cooked log and nothing
                              else: same principle as /family and /menu above. It is
                              also where the mode bar's amber count points, and a
                              count saying three of YOUR dishes are past their re-cook,
                              followed by a paywall, is worse than no count at all.

                              /safety carries the guide's two food-safety entries and
                              writes nothing. Its own page states that it is free
                              reference content; this is that claim made true. */
                           '/recipes', '/learn', '/practise', '/service',
                           '/repertoire', '/safety'];

  /* Semester 1, "Knife & Fire Foundations", from study.json. Five recipes and
     four lexicon terms. Hardcoded because the wing ships as a built bundle with
     no readable data file at a stable URL, so reading it at runtime would mean
     depending on a content-hashed asset name that changes every build. If the
     first semester's contents change, they change here too. */
  var TABLE_FREE_RECIPES = ['the-french-omelette', 'cacio-e-pepe', 'ratatouille',
                            'chicken-piccata', 'salade-nicoise'];
  var TABLE_FREE_TERMS = ['mise-en-place', 'knife-cuts-the-classical-ladder',
                          'sweat-vs-saute-vs-sear', 'deglaze-and-fond'];

  /* Free is the complement of what the brief actually sells: the Library, the
     journal, the practices and the chart (with the sky, the hall and the
     threads, which are the same content by another door). Everything else stays
     open, so `year` is free: it is how the app is navigated, not a feature.

     Settings and the vault are free at every tier on principle: a lapsed
     subscriber must always be able to get their own writing out. */
  var LIGHT_FREE_VIEWS = ['today', 'year', 'life', 'stats', 'vault', 'settings'];

  /* ======================================================================== */

  function wing() {
    var m = /^\/(codex|ledger|table|light|almanac)(\/|$)/.exec(w.location.pathname);
    return m ? m[1] : null;
  }

  function paid() { return OOT.gate.isPaid(); }

  /* Reach a wing's top-level binding by name.

     Not every global is on `window`. A classic script's `var` and `function`
     declarations become properties of the global object, but `const` and `let`
     go into the global LEXICAL environment instead, where `window.x` is
     undefined and only a bare identifier resolves. The Ledger declares both
     `state` and `COCKTAILS` with const, so reading them off window silently
     returned undefined and the whole lock quietly declined to install.

     Indirect eval runs in global scope and sees both, which is exactly what is
     needed and nothing more: it evaluates a fixed identifier from this file,
     never anything from a page, a URL or storage. */
  function G(name) {
    try { return (0, eval)(name); } catch (e) { return undefined; }
  }

  var here = wing();
  if (!here) return;
  if (BOUNDARIES[here]) OOT.gate.registerBoundary(here, BOUNDARIES[here]);

  /* --------------------------------------------------------- the Codex --- */

  /* The codex stores its rank under a profile-scoped key; this file's
     save-and-restore has to read the same one, or correcting a free visitor's
     rank would read one person's saved level and write it into another's.
     Dormant while the edition is free, correct if it ever is not. */
  function codexLevelKey() {
    try {
      return (window.OOT && OOT.profiles && OOT.profiles.key)
        ? OOT.profiles.key('codexLevel') : 'codexLevel';
    } catch (e) { return 'codexLevel'; }
  }

  function lockCodex() {
    if (typeof w.applyLevel !== 'function' || !w.LEVELS) return;

    /* Our own calls must not be refused by our own wrapper. */
    var internal = false;

    /* Capture the CURRENT global, which is codex8's wrapper around codex7's
       original. Capturing codex7's would drop the speech-synthesis teardown and
       leave the browser reading Master prompts aloud after a level change. */
    var applyLevel = w.applyLevel;

    w.applyLevel = function (lvl, skipRender) {
      if (!internal && !OOT.gate.allow('codex', lvl)) {
        var L = w.LEVELS[lvl] || {};
        OOT.gate.paywall({
          what: (L.name || L.label || 'That rank') + ' is part of the subscription',
          detail: 'Ranks I and II stay free forever: 3,061 questions and every study chapter ' +
                  'that goes with them.'
        });
        return;                       /* activeLevel unchanged; the pin stays clickable */
      }
      return applyLevel.apply(this, arguments);
    };

    /* Mark the locked pins rather than removing them. courtStrip is looked up
       at call time by decorateHome, so reassigning it here is picked up. */
    if (typeof w.courtStrip === 'function') {
      var courtStrip = w.courtStrip;
      w.courtStrip = function () {
        var strip = courtStrip.apply(this, arguments);
        if (paid() || !strip || !strip.querySelectorAll) return strip;
        var pins = strip.querySelectorAll('.courtpin');
        for (var i = 0; i < pins.length; i++) {
          var lvl = (w.LEVEL_ORDER || [])[i];
          if (!lvl || OOT.gate.allow('codex', lvl)) continue;
          pins[i].classList.add('oot-locked');
          pins[i].setAttribute('aria-disabled', 'true');
          var stat = pins[i].querySelector('.cpstat');
          if (stat) stat.textContent = 'Locked';
        }
        return strip;
      };
    }

    /* The wing boots to the PAID Certified rank: codex7.js defaults activeLevel
       to 'certified', and the restore IIFE only overrides it when a stored key
       says something else. boot.js has already painted by the time we get here,
       so a free visitor is looking at the Squire bank right now. applyLevel
       rebinds every data global and re-renders, which is why one call fixes both
       the data and the paint. */
    function correct(isChange) {
      if (paid()) {
        /* At boot, a paid user needs nothing: leave their paint exactly as the
           wing made it. On a CHANGE to paid, restore what the free interlude
           took: a subscriber on a cold cache reads 'free' for the first beat,
           gets corrected onto Rank I, and their saved rank was preserved in
           storage but not on screen, so when the real tier lands, re-apply
           it rather than merely repainting the demotion. */
        if (isChange) {
          var saved = null;
          try { saved = w.localStorage.getItem(codexLevelKey()); } catch (e) {}
          if (saved && saved !== w.activeLevel && w.LEVELS && w.LEVELS[saved]) {
            internal = true;
            try { applyLevel(saved); } finally { internal = false; }
          } else if (typeof w.render === 'function') {
            try { w.render(); } catch (e) {}
          }
        }
        return;
      }
      if (!OOT.gate.allow('codex', w.activeLevel)) {
        /* A gated rank on a free paint corrects to Certified: the wing's own
           default boot level, and free. applyLevel persists the new level to
           localStorage codexLevel. A subscriber whose entitlement has not
           resolved yet reads as free for one tick, and without this their
           saved rank would be overwritten permanently: the tier recovers,
           the record of where they were studying does not. Put it back; the
           tier change re-applies it (see correct(true) above). */
        var savedLevel = null;
        try { savedLevel = w.localStorage.getItem(codexLevelKey()); } catch (e) {}
        internal = true;
        try { applyLevel('certified'); } finally { internal = false; }
        if (savedLevel && savedLevel !== 'certified') {
          try { w.localStorage.setItem(codexLevelKey(), savedLevel); } catch (e) {}
        }
      } else if (typeof w.render === 'function') {
        /* Already on the free rank, but painted before our wrappers existed, so
           the locked pins are not marked yet. One repaint, free users only. */
        try { w.render(); } catch (e) {}
      }
    }

    /* Our List: entering and reading the venue's wine list is free own-data;
       the drill and the recitation deck built FROM it are paid study surfaces.
       Wrapped here rather than listed as views because codex12 starts both
       through plain function calls, the same wrap-the-global seam as
       applyLevel. codex12 absent means nothing to wrap: fail open on the
       mechanism, as always. Buttons stay visible to free users: the locked
       drill is the pitch. */
    ['startCellarDrill', 'startCellarRecite'].forEach(function (name) {
      if (typeof w[name] !== 'function') return;
      var orig = w[name];
      w[name] = function () {
        if (!OOT.gate.allow('codex', 'cellardrill')) {
          OOT.gate.paywall({
            what: 'Drilling your own list is part of the subscription',
            detail: 'Entering and reading your wine list stays free forever, on every tier; ' +
                    'the drills built from it come with the subscription.'
          });
          return;
        }
        return orig.apply(this, arguments);
      };
    });

    /* Do not act on a guess. The gate answers synchronously from cache, and a
       cold cache reads 'free' whether or not the visitor has paid, so
       correcting at boot demoted real subscribers to Rank I on their first
       visit from a new device. Correct only what the cache already knows, then
       again once the tier is actually settled. */
    if (OOT.gate.tier() !== 'anon' || OOT.gate._cache()) correct(false);
    OOT.gate.ready.then(function () { correct(false); });
    /* onChange fires immediately with the current tier; this wing has
       just painted with it, so the first call is a wasted repaint (and in
       the ledger a second full render at boot). Only later changes. */
    var firstTier_codex = true;
    OOT.gate.onChange(function () {
      if (firstTier_codex) { firstTier_codex = false; return; }
      correct(true);
    });
  }

  /* -------------------------------------------------------- the Ledger --- */

  function lockLedger() {
    var state = G('state');
    var COCKTAILS = G('COCKTAILS');
    if (typeof w.render !== 'function' || !state) return;

    /* The spec itself. Four call sites including the print sheet and the quiz
       ticket, so wrapping this closes the routes a tab check would miss. */
    if (typeof w.ticketHTML === 'function') {
      var ticketHTML = w.ticketHTML;
      /* hideName is the blind-tasting mode: the quiz calls ticketHTML(c, true)
         to print a spec with the drink's name withheld, which is the whole
         question. Honour it, or the locked card gives away every answer. */
      w.ticketHTML = function (c, hideName) {
        if (!paid() && c && typeof c.tier === 'number' && !OOT.gate.allow('ledger', c.tier)) {
          return '<div class="oot-locked-ticket">' +
                 '<p><b>' + (hideName ? 'This one' : esc(c.name)) + '</b></p>' +
                 '<p>Tier ' + c.tier + '. Specs from Tier 3 on are part of the ' +
                 'subscription; Tiers 1 and 2 stay free, all 33 of them.</p></div>';
        }
        return ticketHTML.apply(this, arguments);
      };
    }

    /* Tonight's Session must be taken as a pair: the deck builder AND the
       starter, because the starter has an unfiltered fallback of its own. */
    if (typeof w.sessionDeckParts === 'function') {
      var deckParts = w.sessionDeckParts;
      w.sessionDeckParts = function () {
        var r = deckParts.apply(this, arguments);
        if (paid() || !r) return r;
        var ok = function (d) { return d.src !== 'Cocktails' || OOT.gate.allow('ledger', d.tier); };
        return { dueDeck: (r.dueDeck || []).filter(ok),
                 newDeck: (r.newDeck || []).filter(ok),
                 dueAll: r.dueAll };
      };
    }
    if (typeof w.startSession === 'function') {
      var startSession = w.startSession;
      w.startSession = function () {
        var out = startSession.apply(this, arguments);
        if (!paid() && state.fc && state.fc.deck) {
          var ok = function (d) { return d.src !== 'Cocktails' || OOT.gate.allow('ledger', d.tier); };
          var trimmed = state.fc.deck.filter(ok);
          if (trimmed.length !== state.fc.deck.length) {
            state.fc.deck = trimmed;
            state.fc.idx = 0;
            if (typeof w.prepCard === 'function') w.prepCard();
          }
        }
        return out;
      };
    }

    /* Route-level: the paid tabs, and a deep-linked paid cocktail. */
    var render = w.render;
    var raising = false;
    w.render = function () {
      if (!paid() && !raising) {
        var s = state;
        if (s.tab && !OOT.gate.allow('ledger', s.tab)) {
          var was = s.tab;
          s.tab = 'home';
          s.sheet = null;
          raising = true;
          OOT.gate.paywall({
            what: LEDGER_LABEL[was] || 'That is part of the subscription',
            detail: 'Tiers I and II, 33 cocktails, stay free forever, along with the ' +
                    'families, the library and the reference shelves.'
          });
          raising = false;
        } else if (s.tab === 'library' && s.lib && s.lib.open != null && COCKTAILS) {
          var c = COCKTAILS[s.lib.open];
          if (c && !OOT.gate.allow('ledger', c.tier)) {
            s.lib.open = null;
            raising = true;
            OOT.gate.paywall({
              what: 'The ' + c.name + ' is part of the subscription',
              detail: 'Tier ' + c.tier + '. Tiers I and II stay free forever, all 33 of them.'
            });
            raising = false;
          }
        }
      }
      return render.apply(this, arguments);
    };

    /* The wing painted before we existed. Repaint once so the gate applies to
       whatever is already on screen, and again if the tier lands late. */
    if (!paid()) { try { w.render(); } catch (e) {} }
    /* onChange fires immediately with the current tier; this wing has
       just painted with it, so the first call is a wasted repaint (and in
       the ledger a second full render at boot). Only later changes. */
    var firstTier_ledger = true;
    OOT.gate.onChange(function () {
      if (firstTier_ledger) { firstTier_ledger = false; return; }
      try { w.render(); } catch (e) {}
    });
  }

  var LEDGER_LABEL = {
    practice: 'The drills and the Ticket Rail are part of the subscription',
    tools:    'The tools are part of the subscription',
    flashcards: 'The full flashcard deck is part of the subscription',
    quiz:     'The full quiz is part of the subscription'
  };

  /* ---------------------------------------------------- the World Table --- */

  function lockTable() {
    /* Nothing here touches Svelte's DOM. The gate reads location.pathname and
       appends a fixed-position node to <body>, outside the element the app
       mounts into, so hydration never sees it. */
    var BASE = '/table';

    function route() {
      var p = w.location.pathname;
      if (p.indexOf(BASE) === 0) p = p.slice(BASE.length);
      if (p.length > 1 && p.charAt(p.length - 1) === '/') p = p.slice(0, -1);
      return p;
    }

    injectTableCss();

    var settled = false;
    var lastShown = null;

    function evaluate() {
      var r = route();
      var el = w.document.documentElement;

      /* TWO attributes, because they answer two different questions.

         data-oot-tier="free" says who the visitor is, and is set on every route.
         The partial masks (the study semesters, the lexicon definitions) live on
         FREE routes: /study and /lexicon are both free, because seeing the
         shape of what you would buy is the pitch. Scoping those masks to the
         route verdict meant they only applied where the elements do not exist,
         so every semester and all 479 definitions were delivered in clear.

         data-oot-table="locked" says this particular route is gated, and hides
         the sheet body. That one is per-route by nature. */
      if (paid()) el.removeAttribute('data-oot-tier');
      else el.setAttribute('data-oot-tier', 'free');

      /* The blur is only the VISUAL half of the mask. Blur and pointer-events
         leave every button in the tab order and every prompt in the
         accessibility tree, so a keyboard or screen-reader user could operate
         a blurred drill end to end. inert on the sheet removes it from both;
         the attribute sits on a prerendered element Svelte does not manage,
         and a route change replaces the element, so evaluate() re-applies on
         every route where it matters. */
      var sheet = w.document.querySelector('article.sheet');

      var open = OOT.gate.paywallOpen();
      if (paid() || OOT.gate.allow('table', r)) {
        el.removeAttribute('data-oot-table');
        if (sheet) sheet.removeAttribute('inert');
        if (open && lastShown !== null) { OOT.gate.closePaywall(); lastShown = null; }
        return;
      }

      /* Hide the content, not just the view of it. Recipe and technique pages
         are prerendered static HTML, so the overlay alone gated nothing: Escape,
         a backdrop click or the overlay's own "keep exploring" button left the
         full ingredients and method sitting there. Masking first also covers the
         window before the tier settles, when no overlay is raised at all. */
      el.setAttribute('data-oot-table', 'locked');
      if (sheet) sheet.setAttribute('inert', '');
      if (!settled || open || lastShown === r) return;
      lastShown = r;
      OOT.gate.paywall({
        what: TABLE_LABEL(r),
        detail: 'Semester 1 of the Path of Study and a preview of the Lexicon stay free forever.',
        onClose: function () { lastShown = null; }
      });
    }

    var push = w.history.pushState;
    var replace = w.history.replaceState;
    /* Call through FIRST: location.pathname is only correct afterwards. */
    w.history.pushState = function () {
      var out = push.apply(w.history, arguments);
      try { evaluate(); } catch (e) {}
      return out;
    };
    w.history.replaceState = function () {
      var out = replace.apply(w.history, arguments);
      try { evaluate(); } catch (e) {}
      return out;
    };
    w.addEventListener('popstate', function () { try { evaluate(); } catch (e) {} });

    OOT.auth.ready.then(function () { settled = true; evaluate(); });
    /* onChange fires immediately with the current tier; this wing has
       just painted with it, so the first call is a wasted repaint (and in
       the ledger a second full render at boot). Only later changes. */
    var firstTier_table = true;
    OOT.gate.onChange(function () {
      if (firstTier_table) { firstTier_table = false; return; }
      try { evaluate(); } catch (e) {}
    });
    evaluate();
  }

  function TABLE_LABEL(r) {
    if (r.indexOf('/recipe/') === 0) return 'This recipe is part of the subscription';
    if (r.indexOf('/technique') === 0) return 'The techniques are part of the subscription';
    return 'This is part of the subscription';
  }

  /* ---------------------------------------------------- First Light --- */

  function lockLight() {
    var V = w.FL_VIEWS;
    if (!V) return;

    Object.keys(V).forEach(function (id) {
      /* Decide from the boundary list, NOT from gate.allow(). allow() answers
         true for everything while the tier is paid, so installing during a paid
         session wrapped nothing at all, and the wrappers are what a later drop
         to free depends on. Which views are gated is a fixed fact about the
         product; whether the gate fires is the tier's business, and that is
         checked inside the wrapper. */
      if (LIGHT_FREE_VIEWS.indexOf(id) > -1) return;
      var view = V[id];
      if (!view || typeof view.render !== 'function') return;
      var render = view.render;
      view.render = function () {
        if (paid()) return render.apply(this, arguments);
        /* Raise the overlay, and return a quiet panel underneath it so the
           route still has something legible behind the dialog. */
        OOT.gate.paywall({
          what: LIGHT_LABEL[id] || 'This is part of the subscription',
          detail: "Today's voice, the year and the goal ladder stay free forever, and " +
                  'Settings and the Vault stay open at every tier.'
        });
        return '<section class="oot-locked-view"><h2>' + esc(LIGHT_TITLE[id] || 'Locked') +
               '</h2><p>Part of the Outside Of Time subscription. ' +
               "Today's voice and the goal ladder stay free.</p></section>";
      };
      /* after() runs post-insert and would operate on markup that is no longer
         there; neutralise it for gated views only. */
      if (typeof view.after === 'function') {
        var after = view.after;
        view.after = function () { if (paid()) return after.apply(this, arguments); };
      }
    });

    /* First Light's renderer is `render` (light/js/app.js:101). This called a
       flRender that has never existed, so nothing was ever repainted: the wing's
       boot IIFE paints the requested view with the ORIGINAL render before this
       file has parsed, which meant landing directly on #/library by bookmark,
       reload or PWA relaunch showed the whole paid view with no overlay at all.
       One repaint at install closes that, and the same call on a tier change
       clears the locked panel the moment somebody subscribes. */
    function repaint() {
      if (typeof w.render === 'function') { try { w.render(); } catch (e) {} }
    }
    if (!paid()) repaint();
    /* onChange fires immediately with the current tier; this wing has
       just painted with it, so the first call is a wasted repaint (and in
       the ledger a second full render at boot). Only later changes. */
    var firstTier_light = true;
    OOT.gate.onChange(function () {
      if (firstTier_light) { firstTier_light = false; return; }
      repaint();
    });
  }

  var LIGHT_TITLE = { library: 'The Library', journal: 'The Journal', body: 'The Practices',
                      chart: 'The Chart', astro: 'The Sky', hall: 'The Study Hall',
                      threads: 'The Threads', search: 'Search' };
  var LIGHT_LABEL = {
    library: 'The Library is part of the subscription',
    journal: 'The Journal is part of the subscription',
    body: 'The practices are part of the subscription',
    chart: 'The chart is part of the subscription',
    astro: 'The sky readings are part of the subscription'
  };

  /* -------------------------------------------------------------- boot --- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* The only CSS this file adds, and every rule is namespaced or attribute-
     scoped so a wing's own stylesheet is untouched. Wings are not restyled:
     these rules only apply to elements the locks marked, or under an attribute
     the locks set on <html>. */
  function css(rules) {
    var s = document.createElement('style');
    s.setAttribute('data-oot-locks', '');
    s.textContent = rules;
    (document.head || document.documentElement).appendChild(s);
  }

  function injectSharedCss() {
    css(
      '.oot-locked{opacity:.55;position:relative}' +
      '.oot-locked-ticket{padding:14px 16px;border:1px dashed rgba(198,166,100,.5);' +
        'border-radius:4px;line-height:1.5}' +
      '.oot-locked-view{padding:2.5em 1.2em;text-align:center;max-width:34em;margin:0 auto}'
    );
  }

  /* The World Table is masked, not emptied: the study index and the lexicon
     stay on screen with their locked parts blurred, so the shape of what is
     being sold is visible. Selectors match only authored class names from the
     Svelte source, never generated ones. */
  function injectTableCss() {
    /* The four Semester 1 terms stay legible; the id is the slug, authored in
       the Svelte source, so these selectors survive a rebuild. */
    var free = TABLE_FREE_TERMS.map(function (slug) {
      return 'html[data-oot-tier="free"] .lexcard#' + slug + ' .def{filter:none;user-select:auto}';
    }).join('');
    css(
      /* Partial masks, on free routes, keyed to the TIER. */
      'html[data-oot-tier="free"] ol.semesters > li.semester:nth-child(n+2){' +
        'filter:blur(4px);pointer-events:none;user-select:none}' +
      'html[data-oot-tier="free"] .lexcard .def,' +
      'html[data-oot-tier="free"] .flash .def{filter:blur(3px);user-select:none}' +
      free +
      /* Whole-sheet mask, on gated routes, keyed to the ROUTE. The crumbs and
         the title stay readable so the page still says what it is; the body is
         what the subscription buys. */
      'html[data-oot-table="locked"] article.sheet > *:not(h1):not(.crumbs):not(header){' +
        'filter:blur(5px);pointer-events:none;user-select:none}' +
      'html[data-oot-table="locked"] .ingredients,' +
      'html[data-oot-table="locked"] .steps{filter:blur(5px);pointer-events:none;user-select:none}' +
      '@media(prefers-reduced-motion:reduce){html[data-oot-table="locked"] *{transition:none}}'
    );
  }

  var LOCKS = { codex: lockCodex, ledger: lockLedger, table: lockTable, light: lockLight };

  function boot() {
    var fn = LOCKS[here];
    if (!fn) return;                       /* the Almanac, deliberately */
    injectSharedCss();
    try { fn(); } catch (e) {
      /* Fail open, loudly enough to find in a console but never to the visitor. */
      if (w.console && w.console.warn) w.console.warn('Outside Of Time: lock for ' + here + ' did not install.', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window);
