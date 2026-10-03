// Usage: node tools/check-stamps.mjs [--all | --help]   (--all sweeps every Table page instead of a sample)
/* The stamps and the workers. Every surface loads the shared layer through
   tags that wear one stamp, ?v=N, and N is whatever the hub's index.html
   wears (lib.sharedV, 32 today, frozen: no tool may move it). A page that
   wears a different stamp, or none, asks a worker for a copy the others do
   not, and with ignoreSearch in every fetch handler the stamp is the only
   thing a reader's browser has to tell one shared script from the last. So
   rule one: every page of every surface wears the same stamp on every shared
   script and on the oot-home.css link. The hub pages, the four wing shells
   and a sample of the built Table (index.html, menu.html, shell.html and two
   nested pages; --all for all 2,200) are read, and every tag that resolves
   to shared/*.js or shared/*.css must say ?v=N. The reference is read from
   the file under test, so when index.html disagrees with the tree the tool
   has to decide which side moved: it counts the stamps every page wears, and
   when the hub's reference tag is outvoted (and, when git can see it, differs
   from its own value at HEAD) the one failure names index.html and the other
   pages are judged against the stamp they agree on, instead of a hundred
   failures that all blame the pages that stood still. Rule one also proves
   the set: a page that loads from shared/ loads oot-config.js and loads the
   scripts in SHARED_SCRIPTS order (the hub shell and the Almanac leave some
   out by design, and may), and the Ledger shell, the Codex shell and every
   Table page read must carry all nine, since the two wing workers precache
   the whole stack and the injector writes the whole stack (inject-shared
   --check proves the Table's footprint on every page; the sample here is a
   second witness, not the proof).

   Rule two is the wing shells against their workers: a file the page loads
   and the worker does not precache is the way a wing looks healthy online
   and breaks offline, and a script the worker lists that the page never
   loads is a download every reader pays for on every bump. So for the
   Ledger and the Codex every local <script src> and <link href> (own js and
   css, ../shared/*, stamps stripped) must be in that worker's ASSETS, and
   every ASSETS entry that is a script or stylesheet must have a tag in the
   shell; html entries, icons, fonts, images and the manifest need only
   exist. Both wing fetch handlers answer an offline navigation with
   cache.match('./index.html'), and a cache that holds only './' misses that
   lookup, so the entry './index.html' must be present as written, not
   merely something that resolves to the shell. The hub's list is checked for
   existence and for that same entry, since its pages are several and the
   worker is this repo's own. First Light and the Calendar get the same
   reading as carry-forward notes, never failures, because their repos
   publish them.

   Rule three is the bump rule, from git: a worker's CACHE name is the whole
   update mechanism (its own comment says so), so a precached file that was
   committed after the worker's last commit means a reader keeps the old
   copy until somebody remembers. For the hub, the Ledger and the Codex that
   is a failure, naming the file and the commit; and in the working tree, a
   precached file modified or untracked while the CACHE constant still
   equals the one at HEAD fails with 'bump CACHE before committing'. The
   name must also move forward: whenever the worker in the tree names a
   different CACHE from the one at HEAD the number must be larger, whether
   or not anything else changed, and every pair of consecutive commits of
   the worker that the clone can see must not step the number down. First
   Light and the Calendar are published from their own repos, which are not
   checked out here, so the same findings print as carry-forward notes and
   never fail. The clone is shallow (depth 50) and that is enough: a file git
   cannot see the history of is treated as unchanged. The Table's worker is
   Workbox and carries no CACHE; what is proved there is that it imports
   sw-shared.js, that OOT_SHARED names the same nine scripts as
   lib.SHARED_SCRIPTS, and that the runtime cache the warm-up fills is the
   one the /shared/ route reads.

   Every worker is read through lib.workerInfo (const CACHE = '...' and
   const ASSETS = [...]), so that every tool in this folder sees one list; a
   worker of our own that lib sees nothing in is a failure, not a guess,
   because the bump rule would have nothing to hold and bump-shared would be
   blind to it. Only an exempt worker, which belongs to another repo (the
   Calendar's names them CACHE_VERSION and APP_SHELL), is parsed again with
   looser names. A shell or a worker that lib.SURFACES names and the tree lacks is
   a failure that names the file and the rule, never a stack trace. Exit 1
   on any failure, 0 with a one-line summary otherwise. Replaces the stamp
   half of the monorepo's check-publish and bump-shared for this checkout. */
import { existsSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';
import * as lib from './lib.mjs';

const USAGE = 'usage: node tools/check-stamps.mjs [--all | --help]   (proves the shared stamps and the workers; --all reads every Table page)';
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) { console.log(USAGE); process.exit(0); }
const unknown = args.filter(a => a !== '--all');
if (unknown.length) { console.error(`check-stamps: unknown argument ${unknown.join(' ')}\n${USAGE}`); process.exit(1); }
const ALL = args.includes('--all');

let failures = 0;
function fail(msg) { lib.fail(msg); failures++; }

/* ---------- paths ---------- */

/* Every path in this file is ROOT-relative with forward slashes, the way
   git prints them. */
function exists(rel) { return existsSync(join(lib.ROOT, rel)); }
function isDir(rel) { return exists(rel) && statSync(join(lib.ROOT, rel)).isDirectory(); }
function extOf(rel) {
  const name = rel.split('/').pop();
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
}

/* A worker entry such as './' or './pass/' names a directory; what the
   browser gets for it is that directory's index.html. */
function toFile(rel) {
  let r = rel.replace(/\\/g, '/').replace(/\/+$/, '');
  if (r === '' || r === '.') return 'index.html';
  if (isDir(r)) r += '/index.html';
  return r;
}

/* A tag's URL resolved against the page that carries it: root-absolute
   against ROOT, relative against the page's folder. The query is split off
   and the stamp read from it. */
function resolveUrl(pageRel, url) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) return { external: true, url };
  const q = url.indexOf('?');
  const h = url.indexOf('#');
  const cut = [q, h].filter(i => i >= 0);
  const path = cut.length ? url.slice(0, Math.min(...cut)) : url;
  const query = q >= 0 ? url.slice(q + 1, h > q ? h : undefined) : '';
  const stampMatch = query.match(/(?:^|&)v=(\d+)(?:&|$)/);
  const stamp = stampMatch ? Number(stampMatch[1]) : null;
  let rel = path.startsWith('/') ? posix.normalize(path.slice(1)) : posix.normalize(posix.join(posix.dirname(pageRel), path));
  if (rel === '.') rel = '';
  return { external: false, url, rel: toFile(rel), stamp, stamped: stampMatch !== null };
}

/* ---------- git ---------- */

/* git is probed once; without it the bump rule cannot be proved (a
   failure) and the stamp anchor falls back to the count alone. */
let gitOk = true;
try { lib.git(['rev-parse', '--is-inside-work-tree']); }
catch { gitOk = false; }

/* Whether a path is in a commit's tree, asked with ls-tree, which prints
   nothing for a path the commit lacks instead of a fatal line on stderr;
   lib.git lets git's stderr through, so `git show` is only ever asked for a
   path a commit holds. */
function inCommit(sha, rel) {
  if (!gitOk) return false;
  try { return lib.git(['ls-tree', sha, '--', rel]) !== ''; } catch { return false; }
}
function textAt(sha, rel) {
  if (!inCommit(sha, rel)) return null;
  try { return lib.git(['show', `${sha}:${rel}`]); } catch { return null; }
}

/* ---------- tags ---------- */

/* Every <script src> and <link href> in a page, with its line, read with
   the HTML comments blanked (newlines kept so the lines still count) so a
   commented-out tag is not mistaken for a live one. */
