/* The Dawn Anthology's dated reading journey. This is an explicitly opened
   anthology room, so its complete library includes labelled accounts, portrayals
   and traditions. It does not choose or change the three quotations on Today.

   The calendar follows plan.js's fixed 366 slots. A common year simply has no
   29 February. Twelve selections a day revisit the complete library, rather
   than pretending the existing collection contains 4,380 different quotations.
   IDs, wording and source records remain the originals. */
var dawnReadingSections = [
  { title: 'At first light', prompt: 'Read slowly. Which words invite your attention, and who is speaking?' },
  { title: 'Across the horizon', prompt: 'Compare these voices. What changes when you read the source and its setting?' },
  { title: 'By the lantern', prompt: 'Choose one passage to carry with you. What question will you return to?' }
];
var dawnReadingCache = null;

function dawnReadingDate(key) {
  if (typeof key !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(key)) return null;
  var pieces = key.split('-'), y = Number(pieces[0]), m = Number(pieces[1]), d = Number(pieces[2]);
  if (y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  /* Noon avoids the midnight transition used by some time zones. Do not pass
     an already selected calendar date through the reader's shift clock. */
  var date = new Date(y, m - 1, d, 12, 0, 0, 0);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
}
function dawnReadingKey(date) {
  if (!date || typeof date.getFullYear !== 'function' || typeof date.getTime !== 'function' || !Number.isFinite(date.getTime())) return '';
  var key = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  return dawnReadingDate(key) ? key : '';
}
function dawnReadingToday() { return flToday(); }

function dawnReadingBuild() {
  var library = dawnLibrary();
  /* Checking the live ID sequence also catches same-length replacements and
     lazy loading of the old Year/Lift arrays. The cache is only a reading plan;
     the original quote arrays and personal records are never sorted or edited. */
  var signature = library.map(function (q) { return q.id + '\u001e' + q.collection + '\u001e' + q.text; }).join('\u001f');
  if (dawnReadingCache && dawnReadingCache.signature === signature) return dawnReadingCache;
  var groups = Object.create(null), collectionOrder = [];
  DAWN_COLLECTIONS.forEach(function (collection) { collectionOrder.push(collection[0]); groups[collection[0]] = []; });
  library.forEach(function (q) {
    if (!groups[q.collection]) { groups[q.collection] = []; collectionOrder.push(q.collection); }
    groups[q.collection].push(q);
  });
  /* Merge each collection by its proportional position. This distributes both
     small and large shelves across the whole journey, retaining every edition
     and legacy dated record instead of silently deduplicating the library. */
  var queue = [];
  collectionOrder.forEach(function (id, order) {
    groups[id].forEach(function (q, ordinal) {
      queue.push({ quote: q, words: dawnNorm(q.text), at: (ordinal + 0.5) / groups[id].length, order: order });
    });
  });
  queue.sort(function (a, b) { return a.at - b.at || a.order - b.order; });
  var distinct = new Set(queue.map(function (entry) { return entry.words; })).size;
  var count = Math.min(12, distinct), cursor = 0, deferred = [], days = [];
  for (var slot = 0; slot < 366; slot++) {
    var day = [], used = Object.create(null), carry = [], waiting = deferred.slice();
    deferred = [];
    while (day.length < count) {
      var next = waiting.length ? waiting.shift() : queue[cursor++ % queue.length];
      if (used[next.words]) carry.push(next);
      else { used[next.words] = true; day.push(next.quote); }
    }
    /* A second edition of the same words waits for another day, not the bin.
       Pending records precede the continuing queue on the following date. */
    deferred = waiting.concat(carry);
    days.push(day);
  }
  dawnReadingCache = { signature: signature, days: days, total: library.length };
  return dawnReadingCache;
}
function dawnReadingPlan(key) {
  var date = dawnReadingDate(key);
  if (!date) return [];
  return dawnReadingBuild().days[doyOf(date.getMonth() + 1, date.getDate()) - 1].slice();
}
function dawnReadingMarkKey(key, part) {
  if (!Number.isInteger(part) || part < 0 || part > 2) return '';
  var entries = dawnReadingPlan(key).slice(part * 4, part * 4 + 4);
  if (entries.length !== 4) return '';
  var ids = entries.map(function (q) { return q.id; }).join('\u001f'), hash = 2166136261;
  for (var i = 0; i < ids.length; i++) { hash ^= ids.charCodeAt(i); hash = Math.imul(hash, 16777619); }
  /* A change to the four assigned records cannot inherit an old completion
     merely because it happens to occupy the same date and reading position. */
  return key + ':p' + (part + 1) + ':' + (hash >>> 0).toString(16).padStart(8, '0');
}
function dawnReadingDone(key, part) {
  var mark = dawnReadingMarkKey(key, part);
  return !!(mark && FL.anthologyRead && FL.anthologyRead[mark] && FL.anthologyRead[mark].done === 1);
}
function dawnReadingToggle(key, part) {
  var mark = dawnReadingMarkKey(key, part);
  if (!mark) return false;
  var previous = FL.anthologyRead;
  if (!previous || typeof previous !== 'object' || Array.isArray(previous)) FL.anthologyRead = {};
  var record = FL.anthologyRead, had = Object.prototype.hasOwnProperty.call(record, mark), old = record[mark];
  var memory = typeof flMem === 'object' && flMem && typeof FL_KEY === 'string' ? flMem : null;
  var memoryHad = memory && Object.prototype.hasOwnProperty.call(memory, FL_KEY), memoryOld = memory && memory[FL_KEY];
  /* Keep an undo as a dated tombstone, so an older device backup cannot revive
     a reading the reader deliberately unmarked. Import chooses the newer edit. */
  record[mark] = { done: old && old.done === 1 ? 0 : 1, updated: Math.max(Date.now(), (old && Number(old.updated) || 0) + 1) };
  var saved = false;
  try { saved = flSave(true) === true; } catch (e) { /* The view reports the failed save. */ }
  if (!saved) {
    if (had) record[mark] = old;
    else delete record[mark];
    if (previous !== record) {
      if (previous === undefined) delete FL.anthologyRead;
      else FL.anthologyRead = previous;
    }
    /* flRawSet retains a failed payload in the session fallback. Roll that
       back too, so a later fallback restore cannot resurrect an unsaved tick. */
    if (memory) {
      if (memoryHad) memory[FL_KEY] = memoryOld;
      else delete memory[FL_KEY];
    }
  }
  return saved;
}
