/* First Light: the movement programme.

   The physical half of the morning. One timed session a day, on the morning
   page, drawn from a week with a real shape rather than a shuffle.

   WHO IT IS WRITTEN FOR. Somebody who stands on a hard floor for ten hours,
   carries trays on one side, sleeps late and badly, and has a flat with no
   equipment and no floor space. Nothing here needs a mat, a weight, or a room
   you do not have. Every session can be done in a metre of space beside a bed,
   most of it standing, in bare feet, in whatever you slept in.

   THE WEEK. Seven focuses, one per weekday, rotated by FL.prefs.weekAnchor
   exactly as PRACTICES is, so the restorative day lands on the reader's own
   rest day rather than on a calendar Sunday they work. A week that repeats is
   a week the body can adapt to; a random pick every morning is exercise, not
   training.

   THE LEVELS. Three per focus, and a level is reached by work done, never by
   consecutive days. Time away costs nobody their place: the count only rises.
   Level 2 opens at 14 completed sessions, level 3 at 42.

   THE SHAPE. Each session is the same object SEQUENCES uses in practice.js,
   so the existing timer runs it with no changes:
     { id, name, mins, note, steps: [[title, seconds, instruction], ...] }
   plus { focus, level, why }. Ids are prefixed mv- so they cannot collide
   with the eight sequences already in practice.js.

   THE WHY LINE. Every session says what it is for in one sentence. A movement
   a person understands is one they do again on a morning they do not want to.

   NOT MEDICAL ADVICE. Nothing here treats an injury. Pain that is sharp, or
   that is still there tomorrow, is a doctor's business and not this app's. */

const MOVE_WEEK = [
  { id: 'mobility', name: 'Mobility', line: 'Every joint through its range, head to floor.' },
  { id: 'legs',     name: 'Legs and hips', line: 'The engine that carries you through a double.' },
  { id: 'feet',     name: 'Feet and calves', line: 'The part of you the trade wears out first.' },
  { id: 'back',     name: 'Upper back and shoulders', line: 'Undoing the tray, the rail and the phone.' },
  { id: 'chain',    name: 'Low back and the chain behind you', line: 'The hinge that saves your back for thirty years.' },
  { id: 'breath',   name: 'Breath and the nervous system', line: 'Getting out of the shift and back into your body.' },
  { id: 'restore',  name: 'Restoration', line: 'The day the work is done to you, not by you.' }
];

