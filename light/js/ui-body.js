/* First Light: The Body.

   Phase 1 ports the teaching, the eight limbs, and the video library. The practice
   engine, breath pacer, timers, written sequences that run without a network -
   arrives in Phase 4. What is fixed here is the offline behaviour: the artifact
   left every video card reading "Loading title…" forever when the fetch failed,
   which on a plane is six identical lies stacked down the page. */

var ytTitleCache = {};

FL_ACTS.pacer = function (el) { pacerStart(el.getAttribute('data-id')); render(); };
FL_ACTS.pacerStop = function () { pacerStop(); render(); };
FL_ACTS.seqStart = function (el) { seqStart(el.getAttribute('data-id'), 0); render(); };

/* ---- THE WALK-IN (#/reset) ----
   Ninety seconds, one tap, phone propped on a shelf in the cooler. Two doors
   into the same minute and a half: the rough table wants the long exhale, the
   coming push wants the box. DELIBERATELY RECORDS NOTHING: written down as a
   decision: a mid-shift reset that showed up in any count would stop being a
   refuge and start being a metric, and this room is a refuge. */
var resetState = { on: false, done: false, timer: null, nonce: 0 };

function resetBegin(patternId) {
  var nonce = ++resetState.nonce;
  resetState.on = true; resetState.done = false;
  pacerStart(patternId);
  if (resetState.timer) clearTimeout(resetState.timer);
  resetState.timer = setTimeout(function () {
    if (resetState.nonce !== nonce) return;
    pacerStop();
    resetState.on = false; resetState.done = true;
    if (flRoute.view === 'reset') {
      render();
      announce('Ninety seconds are up. Back on the floor.');
    }
  }, 90000);
}

FL_ACTS.resetGo = function (el) {
  resetBegin(el.getAttribute('data-p'));
  announce('Ninety seconds: breathe.');
  render();
};

/* leaving the room mid-count must not leave a frozen screen behind: the
   pacer already stops on hashchange (practice.js); the room's own state
   follows it */
window.addEventListener('hashchange', function () {
  resetState.nonce++;
  if (resetState.timer) { clearTimeout(resetState.timer); resetState.timer = null; }
  resetState.on = false;
  resetState.done = false;
});
FL_ACTS.resetEnd = function () {
  resetState.nonce++;
  if (resetState.timer) clearTimeout(resetState.timer);
  pacerStop();
  resetState.on = false; resetState.done = false;
  render();
};

FL_VIEWS.reset = {
  label: 'The Walk-In',
  title: 'The Walk-In',
  hidden: true,   // reached from Today and the Body; a refuge needs no nav slot
  render: function () {
    var line = RESET_LINES[Math.floor(Date.now() / 60000) % RESET_LINES.length];
    if (resetState.done) {
      return '<div class="kick">The Walk-In</div>' +
        '<h1>Back on the floor</h1>' +
        '<p class="note">' + esc(line) + '</p>' +
        '<div style="text-align:center;margin-top:20px">' +
          '<button class="btn" data-act="resetEnd">Good</button></div>';
    }
    if (resetState.on) {
      return '<div class="kick">The Walk-In</div>' +
        '<div class="pacerbox">' +
          '<div class="pacer-disc" id="pacer-disc" aria-hidden="true"></div>' +
          '<div class="pacer-label" id="pacer-label"></div>' +
          '<div class="ds" id="pacer-count"></div>' +
        '</div>' +
        '<p class="mintro">' + esc(line) + '</p>' +
        '<div style="text-align:center;margin-top:14px">' +
          '<button class="readmini" data-act="resetEnd">Back early</button></div>';
    }
    return '<div class="kick">The Walk-In</div>' +
      '<h1>Ninety seconds</h1>' +
      '<p class="note">' + esc(line) + '</p>' +
      '<p class="px" style="text-align:center;color:var(--faint)">Nothing here is counted or kept: ' +
      'this is a walk-in, not a scoreboard. Breathe, then go back.</p>' +
      '<div class="drawrow" style="justify-content:center;margin-top:18px">' +
        '<button class="btn" data-act="resetGo" data-p="extended">After a rough table</button>' +
        '<button class="btn" data-act="resetGo" data-p="box">Before the push</button>' +
      '</div>';
  }
};
FL_ACTS.seqStop = function () { seqStop(); };