function tagsOf(pageRel) {
  const html = lib.read(pageRel).replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ''));
  const out = [];
  const re = /<(script|link)\b[^>]*?\b(src|href)\s*=\s*(["'])([^"']*)\3[^>]*>/gi;
  let line = 1, last = 0;
  for (const m of html.matchAll(re)) {
    for (let i = last; i < m.index; i++) if (html.charCodeAt(i) === 10) line++;
    last = m.index;
    out.push({ tag: m[1].toLowerCase(), attr: m[2].toLowerCase(), url: m[4], line, ...resolveUrl(pageRel, m[4]) });
  }
  return out;
}

function isShared(rel) { return /^shared\/[^/]+\.(js|css)$/.test(rel); }

/* ---------- rule one: the stamps ---------- */

function tableSample() {
  const pages = lib.walk('table').map(p => p.replace(/\\/g, '/')).filter(p => p.endsWith('.html')).sort();
  if (ALL) return pages;
  const fixed = ['table/index.html', 'table/menu.html', 'table/shell.html'].filter(p => pages.includes(p));
  const rest = pages.filter(p => !fixed.includes(p));
  const want = Math.max(0, 5 - fixed.length);
  const picks = [];
  for (let i = 1; i <= want && rest.length; i++) picks.push(rest[Math.floor(i * rest.length / (want + 1))]);
  return [...fixed, ...picks];
}

/* The surfaces whose pages must carry the whole stack. */
const WHOLE_STACK = new Set(['ledger', 'codex', 'table']);

/* First every page is read, then the reference is settled, then the pages
   are judged, so that a reference that moved can be told from pages that
   did. */
const records = [];
for (const surface of lib.SURFACES) {
  const pages = surface.built ? [...new Set([...surface.pages, ...tableSample()])] : surface.pages;
  for (const page of pages) {
    if (!exists(page)) { fail(`${page} is listed for the ${surface.id} in lib.SURFACES but does not exist`); continue; }
    const tags = tagsOf(page).filter(t => !t.external);
    records.push({ surface, page, tags, shared: tags.filter(t => isShared(t.rel)) });
  }
}

const hubV = lib.sharedV();
if (hubV === null) { fail('index.html wears no oot-config.js?v=N, so there is no shared stamp to prove against'); }

/* The anchor: the hub's reference tag, unless the tree outvotes it. */
let V = hubV, vWhy = 'SHARED_V, read from index.html, never moved by a tool';
let referenceTag = null;
{
  const counts = new Map();
  let total = 0;
  for (const r of records) for (const t of r.shared) if (t.stamped) { counts.set(t.stamp, (counts.get(t.stamp) || 0) + 1); total++; }
  let mode = hubV, modeCount = counts.get(hubV) || 0;
  for (const [s, c] of counts) if (c > modeCount) { mode = s; modeCount = c; }
  const headHtml = textAt('HEAD', 'index.html');
  const headV = headHtml === null ? null : lib.stampOf(headHtml);
  const hub = records.find(r => r.page === 'index.html');
  referenceTag = hub ? hub.shared.find(t => t.tag === 'script' && t.rel === 'shared/oot-config.js') || null : null;
  if (hubV !== null && mode !== hubV) {
    const where = referenceTag ? `index.html:${referenceTag.line}: ${referenceTag.url}` : 'index.html: the oot-config.js tag';
    fail(`${where} is the reference tag (lib.sharedV) and wears ?v=${hubV}, but ${modeCount} of ${total} shared tags across the surfaces wear ?v=${mode}${headV !== null && headV !== hubV ? ` and index.html wears ?v=${headV} at HEAD` : ''}; the reference moved, not the pages, and SHARED_V is frozen: no tool moves it`);
    V = mode;
    vWhy = 'the stamp every other page wears; the reference tag in index.html is the one that moved';
  } else if (hubV !== null && headV !== null && headV !== hubV) {
    lib.note(`index.html moves the reference from ?v=${headV} at HEAD to ?v=${hubV} in the working tree and the other pages agree; a hand bump, since no tool moves it`);
  } else if (hubV === null && modeCount) {
    V = mode;
    vWhy = 'the stamp the other pages wear, since index.html names none';
  }
}

let pagesRead = 0, sharedTagsSeen = 0, tableOwnCss = 0;
for (const { surface, page, tags, shared } of records) {
  pagesRead++;
  for (const t of shared) {
    sharedTagsSeen++;
    if (!exists(t.rel)) fail(`${page}:${t.line}: ${t.url} resolves to ${t.rel}, which does not exist`);
    if (t === referenceTag && V !== hubV) continue;
    if (V !== null && t.stamp !== V) {
      fail(`${page}:${t.line}: ${t.url} wears ${t.stamped ? '?v=' + t.stamp : 'no stamp'}; the shared stamp is ${V} (${vWhy})`);
    }
  }
  if (surface.built) tableOwnCss += tags.filter(t => t.rel === 'table/shared/oot-home.css').length;

  /* The set and the order. */
  const scripts = shared.filter(t => t.tag === 'script').map(t => ({ name: t.rel.slice('shared/'.length), line: t.line }));
  const known = scripts.filter(s => lib.SHARED_SCRIPTS.includes(s.name));
  if (shared.length && !known.some(s => s.name === 'oot-config.js')) {
    fail(`${page} loads from shared/ but never oot-config.js, which every other shared script reads first`);
  }
  for (let i = 1; i < known.length; i++) {
    const a = lib.SHARED_SCRIPTS.indexOf(known[i - 1].name), b = lib.SHARED_SCRIPTS.indexOf(known[i].name);
    if (b === a) fail(`${page}:${known[i].line}: ${known[i].name} loads twice (first at line ${known[i - 1].line})`);
    else if (b < a) fail(`${page}:${known[i].line}: ${known[i].name} loads after ${known[i - 1].name}; the shared scripts load in SHARED_SCRIPTS order (${lib.SHARED_SCRIPTS.join(', ')})`);
  }
  if (WHOLE_STACK.has(surface.id)) {
    const missing = lib.SHARED_SCRIPTS.filter(n => !known.some(s => s.name === n));
    if (missing.length) {
      fail(`${page} loads ${known.length} of the nine shared scripts, missing ${missing.join(', ')}; ${surface.built ? 'the injector writes all nine on every Table page (inject-shared --check proves the footprint)' : `the ${surface.id} shell loads the whole stack and its worker precaches it`}`);
    }
  }
  if (shared.length === 0) lib.note(`${page} loads nothing from shared/ (nothing to stamp)`);
}
if (tableOwnCss) lib.note(`table: ${tableOwnCss} sampled page(s) link the build's own oot-home.css (/table/shared/oot-home.css), precached by Workbox by revision and never stamped; check-mirror proves its bytes`);
if (!failures) lib.ok(`stamps: ${pagesRead} pages read, ${sharedTagsSeen} shared tags wear ?v=${V}, every page loads the shared scripts in order`);

/* ---------- the workers ---------- */

/* A worker's CACHE from its text: the strict spelling lib reads for a
   worker of our own; the Calendar's CACHE_VERSION as well for an exempt one. */
function cacheOf(text, surface) {
  const strict = (text.match(/const CACHE\s*=\s*'([^']+)'/) || [])[1] || null;
  if (strict !== null || !surface.exempt) return strict;
  return (text.match(/const (?:CACHE\w*)\s*=\s*'([^']+)'/) || [])[1] || null;
}

/* A worker read once per surface: null, after one failure or note, when
   the file is missing or lib sees nothing in a worker of our own. `raw`
   is the list as written, `files` the entries resolved to ROOT. */
const workers = new Map();
function workerOf(surface) {
  if (workers.has(surface.id)) return workers.get(surface.id);
  const report = surface.exempt ? (msg) => lib.note(`carry-forward: ${msg}; its own repo publishes it`) : fail;
  let result = null;
  if (!exists(surface.worker)) {
    report(`${surface.worker} is listed as the ${surface.id} worker in lib.SURFACES but does not exist, so rules two and three have nothing to read`);
  } else {
    const info = lib.workerInfo(surface);
    let { cache, assets } = info;
    let raw = [...(((info.text.match(/const ASSETS\s*=\s*\[([\s\S]*?)\];/) || [])[1] || '').matchAll(/'([^']+)'/g))].map(m => m[1]);
    if (surface.exempt) {
      if (!cache) cache = cacheOf(info.text, surface);
      if (!assets.length) {
        for (const m of info.text.matchAll(/const (\w+)\s*=\s*\[([\s\S]*?)\];/g)) {
          const items = [...m[2].matchAll(/'([^']+)'/g)].map(x => x[1]);
          if (items.length && items.every(p => p.startsWith('./') || p.startsWith('../'))) {
            raw = items;
            assets = items.map(p => posix.normalize(posix.join(surface.dir === '.' ? '' : surface.dir, p.replace(/\?v=\d+$/, ''))));
            break;
          }
        }
      }
    }
    if (!cache) report(`${surface.worker} names no const CACHE = '...' that lib.workerInfo reads; every tool reads the worker through lib, and the bump rule has nothing to hold`);
    else if (!assets.length) report(`${surface.worker} lists no const ASSETS = [...] that lib.workerInfo reads; every tool reads the worker through lib, and rules two and three have no list to prove`);
    else {
      const files = [];
      for (const a of assets) { const f = toFile(a); if (!files.includes(f)) files.push(f); }
      result = { cache, files, raw, text: info.text };
    }
  }
  workers.set(surface.id, result);
  return result;
}

/* A precached file the way the worker writes it, './x' inside its own
   folder and '../x' outside, so a message points at the line to edit. */
function asWritten(surface, rel) {
  if (surface.dir === '.') return './' + rel;
  return rel.startsWith(surface.dir + '/') ? './' + rel.slice(surface.dir.length + 1) : '../' + rel;
}

function cacheNumber(name) { const m = String(name).match(/(\d+)$/); return m ? Number(m[1]) : null; }

/* ---------- rule two: the wing shells against their workers ---------- */

let shellTags = 0, workerEntries = 0, carried = 0;
for (const surface of lib.SURFACES.filter(s => s.dir !== '.' && !s.built)) {
  const report = surface.exempt
    ? (msg) => { lib.note(`carry-forward: ${msg}; its own repo publishes it`); carried++; }
    : fail;
  const w = workerOf(surface);
  if (!w) continue;
  if (!exists(surface.shell)) { report(`${surface.shell} does not exist, so ${surface.worker} cannot be read against its shell (rule two)`); continue; }
  const listed = new Set(w.files);
  const tags = tagsOf(surface.shell).filter(t => !t.external && (t.rel.startsWith(surface.dir + '/') || t.rel.startsWith('shared/')));
  const tagged = new Set(tags.map(t => t.rel));
  const before = failures, carriedBefore = carried;
  for (const t of tags) {
    if (!surface.exempt) shellTags++;
    if (!listed.has(t.rel)) report(`${surface.shell}:${t.line}: ${t.url} (${t.rel}) is not in ${surface.worker} ASSETS; a file in the page and not the worker is how a wing breaks offline while looking fine online`);
  }
  for (const rel of w.files) {
    const entry = asWritten(surface, rel);
    if (!surface.exempt) workerEntries++;
    const ext = extOf(rel);
    if (!exists(rel)) { report(`${surface.worker}: ASSETS lists ${entry} but ${rel} does not exist, so the precache would 404 and the wing would run without it offline`); continue; }
    if ((ext === 'js' || ext === 'css') && !tagged.has(rel)) {
      report(`${surface.worker}: ASSETS lists ${entry} but ${surface.shell} has no tag for it; every reader downloads it on every bump for nothing`);
    }
  }
  if (!w.raw.includes('./index.html')) report(`${surface.worker}: ASSETS does not list './index.html' as written; the fetch handler answers an offline navigation with cache.match('./index.html'), which a cache holding only './' misses`);
  if (failures === before && carried === carriedBefore) lib.ok(`${surface.id}: ${tags.length} shell tags listed in ${surface.worker}, ${w.files.length} entries present, every script and stylesheet has a tag, './index.html' is listed`);
}

/* The hub: existence and the navigation entry, since its pages are several. */
{
  const hub = lib.SURFACES.find(s => s.id === 'hub');
  const w = workerOf(hub);
  if (w) {
    const before = failures;
    for (const rel of w.files) if (!exists(rel)) fail(`${hub.worker}: ASSETS lists ${rel}, which does not exist`);
    if (!w.raw.includes('./index.html')) fail(`${hub.worker}: ASSETS does not list './index.html' as written; the fetch handler answers an offline navigation with cache.match('./index.html'), which a cache holding only './' misses`);
    if (failures === before) lib.ok(`hub: ${w.files.length} entries in ${hub.worker} exist, './index.html' is listed`);
  }
}

/* ---------- rule three: the bump rule ---------- */

if (!gitOk) fail('git cannot read this tree, so the bump rule cannot be proved');

/* The commits after `since` that touched any of `files`, newest first, each
   with the files it touched. */
function commitsAfter(since, files) {
  const out = [];
  const text = lib.git(['log', '--format=commit %h %s', '--name-only', `${since}..HEAD`, '--', ...files]);
  let cur = null;
  for (const line of text.split('\n')) {
    const head = line.match(/^commit (\S+) ?(.*)$/);
    if (head) { cur = { sha: head[1], subject: head[2], files: [] }; out.push(cur); }
    else if (line.trim() && cur) cur.files.push(line.trim());
  }
  return out;
}

/* The precached files that differ from HEAD in the working tree, staged or
   not, including an untracked file the worker already lists. lib.git trims
   its output, which eats the leading space of a ' M path' first line, so
   the status column is matched rather than sliced. */
function changedInTree(files) {
  const out = [];
  const text = lib.git(['status', '--porcelain', '--untracked-files=all', '--', ...files]);
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*(\S{1,2})\s+(.*)$/);
    if (!m) continue;
    let p = m[2];
    if (p.includes(' -> ')) p = p.split(' -> ').pop();
    out.push({ path: p.replace(/^"|"$/g, ''), untracked: m[1] === '??' });
  }
  return out;
}

