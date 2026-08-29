/* First Light — the journal.

   Writing attached to something: a day, a voice you kept, a passage you read, or the
   evening's examen. The tradition's words are on one side and yours are on the other,
   and after a year the second column is the one worth having.

   STORAGE. Entries live in FL.journal under the one versioned localStorage key, so
   they are covered by the same additive-schema rule and the same export. An entry is:

     { id, ref, d, text, t, u }
       id    stable key, derived from ref, one entry per thing written about
       ref   what it hangs on: "day:2026-08-16" · "voice:philosophers:8-16"
                               "passage:bible:229" · "examen:2026-08-16"
       d     the date the entry belongs to (not necessarily when it was written)
       text  plain text; newlines preserved, no markup language to learn
       t     created timestamp
       u     last updated timestamp

   Deriving the id from the ref means writing about the same day twice edits one entry
   rather than accumulating duplicates, and it makes the entry findable from either
   direction without a second index. */

function jRef(kind, key) { return kind + ':' + key; }
function jId(ref) { return ref; }

function jGet(ref) { return FL.journal[jId(ref)] || null; }

function jText(ref) { var e = jGet(ref); return e ? (e.text || '') : ''; }

function jSet(ref, text, day) {
  var id = jId(ref);
  var now = Date.now();
  text = String(text == null ? '' : text);

  if (!text.trim()) {
    /* An emptied entry is deleted rather than kept as a blank, so "have I written
       about this day" stays a simple truth-test everywhere else in the app. */
    if (FL.journal[id]) { delete FL.journal[id]; flSave(); return null; }
    return null;
  }

  var e = FL.journal[id];
  if (e) { e.text = text; e.u = now; }
  else { e = FL.journal[id] = { id: id, ref: ref, d: day || flToday(), text: text, t: now, u: now }; }
  flSave();
  return e;
}

function jCount() { return Object.keys(FL.journal).length; }
/* Both counters skip Clear Mornings notes: the room's contract is that its
   writing appears in NO stat, and a word count is a stat. */
function jWords() {
  var n = 0;
  Object.keys(FL.journal).forEach(function (k) {
    if (String(FL.journal[k].ref).indexOf('clear:') === 0) return;
    var t = (FL.journal[k].text || '').trim();
    if (t) n += t.split(/\s+/).length;
  });
  return n;
}
function jDays() {
  var s = {};
  Object.keys(FL.journal).forEach(function (k) {
    if (String(FL.journal[k].ref).indexOf('clear:') === 0) return;
    if (FL.journal[k].d) s[FL.journal[k].d] = 1;
  });
  return Object.keys(s);
}

/* Every entry, newest first, for the journal view. */
function jAll() {
  return Object.keys(FL.journal).map(function (k) { return FL.journal[k]; })
    .sort(function (a, b) { return (b.d || '').localeCompare(a.d || '') || (b.u || 0) - (a.u || 0); });
}

/* ——— the writing surface ———
   A textarea that saves as you type. Deliberately not a rich editor: the value here
   is that a sentence is cheap to write at six in the morning, and every affordance
   between the thought and the text is a reason not to bother. */
function jField(ref, placeholder, day, rows, label) {
  var val = jText(ref);
  return '<textarea class="jbox" rows="' + (rows || 4) +
    '" data-journal="' + esc(ref) + '" data-day="' + esc(day || flToday()) + '"' +
    ' placeholder="' + esc(placeholder || '') + '"' +
    ' aria-label="' + esc(label || placeholder || 'Your writing') + '">' + esc(val) + '</textarea>' +
    '<div class="jstate" id="js-' + esc(ref).replace(/[^a-zA-Z0-9]/g, '-') + '"></div>';
}

/* One delegated listener for every journal field on the page. Bound once at load,
   so a re-render never leaves an orphan and never double-saves. */
