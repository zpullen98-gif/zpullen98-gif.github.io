// Usage: node tools/check-mirror.mjs        (no flags; there is no --fix, see below)
/* The shared layer is a mirror, and a mirror must not drift. The Maitre d'
   client (shared/oot-maitre.js), the home stylesheet (shared/oot-home.css),
   any house or quotes script and anything under shared/packs/ are written
   once in WorldTable/static/shared and copied here byte for byte; the Table
   build carries its own copy of the client and the stylesheet under
   table/shared, which must be the same bytes again. The Menu Desk is one
   generated script (WorldTable/tools/port-desk.mjs) that lands in both plain
   wings differing in its first line and nowhere else, and each wing's copy
   here must equal the copy in its source repo. This tool proves every one of
   those equalities, naming the pair and the first byte that differs when one
   fails. It never writes: WorldTable's CLAUDE.md rule is "copy the canonical
   file over; never edit the mirror", so repair is a copy made by hand, and no
   --fix is offered. A source checkout that is absent is a note and a skip,
   never a failure, because this gate must be runnable on a machine that holds
   the site alone. Exit 1 on any drift, 0 with a one-line summary otherwise. */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep, isAbsolute } from 'node:path';
import { ROOT, SHARED_LAZY, SOURCES, fail, ok, note } from './lib.mjs';

const USAGE = 'usage: node tools/check-mirror.mjs   (proves the shared mirror; no flags)';
if (process.argv.includes('--help') || process.argv.includes('-h')) { console.log(USAGE); process.exit(0); }
if (process.argv.includes('--fix')) {
  console.error('check-mirror offers no --fix: copy the canonical file over by hand (WorldTable CLAUDE.md: never edit the mirror).');
  process.exit(1);
}
if (process.argv.length > 2) { console.error(USAGE); process.exit(1); }

let proved = 0, skipped = 0, failed = 0;

/* A path as a person would type it: relative to the site when it sits beside
   it, absolute when an env override put it somewhere else entirely. */
function show(abs) {
  const rel = relative(ROOT, abs);
  return rel.startsWith('..' + sep + '..') || isAbsolute(rel) ? abs : rel;
}

function bytes(abs) { return readFileSync(abs); }

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
   message; `left` and `right` are absolute paths. Missing files fail unless
   the caller already decided to skip. */
function same(rule, left, right) {
  for (const p of [left, right]) {
    if (!existsSync(p)) { fail(`${rule}: ${show(p)} is missing, so ${show(p === left ? right : left)} has no partner`); failed++; return false; }
  }
  const a = bytes(left), b = bytes(right);
  if (a.equals(b)) { ok(`${rule}: ${show(left)} = ${show(right)} (${a.length.toLocaleString('en-GB')} bytes)`); proved++; return true; }
  const d = firstDifference(a, b);
  fail(`${rule}: ${show(left)} (${a.length} bytes) differs from ${show(right)} (${b.length} bytes) at byte ${d.offset}, line ${d.line} of ${show(left)}; copy the canonical file over by hand`);
  failed++;
  return false;
}

/* A source checkout: present (its path), or absent (note once, skip). A path
   that exists but is not the checkout it claims to be is a failure, because
   silently skipping a misconfigured WORLDTABLE_SRC would hide every drift. */
function checkout(name, dir, mustHold) {
  if (!existsSync(dir)) { note(`${name} checkout absent at ${show(dir)}: its comparisons are skipped, not failed`); return null; }
  const probe = join(dir, mustHold);
  if (!existsSync(probe)) { fail(`${name} checkout at ${show(dir)} holds no ${mustHold}; is the override pointing at the right tree?`); failed++; return null; }
  return dir;
}

function filesUnder(dir, out = [], base = dir) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) filesUnder(abs, out, base);
    else out.push(relative(base, abs));
  }
  return out;
}

const shared = join(ROOT, 'shared');
const tableShared = join(ROOT, 'table', 'shared');
const worldtable = checkout('WorldTable', SOURCES.worldtable, join('static', 'shared'));
const wtShared = worldtable ? join(worldtable, 'static', 'shared') : null;

/* Rule 1: the lazily loaded shared scripts, plus any house or quotes script
   that exists, are the bytes WorldTable/static/shared holds. */
const lazy = [...SHARED_LAZY];
for (const name of readdirSync(shared)) {
  if ((/^oot-house.*\.js$/.test(name) || name === 'oot-quotes.js') && !lazy.includes(name)) lazy.push(name);
}
for (const name of lazy) {
  if (!wtShared) { skipped++; continue; }
  same('mirror', join(shared, name), join(wtShared, name));
}

/* Rule 2: the Table's own copy of the Maitre d' client is the shared one. */
same('table copy', join(tableShared, 'oot-maitre.js'), join(shared, 'oot-maitre.js'));

