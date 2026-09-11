/* ============ The Producers ============

   665 records: 562 estates and 103 wines famous enough that a
   candidate names the wine before they name the maker.

   HOW THIS WAS WRITTEN, because the answer matters more here than anywhere
   else in the app. Wine facts are exactly where fluent generation fails, and
   it fails in four recognisable shapes: a plausible NUMBER, a plausible
   NEIGHBOUR, a plausible OWNER, a plausible RELATION. The same four shapes
   the content lint in .scripts/check-claims.js was built to surface.

   So the corpus was authored one wine region at a time, each region by a
   pass that read the existing Producer Codex and the primer chapters first
   so the voice would match, and each region then read back by a SECOND pass
   whose only instruction was to refute it. Where that pass named a field and
   could correct it, the correction is here. Where the honest answer was that
   the claim should not be made at all, the field is EMPTY.

   AN EMPTY FIELD IS A TRUE ANSWER. That is the rule this file is written to,
   and it is the same rule the wine list importer in js/wine-rows.js follows:
   a founding year nobody is sure of is worse than no founding year, because
   somebody is going to sit an examination on it. Volatile facts are left out
   for the same reason: ownership, hectares, a current winemaker and a recent
   vintage all change, and a study app that states them goes stale silently.

   THE SEVENTY-FIVE ROWS OF THE ORIGINAL PRODUCER CODEX are not in this file.
   They are still in js/reference.js and codex16.js folds any of them this
   corpus does not cover into the same shape at runtime, marked as awaiting a
   full write-up. Nothing that was written before is lost.

   Gated by .scripts/check-producers.js: ids unique, countries grouping
   cleanly, every record generating at least one answerable question, no
   bottling name claimed by two estates, and no pictorial character or
   em-dash anywhere.

   By country:
      68  France, Bordeaux and the South West
      72  France, Burgundy and Beaujolais
      62  France, Champagne, Loire and Alsace
      57  France, Rhône and the Mediterranean South
      68  Italy, Piedmont and the North
      71  Italy, Tuscany and the South
      66  Spain and Portugal
      59  Germany, Austria and Central Europe
      71  The United States and Canada
      71  Australia, New Zealand, South Africa and South America
   ============ */

var WINE_PRODUCERS = [
  {
    id: 'p-ch-angelus', p: 'Château Angélus',
    country: 'France, Bordeaux and the South West', r: 'Saint-Émilion', sub: 'Premier Grand Cru Classé A in 2012, withdrew before the 2022 revision',
    founded: '',
    holdings: 'A south-facing amphitheatre on the pied de côte below the limestone plateau, on clay and limestone slopes, run by the de Boüard family.',
    style: 'Rich, dark and glossy: black cherry, mocha and sweet oak, the modern Saint-Émilion style at full volume.',
    t: 'Black cherry and mocha, bells on the label: modern Saint-Émilion',
    why: 'Promoted to A in 2012 and out of the system by 2022, it is the shortest route into the revision politics that define this appellation.',
    wines: [
      { n: 'Château Angélus', grape: 'Merlot and Cabernet Franc', note: 'Promoted to Premier Grand Cru Classé A in the 2012 revision' },
      { n: 'Le Carillon d\'Angélus', grape: 'Merlot and Cabernet Franc', note: 'The second wine' }
    ],
    traps: [
      'Angélus held A status only from 2012 until it withdrew before 2022',
      'Promotion to A is recent for Angélus and Pavie; Ausone and Cheval Blanc held it far longer'
    ]
  },
  {
    id: 'p-ch-ausone', p: 'Château Ausone',
    country: 'France, Bordeaux and the South West', r: 'Saint-Émilion', sub: 'Premier Grand Cru Classé A until it withdrew before the 2022 revision',
    founded: '',
    holdings: 'Around seven hectares on the limestone côte directly below the town of Saint-Émilion, with cellars cut into the rock; named for the Roman poet Ausonius.',
    style: 'Cold, mineral and tightly wound: crushed stone, blood orange and dark spice, the most austere of the great Right Bank wines.',
    t: 'Crushed limestone and blood orange: the coldest wine on the côte',
    why: 'The limestone counterweight to gravel-grown Cheval Blanc, and one of the three A estates that walked away from the 2022 classification.',
    wines: [
      { n: 'Château Ausone', grape: 'Cabernet Franc and Merlot', note: 'The reference for limestone côte Saint-Émilion' },
      { n: 'Chapelle d\'Ausone', grape: 'Cabernet Franc and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Ausone is limestone côte; Cheval Blanc is gravel. They are not stylistic twins',
      'Ausone, Cheval Blanc and Angélus all withdrew before the 2022 revision'
    ]
  },
  {
    id: 'p-ch-beychevelle', p: 'Château Beychevelle',
    country: 'France, Bordeaux and the South West', r: 'Saint-Julien', sub: 'Quatrième Cru Classé (1855)',
    founded: '',
    holdings: 'A riverside estate at the southern entrance to Saint-Julien, its gravel running down toward the Gironde.',
    style: 'Supple and perfumed: red fruit, violets and soft cedar, one of the earlier-drinking classed growths.',
    t: 'Violets and soft cedar under a dragon-prowed ship',
    why: 'The ship on the label carries the baisse-voile legend, that vessels lowered their sails passing the Admiral of France\'s château. It is the commune\'s most quoted label story.',
    wines: [
      { n: 'Château Beychevelle', grape: 'Cabernet Sauvignon and Merlot with Petit Verdot', note: 'The fourth growth with the most recognisable label in Asia' },
      { n: 'Amiral de Beychevelle', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Beychevelle is a fourth growth, not a second, despite its price and fame',
      'The ship label is Beychevelle; the dragon boat is not a Pomerol or Saint-Émilion device'
    ]
  },
  {
    id: 'p-ch-brane-cantenac', p: 'Château Brane-Cantenac',
    country: 'France, Bordeaux and the South West', r: 'Margaux', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'A single plateau of deep gravel at Cantenac inside the Margaux appellation, run by the Lurton family.',
    style: 'Perfumed and finely boned: rose, red plum and cedar with light, dusty tannin, Margaux at its most fragrant.',
    t: 'Rose and red plum on dusty tannin: fragrant Cantenac gravel',
    why: 'Once owned by Baron Hector de Brane, called the Napoleon of the vines, who sold what is now Mouton. It also demonstrates that Cantenac and four other villages bottle as Margaux.',
    wines: [
      { n: 'Château Brane-Cantenac', grape: 'Cabernet Sauvignon and Merlot with Cabernet Franc', note: 'Second growth on the Cantenac plateau' },
      { n: 'Le Baron de Brane', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Cantenac, Soussans, Arsac and Labarde all bottle as AOC Margaux',
      'Brane-Cantenac is a second growth; Boyd-Cantenac and Cantenac-Brown are thirds'
    ]
  },
  {
    id: 'p-ch-calon-segur', p: 'Château Calon-Ségur',
    country: 'France, Bordeaux and the South West', r: 'Saint-Estèphe', sub: 'Troisième Cru Classé (1855)',
    founded: '',
    holdings: 'The northernmost classed growth of the Médoc, a walled block around the village of Saint-Estèphe on clay-rich gravel.',
    style: 'Firm, dark-fruited and old-fashioned in the best sense: blackcurrant, damp earth and a dry, savoury finish.',
    t: 'A heart on the label, dark earth in the glass: the Médoc\'s northern edge',
    why: 'Named for the Marquis de Ségur, who owned Lafite and Latour and said his heart was at Calon. The heart on the label is one of the few visual cues examiners use directly.',
    wines: [
      { n: 'Château Calon-Ségur', grape: 'Cabernet Sauvignon and Merlot with Cabernet Franc and Petit Verdot', note: 'The third growth that anchors the north of the Médoc' },
      { n: 'Le Marquis de Calon-Ségur', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'The heart on the label belongs to Calon-Ségur, a third growth, not to a first growth',
      'It is the northernmost 1855 classed growth of the Médoc'
    ]
  },
  {
    id: 'p-ch-canon', p: 'Château Canon',
    country: 'France, Bordeaux and the South West', r: 'Saint-Émilion', sub: 'Premier Grand Cru Classé B',
    founded: '',
    holdings: 'A walled vineyard on the limestone plateau just west of the town, with quarry cellars beneath; bought by the Wertheimer family of Chanel in 1996, who also own Rauzan-Ségla.',
    style: 'Chalky and precise: red cherry, orange peel and fine dry tannin, with the salty lift that limestone gives.',
    t: 'Red cherry, orange peel, chalk dust: the plateau in a glass',
    why: 'The teaching wine for limestone plateau Saint-Émilion, and a reminder that the B rank holds most of the appellation\'s serious names.',
    wines: [
      { n: 'Château Canon', grape: 'Merlot with Cabernet Franc', note: 'The clearest statement of the Saint-Émilion limestone plateau' },
      { n: 'Clos Canon', grape: 'Merlot and Cabernet Franc', note: 'The second wine' }
    ],
    traps: [
      'Château Canon is not Canon-la-Gaffelière, a different estate under different ownership',
      'Premier Grand Cru Classé B is a rank; Saint-Émilion Grand Cru on its own is an appellation, not a classification'
    ]
  },
  {
    id: 'p-ch-chasse-spleen', p: 'Château Chasse-Spleen',
    country: 'France, Bordeaux and the South West', r: 'Moulis-en-Médoc', sub: '',
    founded: '',
    holdings: 'Gravel and clay parcels in Moulis, the smallest of the Médoc\'s six communal appellations.',
    style: 'Sturdy, savoury and dry-finishing: blackberry, earth and tobacco, built for the table rather than the auction.',
    t: 'Blackberry, earth and tobacco: the Médoc\'s best-value claret',
    why: 'The usual answer when an examiner asks for a leading estate in Moulis. The Cru Bourgeois category, reorganised after the 2003 list was annulled, is a revisable classification that several leading Médoc estates, this one among them, have declined to enter.',
    wines: [
      { n: 'Château Chasse-Spleen', grape: 'Cabernet Sauvignon and Merlot with Petit Verdot', note: 'The reference name for Moulis and for the Cru Bourgeois tier' }
    ],
    traps: [
      'Moulis and Listrac are communal Médoc appellations with no 1855 classed growths',
      'Cru Bourgeois is a separate, revisable classification, not part of 1855'
    ]
  },
  {
    id: 'p-ch-cheval-blanc', p: 'Château Cheval Blanc',
    country: 'France, Bordeaux and the South West', r: 'Saint-Émilion', sub: 'Premier Grand Cru Classé A until it withdrew before the 2022 revision',
    founded: '',
    holdings: 'Around forty hectares of gravel, sand and clay in the far north west of Saint-Émilion, hard against Pomerol; the land was separated from Figeac in 1832.',
    style: 'Exotic and floral rather than stony: violets, red plum, sweet spice and satin tannin, softer and more open than Ausone.',
    t: 'Floral, exotic spice, satin tannin: Cabernet Franc\'s world summit',
    why: 'The estate that breaks two Right Bank rules at once: gravel soil where limestone is expected, and Cabernet Franc where Merlot is expected. Its 2022 withdrawal is the live classification question.',
    wines: [
      { n: 'Château Cheval Blanc', grape: 'Cabernet Franc and Merlot in near-equal parts', note: 'The high-water mark for Cabernet Franc anywhere' },
      { n: 'Le Petit Cheval', grape: 'Cabernet Franc and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Cheval Blanc was carved out of Figeac land in 1832: they are neighbours, not one estate',
      'It withdrew from the classification ahead of the 2022 revision, along with Ausone and Angélus',
      'Its gravel soils are shared with Figeac and are not typical of Saint-Émilion'
    ]
  },
  {
    id: 'p-ch-climens', p: 'Château Climens',
    country: 'France, Bordeaux and the South West', r: 'Barsac', sub: 'Premier Cru Classé (1855)',
    founded: '',
    holdings: 'A single plateau of red sand over limestone in Barsac, planted entirely to Sémillon, vinified parcel by parcel and assembled late.',
    style: 'Weightless for its sweetness: lemon curd, quince and ginger on a knife-edge of acidity, the most delicate great Sauternes.',
    t: 'Lemon curd and quince on a wire: Barsac\'s weightless sweetness',
    why: 'Called the Lord of Barsac. Its single-variety planting is the cleanest way to show that Sauvignon Blanc is optional in a Sauternes blend, not required.',
    wines: [
      { n: 'Château Climens', grape: 'Sémillon', note: 'All Sémillon, unusual even in Barsac' },
      { n: 'Cyprès de Climens', grape: 'Sémillon', note: 'The second wine' }
    ],
    traps: [
      'Barsac wines may be labelled Barsac or Sauternes; the reverse is not true',
      'Climens is all Sémillon, so no Sauvignon Blanc at all'
    ]
  },
  {
    id: 'p-ch-cos-destournel', p: 'Château Cos d\'Estournel',
    country: 'France, Bordeaux and the South West', r: 'Saint-Estèphe', sub: 'Deuxième Cru Classé (1855)',
    founded: 'early 19th century',
    holdings: 'A gravel ridge at the southern edge of Saint-Estèphe, looking straight across at Lafite in Pauillac; the pagoda-topped chai was built by Louis Gaspard d\'Estournel, who traded wine to India.',
    style: 'The most exotic Saint-Estèphe: dark spice, sandalwood and black fruit, richer and more polished than the commune\'s usual austerity.',
    t: 'Sandalwood and dark spice under pagoda roofs: Saint-Estèphe gone east',
    why: 'With Montrose it carries a commune that the 1855 list gave no first growth. The nickname Maharajah of Saint-Estèphe and the Indian trade story are stock colour.',
    wines: [
      { n: 'Château Cos d\'Estournel', grape: 'Cabernet Sauvignon and Merlot', note: 'The leading estate of a commune with no first growth' },
      { n: 'Les Pagodes de Cos', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' },
      { n: 'Cos d\'Estournel Blanc', grape: 'Sauvignon Blanc and Sémillon', note: 'AOC Bordeaux Blanc, since Saint-Estèphe is red only' }
    ],
    traps: [
      'Cos d\'Estournel is not the same as Cos Labory, a fifth growth in the same commune',
      'Saint-Estèphe has no first growth at all'
    ]
  },
  {
    id: 'p-ch-coutet', p: 'Château Coutet',
    country: 'France, Bordeaux and the South West', r: 'Barsac', sub: 'Premier Cru Classé (1855)',
    founded: '',
    holdings: 'The largest classed-growth vineyard in Barsac, on limestone with a long underground cellar; in exceptional years a tiny selection is bottled as Cuvée Madame.',
    style: 'The taut Barsac: lime, white flowers and a cutting mineral finish, less unctuous and more nervy than a Sauternes from the hills.',
    t: 'Lime, white flower and a steel edge: Barsac at its most nervy',
    why: 'Paired with Climens as the two Barsac premiers crus. Coutet also illustrates the rule that Barsac sits inside the Sauternes zone and may use either name.',
    wines: [
      { n: 'Château Coutet', grape: 'Sémillon with Sauvignon Blanc and Muscadelle', note: 'A Barsac premier cru of famous vivacity' },
      { n: 'Cuvée Madame', grape: 'Sémillon', note: 'A rare selection made only in outstanding years' }
    ],
    traps: [
      'Barsac is one of the five communes entitled to the Sauternes appellation',
      'Cuvée Madame is not made every year'
    ]
  },
  {
    id: 'p-ch-daydie', p: 'Château d\'Aydie',
    country: 'France, Bordeaux and the South West', r: 'Madiran', sub: 'Also Pacherenc du Vic-Bilh',
    founded: '',
    holdings: 'A family estate run by the Laplace family, long-standing growers in the appellation and among the first to bottle their own Madiran.',
    style: 'Pure Tannat of dark, savoury intensity: blackberry, leather and iron, structured but built for the table.',
    t: 'Blackberry, leather and iron: Tannat as the Béarn drinks it',
    why: 'A second Madiran voice to set against Montus, and its fortified red shows that Tannat is not only a dry table wine.',
    wines: [
      { n: 'Château d\'Aydie', grape: 'Tannat', note: 'The estate\'s benchmark Madiran, all Tannat' },
      { n: 'Maydie', grape: 'Tannat', note: 'A fortified sweet red in the vin doux naturel manner' }
    ],
    traps: [
      'Madiran may legally include Cabernet Franc and Cabernet Sauvignon alongside Tannat',
      'Tannat\'s other home is Uruguay, where it is the national red grape'
    ]
  },
  {
    id: 'p-ch-dyquem', p: 'Château d\'Yquem',
    country: 'France, Bordeaux and the South West', r: 'Sauternes', sub: 'Premier Cru Supérieur (1855), alone in its rank',
    founded: '',
    holdings: 'A large hilltop estate in the commune of Sauternes, long held by the Lur-Saluces family and owned by LVMH since 1999; picked in repeated passes for botrytised berries.',
    style: 'Saffron, apricot, barley sugar and orange marmalade held together by acidity that carries the wine for a century.',
    t: 'Saffron, apricot, crème brûlée riding electric acidity for a century',
    why: 'The single estate given its own rank in 1855, and the standard example of a producer declining to release in poor years, among them 1972, 1974, 1992 and 2012.',
    wines: [
      { n: 'Château d\'Yquem', grape: 'Sémillon with Sauvignon Blanc', note: 'The only Premier Cru Supérieur in the 1855 Sauternes classification' },
      { n: 'Y (Ygrec) du Château d\'Yquem', grape: 'Sauvignon Blanc and Sémillon', note: 'The dry wine, labelled AOC Bordeaux Blanc' }
    ],
    traps: [
      'Premier Cru Supérieur is Yquem alone; the eleven below it are Premiers Crus',
      'Y is dry and sold as Bordeaux Blanc, not as Sauternes',
      'Yquem does not declare a wine in every vintage'
    ]
  },
  {
    id: 'p-ch-du-cedre', p: 'Château du Cèdre',
    country: 'France, Bordeaux and the South West', r: 'Cahors', sub: 'Vire-sur-Lot',
    founded: '',
    holdings: 'Parcels on the high limestone causse and the gravel terraces of the Lot valley, worked by the Verhaeghe brothers.',
    style: 'Dark, dense Malbec with real polish: black plum, violet, cocoa and firm but ripe tannin.',
    t: 'Black plum, violet and cocoa: the black wine of Cahors made modern',
    why: 'The standard reference for modern Cahors. Cahors requires at least seventy per cent Malbec, known locally as Côt or Auxerrois, and is red only.',
    wines: [
      { n: 'Le Cèdre', grape: 'Malbec', note: 'The estate\'s top Cahors, from old vines with extended oak ageing' },
      { n: 'Château du Cèdre', grape: 'Malbec with Merlot and Tannat', note: 'The classic bottling and a good model of the appellation minimum' }
    ],
    traps: [
      'Cahors is red only and Malbec-based, not a Bordeaux blend',
      'Auxerrois in Cahors means Malbec; in Alsace it means a white grape related to Pinot Blanc',
      'Côt is a synonym for Malbec, not a separate variety'
    ]
  },
  {
    id: 'p-ch-ducru-beaucaillou', p: 'Château Ducru-Beaucaillou',
    country: 'France, Bordeaux and the South West', r: 'Saint-Julien', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'A riverside gravel slope in Saint-Julien named for its beaux cailloux, the large stones of the croupe; held by the Borie family.',
    style: 'Elegance and restraint: red and black currant, fine cedar, polished tannin and a quiet, long finish rather than power.',
    t: 'Polished currant and cedar over big river stones: Saint-Julien\'s poise',
    why: 'The commune\'s stylistic reference point and a staple super-second. Its name is also the easiest way to make a candidate explain what a croupe of gravel does.',
    wines: [
      { n: 'Château Ducru-Beaucaillou', grape: 'Cabernet Sauvignon led with Merlot', note: 'The most refined expression of Saint-Julien' },
      { n: 'La Croix Ducru-Beaucaillou', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Beaucaillou means beautiful stones and refers to the gravel, not a separate vineyard',
      'Do not confuse the estate with Branaire-Ducru, a fourth growth in the same commune'
    ]
  },
  {
    id: 'p-ch-figeac', p: 'Château Figeac',
    country: 'France, Bordeaux and the South West', r: 'Saint-Émilion', sub: 'Premier Grand Cru Classé A (promoted 2022)',
    founded: '',
    holdings: 'Around forty hectares on the same gravel rise as Cheval Blanc in the north west of the appellation; the Cheval Blanc vineyard was sold out of Figeac in 1832.',
    style: 'Cool, cedary and structured: blackcurrant leaf, graphite and tobacco, closer to a Médoc classed growth than to plateau Merlot.',
    t: 'Blackcurrant leaf and graphite: the Médoc accent on Right Bank gravel',
    why: 'Promoted to Premier Grand Cru Classé A in 2022. Its one third Cabernet Sauvignon is the single most useful fact for separating it from every other Saint-Émilion.',
    wines: [
      { n: 'Château Figeac', grape: 'Roughly a third each Cabernet Sauvignon, Cabernet Franc and Merlot', note: 'The only major Saint-Émilion with that much Cabernet Sauvignon' },
      { n: 'Petit-Figeac', grape: 'Cabernet Sauvignon, Cabernet Franc, Merlot', note: 'The second wine' }
    ],
    traps: [
      'Figeac and Cheval Blanc share gravel and a history but are different estates',
      'Figeac is the Right Bank estate with a major Cabernet Sauvignon share',
      'Figeac joined the A rank only in 2022, alongside Pavie'
    ]
  },
  {
    id: 'p-ch-grand-puy-lacoste', p: 'Château Grand-Puy-Lacoste',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Cinquième Cru Classé (1855)',
    founded: '',
    holdings: 'A single block on a gravel rise inland from the river in Pauillac, run by the Borie family.',
    style: 'Pure, unfussy, Cabernet-dominant Pauillac: cassis and graphite with no cosmetic oak, a classicist\'s benchmark.',
    t: 'Cassis and graphite with nothing added: Pauillac in plain speech',
    why: 'Cited as the model of honest classical Pauillac and paired with Grand-Puy-Ducasse, a separate fifth growth, to test whether a candidate hears the difference in the name.',
    wines: [
      { n: 'Château Grand-Puy-Lacoste', grape: 'Cabernet Sauvignon dominant with Merlot', note: 'The reference for traditional, undressed Pauillac' },
      { n: 'Lacoste-Borie', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Grand-Puy-Lacoste and Grand-Puy-Ducasse are two different fifth growths',
      'Grand-Puy-Lacoste and Ducru-Beaucaillou are both Borie family properties, but they are held separately by different members of the family'
    ]
  },
  {
    id: 'p-ch-gruaud-larose', p: 'Château Gruaud Larose',
    country: 'France, Bordeaux and the South West', r: 'Saint-Julien', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'One of the largest single blocks in Saint-Julien, set back from the river on gravel over clay.',
    style: 'Broad, sweet-fruited and sturdy: dark plum, liquorice and tobacco with a more rustic grain than Ducru.',
    t: 'Plum, liquorice and tobacco: the broad-shouldered Saint-Julien',
    why: 'A second growth carrying the old motto le roi des vins, le vin des rois, and part of the block of five second growths that gives Saint-Julien its unusual density of rank.',
    wines: [
      { n: 'Château Gruaud Larose', grape: 'Cabernet Sauvignon and Merlot with Cabernet Franc and Petit Verdot', note: 'The historic volume leader among Saint-Julien seconds' },
      { n: 'Sarget de Gruaud Larose', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Saint-Julien holds five second growths and no first growth',
      'Gruaud Larose is one estate, not two, despite the double name'
    ]
  },
  {
    id: 'p-ch-guiraud', p: 'Château Guiraud',
    country: 'France, Bordeaux and the South West', r: 'Sauternes', sub: 'Premier Cru Classé (1855)',
    founded: '',
    holdings: 'A large certified organic estate in the commune of Sauternes with an unusually high proportion of Sauvignon Blanc for a premier cru.',
    style: 'Fresher and more citrus-driven than its neighbours: grapefruit, orange blossom and honey with a dry, clean finish.',
    t: 'Grapefruit, orange blossom and honey: the freshest of the premiers',
    why: 'The organic reference in Sauternes and the estate that shows how much Sauvignon Blanc a premier cru blend may legitimately carry.',
    wines: [
      { n: 'Château Guiraud', grape: 'Sémillon with a large share of Sauvignon Blanc', note: 'The first classed growth in Sauternes to gain organic certification' },
      { n: 'G de Château Guiraud', grape: 'Sauvignon Blanc and Sémillon', note: 'The dry white, AOC Bordeaux Blanc' }
    ],
    traps: [
      'Sauternes blends vary widely in Sauvignon Blanc: there is no fixed recipe',
      'Every dry wine made in the Sauternes zone must be labelled Bordeaux Blanc'
    ]
  },
  {
    id: 'p-ch-haut-bailly', p: 'Château Haut-Bailly',
    country: 'France, Bordeaux and the South West', r: 'Pessac-Léognan', sub: 'Cru Classé de Graves (1959), red only',
    founded: '',
    holdings: 'Gravel over sandstone at Léognan, including an old parcel of mixed varieties planted around the turn of the twentieth century and never replanted.',
    style: 'Silky, red-fruited and understated: raspberry, cool earth and fine tannin, the least oaky of the Pessac classed growths.',
    t: 'Raspberry and cool earth on velvet: the gentlest cru of Léognan',
    why: 'A 1959 classed growth for red alone, which makes it the stock example that the Graves classification rules separately on each colour.',
    wines: [
      { n: 'Château Haut-Bailly', grape: 'Cabernet Sauvignon and Merlot with Cabernet Franc', note: 'Red only; the estate makes no classified white' },
      { n: 'Haut-Bailly II', grape: 'Merlot and Cabernet Sauvignon', note: 'The second wine, formerly La Parde de Haut-Bailly' }
    ],
    traps: [
      'Haut-Bailly is classified for red only',
      'Its old parcel is a field blend of several varieties, not a single-variety planting'
    ]
  },
  {
    id: 'p-ch-haut-brion', p: 'Château Haut-Brion',
    country: 'France, Bordeaux and the South West', r: 'Pessac-Léognan', sub: 'Premier Cru Classé (1855) and Cru Classé de Graves (1959)',
    founded: '1533',
    holdings: 'Gravel mounds now inside the suburbs of Pessac, held by Domaine Clarence Dillon since 1935; the same owner holds La Mission Haut-Brion across the road and Quintus in Saint-Émilion.',
    style: 'Smoke, warm gravel, tobacco and scorched earth over red fruit: earthier and more savoury than the Médoc Firsts, and quicker to open.',
    t: 'Warm gravel, tobacco, woodsmoke: the First that smells of its city',
    why: 'The exception that proves the 1855 list. It is a Graves property included in a Médoc classification, and it appears again in the 1959 Graves classification, for red only: Haut-Brion Blanc carries no classification.',
    wines: [
      { n: 'Château Haut-Brion', grape: 'Merlot, Cabernet Sauvignon, Cabernet Franc', note: 'The only 1855 classed growth outside the Médoc' },
      { n: 'Château Haut-Brion Blanc', grape: 'Sémillon and Sauvignon Blanc', note: 'One of the rarest and most expensive dry whites in Bordeaux' },
      { n: 'Le Clarence de Haut-Brion', grape: 'Merlot and Cabernet Sauvignon', note: 'Second wine, called Bahans Haut-Brion until the 2007 vintage' }
    ],
    traps: [
      'Haut-Brion is in Pessac-Léognan, not the Médoc, despite its 1855 rank',
      'It is classified twice: 1855 and 1959',
      'Do not confuse it with La Mission Haut-Brion, a separate estate across the road under the same ownership'
    ]
  },
  {
    id: 'p-ch-leglise-clinet', p: 'Château L\'Église-Clinet',
    country: 'France, Bordeaux and the South West', r: 'Pomerol', sub: 'Unclassified',
    founded: '',
    holdings: 'Under six hectares beside the church of Pomerol, including old vines that survived the 1956 frost when much of the appellation was replanted, built up by Denis Durantou.',
    style: 'Concentrated but lifted: dark cherry, graphite and spice with unusually fresh acidity for Pomerol.',
    t: 'Dark cherry, graphite and spice: old vines the great frost missed',
    why: 'The February 1956 frost is the pivot of modern Right Bank history, and this estate is the usual example of what survived it.',
    wines: [
      { n: 'Château L\'Église-Clinet', grape: 'Merlot with a significant share of Cabernet Franc', note: 'Old pre-1956 vines in the heart of the appellation' },
      { n: 'La Petite Église', grape: 'Merlot and Cabernet Franc', note: 'The second label' }
    ],
    traps: [
      'The 1956 frost devastated Pomerol and Saint-Émilion and forced mass replanting',
      'Clos L\'Eglise, L\'Eglise-Clinet and Domaine de l\'Eglise are three different Pomerol properties'
    ]
  },
  {
    id: 'p-ch-la-conseillante', p: 'Château La Conseillante',
    country: 'France, Bordeaux and the South West', r: 'Pomerol', sub: 'Unclassified',
    founded: '',
    holdings: 'A block on the eastern edge of Pomerol running to the Saint-Émilion boundary, close to Cheval Blanc and L\'Evangile, held by the Nicolas family since 1871.',
    style: 'The perfumed one: violets, raspberry and liquorice on silk, the lightest-footed of the top Pomerols.',
    t: 'Violets and raspberry on silk: the most scented address in Pomerol',
    why: 'Its position on the Saint-Émilion border makes it the natural wine for discussing where one appellation stops and the other starts.',
    wines: [
      { n: 'Château La Conseillante', grape: 'Merlot with Cabernet Franc', note: 'The estate most often used to demonstrate Pomerol perfume' }
    ],
    traps: [
      'The Pomerol and Saint-Émilion boundary is administrative; the soils run straight across it',
      'La Conseillante is Pomerol, not Saint-Émilion, despite bordering Cheval Blanc'
    ]
  },
  {
    id: 'p-ch-la-lagune', p: 'Château La Lagune',
    country: 'France, Bordeaux and the South West', r: 'Haut-Médoc', sub: 'Troisième Cru Classé (1855)',
    founded: '',
    holdings: 'At Ludon, the southernmost classed growth of the Médoc and the nearest to the city of Bordeaux, on sandy gravel.',
    style: 'Sweetly spiced and supple: dark cherry, vanilla and a soft, quick-opening frame.',
    t: 'Dark cherry and warm spice: the classed growth closest to the city',
    why: 'One of only five 1855 classed growths that carry the Haut-Médoc appellation rather than a commune AOC, which is the point examiners are testing.',
    wines: [
      { n: 'Château La Lagune', grape: 'Cabernet Sauvignon and Merlot with Petit Verdot', note: 'A third growth outside the four famous communes' },
      { n: 'Moulin de La Lagune', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'La Lagune is AOC Haut-Médoc, not Margaux or Saint-Julien',
      'The other classed growths in Haut-Médoc are Cantemerle, Belgrave, de Camensac and La Tour Carnet'
    ]
  },
  {
    id: 'p-ch-la-mission-haut-brion', p: 'Château La Mission Haut-Brion',
    country: 'France, Bordeaux and the South West', r: 'Pessac-Léognan', sub: 'Cru Classé de Graves (1959) for red; the white classified in 1959 as Château Laville Haut-Brion',
    founded: '',
    holdings: 'Gravel on the far side of the road from Haut-Brion, bought by the Dillon family in 1983 from the Woltners; the neighbouring Laville Haut-Brion and La Tour Haut-Brion have since been folded in.',
    style: 'Darker, smokier and more tarry than Haut-Brion: hot stones, roasted coffee and iron, with tannin that takes longer to settle.',
    t: 'Tar, hot stone and roast coffee: Pessac at its darkest',
    why: 'Classified in 1959 for red and white but never in 1855, it is the standard test of whether a candidate knows the two Graves classifications are separate events.',
    wines: [
      { n: 'Château La Mission Haut-Brion', grape: 'Merlot and Cabernet Sauvignon with Cabernet Franc', note: 'The most serious rival to Haut-Brion inside its own appellation' },
      { n: 'Château La Mission Haut-Brion Blanc', grape: 'Sémillon and Sauvignon Blanc', note: 'The former Château Laville Haut-Brion, renamed from the 2009 vintage' },
      { n: 'La Chapelle de La Mission Haut-Brion', grape: 'Merlot and Cabernet Sauvignon', note: 'The second wine' }
    ],
    traps: [
      'La Mission Haut-Brion is a Graves cru classé, never an 1855 growth',
      'Laville Haut-Brion no longer exists as a label: it is now La Mission Haut-Brion Blanc'
    ]
  },
  {
    id: 'p-ch-lafite-rothschild', p: 'Château Lafite Rothschild',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Premier Cru Classé (1855)',
    founded: '',
    holdings: 'Gravel rises in northern Pauillac running to the Saint-Estèphe boundary, bought by Baron James de Rothschild in 1868; the same family owns Duhart-Milon, Rieussec in Sauternes and L\'Evangile in Pomerol.',
    style: 'The most reserved and perfumed of the Firsts: cedar, graphite and pencil shavings over restrained cassis, built on finesse rather than weight.',
    t: 'Cedar, graphite, cassis: the most perfumed and aristocratic First',
    why: 'One of the four original 1855 First Growths and the most frequently confused with its second wine. Its Sauternes and Pomerol holdings make it a useful thread across all three banks.',
    wines: [
      { n: 'Château Lafite Rothschild', grape: 'Cabernet Sauvignon with Merlot, Cabernet Franc, Petit Verdot', note: 'The grand vin, the benchmark for aristocratic Pauillac' },
      { n: 'Carruades de Lafite', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine, named for the Carruades plateau parcels' }
    ],
    traps: [
      'Carruades de Lafite is the second wine, not the grand vin',
      'Lafite owns Duhart-Milon (Pauillac fourth growth), Rieussec (Sauternes premier cru) and L\'Evangile (Pomerol)'
    ]
  },
  {
    id: 'p-ch-lafleur', p: 'Château Lafleur',
    country: 'France, Bordeaux and the South West', r: 'Pomerol', sub: 'Unclassified',
    founded: '',
    holdings: 'Under five hectares of gravel and clay near Pétrus, farmed by the Guinaudeau family, planted to roughly half Cabernet Franc, called Bouchet locally.',
    style: 'Wild, floral and mineral: violets, redcurrant and iron on a tight, almost severe frame that needs many years.',
    t: 'Violet, redcurrant and iron: the wildest few hectares in Pomerol',
    why: 'A tiny unclassified estate held up against Pétrus to show how varied the plateau is, and the clearest Pomerol case of Cabernet Franc leading the aromatics.',
    wines: [
      { n: 'Château Lafleur', grape: 'Merlot and Cabernet Franc in near-equal parts', note: 'The most Cabernet Franc-driven of the great Pomerols' },
      { n: 'Pensées de Lafleur', grape: 'Merlot and Cabernet Franc', note: 'The second wine' }
    ],
    traps: [
      'Bouchet is the local name for Cabernet Franc on the Right Bank',
      'Lafleur is not related to La Fleur-Pétrus, a separate Moueix property'
    ]
  },
  {
    id: 'p-ch-latour', p: 'Château Latour',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Premier Cru Classé (1855)',
    founded: '',
    holdings: 'The core is L\'Enclos, the walled block of deep gravel beside the Gironde in southern Pauillac at the Saint-Julien border; fruit from outside the Enclos goes to the second and third wines.',
    style: 'The most structured First: dense, iron-bound, austere in youth and famous for holding its shape in weak vintages.',
    t: 'Iron-fisted, dense, immortal: decades before it unclenches',
    why: 'A First Growth that withdrew from the en primeur system with the 2012 vintage and now releases only when it judges the wines ready. That decision is a standing question on Bordeaux commerce.',
    wines: [
      { n: 'Château Latour', grape: 'Cabernet Sauvignon led, with Merlot, Cabernet Franc, Petit Verdot', note: 'Grand vin, drawn from the Enclos' },
      { n: 'Les Forts de Latour', grape: 'Cabernet Sauvignon and Merlot', note: 'Second wine, first released with the 1966 vintage' },
      { n: 'Pauillac de Latour', grape: 'Cabernet Sauvignon and Merlot', note: 'The third wine, labelled simply by commune' }
    ],
    traps: [
      'Latour left en primeur from the 2012 vintage and releases on its own schedule',
      'Les Forts de Latour is the second wine; Pauillac de Latour is the third',
      'Château Latour is Pauillac and unrelated to Latour-Martillac in Pessac-Léognan or La Tour Carnet in the Haut-Médoc'
    ]
  },
  {
    id: 'p-ch-le-tertre-roteboeuf', p: 'Château Le Tertre Roteboeuf',
    country: 'France, Bordeaux and the South West', r: 'Saint-Émilion', sub: 'Saint-Émilion Grand Cru, unclassified by choice',
    founded: '',
    holdings: 'About six hectares on a steep south-facing slope at Saint-Laurent-des-Combes, worked by François Mitjavile, who picks very late and uses no second wine.',
    style: 'Extravagantly ripe yet lifted: kirsch, blood orange, incense and sweet spice, unmistakable in a blind flight.',
    t: 'Kirsch, blood orange and incense: the slope that answers to nobody',
    why: 'An estate that has never submitted to the Saint-Émilion classification, which makes it the clean illustration that entry is voluntary and must be applied for.',
    wines: [
      { n: 'Château Le Tertre Roteboeuf', grape: 'Merlot with Cabernet Franc', note: 'Made by late picking and long élevage, outside the classification entirely' }
    ],
    traps: [
      'Classification in Saint-Émilion is applied for, not automatic',
      'Saint-Émilion Grand Cru on the label is an appellation, not a classification rank'
    ]
  },
  {
    id: 'p-ch-leoville-barton', p: 'Château Léoville Barton',
    country: 'France, Bordeaux and the South West', r: 'Saint-Julien', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'A share of the divided Léoville estate held by the Barton family, an Irish merchant line in Bordeaux since the 18th century; the wine is made at Langoa Barton, since Léoville Barton owns no château of its own.',
    style: 'Classical and unmodernised: firm Cabernet structure, cedar and blackcurrant leaf, never dressed in new oak.',
    t: 'Cedar and blackcurrant leaf, unvarnished: claret as the Bartons kept it',
    why: 'A second growth with no building of its own, vinified at Langoa Barton, a third growth under the same family. That arrangement is a favourite detail question.',
    wines: [
      { n: 'Château Léoville Barton', grape: 'Cabernet Sauvignon led with Merlot and Cabernet Franc', note: 'Second growth made at a third growth\'s cellar' },
      { n: 'La Réserve de Léoville Barton', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Léoville Barton is a second growth, Langoa Barton a third, both Barton-owned and made in the same cellar',
      'Léoville Barton has no château; the label image belongs to Langoa'
    ]
  },
  {
    id: 'p-ch-leoville-las-cases', p: 'Château Léoville Las Cases',
    country: 'France, Bordeaux and the South West', r: 'Saint-Julien', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'The largest of the three Léovilles, built around the walled Grand Clos on the Saint-Julien boundary with Pauillac, its gate crowned by a lion; run by the Delon family.',
    style: 'The most Pauillac-like Saint-Julien: tight, cold and Cabernet-severe in youth, needing many years to release its cassis and cedar.',
    t: 'Cold cassis behind a lion gate: Saint-Julien with Pauillac\'s spine',
    why: 'The definitive super-second, and the source of the sharpest second-wine trap in the Médoc: Clos du Marquis is a distinct wine, while Le Petit Lion is the true second label.',
    wines: [
      { n: 'Château Léoville Las Cases', grape: 'Cabernet Sauvignon dominant with Merlot and Cabernet Franc', note: 'The archetypal super-second, from the walled Grand Clos' },
      { n: 'Le Petit Lion du Marquis de Las Cases', grape: 'Cabernet Sauvignon and Merlot', note: 'The actual second wine of the estate' },
      { n: 'Clos du Marquis', grape: 'Cabernet Sauvignon and Merlot', note: 'A separate Saint-Julien wine from its own vineyard, not a second label' }
    ],
    traps: [
      'Clos du Marquis is not the second wine of Las Cases; Le Petit Lion is',
      'Three separate estates carry the Léoville name: Las Cases, Poyferré and Barton, all second growths',
      'The Grand Clos abuts Latour, but the wine is Saint-Julien'
    ]
  },
  {
    id: 'p-ch-leoville-poyferre', p: 'Château Léoville Poyferré',
    country: 'France, Bordeaux and the South West', r: 'Saint-Julien', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'The third fragment of the old Léoville estate, on gravel in the north of Saint-Julien, held by the Cuvelier family.',
    style: 'The plushest of the three Léovilles: riper fruit, sweeter oak and rounder tannin than Las Cases or Barton.',
    t: 'Ripe plum and sweet oak: the most modern of the three Léovilles',
    why: 'Completes the Léoville set. Being able to name all three, their ownerships and their contrasting styles is standard Saint-Julien work.',
    wines: [
      { n: 'Château Léoville Poyferré', grape: 'Cabernet Sauvignon and Merlot with Petit Verdot', note: 'The modern-styled Léoville' },
      { n: 'Pavillon de Léoville Poyferré', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'All three Léovilles are second growths from one divided property',
      'Poyferré is the ripest in style, not the most classical'
    ]
  },
  {
    id: 'p-ch-lynch-bages', p: 'Château Lynch-Bages',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Cinquième Cru Classé (1855)',
    founded: '',
    holdings: 'The Bages plateau in southern Pauillac, run by the Cazes family since 1939, with a small white planting sold outside the Pauillac appellation.',
    style: 'Generous, sweet-fruited Pauillac: blackcurrant pastille, mint and cedar, approachable earlier than most classed growths.',
    t: 'Blackcurrant pastille, mint and cedar: Pauillac made welcoming',
    why: 'A fifth growth on almost every list, and a clean example of the white-wine labelling rule: a Pauillac estate must declassify its white to Bordeaux Blanc.',
    wines: [
      { n: 'Château Lynch-Bages', grape: 'Cabernet Sauvignon led with Merlot, Cabernet Franc, Petit Verdot', note: 'The most commercially familiar fifth growth' },
      { n: 'Blanc de Lynch-Bages', grape: 'Sauvignon Blanc, Sémillon, Muscadelle', note: 'Sold as AOC Bordeaux Blanc since Pauillac is a red-only appellation' }
    ],
    traps: [
      'Blanc de Lynch-Bages is Bordeaux Blanc, not Pauillac',
      'The name is Irish, from Thomas Lynch, not French'
    ]
  },
  {
    id: 'p-ch-margaux', p: 'Château Margaux',
    country: 'France, Bordeaux and the South West', r: 'Margaux', sub: 'Premier Cru Classé (1855)',
    founded: '',
    holdings: 'Gravel croupes in the commune of Margaux, with a white parcel of Sauvignon Blanc set apart for Pavillon Blanc.',
    style: 'Perfume before power: violets, rose and cool graphite carried on the silkiest tannin in the Médoc.',
    t: 'Violets and silk over hidden power, Bordeaux\'s perfume house',
    why: 'A First Growth whose white wine is the classic labelling trap: the Margaux appellation covers red only, so Pavillon Blanc must be declassified to Bordeaux Blanc.',
    wines: [
      { n: 'Château Margaux', grape: 'Cabernet Sauvignon led, with Merlot, Petit Verdot, Cabernet Franc', note: 'The grand vin, the reference for Margaux perfume' },
      { n: 'Pavillon Rouge du Château Margaux', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' },
      { n: 'Pavillon Blanc du Château Margaux', grape: 'Sauvignon Blanc', note: 'All Sauvignon Blanc, sold as AOC Bordeaux Blanc because the Margaux AOC is red only' }
    ],
    traps: [
      'Pavillon Blanc is AOC Bordeaux Blanc, not AOC Margaux',
      'Pavillon Rouge is the second wine',
      'Château Margaux the estate sits inside the commune and AOC of the same name'
    ]
  },
  {
    id: 'p-ch-montrose', p: 'Château Montrose',
    country: 'France, Bordeaux and the South West', r: 'Saint-Estèphe', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'A near-unbroken block of gravel over clay on a slope running down to the Gironde, one of the few classed growths with a genuine riverside exposure.',
    style: 'The sterner face of Saint-Estèphe: dense, tannic, mineral and slow, long compared with Latour for sheer structure.',
    t: 'Cold clay and iron: the slowest-opening wine in Saint-Estèphe',
    why: 'The second half of the Saint-Estèphe pair and the standard illustration of clay subsoil holding water in dry years, which is why the commune ripens later and tastes firmer.',
    wines: [
      { n: 'Château Montrose', grape: 'Cabernet Sauvignon led with Merlot and Petit Verdot', note: 'The commune\'s most structured wine, long-lived by design' },
      { n: 'La Dame de Montrose', grape: 'Merlot and Cabernet Sauvignon', note: 'The second wine' }
    ],
    traps: [
      'Montrose is Saint-Estèphe, not a Médoc first growth, despite the Latour comparison',
      'Do not confuse La Dame de Montrose, the second wine, with the grand vin'
    ]
  },
  {
    id: 'p-ch-montus', p: 'Château Montus',
    country: 'France, Bordeaux and the South West', r: 'Madiran', sub: 'Also Pacherenc du Vic-Bilh',
    founded: '',
    holdings: 'Gravel and clay hillsides bought by Alain Brumont from 1980, worked alongside his family property Château Bouscasse; both make red Madiran and white Pacherenc du Vic-Bilh.',
    style: 'Tannat at full strength: black fruit, graphite, smoke and massive tannin tamed by long ageing in new oak.',
    t: 'Graphite, smoke and black fruit under vast tannin: Tannat unbowed',
    why: 'The name that revived Madiran. Tannat\'s tannin also explains why micro-oxygenation was developed in this appellation in the 1990s.',
    wines: [
      { n: 'Château Montus Cuvée Prestige', grape: 'Tannat', note: 'Old-vine Tannat in new oak, the wine that made Madiran serious again' },
      { n: 'Château Montus Pacherenc du Vic-Bilh', grape: 'Petit Courbu, Petit Manseng, Gros Manseng', note: 'The white appellation that shares Madiran\'s ground' }
    ],
    traps: [
      'Madiran is red only; the white from the same vineyards is Pacherenc du Vic-Bilh',
      'Micro-oxygenation was developed in Madiran to soften Tannat',
      'Montus and Bouscasse are two estates under one owner'
    ]
  },
  {
    id: 'p-ch-mouton-rothschild', p: 'Château Mouton Rothschild',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Premier Cru Classé (promoted 1973)',
    founded: '',
    holdings: 'Bought by Nathaniel de Rothschild in 1853; the same house owns d\'Armailhac and Clerc Milon, both Pauillac fifth growths, and co-founded Opus One in Napa with Robert Mondavi.',
    style: 'The most opulent and overtly Cabernet of the Pauillac Firsts: cassis liqueur, cigar box and sweet new oak.',
    t: 'Cassis liqueur and cigar box: the 1855 list\'s only promotion',
    why: 'The single change ever made to the 1855 red classification, elevated in 1973 under Baron Philippe de Rothschild. The artist label series, begun with the 1945, is the other standard question.',
    wines: [
      { n: 'Château Mouton Rothschild', grape: 'Cabernet Sauvignon dominant, with Merlot and Cabernet Franc', note: 'Promoted from second to first growth in 1973' },
      { n: 'Le Petit Mouton de Mouton Rothschild', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' },
      { n: 'Aile d\'Argent', grape: 'Sauvignon Blanc and Sémillon', note: 'The dry white, sold as AOC Bordeaux Blanc' }
    ],
    traps: [
      '1973 is the only promotion in the 1855 red list; nothing has been demoted',
      'The motto changed at promotion from Premier ne puis, second ne daigne, Mouton suis to Premier je suis, second je fus, Mouton ne change',
      'Mouton Rothschild and Mouton Cadet are not the same thing: Cadet is a négociant brand'
    ]
  },
  {
    id: 'p-ch-palmer', p: 'Château Palmer',
    country: 'France, Bordeaux and the South West', r: 'Margaux', sub: 'Troisième Cru Classé (1855)',
    founded: '',
    holdings: 'Gravel croupes in Cantenac within the Margaux appellation, farmed biodynamically, with an unusually high share of Merlot for a Médoc classed growth.',
    style: 'Silken and exotic: violets, black cherry and incense, richer and rounder than most Margaux, with velvet rather than grip.',
    t: 'Violets, black cherry and incense: Margaux in velvet',
    why: 'Named for Major-General Charles Palmer, a British officer. It is the standard example of a classed growth whose Merlot share and market price both defy its 1855 rank.',
    wines: [
      { n: 'Château Palmer', grape: 'Roughly equal Cabernet Sauvignon and Merlot with Petit Verdot', note: 'The third growth priced and treated as a first' },
      { n: 'Alter Ego de Palmer', grape: 'Merlot and Cabernet Sauvignon', note: 'A second label framed as a different style, not a lesser selection' },
      { n: 'Historical XIXth Century Wine', grape: 'Bordeaux blend with added Syrah', note: 'A Vin de France recreating the old practice of hermitaging claret' }
    ],
    traps: [
      'Palmer is a third growth that trades above most seconds',
      'Its Historical XIXth Century Wine contains Syrah and is Vin de France, not Margaux'
    ]
  },
  {
    id: 'p-ch-pape-clement', p: 'Château Pape Clément',
    country: 'France, Bordeaux and the South West', r: 'Pessac-Léognan', sub: 'Cru Classé de Graves (1959), red only',
    founded: '',
    holdings: 'One of the oldest continuously worked vineyards in Bordeaux, now enclosed by the suburbs of Pessac, given to Bertrand de Got, the archbishop who became Pope Clement V.',
    style: 'Dense, warm and sweetly oaked: black fruit, roasted coffee and smoked stone, with a rich barrel-fermented white made alongside.',
    t: 'Roast coffee and smoked stone: the pope\'s vineyard inside the city',
    why: 'The oldest name in Graves and another red-only cru classé, useful for dating viticulture in Pessac to the early fourteenth century.',
    wines: [
      { n: 'Château Pape Clément Rouge', grape: 'Cabernet Sauvignon and Merlot', note: 'Classified for red in 1959' },
      { n: 'Château Pape Clément Blanc', grape: 'Sauvignon Blanc, Sémillon, Sauvignon Gris, Muscadelle', note: 'Highly regarded but outside the classification' }
    ],
    traps: [
      'Classified for red only, despite the reputation of its white',
      'The estate is in Pessac-Léognan and has no place in the 1855 list'
    ]
  },
  {
    id: 'p-ch-pavie', p: 'Château Pavie',
    country: 'France, Bordeaux and the South West', r: 'Saint-Émilion', sub: 'Premier Grand Cru Classé A',
    founded: '',
    holdings: 'A large south-facing sweep of the limestone côte and plateau south east of the town, bought by Gérard Perse in 1998.',
    style: 'Powerful and concentrated: black fruit, liquorice, chocolate and new oak, the wine at the centre of the ripeness debate.',
    t: 'Liquorice, chocolate and black fruit: power on the Saint-Émilion côte',
    why: 'One of only two estates ranked Premier Grand Cru Classé A in the 2022 revision, after the three previous A estates withdrew.',
    wines: [
      { n: 'Château Pavie', grape: 'Merlot with Cabernet Franc and Cabernet Sauvignon', note: 'Promoted to A in 2012 and retained A in 2022' }
    ],
    traps: [
      'The 2022 A list is Pavie and Figeac, not Ausone and Cheval Blanc',
      'Pavie, Pavie-Macquin and Pavie-Decesse are separate properties'
    ]
  },
  {
    id: 'p-ch-pichon-baron', p: 'Château Pichon Longueville Baron',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'The other half of the divided Pichon estate, on gravel facing Latour in southern Pauillac, run by AXA Millésimes since 1987.',
    style: 'The firmer, more Cabernet-driven Pichon: cassis, cedar and graphite with tight, classical tannin.',
    t: 'Graphite and cassis in a tight fist: the stern half of Pichon',
    why: 'Half of the classic divided second growth. Knowing which Pichon is Baron and which is Comtesse, and that both are Pauillac, is a routine question.',
    wines: [
      { n: 'Château Pichon Longueville Baron', grape: 'Cabernet Sauvignon led with Merlot', note: 'The more structured of the two Pichons' },
      { n: 'Les Griffons de Pichon Baron', grape: 'Cabernet Sauvignon and Merlot', note: 'A second label alongside Les Tourelles de Longueville' }
    ],
    traps: [
      'Baron is the Cabernet-firm one, Comtesse the Merlot-softer one',
      'Both Pichons are Pauillac second growths, not first growths'
    ]
  },
  {
    id: 'p-ch-pichon-comtesse', p: 'Château Pichon Longueville Comtesse de Lalande',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'Part of the original Pichon estate, split in the 19th century; a meaningful share of the vineyard lies physically within the commune of Saint-Julien yet is sold as Pauillac.',
    style: 'The softest and most floral Pauillac, carrying more Merlot than its neighbours: rose, redcurrant and cream over a Pauillac frame.',
    t: 'Rose petal and cream over Pauillac bone: the gentlest of the super-seconds',
    why: 'A textbook super-second and the standard example of a wine whose vineyard crosses a commune line. Examiners pair it against Pichon Baron to test the split of one estate into two.',
    wines: [
      { n: 'Château Pichon Longueville Comtesse de Lalande', grape: 'Cabernet Sauvignon and Merlot with Petit Verdot and Cabernet Franc', note: 'The reference for a softer, Merlot-inflected Pauillac' },
      { n: 'Réserve de la Comtesse', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Pichon Comtesse and Pichon Baron are separate estates from one divided property, both second growths, both Pauillac',
      'Vineyard land inside Saint-Julien is still bottled as Pauillac'
    ]
  },
  {
    id: 'p-ch-pontet-canet', p: 'Château Pontet-Canet',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Cinquième Cru Classé (1855)',
    founded: '',
    holdings: 'A large contiguous block of Pauillac gravel adjoining Mouton Rothschild, held by the Tesseron family and farmed biodynamically, with horses in the rows and some ageing in clay amphorae.',
    style: 'Dark, mineral and savoury rather than glossy: crushed stone, black fruit and a chalky grip that reads more like terroir than oak.',
    t: 'Crushed stone and black fruit: the biodynamic fifth that plays above rank',
    why: 'The first classed growth in the Médoc to convert fully to certified biodynamic farming, around 2010. It is the standing example that the 1855 ranking is a price list from 1855, not a quality guarantee now.',
    wines: [
      { n: 'Château Pontet-Canet', grape: 'Cabernet Sauvignon led with Merlot, Cabernet Franc, Petit Verdot', note: 'The fifth growth most often argued to outperform its rank' },
      { n: 'Les Hauts de Pontet-Canet', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Fifth growth by rank, routinely priced and scored as a super-second',
      'Its neighbour Mouton is a First; adjacency is not classification'
    ]
  },
  {
    id: 'p-ch-rauzan-segla', p: 'Château Rauzan-Ségla',
    country: 'France, Bordeaux and the South West', r: 'Margaux', sub: 'Deuxième Cru Classé (1855)',
    founded: '',
    holdings: 'Parcels around the village of Margaux, bought in 1994 by the Wertheimer family of Chanel, who also own Château Canon in Saint-Émilion.',
    style: 'Fine-grained and floral: violet, redcurrant and graphite with a cool, tightly drawn finish.',
    t: 'Violet and graphite drawn fine: the senior second of Margaux',
    why: 'The highest ranked estate in Margaux after the First Growth, and half of a divided property whose twin, Rauzan-Gassies, is also a second growth.',
    wines: [
      { n: 'Château Rauzan-Ségla', grape: 'Cabernet Sauvignon led with Merlot', note: 'The senior second growth of the Margaux commune' },
      { n: 'Ségla', grape: 'Cabernet Sauvignon and Merlot', note: 'The second wine' }
    ],
    traps: [
      'Rauzan-Ségla and Rauzan-Gassies are two different second growths from one split estate',
      'Same ownership as Château Canon in Saint-Émilion'
    ]
  },
  {
    id: 'p-ch-rieussec', p: 'Château Rieussec',
    country: 'France, Bordeaux and the South West', r: 'Sauternes', sub: 'Premier Cru Classé (1855)',
    founded: '',
    holdings: 'At Fargues on a rise adjoining Yquem, owned by Domaines Barons de Rothschild of Lafite since 1984; also makes a dry white called R.',
    style: 'Deep and spicy: orange marmalade, toasted nuts and caramel, one of the darker and more powerful premiers crus.',
    t: 'Marmalade, toasted nuts and caramel: the darkest of the premiers',
    why: 'The Sauternes end of the Lafite Rothschild group, which lets an examiner test cross-bank ownership in a single question.',
    wines: [
      { n: 'Château Rieussec', grape: 'Sémillon with Sauvignon Blanc and Muscadelle', note: 'A premier cru in Lafite ownership' },
      { n: 'R de Rieussec', grape: 'Sémillon and Sauvignon Blanc', note: 'The dry white, sold as AOC Bordeaux Blanc' }
    ],
    traps: [
      'Rieussec is at Fargues, not in the commune of Sauternes',
      'Its dry white R is Bordeaux Blanc, not Sauternes'
    ]
  },
  {
    id: 'p-ch-smith-haut-lafitte', p: 'Château Smith Haut Lafitte',
    country: 'France, Bordeaux and the South West', r: 'Pessac-Léognan', sub: 'Cru Classé de Graves (1959), red only',
    founded: '',
    holdings: 'Gravel at Martillac, bought by the Cathiard family in 1990; the estate coopers a share of its own barrels and runs the adjoining hotel and vinotherapy spa.',
    style: 'Polished and modern: dark fruit, toast and smoke in the red, and a rich, oak-fermented Sauvignon Blanc in the white.',
    t: 'Toast, dark fruit and smoke: Martillac rebuilt in the modern hand',
    why: 'The sharpest colour trap in Graves: its celebrated white carries no classification, because the estate was classified for red only.',
    wines: [
      { n: 'Château Smith Haut Lafitte Blanc', grape: 'Sauvignon Blanc with Sauvignon Gris and Sémillon', note: 'Famous and expensive, yet not part of the 1959 classification' },
      { n: 'Château Smith Haut Lafitte Rouge', grape: 'Cabernet Sauvignon and Merlot with Cabernet Franc and Petit Verdot', note: 'The classified wine of the estate' }
    ],
    traps: [
      'The white of Smith Haut Lafitte is not a cru classé; only the red is',
      'Do not read Lafitte here as any relation to Lafite Rothschild in Pauillac'
    ]
  },
  {
    id: 'p-ch-sociando-mallet', p: 'Château Sociando-Mallet',
    country: 'France, Bordeaux and the South West', r: 'Haut-Médoc', sub: 'Unclassified',
    founded: '',
    holdings: 'A gravel ridge at Saint-Seurin-de-Cadourne overlooking the Gironde, north of Saint-Estèphe, built up by Jean Gautreau from 1969.',
    style: 'Severe and long-lived: dense Cabernet fruit, firm tannin and little concession to early drinking.',
    t: 'Cold gravel and iron, no varnish: the Médoc\'s proudest outsider',
    why: 'The standing argument that the 1855 list is closed rather than current. It sits outside every classification, having also declined the Cru Bourgeois system.',
    wines: [
      { n: 'Château Sociando-Mallet', grape: 'Cabernet Sauvignon and Merlot with Cabernet Franc', note: 'An unclassified wine made deliberately to classed-growth scale' }
    ],
    traps: [
      'Sociando-Mallet has no classification of any kind, by choice',
      'Being north of Saint-Estèphe, it is Haut-Médoc, not Saint-Estèphe'
    ]
  },
  {
    id: 'p-ch-suduiraut', p: 'Château Suduiraut',
    country: 'France, Bordeaux and the South West', r: 'Sauternes', sub: 'Premier Cru Classé (1855)',
    founded: '',
    holdings: 'A large estate at Preignac next to Yquem, with formal gardens attributed to Le Notre.',
    style: 'The richest of the premiers crus: candied apricot, honey, roasted pineapple and a broad, oily texture.',
    t: 'Candied apricot and roast pineapple: Sauternes at its most opulent',
    why: 'The stylistic opposite of Barsac, used to show how the five Sauternes communes differ: Preignac and Sauternes rich, Barsac leaner.',
    wines: [
      { n: 'Château Suduiraut', grape: 'Sémillon with Sauvignon Blanc', note: 'The opulent end of the Sauternes spectrum' },
      { n: 'Castelnau de Suduiraut', grape: 'Sémillon and Sauvignon Blanc', note: 'The second wine' }
    ],
    traps: [
      'The Sauternes communes are Sauternes, Barsac, Bommes, Fargues and Preignac',
      'Suduiraut is a premier cru, not a Premier Cru Supérieur'
    ]
  },
  {
    id: 'p-ch-talbot', p: 'Château Talbot',
    country: 'France, Bordeaux and the South West', r: 'Saint-Julien', sub: 'Quatrième Cru Classé (1855)',
    founded: '',
    holdings: 'A large inland block in the middle of Saint-Julien, with a white parcel set aside for Caillou Blanc.',
    style: 'Fleshy, sweetly ripe and approachable: dark cherry and cocoa, less austere than the commune\'s seconds.',
    t: 'Dark cherry and cocoa: the friendliest address in Saint-Julien',
    why: 'Named for the English commander John Talbot, killed at Castillon in 1453. Its Caillou Blanc is the standard Saint-Julien example of a white declassified to Bordeaux Blanc.',
    wines: [
      { n: 'Château Talbot', grape: 'Cabernet Sauvignon and Merlot with Petit Verdot', note: 'A dependable fourth growth of some size' },
      { n: 'Caillou Blanc du Château Talbot', grape: 'Sauvignon Blanc and Sémillon', note: 'AOC Bordeaux Blanc, the best known white from a Saint-Julien estate' }
    ],
    traps: [
      'Caillou Blanc is AOC Bordeaux Blanc, not Saint-Julien',
      'Talbot is a fourth growth, not a second'
    ]
  },
  {
    id: 'p-ch-tirecul-la-graviere', p: 'Château Tirecul La Gravière',
    country: 'France, Bordeaux and the South West', r: 'Monbazillac', sub: 'Bergerac',
    founded: '',
    holdings: 'North-facing slopes above the Dordogne at Monbazillac, worked by Claudie and Bruno Bilancini, with an unusually high share of Muscadelle.',
    style: 'Intense botrytis sweetness with grip: mango, saffron, bitter orange and a long, salty finish.',
    t: 'Mango, saffron and bitter orange: Monbazillac taken seriously',
    why: 'Monbazillac is the sweet appellation of Bergerac, made from the same varieties as Sauternes, and this estate is the usual proof that it can reach that level.',
    wines: [
      { n: 'Château Tirecul La Gravière', grape: 'Sémillon and Muscadelle', note: 'The estate that made Monbazillac a serious answer again' },
      { n: 'Cuvée Madame', grape: 'Sémillon and Muscadelle', note: 'A selection made only in exceptional botrytis years' }
    ],
    traps: [
      'Monbazillac is in Bergerac on the Dordogne, not in the Bordeaux region',
      'Muscadelle is a permitted variety in both Sauternes and Monbazillac and is unrelated to Muscat'
    ]
  },
  {
    id: 'p-ch-tour-des-gendres', p: 'Château Tour des Gendres',
    country: 'France, Bordeaux and the South West', r: 'Bergerac', sub: 'Côtes de Bergerac',
    founded: '',
    holdings: 'Certified organic limestone and clay slopes near Bergerac farmed by the de Conti family, planted to the Bordeaux varieties.',
    style: 'Fresh and clearly drawn: dark-fruited reds with dusty tannin, and dry whites of citrus and beeswax.',
    t: 'Dusty dark fruit and beeswax: Bergerac done without apology',
    why: 'Bergerac grows the same grapes as Bordeaux under its own appellations, and this is the name most often used to show that the difference is administrative as much as climatic.',
    wines: [
      { n: 'La Gloire de Mon Père', grape: 'Merlot with Cabernet Sauvignon and Malbec', note: 'The estate\'s leading red, from limestone parcels' },
      { n: 'Anthologia', grape: 'Sémillon and Sauvignon Blanc', note: 'A dry white showing Bergerac\'s other side' }
    ],
    traps: [
      'Bergerac uses the Bordeaux varieties but is a separate appellation on the Dordogne',
      'Côtes de Bergerac is a distinct appellation from plain Bergerac, with different rules'
    ]
  },
  {
    id: 'p-ch-trotanoy', p: 'Château Trotanoy',
    country: 'France, Bordeaux and the South West', r: 'Pomerol', sub: 'Unclassified',
    founded: '',
    holdings: 'Clay over gravel on the western slope of the Pomerol plateau, a Moueix property, the name said to come from trop ennui, the difficulty of working the soil.',
    style: 'Dark, dense and mineral: black plum, truffle and wet stone, firmer and more brooding than most of the plateau.',
    t: 'Black plum, truffle and wet stone: Pomerol\'s darker half',
    why: 'The standard second name after Pétrus when an examiner asks what else the Moueix house makes in Pomerol.',
    wines: [
      { n: 'Château Trotanoy', grape: 'Merlot with a little Cabernet Franc', note: 'Long regarded as the closest thing to Pétrus in the Moueix stable' }
    ],
    traps: [
      'Moueix distributes or owns several Pomerol estates: ownership and distribution are not the same relationship',
      'Trotanoy is unclassified, like everything in Pomerol'
    ]
  },
  {
    id: 'p-clos-triguedina', p: 'Clos Triguedina',
    country: 'France, Bordeaux and the South West', r: 'Cahors', sub: 'Vire-sur-Lot',
    founded: '1830',
    holdings: 'Terraces of the Lot valley farmed by the Baldes family for many generations, including old Malbec used for the Prince Probus bottling.',
    style: 'Traditional Cahors of ink and iron: dried black fruit, tobacco and a dry, tannic spine that needs time.',
    t: 'Ink, iron and dried black fruit: the old black wine of the Lot',
    why: 'The historical voice of Cahors and the easiest route into the vin noir tradition and the phrase black wine, which examiners expect a candidate to explain.',
    wines: [
      { n: 'Prince Probus', grape: 'Malbec', note: 'Named for the Roman emperor said to have restored vines to Gaul' },
      { n: 'The New Black Wine', grape: 'Malbec', note: 'A revival of the old practice of heating part of the must to deepen colour' }
    ],
    traps: [
      'Black wine is a historical style and a marketing phrase, not a legal category',
      'Cahors lies on the Lot, well east of Bordeaux, and is not part of the Bordeaux region'
    ]
  },
  {
    id: 'p-clos-uroulat', p: 'Clos Uroulat',
    country: 'France, Bordeaux and the South West', r: 'Jurançon', sub: 'Monein',
    founded: '',
    holdings: 'A small estate at Monein founded by Charles Hours, now worked with his daughter, in the same Pyrenean foothills as Cauhapé.',
    style: 'Restrained and mineral: honeyed citrus and dried apricot in the sweet wine, and a taut, smoky dry wine.',
    t: 'Honeyed citrus and dried apricot, held tight: Jurançon with restraint',
    why: 'A second Jurançon name for contrast, and a clean example of one estate splitting its crop between the sweet and dry appellations.',
    wines: [
      { n: 'Uroulat', grape: 'Petit Manseng', note: 'The sweet Jurançon, aged in barrel' },
      { n: 'Cuvée Marie', grape: 'Gros Manseng and Petit Courbu', note: 'The estate\'s Jurançon Sec' }
    ],
    traps: [
      'Cuvée Marie is the dry wine; Uroulat is the sweet one',
      'Petit Courbu is a permitted Jurançon variety alongside the two Mansengs'
    ]
  },
  {
    id: 'p-dom-arretxea', p: 'Domaine Arretxea',
    country: 'France, Bordeaux and the South West', r: 'Irouléguy', sub: '',
    founded: '',
    holdings: 'Steep Basque terraces in the western Pyrenees farmed biodynamically by Thérèse and Michel Riouspeyrous, on sandstone and schist.',
    style: 'Wild and mountain-fresh: reds of iron, herb and firm tannin, whites of salty citrus and stone.',
    t: 'Iron, mountain herb and salt spray: the Basque country in a bottle',
    why: 'Irouléguy is the most westerly appellation of the South West and one of its smallest, and the usual answer for Basque wine, made from Tannat and the two Mansengs.',
    wines: [
      { n: 'Irouléguy Rouge', grape: 'Tannat with Cabernet Franc and Cabernet Sauvignon', note: 'The Basque red, firmer and fresher than Madiran' },
      { n: 'Irouléguy Blanc', grape: 'Petit Courbu, Gros Manseng, Petit Manseng', note: 'The dry white of the Basque country' }
    ],
    traps: [
      'Irouléguy makes red, rosé and white; it is not a red-only appellation',
      'It shares Tannat with Madiran and the Mansengs with Jurançon but is its own appellation'
    ]
  },
  {
    id: 'p-dom-cauhape', p: 'Domaine Cauhapé',
    country: 'France, Bordeaux and the South West', r: 'Jurançon', sub: 'Monein',
    founded: '',
    holdings: 'Steep terraces in the foothills of the Pyrenees at Monein, built up by Henri Ramonteu, planted to Petit Manseng and Gros Manseng.',
    style: 'Sweet wines of pineapple, quince and candied citrus cut by piercing acidity; dry wines of grapefruit and smoke.',
    t: 'Pineapple and quince on a wire of acid: the Pyrenean sweet wine',
    why: 'The reference estate for Jurançon and the standard demonstration that its sweetness comes from passerillage, grapes raisining on the vine, not from botrytis.',
    wines: [
      { n: 'Quintessence du Petit Manseng', grape: 'Petit Manseng', note: 'Very late harvest, from grapes shrivelled on the vine' },
      { n: 'Chant des Vignes', grape: 'Gros Manseng', note: 'A dry Jurançon Sec showing the appellation\'s other face' }
    ],
    traps: [
      'Jurançon sweetness is made by passerillage, not noble rot',
      'Jurançon is sweet and Jurançon Sec is dry: they are two separate appellations',
      'Petit Manseng is the sweet-wine grape, Gros Manseng more often the dry'
    ]
  },
  {
    id: 'p-dom-de-chevalier', p: 'Domaine de Chevalier',
    country: 'France, Bordeaux and the South West', r: 'Pessac-Léognan', sub: 'Cru Classé de Graves (1959), red and white',
    founded: '',
    holdings: 'A clearing in the pine forest at Léognan, run by the Bernard family; the white vineyard is very small and picked in successive passes.',
    style: 'Red of cool restraint, smoke and fine tannin; white of extraordinary tension, citrus and wax that gains for decades.',
    t: 'Wax, lemon oil and smoke: the white that outlives the red',
    why: 'The clearest case for Pessac-Léognan as a serious white region and one of the estates classified for both colours in 1959.',
    wines: [
      { n: 'Domaine de Chevalier Blanc', grape: 'Sauvignon Blanc with Sémillon', note: 'Among the longest-lived dry whites in Bordeaux, made in tiny quantity' },
      { n: 'Domaine de Chevalier Rouge', grape: 'Cabernet Sauvignon and Merlot with Cabernet Franc and Petit Verdot', note: 'Classified for red as well as white in 1959' }
    ],
    traps: [
      'The estate is a domaine, not a château, and is classified for red and white',
      'Pessac-Léognan was carved out of Graves as its own AOC in 1987, after the 1959 classification'
    ]
  },
  {
    id: 'p-dom-plageoles', p: 'Domaine Plageoles',
    country: 'France, Bordeaux and the South West', r: 'Gaillac', sub: '',
    founded: '',
    holdings: 'A family estate on the Tarn that has recovered and replanted local varieties, including several strains of Mauzac and the near-extinct Ondenc and Prunelart.',
    style: 'Distinctive and unpolished in the best sense: apple-skin and quince whites, peppery reds, and a flor-aged oxidative white.',
    t: 'Apple skin, quince and flor: the Tarn\'s lost grapes brought back',
    why: 'Gaillac is the South West\'s variety museum, and this estate is the standard source for Mauzac, Ondenc, Len de l\'El, Braucol and Prunelart.',
    wines: [
      { n: 'Vin de Voile', grape: 'Mauzac', note: 'Aged for years under a veil of flor yeast, a Jura-like Gaillac rarity' },
      { n: 'Mauzac Nature', grape: 'Mauzac', note: 'A lightly sparkling wine made by the méthode ancestrale' },
      { n: 'Prunelart', grape: 'Prunelart', note: 'A local red variety brought back from near-extinction' }
    ],
    traps: [
      'Mauzac is the Gaillac and Limoux grape, with apple-skin character, not a Bordeaux variety',
      'Méthode ancestrale finishes the original fermentation in bottle with no added liqueur de tirage',
      'Braucol in Gaillac is the same grape as Fer Servadou, called Mansois in Marcillac'
    ]
  },
  {
    id: 'p-petrus', p: 'Pétrus',
    country: 'France, Bordeaux and the South West', r: 'Pomerol', sub: 'Unclassified, as all of Pomerol is',
    founded: '',
    holdings: 'About eleven hectares on the buttonhole of blue clay at the high point of the Pomerol plateau, distributed by the Moueix house of Libourne.',
    style: 'Merlot at maximum depth without weight: truffle, dark plum, iron and a mid-palate that seems to have no end.',
    t: 'Blue-clay Merlot: truffle, plum velvet, endless mid-palate',
    why: 'The proof that classification and price are unrelated. Pomerol has never been classified, so the appellation\'s most famous wine carries no rank at all.',
    wines: [
      { n: 'Pétrus', grape: 'Merlot, effectively the whole blend', note: 'The single vineyard of Merlot on the blue clay at the high point of the plateau' }
    ],
    traps: [
      'Pétrus is unclassified: Pomerol has no classification',
      'The label reads Pétrus alone, without the word Château',
      'The blue clay is a small outcrop, not the soil of the whole plateau'
    ]
  },
  {
    id: 'p-vieux-chateau-certan', p: 'Vieux Château Certan',
    country: 'France, Bordeaux and the South West', r: 'Pomerol', sub: 'Unclassified',
    founded: '',
    holdings: 'Clay and gravel on the Pomerol plateau adjoining Pétrus, held by the Thienpont family since 1924, with an unusually large share of Cabernet Franc and some Cabernet Sauvignon.',
    style: 'The most Médoc-like Pomerol: floral, firm and savoury, with tobacco leaf and red fruit rather than plush plum.',
    t: 'Tobacco leaf and red fruit: the Pomerol that thinks it is Médoc',
    why: 'The counterexample to the idea that Pomerol means pure Merlot, and the family link to Le Pin makes it a standard pairing question.',
    wines: [
      { n: 'Vieux Château Certan', grape: 'Merlot with substantial Cabernet Franc and a little Cabernet Sauvignon', note: 'The Pomerol that most clearly shows Cabernet Franc' }
    ],
    traps: [
      'Not all Pomerol is Merlot-dominant to the same degree',
      'The Thienponts own both Vieux Château Certan and Le Pin, which are separate estates',
      'Do not confuse it with Certan de May, a different Pomerol property'
    ]
  },
  {
    id: 'w-carruades-de-lafite', p: 'Carruades de Lafite',
    by: 'p-ch-lafite-rothschild',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Second wine of Château Lafite Rothschild',
    founded: '',
    holdings: 'Named for the Carruades plateau, a block of Lafite\'s vineyard; the blend carries more Merlot than the grand vin.',
    style: 'Lighter and more openly fruited than Lafite: redcurrant, cedar and soft graphite, without the grand vin\'s reserve.',
    t: 'Redcurrant and soft cedar: Lafite\'s shadow, sold in daylight',
    why: 'The most commercially inflated second wine in Bordeaux and a standing test of whether a candidate reads a label past the family name.',
    wines: [
      { n: 'Carruades de Lafite', grape: 'Cabernet Sauvignon and Merlot with Cabernet Franc and Petit Verdot', note: 'The second wine that trades at classed-growth prices on the Asian market' }
    ],
    traps: [
      'Carruades is the second wine of Lafite, not a First Growth',
      'Its price reflects demand for the name, not classification'
    ]
  },
  {
    id: 'w-montus-cuvee-prestige', p: 'Château Montus Cuvée Prestige',
    by: 'p-ch-montus',
    country: 'France, Bordeaux and the South West', r: 'Madiran', sub: '',
    founded: '',
    holdings: 'Old Tannat on the gravel hillsides of Alain Brumont\'s Montus estate, aged in a high proportion of new oak.',
    style: 'Enormous and slow: black fruit, graphite, smoke and tannin that takes a decade to loosen its grip.',
    t: 'Graphite, smoke and a wall of tannin: Tannat\'s proof of seriousness',
    why: 'The wine that lifted Madiran out of local obscurity in the 1980s and the standard example when Tannat\'s tannin, and the micro-oxygenation developed to handle it, come up.',
    wines: [
      { n: 'Château Montus Cuvée Prestige', grape: 'Tannat', note: 'The bottling that proved Tannat could be a serious ageing wine' }
    ],
    traps: [
      'Madiran is the red appellation; the white from the same estate is Pacherenc du Vic-Bilh',
      'Tannat is not a Bordeaux variety and is not permitted in the Bordeaux appellations'
    ]
  },
  {
    id: 'w-chateau-valandraud', p: 'Château Valandraud',
    country: 'France, Bordeaux and the South West', r: 'Saint-Émilion', sub: 'Premier Grand Cru Classé B (from 2012)',
    founded: '1991',
    holdings: 'Assembled from small parcels around Saint-Émilion by Jean-Luc Thunevin and Murielle Andraud, beginning with less than a hectare.',
    style: 'Dense, dark and heavily worked: black fruit, espresso and sweet oak, made by severe selection and low yields.',
    t: 'Espresso, black fruit and new oak: the garage that climbed the ladder',
    why: 'The Saint-Émilion garagiste that went from nothing in 1991 to Premier Grand Cru Classé B in 2012, which is the strongest evidence that this classification genuinely moves.',
    wines: [
      { n: 'Château Valandraud', grape: 'Merlot with Cabernet Franc and Cabernet Sauvignon', note: 'Made from the 1991 vintage in a garage, classified Premier Grand Cru Classé B in 2012' }
    ],
    traps: [
      'Valandraud was promoted in 2012, not founded classified',
      'Garage wine describes a method and a scale, not an appellation or a rank'
    ]
  },
  {
    id: 'w-le-clarence-de-haut-brion', p: 'Le Clarence de Haut-Brion',
    by: 'p-ch-haut-brion',
    country: 'France, Bordeaux and the South West', r: 'Pessac-Léognan', sub: 'Second wine of Château Haut-Brion',
    founded: '',
    holdings: 'Selected from younger vines and declassified lots of the Haut-Brion vineyard in Pessac.',
    style: 'The house smoke and warm gravel in lighter form: red plum, tobacco and earth, softer and quicker to open.',
    t: 'Warm gravel and tobacco, half a step back: Haut-Brion\'s other voice',
    why: 'A second wine that changed its name, so older and newer vintages sit on lists under two different labels from the same estate.',
    wines: [
      { n: 'Le Clarence de Haut-Brion', grape: 'Merlot with Cabernet Sauvignon and Cabernet Franc', note: 'Called Bahans Haut-Brion until the label changed with the 2007 vintage' }
    ],
    traps: [
      'Bahans Haut-Brion and Le Clarence de Haut-Brion are the same wine under two names',
      'The name honours Clarence Dillon, the owner, and is not a vineyard'
    ]
  },
  {
    id: 'w-le-pin', p: 'Le Pin',
    country: 'France, Bordeaux and the South West', r: 'Pomerol', sub: 'Unclassified',
    founded: '1979',
    holdings: 'Barely more than two hectares on gravel and clay beside Vieux Château Certan on the Pomerol plateau, made by the Thienpont family, who also own Vieux Château Certan.',
    style: 'Sweetly opulent and immediately seductive: plum, mocha, cream and new oak, with none of the austerity of its neighbours.',
    t: 'Plum, mocha and cream from two hectares: Pomerol\'s smallest legend',
    why: 'The original garage wine: tiny production, new oak, immediate appeal and a price set by scarcity. It is the template every later garagiste copied.',
    wines: [
      { n: 'Le Pin', grape: 'Merlot, with occasionally a trace of Cabernet Franc', note: 'A few hundred cases a year from the first vintage in 1979' }
    ],
    traps: [
      'Le Pin has no classification, as Pomerol has none',
      'Le Pin and Vieux Château Certan share an owning family but are separate estates',
      'Scarcity, not rank, sets its price'
    ]
  },
  {
    id: 'w-les-forts-de-latour', p: 'Les Forts de Latour',
    by: 'p-ch-latour',
    country: 'France, Bordeaux and the South West', r: 'Pauillac', sub: 'Second wine of Château Latour',
    founded: '1966',
    holdings: 'Drawn chiefly from Latour\'s parcels outside the walled Enclos, notably Les Forts and Comtesse de Lalande plots, plus declassified Enclos fruit.',
    style: 'A scaled version of the grand vin: graphite and cassis on a firmer, narrower frame, drinkable earlier but built the same way.',
    t: 'Latour in miniature: graphite and cassis on a shorter leash',
    why: 'The second wine most often mistaken for a grand vin on a list. Since Latour left en primeur it is released only with bottle age, which changes how it is bought and sold.',
    wines: [
      { n: 'Les Forts de Latour', grape: 'Cabernet Sauvignon with Merlot and Petit Verdot', note: 'First released with the 1966 vintage, and now held back until the estate judges it ready' }
    ],
    traps: [
      'Les Forts de Latour is not Château Latour',
      'It is a second wine, yet priced above many classed growths',
      'Pauillac de Latour is the third wine, below Les Forts'
    ]
  },
  {
    id: 'w-pavillon-blanc-margaux', p: 'Pavillon Blanc du Château Margaux',
    by: 'p-ch-margaux',
    country: 'France, Bordeaux and the South West', r: 'Margaux commune, AOC Bordeaux Blanc', sub: 'The white wine of a First Growth',
    founded: '',
    holdings: 'A dedicated Sauvignon Blanc parcel on the Château Margaux estate, kept apart from the red vineyard.',
    style: 'Barrel-fermented but tightly drawn: lemon, white flowers and a waxy, saline length that gains for a decade or more.',
    t: 'Lemon, white flowers and wax: a First Growth\'s white in plain clothes',
    why: 'The definitive Médoc labelling trap. A First Growth estate must sell its white as generic Bordeaux Blanc because the Margaux appellation admits red only.',
    wines: [
      { n: 'Pavillon Blanc du Château Margaux', grape: 'Sauvignon Blanc', note: 'All Sauvignon Blanc and labelled AOC Bordeaux Blanc, since Margaux is a red-only appellation' }
    ],
    traps: [
      'Pavillon Blanc is AOC Bordeaux Blanc, never AOC Margaux',
      'Pavillon Rouge is the second wine; Pavillon Blanc is a different wine altogether',
      'All Médoc commune appellations are red only'
    ]
  },
  {
    id: 'w-ygrec-dyquem', p: 'Y (Ygrec) du Château d\'Yquem',
    by: 'p-ch-dyquem',
    country: 'France, Bordeaux and the South West', r: 'Sauternes commune, AOC Bordeaux Blanc', sub: 'The dry wine of Château d\'Yquem',
    founded: '',
    holdings: 'Made from Yquem\'s own vineyard, using fruit picked before or apart from the botrytis selections.',
    style: 'Dry but never lean: waxy Sémillon weight, grapefruit and a trace of botrytis honey on the finish.',
    t: 'Wax and grapefruit with a whisper of rot: Yquem without the sugar',
    why: 'The cleanest statement of the Sauternes rule: the appellation requires sweetness, so any dry wine from the zone is declassified to Bordeaux Blanc.',
    wines: [
      { n: 'Y (Ygrec) du Château d\'Yquem', grape: 'Sauvignon Blanc and Sémillon', note: 'Dry, and therefore sold as AOC Bordeaux Blanc rather than Sauternes' }
    ],
    traps: [
      'Y is dry and is not Sauternes',
      'It is not the second wine of Yquem; it is a separate dry bottling',
      'R de Rieussec and G de Guiraud follow the same rule'
    ]
  },
  {
    id: 'p-maison-bouchard', p: 'Bouchard Père et Fils',
    country: 'France, Burgundy and Beaujolais', r: 'Beaune', sub: 'Côte de Beaune',
    founded: '1731',
    holdings: 'One of the largest vineyard owners on the Côte d\'Or, with grand cru in Le Corton, Chevalier-Montrachet and Montrachet, the Beaune Greves monopole parcel Vigne de l\'Enfant Jesus and the Volnay Caillerets cuvee Ancienne Cuvee Carnot. Cellars lie inside the fifteenth-century Château de Beaune.',
    style: 'Polished and mainstream in the modern era, with a deep library of old vintages held in the chateau cellars.',
    t: 'Beaune\'s old fortress cellar: red fruit, sweet spice, gentle polish',
    why: 'Among the oldest houses in the region and a rare case of a negociant holding two Côte de Beaune monopoles.',
    wines: [
      { n: 'Beaune Grèves Vigne de l\'Enfant Jésus', grape: 'Pinot Noir', note: 'Premier cru monopole and the house\'s historic signature' },
      { n: 'Volnay Caillerets Ancienne Cuvée Carnot', grape: 'Pinot Noir', note: 'Premier cru monopole in Volnay' },
      { n: 'Chevalier-Montrachet La Cabotte', grape: 'Chardonnay', note: 'A named parcel within the grand cru' }
    ],
    traps: [
      'Bouchard Pere et Fils is not Bouchard Aine et Fils, a separate Beaune house',
      'Vigne de l\'Enfant Jesus is a parcel of the Beaune premier cru Greves'
    ]
  },
  {
    id: 'p-chateau-des-jacques', p: 'Château des Jacques',
    country: 'France, Burgundy and Beaujolais', r: 'Moulin-à-Vent', sub: 'Beaujolais',
    founded: '',
    holdings: 'Acquired by Maison Louis Jadot in 1996; holdings across named Moulin-à-Vent climats including Clos du Grand Carquelin, Champ de Cour, La Roche and Rochegres, with further vines in Morgon.',
    style: 'Destemmed and fermented as in Burgundy rather than by carbonic maceration, then aged in barrel; structured Gamay meant for a decade.',
    t: 'Serious Gamay: dark cherry, granite, structure that ages like Burgundy',
    why: 'The standing example that cru Beaujolais need not be made by carbonic maceration, and Moulin-à-Vent is the cru with the strongest claim to age.',
    wines: [
      { n: 'Moulin-à-Vent Clos du Grand Carquelin', grape: 'Gamay', note: 'A walled climat bottled separately' },
      { n: 'Moulin-à-Vent Champ de Cour', grape: 'Gamay', note: 'Deeper soils giving the estate\'s densest wine' },
      { n: 'Morgon Côte du Py', grape: 'Gamay', note: 'The estate\'s holding in the neighbouring cru' }
    ],
    traps: [
      'The wines are destemmed and fermented in the Burgundian way, not carbonically',
      'Moulin-à-Vent is named for a windmill, not a village'
    ]
  },
  {
    id: 'p-chateau-thivin', p: 'Château Thivin',
    country: 'France, Burgundy and Beaujolais', r: 'Côte de Brouilly', sub: 'Beaujolais',
    founded: '1877',
    holdings: 'The Geoffray family estate on the slopes of Mont Brouilly, with parcels on the blue volcanic rock of the hill across several expositions, plus vines in Brouilly and Fleurie.',
    style: 'Semi-carbonic with some destemming and barrel ageing on the top cuvees; firm, mineral Gamay with a distinct stony bitterness.',
    t: 'Blue rock Gamay: black cherry, crushed stone, a saline bitter edge',
    why: 'The reference producer for the distinction between Brouilly, the largest cru on the surrounding land, and Côte de Brouilly, the small cru on the volcanic hill itself.',
    wines: [
      { n: 'Côte de Brouilly Cuvée Zaccharie', grape: 'Gamay', note: 'The estate\'s old-vine bottling, barrel aged' },
      { n: 'Côte de Brouilly La Chapelle', grape: 'Gamay', note: 'From high on the hill near the chapel' },
      { n: 'Côte de Brouilly Les Sept Vignes', grape: 'Gamay', note: 'A blend of seven parcels around the hill' }
    ],
    traps: [
      'Brouilly and Côte de Brouilly are two separate crus, not one',
      'Côte de Brouilly sits on blue volcanic rock, unlike the granite of the other crus'
    ]
  },
  {
    id: 'p-chateau-fuisse', p: 'Château-Fuissé',
    country: 'France, Burgundy and Beaujolais', r: 'Pouilly-Fuissé', sub: 'Mâconnais',
    founded: '',
    holdings: 'The Vincent family estate at Fuisse, with holdings across the appellation including a walled clos beside the chateau and vines at Vergisson and Chaintre.',
    style: 'Richer and more oak-marked than most of the Mâconnais, with the structure to age a decade.',
    t: 'Mâconnais weight: yellow peach, toasted almond, warm stone, long finish',
    why: 'The historic reference for Pouilly-Fuissé, the appellation that gained premiers crus in 2020 after decades with none.',
    wines: [
      { n: 'Pouilly-Fuissé Le Clos', grape: 'Chardonnay', note: 'Walled parcel beside the chateau' },
      { n: 'Pouilly-Fuissé Les Brûlés', grape: 'Chardonnay', note: 'A warm south-facing site' },
      { n: 'Pouilly-Fuissé Vieilles Vignes', grape: 'Chardonnay', note: 'Old-vine bottling from across the estate' }
    ],
    traps: [
      'Pouilly-Fuissé is Mâconnais Chardonnay; Pouilly-Fumé is Loire Sauvignon Blanc',
      'Pouilly-Fuissé had no premier cru until the 2020 classification'
    ]
  },
  {
    id: 'p-coche-dury', p: 'Coche-Dury',
    country: 'France, Burgundy and Beaujolais', r: 'Meursault', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'A small Meursault estate with premiers crus Perrières and Genevrières, village lieux-dits including Les Rougeots and Les Narvaux, a fraction of Corton-Charlemagne, and reds from Volnay, Monthelie and Auxey-Duresses.',
    style: 'Deliberate reduction, long lees ageing and old barrels; struck-match aromatics over citrus and a saline finish.',
    t: 'Struck-match reduction, citrus oil, saline drive: the cult white style',
    why: 'The reference for reductive white Burgundy, an approach that spread worldwide, and a reminder that Meursault\'s greatest sites are premier cru only.',
    wines: [
      { n: 'Meursault Perrières', grape: 'Chardonnay', note: 'The premier cru most often argued deserving of grand cru' },
      { n: 'Corton-Charlemagne', grape: 'Chardonnay', note: 'A few barrels a year, the rarest wine in the range' },
      { n: 'Meursault Les Rougeots', grape: 'Chardonnay', note: 'Village land handled with premier cru care' }
    ],
    traps: [
      'Meursault has no grand cru at all',
      'Coche-Dury\'s Corton-Charlemagne is grand cru but is made in tiny volume'
    ]
  },
  {
    id: 'p-comte-georges-de-vogue', p: 'Comte Georges de Vogüé',
    country: 'France, Burgundy and Beaujolais', r: 'Chambolle-Musigny', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'The largest owner of Musigny, holding roughly two thirds of the 10.86 ha grand cru including all of Les Petits Musigny, plus Bonnes-Mares and the premier cru Les Amoureuses. The family has held vines in Chambolle since the fifteenth century.',
    style: 'Reserved and tightly wound in youth, built on structure rather than early charm; Chambolle perfume arriving only with a decade in bottle.',
    t: 'Lace and iron, Chambolle\'s floral silk with Grand Cru spine',
    why: 'The reference holding in Musigny and the source of the only white ever made from that grand cru, which the domaine has declassified to Bourgogne Blanc since the 1994 vintage after replanting.',
    wines: [
      { n: 'Musigny Vieilles Vignes', grape: 'Pinot Noir', note: 'The estate\'s grand vin, from the oldest Musigny vines' },
      { n: 'Bonnes-Mares', grape: 'Pinot Noir', note: 'Firmer and earthier than the Musigny, from the Chambolle side' },
      { n: 'Chambolle-Musigny Les Amoureuses', grape: 'Pinot Noir', note: 'The premier cru usually argued for grand cru promotion' }
    ],
    traps: [
      'Musigny Blanc from this estate has been sold as Bourgogne Blanc since 1994',
      'Bonnes-Mares straddles Chambolle-Musigny and Morey-Saint-Denis',
      'Young vines in Musigny are declassified into the Chambolle premier cru bottling'
    ]
  },
  {
    id: 'p-dom-de-villaine', p: 'Domaine A. et P. de Villaine',
    country: 'France, Burgundy and Beaujolais', r: 'Bouzeron', sub: 'Côte Chalonnaise',
    founded: '1971',
    holdings: 'Founded by Aubert and Pamela de Villaine at Bouzeron, with Aligoté at the heart of the estate plus Rully, Mercurey and Bourgogne Côte Chalonnaise from organically farmed vines.',
    style: 'Restrained and mineral, with little new oak; Aligoté treated as a serious white rather than a bar wine.',
    t: 'Aligoté taken seriously: lemon zest, white pepper, cold chalk, no fat',
    why: 'Bouzeron is the only village appellation in Burgundy for Aligoté, and its leading producer was for decades co-director of Domaine de la Romanée-Conti.',
    wines: [
      { n: 'Bouzeron', grape: 'Aligoté', note: 'From Burgundy\'s only village appellation reserved for Aligoté' },
      { n: 'Rully Les Saint-Jacques', grape: 'Chardonnay', note: 'Chalonnaise white of unusual tension' },
      { n: 'Mercurey Les Montots', grape: 'Pinot Noir', note: 'The estate\'s serious Chalonnaise red' }
    ],
    traps: [
      'Bouzeron is an Aligoté appellation, not a Chardonnay one',
      'Aubert de Villaine\'s own estate is in the Côte Chalonnaise, not in Vosne'
    ]
  },
  {
    id: 'p-dom-anne-gros', p: 'Domaine Anne Gros',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Small holdings of Richebourg, Echezeaux and a parcel of Clos de Vougeot bottled as Le Grand Maupertui, plus Vosne-Romanée Les Barreaux from old vines.',
    style: 'Precise and lifted, moderate extraction, bright red fruit over structure; among the more transparent Vosne houses.',
    t: 'Vosne at its clearest: red cherry, rose petal, fine chalky tannin',
    why: 'The Gros family is the classic Burgundian naming trap, with four separate domaines working adjacent parcels in the same village.',
    wines: [
      { n: 'Richebourg', grape: 'Pinot Noir', note: 'A fraction of a hectare of the grand cru' },
      { n: 'Clos de Vougeot Le Grand Maupertui', grape: 'Pinot Noir', note: 'Named parcel high in the walled vineyard' },
      { n: 'Vosne-Romanée Les Barreaux', grape: 'Pinot Noir', note: 'Old-vine village wine from above Richebourg' }
    ],
    traps: [
      'Anne Gros, Michel Gros, Gros Frere et Soeur and A.F. Gros are four distinct estates',
      'Michel Gros owns the Clos des Reas monopole, Anne Gros does not'
    ]
  },
  {
    id: 'p-dom-armand-rousseau', p: 'Domaine Armand Rousseau',
    country: 'France, Burgundy and Beaujolais', r: 'Gevrey-Chambertin', sub: 'Côte de Nuits',
    founded: 'early 20th century',
    holdings: 'The reference holding in Gevrey: parcels of Chambertin and Chambertin-Clos de Bèze, the monopole Ruchottes-Chambertin Clos des Ruchottes, Mazis-Chambertin, Charmes-Chambertin and the largest share of the premier cru Clos Saint-Jacques.',
    style: 'Destemmed, new oak reserved for the grands crus; deep, savoury Gevrey built on tannin and length rather than sweetness.',
    t: 'Gevrey\'s spine: black cherry, licorice, iron and a long savoury tail',
    why: 'One of the estates that pioneered domaine bottling in the 1930s, and the yardstick for Chambertin against Clos de Bèze.',
    wines: [
      { n: 'Chambertin-Clos de Bèze', grape: 'Pinot Noir', note: 'The estate\'s most complete wine, from the older of the two crus' },
      { n: 'Chambertin', grape: 'Pinot Noir', note: 'Denser and more tannic than the Beze, and slower to open' },
      { n: 'Gevrey-Chambertin Clos Saint-Jacques', grape: 'Pinot Noir', note: 'Premier cru routinely argued deserving of grand cru' },
      { n: 'Ruchottes-Chambertin Clos des Ruchottes', grape: 'Pinot Noir', note: 'A walled monopole inside the grand cru' }
    ],
    traps: [
      'Clos de Bèze may be sold as Chambertin; Chambertin may not be sold as Clos de Bèze',
      'Clos des Ruchottes is a monopole within Ruchottes-Chambertin, not the whole grand cru',
      'Clos Saint-Jacques is premier cru, and Rousseau is only one of its five owners'
    ]
  },
  {
    id: 'p-dom-bonneau-du-martray', p: 'Domaine Bonneau du Martray',
    country: 'France, Burgundy and Beaujolais', r: 'Pernand-Vergelesses', sub: 'Corton hill',
    founded: '',
    holdings: 'A single block on the Corton hill, almost entirely Corton-Charlemagne with a small parcel of Corton rouge; farmed biodynamically. Sold by the le Bault de la Moriniere family to Stan Kroenke in 2017.',
    style: 'Slow, restrained whites of high acidity that close down for years and open into saline stone fruit.',
    t: 'Corton-Charlemagne in one block: lemon oil, hazelnut, flint and long salt',
    why: 'Rare in Burgundy for being effectively a single-vineyard estate, and the standard answer when asked who defines Corton-Charlemagne.',
    wines: [
      { n: 'Corton-Charlemagne', grape: 'Chardonnay', note: 'A single unbroken block of the grand cru' },
      { n: 'Corton', grape: 'Pinot Noir', note: 'A small red from the same block' }
    ],
    traps: [
      'The estate is based in Pernand-Vergelesses, not Aloxe-Corton',
      'Corton-Charlemagne spans three communes: Aloxe-Corton, Pernand-Vergelesses and Ladoix-Serrigny'
    ]
  },
  {
    id: 'p-dom-bruno-clair', p: 'Domaine Bruno Clair',
    country: 'France, Burgundy and Beaujolais', r: 'Marsannay', sub: 'Côte de Nuits',
    founded: '1979',
    holdings: 'Based in Marsannay with holdings spread over Gevrey, Chambolle, Morey, Savigny and Aloxe; includes a share of the premier cru Clos Saint-Jacques, Bonnes-Mares, Chambertin-Clos de Bèze and the Marsannay lieu-dit Les Longeroies.',
    style: 'Partial whole cluster, restrained oak, cool and firm; among the most structured styles in the northern villages.',
    t: 'Northern Côte de Nuits: red cherry, pepper, cold stone, tight-knit tannin',
    why: 'Marsannay is the only Burgundian village appellation for red, white and rose, and Bruno Clair is its reference producer. The estate was reconstituted from the dispersed Clair-Dau holdings.',
    wines: [
      { n: 'Gevrey-Chambertin Clos Saint-Jacques', grape: 'Pinot Noir', note: 'One of the five parcels in the premier cru' },
      { n: 'Marsannay Les Longeroies', grape: 'Pinot Noir', note: 'The benchmark lieu-dit bottling of the village' },
      { n: 'Chambertin-Clos de Bèze', grape: 'Pinot Noir', note: 'Grand cru from old vines' },
      { n: 'Marsannay Rosé', grape: 'Pinot Noir', note: 'The only Burgundian village appellation covering rose' }
    ],
    traps: [
      'Marsannay is the only Côte d\'Or village appellation that covers rose',
      'Much of the old Domaine Clair-Dau went to Louis Jadot in the 1980s'
    ]
  },
  {
    id: 'p-dom-auvenay', p: 'Domaine d\'Auvenay',
    country: 'France, Burgundy and Beaujolais', r: 'Saint-Romain', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'Lalou Bize-Leroy\'s own small estate, based at Saint-Romain, with fractions of Criots-Bâtard-Montrachet, Chevalier-Montrachet, Mazis-Chambertin and Bonnes-Mares alongside Meursault and Auxey-Duresses premiers crus.',
    style: 'Biodynamic, tiny yields, long elevage; whites of extreme tension and concentration in quantities measured in barrels.',
    t: 'Fractions of barrels, glacial white intensity: Lalou\'s private cellar',
    why: 'Examinable as the third Leroy entity. Candidates who know Domaine Leroy and Maison Leroy still miss that d\'Auvenay is a separate estate and is based in the Côte de Beaune, not Vosne.',
    wines: [
      { n: 'Criots-Bâtard-Montrachet', grape: 'Chardonnay', note: 'From the smallest of the Montrachet grands crus, a barrel or two' },
      { n: 'Chevalier-Montrachet', grape: 'Chardonnay', note: 'The estate\'s most sought white' },
      { n: 'Meursault Les Narvaux', grape: 'Chardonnay', note: 'Village land treated with grand cru severity' }
    ],
    traps: [
      'D\'Auvenay is based in Saint-Romain, not in Vosne-Romanée',
      'It is a domaine in its own right, not a cuvee of Domaine Leroy'
    ]
  },
  {
    id: 'p-dom-de-larlot', p: 'Domaine de l\'Arlot',
    country: 'France, Burgundy and Beaujolais', r: 'Nuits-Saint-Georges', sub: 'Premeaux-Prissey',
    founded: '1987',
    holdings: 'Two walled premier cru monopoles at Premeaux, Clos de l\'Arlot and Clos des Forets Saint-Georges, plus Romanée-Saint-Vivant and Vosne Les Suchots; owned by AXA Millesimes since its formation.',
    style: 'Whole-cluster and gentle, paler and more aromatic than most of Nuits; a small white is made from the Clos de l\'Arlot.',
    t: 'Stems and roses: pale Nuits of lifted perfume over a cool stone floor',
    why: 'Two monopoles in one estate, a white premier cru in red country, and insurance-group ownership of a Burgundian domaine.',
    wines: [
      { n: 'Nuits-Saint-Georges Clos des Forêts Saint-Georges', grape: 'Pinot Noir', note: 'Premier cru monopole, the estate\'s most structured red' },
      { n: 'Nuits-Saint-Georges Clos de l\'Arlot', grape: 'Pinot Noir', note: 'Premier cru monopole, lighter and more floral' },
      { n: 'Nuits-Saint-Georges Clos de l\'Arlot Blanc', grape: 'Chardonnay', note: 'A rare white premier cru from the Côte de Nuits' }
    ],
    traps: [
      'Premeaux-Prissey wines are sold as Nuits-Saint-Georges',
      'Clos de l\'Arlot yields both red and white from the same monopole'
    ]
  },
  {
    id: 'p-dom-romanee-conti', p: 'Domaine de la Romanée-Conti',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '1869',
    holdings: 'Two monopoles, Romanée-Conti (1.81 ha) and La Tâche (6.06 ha), plus parcels in Richebourg, Romanée-Saint-Vivant, Grands Echezeaux, Echezeaux, Corton, Corton-Charlemagne and Le Montrachet; run as a societe civile since 1942 by the de Villaine and Leroy/Roch families.',
    style: 'Whole-cluster, long elevage in new oak that the fruit absorbs completely; perfume and lift rather than weight.',
    t: 'Rose, spice, sous-bois: impossibly weightless intensity',
    why: 'The reference point for the whole region and the owner of two monopoles a candidate must name without hesitation. The Court asks which DRC wines are monopoles and which are shared.',
    wines: [
      { n: 'Romanée-Conti', grape: 'Pinot Noir', note: 'The 1.81 ha monopole, bought by the Prince de Conti in 1760' },
      { n: 'La Tâche', grape: 'Pinot Noir', note: '6.06 ha monopole, enlarged by the absorption of Les Gaudichots in 1933' },
      { n: 'Richebourg', grape: 'Pinot Noir', note: 'The domaine\'s broadest, most muscular Vosne grand cru' },
      { n: 'Romanée-Saint-Vivant', grape: 'Pinot Noir', note: 'The most delicate of the domaine\'s reds, lower on the slope' },
      { n: 'Le Montrachet', grape: 'Chardonnay', note: 'A parcel of well under a hectare of the grand cru' }
    ],
    traps: [
      'Romanée-Conti and La Tâche are monopoles; Richebourg and Romanée-Saint-Vivant are not',
      'Echezeaux and Grands Echezeaux lie in Flagey-Échezeaux, not in Vosne-Romanée'
    ]
  },
  {
    id: 'p-dom-de-montille', p: 'Domaine de Montille',
    country: 'France, Burgundy and Beaujolais', r: 'Volnay', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'Volnay Taillepieds and Champans, Pommard Rugiens and Pezerolles, with Côte de Nuits holdings acquired in 2005 including Vosne-Romanée Malconsorts, plus white vineyards at Puligny and Corton-Charlemagne.',
    style: 'Austere and structured under Hubert de Montille, more supple under Etienne; whole clusters, low new oak, long ageing curve.',
    t: 'Stern Volnay and Pommard: dried cherry, earth, tannin with no sugar-coating',
    why: 'Both Rugiens and Taillepieds stand in the standing argument over which premiers crus deserve promotion, and this estate owns them both.',
    wines: [
      { n: 'Volnay Taillepieds', grape: 'Pinot Noir', note: 'The estate\'s most classical Volnay premier cru' },
      { n: 'Pommard Rugiens', grape: 'Pinot Noir', note: 'The premier cru most often argued for grand cru status' },
      { n: 'Vosne-Romanée Malconsorts Christiane', grape: 'Pinot Noir', note: 'A named parcel bordering La Tâche' }
    ],
    traps: [
      'Deux Montille is the family\'s negociant and white-wine label, not the domaine',
      'Rugiens is divided into Rugiens-Bas and Rugiens-Hauts, only one of which is argued for grand cru'
    ]
  },
  {
    id: 'p-dom-denis-mortet', p: 'Domaine Denis Mortet',
    country: 'France, Burgundy and Beaujolais', r: 'Gevrey-Chambertin', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Formed when the family vines were divided between Denis and his brother Thierry in the early 1990s; parcels in Chambertin, Clos de Vougeot, the Gevrey premier cru Lavaux Saint-Jacques and a long list of named village sites such as Au Velle and En Motrot.',
    style: 'Originally dark, extracted and heavily oaked; lighter and more aromatic under Arnaud Mortet since the mid 2000s.',
    t: 'Gevrey in dark tones: blackberry, graphite, espresso, tightening tannin',
    why: 'The clearest single example of a Burgundian house style changing between generations, which the Court uses to test tasting judgement against label memory.',
    wines: [
      { n: 'Chambertin', grape: 'Pinot Noir', note: 'A small parcel of the grand cru' },
      { n: 'Gevrey-Chambertin Lavaux Saint-Jacques', grape: 'Pinot Noir', note: 'Premier cru in the combe above the village' },
      { n: 'Gevrey-Chambertin Mes Cinq Terroirs', grape: 'Pinot Noir', note: 'Village wine assembled from five named sites' }
    ],
    traps: [
      'Denis Mortet and Thierry Mortet are separate estates from one divided holding'
    ]
  },
  {
    id: 'p-dom-comtes-lafon', p: 'Domaine des Comtes Lafon',
    country: 'France, Burgundy and Beaujolais', r: 'Meursault', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'Meursault premiers crus Perrières, Genevrières and Charmes, the village monopole Clos de la Barre, a parcel of Le Montrachet, and the red Volnay Santenots-du-Milieu; biodynamic. The family also owns Heritiers du Comte Lafon in the Mâconnais.',
    style: 'Rich and broad in youth on long lees, with enough acidity to age for twenty years; reds handled with the same restraint.',
    t: 'Meursault at full breadth: hazelnut, ripe pear, brown butter, long acid',
    why: 'Volnay Santenots is the standard appellation puzzle, since red wine from a Meursault vineyard takes the Volnay name while white from the same ground is Meursault.',
    wines: [
      { n: 'Meursault Perrières', grape: 'Chardonnay', note: 'The estate\'s most complete premier cru' },
      { n: 'Le Montrachet', grape: 'Chardonnay', note: 'A small parcel of the grand cru' },
      { n: 'Meursault Clos de la Barre', grape: 'Chardonnay', note: 'Village monopole around the family house' },
      { n: 'Volnay Santenots-du-Milieu', grape: 'Pinot Noir', note: 'Red premier cru from vineyard land inside Meursault' }
    ],
    traps: [
      'Les Santenots lies in Meursault but its reds are sold as Volnay-Santenots',
      'Heritiers du Comte Lafon is the family\'s separate Mâconnais estate'
    ]
  },
  {
    id: 'p-dom-des-lambrays', p: 'Domaine des Lambrays',
    country: 'France, Burgundy and Beaujolais', r: 'Morey-Saint-Denis', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Holds all but a small parcel of the 8.66 ha Clos des Lambrays, promoted to grand cru in 1981; also a white from the Puligny-Montrachet premier cru Clos du Cailleret. Acquired by LVMH in 2014.',
    style: 'High proportion of whole clusters, restrained oak; perfumed and supple rather than powerful.',
    t: 'Whole-bunch Morey: rose hip, sappy herb, red fruit on a supple frame',
    why: 'One of only two grand cru promotions in the Côte de Nuits in living memory, the other being La Grande Rue in 1992, and the classic near-monopole, since a fragment belongs to another grower.',
    wines: [
      { n: 'Clos des Lambrays', grape: 'Pinot Noir', note: 'Grand cru since 1981, a near-monopole of the estate' },
      { n: 'Puligny-Montrachet Clos du Cailleret', grape: 'Chardonnay', note: 'The estate\'s white, from the Côte de Beaune' }
    ],
    traps: [
      'Clos des Lambrays was promoted to grand cru only in 1981',
      'It is a near-monopole, not a monopole: Taupenot-Merme holds a small parcel',
      'Domaine des Lambrays is not Clos de Tart, though the two clos adjoin'
    ]
  },
  {
    id: 'p-dom-clos-de-tart', p: 'Domaine du Clos de Tart',
    country: 'France, Burgundy and Beaujolais', r: 'Morey-Saint-Denis', sub: 'Côte de Nuits',
    founded: '1141',
    holdings: 'A single walled grand cru of 7.53 ha, held as a monopole since its foundation by the Bernardine nuns of Notre-Dame de Tart; owned by the Mommessin family from 1932 and sold to Artémis Domaines in 2017.',
    style: 'Vinified parcel by parcel from vines planted across the slope rather than up and down it, which is the reverse of normal Burgundian practice; dark, structured Morey with a firm mineral core.',
    t: 'Walled and sombre: black cherry, iron, crushed violet under Morey stone',
    why: 'The textbook monopole, with a founding date and a short list of owners the Court expects verbatim, and the change of hands in 2017 is recent enough to be asked.',
    wines: [
      { n: 'Clos de Tart', grape: 'Pinot Noir', note: 'Monopole grand cru, the estate\'s only wine for most of its history' },
      { n: 'La Forge de Tart', grape: 'Pinot Noir', note: 'Second wine drawn from the younger vines of the clos' }
    ],
    traps: [
      'Clos de Tart is a monopole; Clos des Lambrays, next door, is not quite one',
      'The vineyard has changed hands very rarely, which is why the owners are examinable',
      'Do not confuse Clos de Tart with Clos de Tart-le-Haut or with Clos des Lambrays'
    ]
  },
  {
    id: 'p-dom-comte-armand', p: 'Domaine du Comte Armand',
    country: 'France, Burgundy and Beaujolais', r: 'Pommard', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'Owner of the Clos des Épeneaux monopole, a walled premier cru of about five hectares in the heart of Pommard, with additional vines in Auxey-Duresses and Volnay; biodynamic.',
    style: 'Parcels vinified by vine age and blended; dense, tannic Pommard that softens slowly into dark fruit and earth.',
    t: 'Pommard clay: black plum, tobacco leaf, broad tannin that needs a decade',
    why: 'The best-known monopole in the Côte de Beaune and the reference for Pommard\'s structure against Volnay\'s perfume.',
    wines: [
      { n: 'Pommard Clos des Épeneaux', grape: 'Pinot Noir', note: 'Premier cru monopole, the estate\'s single great wine' },
      { n: 'Auxey-Duresses', grape: 'Pinot Noir', note: 'The estate\'s lighter red, from behind the main slope' }
    ],
    traps: [
      'Clos des Épeneaux is a monopole inside the premier cru Les Epenots',
      'Pommard has no grand cru, though Les Rugiens is argued for one'
    ]
  },
  {
    id: 'p-dom-comte-liger-belair', p: 'Domaine du Comte Liger-Belair',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Owner of the La Romanée monopole (0.85 ha), the smallest appellation in France, directly above Romanée-Conti; also Vosne premiers crus including Aux Reignots and Les Chaumes, the village monopole Clos du Château, and Echezeaux.',
    style: 'Whole-cluster, restrained oak, silk rather than mass; Vosne spice with a fine-boned frame.',
    t: 'Vosne rose and warm spice drawn out on a wire: La Romanée\'s keeper',
    why: 'La Romanée is a monopole and a grand cru a candidate must attribute correctly. Louis-Michel Liger-Belair resumed farming and bottling it in the 2000s, after long years when the wine was raised and sold by Bouchard Pere et Fils.',
    wines: [
      { n: 'La Romanée', grape: 'Pinot Noir', note: 'Monopole of 0.85 ha, France\'s smallest appellation contrôlée' },
      { n: 'Vosne-Romanée Aux Reignots', grape: 'Pinot Noir', note: 'Premier cru sitting immediately above La Romanée' },
      { n: 'Nuits-Saint-Georges Aux Cras', grape: 'Pinot Noir', note: 'The domaine\'s firmer, more mineral Nuits' }
    ],
    traps: [
      'La Romanée is not Romanée-Conti, and not Romanée-Saint-Vivant',
      'Comte Liger-Belair in Vosne is a different estate from Thibault Liger-Belair in Nuits-Saint-Georges'
    ]
  },
  {
    id: 'p-dom-dujac', p: 'Domaine Dujac',
    country: 'France, Burgundy and Beaujolais', r: 'Morey-Saint-Denis', sub: 'Côte de Nuits',
    founded: '1967',
    holdings: 'Founded by Jacques Seysses on the former Domaine Graillet; grand cru holdings across Clos de la Roche, Clos Saint-Denis, Bonnes-Mares, Charmes-Chambertin, Echezeaux and Romanée-Saint-Vivant, with premiers crus in Morey, Gevrey, Chambolle and Vosne.',
    style: 'Close to full whole-cluster fermentation, gentle extraction, pale colour and a stem-driven savoury perfume that ages into sous-bois.',
    t: 'Whole-bunch lift: dried rose, black tea, forest floor over pale red fruit',
    why: 'The modern reference for whole-cluster Burgundy, and the label a candidate must separate from its own negociant arm.',
    wines: [
      { n: 'Clos de la Roche', grape: 'Pinot Noir', note: 'Morey\'s largest grand cru and the domaine\'s benchmark' },
      { n: 'Clos Saint-Denis', grape: 'Pinot Noir', note: 'The more perfumed of the estate\'s two Morey grands crus' },
      { n: 'Morey-Saint-Denis Premier Cru', grape: 'Pinot Noir', note: 'A blend of premier cru parcels, the house style in miniature' }
    ],
    traps: [
      'Dujac Fils et Pere is the negociant label; Domaine Dujac is the estate',
      'Clos Saint-Denis gives the village its name but is smaller than Clos de la Roche'
    ]
  },
  {
    id: 'p-dom-emmanuel-rouget', p: 'Domaine Emmanuel Rouget',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Flagey-Échezeaux',
    founded: '',
    holdings: 'Henri Jayer\'s nephew, who took over his uncle\'s vines; holdings include Vosne-Romanée Cros Parantoux and Les Beaumonts, Echezeaux and Nuits-Saint-Georges.',
    style: 'Jayer\'s method continued: destemmed, cold maceration, new oak, unfiltered; sweet-fruited and fine.',
    t: 'Jayer\'s hand still visible: crushed raspberry, sweet spice, silken weight',
    why: 'The Court uses Rouget to test the Jayer succession and the Flagey-Échezeaux question, since the domaine is based there while the wines carry Vosne names.',
    wines: [
      { n: 'Vosne-Romanée Cros Parantoux', grape: 'Pinot Noir', note: 'The Jayer inheritance, now the estate\'s signature' },
      { n: 'Échezeaux', grape: 'Pinot Noir', note: 'Grand cru from the Flagey side' },
      { n: 'Vosne-Romanée Les Beaumonts', grape: 'Pinot Noir', note: 'Premier cru of unusual perfume' }
    ],
    traps: [
      'Rouget is the nephew of Henri Jayer, not his son',
      'Village wine from Flagey-Échezeaux is sold under the Vosne-Romanée appellation'
    ]
  },
  {
    id: 'p-dom-etienne-sauzet', p: 'Domaine Etienne Sauzet',
    country: 'France, Burgundy and Beaujolais', r: 'Puligny-Montrachet', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'Grand cru parcels in Bâtard-Montrachet, Bienvenues-Bâtard-Montrachet and Chevalier-Montrachet, with the Puligny premiers crus Les Combettes, Les Perrières and Champ Canet. The original estate was divided among heirs in 1990, after which the house began buying fruit as well.',
    style: 'Precise and mineral, with moderate oak and a long, saline finish; Puligny rather than Meursault in outlook.',
    t: 'Lemon pith, white peach, wet limestone: Puligny cut clean',
    why: 'The 1990 division sent a third of the vines to Jean-Marc Boillot, which is the standard illustration of how French inheritance law fragments Burgundian estates.',
    wines: [
      { n: 'Puligny-Montrachet Les Combettes', grape: 'Chardonnay', note: 'Premier cru on the Meursault boundary' },
      { n: 'Bâtard-Montrachet', grape: 'Chardonnay', note: 'The estate\'s most powerful grand cru' },
      { n: 'Bienvenues-Bâtard-Montrachet', grape: 'Chardonnay', note: 'Finer and more floral than the Batard' }
    ],
    traps: [
      'Part of the original Sauzet estate left with Jean-Marc Boillot in 1990',
      'Les Combettes borders Meursault and often tastes like it'
    ]
  },
  {
    id: 'p-maison-faiveley', p: 'Domaine Faiveley',
    country: 'France, Burgundy and Beaujolais', r: 'Nuits-Saint-Georges', sub: 'Côte de Nuits and Côte Chalonnaise',
    founded: '1825',
    holdings: 'One of the largest owners in Burgundy, with the Corton grand cru monopole Clos des Cortons Faiveley, parcels in Chambertin-Clos de Bèze, Mazis-Chambertin, Latricieres and Echezeaux, and extensive holdings in Mercurey.',
    style: 'Historically firm and extracted; markedly finer and more aromatic since Erwan Faiveley took over in 2005.',
    t: 'Broad-shouldered Burgundy: dark fruit, spice and tannin that wants time',
    why: 'Faiveley is both domaine and maison, and the only grand cru in Burgundy whose official name carries a family surname.',
    wines: [
      { n: 'Corton Clos des Cortons Faiveley', grape: 'Pinot Noir', note: 'A grand cru monopole carrying the family\'s own name' },
      { n: 'Chambertin-Clos de Bèze', grape: 'Pinot Noir', note: 'The house\'s flagship Gevrey grand cru' },
      { n: 'Mercurey Clos des Myglands', grape: 'Pinot Noir', note: 'Premier cru monopole in the Côte Chalonnaise' }
    ],
    traps: [
      'Clos des Cortons Faiveley is the sole grand cru bearing an owner\'s name',
      'Faiveley bottles both estate wines and negociant wines under one house name',
      'The estate is one of the largest landowners in the Côte Chalonnaise, not only the Côte d\'Or'
    ]
  },
  {
    id: 'p-dom-fourrier', p: 'Domaine Fourrier',
    country: 'France, Burgundy and Beaujolais', r: 'Gevrey-Chambertin', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'About nine hectares of mostly old vines, including a share of the premier cru Clos Saint-Jacques, Les Goulots, Combe aux Moines and Cherbaudes, plus Griotte-Chambertin and vines in Chambolle and Morey.',
    style: 'Long, cool elevage on lees with almost no new oak and minimal racking; bright, juicy Gevrey that shows fruit before structure.',
    t: 'Kirsch and crushed stone kept bright: Gevrey without the shoulders',
    why: 'Useful for the Clos Saint-Jacques ownership question, and a counter-example to the assumption that Gevrey must be dense and oaked.',
    wines: [
      { n: 'Gevrey-Chambertin Clos Saint-Jacques', grape: 'Pinot Noir', note: 'One of five holdings in the premier cru' },
      { n: 'Griotte-Chambertin', grape: 'Pinot Noir', note: 'The estate\'s grand cru, in very small quantity' },
      { n: 'Gevrey-Chambertin Combe aux Moines', grape: 'Pinot Noir', note: 'Cool, high premier cru of marked tension' }
    ],
    traps: [
      'All bottlings carry the words Vieille Vigne, which is a house habit, not a classification'
    ]
  },
  {
    id: 'p-dom-lamarche', p: 'Domaine François Lamarche',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Owner of the La Grande Rue monopole (about 1.65 ha), the strip running between La Tâche and Romanée-Conti; also Grands Echezeaux, Echezeaux, Clos de Vougeot and Vosne premiers crus Les Malconsorts and Les Suchots.',
    style: 'Classical Vosne, medium-weight and perfumed; markedly more precise since the 2000s.',
    t: 'Vosne\'s narrow corridor: dark cherry, iron filings, gathering length',
    why: 'La Grande Rue is the only one of Vosne\'s six grands crus promoted in living memory, and the Court asks both the date and the owner.',
    wines: [
      { n: 'La Grande Rue', grape: 'Pinot Noir', note: 'Monopole promoted from premier cru to grand cru in 1992' },
      { n: 'Grands Échezeaux', grape: 'Pinot Noir', note: 'The senior of the two Flagey grands crus' },
      { n: 'Vosne-Romanée Les Malconsorts', grape: 'Pinot Noir', note: 'Premier cru bordering La Tâche' }
    ],
    traps: [
      'La Grande Rue was a premier cru until its promotion in 1992',
      'It is a monopole, so no other producer bottles it'
    ]
  },
  {
    id: 'p-dom-mugneret-gibourg', p: 'Domaine Georges Mugneret-Gibourg',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'About nine hectares run by the Mugneret sisters, with grand cru parcels in Ruchottes-Chambertin, Clos de Vougeot and Echezeaux, and premiers crus in Nuits-Saint-Georges and Chambolle-Musigny.',
    style: 'Meticulous, mid-weight, moderate oak; aromatic lift and a clean, savoury finish rather than density.',
    t: 'Cranberry, wild herb, fine dust: Vosne discipline applied to four communes',
    why: 'A clean illustration that a domaine\'s address and its vineyard holdings are different questions, since Ruchottes-Chambertin lies several villages north in Gevrey-Chambertin.',
    wines: [
      { n: 'Ruchottes-Chambertin', grape: 'Pinot Noir', note: 'Gevrey grand cru made by a Vosne-based domaine' },
      { n: 'Échezeaux', grape: 'Pinot Noir', note: 'Flagey grand cru in the estate\'s transparent style' },
      { n: 'Nuits-Saint-Georges Les Chaignots', grape: 'Pinot Noir', note: 'Premier cru of unusual finesse for the village' }
    ],
    traps: [
      'The domaine sits in Vosne-Romanée but owns grand cru in Gevrey-Chambertin',
      'Sold as Mugneret-Gibourg and as Georges Mugneret, both from the same cellar'
    ]
  },
  {
    id: 'p-dom-georges-roumier', p: 'Domaine Georges Roumier',
    country: 'France, Burgundy and Beaujolais', r: 'Chambolle-Musigny', sub: 'Côte de Nuits',
    founded: '1924',
    holdings: 'About twelve hectares including one of the larger holdings in Bonnes-Mares, a sliver of Musigny giving a few hundred bottles, Chambolle Les Amoureuses, Ruchottes-Chambertin and the Morey-Saint-Denis monopole Clos de la Bussiere.',
    style: 'Whole bunches used sparingly, restrained oak, cool-toned red fruit and a stony, almost austere finish under Christophe Roumier.',
    t: 'Red currant, crushed rock, rose stem: Chambolle drawn fine and cold',
    why: 'The monopole is examinable and so is the Bonnes-Mares split, since the grand cru\'s terres rouges and terres blanches divide the vineyard internally, and separately a small northern portion of the cru lies in Morey-Saint-Denis.',
    wines: [
      { n: 'Bonnes-Mares', grape: 'Pinot Noir', note: 'The estate\'s largest grand cru, drawn from both soil types' },
      { n: 'Chambolle-Musigny Les Amoureuses', grape: 'Pinot Noir', note: 'Premier cru that trades at grand cru prices' },
      { n: 'Musigny', grape: 'Pinot Noir', note: 'A few hundred bottles from a sliver of the grand cru' },
      { n: 'Morey-Saint-Denis Clos de la Bussière', grape: 'Pinot Noir', note: 'Premier cru monopole, the estate\'s most affordable red' }
    ],
    traps: [
      'Clos de la Bussiere is in Morey-Saint-Denis, not Chambolle-Musigny',
      'Roumier\'s Musigny exists but in quantities most candidates assume are a Vogüé monopoly'
    ]
  },
  {
    id: 'p-dom-guffens-heynen', p: 'Domaine Guffens-Heynen',
    country: 'France, Burgundy and Beaujolais', r: 'Pouilly-Fuissé', sub: 'Vergisson, Mâconnais',
    founded: '',
    holdings: 'A very small estate at Vergisson founded by Jean-Marie and Germaine Guffens-Heynen, with steep old-vine parcels in Pouilly-Fuissé and Mâcon-Pierreclos.',
    style: 'Hand-harvested at low yields, whole-bunch pressed, barrel-fermented; concentrated and mineral, closer to the Côte de Beaune than to the Mâcon norm.',
    t: 'Vergisson limestone: lime oil, gunflint, bitter almond, real cut',
    why: 'The Court uses Guffens to test the domaine and maison distinction, since the same winemaker runs a separate negociant house under another name.',
    wines: [
      { n: 'Pouilly-Fuissé La Roche', grape: 'Chardonnay', note: 'Steep limestone parcel beneath the Vergisson rock' },
      { n: 'Mâcon-Pierreclos Le Chavigne', grape: 'Chardonnay', note: 'Village-level Mâcon made with grand cru discipline' }
    ],
    traps: [
      'Domaine Guffens-Heynen is the estate; Verget is Jean-Marie Guffens\' negociant house',
      'Verget buys fruit across Burgundy including Chablis and the Côte de Beaune'
    ]
  },
  {
    id: 'p-dom-henri-gouges', p: 'Domaine Henri Gouges',
    country: 'France, Burgundy and Beaujolais', r: 'Nuits-Saint-Georges', sub: 'Côte de Nuits',
    founded: '1925',
    holdings: 'Around fifteen hectares concentrated in the premiers crus of Nuits, including Les Saint-Georges, Les Vaucrains, Clos des Porrets-Saint-Georges as a monopole, and La Perriere, which is planted to the white Pinot mutation found on the estate.',
    style: 'Firm, earthy and slow, built for a decade in bottle; the antithesis of early-drinking Burgundy.',
    t: 'Iron, wild cherry and clay: Nuits at its sternest, needing ten years',
    why: 'Henri Gouges was a leader of the estate-bottling movement and of the drive that produced the AOC system; the village\'s bid to promote Les Saint-Georges to grand cru is a live exam topic.',
    wines: [
      { n: 'Nuits-Saint-Georges Les Saint-Georges', grape: 'Pinot Noir', note: 'The premier cru that gave the village half its name' },
      { n: 'Nuits-Saint-Georges Clos des Porrets-Saint-Georges', grape: 'Pinot Noir', note: 'Premier cru monopole of the estate' },
      { n: 'Nuits-Saint-Georges La Perrière Blanc', grape: 'Pinot Gouges', note: 'A white Pinot mutation identified in the estate\'s own vines' }
    ],
    traps: [
      'Nuits-Saint-Georges has no grand cru, however famous Les Saint-Georges is',
      'The white from La Perriere is a Pinot mutation, not Chardonnay'
    ]
  },
  {
    id: 'p-dom-ja-ferret', p: 'Domaine J.A. Ferret',
    country: 'France, Burgundy and Beaujolais', r: 'Pouilly-Fuissé', sub: 'Mâconnais',
    founded: '',
    holdings: 'A historic Fuisse estate with parcels including Le Clos, Les Menetrieres, Les Perrières and Tournant de Pouilly; acquired by Maison Louis Jadot in 2008.',
    style: 'Long lees ageing and restrained oak; whites of Côte de Beaune seriousness from Mâconnais limestone.',
    t: 'Fuisse in fine grain: white peach, crushed limestone, salt on the finish',
    why: 'Jeanne Ferret ranked her parcels as Tete de Cru and Hors Classe long before the appellation had any official hierarchy, which anticipated the 2020 premiers crus.',
    wines: [
      { n: 'Pouilly-Fuissé Les Ménétrières', grape: 'Chardonnay', note: 'Among the sites promoted to premier cru in 2020' },
      { n: 'Pouilly-Fuissé Tournant de Pouilly', grape: 'Chardonnay', note: 'Steep site below the rock of Solutre' }
    ],
    traps: [
      'Tete de Cru and Hors Classe were house terms, never official classifications',
      'The estate is owned by Louis Jadot, a Beaune negociant'
    ]
  },
  {
    id: 'p-dom-jf-mugnier', p: 'Domaine Jacques-Frédéric Mugnier',
    country: 'France, Burgundy and Beaujolais', r: 'Chambolle-Musigny', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Based at the Château de Chambolle-Musigny with Musigny, Bonnes-Mares and Les Amoureuses, plus the 9.55 ha Nuits-Saint-Georges premier cru monopole Clos de la Marechale, leased to Faiveley for half a century and farmed by the domaine again from the 2004 vintage.',
    style: 'Transparent and weightless, low extraction, little new oak; aroma before texture.',
    t: 'Rosewater, wild strawberry, fine salt: Chambolle at its most weightless',
    why: 'The Clos de la Marechale lease is the standard question on how a monopole can appear under two producers\' labels in different decades.',
    wines: [
      { n: 'Musigny', grape: 'Pinot Noir', note: 'Just over a hectare of the grand cru' },
      { n: 'Nuits-Saint-Georges Clos de la Maréchale', grape: 'Pinot Noir', note: 'Premier cru monopole reclaimed from a long lease in 2004' },
      { n: 'Chambolle-Musigny Les Amoureuses', grape: 'Pinot Noir', note: 'Premier cru of the estate\'s purest perfume' },
      { n: 'Bonnes-Mares', grape: 'Pinot Noir', note: 'The estate\'s smallest grand cru holding' }
    ],
    traps: [
      'Clos de la Marechale bottlings before 2004 are Faiveley\'s, not Mugnier\'s',
      'The monopole lies in Nuits-Saint-Georges, in the commune of Premeaux-Prissey'
    ]
  },
  {
    id: 'p-dom-jean-grivot', p: 'Domaine Jean Grivot',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Around fifteen hectares spread over Richebourg, Echezeaux, Clos de Vougeot and a long list of Vosne and Nuits premiers crus including Les Beaux Monts, Les Suchots and Les Boudots.',
    style: 'Classical and firm, moderate new oak; the estate stepped away from the cold-maceration experiments of the late 1980s toward greater clarity.',
    t: 'Vosne with the bones showing: dark berry, wet stone, upright tannin',
    why: 'Etienne Grivot\'s association with the consultant Guy Accad in the late 1980s is the standard case study in Burgundian winemaking fashion and its reversal.',
    wines: [
      { n: 'Richebourg', grape: 'Pinot Noir', note: 'The estate\'s flagship grand cru' },
      { n: 'Vosne-Romanée Les Beaux Monts', grape: 'Pinot Noir', note: 'High premier cru of marked minerality' },
      { n: 'Nuits-Saint-Georges Les Boudots', grape: 'Pinot Noir', note: 'Premier cru bordering Vosne, with Vosne perfume' }
    ],
    traps: [
      'Les Boudots is in Nuits-Saint-Georges despite tasting like Vosne'
    ]
  },
  {
    id: 'p-dom-leflaive', p: 'Domaine Leflaive',
    country: 'France, Burgundy and Beaujolais', r: 'Puligny-Montrachet', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'The largest grand cru holding in Puligny: Chevalier-Montrachet, Bâtard-Montrachet, Bienvenues-Bâtard-Montrachet and a small parcel of Le Montrachet acquired in the early 1990s, with premiers crus Les Pucelles, Clavoillon and Les Combettes. Biodynamic since the 1990s.',
    style: 'Cool, chalky and slow to open; white flowers and citrus over a stony core rather than richness.',
    t: 'White flowers, hazelnut, chalk: biodynamic Puligny precision',
    why: 'The Court tests the Montrachet family of grands crus through this estate, and separately tests whether a candidate can distinguish the domaine from the negociant that shares the name.',
    wines: [
      { n: 'Chevalier-Montrachet', grape: 'Chardonnay', note: 'The estate\'s grand vin, from the steep upper slope' },
      { n: 'Bâtard-Montrachet', grape: 'Chardonnay', note: 'Broader and heavier than the Chevalier' },
      { n: 'Puligny-Montrachet Les Pucelles', grape: 'Chardonnay', note: 'The premier cru argued for promotion, beside Bienvenues-Bâtard-Montrachet' },
      { n: 'Bienvenues-Bâtard-Montrachet', grape: 'Chardonnay', note: 'Grand cru lying entirely within Puligny' }
    ],
    traps: [
      'Domaine Leflaive is not Olivier Leflaive, a separate negociant house',
      'Bienvenues-Batard lies wholly in Puligny; Criots-Batard lies wholly in Chassagne',
      'Bâtard-Montrachet and Le Montrachet straddle both communes'
    ]
  },
  {
    id: 'p-dom-leroy', p: 'Domaine Leroy',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '1988',
    holdings: 'Assembled by Lalou Bize-Leroy from the purchase of Domaine Charles Noellat in Vosne and Domaine Philippe-Remy in Gevrey; grand cru parcels include Musigny, Richebourg, Romanée-Saint-Vivant, Chambertin and Clos de la Roche.',
    style: 'Biodynamic from the outset, whole-cluster, microscopic yields; dense, high-toned and structured for decades.',
    t: 'Whole-cluster perfume, ferocious purity: Lalou Bize-Leroy\'s grails',
    why: 'The Leroy name splits three ways and the Court tests whether a candidate can separate them. Lalou Bize-Leroy was also co-director of DRC until 1992.',
    wines: [
      { n: 'Musigny', grape: 'Pinot Noir', note: 'A few hundred bottles a year, the scarcest wine in the range' },
      { n: 'Richebourg', grape: 'Pinot Noir', note: 'The Noellat parcel that made the domaine\'s reputation' },
      { n: 'Romanée-Saint-Vivant', grape: 'Pinot Noir', note: 'Perfumed counterweight to the Richebourg\'s power' }
    ],
    traps: [
      'Domaine Leroy (estate, 1988) is not Maison Leroy (negociant, founded 1868 in Auxey-Duresses)',
      'Domaine d\'Auvenay is Lalou Bize-Leroy\'s separate personal estate, not a Leroy label',
      'The Leroy family still holds a share of Domaine de la Romanée-Conti'
    ]
  },
  {
    id: 'p-dom-long-depaquit', p: 'Domaine Long-Depaquit',
    country: 'France, Burgundy and Beaujolais', r: 'Chablis', sub: 'Yonne',
    founded: '',
    holdings: 'Chablis estate owned by Maison Albert Bichot, holding the monopole La Moutonne, a climat of about 2.35 ha lying across Vaudésir and Les Preuses and entitled to the Chablis Grand Cru appellation.',
    style: 'Classical Chablis with modest oak on the top wines; La Moutonne sits between the leanness of Vaudésir and the breadth of Preuses.',
    t: 'Flint and white peach on cold stone: the odd climat on the grand cru hill',
    why: 'La Moutonne is the standard trick question in Chablis: a monopole with grand cru status that is not one of the seven named climats.',
    wines: [
      { n: 'Chablis La Moutonne', grape: 'Chardonnay', note: 'A grand cru monopole straddling two official climats' },
      { n: 'Chablis Les Clos', grape: 'Chardonnay', note: 'The estate\'s holding in the largest grand cru' }
    ],
    traps: [
      'La Moutonne is not one of the seven Chablis grands crus but carries the appellation',
      'It lies mostly in Vaudésir with a piece in Les Preuses',
      'The estate belongs to the negociant Albert Bichot'
    ]
  },
  {
    id: 'p-dom-marquis-dangerville', p: 'Domaine Marquis d\'Angerville',
    country: 'France, Burgundy and Beaujolais', r: 'Volnay', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'Owner of the Volnay premier cru monopole Clos des Ducs, with Taillepieds, Champans and Fremiets; biodynamic. The family also founded Domaine du Pelican in the Jura in 2012.',
    style: 'Pale, fine and aromatic; low extraction and little new oak, the model for Volnay as the elegant commune.',
    t: 'Volnay in silk: violet, red cherry, fine dry tannin, nothing forced',
    why: 'Sem d\'Angerville was one of the growers who forced estate bottling and helped build the AOC framework in the 1930s, which makes the estate a history answer as well as a Volnay answer.',
    wines: [
      { n: 'Volnay Clos des Ducs', grape: 'Pinot Noir', note: 'Premier cru monopole beside the village' },
      { n: 'Volnay Taillepieds', grape: 'Pinot Noir', note: 'The stoniest of the estate\'s crus, often argued for promotion' },
      { n: 'Volnay Champans', grape: 'Pinot Noir', note: 'Broader premier cru from mid-slope' }
    ],
    traps: [
      'Volnay has no grand cru; Clos des Ducs is a premier cru monopole',
      'The family\'s Jura estate, Domaine du Pelican, is a separate property in Arbois'
    ]
  },
  {
    id: 'p-dom-meo-camuzet', p: 'Domaine Méo-Camuzet',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Built on Etienne Camuzet\'s early twentieth-century purchases, including a large Clos de Vougeot parcel; holdings run to Richebourg, Corton, Echezeaux and the Vosne premier cru Cros Parantoux. Henri Jayer farmed the vines as metayer until 1988.',
    style: 'Destemmed, generous new oak in youth, deep-fruited and polished; Jayer\'s technique carried forward by Jean-Nicolas Meo.',
    t: 'Vosne in a velvet glove: black cherry, cocoa, sweet oak, long finish',
    why: 'The Camuzet family owned the Château du Clos de Vougeot before passing it to the Confrérie des Chevaliers du Tastevin, and the domaine is the living link to Henri Jayer.',
    wines: [
      { n: 'Vosne-Romanée Cros Parantoux', grape: 'Pinot Noir', note: 'Shares the premier cru with Emmanuel Rouget' },
      { n: 'Richebourg', grape: 'Pinot Noir', note: 'The domaine\'s grandest bottle' },
      { n: 'Clos de Vougeot', grape: 'Pinot Noir', note: 'From the historic Camuzet parcel in the walled grand cru' }
    ],
    traps: [
      'Meo-Camuzet Frere et Soeurs is the negociant label, not the estate bottling',
      'Cros Parantoux is a premier cru, not a grand cru'
    ]
  },
  {
    id: 'p-dom-michel-juillot', p: 'Domaine Michel Juillot',
    country: 'France, Burgundy and Beaujolais', r: 'Mercurey', sub: 'Côte Chalonnaise',
    founded: '',
    holdings: 'One of the larger estates in Mercurey, with premiers crus including Clos des Barraults and Clos Tonnerre, plus holdings on the Corton hill in Corton-Charlemagne and Corton Perrières.',
    style: 'Firm, dark Chalonnaise Pinot with real tannin, and whites that show the appellation\'s nuttier side.',
    t: 'Mercurey with real grip: black cherry, earth, dry stone, honest length',
    why: 'Mercurey is the largest Chalonnaise appellation and has premiers crus but no grand cru, a distinction candidates routinely miss.',
    wines: [
      { n: 'Mercurey Clos des Barraults', grape: 'Pinot Noir', note: 'Premier cru and the estate\'s benchmark red' },
      { n: 'Corton-Charlemagne', grape: 'Chardonnay', note: 'A Chalonnaise estate holding grand cru on the Corton hill' },
      { n: 'Mercurey Blanc', grape: 'Chardonnay', note: 'White from a commune better known for red' }
    ],
    traps: [
      'Mercurey has premiers crus but no grand cru',
      'The Côte Chalonnaise contains no grand cru at all'
    ]
  },
  {
    id: 'p-dom-michel-lafarge', p: 'Domaine Michel Lafarge',
    country: 'France, Burgundy and Beaujolais', r: 'Volnay', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'Volnay premiers crus Clos des Chenes and Caillerets, the monopole Volnay Clos du Château des Ducs, plus Beaune Greves and village Meursault; biodynamic since the turn of the century.',
    style: 'Cool, taut and transparent, with restrained oak and firm acidity; Volnay built to age rather than to charm early.',
    t: 'Cold-toned Volnay: red currant, rose stem, chalk and quiet persistence',
    why: 'A second Volnay monopole to hold alongside Clos des Ducs, and one of the few benchmark Passetoutgrains, which the Court uses to test the appellation\'s grape rules.',
    wines: [
      { n: 'Volnay Clos des Chênes', grape: 'Pinot Noir', note: 'High premier cru of marked minerality' },
      { n: 'Volnay Clos du Château des Ducs', grape: 'Pinot Noir', note: 'Premier cru monopole of the estate' },
      { n: 'Bourgogne Passetoutgrain L\'Exception', grape: 'Pinot Noir and Gamay', note: 'A serious version of Burgundy\'s field blend appellation' }
    ],
    traps: [
      'Clos du Château des Ducs and Clos des Ducs are different monopoles with different owners',
      'Passetoutgrain blends Gamay with Pinot Noir and is a regional appellation'
    ]
  },
  {
    id: 'p-dom-ponsot', p: 'Domaine Ponsot',
    country: 'France, Burgundy and Beaujolais', r: 'Morey-Saint-Denis', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Grand cru holdings in Clos de la Roche, Clos Saint-Denis, Chapelle-Chambertin, Griotte-Chambertin and Corton, plus the old Aligoté parcel in the Morey premier cru Clos des Monts Luisants, planted early in the twentieth century.',
    style: 'Very late picking, no new oak, no fining or filtration; broad, savoury wines that can seem rustic young and turn silken with age.',
    t: 'Late-picked and unoaked: sanguine red fruit, bay leaf, mushroom broth',
    why: 'The Aligoté premier cru is a standing exam question, and Laurent Ponsot\'s public exposure of counterfeit bottles at a 2008 auction is the case study in Burgundy fraud.',
    wines: [
      { n: 'Clos de la Roche Cuvée Vieilles Vignes', grape: 'Pinot Noir', note: 'The estate\'s grand vin from the oldest Clos de la Roche vines' },
      { n: 'Morey-Saint-Denis Clos des Monts Luisants', grape: 'Aligoté', note: 'A premier cru white made from Aligoté, not Chardonnay' },
      { n: 'Clos Saint-Denis', grape: 'Pinot Noir', note: 'First produced by the domaine only in the 1980s' }
    ],
    traps: [
      'Clos des Monts Luisants Blanc is Aligoté, a rare premier cru exception',
      'Laurent Ponsot left in 2017 to found his own house; Domaine Ponsot continues separately',
      'The domaine did not make Clos Saint-Denis before the 1980s, which exposed forged older bottles'
    ]
  },
  {
    id: 'p-dom-ramonet', p: 'Domaine Ramonet',
    country: 'France, Burgundy and Beaujolais', r: 'Chassagne-Montrachet', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'Grand cru parcels in Le Montrachet, Bâtard-Montrachet and Bienvenues-Bâtard-Montrachet, with the Chassagne premiers crus Les Ruchottes, Les Caillerets, La Boudriotte and Morgeot, plus red Chassagne.',
    style: 'Broad, nutty and slow to reveal itself, with long lees contact and older oak; less polished than Puligny, more savoury.',
    t: 'Chassagne in brown and gold: toasted nut, quince, sea salt, slow unfolding',
    why: 'Pierre Ramonet was among the first Chassagne growers to bottle and export his own wine, and the estate remains the reference for Chassagne against Puligny in a blind pair.',
    wines: [
      { n: 'Le Montrachet', grape: 'Chardonnay', note: 'A small parcel of the grand cru' },
      { n: 'Chassagne-Montrachet Les Ruchottes', grape: 'Chardonnay', note: 'The estate\'s most celebrated premier cru' },
      { n: 'Bâtard-Montrachet', grape: 'Chardonnay', note: 'From the Chassagne side of the grand cru' }
    ],
    traps: [
      'Chassagne-Montrachet makes serious red as well as white',
      'Criots-Bâtard-Montrachet lies entirely in Chassagne, Bienvenues entirely in Puligny'
    ]
  },
  {
    id: 'p-dom-raveneau', p: 'Domaine Raveneau',
    country: 'France, Burgundy and Beaujolais', r: 'Chablis', sub: 'Yonne',
    founded: '1948',
    holdings: 'Around nine hectares, small for Chablis, with grand cru parcels in Les Clos, Valmur and Blanchot and premiers crus including Montee de Tonnerre, Chapelot, Butteaux, Forets and Vaillons.',
    style: 'Fermented and aged partly in old barrels with long lees contact; tight, saline and slow, built for fifteen years or more.',
    t: 'Oyster shell, iodine, green apple steel: Chablis at maximum tension',
    why: 'The benchmark for barrel-influenced Chablis that still tastes of Kimmeridgian stone, and the counterweight to the assumption that Chablis is always unoaked.',
    wines: [
      { n: 'Chablis Les Clos', grape: 'Chardonnay', note: 'The largest and most structured of the grands crus' },
      { n: 'Chablis Montée de Tonnerre', grape: 'Chardonnay', note: 'The premier cru beside the grand cru slope' },
      { n: 'Chablis Valmur', grape: 'Chardonnay', note: 'The broadest of the estate\'s grands crus' }
    ],
    traps: [
      'Chablis grand cru is one slope of seven climats, not seven villages',
      'Montee de Tonnerre is premier cru, though it adjoins the grand cru hill',
      'The Raveneau and Dauvissat families are linked by marriage but are separate estates'
    ]
  },
  {
    id: 'p-dom-robert-chevillon', p: 'Domaine Robert Chevillon',
    country: 'France, Burgundy and Beaujolais', r: 'Nuits-Saint-Georges', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'About thirteen hectares, almost all in Nuits premiers crus, with old vines in Les Saint-Georges, Les Vaucrains, Les Cailles, Les Pruliers and Les Perrières.',
    style: 'Destemmed, moderate oak, no cosmetic polish; dense, meaty Nuits with the village\'s characteristic grip.',
    t: 'Bramble, game and iron filings: the taste of Nuits premier cru itself',
    why: 'The reference domaine for reading Nuits-Saint-Georges premiers crus against one another in a blind flight.',
    wines: [
      { n: 'Nuits-Saint-Georges Les Saint-Georges', grape: 'Pinot Noir', note: 'Old vines in the village\'s most celebrated premier cru' },
      { n: 'Nuits-Saint-Georges Les Vaucrains', grape: 'Pinot Noir', note: 'The firmest and slowest of the estate\'s crus' },
      { n: 'Nuits-Saint-Georges Les Cailles', grape: 'Pinot Noir', note: 'The most perfumed, sitting beside Les Saint-Georges' }
    ],
    traps: [
      'The south end of the village gives firmer wines; the north, toward Vosne, gives perfume'
    ]
  },
  {
    id: 'p-dom-sylvain-cathiard', p: 'Domaine Sylvain Cathiard',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A few hectares across Romanée-Saint-Vivant, the Vosne premiers crus Les Malconsorts, Aux Reignots and Les Suchots, and Nuits-Saint-Georges Aux Thorey.',
    style: 'Destemmed, generous but finely grained oak; dark-fruited Vosne with polish and a firm spine.',
    t: 'Dark cherry, graphite, cedar: Vosne premier cru with grand cru posture',
    why: 'A working example that Vosne\'s best premiers crus border the grands crus directly, which is the basis of the promotion argument the Court likes to set.',
    wines: [
      { n: 'Romanée-Saint-Vivant', grape: 'Pinot Noir', note: 'The estate\'s single grand cru, in tiny quantity' },
      { n: 'Vosne-Romanée Les Malconsorts', grape: 'Pinot Noir', note: 'Premier cru on the La Tâche boundary' },
      { n: 'Vosne-Romanée Aux Reignots', grape: 'Pinot Noir', note: 'Steep premier cru above La Romanée' }
    ],
    traps: [
      'Les Malconsorts is a premier cru even though it adjoins La Tâche'
    ]
  },
  {
    id: 'p-dom-trapet', p: 'Domaine Trapet Père et Fils',
    country: 'France, Burgundy and Beaujolais', r: 'Gevrey-Chambertin', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'Grand cru parcels in Chambertin, Latricieres-Chambertin and Chapelle-Chambertin, with Gevrey premiers crus and village land; biodynamic since the 1990s. The family holdings were divided in 1990 between this estate and Rossignol-Trapet.',
    style: 'Whole clusters, light extraction, little new oak; pale, floral Gevrey that reads as perfume before power.',
    t: 'Pale, floral Gevrey: violet, red plum, wet limestone, almost no oak',
    why: 'The 1990 family split produced two similarly named Gevrey estates with grand cru in both, a recurring identification trap.',
    wines: [
      { n: 'Chambertin', grape: 'Pinot Noir', note: 'The estate\'s grand vin, from an old family parcel' },
      { n: 'Latricières-Chambertin', grape: 'Pinot Noir', note: 'Cooler, stonier neighbour to Chambertin' },
      { n: 'Gevrey-Chambertin Petite Chapelle', grape: 'Pinot Noir', note: 'Premier cru beneath Chapelle-Chambertin' }
    ],
    traps: [
      'Trapet Pere et Fils and Rossignol-Trapet come from one estate divided in 1990',
      'Latricieres is a separate grand cru, not a lieu-dit within Chambertin'
    ]
  },
  {
    id: 'p-dom-vincent-dauvissat', p: 'Domaine Vincent Dauvissat',
    country: 'France, Burgundy and Beaujolais', r: 'Chablis', sub: 'Yonne',
    founded: '',
    holdings: 'A small estate labelled René et Vincent Dauvissat, with grand cru in Les Clos and Les Preuses and premiers crus La Forest, Sechet and Vaillons; farmed organically.',
    style: 'Old barrels, including traditional Chablis feuillettes, with long lees ageing; textured but stony, never oaky.',
    t: 'Crushed shell and lemon rind over chalk: Chablis with quiet texture',
    why: 'Paired constantly with Raveneau as the two reference Chablis domaines, and useful for testing whether a candidate knows the premier cru names on the left bank of the Serein.',
    wines: [
      { n: 'Chablis Les Clos', grape: 'Chardonnay', note: 'The estate\'s most complete grand cru' },
      { n: 'Chablis Les Preuses', grape: 'Chardonnay', note: 'Rounder grand cru at the western end of the slope' },
      { n: 'Chablis La Forest', grape: 'Chardonnay', note: 'Premier cru that is the estate\'s calling card' }
    ],
    traps: [
      'Vincent Dauvissat is distinct from other Dauvissat estates in Chablis',
      'La Forest is spelled without an accent and is a premier cru, not a grand cru'
    ]
  },
  {
    id: 'p-dom-william-fevre', p: 'Domaine William Fèvre',
    country: 'France, Burgundy and Beaujolais', r: 'Chablis', sub: 'Yonne',
    founded: '1959',
    holdings: 'The largest owner of Chablis grand cru, with substantial parcels in Les Clos, Bougros, Les Preuses, Valmur and Vaudésir, including the named parcel Bougros Côte Bouguerots.',
    style: 'Reformed in the late 1990s away from heavy new oak toward large old barrels and steel; precise, saline and grand cru transparent.',
    t: 'Sea spray and lemon curd over fossil chalk: grand cru Chablis in scale',
    why: 'The answer to who owns the most Chablis grand cru, and a clean example of an estate deliberately reducing its oak regime within living memory.',
    wines: [
      { n: 'Chablis Les Clos', grape: 'Chardonnay', note: 'From the estate\'s largest grand cru holding' },
      { n: 'Chablis Bougros Côte Bouguerots', grape: 'Chardonnay', note: 'A steep named parcel at the foot of the grand cru slope' },
      { n: 'Chablis Les Preuses', grape: 'Chardonnay', note: 'Grand cru of rounder, more open character' }
    ],
    traps: [
      'Fevre owns more grand cru than any other Chablis producer',
      'Côte Bouguerots is a parcel inside Bougros, not an eighth grand cru'
    ]
  },
  {
    id: 'p-georges-duboeuf', p: 'Georges Duboeuf',
    country: 'France, Burgundy and Beaujolais', r: 'Romanèche-Thorins', sub: 'Beaujolais',
    founded: '1964',
    holdings: 'A negociant house at Romaneche-Thorins buying from a very large number of growers and cooperatives across Beaujolais and the Mâconnais.',
    style: 'Bright, fruit-forward and consistent; the commercial definition of carbonic-maceration Gamay for most of the world.',
    t: 'Banana, red cherry, bubblegum lift: carbonic Gamay as the world knows it',
    why: 'Duboeuf built the global market for Beaujolais Nouveau, and the release date and the method behind that style are both standard exam questions.',
    wines: [
      { n: 'Beaujolais Nouveau', grape: 'Gamay', note: 'Released on the third Thursday of November' },
      { n: 'Moulin-à-Vent', grape: 'Gamay', note: 'The house\'s cru range, sold under flower labels' }
    ],
    traps: [
      'Beaujolais Nouveau is released on the third Thursday of November',
      'Nouveau may be made from Beaujolais and Beaujolais-Villages, never from a cru',
      'Duboeuf is a negociant, not a domaine'
    ]
  },
  {
    id: 'p-henri-jayer', p: 'Henri Jayer',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A tiny holding centred on the Vosne-Romanée premier cru Cros Parantoux, which Jayer cleared and replanted after the Second World War, plus Echezeaux and Vosne Les Brulees; he also farmed the Meo-Camuzet vines under metayage.',
    style: 'Total destemming, cold pre-fermentation maceration, new oak, no filtration; pure red fruit and transparency.',
    t: 'Raspberry, violet, warm stone: the winemaker who made a premier cru a legend',
    why: 'The most counterfeited name in Burgundy and the technical father of modern Vosne. His last vintages under his own name were made in the early 2000s.',
    wines: [
      { n: 'Vosne-Romanée Cros Parantoux', grape: 'Pinot Noir', note: 'The premier cru he made famous, roughly one hectare' },
      { n: 'Échezeaux', grape: 'Pinot Noir', note: 'His only grand cru under his own label' },
      { n: 'Vosne-Romanée Les Brûlées', grape: 'Pinot Noir', note: 'Premier cru on the Vosne and Flagey boundary' }
    ],
    traps: [
      'Cros Parantoux is a premier cru, not a grand cru, despite the prices',
      'Emmanuel Rouget is his nephew and successor, not a partner in the label'
    ]
  },
  {
    id: 'p-jean-foillard', p: 'Jean Foillard',
    country: 'France, Burgundy and Beaujolais', r: 'Morgon', sub: 'Beaujolais',
    founded: '',
    holdings: 'Old vines on the Côte du Py at Villie-Morgon, the decomposed schist hill at the heart of the cru, plus parcels in Corcelette and Fleurie.',
    style: 'Long, cool semi-carbonic maceration, indigenous yeasts, minimal sulphur, ageing in old Burgundy barrels; dark, savoury Gamay built to keep.',
    t: 'Dark cherry, violet, wet slate: Morgon that ages like a Côte de Nuits',
    why: 'Côte du Py is the single most examinable site name in Beaujolais, and Morgon is the cru known for ageing rather than for early drinking.',
    wines: [
      { n: 'Morgon Côte du Py', grape: 'Gamay', note: 'The reference bottling from the cru\'s central hill' },
      { n: 'Morgon Corcelette', grape: 'Gamay', note: 'Sandier granite giving a lighter, more floral wine' }
    ],
    traps: [
      'Côte du Py is decomposed schist, not the granite of most Beaujolais crus',
      'Morgonner is the old verb for a wine that has taken on the kirsch and earth of aged Morgon'
    ]
  },
  {
    id: 'p-la-chablisienne', p: 'La Chablisienne',
    country: 'France, Burgundy and Beaujolais', r: 'Chablis', sub: 'Yonne',
    founded: '1923',
    holdings: 'The Chablis cooperative, drawing on a large share of the appellation\'s planted area, and the source of Château Grenouilles from most of the Grenouilles grand cru.',
    style: 'Consistent and correct across every tier, mostly unoaked at the lower levels; the reference for what Chablis tastes like at scale.',
    t: 'Green apple, chalk dust, cold sea: Chablis as the whole village makes it',
    why: 'Cooperatives dominate production in several French regions, and the Court asks which grand cru is effectively controlled by one in Chablis.',
    wines: [
      { n: 'Château Grenouilles', grape: 'Chardonnay', note: 'From the bulk of the smallest of the seven grands crus' },
      { n: 'Chablis Les Vénérables Vieilles Vignes', grape: 'Chardonnay', note: 'The cooperative\'s old-vine village bottling' }
    ],
    traps: [
      'Grenouilles is the smallest of the seven grands crus',
      'Chateau Grenouilles is a cooperative wine, not a private estate'
    ]
  },
  {
    id: 'p-maison-champy', p: 'Maison Champy',
    country: 'France, Burgundy and Beaujolais', r: 'Beaune', sub: 'Côte de Beaune',
    founded: '1720',
    holdings: 'The oldest wine house in Burgundy, with cellars in Beaune and vineyards across the Côte de Beaune, including Pernand-Vergelesses, Savigny-les-Beaune and Beaune premiers crus.',
    style: 'Traditional and unshowy, with whole-cluster reds and organically farmed estate parcels.',
    t: 'Beaune\'s oldest address: red berry, dried herb, cellar cool and quiet',
    why: 'Asked as a date question. Champy claims 1720 and Bouchard 1731, and the Court expects the order.',
    wines: [
      { n: 'Beaune Premier Cru', grape: 'Pinot Noir', note: 'The house\'s home appellation' },
      { n: 'Pernand-Vergelesses Les Combottes', grape: 'Chardonnay', note: 'Cool white from beside the Corton hill' }
    ],
    traps: [
      'Champy predates Bouchard Pere et Fils by roughly a decade'
    ]
  },
  {
    id: 'p-maison-joseph-drouhin', p: 'Maison Joseph Drouhin',
    country: 'France, Burgundy and Beaujolais', r: 'Beaune', sub: 'Côte de Beaune',
    founded: '1880',
    holdings: 'Cellars under Beaune with vineyards across the Côte d\'Or and Chablis; owns the largest share of the Beaune premier cru Clos des Mouches and farms and sells Le Montrachet Marquis de Laguiche. Domaine Drouhin Oregon was established in the Dundee Hills in 1987.',
    style: 'Light-handed and aromatic, modest new oak, organic and biodynamic farming; elegance in preference to weight.',
    t: 'Understated and perfumed: red fruit, white flowers, no shouting anywhere',
    why: 'The Laguiche arrangement shows that a famous Montrachet label can name an owner while the wine is made by a maison, and Drouhin Oregon is the standard answer on Burgundian investment in the New World.',
    wines: [
      { n: 'Beaune Clos des Mouches', grape: 'Chardonnay and Pinot Noir', note: 'Made in both colours, the house signature' },
      { n: 'Montrachet Marquis de Laguiche', grape: 'Chardonnay', note: 'Farmed and sold by Drouhin for the Laguiche family' },
      { n: 'Chablis Drouhin-Vaudon', grape: 'Chardonnay', note: 'The house\'s Chablis estate, based at a former mill' }
    ],
    traps: [
      'Marquis de Laguiche is the owner of the parcel; Drouhin makes and sells the wine',
      'Clos des Mouches is a Beaune premier cru made in both colours, not a grand cru'
    ]
  },
  {
    id: 'p-maison-louis-jadot', p: 'Maison Louis Jadot',
    country: 'France, Burgundy and Beaujolais', r: 'Beaune', sub: 'Côte de Beaune',
    founded: '1859',
    holdings: 'Negociant and substantial landowner through Domaine des Heritiers Louis Jadot and Domaine Louis Jadot; includes Chevalier-Montrachet Les Demoiselles, Corton-Charlemagne, the Beaune premier cru monopole Clos des Ursules, and Château des Jacques in Moulin-à-Vent.',
    style: 'Classical and consistent across a very wide range; whole clusters common in the reds, whites built on restraint rather than richness.',
    t: 'House of many villages: clean, classical, reliably Burgundian at every tier',
    why: 'The textbook case of a maison that is also a major domaine, which is exactly the distinction the Court tests when it asks what Maison means on a Burgundy label.',
    wines: [
      { n: 'Beaune Clos des Ursules', grape: 'Pinot Noir', note: 'Premier cru monopole within Les Vignes Franches' },
      { n: 'Chevalier-Montrachet Les Demoiselles', grape: 'Chardonnay', note: 'A named parcel within the grand cru' },
      { n: 'Corton-Charlemagne', grape: 'Chardonnay', note: 'From the Heritiers holdings on the hill' },
      { n: 'Moulin-à-Vent Château des Jacques', grape: 'Gamay', note: 'Beaujolais made by Burgundian methods' }
    ],
    traps: [
      'Jadot bottles both negociant wine and estate wine under one label',
      'Domaine des Heritiers Louis Jadot on a label means estate fruit',
      'Louis Jadot is not Louis Latour and neither is Château Latour'
    ]
  },
  {
    id: 'p-maison-louis-latour', p: 'Maison Louis Latour',
    country: 'France, Burgundy and Beaujolais', r: 'Beaune', sub: 'Aloxe-Corton',
    founded: '1797',
    holdings: 'The largest owner of grand cru on the hill of Corton, with extensive Corton-Charlemagne and Corton rouge; the Château Corton Grancey winery at Aloxe-Corton dates from the nineteenth century. The house also pioneered Chardonnay in the Ardeche.',
    style: 'Traditional, with whole clusters and heating of the red musts; whites richer and more oak-marked than the modern Côte de Beaune norm.',
    t: 'Corton in a broad hand: yellow apple, hazelnut butter, hill-top salt',
    why: 'The hill of Corton is examinable through its largest owner, and Château Corton Grancey is the standard example of a Burgundian brand that is not a vineyard name.',
    wines: [
      { n: 'Corton-Charlemagne', grape: 'Chardonnay', note: 'From the house\'s dominant holding on the hill' },
      { n: 'Château Corton Grancey', grape: 'Pinot Noir', note: 'A blend of the house\'s Corton parcels sold under a brand name' },
      { n: 'Ardèche Chardonnay', grape: 'Chardonnay', note: 'An early Burgundian move into southern France' }
    ],
    traps: [
      'Château Corton Grancey is a brand and a building, not an appellation',
      'Louis Latour is not Château Latour of Pauillac',
      'Corton is the only red grand cru of the Côte de Beaune'
    ]
  },
  {
    id: 'p-marcel-lapierre', p: 'Marcel Lapierre',
    country: 'France, Burgundy and Beaujolais', r: 'Morgon', sub: 'Beaujolais',
    founded: '',
    holdings: 'Old Gamay vines at Villie-Morgon, including parcels on the Côte du Py, farmed without herbicides.',
    style: 'Whole-bunch semi-carbonic fermentation with indigenous yeasts, no chaptalisation and little or no added sulphur; juicy, pure and volatile in the best sense.',
    t: 'Crushed raspberry, iron, cold cellar air: Gamay with nothing added',
    why: 'Lapierre was the central figure of the Beaujolais natural wine movement, with Jean Foillard, Jean-Paul Thévenet and Guy Breton, working from the teaching of the chemist Jules Chauvet.',
    wines: [
      { n: 'Morgon', grape: 'Gamay', note: 'The estate\'s single cru bottling, sometimes issued with and without sulphur' },
      { n: 'Raisins Gaulois', grape: 'Gamay', note: 'A young-vine declassified red, sold as Vin de France' }
    ],
    traps: [
      'The four growers are known collectively as the Gang of Four, a critic\'s phrase, not a body',
      'Morgon is a cru, so the word Beaujolais does not appear on the label'
    ]
  },
  {
    id: 'p-olivier-leflaive', p: 'Olivier Leflaive',
    country: 'France, Burgundy and Beaujolais', r: 'Puligny-Montrachet', sub: 'Côte de Beaune',
    founded: '1984',
    holdings: 'A negociant house in Puligny founded by Olivier Leflaive, buying fruit and must across the Côte de Beaune and Chalonnaise, with estate vineyards added over time; also runs a hotel and table in the village.',
    style: 'Clean and consistent whites across a very wide range of appellations, with restrained oak.',
    t: 'Puligny by the maison route: clean citrus, light oak, dependable line',
    why: 'The clearest working example of two entities with one family name in one village, which is the Domaine versus Maison question in its sharpest form.',
    wines: [
      { n: 'Puligny-Montrachet', grape: 'Chardonnay', note: 'The house\'s home village bottling' },
      { n: 'Rully', grape: 'Chardonnay', note: 'Chalonnaise white that made the house\'s early reputation' }
    ],
    traps: [
      'Founded in 1984, far younger than Domaine Leflaive',
      'A negociant house first, though it has since bought vineyards'
    ]
  },
  {
    id: 'w-chablis-les-clos', p: 'Chablis Les Clos',
    country: 'France, Burgundy and Beaujolais', r: 'Chablis', sub: 'Yonne',
    founded: '',
    holdings: 'The largest of the seven Chablis grand cru climats, on the right bank of the Serein, on Kimmeridgian marl full of fossil oyster shells; growers include Raveneau, Dauvissat, William Fevre and Christian Moreau.',
    style: 'The most structured and slowest Chablis: austere young, turning to iodine, smoke and dried citrus over a decade.',
    t: 'Oyster shell, iodine, lemon rind on flint: Chablis at its most severe',
    why: 'The Court asks candidates to name the seven grand cru climats and to state that they form one contiguous slope, not seven villages.',
    wines: [
      { n: 'Chablis Grand Cru Les Clos', grape: 'Chardonnay', note: 'The reference grand cru climat of the appellation' }
    ],
    traps: [
      'Les Clos is a climat, not a village',
      'The seven are Blanchot, Bougros, Les Clos, Grenouilles, Preuses, Valmur and Vaudésir',
      'La Moutonne carries grand cru status but is not one of the seven'
    ]
  },
  {
    id: 'w-chambertin-clos-de-beze', p: 'Chambertin-Clos de Bèze',
    by: 'p-dom-armand-rousseau',
    country: 'France, Burgundy and Beaujolais', r: 'Gevrey-Chambertin', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A grand cru of about 15 ha, the older of the two great Gevrey crus, traced to the Abbey of Bèze in the seventh century; Chambertin itself lies immediately to the south across about 13 ha.',
    style: 'Deep, savoury and tannic, with dark fruit and a tea-leaf and iron finish; among the slowest wines in Burgundy.',
    t: 'Black cherry, licorice root, iron and smoke: Gevrey\'s deepest ground',
    why: 'The one-way labelling rule is a standing exam question, and both crus sit at the head of Gevrey\'s nine.',
    wines: [
      { n: 'Chambertin-Clos de Bèze', grape: 'Pinot Noir', note: 'May legally be sold under the name Chambertin' },
      { n: 'Chambertin', grape: 'Pinot Noir', note: 'The neighbouring grand cru, which may not use the Beze name' }
    ],
    traps: [
      'Clos de Bèze may be sold as Chambertin; Chambertin may not be sold as Clos de Bèze',
      'Gevrey-Chambertin has nine grands crus, seven of which append the Chambertin name',
      'Mazoyères-Chambertin may be sold as Charmes-Chambertin'
    ]
  },
  {
    id: 'w-clos-de-tart', p: 'Clos de Tart',
    by: 'p-dom-clos-de-tart',
    country: 'France, Burgundy and Beaujolais', r: 'Morey-Saint-Denis', sub: 'Côte de Nuits',
    founded: '1141',
    holdings: 'A walled grand cru of 7.53 ha, a monopole since it was planted by the Bernardine nuns of Notre-Dame de Tart in 1141; held by the Mommessin family from 1932 and sold to Artémis Domaines in 2017.',
    style: 'Dark and firm with a mineral core, the vines planted across the slope rather than up and down it.',
    t: 'Black fruit behind old walls: iron, violet, a long cold mineral line',
    why: 'The classic monopole question, with a founding date, a short ownership list and a recent sale, all of which the Court expects.',
    wines: [
      { n: 'Clos de Tart', grape: 'Pinot Noir', note: 'The monopole grand cru' },
      { n: 'La Forge de Tart', grape: 'Pinot Noir', note: 'Second wine from the younger vines' }
    ],
    traps: [
      'Clos de Tart is a full monopole; Clos des Lambrays next door is not',
      'The change of ownership in 2017 is recent enough to be asked',
      'Morey-Saint-Denis holds five grands crus counting the Bonnes-Mares fraction'
    ]
  },
  {
    id: 'w-clos-de-vougeot', p: 'Clos de Vougeot',
    country: 'France, Burgundy and Beaujolais', r: 'Vougeot', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A walled grand cru of about 50 ha enclosed by the Cistercians of Citeaux, now divided among roughly eighty owners across three distinct soil bands running from the top of the slope to the road.',
    style: 'Impossible to generalise, which is the point: upper parcels give finesse, lower parcels give weight and earth.',
    t: 'One wall, eighty hands: from silk at the top to dark earth by the road',
    why: 'The standard illustration of Burgundian fragmentation, and of why a grand cru name alone tells a buyer very little.',
    wines: [
      { n: 'Clos de Vougeot', grape: 'Pinot Noir', note: 'One grand cru, dozens of producers and widely varying quality' }
    ],
    traps: [
      'The Château du Clos de Vougeot is the seat of the Confrérie des Chevaliers du Tastevin, not a producer',
      'The village of Vougeot also has premier cru and village wine',
      'Quality varies with position on the slope, not with the appellation'
    ]
  },
  {
    id: 'w-corton-charlemagne', p: 'Corton-Charlemagne',
    country: 'France, Burgundy and Beaujolais', r: 'Aloxe-Corton', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'A white grand cru on the upper slopes of the hill of Corton, spanning the communes of Aloxe-Corton, Pernand-Vergelesses and Ladoix-Serrigny; Louis Latour and Bonneau du Martray are among the largest owners.',
    style: 'High, cool and late-ripening; austere and closed young, opening into hazelnut, citrus oil and a stony salinity.',
    t: 'Cool white on a broad hill: lemon oil, hazelnut skin, chalk and long salt',
    why: 'The Corton hill is the only place in Burgundy where a red grand cru and a great white grand cru share one slope, and the commune spread is routinely asked.',
    wines: [
      { n: 'Corton-Charlemagne', grape: 'Chardonnay', note: 'The largest white grand cru of the Côte d\'Or by area' }
    ],
    traps: [
      'Corton is the only red grand cru of the Côte de Beaune',
      'Corton rouge may legally contain up to fifteen percent Chardonnay',
      'Corton-Charlemagne spans three communes, not one'
    ]
  },
  {
    id: 'w-clos-saint-jacques', p: 'Gevrey-Chambertin Clos Saint-Jacques',
    country: 'France, Burgundy and Beaujolais', r: 'Gevrey-Chambertin', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A walled premier cru of about 6.7 ha on the slope west of the village, divided among five owners: Armand Rousseau, Bruno Clair, Fourrier, Louis Jadot and Sylvie Esmonin.',
    style: 'Perfumed and firm, combining Gevrey\'s structure with an aromatic lift the grands crus on the flatter southern slope do not always show.',
    t: 'Red cherry, rose, warm stone: the premier cru that argues for promotion',
    why: 'The standard case study for premiers crus that outperform their rank, and one of the few vineyards where a candidate is expected to name every owner.',
    wines: [
      { n: 'Gevrey-Chambertin Clos Saint-Jacques', grape: 'Pinot Noir', note: 'Five owners, one wall, no grand cru status' }
    ],
    traps: [
      'It remains a premier cru despite decades of argument for promotion',
      'Its five owners are a set question; four are Gevrey estates and one is a Beaune negociant'
    ]
  },
  {
    id: 'w-la-grande-rue', p: 'La Grande Rue',
    by: 'p-dom-lamarche',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A grand cru of about 1.65 ha, monopole of Domaine Lamarche, forming the narrow strip that runs up the slope between La Tâche and Romanée-Conti.',
    style: 'Mid-weight and firm, with the Vosne spice signature and a drier, more linear finish than its neighbours.',
    t: 'A narrow lane of vines: dark cherry, warm spice, dry stony finish',
    why: 'The most recent promotion among Vosne\'s grands crus and the easiest of the six to forget when reciting them.',
    wines: [
      { n: 'La Grande Rue', grape: 'Pinot Noir', note: 'Promoted from premier cru to grand cru in 1992' }
    ],
    traps: [
      'It was a premier cru until 1992',
      'Vosne\'s six grands crus are Romanée-Conti, La Tâche, Richebourg, Romanée-Saint-Vivant, La Romanée and La Grande Rue'
    ]
  },
  {
    id: 'w-la-romanee', p: 'La Romanée',
    by: 'p-dom-comte-liger-belair',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A grand cru of about 0.85 ha directly above Romanée-Conti, monopole of Domaine du Comte Liger-Belair, and the smallest appellation contrôlée in France.',
    style: 'Steeper and cooler than Romanée-Conti below it; taut, mineral and slower to open.',
    t: 'Cold spice and red currant on a thread of stone: the smallest appellation',
    why: 'The Court asks for the smallest appellation in France, and for the fact that this wine was long raised and sold by Bouchard Pere et Fils before the family took it back.',
    wines: [
      { n: 'La Romanée', grape: 'Pinot Noir', note: 'Roughly three hundred cases in a good year' }
    ],
    traps: [
      'La Romanée is not Romanée-Conti and not Romanée-Saint-Vivant',
      'It is the smallest appellation in France, measured as an AOC in its own right'
    ]
  },
  {
    id: 'w-la-tache', p: 'La Tâche',
    by: 'p-dom-romanee-conti',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A grand cru of 6.06 ha, monopole of Domaine de la Romanée-Conti, enlarged in 1933 when the neighbouring Les Gaudichots was absorbed after litigation.',
    style: 'The most overtly spiced and exotic of the domaine\'s reds, denser and more immediate than Romanée-Conti.',
    t: 'Black cherry, five spice, violet and truffle: DRC at its most exotic',
    why: 'The second monopole, and examinable for its enlargement in 1933, which is the standard example of a Burgundian vineyard boundary changing.',
    wines: [
      { n: 'La Tâche', grape: 'Pinot Noir', note: 'The larger of the domaine\'s two monopoles' }
    ],
    traps: [
      'La Tâche is larger than Romanée-Conti, not smaller',
      'Les Gaudichots still exists as a separate premier cru alongside the grand cru'
    ]
  },
  {
    id: 'w-le-montrachet', p: 'Le Montrachet',
    country: 'France, Burgundy and Beaujolais', r: 'Puligny-Montrachet and Chassagne-Montrachet', sub: 'Côte de Beaune',
    founded: '',
    holdings: 'A grand cru of about eight hectares straddling the boundary between Puligny and Chassagne, divided among many owners including Domaine de la Romanée-Conti, Comtes Lafon, Ramonet, Leflaive, Bouchard, Baron Thenard and the Marquis de Laguiche parcel sold by Drouhin.',
    style: 'The most powerful of the white grands crus: broad, oily and slow, needing a decade to show its stone.',
    t: 'Hazelnut, honeyed lemon, hot stone: white Burgundy at maximum weight',
    why: 'The Montrachet family of grands crus is the most heavily tested set of commune boundaries in the Côte de Beaune.',
    wines: [
      { n: 'Le Montrachet', grape: 'Chardonnay', note: 'The benchmark white grand cru, made by many owners' }
    ],
    traps: [
      'Le Montrachet and Bâtard-Montrachet straddle both communes',
      'Chevalier-Montrachet and Bienvenues-Batard lie wholly in Puligny',
      'Criots-Bâtard-Montrachet lies wholly in Chassagne',
      'Both villages appended the vineyard name to their own in the nineteenth century'
    ]
  },
  {
    id: 'w-musigny', p: 'Musigny',
    by: 'p-comte-georges-de-vogue',
    country: 'France, Burgundy and Beaujolais', r: 'Chambolle-Musigny', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A grand cru of 10.86 ha at the southern end of Chambolle, above Clos de Vougeot, including the parcel Les Petits Musigny; Comte Georges de Vogüé is by far the largest owner, with Roumier, Mugnier, Leroy and others holding small shares.',
    style: 'The most perfumed of the great Côte de Nuits crus: silk over a firm mineral frame, slow to show itself.',
    t: 'Rose, raspberry, powdered stone: the most scented ground in the Côte de Nuits',
    why: 'The one Côte de Nuits grand cru that may legally produce white, which is a standard question, and the de Vogüé declassification since 1994 is its follow-up.',
    wines: [
      { n: 'Musigny', grape: 'Pinot Noir', note: 'The grand cru red, from several owners' },
      { n: 'Musigny Blanc', grape: 'Chardonnay', note: 'The only white permitted in a Côte de Nuits grand cru' }
    ],
    traps: [
      'Musigny is the only Côte de Nuits grand cru permitted to make white wine',
      'De Vogüé has sold its white as Bourgogne Blanc since the 1994 vintage',
      'Les Amoureuses, immediately below, is a premier cru, not part of Musigny'
    ]
  },
  {
    id: 'w-romanee-conti', p: 'Romanée-Conti',
    by: 'p-dom-romanee-conti',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A grand cru of 1.81 ha, monopole of Domaine de la Romanée-Conti, sitting mid-slope between Richebourg and La Romanée. Bought by the Prince de Conti in 1760, which is when it took his name.',
    style: 'Whole-cluster, aged in new oak, released in tiny allocation; perfume and length rather than mass.',
    t: 'Rose petal, Chinese spice, sous-bois: weightless and endless at once',
    why: 'The name every candidate reaches for first. The Court asks for its size, its owner, its monopole status and the origin of the name.',
    wines: [
      { n: 'Romanée-Conti', grape: 'Pinot Noir', note: 'The single wine of the vineyard, a few hundred cases a year' }
    ],
    traps: [
      'Romanée-Conti is a monopole; Richebourg and Romanée-Saint-Vivant are not',
      'No wine was made between the postwar replanting and the early 1950s',
      'It is one of six grands crus in Vosne-Romanée, not the only one'
    ]
  },
  {
    id: 'w-cros-parantoux', p: 'Vosne-Romanée Cros Parantoux',
    by: 'p-henri-jayer',
    country: 'France, Burgundy and Beaujolais', r: 'Vosne-Romanée', sub: 'Côte de Nuits',
    founded: '',
    holdings: 'A premier cru of roughly one hectare above Richebourg, cleared and replanted by Henri Jayer after the Second World War; now bottled by Emmanuel Rouget and Meo-Camuzet.',
    style: 'Fine-boned and floral, with red fruit and a marked stony bitterness on the finish.',
    t: 'Raspberry, rose, cold rock: a premier cru priced like a grand cru',
    why: 'The clearest proof that Burgundian value follows producer and reputation as much as classification.',
    wines: [
      { n: 'Vosne-Romanée Cros Parantoux', grape: 'Pinot Noir', note: 'The premier cru Jayer made into a collector\'s name' }
    ],
    traps: [
      'Cros Parantoux is a premier cru, not a grand cru',
      'It has more than one producer, though Jayer\'s name defines it'
    ]
  },
  {
    id: 'p-agrapart', p: 'Agrapart & Fils',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Avize (Côte des Blancs)',
    founded: '',
    holdings: 'Chardonnay in the grand crus of Avize, Oger, Cramant and Oiry, worked with a strong emphasis on soil life.',
    style: 'Site-by-site blanc de blancs, part barrel fermented, low dosage: chalk, salt and texture rather than fruit.',
    t: 'Chalk read parcel by parcel: salt, white peach, texture without weight',
    why: 'With Selosse and Larmandier-Bernier, one of the Côte des Blancs growers who made single-site Chardonnay a serious category.',
    wines: [
      { n: 'Les 7 Crus', grape: 'Chardonnay', note: 'the entry wine, drawn from seven villages' },
      { n: 'Minéral', grape: 'Chardonnay', note: 'grand cru blanc de blancs named for the chalk beneath it' },
      { n: 'L\'Avizoise', grape: 'Chardonnay', note: 'deep clay-over-chalk parcels at Avize, the richest of the range' },
      { n: 'Vénus', grape: 'Chardonnay', note: 'a single Avize parcel worked by horse, the estate\'s rarest bottling' }
    ],
    traps: [
      'Venus is named for the horse that ploughs the parcel, not for a vineyard',
      'Avize, Oger, Cramant and Oiry are villages, not vineyard names'
    ]
  },
  {
    id: 'p-albert-mann', p: 'Albert Mann',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Wettolsheim (Haut-Rhin)',
    founded: '',
    holdings: 'Biodynamic parcels in the Furstentum, Schlossberg, Hengst, Steingrubler and Pfersigberg grands crus.',
    style: 'Dry and precise across the white varieties, with Pinot Noir taken as seriously as the whites.',
    t: 'Biodynamic across five grands crus, and Pinot Noir taken seriously',
    why: 'One of the estates carrying the argument that Alsace Pinot Noir belongs on the best slopes, which is why the 2022 rule change is examinable.',
    wines: [
      { n: 'Riesling Schlossberg', grape: 'Riesling', note: 'granite at Kientzheim, the estate\'s most tightly drawn Riesling' },
      { n: 'Gewürztraminer Furstentum', grape: 'Gewürztraminer', note: 'old vines on limestone, dry in style' },
      { n: 'Pinot Gris Hengst', grape: 'Pinot Gris', note: 'marl and limestone at Wintzenheim' },
      { n: 'Pinot Noir', grape: 'Pinot Noir', note: 'the variety that now has a route into grand cru at three sites' }
    ],
    traps: [
      'Alsace grand cru was white only until Pinot Noir was admitted at Hengst, Kirchberg de Barr and Vorbourg from the 2022 harvest',
      'Pinot Noir is a permitted Alsace variety but is not one of the four noble grapes'
    ]
  },
  {
    id: 'p-alphonse-mellot', p: 'Alphonse Mellot',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Sancerre (Centre-Loire)',
    founded: '',
    holdings: 'Domaine La Moussiere below the town of Sancerre plus steep marl parcels, all farmed biodynamically; white and red in roughly equal seriousness.',
    style: 'Low yields, barrel fermentation and long lees ageing: Sancerre with weight and oak rather than cut grass.',
    t: 'Oak and low yields on La Moussiere: dense Sauvignon, serious Pinot Noir',
    why: 'The estate that makes the case for oak in Sancerre, and a useful counterweight to the stainless-steel picture of the appellation.',
    wines: [
      { n: 'La Moussière', grape: 'Sauvignon Blanc', note: 'the estate wine, the introduction to the barrel-worked style' },
      { n: 'Edmond', grape: 'Sauvignon Blanc', note: 'old vines, the white flagship' },
      { n: 'Génération XIX', grape: 'Sauvignon Blanc', note: 'the top selection, named for the generations of Alphonse Mellots' },
      { n: 'En Grands Champs', grape: 'Pinot Noir', note: 'single-parcel Sancerre rouge made with Burgundian handling' }
    ],
    traps: [
      'Every generation is named Alphonse, so several Alphonse Mellots appear across the vintages',
      'La Moussiere is the estate\'s vineyard, not a classified cru'
    ]
  },
  {
    id: 'p-bernard-baudry', p: 'Bernard Baudry',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Chinon (Touraine)',
    founded: '1975',
    holdings: 'Vineyards at Cravant-les-Coteaux in eastern Chinon, bottled by soil: sand and gravel terraces, gravel over clay, and limestone on the slope.',
    style: 'Cabernet Franc read through soil, running from light and crunchy on sand to firm and long on limestone.',
    t: 'Gravel to limestone in one cellar: raspberry, graphite, cool Cabernet Franc',
    why: 'The clearest single-estate demonstration that Chinon\'s soils, not its ripeness, decide the style of the wine.',
    wines: [
      { n: 'La Croix Boissée', grape: 'Cabernet Franc', note: 'limestone at the top of the slope, the estate\'s most structured wine' },
      { n: 'Les Grézeaux', grape: 'Cabernet Franc', note: 'old vines on gravel over clay' },
      { n: 'Les Granges', grape: 'Cabernet Franc', note: 'sand and gravel by the river, the early-drinking bottling' },
      { n: 'Chinon Blanc', grape: 'Chenin Blanc', note: 'a reminder that Chinon makes white as well as red' }
    ],
    traps: [
      'The cuvees are soil selections chosen by the grower, not an appellation hierarchy',
      'Cravant-les-Coteaux is a commune within Chinon, not a separate appellation'
    ]
  },
  {
    id: 'p-billecart-salmon', p: 'Billecart-Salmon',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Mareuil-sur-Aÿ',
    founded: '1818',
    holdings: 'Owns the walled Clos Saint-Hilaire beside the winery at Mareuil-sur-Aÿ, planted to Pinot Noir.',
    style: 'Cold settling and long, cool fermentation: restraint, a very fine mousse, and a rose that is the house calling card.',
    t: 'Pale strawberry and cream, mousse like silk: the reference rose of Champagne',
    why: 'The house cited for temperature control as a style decision, and the owner of one of the region\'s few walled single-vineyard Champagnes.',
    wines: [
      { n: 'Brut Rosé', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the non-vintage rose used as the reference point for the style' },
      { n: 'Cuvée Nicolas François', grape: 'Pinot Noir and Chardonnay', note: 'the vintage prestige cuvee' },
      { n: 'Clos Saint-Hilaire', grape: 'Pinot Noir', note: 'a single walled vineyard blanc de noirs, first made in 1995' },
      { n: 'Le Blanc de Blancs', grape: 'Chardonnay', note: 'grand cru Chardonnay in the house\'s restrained register' }
    ],
    traps: [
      'Clos Saint-Hilaire is a blanc de noirs from Pinot Noir, not Chardonnay',
      'Mareuil-sur-Aÿ is premier cru, not grand cru'
    ]
  },
  {
    id: 'p-bollinger', p: 'Bollinger',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Aÿ (Vallée de la Marne)',
    founded: '1829',
    holdings: 'Large estate holdings weighted to Pinot Noir around Aÿ and Verzenay, with Chardonnay at Cuis, including two small ungrafted, pre-phylloxera Pinot Noir plots inside Aÿ.',
    style: 'Pinot Noir led, base wines fermented in old barrels, reserve wines held in magnum under cork: toast, red apple and a savoury weight.',
    t: 'Pinot-powered, barrel-fermented: toast, red apple, umami richness',
    why: 'The reference for barrel-fermented Champagne and for late disgorgement as a style. R.D. and Vieilles Vignes Francaises are both standard identification questions.',
    wines: [
      { n: 'Special Cuvée', grape: 'Pinot Noir led blend', note: 'the non-vintage that carries the barrel and reserve-magnum signature' },
      { n: 'La Grande Année', grape: 'Pinot Noir and Chardonnay', note: 'the vintage wine, entirely barrel fermented' },
      { n: 'R.D.', grape: 'Pinot Noir and Chardonnay', note: 'the same vintage wine held far longer on lees and disgorged late; R.D. is recemment degorge' },
      { n: 'Vieilles Vignes Françaises', grape: 'Pinot Noir', note: 'blanc de noirs from ungrafted vines propagated by layering, made in tiny quantity' }
    ],
    traps: [
      'R.D. means recently disgorged, not a vineyard or a separate blend',
      'Vieilles Vignes Francaises is ungrafted Pinot Noir, not old-vine Chardonnay',
      'Aÿ is a grand cru village, not a subregion'
    ]
  },
  {
    id: 'p-cedric-bouchard', p: 'Cédric Bouchard, Roses de Jeanne',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Celles-sur-Ource (Côte des Bar)',
    founded: '',
    holdings: 'A handful of very small parcels in the Côte des Bar, each bottled separately.',
    style: 'One parcel, one grape, one vintage, no dosage and very low yields: still-wine transparency with a gentle mousse.',
    t: 'One parcel, one year, no dosage: still-wine clarity with a whisper of foam',
    why: 'The purest statement of single-parcel Champagne, and the reason examiners ask about the Côte des Bar, the Aube district nearer Chablis than Reims.',
    wines: [
      { n: 'Les Ursules', grape: 'Pinot Noir', note: 'a single parcel blanc de noirs, the estate\'s best known bottling' },
      { n: 'La Bolorée', grape: 'Pinot Blanc', note: 'one of the rarer permitted varieties, from a single old parcel' },
      { n: 'Côte de Val Vilaine', grape: 'Pinot Noir', note: 'the most available of the parcels, and the way most candidates meet the house' }
    ],
    traps: [
      'The Côte des Bar is in the Aube on Kimmeridgian marl, not on the chalk of the Marne',
      'Pinot Blanc is one of the seven permitted varieties, not an error on the label',
      'These are vintage wines without dosage, so they are extremely sensitive to the year'
    ]
  },
  {
    id: 'p-charles-heidsieck', p: 'Charles Heidsieck',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Reims',
    founded: '1851',
    holdings: 'Chalk crayeres beneath Reims holding a very large stock of reserve wine.',
    style: 'Built on an unusually high proportion of long-aged reserve wines: nutty, savoury and mature-tasting while still young.',
    t: 'Old reserve wines doing the work: hazelnut, toffee, mushroom, mature in youth',
    why: 'The clearest teaching example of reserve wine as the driver of a non-vintage blend, and one third of the Heidsieck naming trap.',
    wines: [
      { n: 'Brut Réserve', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the non-vintage that examiners use to make the point about reserve wines' },
      { n: 'Blanc des Millénaires', grape: 'Chardonnay', note: 'the vintage blanc de blancs, released after very long ageing' },
      { n: 'Rosé Réserve', grape: 'Pinot Noir led', note: 'the rose built on the same reserve-heavy method' }
    ],
    traps: [
      'Three separate houses carry the name: Charles Heidsieck, Piper-Heidsieck and Heidsieck & Co Monopole',
      'Blanc des Millenaires is a vintage blanc de blancs, not the non-vintage'
    ]
  },
  {
    id: 'p-charles-joguet', p: 'Charles Joguet',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Chinon (Touraine)',
    founded: '1957',
    holdings: 'Parcels across Chinon including the Clos de la Dioterie, Les Varennes du Grand Clos and the Clos du Chene Vert.',
    style: 'Parcel-selected Cabernet Franc of fine tannin and perfume rather than weight, with restrained extraction.',
    t: 'The first man in Chinon to bottle by parcel: violets, pencil, fine tannin',
    why: 'Joguet introduced parcel-by-parcel vinification to Chinon, which is why examiners treat Chinon\'s soils rather than its villages as the useful distinction.',
    wines: [
      { n: 'Clos de la Dioterie', grape: 'Cabernet Franc', note: 'old vines on clay and limestone, the estate\'s longest-lived red' },
      { n: 'Les Varennes du Grand Clos', grape: 'Cabernet Franc', note: 'gravel terrace fruit, more open and perfumed' },
      { n: 'Clos du Chêne Vert', grape: 'Cabernet Franc', note: 'a walled limestone parcel on the slope' }
    ],
    traps: [
      'Chinon rouge is Cabernet Franc, with up to ten per cent Cabernet Sauvignon permitted; Chinon blanc is Chenin Blanc.',
      'Chinon\'s named parcels are estate lieux-dits, not classified crus'
    ]
  },
  {
    id: 'p-clos-rougeard', p: 'Clos Rougeard',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Saumur-Champigny (Anjou-Saumur)',
    founded: '',
    holdings: 'A small holding of old Cabernet Franc at Chace in Saumur-Champigny, plus Chenin on the Breze hill; farmed by the Foucault family for generations before the 2017 sale.',
    style: 'Barrel aged and unfiltered, with new oak reserved for Le Bourg: raspberry, graphite and a Burgundian texture from Cabernet Franc.',
    t: 'Cult Cabernet Franc: raspberry, graphite, Burgundian silk',
    why: 'The estate that proved Cabernet Franc could make a serious ageing wine, and the reference point for every Loire red that followed.',
    wines: [
      { n: 'Le Bourg', grape: 'Cabernet Franc', note: 'a single old parcel, the most structured of the three reds' },
      { n: 'Les Poyeux', grape: 'Cabernet Franc', note: 'the perfumed parcel, on sandier soil over tuffeau' },
      { n: 'Le Clos', grape: 'Cabernet Franc', note: 'the estate wine, and the wine most candidates will have tasted' },
      { n: 'Brézé', grape: 'Chenin Blanc', note: 'Saumur blanc from the limestone hill of Breze, barrel fermented' }
    ],
    traps: [
      'Le Bourg and Les Poyeux are separate parcels, not a village and cru hierarchy',
      'Saumur-Champigny is Cabernet Franc, not Cabernet Sauvignon',
      'Breze is a hill and a commune in Saumur, not a Saumur-Champigny red site'
    ]
  },
  {
    id: 'p-deutz', p: 'Deutz',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Aÿ (Vallée de la Marne)',
    founded: '1838',
    holdings: 'Estate vineyards around Aÿ and in the Côte des Blancs; part of the Louis Roederer group since 1993 but run and made separately.',
    style: 'Fine-boned and elegant rather than powerful, with restrained dosage.',
    t: 'Fine-boned Aÿ elegance: white peach, brioche, nothing raised in volume',
    why: 'An Aÿ house that answers the Pinot village with a light hand, and a reminder that ownership by another house does not merge the styles.',
    wines: [
      { n: 'Cuvée William Deutz', grape: 'Pinot Noir led', note: 'the vintage prestige cuvee in the Pinot register' },
      { n: 'Amour de Deutz', grape: 'Chardonnay', note: 'the blanc de blancs prestige cuvee' },
      { n: 'Brut Classic', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the non-vintage' }
    ],
    traps: [
      'Amour de Deutz is the blanc de blancs; Cuvee William Deutz is the Pinot-led wine',
      'Deutz is majority owned by Louis Roederer but is not made at Reims'
    ]
  },
  {
    id: 'p-didier-dagueneau', p: 'Didier Dagueneau',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Saint-Andelain, Pouilly-Fumé (Centre-Loire)',
    founded: '1982',
    holdings: 'Small parcels around Saint-Andelain on flint, limestone and clay, plus Les Jardins de Babylone in Jurançon in the southwest.',
    style: 'Very low yields, barrel fermentation and long lees ageing: Sauvignon Blanc of density and smoke rather than grass and herbs.',
    t: 'Gunflint and grapefruit at Grand Cru intensity, Sauvignon\'s outer limit',
    why: 'The producer who made Pouilly-Fumé a serious ageing wine, and the fastest route to the appellation trap the Court asks every year.',
    wines: [
      { n: 'Silex', grape: 'Sauvignon Blanc', note: 'from flint soils, the wine that redefined the ceiling for Sauvignon Blanc' },
      { n: 'Pur Sang', grape: 'Sauvignon Blanc', note: 'limestone and clay parcels, rounder than Silex' },
      { n: 'Buisson Renard', grape: 'Sauvignon Blanc', note: 'the most exotic of the range, from sandy clay' },
      { n: 'Les Jardins de Babylone', grape: 'Petit Manseng', note: 'sweet Jurançon, evidence that the estate\'s ideas travel beyond the Loire' }
    ],
    traps: [
      'Pouilly-Fumé is Loire Sauvignon Blanc; Pouilly-Fuissé is Mâconnais Chardonnay',
      'Silex names the flint soil, not a vineyard',
      'Pouilly-sur-Loire is a separate appellation on the same ground, made from Chasselas'
    ]
  },
  {
    id: 'p-domaine-de-lecu', p: 'Domaine de l\'Ecu',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Le Landreau, Muscadet Sèvre et Maine (Pays Nantais)',
    founded: '',
    holdings: 'Biodynamic Melon de Bourgogne at Le Landreau, with parcels bottled separately according to the bedrock beneath them.',
    style: 'Cuvees named for rock types, many made with little or no added sulphur: lean, salty and direct.',
    t: 'One grape, one village, three rocks: granite, gneiss and orthogneiss in glass',
    why: 'The clearest teaching example in France of soil-labelled cuvees from a single grape in a single village, and a standing argument against Muscadet as a cheap category.',
    wines: [
      { n: 'Granite', grape: 'Melon de Bourgogne', note: 'the ripest and roundest of the soil cuvees' },
      { n: 'Gneiss', grape: 'Melon de Bourgogne', note: 'the most floral of the three' },
      { n: 'Orthogneiss', grape: 'Melon de Bourgogne', note: 'the tightest and most saline, the estate\'s usual benchmark' }
    ],
    traps: [
      'The cuvee names are soil types, not vineyards or crus',
      'Muscadet is the appellation; Melon de Bourgogne is the grape'
    ]
  },
  {
    id: 'p-pepiere', p: 'Domaine de la Pépière',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Maisdon-sur-Sèvre, Muscadet Sèvre et Maine (Pays Nantais)',
    founded: '1984',
    holdings: 'Old-vine Melon de Bourgogne on granite at Maisdon-sur-Sevre, including the Clos des Briords, with parcels in the Clisson and Château-Thebaud cru communal zones.',
    style: 'Sur lie ageing taken far beyond the legal minimum: salt, citrus pith and a stony grip with no oak and no fruit gloss.',
    t: 'Granite Melon with years on its lees: lemon pith, salt, and real grip',
    why: 'The estate that made Muscadet serious again, and the way in to the cru communal system that sits above Muscadet Sevre et Maine.',
    wines: [
      { n: 'Clos des Briords', grape: 'Melon de Bourgogne', note: 'old vines on granite, the bottling that made Muscadet collectable' },
      { n: 'Muscadet Sèvre et Maine Sur Lie', grape: 'Melon de Bourgogne', note: 'the estate wine, and the clearest picture of what sur lie means' },
      { n: 'Clisson', grape: 'Melon de Bourgogne', note: 'a cru communal aged on lees for years before release' },
      { n: 'Château-Thébaud', grape: 'Melon de Bourgogne', note: 'a cru communal on gneiss, the most mineral of the range' }
    ],
    traps: [
      'Muscadet is made from Melon de Bourgogne, not from Muscat and not from a grape called Muscadet',
      'Cru communal wines such as Clisson and Gorges age far longer than the sur lie rules permit, so they never carry the words sur lie',
      'Sevre et Maine names two rivers, not two villages'
    ]
  },
  {
    id: 'p-taille-aux-loups', p: 'Domaine de la Taille aux Loups (Jacky Blot)',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Montlouis-sur-Loire (Touraine)',
    founded: '',
    holdings: 'Old-vine Chenin in Montlouis and Vouvray, plus Domaine de la Butte at Bourgueil for Cabernet Franc.',
    style: 'Barrel-fermented dry Chenin with weight and cut, alongside a sparkling wine made without added sugar at any stage.',
    t: 'Barrel-worked Chenin and a zero-everything petillant: ripe, cut, dry',
    why: 'Triple Zero is the standard illustration of the ancestral method in the Loire, and Blot links Montlouis Chenin to Bourgueil Cabernet Franc under one name.',
    wines: [
      { n: 'Rémus', grape: 'Chenin Blanc', note: 'barrel-fermented dry Montlouis from old vines' },
      { n: 'Triple Zero', grape: 'Chenin Blanc', note: 'petillant with no chaptalisation, no liqueur de tirage and no dosage, made by the ancestral method' },
      { n: 'Clos Michet', grape: 'Chenin Blanc', note: 'a single walled Montlouis parcel' },
      { n: 'Domaine de la Butte Bourgueil', grape: 'Cabernet Franc', note: 'the same owner\'s Bourgueil estate, bottled by slope position' }
    ],
    traps: [
      'Triple Zero is methode ancestrale: the first fermentation finishes in bottle, so there is no second fermentation',
      'Bourgueil and Saint-Nicolas-de-Bourgueil are two separate appellations'
    ]
  },
  {
    id: 'p-baumard', p: 'Domaine des Baumard',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Rochefort-sur-Loire (Anjou)',
    founded: '1955',
    holdings: 'Parcels in Savennières including Clos du Papillon, and holdings in Quarts de Chaume.',
    style: 'Technically precise and clean, with acidity preserved and sweetness carried lightly rather than heavily.',
    t: 'Anjou Chenin both ways: taut Savennières and lifted, clean Quarts de Chaume',
    why: 'The estate that carries both faces of Anjou Chenin, dry Savennières and sweet Quarts de Chaume, so it answers the appellation question from either side.',
    wines: [
      { n: 'Savennières Clos du Papillon', grape: 'Chenin Blanc', note: 'dry Chenin from one of the appellation\'s best known lieux-dits' },
      { n: 'Quarts de Chaume', grape: 'Chenin Blanc', note: 'the Loire\'s only grand cru, a small enclave inside Coteaux du Layon' },
      { n: 'Clos Sainte Catherine', grape: 'Chenin Blanc', note: 'Coteaux du Layon at moderate sweetness, a bridge between the dry and the botrytised styles' }
    ],
    traps: [
      'Quarts de Chaume Grand Cru sits inside Coteaux du Layon and is the Loire\'s only grand cru',
      'Clos du Papillon is a Savennières lieu-dit with more than one owner',
      'Bonnezeaux is the other great sweet enclave of the Layon, and it is not a grand cru'
    ]
  },
  {
    id: 'p-clos-naudin', p: 'Domaine du Clos Naudin (Philippe Foreau)',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Vouvray (Touraine)',
    founded: '',
    holdings: 'A small holding on the high plateau of Vouvray, on flinty clay over limestone.',
    style: 'Higher-toned and more severe than its neighbours, with long ageing before release and no compromise on acidity.',
    t: 'Vouvray at its most severe: quince, smoke, and acid you can lean on',
    why: 'With Huet, the pair that defines Vouvray in exam answers, and the estate that shows how long dry Chenin can live.',
    wines: [
      { n: 'Vouvray Sec', grape: 'Chenin Blanc', note: 'dry Vouvray at its most uncompromising' },
      { n: 'Vouvray Moelleux Réserve', grape: 'Chenin Blanc', note: 'botrytis-influenced sweet Chenin made only in suitable years' },
      { n: 'Goutte d\'Or', grape: 'Chenin Blanc', note: 'the sweetest bottling, made only in exceptional vintages' },
      { n: 'Pétillant', grape: 'Chenin Blanc', note: 'traditional-method sparkling from the same parcels' }
    ],
    traps: [
      'Goutte d\'Or here is a Vouvray cuvee, not the Meursault premier cru of the same name',
      'Clos Naudin is the domaine name; the appellation on the label is Vouvray'
    ]
  },
  {
    id: 'p-huet', p: 'Domaine Huet',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Vouvray (Touraine)',
    founded: '1928',
    holdings: 'Three parcels in Vouvray farmed biodynamically since the late 1980s: Le Haut-Lieu on clay over limestone, Le Mont on flinty clay, and the walled Clos du Bourg on thin soil over rock.',
    style: 'Chenin Blanc bottled parcel by parcel and sweetness by sweetness within the same vintage: quince, wool and beeswax over relentless acid.',
    t: 'Chenin across all sweetness: quince, wool, beeswax, razor acid',
    why: 'The reference estate for Chenin Blanc, and the cleanest way to teach that one vineyard yields sec, demi-sec and moelleux depending on the year and the picking.',
    wines: [
      { n: 'Le Mont Sec', grape: 'Chenin Blanc', note: 'the flintiest and most tightly wound of the three parcels' },
      { n: 'Clos du Bourg Moelleux', grape: 'Chenin Blanc', note: 'the walled parcel on the thinnest soil, the estate\'s most concentrated sweet wine' },
      { n: 'Le Haut-Lieu Demi-Sec', grape: 'Chenin Blanc', note: 'the softest parcel, and the standard teaching example of demi-sec' },
      { n: 'Pétillant', grape: 'Chenin Blanc', note: 'traditional-method sparkling Vouvray, aged long on lees' }
    ],
    traps: [
      'Sec, demi-sec and moelleux are styles, not vineyard tiers',
      'Vouvray petillant is traditional method, not petillant naturel',
      'The three parcels are lieux-dits in Vouvray, not separate appellations'
    ]
  },
  {
    id: 'p-marcel-deiss', p: 'Domaine Marcel Deiss',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Bergheim (Haut-Rhin)',
    founded: '1947',
    holdings: 'Parcels across Bergheim and neighbouring villages, many co-planted with several varieties in the same rows, including the Altenberg de Bergheim, Schoenenbourg and Mambourg grands crus.',
    style: 'Field blends picked and fermented together and labelled by place rather than grape, frequently with some residual sugar.',
    t: 'Varieties co-planted and picked together: place before grape, on purpose',
    why: 'Jean-Michel Deiss fought for the right to label Alsace by site instead of variety. He is the counter-argument to varietal labelling and the reason the blended grands crus are examinable.',
    wines: [
      { n: 'Altenberg de Bergheim', grape: 'co-planted field blend', note: 'the grand cru whose rules were changed to allow the blend Deiss argued for' },
      { n: 'Schoenenbourg', grape: 'co-planted field blend', note: 'the Riquewihr grand cru, celebrated long before the modern classification' },
      { n: 'Mambourg', grape: 'co-planted field blend', note: 'warm marl and limestone at Sigolsheim' },
      { n: 'Burg', grape: 'co-planted field blend', note: 'a lieu-dit bottling that introduces the estate\'s argument at village level' }
    ],
    traps: [
      'Alsace normally labels by variety and by law is 100 per cent of the named grape; Deiss deliberately does not',
      'Altenberg de Bergheim and Kaefferkopf are the grands crus permitting blends, and Zotzenberg permits Sylvaner',
      'Complantation means co-planting in the vineyard, not blending in the cellar'
    ]
  },
  {
    id: 'p-ostertag', p: 'Domaine Ostertag',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Epfig (Bas-Rhin)',
    founded: '1966',
    holdings: 'Biodynamic parcels around Epfig in the Bas-Rhin, with Riesling in the Muenchberg grand cru.',
    style: 'Burgundian handling, including barrel for Pinot Gris, organised by the estate into three self-declared families of wine.',
    t: 'Burgundian hands in the Bas-Rhin: barrel-touched Pinot Gris, Muenchberg Riesling',
    why: 'The best known Bas-Rhin estate, which matters because candidates default to the Haut-Rhin, and an early user of barrel in a region that resisted it.',
    wines: [
      { n: 'Muenchberg Riesling', grape: 'Riesling', note: 'a volcanic sandstone grand cru in the Bas-Rhin' },
      { n: 'Fronholz Riesling', grape: 'Riesling', note: 'a lieu-dit at Epfig, the estate\'s home slope' },
      { n: 'Pinot Gris Zellberg', grape: 'Pinot Gris', note: 'barrel-influenced Pinot Gris, once controversial in an unoaked region' }
    ],
    traps: [
      'Muenchberg is a grand cru in the Bas-Rhin, not the Haut-Rhin',
      'The estate\'s categories of fruit, stone and time are its own, not a legal scale',
      'Epfig is a village; Fronholz is a lieu-dit, not a grand cru'
    ]
  },
  {
    id: 'p-schoffit', p: 'Domaine Schoffit',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Colmar (Haut-Rhin)',
    founded: '',
    holdings: 'The Clos Saint-Theobald in the Rangen de Thann grand cru, plus the sandy Harth terraces near Colmar.',
    style: 'Very ripe and powerful wines from volcanic Rangen, alongside unusually serious wines from humble varieties on the Harth.',
    t: 'Volcanic Rangen at Clos Saint-Theobald: smoke, stone fruit, enormous length',
    why: 'One of the two estates that dominate the Rangen, the volcanic amphitheatre at Thann that is Alsace\'s steepest and southernmost grand cru.',
    wines: [
      { n: 'Rangen de Thann Clos Saint-Théobald Riesling', grape: 'Riesling', note: 'volcanic soil on the steepest slope in Alsace' },
      { n: 'Clos Saint-Théobald Pinot Gris', grape: 'Pinot Gris', note: 'the smoky, powerful face of Rangen' },
      { n: 'Harth Chasselas Vieilles Vignes', grape: 'Chasselas', note: 'old-vine Chasselas, a variety the region otherwise treats as an afterthought' }
    ],
    traps: [
      'Rangen de Thann holds two clos: Clos Saint Urbain (Zind-Humbrecht) and Clos Saint-Theobald (Schoffit)',
      'Chasselas is permitted in Alsace but may not be used for grand cru'
    ]
  },
  {
    id: 'p-vacheron', p: 'Domaine Vacheron',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Sancerre (Centre-Loire)',
    founded: '',
    holdings: 'A substantial biodynamic holding around the town of Sancerre, on caillottes limestone, terres blanches marl and silex.',
    style: 'Precise Sauvignon and seriously made Pinot Noir from the same estate, with whole bunches and older barrels for the reds.',
    t: 'Sancerre in both colours: silex-smoked white, whole-bunch Pinot red',
    why: 'The reference for Sancerre rouge, which the Court expects a candidate to name as Pinot Noir without hesitating.',
    wines: [
      { n: 'Les Romains', grape: 'Sauvignon Blanc', note: 'a silex parcel, the smokiest and longest-lived of the whites' },
      { n: 'Guigne-Chèvres', grape: 'Sauvignon Blanc', note: 'a single limestone parcel, barrel fermented' },
      { n: 'Belle Dame', grape: 'Pinot Noir', note: 'the estate\'s top red, and the standard answer for serious Sancerre rouge' },
      { n: 'Sancerre Blanc', grape: 'Sauvignon Blanc', note: 'the estate wine, the clearest picture of Sancerre limestone' }
    ],
    traps: [
      'Sancerre rouge and rose are Pinot Noir, not Cabernet Franc',
      'Silex gives smoke and length; caillottes limestone gives the lighter, earlier style'
    ]
  },
  {
    id: 'p-weinbach', p: 'Domaine Weinbach',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Kaysersberg (Haut-Rhin)',
    founded: 'the Faller family bought the walled Clos des Capucins in 1898',
    holdings: 'The walled Clos des Capucins at the foot of the Schlossberg, with parcels in the Schlossberg, Furstentum and Mambourg grands crus and the Altenbourg lieu-dit.',
    style: 'Rich and perfumed, biodynamic, with a long tradition of cuvees named for members of the family rather than for sites.',
    t: 'Perfume and richness from the Schlossberg foot: rose, apricot, family cuvees',
    why: 'One of the two or three estates that define the rich, aromatic side of Alsace, and a useful reminder that cuvee names here are often family names.',
    wines: [
      { n: 'Riesling Schlossberg', grape: 'Riesling', note: 'granite from the first Alsace grand cru, delimited in 1975' },
      { n: 'Riesling Cuvée Sainte Catherine', grape: 'Riesling', note: 'Riesling from the Schlossberg, named for Saint Catherine\'s day and made from later-picked fruit.' },
      { n: 'Gewürztraminer Furstentum', grape: 'Gewürztraminer', note: 'limestone at Kientzheim, the estate\'s most aromatic grand cru wine' },
      { n: 'Pinot Gris Altenbourg', grape: 'Pinot Gris', note: 'a lieu-dit rather than a grand cru, often bottled as Vendange Tardive' }
    ],
    traps: [
      'Cuvee Theo, Cuvée Laurence and Cuvee Sainte Catherine are house names, not vineyards',
      'Schlossberg was the first Alsace grand cru, delimited in 1975; the other fifty followed later',
      'Altenbourg is a lieu-dit, not a grand cru'
    ]
  },
  {
    id: 'p-zind-humbrecht', p: 'Domaine Zind-Humbrecht',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Turckheim (Haut-Rhin)',
    founded: '1959',
    holdings: 'Biodynamic parcels in the Rangen de Thann, Brand, Hengst and Goldert grands crus, plus the walled Clos Windsbuhl, Clos Jebsal and Clos Hauserer.',
    style: 'Very low yields, whole-cluster pressing and long native-yeast ferments in old foudres, often stopping with residual sugar: rich, oily and concentrated.',
    t: 'Volcanic Rangen to walled Windsbuhl: oily, low-yield, unmistakably concentrated',
    why: 'Olivier Humbrecht was the first French Master of Wine, and the estate prints its own sweetness index: the answer when an examiner asks how Alsace addressed sweetness ambiguity before the law did.',
    wines: [
      { n: 'Rangen de Thann Clos Saint Urbain Riesling', grape: 'Riesling', note: 'volcanic soil on Alsace\'s steepest and southernmost grand cru' },
      { n: 'Clos Windsbuhl Riesling', grape: 'Riesling', note: 'a high, cool limestone clos at Hunawihr, slow to ripen and slow to open' },
      { n: 'Clos Jebsal Pinot Gris', grape: 'Pinot Gris', note: 'a warm gypsum amphitheatre that regularly yields Vendange Tardive' },
      { n: 'Hengst Gewürztraminer', grape: 'Gewürztraminer', note: 'marl and limestone at Wintzenheim, the estate\'s most powerful Gewürztraminer' }
    ],
    traps: [
      'The printed index is the estate\'s own scale, not a legal category',
      'Rangen is at Thann, volcanic, and the southernmost grand cru, not a Colmar site',
      'A wine can be grand cru and still finish sweet: the cru says nothing about residual sugar.'
    ]
  },
  {
    id: 'p-schlumberger', p: 'Domaines Schlumberger',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Guebwiller (Haut-Rhin)',
    founded: '1810',
    holdings: 'The largest single estate in Alsace, holding substantial parts of the Kitterle, Saering, Kessler and Spiegel grands crus above Guebwiller, much of it on hand-built terraces.',
    style: 'Southern Alsace at scale: ripe and broad, with noticeable sweetness in the Pinot Gris and Gewürztraminer.',
    t: 'Four grands crus above one town, terraced by hand: broad, ripe, southern',
    why: 'Four grands crus sit above one town and one estate dominates all four: the clearest case that a cru is a place a producer can dominate without owning it outright.',
    wines: [
      { n: 'Kitterlé Riesling', grape: 'Riesling', note: 'sandstone terraces on the steepest of the four Guebwiller crus' },
      { n: 'Saering Riesling', grape: 'Riesling', note: 'marl and sandstone, the most elegant of the estate\'s Rieslings' },
      { n: 'Kessler Gewürztraminer', grape: 'Gewürztraminer', note: 'a warm, sheltered cru giving the estate\'s richest aromatic wine' },
      { n: 'Les Princes Abbés', grape: 'varietal range', note: 'the village-level range that carries the house style at volume' }
    ],
    traps: [
      'Guebwiller\'s four grands crus are Kitterle, Saering, Kessler and Spiegel',
      'Dominating a grand cru does not make it a brand: any owner within the boundary may use the name'
    ]
  },
  {
    id: 'p-edmond-vatan', p: 'Edmond Vatan',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Chavignol, Sancerre (Centre-Loire)',
    founded: '',
    holdings: 'A very small holding on the Kimmeridgian marl of Les Monts Damnés at Chavignol.',
    style: 'Late picked, fermented slowly and held for years before release, with no new oak: Sancerre built like a white Burgundy.',
    t: 'Chalk marl, lemon oil and smoke: the Sancerre that refuses to taste like Sancerre',
    why: 'The benchmark for Sancerre as a wine that ages, and the proof that Chavignol\'s marl behaves differently from the caillottes limestone nearer the town.',
    wines: [
      { n: 'Clos la Néore', grape: 'Sauvignon Blanc', note: 'the estate\'s single wine, from the steep marl of Les Monts Damnés' }
    ],
    traps: [
      'Les Monts Damnés is a lieu-dit at Chavignol, not a separate appellation',
      'Sancerre\'s three soils, caillottes, terres blanches and silex, give three different styles from one grape'
    ]
  },
  {
    id: 'p-egly-ouriet', p: 'Egly-Ouriet',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Ambonnay (Montagne de Reims)',
    founded: '',
    holdings: 'Grand cru Pinot Noir at Ambonnay, Bouzy and Verzenay, with Meunier from Vrigny in the Petite Montagne.',
    style: 'Very ripe Pinot, long lees ageing well beyond the legal minimum, low dosage: powerful, savoury, almost red-fruited.',
    t: 'Ambonnay Pinot at full ripeness: red apple, smoke, years on its lees',
    why: 'The reference grower for Montagne de Reims Pinot Noir, and a convenient way in to Coteaux Champenois and Rosé des Riceys as the region\'s still appellations.',
    wines: [
      { n: 'Les Crayères Vieilles Vignes', grape: 'Pinot Noir', note: 'a blanc de noirs from an old-vine parcel at Ambonnay' },
      { n: 'Brut Tradition Grand Cru', grape: 'Pinot Noir and Chardonnay', note: 'the house wine, aged far longer than the fifteen-month minimum' },
      { n: 'Ambonnay Rouge', grape: 'Pinot Noir', note: 'still red wine under Coteaux Champenois, the appellation for the region\'s non-sparkling wines' }
    ],
    traps: [
      'Les Crayeres here is a lieu-dit at Ambonnay, not the chalk cellars of Reims',
      'Still wine from Champagne is Coteaux Champenois, not Champagne'
    ]
  },
  {
    id: 'p-francois-chidaine', p: 'François Chidaine',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Montlouis-sur-Loire (Touraine)',
    founded: '',
    holdings: 'Biodynamic Chenin across Montlouis-sur-Loire, with a separate holding of parcels in Vouvray.',
    style: 'Dry Chenin of great precision, lees aged and bottled by parcel, with restrained sweetness even in rich years.',
    t: 'Montlouis answering Vouvray: pear skin, chalk, dry Chenin with no padding',
    why: 'Montlouis is Vouvray\'s mirror across the river with the same grape and the same styles. Chidaine is the name that made the appellation examinable.',
    wines: [
      { n: 'Les Bournais', grape: 'Chenin Blanc', note: 'a flinty Montlouis parcel, the estate\'s most structured dry wine' },
      { n: 'Clos du Breuil', grape: 'Chenin Blanc', note: 'limestone parcel giving the tightest and most saline of the dry wines' },
      { n: 'Les Choisilles', grape: 'Chenin Blanc', note: 'the approachable dry Montlouis that introduces the appellation' },
      { n: 'Montlouis Pétillant', grape: 'Chenin Blanc', note: 'traditional-method sparkling, a large part of the appellation\'s output' }
    ],
    traps: [
      'Montlouis-sur-Loire lies between the Cher and the Loire on the south bank; Vouvray is on the north bank',
      'Montlouis makes no sweet wine of the Layon type: its sweetness ladder is the Vouvray one'
    ]
  },
  {
    id: 'p-francois-cotat', p: 'François Cotat',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Chavignol, Sancerre (Centre-Loire)',
    founded: '',
    holdings: 'Steep Kimmeridgian parcels at Chavignol: Les Monts Damnés, Le Cul de Beaujeu and La Grande Cote.',
    style: 'Picked very ripe and fermented with native yeasts, sometimes finishing with a trace of sugar: dense, slow-developing Sancerre.',
    t: 'Picked ripe on Chavignol\'s marl: pear, smoke, and a decade of patience',
    why: 'One half of the Cotat pair, and the standard example that Sancerre is not always lean, herbaceous or bone dry.',
    wines: [
      { n: 'Les Monts Damnés', grape: 'Sauvignon Blanc', note: 'the steepest marl slope, the estate\'s most famous parcel' },
      { n: 'Le Cul de Beaujeu', grape: 'Sauvignon Blanc', note: 'a west-facing parcel, firmer and later to open' },
      { n: 'La Grande Côte', grape: 'Sauvignon Blanc', note: 'the highest of the three, the most tightly wound' }
    ],
    traps: [
      'Francois Cotat and Pascal Cotat are cousins running separate estates on family parcels',
      'Cotat wines can carry residual sugar, so the appellation is not a guarantee of dryness'
    ]
  },
  {
    id: 'p-gosset', p: 'Gosset',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Aÿ, now Épernay',
    founded: '1584',
    holdings: '',
    style: 'Malolactic fermentation is blocked across the range: high acid, citrus peel and a firm, long finish.',
    t: 'Malolactic blocked: lemon peel, quince and an acid line that will not quit',
    why: 'The oldest wine house in Champagne, founded in 1584 as a still-wine producer, and the standard example of a house that blocks malolactic fermentation.',
    wines: [
      { n: 'Grande Réserve', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the non-vintage that carries the no-malolactic signature' },
      { n: 'Celebris Extra Brut', grape: 'Chardonnay and Pinot Noir', note: 'the vintage prestige cuvee at very low dosage' },
      { n: 'Grand Millésime', grape: 'Chardonnay and Pinot Noir', note: 'the declared vintage wine' }
    ],
    traps: [
      'Ruinart is the oldest Champagne house; Gosset is the oldest wine house but began with still wine',
      'Gosset is not Gosset-Brabant, a separate grower at Aÿ'
    ]
  },
  {
    id: 'p-hugel', p: 'Hugel & Fils',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Riquewihr (Haut-Rhin)',
    founded: '1639',
    holdings: 'Estate vineyards around Riquewihr, including parcels on the Schoenenbourg and Sporen grand cru slopes.',
    style: 'Dry and classical at the top of the range, with a long history of late-harvest and botrytis wines.',
    t: 'Dry classicism at Riquewihr, and the house that wrote VT and SGN into law',
    why: 'Johnny Hugel led the campaign that wrote Vendanges Tardives and Sélection de Grains Nobles into French law in 1984. The house is the standard citation for both categories.',
    wines: [
      { n: 'Schoelhammer', grape: 'Riesling', note: 'a single parcel on the Schoenenbourg slope, released only in selected years' },
      { n: 'Jubilee Riesling', grape: 'Riesling', note: 'the long-standing dry flagship from the Schoenenbourg slope' },
      { n: 'Vendange Tardive', grape: 'Riesling, Pinot Gris or Gewürztraminer', note: 'late harvest, and the category Hugel campaigned to have defined' },
      { n: 'Sélection de Grains Nobles', grape: 'Riesling, Pinot Gris or Gewürztraminer', note: 'botrytis-affected and always sweet, the top of the legal ladder' }
    ],
    traps: [
      'Vendange Tardive can finish nearly dry; Sélection de Grains Nobles is always sweet',
      'Hugel long declined to print grand cru even for wines from Schoenenbourg and Sporen',
      'VT and SGN carry minimum must weights by variety: the terms are legal, not descriptive'
    ]
  },
  {
    id: 'p-jacques-selosse', p: 'Jacques Selosse',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Avize (Côte des Blancs)',
    founded: '',
    holdings: 'A small holding across Avize, Cramant and Oger, with Pinot Noir villages including Aÿ, Ambonnay and Mareuil-sur-Aÿ.',
    style: 'Low yields, barrel fermentation, long lees ageing and little or no dosage: oxidative, vinous, closer to Burgundy than to a grande marque.',
    t: 'Sherry-kissed, vinous, polarizing: the grower movement\'s prophet',
    why: 'The name the Court reaches for when it asks who changed grower Champagne. Anselme Selosse trained in Burgundy and brought its handling of wine back to Avize.',
    wines: [
      { n: 'Substance', grape: 'Chardonnay', note: 'a solera of Avize Chardonnay, so it carries no vintage at all' },
      { n: 'Initial', grape: 'Chardonnay', note: 'the grand cru blanc de blancs that introduces the house style' },
      { n: 'Lieux-dits series', grape: 'Chardonnay or Pinot Noir', note: 'single parcels bottled under their own names, the clearest statement of grower thinking' },
      { n: 'V.O. Version Originale', grape: 'Chardonnay', note: 'extra brut blanc de blancs from the Côte des Blancs grand crus' }
    ],
    traps: [
      'Substance is a solera and therefore carries no vintage',
      'Selosse is a récoltant-manipulant, but RM is a label code and not a quality tier',
      'Avize is grand cru; the estate\'s Pinot villages are separate holdings'
    ]
  },
  {
    id: 'p-jacquesson', p: 'Jacquesson',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Dizy (Vallée de la Marne)',
    founded: '1798',
    holdings: 'Estate vineyards at Dizy, Aÿ, Hautvillers, Avize and Oiry.',
    style: 'Barrel fermented, low dosage, with the aim of the best possible blend each year rather than a repeated house taste.',
    t: 'A new number every year: barrel spice, apple skin, dosage barely there',
    why: 'The house that abandoned a repeatable non-vintage in favour of one numbered cuvee per base year: the standard exam example of the argument against house style.',
    wines: [
      { n: 'Cuvée numbered series', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'each release carries a number, the series beginning at 728 with the 2000 base year' },
      { n: 'Avize Champ Cain', grape: 'Chardonnay', note: 'a single Côte des Blancs parcel bottled alone' },
      { n: 'Dizy Corne Bautray', grape: 'Chardonnay', note: 'a single parcel on gravel over chalk at Dizy' },
      { n: 'Aÿ Vauzelle Terme', grape: 'Pinot Noir', note: 'a single Aÿ parcel, blanc de noirs' }
    ],
    traps: [
      'The number on the label counts cuvees, it is not a vintage or a dosage figure',
      'Dizy is premier cru, not grand cru'
    ]
  },
  {
    id: 'p-krug', p: 'Krug',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Reims',
    founded: '1843',
    holdings: 'Owns the walled Clos du Mesnil at Le Mesnil-sur-Oger and Clos d\'Ambonnay, and buys from a very wide grower network.',
    style: 'Every base wine ferments in small old oak casks and a large library of reserve wines is blended back: weight, nuttiness and length rather than lightness.',
    t: 'Oxidative depth: brioche, hazelnut, dried citrus, endless mousse',
    why: 'Krug is the house that argues for oak and reserve wine rather than a single site. The Court wants Grande Cuvée identified as a multi-vintage blend and the two clos separated by grape and village.',
    wines: [
      { n: 'Grande Cuvée', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'a multi-vintage blend rebuilt each year from more than a hundred wines, edition numbered on the back' },
      { n: 'Clos du Mesnil', grape: 'Chardonnay', note: 'one walled vineyard, one village, one vintage: the blending house\'s single wine of place' },
      { n: 'Clos d\'Ambonnay', grape: 'Pinot Noir', note: 'the tiny Pinot counterpart to Clos du Mesnil, first made in 1995' },
      { n: 'Krug Vintage', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'declared vintages made in the same oak regime as the Grande Cuvée' }
    ],
    traps: [
      'Clos du Mesnil is Chardonnay, Clos d\'Ambonnay is Pinot Noir',
      'Grande Cuvée is not vintage Champagne even though it is aged like one',
      'Krug is an NM house despite owning two walled vineyards'
    ]
  },
  {
    id: 'p-larmandier-bernier', p: 'Larmandier-Bernier',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Vertus (Côte des Blancs)',
    founded: '',
    holdings: 'Biodynamic Chardonnay at Vertus, with grand cru parcels at Cramant, Chouilly, Avize and Oger.',
    style: 'Long, slow fermentations with indigenous yeasts and minimal or zero dosage: taut, dry and insistent.',
    t: 'Vertus chalk, native yeast, little or no dosage: taut, dry, insistent',
    why: 'A leading biodynamic grower and one of the clearest cases for zero dosage as a statement about ripeness rather than fashion.',
    wines: [
      { n: 'Terre de Vertus', grape: 'Chardonnay', note: 'premier cru Vertus, non dose, the estate\'s argument for no sugar at all' },
      { n: 'Vieille Vigne du Levant', grape: 'Chardonnay', note: 'old vines in the Cramant grand cru' },
      { n: 'Longitude', grape: 'Chardonnay', note: 'the Côte des Blancs blanc de blancs that introduces the house' }
    ],
    traps: [
      'Vertus is premier cru, not grand cru, and sits on different chalk from Le Mesnil',
      'Non dose and brut nature mean the same thing: no sugar added at disgorgement'
    ]
  },
  {
    id: 'p-laurent-perrier', p: 'Laurent-Perrier',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Tours-sur-Marne',
    founded: '1812',
    holdings: '',
    style: 'No oak anywhere in the range: stainless steel, Chardonnay-leaning, clean and bright.',
    t: 'Steel only, no oak: lemon pith, white flowers, and a macerated rose',
    why: 'Grand Siècle is the prestige cuvee that is multi-vintage on purpose, and the Cuvée Rosé is the maceration answer in the one region where blending rose is permitted.',
    wines: [
      { n: 'Grand Siècle', grape: 'Chardonnay and Pinot Noir', note: 'a prestige cuvee deliberately blended from several declared vintages of grand cru fruit' },
      { n: 'Cuvée Rosé', grape: 'Pinot Noir', note: 'made by skin maceration rather than blending, which is unusual in a region where blending rose is legal' },
      { n: 'Ultra Brut', grape: 'Chardonnay and Pinot Noir', note: 'a zero dosage wine launched in 1981, well before the modern fashion' },
      { n: 'La Cuvée', grape: 'Chardonnay dominant', note: 'the Chardonnay-led non-vintage' }
    ],
    traps: [
      'Grand Siècle is multi-vintage by design, not an undeclared vintage wine',
      'Laurent-Perrier rose is macerated, not blended, even though blending is legal here'
    ]
  },
  {
    id: 'p-leon-beyer', p: 'Léon Beyer',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Eguisheim (Haut-Rhin)',
    founded: '1867',
    holdings: 'Estate vineyards around Eguisheim, including parcels on the Eichberg and Pfersigberg grand cru slopes.',
    style: 'Uncompromisingly dry, built for the table, and released with several years of bottle age.',
    t: 'Austere, late-released Eguisheim: dry Gewürztraminer that goes with food',
    why: 'With Trimbach, the other house that built its name on dryness and on declining to print grand cru: together they are the standard illustration of that argument.',
    wines: [
      { n: 'Riesling Comtes d\'Eguisheim', grape: 'Riesling', note: 'the dry flagship, from grand cru slopes but not labelled as such' },
      { n: 'Gewürztraminer Comtes d\'Eguisheim', grape: 'Gewürztraminer', note: 'fully dry Gewürztraminer, which is uncommon anywhere' },
      { n: 'Riesling Les Ecaillers', grape: 'Riesling', note: 'the step below the Comtes bottling, in the same severe style' }
    ],
    traps: [
      'Comtes d\'Eguisheim is a house cuvee, not an appellation or a grand cru',
      'Eguisheim\'s grands crus are Eichberg and Pfersigberg, and neither name appears on the flagships'
    ]
  },
  {
    id: 'p-louis-roederer', p: 'Louis Roederer',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Reims',
    founded: '1776',
    holdings: 'One of the largest estate vineyard holdings of any house, a substantial part farmed biodynamically; Cristal is drawn only from estate parcels.',
    style: 'Ripe estate fruit held on a tight line, some oak, low dosage: a house that tastes like a domaine.',
    t: 'Ripe estate fruit on a tight line: citrus oil, pastry, low dosage',
    why: 'The house that farms an unusually high proportion of its own fruit among the grandes marques, and the maker of Cristal, which the Court pairs with Dom Perignon as the prestige cuvee to define.',
    wines: [
      { n: 'Cristal', grape: 'Pinot Noir and Chardonnay', note: 'created in 1876 for Tsar Alexander II, in a clear flat-bottomed bottle; always vintage' },
      { n: 'Cristal Rosé', grape: 'Pinot Noir and Chardonnay', note: 'the rose version, made in far smaller quantity' },
      { n: 'Collection', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the numbered multi-vintage release that replaced Brut Premier' },
      { n: 'Blanc de Blancs Vintage', grape: 'Chardonnay', note: 'Côte des Blancs fruit, vintage dated' }
    ],
    traps: [
      'Cristal is always vintage: there is no non-vintage version',
      'The clear flat-bottomed bottle is historical, made for the Tsar, not a marketing device',
      'Louis Roederer is separate from Roederer Estate in California'
    ]
  },
  {
    id: 'p-moet-chandon', p: 'Moët & Chandon',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Épernay',
    founded: '1743',
    holdings: 'The largest vineyard holdings in Champagne, spread across most of the grand and premier cru villages.',
    style: 'Built for consistency at enormous volume: apple, pastry and a soft, approachable mousse.',
    t: 'The house taste of Champagne: apple, pastry, soft mousse, made by the million',
    why: 'The volume benchmark and the owner of Dom Perignon. Examiners use it to separate a house brand from its prestige cuvee and to open the question of holdings and ownership.',
    wines: [
      { n: 'Dom Pérignon', grape: 'Chardonnay and Pinot Noir', note: 'the prestige cuvee, always vintage, released again later as P2 and P3' },
      { n: 'Moët Impérial', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the non-vintage that sets the world\'s reference for house style at scale' },
      { n: 'Grand Vintage', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the declared vintage wine under the Moët name' }
    ],
    traps: [
      'Dom Perignon is a cuvee, not a separate historic estate',
      'Brut Imperial is the non-vintage, not a vintage wine',
      'Dom Perignon is always vintage dated'
    ]
  },
  {
    id: 'p-nicolas-joly', p: 'Nicolas Joly, Coulée de Serrant',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Savennières (Anjou)',
    founded: '',
    holdings: 'Owns the whole of Savennières Coulée de Serrant, an appellation of about seven hectares held by a single estate, plus Clos de la Bergerie in Savennières Roche aux Moines.',
    style: 'Biodynamic and deliberately oxidative, with long ageing on the lees: dry Chenin showing honey and camomile without any sugar.',
    t: 'Bruised quince and camomile from a monastic slope: dry Chenin like nothing else',
    why: 'One of the very few French appellations owned outright by a single producer, and the flagbearer of biodynamic viticulture. The Court also uses it to insist that Savennières is dry.',
    wines: [
      { n: 'Coulée de Serrant', grape: 'Chenin Blanc', note: 'a steep schist amphitheatre above the Loire, planted by Cistercian monks in 1130' },
      { n: 'Clos de la Bergerie', grape: 'Chenin Blanc', note: 'from Savennières Roche aux Moines, a separate appellation next door' },
      { n: 'Les Vieux Clos', grape: 'Chenin Blanc', note: 'the Savennières bottling that introduces the house style' }
    ],
    traps: [
      'Savennières Coulée de Serrant is its own appellation, owned entirely by one estate',
      'Savennières is dry Chenin; Coteaux du Layon across the river is sweet',
      'Savennières Roche aux Moines is a separate appellation, not a lieu-dit inside Coulée de Serrant'
    ]
  },
  {
    id: 'p-perrier-jouet', p: 'Perrier-Jouët',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Épernay',
    founded: '1811',
    holdings: 'Estate vineyards weighted to Côte des Blancs Chardonnay, notably at Cramant and Avize.',
    style: 'Chardonnay-led, light and floral, built for delicacy rather than power.',
    t: 'Anemone glass and white flowers: Chardonnay-led Champagne at its most delicate',
    why: 'Belle Epoque is one of the named prestige cuvees a candidate is expected to place with its house, and the anemone bottle is its identification shortcut.',
    wines: [
      { n: 'Belle Époque', grape: 'Chardonnay led blend', note: 'the prestige cuvee in the enamelled anemone bottle, the decoration designed by Emile Galle in 1902' },
      { n: 'Grand Brut', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the floral non-vintage' },
      { n: 'Blason Rosé', grape: 'Pinot Noir and Chardonnay', note: 'the house rose' }
    ],
    traps: [
      'Belle Epoque is sold as Fleur de Champagne in some markets: it is the same wine',
      'The painted anemones date from 1902, long before the cuvee itself'
    ]
  },
  {
    id: 'p-philipponnat', p: 'Philipponnat',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Mareuil-sur-Aÿ',
    founded: '1910',
    holdings: 'Owns the Clos des Goisses, a very steep south-facing chalk slope above the Marne at Mareuil-sur-Aÿ, acquired in 1935.',
    style: 'Pinot dominant, partly barrel fermented, low dosage, with malolactic used selectively.',
    t: 'One steep chalk face above the Marne: ripe Pinot, smoke, bone-dry finish',
    why: 'Clos des Goisses is the answer to name a single-vineyard Champagne, and the slope is the region\'s steepest and ripest site.',
    wines: [
      { n: 'Clos des Goisses', grape: 'Pinot Noir with Chardonnay', note: 'the first Champagne bottled and sold as a single vineyard, from 1935' },
      { n: 'Royale Réserve', grape: 'Pinot Noir led blend', note: 'the Pinot-weighted non-vintage' },
      { n: 'Cuvée 1522', grape: 'Pinot Noir and Chardonnay', note: 'vintage grand cru wine named for the family\'s arrival at Aÿ' }
    ],
    traps: [
      'Clos des Goisses is a lieu-dit owned by Philipponnat, not an appellation',
      'It is not a blanc de noirs: Chardonnay is part of the blend'
    ]
  },
  {
    id: 'p-pierre-peters', p: 'Pierre Peters',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Le Mesnil-sur-Oger (Côte des Blancs)',
    founded: '',
    holdings: 'Chardonnay in the grand crus of the Côte des Blancs, including old vines in the Les Chetillons lieu-dit at Le Mesnil-sur-Oger.',
    style: 'Pure Chardonnay in stainless steel with no oak, fed by a perpetual reserve: chalk, citrus and salt.',
    t: 'Le Mesnil without oak: lime, oyster shell, and a perpetual reserve\'s depth',
    why: 'A leading récoltant-manipulant in the most famous Chardonnay village, and a clean example of a perpetual reserve as an alternative to vintage declaration.',
    wines: [
      { n: 'Cuvée de Réserve Blanc de Blancs', grape: 'Chardonnay', note: 'the grand cru non-vintage built on the perpetual reserve' },
      { n: 'Cuvée Spéciale Les Chétillons', grape: 'Chardonnay', note: 'a single lieu-dit at Le Mesnil, vintage dated, the estate\'s benchmark' },
      { n: 'Réserve Oubliée', grape: 'Chardonnay', note: 'drawn from the older layers of the perpetual reserve' }
    ],
    traps: [
      'Les Chetillons is a lieu-dit inside Le Mesnil-sur-Oger, not an appellation',
      'A perpetual reserve is a solera in practice, so the wine cannot be vintage dated'
    ]
  },
  {
    id: 'p-pol-roger', p: 'Pol Roger',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Épernay',
    founded: '1849',
    holdings: 'Estate vineyards across the Côte des Blancs, Vallée de la Marne and Montagne de Reims, with unusually deep and cold cellars beneath Epernay.',
    style: 'Poised and floral rather than powerful, hand riddled, with cold cellars that slow the ageing and keep the mousse fine.',
    t: 'Classic balance: white flowers, pastry, chalk; Churchill\'s daily pour',
    why: 'Sir Winston Churchill is the prestige cuvee examiners name after Dom Perignon and Cristal, and Pol Roger is the standard answer for a house that keeps its prestige blend secret.',
    wines: [
      { n: 'Cuvée Sir Winston Churchill', grape: 'Pinot Noir dominant blend', note: 'the prestige cuvee, first made in 1975; the exact blend has never been published' },
      { n: 'Brut Réserve', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the White Foil non-vintage, the house\'s volume wine' },
      { n: 'Blanc de Blancs Vintage', grape: 'Chardonnay', note: 'vintage Côte des Blancs fruit in the house\'s restrained register' }
    ],
    traps: [
      'Sir Winston Churchill is always vintage dated, not a non-vintage prestige blend',
      'It is Pinot Noir dominant, not a blanc de blancs'
    ]
  },
  {
    id: 'p-rolly-gassmann', p: 'Rolly Gassmann',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Rorschwihr (Haut-Rhin)',
    founded: '',
    holdings: 'Many small parcels around Rorschwihr, bottled by lieu-dit: Kappelweg, Pflaenzerreben, Rotleibel and Moenchreben among them.',
    style: 'Late picked and rarely fully dry, held for years in the cellar before release: honeyed, broad and unapologetically sweet-edged.',
    t: 'Rorschwihr lieu-dit by lieu-dit: honeyed, sweet-edged, cellared before release',
    why: 'Rorschwihr has no grand cru but a long list of named lieux-dits, so the estate is the standard example that Alsace quality does not stop at the cru boundary.',
    wines: [
      { n: 'Riesling Kappelweg de Rorschwihr', grape: 'Riesling', note: 'limestone lieu-dit, the estate\'s most cited Riesling' },
      { n: 'Pinot Gris Rotleibel de Rorschwihr', grape: 'Pinot Gris', note: 'a clay lieu-dit giving the smoky, sweet-edged Pinot Gris style' },
      { n: 'Muscat Moenchreben de Rorschwihr', grape: 'Muscat', note: 'one of the rare serious Muscat bottlings in the region' }
    ],
    traps: [
      'Rorschwihr has no grand cru: its lieu-dit names are not crus',
      'These wines usually carry noticeable residual sugar even when labelled only Riesling or Muscat',
      'Muscat in Alsace is dry in style at most estates, so this house is the exception worth naming'
    ]
  },
  {
    id: 'p-ruinart', p: 'Ruinart',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Reims',
    founded: '1729',
    holdings: 'Cellars in the Gallo-Roman chalk crayeres beneath Reims, listed by UNESCO with the other Champagne hillsides and cellars.',
    style: 'Chardonnay-forward and delicate across the whole range, even where Pinot is in the blend.',
    t: 'Chalk cellars and Chardonnay air: lemon blossom, almond, quiet depth',
    why: 'The oldest established Champagne house, and the answer when an examiner asks who was first. Its crayeres are the standard example of chalk cellaring.',
    wines: [
      { n: 'Dom Ruinart Blanc de Blancs', grape: 'Chardonnay', note: 'the prestige cuvee, vintage dated, from Côte des Blancs and Montagne de Reims Chardonnay' },
      { n: 'Ruinart Brut, formerly R de Ruinart', grape: 'Pinot Noir and Chardonnay', note: 'the Pinot-inflected non-vintage' },
      { n: 'Blanc de Blancs', grape: 'Chardonnay', note: 'the non-vintage that carries the house\'s Chardonnay identity' }
    ],
    traps: [
      'Ruinart is the oldest Champagne house (1729); Gosset is the oldest wine house in Champagne (1584) but began with still wine'
    ]
  },
  {
    id: 'p-salon', p: 'Salon',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Le Mesnil-sur-Oger (Côte des Blancs)',
    founded: 'first commercial vintage 1921',
    holdings: 'Chardonnay from Le Mesnil-sur-Oger alone: the house\'s own garden plot plus a small group of parcels in the village.',
    style: 'One wine only, in stainless steel, without malolactic, released after a decade or more: austere, high-acid and very slow.',
    t: 'Chalk-and-lemon laser that needs 20 years to soften',
    why: 'The single-wine, single-village, single-vintage house: the purest illustration in Champagne that a producer can refuse to blend across years.',
    wines: [
      { n: 'Cuvée S Le Mesnil Blanc de Blancs', grape: 'Chardonnay', note: 'declared only in years the house judges worthy, roughly four times a decade' }
    ],
    traps: [
      'Salon makes no non-vintage wine at all',
      'Salon and Delamotte share a village and an owner but are different houses; in undeclared years Salon fruit can go to Delamotte',
      'Le Mesnil-sur-Oger is a grand cru village, not a vineyard'
    ]
  },
  {
    id: 'p-taittinger', p: 'Taittinger',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Reims',
    founded: '1734 as Forest-Fourneaux, Taittinger family from 1932',
    holdings: 'Large estate holdings weighted to the Côte des Blancs; cellars in the Gallo-Roman chalk crayeres beneath Saint-Nicaise in Reims.',
    style: 'Chardonnay-led and floral, lighter and more perfumed than the Pinot houses.',
    t: 'Chardonnay-led and floral: white blossom, lemon curd, chalk beneath',
    why: 'Comtes de Champagne is the blanc de blancs prestige cuvee the Court expects by name, and the house is the usual example of a Chardonnay-weighted grande marque.',
    wines: [
      { n: 'Comtes de Champagne Blanc de Blancs', grape: 'Chardonnay', note: 'grand cru Côte des Blancs fruit, first made in 1952, a portion aged in oak' },
      { n: 'Comtes de Champagne Rosé', grape: 'Pinot Noir led', note: 'the same prestige name on a wine that is not a blanc de blancs' },
      { n: 'Brut Réserve', grape: 'Chardonnay, Pinot Noir, Meunier', note: 'the Chardonnay-leaning non-vintage' }
    ],
    traps: [
      'Comtes de Champagne Blanc de Blancs is Chardonnay; the Rose of the same name is Pinot-led',
      'Taittinger owns Domaine Carneros in California, which is not a Champagne holding'
    ]
  },
  {
    id: 'p-trimbach', p: 'Trimbach',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Ribeauvillé (Haut-Rhin)',
    founded: '1626',
    holdings: 'Owns Clos Ste Hune, a parcel of a little under two hectares inside the Rosacker grand cru at Hunawihr, and draws Cuvée Frédéric Emile from the Geisberg and Osterberg slopes above Ribeauvillé.',
    style: 'Bone dry, stainless steel, no new oak, released late: austerity as a house policy rather than a vintage accident.',
    t: 'Bone-dry, austere, stony: Alsace Riesling\'s cathedral',
    why: 'The house that made dryness the Alsace standard, and that long declined to print grand cru on its greatest wines: the cleanest proof that a cru is a site, not a maker.',
    wines: [
      { n: 'Clos Ste Hune', grape: 'Riesling', note: 'the estate\'s own parcel inside a grand cru, sold without the grand cru name' },
      { n: 'Cuvée Frédéric Emile', grape: 'Riesling', note: 'grand cru fruit from two slopes above Ribeauvillé, labelled simply Alsace' },
      { n: 'Gewürztraminer Cuvée des Seigneurs de Ribeaupierre', grape: 'Gewürztraminer', note: 'dry Gewürztraminer, which is rarer than the grape\'s reputation suggests' },
      { n: 'Riesling Réserve', grape: 'Riesling', note: 'the house wine, and the reference for dry Alsace Riesling at volume' }
    ],
    traps: [
      'Clos Ste Hune lies inside the Rosacker grand cru but the label has traditionally not said so',
      'Cuvée Frédéric Emile comes from grand cru slopes yet is sold as Alsace AOC',
      'The house stands at Ribeauvillé; Clos Ste Hune is at Hunawihr'
    ]
  },
  {
    id: 'p-veuve-clicquot', p: 'Veuve Clicquot',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Reims',
    founded: '1772',
    holdings: 'Substantial estate holdings weighted to Pinot Noir in the Montagne de Reims.',
    style: 'Pinot Noir dominant, full and toasty, with a broad and generous finish.',
    t: 'Pinot weight and toast behind the yellow label; the widow\'s riddling table',
    why: 'Barbe-Nicole Clicquot Ponsardin is credited with the riddling table and with the first known blended rose. Both are standard history answers.',
    wines: [
      { n: 'Yellow Label Brut', grape: 'Pinot Noir dominant blend', note: 'the non-vintage the world recognises by colour before it reads the label' },
      { n: 'La Grande Dame', grape: 'Pinot Noir dominant', note: 'the prestige cuvee, named for Barbe-Nicole Clicquot Ponsardin' },
      { n: 'Vintage Rosé', grape: 'Pinot Noir led', note: 'the descendant of the first known blended rose Champagne' }
    ],
    traps: [
      'The riddling table is credited to the widow Clicquot, not to Dom Perignon',
      'La Grande Dame is Pinot Noir dominant, not a blanc de blancs'
    ]
  },
  {
    id: 'p-vilmart', p: 'Vilmart & Cie',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Rilly-la-Montagne (Montagne de Reims)',
    founded: '1890',
    holdings: 'A small premier cru holding at Rilly-la-Montagne, Chardonnay dominant for a Montagne de Reims estate.',
    style: 'Whole-bunch pressing, fermentation in large oak casks and no malolactic: structured, spicy and slow to open.',
    t: 'Big oak casks, no malolactic: spice, pear skin, structure that needs time',
    why: 'A grower that uses large oak and blocks malolactic, so it sits with Gosset and Lanson on that question while remaining an RM.',
    wines: [
      { n: 'Coeur de Cuvée', grape: 'Chardonnay dominant', note: 'from the heart of the press of the oldest vines, the estate\'s top wine' },
      { n: 'Grand Cellier d\'Or', grape: 'Chardonnay dominant', note: 'vintage-based cuvee showing the oak and no-malolactic signature' },
      { n: 'Grand Cellier', grape: 'Chardonnay and Pinot Noir', note: 'the house\'s barrel-fermented multi-vintage wine' }
    ],
    traps: [
      'Rilly-la-Montagne is premier cru, not grand cru',
      'Chardonnay leads here despite the Montagne de Reims being taught as Pinot country'
    ]
  },
  {
    id: 'w-bollinger-vvf', p: 'Bollinger Vieilles Vignes Françaises',
    by: 'p-bollinger',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Aÿ (Vallée de la Marne)',
    founded: 'first vintage 1969',
    holdings: 'Two small plots of ungrafted, pre-phylloxera Pinot Noir inside Aÿ, propagated by layering rather than by planting rootstock.',
    style: 'Blanc de noirs from ungrafted vines, barrel fermented and made in tiny quantity: dense, savoury and unlike anything else in the region.',
    t: 'Dense, savoury Pinot from vines that never met a rootstock',
    why: 'The best known surviving ungrafted vineyard in Champagne, and the fastest way for an examiner to test whether a candidate understands phylloxera and layering.',
    wines: [
      { n: 'Vieilles Vignes Françaises', grape: 'Pinot Noir', note: 'the surviving ungrafted plots are the point of the wine, not merely the vine age' }
    ],
    traps: [
      'Ungrafted, not simply old: the plots were never replanted on American rootstock',
      'It is a blanc de noirs, not a blend',
      'Provignage, or layering, is the propagation method that keeps such plots alive'
    ]
  },
  {
    id: 'w-cristal', p: 'Cristal',
    by: 'p-louis-roederer',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Reims',
    founded: 'created 1876 for Tsar Alexander II',
    holdings: 'Drawn only from Louis Roederer\'s own vineyards, a large part of them farmed biodynamically.',
    style: 'Always vintage, Pinot Noir and Chardonnay from grand cru estate parcels, low dosage, in a clear flat-bottomed bottle.',
    t: 'Weightless power: citrus oil, pastry and chalk, tense for decades',
    why: 'A vintage prestige cuvee made wholly from estate fruit, which is unusual among the grandes marques, and the bottle whose shape carries a history question.',
    wines: [
      { n: 'Cristal', grape: 'Pinot Noir and Chardonnay', note: 'the prestige cuvee, made only in declared vintages' },
      { n: 'Cristal Rosé', grape: 'Pinot Noir and Chardonnay', note: 'the rose version, made by infusion in far smaller quantity' },
      { n: 'Cristal Vinothèque', grape: 'Pinot Noir and Chardonnay', note: 'very late released bottles from the house cellars' }
    ],
    traps: [
      'Cristal is always vintage: there is no non-vintage version',
      'The clear flat-bottomed bottle was made for the Tsar; the coloured wrap protects the wine from light',
      'Cristal is Louis Roederer, not Roederer Estate in California'
    ]
  },
  {
    id: 'w-dagueneau-silex', p: 'Didier Dagueneau Silex',
    by: 'p-didier-dagueneau',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Pouilly-Fumé (Centre-Loire)',
    founded: '',
    holdings: 'Flint parcels around Saint-Andelain, farmed at very low yields.',
    style: 'Barrel-fermented Sauvignon Blanc aged on lees: smoke, grapefruit oil and density rather than herbs and grass.',
    t: 'Gunflint and grapefruit at Grand Cru intensity, Sauvignon\'s outer limit',
    why: 'The wine that raised the ceiling for Sauvignon Blanc anywhere, and the quickest route to the Pouilly appellation traps.',
    wines: [
      { n: 'Silex', grape: 'Sauvignon Blanc', note: 'named for the flint soil that gives the wine its smoke' }
    ],
    traps: [
      'Silex is a soil type, not a vineyard name',
      'Pouilly-Fumé is Loire Sauvignon Blanc; Pouilly-Fuissé is Mâconnais Chardonnay',
      'Pouilly-sur-Loire, on the same ground, is made from Chasselas'
    ]
  },
  {
    id: 'w-dom-perignon', p: 'Dom Pérignon',
    by: 'p-moet-chandon',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Épernay',
    founded: 'first vintage 1921, released 1936',
    holdings: 'Drawn from Moët\'s grand cru holdings, with the abbey at Hautvillers as its symbolic home.',
    style: 'Always vintage, built on roughly equal Chardonnay and Pinot Noir, held long on lees and released again later as successive plenitudes.',
    t: 'Toasted almond and white peach on chalk: the cuvee everyone else is measured against',
    why: 'Named for the Hautvillers cellarer whose work on blending founds the region\'s story. The Court wants it identified as always vintage and the plenitudes understood as later disgorgements.',
    wines: [
      { n: 'Dom Pérignon', grape: 'Chardonnay and Pinot Noir', note: 'declared only in years the house judges worthy, so some years are skipped' },
      { n: 'Dom Pérignon P2', grape: 'Chardonnay and Pinot Noir', note: 'the same vintage disgorged after a far longer stay on its lees' },
      { n: 'Dom Pérignon Rosé', grape: 'Chardonnay and Pinot Noir', note: 'the rose version, made in far smaller quantity' }
    ],
    traps: [
      'Dom Perignon did not invent sparkling wine: his contribution was blending and quality control',
      'P2 and P3 are late disgorgements of the same vintage, not different cuvees',
      'There is no non-vintage Dom Perignon'
    ]
  },
  {
    id: 'w-krug-clos-du-mesnil', p: 'Krug Clos du Mesnil',
    by: 'p-krug',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Le Mesnil-sur-Oger (Côte des Blancs)',
    founded: 'walled since 1698, first vintage 1979',
    holdings: 'A walled vineyard of under two hectares in the centre of Le Mesnil-sur-Oger, owned outright by Krug since 1971.',
    style: 'A single walled Chardonnay vineyard fermented in small oak and bottled alone, by a house otherwise devoted to blending.',
    t: 'Lime zest and crushed chalk under Krug\'s oak: one wall, one grape, one year',
    why: 'The most famous walled vineyard in Champagne, and the wine that proves a blending house can still make a single-site wine without abandoning its method.',
    wines: [
      { n: 'Clos du Mesnil', grape: 'Chardonnay', note: 'one wall, one grape, one vintage: the blending house\'s single wine of place' }
    ],
    traps: [
      'Clos du Mesnil is Chardonnay; Clos d\'Ambonnay is the Pinot Noir clos',
      'The wall dates from 1698 but Krug acquired the vineyard only in 1971',
      'Le Mesnil-sur-Oger is a grand cru village and Clos du Mesnil is one walled parcel within it'
    ]
  },
  {
    id: 'w-clos-des-goisses', p: 'Philipponnat Clos des Goisses',
    by: 'p-philipponnat',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Mareuil-sur-Aÿ',
    founded: 'first vintage 1935',
    holdings: 'A single very steep south-facing chalk slope above the Marne at Mareuil-sur-Aÿ, owned by Philipponnat since 1935.',
    style: 'Pinot dominant with Chardonnay, always vintage, very low dosage, from the ripest and steepest site in the region.',
    t: 'Ripe Pinot on hot chalk: quince, smoke and a dry, insistent finish',
    why: 'The original single-vineyard Champagne, and the standard answer when an examiner asks for a named clos other than Krug\'s.',
    wines: [
      { n: 'Clos des Goisses', grape: 'Pinot Noir with Chardonnay', note: 'the first Champagne bottled and sold as a single vineyard' }
    ],
    traps: [
      'The name comes from local dialect for a steep hillside, not from a saint or a family',
      'It is not a blanc de noirs: Chardonnay is part of the blend',
      'Mareuil-sur-Aÿ is premier cru, so a single-vineyard wine need not come from a grand cru village'
    ]
  },
  {
    id: 'w-sir-winston-churchill', p: 'Pol Roger Cuvée Sir Winston Churchill',
    by: 'p-pol-roger',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Epernay',
    founded: 'first vintage 1975',
    holdings: 'Drawn from grand cru parcels the house has never publicly identified.',
    style: 'Pinot Noir dominant, vintage dated, aged long in cold Epernay cellars: depth carried without weight.',
    t: 'Depth without weight: apple pastry, hazelnut and a long chalky close',
    why: 'The prestige cuvee that is defined by what the house refuses to say, and a reliable question about the relationship between a brand and a named person.',
    wines: [
      { n: 'Cuvée Sir Winston Churchill', grape: 'Pinot Noir dominant blend', note: 'the blend and the villages have never been disclosed by the house' }
    ],
    traps: [
      'It is Pinot Noir dominant, not a blanc de blancs',
      'It is always vintage dated',
      'The blend has never been published, so any percentage quoted is invention'
    ]
  },
  {
    id: 'w-salon-le-mesnil', p: 'Salon Cuvée S Le Mesnil Blanc de Blancs',
    by: 'p-salon',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Le Mesnil-sur-Oger (Côte des Blancs)',
    founded: 'first commercial vintage 1921',
    holdings: 'Chardonnay from Le Mesnil-sur-Oger alone, from the house\'s own plot and a small group of village parcels.',
    style: 'Stainless steel, no malolactic, no reserve wine, released after a decade or more: chalk, lemon and an acid line that takes twenty years to soften.',
    t: 'Chalk-and-lemon laser that needs 20 years to soften',
    why: 'The only Champagne house that makes a single wine from a single village in a single variety, and only when it chooses to declare.',
    wines: [
      { n: 'Cuvée S Le Mesnil Blanc de Blancs', grape: 'Chardonnay', note: 'the house makes this wine and nothing else, and only in declared years' }
    ],
    traps: [
      'Salon makes no non-vintage wine at all',
      'It is a village wine, not a single vineyard',
      'Salon and Delamotte share a village and an owner but are separate houses'
    ]
  },
  {
    id: 'w-coulee-de-serrant', p: 'Savennières Coulée de Serrant',
    by: 'p-nicolas-joly',
    country: 'France, Champagne, Loire and Alsace', r: 'Loire', sub: 'Savennières (Anjou)',
    founded: 'planted by Cistercian monks in 1130',
    holdings: 'About seven hectares of steep schist above the Loire, an entire appellation held by one estate.',
    style: 'Dry Chenin Blanc, biodynamic and deliberately oxidative: honey, camomile and bruised apple without any sugar, usually needing air.',
    t: 'Honeyed and dry at once: bruised quince, camomile, and a long stony ache',
    why: 'A monopole appellation, a biodynamic landmark, and the wine the Court uses to insist that Savennières and Chenin are not the same thing as sweetness.',
    wines: [
      { n: 'Coulée de Serrant', grape: 'Chenin Blanc', note: 'one of the very few French appellations owned by a single producer' }
    ],
    traps: [
      'It is dry despite tasting honeyed: there is no residual sugar in the classic bottling',
      'Savennières Roche aux Moines is a separate neighbouring appellation',
      'Coteaux du Layon, made from the same grape across the river, is sweet'
    ]
  },
  {
    id: 'w-comtes-de-champagne', p: 'Taittinger Comtes de Champagne Blanc de Blancs',
    by: 'p-taittinger',
    country: 'France, Champagne, Loire and Alsace', r: 'Champagne', sub: 'Côte des Blancs',
    founded: 'first vintage 1952',
    holdings: 'Chardonnay from grand cru villages of the Côte des Blancs.',
    style: 'All Chardonnay, vintage dated, with a portion aged in oak: white peach, brioche and a chalk finish.',
    t: 'White peach, brioche and a chalk finish: the Côte des Blancs at full stretch',
    why: 'One of the small set of prestige cuvees a candidate must be able to place with its house and its style without hesitation.',
    wines: [
      { n: 'Comtes de Champagne Blanc de Blancs', grape: 'Chardonnay', note: 'the blanc de blancs prestige cuvee the Court expects by name' }
    ],
    traps: [
      'Comtes de Champagne Rose is a different wine and is Pinot-led, not a blanc de blancs',
      'It is vintage dated, so it is not comparable to a multi-vintage prestige blend'
    ]
  },
  {
    id: 'w-clos-ste-hune', p: 'Trimbach Clos Ste Hune',
    by: 'p-trimbach',
    country: 'France, Champagne, Loire and Alsace', r: 'Alsace', sub: 'Hunawihr (Haut-Rhin)',
    founded: '',
    holdings: 'A parcel of a little under two hectares inside the Rosacker grand cru at Hunawihr, owned outright by Trimbach.',
    style: 'Riesling alone, fermented dry in stainless steel with no oak and released several years after the vintage: severe young, extraordinary at twenty.',
    t: 'Lime, crushed stone and cold steel: Alsace Riesling stripped to the bone',
    why: 'The most examinable wine in Alsace: a producer-owned clos inside a grand cru, sold without the cru name, which proves that the cru is the site and not the maker.',
    wines: [
      { n: 'Clos Ste Hune', grape: 'Riesling', note: 'the estate\'s own parcel inside a grand cru, sold without the grand cru name on the label' }
    ],
    traps: [
      'It sits within Rosacker but the label has traditionally not said so',
      'Clos Ste Hune is Riesling; Cuvée Frédéric Emile is a different Trimbach Riesling from Ribeauvillé',
      'The clos is at Hunawihr, not at Ribeauvillé where the house stands'
    ]
  },
  {
    id: 'p-esclans', p: 'Château d\'Esclans',
    country: 'France, Rhône and the Mediterranean South', r: 'Côtes de Provence', sub: 'La Motte-en-Provence',
    founded: '',
    holdings: 'old Grenache and Rolle in the Esclans valley',
    style: 'A tiered rosé range rising from a widely blended commercial wine to old-vine cuvées fermented and aged in large oak.',
    t: 'Pale as water and raised in oak: rosé built and priced like a white Burgundy',
    why: 'Esclans created the luxury rosé category, and Garrus is the standard example of a rosé made to compete with serious white wine rather than refresh.',
    wines: [
      { n: 'Whispering Angel', grape: 'Grenache-led blend', note: 'the brand that created the volume luxury rosé category' },
      { n: 'Garrus', grape: 'old-vine Grenache with Rolle', note: 'oak-fermented rosé priced against fine white Burgundy' },
      { n: 'Les Clans', grape: 'Grenache with Rolle', note: 'the step below Garrus' },
      { n: 'Rock Angel', grape: 'Grenache-led blend', note: 'partly oak-raised, between the brand and the cuvées' }
    ],
    traps: [
      'Whispering Angel is blended from bought fruit as well as estate fruit',
      'Provence\'s pale colour is a stylistic choice, not a legal requirement'
    ]
  },
  {
    id: 'p-beaucastel', p: 'Château de Beaucastel',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Courthézon',
    founded: '1909',
    holdings: 'A large single block on the galets at Courthézon planted to all thirteen permitted varieties, with an unusually high share of old Mourvèdre; Perrin family since 1909, the Beaucastel name traced to the 16th century.',
    style: 'Mourvèdre-led and savoury, the harvest flash-heated before fermentation, the wine raised in large old foudres.',
    t: 'Garrigue, leather and game over kirsch: the savoury pole of Châteauneuf',
    why: 'Beaucastel is the standing counterexample to Grenache-only Châteauneuf, and the estate used to anchor the thirteen-varieties question.',
    wines: [
      { n: 'Châteauneuf-du-Pape Rouge', grape: 'Grenache, Mourvèdre, Syrah, Counoise and the rest', note: 'the estate that actually plants all thirteen' },
      { n: 'Hommage à Jacques Perrin', grape: 'Mourvèdre-dominant blend', note: 'top vintages only, built on the oldest Mourvèdre' },
      { n: 'Roussanne Vieilles Vignes', grape: 'Roussanne', note: 'white Châteauneuf with a long ageing curve' },
      { n: 'Coudoulet de Beaucastel', grape: 'Grenache-led blend', note: 'Côtes du Rhône from across the road' }
    ],
    traps: [
      'Thirteen varieties traditionally, eighteen counting the colour variants',
      'Coudoulet is Côtes du Rhône, not Châteauneuf',
      'Hommage is Mourvèdre-dominant and is not made every year'
    ]
  },
  {
    id: 'p-pibarnon', p: 'Château de Pibarnon',
    country: 'France, Rhône and the Mediterranean South', r: 'Bandol', sub: 'La Cadière-d\'Azur',
    founded: '1978',
    holdings: 'A high amphitheatre of terraces on blue Santonian marl above La Cadière, planted to a very high proportion of Mourvèdre; bought by Henri de Saint Victor in 1978.',
    style: 'Cooler and more perfumed than the Bandol average, with fine tannin drawn from marl rather than sand.',
    t: 'Blue marl at altitude: bay leaf, black fruit and salt, Mourvèdre kept fresh',
    why: 'Pibarnon is the soil answer in Bandol, used to show the appellation is not a single bowl of warm sand facing the sea.',
    wines: [
      { n: 'Bandol Rouge', grape: 'Mourvèdre with Grenache', note: 'the marl-grown expression of the appellation' },
      { n: 'Bandol Rosé', grape: 'Mourvèdre with Cinsault', note: 'structured, not a pale aperitif style' },
      { n: 'Bandol Blanc', grape: 'Clairette with Bourboulenc', note: 'the small white production' }
    ],
    traps: [
      'Bandol\'s reputation is red but its volume is rosé',
      'Mourvèdre needs heat and a long season, which is why Bandol and not the rest of Provence'
    ]
  },
  {
    id: 'p-saint-cosme', p: 'Château de Saint Cosme',
    country: 'France, Rhône and the Mediterranean South', r: 'Gigondas', sub: 'Gigondas',
    founded: '',
    holdings: 'Held by the Barruol family since 1570',
    style: 'Whole-cluster Syrah in the blend and a cold mineral streak unusual for the cru; a négociant range sits alongside the estate wines.',
    t: 'Dentelles limestone in the glass: black cherry, smoke and a cold mineral spine',
    why: 'The estate that made Gigondas a place of named parcels, and the clearest demonstration that the cru is not simply a warmer Châteauneuf.',
    wines: [
      { n: 'Gigondas Le Claux', grape: 'Grenache', note: 'old vines on clay and limestone' },
      { n: 'Gigondas Valbelle', grape: 'Grenache with Syrah', note: 'the estate\'s long-standing flagship' },
      { n: 'Gigondas Hominis Fides', grape: 'Grenache', note: 'a sandy parcel, the perfumed one' },
      { n: 'Gigondas Le Poste', grape: 'Grenache', note: 'the highest and coolest parcel' },
      { n: 'Gigondas Classique', grape: 'Grenache with Syrah and Mourvèdre', note: 'the estate blend' }
    ],
    traps: [
      'Gigondas has been a cru since 1971, no longer a Côtes du Rhône Villages commune',
      'The Saint Cosme négociant wines are not estate-grown'
    ]
  },
  {
    id: 'p-la-nerthe', p: 'Château La Nerthe',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Châteauneuf-du-Pape',
    founded: '16th century',
    holdings: 'A single large walled block southeast of the village, farmed organically; one of the oldest named estates in the appellation and among the first to bottle its own wine.',
    style: 'Polished and structured, with a barrel-aged prestige red and a Roussanne-led white.',
    t: 'Cedar and dark cherry: the courtly end of Châteauneuf, raised in barrel not foudre',
    why: 'La Nerthe is the historical answer in Châteauneuf: among the first properties to bottle at the estate and to travel under its own name.',
    wines: [
      { n: 'Châteauneuf-du-Pape Cuvée des Cadettes', grape: 'Grenache, Syrah, Mourvèdre', note: 'the old-vine selection, aged in barrel' },
      { n: 'Clos de Beauvenir', grape: 'Roussanne with Clairette', note: 'the prestige white' },
      { n: 'Châteauneuf-du-Pape Rouge', grape: 'Grenache-led blend', note: 'the estate wine' }
    ],
    traps: [
      'Cuvée des Cadettes is a selection, not the standard red',
      'Clos de Beauvenir is the white cuvée'
    ]
  },
  {
    id: 'p-pradeaux', p: 'Château Pradeaux',
    country: 'France, Rhône and the Mediterranean South', r: 'Bandol', sub: 'Saint-Cyr-sur-Mer',
    founded: '1752',
    holdings: 'Held by the Portalis family since 1752, with old Mourvèdre close to the sea at Saint-Cyr.',
    style: 'Uncompromisingly traditional: whole bunches, very long macerations and years in old foudre before release.',
    t: 'Tar, iodine and dried meat: Bandol that makes you wait a decade and means it',
    why: 'The extreme of the traditional Bandol style, and the natural contrast with Tempier when an examiner asks for two houses in one appellation.',
    wines: [
      { n: 'Bandol Rouge', grape: 'Mourvèdre with Grenache', note: 'the estate red, austere in youth' },
      { n: 'Bandol Cuvée Longue Garde', grape: 'Mourvèdre-dominant', note: 'the extended-ageing selection' },
      { n: 'Bandol Rosé', grape: 'Mourvèdre with Cinsault', note: 'made in the same unhurried way' }
    ],
    traps: [
      'The long cask ageing is a house choice; the appellation minimum is 18 months',
      'Saint-Cyr-sur-Mer is inside Bandol, which covers several communes and not the town alone'
    ]
  },
  {
    id: 'p-rayas', p: 'Château Rayas',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Châteauneuf-du-Pape',
    founded: '1880',
    holdings: 'Around a dozen hectares of sand and clay in the cool wooded northeast of the appellation; the family also holds Château de Fonsalette in Côtes du Rhône and Château des Tours in Vacqueyras.',
    style: 'Pale, low in colour and entirely Grenache, raised in old wood with no new oak and no pretence of power.',
    t: 'Pale, haunting Grenache from sand: kirsch, incense and a Burgundian ghost',
    why: 'Rayas proves Châteauneuf need not be a blend and need not be dark, and its cool sandy parcels are the explanation examiners want.',
    wines: [
      { n: 'Châteauneuf-du-Pape Rouge', grape: 'Grenache', note: 'pure Grenache from sand, the appellation\'s great exception' },
      { n: 'Pignan', grape: 'Grenache', note: 'a named parcel of the same estate, not a second property' },
      { n: 'Châteauneuf-du-Pape Blanc', grape: 'Grenache Blanc and Clairette', note: 'one of the appellation\'s ageworthy whites' },
      { n: 'Château de Fonsalette', grape: 'Grenache with Cinsault and Syrah', note: 'Côtes du Rhône under the same hand' },
      { n: 'Château des Tours', grape: 'Grenache-led blend', note: 'the family\'s Vacqueyras estate' }
    ],
    traps: [
      'The red is pure Grenache, not a GSM blend',
      'Pignan is a Rayas cuvée, not a separate estate',
      'Fonsalette is Côtes du Rhône and Château des Tours is Vacqueyras'
    ]
  },
  {
    id: 'p-chateau-simone', p: 'Château Simone',
    country: 'France, Rhône and the Mediterranean South', r: 'Palette', sub: 'Meyreuil',
    founded: '1830',
    holdings: 'with cellars cut by Carmelite monks',
    style: 'Very old vines and a long list of minor varieties: a nutty Clairette-led white, and red and rosé that age far longer than Provence leads you to expect.',
    t: 'North-facing limestone: a white of fennel and wax, a rosé that lives for years',
    why: 'Palette is a two-question appellation and Simone is most of it, which is why the name appears whenever the Court asks about France\'s smallest AOCs.',
    wines: [
      { n: 'Palette Blanc', grape: 'Clairette with many minor varieties', note: 'the appellation\'s signature wine' },
      { n: 'Palette Rouge', grape: 'Grenache, Mourvèdre, Cinsault and others', note: 'an ageworthy Provençal red' },
      { n: 'Palette Rosé', grape: 'Grenache-led field blend', note: 'a rosé sold with bottle age' }
    ],
    traps: [
      'Palette is its own appellation, not part of Côtes de Provence',
      'The rosé is an ageing wine, not a pale summer style',
      'Palette faces north, against the Provence cliche'
    ]
  },
  {
    id: 'p-chateau-grillet', p: 'Château-Grillet',
    country: 'France, Rhône and the Mediterranean South', r: 'Château-Grillet', sub: 'Vérin and Saint-Michel-sur-Rhône',
    founded: '',
    holdings: 'A granite amphitheatre of roughly 3.5 ha planted to Viognier, holding its own appellation entirely surrounded by Condrieu; bought by François Pinault in 2011.',
    style: 'Cooler, slower and more reserved than Condrieu, with a record of ageing the neighbours rarely claim.',
    t: 'A single terraced bowl of Viognier: peach stone, dust and quiet, made to wait',
    why: 'One of France\'s smallest appellations and a single-estate monopole, which is why it is the standard question on that category alongside Coulée de Serrant.',
    wines: [
      { n: 'Château-Grillet', grape: 'Viognier', note: 'one estate, one appellation, one wine' }
    ],
    traps: [
      'It is its own AOC, not a cru of Condrieu',
      'White only, Viognier only',
      'Coulée de Serrant is the Loire\'s single-estate appellation, not this one'
    ]
  },
  {
    id: 'p-canarelli', p: 'Clos Canarelli',
    country: 'France, Rhône and the Mediterranean South', r: 'Corsica', sub: 'Figari',
    founded: '',
    holdings: 'Biodynamic granite vineyards at Figari in the dry south of the island, including plantings of rare Corsican varieties such as Biancu Gentile.',
    style: 'Sciaccarellu and Nielluccio reds of light grip and textured Vermentino whites, some raised in amphora.',
    t: 'Granite Figari: maquis, pepper and salt, southern Corsica at its driest',
    why: 'Canarelli is the southern granite answer against Patrimonio\'s limestone, and the grower who revived the island\'s near-lost varieties.',
    wines: [
      { n: 'Figari Rouge', grape: 'Sciaccarellu with Nielluccio', note: 'granite-grown, pale and peppery' },
      { n: 'Figari Blanc', grape: 'Vermentino', note: 'the southern white, saline and dry' },
      { n: 'Biancu Gentile', grape: 'Biancu Gentile', note: 'a near-lost Corsican variety revived here' },
      { n: 'Figari Rosé', grape: 'Sciaccarellu with Nielluccio', note: 'the island\'s serious rosé' }
    ],
    traps: [
      'Figari is granite, Patrimonio limestone; the wines are not interchangeable',
      'Sciaccarellu is pale and peppery and is not a synonym for Sangiovese'
    ]
  },
  {
    id: 'p-clos-des-papes', p: 'Clos des Papes',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Châteauneuf-du-Pape',
    founded: '',
    holdings: 'Around two dozen parcels scattered across the appellation, farmed by the Avril family and blended into one red and one white each year.',
    style: 'One red, one white, no prestige cuvée: Grenache with an unusually high share of Mourvèdre, aged in foudre.',
    t: 'One wine a year from twenty-odd parcels: red fruit, herb and quiet authority',
    why: 'The estate that refuses a special cuvée, which makes it the Court\'s example of blending the whole appellation rather than selecting from it.',
    wines: [
      { n: 'Châteauneuf-du-Pape Rouge', grape: 'Grenache with Mourvèdre and Syrah', note: 'a single red blended across the whole appellation' },
      { n: 'Châteauneuf-du-Pape Blanc', grape: 'six varieties in roughly equal parts', note: 'a benchmark white, not an afterthought' },
      { n: 'Le Petit Vin d\'Avril', grape: 'mixed varieties', note: 'the family\'s Vin de France' }
    ],
    traps: [
      'There is no walled clos of that name; the wine comes from scattered parcels',
      'Mourvèdre matters more here than in most Châteauneuf'
    ]
  },
  {
    id: 'p-graillot', p: 'Domaine Alain Graillot',
    country: 'France, Rhône and the Mediterranean South', r: 'Crozes-Hermitage', sub: 'Pont-de-l\'Isère',
    founded: '1985',
    holdings: 'Vineyards on the stony Chassis plain south of Tain, with small holdings in Saint-Joseph and Hermitage.',
    style: 'Whole-cluster fermentation in neutral wood: peppery and taut, ageing far better than the appellation\'s reputation suggests.',
    t: 'Olive, pepper and cool red fruit: the bottle that proved Crozes could be serious',
    why: 'Graillot answers whether Crozes-Hermitage is more than an entry point, and La Guiraude is the Court\'s example of a vintage-dependent selection.',
    wines: [
      { n: 'Crozes-Hermitage La Guiraude', grape: 'Syrah', note: 'a selection made only in stronger vintages' },
      { n: 'Crozes-Hermitage Rouge', grape: 'Syrah', note: 'the wine that raised the whole appellation\'s ceiling' },
      { n: 'Crozes-Hermitage Blanc', grape: 'Marsanne and Roussanne', note: 'the estate white' },
      { n: 'Saint-Joseph', grape: 'Syrah', note: 'from terraces across the river' }
    ],
    traps: [
      'Crozes-Hermitage is the largest northern appellation, not a lesser plot on the hill of Hermitage',
      'La Guiraude is not produced every year'
    ]
  },
  {
    id: 'p-tissot', p: 'Domaine André et Mireille Tissot',
    country: 'France, Rhône and the Mediterranean South', r: 'Jura', sub: 'Montigny-lès-Arsures',
    founded: '',
    holdings: 'Stéphane Tissot farms biodynamically across Arbois, with single-vineyard Chardonnays including La Tour de Curon and Les Bruyères on marl and limestone.',
    style: 'Both Jura idioms under one roof: topped-up single-vineyard whites alongside classic sous voile Vin Jaune, plus Vin de Paille and crémant.',
    t: 'One cellar, both Juras: taut single-vineyard Chardonnay beside a veiled Savagnin',
    why: 'The single best illustration of the Jura\'s two philosophies in one range, and the anchor for Arbois, the region\'s largest appellation.',
    wines: [
      { n: 'Arbois Vin Jaune', grape: 'Savagnin', note: 'the oxidative benchmark from the region\'s largest appellation' },
      { n: 'Arbois Chardonnay Les Bruyères', grape: 'Chardonnay', note: 'single vineyard, topped up' },
      { n: 'Arbois La Tour de Curon', grape: 'Chardonnay', note: 'the estate\'s most prized parcel' },
      { n: 'Arbois Vin de Paille', grape: 'Chardonnay, Savagnin, Poulsard', note: 'grapes dried on racks, not fortified' },
      { n: 'Crémant du Jura', grape: 'Chardonnay', note: 'traditional method, taken seriously here' }
    ],
    traps: [
      'Arbois was among the first French appellations granted in 1936',
      'Vin de Paille is dried on straw or racks and is never fortified',
      'Crémant du Jura is a serious category, not a byproduct'
    ]
  },
  {
    id: 'p-arena', p: 'Domaine Antoine Arena',
    country: 'France, Rhône and the Mediterranean South', r: 'Corsica', sub: 'Patrimonio',
    founded: '',
    holdings: 'Limestone parcels at Patrimonio, chiefly Grotte di Sole and Carco, farmed biodynamically; the sons now bottle under their own names alongside the family label.',
    style: 'Nielluccio reds with real structure and Vermentino whites of unusual weight, plus a Muscat du Cap Corse.',
    t: 'Limestone Patrimonio: sage, blood orange and salt off the Corsican north',
    why: 'Patrimonio is Corsica\'s limestone appellation and Nielluccio is Sangiovese under another name, which is the island\'s most reliable examination question.',
    wines: [
      { n: 'Patrimonio Grotte di Sole', grape: 'Nielluccio', note: 'the limestone red that defines the appellation' },
      { n: 'Patrimonio Carco', grape: 'Vermentino', note: 'a white with texture and years of life' },
      { n: 'Patrimonio Blanc', grape: 'Vermentino', note: 'the estate white' },
      { n: 'Muscat du Cap Corse', grape: 'Muscat Blanc à Petits Grains', note: 'the island\'s Vin Doux Naturel' }
    ],
    traps: [
      'Nielluccio is Sangiovese; Sciaccarellu is a different, paler grape',
      'Vermentino on Corsica is also called Malvoisie de Corse',
      'Muscat du Cap Corse is a Vin Doux Naturel, not a dry white'
    ]
  },
  {
    id: 'p-clape', p: 'Domaine Auguste Clape',
    country: 'France, Rhône and the Mediterranean South', r: 'Cornas', sub: 'Cornas',
    founded: '',
    holdings: 'Old terraces on the granite slopes above the village, chiefly Reynard, La Côte, Patou and Sabarotte, blended into a single Cornas.',
    style: 'Whole cluster, old foudres and no new oak: the traditional Cornas that starts black and savage and turns to smoke and olive.',
    t: 'Tar, black olive, smoked bacon and iron: the Cornas every other Cornas is measured by',
    why: 'Clape is the benchmark answer for traditional Cornas and the frame for the appellation\'s argument with the destemming, new-oak school.',
    wines: [
      { n: 'Cornas', grape: 'Syrah', note: 'the blended estate wine, the appellation\'s reference point' },
      { n: 'Cornas Renaissance', grape: 'Syrah', note: 'the younger-vine cuvée' },
      { n: 'Saint-Péray', grape: 'Marsanne and Roussanne', note: 'white from the appellation that makes no red' },
      { n: 'Côtes du Rhône', grape: 'Syrah', note: 'declassified fruit from around Cornas' }
    ],
    traps: [
      'Cornas is Syrah only and permits no white grape at all',
      'Renaissance is the younger-vine cuvée, not a superior selection'
    ]
  },
  {
    id: 'p-belluard', p: 'Domaine Belluard',
    country: 'France, Rhône and the Mediterranean South', r: 'Savoie', sub: 'Ayze',
    founded: '',
    holdings: 'Steep biodynamic parcels at Ayze in the Arve valley, planted to Gringet, a variety grown essentially nowhere else.',
    style: 'Gringet still and sparkling, with Le Feu from a parcel of scree giving the most concentrated wine.',
    t: 'Gringet from the Arve: alpine herbs, white flowers and glacial cut',
    why: 'Ayze and Gringet are the Savoie question that separates prepared candidates, and Belluard is effectively the reference for both.',
    wines: [
      { n: 'Ayze Le Feu', grape: 'Gringet', note: 'the still flagship, from stony scree' },
      { n: 'Ayze Les Alpes', grape: 'Gringet', note: 'the estate still white' },
      { n: 'Ayze Mont Blanc Brut Zéro', grape: 'Gringet', note: 'traditional-method sparkling from the same grape' }
    ],
    traps: [
      'Gringet grows essentially only at Ayze and is not Savoie\'s common white',
      'Chignin-Bergeron is Roussanne; Apremont and Abymes are Jacquère',
      'Mondeuse is the alpine red, not a white grape'
    ]
  },
  {
    id: 'p-gripa', p: 'Domaine Bernard Gripa',
    country: 'France, Rhône and the Mediterranean South', r: 'Saint-Joseph', sub: 'Mauves',
    founded: '',
    holdings: 'Terraces on the historic Saint-Joseph hill above Mauves, including the Le Berceau parcel, plus vineyards in Saint-Péray.',
    style: 'Traditional and unshowy: red Saint-Joseph with grip, and one of the reference Saint-Pérays.',
    t: 'Le Berceau, the cradle: dark Syrah from the old terraces above Mauves',
    why: 'Gripa is the usual answer for serious Saint-Péray, an appellation candidates forget makes white and sparkling wine only.',
    wines: [
      { n: 'Saint-Joseph Le Berceau', grape: 'Syrah', note: 'old vines on the hill the appellation was named for' },
      { n: 'Saint-Péray Les Figuiers', grape: 'Marsanne', note: 'the benchmark still Saint-Péray' },
      { n: 'Saint-Joseph Blanc', grape: 'Marsanne with Roussanne', note: 'white from the same terraces' }
    ],
    traps: [
      'Saint-Péray permits no red wine',
      'Le Berceau is a lieu-dit within Saint-Joseph, not an appellation'
    ]
  },
  {
    id: 'p-grange-des-peres', p: 'Domaine de la Grange des Pères',
    country: 'France, Rhône and the Mediterranean South', r: 'Languedoc', sub: 'Aniane',
    founded: '1992',
    holdings: 'Laurent Vaillé planted stony ground at Aniane from 1992, a short distance from Daumas Gassac.',
    style: 'Mourvèdre and Syrah with Cabernet Sauvignon in the red, Roussanne-led in the white, both raised long in barrel and both released as IGP.',
    t: 'Dense and savoury: the Languedoc red that trades like a First Growth',
    why: 'Paired with Daumas Gassac as the two Aniane estates that chose IGP, and the Court\'s example of scarcity built without any appellation behind it.',
    wines: [
      { n: 'Grange des Pères Rouge', grape: 'Mourvèdre, Syrah, Cabernet Sauvignon', note: 'the Languedoc red that trades at classed-growth prices' },
      { n: 'Grange des Pères Blanc', grape: 'Roussanne with Marsanne and Chardonnay', note: 'a barrel-raised white in tiny quantity' }
    ],
    traps: [
      'IGP Pays de l\'Hérault, not an AOP',
      'It is Mourvèdre-led; Daumas Gassac next door is Cabernet-led'
    ]
  },
  {
    id: 'p-janasse', p: 'Domaine de la Janasse',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Courthézon',
    founded: '1973',
    holdings: 'Parcels across Châteauneuf and Côtes du Rhône around Courthézon, including old Grenache on sand for the Chaupin bottling.',
    style: 'Ripe and generous, with a sandy-soil cuvée standing against a darker old-vine selection from the same cellar.',
    t: 'Chaupin\'s sandy Grenache: raspberry and lavender where the Vieilles Vignes goes dark',
    why: 'Janasse lets a candidate compare sand against galets inside a single estate, the clearest way to show Châteauneuf is not one soil.',
    wines: [
      { n: 'Châteauneuf-du-Pape Cuvée Chaupin', grape: 'Grenache', note: 'a lieu-dit on sand, bottled as pure Grenache' },
      { n: 'Châteauneuf-du-Pape Vieilles Vignes', grape: 'Grenache with Syrah and Mourvèdre', note: 'the dense old-vine selection' },
      { n: 'Châteauneuf-du-Pape Tradition', grape: 'Grenache-led blend', note: 'the estate wine' },
      { n: 'Côtes du Rhône Les Garrigues', grape: 'Grenache', note: 'old-vine Côtes du Rhône' }
    ],
    traps: [
      'Chaupin is a lieu-dit on sand and is all Grenache',
      'Les Garrigues is Côtes du Rhône, not Châteauneuf'
    ]
  },
  {
    id: 'p-rectorie', p: 'Domaine de la Rectorie',
    country: 'France, Rhône and the Mediterranean South', r: 'Banyuls', sub: 'Banyuls-sur-Mer',
    founded: '1984',
    holdings: 'The Parcé brothers farm terraced schist parcels dropping to the Mediterranean at Banyuls, working both the fortified and the dry wines.',
    style: 'Banyuls made with clarity and freshness, alongside dry Collioure reds from the same terraces.',
    t: 'Grenache off the cliffs: cocoa, dried fig and sea salt in a fortified sweet red',
    why: 'The reference for Banyuls, and the estate that shows how Collioure and Banyuls share the same terraces but differ entirely in law.',
    wines: [
      { n: 'Banyuls Cuvée Léon Parcé', grape: 'Grenache', note: 'the house\'s reference fortified sweet red' },
      { n: 'Banyuls Rimage', grape: 'Grenache', note: 'the early-bottled vintage style, fruit before rancio' },
      { n: 'Collioure La Coume Pascole', grape: 'Grenache with Carignan', note: 'dry red from the same slopes' },
      { n: 'Collioure Col del Bast', grape: 'Grenache with Syrah and Mourvèdre', note: 'the schist cuvée' }
    ],
    traps: [
      'Banyuls is the fortified wine, Collioure the dry wine, from the same vineyards',
      'Rimage is early-bottled; traditional Banyuls is aged oxidatively',
      'Vin Doux Naturel mutage uses spirit at about 96 percent, not Port\'s 77'
    ]
  },
  {
    id: 'p-marcoux', p: 'Domaine de Marcoux',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Orange',
    founded: '',
    holdings: 'Armenier family parcels including very old Grenache at Charbonnières; among the first estates in the appellation to convert to biodynamics, around 1990.',
    style: 'Perfumed and high-toned, low in extraction, the Vieilles Vignes drawn from the oldest vines.',
    t: 'Rose petal and kirsch on stone: Grenache lifted rather than pushed',
    why: 'The biodynamic pioneer of Châteauneuf, and the name for when an examiner asks who farmed that way in the southern Rhône first.',
    wines: [
      { n: 'Châteauneuf-du-Pape Vieilles Vignes', grape: 'Grenache', note: 'old-vine Grenache, the estate\'s flagship' },
      { n: 'Châteauneuf-du-Pape Rouge', grape: 'Grenache-led blend', note: 'the estate wine' },
      { n: 'Châteauneuf-du-Pape Blanc', grape: 'white Châteauneuf varieties', note: 'a small production white' }
    ],
    traps: [
      'Biodynamics is a farming choice, not a legal category on the label'
    ]
  },
  {
    id: 'p-trevallon', p: 'Domaine de Trévallon',
    country: 'France, Rhône and the Mediterranean South', r: 'Alpilles', sub: 'Saint-Étienne-du-Grès',
    founded: '1973',
    holdings: 'Éloi Durrbach cleared limestone scrub in the Alpilles in 1973; the red runs roughly half Cabernet Sauvignon and half Syrah.',
    style: 'Cabernet and Syrah in equal measure, aged in old wood: herbal, ferrous and long-lived.',
    t: 'Cabernet meets Syrah over limestone: bay, graphite and Provençal scrub',
    why: 'The textbook case of a serious wine declassified to IGP because its blend broke the appellation\'s grape rules, not because of quality.',
    wines: [
      { n: 'Trévallon Rouge', grape: 'Cabernet Sauvignon and Syrah', note: 'the blend that put the wine outside the appellation' },
      { n: 'Trévallon Blanc', grape: 'Marsanne, Roussanne, Chardonnay', note: 'a small white production' }
    ],
    traps: [
      'It is IGP Alpilles, not Coteaux d\'Aix-en-Provence',
      'The Cabernet share, not any fault, put it outside the AOC'
    ]
  },
  {
    id: 'p-pegau', p: 'Domaine du Pégaü',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Châteauneuf-du-Pape',
    founded: '1987',
    holdings: 'Old Grenache parcels across the appellation farmed by the Féraud family, whose vines long predate the Pégaü label adopted in 1987.',
    style: 'Whole bunches, years in old foudre and no filtration: hide, dried herb and leather over dark fruit.',
    t: 'Hide, garrigue and dried cherry: the old Châteauneuf smell, unapologetic',
    why: 'Pégaü anchors the brettanomyces conversation in Châteauneuf, where a candidate is expected to discuss savoury character without simply calling it a fault.',
    wines: [
      { n: 'Cuvée Réservée', grape: 'Grenache-led blend', note: 'the traditional house red' },
      { n: 'Cuvée da Capo', grape: 'Grenache-led blend', note: 'declared only in exceptional vintages' },
      { n: 'Cuvée Laurence', grape: 'Grenache-led blend', note: 'the same wine given longer wood ageing' },
      { n: 'Cuvée Inspiration', grape: 'Grenache', note: 'a very old-vine selection' }
    ],
    traps: [
      'Da Capo is not an annual wine',
      'Pégaü is the Provençal word for the clay jug on the label, not a place'
    ]
  },
  {
    id: 'p-vieux-telegraphe', p: 'Domaine du Vieux Télégraphe',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Bédarrides',
    founded: '1891',
    holdings: 'A large contiguous holding on the La Crau plateau, the appellation\'s thickest bed of galets roulés; the Brunier family also owns Domaine La Roquète and a share of Les Pallières in Gigondas.',
    style: 'Classical Châteauneuf: Grenache-led with real Mourvèdre, raised in large oak foudres, structured rather than sweet.',
    t: 'Heat off the galets: kirsch, thyme and dust, with Mourvèdre holding the line',
    why: 'The estate to reach for when asked how the pudding stones of La Crau work, and the clearest single-plateau holding in the appellation.',
    wines: [
      { n: 'Châteauneuf-du-Pape La Crau', grape: 'Grenache with Mourvèdre and Syrah', note: 'the textbook galets roulés wine' },
      { n: 'Télégramme', grape: 'Grenache-led blend', note: 'the second wine from younger vines' },
      { n: 'Châteauneuf-du-Pape Blanc', grape: 'Clairette, Grenache Blanc, Bourboulenc, Roussanne', note: 'the estate white' }
    ],
    traps: [
      'The name comes from a Chappe optical telegraph tower on the plateau, not a vineyard',
      'Télégramme is the second wine',
      'La Crau here is a Châteauneuf lieu-dit, not the Crau plain of Provence'
    ]
  },
  {
    id: 'p-gauby', p: 'Domaine Gauby',
    country: 'France, Rhône and the Mediterranean South', r: 'Roussillon', sub: 'Calce',
    founded: '',
    holdings: 'Gérard and Lionel Gauby farm high parcels of old Carignan and Grenache on schist and limestone above Calce, leaving much of the estate uncultivated.',
    style: 'Whole bunches, low sulphur and an increasingly light touch: Roussillon made cool rather than powerful.',
    t: 'Schist and scrub at altitude: Roussillon with the alcohol and the weight pulled back',
    why: 'Gauby reset expectations for dry Roussillon in a region the Court still associates first with fortified wine.',
    wines: [
      { n: 'Muntada', grape: 'old-vine Carignan with Syrah and Grenache', note: 'the estate\'s flagship red' },
      { n: 'Coume Gineste', grape: 'Grenache Blanc and Grenache Gris', note: 'a white from schist at altitude' },
      { n: 'Vieilles Vignes', grape: 'Carignan with Grenache and Syrah', note: 'the old-vine estate red' },
      { n: 'Les Calcinaires', grape: 'Syrah, Grenache, Carignan', note: 'the limestone cuvée, red and white' }
    ],
    traps: [
      'Roussillon\'s fame is Banyuls and Maury, but its dry wines are the modern story',
      'Côtes du Roussillon Villages is a separate appellation and covers red wine only'
    ]
  },
  {
    id: 'p-vernay', p: 'Domaine Georges Vernay',
    country: 'France, Rhône and the Mediterranean South', r: 'Condrieu', sub: 'Condrieu',
    founded: '',
    holdings: 'Old terraces on the Condrieu hill including the Coteau de Vernon, plus holdings in Côte-Rôtie and Saint-Joseph.',
    style: 'Condrieu without excess: apricot and honeysuckle held in check, the top cuvées built to age rather than to drink in their first year.',
    t: 'Apricot skin, violet and white pepper on granite: Viognier that keeps its nerve',
    why: 'Georges Vernay held Condrieu together when the appellation had shrunk to a handful of hectares, which makes the name the answer to who saved Viognier.',
    wines: [
      { n: 'Condrieu Coteau de Vernon', grape: 'Viognier', note: 'old vines, the benchmark ageworthy Condrieu' },
      { n: 'Condrieu Les Chaillées de l\'Enfer', grape: 'Viognier', note: 'steep south-facing terraces' },
      { n: 'Condrieu Les Terrasses de l\'Empire', grape: 'Viognier', note: 'the estate\'s approachable Condrieu' },
      { n: 'Côte-Rôtie Maison Rouge', grape: 'Syrah', note: 'the domaine\'s red flagship' }
    ],
    traps: [
      'Condrieu is dry; Viognier\'s perfume reads sweet and fools candidates',
      'Coteau de Vernon is a lieu-dit, not a separate appellation'
    ]
  },
  {
    id: 'p-jamet', p: 'Domaine Jamet',
    country: 'France, Rhône and the Mediterranean South', r: 'Côte-Rôtie', sub: 'Ampuis',
    founded: '',
    holdings: 'Around two dozen small parcels scattered across Côte-Rôtie\'s lieux-dits on both the Brune and Blonde sides, with a separate Côte Brune bottling.',
    style: 'Whole-cluster fermentation in old barrels: savoury, peppery and tightly wound, with none of the new oak of the négociant style.',
    t: 'Cracked pepper, olive and wild herb over red fruit: Côte-Rôtie with the oak turned off',
    why: 'The grower counterweight to Guigal: same appellation, opposite philosophy, and the reference for whole-cluster northern Syrah in a blind flight.',
    wines: [
      { n: 'Côte-Rôtie', grape: 'Syrah', note: 'a blend across many lieux-dits, the grower\'s answer to Guigal' },
      { n: 'Côte-Rôtie Côte Brune', grape: 'Syrah', note: 'the firmer, iron-schist side bottled alone' },
      { n: 'Côtes du Rhône Syrah', grape: 'Syrah', note: 'from plateau vines above the appellation' }
    ],
    traps: [
      'The estate split in 2013; Domaine Jean-Luc Jamet is a separate label',
      'The standard bottling is a blend of many lieux-dits, not a single site'
    ]
  },
  {
    id: 'p-macle', p: 'Domaine Jean Macle',
    country: 'France, Rhône and the Mediterranean South', r: 'Jura', sub: 'Château-Chalon',
    founded: '',
    holdings: 'Marl slopes below the village of Château-Chalon planted to Savagnin and Chardonnay, with cellars cut into the rock.',
    style: 'Sous voile without compromise: the Vin Jaune and even the Côtes du Jura blanc raised under the yeast veil.',
    t: 'Walnut, curry leaf and brine, bone dry at table strength: the Vin Jaune standard',
    why: 'The reference producer for Château-Chalon, the appellation that makes Vin Jaune only and can declare a vintage void.',
    wines: [
      { n: 'Château-Chalon', grape: 'Savagnin', note: 'the reference Vin Jaune, in the 62 cl clavelin' },
      { n: 'Côtes du Jura Blanc', grape: 'Chardonnay with Savagnin', note: 'partly aged under veil, the house style in miniature' }
    ],
    traps: [
      'Vin Jaune is never fortified; it finishes at ordinary table-wine strength',
      'The clavelin holds 62 cl, said to be what survives six years of evaporation',
      'Château-Chalon is a village and an appellation, not an estate name'
    ]
  },
  {
    id: 'p-ganevat', p: 'Domaine Jean-François Ganevat',
    country: 'France, Rhône and the Mediterranean South', r: 'Jura', sub: 'Rotalier',
    founded: '',
    holdings: 'Old family vines at Rotalier in the southern Jura, including very old Chardonnay, plus plantings of near-forgotten local varieties and a large négociant range.',
    style: 'Mostly ouillé, that is topped up and not oxidative, in a region famous for the opposite, across many tiny cuvées.',
    t: 'Ouillé Chardonnay from old vines: lemon oil, chalk and tension, no veil in sight',
    why: 'Ganevat is the counterweight to the oxidative Jura and the example the Court uses for ouillé against sous voile.',
    wines: [
      { n: 'Côtes du Jura Les Grandes Teppes', grape: 'Chardonnay', note: 'old-vine Chardonnay in the fresh style' },
      { n: 'Chalasses Vieilles Vignes', grape: 'Chardonnay', note: 'a marl parcel bottled alone' },
      { n: 'Côtes du Jura Savagnin', grape: 'Savagnin', note: 'Savagnin without the veil' },
      { n: 'Vin de France cuvées', grape: 'rare Jura varieties', note: 'co-plantings and revived grapes outside the appellation' }
    ],
    traps: [
      'Ouillé means topped up, giving a fresh non-oxidative wine; sous voile is the opposite',
      'Many Ganevat bottlings are Vin de France, outside the Jura appellations'
    ]
  },
  {
    id: 'p-chave', p: 'Domaine Jean-Louis Chave',
    country: 'France, Rhône and the Mediterranean South', r: 'Hermitage', sub: 'Mauves',
    founded: '1481',
    holdings: 'Parcels across the Hermitage climats of Les Bessards, Le Méal, L\'Ermite, Péléat and Les Rocoules, plus old Saint-Joseph terraces at Mauves and Tournon. The family has grown vines here since 1481.',
    style: 'Blends the hill rather than bottling it parcel by parcel: the red assembled from granite and clay climats, the white Marsanne-led with a little Roussanne.',
    t: 'Granite Syrah of olive, pepper and iron; Marsanne that turns honeyed and immortal',
    why: 'Chave is the blending case against Chapoutier\'s parcel selections, and the domaine most likely to be named when an examiner asks who defines Hermitage.',
    wines: [
      { n: 'Hermitage Rouge', grape: 'Syrah', note: 'the assembled hill, the reference for blended Hermitage' },
      { n: 'Hermitage Blanc', grape: 'Marsanne with Roussanne', note: 'one of the few whites that outlives the reds' },
      { n: 'Cuvée Cathelin', grape: 'Syrah', note: 'a selection made only in chosen vintages' },
      { n: 'Saint-Joseph', grape: 'Syrah', note: 'from the historic terraces at Mauves' }
    ],
    traps: [
      'Chave blends the climats; Chapoutier bottles them separately',
      'Cuvée Cathelin is not an annual wine',
      'J.L. Chave Sélection is the négociant label, not the domaine'
    ]
  },
  {
    id: 'p-sang-des-cailloux', p: 'Domaine Le Sang des Cailloux',
    country: 'France, Rhône and the Mediterranean South', r: 'Vacqueyras', sub: 'Vacqueyras',
    founded: '',
    holdings: 'Old Grenache with Syrah and Mourvèdre on the stony ground east of the village, farmed by Serge Férigoule.',
    style: 'Whole bunches, old wood and no filtration: dark, dusty Vacqueyras with grip rather than sweetness.',
    t: 'Dust, black cherry and thyme: Vacqueyras reaching for Gigondas',
    why: 'The standard Vacqueyras grower, and a useful one because the red rotates through three cuvée names by vintage, which trips candidates who read them as three wines.',
    wines: [
      { n: 'Vacqueyras Cuvée Floureto', grape: 'Grenache with Syrah and Mourvèdre', note: 'one of three rotating names for the same red' },
      { n: 'Vacqueyras Cuvée Azalaïs', grape: 'Grenache-led blend', note: 'the same wine in another vintage' },
      { n: 'Vacqueyras Cuvée Doucinello', grape: 'Grenache-led blend', note: 'the third name in the rotation' },
      { n: 'Un Sang Blanc', grape: 'Roussanne, Clairette, Grenache Blanc', note: 'the estate white' }
    ],
    traps: [
      'Vacqueyras was promoted to cru in 1990, after Gigondas',
      'Floureto, Azalaïs and Doucinello are one wine under three labels, changing by vintage'
    ]
  },
  {
    id: 'p-barral', p: 'Domaine Léon Barral',
    country: 'France, Rhône and the Mediterranean South', r: 'Faugères', sub: 'Lenthéric',
    founded: '1993',
    holdings: 'Didier Barral farms schist at Lenthéric with cattle grazing between the rows and no ploughing, on family vines previously sold to the co-operative.',
    style: 'Carignan, Cinsault, Grenache and Mourvèdre with minimal sulphur and long ageing: perfumed rather than heavy.',
    t: 'Schist, fennel and wild raspberry: Faugères farmed like a meadow',
    why: 'Faugères is the Languedoc\'s schist appellation and Barral is its most quoted grower, as well as the region\'s low-intervention reference.',
    wines: [
      { n: 'Faugères Tradition', grape: 'Carignan, Cinsault, Grenache', note: 'the estate red' },
      { n: 'Faugères Jadis', grape: 'Syrah with Grenache and Carignan', note: 'the mid-tier selection' },
      { n: 'Faugères Valinière', grape: 'Mourvèdre with Syrah', note: 'the longest-lived cuvée' }
    ],
    traps: [
      'Faugères is defined by schist, unlike its limestone neighbours',
      'Valinière is Mourvèdre-dominant and the slowest to open'
    ]
  },
  {
    id: 'p-pallieres', p: 'Domaine Les Pallières',
    country: 'France, Rhône and the Mediterranean South', r: 'Gigondas', sub: 'Gigondas',
    founded: '',
    holdings: 'One of the oldest properties in Gigondas, held by the Roux family for generations and bought in 1998 by the importer Kermit Lynch with the Brunier brothers of Vieux Télégraphe.',
    style: 'High, cool parcels and old Grenache raised in large old wood: savoury and restrained rather than jammy.',
    t: 'Wild thyme, red cherry and cool stone from the top of the Gigondas amphitheatre',
    why: 'The estate that illustrates Gigondas\'s altitude, and the Court\'s example of an American importer taking an ownership stake in a French cru.',
    wines: [
      { n: 'Gigondas Terrasse du Diable', grape: 'Grenache with Mourvèdre and Cinsault', note: 'the higher, cooler terraces' },
      { n: 'Gigondas Les Racines', grape: 'Grenache-led', note: 'the older-vine bottling from lower slopes' }
    ],
    traps: [
      'Terrasse du Diable and Les Racines are two parcels of one estate, not two estates'
    ]
  },
  {
    id: 'p-gonon', p: 'Domaine Pierre Gonon',
    country: 'France, Rhône and the Mediterranean South', r: 'Saint-Joseph', sub: 'Mauves',
    founded: '',
    holdings: 'Old terraced parcels in the historic Saint-Joseph heartland around Mauves and Tournon, worked by hand.',
    style: 'Whole-cluster Syrah in old wood with low extraction: floral, peppery and light on its feet.',
    t: 'Bright red fruit, black pepper and river stone: Saint-Joseph at its most graceful',
    why: 'The reference for Saint-Joseph\'s historic core, useful when an examiner asks why the appellation\'s original hill is not the same thing as its later extension.',
    wines: [
      { n: 'Saint-Joseph Rouge', grape: 'Syrah', note: 'the reference for the appellation\'s original terraces' },
      { n: 'Saint-Joseph Les Oliviers', grape: 'Marsanne with Roussanne', note: 'white Saint-Joseph taken seriously' },
      { n: 'Vin de France Les Iles Feray', grape: 'Syrah', note: 'from vines outside the appellation boundary' }
    ],
    traps: [
      'Saint-Joseph was extended far beyond its original communes; Mauves and Tournon are the heart',
      'Les Oliviers is a white, not a red cuvée'
    ]
  },
  {
    id: 'p-overnoy', p: 'Domaine Pierre Overnoy',
    country: 'France, Rhône and the Mediterranean South', r: 'Jura', sub: 'Pupillin',
    founded: '',
    holdings: 'A few hectares at Pupillin, worked by Emmanuel Houillon since Pierre Overnoy handed over: Ploussard, Chardonnay and Savagnin.',
    style: 'No added sulphur at any stage and long élevage, producing a pale translucent Ploussard that became the natural-wine movement\'s founding red.',
    t: 'Translucent Ploussard: cranberry, blood orange and dust, almost weightless',
    why: 'Overnoy is the origin story of French natural wine, and Pupillin is the named sub-appellation whose growers spell Poulsard differently.',
    wines: [
      { n: 'Arbois-Pupillin Ploussard', grape: 'Poulsard, spelled Ploussard at Pupillin', note: 'the cult bottle of French natural wine' },
      { n: 'Arbois-Pupillin Chardonnay', grape: 'Chardonnay', note: 'topped up, not oxidative' },
      { n: 'Arbois-Pupillin Savagnin', grape: 'Savagnin', note: 'made in both idioms depending on the cuvée' }
    ],
    traps: [
      'Ploussard and Poulsard are the same grape, spelled differently at Pupillin',
      'Arbois-Pupillin is a sub-appellation of Arbois, not a separate AOC'
    ]
  },
  {
    id: 'p-rostaing', p: 'Domaine René Rostaing',
    country: 'France, Rhône and the Mediterranean South', r: 'Côte-Rôtie', sub: 'Ampuis',
    founded: '1971',
    holdings: 'Built from parcels inherited from Albert Dervieux-Thaize and Marius Gentaz-Dervieux, including holdings in the Côte Blonde and in La Landonne.',
    style: 'Destemmed fruit, older oak, gentle extraction: transparent and fine-boned rather than powerful.',
    t: 'Côte Blonde in silk, La Landonne in iron: the same hands showing you both hillsides',
    why: 'Rostaing lets a candidate taste Brune against Blonde from one cellar, which is why the name comes up when the Court asks how the two sides of Côte-Rôtie differ.',
    wines: [
      { n: 'Côte-Rôtie Côte Blonde', grape: 'Syrah with a little Viognier', note: 'the perfumed hillside from a grower who also makes its opposite' },
      { n: 'Côte-Rôtie La Landonne', grape: 'Syrah', note: 'the same lieu-dit Guigal bottles, read very differently' },
      { n: 'Côte-Rôtie Ampodium', grape: 'Syrah', note: 'the estate blend, formerly Cuvée Classique' },
      { n: 'Condrieu La Bonnette', grape: 'Viognier', note: 'the house Condrieu' }
    ],
    traps: [
      'Ampodium was formerly called Cuvée Classique',
      'Guigal also bottles a La Landonne; the lieu-dit is shared, the wine is not'
    ]
  },
  {
    id: 'p-santa-duc', p: 'Domaine Santa Duc',
    country: 'France, Rhône and the Mediterranean South', r: 'Gigondas', sub: 'Gigondas',
    founded: '',
    holdings: 'Old Grenache on the slopes beneath the Dentelles de Montmirail, farmed biodynamically, with parcels in Châteauneuf and Rasteau as well.',
    style: 'Grenache-led and increasingly whole-cluster, aged in large wood: firm, herbal and built to keep.',
    t: 'Garrigue, black olive and stone: Gigondas with the Dentelles standing behind it',
    why: 'A benchmark Gigondas grower, and a name that links the cru to Rasteau and Châteauneuf when an examiner works down the southern ladder.',
    wines: [
      { n: 'Gigondas Aux Lieux-Dits', grape: 'Grenache with Mourvèdre', note: 'the estate\'s principal Gigondas' },
      { n: 'Gigondas Les Hautes Garrigues', grape: 'Grenache-led', note: 'the old-vine selection' },
      { n: 'Châteauneuf-du-Pape Habemus Papam', grape: 'Grenache-led blend', note: 'the estate\'s Châteauneuf' },
      { n: 'Rasteau', grape: 'Grenache', note: 'the dry red cru, not the fortified wine' }
    ],
    traps: [
      'Rasteau is both a dry red cru and a fortified Vin Doux Naturel',
      'Gigondas sits higher and cooler than Châteauneuf, under the Dentelles de Montmirail'
    ]
  },
  {
    id: 'p-ogier', p: 'Domaine Stéphane Ogier',
    country: 'France, Rhône and the Mediterranean South', r: 'Côte-Rôtie', sub: 'Ampuis',
    founded: '',
    holdings: 'Many small parcels across Côte-Rôtie bottled as separate lieux-dits, plus Syrah and Viognier on the plateau released under IGP.',
    style: 'Precise and parcel-driven, with a soil map rather than a house blend at the centre of the range.',
    t: 'Lieu-dit Côte-Rôtie: schist, gneiss and sand each given a bottle of their own',
    why: 'Ogier is the current face of Côte-Rôtie\'s lieu-dit movement, a live argument about whether the appellation should map itself the way Burgundy does.',
    wines: [
      { n: 'Côte-Rôtie Belle Hélène', grape: 'Syrah', note: 'the estate\'s flagship single parcel' },
      { n: 'Côte-Rôtie Lancement', grape: 'Syrah', note: 'a Côte Blonde lieu-dit bottled alone' },
      { n: 'Côte-Rôtie Réserve du Domaine', grape: 'Syrah', note: 'the estate blend' },
      { n: 'La Rosine', grape: 'Syrah', note: 'plateau Syrah released as IGP' }
    ],
    traps: [
      'La Rosine is IGP Collines Rhodaniennes, not Côte-Rôtie',
      'Côte-Rôtie has no official cru hierarchy; lieu-dit names are the grower\'s choice'
    ]
  },
  {
    id: 'p-tempier', p: 'Domaine Tempier',
    country: 'France, Rhône and the Mediterranean South', r: 'Bandol', sub: 'Le Plan du Castellet',
    founded: '',
    holdings: 'Restanque terraces across Le Castellet, La Cadière and Le Plan du Castellet with the named parcels La Tourtine, La Migoua and Cabassaou; Lucien and Lulu Peyraud took the property on in 1936.',
    style: 'Mourvèdre-dominant, long macerations and old foudres: tannic and closed young, then leather, game and dried herb.',
    t: 'Mourvèdre: black olive, wild herb, blood and leather once the years do their work',
    why: 'Lucien Peyraud\'s campaigning built the Bandol appellation around Mourvèdre, so Tempier is both the style reference and the historical answer.',
    wines: [
      { n: 'Bandol Cuvée Classique', grape: 'Mourvèdre-led blend', note: 'the estate red' },
      { n: 'Bandol La Tourtine', grape: 'Mourvèdre-dominant', note: 'limestone parcel, the structured one' },
      { n: 'Bandol Cabassaou', grape: 'Mourvèdre, nearly all of it', note: 'the highest-Mourvèdre cuvée, a sheltered parcel below La Tourtine' },
      { n: 'Bandol La Migoua', grape: 'Mourvèdre with Grenache and Cinsault', note: 'the highest, most herbal parcel' },
      { n: 'Bandol Rosé', grape: 'Mourvèdre with Grenache and Cinsault', note: 'a rosé built to age' }
    ],
    traps: [
      'Bandol red requires at least 50 percent Mourvèdre and 18 months in wood',
      'Cabassaou is the highest-Mourvèdre cuvée, not the entry wine',
      'The rosé ages, but the exam answer for Bandol is the red'
    ]
  },
  {
    id: 'p-ott', p: 'Domaines Ott',
    country: 'France, Rhône and the Mediterranean South', r: 'Provence', sub: 'Côtes de Provence and Bandol',
    founded: '1896',
    holdings: '',
    style: 'Pale, structured rosé in a distinctive amphora-shaped bottle, plus coastal whites from Sémillon and Rolle at Clos Mireille.',
    t: 'The skittle-shaped bottle: pale, saline rosé that put Provence on wine lists',
    why: 'The historical premium rosé house, predating the modern Provence boom by nearly a century and still the name behind the recognisable bottle shape.',
    wines: [
      { n: 'Coeur de Grain Rosé', grape: 'Grenache, Cinsault, Mourvèdre, Syrah', note: 'the brand that carried Provence rosé onto wine lists' },
      { n: 'Clos Mireille Blanc de Blancs', grape: 'Sémillon with Rolle', note: 'a white from vineyards at the sea' },
      { n: 'Château Romassan Bandol', grape: 'Mourvèdre-led', note: 'the house\'s Bandol estate' }
    ],
    traps: [
      'Romassan is Bandol, not Côtes de Provence',
      'Coeur de Grain is a brand name, not a vineyard'
    ]
  },
  {
    id: 'p-guigal', p: 'E. Guigal',
    country: 'France, Rhône and the Mediterranean South', r: 'Côte-Rôtie', sub: 'Ampuis',
    founded: '1946',
    holdings: 'Founded by Étienne Guigal at Ampuis; owns Château d\'Ampuis and the La Mouline, La Landonne and La Turque parcels, bought Vidal-Fleury in 1984 and the Grippat and de Vallouit vineyards in 2001.',
    style: 'Late picking and very long élevage, up to 42 months in new oak for the single-vineyard Côte-Rôties.',
    t: 'The La Las: smoked violets, bacon fat, and new oak that takes 42 months to fold in',
    why: 'Guigal is the Court\'s entry point to Côte-Rôtie. The three La Las test whether a candidate can place Blonde against Brune and remember which cuvées carry co-fermented Viognier.',
    wines: [
      { n: 'Côte-Rôtie La Mouline', grape: 'Syrah with co-fermented Viognier', note: 'the Côte Blonde parcel, the perfumed one of the three' },
      { n: 'Côte-Rôtie La Landonne', grape: 'Syrah', note: 'Côte Brune, no Viognier, the structured La La' },
      { n: 'Côte-Rôtie La Turque', grape: 'Syrah with a little Viognier', note: 'Côte Brune, the last of the trio to appear' },
      { n: 'Château d\'Ampuis', grape: 'Syrah', note: 'a blend of several lieux-dits, the step below the La Las' },
      { n: 'Condrieu La Doriane', grape: 'Viognier', note: 'the house\'s oak-raised Condrieu' }
    ],
    traps: [
      'La Mouline is Côte Blonde; La Landonne and La Turque are Côte Brune',
      'La Landonne is the all-Syrah La La, the other two co-ferment Viognier',
      'Château d\'Ampuis is a Guigal cuvée, not an appellation',
      'Vidal-Fleury is Guigal-owned but still bottled under its own name'
    ]
  },
  {
    id: 'p-bonneau', p: 'Henri Bonneau',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Châteauneuf-du-Pape',
    founded: '',
    holdings: 'A few hectares of old Grenache, much of it on the La Crau plateau, worked from a cramped cellar beneath the village.',
    style: 'Very long ageing in ancient casks before an unpredictable release: rich, faintly oxidative and entirely unmodern.',
    t: 'Dried fig, game and old wood: Châteauneuf as the village made it before the critics',
    why: 'The collector\'s Châteauneuf and the standard example of an estate with no fixed release schedule and no hierarchy printed on the label.',
    wines: [
      { n: 'Réserve des Célestins', grape: 'Grenache-led', note: 'the cult bottle, released years late and not in every vintage' },
      { n: 'Cuvée Marie Beurrier', grape: 'Grenache-led', note: 'the other domaine cuvee, a separate cask selection' },
      { n: 'Les Rouliers', grape: 'Grenache-led', note: 'declassified wine sold without the appellation' }
    ],
    traps: [
      'Les Rouliers is declassified, not a Châteauneuf',
      'Célestins is not produced every year'
    ]
  },
  {
    id: 'p-colombo', p: 'Jean-Luc Colombo',
    country: 'France, Rhône and the Mediterranean South', r: 'Cornas', sub: 'Cornas',
    founded: '',
    holdings: 'Estate parcels in Cornas including Les Ruchets and La Louvée, alongside a large négociant range drawn from across the Rhône.',
    style: 'Destemmed fruit and new oak: the modernist case made inside a cru that had always fermented whole bunches in old wood.',
    t: 'Polished Cornas: cassis and mocha where the village expects tar and hide',
    why: 'Colombo\'s consultancy reshaped Rhône winemaking in the 1990s, and the estate is the clean example of a modern and traditional split inside one small appellation.',
    wines: [
      { n: 'Cornas Les Ruchets', grape: 'Syrah', note: 'old-vine Cornas in the modern idiom' },
      { n: 'Cornas La Louvée', grape: 'Syrah', note: 'a single-parcel bottling' },
      { n: 'Cornas Terres Brûlées', grape: 'Syrah', note: 'the estate\'s wider Cornas selection' },
      { n: 'Condrieu Amour de Dieu', grape: 'Viognier', note: 'the northern white in the same polished register' }
    ],
    traps: [
      'Colombo is both a Cornas grower and a négociant across the Rhône',
      'The modern style is a choice, not a defect; do not read new oak as a fault'
    ]
  },
  {
    id: 'p-chapoutier', p: 'M. Chapoutier',
    country: 'France, Rhône and the Mediterranean South', r: 'Hermitage', sub: 'Tain-l\'Hermitage',
    founded: '1808',
    holdings: 'Substantial holdings on the hill of Hermitage including old vines in Les Bessards, plus estates across the Rhône, Roussillon, Portugal and Australia.',
    style: 'Biodynamic farming, climats bottled separately, whites given real weight; every label carries Braille.',
    t: 'Parcel by parcel Hermitage: Bessards granite for iron, L\'Ermite for perfume and length',
    why: 'The house that made climat-level Hermitage normal, and the standard example of biodynamics practised at scale. The Braille labels are a favourite one-line question.',
    wines: [
      { n: 'Ermitage Le Pavillon', grape: 'Syrah', note: 'old vines on the granite of Les Bessards' },
      { n: 'Ermitage L\'Ermite', grape: 'Syrah', note: 'from the top of the hill beside the chapel' },
      { n: 'Ermitage De L\'Orée', grape: 'Marsanne', note: 'white Hermitage at parcel level' },
      { n: 'Côte-Rôtie La Mordorée', grape: 'Syrah', note: 'the house\'s Côte-Rôtie selection' },
      { n: 'Châteauneuf-du-Pape Barbe Rac', grape: 'Grenache', note: 'old-vine Grenache, the southern parcel selection' }
    ],
    traps: [
      'Chapoutier spells the top wines Ermitage; the appellation is Hermitage',
      'Le Pavillon is a parcel selection, not a separate appellation',
      'De L\'Orée is a white, not a red'
    ]
  },
  {
    id: 'p-mas-amiel', p: 'Mas Amiel',
    country: 'France, Rhône and the Mediterranean South', r: 'Maury', sub: 'Maury',
    founded: '1816',
    holdings: 'A large estate on black schist at Maury with old Grenache, and the open-air field of glass bonbonnes that gives the house its character.',
    style: 'Fortified Grenache left a year in glass demijohns through sun and frost before cask, plus dry Maury reds.',
    t: 'A year of demijohns in the open air: coffee, prune and walnut rancio',
    why: 'The clearest demonstration of deliberate oxidative ageing in a Vin Doux Naturel, and the standard name for Maury as against Banyuls.',
    wines: [
      { n: 'Maury Vintage', grape: 'Grenache', note: 'the early-bottled fruit-driven style' },
      { n: 'Maury 10 Ans d\'Âge', grape: 'Grenache', note: 'the oxidative house style in full' },
      { n: 'Maury Prestige 15 Ans', grape: 'Grenache', note: 'longer ageing, deeper rancio' },
      { n: 'Maury Sec', grape: 'Grenache with Carignan and Syrah', note: 'the dry red appellation, recognised long after the fortified wine' }
    ],
    traps: [
      'Maury Sec is a dry red appellation, separate from the fortified wine',
      'Rancio is sought here, not a fault',
      'Banyuls is coastal schist, Maury inland: both Grenache VDN'
    ]
  },
  {
    id: 'p-daumas-gassac', p: 'Mas de Daumas Gassac',
    country: 'France, Rhône and the Mediterranean South', r: 'Languedoc', sub: 'Aniane',
    founded: '1971',
    holdings: 'Aimé Guibert planted a cool valley of glacial powder soil near Aniane from 1971, on the advice of the geographer Henri Enjalbert.',
    style: 'Cabernet Sauvignon dominant in the red and a long list of varieties in the white, both released as IGP rather than under an appellation.',
    t: 'Cabernet in the garrigue: cassis, bay and cold stone from a glacial valley',
    why: 'The Languedoc\'s best-known deliberate IGP, and the estate most often cited when the Court asks whether the region can make wine of classed-growth ambition.',
    wines: [
      { n: 'Daumas Gassac Rouge', grape: 'Cabernet Sauvignon with many minor varieties', note: 'the wine that argued the Languedoc could make fine wine' },
      { n: 'Daumas Gassac Blanc', grape: 'Viognier, Chardonnay, Petit Manseng and others', note: 'a field blend of unusual breadth' }
    ],
    traps: [
      'It is IGP Saint-Guilhem-le-Désert, by choice and by blend, not AOP Languedoc',
      'The white is a field blend, not a varietal wine'
    ]
  },
  {
    id: 'p-mas-jullien', p: 'Mas Jullien',
    country: 'France, Rhône and the Mediterranean South', r: 'Terrasses du Larzac', sub: 'Jonquières',
    founded: '1985',
    holdings: 'Olivier Jullien farms parcels at varying altitudes around Jonquières, chosen for freshness rather than ripeness.',
    style: 'Carignan and Cinsault given equal standing with Syrah and Mourvèdre, and whites from Carignan Blanc and Chenin.',
    t: 'Cool-hilled Languedoc: dried herb, red fruit and a saline finish',
    why: 'Olivier Jullien led the argument that the Languedoc\'s future was altitude and old Carignan, which is the reasoning behind the Terrasses du Larzac appellation itself.',
    wines: [
      { n: 'Terrasses du Larzac Autour de Jonquières', grape: 'Carignan, Cinsault, Syrah, Mourvèdre', note: 'the estate\'s principal red' },
      { n: 'Mas Jullien Blanc', grape: 'Carignan Blanc with Chenin and Grenache', note: 'a white built on unfashionable local grapes' }
    ],
    traps: [
      'Terrasses du Larzac is now its own AOP, promoted from a Languedoc subzone',
      'Carignan here is a quality grape, not the bulk-wine cliche'
    ]
  },
  {
    id: 'p-jaboulet', p: 'Paul Jaboulet Aîné',
    country: 'France, Rhône and the Mediterranean South', r: 'Hermitage', sub: 'Tain-l\'Hermitage',
    founded: '1834',
    holdings: 'Owns the chapel of Saint-Christophe at the summit of the hill of Hermitage and vineyards across the northern and southern Rhône; bought by the Frey family in 2006.',
    style: 'Grower and négociant together: La Chapelle drawn chiefly from Les Bessards and Le Méal and built for decades in bottle.',
    t: 'La Chapelle\'s 1961: the vintage that fixed Hermitage in every collector\'s mind',
    why: 'La Chapelle is the single most quoted Hermitage, and its decline through the 1990s and recovery after the 2006 sale is the Court\'s example of an estate\'s fortunes turning.',
    wines: [
      { n: 'Hermitage La Chapelle', grape: 'Syrah', note: 'the most cited Hermitage of all, 1961 and 1978 the reference vintages' },
      { n: 'Crozes-Hermitage Domaine de Thalabert', grape: 'Syrah', note: 'the benchmark estate Crozes' },
      { n: 'Hermitage Le Chevalier de Stérimberg', grape: 'Marsanne and Roussanne', note: 'the white, named for the hermit of the legend' },
      { n: 'Cornas Domaine de Saint Pierre', grape: 'Syrah', note: 'the house\'s Cornas holding' }
    ],
    traps: [
      'The chapel is a landmark and a name, not a classified vineyard',
      'Domaine de Thalabert is Crozes-Hermitage, not Hermitage',
      'Stérimberg is the hermit of the hill\'s founding story, and the white cuvée'
    ]
  },
  {
    id: 'p-allemand', p: 'Thierry Allemand',
    country: 'France, Rhône and the Mediterranean South', r: 'Cornas', sub: 'Cornas',
    founded: '',
    holdings: 'Steep terraces rebuilt by hand, with the old-vine Reynard parcel and the younger Chaillot.',
    style: 'Very low sulphur and whole bunches where the vintage allows: perfumed and vivid, far less forbidding in youth than the old Cornas template.',
    t: 'Violet and crushed raspberry over granite dust: Cornas with the shutters open',
    why: 'Allemand is the bridge between traditional Cornas and the low-intervention movement, and the name that shows the cru need not be brutal in youth.',
    wines: [
      { n: 'Cornas Reynard', grape: 'Syrah', note: 'the cru\'s most quoted single parcel' },
      { n: 'Cornas Chaillot', grape: 'Syrah', note: 'the younger-vine bottling, earlier to open' }
    ],
    traps: [
      'Reynard is a shared lieu-dit, not an Allemand monopole',
      'Cornas has no official cru or lieu-dit hierarchy in its appellation law'
    ]
  },
  {
    id: 'w-hommage-jacques-perrin', p: 'Châteauneuf-du-Pape Hommage à Jacques Perrin',
    by: 'p-beaucastel',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Courthézon',
    founded: 'first vintage 1989',
    holdings: 'A selection built around Beaucastel\'s oldest Mourvèdre with Grenache, Syrah and Counoise, declared only in the strongest vintages.',
    style: 'Mourvèdre-dominant and savoury: game, hide, tapenade and tar over dark fruit, with decades of life ahead of it.',
    t: 'Old Mourvèdre in charge: hide, tapenade and truffle over black fruit',
    why: 'Named for Jacques Perrin, it is Châteauneuf\'s clearest Mourvèdre statement and a standard example of a cuvée withheld in weaker years.',
    wines: [
      { n: 'Hommage à Jacques Perrin', grape: 'Mourvèdre-dominant blend', note: 'the Mourvèdre answer in an appellation people default to Grenache' }
    ],
    traps: [
      'Not produced in every vintage',
      'Mourvèdre-dominant, unlike almost every other Châteauneuf',
      'Beaucastel\'s Roussanne Vieilles Vignes is the white flagship, a separate wine'
    ]
  },
  {
    id: 'w-reserve-des-celestins', p: 'Châteauneuf-du-Pape Réserve des Célestins',
    by: 'p-bonneau',
    country: 'France, Rhône and the Mediterranean South', r: 'Châteauneuf-du-Pape', sub: 'Châteauneuf-du-Pape',
    founded: '',
    holdings: 'Old Grenache, much of it from the La Crau plateau, aged for years in ancient foudres in a cellar beneath the village before an unpredictable release.',
    style: 'Grenache at full ripeness given time rather than technique: dried fruit, game, iron and a faintly oxidative edge.',
    t: 'Dried fig, hide and iron: Grenache aged in wood until it stops arguing',
    why: 'The cult bottle of Châteauneuf, and the clearest case of an estate releasing on its own judgement rather than on a schedule.',
    wines: [
      { n: 'Réserve des Célestins', grape: 'Grenache-led', note: 'released when Bonneau decided it was ready, often long after the vintage' }
    ],
    traps: [
      'Not made every year and frequently released years late',
      'Cuvée Marie Beurrier is a separate domaine cuvée, not a second label of Célestins',
      'Les Rouliers is declassified wine, sold without the appellation'
    ]
  },
  {
    id: 'w-la-landonne', p: 'Côte-Rôtie La Landonne',
    by: 'p-guigal',
    country: 'France, Rhône and the Mediterranean South', r: 'Côte-Rôtie', sub: 'Côte Brune',
    founded: 'first vintage 1978',
    holdings: 'A steep parcel of iron-rich schist on the Côte Brune side, planted entirely to Syrah.',
    style: 'The structured La La: tar, black fruit and firm tannin, with the same 42 months in new oak.',
    t: 'Iron, tar and black olive: the Brune La La, all shoulders and no Viognier',
    why: 'The all-Syrah La La, set against La Mouline whenever the Court asks a candidate to separate Brune from Blonde.',
    wines: [
      { n: 'La Landonne', grape: 'Syrah', note: 'the all-Syrah La La, the one with no Viognier' }
    ],
    traps: [
      'La Landonne is 100 percent Syrah',
      'Rostaing and others bottle a La Landonne from the same lieu-dit; the name is not Guigal\'s alone'
    ]
  },
  {
    id: 'w-la-mouline', p: 'Côte-Rôtie La Mouline',
    by: 'p-guigal',
    country: 'France, Rhône and the Mediterranean South', r: 'Côte-Rôtie', sub: 'Côte Blonde',
    founded: 'first vintage 1966',
    holdings: 'A parcel of old vines in the Côte Blonde with Viognier interplanted among the Syrah and co-fermented with it.',
    style: 'The most perfumed of the three La Las: silk, violets and an apricot lift from the Viognier, with 42 months in new oak.',
    t: 'Violets, apricot skin and sweet oak: the silk glove of the Côte Blonde',
    why: 'The first of Guigal\'s La Las and the cleanest example of co-fermented Viognier in Côte-Rôtie, which the appellation permits up to 20 percent.',
    wines: [
      { n: 'La Mouline', grape: 'Syrah with roughly a tenth Viognier', note: 'the Côte Blonde La La, the first of the three to appear' }
    ],
    traps: [
      'Côte Blonde, not Brune',
      'The Viognier is co-fermented with the Syrah, not blended in afterwards',
      'Côte-Rôtie permits up to 20 percent Viognier; La Mouline carries far less'
    ]
  },
  {
    id: 'w-la-turque', p: 'Côte-Rôtie La Turque',
    by: 'p-guigal',
    country: 'France, Rhône and the Mediterranean South', r: 'Côte-Rôtie', sub: 'Côte Brune',
    founded: 'first vintage 1985',
    holdings: 'A Côte Brune parcel that came to Guigal with the purchase of Vidal-Fleury in 1984.',
    style: 'Between the other two: dark fruit and spice with a small Viognier lift and the same long new-oak élevage.',
    t: 'Spice, dark cherry and smoke: the Brune parcel with a whisper of Viognier',
    why: 'Completes the trio, and its first vintage and Brune address are exactly the details an examiner checks.',
    wines: [
      { n: 'La Turque', grape: 'Syrah with a little Viognier', note: 'the last of the three La Las to appear' }
    ],
    traps: [
      'La Turque is Côte Brune but does carry some Viognier, unlike La Landonne',
      'It arrived with the Vidal-Fleury purchase, which is why it is the youngest of the three'
    ]
  },
  {
    id: 'w-ermitage-le-pavillon', p: 'Ermitage Le Pavillon',
    by: 'p-chapoutier',
    country: 'France, Rhône and the Mediterranean South', r: 'Hermitage', sub: 'Les Bessards',
    founded: 'first vintage 1989',
    holdings: 'Old Syrah on the granite of Les Bessards, the firmest of the Hermitage climats, bottled as a parcel selection.',
    style: 'Dense, mineral and slow: the granite expression of the hill, raised in barrel and needing many years.',
    t: 'Bessards granite: graphite, black fruit and a tannin that takes twenty years',
    why: 'Le Pavillon is the climat argument in a bottle, the direct counterpart to Chave\'s blend of the whole hill.',
    wines: [
      { n: 'Ermitage Le Pavillon', grape: 'Syrah', note: 'the wine that opened Chapoutier\'s parcel-selection era' }
    ],
    traps: [
      'Chapoutier labels it Ermitage without the H; the appellation is Hermitage',
      'Les Bessards is a climat of Hermitage, not an appellation',
      'It is a selection of old vines, not a walled monopole'
    ]
  },
  {
    id: 'w-cuvee-cathelin', p: 'Hermitage Cuvée Cathelin',
    by: 'p-chave',
    country: 'France, Rhône and the Mediterranean South', r: 'Hermitage', sub: 'Tain-l\'Hermitage',
    founded: 'first vintage 1990',
    holdings: 'A selection from the domaine\'s own Hermitage parcels, chiefly Les Bessards and Le Méal, made only in vintages Jean-Louis Chave judges worthy.',
    style: 'A denser, more structured cut of the same fruit that goes into the domaine Hermitage; the label carries a design by the painter Bernard Cathelin.',
    t: 'The same hill, concentrated: graphite, blood orange and black olive under pressure',
    why: 'The Court\'s example of a selection cuvée released only in chosen vintages, and the one Chave bottling that outprices the domaine wine many times over.',
    wines: [
      { n: 'Cuvée Cathelin', grape: 'Syrah', note: 'a selection, not a separate vineyard, and absent in most years' }
    ],
    traps: [
      'Cathelin is a selection from domaine parcels, not a single vineyard',
      'It is not produced every year',
      'Cathelin was a painter, not a vineyard or a family name'
    ]
  },
  {
    id: 'w-hermitage-la-chapelle', p: 'Hermitage La Chapelle',
    by: 'p-jaboulet',
    country: 'France, Rhône and the Mediterranean South', r: 'Hermitage', sub: 'Tain-l\'Hermitage',
    founded: '',
    holdings: 'Drawn chiefly from Les Bessards and Le Méal on the hill of Hermitage, and named for the chapel of Saint-Christophe at the summit, which Jaboulet owns.',
    style: 'Syrah built for decades: black fruit, smoked meat, olive and iron, closed for years before it opens.',
    t: 'Smoked bacon, black olive and iron: the Hermitage every candidate can name',
    why: 'The most cited Hermitage of all, and the vehicle for questions on the hill\'s climats, on the quality dip through the 1990s and on the recovery after the 2006 sale.',
    wines: [
      { n: 'Hermitage La Chapelle', grape: 'Syrah', note: '1961 and 1978 are the reference vintages for northern Rhône Syrah' }
    ],
    traps: [
      'The chapel is a landmark and a name, not a classified vineyard',
      'La Chapelle is the red; Le Chevalier de Stérimberg is the white',
      'Domaine de Thalabert is the house\'s Crozes-Hermitage, a different wine entirely'
    ]
  },
  {
    id: 'p-allegrini', p: 'Allegrini',
    country: 'Italy, Piedmont and the North', r: 'Valpolicella', sub: 'Fumane, Valpolicella Classico',
    founded: '',
    holdings: 'Vineyards at Fumane in the Classico zone, including the La Grola hill and the La Poja parcel at its crown.',
    style: 'Modern and clean: controlled drying chambers, French oak, and a move from pergola to guyot training.',
    t: 'Cherry, dried herb and polish: Valpolicella pulled into the modern age',
    why: 'La Poja is the argument that Corvina alone can carry a serious dry red, and the estate is the modernising force in the Classico zone.',
    wines: [
      { n: 'La Poja', grape: 'Corvina', note: 'a single-vineyard varietal Corvina from fresh grapes, bottled as IGT' },
      { n: 'Amarone della Valpolicella Classico', grape: 'Corvina-led blend', note: 'the modern Classico style in polished form' },
      { n: 'Palazzo della Torre', grape: 'Corvina-led blend', note: 'made by a double fermentation on dried grapes' }
    ],
    traps: [
      'La Poja is bottled as IGT because a varietal Corvina falls outside the Valpolicella blend rules',
      'Palazzo della Torre uses a ripasso-like double fermentation but is not labelled Ripasso'
    ]
  },
  {
    id: 'p-alois-lageder', p: 'Alois Lageder',
    country: 'Italy, Piedmont and the North', r: 'Alto Adige', sub: 'Magrè',
    founded: '1823',
    holdings: 'Vineyards across Alto Adige from the valley floor to high slopes, farmed biodynamically, with a gravity-flow winery at Magre.',
    style: 'Site-specific and restrained: whites of clarity, reds built on Lagrein and Pinot Nero.',
    t: 'Alpine clarity: white peach, wet stone, a cool line through everything',
    why: 'The estate most associated with biodynamic farming in Alto Adige and with taking the region\'s Chardonnay seriously.',
    wines: [
      { n: 'Löwengang Chardonnay', grape: 'Chardonnay', note: 'the bottling that argued for serious Chardonnay in the Alps' },
      { n: 'Cor Römigberg', grape: 'Cabernet Sauvignon', note: 'a single-vineyard red from a warm slope' },
      { n: 'Lagrein Lindenburg', grape: 'Lagrein', note: 'the dark native red of Bolzano' }
    ],
    traps: [
      'Alto Adige is Sudtirol: every village and vineyard carries an Italian and a German name',
      'Lagrein and Schiava are the two native reds of the Bolzano area and are frequently swapped'
    ]
  },
  {
    id: 'p-anselmi', p: 'Anselmi',
    country: 'Italy, Piedmont and the North', r: 'Veneto', sub: 'Monteforte d\'Alpone',
    founded: '',
    holdings: 'Vineyards in the Soave Classico hills at Monteforte d\'Alpone, though the wines are not labelled Soave.',
    style: 'Low yields, oak on the top wines, and ripe Garganega with clear definition.',
    t: 'Garganega set loose: acacia honey, ripe pear, almond and firm acid',
    why: 'Anselmi left the Soave DOC in 2000 and bottles as IGT, the standard example of a producer rejecting an appellation on quality grounds.',
    wines: [
      { n: 'Capitel Foscarino', grape: 'Garganega', note: 'the hill wine, a step below Capitel Croce in oak' },
      { n: 'Capitel Croce', grape: 'Garganega', note: 'barrel-fermented and built to age' },
      { n: 'I Capitelli', grape: 'Garganega', note: 'a dried-grape sweet wine made outside the Recioto rules' }
    ],
    traps: [
      'The wines come from Soave Classico vineyards but are labelled Veneto IGT',
      'I Capitelli is a passito wine that cannot be called Recioto di Soave'
    ]
  },
  {
    id: 'p-antoniolo', p: 'Antoniolo',
    country: 'Italy, Piedmont and the North', r: 'Gattinara', sub: 'Gattinara',
    founded: '1948',
    holdings: 'Vineyards on Gattinara\'s volcanic slopes, including Osso San Grato, San Francesco and Castelle.',
    style: 'Cru by cru in large oak: lighter-framed than Barolo, higher in acid, iron-scented.',
    t: 'Nebbiolo on porphyry: rose, iron filings, sour cherry, a long thin line',
    why: 'The name that kept Gattinara\'s cru tradition alive through Alto Piemonte\'s collapse, and the cleanest example of Nebbiolo as Spanna.',
    wines: [
      { n: 'Gattinara Osso San Grato', grape: 'Nebbiolo', note: 'the firmest and longest-lived of the crus' },
      { n: 'Gattinara San Francesco', grape: 'Nebbiolo', note: 'the more perfumed parcel' },
      { n: 'Gattinara', grape: 'Nebbiolo', note: 'the estate blend, the entry to Alto Piemonte' }
    ],
    traps: [
      'In Alto Piemonte Nebbiolo is called Spanna',
      'Gattinara\'s soils are volcanic porphyry, not the calcareous marl of the Langhe'
    ]
  },
  {
    id: 'p-arpepe', p: 'Ar.Pe.Pe.',
    country: 'Italy, Piedmont and the North', r: 'Valtellina', sub: 'Sondrio',
    founded: '',
    holdings: 'Terraced vineyards in the Sassella, Grumello and Inferno subzones of Valtellina Superiore.',
    style: 'Long macerations, old large casks and very late release: pale, high-acid mountain Nebbiolo.',
    t: 'Alpine Nebbiolo: wild strawberry, mountain herb, acidity like cold air',
    why: 'Valtellina is where Nebbiolo is called Chiavennasca, and this estate is why the region is examinable again.',
    wines: [
      { n: 'Valtellina Superiore Sassella Rocce Rosse Riserva', grape: 'Nebbiolo', note: 'released many years after the vintage' },
      { n: 'Valtellina Superiore Sassella Stella Retica', grape: 'Nebbiolo', note: 'the more approachable Sassella' },
      { n: 'Valtellina Superiore Grumello Rocca de Piro', grape: 'Nebbiolo', note: 'the softer neighbouring subzone' }
    ],
    traps: [
      'Chiavennasca is Nebbiolo in Valtellina',
      'The Valtellina Superiore subzones are Maroggia, Sassella, Grumello, Inferno and Valgella'
    ]
  },
  {
    id: 'p-bartolo-mascarello', p: 'Bartolo Mascarello',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Barolo',
    founded: '1919',
    holdings: 'A small holding in Cannubi, San Lorenzo and Rue in the commune of Barolo, with Rocche dell\'Annunziata in La Morra.',
    style: 'One Barolo, blended from all four sites, fermented in cement and aged in large old botti.',
    t: 'No barrique, no Berlusconi: pale, perfumed, fiercely classical',
    why: 'The traditionalist standard in the Barolo Wars, and the house that refuses single-cru bottling on principle.',
    wines: [
      { n: 'Barolo', grape: 'Nebbiolo', note: 'the blended Barolo, an argument that the commune matters more than the cru' },
      { n: 'Dolcetto d\'Alba', grape: 'Dolcetto', note: 'the everyday red of the Langhe made without concession' },
      { n: 'Freisa', grape: 'Freisa', note: 'the local red kept alive when almost nobody bottled it' }
    ],
    traps: [
      'No relation to Giuseppe Mascarello, a separate family at Monchiero',
      'The estate bottles one Barolo from four vineyards, so there is no Cannubi to ask for'
    ]
  },
  {
    id: 'p-bellavista', p: 'Bellavista',
    country: 'Italy, Piedmont and the North', r: 'Franciacorta', sub: 'Erbusco',
    founded: '1977',
    holdings: 'Vineyards across several Franciacorta communes, based at Erbusco.',
    style: 'Barrel-fermented base wines and long lees ageing: broad, creamy and generous.',
    t: 'Cream and white peach over chalk: Franciacorta\'s softer register',
    why: 'The other pillar of Franciacorta, and the house whose Satèn shows the appellation\'s distinctive lower-pressure blanc de blancs.',
    wines: [
      { n: 'Franciacorta Riserva Vittorio Moretti', grape: 'Chardonnay and Pinot Nero', note: 'the long-aged prestige bottling' },
      { n: 'Franciacorta Gran Cuvée Satèn', grape: 'Chardonnay', note: 'the appellation\'s own softer, lower-pressure style' },
      { n: 'Franciacorta Alma Cuvée Brut', grape: 'Chardonnay-led blend', note: 'the house\'s non-vintage base' }
    ],
    traps: [
      'Satèn is made from white grapes only and bottled at lower pressure than Brut',
      'Satèn is always a blanc de blancs, but not every Franciacorta blanc de blancs is Satèn'
    ]
  },
  {
    id: 'p-bertani', p: 'Bertani',
    country: 'Italy, Piedmont and the North', r: 'Valpolicella', sub: 'Valpantena',
    founded: '1857',
    holdings: 'Vineyards in the Valpantena valley and in the Classico zone, with large ageing cellars.',
    style: 'The old Amarone style: long ageing in large Slavonian oak and release many years after the vintage.',
    t: 'Old-school Amarone: dried fig, leather, tobacco, and surprising freshness',
    why: 'The benchmark for the pre-modern Amarone style, and the contrast to both Quintarelli\'s slowness and Dal Forno\'s density.',
    wines: [
      { n: 'Amarone della Valpolicella Classico', grape: 'Corvina and Rondinella', note: 'released after long cask ageing, the traditional reference' },
      { n: 'Secco-Bertani', grape: 'Corvina-led blend', note: 'the historic dry Veronese red under its own name' },
      { n: 'Valpolicella Valpantena Ripasso', grape: 'Corvina-led blend', note: 'the named subzone in its everyday form' }
    ],
    traps: [
      'Amarone is dry despite its dried-grape origin; Recioto is the sweet one',
      'Valpantena is a named subzone of Valpolicella, not a separate DOC'
    ]
  },
  {
    id: 'p-bisol', p: 'Bisol',
    country: 'Italy, Piedmont and the North', r: 'Prosecco', sub: 'Valdobbiadene',
    founded: '',
    holdings: 'Vineyards across the steep Valdobbiadene hills, including parcels in the Cartizze cru.',
    style: 'Tank method, cool and short, across the full range from Brut to Dry.',
    t: 'Green apple, white flowers, a soft fast mousse off the steep hills',
    why: 'Cartizze is Prosecco\'s top site and the Rive system its single-slope tier; Bisol is the name attached to both.',
    wines: [
      { n: 'Valdobbiadene Superiore di Cartizze', grape: 'Glera', note: 'from the small hill at the top of the appellation, usually finished Dry' },
      { n: 'Valdobbiadene Prosecco Superiore Brut', grape: 'Glera', note: 'the everyday expression of the DOCG' }
    ],
    traps: [
      'Prosecco\'s grape was renamed Glera in 2009 so that Prosecco could be protected as a place name',
      'Cartizze is usually made in the sweeter Dry style, not Brut'
    ]
  },
  {
    id: 'p-braida', p: 'Braida',
    country: 'Italy, Piedmont and the North', r: 'Monferrato', sub: 'Rocchetta Tanaro, Asti',
    founded: '',
    holdings: 'Vineyards around Rocchetta Tanaro in the Asti hills, including the Bricco dell\'Uccellone site.',
    style: 'Barbera taken seriously: ripe fruit, new barriques, and the acidity left intact.',
    t: 'Barbera with a cellar\'s ambition: black cherry, spice, acid still singing',
    why: 'Giacomo Bologna\'s 1982 Bricco dell\'Uccellone is the turning point after which Barbera was allowed to be a serious wine.',
    wines: [
      { n: 'Barbera d\'Asti Bricco dell\'Uccellone', grape: 'Barbera', note: 'first made in 1982, the wine that proved Barbera could carry barrique' },
      { n: 'Ai Suma', grape: 'Barbera', note: 'a late-harvest selection in the biggest years' },
      { n: 'Moscato d\'Asti Vigna Senza Nome', grape: 'Moscato Bianco', note: 'the other side of the Asti hills' }
    ],
    traps: [
      'Barbera is naturally high in acid and low in tannin: oak was added for structure, not to tame tannin',
      'Barbera d\'Asti is a DOCG; Barbera d\'Alba is a DOC'
    ]
  },
  {
    id: 'p-bruno-giacosa', p: 'Bruno Giacosa',
    country: 'Italy, Piedmont and the North', r: 'Barbaresco', sub: 'Neive',
    founded: '1900',
    holdings: 'Estate vineyards at Falletto in Serralunga d\'Alba and Asili in Barbaresco, alongside a long history of buying fruit from named growers.',
    style: 'No new oak, long ageing and extraordinary site selection: perfume and structure without makeup.',
    t: 'The red label: rose, tar, white truffle, tannin drawn in thread',
    why: 'Giacosa\'s red Riserva label is one of the most recognised marks in Italy, and his ability to make both Barolo and Barbaresco at the top is unusual.',
    wines: [
      { n: 'Barbaresco Asili Riserva', grape: 'Nebbiolo', note: 'the red-label Riserva, declared only in the best years' },
      { n: 'Barolo Falletto Vigna Le Rocche Riserva', grape: 'Nebbiolo', note: 'the Serralunga estate wine, his Barolo summit' },
      { n: 'Barbaresco Santo Stefano', grape: 'Nebbiolo', note: 'from bought Neive fruit, the historic bottling that built the name' },
      { n: 'Roero Arneis', grape: 'Arneis', note: 'an early serious treatment of the Roero white' }
    ],
    traps: [
      'The red label means Riserva and the white label the standard bottling: it is not a merchant\'s invention',
      'He released no Riserva at all from the 2006 vintage'
    ]
  },
  {
    id: 'p-ca-del-bosco', p: 'Ca\' del Bosco',
    country: 'Italy, Piedmont and the North', r: 'Franciacorta', sub: 'Erbusco',
    founded: '1968',
    holdings: 'Vineyards around Erbusco in the heart of Franciacorta, planted to Chardonnay, Pinot Nero and Pinot Bianco.',
    style: 'Technically obsessive: whole bunches washed before pressing, oak-fermented base wines, long lees ageing.',
    t: 'Franciacorta at full stretch: hazelnut, pastry, citrus oil, a slow fine mousse',
    why: 'The most exacting Franciacorta house, and the name paired with Bellavista whenever the appellation is asked about.',
    wines: [
      { n: 'Franciacorta Annamaria Clementi Riserva', grape: 'Chardonnay-led blend', note: 'the prestige cuvee, held on lees for years' },
      { n: 'Franciacorta Cuvée Prestige', grape: 'Chardonnay-led blend', note: 'the house\'s volume wine and its calling card' },
      { n: 'Franciacorta Vintage Collection Dosage Zero', grape: 'Chardonnay and Pinot Nero', note: 'undosed and vintage-dated' }
    ],
    traps: [
      'Franciacorta is traditional method; Prosecco is tank method',
      'Franciacorta Riserva requires 60 months on the lees'
    ]
  },
  {
    id: 'p-cantina-terlano', p: 'Cantina Terlano',
    country: 'Italy, Piedmont and the North', r: 'Alto Adige', sub: 'Terlano',
    founded: '1893',
    holdings: 'A growers\' co-operative on the porphyry and quartz slopes around Terlano.',
    style: 'Whites of high acid and reductive purity built to age, with a library of old vintages released late.',
    t: 'Quartz and lemon oil: Pinot Bianco with twenty years in front of it',
    why: 'The northern co-operative model at its best, and the standing answer to whether Pinot Bianco can age.',
    wines: [
      { n: 'Pinot Bianco Vorberg Riserva', grape: 'Pinot Bianco', note: 'the wine that proves Pinot Bianco ages' },
      { n: 'Terlaner I Grande Cuvée', grape: 'Pinot Bianco, Chardonnay and Sauvignon', note: 'the classic Terlano field blend at its top level' },
      { n: 'Rarity', grape: 'Pinot Bianco', note: 'released around a decade after the vintage from the cellar\'s library' }
    ],
    traps: [
      'In Alto Adige co-operatives make much of the best wine: they are not a lesser tier',
      'Terlaner is simply the German form of Terlano'
    ]
  },
  {
    id: 'p-cantina-tramin', p: 'Cantina Tramin',
    country: 'Italy, Piedmont and the North', r: 'Alto Adige', sub: 'Termeno',
    founded: '1898',
    holdings: 'A co-operative of growers around Termeno, with Gewürztraminer on the warmer slopes.',
    style: 'Aromatic whites with clear varietal definition and dry finishes.',
    t: 'Lychee, rose and ginger kept dry and taut by mountain nights',
    why: 'The village of Tramin gives Gewürztraminer its name, and Nussbaumer is the bottling examiners expect for Italian Gewürztraminer.',
    wines: [
      { n: 'Gewürztraminer Nussbaumer', grape: 'Gewürztraminer', note: 'the single-vineyard bottling that sets the Italian standard' },
      { n: 'Gewürztraminer Epokale', grape: 'Gewürztraminer', note: 'a late-released selection aged in a disused mine tunnel' },
      { n: 'Stoan', grape: 'white blend', note: 'the house\'s Chardonnay-led white blend' }
    ],
    traps: [
      'The village is Termeno in Italian and Tramin in German',
      'The link between the grape and the village is a naming tradition, not a settled origin'
    ]
  },
  {
    id: 'p-cappellano', p: 'Cappellano',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Serralunga d\'Alba',
    founded: '19th century',
    holdings: 'The Gabutti vineyard in Serralunga d\'Alba, farmed in two parcels: vines grafted on American rootstock and a plot on its own roots.',
    style: 'Deliberately uncommercial: no samples to critics, no scores, long ageing in old cask.',
    t: 'Serralunga iron and quinine: ungrafted vines and the Chinato that began here',
    why: 'Pie Franco is the ungrafted-vine question in Barolo, and Cappellano is the name attached to the invention of Barolo Chinato.',
    wines: [
      { n: 'Barolo Otin Fiorin Piè Rupestris', grape: 'Nebbiolo', note: 'the grafted parcel, the estate\'s standard-bearer' },
      { n: 'Barolo Otin Fiorin Piè Franco', grape: 'Nebbiolo', note: 'ungrafted vines on their own roots, one of the rarest Barolos' },
      { n: 'Barolo Chinato', grape: 'Nebbiolo', note: 'the aromatised Barolo the family is credited with creating' }
    ],
    traps: [
      'Pie Franco means own-rooted; Pie Rupestris means grafted on rupestris rootstock',
      'Barolo Chinato is an aromatised wine flavoured with cinchona bark, not a sweet Barolo'
    ]
  },
  {
    id: 'p-cavallotto', p: 'Cavallotto',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Castiglione Falletto',
    founded: '',
    holdings: 'The Bricco Boschis hill in Castiglione Falletto, farmed in its entirety by the family, plus a parcel in Vignolo.',
    style: 'No new oak, long macerations, large casks, and Riservas held well past the legal minimum.',
    t: 'One hill, held back for years: dried rose, liquorice, savoury tannin',
    why: 'A single-hill estate that never joined the barrique camp, and the textbook case of a family farming one cru entire.',
    wines: [
      { n: 'Barolo Bricco Boschis', grape: 'Nebbiolo', note: 'the whole hill in one wine' },
      { n: 'Barolo Bricco Boschis Vigna San Giuseppe Riserva', grape: 'Nebbiolo', note: 'the heart of the hill, released only after long ageing' },
      { n: 'Barolo Vignolo Riserva', grape: 'Nebbiolo', note: 'the firmer, later-drinking Riserva' }
    ],
    traps: [
      'Vigna San Giuseppe is a parcel inside Bricco Boschis, not a separate cru'
    ]
  },
  {
    id: 'p-cleto-chiarli', p: 'Cleto Chiarli',
    country: 'Italy, Piedmont and the North', r: 'Emilia-Romagna', sub: 'Modena',
    founded: '1860',
    holdings: 'Vineyards around Modena planted to Lambrusco di Sorbara and Lambrusco Grasparossa.',
    style: 'Dry, pale and high-acid Sorbara alongside darker Grasparossa, made both in tank and refermented in bottle.',
    t: 'Pale pink froth, sour cherry and violet: Lambrusco that argues for itself',
    why: 'Lambrusco is a family of grapes rather than one, and Sorbara against Grasparossa is the separation the Court expects.',
    wines: [
      { n: 'Lambrusco di Sorbara Vecchia Modena Premium', grape: 'Lambrusco di Sorbara', note: 'pale, dry and sharply acidic' },
      { n: 'Lambrusco Grasparossa di Castelvetro', grape: 'Lambrusco Grasparossa', note: 'darker, more tannic, the other face of the family' }
    ],
    traps: [
      'Lambrusco di Sorbara is pale because the variety sets fruit poorly and is usually blended with Salamino',
      'Dry Lambrusco is the traditional style; the sweet export version came later'
    ]
  },
  {
    id: 'p-domenico-clerico', p: 'Domenico Clerico',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Monforte d\'Alba',
    founded: '',
    holdings: 'Ginestra and Mosconi in Monforte d\'Alba, worked from a modern cellar cut into the hillside.',
    style: 'Barriques, rotary fermenters and dark glossy fruit: the modernist template in Monforte.',
    t: 'Monforte in French oak: black cherry, espresso, mocha over firm tannin',
    why: 'One of the named Barolo Boys, and Ciabot Mentin is the modernist wine set against Monfortino in the classic comparison.',
    wines: [
      { n: 'Barolo Ciabot Mentin', grape: 'Nebbiolo', note: 'from Ginestra, the wine that made the modern style\'s case' },
      { n: 'Barolo Pajana', grape: 'Nebbiolo', note: 'the second Monforte bottling in the same idiom' },
      { n: 'Arte', grape: 'Nebbiolo and Barbera', note: 'a Langhe blend from the years when such wines sat outside the DOCG' }
    ],
    traps: [
      'Ciabot Mentin comes from Ginestra in Monforte d\'Alba, not from a vineyard of its own name'
    ]
  },
  {
    id: 'p-elio-altare', p: 'Elio Altare',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'La Morra',
    founded: '',
    holdings: 'Small holdings in La Morra centred on Arborina, with further parcels elsewhere in the zone.',
    style: 'Short rotary-fermenter macerations and French barriques: dark, polished, early-accessible Nebbiolo.',
    t: 'La Morra remade: sweet dark cherry, cocoa, tannin sanded smooth',
    why: 'One of the named Barolo Boys; in 1983 he destroyed the family\'s old casks and was disinherited, which is the story used to open the modernist question.',
    wines: [
      { n: 'Barolo Arborina', grape: 'Nebbiolo', note: 'the wine that made the modernist case in La Morra' },
      { n: 'Langhe Arborina', grape: 'Nebbiolo', note: 'barrique-aged Nebbiolo bottled outside the Barolo DOCG by choice' },
      { n: 'Larigi', grape: 'Barbera', note: 'Barbera given the same barrique treatment' }
    ],
    traps: [
      'His Langhe Nebbiolo bottlings are declassified by choice, not by quality',
      'The modernist camp is a 1980s development, not the historic Barolo style'
    ]
  },
  {
    id: 'p-elio-grasso', p: 'Elio Grasso',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Monforte d\'Alba',
    founded: '1978',
    holdings: 'Gavarini and Ginestra in Monforte d\'Alba.',
    style: 'Two styles from one cellar: large casks for the classic wines, barrique for the Runcot Riserva.',
    t: 'Monforte in two dialects: botte and barrique from the same hillside',
    why: 'The estate that lets a candidate compare traditional and modern ageing with vineyard and vintage held constant.',
    wines: [
      { n: 'Barolo Gavarini Vigna Chiniera', grape: 'Nebbiolo', note: 'large-cask Monforte, the traditional half of the range' },
      { n: 'Barolo Ginestra Vigna Casa Maté', grape: 'Nebbiolo', note: 'the firmer Ginestra parcel in the same treatment' },
      { n: 'Barolo Runcot Riserva', grape: 'Nebbiolo', note: 'barrique-aged and made only in selected years' }
    ],
    traps: []
  },
  {
    id: 'p-zerbina', p: 'Fattoria Zerbina',
    country: 'Italy, Piedmont and the North', r: 'Emilia-Romagna', sub: 'Romagna',
    founded: '',
    holdings: 'Vineyards in the hills near Faenza, planted to Albana and Sangiovese.',
    style: 'Botrytis-affected Albana for the sweet wine, with structured Romagna Sangiovese alongside.',
    t: 'Apricot, saffron and honey on tight acid: Albana taken to its limit',
    why: 'Albana di Romagna was Italy\'s first white DOCG in 1987, a promotion widely thought unearned, and Zerbina\'s sweet Albana is the defence of it.',
    wines: [
      { n: 'Scacco Matto', grape: 'Albana', note: 'a botrytised passito, the wine that justifies Albana\'s DOCG' },
      { n: 'Romagna Sangiovese Pietramora', grape: 'Sangiovese', note: 'the serious dry red of the estate' },
      { n: 'Marzieno', grape: 'Sangiovese blend', note: 'the Bordeaux-influenced blend of the house' }
    ],
    traps: [
      'Albana was the first white DOCG, not the first DOCG overall',
      'Albana is a white grape: Romagna\'s Sangiovese is a separate wine entirely'
    ]
  },
  {
    id: 'p-ferrari', p: 'Ferrari',
    country: 'Italy, Piedmont and the North', r: 'Trentino', sub: 'Trento DOC',
    founded: '1902',
    holdings: 'Vineyards and contracted growers on the slopes above Trento, planted mainly to Chardonnay.',
    style: 'Mountain Chardonnay, traditional method and long lees ageing: taut rather than rich.',
    t: 'Alpine Chardonnay under pressure: green apple, almond, chalky length',
    why: 'Trento DOC is Italy\'s mountain traditional-method appellation and Ferrari is its founding house.',
    wines: [
      { n: 'Giulio Ferrari Riserva del Fondatore', grape: 'Chardonnay', note: 'held on lees for a decade or more before release' },
      { n: 'Ferrari Perlé', grape: 'Chardonnay', note: 'the vintage-dated middle tier' },
      { n: 'Ferrari Brut', grape: 'Chardonnay', note: 'the non-vintage wine that carries Trento DOC abroad' }
    ],
    traps: [
      'Trento DOC is in Trentino; Franciacorta is in Lombardy',
      'Trentodoc covers sparkling wine only'
    ]
  },
  {
    id: 'p-fontanafredda', p: 'Fontanafredda',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Serralunga d\'Alba',
    founded: '1878',
    holdings: 'A large estate around the hamlet of Fontanafredda in Serralunga d\'Alba, including the Vigna La Rosa parcel.',
    style: 'Large-scale but classically framed Serralunga Barolo, with a wide Piedmontese range beneath it.',
    t: 'Serralunga in a royal frame: dried rose, tobacco, tar over firm tannin',
    why: 'Vittorio Emanuele II bought the estate in 1858 and gave it to Rosa Vercellana; their son Emanuele Alberto founded the winery there in 1878, making it one of Barolo\'s earliest commercial houses.',
    wines: [
      { n: 'Barolo Vigna La Rosa', grape: 'Nebbiolo', note: 'the estate\'s single-vineyard Serralunga bottling' },
      { n: 'Barolo Serralunga d\'Alba', grape: 'Nebbiolo', note: 'the commune wine that carries the house' },
      { n: 'Alta Langa', grape: 'Pinot Nero and Chardonnay', note: 'Piedmont\'s traditional-method sparkling appellation' }
    ],
    traps: [
      'Fontanafredda is a place in Serralunga d\'Alba as well as a brand',
      'Alta Langa is Piedmont\'s own traditional-method DOCG, not a Barolo'
    ]
  },
  {
    id: 'p-foradori', p: 'Foradori',
    country: 'Italy, Piedmont and the North', r: 'Trentino', sub: 'Campo Rotaliano',
    founded: '',
    holdings: 'Vineyards on the gravel plain of the Campo Rotaliano and on slopes at Fontanasanta, farmed biodynamically.',
    style: 'Amphora and cement, whole bunches, and a deliberate retreat from barrique: clear, savoury, unpolished.',
    t: 'Teroldego rethought: dark berry, iron, herbs, tannin left uncombed',
    why: 'Elisabetta Foradori is the reference for Teroldego and for Italian amphora winemaking outside Friuli.',
    wines: [
      { n: 'Granato', grape: 'Teroldego', note: 'the old-vine wine that showed Teroldego could be serious' },
      { n: 'Sgarzon', grape: 'Teroldego', note: 'amphora-aged and lighter-framed' },
      { n: 'Fontanasanta Manzoni Bianco', grape: 'Manzoni Bianco', note: 'a skin-contact white from a crossing of Riesling and Pinot Bianco' }
    ],
    traps: [
      'Teroldego is a parent of Lagrein, both native to Trentino-Alto Adige',
      'Teroldego Rotaliano takes its name from the Campo Rotaliano gravel plain, not from a village'
    ]
  },
  {
    id: 'p-gd-vajra', p: 'G.D. Vajra',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Vergne, Barolo',
    founded: '1972',
    holdings: 'High, cool sites at Vergne above the village of Barolo, including Bricco delle Viole, plus Ravera in Novello and the Luigi Baudana vineyards in Serralunga d\'Alba.',
    style: 'Large oak, long ageing, and wines of perfume and lift rather than weight.',
    t: 'Altitude in the glass: violets, red cherry, cool tannin from Vergne\'s high rows',
    why: 'The reference for high-altitude Barolo, and one of the few Piedmontese estates a candidate can link to Riesling and Freisa.',
    wines: [
      { n: 'Barolo Bricco delle Viole', grape: 'Nebbiolo', note: 'among the highest vineyards in the commune of Barolo' },
      { n: 'Barolo Albe', grape: 'Nebbiolo', note: 'a blend of three high sites, the entry into the house style' },
      { n: 'Langhe Bianco', grape: 'Riesling', note: 'Riesling planted in the Langhe when nobody else would' },
      { n: 'Langhe Freisa Kye', grape: 'Freisa', note: 'a serious treatment of Piedmont\'s awkward native red' }
    ],
    traps: [
      'Bricco delle Viole lies in the commune of Barolo, not a separate village',
      'Vajra also runs Luigi Baudana in Serralunga as a second estate'
    ]
  },
  {
    id: 'p-gaja', p: 'Gaja',
    country: 'Italy, Piedmont and the North', r: 'Barbaresco', sub: 'Barbaresco',
    founded: '1859',
    holdings: 'Vineyards in Barbaresco including Sorì San Lorenzo, Sori Tildìn and Costa Russi, plus Sperss in Serralunga d\'Alba and Conteisa in La Morra; further estates in Montalcino and Bolgheri.',
    style: 'French oak, rigorous selection and low yields: dark-fruited, polished Nebbiolo with international reach.',
    t: 'Polished modern Nebbiolo: dark fruit, spice, French-oak sheen',
    why: 'Angelo Gaja took Barbaresco from a lesser Barolo to a wine priced above it, and his single-vineyard and declassification decisions are standard exam material.',
    wines: [
      { n: 'Barbaresco', grape: 'Nebbiolo', note: 'the multi-parcel Barbaresco, still the house\'s calling card' },
      { n: 'Sorì Tildìn', grape: 'Nebbiolo', note: 'the most structured of the three single vineyards' },
      { n: 'Sorì San Lorenzo', grape: 'Nebbiolo', note: 'the first of the single-vineyard bottlings' },
      { n: 'Darmagi', grape: 'Cabernet Sauvignon', note: 'planted in the Langhe to his father\'s dismay, which is what darmagi means' }
    ],
    traps: [
      'From the 1996 vintage the three single vineyards were labelled Langhe Nebbiolo DOC, returning to Barbaresco DOCG with the 2013 vintage',
      'Sori means a south-facing slope in Piedmontese, so Sorì Tildìn and Sorì San Lorenzo are different sites'
    ]
  },
  {
    id: 'p-giacomo-conterno', p: 'Giacomo Conterno',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Monforte d\'Alba',
    founded: '1908',
    holdings: 'Cellar in Monforte d\'Alba; the Cascina Francia vineyard in Serralunga d\'Alba, acquired in the 1970s, with Cerretta and Arione in the same commune.',
    style: 'Long submerged-cap fermentation and years in large Slavonian botti; no new barriques and nothing hurried.',
    t: 'Tar, rose, dried cherry, iron: traditional Barolo\'s summit',
    why: 'The reference point for traditional Barolo and the source of Monfortino, the bottling against which long-macerated Nebbiolo is measured.',
    wines: [
      { n: 'Barolo Riserva Monfortino', grape: 'Nebbiolo', note: 'declared only in chosen years and held around seven years in cask before release' },
      { n: 'Barolo Cascina Francia', grape: 'Nebbiolo', note: 'the estate Barolo from the Serralunga vineyard that also feeds Monfortino' },
      { n: 'Barbera d\'Alba Cascina Francia', grape: 'Barbera', note: 'Barbera from Barolo land, aged in the same large casks' }
    ],
    traps: [
      'Monfortino is named for Monforte d\'Alba but its fruit comes from Cascina Francia in Serralunga d\'Alba',
      'Giacomo Conterno and Aldo Conterno are separate estates: the brothers divided the family firm in 1969'
    ]
  },
  {
    id: 'p-giuseppe-mascarello', p: 'Giuseppe Mascarello e Figlio',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Castiglione Falletto',
    founded: '1881',
    holdings: 'The cellar sits at Monchiero; the family farms nearly all of Monprivato in Castiglione Falletto, with Santo Stefano di Perno in Monforte and Villero.',
    style: 'Long macerations, large Slavonian botti, and wines released with bottle age, built on perfume rather than weight.',
    t: 'Monprivato in a whisper: rose petal, orange peel, fine chalky tannin',
    why: 'Monprivato is the Castiglione Falletto cru most closely tied to one family, and the estate is routinely confused with Bartolo Mascarello.',
    wines: [
      { n: 'Barolo Monprivato', grape: 'Nebbiolo', note: 'the cru the family has effectively made its own' },
      { n: 'Barolo Ca\' d\'Morissio Riserva', grape: 'Nebbiolo', note: 'a Michet selection within Monprivato, made only in top years' },
      { n: 'Barolo Santo Stefano di Perno', grape: 'Nebbiolo', note: 'the Monforte counterweight to Monprivato' }
    ],
    traps: [
      'Giuseppe Mascarello and Bartolo Mascarello are different families',
      'The winery address is Monchiero but Monprivato lies in Castiglione Falletto'
    ]
  },
  {
    id: 'p-quintarelli', p: 'Giuseppe Quintarelli',
    country: 'Italy, Piedmont and the North', r: 'Valpolicella', sub: 'Negrar, Valpolicella Classico',
    founded: '',
    holdings: 'Vineyards above Negrar in the Classico zone, with lofts for drying the fruit.',
    style: 'Very long drying, years in Slavonian botti and late release, with hand-written labels.',
    t: 'Slow-aged Amarone: fig, balsamic, spice-box, monumental yet lifted',
    why: 'The traditional pole of Amarone, and the estate that declassifies to Rosso del Bepi rather than release a lesser wine.',
    wines: [
      { n: 'Amarone della Valpolicella Classico', grape: 'Corvina-led blend', note: 'released many years after the vintage and not declared every year' },
      { n: 'Recioto della Valpolicella', grape: 'Corvina-led blend', note: 'the sweet ancestor of the style' },
      { n: 'Alzero', grape: 'Cabernet Franc', note: 'made by appassimento from Cabernet Franc and bottled as IGT' },
      { n: 'Rosso del Bepi', grape: 'Corvina-led blend', note: 'the declassified wine bottled when the Amarone is not declared' }
    ],
    traps: [
      'Alzero is a dried-grape Cabernet Franc and cannot be called Amarone',
      'Rosso del Bepi is declassified Amarone fruit, not a second wine from other vineyards'
    ]
  },
  {
    id: 'p-giuseppe-rinaldi', p: 'Giuseppe Rinaldi',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Barolo',
    founded: '19th century',
    holdings: 'Vineyards in Brunate and in Le Coste, Ravera and Cannubi San Lorenzo.',
    style: 'Cement and old botti, wines that are pale, savoury and slow to open.',
    t: 'Bruised rose, blood orange, dusty earth: Barolo with the volume down',
    why: 'Beppe Rinaldi was the traditionalists\' conscience, and the Brunate and Tre Tine labels show what the codifying of Barolo\'s vineyard names forced on multi-cru blends.',
    wines: [
      { n: 'Barolo Brunate', grape: 'Nebbiolo', note: 'the single-cru wine left standing after the two-name blends were split' },
      { n: 'Barolo Tre Tine', grape: 'Nebbiolo', note: 'the blend of Le Coste, Ravera and Cannubi San Lorenzo that replaced the old labels' },
      { n: 'Barbera d\'Alba', grape: 'Barbera', note: 'unoaked and acid-driven, the house\'s daily wine' }
    ],
    traps: [
      'Tre Tine is a blend of three sites, not a single cru',
      'The older Brunate-Le Coste and Cannubi San Lorenzo-Ravera labels disappeared when a wine could no longer carry two vineyard names'
    ]
  },
  {
    id: 'p-inama', p: 'Inama',
    country: 'Italy, Piedmont and the North', r: 'Soave', sub: 'Soave Classico',
    founded: '',
    holdings: 'Vineyards on the volcanic Monte Foscarino in Soave Classico, with further land in the Colli Berici.',
    style: 'Riper and more textural Soave, with oak on the top wines and long lees work.',
    t: 'Volcanic Soave: yellow plum, camomile, almond skin, a smoky edge',
    why: 'The modern face of Soave Classico, and the estate used to show that Garganega can take oak and age.',
    wines: [
      { n: 'Soave Classico Vigneti di Foscarino', grape: 'Garganega', note: 'the volcanic hill in its own bottling, a step below du Lot in oak' },
      { n: 'Soave Classico Vigneto du Lot', grape: 'Garganega', note: 'barrel-fermented, the estate\'s most ambitious white' },
      { n: 'Carmenère Più', grape: 'Carmenere', note: 'a reminder that Carmenere survived in the Veneto as well as Chile' }
    ],
    traps: [
      'Soave Classico is the original hill zone; the expanded flat DOC is the source of the wine\'s cheap reputation'
    ]
  },
  {
    id: 'p-jermann', p: 'Jermann',
    country: 'Italy, Piedmont and the North', r: 'Venezia Giulia', sub: 'Villanova di Farra',
    founded: '',
    holdings: 'Vineyards in the Collio and Isonzo around Villanova di Farra.',
    style: 'Blended whites of texture and ripeness, labelled outside the DOC by choice.',
    t: 'Ripe pear, acacia, salted almond: Friuli\'s white blend at full volume',
    why: 'Vintage Tunina showed that a Friulian blend could stand with Italy\'s best whites, and it is bottled as IGT rather than DOC.',
    wines: [
      { n: 'Vintage Tunina', grape: 'white blend', note: 'Chardonnay, Sauvignon, Ribolla Gialla, Malvasia and Picolit, first made in 1975' },
      { n: 'Where the Dreams Have No End', grape: 'Chardonnay', note: 'the oaked Chardonnay under a deliberately untranslatable name' },
      { n: 'Capo Martino', grape: 'white blend', note: 'a Friulano-led blend aged in wood' }
    ],
    traps: [
      'Vintage Tunina is a blend, not a varietal wine',
      'Vintage is part of the name, not a vintage designation'
    ]
  },
  {
    id: 'p-gravner', p: 'Josko Gravner',
    country: 'Italy, Piedmont and the North', r: 'Collio', sub: 'Oslavia',
    founded: '',
    holdings: 'Vineyards at Oslavia on the Slovenian border, planted mainly to Ribolla Gialla and Pignolo.',
    style: 'Long skin maceration in buried Georgian amphorae, minimal sulfur, and years in large oak before release.',
    t: 'Amber and dried apricot, tea leaf and nut skin: Ribolla left on its skins',
    why: 'Gravner turned to amphora and extended skin contact from 2001 and is the origin point of the modern orange wine movement.',
    wines: [
      { n: 'Ribolla', grape: 'Ribolla Gialla', note: 'months on the skins in qvevri, the reference for Italian orange wine' },
      { n: 'Bianco Breg', grape: 'white blend', note: 'the international varieties given the same treatment' },
      { n: 'Rosso Gravner', grape: 'Pignolo', note: 'the native Friulian red, aged for many years' }
    ],
    traps: [
      'He labels his wines Venezia Giulia IGT rather than Collio DOC',
      'Ribolla Gialla is a white grape: the amber colour comes from skin contact'
    ]
  },
  {
    id: 'p-la-scolca', p: 'La Scolca',
    country: 'Italy, Piedmont and the North', r: 'Gavi', sub: 'Rovereto di Gavi',
    founded: '1919',
    holdings: 'Vineyards in the Rovereto hamlet of Gavi, planted to Cortese.',
    style: 'Precise and dry, built to age far longer than Gavi\'s reputation suggests.',
    t: 'Cortese with steel in it: green apple, almond skin, saline finish',
    why: 'Gavi is the place and Cortese the grape, and La Scolca is the producer that made the name travel.',
    wines: [
      { n: 'Gavi dei Gavi Black Label', grape: 'Cortese', note: 'the bottling that carried Gavi into export markets' },
      { n: 'Gavi White Label', grape: 'Cortese', note: 'the fresher, earlier-drinking version' }
    ],
    traps: [
      'Gavi is the appellation and Cortese the grape; the wine may also appear as Cortese di Gavi',
      'Gavi lies in Piedmont despite sitting close to the Ligurian coast'
    ]
  },
  {
    id: 'p-la-spinetta', p: 'La Spinetta',
    country: 'Italy, Piedmont and the North', r: 'Barbaresco', sub: 'Neive',
    founded: '1977',
    holdings: 'Barbaresco crus at Gallina and Starderi in Neive and Valeirano in Treiso, plus Campe in Grinzane Cavour for Barolo, and vineyards in Tuscany.',
    style: 'Modernist: barriques, ripe fruit and dark colour, under the Durer rhinoceros label.',
    t: 'The rhinoceros label: dark cherry, vanilla, weight beyond Barbaresco\'s usual frame',
    why: 'A modernist Barbaresco house that began in Moscato, useful for showing one estate working both ends of Piedmont\'s range.',
    wines: [
      { n: 'Barbaresco Gallina', grape: 'Nebbiolo', note: 'the softer, more aromatic of the Neive pair' },
      { n: 'Barbaresco Starderi', grape: 'Nebbiolo', note: 'the firmer Neive cru in full modernist dress' },
      { n: 'Moscato d\'Asti Bricco Quaglia', grape: 'Moscato Bianco', note: 'the sweet frizzante wine the estate began with' }
    ],
    traps: [
      'Starderi and Gallina are in Neive, Valeirano in Treiso: all three are Barbaresco',
      'Campe is a Barolo from Grinzane Cavour, one of the lesser-known communes'
    ]
  },
  {
    id: 'p-livio-felluga', p: 'Livio Felluga',
    country: 'Italy, Piedmont and the North', r: 'Friuli Colli Orientali', sub: 'Rosazzo',
    founded: '1956',
    holdings: 'Vineyards in the Rosazzo hills of the Colli Orientali, on the marl and sandstone called ponca.',
    style: 'Blended whites of weight and length rather than varietal sharpness.',
    t: 'Ponca marl in a glass: pear, hay, almond, a long saline drift',
    why: 'Terre Alte is the reference Friulian white blend, and the estate\'s antique-map label is recognised on sight.',
    wines: [
      { n: 'Terre Alte', grape: 'Friulano, Pinot Bianco and Sauvignon', note: 'the wine that defined the Friulian white blend' },
      { n: 'Friulano', grape: 'Friulano', note: 'the regional grape in its straightforward form' },
      { n: 'Picolit', grape: 'Picolit', note: 'the rare sweet white of the Colli Orientali' }
    ],
    traps: [
      'Ponca is the local marl and sandstone soil of the Friulian hills',
      'Rosazzo is a DOCG for a Friulano-led white blend inside the Colli Orientali'
    ]
  },
  {
    id: 'p-luciano-sandrone', p: 'Luciano Sandrone',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Barolo',
    founded: '1978',
    holdings: 'Vineyards in the commune of Barolo including the Cannubi Boschis parcel, with further plots in Serralunga d\'Alba and Novello.',
    style: 'A middle way: rotary fermentation and mid-sized oak casks, giving polish without obscuring the site.',
    t: 'Cannubi polish: raspberry, sweet spice, tannin in fine grain',
    why: 'Sandrone bridges the traditional and modern camps, and the Cannubi Boschis to Aleste renaming is a label question candidates meet on lists.',
    wines: [
      { n: 'Barolo Aleste', grape: 'Nebbiolo', note: 'the Cannubi Boschis wine, renamed Aleste from the 2013 vintage' },
      { n: 'Barolo Le Vigne', grape: 'Nebbiolo', note: 'a blend of parcels from several communes' },
      { n: 'Nebbiolo d\'Alba Valmaggiore', grape: 'Nebbiolo', note: 'sandy Roero Nebbiolo, a lighter and quicker frame' }
    ],
    traps: [
      'Aleste and Cannubi Boschis are the same wine under two names',
      'Le Vigne is a multi-commune blend, not a cru'
    ]
  },
  {
    id: 'p-marchesi-di-gresy', p: 'Marchesi di Grésy',
    country: 'Italy, Piedmont and the North', r: 'Barbaresco', sub: 'Barbaresco',
    founded: '1973',
    holdings: 'The Martinenga vineyard in Barbaresco, a monopole, with the Camp Gros and Gaiun parcels inside it.',
    style: 'Elegant and mid-weight, with clear separation between the two named parcels.',
    t: 'A monopole in the middle of Barbaresco: violets, red cherry, quiet strength',
    why: 'Martinenga is the clearest monopole answer in Barbaresco, and Camp Gros and Gaiun are parcels within it rather than separate crus.',
    wines: [
      { n: 'Barbaresco Martinenga', grape: 'Nebbiolo', note: 'the whole monopole in one wine' },
      { n: 'Barbaresco Camp Gros Martinenga Riserva', grape: 'Nebbiolo', note: 'the firmer parcel, given Riserva ageing' },
      { n: 'Barbaresco Gaiun Martinenga', grape: 'Nebbiolo', note: 'the more perfumed parcel of the pair' }
    ],
    traps: [
      'Camp Gros and Gaiun lie inside Martinenga; they are not separate vineyard designations'
    ]
  },
  {
    id: 'p-masi', p: 'Masi',
    country: 'Italy, Piedmont and the North', r: 'Valpolicella', sub: 'Gargagnago, Valpolicella Classico',
    founded: '',
    holdings: 'Vineyards across the Classico zone, including the Serego Alighieri estate held by descendants of Dante.',
    style: 'Research-driven appassimento at scale, with a range running from Campofiorin to single-vineyard Amarone.',
    t: 'Dried cherry, cocoa and sweet spice: appassimento made repeatable',
    why: 'Campofiorin in 1964 created the template that eventually became Valpolicella Ripasso, which is the fact examiners want.',
    wines: [
      { n: 'Campofiorin', grape: 'Corvina-led blend', note: 'first made in 1964, the model for the modern double-fermentation style' },
      { n: 'Amarone Costasera', grape: 'Corvina-led blend', note: 'the house\'s widely seen Amarone' },
      { n: 'Amarone Mazzano', grape: 'Corvina-led blend', note: 'the single-vineyard bottling from a high, cool site' }
    ],
    traps: [
      'Valpolicella Ripasso became its own DOC only in 2010; Campofiorin itself is bottled as IGT',
      'Serego Alighieri is an estate name, not an appellation'
    ]
  },
  {
    id: 'p-massolino', p: 'Massolino',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Serralunga d\'Alba',
    founded: '1896',
    holdings: 'Serralunga d\'Alba, with parcels in Vigna Rionda, Margheria and Parafada, and Parussi in Castiglione Falletto.',
    style: 'Traditional Serralunga: large oak, firm structure, wines built for the long haul.',
    t: 'Serralunga\'s iron spine: tar, dried cherry, tannin that waits a decade',
    why: 'Vigna Rionda is Serralunga\'s most examinable cru, and Massolino is the name attached to it today.',
    wines: [
      { n: 'Barolo Vigna Rionda Riserva', grape: 'Nebbiolo', note: 'released around ten years after the vintage, the modern benchmark for the cru' },
      { n: 'Barolo Margheria', grape: 'Nebbiolo', note: 'the more perfumed Serralunga parcel' },
      { n: 'Barolo Serralunga d\'Alba', grape: 'Nebbiolo', note: 'the commune blend, a clean lesson in Serralunga character' }
    ],
    traps: [
      'Barolo Riserva requires 62 months of ageing; Vigna Rionda is held far longer',
      'Bruno Giacosa\'s historic Collina Rionda came from the same Serralunga hill but a different grower'
    ]
  },
  {
    id: 'p-miani', p: 'Miani',
    country: 'Italy, Piedmont and the North', r: 'Friuli Colli Orientali', sub: 'Buttrio',
    founded: '',
    holdings: 'A handful of hectares of old vines around Buttrio, worked by Enzo Pontoni almost single-handed.',
    style: 'Punishing yields, old vines and barrique: whites of extraordinary concentration in tiny quantity.',
    t: 'Concentration without weight: white peach, almond, salt and oil',
    why: 'The cult name of the Friulian hills and the counter-argument to the idea that Friulian whites are only about freshness.',
    wines: [
      { n: 'Friulano', grape: 'Friulano', note: 'the estate\'s calling card and the grape\'s high-water mark' },
      { n: 'Ribolla Gialla', grape: 'Ribolla Gialla', note: 'made without skin contact, against the Oslavia fashion' },
      { n: 'Merlot Buri', grape: 'Merlot', note: 'a reminder that Friuli\'s reds can be serious' }
    ],
    traps: [
      'Colli Orientali del Friuli is now labelled Friuli Colli Orientali',
      'Friulano is the former Tocai Friulano and is unrelated to Hungary\'s Tokaji'
    ]
  },
  {
    id: 'p-nino-negri', p: 'Nino Negri',
    country: 'Italy, Piedmont and the North', r: 'Valtellina', sub: 'Chiuro',
    founded: '1897',
    holdings: 'Vineyards across the Valtellina terraces, with a cellar in the castle at Chiuro.',
    style: 'Modern and clean, with barrique reserved for the top dried-grape wine.',
    t: 'Dried mountain Nebbiolo: fig, cherry liqueur, alpine bitterness underneath',
    why: 'Sforzato di Valtellina is the north\'s other appassimento red, and 5 Stelle is the bottling it is taught with.',
    wines: [
      { n: 'Sfursat di Valtellina 5 Stelle', grape: 'Nebbiolo', note: 'the benchmark for Valtellina\'s dried-grape red' },
      { n: 'Valtellina Superiore Inferno', grape: 'Nebbiolo', note: 'the hottest and most concentrated subzone' },
      { n: 'Valtellina Superiore Grumello', grape: 'Nebbiolo', note: 'the lighter everyday bottling' }
    ],
    traps: [
      'Sforzato, or Sfursat, is dried-grape Nebbiolo from Lombardy, not Amarone',
      'Sforzato di Valtellina is its own DOCG, separate from Valtellina Superiore'
    ]
  },
  {
    id: 'p-paolo-saracco', p: 'Paolo Saracco',
    country: 'Italy, Piedmont and the North', r: 'Moscato d\'Asti', sub: 'Castiglione Tinella',
    founded: '',
    holdings: 'Vineyards around Castiglione Tinella, at the heart of the Moscato zone.',
    style: 'Cold, clean and low in alcohol, with the grape aroma left untouched.',
    t: 'Sage, peach and orange blossom on a whisper of fizz',
    why: 'Moscato d\'Asti is the Court\'s standing example of a partially fermented low-alcohol frizzante wine, and Saracco is the name used for it.',
    wines: [
      { n: 'Moscato d\'Asti', grape: 'Moscato Bianco', note: 'the reference for the style: frizzante, lightly sweet, around five percent alcohol' }
    ],
    traps: [
      'Moscato d\'Asti is frizzante and lightly sweet; Asti Spumante is fully sparkling and drier in style',
      'The grape is Moscato Bianco, the same as Muscat Blanc a Petits Grains'
    ]
  },
  {
    id: 'p-pieropan', p: 'Pieropan',
    country: 'Italy, Piedmont and the North', r: 'Soave', sub: 'Soave Classico',
    founded: '1880',
    holdings: 'Vineyards in the Classico hills above Soave, including the Calvarino and La Rocca sites.',
    style: 'No oak for Calvarino, oak for La Rocca, and long lees contact: Garganega with texture and age.',
    t: 'Almond blossom, lemon pith and stone: Soave taken seriously',
    why: 'Pieropan bottled Soave\'s first single vineyard, and Calvarino against La Rocca sets volcanic basalt against limestone within one estate.',
    wines: [
      { n: 'Soave Classico Calvarino', grape: 'Garganega with Trebbiano di Soave', note: 'the first single-vineyard Soave, from volcanic basalt' },
      { n: 'Soave Classico La Rocca', grape: 'Garganega', note: 'from limestone and fermented in oak, the richer of the pair' },
      { n: 'Recioto di Soave Le Colombare', grape: 'Garganega', note: 'the sweet dried-grape Soave' }
    ],
    traps: [
      'Soave is the place and Garganega the grape',
      'Trebbiano di Soave is Verdicchio, not Trebbiano Toscano'
    ]
  },
  {
    id: 'p-pio-cesare', p: 'Pio Cesare',
    country: 'Italy, Piedmont and the North', r: 'Langhe', sub: 'Alba',
    founded: '1881',
    holdings: 'Cellars inside Alba\'s old town, with the Ornato vineyard in Serralunga d\'Alba and Il Bricco in Treiso.',
    style: 'A merchant house turned estate: a classic blended Barolo alongside single-vineyard bottlings.',
    t: 'Alba\'s old town in a bottle: dried rose, leather, measured tannin',
    why: 'One of the original Alba houses and the clean example of the blended-commune Barolo that predates the cru era.',
    wines: [
      { n: 'Barolo', grape: 'Nebbiolo', note: 'a blend across communes in the old Alba house style' },
      { n: 'Barolo Ornato', grape: 'Nebbiolo', note: 'the Serralunga single vineyard' },
      { n: 'Barbaresco Il Bricco', grape: 'Nebbiolo', note: 'the Treiso counterpart in Barbaresco' }
    ],
    traps: [
      'The classic Pio Cesare Barolo is a multi-commune blend; Ornato is the single vineyard'
    ]
  },
  {
    id: 'p-aldo-conterno', p: 'Poderi Aldo Conterno',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Monforte d\'Alba',
    founded: '1969',
    holdings: 'An estate in the Bussia amphitheatre of Monforte d\'Alba, with the Romirasco, Cicala and Colonnello parcels.',
    style: 'A middle path: long but controlled macerations, large oak for the classic wines, restraint rather than extraction.',
    t: 'Bussia\'s amphitheatre in three voices: rose, dried herb, patient tannin',
    why: 'Aldo left his brother\'s firm in 1969 and built the other half of the Conterno story; Granbussia is the cru-blend Riserva examiners set against Monfortino.',
    wines: [
      { n: 'Barolo Riserva Granbussia', grape: 'Nebbiolo', note: 'a blend of Romirasco, Cicala and Colonnello declared only in the best years' },
      { n: 'Barolo Cicala', grape: 'Nebbiolo', note: 'the softer, more perfumed of the named Bussia parcels' },
      { n: 'Barolo Colonnello', grape: 'Nebbiolo', note: 'the firmer parcel, usually the longer wait' }
    ],
    traps: [
      'Granbussia is a blend of three Bussia parcels, not a single vineyard',
      'Bussia lies in Monforte d\'Alba'
    ]
  },
  {
    id: 'p-produttori-del-barbaresco', p: 'Produttori del Barbaresco',
    country: 'Italy, Piedmont and the North', r: 'Barbaresco', sub: 'Barbaresco',
    founded: '1958',
    holdings: 'A growers\' co-operative whose members farm a large share of the commune of Barbaresco, including Asili, Rabajà, Montestefano and Ovello.',
    style: 'Traditional: large Slavonian oak, no new barriques, and wines of consistent house character.',
    t: 'A parish co-operative that out-ages estates: rose, tar, honest tannin',
    why: 'The co-operative bottles nine named cru Riservas in good years and none in poor ones, the cleanest illustration of declassification a candidate can name.',
    wines: [
      { n: 'Barbaresco Riserva, single vineyards', grape: 'Nebbiolo', note: 'nine named cru Riservas bottled only in strong vintages' },
      { n: 'Barbaresco', grape: 'Nebbiolo', note: 'in weaker years every parcel goes into this one wine' },
      { n: 'Langhe Nebbiolo', grape: 'Nebbiolo', note: 'the declassified early-drinking bottling' }
    ],
    traps: [
      'The nine Riservas are Asili, Rabajà, Montestefano, Ovello, Pora, Paje, Muncagota, Montefico and Río Sordo',
      'In lesser vintages no cru Riservas are made at all'
    ]
  },
  {
    id: 'p-proprieta-sperino', p: 'Proprietà Sperino',
    country: 'Italy, Piedmont and the North', r: 'Lessona', sub: 'Lessona',
    founded: '1999',
    holdings: 'Replanted vineyards on the marine sands of Lessona, with Nebbiolo, Vespolina and Croatina.',
    style: 'Pale, high-acid alpine Nebbiolo aged in large oak and released with bottle age.',
    t: 'Sea sand under alpine air: cranberry, rosehip, a fine acid thread',
    why: 'Lessona is the sand-soil outlier of Alto Piemonte, and this estate is the reason the name reaches lists at all.',
    wines: [
      { n: 'Lessona', grape: 'Nebbiolo with Vespolina', note: 'the appellation\'s revival wine' },
      { n: 'Uvaggio', grape: 'Nebbiolo blend', note: 'the Coste della Sesia blend below it' }
    ],
    traps: [
      'Lessona sits on ancient marine sands, unlike volcanic Gattinara and Boca',
      'Vespolina is a distinct local grape, not a synonym for Nebbiolo'
    ]
  },
  {
    id: 'p-radikon', p: 'Radikon',
    country: 'Italy, Piedmont and the North', r: 'Collio', sub: 'Oslavia',
    founded: '',
    holdings: 'Vineyards at Oslavia, neighbouring Gravner, on marl and sandstone.',
    style: 'Extended skin contact, no added sulfur, long ageing in large oak, bottled in 500 and 1000 millilitre formats.',
    t: 'Cider apple, orange peel, walnut: white wine that behaves like a red',
    why: 'The other Oslavia name in every orange wine question, and the source of the Jakot label used to test the Tocai naming dispute.',
    wines: [
      { n: 'Oslavje', grape: 'white blend', note: 'the estate\'s skin-contact blend of international varieties' },
      { n: 'Ribolla Gialla', grape: 'Ribolla Gialla', note: 'the native grape at its most tannic' },
      { n: 'Jakot', grape: 'Friulano', note: 'Tocai spelled backwards, a protest at the loss of the name' }
    ],
    traps: [
      'Jakot is Tocai written backwards; the name Tocai was withdrawn to protect Hungary\'s Tokaj',
      'The grape is now called Friulano in Italy'
    ]
  },
  {
    id: 'p-renato-ratti', p: 'Renato Ratti',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'La Morra',
    founded: '1965',
    holdings: 'Cellars at the Abbazia dell\'Annunziata in La Morra, with vineyards in Marcenasco, Rocche dell\'Annunziata and Conca.',
    style: 'Shorter macerations and cleaner, earlier-drinking Barolo than the old school, without barrique excess.',
    t: 'La Morra\'s softer hand: red cherry, rose, tannin you can meet young',
    why: 'Renato Ratti surveyed and drew the first detailed map of Barolo\'s vineyards in the 1970s, the ancestor of today\'s MGA system.',
    wines: [
      { n: 'Barolo Marcenasco', grape: 'Nebbiolo', note: 'the La Morra wine that carried the new approach' },
      { n: 'Barolo Rocche dell\'Annunziata', grape: 'Nebbiolo', note: 'La Morra\'s most celebrated site' },
      { n: 'Barolo Conca', grape: 'Nebbiolo', note: 'a small amphitheatre parcel in the same commune' }
    ],
    traps: [
      'The cru maps behind Barolo\'s MGAs began with Ratti\'s private survey, not with the later law'
    ]
  },
  {
    id: 'p-roagna', p: 'Roagna',
    country: 'Italy, Piedmont and the North', r: 'Barbaresco', sub: 'Barbaresco',
    founded: '',
    holdings: 'Old vines at Paje and Asili in Barbaresco and at Pira in Castiglione Falletto, with Montefico added later.',
    style: 'Macerations of many weeks on the skins, old large casks, and wines held for years before release.',
    t: 'Weeks on the skins: dried rose, forest floor, tannin gone to silk',
    why: 'A traditionalist maceration regime of unusual length, and an estate holding top crus in both Barbaresco and Barolo.',
    wines: [
      { n: 'Barbaresco Pajé', grape: 'Nebbiolo', note: 'the home cru and the estate\'s clearest statement' },
      { n: 'Barbaresco Crichët Pajé', grape: 'Nebbiolo', note: 'an old-vine selection made only in exceptional years' },
      { n: 'Barolo Pira', grape: 'Nebbiolo', note: 'the Castiglione Falletto holding treated identically' }
    ],
    traps: [
      'Crichet Paje is a selection from Paje, not a separate vineyard',
      'Very long maceration here yields softer tannin, not harder'
    ]
  },
  {
    id: 'p-roberto-voerzio', p: 'Roberto Voerzio',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'La Morra',
    founded: '',
    holdings: 'Parcels in Brunate, Cerequio, La Serra and Rocche dell\'Annunziata Torriglione, with Sarmassa in the commune of Barolo.',
    style: 'Severe green harvesting to tiny yields, high vine density, barrique ageing: concentration as a method.',
    t: 'Yields cut to the bone: black cherry, violet, density that fills the glass',
    why: 'The clearest example of yield reduction as a house philosophy and a fixed point on the modernist side of the Barolo argument.',
    wines: [
      { n: 'Barolo Brunate', grape: 'Nebbiolo', note: 'the cru shared with several great estates, here at maximum density' },
      { n: 'Barolo Cerequio', grape: 'Nebbiolo', note: 'the La Morra site straddling the Barolo boundary' },
      { n: 'Barolo La Serra', grape: 'Nebbiolo', note: 'the highest and most aromatic of the three' }
    ],
    traps: [
      'Roberto Voerzio and Gianni Voerzio are separate estates run by brothers',
      'Cerequio lies partly in La Morra and partly in Barolo'
    ]
  },
  {
    id: 'p-dal-forno', p: 'Romano Dal Forno',
    country: 'Italy, Piedmont and the North', r: 'Valpolicella', sub: 'Illasi',
    founded: '',
    holdings: 'Vineyards at Illasi, east of the Classico zone, centred on Monte Lodoletta and planted at very high density.',
    style: 'Modern: long drying, new French barriques, extreme concentration, very late release.',
    t: 'Inky, opulent, modern: Amarone at maximum density',
    why: 'The modern pole of Amarone, set against Quintarelli in every comparison, and a reminder that the best Amarone need not be Classico.',
    wines: [
      { n: 'Amarone della Valpolicella Monte Lodoletta', grape: 'Corvina-led blend', note: 'the modern benchmark for density in the appellation' },
      { n: 'Valpolicella Superiore Monte Lodoletta', grape: 'Corvina-led blend', note: 'as concentrated as many estates\' Amarone' },
      { n: 'Vigna Sere', grape: 'Corvina-led blend', note: 'a sweet wine released long after the vintage' }
    ],
    traps: [
      'Dal Forno is in the Illasi valley, so his wines are not Valpolicella Classico',
      'His Valpolicella Superiore also uses dried fruit: it is not a ripasso'
    ]
  },
  {
    id: 'p-schiopetto', p: 'Schiopetto',
    country: 'Italy, Piedmont and the North', r: 'Collio', sub: 'Capriva del Friuli',
    founded: '1965',
    holdings: 'Vineyards at Capriva del Friuli in the Collio, on ponca slopes.',
    style: 'Cool, reductive and stainless: clarity and varietal definition without skin contact or oak.',
    t: 'Pear skin, white flowers, a cold clean line: the modern Italian white begins here',
    why: 'Mario Schiopetto brought temperature control and reductive handling to Italy in the 1960s, which is where modern Italian white winemaking starts.',
    wines: [
      { n: 'Collio Friulano', grape: 'Friulano', note: 'the benchmark for the modern unoaked style' },
      { n: 'Collio Pinot Bianco', grape: 'Pinot Bianco', note: 'precise and mineral, the house\'s quiet triumph' },
      { n: 'Blanc des Rosis', grape: 'white blend', note: 'the estate\'s field-style blend' }
    ],
    traps: [
      'Friuli\'s reputation rests on whites made without skin contact; the orange wines of Oslavia are a separate and later movement'
    ]
  },
  {
    id: 'p-travaglini', p: 'Travaglini',
    country: 'Italy, Piedmont and the North', r: 'Gattinara', sub: 'Gattinara',
    founded: '',
    holdings: 'One of the largest holdings within the Gattinara DOCG, on steep terraced slopes.',
    style: 'Firm and savoury, aged in large oak, sold in the estate\'s own angular dark bottle.',
    t: 'The crooked bottle: sour cherry, walnut skin, alpine iron',
    why: 'The most widely exported Gattinara, recognised on sight by its bottle shape, and often the only Alto Piemonte name on a list.',
    wines: [
      { n: 'Gattinara', grape: 'Nebbiolo', note: 'the wine most candidates meet first from Alto Piemonte' },
      { n: 'Gattinara Riserva', grape: 'Nebbiolo', note: 'longer cask ageing on the same fruit' },
      { n: 'Il Sogno', grape: 'Nebbiolo', note: 'a dried-grape Nebbiolo from the same estate' }
    ],
    traps: [
      'Gattinara and Ghemme are separate DOCGs on opposite banks of the Sesia',
      'Alto Piemonte appellations permit small additions of Vespolina or Uva Rara, unlike Barolo, which must be Nebbiolo alone'
    ]
  },
  {
    id: 'p-vietti', p: 'Vietti',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Castiglione Falletto',
    founded: '19th century',
    holdings: 'Based in Castiglione Falletto with crus across the zone: Rocche di Castiglione, Villero, Brunate in La Morra, Lazzarito in Serralunga and Ravera in Novello.',
    style: 'Modern precision without excess: clean fruit, measured oak, every cru bottled to show its commune.',
    t: 'A cru for every commune, and an artist\'s label on each bottle',
    why: 'The artist labels began in 1974, and the multi-commune range is the cleanest way for a candidate to compare Barolo\'s villages side by side.',
    wines: [
      { n: 'Barolo Rocche di Castiglione', grape: 'Nebbiolo', note: 'the estate\'s home cru, perfumed and fine-boned' },
      { n: 'Barolo Villero Riserva', grape: 'Nebbiolo', note: 'the long-ageing Riserva from the same commune' },
      { n: 'Barbera d\'Asti La Crena', grape: 'Barbera', note: 'old-vine Barbera from the Asti hills' },
      { n: 'Roero Arneis', grape: 'Arneis', note: 'from the house that helped bring Arneis back as a varietal white' }
    ],
    traps: [
      'Vietti\'s Barolos come from several communes, so the label\'s commune is not the winery\'s',
      'Roero Arneis is a white: Roero also makes Nebbiolo, and the two share a name'
    ]
  },
  {
    id: 'w-quintarelli-amarone', p: 'Amarone della Valpolicella Classico, Giuseppe Quintarelli',
    by: 'p-quintarelli',
    country: 'Italy, Piedmont and the North', r: 'Valpolicella', sub: 'Negrar',
    founded: '',
    holdings: 'Fruit from the estate\'s own hillside vineyards above Negrar in the Classico zone.',
    style: 'Drying well into the spring, years in Slavonian botti, and release a decade or more after harvest.',
    t: 'Fig, balsamic, dried rose and sweet spice: weight carried without effort',
    why: 'The traditional benchmark for Amarone, and the estate that declassifies to Rosso del Bepi in years it will not declare.',
    wines: [
      { n: 'Amarone della Valpolicella Classico', grape: 'Corvina-led blend', note: 'declared only in years the family judges worthy' }
    ],
    traps: [
      'Not made every vintage',
      'Quintarelli\'s Alzero is dried-grape Cabernet Franc and is not Amarone'
    ]
  },
  {
    id: 'w-monte-lodoletta', p: 'Amarone della Valpolicella Monte Lodoletta',
    by: 'p-dal-forno',
    country: 'Italy, Piedmont and the North', r: 'Valpolicella', sub: 'Illasi',
    founded: '',
    holdings: 'A single high-density vineyard at Illasi, east of the Classico zone.',
    style: 'Long drying, years in new French barriques, extreme extract and alcohol, released late.',
    t: 'Prune, cocoa and black cherry liqueur: Amarone at its most concentrated',
    why: 'The modern benchmark for Amarone, always set against Quintarelli, and evidence that the best Amarone need not be Classico.',
    wines: [
      { n: 'Amarone della Valpolicella Monte Lodoletta', grape: 'Corvina-led blend', note: 'the modern benchmark for concentration in the appellation' }
    ],
    traps: [
      'Illasi is outside the Valpolicella Classico zone',
      'Amarone remains a dry wine at this level of ripeness'
    ]
  },
  {
    id: 'w-barbaresco-santo-stefano', p: 'Barbaresco Santo Stefano Riserva',
    by: 'p-bruno-giacosa',
    country: 'Italy, Piedmont and the North', r: 'Barbaresco', sub: 'Neive',
    founded: '',
    holdings: 'From the Santo Stefano site at Neive, bought in as fruit rather than owned; under the MGA system the land falls within Albesani.',
    style: 'No new oak, long cask ageing, and release as a red-label Riserva only in the finest years.',
    t: 'Rose petal, tar and white truffle: Neive at its most perfumed',
    why: 'The standing proof that purchased fruit can make Italy\'s greatest wine, and the reference for Neive within Barbaresco.',
    wines: [
      { n: 'Barbaresco Santo Stefano Riserva', grape: 'Nebbiolo', note: 'the bottling on which Bruno Giacosa\'s reputation was built' }
    ],
    traps: [
      'Santo Stefano lies in Neive, one of Barbaresco\'s communes',
      'Giacosa did not own the vineyard: the wine came from bought grapes'
    ]
  },
  {
    id: 'w-monprivato', p: 'Barolo Monprivato',
    by: 'p-giuseppe-mascarello',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Castiglione Falletto',
    founded: '',
    holdings: 'Almost the whole of the Monprivato vineyard in Castiglione Falletto, farmed by one family.',
    style: 'Traditional long maceration and large Slavonian botti, perfumed rather than powerful.',
    t: 'Rose, orange peel and dust: Castiglione Falletto at its most graceful',
    why: 'The Barolo cru most closely identified with a single family, and the standard answer for Castiglione Falletto.',
    wines: [
      { n: 'Barolo Monprivato', grape: 'Nebbiolo', note: 'the source of the Ca\' d\'Morissio Riserva selection in top years' }
    ],
    traps: [
      'Monprivato is in Castiglione Falletto although the cellar is at Monchiero',
      'Ca\' d\'Morissio is a selection within Monprivato, not a separate cru'
    ]
  },
  {
    id: 'w-granbussia', p: 'Barolo Riserva Granbussia',
    by: 'p-aldo-conterno',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Monforte d\'Alba',
    founded: '',
    holdings: 'A blend of the Romirasco, Cicala and Colonnello parcels in the Bussia amphitheatre.',
    style: 'Long ageing in large oak and release only in chosen years.',
    t: 'Bussia in the round: dried rose, liquorice, tobacco, patient tannin',
    why: 'The cru-blend Riserva that answers Monfortino, and the reason candidates must know Bussia\'s internal parcels.',
    wines: [
      { n: 'Barolo Riserva Granbussia', grape: 'Nebbiolo', note: 'the estate\'s Riserva, held back for many years before sale' }
    ],
    traps: [
      'Granbussia is a blend of three parcels, not a single vineyard',
      'Bussia lies in Monforte d\'Alba'
    ]
  },
  {
    id: 'w-monfortino', p: 'Barolo Riserva Monfortino',
    by: 'p-giacomo-conterno',
    country: 'Italy, Piedmont and the North', r: 'Barolo', sub: 'Serralunga d\'Alba',
    founded: '',
    holdings: 'Drawn since 1978 from the Cascina Francia vineyard in Serralunga d\'Alba; before that from purchased fruit.',
    style: 'Selected in the cellar only in the years judged worthy, fermented long on the skins and aged around seven years in large Slavonian casks.',
    t: 'Tar, dried rose, orange peel and iron: the longest wait in Barolo',
    why: 'The most examinable Italian red: a Riserva declared only in chosen years, from Serralunga fruit, under a name that points at another commune.',
    wines: [
      { n: 'Barolo Riserva Monfortino', grape: 'Nebbiolo', note: 'released years after other Barolos of the same vintage and built to last decades' }
    ],
    traps: [
      'Monfortino comes from Serralunga d\'Alba, not Monforte d\'Alba',
      'It is not made every year'
    ]
  },
  {
    id: 'w-annamaria-clementi', p: 'Franciacorta Annamaria Clementi Riserva',
    by: 'p-ca-del-bosco',
    country: 'Italy, Piedmont and the North', r: 'Franciacorta', sub: 'Erbusco',
    founded: '',
    holdings: 'Selected parcels around Erbusco in the heart of Franciacorta.',
    style: 'Base wines fermented in oak, very long lees ageing, low dosage.',
    t: 'Hazelnut, pastry and citrus oil on a slow and very fine mousse',
    why: 'Franciacorta\'s prestige cuvee, and the wine used to show the appellation\'s 60-month Riserva minimum in practice.',
    wines: [
      { n: 'Franciacorta Annamaria Clementi Riserva', grape: 'Chardonnay-led blend', note: 'named for the founder\'s mother and released long after the vintage' }
    ],
    traps: [
      'Franciacorta Riserva requires at least 60 months on the lees',
      'Franciacorta is traditional method and shares nothing with Prosecco but a country'
    ]
  },
  {
    id: 'w-giulio-ferrari', p: 'Giulio Ferrari Riserva del Fondatore',
    by: 'p-ferrari',
    country: 'Italy, Piedmont and the North', r: 'Trentino', sub: 'Trento DOC',
    founded: '',
    holdings: 'Chardonnay from high vineyards on the slopes above Trento.',
    style: 'Traditional method, held on lees for a decade or more before disgorgement.',
    t: 'Green apple, almond paste and chalk after ten years on the lees',
    why: 'The wine that makes Trento DOC examinable alongside Franciacorta, and the country\'s reference for extended lees ageing.',
    wines: [
      { n: 'Giulio Ferrari Riserva del Fondatore', grape: 'Chardonnay', note: 'Italy\'s benchmark long-aged traditional-method wine' }
    ],
    traps: [
      'Trento DOC, not Franciacorta: a different region and a different appellation',
      'It is a blanc de blancs made from Chardonnay alone'
    ]
  },
  {
    id: 'w-la-poja', p: 'La Poja',
    by: 'p-allegrini',
    country: 'Italy, Piedmont and the North', r: 'Valpolicella', sub: 'Fumane',
    founded: '',
    holdings: 'A parcel at the crown of the La Grola hill in the Valpolicella Classico zone.',
    style: 'Fresh grapes rather than dried, fermented dry and aged in French oak.',
    t: 'Sour cherry, pepper and iron: Corvina without the drying rack',
    why: 'The proof that Corvina alone can carry a serious dry red, and a reminder that the Veneto\'s best reds are often IGT.',
    wines: [
      { n: 'La Poja', grape: 'Corvina', note: 'a varietal Corvina from a single site, bottled as IGT' }
    ],
    traps: [
      'La Poja uses no appassimento: it is not an Amarone',
      'It is bottled as IGT because a varietal Corvina falls outside the Valpolicella rules'
    ]
  },
  {
    id: 'w-sori-tildin', p: 'Sorì Tildìn',
    by: 'p-gaja',
    country: 'Italy, Piedmont and the North', r: 'Barbaresco', sub: 'Barbaresco',
    founded: '',
    holdings: 'A steep south-facing parcel in the commune of Barbaresco, neighbouring Costa Russi.',
    style: 'Low yields and French oak: the most structured of the three single vineyards.',
    t: 'Dark cherry, tar and sweet spice: Barbaresco with a Burgundian address',
    why: 'Gaja\'s single vineyards proved Barbaresco could be priced and aged like first-rank Barolo, and their appellation status changed twice.',
    wines: [
      { n: 'Sorì Tildìn', grape: 'Nebbiolo', note: 'named for Angelo Gaja\'s grandmother Clotilde' }
    ],
    traps: [
      'Bottled as Langhe Nebbiolo DOC from the 1996 vintage, returning to Barbaresco DOCG with 2013',
      'Sori means a south-facing slope, so Sorì Tildìn and Sorì San Lorenzo are different sites'
    ]
  },
  {
    id: 'w-cartizze', p: 'Valdobbiadene Superiore di Cartizze',
    country: 'Italy, Piedmont and the North', r: 'Prosecco', sub: 'Valdobbiadene',
    founded: '',
    holdings: 'A small steep hill between the hamlets of Santo Stefano, San Pietro di Barbozza and Saccol, divided among many growers.',
    style: 'Tank method, usually finished in the Dry style with noticeable sweetness.',
    t: 'White peach, acacia and almond: the steepest hill, sweeter than expected',
    why: 'The top cru of Valdobbiadene and the standard trap on Prosecco sweetness, since Cartizze is usually Dry rather than Brut.',
    wines: [
      { n: 'Valdobbiadene Superiore di Cartizze', grape: 'Glera', note: 'the top site of the Prosecco Superiore DOCG' }
    ],
    traps: [
      'Cartizze is normally made in the Dry style, sweeter than Brut or Extra Dry',
      'The grape is Glera, renamed from Prosecco in 2009',
      'Cartizze is a hill shared by many owners, not one producer\'s vineyard'
    ]
  },
  {
    id: 'w-vintage-tunina', p: 'Vintage Tunina',
    by: 'p-jermann',
    country: 'Italy, Piedmont and the North', r: 'Venezia Giulia', sub: 'Collio',
    founded: '',
    holdings: 'Grapes from the estate\'s Collio vineyards, picked late and blended.',
    style: 'No new oak and no skin contact: ripeness and texture from fruit rather than winemaking.',
    t: 'Ripe pear, acacia, salted almond: Friuli\'s white blend at full stretch',
    why: 'The wine that made Friulian white blends collectable, and the standing answer for an Italian IGT white of the first rank.',
    wines: [
      { n: 'Vintage Tunina', grape: 'Chardonnay, Sauvignon, Ribolla Gialla, Malvasia and Picolit', note: 'first made in 1975' }
    ],
    traps: [
      'It is a blend, not a varietal wine',
      'Vintage is part of the name, not a vintage designation'
    ]
  },
  {
    id: 'p-argiolas', p: 'Argiolas',
    country: 'Italy, Tuscany and the South', r: 'Sardinia', sub: 'Serdiana',
    founded: '1938',
    holdings: 'Vineyards in the south of Sardinia around Serdiana, with old Cannonau, Carignano and Bovale plantings.',
    style: 'Native varieties given international polish, with Giacomo Tachis having shaped the top blend.',
    t: 'Sun-dried herb, black cherry and myrtle over warm island tannin',
    why: 'Turriga is the Sardinian red a candidate is expected to name, and Argiolas shows Tachis working south after Sassicaia.',
    wines: [
      { n: 'Turriga', grape: 'Cannonau with Carignano, Bovale Sardo and Malvasia Nera', note: 'Sardinia\'s best known red blend' },
      { n: 'Costamolino', grape: 'Vermentino', note: 'the widely poured Vermentino di Sardegna' },
      { n: 'Korem', grape: 'Bovale with Carignano and Cannonau', note: 'the second serious red blend' }
    ],
    traps: [
      'Cannonau is Grenache; Carignano is Carignan; Bovale is linked to Spanish varieties',
      'Vermentino di Sardegna is DOC across the island; Vermentino di Gallura in the north east is the DOCG'
    ]
  },
  {
    id: 'p-arianna-occhipinti', p: 'Arianna Occhipinti',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Vittoria',
    founded: '2004',
    holdings: 'Vineyards around Vittoria farmed without chemicals, with old alberello Frappato and Nero d\'Avola.',
    style: 'Natural, unfiltered, large old oak and cement; pale reds with aromatic lift rather than extract.',
    t: 'Wild strawberry, blood orange and thyme, pale and almost weightless',
    why: 'The name that carried Frappato into the natural wine canon, and a family link to COS through her uncle Giusto Occhipinti.',
    wines: [
      { n: 'Il Frappato', grape: 'Frappato', note: 'the varietal wine that made Frappato a sommelier staple' },
      { n: 'SP68 Rosso', grape: 'Frappato with Nero d\'Avola', note: 'named after the road past the winery, the everyday bottling' },
      { n: 'Grotte Alte', grape: 'Nero d\'Avola with Frappato', note: 'the estate\'s long-aged Cerasuolo di Vittoria Classico' },
      { n: 'Siccagno', grape: 'Nero d\'Avola', note: 'varietal Nero d\'Avola from dry-farmed vines' }
    ],
    traps: [
      'SP68 exists in red and white versions',
      'Frappato is pale and floral, so blind it is mistaken for Pinot Noir or Cinsault'
    ]
  },
  {
    id: 'p-arnaldo-caprai', p: 'Arnaldo Caprai',
    country: 'Italy, Tuscany and the South', r: 'Umbria', sub: 'Montefalco Sagrantino DOCG',
    founded: '1971',
    holdings: 'Vineyards around Montefalco, with clonal and trellis research that underpinned the revival of Sagrantino from near extinction.',
    style: 'Sagrantino pushed toward ripeness and long barrique aging to tame the highest tannin load of any Italian variety.',
    t: 'Blackberry, ink and tar over tannin that dries the mouth like strong tea',
    why: 'Sagrantino has extraordinary tannin and polyphenol levels, and the Court uses Caprai to anchor Montefalco Sagrantino DOCG and its long mandatory aging.',
    wines: [
      { n: 'Montefalco Sagrantino 25 Anni', grape: 'Sagrantino', note: 'the bottling that put Sagrantino on export lists' },
      { n: 'Montefalco Sagrantino Collepiano', grape: 'Sagrantino', note: 'the estate\'s classic Sagrantino' },
      { n: 'Montefalco Sagrantino Passito', grape: 'Sagrantino', note: 'the traditional sweet form, which is how the grape was historically used' }
    ],
    traps: [
      'Sagrantino di Montefalco is 100 percent Sagrantino; Montefalco Rosso is Sangiovese-based with a little Sagrantino',
      'The historic style was passito, not dry',
      'Umbria has two DOCGs: Montefalco Sagrantino and Torgiano Rosso Riserva'
    ]
  },
  {
    id: 'p-attilio-contini', p: 'Attilio Contini',
    country: 'Italy, Tuscany and the South', r: 'Sardinia', sub: 'Vernaccia di Oristano DOC',
    founded: '1898',
    holdings: 'A family house at Cabras on the Sinis peninsula holding old casks of Vernaccia across many decades.',
    style: 'Aged under a film of flor in part-filled chestnut and oak casks, unfortified, drawn from very old reserves.',
    t: 'Bruised apple, walnut skin and salt: Sardinia\'s answer to old Sherry',
    why: 'Vernaccia di Oristano is the only Italian wine matured under flor in the Sherry manner and Contini is the house that kept it alive.',
    wines: [
      { n: 'Antico Gregori', grape: 'Vernaccia di Oristano', note: 'blended from very old reserves, the region\'s rarest wine' },
      { n: 'Vernaccia di Oristano Riserva', grape: 'Vernaccia di Oristano', note: 'the flor-aged classic in its standard form' }
    ],
    traps: [
      'Vernaccia di Oristano is unrelated to Vernaccia di San Gimignano',
      'It is aged under flor but not fortified in its classic form',
      'Vernaccia di Serrapetrona in the Marche is a sparkling red, a third unrelated Vernaccia'
    ]
  },
  {
    id: 'p-avignonesi', p: 'Avignonesi',
    country: 'Italy, Tuscany and the South', r: 'Montepulciano', sub: 'Vino Nobile di Montepulciano DOCG',
    founded: '',
    holdings: 'Estates around Montepulciano in south eastern Tuscany, farmed biodynamically',
    style: 'Vino Nobile from Prugnolo Gentile, and a Vin Santo programme of near-mythical patience.',
    t: 'Occhio di Pernice: dried fig, walnut, caramel and saline lift, thick as syrup',
    why: 'The reference for Vin Santo, and for the fact that Occhio di Pernice is made from black grapes while standard Vin Santo is white.',
    wines: [
      { n: 'Vin Santo di Montepulciano Occhio di Pernice', grape: 'Sangiovese', note: 'a red-grape Vin Santo aged many years in tiny caratelli, made in minute quantity' },
      { n: 'Vino Nobile di Montepulciano', grape: 'Prugnolo Gentile', note: 'the denomination\'s calling card' },
      { n: 'Vin Santo di Montepulciano', grape: 'Trebbiano and Malvasia', note: 'the white-grape version, for the contrast with Occhio di Pernice' }
    ],
    traps: [
      'Vino Nobile comes from the Tuscan town of Montepulciano and is Sangiovese, locally Prugnolo Gentile',
      'Montepulciano d\'Abruzzo is a different grape in a different region',
      'Occhio di Pernice means red grapes, not a sweetness level'
    ]
  },
  {
    id: 'p-barone-ricasoli', p: 'Barone Ricasoli (Castello di Brolio)',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Gaiole in Chianti',
    founded: '1141',
    holdings: 'The Brolio estate in Gaiole, the largest single property in Chianti Classico, held by the Ricasoli family since the Middle Ages.',
    style: 'Sangiovese-led and increasingly soil-mapped, with single-vineyard Gran Selezione bottlings from identified parcels.',
    t: 'Iris, red cherry and dry earth over the fine tannin of Gaiole\'s rocky soils',
    why: 'Bettino Ricasoli\'s 1872 letter set out the Sangiovese, Canaiolo and Malvasia formula that governed Chianti for a century. The Court asks for the author and the varieties.',
    wines: [
      { n: 'Chianti Classico Gran Selezione Colledila', grape: 'Sangiovese', note: 'single-vineyard Gran Selezione from the Brolio estate' },
      { n: 'Castello di Brolio Chianti Classico Gran Selezione', grape: 'Sangiovese', note: 'the historic estate wine' },
      { n: 'Casalferro', grape: 'Merlot', note: 'the estate\'s international-variety bottling, outside the DOCG' }
    ],
    traps: [
      'The Ricasoli formula included white grapes; white grapes were forbidden in Chianti Classico from 2006',
      'Gran Selezione requires estate fruit and longer aging than Riserva'
    ]
  },
  {
    id: 'p-benanti', p: 'Benanti',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Etna DOC',
    founded: '1988',
    holdings: 'Parcels on several sides of Etna, including Carricante at Milo on the eastern slope and Nerello at Contrada Monte Serra in the south east.',
    style: 'Restrained and mineral; the whites are built to age, the reds are pale and savoury rather than extracted.',
    t: 'Green apple, ash and lemon rind over wet volcanic stone',
    why: 'Benanti revived Etna as a fine wine region before the outside investors arrived, and Pietramarina is the standard question about Etna Bianco Superiore.',
    wines: [
      { n: 'Pietramarina', grape: 'Carricante', note: 'Etna Bianco Superiore from Milo, the reference for ageworthy Carricante' },
      { n: 'Serra della Contessa', grape: 'Nerello Mascalese with Nerello Cappuccio', note: 'old vines on the south eastern slope' },
      { n: 'Contrada Cavaliere', grape: 'Nerello Mascalese', note: 'a south western contrada bottling' }
    ],
    traps: [
      'Etna Bianco Superiore may come only from the commune of Milo, and requires a higher share of Carricante',
      'Nerello Mascalese and Nerello Cappuccio are different grapes',
      'Etna has four slopes and they do not taste alike'
    ]
  },
  {
    id: 'p-biondi-santi', p: 'Biondi-Santi (Tenuta Greppo)',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Brunello di Montalcino',
    founded: '19th century',
    holdings: 'The Greppo estate south of Montalcino town, planted and shaped by the Biondi Santi family through the 1800s and 1900s; the Riserva is drawn only from the oldest parcels.',
    style: 'Pale, high-toned and acid-driven, aged in large old Slavonian botti with no new oak; built to be unapproachable young.',
    t: 'The inventor\'s style: high-toned cherry, tea leaf, acid-driven longevity',
    why: 'The Court treats Biondi-Santi as the origin point of Brunello: Ferruccio Biondi Santi\'s late-1800s bottlings and the estate\'s BBS11 selection are the reference for what 100 percent Sangiovese in Montalcino means.',
    wines: [
      { n: 'Brunello di Montalcino Riserva', grape: 'Sangiovese Grosso', note: 'the bottling that defined Brunello as a category and its longest-lived example' },
      { n: 'Brunello di Montalcino Annata', grape: 'Sangiovese Grosso', note: 'the estate style in a lighter frame, still austere in youth' },
      { n: 'Rosso di Montalcino', grape: 'Sangiovese Grosso', note: 'shows how the house reads in a wine without the long cask aging' }
    ],
    traps: [
      'Brunello is 100 percent Sangiovese; Chianti Classico only requires a Sangiovese minimum',
      'Do not confuse the Greppo estate with the separate Jacopo Biondi Santi wines from Castello di Montepo',
      'Riserva is not simply longer aging: it comes from the older vines'
    ]
  },
  {
    id: 'p-bucci', p: 'Bucci',
    country: 'Italy, Tuscany and the South', r: 'Marche', sub: 'Verdicchio dei Castelli di Jesi Classico',
    founded: '',
    holdings: 'A mixed farm in the hills of the Castelli di Jesi zone, with vineyards among cereal and olive plantings.',
    style: 'Verdicchio matured in large old Slavonian casks, made for age rather than for immediate aromatic charm.',
    t: 'Lemon, almond skin and beeswax, dry and long, with a bitter almond finish',
    why: 'The reference producer for Verdicchio dei Castelli di Jesi and for the claim that Italy\'s best ageworthy whites are not all in the north.',
    wines: [
      { n: 'Villa Bucci Riserva', grape: 'Verdicchio', note: 'Verdicchio dei Castelli di Jesi Classico Riserva, the case for Verdicchio as a long-lived white' },
      { n: 'Bucci Verdicchio dei Castelli di Jesi Classico', grape: 'Verdicchio', note: 'the unoaked benchmark of the zone' }
    ],
    traps: [
      'Verdicchio dei Castelli di Jesi Riserva is DOCG; the base wine is DOC',
      'Verdicchio is not Trebbiano Toscano, but it is the same variety as Trebbiano di Soave and as Turbiana in Lugana'
    ]
  },
  {
    id: 'p-cantina-santadi', p: 'Cantina Santadi',
    country: 'Italy, Tuscany and the South', r: 'Sardinia', sub: 'Carignano del Sulcis DOC',
    founded: '1960',
    holdings: 'A cooperative in the Sulcis in south western Sardinia, drawing on old ungrafted bush-trained Carignano on coastal sand.',
    style: 'Rich and dark Carignano aged in French oak, a long way from the variety\'s thin reputation elsewhere.',
    t: 'Dark plum, myrtle and iodine from bush vines rooted in coastal sand',
    why: 'The Sulcis is the case for old ungrafted Carignano on sand, and Terre Brune is proof that a cooperative can hold a region\'s top wine.',
    wines: [
      { n: 'Terre Brune', grape: 'Carignano with Bovaleddu', note: 'Carignano del Sulcis Superiore, the wine that made the zone' },
      { n: 'Rocca Rubia', grape: 'Carignano', note: 'the Riserva tier beneath Terre Brune' }
    ],
    traps: [
      'Carignano del Sulcis is Sardinian, not Languedoc Carignan territory',
      'Sand prevents phylloxera, which is why these vines are ungrafted',
      'Terre Brune is the Superiore tier of the DOC'
    ]
  },
  {
    id: 'p-capichera', p: 'Capichera',
    country: 'Italy, Tuscany and the South', r: 'Sardinia', sub: 'Gallura',
    founded: '',
    holdings: 'Granite-soiled vineyards in the Gallura hills of north eastern Sardinia, run by the Ragnedda family.',
    style: 'Rich, low-yield Vermentino, often barrel-influenced and built for aging rather than for freshness alone.',
    t: 'Broad and saline: ripe pear, fennel, almond and granite dust',
    why: 'Vermentino di Gallura is Sardinia\'s only DOCG and Capichera is the producer named with it, even though the estate labels much of its range as IGT.',
    wines: [
      { n: 'Vendemmia Tardiva', grape: 'Vermentino', note: 'late-harvested and dry, the estate\'s most discussed wine' },
      { n: 'Capichera Classico', grape: 'Vermentino', note: 'the house style at its most direct' },
      { n: 'Santigaini', grape: 'Vermentino', note: 'another late-picked expression' }
    ],
    traps: [
      'Vermentino di Gallura is DOCG; Vermentino di Sardegna is the island-wide DOC',
      'Vendemmia Tardiva here means late picked and dry, not sweet',
      'Vermentino is Rolle in Provence and Pigato in Liguria'
    ]
  },
  {
    id: 'p-casanova-di-neri', p: 'Casanova di Neri',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Brunello di Montalcino',
    founded: '1971',
    holdings: 'Parcels spread across several sectors of Montalcino, including the steep Cerretalto site on the eastern side.',
    style: 'Modern-leaning: riper fruit, some French oak on the top bottlings, darker and more polished than the traditional camp.',
    t: 'Dark cherry, espresso and sweet spice: Montalcino\'s modern polish',
    why: 'The counterweight to Biondi-Santi and Soldera in any question about traditional against modern Brunello, and a working example of single-vineyard bottling in a zone with no official cru system.',
    wines: [
      { n: 'Brunello di Montalcino Cerretalto', grape: 'Sangiovese', note: 'single-vineyard, made only in selected vintages' },
      { n: 'Brunello di Montalcino Tenuta Nuova', grape: 'Sangiovese', note: 'the bottling that carried the modern Montalcino style to a wide audience' },
      { n: 'Brunello di Montalcino (annata)', grape: 'Sangiovese', note: 'the estate\'s traditional-format wine' }
    ],
    traps: [
      'Montalcino has no legal cru classification: vineyard names are producers\' own',
      'Tenuta Nuova is a Casanova di Neri bottling named for one of its own properties, not a rival producer'
    ]
  },
  {
    id: 'p-castello-banfi', p: 'Castello Banfi',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Sant\'Angelo Scalo',
    founded: '1978',
    holdings: 'A very large estate in the south west of Montalcino assembled by the Mariani family of New York, with extensive Sangiovese clonal trial plantings.',
    style: 'Commercially scaled, technically exact, riper and rounder; the top Riservas see French oak.',
    t: 'Polished and plush: ripe cherry, vanilla, chocolate over supple tannin',
    why: 'The examinable example of American capital reshaping an Italian denomination, and of the clonal research that gave Montalcino its modern Sangiovese selections.',
    wines: [
      { n: 'Brunello di Montalcino Poggio all\'Oro Riserva', grape: 'Sangiovese', note: 'the estate\'s Riserva flagship' },
      { n: 'Brunello di Montalcino Poggio alle Mura', grape: 'Sangiovese', note: 'single-vineyard bottling around the castle itself' },
      { n: 'Brunello di Montalcino', grape: 'Sangiovese', note: 'the volume face of the denomination in export markets' }
    ],
    traps: [
      'Banfi\'s size does not exempt it from the 100 percent Sangiovese rule',
      'Banfi also produces Moscadello di Montalcino, the zone\'s near-forgotten sweet white'
    ]
  },
  {
    id: 'p-castello-dei-rampolla', p: 'Castello dei Rampolla',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Panzano in Chianti',
    founded: '',
    holdings: 'Biodynamic vineyards in the Conca d\'Oro at Panzano, farmed by the di Napoli Rampolla family.',
    style: 'Uncompromising and structured; Bordeaux varieties planted early in Chianti and handled without softening.',
    t: 'Graphite, cassis and bay leaf over dense Panzano tannin',
    why: 'A Panzano neighbour of Fontodi that answered the same question in the opposite way: Bordeaux varieties rather than pure Sangiovese, from identical soils.',
    wines: [
      { n: 'Vigna d\'Alceo', grape: 'Cabernet Sauvignon with Petit Verdot', note: 'the estate\'s flagship IGT, first made in the mid 1990s' },
      { n: 'Sammarco', grape: 'Cabernet Sauvignon with Sangiovese', note: 'one of the first Cabernet-led Tuscan reds, from the early 1980s' },
      { n: 'Chianti Classico', grape: 'Sangiovese', note: 'biodynamic annata from the same amphitheatre as Fontodi' }
    ],
    traps: [
      'Vigna d\'Alceo and Sammarco are IGT Toscana; the estate\'s Chianti Classico is a separate wine'
    ]
  },
  {
    id: 'p-castello-di-ama', p: 'Castello di Ama',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Gaiole in Chianti',
    founded: '',
    holdings: 'High vineyards around the hamlet of Ama in Gaiole, with named parcels bottled separately and a contemporary art programme in the cellars.',
    style: 'Elegant and cool-toned Sangiovese from altitude, with a celebrated Merlot made in a single small plot.',
    t: 'Cool red cherry, mint and wet stone from Gaiole\'s altitude',
    why: 'Ama led the argument for single-vineyard Chianti Classico long before Gran Selezione existed, and L\'Apparita is the Italian Merlot benchmark after Masseto.',
    wines: [
      { n: 'L\'Apparita', grape: 'Merlot', note: 'pure Merlot from one small parcel, the wine that showed Merlot could be great in Chianti' },
      { n: 'Chianti Classico Gran Selezione San Lorenzo', grape: 'Sangiovese with a little Merlot', note: 'the estate\'s principal Gran Selezione' },
      { n: 'Chianti Classico Gran Selezione Vigneto Bellavista', grape: 'Sangiovese with Malvasia Nera', note: 'single-vineyard bottling from one of the estate\'s best sites' }
    ],
    traps: [
      'Gran Selezione is a tier above Riserva, introduced in 2014, not a vineyard classification',
      'Ama\'s single-vineyard names are estate parcels, not legal crus'
    ]
  },
  {
    id: 'p-cerbaiona', p: 'Cerbaiona',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Brunello di Montalcino',
    founded: '1977',
    holdings: 'A very small holding on the eastern side of Montalcino town, established by the former airline pilot Diego Molinari and sold to new owners in 2015.',
    style: 'Traditional cask aging, no new oak, wines that are savoury and taut rather than sweet.',
    t: 'Sour cherry, leather, tobacco leaf and a dusty savour that never turns sweet',
    why: 'Named when the examiner wants the small traditionalist end of Montalcino rather than the estates with volume.',
    wines: [
      { n: 'Brunello di Montalcino', grape: 'Sangiovese', note: 'a cult traditional Brunello made in tiny quantity' },
      { n: 'Cerbaiona Rosso', grape: 'Sangiovese', note: 'the estate\'s earlier-drinking red' }
    ],
    traps: [
      'Cerbaiona is not Salvioni\'s La Cerbaiola: two separate Montalcino estates with near-identical names'
    ]
  },
  {
    id: 'p-cos', p: 'COS',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Cerasuolo di Vittoria Classico DOCG',
    founded: '1980',
    holdings: 'Vineyards on the sandy limestone terraces around Vittoria in south eastern Sicily, farmed biodynamically.',
    style: 'Light-handed and often amphora-aged, with the Pithos wines fermented and aged in buried terracotta amphorae',
    t: 'Pale cherry, pomegranate and dust: Frappato lifting Nero d\'Avola\'s weight',
    why: 'Cerasuolo di Vittoria is Sicily\'s only DOCG and COS is the producer named alongside it, plus the standard reference for amphora fermentation in Italy.',
    wines: [
      { n: 'Cerasuolo di Vittoria Classico', grape: 'Nero d\'Avola with Frappato', note: 'the only DOCG in Sicily, made by the estate that revived it' },
      { n: 'Pithos Rosso', grape: 'Nero d\'Avola with Frappato', note: 'amphora-fermented and aged, one of the earliest of the modern Italian amphora wines' },
      { n: 'Frappato', grape: 'Frappato', note: 'varietal Frappato, pale and perfumed' }
    ],
    traps: [
      'Cerasuolo di Vittoria is a red DOCG in Sicily; Cerasuolo d\'Abruzzo is a rosato',
      'The blend is Nero d\'Avola with Frappato, with a required range for each',
      'Classico is a smaller inner zone within the DOCG'
    ]
  },
  {
    id: 'p-donnafugata', p: 'Donnafugata',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Pantelleria and Contessa Entellina',
    founded: '1983',
    holdings: 'Estates in western Sicily at Contessa Entellina, on Pantelleria for Zibibbo, and more recently on Etna and at Vittoria.',
    style: 'Polished and modern across a wide range, with the Pantelleria sweet wines as the serious end.',
    t: 'Ben Rye: dried apricot, fig, saffron and salt wind off the Pantelleria stone',
    why: 'Passito di Pantelleria is a fixed sweet wine question and Ben Rye is the bottle that represents it, made from bush vines grown in hollows against the wind.',
    wines: [
      { n: 'Ben Ryé', grape: 'Zibibbo', note: 'Passito di Pantelleria, the reference sweet wine of the Italian islands' },
      { n: 'Mille e una Notte', grape: 'Nero d\'Avola-led blend', note: 'the flagship red from Contessa Entellina' },
      { n: 'Tancredi', grape: 'Nero d\'Avola with Cabernet Sauvignon', note: 'the long-running international blend' }
    ],
    traps: [
      'Zibibbo on Pantelleria is Muscat of Alexandria, not Muscat Blanc',
      'The low bush training of Pantelleria is a recognised cultural practice, protected for the technique',
      'Moscato di Pantelleria and Passito di Pantelleria are separate styles'
    ]
  },
  {
    id: 'p-elena-fucci', p: 'Elena Fucci',
    country: 'Italy, Tuscany and the South', r: 'Basilicata', sub: 'Aglianico del Vulture',
    founded: '2000',
    holdings: 'A single high vineyard called Titolo at Barile on the slopes of Monte Vulture, an extinct volcano, on volcanic soils.',
    style: 'Built on one high vineyard, farmed and bottled as a single site; pure, tense Aglianico with volcanic smoke and firm acid.',
    t: 'Volcanic Aglianico: black cherry, ash, violet and bright mountain acidity',
    why: 'The clearest single-vineyard statement in Basilicata and the usual name when the Court separates Vulture Aglianico from Taurasi.',
    wines: [
      { n: 'Titolo', grape: 'Aglianico', note: 'Aglianico del Vulture from a single high volcanic vineyard' }
    ],
    traps: [
      'Aglianico del Vulture is Basilicata; Taurasi is Campania',
      'Aglianico del Vulture Superiore is the DOCG, the base wine is DOC',
      'Monte Vulture soils are volcanic; Taurasi\'s are largely clay and limestone'
    ]
  },
  {
    id: 'p-emidio-pepe', p: 'Emidio Pepe',
    country: 'Italy, Tuscany and the South', r: 'Abruzzo', sub: 'Torano Nuovo',
    founded: '1964',
    holdings: 'A family estate at Torano Nuovo in the Colline Teramane, farmed organically and biodynamically with pergola-trained vines.',
    style: 'Grapes crushed by foot, fermentation in glass-lined cement, no wood, long bottle aging, then decanting and rebottling by hand before release.',
    t: 'Wild and pure: sour cherry, dried blood orange, herbs and no oak at all',
    why: 'The house that defined natural winemaking in Abruzzo, and the standing example of a producer holding a deep library and rebottling by hand.',
    wines: [
      { n: 'Montepulciano d\'Abruzzo', grape: 'Montepulciano', note: 'the estate\'s flagship, often released decades after the vintage' },
      { n: 'Trebbiano d\'Abruzzo', grape: 'Trebbiano', note: 'the other pillar of Abruzzo whites alongside Valentini' },
      { n: 'Pecorino', grape: 'Pecorino', note: 'a revived Abruzzo variety, nothing to do with the cheese' }
    ],
    traps: [
      'Pecorino is a white grape of Abruzzo and the Marche',
      'Colline Teramane is the DOCG within Montepulciano d\'Abruzzo',
      'No oak is used, so oak character in a blind wine argues against Pepe'
    ]
  },
  {
    id: 'p-felsina', p: 'Fattoria di Fèlsina',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Castelnuovo Berardenga',
    founded: '1966',
    holdings: 'The southern extremity of Chianti Classico at Castelnuovo Berardenga, where the zone meets the Crete Senesi; the Rancia parcel is a former monastic site.',
    style: 'Firm, savoury, mineral Sangiovese with genuine tannic architecture; oak used in support rather than for flavour.',
    t: 'Savoury and mineral: black cherry, tobacco leaf, iron from the Berardenga edge',
    why: 'Felsina is the standing example of how the southern rim of Chianti Classico differs from Radda and Panzano, and Fontalloro explains why some Sangiovese must be IGT for geographic reasons alone.',
    wines: [
      { n: 'Chianti Classico Riserva Rancia', grape: 'Sangiovese', note: 'single-vineyard Riserva, the reference for southern Chianti Classico' },
      { n: 'Fontalloro', grape: 'Sangiovese', note: 'pure Sangiovese IGT from parcels on both sides of the DOCG boundary' },
      { n: 'Chianti Classico Gran Selezione Colonia', grape: 'Sangiovese', note: 'from high old vines, the estate\'s most structured wine' }
    ],
    traps: [
      'Fontalloro is IGT because the vineyards straddle the DOCG line, not because of the grapes',
      'Castelnuovo Berardenga is warmer and drier than the northern communes'
    ]
  },
  {
    id: 'p-selvapiana', p: 'Fattoria Selvapiana',
    country: 'Italy, Tuscany and the South', r: 'Chianti Rufina', sub: 'Pontassieve',
    founded: '1827',
    holdings: 'An estate in the Sieve valley north east of Florence, in the Giuntini family since the early 1800s; the Bucerchiale vineyard is bottled separately.',
    style: 'Cool-climate Sangiovese: lean, high-acid, floral, long-lived, with little oak flavour.',
    t: 'Cool and nervy: red currant, violet, orange zest and Apennine chill',
    why: 'Rufina is the smallest and coolest Chianti subzone and the one examiners use to test whether a candidate knows Chianti is more than Chianti Classico.',
    wines: [
      { n: 'Chianti Rufina Riserva Bucerchiale', grape: 'Sangiovese', note: 'the single-vineyard wine that made the case for Rufina\'s quality' },
      { n: 'Chianti Rufina', grape: 'Sangiovese', note: 'the annata, a standard teaching wine for the subzone' },
      { n: 'Vin Santo del Chianti Rufina', grape: 'Trebbiano and Malvasia', note: 'traditional caratelli-aged sweet wine' }
    ],
    traps: [
      'Chianti Rufina is a Chianti subzone, not part of Chianti Classico and not entitled to the black rooster',
      'Rufina the subzone is not Ruffino the merchant house'
    ]
  },
  {
    id: 'p-feudi-di-san-gregorio', p: 'Feudi di San Gregorio',
    country: 'Italy, Tuscany and the South', r: 'Campania', sub: 'Irpinia',
    founded: '1986',
    holdings: 'A large modern estate at Sorbo Serpico in Irpinia, with holdings across Campania and old ungrafted Aglianico parcels.',
    style: 'Modern and precise: clean whites with real texture, Aglianico softened by French oak without losing its acid spine.',
    t: 'Hazelnut and pear in the whites, ash and black cherry in the Aglianico',
    why: 'The modern face of Campania and the producer most likely to be poured blind when an examiner wants Fiano or Greco at a recognisable standard.',
    wines: [
      { n: 'Serpico', grape: 'Aglianico', note: 'from old ungrafted vines, the estate\'s Aglianico statement' },
      { n: 'Taurasi Piano di Montevergine Riserva', grape: 'Aglianico', note: 'the estate inside the DOCG' },
      { n: 'Fiano di Avellino Pietracalda', grape: 'Fiano', note: 'widely poured benchmark Fiano' },
      { n: 'Greco di Tufo Cutizzi', grape: 'Greco', note: 'the counterpart in Greco' }
    ],
    traps: [
      'Serpico is not Taurasi, though it is made from Aglianico grown in Irpinia',
      'Fiano is waxy and nutty, Greco is firmer and more citrus-peel driven: do not swap them'
    ]
  },
  {
    id: 'p-fontodi', p: 'Fontodi',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Panzano in Chianti',
    founded: '',
    holdings: 'The Manetti family farms an organic amphitheatre of vineyards in the Conca d\'Oro at Panzano, and fires its own terracotta.',
    style: 'Pure Sangiovese, organic, ripe but firmly structured, French oak used without dominating the fruit.',
    t: 'Dark cherry, iris, espresso: Conca d\'Oro Sangiovese with no Bordeaux in it',
    why: 'Fontodi proves the Super Tuscan story was never only about Cabernet: Flaccianello left the denomination while staying 100 percent Sangiovese.',
    wines: [
      { n: 'Flaccianello della Pieve', grape: 'Sangiovese', note: 'pure Sangiovese IGT, first made in 1981, the Super Tuscan made with no Bordeaux grapes at all' },
      { n: 'Chianti Classico Gran Selezione Vigna del Sorbo', grape: 'Sangiovese', note: 'the estate\'s top wine inside the denomination' },
      { n: 'Chianti Classico', grape: 'Sangiovese', note: 'the Panzano benchmark at annata level' }
    ],
    traps: [
      'Not every Super Tuscan contains international varieties',
      'Panzano is a village in Greve, and is one of the Chianti Classico UGA names'
    ]
  },
  {
    id: 'p-frank-cornelissen', p: 'Frank Cornelissen',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Etna, north slope',
    founded: '2001',
    holdings: 'Scattered high parcels above Solicchiata and Randazzo, including very old vines at Barbabecchi.',
    style: 'Radical non-intervention: no sulphur additions in the early years, fermentation in buried vessels and amphorae, no fining or filtration.',
    t: 'Raw and volcanic: blood orange, smoke, brine and unruly wild fruit',
    why: 'The outer edge of natural winemaking on Etna, and the producer used to test whether a candidate can separate volcanic character from cellar character.',
    wines: [
      { n: 'Magma', grape: 'Nerello Mascalese', note: 'the single-parcel wine from the oldest and highest vines' },
      { n: 'Munjebel Rosso', grape: 'Nerello Mascalese', note: 'the estate\'s main red, named for an old Arabic name for the mountain' },
      { n: 'Contadino', grape: 'field blend', note: 'the everyday wine from mixed old plantings' }
    ],
    traps: [
      'Much of the range has been bottled as Terre Siciliane IGT rather than Etna DOC',
      'Reduction, volatility and cloudiness here are stylistic, not necessarily faults, and examiners will press on that distinction'
    ]
  },
  {
    id: 'p-gianfranco-fino', p: 'Gianfranco Fino',
    country: 'Italy, Tuscany and the South', r: 'Puglia', sub: 'Primitivo di Manduria DOC',
    founded: '2004',
    holdings: 'Old bush-trained alberello Primitivo near Manduria in the Salento, farmed at very low yields.',
    style: 'Extremely concentrated and high in alcohol, yet held together by freshness; barrique-aged.',
    t: 'Black fig, liquorice and sweet spice at high volume, kept upright by salt',
    why: 'Fino is how the Court tests Primitivo as a serious variety rather than a value category, and the alberello training of old Salento vines.',
    wines: [
      { n: 'Es', grape: 'Primitivo', note: 'the bottling that redefined what Primitivo di Manduria could command' },
      { n: 'Jo', grape: 'Negroamaro', note: 'the same approach applied to Salento\'s other red' }
    ],
    traps: [
      'Primitivo and Zinfandel are the same variety, with Croatian Tribidrag as the origin',
      'Primitivo di Manduria Dolce Naturale is the separate sweet DOCG',
      'Negroamaro and Primitivo are different grapes, often blended in Salento'
    ]
  },
  {
    id: 'p-girolamo-russo', p: 'Girolamo Russo',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Etna, north slope',
    founded: '2005',
    holdings: 'Old vineyards around Passopisciaro run by Giuseppe Russo, bottled separately as San Lorenzo, Feudo and Calderara Sottana.',
    style: 'Fine-boned and perfumed, with restrained oak; among the most Burgundian in feel of the north slope estates.',
    t: 'Red cherry, dried rose and warm ash, weightless but tightly drawn',
    why: 'Sits with Terre Nere and Graci as the trio used to demonstrate contrada difference on a single slope in a single vintage.',
    wines: [
      { n: 'San Lorenzo', grape: 'Nerello Mascalese', note: 'the estate\'s most celebrated contrada' },
      { n: 'A Rina', grape: 'Nerello Mascalese', note: 'the blended entry red, named for the volcanic sand' },
      { n: 'Feudo', grape: 'Nerello Mascalese', note: 'a contrasting contrada from lower ground' }
    ],
    traps: [
      'A Rina is a blend across sites, not a contrada wine',
      'Nerello Mascalese is often compared to Pinot Noir and Nebbiolo, and blind it is mistaken for both'
    ]
  },
  {
    id: 'p-graci', p: 'Graci',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Etna, north slope',
    founded: '2004',
    holdings: 'Vineyards at Passopisciaro in Contrada Arcuria, with very old alberello vines high up at Barbabecchi.',
    style: 'Non-interventionist, cement and large old oak, no new barriques; pale colour and firm structure.',
    t: 'Tense and pale: cranberry, iron, smoke and mountain air',
    why: 'A clean example of an Etna estate that markets by altitude and contrada rather than by grape, which is how the mountain is now studied.',
    wines: [
      { n: 'Arcuria', grape: 'Nerello Mascalese', note: 'the estate\'s principal contrada red' },
      { n: 'Quota 600', grape: 'Nerello Mascalese', note: 'named for altitude in metres, which is how Etna is described' },
      { n: 'Etna Bianco', grape: 'Carricante', note: 'the north slope answer to Milo\'s whites' }
    ],
    traps: [
      'Altitude on Etna runs from roughly 400 to above 1000 metres, and it changes the wine more than slope alone',
      'Etna Rosso permits a minority of Nerello Cappuccio alongside Nerello Mascalese'
    ]
  },
  {
    id: 'p-grattamacco', p: 'Grattamacco',
    country: 'Italy, Tuscany and the South', r: 'Bolgheri', sub: 'Bolgheri Superiore DOC',
    founded: '1977',
    holdings: 'One of the earliest estates in Bolgheri after San Guido, sited on higher ground at Castagneto Carducci.',
    style: 'Cabernet Sauvignon and Merlot with a share of Sangiovese, giving a more savoury and less plush Bolgheri.',
    t: 'Tighter and saltier Bolgheri: cassis, myrtle and a Sangiovese sourness underneath',
    why: 'Named as the second estate planted in Bolgheri and as evidence that Bolgheri DOC permits Sangiovese alongside the Bordeaux varieties.',
    wines: [
      { n: 'Grattamacco Bolgheri Superiore', grape: 'Cabernet Sauvignon with Merlot and Sangiovese', note: 'the Bolgheri red that keeps Sangiovese in the blend' },
      { n: 'Grattamacco Bianco', grape: 'Vermentino', note: 'among the better whites of the appellation' }
    ],
    traps: [
      'Bolgheri DOC allows Sangiovese and Syrah, not only Bordeaux grapes',
      'Grattamacco sits higher than the plain estates, which changes the style'
    ]
  },
  {
    id: 'p-isole-e-olena', p: 'Isole e Olena',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Barberino Tavarnelle',
    founded: '',
    holdings: 'Two adjoining historic properties, Isole and Olena, joined into one estate in the western hills of Chianti Classico.',
    style: 'Restrained and aromatic; Paolo De Marchi built a style of clarity rather than weight, and kept Syrah and Chardonnay as small experiments.',
    t: 'Red cherry, dried herb and violet, drawn fine rather than broad',
    why: 'The other founding pure-Sangiovese IGT alongside Flaccianello and Pergole Torte, and the standard reference for serious Vin Santo.',
    wines: [
      { n: 'Cepparello', grape: 'Sangiovese', note: 'pure Sangiovese IGT, first made in 1980, one of the original varietal Sangiovese Super Tuscans' },
      { n: 'Chianti Classico', grape: 'Sangiovese with Canaiolo', note: 'a benchmark annata, long a wine list staple' },
      { n: 'Vin Santo del Chianti Classico', grape: 'Trebbiano and Malvasia', note: 'among the most respected Vin Santo in Tuscany' },
      { n: 'Collezione De Marchi Syrah', grape: 'Syrah', note: 'the estate\'s long-running international experiment' }
    ],
    traps: [
      'Cepparello is a wine name, not a vineyard designation within the DOCG',
      'Vin Santo (Tuscany) is not Vinsanto (Santorini)'
    ]
  },
  {
    id: 'p-la-monacesca', p: 'La Monacesca',
    country: 'Italy, Tuscany and the South', r: 'Marche', sub: 'Verdicchio di Matelica',
    founded: '',
    holdings: 'High inland vineyards in the Matelica valley, which runs north to south and is cut off from the Adriatic.',
    style: 'Tighter and more mineral Verdicchio than the coastal zone, with the Mirum Riserva made for long aging.',
    t: 'Inland Verdicchio: white peach, flint, saline bite and a tense dry finish',
    why: 'Matelica is the smaller, cooler, landlocked Verdicchio zone and exists on the syllabus precisely to be distinguished from Castelli di Jesi.',
    wines: [
      { n: 'Mirum Riserva', grape: 'Verdicchio', note: 'Verdicchio di Matelica Riserva DOCG, the flagship of the inland zone' },
      { n: 'La Monacesca Verdicchio di Matelica', grape: 'Verdicchio', note: 'the straight expression of the valley' }
    ],
    traps: [
      'Verdicchio di Matelica and Verdicchio dei Castelli di Jesi are separate denominations',
      'Matelica is inland and higher, not the coastal one'
    ]
  },
  {
    id: 'p-le-macchiole', p: 'Le Macchiole',
    country: 'Italy, Tuscany and the South', r: 'Bolgheri', sub: 'Toscana IGT',
    founded: '1983',
    holdings: 'A family estate at Bolgheri built by Eugenio Campolmi and continued by Cinzia Merli, planted to single varieties rather than a blend.',
    style: 'Varietal purity: one grape per wine, ripe but firmly drawn, French oak used with restraint.',
    t: 'Bolgheri without the blend: graphite, bramble and sea-herb from single varieties',
    why: 'The estate that proves a Bolgheri producer may choose IGT over the DOC in order to bottle single varieties the appellation does not favour.',
    wines: [
      { n: 'Paleo Rosso', grape: 'Cabernet Franc', note: 'pure Cabernet Franc since the early 2000s, Italy\'s benchmark for the variety' },
      { n: 'Messorio', grape: 'Merlot', note: 'one of the few Italian Merlots spoken of with Masseto' },
      { n: 'Scrio', grape: 'Syrah', note: 'shows Bolgheri is not only about Bordeaux varieties' }
    ],
    traps: [
      'Paleo Rosso began as a blend and became pure Cabernet Franc; do not date it to the first vintage',
      'These are Toscana IGT wines from inside Bolgheri'
    ]
  },
  {
    id: 'p-lungarotti', p: 'Lungarotti',
    country: 'Italy, Tuscany and the South', r: 'Umbria', sub: 'Torgiano Rosso Riserva DOCG',
    founded: '',
    holdings: 'The dominant estate of Torgiano, south east of Perugia, with the Vigna Monticchio vineyard and a wine museum in the village.',
    style: 'Sangiovese-based reds held for long cellar aging before release; classical rather than modern.',
    t: 'Aged Sangiovese warmth: dried cherry, leather, tobacco and sweet earth',
    why: 'Torgiano Rosso Riserva is one of only two DOCGs in Umbria and is effectively the work of one family, which the Court likes to test.',
    wines: [
      { n: 'Rubesco Vigna Monticchio Riserva', grape: 'Sangiovese with Canaiolo', note: 'the wine that is Torgiano Rosso Riserva DOCG, released after long aging' },
      { n: 'Rubesco Torgiano Rosso', grape: 'Sangiovese with Canaiolo', note: 'the widely available DOC version' }
    ],
    traps: [
      'Torgiano Rosso Riserva is DOCG; plain Torgiano is DOC',
      'Umbria\'s DOCGs are Torgiano Rosso Riserva and Montefalco Sagrantino'
    ]
  },
  {
    id: 'p-marchesi-antinori', p: 'Marchesi Antinori',
    country: 'Italy, Tuscany and the South', r: 'Tuscany', sub: 'Chianti Classico',
    founded: '1385',
    holdings: 'Estates across Tuscany including Tignanello and Solaia at Santa Cristina in Chianti Classico, Badia a Passignano, and Guado al Tasso in Bolgheri.',
    style: 'Sangiovese blended with Bordeaux varieties, matured in French barriques: the template every Super Tuscan copied.',
    t: 'Cassis and cedar wrapped around Sangiovese\'s sour cherry and iris',
    why: 'Antinori with the oenologist Giacomo Tachis created the Super Tuscan category: wines too good for the table-wine tier the law forced on them, which drove the creation of IGT Toscana in 1992.',
    wines: [
      { n: 'Tignanello', grape: 'Sangiovese with Cabernet Sauvignon and Cabernet Franc', note: 'first made in 1971, the wine that broke the Chianti rulebook' },
      { n: 'Solaia', grape: 'Cabernet Sauvignon with Sangiovese and Cabernet Franc', note: 'first made in 1978, the Cabernet-led sibling from an adjoining parcel' },
      { n: 'Chianti Classico Gran Selezione Badia a Passignano', grape: 'Sangiovese', note: 'the house inside the denomination rather than outside it' },
      { n: 'Guado al Tasso', grape: 'Bordeaux blend', note: 'Antinori\'s Bolgheri Superiore' }
    ],
    traps: [
      'Tignanello and Solaia are IGT Toscana, not DOCG',
      'Tignanello is Sangiovese-led; Solaia is Cabernet-led. Reversing them is the standard error',
      'Antinori is a Florentine merchant house first: many estates, one family'
    ]
  },
  {
    id: 'p-frescobaldi', p: 'Marchesi Frescobaldi',
    country: 'Italy, Tuscany and the South', r: 'Tuscany', sub: 'Chianti Rufina',
    founded: '',
    holdings: 'A Florentine family with estates across Tuscany, including Castello di Nipozzano in Rufina, Castelgiocondo in Montalcino, and ownership of Ornellaia in Bolgheri.',
    style: 'Estate by estate rather than a single house style; the Rufina wines are the cool, structured ones.',
    t: 'Rufina structure: dark cherry, bay leaf and cold iron behind Florentine polish',
    why: 'The Court uses Frescobaldi to connect Rufina, Montalcino and Bolgheri under one ownership, and to trace who now owns Ornellaia.',
    wines: [
      { n: 'Montesodi', grape: 'Sangiovese', note: 'single-vineyard Chianti Rufina, the estate\'s Sangiovese statement' },
      { n: 'Nipozzano Riserva', grape: 'Sangiovese-led blend', note: 'the widely poured Rufina Riserva' },
      { n: 'Luce', grape: 'Sangiovese with Merlot', note: 'begun as a joint venture with Robert Mondavi, now wholly Frescobaldi' },
      { n: 'Castelgiocondo Brunello di Montalcino', grape: 'Sangiovese', note: 'the family\'s Montalcino holding' }
    ],
    traps: [
      'Luce is IGT Toscana and began as a Mondavi partnership',
      'Ornellaia is Frescobaldi-owned; Sassicaia is not'
    ]
  },
  {
    id: 'p-marco-de-bartoli', p: 'Marco De Bartoli',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Marsala',
    founded: '1978',
    holdings: 'The Samperi property in the Marsala countryside plus vineyards on Pantelleria for Zibibbo.',
    style: 'Oxidative and unfortified where possible, solera-aged, deliberately at odds with commercial Marsala.',
    t: 'Walnut, dried apricot and sea salt: Marsala restored to its dry origins',
    why: 'De Bartoli is how the Court teaches Marsala\'s classification and its decline, and Vecchio Samperi is the example of a great wine that deliberately forfeits its appellation.',
    wines: [
      { n: 'Vecchio Samperi', grape: 'Grillo', note: 'unfortified and solera-aged in the Marsala manner, sold without the denomination' },
      { n: 'Marsala Superiore Riserva', grape: 'Grillo', note: 'the estate\'s argument that Marsala can be a serious fortified wine' },
      { n: 'Bukkuram', grape: 'Zibibbo', note: 'Passito di Pantelleria from sun-dried grapes' }
    ],
    traps: [
      'Vecchio Samperi is unfortified, so it cannot legally be called Marsala',
      'Marsala tiers run Fine, Superiore, Superiore Riserva, Vergine and Vergine Stravecchio',
      'Zibibbo is Muscat of Alexandria'
    ]
  },
  {
    id: 'p-marisa-cuomo', p: 'Marisa Cuomo',
    country: 'Italy, Tuscany and the South', r: 'Campania', sub: 'Costa d\'Amalfi DOC',
    founded: '1980',
    holdings: 'Terraces cut into the limestone cliffs above Furore on the Amalfi coast, worked entirely by hand.',
    style: 'White wines of density and salinity from local varieties found nowhere else, partly barrel-fermented.',
    t: 'Candied apricot, dried herb and sea salt from vines hung over the water',
    why: 'Fiorduva is the standard question about Costa d\'Amalfi and about indigenous varieties that survive only because the terrain was too steep to replant.',
    wines: [
      { n: 'Furore Bianco Fiorduva', grape: 'Fenile, Ginestra and Ripoli', note: 'the cliff-grown white built from three varieties unique to the coast' },
      { n: 'Costa d\'Amalfi Furore Rosso', grape: 'Piedirosso with Aglianico', note: 'the red side of the same terraces' }
    ],
    traps: [
      'Fenile, Ginestra and Ripoli are grape names, not vineyard names',
      'Costa d\'Amalfi is a DOC with subzones including Furore, Ravello and Tramonti'
    ]
  },
  {
    id: 'p-masciarelli', p: 'Masciarelli',
    country: 'Italy, Tuscany and the South', r: 'Abruzzo', sub: 'San Martino sulla Marrucina',
    founded: '1981',
    holdings: 'Vineyards across all four Abruzzo provinces, built up by Gianni Masciarelli and continued by Marina Cvetic.',
    style: 'Modernising: tighter spacing, guyot alongside pergola, French oak on the top wines; ripe and polished Montepulciano.',
    t: 'Dense and dark: black plum, liquorice, mocha and soft sweet tannin',
    why: 'The producer who turned Abruzzo from bulk supplier to serious appellation, and the useful stylistic opposite of Valentini and Pepe.',
    wines: [
      { n: 'Villa Gemma Montepulciano d\'Abruzzo Riserva', grape: 'Montepulciano', note: 'the flagship, the wine that argued Montepulciano could be ambitious' },
      { n: 'Marina Cvetic Montepulciano d\'Abruzzo Riserva', grape: 'Montepulciano', note: 'the second serious tier under the family name' },
      { n: 'Trebbiano d\'Abruzzo Marina Cvetic', grape: 'Trebbiano', note: 'barrel-fermented Trebbiano, the modern counterpoint to Valentini' }
    ],
    traps: [
      'Abruzzo\'s DOCGs are Montepulciano d\'Abruzzo Colline Teramane and Tullum; the region-wide DOCs are Montepulciano d\'Abruzzo, Trebbiano d\'Abruzzo, Cerasuolo d\'Abruzzo and Abruzzo',
      'Montepulciano is the grape here; the town is in Tuscany'
    ]
  },
  {
    id: 'p-mastroberardino', p: 'Mastroberardino',
    country: 'Italy, Tuscany and the South', r: 'Campania', sub: 'Taurasi DOCG',
    founded: '',
    holdings: 'An Avellino house that has bottled Irpinian wine for many generations, with vineyards for Taurasi, Fiano di Avellino and Greco di Tufo.',
    style: 'Traditional and firm: Aglianico held in cask and bottle for years before release, whites made for aging rather than for youth.',
    t: 'Taurasi austerity: sour cherry, ash, leather and tannin that needs a decade',
    why: 'Mastroberardino preserved Aglianico, Fiano and Greco when they were almost gone, which is why the family is the fixed answer for Campanian native varieties.',
    wines: [
      { n: 'Taurasi Radici Riserva', grape: 'Aglianico', note: 'the standing reference for Taurasi DOCG' },
      { n: 'Fiano di Avellino Radici', grape: 'Fiano', note: 'the house that saved Fiano from near disappearance' },
      { n: 'Greco di Tufo Novaserra', grape: 'Greco', note: 'the sulphur-soiled Tufo hills in a single bottling' },
      { n: 'Villa dei Misteri', grape: 'Piedirosso with Sciascinoso', note: 'made from vines replanted inside the excavations at Pompeii' }
    ],
    traps: [
      'Taurasi is Campanian Aglianico; Aglianico del Vulture is Basilicata',
      'The family split in 1994 and the other branch became Terredora',
      'Greco di Tufo and Fiano di Avellino are separate DOCGs, not styles of one wine'
    ]
  },
  {
    id: 'p-montenidoli', p: 'Montenidoli',
    country: 'Italy, Tuscany and the South', r: 'San Gimignano', sub: 'Vernaccia di San Gimignano DOCG',
    founded: '1965',
    holdings: 'A high estate in the hills above San Gimignano farmed without chemicals by Elisabetta Fagiuoli since the mid 1960s.',
    style: 'Vernaccia made in several registers, from fresh to skin-contact and oxidative, with texture and bitterness rather than fruit.',
    t: 'Almond skin, lemon pith and salt: Vernaccia with grip rather than perfume',
    why: 'Vernaccia di San Gimignano was Italy\'s first DOC in 1966 and is Tuscany\'s only white DOCG, which makes it a standing question.',
    wines: [
      { n: 'Vernaccia di San Gimignano Carato', grape: 'Vernaccia', note: 'the barrel-aged, ageworthy expression' },
      { n: 'Vernaccia di San Gimignano Tradizionale', grape: 'Vernaccia', note: 'made with skin contact in the old manner' },
      { n: 'Vernaccia di San Gimignano Fiore', grape: 'Vernaccia', note: 'free-run juice, the pure and linear version' }
    ],
    traps: [
      'Vernaccia di San Gimignano is white; the towers and the Chianti hills around it invite the wrong answer',
      'Vernaccia di Oristano in Sardinia is a different grape and a flor-aged style',
      'Vernaccia di Serrapetrona in the Marche is a sparkling red'
    ]
  },
  {
    id: 'p-montevertine', p: 'Montevertine',
    country: 'Italy, Tuscany and the South', r: 'Radda in Chianti', sub: 'Toscana IGT',
    founded: '1967',
    holdings: 'A small high estate above Radda, bought by the steel manufacturer Sergio Manetti and run by his son Martino.',
    style: 'Sangiovese with a little Canaiolo and Colorino, aged in large casks and used barriques; pale, perfumed, cool and firm.',
    t: 'Radda in a glass: sour cherry, rosehip, dried herb and cold stone',
    why: 'Montevertine renounced the Chianti Classico DOCG and sells everything as Toscana IGT. It is the purest case of a great estate rejecting its own appellation.',
    wines: [
      { n: 'Le Pergole Torte', grape: 'Sangiovese', note: 'first made in 1977, the first of the pure-Sangiovese cru bottlings that left the DOCG' },
      { n: 'Montevertine', grape: 'Sangiovese with Canaiolo and Colorino', note: 'the estate wine, the traditional Radda blend without white grapes' },
      { n: 'Pian del Ciampolo', grape: 'Sangiovese with Canaiolo and Colorino', note: 'the young-vine wine, the house style in miniature' }
    ],
    traps: [
      'Montevertine labels no wine as Chianti Classico, by choice',
      'Le Pergole Torte is 100 percent Sangiovese: its fame is not about Cabernet',
      'Radda sits high and cool, which is why the wines read lighter than Castelnuovo Berardenga'
    ]
  },
  {
    id: 'p-montevetrano', p: 'Montevetrano',
    country: 'Italy, Tuscany and the South', r: 'Campania', sub: 'Colli di Salerno IGT',
    founded: '',
    holdings: 'A small property near Salerno begun by the photographer Silvia Imparato, with the first vintage in 1991.',
    style: 'Cabernet Sauvignon and Merlot lifted by a share of Aglianico; polished, dark, made with consultant precision.',
    t: 'Cassis and graphite with an Aglianico shadow of ash and sour cherry',
    why: 'The southern answer to the Super Tuscan idea: a garage-scale IGT that outranked the region\'s DOCGs in price and attention.',
    wines: [
      { n: 'Montevetrano', grape: 'Cabernet Sauvignon, Merlot and Aglianico', note: 'the wine that showed international varieties could work in Campania' },
      { n: 'Core', grape: 'Aglianico', note: 'the estate\'s varietal Aglianico' }
    ],
    traps: [
      'Montevetrano is IGT, not a Campanian DOCG',
      'Its Aglianico share is a seasoning, not the base'
    ]
  },
  {
    id: 'p-paolo-bea', p: 'Paolo Bea',
    country: 'Italy, Tuscany and the South', r: 'Umbria', sub: 'Montefalco',
    founded: '',
    holdings: 'A small family farm at Montefalco growing Sagrantino and Sangiovese alongside cereals and olives.',
    style: 'Very long macerations, no filtration, no added yeast, late release; wines that are tannic, savoury and often cloudy.',
    t: 'Wild and tannic: dried plum, balsamic herb, iron filings and orchard dust',
    why: 'Bea is the natural-wine reference point in central Italy and the standard example of Trebbiano Spoletino and alberata tree-trained vines.',
    wines: [
      { n: 'Montefalco Sagrantino Pagliaro', grape: 'Sagrantino', note: 'the estate\'s single-vineyard Sagrantino' },
      { n: 'Rosso de Véo', grape: 'Sagrantino', note: 'the estate\'s IGT red' },
      { n: 'Arboreus', grape: 'Trebbiano Spoletino', note: 'skin-contact white from vines trained up trees, a revived Umbrian tradition' }
    ],
    traps: [
      'Trebbiano Spoletino is not Trebbiano Toscano',
      'Some Bea bottlings appear as IGT rather than DOCG'
    ]
  },
  {
    id: 'p-passopisciaro', p: 'Passopisciaro',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Etna, north slope',
    founded: '2000',
    holdings: 'Old alberello vines on the north slope at Castiglione di Sicilia, bottled by contrada under single-letter labels.',
    style: 'Pure Nerello Mascalese fermented without new oak dominance, each contrada bottled separately to show altitude and lava flow.',
    t: 'Pale, dusty, high-toned: wild strawberry, ash, orange peel and rock salt',
    why: 'Andrea Franchetti made the contrada bottlings the way the world learned to read Etna, and his estate also links Etna to Tenuta di Trinoro in Tuscany.',
    wines: [
      { n: 'Contrada G (Guardiola)', grape: 'Nerello Mascalese', note: 'the highest of the contrada bottlings' },
      { n: 'Contrada C (Chiappemacine)', grape: 'Nerello Mascalese', note: 'lower and warmer, the contrast wine' },
      { n: 'Franchetti', grape: 'Petit Verdot with Cesanese d\'Affile', note: 'the founder\'s own blend, entirely outside the Etna idiom' }
    ],
    traps: [
      'Many Passopisciaro wines are Terre Siciliane IGT rather than Etna DOC',
      'Contrade are administrative districts adopted as vineyard names, not a ranked cru classification',
      'Franchetti the wine is not Nerello at all'
    ]
  },
  {
    id: 'p-paternoster', p: 'Paternoster',
    country: 'Italy, Tuscany and the South', r: 'Basilicata', sub: 'Aglianico del Vulture',
    founded: '1925',
    holdings: 'A historic house at Barile on the Vulture slopes, with cellars cut into volcanic tuff.',
    style: 'Traditional Vulture Aglianico, dark and tannic with high acidity, aged long before release.',
    t: 'Tar, smoke and sour black cherry with tannin sharpened by volcanic acid',
    why: 'The historic reference for Aglianico del Vulture, used to establish the zone before the newer single-vineyard names.',
    wines: [
      { n: 'Don Anselmo', grape: 'Aglianico', note: 'the estate\'s classic long-aged Aglianico del Vulture' },
      { n: 'Rotondo', grape: 'Aglianico', note: 'the single-vineyard, more modern bottling' }
    ],
    traps: [
      'Barile\'s tuff cellars are a Vulture landmark, not a Campanian one',
      'Aglianico ripens very late, often into November, which is why it keeps acidity in a hot region'
    ]
  },
  {
    id: 'p-poggio-di-sotto', p: 'Poggio di Sotto',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Castelnuovo dell\'Abate',
    founded: '1989',
    holdings: 'Slopes above Castelnuovo dell\'Abate in the warmer south east of the zone, looking toward Monte Amiata; part of the ColleMassari group since 2011.',
    style: 'Traditional: long maceration, extended aging in large old casks, late release; perfumed rather than dense.',
    t: 'Dried cherry, blood orange, wild herb and warm stone from the Amiata side',
    why: 'The reference for the south eastern sector of Montalcino and for the argument that Rosso di Montalcino can be a serious wine rather than a declassification.',
    wines: [
      { n: 'Brunello di Montalcino', grape: 'Sangiovese', note: 'the modern benchmark for traditional southern Montalcino' },
      { n: 'Brunello di Montalcino Riserva', grape: 'Sangiovese', note: 'made only in vintages the estate judges worth it' },
      { n: 'Rosso di Montalcino', grape: 'Sangiovese', note: 'held far longer than the denomination requires, which is the house signature' }
    ],
    traps: [
      'Montalcino is not one climate: the south east near Castelnuovo dell\'Abate ripens earlier than the cooler north',
      'Rosso di Montalcino has a shorter aging minimum, not a lesser vineyard requirement'
    ]
  },
  {
    id: 'p-poliziano', p: 'Poliziano',
    country: 'Italy, Tuscany and the South', r: 'Montepulciano', sub: 'Vino Nobile di Montepulciano DOCG',
    founded: '1961',
    holdings: 'Vineyards around Montepulciano including the Asinone site, plus a holding in the Maremma.',
    style: 'Modern Vino Nobile: ripe fruit, careful French oak, a firm Sangiovese frame underneath.',
    t: 'Ripe cherry and sweet tobacco over the dusty tannin of Montepulciano\'s clay',
    why: 'The producer most often cited when the Court asks who made Vino Nobile matter again, and the cleanest way to test the Montepulciano town against grape trap.',
    wines: [
      { n: 'Vino Nobile di Montepulciano Asinone', grape: 'Prugnolo Gentile', note: 'the single-vineyard wine that lifted the denomination\'s reputation' },
      { n: 'Vino Nobile di Montepulciano', grape: 'Prugnolo Gentile', note: 'the estate\'s classic bottling' },
      { n: 'Rosso di Montepulciano', grape: 'Prugnolo Gentile', note: 'the younger tier of the same zone' }
    ],
    traps: [
      'Prugnolo Gentile is a local name for Sangiovese',
      'Rosso di Montepulciano is the junior tier, parallel to Rosso di Montalcino'
    ]
  },
  {
    id: 'p-querciabella', p: 'Querciabella',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Greve in Chianti',
    founded: '1974',
    holdings: 'Vineyards at Greve and Radda plus holdings in the Maremma, farmed biodynamically with no animal inputs at all.',
    style: 'Precise and modern; the whites see barrel, the reds are polished but not heavy.',
    t: 'Clean-lined and taut: red plum, fennel seed, fine dusty tannin',
    why: 'The usual answer when the examiner wants a certified biodynamic estate in Chianti Classico, and a reminder that the denomination is red only.',
    wines: [
      { n: 'Camartina', grape: 'Cabernet Sauvignon with Sangiovese', note: 'the estate\'s long-standing Super Tuscan' },
      { n: 'Batàr', grape: 'Chardonnay with Pinot Bianco', note: 'a rare serious white in a red denomination' },
      { n: 'Chianti Classico', grape: 'Sangiovese', note: 'widely used as the benchmark for biodynamic Chianti Classico' }
    ],
    traps: [
      'Batar is IGT: Chianti Classico DOCG is red wine only',
      'Vegan viticulture here means no animal preparations, which goes beyond standard biodynamics'
    ]
  },
  {
    id: 'p-quintodecimo', p: 'Quintodecimo',
    country: 'Italy, Tuscany and the South', r: 'Campania', sub: 'Irpinia',
    founded: '2001',
    holdings: 'A small estate at Mirabella Eclano founded by the oenology professor Luigi Moio, with separately farmed parcels for each wine.',
    style: 'Technically exacting and oak-framed but built on Irpinia\'s acidity; whites as serious as the reds.',
    t: 'Polished Irpinia: smoke, dark cherry and volcanic ash under a cool acid line',
    why: 'Luigi Moio is one of the most cited academic voices in Italian oenology, which makes the estate a convenient hook for Taurasi\'s modern quality tier.',
    wines: [
      { n: 'Taurasi Vigna Grande Cerzito', grape: 'Aglianico', note: 'the estate\'s top Taurasi' },
      { n: 'Exultet', grape: 'Fiano', note: 'barrel-fermented Fiano di Avellino, the argument for Fiano\'s ageability' },
      { n: 'Giallo d\'Arles', grape: 'Greco', note: 'Greco di Tufo treated with the same ambition' }
    ],
    traps: [
      'Taurasi requires a minimum share of Aglianico and long aging, with a longer Riserva minimum',
      'Irpinia DOC is the catch-all beneath the three DOCGs'
    ]
  },
  {
    id: 'p-rivera', p: 'Rivera',
    country: 'Italy, Tuscany and the South', r: 'Puglia', sub: 'Castel del Monte',
    founded: '1950',
    holdings: 'Vineyards on the higher inland plateau around Castel del Monte in northern Puglia, run by the De Corato family.',
    style: 'Cooler and more structured than Salento: Nero di Troia given long aging, with firm tannin and red fruit.',
    t: 'Red cherry, dried herb and stony tannin from Puglia\'s cooler high ground',
    why: 'Castel del Monte carries Puglia\'s DOCGs and Nero di Troia is the variety examiners use to prove the region is not only Primitivo and Negroamaro.',
    wines: [
      { n: 'Il Falcone Riserva', grape: 'Nero di Troia with Montepulciano', note: 'the historic Castel del Monte Riserva' },
      { n: 'Puer Apuliae', grape: 'Nero di Troia', note: 'varietal Nero di Troia from the DOCG tier' }
    ],
    traps: [
      'Nero di Troia is also called Uva di Troia',
      'Castel del Monte has DOCG tiers for Nero di Troia Riserva, Bombino Nero rosato and Rosso Riserva',
      'Bombino Nero and Bombino Bianco are unrelated despite the name'
    ]
  },
  {
    id: 'p-salvioni', p: 'Salvioni (La Cerbaiola)',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Brunello di Montalcino',
    founded: '',
    holdings: 'A few hectares at La Cerbaiola close to Montalcino town, farmed by the Salvioni family.',
    style: 'Traditional, large cask, tiny production; concentrated but lifted, released with no fanfare.',
    t: 'Compact and mineral: sour cherry, iron, crushed stone from the town\'s own slope',
    why: 'Cited for the micro-estate model in Montalcino and for the vineyards immediately around the town, which sit higher and cooler than the south.',
    wines: [
      { n: 'Brunello di Montalcino', grape: 'Sangiovese', note: 'one bottling in most years, which is the point of the estate' },
      { n: 'Rosso di Montalcino', grape: 'Sangiovese', note: 'the declassified cuvee when the vintage requires it' }
    ],
    traps: [
      'La Cerbaiola (Salvioni) is not Cerbaiona (the separate estate east of town)'
    ]
  },
  {
    id: 'p-soldera', p: 'Soldera (Case Basse)',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Toscana IGT',
    founded: '1972',
    holdings: 'Case Basse, a small west-facing property Gianfranco Soldera planted from scratch after 1972, farmed with a botanical garden between the rows.',
    style: 'Extremely low yields, long cask aging in large Slavonian oak, no temperature control and no new wood; pale colour hiding enormous aromatic reach.',
    t: 'Pale garnet, dried rose, orange peel, forest floor: Sangiovese at its most transparent',
    why: 'Soldera is the standing example that a wine can be the most sought-after in its zone and carry no DOCG at all. The estate withdrew from the consorzio and now labels Toscana IGT.',
    wines: [
      { n: 'Case Basse Sangiovese', grape: 'Sangiovese', note: 'labelled Toscana IGT since the estate left the Brunello consorzio, not Brunello' },
      { n: 'Case Basse Riserva (older vintages)', grape: 'Sangiovese', note: 'the historic Brunello Riserva bottlings that made the name' }
    ],
    traps: [
      'Current releases are Toscana IGT, not Brunello di Montalcino',
      'The 2012 cellar vandalism destroyed vintages in cask, which is why certain years are missing'
    ]
  },
  {
    id: 'p-tasca-d-almerita', p: 'Tasca d\'Almerita',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Contea di Sclafani',
    founded: '1830',
    holdings: 'The Regaleali estate in the high inland hills of central Sicily, plus properties on Etna, Salina and Mozia.',
    style: 'Inland and high rather than coastal: fresher, firmer wines than Sicily\'s reputation suggests.',
    t: 'Cool inland Sicily: red plum, dried herb and a dusty limestone finish',
    why: 'Regaleali is the long-standing evidence that inland altitude, not the coast, gives Sicily\'s most structured traditional wines.',
    wines: [
      { n: 'Rosso del Conte', grape: 'Nero d\'Avola-led', note: 'the historic inland Sicilian red, first made in the 1970s' },
      { n: 'Nozze d\'Oro', grape: 'Inzolia with a local Sauvignon selection', note: 'the estate\'s signature white' },
      { n: 'Tascante', grape: 'Nerello Mascalese', note: 'the family\'s Etna range' }
    ],
    traps: [
      'Regaleali is the estate name; Tasca d\'Almerita is the family',
      'Inzolia is the same grape as Ansonica in Tuscany'
    ]
  },
  {
    id: 'p-ornellaia', p: 'Tenuta dell\'Ornellaia',
    country: 'Italy, Tuscany and the South', r: 'Bolgheri', sub: 'Bolgheri Superiore DOC',
    founded: '1981',
    holdings: 'An estate founded by Lodovico Antinori on the Bolgheri plain and lower slopes, now owned by Frescobaldi; the Masseto clay hill was originally part of it.',
    style: 'Bordeaux blend led by Cabernet Sauvignon with Merlot, Cabernet Franc and Petit Verdot; ripe, polished, generous.',
    t: 'Ripe cassis, plum and sweet spice with Bolgheri\'s warm herbal edge',
    why: 'Ornellaia is the second pillar of Bolgheri after Sassicaia and the case study in how a founder\'s estate can pass to a rival family and keep its identity.',
    wines: [
      { n: 'Ornellaia', grape: 'Cabernet Sauvignon with Merlot, Cabernet Franc and Petit Verdot', note: 'Bolgheri Superiore, first vintage 1985' },
      { n: 'Le Serre Nuove', grape: 'Bordeaux blend', note: 'the second wine' },
      { n: 'Ornellaia Bianco', grape: 'Sauvignon Blanc', note: 'a rare white from the estate' }
    ],
    traps: [
      'Ornellaia is Bolgheri Superiore DOC, not IGT',
      'Lodovico Antinori founded it; his brother Piero ran Marchesi Antinori',
      'Masseto is now run as a separate estate, not a bottling of Ornellaia'
    ]
  },
  {
    id: 'p-terre-nere', p: 'Tenuta delle Terre Nere',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Etna, north slope',
    founded: '2002',
    holdings: 'Holdings across several north slope contrade at Randazzo, including a parcel of ungrafted pre-phylloxera vines.',
    style: 'Burgundian in intent: separate contrada bottlings, restrained extraction, used oak, transparency over power.',
    t: 'Rosehip, sour cherry and black volcanic sand: Etna read cru by cru',
    why: 'Marc de Grazia\'s contrada range is the teaching set for Etna, and the ungrafted vines explain why volcanic sand resists phylloxera.',
    wines: [
      { n: 'Calderara Sottana', grape: 'Nerello Mascalese', note: 'the estate\'s most cited contrada' },
      { n: 'Prephylloxera La Vigna di Don Peppino', grape: 'Nerello Mascalese', note: 'from ungrafted vines on volcanic sand, Etna\'s rarest bottling' },
      { n: 'Guardiola', grape: 'Nerello Mascalese', note: 'the highest and most tensile site in the range' }
    ],
    traps: [
      'Phylloxera cannot establish in loose volcanic sand, which is why ungrafted vines survive on Etna and at Santorini',
      'Contrada names on labels are permitted geographic mentions, not a legal hierarchy'
    ]
  },
  {
    id: 'p-capezzana', p: 'Tenuta di Capezzana',
    country: 'Italy, Tuscany and the South', r: 'Carmignano', sub: 'Carmignano DOCG',
    founded: '',
    holdings: 'A historic estate west of Florence held by the Contini Bonacossi family, at the centre of the tiny Carmignano zone.',
    style: 'Sangiovese with Cabernet Sauvignon in the traditional Carmignano proportion, plus a serious Vin Santo programme.',
    t: 'Sangiovese with a Medici accent: red cherry, cedar, iris and dry earth',
    why: 'Carmignano was delimited by Cosimo III in 1716 and at DOC in 1975 became the first Italian appellation to require Cabernet in the blend. That precedent undercuts the idea that Super Tuscans invented Cabernet in Tuscany.',
    wines: [
      { n: 'Villa di Capezzana', grape: 'Sangiovese with Cabernet Sauvignon', note: 'the classic Carmignano, Cabernet by law rather than by fashion' },
      { n: 'Ghiaie della Furba', grape: 'Cabernet Sauvignon with Merlot and Syrah', note: 'the estate\'s IGT, outside the Carmignano rules' },
      { n: 'Vin Santo di Carmignano Riserva', grape: 'Trebbiano and San Colombano', note: 'long caratelli aging, one of Tuscany\'s reference Vin Santos' }
    ],
    traps: [
      'Carmignano required Cabernet decades before the Super Tuscans, and by law',
      'Cosimo III\'s 1716 edict delimited geography, not grape varieties',
      'Carmignano reached DOCG in 1990'
    ]
  },
  {
    id: 'p-guado-al-tasso', p: 'Tenuta Guado al Tasso',
    country: 'Italy, Tuscany and the South', r: 'Bolgheri', sub: 'Bolgheri Superiore DOC',
    founded: '',
    holdings: 'Antinori\'s large Bolgheri property on the flat amphitheatre floor north of the village.',
    style: 'Warm, ripe and immediately generous; the estate also makes a widely sold Bolgheri Rosso.',
    t: 'Warm cassis, black olive and sea air from the Bolgheri floor',
    why: 'Completes the Bolgheri roll call and demonstrates the DOC\'s tiers of Bolgheri Rosso and Bolgheri Superiore, with Bolgheri Sassicaia standing apart as its own denomination',
    wines: [
      { n: 'Guado al Tasso', grape: 'Cabernet Sauvignon with Merlot and Cabernet Franc', note: 'Antinori\'s Bolgheri Superiore flagship' },
      { n: 'Il Bruciato', grape: 'Cabernet Sauvignon with Merlot and Syrah', note: 'the volume Bolgheri Rosso that taught the world the appellation name' },
      { n: 'Vermentino Bolgheri', grape: 'Vermentino', note: 'the white side of the DOC' }
    ],
    traps: [
      'Bolgheri Superiore requires longer aging than Bolgheri Rosso',
      'Guado al Tasso is an Antinori estate, separate from the Chianti Classico properties'
    ]
  },
  {
    id: 'p-il-poggione', p: 'Tenuta Il Poggione',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Sant\'Angelo in Colle',
    founded: '',
    holdings: 'One of the largest single holdings in the warm southern sector around Sant\'Angelo in Colle, in the Franceschi family since the late 1800s.',
    style: 'Ripe and generous southern Montalcino fruit handled traditionally in large casks; consistent rather than showy.',
    t: 'Sun-warmed plum and cherry over sweet tobacco: the southern face of Montalcino',
    why: 'The dependable answer for Sant\'Angelo in Colle and for how altitude and exposure change Brunello within a single small zone.',
    wines: [
      { n: 'Brunello di Montalcino', grape: 'Sangiovese', note: 'the classic benchmark for the southern, warmer expression' },
      { n: 'Brunello di Montalcino Riserva Vigna Paganelli', grape: 'Sangiovese', note: 'from an old planting, the estate\'s Riserva' },
      { n: 'Rosso di Montalcino', grape: 'Sangiovese', note: 'widely used as the teaching example of Rosso as a real wine' }
    ],
    traps: [
      'Sant\'Angelo in Colle is a hamlet within Montalcino, not a separate denomination',
      'Il Poggione and Poggio Antico are different estates'
    ]
  },
  {
    id: 'p-tenuta-san-guido', p: 'Tenuta San Guido',
    country: 'Italy, Tuscany and the South', r: 'Bolgheri', sub: 'Bolgheri Sassicaia DOC',
    founded: '',
    holdings: 'The Incisa della Rocchetta estate at Castiglioncello di Bolgheri, where Cabernet was planted in the 1940s on stony inland slopes above the coastal plain.',
    style: 'Cabernet Sauvignon with Cabernet Franc, restrained and mediterranean rather than opulent; cedar and herb over fruit.',
    t: 'Cassis, cedar and Mediterranean scrub: Italy\'s first Cabernet icon',
    why: 'Sassicaia is the whole Super Tuscan arc in one name: private experiment, then table wine, then IGT, then in 1994 its own denomination inside Bolgheri.',
    wines: [
      { n: 'Sassicaia', grape: 'Cabernet Sauvignon with Cabernet Franc', note: 'Italy\'s first great Cabernet and the only wine with its own single-estate DOC' },
      { n: 'Guidalberto', grape: 'Cabernet Sauvignon with Merlot', note: 'the second wine, released from the 2000s' },
      { n: 'Le Difese', grape: 'Cabernet Sauvignon with Sangiovese', note: 'the entry wine, useful for showing the house hand' }
    ],
    traps: [
      'Bolgheri Sassicaia is the only Italian DOC belonging to a single estate',
      'The first commercial vintage was 1968; earlier vintages were made for the family',
      'Mario Incisa della Rocchetta was the founder; Giacomo Tachis the oenologist shared with Antinori'
    ]
  },
  {
    id: 'p-valentini', p: 'Valentini',
    country: 'Italy, Tuscany and the South', r: 'Abruzzo', sub: 'Loreto Aprutino',
    founded: '',
    holdings: 'A long-held family estate at Loreto Aprutino in the hills of Pescara; most of the crop is sold off and only selected lots are bottled.',
    style: 'Old cask aging, minimal intervention, deliberate secrecy about method; wines of unusual longevity in every colour.',
    t: 'The impossible Trebbiano: smoke, orchard fruit, decades of life',
    why: 'Valentini is proof that appellation reputation and wine quality are separate questions, and the estate anchors all three Abruzzo styles at once.',
    wines: [
      { n: 'Trebbiano d\'Abruzzo', grape: 'Trebbiano', note: 'the most improbable great white in Italy, from a grape with no reputation' },
      { n: 'Montepulciano d\'Abruzzo', grape: 'Montepulciano', note: 'structured and long-lived, the antithesis of the cheap version of the name' },
      { n: 'Cerasuolo d\'Abruzzo', grape: 'Montepulciano', note: 'the region\'s rosato, given the same serious treatment' }
    ],
    traps: [
      'Cerasuolo d\'Abruzzo is a rosato from Montepulciano; Cerasuolo di Vittoria is a Sicilian red DOCG',
      'Montepulciano d\'Abruzzo is the grape, not the Tuscan town',
      'Not every vintage is released'
    ]
  },
  {
    id: 'w-ben-rye', p: 'Ben Ryé Passito di Pantelleria',
    by: 'p-donnafugata',
    country: 'Italy, Tuscany and the South', r: 'Sicily', sub: 'Passito di Pantelleria DOC',
    founded: '',
    holdings: 'Bush-trained Zibibbo grown in hollows dug against the wind on the volcanic island of Pantelleria, closer to Tunisia than to Sicily.',
    style: 'Grapes sun-dried on racks and added to the fermenting must, giving an intense raisined sweetness kept fresh by salt and acid.',
    t: 'Dried apricot, fig, honey and saffron with sea salt cutting the sweetness',
    why: 'The fixed question for Italian island sweet wines, and the hook for Pantelleria\'s low bush training, which is recognised as a cultural practice.',
    wines: [
      { n: 'Ben Ryé', grape: 'Zibibbo', note: 'the reference Passito di Pantelleria in the export market' }
    ],
    traps: [
      'Zibibbo is Muscat of Alexandria, not Muscat Blanc',
      'Passito di Pantelleria and Moscato di Pantelleria are different styles of the same grape',
      'Pantelleria is administratively Sicilian but sits off the Tunisian coast'
    ]
  },
  {
    id: 'w-brunello-riserva-biondi-santi', p: 'Brunello di Montalcino Riserva, Biondi-Santi',
    by: 'p-biondi-santi',
    country: 'Italy, Tuscany and the South', r: 'Montalcino', sub: 'Brunello di Montalcino DOCG',
    founded: '',
    holdings: 'Drawn only from the oldest parcels of the Greppo estate, and declared only in vintages the family judges worthy.',
    style: 'Aged in large old Slavonian casks with no new oak; pale, austere, acid-driven, released with a long life ahead.',
    t: 'High-toned cherry, dried rose, tea leaf and iron on a spine of pure acid',
    why: 'This is the bottle behind the denomination itself. Brunello\'s minimum five years of aging, six for Riserva, descends from what this house was already doing.',
    wines: [
      { n: 'Brunello di Montalcino Riserva', grape: 'Sangiovese Grosso', note: 'the original Brunello, and the wine that set the 100 percent Sangiovese rule' }
    ],
    traps: [
      'Brunello must be 100 percent Sangiovese, which the consorzio reaffirmed by vote in 2009 after the Brunellopoli blending investigation',
      'Riserva means older vines here, not simply extra cask time',
      'Jacopo Biondi Santi\'s Castello di Montepo wines are a separate operation'
    ]
  },
  {
    id: 'w-cepparello', p: 'Cepparello',
    by: 'p-isole-e-olena',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Toscana IGT',
    founded: '',
    holdings: 'Selected Sangiovese parcels at the Isole e Olena estate in the western hills of Chianti Classico.',
    style: 'Pure Sangiovese in French oak, made for clarity and perfume rather than weight.',
    t: 'Red cherry, violet and dried herb, drawn fine and long rather than broad',
    why: 'The third of the founding pure-Sangiovese IGTs, and the one most often used to show Paolo De Marchi\'s influence on modern Chianti Classico.',
    wines: [
      { n: 'Cepparello', grape: 'Sangiovese', note: 'first made in 1980, one of the earliest varietal Sangiovese bottlings outside the DOCG' }
    ],
    traps: [
      'Cepparello is a proprietary wine name, not a vineyard or a village',
      '100 percent Sangiovese, like Flaccianello and Pergole Torte'
    ]
  },
  {
    id: 'w-flaccianello', p: 'Flaccianello della Pieve',
    by: 'p-fontodi',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Toscana IGT',
    founded: '',
    holdings: 'Selected parcels in the Conca d\'Oro amphitheatre at Panzano, farmed organically by the Manetti family.',
    style: 'Pure Sangiovese matured in French barriques; riper and darker than Pergole Torte, still firmly structured.',
    t: 'Black cherry, iris, espresso and warm Panzano earth over polished tannin',
    why: 'With Pergole Torte and Cepparello it forms the trio of pure Sangiovese IGTs the Court uses to show the Super Tuscan category has two branches.',
    wines: [
      { n: 'Flaccianello della Pieve', grape: 'Sangiovese', note: 'first made in 1981, the Panzano standard for varietal Sangiovese' }
    ],
    traps: [
      'Flaccianello is 100 percent Sangiovese',
      'It is IGT despite coming from the heart of Chianti Classico'
    ]
  },
  {
    id: 'w-le-pergole-torte', p: 'Le Pergole Torte',
    by: 'p-montevertine',
    country: 'Italy, Tuscany and the South', r: 'Radda in Chianti', sub: 'Toscana IGT',
    founded: '',
    holdings: 'A single high vineyard at Montevertine above Radda, at the cool northern heart of the Chianti Classico zone.',
    style: 'Pure Sangiovese with no other variety, aged in large casks and used barriques; pale, floral, taut.',
    t: 'Rosehip, sour cherry and cold stone: Sangiovese with nothing added and nothing hidden',
    why: 'The rebuttal to the idea that the Super Tuscan movement was about Bordeaux grapes. Pergole Torte left the DOCG in order to be purer, not more international.',
    wines: [
      { n: 'Le Pergole Torte', grape: 'Sangiovese', note: 'first made in 1977, the first single-vineyard 100 percent Sangiovese of the modern era' }
    ],
    traps: [
      '100 percent Sangiovese, no Cabernet at all',
      'Toscana IGT by the estate\'s choice, since Montevertine bottles nothing as Chianti Classico',
      'Radda is high and cool, so the wine is paler and tighter than southern Chianti Classico'
    ]
  },
  {
    id: 'w-masseto', p: 'Masseto',
    by: 'p-ornellaia',
    country: 'Italy, Tuscany and the South', r: 'Bolgheri', sub: 'Toscana IGT',
    founded: '',
    holdings: 'A single hill of blue clay within the original Ornellaia property, now run as a separate estate with its own cellar.',
    style: 'Pure Merlot from clay, aged in French oak; opulent and deep but with a firm structural line.',
    t: 'Blue clay Merlot: plum velvet, truffle, violet and endless mid-palate',
    why: 'Masseto is the Italian answer to Pétrus and the proof that soil, not variety, drove the Bolgheri revolution.',
    wines: [
      { n: 'Masseto', grape: 'Merlot', note: 'pure Merlot from the blue clay hill, first vintage 1986' }
    ],
    traps: [
      'Masseto is Toscana IGT, not Bolgheri DOC',
      'It is 100 percent Merlot, unlike Ornellaia',
      'Masseto is now a separate winery from Ornellaia under the same ownership'
    ]
  },
  {
    id: 'w-ornellaia-wine', p: 'Ornellaia',
    by: 'p-ornellaia',
    country: 'Italy, Tuscany and the South', r: 'Bolgheri', sub: 'Bolgheri Superiore DOC',
    founded: '',
    holdings: 'The Ornellaia estate vineyards on the Bolgheri plain and lower slopes, founded by Lodovico Antinori and now owned by Frescobaldi.',
    style: 'A full Bordeaux blend, Cabernet Sauvignon led, with Merlot, Cabernet Franc and Petit Verdot; ripe, dense, polished.',
    t: 'Ripe cassis, plum and graphite with sweet spice and warm coastal herb',
    why: 'The wine that proved Bolgheri was a region and not one estate, and the standard comparison against Sassicaia for blend composition.',
    wines: [
      { n: 'Ornellaia', grape: 'Cabernet Sauvignon, Merlot, Cabernet Franc and Petit Verdot', note: 'first vintage 1985, the completed Bordeaux blend of Bolgheri' }
    ],
    traps: [
      'Ornellaia is Bolgheri Superiore DOC, while Sassicaia has its own DOC',
      'Ornellaia carries Merlot and Petit Verdot; Sassicaia is Cabernet Sauvignon with Cabernet Franc and nothing else'
    ]
  },
  {
    id: 'w-sassicaia', p: 'Sassicaia',
    by: 'p-tenuta-san-guido',
    country: 'Italy, Tuscany and the South', r: 'Bolgheri', sub: 'Bolgheri Sassicaia DOC',
    founded: '',
    holdings: 'Stony vineyards at Castiglioncello di Bolgheri planted to Cabernet from the 1940s by Mario Incisa della Rocchetta, who took Bordeaux as the model.',
    style: 'Cabernet Sauvignon with Cabernet Franc, aged in French barriques; restrained, aromatic, never heavy.',
    t: 'Cassis, cedar, tobacco leaf and Mediterranean scrub over fine gravelly tannin',
    why: 'Sassicaia is the whole Super Tuscan legal story: a private wine, then a table wine because the law had no category, then IGT, then its own denomination in 1994.',
    wines: [
      { n: 'Sassicaia', grape: 'Cabernet Sauvignon with Cabernet Franc', note: 'the only Italian wine with a DOC of its own estate' }
    ],
    traps: [
      'The first commercial vintage was 1968, released in the early 1970s',
      'Bolgheri Sassicaia is a single-estate DOC, unique in Italy',
      'It is not owned by Antinori, though the families are related and Giacomo Tachis advised both'
    ]
  },
  {
    id: 'w-solaia', p: 'Solaia',
    by: 'p-marchesi-antinori',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Toscana IGT',
    founded: '',
    holdings: 'A vineyard adjoining Tignanello at the Santa Cristina estate, on higher and stonier ground.',
    style: 'Cabernet Sauvignon led with Cabernet Franc and a minority of Sangiovese; dense, structured, cedar-scented.',
    t: 'Cassis, graphite and bay over a Sangiovese sourness that keeps it Tuscan',
    why: 'Solaia completes the Antinori pair and is the question that separates candidates who know which of the two is Cabernet-dominant.',
    wines: [
      { n: 'Solaia', grape: 'Cabernet Sauvignon with Sangiovese and Cabernet Franc', note: 'first made in 1978, the Cabernet-led counterpart to Tignanello' }
    ],
    traps: [
      'Solaia is Cabernet-dominant; reversing it with Tignanello is the classic error',
      'Not produced in every vintage in the early years'
    ]
  },
  {
    id: 'w-tignanello', p: 'Tignanello',
    by: 'p-marchesi-antinori',
    country: 'Italy, Tuscany and the South', r: 'Chianti Classico', sub: 'Toscana IGT',
    founded: '',
    holdings: 'The Tignanello vineyard at the Santa Cristina estate between Florence and Siena, inside the Chianti Classico zone.',
    style: 'Sangiovese with Cabernet Sauvignon and Cabernet Franc, matured in French barriques rather than large chestnut or Slavonian casks.',
    t: 'Sour cherry and iris pulled tight by cassis, cedar and fine barrique grain',
    why: 'Tignanello is the founding Super Tuscan argument: it rejected the obligatory white grapes and the old aging rules, and accepted the lowest legal category to do it.',
    wines: [
      { n: 'Tignanello', grape: 'Sangiovese with Cabernet Sauvignon and Cabernet Franc', note: 'first made in 1971, the wine that abandoned the Chianti recipe' }
    ],
    traps: [
      'Tignanello is Sangiovese-led; Solaia is Cabernet-led',
      'It sits inside the Chianti Classico zone but is labelled Toscana IGT',
      'The category IGT did not exist in 1971; early vintages were sold as vino da tavola'
    ]
  },
  {
    id: 'w-trebbiano-valentini', p: 'Trebbiano d\'Abruzzo, Valentini',
    by: 'p-valentini',
    country: 'Italy, Tuscany and the South', r: 'Abruzzo', sub: 'Trebbiano d\'Abruzzo DOC',
    founded: '',
    holdings: 'Hillside vineyards at Loreto Aprutino, from which only a small selection of the crop is ever bottled under the family name.',
    style: 'Aged in old large wood, released late, with a texture and longevity no other Trebbiano approaches.',
    t: 'Smoke, yellow apple, hay and salted lemon, still alive after decades',
    why: 'Used to make the point that a humble denomination can contain a great wine, and that variety reputation is not a reliable guide.',
    wines: [
      { n: 'Trebbiano d\'Abruzzo', grape: 'Trebbiano', note: 'the one wine that forces examiners to take Trebbiano seriously' }
    ],
    traps: [
      'Trebbiano d\'Abruzzo is a DOC, not a DOCG',
      'Not every vintage is released',
      'The Abruzzo Trebbiano question is a grape identity question, not only a producer question'
    ]
  },
  {
    id: 'p-alvaro-castro', p: 'Álvaro Castro (Quinta da Pellada and Quinta de Saes)',
    country: 'Spain and Portugal', r: 'Dão', sub: '',
    founded: '',
    holdings: 'Two neighbouring granite estates in the Dão, Quinta da Pellada and Quinta de Saes, with old mixed plantings.',
    style: 'Restrained and fine-boned: moderate alcohol, firm acid, red fruit and pine, with Encruzado as the white.',
    t: 'Pine needle, red plum and granite grit: Dão arguing for elegance over weight',
    why: 'The name most used to teach Dão: granite soils, mountain shelter, altitude and Encruzado. Pape and Doda are the Niepoort collaborations.',
    wines: [
      { n: 'Quinta da Pellada Carrocel', grape: 'Touriga Nacional from old vines', note: 'the estate\'s old-vine flagship red' },
      { n: 'Quinta de Saes Encruzado', grape: 'Encruzado', note: 'Dão\'s noble white, the grape the exam expects you to place' },
      { n: 'Pape', grape: 'Dão field blend', note: 'a collaboration with Dirk Niepoort' }
    ],
    traps: [
      'Encruzado belongs to Dão, not to Bairrada',
      'Jaen is Mencía under its Dão name',
      'Dão is sheltered by mountains, which is why it is cooler than its latitude suggests'
    ]
  },
  {
    id: 'p-alvaro-palacios', p: 'Álvaro Palacios',
    country: 'Spain and Portugal', r: 'Priorat', sub: 'Gratallops',
    founded: '1989',
    holdings: 'Steep llicorella terraces around Gratallops including L\'Ermita and Finca Dofi. The family also runs Palacios Remondo in Rioja and Descendientes in Bierzo.',
    style: 'Garnacha-led and increasingly old-vine, with less new oak over time: mineral and floral rather than jammy.',
    t: 'Dry herb, black cherry and slate dust: the modern rebuilding of Priorat',
    why: 'One of the five who remade Priorat from 1989, and the clearest demonstration of its regional, village and single-vineyard ladder.',
    wines: [
      { n: 'L\'Ermita', grape: 'old-vine Garnacha with a little Cariñena', note: 'a small, very steep terrace of old Garnacha, the top of the house\'s ladder' },
      { n: 'Gratallops Vi de Vila', grape: 'Garnacha with Cariñena', note: 'the village tier of Priorat\'s own classification' },
      { n: 'Les Terrasses', grape: 'Garnacha with Cariñena', note: 'the regional wine, the usual introduction to llicorella' }
    ],
    traps: [
      'Llicorella is decomposed slate with quartzite, not limestone',
      'Priorat is DOQ in Catalan and DOCa in Castilian, one of only two with Rioja',
      'Les Terrasses and Camins are regional tiers, not lesser parcels of L\'Ermita'
    ]
  },
  {
    id: 'p-anselmo-mendes', p: 'Anselmo Mendes',
    country: 'Spain and Portugal', r: 'Vinho Verde', sub: 'Monção e Melgaço',
    founded: '',
    holdings: 'Parcels across the Minho, worked with an emphasis on lees contact, skin maceration and old wood.',
    style: 'Alvarinho given texture by techniques borrowed from white Burgundy, plus one cuvee made on skins.',
    t: 'Lemon curd, wet stone and a touch of grip: Alvarinho given texture',
    why: 'The consultant usually named as the technical driver behind serious Alvarinho, and the maker of the reference skin-contact bottling.',
    wines: [
      { n: 'Curtimenta', grape: 'Alvarinho', note: 'skin-contact Alvarinho, the standard example of the method here' },
      { n: 'Parcela Única', grape: 'Alvarinho', note: 'a single-parcel wine at the top of the range' },
      { n: 'Muros Antigos Alvarinho', grape: 'Alvarinho', note: 'the wide-release bottling of the region\'s grape' }
    ],
    traps: [
      'Curtimenta means skin contact, a regional method rather than a novelty style',
      'Vinho Verde has nine subregions, of which Monção e Melgaço is only one',
      'Loureiro and Trajadura, not Alvarinho, dominate much of the wider region'
    ]
  },
  {
    id: 'p-artadi', p: 'Artadi',
    country: 'Spain and Portugal', r: 'Rioja Alavesa', sub: 'Laguardia',
    founded: '1985',
    holdings: 'Old parcels around Laguardia bottled individually, El Pison the most celebrated, with sister estates in Navarra and Alicante.',
    style: 'Single-parcel Tempranillo in French oak, picked for fruit and site rather than for an ageing category.',
    t: 'Black cherry, violet and fine grain: Rioja rebuilt parcel by parcel',
    why: 'The bodega that resigned from the Rioja DOCa in 2015 over ageing categories taking precedence over site. It opens the whole Vinedo Singular argument.',
    wines: [
      { n: 'Viña El Pisón', grape: 'Tempranillo', note: 'a single walled parcel of old Tempranillo at Laguardia, bottled as one wine' },
      { n: 'Valdeginés', grape: 'Tempranillo', note: 'one of the named village parcels' },
      { n: 'La Poza de Ballesteros', grape: 'Tempranillo', note: 'another single site in the parcel range' }
    ],
    traps: [
      'Artadi left Rioja in 2015, so its recent labels do not carry the DOCa',
      'Its wines carry no Crianza, Reserva or Gran Reserva tier by choice'
    ]
  },
  {
    id: 'p-barbeito', p: 'Barbeito',
    country: 'Spain and Portugal', r: 'Madeira', sub: 'Câmara de Lobos',
    founded: '1946',
    holdings: 'No large estate of its own: fruit is bought from the island\'s smallholders and selected by parcel and grape.',
    style: 'No caramel colouring and no sweetening adjustment, canteiro ageing, single-cask bottlings: the transparent house.',
    t: 'Lime peel, toffee and cut-glass acidity: Madeira with the make-up removed',
    why: 'The house that led the reappraisal of Tinta Negra and of unadjusted Madeira, and a reliable example of single-cask bottling.',
    wines: [
      { n: 'Barbeito single cask bottlings', grape: 'Tinta Negra or a noble grape', note: 'individual casks bottled without blending' },
      { n: 'Barbeito Frasqueira', grape: 'one noble grape per bottling', note: 'single vintage, at least twenty years in cask' },
      { n: 'Barbeito Tinta Negra', grape: 'Tinta Negra', note: 'the house that made Tinta Negra respectable' }
    ],
    traps: [
      'Tinta Negra is a red grape and the island\'s most planted, not a filler',
      'Canteiro is slow natural ageing in the lodge; estufagem is heated tank ageing',
      'Madeira is fortified during fermentation for sweet styles and after it for dry ones'
    ]
  },
  {
    id: 'p-blandys', p: 'Blandy\'s',
    country: 'Spain and Portugal', r: 'Madeira', sub: 'Funchal',
    founded: '1811',
    holdings: 'Contracted growers across the island\'s terraces, with the Sao Francisco lodge in Funchal holding very old canteiro stocks.',
    style: 'Canteiro ageing under the lodge roof for the fine wines and estufagem for the entry tier, across all four noble grapes.',
    t: 'Burnt orange, walnut and searing acid: heat and time doing what nothing else can',
    why: 'The surviving family name of the Madeira Wine Company and the standard reference for Frasqueira, Madeira\'s single-vintage category.',
    wines: [
      { n: 'Blandy\'s Frasqueira', grape: 'one noble grape per bottling', note: 'single vintage, single variety, at least twenty years in cask' },
      { n: 'Blandy\'s Malmsey 10 Year Old', grape: 'Malvasia', note: 'the sweet end of the noble ladder' },
      { n: 'Blandy\'s Sercial 10 Year Old', grape: 'Sercial', note: 'the dry end, and the usual blind-tasting shock' }
    ],
    traps: [
      'The noble grapes run driest to sweetest: Sercial, Verdelho, Bual, Malmsey',
      'Frasqueira needs twenty years in cask, Colheita five',
      'Tinta Negra is the island\'s most planted grape and now appears on labels'
    ]
  },
  {
    id: 'p-tinto-pesquera', p: 'Bodegas Alejandro Fernández Tinto Pesquera',
    country: 'Spain and Portugal', r: 'Ribera del Duero', sub: 'Pesquera de Duero',
    founded: '1972',
    holdings: 'Estate vineyards around Pesquera de Duero planted to Tinto Fino alone, with further family bodegas at Condado de Haza and in La Mancha.',
    style: 'Pure Tinto Fino in American oak: warm, sweet-spiced and firm, with no Bordeaux varieties at all.',
    t: 'Sweet spice, dark plum and dusty tannin: Ribera before anyone else looked',
    why: 'The producer whose success in the late 1970s helped push Ribera del Duero to DO status in 1982, making the region more than a single estate.',
    wines: [
      { n: 'Tinto Pesquera Reserva', grape: 'Tinto Fino', note: 'the wine that proved Ribera beyond Vega Sicilia' },
      { n: 'Janus Gran Reserva', grape: 'Tinto Fino', note: 'made only in years the house accepts' },
      { n: 'Condado de Haza', grape: 'Tinto Fino', note: 'the second estate, at Roa de Duero' }
    ],
    traps: [
      'Pesquera is entirely Tinto Fino, unlike Vega Sicilia',
      'Janus is the Gran Reserva, not a separate vineyard'
    ]
  },
  {
    id: 'p-fefinanes', p: 'Bodegas del Palacio de Fefiñanes',
    country: 'Spain and Portugal', r: 'Rías Baixas', sub: 'Cambados, Val do Salnés',
    founded: '',
    holdings: 'Vineyards around Cambados worked from a cellar inside the Fefinanes palace on the town square.',
    style: 'Straight, saline Albariño, with additional bottlings that add lees time and a little oak.',
    t: 'Lemon pith, crushed shell and bay: Cambados Albariño at its plainest and best',
    why: 'The oldest bottling house in Rías Baixas and the usual answer for the origin of Albariño sold under its own name.',
    wines: [
      { n: 'Albariño de Fefiñanes', grape: 'Albariño', note: 'the plain unoaked bottling, the region\'s historic label' },
      { n: '1583 Albariño de Fefiñanes', grape: 'Albariño', note: 'partly barrel-aged, named for the palace\'s date' },
      { n: 'Albariño de Fefiñanes III Año', grape: 'Albariño', note: 'aged about three years before release, part of that time on its lees' }
    ],
    traps: [
      '1583 refers to the palace, not a vintage or a parcel',
      'III Ano means the wine is released in its third year, not that it spent three years in bottle'
    ]
  },
  {
    id: 'p-hidalgo-la-gitana', p: 'Bodegas Hidalgo-La Gitana',
    country: 'Spain and Portugal', r: 'Manzanilla-Sanlúcar de Barrameda', sub: 'Sanlúcar de Barrameda',
    founded: '1792',
    holdings: 'Family vineyards in the Miraflores pago near the sea, feeding the La Gitana solera in Sanlúcar.',
    style: 'Manzanilla with a thick year-round flor veil fed by damp Atlantic air, and a Pasada style where that veil has begun to thin.',
    t: 'Chamomile, salt and green apple: the Atlantic breathing through a cask',
    why: 'The standard Manzanilla reference, and through Pastrana the clearest illustration of Manzanilla Pasada.',
    wines: [
      { n: 'La Gitana Manzanilla', grape: 'Palomino', note: 'the standard reference bottling for the style' },
      { n: 'Pastrana Manzanilla Pasada', grape: 'Palomino', note: 'single-vineyard Manzanilla left until the flor thins' },
      { n: 'Napoleón Amontillado', grape: 'Palomino', note: 'the oxidative continuation of the same base wine' }
    ],
    traps: [
      'Manzanilla is Fino aged in Sanlúcar, not a different grape or method',
      'Manzanilla Pasada is not Amontillado: the flor thinned, it was not killed by refortification',
      'Palomino is the grape for Fino, Manzanilla, Amontillado and Oloroso alike'
    ]
  },
  {
    id: 'p-bodegas-mauro', p: 'Bodegas Mauro',
    country: 'Spain and Portugal', r: 'Castilla y León', sub: 'Tudela de Duero',
    founded: '1980',
    holdings: 'Vineyards at Tudela de Duero, a short distance outside the Ribera del Duero boundary, so the wines carry the wider Castilla y León designation.',
    style: 'Savoury and precise rather than heavy, with French oak and a little Syrah in the blend.',
    t: 'Savoury dark fruit and iron: the great Duero wine the DO map leaves outside',
    why: 'Mariano Garcia made Vega Sicilia for decades and then built Mauro beyond the Ribera boundary, which makes it Spain\'s cleanest boundary-wine example.',
    wines: [
      { n: 'Mauro', grape: 'Tempranillo with a little Syrah', note: 'the estate wine, made just outside the DO line' },
      { n: 'Terreus', grape: 'Tempranillo', note: 'the single-vineyard bottling, not a reserve tier' },
      { n: 'Mauro Vendimia Seleccionada', grape: 'Tempranillo', note: 'a selection made only in strong years' }
    ],
    traps: [
      'Mauro is not Ribera del Duero: Tudela de Duero falls outside the DO',
      'Vino de la Tierra de Castilla y León here signals geography, not lower quality'
    ]
  },
  {
    id: 'p-muga', p: 'Bodegas Muga',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Haro, Rioja Alta',
    founded: '1932',
    holdings: 'Family vineyards in Rioja Alta around Haro, with an in-house cooperage that builds and repairs the barrels.',
    style: 'Everything in wood: fermentation in oak vats, ageing in barrel, egg-white fining and hand racking.',
    t: 'Cedar, red plum and fresh sawn oak: a cellar that still makes its own barrels',
    why: 'The working demonstration of traditional Rioja cellar practice, and a house where the traditional and modern tiers sit side by side under one roof.',
    wines: [
      { n: 'Prado Enea Gran Reserva', grape: 'Tempranillo with Garnacha, Graciano and Mazuelo', note: 'the traditional flagship, held far beyond the legal minimum' },
      { n: 'Torre Muga', grape: 'Tempranillo with Mazuelo and Graciano', note: 'the modern French-oak cuvee, made to contrast with Prado Enea' },
      { n: 'Muga Blanco', grape: 'Viura with Malvasia', note: 'barrel-fermented white Rioja in the fresher modern manner' }
    ],
    traps: [
      'Prado Enea is the traditional Gran Reserva, Torre Muga the modern cuvee',
      'Muga is in Rioja Alta at Haro, not in Rioja Alavesa'
    ]
  },
  {
    id: 'p-palacios-remondo', p: 'Bodegas Palacios Remondo',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Alfaro, Rioja Oriental',
    founded: '',
    holdings: 'The Palacios family estate at Alfaro, high on Monte Yerga in the warm eastern end of Rioja, unusually planted to Garnacha.',
    style: 'Turned toward Garnacha and away from long oak: bright, high-toned, altitude-driven reds.',
    t: 'Wild strawberry, thyme and dry chalk: Garnacha arguing for eastern Rioja',
    why: 'The Garnacha answer inside a Tempranillo region, and the family bodega Alvaro Palacios returned to run. It also fixes Rioja Oriental on the map.',
    wines: [
      { n: 'Quiñón de Valmira', grape: 'Garnacha', note: 'a single high vineyard, the house\'s argument for Rioja Garnacha' },
      { n: 'La Montesa', grape: 'Garnacha with Tempranillo', note: 'the everyday wine that made the Garnacha case first' },
      { n: 'Placet Valtomelloso', grape: 'Viura', note: 'an unoaked white worked on lees' }
    ],
    traps: [
      'Rioja Baja was renamed Rioja Oriental in 2018',
      'This is the Palacios family home bodega, separate from Priorat and Bierzo'
    ]
  },
  {
    id: 'p-casa-ferreirinha', p: 'Casa Ferreirinha',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Vila Nova de Gaia',
    founded: '1751',
    holdings: 'Historically the Ferreira estates of the Douro Superior, including Quinta da Leda; the house is now part of Sogrape.',
    style: 'The classical Douro table red: long ageing before release, savoury and cedar-framed rather than ripe.',
    t: 'Portugal\'s first great table red (1952), released only in top years',
    why: 'Barca Velha is the origin point of fine Douro table wine, and the Reserva Especial mechanism is a favourite examiner detail.',
    wines: [
      { n: 'Barca Velha', grape: 'Douro field blend led by Tinta Roriz and Touriga Franca', note: 'first made in 1952, released only in accepted years' },
      { n: 'Reserva Especial', grape: 'Douro field blend', note: 'the release used when a vintage is judged short of Barca Velha' },
      { n: 'Quinta da Leda', grape: 'Douro field blend', note: 'the single-estate wine from the Douro Superior' }
    ],
    traps: [
      'Barca Velha is declared, not annual: rejected years are released as Reserva Especial',
      'Ferreirinha was Dona Antonia Adelaide Ferreira, a person, not a place',
      'Casa Ferreirinha belongs to Sogrape'
    ]
  },
  {
    id: 'p-clos-erasmus', p: 'Clos Erasmus',
    country: 'Spain and Portugal', r: 'Priorat', sub: 'Gratallops',
    founded: '1989',
    holdings: 'A few hectares of old Garnacha terraces above Gratallops, farmed biodynamically.',
    style: 'Garnacha-dominant with Syrah, aged in French oak: dense and dark but cut through by slate minerality.',
    t: 'Black cherry, incense and crushed slate: Priorat\'s smallest great terrace',
    why: 'One of the founding five Clos wines, and the Priorat name usually asked alongside L\'Ermita when an examiner wants the region\'s top tier.',
    wines: [
      { n: 'Clos Erasmus', grape: 'Garnacha with Syrah', note: 'one of the original five Clos wines of 1989' },
      { n: 'Laurel', grape: 'Garnacha with Syrah', note: 'the second wine from younger parcels' }
    ],
    traps: [
      'Laurel is the second wine, not a separate estate',
      'Daphne Glorian is Swiss, not Catalan'
    ]
  },
  {
    id: 'p-clos-mogador', p: 'Clos Mogador',
    country: 'Spain and Portugal', r: 'Priorat', sub: 'Gratallops',
    founded: '1979',
    holdings: 'Terraced llicorella at Gratallops farmed biodynamically, with the separate Manyetes parcel at Gratallops.',
    style: 'Garnacha and Cariñena with small amounts of Cabernet and Syrah: savoury and structured rather than sweet, with a serious barrel-aged white.',
    t: 'Dry herb, dark cherry and hot stone: the Priorat that stayed savoury',
    why: 'René Barbier is the founder of the modern Priorat group, and Clos Mogador was the first wine granted Catalonia\'s Vi de Finca Qualificada.',
    wines: [
      { n: 'Clos Mogador', grape: 'Garnacha and Cariñena with Cabernet Sauvignon and Syrah', note: 'one of the original five Clos wines of 1989' },
      { n: 'Nelin', grape: 'Garnacha Blanca-led white blend', note: 'the reference for serious white Priorat' },
      { n: 'Manyetes', grape: 'Cariñena with Garnacha', note: 'the Cariñena-led parcel wine' }
    ],
    traps: [
      'Nelin is the white, not a second wine of the red',
      'The original five Clos wines of 1989 were Mogador, Dofi, Erasmus, Martinet and l\'Obac'
    ]
  },
  {
    id: 'p-codorniu', p: 'Codorníu',
    country: 'Spain and Portugal', r: 'Cava', sub: 'Sant Sadurní d\'Anoia, Penedès',
    founded: '1551',
    holdings: 'Deep cellars at Sant Sadurni d\'Anoia with extensive Penedès vineyards. The group also owns Raimat in Costers del Segre and Scala Dei in Priorat.',
    style: 'Traditional-method sparkling at scale from the Catalan trio, with Chardonnay used in the upper cuvees.',
    t: 'Apple, almond and soft chalk: the cellar where Cava itself was invented',
    why: 'Josep Raventos made Spain\'s first traditional-method sparkling here in 1872, which is the founding date candidates are asked for.',
    wines: [
      { n: 'Ars Collecta', grape: 'Xarel-lo, Macabeo, Parellada and Chardonnay', note: 'the long-aged top range, including Cava de Paraje Calificado bottlings' },
      { n: 'Anna de Codorníu', grape: 'Chardonnay-led', note: 'the Chardonnay-forward house style, atypical for Cava' },
      { n: 'Non Plus Ultra', grape: 'the Catalan trio', note: 'the long-standing reserve bottling' }
    ],
    traps: [
      'Cava is defined by method and registered production zone, not by one place',
      'Macabeo, Xarel-lo and Parellada are the classic trio; Chardonnay is permitted but not traditional',
      'Cava\'s minimum lees ageing is nine months, Reserva eighteen, Gran Reserva thirty'
    ]
  },
  {
    id: 'p-comando-g', p: 'Comando G',
    country: 'Spain and Portugal', r: 'Sierra de Gredos', sub: '',
    founded: '2008',
    holdings: 'High granite parcels on both flanks of the Gredos range, farmed biodynamically and bottled by site.',
    style: 'Whole-cluster Garnacha at altitude: pale, floral, low in weight and high in acid.',
    t: 'Rose petal, wild strawberry and granite dust: Garnacha mistaken for Pinot Noir',
    why: 'The producers who made Sierra de Gredos examinable and reset what Spanish Garnacha is expected to taste like.',
    wines: [
      { n: 'Rumbo al Norte', grape: 'Garnacha', note: 'a very high old parcel, the most sought of the range' },
      { n: 'Las Umbrías', grape: 'Garnacha', note: 'a north-facing site, the clearest expression of altitude' },
      { n: 'La Bruja de Rozas', grape: 'Garnacha', note: 'the regional wine, the usual introduction to Gredos' }
    ],
    traps: [
      'Gredos is not one DO: bottles appear under Vinos de Madrid, Cebreros and Castilla y León',
      'Garnacha here is pale and light, not the heavy southern style'
    ]
  },
  {
    id: 'p-telmo-rodriguez', p: 'Compañía de Vinos Telmo Rodríguez',
    country: 'Spain and Portugal', r: 'Rioja Alavesa', sub: 'Lanciego',
    founded: '1994',
    holdings: 'Lanzaga and the recovered terraces of Las Beatas at Lanciego, with projects in Toro, Rueda, Valdeorras, Cebreros and Malaga.',
    style: 'Recovery work: abandoned old parcels farmed back, native yeast, whole clusters, bottled by site rather than by tier.',
    t: 'Rose, dry herb and fine grip: forgotten Spanish parcels farmed back into wine',
    why: 'The travelling project that reintroduced Spain\'s abandoned regions, run by the winemaker who also returned to Remelluri. Its labels cross many DOs.',
    wines: [
      { n: 'Las Beatas', grape: 'a co-planted field blend led by Tempranillo', note: 'a terraced parcel rebuilt by hand, bottled as one site' },
      { n: 'Lanzaga', grape: 'Tempranillo with Garnacha and Graciano', note: 'the Rioja Alavesa village wine' },
      { n: 'Molino Real', grape: 'Moscatel', note: 'mountain Malaga: the modern reference for sweet Moscatel there' }
    ],
    traps: [
      'Telmo Rodriguez makes wine in many regions: the label decides the DO',
      'Molino Real is Malaga Moscatel, not Rioja'
    ]
  },
  {
    id: 'p-cvne', p: 'CVNE (Compañía Vinícola del Norte de España)',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Haro, Rioja Alta',
    founded: '1879',
    holdings: 'Three cellars: CVNE and Imperial at Haro in Rioja Alta, Vina Real above Laguardia in Rioja Alavesa, and the Contino estate at Laserna.',
    style: 'Classical Rioja at scale, American oak led, with each cellar kept to its own subzone character.',
    t: 'Classical Rioja polish: red fruit, cedar, American-oak spice',
    why: 'One company, two subzones, three cellars: the cleanest way to examine Rioja Alta against Rioja Alavesa within a single house.',
    wines: [
      { n: 'Imperial Gran Reserva', grape: 'Tempranillo with Graciano and Mazuelo', note: 'Rioja Alta fruit, made only in selected years' },
      { n: 'Viña Real Gran Reserva', grape: 'Tempranillo-led blend', note: 'the Rioja Alavesa counterpart, from a separate cellar' },
      { n: 'Monopole', grape: 'Viura', note: 'one of Spain\'s oldest white wine brands' }
    ],
    traps: [
      'Imperial is Rioja Alta and Vina Real is Rioja Alavesa: they are not quality tiers',
      'Cune is the spoken form of CVNE, from the misread V',
      'Monopole is a brand of white Rioja, not a Burgundian monopole'
    ]
  },
  {
    id: 'p-descendientes-de-j-palacios', p: 'Descendientes de J. Palacios',
    country: 'Spain and Portugal', r: 'Bierzo', sub: 'Corullón',
    founded: '1999',
    holdings: 'Steep slate and quartzite terraces above Corullon, farmed biodynamically and bottled as regional, village and single-vineyard wines.',
    style: 'Mencía picked for perfume rather than weight: whole clusters, large old wood, red-fruited and floral.',
    t: 'Violet, wild raspberry and wet slate: Mencía given a Burgundian grammar',
    why: 'Alvaro Palacios and his nephew Ricardo Pérez built Bierzo\'s classified ladder here, from Petalos up through village to single vineyard.',
    wines: [
      { n: 'La Faraona', grape: 'Mencía', note: 'the top single vineyard, produced in tiny quantity' },
      { n: 'Villa de Corullón', grape: 'Mencía', note: 'the village tier below the named parcels' },
      { n: 'Pétalos del Bierzo', grape: 'Mencía', note: 'the regional wine that introduced Bierzo to the world' }
    ],
    traps: [
      'Mencía is not Cabernet Franc, despite the long-repeated claim',
      'Petalos is the regional wine and La Faraona the single vineyard',
      'Bierzo lies in Castilla y León, not Galicia, though its culture is Galician'
    ]
  },
  {
    id: 'p-do-ferreiro', p: 'Do Ferreiro (Gerardo Méndez)',
    country: 'Spain and Portugal', r: 'Rías Baixas', sub: 'Val do Salnés',
    founded: '',
    holdings: 'Small granite parcels around Meano, including Cepas Vellas, a plot of Albariño reported to be more than two hundred years old.',
    style: 'Low-intervention Albariño with texture and salt rather than aromatic lift.',
    t: 'Salt, quince and beeswax: Albariño from vines older than the appellation',
    why: 'The reference for old-vine Albariño and for the case that Rías Baixas can make textured, ageworthy whites rather than aromatic ones.',
    wines: [
      { n: 'Do Ferreiro Cepas Vellas', grape: 'Albariño', note: 'the old-vine cuvee, the reference for serious Rías Baixas' },
      { n: 'Do Ferreiro Albariño', grape: 'Albariño', note: 'the estate wine from younger granite parcels' }
    ],
    traps: [
      'Cepas Vellas means old vines: it is a parcel, not a legal category',
      'Albariño is trained high on pergolas here to fight Atlantic damp, not for yield'
    ]
  },
  {
    id: 'p-dominio-de-pingus', p: 'Dominio de Pingus',
    country: 'Spain and Portugal', r: 'Ribera del Duero', sub: 'Quintanilla de Onésimo',
    founded: '1995',
    holdings: 'Old bush-vine Tinto Fino parcels at La Horra, farmed biodynamically, with the winery downstream at Quintanilla de Onesimo.',
    style: 'Very low yields and gentle whole-berry handling: dense, dark, polished Tinto Fino.',
    t: 'Old-vine Tinto Fino: opaque, plush, biodynamic cult density',
    why: 'Peter Sisseck\'s arrival made La Horra\'s old bush vines the reference parcels of Ribera del Duero and created the market for Spanish cult wine.',
    wines: [
      { n: 'Pingus', grape: 'Tinto Fino', note: 'first made in 1995, Spain\'s modern cult wine' },
      { n: 'Flor de Pingus', grape: 'Tinto Fino', note: 'the second wine, from a wider set of La Horra parcels' },
      { n: 'PSI', grape: 'Tinto Fino', note: 'a grower project buying and reviving old bush-vine fruit' }
    ],
    traps: [
      'Tinto Fino is Tempranillo under its Ribera name',
      'PSI buys grower fruit and is not a Pingus declassification',
      'Sisseck is Danish and also consults at Hacienda Monasterio'
    ]
  },
  {
    id: 'p-dows', p: 'Dow\'s',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Vila Nova de Gaia',
    founded: '1798',
    holdings: 'Quinta do Bomfim at Pinhao and Quinta da Senhora da Ribeira in the Douro Superior, held within the Symington estates.',
    style: 'The driest finish among the classic houses, fortified to leave less residual sugar: firm and savoury.',
    t: 'Dark plum, liquorice and a dry, tight close: Port that ends clean',
    why: 'The cleanest proof that Vintage Port styles differ by house: Dow\'s drier finish against Graham\'s sweeter one, from the same cellar group.',
    wines: [
      { n: 'Dow\'s Vintage Port', grape: 'Douro field blend', note: 'the dry-finishing pole of the classic vintage styles' },
      { n: 'Quinta do Bomfim', grape: 'Douro field blend', note: 'the single-quinta Vintage from Pinhao' },
      { n: 'Quinta da Senhora da Ribeira', grape: 'Douro field blend', note: 'the second single quinta, from the hotter Superior' }
    ],
    traps: [
      'Dow\'s is the brand and Silva and Cosens the company',
      'Dry here means less residual sugar within Vintage Port, not a dry wine'
    ]
  },
  {
    id: 'p-lustau', p: 'Emilio Lustau',
    country: 'Spain and Portugal', r: 'Jerez', sub: 'Jerez de la Frontera',
    founded: '1896',
    holdings: 'Bodegas in Jerez, with the Almacenista range selected from small private stockholders across all three sherry towns.',
    style: 'A house that bottles the whole spectrum, including single-solera Almacenista selections that show individual casks rather than a brand.',
    t: 'Walnut, brine and dried apple: a dozen soleras bottled as they actually taste',
    why: 'Lustau made the almacenista visible. The term, a small stockholder who ages sherry but does not ship it, is a standard recall question.',
    wines: [
      { n: 'Almacenista range', grape: 'Palomino or Pedro Ximénez depending on the wine', note: 'single-stockholder soleras bottled under the almacenista\'s name' },
      { n: 'Papirusa Manzanilla', grape: 'Palomino', note: 'a Sanlúcar-aged flor wine within the range' },
      { n: 'Puerto Fino', grape: 'Palomino', note: 'Fino from El Puerto de Santa María, the third town' }
    ],
    traps: [
      'An almacenista ages and stores but does not bottle or ship',
      'The sherry triangle is Jerez de la Frontera, Sanlúcar de Barrameda and El Puerto de Santa María'
    ]
  },
  {
    id: 'p-equipo-navazos', p: 'Equipo Navazos',
    country: 'Spain and Portugal', r: 'Jerez', sub: 'Sanlúcar and Jerez',
    founded: '2005',
    holdings: 'No vineyards and no bodega: casks are selected from other houses and bottled under the numbered La Bota series.',
    style: 'Single-cask selections bottled unfiltered and unfined, showing what a solera actually holds rather than what a brand promises.',
    t: 'Bone dry, saline, nutty and unvarnished: one cask, bottled as it stood',
    why: 'The project that drove the en rama movement and taught the trade to think in individual butts. It also prefigured the 2022 reforms on unfortified flor wines.',
    wines: [
      { n: 'La Bota de Manzanilla', grape: 'Palomino', note: 'numbered single-cask flor wines from Sanlúcar' },
      { n: 'La Bota de Palo Cortado', grape: 'Palomino', note: 'selections of the style that resists definition' },
      { n: 'Navazos-Niepoort', grape: 'Palomino', note: 'an unfortified Palomino table wine made with Dirk Niepoort' }
    ],
    traps: [
      'Equipo Navazos owns no vineyard: it selects and bottles',
      'La Bota numbers run sequentially across all styles and are not vintages or ages',
      'Navazos-Niepoort is an unfortified table wine, not a sherry'
    ]
  },
  {
    id: 'p-torres', p: 'Familia Torres',
    country: 'Spain and Portugal', r: 'Penedès', sub: 'Pacs del Penedès',
    founded: '1870',
    holdings: 'Large family holdings across Catalonia including Penedès, Conca de Barbera and Priorat, with further estates in Ribera del Duero, Rioja, Rueda, Chile and California.',
    style: 'Scale with a research habit: recovered ancestral Catalan varieties alongside international ones, and early moves to cooler high sites.',
    t: 'Cassis and bay over Catalan limestone: the family that industrialised quality',
    why: 'Mas La Plana\'s 1979 Paris result is Spain\'s parallel to the Judgement of Paris, and Torres leads the recovery of ancestral Catalan varieties such as Garro and Querol.',
    wines: [
      { n: 'Mas La Plana', grape: 'Cabernet Sauvignon', note: 'the wine whose 1970 beat first growths at the 1979 Paris Wine Olympiad' },
      { n: 'Grans Muralles', grape: 'a blend of recovered Catalan varieties', note: 'a Conca de Barbera wine built from near-extinct grapes' },
      { n: 'Milmanda', grape: 'Chardonnay', note: 'the Conca de Barbera white, barrel-fermented' }
    ],
    traps: [
      'Mas La Plana is Penedès Cabernet Sauvignon, not a Rioja or Ribera wine',
      'Grans Muralles and Milmanda come from Conca de Barbera, not Penedès',
      'Miguel Torres Chile and Marimar Estate in California are the same family, not the same DO'
    ]
  },
  {
    id: 'p-fonseca-porto', p: 'Fonseca',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Vila Nova de Gaia',
    founded: '1815',
    holdings: 'Quinta do Panascal in the Tavora valley, with Cruzeiro and Santo Antonio feeding the vintage blend.',
    style: 'Richer and markedly more floral than its group stablemate Taylor, with foot treading in lagares retained.',
    t: 'Violets, blackberry and sweet spice: Vintage Port at its most perfumed',
    why: 'Tasted against Taylor to show that house style is real within a single group, and the source of Fonseca Guimaraens, an off-year vintage bottling.',
    wines: [
      { n: 'Fonseca Vintage Port', grape: 'Douro field blend', note: 'the most perfumed of the classic vintage styles' },
      { n: 'Fonseca Guimaraens', grape: 'Douro field blend', note: 'the off-year vintage label, bottled when no declaration is made' },
      { n: 'Bin No. 27', grape: 'Douro field blend', note: 'a Reserve Ruby, the everyday tier' }
    ],
    traps: [
      'Fonseca Guimaraens is the undeclared-year vintage, not the main declaration',
      'This Fonseca is a Port house and is unrelated to José Maria da Fonseca in Setúbal'
    ]
  },
  {
    id: 'p-gonzalez-byass', p: 'González Byass',
    country: 'Spain and Portugal', r: 'Jerez', sub: 'Jerez de la Frontera',
    founded: '1835',
    holdings: 'Substantial albariza holdings in the Jerez Superior pagos, notably Macharnudo, with the Tio Pepe solera in the city.',
    style: 'Biological ageing at scale, with a deep set of certified old soleras behind it.',
    t: 'Green almond, chalk and sea spray: the flor the whole world tastes first',
    why: 'The volume reference for Fino, and the house whose VOS and VORS range demonstrates certified average age. En Rama is the standard example of minimal handling.',
    wines: [
      { n: 'Tío Pepe', grape: 'Palomino', note: 'the volume reference for Fino, aged under flor' },
      { n: 'Tío Pepe En Rama', grape: 'Palomino', note: 'minimally clarified and bottled in limited spring releases' },
      { n: 'Noé Pedro Ximénez VORS', grape: 'Pedro Ximénez', note: 'a thirty-year certified solera, the sweet extreme' }
    ],
    traps: [
      'A solera is a fractional blending system, not a vintage',
      'VOS is twenty years average age and VORS thirty, both panel-assessed',
      'Manzanilla cannot be made here: it requires ageing in Sanlúcar de Barrameda'
    ]
  },
  {
    id: 'p-gramona', p: 'Gramona',
    country: 'Spain and Portugal', r: 'Corpinnat', sub: 'Sant Sadurní d\'Anoia, Penedès',
    founded: '1881',
    holdings: 'Family vineyards around Sant Sadurni farmed biodynamically, with a cellar holding very long-aged reserves.',
    style: 'Extreme lees ageing with the top wines sealed under cork for their second fermentation: nutty, dense and still fresh.',
    t: 'Toasted hazelnut, quince and salt: Xarel-lo held past anyone\'s patience',
    why: 'Gramona left Cava for Corpinnat in 2019, which is the cleanest route into the Cava schism, and it is the reference for long-aged Xarel-lo.',
    wines: [
      { n: 'Celler Batlle', grape: 'Xarel-lo with Macabeo', note: 'held on lees for a decade or more' },
      { n: 'III Lustros', grape: 'Xarel-lo with Macabeo', note: 'the long-aged Gran Reserva style bottling' },
      { n: 'Enoteca', grape: 'Xarel-lo with Macabeo', note: 'library releases showing extreme age' }
    ],
    traps: [
      'Corpinnat is a collective brand outside the Cava DO, not a Cava tier',
      'Cava de Paraje Calificado is the DO\'s own top tier and is a different thing from Corpinnat',
      'Xarel-lo is the grape that gives Cava its structure and ageability'
    ]
  },
  {
    id: 'p-henriques-e-henriques', p: 'Henriques and Henriques',
    country: 'Spain and Portugal', r: 'Madeira', sub: 'Câmara de Lobos',
    founded: '1850',
    holdings: 'One of the few Madeira houses with substantial vineyards of its own, at Camara de Lobos on the south coast.',
    style: 'Firm and dry-leaning, with a strong 15 Year Old range and a reputation built on Sercial and Verdelho.',
    t: 'Green walnut, sea salt and dried lemon: the dry end of Madeira taken straight',
    why: 'Commonly cited as the largest vineyard owner on an island of smallholders, and a dependable source of Terrantez, the rarity examiners like to name.',
    wines: [
      { n: 'Sercial 15 Year Old', grape: 'Sercial', note: 'the dry end of the noble ladder at serious age' },
      { n: 'Verdelho 15 Year Old', grape: 'Verdelho', note: 'the medium-dry step, often the cleanest teaching example' },
      { n: 'Terrantez', grape: 'Terrantez', note: 'a near-extinct noble grape, medium-dry and rare' }
    ],
    traps: [
      'Terrantez is its own noble grape, not a synonym for Bual',
      'Madeira age statements are minimums for the blend, not exact ages',
      'Bual and Boal are the same grape, spelled two ways'
    ]
  },
  {
    id: 'p-herdade-do-mouchao', p: 'Herdade do Mouchão',
    country: 'Spain and Portugal', r: 'Alentejo', sub: '',
    founded: '',
    holdings: 'An old estate in the Alentejo with Alicante Bouschet planted since the nineteenth century, together with its own cork forests.',
    style: 'Foot-trodden in stone lagares and aged in large old wood: tannic and savoury rather than warm and plush.',
    t: 'Dried fig, leather and tar: the Alentejo before it turned soft',
    why: 'The traditional face of the Alentejo and the reference for Alicante Bouschet, a teinturier whose flesh and juice are red.',
    wines: [
      { n: 'Mouchão', grape: 'Alicante Bouschet with Trincadeira', note: 'the traditional Alentejo red, made only in accepted years' },
      { n: 'Tonel 3-4', grape: 'Alicante Bouschet', note: 'a single-cask bottling from the estate\'s oldest wood' },
      { n: 'Dom Rafael', grape: 'Alentejo blend', note: 'the second label, the easier introduction' }
    ],
    traps: [
      'Alicante Bouschet has coloured flesh, one of very few such grapes',
      'The Alentejo is warm and broad, but Mouchao is tannic and long-lived, not plush',
      'Talha wines are amphora-aged Alentejo, a separate tradition from Mouchao\'s lagares'
    ]
  },
  {
    id: 'p-jose-maria-da-fonseca', p: 'José Maria da Fonseca',
    country: 'Spain and Portugal', r: 'Setúbal', sub: 'Azeitão',
    founded: '1834',
    holdings: 'Vineyards on the Serra da Arrabida and the sandy Setúbal peninsula, with deep old stocks of Moscatel.',
    style: 'Moscatel de Setúbal fortified and then left on its skins for months, giving marmalade depth, alongside long-established table wines.',
    t: 'Orange marmalade, raisin and dried rose: Muscat fortified and left to darken',
    why: 'The reference for Moscatel de Setúbal and its skin maceration, and the Fonseca that is not a Port house.',
    wines: [
      { n: 'Moscatel de Setúbal', grape: 'Moscatel de Setúbal (Muscat of Alexandria)', note: 'fortified and macerated on skins, the regional reference' },
      { n: 'Moscatel Roxo', grape: 'Moscatel Roxo', note: 'the rarer pink-skinned Muscat of the peninsula' },
      { n: 'Periquita', grape: 'Castelao', note: 'one of Portugal\'s oldest table wine brands' }
    ],
    traps: [
      'This Fonseca is not the Port shipper of the same name',
      'Periquita is both a brand here and a synonym for the grape Castelao',
      'Moscatel de Setúbal is fortified, not a late-harvest wine'
    ]
  },
  {
    id: 'p-remelluri', p: 'La Granja Nuestra Señora de Remelluri',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Labastida, Rioja Alavesa',
    founded: '',
    holdings: 'A single estate climbing the slopes below the Sierra de Toloño above Labastida, farmed organically, with a field of mixed white varieties for the Blanco.',
    style: 'High, cool and estate-grown: herbal, red-fruited Rioja with far less oak marking than valley wines.',
    t: 'Mountain herbs, red cherry and cool stone: Rioja from the hill, not the floor',
    why: 'Rioja\'s estate-bottling pioneer, and under Telmo Rodriguez the argument for site over ageing category. Lindes bottlings name their villages.',
    wines: [
      { n: 'Remelluri Reserva', grape: 'Tempranillo with Garnacha and Graciano', note: 'estate-only fruit, Rioja\'s pioneering single-property wine' },
      { n: 'Remelluri Blanco', grape: 'a field blend of white varieties', note: 'built from many varieties rather than Viura alone' },
      { n: 'Lindes de Remelluri', grape: 'Tempranillo-led', note: 'village wines from named growers at Labastida and San Vicente' }
    ],
    traps: [
      'Lindes de Remelluri is bought village fruit, not estate fruit',
      'The Blanco is a field blend, not a varietal Viura'
    ]
  },
  {
    id: 'p-la-rioja-alta', p: 'La Rioja Alta S.A.',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Haro, Rioja Alta',
    founded: '1890',
    holdings: 'Cellars in the Barrio de la Estacion at Haro with vineyards across Rioja Alta, plus Torre de Ona in Rioja Alavesa and sister estates in Rías Baixas and Ribera del Duero.',
    style: 'American oak and racking by hand from cask to cask, giving pale, sweetly spiced, long-aged reds.',
    t: 'Coconut, dried strawberry and sandalwood: American oak handled with patience',
    why: '890 and 904 are pure recall: both are Gran Reservas, and the numbers refer to 1890 and 1904, the founding and a later merger.',
    wines: [
      { n: 'Gran Reserva 890', grape: 'Tempranillo with Graciano and Mazuelo', note: 'the top Gran Reserva, declared only in exceptional years' },
      { n: 'Gran Reserva 904', grape: 'Tempranillo with Graciano', note: 'the more frequently made Gran Reserva of the pair' },
      { n: 'Viña Ardanza Reserva', grape: 'Tempranillo with Garnacha', note: 'the house Reserva, a tier below the numbered wines' }
    ],
    traps: [
      '890 and 904 are not vintages, ages or cask numbers',
      'Vina Ardanza is a Reserva, not a Gran Reserva',
      'Rioja Gran Reserva needs five years total, two in cask and two in bottle'
    ]
  },
  {
    id: 'p-luis-pato', p: 'Luís Pato',
    country: 'Spain and Portugal', r: 'Bairrada', sub: 'Anadia',
    founded: '',
    holdings: 'Vineyards split between clay and sand around Anadia, including old Baga bush vines and an ungrafted plot at Quinta do Ribeirinho.',
    style: 'Baga taken seriously: high acid, high tannin, pale colour, with traditional-method sparkling from the same grape.',
    t: 'Sour cherry, tar and a wall of tannin: Baga with nothing sanded off',
    why: 'The producer who argued for Baga as a fine grape, and a dense source of exam facts: pe franco, and the clay against sand distinction that sets Bairrada\'s style.',
    wines: [
      { n: 'Quinta do Ribeirinho Pé Franco', grape: 'Baga on ungrafted vines', note: 'pe franco means own-rooted, and the wine is the region\'s benchmark' },
      { n: 'Vinha Pan', grape: 'Baga', note: 'a clay-soil single vineyard, dense and tannic' },
      { n: 'Vinha Barrosa', grape: 'Baga', note: 'old bush vines, the traditional face of Bairrada' }
    ],
    traps: [
      'Baga is pale, high in acid and high in tannin, unlike its warm-country neighbours',
      'Pe franco means own-rooted, not old-vine',
      'Some of his wines are labelled Beiras rather than Bairrada'
    ]
  },
  {
    id: 'p-marques-de-murrieta', p: 'Marqués de Murrieta',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Ygay, Rioja Alta',
    founded: '1852',
    holdings: 'A single walled estate at Ygay southeast of Logrono, farmed as one property, with the white parcel Capellania inside it.',
    style: 'Estate-grown and slow to release, with a savoury, iron-edged line rather than sweet oak.',
    t: 'Iron, dried fig and old cedar: Rioja\'s slowest release, still young at thirty',
    why: 'Named with Marqués de Riscal as one of Rioja\'s two founding bodegas of the 1850s, and the owner of Castillo Ygay, the region\'s longest-held Gran Reserva.',
    wines: [
      { n: 'Castillo Ygay Gran Reserva Especial', grape: 'Tempranillo with Mazuelo', note: 'released decades after the vintage and only in accepted years' },
      { n: 'Capellanía', grape: 'Viura', note: 'a barrel-aged white from a named parcel within the estate' },
      { n: 'Dalmau', grape: 'Tempranillo with Cabernet Sauvignon and Graciano', note: 'the modern French-oak cuvee, the house counterweight to Ygay' }
    ],
    traps: [
      'Castillo Ygay is a bottling of this estate, not a separate property',
      'Capellania is a white wine from a parcel, not a village',
      'Murrieta sits in Rioja Alta near Logrono, not in Rioja Alavesa'
    ]
  },
  {
    id: 'p-marques-de-riscal', p: 'Marqués de Riscal',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Elciego, Rioja Alavesa',
    founded: '1858',
    holdings: 'Vineyards around Elciego in Rioja Alavesa, with a separate white-wine operation in Rueda.',
    style: 'Bordeaux practice from the outset: cooler Alavesa fruit, firm structure, and old Cabernet Sauvignon plantings kept by historic exception.',
    t: 'Cedar, cassis edge and dusty tannin: the Bordeaux hand that started modern Rioja',
    why: 'The pair with Murrieta for Rioja\'s Bordeaux-influenced founding, and one of the very few Rioja estates with Cabernet Sauvignon in the ground.',
    wines: [
      { n: 'Marqués de Riscal Gran Reserva', grape: 'Tempranillo with Graciano and Mazuelo', note: 'the classical Alavesa Gran Reserva' },
      { n: 'Barón de Chirel', grape: 'Tempranillo with old mixed varieties', note: 'the modern selection from the oldest parcels' },
      { n: 'Marqués de Riscal Rueda', grape: 'Verdejo, sometimes with Sauvignon Blanc', note: 'a Rueda wine from the same house, and a common label trap' }
    ],
    traps: [
      'The Rueda whites carry DO Rueda, not Rioja',
      'Cabernet Sauvignon survives here by historic exception and is not a generally authorised Rioja variety'
    ]
  },
  {
    id: 'p-niepoort', p: 'Niepoort',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Cima Corgo',
    founded: '1842',
    holdings: 'Quinta de Nápoles in the Tedo valley with old co-planted field-blend parcels in the Cima Corgo, alongside the shipping business in Gaia.',
    style: 'Fresher and more transparent than the classic houses: schist minerality and moderate weight in both the Ports and the table wines.',
    t: 'Dirk Niepoort\'s fresher Douro, schist minerality over polish',
    why: 'A Port shipper that became a table-wine house. Dirk Niepoort is the name examiners attach to the dry Douro revival and to lighter Port.',
    wines: [
      { n: 'Batuta', grape: 'old-vine Douro field blend', note: 'the dense end of the dry Douro range' },
      { n: 'Redoma', grape: 'Douro field blend, made red, white and rose', note: 'the wine that argued for Douro table wine as a category' },
      { n: 'Bioma Vinha Velha Vintage Port', grape: 'old-vine Douro field blend', note: 'Port from a single old field-blend parcel' }
    ],
    traps: [
      'Niepoort is Dutch in origin but a Douro shipper since 1842',
      'Charme and Redoma are Douro table wines, not Ports',
      'Redoma exists as red, white and rose, so the name alone does not answer the colour'
    ]
  },
  {
    id: 'p-numanthia', p: 'Numanthia',
    country: 'Spain and Portugal', r: 'Toro', sub: '',
    founded: '1998',
    holdings: 'Old Tinta de Toro bush vines on deep sand, including ungrafted pre-phylloxera parcels reserved for Termanthia.',
    style: 'Massive, dark and high in alcohol, with Termanthia taken to the limit of extraction.',
    t: 'Ink, black liquorice and warm sand: Toro at full volume',
    why: 'The name that put Toro on wine lists. Founded by the Eguren family and sold to LVMH in 2008, it also demonstrates why Toro\'s sand carries ungrafted vines.',
    wines: [
      { n: 'Termanthia', grape: 'Tinta de Toro', note: 'from ungrafted pre-phylloxera bush vines' },
      { n: 'Numanthia', grape: 'Tinta de Toro', note: 'the middle wine, from old vines' },
      { n: 'Termes', grape: 'Tinta de Toro', note: 'the entry bottling, the usual first taste of the DO' }
    ],
    traps: [
      'Tinta de Toro is Tempranillo, adapted to sand and heat',
      'Sandy soils, not altitude, are why phylloxera spared these vines',
      'Termanthia is the top wine and Termes the entry: the names are easily swapped'
    ]
  },
  {
    id: 'p-pazo-de-senorans', p: 'Pazo de Señorans',
    country: 'Spain and Portugal', r: 'Rías Baixas', sub: 'Val do Salnés',
    founded: '1989',
    holdings: 'Estate Albariño on granite around the pazo at Meis, in the coolest and most maritime subzone.',
    style: 'Albariño held long on lees without oak, built to age rather than to be drunk young.',
    t: 'White peach, bay leaf and sea salt: Albariño proving it can wait',
    why: 'The house that demonstrated Albariño\'s capacity to age, and the clean way into the Val do Salnés subzone.',
    wines: [
      { n: 'Pazo Señorans Selección de Añada', grape: 'Albariño', note: 'held on lees for years before release, the proof that Albariño ages' },
      { n: 'Pazo Señorans Albariño', grape: 'Albariño', note: 'the house wine, the standard for Val do Salnés' }
    ],
    traps: [
      'Seleccion de Anada is a long-aged dry wine, not a late harvest',
      'Rías Baixas has five subzones: Val do Salnés, Condado do Tea, O Rosal, Soutomaior and Ribeira do Ulla'
    ]
  },
  {
    id: 'p-soalheiro', p: 'Quinta de Soalheiro',
    country: 'Spain and Portugal', r: 'Vinho Verde', sub: 'Monção e Melgaço',
    founded: '',
    holdings: 'Alvarinho on granite in the sheltered Melgaço valley, the warmest and driest corner of the Vinho Verde region.',
    style: 'Varietal Alvarinho with real ripeness and no added spritz: stone fruit, weight and length.',
    t: 'Peach skin, orange blossom and salt: Vinho Verde with its shoulders back',
    why: 'The house that established Monção e Melgaço as the serious tier of Vinho Verde, which examiners use to break the region\'s cheap-and-fizzy reputation.',
    wines: [
      { n: 'Soalheiro Alvarinho', grape: 'Alvarinho', note: 'credited as the first varietal Alvarinho of Melgaço' },
      { n: 'Primeiras Vinhas', grape: 'Alvarinho', note: 'from the estate\'s oldest plantings' },
      { n: 'Granit', grape: 'Alvarinho', note: 'a soil-specific bottling worked on lees' }
    ],
    traps: [
      'Alvarinho and Albariño are the same grape on two sides of the Minho',
      'Monção e Melgaço is inland and sheltered, not the coolest part of the region',
      'Vinho Verde means young wine and can be red, white or rose'
    ]
  },
  {
    id: 'p-quinta-do-crasto', p: 'Quinta do Crasto',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Cima Corgo',
    founded: '',
    holdings: 'A river-facing estate above the Douro with two old co-planted parcels bottled separately, Vinha Maria Teresa and Vinha da Ponte.',
    style: 'Ripe, modern Douro reds with firm schist tannin, made alongside Port from the same vineyards.',
    t: 'Black plum, rock dust and pine resin: a Douro field blend read vine by vine',
    why: 'The clean example of a Douro field blend bottled as a single old vineyard, which is how the region expresses site without a classification system.',
    wines: [
      { n: 'Vinha Maria Teresa', grape: 'an old co-planted field blend', note: 'a single old vineyard bottled as one wine' },
      { n: 'Vinha da Ponte', grape: 'an old co-planted field blend', note: 'the second named old parcel' },
      { n: 'Crasto Superior', grape: 'Touriga Nacional-led blend', note: 'from the estate\'s Douro Superior property' }
    ],
    traps: [
      'Vinha Maria Teresa is a co-planted field blend, not a varietal wine',
      'Crasto makes both Port and table wine from the same estate'
    ]
  },
  {
    id: 'p-quinta-do-noval', p: 'Quinta do Noval',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Pinhão',
    founded: '1715',
    holdings: 'A single terraced amphitheatre above Pinhao, containing the small ungrafted Nacional plot, with Douro table wine made from the same estate.',
    style: 'Estate-based rather than blended from purchases: floral and fine-boned vintage Port, and a serious tawny and colheita range.',
    t: 'From ungrafted vines: violet, black fruit, mythic concentration',
    why: 'The only great Port house built on a single estate, and the owner of Nacional. Its Colheita range makes the tawny categories easy to demonstrate.',
    wines: [
      { n: 'Nacional Vintage Port', grape: 'Douro field blend on ungrafted vines', note: 'a plot of a couple of hectares, bottled in tiny quantity' },
      { n: 'Noval Vintage Port', grape: 'Douro field blend', note: 'the estate declaration, lighter-framed than Taylor or Dow' },
      { n: 'Noval Colheita', grape: 'Douro field blend', note: 'a single-year tawny aged long in cask' }
    ],
    traps: [
      'Nacional is a plot inside Noval, not a separate quinta',
      'Ungrafted does not mean pre-phylloxera: the plot is planted on its own roots and replanted',
      'A Colheita is a tawny from one harvest aged at least seven years in cask, not a Vintage',
      'Noval is owned by AXA Millesimes'
    ]
  },
  {
    id: 'p-quinta-do-vale-meao', p: 'Quinta do Vale Meão',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Douro Superior',
    founded: '1877',
    holdings: 'A large single property at the eastern end of the Douro, planted by Dona Antonia Adelaide Ferreira and now run by the Olazabal family.',
    style: 'Touriga Nacional-led and made in granite lagares: structured and surprisingly cool-fruited for such a hot corner.',
    t: 'Violet, graphite and dry heat: the Douro Superior at its most composed',
    why: 'For decades the principal source of Barca Velha, and since 1999 its own wine. It fixes the Douro Superior as the hottest and driest subregion.',
    wines: [
      { n: 'Quinta do Vale Meão', grape: 'Touriga Nacional with Touriga Franca and Tinta Roriz', note: 'its own label since 1999, after decades feeding Barca Velha' },
      { n: 'Meandro', grape: 'Douro field blend', note: 'the second wine of the estate' },
      { n: 'Vale Meão Vintage Port', grape: 'Douro field blend', note: 'Port from the same Superior vineyards' }
    ],
    traps: [
      'The Douro\'s three subregions are Baixo Corgo, Cima Corgo and Douro Superior',
      'Vale Meao fruit once went into Barca Velha and no longer does',
      'Meandro is the second wine, not a different estate'
    ]
  },
  {
    id: 'p-quinta-do-vallado', p: 'Quinta do Vallado',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Baixo Corgo',
    founded: '1716',
    holdings: 'An estate on the Corgo near Peso da Regua in Ferreira family hands, with a second property, Quinta do Orgal, in the Douro Superior.',
    style: 'Modern and clean-fruited table wines, alongside deep family stocks of very old tawny.',
    t: 'Bramble, bay and warm stone: Baixo Corgo answering the Superior',
    why: 'One of the few well-known estates in the Baixo Corgo, the coolest and wettest subregion, which supplies most of the Douro\'s basic Port.',
    wines: [
      { n: 'Vallado Reserva Field Blend', grape: 'an old co-planted field blend', note: 'the estate\'s old-vine red' },
      { n: 'Adelaide Tributa', grape: 'Douro field blend', note: 'named for Dona Antonia Adelaide Ferreira, an ancestor' },
      { n: 'Vallado 40 Year Old Tawny', grape: 'Douro field blend', note: 'from old family cask stocks' }
    ],
    traps: [
      'Baixo Corgo is the westernmost and coolest subregion, not the finest for Vintage',
      'Tawny age statements of 10, 20, 30 and 40 years are blend averages'
    ]
  },
  {
    id: 'p-lopez-de-heredia', p: 'R. López de Heredia Viña Tondonia',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Haro, Rioja Alta',
    founded: '1877',
    holdings: 'Four estate vineyards bottled as separate wines: Tondonia, Bosconia, Cubillo and Zaconia, the last bottled as the white Vina Gravonia.',
    style: 'Very long ageing in old American oak, egg-white fining, no filtration: reds arrive pale and tertiary, whites frankly oxidative.',
    t: 'Dried cherry, dill, orange peel and old wood: Rioja kept in the nineteenth century',
    why: 'The anchor for traditional Rioja and for oxidative white Rioja. Examiners use Tondonia to separate deliberate oxidative style from oxidation as a fault.',
    wines: [
      { n: 'Viña Tondonia Reserva', grape: 'Tempranillo with Garnacha, Graciano and Mazuelo', note: 'the fixed reference for traditional Rioja, released only after years in cask and bottle' },
      { n: 'Viña Tondonia Blanco Reserva', grape: 'Viura with Malvasia', note: 'barrel-aged white Rioja: the wine that tests whether a candidate can call style rather than fault' },
      { n: 'Viña Bosconia', grape: 'Tempranillo-led blend', note: 'the rounder of the two flagship vineyards, often taught against Tondonia' }
    ],
    traps: [
      'Tondonia is a vineyard, not the company: the house is R. López de Heredia',
      'Bosconia and Tondonia are different vineyards, not quality tiers',
      'The Blanco is Viura-based and intentionally oxidative, not maderised'
    ]
  },
  {
    id: 'p-rafael-palacios', p: 'Rafael Palacios',
    country: 'Spain and Portugal', r: 'Valdeorras', sub: 'O Bolo',
    founded: '2004',
    holdings: 'Small high parcels of Godello on decomposed granite around O Bolo, in the Val do Bibei.',
    style: 'Godello fermented and aged in large wood and worked on lees: textured and mineral, closer to white Burgundy than to an aromatic white.',
    t: 'Pear skin, wet granite and cream: Godello\'s case for being taken seriously',
    why: 'The producer who lifted Godello out of anonymity, and the reason Valdeorras is the DO an examiner will name for the grape.',
    wines: [
      { n: 'As Sortes', grape: 'Godello', note: 'the wine that established Godello as a fine white grape' },
      { n: 'Louro', grape: 'Godello with a little Treixadura', note: 'the village-level wine from the same valley' },
      { n: 'Sorte O Soro', grape: 'Godello', note: 'a single old parcel, made in tiny quantity' }
    ],
    traps: [
      'Godello is neither Verdejo nor Albariño',
      'Valdeorras is in Galicia but inland in Ourense, not on the coast',
      'Rafael Palacios is Alvaro\'s brother: the family works in Rioja, Priorat, Bierzo and Valdeorras'
    ]
  },
  {
    id: 'p-raul-perez', p: 'Raúl Pérez',
    country: 'Spain and Portugal', r: 'Bierzo', sub: 'Valtuille de Abajo',
    founded: '',
    holdings: 'Family old vines at Valtuille de Abajo under the La Vizcaina labels, with projects in Ribeira Sacra, Rías Baixas and Monterrei.',
    style: 'Restless and experimental: old foudres for Mencía, extended lees ageing for whites, low sulphur, deliberate aromatic risk.',
    t: 'Blood orange, crushed slate and sea air: Atlantic Spain in restless hands',
    why: 'The consultant behind much of the Atlantic Spain revival, and the name that lets an examiner move from Bierzo into Ribeira Sacra and Rías Baixas.',
    wines: [
      { n: 'Ultreia St Jacques', grape: 'Mencía', note: 'the wide-release Bierzo that carries his name furthest' },
      { n: 'El Pecado', grape: 'Mencía', note: 'a Ribeira Sacra wine from very steep river terraces' },
      { n: 'Sketch', grape: 'Albariño', note: 'a Rías Baixas white, some of it aged submerged in the sea' }
    ],
    traps: [
      'Ultreia and La Vizcaina are his own labels, not separate wineries',
      'Castro Ventosa is the family bodega he came from'
    ]
  },
  {
    id: 'p-taylor-fladgate', p: 'Taylor Fladgate',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Vila Nova de Gaia',
    founded: '1692',
    holdings: 'Quinta de Vargellas in the Douro Superior and Quinta de Terra Feita in the Pinhao valley, the two backbones of the vintage blend.',
    style: 'Structured, tannic and slow-maturing Vintage Port, built to be kept rather than approached young.',
    t: 'Black fruit, violet and firm grip: Vintage Port that refuses to be drunk early',
    why: 'The reference for Vintage Port structure, and the owner of Vargellas, the standard example of a single-quinta Vintage in an undeclared year.',
    wines: [
      { n: 'Taylor Vintage Port', grape: 'a Douro field blend led by Touriga Nacional and Touriga Franca', note: 'the structural benchmark for the category' },
      { n: 'Quinta de Vargellas', grape: 'Douro field blend', note: 'the single-quinta Vintage released in undeclared years' },
      { n: 'Quinta de Vargellas Vinha Velha', grape: 'old-vine Douro field blend', note: 'made only in rare years from the estate\'s oldest plots' }
    ],
    traps: [
      'A single-quinta Vintage is bottled in undeclared years and is still a Vintage Port',
      'Taylor, Fonseca and Croft are one group, the Fladgate Partnership',
      'A declaration is made by the house, not by the Instituto dos Vinhos do Douro e do Porto'
    ]
  },
  {
    id: 'p-valdespino', p: 'Valdespino',
    country: 'Spain and Portugal', r: 'Jerez', sub: 'Jerez de la Frontera',
    founded: '',
    holdings: 'The Macharnudo Alto vineyard, source of the single-vineyard Inocente Fino.',
    style: 'Old practice kept alive: Inocente fermented in cask rather than tank, and very old soleras for the amontillados and palo cortados.',
    t: 'Sea salt, hazelnut skin and old wood: Fino from one named vineyard',
    why: 'The house that kept single-vineyard sherry alive. Inocente is the answer when an examiner asks for a Fino from a named pago.',
    wines: [
      { n: 'Inocente Fino', grape: 'Palomino', note: 'single-vineyard Fino from Macharnudo Alto, fermented in butt' },
      { n: 'Tío Diego Amontillado', grape: 'Palomino', note: 'the same base wine taken past the flor stage' },
      { n: 'Cardenal Palo Cortado VORS', grape: 'Palomino', note: 'a thirty-year certified solera of the hardest style to explain' }
    ],
    traps: [
      'Macharnudo is a pago, one of the great albariza sites, not a village appellation',
      'Inocente is fermented in butt rather than stainless steel, now unusual',
      'Palo Cortado arises from reclassification in cask, not from a grape or a site'
    ]
  },
  {
    id: 'p-vega-sicilia', p: 'Vega Sicilia',
    country: 'Spain and Portugal', r: 'Ribera del Duero', sub: 'Valbuena de Duero',
    founded: '1864',
    holdings: 'A single estate on the Duero at Valbuena de Duero with Bordeaux varieties planted since the nineteenth century. The group also owns Alion in Ribera, Pintia in Toro, Macan in Rioja and Oremus in Tokaj.',
    style: 'Extremely long ageing in casks of several sizes and ages, then further bottle age, so the wine is released resolved.',
    t: 'Leather, tobacco, dried cherry and sweet spice: released when ready, not when due',
    why: 'The reason Ribera del Duero permits Cabernet Sauvignon, and the reference point for Spanish ageing. Reserva Especial is the detail candidates miss.',
    wines: [
      { n: 'Único', grape: 'Tinto Fino with Cabernet Sauvignon', note: 'Spain\'s benchmark red, held around a decade before release' },
      { n: 'Único Reserva Especial', grape: 'Tinto Fino with Cabernet Sauvignon', note: 'a blend of several vintages, sold without a vintage year' },
      { n: 'Valbuena 5o', grape: 'Tinto Fino with Merlot', note: 'released in its fifth year from the same estate' }
    ],
    traps: [
      'Unico Reserva Especial is a multi-vintage blend, not a single-vintage Reserva',
      'Valbuena 5o is named for release in its fifth year',
      'Alion is a separate winery, not a Vega Sicilia cuvee'
    ]
  },
  {
    id: 'p-contino', p: 'Viñedos del Contino',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Laserna, Rioja Alavesa',
    founded: '1973',
    holdings: 'A single walled property in a bend of the Ebro at Laserna, farmed and bottled as one estate.',
    style: 'Single-estate Rioja, riper and denser than the subzone average because the site lies low and warm by the river.',
    t: 'Ripe dark cherry and river warmth: Rioja read as one estate, not a blend',
    why: 'The chateau model in a region built on blending and purchased fruit, and the standard reference for varietal Graciano.',
    wines: [
      { n: 'Contino Reserva', grape: 'Tempranillo with Graciano and Mazuelo', note: 'an early single-estate Rioja, made only from the walled property at Laserna' },
      { n: 'Contino Viña del Olivo', grape: 'Tempranillo with Graciano', note: 'a parcel selection around the estate\'s old olive tree' },
      { n: 'Contino Graciano', grape: 'Graciano', note: 'one of the few varietal Gracianos in Rioja' }
    ],
    traps: [
      'Contino is a CVNE property, not an independent house',
      'Graciano here is a varietal bottling, not merely a blending grape'
    ]
  },
  {
    id: 'p-grahams', p: 'W. and J. Graham\'s',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Vila Nova de Gaia',
    founded: '1820',
    holdings: 'Quinta dos Malvedos above the Tua with Vale de Malhadas, held within the Symington family estates.',
    style: 'Rounder and sweeter at the finish than its stablemates, with a deep aged-tawny range.',
    t: 'Blackcurrant, chocolate and warm spice: the sweetest hand among the great houses',
    why: 'The principal Symington vintage house, and the standard contrast with Dow\'s drier finish. That pairing proves house style is measurable.',
    wines: [
      { n: 'Graham\'s Vintage Port', grape: 'Douro field blend', note: 'the sweeter pole of the classic vintage styles' },
      { n: 'Quinta dos Malvedos', grape: 'Douro field blend', note: 'the single-quinta Vintage of undeclared years' },
      { n: 'Graham\'s 20 Year Old Tawny', grape: 'Douro field blend', note: 'a blend whose average age meets the twenty-year category' }
    ],
    traps: [
      'Malvedos is the single quinta, bottled in undeclared years',
      'Six Grapes is a Reserve Ruby, not a Vintage',
      'Tawny age statements are averages for the blend, not the age of any one wine'
    ]
  },
  {
    id: 'p-warres', p: 'Warre\'s',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Vila Nova de Gaia',
    founded: '1670',
    holdings: 'Quinta da Cavadinha in the Pinhao valley, held within the Symington estates.',
    style: 'Fragrant and medium-bodied rather than massive, with a long reputation for aged tawny and for traditional unfiltered LBV.',
    t: 'Dried fig, walnut and cedar: the oldest British lodge, still the gentlest',
    why: 'Named as the oldest British-founded Port house, a plain recall question, and a reliable example of traditional unfiltered Late Bottled Vintage.',
    wines: [
      { n: 'Warre\'s Vintage Port', grape: 'Douro field blend', note: 'the most restrained of the Symington vintage styles' },
      { n: 'Quinta da Cavadinha', grape: 'Douro field blend', note: 'the single-quinta Vintage of undeclared years' },
      { n: 'Warre\'s Late Bottled Vintage', grape: 'Douro field blend', note: 'bottled unfiltered in the traditional manner, so it throws a deposit' }
    ],
    traps: [
      'Warre\'s is the oldest British house, not the oldest house in the Douro',
      'LBV is bottled four to six years after harvest; traditional unfiltered LBV needs decanting, filtered LBV does not',
      'Crusted Port is a blend of years bottled unfiltered, which LBV is not'
    ]
  },
  {
    id: 'p-wine-and-soul', p: 'Wine and Soul',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Vale de Mendiz, Pinhão',
    founded: '2001',
    holdings: 'Old co-planted parcels above Pinhao including the Pintas vineyard, with Quinta da Manoella at Vale de Mendiz.',
    style: 'Foot-trodden in lagares from very low yields on old vines: dark, mineral, tightly wound.',
    t: 'Dark cherry, slate and dried herb: a single old field blend above Pinhao',
    why: 'A reference for the small-estate Douro movement, and Guru is the usual example when an examiner asks for a serious Douro white.',
    wines: [
      { n: 'Pintas', grape: 'an old co-planted field blend', note: 'a single old vineyard above Pinhao' },
      { n: 'Guru', grape: 'a white field blend including Viosinho and Rabigato', note: 'a standard example of serious Douro white' },
      { n: 'Pintas Character', grape: 'old-vine field blend', note: 'a separate bottling from other old parcels, not a lesser Pintas' }
    ],
    traps: [
      'Guru is a dry white table wine, not a Port',
      'Douro whites come from Viosinho, Rabigato, Gouveio and Codega, the same varieties that make white Port'
    ]
  },
  {
    id: 'w-barca-velha', p: 'Barca Velha',
    by: 'p-casa-ferreirinha',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Douro Superior',
    founded: '1952',
    holdings: 'Historically the Ferreira estates of the Douro Superior, principally Quinta do Vale Meao and, in later decades, Quinta da Leda.',
    style: 'A dry Douro field blend given long cask and bottle age before release: savoury, cedar-framed and restrained rather than ripe.',
    t: 'Portugal\'s first great table red (1952), released only in top years',
    why: 'The origin point of fine Douro table wine, and the standard proof that the Douro\'s Port grapes make serious dry reds. The declaration mechanism is examinable.',
    wines: [
      { n: 'Barca Velha', grape: 'Douro field blend led by Tinta Roriz and Touriga Franca', note: 'first made in 1952 and released in only a handful of years per decade' },
      { n: 'Reserva Especial', grape: 'Douro field blend', note: 'the release used when a vintage falls short of Barca Velha' }
    ],
    traps: [
      'Barca Velha is not made every year: rejected vintages become Reserva Especial',
      'Its historic source was Quinta do Vale Meao, which now makes its own wine',
      'Ferreirinha is a person\'s nickname, not a place'
    ]
  },
  {
    id: 'w-castillo-ygay', p: 'Castillo Ygay Gran Reserva Especial',
    by: 'p-marques-de-murrieta',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Ygay, Rioja Alta',
    founded: '1852',
    holdings: 'Selected parcels within the walled Ygay estate southeast of Logrono, farmed as part of one property.',
    style: 'Long cask and bottle ageing before release, with an iron-edged, savoury line and dried rather than fresh fruit.',
    t: 'Iron, dried fig and old cedar: Rioja released long after it was ready',
    why: 'The longest-held Gran Reserva in Rioja and a test of whether a candidate knows that Gran Reserva minimums are floors, not norms.',
    wines: [
      { n: 'Castillo Ygay Gran Reserva Especial', grape: 'Tempranillo with Mazuelo', note: 'released decades after the vintage and only in accepted years' },
      { n: 'Castillo Ygay Blanco Gran Reserva Especial', grape: 'Viura with Malvasia', note: 'a white Gran Reserva held for decades, made in very rare years' }
    ],
    traps: [
      'Gran Reserva requires five years, two in cask and two in bottle: Ygay far exceeds both',
      'It is a bottling of the Ygay estate, not a separate property',
      'The white Castillo Ygay exists and is rarer than the red'
    ]
  },
  {
    id: 'w-gran-reserva-890', p: 'Gran Reserva 890',
    by: 'p-la-rioja-alta',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Haro, Rioja Alta',
    founded: '1890',
    holdings: 'Selected old Rioja Alta parcels held for the top wine and declared only in exceptional years.',
    style: 'American oak with repeated hand racking over many years: pale, sweetly spiced, dried-strawberry Rioja of great finesse.',
    t: 'Coconut, dried strawberry and sandalwood: the long way round to Rioja',
    why: 'The two numbered Gran Reservas are pure recall, and the numbers catch candidates who read them as vintages or as ages.',
    wines: [
      { n: 'Gran Reserva 890', grape: 'Tempranillo with Graciano and Mazuelo', note: 'the house\'s top wine, made only in exceptional years' },
      { n: 'Gran Reserva 904', grape: 'Tempranillo with Graciano', note: 'the more frequently declared of the pair' }
    ],
    traps: [
      '890 and 904 refer to 1890 and 1904, the founding and a merger',
      'Both are Gran Reservas: 890 is not a longer-aged tier of 904 in law, only in practice',
      'Vina Ardanza is a Reserva from the same house'
    ]
  },
  {
    id: 'w-inocente-fino', p: 'Inocente Fino',
    by: 'p-valdespino',
    country: 'Spain and Portugal', r: 'Jerez', sub: 'Macharnudo Alto',
    founded: '',
    holdings: 'The Macharnudo Alto vineyard on albariza above Jerez, the single site behind the wine.',
    style: 'Fermented in butt rather than tank, then aged under flor in its own solera: saline, nutty and fuller-bodied than most Fino.',
    t: 'Sea salt, hazelnut skin and old wood: Fino from one named albariza pago',
    why: 'The answer when an examiner asks for a sherry from a named vineyard, and the surviving example of cask fermentation in a region that moved to tank.',
    wines: [
      { n: 'Inocente Fino', grape: 'Palomino', note: 'single-vineyard Fino, one of the very few in Jerez' }
    ],
    traps: [
      'Macharnudo is a pago, not an appellation',
      'A solera is a fractional blending system, so a Fino has no vintage',
      'Tio Diego is the amontillado made from the same base wine, not a different vineyard'
    ]
  },
  {
    id: 'w-lermita', p: 'L\'Ermita',
    by: 'p-alvaro-palacios',
    country: 'Spain and Portugal', r: 'Priorat', sub: 'Gratallops',
    founded: '1993',
    holdings: 'A small, very steep terrace of old Garnacha on llicorella above Gratallops, farmed by hand.',
    style: 'Old-vine Garnacha with a little Cariñena, now made with restraint rather than new oak: pale-edged, floral and mineral for its weight.',
    t: 'Old-vine Garnacha on llicorella: mineral, floral, profound',
    why: 'The single vineyard that defines modern Priorat and the top of Alvaro Palacios\'s ladder. Its soil, llicorella, is a guaranteed recall question.',
    wines: [
      { n: 'L\'Ermita', grape: 'old-vine Garnacha with Cariñena', note: 'a small, very steep terrace of old Garnacha on llicorella above Gratallops' }
    ],
    traps: [
      'Llicorella is decomposed slate with quartzite, not limestone',
      'Priorat is DOQ or DOCa, one of only two with Rioja',
      'Les Terrasses and Camins are separate regional wines, not second wines of L\'Ermita'
    ]
  },
  {
    id: 'w-la-faraona', p: 'La Faraona',
    by: 'p-descendientes-de-j-palacios',
    country: 'Spain and Portugal', r: 'Bierzo', sub: 'Corullón',
    founded: '',
    holdings: 'A very small, steep parcel high above Corullon on slate and quartzite, farmed biodynamically.',
    style: 'Whole-cluster Mencía in large old wood: pale, floral and taut, made for perfume rather than for weight.',
    t: 'Violet, wild raspberry and wet slate: the top terrace above Corullon',
    why: 'The single vineyard at the top of the Bierzo ladder that Alvaro Palacios and Ricardo Pérez built, and the wine that made Mencía collectable.',
    wines: [
      { n: 'La Faraona', grape: 'Mencía', note: 'the summit of Bierzo\'s classified ladder, made in tiny quantity' }
    ],
    traps: [
      'Mencía is not Cabernet Franc',
      'Petalos del Bierzo is the regional wine from the same house, not a second wine of La Faraona',
      'Bierzo is in Castilla y León, not Galicia'
    ]
  },
  {
    id: 'w-pingus', p: 'Pingus',
    by: 'p-dominio-de-pingus',
    country: 'Spain and Portugal', r: 'Ribera del Duero', sub: 'La Horra',
    founded: '1995',
    holdings: 'Two old bush-vine Tinto Fino parcels at La Horra, farmed biodynamically, with the winery at Quintanilla de Onesimo.',
    style: 'Very low yields, gentle whole-berry work and French oak: opaque, dense and polished without being sweet.',
    t: 'Opaque black fruit, graphite and velvet: old bush vines pushed to the limit',
    why: 'The wine that created the Spanish cult market and made La Horra a name. Examiners pair it against Unico to contrast modern and classical Ribera.',
    wines: [
      { n: 'Pingus', grape: 'Tinto Fino', note: 'first vintage 1995, Spain\'s first modern cult wine' },
      { n: 'Flor de Pingus', grape: 'Tinto Fino', note: 'the second wine, from a wider set of La Horra parcels' }
    ],
    traps: [
      'Tinto Fino is Tempranillo under its Ribera name',
      'PSI is a separate grower project, not a Pingus declassification',
      'Peter Sisseck is Danish'
    ]
  },
  {
    id: 'w-noval-nacional', p: 'Quinta do Noval Nacional',
    by: 'p-quinta-do-noval',
    country: 'Spain and Portugal', r: 'Douro', sub: 'Pinhão',
    founded: '',
    holdings: 'A plot of a couple of hectares inside the Noval amphitheatre above Pinhao, planted on its own ungrafted roots.',
    style: 'Vintage Port from ungrafted vines: darker, more concentrated and slower to open than the estate\'s main declaration.',
    t: 'From ungrafted vines: violet, black fruit, mythic concentration',
    why: 'The most famous single plot in the Douro, and the standard question on ungrafted vines. It is declared separately from the main Noval Vintage.',
    wines: [
      { n: 'Nacional Vintage Port', grape: 'Douro field blend on ungrafted vines', note: 'declared rarely and made in a few hundred cases at most' }
    ],
    traps: [
      'Nacional is a plot within Quinta do Noval, not a separate estate',
      'Ungrafted does not mean pre-phylloxera: the vines are replanted on their own roots',
      'Nacional is declared in some years when Noval itself is not, and the reverse'
    ]
  },
  {
    id: 'w-vega-sicilia-unico', p: 'Vega Sicilia Único',
    by: 'p-vega-sicilia',
    country: 'Spain and Portugal', r: 'Ribera del Duero', sub: 'Valbuena de Duero',
    founded: '1864',
    holdings: 'A single estate on the Duero at Valbuena de Duero, with Cabernet Sauvignon planted there since the nineteenth century.',
    style: 'Tinto Fino with Cabernet Sauvignon, moved through casks of many sizes and ages for years, then held in bottle until the house judges it ready.',
    t: 'Tempranillo and Cabernet held a decade before release: leather, tobacco, eternal',
    why: 'Spain\'s benchmark red and the reason Cabernet Sauvignon is permitted in Ribera del Duero. Candidates must separate Unico from Reserva Especial and Valbuena.',
    wines: [
      { n: 'Único', grape: 'Tinto Fino with Cabernet Sauvignon', note: 'released around a decade after the vintage, and only in accepted years' },
      { n: 'Único Reserva Especial', grape: 'Tinto Fino with Cabernet Sauvignon', note: 'a blend of several vintages, sold with no vintage on the label' }
    ],
    traps: [
      'Reserva Especial is a multi-vintage blend, not a vintage Reserva',
      'Unico is not made every year',
      'Valbuena 5o is a separate wine of the same estate, named for its fifth-year release'
    ]
  },
  {
    id: 'w-vina-el-pison', p: 'Viña El Pisón',
    by: 'p-artadi',
    country: 'Spain and Portugal', r: 'Rioja Alavesa', sub: 'Laguardia',
    founded: '',
    holdings: 'A single walled parcel of old Tempranillo at Laguardia, farmed and bottled as one wine.',
    style: 'Single-parcel Tempranillo in French oak, picked for fruit and site rather than for an ageing category.',
    t: 'Black cherry, violet and fine grain: one walled parcel above Laguardia',
    why: 'The wine behind Artadi\'s 2015 resignation from the Rioja DOCa, and therefore the entry point to the Vinedo Singular and site-over-ageing debate.',
    wines: [
      { n: 'Viña El Pisón', grape: 'Tempranillo', note: 'the parcel behind Artadi\'s 2015 resignation from the Rioja DOCa' }
    ],
    traps: [
      'Recent vintages do not carry the Rioja DOCa on the label',
      'El Pison is a parcel, not a village or a subzone',
      'It carries no Crianza, Reserva or Gran Reserva tier'
    ]
  },
  {
    id: 'w-vina-tondonia', p: 'Viña Tondonia',
    by: 'p-lopez-de-heredia',
    country: 'Spain and Portugal', r: 'Rioja', sub: 'Haro, Rioja Alta',
    founded: '',
    holdings: 'A single vineyard in a bend of the Ebro below Haro, owned and farmed by R. López de Heredia and bottled as its own wine in red and white.',
    style: 'Years in old American oak with egg-white fining and no filtration: pale, dried and tertiary in red, deliberately oxidative in white.',
    t: 'Time-capsule Rioja: dried cherry, dill, oxidative white of legend',
    why: 'The wine candidates name before they name the bodega, and the standard test of whether oxidative style can be called correctly rather than as a fault.',
    wines: [
      { n: 'Viña Tondonia Reserva', grape: 'Tempranillo with Garnacha, Graciano and Mazuelo', note: 'the fixed reference for traditional Rioja' },
      { n: 'Viña Tondonia Blanco Reserva', grape: 'Viura with Malvasia', note: 'white Rioja aged for years in cask, then years more in bottle' }
    ],
    traps: [
      'Tondonia is the vineyard; the producer is R. López de Heredia',
      'The Gran Reserva is made only in rare years',
      'Vina Bosconia is a different vineyard, not a lesser Tondonia'
    ]
  },
  {
    id: 'p-bernhard-huber', p: 'Bernhard Huber',
    country: 'Germany, Austria and Central Europe', r: 'Baden', sub: 'Malterdingen (Breisgau)',
    founded: '1987',
    holdings: 'Limestone slopes around Malterdingen, including Bienenberg, Schlossberg and Sommerhalde, planted principally to Spätburgunder with some Chardonnay and Weissburgunder.',
    style: 'Burgundian in method and intent: whole-cluster work, French barrique, red cherry and spice over an acid frame rather than extract.',
    t: 'Baden limestone Spätburgunder: red cherry, whole-cluster spice, Burgundian cut',
    why: 'The reference estate for serious German Pinot Noir. Germany is the world\'s third largest producer of Pinot Noir, and Baden is where the exam expects the wine to come from.',
    wines: [
      { n: 'Malterdinger Bienenberg Spätburgunder GG', grape: 'Pinot Noir', note: 'Limestone Pinot Noir, the estate\'s most quoted red' },
      { n: 'Schlossberg Spätburgunder GG', grape: 'Pinot Noir', note: 'The firmest and longest lived of the range' },
      { n: 'Chardonnay Alte Reben', grape: 'Chardonnay', note: 'Evidence that Baden limestone suits white Burgundy varieties too' }
    ],
    traps: [
      'Spätburgunder is Pinot Noir; Grauburgunder is Pinot Gris and Weissburgunder is Pinot Blanc',
      'Baden is Germany\'s warmest region and the only one classified in EU climate zone B',
      'Malterdingen sits in the Breisgau, not in the better known Kaiserstuhl'
    ]
  },
  {
    id: 'p-brundlmayer', p: 'Bründlmayer',
    country: 'Germany, Austria and Central Europe', r: 'Kamptal', sub: 'Langenlois',
    founded: '',
    holdings: 'Major holdings on the Zöbinger Heiligenstein, plus Ried Lamm, Kaferberg and Steinmassel around Langenlois.',
    style: 'Polished and complete, with Riesling from desert sandstone and Grüner Veltliner from loess, and a traditional method sparkling wine made to a serious standard.',
    t: 'Heiligenstein Riesling and Lamm Grüner: spice, stone fruit, Kamptal polish',
    why: 'The Kamptal\'s leading estate and a major holder of Heiligenstein, the vineyard that anchors any question about Austrian Riesling outside the Wachau',
    wines: [
      { n: 'Riesling Ried Zöbinger Heiligenstein Alte Reben', grape: 'Riesling', note: 'Austria\'s most famous Riesling vineyard, from old vines' },
      { n: 'Grüner Veltliner Ried Lamm', grape: 'Grüner Veltliner', note: 'The benchmark loess Grüner of the Kamptal' },
      { n: 'Brut Reserve', grape: 'Pinot Noir, Chardonnay and Grüner Veltliner', note: 'Traditional method Austrian sparkling, the reference under Sekt Austria' },
      { n: 'Riesling Heiligenstein Lyra', grape: 'Riesling', note: 'Named for the Lyre trellis used in the parcel, a viticulture question in a bottle' }
    ],
    traps: [
      'Heiligenstein is Permian desert sandstone with volcanic material, not limestone as the holy stone name suggests',
      'Kamptal, Kremstal and Wachau are three separate DACs; the Wachau ladder terms do not appear on Kamptal labels',
      'Sekt Austria has three tiers: Klassik, Reserve and Grosse Reserve, with rising minimum ageing'
    ]
  },
  {
    id: 'p-clemens-busch', p: 'Clemens Busch',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Pünderich (Marienburg)',
    founded: '',
    holdings: 'A concentrated holding in the Pundericher Marienburg on the terraced lower Mosel, farmed biodynamically and divided by the colour of the slate.',
    style: 'Dry, spontaneously fermented and unfined, with each slate colour bottled separately: blue slate taut and austere, red slate broader and darker toned.',
    t: 'One Marienburg hill parcelled by slate colour: blue austere, red broad',
    why: 'The reference for dry lower-Mosel Riesling and the neatest available demonstration that slate colour changes the wine, since the parcels share a grower, a vintage and a single hillside.',
    wines: [
      { n: 'Marienburg Fahrlay', grape: 'Riesling', note: 'Grey slate, the cooler and more reserved of the parcels' },
      { n: 'Marienburg Rothenpfad', grape: 'Riesling', note: 'Red slate, rounder and spicier, the direct comparison bottling' },
      { n: 'Marienburg Falkenlay', grape: 'Riesling', note: 'Blue slate, the most severe and mineral of the parcels' }
    ],
    traps: [
      'Terrassenmosel is the terraced lower Mosel running from around Punderich and Zell down to Koblenz, a different landscape from the Bernkastel heartland',
      'Punderich is not part of the middle Mosel village cluster candidates memorise'
    ]
  },
  {
    id: 'p-disznoko', p: 'Disznókő',
    country: 'Germany, Austria and Central Europe', r: 'Tokaj', sub: 'Mezőzombor',
    founded: '1992',
    holdings: 'A large contiguous vineyard on volcanic soil at the southern edge of the Tokaj region, restored from state farm condition after its purchase by AXA Millesimes in 1992',
    style: 'Clean, precise botrytis wine with lifted citrus and quince, and a serious dry Furmint alongside the Aszu.',
    t: 'Tokaji polish under French ownership: quince, honey, clean botrytis lift',
    why: 'The clearest example of the foreign capital that reopened Tokaj after 1989, and a useful cross-reference: the same owner holds Château Pichon Baron in Pauillac.',
    wines: [
      { n: 'Tokaji Aszú 6 Puttonyos', grape: 'Furmint, Hárslevelű and Sárga Muskotály', note: 'The estate\'s flagship sweet wine' },
      { n: 'Kapi Vineyard Aszú', grape: 'Furmint and Harslevelu', note: 'A single-vineyard Aszu from the estate\'s best parcel' },
      { n: 'Dry Furmint', grape: 'Furmint', note: 'Part of the modern dry Furmint movement the region now depends on' },
      { n: 'Late Harvest', grape: 'Furmint and Harslevelu', note: 'A lighter sweet style below Aszu, made without the puttonyos process' }
    ],
    traps: [
      'Late Harvest and Szamorodni are not Aszú; only Aszu involves macerating selected botrytised berries into a base wine',
      'Sarga Muskotaly is a permitted Tokaj variety, so a Muscat note does not exclude Tokaji',
      'Dry Furmint is now a substantial part of the region\'s output, not a curiosity'
    ]
  },
  {
    id: 'p-sigalas', p: 'Domaine Sigalas',
    country: 'Germany, Austria and Central Europe', r: 'Greece', sub: 'Santorini (Oia)',
    founded: '1991',
    holdings: 'Own-rooted Assyrtiko on volcanic ash in the north of Santorini, much of it trained into the low kouloura basket against the wind.',
    style: 'Bone dry and saline, with lemon pith and smoke over the island\'s ash, and a serious Vinsanto from the same fruit.',
    t: 'Santorini salt and lemon pith over ash, with white-flower lift',
    why: 'The producer most often poured to demonstrate Assyrtiko, and the clearest illustration of kouloura training, own-rooted vines on phylloxera-hostile ash, and yields among the lowest in the world.',
    wines: [
      { n: 'Santorini Assyrtiko', grape: 'Assyrtiko', note: 'The reference dry Santorini, saline and high in acid' },
      { n: 'Kavalieros', grape: 'Assyrtiko', note: 'A single-vineyard bottling from old vines, the estate\'s summit' },
      { n: 'Santorini Nykteri', grape: 'Assyrtiko', note: 'The riper barrel-aged style permitted within the Santorini PDO' },
      { n: 'Vinsanto', grape: 'Assyrtiko and Aidani', note: 'Sun-dried grapes and long oak ageing, the island\'s sweet wine' }
    ],
    traps: [
      'Vinsanto from Santorini and Vin Santo from Tuscany are different wines with near-identical names',
      'Santorini PDO white requires a large majority of Assyrtiko, with Athiri and Aidani permitted',
      'Nykteri is a style within the Santorini PDO, not a separate appellation'
    ]
  },
  {
    id: 'p-domane-wachau', p: 'Domäne Wachau',
    country: 'Germany, Austria and Central Europe', r: 'Wachau', sub: 'Dürnstein',
    founded: '1938',
    holdings: 'A growers\' co-operative farming a very large share of the Wachau\'s terraced vineyard area, including fruit from Achleiten, Kellerberg, Singerriedel and Loibenberg.',
    style: 'Clean, precise and site-transparent at a scale no private estate can match, with the full Steinfeder to Smaragd ladder represented.',
    t: 'Terrace fruit at scale: grapefruit, white pepper, clean Wachau typicity',
    why: 'The co-operative that farms a large part of the Wachau and therefore shapes what the region tastes like in export markets. It is the standard example of a high quality co-operative outside Italy and Burgundy.',
    wines: [
      { n: 'Riesling Ried Achleiten Smaragd', grape: 'Riesling', note: 'Co-operative access to one of the Wachau\'s finest terraces' },
      { n: 'Grüner Veltliner Terrassen Federspiel', grape: 'Grüner Veltliner', note: 'The volume wine that defines Federspiel for most drinkers' },
      { n: 'Grüner Veltliner Ried Kellerberg Smaragd', grape: 'Grüner Veltliner', note: 'The top tier from the co-operative\'s best contracted parcels' }
    ],
    traps: [
      'It was formerly named Freie Weingartner Wachau, so older lists and older bottles carry a different name',
      'Co-operative origin does not exclude single-vineyard Smaragd bottlings',
      'The Wachau was granted DAC status well after these terms were established; the Vinea Wachau ladder remains a private trademark'
    ]
  },
  {
    id: 'p-donnhoff', p: 'Dönnhoff',
    country: 'Germany, Austria and Central Europe', r: 'Nahe', sub: 'Oberhausen',
    founded: '1750',
    holdings: 'Parcels in Niederhauser Hermannshöhle, Schlossbockelheimer Felsenberg and Kupfergrube, Norheimer Dellchen and Kirschheck, with the Oberhauser Brucke held as a monopole.',
    style: 'Crystalline and precise, sitting between the weightlessness of the Mosel and the breadth of the Rheingau, with the Nahe\'s mixed volcanic and slate soils showing as stone rather than fruit.',
    t: 'Crystalline Riesling, stone fruit over volcanic-slate precision',
    why: 'The estate that made the Nahe examinable in its own right rather than as a bridge between Mosel and Rheinhessen, and the owner of the region\'s benchmark vineyard and its best known monopole.',
    wines: [
      { n: 'Niederhäuser Hermannshöhle Riesling GG', grape: 'Riesling', note: 'The Nahe\'s most celebrated vineyard, dry at the top of the VDP pyramid' },
      { n: 'Oberhäuser Brücke Riesling Spätlese', grape: 'Riesling', note: 'A monopole, the source of the estate\'s finest sweet wines and Eiswein' },
      { n: 'Schlossböckelheimer Kupfergrube Riesling GG', grape: 'Riesling', note: 'Volcanic soil from a former copper mine, the firmest of the sites' },
      { n: 'Norheimer Dellchen Riesling GG', grape: 'Riesling', note: 'Steep volcanic and slate terraces, spicier and broader' }
    ],
    traps: [
      'The Nahe is a separate anbaugebiet, not a subregion of the Mosel or Rheinhessen',
      'Kupfergrube means copper mine and refers to the site\'s industrial origin, not to a mineral flavour claim'
    ]
  },
  {
    id: 'p-burklin-wolf', p: 'Dr. Bürklin-Wolf',
    country: 'Germany, Austria and Central Europe', r: 'Pfalz', sub: 'Wachenheim',
    founded: '1597',
    holdings: 'A large Mittelhaardt holding including parcels in Forster Kirchenstuck, Jesuitengarten, Pechstein and Ungeheuer, and Wachenheimer Gerumpel, farmed biodynamically.',
    style: 'Dry throughout, smoky and firm, with the basalt of Pechstein and the warmth of Forst giving Pfalz breadth without heaviness.',
    t: 'Forst basalt and biodynamics: smoke, grapefruit, Pfalz on a tight rein',
    why: 'The estate classifies its vineyards using the 1828 Bavarian land tax survey, labelling P.C. and G.C., which is the cleanest German example of a historical tax map used as a quality hierarchy.',
    wines: [
      { n: 'Forster Kirchenstück', grape: 'Riesling', note: 'The site the 1828 Bavarian tax map ranked at the very top of the Pfalz' },
      { n: 'Forster Pechstein', grape: 'Riesling', note: 'Black basalt, the smokiest and most savoury of the Forst sites' },
      { n: 'Forster Jesuitengarten', grape: 'Riesling', note: 'The rounder, more perfumed neighbour to Kirchenstuck' },
      { n: 'Wachenheimer Gerümpel', grape: 'Riesling', note: 'The home village\'s leading site' }
    ],
    traps: [
      'The P.C. and G.C. marks are the estate\'s own use of an 1828 survey, not a legal classification',
      'Bürklin-Wolf, von Buhl and Bassermann-Jordan are the three historic Mittelhaardt estates candidates confuse',
      'Forst\'s basalt was quarried and spread on the vineyards, a viticultural intervention rather than native bedrock everywhere in the village'
    ]
  },
  {
    id: 'p-dr-loosen', p: 'Dr. Loosen',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Bernkastel',
    founded: '',
    holdings: 'Ungrafted old-vine parcels in Erdener Pralat, Erdener Treppchen, Urziger Wurzgarten, Wehlener Sonnenuhr, Graacher Himmelreich and Bernkasteler Lay.',
    style: 'Ripe, generous and spicy, with the volcanic red sandstone of Urzig set deliberately against the blue slate of Wehlen; long ageing in traditional Fuder.',
    t: 'Ungrafted old vines across the great Mosel sites: spice, slate, ripe drive',
    why: 'Ernst Loosen is the most visible international advocate for Mosel Riesling and the estate is the usual example of one grower holding parcels in several of the region\'s top vineyards at once.',
    wines: [
      { n: 'Erdener Prälat Riesling Auslese', grape: 'Riesling', note: 'The warm red-slate amphitheatre, the estate\'s most concentrated site' },
      { n: 'Ürziger Würzgarten Riesling Spätlese', grape: 'Riesling', note: 'Red volcanic sandstone giving the spice that names the vineyard' },
      { n: 'Wehlener Sonnenuhr Riesling Kabinett', grape: 'Riesling', note: 'Blue slate, the classic textural counterpoint to Urzig' },
      { n: 'Erdener Treppchen Riesling GG', grape: 'Riesling', note: 'The dry VDP tier from a steep terraced site' }
    ],
    traps: [
      'Wurzgarten\'s red rock is weathered volcanic sandstone, not the blue slate of Wehlen and Graach',
      'The estate also makes wine in the Pfalz and collaborates in Washington State, so a Loosen label is not automatically Mosel'
    ]
  },
  {
    id: 'p-egon-muller', p: 'Egon Müller',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Saar, Wiltingen (Scharzhofberg)',
    founded: '1797',
    holdings: 'Roughly eight hectares of the Scharzhofberg at Wiltingen, farmed from the Scharzhof itself; the family also runs the Le Gallais estate in the Wiltinger Braune Kupp.',
    style: 'Sweet Saar Riesling of very low alcohol and very high acid, picked in repeated selective passes so that even the Kabinett carries the house transparency.',
    t: 'The world\'s most expensive white, apricot nectar on impossible acidity',
    why: 'The reference point for sweet Saar Riesling and the answer to any question about the world\'s costliest white wine. The Scharzhofberg is also the standard example of an Einzellage printed without its village name.',
    wines: [
      { n: 'Scharzhofberger Riesling Trockenbeerenauslese', grape: 'Riesling', note: 'The most expensive white wine made anywhere, produced in single-digit case quantities' },
      { n: 'Scharzhofberger Riesling Auslese and Spätlese', grape: 'Riesling', note: 'The everyday proof of the site, sold with a gold or long-gold capsule for the finer lots' },
      { n: 'Scharzhofberger Riesling Kabinett', grape: 'Riesling', note: 'The entry that the Court uses to test whether a candidate hears Saar over Mosel' },
      { n: 'Wiltinger Braune Kupp (Le Gallais)', grape: 'Riesling', note: 'A separate estate under the same hand, a standard second-label question' }
    ],
    traps: [
      'Scharzhofberger is the single vineyard; Scharzberg is the Grosslage that borrows its reputation across much of the Saar',
      'The Saar is part of the Mosel region, not a separate anbaugebiet',
      'Egon Müller\'s fame rests on sweet Prädikat wine, not on Grosses Gewächs'
    ]
  },
  {
    id: 'p-knoll', p: 'Emmerich Knoll',
    country: 'Germany, Austria and Central Europe', r: 'Wachau', sub: 'Unterloiben',
    founded: '',
    holdings: 'Parcels at Loibenberg, Schütt, Kreutles and Kellerberg, plus Pfaffenberg across the boundary in Kremstal.',
    style: 'Slow, savoury and reductive in youth, released later than most and built on texture rather than fruit, with a baroque Saint Urban label that identifies it on sight.',
    t: 'Baroque label, unhurried wine: white pepper, quince, cellar-aged calm',
    why: 'With F.X. Pichler, the estate that anchors Loiben. It supplies the neatest proof that the Wachau ladder is geographically bounded, since its Pfaffenberg wine lies outside the Wachau and is labelled differently.',
    wines: [
      { n: 'Riesling Ried Schütt Smaragd', grape: 'Riesling', note: 'The estate\'s most distinctive site, stony and slow to open' },
      { n: 'Grüner Veltliner Ried Loibenberg Smaragd', grape: 'Grüner Veltliner', note: 'Broad, peppery Grüner from warm terraces' },
      { n: 'Riesling Vinothekfüllung', grape: 'Riesling', note: 'A late-picked selection released above Smaragd, the estate\'s own extra tier' },
      { n: 'Riesling Ried Pfaffenberg Steiner Selection', grape: 'Riesling', note: 'A Kremstal site, so it cannot carry the Wachau ladder terms' }
    ],
    traps: [
      'Pfaffenberg is in Kremstal, so that bottling carries no Smaragd designation',
      'Vinothekfullung is a house term, not a legal or Vinea Wachau category',
      'The Saint Urban figure on the label is the estate\'s mark, not a regional seal'
    ]
  },
  {
    id: 'p-emrich-schonleber', p: 'Emrich-Schönleber',
    country: 'Germany, Austria and Central Europe', r: 'Nahe', sub: 'Monzingen',
    founded: '',
    holdings: 'Concentrated at Monzingen in the upper Nahe, principally the Halenberg on blue slate and quartzite and the Fruhlingsplatzchen on weathered volcanic soils.',
    style: 'Taut and smoky, with a lime-driven line and very fine botrytis wines in the years that allow them.',
    t: 'Monzingen quartzite: lime, blue slate smoke, upper-Nahe nerve',
    why: 'With Dönnhoff and Schafer-Frohlich, one of the three Nahe estates a candidate is expected to name, and the one that anchors the cooler upper stretch of the river.',
    wines: [
      { n: 'Monzinger Halenberg Riesling GG', grape: 'Riesling', note: 'The estate\'s most severe and long-lived dry wine' },
      { n: 'Monzinger Frühlingsplätzchen Riesling GG', grape: 'Riesling', note: 'The rounder, more openly fruited of the two Grosse Lage sites' },
      { n: 'Monzinger Halenberg Riesling Auslese', grape: 'Riesling', note: 'Sweet Prädikat from the same slate, made only in suitable years' }
    ],
    traps: [
      'The upper Nahe around Monzingen is cooler and later ripening than the Bad Kreuznach end',
      'Halenberg is Monzingen\'s site; do not attach it to Niederhausen or Schlossbockelheim'
    ]
  },
  {
    id: 'p-ernst-triebaumer', p: 'Ernst Triebaumer',
    country: 'Germany, Austria and Central Europe', r: 'Burgenland', sub: 'Rust',
    founded: '',
    holdings: 'Parcels at Rust on the western shore of the Neusiedlersee, including the Ried Marienthal, alongside vineyards for Ruster Ausbruch.',
    style: 'Blaufränkisch of sour cherry, slate and firm tannin, made without the heavy oak that marked Austrian reds in the 1990s.',
    t: 'Marienthal Blaufränkisch: sour cherry, slate, tannin that needs a decade',
    why: 'The estate credited with showing that Blaufränkisch could make a serious ageworthy red, and one of the names attached to Ruster Ausbruch, the sweet category unique to a single town.',
    wines: [
      { n: 'Blaufränkisch Ried Mariental', grape: 'Blaufränkisch', note: 'The wine that proved Austrian red could age, from a limestone parcel' },
      { n: 'Ruster Ausbruch', grape: 'Furmint and others', note: 'The town\'s protected sweet category, made from botrytised fruit' },
      { n: 'Blaufränkisch Oberer Wald', grape: 'Blaufränkisch', note: 'A second single-site red from the same hill' }
    ],
    traps: [
      'Ausbruch is legally tied to Rust and sits between Beerenauslese and Trockenbeerenauslese in must weight',
      'Blaufränkisch is the same grape as Kékfrankos in Hungary and Lemberger in Germany',
      'Several Triebaumer families make wine in Rust, including Paul Triebaumer and Gunter Triebaumer'
    ]
  },
  {
    id: 'p-argyros', p: 'Estate Argyros',
    country: 'Germany, Austria and Central Europe', r: 'Greece', sub: 'Santorini (Episkopi Gonia)',
    founded: '1903',
    holdings: 'Among the largest holdings of very old own-rooted vines on Santorini, some parcels well over a century in age.',
    style: 'Broader and waxier than most Santorini, with brine and stone fruit, and a Vinsanto aged in cask for decades before release.',
    t: 'Ancient kouloura vines: briny, waxy Assyrtiko and Vinsanto aged for decades',
    why: 'The estate that carries Santorini\'s oldest vine material, which makes it the reference for the island\'s own-rooted, never-replanted viticulture and for Vinsanto held in cask far longer than any commercial logic requires.',
    wines: [
      { n: 'Santorini Assyrtiko', grape: 'Assyrtiko', note: 'From the island\'s oldest vine material' },
      { n: 'Vinsanto 20 Years Barrel Aged', grape: 'Assyrtiko and Aidani', note: 'Sun-dried and cask-aged for two decades, the island\'s sweet benchmark' },
      { n: 'Estate Argyros Cuvée Monsignori', grape: 'Assyrtiko', note: 'A single-vineyard wine from ungrafted pre-phylloxera vines' }
    ],
    traps: [
      'Santorini\'s vines are ungrafted because volcanic ash resists phylloxera, not because of any quarantine',
      'Vinsanto is made from sun-dried grapes, not from botrytis or freezing',
      'Tourism land values, not climate, are the present threat to Santorini\'s vineyard area'
    ]
  },
  {
    id: 'p-fx-pichler', p: 'F.X. Pichler',
    country: 'Germany, Austria and Central Europe', r: 'Wachau', sub: 'Dürnstein and Loiben',
    founded: '',
    holdings: 'Terraced parcels on primary rock at Loibenberg, Kellerberg, Steinertal and Durnsteiner Liebenberg, with loess sites for Grüner Veltliner lower down.',
    style: 'The powerful end of the Wachau: high alcohol Smaragd wines of exotic stone fruit and extract, built to age rather than to refresh.',
    t: 'Baroque power: exotic stone fruit on gneiss, Austria\'s benchmark',
    why: 'The estate that defined the ripe Smaragd style and the first name in any Wachau question. It is also the clearest illustration of how much alcohol and extract the Smaragd category permits.',
    wines: [
      { n: 'Riesling Ried Kellerberg Smaragd', grape: 'Riesling', note: 'The estate\'s most quoted wine and the Wachau\'s benchmark gneiss site' },
      { n: 'Riesling Ried Loibenberg Smaragd', grape: 'Riesling', note: 'Warmer and broader, the direct Kellerberg comparison' },
      { n: 'Grüner Veltliner Ried Kellerberg Smaragd', grape: 'Grüner Veltliner', note: 'Grüner at full Smaragd weight, the test of whether a taster still finds the pepper' },
      { n: 'Unendlich', grape: 'Riesling', note: 'A selection made only in vintages the estate judges suitable' }
    ],
    traps: [
      'Smaragd, Federspiel and Steinfeder are trademarks of the Vinea Wachau association, not Austrian law, and apply only in the Wachau',
      'Smaragd is named for an emerald green lizard found on the terraces, not for a vineyard',
      'Several unrelated Pichler estates work the Wachau, including Rudi Pichler and Pichler-Krutzler'
    ]
  },
  {
    id: 'p-feiler-artinger', p: 'Feiler-Artinger',
    country: 'Germany, Austria and Central Europe', r: 'Burgenland', sub: 'Rust',
    founded: '',
    holdings: 'Vineyards at Rust on the Neusiedlersee\'s western shore, worked for both botrytis sweet wine and red wine.',
    style: 'Ruster Ausbruch of candied apricot and orange peel that stays lifted rather than syrupy, plus structured reds from the same town.',
    t: 'Ruster Ausbruch: candied apricot, orange peel, botrytis without weight',
    why: 'The clearest single answer to a question about Ausbruch. Rust held free-town trading privileges from the seventeenth century on the strength of this wine, which is why the category survives as a place rather than a technique.',
    wines: [
      { n: 'Ruster Ausbruch', grape: 'Furmint, Welschriesling and others', note: 'The category that exists only in Rust, made from shrivelled botrytised berries' },
      { n: 'Ruster Ausbruch Pinot Cuvée', grape: 'Pinot family blend', note: 'A varietal reading of the same sweet category' },
      { n: 'Solitaire', grape: 'Bordeaux varieties and Blaufränkisch', note: 'The estate\'s red flagship' }
    ],
    traps: [
      'Ausbruch belongs to Rust alone and sits between Beerenauslese and Trockenbeerenauslese',
      'Rust sits on the western shore; Illmitz and the Seewinkel lie on the eastern side of the lake',
      'Furmint in Rust is the same grape as Tokaj\'s, a shared Habsburg inheritance'
    ]
  },
  {
    id: 'p-zilliken', p: 'Forstmeister Geltz Zilliken',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Saar, Saarburg',
    founded: '1742',
    holdings: 'Holdings in Saarburger Rausch and Ockfener Bockstein, with a deep, cold, three-level cellar beneath the estate.',
    style: 'Very high acid and very low alcohol: grapefruit pith, smoke and a cold saline grip that needs years to unwind.',
    t: 'Saar steel: grapefruit pith, smoke and cold-cellar tension',
    why: 'The Saar estate after Egon Müller that candidates are expected to name, and a dependable example of Eiswein production in a region cold enough to make it more than an accident.',
    wines: [
      { n: 'Saarburger Rausch Riesling Auslese', grape: 'Riesling', note: 'The home vineyard, with gold capsule and long gold capsule selections above it' },
      { n: 'Ockfener Bockstein Riesling Kabinett', grape: 'Riesling', note: 'The Saar\'s best known Einzellage after Scharzhofberg' },
      { n: 'Saarburger Rausch Riesling Eiswein', grape: 'Riesling', note: 'The Saar\'s cold autumns make this estate a regular Eiswein source' }
    ],
    traps: [
      'Eiswein sits at Beerenauslese must weight but comes from healthy frozen fruit, so it shows no botrytis character',
      'Ockfener Bockstein is an Einzellage; the Saar\'s Grosslage is Scharzberg'
    ]
  },
  {
    id: 'p-fritz-haag', p: 'Fritz Haag',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Brauneberg',
    founded: '',
    holdings: 'Concentrated in the Brauneberger Juffer and its steeper heart, the Brauneberger Juffer-Sonnenuhr.',
    style: 'Polished and perfumed rather than austere: peach blossom and wet stone, with sweetness carried so lightly it reads as weightless.',
    t: 'Brauneberg silk: peach blossom, wet stone, sweetness that weighs nothing',
    why: 'The reference estate for Brauneberg, the middle Mosel village renamed from Dusemond in 1925, whose vineyards face the village across the river',
    wines: [
      { n: 'Brauneberger Juffer-Sonnenuhr Riesling Auslese', grape: 'Riesling', note: 'The estate\'s finest parcel, with gold capsule selections above it' },
      { n: 'Brauneberger Juffer Riesling Spätlese', grape: 'Riesling', note: 'The larger surrounding site, the standard comparison bottling' }
    ],
    traps: [
      'The village was called Dusemond until it was renamed Brauneberg in 1925',
      'Juffer-Sonnenuhr is a separate Einzellage inside the larger Juffer, not a designation of quality',
      'Wilhelm Haag\'s other son runs Schloss Lieser, a separate estate'
    ]
  },
  {
    id: 'p-gaia-wines', p: 'Gaia Wines',
    country: 'Germany, Austria and Central Europe', r: 'Greece', sub: 'Santorini and Nemea',
    founded: '1994',
    holdings: 'Two separate operations: old-vine Assyrtiko on Santorini and Agiorgitiko vineyards in the Peloponnese at Nemea.',
    style: 'Technically exact and experimental: wild-ferment Assyrtiko, bottles matured under the sea, and Nemea reds pitched at structure rather than plushness.',
    t: 'Thalassitis Assyrtiko and Nemea Agiorgitiko from one restless house',
    why: 'The producer that lets one name cover both of Greece\'s key answers: Assyrtiko on Santorini and Agiorgitiko at Nemea. Useful when an examiner asks a candidate to link the islands to the mainland.',
    wines: [
      { n: 'Thalassitis', grape: 'Assyrtiko', note: 'The estate\'s dry Santorini and one of the category\'s best known names' },
      { n: 'Assyrtiko Wild Ferment', grape: 'Assyrtiko', note: 'Barrel and acacia fermented, the argument for oak on Assyrtiko' },
      { n: 'Gaia Estate', grape: 'Agiorgitiko', note: 'Nemea at its most structured and ageworthy' },
      { n: 'Thalassitis Submerged', grape: 'Assyrtiko', note: 'Aged in the sea off Santorini, a deliberate provocation' }
    ],
    traps: [
      'Nemea PDO is Agiorgitiko alone, from the Peloponnese',
      'Agiorgitiko translates as Saint George\'s grape and is Greece\'s most planted red variety',
      'Santorini and Nemea are separate PDOs under one producer, so the label must be read for origin'
    ]
  },
  {
    id: 'p-georg-breuer', p: 'Georg Breuer',
    country: 'Germany, Austria and Central Europe', r: 'Rheingau', sub: 'Rüdesheim',
    founded: '',
    holdings: 'Steep quartzite parcels in Rudesheimer Berg Schlossberg, Berg Roseneck and Berg Rottland, plus the Rauenthaler Nonnenberg held as a monopole.',
    style: 'Dry throughout, fermented spontaneously, smoky and taut, deliberately labelled by vineyard alone without a Prädikat term.',
    t: 'Rudesheim quartzite: dry, smoky, taut, named by vineyard alone',
    why: 'Bernhard Breuer was central to the Charta association founded in 1984 to reassert dry Rheingau Riesling, the movement that led to the region\'s Erstes Gewächs and to the VDP\'s dry pyramid.',
    wines: [
      { n: 'Rüdesheim Berg Schlossberg', grape: 'Riesling', note: 'The steepest quartzite site above the Rhine bend, the estate\'s summit wine' },
      { n: 'Rauenthal Nonnenberg', grape: 'Riesling', note: 'A monopole, broader and spicier than the Rudesheim wines' },
      { n: 'Rüdesheim Berg Rottland', grape: 'Riesling', note: 'The warmer of the Berg sites, rounder in fruit' }
    ],
    traps: [
      'The estate labels by site without a Prädikat term, so the absence of Spätlese or Kabinett is a choice, not an omission',
      'Rudesheim\'s Berg sites are quartzite and slate, not the Rheingau\'s more common loess and phyllite'
    ]
  },
  {
    id: 'p-gunderloch', p: 'Gunderloch',
    country: 'Germany, Austria and Central Europe', r: 'Rheinhessen', sub: 'Nackenheim (Roter Hang)',
    founded: '1890',
    holdings: 'The heart of the Nackenheimer Rothenberg on the red slate cliff of the Roter Hang above the Rhine, plus parcels at Nierstein.',
    style: 'Darker toned and firmer than most Rheinhessen Riesling, with iron and stone fruit from the red slate, strong in both dry and botrytis styles.',
    t: 'Nackenheim red slate: iron, peach, dark-fruited weight under the acid',
    why: 'The name attached to the Roter Hang, the red slate escarpment at Nackenheim and Nierstein that gives Rheinhessen its most distinctive soil and its clearest answer to a geology question.',
    wines: [
      { n: 'Nackenheimer Rothenberg Riesling GG', grape: 'Riesling', note: 'Red slate at the heart of the Roter Hang' },
      { n: 'Nackenheimer Rothenberg Riesling Trockenbeerenauslese', grape: 'Riesling', note: 'The estate\'s historic reputation rests on its botrytis wines' },
      { n: 'Niersteiner Pettenthal Riesling GG', grape: 'Riesling', note: 'The neighbouring Roter Hang site, steeper and cooler' }
    ],
    traps: [
      'Niersteiner Gutes Domtal is a Grosslage that trades on the Nierstein name while containing none of the Roter Hang',
      'Rothenberg at Nackenheim is red slate; Rothenberg in the Rheingau at Geisenheim is a different site'
    ]
  },
  {
    id: 'p-horst-sauer', p: 'Horst Sauer',
    country: 'Germany, Austria and Central Europe', r: 'Franken', sub: 'Escherndorf',
    founded: '',
    holdings: 'Steep parcels in the Escherndorfer Lump, the amphitheatre site above a bend of the Main, planted to Silvaner and Riesling.',
    style: 'Dry Silvaner of earth and pear at the top of the range, alongside some of Germany\'s purest botrytis wines from the same vineyard.',
    t: 'Escherndorfer Lump: Silvaner of pear and earth, sweet wines of rare clarity',
    why: 'The Franken estate a candidate should be able to name, and the standard answer for serious dry Silvaner, the variety that defines the region.',
    wines: [
      { n: 'Escherndorfer Lump Silvaner GG', grape: 'Silvaner', note: 'The benchmark for dry Franken Silvaner' },
      { n: 'Escherndorfer Lump Riesling Trockenbeerenauslese', grape: 'Riesling', note: 'Botrytis wines that regularly outscore the region\'s expectations' },
      { n: 'Escherndorfer Lump Silvaner Beerenauslese', grape: 'Silvaner', note: 'Sweet Silvaner, a variety candidates rarely place in a sweet context' }
    ],
    traps: [
      'Franken\'s flask-shaped Bocksbeutel is permitted in Franken and parts of Baden, not across Germany',
      'Silvaner in Franken is dry and savoury, unlike the Alsace reading of the same grape',
      'Escherndorfer Lump is an Einzellage, not a Grosslage, despite the unflattering name'
    ]
  },
  {
    id: 'p-jj-prum', p: 'Joh. Jos. Prüm',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Wehlen',
    founded: '1911',
    holdings: 'Holdings in Wehlener Sonnenuhr, Graacher Himmelreich, Graacher Domprobst, Zeltinger Sonnenuhr and Bernkasteler Badstube, all on blue Devonian slate.',
    style: 'Reductive and faintly spritzy in youth, often unapproachable for years, then turning to honey, smoke and slate over several decades.',
    t: 'Feather-light, spritzy youth aging into honeyed slate for decades',
    why: 'The benchmark producer for classical fruity-styled Mosel Riesling and the name attached to the Wehlener Sonnenuhr. The house is also the standard illustration of capsule colour marking selections within one Prädikat.',
    wines: [
      { n: 'Wehlener Sonnenuhr Riesling Spätlese', grape: 'Riesling', note: 'The single most quoted Mosel Spätlese on any wine list' },
      { n: 'Wehlener Sonnenuhr Riesling Auslese', grape: 'Riesling', note: 'Gold capsule and long gold capsule mark the finer selections of the same Prädikat' },
      { n: 'Graacher Himmelreich Riesling Kabinett', grape: 'Riesling', note: 'The Graach neighbour to Wehlen, earthier and broader, useful for contrast questions' }
    ],
    traps: [
      'Several unrelated Prüm estates exist: S.A. Prüm, Studert-Prüm and Dr. F. Weins-Prüm among them',
      'The spritz and reduction in young bottles is house signature, not fault',
      'Sonnenuhr means sundial and appears at Wehlen, Zeltingen and Brauneberg, so the village name carries the answer'
    ]
  },
  {
    id: 'p-kir-yianni', p: 'Kir-Yianni',
    country: 'Germany, Austria and Central Europe', r: 'Greece', sub: 'Naoussa and Amyndeon',
    founded: '1997',
    holdings: 'Estates in two Macedonian appellations: the Yianakohori vineyards at Naoussa and cooler, higher plantings at Amyndeon.',
    style: 'Xinomavro handled to soften its tannin without hiding its tomato leaf and dried rose, with the Amyndeon fruit lighter and more floral than Naoussa\'s.',
    t: 'Ramnista Xinomavro: tomato leaf, dried rose, olive, tannin like Barolo',
    why: 'The most reliable name for Naoussa and the producer that makes the Naoussa and Amyndeon contrast concrete, since it holds vineyards in both. Founded by Yiannis Boutaris after leaving the family firm.',
    wines: [
      { n: 'Ramnista', grape: 'Xinomavro', note: 'The estate\'s Naoussa flagship, ageworthy and firmly tannic' },
      { n: 'Kali Riza', grape: 'Xinomavro', note: 'Amyndeon Xinomavro from own-rooted vines on sand' },
      { n: 'Samaropetra', grape: 'Sauvignon Blanc and Roditis', note: 'A white from Amyndeon\'s altitude' }
    ],
    traps: [
      'Naoussa PDO is Xinomavro alone and red only; Amyndeon also permits rose and sparkling',
      'Xinomavro means acid black and mimics Nebbiolo structurally, a standing blind-tasting decoy',
      'Boutari and Kir-Yianni are separate companies with a shared family origin'
    ]
  },
  {
    id: 'p-gerovassiliou', p: 'Ktima Gerovassiliou',
    country: 'Germany, Austria and Central Europe', r: 'Greece', sub: 'Epanomi (Macedonia)',
    founded: '1981',
    holdings: 'A single estate vineyard on sandy soils at Epanomi, on a peninsula south of Thessaloniki, planted to Malagousia, Assyrtiko and international varieties.',
    style: 'Polished and aromatic, with Malagousia\'s peach and jasmine as the house signature and clean barrel work on the whites.',
    t: 'Malagousia rescued from extinction: peach, jasmine, Epanomi freshness',
    why: 'Vangelis Gerovassiliou is the standard answer to a question about saving a Greek variety. Malagousia went from a handful of surviving vines to a national white, and this estate did it.',
    wines: [
      { n: 'Malagousia', grape: 'Malagousia', note: 'The variety this estate rescued from near extinction' },
      { n: 'Ktima Gerovassiliou White', grape: 'Malagousia and Assyrtiko', note: 'The blend that pairs aromatics with acid' },
      { n: 'Avaton', grape: 'Limnio, Mavroudi and Mavrotragano', note: 'A red built on rare indigenous Greek varieties' }
    ],
    traps: [
      'Malagousia is aromatic but is not a Muscat, and its acid is moderate rather than high',
      'Epanomi is in Macedonia near Thessaloniki, not on an island',
      'Mavrotragano and Limnio are separate rare reds, not synonyms'
    ]
  },
  {
    id: 'p-chappaz', p: 'Marie-Thérèse Chappaz',
    country: 'Germany, Austria and Central Europe', r: 'Switzerland', sub: 'Valais (Fully)',
    founded: '',
    holdings: 'Steep granite terraces at Fully in the Valais, farmed biodynamically and worked largely by hand.',
    style: 'Very low yields and long ageing, with dry and sweet Petite Arvine that keeps a salty, rhubarb-edged bite under considerable richness.',
    t: 'Valais biodynamics: Petite Arvine of rhubarb and salt, sweet wines of cut',
    why: 'Switzerland exports almost nothing, so the Court tests whether a candidate can name a Valais grower at all. Petite Arvine is the Valais variety, and Grain Noble ConfidenCiel is the charter for Swiss botrytis wine.',
    wines: [
      { n: 'Petite Arvine Grain Noble ConfidenCiel', grape: 'Petite Arvine', note: 'Botrytised sweet Valais wine, the estate\'s most celebrated bottling' },
      { n: 'Petite Arvine', grape: 'Petite Arvine', note: 'The dry version, the Valais variety a candidate must be able to describe' },
      { n: 'Marsanne Blanche Grain Noble', grape: 'Marsanne', note: 'Known locally as Ermitage, a standing synonym question' }
    ],
    traps: [
      'Chasselas is called Fendant in the Valais and Dorin in the Vaud, one grape with regional names',
      'Ermitage in the Valais is Marsanne, and Johannisberg in the Valais is Silvaner, neither meaning what the name suggests',
      'Grain Noble ConfidenCiel is a producers\' charter for sweet wine, not an appellation'
    ]
  },
  {
    id: 'p-markus-molitor', p: 'Markus Molitor',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Bernkastel-Wehlen (Haus Klosterberg)',
    founded: '',
    holdings: 'One of the larger private Mosel holdings, spread across the middle Mosel and the Saar, including Zeltinger Sonnenuhr, Wehlener Sonnenuhr, Urziger Wurzgarten and Saarburger Rausch.',
    style: 'Wide-ranging and technically exact, made in every sweetness level from bone dry to Trockenbeerenauslese, with capsule colour rather than wording declaring the style.',
    t: 'Slate, herb and beeswax across every sweetness the capsule colour declares',
    why: 'The clearest working example of a German estate solving the sweetness problem with a private code: white capsule for dry, green for off-dry, gold for sweet, with a star system marking the finest lots.',
    wines: [
      { n: 'Zeltinger Sonnenuhr Riesling Auslese', grape: 'Riesling', note: 'The estate\'s home site, released simultaneously in dry, off-dry and sweet versions' },
      { n: 'Wehlener Sonnenuhr Riesling Spätlese', grape: 'Riesling', note: 'The same famous vineyard read through a different house style than Prüm\'s' },
      { n: 'Spätburgunder', grape: 'Pinot Noir', note: 'A reminder that the Mosel grows red wine, small but serious' }
    ],
    traps: [
      'The capsule colour system is the estate\'s own, not German law and not a VDP scheme',
      'An Auslese from this house may be completely dry, which is the Prädikat trap in its purest form'
    ]
  },
  {
    id: 'p-meyer-nakel', p: 'Meyer-Näkel',
    country: 'Germany, Austria and Central Europe', r: 'Ahr', sub: 'Dernau',
    founded: '',
    holdings: 'Steep slate terraces in the Ahr valley, including sites at Dernau, Walporzheim and Neuenahr, planted almost entirely to Spätburgunder.',
    style: 'Cool-climate Pinot Noir on slate: sour cherry, iron and smoke, lighter in body and firmer in acid than Baden\'s limestone reds.',
    t: 'Ahr slate Pinot: sour cherry, iron, smoke, cool-climate German red',
    why: 'The Ahr is one of Germany\'s smallest regions and one of the few planted mostly to red grapes. This estate is the name that makes it examinable, and the counterweight to Baden in any German Pinot question.',
    wines: [
      { n: 'Dernauer Pfarrwingert Spätburgunder GG', grape: 'Pinot Noir', note: 'Slate-grown Pinot from the estate\'s leading site' },
      { n: 'Walporzheimer Kräuterberg Spätburgunder GG', grape: 'Pinot Noir', note: 'The warmer, more structured of the Ahr parcels' },
      { n: 'Spätburgunder Blauschiefer', grape: 'Pinot Noir', note: 'The blue slate bottling that names the region\'s geology outright' }
    ],
    traps: [
      'The Ahr is a tributary of the Rhine north of the Mosel, further north than most red wine regions in Europe',
      'Ahr Spätburgunder grows on slate, unlike Baden\'s limestone, which changes the tasting note',
      'Assmannshausen in the Rheingau is a separate historic German Pinot village'
    ]
  },
  {
    id: 'p-moric', p: 'Moric',
    country: 'Germany, Austria and Central Europe', r: 'Burgenland', sub: 'Mittelburgenland (Neckenmarkt and Lutzmannsburg)',
    founded: '2001',
    holdings: 'Old-vine Blaufränkisch parcels contracted and farmed at Neckenmarkt and Lutzmannsburg in the Mittelburgenland, with the cellar at Grosshoflein.',
    style: 'Deliberately Burgundian: whole-cluster fractions, large neutral casks, pale colour, low extraction, savoury pepper and red fruit over structure.',
    t: 'Old-vine Blaufränkisch read as Burgundy: pale, peppery, savoury, unforced',
    why: 'Roland Velich reversed the direction of Austrian red wine, replacing new barrique and extraction with old vines and restraint. Moric is the name the Court expects for modern Blaufränkisch.',
    wines: [
      { n: 'Blaufränkisch Alte Reben Neckenmarkt', grape: 'Blaufränkisch', note: 'Old vines on slate and schist, the estate\'s most structured red' },
      { n: 'Blaufränkisch Alte Reben Lutzmannsburg', grape: 'Blaufränkisch', note: 'Heavier clay soils, rounder and darker in fruit' },
      { n: 'Blaufränkisch Burgenland', grape: 'Blaufränkisch', note: 'The entry wine that carries the house argument at low price' }
    ],
    traps: [
      'Mittelburgenland DAC is the Blaufränkisch appellation; Leithaberg DAC covers both reds and whites',
      'Zweigelt is a twentieth-century crossing of Blaufränkisch and Saint Laurent, not a synonym for Blaufränkisch',
      'Roland Velich\'s brother Heinz makes the Chardonnay at Weingut Velich, a separate estate'
    ]
  },
  {
    id: 'p-movia', p: 'Movia',
    country: 'Germany, Austria and Central Europe', r: 'Slovenia', sub: 'Goriška Brda',
    founded: '1820',
    holdings: 'Vineyards straddling the border between Goriska Brda in Slovenia and Collio in Italy, farmed biodynamically.',
    style: 'Extended skin contact, long ageing, no added sulphur and no filtration, producing amber-toned whites that ask to be read as textural wines rather than aromatic ones.',
    t: 'Brda by moon and instinct: skin-contact Rebula, Puro disgorged under water',
    why: 'With Gravner and Radikon across the Italian border, Movia is one of the founding names of the modern skin-contact white movement, and it supplies the Slovenian half of a question that candidates usually answer only from Friuli.',
    wines: [
      { n: 'Lunar', grape: 'Ribolla Gialla', note: 'Months of skin contact in wood, unfiltered and unsulphured' },
      { n: 'Veliko Bianco', grape: 'White blend', note: 'The estate\'s long-aged white flagship' },
      { n: 'Puro', grape: 'Ribolla Gialla or Pinot Noir', note: 'Sparkling wine sold on its lees and disgorged by the drinker under water' }
    ],
    traps: [
      'Rebula in Slovenia is Ribolla Gialla in Italy, one grape across one border',
      'Goriska Brda and Collio are the same hills divided by a national frontier',
      'Skin-contact white is an old regional practice, not an invention of the natural wine era'
    ]
  },
  {
    id: 'p-muller-catoir', p: 'Müller-Catoir',
    country: 'Germany, Austria and Central Europe', r: 'Pfalz', sub: 'Haardt (Neustadt)',
    founded: '1744',
    holdings: 'Sites around Haardt, Gimmeldingen and Mussbach, including Haardter Burgergarten, Breumel in den Mauern and Mussbacher Eselshaut.',
    style: 'Exceptionally aromatic and high in extract, and the reference house for Pfalz varieties beyond Riesling, particularly Rieslaner and Scheurebe.',
    t: 'Pfalz aromatics at full volume: Rieslaner, Scheurebe, Muskateller, explosive',
    why: 'The name to reach for when a question moves past Riesling into German crossings. Rieslaner and Scheurebe questions almost always route through this estate.',
    wines: [
      { n: 'Haardter Bürgergarten Riesling GG', grape: 'Riesling', note: 'The estate\'s leading dry site' },
      { n: 'Rieslaner Auslese', grape: 'Rieslaner', note: 'The house that kept this crossing alive as a serious sweet wine' },
      { n: 'Scheurebe Kabinett', grape: 'Scheurebe', note: 'Grapefruit and blackcurrant leaf, the classic Pfalz aromatic' },
      { n: 'Muskateller trocken', grape: 'Muskateller', note: 'Dry Muscat, a useful blind-tasting decoy against Scheurebe' }
    ],
    traps: [
      'Rieslaner is a crossing of Silvaner and Riesling, not a Riesling clone',
      'Scheurebe\'s parentage is Riesling and Bukettraube, not Riesling and Silvaner as older texts state',
      'Müller-Catoir has no connection to Müller-Thurgau despite the shared name'
    ]
  },
  {
    id: 'p-nikolaihof', p: 'Nikolaihof',
    country: 'Germany, Austria and Central Europe', r: 'Wachau', sub: 'Mautern',
    founded: '',
    holdings: 'Sites at Mautern on the south bank of the Danube, including Im Weingebirge, plus the Steiner Hund across the boundary in Kremstal. Demeter certified since 1971.',
    style: 'Savoury, herbal and unhurried: long lees ageing in large old oak, low sulphur, and releases held back many years, giving chamomile, honey and dried herb rather than primary fruit.',
    t: 'Roman cellar, Demeter since 1971: chamomile, honey, decades-late release',
    why: 'The oldest certified biodynamic estate in Austria and the usual answer to a question about biodynamic pioneers outside France. Its late releases also make it the reference for aged Grüner Veltliner.',
    wines: [
      { n: 'Grüner Veltliner Im Weingebirge Federspiel', grape: 'Grüner Veltliner', note: 'The house style at a lower ripeness tier, herbal rather than exotic' },
      { n: 'Riesling Vinothek', grape: 'Riesling', note: 'Released after well over a decade in cask, the estate\'s signature gesture' },
      { n: 'Riesling Steiner Hund', grape: 'Riesling', note: 'A Kremstal site under the same ownership' }
    ],
    traps: [
      'Mautern lies on the south bank of the Danube, opposite the more famous Wachau villages',
      'The Vinothek bottlings are held back by the estate, not a legal reserve category',
      'Demeter certification in 1971 predates most of the biodynamic estates candidates name in Burgundy'
    ]
  },
  {
    id: 'p-peter-lauer', p: 'Peter Lauer',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Saar, Ayl',
    founded: '',
    holdings: 'Parcels within the Ayler Kupp and neighbouring Saar sites, bottled separately by parcel and by cask.',
    style: 'Off-dry more often than dry or sweet, saline and herbal, with the old parcel names restored inside the modern Einzellage boundary.',
    t: 'Ayl in barrel-numbered lots: herbs, salt, apple skin, faint sweet tension',
    why: 'The clearest modern case against the 1971 German wine law: Lauer labels the historical parcel names that the law absorbed into single large Einzellagen, using cask numbers to keep them apart.',
    wines: [
      { n: 'Ayler Kupp Riesling Fass 6 Senkrecht', grape: 'Riesling', note: 'Cask numbering used to identify parcels the 1971 law folded together' },
      { n: 'Ayler Kupp Riesling Unterstenberg', grape: 'Riesling', note: 'A restored parcel name, the estate\'s argument against the 1971 consolidation' },
      { n: 'Ayler Kupp Riesling Kern', grape: 'Riesling', note: 'A dry bottling from the heart of the site' }
    ],
    traps: [
      'The Fass numbers are cask identifiers, not a quality ranking',
      'Most of these wines sit at feinherb rather than trocken, which catches candidates who read Saar as sweet or dry only'
    ]
  },
  {
    id: 'p-robert-weil', p: 'Robert Weil',
    country: 'Germany, Austria and Central Europe', r: 'Rheingau', sub: 'Kiedrich',
    founded: '1875',
    holdings: 'The largest holding in the Kiedricher Grafenberg, together with Kiedricher Turmberg and Kiedricher Klosterberg.',
    style: 'Meticulous and polished at both ends of the scale: clean dry Grosses Gewächs and a full range of botrytis Prädikat picked berry by berry.',
    t: 'Kiedrich polish: citrus blossom and botrytis honey at exam-clean precision',
    why: 'The Rheingau estate that produces the full botrytis ladder every year rather than occasionally, and the usual counterweight to Egon Müller when a question asks for great German sweet wine outside the Mosel.',
    wines: [
      { n: 'Kiedricher Gräfenberg Riesling Trockenbeerenauslese', grape: 'Riesling', note: 'Germany\'s most consistently produced great botrytis Riesling' },
      { n: 'Kiedricher Gräfenberg Riesling GG', grape: 'Riesling', note: 'The dry flagship from the estate\'s Grosse Lage' },
      { n: 'Kiedricher Gräfenberg Riesling Auslese', grape: 'Riesling', note: 'Gold capsule selections sit above the standard bottling' }
    ],
    traps: [
      'Grafenberg is in Kiedrich; do not confuse it with Rheingau sites at Erbach or Rudesheim',
      'The Rheingau\'s Riesling is generally drier and firmer than the Mosel\'s, even at the same Prädikat'
    ]
  },
  {
    id: 'p-schafer-frohlich', p: 'Schäfer-Fröhlich',
    country: 'Germany, Austria and Central Europe', r: 'Nahe', sub: 'Bockenau',
    founded: '',
    holdings: 'Based at Bockenau in a side valley, with Grosse Lage parcels including Bockenauer Felseneck, Schlossbockelheimer Felsenberg and Kupfergrube, and Monzinger Halenberg.',
    style: 'Spontaneously fermented, markedly reductive and flinty in youth, dry at the top of the range and searingly clear.',
    t: 'Spontaneous, flinty, reductive Nahe Riesling of blinding clarity',
    why: 'The modern reference for reductive, struck-match dry German Riesling, and the reason candidates are asked to distinguish deliberate reduction from fault in blind tasting.',
    wines: [
      { n: 'Bockenauer Felseneck Riesling GG', grape: 'Riesling', note: 'The home site, the estate\'s most quoted dry bottling' },
      { n: 'Schlossböckelheimer Kupfergrube Riesling GG', grape: 'Riesling', note: 'Volcanic soils, the firmest expression in the range' },
      { n: 'Bockenauer Felseneck Riesling Auslese', grape: 'Riesling', note: 'Botrytis selections from the same vineyard' }
    ],
    traps: [
      'The smoky reduction is a house signature, not a regional marker for the Nahe',
      'Bockenau lies off the Nahe itself in a tributary valley, so the estate name does not name a riverside village'
    ]
  },
  {
    id: 'p-schloss-gobelsburg', p: 'Schloss Gobelsburg',
    country: 'Germany, Austria and Central Europe', r: 'Kamptal', sub: 'Gobelsburg (Langenlois)',
    founded: '1171',
    holdings: 'Vineyards around Gobelsburg and Langenlois including shares of Heiligenstein, Lamm, Gaisberg and Grub, historically tied to the Cistercian abbey of Zwettl.',
    style: 'Classical and unshowy, with the Tradition bottlings made by nineteenth-century cellar practice: large casks, racking by the moon and extended ageing before release.',
    t: 'Cistercian cellar, Tradition cask ageing: nut, orchard fruit, old-style depth',
    why: 'The Cistercian link makes it the Austrian parallel to Burgundy\'s monastic history, and the Tradition range is the clearest living demonstration of pre-modern cellar technique in Central Europe.',
    wines: [
      { n: 'Grüner Veltliner Tradition', grape: 'Grüner Veltliner', note: 'Made by reconstructed historical cellar method, the estate\'s intellectual project' },
      { n: 'Riesling Ried Heiligenstein', grape: 'Riesling', note: 'The Kamptal\'s great site under monastic ownership' },
      { n: 'Grüner Veltliner Ried Lamm', grape: 'Grüner Veltliner', note: 'Deep loess, the fullest Grüner of the range' }
    ],
    traps: [
      'The estate is run under lease by its winemaker rather than by the abbey directly',
      'Tradition is a house range describing method, not an Austrian legal category',
      'Gobelsburg is in the Kamptal, not the Wachau, despite sharing growers and grapes'
    ]
  },
  {
    id: 'p-schloss-johannisberg', p: 'Schloss Johannisberg',
    country: 'Germany, Austria and Central Europe', r: 'Rheingau', sub: 'Geisenheim (Johannisberg)',
    founded: '1100',
    holdings: 'A single contiguous estate vineyard on the slope below the schloss, planted entirely to Riesling.',
    style: 'Upright, apple-scented Rheingau Riesling made across the full Prädikat ladder, with the style of each bottling declared by the colour of the capsule.',
    t: 'Rheingau history in a capsule colour: apple, smoke, upright acid',
    why: 'The estate carries two of German wine\'s founding stories: the 1720 replanting to Riesling alone and the 1775 late-messenger tale that named Spätlese. It is also the standard example of Prädikat declared by capsule colour.',
    wines: [
      { n: 'Grünlack Spätlese', grape: 'Riesling', note: 'The green capsule, tied to the estate\'s claim on the origin of Spätlese' },
      { n: 'Silberlack Grosses Gewächs', grape: 'Riesling', note: 'The dry flagship under the VDP\'s top dry designation' },
      { n: 'Rotlack Kabinett', grape: 'Riesling', note: 'The red capsule, the entry into the estate\'s colour code' }
    ],
    traps: [
      'Johannisberg here is a Rheingau Ortsteil; Johannisberg in Switzerland\'s Valais is a synonym for Silvaner',
      'The Spätlese origin story is a claim the estate makes, useful to attribute rather than assert',
      'Grosslage Erntebringer covers Johannisberg and neighbouring villages, so a label reading Johannisberger Erntebringer is not Schloss Johannisberg'
    ]
  },
  {
    id: 'p-schloss-vollrads', p: 'Schloss Vollrads',
    country: 'Germany, Austria and Central Europe', r: 'Rheingau', sub: 'Oestrich-Winkel',
    founded: '1211',
    holdings: 'A single contiguous estate vineyard around the moated tower at Winkel, planted overwhelmingly to Riesling.',
    style: 'Restrained and classical Rheingau Riesling across dry, off-dry and sweet, labelled by the estate name alone without a vineyard designation.',
    t: 'Eight centuries of Winkel Riesling: apple, herb, restrained sweetness',
    why: 'The estate with the oldest documented record of wine sales in Germany, dated 1211, and the standard example of a German property permitted to label by estate rather than by vineyard.',
    wines: [
      { n: 'Schloss Vollrads Riesling Kabinett', grape: 'Riesling', note: 'The estate name stands in place of any vineyard name on the label' },
      { n: 'Schloss Vollrads Riesling Spätlese', grape: 'Riesling', note: 'The classical Rheingau reading of the Prädikat' }
    ],
    traps: [
      'The Greiffenclau family\'s ownership ended in the 1990s; the estate is no longer in family hands',
      'Schloss Johannisberg, Schloss Vollrads and Schloss Reinhartshausen are distinct Rheingau estates that candidates blur'
    ]
  },
  {
    id: 'p-szepsy', p: 'Szepsy',
    country: 'Germany, Austria and Central Europe', r: 'Tokaj', sub: 'Mád',
    founded: '',
    holdings: 'Parcels across the classified sites of Mad and its neighbours, including Szent Tamás, Urban, Betsek and Nyulaszo, farmed at very low yields.',
    style: 'Dry Furmint of extreme concentration and acid, barrel fermented and site specific, alongside Aszu made only when the year permits.',
    t: 'The dry Furmint standard: smoke, lime, chalk and formidable acid',
    why: 'István Szepsy is the name attached to the dry Furmint movement, the development that changed Tokaj from a sweet wine museum into a working white wine region. His family name also runs back to the early history of Aszu.',
    wines: [
      { n: 'Szent Tamás Furmint', grape: 'Furmint', note: 'Dry single-vineyard Furmint, the model for the modern category' },
      { n: 'Urban Furmint', grape: 'Furmint', note: 'A second classified site, stonier and tighter' },
      { n: 'Tokaji Aszú 6 Puttonyos', grape: 'Furmint and Harslevelu', note: 'Made in small quantity and only in suitable vintages' }
    ],
    traps: [
      'Dry Furmint carries no puttonyos and no Aszu designation',
      'Mad is the village at the centre of the classified sites, not a producer name',
      'Furmint\'s high acid and late ripening make it a common blind-tasting decoy against Chenin Blanc and Riesling'
    ]
  },
  {
    id: 'p-royal-tokaji', p: 'The Royal Tokaji Wine Company',
    country: 'Germany, Austria and Central Europe', r: 'Tokaj', sub: 'Mád',
    founded: '1990',
    holdings: 'Parcels across the historically classified vineyards of Mad and its neighbours, including Mézes Mály, Szent Tamás, Nyulaszo and Betsek.',
    style: 'Single-vineyard Aszu bottled by site, with the apricot and orange marmalade of botrytis carried on Furmint\'s very high acid.',
    t: 'First-growth Tokaj rebuilt: apricot, orange marmalade, saline Furmint acid',
    why: 'Founded in 1990 by foreign and local partners, it was the first major post-communist investment in Tokaj and the venture that restored single-vineyard labelling to a region whose classification predates 1855 by more than a century.',
    wines: [
      { n: 'Mézes Mály Aszú 6 Puttonyos', grape: 'Furmint and Harslevelu', note: 'Historically ranked among the very highest vineyards in Tokaj' },
      { n: 'Szent Tamás Aszú 6 Puttonyos', grape: 'Furmint and Harslevelu', note: 'A first growth site, firmer and stonier than Mézes Mály' },
      { n: 'Aszú 5 Puttonyos Red Label', grape: 'Furmint and Harslevelu', note: 'The widely distributed benchmark for the category' },
      { n: 'Essencia', grape: 'Furmint', note: 'Free-run nectar, produced only in suitable vintages' }
    ],
    traps: [
      'Tokaj\'s vineyard classification dates from the eighteenth century, with a royal decree in 1737 creating a closed production district',
      'Puttonyos 3 and 4 were abolished; modern Aszú is labelled 5 or 6, or without a number, at a minimum of 120 grams per litre of residual sugar',
      'Tokaj is the place and Tokaji the wine, and the region straddles into Slovakia'
    ]
  },
  {
    id: 'p-thymiopoulos', p: 'Thymiopoulos Vineyards',
    country: 'Germany, Austria and Central Europe', r: 'Greece', sub: 'Naoussa (Trilofos)',
    founded: '',
    holdings: 'Vineyards on sandy and clay soils at Trilofos in the eastern part of Naoussa, farmed organically, with plantings also at Rapsani.',
    style: 'Xinomavro made approachable young: whole-bunch lift, gentle extraction, bright red cherry and tomato skin without punishing tannin.',
    t: 'Naoussa made drinkable young: red cherry, tomato skin, sappy Xinomavro',
    why: 'Apostolos Thymiopoulos is the modern face of Naoussa and the counterweight to the traditional tannic house style. His Rapsani also carries the three-variety blend the exam expects for that PDO.',
    wines: [
      { n: 'Earth and Sky', grape: 'Xinomavro', note: 'The estate\'s top Naoussa bottling, from old vines' },
      { n: 'Young Vines Xinomavro', grape: 'Xinomavro', note: 'The wine that showed Xinomavro could be drunk early' },
      { n: 'Rapsani Terra Petra', grape: 'Xinomavro, Krassato and Stavroto', note: 'The Mount Olympus appellation and its three-grape requirement' }
    ],
    traps: [
      'Rapsani PDO requires Xinomavro with Krassato and Stavroto; Naoussa requires Xinomavro alone',
      'Xinomavro\'s pale colour is varietal, not a sign of light extraction or a young wine',
      'Naoussa sits in Macedonia in northern Greece, not in the Peloponnese'
    ]
  },
  {
    id: 'p-oremus', p: 'Tokaj Oremus',
    country: 'Germany, Austria and Central Europe', r: 'Tokaj', sub: 'Tolcsva',
    founded: '',
    holdings: 'Vineyards around Tolcsva in the northern part of Tokaj, on volcanic rhyolite and clay, under the ownership of the Alvarez family of Vega Sicilia.',
    style: 'Aszu of considerable structure and long cask ageing, alongside Mandolas, one of the dry Furmints that established the modern category.',
    t: 'Furmint both ways: dry Mandolas stone fruit, Aszu of orange and saffron',
    why: 'The Spanish ownership makes it a cross-region question, and Mandolas is one of the bottlings a candidate should name when asked how Tokaj rebuilt itself on dry wine.',
    wines: [
      { n: 'Tokaji Aszú 5 Puttonyos', grape: 'Furmint and Harslevelu', note: 'Long cellar ageing before release, in the Vega Sicilia manner' },
      { n: 'Mandolás', grape: 'Furmint', note: 'An early and influential dry Furmint' }
    ],
    traps: [
      'Oremus is the estate name and also a historic vineyard name in the region',
      'Aszú Eszencia was a category above 6 puttonyos, distinct from Eszencia itself',
      'Vega Sicilia is Ribera del Duero, so one owner appears in two unrelated answers'
    ]
  },
  {
    id: 'p-van-volxem', p: 'Van Volxem',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Saar, Wiltingen',
    founded: '',
    holdings: 'A large Saar holding assembled from old and abandoned terraces, including parcels in Scharzhofberg, Wiltinger Gottesfuss, Kanzemer Altenberg and Ockfener Geisberg',
    style: 'Dry, low in alcohol, fermented and aged in large neutral oak Fuder, aiming at the pre-1900 Saar model of savoury weight rather than sweetness.',
    t: 'Low-alcohol dry Saar Riesling from old vines, Fuder-aged and quietly savoury',
    why: 'The estate that made the case for dry Saar Riesling at a time when the Saar meant sweetness, and the usual example of vineyard restoration on abandoned slate terraces.',
    wines: [
      { n: 'Scharzhofberger Riesling', grape: 'Riesling', note: 'Dry Riesling from the Saar\'s most famous site, the direct contrast to Egon Müller' },
      { n: 'Wiltinger Gottesfuss Alte Reben', grape: 'Riesling', note: 'Ungrafted old vines, the estate\'s most concentrated bottling' },
      { n: 'Kanzemer Altenberg', grape: 'Riesling', note: 'Steep terraced slate, restored from abandonment' }
    ],
    traps: [
      'A Scharzhofberger label is not automatically Egon Müller; several growers hold parcels in the vineyard',
      'Dry Saar Riesling is a modern revival of a nineteenth-century norm, not a new invention'
    ]
  },
  {
    id: 'p-keller', p: 'Weingut Keller',
    country: 'Germany, Austria and Central Europe', r: 'Rheinhessen', sub: 'Flörsheim-Dalsheim',
    founded: '1789',
    holdings: 'Grosse Lage parcels at Westhofen, including Morstein, Kirchspiel, Abtserde within Brunnenhauschen, and the Dalsheimer Hubacker, with later acquisitions on the Roter Hang at Nierstein.',
    style: 'Dry Riesling of extreme tension built on limestone and clay, low in alcohol for its concentration, with long lees ageing and no obvious oak.',
    t: 'Rheinhessen limestone under extreme tension: lime oil, salt, no fat',
    why: 'The estate that turned Rheinhessen from Liebfraumilch shorthand into the source of Germany\'s most sought-after dry Riesling, and the owner of G-Max, the most expensive dry Riesling in the country.',
    wines: [
      { n: 'G-Max', grape: 'Riesling', note: 'Germany\'s most expensive dry Riesling, from a site the estate does not declare' },
      { n: 'Westhofener Morstein Riesling GG', grape: 'Riesling', note: 'Deep limestone clay, the estate\'s most structured named site' },
      { n: 'Abtserde Riesling GG', grape: 'Riesling', note: 'A historic parcel name within Brunnenhauschen, restored to the label' },
      { n: 'Westhofener Kirchspiel Riesling GG', grape: 'Riesling', note: 'The saltier, more linear counterpart to Morstein' },
      { n: 'Riesling trocken', grape: 'Riesling', note: 'The entry wine that carries the house signature at low alcohol' }
    ],
    traps: [
      'Rheinhessen is Germany\'s largest region by area and its reputation now rests on a handful of Westhofen and Nierstein growers',
      'G-Max carries no vineyard designation; the source is deliberately undeclared',
      'Niersteiner Gutes Domtal is a Grosslage, not a vineyard, and has nothing to do with the Roter Hang sites'
    ]
  },
  {
    id: 'p-nigl', p: 'Weingut Nigl',
    country: 'Germany, Austria and Central Europe', r: 'Kremstal', sub: 'Senftenberg',
    founded: '',
    holdings: 'Cool, high parcels in the Krems valley at Senftenberg, including Ried Piri and Ried Hochacker, on gneiss with loess below.',
    style: 'High-strung and citric, with Grüner Veltliner kept peppery rather than broad and Riesling made in a taut, mineral register.',
    t: 'Kremstal gneiss and loess: citrus, pepper, high-strung clarity',
    why: 'The Kremstal\'s most quoted estate, needed to complete the Danube trio of Wachau, Kremstal and Kamptal in any Austrian white question.',
    wines: [
      { n: 'Riesling Privat', grape: 'Riesling', note: 'The estate\'s top selection, from its coolest sites' },
      { n: 'Grüner Veltliner Ried Piri', grape: 'Grüner Veltliner', note: 'The Kremstal reference for peppery, structured Grüner' },
      { n: 'Grüner Veltliner Freiheit', grape: 'Grüner Veltliner', note: 'The entry bottling that shows the house line at low weight' }
    ],
    traps: [
      'Privat is the estate\'s own reserve designation, not a legal term',
      'Senftenberg lies up a side valley and is cooler than the Krems riverside sites',
      'Kremstal DAC covers both Grüner Veltliner and Riesling'
    ]
  },
  {
    id: 'p-prager', p: 'Weingut Prager',
    country: 'Germany, Austria and Central Europe', r: 'Wachau', sub: 'Weissenkirchen',
    founded: '',
    holdings: 'Steep terraced parcels at Weissenkirchen, including Achleiten, Klaus, Steinriegl and the high-altitude Wachstum Bodenstein planting.',
    style: 'Cooler and more upright than the Loiben estates: stony, saline Riesling with a long dry finish and a deliberate resistance to weight.',
    t: 'Weissenkirchen terraces: Achleiten stone, lime, and a cold upright spine',
    why: 'The Weissenkirchen reference and the estate most often used to show that the Wachau is not one style: its wines are leaner and cooler than the Loiben and Durnstein benchmarks.',
    wines: [
      { n: 'Riesling Ried Achleiten Smaragd', grape: 'Riesling', note: 'Gfohl gneiss and amphibolite, the Wachau\'s most distinctive terroir marker' },
      { n: 'Riesling Ried Klaus Smaragd', grape: 'Riesling', note: 'The warmer Weissenkirchen site, rounder and riper' },
      { n: 'Grüner Veltliner Wachstum Bodenstein', grape: 'Grüner Veltliner', note: 'Planted high on the slope as a response to warming, from massal selection' }
    ],
    traps: [
      'Achleiten\'s amphibolite is distinct from the gneiss of Kellerberg and Loibenberg',
      'Wachstum is a house designation meaning growth, not a legal term',
      'Weissenkirchen sits west and upriver of Durnstein, in a cooler part of the valley'
    ]
  },
  {
    id: 'p-wieninger', p: 'Weingut Wieninger',
    country: 'Germany, Austria and Central Europe', r: 'Vienna', sub: 'Stammersdorf and Nussberg',
    founded: '',
    holdings: 'Vineyards inside the city limits of Vienna on the Bisamberg and the Nussberg, farmed biodynamically.',
    style: 'Co-planted field blends harvested and fermented together, giving orchard fruit, herb and a savoury breadth no single variety produces.',
    t: 'Vienna\'s Gemischter Satz: field-blend orchard fruit, herb, Nussberg lift',
    why: 'Vienna is the only major capital with significant commercial vineyards within the city, and Wiener Gemischter Satz DAC is the only appellation in the world built on co-planting rules. This is the estate that carried that argument.',
    wines: [
      { n: 'Wiener Gemischter Satz Ried Nussberg', grape: 'Co-planted white field blend', note: 'Single-vineyard field blend, the top expression of the category' },
      { n: 'Wiener Gemischter Satz DAC', grape: 'Co-planted white field blend', note: 'The city\'s own appellation, with legally defined co-planting rules' },
      { n: 'Grand Select', grape: 'White blend', note: 'The estate\'s barrel-aged white flagship' }
    ],
    traps: [
      'Gemischter Satz requires at least three white varieties planted together in one vineyard, harvested and vinified together, with no variety above a set ceiling',
      'A Gemischter Satz is a field blend, not a blend assembled after fermentation',
      'Wien is a wine region in Austrian law, not merely a city'
    ]
  },
  {
    id: 'p-kracher', p: 'Weinlaubenhof Kracher',
    country: 'Germany, Austria and Central Europe', r: 'Burgenland', sub: 'Illmitz (Neusiedlersee)',
    founded: '',
    holdings: 'Vineyards in the Seewinkel on the flat eastern shore of the Neusiedlersee, where shallow water and autumn mist make botrytis reliable almost every year.',
    style: 'Numbered Trockenbeerenauslese released in two parallel lines each vintage: Zwischen den Seen aged in large neutral cask for pure fruit, Nouvelle Vague in new barrique for spice and toast.',
    t: 'Lake Neusiedl botrytis: mango, honey, Nouvelle Vague oak or steel',
    why: 'The reference for Austrian botrytis wine and the producer that made Welschriesling a serious sweet grape. The two-line numbering system is itself an exam question.',
    wines: [
      { n: 'Trockenbeerenauslese Zwischen den Seen', grape: 'Welschriesling, Scheurebe and others', note: 'Neutral ageing, mango and honey without oak' },
      { n: 'Trockenbeerenauslese Nouvelle Vague', grape: 'Chardonnay, Traminer and others', note: 'New barrique, the deliberately modern counterpart' },
      { n: 'Grande Cuvée Trockenbeerenauslese', grape: 'Blend', note: 'The blended summit of the numbered collection' },
      { n: 'Beerenauslese Cuvée', grape: 'Welschriesling and Chardonnay', note: 'The accessible entry into Neusiedlersee botrytis' }
    ],
    traps: [
      'Zwischen den Seen and Nouvelle Vague describe ageing vessel, not sweetness level',
      'Welschriesling is unrelated to Riesling',
      'Ausbruch is restricted to the town of Rust and is not a category Illmitz can use'
    ]
  },
  {
    id: 'p-willi-schaefer', p: 'Willi Schaefer',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Graach',
    founded: '',
    holdings: 'A very small holding, only a few hectares, concentrated in Graacher Domprobst and Graacher Himmelreich.',
    style: 'Lightweight, transparent and high in acid, bottled in numerous small lots from the same vineyard and distinguished by cask number.',
    t: 'Graach in miniature: slate dust, white peach, a line that quivers',
    why: 'The name examiners reach for when they want a Mosel grower whose entire reputation rests on two adjacent vineyards and on scale so small that allocation is the story.',
    wines: [
      { n: 'Graacher Domprobst Riesling Spätlese', grape: 'Riesling', note: 'The firmer, stonier of the two Graach sites and the estate\'s calling card' },
      { n: 'Graacher Himmelreich Riesling Kabinett', grape: 'Riesling', note: 'The softer neighbour, the classic Domprobst comparison' }
    ],
    traps: [
      'Cask numbers on the label distinguish lots of the same Prädikat, they are not quality tiers',
      'Domprobst and Himmelreich are both Graach Einzellagen, not villages'
    ]
  },
  {
    id: 'p-wittmann', p: 'Wittmann',
    country: 'Germany, Austria and Central Europe', r: 'Rheinhessen', sub: 'Westhofen',
    founded: '',
    holdings: 'Westhofen Grosse Lage sites including Morstein, Kirchspiel, Aulerde and Brunnenhauschen, farmed organically and then biodynamically.',
    style: 'Broad, chalky and dry, with more breadth and less nervous tension than Keller from the same village.',
    t: 'Westhofen limestone: chalk dust, yellow plum, dry Riesling with breadth',
    why: 'The second name of Westhofen and the standard demonstration that two neighbouring estates working the same Grosse Lage produce recognisably different wines.',
    wines: [
      { n: 'Westhofener Morstein Riesling GG', grape: 'Riesling', note: 'The same great limestone site, read in a rounder house style' },
      { n: 'Westhofener Kirchspiel Riesling GG', grape: 'Riesling', note: 'Cooler and saltier, the classic Morstein contrast' },
      { n: 'Westhofener Aulerde Riesling GG', grape: 'Riesling', note: 'Sandier soil, earlier drinking, useful for soil comparison questions' }
    ],
    traps: [
      'Morstein is shared by several growers, so the vineyard name alone does not identify the estate',
      'Rheinhessen\'s top wines are dry; the region\'s sweet reputation is historical and commercial, not qualitative'
    ]
  },
  {
    id: 'p-thanisch', p: 'Wwe. Dr. H. Thanisch, Erben Thanisch',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Bernkastel (Doctor)',
    founded: '',
    holdings: 'A small share of the Bernkasteler Doctor, the vineyard directly above the town, alongside Bernkasteler Lay and Graacher Himmelreich.',
    style: 'Classical fruity-styled Bernkastel Riesling: firm, smoky, with the Doctor\'s characteristic density behind the acid.',
    t: 'The Doctor above Bernkastel: smoke, apple skin, dense and upright',
    why: 'The Bernkasteler Doctor is the German vineyard most often cited for record land values, and this estate is the name attached to it on a wine list.',
    wines: [
      { n: 'Bernkasteler Doctor Riesling Spätlese', grape: 'Riesling', note: 'The most expensive vineyard land in Germany by area' },
      { n: 'Bernkasteler Doctor Riesling Auslese', grape: 'Riesling', note: 'The site\'s fullest expression in a ripe year' }
    ],
    traps: [
      'Two estates share the Thanisch name after an inheritance split: Erben Thanisch and Erben Müller-Burggraef',
      'The Doctor is divided among only a few owners, including both Thanisch estates and Wegeler'
    ]
  },
  {
    id: 'w-g-max', p: 'G-Max',
    by: 'p-keller',
    country: 'Germany, Austria and Central Europe', r: 'Rheinhessen', sub: 'Westhofen and Dalsheim',
    founded: '',
    holdings: 'Made from old Riesling vines on limestone and clay in Rheinhessen; the estate does not declare the vineyard on the label.',
    style: 'Dry Riesling of exceptional tension: lime oil, smoke and salt on a very long, very narrow frame, with no oak signature and no obvious weight.',
    t: 'Limestone Riesling of extreme scarcity: lime oil, smoke, seamless tension',
    why: 'The reference point for what dry German Riesling now commands, and the clearest example of a great German wine sold without a vineyard designation at all.',
    wines: [
      { n: 'G-Max', grape: 'Riesling', note: 'Germany\'s most expensive dry Riesling, produced in tiny quantity' }
    ],
    traps: [
      'G-Max carries no Grosse Lage or GG designation because no site is declared',
      'The name honours Klaus Peter Keller\'s grandfather Georg and son Maximilian, not a vineyard',
      'Rheinhessen\'s reputation for bulk sweet wine is historical; this is the region\'s current summit'
    ]
  },
  {
    id: 'w-kracher-tba', p: 'Kracher Trockenbeerenauslese',
    by: 'p-kracher',
    country: 'Germany, Austria and Central Europe', r: 'Burgenland', sub: 'Illmitz (Neusiedlersee)',
    founded: '',
    holdings: 'From vineyards in the Seewinkel beside the shallow Neusiedlersee, where autumn mist and afternoon sun make noble rot a near-annual event.',
    style: 'Released each vintage as a numbered collection in two parallel lines: Zwischen den Seen in large neutral cask for undisturbed botrytis fruit, Nouvelle Vague in new barrique for spice and toast.',
    t: 'Neusiedl botrytis numbered by lot: mango, honey, steel or new oak',
    why: 'The clearest botrytis comparison available in one cellar, since the two lines differ by vessel rather than by fruit. It is also the reason Welschriesling appears on an exam at all.',
    wines: [
      { n: 'Trockenbeerenauslese Zwischen den Seen', grape: 'Welschriesling, Scheurebe and others', note: 'Neutral ageing, the purer fruit line' },
      { n: 'Trockenbeerenauslese Nouvelle Vague', grape: 'Chardonnay, Traminer and others', note: 'New oak, the modern counterpart, numbered alongside' },
      { n: 'Grande Cuvée Trockenbeerenauslese', grape: 'Blend', note: 'The blended summit of the collection' }
    ],
    traps: [
      'The numbers identify lots within a vintage, not a sweetness scale',
      'Zwischen den Seen and Nouvelle Vague describe ageing vessel, not sweetness or site',
      'Welschriesling has no relationship to Riesling, and Ausbruch belongs to Rust, not Illmitz'
    ]
  },
  {
    id: 'w-hermannshohle', p: 'Niederhäuser Hermannshöhle',
    by: 'p-donnhoff',
    country: 'Germany, Austria and Central Europe', r: 'Nahe', sub: 'Niederhausen',
    founded: '',
    holdings: 'A steep site above the Nahe at Niederhausen on mixed slate and volcanic rock, with Dönnhoff holding the leading share.',
    style: 'The Nahe\'s middle position made explicit: the weight of the Rheingau with the transparency of the Mosel, peach and wet stone over a cool herbal length.',
    t: 'The Nahe\'s benchmark site: peach, wet stone, cool herbal length',
    why: 'The vineyard that establishes the Nahe as a region in its own right rather than a compromise between its neighbours. Naming it correctly, with village and site, is a standard Advanced question.',
    wines: [
      { n: 'Niederhäuser Hermannshöhle Riesling GG', grape: 'Riesling', note: 'The dry summit of the Nahe' },
      { n: 'Niederhäuser Hermannshöhle Riesling Spätlese', grape: 'Riesling', note: 'The sweet reading of the same slope' },
      { n: 'Niederhäuser Hermannshöhle Riesling Auslese', grape: 'Riesling', note: 'Botrytis selections in suitable years' }
    ],
    traps: [
      'The Nahe is a separate anbaugebiet, not part of the Mosel or Rheinhessen',
      'Niederhausen is the village and Hermannshöhle the Einzellage; the nearby Hermannsberg is a different site',
      'Oberhauser Brucke, Dönnhoff\'s monopole, is in the neighbouring village and is often confused with it'
    ]
  },
  {
    id: 'w-kellerberg', p: 'Ried Kellerberg',
    by: 'p-fx-pichler',
    country: 'Germany, Austria and Central Europe', r: 'Wachau', sub: 'Dürnstein and Loiben',
    founded: '',
    holdings: 'A terraced primary rock site on gneiss between Durnstein and Loiben, worked by F.X. Pichler, Alzinger, Knoll, Tegernseerhof and Domane Wachau among others',
    style: 'The fullest expression of Wachau Riesling: mango and white pepper over stone, with Smaragd ripeness giving weight that stays dry and long.',
    t: 'Durnstein gneiss under Smaragd ripeness: mango, pepper, weighty and long',
    why: 'The site that best demonstrates what Smaragd means in practice, and the vineyard a candidate should name when asked for a great Wachau terrace. It is shared, so it also tests whether a candidate separates site from producer.',
    wines: [
      { n: 'Riesling Ried Kellerberg Smaragd', grape: 'Riesling', note: 'The Wachau\'s most quoted single vineyard wine' },
      { n: 'Grüner Veltliner Ried Kellerberg Smaragd', grape: 'Grüner Veltliner', note: 'Grüner at maximum weight from the same terraces' }
    ],
    traps: [
      'Smaragd is a Vinea Wachau trademark describing ripeness at harvest and minimum alcohol, not a vineyard classification',
      'Kellerberg is a Wachau ried; Kellerberg names occur elsewhere in Austria and Germany',
      'Ried is the Austrian term for a single vineyard, equivalent to Einzellage'
    ]
  },
  {
    id: 'w-zobinger-heiligenstein', p: 'Ried Zöbinger Heiligenstein',
    by: 'p-brundlmayer',
    country: 'Germany, Austria and Central Europe', r: 'Kamptal', sub: 'Zöbing (Langenlois)',
    founded: '',
    holdings: 'A steep terraced hill of Permian desert sandstone with volcanic material near Zobing, worked by Brundlmayer, Schloss Gobelsburg, Hirsch and others.',
    style: 'Riesling of exotic stone fruit and dusty spice over a dry, faintly warm mineral base, quite unlike the cooler gneiss Rieslings of the Wachau.',
    t: 'Desert sandstone Riesling: exotic stone fruit over a dry, dusty spine',
    why: 'Austria\'s most celebrated Riesling vineyard outside the Wachau, and the answer to any question about Kamptal geology. Its Permian sandstone is the outlier soil in a country of gneiss and loess.',
    wines: [
      { n: 'Riesling Ried Zöbinger Heiligenstein Alte Reben', grape: 'Riesling', note: 'Old-vine bottling from the hill\'s best terraces' },
      { n: 'Riesling Ried Heiligenstein Lyra', grape: 'Riesling', note: 'Named for the trellis system used in the parcel' }
    ],
    traps: [
      'Heiligenstein means holy stone but the site is desert sandstone, not limestone',
      'The vineyard is in the Kamptal, so Smaragd, Federspiel and Steinfeder never appear on its labels',
      'It is shared by several estates, so the site name does not identify the producer'
    ]
  },
  {
    id: 'w-scharzhofberger', p: 'Scharzhofberger',
    by: 'p-egon-muller',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Saar, Wiltingen',
    founded: '',
    holdings: 'A single steep slate Einzellage above the Scharzhof at Wiltingen, of which Egon Müller holds the largest share; Van Volxem, von Hovel and others hold parcels',
    style: 'Very low alcohol, very high acid, and a fruit that reads as apricot and lime blossom rather than as sweetness, with the sugar suspended rather than resting.',
    t: 'Saar slate at its absolute: apricot, lime blossom, acid that never lands',
    why: 'The most famous single vineyard in German wine and the standard example of an Einzellage printed on the label without its village name. Any question about the world\'s costliest white ends here.',
    wines: [
      { n: 'Scharzhofberger Riesling Trockenbeerenauslese', grape: 'Riesling', note: 'The most expensive white wine produced anywhere' },
      { n: 'Scharzhofberger Riesling Auslese Goldkapsel', grape: 'Riesling', note: 'Capsule colour marks selection within a single Prädikat' },
      { n: 'Scharzhofberger Riesling Kabinett', grape: 'Riesling', note: 'The entry that still carries the vineyard\'s signature' }
    ],
    traps: [
      'Scharzhofberger is the vineyard; Scharzberg is the Grosslage that trades on the resemblance',
      'It is a Saar site, and the Saar sits within the Mosel anbaugebiet',
      'Several growers bottle Scharzhofberger, so the name alone does not mean Egon Müller'
    ]
  },
  {
    id: 'w-tokaji-eszencia', p: 'Tokaji Eszencia',
    country: 'Germany, Austria and Central Europe', r: 'Tokaj', sub: '',
    founded: '',
    holdings: 'Made across the Tokaj region from the free-run juice that collects under the weight of aszu berries awaiting processing; produced only in tiny quantity and only in suitable years.',
    style: 'Barely fermentable: sugar so high that alcohol rarely reaches a few degrees, with apricot, orange and a viscous, syrup-like texture, traditionally served on a spoon.',
    t: 'Free-run aszu nectar, barely fermented, taken from a spoon',
    why: 'The most extreme sweet wine in commerce and a fixed exam item: it sits outside the puttonyos ladder, carries a legal minimum sugar far above Trockenbeerenauslese, and takes years to ferment even slightly.',
    wines: [
      { n: 'Eszencia', grape: 'Furmint with Hárslevelű and Sárga Muskotály', note: 'Stands outside the puttonyos scale entirely' }
    ],
    traps: [
      'Eszencia is not a puttonyos level and is not the same as Aszú Eszencia, the old category just above 6 puttonyos',
      'Its alcohol is only a few percent, so it is legally awkward in several markets',
      'The free-run juice is collected under the berries\' own weight, not pressed'
    ]
  },
  {
    id: 'w-wehlener-sonnenuhr', p: 'Wehlener Sonnenuhr',
    by: 'p-jj-prum',
    country: 'Germany, Austria and Central Europe', r: 'Mosel', sub: 'Wehlen',
    founded: '',
    holdings: 'A steep blue Devonian slate Einzellage above Wehlen, named for the sundial built into the slope by Jodocus Prüm in 1842; J.J. Prüm, Dr. Loosen, Markus Molitor, S.A. Prüm and others hold parcels.',
    style: 'The lightest touch on the Mosel: white peach and slate dust at seven to nine percent alcohol, with sweetness that reads as texture rather than as sugar.',
    t: 'Slate sundial Riesling: spritz, white peach, honey arriving twenty years late',
    why: 'The vineyard that defines the fruity-styled middle Mosel and the one a candidate should name first for blue slate. The sundial itself is a common short-answer question.',
    wines: [
      { n: 'Wehlener Sonnenuhr Riesling Spätlese', grape: 'Riesling', note: 'The most quoted Mosel Spätlese in the trade' },
      { n: 'Wehlener Sonnenuhr Riesling Auslese', grape: 'Riesling', note: 'Gold capsule and long gold capsule mark ascending selections' },
      { n: 'Wehlener Sonnenuhr Riesling Kabinett', grape: 'Riesling', note: 'The lightest tier, and the hardest to make well' }
    ],
    traps: [
      'Sonnenuhr means sundial and appears at Zeltingen and Brauneberg as well, so the village prefix carries the answer',
      'The vineyard is shared by many growers; J.J. Prüm is the most famous but not the only one',
      'Michelsberg at Piesport is a Grosslage, not a comparable single vineyard, and is the classic Mosel labelling trap'
    ]
  },
  {
    id: 'p-au-bon-climat', p: 'Au Bon Climat',
    country: 'The United States and Canada', r: 'Central Coast', sub: 'Santa María Valley',
    founded: '1982',
    holdings: 'Long-standing blocks in the Bien Nacido vineyard in Santa María Valley, plus the Le Bon Climat estate.',
    style: 'Savory, acid-driven and deliberately food-first: no chase for ripeness, Burgundian handling throughout.',
    t: 'Jim Clendenen\'s Burgundian California: savory, fresh, food-first',
    why: 'Jim Clendenen held a cool, restrained line in Santa Barbara from 1982 and made Bien Nacido a vineyard name candidates are expected to know. He also shared a facility with Qupe, which links the Pinot and the Rhône Ranger stories.',
    wines: [
      { n: 'Bien Nacido Pinot Noir', grape: 'Pinot Noir', note: 'The vineyard that made Santa María Valley\'s name' },
      { n: 'Isabelle Pinot Noir', grape: 'Pinot Noir', note: 'A multi-vineyard selection named for the founder\'s daughter' },
      { n: 'Nuits-Blanches au Bon Climat', grape: 'Chardonnay', note: 'The Burgundian white side of the house' }
    ],
    traps: [
      'Santa María Valley is in Santa Barbara County, not Monterey',
      'Bien Nacido is a grower\'s vineyard supplying many producers, not an Au Bon Climat property',
      'Au Bon Climat and Qupe are separate houses that shared a winery'
    ]
  },
  {
    id: 'p-beaulieu-vineyard', p: 'Beaulieu Vineyard',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Rutherford',
    founded: '1900',
    holdings: 'Estate vineyards on the Rutherford bench, with the blocks known as BV No. 1 and No. 2 feeding the Private Reserve.',
    style: 'The pre-cult Napa template: cedar, dried herb and firm dusty tannin rather than sweetness or extract.',
    t: 'Rutherford dust: cedar, cassis and dried herb from Tchelistcheff\'s house style',
    why: 'André Tchelistcheff worked here from 1938 and trained most of the generation that built modern Napa. Georges de Latour Private Reserve is the name candidates are expected to attach to Rutherford and to the phrase Rutherford dust.',
    wines: [
      { n: 'Georges de Latour Private Reserve', grape: 'Cabernet Sauvignon', note: 'First made in 1936 and the reference bottling for Rutherford Cabernet' },
      { n: 'Rutherford Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The house\'s everyday expression of the bench' }
    ],
    traps: [
      'Tchelistcheff consulted widely, but Beaulieu was his own house, not Inglenook',
      'Georges de Latour is the founder and the wine, not a separate estate',
      'Rutherford dust describes a tannin texture, not a soil type with a legal definition'
    ]
  },
  {
    id: 'p-beaux-freres', p: 'Beaux Frères',
    country: 'The United States and Canada', r: 'Willamette Valley', sub: 'Ribbon Ridge',
    founded: '1986',
    holdings: 'The Beaux Freres vineyard and The Upper Terrace on Ribbon Ridge, farmed biodynamically.',
    style: 'Riper and denser than the Willamette norm: black cherry, earth and sweet spice, with the fruit given room.',
    t: 'Ribbon Ridge ripeness with biodynamic lift: black cherry, earth, sweet spice',
    why: 'Founded by Michael Etzel with his brother-in-law Robert Parker, which is what the name means. Ribbon Ridge is the smallest Willamette sub-AVA and sits entirely inside the Chehalem Mountains, a nesting relationship examiners like.',
    wines: [
      { n: 'The Beaux Frères Vineyard', grape: 'Pinot Noir', note: 'The home vineyard on Ribbon Ridge' },
      { n: 'The Upper Terrace', grape: 'Pinot Noir', note: 'The higher block, planted at tighter spacing' },
      { n: 'Ribbon Ridge Willamette Valley', grape: 'Pinot Noir', note: 'The appellation bottling' }
    ],
    traps: [
      'Beaux Freres means brothers-in-law and refers to the founders, not to a vineyard',
      'Ribbon Ridge is wholly enclosed within the Chehalem Mountains AVA',
      'Its soil is marine sedimentary Willakenzie, not the volcanic Jory of the Dundee Hills'
    ]
  },
  {
    id: 'p-beringer', p: 'Beringer Vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'St. Helena',
    founded: '1876',
    holdings: 'Hand-dug tunnels in the hillside behind the Rhine House, plus vineyards across Napa including Chabot and St. Helena Home Ranch.',
    style: 'Polished, sweetly oaked Napa Cabernet with blackcurrant fruit and a rounded, commercially confident frame.',
    t: 'Cave-aged Private Reserve: blackcurrant, sweet oak, polished Napa power',
    why: 'Founded by the brothers Jacob and Frederick Beringer and worked right through Prohibition on sacramental and medicinal wine, which is the basis of its claim to the valley\'s longest unbroken run. Ed Sbragia\'s Private Reserve is the benchmark of the 1980s and 1990s reserve style.',
    wines: [
      { n: 'Private Reserve Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The flagship, long the standard-bearer for the ripe Napa reserve style' },
      { n: 'Napa Valley Chardonnay Private Reserve', grape: 'Chardonnay', note: 'The white counterpart in the same register' }
    ],
    traps: [
      'Charles Krug is older by fifteen years; Beringer\'s claim is continuity, not age',
      'The Rhine House is the visitor landmark, not a vineyard',
      'Now part of a large multinational group, so ownership questions are volatile'
    ]
  },
  {
    id: 'p-bonny-doon', p: 'Bonny Doon Vineyard',
    country: 'The United States and Canada', r: 'Central Coast', sub: '',
    founded: '1983',
    holdings: 'Fruit contracted from Central Coast sites after the original Santa Cruz Mountains estate was given up.',
    style: 'Rhône blends made with an argumentative streak: herbs, kirsch, moderate alcohol and full ingredient disclosure.',
    t: 'Rhône blends with a sense of humour: Le Cigare Volant\'s herbs and kirsch',
    why: 'Randall Grahm was the loudest of the Rhône Rangers, an early and public convert to screwcap closures, and an advocate of listing ingredients on the label. Le Cigare Volant is the wine name candidates are expected to explain.',
    wines: [
      { n: 'Le Cigare Volant', grape: 'Grenache led Rhône blend', note: 'The Châteauneuf homage named for the 1954 ordinance against flying saucers' },
      { n: 'Vin Gris de Cigare', grape: 'Rhône blend rose', note: 'The pink version of the same idea' },
      { n: 'Le Cigare Blanc', grape: 'Roussanne and Grenache Blanc', note: 'The white Rhône blend' }
    ],
    traps: [
      'The name refers to a Châteauneuf-du-Pape ordinance about flying cigars, not to tobacco',
      'Bonny Doon is a place in the Santa Cruz Mountains, but the wines are Central Coast sourced',
      'Grahm championed screwcaps for age-worthy wine, not only for cheap wine'
    ]
  },
  {
    id: 'p-calera', p: 'Calera Wine Company',
    country: 'The United States and Canada', r: 'Central Coast', sub: 'Mount Harlan',
    founded: '',
    holdings: 'High limestone vineyards in the Gavilan range of San Benito County, in an AVA created for the estate.',
    style: 'Wiry, high-acid Pinot Noir with rosehip and orange peel, from limestone at altitude rather than from coastal fog.',
    t: 'Limestone Pinot from Mount Harlan: rosehip, orange peel, wiry acid',
    why: 'Josh Jensen searched for limestone after working in Burgundy and planted on an old lime kiln site in the mid 1970s. Mount Harlan became an AVA in 1990 with Calera effectively its only producer, which makes it the standard single-producer appellation example in California.',
    wines: [
      { n: 'Jensen Pinot Noir', grape: 'Pinot Noir', note: 'The founder\'s own block and the flagship' },
      { n: 'Selleck Pinot Noir', grape: 'Pinot Noir', note: 'The smallest and most structured of the parcels' },
      { n: 'Mount Harlan Viognier', grape: 'Viognier', note: 'Among the first Viognier plantings in California' }
    ],
    traps: [
      'Mount Harlan is in San Benito County, inland, not on the coast',
      'Calera is Spanish for lime kiln, which is the clue to the site',
      'The named parcels are blocks of one estate, not bought-in vineyards'
    ]
  },
  {
    id: 'p-caymus', p: 'Caymus Vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Rutherford',
    founded: '1972',
    holdings: 'Wagner family vineyards centred on Rutherford, with fruit drawn from across the valley for the Napa bottling.',
    style: 'The ripe, sweet-fruited commercial Napa idiom: cassis liqueur, vanilla, soft tannin, a finish that reads faintly sweet.',
    t: 'Ripe, sweet-fruited Rutherford: cassis liqueur, vanilla, soft plush finish',
    why: 'Charlie Wagner\'s house is among the most widely sold serious Napa Cabernets in America and the clearest single example of the ripe, sweet-fruited Napa style. Randy Dunn made the wines here before founding his own estate.',
    wines: [
      { n: 'Special Selection Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The reserve, made only in years the family judges worthy' },
      { n: 'Napa Valley Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The volume bottling that set the modern popular Napa taste' }
    ],
    traps: [
      'Caymus is a producer name taken from the Rancho Caymus land grant at Rutherford; it is not an AVA',
      'The Napa Valley bottling is multi-district fruit, not Rutherford estate',
      'Mer Soleil and Conundrum are other Wagner family labels, not Caymus wines'
    ]
  },
  {
    id: 'p-cayuse-vineyards', p: 'Cayuse Vineyards',
    country: 'The United States and Canada', r: 'Columbia Valley', sub: 'The Rocks District of Milton-Freewater',
    founded: '1997',
    holdings: 'Biodynamic vineyards on basalt cobblestones laid by the Walla Walla River, including Cailloux, En Cerise, En Chamberlin and Armada.',
    style: 'Unmistakable savory reduction: blood, olive brine, smoke and cured meat over dark fruit.',
    t: 'Basalt cobbles of the Rocks: blood, olive brine, smoke, unmistakable funk',
    why: 'Christophe Baron, from a Champagne family, recognised the Châteauneuf-like cobblestones at Milton-Freewater. The Rocks District is the geographic joke examiners love: the vineyards are in Oregon, the winery and the trade are in Walla Walla, Washington.',
    wines: [
      { n: 'Bionic Frog Syrah', grape: 'Syrah', note: 'The most sought bottling of the house' },
      { n: 'Cailloux Vineyard Syrah', grape: 'Syrah', note: 'The cobblestone site whose French name means pebbles' },
      { n: 'En Chamberlin Vineyard Syrah', grape: 'Syrah', note: 'A second named cobble site' }
    ],
    traps: [
      'The Rocks District of Milton-Freewater lies in OREGON, inside the Walla Walla Valley AVA',
      'Its cobblestones are basalt from the Walla Walla River, not the galets of Châteauneuf',
      'Baron also stands behind No Girls, Horsepower and Hors Categorie'
    ]
  },
  {
    id: 'p-chalone', p: 'Chalone Vineyard',
    country: 'The United States and Canada', r: 'Central Coast', sub: 'Chalone',
    founded: '',
    holdings: 'Vineyards high in the Gavilan range above the Salinas Valley, on granitic soils with limestone, some plantings dating to the early twentieth century.',
    style: 'Austere and mineral: smoke and lemon curd in the Chardonnay, with a stony grip unusual for California.',
    t: 'Granite Chardonnay of the Gavilans: smoke, lemon curd, mineral austerity',
    why: 'One of the six California whites shown in Paris in 1976 and the producer that gives the Chalone AVA its name. Dick Graff\'s work here is the origin of the California argument that limestone and altitude matter more than proximity to the ocean.',
    wines: [
      { n: 'Estate Chardonnay', grape: 'Chardonnay', note: 'The 1974 placed in the white flight at the 1976 Paris tasting' },
      { n: 'Estate Pinot Noir', grape: 'Pinot Noir', note: 'A long-running mountain Pinot' },
      { n: 'Estate Chenin Blanc', grape: 'Chenin Blanc', note: 'A rare survival of old California Chenin' }
    ],
    traps: [
      'Chalone is both the producer and the AVA, a rare American case',
      'It sits above the Salinas Valley in Monterey County, not on the coast',
      'Its Paris entry was a Chardonnay; Montelena won that flight'
    ]
  },
  {
    id: 'p-chappellet', p: 'Chappellet',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Pritchard Hill',
    founded: '1967',
    holdings: 'Steep hillside vineyards on Pritchard Hill, the first winery built on that slope.',
    style: 'Rocky and unpolished by cult standards: dried herb, red currant and a gritty tannin that stays firm.',
    t: 'Pritchard Hill\'s grip: dried herb, red currant, rocky tannin, low-key power',
    why: 'Donn and Molly Chappellet arrived on Pritchard Hill in 1967, a year after Robert Mondavi broke ground at Oakville, and their estate is why the hill has a name at all. The dry Chenin Blanc is a standing curiosity question.',
    wines: [
      { n: 'Pritchard Hill Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The estate flagship from the original hillside blocks' },
      { n: 'Signature Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The long-running house Cabernet' },
      { n: 'Chenin Blanc', grape: 'Chenin Blanc', note: 'One of the last serious dry Chenin plantings left in Napa' }
    ],
    traps: [
      'Pritchard Hill is a place name in common use, not an appellation',
      'Chappellet predates the cult producers now associated with the same slope',
      'Napa Chenin Blanc is nearly extinct, so the grape is easy to miss on a blind label question'
    ]
  },
  {
    id: 'p-charles-krug', p: 'Charles Krug Winery',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'St. Helena',
    founded: '1861',
    holdings: 'Estate vineyards across St. Helena, Yountville, Carneros and Howell Mountain, farmed by the Peter Mondavi family.',
    style: 'Savory, firmly built Cabernet in an older register: cedar and dried cherry rather than sweet oak.',
    t: 'Napa\'s oldest cellar: firm, savory Cabernet with cedar and dried cherry',
    why: 'The oldest winery in Napa Valley and the place the Mondavi family bought in 1943. The 1965 quarrel that pushed Robert Mondavi out of Charles Krug is the origin of the Robert Mondavi Winery, so the two names are asked together.',
    wines: [
      { n: 'Vintage Select Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The reserve bottling, made only in selected years' },
      { n: 'Generations', grape: 'Bordeaux blend', note: 'The family\'s proprietary red' }
    ],
    traps: [
      'Charles Krug is the older house; Robert Mondavi Winery dates only to 1966',
      'Peter Mondavi\'s branch kept Charles Krug, Robert\'s branch did not',
      'Founded 1861 but closed through Prohibition, so it cannot claim continuous operation'
    ]
  },
  {
    id: 'p-chateau-montelena', p: 'Chateau Montelena',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Calistoga',
    founded: '1882',
    holdings: 'A stone winery built by Alfred Tubbs, with estate Cabernet vineyards at the northern end of the valley in Calistoga.',
    style: 'Restrained Chardonnay with orchard fruit and no buttery sheen; estate Cabernet that is tight and slow to open.',
    t: 'The 1976 Paris white, orchard fruit and restraint over butter',
    why: 'One of the two California winners at the Judgement of Paris in 1976, and the one candidates most often misassign. Montelena won with Chardonnay. The wine was made by Mike Grgich, who then founded Grgich Hills.',
    wines: [
      { n: 'Napa Valley Chardonnay', grape: 'Chardonnay', note: 'The 1973 won the white flight at the 1976 Paris tasting' },
      { n: 'Estate Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'Calistoga fruit, built for long ageing' }
    ],
    traps: [
      'Montelena won with CHARDONNAY; the red flight went to Stag\'s Leap Wine Cellars',
      'The winery dates to 1882 but was revived by Jim Barrett only in 1972',
      'Calistoga became its own AVA long after the wine was famous'
    ]
  },
  {
    id: 'p-chateau-ste-michelle', p: 'Chateau Ste. Michelle',
    country: 'The United States and Canada', r: 'Columbia Valley', sub: '',
    founded: '1967',
    holdings: 'Winery at Woodinville west of the Cascades, with vineyards including Cold Creek and Canoe Ridge Estate east of the mountains in the Columbia Valley.',
    style: 'Riesling at volume that still tastes of lime and wet stone, plus Bordeaux varieties and Syrah from the desert.',
    t: 'Riesling at industrial scale that still tastes of lime and slate',
    why: 'Long the largest Riesling producer in the United States and the commercial spine of the Washington industry, with roots in a licence granted in 1934. Its partnerships with Loosen and Antinori are the standard examples of European names entering Washington.',
    wines: [
      { n: 'Eroica Riesling', grape: 'Riesling', note: 'A joint project with Ernst Loosen of the Mosel' },
      { n: 'Col Solare', grape: 'Cabernet Sauvignon led blend', note: 'A Red Mountain partnership with Antinori' },
      { n: 'Cold Creek Vineyard Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'One of the oldest Columbia Valley plantings' }
    ],
    traps: [
      'The winery is in rainy Woodinville but nearly all its vineyards lie in the desert east of the Cascades',
      'Eroica is the Loosen partnership; Col Solare is the Antinori one',
      'Washington\'s largest producer is a Riesling house first, not a Cabernet house'
    ]
  },
  {
    id: 'p-clos-du-val', p: 'Clos Du Val',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Stags Leap District',
    founded: '1972',
    holdings: 'Estate vineyards in the Stags Leap District, with additional Carneros holdings.',
    style: 'Restrained by Napa standards from the start: cedar, red plum, even tannin, no excess of oak or alcohol.',
    t: 'Stags Leap restraint from a Bordeaux hand: cedar, red plum, even tannin',
    why: 'Founded by John Goelet with Bernard Portet, whose family came from Château Lafite. Its 1972 Cabernet was one of the six California reds in Paris, and it placed first when that red flight was re-judged ten years later.',
    wines: [
      { n: 'Estate Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The 1972 was in the red flight at the 1976 Paris tasting' },
      { n: 'Carneros Chardonnay', grape: 'Chardonnay', note: 'The cool-climate white side of the house' }
    ],
    traps: [
      'Clos Du Val is an American producer despite the French name and the word clos',
      'Its Paris entry was the 1972 vintage, a difficult year in Napa',
      'Do not confuse it with Clos du Bois in Sonoma'
    ]
  },
  {
    id: 'p-colgin-cellars', p: 'Colgin Cellars',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Pritchard Hill',
    founded: '1992',
    holdings: 'The IX Estate on Pritchard Hill above Lake Hennessey, plus the Tychson Hill site at St. Helena and fruit from Cariad.',
    style: 'Modern Napa polish at high ripeness: blueberry, violet and cocoa carried on seamless, glossy tannin.',
    t: 'Pritchard Hill polish: blueberry, violet, cocoa, seamless modern Napa',
    why: 'Ann Colgin\'s house is one of the two or three names used to define the cult tier, and it sits on Pritchard Hill, which is a recognised name with no legal standing as an appellation. LVMH took a majority stake in 2017.',
    wines: [
      { n: 'IX Estate', grape: 'Bordeaux blend', note: 'The Pritchard Hill estate wine' },
      { n: 'Tychson Hill', grape: 'Cabernet Sauvignon', note: 'A small St. Helena site with its own historic name' },
      { n: 'Cariad', grape: 'Bordeaux blend', note: 'A blend from contracted valley sites' }
    ],
    traps: [
      'Pritchard Hill is NOT an AVA; these wines are labelled Napa Valley',
      'Colgin is a producer name, not a vineyard',
      'IX Estate is the estate wine; Cariad and Tychson Hill come from elsewhere'
    ]
  },
  {
    id: 'p-corison', p: 'Corison Winery',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'St. Helena',
    founded: '1987',
    holdings: 'The Kronos vineyard at St. Helena, planted around 1971 on St. George rootstock, plus the Sunbasket site.',
    style: 'Mid-weight Cabernet with visible acid: red cherry, fennel and dusty bench tannin at moderate alcohol.',
    t: 'Mid-weight Cabernet with bright acid: red cherry, fennel, dusty bench tannin',
    why: 'Kathy Corison held a restrained line through the whole high-ripeness era, and her Cabernet is the standing counterexample to the ripe Napa style of the 1990s and 2000s. Kronos is also one of the few surviving old blocks on the Napa valley floor, planted on St. George rootstock.',
    wines: [
      { n: 'Kronos Vineyard Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'Old own-rooted vines on the St. Helena bench' },
      { n: 'Napa Valley Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The house bottling from bench fruit' }
    ],
    traps: [
      'Corison is St. Helena bench fruit, not a mountain estate',
      'Kronos is old-vine Cabernet on St. George rootstock, which is why the block survived the phylloxera replanting that took out AXR1',
      'Its lower alcohol misleads blind tasters away from Napa'
    ]
  },
  {
    id: 'p-cristom', p: 'Cristom Vineyards',
    country: 'The United States and Canada', r: 'Willamette Valley', sub: 'Eola-Amity Hills',
    founded: '1992',
    holdings: 'Estate vineyards in the Eola-Amity Hills, where the Van Duzer Corridor funnels cold Pacific air across the slopes.',
    style: 'Whole-cluster fermentation with native yeast: stem spice and dark cherry over a wind-driven acid line.',
    t: 'Whole-cluster Eola-Amity Pinot: stem spice, dark cherry, wind-driven acid',
    why: 'Steve Doerner came from Calera and brought whole-cluster fermentation into the Oregon mainstream. Cristom is the producer to name for the Eola-Amity Hills and the cooling effect of the Van Duzer Corridor.',
    wines: [
      { n: 'Marjorie Vineyard Pinot Noir', grape: 'Pinot Noir', note: 'The oldest estate block' },
      { n: 'Jessie Vineyard Pinot Noir', grape: 'Pinot Noir', note: 'The most structured of the single vineyards' },
      { n: 'Louise Vineyard Pinot Noir', grape: 'Pinot Noir', note: 'A third named estate block' }
    ],
    traps: [
      'The Van Duzer Corridor is both a wind gap and, since 2019, its own AVA',
      'The single vineyards are named for women in the family, not for their locations',
      'Whole-cluster stem character is a winemaking signature, not a mark of the appellation'
    ]
  },
  {
    id: 'p-diamond-creek', p: 'Diamond Creek Vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Diamond Mountain District',
    founded: '1968',
    holdings: 'Four named parcels on one hillside property: Volcanic Hill, Red Rock Terrace, Gravelly Meadow and the rarely made Lake.',
    style: 'Each parcel bottled separately and unblended, so the house shows soil difference rather than a single house taste.',
    t: 'Four small parcels, four tannins: volcanic dust, iron, gravel, red fruit',
    why: 'Al Brounstein\'s estate was the first in California devoted entirely to Cabernet Sauvignon bottled by individual vineyard block. It is the cleanest textbook demonstration that soil, not winemaking, is being shown.',
    wines: [
      { n: 'Volcanic Hill', grape: 'Cabernet Sauvignon', note: 'South-facing volcanic ash, the firmest and longest-lived of the three' },
      { n: 'Red Rock Terrace', grape: 'Cabernet Sauvignon', note: 'Iron-rich red soil, the most open and perfumed' },
      { n: 'Gravelly Meadow', grape: 'Cabernet Sauvignon', note: 'Gravel of an ancient streambed, the leanest' }
    ],
    traps: [
      'The parcels are adjacent blocks of one property, not separate estates',
      'Lake is made only in a handful of vintages and is not a regular bottling',
      'Diamond Mountain District is a Napa AVA; Diamond Creek is a producer inside it'
    ]
  },
  {
    id: 'p-domaine-de-la-terre-rouge', p: 'Domaine de la Terre Rouge',
    country: 'The United States and Canada', r: 'Sierra Foothills', sub: 'Shenandoah Valley, Amador County',
    founded: '',
    holdings: 'Vineyards in the Shenandoah Valley of Amador County in the Sierra Foothills, with fruit also drawn from neighbouring foothill sites.',
    style: 'Foothill Rhône varieties at altitude: black olive, wild herb and a granite bite, plus old-vine Zinfandel under a second label.',
    t: 'Sierra Foothills Syrah: black olive, wild herb, granite bite at altitude',
    why: 'Bill Easton\'s two labels are the clearest single answer for the Sierra Foothills, the Gold Rush region that holds some of the oldest Zinfandel plantings in America. Amador and El Dorado are the two counties a candidate must name.',
    wines: [
      { n: 'Ascent Syrah', grape: 'Syrah', note: 'The house\'s most serious foothill Syrah' },
      { n: 'Sentinel Oak Vineyard Syrah', grape: 'Syrah', note: 'A named Shenandoah Valley site' },
      { n: 'Easton Zinfandel', grape: 'Zinfandel', note: 'The Zinfandel and Barbera bottlings run under the Easton label' }
    ],
    traps: [
      'Terre Rouge and Easton are two labels from one house, split by grape family',
      'Shenandoah Valley exists as an AVA in both California and Virginia',
      'Sierra Foothills is an umbrella AVA covering Amador, El Dorado, Calaveras and more'
    ]
  },
  {
    id: 'p-domaine-drouhin-oregon', p: 'Domaine Drouhin Oregon',
    country: 'The United States and Canada', r: 'Willamette Valley', sub: 'Dundee Hills',
    founded: '1987',
    holdings: 'Estate vineyards in the Dundee Hills bought by Robert Drouhin in 1987, plus the Roserock property in the Eola-Amity Hills.',
    style: 'Burgundian restraint on Jory soil: red cherry and iron in a tight frame, whole-cluster used with discipline.',
    t: 'Burgundy\'s own reading of Dundee Hills: red cherry, iron, restrained frame',
    why: 'Robert Drouhin bought land in Oregon in 1987 after the 1980 rematch with Eyrie, and installed his daughter Veronique as winemaker. It is the clearest case of Burgundian capital validating a New World Pinot region.',
    wines: [
      { n: 'Laurène', grape: 'Pinot Noir', note: 'The barrel selection that is the house flagship' },
      { n: 'Louise', grape: 'Pinot Noir', note: 'A further selection made only in some years' },
      { n: 'Arthur', grape: 'Chardonnay', note: 'The estate Chardonnay' }
    ],
    traps: [
      'Drouhin came to Oregon because of the Eyrie result, not the Judgement of Paris',
      'Roserock is in the Eola-Amity Hills, a separate sub-AVA from Dundee Hills',
      'The cuvees are named for family members, not for vineyards'
    ]
  },
  {
    id: 'p-dominus-estate', p: 'Dominus Estate',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Yountville',
    founded: '1983',
    holdings: 'The Napanook vineyard at Yountville, a gravelly bench site planted in the nineteenth century.',
    style: 'Bordeaux restraint transplanted: savory, dusty, with firm dry tannin and no sweetness on the finish.',
    t: 'Christian Moueix\'s Napa: Bordeaux restraint, dusty tannin, savory depth',
    why: 'Christian Moueix of Pomerol brought a Right Bank name into Napa in 1983, and the wine is the standing example of a European hand in California. The single vineyard, Napanook, is the fact examiners want.',
    wines: [
      { n: 'Dominus', grape: 'Cabernet Sauvignon led Bordeaux blend', note: 'The grand vin from Napanook' },
      { n: 'Napanook', grape: 'Bordeaux blend', note: 'The second wine from the same vineyard' }
    ],
    traps: [
      'Moueix is associated with Pétrus in Pomerol, but Dominus is a Cabernet-led wine',
      'Napanook is the vineyard and also the name of the second wine',
      'Yountville is the AVA; Dominus does not sit in Oakville'
    ]
  },
  {
    id: 'p-dr-konstantin-frank', p: 'Dr. Konstantin Frank',
    country: 'The United States and Canada', r: 'Finger Lakes', sub: 'Keuka Lake',
    founded: '1962',
    holdings: 'Vineyards above Keuka Lake, planted to vinifera grafted onto cold-hardy rootstock.',
    style: 'Cold-climate precision: lime, wet stone and high acid in the Rieslings, with a sideline in Eastern European varieties.',
    t: 'The vinifera proof: Keuka Riesling of lime, wet stone and cold-climate nerve',
    why: 'Konstantin Frank, a Ukrainian-born plant scientist, founded Vinifera Wine Cellars in 1962 and demonstrated that European varieties could survive Finger Lakes winters if grafted onto the right rootstock. Every serious eastern American vinifera planting descends from that argument.',
    wines: [
      { n: 'Dry Riesling', grape: 'Riesling', note: 'The bottling that proved the point about vinifera in the East' },
      { n: 'Rkatsiteli', grape: 'Rkatsiteli', note: 'A Georgian variety almost unique to this house in America' },
      { n: 'Chateau Frank Blanc de Blancs', grape: 'Chardonnay', note: 'The traditional-method sparkling arm' }
    ],
    traps: [
      'The breakthrough was rootstock selection, not hybrid breeding',
      'Before Frank, the Finger Lakes grew labrusca and hybrids, not vinifera',
      'The deep glacial lakes moderate winter temperature; the latitude alone would be fatal'
    ]
  },
  {
    id: 'p-dunn-vineyards', p: 'Dunn Vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Howell Mountain',
    founded: '1979',
    holdings: 'Estate vineyards on Howell Mountain, on the eastern ridge above the valley floor.',
    style: 'Deliberately lower in alcohol than its neighbours, with tight black fruit, forest floor and a granite-hard tannin that needs fifteen years.',
    t: 'Howell Mountain iron: tight black fruit and forest floor under granite tannin',
    why: 'Randy Dunn came from Caymus and made Howell Mountain a category. The house is the standing argument that Napa Cabernet can be built on structure and restraint, and it is the name examiners reach for when contrasting mountain with benchland.',
    wines: [
      { n: 'Howell Mountain Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The mountain reference bottling' },
      { n: 'Napa Valley Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'Valley fruit in the same austere house hand' }
    ],
    traps: [
      'Howell Mountain was one of Napa\'s first sub-AVAs and sits above the fog line, so its fruit is not simply riper',
      'Dunn makes both a mountain and a valley Cabernet; they are not the same wine',
      'Randy Dunn\'s Howell Mountain style is low-alcohol, which misleads candidates expecting mountain to mean massive'
    ]
  },
  {
    id: 'p-eisele-vineyard-estate', p: 'Eisele Vineyard Estate',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Calistoga',
    founded: '',
    holdings: 'The Eisele vineyard at the northern end of the valley near Calistoga, on gravelly alluvial soil, farmed biodynamically.',
    style: 'Scale without heaviness: cassis and sage over graphite, with a long fine tannin line.',
    t: 'Calistoga Cabernet of scale: cassis, sage, graphite, long biodynamic line',
    why: 'The vineyard has carried its own name through several owners: Ridge and Conn Creek made early vineyard-designates, Joseph Phelps bottled it for years, Bart and Daphne Araujo bought it in 1990, and Artémis Domaines of the Pinault family took over in 2013 and restored the vineyard name to the label.',
    wines: [
      { n: 'Eisele Vineyard Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'One of the few Napa vineyards whose name outranks every owner it has had' },
      { n: 'Altagracia', grape: 'Bordeaux blend', note: 'The second label' },
      { n: 'Eisele Vineyard Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'A small white from the same estate' }
    ],
    traps: [
      'Araujo Estate and Eisele Vineyard Estate are the same property under different ownership',
      'Joseph Phelps made Eisele Cabernet but never owned the land',
      'Eisele sits in Calistoga, not in the Oakville or Rutherford belt'
    ]
  },
  {
    id: 'p-grgich-hills', p: 'Grgich Hills Estate',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Rutherford',
    founded: '1977',
    holdings: 'Estate vineyards across Napa including Rutherford, Yountville, Calistoga and Carneros, farmed organically.',
    style: 'Chardonnay kept lean and citrus-driven with apple and lemon oil; reds savory rather than sweet.',
    t: 'Grgich\'s Chardonnay line: apple, lemon oil, restraint learned at Montelena',
    why: 'Miljenko Grgich made the Chateau Montelena Chardonnay that won the white flight in Paris in 1976, then founded this estate with Austin Hills in 1977. The name is the human link between the Paris story and a working Napa house.',
    wines: [
      { n: 'Napa Valley Chardonnay', grape: 'Chardonnay', note: 'The house style that descends directly from the 1973 Montelena' },
      { n: 'Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'Rutherford-centred, firm and traditional' },
      { n: 'Fumé Blanc', grape: 'Sauvignon Blanc', note: 'The Mondavi-coined idiom, still in the range' }
    ],
    traps: [
      'Hills refers to the Austin Hills partnership, not to a hillside vineyard',
      'Grgich made the winning wine at Montelena; the estate did not exist in 1976',
      'Grgich is Croatian-born, which examiners sometimes use as a distractor'
    ]
  },
  {
    id: 'p-hanzell', p: 'Hanzell Vineyards',
    country: 'The United States and Canada', r: 'Sonoma County', sub: 'Sonoma Valley',
    founded: '1953',
    holdings: 'Hillside vineyards above Sonoma town, including the Ambassador\'s 1953 Vineyard, among the oldest Chardonnay and Pinot Noir plantings still in production in the Americas.',
    style: 'Nutty, firm, long-lived Chardonnay built for age rather than early charm; Pinot Noir savory and structured.',
    t: 'The first French barrels in America: nutty, long-lived Chardonnay',
    why: 'James Zellerbach, a former ambassador to Italy, set out to make Burgundy in Sonoma and is credited with introducing French oak barriques and temperature-controlled stainless steel fermentation to American winemaking. That technical first is the examinable point.',
    wines: [
      { n: 'Chardonnay', grape: 'Chardonnay', note: 'The estate wine from historic plantings' },
      { n: 'Pinot Noir', grape: 'Pinot Noir', note: 'One of the longest continuous California Pinot programmes' }
    ],
    traps: [
      'Hanzell\'s importance is technical and historical, not a matter of scarcity',
      'Sonoma Valley is the AVA; Sonoma County and Sonoma Coast are different names',
      'The Ambassador\'s 1953 Vineyard is a planting date, not a vintage'
    ]
  },
  {
    id: 'p-harlan-estate', p: 'Harlan Estate',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Oakville',
    founded: '1984',
    holdings: 'Hillside vineyards in the western hills above Oakville, deliberately planted off the valley floor.',
    style: 'Dense hillside fruit worked into espresso, graphite and tobacco, with tannin structured for decades rather than for early charm.',
    t: 'Hillside density: dark fruit, espresso, tobacco, \'First Growth\' ambition',
    why: 'Bill Harlan set out to build a Napa estate on the First Growth model, and the family also stands behind BOND, Promontory and the Napa Valley Reserve. It is the name to use when asked about estate-building ambition rather than cult scarcity.',
    wines: [
      { n: 'Harlan Estate', grape: 'Bordeaux blend', note: 'The proprietary red, first commercial vintage 1990' },
      { n: 'The Maiden', grape: 'Bordeaux blend', note: 'The second wine of the estate' }
    ],
    traps: [
      'Harlan Estate is hillside, not valley-floor Oakville',
      'BOND and Promontory are separate labels from the same family, not Harlan bottlings',
      'The first commercial release is the 1990 vintage, six years after the land was bought',
      'Hillside Oakville, not valley floor',
      'Land bought in 1984; the first commercial vintage is 1990',
      'BOND and Promontory are separate labels, not Harlan Estate wines'
    ]
  },
  {
    id: 'p-heitz-cellar', p: 'Heitz Cellar',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'St. Helena',
    founded: '1961',
    holdings: 'Winery in St. Helena drawing on contracted single vineyards, above all Martha\'s Vineyard in Oakville and Bella Oaks in Rutherford.',
    style: 'Vineyard-designated Cabernet held back for years before release, with a distinctive mint and eucalyptus lift over cassis.',
    t: 'Martha\'s mint and eucalyptus over cassis: the first great Napa single vineyard',
    why: 'Joe Heitz established the idea that a Napa vineyard name could carry a wine. The Martha\'s Vineyard 1970 was in the red flight at the 1976 Paris tasting, and the mint or eucalyptus marker is a standard blind tasting cue.',
    wines: [
      { n: 'Martha\'s Vineyard Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'First made in 1966, among the first single-vineyard Cabernets in Napa' }
    ],
    traps: [
      'Heitz does not own Martha\'s Vineyard; it is farmed by the May family',
      'Martha\'s Vineyard is in Oakville, not St. Helena where the winery sits',
      'The eucalyptus note is a house and site signature, not evidence of a Bordeaux blend'
    ]
  },
  {
    id: 'p-hermann-j-wiemer', p: 'Hermann J. Wiemer Vineyard',
    country: 'The United States and Canada', r: 'Finger Lakes', sub: 'Seneca Lake',
    founded: '1979',
    holdings: 'Vineyards on the western side of Seneca Lake, including the HJW and Magdalena sites, alongside a grafting nursery that supplies growers across the East.',
    style: 'Dry Riesling of lime and slatey mineral on nervy acid, with single-vineyard bottlings that hold their differences.',
    t: 'Seneca\'s German-rooted precision: lime, slatey mineral, nervy acid',
    why: 'Hermann Wiemer came from Bernkastel in the Mosel and brought German grafting technique with him. The nursery matters as much as the wine, since it supplied much of the East\'s vinifera plant material.',
    wines: [
      { n: 'HJW Vineyard Riesling', grape: 'Riesling', note: 'The founder\'s own site, the most structured of the range' },
      { n: 'Magdalena Vineyard Riesling', grape: 'Riesling', note: 'A distinct site on heavier soil' },
      { n: 'Late Harvest Riesling', grape: 'Riesling', note: 'The sweet end of the range' }
    ],
    traps: [
      'Seneca and Cayuga are separate Finger Lakes AVAs within the larger Finger Lakes AVA',
      'Wiemer is a Riesling specialist first, though the house also makes Cabernet Franc and sparkling',
      'The founder has handed over; the house continues under Fred Merwarth and Oskar Bynke'
    ]
  },
  {
    id: 'p-inglenook', p: 'Inglenook',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Rutherford',
    founded: '1879',
    holdings: 'A contiguous Rutherford estate reassembled by Francis Ford Coppola from the original Niebaum property.',
    style: 'Cool-toned Rutherford Cabernet: red currant and tobacco leaf, structure ahead of flesh.',
    t: 'Old Rutherford bones: red currant, tobacco leaf, restraint over weight',
    why: 'Founded by Gustave Niebaum, Inglenook is the pre-Prohibition benchmark whose reputation Napa spent decades trying to recover. Coppola bought the house and vineyard first and the Inglenook name itself only in 2011, which is the fact examiners want.',
    wines: [
      { n: 'Rubicon', grape: 'Cabernet Sauvignon led Bordeaux blend', note: 'The estate flagship, first made in 1978' },
      { n: 'Cask Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'A nod to the pre-Prohibition cask bottlings of the original house' }
    ],
    traps: [
      'The label has run as Niebaum-Coppola and Rubicon Estate before returning to Inglenook',
      'Rubicon is the wine, Inglenook the estate',
      'The Coppola volume wines are separate Sonoma labels under the Francis Ford Coppola name and have nothing to do with the Inglenook estate'
    ]
  },
  {
    id: 'p-inniskillin', p: 'Inniskillin',
    country: 'The United States and Canada', r: 'Niagara Peninsula', sub: 'Niagara-on-the-Lake',
    founded: '1975',
    holdings: 'Vineyards on the Niagara Peninsula, with blocks netted and left hanging into winter for Icewine.',
    style: 'Icewine of mango, honey and apricot carried on searing acid, with the sugar held in check by the cold.',
    t: 'Frozen Vidal pressed at minus eight: mango, honey, apricot on searing acid',
    why: 'Donald Ziraldo and Karl Kaiser received the first Ontario winery licence granted since Prohibition in 1975, and their 1989 Vidal Icewine at Vinexpo made Canadian Icewine an international category. VQA Icewine law is the examinable detail.',
    wines: [
      { n: 'Vidal Icewine', grape: 'Vidal', note: 'The 1989 that won the Grand Prix d\'Honneur at Vinexpo in 1991' },
      { n: 'Riesling Icewine', grape: 'Riesling', note: 'The finer, more acid-driven version' },
      { n: 'Cabernet Franc Icewine', grape: 'Cabernet Franc', note: 'The red Icewine style, unusual outside Canada' }
    ],
    traps: [
      'VQA Icewine requires grapes frozen naturally on the vine at minus eight degrees Celsius or colder and pressed frozen',
      'Cryoextraction, or artificial freezing, disqualifies a wine from the Icewine designation',
      'Vidal is a hybrid; Riesling Icewine is the vinifera version'
    ]
  },
  {
    id: 'p-rochioli', p: 'J. Rochioli Vineyards',
    country: 'The United States and Canada', r: 'Sonoma County', sub: 'Russian River Valley',
    founded: '',
    holdings: 'Family vineyards on Westside Road, where Joe Rochioli Jr. planted Pinot Noir in 1968, among the first in the valley.',
    style: 'Wild strawberry, rose and sous-bois; block-by-block bottlings that show small differences within one farm.',
    t: 'Westside Road Pinot: wild strawberry, rose, sous-bois from 1968 plantings',
    why: 'The Rochioli family were growers before they were producers, and their 1968 Pinot Noir planting is one of the founding acts of Russian River Valley Pinot. Their fruit also made Williams Selyem\'s name.',
    wines: [
      { n: 'West Block Pinot Noir', grape: 'Pinot Noir', note: 'The most sought of the single-block bottlings' },
      { n: 'Little Hill Pinot Noir', grape: 'Pinot Noir', note: 'Another named block from the same estate' },
      { n: 'Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'A long-running Russian River white from old plantings' }
    ],
    traps: [
      'Rochioli is both a grower selling fruit and a producer bottling its own',
      'The 1968 planting is Pinot Noir; the family farmed the land long before that',
      'Westside Road is a stretch of the Russian River Valley, not a separate AVA'
    ]
  },
  {
    id: 'p-joseph-phelps', p: 'Joseph Phelps Vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'St. Helena',
    founded: '1973',
    holdings: 'Estate vineyards in Napa including the Backus vineyard at Oakville, plus a cool-climate property at Freestone on the Sonoma Coast.',
    style: 'Polished and ripe: cassis, graphite and sweet oak over a broad Napa core, with the blend rather than the varietal as the point.',
    t: 'Insignia\'s polish: cassis, graphite, sweet oak over Napa\'s ripest core',
    why: 'Insignia is the answer to the question of who made the first Napa proprietary blend, and it predates the Meritage alliance by more than a decade. Phelps also held the Eisele vineyard contract through the 1970s and 1980s.',
    wines: [
      { n: 'Insignia', grape: 'Bordeaux blend', note: 'First made in 1974, among the first proprietary Napa Bordeaux blends' },
      { n: 'Backus Vineyard', grape: 'Cabernet Sauvignon', note: 'A single Oakville site of unusual density' },
      { n: 'Freestone Chardonnay and Pinot Noir', grape: 'Chardonnay, Pinot Noir', note: 'The Sonoma Coast arm of the house' }
    ],
    traps: [
      'Insignia is a proprietary name, not a Meritage member designation',
      'The blend composition of Insignia changes by vintage and is not fixed',
      'Phelps made Eisele Vineyard Cabernet for years but never owned the site'
    ]
  },
  {
    id: 'p-kistler', p: 'Kistler Vineyards',
    country: 'The United States and Canada', r: 'Sonoma County', sub: '',
    founded: '1978',
    holdings: 'Estate and contracted single vineyards across Sonoma, including Vine Hill, Dutton Ranch, McCrea and Durell.',
    style: 'Barrel-fermented with full malolactic and long lees contact: broad, hazelnut-rich Chardonnay held together by Sonoma acid.',
    t: 'Lees, oak and malolactic: broad hazelnut Chardonnay cut by Sonoma acid',
    why: 'Steve Kistler made single-vineyard California Chardonnay a collectible category and defined the rich Burgundian-technique style of the 1990s. It is the usual foil to Stony Hill when a question contrasts two California Chardonnay traditions.',
    wines: [
      { n: 'Vine Hill Vineyard Chardonnay', grape: 'Chardonnay', note: 'The estate site at the centre of the range' },
      { n: 'Les Noisetiers', grape: 'Chardonnay', note: 'The blended Sonoma Coast bottling' },
      { n: 'Pinot Noir single vineyards', grape: 'Pinot Noir', note: 'The later red arm of the house' }
    ],
    traps: [
      'Kistler bottles many separate vineyards; there is no single flagship wine',
      'The house style is fully malolactic, unlike Stony Hill or Mount Eden',
      'Les Noisetiers is a blend, not a vineyard'
    ]
  },
  {
    id: 'p-lecole-no-41', p: 'L\'Ecole No 41',
    country: 'The United States and Canada', r: 'Columbia Valley', sub: 'Walla Walla Valley',
    founded: '1983',
    holdings: 'Estate vineyards at Ferguson in the Walla Walla foothills, plus fruit from Seven Hills and Pepper Bridge.',
    style: 'Dusty, dry-framed Bordeaux blends alongside two whites that almost nobody else takes seriously in Washington.',
    t: 'Schoolhouse label, serious blends: dusty Cabernet, waxy Sémillon',
    why: 'The third winery founded in the Walla Walla Valley, housed in a 1915 schoolhouse at Frenchtown, which is what the name and the number refer to. Its Sémillon and Chenin Blanc are the standing answer to what else Washington grows.',
    wines: [
      { n: 'Ferguson', grape: 'Bordeaux blend', note: 'The estate wine from basalt at elevation' },
      { n: 'Perigee', grape: 'Bordeaux blend', note: 'From the Seven Hills vineyard' },
      { n: 'Chenin Blanc', grape: 'Chenin Blanc', note: 'A rare serious American Chenin outside the Loire-influenced niche' },
      { n: 'Sémillon', grape: 'Sémillon', note: 'Washington\'s best case for the grape as a dry white' }
    ],
    traps: [
      'The name refers to a school district number, not to a vineyard or a vintage',
      'Third in Walla Walla, after Leonetti and Woodward Canyon',
      'Apogee and Perigee are named for the vineyards Pepper Bridge and Seven Hills respectively'
    ]
  },
  {
    id: 'p-leonetti-cellar', p: 'Leonetti Cellar',
    country: 'The United States and Canada', r: 'Columbia Valley', sub: 'Walla Walla Valley',
    founded: '1977',
    holdings: 'Estate vineyards in the Walla Walla Valley, including sites in the foothills of the Blue Mountains.',
    style: 'Plush and sweetly spiced from generous new oak, with soft tannin and dark fruit to match.',
    t: 'Walla Walla\'s first winery (1977): plush, spiced, collector staple',
    why: 'Gary Figgins bonded the first winery in the Walla Walla Valley in 1977, and the appellation\'s whole reputation follows from it. The date and the primacy are the examinable points.',
    wines: [
      { n: 'Walla Walla Valley Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The bottling that made Walla Walla a name' },
      { n: 'Merlot', grape: 'Merlot', note: 'An early argument for Washington Merlot' },
      { n: 'Reserve', grape: 'Bordeaux blend', note: 'The top selection of the vintage' }
    ],
    traps: [
      'Walla Walla Valley straddles the Washington and Oregon state line',
      'Leonetti was the first winery in Walla Walla; Woodward Canyon was the second, in 1981',
      'The valley is a sub-AVA of the Columbia Valley, not an independent region'
    ]
  },
  {
    id: 'p-littorai', p: 'Littorai',
    country: 'The United States and Canada', r: 'Sonoma County', sub: 'Sonoma Coast and Anderson Valley',
    founded: '1993',
    holdings: 'The Gold Ridge estate near Sebastopol plus long-standing contracts in the Sonoma Coast and Anderson Valley; biodynamic farming.',
    style: 'Cool, savory and transparent: moderate alcohol, stem and earth notes, the site legible through the winemaking.',
    t: 'Ted Lemon\'s Burgundy grammar in California: cool, savory, transparent',
    why: 'Ted Lemon was the first American to run a Burgundy domaine, at Domaine Guy Roulot in Meursault, before founding Littorai. He is the intellectual centre of the cool-climate California argument and was a leading voice in In Pursuit of Balance.',
    wines: [
      { n: 'Hirsch Vineyard Pinot Noir', grape: 'Pinot Noir', note: 'The far Sonoma Coast reference site' },
      { n: 'The Haven Pinot Noir', grape: 'Pinot Noir', note: 'An estate Pinot from Gold Ridge soils' },
      { n: 'Cerise Vineyard Pinot Noir', grape: 'Pinot Noir', note: 'The Anderson Valley expression' }
    ],
    traps: [
      'Littorai farms and buys across two counties, so it is not a single-AVA house',
      'Anderson Valley is in Mendocino County, not Sonoma',
      'Gold Ridge is a soil series name, not an appellation'
    ]
  },
  {
    id: 'p-marcassin', p: 'Marcassin',
    country: 'The United States and Canada', r: 'Sonoma County', sub: 'Sonoma Coast',
    founded: '',
    holdings: 'The Marcassin vineyard on a high ridge near the Sonoma coast, with fruit also drawn from a small number of named sites.',
    style: 'Ripeness taken to its limit: tropical, oily Chardonnay and dense, sweetly fruited Pinot Noir, both in new oak.',
    t: 'Ripeness as a doctrine: tropical Chardonnay, dense Pinot, tiny releases',
    why: 'Helen Turley and John Wetlaufer\'s house is the standard-bearer of the maximalist California style, and Turley\'s consulting shaped several of the cult Napa reds. Marcassin is the name a question uses when it wants the opposite pole from In Pursuit of Balance.',
    wines: [
      { n: 'Marcassin Vineyard Chardonnay', grape: 'Chardonnay', note: 'The estate white that defined extreme coastal ripeness' },
      { n: 'Marcassin Vineyard Pinot Noir', grape: 'Pinot Noir', note: 'The red counterpart, equally scarce' }
    ],
    traps: [
      'Helen Turley is not connected to Turley Wine Cellars, which is her brother Larry\'s',
      'Sonoma Coast is a very large AVA; the true coastal ridges are a small part of it',
      'Marcassin is mailing list only, so it rarely appears on a list'
    ]
  },
  {
    id: 'p-mayacamas', p: 'Mayacamas Vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Mount Veeder',
    founded: '1889',
    holdings: 'A stone winery and high-elevation vineyards on Mount Veeder, above the fog line on the western ridge.',
    style: 'Mountain austerity: low alcohol by Napa standards, high acid, tight cassis and dried herb, tannin that needs a decade.',
    t: 'Mountain austerity: tight cassis, dried herb, acid and tannin built for decades',
    why: 'The reference point for cool, high-elevation Napa Cabernet and a useful counterweight to valley-floor richness. It is also one of the six California reds shown at the Judgement of Paris.',
    wines: [
      { n: 'Mount Veeder Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The 1971 was in the red flight at the 1976 Paris tasting' },
      { n: 'Chardonnay', grape: 'Chardonnay', note: 'Lean, ageworthy, unfashionably firm' }
    ],
    traps: [
      'Mount Veeder is a Napa AVA on the Mayacamas range, which also forms the Sonoma border',
      'The range is spelled Mayacamas; the winery is one producer within it, not the whole appellation',
      'Its style is deliberately lower in alcohol than modern Napa, which misleads blind tasters'
    ]
  },
  {
    id: 'p-mission-hill', p: 'Mission Hill Family Estate',
    country: 'The United States and Canada', r: 'Okanagan Valley', sub: '',
    founded: '',
    holdings: 'Estate vineyards across the Okanagan Valley in British Columbia, from West Kelowna south towards the desert at Osoyoos.',
    style: 'Warm, dry-climate Bordeaux blends: cassis and sage over firm tannin, with aromatic whites from the cooler north of the valley.',
    t: 'Okanagan desert-lake Bordeaux blend: cassis, sage, firm mountain tannin',
    why: 'Anthony von Mandl\'s estate put British Columbia on the map when its 1992 Chardonnay took a trophy at the International Wine and Spirit Competition. The Okanagan is the answer when a question moves Canada west of Ontario.',
    wines: [
      { n: 'Oculus', grape: 'Bordeaux blend', note: 'The estate flagship and British Columbia\'s best-known red' },
      { n: 'Perpetua', grape: 'Chardonnay', note: 'The estate Chardonnay' },
      { n: 'Riesling', grape: 'Riesling', note: 'From the cooler northern end of the valley' }
    ],
    traps: [
      'The Okanagan is a dry rain-shadow valley moderated by a deep lake, not a cool maritime zone',
      'British Columbia runs its own VQA separately from Ontario',
      'Oculus is a Bordeaux blend, not an Icewine; BC makes both'
    ]
  },
  {
    id: 'p-mount-eden-vineyards', p: 'Mount Eden Vineyards',
    country: 'The United States and Canada', r: 'Santa Cruz Mountains', sub: '',
    founded: '1972',
    holdings: 'A high ridge estate above Saratoga, unirrigated, on the property Martin Ray planted in the 1940s.',
    style: 'Flinty, taut Chardonnay with lemon pith and tension in place of flesh; Pinot Noir lean and savory.',
    t: 'Own-rooted mountain Chardonnay: flint, lemon pith, tension over flesh',
    why: 'The estate descends from Martin Ray, the contrarian who insisted on estate-grown varietal wines decades before the idea was normal, and its Chardonnay selection is one of the heritage clonal sources in California.',
    wines: [
      { n: 'Estate Chardonnay', grape: 'Chardonnay', note: 'One of the oldest continuously producing Chardonnay selections in California' },
      { n: 'Estate Pinot Noir', grape: 'Pinot Noir', note: 'A cool mountain reading of the grape' },
      { n: 'Estate Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'Firm, herbal, slow to open' }
    ],
    traps: [
      'Mount Eden is not a Napa property; it sits in the Santa Cruz Mountains',
      'Martin Ray is also a separate commercial brand today, unconnected to the estate',
      'The Chardonnay is lean and mineral, so it rarely reads as California blind'
    ]
  },
  {
    id: 'p-peter-michael', p: 'Peter Michael Winery',
    country: 'The United States and Canada', r: 'Sonoma County', sub: 'Knights Valley',
    founded: '1982',
    holdings: 'Steep estate vineyards in Knights Valley on the Sonoma side of Mount St. Helena, plus a Pinot Noir property in Fort Ross-Seaview.',
    style: 'Burgundian technique applied without compromise: citrus oil and smoke in the whites, a long line rather than weight.',
    t: 'Knights Valley Chardonnay in Burgundian dress: citrus oil, smoke, long line',
    why: 'An English founder building a block-by-block Burgundian estate in a warm Sonoma appellation, which makes it a useful example of technique overriding climate expectation. Knights Valley is the AVA most candidates cannot place.',
    wines: [
      { n: 'Ma Belle-Fille', grape: 'Chardonnay', note: 'One of several named estate block Chardonnays' },
      { n: 'Belle Côte', grape: 'Chardonnay', note: 'The neighbouring block, bottled separately' },
      { n: 'Les Pavots', grape: 'Bordeaux blend', note: 'The estate red from Knights Valley' }
    ],
    traps: [
      'Knights Valley is in Sonoma County even though it sits beside Napa\'s Calistoga',
      'Les Pavots is a Bordeaux blend, not a Chardonnay',
      'The named cuvees are blocks on one estate, not separate vineyards bought in'
    ]
  },
  {
    id: 'p-quilceda-creek', p: 'Quilceda Creek',
    country: 'The United States and Canada', r: 'Columbia Valley', sub: '',
    founded: '1978',
    holdings: 'Estate and contracted Cabernet from Horse Heaven Hills and Red Mountain, including long-standing blocks at Champoux.',
    style: 'Pure black fruit and seamless power: Washington Cabernet with no green edge and an unusually polished tannin.',
    t: 'Washington\'s 100-point Cab: pure black fruit, seamless power',
    why: 'Founded by Alex Golitzin, nephew of André Tchelistcheff, which links Washington\'s benchmark Cabernet directly to the man who built Napa. It is the reference producer when a question asks what Washington Cabernet should taste like.',
    wines: [
      { n: 'Cabernet Sauvignon Columbia Valley', grape: 'Cabernet Sauvignon', note: 'The flagship blend of the top sites' },
      { n: 'Galitzine Vineyard', grape: 'Cabernet Sauvignon', note: 'Red Mountain fruit under the family name' },
      { n: 'Palengat', grape: 'Bordeaux blend', note: 'A Horse Heaven Hills site' }
    ],
    traps: [
      'Washington vines are largely own-rooted because phylloxera scarcely took hold there',
      'Red Mountain is a small hot AVA inside the Yakima Valley, itself inside the Columbia Valley'
    ]
  },
  {
    id: 'p-qupe', p: 'Qupé',
    country: 'The United States and Canada', r: 'Central Coast', sub: 'Santa María Valley',
    founded: '1982',
    holdings: 'Long-term blocks in Bien Nacido, including the hillside X Block planted to Syrah.',
    style: 'Cool-climate Syrah with white pepper, olive and cured meat over firm acid, and serious Marsanne and Roussanne.',
    t: 'Cool-climate Syrah: white pepper, olive, bacon fat over Santa María acid',
    why: 'Bob Lindquist was a founding figure of the Rhône Rangers and proved California Syrah could be northern Rhône in register rather than Australian. Qupe is the name for cool-climate Syrah in a Central Coast question.',
    wines: [
      { n: 'Bien Nacido X Block Syrah', grape: 'Syrah', note: 'The hillside block that defines cool California Syrah' },
      { n: 'Marsanne', grape: 'Marsanne', note: 'One of the longest-running Rhône white programmes in California' },
      { n: 'Central Coast Syrah', grape: 'Syrah', note: 'The house introduction to the style' }
    ],
    traps: [
      'Rhône Rangers is an informal movement, not an appellation or a legal category',
      'Qupe\'s Syrah is peppery and savory, so it blinds toward the northern Rhône',
      'Bien Nacido X Block is a named block within a larger grower\'s vineyard'
    ]
  },
  {
    id: 'p-ravenswood', p: 'Ravenswood',
    country: 'The United States and Canada', r: 'Sonoma County', sub: '',
    founded: '1976',
    holdings: 'Built on old mixed-planting Zinfandel vineyards across Sonoma, including Old Hill Ranch, Teldeschi and Belloni.',
    style: 'Field-blend Zinfandel fermented with native yeast: bramble, black pepper and old-vine grip rather than jam.',
    t: 'Field-blend Zinfandel: bramble, black pepper, old-vine grip, no wimpy wines',
    why: 'Joel Peterson made the case that Zinfandel deserved single-vineyard treatment and that California\'s old mixed plantings were a heritage worth saving. The house motto is the standard mnemonic for the style.',
    wines: [
      { n: 'Old Hill Ranch Zinfandel', grape: 'Zinfandel led field blend', note: 'An old Sonoma Valley mixed planting' },
      { n: 'Teldeschi Zinfandel', grape: 'Zinfandel led field blend', note: 'Dry Creek Valley old vines' },
      { n: 'Dickerson Zinfandel', grape: 'Zinfandel', note: 'A Napa site with a distinct minty signature' }
    ],
    traps: [
      'Old-vine field blends contain Carignane, Petite Sirah and others, so they are not pure Zinfandel',
      'Ravenswood was sold to a large group in 2001, splitting the brand from Peterson\'s later work',
      'Zinfandel and Primitivo are the same variety, genetically Tribidrag from Croatia'
    ]
  },
  {
    id: 'p-ridge-vineyards', p: 'Ridge Vineyards',
    country: 'The United States and Canada', r: 'Santa Cruz Mountains', sub: 'Monte Bello Ridge',
    founded: '1962',
    holdings: 'The Monte Bello vineyard on a limestone-bearing ridge above the San Andreas fault, where Osea Perrone built a winery in the 1880s, plus Lytton Springs in Dry Creek Valley and Geyserville in Alexander Valley.',
    style: 'American oak, field-blend Zinfandel, minimal intervention and full ingredient labelling; reds of iron and cassis that unfold over decades.',
    t: 'Mountain Cabernet: American oak, iron, decades-long curve; Paris-tasting royalty',
    why: 'Paul Draper\'s house is simultaneously the reference for cool-climate California Cabernet and for serious old-vine Zinfandel. Ridge also pioneered listing every ingredient on the back label, which is an examinable point of principle.',
    wines: [
      { n: 'Monte Bello', grape: 'Cabernet Sauvignon led Bordeaux blend', note: 'Fifth at the 1976 Paris tasting and first when that flight was re-tasted in 2006' },
      { n: 'Geyserville', grape: 'Zinfandel led field blend', note: 'An old Alexander Valley field blend with Carignane and Petite Sirah' },
      { n: 'Lytton Springs', grape: 'Zinfandel led field blend', note: 'The Dry Creek Valley counterpart' }
    ],
    traps: [
      'Geyserville and Lytton Springs are field blends, so they are not labelled as Zinfandel every year',
      'Monte Bello is in the Santa Cruz Mountains, well south of Napa',
      'Ridge uses American oak, which misleads candidates into guessing a warmer region'
    ]
  },
  {
    id: 'p-robert-mondavi', p: 'Robert Mondavi Winery',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Oakville',
    founded: '1966',
    holdings: 'A substantial holding in the To Kalon vineyard at Oakville, the single most contested vineyard name in California.',
    style: 'Cassis and violet from To Kalon in the reds; the whites defined a smoky, barrel-touched Sauvignon Blanc idiom.',
    t: 'Cassis and violet from To Kalon; Fumé Blanc\'s smoky, oak-kissed Sauvignon',
    why: 'The first large new winery built in Napa after Prohibition, and the engine of the valley\'s post-1966 reinvention. Robert Mondavi coined Fumé Blanc, co-founded Opus One, and pushed varietal labelling and vineyard designation into the mainstream.',
    wines: [
      { n: 'To Kalon Reserve Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The estate\'s case for Oakville as Napa\'s heart' },
      { n: 'Fumé Blanc', grape: 'Sauvignon Blanc', note: 'The coined name that made dry oaked Sauvignon Blanc sell in America' },
      { n: 'Opus One', grape: 'Bordeaux blend', note: 'The 1979 joint venture with Baron Philippe de Rothschild, now its own winery' }
    ],
    traps: [
      'To Kalon is split between several owners including Beckstoffer, MacDonald and Detert, and the name has been litigated',
      'Fumé Blanc is a marketing name for Sauvignon Blanc, not a grape or a legal term',
      'Robert Mondavi Winery and the Woodbridge line are different tiers under the same family name'
    ]
  },
  {
    id: 'p-sanford', p: 'Sanford Winery',
    country: 'The United States and Canada', r: 'Central Coast', sub: 'Sta. Rita Hills',
    founded: '1981',
    holdings: 'The Sanford and Benedict vineyard, planted to Pinot Noir in 1971, the first in what is now the Sta. Rita Hills.',
    style: 'Cool maritime Pinot: cranberry, blood orange and a saline edge from the fog funnelling up the transverse valley.',
    t: 'Sta. Rita Hills from the first plantings: cranberry, blood orange, sea air',
    why: 'Richard Sanford and Michael Benedict planted Pinot Noir here in 1971 on the reasoning that the east-west transverse valleys pull cold ocean air inland. The AVA that followed in 2001 exists because of that vineyard.',
    wines: [
      { n: 'Sanford and Benedict Vineyard Pinot Noir', grape: 'Pinot Noir', note: 'The founding vineyard of Sta. Rita Hills Pinot' },
      { n: 'La Rinconada Pinot Noir', grape: 'Pinot Noir', note: 'The adjoining estate site' },
      { n: 'Chardonnay', grape: 'Chardonnay', note: 'The cool-climate white from the same hills' }
    ],
    traps: [
      'It is written Sta. Rita Hills, abbreviated to avoid conflict with Chile\'s Santa Rita',
      'Richard Sanford later founded Alma Rosa, a separate producer',
      'The transverse valley orientation is the reason for the cold, not altitude'
    ]
  },
  {
    id: 'p-saxum', p: 'Saxum Vineyards',
    country: 'The United States and Canada', r: 'Central Coast', sub: 'Willow Creek District, Paso Robles',
    founded: '2000',
    holdings: 'The James Berry vineyard on calcareous soils in the western hills of Paso Robles, farmed by the Smith family.',
    style: 'Paso at full volume but not flabby: blueberry, smoked meat and glycerol weight lifted by the site\'s acidity.',
    t: 'Paso at full volume: blueberry, smoked meat, glycerol weight, still lifted',
    why: 'Justin Smith\'s estate is the reference point for modern Paso Robles Rhône blends and the reason candidates are expected to know the western Paso sub-AVAs and their limestone. It is the warm-climate counterweight to Qupe.',
    wines: [
      { n: 'James Berry Vineyard', grape: 'Rhône blend', note: 'The estate wine from the home vineyard' },
      { n: 'Bone Rock', grape: 'Syrah led blend', note: 'A block on fossil-bearing rock' },
      { n: 'Heart Stone Vineyard', grape: 'Rhône blend', note: 'A second named site in the same hills' }
    ],
    traps: [
      'Paso Robles was divided into eleven sub-AVAs in 2014; Willow Creek is one of them',
      'Saxum makes blends, so a varietal answer of Syrah is incomplete',
      'James Berry is the family vineyard name, not a separate producer'
    ]
  },
  {
    id: 'p-schramsberg', p: 'Schramsberg Vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Diamond Mountain District',
    founded: '1862',
    holdings: 'Hand-dug caves in the hillside at Calistoga; sparkling fruit contracted from cool Napa, Sonoma, Marin and Mendocino sites.',
    style: 'Traditional method with real bottle age: chalk, toast and citrus rather than fruit sweetness.',
    t: 'Caves, chalk and toast: American traditional-method sparkling with real age',
    why: 'Founded by Jacob Schram in 1862 and revived by Jack and Jamie Davies in 1965, it is the answer to who made America\'s first serious traditional-method sparkling wine. Nixon\'s 1972 toast in Beijing was poured from Schramsberg.',
    wines: [
      { n: 'J. Schram', grape: 'Chardonnay led traditional method', note: 'The tete de cuvee of the house' },
      { n: 'Blanc de Blancs', grape: 'Chardonnay', note: 'The first commercial American traditional-method Blanc de Blancs' },
      { n: 'J. Davies Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The still red from Diamond Mountain' }
    ],
    traps: [
      'The 1862 founding and the 1965 revival are two separate facts',
      'Schramsberg makes sparkling wine; the still Cabernet trades as J. Davies',
      'Not a Champagne house partnership like Domaine Chandon or Roederer Estate'
    ]
  },
  {
    id: 'p-screaming-eagle', p: 'Screaming Eagle',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Oakville',
    founded: '1986',
    holdings: 'A small Oakville property on the eastern side of the valley floor, with production measured in hundreds of cases.',
    style: 'Deep cassis liqueur over velvet tannin, made in quantities too small to establish any pattern beyond scarcity.',
    t: 'The cult of cults: cassis liqueur, velvet, waiting-list mythology',
    why: 'The defining name of the 1990s Napa cult era, founded by Jean Phillips with Heidi Barrett making the early wines. It is the standard example of price driven by scarcity and score rather than by classification.',
    wines: [
      { n: 'Screaming Eagle Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'First vintage 1992, the defining cult allocation' },
      { n: 'Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'A tiny release, among the most scarce whites in America' }
    ],
    traps: [
      'The first vintage is 1992, not the 1986 purchase of the land',
      'Second Flight is the second wine, not a different producer',
      'Its fame rests on scarcity and scores, not on a distinct vineyard classification',
      'First vintage is 1992, not the mid-1980s land purchase',
      'Second Flight is the second wine of the same estate',
      'Stan Kroenke has owned it since 2006, so founder questions need care'
    ]
  },
  {
    id: 'p-shafer-vineyards', p: 'Shafer Vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Stags Leap District',
    founded: '1972',
    holdings: 'Terraced hillside blocks in the Stags Leap District, plus Red Shoulder Ranch in Carneros for Chardonnay.',
    style: 'Warm, plush Stags Leap fruit given cocoa and vanilla from new oak, but framed by the district\'s fine tannin.',
    t: 'Stags Leap warmth: cocoa, black cherry, plush but firmly framed',
    why: 'The commercial benchmark for opulent Stags Leap District Cabernet and the counterweight to Stag\'s Leap Wine Cellars in the same AVA. Hillside Select is one of the few Napa names a candidate should be able to place by vineyard type without hesitation.',
    wines: [
      { n: 'Hillside Select', grape: 'Cabernet Sauvignon', note: 'The estate flagship from the terraced hillside blocks' },
      { n: 'One Point Five', grape: 'Cabernet Sauvignon', note: 'The district bottling, named for the generation and a half of the family' },
      { n: 'Red Shoulder Ranch Chardonnay', grape: 'Chardonnay', note: 'Carneros fruit, the house white' }
    ],
    traps: [
      'Hillside Select is a selection of estate hillside blocks, not a named single vineyard',
      'Shafer\'s Chardonnay is Carneros fruit, not Stags Leap',
      'Stags Leap District is a Napa AVA and takes no apostrophe'
    ]
  },
  {
    id: 'p-sine-qua-non', p: 'Sine Qua Non',
    country: 'The United States and Canada', r: 'Central Coast', sub: '',
    founded: '1994',
    holdings: 'Estate vineyards in Santa Barbara County including Eleven Confessions in the Sta. Rita Hills, plus long-standing contracts.',
    style: 'Syrah and Grenache at the outer edge of ripeness: violet, bacon, glycerine and new oak, every release relabelled and renamed.',
    t: 'Extreme Syrah and Grenache: violet, bacon, glycerine, a new name each release',
    why: 'Manfred Krankl\'s house is the most extreme expression of the California cult model and the only one where the wine names change with every bottling, which is itself the examinable quirk. The Kracher collaboration links it to Austrian botrytis wine.',
    wines: [
      { n: 'Syrah bottlings', grape: 'Syrah', note: 'Named anew each release, so the vintage and label identify the wine' },
      { n: 'Grenache bottlings', grape: 'Grenache', note: 'The other half of the house' },
      { n: 'Mr. K dessert wines', grape: 'Various', note: 'A collaboration with Alois Kracher of Burgenland' }
    ],
    traps: [
      'There is no fixed cuvee name, so a wine is identified by vintage and label',
      'The winery is in Ventura County but the fruit is Santa Barbara',
      'Sine Qua Non is Rhône varieties, not Cabernet, unlike most California cults'
    ]
  },
  {
    id: 'p-spottswoode', p: 'Spottswoode Estate',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'St. Helena',
    founded: '1982',
    holdings: 'A walled estate vineyard on the western edge of St. Helena, farmed organically since the mid 1980s.',
    style: 'Fine-grained and floral rather than massive: cassis and violet with tannin that is tight but never coarse.',
    t: 'Organic St. Helena grace: cassis, violet, fine-grained tannin, no excess',
    why: 'One of the earliest certified organic estates in Napa and the usual counterexample when a candidate assumes Napa Cabernet means scale. The Novak family bought the property in 1972 and the first estate Cabernet followed a decade later.',
    wines: [
      { n: 'Estate Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The St. Helena benchmark for restraint within ripeness' },
      { n: 'Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'A serious Napa white in a valley that mostly abandoned the grape' }
    ],
    traps: [
      'Spottswoode is an estate on the valley floor edge, not a mountain site',
      'Organic farming here began in the mid 1980s, well before the biodynamic wave reached California',
      'The Sauvignon Blanc is a serious bottling, not a second-tier white'
    ]
  },
  {
    id: 'p-stags-leap-wine-cellars', p: 'Stag\'s Leap Wine Cellars',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Stags Leap District',
    founded: '1970',
    holdings: 'The S.L.V. vineyard planted by Warren Winiarski and the neighbouring Fay vineyard, both in the Stags Leap District.',
    style: 'The district signature: violet perfume, black cherry and a fine dusty tannin that never reads as heavy.',
    t: 'Stags Leap silk: violet, black cherry, fine dusty tannin, never heavy',
    why: 'The 1973 Cabernet that beat First Growths in the 1976 Paris tasting. Candidates are expected to name the wine, the vineyard and the fact that the winery and the AVA are spelled differently.',
    wines: [
      { n: 'Cask 23', grape: 'Cabernet Sauvignon', note: 'A selection blending the S.L.V. and Fay vineyards, first made in 1974' },
      { n: 'S.L.V. Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The vineyard whose 1973 won the red flight in Paris' },
      { n: 'Fay Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The softer, more perfumed neighbour' }
    ],
    traps: [
      'The winery takes an apostrophe, the AVA Stags Leap District does not',
      'Stag\'s Leap Wine Cellars and Stags\' Leap Winery are two separate properties, and the naming was litigated',
      'The Paris-winning wine came from S.L.V. fruit; Cask 23 was not made until 1974'
    ]
  },
  {
    id: 'p-stony-hill', p: 'Stony Hill Vineyard',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Spring Mountain District',
    founded: '1943',
    holdings: 'Vineyards high on Spring Mountain, planted to Chardonnay from the late 1940s along with Riesling and Gewürztraminer.',
    style: 'Chardonnay made without new oak and without malolactic fermentation: lean apple and lime, and a life measured in decades.',
    t: 'No new oak, no malolactic: lean apple and lime Chardonnay that ages 30 years',
    why: 'Fred and Eleanor McCrea\'s estate is the proof that California Chardonnay had an austere tradition long before the oaked style arrived. It is the standard blind tasting trap for candidates who equate age and mineral austerity with Chablis.',
    wines: [
      { n: 'Chardonnay', grape: 'Chardonnay', note: 'The counter-tradition to buttery California Chardonnay, first bottled in the early 1950s' },
      { n: 'White Riesling', grape: 'Riesling', note: 'A survivor of Napa\'s cool-climate white past' }
    ],
    traps: [
      'Spring Mountain District is the AVA; Spring Mountain Vineyard is a different producer',
      'The house never used malolactic or new oak, so it will not taste like a typical Napa Chardonnay',
      'Founded in the 1940s but the first Chardonnay vintage came in the early 1950s'
    ]
  },
  {
    id: 'p-tablas-creek', p: 'Tablas Creek Vineyard',
    country: 'The United States and Canada', r: 'Central Coast', sub: 'Adelaida District, Paso Robles',
    founded: '1989',
    holdings: 'Limestone hillsides on the western side of Paso Robles, planted from cuttings imported from Château de Beaucastel and propagated in the estate\'s own nursery.',
    style: 'Châteauneuf grammar on California limestone: garrigue, fennel and a chalky grip, blends rather than varietals.',
    t: 'Beaucastel\'s cuttings in Paso limestone: garrigue, fennel, chalky grip',
    why: 'A partnership between the Perrin family of Château de Beaucastel and the importer Robert Haas. Its quarantined nursery supplied much of the certified Rhône plant material now growing in the United States, which is the durable examinable fact.',
    wines: [
      { n: 'Esprit de Tablas', grape: 'Mourvèdre led Rhône blend', note: 'The estate flagship red, Beaucastel\'s proportions in Paso' },
      { n: 'Esprit de Tablas Blanc', grape: 'Roussanne led Rhône blend', note: 'The white counterpart' },
      { n: 'Côtes de Tablas', grape: 'Grenache led Rhône blend', note: 'The earlier-drinking red blend' }
    ],
    traps: [
      'Adelaida District is one of eleven Paso Robles sub-AVAs created in 2014',
      'The cuttings came from Beaucastel in Châteauneuf-du-Pape, not from a nursery in France generally',
      'Esprit de Tablas is Mourvèdre-led, unlike most California Rhône blends'
    ]
  },
  {
    id: 'p-tawse', p: 'Tawse Winery',
    country: 'The United States and Canada', r: 'Niagara Peninsula', sub: 'Twenty Mile Bench',
    founded: '',
    holdings: 'Organically and biodynamically farmed vineyards on the limestone benches below the Niagara Escarpment.',
    style: 'Taut Chardonnay and cool red-fruited Pinot Noir from limestone, made with Burgundian restraint rather than Icewine sweetness.',
    t: 'Niagara limestone: taut Chardonnay and cool, red-fruited Pinot, organically farmed',
    why: 'The producer to name when a question asks what Ontario makes besides Icewine. The Niagara Escarpment sub-appellations, Twenty Mile Bench among them, are the fine detail examiners use to separate prepared candidates.',
    wines: [
      { n: 'Quarry Road Chardonnay', grape: 'Chardonnay', note: 'A named bench site on the escarpment' },
      { n: 'Quarry Road Pinot Noir', grape: 'Pinot Noir', note: 'The red from the same vineyard' },
      { n: 'Cabernet Franc', grape: 'Cabernet Franc', note: 'The Niagara red that ripens most reliably' }
    ],
    traps: [
      'Ontario\'s VQA is statutory law, not a voluntary trade scheme',
      'Niagara Escarpment and Niagara-on-the-Lake are different regional appellations within the Niagara Peninsula',
      'Cabernet Franc, not Cabernet Sauvignon, is Niagara\'s dependable red'
    ]
  },
  {
    id: 'p-eyrie-vineyards', p: 'The Eyrie Vineyards',
    country: 'The United States and Canada', r: 'Willamette Valley', sub: 'Dundee Hills',
    founded: '1966',
    holdings: 'Original own-rooted plantings in the Dundee Hills on volcanic Jory soil, set by David Lett in 1965.',
    style: 'Pale, red-fruited and earthy at low alcohol: the deliberately un-Californian Willamette blueprint.',
    t: 'David Lett\'s 1965 pioneer: pale, earthy, red-fruited Willamette blueprint',
    why: 'David Lett planted Pinot Noir in the Dundee Hills in 1965 against the advice of everyone at Davis. His 1975 South Block placed in the 1979 Gault-Millau tasting in Paris, and the 1980 rematch organised by Robert Drouhin put it second, which brought Drouhin to Oregon.',
    wines: [
      { n: 'South Block Reserve Pinot Noir', grape: 'Pinot Noir', note: 'From the original 1965 planting' },
      { n: 'Estate Pinot Gris', grape: 'Pinot Gris', note: 'The first Pinot Gris planted in America' },
      { n: 'Original Vines Pinot Noir', grape: 'Pinot Noir', note: 'The house\'s statement of its own history' }
    ],
    traps: [
      'Lett also planted the first American Pinot Gris, a frequently missed fact',
      'Jory is the volcanic soil of the Dundee Hills; marine sediment lies elsewhere in the valley',
      'Oregon requires 90 percent of the named variety, not the federal 75'
    ]
  },
  {
    id: 'p-turley', p: 'Turley Wine Cellars',
    country: 'The United States and Canada', r: 'California', sub: 'Napa, Sonoma, Paso Robles, Amador and Lodi',
    founded: '1993',
    holdings: 'Around fifty old-vine parcels across California, many of them pre-Prohibition plantings of Zinfandel and Petite Sirah.',
    style: 'Vineyard by vineyard, at full ripeness: briar fruit, high alcohol, and tannin from genuinely old vines.',
    t: 'Old-vine Zinfandel and Petite Sirah: briar fruit and vineyard-by-vineyard grip',
    why: 'Larry Turley, who co-founded Frog\'s Leap, built the largest working archive of California\'s surviving old vines. Turley is the name to give when asked who preserved the pre-Prohibition vineyards, and the estate ties together Amador, Lodi, Paso Robles and Napa in one answer.',
    wines: [
      { n: 'Hayne Vineyard Zinfandel', grape: 'Zinfandel', note: 'An old St. Helena planting, the most sought of the range' },
      { n: 'Hayne Vineyard Petite Syrah', grape: 'Petite Sirah', note: 'The other half of the Hayne story' },
      { n: 'Dusi Vineyard Zinfandel', grape: 'Zinfandel', note: 'Paso Robles old vines' }
    ],
    traps: [
      'Larry Turley and Helen Turley of Marcassin are siblings but separate producers',
      'Petite Sirah is Durif, not a small-berried Syrah clone',
      'Zinfandel\'s old vines survived largely because White Zinfandel kept them profitable'
    ]
  },
  {
    id: 'p-williams-selyem', p: 'Williams Selyem',
    country: 'The United States and Canada', r: 'Sonoma County', sub: 'Russian River Valley',
    founded: '',
    holdings: 'Estate vineyards in the Russian River Valley plus long contracts on named sites including Rochioli Riverblock and Allen Vineyard.',
    style: 'Sappy red fruit, forest floor and a soft whole-cluster perfume; Pinot made for immediacy as much as for age.',
    t: 'Russian River Pinot with sappy red fruit, forest floor and mailing-list lore',
    why: 'Burt Williams and Ed Selyem began in a Forestville garage in the early 1980s and made Russian River Pinot Noir collectible. They effectively invented the California mailing-list allocation model that the Napa cults later adopted.',
    wines: [
      { n: 'Rochioli Riverblock Pinot Noir', grape: 'Pinot Noir', note: 'The contracted block that built the reputation' },
      { n: 'Allen Vineyard Pinot Noir', grape: 'Pinot Noir', note: 'The neighbouring Westside Road site' },
      { n: 'Zinfandel', grape: 'Zinfandel', note: 'An old-vine sideline from Sonoma' }
    ],
    traps: [
      'Williams Selyem buys the Rochioli fruit; the Rochioli family bottle under their own name too',
      'The house was sold to John Dyson in 1998, so the founders are no longer involved',
      'Russian River Valley is cooled by fog through the Petaluma Gap, not by altitude'
    ]
  },
  {
    id: 'p-woodward-canyon', p: 'Woodward Canyon Winery',
    country: 'The United States and Canada', r: 'Columbia Valley', sub: 'Walla Walla Valley',
    founded: '1981',
    holdings: 'Estate vineyards in the Walla Walla Valley plus long contracts on older Columbia Valley blocks.',
    style: 'Dark and savory Cabernet in an older Washington register: dried herb, cedar and firm structure over sweetness.',
    t: 'Walla Walla\'s second winery: dark, savory Cabernet with old-school grip',
    why: 'Rick Small founded the second winery in the Walla Walla Valley in 1981, four years after Leonetti. The pair together are the standard answer to how the appellation began.',
    wines: [
      { n: 'Old Vines Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'From some of the oldest Cabernet blocks in the state' },
      { n: 'Artist Series Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The long-running Columbia Valley bottling' },
      { n: 'Estate Red', grape: 'Bordeaux blend', note: 'The Walla Walla estate wine' }
    ],
    traps: [
      'Second in Walla Walla, after Leonetti in 1977',
      'Woodward Canyon is a producer, not a vineyard or an AVA',
      'Much of its fruit comes from the wider Columbia Valley, not only Walla Walla'
    ]
  },
  {
    id: 'w-cask-23', p: 'Cask 23',
    by: 'p-stags-leap-wine-cellars',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Stags Leap District',
    founded: '1974',
    holdings: 'A selection drawn from the S.L.V. and Fay vineyards, the two estate sites of Stag\'s Leap Wine Cellars.',
    style: 'The Stags Leap signature at its most complete: violet perfume, black cherry and a fine tannin that never grips hard.',
    t: 'A blend of Fay and S.L.V.: violet, black cherry, Stags Leap silk',
    why: 'The flagship of the house whose 1973 won the Paris red flight. Candidates are expected to know that the Paris wine was S.L.V. fruit and that Cask 23 came later as a barrel selection.',
    wines: [
      { n: 'Cask 23', grape: 'Cabernet Sauvignon', note: 'First made in 1974 and made only in vintages judged worthy' }
    ],
    traps: [
      'The 1976 Paris winner was the 1973 Cabernet, not Cask 23',
      'The winery takes an apostrophe, the Stags Leap District AVA does not',
      'Cask 23 is not made every vintage'
    ]
  },
  {
    id: 'w-dominus', p: 'Dominus',
    by: 'p-dominus-estate',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Yountville',
    founded: '1983',
    holdings: 'The Napanook vineyard at Yountville, a gravelly bench planted in the nineteenth century.',
    style: 'Dry, savory and dusty: Bordeaux tannin and no sweetness on the finish, in a valley that usually offers both.',
    t: 'Napanook gravel: savory, dusty, Bordeaux-shaped Napa with no sweetness',
    why: 'The clearest case of a Bordeaux proprietor working in Napa on his own terms, and a single-vineyard wine in a valley of blends. Napanook is the vineyard name a candidate must supply.',
    wines: [
      { n: 'Dominus', grape: 'Cabernet Sauvignon led Bordeaux blend', note: 'Christian Moueix\'s Napa grand vin from a single vineyard' }
    ],
    traps: [
      'Moueix is a Pomerol name but Dominus is Cabernet-led',
      'Napanook is both the vineyard and the name of the second wine',
      'Yountville AVA, not Oakville'
    ]
  },
  {
    id: 'w-eisele-vineyard', p: 'Eisele Vineyard Cabernet Sauvignon',
    by: 'p-eisele-vineyard-estate',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Calistoga',
    founded: '',
    holdings: 'A gravelly alluvial vineyard at the northern end of the valley near Calistoga, farmed biodynamically.',
    style: 'Scale without heaviness: cassis and sage over graphite, with an iron-fine tannin that holds its line for decades.',
    t: 'Calistoga\'s great vineyard: sage, cassis, graphite, iron-fine tannin',
    why: 'One of the few Napa sites whose name is more famous than any producer\'s. Ridge and Conn Creek made early vineyard-designates, Joseph Phelps bottled it through the 1970s and 1980s, the Araujos owned it from 1990, and the Pinault family\'s Artémis Domaines restored the vineyard name to the label.',
    wines: [
      { n: 'Eisele Vineyard Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'A vineyard name that has outlasted every owner and every label it has appeared under' }
    ],
    traps: [
      'Araujo Estate and Eisele Vineyard Estate are the same site under different owners',
      'Joseph Phelps made the wine for years but never owned the vineyard',
      'Calistoga, at the warm northern end, not the Oakville or Rutherford bench'
    ]
  },
  {
    id: 'w-georges-de-latour-private-reserve', p: 'Georges de Latour Private Reserve',
    by: 'p-beaulieu-vineyard',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Rutherford',
    founded: '1936',
    holdings: 'Selected Rutherford bench blocks of the Beaulieu estate.',
    style: 'The old Napa register: cedar, cassis and dried herb with a dusty, drying tannin and considerable length.',
    t: 'Rutherford dust made doctrine: cedar, cassis, dried herb, old-school length',
    why: 'The longest-running reserve Cabernet in Napa and the wine through which André Tchelistcheff taught the valley what Rutherford could do. It is the historical anchor of any question about Napa before the cult era.',
    wines: [
      { n: 'Georges de Latour Private Reserve', grape: 'Cabernet Sauvignon', note: 'First made in 1936 and shaped for decades by André Tchelistcheff' }
    ],
    traps: [
      'Named for the founder of Beaulieu, not for a separate estate',
      'First vintage 1936, well before the 1976 Paris tasting generation',
      'Rutherford dust is a tannin texture in tasting language, not a soil classification'
    ]
  },
  {
    id: 'w-hillside-select', p: 'Hillside Select',
    by: 'p-shafer-vineyards',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Stags Leap District',
    founded: '1983',
    holdings: 'Terraced hillside blocks on the Shafer estate in the Stags Leap District.',
    style: 'Warm and opulent within a district known for finesse: cocoa, black cherry and velvet tannin from new oak.',
    t: 'Stags Leap hillside opulence: cocoa, black cherry, velvet tannin',
    why: 'The commercial benchmark for the plush side of the Stags Leap District, and the usual contrast with Stag\'s Leap Wine Cellars in the same appellation. It is a selection of hillside blocks, not a single named vineyard.',
    wines: [
      { n: 'Hillside Select', grape: 'Cabernet Sauvignon', note: 'The estate\'s top selection, made only from the terraced hillside blocks' }
    ],
    traps: [
      'A block selection, not a single-vineyard designation',
      'Shafer\'s Chardonnay comes from Carneros, not from these blocks',
      'Stags Leap District takes no apostrophe'
    ]
  },
  {
    id: 'w-insignia', p: 'Insignia',
    by: 'p-joseph-phelps',
    country: 'The United States and Canada', r: 'Napa Valley', sub: '',
    founded: '1974',
    holdings: 'A selection of Napa vineyards assembled by Joseph Phelps, including estate sites; the composition varies by vintage.',
    style: 'Polished and ripe: cassis and graphite under sweet oak, plush but framed.',
    t: 'Napa\'s first proprietary blend: cassis, sweet oak, plush but structured',
    why: 'The answer to who first made a Napa proprietary Bordeaux blend under a coined name. It predates the Meritage alliance by more than a decade, which is exactly the distinction a trap question is built on.',
    wines: [
      { n: 'Insignia', grape: 'Bordeaux blend', note: 'First made in 1974, among the first proprietary Bordeaux blends in Napa' }
    ],
    traps: [
      'A proprietary name, not a Meritage designation',
      'The blend changes by vintage and has not always been Cabernet-dominant',
      'Insignia is the wine; Joseph Phelps is the producer'
    ]
  },
  {
    id: 'w-marthas-vineyard', p: 'Martha\'s Vineyard Cabernet Sauvignon',
    by: 'p-heitz-cellar',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Oakville',
    founded: '1966',
    holdings: 'An Oakville vineyard owned by Tom and Martha May and bottled under its own name by Heitz Cellar.',
    style: 'A marked mint and eucalyptus lift over Oakville cassis, released only after several years in the cellar.',
    t: 'Eucalyptus and mint over Oakville cassis, released with years already on it',
    why: 'The wine that established vineyard designation as meaningful in California, and one of the six California reds at the 1976 Paris tasting. The minty marker is a classic blind tasting cue.',
    wines: [
      { n: 'Martha\'s Vineyard Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'First made in 1966, one of the first vineyard-designated Cabernets in Napa' }
    ],
    traps: [
      'Nothing to do with the island of Martha\'s Vineyard in Massachusetts',
      'Heitz bottles the wine but the May family own the vineyard',
      'The vineyard is in Oakville; the Heitz winery is in St. Helena'
    ]
  },
  {
    id: 'w-monte-bello', p: 'Monte Bello',
    by: 'p-ridge-vineyards',
    country: 'The United States and Canada', r: 'Santa Cruz Mountains', sub: 'Monte Bello Ridge',
    founded: '1962',
    holdings: 'A high ridge vineyard above the San Andreas fault on limestone-bearing soils, where Osea Perrone built a winery in the 1880s.',
    style: 'Cabernet-led Bordeaux blend raised in American oak: iron, cassis and dried herb on a curve that runs for decades.',
    t: 'Limestone ridge Cabernet in American oak: iron, cassis, a thirty-year curve',
    why: 'The counterargument to Napa: cool, high, slow-ripening California Cabernet with the longest proven ageing record in the state. Paul Draper\'s decision to use American oak and to publish every ingredient makes it examinable on technique as well as on place.',
    wines: [
      { n: 'Monte Bello', grape: 'Cabernet Sauvignon led Bordeaux blend', note: 'Fifth at the 1976 Paris tasting and first when that flight was re-tasted in 2006' }
    ],
    traps: [
      'Santa Cruz Mountains, not Napa',
      'American oak on a Bordeaux blend misleads blind tasters towards Rioja or Australia',
      'Placed fifth in 1976 but first in the thirtieth anniversary re-tasting'
    ]
  },
  {
    id: 'w-opus-one', p: 'Opus One',
    country: 'The United States and Canada', r: 'Napa Valley', sub: 'Oakville',
    founded: '1979',
    holdings: 'Estate vineyards at Oakville, including land adjoining the historic To Kalon vineyard, with a purpose-built winery completed in 1991.',
    style: 'Bordeaux proportion applied to Napa fruit: cassis and cedar, polish ahead of power, tannin kept fine.',
    t: 'Oakville\'s transatlantic blend: cassis, cedar, polish before power',
    why: 'The first serious joint venture between a First Growth proprietor and a New World producer, agreed between Robert Mondavi and Baron Philippe de Rothschild. Candidates must know the partners, the Oakville home and that the first vintage is 1979.',
    wines: [
      { n: 'Opus One', grape: 'Cabernet Sauvignon led Bordeaux blend', note: 'The first vintage is 1979, released alongside the 1980' },
      { n: 'Overture', grape: 'Bordeaux blend', note: 'The non-vintage second wine of the estate' }
    ],
    traps: [
      'First vintage 1979, released in 1984 together with the 1980',
      'Rothschild here is Baron Philippe of Mouton, not Lafite',
      'Opus One is its own winery and brand, not a Robert Mondavi Winery bottling'
    ]
  },
  {
    id: 'p-achaval-ferrer', p: 'Achaval-Ferrer',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Mendoza', sub: 'Luján de Cuyo and Uco Valley',
    founded: '1998',
    holdings: 'Founded with Italian oenologist Roberto Cipresso; built its reputation on three named old-vine parcels: Finca Altamira in Paraje Altamira, Finca Bella Vista in Luján de Cuyo, and Finca Mirador in Medrano.',
    style: 'Very low yields and full ripeness, but with the three fincas bottled separately to show that Mendoza has sites rather than one Malbec flavour.',
    t: 'Single-vineyard Malbec by finca: Altamira\'s chalk, Bella Vista\'s old-vine depth',
    why: 'The estate that introduced single-vineyard Malbec as a category, which paved the way for Argentina\'s soil-mapped GIs such as Paraje Altamira, drawn by alluvial fan and soil survey.',
    wines: [
      { n: 'Finca Altamira', grape: 'Malbec', note: 'Paraje Altamira alluvial fan, chalky and mineral' },
      { n: 'Finca Bella Vista', grape: 'Malbec', note: 'Old Luján de Cuyo vines, denser and more floral' },
      { n: 'Quimera', grape: 'Malbec led blend', note: 'The house blend across sites' }
    ],
    traps: [
      'Paraje Altamira is a soil-defined GI in the Uco Valley, not in Luján de Cuyo',
      'Finca simply means farm or estate and carries no legal quality meaning'
    ]
  },
  {
    id: 'p-alheit-vineyards', p: 'Alheit Vineyards',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Western Cape', sub: '',
    founded: '2011',
    holdings: 'Chris and Suzaan Alheit work old Chenin Blanc parcels sourced across the Cape, from the Citrusdal Mountain and Olifants River to Stellenbosch and the Helderberg, rather than from one estate.',
    style: 'Whole-bunch pressed, old wood or neutral vessels, no obvious oak: pear skin, salt and chalk, with texture taking the place of aromatic display.',
    t: 'Old-vine Chenin as landscape: pear skin, salt, chalk, no oak signature',
    why: 'The clearest expression of the Cape\'s old-vine Chenin revival, and a reminder that South African Wine of Origin allows a producer to blend across districts under the wide Western Cape appellation.',
    wines: [
      { n: 'Cartology', grape: 'Chenin Blanc with a little Sémillon', note: 'A Cape-wide old-vine blend, the wine that mapped the movement' },
      { n: 'Magnetic North Mountain Makstok', grape: 'Chenin Blanc', note: 'Citrusdal Mountain old bush vines, high and cool' },
      { n: 'Radio Lazarus', grape: 'Chenin Blanc', note: 'A single rescued Stellenbosch vineyard, the name recording its revival' }
    ],
    traps: [
      'Cartology is a Cape-wide blend, so it carries a broad Wine of Origin, not a ward',
      'South African Chenin is called Steen in the older local usage',
      'Wine of Origin guarantees origin and vintage and variety percentages, but sets no style rules'
    ]
  },
  {
    id: 'p-ata-rangi', p: 'Ata Rangi',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Martinborough', sub: 'Wairarapa',
    founded: '1980',
    holdings: 'Founded by Clive Paton on the Martinborough terrace, a free-draining gravel plateau; closely associated with the Abel clone of Pinot Noir, sometimes called the gumboot clone.',
    style: 'Savoury, structured Pinot of dark cherry and dried herb, wind-stressed with small berries and firm tannin.',
    t: 'NZ Pinot benchmark: dark cherry, dried herb, fine-boned structure',
    why: 'Martinborough is small but the first New Zealand district to prove Pinot Noir, and Ata Rangi is its reference estate. The Abel clone story is a standing viticulture question.',
    wines: [
      { n: 'Ata Rangi Pinot Noir', grape: 'Pinot Noir', note: 'The New Zealand Pinot benchmark, built around the Abel clone' },
      { n: 'Craighall Chardonnay', grape: 'Chardonnay', note: 'Single-vineyard Martinborough Chardonnay of some age' },
      { n: 'Celebre', grape: 'Syrah, Cabernet Sauvignon, Merlot', note: 'An unusual Martinborough red blend from the estate\'s early plantings' }
    ],
    traps: [
      'Martinborough sits in the Wairarapa on the North Island, not near Marlborough despite the similar name',
      'Strong winds are a defining viticultural factor here, reducing yields and thickening skins'
    ]
  },
  {
    id: 'p-bouza', p: 'Bodega Bouza',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Canelones', sub: 'Melilla, near Montevideo',
    founded: '',
    holdings: 'Small family winery on the outskirts of Montevideo in the Canelones heartland, farming Tannat, Albariño and Tempranillo on clay-loam soils close to the Rio de la Plata.',
    style: 'Small-scale and hand-worked: Tannat of blackberry and real grip, and a crisp, more neutral Albariño than the coastal examples.',
    t: 'Montevideo smallholding: Tannat of blackberry and grip, crisp Albariño',
    why: 'Canelones is where most Uruguayan wine is actually made, and Bouza is the small producer used to show that the country\'s quality is not confined to the new coastal estates.',
    wines: [
      { n: 'Tannat Parcela Única', grape: 'Tannat', note: 'A single-parcel Tannat, the fine-wine face of the national grape' },
      { n: 'Albariño', grape: 'Albariño', note: 'Canelones Albariño, leaner and more citric than Maldonado\'s' },
      { n: 'Tannat Tempranillo', grape: 'Tannat and Tempranillo', note: 'A characteristic Uruguayan blend that tempers Tannat\'s tannin' }
    ],
    traps: [
      'Canelones, not Maldonado, remains Uruguay\'s largest wine department',
      'Tannat is frequently blended in Uruguay, so a varietal wine is a choice, not the default'
    ]
  },
  {
    id: 'p-bodega-chacra', p: 'Bodega Chacra',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Río Negro', sub: 'Mainque, Patagonia',
    founded: '2004',
    holdings: 'Founded by Piero Incisa della Rocchetta in the Río Negro valley of northern Patagonia, built around abandoned own-rooted Pinot Noir planted in 1932 and 1955; farmed biodynamically.',
    style: 'Pale, high-toned Patagonian Pinot with rosehip and spice, low alcohol and cool desert acidity, deliberately unoaked in feel.',
    t: 'Incisa della Rocchetta\'s desert Pinot: rosehip, spice, crystalline',
    why: 'The proof that Argentina is not only Mendoza and Malbec: Patagonia\'s Río Negro and Neuquén are cold, windy and far south, and the wines are correspondingly light-framed.',
    wines: [
      { n: 'Treinta y Dos', grape: 'Pinot Noir', note: 'From vines planted in 1932, the name records the planting year' },
      { n: 'Cincuenta y Cinco', grape: 'Pinot Noir', note: 'From 1955 plantings, the companion bottling' },
      { n: 'Barda', grape: 'Pinot Noir', note: 'The entry wine and the usual study bottle' }
    ],
    traps: [
      'Chacra\'s wine names are planting years, not vintages or cuvee sizes',
      'Patagonia is cold and dry with strong wind, the opposite of the high-altitude Mendoza model',
      'The owner\'s family is behind Sassicaia in Bolgheri, which is why the name recurs in Italian questions'
    ]
  },
  {
    id: 'p-bodega-colome', p: 'Bodega Colomé',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Salta', sub: 'Calchaquí Valleys, Molinos',
    founded: '1831',
    holdings: 'Among Argentina\'s oldest working wineries, in the Calchaqui Valleys of Salta; holds pre-phylloxera vines dating to the 1850s and the Altura Maxima vineyard at roughly 3,100 metres, among the highest commercial vineyards in the world.',
    style: 'Extreme altitude: intense colour, thick skins and firm tannin in the Malbec, with Torrontés that smells sweetly floral and finishes dry.',
    t: 'Salta at the roof of the vineyard world: dense Malbec, floral dry Torrontés',
    why: 'Salta and the Calchaqui Valleys supply the altitude extreme and the Torrontés answer, both stock questions on Argentina beyond Mendoza.',
    wines: [
      { n: 'Altura Máxima', grape: 'Malbec', note: 'From roughly 3,100 metres, the extreme case for the altitude argument' },
      { n: 'Colomé Estate Malbec', grape: 'Malbec', note: 'The Calchaqui house style, dense and high-toned' },
      { n: 'Colomé Torrontés', grape: 'Torrontés Riojano', note: 'Salta\'s signature white, aromatic and dry' }
    ],
    traps: [
      'Torrontés is three distinct varieties: Torrontés Riojano, Torrontés Sanjuanino and Torrontés Mendocino, and Riojano makes the fine wine',
      'Torrontés smells sweet because of Muscat parentage but finishes dry, a standard blind-tasting feint',
      'Cafayate is the best-known Calchaqui town, but the highest vineyards lie further north up the valley, above Molinos towards Cachi',
      'La Rioja in Argentina is a province and has nothing to do with Spanish Rioja'
    ]
  },
  {
    id: 'p-bodega-garzon', p: 'Bodega Garzón',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Maldonado', sub: 'Garzón, Uruguay',
    founded: '',
    holdings: 'Large Uruguayan estate near Punta del Este in Maldonado, planted on decomposed granite hillsides within reach of the Atlantic, with Alberto Antonini consulting.',
    style: 'Atlantic-cooled Uruguay: Tannat with firm but ripe tannin rather than rustic grip, and saline, citric Albariño.',
    t: 'Atlantic Uruguay on granite ballast: firm Tannat, salt-edged Albariño',
    why: 'Uruguay\'s Tannat is a set question, and Maldonado is the coastal district that separates the modern Atlantic style from the older inland Canelones one.',
    wines: [
      { n: 'Single Vineyard Tannat', grape: 'Tannat', note: 'Uruguay\'s national variety, softened by maritime humidity' },
      { n: 'Albariño', grape: 'Albariño', note: 'Uruguay\'s most convincing white, and a surprising New World home for the variety' },
      { n: 'Petit Clos Tannat', grape: 'Tannat', note: 'The top selection, oak-framed and structured' }
    ],
    traps: [
      'Tannat originates in Madiran in South West France, not in Uruguay',
      'Uruguayan Tannat is softer than Madiran\'s because of humidity and different handling, not because of a different grape',
      'Maldonado is coastal and granitic, while Canelones near Montevideo is flatter and clay-based'
    ]
  },
  {
    id: 'p-boekenhoutskloof', p: 'Boekenhoutskloof',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Franschhoek', sub: '',
    founded: '1993',
    holdings: 'The farm dates to 1776 and the modern winery was re-established in 1993 with Marc Kent; the Syrah is drawn from cooler sites outside Franschhoek and the Cabernet largely from Stellenbosch. The label shows seven chairs.',
    style: 'Two clear poles: perfumed, peppery cool-grown Syrah and firm, cedary Stellenbosch Cabernet, both with polished tannin.',
    t: 'Seven chairs, two poles: perfumed cool Syrah and firm Stellenbosch Cabernet',
    why: 'A working illustration that in the Cape the winery\'s address and the fruit\'s origin are often different places, which is exactly what the Wine of Origin label is designed to disclose.',
    wines: [
      { n: 'Boekenhoutskloof Syrah', grape: 'Syrah', note: 'Cool-site Cape Syrah, one of the wines that redirected South African red style' },
      { n: 'Boekenhoutskloof Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'Firm, structured Cape Cabernet, largely Stellenbosch fruit' },
      { n: 'The Chocolate Block', grape: 'Syrah led Cape blend', note: 'The commercially dominant Cape red blend, worth knowing by name' }
    ],
    traps: [
      'Franschhoek is the winery\'s home, but the top wines are not necessarily Franschhoek fruit',
      'The Chocolate Block is a dry red blend, with no chocolate flavouring involved'
    ]
  },
  {
    id: 'p-casa-marin', p: 'Casa Marín',
    country: 'Australia, New Zealand, South Africa and South America', r: 'San Antonio Valley', sub: 'Lo Abarca',
    founded: '2000',
    holdings: 'Founded by Maria Luz Marin at Lo Abarca, roughly four kilometres from the Pacific, one of Chile\'s closest vineyards to the ocean; Lo Abarca was later recognised as its own denomination of origin.',
    style: 'Cold, saline and high acid: sharply herbal Sauvignon Blanc and a peppery, cool-grown Syrah with real structure.',
    t: 'Four kilometres from the Pacific: saline, herbal Sauvignon and peppery Syrah',
    why: 'Establishes Chile\'s coastal axis: the Humboldt Current and the morning fog make San Antonio, Leyda and Casablanca cool white and Pinot country within a country better known for warm reds.',
    wines: [
      { n: 'Cipreses Vineyard Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'The reference for Chilean coastal Sauvignon, saline and grassy' },
      { n: 'Lo Abarca Hills Syrah', grape: 'Syrah', note: 'Cool-climate Chilean Syrah, peppered and firm' },
      { n: 'Miramar Vineyard Riesling', grape: 'Riesling', note: 'A rare cool coastal Chilean Riesling' }
    ],
    traps: [
      'Chile\'s coastal valleys are cold, not warm: latitude alone will mislead you',
      'San Antonio and its Leyda subzone lie south of Casablanca and closer to the sea',
      'Chilean Syrah from the coast is peppery and restrained, unlike Colchagua Syrah'
    ]
  },
  {
    id: 'p-catena-zapata', p: 'Catena Zapata',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Mendoza', sub: 'Luján de Cuyo and Gualtallary, Uco Valley',
    founded: '1902',
    holdings: 'old Malbec at the Angelica vineyard in Lunlunta, Maipú',
    style: 'High-altitude Malbec of violet perfume, chalky tannin and preserved acidity, with Chardonnay from the same elevations kept saline and taut.',
    t: 'High-altitude Malbec & Chardonnay: floral, chalky, defining Argentina',
    why: 'The estate behind the massal selection of old Malbec that replanted Argentina, and the published research site for altitude: ultraviolet thickens skins while the diurnal swing preserves acid.',
    wines: [
      { n: 'Adrianna Vineyard White Bones and White Stones', grape: 'Chardonnay', note: 'Two adjacent parcels of one vineyard bottled separately, the clearest altitude and soil comparison in Argentina' },
      { n: 'Adrianna Vineyard Fortuna Terrae and Mundus Bacillus Terrae', grape: 'Malbec', note: 'Single-parcel Gualtallary Malbec, chalky and floral' },
      { n: 'Nicolás Catena Zapata', grape: 'Cabernet Sauvignon and Malbec', note: 'The house flagship blend, the wine that reset Argentine ambition' }
    ],
    traps: [
      'The Uco Valley sits higher and cooler than Luján de Cuyo, so its wines are more floral and taut, not bigger',
      'Gualtallary is a GI within Tupungato in the Uco Valley, not a separate region',
      'Argentina\'s Malbec is a Cahors variety originally, called Côt in France'
    ]
  },
  {
    id: 'p-chambers-rosewood', p: 'Chambers Rosewood',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Rutherglen', sub: 'North East Victoria',
    founded: '1858',
    holdings: 'Long-standing Rutherglen family estate holding very old fortified soleras of Muscat and Muscadelle.',
    style: 'Grapes left to raisin on the vine, fortified and aged in old wood in a hot shed, concentrating to near-syrup with searing intensity.',
    t: 'Rutherglen\'s darkest solera: raisin, coffee, tea leaf, unctuous immortality',
    why: 'Rutherglen\'s four-tier classification, Rutherglen then Classic then Grand then Rare, is a stock question, and Chambers is the house used to illustrate the top of it.',
    wines: [
      { n: 'Rare Rutherglen Muscat', grape: 'Muscat a Petits Grains Rouge, locally Brown Muscat', note: 'The top rung of the Rutherglen ladder, with average blend age in decades' },
      { n: 'Rare Rutherglen Muscadelle', grape: 'Muscadelle', note: 'The variety formerly called Tokay and now labelled Topaque, tea leaf and cold coffee' },
      { n: 'Grand Rutherglen Muscat', grape: 'Brown Muscat', note: 'The tier below Rare, the practical study bottle' }
    ],
    traps: [
      'Rutherglen Muscat is Muscat a Petits Grains Rouge, not Muscat of Alexandria',
      'Topaque is Muscadelle, renamed from Tokay under the EU agreement, and is not related to Hungarian Tokaj',
      'The classification measures blend character and age, not vintage'
    ]
  },
  {
    id: 'p-clonakilla', p: 'Clonakilla',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Canberra District', sub: 'Murrumbateman',
    founded: '1971',
    holdings: 'Planted by Dr John Kirk in 1971 at Murrumbateman, at altitude inland in New South Wales; run by Tim Kirk.',
    style: 'Cool-grown Shiraz co-fermented with Viognier on the Côte-Rôtie model: lifted, peppery and silken rather than broad.',
    t: 'Côte-Rôtie down under: lifted florals, white pepper, silk',
    why: 'The Australian reference for Shiraz Viognier co-fermentation and for cool inland New South Wales, a climate candidates rarely expect.',
    wines: [
      { n: 'Shiraz Viognier', grape: 'Shiraz co-fermented with Viognier', note: 'The wine that established co-fermentation as an Australian style' },
      { n: 'O\'Riada', grape: 'Shiraz', note: 'The second Canberra Shiraz, a more affordable read on the same idiom' },
      { n: 'Hilltops Shiraz', grape: 'Shiraz', note: 'From the neighbouring Hilltops region, warmer and fuller' }
    ],
    traps: [
      'The Canberra District is high and continental, not a warm coastal region',
      'Co-fermenting a white grape with a red is legal here and the wine still labels as Shiraz Viognier'
    ]
  },
  {
    id: 'p-cloudy-bay', p: 'Cloudy Bay',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Marlborough', sub: 'Wairau Valley',
    founded: '1985',
    holdings: 'EMPTY (delete the sentence; keep the Hohnen and Judd founding facts)',
    style: 'The template for Marlborough Sauvignon: machine-harvested, tank-fermented, screwcapped, with pungent passionfruit and boxwood thiols over cutting acid.',
    t: 'The bottle that launched NZ: passionfruit, gooseberry, limey snap',
    why: 'The single most examined New Zealand name, and the starting point for the thiol discussion: volatile thiols give passionfruit, methoxypyrazines give capsicum.',
    wines: [
      { n: 'Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'The bottling that created the international market for New Zealand wine' },
      { n: 'Te Koko', grape: 'Sauvignon Blanc', note: 'Wild-fermented and barrel-aged, the textural counter-argument to the house style' },
      { n: 'Pelorus', grape: 'Chardonnay and Pinot Noir', note: 'Traditional-method sparkling from Marlborough' }
    ],
    traps: [
      'Cloudy Bay is a producer in Marlborough, not a subregion or a bay-based appellation',
      'Te Koko is barrel-fermented, so blind it will not show the classic tank style',
      'A Margaret River producer founded it, which candidates rarely expect'
    ]
  },
  {
    id: 'p-concha-y-toro', p: 'Concha y Toro',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Maipo Valley', sub: 'Puente Alto',
    founded: '1883',
    holdings: 'Founded by Melchor Concha y Toro at Pirque; the Puente Alto vineyard in the Alto Maipo, on stony alluvial soils at the foot of the Andes, supplies Don Melchor. Also a partner in Almaviva.',
    style: 'Alto Maipo Cabernet of cassis, Andean herb and fine gravelly tannin, built on cool nights and stony drainage rather than warmth.',
    t: 'Chile\'s first icon Cabernet: cassis, Andean herbs, fine gravel tannin',
    why: 'The house that began Chile\'s fine wine era, and the address, Puente Alto, that examiners expect for Chile\'s best Cabernet.',
    wines: [
      { n: 'Don Melchor', grape: 'Cabernet Sauvignon', note: 'Chile\'s first icon Cabernet, from Puente Alto, first made in 1987' },
      { n: 'Carmín de Peumo', grape: 'Carmenere', note: 'The house\'s serious argument for Carmenere, from Peumo in Cachapoal' },
      { n: 'Amelia', grape: 'Chardonnay', note: 'Cool-climate Chardonnay, the house\'s premium white' },
      { n: 'Casillero del Diablo', grape: 'Various', note: 'The global commercial brand, worth knowing for scale questions' }
    ],
    traps: [
      'Puente Alto is in the Alto Maipo at the Andean edge, cooled by mountain air, not a hot valley floor site',
      'Chile is essentially phylloxera free, so many vines are own-rooted',
      'Chilean DO naming now allows Costa, Entre Cordilleras and Andes as transverse designations alongside the valley names'
    ]
  },
  {
    id: 'p-craggy-range', p: 'Craggy Range',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Hawke\'s Bay', sub: 'Gimblett Gravels',
    founded: '1998',
    holdings: 'Founded by Terry Peabody with Steve Smith MW; holds Gimblett Gravels vineyards in Hawke\'s Bay and Te Muna Road vineyards in Martinborough. Gimblett Gravels is bounded by the old course of the Ngaruroro River, exposed by an 1867 flood.',
    style: 'Single-vineyard reds with ripe but structured tannin, the Syrah peppered and the Bordeaux blends gravelly and firm.',
    t: 'Gimblett Gravels in two keys: Le Sol\'s peppered Syrah, Sophia\'s Merlot depth',
    why: 'Gimblett Gravels is examinable because it is a soil-defined appellation created by growers and bounded by a former riverbed, not by political borders.',
    wines: [
      { n: 'Le Sol', grape: 'Syrah', note: 'The Gimblett Gravels Syrah flagship' },
      { n: 'Sophia', grape: 'Merlot led Bordeaux blend', note: 'The Merlot-weighted Gimblett Gravels red' },
      { n: 'The Quarry', grape: 'Cabernet Sauvignon led blend', note: 'The Cabernet-weighted counterpart to Sophia' },
      { n: 'Te Muna Road Pinot Noir', grape: 'Pinot Noir', note: 'Martinborough Pinot from the estate\'s Wairarapa holdings' }
    ],
    traps: [
      'Gimblett Gravels is a trademarked, soil-defined zone within Hawke\'s Bay, not a statutory GI in the European sense',
      'Hawke\'s Bay reds are Bordeaux blends and Syrah: Pinot Noir belongs further south'
    ]
  },
  {
    id: 'p-cullen-wines', p: 'Cullen Wines',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Margaret River', sub: 'Wilyabrup',
    founded: '1971',
    holdings: 'Planted by Kevin and Diana Cullen in Wilyabrup, one of the founding Margaret River estates; farmed biodynamically under Vanya Cullen.',
    style: 'Cool maritime Cabernet Merlot of graphite and fine tannin, and barrel-fermented Chardonnay with pronounced acid drive.',
    t: 'Biodynamic Wilyabrup: Diana Madeline\'s graphite Cabernet, Kevin John\'s chalk',
    why: 'One of the founding Margaret River estates and the region\'s biodynamic reference, useful when an examiner asks why Margaret River reads closer to Bordeaux than to the Barossa.',
    wines: [
      { n: 'Diana Madeline', grape: 'Cabernet Sauvignon and Merlot', note: 'The estate\'s Bordeaux blend and a Margaret River benchmark' },
      { n: 'Kevin John', grape: 'Chardonnay', note: 'Wild-fermented Wilyabrup Chardonnay, taut and long' }
    ],
    traps: [
      'Wilyabrup is a Margaret River subregion, not a separate GI region',
      'Margaret River is maritime and cool-tempered: its Cabernet is leafy and firm, not warm and soft'
    ]
  },
  {
    id: 'p-darenberg', p: 'd\'Arenberg',
    country: 'Australia, New Zealand, South Africa and South America', r: 'McLaren Vale', sub: '',
    founded: '1912',
    holdings: 'Founded by Joseph Osborn in McLaren Vale and run by Chester Osborn; substantial estate holdings worked with basket presses and open fermenters.',
    style: 'Warm-climate McLaren Vale reds of dark chocolate, sage and firm grip, made by deliberately old methods.',
    t: 'McLaren Vale in basket press and open fermenter: dark chocolate, sage, grip',
    why: 'The house most often named for McLaren Vale, which sits between the Barossa\'s opulence and the maritime coolness of the Fleurieu coast.',
    wines: [
      { n: 'The Dead Arm', grape: 'Shiraz', note: 'Named for the eutypa dieback that halves a vine and concentrates the remaining fruit' },
      { n: 'The Coppermine Road', grape: 'Cabernet Sauvignon', note: 'The estate Cabernet, showing McLaren Vale\'s warmer frame' },
      { n: 'The Laughing Magpie', grape: 'Shiraz and Viognier', note: 'A McLaren Vale reading of the co-ferment idea' }
    ],
    traps: [
      'Dead Arm names a vine disease, not a vineyard',
      'McLaren Vale is a separate GI from the Barossa Valley, closer to the sea and to Adelaide'
    ]
  },
  {
    id: 'p-de-martino', p: 'De Martino',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Maipo Valley', sub: 'Isla de Maipo',
    founded: '1934',
    holdings: 'Founded by Pietro De Martino Pascual at Isla de Maipo; now works old dry-farmed parcels in Itata, Maule and Elqui as well as Maipo, including tinajas, traditional clay amphorae.',
    style: 'Lower alcohol, no new oak on the heritage wines, fermentation in clay: pale, dusty and savoury, the opposite of Chile\'s polished export style.',
    t: 'Amphora-aged Cinsault and País: dusty red fruit, Chile before the icons',
    why: 'The reference for Chile\'s heritage revival: old dry-farmed País and Cinsault in the Secano Interior of Itata and Maule, and clay-vessel ageing. De Martino is credited with the first Chilean wine labelled as Carmenère, in 1996.',
    wines: [
      { n: 'Viejas Tinajas Cinsault', grape: 'Cinsault', note: 'Itata old-vine Cinsault fermented and aged in clay tinajas' },
      { n: 'Gallardía del Itata', grape: 'País and Cinsault', note: 'The heritage varieties of the Secano Interior' },
      { n: 'Alto de Piedras Carmenere', grape: 'Carmenere', note: 'Single-vineyard Carmenere from Isla de Maipo' }
    ],
    traps: [
      'Carmenere was planted and sold as Merlot in Chile until Jean-Michel Boursiquot identified it in 1994',
      'País is the same variety as Mission in California and Criolla Chica in Argentina',
      'Tinajas are clay vessels, not oak, and they add no wood flavour'
    ]
  },
  {
    id: 'p-dry-river', p: 'Dry River',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Martinborough', sub: 'Wairarapa',
    founded: '1979',
    holdings: 'Very small Martinborough estate founded by Neil McCallum on the gravel terrace, including the Craighall vineyard; sold by allocation.',
    style: 'Low yields, late picking and long ageing potential across an unusually wide range, from dense Pinot to dry Pinot Gris and Riesling.',
    t: 'Martinborough in miniature: dense Pinot, dry Pinot Gris, decades of stamina',
    why: 'The estate cited when an examiner wants proof that New Zealand Pinot Gris and Riesling can be serious rather than commercial aromatics.',
    wines: [
      { n: 'Pinot Noir', grape: 'Pinot Noir', note: 'Dense, structured Martinborough Pinot built for the long term' },
      { n: 'Pinot Gris', grape: 'Pinot Gris', note: 'Serious, dry and ageworthy, the New Zealand case for the variety' },
      { n: 'Craighall Riesling', grape: 'Riesling', note: 'Single-vineyard Martinborough Riesling with real cellaring life' }
    ],
    traps: [
      'New Zealand Pinot Gris is often off-dry commercially: Dry River is the exception, not the rule',
      'Martinborough and Marlborough are different regions on different islands'
    ]
  },
  {
    id: 'p-zuccardi', p: 'Familia Zuccardi',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Mendoza', sub: 'Paraje Altamira, Uco Valley',
    founded: '1963',
    holdings: 'Started by Alberto Zuccardi in 1963, originally to demonstrate an irrigation system; now centred on Sebastian Zuccardi\'s Piedra Infinita winery in Paraje Altamira, with parcels in Gualtallary, Los Chacayes and San Pablo.',
    style: 'Concrete vessels and no new oak on the top wines, moderate alcohol and high acid: chalky, herbal, tensile Malbec that reads as site rather than ripeness.',
    t: 'Concrete, no new oak, Uco stone: taut Malbec of chalk, herb and tension',
    why: 'The clearest demonstration of Argentina\'s soil-mapped GI reform, and of the move away from new French oak that changed Malbec\'s international profile.',
    wines: [
      { n: 'Finca Piedra Infinita', grape: 'Malbec', note: 'The Paraje Altamira flagship, made in concrete' },
      { n: 'Aluvional', grape: 'Malbec', note: 'A series bottling the same variety from Gualtallary, Paraje Altamira, Los Chacayes and San Pablo side by side' },
      { n: 'Concreto', grape: 'Malbec', note: 'The concrete-fermented wine that put the vessel question on the label' }
    ],
    traps: [
      'Aluvional is a range of separate GI bottlings, not one blend',
      'Calcareous material in the Uco Valley sits within alluvial fans and is patchy, not a continuous limestone bed',
      'Modern Uco Malbec is lower in alcohol and tighter than the oaked Luján style of the 1990s'
    ]
  },
  {
    id: 'p-felton-road', p: 'Felton Road',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Central Otago', sub: 'Bannockburn',
    founded: '1991',
    holdings: 'Estate vineyards at Bannockburn including Elms, Cornish Point, Calvert and MacMuir, on schist-derived soils; certified biodynamic.',
    style: 'Transparent, site-divided Pinot Noir with wild ferments, whole bunch and restrained oak, showing thyme and dark cherry over a firm acid line.',
    t: 'Schist-grown, biodynamic: thyme, black cherry, vivid line',
    why: 'The reference producer for Central Otago, the semi-continental exception in an otherwise maritime country and among the southernmost serious wine regions on earth.',
    wines: [
      { n: 'Block 3 Pinot Noir', grape: 'Pinot Noir', note: 'A named parcel within the Elms vineyard, the classic Central Otago single block' },
      { n: 'Block 5 Pinot Noir', grape: 'Pinot Noir', note: 'The denser neighbouring parcel, studied against Block 3' },
      { n: 'Bannockburn Riesling', grape: 'Riesling', note: 'Dry to off-dry Central Otago Riesling, an underrated regional strength' }
    ],
    traps: [
      'Central Otago is semi-continental and inland, unlike the rest of New Zealand',
      'Block 3 and Block 5 are parcels within one vineyard, not separate estates',
      'Bannockburn, Gibbston, Bendigo and Wanaka are Central Otago subregions with distinct climates'
    ]
  },
  {
    id: 'p-giaconda', p: 'Giaconda',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Beechworth', sub: '',
    founded: '1982',
    holdings: 'Rick Kinzbrunner\'s small estate on decomposed granite at altitude in Beechworth, north-east Victoria; the Chardonnay is matured in a cellar cut into granite.',
    style: 'Reductive, worked Chardonnay of flint and struck match with low yields and long lees ageing; reds are peppery and cool-grown.',
    t: 'Granite-grown Chardonnay aged in a rock cave: flint, nut, mineral length',
    why: 'Names the second pole of fine Australian Chardonnay: reductive, worked and mineral, against Leeuwin\'s ripe stone-fruit Margaret River style.',
    wines: [
      { n: 'Estate Vineyard Chardonnay', grape: 'Chardonnay', note: 'The most consistently cited Australian Chardonnay alongside Leeuwin, in a very different, more reductive idiom' },
      { n: 'Warner Vineyard Shiraz', grape: 'Shiraz', note: 'Cool-grown Beechworth Shiraz, peppered and medium bodied' }
    ],
    traps: [
      'Beechworth is in north-east Victoria, not a Yarra subregion',
      'Australian fine Chardonnay is no longer defined by the buttery style: reduction is the modern marker'
    ]
  },
  {
    id: 'p-graham-beck', p: 'Graham Beck',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Robertson', sub: '',
    founded: '1983',
    holdings: 'Robertson estate on limestone-rich soils, now devoted entirely to traditional-method sparkling wine from Chardonnay and Pinot Noir.',
    style: 'Brisk, green-apple and almond Cap Classique with clean autolysis, made across a wide range from non-vintage to long-aged prestige cuvees.',
    t: 'Robertson limestone bubbles: green apple, almond, brisk Cap Classique',
    why: 'The reference house for Méthode Cap Classique, South Africa\'s traditional-method category, in which the second fermentation must take place in the bottle.',
    wines: [
      { n: 'Brut', grape: 'Chardonnay and Pinot Noir', note: 'The non-vintage benchmark for Cap Classique' },
      { n: 'Blanc de Blancs', grape: 'Chardonnay', note: 'Vintage Chardonnay Cap Classique from Robertson limestone' },
      { n: 'Cuvée Clive', grape: 'Chardonnay and Pinot Noir', note: 'The prestige cuvee, made only in selected years' }
    ],
    traps: [
      'Cap Classique is a method designation, not a region',
      'Robertson is inland and warm overall, but its limestone soils and cool river air make it the Cape\'s sparkling centre',
      'Cap Classique\'s lees minimum is shorter than Champagne\'s, so ageing claims must be checked'
    ]
  },
  {
    id: 'p-greywacke', p: 'Greywacke',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Marlborough', sub: '',
    founded: '2009',
    holdings: 'Kevin Judd\'s own label after many years as Cloudy Bay\'s founding winemaker; works with established Marlborough growers. Named for the greywacke bedrock underlying much of New Zealand.',
    style: 'Textural Marlborough: wild ferments and barrel work over the region\'s thiol-driven aromatics, giving weight without losing the herbal cut.',
    t: 'Cloudy Bay\'s first winemaker on his own: wild-fermented, textural Sauvignon',
    why: 'Used to show that Marlborough Sauvignon has a second, worked style, which matters in blind tasting when the expected pungency is muted by barrel and lees.',
    wines: [
      { n: 'Wild Sauvignon', grape: 'Sauvignon Blanc', note: 'Barrel-fermented with indigenous yeasts, the textural style of Marlborough Sauvignon' },
      { n: 'Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'The classic tank-fermented Marlborough expression for comparison' },
      { n: 'Pinot Noir', grape: 'Pinot Noir', note: 'Marlborough Pinot, lighter and redder-fruited than Central Otago' }
    ],
    traps: [
      'Marlborough Sauvignon is not a single style: wild ferment and oak change the profile substantially',
      'Marlborough also makes serious Pinot Noir, distinct from Central Otago\'s denser style'
    ]
  },
  {
    id: 'p-grosset', p: 'Grosset',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Clare Valley', sub: 'Auburn',
    founded: '1981',
    holdings: 'Jeffrey Grosset\'s small estate working two contrasting Clare sites: Polish Hill on shallow slate and shale, and Springvale in Watervale on limestone.',
    style: 'Austere, bone-dry Riesling of high acid and low alcohol, built to age for a decade or more; reds are restrained rather than rich.',
    t: 'Clare Riesling at two addresses: Polish Hill slate steel, Springvale lime',
    why: 'The touchstone for Australian dry Riesling and for the two-site Clare comparison. Grosset led the Clare producers\' move to screwcap for the 2000 vintage, the closure story the Court asks about.',
    wines: [
      { n: 'Polish Hill', grape: 'Riesling', note: 'Slate-grown, tight and mineral, the more austere and longer-lived of the pair' },
      { n: 'Springvale', grape: 'Riesling', note: 'Watervale limestone, more floral and lime-fruited, approachable earlier' },
      { n: 'Gaia', grape: 'Cabernet Sauvignon and Cabernet Franc', note: 'High-altitude Clare Bordeaux blend from the estate\'s Gaia vineyard' }
    ],
    traps: [
      'Polish Hill and Watervale are Clare subregions, not brand names',
      'Clare and Eden Riesling are fully dry: expecting residual sugar is the standard error'
    ]
  },
  {
    id: 'p-hamilton-russell', p: 'Hamilton Russell Vineyards',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Walker Bay', sub: 'Hemel-en-Aarde Valley',
    founded: '1975',
    holdings: 'Founded by Tim Hamilton Russell and run by Anthony Hamilton Russell; clay-rich soils derived from Bokkeveld shale in the Hemel-en-Aarde, close to the cold Atlantic at Hermanus. Makes only Pinot Noir and Chardonnay.',
    style: 'Burgundian in ambition and restraint: dark-fruited, savoury Pinot with firm structure and a saline, tightly wound Chardonnay.',
    t: 'Clay-grown, Burgundian: dark cherry, forest, saline Chardonnay',
    why: 'Establishes the cool maritime Cape, the answer whenever a question asks where South Africa grows serious Pinot Noir and Chardonnay.',
    wines: [
      { n: 'Pinot Noir', grape: 'Pinot Noir', note: 'South Africa\'s benchmark Pinot, grown on clay close to the sea' },
      { n: 'Chardonnay', grape: 'Chardonnay', note: 'Restrained, mineral Cape Chardonnay, the counterpart to the Pinot' }
    ],
    traps: [
      'Hemel-en-Aarde means Heaven and Earth: it is a valley in Walker Bay, not a brand',
      'Walker Bay is a maritime district cooled by the Atlantic, far cooler than Stellenbosch',
      'The estate makes only two varieties, unusual in the Cape'
    ]
  },
  {
    id: 'p-henschke', p: 'Henschke',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Eden Valley', sub: 'Keyneton, Barossa ranges',
    founded: '1868',
    holdings: 'Family estate at Keyneton, held by the Henschke family since 1868',
    style: 'Single-vineyard Eden Valley Shiraz of perfume and fine-grained tannin, cooler and more savoury than Barossa floor fruit.',
    t: 'Single-vineyard 1860s Shiraz: sage, dark plum, silken gravity',
    why: 'The Court pairs Hill of Grace against Grange to test single vineyard versus multi-region blend. Eden Valley\'s elevation also anchors the Australian dry Riesling answer.',
    wines: [
      { n: 'Hill of Grace', grape: 'Shiraz', note: 'One named vineyard of own-rooted vines planted in the 1860s, the single-site foil to Grange' },
      { n: 'Mount Edelstone', grape: 'Shiraz', note: 'Single Eden Valley vineyard planted 1912, the more overlooked half of the pair' },
      { n: 'Cyril Henschke', grape: 'Cabernet Sauvignon', note: 'The estate Cabernet, showing Eden Valley\'s cool elevation' },
      { n: 'Julius', grape: 'Riesling', note: 'Dry Eden Valley Riesling under screwcap, lime and slate' }
    ],
    traps: [
      'Eden Valley is the cooler hill country above the Barossa floor, not a synonym for Barossa Valley',
      'Hill of Grace is the vineyard name, not a Grand Cru or any legal designation',
      'Mount Edelstone is also a single vineyard, so single-site is not unique to Hill of Grace'
    ]
  },
  {
    id: 'p-house-of-arras', p: 'House of Arras',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Tasmania', sub: '',
    founded: '',
    holdings: 'Tasmanian traditional-method sparkling house built on cool-climate Chardonnay and Pinot Noir from across the island, long associated with winemaker Ed Carr.',
    style: 'Very long lees ageing before disgorgement, giving brioche and toast over Tasmania\'s high natural acidity.',
    t: 'Tasmanian sparkling on long lees: brioche, white peach, oyster-shell cut',
    why: 'Tasmania is the cool island that supplies Australia\'s serious sparkling base, and Arras is the house that shows what extended lees ageing does to it.',
    wines: [
      { n: 'Grand Vintage', grape: 'Chardonnay and Pinot Noir', note: 'The core vintage cuvee, released after extended time on lees' },
      { n: 'EJ Carr Late Disgorged', grape: 'Chardonnay and Pinot Noir', note: 'Held on lees for a decade or more before disgorgement' },
      { n: 'Blanc de Blancs', grape: 'Chardonnay', note: 'The Tasmanian Chardonnay expression of the house' }
    ],
    traps: [
      'Tasmania is a single GI covering the whole island, with informal subregions rather than legal ones',
      'Australian traditional-method sparkling has no minimum lees ageing comparable to Champagne\'s'
    ]
  },
  {
    id: 'p-jim-barry', p: 'Jim Barry Wines',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Clare Valley', sub: 'Clare',
    founded: '1959',
    holdings: 'Family estate in the Clare Valley; owns the Armagh vineyard and the historic Florita vineyard at Watervale, a Riesling site formerly in Leo Buring\'s hands.',
    style: 'Two separate identities: dense, high-extract Clare Shiraz and precise, lime-driven dry Watervale Riesling.',
    t: 'The Armagh\'s dense Clare Shiraz beside Florita\'s Watervale lime',
    why: 'Demonstrates that the Clare Valley makes both benchmark dry Riesling and very concentrated Shiraz, a pairing candidates often split between two regions by mistake.',
    wines: [
      { n: 'The Armagh', grape: 'Shiraz', note: 'Concentrated single-vineyard Clare Shiraz, one of the first Australian reds priced with Grange' },
      { n: 'The Florita', grape: 'Riesling', note: 'From a historic Watervale vineyard, the Clare Riesling most often cited for provenance' },
      { n: 'The McRae Wood', grape: 'Shiraz', note: 'The step below the Armagh, showing Clare Shiraz weight at fairer scale' }
    ],
    traps: [
      'Clare is not only a white region: the Armagh is among Australia\'s densest Shiraz',
      'Watervale is a Clare subregion, not a separate GI region'
    ]
  },
  {
    id: 'p-kanonkop', p: 'Kanonkop',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Stellenbosch', sub: 'Simonsberg-Stellenbosch',
    founded: '',
    holdings: 'Sauer and Krige family estate on the lower Simonsberg slopes; includes Pinotage bush vines planted in 1953. Fermentation in open concrete kuipe with manual punch-down.',
    style: 'Structured, savoury Cape reds: Pinotage with mulberry and smoke rather than confection, and a firmly cedared Bordeaux blend.',
    t: 'Pinotage\'s standard-bearer: mulberry, smoke, structured Bordeaux blend',
    why: 'The producer used to settle Pinotage questions: a 1925 crossing of Pinot Noir and Cinsaut made by Abraham Perold in Stellenbosch, and the base of the Cape Blend.',
    wines: [
      { n: 'Paul Sauer', grape: 'Cabernet Sauvignon, Cabernet Franc, Merlot', note: 'The estate\'s Bordeaux blend and South Africa\'s most examined red' },
      { n: 'Black Label Pinotage', grape: 'Pinotage', note: 'From 1953-planted bush vines, the case that Pinotage can age' },
      { n: 'Kanonkop Pinotage', grape: 'Pinotage', note: 'The standard bearer for the variety worldwide' },
      { n: 'Kadette', grape: 'Cape Blend', note: 'A Pinotage-inclusive blend, the definition of the Cape Blend category' }
    ],
    traps: [
      'Pinotage\'s parents are Pinot Noir and Cinsaut: Hermitage was the local alias for Cinsaut, which gave the name its second half',
      'Hermitage means Syrah in Australia and Cinsaut in the old Cape: two different grapes, one word',
      'A Cape Blend is defined by including Pinotage, not by being any South African blend',
      'Isoamyl acetate banana or acetone notes come from rushed winemaking, not from the variety itself'
    ]
  },
  {
    id: 'p-klein-constantia', p: 'Klein Constantia',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Constantia', sub: 'Cape Town',
    founded: '',
    holdings: 'A portion of Simon van der Stel\'s 1685 Constantia estate, later subdivided; Muscat de Frontignan was replanted in the 1980s specifically to revive the historic sweet wine, with the first modern release from the 1986 vintage.',
    style: 'Sun-raisined Muscat picked in successive passes, unfortified, with candied citrus and tea over bright acid; the dry whites are cool and saline.',
    t: 'Napoleon\'s Muscat reborn (1986): candied citrus, tea, fresh sweetness',
    why: 'Constantia was the first non-European wine to hold European fame, and the examinable fact is that Vin de Constance is not fortified, unlike the Madeiras and Ports it sat beside on eighteenth-century tables.',
    wines: [
      { n: 'Vin de Constance', grape: 'Muscat de Frontignan, that is Muscat Blanc a Petits Grains', note: 'The revived eighteenth-century Constantia sweet wine, unfortified' },
      { n: 'Estate Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'Constantia\'s cool maritime Sauvignon, more herbal than tropical' },
      { n: 'Perdeblokke', grape: 'Sauvignon Blanc', note: 'A high, cool single block giving the most nervy expression' }
    ],
    traps: [
      'Vin de Constance is unfortified: the sweetness comes from raisining on the vine',
      'The grape is Muscat Blanc a Petits Grains under its Frontignan name, not Muscat of Alexandria',
      'Constantia is a ward within the Cape Town district, inside the city itself, not out near Stellenbosch'
    ]
  },
  {
    id: 'p-kumeu-river', p: 'Kumeu River',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Auckland', sub: 'Kumeu',
    founded: '1944',
    holdings: 'Brajkovich family property in Kumeu, west of Auckland, on clay soils; vineyards include Mate\'s Vineyard, Hunting Hill and Coddington. Michael Brajkovich was New Zealand\'s first Master of Wine.',
    style: 'Burgundian in method: whole-bunch pressed, wild fermented in barrel, full malolactic, giving struck-match reduction and nectarine over firm acid.',
    t: 'Auckland clay Chardonnay: struck match, nectarine, Burgundian sinew',
    why: 'The answer to the question of where New Zealand\'s best Chardonnay comes from, and a useful correction to the assumption that all quality New Zealand wine is southern.',
    wines: [
      { n: 'Mate\'s Vineyard Chardonnay', grape: 'Chardonnay', note: 'The flagship single vineyard, named for Mate Brajkovich' },
      { n: 'Hunting Hill Chardonnay', grape: 'Chardonnay', note: 'The tighter, more mineral of the named sites' },
      { n: 'Estate Chardonnay', grape: 'Chardonnay', note: 'The village-level wine and the usual study bottle' }
    ],
    traps: [
      'Kumeu is in Auckland on the North Island, not in Marlborough',
      'Auckland is humid and warm, so vintage variation and disease pressure are real factors',
      'Kumeu River is Chardonnay-led, not a Sauvignon house'
    ]
  },
  {
    id: 'p-lapostolle', p: 'Lapostolle',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Colchagua Valley', sub: 'Apalta',
    founded: '1994',
    holdings: 'Founded by Alexandra Marnier Lapostolle of the Grand Marnier family with Cyril de Bournet; holds old vineyards on the Apalta hillside, farmed biodynamically, with Michel Rolland consulting from the outset.',
    style: 'Dense, polished and French-oaked Apalta reds built around Carmenere with Cabernet Sauvignon and Merlot.',
    t: 'Clos Apalta: Carmenere-led, hillside-grown, polished by French hands',
    why: 'The clearest example of French capital and consultancy remaking a Chilean site, and the wine most often paired with Almaviva when Chile\'s icons are listed.',
    wines: [
      { n: 'Clos Apalta', grape: 'Carmenere led with Cabernet Sauvignon and Merlot', note: 'Chile\'s most cited Carmenere-led icon, from old Apalta vines' },
      { n: 'Cuvée Alexandre', grape: 'Cabernet Sauvignon, Carmenere or Chardonnay by bottling', note: 'The tier below, showing the same idiom at working scale' }
    ],
    traps: [
      'Clos Apalta is Carmenere-led, while Almaviva and Don Melchor are Cabernet-led',
      'Clos here is a proprietary name, with no French appellation meaning attached'
    ]
  },
  {
    id: 'p-leeuwin-estate', p: 'Leeuwin Estate',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Margaret River', sub: '',
    founded: '1974',
    holdings: 'Estate developed by Denis and Tricia Horgan after Robert Mondavi identified the site in the early 1970s; the Art Series labels carry commissioned Australian paintings.',
    style: 'Ripe but tightly acid-framed Chardonnay with long barrel maturation, built for a decade or more in bottle.',
    t: 'Australia\'s white flagship: grapefruit, white peach, oatmeal length',
    why: 'The default answer for Australia\'s benchmark Chardonnay, and the Margaret River pole of ripeness against Giaconda\'s reductive Beechworth style.',
    wines: [
      { n: 'Art Series Chardonnay', grape: 'Chardonnay', note: 'The most cited Australian Chardonnay, released later than most and long-lived' },
      { n: 'Art Series Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The estate\'s Bordeaux-framed red, often overshadowed by the white' },
      { n: 'Art Series Riesling', grape: 'Riesling', note: 'Dry Margaret River Riesling, a lighter regional counterpoint' }
    ],
    traps: [
      'Art Series is a tier name, not a single vineyard',
      'The Art Series Chardonnay is released several years after vintage, so a current release is not a young wine'
    ]
  },
  {
    id: 'p-meerlust', p: 'Meerlust',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Stellenbosch', sub: '',
    founded: '',
    holdings: 'Rubicon, first made in 1980, was among the first Cape Bordeaux-style blends',
    style: 'Cool-grown restraint: cedar, tobacco and graphite with moderate alcohol, released with bottle age rather than young.',
    t: 'Rubicon\'s cool-grown Bordeaux blend: cedar, tobacco, restraint over ripeness',
    why: 'Rubicon is the date-stamped beginning of the Cape Bordeaux blend, and the Myburgh tenure since 1756 is the longest continuous family ownership commonly cited in South Africa.',
    wines: [
      { n: 'Rubicon', grape: 'Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot', note: 'South Africa\'s first Bordeaux-style blend, from 1980' },
      { n: 'Chardonnay', grape: 'Chardonnay', note: 'An early Cape Chardonnay, taut and restrained' },
      { n: 'Pinot Noir', grape: 'Pinot Noir', note: 'A rare Stellenbosch Pinot, from the estate\'s cooler seaward blocks' }
    ],
    traps: [
      'Meerlust sits in the cool maritime south of Stellenbosch, not on the warm Simonsberg',
      'Rubicon predates the modern Cape revival by well over a decade'
    ]
  },
  {
    id: 'p-moss-wood', p: 'Moss Wood',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Margaret River', sub: 'Wilyabrup',
    founded: '1969',
    holdings: 'Planted in 1969 by Bill Pannell, among the first vineyards in Margaret River; run since the 1980s by Keith and Clare Mugford, with the neighbouring Ribbon Vale vineyard added later.',
    style: 'Plush but firmly framed Cabernet of dark plum and bay leaf, less leafy than many Margaret River neighbours.',
    t: 'Wilyabrup Cabernet of dark plum and bay leaf, plush yet firmly framed',
    why: 'One of the first Margaret River plantings and a standing example that the region\'s Cabernet can be generous without losing structure.',
    wines: [
      { n: 'Moss Wood Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The Wilyabrup single-vineyard Cabernet that helped establish the region\'s reputation' },
      { n: 'Ribbon Vale Cabernet Sauvignon Merlot Cabernet Franc', grape: 'Bordeaux blend', note: 'A separate Wilyabrup vineyard kept under its own label' },
      { n: 'Moss Wood Sémillon', grape: 'Sémillon', note: 'Margaret River Sémillon, a style quite distinct from the Hunter\'s' }
    ],
    traps: [
      'Margaret River Sémillon is riper and often oaked, nothing like low-alcohol Hunter Sémillon',
      'Margaret River\'s first vines date from the late 1960s, not the nineteenth century'
    ]
  },
  {
    id: 'p-mount-mary', p: 'Mount Mary',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Yarra Valley', sub: 'Lilydale',
    founded: '1971',
    holdings: 'Small estate planted by Dr John Middleton in 1971 on the Yarra\'s Lilydale side, still family run and sold largely by allocation.',
    style: 'Restraint as house doctrine: moderate alcohol, gentle extraction, cedar and structure ahead of fruit weight.',
    t: 'Yarra restraint: Quintet\'s cedar and red fruit, Triolet\'s waxy white blend',
    why: 'The Yarra\'s benchmark for cool-climate Australian Bordeaux blends, and a clean mnemonic: Quintet is five red varieties, Triolet is three white.',
    wines: [
      { n: 'Quintet', grape: 'Cabernet Sauvignon, Cabernet Franc, Merlot, Malbec, Petit Verdot', note: 'The five Bordeaux varieties in one wine, hence the name' },
      { n: 'Triolet', grape: 'Sauvignon Blanc, Sémillon, Muscadelle', note: 'The white Bordeaux trio, an unusual blend in Australia' },
      { n: 'Pinot Noir', grape: 'Pinot Noir', note: 'Pale, savoury Yarra Pinot from the original plantings' }
    ],
    traps: [
      'Quintet is a Bordeaux blend from Victoria, not a Coonawarra or Margaret River wine',
      'Triolet is dry white Bordeaux in composition, not a sweet wine'
    ]
  },
  {
    id: 'p-mount-pleasant', p: 'Mount Pleasant',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Hunter Valley', sub: 'Pokolbin',
    founded: '1921',
    holdings: 'Established by Maurice O\'Shea, later part of McWilliam\'s; holds historic Pokolbin blocks including Old Paddock and Old Hill, and the Lovedale vineyard planted in the 1940s.',
    style: 'Medium-bodied, earthy Hunter Shiraz of restraint, and Sémillon released with long bottle age.',
    t: 'O\'Shea\'s Hunter legacy: earthy medium-bodied Shiraz, Lovedale\'s toasted Sémillon',
    why: 'Maurice O\'Shea is the name examiners expect for the Hunter Valley\'s rise, and Lovedale is the single-vineyard counterweight to Tyrrell\'s Vat 1.',
    wines: [
      { n: 'Maurice O\'Shea', grape: 'Shiraz', note: 'The memorial flagship, named for the winemaker who defined Hunter red style' },
      { n: 'Lovedale', grape: 'Sémillon', note: 'Single-vineyard Hunter Sémillon released with many years of bottle age' },
      { n: 'Old Paddock and Old Hill', grape: 'Shiraz', note: 'From nineteenth-century vine material, the Hunter\'s oldest holdings' }
    ],
    traps: [
      'Hunter Shiraz is medium-bodied and savoury, closer to a cool-climate profile than to the Barossa',
      'O\'Shea made wine at Mount Pleasant from 1921 until his death in 1956, decades before the modern Australian boom'
    ]
  },
  {
    id: 'p-mullineux', p: 'Mullineux',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Swartland', sub: 'Riebeek Kasteel',
    founded: '2007',
    holdings: 'Chris and Andrea Mullineux in the Swartland, working parcels separated by soil type, principally schist and granite, with iron-rich sites added later; since 2013 partnered with Analjit Singh as Mullineux and Leeu Family Wines.',
    style: 'Whole-bunch Syrah with restrained extraction and old wood, bottled by soil so the differences can be read side by side.',
    t: 'Swartland Syrah read soil by soil: schist iron, granite perfume, fynbos spice',
    why: 'The cleanest working demonstration of soil as a variable in the New World, and the Cape\'s leading argument that Syrah, not Pinotage, is the Swartland\'s red.',
    wines: [
      { n: 'Schist Syrah', grape: 'Syrah', note: 'The darker, more structured soil expression' },
      { n: 'Granite Syrah', grape: 'Syrah', note: 'The perfumed, higher-toned counterpart, the direct comparison wine' },
      { n: 'Quartz Chenin Blanc', grape: 'Chenin Blanc', note: 'Single-soil old-vine Chenin, taut and stony' },
      { n: 'Straw Wine', grape: 'Chenin Blanc', note: 'Dried-grape sweet Chenin, a Cape speciality' }
    ],
    traps: [
      'Swartland Syrah is perfumed and medium-bodied, not a warm-climate blockbuster',
      'Straw wine here is dried-grape Chenin and is unfortified'
    ]
  },
  {
    id: 'p-penfolds', p: 'Penfolds',
    country: 'Australia, New Zealand, South Africa and South America', r: 'South Australia', sub: 'Magill Estate, Adelaide',
    founded: '1844',
    holdings: 'Founded by Dr Christopher Rawson Penfold and Mary Penfold at Magill; sources fruit across South Australian regions, above all Barossa, Coonawarra and McLaren Vale.',
    style: 'Multi-region, multi-vineyard blending matured in American oak, built for structure and long cellaring rather than site transparency.',
    t: 'Multi-region Shiraz in American oak: black fruit, mocha, iron will',
    why: 'Grange is the standard Australian question and Penfolds supplies the standard contrast with Henschke. The bin system, the American oak signature and the multi-region blending philosophy are all examinable.',
    wines: [
      { n: 'Grange', grape: 'Shiraz, occasionally with a little Cabernet Sauvignon', note: 'Max Schubert\'s multi-region blend in new American oak hogsheads, the reference point for Australian red wine' },
      { n: 'Bin 707', grape: 'Cabernet Sauvignon', note: 'The Cabernet counterpart to Grange, also raised in new American oak' },
      { n: 'St Henri', grape: 'Shiraz with a small Cabernet component', note: 'Aged in large old vats with no new oak, the deliberate stylistic opposite of Grange' },
      { n: 'Bin 389', grape: 'Cabernet Shiraz', note: 'Matured in the barrels that held the previous vintage of Grange, hence its nickname' },
      { n: 'Yattarna', grape: 'Chardonnay', note: 'The white flagship, built as a multi-region Chardonnay answer to Grange' }
    ],
    traps: [
      'Grange is a multi-region blend, not a single vineyard: Hill of Grace is the single vineyard',
      'Bin numbers are house codes, not a legal classification',
      'Grange carried the name Grange Hermitage into the late 1980s, Hermitage being an old Australian synonym for Shiraz',
      'St Henri sees no new oak, so it is not simply a lesser Grange'
    ]
  },
  {
    id: 'p-rockford', p: 'Rockford',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Barossa Valley', sub: 'Krondorf',
    founded: '1984',
    holdings: 'Robert O\'Callaghan\'s small winery working from old dry-grown Barossa grower vineyards, using restored nineteenth-century equipment including basket presses and open fermenters.',
    style: 'Deliberately old-fashioned Barossa: basket-pressed, large old oak, medium weight and earth rather than extraction.',
    t: 'Basket-pressed Barossa on antique gear: dark plum, earth, old-fashioned depth',
    why: 'Cited when an examiner wants the counter-argument to high-extraction Barossa, and the house most often named for sparkling Shiraz, a style with no European parallel.',
    wines: [
      { n: 'Basket Press Shiraz', grape: 'Shiraz', note: 'The traditionalist benchmark for Barossa Shiraz, allocation only' },
      { n: 'Black Shiraz', grape: 'Shiraz', note: 'Sparkling red made by the traditional method, the reference for a distinctly Australian style' },
      { n: 'Rod and Spur', grape: 'Cabernet Sauvignon and Shiraz', note: 'The classic Australian Cabernet Shiraz marriage' }
    ],
    traps: [
      'Sparkling Shiraz is red, dry to off-dry and traditional method here, not a sweet novelty',
      'Rockford is not an estate: its identity comes from long grower relationships'
    ]
  },
  {
    id: 'p-sadie-family', p: 'Sadie Family Wines',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Swartland', sub: 'Malmesbury',
    founded: '1999',
    holdings: 'Eben Sadie\'s estate in the Swartland, with the Old Vine Series drawn from certified old parcels across the Western Cape including Chenin on the Olifants River and field blends in the Piekenierskloof and Stellenbosch.',
    style: 'Dry-farmed old bush vines, whole-bunch and old wood, low extraction: dusty, herbal, saline wines with no oak gloss.',
    t: 'Old-vine Rhône-style blends: fynbos, stone, the new South Africa',
    why: 'Eben Sadie is the figure behind the Swartland revolution and an early supporter of the Old Vine Project, whose certified heritage seal requires documented vines of thirty-five years or more with the planting date on the bottle.',
    wines: [
      { n: 'Columella', grape: 'Syrah led with Mourvèdre and other Rhône varieties', note: 'The wine that launched the Swartland movement' },
      { n: 'Palladius', grape: 'White field blend of many varieties', note: 'The white counterpart, a many-variety Swartland blend' },
      { n: 'Skurfberg', grape: 'Chenin Blanc', note: 'Old-vine Chenin from the Olifants River, the Cape\'s old-vine argument in one bottle' },
      { n: 'Pofadder', grape: 'Cinsaut', note: 'Old-vine Cinsaut, central to the Cape\'s rediscovery of the variety' },
      { n: 'Soldaat', grape: 'Grenache', note: 'High-altitude Piekenierskloof Grenache, pale and perfumed' }
    ],
    traps: [
      'The Swartland is dry-farmed bush vine country on schist and granite, not an irrigated bulk district',
      'South Africa grows more Chenin Blanc than France, a standing surprise fact',
      'Old Vine Project certification is a documented registry, not a marketing term'
    ]
  },
  {
    id: 'p-seppeltsfield', p: 'Seppeltsfield',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Barossa Valley', sub: '',
    founded: '1851',
    holdings: 'Founded by Joseph Seppelt; the Centennial Cellar holds a barrel of fortified wine from every vintage since 1878, of which the hundred-year-old cask is drawn each year.',
    style: 'Extreme barrel-aged fortified wine: treacle, walnut, burnt toffee and volatile lift, sweetness cut by concentration.',
    t: 'A century in barrel every year: Para Tawny of treacle, walnut, burnt toffee',
    why: 'Australia\'s fortified tradition is examinable and this is its most concrete artefact: a continuous vintage sequence that is released only at one hundred years old.',
    wines: [
      { n: '100 Year Old Para Vintage Tawny', grape: 'Shiraz and other fortified varieties', note: 'Released each year at exactly a century in barrel, an unbroken sequence from 1878' },
      { n: 'Para Grand and Para Rare Tawny', grape: 'Fortified red varieties', note: 'The younger steps on the same ladder' }
    ],
    traps: [
      'Australian tawny may not be labelled Port for the European market: Apera replaced Sherry and Topaque replaced Tokay under EU agreements',
      'This is a barrel-aged fortified wine, not a table wine from old vines'
    ]
  },
  {
    id: 'p-tahbilk', p: 'Tahbilk',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Nagambie Lakes', sub: 'Goulburn Valley, Victoria',
    founded: '1860',
    holdings: 'Family estate of the Purbricks on the Goulburn River; holds own-rooted Shiraz planted in 1860 and one of the world\'s largest plantings of Marsanne, including a block dating to 1927.',
    style: 'Old-fashioned Victorian reds with earthy grip and low new oak, and a neutral young Marsanne that turns honeyed with a decade in bottle.',
    t: 'Own-rooted 1860 Shiraz and old Marsanne: earth, honeysuckle, Victorian antiquity',
    why: 'The clearest single answer for Australia\'s surviving nineteenth-century vines, and the world\'s most significant holding of Marsanne outside the Rhône.',
    wines: [
      { n: '1860 Vines Shiraz', grape: 'Shiraz', note: 'From own-rooted vines planted in 1860, among the oldest producing vines anywhere' },
      { n: 'Marsanne', grape: 'Marsanne', note: 'Unoaked and neutral when young, honeysuckle and toast after ten years' },
      { n: 'Eric Stevens Purbrick Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The reserve Cabernet, released with age' }
    ],
    traps: [
      'Marsanne here is usually unoaked, unlike white Hermitage',
      'Nagambie Lakes is in Victoria, and its water bodies moderate a district that would otherwise be much warmer'
    ]
  },
  {
    id: 'p-te-mata-estate', p: 'Te Mata Estate',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Hawke\'s Bay', sub: 'Havelock North',
    founded: '1896',
    holdings: 'EMPTY (drop the Gimblett Gravels attribution and leave the holdings as hillside and gravel sites across Hawke\'s Bay)',
    style: 'Restrained, cedar-framed Bordeaux blends of moderate alcohol built to age, rather than ripe New World reds.',
    t: 'Hawke\'s Bay since 1896: Coleraine\'s cedar, cassis and quiet gravity',
    why: 'Anchors the two Hawke\'s Bay answers: Bordeaux blends and cool-climate Syrah, from the North Island\'s warmest serious region.',
    wines: [
      { n: 'Coleraine', grape: 'Cabernet Sauvignon, Merlot, Cabernet Franc', note: 'New Zealand\'s most collected red, made only in the better years' },
      { n: 'Awatea', grape: 'Cabernet Sauvignon and Merlot', note: 'The second Bordeaux blend, often Merlot-weighted and earlier drinking' },
      { n: 'Bullnose Syrah', grape: 'Syrah', note: 'Cool-climate Hawke\'s Bay Syrah, peppery and closer to the northern Rhône' }
    ],
    traps: [
      'Awatea is a Te Mata wine, while Awatere is a Marlborough valley: the names are easy to cross',
      'New Zealand Syrah is peppery and cool-grown, closer to Crozes-Hermitage than to the Barossa'
    ]
  },
  {
    id: 'p-terrazas-de-los-andes', p: 'Terrazas de los Andes',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Mendoza', sub: 'Luján de Cuyo and Uco Valley',
    founded: '1996',
    holdings: 'Founded by Moët Hennessy in Mendoza on the principle of matching each variety to its own altitude band, from Chardonnay at the highest terraces down to Cabernet Sauvignon lower on the slope. Partner with Château Cheval Blanc in Cheval des Andes.',
    style: 'Altitude-matched varietal wines of clean fruit and moderate oak, with the joint-venture wine giving Malbec a Bordeaux frame.',
    t: 'Altitude matched to variety: Mendoza Malbec of violet, graphite and lift',
    why: 'The house that turned the altitude argument into a planting policy, and the Argentine half of Cheval des Andes, which examiners pair with Almaviva and Opus One as French joint ventures abroad.',
    wines: [
      { n: 'Cheval des Andes', grape: 'Malbec with Cabernet Sauvignon', note: 'The joint venture with Château Cheval Blanc, Argentina\'s most cited French collaboration' },
      { n: 'Grand Malbec', grape: 'Malbec', note: 'The estate\'s high-altitude Malbec flagship' },
      { n: 'Parcel Los Aromos Malbec', grape: 'Malbec', note: 'A single-parcel Luján de Cuyo wine' }
    ],
    traps: [
      'Cheval des Andes is Malbec-led with Cabernet Sauvignon, not a Saint-Émilion-style Cabernet Franc and Merlot blend',
      'Terrazas and Cheval des Andes are both Moët Hennessy connected, but Cheval Blanc is the partner on the wine'
    ]
  },
  {
    id: 'p-thelema', p: 'Thelema Mountain Vineyards',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Stellenbosch', sub: 'Simonsberg-Stellenbosch',
    founded: '1983',
    holdings: 'Gyles Webb\'s property high on the Helshoogte Pass on the Simonsberg, among the cooler and higher Stellenbosch sites; the Sutherland range comes from the family\'s Elgin vineyards.',
    style: 'High-altitude Stellenbosch Cabernet with a marked minty lift, and citrus-driven Chardonnay with restrained oak.',
    t: 'Helshoogte\'s high cool slopes: minty Cabernet, citrus-driven Chardonnay',
    why: 'A useful marker for altitude within Stellenbosch, and for Elgin as the Cape\'s cool apple-country white region through the Sutherland wines.',
    wines: [
      { n: 'Cabernet Sauvignon', grape: 'Cabernet Sauvignon', note: 'The mint-lifted Simonsberg Cabernet that made the estate\'s name' },
      { n: 'Chardonnay', grape: 'Chardonnay', note: 'One of the Cape\'s early serious Chardonnays' },
      { n: 'Merlot Reserve', grape: 'Merlot', note: 'Structured Stellenbosch Merlot, firmer than the variety\'s reputation' }
    ],
    traps: [
      'Elgin is a separate cool district and not part of Stellenbosch',
      'A minty or eucalypt note is a site marker in some Cape and Australian Cabernet, not a fault'
    ]
  },
  {
    id: 'p-torbreck', p: 'Torbreck Vintners',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Barossa Valley', sub: 'Marananga',
    founded: '1994',
    holdings: 'Founded by David Powell around contracts with old dry-grown Barossa growers, later adding estate vineyards; named after a forest in Scotland.',
    style: 'Rhône-modelled Barossa: Shiraz with a touch of Viognier, Grenache and Mataro blends, generous fruit carried on ripe oak.',
    t: 'Dry-grown Barossa Shiraz with Viognier lift: blueberry, licorice, sweet oak',
    why: 'The name to cite for the modern Rhône-referencing Barossa and for the GSM blend, and a working example of old dry-grown bush-vine fruit bought from growers rather than owned.',
    wines: [
      { n: 'RunRig', grape: 'Shiraz with a small proportion of Viognier', note: 'The flagship, co-fermented in the Côte-Rotie manner from old dry-grown vines' },
      { n: 'The Steading', grape: 'Grenache, Shiraz, Mataro', note: 'The house GSM, the blend the Court expects you to name for the Barossa' },
      { n: 'The Struie', grape: 'Shiraz', note: 'Blends Barossa Valley floor fruit with cooler Eden Valley material' }
    ],
    traps: [
      'Mataro is the Australian name for Mourvèdre, and Monastrell in Spain',
      'A Viognier co-ferment does not make the wine a white blend: it is labelled Shiraz Viognier'
    ]
  },
  {
    id: 'p-tyrrells', p: 'Tyrrell\'s Wines',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Hunter Valley', sub: 'Pokolbin',
    founded: '1858',
    holdings: 'Founded by Edward Tyrrell at Pokolbin and still family run; holds very old Hunter blocks including Shiraz vines dating to the nineteenth century, and fruit from the historic HVD vineyard.',
    style: 'Hunter classicism: low-alcohol unoaked Sémillon released with bottle age, and medium-bodied earthy Shiraz rather than heavy extraction.',
    t: 'Hunter to the bone: Vat 1 Sémillon\'s lanolin, Vat 47\'s low-oak Chardonnay',
    why: 'The Hunter Valley\'s central house and the fastest route to Hunter Sémillon: picked at around ten and a half per cent alcohol, given no oak, and transformed by bottle age alone.',
    wines: [
      { n: 'Vat 1 Sémillon', grape: 'Sémillon', note: 'The Hunter Sémillon reference, picked early, unoaked, and released after years in bottle' },
      { n: 'Vat 47 Chardonnay', grape: 'Chardonnay', note: 'Descends from Australia\'s first commercial Chardonnay plantings of the early 1970s' },
      { n: 'Vat 9 Shiraz', grape: 'Shiraz', note: 'Medium-bodied Hunter Shiraz, savoury and earthen rather than sweet' },
      { n: '4 Acres Shiraz', grape: 'Shiraz', note: 'From nineteenth-century own-rooted vines, the Hunter\'s old-vine argument' }
    ],
    traps: [
      'Hunter Sémillon\'s toast and lanolin come from bottle age, not from oak',
      'Vat numbers are house codes, not legal terms',
      'The Hunter is hot and humid, yet its signature white is the lowest in alcohol in Australia'
    ]
  },
  {
    id: 'p-vasse-felix', p: 'Vasse Felix',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Margaret River', sub: 'Wilyabrup',
    founded: '1967',
    holdings: 'EMPTY (delete the ownership clause; keep Cullity and 1967)',
    style: 'Cool maritime Bordeaux blends with leafy lift and firm acid, and worked Chardonnay of grapefruit and struck flint.',
    t: 'Margaret River\'s first vineyard: leafy Cabernet, taut barrel-worked Chardonnay',
    why: 'The date to know for Margaret River\'s founding, following Dr John Gladstones\' research identifying the region\'s suitability in the mid 1960s.',
    wines: [
      { n: 'Tom Cullity', grape: 'Cabernet Sauvignon with Malbec', note: 'The flagship red, named for the founder and drawn from the original plantings' },
      { n: 'Heytesbury', grape: 'Cabernet Sauvignon led blend', note: 'The long-standing Margaret River Cabernet blend benchmark' },
      { n: 'Heytesbury Chardonnay', grape: 'Chardonnay', note: 'Taut, barrel-worked Margaret River Chardonnay' }
    ],
    traps: [
      'Margaret River was proposed on climate research before it was planted, a rare case of science preceding tradition',
      'Vasse Felix is in Western Australia, a long way from every South Australian region'
    ]
  },
  {
    id: 'p-vergelegen', p: 'Vergelegen',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Stellenbosch', sub: 'Somerset West',
    founded: '1700',
    holdings: 'Established in 1700 by Willem Adriaan van der Stel at Somerset West, with camphor trees from the same period still standing; cool, high slopes facing False Bay.',
    style: 'Cool Stellenbosch: leafy, cassis-driven Bordeaux blends of moderate weight, and taut Sémillon-led whites.',
    t: 'Cape history in a modern glass: Bordeaux blends of leaf, cassis and polish',
    why: 'Carries the founding chronology examiners want: 1659 first Cape vintage, 1685 Constantia, 1700 Vergelegen, 1925 Pinotage, 1973 Wine of Origin.',
    wines: [
      { n: 'Vergelegen V', grape: 'Cabernet Sauvignon', note: 'The flagship, made only in favourable years' },
      { n: 'GVB Red', grape: 'Cabernet Sauvignon, Cabernet Franc, Merlot', note: 'The estate\'s Bordeaux blend' },
      { n: 'GVB White', grape: 'Sémillon and Sauvignon Blanc', note: 'White Bordeaux in composition, a Cape speciality' }
    ],
    traps: [
      'Somerset West is a cool corner of Stellenbosch influenced by False Bay, not a warm inland site',
      'Willem Adriaan van der Stel founded Vergelegen; his father Simon founded Constantia'
    ]
  },
  {
    id: 'p-villa-maria', p: 'Villa Maria',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Marlborough and Hawke\'s Bay', sub: '',
    founded: '1961',
    holdings: 'Founded by George Fistonich in Auckland, with vineyards and wineries in Marlborough and Hawke\'s Bay; a long-standing tiered range from regional wines up to single vineyards.',
    style: 'Clean, reliable and varietally exact across tiers, the commercial definition of New Zealand style.',
    t: 'The screwcap standard-bearer: clean, precise Marlborough and Hawke\'s Bay',
    why: 'Villa Maria moved its whole range to screwcap in 2001, the decisive commercial step in a closure change that made New Zealand and Australia the screwcap nations.',
    wines: [
      { n: 'Reserve Sauvignon Blanc', grape: 'Sauvignon Blanc', note: 'Marlborough Sauvignon at reserve level, the mainstream reference' },
      { n: 'Reserve Chardonnay', grape: 'Chardonnay', note: 'Hawke\'s Bay Chardonnay showing the warmer North Island frame' },
      { n: 'Single Vineyard Taylors Pass', grape: 'Sauvignon Blanc', note: 'An Awatere Valley site, cooler, more herbal and saline than the Wairau' }
    ],
    traps: [
      'Screwcap adoption was driven by TCA and random oxidation, not by cost',
      'Awatere is cooler, more herbal and saline; Wairau is riper and more tropical'
    ]
  },
  {
    id: 'p-errazuriz', p: 'Viña Errázuriz',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Aconcagua Valley', sub: 'Panquehue',
    founded: '1870',
    holdings: 'Founded by Maximiano Errazuriz at Panquehue in the Aconcagua; now run by Eduardo Chadwick, with coastal Aconcagua Costa vineyards on schist and the Viñedo Chadwick vineyard in Puente Alto, Maipo.',
    style: 'Polished, structured mountain Cabernet blends, with a separate cool coastal range of Chardonnay and Pinot from schist soils.',
    t: 'The Berlin Tasting victor, polished mountain Cabernet blends',
    why: 'Eduardo Chadwick\'s Berlin Tasting of January 2004 placed Viñedo Chadwick 2000 first and Seña 2001 second ahead of First Growths, the single most cited event in Chile\'s modern reputation.',
    wines: [
      { n: 'Don Maximiano Founder\'s Reserve', grape: 'Cabernet Sauvignon led blend', note: 'The historic Aconcagua flagship' },
      { n: 'Seña', grape: 'Cabernet Sauvignon led blend', note: 'Biodynamic Aconcagua blend, originally a joint venture with Robert Mondavi' },
      { n: 'Viñedo Chadwick', grape: 'Cabernet Sauvignon', note: 'Puente Alto Cabernet from a former polo field, first in the 2004 Berlin Tasting' },
      { n: 'Las Pizarras', grape: 'Chardonnay and Pinot Noir', note: 'Aconcagua Costa schist wines, the cool coastal face of the house' }
    ],
    traps: [
      'The Berlin Tasting was in Berlin in 2004, not in Paris and not in the 1970s',
      'Seña and Almaviva are different wines with different partners: Seña began with Mondavi, Almaviva with Baron Philippe de Rothschild',
      'Aconcagua Costa is cool and coastal, quite unlike the warm Panquehue heartland of the same valley'
    ]
  },
  {
    id: 'p-montes', p: 'Viña Montes',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Colchagua Valley', sub: 'Apalta',
    founded: '1988',
    holdings: 'Founded by Aurelio Montes and partners; holds steep hillside vineyards in the Apalta amphitheatre in Colchagua, farmed dry in places, alongside coastal Zapallar and Marchigue sites.',
    style: 'Ripe but structured Colchagua reds with generous oak, and the spiced, dark-fruited style that made Carmenere commercially serious.',
    t: 'Apalta\'s steep slope: Purple Angel\'s spiced Carmenere, Folly\'s dense Syrah',
    why: 'Apalta in Colchagua is the address examiners want for serious Carmenere, and Montes is the house that demonstrates late picking as the answer to the variety\'s green character.',
    wines: [
      { n: 'Purple Angel', grape: 'Carmenere with a little Petit Verdot', note: 'The flagship Carmenere, showing the variety picked late enough to lose green pyrazine bite' },
      { n: 'Montes Alpha M', grape: 'Cabernet Sauvignon led Bordeaux blend', note: 'The Apalta Bordeaux blend that opened Chile\'s premium tier' },
      { n: 'Montes Folly', grape: 'Syrah', note: 'From the steepest Apalta slopes, Chile\'s most cited Syrah' }
    ],
    traps: [
      'Carmenere needs a long hang to lose its pyrazine edge: underripe examples taste green and are often mistaken for Cabernet Franc',
      'Apalta is a zone within Colchagua, not a valley of its own',
      'Colchagua is warm and inland: do not file it with coastal Casablanca'
    ]
  },
  {
    id: 'p-santa-rita', p: 'Viña Santa Rita',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Maipo Valley', sub: 'Alto Jahuel',
    founded: '1880',
    holdings: 'Historic estate at Alto Jahuel in the Maipo, with holdings across Chile; the 120 range takes its name from the 120 patriots said to have sheltered on the property in 1814.',
    style: 'Classical Maipo Cabernet: cedar, cassis and dusty tannin with restrained ripeness and long bottle ageing.',
    t: 'Alto Jahuel classicism: Casa Real\'s cedar, cassis and old-school poise',
    why: 'One of the nineteenth-century Chilean houses that predate the modern era, and the counterweight to the view that Chilean quality began in the 1990s.',
    wines: [
      { n: 'Casa Real Reserva Especial', grape: 'Cabernet Sauvignon', note: 'Single-vineyard Alto Jahuel Cabernet, the traditionalist Maipo benchmark' },
      { n: 'Floresta', grape: 'Varies by site', note: 'The single-vineyard range across Chilean valleys' },
      { n: 'Medalla Real', grape: 'Cabernet Sauvignon', note: 'The consistent mid-tier Maipo Cabernet' }
    ],
    traps: [
      'Chile\'s fine wine history begins in the nineteenth century with French varieties imported before phylloxera reached Europe',
      'Alto Jahuel is a Maipo subzone, not a separate valley'
    ]
  },
  {
    id: 'p-wendouree', p: 'Wendouree',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Clare Valley', sub: 'Sevenhill',
    founded: '',
    holdings: 'A small ironstone and clay property at Sevenhill in the Clare Valley with vine material dating to the 1890s; dry grown, sold almost entirely by mailing list.',
    style: 'Tannic, dense and unpolished Clare reds built on old vines and large old oak, with little concession to early drinking.',
    t: 'Ironstone Clare reds of ferocious tannin: dense, unfashionable, immortal',
    why: 'The cult reference for old-vine Clare reds and a reminder that Australia\'s oldest vine material survives because South Australia was quarantined against phylloxera from 1899.',
    wines: [
      { n: 'Shiraz', grape: 'Shiraz', note: 'The core wine, ferociously structured and very long-lived' },
      { n: 'Shiraz Malbec', grape: 'Shiraz and Malbec', note: 'An old Australian blend combination kept alive here' },
      { n: 'Cabernet Malbec', grape: 'Cabernet Sauvignon and Malbec', note: 'Clare Cabernet given Malbec\'s colour and plush mid-palate' }
    ],
    traps: [
      'Clare is known for Riesling, yet Wendouree makes only reds',
      'Malbec has a long Australian history and is not solely an Argentine story'
    ]
  },
  {
    id: 'p-wynns-coonawarra', p: 'Wynns Coonawarra Estate',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Coonawarra', sub: '',
    founded: '1951',
    holdings: 'Large holdings on Coonawarra\'s terra rossa strip, red loam over limestone, centred on John Riddoch\'s 1890s triple-gabled winery that appears on the label; bought by the Wynn family in 1951.',
    style: 'Structured, medium-bodied Cabernet with mint or eucalypt lift, cedar oak and firm acid, never jammy.',
    t: 'Terra rossa Cabernet: mint, blackcurrant leaf, cedar, tidy structure',
    why: 'The house that defines Coonawarra, and the shortest route to the terra rossa question: a narrow cigar-shaped strip of red soil over limestone in the cool far south of South Australia.',
    wines: [
      { n: 'Black Label', grape: 'Cabernet Sauvignon', note: 'The volume benchmark against which Coonawarra Cabernet is judged' },
      { n: 'John Riddoch', grape: 'Cabernet Sauvignon', note: 'The top selection, named for the man who planted the district' },
      { n: 'Michael', grape: 'Shiraz', note: 'The Shiraz flagship, a reminder that Coonawarra is not Cabernet alone' }
    ],
    traps: [
      'Terra rossa is red loam over limestone, not volcanic soil and not clay',
      'Coonawarra is cool by Australian standards, so its Cabernet is structured rather than jammy',
      'Coonawarra is in South Australia, not Victoria, despite sitting close to the border'
    ]
  },
  {
    id: 'p-yalumba', p: 'Yalumba',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Barossa and Eden Valley', sub: 'Angaston',
    founded: '1849',
    holdings: 'Founded by Samuel Smith at Angaston and still family owned, with Eden Valley holdings including the Pewsey Vale vineyard; runs its own vine nursery and cooperage.',
    style: 'Traditionalist breadth: Cabernet Shiraz blends and Shiraz in American oak octaves, alongside Australia\'s most serious Viognier and cool Eden Valley Riesling.',
    t: 'Barossa\'s oldest family house: Viognier apricot, Cabernet-Shiraz in oak octaves',
    why: 'The answer for Australia\'s oldest family-owned winery, for the Cabernet Shiraz blend as a national idiom, and for Viognier outside the Rhône.',
    wines: [
      { n: 'The Signature', grape: 'Cabernet Sauvignon and Shiraz', note: 'The long-running Australian Cabernet Shiraz benchmark, each release dedicated to an employee' },
      { n: 'The Octavius', grape: 'Shiraz', note: 'Old-vine Barossa Shiraz aged in small American oak octaves made in the estate cooperage' },
      { n: 'The Virgilius', grape: 'Viognier', note: 'Eden Valley Viognier, the Australian reference for the variety' },
      { n: 'Pewsey Vale The Contours', grape: 'Riesling', note: 'Eden Valley Riesling released with bottle age, dry and lime-driven' }
    ],
    traps: [
      'Australian Riesling is dry by default: Pewsey Vale is not a German-style off-dry wine',
      'An octave is a small cask, not a vineyard or a blend term'
    ]
  },
  {
    id: 'p-yarra-yering', p: 'Yarra Yering',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Yarra Valley', sub: 'Gruyere',
    founded: '1969',
    holdings: 'Vineyard planted by Dr Bailey Carrodus in 1969, one of the estates that restarted the Yarra Valley after its long dormancy; close-planted, dry-grown, low yielding.',
    style: 'Savoury and structured rather than fruit-forward, with the two Dry Red bottlings deliberately kept as numbered blends rather than varietal labels.',
    t: 'Carrodus\'s Dry Reds: No. 1 Bordeaux savour, No. 2 peppered Rhône',
    why: 'The estate that anchors the Yarra Valley revival and a rare Australian house that labels by blend number rather than variety, which examiners use to test label law knowledge.',
    wines: [
      { n: 'Dry Red Wine No. 1', grape: 'Cabernet Sauvignon led Bordeaux blend', note: 'The Bordeaux-modelled red, cedar and dried herb over cool-grown fruit' },
      { n: 'Dry Red Wine No. 2', grape: 'Shiraz led, with Rhône varieties', note: 'The Rhône-modelled counterpart, peppered and lifted' },
      { n: 'Pinot Noir', grape: 'Pinot Noir', note: 'From the original 1969 plantings, among the Yarra\'s oldest Pinot' }
    ],
    traps: [
      'No. 1 is the Bordeaux blend and No. 2 the Rhône blend, not the reverse',
      'The Yarra Valley is a Victorian region with nineteenth-century roots that lapsed and were replanted from the 1960s'
    ]
  },
  {
    id: 'w-almaviva', p: 'Almaviva',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Maipo Valley', sub: 'Puente Alto',
    founded: '',
    holdings: 'A joint venture of Baron Philippe de Rothschild and Concha y Toro, drawing on Puente Alto vineyards in the Alto Maipo at the foot of the Andes.',
    style: 'Cabernet Sauvignon led with Carmenère and other Bordeaux varieties, raised in French oak: cassis, graphite and polished, fine-grained tannin.',
    t: 'Puente Alto Cabernet in Bordeaux dress: cassis, graphite, polished tannin',
    why: 'The French joint venture question groups Almaviva in Chile, Opus One in Napa and Cheval des Andes in Mendoza. Know the partner for each, and that Almaviva carries a Carmenere component which Opus One does not.',
    wines: [
      { n: 'Almaviva', grape: 'Cabernet Sauvignon led with Carmenère, Cabernet Franc and Merlot', note: 'Chile\'s French joint-venture icon, from the same Puente Alto ground as Don Melchor' }
    ],
    traps: [
      'Almaviva\'s French partner is Baron Philippe de Rothschild of Mouton, and the Chilean partner is Concha y Toro',
      'Seña is a different wine, from Aconcagua, begun with Robert Mondavi',
      'Puente Alto is cool Andean-edge Maipo, not a warm valley floor'
    ]
  },
  {
    id: 'w-adrianna-vineyard', p: 'Catena Zapata Adrianna Vineyard',
    by: 'p-catena-zapata',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Mendoza', sub: 'Gualtallary, Tupungato, Uco Valley',
    founded: '1992',
    holdings: 'Planted in 1992 at around 1,450 metres in Gualtallary, and divided into parcels bottled separately: White Bones and White Stones for Chardonnay, Fortuna Terrae, Mundus Bacillus Terrae and River Stones for Malbec. The Catena Institute of Wine publishes research from the site.',
    style: 'Cool high-altitude fruit: Malbec of violet, chalk and firm acid, and Chardonnay that is saline and tense rather than tropical.',
    t: 'Gualtallary at 1,450 m: chalky Malbec, saline Chardonnay, alpine tension',
    why: 'The published reference site for Argentina\'s altitude argument and the clearest single-vineyard parcel study in South America, which is why examiners use it to test Uco Valley geography.',
    wines: [
      { n: 'White Bones', grape: 'Chardonnay', note: 'One of two adjacent Chardonnay parcels, named for calcareous deposits in the soil' },
      { n: 'White Stones', grape: 'Chardonnay', note: 'The neighbouring parcel, bottled separately as a direct soil comparison' },
      { n: 'Fortuna Terrae', grape: 'Malbec', note: 'A named Malbec parcel within the same vineyard' }
    ],
    traps: [
      'Gualtallary sits within Tupungato in the Uco Valley: it is not a region of its own',
      'The parcels are divisions of one vineyard, not separate estates',
      'Uco is higher and cooler than Luján de Cuyo, so its wines are tauter, not bigger'
    ]
  },
  {
    id: 'w-cheval-des-andes', p: 'Cheval des Andes',
    by: 'p-terrazas-de-los-andes',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Mendoza', sub: 'Luján de Cuyo and Uco Valley',
    founded: '1999',
    holdings: 'A joint venture of Château Cheval Blanc and Terrazas de los Andes, drawing on old Malbec in Luján de Cuyo together with higher Uco Valley fruit.',
    style: 'Malbec led with Cabernet Sauvignon, given a Bordeaux frame: violet, cedar and supple tannin at moderate alcohol rather than Mendoza\'s plusher norm.',
    t: 'Malbec with Cabernet in Saint-Émilion\'s hand: violet, cedar, supple grain',
    why: 'Completes the French joint-venture set with Almaviva and Opus One, and demonstrates Malbec handled for freshness and structure rather than weight.',
    wines: [
      { n: 'Cheval des Andes', grape: 'Malbec with Cabernet Sauvignon', note: 'The Bordeaux reading of Argentine Malbec, first vintage 1999' }
    ],
    traps: [
      'Cheval Blanc is a Saint-Émilion estate built on Cabernet Franc and Merlot, but this wine is Malbec led with Cabernet Sauvignon',
      'The Argentine partner is Terrazas de los Andes, not Catena',
      'It is a Mendoza wine, not a Patagonian one'
    ]
  },
  {
    id: 'w-hill-of-grace', p: 'Hill of Grace',
    by: 'p-henschke',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Eden Valley', sub: 'Keyneton',
    founded: '1958',
    holdings: 'A single Eden Valley vineyard facing the Gnadenberg Lutheran church, with Shiraz planted in the 1860s, including the block known as Grandfathers; dry grown and own-rooted.',
    style: 'Eden Valley Shiraz of sage, dark plum and fine, silken tannin, cooler and more perfumed than Barossa floor fruit.',
    t: 'One Eden Valley block of 1860s Shiraz: sage, dark plum, silken gravity',
    why: 'The standing comparison with Grange: one named vineyard against a multi-region blend, and the surviving nineteenth-century vines explained by South Australia\'s 1899 phylloxera quarantine.',
    wines: [
      { n: 'Hill of Grace', grape: 'Shiraz', note: 'The single-vineyard counterpart to Grange, first bottled in 1958' }
    ],
    traps: [
      'Hill of Grace is a vineyard name, carrying no legal classification',
      'Eden Valley is a separate GI from Barossa Valley, higher and cooler',
      'Mount Edelstone is Henschke\'s other single-vineyard Shiraz, so the estate has two'
    ]
  },
  {
    id: 'w-paul-sauer', p: 'Kanonkop Paul Sauer',
    by: 'p-kanonkop',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Stellenbosch', sub: 'Simonsberg-Stellenbosch',
    founded: '1981',
    holdings: 'From Kanonkop\'s lower Simonsberg slopes in Stellenbosch, fermented in open concrete kuipe with manual punch-down and matured in French oak.',
    style: 'Cabernet Sauvignon led with Cabernet Franc and Merlot: cassis, cigar box and graphite on a firm, slow-resolving tannin structure.',
    t: 'Simonsberg Cabernet blend: cassis, cigar box, graphite, long ageing curve',
    why: 'The wine candidates should name for the Cape Bordeaux blend, and the reason Kanonkop is not reducible to Pinotage.',
    wines: [
      { n: 'Paul Sauer', grape: 'Cabernet Sauvignon, Cabernet Franc, Merlot', note: 'South Africa\'s most examined Bordeaux blend, named for the estate\'s forebear' }
    ],
    traps: [
      'Paul Sauer contains no Pinotage, so it is not a Cape Blend',
      'A Cape Blend is defined by including Pinotage; a Bordeaux blend at the Cape is simply that',
      'Simonsberg-Stellenbosch is a ward within the Stellenbosch district'
    ]
  },
  {
    id: 'w-grange', p: 'Penfolds Grange',
    by: 'p-penfolds',
    country: 'Australia, New Zealand, South Africa and South America', r: 'South Australia', sub: 'multi-region blend',
    founded: '1951',
    holdings: 'Blended across South Australian regions, with Barossa Valley and McLaren Vale fruit usually central; matured in new American oak hogsheads.',
    style: 'Predominantly Shiraz, sometimes with a small proportion of Cabernet Sauvignon, given full new American oak: black fruit, mocha, sweet spice and enormous structure.',
    t: 'Multi-region Shiraz in new American oak: mocha, black fruit, iron will',
    why: 'Max Schubert made the first experimental vintage in 1951 after studying in Europe, then continued in secret through the late 1950s when management ordered production stopped. The Court expects the story, the blend structure and the contrast with Hill of Grace.',
    wines: [
      { n: 'Grange', grape: 'Shiraz, occasionally with a little Cabernet Sauvignon', note: 'Australia\'s most examined wine and its multi-region blending argument in one bottle' }
    ],
    traps: [
      'Grange is a blend of regions and vineyards, not a single-vineyard wine',
      'It was labelled Grange Hermitage into the late 1980s, Hermitage being an Australian synonym for Shiraz',
      'It is not a Barossa appellation wine: the label reads South Australia',
      'American oak, not French, is the house signature'
    ]
  },
  {
    id: 'w-columella', p: 'Sadie Family Columella',
    by: 'p-sadie-family',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Swartland', sub: '',
    founded: '2000',
    holdings: 'Blended from dry-farmed Swartland bush vines on schist and granite, whole-bunch fermented and raised in large old wood.',
    style: 'Syrah led with Mourvèdre and other Rhône varieties: fynbos, olive, dried herb and stone, savoury rather than fruit-forward and carrying no new-oak sheen.',
    t: 'Swartland Syrah-led blend: fynbos, olive, stone and salt, no gloss',
    why: 'The wine that made the Swartland a fine wine district and shifted South Africa\'s red conversation from Pinotage and Cabernet to Rhône varieties on dry-farmed bush vines.',
    wines: [
      { n: 'Columella', grape: 'Syrah led with Mourvèdre and other Rhône varieties', note: 'The first vintage was 2000, and it set the terms for the Swartland movement' }
    ],
    traps: [
      'Columella is a blend led by Syrah, not a varietal wine and not Pinotage',
      'The Swartland has no formal cru hierarchy: quality here is a producer and old-vine argument',
      'Palladius is the white counterpart, a many-variety field-style blend'
    ]
  },
  {
    id: 'w-sena', p: 'Seña',
    by: 'p-errazuriz',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Aconcagua Valley', sub: 'Ocoa',
    founded: '1995',
    holdings: 'A hillside estate in the Aconcagua Valley farmed biodynamically; begun as a joint venture between Eduardo Chadwick of Errazuriz and Robert Mondavi, with the Chadwick family taking full ownership in 2004.',
    style: 'Cabernet Sauvignon led with Carmenère, Malbec and Petit Verdot: cassis, wild herb and a fine dusty structure rather than overt oak.',
    t: 'Aconcagua biodynamic blend: cassis, wild herb, fine dusty structure',
    why: 'Half of the Berlin Tasting result of January 2004, the event that changed Chile\'s international standing, and the wine most often confused with Almaviva.',
    wines: [
      { n: 'Seña', grape: 'Cabernet Sauvignon led blend with Carmenère', note: 'Second in the 2004 Berlin Tasting, ahead of several First Growths' }
    ],
    traps: [
      'Seña\'s original partner was Robert Mondavi, not a Bordeaux house',
      'Seña is from Aconcagua; Almaviva and Viñedo Chadwick are from Maipo',
      'The Berlin Tasting was held in Berlin in 2004, not in Paris'
    ]
  },
  {
    id: 'w-coleraine', p: 'Te Mata Coleraine',
    by: 'p-te-mata-estate',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Hawke\'s Bay', sub: 'Havelock North',
    founded: '1982',
    holdings: 'A selection from Te Mata\'s Hawke\'s Bay hillside and gravel vineyards, made only in the better vintages and released with bottle age.',
    style: 'Cabernet Sauvignon led with Merlot and Cabernet Franc at moderate alcohol: cedar, cassis and dried herb over a restrained, slowly unfolding structure.',
    t: 'Hawke\'s Bay Cabernet-Merlot: cedar, cassis, restraint that ages decades',
    why: 'The answer when a question asks for New Zealand\'s benchmark red other than Pinot Noir, and evidence that Hawke\'s Bay ripens Bordeaux varieties reliably while the rest of the country does not.',
    wines: [
      { n: 'Coleraine', grape: 'Cabernet Sauvignon, Merlot, Cabernet Franc', note: 'New Zealand\'s most collected red, first made in 1982' }
    ],
    traps: [
      'Coleraine is a Hawke\'s Bay Bordeaux blend, not a Pinot Noir',
      'Awatea is Te Mata\'s second blend; Awatere is a valley in Marlborough',
      'Hawke\'s Bay is on the North Island, the warmest of New Zealand\'s serious regions'
    ]
  },
  {
    id: 'w-vat-1-semillon', p: 'Tyrrell\'s Vat 1 Sémillon',
    by: 'p-tyrrells',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Hunter Valley', sub: 'Pokolbin',
    founded: '',
    holdings: 'Drawn from old Hunter Sémillon blocks including fruit from the historic HVD vineyard; picked early, whole-bunch pressed, fermented cool in tank and bottled without oak.',
    style: 'Around ten and a half per cent alcohol, neutral and lemony in youth, developing lanolin, buttered toast and lime after five to ten years in bottle with no wood involved.',
    t: 'Picked early, unoaked, released aged: lanolin, toast, lime, piercing acid',
    why: 'Hunter Sémillon is a style with no European equivalent and a standing blind-tasting question: a hot humid region producing the country\'s lowest-alcohol, longest-lived dry white.',
    wines: [
      { n: 'Vat 1 Sémillon', grape: 'Sémillon', note: 'The reference bottling for Hunter Sémillon, released with substantial bottle age' }
    ],
    traps: [
      'The toast and honey come entirely from bottle age, not from oak or from botrytis',
      'It is dry, despite a honeyed aroma with age',
      'Vat 1 is a house cellar code, not a legal or vineyard designation',
      'Hunter Sémillon is unrelated in style to oaked Margaret River or sweet Sauternes Sémillon'
    ]
  },
  {
    id: 'w-vin-de-constance', p: 'Vin de Constance',
    by: 'p-klein-constantia',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Constantia', sub: 'Cape Town',
    founded: '1986',
    holdings: 'Made at Klein Constantia from Muscat de Frontignan on part of Simon van der Stel\'s 1685 Constantia estate; grapes are left to raisin on the vine and picked in successive passes.',
    style: 'Unfortified sweet Muscat of candied citrus, barley sugar and tea, kept fresh by acidity rather than by spirit.',
    t: 'Unfortified raisined Muscat: candied citrus, tea, barley sugar, fresh finish',
    why: 'The eighteenth-century Constantia wine was the first wine from outside Europe to command European prices, reaching royal cellars and Napoleon in exile. Its revival is the Cape\'s oldest examinable thread.',
    wines: [
      { n: 'Vin de Constance', grape: 'Muscat de Frontignan, that is Muscat Blanc a Petits Grains', note: 'The revived eighteenth-century Constantia wine, first modern release from the 1986 vintage' }
    ],
    traps: [
      'It is not fortified, unlike the Ports and Madeiras it once sat beside',
      'The grape is Muscat Blanc a Petits Grains under the Frontignan name, not Muscat of Alexandria',
      'Constantia is a ward within the city of Cape Town, not a Stellenbosch district',
      'The historic wine and the modern one are separated by roughly a century of interruption'
    ]
  },
  {
    id: 'w-vinedo-chadwick', p: 'Viñedo Chadwick',
    by: 'p-errazuriz',
    country: 'Australia, New Zealand, South Africa and South America', r: 'Maipo Valley', sub: 'Puente Alto',
    founded: '1999',
    holdings: 'A small Puente Alto vineyard planted on the Chadwick family\'s former polo field, on stony alluvial soils at the Andean edge of the Alto Maipo.',
    style: 'Pure Cabernet Sauvignon of cassis, mint and fine gravelly tannin, silkier and less broad than warmer Maipo Cabernet.',
    t: 'A polo field turned Maipo Cabernet: cassis, mint, silk over gravel',
    why: 'The wine that topped the Berlin Tasting, the Master-level detail behind Chile\'s reputational shift, and evidence that Puente Alto rather than Colchagua is Chile\'s Cabernet address.',
    wines: [
      { n: 'Viñedo Chadwick', grape: 'Cabernet Sauvignon', note: 'Placed first in the Berlin Tasting of January 2004 with the 2000 vintage' }
    ],
    traps: [
      'Viñedo Chadwick and Seña are different wines from different valleys under the same ownership',
      'The tasting was blind, in Berlin, in 2004, and the panel was European',
      'Puente Alto is shared ground: Don Melchor and Almaviva come from the same subzone'
    ]
  }
];
