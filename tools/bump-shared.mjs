// Usage: node tools/bump-shared.mjs [--apply] [--paths <path>...] [--help]   (plans the worker CACHE bumps the changed files call for; --apply makes them, once each, all or none)
/* The worker bumper. Each wing's offline copy is held under one cache name,
   const CACHE = '<prefix>vN', and that name is the whole update mechanism:
   every fetch handler matches with ignoreSearch, so the ?v= stamp a tag
   wears is invisible to it, and what a reader already holds is answered
   from the cache until N moves. A publish that changes a file a worker
   holds must therefore move that worker's N in the same commit, and which
   workers that is depends on what each one holds. The hub's sw.js
   precaches its ASSETS and nothing else, so it moves when a file in that
   list changes. The Ledger's precaches its ASSETS with cache:'reload' and
   never runtime caches, but its list is the whole wing, so it moves when a
   file in its ASSETS or any file under ledger/ changes. The Codex's
   precaches its ASSETS, which reach outside codex/ and shared/ (the root
   manifest), and then stores every miss under /codex/ and /shared/ in the
   same CACHE, so a shared file it never listed (the lazy Maitre d' client,
   a pack) may already sit in a reader's cache under the old name: it moves
   when a file in its ASSETS, any file under codex/ or any file under
   shared/ changes. All three also move when the worker file itself
   changes: the list and the fetch policy are what the name covers, and an
   entry dropped from the list stays in every reader's cache under the old
   name until it moves. The Ledger and the Codex catch that through their
   directory rule; the hub's sw.js is in no list, so it is a trigger in its
   own right. First Light and the Calendar are published from their own
   repos, which are not checked out here, so their workers get a
   carry-forward note and no edit; the Table's worker is Workbox, carries
   no CACHE, and a rebuild carries its revisions. The changed files come
   from git (status plus the diff against HEAD, re-rooted at the site when
   the site is a folder of a larger repository) or from --paths, given
   relative to the site root the way git prints them; a path is normalised
   first, so an inner .. can neither name a file outside the site nor slip
   past a rule, and a --paths entry that matches no rule and is not on disk
   is pointed out as a likely typo. Without --apply the plan is printed and
   a pending bump exits 1, the message naming the worker and the rule it is
   behind on, so the tool is also the gate for the one rule check-stamps
   cannot see (the Codex and a shared file it does not list). With --apply
   each needed worker's number is rewritten to N+1 exactly once, and all
   or none: a worker whose CACHE in the working tree already differs from
   the one at HEAD was bumped by hand or by an earlier run, is reported as
   already bumped and left alone, so running twice can never move a name
   by two; and when any worker fails to read (missing from the checkout, a
   CACHE line absent or doubled as in a merge conflict, HEAD unreadable)
   nothing is written, so a publish cannot be left half bumped. Only the
   number is replaced, so the worker's spacing and line endings survive
   byte for byte. The shared stamp (lib.sharedV, frozen at 32) is never
   touched: this is the worker half of the monorepo's bump-shared, for
   this checkout. */
import { writeFileSync, existsSync } from 'node:fs';
import { join, relative, isAbsolute, posix } from 'node:path';
import * as lib from './lib.mjs';

const USAGE = 'usage: node tools/bump-shared.mjs [--apply] [--paths <path>...] [--help]   (plans the worker CACHE bumps the changed files call for, exit 1 while one is pending; --apply makes each once, all or none; paths are relative to the site root, as git prints them)';
const CAP = 10;

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) { console.log(USAGE); process.exit(0); }
let APPLY = false, given = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--apply') APPLY = true;
  else if (a === '--paths') {
    given = given || [];
    while (i + 1 < args.length && args[i + 1] !== '--apply' && args[i + 1] !== '--paths') given.push(args[++i]);
  } else { console.error(`bump-shared: unexpected argument "${a}"\n${USAGE}`); process.exit(1); }
}
if (given && !given.length) { console.error(`bump-shared: --paths needs at least one path\n${USAGE}`); process.exit(1); }

/* The three rules, one sentence each, printed as the plan. `triggers` lists
   the site-relative files or directories a changed path must touch, each
   with the reason it will be reported with; the first that matches is the
   reason given. */
