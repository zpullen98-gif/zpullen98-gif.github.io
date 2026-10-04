// Usage: node tools/sync-wing.mjs <ledger|codex> [--dry | --help]   (SITE_ROOT, LEDGER_SRC and CODEX_SRC point it at other checkouts)
/* The plain wings are copies that drifted on purpose. ledger/ and codex/
   were copied from their source repos and then edited here: nobody is
   named, the wording is dash free, the shells load the shared layer and
   the workers list it under their own CACHE names. Those edits must
   survive every later change made in the source, and the source's changes
   must still arrive, so this tool is a three-way merge per file and never
   a copy over. The base is the source commit the copy was last synced
   from (tools/wing-base.json), the head is the source's HEAD, and for
   every file git says changed between the two, git merge-file is handed
   the copy, the base version and the head version and asked for the
   result. A result with a conflict marker (reported by git, or present as
   content when git reports none), one that carries more dashes
   (lib.countDashes) than the copy had, or one that moves, adds or drops a
   stamped tag on the shared layer (shared/x?v=N, compared per file, and
   frozen) is a refusal: the whole run writes nothing and names the file
   and the rule, because a half-synced wing is worse than an old one.
   Files new in the source under js/, css/, fonts/ and icons/, the
   three root files (index.html, sw.js, manifest.webmanifest), and web
   images new under the wing's own image folder (ledger img/, codex
   assets/), are copied in; a changed file the copy does not carry is skipped with a note; a
   file deleted in the source is left in place with a note; a rename in
   the source arrives as that deletion plus a new file, with a note when
   the copy's old name carried edits that need porting; a binary file is
   taken from the head only when the copy still equals the base. The
   wing-only pieces (ledger/js/oot-ledger.js, codex/js/data-firstpath.js)
   are never written, and nothing outside <wing>/ ever is: the wing must
   be a plain folder of the site, and every path a write would land on is
   resolved through any link in the way and must lie in that folder, so a
   planted link cannot carry bytes into light/ or almanac/. Only what the
   source has committed at HEAD is merged; uncommitted work there is noted
   so nobody wonders why a change never arrived. On success every merged
   file is written and listed and wing-base.json advances to the head's
   short sha; --dry prints the same verdicts and writes nothing; a base
   that already equals the head says 'nothing to sync'. Before this tool
   the wings were kept in step by hand, hunk by hunk. */
import { readFileSync, writeFileSync, existsSync, lstatSync, realpathSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve, relative, dirname, basename, sep, isAbsolute } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import * as lib from './lib.mjs';

const USAGE = 'usage: node tools/sync-wing.mjs <ledger|codex> [--dry]';
const ROOT = process.env.SITE_ROOT ? resolve(process.env.SITE_ROOT) : lib.ROOT;
const BASE_FILE = 'tools/wing-base.json';
const WINGS = ['ledger', 'codex'];
const SRC_ENV = { ledger: 'LEDGER_SRC', codex: 'CODEX_SRC' };

/* The wing-only pieces: no counterpart in the source, never written here. */
const NEVER = { ledger: ['js/oot-ledger.js'], codex: ['js/data-firstpath.js'] };

/* Where a file that is new in the source is welcome in the copy. */
const NEW_DIRS = ['js/', 'css/', 'fonts/', 'icons/'];
const NEW_FILES = ['index.html', 'sw.js', 'manifest.webmanifest'];
/* Each wing's own image folder, where a new teaching image is welcome too, but
   only a web image: a README or a tool that lands beside the art stays a note.
   Without this the source's js could name art that the site never received. */
const NEW_MEDIA_DIRS = { ledger: ['img/'], codex: ['assets/'] };
const MEDIA = /\.(?:webp|png|jpe?g|avif|svg)$/i;

