/* First Light: the seven chambers.

   One entry per tradition whose scripture the Library holds. Each is written to
   orient a reader who is standing in front of a strange book and does not know what
   kind of thing they are holding: what it is, who made it, what its words mean, how
   its people actually live, and how to begin reading without being lost.

   VOICE. Each tradition is presented as it understands itself, in its own terms,
   without ranking and without the flattening move of saying they all teach the same
   thing. They do not. Where they genuinely converge, the threads in data-threads.js
   put the passages side by side and let the reader see it; where they diverge, that
   is said plainly too. Dates follow mainstream scholarship rather than traditional
   attribution, and where the two differ the difference is stated rather than hidden.

   Fields: works[] are ids in FL_LIBRARY. concepts/figures/branches/practices/
   festivals are [label, gloss] or [label, when, gloss] pairs. */

var FL_TRADITIONS = [

{ id: 'hindu', name: 'Hinduism', also: 'Sanātana Dharma: the eternal way',
  works: ['rigveda', 'upanishads', 'gita'],
  era: 'Hymns composed c. 1500–1200 BCE; the tradition continuous since',
  where: 'India and Nepal, and a diaspora on every continent',
  epigraph: ['Truth is one; the wise call it by many names.', 'Rig Veda 1.164.46'],

  opening: [
    'Hinduism is the least like a religion of anything in this library, if by religion you mean a founder, a creed, and a date. It has none of those. What it has is the oldest continuously recited body of sacred verse on earth, and a family of traditions that have argued with one another inside it for three thousand years without ever needing to expel the losers.',
    'The Rig Veda is the base layer: 1,028 hymns to fire, dawn, storm, and the ordering principle of things, composed in an archaic Sanskrit that was already ancient when the Buddha was born, and carried for centuries entirely by voice, with a system of memorisation so exact that scholars can still reconstruct the pitch. The Upanishads are the second layer, and they turn sharply inward: from the sacrifice on the altar to the self that performs it, asking what, underneath everything, a person actually is. The Bhagavad Gita is the third: a conversation on a battlefield between a soldier who does not want to fight and a god driving his chariot, and the most widely read Hindu text in the world.',
    'The tradition holds all three at once without embarrassment. It has room for strict non-dualists who hold that the self and the absolute are one thing seen twice, and for devotees who would rather taste sugar than be sugar, and for villagers whose practice is a lamp lit at dusk for a deity in a niche.'
  ],

  concepts: [
    ['Brahman', 'The ground of being: not a god among gods but the reality of which everything is a modification. Defined mostly by negation: not this, not this.'],
    ['Ātman', 'The self, in the deepest sense: not personality or memory but the awareness those happen inside. The great claim of the Upanishads is that ātman and Brahman are not two.'],
    ['Dharma', 'What is right, given who and where you are. Both cosmic order and the specific duty of this person in this life, which is why the Gita can argue that a soldier’s dharma is not a monk’s.'],
    ['Karma', 'Action, and the consequence carried in it. Not reward and punishment administered from outside, but the moral grain of the universe running its course.'],
    ['Saṃsāra', 'The round of birth, death, and rebirth. The problem, not the goal.'],
    ['Mokṣa', 'Release from that round. The goal, reached by knowledge, by devotion, or by action offered without grasping at its fruit, depending on whom you ask.'],
    ['Ṛta', 'The Vedic word for the order things run by, ancestor of dharma. What makes the dawn reliable and a promise binding, treated as the same kind of fact.'],
    ['Om', 'The syllable said to contain everything: past, present, future, and what stands outside time.']
  ],

  figures: [
    ['The ṛṣis', 'archaic', 'The seers who "heard" the Vedic hymns rather than composing them, which is why the Vedas are called śruti, that which was heard.'],
    ['Yājñavalkya', 'c. 8th c. BCE', 'The sharpest voice in the Upanishads, who tells his wife Maitreyī that a husband is not dear for the husband’s sake but for the sake of the self.'],
    ['Ādi Śaṅkara', 'c. 700–750 CE', 'Systematised Advaita, radical non-dualism, and reorganised Hindu monasticism. Died at about thirty-two.'],
    ['Rāmānuja', '1017–1137', 'Argued against Śaṅkara that the relation of self to God is real and personal, not an illusion to be dissolved. Devotional Hinduism largely follows him.'],
    ['Mīrābāī', 'c. 1498–1547', 'Rajput princess who abandoned her rank for wandering devotion to Krishna, and whose songs are still sung.']
  ],

  branches: [
    ['Vaiṣṇavism', 'Devotion to Vishnu and his descents, above all Krishna and Rama. The largest stream.'],
    ['Śaivism', 'Devotion to Shiva, ascetic, and the tradition most at home with paradox.'],
    ['Śāktism', 'Devotion to the Goddess as the active power of the divine.'],
    ['Smārta', 'Broadly non-dual, comfortable worshipping several deities as aspects of one reality.']
  ],

  practices: [
    ['Pūjā', 'Daily offering of light, water, food and flowers to a deity image, at home more often than in a temple.'],
    ['Japa', 'Repetition of a name or mantra, counted on a strand of 108 beads.'],
    ['Darśana', 'Literally "seeing": going to a temple to be seen by the deity as much as to see.'],
    ['Yoga', 'In the older sense: the eight-limbed discipline of Patañjali, of which posture is the third limb.'],
    ['Ahiṃsā', 'Non-harming, from which most Hindu vegetarianism follows.']
  ],

  festivals: [
    ['Diwali', 'Oct–Nov', 'The festival of lamps: light set out along every wall against the longest dark.'],
    ['Holi', 'Feb–Mar', 'Spring, colour thrown in the streets, and a day when rank is suspended.'],
    ['Navarātri', 'Sep–Oct', 'Nine nights of the Goddess, ending in Dussehra.'],
    ['Mahā Śivarātri', 'Feb–Mar', 'The great night of Shiva: fasting and a vigil kept until dawn.']
  ],

  reading: 'Do not begin with the Rig Veda. It is the oldest and the strangest, and read cold it is a wall of fire-altar imagery in a world you have no map of. Begin with the Gita, which is short, dramatic, and asks a question you already have: what do you do when every available action costs something. Then the Upanishads, for the turn inward. Then the Rig Veda, once you can hear it as the archaic poetry it is, and read it in small pieces, aloud if you can.'
},

{ id: 'jewish', name: 'Judaism', also: 'Yahadut',
  works: ['tanakh'],
  era: 'Traditions from c. 1200 BCE; the canon fixed by c. 100 CE',
  where: 'Israel, North America, Europe, and a diaspora three thousand years old',
  epigraph: ['Hear, O Israel: the Lord our God, the Lord is one.', 'Deuteronomy 6:4'],

  opening: [
    'Judaism is the covenant of a particular people with one God, and almost everything distinctive about it follows from that sentence. Not a philosophy that happens to have adherents but a relationship with a history, including the parts where the people argue with God, and win.',
    'The Tanakh is an acronym: Torah (the five books of teaching), Nevi’im (prophets), Ketuvim (writings). It is the same collection Christians call the Old Testament, in a different order and read very differently; it ends not with prophecy pointing forward but with Chronicles and the instruction to go up and rebuild.',
    'What is easy to miss from outside is that scripture is only half of it. The other half is the oral tradition eventually written down as Mishnah and Talmud: centuries of argument about what the text requires, preserving the minority opinions alongside the majority, on the principle that a rejected argument may be needed later. Judaism is less a set of answers than a very long, very careful conversation that no one is permitted to end.'
  ],

  concepts: [
    ['Brit', 'Covenant. A binding agreement with obligations on both sides, and the master idea of the whole tradition.'],
    ['Torah', 'Not "law" but teaching. The five books, and by extension the whole body of instruction.'],
    ['Tzedakah', 'Usually translated charity, but built on the root for justice: giving is owed, not generous.'],
    ['Teshuvah', 'Repentance, literally "return". The assumption is that you were already on the path and can rejoin it.'],
    ['Shabbat', 'The seventh day, and the first thing in the Hebrew Bible called holy. A law about stopping.'],
    ['Mitzvot', 'The commandments, traditionally 613, through which the covenant is lived in ordinary detail.'],
    ['Tikkun olam', 'Repair of the world. A late phrase that has become the tradition’s shorthand for social obligation.'],
    ['Chesed', 'Steadfast, loyal kindness: the quality God is repeatedly said to keep even when it is not deserved.']
  ],

  figures: [
    ['Abraham', 'traditional', 'The first to be called out and promised a people; also the first to argue with God, over Sodom.'],
    ['Moses', 'traditional', 'Led the exodus and received the Torah at Sinai. The tradition calls him the humblest of men and denies him entry to the land.'],
    ['Hillel', 'c. 110 BCE–10 CE', 'Asked for the Torah while standing on one foot, answered: what is hateful to you, do not do to your neighbour. The rest is commentary; go and learn it.'],
    ['Rashi', '1040–1105', 'The commentator. Printed alongside nearly every page of Bible and Talmud studied since.'],
    ['Maimonides', '1138–1204', 'Physician and philosopher who tried to reconcile Torah with Aristotle, and codified the whole of Jewish law.']
  ],

  branches: [
    ['Orthodox', 'Holds Torah, written and oral, as divinely given and binding in detail.'],
    ['Conservative / Masorti', 'Holds the law binding but historically developing, interpreted by scholarly consensus.'],
    ['Reform / Progressive', 'Holds the ethical demand as binding and ritual practice as a matter of informed choice.'],
    ['Hasidic', 'An eighteenth-century revival of joy, music, and mystical immediacy, now among the most traditional in practice.']
  ],

  practices: [
    ['Shabbat', 'From Friday dusk to Saturday dark: no work, candles lit, bread and wine blessed, a full day of stopping.'],
    ['Kashrut', 'Dietary law: which animals, and the separation of meat from milk.'],
    ['Daily prayer', 'Three services, and the Shema said on waking and on lying down.'],
    ['Study', 'Regarded as itself a form of worship; a page of Talmud a day is a common lifelong discipline.'],
    ['Life-cycle', 'Circumcision at eight days, bar and bat mitzvah at twelve or thirteen, and a year of mourning with its own liturgy.']
  ],

  festivals: [
    ['Rosh Hashanah', 'Sep–Oct', 'The new year, and the beginning of ten days of accounting.'],
    ['Yom Kippur', 'Sep–Oct', 'The Day of Atonement: a full fast, and the one day the tradition treats as a rehearsal for death.'],
    ['Pesach', 'Mar–Apr', 'Passover: the exodus retold at a table, with the instruction that each person regard themselves as personally brought out.'],
    ['Sukkot', 'Sep–Oct', 'A week lived in a temporary booth with a roof open to the stars.'],
    ['Purim', 'Feb–Mar', 'Esther read aloud, noise made at the villain’s name, and drinking permitted to the point of confusion.']
  ],

  reading: 'Start with Genesis and Exodus, which are narrative and move fast. Then jump to the Psalms, which are the tradition’s prayer book and where most readers actually find the door. Ecclesiastes and Job are the two books that take despair seriously enough to argue with it, and are worth reaching sooner than you would expect. Leviticus is where most read-the-whole-thing attempts die: it is a priestly manual, and it repays skimming on a first pass without shame.'
},

{ id: 'buddhist', name: 'Buddhism', also: 'the Dhamma',
  works: ['dhammapada'],
  era: 'The Buddha c. 480–400 BCE; the Pali canon written down c. 29 BCE',
  where: 'Sri Lanka, Southeast Asia, Tibet, China, Japan, Korea, and the modern West',
  epigraph: ['Mind precedes all things; mind is their chief, mind is their maker.', 'Dhammapada 1'],

  opening: [
    'Buddhism begins with a diagnosis rather than a doctrine. A man of the warrior class left his household, tried the severest asceticism available for six years, found it did not work, ate a meal, sat down under a tree, and afterwards described what he had understood as four true things about suffering: that it exists, that it has a cause, that the cause can cease, and that there is a path.',
    'The Dhammapada is the most read text of the Pali canon and the best door into it: 423 verses of practical instruction, sharp and concrete, on anger, heedlessness, craving, and the discipline of one’s own mind. It is a small part of an enormous library, the Tripiṭaka, "three baskets", of monastic rule, discourse, and analysis, but almost everything essential is in it somewhere.',
    'Notice what the tradition does not require. There is no creator god at its centre, no soul in the sense the West means, and the Buddha is not a saviour but a physician who leaves you the prescription. The Kalama Sutta explicitly tells hearers not to accept a teaching on authority, on scripture, or on logic alone, but to test whether it leads to harm.'
  ],

  concepts: [
    ['Dukkha', 'Usually "suffering", better rendered unsatisfactoriness: the friction of wanting things to hold still when nothing does.'],
    ['Anicca', 'Impermanence. Not a mood but a description: everything composite comes apart.'],
    ['Anattā', 'Not-self. There is experience, but no unchanging owner of it standing behind the experience.'],
    ['Nibbāna', 'The going out of a flame: craving extinguished. Described almost entirely by what it is not.'],
    ['The Eightfold Path', 'Right view, intention, speech, action, livelihood, effort, mindfulness, concentration: practised together, not in sequence.'],
    ['Karma', 'Intentional action and its fruit. Buddhism sharpens the Vedic idea by locating it in intention specifically.'],
    ['Mettā', 'Loving-kindness, deliberately cultivated, beginning with yourself and widened until it excludes no one.'],
    ['Saṅgha', 'The community of practitioners, and one of the three refuges alongside the Buddha and the Dhamma.']
  ],

  figures: [
    ['Siddhattha Gotama', 'c. 480–400 BCE', 'The Buddha: "the awakened one", a title, not a name. Taught for about forty-five years after his awakening.'],
    ['Ānanda', '5th c. BCE', 'His cousin and attendant, who is said to have recited the discourses from memory at the first council, and who argued successfully for the ordination of women.'],
    ['Aśoka', 'r. 268–232 BCE', 'The emperor who, after a war he could not stomach, turned the tradition from a regional movement into a missionary one.'],
    ['Nāgārjuna', 'c. 150–250 CE', 'Argued that all phenomena are empty of inherent existence, founding the philosophy underlying most Mahāyāna Buddhism.'],
    ['Dōgen', '1200–1253', 'Brought Sōtō Zen to Japan and taught that sitting is not a means to awakening but its expression.']
  ],

  branches: [
    ['Theravāda', '"The way of the elders": Sri Lanka and Southeast Asia, closest to the Pali canon, centred on monastic practice.'],
    ['Mahāyāna', 'The "great vehicle": East Asia; the ideal shifts from personal liberation to the bodhisattva who postpones it for others.'],
    ['Vajrayāna', 'Tibetan and Himalayan, with an elaborate contemplative technology and a strong teacher-student lineage.'],
    ['Zen / Chan', 'Mahāyāna stripped toward direct practice: sitting, and the suspicion that words get in the way.']
  ],

  practices: [
    ['Sitting meditation', 'Attention on the breath, or on whatever arises, without pushing it away or chasing it.'],
    ['Mettā practice', 'Systematically extending goodwill: to yourself, a friend, a stranger, someone difficult, everyone.'],
    ['The five precepts', 'Not to kill, steal, misuse sexuality, lie, or cloud the mind with intoxicants. Undertakings, not commandments.'],
    ['Dāna', 'Generosity, treated as the first practice rather than an afterthought, the monastic order lives on it.'],
    ['Retreat', 'Days to months of silence, and in Theravāda countries a period of temporary ordination is common.']
  ],

  festivals: [
    ['Vesak', 'Apr–May', 'The Buddha’s birth, awakening and death, traditionally on one full-moon day.'],
    ['Vassa', 'Jul–Oct', 'The three-month rains retreat, when monastics stay put and lay practice intensifies.'],
    ['Kathina', 'Oct–Nov', 'The end of the retreat, marked by the offering of cloth for robes.'],
    ['Bodhi Day', 'Dec 8', 'The awakening under the tree, kept especially in Japan.']
  ],

  reading: 'The Dhammapada is designed for exactly the way this app serves it: a verse or two at a time, returned to. Read it slowly and it will seem repetitive; that is the method, not a flaw. When you want the argument rather than the aphorism, the Fire Sermon and the Kalama Sutta are short and will reset most assumptions a Western reader arrives with.'
},

{ id: 'confucian', name: 'Confucianism', also: 'Rújiā: the school of scholars',
  works: ['analects'],
  era: 'Confucius 551–479 BCE; the Analects compiled by his students',
  where: 'China, Korea, Japan, Vietnam, as much a civilisation’s grammar as a religion',
  epigraph: ['To love all men: this is humanity.', 'Analects 12.22'],

  opening: [
    'Confucius spent his life trying to get a government job and failing. He wanted to demonstrate that a state run on moral example rather than force would outperform its neighbours, could not persuade any ruler to let him try, and died believing he had accomplished nothing. His students wrote down what he said, and two and a half thousand years later it is the operating system of a fifth of humanity.',
    'The Analects is not a treatise. It is fragments, a question from a student, a remark on a walk, a comment on someone’s conduct, with no argument connecting them and no system on offer. Read straight through it can feel like eavesdropping. Read slowly, one saying at a time, a coherent picture emerges: that character is built by practice rather than declared, that ritual and courtesy are the forms through which decency becomes reliable, and that how you treat your family is the training ground for how you will treat everyone.',
    'Whether it is a religion at all is genuinely disputed, including inside China. It has no creator god and says almost nothing about an afterlife: asked about serving the spirits, Confucius replied that if you cannot yet serve people, how can you serve spirits. But it has scripture, sages, ritual, and a doctrine of Heaven, and it has shaped more lives than most things that are certainly religions.'
  ],

  concepts: [
    ['Rén', 'Humaneness: the central virtue. Written as "person" beside "two": what a person owes by virtue of being among others.'],
    ['Lǐ', 'Ritual propriety: the forms of courtesy and ceremony through which respect becomes a habit rather than a mood.'],
    ['Yì', 'Rightness: doing what the situation requires because it is right, as against what is advantageous.'],
    ['Xiào', 'Filial devotion. Care for parents, treated as the root from which wider decency grows.'],
    ['Junzi', 'The exemplary person, originally "lord’s son", deliberately redefined as a matter of conduct rather than birth.'],
    ['Zhèngmíng', 'Rectification of names: calling things what they are, on the grounds that misused language makes right action impossible.'],
    ['Tiān', 'Heaven: an impersonal moral order rather than a deity, from which legitimate authority derives.'],
    ['Zhōngyōng', 'The middle way: the balanced course, held steadily, without excess in either direction.']
  ],

  figures: [
    ['Confucius', '551–479 BCE', 'Kong Qiu, called Kongzi. A teacher who took students regardless of rank and claimed to transmit rather than invent.'],
    ['Mencius', 'c. 372–289 BCE', 'Argued human nature is originally good, and that a ruler who abuses the people forfeits the right to rule.'],
    ['Xunzi', 'c. 310–235 BCE', 'Argued the opposite: nature is unruly, and goodness is a deliberate achievement of ritual and education.'],
    ['Zhu Xi', '1130–1200', 'Reorganised the tradition around the Four Books; his commentaries were the imperial exam syllabus for six centuries.'],
    ['Wang Yangming', '1472–1529', 'Held that knowing and doing are a single act, and that a knowledge not acted on was never knowledge.']
  ],

  branches: [
    ['Classical', 'The Analects, Mencius and Xunzi, before the tradition became state orthodoxy.'],
    ['Neo-Confucianism', 'The Song and Ming synthesis, absorbing Buddhist and Taoist metaphysics into a Confucian frame.'],
    ['Korean Seongnihak', 'A rigorous and long-dominant Korean development, with its own centuries of debate.'],
    ['New Confucianism', 'Twentieth-century and current attempts to answer modernity and liberalism from inside the tradition.']
  ],

  practices: [
    ['Self-examination', 'Zengzi examined himself daily on three counts: faithfulness, sincerity, and whether he had practised what he was taught.'],
    ['Study', 'Continuous, lifelong, and treated as a moral activity rather than an intellectual one.'],
    ['Ancestor reverence', 'Rites at the family altar and at graves: the living remaining in relationship with the dead.'],
    ['Ritual courtesy', 'Bowing, seating, forms of address: small observances practised until decency is automatic.'],
    ['Music', 'Regarded as morally formative, not decorative; a properly ordered state was expected to have properly ordered music.']
  ],

  festivals: [
    ['Qingming', 'early Apr', 'Tomb-sweeping: graves cleaned, food offered, the dead visited.'],
    ['Confucius’ birthday', 'Sep 28', 'Marked at temples in China, Taiwan and Korea; a teachers’ holiday in several places.'],
    ['Lunar New Year', 'Jan–Feb', 'The great family reunion, and the most Confucian act in the calendar.'],
    ['Zhongyuan', 'Jul–Aug', 'The ghost festival: offerings to ancestors and to the unremembered dead.']
  ],

  reading: 'Read the Analects the way you would a book of proverbs: one saying, then stop. It rewards return and punishes speed. Book 1 and Book 2 are the usual doorway. When a passage seems banal, it is worth assuming you have missed something and reading it again in a year; that is the standard experience of this text.'
},

{ id: 'taoist', name: 'Taoism', also: 'Dàojiā: the way',
  works: ['tao', 'zhuangzi'],
  era: 'Tao Te Ching c. 4th c. BCE; Zhuangzi c. 3rd c. BCE',
  where: 'China and the Chinese diaspora, and widely borrowed everywhere',
  epigraph: ['The Tao that can be told is not the eternal Tao.', 'Tao Te Ching 1'],

  opening: [
    'Taoism is what Chinese thought does when it stops trying to organise society and looks at the shape of things instead. Where Confucius wanted to correct the world with ritual and education, the Taoists suspected the correcting was the problem.',
    'The Tao Te Ching is eighty-one very short chapters, traditionally credited to Laozi, an older contemporary of Confucius who probably did not exist as a single person. It is one of the most translated books on earth and among the hardest to translate, because it works by paradox and by the deliberate use of the least impressive image available: water, an uncarved block, an empty vessel, a valley. Its central move is to praise what yields.',
    'The Zhuangzi is the other half, and utterly different in temperament: funny, digressive, full of impossible fish and useless trees and butchers whose blades never dull. It is philosophy conducted by joke and parable, and it is where the tradition’s freedom lives. Later Taoism grew an enormous religious apparatus of deities, alchemy and monastic orders; these two books are its root.'
  ],

  concepts: [
    ['Tao', 'The way things go. Not a god, not a plan: the pattern that everything is already following, which naming distorts.'],
    ['Wu wei', 'Non-forcing. Not doing nothing but acting without strain, the way water gets around a rock rather than through it.'],
    ['Zìrán', 'Self-so, spontaneity: what a thing does when nothing is interfering with it.'],
    ['Pǔ', 'The uncarved block: potential before it has been made into something useful and therefore limited.'],
    ['Yīn and yáng', 'Paired opposites that generate each other. Not good and evil; shaded and sunlit slopes of one hill.'],
    ['Dé', 'Virtue in the older English sense: the particular power a thing has by being fully what it is.'],
    ['Wàng', 'Forgetting. In the Zhuangzi a positive achievement: dropping the distinctions that were never in the world to begin with.'],
    ['Fǎn', 'Return. The Tao’s characteristic motion is not forward but back: things reach an extreme and reverse.']
  ],

  figures: [
    ['Laozi', 'traditional 6th c. BCE', '"The old master". Legend has him writing the Tao Te Ching at a border guard’s insistence before disappearing west.'],
    ['Zhuangzi', 'c. 369–286 BCE', 'Zhuang Zhou, who dreamt he was a butterfly and on waking could not say which he was.'],
    ['Liezi', 'c. 4th c. BCE', 'The third classic voice, associated with riding the wind and with an unusual calm about death.'],
    ['Zhang Daoling', '2nd c. CE', 'Founded the Celestial Masters, turning the philosophy into an organised religion with priests and liturgy.'],
    ['Wang Chongyang', '1113–1170', 'Founded the Quanzhen school, the monastic Taoism still dominant in China today.']
  ],

  branches: [
    ['Philosophical Taoism', 'The two classics read as philosophy, the form most familiar outside China.'],
    ['Celestial Masters', 'The earliest organised religious Taoism, with an ordained priesthood and communal rites.'],
    ['Quanzhen', '"Complete Perfection": monastic, celibate, and shaped by contact with Buddhism.'],
    ['Internal alchemy', 'Neidan: breath, posture and visualisation aimed at refining the body’s energies. The ancestor of qigong.']
  ],

  practices: [
    ['Sitting and forgetting', 'Zuowang: meditation aimed at dropping distinctions rather than concentrating on an object.'],
    ['Breath work', 'Slow regulated breathing as the lever on one’s own state; the oldest such technology on record.'],
    ['Tai chi and qigong', 'Slow movement forms descended from internal alchemy, now practised worldwide for health.'],
    ['Simplicity', 'Fewer wants deliberately cultivated: "he who knows that enough is enough will always have enough".'],
    ['Non-contention', 'Declining to compete where competing would cost more than losing.']
  ],

  festivals: [
    ['Lunar New Year', 'Jan–Feb', 'Temples crowded at midnight; the year’s first incense is contended for.'],
    ['Qingming', 'early Apr', 'Graves tended, and an old day for walking in the spring air.'],
    ['Zhongyuan', 'Jul–Aug', 'The ghost festival: offerings for the wandering dead.'],
    ['Laozi’s birthday', 'Feb–Mar', 'The fifteenth day of the second lunar month, kept at Taoist temples.']
  ],

  reading: 'The Tao Te Ching should be read in more than one translation: it is short enough that this is easy, and no single English version can carry it. Legge is here because it is public domain and scrupulous; it is also stiff, and you should not mistake its stiffness for the original. Read a chapter, not ten. The Zhuangzi can be opened anywhere; the first chapter and the butcher in chapter three are the usual entry.'
},

{ id: 'christian', name: 'Christianity', also: 'the Way',
  works: ['bible'],
  era: 'Jesus c. 4 BCE–30 CE; the New Testament written c. 50–110 CE',
  where: 'Every continent; the largest religion by adherents',
  epigraph: ['In the beginning was the Word, and the Word was with God, and the Word was God.', 'John 1:1'],

  opening: [
    'Christianity is the claim that the God who made everything became a particular person, in a particular occupied province, was executed by the state, and rose. Everything else in it is commentary on that.',
    'Its scripture is two libraries bound together. The Old Testament is the Hebrew Bible, received whole and read as pointing forward. The New is twenty-seven documents written within a lifetime or two of the events: four accounts of Jesus, a history of the movement’s first decades, letters, most of them occasional, addressed to specific quarrels in specific towns, and one apocalypse. It was written in the common Greek of the eastern Mediterranean, not a sacred language, which was itself a statement.',
    'The centre of gravity is the Sermon on the Mount and the parables, where the teaching is at its most demanding and least manageable: love your enemies, forgive without counting, the last will be first. Two thousand years of institutions have not domesticated those passages, and the tradition’s recurring reformers have almost always been people who went back and read them again.'
  ],

  concepts: [
    ['Incarnation', 'That God took on a human life: not appeared as a human, but became one, with a body and a death.'],
    ['Grace', 'Unearned favour. The insistence that acceptance precedes achievement rather than rewarding it.'],
    ['Agapē', 'Love as a decision and an action toward the unlovely, distinguished from affection and from desire.'],
    ['The Kingdom of God', 'God’s rule breaking into the present, described almost entirely in parables and almost never defined.'],
    ['Resurrection', 'Not the soul surviving, but the body raised: the claim the first Christians died for.'],
    ['Trinity', 'One God in three persons. Not arithmetic but the attempt to say everything the tradition found itself having to say at once.'],
    ['Repentance', 'Metanoia: a change of mind deep enough to change direction.'],
    ['Church', 'Ekklēsia, an assembly called out. In the New Testament always a people, never a building.']
  ],

  figures: [
    ['Jesus of Nazareth', 'c. 4 BCE–30 CE', 'A Galilean teacher and healer, crucified under Pontius Pilate. Taught in parables and ate with the wrong people.'],
    ['Paul of Tarsus', 'c. 5–65 CE', 'Persecutor turned apostle, whose letters are the earliest Christian writings and who carried the movement beyond Judaism.'],
    ['Augustine', '354–430', 'North African bishop whose Confessions invented the spiritual autobiography and whose thought shaped Western Christianity.'],
    ['Thomas Aquinas', '1225–1274', 'Synthesised Christian theology with Aristotle; near the end called his own work straw.'],
    ['Julian of Norwich', 'c. 1343–1416', 'Anchoress and the first woman known to have written a book in English: all shall be well.']
  ],

  branches: [
    ['Catholic', 'The largest, centred on Rome, with sacraments and apostolic succession as the connective tissue.'],
    ['Orthodox', 'The Eastern churches, Greek, Russian, and others, with an ancient liturgy and a theology of transformation.'],
    ['Protestant', 'The Reformation traditions, holding scripture as final authority and grace as unmediated.'],
    ['Pentecostal', 'The newest and fastest-growing, centred on direct experience of the Spirit.']
  ],

  practices: [
    ['Prayer', 'Corporate and private; the Lord’s Prayer is common to nearly every branch.'],
    ['Eucharist', 'Bread and wine, understood very differently across traditions and central to nearly all of them.'],
    ['Scripture reading', 'Daily lectionaries and whole-Bible plans; the practice this app’s Study Hall is built on.'],
    ['Sabbath', 'Sunday as a day of gathering and rest, inherited and shifted from the Jewish seventh day.'],
    ['Almsgiving', 'Tithing and care for the poor, taken over directly from Jewish practice.']
  ],

  festivals: [
    ['Christmas', 'Dec 25 / Jan 7', 'The nativity. Fixed near the solstice, and shaped by it.'],
    ['Lent', 'Feb–Apr', 'Forty days of fasting and self-examination before Easter.'],
    ['Easter', 'Mar–Apr', 'The resurrection, and the oldest and most important feast; Christmas is a latecomer.'],
    ['Pentecost', 'May–Jun', 'The Spirit given fifty days after Easter; the church’s birthday.']
  ],

  reading: 'Do not start at Genesis and grind forward; that plan has defeated more readers than any other book in this library. Start with the Gospel of Mark: it is the shortest, the earliest, and moves at a run. Then Luke for the parables, then John, which is doing something quite different. Then Genesis and Exodus. Save Revelation for last and read it as the coded resistance literature it is, not as a timetable.'
},

{ id: 'muslim', name: 'Islam', also: 'submission, and so peace',
  works: ['quran'],
  era: 'Revelation 610–632 CE',
  where: 'From West Africa to Indonesia; the second largest religion, and the youngest here',
  epigraph: ['In the name of God, the Most Gracious, the Most Merciful.', 'The Basmala'],

  opening: [
    'Islam is the insistence that there is one God and no other, that this has been said by every prophet from Adam onward, and that Muhammad is the last of them. Muslims do not regard it as a new religion but as the original one, restated after drift.',
    'The Qur’an is understood as the speech of God, revealed in Arabic over twenty-three years, and this changes what a translation is: the English here is a reading aid, not the Qur’an. It is not arranged as narrative and does not tell a story from beginning to end. Its 114 surahs run roughly longest to shortest, so the reader who starts at the front meets the most demanding material first, and its power is bound up with sound: it is meant to be heard, and millions have it entirely by heart.',
    'The practice is famously concrete. Five prayers at fixed times that reorganise the day around God; a month of daylight fasting; a fixed share of wealth given annually; a pilgrimage where every distinction of rank is stripped down to two pieces of white cloth. Alongside the Qur’an stands the hadith, the recorded sayings and conduct of the Prophet, sifted by an elaborate science of transmission.'
  ],

  concepts: [
    ['Tawḥīd', 'The oneness of God, and the axis of everything. Its opposite, associating partners with God, is the one unforgivable sin.'],
    ['Raḥma', 'Mercy. The divine attribute named at the head of all but one surah, twice, in two different intensities.'],
    ['Islām', 'Submission: the same root as salām, peace. The peace is understood to follow from the submission.'],
    ['Ummah', 'The community of believers, cutting across tribe, nation and race by design.'],
    ['Ṣalāh', 'The five daily prayers, dawn, midday, afternoon, sunset, night, which set the shape of the day.'],
    ['Zakāt', 'The obligatory annual share of accumulated wealth, normally a fortieth. A due, not a donation.'],
    ['Jihād', 'Struggle. Primarily the inner struggle against one’s own worse self; the martial sense is secondary and hedged with conditions.'],
    ['Sharīʿa', 'Literally the path to water. The whole way of life derived from Qur’an and sunna, interpreted through several schools.']
  ],

  figures: [
    ['Muhammad', 'c. 570–632', 'Merchant of Mecca who began receiving revelation at about forty; called the Seal of the Prophets.'],
    ['Khadija', 'c. 555–619', 'His first wife, a merchant who employed him, and the first person to accept the revelation.'],
    ['Ali', 'c. 600–661', 'Cousin and son-in-law, fourth caliph. Whether leadership was his by right is the origin of the Sunni–Shia division.'],
    ['Al-Ghazali', '1058–1111', 'Jurist who abandoned a prestigious chair in a crisis of certainty and returned to reconcile law with Sufi experience.'],
    ['Rumi', '1207–1273', 'Persian poet of the Sufi tradition, and by some counts the best-selling poet in the modern United States.']
  ],

  branches: [
    ['Sunni', 'About four fifths of Muslims; leadership by consensus of the community, with four schools of law.'],
    ['Shia', 'Holds leadership belonged to the Prophet’s family through Ali; dominant in Iran and Iraq.'],
    ['Sufism', 'The mystical current running through both, concerned with the direct experience of God.'],
    ['Ibadi', 'An early and distinct tradition, now chiefly in Oman.']
  ],

  practices: [
    ['The five prayers', 'At fixed times from dawn to night, facing Mecca, preceded by washing.'],
    ['Ramadan', 'A lunar month of fasting from first light to sunset, no food, no drink, and of night prayer.'],
    ['Zakat', 'The annual share of wealth to those entitled to it.'],
    ['Hajj', 'The pilgrimage to Mecca, once in a lifetime for those able.'],
    ['Dhikr', 'Remembrance: repetition of the names of God, often on a strand of beads.']
  ],

  festivals: [
    ['Ramadan', 'lunar', 'The month of fasting; it moves through the solar year, so it is sometimes kept in high summer.'],
    ['Laylat al-Qadr', 'lunar', 'The Night of Power in the last ten nights of Ramadan, said to be better than a thousand months.'],
    ['Eid al-Fitr', 'lunar', 'The feast breaking the fast: new clothes, gifts, and a communal prayer at dawn.'],
    ['Eid al-Adha', 'lunar', 'The feast of sacrifice at the close of the hajj, remembering Abraham; the meat is shared in thirds.']
  ],

  reading: 'Do not begin at surah 2. The order is roughly by length, not chronology or difficulty, and the second surah is one of the longest and most legally dense in the book. Begin with al-Fatiha, the seven-verse opening, then read the short surahs at the very end, 93 through 114, which are the earliest revealed, brief, and close to poetry. Then Yusuf (12), the one sustained narrative. Then work outward. And if you can, hear it recited once; the text assumes it.'
}

];

function traditionById(id) {
  for (var i = 0; i < FL_TRADITIONS.length; i++) if (FL_TRADITIONS[i].id === id) return FL_TRADITIONS[i];
  return null;
}
function traditionOfWork(workId) {
  for (var i = 0; i < FL_TRADITIONS.length; i++) {
    if (FL_TRADITIONS[i].works.indexOf(workId) > -1) return FL_TRADITIONS[i];
  }
  return null;
}
