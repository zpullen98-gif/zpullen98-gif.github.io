// Usage: node tools/check-all.mjs [--help | -h]   (runs every gate under tools/ in order, stops at the first failure, prints a summary table; exit 1 on any failure)
/* The gate before every push. Each tool under tools/ proves one thing about
   the tree (the shared mirror, the dash count, the Table's footprint, the
   stamps and the workers, the wings against their source repos' own gates)
   and each one runs alone, so until now nothing ran them together, and a
   publish could pass the four that somebody remembered and skip the fifth.
   This tool runs them all, in one order, each as a child process with its
   output shown as it prints, and stops at the first failure: a later gate
   rests on what an earlier one proves (check-stamps reads a mirror that
   check-mirror holds, check-wings loads scripts that inject-shared and
   check-stamps have already judged), so a failure further down would be
   noise until the first is fixed. It then prints a summary table, one line
   per gate with its verdict and its time, and exits 1 when any gate failed
   or could not run. The gates are one constant at the top, so a new gate
   (check-pack landed with the first pack) is one line here; a gate the list
   names and the folder lacks is a failure that names the file, never a
   stack trace. The order is cheapest and most upstream first: the mirror
   (what WorldTable published), the dash gate (what the tree carries), the
   Table's copy, the stamps and the workers, and last the wings, which run
   the source repos' gates and take the longest. The environment is passed
   through untouched, so WORLDTABLE_SRC, LEDGER_SRC and CODEX_SRC reach
   every gate as they would from the shell. */
import { existsSync, writeSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT } from './lib.mjs';

/* The gates, in the order they run: a file under tools/ and the arguments
   it takes. check-pack is the last gate. */
const GATES = [
  { file: 'check-mirror.mjs', args: [] },
  { file: 'check-publish.mjs', args: [] },
  { file: 'inject-shared.mjs', args: ['--check'] },
  { file: 'check-stamps.mjs', args: [] },
  { file: 'check-wings.mjs', args: [] },
  { file: 'check-wake.mjs', args: [] },
  { file: 'check-pack.mjs', args: [] }
];

/* A gate as the table names it (check-mirror, inject-shared --check) and as
   a person would type it. */
function label(g) { return [g.file.replace(/\.mjs$/, ''), ...g.args].join(' '); }
function command(g) { return ['node', 'tools/' + g.file, ...g.args].join(' '); }

const USAGE = `usage: node tools/check-all.mjs [--help | -h]   (runs ${GATES.map(label).join(', ')} in that order, each as a child process, stops at the first failure and prints a summary table; exit 1 on any failure)`;
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) { console.log(USAGE); process.exit(0); }
if (args.length) { console.error(`check-all: unknown argument ${args.join(' ')}\n${USAGE}`); process.exit(1); }

/* A line written straight to the descriptor, so it lands before the next
   child's output whether stdout is a terminal or a pipe. 1 is stdout, 2 is
   stderr. */
function say(fd, text) { writeSync(fd, text + '\n'); }
function seconds(ms) { return (ms / 1000).toFixed(1) + 's'; }

const results = [];
let stopped = null;
for (let i = 0; i < GATES.length; i++) {
  const g = GATES[i];
  const abs = join(ROOT, 'tools', g.file);
  say(1, `${i ? '\n' : ''}===== ${label(g)} (${i + 1} of ${GATES.length}): ${command(g)}`);
  if (!existsSync(abs)) {
    say(2, `FAIL check-all: tools/${g.file} is listed in GATES but is not in the folder; every gate the list names must exist, so the gates after it are not run`);
    results.push({ verdict: 'FAIL', why: 'missing', ms: 0 });
    stopped = g;
    break;
  }
  const t0 = performance.now();
  const r = spawnSync(process.execPath, [abs, ...g.args], { cwd: ROOT, stdio: 'inherit', env: process.env });
  const ms = performance.now() - t0;
  if (r.error) {
    say(2, `FAIL check-all: ${label(g)} could not be run (${r.error.message}); the gates after it are not run`);
    results.push({ verdict: 'FAIL', why: 'could not run', ms });
    stopped = g;
    break;
  }
  if (r.status !== 0) {
    const why = r.status === null ? `killed by ${r.signal}` : `exit ${r.status}`;
    say(2, `FAIL check-all: ${label(g)} failed (${why}), see its lines above; the gates after it are not run until it is fixed`);
    results.push({ verdict: 'FAIL', why, ms });
    stopped = g;
    break;
  }
  results.push({ verdict: 'ok', why: '', ms });
}

/* The table: one line per gate in GATES order, the ones after a failure
   marked not run. */
const width = Math.max('gate'.length, ...GATES.map(g => label(g).length));
say(1, '\n===== check-all: summary');
say(1, `  ${'gate'.padEnd(width)}  ${'result'.padEnd(7)}  ${'time'.padStart(6)}`);
for (let i = 0; i < GATES.length; i++) {
  const r = results[i];
  const verdict = r ? r.verdict : 'not run';
  const time = r ? seconds(r.ms) : '';
  const row = `  ${label(GATES[i]).padEnd(width)}  ${verdict.padEnd(7)}  ${time.padStart(6)}${r && r.why ? '  ' + r.why : ''}`;
  say(1, row.replace(/\s+$/, ''));
}

const passed = results.filter(r => r.verdict === 'ok').length;
const notRun = GATES.length - results.length;
const total = results.reduce((s, r) => s + r.ms, 0);
if (stopped) {
  say(2, `FAIL check-all: ${label(stopped)} failed; ${passed} of ${GATES.length} gates passed, ${notRun} not run (${seconds(total)}); fix it and run again, nothing is pushed until every gate is green`);
  process.exit(1);
}
say(1, `check-all: ${passed} of ${GATES.length} gates green in ${seconds(total)} (${GATES.map(label).join(', ')})`);
