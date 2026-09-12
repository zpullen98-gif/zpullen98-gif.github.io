/* ═══════════════ CODEX XVIII: WHAT A SCREEN READER IS TOLD ═══════════════

   The other four wings give a page a shape: a header, a main region, a skip
   link at the top, and a place for focus to land after every view change.
   The Codex never did. Its whole body is `<div class="wrap" id="app">`, every
   render() in the chain empties that div and refills it, and whichever button
   the student just pressed is destroyed in the process, so focus falls to
   <body> and a keyboard or screen-reader user starts again from the top of
   the document. In a forty-five question mock that happens forty-five times.

   Four things, all of them in the layer shape, none of them touching what a
   view says or does:

     1. LANDMARKS. After the chain has run, the topbar is moved into a
        <header> and everything else into <main id="view" tabindex="-1">, the
        foot line staying where codex14 put it. The nodes move; nothing is
        rebuilt, so every handler the layers wired survives. The skip link in
        index.html points at that main. Each band of tiles on the home page
        (.modes) is a navigation landmark named after its section head, so
        a screen reader can jump band to band.

     2. FOCUS. Before the chain runs, the focused control is remembered: by
        id, or by its data-ri (the atlas rows and pins), or by its first class
        and its index among controls of that class (the four rank pins). After
        it, the same control is refocused if it came back and is not disabled;
        otherwise focus lands on the verdict for an answered question, or on
        the main region. A control the chain focused itself (the search box,
        the short-answer field) is left alone, and a render that nobody was
        interacting with (first paint, a clock running out) moves nothing.
        Every focus() here passes preventScroll: whether the page goes to the
        top is the chain's decision (core.js scrolls on most views; codex7
        deliberately stays put on the atlas when a region is highlighted), and
        this layer never overrides it.

     3. STATE IN TEXT. A marked option said which it was by tint alone: the
        two tints sit 1.10:1 apart in luminance and vanish together in Windows
        High Contrast. Each marked option now ends in a word: "Correct answer",
        "Your answer, incorrect", or "Your answer, correct". Typography only,
        in the card's own ink; on the question card (core.js mcCard), on the
        Deductive Tasting call (codex6) and on the Master origin call (codex7)
        alike. The four rank pins carry aria-pressed, the
        pattern codex6 already uses for the service rites and shared/oot-home
        uses for which name is studying.

     4. ONE NAME PER THING. The mode that drills the questions you bookmarked
        was titled "Flagged Review" while the button that bookmarks them said
        Bookmark, its own body said "bookmarked questions", and the reset
        prompts say bookmarks. The tile and the mode label now say Bookmark
        Review at their source (codex2 and codex11), parallel to Weakness
        Review; this layer only guards the name against a stale copy. The home
        destination is "Home" in every place that reaches it (core.js and
        codex14 carry that word).

   House rules: a new layer, var/function only at the top level, no pictorial
   glyphs, no em-dashes. Nothing here is persisted, so there is nothing for
   mergeStats to carry. */

/* ═══════════ 1 + 2. landmarks and focus, around render ═══════════ */

var V18_VIEW_NAMES = {
  home: 'Home', quiz: 'Question', results: 'Results', terroir: 'Terroir Atlas',
  flash: 'Flashcards', producers: 'Producers', drillpick: 'Drill by Section',
  dash: 'Dashboard', ency: 'Encyclopedia', sim: 'Exam Simulation'
};

/* What the main region is called when focus lands on it. A known view has a
   name; anything else borrows its own heading, so a layer's view added later
   still announces as something. */
function v18ViewName(main) {
  var name = V18_VIEW_NAMES[S.view];
  if (!name) {
    var h = main.querySelector('.viewhead h2, h2, h3');
    if (h) name = h.textContent.replace(/\s+/g, ' ').trim();
  }
  return name || 'The Sommelier’s Codex';
}

/* Each band of tiles is a navigation landmark, named after the section head
   above it (Today, Learn, More...); a band without a head is "Sections". Only
   attributes are set: the grid itself is not moved or rebuilt. */
function v18Sections(main) {
  Array.prototype.forEach.call(main.querySelectorAll('.modes'), function (g) {
    if (g.getAttribute('role')) return;
    var sec = g.closest ? g.closest('.oot-sec, .homesec') : null;
    var h = sec && sec.querySelector('.oot-sec-head h2, .oot-sec-head h3, .homesec-head h2, .homesec-head h3');
    var name = h ? h.textContent.replace(/\s+/g, ' ').trim() : '';
    g.setAttribute('role', 'navigation');
    g.setAttribute('aria-label', name || 'Sections');
  });
}

