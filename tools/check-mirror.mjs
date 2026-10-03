// Usage: node tools/check-mirror.mjs [--help | -h]   (proves the shared mirror; no other flag, and no --fix, see below)
/* The shared layer is a mirror, and a mirror must not drift. The Maitre d'
   client (shared/oot-maitre.js), the home stylesheet (shared/oot-home.css),
   any house or quotes script and anything under shared/packs/ are written
   once in WorldTable/static/shared and copied here byte for byte; the Table
   build carries its own copy of the client and the stylesheet under
   table/shared, which must be the same bytes again. The Menu Desk is one
   generated script (WorldTable/tools/port-desk.mjs) that lands in both plain
   wings differing in its first line and nowhere else, the first line naming
   the wing so a copy in the wrong tree says so at the top, and each wing's
   copy here must equal the copy in its source repo. This tool proves every
   one of those equalities; when one fails it names the pair, both sizes,
   the first byte that differs and its line, and the canonical copy. It
   never writes: WorldTable's CLAUDE.md rule is "copy the canonical file
   over; never edit the mirror", so repair is a copy made by hand, and no
   --fix is offered. A source checkout that is absent is a note and a skip,
   never a failure, because this gate must be runnable on a machine that
   holds the site alone; a path that exists but holds no such checkout (a
   mistyped WORLDTABLE_SRC, say) is a failure, because skipping it quietly
   would hide every drift behind a passing summary. A file the source ships
   that the mirror lacks is a note, not a failure: the mirror may trail a
   publish, it may not disagree with one. A path that cannot be listed or
   read is a failure that names it and the rule, never a stack trace. Exit 1
   on any failure, 0 with a one-line summary otherwise. */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep, isAbsolute } from 'node:path';
import { ROOT, SHARED_LAZY, SOURCES, fail, ok, note } from './lib.mjs';

const USAGE = 'usage: node tools/check-mirror.mjs [--help | -h]   (proves the shared mirror; no other flag, and no --fix)';
const args = process.argv.slice(2);
const unknown = args.filter(a => !['--help', '-h', '--fix'].includes(a));
if (unknown.length) { console.error(`check-mirror: unknown argument ${unknown.join(' ')}\n${USAGE}`); process.exit(1); }
if (args.includes('--fix')) {
  console.error('check-mirror offers no --fix: copy the canonical file over by hand (WorldTable CLAUDE.md: never edit the mirror).');
  process.exit(1);
}
if (args.length) { console.log(USAGE); process.exit(0); }

/* Every FAIL line counts once, so the summary's figure is the number of
   lines to act on. */
let proved = 0, skipped = 0, failed = 0;
function drift(msg) { fail(msg); failed++; }

/* A path as a person would type it: relative to the site when it sits beside
   it, absolute when an env override put it somewhere else entirely. */
function show(abs) {
  const rel = relative(ROOT, abs);
  return rel.startsWith('..' + sep + '..') || isAbsolute(rel) ? abs : rel;
}

/* A file's bytes, or null after a failure that names the file and the
   rule: a folder where a file should be, or a file that cannot be read, is
   reported, never thrown. */
function bytes(rule, abs) {
  try { return readFileSync(abs); }
  catch (e) { drift(`${rule}: ${show(abs)} cannot be read as a file (${e.code || e.message})`); return null; }
}

/* The names in a folder, sorted, or null after a failure naming the path
   and the rule (missing, not a folder, or unreadable). */
function namesIn(rule, dir) {
  if (!existsSync(dir)) { drift(`${rule}: ${show(dir)} is missing`); return null; }
  try {
    if (!statSync(dir).isDirectory()) { drift(`${rule}: ${show(dir)} is not a folder`); return null; }
    return readdirSync(dir).sort();
  } catch (e) { drift(`${rule}: ${show(dir)} cannot be listed (${e.code || e.message})`); return null; }
}

/* Every file under a folder, as paths relative to it, folders recursed in
   name order; null after a failure anywhere beneath it. */
function filesUnder(rule, dir, out = [], base = dir) {
  const names = namesIn(rule, dir);
  if (names === null) return null;
  for (const name of names) {
    const abs = join(dir, name);
    let isDir;
    try { isDir = statSync(abs).isDirectory(); }
    catch (e) { drift(`${rule}: ${show(abs)} cannot be read (${e.code || e.message})`); return null; }
    if (isDir) { if (filesUnder(rule, abs, out, base) === null) return null; }
    else out.push(relative(base, abs));
  }
  return out;
}

/* The first byte at which two buffers differ and the 1-based line of the
   left buffer that byte falls on, for a message that points at the drift. */
function firstDifference(a, b) {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a[i] === b[i]) i++;
  let line = 1;
  for (let k = 0; k < i; k++) if (a[k] === 10) line++;
  return { offset: i, line };
}

