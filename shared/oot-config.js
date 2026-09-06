/* Outside Of Time: shared configuration.
   The one place the brand, the offer and the wing list are written down, so the
   hub can render itself from data rather than from markup. Classic script, no
   build step, same discipline as every wing.

   Changing domains is NOT a one-line edit here: canonical, og:url and JSON-LD
   are static HTML that crawlers read before any script runs. AUDIT.md keeps the
   full list of five places, with the grep that finds them. */
(function (w) {
  'use strict';
  var OOT = w.OOT = w.OOT || {};

  OOT.config = {
    /* The full name, with "Hospitality". The hub's masthead, the manifest, the
       terms and privacy pages and the alt text all render it from here. The
       return chip (oot-bar.js), the Pass page, 404 and pricing say the short
       form 'Outside Of Time' as their own static markup; whether the two should
       be one string is a brand decision, not made here. */
    name: 'Outside Of Time Hospitality',
    tagline: 'The craft, the reset, and the road.',
    blurb: 'Master the timeless art of hospitality',

    /* Read by no script in shared/ or the wings: it feeds no link. Kept as the
       value to put in Supabase's redirect allowlist and as one of the places
       AUDIT.md's grep finds the literal. The site is served today from
       https://zpullen98-gif.github.io, which the hub's canonical and og:url
       name as static markup in index.html; the almanac's own meta still says
       this domain. Changing domains is the hand edit the header describes. */
    domain: 'outsideoftime.app',

    /* Supabase. Empty is meaningful: with no url/anonKey, oot-auth and oot-gate
       run in mock mode, so every tier is testable before the project exists.
       Fill both in and the same code paths go live with no other edit. See
       supabase/README.md.

       The anon key belongs here. It identifies the project and authorises
       nothing on its own; RLS is what protects the data, and entitlements have
       no client write policy at all. The service_role key is the opposite and
       must never appear in this directory. */
    supabase: {
      url: '',
      anonKey: ''
    },

    /* The Stripe Payment Link, straight from the dashboard. There is exactly
       one, because there is exactly one price. Empty is meaningful, same
       convention as supabase above: with no link, checkout is not live, and on
       localhost or in mock mode the hub offers a simulated checkout so the
       whole purchase path is testable before Stripe exists.

       This is a checkout URL, not a secret. The hub appends
       client_reference_id=<supabase user id> when it sends someone there, which
       is how the webhook knows whose entitlement to write, and why the hub
       requires sign-in before checkout. See supabase/README.md for the
       runbook. */
    stripe: {
      monthlyLink: ''
    },

    /* The founder's own address. The gate grants this signed-in identity the
       full subscription in every mode (mock today, Supabase later) so the
       owner opens every wing on any device just by signing in. Ownership of
       the inbox is the credential: the magic link (or the local mock sign-in)
       has to be completed as this address. At launch, the comp row in
       supabase/README.md makes the server agree; this grant is what makes it
       true even before the server exists, and offline after it does. */
    founder: 'zpullen98@gmail.com',

    /* One price, sold to venues: $49.99 a month, per venue. The hub, the
       paywall overlay and terms.html all render from here, so the number lives
       in exactly one place. Annual, founding and the seat count are gone by the
       18 Aug 2026 pivot: there is no consumer plan left for them to be the
       cheaper half of, and a second number on the money screen would only ask a
       manager to do arithmetic. */
    /* THE FREE EDITION (29 Aug 2026). Every wing, every rank, open to
       everyone: built for the owner's own crew, family and friends. While
       this flag is true, oot-gate answers 'paid' for every visitor, so every
       lock boundary passes and the paywall is unreachable. The whole
       subscription machine below and in oot-auth/oot-gate/oot-locks stays
       intact: flip this to false (and restore the hub's pricing section from
       git history) if the subscription ever returns. */
    free: true,

    price: {
      monthly: 49.99,
      refundDays: 14
    },

    pillars: [
      { id: 'craft', name: 'The Craft', line: 'What you do behind the bar and on the floor.' },
      { id: 'reset', name: 'The Reset', line: 'What keeps you standing when the shifts stack up.' },
      { id: 'road',  name: 'The Road',  line: 'Where the work can take you.' }
    ],

    /* `free` and `paid` are copy for the hub's door cards, nothing more: the
       tier is decided in oot-gate.js and the boundaries live in oot-locks.js.
       The hub renders `free` under a Free chip on every card and adds a Paid
       chip only when `paid` is set, so `paid: null` is the free edition's
       shape and every `free` line below describes the whole wing.

       ON FLIP DAY (free: false) BOTH LINES CHANGE, or the front door promises
       under a Free chip exactly what the paywall then refuses. What the locks
       in oot-locks.js actually gate, and so what the lines must say:

         codex   free: Régionale and Village, 3,061 questions, compendium,
                       your own list
                 paid: Premier Cru and Grand Cru, 1,296 questions, drilling
                       your own list
         ledger  free: Tiers 1 and 2, 33 cocktails, families, library,
                       reference, tools, My Bar
                 paid: 332 specs from Tier 3 on, the drills, Ticket Rail,
                       flashcards, quiz
         table   free: Semester 1, a preview of the Lexicon, browsing the
                       shelf, your menu, family notes, prep and costing sheets
                 paid: the other 1,839 recipes, the techniques, semesters 2
                       to 10, the rest of the Lexicon, the service track
         light   free: Today's voice, the year, the goal ladder, journal,
                       Clear Mornings, the Line-Up, the Walk-In, Vault
                 paid: the Library, the practices, the chart, the sky, the
                       year's readings, the threads, the Floor Book
         almanac free as it is; it registers no boundary and never gates. */
    wings: [
      {
        id: 'codex', path: 'codex/', pillar: 'craft',
        short: 'Sommelier’s Codex', motto: 'Knowledge · Terroir · Mastery',
        name: "The Sommelier's Codex",
        line: 'Four examinations, from Régionale to Grand Cru.',
        free: 'All four examinations, 4,357 questions, compendium and study plans',
        paid: null
      },
      {
        id: 'ledger', path: 'ledger/', pillar: 'craft',
        short: 'Bartender’s Ledger', motto: 'Craft · Technique · Creativity',
        name: "The Bartender's Ledger",
        line: '365 cocktails, drilled until they are yours.',
        free: 'All 365 cocktails, the drills, the Ticket Rail and the tools',
        paid: null
      },
      {
        id: 'table', path: 'table/', pillar: 'craft',
        short: 'World Table', motto: 'Cuisine · Culture · Connection',
        name: 'The World Table',
        line: 'A culinary field guide, 1,844 recipes deep.',
        free: 'All 1,844 recipes, the techniques and the Path of Study',
        paid: null
      },
      {
        id: 'light', path: 'light/', pillar: 'reset',
        short: 'First Light', motto: 'Mind · Body · Ritual · Purpose',
        name: 'First Light',
        line: 'Two years of mornings, one at a time.',
        free: 'Two years on two tracks, the Library, journal, practices and chart',
        paid: null
      },
      {
        id: 'almanac', path: 'almanac/', pillar: 'road',
        short: 'Calendar For Life', motto: 'Plan · Reflect · Live Intentionally',
        name: 'Calendar For Life',
        line: 'An illuminated almanac of festivals worth flying for.',
        free: 'Free, all of it',
        paid: null
      }
    ]
  };

})(window);
