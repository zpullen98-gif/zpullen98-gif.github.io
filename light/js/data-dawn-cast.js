/* Character index. Source passages live in data-anthology.js. */
var DAWN_CAST_GROUPS = [
  {
    "id": "leaders",
    "title": "Ghosts at the Golden Table",
    "episode": "I"
  },
  {
    "id": "wisdom",
    "title": "The Last Supper of Ages",
    "episode": "II"
  },
  {
    "id": "commanders",
    "title": "Dinner of Conquerors",
    "episode": "III"
  },
  {
    "id": "explorers",
    "title": "Adventurers at the Edge of the World",
    "episode": "V"
  },
  {
    "id": "storybook",
    "title": "The Dinner Party at the End of All Things",
    "episode": "VI"
  },
  {
    "id": "comics",
    "title": "The Dinner from Hell",
    "episode": "VII"
  }
];
var DAWN_CAST = [
  {
    "id": "george-washington",
    "name": "George Washington",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-washington-peace",
      "history-washington-knowledge",
      "history-washington-discipline",
      "history-washington-different-optics",
      "history-washington-free-speech",
      "history-washington-conscience",
      "history-washington-light-paths",
      "history-washington-happiness-home",
      "history-washington-virtue-happiness",
      "history-washington-honesty"
    ]
  },
  {
    "id": "thomas-jefferson",
    "name": "Thomas Jefferson",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-jefferson-books",
      "history-jefferson-honesty",
      "history-jefferson-plain-dealing",
      "history-jefferson-truth-leads",
      "history-jefferson-future-dreams",
      "history-jefferson-discussion",
      "history-jefferson-do-today",
      "history-jefferson-willingly",
      "history-jefferson-smooth-handle",
      "history-jefferson-knowledge"
    ]
  },
  {
    "id": "abraham-lincoln",
    "name": "Abraham Lincoln",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-lincoln-diligence",
      "history-lincoln-government",
      "history-lincoln-charity",
      "history-lincoln-finish-work",
      "history-lincoln-compromise",
      "history-lincoln-friends",
      "history-lincoln-bonds-affection",
      "history-lincoln-right-might",
      "history-lincoln-dare-duty",
      "history-lincoln-think-anew"
    ]
  },
  {
    "id": "theodore-roosevelt",
    "name": "Theodore Roosevelt",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-theodore-arena",
      "history-theodore-error",
      "history-theodore-square-deal",
      "history-theodore-public-welfare",
      "history-theodore-practical-training",
      "history-theodore-power-responsibility",
      "history-theodore-self-government",
      "history-theodore-duties",
      "history-theodore-truthful-criticism",
      "history-theodore-look-upward"
    ]
  },
  {
    "id": "franklin-d-roosevelt",
    "name": "Franklin D. Roosevelt",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-fdr-human-rights",
      "history-fdr-fear",
      "history-fdr-clear-eyes",
      "history-fdr-unity-purpose",
      "history-fdr-enough",
      "history-fdr-hardheartedness",
      "history-fdr-changing-conditions",
      "history-fdr-right-life",
      "history-fdr-economic-freedom",
      "history-fdr-wishful-thinking"
    ]
  },
  {
    "id": "dwight-d-eisenhower",
    "name": "Dwight D. Eisenhower",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-eisenhower-disarmament",
      "history-eisenhower-liberty-security",
      "history-eisenhower-world-in-arms",
      "history-eisenhower-common-hunger",
      "history-eisenhower-principles",
      "history-eisenhower-leaders-serve",
      "history-eisenhower-difficult-task",
      "history-eisenhower-confidence",
      "history-eisenhower-patience",
      "history-eisenhower-avenues-peace"
    ]
  },
  {
    "id": "john-f-kennedy",
    "name": "John F. Kennedy",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-kennedy-moon",
      "history-kennedy-new-sea",
      "history-kennedy-service",
      "history-kennedy-negotiate-fear",
      "history-kennedy-fear-negotiate",
      "history-kennedy-human-destiny",
      "history-kennedy-same-air",
      "history-kennedy-shared-rights",
      "history-kennedy-moral-issue",
      "history-kennedy-poetry-cleanses"
    ]
  },
  {
    "id": "queen-elizabeth-ii",
    "name": "Queen Elizabeth II",
    "group": "leaders",
    "aliases": [
      "Elizabeth II"
    ],
    "quoteIds": [
      "history-elizabeth-cherish",
      "history-elizabeth-hate-destroy",
      "history-elizabeth-whole-ourselves",
      "history-elizabeth-time-action",
      "history-elizabeth-ordinary-inspiration",
      "history-elizabeth-love-grows",
      "history-elizabeth-goodwill",
      "history-elizabeth-neighbour",
      "history-elizabeth-action-reflection",
      "history-elizabeth-looking-back"
    ]
  },
  {
    "id": "winston-churchill",
    "name": "Winston Churchill",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-churchill-gratitude",
      "history-churchill-blood-toil",
      "history-churchill-long-struggle",
      "history-churchill-evacuations",
      "history-churchill-never-surrender",
      "history-churchill-brace-duty",
      "history-churchill-finest-hour",
      "history-churchill-honour-sense",
      "history-churchill-appearances",
      "history-churchill-iron-curtain"
    ]
  },
  {
    "id": "nelson-mandela",
    "name": "Nelson Mandela",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-mandela-new-age",
      "history-mandela-together",
      "history-mandela-justice",
      "history-mandela-against-domination",
      "history-mandela-equal-opportunities",
      "history-mandela-humble-servant",
      "history-mandela-march-freedom",
      "history-mandela-reward-not-money",
      "history-mandela-learning-mistakes",
      "history-mandela-own-errors"
    ]
  },
  {
    "id": "charles-de-gaulle",
    "name": "Charles de Gaulle",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-degaulle-hope",
      "history-degaulle-flame",
      "history-degaulle-paris-liberated",
      "history-degaulle-greater-moments",
      "history-degaulle-patient-success",
      "history-degaulle-as-we-are",
      "history-degaulle-political-peace",
      "history-degaulle-time-to-hope",
      "history-degaulle-passion-reason",
      "history-degaulle-with-allies"
    ]
  },
  {
    "id": "oliver-cromwell",
    "name": "Oliver Cromwell",
    "group": "leaders",
    "aliases": [],
    "quoteIds": [
      "history-cromwell-fallibility",
      "history-cromwell-bethink",
      "history-cromwell-helpers",
      "history-cromwell-judge-abuse",
      "history-cromwell-patience",
      "history-cromwell-real-help",
      "history-cromwell-conscience",
      "history-cromwell-mind",
      "history-cromwell-need-compassion",
      "history-cromwell-welcome-letter"
    ]
  },
  {
    "id": "socrates",
    "name": "Socrates",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-socrates-examination",
      "wisdom-socrates-limits",
      "wisdom-socrates-together",
      "wisdom-socrates-no-wrong",
      "wisdom-socrates-wisdom-virtue",
      "wisdom-socrates-truth-desire",
      "wisdom-socrates-uncertainty",
      "wisdom-socrates-enquire",
      "wisdom-socrates-truth",
      "wisdom-socrates-piety"
    ]
  },
  {
    "id": "plato",
    "name": "Plato",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-plato-enquire",
      "wisdom-plato-beginning",
      "wisdom-plato-goodness",
      "wisdom-plato-simplicity",
      "wisdom-plato-music",
      "wisdom-plato-own-work",
      "wisdom-plato-inner-life",
      "wisdom-plato-free-learning",
      "wisdom-plato-harmony",
      "wisdom-plato-play"
    ]
  },
  {
    "id": "aristotle",
    "name": "Aristotle",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-aristotle-summer",
      "wisdom-aristotle-action",
      "wisdom-aristotle-building",
      "wisdom-aristotle-just-acts",
      "wisdom-aristotle-deliberation",
      "wisdom-aristotle-practical",
      "wisdom-aristotle-friends",
      "wisdom-aristotle-community",
      "wisdom-aristotle-living-active",
      "wisdom-aristotle-another-self"
    ]
  },
  {
    "id": "zeno-of-citium",
    "name": "Zeno of Citium",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-zeno-careful-speech",
      "wisdom-zeno-shipwreck",
      "wisdom-zeno-friend",
      "wisdom-zeno-one-community",
      "wisdom-zeno-divine-law",
      "wisdom-zeno-nature-causation",
      "wisdom-zeno-life-virtue",
      "wisdom-zeno-confidence",
      "wisdom-zeno-model-character",
      "wisdom-zeno-secret-syllogism"
    ]
  },
  {
    "id": "epictetus",
    "name": "Epictetus",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-epictetus-control",
      "wisdom-epictetus-small-beginnings",
      "wisdom-epictetus-virtue-tranquillity",
      "wisdom-epictetus-training-results",
      "wisdom-epictetus-habits-actions",
      "wisdom-epictetus-anger-days",
      "wisdom-epictetus-useful-practice",
      "wisdom-epictetus-contrary-habit",
      "wisdom-epictetus-chosen-character",
      "wisdom-epictetus-good-or-praise"
    ]
  },
  {
    "id": "seneca",
    "name": "Seneca",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-seneca-hour",
      "wisdom-seneca-postponing",
      "wisdom-seneca-digest",
      "wisdom-seneca-everywhere",
      "wisdom-seneca-trust",
      "wisdom-seneca-speak",
      "wisdom-seneca-learn-teach",
      "wisdom-seneca-share",
      "wisdom-seneca-companions",
      "wisdom-seneca-teachers-learn"
    ]
  },
  {
    "id": "marcus-aurelius",
    "name": "Marcus Aurelius",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "history-marcus-learning",
      "history-marcus-revenge",
      "history-marcus-transformation",
      "history-marcus-practice-goodness",
      "history-marcus-truth",
      "wisdom-marcus-grandfather",
      "wisdom-marcus-common-interest",
      "wisdom-marcus-morning-work",
      "wisdom-marcus-accept-help",
      "wisdom-marcus-purpose"
    ]
  },
  {
    "id": "confucius",
    "name": "Confucius",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-confucius-learning",
      "wisdom-confucius-friends",
      "wisdom-confucius-thought",
      "wisdom-confucius-impartial",
      "wisdom-confucius-virtue-neighbours",
      "wisdom-confucius-caution",
      "wisdom-confucius-fellow-travellers",
      "wisdom-confucius-arts",
      "wisdom-confucius-ability",
      "wisdom-confucius-reciprocity"
    ]
  },
  {
    "id": "moses",
    "name": "Moses",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-moses-calling",
      "wisdom-moses-speech",
      "wisdom-moses-stand-still",
      "wisdom-moses-hold-peace",
      "wisdom-moses-whole-heart",
      "wisdom-moses-teach-children",
      "wisdom-moses-stranger",
      "wisdom-moses-walk",
      "wisdom-moses-near-word",
      "wisdom-moses-choose-life"
    ]
  },
  {
    "id": "gautama-buddha",
    "name": "Gautama Buddha",
    "group": "wisdom",
    "aliases": [
      "Buddha",
      "Siddhartha Gautama"
    ],
    "quoteIds": [
      "wisdom-buddha-hatred-love",
      "wisdom-buddha-earnestness",
      "wisdom-buddha-tamed-mind",
      "wisdom-buddha-virtue-perfume",
      "wisdom-buddha-self-craft",
      "wisdom-buddha-words-sense",
      "wisdom-buddha-small-good",
      "wisdom-buddha-self-responsibility",
      "wisdom-buddha-anger-love",
      "wisdom-buddha-personal-effort"
    ]
  },
  {
    "id": "muhammad",
    "name": "Muhammad",
    "group": "wisdom",
    "aliases": [],
    "quoteIds": [
      "wisdom-muhammad-intentions",
      "wisdom-muhammad-brother",
      "wisdom-muhammad-hospitality",
      "wisdom-muhammad-goodness",
      "wisdom-muhammad-anger",
      "wisdom-muhammad-strength",
      "wisdom-muhammad-time",
      "wisdom-muhammad-ease",
      "wisdom-muhammad-kindness",
      "wisdom-muhammad-moderation"
    ]
  },
  {
    "id": "jesus-of-nazareth",
    "name": "Jesus of Nazareth",
    "group": "wisdom",
    "aliases": [
      "Jesus"
    ],
    "quoteIds": [
      "wisdom-jesus-mercy",
      "wisdom-jesus-peacemakers",
      "wisdom-jesus-treasure",
      "wisdom-jesus-today",
      "wisdom-jesus-seek",
      "wisdom-jesus-fruits",
      "wisdom-jesus-give",
      "wisdom-jesus-wise-gentle",
      "wisdom-jesus-rest",
      "wisdom-jesus-light-burden"
    ]
  },
  {
    "id": "julius-caesar",
    "name": "Julius Caesar",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-caesar-deliberation",
      "cast-caesar-personal-wrongs",
      "cast-caesar-urgent-demands",
      "cast-caesar-trained-judgement",
      "cast-caesar-wishful-thinking",
      "cast-caesar-love-of-liberty",
      "cast-caesar-unverified-reports",
      "cast-caesar-answers-we-want",
      "cast-caesar-admitting-uncertainty",
      "cast-caesar-planning-before-crisis"
    ]
  },
  {
    "id": "alexander-the-great",
    "name": "Alexander the Great",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-alexander-read-events",
      "cast-alexander-keep-agreements",
      "cast-alexander-confession",
      "cast-alexander-danger-of-flattery",
      "cast-alexander-admiration-with-criticism",
      "cast-alexander-shared-labour",
      "cast-alexander-limits-of-ambition",
      "cast-alexander-listen-to-companions",
      "cast-alexander-shared-thirst",
      "cast-alexander-acknowledge-wrong"
    ]
  },
  {
    "id": "genghis-khan",
    "name": "Genghis Khan",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-genghis-friend-at-risk",
      "cast-genghis-welcome-correction",
      "cast-genghis-value-candour",
      "cast-genghis-admit-confusion",
      "cast-genghis-leadership-tradition",
      "cast-genghis-compulsory-service",
      "cast-genghis-conquerors-reputation",
      "cast-genghis-growing-ambition",
      "cast-genghis-cost-of-glory",
      "cast-genghis-wisdom-and-strength"
    ]
  },
  {
    "id": "hannibal-barca",
    "name": "Hannibal Barca",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-hannibal-practical-sense",
      "cast-hannibal-ask-local-guides",
      "cast-hannibal-difficult-circumstances",
      "cast-hannibal-careful-judgement",
      "cast-hannibal-shared-command",
      "cast-hannibal-fortune-changes",
      "cast-hannibal-least-evil",
      "cast-hannibal-loyalty",
      "cast-hannibal-composure",
      "cast-hannibal-practice-and-observation"
    ]
  },
  {
    "id": "napoleon-bonaparte",
    "name": "Napoleon Bonaparte",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-napoleon-purpose",
      "cast-napoleon-fortitude",
      "cast-napoleon-serve-france",
      "cast-napoleon-farewell",
      "cast-napoleon-teach-and-learn",
      "cast-napoleon-thoughtful-gift",
      "cast-napoleon-growth",
      "cast-napoleon-companionship",
      "cast-napoleon-clemency",
      "cast-napoleon-courage-with-limits"
    ]
  },
  {
    "id": "duke-of-wellington",
    "name": "Duke of Wellington",
    "group": "commanders",
    "aliases": [
      "Arthur Wellesley",
      "Duke of Wellington (Arthur Wellesley)"
    ],
    "quoteIds": [
      "cast-wellington-shared-credit",
      "cast-wellington-cost-of-victory",
      "cast-wellington-real-costs",
      "cast-wellington-care-for-resources",
      "cast-wellington-correct-a-mistake",
      "cast-wellington-explain-the-cost",
      "cast-wellington-question-the-plan",
      "cast-wellington-know-your-authority",
      "cast-wellington-truth-before-favour",
      "cast-wellington-path-of-duty"
    ]
  },
  {
    "id": "khalid-ibn-al-walid",
    "name": "Khalid ibn al-Walid",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-khalid-mutah",
      "cast-khalid-recognition",
      "cast-khalid-fair-assessment",
      "cast-khalid-respect",
      "cast-khalid-refuse-wrong",
      "cast-khalid-accountability",
      "cast-khalid-ask-before-assuming",
      "cast-khalid-name-the-dish",
      "cast-khalid-admit-distress",
      "cast-khalid-hospitality-and-choice"
    ]
  },
  {
    "id": "attila-the-hun",
    "name": "Attila the Hun",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-attila-temperance",
      "cast-attila-simple-dress",
      "cast-attila-protection",
      "cast-attila-legendary-confidence",
      "cast-attila-welcome-prepared",
      "cast-attila-generous-feast",
      "cast-attila-kind-message",
      "cast-attila-overcome-distance",
      "cast-attila-make-amends",
      "cast-attila-guests-safe"
    ]
  },
  {
    "id": "frederick-the-great",
    "name": "Frederick the Great",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-frederick-clear-laws",
      "cast-frederick-proportionate-punishment",
      "cast-frederick-law-before-violence",
      "cast-frederick-not-all-wicked",
      "cast-frederick-own-character",
      "cast-frederick-first-servant",
      "cast-frederick-sound-reasoning",
      "cast-frederick-limits-of-command",
      "cast-frederick-books-for-learning",
      "cast-frederick-equal-diligence"
    ]
  },
  {
    "id": "william-the-conqueror",
    "name": "William the Conqueror",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-william-protection-from-wrong",
      "cast-william-inheritance",
      "cast-william-peace-between-peoples",
      "cast-william-continuity-of-law",
      "cast-william-right-law",
      "cast-william-just-judgements",
      "cast-william-good-and-evil",
      "cast-william-cost-of-rule",
      "cast-william-adhere-to-justice",
      "cast-william-reckoning"
    ]
  },
  {
    "id": "jan-zizka",
    "name": "Jan Žižka",
    "group": "commanders",
    "aliases": [
      "Jan Zizka"
    ],
    "quoteIds": [
      "cast-zizka-prepare-supplies",
      "cast-zizka-ready-and-resolute",
      "cast-zizka-discard-quarrels",
      "cast-zizka-orderly-hearing",
      "cast-zizka-acknowledge-harm",
      "cast-zizka-consult-in-person",
      "cast-zizka-check-rumours",
      "cast-zizka-written-reply",
      "cast-zizka-trusted-messenger",
      "cast-zizka-community-purpose"
    ]
  },
  {
    "id": "charlemagne",
    "name": "Charlemagne",
    "group": "commanders",
    "aliases": [],
    "quoteIds": [
      "cast-charlemagne-welcome-foreigners",
      "cast-charlemagne-learning-through-life",
      "cast-charlemagne-hospitality",
      "cast-charlemagne-mutual-charity",
      "cast-charlemagne-study-your-purpose",
      "cast-charlemagne-understanding",
      "cast-charlemagne-careful-preparation",
      "cast-charlemagne-clear-inventories",
      "cast-charlemagne-thoughtful-speech",
      "cast-charlemagne-uncertain-intentions"
    ]
  },
  {
    "id": "christopher-columbus",
    "name": "Christopher Columbus",
    "group": "explorers",
    "aliases": [],
    "quoteIds": [
      "cast-christopher-columbus-chart-the-journey",
      "cast-christopher-columbus-test-navigation",
      "cast-christopher-columbus-islanders-generosity",
      "cast-christopher-columbus-local-knowledge",
      "cast-christopher-columbus-open-to-judgement",
      "cast-christopher-columbus-shared-accountability",
      "cast-christopher-columbus-make-time-for-rest",
      "cast-christopher-columbus-bread-and-fruit",
      "cast-christopher-columbus-sail-on",
      "cast-christopher-columbus-shoreless-seas"
    ]
  },
  {
    "id": "hernan-cortes",
    "name": "Hernán Cortés",
    "group": "explorers",
    "aliases": [
      "Hernan Cortes"
    ],
    "quoteIds": [
      "cast-hernan-cortes-heed-the-pilots",
      "cast-hernan-cortes-anchoring-risk",
      "cast-hernan-cortes-food-houses",
      "cast-hernan-cortes-market-order",
      "cast-hernan-cortes-logistics",
      "cast-hernan-cortes-admitting-deception",
      "cast-hernan-cortes-necessity-and-ingenuity",
      "cast-hernan-cortes-bring-supplies",
      "cast-hernan-cortes-use-your-bearings",
      "cast-hernan-cortes-check-uncertainty"
    ]
  },
  {
    "id": "sacagawea",
    "name": "Sacagawea",
    "group": "explorers",
    "aliases": [
      "Sacajawea",
      "Sakakawea"
    ],
    "quoteIds": [
      "cast-sacagawea-rescue",
      "cast-sacagawea-river",
      "cast-sacagawea-landmark",
      "cast-sacagawea-reunion",
      "cast-sacagawea-nation",
      "cast-sacagawea-peace",
      "cast-sacagawea-food",
      "cast-sacagawea-ocean",
      "cast-sacagawea-knowledge",
      "cast-sacagawea-pilot"
    ]
  },
  {
    "id": "marco-polo",
    "name": "Marco Polo",
    "group": "explorers",
    "aliases": [],
    "quoteIds": [
      "cast-marco-evidence",
      "cast-marco-languages",
      "cast-marco-wonders",
      "cast-marco-craft",
      "cast-marco-salt",
      "cast-marco-provisions",
      "cast-marco-merchants",
      "cast-marco-trade",
      "cast-marco-desert",
      "cast-marco-gardens"
    ]
  },
  {
    "id": "ibn-battuta",
    "name": "Ibn Battuta",
    "group": "explorers",
    "aliases": [],
    "quoteIds": [
      "cast-ibn-battuta-leaving-home",
      "cast-ibn-battuta-kindly-welcome",
      "cast-ibn-battuta-first-kindness",
      "cast-ibn-battuta-shared-meal",
      "cast-ibn-battuta-cairo-crossroads",
      "cast-ibn-battuta-anatolian-hospitality",
      "cast-ibn-battuta-golden-light",
      "cast-ibn-battuta-care-for-students",
      "cast-ibn-battuta-homeward",
      "cast-ibn-battuta-stay-together"
    ]
  },
  {
    "id": "ferdinand-magellan",
    "name": "Ferdinand Magellan",
    "group": "explorers",
    "aliases": [],
    "quoteIds": [
      "cast-magellan-counsel",
      "cast-magellan-opinions",
      "cast-magellan-provisions",
      "cast-magellan-examine",
      "cast-magellan-letters",
      "cast-magellan-channels",
      "cast-magellan-signals",
      "cast-magellan-watch",
      "cast-magellan-winter",
      "cast-magellan-sight"
    ]
  },
  {
    "id": "ernest-shackleton",
    "name": "Ernest Shackleton",
    "group": "explorers",
    "aliases": [],
    "quoteIds": [
      "cast-shackleton-knowledge",
      "cast-shackleton-unreality",
      "cast-shackleton-humility",
      "cast-shackleton-food",
      "cast-shackleton-reconnoitre",
      "cast-shackleton-variation",
      "cast-shackleton-care",
      "cast-shackleton-hope",
      "cast-shackleton-memories",
      "cast-shackleton-rescue"
    ]
  },
  {
    "id": "david-livingstone",
    "name": "David Livingstone",
    "group": "explorers",
    "aliases": [],
    "quoteIds": [
      "cast-livingstone-learning",
      "cast-livingstone-language",
      "cast-livingstone-freedom",
      "cast-livingstone-encouragement",
      "cast-livingstone-correction",
      "cast-livingstone-return",
      "cast-livingstone-hospitality",
      "cast-livingstone-instruction",
      "cast-livingstone-care",
      "cast-livingstone-limits"
    ]
  },
  {
    "id": "amelia-earhart",
    "name": "Amelia Earhart",
    "group": "explorers",
    "aliases": [],
    "quoteIds": [
      "cast-earhart-travel",
      "cast-earhart-books",
      "cast-earhart-first-flight",
      "cast-earhart-experience",
      "cast-earhart-curiosity",
      "cast-earhart-preparation",
      "cast-earhart-hospitality",
      "cast-earhart-signs",
      "cast-earhart-choice",
      "cast-earhart-confidence"
    ]
  },
  {
    "id": "francis-drake",
    "name": "Francis Drake",
    "group": "explorers",
    "aliases": [],
    "quoteIds": [
      "cast-francis-drake-wind-and-timing",
      "cast-francis-drake-prayer-and-preparation",
      "cast-francis-drake-respect-an-opponent",
      "cast-francis-drake-within-a-command",
      "cast-francis-drake-help-for-posterity",
      "cast-francis-drake-hear-experience",
      "cast-francis-drake-gentle-encounter",
      "cast-francis-drake-change-the-route",
      "cast-francis-drake-toast-to-return",
      "cast-francis-drake-free-land"
    ]
  },
  {
    "id": "leif-erikson",
    "name": "Leif Erikson",
    "group": "explorers",
    "aliases": [
      "Leif Eiriksson",
      "Leif the Lucky"
    ],
    "quoteIds": [
      "cast-leif-erikson-difficult-message",
      "cast-leif-erikson-winter-sustenance",
      "cast-leif-erikson-winter-with-olaf",
      "cast-leif-erikson-rescue-at-sea",
      "cast-leif-erikson-look-beyond-the-helm",
      "cast-leif-erikson-ask-if-true",
      "cast-leif-erikson-peaceful-corner",
      "cast-leif-erikson-avoid-overwork",
      "cast-leif-erikson-freedom-and-dignity",
      "cast-leif-erikson-heart-desires"
    ]
  },
  {
    "id": "gandalf-the-grey",
    "name": "Gandalf the Grey",
    "group": "storybook",
    "aliases": [
      "Gandalf",
      "Gandalf the White",
      "Mithrandir"
    ],
    "quoteIds": [
      "me-gandalf-help-bear-burden",
      "me-gandalf-keep-up-courage",
      "me-tolkien-tides-of-world",
      "me-gandalf-steward",
      "me-gandalf-time",
      "cast-gandalf-wounds",
      "cast-gandalf-mercy",
      "cast-gandalf-such-times",
      "cast-gandalf-adventure",
      "cast-gandalf-good-morning"
    ]
  },
  {
    "id": "saruman-the-white",
    "name": "Saruman the White",
    "group": "storybook",
    "aliases": [
      "Saruman"
    ],
    "quoteIds": [
      "cast-saruman-late",
      "cast-saruman-join",
      "cast-saruman-ill-turn",
      "cast-saruman-greed",
      "cast-saruman-new-order",
      "cast-saruman-forests",
      "cast-saruman-no-dawn",
      "cast-saruman-opposition",
      "cast-saruman-lee-opposition",
      "cast-saruman-mckellen-appearance"
    ]
  },
  {
    "id": "albus-dumbledore",
    "name": "Albus Dumbledore",
    "group": "storybook",
    "aliases": [],
    "quoteIds": [
      "storybook-dumbledore-dreams-life",
      "storybook-dumbledore-next-adventure",
      "storybook-dumbledore-choices",
      "storybook-dumbledore-unsought-power",
      "storybook-dumbledore-music",
      "storybook-dumbledore-mercy",
      "storybook-dumbledore-lemon",
      "storybook-dumbledore-socks",
      "storybook-dumbledore-forgiveness",
      "storybook-dumbledore-manners"
    ]
  },
  {
    "id": "gellert-grindelwald",
    "name": "Gellert Grindelwald",
    "group": "storybook",
    "aliases": [],
    "quoteIds": [
      "cast-grindelwald-hold",
      "cast-grindelwald-free",
      "cast-grindelwald-control",
      "cast-grindelwald-cowards",
      "cast-grindelwald-freely",
      "cast-grindelwald-ourselves",
      "cast-grindelwald-tea",
      "cast-grindelwald-pain",
      "cast-grindelwald-love",
      "cast-grindelwald-greater-good"
    ]
  },
  {
    "id": "jon-snow",
    "name": "Jon Snow",
    "group": "storybook",
    "aliases": [],
    "quoteIds": [
      "cast-jon-forgive",
      "cast-jon-lies",
      "cast-jon-grenn",
      "cast-jon-toast",
      "cast-jon-thousands",
      "cast-jon-asked",
      "cast-jon-mercy",
      "cast-jon-remorse",
      "cast-jon-bravery",
      "cast-jon-oath"
    ]
  },
  {
    "id": "daenerys-targaryen",
    "name": "Daenerys Targaryen",
    "group": "storybook",
    "aliases": [],
    "quoteIds": [
      "cast-dany-north",
      "cast-dany-worthy",
      "cast-dany-freedom",
      "cast-dany-home",
      "cast-dany-people",
      "cast-dany-better",
      "cast-dany-choose",
      "cast-dany-right",
      "cast-dany-not-queen",
      "cast-dany-wind"
    ]
  },
  {
    "id": "rorschach",
    "name": "Rorschach",
    "group": "storybook",
    "aliases": [
      "Walter Kovacs"
    ],
    "quoteIds": [
      "cast-rorschach-justice",
      "cast-rorschach-compromise",
      "cast-rorschach-identity",
      "cast-rorschach-mask",
      "cast-rorschach-satire",
      "cast-rorschach-no-compromise",
      "cast-rorschach-likeness",
      "cast-rorschach-self-destruction",
      "cast-rorschach-moral-position",
      "cast-rorschach-ambiguity"
    ]
  },
  {
    "id": "dr-manhattan",
    "name": "Dr. Manhattan",
    "group": "storybook",
    "aliases": [
      "Doctor Manhattan",
      "Jon Osterman"
    ],
    "quoteIds": [
      "cast-manhattan-life",
      "cast-manhattan-humanity",
      "cast-manhattan-not-cold",
      "cast-manhattan-simultaneous",
      "cast-manhattan-time-nature",
      "cast-manhattan-imaginative-projection",
      "cast-manhattan-no-reference",
      "cast-manhattan-plain-sight",
      "cast-manhattan-unselfconscious",
      "cast-manhattan-solid-time"
    ]
  },
  {
    "id": "geralt-of-rivia",
    "name": "Geralt of Rivia",
    "group": "storybook",
    "aliases": [
      "Geralt"
    ],
    "quoteIds": [
      "witcher-geralt-choice",
      "witcher-geralt-care",
      "cast-geralt-happiness",
      "cast-geralt-hesitating",
      "cast-geralt-warmth",
      "cast-geralt-sensitivity",
      "cast-geralt-more-than-hunter",
      "cast-geralt-human-again",
      "cast-geralt-quiet-thought",
      "cast-geralt-intellect"
    ]
  },
  {
    "id": "dandelion",
    "name": "Dandelion",
    "group": "storybook",
    "aliases": [
      "Jaskier",
      "Julian Alfred Pankratz"
    ],
    "quoteIds": [
      "cast-dandelion-metaphors",
      "cast-dandelion-support",
      "cast-dandelion-bathhouse",
      "cast-dandelion-happiness",
      "cast-dandelion-trust",
      "cast-dandelion-spy",
      "cast-dandelion-good",
      "cast-dandelion-understanding",
      "cast-dandelion-mercury",
      "cast-dandelion-feelings"
    ]
  },
  {
    "id": "darth-vader",
    "name": "Darth Vader",
    "group": "storybook",
    "aliases": [
      "Anakin Skywalker"
    ],
    "quoteIds": [
      "storybook-darth-vader-easy",
      "storybook-darth-vader-impressive",
      "storybook-darth-vader-father",
      "storybook-darth-vader-rule",
      "storybook-darth-vader-made-me",
      "storybook-darth-vader-anakin",
      "storybook-darth-vader-faith",
      "storybook-darth-vader-master",
      "storybook-darth-vader-own-eyes",
      "storybook-darth-vader-surrounded"
    ]
  },
  {
    "id": "luke-skywalker",
    "name": "Luke Skywalker",
    "group": "storybook",
    "aliases": [],
    "quoteIds": [
      "sw-luke-jedi-father",
      "storybook-luke-skywalker-rescue",
      "storybook-luke-skywalker-surprises",
      "storybook-luke-skywalker-still-good",
      "storybook-luke-skywalker-overconfidence",
      "storybook-luke-skywalker-not-leave",
      "storybook-luke-skywalker-expectations",
      "storybook-luke-skywalker-mistaken",
      "storybook-luke-skywalker-good-in-you",
      "storybook-luke-skywalker-breathe"
    ]
  },
  {
    "id": "deadpool",
    "name": "Deadpool",
    "group": "comics",
    "aliases": [
      "Wade Wilson"
    ],
    "quoteIds": [
      "cast-deadpool-maximum-effort",
      "cast-deadpool-beautiful-love",
      "cast-deadpool-hold-on",
      "cast-deadpool-hold-tight",
      "cast-deadpool-everyone-matters",
      "cast-deadpool-feelings-swim",
      "cast-deadpool-save-world",
      "cast-deadpool-best-wolverine",
      "cast-deadpool-drivers-seat",
      "cast-deadpool-reynolds-unpredictable"
    ]
  },
  {
    "id": "wolverine",
    "name": "Wolverine",
    "group": "comics",
    "aliases": [
      "Logan",
      "James Howlett"
    ],
    "quoteIds": [
      "cast-wolverine-not-made",
      "cast-wolverine-feels-like",
      "cast-wolverine-fighting-friends",
      "cast-wolverine-kill-refusal",
      "cast-wolverine-own-path",
      "cast-wolverine-help-mariko",
      "cast-wolverine-an-x-man",
      "cast-wolverine-your-own-wish",
      "cast-wolverine-claremont-better",
      "cast-wolverine-jackman-trust"
    ]
  },
  {
    "id": "professor-x",
    "name": "Professor X",
    "group": "comics",
    "aliases": [
      "Charles Xavier"
    ],
    "quoteIds": [
      "cast-professor-x-still-time",
      "cast-professor-x-feel-moment",
      "cast-professor-x-hope-power",
      "cast-professor-x-not-alone",
      "cast-professor-x-gifts",
      "cast-professor-x-always-there",
      "cast-professor-x-truth-vengeance",
      "cast-professor-x-stewart-vulnerability",
      "cast-professor-x-stewart-optimists",
      "cast-professor-x-mcavoy-hope"
    ]
  },
  {
    "id": "magneto",
    "name": "Magneto",
    "group": "comics",
    "aliases": [
      "Erik Lehnsherr",
      "Max Eisenhardt"
    ],
    "quoteIds": [
      "cast-magneto-decide-ending",
      "cast-magneto-understanding-fear",
      "cast-magneto-promise-no-killing",
      "cast-magneto-god-among-insects",
      "cast-magneto-fassbender-better-future",
      "cast-magneto-cure-speech",
      "cast-magneto-what-have-i-done",
      "cast-magneto-mckellen-interdependence",
      "cast-magneto-mckellen-understanding",
      "cast-magneto-claremont-mentor"
    ]
  },
  {
    "id": "thor",
    "name": "Thor",
    "group": "comics",
    "aliases": [
      "Thor Odinson",
      "Marvel Thor"
    ],
    "quoteIds": [
      "cast-thor-finish-started",
      "cast-thor-live-stories",
      "cast-thor-good-wine",
      "cast-thor-still-worthy",
      "cast-thor-something-good",
      "cast-thor-who-i-am",
      "cast-thor-friends-banner",
      "cast-thor-good-man",
      "cast-thor-towards-problems",
      "cast-thor-together"
    ]
  },
  {
    "id": "thanos",
    "name": "Thanos",
    "group": "comics",
    "aliases": [],
    "quoteIds": [
      "cast-thanos-inevitable",
      "cast-thanos-his-own-adversary",
      "cast-thanos-power-is-not-enough",
      "cast-thanos-power-without-contentment",
      "cast-thanos-vulnerability-not-softness",
      "cast-thanos-depths-of-wisdom",
      "cast-thanos-the-snap-and-contempt",
      "cast-thanos-perceived-mistake",
      "cast-thanos-a-characters-perspective",
      "cast-thanos-take-him-as-he-is"
    ]
  },
  {
    "id": "iron-man",
    "name": "Iron Man",
    "group": "comics",
    "aliases": [
      "Tony Stark"
    ],
    "quoteIds": [
      "cast-iron-man-know-what",
      "cast-iron-man-better-heart",
      "cast-iron-man-lost-way",
      "cast-iron-man-genius",
      "cast-iron-man-have-hulk",
      "cast-iron-man-following",
      "cast-iron-man-resentment",
      "cast-iron-man-second-time",
      "cast-iron-man-identity",
      "cast-iron-man-love-3000"
    ]
  },
  {
    "id": "superman",
    "name": "Superman",
    "group": "comics",
    "aliases": [
      "Clark Kent",
      "Kal-El"
    ],
    "quoteIds": [
      "cast-superman-human",
      "cast-superman-mistakes",
      "cast-superman-punk-rock",
      "cast-superman-never-lie",
      "cast-superman-never-drink",
      "cast-superman-truth-justice",
      "cast-superman-seems",
      "cast-superman-stronger",
      "cast-superman-everyone-wins",
      "cast-superman-no-king"
    ]
  },
  {
    "id": "batman",
    "name": "Batman",
    "group": "comics",
    "aliases": [
      "Bruce Wayne"
    ],
    "quoteIds": [
      "cast-batman-believe-good",
      "cast-batman-gotham-needs",
      "cast-batman-defines-me",
      "cast-batman-justice-beyond-pain",
      "cast-batman-hero-anyone",
      "cast-batman-not-yet",
      "cast-batman-vengeance-past",
      "cast-batman-people-hope",
      "cast-batman-being-happy",
      "cast-batman-changing-plan"
    ]
  },
  {
    "id": "john-constantine",
    "name": "John Constantine",
    "group": "comics",
    "aliases": [],
    "quoteIds": [
      "cast-john-constantine-open-mind",
      "cast-john-constantine-make-difference",
      "cast-john-constantine-mysterious",
      "cast-john-constantine-face-danger",
      "cast-john-constantine-help-each-other",
      "cast-john-constantine-nasty-piece",
      "cast-john-constantine-vision-clues",
      "cast-john-constantine-trust-light",
      "cast-john-constantine-leap-faith",
      "cast-john-constantine-open-senses"
    ]
  },
  {
    "id": "dream-of-the-endless",
    "name": "Dream of the Endless",
    "group": "comics",
    "aliases": [
      "Dream",
      "Morpheus",
      "Sandman"
    ],
    "quoteIds": [
      "cast-dream-remake",
      "cast-dream-new-age",
      "cast-dream-lightbringer",
      "cast-dream-king",
      "cast-dream-make-right",
      "cast-dream-not-dare",
      "cast-dream-hope",
      "cast-dream-kills-hope",
      "cast-dream-dreams-as-hope",
      "cast-dream-compassion"
    ]
  },
  {
    "id": "lucifer-morningstar",
    "name": "Lucifer Morningstar",
    "group": "comics",
    "aliases": [
      "Lucifer"
    ],
    "quoteIds": [
      "cast-lucifer-morningstar-word-bond",
      "cast-lucifer-morningstar-tried-matters",
      "cast-lucifer-morningstar-desire",
      "cast-lucifer-morningstar-interesting-live",
      "cast-lucifer-old-patterns",
      "cast-lucifer-paradox-of-evil",
      "cast-lucifer-experience-for-good",
      "cast-lucifer-find-a-calling",
      "cast-lucifer-charm-can-deceive",
      "cast-lucifer-absence-of-empathy"
    ]
  },
  {
    "id": "lizzy",
    "name": "Lizzy",
    "group": "host",
    "note": "Original host. Quotations await the author's original text.",
    "aliases": [],
    "quoteIds": []
  }
];
