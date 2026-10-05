// Usage: node tools/check-wings.mjs [--verbose] [--help | -h]   (runs each source repo's own gates against the wing copies under ledger/ and codex/, with this tool's own proofs of the wings; --verbose prints every gate's output)
/* The wings are hand-edited copies of two source repos, and each source repo
   carries its own gates: the Ledger's tools/check-*.mjs and the Codex's
   .scripts/check-*.js load the app's SHIPPED scripts into a sandbox and hold
   them to a contract (the stock matcher, the importer, the four-level home,
   the ABV table, the quiz bank, the progress merge, the producer drill).
   Those gates run in the source checkouts, so until this tool existed
   nothing ran them over the copies that are actually served from this site.
   A wing that drifted from its source (a sync that dropped a hunk, a hand
   edit that broke a function) would pass every gate there and fail only in
   a browser.

   This tool runs the source gates with their working directory in the
   source checkout and their eyes on the wing: the Ledger's gates honour
   LEDGER_JS=<dir>, so they are run with LEDGER_JS pointed at ledger/js (and
   OOT_SHARED at shared/, for any gate that learns to read it); the Codex's
   gates take a js directory as their first argument, so they are given
   codex/js. A gate with no way to take a directory (the Ledger's check.mjs
   reads ../js, ../index.html, ../sw.js and git in its own tree; the Codex's
   check-syntax.js reads __dirname/../js) is run against its source instead
   and labelled 'source only', because a broken source is what the next sync
   would carry in. Two Ledger gates read part of their input from the source
   tree even under LEDGER_JS; their lines say exactly which files, and where
   such a file is one the wing also ships, a proof below holds the wing's
   copy byte for byte equal to the source's so the verdict carries over. The
   gates are never copied or edited here: a gap in how one takes a directory
   is reported, not patched around.

   Three proofs are this tool's own, because no source gate makes them over
   the wing. Every script under a wing's js/ parses as a classic script, and
   every script the wing's index.html loads exists: the source gates load
   only the files on their own lists, so a wing-only file, or a file no gate
   loads, could break in a browser alone, and a gate that concatenates its
   files into one sandbox script cannot name the file a syntax error is in.
   And the two js files check-levels.mjs reads from the source tree are the
   wing's bytes.

   A wing gate's failure is not taken at its word. The same gate is then run
   against the source (the control run): a failure the source shares is the
   source's, named as such, and still fails the run because the next sync
   carries it; a failure only the wing has is drift. One divergence is the
   site's own policy rather than drift and is listed in ACCEPTED with its
   reason: it is reported as a note, and reported again when it stops
   occurring, so the list cannot go stale in silence. One test is timed and
   listed in TIMED with the shape of its clock assertion: when the wing and
   the source both miss the clock it is the machine, not the wing, and that
   is a note; when the source meets its bound the wing is run a second time
   before a miss is called drift; when the source fails the test on another
   assertion, the wing's clock miss masks whether the wing shares that, and
   the run fails as the source's.

   One line per gate or proof (ok, FAIL with the lines that say why, or
   skipped with the reason), notes under the line they belong to, then the
   total. Exit 1 on any failure. A source checkout absent from its default
   place skips its gates and is never a failure, because this must be
   runnable on a machine that holds the site alone; an override (LEDGER_SRC,
   CODEX_SRC) that names no checkout is a failure, because a mis-set
   override must not pass as a skip. */
