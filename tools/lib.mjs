/* Outside Of Time, the live site: the facts every tool in this folder reads.
   One place for the shared script list, the surfaces, the workers and the
   dash rule, so no two tools can disagree about them. Plain Node, no
   dependencies. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* The nine shared scripts every surface loads, in load order. The Table's
   injector appends exactly these before </body>; the wing shells and the
   hub name them by hand; static/sw-shared.js in WorldTable warms the same
   nine (OOT_SHARED there must equal this list). */
export const SHARED_SCRIPTS = [
  'oot-config.js', 'oot-profiles.js', 'oot-home.js', 'oot-auth.js', 'oot-gate.js',
  'oot-locks.js', 'oot-pass.js', 'oot-log.js', 'oot-bar.js'
];

/* Shared files that are loaded lazily, never listed by a worker, and
   mirrored byte for byte from WorldTable/static/shared. */
export const SHARED_LAZY = ['oot-maitre.js'];

/* Where the source repos are checked out, for the mirror and the wing sync.
   Overridable because a machine may hold them elsewhere. */
export const SOURCES = {
  worldtable: process.env.WORLDTABLE_SRC || join(ROOT, '..', 'worldtable'),
  ledger: process.env.LEDGER_SRC || join(ROOT, '..', 'bartendersledger'),
  codex: process.env.CODEX_SRC || join(ROOT, '..', 'sommelierscodex')
};

/* The surfaces and their workers. `exempt` workers belong to repos not
   checked out in this project (First Light, Calendar For Life): a stale
   list there is reported as a carry-forward note, never a failure. */
export const SURFACES = [
  { id: 'hub', dir: '.', shell: 'index.html', pages: ['index.html', 'privacy.html', 'terms.html', '404.html', 'pricing.html', 'pass/index.html'], worker: 'sw.js', cachePrefix: 'oot-shell-v', sharedRel: 'shared/' },
  { id: 'ledger', dir: 'ledger', shell: 'ledger/index.html', pages: ['ledger/index.html'], worker: 'ledger/sw.js', cachePrefix: 'oot-ledger-v', sharedRel: '../shared/' },
  { id: 'codex', dir: 'codex', shell: 'codex/index.html', pages: ['codex/index.html'], worker: 'codex/sw.js', cachePrefix: 'oot-codex-v', sharedRel: '../shared/' },
  { id: 'light', dir: 'light', shell: 'light/index.html', pages: ['light/index.html'], worker: 'light/sw.js', cachePrefix: 'oot-light-v', sharedRel: '../shared/', exempt: true },
  { id: 'almanac', dir: 'almanac', shell: 'almanac/index.html', pages: ['almanac/index.html'], worker: 'almanac/sw.js', cachePrefix: 'oot-cfl-v', sharedRel: '../shared/', exempt: true },
  { id: 'table', dir: 'table', shell: 'table/index.html', pages: ['table/index.html'], worker: 'table/sw.js', cachePrefix: null, sharedRel: '/shared/', built: true }
];

/* The dash rule, built from pieces so this file never carries the
   character the gate counts. It is the same five spellings the Maitre d'
   client filters (shared/oot-maitre.js DASH_RE) and the monorepo's
   check-publish counts with. */
export const DASH = new RegExp(['\\u2014', '&' + 'mdash;', '&#' + '8212;', '&#' + 'x2014;', ' ' + '-- '].join('|'), 'g');

export function countDashes(text) {
  const m = String(text).match(DASH);
  return m ? m.length : 0;
}

/* Every file under a directory, relative to ROOT, skipping .git and
   node_modules. */
export function walk(dir, out = []) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const name of readdirSync(abs)) {
    if (name === '.git' || name === 'node_modules') continue;
    const rel = dir === '.' ? name : join(dir, name);
    const st = statSync(join(ROOT, rel));
    if (st.isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

export function read(rel) { return readFileSync(join(ROOT, rel), 'utf8'); }
export function readJson(rel) { return JSON.parse(read(rel)); }

/* The shared stamp a page wears: the N in oot-config.js?v=N. */
export function stampOf(html) {
  const m = String(html).match(/oot-config\.js\?v=(\d+)/);
  return m ? Number(m[1]) : null;
}

/* SHARED_V is whatever the hub's own index.html wears; every other surface
   must agree (check-stamps proves it). */
export function sharedV() { return stampOf(read('index.html')); }

/* A worker's CACHE name and the files it lists. The lists are relative to
   the worker's own folder ('./x' or '../shared/x'); resolved to ROOT here. */
export function workerInfo(surface) {
  const text = read(surface.worker);
  const cache = (text.match(/const CACHE\s*=\s*'([^']+)'/) || [])[1] || null;
  const listText = (text.match(/const ASSETS\s*=\s*\[([\s\S]*?)\];/) || [])[1] || '';
  const assets = [];
  for (const m of listText.matchAll(/'([^']+)'/g)) {
    const p = m[1].replace(/\?v=\d+$/, '');
    const base = surface.dir === '.' ? '.' : surface.dir;
    const rel = relative(ROOT, join(ROOT, base, p));
    assets.push(rel === '' ? 'index.html' : rel);
  }
  return { cache, assets, text };
}

export function git(args, cwd = ROOT) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
}

export function fail(msg) { console.error('FAIL ' + msg); process.exitCode = 1; }
export function ok(msg) { console.log('ok   ' + msg); }
export function note(msg) { console.log('note ' + msg); }
