/* First Light: the threads.

   One question, and what each tradition in the Library says about it, in its own
   words, with the citation attached so any of it can be checked.

   THE EDITORIAL RULE, because it is easy to get this wrong and the whole thing is
   worthless if it is got wrong: a thread is not an argument that everyone secretly
   agrees. Several of these end in genuine disagreement, and where they do, the
   closing note says so rather than smoothing it. The Golden Rule really does appear
   almost everywhere and that is remarkable; the nature of the self really is a
   dispute, and pretending otherwise would flatter the reader and insult the
   traditions. Passages are quoted whole where possible and never trimmed to remove
   a qualifier that inconveniences the theme.

   Translations are the public-domain ones the Library ships, so a reader who follows
   a citation lands on exactly these words. */

var FL_THREADS = [

{ id: 'golden-rule',
  title: 'Do not do to others',
  question: 'Is there one rule underneath all the others?',
  intro: 'This is the strongest case for convergence in the whole library. The same rule, in nearly the same words, arrived independently in China, India, Greece, Palestine and Arabia across a span of a thousand years. Notice as you read that the older formulations are almost all negative, do not do, and that this is not a weaker version. It is a more careful one: refraining is something you can actually do to everyone, all the time.',
  voices: [
    { t: 'confucian', text: 'What you do not want done to yourself, do not do to others.', cite: 'Analects 15.23' },
    { t: 'jewish', text: 'Thou shalt love thy neighbour as thyself.', cite: 'Leviticus 19:18' },
    { t: 'hindu', text: 'One should never do to another what one regards as injurious to oneself.', cite: 'Mahabharata 13.114.8' },
    { t: 'buddhist', text: 'All tremble at violence; all fear death. Comparing others with oneself, one should neither kill nor cause to kill.', cite: 'Dhammapada 129' },
    { t: 'christian', text: 'Therefore whatever you desire for men to do to you, you shall also do to them; for this is the law and the prophets.', cite: 'Matthew 7:12' },
    { t: 'muslim', text: 'None of you truly believes until he loves for his brother what he loves for himself.', cite: 'Hadith, Bukhari 13' },
    { t: 'taoist', text: 'To those who are good to me, I am good; and to those who are not good to me, I am also good, and thus all get to be good.', cite: 'Tao Te Ching 49' }
  ],
  close: 'The Taoist entry is the outlier, and worth sitting with. Every other voice takes your own preferences as the measure of your conduct toward others. Laozi declines the symmetry entirely: goodness is not a response to be earned but a way of proceeding, extended to people who have not extended it to you. Confucius, asked whether one should repay injury with kindness, answered no: repay injury with justice, and kindness with kindness. Two Chinese teachers, a century apart, in flat contradiction. The tradition kept both.'
},

{ id: 'suffering',
  title: 'What suffering is for',
  question: 'Is pain meaningful, or only real?',
  intro: 'Here the traditions genuinely part. Every one of them acknowledges that living hurts. What they say next (whether the hurt is instructive, illusory, deserved, redemptive, or simply the price of being attached to a world that moves) differs so much that the answers cannot all be true.',
  voices: [
    { t: 'buddhist', text: 'There is no fire like passion, no grip like hatred, no net like delusion, no river like craving.', cite: 'Dhammapada 251' },
    { t: 'jewish', text: 'Though he slay me, yet will I trust in him.', cite: 'Job 13:15' },
    { t: 'hindu', text: 'The contacts of the senses give rise to heat and cold, pleasure and pain; they come and go, they are impermanent. Endure them bravely.', cite: 'Bhagavad Gita 2.14' },
    { t: 'christian', text: 'In the world you have trouble; but cheer up! I have overcome the world.', cite: 'John 16:33' },
    { t: 'muslim', text: 'For indeed, with hardship comes ease.', cite: "Qur'an 94:5" },
    { t: 'taoist', text: 'Under heaven nothing is more soft and yielding than water. Yet for attacking the solid and strong, nothing is better.', cite: 'Tao Te Ching 78' },
    { t: 'confucian', text: 'The gem cannot be polished without friction, nor a person perfected without trials.', cite: 'Chinese proverb, in the Confucian tradition' }
  ],
  close: 'Job is the honest one, and the reason his book is in the canon at all. Three friends arrive to explain his suffering with the standard theology (you must have deserved it) and the book\'s verdict is that they are wrong and have spoken falsely about God. No explanation is ever given to Job. He is shown the wild ass and the storehouses of snow, and that is the answer. Any tradition that claims to have solved this should be read against that book.'
},

{ id: 'death',
  title: 'Numbering the days',
  question: 'How should a person hold their own death?',
  intro: 'Not one of these traditions advises you to avoid the subject. Every one of them prescribes deliberately contemplating your own death, and does so not as morbidity but as a technique for seeing the present clearly. It is possibly the single most universal practical instruction in the library.',
  voices: [
    { t: 'jewish', text: 'So teach us to number our days, that we may get us a heart of wisdom.', cite: 'Psalm 90:12' },
    { t: 'buddhist', text: 'All conditioned things are impermanent. When one sees this with wisdom, one turns away from suffering.', cite: 'Dhammapada 277' },
    { t: 'hindu', text: 'For the born, death is certain; for the dead, birth is certain. Therefore you should not grieve over the inevitable.', cite: 'Bhagavad Gita 2.27' },
    { t: 'christian', text: 'For you are dust, and to dust you shall return.', cite: 'Genesis 3:19' },
    { t: 'muslim', text: 'He who created death and life to test you, which of you is best in deed.', cite: "Qur'an 67:2" },
    { t: 'taoist', text: 'Life is the companion of death, death is the beginning of life. Who understands their workings?', cite: 'Zhuangzi, Knowledge Wandered North' },
    { t: 'confucian', text: 'While you do not know life, how can you know about death?', cite: 'Analects 11.11' }
  ],
  close: 'Confucius refuses the question, and it is not evasion. Asked about serving the spirits he says: you cannot yet serve people. Asked about death: you do not yet understand life. His position is that speculation about what follows is a way of not attending to what is in front of you, and that the person who has lived well has already answered the question as far as it can be answered. Zhuangzi, told his wife had died, was found drumming on a tub and singing.'
},

{ id: 'silence',
  title: 'The uses of silence',
  question: 'Why does every tradition ask you to stop talking?',
  intro: 'Stillness, sitting, retreat, a day of stopping, a mouth kept shut. The instruction is everywhere, and it is always practical rather than decorative: the claim is not that silence is pleasant but that certain things cannot be perceived through noise, including your own noise.',
  voices: [
    { t: 'jewish', text: 'Be still, and know that I am God.', cite: 'Psalm 46:10' },
    { t: 'taoist', text: 'Those who know do not speak; those who speak do not know.', cite: 'Tao Te Ching 56' },
    { t: 'buddhist', text: 'These are the roots of trees; these are empty huts. Meditate; do not be negligent.', cite: 'Majjhima Nikaya, recurring' },
    { t: 'christian', text: 'But you, when you pray, enter into your inner room, and having shut your door, pray to your Father who is in secret.', cite: 'Matthew 6:6' },
    { t: 'muslim', text: 'Verily, in the remembrance of God do hearts find rest.', cite: "Qur'an 13:28" },
    { t: 'hindu', text: 'When the five senses and the mind are still, and reason itself rests in silence, then begins the highest path.', cite: 'Katha Upanishad 2.3.10' },
    { t: 'confucian', text: 'The superior man is modest in his speech but exceeds in his actions.', cite: 'Analects 14.27' }
  ],
  close: 'The Sabbath is the most radical version, because it is legislated. Not a mood to be cultivated when convenient but a law: one day in seven, everything stops, including for your servants and your animals and the stranger inside your gates. It is the first thing the Hebrew Bible calls holy, and what it makes holy is not a place or an object but an interval of time in which nothing is produced.'
},

{ id: 'stranger',
  title: 'The one who cannot repay you',
  question: 'What is owed to a person outside your circle?',
  intro: 'Reciprocity is easy to justify and nearly universal among social animals. What is striking in these texts is how insistently they push past it: to the stranger, the enemy, the poor, the person from whom nothing can be expected in return. This is where each tradition says something that costs its adherents something.',
  voices: [
    { t: 'jewish', text: 'The stranger that sojourneth with you shall be unto you as the home-born among you, and thou shalt love him as thyself; for ye were strangers in the land of Egypt.', cite: 'Leviticus 19:34' },
    { t: 'christian', text: 'Inasmuch as you did it to one of the least of these my brothers, you did it to me.', cite: 'Matthew 25:40' },
    { t: 'muslim', text: 'They give food, in spite of their own need, to the needy, the orphan and the captive, saying: we feed you only for the countenance of God; we wish from you neither reward nor thanks.', cite: "Qur'an 76:8–9" },
    { t: 'buddhist', text: 'As a mother would protect her only child with her life, even so let one cultivate a boundless heart toward all beings.', cite: 'Karaniya Metta Sutta' },
    { t: 'hindu', text: 'The gift that is given to one from whom no return is expected, at a fit place and time and to a worthy person, that gift is held to be pure.', cite: 'Bhagavad Gita 17.20' },
    { t: 'confucian', text: 'Within the four seas, all are brothers.', cite: 'Analects 12.5' },
    { t: 'taoist', text: 'The sage does not accumulate for himself. The more he does for others, the more he has.', cite: 'Tao Te Ching 81' }
  ],
  close: 'The Levitical command is the one with a reason attached, and the reason is memory: love the stranger, because you were strangers. It grounds the obligation not in the stranger\'s worth, which can be disputed, nor in your own virtue, which can be flattered, but in something that happened to you. It is the oldest argument for hospitality in the West and still the hardest to wriggle out of.'
},

{ id: 'enough',
  title: 'Knowing what is enough',
  question: 'How much is enough, and how would you know?',
  intro: 'Every tradition here is suspicious of accumulation, and none of them is merely being ascetic about it. The argument in each case is practical: that wanting is a state with its own momentum, that it does not terminate when satisfied, and that a person who has not decided in advance what enough looks like will not recognise it on arrival.',
  voices: [
    { t: 'taoist', text: 'He who knows that enough is enough will always have enough.', cite: 'Tao Te Ching 46' },
    { t: 'buddhist', text: 'Health is the greatest gift, contentment the greatest wealth, a trusted friend the best relative.', cite: 'Dhammapada 204' },
    { t: 'jewish', text: 'Who is rich? He who rejoices in his portion.', cite: 'Pirkei Avot 4:1' },
    { t: 'christian', text: 'For where your treasure is, there your heart will be also.', cite: 'Matthew 6:21' },
    { t: 'muslim', text: 'Rivalry in worldly increase distracts you, until you come to the graves.', cite: "Qur'an 102:1–2" },
    { t: 'hindu', text: 'Let right deeds be thy motive, not the fruit which comes from them.', cite: 'Bhagavad Gita 2.47' },
    { t: 'confucian', text: 'With coarse rice to eat, water to drink, and my bended arm for a pillow, I have still joy in the midst of these things.', cite: 'Analects 7.15' }
  ],
  close: 'None of these texts is against wealth as such, which is a modern misreading. The Hebrew Bible treats prosperity as a blessing; the Qur\'an assumes trade and regulates it; Confucius says that if riches could be properly sought he would seek them. The objection is to a particular relation: being held by what you hold. The Gita puts it most precisely: the problem is not the action or its result, but the grip.'
},

{ id: 'beginning-again',
  title: 'Beginning again',
  question: 'What happens after you fail?',
  intro: 'Every one of these traditions expects you to fail, builds the expectation into its structure, and provides a route back. This is worth noticing, because the popular impression of religion is of a standard held over people. The texts read more like instructions for recovery than for perfection.',
  voices: [
    { t: 'jewish', text: 'Return unto Me, and I will return unto you, saith the Lord of hosts.', cite: 'Malachi 3:7' },
    { t: 'muslim', text: 'Do not despair of the mercy of God. Indeed, God forgives all sins.', cite: "Qur'an 39:53" },
    { t: 'christian', text: 'Forgive us our debts, as we also forgive our debtors.', cite: 'Matthew 6:12' },
    { t: 'confucian', text: 'When you have faults, do not fear to abandon them.', cite: 'Analects 1.8' },
    { t: 'buddhist', text: 'Should a person do good, let him do it again; let him find pleasure therein.', cite: 'Dhammapada 118' },
    { t: 'taoist', text: 'Return is the movement of the Tao.', cite: 'Tao Te Ching 40' },
    { t: 'hindu', text: 'Even if a man of the most vile conduct worships me with undivided devotion, he is to be regarded as righteous, for he has rightly resolved.', cite: 'Bhagavad Gita 9.30' }
  ],
  close: 'The Hebrew word is teshuvah, and it does not mean penance. It means turning, or returning: the assumption built into the word is that you were on the path already and can rejoin it, that failure is a departure rather than a disqualification. The Ten Days between the new year and the Day of Atonement exist to give that turn a season. So does Lent, and so does Ramadan. Every one of these calendars has a built-in annual amnesty, on the apparent theory that people need one.'
},

{ id: 'self',
  title: 'What you actually are',
  question: 'Is there a self, and if so, what is it?',
  intro: 'This is where the library divides most sharply, and the divisions are not a matter of emphasis. The Upanishads and the Pali canon give opposite answers to the same question in the same language, a few hundred miles and a few centuries apart. Read this thread for the disagreement, not past it.',
  voices: [
    { t: 'hindu', text: 'That which is the subtle essence: this whole world has that as its self. That is the true. That is the self. That art thou.', cite: 'Chandogya Upanishad 6.8.7' },
    { t: 'buddhist', text: 'All things are not-self. When one sees this with wisdom, one turns away from suffering.', cite: 'Dhammapada 279' },
    { t: 'jewish', text: 'And the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life.', cite: 'Genesis 2:7' },
    { t: 'christian', text: 'It is no longer I who live, but Christ living in me.', cite: 'Galatians 2:20' },
    { t: 'muslim', text: 'We are nearer to him than his jugular vein.', cite: "Qur'an 50:16" },
    { t: 'taoist', text: 'Once Zhuang Zhou dreamt he was a butterfly. Suddenly he awoke, and was solidly Zhou. He did not know whether he was Zhou who had dreamt he was a butterfly, or a butterfly dreaming he was Zhou.', cite: 'Zhuangzi 2' },
    { t: 'confucian', text: 'The superior man seeks it in himself; the small man seeks it in others.', cite: 'Analects 15.20' }
  ],
  close: 'Tat tvam asi, that art thou, says the deepest thing in you is identical with the ground of everything. Anattā says look for that deepest thing and you will not find it: there is seeing with no fixed seer behind it. Both are reports from people who spent their lives investigating, and both are held today by serious practitioners. The library does not resolve this. It is a real question, still open, and the honest thing an almanac can do is set the two sentences next to each other and let them stay uncomfortable.'
}

];

function threadById(id) {
  for (var i = 0; i < FL_THREADS.length; i++) if (FL_THREADS[i].id === id) return FL_THREADS[i];
  return null;
}
