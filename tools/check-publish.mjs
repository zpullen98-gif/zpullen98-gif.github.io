// Usage: node tools/check-publish.mjs [--set | --help | -h]
/* The dash gate. The site's prose is written without the em dash (U+2014,
   its three entities and the spaced double hyphen that stands in for it),
   and the files that still carry one are inherited: First Light's pages,
   the font licences, a couple of chunks of the built Table. This tool
   counts lib.DASH over every text file in the tree, per top-level
   directory and in total, and compares the figures with
   tools/dash-baseline.json. A file is text when its extension is a known
   text one; a known image or font extension is skipped unread; anything
   else (a .yml, a LICENSE, a CNAME, a dotfile) is read and counted unless
   its bytes hold a NUL or fail to decode as UTF-8, and such a skip is
   named in the output so nothing escapes silently. A count above the
   baseline fails and lists the files that carry dashes in each directory
   that grew, with their counts, so the new one is found; a count below
   passes with a note that the baseline can be lowered. The baseline is
   measured, never typed: a file that is missing, unparseable or of the
   wrong shape (total not an integer, perDir not integer counts, total not
   their sum, measuredOn not a date) fails by name and points at --set.
   --set re-measures, prints the delta and the files behind any growth,
   then rewrites the file with the UTC date; when the figures are
   unchanged it keeps the old date and leaves an identical file alone, so
   a no-change --set never produces a diff. Files under tools/ are new code
   and carry no dash at all, whatever the baseline says. Replaces the
   monorepo's check-publish for this checkout. */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import * as lib from './lib.mjs';

const USAGE = 'node tools/check-publish.mjs [--set | --help | -h]';
const BASELINE = 'tools/dash-baseline.json';
const RESET = 'the baseline is measured, never typed: run node tools/check-publish.mjs --set to rewrite it';
const TEXT_EXT = new Set(['html', 'js', 'mjs', 'css', 'json', 'md', 'txt', 'webmanifest', 'xml', 'svg']);
const BINARY_EXT = new Set(['webp', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'avif', 'bmp', 'tif', 'tiff', 'woff', 'woff2', 'ttf', 'otf', 'eot', 'pdf', 'zip', 'gz', 'br', 'mp3', 'mp4', 'webm', 'ogg', 'wav', 'wasm']);
const DEFAULT_NOTE = 'U+2014 and its three entities and the spaced double hyphen, counted over every text file in the tree by check-publish.mjs. Measured, never typed; move it only with check-publish --set after reading the diff.';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: ' + USAGE);
  console.log('Counts the dash rule over every text file and compares with ' + BASELINE + '.');
  console.log('A plain run is the preview: it fails on growth and lists the files behind it.');
  console.log('--set re-measures, prints the delta and those files, and rewrites the baseline.');
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

/* The UTC date, so two machines measuring the same tree stamp the same day. */
function today() { return new Date().toISOString().slice(0, 10); }

/* Text by content, for a file whose extension decides nothing: no NUL
   byte in the first 8 KB and the whole file decodes as UTF-8. */
function looksLikeText(buf) {
  if (buf.subarray(0, 8192).includes(0)) return false;
  try { new TextDecoder('utf-8', { fatal: true }).decode(buf); return true; } catch { return false; }
}

/* Every text file that carries a dash, with its count, plus the totals,
   how many text files were read and which files were skipped as binary. */
function measure() {
  const files = [];
  const perDir = {};
  const sniffedOut = [];
  let total = 0, textFiles = 0, binaryByExt = 0;
  for (const rel of lib.walk('.')) {
    const ext = extOf(rel);
    let text;
    if (TEXT_EXT.has(ext)) {
      text = lib.read(rel);
    } else if (BINARY_EXT.has(ext)) {
      binaryByExt++;
      continue;
    } else {
      const buf = readFileSync(join(lib.ROOT, rel));
      if (!looksLikeText(buf)) { sniffedOut.push(rel); continue; }
      text = buf.toString('utf8');
    }
    textFiles++;
    const count = lib.countDashes(text);
    if (!count) continue;
    const top = topOf(rel);
    files.push({ rel, top, count });
    perDir[top] = (perDir[top] || 0) + count;
    total += count;
  }
  return { total, perDir, files, textFiles, binaryByExt, sniffedOut };
}