const MOVES = [
  /* ═══════════ MOBILITY ═══════════ */
  {
    id: 'mv-mobility-1', focus: 'mobility', level: 1, name: 'The unlock', mins: 4,
    why: 'A joint that is not taken through its range each day quietly gives that range up. This is the cheapest insurance in the programme.',
    note: 'Standing, bare feet, a metre of space. Nothing here should hurt.',
    steps: [
      ['Neck, slow', 45, 'Chin toward one shoulder, then the other, as slowly as you can stand. Then ear toward shoulder each side. Never roll the head backwards.'],
      ['Shoulders', 45, 'Big slow circles backwards, as large as the joint will make. Ten back, then five forward.'],
      ['Spine, standing', 60, 'Hands on thighs. Round the back and drop the head, then arch and lift the chest. Move with the breath, out as you round, in as you arch.'],
      ['Hips', 45, 'Hands on hips, slow circles one way then the other. Let the knees soften. This is the joint that stiffens on a bar mat.'],
      ['Ankles', 45, 'Weight on one leg, the other toe on the floor, circle the ankle both ways. Swap. Your balance will be worse on one side; that is the point.']
    ]
  },
  {
    id: 'mv-mobility-2', focus: 'mobility', level: 2, name: 'The full unlock', mins: 6,
    why: 'The same sweep, with the thoracic spine and the wrists added: the two places a service job locks down hardest and nobody stretches.',
    note: 'Standing. A wall or a doorway helps for the rotation.',
    steps: [
      ['Neck and jaw', 45, 'Slow half circles front only. Then unclench the jaw, let the tongue drop off the roof of the mouth, and breathe out through the mouth twice.'],
      ['Shoulders and scapulae', 45, 'Shoulder circles backwards, then pull the shoulder blades together and down and hold five seconds, five times.'],
      ['Thoracic rotation', 60, 'Feet planted, hands on the back of your head. Turn the ribcage one way as far as it goes, breathe out, turn a little further. Five each side.'],
      ['Spine, wave', 60, 'Standing cat and cow, slowly, then let it become a wave from the tailbone up to the head.'],
      ['Hips, wide', 60, 'Hip circles, then step wide and shift your weight side to side over a bent knee. Feel the inner thigh of the straight leg.'],
      ['Wrists and forearms', 45, 'Palms together at the chest, lower the hands until you feel the forearms. Then backs of the hands together and lift. Fifteen seconds each.'],
      ['Ankles and feet', 45, 'Ankle circles both ways on each leg, then rise onto the toes and lower slowly five times.']
    ]
  },
  {
    id: 'mv-mobility-3', focus: 'mobility', level: 3, name: 'The long unlock', mins: 8,
    why: 'A full-body flow at a pace that asks something of you. By now the range is there; this is about owning it under a little load.',
    note: 'You will be warm by the end of this one. Standing throughout.',
    steps: [
      ['Breath and set', 45, 'Stand tall. Three slow breaths, longer out than in. Feel the floor through all four corners of each foot.'],
      ['Neck, shoulders, arms', 60, 'Half circles at the neck, then large slow arm circles backwards, then cross the body and open wide, ten times.'],
      ['Thoracic rotation, loaded', 60, 'Hands behind the head, feet wide. Rotate and reach the elbow across, hold three seconds at the end. Six each side.'],
      ['Standing spinal wave', 60, 'Cat and cow standing, then let the movement travel as a wave. Slow enough that no vertebra is skipped.'],
      ['Deep squat hold', 60, 'Heels down if they will go, hold a low squat and let the hips open. Hold a doorframe if you need to. Breathe into the back.'],
      ['Hip openers', 75, 'From standing, knee up and circle it open and closed, eight each side. Then a slow lunge each side, holding fifteen seconds.'],
      ['Hamstrings and chain', 60, 'Feet hip width, hinge at the hips with a long spine, hands sliding down the legs. Come up by driving the hips forward. Eight slow.'],
      ['Wrists, ankles, close', 60, 'Wrist circles and prayer stretches, then calf raises to finish. Three breaths standing still before you go.']
    ]
  },

  /* ═══════════ LEGS AND HIPS ═══════════ */
  {
    id: 'mv-legs-1', focus: 'legs', level: 1, name: 'Standing strong', mins: 4,
    why: 'Legs that can hold you are the difference between hour nine feeling like hour two and hour nine feeling like punishment.',
    note: 'Bodyweight only. Hold a chair or the wall if your balance wants it.',
    steps: [
      ['Squats, slow', 60, 'Feet hip width, sit back as if to a low chair, chest up. Three seconds down, one up. As deep as is comfortable. Ten of them.'],
      ['Calf raises', 45, 'Rise onto the toes, hold one second at the top, lower over three. Fifteen. The slow lowering is where the work is.'],
      ['Split stance hold', 60, 'One foot a long stride ahead, sink until both knees bend, hold. Thirty seconds each side.'],
      ['Glute bridge', 60, 'On your back, knees bent, feet flat, drive the hips up and squeeze hard at the top for two seconds. Twelve. This is the muscle a stool switches off.'],
      ['Shake out', 30, 'Stand, shake each leg loose, two slow breaths.']
    ]
  },
  {
    id: 'mv-legs-2', focus: 'legs', level: 2, name: 'The engine', mins: 6,
    why: 'Single-leg work, because walking a floor is a single-leg activity and two-legged strength hides the side that is weaker.',
    note: 'Have a wall or a chair within reach for balance.',
    steps: [
      ['Squats to tempo', 60, 'Twelve squats, three seconds down, one second up, no pause. Keep the heels down.'],
      ['Reverse lunges', 75, 'Step back, drop the back knee toward the floor, drive through the front heel to stand. Eight each side, alternating.'],
      ['Single-leg calf raise', 60, 'All your weight on one foot, rise and lower slowly. Ten each side. The weaker side is usually the one you lead with carrying plates.'],
      ['Split squat hold, low', 60, 'Deep split stance, sink and hold thirty seconds each side. Breathe through it.'],
      ['Single-leg bridge', 75, 'Glute bridge with one foot off the floor, hips level. Eight each side. Level hips matter more than height.'],
      ['Wall sit', 45, 'Back to the wall, thighs as near parallel as you can hold. Stay until the timer goes.'],
      ['Shake out', 30, 'Loose legs, two slow breaths, done.']
    ]
  },
  {
    id: 'mv-legs-3', focus: 'legs', level: 3, name: 'The double', mins: 8,
    why: 'Enough volume to actually build something, in a shape that still fits beside a bed. This is training, not a warm-up.',
    note: 'You should be breathing hard in places. Rest inside a step if you need to.',
    steps: [
      ['Prepare', 45, 'Ankle circles, ten bodyweight squats at speed to warm, three breaths.'],
      ['Squats, deep and slow', 75, 'Fifteen, four seconds down, drive up. Go as deep as your ankles allow with the heels down.'],
      ['Walking or reverse lunges', 90, 'Twenty in total, alternating. Long steps. Back knee toward the floor, not the floor itself.'],
      ['Bulgarian split squat', 90, 'Back foot on the bed or a chair, front foot a stride forward. Eight to ten each side. The hardest thing in this programme and the most useful.'],
      ['Single-leg calf raise', 75, 'Twelve each side, slow down, full range. Off a step if you have one.'],
      ['Single-leg bridge', 75, 'Twelve each side, two second squeeze at the top.'],
      ['Wall sit to finish', 60, 'Hold until the timer stops, and do not bargain with yourself in the last ten seconds.'],
      ['Down', 45, 'Stand, shake out, three long breaths with the out-breath twice the in.']
    ]
  },

  /* ═══════════ FEET AND CALVES ═══════════ */
  {
    id: 'mv-feet-1', focus: 'feet', level: 1, name: 'The feet you stand on', mins: 4,
    why: 'Ten hours on a hard floor in flat shoes stiffens the arch and shortens the calf, and that is where plantar pain starts. Five minutes here outlasts any insole.',
    note: 'Bare feet. A wall for balance.',
    steps: [
      ['Wake the foot', 60, 'Stand on one leg, spread the toes wide, then grip the floor and release. Twenty times each foot.'],
      ['Roll the arch', 60, 'A ball, a bottle, or the edge of a step. Roll slowly from heel to toes, pausing anywhere that complains. Thirty seconds each foot.'],
      ['Calf stretch, straight', 45, 'Hands on the wall, one leg back, heel down, knee straight. Thirty seconds. This is the calf muscle that gets shortest.'],
      ['Calf stretch, bent', 45, 'Same position, back knee softly bent, heel still down. Thirty seconds. This reaches the deeper one the straight-leg version misses.'],
      ['Toe raises', 45, 'Heels down, lift the toes and the front of the foot as high as they go. Twenty. The front of the shin holds the arch up.']
    ]
  },
  {
    id: 'mv-feet-2', focus: 'feet', level: 2, name: 'Feet, ankles, calves', mins: 6,
    why: 'Stiff ankles make everything above them work harder. This adds the range work that keeps the knee and hip out of trouble.',
    note: 'Bare feet, a wall, and a step if you have one.',
    steps: [
      ['Wake the foot', 60, 'Toe spreads, then lift only the big toe keeping the others down, then only the others. It will feel impossible at first. That is a skill coming back.'],
      ['Roll the arch', 60, 'Thirty seconds each foot, slow, leaning real weight into it.'],
      ['Ankle range at the wall', 75, 'Toes a hand-width from the wall, drive the knee forward over the toes without lifting the heel. Ten each side. Move the foot back as it improves.'],
      ['Calf stretch, both versions', 90, 'Straight leg thirty seconds, bent knee thirty seconds, each side.'],
      ['Calf raises, full range', 60, 'Off a step if you have one, heels dropping below the toes. Fifteen, slow down.'],
      ['Toe raises and shin', 45, 'Heels down, toes up, twenty. Then walk on your heels for the last ten seconds.'],
      ['Balance', 30, 'Stand on one foot, eyes closed if you dare. Fifteen seconds each.']
    ]
  },
  {
    id: 'mv-feet-3', focus: 'feet', level: 3, name: 'Bulletproof feet', mins: 7,
    why: 'Loaded work now, because a foot that is only stretched is flexible and weak. Strong feet are what stop the ache coming back.',
    note: 'Bare feet. A step and a wall.',
    steps: [
      ['Prepare the foot', 60, 'Toe spreads, big toe isolation, then roll each arch for twenty seconds.'],
      ['Ankle range, loaded', 75, 'Knee to wall, but in a half-kneeling position with weight through the front foot. Twelve each side, pausing at the end.'],
      ['Calf raises, single leg, full range', 90, 'Off a step. Twelve each side, three seconds down, full stretch at the bottom, full height at the top.'],
      ['Heel walks and toe walks', 60, 'Thirty seconds on the heels, thirty on the toes, up and down whatever space you have.'],
      ['Short foot hold', 60, 'Stand, and without curling the toes, pull the ball of the foot toward the heel to raise the arch. Hold ten seconds, six times. This is the arch doing its own job.'],
      ['Single-leg balance, moving', 75, 'Stand on one foot and reach the other foot forward, out, and behind without touching down. Five each side.'],
      ['Calf stretch to finish', 60, 'Straight and bent, thirty seconds each side.']
    ]
  },

  /* ═══════════ UPPER BACK AND SHOULDERS ═══════════ */
  {
    id: 'mv-back-1', focus: 'back', level: 1, name: 'Undo the shift', mins: 4,
    why: 'Trays, rails, tickets and phones all pull you into the same rounded shape. This is the opposite of that shape, done daily so it does not set.',
    note: 'A doorway helps. Standing throughout.',
    steps: [
      ['Open the chest', 60, 'Forearm on a doorframe, elbow at shoulder height, step through gently until you feel the chest. Thirty seconds each side. Never force it.'],
      ['Shoulder blades', 45, 'Pull both shoulder blades together and down, hold five seconds, release. Ten times. Nothing moves but the blades.'],
      ['Wall angels', 60, 'Back against a wall, arms up in a goalpost, slide them up and down keeping the backs of the hands as near the wall as they will go. Ten slow.'],
      ['Neck release', 45, 'Ear toward shoulder, opposite hand reaching down. Thirty seconds each side, breathing out into it.'],
      ['Stand tall', 30, 'Feet under hips, crown of the head up, shoulders back and down. Three breaths in that shape so the body remembers it.']
    ]
  },
  {
    id: 'mv-back-2', focus: 'back', level: 2, name: 'The carrying side', mins: 6,
    why: 'You carry on one side. This adds rotation and the pulling strength that the front of the body never gets, so the two halves stop drifting apart.',
    note: 'A doorway and a wall. A towel or a belt is useful.',
    steps: [
      ['Open the chest', 75, 'Doorway stretch, thirty seconds each side, then both arms at once in the frame for fifteen.'],
      ['Thoracic rotation', 75, 'Seated or standing, hands behind the head, rotate the ribcage and hold at the end for three breaths. Five each side.'],
      ['Wall angels, slow', 75, 'Twelve, four seconds up and four down. If the hands leave the wall, shorten the range until they do not.'],
      ['Band pulls, or towel', 75, 'A towel held tight at both ends, arms straight ahead, pull it apart hard and bring the arms wide. Twelve, squeezing the blades.'],
      ['Prone lifts', 75, 'Face down, arms in a Y, lift the hands a few inches using the upper back only. Ten, holding two seconds at the top.'],
      ['Neck and jaw', 60, 'Ear to shoulder each side, then unclench the jaw and let the tongue drop, breathing out slowly.'],
      ['Stand tall', 45, 'Three breaths standing in the shape you just built.']
    ]
  },
  {
    id: 'mv-back-3', focus: 'back', level: 3, name: 'The straight back', mins: 8,
    why: 'Strength, not just stretch. A back that holds you up without being asked is the only permanent fix for the shape the work puts you in.',
    note: 'Floor space for the prone work. A towel for the pulls.',
    steps: [
      ['Open and warm', 75, 'Doorway chest stretch thirty seconds each side, then twenty arm circles backwards.'],
      ['Thoracic rotation, deep', 75, 'Half kneeling or seated, hand behind the head, rotate and reach. Eight each side, breathing at the end range.'],
      ['Wall slides to overhead', 75, 'Wall angels, but finish each rep pressing the hands overhead and holding two seconds. Twelve.'],
      ['Towel pull-aparts', 75, 'Arms straight, pull hard and wide, fifteen reps. Then hold the widest position for fifteen seconds.'],
      ['Prone Y, T and W', 105, 'Face down. Ten lifts with arms in a Y, ten in a T, ten in a W. Slow, using the back and not momentum.'],
      ['Bear hold or plank', 60, 'On hands and toes, or hands and knees just off the floor, back flat. Hold and breathe.'],
      ['Chest and neck release', 75, 'Doorway stretch both sides, then neck side bends, thirty seconds each.'],
      ['Stand tall', 45, 'Three slow breaths, standing in the shape the last eight minutes built.']
    ]
  },

  /* ═══════════ LOW BACK AND THE CHAIN BEHIND YOU ═══════════ */
  {
    id: 'mv-chain-1', focus: 'chain', level: 1, name: 'The hinge', mins: 4,
    why: 'Most backs in this trade are hurt lifting a keg, a crate or a bin with a rounded spine. The hinge is the movement that stops that happening, and it has to be practised cold to be there when you need it.',
    note: 'Floor space to lie down. A wall for the hinge.',
    steps: [
      ['Glute bridge', 60, 'On your back, feet flat, drive the hips up, squeeze hard for two seconds at the top. Twelve. Feel it in the backside, not the low back.'],
      ['The hinge, at a wall', 75, 'Stand a foot from a wall, facing away. Push the hips back until they touch the wall, keeping the spine long and the shins upright. Twelve. That is the shape for every lift you will ever do.'],
      ['Bird dog', 75, 'On hands and knees, reach one arm and the opposite leg out long. Hold three seconds. Six each side. Nothing should wobble.'],
      ['Dead bug', 60, 'On your back, arms up, knees up. Lower one arm and the opposite leg, keeping the low back flat to the floor. Eight each side.'],
      ['Knees to chest', 30, 'Both knees hugged in, breathe out, let the low back spread into the floor.']
    ]
  },
  {
    id: 'mv-chain-2', focus: 'chain', level: 2, name: 'The chain', mins: 6,
    why: 'Hamstrings, glutes and the whole back line, loaded properly. This is the group that holds you upright at hour ten and it is the group a sitting-and-standing life never trains.',
    note: 'Floor space. A chair or the bed for one step.',
    steps: [
      ['Glute bridge, single leg', 75, 'One foot off the floor, hips level, ten each side with a two second squeeze.'],
      ['Hip hinge, bodyweight', 75, 'Away from the wall now. Hips back, long spine, hands sliding down the thighs, drive the hips forward to stand. Fifteen slow.'],
      ['Single-leg hinge', 90, 'Stand on one leg, hinge forward reaching toward the floor with the back leg lifting behind. Eight each side. Balance will fail first; that is information.'],
      ['Bird dog, slow', 75, 'Eight each side, five seconds held, no rocking through the hips.'],
      ['Dead bug', 75, 'Ten each side, slower, low back pinned to the floor throughout.'],
      ['Side plank, knees or feet', 60, 'Thirty seconds each side. On the knees is a real side plank.'],
      ['Release', 45, 'Knees to chest, then a slow twist each side, breathing out into it.']
    ]
  },
  {
    id: 'mv-chain-3', focus: 'chain', level: 3, name: 'The back that lasts', mins: 8,
    why: 'The three positions that carry a back through thirty years of this work: hinge, brace, carry. Trained together, under time.',
    note: 'Floor space, a chair, and something with a handle if you have it.',
    steps: [
      ['Warm the hips', 60, 'Twelve glute bridges, then ten bodyweight hinges.'],
      ['Single-leg hinge, slow', 90, 'Ten each side, three seconds down, pausing at the bottom. Keep the hips square to the floor.'],
      ['Elevated single-leg bridge', 90, 'Feet on a chair or the bed, one leg lifted. Ten each side.'],
      ['Bird dog, long hold', 75, 'Six each side, eight seconds held. Brace the middle as if about to be pushed.'],
      ['Dead bug, extended', 75, 'Ten each side, arm and leg reaching further, back still flat.'],
      ['Side plank', 90, 'Forty-five seconds each side, hips lifted and stacked. Drop to the knee rather than let the hips sag.'],
      ['Loaded carry, or hold', 75, 'Anything heavy in one hand, walk tall and slow, shoulders level. Forty seconds each side. No bag? Hold a plank instead.'],
      ['Release', 45, 'Knees to chest, twist each side, three long breaths.']
    ]
  },

  /* ═══════════ BREATH AND THE NERVOUS SYSTEM ═══════════ */
  {
    id: 'mv-breath-1', focus: 'breath', level: 1, name: 'Down from the shift', mins: 4,
    why: 'A service shift leaves the nervous system switched on for hours after the last table. A long out-breath is the one lever you can pull directly, and it works in under a minute.',
    note: 'Sitting or standing. Nothing to learn.',
    steps: [
      ['Notice', 45, 'Sit. Feel the feet on the floor and the weight of your hands. Do not change the breath yet, just find where it is sitting in you.'],
      ['Two sighs', 45, 'In through the nose, then a second small sip of air on top, then a long slow sigh out of the mouth. Twice. This is the fastest way down there is.'],
      ['Long out-breath', 90, 'In for four, out for eight, through the nose if you can. The out-breath is the one that does the work. Keep going until the timer stops.'],
      ['Soften', 45, 'Unclench the jaw, drop the tongue, let the shoulders go. Notice you had been holding all three.'],
      ['Sit', 30, 'Do nothing at all for thirty seconds. That is the whole instruction.']
    ]
  },
  {
    id: 'mv-breath-2', focus: 'breath', level: 2, name: 'The box and the sigh', mins: 6,
    why: 'Two tools with different jobs: the sigh to come down fast when you are wound up, the box to steady you before you walk into something hard.',
    note: 'Sitting, back supported. Breathe through the nose except where it says otherwise.',
    steps: [
      ['Arrive', 45, 'Feet flat, hands heavy. Three breaths without changing anything.'],
      ['Physiological sighs', 60, 'Double inhale through the nose, long sigh out of the mouth. Five of them, unhurried.'],
      ['Box breath', 120, 'In four, hold four, out four, hold four. Keep the corners square. If four is a strain, use three.'],
      ['Extended exhale', 90, 'In four, out eight. No holds. Let the shoulders drop on every out-breath.'],
      ['Body check', 60, 'Jaw, tongue, shoulders, hands, belly. Release each one in turn as you breathe out.'],
      ['Still', 45, 'Sit with an ordinary breath and do nothing to it.']
    ]
  },
  {
    id: 'mv-breath-3', focus: 'breath', level: 3, name: 'The full sit', mins: 8,
    why: 'Long enough to stop being a technique and start being a practice. The same tools, held past the point where the mind gets bored and asks to stop.',
    note: 'Sitting upright, somewhere you will not be interrupted.',
    steps: [
      ['Settle', 60, 'Sit tall without stiffening. Three breaths to arrive, then let the breath find its own rhythm.'],
      ['Sighs to clear', 60, 'Five physiological sighs, double in through the nose, long out of the mouth.'],
      ['Box breath, four counts', 120, 'In four, hold four, out four, hold four. Even and unforced throughout.'],
      ['Box breath, longer', 120, 'Extend to five or six counts a side if it stays comfortable. If it does not, stay at four. Struggling is not the exercise.'],
      ['Extended exhale', 90, 'In four, out eight, twelve rounds or until the timer stops.'],
      ['Scan', 75, 'From the crown down to the feet, one region per breath, releasing whatever is holding.'],
      ['Sit with nothing', 75, 'No counting, no technique. Just sit and let the breath be whatever it has become.']
    ]
  },

  /* ═══════════ RESTORATION ═══════════ */
  {
    id: 'mv-restore-1', focus: 'restore', level: 1, name: 'Legs up the wall', mins: 5,
    why: 'The single best five minutes for legs that have carried you through a double. Rest is not the absence of training; it is the part where the training becomes strength.',
    note: 'A clear stretch of wall and a cushion for the head.',
    steps: [
      ['Get there', 45, 'Sit side-on to the wall, lie back and swing the legs up it. Shuffle your backside as near the wall as is comfortable.'],
      ['Settle', 60, 'Arms out to the sides, palms up. Let the legs be completely heavy. Nothing here is held.'],
      ['Breathe', 120, 'Long slow breaths, out longer than in. Feel the blood and the swelling move back out of the feet.'],
      ['Twist', 90, 'Bring the legs down, hug the knees in, then let them fall to one side for forty-five seconds, then the other.'],
      ['Lie still', 45, 'Flat on your back, arms loose, and do absolutely nothing until the timer stops.']
    ]
  },
  {
    id: 'mv-restore-2', focus: 'restore', level: 2, name: 'The long unwind', mins: 7,
    why: 'Held positions, long enough for the tissue to actually change rather than just be pulled at. Nothing in here raises the heart rate.',
    note: 'Floor space, a wall, and a cushion. Warm room if you can.',
    steps: [
      ['Legs up the wall', 120, 'Up the wall, arms wide, completely heavy. Long breaths out.'],
      ['Figure four at the wall', 90, 'Legs still up, cross one ankle over the opposite knee and let the hip open. Forty-five seconds each side.'],
      ['Supine twist', 90, 'Knees together and over to one side, shoulders staying down. Forty-five seconds each side, breathing into the ribs.'],
      ['Child pose or knees to chest', 75, 'Whichever your knees allow. Let the low back spread.'],
      ['Hip flexor, half kneeling', 90, 'Tuck the pelvis under, then ease forward. Forty-five seconds each side. This is the muscle that shortens on every stool in the building.'],
      ['Chest opener', 60, 'Lie back over a rolled towel placed across the upper back, arms wide.'],
      ['Lie still', 75, 'Flat, warm, nothing held. Do not skip this part; it is the point of the session.']
    ]
  },
  {
    id: 'mv-restore-3', focus: 'restore', level: 3, name: 'The reset', mins: 9,
    why: 'A full restorative session, the kind that puts a body back together after a hard week. Slow, long, and deliberately unimpressive.',
    note: 'Twenty minutes of quiet is better than nine rushed. Give it what you can.',
    steps: [
      ['Arrive', 60, 'Lie on your back, knees bent, feet flat. Three breaths that you do not manage in any way.'],
      ['Legs up the wall', 150, 'Long hold, arms wide, palms up. Out-breath twice the length of the in.'],
      ['Figure four', 120, 'Each side, sixty seconds, letting the hip open on the exhale rather than pushing it.'],
      ['Supine twist, long', 120, 'Sixty seconds each side. Let the top shoulder go toward the floor in its own time.'],
      ['Hip flexor and quad', 120, 'Half kneeling, pelvis tucked, sixty seconds each side. Add a gentle reach overhead on the same side as the back knee.'],
      ['Chest and thoracic', 90, 'Rolled towel across the upper back, arms wide, ninety seconds of just breathing into the front of the chest.'],
      ['Child pose', 75, 'Or knees to chest. Forehead down, breathe into the back of the ribs.'],
      ['Nothing', 105, 'Flat on your back. No position, no instruction, no counting. Lie there until the timer stops.']
    ]
  }
];

