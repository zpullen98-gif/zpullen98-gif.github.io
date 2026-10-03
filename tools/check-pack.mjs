// Usage: node tools/check-pack.mjs [--help | -h]   (proves every house pack under shared/packs/ through the shipped engine; no other flag)
/* A house pack is a file a person imports into any wing with no key, and
   the site ships the ones built in WorldTable's tools/house/ pipeline under
   shared/packs/ (mirrored byte for byte; check-mirror holds the mirror).
   This gate proves each one through the SHIPPED engine, shared/oot-house.js,
   in a sandbox with no IndexedDB: the file reads as a pack (readPack), the
   house it carries passes the engine's validator with no fatal problem (the
   verbatim price rule needs the menu text the builder had, so it is the
   builder's gate; every other fatal code runs here), every mark on it is a
   person's (a pack ships reviewed: nothing in it is hers and unkept), no
   string carries a dash, every id wears its list's prefix, every reference
   (a pairing's wine, a course's dish, a term's items) points at an item in
   the house, the pack imports onto a fresh device and the three wings read
   their rows back, and the file is named slug.vN.oothouse.json (an export
   from a device is named by the engine with the date instead; a shipped
   pack carries a version, because it is rebuilt by a pipeline).
   A pack that fails is named with the rule; nothing is written. A packs
   folder that is absent is a note, because the site shipped none for its
   first year. Exit 1 on any failure, 0 with a one-line summary otherwise. */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT, DASH, fail, ok, note } from './lib.mjs';

const USAGE = 'usage: node tools/check-pack.mjs [--help | -h]   (proves every house pack under shared/packs/; no other flag)';
const args = process.argv.slice(2);
if (args.some(a => !['--help', '-h'].includes(a))) { console.error(`check-pack: unknown argument ${args.join(' ')}\n${USAGE}`); process.exit(1); }
if (args.length) { console.log(USAGE); process.exit(0); }

const ENGINE = join(ROOT, 'shared', 'oot-house.js');
const PACKS = join(ROOT, 'shared', 'packs');
if (!existsSync(ENGINE)) { fail('shared/oot-house.js is missing; a pack has no engine to read it'); process.exit(1); }
if (!existsSync(PACKS)) { note('shared/packs/ is absent: no pack shipped, nothing to prove'); console.log('check-pack: 0 packs'); process.exit(0); }
const source = readFileSync(ENGINE, 'utf8');

function device() {
  const store = new Map();
  const localStorage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => { store.set(k, String(v)); }, removeItem: (k) => { store.delete(k); } };
  const win = { addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; }, localStorage, location: { pathname: '/codex/' } };
  win.window = win; win.console = console; win.setTimeout = setTimeout; win.clearTimeout = clearTimeout; win.Promise = Promise; win.OOT = {};
  vm.createContext(win);
  vm.runInContext(source, win, { filename: 'oot-house.js' });
  return win.OOT;
}
const PREFIX = { dishes: 'd-', wines: 'w-', cocktails: 'b-', tastings: 't-', lexicon: 'x-', scenarios: 's-', mixUps: 'm-', mustKnows: 'k-', askAtLineup: 'a-', disputes: 'u-' };
const flat = (o, out = []) => { if (Array.isArray(o)) o.forEach(x => flat(x, out)); else if (o && typeof o === 'object') Object.values(o).forEach(x => flat(x, out)); else out.push(o); return out; };
const isMark = (v) => v && typeof v === 'object' && !Array.isArray(v) && 'value' in v && 'by' in v && 'ts' in v;
function marksOf(o, path, out = []) {
  if (Array.isArray(o)) o.forEach((x, i) => marksOf(x, `${path}[${i}]`, out));
  else if (o && typeof o === 'object') { if (isMark(o)) out.push({ path, by: o.by }); else for (const k of Object.keys(o)) marksOf(o[k], `${path}.${k}`, out); }
  return out;
}