function workerTrigger(s) { return { path: s.worker, why: 'the worker itself' }; }
function assetTriggers(w) { return w.assets.map(a => ({ path: a, why: 'in its ASSETS' })); }
function dirTrigger(s) { return { path: s.dir, why: `under ${s.dir}/` }; }
const SHARED_TRIGGER = { path: 'shared', why: 'under shared/' };
const RULES = {
  hub: {
    text: 'bumps when a file in its ASSETS or the worker itself changes',
    triggers: (w, s) => [workerTrigger(s), ...assetTriggers(w)]
  },
  ledger: {
    text: 'bumps when a file in its ASSETS, the worker itself or any file under ledger/ changes',
    triggers: (w, s) => [workerTrigger(s), ...assetTriggers(w), dirTrigger(s)]
  },
  codex: {
    text: 'bumps when a file in its ASSETS, the worker itself, any file under codex/ or any file under shared/ changes (it runtime-caches every /shared/ miss under its CACHE, so a shared change it may have loaded is invisible until the name moves)',
    triggers: (w, s) => [workerTrigger(s), ...assetTriggers(w), dirTrigger(s), SHARED_TRIGGER]
  }
};

/* A path as git prints it: forward slashes, relative to the site root, no
   leading ./ and no trailing slash, with every . and .. segment collapsed
   first so that tools/../shared/x is shared/x and shared/../../x is seen
   for what it is. Anything outside the site, and the site root itself, is
   refused. */
function normalise(p) {
  let s = String(p).trim().replace(/\\/g, '/');
  if (isAbsolute(s)) s = relative(lib.ROOT, s).replace(/\\/g, '/');
  s = posix.normalize(s).replace(/^(\.\/)+/, '').replace(/\/+$/, '');
  if (s === '..' || s.startsWith('../')) { lib.fail(`bump-shared: "${p}" is outside the site root ${lib.ROOT}`); return null; }
  if (!s || s === '.') { lib.fail(`bump-shared: "${p}" names the site root itself, not a changed file; pass the files that changed`); return null; }
  return s;
}

/* A changed path touches a trigger when it is that file, lies under that
   directory, or is itself a directory the trigger lies under. */
function touches(changed, target) {
  return changed === target || changed.startsWith(target + '/') || target.startsWith(changed + '/');
}

/* git prints paths relative to the repository root, and HEAD:<path> is
   read against it too. The site is normally that root, but it may be a
   folder of a larger repository: --show-prefix is that folder's path
   ('' at the root, 'site/' when nested), stripped from what git prints
   and prepended to what it is asked for. */
let gitOk = true, gitPrefix = '';
try {
  lib.git(['rev-parse', '--is-inside-work-tree']);
  gitPrefix = lib.git(['rev-parse', '--show-prefix']);
} catch { gitOk = false; }

function reroot(p) {
  if (!gitPrefix) return p;
  return p.startsWith(gitPrefix) ? p.slice(gitPrefix.length) : null;
}

/* The working tree against HEAD: modified, staged, untracked, and both
   names of a rename, read with -z so nothing is quoted. lib.git trims its
   output, which eats the leading space of a ' M path' first record, so the
   status column is matched rather than sliced. */
function changedFromGit() {
  const out = new Set();
  const tokens = lib.git(['status', '--porcelain', '-z', '--untracked-files=all']).split('\0').filter(Boolean);
  for (let i = 0; i < tokens.length; i++) {
    const m = tokens[i].match(/^\s*(\S{1,2})\s+(.*)$/);
    if (!m) continue;
    out.add(m[2]);
    if (/[RC]/.test(m[1]) && i + 1 < tokens.length) out.add(tokens[++i]);
  }
  for (const p of lib.git(['diff', '--name-only', '-z', 'HEAD']).split('\0')) if (p) out.add(p);
  return [...out].map(reroot).filter(p => p !== null && p !== '');
}

let changed;
if (given) {
  changed = [];
  for (const p of given) { const n = normalise(p); if (n !== null) changed.push(n); }
  if (process.exitCode) process.exit(1);
} else {
  if (!gitOk) { lib.fail('bump-shared: git cannot read this tree, so the changed files are unknown; pass --paths'); process.exit(1); }
  changed = changedFromGit().map(normalise).filter(p => p !== null);
}
changed = [...new Set(changed)].sort();
console.log(`bump-shared: ${changed.length} changed path${changed.length === 1 ? '' : 's'}${given ? ' from --paths' : ' from git status and the diff against HEAD'}${APPLY ? '; applying' : '; planning only'}`);