function sortedPerDir(perDir) {
  const out = {};
  for (const dir of Object.keys(perDir).sort()) if (perDir[dir] > 0) out[dir] = perDir[dir];
  return out;
}

function byCountThenPath(a, b) { return b.count - a.count || (a.rel < b.rel ? -1 : 1); }

function isCount(v) { return Number.isInteger(v) && v >= 0; }

function describe(v) {
  if (v === undefined) return 'missing';
  let s = JSON.stringify(v);
  if (s === undefined) s = String(v);
  if (s.length > 40) s = s.slice(0, 37) + '...';
  return typeof v === 'string' ? `${s} (a string)` : s;
}

/* The shape a measured baseline has; every departure named by field. */
function shapeProblems(b) {
  if (!b || typeof b !== 'object' || Array.isArray(b)) {
    return [`holds ${describe(b)}, not an object with note, measuredOn, total and perDir`];
  }
  const out = [];
  if ('note' in b && typeof b.note !== 'string') out.push(`note is ${describe(b.note)}; it must be a string`);
  if (typeof b.measuredOn !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(b.measuredOn)) {
    out.push(`measuredOn is ${describe(b.measuredOn)}; it must be a date written YYYY-MM-DD`);
  }
  if (!isCount(b.total)) out.push(`total is ${describe(b.total)}; it must be a non-negative integer`);
  if (!b.perDir || typeof b.perDir !== 'object' || Array.isArray(b.perDir)) {
    out.push(`perDir is ${describe(b.perDir)}; it must be an object of per-directory counts`);
  } else {
    let sum = 0, allCounts = true;
    for (const [dir, n] of Object.entries(b.perDir)) {
      if (isCount(n)) sum += n;
      else { allCounts = false; out.push(`perDir.${dir} is ${describe(n)}; it must be a non-negative integer`); }
    }
    if (allCounts && isCount(b.total) && sum !== b.total) {
      out.push(`total ${b.total} is not the sum of perDir (${sum}); the figures are measured together`);
    }
  }
  return out;
}

/* The baseline as it stands: its text, its data when it parses, and every
   problem that stops it being compared with. */
function loadBaseline() {
  const path = join(lib.ROOT, BASELINE);
  if (!existsSync(path)) return { path, exists: false, text: null, data: null, problems: [] };
  const text = readFileSync(path, 'utf8');
  let data;
  try { data = JSON.parse(text); } catch (e) {
    return { path, exists: true, text, data: null, problems: [`cannot be parsed as JSON (${e.message})`] };
  }
  return { path, exists: true, text, data, problems: shapeProblems(data) };
}

/* Whatever figures an unusable baseline still holds, for the --set delta. */
function salvage(data) {
  const perDir = {};
  if (data && data.perDir && typeof data.perDir === 'object' && !Array.isArray(data.perDir)) {
    for (const [dir, n] of Object.entries(data.perDir)) if (isCount(n)) perDir[dir] = n;
  }
  return { perDir, total: data && isCount(data.total) ? data.total : 0 };
}

function printCarriers(dir, print) {
  for (const f of now.files.filter(f => f.top === dir).sort(byCountThenPath)) {
    print(`     ${String(f.count).padStart(4)}  ${f.rel}`);
  }
}

const now = measure();
const base = loadBaseline();
const prev = base.exists && !base.problems.length ? base.data : null;

for (const rel of now.sniffedOut) lib.note(`${rel} skipped as binary by content (no known extension; it holds a NUL byte or is not UTF-8)`);

/* Rule one, independent of the baseline: nothing under tools/ carries a dash. */
const toolFiles = now.files.filter(f => f.top === 'tools').sort(byCountThenPath);
for (const f of toolFiles) {
  lib.fail(`${f.rel}: ${f.count} dash(es); files under tools/ are new code and carry none, whatever ${BASELINE} says`);
}