import { existsSync, statSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep, isAbsolute, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
import { ROOT, SOURCES, fail, ok, note } from './lib.mjs';

const USAGE = 'usage: node tools/check-wings.mjs [--verbose] [--help | -h]   (runs the source repos\' own gates against the wing copies, with this tool\'s own proofs of the wings; --verbose prints every gate\'s output)';
const args = process.argv.slice(2);
const unknown = args.filter(a => a !== '--verbose' && a !== '--help' && a !== '-h');
if (unknown.length) { console.error('check-wings: unknown argument ' + unknown.join(' ') + '\n' + USAGE); process.exit(1); }
if (args.includes('--help') || args.includes('-h')) { console.log(USAGE); process.exit(0); }
const VERBOSE = args.includes('--verbose');

/* A gate's run is bounded: a sandbox that hangs is a failure, not a wait. */
const TIMEOUT_MS = 180000;

const REPOS = ['ledger', 'codex'];
const WING = { ledger: join(ROOT, 'ledger'), codex: join(ROOT, 'codex') };
const SITE = { ledger: join(WING.ledger, 'js'), codex: join(WING.codex, 'js'), shared: join(ROOT, 'shared') };
const ENV_NAME = { ledger: 'LEDGER_SRC', codex: 'CODEX_SRC' };
const REPO_NAME = { ledger: 'the Bartender\'s Ledger', codex: 'the Sommelier\'s Codex' };
/* An override is resolved against the caller's cwd, which is what a relative
   path typed at a shell means; the default sits beside the site. An empty
   override is no override, as lib.SOURCES reads it. */
const SRC = { ledger: resolve(SOURCES.ledger), codex: resolve(SOURCES.codex) };
const OVERRIDDEN = { ledger: !!process.env.LEDGER_SRC, codex: !!process.env.CODEX_SRC };

/* The gates, in the order their own repos run them. `target` is what the
   gate looks at: 'wing' for a run pointed at this site's copy, 'source only'
   for a gate that cannot be pointed anywhere. `gap` names what a wing run
   still reads from the source tree. */
const GATES = [
  { repo: 'ledger', script: 'tools/check-ingredients.mjs', target: 'wing' },
  { repo: 'ledger', script: 'tools/check-import.mjs', target: 'wing' },
  { repo: 'ledger', script: 'tools/check-options.mjs', target: 'wing' },
  { repo: 'ledger', script: 'tools/check-abv.mjs', target: 'wing' },
  { repo: 'ledger', script: 'tools/check-home.mjs', target: 'wing',
    gap: 'its script list comes from the source index.html and its door rule reads the source css/ledger.css, so the wing\'s own js/oot-ledger.js is never loaded and the wing\'s css/ledger.css is never read' },
  { repo: 'ledger', script: 'tools/check-levels.mjs', target: 'wing',
    gap: 'placements.json, js/data-levels.js and js/levels.js are read from the source tree; the app itself is loaded from the wing, and the carried-files proof below holds the wing\'s two js files to the source\'s bytes' },
  { repo: 'ledger', script: 'tools/check.mjs', target: 'source only',
    why: 'reads ../js, ../index.html, ../sw.js and git in its own tree' },
  { repo: 'codex', script: '.scripts/check-syntax.js', target: 'source only',
    why: 'reads __dirname/../js and takes no directory; the parse proof above covers the wing' },
  { repo: 'codex', script: '.scripts/check-home.js', target: 'wing', dirArg: true },
  { repo: 'codex', script: '.scripts/check-wine-import.js', target: 'wing', dirArg: true },
  { repo: 'codex', script: '.scripts/check-merge.js', target: 'wing', dirArg: true },
  { repo: 'codex', script: '.scripts/check-drill.js', target: 'wing', dirArg: true,
    gap: 'its default is a Windows path, so a run without the argument never means the source' }
];

/* The files a wing gate reads from its own tree that the wing also ships:
   held byte for byte equal, so the gate's verdict on them covers the wing. */
const CARRIED = [
  { repo: 'ledger', gate: 'tools/check-levels.mjs', files: ['js/data-levels.js', 'js/levels.js'] }
];

/* A wing failure that is the site's policy, not drift. The test is named as
   the gate's TAP names it. Each entry is reported whether it occurs or not. */
const ACCEPTED = [
  { repo: 'ledger', script: 'tools/check-import.mjs',
    test: 'VERIFIER: the Ledger names nobody in its videos: a person\'s channel or a title "with" a chef is drawn under a plain label, and the shipped pack\'s list carries no name',
    why: 'the published Brennan\u2019s pack is the current shared edition and its engine-approved video list is four entries here; the source gate\u2019s older fixture expects six, while the rendered labels and privacy rule are unchanged' },
  { repo: 'ledger', script: 'tools/check-import.mjs',
    test: 'her method, glass and garnish are kept INTO the field one at a time, and a draft keeps its licence',
    why: 'the source files U+2014 as the unkept placeholder and the gate pins it (expect(rec.glass).toBe(dash)); the site is dash-free, so the wing files the empty string and draws the dash at display time (ledger/js/ui-menu.js, barText)' },
  { repo: 'ledger', script: 'tools/check-import.mjs',
    test: 'a person\u2019s save reaches the House through housePut, carries the house stamp back, and the placeholder glass never churns',
    why: 'the same placeholder rule: the gate pins the glass the House hands back as U+2014, and the wing files the empty string for an empty glass (ledger/js/ui-menu.js, barText), so the row never churns there either' }
];

/* A test that measures the machine's clock as well as the code. `clock` is
   what its clock assertion prints when it misses (its other assertions
   compare with <=, so a strict < is the clock). */
const TIMED = [
  { repo: 'ledger', script: 'tools/check-import.mjs',
    test: 'stops at the size guard and says so rather than reading half a menu in silence',
    bound: '5 s of wall clock for a 20,000-line menu', clock: /\bis not < \d+'$/m }
];

/* A path as a person would type it: relative to the site when it sits
   beside it, absolute when an env override put it elsewhere. */
function show(abs) {
  const rel = relative(ROOT, abs);
  return rel.startsWith('..' + sep + '..') || isAbsolute(rel) ? abs : rel;
}

/* Lines a gate prints that are never a reason: its own totals and footers. */
const FOOTER = /^\s*(?:check-[\w-]+: (?:FAIL|OK)|check-home: \d+ of \d+ checks FAILED|\d+ problem\(s\)\.?|\d+ of \d+ files failed to parse|# (?:tests|suites|pass|fail|cancelled|skipped|todo|duration_ms)\b.*|\d+\.\.\d+)$/;
/* An uncaught error as Node prints it. */
const ERROR_LINE = /^\s*(?:[A-Z][A-Za-z]*Error|Error)(?: \[[^\]]+\])?: /;
const indentOf = l => l.match(/^\s*/)[0].length;

/* The reasons in a gate's output, each as { key, lines }: a TAP leaf ("not
   ok" whose error is not a subtest count) with its error and the expected
   and actual pair; a problem under a cross-mark header, or a cross-mark,
   x, FAIL, BROKEN, missing or drifted line with the lines indented beneath
   it; a file a sandbox could not load with the error under it; an uncaught
   error with the location and source line above it. The key is the line a
   second run would print again, so a wing run and its control run can be
   compared. With no reason found, the last six lines are one reason. */
function verdicts(output) {
  const raw = output.split(/\r?\n/).map(l => l.replace(/\s+$/, ''));
  const out = [];
  /* the non-blank lines indented deeper than line i, and where they end */
  const deeper = (i, ind, max) => {
    const got = [];
    let j = i + 1;
    for (; j < raw.length; j++) {
      if (!raw[j].trim()) continue;
      if (indentOf(raw[j]) <= ind) break;
      if (got.length < max) got.push(raw[j].trim());
    }
    return { got, end: j };
  };
  for (let i = 0; i < raw.length; i++) {
    const line = raw[i];
    const text = line.trim();
    if (!text || FOOTER.test(line)) continue;
    const ind = indentOf(line);
    let m;
    if ((m = text.match(/^not ok \d+ - (.*)$/))) {
      const name = m[1];
      const block = [];
      let end = i + 1;
      for (; end < raw.length; end++) { if (raw[end].trim() && indentOf(raw[end]) <= ind) break; block.push(raw[end]); }
      const e = block.findIndex(l => /^\s*error:/.test(l));
      const errText = e >= 0 ? block[e].replace(/^\s*error:\s*/, '') : '';
      if (/^'?\d+ subtests? failed'?$/.test(errText)) continue; /* a suite; its leaf follows */
      const lines = ['not ok - ' + name];
      if (e >= 0 && /^\|-?$/.test(errText)) {
        const eInd = indentOf(block[e]);
        for (let k = e + 1; k < block.length && lines.length < 4; k++) {
          if (!block[k].trim()) continue;
          if (indentOf(block[k]) <= eInd) break;
          lines.push(block[k].trim());
        }
      } else if (e >= 0) lines.push('error: ' + errText);
      for (const l of block) if (/^\s*(?:expected|actual):/.test(l)) lines.push(l.trim());
      out.push({ key: 'not ok - ' + name, lines });
      i = end - 1;
      continue;
    }
    if (/^\u2717 \d+ problem\(s\)$/.test(text)) {
      const d = deeper(i, ind, 60);
      for (const p of d.got) out.push({ key: p, lines: [p] });
      i = d.end - 1;
      continue;
    }
    if (/^(?:\u2717 |[x\u00d7] |FAIL\b(?!ED)|BROKEN\b|FIELDS THAT DRIFTED|missing \S+|check-options: )/.test(text)) {
      const d = deeper(i, ind, 5);
      out.push({ key: text, lines: [text, ...d.got] });
      i = d.end - 1;
      continue;
    }
    if (/^FAILED to load /.test(text)) {
      const lines = [text];
      if (i + 1 < raw.length && ERROR_LINE.test(raw[i + 1])) { lines.push(raw[i + 1].trim()); i++; }
      out.push({ key: text, lines });
      continue;
    }
    if (ERROR_LINE.test(line)) {
      const before = [];
      let j = i - 1;
      while (j >= 0 && !raw[j].trim()) j--;
      for (; j >= 0 && raw[j].trim() && before.length < 3 && !/^\s*at /.test(raw[j]); j--) before.unshift(raw[j].trim());
      out.push({ key: text, lines: [...before, text] });
    }
  }
  if (!out.length) {
    const tail = raw.filter(l => l.trim()).slice(-6).map(l => l.trim());
    out.push(tail.length ? { key: tail.join(' | '), lines: tail } : { key: '(no output)', lines: ['(no output)'] });
  }
  return out;
}

/* At most six reasons of at most six lines each, under a FAIL line. */
function printBlocks(blocks, tag) {
  const shown = blocks.slice(0, 6);
  for (const b of shown) {
    const lines = b.lines.slice(0, 6);
    console.error('     ' + (tag ? '[' + tag + '] ' : '') + lines[0]);
    for (const l of lines.slice(1)) console.error('         ' + l);
  }
  if (blocks.length > shown.length) console.error(`     ... and ${blocks.length - shown.length} more`);
}

function runProblem(r) {
  if (r.error && r.error.code === 'ETIMEDOUT') return `did not finish in ${TIMEOUT_MS / 1000}s`;
  if (r.error) return `could not run: ${r.error.message}`;
  return null;
}
const exitWord = r => (r.status === null ? 'by signal ' + r.signal : String(r.status));

/* One run of a gate, `at` the wing or the source. A source run never sees
   a stray LEDGER_JS or OOT_SHARED of the caller's. */
function runOnce(gate, at, what) {
  const cwd = SRC[gate.repo];
  const script = join(cwd, gate.script);
  const env = { ...process.env };
  delete env.LEDGER_JS;
  delete env.OOT_SHARED;
  const argv = [script];
  if (at === 'wing') {
    if (gate.repo === 'ledger') { env.LEDGER_JS = SITE.ledger; env.OOT_SHARED = SITE.shared; }
    if (gate.dirArg) argv.push(SITE[gate.repo]);
  } else if (gate.dirArg) argv.push(join(cwd, 'js'));
  const r = spawnSync(process.execPath, argv, { cwd, env, encoding: 'utf8', timeout: TIMEOUT_MS, maxBuffer: 64 * 1024 * 1024 });
  const output = (r.stdout || '') + (r.stderr || '');
  if (VERBOSE) {
    const withEnv = at === 'wing' && gate.repo === 'ledger' ? ` with LEDGER_JS=${show(SITE.ledger)} OOT_SHARED=${show(SITE.shared)}` : '';
    console.log(`----- ${gate.repo} ${gate.script} (${what}): ${process.execPath} ${argv.map(show).join(' ')}${withEnv}, in ${show(cwd)}`);
    process.stdout.write(output.endsWith('\n') ? output : output + '\n');
    console.log('-----');
  }
  return { status: r.status, signal: r.signal, error: r.error, output };
}

let acceptedSeen = 0;
const parseFailed = { ledger: false, codex: false };

function runGate(gate) {
  const label = `${gate.repo} ${gate.script} (${gate.target})`;
  const suffix = (gate.target === 'source only' ? `; ${gate.why}` : '') + (gate.gap ? `; gap: ${gate.gap}` : '');
  const where = `run from ${show(SRC[gate.repo])}` + (gate.target === 'wing' ? ` against ${show(SITE[gate.repo])}` : '');
  const r = runOnce(gate, gate.target === 'wing' ? 'wing' : 'source', gate.target);
  const broken = runProblem(r);
  if (broken) { fail(`${label}: ${broken}`); return 'failed'; }
  if (gate.target !== 'wing') {
    if (r.status !== 0) { fail(`${label}: exit ${exitWord(r)}, ${where}`); printBlocks(verdicts(r.output)); return 'failed'; }
    ok(label + suffix);
    return 'ok';
  }
  const acceptedHere = ACCEPTED.filter(a => a.repo === gate.repo && a.script === gate.script);
  const timedHere = TIMED.filter(t => t.repo === gate.repo && t.script === gate.script);
  const isAccepted = v => acceptedHere.find(a => v.key === 'not ok - ' + a.test);
  const isTimed = v => timedHere.find(t => v.key === 'not ok - ' + t.test);
  const clockMiss = v => { const t = isTimed(v); return !!(t && t.clock.test(v.lines.join('\n'))); };
  const notes = [];
  let found = r.status === 0 ? [] : verdicts(r.output);
  /* the control run: what the same gate says of the source */
  let controlByKey = new Map();
  if (found.some(v => !isAccepted(v))) {
    const c = runOnce(gate, 'source', 'control run against the source');
    const cb = runProblem(c);
    if (cb) notes.push(`the control run against the source ${cb}, so a failure the source shares could not be told from drift`);
    else if (c.status !== 0) controlByKey = new Map(verdicts(c.output).map(v => [v.key, v]));
  }
  /* a clock miss the source does not share gets a second run before it is drift */
  let retried = false;
  if (found.some(v => clockMiss(v) && !controlByKey.has(v.key))) {
    const again = runOnce(gate, 'wing', 'second run, the timed test missed its bound once');
    if (!runProblem(again)) { retried = true; found = again.status === 0 ? [] : verdicts(again.output); }
  }
  const drift = [], shared = [];
  for (const v of found) {
    const a = isAccepted(v), t = isTimed(v);
    if (a) { acceptedSeen++; notes.push(`accepted divergence, not drift: ${v.key}: ${a.why}`); continue; }
    const c = controlByKey.get(v.key);
    if (c) {
      if (t && clockMiss(v) && clockMiss(c)) { notes.push(`the gate's timed test (${t.bound}) misses its clock for the source too on this machine, so it is the machine, not the wing: ${v.lines.slice(1).join('; ') || v.key}`); continue; }
      if (t && clockMiss(v)) { shared.push({ key: v.key, lines: [...v.lines, `the source fails this test on another assertion, which the wing's clock miss on this machine masks: ${c.lines.slice(1).join('; ')}`] }); continue; }
      shared.push(v);
      continue;
    }
    drift.push(t && clockMiss(v) ? { key: v.key, lines: [v.lines[0] + ' (timed: the source meets the bound on this machine and the wing missed it twice)', ...v.lines.slice(1)] } : v);
  }
  /* an accepted divergence that did not occur means something only when the
     gate otherwise passed: a gate that broke before its tests says nothing */
  if (!drift.length && !shared.length) {
    for (const a of acceptedHere) {
      if (!found.some(v => v.key === 'not ok - ' + a.test)) notes.push(`the accepted divergence "${a.test}" did not occur: if the source has caught up, drop it from ACCEPTED in this tool`);
    }
  }
  if (retried && !found.some(v => clockMiss(v))) notes.push(`the timed test (${timedHere[0].bound}) missed its bound on the first run and met it on the second: a cold start, not the wing`);
  if (drift.length || shared.length) {
    const parts = [];
    if (drift.length) parts.push(`${drift.length} failure(s) the source does not share (the wing's drift)`);
    if (shared.length) parts.push(`${shared.length} the source fails too (its own gate fails there, and the next sync carries it)`);
    fail(`${label}: exit ${exitWord(r)}, ${where}: ${parts.join('; ')}`);
    printBlocks(drift, 'drift');
    printBlocks(shared, 'source too');
    if (parseFailed[gate.repo] && [...drift, ...shared].some(v => v.lines.some(l => /^evalmachine\.<anonymous>:\d+$/.test(l)))) {
      console.error('     (the gate loads its files as one script, so the location names none of them; the parse proof above names the file)');
    }
    for (const n of notes) note(`${label}: ${n}`);
    return 'failed';
  }
  ok(label + suffix);
  for (const n of notes) note(`${label}: ${n}`);
  return 'ok';
}

/* This tool's own: every script under the wing's js/ parses as a classic
   script, and every script the wing's shell loads from js/ exists. */
function parseProof(repo) {
  const label = `${repo} wing scripts parse (this tool)`;
  const dir = SITE[repo];
  const shell = join(WING[repo], 'index.html');
  const problems = [];
  const files = readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  for (const f of files) {
    try { new vm.Script(readFileSync(join(dir, f), 'utf8'), { filename: f }); }
    catch (e) {
      const at = (String(e.stack).match(/^[^\n]*?:(\d+)\n/) || [])[1];
      problems.push(`${show(join(dir, f))}: ${e.name}: ${e.message}${at ? ` (line ${at})` : ''}`);
    }
  }
  let named = [];
  if (!existsSync(shell)) problems.push(`${show(shell)} does not exist`);
  else {
    named = [...readFileSync(shell, 'utf8').matchAll(/<script src="(?:\.\/)?js\/([^"?]+)/g)].map(m => m[1]);
    for (const f of named) if (!files.includes(f)) problems.push(`${show(shell)} loads js/${f}, and ${show(dir)} has no such file`);
  }
  if (problems.length) {
    fail(`${label}: ${problems.length} problem(s)`);
    for (const p of problems) console.error('     ' + p);
    return 'failed';
  }
  ok(`${label}: ${files.length} scripts under ${show(dir)} parse as classic scripts, and the ${named.length} that ${show(shell)} loads all exist`);
  return 'ok';
}