const MARKER = /^(?:<{7}|>{7})(?: |$)/m;
/* A stamped tag that names the shared layer, whatever the prefix
   (../shared/, shared/, /shared/): the file and the N it wears. The
   wing's own tags (js/oot-ledger.js?v=N) are the source's business and
   are not matched. */
const SHARED_STAMP = /\bshared\/([\w.-]+)\?v=(\d+)/g;

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(USAGE);
  console.log('  <ledger|codex>   the wing copy to bring up to its source HEAD by three-way merge (base in ' + BASE_FILE + ')');
  console.log('  --dry            print what would change, with the conflict, dash and stamp verdicts, and write nothing');
  console.log('  SITE_ROOT=<dir>  run against another checkout of the site; LEDGER_SRC and CODEX_SRC name the source checkouts');
  process.exit(0);
}
const DRY = args.includes('--dry');
const positional = args.filter(a => a !== '--dry');
const wing = positional[0];
if (positional.length !== 1 || !WINGS.includes(wing)) {
  lib.fail(`sync-wing: expected one of ${WINGS.join(', ')} and optionally --dry, got '${args.join(' ')}'; ${USAGE}`);
  process.exit(1);
}

/* A path as a person would type it: relative to the site when it sits
   beside it, absolute when an override put it somewhere else. */
function show(abs) {
  const rel = relative(ROOT, abs);
  return rel.startsWith('..' + sep + '..') || isAbsolute(rel) ? abs : rel;
}

/* When SITE_ROOT points elsewhere but the source override is unset, the
   source beside the real site is used; say so in a failure. */
function srcHint() {
  return process.env.SITE_ROOT && !process.env[SRC_ENV[wing]]
    ? `; SITE_ROOT is set but ${SRC_ENV[wing]} is not, so the source beside the real site was used` : '';
}

/* git with bytes out, untrimmed: `show` must not lose a trailing newline
   and must not decode a font, so lib.git (utf8, trimmed) is not used here. */
function gitBytes(cmd, cwd) {
  return execFileSync('git', cmd, { cwd, encoding: 'buffer', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'pipe'] });
}

function dashes(buf) { return lib.countDashes(buf.toString('utf8')); }
function lineOf(buf, re) {
  const text = buf.toString('utf8');
  const i = text.search(re);
  return i < 0 ? 0 : text.slice(0, i).split('\n').length;
}
function isNewAllowed(p) { return NEW_FILES.includes(p) || NEW_DIRS.some(d => p.startsWith(d)) || (MEDIA.test(p) && NEW_MEDIA_DIRS[wing].some(d => p.startsWith(d))); }

/* The shared tags a text wears: file name to the set of stamps on it. */
function sharedStamps(buf) {
  const out = new Map();
  for (const m of buf.toString('utf8').matchAll(SHARED_STAMP)) {
    if (!out.has(m[1])) out.set(m[1], new Set());
    out.get(m[1]).add(m[2]);
  }
  return out;
}

/* What is wrong with the shared tags after a merge, per file: a stamp the
   copy did not wear on that file, a shared file the copy did not name, or
   one the merge would lose. Empty when the tags are exactly the copy's. */
function stampFaults(wore, wears) {
  const faults = [];
  for (const [name, set] of wears) {
    for (const v of set) {
      if (wore.get(name)?.has(v)) continue;
      faults.push(wore.has(name)
        ? `put ?v=${v} on shared/${name} where the copy wears ?v=${[...wore.get(name)].join(', ?v=')}`
        : `add shared/${name}?v=${v}, a shared tag the copy does not carry`);
    }
  }
  for (const [name, set] of wore) {
    for (const v of set) if (!wears.get(name)?.has(v)) faults.push(`drop shared/${name}?v=${v}, which the copy wears`);
  }
  return faults;
}

/* Where the bytes of a write would actually land: the deepest part of the
   path that exists, resolved through every link on the way, with the part
   that does not exist yet rejoined. Throws on a dangling link. */
