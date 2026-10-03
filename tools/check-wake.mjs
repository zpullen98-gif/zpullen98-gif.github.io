// Usage: node tools/check-wake.mjs [--help | -h]   (proves the three-record wake over the shipped engine; no other flag)
/* The House is one record three wings read. The Table projects its dishes,
   the Ledger its cocktails and the Codex its wines, each through its own
   door, and the shared engine (shared/oot-house.js) is the one thing all
   three load. Each source repo proves its own side against the engine; this
   tool proves the round trip the site itself ships, over the SHIPPED file,
   with no wing code at all: one house minted, a dish, a cocktail and a wine
   put through the engine's doors, each wing's rows read back, a newer row
   settling the house on a sync, a tombstone taking a row off on the next
   wake and never without one, a pack built from the house and imported on
   a second device whose rows match. The engine runs in a sandbox with no
   IndexedDB, so it falls back to the Map storage it carries for exactly
   this case, and nothing on this machine is read or written. A failure
   names the step and the rule. Exit 1 on any failure, 0 with a one-line
   summary otherwise. */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { ROOT, DASH, fail, ok } from './lib.mjs';

const USAGE = 'usage: node tools/check-wake.mjs [--help | -h]   (proves the three-record wake over the shipped engine; no other flag)';
const args = process.argv.slice(2);
if (args.some(a => !['--help', '-h'].includes(a))) { console.error(`check-wake: unknown argument ${args.join(' ')}\n${USAGE}`); process.exit(1); }
if (args.length) { console.log(USAGE); process.exit(0); }

const ENGINE = join(ROOT, 'shared', 'oot-house.js');
if (!existsSync(ENGINE)) { fail('shared/oot-house.js is missing; the wake has no engine to run'); process.exit(1); }
const source = readFileSync(ENGINE, 'utf8');

let proved = 0;
function check(cond, what) { if (cond) { ok(what); proved++; } else fail(what); return !!cond; }

/* A device: one sandbox, one Map storage, the script loaded on a wing's path. */
function device(pathname) {
  const store = new Map();
  const localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => { store.set(k, String(v)); },
    removeItem: (k) => { store.delete(k); }
  };
  const win = { addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; }, localStorage, location: { pathname } };
  win.window = win;
  win.console = console; win.setTimeout = setTimeout; win.clearTimeout = clearTimeout; win.Promise = Promise;
  win.OOT = {};
  vm.createContext(win);
  vm.runInContext(source, win, { filename: 'oot-house.js' });
  return win.OOT;
}

const clean = (v) => typeof v !== 'string' || !DASH.test(v);
const flat = (o, out = []) => { if (Array.isArray(o)) o.forEach(x => flat(x, out)); else if (o && typeof o === 'object') Object.values(o).forEach(x => flat(x, out)); else out.push(o); return out; };

const a = device('/ledger/');
check(a.house && a.houseLib && a.house.volatile === true, 'the engine installs OOT.house and OOT.houseLib, and with no IndexedDB says so (volatile)');
const api = a.house;
await api.ready();
check(api.current() === null && api.list().length === 0, 'a fresh device has no house and nothing is written until a person acts');

const house = await api.mintHouse('The Wake Room');
check(house && house.name === 'The Wake Room' && api.currentId() === house.id && /^h-/.test(house.id), 'a house is minted (h- id) and becomes current');

const t0 = 1000;
const dish = { id: 'd-wake0001', ts: t0, name: 'Gumbo', section: 'Mains', description: 'Dark roux, andouille, okra.', ingredients: ['roux', 'andouille', 'okra'], price: '24' };
const cocktail = { id: 'b-wake0001', ts: t0, name: 'Wake Sour', spec: ['2 oz rye', '1 oz lemon'], method: 'shake', glass: '', garnish: '', note: '', family: 'Sour', spirit: 'Rye', price: '14' };
const wine = { id: 'w-wake0001', ts: t0, producer: 'Wake Estate', name: 'Blanc', vintage: '2022', region: 'Jura', grapes: 'Savagnin, Chardonnay', style: 'dry white', glass: '18', bottle: '72', note: '' };
const pd = await api.put('dish', dish), pc = await api.put('cocktail', cocktail), pw = await api.put('wine', wine);
check(pd && pd.row && pd.row.house === house.id, 'the Table puts a dish and the row comes back stamped with the house');
check(pc && pc.row && pc.row.house === house.id && pc.row.id === 'b-wake0001', 'the Ledger puts a cocktail under its own id, and the row comes back stamped with the house');
check(pw && pw.row && pw.row.house === house.id && pw.row.id === 'w-wake0001', 'the Codex puts a wine under its own id, and the row comes back stamped with the house');
const cur = api.current();
check(cur.dishes.length === 1 && cur.cocktails.length === 1 && cur.wines.length === 1, 'the one house holds the dish, the cocktail and the wine');
check(cur.wines[0].grapes.length === 2 && cur.wines[0].wine === 'Blanc' && cur.wines[0].name === 'Wake Estate Blanc 2022', 'the wine is split into grapes and named producer, wine and vintage on the house');

