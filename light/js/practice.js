/* First Light: the practice engine.

   The artifact's Body chapter was six YouTube embeds. Good ones, but a practice you
   cannot do without a connection is not a practice you can rely on, and the app's
   own text argues that what matters is return rather than intensity.

   So: a breath pacer, interval timers, and written sequences, all of which run with
   no network and no third party. The videos stay as a supplement.

   Everything here is driven by requestAnimationFrame against a wall-clock start
   time, never by counting frames or by setInterval. A backgrounded tab throttles
   timers to once a second or stops them, and a pacer that drifts is worse than no
   pacer: you would be breathing to a rhythm the screen has lost. */

var BREATH_PATTERNS = [
  { id: 'box', name: 'Box breath', phases: [['In', 4], ['Hold', 4], ['Out', 4], ['Hold', 4]],
    note: 'Four equal sides. Used by people who need a steady hand under pressure, and the easiest place to start. Before the rush is exactly what it is for.' },
  { id: 'coherent', name: 'Coherent breath', phases: [['In', 5.5], ['Out', 5.5]],
    note: 'About five and a half seconds each way: roughly five breaths a minute, the rate at which heart rhythm and breath fall into step.' },
  { id: '478', name: 'Four–seven–eight', phases: [['In', 4], ['Hold', 7], ['Out', 8]],
    note: 'A long exhale weights the parasympathetic side. Useful at night; too settling before anything demanding.' },
  { id: 'ujjayi', name: 'Even breath', phases: [['In', 6], ['Out', 6]],
    note: 'Equal in and out, no pause. The breath that underlies most āsana practice.' },
  { id: 'extended', name: 'Extended exhale', phases: [['In', 4], ['Out', 8]],
    note: 'Out twice as long as in. The oldest lever there is for turning one’s own state down.' }
];