/* Prove two files hold the same bytes. `rule` names the mirror rule in the
   message, `left` and `right` are absolute paths, and `canonical` names the
   copy a repair copies from: the right-hand file unless the caller says
   otherwise (the Table's copies have WorldTable's file as canonical, which
   is neither side). A missing file fails; the caller skips before calling
   when a checkout is absent. */
function same(rule, left, right, canonical = show(right)) {
  for (const p of [left, right]) {
    if (existsSync(p)) continue;
    const other = show(p === left ? right : left);
    if (show(p) === canonical) drift(`${rule}: ${canonical} is missing, so ${other} has no canonical: the mirror holds a file its source does not; remove it by hand, or publish the source's copy first`);
    else drift(`${rule}: ${show(p)} is missing, so ${other} has no partner; copy the canonical file ${canonical} over by hand`);
    return false;
  }
  const a = bytes(rule, left), b = bytes(rule, right);
  if (!a || !b) return false;
  if (a.equals(b)) { ok(`${rule}: ${show(left)} = ${show(right)} (${a.length.toLocaleString('en-GB')} bytes)`); proved++; return true; }
  const d = firstDifference(a, b);
  drift(`${rule}: ${show(left)} (${a.length} bytes) differs from ${show(right)} (${b.length} bytes) at byte ${d.offset}, line ${d.line} of ${show(left)}; the canonical copy is ${canonical}: copy it over by hand`);
  return false;
}

/* A source checkout, found through lib.SOURCES: { dir } when present,
   { dir: null, absent: true } after a note when the path does not exist
   (the comparisons are skipped), { dir: null } after a failure when the
   path exists but holds no such checkout (a mistyped override, or a
   stranger beside the site), because skipping that quietly would hide
   every drift. */
function checkout(name, key, envVar, mustHold) {
  const dir = SOURCES[key];
  const how = process.env[envVar] ? `${envVar}=${process.env[envVar]}` : `the default beside the site, ${show(dir)}; set ${envVar} to use another`;
  if (!existsSync(dir)) { note(`${name} checkout absent (${how}): its comparisons are skipped, not failed`); return { dir: null, absent: true }; }
  if (!existsSync(join(dir, mustHold))) { drift(`${name} checkout at ${show(dir)} (${how}) holds no ${mustHold}, so it is not that checkout; point ${envVar} at the right tree, or unset it`); return { dir: null, absent: false }; }
  return { dir, absent: false };
}

const shared = join(ROOT, 'shared');
const tableShared = join(ROOT, 'table', 'shared');
const wt = checkout('WorldTable', 'worldtable', 'WORLDTABLE_SRC', join('static', 'shared'));
const wtShared = wt.dir ? join(wt.dir, 'static', 'shared') : null;
const isLazyKind = name => /^oot-house.*\.js$/.test(name) || name === 'oot-quotes.js';
const wtCanonical = name => wtShared ? show(join(wtShared, name)) : 'WorldTable/static/shared/' + name;
const tableCanonical = name => `${wtCanonical(name)} (shared/ holds a hand copy of it, table/shared the build's)`;

/* Rule 1: the lazily loaded shared scripts, plus any house or quotes script
   the mirror holds, are the bytes WorldTable/static/shared holds. A house or
   quotes script the source ships that the mirror lacks is a note. */
const lazy = [...SHARED_LAZY];
for (const name of namesIn('mirror', shared) || []) if (isLazyKind(name) && !lazy.includes(name)) lazy.push(name);
if (!wtShared) { if (wt.absent) skipped += lazy.length; }
else {
  for (const name of lazy) same('mirror', join(shared, name), join(wtShared, name));
  for (const name of namesIn('mirror', wtShared) || []) {
    if (isLazyKind(name) && !lazy.includes(name)) note(`mirror: ${show(join(wtShared, name))} is not mirrored yet under shared/`);
  }
}

/* Rule 2: the Table's own copy of the Maitre d' client is the shared one. */
same('table copy', join(tableShared, 'oot-maitre.js'), join(shared, 'oot-maitre.js'), tableCanonical('oot-maitre.js'));

/* Rule 3: the home stylesheet is one file in three places. */
same('table copy', join(shared, 'oot-home.css'), join(tableShared, 'oot-home.css'), tableCanonical('oot-home.css'));
if (wtShared) same('mirror', join(shared, 'oot-home.css'), join(wtShared, 'oot-home.css'));
else if (wt.absent) skipped++;

/* Rule 4: every pack under shared/packs/ is the pack WorldTable ships. A
   pack the source ships that the mirror lacks is a note, whether or not
   shared/packs/ exists yet: the mirror may trail a WorldTable publish, it
   may not disagree with one. */