let workersProved = 0;
for (const surface of lib.SURFACES.filter(s => s.cachePrefix)) {
  if (!gitOk) break;
  const w = workerOf(surface);
  if (!w) continue;
  const report = surface.exempt
    ? (msg) => { lib.note(`carry-forward: ${msg}; its own repo publishes it`); carried++; }
    : fail;
  const before = failures, carriedBefore = carried;
  if (!w.cache.startsWith(surface.cachePrefix) || cacheNumber(w.cache) === null) {
    report(`${surface.worker}: CACHE '${w.cache}' does not match the prefix ${surface.cachePrefix}<number> that lib.SURFACES expects`);
  }

  /* History: the worker's last commit against every precached file's, and
     the worker's own commits against each other. */
  const workerShas = lib.git(['log', '--format=%H', '--', surface.worker]).split('\n').filter(Boolean);
  if (!workerShas.length) {
    lib.note(`${surface.worker} has no committed history yet; the history half of the bump rule is skipped`);
  } else {
    const workerSha = workerShas[0];
    const seen = new Set();
    for (const c of commitsAfter(workerSha, w.files)) {
      for (const f of c.files) {
        if (seen.has(f)) continue;
        seen.add(f);
        if (surface.exempt) report(`${surface.id} precaches ${f} which changed in ${c.sha}`);
        else fail(`CACHE not bumped since ${f} changed in ${c.sha} (${c.subject}); ${surface.worker} was last committed in ${lib.git(['rev-parse', '--short', workerSha])} and still says '${w.cache}'`);
      }
    }
    let newer = null;
    for (const sha of workerShas) {
      const text = textAt(sha, surface.worker);
      const name = text === null ? null : cacheOf(text, surface);
      const n = name === null ? null : cacheNumber(name);
      if (newer && newer.n !== null && n !== null && newer.n < n) {
        report(`${surface.worker}: CACHE moved from '${name}' to '${newer.name}' in ${lib.git(['rev-parse', '--short', newer.sha])}, which is not forward; a reader who held the newer name would take the older one for new`);
      }
      newer = { sha, name, n };
    }
  }

  /* The working tree: a different name must be a larger number, and a
     modified precached file needs a new name before the commit. */
  const changed = changedInTree(w.files);
  const names = changed.map(c => c.path + (c.untracked ? ' (untracked, listed)' : '')).join(', ');
  const headText = textAt('HEAD', surface.worker);
  const headCache = headText === null ? null : cacheOf(headText, surface);
  let moved = '';
  if (headCache === null) {
    if (changed.length) lib.note(`${surface.worker} is not at HEAD, so a new worker is its own bump; ${names} modified`);
  } else if (headCache !== w.cache) {
    const was = cacheNumber(headCache), is = cacheNumber(w.cache);
    if (was !== null && is !== null && is <= was) report(`${surface.worker}: CACHE moved from '${headCache}' to '${w.cache}' in the working tree, which is not forward`);
    else moved = `, CACHE moves ${headCache} -> ${w.cache}${changed.length ? ` with ${names} modified` : ' (nothing precached is modified in the tree)'}`;
  } else if (changed.length) {
    if (surface.exempt) report(`${surface.id} precaches ${names} which changed in the working tree`);
    else fail(`bump CACHE before committing: ${surface.worker} still says '${w.cache}' at HEAD and in the working tree while ${names} ${changed.length === 1 ? 'has' : 'have'} changed`);
  }

  if (failures === before && carried === carriedBefore) {
    workersProved++;
    lib.ok(`${surface.id}: '${w.cache}' is newer than all ${w.files.length} precached files${moved || (changed.length ? '' : ', none modified')}`);
  }
}

