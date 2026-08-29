/* First Light: The Vault. Everything kept, gathered for rehearsal.

   BY HEART: Epictetus's instruction was to keep the doctrines procheiron,
   'ready to hand', which means memorized, not bookmarked. Each kept voice can
   be rehearsed through fading stages: whole, every third word gone, first
   letters only, then just the source. Familiarity is a BAND, not a score (
   new, turning over, by heart, and it only ever moves because the reader
   says so. Nothing is tested, timed, or tallied. */

var vaultRx = null;   // { key, m, d, stage:0-3 }

function byheartBand(k) { return FL.byheart[k] === 2 ? 'by heart' : FL.byheart[k] === 1 ? 'turning over' : 'new'; }

function vaultFade(text, stage) {
  if (stage <= 0) return '“' + esc(text) + '”';
  var words = text.split(/\s+/);
  if (stage === 1) {
    return '“' + words.map(function (w, i) {
      return (i % 3 === 2) ? '<span aria-hidden="true" style="opacity:.35">──</span>' : esc(w);
    }).join(' ') + '”';
  }
  if (stage === 2) {
    return '“' + words.map(function (w) {
      var head = w.charAt(0);
      return esc(head) + '<span aria-hidden="true" style="opacity:.35">─</span>';
    }).join(' ') + '”';
  }
  return '<span style="color:var(--faint)">The line is yours to say now — the page holds only the name.</span>';
}

FL_ACTS.rehearse = function (el) {
  var m = +el.getAttribute('data-m'), d = +el.getAttribute('data-d');
  vaultRx = { key: trackKey(m, d), m: m, d: d, stage: 0 };
  render();
};
FL_ACTS.rxStage = function (el) {
  if (!vaultRx) return;
  var to = el.getAttribute('data-to');
  vaultRx.stage = to === 'next' ? Math.min(3, vaultRx.stage + 1)
                : to === 'back' ? Math.max(0, vaultRx.stage - 1) : +to;
  render();
};
FL_ACTS.rxBand = function (el) {
  if (!vaultRx) return;
  var band = +el.getAttribute('data-band');
  if (band > 0) FL.byheart[vaultRx.key] = band;
  else delete FL.byheart[vaultRx.key];
  flSave();
  announce(band === 2 ? 'By heart. It goes with you now.' : band === 1 ? 'Turning over. It is getting closer.' : 'Marked new again.');
  vaultRx = null;
  render();
};
FL_ACTS.rxClose = function () { vaultRx = null; render(); };

FL_ACTS.release = function (el) {
  var m = +el.getAttribute('data-m'), d = +el.getAttribute('data-d');
  delete FL.kept[trackKey(m, d)];
  flSave();
  announce('Released from your vault.');
  render();
};

FL_VIEWS.vault = {
  label: 'Vault',
  title: 'The Vault',
  render: function () {
    var prefix = (FL.prefs.track || 'philosophers') + ':';
    var keys = Object.keys(FL.kept).filter(function (k) { return k.indexOf(prefix) === 0; });

    /* Keys arrive in insertion order, which is the order they were kept. Sorting by
       date reads better here: the Vault is a shelf, not a log. */
    keys.sort(function (a, b) {
      var A = a.slice(prefix.length).split('-').map(Number);
      var B = b.slice(prefix.length).split('-').map(Number);
      return doyOf(A[0], A[1]) - doyOf(B[0], B[1]);
    });

    var head = '<div class="kick">Kept words</div><h1>The Vault</h1>';

    if (!keys.length) {
      return head + '<p class="note" style="margin-top:30px">Nothing kept yet. ' +
        'When a voice in the almanac strikes you, choose “Keep”: it will wait for you here.</p>';
    }

    /* a rehearsal in progress takes the whole room */
    if (vaultRx) {
      var re = dayEntry(vaultRx.m, vaultRx.d);
      var stages = ['Whole', 'Fading', 'First letters', 'From memory'];
      var dots = stages.map(function (nm, i) {
        return '<button class="mchip' + (i === vaultRx.stage ? ' on' : '') + '" data-act="rxStage" data-to="' + i +
          '" aria-pressed="' + (i === vaultRx.stage) + '">' + nm + '</button>';
      }).join('');
      return head +
        '<p class="note">Say it out loud at every stage: the mouth learns faster than the eye.</p>' +
        '<div class="months" style="justify-content:center">' + dots + '</div>' +
        '<div class="q" style="margin-top:16px"><p class="qt">' + vaultFade(re.q, vaultRx.stage) + '</p>' +
        '<span class="qs">' + esc(re.s) + '</span></div>' +
        '<div class="drawrow" style="justify-content:center;margin-top:18px">' +
          (vaultRx.stage < 3
            ? '<button class="btn" data-act="rxStage" data-to="next">Fade it further</button>'
            : '<button class="btn" data-act="rxBand" data-band="2">I have it by heart</button>') +
          '<button class="keep" data-act="rxBand" data-band="1">Still turning it over</button>' +
        '</div>' +
        '<div style="text-align:center;margin-top:14px">' +
          '<button class="readmini" data-act="rxClose">Back to the shelf</button></div>';
    }

    var body = keys.map(function (k) {
      var md = k.slice(prefix.length).split('-').map(Number);
      var m = md[0], d = md[1];
      var e = dayEntry(m, d);
      var band = byheartBand(k);
      return '<div class="q"><p class="qt">“' + esc(e.q) + '”</p>' +
        '<span class="qs">' + esc(e.s) + '</span>' +
        '<span class="qtr">' + esc(e.t) + ' · ' + esc(MONTHS[m - 1][0]) + ' ' + d +
        ' · <em>' + band + '</em></span>' +
        provNote(e.n) + '<br>' +
        '<button class="keep" data-act="rehearse" data-m="' + m + '" data-d="' + d + '">' +
          (band === 'by heart' ? 'Rehearse it anyway' : 'Learn it by heart') + '</button> ' +
        '<button class="keep on" data-act="release" data-m="' + m + '" data-d="' + d + '">Release</button></div>';
    }).join('');

    return head +
      '<p class="note">' + keys.length + (keys.length === 1 ? ' voice' : ' voices') +
      ' you have chosen to keep from the year’s almanac.</p>' + body;
  }
};
