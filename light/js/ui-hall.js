/* First Light: the year's readings.

   The practice half of the Library: five canons, each read through in 366 days.
   The Library is for wandering; this is for the discipline of a book a day.

   Reachable at #/hall and from the Library, but hidden from the top nav: one door
   to the religious section, not two. Everything it renders now comes from the local
   text via reading.js; nothing here touches the network. */

var hallMonth = 0;   // 0 = no explicit pick; each render defaults to the shifted month
var hallOpen = null;      // { box, btn } currently expanded; reset every render
var hallSaving = {};      // canonId -> true while a download is running

FL_ACTS.hallPick = function (el) { hallMonth = +el.getAttribute('data-m'); render(); };

/* ——— reading progress ———
   The plan can run on the calendar, so that everyone reading the Bible on the third
   of March is on the same passage — the shared-liturgy arrangement, and the one the
   artifact hardcoded. Or it can start the day you begin, which is the only way
   someone opening this in August gets to read Genesis rather than being dropped at
   day 227 with no way back.

   Neither is better; they are different disciplines. The reader chooses, per canon. */
FL_ACTS.canonStartToday = function (el) {
  var id = el.getAttribute('data-canon');
  canonState(id).start = flToday();
  flSave(true);
  toast('Begun today. Day one is Genesis, or whatever this canon opens with.');
  render();
};

FL_ACTS.canonFollowCalendar = function (el) {
  var id = el.getAttribute('data-canon');
  canonState(id).start = null;
  flSave(true);
  render();
};

/* Update in place rather than re-rendering.

   A full render on every tick throws away scroll position, and this list is
   thirty-one rows deep: marking the eleventh of the month would bounce you back to
   the top, which makes the control feel punitive to use. Only three things change:
   the button, its row, and the progress figures. */
FL_ACTS.markRead = function (el) {
  var id = el.getAttribute('data-canon');
  var doy = +el.getAttribute('data-doy');
  var st = canonState(id);
  var now = !st.done[doy];
  canonMarkRead(id, doy, now);

  /* Both the row control and today's-reading control can point at the same day. */
  var buttons = document.querySelectorAll('[data-act="markRead"][data-doy="' + doy + '"]');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('on', now);
    buttons[i].textContent = now ? '✓ Read' : 'Mark read';
    buttons[i].setAttribute('aria-pressed', String(now));
    var row = buttons[i].closest('.dayrow');
    if (row) row.classList.toggle('done', now);
  }

  var prog = canonProgress(id);
  var line = document.querySelector('.progtrack');
  if (line) {
    var bar = line.querySelector('.progbar');
    if (bar) bar.style.width = prog.pct + '%';
    var row2 = line.previousElementSibling;
    if (row2 && row2.classList.contains('astrorow')) {
      row2.innerHTML = '<span class="k">Read</span> ' + prog.done + ' of 366 · ' + prog.pct + '%';
    }
  }
  announce(now ? 'Marked read.' : 'Unmarked.');
};

FL_ACTS.readPassage = function (el) {
  var doy = +el.getAttribute('data-doy');
  var canon = el.getAttribute('data-canon');
  /* resolved RELATIVE to the button: the today card and its month row can
     share a doy, and duplicate ids sent this click to whichever box came
     first in the document */
  var box = el.parentElement.querySelector('.readbox');
  if (!box) return;
  var longLabel = !!el.getAttribute('data-long');

  if (hallOpen && hallOpen.box === box) {
    hallOpen = null;
    box.classList.add('hide');
    el.textContent = longLabel ? 'Read the full passage' : 'Read';
    return;
  }
  if (hallOpen) {
    hallOpen.box.classList.add('hide');
    hallOpen.btn.textContent = hallOpen.btn.getAttribute('data-long') ? 'Read the full passage' : 'Read';
  }
  hallOpen = { box: box, btn: el };
  box.classList.remove('hide');
  el.textContent = 'Hide the passage';

  if (readHasLocally(canon, doy)) { box.innerHTML = readRender(canon, doy); return; }

  box.innerHTML = '<p class="loadnote">Opening…</p>';
  readLoad(canon, doy).then(function () {
    if (hallOpen && hallOpen.box === box) { box.innerHTML = readRender(canon, doy); announce('Passage opened.'); }
  }).catch(function () {
    /* No navigator.onLine check: it reports true on a captive portal and true again
       when the machine is online but this app's host is not, which is the usual
       case. One sentence that is true either way, and a next step that works both. */
    box.innerHTML = '<p class="loadnote">This book is not on the device yet and cannot be reached ' +
      'right now. Save it once while you have a connection and it stays for good.</p>';
  });
};