/* ---------- the Table's worker ---------- */

{
  const sw = 'table/sw.js', warm = 'table/sw-shared.js';
  const before = failures;
  if (!exists(sw) || !exists(warm)) {
    for (const f of [sw, warm]) if (!exists(f)) fail(`${f} is missing from the built Table`);
  } else {
    const swText = lib.read(sw), warmText = lib.read(warm);
    if (!/importScripts\(\s*["']sw-shared\.js["']\s*\)/.test(swText)) fail(`${sw} does not importScripts("sw-shared.js"); the shared stack would never be warmed at install`);
    const list = [...((warmText.match(/OOT_SHARED\s*=\s*\[([\s\S]*?)\]/) || [])[1] || '').matchAll(/'([^']+)'/g)].map(m => m[1]);
    if (list.join(',') !== lib.SHARED_SCRIPTS.join(',')) fail(`${warm}: OOT_SHARED is [${list.join(', ')}] but lib.SHARED_SCRIPTS is [${lib.SHARED_SCRIPTS.join(', ')}]; one list, on both sides`);
    const warmCache = (warmText.match(/OOT_SHARED_CACHE\s*=\s*'([^']+)'/) || [])[1] || null;
    const routeCache = (swText.match(/startsWith\(["']\/shared\/["']\)[\s\S]{0,200}?cacheName:["']([^"']+)["']/) || [])[1] || null;
    if (!warmCache || !routeCache || warmCache !== routeCache) fail(`${warm} warms '${warmCache}' but the /shared/ route in ${sw} reads '${routeCache}'; the two names must be one`);
    if (!/url:["']shared\/oot-home\.css["']/.test(swText)) fail(`${sw} does not precache shared/oot-home.css, the build's own copy every Table page links`);
  }
  if (failures === before) lib.ok(`table: ${sw} imports ${warm}, OOT_SHARED is the nine, the warm cache is the route's cache, oot-home.css is precached`);
}

/* ---------- summary ---------- */

if (failures) {
  console.error(`check-stamps: ${failures} failure${failures === 1 ? '' : 's'}; the shared stamp is ${V} and every worker's CACHE must move with the files it precaches`);
  process.exitCode = 1;
} else {
  console.log(`check-stamps: ${pagesRead} pages wear ?v=${V} on ${sharedTagsSeen} shared tags in order; ${shellTags} wing shell tags match ${workerEntries} worker entries; ${workersProved} workers newer than their files${carried ? `, ${carried} carry-forward note${carried === 1 ? '' : 's'}` : ''}; the Table's worker warms the nine`);
}