function v18Landmarks() {
  var app = document.getElementById('app');
  if (!app) return null;
  var head = null, foot = null;
  var main = document.createElement('main');
  main.id = 'view';
  main.setAttribute('tabindex', '-1');
  Array.prototype.slice.call(app.childNodes).forEach(function (n) {
    if (n.nodeType === 1 && n.classList.contains('topbar')) {
      if (!head) head = document.createElement('header');
      head.appendChild(n);
    } else if (n.nodeType === 1 && n.tagName === 'FOOTER') {
      foot = n;
    } else {
      main.appendChild(n);
    }
  });
  main.setAttribute('aria-label', v18ViewName(main));
  v18Sections(main);
  app.innerHTML = '';
  if (head) app.appendChild(head);
  app.appendChild(main);
  if (foot) app.appendChild(foot);
  return main;
}

/* The control that had focus, in a form that can be looked up again after the
   chain has rebuilt the page. null means nobody was on a control in the app,
   and then focus is not moved at all. */
function v18Signature(a) {
  var app = document.getElementById('app');
  if (!a || !app || a === document.body || !app.contains(a)) return null;
  if (a.id) return { id: a.id };
  var cls = (a.classList && a.classList.length) ? a.classList[0] : '';
  if (!cls || !/^[A-Za-z][\w-]*$/.test(cls)) return { any: true };
  var sel = a.tagName.toLowerCase() + '.' + cls;
  /* the atlas rows and pins carry their region index; that outlives a render */
  if (a.dataset && a.dataset.ri !== undefined) return { sel: sel + '[data-ri="' + a.dataset.ri + '"]' };
  var kin = Array.prototype.slice.call(app.querySelectorAll(sel));
  return { sel: sel, idx: kin.indexOf(a) };
}

function v18Focus(sig, main) {
  if (!sig || !main) return;
  var app = document.getElementById('app');
  var a = document.activeElement;
  /* the chain placed focus itself: leave it there */
  if (a && a !== document.body && app && app.contains(a)) return;
  var back = null;
  try {
    if (sig.id) back = document.getElementById(sig.id);
    else if (sig.sel && sig.idx >= 0) back = app.querySelectorAll(sig.sel)[sig.idx] || null;
    else if (sig.sel) back = app.querySelector(sig.sel);
  } catch (e) { back = null; }
  /* focus() on a disabled control is a no-op by spec: a disabled match is a
     gone control, exactly the Ledger's lesson */
  if (back && back.focus && !back.disabled && app.contains(back)) {
    try { back.focus({ preventScroll: true }); } catch (e) { back.focus(); }
    return;
  }
  var target = null;
  if (S.view === 'quiz' && S.answered) target = document.querySelector('.reveal .verdict');
  if (!target) target = main;
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  /* preventScroll here too: the chain has already decided whether this view
     goes to the top (codex7 keeps the atlas where it is while a region is
     highlighted), and a focus must not undo that */
  try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
}

/* The bookmark tile, named for what the button on every question calls it.
   codex2 now says so at the source; this guards against a stale copy. */
function v18OneName() {
  var t = document.getElementById('t-flag');
  var h = t && t.querySelector('h3');
  if (h && h.textContent !== 'Bookmark Review') h.textContent = 'Bookmark Review';
}

var _v18Render = render;
render = function () {
  var sig = null;
  try { sig = v18Signature(document.activeElement); } catch (e) { sig = null; }
  var out = _v18Render.apply(this, arguments);
  try {
    var main = v18Landmarks();
    v18OneName();
    v18Focus(sig, main);
  } catch (e) { /* a page without landmarks is still a page; never break render */ }
  return out;
};

if (typeof MODE_LABEL === 'object' && MODE_LABEL) MODE_LABEL.flagged = 'Bookmark Review';
if (typeof MODE_NOUNS === 'object' && MODE_NOUNS) MODE_NOUNS.flagged = 'Bookmark Review';

/* ═══════════ 3. a marked option says so in words ═══════════ */

/* Every card that marks an option does it the same way: the class "correct"
   on the right one, "wrong" on a wrong pick, "dim" on the rest. The word
   follows the class; only which index was picked differs by card. */
