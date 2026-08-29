/* First Light: the five-tier goal ladder
   Extracted verbatim from first_light_year_4.html.
   Declares globals; loaded by a classic <script> tag. */

const LIFE=[
["Daily","These are the atoms of a good life.",[
["Morning silence — ten minutes","Say to every harsh impression: you are an impression, and not at all what you appear to be. — Epictetus"],
["Physical movement — thirty minutes","It is a shame to grow old without seeing the beauty and strength of which the body is capable. — Socrates, in Xenophon"],
["One act of kindness","Do not impose on others what you do not wish for yourself, Confucius"],
["Read for twenty minutes","Linger among a limited number of master-thinkers. (Seneca)"],
["Evening reflection","I daily plead my case before my own court. I hide nothing from myself, Seneca"],
["Name three things given","Contentment is the greatest wealth, Dhammapada 204"],
["Have the conversation you are avoiding","Let your yes be yes, and your no be no. — Jesus, Matthew 5:37"]]],
["Weekly","The week is the smallest unit in which a life's shape becomes visible.",[
["Keep one full day of rest","Remember the Sabbath day, to keep it holy, Exodus 20:8"],
["Examine the week on three counts","Faithfulness, sincerity, practice. — Zengzi, Analects 1.4"],
["Share one unhurried table","Where two or three are gathered, Jesus, Matthew 18:20"],
["Do one small good consistently","Hadith: the most beloved deeds are those done most consistently, even if small."],
["Go where things grow","Delightful are the forests where the crowd finds no delight. — Dhammapada 99"]]],
["Monthly","Each month is a small life: begin with intention, end with honest assessment.",[
["Set one area of your life in order","Well-being is attained little by little, attributed to Zeno"],
["Begin or deepen one relationship","Love your neighbor as yourself, Jesus, Mark 12:31"],
["Learn one practical skill","The mountain is moved by small stones, attributed to Confucius"],
["Cut one habit that costs you","Epictetus: every habit is maintained by the corresponding actions."],
["Give time or resources away","Charity does not decrease wealth, Hadith"],
["Sit once with your mortality","You could leave life right now. — Marcus Aurelius 2.11"]]],
["Quarterly","Every ninety days, look at the shape of the whole before drift becomes a decade.",[
["Audit your closest company","One who touches soot is blackened. (Epictetus, Discourses 3.16)"],
["Simplify your finances","Wealth is having few wants, attributed to Epictetus"],
["Take a three-day retreat","These are the roots of trees. Meditate; do not be negligent, the Buddha"],
["Rewrite your values statement","Know thyself, inscription at Delphi"],
["Complete one creative work","Let a man lift himself by his own self. — Bhagavad Gita 6.5"],
["Examine body and mind","Our bodies are received in trust; we must not presume to injure them, Classic of Filial Piety"]]],
["Yearly","A year is long enough to transform a life and short enough to waste entirely.",[
["Define, and redefine, the good life","No wind is the right wind if you know no harbor, Seneca, Letters 71"],
["Make a pilgrimage","A journey of a thousand miles begins with a single step. — Laozi"],
["Forgive one person","Forgive, and you will be forgiven. — Jesus, Luke 6:37"],
["Move against your greatest fear","We suffer more often in imagination than in reality. — Seneca"],
["Mentor someone coming after you","The gift of the Dhamma excels all gifts. — Dhammapada 354"],
["Write to yourself a year forward","You will meet the future with the same weapons of reason. — Marcus Aurelius 7.8"],
["Leave the world measurably better","The best of people bring most benefit to mankind. — Hadith"]]]];

/* Secular alternates for the goals whose supporting line is scripture. The goal
   is identical either way; only the voice under it changes. Shown on the default
   path; the originals return when the reader turns the Library's readings on
   (FL.prefs.canonLines === 'on'). Every alternate was chosen against primary
   sources in the same spirit as the citation audit. */
const LIFE_ALT = {
"Name three things given":"Nothing is more honourable than a grateful heart. \u2014 Seneca, Letters 81",
"Have the conversation you are avoiding":"If it is not right, do not do it; if it is not true, do not say it. \u2014 Marcus Aurelius 12.17",
"Keep one full day of rest":"What lacks alternating rest will not endure. \u2014 Ovid, Heroides 4",
"Share one unhurried table":"Consider who you eat and drink with, rather than what you eat and drink. \u2014 Epicurus, kept in Seneca\u2019s Letters 19",
"Do one small good consistently":"Practice is the best of all instructors. \u2014 Publilius Syrus",
"Go where things grow":"The mind is nourished and refreshed by open air and wandering walks. \u2014 Seneca, On Tranquility of Mind 17",
"Begin or deepen one relationship":"You must live for another if you wish to live for yourself. \u2014 Seneca, Letters 48",
"Give time or resources away":"He gives twice who gives quickly. \u2014 Publilius Syrus",
"Take a three-day retreat":"Nowhere can a man find a quieter retreat than in his own soul. \u2014 Marcus Aurelius 4.3",
"Complete one creative work":"No great thing is created suddenly. \u2014 Epictetus, Discourses 1.15",
"Forgive one person":"The best revenge is to be unlike him who performed the injury. \u2014 Marcus Aurelius 6.6",
"Mentor someone coming after you":"Men learn while they teach. \u2014 Seneca, Letters 7",
"Leave the world measurably better":"The fruit of this life is a good character and acts for the common good. \u2014 Marcus Aurelius 6.30"
};