if (SET) {
  if (toolFiles.length) {
    lib.fail(`${BASELINE} not rewritten while tools/ carries a dash; clean tools/ first`);
  } else {
    const old = prev ? { perDir: prev.perDir, total: prev.total } : salvage(base.data);
    if (base.exists && base.problems.length) {
      lib.note(`${BASELINE} was unusable (${base.problems.join('; ')}); rewritten from the measurement`);
    }
    const perDir = sortedPerDir(now.perDir);
    const changes = [];
    for (const dir of [...new Set([...Object.keys(old.perDir), ...Object.keys(perDir)])].sort()) {
      const was = old.perDir[dir] || 0, is = perDir[dir] || 0;
      if (is !== was) changes.push(`${label(dir)} ${was} -> ${is} (${is > was ? '+' : ''}${is - was})`);
      if (is > was) {
        lib.note(`${label(dir)} grew ${was} -> ${is}; the files that carry dashes there:`);
        printCarriers(dir, console.log);
      }
    }
    if (now.total !== old.total) changes.push(`total ${old.total} -> ${now.total} (${now.total > old.total ? '+' : ''}${now.total - old.total})`);
    const noteText = base.data && typeof base.data.note === 'string' ? base.data.note : DEFAULT_NOTE;
    const sameFigures = prev !== null && !changes.length;
    const next = { note: noteText, measuredOn: sameFigures ? prev.measuredOn : today(), total: now.total, perDir };
    const text = JSON.stringify(next, null, 2) + '\n';
    const delta = changes.length ? changes.join(', ') : (prev ? 'no change from ' + prev.measuredOn : 'measured for the first time');
    if (text === base.text) {
      lib.ok(`${BASELINE} already holds ${now.total} dash(es) in ${now.files.length} files, measured ${prev.measuredOn}: ${delta}; left as it is`);
    } else if (sameFigures) {
      writeFileSync(base.path, text);
      lib.ok(`${BASELINE} rewritten in its measured form; the figures (${now.total} dash(es) in ${now.files.length} files) are unchanged since ${prev.measuredOn}`);
    } else {
      writeFileSync(base.path, text);
      lib.ok(`${BASELINE} set to ${now.total} dash(es) in ${now.files.length} files, measured ${next.measuredOn}: ${delta}`);
    }
  }
} else if (!base.exists) {
  lib.fail(`${BASELINE} is missing; nothing to compare with. Run node tools/check-publish.mjs --set to measure it`);
} else if (base.problems.length) {
  for (const p of base.problems) lib.fail(`${BASELINE} ${p}; ${RESET}`);
} else {
  const basePer = prev.perDir;
  const lowerable = [];
  for (const dir of [...new Set([...Object.keys(basePer), ...Object.keys(now.perDir)])].sort()) {
    const was = basePer[dir] || 0, is = now.perDir[dir] || 0;
    if (is > was) {
      lib.fail(`${label(dir)}: ${is} dash(es), baseline ${was} (+${is - was}); the files that carry them:`);
      printCarriers(dir, console.error);
    } else if (is < was) {
      lowerable.push(`${label(dir)} ${was} -> ${is}`);
    }
  }
  if (now.total > prev.total) {
    lib.fail(`total: ${now.total} dash(es), baseline ${prev.total} (+${now.total - prev.total}); ${BASELINE} moves only with --set`);
  } else if (now.total < prev.total) {
    lowerable.push(`total ${prev.total} -> ${now.total}`);
  }
  if (lowerable.length) lib.note(`below the baseline (${lowerable.join(', ')}); it can be lowered with --set`);
  if (!process.exitCode) {
    lib.ok(`check-publish: ${now.total} dash(es) in ${now.files.length} of ${now.textFiles} text files (${now.binaryByExt + now.sniffedOut.length} binary skipped), within ${BASELINE} (${prev.total}, measured ${prev.measuredOn}); tools/ clean`);
  }
}
