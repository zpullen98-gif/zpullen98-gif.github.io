/* First the wine, then its name: the structure behind the deductive grid.

   WHY THIS FILE EXISTS. The Codex already ships forty seven grape records, and
   every one of them describes its structure in prose inside a single `st`
   string: "Acid HIGH", "Tannin MASSIVE, ferrous", "Body light-med". That is
   good writing and useless to a machine. Nothing could ask a student to CALL
   the acid, because nothing knew what the acid was. So the blind flight asked
   the only question it could: here is the wine's own description, name it.
   That is the examination inverted. A sommelier is not handed a description.

   Every profile here was written against that existing prose, so the app never
   contradicts itself: where reference.js says Barbera is "Acid VERY HIGH ·
   Tannin LOW-medium", this file says acid 3 and tannin 0.

   THE SCALE is four steps, which is what a taster can honestly distinguish
   and defend at a table:

     0  Low            1  Medium minus        2  Medium plus        3  High

   FIELDS
     g      the grape, matching the `g` key in GRAPES and GRAPES_PLUS exactly,
            because that is the join and a typo here silently drops a grape
            from the grid
     acid   tan   body   alc   oak        the five calls the grid asks for
     sweet  0 dry, 1 off-dry, 2 sweet     not asked, used for the note
     world  'old' | 'new' | 'both'        the first initial-conclusion call
     clim   'cool' | 'moderate' | 'warm'  the second
     age    what a typical bottle shows, in words, for the reveal

   TANNIN ON A WHITE is 0 throughout and the grid does not ask for it: a
   student calling tannin on a Riesling is answering a question nobody asked,
   and a grid that asks it is teaching a bad habit.

   WHERE A GRAPE IS GENUINELY TWO WINES (Pinot Gris as Grigio and as Alsace,
   Chenin dry and sweet, Corvina as classico and as Amarone) the profile is
   the one the app's own prose leads with, and the note says the other exists.
   A deductive grid cannot mark an ambiguity, so it does not create one. */

