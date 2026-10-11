/* The Poets’ Study. Source records live in data-anthology.js.
   Reading paths and prompts are original editorial guidance. */
var DAWN_POETS = [
  {
    "id": "shakespeare",
    "writerId": "william-shakespeare",
    "name": "William Shakespeare",
    "shortName": "Shakespeare",
    "subtitle": "The stage, the sea & the human heart",
    "intro": "Enter a world of restless courts, enchanted islands, difficult welcomes and changing hearts. Follow what language does between people: a promise, a disguise, a judgement, a gift.",
    "readingNote": "Read each voice as an action. A line may comfort, flatter, persuade or deceive. The quotations follow Project Gutenberg’s English reading text; act and scene references belong to that edition. A character’s words are not automatically the playwright’s beliefs.",
    "pathIntro": "Begin with conversation and belonging, move towards uncertainty and power, then listen to how a poem holds time. Read one complete scene or sonnet around each selection before moving on.",
    "path": [
      {
        "workId": "as-you-like-it",
        "title": "Begin with identity and conversation",
        "note": "Listen to how wit changes the distance between people. Ask what a disguise permits a speaker to say and what it prevents another person from knowing."
      },
      {
        "workId": "twelfth-night",
        "title": "Consider welcome and exclusion",
        "note": "Follow desire, grief and mistaken identity through the household. Compare the pleasure of a joke with the experience of the person made its target."
      },
      {
        "workId": "hamlet",
        "title": "Test what counts as evidence",
        "note": "Trace a claim from one speaker to another. Separate what the audience sees from what a character assumes, then reread the language of certainty."
      },
      {
        "workId": "tempest",
        "title": "Examine power and the possibility of mercy",
        "note": "Read Prospero’s account beside the voices he controls. Ask how music, storytelling and knowledge can offer delight while also exercising power."
      },
      {
        "workId": "sonnets",
        "title": "Finish with a poem held in the voice",
        "note": "Read a complete sonnet aloud twice. Notice the change of direction before the final couplet, and test whether that ending resolves or complicates the poem’s argument."
      }
    ],
    "works": [
      {
        "id": "hamlet",
        "title": "Hamlet",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap08",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "A prince must act on a ghost’s accusation while doubting the motives, appearances and performances around him. Read his delay alongside the damage done by the people who act quickly.",
        "questions": [
          "How does Hamlet test the difference between appearance and reliable knowledge?",
          "When does reflection protect other people, and when does it become an excuse for harming them?"
        ]
      },
      {
        "id": "macbeth",
        "title": "Macbeth",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap20",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "Prophecy, ambition and a marriage’s private language feed a struggle for power. Follow the movement from the welcome offered to Duncan to the fear that makes Macbeth unable to enjoy his own table.",
        "questions": [
          "How do images of clothing, blood and sleeplessness change after the murder?",
          "Where do Macbeth and Lady Macbeth mistake control of appearances for control of consequences?"
        ]
      },
      {
        "id": "king-lear",
        "title": "King Lear",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap18",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently. This text assigns the final speech to Edgar; the Quarto assigns it to Albany.",
        "orientation": "A public test of affection destroys a family and exposes the limits of royal authority. Listen for the moments when poverty and grief teach characters to hear people they once dismissed.",
        "questions": [
          "What does the play make visible when Lear loses shelter, status and an obedient audience?",
          "How do the Fool, Cordelia and Edgar each resist the language of flattery?"
        ]
      },
      {
        "id": "othello",
        "title": "Othello",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap26",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "A trusted subordinate teaches a commander to read ordinary gestures as evidence of betrayal. Study how repetition, insinuation and racial prejudice make a false story feel persuasive.",
        "questions": [
          "Which of Iago’s claims sound most reasonable before their dramatic context is restored?",
          "How does the desire for certainty silence Desdemona and distort Othello’s judgement?"
        ]
      },
      {
        "id": "romeo-and-juliet",
        "title": "Romeo and Juliet",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap30",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "The lovers invent a shared language inside a city governed by inherited hostility. Follow the play’s changing pace as private promises, public violence and interrupted messages converge.",
        "questions": [
          "How do images of light and abundance make love feel separate from Verona’s quarrels?",
          "When do the adults recognise the danger of haste, and when do they help to create it?"
        ]
      },
      {
        "id": "julius-caesar",
        "title": "Julius Caesar",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap17",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "Arguments about liberty, honour and loyalty become instruments in a struggle for political power. Compare what each speaker says to a friend, a crowd and themselves.",
        "questions": [
          "What makes Brutus vulnerable to Cassius’s version of public duty?",
          "How does Antony turn an apparently modest funeral address into political action?"
        ]
      },
      {
        "id": "antony-and-cleopatra",
        "title": "Antony and Cleopatra",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap03",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "Roman accounts of duty compete with the lovers’ expansive language and carefully staged identities. The play repeatedly asks who has the authority to describe another person’s life.",
        "questions": [
          "How does Enobarbus’s account of Cleopatra shape her before we can judge her for ourselves?",
          "When do Antony and Cleopatra use theatrical language to resist political humiliation?"
        ]
      },
      {
        "id": "coriolanus",
        "title": "Coriolanus",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap06",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "A celebrated soldier cannot easily translate military achievement into a relationship with citizens. Study the tension between service, consent, pride and the performances required by public life.",
        "questions": [
          "Who is included when different speakers describe Rome or the people?",
          "Does Volumnia teach her son understanding, disguise, or both?"
        ]
      },
      {
        "id": "titus-andronicus",
        "title": "Titus Andronicus",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap34",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently. Modern authorship scholarship often identifies George Peele as a collaborator, especially in the opening act.",
        "orientation": "Ceremony and revenge turn a victorious return to Rome into a cycle of family destruction. Pay attention to who is allowed to speak and to the inadequate language other people use in the presence of suffering.",
        "questions": [
          "How does the play expose the violence concealed by claims of honour?",
          "When does describing another person’s pain help them, and when does it centre the speaker?"
        ]
      },
      {
        "id": "timon-of-athens",
        "title": "Timon of Athens",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap33",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently. Often treated as a collaboration with Thomas Middleton; the extent of shared authorship and the allocation of individual passages remain debated.",
        "orientation": "Lavish entertainment creates an illusion of friendship that collapses when its host needs help. Compare Timon’s movement from indiscriminate generosity to indiscriminate hatred with the constancy of his steward.",
        "questions": [
          "How can a host tell the difference between reciprocal care and dependence on gifts?",
          "What does Flavius’s loyalty reveal that Timon’s final account of humanity leaves out?"
        ]
      },
      {
        "id": "troilus-and-cressida",
        "title": "Troilus and Cressida",
        "genre": "Tragedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap35",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently. The First Folio calls it a tragedy, although its satirical mixture also invites other genre descriptions.",
        "orientation": "The Trojan War becomes a setting for unstable reputations, competing valuations and damaged trust. Read the speeches about order and honour against the behaviour of the people who deliver them.",
        "questions": [
          "Who decides what Helen, military honour and past achievement are worth?",
          "How does Ulysses turn an account of human nature into a technique for controlling Achilles?"
        ]
      },
      {
        "id": "henry-iv-part-1",
        "title": "Henry IV, Part 1",
        "genre": "History",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap09",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "The court, the rebel camp and the tavern offer rival accounts of honour and responsibility. Watch Prince Hal rehearse a public identity while Falstaff questions what heroic language costs a living body.",
        "questions": [
          "How does Hal’s private account of his friendships alter the way we watch the tavern scenes?",
          "Which parts of Falstaff’s attack on honour remain persuasive despite his self-interest?"
        ]
      },
      {
        "id": "henry-iv-part-2",
        "title": "Henry IV, Part 2",
        "genre": "History",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap10",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "Illness, recruitment and recollection complicate the transfer of a crown. Read the making of Henry V alongside the ordinary lives used or excluded by royal power.",
        "questions": [
          "How does the recruitment scene test the difference between service freely given and service imposed?",
          "What is gained and what is lost when the new king renounces his former companions?"
        ]
      },
      {
        "id": "henry-v",
        "title": "Henry V",
        "genre": "History",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap11",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "A Chorus asks the audience to imagine a nation at war while the scenes expose persuasion, fear and responsibility. Attend to the changes between the king’s public inspiration and his private questioning.",
        "questions": [
          "How does the Chorus ask an audience to participate in making military glory?",
          "What responsibilities does Henry accept in public and question in private?"
        ]
      },
      {
        "id": "richard-ii",
        "title": "Richard II",
        "genre": "History",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap28",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "A king’s belief in sacred authority meets a political world he can no longer command. Follow how his language changes as ceremony, identity and physical power fall apart.",
        "questions": [
          "What does Richard believe the crown can protect him from?",
          "Does his imaginative language create understanding, postpone action, or do both at once?"
        ]
      },
      {
        "id": "richard-iii",
        "title": "Richard III",
        "genre": "History",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap29",
        "edition": "Project Gutenberg #100, The Complete Works of William Shakespeare; original English",
        "access": "Free full text",
        "note": "Complete original-English play, free to read online. Act and scene divisions follow this edition; other editions may number lines differently.",
        "orientation": "Richard recruits the audience as witnesses to his plots while using different voices for everyone around him. Compare his confident manipulation with the internal argument that returns before battle.",
        "questions": [
          "How do Richard’s asides create intimacy while revealing the danger of trusting him?",
          "What changes when the man who controls other people’s stories must listen to his own conscience?"
        ]
      },
      {
        "id": "alls-well-that-ends-well",
        "title": "All’s Well That Ends Well",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap02",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Helena’s ingenuity meets a society governed by rank, inheritance and unequal expectations of women. Read its apparently reassuring title alongside the uneasy bargains that produce its ending.",
        "questions": [
          "How does Helena turn specialist knowledge into social power?",
          "Does the final marriage resolve the ethical difficulties that brought it about?"
        ]
      },
      {
        "id": "as-you-like-it",
        "title": "As You Like It",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap04",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Exile in Arden gives characters room to rehearse new identities and question the language of love. Compare the forest’s promises with its hunger, cold and social hierarchies.",
        "questions": [
          "What does Rosalind learn by directing courtship while disguised?",
          "When does the forest offer freedom, and when do courtly inequalities return?"
        ]
      },
      {
        "id": "comedy-of-errors",
        "title": "The Comedy of Errors",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap05",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Two pairs of twins turn ordinary greetings, debts and invitations into a crisis of identity. Beneath the farce, separation makes the wish to be recognised emotionally urgent.",
        "questions": [
          "When does a friendly welcome feel threatening rather than reassuring?",
          "How do names and social expectations create a person’s apparent identity?"
        ]
      },
      {
        "id": "cymbeline",
        "title": "Cymbeline",
        "genre": "Romance",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap07",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Cymbeline was printed among the First Folio tragedies and is commonly studied with Shakespeare’s late romances; the shelf uses that latter grouping.",
        "orientation": "Disguise, false evidence and separation repeatedly obscure Imogen’s loyalty. Attend to the difference between what characters confidently believe and what the audience has seen.",
        "questions": [
          "Why do tokens and appearances become more persuasive than trust?",
          "How do the cave scenes alter the play’s understanding of family and belonging?"
        ]
      },
      {
        "id": "loves-labours-lost",
        "title": "Love’s Labour’s Lost",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap19",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "A plan to pursue learning by excluding women quickly collapses under its own desires. Follow how dazzling wordplay is finally measured against illness, grief and responsibility.",
        "questions": [
          "When does clever language deepen understanding, and when does it protect vanity?",
          "Why does the play delay its expected marriages?"
        ]
      },
      {
        "id": "measure-for-measure",
        "title": "Measure for Measure",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap21",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Vienna’s policing of sexuality exposes the gap between public authority and private conduct. Read arguments for mercy alongside the pressure placed on those asked to grant it.",
        "questions": [
          "What is the difference between justice, bargaining and coercion in Angelo’s decisions?",
          "How much freedom do the women possess in the final settlement?"
        ]
      },
      {
        "id": "merchant-of-venice",
        "title": "The Merchant of Venice",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap22",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Contracts, gifts and bonds test the boundaries of belonging in Venice and Belmont. Study the play’s antisemitic language and coercive treatment of Shylock alongside its powerful arguments about shared humanity.",
        "questions": [
          "Who is entitled to mercy in the trial, and who gets to define it?",
          "How do gift, debt and obligation shape the apparently generous relationships?"
        ]
      },
      {
        "id": "merry-wives-of-windsor",
        "title": "The Merry Wives of Windsor",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap23",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Households and neighbours organise the comedy’s answer to Falstaff’s attempted exploitation. Everyday credit, money and reputation often matter more than aristocratic status.",
        "questions": [
          "How do the wives turn apparently private threats into collective action?",
          "When does the community’s playful discipline become humiliation?"
        ]
      },
      {
        "id": "midsummer-nights-dream",
        "title": "A Midsummer Night’s Dream",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap24",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Lovers, labourers and fairies inhabit competing versions of the same night. Notice how imagination can create delight, confusion and failures of sympathy.",
        "questions": [
          "Who controls the lovers’ choices, and when is that control visible to them?",
          "What kind of generosity makes the mechanicals’ imperfect performance enjoyable?"
        ]
      },
      {
        "id": "much-ado-about-nothing",
        "title": "Much Ado About Nothing",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap25",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "In Messina, overheard stories can generate love or destroy a reputation. Compare playful deception with the public cruelty produced by believing a convenient accusation.",
        "questions": [
          "Why are the same characters sceptical in courtship but credulous about scandal?",
          "How does Beatrice’s loyalty to Hero change the stakes of her relationship with Benedick?"
        ]
      },
      {
        "id": "pericles",
        "title": "Pericles, Prince of Tyre",
        "genre": "Romance",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap27",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Pericles is generally treated as a collaboration with George Wilkins; the two selections here come from the later acts conventionally associated with Shakespeare. See Folger’s dramaturg’s notes for the attribution question.",
        "orientation": "Sea journeys repeatedly separate and reunite a family, making recognition an act of patient listening. Marina’s encounters give ethical weight to speech under extreme pressure.",
        "questions": [
          "How does Marina turn a listener’s claimed honour into a demand for action?",
          "What has to be heard and believed before recognition can restore the family?"
        ]
      },
      {
        "id": "taming-of-the-shrew",
        "title": "The Taming of the Shrew",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap31",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Performance, marriage and social obedience collide in a comedy structured around coercion. Attend to who controls food, clothing, money and the right to describe what is happening.",
        "questions": [
          "How do deprivation and enforced agreement shape Katherine’s choices?",
          "What alternative readings of the final speech can a performance support, and what evidence limits them?"
        ]
      },
      {
        "id": "tempest",
        "title": "The Tempest",
        "genre": "Romance",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap32",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Prospero’s island joins the beauty of spectacle to questions about service, possession and freedom. Follow who controls each story and who finally gains the power to leave.",
        "questions": [
          "When does Prospero’s art protect others, and when does it restrict them?",
          "How does Caliban’s knowledge of the island challenge other characters’ descriptions of him?"
        ]
      },
      {
        "id": "twelfth-night",
        "title": "Twelfth Night",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap36",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Disguise lets desire cross the boundaries set by rank and gender, while uncertainty makes language both revealing and dangerous. Keep the joy of the lovers beside the cruelty of Malvolio’s treatment.",
        "questions": [
          "What can Viola say truthfully only because others misunderstand her?",
          "At what point does the prank against Malvolio cease to be harmless entertainment?"
        ]
      },
      {
        "id": "two-gentlemen-of-verona",
        "title": "The Two Gentlemen of Verona",
        "genre": "Comedy",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap37",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "Travel promises education, but friendship and desire expose how poorly the men understand loyalty. Read the language of devotion against the harm done to Julia and Silvia.",
        "questions": [
          "Does experience abroad improve the characters’ judgement?",
          "How does the ending distribute forgiveness, and whose wishes receive the least attention?"
        ]
      },
      {
        "id": "winters-tale",
        "title": "The Winter’s Tale",
        "genre": "Romance",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap39",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "Complete play in Gutenberg’s collected works. Original English spelling and punctuation follow this edition; scene numbering may differ from other editions.",
        "orientation": "A sudden collapse of trust gives way to loss, pastoral renewal and an extraordinary act of recognition. Track what time can heal and what the ending cannot return.",
        "questions": [
          "How does Leontes transform innocent details into apparent proof?",
          "What must the spectators contribute to the final scene’s power?"
        ]
      },
      {
        "id": "sonnets",
        "title": "Sonnets",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/100/pg100-images.html#chap01",
        "edition": "Original English; Project Gutenberg, The Complete Works of William Shakespeare, ebook 100",
        "access": "Free full text",
        "note": "All 154 sonnets in Gutenberg’s collected works, in original English. The selected line numbers count the fourteen verse lines of each sonnet; identities of the addressees are not asserted.",
        "orientation": "The sequence tests what praise, memory and poetry can do against desire and time. Treat each speaker as a crafted poetic voice rather than assuming every declaration is straightforward autobiography.",
        "questions": [
          "Where does a poem turn from its opening claim to a different kind of understanding?",
          "How do the closing couplets confirm, complicate or resist the preceding lines?"
        ]
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
      "study-shakespeare-sonnets-130-false-compare"
    ]
  },
  {
    "id": "chaucer",
    "writerId": "geoffrey-chaucer",
    "name": "Geoffrey Chaucer",
    "shortName": "Chaucer",
    "subtitle": "The road, the dream & the shared table",
    "intro": "Travel among pilgrims, dreamers, lovers and teachers. Attend to the person telling a story as closely as the story itself, and discover how a shared journey brings different claims to wisdom into conversation.",
    "readingNote": "The Middle English is retained from the named Skeat editions. Open Study this passage for an original plain-English reading aid, then return to the actual words. Canterbury Group letters and line numbers follow Skeat, rather than a different edition’s fragment numbering. A tale’s narrator, a pilgrim and Chaucer are distinct voices.",
    "pathIntro": "Start with the people gathering for a journey. Then compare competing accounts of authority, freedom and love before following a dream into a wider conversation.",
    "path": [
      {
        "workId": "canterbury-general-prologue",
        "title": "Notice the people at the table",
        "note": "Read a pilgrim’s portrait aloud and list its concrete details. Ask which details support the narrator’s praise and which quietly complicate it."
      },
      {
        "workId": "canterbury-wife-prologue",
        "title": "Listen to a claim of authority",
        "note": "Track the Wife’s movement between experience, books and argument. Ask how the voice gains an audience and which questions it leaves unsettled."
      },
      {
        "workId": "canterbury-franklins-tale",
        "title": "Weigh freedom against a promise",
        "note": "Keep a record of what each character promises and what each freely gives up. Revisit the tale’s invitation to judge generosity only after reading the whole exchange."
      },
      {
        "workId": "troilus-and-criseyde",
        "title": "Read love through the narrator’s choices",
        "note": "Listen for changes between confidence, sympathy and foreknowledge. Ask how the narrator’s account shapes your judgement of each lover."
      },
      {
        "workId": "parliament-of-fowls",
        "title": "Allow more than one voice to be heard",
        "note": "Read the birds’ debate as an encounter among different interests. Consider what remains unresolved when the assembly tries to settle a private choice."
      }
    ],
    "works": [
      {
        "id": "canterbury-general-prologue",
        "title": "The Canterbury Tales: General Prologue",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#prologue",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "A spring pilgrimage gathers strangers at the Tabard Inn. Read the portraits slowly: praise, clothes, food and professional habits can reveal more than the narrator openly judges.",
        "questions": [
          "Where does apparent praise become an invitation to question a pilgrim?",
          "How do the inn, the meal and the storytelling agreement turn strangers into a company?"
        ]
      },
      {
        "id": "canterbury-knights-tale",
        "title": "The Canterbury Tales: The Knight’s Tale",
        "genre": "Tale",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#knight",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "Two imprisoned knights love Emelye, while Theseus tries to impose order on rivalry, accident and death. Keep Emelye’s own wishes in view beside the men’s ideals.",
        "questions": [
          "How does Emelye’s prayer complicate the supposed romance?",
          "Does Theseus’s final account of necessity console everyone equally?"
        ]
      },
      {
        "id": "canterbury-millers-prologue",
        "title": "The Canterbury Tales: The Miller’s Prologue",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#millerpro",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "The Miller disrupts the orderly sequence after the Knight’s romance. The narrator’s apology makes readers responsible for how they receive a deliberately unruly tale.",
        "questions": [
          "What changes when the Miller refuses to wait his turn?",
          "Does the narrator’s apology protect his audience or advertise the coming story?"
        ]
      },
      {
        "id": "canterbury-millers-tale",
        "title": "The Canterbury Tales: The Miller’s Tale",
        "genre": "Tale",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#miller",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "An Oxford student turns learning and a false flood warning into tools of deception. The comedy asks readers to notice who controls information and who pays for misplaced trust.",
        "questions": [
          "How does Nicholas turn scholarly authority into practical power?",
          "What makes the carpenter’s trust understandable even while the tale laughs at him?"
        ]
      },
      {
        "id": "canterbury-wife-prologue",
        "title": "The Canterbury Tales: The Wife of Bath’s Prologue",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#wifepro",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "Alisoun places her five marriages beside the authorities used to judge women. Her lively argument invites scrutiny of experience, interpretation and the power to tell a life.",
        "questions": [
          "When does Alisoun use the authorities she also challenges?",
          "How does the story of who painted the lion change the way you read a moral example?"
        ]
      },
      {
        "id": "canterbury-wife-tale",
        "title": "The Canterbury Tales: The Wife of Bath’s Tale",
        "genre": "Tale",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#wife",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "A knight who has committed rape must discover what women most desire. The old woman who supplies an answer later challenges his assumptions about beauty, poverty and nobility.",
        "questions": [
          "How far does the knight’s final surrender of choice answer the harm with which the tale begins?",
          "What does the old woman claim must be earned rather than inherited?"
        ]
      },
      {
        "id": "canterbury-pardoner-prologue",
        "title": "The Canterbury Tales: The Pardoner’s Prologue",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#pardonerpro",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "The Pardoner openly describes the tricks by which his preaching earns money. His confession separates the force of a moral story from the integrity of its performer.",
        "questions": [
          "Does knowing the preacher’s motive change the truth of his warning?",
          "Which details show preaching functioning as a performance or a sale?"
        ]
      },
      {
        "id": "canterbury-pardoners-tale",
        "title": "The Canterbury Tales: The Pardoner’s Tale",
        "genre": "Tale",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#pardoner",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "Three rioters set out to find Death and discover gold instead. Read the change in their desires alongside the Pardoner’s admission that he also seeks profit.",
        "questions": [
          "At what point does shared purpose become private calculation?",
          "Why does the encounter with the old man matter before the discovery of the treasure?"
        ]
      },
      {
        "id": "canterbury-nuns-priests-tale",
        "title": "The Canterbury Tales: The Nun’s Priest’s Tale",
        "genre": "Tale",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#nunspriest",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "A rooster’s dream and a fox’s flattery turn a farmyard escape into a debate about interpretation and choice. The learned voices are part of the comedy, not a guarantee of wisdom.",
        "questions": [
          "How do the rooster and the fox each mistake the power of their own speech?",
          "What happens when an apparently simple animal story asks you to sift its meaning?"
        ]
      },
      {
        "id": "canterbury-franklins-tale",
        "title": "The Canterbury Tales: The Franklin’s Tale",
        "genre": "Tale",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#franklin",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "A promise made under distress entangles Dorigen, her husband, a suitor and a learned magician. Its ending asks you to compare their acts of release and generosity.",
        "questions": [
          "How does the tale distinguish a freely given promise from pressure?",
          "Which character gives up the most, and what evidence supports your answer?"
        ]
      },
      {
        "id": "canterbury-clerks-tale",
        "title": "The Canterbury Tales: The Clerk’s Tale",
        "genre": "Tale",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#clerk",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "Walter subjects Griselda to cruel tests of obedience, while the Clerk and the closing envoy complicate the lesson. Distinguish the story’s suffering from the different interpretations offered at its end.",
        "questions": [
          "Where does the narrator explicitly criticise Walter’s testing?",
          "How does the envoy change the demand for silence and patience?"
        ]
      },
      {
        "id": "canterbury-manciples-tale",
        "title": "The Canterbury Tales: The Manciple’s Tale",
        "genre": "Tale",
        "url": "https://www.gutenberg.org/cache/epub/22120/pg22120-images.html#manciple",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume IV, Clarendon Press, 1900; Project Gutenberg #22120.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "The story of Phoebus’s crow leads to an extended warning about speech. Its advice raises difficult questions about truth, discretion and the power of those who receive unwelcome news.",
        "questions": [
          "Does the crow’s punishment make silence virtuous, prudent or fearful?",
          "How do the images of a weapon and a walled tongue shape the closing lesson?"
        ]
      },
      {
        "id": "troilus-and-criseyde",
        "title": "Troilus and Criseyde",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/44833/pg44833-images.html#page153",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume II, Clarendon Press, 1900; Project Gutenberg #44833.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "A Trojan love story develops through persuasion, secrecy and the pressure of war. Follow the changing distance between what each character believes and what the sympathetic but questioning narrator tells us.",
        "questions": [
          "How does Pandarus’s skill with words shape the lovers’ choices?",
          "Where does the narrator resist the inherited judgement of Criseyde, and where does he repeat it?"
        ]
      },
      {
        "id": "book-of-the-duchess",
        "title": "The Book of the Duchess",
        "genre": "Dream vision",
        "url": "https://www.gutenberg.org/cache/epub/43089/pg43089-images.html#page277",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume I, Clarendon Press, 1899; Project Gutenberg #43089.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "A sleepless reader enters a dream and meets a grieving knight. The poem explores how indirect language, patient conversation and eventual recognition can approach another person’s loss.",
        "questions": [
          "When does the dreamer listen well, and when does he fail to understand?",
          "How do the opening book and the final decision to write frame the work of mourning?"
        ]
      },
      {
        "id": "house-of-fame",
        "title": "The House of Fame",
        "genre": "Dream vision",
        "url": "https://www.gutenberg.org/cache/epub/45027/pg45027-images.html#page1",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume III, Clarendon Press, 1900; Project Gutenberg #45027.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "An eagle carries a bookish dreamer into a world of fame, sound and rumour. The unfinished poem asks how stories travel and why public reputation can detach itself from truth.",
        "questions": [
          "How do the eagle’s explanations both educate and comically overwhelm the dreamer?",
          "What distinguishes lasting artistic memory from the circulation of rumour?"
        ]
      },
      {
        "id": "parliament-of-fowls",
        "title": "The Parliament of Fowls",
        "genre": "Dream vision",
        "url": "https://www.gutenberg.org/cache/epub/43089/pg43089-images.html#page335",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume I, Clarendon Press, 1899; Project Gutenberg #43089.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "Reading Cicero’s Dream of Scipio leads the narrator into a garden where birds debate love under Nature’s rule. Different kinds of birds bring different values, while the female eagle insists on time to choose.",
        "questions": [
          "How do differences of rank and species affect whose argument is respected?",
          "What does the female eagle’s request reveal about the limits of collective judgement?"
        ]
      },
      {
        "id": "truth",
        "title": "Truth",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/43089/pg43089-images.html#page390",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume I, Clarendon Press, 1899; Project Gutenberg #43089.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "This moral ballade advises steadiness amid ambition and Fortune’s changes. Read its movement from practical self-command towards a Christian understanding of pilgrimage.",
        "questions": [
          "What kinds of ambition does the first stanza distrust?",
          "How does the final pilgrimage image change the meaning of finding contentment?"
        ]
      },
      {
        "id": "gentilesse",
        "title": "Gentilesse",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/43089/pg43089-images.html#page392",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume I, Clarendon Press, 1899; Project Gutenberg #43089.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "The poem separates inherited wealth and titles from moral nobility. Its repeated reference to religious and royal rank tests whether outward office can establish inward worth.",
        "questions": [
          "What can parents leave to an heir, and what does the poem say they cannot?",
          "How does the repeated list of honours expose the limits of rank?"
        ]
      },
      {
        "id": "former-age",
        "title": "The Former Age",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/43089/pg43089-images.html#page380",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume I, Clarendon Press, 1899; Project Gutenberg #43089.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "An imagined earlier world offers a standard by which to criticise greed, luxury and coercion. Its simplicity is a moral and literary construction, not a factual account of prehistory.",
        "questions": [
          "Which costs of wealth and power become visible through the imagined past?",
          "What should you preserve or question when using a golden age to criticise the present?"
        ]
      },
      {
        "id": "fortune",
        "title": "Fortune",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/43089/pg43089-images.html#page383",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume I, Clarendon Press, 1899; Project Gutenberg #43089.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "A suffering plaintiff and personified Fortune argue about change, friendship and self-command. Attend to who is speaking before treating any line as the poem’s settled conclusion.",
        "questions": [
          "What does the plaintiff claim remains beyond Fortune’s control?",
          "How does Fortune’s reply alter the plaintiff’s account of loss?"
        ]
      },
      {
        "id": "lack-of-steadfastness",
        "title": "Lak of Stedfastnesse",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/43089/pg43089-images.html#page394",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume I, Clarendon Press, 1899; Project Gutenberg #43089.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "The ballade laments a world in which words and conduct diverge, then turns towards a ruler’s responsibility. Its public ethics depend on promises being more than attractive language.",
        "questions": [
          "How does private unreliability become a political problem in the poem?",
          "Which duties does the envoy place on the ruler rather than on subjects alone?"
        ]
      },
      {
        "id": "adam-scrivener",
        "title": "Chaucers Wordes unto Adam, His Owne Scriveyn",
        "genre": "Poetry",
        "url": "https://www.gutenberg.org/cache/epub/43089/pg43089-images.html#page379",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume I, Clarendon Press, 1899; Project Gutenberg #43089.",
        "access": "Free full text",
        "note": "Complete Middle English text in a public-domain historical edition. The linked volume also contains editorial notes; the glosses here are original reading aids.",
        "orientation": "A compact complaint to a copyist makes textual accuracy personal and material. Rubbing, scraping and rewriting remind us that a surviving literary work also depends on careful hands.",
        "questions": [
          "What does the speaker’s repeated correction reveal about manuscript production?",
          "How can this poem sharpen your own habits of quotation and attribution?"
        ]
      },
      {
        "id": "treatise-on-astrolabe",
        "title": "A Treatise on the Astrolabe",
        "genre": "Treatise",
        "url": "https://www.gutenberg.org/cache/epub/45027/pg45027-images.html#page175",
        "edition": "Walter W. Skeat, The Complete Works of Geoffrey Chaucer, volume III, Clarendon Press, 1900; Project Gutenberg #45027.",
        "access": "Free full text",
        "note": "Free surviving Middle English text. The prologue outlines five parts; the principal surviving text comprises the first two, with supplementary material printed separately in this edition.",
        "orientation": "Addressed to young Lowis, the treatise explains an astronomical instrument through accessible English and practical instruction. Its prologue offers a remarkably concrete account of teaching, translation and the limits of a small tool.",
        "questions": [
          "How does the author adapt both language and repetition to the learner?",
          "Where does the treatise distinguish an instrument’s useful power from its limits?"
        ]
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
      "study-chaucer-troilus-and-criseyde-inviting-correction"
    ]
  }
];