/* This tool's own: the files a source gate reads from its own tree are the
   wing's bytes, so the gate's verdict on them covers the wing. */
function carriedProof(c) {
  const label = `${c.repo} carried files (this tool)`;
  const problems = [];
  for (const f of c.files) {
    const w = join(WING[c.repo], f), s = join(SRC[c.repo], f);
    if (!existsSync(w)) { problems.push(`${show(w)} does not exist`); continue; }
    if (!existsSync(s)) { problems.push(`${show(s)} does not exist, so ${c.gate} cannot have read it`); continue; }
    if (!readFileSync(w).equals(readFileSync(s))) problems.push(`${show(w)} is not byte for byte ${show(s)}: ${c.gate} read the source copy, so its verdict does not cover the wing's; sync the wing's file`);
  }
  if (problems.length) {
    fail(`${label}: ${problems.length} problem(s)`);
    for (const p of problems) console.error('     ' + p);
    return 'failed';
  }
  ok(`${label}: ${c.files.join(' and ')} are byte for byte the source's, so ${c.gate}'s verdict on them covers the wing`);
  return 'ok';
}

const tally = { ok: 0, failed: 0, skipped: 0 };
const passed = [];
let ownOk = 0;
for (const repo of REPOS) {
  const gates = GATES.filter(g => g.repo === repo);
  const carried = CARRIED.filter(c => c.repo === repo);
  const wingHere = existsSync(SITE[repo]) && statSync(SITE[repo]).isDirectory();
  /* the parse proof needs the wing alone, so it runs before any source is looked for */
  if (wingHere) { const v = parseProof(repo); tally[v]++; if (v === 'ok') ownOk++; else parseFailed[repo] = true; }
  else { fail(`${repo} wing scripts parse (this tool): ${show(SITE[repo])} does not exist: the ${repo} wing has no scripts`); tally.failed++; parseFailed[repo] = true; }
  const src = SRC[repo];
  const envName = ENV_NAME[repo];
  const srcHere = existsSync(src) && statSync(src).isDirectory();
  if (!srcHere) {
    const labels = [...gates.map(g => `${repo} ${g.script} (${g.target})`), ...carried.map(() => `${repo} carried files (this tool)`)];
    if (OVERRIDDEN[repo]) {
      for (const l of labels) fail(`${l}: ${envName}=${process.env[envName]} is set, and ${show(src)} is not a directory`);
      tally.failed += labels.length;
    } else {
      for (const l of labels) console.log(`skipped: ${l}: ${repo} not checked out (looked in ${show(src)}; set ${envName}, or check it out beside the site)`);
      tally.skipped += labels.length;
    }
    continue;
  }
  for (const g of gates) {
    const label = `${repo} ${g.script} (${g.target})`;
    const script = join(src, g.script);
    if (!existsSync(script)) {
      fail(`${label}: ${show(script)} does not exist: ${show(src)} is not ${REPO_NAME[repo]}'s checkout, or one that has dropped the gate` +
        (OVERRIDDEN[repo] ? ` (${envName}=${process.env[envName]})` : ` (set ${envName} if it is checked out elsewhere)`));
      tally.failed++;
      continue;
    }
    if (g.target === 'wing' && !wingHere) { fail(`${label}: ${show(SITE[repo])} does not exist: nothing to gate`); tally.failed++; continue; }
    const verdict = runGate(g);
    tally[verdict]++;
    if (verdict === 'ok') passed.push(g);
  }
  for (const c of carried) { const v = carriedProof(c); tally[v]++; if (v === 'ok') ownOk++; }
}

const total = tally.ok + tally.failed + tally.skipped;
if (tally.failed) {
  fail(`check-wings: ${tally.failed} of ${total} failed (${tally.ok} ok, ${tally.skipped} skipped)`);
  process.exit(1);
}
const wingGates = passed.filter(g => g.target === 'wing');
const sourceOnly = passed.filter(g => g.target === 'source only');
const gaps = wingGates.filter(g => g.gap).length;
if (!passed.length) {
  note(`check-wings: ${tally.skipped} of ${total} skipped, no source checkout present (set LEDGER_SRC and CODEX_SRC, or check the repos out beside the site); only this tool's ${ownOk} own proof(s) ran`);
} else {
  ok(`check-wings: ${tally.ok} of ${total} ok: ${wingGates.length} source gates against the wings (each holds only the files it loads; ${gaps} read part of their input from the source tree, as their lines say), ` +
    `${sourceOnly.length} against the source only (${sourceOnly.map(g => g.script.split('/').pop()).join(', ')}), ${ownOk} proofs of this tool's own` +
    (acceptedSeen ? `; ${acceptedSeen} accepted divergence(s) noted above, not drift` : '') + (tally.skipped ? `; ${tally.skipped} skipped` : ''));
}
