/* First Light: intent and examen data.
   Recovered verbatim from first-light.jsx, the React predecessor. The HTML
   rewrite dropped these when the live api.anthropic.com dependency was cut;
   the LOCAL_* banks were already written as its offline fallback. */

const INTENTS = [
  "Recovery",
  "The Slow Season",
  "Courage",
  "Stillness",
  "Discipline",
  "Gratitude",
  "Grief",
  "Hope",
];

const EXAMEN_QUESTIONS = [
  { key: "well", label: "What did you do well today?" },
  { key: "short", label: "Where did you fall short?" },
  { key: "tomorrow", label: "What will you do differently tomorrow?" },
  { key: "release", label: "What tonight was not yours to control? Name it, and leave it at the door." },
];

/* The shift debrief, the same nightly court, convened for service work.
   Emotional labour has a residue: the table that went wrong, the guest who
   crossed a line, the apology that was owed to you and never came. Writing
   it down is how it stops riding home. Same privacy as the examen: no one
   else reads the answers, and nothing here is a score. */
const DEBRIEF_QUESTIONS = [
  { key: "floor", label: "What did you handle well on that floor tonight?" },
  { key: "carry", label: "What are you carrying home that belongs to a guest, not to you?" },
  { key: "leave", label: "What gets left here?" },
  { key: "enough", label: "Was tonight\u2019s take a verdict on tonight\u2019s work? Untangle the two in one sentence." },
];

const LOCAL_THEMES = {
  "The Slow Season": { theme: "Weather, Not Verdict", themeNote: "January rooms and Tuesday rooms are the trade\u2019s winters \u2014 they measure the calendar, not you. Nobody farms without fallow months. Spend this one on the skills the rush never leaves time for, and let the take be the weather it is. (This app will never ask what you earn. That is on purpose.)" },
  Recovery: { theme: "The Day After", themeNote: "Last night was long and it cost something. Today asks nothing heroic: water, food, light, and the anchor hours of sleep. Repair is a practice, not a pause in one." },
  Courage: { theme: "The Narrow Gate", themeNote: "Courage is not the absence of fear but the decision that something matters more, after Ambrose Redmoon" },
  Stillness: { theme: "The Unmoved Center", themeNote: "Beneath every storm the depth of the sea is quiet. Begin there." },
  Discipline: { theme: "The Daily Oar", themeNote: "No single stroke crosses the water. Today asks only for today's stroke." },
  Gratitude: { theme: "What Is Given", themeNote: "Count nothing owed to you, and everything becomes a gift." },
  Grief: { theme: "What Remains", themeNote: "Love does not end; it changes address. Carry what remains gently today." },
  Hope: { theme: "The Dawn Ahead", themeNote: "However long the night, the light is already on its way." },
  default: { theme: "The Present Hour", themeNote: "This hour is the only one entrusted to you. Meet it fully." },
};

const LOCAL_PRACTICES = [
  { title: "The View from Above", text: "Once today, pause and imagine rising above your city, seeing your concerns among thousands of others, the whole human procession below. Let the smallness restore proportion, then return to your work calmly." },
  { title: "Voluntary Discomfort", text: "Choose one small comfort to go without today: the elevator, the second coffee, the warm shower's last minute. Notice that you are fine without it. Freedom grows in exactly this soil." },
  { title: "Premeditatio Malorum", text: "Before the day begins, rehearse its likely obstacles: the delay, the sharp word, the plan that fails. Meet each one in imagination first, so that when it arrives in fact, it finds you already composed." },
  { title: "The Discipline of Assent", text: "Today, place one breath between every provocation and your response. In that breath, ask: is this within my control? Withhold your assent from every first impression until it has answered." },
  { title: "Memento Mori", text: "Hold, for one quiet minute, the fact that this day is subtracted from a finite store. Not to darken the day: to sharpen it. Then spend it as something that cannot be replaced." },
];

const LOCAL_REFLECTIONS = [
  "What would today look like if you needed nothing to go your way?",
  "Which of your burdens today is real, and which is imagined?",
  "Who taught you the virtue you most need today, and have you thanked them?",
  "What is one thing you keep postponing that the present hour could hold?",
  "If today were examined by your finest teacher tonight, what would make them nod?",
  "What are you gripping that would be lighter if carried with open hands?",
];
