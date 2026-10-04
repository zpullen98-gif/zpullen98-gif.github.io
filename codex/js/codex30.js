/* ================== CODEX XXX: THE HOUSE'S VIDEOS ==================

   The master review of My Menu (WorldTable plan, 4 October 2026): the owner
   asked for videos that would help a server learn the house, attached to the
   items they teach. The House carries them (house.videos, the shape in the
   World Table's src/lib/house/house-schema.ts: a link, a title, a channel,
   the length in minutes, a topic, why it helps, the items and the lexicon
   terms it teaches, whether it is about the house itself, the day it was
   checked). This layer is the Codex's half.

   WHAT IT DOES, and the rule each part keeps:

   1. WATCH, ON A WINE'S CARD. Under the service note and above In this app,
      a block lists the videos that name the wine, then those that name a
      lexicon term reaching it: the title as a link, the channel and the
      length, and why it helps. No block when the house names none.

   2. VIDEOS, IN THE STUDY VIEW. At the foot of Our List, one block lists
      every video the house names by topic, the house's own first, each topic
      a closed disclosure so the first screen stays the list's. A wine a video
      teaches opens its card in place; a dish or a drink is a link into its
      room on the suite's path, or words.

   3. A LINK OUT, NEVER A PLAYER. Every title opens YouTube or Vimeo in a new
      tab with rel noopener; nothing here embeds, plays or fetches, and both
      blocks say a video needs a connection. A link the engine's rule would
      refuse is never drawn (v30UrlOk, the same rule held here, so a page
      holding an older engine cannot let one through). The engine's
      videosFor, videoGroups and videoMeta are used when it ships them, else
      the same rules below.

   NO OOT AT ALL is the standalone build and every Node gate: no house, no
   block, nothing drawn.

   House rules observed: a new layer, no edits to earlier files; top-level
   declarations are var and function only, no arrow; no pictorial glyph and
   no mark at or above U+2190 in anything this file writes; no dash of any
   spelling; British spelling in the app's own words, the titles and the
   channels as the house quotes them; nobody named. */

/* =========== the words =========== */