function v18MarkOpts(box, picked) {
  if (!box || !box.querySelectorAll) return;
  Array.prototype.forEach.call(box.querySelectorAll('.opt'), function (b, i) {
    if (b.querySelector('.optmark')) return;
    var word = '';
    if (b.classList.contains('correct')) word = (i === picked) ? 'Your answer, correct' : 'Correct answer';
    else if (b.classList.contains('wrong')) word = 'Your answer, incorrect';
    if (!word) return;
    var m = document.createElement('span');
    m.className = 'optmark';
    m.textContent = word;
    b.appendChild(m);
  });
}

/* the question card (core.js) */
var _v18McCard = mcCard;
mcCard = function (q) {
  var c = _v18McCard.apply(this, arguments);
  try {
    if (S.answered) v18MarkOpts(c, S.picked);
  } catch (e) { /* the tint is still there; the word is the addition */ }
  return c;
};

/* the Deductive Tasting call (codex6) and, under it at Master, the origin
   call (codex7): the grape options are picked by S.tt.picked, the origin
   options by S.tt.originPicked, and each block is its own .opts */
var _v18TastingView = (typeof tastingView === 'function') ? tastingView : null;
if (_v18TastingView) {
  tastingView = function () {
    var v = _v18TastingView.apply(this, arguments);
    try {
      if (v && v.querySelectorAll && S.tt && S.tt.answered) {
        Array.prototype.forEach.call(v.querySelectorAll('.opts'), function (box) {
          var origin = false, p = box.parentNode;
          while (p && p !== v) { if (p.classList && p.classList.contains('originblock')) { origin = true; break; } p = p.parentNode; }
          var picked = origin ? S.tt.originPicked : S.tt.picked;
          v18MarkOpts(box, (picked === null || picked === undefined) ? -1 : picked);
        });
      }
    } catch (e) { }
    return v;
  };
}

/* the four rank pins: which one is pressed, said as state */
var _v18CourtStrip = (typeof courtStrip === 'function') ? courtStrip : null;
if (_v18CourtStrip) {
  courtStrip = function () {
    var wrap = _v18CourtStrip.apply(this, arguments);
    try {
      wrap.setAttribute('role', 'group');
      wrap.setAttribute('aria-label', 'Court level');
      Array.prototype.forEach.call(wrap.querySelectorAll('button.courtpin'), function (p) {
        p.setAttribute('aria-pressed', p.classList.contains('on') ? 'true' : 'false');
      });
    } catch (e) { }
    return wrap;
  };
}

/* ═══════════ the styles this layer needs ═══════════ */
/* codex.css is not touched: the mark is set in the card's own ink at 6.8:1 on
   the paler tint and 7.5:1 on the greener one, and the forced-colors block
   keeps the two states apart when every tint is stripped. On a phone the
   mark drops under the option text, aligned with it (the key is 16px and the
   gap 10px), instead of squeezing the text into a third of the row. The
   dashboard's Chapter button follows its row as a sibling (codex8), so the
   row's rule moves down to the button and the pair still reads as one line;
   the row itself, which drills the section, keeps 44px of height now that
   the button no longer props it up, and gets the same focus ring in the tree
   whose codex.css never gave it one. */
(function () {
  var css = document.createElement('style');
  css.textContent =
    '.optmark{font-family:\'Cinzel\',serif;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);margin-left:auto;flex:none;padding-left:8px;align-self:center}' +
    '@media (max-width:420px){.opt.correct,.opt.wrong{flex-wrap:wrap}.optmark{flex:1 0 100%;margin-left:0;padding-left:26px;padding-top:2px}}' +
    '.dashrow.actionable{min-height:44px;box-sizing:border-box}' +
    '.dashrow.actionable:focus-visible{outline:2px solid var(--gold);outline-offset:-2px}' +
    '.dashrow.haschapter{border-bottom:0}' +
    '.dashrow.haschapter+.dashprimer{display:flex;align-items:center;width:100%;min-height:44px;margin:0;padding:4px 4px 8px;text-align:left;border-bottom:1px solid rgba(201,162,39,.13)}' +
    '@media (forced-colors: active){' +
      '.opt.correct{outline:3px double CanvasText;outline-offset:-4px}' +
      '.opt.wrong{outline:2px dashed CanvasText;outline-offset:-3px}' +
      '.courtpin.on,.flagbtn.on{outline:2px solid CanvasText;outline-offset:-2px}' +
    '}';
  document.head.appendChild(css);
})();
