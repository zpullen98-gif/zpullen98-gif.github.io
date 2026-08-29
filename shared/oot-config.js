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
    /* "Hospitality" is not here. It appears once, as static markup in the hub's
       masthead, and nowhere else: not in the return chip, not in a Stripe
       product name. Keeping it out of config is what stops it spreading. */
    name: 'Outside Of Time',
    tagline: 'The craft, the reset, and the road.',
    blurb: 'Master the timeless art of hospitality',

    /* Listed in AUDIT.md as one of the places the domain literal lives, so it
       has to move when the domain does. Also the value to put in Supabase's
       redirect allowlist. */
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

    /* `free` and `paid` are copy for the hub's door cards. The actual gating
       lands in Phase 3 (oot-gate.js); nothing here enforces anything yet. */
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
        line: 'A culinary field guide, 970 recipes deep.',
        free: 'All 970 recipes, the techniques and the Path of Study',
        paid: null
      },
      {
        id: 'light', path: 'light/', pillar: 'reset',
        short: 'First Light', motto: 'Mind · Body · Ritual · Purpose',
        name: 'First Light',
        line: 'A year of mornings, one at a time.',
        free: 'The whole year: Library, journal, practices and chart',
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