const TASTE = [
  /* ---------- whites ---------- */
  { g: 'Albariño',          acid: 3, tan: 0, body: 1, alc: 1, oak: 0, sweet: 0, world: 'old',  clim: 'cool',     age: 'drunk young, one to three years' },
  { g: 'Chardonnay',        acid: 1, tan: 0, body: 2, alc: 2, oak: 2, sweet: 0, world: 'both', clim: 'moderate', age: 'two to ten, longer from Burgundy' },
  { g: 'Chenin Blanc',      acid: 3, tan: 0, body: 1, alc: 1, oak: 1, sweet: 0, world: 'old',  clim: 'moderate', age: 'dry drinks young, sweet keeps for decades' },
  { g: 'Gewürztraminer',    acid: 0, tan: 0, body: 3, alc: 3, oak: 0, sweet: 1, world: 'old',  clim: 'cool',     age: 'three to eight' },
  { g: 'Grüner Veltliner',  acid: 3, tan: 0, body: 1, alc: 1, oak: 0, sweet: 0, world: 'old',  clim: 'cool',     age: 'young, though Smaragd rewards five' },
  { g: 'Muscat Blanc',      acid: 1, tan: 0, body: 1, alc: 1, oak: 0, sweet: 1, world: 'old',  clim: 'warm',     age: 'drink young for the perfume' },
  { g: 'Pinot Gris / Grigio', acid: 1, tan: 0, body: 2, alc: 2, oak: 0, sweet: 1, world: 'old', clim: 'cool',    age: 'young as Grigio, five or more as Alsace' },
  { g: 'Riesling',          acid: 3, tan: 0, body: 0, alc: 0, oak: 0, sweet: 1, world: 'old',  clim: 'cool',     age: 'ages further than any other white' },
  { g: 'Sauvignon Blanc',   acid: 3, tan: 0, body: 1, alc: 1, oak: 0, sweet: 0, world: 'both', clim: 'cool',     age: 'young, with rare exceptions' },
  { g: 'Torrontés',         acid: 2, tan: 0, body: 1, alc: 1, oak: 0, sweet: 0, world: 'new',  clim: 'warm',     age: 'the freshest bottle you can find' },
  { g: 'Viognier',          acid: 0, tan: 0, body: 3, alc: 3, oak: 1, sweet: 0, world: 'old',  clim: 'warm',     age: 'two to five, it tires early' },
  { g: 'Assyrtiko',         acid: 3, tan: 0, body: 2, alc: 2, oak: 0, sweet: 0, world: 'old',  clim: 'warm',     age: 'three to eight, longer than its island suggests' },
  { g: 'Furmint',           acid: 3, tan: 0, body: 2, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'moderate', age: 'dry keeps a decade, Aszú far longer' },
  { g: 'Sémillon',          acid: 2, tan: 0, body: 1, alc: 1, oak: 1, sweet: 0, world: 'both', clim: 'moderate', age: 'Hunter Semillon is famously immortal' },
  { g: 'Melon de Bourgogne', acid: 3, tan: 0, body: 0, alc: 0, oak: 0, sweet: 0, world: 'old', clim: 'cool',     age: 'young, on lees; sur lie bottlings keep' },
  { g: 'Vermentino',        acid: 2, tan: 0, body: 2, alc: 1, oak: 0, sweet: 0, world: 'old',  clim: 'warm',     age: 'young' },
  { g: 'Verdejo',           acid: 3, tan: 0, body: 2, alc: 1, oak: 0, sweet: 0, world: 'old',  clim: 'moderate', age: 'young' },
  { g: 'Godello',           acid: 2, tan: 0, body: 2, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'cool',     age: 'three to eight' },
  { g: 'Savagnin (Jura)',   acid: 3, tan: 0, body: 2, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'cool',     age: 'vin jaune is sold at six and drunk at sixty' },
  { g: 'Marsanne',          acid: 0, tan: 0, body: 3, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'warm',     age: 'closes young, opens after five' },
  { g: 'Petit Manseng',     acid: 3, tan: 0, body: 2, alc: 2, oak: 1, sweet: 2, world: 'old',  clim: 'moderate', age: 'ten and more when sweet' },

  /* ---------- reds ---------- */
  { g: 'Cabernet Franc',    acid: 2, tan: 1, body: 1, alc: 1, oak: 1, sweet: 0, world: 'old',  clim: 'cool',     age: 'five to fifteen from the Loire' },
  { g: 'Cabernet Sauvignon', acid: 2, tan: 3, body: 3, alc: 2, oak: 2, sweet: 0, world: 'both', clim: 'moderate', age: 'ten to thirty from a serious address' },
  { g: 'Gamay',             acid: 3, tan: 0, body: 0, alc: 0, oak: 0, sweet: 0, world: 'old',  clim: 'cool',     age: 'young, though cru Beaujolais keeps ten' },
  { g: 'Grenache / Garnacha', acid: 0, tan: 1, body: 2, alc: 3, oak: 1, sweet: 0, world: 'old', clim: 'warm',    age: 'five to fifteen' },
  { g: 'Malbec',            acid: 1, tan: 2, body: 3, alc: 2, oak: 2, sweet: 0, world: 'new',  clim: 'warm',     age: 'five to twelve' },
  { g: 'Merlot',            acid: 1, tan: 1, body: 2, alc: 2, oak: 2, sweet: 0, world: 'both', clim: 'moderate', age: 'five to fifteen' },
  { g: 'Nebbiolo',          acid: 3, tan: 3, body: 3, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'moderate', age: 'ten to thirty, and it needs them' },
  { g: 'Pinot Noir',        acid: 2, tan: 1, body: 1, alc: 1, oak: 1, sweet: 0, world: 'both', clim: 'cool',     age: 'five to twenty' },
  { g: 'Sangiovese',        acid: 3, tan: 2, body: 2, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'moderate', age: 'five to twenty as Brunello' },
  { g: 'Syrah / Shiraz',    acid: 1, tan: 2, body: 3, alc: 2, oak: 2, sweet: 0, world: 'both', clim: 'warm',     age: 'five to twenty' },
  { g: 'Tempranillo',       acid: 1, tan: 2, body: 2, alc: 2, oak: 2, sweet: 0, world: 'old',  clim: 'moderate', age: 'Gran Reserva arrives already aged' },
  { g: 'Zinfandel',         acid: 2, tan: 1, body: 3, alc: 3, oak: 2, sweet: 0, world: 'new',  clim: 'warm',     age: 'three to eight' },
  { g: 'Xinomavro',         acid: 3, tan: 3, body: 1, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'moderate', age: 'ten and up, it is savage young' },
  { g: 'Mencía',            acid: 2, tan: 1, body: 1, alc: 1, oak: 1, sweet: 0, world: 'old',  clim: 'cool',     age: 'three to ten' },
  { g: 'Aglianico',         acid: 2, tan: 3, body: 3, alc: 2, oak: 2, sweet: 0, world: 'old',  clim: 'warm',     age: 'ten to twenty five' },
  { g: 'Blaufränkisch',     acid: 2, tan: 2, body: 2, alc: 1, oak: 1, sweet: 0, world: 'old',  clim: 'cool',     age: 'five to fifteen' },
  { g: 'Nerello Mascalese', acid: 2, tan: 2, body: 1, alc: 1, oak: 1, sweet: 0, world: 'old',  clim: 'moderate', age: 'five to fifteen' },
  { g: 'Touriga Nacional',  acid: 2, tan: 3, body: 3, alc: 2, oak: 2, sweet: 0, world: 'old',  clim: 'warm',     age: 'ten and more' },
  { g: 'Carignan',          acid: 3, tan: 3, body: 2, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'warm',     age: 'old vines reward five to fifteen' },
  { g: 'Mourvèdre / Monastrell', acid: 1, tan: 3, body: 3, alc: 2, oak: 1, sweet: 0, world: 'old', clim: 'warm', age: 'ten and more from Bandol' },
  { g: 'Barbera',           acid: 3, tan: 0, body: 1, alc: 2, oak: 1, sweet: 0, world: 'old',  clim: 'moderate', age: 'three to eight' },
  { g: 'Corvina (Valpolicella)', acid: 2, tan: 1, body: 1, alc: 1, oak: 1, sweet: 0, world: 'old', clim: 'moderate', age: 'young as classico, decades as Amarone' },
  { g: 'Sagrantino',        acid: 2, tan: 3, body: 3, alc: 2, oak: 2, sweet: 0, world: 'old',  clim: 'warm',     age: 'ten and more, and it still grips' },
  { g: 'Tannat',            acid: 2, tan: 3, body: 3, alc: 2, oak: 2, sweet: 0, world: 'both', clim: 'moderate', age: 'ten and more from Madiran' },
  { g: 'Pinotage',          acid: 1, tan: 2, body: 2, alc: 2, oak: 2, sweet: 0, world: 'new',  clim: 'warm',     age: 'three to ten' },
  { g: 'Carmenère',         acid: 1, tan: 1, body: 2, alc: 2, oak: 2, sweet: 0, world: 'new',  clim: 'warm',     age: 'five to twelve' }
];

