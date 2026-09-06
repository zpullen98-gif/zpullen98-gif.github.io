/* First Light, the track registry.

   The year was one corpus for a long time: a global Q of 366 entries and a global
   MONTHS of twelve themes, both read directly by Today, the Year, search and the
   Vault. Track switching was half-wired before this file existed, FL.prefs.track
   already namespaced the kept-quote and by-heart keys as `<track>:<m>-<d>`, so a
   reader's vault was ready for a second corpus, but nothing ever swapped the
   corpus itself, and dayEntry() read Q no matter what the preference said.

   This is the swap. Everything that used to read Q or MONTHS now reads trackQ()
   and trackMonths(), so adding a third track is a data file and one entry here.

   LOAD ORDER IS NOT A CONSTRAINT. The corpora are reached through functions rather
   than captured at definition time, so this file may load before or after the data
   files it names without changing anything. */

var FL_TRACKS = [
  { id: 'philosophers',
    label: 'The Philosophers',
    blurb: 'The Stoics, the Tao, Confucius and the old proverbs. The original year.',
    months: function () { return MONTHS; },
    q: function () { return Q; } },

  { id: 'makers',
    label: 'The Makers',
    blurb: 'Writers, builders, athletes and organisers, people who made something and said something usable about the making of it.',
    months: function () { return MONTHS_MAKERS; },
    q: function () { return Q_MAKERS; } }
];

var FL_TRACK_DEFAULT = 'philosophers';

function flTrackById(id) {
  for (var i = 0; i < FL_TRACKS.length; i++) if (FL_TRACKS[i].id === id) return FL_TRACKS[i];
  return null;
}

/* How many of the 366 a track actually has. A corpus is written a month at a time
   and audited before it lands, so a track can sit half-finished in the repo for a
   while, and the reader must never be able to walk into the hole. */
function flTrackDays(t) {
  var q = null;
  try { q = t.q(); } catch (e) { return 0; }
  if (!q) return 0;
  var n = 0;
  for (var m = 1; m <= 12; m++) n += (q[m] || []).length;
  return n;
}

function flTrackComplete(t) { return flTrackDays(t) === 366; }

/* The track the reader is actually reading.

   Falls back to the Philosophers whenever the preference names a track that does
   not exist or is not finished. This is the guard that lets an unfinished corpus
   live in the repo safely: a stale preference, an imported record from a build
   that had a track this one does not, or a half-written month can none of them
   strand a reader on a day with no quotation. dayEntry() treats a missing day as
   a loud data bug, and it is right to, so the missing day must never reach it. */
function flActiveTrack() {
  var t = flTrackById(FL.prefs.track || FL_TRACK_DEFAULT);
  if (!t || !flTrackComplete(t)) t = flTrackById(FL_TRACK_DEFAULT);
  return t;
}

/* Only finished tracks are offered in Settings. An unfinished one is shown with
   its day count rather than hidden, because a reader who can see the shelf being
   built is better served than one who cannot tell whether it exists. */
function flTracksOffered() {
  return FL_TRACKS.filter(flTrackComplete);
}

function trackQ() { return flActiveTrack().q(); }
function trackMonths() { return flActiveTrack().months(); }

/* The month NAME is the same on every track by design, the twelve themes line up
   day for day so a reader can switch mid-year and land on the same subject. Only
   the title and the blurb are the track's own. */
function trackMonthName(m) { return trackMonths()[m - 1][0]; }
