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
    "intro": "Join Chaucer’s pilgrims at the inn, follow his lovers and dreamers, and listen to how different people explain their lives. Start with the original words and a simple modern-English reading aid. Then ask who is speaking, what is happening, and what the words help you notice.",
    "readingNote": "The quotations keep the Middle English of the named Skeat editions. The current-English reading aids are our own prose explanations, not Chaucer’s exact words or a complete translation of each work. Read the original and the aid together: jokes, rhyme and double meanings do not always fit into one smooth sentence. Canterbury Group letters and line numbers follow Skeat. Chaucer the author, the pilgrim narrator and a character inside a tale are different voices.",
    "pathIntro": "Begin with a few people at the inn and one short tale. Add the trickier debates once you recognise who is speaking. A small passage understood well is a better start than rushing through unfamiliar words.",
    "path": [
      {
        "workId": "canterbury-general-prologue",
        "title": "Meet the company at the inn",
        "note": "Start with the Host, the Clerk and the Franklin. For each portrait, write three things you learn about the person. Then separate the narrator’s praise from the details that might make you question it."
      },
      {
        "workId": "canterbury-pardoner-prologue",
        "title": "Learn to separate a speaker from a message",
        "note": "Read the Pardoner’s account of his methods, then follow it with his tale of the three rioters. In plain words, explain why his warning about greed may be true even though he is greedy himself."
      },
      {
        "workId": "canterbury-wife-prologue",
        "title": "Hear the argument behind the confidence",
        "note": "Read the Wife’s opening claim about experience and the example of the painted lion, then read her tale. Ask who gets to decide what counts as knowledge and who gets to choose within a marriage."
      },
      {
        "workId": "canterbury-franklins-tale",
        "title": "Think carefully about a promise",
        "note": "List what Dorigen, Arveragus, Aurelius and the learned man each agree to do. Then ask what is freely chosen, what creates pressure and what is finally released. Give your own reasoned answer to the closing question."
      },
      {
        "workId": "parliament-of-fowls",
        "title": "Carry the questions into a dream",
        "note": "Follow the birds’ debate and the female eagle’s request for time. Compare her freedom to choose with the choices available to Emelye and Dorigen in the tales. Notice how Chaucer can end with song while leaving a question open."
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
        "orientation": "A group of travellers meets at the Tabard Inn in Southwark before going to Canterbury. The narrator introduces them through their work, clothes, food, manners and speech. The Host proposes a storytelling contest with supper as the prize. Read the details beside the praise: a narrator who sounds impressed can still give you reasons to question a pilgrim.",
        "questions": [
          "Choose one pilgrim. What do they do, what does the narrator say about them, and do those two kinds of evidence agree?",
          "How do the innkeeper’s welcome and the proposed meal turn strangers into a group?"
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
        "orientation": "Palamon and Arcite, two imprisoned knights, both fall in love with Emelye. Duke Theseus tries to settle their rivalry through a tournament, but chance, the gods and death upset human plans. Emelye first asks to remain unmarried. Keep her wishes in view while the men talk about love and honour.",
        "questions": [
          "What does each lover think would make him happy, and why does getting it fail to solve everything?",
          "Whose wishes does Theseus’s final marriage arrangement fulfil, and whose voice is least heard?"
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
        "orientation": "After the Knight’s formal romance, the drunken Miller insists on telling the next story. The Host’s plan for an orderly sequence breaks down. The narrator warns readers that the story will be rude and tells them they can turn the page. This apology also invites us to notice who chooses what a book contains.",
        "questions": [
          "Why does the Miller want to answer the Knight instead of waiting his turn?",
          "Does the narrator’s warning excuse the story, advertise it, or do both?"
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
        "orientation": "In Oxford, Nicholas, a student, plots with his landlord’s young wife Alisoun to deceive her husband. A false prediction of a flood gives the lovers their opportunity, while another suitor becomes part of the joke. This is a bawdy comic tale: cleverness does not make the characters kind or trustworthy. It answers the Knight’s elevated love story with bodies, tricks and ordinary households.",
        "questions": [
          "How does Nicholas use the appearance of learning to make a false story convincing?",
          "Who is allowed to laugh at the ending, and who pays for that laughter?"
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
        "orientation": "Alisoun of Bath tells the company about her five marriages and argues with the books used to judge women. Her prologue is a speech about her life, not yet the Arthurian tale she will tell afterwards. She values experience but also uses learned texts when they support her. Listen for confidence, jokes, contradictions and the unequal power inside marriage.",
        "questions": [
          "When does Alisoun challenge a book’s authority, and when does she claim that authority for herself?",
          "What does the lion’s picture teach you about who gets to write the evidence?"
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
        "orientation": "In an Arthurian story, a knight who has raped a woman must discover what women most desire. An old woman gives him the answer, then requires him to marry her. When he despises her age and social rank, she challenges his ideas about nobility. The magical ending raises questions about choice and control without cancelling the harm that begins the tale.",
        "questions": [
          "How does the knight move from repeating an answer about women’s power to giving his wife a choice?",
          "Which parts of the ending feel like a resolution, and which ethical questions remain?"
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
        "orientation": "The Pardoner tells the pilgrims how he makes money through sermons and supposed holy relics. He preaches against greed while admitting that greed is his own motive. His account asks you to separate a message from the person delivering it. Understanding his trick will matter when he later tries to sell to the company itself.",
        "questions": [
          "What makes his performance persuasive to an audience that does not know the trick?",
          "Can a corrupt teacher tell a true moral story, and what should a listener do with that knowledge?"
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
        "orientation": "Three drunken men swear to kill Death. An old man directs them to a tree, where they find gold. They stop thinking about their mission and begin plotting for the money. Their own greed brings the story to its deadly end. Read the warning beside the Pardoner’s open admission that he, too, is motivated by profit.",
        "questions": [
          "At what point does the men’s shared promise become a plan to harm one another?",
          "What does the text actually tell you about the old man, and what does it leave uncertain?"
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
        "orientation": "Chauntecleer, a proud rooster, has a frightening dream. His companion Pertelote argues with him about its meaning, then a fox uses flattery to catch him. The rooster escapes through another trick with words. Learned arguments, farmyard animals and grand heroic language make the story funny while leaving several possible lessons to sort through.",
        "questions": [
          "What causes the rooster’s danger and what allows his escape?",
          "Compare the rooster’s lesson with the fox’s. Why is a sensible rule not enough to make its speaker good?"
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
        "orientation": "Dorigen and Arveragus promise to respect one another in marriage. While her husband is away, Dorigen makes an apparently impossible promise to a suitor: she will accept him if he removes the dangerous coastal rocks. A learned man makes the rocks appear to vanish, and her promise becomes a crisis. The ending asks who acts most generously, but Dorigen’s freedom and distress also need to be heard.",
        "questions": [
          "What is freely promised, what is promised under pressure, and what is finally given up?",
          "How would your answer to the closing generosity question change if you began with Dorigen’s wishes?"
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
        "orientation": "Walter, a powerful lord, marries the poor Griselda and subjects her to cruel tests of obedience, including making her believe her children have been killed. The Clerk sometimes condemns Walter directly. Near the end he turns endurance towards a religious lesson; a comic closing poem then urges wives to talk back. These different endings prevent an easy rule that a good wife must suffer silently.",
        "questions": [
          "Where does the Clerk condemn Walter, rather than merely describe what he does?",
          "How do the story, its religious explanation and the comic envoy pull your judgement in different directions?"
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
        "orientation": "A crow tells Phoebus that his wife has been unfaithful. Phoebus kills her, regrets it and punishes the crow. The Manciple then repeats his mother’s advice to control the tongue. Because the crow told the truth, this is more difficult than a simple warning against lying or gossip: it also concerns dangerous power and the punishment of a messenger.",
        "questions": [
          "Does the crow’s fate show that speech is wrong, or that powerful listeners can be unjust?",
          "When is silence wise, and when might it protect the person causing harm?"
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
        "orientation": "During the Trojan War, Troilus and the widowed Criseyde become lovers with the help of her uncle Pandarus. His persuasion and deception shape their choices. A political exchange sends Criseyde into the Greek camp and separates them. The narrator moves between sympathy, blame and religious reflection, so his way of telling matters as much as the events.",
        "questions": [
          "When does Pandarus help someone, and when does his help become pressure?",
          "How much freedom does Criseyde have at each stage, and how does the narrator influence your judgement of her?"
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
        "orientation": "A sleepless narrator reads a story, falls asleep and dreams of meeting a man in black who is grieving. The dreamer struggles to understand the man’s indirect account of loss before finally hearing that his beloved is dead. The poem explores how listening, misunderstanding and patient conversation can approach another person’s grief.",
        "questions": [
          "Which replies show that the dreamer is listening, and which show that he has not yet understood?",
          "Why might someone speak about grief through a long story before naming the death directly?"
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
        "orientation": "A bookish dreamer called Geffrey is carried by an eagle into an extraordinary world of sound, public reputation and rumour. Fame does not distribute honour fairly, and truth can travel mixed with lies. The surviving poem breaks off without resolving everything. Read the dream as a series of questions about how information and reputations are made.",
        "questions": [
          "What does the eagle explain clearly, and where does his learned manner become comic?",
          "What evidence would you need before trusting a report or someone’s reputation?"
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
        "orientation": "After reading about Scipio’s dream, the narrator dreams of a garden where birds debate love under Nature’s rule. Different birds speak from different ranks and interests. Several male eagles want the same female eagle, but she asks for time and a free choice. A cheerful song ends the gathering without forcing her to decide.",
        "questions": [
          "Whose advice is taken seriously, and whose is dismissed because of the kind of bird giving it?",
          "Why is asking for more time a meaningful answer rather than simply a failure to decide?"
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
        "orientation": "This short poem advises the reader to resist competitive ambition, live truthfully and be content with enough. It then turns earthly life into a pilgrimage towards a heavenly home. Its practical advice belongs to that Christian view of life, rather than being only a plan for personal calm.",
        "questions": [
          "Which kinds of ambition does the poem question, and which responsibilities does it still leave with the reader?",
          "How does thinking of life as a journey change the meaning of being content?"
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
        "orientation": "This short poem asks what makes a person truly noble. Its answer is goodness in conduct, not inherited money, impressive titles or high office. The same refrain challenges bishops and rulers as well as ordinary heirs. Gentilesse means moral nobility here, not simply gentle manners.",
        "questions": [
          "What can an heir inherit, and what must the heir practise for themselves?",
          "Why does the poem repeat its challenge to people wearing religious and royal symbols of rank?"
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
        "orientation": "The poem imagines an earlier world without the greed, luxury and violence of its present. That golden age is a moral picture used to criticise society, not a reliable account of how prehistoric people lived. Simple material conditions are set beside mutual trust.",
        "questions": [
          "Which harms of wealth and power become easier to see through this imagined comparison?",
          "What might an ideal picture of the past help you notice, and what might it hide?"
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
        "orientation": "A person who has suffered bad fortune argues with Fortune, who is imagined as a speaking figure. They disagree about loss, friendship and what remains under a person’s control. Notice the change of speaker before treating a memorable line as the whole poem’s conclusion.",
        "questions": [
          "What does the complaining speaker claim Fortune cannot take away?",
          "How does Fortune challenge that account when she answers?"
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
        "orientation": "The poem contrasts an ideal past of honest promises with a present full of unreliable words and corrupt behaviour. It ends by addressing a ruler and asking for public justice. The ideal past is part of the poem’s argument, not established historical fact.",
        "questions": [
          "How does a broken promise between individuals become a problem for a whole society?",
          "What does the final address ask the ruler to do?"
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
        "orientation": "In a short, irritated address, the speaker tells a copyist called Adam to take more care. Bad copying forces the writer to rub, scrape and correct the manuscript. The joke has a practical point: literature reaches future readers through the work of people who can preserve or damage its words.",
        "questions": [
          "Which physical actions show the effort needed to correct a manuscript?",
          "How would the same problem appear when copying a quotation or checking a source today?"
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
        "orientation": "Chaucer addresses young Lowis and explains how to use an astrolabe, an instrument for working with positions in the sky. He chooses English, accepts useful repetition and admits what a small instrument cannot show precisely. The opening is a practical account of how to teach a learner, even before the astronomical exercises begin.",
        "questions": [
          "How does he adapt his language and method to the child he is teaching?",
          "Why can an honest statement about a tool’s limits make its instructions more trustworthy?"
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