var SEQUENCES = [
  { id: 'morning', name: 'The morning sequence', mins: 8,
    note: 'For a body that has been horizontal for eight hours. Nothing here needs warming up first.',
    steps: [
      ['Standing, eyes closed', 60, 'Feet under hips. Notice the weight in each foot before you move anything.'],
      ['Arms overhead, side bend', 45, 'Both sides. Reach up first, then over: length before angle.'],
      ['Forward fold, knees soft', 60, 'Let the head hang. Bend the knees as much as it takes to let the back release.'],
      ['Halfway lift', 30, 'Hands to shins, flat back. This is where the spine wakes up.'],
      ['Low lunge, right', 60, 'Back knee down. Hips forward, not down.'],
      ['Low lunge, left', 60, 'Same on the other side. Notice which one is harder.'],
      ['Downward dog', 90, 'Bend the knees freely. Length in the spine matters more than straight legs.'],
      ['Cat and cow', 60, 'On hands and knees, moving with the breath. In as the chest opens, out as the back rounds.'],
      ['Child’s pose', 90, 'Knees wide, arms forward. Breathe into the back of the ribs.'],
      ['Sitting', 60, 'However you sit. The posture the rest of the practice is built on.']
    ] },
  { id: 'evening', name: 'Unwinding', mins: 10,
    note: 'For the end of a working day. Entirely on the floor, and none of it requires strength. Legs up the wall is there on purpose: a standing shift pools blood in the feet and calves, and this is how they hand it back.',
    steps: [
      ['Legs up the wall', 180, 'Hips close to the wall or a foot away, whichever lets the low back rest.'],
      ['Reclined twist, right', 90, 'Knees to one side, shoulders staying down. Do not force the shoulder.'],
      ['Reclined twist, left', 90, 'The other side, same instruction.'],
      ['Knees to chest', 60, 'Rock slowly side to side if it helps.'],
      ['Reclined bound angle', 120, 'Soles together, knees wide, something under each thigh if they hang.'],
      ['Śavāsana', 180, 'Flat, arms away from the body, palms up. Do not skip this; it is where the work lands.']
    ] },
  { id: 'feet', name: 'Feet and calves', mins: 3,
    note: 'For the standing trade, in work shoes, in a doorway. The feet carry every hour of the shift; three minutes returns some of the interest.',
    steps: [
      ['Slow calf raises', 40, 'Rise on both feet, three seconds up, three down. The calf is the second heart; this is the pump that clears a standing shift’s pooling.'],
      ['Wall calf stretch, right', 30, 'Hands on the wall, right leg back, heel down. Straight knee first, then a soft bend for the deeper fibres.'],
      ['Wall calf stretch, left', 30, 'The other side. The side that plants at the well is usually tighter.'],
      ['Ankle circles', 30, 'One foot off the floor, big slow circles both directions. Balance on the standing leg is part of the work.'],
      ['Sole roll', 50, 'Roll the arch of each foot over a bottle laid on its side, slow, with weight. The plantar fascia has been loaded since doors.']
    ] },
  { id: 'wrists', name: 'Wrists and grip', mins: 3,
    note: 'For hands that shake tins, carry trays, and hold a knife, the repetitive strain nobody stretches for until it complains.',
    steps: [
      ['Flexor stretch, right', 30, 'Arm out, palm up; draw the fingers gently back with the other hand. The forearm’s underside, the shaking muscles.'],
      ['Flexor stretch, left', 30, 'The other arm. The tin hand will tell you which one it is.'],
      ['Extensor stretch, right', 30, 'Palm down now, fingers drawn toward you. The top of the forearm, the tray and knife side of the strain.'],
      ['Extensor stretch, left', 30, 'The other arm, same slow pull.'],
      ['Finger fans', 30, 'Spread the fingers wide, hold, release into a loose fist. Ten slow rounds. Grip is a muscle; so is letting go.']
    ] },
  { id: 'neck', name: 'Neck and shoulders', mins: 3,
    note: 'For pass-window posture and the tray shoulder. All of it standing, none of it conspicuous.',
    steps: [
      ['Chin tucks', 30, 'Draw the chin straight back, a horizontal slide, not a nod. The head has been forward over a bar top all night.'],
      ['Ear to shoulder, right', 30, 'Let the right ear sink toward the shoulder, left arm hanging heavy. No pulling; weight is enough.'],
      ['Ear to shoulder, left', 30, 'The other side. The tray side will speak up.'],
      ['Doorway chest opener', 45, 'Forearm on the door frame, elbow at shoulder height, step gently through. The front of the shoulder gives back the pass-window hunch.'],
      ['Slow shoulder rolls', 45, 'Big circles backward, with the breath. Down the back on the exhale.']
    ] },
  { id: 'close', name: 'After close', mins: 12,
    note: 'For the hour after last call, when the body is still at service pace and sleep is nowhere near. Entirely on the floor. This is the other way down.',
    steps: [
      ['Extended exhale, lying down', 120, 'Flat on your back, one hand on the belly. In for four, out for eight: the exhale is the oldest lever for turning your own state down. Count it; the counting is part of the work.'],
      ['Legs up the wall', 180, 'Hips close to the wall or a foot away. This is where the feet and calves hand back the shift.'],
      ['Reclined twist, right', 90, 'Knees to one side, arms wide, shoulders staying down. The low back has been loaded for hours; give it the turn.'],
      ['Reclined twist, left', 90, 'The other side. Notice which side held the tray.'],
      ['Knees to chest', 60, 'Rock slowly side to side. Nothing to achieve.'],
      ['Śavāsana', 180, 'Flat, arms away from the body, palms up. The shift is over. Let the floor hold what is left of it.']
    ] },
  { id: 'rehearsal', name: 'The Rehearsal', mins: 3,
    note: 'Premeditatio malorum, time-boxed. Rehearsal is choosing your response in advance; rumination is losing the evening to it. Three minutes, one small thing, and it always ends in the return. On a raw day, skip this and name Grief or Hope in the morning picker instead: this drill is for steady ground.',
    steps: [
      ['Settle', 30, 'Sit or stand still. Slow the breath: in four, out six. Nothing has happened.'],
      ['Choose one small thing', 30, 'One only, and small: a smooth service, decent tips, a calm room. Not health, not the people you love: the drill is for the shift, and one item is the whole discipline.'],
      ['Rehearse losing it', 60, 'Picture it plainly gone: the room slams, the tips are thin, the calm breaks. Now rehearse your first response: the breath, the sentence, the next task. They will be rude; it will get loud; none of it will be aimed at you.'],
      ['The return', 45, 'It has not happened. The shift is still whole and in front of you, and you have already met its worst hour once. Notice what you have tonight that the rehearsal just threatened.'],
      ['Close', 15, 'One full breath. Done, do not reopen it. The rehearsal works because it ends.']
    ] },
  { id: 'sit', name: 'Sitting', mins: 20,
    note: 'Not a posture routine. The seat, the breath, and twenty minutes.',
    steps: [
      ['Settling', 120, 'Find the position you can hold. Cross-legged on a cushion, kneeling, or a chair with both feet down: the tradition cares that it is steady and comfortable, not that it is impressive.'],
      ['Following the breath', 600, 'Attention at the nostrils or the belly. When you notice you have wandered, that noticing IS the practice. Return without comment.'],
      ['Open attention', 360, 'Let the object go. Whatever arises, note it and let it pass.'],
      ['Closing', 120, 'Widen to the room, the sounds, the light. Move slowly when you get up.']
    ] }
];

