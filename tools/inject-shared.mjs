// Usage: node tools/inject-shared.mjs [--check | --from <buildDir> | --compare <buildDir> | --help]   (SITE_ROOT=<dir> points it at another checkout)
/* The Table wing is a copy of WorldTable's /table build with nine script
   tags added to every page, and nothing else. The shared stack (config,
   profiles, home, auth, gate, locks, pass, log, bar) lives at the origin
   root, outside the build, so the build cannot name it and the copier has
   to. This tool is that copier and the proof of its footprint. --from
   replaces table/ with a build directory (delete, then copy, never copy
   over, or hashed chunks accumulate for ever) and writes the nine tags, one
   per line, the first led by a tab on a line of its own, immediately before
   the final </body> of every page, stamped with the hub's SHARED_V. Nothing
   is deleted until the build has passed every rule the check applies to a
   finished copy: it holds regular files and directories only (a symlink,
   dangling or not, would be copied as a symlink and could point anywhere),
   BUILD-SOURCE.txt names a 40-hex commit, sw-shared.js warms the same nine
   scripts, its copy of the Maitre d' client is byte for byte the shared
   one, its worker precaches shell.html and is registered at /table/ and no
   wider (a worker at origin scope answers every navigation on the site
   from its own shell), .nojekyll is present, and every page closes with a
   lowercase </body> and carries no shared tag yet (a page that already
   does is a copy that was injected before, not a build; it is refused,
   never stamped twice). A build that breaks a rule is refused by name and
   table/ is not touched, so the copier either finishes or leaves the tree
   as it found it. --check, the default, proves the committed tree by the
   same rules plus the footprint: every page wears exactly the nine tags in
   SHARED_SCRIPTS order with the current stamp and nowhere else, and a page
   that fails says which part of that it broke. --compare lists what
   differs between table/ and a build as information: chunk hashes and node
   numbering differ by platform, so byte equality is never the claim, and
   only a different page set fails. Replaces the monorepo's
   inject-oot-bar.mjs for this checkout. */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, readlinkSync, rmSync, mkdirSync, cpSync, realpathSync } from 'node:fs';
import { join, relative, resolve, sep, isAbsolute } from 'node:path';
import * as lib from './lib.mjs';

const USAGE = 'usage: node tools/inject-shared.mjs [--check | --from <buildDir> | --compare <buildDir> | --help]';
const ROOT = process.env.SITE_ROOT ? resolve(process.env.SITE_ROOT) : lib.ROOT;
const TABLE = join(ROOT, 'table');
const CAP = 20;

/* What a build must hold before the copier reads any further. */
const BUILD_MUST_HOLD = ['index.html', 'shell.html', 'sw.js', 'sw-shared.js', 'BUILD-SOURCE.txt', '.nojekyll', join('shared', 'oot-maitre.js')];

/* The scope the generated worker is registered with, as the start chunk
   spells it. Every build must say /table/ here and nothing else. */