/* The vocabulary the grid speaks, in the order a taster works. Four steps
   because that is what can be honestly distinguished; the Court's own sheet
   runs five and the fifth (plain medium) is where every uncertain call goes to
   hide, which teaches nothing. */
const TASTE_STEPS = ['Low', 'Medium minus', 'Medium plus', 'High'];

/* The five calls, in grid order. Tannin is skipped for a white by the engine,
   not by this list, so the order stays the same for every wine. */
const TASTE_CALLS = [
  { k: 'acid', label: 'Acidity', ask: 'How much acid?' },
  { k: 'tan',  label: 'Tannin',  ask: 'How much tannin?' },
  { k: 'body', label: 'Body',    ask: 'How much weight?' },
  { k: 'alc',  label: 'Alcohol', ask: 'How much alcohol?' },
  { k: 'oak',  label: 'Oak',     ask: 'How much oak?' }
];

const TASTE_WORLD = [
  { k: 'old', label: 'Old World' },
  { k: 'new', label: 'New World' }
];

const TASTE_CLIM = [
  { k: 'cool', label: 'Cool' },
  { k: 'moderate', label: 'Moderate' },
  { k: 'warm', label: 'Warm' }
];

/* A grape whose world is 'both' is marked correct either way, because it is
   correct either way: Chardonnay and Cabernet are grown everywhere and a
   student who says New World of a Napa Cabernet has not made an error. */