/* --- the pacer --- */
var pacer = { on: false, raf: null, start: 0, pattern: null, cycles: 0 };

function pacerTotal(p) { return p.phases.reduce(function (s, x) { return s + x[1]; }, 0); }

function pacerStart(id) {
  var p = null;
  for (var i = 0; i < BREATH_PATTERNS.length; i++) if (BREATH_PATTERNS[i].id === id) p = BREATH_PATTERNS[i];
  if (!p) return;
  pacer.pattern = p;
  pacer.start = performance.now();
  pacer.on = true;
  pacer.cycles = 0;
  pacer.counted = false;
  pacerTick();
}

function pacerStop() {
  pacer.on = false;
  if (pacer.raf) cancelAnimationFrame(pacer.raf);
  pacer.raf = null;
  var disc = document.getElementById('pacer-disc');
  if (disc) disc.style.transform = 'scale(1)';
  var lab = document.getElementById('pacer-label');
  if (lab) lab.textContent = 'Ready';
  var cnt = document.getElementById('pacer-count');
  if (cnt) cnt.textContent = '';
}

function pacerTick() {
  if (!pacer.on) return;
  var p = pacer.pattern, total = pacerTotal(p);
  /* Elapsed from the wall clock, not accumulated per frame: a throttled or skipped
     frame then costs nothing, and the pacer stays true to the actual seconds. */
  var elapsed = (performance.now() - pacer.start) / 1000;
  pacer.cycles = Math.floor(elapsed / total);
  /* Five full rounds is a morning's breathing rather than a tap, so that is
     where Breathe ticks itself. The latch keeps sixty frames a second from
     writing sixty times. */
  if (pacer.cycles >= 5 && !pacer.counted) {
    pacer.counted = true;
    if (typeof flMorningTick === 'function') flMorningTick('breathe');
  }
  var t = elapsed % total;

  var acc = 0, phase = p.phases[0], idx = 0;
  for (var i = 0; i < p.phases.length; i++) {
    if (t < acc + p.phases[i][1]) { phase = p.phases[i]; idx = i; break; }
    acc += p.phases[i][1];
  }
  var within = (t - acc) / phase[1];

  /* Scale: grow on the in-breath, hold, shrink on the out. Eased so the turn at each
     end is not a jerk: the body follows a curve more easily than a ramp. */
  var lo = 0.55, hi = 1.0, scale;
  var label = phase[0];
  var before = 'In';
  for (var k = idx - 1; k >= 0; k--) { if (p.phases[k][0] !== 'Hold') { before = p.phases[k][0]; break; } }
  var ease = function (x) { return 0.5 - 0.5 * Math.cos(Math.PI * x); };

  if (label === 'In') scale = lo + (hi - lo) * ease(within);
  else if (label === 'Out') scale = hi - (hi - lo) * ease(within);
  else scale = (before === 'In') ? hi : lo;

  var disc = document.getElementById('pacer-disc');
  if (disc) disc.style.transform = 'scale(' + scale.toFixed(3) + ')';
  var lab = document.getElementById('pacer-label');
  if (lab) lab.textContent = label + ' · ' + Math.ceil(phase[1] - (t - acc));
  var cnt = document.getElementById('pacer-count');
  if (cnt) cnt.textContent = pacer.cycles + (pacer.cycles === 1 ? ' breath' : ' breaths');

  pacer.raf = requestAnimationFrame(pacerTick);
}