/* The focus for a given weekday, rotated by the reader's own rest day exactly
   as PRACTICES is (ui-today.js), so the restorative day lands where they
   actually rest rather than on a calendar Sunday they work. */
function moveFocusFor(dayOfWeek) {
  var anchor = Number(FL.prefs.weekAnchor) || 0;
  return MOVE_WEEK[(dayOfWeek + 7 - anchor) % 7];
}

/* Total movements ever completed. A number that only rises: time away never
   costs anybody their level. */
function moveTotal() {
  var n = 0;
  for (var k in FL.moves) if (Object.prototype.hasOwnProperty.call(FL.moves, k)) n += Number(FL.moves[k]) || 0;
  return n;
}

/* Level 1 from the first morning, 2 at fourteen sessions, 3 at forty-two:
   roughly two weeks and six weeks of daily work, and no faster for anybody
   trying to rush it by doing six in one morning, because a day counts what it
   counts. */
var MOVE_LEVEL_AT = [0, 14, 42];

function moveLevel() {
  var n = moveTotal();
  if (n >= MOVE_LEVEL_AT[2]) return 3;
  if (n >= MOVE_LEVEL_AT[1]) return 2;
  return 1;
}

/* What opens the next level, or null at the top. */
function moveToNext() {
  var lv = moveLevel();
  if (lv >= 3) return null;
  return MOVE_LEVEL_AT[lv] - moveTotal();
}

/* The session for a focus at a level, falling back down the levels so a
   missing entry can never leave the morning with nothing to do. */
function moveFor(focusId, level) {
  var lv = level || moveLevel();
  for (var l = lv; l >= 1; l--) {
    for (var i = 0; i < MOVES.length; i++) {
      if (MOVES[i].focus === focusId && MOVES[i].level === l) return MOVES[i];
    }
  }
  return MOVES[0];
}

/* Today's session: the weekday's focus at the reader's current level. */
function moveToday() {
  var now = (typeof flShiftedNow === 'function') ? flShiftedNow() : new Date();
  return moveFor(moveFocusFor(now.getDay()).id);
}
