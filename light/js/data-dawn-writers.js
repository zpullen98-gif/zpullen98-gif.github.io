/* The Lantern Stage. Writer credits and labelled reading editions.
   Quote IDs share the anthology; expanded studies preserve the earlier shelves. */
var DAWN_WRITERS = [
  {
    "id": "william-shakespeare",
    "name": "William Shakespeare",
    "aliases": [
      "Shakespeare"
    ],
    "intro": "Step into courts, gardens, storm-tossed kingdoms, and enchanted woods. These lines belong to characters whose motives make the words richer than a detached maxim.",
    "works": [
      {
        "title": "Hamlet",
        "url": "https://www.folger.edu/explore/shakespeares-works/hamlet/read/",
        "access": "Free full text",
        "edition": "Folger Shakespeare Library",
        "note": "Free edited text with act and scene navigation."
      },
      {
        "title": "Macbeth",
        "url": "https://www.folger.edu/explore/shakespeares-works/macbeth/read/",
        "access": "Free full text",
        "edition": "Folger Shakespeare Library",
        "note": "Free edited text; ambition, prophecy, and the cost of violence."
      },
      {
        "title": "Romeo and Juliet",
        "url": "https://www.folger.edu/explore/shakespeares-works/romeo-and-juliet/read/",
        "access": "Free full text",
        "edition": "Folger Shakespeare Library",
        "note": "Free edited text of the tragedy."
      }
    ],
    "quoteIds": [
      "study-shakespeare-hamlet-listening",
      "study-shakespeare-macbeth-hidden-fires",
      "study-shakespeare-king-lear-fools-counsel",
      "study-shakespeare-othello-reputation",
      "study-shakespeare-romeo-and-juliet-violent-delights",
      "study-shakespeare-julius-caesar-fear-and-death",
      "study-shakespeare-antony-and-cleopatra-infinite-variety",
      "study-shakespeare-coriolanus-city-and-people",
      "study-shakespeare-titus-andronicus-razor-words",
      "study-shakespeare-timon-of-athens-cold-kindness",
      "study-shakespeare-troilus-and-cressida-value-and-will",
      "study-shakespeare-henry-iv-part-1-honour-and-air",
      "study-shakespeare-henry-iv-part-2-uneasy-crown",
      "study-shakespeare-henry-v-muse-of-fire",
      "study-shakespeare-richard-ii-anointed-king",
      "study-shakespeare-richard-iii-wise-and-young",
      "study-shakespeare-alls-well-that-ends-well-remedies",
      "study-shakespeare-as-you-like-it-adversity",
      "study-shakespeare-comedy-of-errors-drop-of-water",
      "study-shakespeare-cymbeline-fear-no-more",
      "study-shakespeare-loves-labours-lost-borrowed-learning",
      "study-shakespeare-measure-for-measure-doubts",
      "study-shakespeare-merchant-of-venice-glisters",
      "study-shakespeare-merry-wives-of-windsor-worlds-oyster",
      "study-shakespeare-midsummer-nights-dream-fond-pageant",
      "study-shakespeare-much-ado-about-nothing-sigh-no-more",
      "study-shakespeare-pericles-sea-and-grief",
      "study-shakespeare-taming-of-the-shrew-speaking-anger",
      "study-shakespeare-tempest-dreams",
      "study-shakespeare-twelfth-night-greatness-letter",
      "study-shakespeare-two-gentlemen-of-verona-home-keeping",
      "study-shakespeare-winters-tale-winter-story",
      "study-shakespeare-sonnets-18-living-lines",
      "study-shakespeare-hamlet-thinking",
      "study-shakespeare-macbeth-flower-serpent",
      "study-shakespeare-king-lear-feel-the-storm",
      "study-shakespeare-othello-seeming",
      "study-shakespeare-romeo-and-juliet-boundless-bounty",
      "study-shakespeare-julius-caesar-fault-and-stars",
      "study-shakespeare-antony-and-cleopatra-fire-and-air",
      "study-shakespeare-coriolanus-knowing-friends",
      "study-shakespeare-titus-andronicus-concealed-sorrow",
      "study-shakespeare-timon-of-athens-borrowed-moonlight",
      "study-shakespeare-troilus-and-cressida-wallet-of-time",
      "study-shakespeare-henry-iv-part-1-discretion",
      "study-shakespeare-henry-iv-part-2-ordinary-courage",
      "study-shakespeare-henry-v-breach",
      "study-shakespeare-richard-ii-hollow-crown",
      "study-shakespeare-richard-iii-conscience-tongues",
      "study-shakespeare-alls-well-that-ends-well-trust",
      "study-shakespeare-as-you-like-it-self-knowledge",
      "study-shakespeare-comedy-of-errors-strange-welcome",
      "study-shakespeare-cymbeline-broken-vows",
      "study-shakespeare-loves-labours-lost-living-academy",
      "study-shakespeare-measure-for-measure-giants-strength",
      "study-shakespeare-merchant-of-venice-shared-humanity",
      "study-shakespeare-merry-wives-of-windsor-salt-of-youth",
      "study-shakespeare-midsummer-nights-dream-imagination",
      "study-shakespeare-much-ado-about-nothing-dog-and-crow",
      "study-shakespeare-pericles-show-honour",
      "study-shakespeare-taming-of-the-shrew-mind-and-clothes",
      "study-shakespeare-tempest-rarer-action",
      "study-shakespeare-twelfth-night-witty-fool",
      "study-shakespeare-two-gentlemen-of-verona-beauty-and-kindness",
      "study-shakespeare-winters-tale-freely-given",
      "study-shakespeare-sonnets-29-dawn",
      "study-shakespeare-hamlet-shaping-ends",
      "study-shakespeare-macbeth-quickly-done",
      "study-shakespeare-king-lear-speak-what-we-feel",
      "study-shakespeare-othello-heart-and-sleeve",
      "study-shakespeare-romeo-and-juliet-wisely-and-slow",
      "study-shakespeare-julius-caesar-lend-your-ears",
      "study-shakespeare-antony-and-cleopatra-unmeasured-love",
      "study-shakespeare-coriolanus-action-and-eyes",
      "study-shakespeare-titus-andronicus-inverted-repentance",
      "study-shakespeare-timon-of-athens-friends-and-ends",
      "study-shakespeare-troilus-and-cressida-untuned-string",
      "study-shakespeare-henry-iv-part-1-rehearsed-reform",
      "study-shakespeare-henry-iv-part-2-former-self",
      "study-shakespeare-henry-v-ceremony",
      "study-shakespeare-richard-ii-prison-world",
      "study-shakespeare-richard-iii-horse-and-kingdom",
      "study-shakespeare-alls-well-that-ends-well-honesty",
      "study-shakespeare-as-you-like-it-love-and-worms",
      "study-shakespeare-cymbeline-solitude",
      "study-shakespeare-loves-labours-lost-jests-and-listeners",
      "study-shakespeare-measure-for-measure-faults-and-mercy",
      "study-shakespeare-merchant-of-venice-little-candle",
      "study-shakespeare-midsummer-nights-dream-shadows",
      "study-shakespeare-much-ado-about-nothing-cupids-traps",
      "study-shakespeare-tempest-island-sounds",
      "study-shakespeare-twelfth-night-daughters-and-brothers",
      "study-shakespeare-winters-tale-art-and-nature",
      "study-shakespeare-sonnets-60-waves",
      "study-shakespeare-hamlet-true-self",
      "study-shakespeare-macbeth-walking-shadow",
      "study-shakespeare-midsummer-nights-dream-rare-vision",
      "study-shakespeare-tempest-new-world",
      "study-shakespeare-sonnets-116-brief-hours",
      "study-shakespeare-sonnets-130-false-compare",
      "stage-william-shakespeare-cannot-be-undone",
      "stage-william-shakespeare-nothing",
      "stage-william-shakespeare-gardens",
      "stage-william-shakespeare-food-of-love",
      "stage-william-shakespeare-dancing-star",
      "stage-william-shakespeare-true-love",
      "stage-william-shakespeare-band-of-brothers",
      "stage-william-shakespeare-time-waste",
      "stage-william-shakespeare-only-hope",
      "stage-william-shakespeare-awake-faith"
    ],
    "studyId": "shakespeare",
    "previousQuoteIds": [
      "stage-william-shakespeare-cannot-be-undone",
      "stage-william-shakespeare-nothing",
      "stage-william-shakespeare-gardens",
      "stage-william-shakespeare-food-of-love",
      "stage-william-shakespeare-dancing-star",
      "stage-william-shakespeare-true-love",
      "stage-william-shakespeare-band-of-brothers",
      "stage-william-shakespeare-time-waste",
      "stage-william-shakespeare-only-hope",
      "stage-william-shakespeare-awake-faith"
    ]
  },
  {
    "id": "sophocles",
    "name": "Sophocles",
    "aliases": [],
    "intro": "Ancient journeys through exile, duty, recognition, and the difficult practice of hospitality. Different named translators give each play its particular English voice.",
    "works": [
      {
        "title": "Oedipus the King",
        "url": "https://classics.mit.edu/Sophocles/oedipus.html",
        "access": "Free full text",
        "edition": "F. Storr translation",
        "note": "Free older English translation at MIT’s Internet Classics Archive."
      },
      {
        "title": "Antigone",
        "url": "https://classics.mit.edu/Sophocles/antigone.html",
        "access": "Free full text",
        "edition": "R. C. Jebb translation",
        "note": "Free older English translation at MIT’s Internet Classics Archive."
      },
      {
        "title": "Electra",
        "url": "https://classics.mit.edu/Sophocles/electra.html",
        "access": "Free full text",
        "edition": "R. C. Jebb translation",
        "note": "Free older English translation at MIT’s Internet Classics Archive."
      }
    ],
    "quoteIds": [
      "stage-sophocles-seek",
      "stage-sophocles-time-and-justice",
      "stage-sophocles-unexpected",
      "stage-sophocles-gifts",
      "stage-sophocles-hospitality",
      "stage-sophocles-changing-fortunes",
      "stage-sophocles-conscience",
      "stage-sophocles-virtue-before-victory",
      "stage-sophocles-hope-before-event",
      "stage-sophocles-whole-truth"
    ]
  },
  {
    "id": "euripides",
    "name": "Euripides",
    "aliases": [
      "Eripides"
    ],
    "intro": "Enter a theatre of fierce feeling, contested promises, generous strangers, and gods whose presence unsettles easy answers. Each selection keeps its dramatic speaker and translator.",
    "works": [
      {
        "title": "Medea",
        "url": "https://classics.mit.edu/Euripides/medea.html",
        "access": "Free full text",
        "edition": "E. P. Coleridge translation",
        "note": "Free older English translation at MIT’s Internet Classics Archive."
      },
      {
        "title": "The Bacchae (The Bacchantes)",
        "url": "https://classics.mit.edu/Euripides/bacchan.html",
        "access": "Free full text",
        "edition": "E. P. Coleridge translation",
        "note": "Free older English translation at MIT’s Internet Classics Archive."
      },
      {
        "title": "The Trojan Women",
        "url": "https://classics.mit.edu/Euripides/troj_women.html",
        "access": "Free full text",
        "edition": "E. P. Coleridge translation",
        "note": "Free older English translation at MIT’s Internet Classics Archive."
      }
    ],
    "quoteIds": [
      "stage-euripides-passion",
      "stage-euripides-wisdom",
      "stage-euripides-oath",
      "stage-euripides-clearness",
      "stage-euripides-mortal-thoughts",
      "stage-euripides-discernment",
      "stage-euripides-gratitude",
      "stage-euripides-victory-and-justice",
      "stage-euripides-humble-host",
      "stage-euripides-ruined-cities"
    ]
  },
  {
    "id": "moliere",
    "name": "Molière",
    "aliases": [
      "Moliere",
      "Jean-Baptiste Poquelin"
    ],
    "intro": "Enter the salon, the dinner table, and the theatrical household: Molière makes vanity and borrowed wisdom reveal themselves through comedy.",
    "works": [
      {
        "title": "Tartuffe",
        "url": "https://www.gutenberg.org/cache/epub/28488/pg28488-images.html",
        "access": "Free full text",
        "edition": "Jeffrey D. Hoeper, translation granted to the public domain by the translator.",
        "note": "Complete free translation. The opening rights statement explicitly grants it to the public domain."
      },
      {
        "title": "The Miser",
        "url": "https://www.gutenberg.org/cache/epub/6923/pg6923-images.html",
        "access": "Free full text",
        "edition": "Charles Heron Wall, English prose translation.",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      },
      {
        "title": "The Imaginary Invalid",
        "url": "https://www.gutenberg.org/cache/epub/9070/pg9070-images.html",
        "access": "Free full text",
        "edition": "Charles Heron Wall, English prose translation.",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      }
    ],
    "quoteIds": [
      "stage-moliere-prose",
      "stage-moliere-eat-live",
      "stage-moliere-dowry",
      "stage-moliere-casket",
      "stage-moliere-galley",
      "stage-moliere-listening",
      "stage-moliere-knowledge",
      "stage-moliere-pedant",
      "stage-moliere-civil",
      "stage-moliere-ill"
    ]
  },
  {
    "id": "henrik-ibsen",
    "name": "Henrik Ibsen",
    "aliases": [
      "Ibsen"
    ],
    "intro": "Behind the lamplit window, Ibsen’s characters test freedom, inherited beliefs, ambition, and the cost of telling the truth.",
    "works": [
      {
        "title": "A Doll’s House",
        "url": "https://www.gutenberg.org/cache/epub/2542/pg2542-images.html",
        "access": "Free full text",
        "edition": "R. Farquharson Sharp, English translation.",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      },
      {
        "title": "Hedda Gabler",
        "url": "https://www.gutenberg.org/cache/epub/4093/pg4093-images.html",
        "access": "Free full text",
        "edition": "Edmund Gosse and William Archer, English translation.",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      },
      {
        "title": "An Enemy of the People",
        "url": "https://www.gutenberg.org/cache/epub/2446/pg2446-images.html",
        "access": "Free full text",
        "edition": "R. Farquharson Sharp, English translation.",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      }
    ],
    "quoteIds": [
      "stage-ibsen-destiny",
      "stage-ibsen-convention",
      "stage-ibsen-ghosts",
      "stage-ibsen-light",
      "stage-ibsen-air-castles",
      "stage-ibsen-impossible",
      "stage-ibsen-freedom",
      "stage-ibsen-choose",
      "stage-ibsen-life-lie",
      "stage-ibsen-thirteenth"
    ]
  },
  {
    "id": "anton-chekhov",
    "name": "Anton Chekhov",
    "aliases": [
      "Anton Chekhoy",
      "Anton Tchekhov",
      "Anton Tchekoff",
      "Chekhov"
    ],
    "intro": "A country house, an unfinished conversation, a stage after the audience has gone: Chekhov invites close attention to longing, work, and the lives beside us.",
    "works": [
      {
        "title": "The Seagull",
        "url": "https://www.gutenberg.org/cache/epub/1754/pg1754-images.html",
        "access": "Free full text",
        "edition": "Marian Fell, Plays, first series (1912).",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      },
      {
        "title": "Uncle Vanya",
        "url": "https://www.gutenberg.org/cache/epub/1756/pg1756-images.html",
        "access": "Free full text",
        "edition": "Marian Fell, Plays, first series (1912).",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      },
      {
        "title": "The Cherry Orchard",
        "url": "https://www.gutenberg.org/cache/epub/7986/pg7986-images.html",
        "access": "Free full text",
        "edition": "Julius West, Plays, second series.",
        "note": "Complete play within a free collection. Choose The Cherry Orchard from the contents."
      }
    ],
    "quoteIds": [
      "stage-chekhov-peace",
      "stage-chekhov-rest",
      "stage-chekhov-faith",
      "stage-chekhov-calling",
      "stage-chekhov-burden",
      "stage-chekhov-spade",
      "stage-chekhov-genius",
      "stage-chekhov-doubt",
      "stage-chekhov-bondage",
      "stage-chekhov-beginning"
    ]
  },
  {
    "id": "victor-hugo",
    "name": "Victor Hugo",
    "aliases": [
      "Hugo"
    ],
    "intro": "Follow Hugo from a bishop’s garden to a cathedral, a stormbound coast, and the revolutionary prison: beauty, conscience, and mercy share the journey.",
    "works": [
      {
        "title": "Les Misérables",
        "url": "https://www.gutenberg.org/cache/epub/135/pg135-images.html",
        "access": "Free full text",
        "edition": "Isabel F. Hapgood, English translation.",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      },
      {
        "title": "Notre-Dame de Paris",
        "url": "https://www.gutenberg.org/cache/epub/2610/pg2610-images.html",
        "access": "Free full text",
        "edition": "Isabel F. Hapgood, English translation.",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      },
      {
        "title": "Toilers of the Sea",
        "url": "https://www.gutenberg.org/cache/epub/32338/pg32338-images.html",
        "access": "Free full text",
        "edition": "W. Moy Thomas; Everyman’s Library edition edited by Ernest Rhys.",
        "note": "Complete English text, freely readable at Project Gutenberg without an account."
      }
    ],
    "quoteIds": [
      "stage-hugo-beautiful",
      "stage-hugo-transparent",
      "stage-hugo-prayers",
      "stage-hugo-book-edifice",
      "stage-hugo-architect",
      "stage-hugo-melancholy",
      "stage-hugo-perseverance",
      "stage-hugo-ideal",
      "stage-hugo-justice",
      "stage-hugo-possible"
    ]
  },
  {
    "id": "samuel-beckett",
    "name": "Samuel Beckett",
    "aliases": [],
    "intro": "Spare landscapes, uneasy companionship, and dry humour make Beckett a guide to uncertainty. Read the small lines with their dramatic context: hope and doubt often occupy the same breath.",
    "works": [
      {
        "title": "Waiting for Godot",
        "url": "https://groveatlantic.com/book/waiting-for-godot/",
        "access": "Authorised excerpt",
        "edition": "Grove Press, English translation by Samuel Beckett; 2011 edition",
        "note": "Free publisher excerpt from Act I. The complete book is sold separately."
      },
      {
        "title": "Endgame",
        "url": "https://groveatlantic.com/book/endgame-act-without-words/",
        "access": "Authorised excerpt",
        "edition": "Grove Press, English translation by Samuel Beckett; 2009 edition",
        "note": "Free publisher excerpt. The page also describes Act Without Words; it does not promise a free complete volume."
      },
      {
        "title": "Krapp’s Last Tape",
        "url": "https://groveatlantic.com/book/the-collected-shorter-plays/",
        "access": "Authorised excerpt",
        "edition": "The Collected Shorter Plays, Grove Press",
        "note": "The publisher’s excerpt presents Krapp’s Last Tape within the collected volume; other plays in the collection are not included."
      }
    ],
    "quoteIds": [
      "stage-samuel-beckett-nothing-done",
      "stage-samuel-beckett-waiting",
      "stage-samuel-beckett-together",
      "stage-samuel-beckett-sun",
      "stage-samuel-beckett-wandering",
      "stage-samuel-beckett-first-walk",
      "stage-samuel-beckett-voyage",
      "stage-samuel-beckett-again",
      "stage-samuel-beckett-best-years",
      "stage-samuel-beckett-nature"
    ]
  },
  {
    "id": "tennessee-williams",
    "name": "Tennessee Williams",
    "aliases": [],
    "intro": "New Orleans, memory, fragile shelter, and the hunger for kindness run through these pages. Character voices remain distinct from Williams’s own notebooks and recollections.",
    "works": [
      {
        "title": "A Streetcar Named Desire",
        "url": "https://www.loa.org/writers/281-tennessee-williams/",
        "access": "Authorised excerpt",
        "edition": "Library of America, Plays 1937–1955",
        "note": "Free passage from Blanche’s conversation with Stella; this is an excerpt, not the complete play."
      },
      {
        "title": "The Night of the Iguana",
        "url": "https://american-rep-assets.s3.amazonaws.com/wp-content/uploads/2019/10/27142927/Iguana-Toolkit-FINAL_0.pdf",
        "access": "Authorised excerpt",
        "edition": "American Repertory Theater, 2017 education toolkit",
        "note": "Free scene excerpt on pages 11–13 with background material; not the complete play."
      },
      {
        "title": "New Orleans Notebooks",
        "url": "https://www.theparisreview.org/letters-essays/5611/new-orleans-notebooks-tennessee-williams",
        "access": "Authorised excerpt",
        "edition": "Edited by Margaret Bradham Thornton; The Paris Review 176, Spring 2006",
        "note": "The opening notebook selections are free. Continuing beyond the public excerpt requires a subscription."
      },
      {
        "title": "The Glass Menagerie",
        "url": "https://search.worldcat.org/title/The-glass-menagerie/oclc/38934",
        "access": "Library borrowing",
        "edition": "Heinemann Educational, 1968; WorldCat library catalogue",
        "note": "Find a library copy. A library card and local availability may be required; this link opens a catalogue record."
      }
    ],
    "quoteIds": [
      "stage-tennessee-williams-magic",
      "stage-tennessee-williams-soft",
      "stage-tennessee-williams-self-sufficient",
      "stage-tennessee-williams-cut-loose",
      "stage-tennessee-williams-compassion",
      "stage-tennessee-williams-course-events",
      "stage-tennessee-williams-verse",
      "stage-tennessee-williams-phoenix",
      "stage-tennessee-williams-imaginative-life",
      "stage-tennessee-williams-began-writing"
    ]
  },
  {
    "id": "arthur-miller",
    "name": "Arthur Miller",
    "aliases": [],
    "intro": "Miller asks what a person owes to family, community, and conscience. His stage voices face the cost of dreams and the difficult work of responsibility.",
    "works": [
      {
        "title": "Death of a Salesman",
        "url": "https://www.penguin.co.uk/discover/articles/death-of-a-salesman-by-arthur-miller",
        "access": "Authorised excerpt",
        "edition": "Penguin Classics; publisher extract",
        "note": "Free publisher extract, with a separate link to purchase the complete book."
      },
      {
        "title": "The Crucible",
        "url": "https://images.penguinrandomhouse.com/promo_image/9780142437339_5079.pdf",
        "access": "Authorised excerpt",
        "edition": "Penguin Classics teacher’s guide for ISBN 9780142437339",
        "note": "Free teaching guide containing short excerpts and play-page references. It is not a free copy of the play."
      },
      {
        "title": "All My Sons",
        "url": "https://images.penguinrandomhouse.com/promo_image/9780141185460_5473.pdf",
        "access": "Authorised excerpt",
        "edition": "Penguin Classics teacher’s guide for ISBN 9780141185460",
        "note": "Free teaching guide with selected dialogue and page references, not the complete script."
      }
    ],
    "quoteIds": [
      "stage-arthur-miller-salesman-dream",
      "stage-arthur-miller-territory",
      "stage-arthur-miller-name",
      "stage-arthur-miller-penitence",
      "stage-arthur-miller-goodness",
      "stage-arthur-miller-father",
      "stage-arthur-miller-sons",
      "stage-arthur-miller-last-comma",
      "stage-arthur-miller-playwright",
      "stage-arthur-miller-tragedy"
    ]
  },
  {
    "id": "august-wilson",
    "name": "August Wilson",
    "aliases": [],
    "intro": "Music, inherited memory, work, and home shape Wilson’s dramatic world. These voices invite close attention to African American experience and to the responsibilities carried across generations.",
    "works": [
      {
        "title": "Fences",
        "url": "https://shop.concordtheatricals.com/api/v1/product/document/112904",
        "access": "Authorised excerpt",
        "edition": "Samuel French acting edition; Concord Theatricals preview",
        "note": "Free 42-page authorised preview, including front matter. The full acting edition is sold separately."
      },
      {
        "title": "Ma Rainey’s Black Bottom",
        "url": "https://shop.concordtheatricals.co.uk/api/v1/product/document/113806",
        "access": "Authorised excerpt",
        "edition": "Samuel French acting edition; Concord Theatricals preview",
        "note": "Free authorised script preview, not the entire play."
      },
      {
        "title": "The Piano Lesson",
        "url": "https://shop.concordtheatricals.com/api/v1/product/document/114971",
        "access": "Authorised excerpt",
        "edition": "Samuel French acting edition; Concord Theatricals preview",
        "note": "Free 52-page authorised preview, including front matter. The full acting edition is sold separately."
      }
    ],
    "quoteIds": [
      "stage-august-wilson-fastball",
      "stage-august-wilson-chance",
      "stage-august-wilson-style",
      "stage-august-wilson-music",
      "stage-august-wilson-find-out",
      "stage-august-wilson-home",
      "stage-august-wilson-self-discovery",
      "stage-august-wilson-developing",
      "stage-august-wilson-together",
      "stage-august-wilson-art"
    ]
  },
  {
    "id": "geoffrey-chaucer",
    "name": "Geoffrey Chaucer",
    "aliases": [
      "Chaucer"
    ],
    "intro": "A pilgrimage through generous learning, difficult promises, and the strange houses of dreams. These selections preserve Middle English, with short reading notes to open the door.",
    "works": [
      {
        "title": "The Canterbury Tales",
        "url": "https://www.gutenberg.org/files/22120/22120-h/22120-h.htm",
        "access": "Free full text",
        "edition": "Walter W. Skeat, Middle English edition",
        "note": "Free public-domain text with manuscript notes; original spelling takes practice."
      },
      {
        "title": "Troilus and Criseyde",
        "url": "https://www.gutenberg.org/cache/epub/257/pg257-images.html",
        "access": "Free full text",
        "edition": "Middle English text, Project Gutenberg",
        "note": "Free complete poem in Middle English."
      },
      {
        "title": "The Book of the Duchess",
        "url": "https://sites.krieger.jhu.edu/chaucer/texts-with-translations/the-book-of-the-duchess-2/",
        "access": "Free full text",
        "edition": "Johns Hopkins University, Chaucer Hub",
        "note": "Free Middle English poem displayed alongside a modern rendering and glosses."
      }
    ],
    "quoteIds": [
      "study-chaucer-canterbury-general-prologue-april",
      "study-chaucer-canterbury-knights-tale-dangerous-wishes",
      "study-chaucer-canterbury-millers-prologue-turn-the-leaf",
      "study-chaucer-canterbury-millers-tale-misused-counsel",
      "study-chaucer-canterbury-wife-prologue-experience",
      "study-chaucer-canterbury-wife-tale-sovereignty",
      "study-chaucer-canterbury-pardoner-prologue-motive",
      "study-chaucer-canterbury-pardoners-tale-respect-age",
      "study-chaucer-canterbury-nuns-priests-tale-widows-care",
      "study-chaucer-canterbury-franklins-tale-love-and-rule",
      "study-chaucer-canterbury-clerks-tale-lineage",
      "study-chaucer-canterbury-manciples-tale-tongue-and-friend",
      "study-chaucer-troilus-and-criseyde-sorrowful-verse",
      "study-chaucer-book-of-the-duchess-night-reading",
      "study-chaucer-house-of-fame-dream-question",
      "study-chaucer-parliament-of-fowls-old-books-new-knowledge",
      "study-chaucer-truth-enough",
      "study-chaucer-gentilesse-virtue-over-title",
      "study-chaucer-former-age-shared-faith",
      "study-chaucer-fortune-reason-remains",
      "study-chaucer-lack-of-steadfastness-word-as-bond",
      "study-chaucer-adam-scrivener-careful-copying",
      "study-chaucer-treatise-on-astrolabe-learner-attention",
      "study-chaucer-canterbury-general-prologue-pilgrimage",
      "study-chaucer-canterbury-knights-tale-pity",
      "study-chaucer-canterbury-wife-prologue-perfection",
      "study-chaucer-canterbury-wife-tale-earned-nobility",
      "study-chaucer-canterbury-pardoner-prologue-preached-vice",
      "study-chaucer-canterbury-pardoners-tale-changed-quest",
      "study-chaucer-canterbury-nuns-priests-tale-dream-dispute",
      "study-chaucer-canterbury-franklins-tale-patience",
      "study-chaucer-canterbury-clerks-tale-cruel-tests",
      "study-chaucer-canterbury-manciples-tale-walled-tongue",
      "study-chaucer-troilus-and-criseyde-blind-intentions",
      "study-chaucer-book-of-the-duchess-dawn-service",
      "study-chaucer-house-of-fame-bookish-hermit",
      "study-chaucer-parliament-of-fowls-valentines-assembly",
      "study-chaucer-truth-pilgrims-road",
      "study-chaucer-gentilesse-unbequeathed-goodness",
      "study-chaucer-treatise-on-astrolabe-different-paths",
      "study-chaucer-canterbury-general-prologue-welcome",
      "study-chaucer-canterbury-knights-tale-emelyes-wish",
      "study-chaucer-canterbury-wife-prologue-age-and-mirth",
      "study-chaucer-canterbury-wife-tale-virtue-begins",
      "study-chaucer-canterbury-pardoner-prologue-vicious-storyteller",
      "study-chaucer-canterbury-nuns-priests-tale-open-eyes",
      "study-chaucer-canterbury-franklins-tale-human-error",
      "study-chaucer-canterbury-clerks-tale-limits-of-example",
      "study-chaucer-canterbury-manciples-tale-enough-speech",
      "study-chaucer-troilus-and-criseyde-what-is-love",
      "study-chaucer-book-of-the-duchess-gentle-approach",
      "study-chaucer-house-of-fame-natural-place",
      "study-chaucer-parliament-of-fowls-gooses-advice",
      "study-chaucer-treatise-on-astrolabe-useful-repetition",
      "study-chaucer-canterbury-general-prologue-courtesy",
      "study-chaucer-canterbury-knights-tale-passing-through",
      "study-chaucer-canterbury-wife-prologue-painted-lion",
      "study-chaucer-canterbury-wife-tale-free-choice",
      "study-chaucer-canterbury-nuns-priests-tale-foxs-lesson",
      "study-chaucer-canterbury-franklins-tale-release",
      "study-chaucer-canterbury-clerks-tale-unnail-the-tongue",
      "study-chaucer-canterbury-manciples-tale-words-release",
      "study-chaucer-troilus-and-criseyde-changed-conduct",
      "study-chaucer-book-of-the-duchess-fortune-chess",
      "study-chaucer-house-of-fame-undeserved-shame",
      "study-chaucer-parliament-of-fowls-time-to-choose",
      "study-chaucer-treatise-on-astrolabe-instrument-limits",
      "study-chaucer-canterbury-general-prologue-table-service",
      "study-chaucer-canterbury-knights-tale-necessity",
      "study-chaucer-canterbury-nuns-priests-tale-fruit-and-chaff",
      "study-chaucer-canterbury-franklins-tale-generosity-question",
      "study-chaucer-troilus-and-criseyde-changing-language",
      "study-chaucer-book-of-the-duchess-plain-recognition",
      "study-chaucer-house-of-fame-private-knowledge",
      "study-chaucer-parliament-of-fowls-welcome-summer",
      "study-chaucer-canterbury-general-prologue-careful-speech",
      "study-chaucer-troilus-and-criseyde-purpose-of-tales",
      "study-chaucer-book-of-the-duchess-dream-into-poem",
      "study-chaucer-house-of-fame-mixed-rumour",
      "study-chaucer-parliament-of-fowls-reading-on",
      "study-chaucer-canterbury-general-prologue-seasonal-table",
      "study-chaucer-troilus-and-criseyde-own-woman",
      "study-chaucer-canterbury-general-prologue-cooks-craft",
      "study-chaucer-troilus-and-criseyde-cloud-over-love",
      "study-chaucer-canterbury-general-prologue-teach-by-doing",
      "study-chaucer-troilus-and-criseyde-blessed-light",
      "study-chaucer-canterbury-general-prologue-busy-appearance",
      "study-chaucer-troilus-and-criseyde-fear-and-assurance",
      "study-chaucer-canterbury-general-prologue-hosts-supper",
      "study-chaucer-troilus-and-criseyde-dawn-parting",
      "study-chaucer-canterbury-general-prologue-meaning-and-delight",
      "study-chaucer-troilus-and-criseyde-binding-love",
      "study-chaucer-troilus-and-criseyde-fortune-turns",
      "study-chaucer-troilus-and-criseyde-questioning-record",
      "study-chaucer-troilus-and-criseyde-pledged-faith",
      "study-chaucer-troilus-and-criseyde-bear-and-leader",
      "study-chaucer-troilus-and-criseyde-mercy-for-criseyde",
      "study-chaucer-troilus-and-criseyde-faithful-copying",
      "study-chaucer-troilus-and-criseyde-worldly-ending",
      "study-chaucer-troilus-and-criseyde-inviting-correction",
      "stage-geoffrey-chaucer-learn-and-teach",
      "stage-geoffrey-chaucer-keep-trouthe",
      "stage-geoffrey-chaucer-little-book",
      "stage-geoffrey-chaucer-attempt",
      "stage-geoffrey-chaucer-craft-to-learn",
      "stage-geoffrey-chaucer-truth-delivers",
      "stage-geoffrey-chaucer-virtue-and-dignity",
      "stage-geoffrey-chaucer-sleepless-narrator",
      "stage-geoffrey-chaucer-authority",
      "stage-geoffrey-chaucer-empty-purse"
    ],
    "studyId": "chaucer",
    "previousQuoteIds": [
      "stage-geoffrey-chaucer-learn-and-teach",
      "stage-geoffrey-chaucer-keep-trouthe",
      "stage-geoffrey-chaucer-little-book",
      "stage-geoffrey-chaucer-attempt",
      "stage-geoffrey-chaucer-craft-to-learn",
      "stage-geoffrey-chaucer-truth-delivers",
      "stage-geoffrey-chaucer-virtue-and-dignity",
      "stage-geoffrey-chaucer-sleepless-narrator",
      "stage-geoffrey-chaucer-authority",
      "stage-geoffrey-chaucer-empty-purse"
    ]
  }
];
