// Usage: node tools/check-suite-service.mjs (prove one appearance controller in every room)
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SOURCES } from './lib.mjs';

const copies = [
  ['hub', 'service/oot-service.js', 'index.html', 'sw.js'],
  ['table', 'table/service/oot-service.js', 'table/index.html', 'table/sw.js'],
  ...['ledger', 'codex', 'light', 'almanac'].map(id => [id, `${id}/js/oot-service.js`, `${id}/index.html`, `${id}/sw.js`])
];
let failed = 0;
const canonical = readFileSync(join(ROOT, 'service/oot-service.js'));
for (const [id, file, page, worker] of copies) {
  const errors = [];
  const source = join(ROOT, file);
  if (!existsSync(source) || !readFileSync(source).equals(canonical)) errors.push('controller differs from the canonical hub copy');
  const html = readFileSync(join(ROOT, page), 'utf8');
  const tags = html.match(/<script\b[^>]*src=["'][^"']*oot-service\.js[^"']*["'][^>]*>/g) || [];
  if (tags.length !== 1 || !tags[0].includes(`data-wing="${id}"`)) errors.push('exactly one correctly named controller must load');
  if (tags[0] && html.indexOf(tags[0]) > html.indexOf('</head>')) errors.push('controller must run before the first page paint');
  if (!readFileSync(join(ROOT, worker), 'utf8').includes('oot-service.js')) errors.push('offline worker does not carry the controller');
  if (errors.length) { failed++; console.error(`FAIL ${id}: ${errors.join('; ')}`); }
  else console.log(`ok   ${id}: identical controller, correct room, early load and offline inclusion`);
}
const source = join(SOURCES.worldtable, 'static/service/oot-service.js');
if (existsSync(source)) {
  if (!readFileSync(source).equals(canonical)) { failed++; console.error('FAIL service differs from WorldTable/static/service/oot-service.js'); }
  else console.log('ok   service controller matches its WorldTable source');
}
if (failed) process.exitCode = 1;
else console.log('check-suite-service: all six rooms share one appearance and navigation controller');