/* --- the sequence timer --- */
var seq = { on: false, id: null, step: 0, start: 0, raf: null };

/* What a finished sequence writes. Only a natural finish reaches here: Stop
   records nothing, which is the rule the Walk-In established and the reason
   these counts can be trusted. A movement also counts toward the programme's
   level and ticks Move on the morning page. */
function seqRecord(id) {
  var k = flToday();
  FL.sessions[k] = (FL.sessions[k] || 0) + 1;
  if (String(id).indexOf('mv-') === 0) {
    FL.moves[k] = (FL.moves[k] || 0) + 1;
    if (typeof flMorningTick === 'function') flMorningTick('move');
  }
  flSave();
}

/* The eight sequences here, and the movement programme in data-move.js, which
   uses this same object shape on purpose so the timer needs no changes. The
   second lookup is guarded because practice.js loads before the data file. */
function seqFind(id) {
  for (var i = 0; i < SEQUENCES.length; i++) if (SEQUENCES[i].id === id) return SEQUENCES[i];
  if (typeof MOVES !== 'undefined') {
    for (var j = 0; j < MOVES.length; j++) if (MOVES[j].id === id) return MOVES[j];
  }
  return null;
}

function seqStart(id, from) {
  var s = seqFind(id);
  if (!s) return;
  seq.on = true; seq.id = id; seq.step = from || 0; seq.start = performance.now();
  seqTick();
}
function seqStop() {
  seq.on = false;
  if (seq.raf) cancelAnimationFrame(seq.raf);
  seq.raf = null;
  render();
}
function seqTick() {
  if (!seq.on) return;
  var s = seqFind(seq.id);
  if (!s || seq.step >= s.steps.length) { seq.on = false; seqRecord(seq.id); render(); announce('Sequence complete.'); return; }
  var step = s.steps[seq.step];
  var elapsed = (performance.now() - seq.start) / 1000;
  var left = Math.max(0, step[1] - elapsed);

  var t = document.getElementById('seq-time');
  if (t) t.textContent = Math.floor(left / 60) + ':' + String(Math.floor(left % 60)).padStart(2, '0');
  var bar = document.getElementById('seq-bar');
  if (bar) bar.style.width = Math.min(100, (elapsed / step[1]) * 100).toFixed(1) + '%';

  if (left <= 0) {
    seq.step++;
    seq.start = performance.now();
    if (seq.step >= s.steps.length) { seq.on = false; seqRecord(seq.id); render(); announce('Sequence complete.'); return; }
    render();
    /* the loop must re-arm itself: a bare return here froze every sequence
       at its first step boundary, since nothing else ever re-enters the tick */
    seq.raf = requestAnimationFrame(seqTick);
    return;
  }
  seq.raf = requestAnimationFrame(seqTick);
}

/* Leaving the page must stop both, or a pacer keeps running invisibly and the reader
   comes back to a breath count from an hour ago. */
window.addEventListener('hashchange', function () { pacerStop(); if (seq.on) { seq.on = false; if (seq.raf) cancelAnimationFrame(seq.raf); } });