const rd = api.rows('dish'), rc = api.rows('cocktail'), rw = api.rows('wine');
check(rd.length === 1 && rd[0].name === 'Gumbo' && rd[0].ingredients.length === 3, 'the Table reads its dish back as a row');
check(rc.length === 1 && rc[0].name === 'Wake Sour' && rc[0].spec.length === 2 && !rc[0].draft, 'the Ledger reads its cocktail back as a row with its spec, not a draft');
check(rw.length === 1 && rw[0].grapes === 'Savagnin, Chardonnay' && rw[0].glass === '18', 'the Codex reads its wine back as a row, grapes one string and the glass a price');
check(flat([rd, rc, rw, cur]).every(clean), 'no row and no field of the house carries a dash');

/* a wake with a newer row: the house follows the wing */
const newer = { ...rc[0], price: '15', ts: t0 + 500 };
const s1 = await api.sync('cocktail', [newer]);
check(s1.ok && api.current().cocktails[0].price === '15', 'a sync with a newer row settles the house on the row');
/* a wake with an older row: the wing follows the house */
const older = { ...rc[0], price: '9', ts: t0 - 500 };
const s2 = await api.sync('cocktail', [older]);
check(s2.ok && s2.rows[0].price === '15' && api.current().cocktails[0].price === '15', 'a sync with an older row hands the row the house\'s value and moves the house not at all');
/* a wake with no row at all: nothing is removed without a tombstone */
const s3 = await api.sync('wine', []);
check(s3.ok && s3.rows.length === 1 && s3.rows[0].id === 'w-wake0001' && api.current().wines.length === 1, 'a wake with the row missing brings the row back; nothing is removed without a tombstone');
/* a removal through the wing's door writes the tombstone, and the next wake takes the row off */
check(await api.removeItem('cocktail', 'b-wake0001') === true, 'the Ledger removes its cocktail and the house writes a tombstone');
const s4 = await api.sync('cocktail', [newer]);
check(s4.ok && s4.rows.length === 0 && s4.changes.some(c => c.what === 'row-removed' && c.id === 'b-wake0001'), 'the next wake takes the removed row off the list and says so (row-removed)');
check(api.current().cocktails.length === 0 && api.current().removed && 'b-wake0001' in api.current().removed, 'the house holds the tombstone and no longer the cocktail');

/* a row with no house, on a device with a current house, is adopted */
const stray = { id: 'b-wake0002', ts: t0 + 1, name: 'Stray Fizz', spec: ['1 oz gin'], method: '', glass: '', garnish: '', note: '', family: 'Other', spirit: 'Gin', price: '' };
const s5 = await api.sync('cocktail', [stray]);
check(s5.ok && s5.rows.length === 1 && s5.rows[0].house === house.id && s5.changes.some(c => c.what === 'adopted' || c.what === 'row-added'), 'a row with no house is adopted into the current house on the wake');

/* the pack: built here, read and imported on a second device, the rows match */
const built = api.buildPack('ledger');
check(built && built.pack && built.pack.format === 'oot-house-pack' && /^house-.*\.oothouse\.json$/.test(built.filename), 'a pack is built from the house with the format and the file name the rule gives');
check(clean(built.text), 'the pack text carries no dash');
const b = device('/codex/');
const api2 = b.house;
await api2.ready();
const read = api2.readPack(built.text);
check(read && read.ok === true && read.house && read.house.name === 'The Wake Room', `a second device reads the pack${read && read.ok ? '' : ' (' + (read && read.said) + ')'}`);
const imp = await api2.importPack(built.text, { mode: 'new' });
check(imp && imp.ok === true && api2.currentId() !== null, `a second device with no house imports the pack (as text, mode new) and it becomes current${imp && imp.ok ? '' : ' (' + (imp && imp.said) + ')'}`);
const h2 = api2.current();
check(h2 && h2.name === 'The Wake Room' && h2.dishes.length === 1 && h2.wines.length === 1 && h2.cocktails.length === 1, 'the imported house holds the dish, the wine and the adopted cocktail, and not the removed one');
const rw2 = api2.rows('wine'), rc2 = api2.rows('cocktail'), rd2 = api2.rows('dish');
check(rw2.length === 1 && rw2[0].id === 'w-wake0001' && rw2[0].grapes === 'Savagnin, Chardonnay', 'the Codex on the second device reads the same wine row under the same id');
check(rc2.length === 1 && rc2[0].name === 'Stray Fizz' && rd2.length === 1 && rd2[0].name === 'Gumbo', 'the Ledger and the Table on the second device read the same rows');
const again = await api2.importPack(built.pack, { mode: 'new' });
check(again && again.ok === true && api2.list().length === 2 && api2.list()[0].id !== api2.list()[1].id, 'importing the same pack again adds a new house under a new id, and overwrites nothing');

if (process.exitCode === 1) {
  console.error(`check-wake: ${proved} step(s) proved, see the FAIL line(s) above; the engine the site ships does not keep the three wings in step`);
} else {
  console.log(`check-wake: ${proved} steps proved over shared/oot-house.js on two sandboxed devices; the three-record wake and the pack round trip hold`);
}
