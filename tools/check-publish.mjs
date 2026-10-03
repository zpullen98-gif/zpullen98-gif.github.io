// Usage: node tools/check-publish.mjs [--set | --help]
/* The dash gate. The site's prose is written without the em dash (U+2014,
   its three entities and the spaced double hyphen that stands in for it),
   and the files that still carry one are inherited: First Light's pages,
   the font licences, a couple of chunks of the built Table. This tool
   counts lib.DASH over every text file in the tree, per top-level
   directory and in total, and compares the figures with
   tools/dash-baseline.json. A count above the baseline fails and lists the
   files that carry dashes in each directory that grew, with their counts,
   so the new one is found; a count below passes with a note that the
   baseline can be lowered. The baseline moves only through --set, which
   re-measures, rewrites the file with today's date and prints the delta.
   Files under tools/ are new code and carry no dash at all, whatever the
   baseline says. Replaces the monorepo's check-publish for this checkout. */
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import * as lib from './lib.mjs';

const USAGE = 'node tools/check-publish.mjs [--set | --help]';
const BASELINE = 'tools/dash-baseline.json';
const TEXT_EXT = new Set(['html', 'js', 'mjs', 'css', 'json', 'md', 'txt', 'webmanifest', 'xml', 'svg']);
const DEFAULT_NOTE = 'U+2014 and its three entities and the spaced double hyphen, counted over every text file in the tree by check-publish.mjs. Measured, never typed; move it only with check-publish --set after reading the diff.';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: ' + USAGE);
  console.log('Counts the dash rule over every text file and compares with ' + BASELINE + '; --set re-measures and rewrites it.');
  process.exit(0);
}
const unknown = args.filter(a => a !== '--set');
if (unknown.length) {
  lib.fail(`check-publish: unknown argument ${unknown.join(' ')}; usage: ${USAGE}`);
  process.exit(1);
}
const SET = args.includes('--set');

/* The extension after the last dot of the file name; a dotfile has none. */
function extOf(rel) {
  const name = rel.split(/[\\/]/).pop();
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
}

function topOf(rel) {
  const parts = rel.split(/[\\/]/);
  return parts.length > 1 ? parts[0] : '(root)';
}

function label(dir) { return dir === '(root)' ? 'files at the root' : dir + '/'; }

function today() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/* Every text file that carries a dash, with its count, plus the totals. */
function measure() {
  const files = [];
  const perDir = {};
  let total = 0;
  for (const rel of lib.walk('.')) {
    if (!TEXT_EXT.has(extOf(rel))) continue;
    const count = lib.countDashes(lib.read(rel));
    if (!count) continue;
    const top = topOf(rel);
    files.push({ rel, top, count });
    perDir[top] = (perDir[top] || 0) + count;
    total += count;
  }
  return { total, perDir, files };
}

function sortedPerDir(perDir) {
  const out = {};
  for (const dir of Object.keys(perDir).sort()) if (perDir[dir] > 0) out[dir] = perDir[dir];
  return out;
}

function byCountThenPath(a, b) { return b.count - a.count || (a.rel < b.rel ? -1 : 1); }

const now = measure();
const baselinePath = join(lib.ROOT, BASELINE);
const prev = existsSync(baselinePath) ? lib.readJson(BASELINE) : null;

/* Rule one, independent of the baseline: nothing under tools/ carries a dash. */
const toolFiles = now.files.filter(f => f.top === 'tools').sort(byCountThenPath);
for (const f of toolFiles) {
  lib.fail(`${f.rel}: ${f.count} dash(es); files under tools/ are new code and carry none, whatever ${BASELINE} says`);
}

if (SET) {
  if (toolFiles.length) {
    lib.fail(`${BASELINE} not rewritten while tools/ carries a dash; clean tools/ first`);
  } else {
    const next = { note: (prev && prev.note) || DEFAULT_NOTE, measuredOn: today(), total: now.total, perDir: sortedPerDir(now.perDir) };
    writeFileSync(baselinePath, JSON.stringify(next, null, 2) + '\n');
    const prevPer = (prev && prev.perDir) || {};
    const prevTotal = prev ? prev.total : 0;
    const changes = [];
    for (const dir of [...new Set([...Object.keys(prevPer), ...Object.keys(next.perDir)])].sort()) {
      const was = prevPer[dir] || 0, is = next.perDir[dir] || 0;
      if (is !== was) changes.push(`${dir} ${was} -> ${is} (${is > was ? '+' : ''}${is - was})`);
    }
    if (now.total !== prevTotal) changes.push(`total ${prevTotal} -> ${now.total} (${now.total > prevTotal ? '+' : ''}${now.total - prevTotal})`);
    lib.ok(`${BASELINE} set to ${now.total} dash(es) in ${now.files.length} files, measured ${next.measuredOn}: ${changes.length ? changes.join(', ') : 'no change from ' + (prev ? prev.measuredOn : 'nothing')}`);
  }
} else if (!prev) {
  lib.fail(`${BASELINE} is missing; nothing to compare with. Run node tools/check-publish.mjs --set to measure it`);
} else {
  const basePer = prev.perDir || {};
  const lowerable = [];
  for (const dir of [...new Set([...Object.keys(basePer), ...Object.keys(now.perDir)])].sort()) {
    const was = basePer[dir] || 0, is = now.perDir[dir] || 0;
    if (is > was) {
      lib.fail(`${label(dir)}: ${is} dash(es), baseline ${was} (+${is - was}); the files that carry them:`);
      for (const f of now.files.filter(f => f.top === dir).sort(byCountThenPath)) {
        console.error(`     ${String(f.count).padStart(4)}  ${f.rel}`);
      }
    } else if (is < was) {
      lowerable.push(`${dir} ${was} -> ${is}`);
    }
  }
  if (now.total > prev.total) {
    lib.fail(`total: ${now.total} dash(es), baseline ${prev.total} (+${now.total - prev.total}); ${BASELINE} moves only with --set`);
  } else if (now.total < prev.total) {
    lowerable.push(`total ${prev.total} -> ${now.total}`);
  }
  if (lowerable.length) lib.note(`below the baseline (${lowerable.join(', ')}); it can be lowered with --set`);
  if (!process.exitCode) {
    lib.ok(`check-publish: ${now.total} dash(es) in ${now.files.length} files, within ${BASELINE} (${prev.total}, measured ${prev.measuredOn}); tools/ clean`);
  }
}