const files = readdirSync(PACKS).filter(f => f.endsWith('.oothouse.json')).sort();
let proved = 0, failed = 0;
const check = (cond, what) => { if (cond) { ok(what); proved++; } else { fail(what); failed++; } return !!cond; };
for (const name of files) {
  const rel = `shared/packs/${name}`;
  const text = readFileSync(join(PACKS, name), 'utf8');
  const lib = device().houseLib;
  check(!DASH.test(text), `${rel}: carries no dash in any spelling`);
  DASH.lastIndex = 0;
  const read = lib.readPack(text);
  if (!check(read && read.ok === true, `${rel}: reads as a pack${read && read.ok ? '' : ' (' + (read && read.said) + ')'}`)) continue;
  const house = read.house;
  const pack = JSON.parse(text);
  check(pack.format === 'oot-house-pack' && pack.version === 1 && house.format === 'oot-house' && house.version === 1, `${rel}: format oot-house-pack v1 over an oot-house v1`);
  check(/^[a-z0-9]+(-[a-z0-9]+)*\.v\d+\.oothouse\.json$/.test(name), `${rel}: named slug.vN.oothouse.json, the shipped pack's rule (an export is named by the engine, house-<slug>-<date>)`);
  const v = lib.validateHouse(house, {});
  const FATAL = lib.FATAL_CODES || (lib.constants && lib.constants.FATAL_CODES) || [];
  const fatal = v.problems.filter(p => FATAL.includes(p.code));
  check(fatal.length === 0, `${rel}: no fatal problem from the validator${fatal.length ? ': ' + fatal.slice(0, 3).map(p => p.code + ' at ' + p.path).join('; ') : ''}`);
  const marks = marksOf(house, 'house');
  const hers = marks.filter(m => m.by !== 'person');
  check(marks.length > 0 && hers.length === 0, `${rel}: every one of ${marks.length} marks is a person's${hers.length ? ' (not ' + hers.slice(0, 3).map(m => m.path).join(', ') + ')' : ''}`);
  const ids = new Set();
  let badId = '';
  for (const [list, pre] of Object.entries(PREFIX)) for (const it of house[list] || []) { if (!it.id || !it.id.startsWith(pre) || ids.has(it.id)) badId = badId || `${list}:${it.id}`; ids.add(it.id); }
  check(!badId && house.id.startsWith('h-'), `${rel}: every id wears its list's prefix and is unique (${ids.size} ids)${badId ? ', not ' + badId : ''}`);
  const refs = [];
  for (const d of house.dishes || []) if (d.pairing && d.pairing.value) for (const k of ['wineId', 'secondId', 'zeroProofId']) if (d.pairing.value[k]) refs.push([`${d.id}.pairing.${k}`, d.pairing.value[k]]);
  for (const t of house.tastings || []) for (const c of t.courses || []) { for (const id of c.dishIds || []) refs.push([`${t.id}.course${c.n}`, id]); if (c.pourId) refs.push([`${t.id}.course${c.n}.pour`, c.pourId]); }
  for (const list of ['lexicon', 'scenarios']) for (const e of house[list] || []) for (const id of e.itemIds || []) refs.push([`${e.id}.itemIds`, id]);
  for (const m of house.mixUps || []) refs.push([`${m.id}.aId`, m.aId], [`${m.id}.bId`, m.bId]);
  for (const w of house.wines || []) if (w.firstPickIds && w.firstPickIds.value) for (const id of w.firstPickIds.value) refs.push([`${w.id}.firstPickIds`, id]);
  for (const c of house.cocktails || []) if (c.upsells && c.upsells.value) for (const id of c.upsells.value) refs.push([`${c.id}.upsells`, id]);
  const dangling = refs.filter(([, id]) => !ids.has(id));
  check(dangling.length === 0, `${rel}: every one of ${refs.length} references points at an item of the house${dangling.length ? ' (not ' + dangling.slice(0, 3).map(r => r.join(' = ')).join('; ') + ')' : ''}`);
  /* Allergen words may stand in a person's note, a guest's own line, a
     scenario's title (the guest's subject) and a lineup question, never in
     a line of hers; the validator's allergen-talk code holds the marks, and
     this reads every other string. */
  const titles = new Set((house.scenarios || []).map(s => s.title));
  const strings = flat(house).filter(s => typeof s === 'string' && !titles.has(s));
  check(strings.every(s => !/allerg|intoleran/i.test(s) || /confirm|kitchen|ticket|allergic/i.test(s)), `${rel}: no line speaks of allergens outside a note, a guest's line, a scenario's title or a lineup question that confirms with the kitchen`);
  const dev = device();
  const api = dev.house;
  const imported = await api.ready().then(() => api.importPack(text, { mode: 'new' }));
  const cur = api.current();
  check(imported && imported.ok === true && cur && cur.name === house.name, `${rel}: imports onto a fresh device and becomes current${imported && imported.ok ? '' : ' (' + (imported && imported.said) + ')'}`);
  const rows = cur ? { dish: api.rows('dish').length, cocktail: api.rows('cocktail').length, wine: api.rows('wine').length } : null;
  check(rows && rows.dish === house.dishes.length && rows.cocktail === house.cocktails.length && rows.wine === house.wines.length, `${rel}: the three wings read their rows back (${rows ? `${rows.dish} dishes, ${rows.cocktail} cocktails, ${rows.wine} wines` : 'no rows'})`);
  const counts = { dishes: house.dishes.length, wines: house.wines.length, cocktails: house.cocktails.length, tastings: house.tastings.length, terms: house.lexicon.length, scenarios: house.scenarios.length, mixUps: house.mixUps.length, mustKnows: house.mustKnows.length, lineup: (house.askAtLineup || []).length, disputes: (house.disputes || []).length, sources: house.sources.length };
  note(`${rel}: ${house.name}, menus read ${house.menusReadOn || 'on no recorded date'}, built by ${house.pack ? house.pack.builtBy : 'nobody named'}; ${Object.entries(counts).map(([k, n]) => `${n} ${k}`).join(', ')}; ${(text.length / 1024).toFixed(0)} KB`);
}
if (failed || process.exitCode === 1) { console.error(`check-pack: ${failed} failure(s) over ${files.length} pack(s), ${proved} step(s) proved; a pack is rebuilt by its pipeline, never patched here`); process.exitCode = 1; }
else console.log(`check-pack: ${files.length} pack(s) proved through the shipped engine, ${proved} steps; every mark a person's, every reference resolved, no dash`);