/* The wing owns two things in a shell and a worker that the source also
   edits: the CACHE name in sw.js (the wing's worker runs under its own
   oot- prefix) and the ?v= stamps on its own tags (the wing bumps past its
   own numbers). Before the three-way merge, both source versions are
   rewritten to carry the wing's values, so those lines never conflict: a
   CACHE line is always the wing's, and a stamp the source moved between
   base and head becomes the wing's own number plus one in the head text,
   while a stamp the source left alone stays the wing's. */
function wingOwned(p, buf, wingBuf, baseBuf) {
  let text = buf.toString('utf8');
  const wingText = wingBuf.toString('utf8');
  if (/(^|\/)sw\.js$/.test(p)) {
    const w = wingText.match(/const CACHE\s*=\s*'[^']+';/);
    if (w) text = text.replace(/const CACHE\s*=\s*'[^']+';/, w[0]);
    return Buffer.from(text, 'utf8');
  }
  if (/\.html$/.test(p)) {
    const baseText = baseBuf ? baseBuf.toString('utf8') : null;
    const stampOf = (t, path) => { const m = t.match(new RegExp('(["\'])' + path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\?v=(\\d+)\\1')); return m ? Number(m[2]) : null; };
    text = text.replace(/(["'])([^"'?]+?)\?v=(\d+)\1/g, (all, q, path, n) => {
      const mine = stampOf(wingText, path);
      if (mine == null) return all;
      if (baseText) {
        const was = stampOf(baseText, path);
        if (was != null && was !== Number(n)) return q + path + '?v=' + (mine + 1) + q;
      }
      return q + path + '?v=' + mine + q;
    });
    return Buffer.from(text, 'utf8');
  }
  return buf;
}

function lexists(p) { try { lstatSync(p); return true; } catch { return false; } }
function landing(out) {
  let p = out;
  const tail = [];
  while (!lexists(p)) {
    tail.unshift(basename(p));
    const up = dirname(p);
    if (up === p) break;
    p = up;
  }
  return join(realpathSync(p), ...tail);
}

const src = lib.SOURCES[wing];
const wingDir = resolve(ROOT, wing);
const baseAbs = resolve(ROOT, BASE_FILE);
for (const [what, p] of [['the wing copy', wingDir], ['the source checkout', src], [BASE_FILE, baseAbs]]) {
  if (!existsSync(p)) { lib.fail(`sync-wing ${wing}: ${what} is missing at ${show(p)}${p === src ? srcHint() : ''}`); process.exit(1); }
}

/* The wing must be a plain folder of the site itself, not a link to one. */
const wingReal = join(realpathSync(ROOT), wing);
if (lstatSync(wingDir).isSymbolicLink() || !lstatSync(wingDir).isDirectory() || realpathSync(wingDir) !== wingReal) {
  lib.fail(`sync-wing ${wing}: ${wing}/ is not a plain folder of the site (it resolves to ${show(realpathSync(wingDir))}); nothing is written through a link`);
  process.exit(1);
}

const baseJson = JSON.parse(readFileSync(baseAbs, 'utf8'));
const base = baseJson[wing];
if (typeof base !== 'string' || !base) { lib.fail(`sync-wing ${wing}: ${BASE_FILE} names no base commit for ${wing}`); process.exit(1); }

let baseFull, head, headShort;
try {
  if (lib.git(['rev-parse', '--is-inside-work-tree'], src) !== 'true') throw new Error('not a work tree');
  baseFull = lib.git(['rev-parse', '--verify', '--quiet', base + '^{commit}'], src);
  head = lib.git(['rev-parse', 'HEAD'], src);
  headShort = lib.git(['rev-parse', '--short', 'HEAD'], src);
} catch (e) {
  lib.fail(`sync-wing ${wing}: ${show(src)} is not a checkout holding base ${base}: ${String(e.stderr || e.message).trim()}${srcHint()}`);
  process.exit(1);
}

/* Uncommitted work in the source never arrives; say so before the person
   wonders why. Read untrimmed: a porcelain line may start with a space. */
const dirty = gitBytes(['status', '--porcelain'], src).toString('utf8').split('\n').filter(Boolean).map(l => l.slice(3));
if (dirty.length) {
  lib.note(`sync-wing ${wing}: the source checkout ${show(src)} carries ${dirty.length} uncommitted change${dirty.length === 1 ? '' : 's'} (${dirty.slice(0, 5).join(', ')}${dirty.length > 5 ? ', and more' : ''}); only what is committed at HEAD ${headShort} is merged`);
}

if (baseFull === head) {
  console.log(`nothing to sync: ${wing} is at source ${base} already (${show(src)})`);
  process.exit(0);
}

/* What changed in the source since the base: status A, M, D (renames are
   shown as D plus A so the merge never guesses a pairing), and which of
   those files git treats as binary. A second, rename-aware listing only
   feeds the notes, so a person knows which deletion and which new file
   belong together. */
const changes = [];
const status = lib.git(['-c', 'core.quotePath=false', 'diff', '--name-status', '--no-renames', baseFull, head], src);
for (const line of status.split('\n').filter(Boolean)) {
  const [st, ...rest] = line.split('\t');
  changes.push({ path: rest.join('\t'), status: st[0] === 'T' ? 'M' : st[0] });
}
const binary = new Set();
const stat = { added: {}, deleted: {} };
const numstat = lib.git(['-c', 'core.quotePath=false', 'diff', '--numstat', '--no-renames', baseFull, head], src);
for (const line of numstat.split('\n').filter(Boolean)) {
  const [a, d, ...rest] = line.split('\t');
  const p = rest.join('\t');
  if (a === '-' && d === '-') binary.add(p);
  stat.added[p] = Number(a); stat.deleted[p] = Number(d);
}
const renamedTo = new Map(), renamedFrom = new Map();
const moves = lib.git(['-c', 'core.quotePath=false', 'diff', '--name-status', '-M', baseFull, head], src);
for (const line of moves.split('\n').filter(Boolean)) {
  const [st, ...rest] = line.split('\t');
  if (st[0] === 'R' && rest.length === 2) { renamedTo.set(rest[0], rest[1]); renamedFrom.set(rest[1], rest[0]); }
}

lib.note(`sync-wing ${wing}${DRY ? ' (dry)' : ''}: source ${show(src)} base ${base} head ${headShort}, ${changes.length} file${changes.length === 1 ? '' : 's'} changed in the source`);
if (process.env.SITE_ROOT) lib.note(`SITE_ROOT=${ROOT}`);

const tmp = mkdtempSync(join(tmpdir(), 'sync-wing-'));
const results = [];   /* { path, out, action: merge|copy|unchanged, bytes, before, after, bin, fresh, note } */
const refusals = [];  /* { path, why } */
let skipped = 0;

function refuse(p, why) { refusals.push({ path: p, why }); lib.fail(`${wing}/${p}: ${why}`); }

/* For a file that arrives under a new name: whether the copy's old name
   carried edits the new name will not have. */
function renameNote(p) {
  const from = renamedFrom.get(p);
  if (!from) return '';
  const oldOut = resolve(wingDir, from);
  if (!existsSync(oldOut)) return `renamed from ${from} in the source; the copy holds no ${from}, so nothing is lost`;
  let edited = true;
  try { edited = !readFileSync(oldOut).equals(gitBytes(['show', `${baseFull}:${from}`], src)); } catch { edited = true; }
  return edited
    ? `renamed from ${from} in the source, and the copy's ${from} differs from base ${base}; port those edits to the new name by hand`
    : `renamed from ${from} in the source; the copy's ${from} still equals the base, so nothing is lost`;
}

try {
  for (const c of changes) {
    const p = c.path;
    const out = resolve(wingDir, p);
    const inWing = existsSync(out);
    if (!out.startsWith(wingDir + sep)) { refuse(p, 'resolves outside the wing folder; nothing outside it is ever written'); continue; }
    if (NEVER[wing].includes(p)) { lib.note(`${wing}/${p}: wing-only piece, never written (source ${c.status === 'D' ? 'deleted' : 'changed'} it)`); skipped++; continue; }
    if (c.status === 'D') {
      const to = renamedTo.get(p);
      if (inWing && to) lib.note(`${wing}/${p}: renamed in the source to ${to} since ${base}; the old name is left in place, remove it by hand (and from sw.js if it lists it) once the new name has arrived`);
      else if (inWing) lib.note(`${wing}/${p}: deleted in the source since ${base}; left in place, remove by hand if the wing should follow`);
      skipped++;
      continue;
    }

    /* From here on the file may be written, so it must land in the wing
       folder itself, not wherever a link in the way points. */
    let lands;
    try { lands = landing(out); } catch (e) {
      refuse(p, `cannot be resolved on disk (${e.code || e.message}): a dangling link is in the way, and nothing is written through a link`);
      continue;
    }
    if (lands !== join(wingReal, p)) { refuse(p, `a link is in the way: the bytes would land at ${show(lands)}, not in ${wing}/ itself, and nothing is written through a link`); continue; }

    if (c.status === 'A') {
      if (!isNewAllowed(p)) { lib.note(`${wing}/${p}: new in the source outside js/, css/, fonts/, icons/, the root files and the images under ${NEW_MEDIA_DIRS[wing].join(', ')}; not copied`); skipped++; continue; }
      if (inWing) { refuse(p, `new in the source since ${base} but the copy already holds a file of that name, so there is no base to merge from; resolve by hand`); continue; }
      const headBuf = gitBytes(['show', `${head}:${p}`], src);
      const isBin = binary.has(p);
      const after = isBin ? 0 : dashes(headBuf);
      if (after > 0) { refuse(p, `new in the source and carries ${after} dash${after === 1 ? '' : 'es'} (U+2014, its entities or the spaced double hyphen); the copy is dash free, so it is not copied in`); continue; }
      results.push({ path: p, out, action: 'copy', fresh: true, bytes: headBuf, before: 0, after, bin: isBin, note: renameNote(p) });
      continue;
    }
    if (c.status !== 'M') { lib.note(`${wing}/${p}: git status ${c.status} is not handled; skipped`); skipped++; continue; }
    if (!inWing) { lib.note(`${wing}/${p}: changed in the source, not carried by the copy; skipped`); skipped++; continue; }

    const wingBuf = readFileSync(out);
    const baseBuf = gitBytes(['show', `${baseFull}:${p}`], src);
    const headBuf = gitBytes(['show', `${head}:${p}`], src);
    const isBin = binary.has(p) || wingBuf.subarray(0, 8000).includes(0);
    if (wingBuf.equals(headBuf)) { results.push({ path: p, out, action: 'unchanged', bytes: wingBuf, before: 0, after: 0, bin: isBin }); continue; }
    if (isBin) {
      if (wingBuf.equals(baseBuf)) { results.push({ path: p, out, action: 'copy', bytes: headBuf, before: 0, after: 0, bin: true }); continue; }
      refuse(p, `binary, and the copy differs from base ${base} while the source changed it too; bytes cannot be merged three ways, resolve by hand`);
      continue;
    }

    const baseOwn = wingOwned(p, baseBuf, wingBuf, null);
    const headOwn = wingOwned(p, headBuf, wingBuf, baseBuf);
    if (wingBuf.equals(headOwn)) { results.push({ path: p, out, action: 'unchanged', bytes: wingBuf, before: 0, after: 0, bin: isBin }); continue; }
    const safe = p.replace(/[\\/]/g, '__');
    const baseTmp = join(tmp, safe + '.base'), headTmp = join(tmp, safe + '.head');
    writeFileSync(baseTmp, baseOwn); writeFileSync(headTmp, headOwn);
    let merged, conflicts = 0;
    try {
      merged = gitBytes(['merge-file', '-p', '-L', 'copy', '-L', 'base', '-L', 'source', out, baseTmp, headTmp], src);
    } catch (e) {
      if (typeof e.status !== 'number' || e.status < 1 || e.status > 127 || !e.stdout) {
        refuse(p, `git merge-file failed: ${String(e.stderr || e.message).trim()}`);
        continue;
      }
      conflicts = e.status; merged = e.stdout;
    }
    if (conflicts > 0 || MARKER.test(merged.toString('utf8'))) {
      const at = lineOf(merged, MARKER);
      const what = conflicts > 0
        ? `${conflicts} conflict${conflicts === 1 ? '' : 's'}`
        : 'a conflict marker that git merge-file did not report (one of the three versions carries it as content)';
      refuse(p, `${what} merging source ${base}..${headShort} into the copy (first marker at line ${at} of the merged text); resolve by hand, nothing written`);
      continue;
    }
    const before = dashes(wingBuf), after = dashes(merged);
    if (after > before) {
      refuse(p, `the merge would carry ${after} dash${after === 1 ? '' : 'es'} where the copy had ${before} (U+2014, its entities and the spaced double hyphen are refused); reword the source hunk, nothing written`);
      continue;
    }
    const faults = stampFaults(sharedStamps(wingBuf), sharedStamps(merged));
    if (faults.length) {
      refuse(p, `the merge would ${faults.join('; and ')}; the shared stamp is frozen and the source never names the shared layer, so no tool may move it, nothing written`);
      continue;
    }
    results.push({ path: p, out, action: 'merge', bytes: merged, before, after, bin: false });
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

for (const r of results) {
  const d = r.bin ? 'binary' : `dashes ${r.before} before, ${r.after} after`;
  const delta = `+${stat.added[r.path] ?? '?'} -${stat.deleted[r.path] ?? '?'} in the source`;
  if (r.action === 'merge') lib.ok(`${wing}/${r.path}: merges clean (${delta}; ${d})`);
  else if (r.action === 'copy') lib.ok(`${wing}/${r.path}: ${r.fresh ? 'new in the source, copied in' : 'taken from the source, the copy still equalled the base'} (${d})`);
  else lib.ok(`${wing}/${r.path}: already equals the source head; unchanged`);
  if (r.note) lib.note(`${wing}/${r.path}: ${r.note}`);
}

const n = k => results.filter(r => r.action === k).length;
const tally = `${n('merge')} merged, ${n('copy')} copied in, ${n('unchanged')} unchanged, ${skipped} skipped`;

if (refusals.length) {
  lib.fail(`sync-wing ${wing}: refused, ${refusals.length} file${refusals.length === 1 ? '' : 's'} cannot be merged (${tally}); nothing written, ${BASE_FILE} stays at ${base}`);
  process.exit(1);
}
if (DRY) {
  lib.ok(`sync-wing ${wing} (dry): would write ${n('merge') + n('copy')} file${n('merge') + n('copy') === 1 ? '' : 's'} and advance ${BASE_FILE} ${base} -> ${headShort} (${tally}); nothing written`);
  process.exit(0);
}
const written = [];
for (const r of results) {
  if (r.action === 'unchanged') continue;
  mkdirSync(dirname(r.out), { recursive: true });
  writeFileSync(r.out, r.bytes);
  written.push(`${wing}/${r.path}`);
}
baseJson[wing] = headShort;
writeFileSync(baseAbs, JSON.stringify(baseJson, null, 2) + '\n');
if (written.length) console.log('written:\n  ' + written.join('\n  '));
lib.ok(`sync-wing ${wing}: ${tally}; ${BASE_FILE} ${base} -> ${headShort}`);