async function fetchYouTubeTitle(id) {
  if (ytTitleCache[id]) return ytTitleCache[id];
  var url = 'https://www.youtube.com/oembed?url=' +
    encodeURIComponent('https://www.youtube.com/watch?v=' + id) + '&format=json';
  var r = await fetch(url);
  if (!r.ok) throw new Error('oembed failed');
  var j = await r.json();
  var out = { title: j.title || '', author: j.author_name || '' };
  ytTitleCache[id] = out;
  return out;
}

FL_ACTS.playVideo = function (el) {
  var id = el.getAttribute('data-id');
  var start = +el.getAttribute('data-start') || 0;
  var host = el.closest('.vidframe');
  var src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0' + (start ? '&start=' + start : '');
  host.innerHTML = '<iframe src="' + src + '" title="Practice video: ' + esc(el.getAttribute('data-frame') || '') + '" frameborder="0" ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
};

FL_VIEWS.body = {
  label: 'The Body',
  title: 'The Body',
  render: function () {
    var teach = BODY_TEACH.map(function (t) {
      /* BODY_TEACH carries deliberate <em> markup, so it is trusted authored content
         and goes in unescaped. Nothing here comes from the reader. */
      return '<div class="q"><p class="pt">' + t[0] + '</p><p class="px">' + t[1] + '</p></div>';
    }).join('');

    var limbs = EIGHT_LIMBS.map(function (l, i) {
      return '<div class="limb"><div class="limbn">' + (i + 1) + '</div><div>' +
        '<div class="gt">' + esc(l[0]) + '</div><div class="gp">' + esc(l[1]) + '</div></div></div>';
    }).join('');

    /* One card builder for both groups. The index is the DOM id the live title
       fetch writes into, so it has to be unique across the two lists, not per
       list: the trade group is offset past the end of the first. */
    function vidCard(v, i) {
      var startNote = v.start
        ? '<div class="vidnote" style="color:var(--accent)">Starts at ' +
          Math.floor(v.start / 60) + ':' + String(v.start % 60).padStart(2, '0') + '</div>'
        : '';
      return '<div class="vidcard">' +
        '<div class="vidframe" id="vid-' + i + '">' +
          '<button class="vidthumb" data-act="playVideo" data-id="' + esc(v.id) + '" data-start="' + (v.start || 0) + '" data-frame="' + esc(v.frame) + '"' +
            ' style="background-image:url(https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg)"' +
            ' aria-label="Play: ' + esc(v.frame) + '"><span class="playbtn" aria-hidden="true">▶</span></button>' +
        '</div>' +
        '<div class="vidmeta">' +
          '<div class="vidframe-label">' + esc(v.frame) + '</div>' +
          '<div class="vidtitle" id="vt-' + i + '">' +
            (v.title ? esc(v.title) + (v.author ? '  ·  ' + esc(v.author) : '') : '…') + '</div>' +
          '<div class="vidnote">' + esc(v.note) + '</div>' + startNote +
        '</div></div>';
    }

    var vids = BODY_VIDEOS.map(vidCard).join('');
    var tradeVids = TRADE_VIDEOS.map(function (v, i) {
      return vidCard(v, i + BODY_VIDEOS.length);
    }).join('');

    /* --- the practice engine --- */
    var pacerUI =
      '<div class="label">The breath</div>' +
      '<p class="px" style="color:var(--faint);margin-bottom:14px">Prāṇāyāma sits at the centre of the eight limbs because breath is the one system that is both automatic and voluntary. Follow the disc: it grows as you draw in and falls as you let go.</p>' +
      '<div class="pacerbox">' +
        '<div class="pacer-disc" id="pacer-disc" aria-hidden="true"></div>' +
        '<div class="pacer-label" id="pacer-label">Ready</div>' +
        '<div class="ds" id="pacer-count"></div>' +
      '</div>' +
      '<div class="months" style="margin-top:14px">' +
        BREATH_PATTERNS.map(function (p) {
          var isOn = !!(pacer.on && pacer.pattern && pacer.pattern.id === p.id);
          return '<button class="mchip' + (isOn ? ' on' : '') +
            '" data-act="pacer" data-id="' + p.id + '" aria-pressed="' + isOn + '">' + esc(p.name) + '</button>';
        }).join('') +
        '<button class="mchip" data-act="pacerStop">Stop</button>' +
      '</div>' +
      (pacer.on && pacer.pattern
        ? '<p class="mintro" style="margin-top:12px">' + esc(pacer.pattern.note) + '</p>'
        : '<p class="mintro" style="margin-top:12px">Five patterns. Start with the box.</p>');

    var seqUI;
    if (seq.on) {
      var s = seqFind(seq.id), st = s.steps[seq.step];
      seqUI = '<div class="label">' + esc(s.name) + '</div>' +
        '<div class="card">' +
          '<div class="ds">Step ' + (seq.step + 1) + ' of ' + s.steps.length + '</div>' +
          '<p class="pt" style="margin-top:6px">' + esc(st[0]) + '</p>' +
          '<p class="px">' + esc(st[2]) + '</p>' +
          '<div class="seqtime" id="seq-time">-</div>' +
          '<div class="seqtrack"><div class="seqbar" id="seq-bar"></div></div>' +
          '<button class="keep" data-act="seqStop">Stop</button>' +
        '</div>';
    } else {
      seqUI = '<div class="label">The sequences</div>' +
        '<p class="px" style="color:var(--faint);margin-bottom:14px">Timed, written out, and entirely offline. Move within your own limits.</p>' +
        SEQUENCES.map(function (s) {
          return '<div class="canon"><p class="pt">' + esc(s.name) + '</p>' +
            '<div class="ds">' + s.mins + ' minutes · ' + s.steps.length + ' steps</div>' +
            '<p class="ct" style="margin-top:8px">' + esc(s.note) + '</p>' +
            '<button class="keep" data-act="seqStart" data-id="' + s.id + '">Begin</button></div>';
        }).join('');
    }

    return '' +
      '<div class="kick">Yoga &amp; the disciplined body</div>' +
      '<h1>The Body</h1>' +
      '<p class="note">Every tradition in this book asks something of the body. What follows is what they teach, and the practices to do it with.</p>' +
      '<p class="px" style="text-align:center"><a class="readmini" href="#/reset">Mid-shift? The Walk-In: ninety seconds, one tap</a></p>' +
      pacerUI + seqUI +
      teach +
      '<div class="label">The eight limbs of yoga</div>' +
      '<p class="px" style="color:var(--faint);margin-bottom:16px">Patañjali’s <em>Yoga Sūtras</em> set out eight limbs, <em>ashtanga</em>, of which the postures are only the third. The sequence matters: ethics first, then the body, then the breath, then the mind.</p>' +
      limbs +
      '<div class="label">The practices</div>' +
      '<p class="px" style="color:var(--faint);margin-bottom:16px">Tap any practice to open it. The videos belong to their creators; the titles were checked against YouTube and are refreshed when there is a connection.</p>' +
      vids +
      '<div class="label">For the body this trade builds</div>' +
      '<p class="px" style="color:var(--faint);margin-bottom:16px">The sequences above are the three minute version of this ground, and they run with no connection at all. These are the long version, taught by people who teach it for a living: the sole and the fascia, the calf pump, the hinge that saves a back on a keg, and the wind down for a night that ends at sunrise.</p>' +
      tradeVids +
      '<p class="mintro" style="margin-top:30px">Move within your own limits. Pain is information, not weakness, and none of this is medical advice.</p>';
  },

  after: function () {
    BODY_VIDEOS.concat(TRADE_VIDEOS).forEach(function (v, i) {
      fetchYouTubeTitle(v.id).then(function (info) {
        var el = document.getElementById('vt-' + i);
        /* the baked title is already on the card; repaint only a changed one */
        if (el && info.title && (info.title !== v.title || info.author !== (v.author || ''))) {
          el.textContent = info.title + (info.author ? '  ·  ' + info.author : '');
        }
      }).catch(function () {
        if (v.title) return;   /* a baked title says nothing about the network */
        var el = document.getElementById('vt-' + i);
        /* An honest offline state, not a permanent "Loading…". The framing line
           below the title still says what the practice is for, so the card remains
           useful even when its title cannot be reached. */
        if (el) el.innerHTML = '<a href="https://www.youtube.com/watch?v=' + esc(v.id) +
          '" target="_blank" rel="noopener">Open on YouTube</a>' +
          '<span class="vidnote">: the title needs a connection.</span>';
      });
    });
  }
};
