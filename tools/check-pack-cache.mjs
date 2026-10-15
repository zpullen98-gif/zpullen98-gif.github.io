// Exercise the shipped Codex worker with delayed cache storage and a consumed response.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { ROOT } from './lib.mjs';

const listeners = {}, stored = new Map();
const origin = 'https://cellar.test', address = origin + '/shared/packs/brennans-new-orleans.v1.oothouse.json';
let offline = false, quota = false, status = 200, revision = 1;
const cache = {
  async put(request, response) {
    if (quota) throw new Error('storage unavailable');
    stored.set(request.url, { body: await response.text(), status: response.status });
  },
  async match(request) {
    const entry = stored.get(typeof request === 'string' ? request : request.url);
    return entry ? new Response(entry.body, { status: entry.status }) : undefined;
  }
};
const context = vm.createContext({
  URL, Request, Response, console,
  location: { origin },
  self: { location: { href: origin + '/codex/sw.js' }, addEventListener(type, callback) { listeners[type] = callback; } },
  importScripts() {}, CodexTeachingCache: { owns() { return false; } },
  caches: { async open() { await new Promise(resolve => setTimeout(resolve, 20)); return cache; } },
  async fetch() {
    if (offline) throw new Error('offline');
    return new Response(JSON.stringify({ revision }), { status });
  }
});
vm.runInContext(readFileSync(join(ROOT, 'codex/sw.js'), 'utf8'), context, { filename: 'codex/sw.js' });
async function read() {
  let response;
  listeners.fetch({ request: new Request(address), respondWith(value) { response = value; } });
  assert.ok(response, 'the pack request is handled');
  return (await response).json();
}
assert.deepEqual(await read(), { revision: 1 });
assert.ok(stored.has(address), 'the pack is saved before its body is released and consumed');
offline = true;
assert.deepEqual(await read(), { revision: 1 }, 'offline reads the saved pack');
offline = false; revision = 2; quota = true;
assert.deepEqual(await read(), { revision: 2 }, 'storage failure still returns the fresh network pack');
assert.equal(JSON.parse(stored.get(address).body).revision, 1, 'failed storage did not erase the old offline pack');
quota = false; status = 503; revision = 3;
assert.deepEqual(await read(), { revision: 3 }, 'server error response is passed through');
assert.equal(JSON.parse(stored.get(address).body).revision, 1, 'server error never overwrites the saved pack');
console.log('check-pack-cache: delayed storage, consumed response, offline fallback, quota failure and server error pass');