const packs = join(shared, 'packs');
const wtPacks = wtShared ? join(wtShared, 'packs') : null;
let mirroredPacks = [];
if (!existsSync(packs)) note('packs mirror: shared/packs/ does not exist; nothing to prove there yet');
else {
  const list = filesUnder('packs mirror', packs);
  if (list !== null) {
    mirroredPacks = list;
    if (list.length === 0) note('packs mirror: shared/packs/ exists but holds no files');
    if (!wtShared) { if (wt.absent) skipped += list.length; }
    else for (const rel of list) same('packs mirror', join(packs, rel), join(wtPacks, rel));
  }
}
if (wtPacks && existsSync(wtPacks)) {
  for (const rel of filesUnder('packs mirror', wtPacks) || []) {
    if (!mirroredPacks.includes(rel)) note(`packs mirror: ${show(join(wtPacks, rel))} is not mirrored yet under shared/packs/`);
  }
}

/* Rule 5: the Menu Desk in the two plain wings is one generated script that
   differs in its first line and nowhere else, and each wing's copy is the
   copy its source repo holds. port-desk.mjs writes the wing's name into the
   first line ("The Bartender's Ledger, js/menu-desk.js: ...", "The
   Sommelier's Codex, ...") so a copy in the wrong tree says so at the top;
   either half of each name satisfies the check, so only a renamed app could
   trip it without a real drift. */
const desks = [
  { wing: 'Ledger', path: join(ROOT, 'ledger', 'js', 'menu-desk.js'), named: /Bartender|Ledger/i },
  { wing: 'Codex', path: join(ROOT, 'codex', 'js', 'menu-desk.js'), named: /Sommelier|Codex/i }
];
const [ledger, codex] = desks;
let a = null, b = null;
if (!existsSync(ledger.path) || !existsSync(codex.path)) {
  for (const d of desks) if (!existsSync(d.path)) drift(`menu desk: ${show(d.path)} is missing; regenerate it with WorldTable/tools/port-desk.mjs and copy it over by hand`);
} else {
  a = bytes('menu desk', ledger.path);
  b = bytes('menu desk', codex.path);
}
if (a && b) {
  const na = a.indexOf(10), nb = b.indexOf(10);
  let good = true;
  for (const [d, n] of [[ledger, na], [codex, nb]]) {
    if (n < 0) { drift(`menu desk: ${show(d.path)} has no line break, so it has no first line to differ in`); good = false; }
  }
  if (good) {
    const firstA = a.subarray(0, na).toString('utf8'), firstB = b.subarray(0, nb).toString('utf8');
    if (firstA === firstB) { drift(`menu desk: ${show(ledger.path)} and ${show(codex.path)} share their first line "${firstA.slice(0, 60)}", so one copy sits in the wrong tree`); good = false; }
    for (const [d, first] of [[ledger, firstA], [codex, firstB]]) {
      if (!d.named.test(first)) { drift(`menu desk: the first line of ${show(d.path)} does not name the ${d.wing}, so it is not that wing's copy: "${first.slice(0, 80)}"`); good = false; }
    }
    const restA = a.subarray(na + 1), restB = b.subarray(nb + 1);
    if (!restA.equals(restB)) {
      const r = firstDifference(restA, restB);
      drift(`menu desk: ${show(ledger.path)} and ${show(codex.path)} differ below their first line, at line ${r.line + 1} of ${show(ledger.path)} (byte ${r.offset + na + 1}); regenerate both with WorldTable/tools/port-desk.mjs`);
      good = false;
    }
  }
  if (good) { ok(`menu desk: ${show(ledger.path)} and ${show(codex.path)} differ in their first line only (${a.length.toLocaleString('en-GB')} and ${b.length.toLocaleString('en-GB')} bytes)`); proved++; }
}
for (const [d, name, key, envVar] of [[ledger, "Bartender's Ledger", 'ledger', 'LEDGER_SRC'], [codex, "Sommelier's Codex", 'codex', 'CODEX_SRC']]) {
  const src = checkout(name, key, envVar, join('js', 'menu-desk.js'));
  if (src.dir) { if (existsSync(d.path)) same('wing copy', d.path, join(src.dir, 'js', 'menu-desk.js')); }
  else if (src.absent) skipped++;
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
if (failed > 0 || process.exitCode === 1) {
  console.error(`check-mirror: ${plural(failed, 'failure')} above, ${plural(proved, 'pair')} proved${skipped ? `, ${skipped} skipped` : ''}; the mirror is repaired by copying the canonical file over, never by editing it`);
  process.exitCode = 1;
} else {
  console.log(`check-mirror: ${plural(proved, 'pair')} byte-equal${skipped ? `, ${skipped} skipped (a source checkout is absent)` : ''}; the shared mirror has not drifted`);
}
