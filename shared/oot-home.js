/* ============ Outside Of Time: home screen components ============
   Builders that return HTML STRINGS, deliberately.

   The Ledger's renderHome() concatenates a string and assigns innerHTML; the
   Codex builds nodes and appends them; the World Table is Svelte. A string is
   the only currency all three already accept, and `el(html)` turns one into a
   node in two of the three wings anyway. Returning strings also keeps this file
   free of any DOM assumptions, which is what lets the same code run inside a
   Svelte component with {@html}.

   Nothing here reads or writes wing state. Every builder takes what it needs as
   an argument, so a wing can feed it real numbers from its own scheduler
   without this file knowing that a scheduler exists. That is what keeps the
   Codex's SRS and the Ledger's SM-2 both intact.

   Load after oot-profiles.js.
   ============ */

(function () {
  'use strict';

  var OOT = (window.OOT = window.OOT || {});
  if (OOT.home) return;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function attrs(o) {
    var out = '';
    for (var k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k) || o[k] == null) continue;
      out += ' ' + k + '="' + esc(o[k]) + '"';
    }
    return out;
  }

  /* ---- a band ---------------------------------------------------------
     name  the word that must be identical across all three wings
     blurb one line saying what the band is for, in the wing's own voice */
  function section(name, blurb, inner) {
    return '<section class="oot-sec">' +
      '<div class="oot-sec-head"><h3>' + esc(name) + '</h3>' +
      (blurb ? '<span>' + esc(blurb) + '</span>' : '') + '</div>' +
      (inner || '') + '</section>';
  }

  /* ---- TODAY ----------------------------------------------------------
     One card. One decision. The counts come from the wing's own scheduler.

       due      reviews the scheduler says are owed
       fresh    new items it would introduce
       mins     rough minutes, so a person on a break knows if there is time
       line     an override when a wing wants its own sentence
       cta      the button label
       act      whatever the wing's delegated click handler expects,
                e.g. 'data-act="sess-start"' or 'id="oot-today-go"'

     The empty state is not a failure state. A person who is up to date should
     be told so and offered something optional, never shown a zero. */
  function todayCard(o) {
    o = o || {};
    var due = o.due | 0, fresh = o.fresh | 0;
    var line;

    if (o.line) {
      line = esc(o.line);
    } else if (due || fresh) {
      var bits = [];
      if (due) bits.push('<span class="oot-today-n">' + due + '</span> ' +
        (due === 1 ? 'review due' : 'reviews due'));
      if (fresh) bits.push('<span class="oot-today-n">' + fresh + '</span> new');
      line = bits.join(' and ');
    } else {
      line = 'Nothing owed. You are current.';
    }

    var sub = o.sub != null ? esc(o.sub)
      : (due || fresh)
        ? (o.mins ? 'About ' + (o.mins | 0) + ' minutes.' : '')
        : 'Study anyway if you have ten minutes, or come back tomorrow.';

    var label = o.cta || ((due || fresh) ? 'Start' : 'Study anyway');
    var btn = '<button class="' + esc(o.btnClass || 'btn') + ' oot-today-go"' +
      (o.act ? ' ' + o.act : '') + '>' + esc(label) + '</button>';

    return '<div class="oot-today">' +
      '<div class="oot-today-main">' +
        '<div class="oot-today-line">' + line + '</div>' +
        (sub ? '<div class="oot-today-sub">' + sub + '</div>' : '') +
      '</div>' + btn + '</div>';
  }

  /* ---- the shared streak ---------------------------------------------
     Reads oot-profiles, because a person who drilled cocktails today has
     studied today whichever wing they are looking at now. */
  function streak() {
    if (!OOT.profiles) return '';
    var n = OOT.profiles.streak();
    if (!n) return '';
    return '<span class="oot-streak"><b>' + n + '</b> ' +
      (n === 1 ? 'day' : 'days') + ' running</span>';
  }

  /* ---- readiness ------------------------------------------------------ */
  function readiness(label, pct) {
    var p = Math.max(0, Math.min(100, Math.round(pct || 0)));
    return '<div class="oot-meter">' +
      '<div class="oot-meter-top"><span>' + esc(label) + '</span><b>' + p + '%</b></div>' +
      '<div class="oot-meter-track"><div class="oot-meter-fill" style="width:' + p + '%"></div></div>' +
      '</div>';
  }

  /* ---- the first path -------------------------------------------------
     steps  [{id, t, mins, act}]
     done   a set-like object or array of completed ids

     Shown until it is finished, then it stops taking up room: a course a
     person completed three months ago is not what they came for today. */
  function firstPath(steps, done, opts) {
    steps = steps || [];
    if (!steps.length) return '';
    opts = opts || {};
    var isDone = Array.isArray(done)
      ? function (id) { return done.indexOf(id) > -1; }
      : function (id) { return !!(done && done[id]); };

    var n = 0;
    var rows = steps.map(function (s) {
      var d = isDone(s.id);
      if (d) n++;
      return '<button class="oot-path-row' + (d ? ' done' : '') + '"' +
        (s.act ? ' ' + s.act : '') + attrs({ 'data-path-step': s.id }) + '>' +
        '<span class="oot-path-mark">' + (d ? '✓' : '○') + '</span>' +
        '<span class="oot-path-t">' + esc(s.t) + '</span>' +
        '<span class="oot-path-mins">' + (s.mins ? (s.mins | 0) + ' min' : '') + '</span>' +
        '</button>';
    }).join('');

    if (n === steps.length && !opts.keepWhenDone) return '';

    return '<div class="oot-path-progress">' + n + ' of ' + steps.length + ' done</div>' +
      '<div class="oot-path">' + rows + '</div>';
  }

  /* ---- who is studying ------------------------------------------------
     Deliberately plain and always visible when a roster exists. Hiding it
     behind a menu is how two people end up sharing one record.

     With no roster at all it renders a single invitation rather than nothing,
     because a venue that never discovers profiles is a venue whose manager
     view stays empty forever. */
  function who(opts) {
    if (!OOT.profiles) return '';
    opts = opts || {};
    var list = OOT.profiles.list();
    var cur = OOT.profiles.current();

    if (!list.length) {
      return '<div class="oot-who"><span class="oot-who-label">Who is studying?</span>' +
        '<button class="oot-chip" data-oot-profile="new">Add your name</button></div>';
    }

    var chips = list.map(function (p) {
      var on = !!(cur && p.id === cur.id);
      /* aria-pressed, not colour alone: which name is studying is the whole
         point of the row, and a gold chip says nothing to a screen reader
         or to anyone who cannot pick the gold out of the parchment */
      return '<button class="oot-chip' + (on ? ' on' : '') + '"' +
        attrs({ 'data-oot-profile': p.id, 'aria-pressed': on ? 'true' : 'false' }) + '>' +
        esc(p.name) + '</button>';
    }).join('');

    /* Send my record: the current person's slice of this device, as one file
       for a manager's Pass. The line under it says what the file holds, so
       nobody sends a Codex record expecting the kitchen record to be in it.
       opts.send === false leaves both out for a wing that has its own room
       for this. */
    var send = '';
    if (cur && opts.send !== false) {
      send = '<button class="oot-chip" data-oot-send="' + esc(cur.id) + '">Send my record</button>' +
        '<span class="oot-today-sub oot-who-note" style="flex:1 1 100%;margin:0">' +
        'Send my record holds the Codex, Ledger, First Light and Calendar records on this ' +
        'device for ' + esc(cur.name) + '. The World Table\'s kitchen record travels by ' +
        'its own export on the Table\'s My Menu page.</span>';
    }

    return '<div class="oot-who"><span class="oot-who-label">Studying</span>' + chips +
      '<button class="oot-chip" data-oot-profile="new" aria-label="Add another name">' +
      '<span aria-hidden="true">+</span></button>' +
      (opts.streak !== false ? streak() : '') + send + '</div>';
  }

  /* ---- wiring ---------------------------------------------------------
     One delegated listener for the profile chips, installed once.

     SWITCHING RELOADS THE PAGE, deliberately. A wing is a stack of a dozen
     layers, each of which normalises the store its own way at boot: the Codex
     alone fills in ST.q, ST.days, ST.flags, ST.paceDays and more across three
     files. Swapping the object underneath them at runtime means replicating
     every one of those initialisations from the outside and getting each right
     forever, and the first attempt at that crashed on a substructure a later
     layer assumed. A reload re-runs the real thing.

     It costs a few hundred milliseconds on an action a person takes when they
     pick up the tablet, and it buys correctness across every wing and every
     future layer. Programmatic switches do not reload, so tests stay fast. */
  /* window.prompt and window.confirm are the default: one line each, and they
     work in every browser. Some webviews (an app's embedded browser, a kiosk
     shell) have no prompt(), or throw "prompt() is not supported" when it is
     called, and that took the whole Add-your-name click down with it. ask()
     answers undefined when the dialog is missing or throws, and the caller
     falls back to a small form in the who row with the same two decisions. */
  function ask(kind, msg) {
    var fn = window[kind];
    if (typeof fn !== 'function') return undefined;
    try { return fn.call(window, msg); } catch (e) { return undefined; }
  }

  /* Every unnamespaced record a wing writes, plus the World Table's flag
     (contract C): the Table keeps its kitchen record in IndexedDB, where this
     cannot look, so it leaves 'world-table-has-history-v1' = '1' on its first
     save. Without that, the first name typed on a Table-only device would
     never be asked whether the record is theirs. */
  var HISTORY_KEYS = ['bartenders-ledger-v1', 'codexStats', 'firstlight-v1',
                      'cfl-journals-v1', 'cfl-bookmarks-v1', 'cfl-fnb-v1', 'cfl-manifest-v1',
                      'world-table-has-history-v1', 'world-table-summary-v1'];
  function hasHistory() {
    try {
      for (var hi = 0; hi < localStorage.length; hi++) {
        if (HISTORY_KEYS.indexOf(localStorage.key(hi)) > -1) return true;
      }
    } catch (e) {}
    return false;
  }

  /* ---- send my record ------------------------------------------------
     One file, three roads: the share sheet where it takes files (a phone), a
     download where it does not (a desktop browser), and the clipboard where
     neither works (a kiosk webview). The wrapper around exportProfile() is
     what pass/index.html reads back; the Pass also accepts the bare record. */
  function slug(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'record';
  }

  function note(row, text) {
    if (!row) return;
    var n = row.querySelector('.oot-who-note');
    if (!n) {
      n = document.createElement('span');
      n.className = 'oot-today-sub oot-who-note';
      n.style.cssText = 'flex:1 1 100%;margin:0';
      row.appendChild(n);
    }
    n.setAttribute('aria-live', 'polite');
    n.textContent = text;
  }

  function sendRecord(row) {
    var P = OOT.profiles;
    var p = P && P.current();
    if (!p) return;
    var rec = P.exportProfile(p.id);
    if (!rec) { note(row, 'There is nothing to send yet.'); return; }
    /* A name typed a minute ago has no record under it yet, and the Pass
       refuses an empty file. Say so here rather than let someone send a file
       that can only be turned away at the other end. */
    if (!rec.keys || !Object.keys(rec.keys).length) {
      note(row, 'There is nothing to send yet. Study in a wing first, then the record has something in it.');
      return;
    }
    var day = typeof P.dayKey === 'function' ? P.dayKey(0) : new Date().toISOString().slice(0, 10);
    var blob = { app: 'outside-of-time', version: 1, exported: new Date().toISOString(),
                 profile: { name: p.name }, record: rec };
    var text = JSON.stringify(blob);
    var fname = 'outside-of-time-record-' + slug(p.name) + '-' + day + '.json';
    var title = 'Outside Of Time record for ' + p.name;

    function copied() {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        note(row, 'This browser cannot share, save or copy, so the record stays here.');
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
        note(row, 'Copied to the clipboard. Paste it into a message to your manager, who saves it as a .json file and opens it with Receive a record on The Pass.');
      }, function () {
        note(row, 'This browser would not copy the record. Try again from a different browser.');
      });
    }

    function download() {
      try {
        if (typeof Blob !== 'function' || typeof URL === 'undefined' || !URL.createObjectURL) { copied(); return; }
        var url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
        var a = document.createElement('a');
        a.href = url; a.download = fname; a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { try { a.remove(); URL.revokeObjectURL(url); } catch (e) {} }, 4000);
        note(row, 'Saved as ' + fname + '. Send that file to your manager, who opens it with Receive a record on The Pass.');
      } catch (e) { copied(); }
    }

    try {
      if (navigator.share && navigator.canShare && typeof File === 'function') {
        var file = new File([text], fname, { type: 'application/json' });
        if (navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], title: title }).then(function () {
            note(row, 'Sent. Your manager opens it with Receive a record on The Pass.');
          }, function (err) {
            if (err && err.name === 'AbortError') return;   /* they closed the sheet */
            download();
          });
          return;
        }
      }
    } catch (e) {}
    download();
  }

  /* The inline fallback. One form at a time in the row; Cancel removes it and
     changes nothing, exactly as cancelling the dialog does. */
  function inlineForm(row, o) {
    if (!row) return;
    var old = row.querySelector('.oot-who-form');
    if (old) old.remove();
    var f = document.createElement('form');
    f.className = 'oot-who-form';
    f.innerHTML = (o.text ? '<p>' + esc(o.text) + '</p>' : '') +
      (o.input ? '<input type="text" maxlength="32" autocomplete="off" aria-label="' + esc(o.input) + '" placeholder="' + esc(o.input) + '">' : '') +
      '<button type="submit" class="oot-chip on">' + esc(o.ok) + '</button>' +
      '<button type="button" class="oot-chip" data-oot-who-cancel>' + esc(o.cancel || 'Cancel') + '</button>';
    row.appendChild(f);
    var input = f.querySelector('input');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = input ? input.value : '';
      f.remove();
      o.onOk(value);
    });
    f.querySelector('[data-oot-who-cancel]').addEventListener('click', function () { f.remove(); });
    try { (input || f.querySelector('button')).focus(); } catch (e) {}
  }

  function bindWho(root, rerender) {
    if (!root || root.__ootWhoBound) return;
    root.__ootWhoBound = true;

    function finish(switched) {
      if (switched) { window.location.reload(); return; }
      if (typeof rerender === 'function') rerender();
    }

    /* A typed name, from the dialog or the form: the same road from here. */
    function named(trimmed, row) {
      if (!trimmed) return;
      /* The first name on a device that already has progress adopts it,
         rather than starting an empty record beside months of work. */
      if (!OOT.profiles.list().length) {
        /* The first name on a device INHERITS every unnamespaced record on it:
           months of ledger and codex history, the whole First Light year, the
           almanac's journals. That is right when the person naming themselves
           is the person who made it, and wrong when a second family member
           types their name first. Ask, once, only when there is something to
           inherit. Cancelling leaves the roster empty rather than creating a
           non-legacy profile, because adopt() is only reachable while the
           roster is empty: a plain profile here would strand the existing
           record behind a key nobody reads. */
        if (hasHistory()) {
          var question = 'This device already has study history on it. Is it yours, ' +
                         trimmed + '? It will be kept under your name.';
          var ok = ask('confirm', question);
          if (ok === undefined) {
            inlineForm(row, { text: question, ok: 'Yes, it is mine', cancel: 'No',
                              onOk: function () { OOT.profiles.adopt(trimmed); finish(true); } });
            return;
          }
          if (!ok) return;
        }
        OOT.profiles.adopt(trimmed); finish(true);
        return;
      }
      finish(OOT.profiles.switch(OOT.profiles.add(trimmed).id));
    }

    root.addEventListener('click', function (e) {
      if (!OOT.profiles || !e.target.closest) return;
      var s = e.target.closest('[data-oot-send]');
      if (s) {
        e.preventDefault();
        sendRecord((s.closest && s.closest('.oot-who')) || s.parentNode);
        return;
      }
      var b = e.target.closest('[data-oot-profile]');
      if (!b) return;
      var v = b.getAttribute('data-oot-profile');
      if (v === 'new') {
        var row = (b.closest && b.closest('.oot-who')) || b.parentNode;
        var label = 'Name (a first name is plenty)';
        var name = ask('prompt', label);
        if (name === undefined) {
          inlineForm(row, { input: label, ok: 'Save',
                            onOk: function (value) { named(String(value).trim(), row); } });
          return;
        }
        if (name == null) return;
        named(String(name).trim(), row);
      } else {
        finish(OOT.profiles.switch(v));
      }
    });
  }

  OOT.home = {
    esc: esc,
    section: section,
    todayCard: todayCard,
    streak: streak,
    readiness: readiness,
    firstPath: firstPath,
    who: who,
    bindWho: bindWho,
    sendRecord: sendRecord,
    hasHistory: hasHistory
  };
})();