/* The CACHE constant with this surface's prefix, in one worker's text, in
   three groups so a rewrite can replace the number and nothing else; the
   regex is global so a second definition is caught rather than missed. */
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function cacheRe(prefix) { return new RegExp("(const CACHE\\s*=\\s*')" + escapeRe(prefix) + "(\\d+)(')", 'g'); }
function cacheNumber(text, prefix) {
  const all = [...String(text).matchAll(cacheRe(prefix))];
  if (all.length !== 1) return { n: null, count: all.length };
  return { n: Number(all[0][2]), count: 1 };
}

/* Any worker's cache name as written, for the carry-forward note: the
   Calendar's worker spells its constant CACHE_VERSION. */
function cacheName(text) { return (String(text).match(/const CACHE(?:_VERSION)?\s*=\s*'([^']+)'/) || [])[1] || null; }

/* The worker's text at HEAD, or null when git cannot show it. `absent` is
   true when git works and the file simply is not committed yet. */
function headText(worker) {
  if (!gitOk) return { text: null, absent: false };
  try { return { text: lib.git(['show', `HEAD:${gitPrefix}${worker}`]), absent: false }; }
  catch { return { text: null, absent: true }; }
}

function listHits(hits) {
  for (const h of hits.slice(0, CAP)) console.log(`       ${h.path} (${h.why})`);
  if (hits.length > CAP) console.log(`       and ${hits.length - CAP} more`);
}

/* A worker that is not on disk is a FAIL that names it, never a stack
   trace; the exempt ones are only read, but the note needs their name. */
function present(surface, owner) {
  if (existsSync(join(lib.ROOT, surface.worker))) return true;
  const fix = surface.exempt ? `copy it forward from ${owner} own repo` : 'restore it from HEAD';
  lib.fail(`${surface.worker}: not in the checkout, so its CACHE cannot be read; ${fix}`);
  return false;
}

let bumped = 0, already = 0, pending = 0, unchanged = 0, carried = 0;
const writes = [];
const matched = new Set();

for (const surface of lib.SURFACES) {
  if (surface.built) {
    lib.note(`${surface.id}: ${surface.worker} is Workbox and carries no CACHE; a rebuild carries its revisions, nothing to bump`);
    continue;
  }
  if (surface.exempt) {
    const owner = surface.id === 'light' ? "First Light's" : "the Calendar's";
    if (!present(surface, owner)) continue;
    const name = cacheName(lib.read(surface.worker)) || '(no CACHE constant)';
    const hits = changed.filter(c => touches(c, surface.dir) || touches(c, 'shared'));
    for (const c of hits) matched.add(c);
    if (hits.length) {
      lib.note(`${surface.id}: carry-forward, ${surface.worker} (${name}) is published from ${owner} own repo, not checked out here; ${hits.length} changed path${hits.length === 1 ? '' : 's'} under ${surface.dir}/ or shared/ would call for a bump there, so make it in that repo and copy the worker forward`);
      listHits(hits.map(c => ({ path: c, why: touches(c, 'shared') ? 'under shared/' : `under ${surface.dir}/` })));
      carried++;
    } else {
      lib.note(`${surface.id}: carry-forward, ${surface.worker} (${name}) is published from ${owner} own repo; nothing changed under ${surface.dir}/ or shared/, nothing to carry`);
    }
    continue;
  }

  const rule = RULES[surface.id];
  if (!rule) { lib.fail(`bump-shared: no rule for surface ${surface.id}; lib.SURFACES gained one this tool does not know`); continue; }
  if (!present(surface)) continue;
  const w = lib.workerInfo(surface);
  const tree = cacheNumber(w.text, surface.cachePrefix);
  if (tree.n === null) {
    lib.fail(`${surface.worker}: expected exactly one const CACHE = '${surface.cachePrefix}<number>' and found ${tree.count}; the bump rule needs that line`);
    continue;
  }
  const treeName = surface.cachePrefix + tree.n;
  const triggers = rule.triggers(w, surface);
  const hits = [];
  for (const c of changed) {
    const t = triggers.find(t => touches(c, t.path));
    if (!t) continue;
    hits.push({ path: c, why: t.path.startsWith(c + '/') ? `holds ${t.path}, ${t.why}` : t.why });
    matched.add(c);
  }
  console.log(`plan ${surface.id}: ${surface.worker} (${treeName}) ${rule.text}`);
  listHits(hits);

  const head = headText(surface.worker);
  const headN = head.text === null ? null : cacheNumber(head.text, surface.cachePrefix).n;
  const movedAlready = headN !== null && headN !== tree.n;

  if (!hits.length) {
    if (movedAlready) lib.note(`${surface.worker}: no changed file calls for a bump, yet CACHE is ${treeName} in the tree and ${surface.cachePrefix}${headN} at HEAD; left as it is`);
    lib.ok(`${surface.worker}: no change needed, ${treeName} stays`);
    unchanged++;
    continue;
  }

  if (movedAlready) {
    lib.ok(`${surface.worker}: already bumped, ${surface.cachePrefix}${headN} at HEAD is ${treeName} in the tree; left alone`);
    already++;
    continue;
  }
  if (head.absent) {
    lib.ok(`${surface.worker}: not at HEAD, so its CACHE ${treeName} is new by definition; left alone`);
    already++;
    continue;
  }
  if (headN === null) {
    lib.fail(`${surface.worker}: needs a bump (${rule.text}) but HEAD:${gitPrefix}${surface.worker} cannot be read, so an earlier bump cannot be told from none; nothing written`);
    pending++;
    continue;
  }

  const next = surface.cachePrefix + (tree.n + 1);
  if (!APPLY) {
    lib.fail(`${surface.worker}: needs a bump, ${treeName} -> ${next} (${rule.text}); run with --apply`);
    pending++;
    continue;
  }
  console.log(`plan ${surface.worker}: needs a bump, ${treeName} -> ${next}; written once every worker has been read`);
  writes.push({ surface, w, tree, treeName, next });
}

/* The writes, after every worker has been read, all or none. */
if (writes.length && process.exitCode) {
  for (const x of writes) {
    lib.fail(`${x.surface.worker}: needs a bump, ${x.treeName} -> ${x.next}, and was not written: another worker failed above and the bumps are made all or none; fix that and run again`);
    pending++;
  }
}
if (writes.length && !process.exitCode) {
  for (const x of writes) {
    const prefix = x.surface.cachePrefix;
    const written = x.w.text.replace(cacheRe(prefix), (m, lead, n, tail) => lead + prefix + (x.tree.n + 1) + tail);
    writeFileSync(join(lib.ROOT, x.surface.worker), written);
    const after = cacheNumber(lib.read(x.surface.worker), prefix);
    if (after.n !== x.tree.n + 1) {
      lib.fail(`${x.surface.worker}: wrote ${x.next} and read back ${after.n === null ? 'no single CACHE line' : prefix + after.n}; inspect the file`);
      pending++;
      continue;
    }
    lib.ok(`${x.surface.worker}: bumped ${x.treeName} -> ${x.next}`);
    bumped++;
  }
}

/* A --paths entry that no rule claims and no file answers to is most
   likely a typo (a case variant, a lookalike name), and is said so rather
   than passed in silence. */
if (given) {
  for (const p of changed) {
    if (!matched.has(p) && !existsSync(join(lib.ROOT, p))) lib.note(`"${p}" matches no worker's rule and is not on disk; a typo, or a deleted file no worker held`);
  }
}

const parts = [];
if (bumped) parts.push(`${bumped} bumped`);
if (already) parts.push(`${already} already bumped`);
if (pending) parts.push(`${pending} pending`);
parts.push(`${unchanged} unchanged`);
if (carried) parts.push(`${carried} to carry forward`);
let stamp = null;
try { stamp = lib.sharedV(); } catch { stamp = null; }
const summary = `bump-shared: ${parts.join(', ')}; the shared stamp ?v=${stamp === null ? '(index.html unreadable)' : stamp} is untouched`;
if (process.exitCode) { console.error('FAIL ' + summary); process.exit(1); }
console.log(summary);