var V30_WORDS = {
  watch: 'Watch',
  videos: 'Videos ({n})',
  note: 'Each video opens on YouTube or Vimeo in a new tab, and needs a connection.',
  newTab: '(opens in a new tab)',
  forLine: 'For: ',
  noTopic: 'More to watch'
};
function v30W(key, vars) {
  var v = vars || {};
  return String(V30_WORDS[key] || key).replace(/\{(\w+)\}/g, function (m, k) { return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m; });
}
function v30Esc(s) { return (typeof v28Esc === 'function') ? v28Esc(s) : String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function v30Str(s) { return typeof s === 'string' ? s.trim() : ''; }

/* =========== the rules, the engine's when it ships them =========== */

var V30_HOSTS = ['youtube.com', 'youtu.be', 'vimeo.com'];
function v30UrlOk(url) {
  if (typeof url !== 'string' || url.length > 500) return false;
  var m = /^https:\/\/([A-Za-z0-9.-]+)(?:[\/?#][^\s]*)?$/.exec(url);
  if (!m) return false;
  var host = m[1].toLowerCase();
  return V30_HOSTS.some(function (x) { return host === x || host.slice(-(x.length + 1)) === '.' + x; });
}
function v30Lib(name, local) {
  var lib = null;
  try { lib = (typeof OOT !== 'undefined' && OOT && OOT.houseLib) ? OOT.houseLib : null; } catch (e) { lib = null; }
  return lib && typeof lib[name] === 'function' ? lib[name] : local;
}
function v30ForLocal(h, id) {
  var terms = {};
  (h.lexicon || []).forEach(function (t) { if (t && (t.itemIds || []).indexOf(id) >= 0) terms[t.id] = true; });
  var direct = [], viaTerm = [];
  (Array.isArray(h.videos) ? h.videos : []).forEach(function (v) {
    if ((v.itemIds || []).indexOf(id) >= 0) direct.push(v);
    else if ((v.termIds || []).some(function (t) { return terms[t]; })) viaTerm.push(v);
  });
  return direct.concat(viaTerm);
}
function v30GroupsLocal(h) {
  var all = Array.isArray(h.videos) ? h.videos : [];
  var ordered = all.filter(function (v) { return v.house; }).concat(all.filter(function (v) { return !v.house; }));
  var groups = [], at = {};
  ordered.forEach(function (v) {
    var topic = v30Str(v.topic) || v30W('noTopic');
    if (!Object.prototype.hasOwnProperty.call(at, topic)) { at[topic] = groups.length; groups.push({ topic: topic, videos: [] }); }
    groups[at[topic]].videos.push(v);
  });
  return groups;
}
function v30MetaLocal(v) {
  var parts = [];
  if (v30Str(v.channel)) parts.push(v30Str(v.channel));
  if (typeof v.mins === 'number' && v.mins > 0) parts.push(Math.max(1, Math.round(v.mins)) + ' min');
  return parts.join(', ');
}
/* the ids of the videos fit to draw: a link the rule takes and a title */
function v30Fit(h) {
  var ok = {};
  (h && Array.isArray(h.videos) ? h.videos : []).forEach(function (v) { if (v && v30UrlOk(v.url) && v30Str(v.title)) ok[v.id] = true; });
  return ok;
}
function v30VideosFor(h, id) {
  if (!h) return [];
  var ok = v30Fit(h);
  return v30Lib('videosFor', v30ForLocal)(h, id).filter(function (v) { return ok[v.id]; });
}
function v30Groups(h) {
  if (!h) return [];
  var ok = v30Fit(h);
  return v30Lib('videoGroups', v30GroupsLocal)(h).map(function (g) {
    return { topic: g.topic, videos: g.videos.filter(function (v) { return ok[v.id]; }) };
  }).filter(function (g) { return g.videos.length; });
}

/* =========== drawing =========== */

/* One video: the title as a link out, the small line, why it helps, and in
   the study view's list the items it teaches. */
function v30Item(h, v, withFor) {
  var meta = v30Lib('videoMeta', v30MetaLocal)(v);
  var names = '';
  if (withFor) {
    var items = (v.itemIds || []).map(function (id) {
      var all = [].concat(h.wines || [], h.dishes || [], h.cocktails || []);
      for (var i = 0; i < all.length; i++) if (all[i] && all[i].id === id) return all[i];
      return null;
    }).filter(function (it) { return it && v30Str(it.name); });
    if (items.length) names = '<span class="v30-for">' + v30Esc(v30W('forLine')) + items.map(function (it) {
      if (/^w-/.test(it.id)) return '<button type="button" class="v28-link v30-open" data-v28="open" data-id="' + v30Esc(it.id) + '">' + v30Esc(v30Str(it.name)) + '</button>';
      var room = /^d-/.test(it.id) ? 'table' : 'ledger';
      return typeof v28RoomName === 'function' ? v28RoomName(room, it.id, v30Str(it.name)) : v30Esc(v30Str(it.name));
    }).join(', ') + '</span>';
  }
  return '<li class="v30-video" data-video="' + v30Esc(v.id) + '">'
    + '<a class="v28-link v30-title" href="' + v30Esc(v.url) + '" target="_blank" rel="noopener">' + v30Esc(v30Str(v.title)) + '<span class="sr-only"> ' + v30Esc(v30W('newTab')) + '</span></a>'
    + (meta ? '<span class="v30-meta">' + v30Esc(meta) + '</span>' : '')
    + (v30Str(v.why) ? '<span class="v30-why">' + v30Esc(v30Str(v.why)) + '</span>' : '')
    + names
    + '</li>';
}

/* The Watch block on a wine's card, or nothing. */
function v30WatchHtml(h, id) {
  var vids = v30VideosFor(h, id);
  if (!vids.length) return '';
  return '<section class="v28-block v30-watch" aria-labelledby="v30-watch-h"><h3 class="secgroup" id="v30-watch-h">' + v30W('watch') + '</h3>'
    + '<p class="v28-soft">' + v30Esc(v30W('note')) + '</p>'
    + '<ul class="v30-list">' + vids.map(function (v) { return v30Item(h, v, false); }).join('') + '</ul></section>';
}

/* The Videos block at the foot of the study view, or nothing. */
function v30VideosHtml(h) {
  var groups = v30Groups(h);
  var n = groups.reduce(function (t, g) { return t + g.videos.length; }, 0);
  if (!n) return '';
  return '<section class="v28-block v30-videos" aria-labelledby="v30-videos-h"><h3 class="secgroup" id="v30-videos-h">' + v30Esc(v30W('videos', { n: n })) + '</h3>'
    + '<p class="v28-soft">' + v30Esc(v30W('note')) + '</p>'
    + groups.map(function (g) {
      return '<details class="v28-q v30-topic"><summary>' + v30Esc(g.topic) + ' (' + g.videos.length + ')</summary><ul class="v30-list">'
        + g.videos.map(function (v) { return v30Item(h, v, true); }).join('') + '</ul></details>';
    }).join('')
    + '</section>';
}

/* =========== the wraps =========== */

/* The card: Watch after the service note's block, before In this app. */
if (typeof v28CardHtml === 'function') {
  var _v30CardHtml = v28CardHtml;
  v28CardHtml = function (id) {
    var html = _v30CardHtml(id);
    var h = typeof v28House === 'function' ? v28House() : null;
    if (!html || !h) return html;
    var block = v30WatchHtml(h, id);
    if (!block) return html;
    var at = html.indexOf('<section class="v28-block"><p class="v28-eyebrow">' + v28W('eyebrow'));
    var end = at >= 0 ? html.indexOf('</section>', at) : -1;
    if (end < 0) return html;
    end += '</section>'.length;
    return html.slice(0, end) + block + html.slice(end);
  };
}

/* The study view: the Videos block before the view's own closing tag. */
if (typeof v28StudyHtml === 'function') {
  var _v30StudyHtml = v28StudyHtml;
  v28StudyHtml = function () {
    var html = _v30StudyHtml();
    var h = typeof v28House === 'function' ? v28House() : null;
    if (!html || !h) return html;
    var block = v30VideosHtml(h);
    var close = html.lastIndexOf('</div>');
    if (!block || close < 0) return html;
    return html.slice(0, close) + block + html.slice(close);
  };
}