FL_ACTS.saveCanon = function (el) {
  var canon = el.getAttribute('data-canon');
  if (hallSaving[canon]) return;
  hallSaving[canon] = true;
  var bar = document.getElementById('save-' + canon);
  el.disabled = true;
  readSaveCanon(canon, function (done, total) {
    if (bar) bar.textContent = 'Saving… ' + done + ' of ' + total;
  }).then(function (r) {
    hallSaving[canon] = false;
    if (bar) {
      bar.textContent = r.failed.length
        ? r.loaded + ' of ' + (r.loaded + r.failed.length) + ' saved; the rest could not be reached.'
        : 'Held here: always available.';
    }
    announce('Saved for offline.');
    render();
  }).catch(function () {
    hallSaving[canon] = false;
    if (bar) bar.textContent = 'That did not finish. Try again with a connection.';
    el.disabled = false;
  });
};

FL_ACTS.forgetCanon = function (el) {
  var canon = el.getAttribute('data-canon');
  var w = readWorkOf(canon);
  FLTextForget(w).then(function (n) {
    toast('Removed ' + n + (n === 1 ? ' file' : ' files') + ' from this device.');
    render();
  });
};

FL_VIEWS.hall = {
  label: 'The year’s readings',
  title: 'The Year’s Readings',
  hidden: true,        // reached from the Library; the nav has one religious door
  render: function (canonId) {
    hallOpen = null;   /* every render rebuilds all boxes hidden; state follows */
    if (!canonId || !hallById(canonId)) {
      return '<a class="keep" style="margin-bottom:20px" href="#/library">← The Library</a>' +
        '<div class="kick">Five canons, one year each</div>' +
        '<h1>The Year’s Readings</h1>' +
        '<p class="note">A book a day, straight through, for three hundred and sixty-six days. The Library is for wandering; this is the discipline.</p>' +
        HALL_YEARS.map(function (h) {
          var ready = readWorkReady(h[0]);
          return '<div class="canon"><p class="pt">' + esc(h[1]) + '</p>' +
            '<div class="ds">' + esc(h[2]) + '</div>' +
            '<p class="cep">“' + esc(h[5]) + '”</p>' +
            '<div class="ds" style="margin-bottom:8px">' + esc(h[6]) + '</div>' +
            '<p class="ct">' + esc(h[3]) + '</p>' +
            (ready ? '' : '<p class="ct" style="margin-top:8px;color:var(--accent)">This text is still being prepared.</p>') +
            '<div style="margin-top:12px"><a class="keep" href="#/hall/' + h[0] + '">Enter the year</a></div>' +
          '</div>';
        }).join('');
    }

    var h = hallById(canonId);
    var now = flShiftedNow();
    var st = canonState(canonId);
    /* The reader's own day in this plan: the calendar day if they follow it, or
       days-since-they-began if they started it themselves. */
    var doy = canonDoy(canonId);
    var prog = canonProgress(canonId);
    var verse = POOLS[canonId][(now.getDate() - 1) % 31];
    var ready = readWorkReady(canonId);

    var dayLabel = st.start
      ? 'Day ' + doy + ' of your year'
      : now.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

    var modeCard =
      '<div class="card" style="margin-top:14px">' +
        '<div class="astrorow"><span class="k">Read</span> ' + prog.done + ' of 366 · ' + prog.pct + '%</div>' +
        '<div class="progtrack"><div class="progbar" style="width:' + prog.pct + '%"></div></div>' +
        (st.start
          ? '<p class="px" style="margin-top:12px">Begun ' + esc(jPrettyDate(st.start)) + '. ' +
            'Missing a morning costs you nothing — the day you are on is the day you have reached, not the date.</p>' +
            '<button class="keep" data-act="canonFollowCalendar" data-canon="' + canonId + '">Follow the calendar instead</button>'
          : '<p class="px" style="margin-top:12px">Following the calendar, so everyone reading this canon today is on the same passage. ' +
            'The older discipline — but it means starting mid-book, and there is no way back to the beginning.</p>' +
            '<button class="keep" data-act="canonStartToday" data-canon="' + canonId + '">Begin at day one today</button>') +
      '</div>';

    var hm = hallMonth || (flShiftedNow().getMonth() + 1);
    var chips = MONTHS.map(function (mo, i) {
      return '<button class="mchip' + ((i + 1) === hm ? ' on' : '') + '" data-act="hallPick" data-m="' + (i + 1) + '"' +
             ' aria-pressed="' + ((i + 1) === hm) + '">' + esc(mo[0].slice(0, 3)) + '</button>';
    }).join('');

    var start = doyOf(hm, 1), rows = [];
    for (var dd = 1; dd <= MLEN[hm - 1]; dd++) {
      var rowDoy = start + dd - 1;
      var leapNote = doySkipped(rowDoy) ? ' <span class="ds">· leap day only</span>' : '';
      /* A filled dot means the text for that day is already on the device. One glyph
         per row is what would have made the artifact's dead Rig Veda path obvious on
         the first morning instead of never. */
      var dot = ready
        ? '<span class="heldot' + (readHasLocally(canonId, rowDoy) ? ' on' : '') + '" title="' +
          (readHasLocally(canonId, rowDoy) ? 'on this device' : 'not saved yet') + '"></span>'
        : '';
      var isDone = !!st.done[rowDoy];
      rows.push('<div class="dayrow' + (isDone ? ' done' : '') + '"><div class="dn">' + dd + '</div><div>' +
        '<p class="dq" style="font-style:normal;font-family:var(--sans);font-size:14px">' +
          dot + esc(h[4][rowDoy - 1]) + leapNote + '</p>' +
        (ready ? '<button class="readmini" id="readbtn-' + rowDoy + '" data-act="readPassage" data-doy="' + rowDoy +
          '" data-canon="' + canonId + '">Read</button> ' : '') +
        '<button class="tick' + (isDone ? ' on' : '') + '" data-act="markRead" data-doy="' + rowDoy +
          '" data-canon="' + canonId + '" aria-pressed="' + isDone + '"' +
          ' aria-label="' + (isDone ? 'Read' : 'Mark as read') + '">' + (isDone ? '✓ Read' : 'Mark read') + '</button>' +
        '<div class="readbox hide" id="read-' + rowDoy + '"></div>' +
      '</div></div>');
    }

    return '' +
      '<a class="keep" style="margin-bottom:20px" href="#/hall">← All five</a>' +
      '<div class="canon"><p class="pt">' + esc(h[1]) + '</p><div class="ds">' + esc(h[2]) + '</div>' +
        '<p class="cep">“' + esc(h[5]) + '”</p><div class="ds">' + esc(h[6]) + '</div>' +
        '<p class="ct" style="margin-top:10px"><span style="color:var(--accent)">Core teachings:</span> ' + esc(h[8]) + '</p>' +
        '<div class="label" style="margin-top:18px">Today’s reading · ' + esc(dayLabel) + '</div>' +
        '<p class="px" style="font-weight:600">' + esc(h[4][doy - 1]) + '</p>' +
        (ready
          ? '<button class="keep" id="readbtn-top" data-act="readPassage" data-doy="' + doy +
            '" data-canon="' + canonId + '" data-long="1">Read the full passage</button> ' +
            '<button class="tick' + (st.done[doy] ? ' on' : '') + '" data-act="markRead" data-doy="' + doy +
            '" data-canon="' + canonId + '" aria-pressed="' + !!st.done[doy] + '">' +
            (st.done[doy] ? '✓ Read' : 'Mark read') + '</button>'
          : '<p class="loadnote">This text is still being prepared.</p>') +
        '<div class="readbox hide" id="read-top"></div>' +
        '<div class="label" style="margin-top:18px">Verse of the day</div>' +
        '<p class="cep">“' + esc(verse[0]) + '”</p><div class="ds">' + esc(verse[1]) + '</div>' +
      '</div>' +
      modeCard +
      (ready ? '<div class="card" id="canon-store-' + canonId + '"><p class="loadnote" id="save-' + canonId + '">Checking what is on this device…</p></div>' : '') +
      '<div class="label">The year’s readings</div>' +
      '<div class="months">' + chips + '</div><div>' + rows.join('') + '</div>';
  },

  after: function (canonId) {
    if (!canonId || !readWorkReady(canonId)) return;
    var host = document.getElementById('canon-store-' + canonId);
    if (!host) return;
    readCanonState(canonId).then(function (st) {
      if (!st.ready) return;
      if (st.whole) {
        host.innerHTML = '<p class="px" id="save-' + canonId + '">Held here — always available.</p>' +
          '<div class="ds" style="margin-top:6px">' + st.total + (st.total === 1 ? ' file' : ' files') +
          ' · ' + FLBytes(st.bytes) + '</div>' +
          '<button class="keep" data-act="forgetCanon" data-canon="' + canonId + '">Remove from this device</button>';
      } else {
        host.innerHTML = '<p class="px" id="save-' + canonId + '">' +
          (st.have ? st.have + ' of ' + st.total + ' saved so far.' : 'Not saved to this device yet.') + '</p>' +
          '<div class="ds" style="margin-top:6px">' + FLBytes(st.bytes) + ' · a few seconds</div>' +
          '<button class="keep" data-act="saveCanon" data-canon="' + canonId + '">Save the whole year for offline</button>';
      }
    });
  }
};