function tasteWorldOk(profile, called) {
  return profile.world === 'both' || profile.world === called;
}

function tasteProfile(name) {
  for (var i = 0; i < TASTE.length; i++) if (TASTE[i].g === name) return TASTE[i];
  return null;
}

/* ═══════════════ THE EVIDENCE ═══════════════

   An app cannot hand anybody a glass, and this is the problem every tasting
   trainer has to solve honestly. The old flight solved it by printing the
   wine's finished description and asking for the name, which is the exam
   inverted: a taster is never given the answer sheet and asked to read it.

   What a taster IS given is sensation, and what they are trained to do is
   convert sensation into a call. Salivation at the back of the jaw is how
   acid announces itself. Gums that feel scoured after the swallow is tannin.
   Warmth down the chest is alcohol. Slow legs and a coated glass is weight.
   Novices know the words and misread the sensations, and that is precisely
   the skill worth drilling.

   So the grid prints the SENSATION and asks for the CALL. The lines below are
   the evidence for each level of each component, written as a taster would
   experience it and never naming the component itself, because naming it
   would hand over the answer.

   Indexed [component][level 0..3] to match TASTE_STEPS. */

const TASTE_EVIDENCE = {
  acid: [
    'The mouth stays still. Nothing gathers under the tongue, and the wine sits where you put it.',
    'A little water gathers at the sides of the tongue, and it is gone before you swallow.',
    'The jaw works. Water comes at the back corners and keeps coming for a few seconds after the swallow.',
    'You salivate hard and involuntarily. The sides of the tongue sting faintly and the mouth is still watering well after the wine has gone.'
  ],
  tan: [
    'Nothing grips. The wine leaves the teeth and gums exactly as it found them.',
    'A faint dryness at the very front of the gums, gone almost at once.',
    'The gums and the inside of the cheek feel brushed and slightly rough, and it holds for several seconds.',
    'The whole mouth is scoured. The tongue sticks to the roof, the gums feel stripped, and it is still drying a full minute later.'
  ],
  body: [
    'It runs off the tongue like water and the glass clears instantly when you swirl.',
    'It has a little weight but leaves quickly, and the glass sheets clean with a thin edge.',
    'It coats the tongue and stays a moment. The glass holds slow, broad legs.',
    'It fills the mouth and sits there heavily. The glass is thickly coated and the legs crawl.'
  ],
  alc: [
    'No warmth anywhere. You could drink a lot of this.',
    'A suggestion of warmth in the throat, easy to miss.',
    'Clear warmth down the chest after you swallow, and a faint heat in the nostrils over the glass.',
    'It burns a little at the back of the throat and the fumes prickle the nose before the wine reaches your lips.'
  ],
  oak: [
    'Fruit and earth only. Nothing sweet, nothing toasted, nothing from a barrel.',
    'A whisper of something warm behind the fruit, more texture than flavour.',
    'Vanilla, baking spice or toast sits clearly alongside the fruit without covering it.',
    'Coconut, char, sweet smoke and cedar arrive before the fruit does and stay after it has gone.'
  ]
};

/* The sight line, built from the profile rather than from prose, because a
   student should be reading colour and rim as evidence of age and weight and
   not as a label. Colour follows body for a red and weight for a white, and
   the rim widens with age. */
function tasteSight(p, isRed) {
  if (isRed) {
    var core = ['pale and translucent, you can read through it',
                'medium ruby, the stem visible through the bowl',
                'deep ruby, the stem a shadow',
                'opaque and staining, no light through the core'][p.body];
    return core + '.';
  }
  return ['water-white with a green cast',
          'pale straw',
          'straw gold',
          'deep gold, almost burnished'][p.body] + '.';
}
