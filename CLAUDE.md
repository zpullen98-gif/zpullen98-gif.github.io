# Outside Of Time, the live site

## Service controls, October 2026

Day/night service and the collection guide are written once in
`WorldTable/static/service/oot-service.js`. The hub carries it in `service/`,
the built Table in `table/service/`, and the other four apps in their own `js/`.
Each shell loads it in the head with the matching `data-wing` and caches it in
its own worker. `tools/check-suite-service.mjs`, part of `check-all`, proves all
six copies, their early loads and offline inclusion. The preference key is
`oot.service.v1`; study records remain independent.

First Light and Calendar source repos are now present at `C:/Users/zpull/FirstLight`
and `C:/Users/zpull/CalendarForLife`. Their runtime forks still need controlled
source-equivalent changes, never a wholesale folder copy. First Light documents
its three-way delta publisher in its source tools; Calendar maintains targeted
matching changes in both shells. Their own worker prefixes and suite integration
remain intact. Their patches may be included in a coordinated suite release.

This repository is the GitHub Pages site at zpullen98-gif.github.io: the hub (index.html,
the root pages, pass/ and sw.js) and five wings served from subfolders of the one origin,
table/ (The World Table), ledger/ (The Bartender's Ledger), codex/ (The Sommelier's Codex),
light/ (First Light) and almanac/ (Calendar For Life), with shared/ as the layer every
surface loads: the nine shared scripts (oot-config, profiles, home, auth, gate, locks,
pass, log and bar, in that order), the home stylesheet, the lazily loaded Maitre d' client
and the quote bank. The monorepo that used to publish the site is gone; tools/ replaces it
for this checkout, and tools/lib.mjs is the one statement of the facts every tool reads
(the script list, the surfaces and their workers, the dash rule, where the source repos
are). Extend lib only for a helper more than one tool needs, and never change what an
existing export means. Prose everywhere is British spelling.

## How each wing reaches this repo

table/ is BUILT and never hand-edited. WorldTable makes it with
`BASE_PATH=/table npm run build:pages`, and `node tools/inject-shared.mjs --from <build>`
proves the build by every rule the check applies to a finished copy, deletes table/,
copies the build in whole and writes the nine shared script tags before the final </body>
of every page, stamped with the hub's SHARED_V. Chunk hashes and node numbering differ by
platform, so a copy is never byte-identical to another build of the same commit;
table/BUILD-SOURCE.txt names the commit, and `inject-shared --compare <build>` lists what
differs. A page under table/ is fixed in WorldTable and rebuilt, never patched here.

ledger/ and codex/ are copies of their source repos that drifted on purpose: nobody is
named, the wording is dash free, the shells load the shared layer and the workers list it
under their own cache names. `node tools/sync-wing.mjs <ledger|codex>` brings a copy up to
its source HEAD by a three-way merge per file from the base commit in tools/wing-base.json,
refuses the whole run on a conflict, a new dash or a moved shared stamp, and advances the
base on success; `--dry` prints the same verdicts and writes nothing. Only what the source
has committed is merged, and the wing-only pieces (ledger/js/oot-ledger.js,
codex/js/data-firstpath.js) are never written by it. The generated js/menu-desk.js is
WorldTable's: tools/port-desk.mjs there writes it into each source repo, it is copied over
here by hand, and check-mirror holds the copy to the source's bytes.

light/ and almanac/ are published by their own repos, which are not checked out here.
Nothing in tools/ writes under them, and they are never edited here by hand.

## The publish rule, surface by surface

Every worker matches its cache with ignoreSearch, so the ?v= stamp a tag wears is
invisible to it: the CACHE name is the whole update mechanism, and it moves in the same
commit as the files it covers. The Codex worker is cache first and stores every miss under
/codex/ and /shared/ in its CACHE, so any change under shared/ or codex/ bumps
oot-codex-vN, including a shared file it never listed. The Ledger worker precaches its
ASSETS with cache:'reload' and never runtime caches, so a change to a listed file bumps
oot-ledger-vN, and the list is the whole wing. The hub's sw.js bumps only with a file in
its ASSETS (which list the nine shared scripts and the stylesheet) or the worker itself.
The Table's worker is Workbox and carries no CACHE; a rebuild carries its own revisions.
SHARED_V, the stamp in index.html, stays at 32 and is never moved by a tool: a shared
change is published by bumping the workers that hold it, not by moving the stamp.
`node tools/bump-shared.mjs` plans the bumps the changed files call for and exits 1 while
one is pending; `--apply` makes each once, all or none. light/sw.js and almanac/sw.js get
a carry-forward note, never an edit.

## The dash rule

The site's prose carries no em dash: not U+2014, not its three entities, not the spaced
double hyphen that stands in for it. Use a comma, a colon or a full stop.
tools/dash-baseline.json holds the measured count per top-level directory (874 in all
today, almost all of it First Light's inherited pages, with the font licences and a few
chunks of the built Table). `node tools/check-publish.mjs` fails when any directory grows
and lists the files behind the growth; `--set` re-measures after the diff has been read.
Files under tools/ carry no dash at all, whatever the baseline says, and sync-wing refuses
a merge that would carry more dashes than the copy had.

## The tools, and the order

`node tools/check-all.mjs` is the gate before every push. It runs check-mirror,
check-publish, inject-shared --check, check-stamps, check-suite-service, check-wings, check-wake and check-pack, in
that order, each as a child process, stops at the first failure and prints a summary table;
the list is one constant at the top of the file. check-pack proves every pack under
shared/packs/ through the shipped engine (it reads, validates with no fatal code, every mark
a person's, every id and reference resolved, no dash, imports onto a fresh device); a pack is
built by WorldTable's tools/house/ pipeline and mirrored here, never patched. check-wake
loads the shipped shared/oot-house.js in a sandbox with no IndexedDB and proves the
three-record wake (a dish, a cocktail and a wine through the engine's doors, each wing's
rows read back, a newer row settling the house, a tombstone taking a row off and never
without one) and the pack round trip onto a second device, with no wing code at all. The three
tools that write are bump-shared --apply (the workers' cache names), sync-wing (a wing up
to its source) and inject-shared --from (table/ replaced whole); run check-all again after
any of them. Every tool runs from any directory, takes --help, exits 1 on failure with the
file and the rule named, and finds the source repos beside the site or through
WORLDTABLE_SRC, LEDGER_SRC and CODEX_SRC. A checkout that is absent is a note and a skip,
so the gates run on a machine that holds the site alone; an override that names no
checkout is a failure, so a mis-set path cannot pass as a skip.

## The mirror rule

shared/oot-maitre.js, shared/oot-home.css, shared/oot-quotes.js, any oot-house script and
everything under shared/packs/ are written once in WorldTable/static/shared and copied
here byte for byte. table/shared holds the build's own copies of the client and the
stylesheet, which must be the same bytes again, and the two wings' js/menu-desk.js is one
generated script that differs in its first line and nowhere else. check-mirror proves every
one of those equalities and offers no --fix: the repair is always to copy the canonical
file over, never to edit the mirror. A file WorldTable ships that shared/ lacks yet is a
note, because the mirror may trail a publish; it may not disagree with one.

## Carry-forward for light/ and almanac/

First Light and the Calendar are published from their own repos. When a change under
shared/ calls for a bump of oot-light-vN or oot-cfl-vN, bump-shared and check-stamps say
so as a carry-forward note rather than a failure: make the bump in that repo and let that
repo's own publish bring the worker forward. The same goes for a stale entry those workers
list; it is reported here and fixed there.