var jTimers = {};
document.addEventListener('input', function (e) {
  var el = e.target;
  if (!el || !el.getAttribute || !el.getAttribute('data-journal')) return;
  var ref = el.getAttribute('data-journal');
  var day = el.getAttribute('data-day');
  var stateId = 'js-' + ref.replace(/[^a-zA-Z0-9]/g, '-');

  if (jTimers[ref]) clearTimeout(jTimers[ref].t);
  /* the ELEMENT rides in the map: once render() detaches the textarea, the
     timer closure is the only thing holding the typed words, and jFlush must
     be able to reach them: a detached element still exposes .value */
  jTimers[ref] = { el: el, day: day, t: setTimeout(function () {
    jSet(ref, el.value, day);
    delete jTimers[ref];
    var s = document.getElementById(stateId);
    if (s) {
      s.textContent = el.value.trim() ? 'Kept' : '';
      /* Fade the confirmation rather than leaving it: a permanent "Kept" stops
         meaning anything, and the point is to reassure once. */
      if (s.textContent) setTimeout(function () { if (s) s.textContent = ''; }, 2200);
    }
  }, 600) };
});

/* Flush any pending keystroke when the page goes away mid-sentence. store.js already
   flushes its debounce on pagehide; this makes sure the text reached the store in
   the first place. */
window.addEventListener('pagehide', jFlush);
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') jFlush();
});
function jFlush() {
  /* DOM first, pending map second: the order is load-bearing. A same-ref
     field back in the DOM can only hold a STALE re-rendered copy (any input
     on a newer element replaces the map entry with that element), so the map
     entry is always at least as fresh and must win. The old order (clear
     clear the timers, then sweep the DOM, destroyed the only copy of anything
     typed within 600ms of a navigation: the exact loss this file exists to
     prevent. */
  var wrote = false;
  var fields = document.querySelectorAll('[data-journal]');
  for (var i = 0; i < fields.length; i++) {
    jSet(fields[i].getAttribute('data-journal'), fields[i].value, fields[i].getAttribute('data-day'));
    wrote = true;
  }
  Object.keys(jTimers).forEach(function (ref) {
    var pend = jTimers[ref];
    clearTimeout(pend.t);
    delete jTimers[ref];
    if (pend.el) { jSet(ref, pend.el.value, pend.day); wrote = true; }
  });
  if (wrote) flSave(true);
}

/* ——— human labels for a ref ———
   The journal view shows what each entry was written against, and a raw ref is
   meaningless to a reader. */
function jLabel(ref) {
  var p = String(ref).split(':');
  if (p[0] === 'day') return 'The morning of ' + jPrettyDate(p[1]);
  if (p[0] === 'examen') return 'The evening of ' + jPrettyDate(p[1]);
  if (p[0] === 'debrief') return 'The shift of ' + jPrettyDate(p[1]);
  if (p[0] === 'clear') return 'A clear-morning note';
  if (p[0] === 'voice') {
    var md = (p[2] || '').split('-');
    if (md.length === 2 && MONTHS[+md[0] - 1]) return 'On ' + MONTHS[+md[0] - 1][0] + ' ' + md[1] + '’s voice';
    return 'On a kept voice';
  }
  if (p[0] === 'passage') {
    var h = hallById(p[1]);
    var doy = +p[2];
    if (h && doy) return 'On ' + h[1] + ': ' + h[4][doy - 1];
    return 'On a passage';
  }
  return 'A note';
}

function jPrettyDate(key) {
  if (!key) return '';
  var p = key.split('-');
  if (p.length !== 3) return key;
  var d = new Date(+p[0], +p[1] - 1, +p[2]);
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

/* Where a ref points, so an entry in the journal can take you back to it. */
function jHref(ref) {
  var p0 = String(ref).split(':')[0];
  if (p0 === 'clear') return '#/clear';
  if (p0 === 'debrief') return '#/today';
  var p = String(ref).split(':');
  if (p[0] === 'passage') return '#/hall/' + p[1];
  if (p[0] === 'voice') return '#/vault';
  return '#/today';
}