/* Rule 3: the home stylesheet is one file in three places. */
same('table copy', join(shared, 'oot-home.css'), join(tableShared, 'oot-home.css'));
if (wtShared) same('mirror', join(shared, 'oot-home.css'), join(wtShared, 'oot-home.css'));
else skipped++;

/* Rule 4: every pack under shared/packs/ is the pack WorldTable ships. A
   pack the source ships that the mirror lacks is a note: the mirror may
   trail a WorldTable publish, it may not disagree with one. */
const packs = join(shared, 'packs');
if (existsSync(packs)) {
  const list = filesUnder(packs);
  if (!wtShared) { skipped += list.length; }
  else {
    const wtPacks = join(wtShared, 'packs');
    for (const rel of list) same('packs mirror', join(packs, rel), join(wtPacks, rel));
    if (existsSync(wtPacks)) {
      for (const rel of filesUnder(wtPacks)) {
        if (!existsSync(join(packs, rel))) note(`packs mirror: ${show(join(wtPacks, rel))} is not mirrored yet under shared/packs/`);
      }
    }
  }
  if (list.length === 0) note('shared/packs/ exists but holds no files');
} else {
  note('shared/packs/ does not exist; nothing to mirror there yet');
}

/* Rule 5: the Menu Desk in the two plain wings is one generated script that
   differs in its first line and nowhere else, each line naming its own wing
   (so a copy in the wrong tree says so at the top), and each wing's copy is
   the copy its source repo holds. */
const ledgerDesk = join(ROOT, 'ledger', 'js', 'menu-desk.js');
const codexDesk = join(ROOT, 'codex', 'js', 'menu-desk.js');
if (!existsSync(ledgerDesk) || !existsSync(codexDesk)) {
  for (const p of [ledgerDesk, codexDesk]) if (!existsSync(p)) { fail(`menu desk: ${show(p)} is missing`); failed++; }
} else {
  const a = bytes(ledgerDesk), b = bytes(codexDesk);
  const na = a.indexOf(10), nb = b.indexOf(10);
  if (na < 0 || nb < 0) {
    fail('menu desk: a menu-desk.js has no line break, so it has no first line to differ in'); failed++;
  } else {
    const firstA = a.subarray(0, na).toString('utf8'), firstB = b.subarray(0, nb).toString('utf8');
    const restA = a.subarray(na + 1), restB = b.subarray(nb + 1);
    let good = true;
    if (firstA === firstB) { fail(`menu desk: ${show(ledgerDesk)} and ${show(codexDesk)} share their first line "${firstA.slice(0, 60)}", so one copy sits in the wrong tree`); good = false; }
    if (!/Ledger/.test(firstA)) { fail(`menu desk: the first line of ${show(ledgerDesk)} does not name the Ledger: "${firstA.slice(0, 80)}"`); good = false; }
    if (!/Codex/.test(firstB)) { fail(`menu desk: the first line of ${show(codexDesk)} does not name the Codex: "${firstB.slice(0, 80)}"`); good = false; }
    if (!restA.equals(restB)) {
      const d = firstDifference(restA, restB);
      fail(`menu desk: ${show(ledgerDesk)} and ${show(codexDesk)} differ below their first line, at line ${d.line + 1} of the Ledger copy (byte ${d.offset + na + 1}); regenerate both with WorldTable/tools/port-desk.mjs`);
      good = false;
    }
    if (good) { ok(`menu desk: ${show(ledgerDesk)} and ${show(codexDesk)} differ in their first line only (${a.length.toLocaleString('en-GB')} and ${b.length.toLocaleString('en-GB')} bytes)`); proved++; }
    else failed++;
  }
  const ledgerSrc = checkout("Bartender's Ledger", SOURCES.ledger, join('js', 'menu-desk.js'));
  if (ledgerSrc) same('wing copy', ledgerDesk, join(ledgerSrc, 'js', 'menu-desk.js')); else skipped++;
  const codexSrc = checkout("Sommelier's Codex", SOURCES.codex, join('js', 'menu-desk.js'));
  if (codexSrc) same('wing copy', codexDesk, join(codexSrc, 'js', 'menu-desk.js')); else skipped++;
}

if (failed > 0 || process.exitCode === 1) {
  console.error(`check-mirror: ${failed} drift${failed === 1 ? '' : 's'} found, ${proved} pair${proved === 1 ? '' : 's'} proved${skipped ? `, ${skipped} skipped` : ''}; the mirror is repaired by copying the canonical file over, never by editing it`);
  process.exitCode = 1;
} else {
  console.log(`check-mirror: ${proved} pair${proved === 1 ? '' : 's'} byte-equal${skipped ? `, ${skipped} skipped (a source checkout is absent)` : ''}; the shared mirror has not drifted`);
}
