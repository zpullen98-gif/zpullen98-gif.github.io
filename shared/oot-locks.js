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

       The first two examinations, Régionale ('intro') and Village
       ('certified'), are free by owner decision (17 Aug 2026): 3,061 questions
       and every study chapter that goes with them. The paid tier is the
       Premier Cru and Grand Cru banks, 1,296 questions, plus the drills
       generated from the venue's own wine list (entering and READING the list
       is own-data and stays free; the generated study surfaces are the
       product). */
    codex: function (key) {
      if (key === 'cellardrill') return false;
      return key === 'intro' || key === 'certified';
    },

    /* key is a cocktail tier number, or a surface name */
    ledger: function (key) {
      if (typeof key === 'number') return key <= 2;
      return LEDGER_FREE_TABS.indexOf(key) > -1;
    },

    /* key is an FL_VIEWS id */
    light: function (key) { return LIGHT_FREE_VIEWS.indexOf(key) > -1; }

    /* almanac: deliberately absent. It is free in full, as the lead engine for
       Calendar For Life Voyages, so it registers no boundary and never gates. */

    /* table: deliberately absent too. The World Table is free in full by the
       owner's decision (19 Sep 2026): "no part of the World Table is ever
       paid". It had a route boundary, a tier mask over the Lexicon and the
       course, and a paywall line; all of it is gone rather than switched off,
       so no future flag can quietly bring it back. terms.html already said
       the Table is open in full; this makes the code agree. */
  };

  /* The Ledger's free surfaces. Gated: practice (the drills and the Ticket
     Rail), flashcards and quiz. Everything else stays reachable, so the free
     tier is a real app rather than a demo.

     `tools` is free despite the brief listing it as paid, for the same reason
     First Light's vault is: it is the only place the Ledger offers My Data
     backup and restore, and locking somebody out of their own study history
     when their card expires is not a paywall, it is a hostage. The calculators
     that sit alongside it are not worth the trade. */
  /* The venue's own menu is own-data: entry and viewing are free at every
     tier. The DRILLS built from it need no listing here, because they live on
     the flashcards/quiz/practice tabs, which stay gated below.

     'menu' is the live key and 'mybar' is the one it was renamed from, kept
     because it costs nothing and a stale key here is a paywall rather than a
     404. Every reference tab is free, so 'ontap' and 'coffee' sit with the
     rest of them. THIS LIST IS OUTSIDE ledger/ AND NO GATE READS IT: a tab
     added to the Ledger and forgotten here is paid the day the free flag
     flips, which is how all three of these came to be missing at once.
     'level' and 'mine' are the four levels' own pages (a level's page and
     Mine with the record): hubs whose doors lead on, so they are free, and
     whatever they open is gated by its own tab as before. */
  var LEDGER_FREE_TABS = ['home', 'level', 'mine', 'mybar', 'menu', 'families', 'library', 'shots', 'na',
                          'service', 'ontap', 'coffee', 'producers', 'prep', 'riffs',
                          'notes', 'tools'];

  /* Free is the complement of what the brief actually sells: the Library, the
     practices and the chart (with the sky, the hall and the threads, which are
     the same content by another door). Everything else stays open, so `year`
     is free: it is how the app is navigated, not a feature.

     Settings and the vault are free at every tier on principle: a lapsed
     subscriber must always be able to get their own writing out.

     POLICY (5 Sep 2026), applied because the product's own written rule is
     that your own data is never gated: the journal is the reader's own
     writing, and the free Today page writes into it; clear (Clear Mornings)
     holds notes that render in that room and nowhere else; search searches
     the journal. lineup (The Line-Up) keeps no record and its own copy
     promises no login, so it is free as written. reset (The Walk-In) is a
     ninety-second refuge reached from the free Today page mid-shift, and a
     paywall over a refuge is not a paywall. floor (The Floor Book) is
     authored content and stays paid, titled below.

     A view that is not listed here is PAID the day it ships: a new room gets
     a line here, or an entry in LIGHT_TITLE and LIGHT_LABEL, before it lands. */
  var LIGHT_FREE_VIEWS = ['today', 'year', 'life', 'stats', 'vault', 'settings',
                          'journal', 'search', 'clear', 'lineup', 'reset'];

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
          detail: 'Régionale and Village stay free forever: 3,061 questions and every study ' +
                  'chapter that goes with them.'
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
    /* A canon drink outside the free tiers. My Bar records carry no tier:
       they are the venue's own list and never match. */
    function lockedDrink(c) {
      return !paid() && c && typeof c.tier === 'number' && !OOT.gate.allow('ledger', c.tier);
    }
    function lockedTicket(c, hideName) {
      return '<div class="oot-locked-ticket">' +
             '<p><b>' + (hideName ? 'This one' : esc(c.name)) + '</b></p>' +
             '<p>Tier ' + c.tier + '. Specs from Tier 3 on are part of the ' +
             'subscription; Tiers 1 and 2 stay free, all 33 of them.</p></div>';
    }

    if (typeof w.ticketHTML === 'function') {
      var ticketHTML = w.ticketHTML;
      /* hideName is the blind-tasting mode: the quiz calls ticketHTML(c, true)
         to print a spec with the drink's name withheld, which is the whole
         question. Honour it, or the locked card gives away every answer. */
      w.ticketHTML = function (c, hideName) {
        if (lockedDrink(c)) return lockedTicket(c, hideName);
        return ticketHTML.apply(this, arguments);
      };
    }

    /* The Tools tab is free (see LEDGER_FREE_TABS), and three of its sheets
       take "a drink" from the whole canon through toolDrink(): the batch sheet
       prints every spec line scaled by the servings, which at 1 is the spec
       itself, so a free visitor could read all 332 paid specs one batch at a
       time through a tab the boundary says is free. Strength and Pour Cost
       print totals only, but they are the same select over the same 365, so
       the rule is applied to all three: a paid drink renders the locked card
       in place of the sheet. The wing's targeted repaints (app.js) call these
       by bare name, which resolves to the global we replace here. */
    if (typeof w.toolDrink === 'function') {
      ['batchOutHTML', 'costTicketHTML'].forEach(function (name) {
        if (typeof w[name] !== 'function') return;
        var orig = w[name];
        w[name] = function () {
          var c = null;
          try { c = w.toolDrink(); } catch (e) {}
          if (lockedDrink(c)) return lockedTicket(c);
          return orig.apply(this, arguments);
        };
      });
      if (typeof w.strengthHTML === 'function') {
        var strengthHTML = w.strengthHTML;
        w.strengthHTML = function () {
          var c = null;
          try { c = w.toolDrink(); } catch (e) {}
          if (lockedDrink(c)) {
            /* The panel and its heading are the wing's; only the estimate
               is withheld. */
            return '<div class="panel p5 col" style="gap:14px">' +
                   '<h2 class="eyebrow">Strength &amp; dilution</h2>' + lockedTicket(c) + '</div>';
          }
          return strengthHTML.apply(this, arguments);
        };
      }
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
    flashcards: 'The full flashcard deck is part of the subscription',
    quiz:     'The full quiz is part of the subscription'
  };

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
          detail: "Today's voice, the year, the goal ladder and your journal stay free " +
                  'forever, and Settings and the Vault stay open at every tier.'
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

  /* Every gated view has a title and a label; journal, search, clear, lineup
     and reset keep theirs so a future change to the free list above never
     lands a room under a heading that just says Locked. */
  var LIGHT_TITLE = { library: 'The Library', journal: 'The Journal', body: 'The Practices',
                      chart: 'The Chart', astro: 'The Sky', hall: 'The Year’s Readings',
                      threads: 'The Threads', search: 'Search',
                      reset: 'The Walk-In', floor: 'The Floor Book',
                      clear: 'Clear Mornings', lineup: 'The Line-Up' };
  var LIGHT_LABEL = {
    library: 'The Library is part of the subscription',
    journal: 'The Journal is part of the subscription',
    body: 'The practices are part of the subscription',
    chart: 'The chart is part of the subscription',
    astro: 'The sky readings are part of the subscription',
    hall: 'The year’s readings are part of the subscription',
    threads: 'The threads are part of the subscription',
    search: 'Search is part of the subscription',
    reset: 'The Walk-In is part of the subscription',
    floor: 'The Floor Book is part of the subscription',
    clear: 'Clear Mornings is part of the subscription',
    lineup: 'The Line-Up is part of the subscription'
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

  var LOCKS = { codex: lockCodex, ledger: lockLedger, light: lockLight };

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