const SCOPE_RE = /sw\.js`,\{scope:`([^`]*)`/g;
const WANTED_SCOPE = '/table/';

/* A script tag that loads anything from the shared layer. */
const SHARED_TAG_RE = /<script\b[^>]*\bsrc=["'][^"']*\/shared\/oot-[^"']*["'][^>]*>/g;

/* A body-closing tag however it is spelt; the footprint wants the
   lowercase one and is matched as bytes. */
const BODY_CLOSE_RE = /<\/body\s*>/gi;

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(USAGE);
  console.log('  --check             prove every page under table/ carries the nine shared tags and the copy is whole (the default)');
  console.log('  --from <buildDir>   prove the build by the same rules, then replace table/ with it, inject the nine tags and run the check');
  console.log('  --compare <buildDir> list what differs between table/ and that build; fails only on a different page set');
  console.log('  SITE_ROOT=<dir>     run against another checkout of the site (its index.html supplies SHARED_V)');
  process.exit(0);
}
let mode = 'check';
let target = null;
if (args.length === 0 || (args.length === 1 && args[0] === '--check')) mode = 'check';
else if (args.length === 2 && (args[0] === '--from' || args[0] === '--compare')) { mode = args[0].slice(2); target = resolve(args[1]); }
else { console.error(`inject-shared: unexpected arguments "${args.join(' ')}"\n${USAGE}`); process.exit(1); }

/* A path as a person would type it: relative to the site root when it sits
   inside it, absolute otherwise, always with forward slashes. */
function show(abs) {
  const rel = relative(ROOT, abs);
  if (rel === '') return '.';
  return rel.startsWith('..') || isAbsolute(rel) ? abs : rel.split(sep).join('/');
}

/* A file inside a directory, named for a message. */
function named(dir, rel) { return show(join(dir, rel)); }

/* A short quoted excerpt with its line breaks and tabs visible. */
function quote(s) { return JSON.stringify(s.length > 60 ? s.slice(0, 57) + '...' : s); }

function plural(n, one, many) { return `${n.toLocaleString('en-GB')} ${n === 1 ? one : many}`; }

/* What a directory entry is when it is neither a regular file nor a
   directory. */
function kindOf(ent, abs) {
  if (ent.isSymbolicLink()) {
    let to = '?';
    try { to = readlinkSync(abs); } catch { /* unreadable link: its target stays unknown */ }
    return `${existsSync(abs) ? 'a symlink' : 'a dangling symlink'} to ${to}`;
  }
  if (ent.isFIFO()) return 'a fifo';
  if (ent.isSocket()) return 'a socket';
  if (ent.isBlockDevice() || ent.isCharacterDevice()) return 'a device';
  return 'not a regular file';
}

/* Every entry under a directory, as forward-slash paths relative to it:
   the regular files, and the strays (anything that is neither a regular
   file nor a directory, each with its kind). Read with lstat semantics, so
   a symlink is never followed, never read and never walked into, and a
   dangling one is a named stray rather than a crash. */
function entriesUnder(dir) {
  const acc = { files: [], strays: [] };
  const into = d => {
    for (const ent of readdirSync(d, { withFileTypes: true })) {
      const abs = join(d, ent.name);
      if (ent.isDirectory()) { into(abs); continue; }
      const rel = relative(dir, abs).split(sep).join('/');
      if (ent.isFile()) acc.files.push(rel);
      else acc.strays.push({ rel, kind: kindOf(ent, abs) });
    }
  };
  into(dir);
  acc.files.sort();
  acc.strays.sort((a, b) => (a.rel < b.rel ? -1 : 1));
  return acc;
}

function filesUnder(dir) { return entriesUnder(dir).files; }
function pagesOf(files) { return files.filter(p => p.endsWith('.html')); }

function sharedV() {
  const idx = join(ROOT, 'index.html');
  return existsSync(idx) ? lib.stampOf(readFileSync(idx, 'utf8')) : null;
}

/* One shared tag as the injector writes it: the opening tag SHARED_TAG_RE
   matches, closed at once. */
function open(name, v) { return `<script src="/shared/${name}?v=${v}">`; }
function tag(name, v) { return open(name, v) + '</script>'; }

/* The nine lines as they sit in a page, and the whole footprint: a tab,
   the lines, a line break, the closing body tag. The tab must open its
   line, which is checked where the footprint is matched. */
function lines(v) { return lib.SHARED_SCRIPTS.map(name => tag(name, v)).join('\n'); }
function footprint(v) { return '\t' + lines(v) + '\n</body>'; }

/* The shared script a tag loads, by file name. */
function scriptName(t) { return (t.match(/\/shared\/(oot-[^"'?]+)/) || [])[1] || '?'; }

/* The last body-closing tag in a page, however it is spelt, or null. */
function bodyClose(text) {
  let last = null;
  for (const m of text.matchAll(BODY_CLOSE_RE)) last = m;
  return last ? { at: last.index, text: last[0] } : null;
}

/* BUILD-SOURCE.txt as postbuild.mjs writes it: the commit line may carry
   "(uncommitted changes present)" after the hash. */
function buildSource(dir) {
  const p = join(dir, 'BUILD-SOURCE.txt');
  if (!existsSync(p)) return null;
  const text = readFileSync(p, 'utf8');
  const m = text.match(/^commit ([0-9a-f]{40})\b(.*)$/m);
  return {
    commit: m ? m[1] : null,
    dirty: m ? /uncommitted/.test(m[2]) : false,
    branch: (text.match(/^branch (.+)$/m) || [])[1] || null
  };
}

/* The OOT_SHARED list inside sw-shared.js, or null when there is none. */
function ootShared(text) {
  const m = text.match(/OOT_SHARED\s*=\s*\[([\s\S]*?)\];/);
  if (!m) return null;
  return [...m[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map(x => x[1] || x[2]);
}

/* Every worker scope the hashed chunks register, read from the build or
   from table/. */
function scopesIn(dir) {
  const found = new Set();
  const immutable = join(dir, '_app', 'immutable');
  if (!existsSync(immutable)) return found;
  for (const rel of filesUnder(immutable)) {
    if (!rel.endsWith('.js')) continue;
    for (const m of readFileSync(join(immutable, rel), 'utf8').matchAll(SCOPE_RE)) found.add(m[1]);
  }
  return found;
}

/* The rules a finished copy must pass, each over a directory: the check
   applies them to table/, the copier applies them to the build before it
   deletes anything. fault() says why a directory fails, naming the file,
   or returns null; ok() is the line the check prints when it passes. */
const RULES = [
  {
    fault(dir) {
      const s = buildSource(dir);
      if (!s) return `${named(dir, 'BUILD-SOURCE.txt')} is missing; a copy must say which WorldTable commit it was built from`;
      if (!s.commit) return `${named(dir, 'BUILD-SOURCE.txt')} names no 40-hex commit on its "commit" line`;
      return null;
    },
    ok(dir) {
      const s = buildSource(dir);
      return `${named(dir, 'BUILD-SOURCE.txt')}: commit ${s.commit}${s.branch ? ' on ' + s.branch : ''}${s.dirty ? ' (uncommitted changes present; the commit alone does not reproduce it)' : ''}`;
    }
  },
  {
    fault(dir) {
      const p = join(dir, 'sw-shared.js');
      if (!existsSync(p)) return `${named(dir, 'sw-shared.js')} is missing`;
      const got = ootShared(readFileSync(p, 'utf8'));
      if (!got) return `${named(dir, 'sw-shared.js')}: no OOT_SHARED array found`;
      if (got.join('\n') !== lib.SHARED_SCRIPTS.join('\n')) return `${named(dir, 'sw-shared.js')}: OOT_SHARED is [${got.join(', ')}], SHARED_SCRIPTS is [${lib.SHARED_SCRIPTS.join(', ')}]; one list, in one order, on both sides`;
      return null;
    },
    ok: dir => `${named(dir, 'sw-shared.js')}: OOT_SHARED names the nine shared scripts in SHARED_SCRIPTS order`
  },
  {
    fault(dir) {
      const copy = join(dir, 'shared', 'oot-maitre.js'), mirror = join(ROOT, 'shared', 'oot-maitre.js');
      const missing = [copy, mirror].filter(p => !existsSync(p));
      if (missing.length) return missing.map(p => `${show(p)} is missing`).join('; ');
      const a = readFileSync(copy), b = readFileSync(mirror);
      if (a.equals(b)) return null;
      let i = 0;
      while (i < a.length && i < b.length && a[i] === b[i]) i++;
      return `${show(copy)} (${a.length} bytes) differs from ${show(mirror)} (${b.length} bytes) at byte ${i}; the canonical file is WorldTable/static/shared/oot-maitre.js, copy it over, never edit a copy`;
    },
    ok: dir => `${named(dir, 'shared/oot-maitre.js')} = ${named(ROOT, 'shared/oot-maitre.js')} (${statSync(join(dir, 'shared', 'oot-maitre.js')).size.toLocaleString('en-GB')} bytes)`
  },
  {
    fault(dir) {
      const p = join(dir, 'sw.js');
      if (!existsSync(p)) return `${named(dir, 'sw.js')} is missing`;
      if (!readFileSync(p, 'utf8').includes('shell.html')) return `${named(dir, 'sw.js')} does not mention shell.html, so the offline shell is not precached`;
      return null;
    },
    ok: dir => `${named(dir, 'sw.js')} precaches shell.html`
  },
  {
    fault(dir) {
      const scopes = [...scopesIn(dir)];
      const where = named(dir, '_app/immutable');
      if (scopes.length === 0) return `${where}: no worker registration with a readable scope; a build whose scope cannot be read is not trusted, because a worker at origin scope would answer every navigation on the site`;
      if (scopes.length !== 1 || scopes[0] !== WANTED_SCOPE) return `${where}: the worker is registered at scope ${scopes.map(s => '`' + s + '`').join(', ')}, not ${WANTED_SCOPE}; was the build made with BASE_PATH=/table?`;
      return null;
    },
    ok: dir => `${named(dir, '_app/immutable')} registers the worker at scope ${WANTED_SCOPE}`
  },
  {
    fault: dir => (existsSync(join(dir, '.nojekyll')) ? null : `${named(dir, '.nojekyll')} is missing; without it Pages drops everything under _app/`),
    ok: dir => `${named(dir, '.nojekyll')} present`
  }
];

/* What is missing from, doubled in or foreign to a page's set of shared
   script names, against SHARED_SCRIPTS; '' when the set is right. */
function setFault(names) {
  const want = lib.SHARED_SCRIPTS;
  const parts = [];
  const missing = want.filter(n => !names.includes(n));
  const doubled = want.filter(n => names.filter(x => x === n).length > 1);
  const foreign = [...new Set(names.filter(n => !want.includes(n)))];
  if (missing.length) parts.push(`${missing.join(', ')} missing`);
  if (doubled.length) parts.push(`${doubled.join(', ')} more than once`);
  if (foreign.length) parts.push(`${foreign.join(', ')} not in SHARED_SCRIPTS`);
  return parts.join('; ');
}

/* Why a page fails the footprint rule, or null when it passes. The fast
   path is the whole footprint as bytes, its tab opening a line; the slow
   path names the first thing that is wrong. */
function pageFault(text, v) {
  const close = bodyClose(text);
  if (!close) return 'has no </body>';
  if (close.text !== '</body>') return `closes with ${close.text}, not </body>; the footprint is matched as bytes`;
  const at = close.at;
  const tags = text.match(SHARED_TAG_RE) || [];
  const names = tags.map(scriptName);
  const want = lib.SHARED_SCRIPTS;
  const head = text.slice(0, at + '</body>'.length);
  const fp = footprint(v);
  if (head.endsWith(fp) && (head.length === fp.length || head[head.length - fp.length - 1] === '\n')) {
    if (tags.length === want.length) return null;
    const extra = names.slice();
    for (const n of want) extra.splice(extra.indexOf(n), 1);
    return `carries the footprint and ${extra.length} more shared script tag(s) elsewhere: ${extra.join(', ')}`;
  }
  if (tags.length === 0) return 'carries no shared script tag; it was never injected';
  const stamp = lib.stampOf(text);
  if (stamp !== null && stamp !== v) return `stamped ?v=${stamp}, SHARED_V is ${v}`;
  const set = setFault(names);
  if (tags.length !== want.length) return `carries ${tags.length} shared script tag(s), not ${want.length}${set ? ': ' + set : ''}`;
  if (set) return `carries ${want.length} shared script tags but ${set}`;
  for (let i = 0; i < want.length; i++) {
    if (names[i] !== want[i]) return `tag ${i + 1} loads ${names[i]} where SHARED_SCRIPTS has ${want[i]}; the nine sit in SHARED_SCRIPTS order`;
  }
  for (let i = 0; i < want.length; i++) {
    if (tags[i] !== open(want[i], v)) return `tag ${i + 1} is ${tags[i]}, not ${open(want[i], v)}: a bare double-quoted src and nothing else`;
  }
  const starts = [];
  let pos = 0;
  for (const t of tags) { pos = text.indexOf(t, pos); starts.push(pos); pos += t.length; }
  for (let i = 0; i < want.length; i++) {
    if (!text.startsWith('</script>', starts[i] + tags[i].length)) return `tag ${i + 1} (${want[i]}) is not closed by </script> at once`;
  }
  const ends = starts.map((s, i) => s + tag(want[i], v).length);
  for (let i = 1; i < tags.length; i++) {
    const gap = text.slice(ends[i - 1], starts[i]);
    if (gap === '\n') continue;
    if (!gap.includes('\n')) return `tags ${i} and ${i + 1} (${want[i - 1]}, ${want[i]}) share a line; one tag per line`;
    return `${quote(gap)} sits between tags ${i} and ${i + 1} (${want[i - 1]}, ${want[i]}); the nine sit on consecutive lines`;
  }
  const after = text.slice(ends[ends.length - 1], at);
  if (after === '') return 'the last tag and the final </body> share a line; </body> closes a line of its own';
  if (after !== '\n') return `${quote(after)} sits between the last tag and the final </body>; the nine tags sit in order but not immediately before it`;
  const lead = text.slice(text.lastIndexOf('\n', starts[0] - 1) + 1, starts[0]);
  if (lead !== '\t') return `the first tag is led by ${lead === '' ? 'nothing' : quote(lead)}, not by one tab opening its line`;
  return 'is not the footprint, byte for byte';
}

/* Why a build page cannot take the footprint, or null. */
function uninjectable(text) {
  const close = bodyClose(text);
  if (!close) return 'has no </body>';
  if (close.text !== '</body>') return `closes with ${close.text}, not </body>; the footprint is matched as bytes`;
  const tags = text.match(SHARED_TAG_RE) || [];
  if (tags.length === 0) return null;
  const stamp = lib.stampOf(text);
  return `already carries ${plural(tags.length, 'shared script tag', 'shared script tags')} (${[...new Set(tags.map(scriptName))].join(', ')}${stamp !== null ? ', ?v=' + stamp : ''}); a build never names the shared layer, so this is a copy that was injected before, and it is not stamped twice`;
}

/* Insert the footprint before the final </body> of a page that passed
   uninjectable(): take over the horizontal whitespace that indents it, and
   open a fresh line when </body> follows content on its own line, so the
   first tag is always led by one tab at the start of a line. */
function inject(text, v) {
  const at = text.lastIndexOf('</body>');
  let start = at;
  while (start > 0 && (text[start - 1] === '\t' || text[start - 1] === ' ')) start--;
  const lead = start > 0 && text[start - 1] !== '\n' ? '\n' : '';
  return text.slice(0, start) + lead + footprint(v) + text.slice(at + '</body>'.length);
}

function list(items, each, print = s => console.error('     ' + s)) {
  for (const it of items.slice(0, CAP)) print(each(it));
  if (items.length > CAP) print(`and ${items.length - CAP} more`);
}

function failStrays(dir, strays) {
  lib.fail(`${show(dir)}: ${plural(strays.length, 'entry is', 'entries are')} neither a regular file nor a directory; a build holds none, and a symlink in a copy may point anywhere or nowhere:`);
  list(strays, s => `${named(dir, s.rel)}: ${s.kind}`);
}

/* The check: every rule over table/, one FAIL per rule, each naming the
   files. Returns the number of rules that failed. */
function check() {
  let failed = 0;
  const v = sharedV();
  if (v === null) {
    lib.fail(`${named(ROOT, 'index.html')}: missing or wearing no oot-config.js?v= stamp, so SHARED_V is unknown and nothing can be checked`);
    return 1;
  }
  if (!existsSync(TABLE)) { lib.fail('table/ is missing; nothing to check'); return 1; }
  const entries = entriesUnder(TABLE);

  /* Rule 1: regular files and directories only, so every other rule can
     read what it names. */
  if (entries.strays.length) { failStrays(TABLE, entries.strays); failed++; }
  else lib.ok(`table/: ${plural(entries.files.length, 'file', 'files')}, every entry a regular file or a directory`);

  /* Rule 2: the footprint, on every page, and nowhere else. */
  const pages = pagesOf(entries.files);
  if (pages.length === 0) {
    lib.fail('footprint: table/ holds no html page');
    failed++;
  } else {
    const faults = [];
    for (const rel of pages) {
      const why = pageFault(readFileSync(join(TABLE, rel), 'utf8'), v);
      if (why) faults.push({ rel, why });
    }
    if (faults.length) {
      failed++;
      lib.fail(`footprint: ${faults.length} of ${pages.length} page(s) under table/ do not carry the nine shared tags (?v=${v}) immediately before </body> and nowhere else:`);
      list(faults, f => `${named(TABLE, f.rel)}: ${f.why}`);
    } else {
      lib.ok(`footprint: ${pages.length.toLocaleString('en-GB')} pages carry the nine shared tags (?v=${v}) in order, immediately before </body> and nowhere else`);
    }
  }

  /* Rules 3 to 8: the copy says where it came from, the worker warms the
     same nine scripts the pages load, the Maitre d' client is the shared
     one, the worker precaches the shell, it is registered under /table/
     and nowhere wider, and Pages will not pass _app/ through Jekyll. */
  for (const rule of RULES) {
    const why = rule.fault(TABLE);
    if (why) { lib.fail(why); failed++; } else lib.ok(rule.ok(TABLE));
  }
  return failed;
}

function requireDir(dir, what) {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) { lib.fail(`${what} ${dir} is not a directory`); process.exit(1); }
}

/* Every rule the check applies to a finished copy, applied to the build
   before table/ is deleted, plus the one the copier itself needs: every
   page can take the footprint. Prints each fault; returns their number. */
function preflight(build) {
  let failed = 0;
  const entries = entriesUnder(build);
  if (entries.strays.length) { failStrays(build, entries.strays); failed++; }
  for (const rule of RULES) {
    const why = rule.fault(build);
    if (why) { lib.fail(why); failed++; }
  }
  const pages = pagesOf(entries.files);
  if (pages.length === 0) { lib.fail(`${show(build)} holds no html page; there is nothing to inject`); failed++; }
  const faults = [];
  for (const rel of pages) {
    const why = uninjectable(readFileSync(join(build, rel), 'utf8'));
    if (why) faults.push({ rel, why });
  }
  if (faults.length) {
    failed++;
    lib.fail(`${faults.length} of ${pages.length} page(s) in ${show(build)} cannot take the footprint:`);
    list(faults, f => `${named(build, f.rel)}: ${f.why}`);
  }
  return failed;
}

function from(build) {
  requireDir(build, 'build');
  const missing = BUILD_MUST_HOLD.filter(p => !existsSync(join(build, p)));
  if (missing.length) {
    lib.fail(`${show(build)} is not a finished /table build: it lacks ${missing.join(', ')}; table/ was not touched`);
    process.exit(1);
  }
  const realOf = p => (existsSync(p) ? realpathSync(p) : resolve(p));
  const rb = realOf(build), rt = realOf(TABLE);
  if (rb === rt || rb.startsWith(rt + sep) || rt.startsWith(rb + sep)) {
    const how = rb === rt ? 'is table/ itself' : rb.startsWith(rt + sep) ? 'sits inside table/' : 'holds table/';
    lib.fail(`${show(build)} ${how}; the copier deletes table/ first, so the build must live elsewhere`);
    process.exit(1);
  }
  const v = sharedV();
  if (v === null) { lib.fail(`${named(ROOT, 'index.html')}: missing or wearing no oot-config.js?v= stamp, so there is no SHARED_V to inject; table/ was not touched`); process.exit(1); }

  const refused = preflight(build);
  if (refused) {
    console.error(`inject-shared --from: ${show(build)} breaks ${plural(refused, 'rule', 'rules')} and is refused before anything is deleted; table/ was not touched`);
    return refused;
  }

  const source = buildSource(build);
  const before = existsSync(TABLE) ? (e => e.files.length + e.strays.length)(entriesUnder(TABLE)) : 0;
  rmSync(TABLE, { recursive: true, force: true });
  mkdirSync(TABLE, { recursive: true });
  cpSync(build, TABLE, { recursive: true });
  const copied = filesUnder(TABLE);
  lib.ok(`replaced table/ (${before.toLocaleString('en-GB')} files) with ${show(build)} (${copied.length.toLocaleString('en-GB')} files, commit ${source.commit.slice(0, 7)}${source.dirty ? ', uncommitted changes present' : ''}${source.branch ? ', branch ' + source.branch : ''})`);

  /* Every page passed the pre-flight a moment ago; the guard only matters
     if the build changed under the copy, and the check names such a page. */
  const pages = pagesOf(copied);
  let injected = 0;
  for (const rel of pages) {
    const abs = join(TABLE, rel);
    const text = readFileSync(abs, 'utf8');
    if (uninjectable(text)) continue;
    writeFileSync(abs, inject(text, v));
    injected++;
  }
  lib.ok(`injected the nine shared tags (?v=${v}) into ${injected.toLocaleString('en-GB')} of ${pages.length.toLocaleString('en-GB')} pages`);
  return check();
}

function compare(build) {
  requireDir(build, 'build');
  requireDir(TABLE, 'table/');
  const hashed = p => p.startsWith('_app/immutable/') || p === 'sw.js' || p === '_app/version.json' || p === 'BUILD-SOURCE.txt';
  const L = entriesUnder(TABLE), R = entriesUnder(build);
  for (const s of L.strays) lib.note(`stray under table/: ${s.rel} (${s.kind})`);
  for (const s of R.strays) lib.note(`stray in the build: ${s.rel} (${s.kind})`);
  const left = new Set(pagesOf(L.files));
  const right = new Set(pagesOf(R.files));
  const onlyTable = [...left].filter(p => !right.has(p)).sort();
  const onlyBuild = [...right].filter(p => !left.has(p)).sort();
  list(onlyTable, p => `only under table/: ${p} (a page the build does not hold)`, lib.note);
  list(onlyBuild, p => `only in the build: ${p} (a page table/ does not hold)`, lib.note);
  const both = [...left].filter(p => right.has(p)).length;

  const a = buildSource(TABLE), b = buildSource(build);
  const say = s => (s ? (s.commit ? s.commit.slice(0, 7) + (s.dirty ? ' with uncommitted changes' : '') : 'no commit named') : 'no BUILD-SOURCE.txt');
  lib.note(`table/ was built from ${say(a)}; ${show(build)} from ${say(b)}`);

  const l = new Set(L.files.filter(p => !p.endsWith('.html') && !hashed(p)));
  const r = new Set(R.files.filter(p => !p.endsWith('.html') && !hashed(p)));
  let differing = 0, same = 0;
  for (const p of [...new Set([...l, ...r])].sort()) {
    if (!r.has(p)) { lib.note(`only under table/: ${p}`); differing++; continue; }
    if (!l.has(p)) { lib.note(`only in the build: ${p}`); differing++; continue; }
    const x = readFileSync(join(TABLE, p)), y = readFileSync(join(build, p));
    if (!x.equals(y)) { lib.note(`differs: ${p} (${x.length} bytes under table/, ${y.length} in the build)`); differing++; }
    else same++;
  }
  const pageSet = onlyTable.length + onlyBuild.length;
  const tail = `${differing} non-html file(s) differ outside the hashed set (_app/immutable, sw.js, _app/version.json, BUILD-SOURCE.txt), ${same} are byte-equal; html bodies are not compared, their chunk references differ by platform`;
  if (pageSet) {
    lib.fail(`page set: ${plural(pageSet, 'page sits', 'pages sit')} on one side only, listed above as notes (${onlyTable.length} only under table/, ${onlyBuild.length} only in the build, ${both} on both sides); a copy holds the build's pages and no others`);
    console.error(`inject-shared --compare: the page set differs; ${tail}`);
    return 1;
  }
  console.log(`inject-shared --compare: the page set is the same (${both.toLocaleString('en-GB')} pages on both sides); ${tail}`);
  return 0;
}

if (process.env.SITE_ROOT) lib.note(`SITE_ROOT=${ROOT}`);
let failed = 0;
try {
  if (mode === 'check') failed = check();
  else if (mode === 'from') failed = from(target);
  else failed = compare(target);
} catch (err) {
  /* Nothing foreseeable lands here: a stray is a named rule, a missing file
     a named fault. What does (a directory that cannot be read, a disk that
     fails mid-copy) is still reported as a line, never as a stack trace. */
  lib.fail(`inject-shared --${mode}: unexpected ${err && err.message ? err.message : err}`);
  failed = failed || 1;
}

if (failed || process.exitCode === 1) {
  if (mode !== 'compare') console.error(`inject-shared --${mode}: ${failed} rule(s) failed`);
  process.exitCode = 1;
} else if (mode !== 'compare') {
  const pages = pagesOf(filesUnder(TABLE)).length;
  console.log(`inject-shared --${mode}: ${pages.toLocaleString('en-GB')} pages under table/ carry the nine shared tags (?v=${sharedV()}); every entry is a regular file or a directory, and BUILD-SOURCE, sw-shared.js, oot-maitre.js, sw.js, the ${WANTED_SCOPE} scope and .nojekyll agree`);
}
