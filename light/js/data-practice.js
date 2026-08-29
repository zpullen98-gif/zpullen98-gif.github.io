/* First Light: daily practices and reflections
   Extracted verbatim from first_light_year_4.html.
   Declares globals; loaded by a classic <script> tag. */

const PRACTICES=[
["The View from Above","Once today, imagine rising above your city, your concerns among thousands of others. Let the smallness restore proportion, then return to your work calmly."],
["Voluntary Discomfort","Go without one small comfort today. Notice that you are fine without it. Freedom grows in exactly this soil."],
["Premeditatio Malorum","Before the day begins, rehearse its likely obstacles, so that when they arrive in fact they find you already composed."],
["The Discipline of Assent","Place one breath between every provocation and your response. In that breath ask: is this within my control?"],
["Memento Mori","Hold, for one quiet minute, the fact that this day is subtracted from a finite store. Then spend it as something that cannot be replaced."],
["The Examined Evening","Tonight, plead your case before your own court: what was done well, where you fell short, what tomorrow will do differently."],
["The Boundless Heart","Extend one deliberate kindness beyond your circle today — to a stranger, an opponent, or someone who cannot repay it."]];

const REFLECTIONS=[
"What would today look like if you needed nothing to go your way?",
"Which of your burdens today is real, and which is imagined?",
"Who taught you the virtue you most need today, and have you thanked them?",
"What is one thing you keep postponing that the present hour could hold?",
"If today were examined by your finest teacher tonight, what would make them nod?",
"What are you gripping that would be lighter if carried with open hands?",
"What did yesterday teach you that today can practice?",
"Where does your attention go when no one directs it — and is that where you want to live?",
"What would you do today if you fully believed the light returns?",
"Which small good, repeated weekly, would change your year?",
"Whose burden could you quietly lift before sunset?",
"What is the one honest sentence you have been avoiding?",
"What season is your life in, and are you fighting it or keeping it?",
"What, in this single day, is worthy of gratitude so specific it could be photographed?",
  "The night\u2019s number measures the room, the weather, and the hour. What does the work say about you \u2014 the question the number cannot answer?",
  "What would \u2018enough for tonight\u2019 mean if you decided it before the shift instead of after the tip-out?",
  "The lean week and the loaded week ask the same question: is your standard for yourself indexed to the take?",
];

/* The Walk-In's assent lines. One is shown per visit, rotating by the minute
   so a double shift does not read the same sentence six times. */
const RESET_LINES = [
  "The guest's mood is theirs. Your steadiness is yours.",
  "You are an impression, and not at all what you appear to be. \u2014 said to the anger, not the guest",
  "Ninety seconds is a real amount of time. The floor will still be there.",
  "The table is not up to you. The next thing you do is.",
  "Nobody good at this was calm by accident."
];

/* The Turn \u2014 one application prompt under the daily voice, rotated like the
   reflections. Epictetus's rule: a line you cannot use is a line you do not
   yet have. */
const TURN_PROMPTS = [
  "Say it back in your own words \u2014 out loud counts double.",
  "Name the one place tonight this will be tested.",
  "Who on the floor tonight needs you to have understood this?",
  "What would doing this badly look like? You have seen someone do it badly.",
  "Which regular could have written this line? Which one needs to hear it?",
  "Where did you fail exactly this, this week? One sentence, no flogging.",
  "If this is true, what stops mattering today?",
  "Carry one word of it through the shift. Choose the word now.",
  "What would your station look like if you believed this?",
  "Say it to the version of you clocking in at four.",
  "What is the cheapest possible first step on this, tonight?",
  "Which of today\u2019s certainties would this line dissolve?",
  "Find the counterexample. If you cannot, believe the line.",
  "How would the calmest person you have worked with read this?"
];

/* The Sorting \u2014 Enchiridion 1 as a drill instead of a quotation. Each row is
   a floor situation; the worker calls it Mine or Not mine, and a wrong call
   gets one corrective line, never a score. DELIBERATELY UNRECORDED. */
const SORT_SITUATIONS = [
  { s: "A six-top walks in nine minutes before last call.", mine: false, why: "Their timing was never yours. The pour, the pace, and the grace of the next hour are." },
  { s: "A guest is cruel about a dish you did not cook.", mine: false, why: "The dish and their mood are not yours. Your face, your next sentence, and the handoff to the kitchen are." },
  { s: "The manager cuts your section on the busiest night.", mine: false, why: "The floor plan is theirs. What you do with three tables instead of five \u2014 that is the whole of your evening." },
  { s: "Tips are thin on a slow Tuesday.", mine: false, why: "The room decides the volume. You decide the standard the four guests you did get will remember." },
  { s: "The printer dies mid-rush.", mine: false, why: "Machines fail on schedule \u2014 theirs. Handwriting the next three tickets legibly is yours." },
  { s: "How you speak to the barback after the glass breaks.", mine: true, why: "" },
  { s: "Whether you eat before doors.", mine: true, why: "" },
  { s: "The tone you take when the kitchen is forty minutes behind.", mine: true, why: "" },
  { s: "A regular\u2019s comment that crossed the line.", mine: false, why: "Their words are theirs, and so is the consequence. Naming the line \u2014 out loud, to them or to a manager \u2014 is what is yours. Steadiness is not tolerance." },
  { s: "Whether you repeat the order back before your hands move.", mine: true, why: "" },
  { s: "The weather on the patio you were assigned.", mine: false, why: "The sky answers to no one. The towel over your shoulder and the third round of waters are yours." },
  { s: "The review that names you, posted at 2am.", mine: false, why: "A stranger\u2019s keyboard is not your jurisdiction. Tomorrow\u2019s first table is." },
  { s: "Whether you say the hard thing to the coworker who keeps disappearing.", mine: true, why: "" },
  { s: "The guest who was determined to be disappointed before they sat down.", mine: false, why: "Some arrive with the ending written. Serve the meal they refuse to enjoy anyway; that part is yours." },
  { s: "Whether tonight ends with the shift drink.", mine: true, why: "" },
  { s: "Being sent home early when the room dies.", mine: false, why: "The cut is the manager\u2019s arithmetic. The unexpected evening is yours to spend on purpose." },
  { s: "Whether the last table of the night gets your first-table service.", mine: true, why: "" },
  { s: "What the day crew left your station looking like.", mine: false, why: "Their shift is closed and beyond appeal. Ten minutes of mise en place is yours, and then it is your station." }
];
