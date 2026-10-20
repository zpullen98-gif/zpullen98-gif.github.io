/* The service references: SERVICE_REF, drawn by codex39's serviceref view.

   Ten tables the Certified service practical and theory lean on: wine faults,
   glassware, bottle sizes, service temperatures, decanting, sparkling wine
   service, aperitifs, digestifs, spirits and classic cocktails. Each table has
   four columns, a line under its title, notes where a rule needs them, say
   pairs for the names a server says aloud, and sources with a date. Then the
   cards and the questions, which codex39 deals as the deck Service references
   and the drill of the same name. Every question carries its id, s- and eight
   base36 digits minted once from its stem (mintServiceId in
   .scripts/regions/build-regions.cjs) and never re-minted, so a reworded stem
   keeps its id. The shape is .scripts/regions/service-ref-schema.json
   and the gate is .scripts/check-regions.js, which also holds every string to
   the voice rules: British spelling, no dash of any kind, no glyph at or above
   U+2190, never the retired word for rehearsal.

   Measures are given in millilitres with ounces beside them where a bar would
   say ounces. Temperatures are given in both scales. Where a house measure
   governs (the taste pour, the glass pour), the house measure wins over the
   figure here. Age statements are the law as it stood when checked; the
   sources name the body and the date. Nothing here names a living person. */

var SERVICE_REF = {
  "version": 1,
  "tables": [
    {
      "key": "faults",
      "title": "Wine faults",
      "line": "What a faulty glass smells or looks of, where it came from, and what a sommelier does about it at the table.",
      "columns": ["Fault", "Smells or looks of", "Cause", "At the table"],
      "rows": [
        ["Cork taint (TCA)", "Damp cardboard, wet dog, a musty cellar; the fruit is muted and the finish short, and at low levels it only dulls the wine", "2,4,6-trichloroanisole, made when mould meets chlorine compounds in cork, barrels, cardboard or the winery itself; detectable at a few nanograms per litre", "Replace the bottle without argument, check the second before pouring it, and keep the first for the supplier. Taint is a condition, never a matter of taste"],
        ["Oxidation", "Bruised apple, sherry, nut, a flat dull nose; whites deepen to gold and amber, reds turn brick and brown at the rim and beyond", "Too much oxygen: a failed closure, a bottle open too long, hot or careless storage, too little free sulphur dioxide at bottling", "A fault unless the style is deliberate (Amontillado, Oloroso, tawny Port, Madeira; vin jaune ages under a veil of yeast but is meant to taste oxidative). Fino and Manzanilla are aged under flor, away from air, and should never taste flat or bruised. Replace it, check the closure, and check the by-the-glass bottles opened days ago"],
        ["Reduction, light", "Struck match, flint or smoke; record the observation before naming a cause", "Several volatile sulphur compounds can contribute. Aroma alone cannot identify the compound or predict its response to air", "A small sample may change with swirling, but do not promise a cure. Reassess with a colleague, consider the intended style and resolve the guest's concern"],
        ["Reduction, heavy", "Rotten egg, drains, cooked cabbage, rubber, burnt garlic or onion", "Hydrogen sulphide, thiols and disulphides can contribute; their formation and response to oxygen differ", "Do not insist that the guest wait for aeration. Stop the pour, consult the sommelier and replace a faulty bottle through the house procedure"],
        ["Volatile acidity", "Nail varnish, vinegar, a lifted sharpness on the nose that dries and shortens the finish", "Acetic acid and ethyl acetate from Acetobacter working with oxygen, or from a stuck or sluggish fermentation; wine law sets a legal maximum", "A trace lifts some styles (Amarone, Sauternes, some natural wines). Vinegar that dries the finish is a fault: replace it"],
        ["Brettanomyces", "Barnyard, horse blanket, sticking plaster, clove, smoked meat, a metallic finish", "The yeast Brettanomyces bruxellensis makes 4-ethylphenol and 4-ethylguaiacol in barrels and bottles where sugar is left; it loves low sulphur and warm cellars", "Low levels are tolerated in some reds and some guests like them. Stop pouring when it masks the fruit; it does not blow off"],
        ["Heat damage", "Unexpected cooked fruit and faded freshness; seepage or a raised cork may be clues", "Excessive heat during storage or transport; exposure time and temperature both matter", "Inspect and assess the wine, then alert the sommelier. A leak or ripe fruit alone is not proof. Set aside suspect bottles for review rather than guessing a safe temperature threshold"],
        ["Refermentation", "Unexpected fizz in a still wine, a yeasty nose, haze, a cork pushed up", "Live yeast meeting residual sugar in the bottle, a risk in low-sulphur and off-dry wines bottled warm", "A fault in a still wine unless the style is pétillant naturel; a faint prickle of carbon dioxide in a young fresh white is sometimes deliberate. Ask, then replace if it is wrong"],
        ["Light strike", "Cooked cabbage, wet wool, skunk; worst in clear and green glass left under a lamp", "Ultraviolet and blue light turn riboflavin into sulphur compounds; Champagne and rosé in clear bottles are most at risk", "No cure: replace the bottle. Keep clear bottles in the dark, never on a lit display shelf, and sell them from the box"],
        ["Mousiness", "Nothing on the nose, then a mouse cage, stale crackers or corn chips on the finish a few seconds after swallowing", "Tetrahydropyridines made by Brettanomyces and lactic bacteria at high pH with little sulphur; it shows only retronasally", "A fault: replace it. Some tasters cannot detect it at all, so trust a colleague's finish before dismissing a guest's complaint"],
        ["Geranium taint", "Crushed geranium leaves, sharp and green", "Lactic bacteria turn sorbic acid (potassium sorbate, a preservative in some sweet wines) into a geranium-smelling compound", "A fault: replace it. Seen in off-dry and sweet wines preserved with sorbate, almost never in dry wines"],
        ["Excess sulphur dioxide", "Pungent or irritating sulphurous character; do not identify it from smell alone", "The sensory effect depends on free sulphur dioxide, wine pH and the taster; it differs from hydrogen sulphide", "Do not diagnose a sensitivity or promise that air removes sulphites. Pause service and ask the sommelier to assess the wine and the guest's request"],
        ["Smoke taint", "Ash, campfire, a cold ashtray, most on the palate and finish", "Volatile phenols from wildfire smoke bind in the grapes and are released in the wine; not the same as oak toast", "A fault when obvious: replace. Do not confuse it with the smoke of a heavily toasted barrel or a peated note"],
        ["Premature oxidation", "Bruised apple, honey, wax and nut in a white wine that should be young and fresh", "Not fully understood: closures, low sulphur at bottling and cellar handling are suspected; best known in white Burgundy from the mid 1990s", "A fault: replace it and check other bottles of the same lot, since it strikes bottle by bottle"],
        ["Cloudiness", "A haze or milky cast; compare with the intended style", "Possible causes include proteins, other deposits and microorganisms; some styles are intentionally cloudy", "Check the producer's description and ask the sommelier to assess unexpected haze. A clean smell or the words natural and unfiltered do not establish the cause or guarantee soundness"],
        ["Tartrate crystals", "Glassy crystals on the cork or in the bottom of the bottle, like sugar or ground glass", "Potassium bitartrate dropping out of solution in the cold; whites held near freezing show it most", "Harmless and not a fault. Say they are wine crystals, decant or pour carefully, and never apologise for the wine"],
        ["Sediment", "A dark grainy deposit in old reds and Vintage Port; fine dust in older whites", "Pigments and tannins binding and settling over years in the bottle", "Not a fault. Stand the bottle upright, decant off the deposit over a candle, and present the bottle beside the decanter"],
        ["Cork crumbs", "Bits of cork floating in the glass", "A dry, old or weak cork breaking under the worm, or a cork pushed in", "Not a fault of the wine. Pour a fresh glass, or decant through a fine strainer, apologise for the cork and carry on"]
      ],
      "notes": [
        "The sommelier's check pour exists to catch a fault, never to judge a preference. A guest who dislikes a sound wine is a hospitality decision; a faulty wine is an obligation.",
        "Smell the cork quietly if the house allows, but read the wine: a clean cork can top a corked bottle, and a damp cork a sound one.",
        "Tartrate crystals and normal bottle sediment are not faults. Haze may be intentional, but an unexpected change needs checking; a single smell or appearance is not a diagnosis.",
        "Follow the house procedure for rejected bottles: identify the wine, date and concern, and set it aside for the sommelier. A supplier credit is not guaranteed."
      ],
      "say": [
        ["Brettanomyces", "bret-tan-oh-MY-seez"],
        ["trichloroanisole", "try-klor-oh-AN-ih-sohl"],
        ["pétillant naturel", "peh-tee-YAHN nah-tew-REL"],
        ["goût de lumière", "goo duh loo-MYAIR"],
        ["Acetobacter", "ah-SEE-toh-bak-ter"]
      ],
      "sources": [
        { "title": "The Oxford Companion to Wine, 5th edition", "asOf": "2023" },
        { "title": "Australian Wine Research Institute, volatile sulphur compounds", "asOf": "2026-10-20", "url": "https://www.awri.com.au/industry_support/winemaking_resources/storage-and-packaging/pre-packaging-preparation/removal-volatile-sulfur-compounds/" },
        { "title": "Australian Wine Research Institute, hazes and deposits", "asOf": "2026-10-20", "url": "https://www.awri.com.au/industry_support/winemaking_resources/fining-stabilities/hazes_and_deposits/" },
        { "title": "Australian Wine Research Institute, Advanced Wine Assessment Course notes", "asOf": "2026-10-20", "url": "https://www.awri.com.au/wp-content/uploads/2023/02/01-AWAC-Course-Notes-28092022-1.pdf" },
        { "title": "Court of Master Sommeliers Americas, Certified Sommelier Exam Guide: What to Expect", "asOf": "2023" }
      ]
    },
    {
      "key": "glassware",
      "title": "Glassware",
      "line": "The standard shapes, what each is for, and how much goes in.",
      "columns": ["Glass", "Shape and size", "Pour", "Used for"],
      "rows": [
        ["Bordeaux", "Tall, broad bowl with a slight taper to the rim; about 550 to 750 ml capacity", "150 ml (5 oz), or the house measure; never above the widest point of the bowl", "Often used for structured reds. Leave space to swirl and smell; different tastes are not confined to separate tongue zones"],
        ["Burgundy", "Wide balloon bowl narrowing to the rim; about 700 to 900 ml capacity", "120 to 150 ml (4 to 5 oz), well below the widest point", "Pinot Noir, Nebbiolo, Grenache and aromatic reds, and rich Chardonnay; the bowl collects aroma"],
        ["Universal", "A medium bowl tapering gently to the rim; about 450 to 600 ml capacity", "125 to 150 ml (4 to 5 oz)", "Every still wine when one glass must do; the exam accepts a clean universal stem for most still wines"],
        ["White wine", "A smaller, narrower bowl; about 350 to 450 ml capacity", "120 to 150 ml (4 to 5 oz)", "Sauvignon Blanc, Riesling, light whites and rosé; the small bowl keeps the wine cold and focuses the nose"],
        ["Flute", "Tall and narrow with a small opening; about 150 to 250 ml capacity", "Two thirds full, poured in two motions", "Sparkling wine and Champagne cocktails; it holds the mousse and shows the bead"],
        ["Tulip, sparkling", "A bowl that widens then tapers; about 250 to 350 ml capacity", "A third to a half full, in two motions", "Vintage and prestige Champagne and grower wines where aroma matters; many sommeliers now prefer it to the flute"],
        ["Coupe", "A shallow, wide saucer on a stem; about 150 to 240 ml capacity", "To within a finger of the rim for a cocktail served up", "Daiquiri, Sidecar, Manhattan and other drinks served up; sparkling wine loses its mousse in it"],
        ["Cocktail (Martini)", "A V-shaped bowl on a stem; about 150 to 240 ml capacity", "A standard up cocktail, about 90 to 120 ml (3 to 4 oz) after dilution", "Martini, Cosmopolitan and drinks served up without ice; chill the glass first"],
        ["Nick and Nora", "A small stemmed bell; about 150 ml capacity", "The same as a coupe, with less spill", "Manhattan and stirred drinks served up; the shape many bars now prefer for a stirred drink"],
        ["Rocks (old fashioned)", "A short, heavy tumbler; about 250 to 350 ml for a double", "Over ice to the house measure", "Old Fashioned, Negroni, Sazerac, spirits on the rocks"],
        ["Highball (Collins)", "A tall straight tumbler; about 300 to 400 ml capacity", "Spirit and mixer over ice, topped", "Mojito, Tom Collins, gin and tonic, long drinks"],
        ["Port and fortified", "A small tulip or copita; about 150 to 250 ml capacity", "60 to 75 ml (2 to 2.5 oz)", "Port, Sherry and Madeira; the sherry copita is the same family"],
        ["Dessert wine", "Small and narrow; about 200 to 300 ml capacity", "60 to 90 ml (2 to 3 oz)", "Sauternes, Tokaji, ice wine and late harvest wines; a smaller pour since sweet wine is richer"],
        ["ISO tasting glass", "The 215 ml standard tasting glass of 1977, about 155 mm tall, a bowl tapering to a narrow rim", "50 ml (about 1.7 oz) for a tasting", "Blind tasting, the exam's tasting flights and competition judging"],
        ["Snifter and brandy tulip", "The old balloon on a short stem, 300 to 700 ml; the houses now prefer a small tulip", "30 to 45 ml (1 to 1.5 oz)", "Cognac, Armagnac, Calvados and aged rum; the hand warms the balloon, the tulip focuses the nose"],
        ["Whisky tulip (Glencairn)", "A small tulip on a short foot; about 200 ml capacity", "30 to 45 ml (1 to 1.5 oz), water on the side", "Single malt and other whiskies tasted neat"],
        ["Beer glasses", "Pilsner (tall, tapered, 300 to 400 ml), Belgian tulip or goblet, nonic pint of 568 ml", "To the line, with a head of two fingers", "Lager in the pilsner, abbey and Trappist ales in the goblet, bitter and stout in the pint"],
        ["Sake cups and glass", "The small ochoko, the wooden masu, or a white wine glass for ginjo", "Small and often, each guest pouring for another", "Sake; premium ginjo and daiginjo show best cold in a wine glass"]
      ],
      "notes": [
        "Carry stems by the base or the stem, never the bowl, and place each glass to the right of the water glass in the order the wines will come.",
        "Polish with steam and a clean lint-free cloth, inspect against the light, and support the bowl without twisting it against the stem.",
        "A pour is a volume, not a height: five glasses of 150 ml from a bottle, six at 125 ml. Glass height is no measure of what is in it.",
        "A fresh glass for each new wine; a guest keeps a glass only when asked and when the next wine is of the same kind."
      ],
      "say": [
        ["copita", "koh-PEE-tah"],
        ["ochoko", "oh-CHOH-koh"],
        ["masu", "MAH-soo"]
      ],
      "sources": [
        { "title": "ISO 3591:1977, Sensory analysis: apparatus: wine-tasting glass", "asOf": "1977" },
        { "title": "The Oxford Companion to Wine, 5th edition, entries on glasses and serving wine", "asOf": "2023" },
        { "title": "National Institute on Deafness and Other Communication Disorders, Taste Disorders: taste cells throughout the tongue", "asOf": "2026-10-20", "url": "https://www.nidcd.nih.gov/health/taste-disorders" },
        { "title": "Court of Master Sommeliers Americas, CMS Hospitality and Service Standards", "asOf": "2023", "url": "https://www.mastersommeliers.org/wp-content/uploads/2023/12/CMS-Hospitality-Service-Standards.pdf" }
      ]
    },
    {
      "key": "bottles",
      "title": "Bottle sizes",
      "line": "From the quarter bottle to the Nebuchadnezzar, with the Champagne and Bordeaux names that differ for the same volume.",
      "columns": ["Name", "Volume", "Standard bottles", "Where the name is used"],
      "rows": [
        ["Piccolo (quart, split)", "187.5 ml (18.75 cl) in most markets; the Champagne quart is 20 cl", "A quarter", "Champagne and sparkling wine; the single serve on aircraft and at receptions"],
        ["Demi (half bottle)", "375 ml (37.5 cl)", "A half", "Everywhere; the Loire calls it a fillette, Sauternes and Port are often sold in it"],
        ["Standard bottle", "750 ml (75 cl)", "One", "Everywhere since the EU fixed it in 1975 and the United States in 1979; the measure every count below is made in"],
        ["Litre", "1 l (100 cl)", "One and a third", "Table wine in Germany, Austria, Switzerland and Italy; rare for fine wine"],
        ["Magnum", "1.5 l (150 cl)", "Two", "Champagne, Bordeaux, Burgundy, everywhere; the format collectors prefer for slow ageing"],
        ["Marie-Jeanne", "2.25 l (225 cl)", "Three", "Bordeaux, old and rare"],
        ["Double magnum", "3 l (300 cl)", "Four", "Bordeaux; the same volume Champagne and Burgundy call a jeroboam"],
        ["Jeroboam", "3 l in Champagne and Burgundy; 5 l in Bordeaux today (4.5 l, six bottles, in older bottlings)", "Four, or six and two thirds in Bordeaux (six in the older 4.5 l)", "Champagne, Burgundy and Bordeaux, with the two meanings the exam loves to ask"],
        ["Rehoboam", "4.5 l (450 cl)", "Six", "Champagne and Burgundy; many houses no longer fill it"],
        ["Methuselah", "6 l (600 cl)", "Eight", "Champagne and Burgundy; the same volume Bordeaux calls an imperial"],
        ["Imperial", "6 l (600 cl)", "Eight", "Bordeaux"],
        ["Salmanazar", "9 l (900 cl)", "Twelve", "Champagne and Bordeaux; a case in one bottle"],
        ["Balthazar", "12 l (1,200 cl)", "Sixteen", "Champagne and Bordeaux"],
        ["Nebuchadnezzar", "15 l (1,500 cl)", "Twenty", "Champagne and Bordeaux; the largest size most houses fill"],
        ["Melchior (Solomon)", "18 l (1,800 cl)", "Twenty-four", "Bordeaux calls it Melchior, Champagne Solomon; rarely seen"],
        ["Primat and Melchizedek", "27 l and 30 l", "Thirty-six and forty", "Champagne's largest curiosities, filled by a house or two for display"],
        ["Clavelin", "620 ml (62 cl)", "About five sixths of a bottle", "Jura vin jaune only, by law: the volume said to remain of a litre after six years and three months under the veil of yeast"],
        ["Pot", "460 ml (46 cl)", "About three fifths of a bottle", "Beaujolais and the bistros of Lyon, the pot lyonnais"],
        ["Bocksbeutel", "750 ml in a flattened flask", "One", "Franken in Germany, protected in the EU for Franconian wine and a few others"]
      ],
      "notes": [
        "The biblical names run magnum, jeroboam, rehoboam, methuselah, salmanazar, balthazar, nebuchadnezzar: two, four, six, eight, twelve, sixteen, twenty bottles in Champagne.",
        "Bordeaux keeps its own names at 3 l (double magnum), 5 l (jeroboam, 4.5 l in older bottlings) and 6 l (imperial); Champagne's jeroboam is 3 l and its methuselah 6 l.",
        "Champagne is fermented in bottle only up to the jeroboam at most houses; larger sizes are usually filled from smaller bottles under pressure.",
        "A larger bottle ages more slowly because the same oxygen under the cork meets more wine; the magnum is the collector's compromise."
      ],
      "say": [
        ["jeroboam", "jerr-oh-BOH-um"],
        ["rehoboam", "ree-oh-BOH-um"],
        ["methuselah", "meh-THOO-zeh-lah"],
        ["salmanazar", "sal-mah-NAZ-ar"],
        ["balthazar", "BAL-thah-zar"],
        ["nebuchadnezzar", "neb-oo-kad-NEZ-ar"],
        ["clavelin", "klav-LAN"],
        ["Bocksbeutel", "BOKS-boy-tel"],
        ["fillette", "fee-YET"]
      ],
      "sources": [
        { "title": "Comité Champagne, the Champagne bottle sizes", "asOf": "2025" },
        { "title": "The Oxford Companion to Wine, 5th edition, entry on bottle sizes", "asOf": "2023" },
        { "title": "EU Regulation 1308/2013 and the Jura AOC decree on the clavelin", "asOf": "2013" }
      ]
    },
    {
      "key": "temperatures",
      "title": "Service temperatures",
      "line": "A range by style, why that range, and how to reach it before the guest asks.",
      "columns": ["Wine", "Serve at", "Why", "How to get there"],
      "rows": [
        ["Light sparkling (Cava, Prosecco)", "6 to 8 C (43 to 46 F), adjusted for the wine", "Chilling helps control foaming; even a cold bottle needs firm cork control", "Use the fridge or an ice and water bucket; check the actual temperature before opening"],
        ["Champagne, vintage and prestige sparkling", "8 to 10 C (46 to 50 F), adjusted for the wine", "Comité Champagne recommends this starting range; excessive chilling can conceal aroma", "Chill in ice and water or the fridge, not the freezer. Time depends on bottle size and starting temperature"],
        ["Light aromatic whites and rosé (Sauvignon Blanc, Pinot Grigio, Albariño, Provence rosé)", "7 to 10 C (45 to 50 F)", "Cold keeps the acidity crisp and the aromatics tight but present; colder than this mutes them", "Two hours in a fridge or fifteen minutes in ice water; let it rise in the glass"],
        ["Full whites (oaked Chardonnay, white Rhône, Viognier)", "10 to 13 C (50 to 55 F)", "Too cold hides the texture and the oak; too warm shows the alcohol", "Take it from the fridge twenty minutes before service, or ten minutes in ice water from the cellar"],
        ["Orange and skin-contact whites", "12 to 14 C (54 to 57 F)", "The tannin wants the warmth of a light red; cold makes it bitter", "Cellar temperature with half an hour on the table"],
        ["Sweet whites (Sauternes, Tokaji, ice wine, late harvest)", "6 to 8 C (43 to 46 F)", "Cold balances the sugar and shows the acidity; warm sweet wine is cloying", "Fifteen minutes in ice water; pour small"],
        ["Light reds (Beaujolais, Pinot Noir, Valpolicella, Frappato)", "12 to 15 C (54 to 59 F)", "Lightly chilled, the fruit and acidity lift; low tannin needs no warmth", "Ten minutes in the ice bucket or half an hour in a fridge; a cool red is a sign of care, not a mistake"],
        ["Medium reds (Chianti, Rioja, Côtes du Rhône, Merlot)", "15 to 17 C (59 to 63 F)", "Enough warmth to open the aroma, not so much that the alcohol leads", "Cellar temperature plus half an hour in the room; a warm bottle takes five minutes in ice water"],
        ["Full tannic reds (Cabernet Sauvignon, Barolo, Syrah, Zinfandel)", "16 to 18 C (61 to 64 F)", "Very cold wine can seem harsh; excessive warmth can obscure freshness and balance. Temperature changes perception, not the amount of tannin", "Check the bottle rather than waiting a fixed hour. Cool a warm red gently; avoid radiators, hot water and other sudden heat"],
        ["Fino and Manzanilla sherry", "6 to 8 C (43 to 46 F)", "Flor wines are fresh and saline and fade fast; cold keeps them bright", "Fridge; a half bottle, drunk within days of opening"],
        ["Amontillado, Palo Cortado and dry Oloroso", "10 to 14 C (50 to 57 F)", "Cool shows the nut and salt; room temperature makes them heavy", "The cellar or the fridge door"],
        ["Tawny Port and Colheita", "10 to 14 C (50 to 57 F)", "Cool shows the dried fruit and nut and cuts the sweetness", "The fridge door; a tawny keeps for weeks once open"],
        ["Ruby, LBV and Vintage Port", "16 to 18 C (61 to 64 F)", "A full red's temperature for a full red's structure; Vintage Port is decanted as well", "The cellar plus an hour in the room"],
        ["Madeira", "12 to 16 C (54 to 61 F), Sercial cool and Malmsey warmer", "The drier styles want to be cool and fresh, the sweeter styles a little warmer for their richness", "Follow the producer's serving and storage advice; date opened bottles and assess their condition before pouring"],
        ["Sake", "Chilled 8 to 15 C (46 to 59 F), room temperature 15 to 25 C (59 to 77 F), or warm 40 to 50 C (104 to 122 F), as appropriate", "The same sake changes character with temperature. The producer's guidance and the guest's preference matter more than a rule about rice polishing alone", "Follow the house method and check temperature. JSS describes both a water bath and careful microwave warming, with stirring to even the temperature"],
        ["Beer", "Lager 4 to 7 C (39 to 45 F); ales, abbey and Trappist 8 to 12 C (46 to 54 F); stout and cask ale 10 to 13 C (50 to 55 F)", "Ice cold kills the aromatics of an ale; a lager is built for cold", "A beer fridge for lager, a cellar for ale; cask ale is kept at cellar temperature by the cellar"],
        ["Spirits served neat", "Brandy and whisky at room temperature, 18 to 20 C (64 to 68 F); vodka and gin from the freezer only when asked", "Warmth opens an aged spirit; cold thickens a white one", "A tulip warmed in the hand; a chilled glass for a frozen spirit"]
      ],
      "notes": [
        "These ranges are starting points. Glass shape, pour size, room temperature and time affect warming; do not teach a fixed warming rate.",
        "Use roughly equal ice and water, with room for the bottle. Water improves contact and heat transfer; ice alone leaves insulating air gaps.",
        "Check the wine during service and use the bucket to maintain the chosen range, removing the bottle when it is getting too cold.",
        "Prepare before the seating, then measure and adjust. A fixed number of minutes cannot guarantee a bottle's serving temperature."
      ],
      "say": [
        ["Manzanilla", "man-thah-NEE-yah"],
        ["Colheita", "kol-YAY-tah"],
        ["nurukan", "noo-roo-KAHN"],
        ["atsukan", "at-soo-KAHN"]
      ],
      "sources": [
        { "title": "Court of Master Sommeliers Americas, CMS Hospitality and Service Standards", "asOf": "2023", "url": "https://www.mastersommeliers.org/wp-content/uploads/2023/12/CMS-Hospitality-Service-Standards.pdf" },
        { "title": "WSET, Ideal serving temperatures and top tips for wine storage", "asOf": "2026-10-20", "url": "https://www.wsetglobal.com/knowledge-centre/blog/2022/april/26/ideal-serving-temperatures-and-top-tips-for-wine-storage" },
        { "title": "Comité Champagne, Serving Champagne", "asOf": "2026-10-20", "url": "https://www.champagne.fr/system/files/2022-10/Serving%20Champagne.pdf" },
        { "title": "Japan Sake and Shochu Makers Association, How to Serve Sake", "asOf": "2026-10-20", "url": "https://japansake.or.jp/sake/en/basic/how-to-serve-sake/" },
        { "title": "The Oxford Companion to Wine, 5th edition, entry on serving wine", "asOf": "2023" }
      ]
    },
    {
      "key": "decanting",
      "title": "Decanting",
      "line": "Which wines, when, why, and how: sediment and air are different aims, and the guest decides.",
      "columns": ["Wine", "Decant", "When", "Why and how"],
      "rows": [
        ["Young tannic reds (Barolo, Bordeaux, Napa Cabernet, Syrah)", "Consider it after assessment", "Agree with the guest; reassess rather than prescribing a fixed hour", "Aeration changes exposure to oxygen but is not a guaranteed improvement or a way to remove tannin. Compare a small sample first"],
        ["Old reds with sediment (mature Bordeaux, Burgundy, Rioja Gran Reserva)", "Consider it to separate the deposit", "Plan from the bottle's condition; assess fragility before adding air", "Let sediment settle upright, or carry the bottle gently in a cradle. If decanting, pour steadily over a light and stop before deposit reaches the decanter. Monitor the wine as it opens"],
        ["Vintage and Crusted Port", "Usually, to separate deposit", "Let sediment settle; timing depends on maturity and condition", "Pour steadily over a light and stop before sediment enters the decanter. Follow the producer's guidance and the sommelier's plan for a fragile bottle"],
        ["Late Bottled Vintage Port", "The unfiltered, traditional bottlings yes; filtered LBV no", "Shortly before service", "A traditional LBV throws a deposit like Vintage; a filtered one is bottled ready to pour. Read the label"],
        ["Fragile old Burgundy and old Pinot Noir", "Consider careful pouring or a gentle decant", "If the wine is fragile, minimise the delay before service", "Age and grape do not prove fragility. Assess the wine and sediment with the sommelier, agree the plan and monitor its aroma rather than assuming air always harms it"],
        ["Young reductive whites (Grand Cru white Burgundy, lees-aged Chardonnay)", "Sometimes, after assessing a sample", "Monitor the sample and agree a plan", "Air may alter the aroma but cannot be promised to remove the fault. Keep the serving temperature in mind and reassess"],
        ["Natural and unfiltered wines", "Decide from condition and purpose", "After assessment, not automatically", "Unfiltered does not mean faulty or in need of air. Settled sediment may be separated; a suspended haze is not necessarily removed by decanting"],
        ["Rich mature whites and old Madeira", "Occasionally", "Follow bottle condition and producer guidance", "These are different styles. Consider sediment, fragility and aroma before choosing how much air to give; no fixed time fits both"],
        ["Sparkling wine", "Rarely, and only on request", "Just before pouring", "Some sommeliers decant very old Champagne to soften the mousse and open the nose; most of the time the mousse is the point. Say so and offer"],
        ["Light aromatic whites (Riesling, Sauvignon Blanc, Albariño)", "Usually unnecessary", "Only for a clear reason", "Preserve freshness and temperature; harmless crystals or an unusual bottle condition may call for a different approach"],
        ["Light reds (young Beaujolais, young Pinot Noir)", "Usually unnecessary", "Assess the wine first", "Aromatic freshness matters. A small comparison is more useful than automatically splashing every bottle"],
        ["Sherry, tawny Port and most fortified wines", "Usually unnecessary for filtered bottlings", "Check the particular style and bottle", "Do not call every Sherry oxidative: Fino and Manzanilla mature under flor. Some bottlings are less filtered; check for deposit and follow producer advice"],
        ["Very old wines (fifty years and more)", "Assess condition and deposit with the sommelier", "Prepare the service before opening; timing depends on the bottle", "Have a trained colleague handle a fragile cork with suitable tools. Pour gently or decant off sediment as agreed, limit unnecessary handling and monitor the wine; age alone does not set its response to air"],
        ["Any wine the guest asks about", "Ask and advise", "Before opening", "The guest decides, the sommelier advises. Never decant without agreement, and always present the original bottle, label to the host, whether or not it is decanted"]
      ],
      "notes": [
        "Agree the purpose before you start: sediment and air are different aims. Age or appellation alone decides nothing; this bottle, in this room, for this guest does.",
        "Mise en place for sediment: a decanter, a candle or torch, a serviette, an underliner for the bottle and one for the decanter, a cradle if the bottle came from its side.",
        "Keep the candle under the shoulder of the bottle, never under the label; it is there to light the neck, not to warm the wine.",
        "Taste pour from the decanter, present the bottle and the cork, and ask before clearing the bottle or the cork from the table.",
        "Separate two decisions: removing a deposit and changing air exposure. A wine can have no sediment yet merit a trial with air; neither colour nor tannin level guarantees the result."
      ],
      "say": [
        ["Durand", "doo-RAHN"],
        ["Gran Reserva", "grahn reh-SAIR-vah"],
        ["Crusted", "KRUS-tid"]
      ],
      "sources": [
        { "title": "Court of Master Sommeliers Americas, CMS Hospitality and Service Standards, the decanting standard", "asOf": "2023", "url": "https://www.mastersommeliers.org/wp-content/uploads/2023/12/CMS-Hospitality-Service-Standards.pdf" },
        { "title": "WSET, Frequently asked questions about serving and decanting wine", "asOf": "2026-10-20", "url": "https://www.wsetglobal.com/knowledge-centre/blog/2024/july/21/frequently-asked-questions-about-serving-and-decanting-wine/" },
        { "title": "Australian Wine Research Institute, volatile sulphur compounds", "asOf": "2026-10-20", "url": "https://www.awri.com.au/industry_support/winemaking_resources/storage-and-packaging/pre-packaging-preparation/removal-volatile-sulfur-compounds/" },
        { "title": "Instituto dos Vinhos do Douro e do Porto, the Port categories and their bottling", "asOf": "2026-10-20", "url": "https://www.ivdp.pt/pt/vinhos/vinhos-do-porto/introducao/" }
      ]
    },
    {
      "key": "sparkling",
      "title": "Sparkling wine service",
      "line": "The opening and the service as the practical grades them: the thumb never leaves the cork, the bottle turns and the cork sighs.",
      "columns": ["Step", "What to do", "Why", "The examiner watches for"],
      "rows": [
        ["Mise en place", "Check the bottle's temperature; for Champagne begin around 8 to 10 C. Prepare roughly equal ice and water, serviettes, an underliner and clean glasses in the house arrangement", "Chilling helps control foaming but never replaces cork control. Set glasses before the bottle arrives", "Stemware placed consistently, the temperature checked, nothing fetched mid-service"],
        ["Presentation", "Carry the bottle in the serviette or bring it in the bucket; present to the host from the right, label forward, and say the producer, the wine, the cuvée and the vintage or non-vintage; wait for the nod", "The host confirms it is the wine ordered; a wrong vintage is caught here, not after the cork", "The full name said aloud, the label never turned away, approval waited for"],
        ["The foil", "Pull the tab, or cut below the lower lip of the wire with the knife, and remove the foil whole; pocket it", "A clean lip; no shreds in the bucket or on the table", "No tearing, the bottle already angled away from the guests, the label still facing the host"],
        ["The thumb", "Before anything is loosened, put the thumb on top of the cage and cork; it stays there until the cork is out", "The pressure in the bottle is about six atmospheres; a cork that leaves early is a missile", "The thumb never leaving the cork once the wire is loosened; this is the step most often marked"],
        ["The cage", "With the thumb in place, untwist the wire six half-turns, loosen the cage and leave it on the cork; keep the bottle at thirty to forty-five degrees, pointed away from every guest, mirror and lamp", "The cage stays as a grip for the cork; the angle gives the wine surface area so it does not surge out", "The cage kept on or removed cleanly, the bottle never upright and never aimed at a person"],
        ["The cloth", "Lay the serviette over the cork and cage and grip both through it with the whole hand", "It catches a spray and a wayward cork, and it keeps the grip dry", "The cloth never covering the label; the grip firm"],
        ["The twist", "Hold the cork still and turn the bottle from its base, not the cork; the cork walks out", "Turning the cork twists it against the glass and can snap it; turning the bottle lets the pressure do the work", "The base hand turning, the cork hand still"],
        ["The sigh", "Ease the cork out so the pressure escapes with a sigh, not a pop; hold the angle a moment longer so the wine does not foam", "The quiet release keeps the carbon dioxide and the mousse in the wine, and the room undisturbed", "No pop, no foam, no spill; a pop is marked, a spill more so"],
        ["Wipe and check", "Wipe the lip inside and out with the serviette; check the cork for taint quietly if the house allows; pocket the cork and cage or present them on request", "A clean lip pours cleanly; the sommelier's check catches a corked or oxidised bottle before the guest does", "The lip wiped, the cork dealt with and never left loose on the table"],
        ["The taste pour", "Pour about 30 ml (1 oz) for the host from the right, label up, and wait for approval", "The host approves the condition of the wine before anyone else is served", "A small pour, the label towards the host, the approval heard before the next glass"],
        ["The pour in two motions", "For each guest, a first short pour so the mousse rises and settles, then a second to two thirds of the flute or the house measure; the bottle never touches the glass; twist and lift to stop the drip, wipe the lip", "The mousse would overflow a single pour; the two motions fill the glass without foam", "No drips, no overflow, even pours, the bottle held at the base or the punt, the label visible to the guest"],
        ["Order of service", "Clockwise from the host's left, the guest of honour first where the house keeps that rule, each guest from the right where the table allows, the host last", "The host tastes first and is served last: approval, then hospitality", "The order kept, no reaching across a guest, no back turned to the table"],
        ["Station the bottle", "Back into the bucket to the neck, label towards the host, a dry serviette folded across the bucket; or on an underliner if the guest prefers it on the table", "The wine stays cold and the label stays readable; the serviette is there for the next pour", "The serviette dry, the bottle label out, the bucket placed where no one trips"],
        ["Keep the table", "Notice each guest's pace, offer a top up and respect a refusal. Confirm any further bottle order and its price before opening; offer water throughout", "Attentive service includes a comfortable pace and the choice to stop", "No pressure to drink or buy; a newly approved bottle gets its own presentation and taste pour"],
        ["Throughout", "Answer theory as you pour: the grapes of Champagne, a Kir Royale spec, an aperitif suggestion; keep the hands steady and the voice calm", "The practical tests whether knowledge and hands run in parallel under pressure", "The pour never wavering while the answer comes; a missed question recovered with grace, not a frozen hand"]
      ],
      "notes": [
        "The Certified practical is a short tableside scene, about a quarter of an hour, graded on mechanics, theory under pressure and salesmanship. The examiner plays a guest; treat it as a real table.",
        "The Court's upper-level illustrative examples of 2026 name decanting, table upkeep and stemware placement as the mechanics candidates most often fell short on between 2022 and 2025; the same hands fail the same way at Certified.",
        "Six half-turns opens every cage: the wire is made that way. Count them with the thumb on.",
        "If a cork will not move, keep the thumb on, wrap the cloth tighter and rock the bottle gently; never put the bottle between the knees or point it at the ceiling light.",
        "Never fill a flute in one pour, never let the bottle rest on the rim, and never pour from the left when the right is open."
      ],
      "say": [
        ["cuvée", "koo-VAY"],
        ["mousse", "MOOSS"],
        ["muselet (the cage)", "mew-zuh-LAY"],
        ["Blanc de Blancs", "blahn duh BLAHN"],
        ["Blanc de Noirs", "blahn duh NWAHR"]
      ],
      "sources": [
        { "title": "Court of Master Sommeliers Americas, CMS Hospitality and Service Standards", "asOf": "2023", "url": "https://www.mastersommeliers.org/wp-content/uploads/2023/12/CMS-Hospitality-Service-Standards.pdf" },
        { "title": "Comité Champagne, Serving Champagne", "asOf": "2026-10-20", "url": "https://www.champagne.fr/system/files/2022-10/Serving%20Champagne.pdf" },
        { "title": "Court of Master Sommeliers Americas, 2025 Advanced and Master Sommelier Hospitality and Service Standards and Guidelines", "asOf": "2025" },
        { "title": "Court of Master Sommeliers Americas, 2026 Upper Level Hospitality and Service Illustrative Examples", "asOf": "2026" },
        { "title": "Court of Master Sommeliers Americas, Certified Sommelier Exam Guide: What to Expect", "asOf": "2023" }
      ]
    },
    {
      "key": "aperitifs",
      "title": "Aperitifs",
      "line": "The drinks a guest asks for before dinner: dry, bitter, cold and light enough to open the appetite rather than close it.",
      "columns": ["Drink", "What it is", "Serve", "Say it"],
      "rows": [
        ["Fino sherry", "Bone-dry, pale sherry from Jerez aged under flor, the veil of yeast; 15 to 17 per cent; almond, bread, salt", "Cold, 6 to 8 C, 75 ml in a copita or white wine glass; with olives and almonds; a fresh bottle, since it fades in days", "FEE-noh"],
        ["Manzanilla", "Fino aged in the sea air of Sanlúcar de Barrameda; lighter, saltier", "As Fino, colder if anything; with seafood", "man-thah-NEE-yah"],
        ["Amontillado, dry", "A Fino whose flor has died, aged on oxidatively: hazelnut, dried fruit, dry", "Cool, 10 to 13 C, 60 to 75 ml in a copita; with cured ham and consommé", "ah-mon-tee-YAH-doh"],
        ["Dry vermouth", "White wine fortified and aromatised with wormwood and herbs; the French style of Marseillan and Chambéry; 16 to 18 per cent", "Cold on ice with a lemon twist, 60 ml, or in a Martini; keep it in the fridge once open", "VER-mooth, or vair-MOOT in French"],
        ["Sweet vermouth (rosso)", "The Italian style of Turin: red, bittersweet, caramel, vanilla and bitter herbs", "On ice with an orange slice, 60 ml; the base of the Negroni, the Americano and the Manhattan", "vair-MOOT ROSS-oh"],
        ["Lillet Blanc", "An aperitif wine from Podensac near Bordeaux: Bordeaux white blended with citrus liqueurs; 17 per cent", "Cold with an orange slice, 60 to 75 ml, or with tonic; the vermouth in the Vesper", "lee-LAY BLAHN"],
        ["Campari", "The Milanese red bitter: bitter orange, gentian and herbs; the strength varies by market around 25 per cent", "With soda over ice, or in the Negroni and the Americano; 30 to 45 ml", "kam-PAH-ree"],
        ["Aperol", "A lighter orange bitter from Padua, 11 per cent; rhubarb and bitter orange", "In the Spritz: three parts Prosecco, two parts Aperol, a splash of soda, over ice in a wine glass, orange slice", "AH-peh-rol"],
        ["Negroni", "Equal parts gin, Campari and sweet vermouth, named for a Florentine count of 1919", "Stirred, over ice in a rocks glass or up; orange slice or twist", "neh-GROH-nee"],
        ["Americano", "Campari and sweet vermouth lengthened with soda, the Negroni's older and lighter cousin", "Built over ice in a highball, orange slice and lemon twist", "ah-meh-ree-KAH-noh"],
        ["Champagne and other brut sparkling", "A common aperitif choice; ask about the guest's preferred sweetness and style", "Begin Champagne around 8 to 10 C in a suitable stem. Brut and Extra Brut are options; a sweeter style can suit a guest who prefers it", "sham-PAIN; kreh-MAHN; KAH-vah"],
        ["Kir and Kir Royale", "Crème de cassis topped with Bourgogne Aligoté (Kir) or with Champagne (Royale); named for a mayor of Dijon", "About 10 ml cassis to 100 ml wine, built in a white wine glass or a flute; no garnish", "KEER; KEER roy-AL"],
        ["Pastis and absinthe", "The anise aperitifs of Marseille and the Jura: pastis at 40 to 45 per cent, sweet and liquorice; absinthe stronger, wormwood, drier", "One part to five parts cold water, poured to a cloudy louche, ice offered on the side; absinthe dripped through a sugar cube", "pass-TEESS; ab-SANT"],
        ["Pineau des Charentes", "Fresh grape must stopped with Cognac, a mistelle of the Charente; white or rosé, sweet", "Cold, 60 to 75 ml in a small wine glass; with melon or foie gras", "pee-NOH day shah-RAHNT"],
        ["Dry white wine and rosé", "Sancerre, Chablis, Muscadet, Albariño, a Provence rosé: the glass a guest asks for by the glass", "Cold, 125 to 150 ml in a white wine glass", "sahn-SAIR; shah-BLEE; moos-kah-DAY"],
        ["Dry Martini", "Gin and dry vermouth, stirred cold; dry means less vermouth, wet more, dirty with olive brine", "Up in a chilled cocktail glass with a lemon twist or an olive", "mar-TEE-nee"],
        ["Gin and tonic", "The long aperitif: a London Dry gin with tonic over plenty of ice", "In a highball or a large copa glass, 50 ml gin to 150 ml tonic, lime or lemon", "JIN and TON-ik"],
        ["Suze and the gentian bitters", "French gentian aperitifs, bitter and earthy, around 20 per cent", "On ice with a lemon twist, or lengthened with tonic or soda", "SOOZ"],
        ["Dubonnet", "An aromatised wine with quinine from 1846, red and gently sweet", "On ice with a lemon slice, or with gin", "doo-boh-NAY"],
        ["Punt e Mes", "A Turin vermouth with an extra point of bitterness, between vermouth and amaro", "On ice with orange, or in a Negroni for a darker edge", "POONT eh MESS"],
        ["Cynar", "An Italian bitter made with artichoke among its herbs, 16.5 per cent", "With soda over ice and an orange slice", "chee-NAR"],
        ["Sercial Madeira", "The driest Madeira, high in acidity, nutty and bright", "Cool, 10 to 12 C, 60 to 75 ml in a copita", "SAIR-see-al"]
      ],
      "notes": [
        "An aperitif is recommended by name, producer and a reason: dry, bitter or sparkling, cold, and light enough that dinner still tastes.",
        "The practical scores the recommendation as salesmanship: offer one, with a sentence on why, before the guest has to ask.",
        "A vermouth is a wine: it oxidises once open. Keep it in the fridge and sell it within weeks.",
        "Sherry as an aperitif is dry: Fino, Manzanilla, dry Amontillado. Cream and Pedro Ximénez belong after dinner."
      ],
      "say": [
        ["apéritif", "ah-pay-ree-TEEF"],
        ["Sanlúcar de Barrameda", "san-LOO-kar day bah-rah-MEH-dah"],
        ["Aligoté", "ah-lee-goh-TAY"],
        ["crème de cassis", "krem duh kah-SEESS"],
        ["louche", "LOOSH"],
        ["Franciacorta", "fran-chah-KOR-tah"]
      ],
      "sources": [
        { "title": "Comité Champagne, Serving Champagne", "asOf": "2026-10-20", "url": "https://www.champagne.fr/system/files/2022-10/Serving%20Champagne.pdf" },
        { "title": "The Oxford Companion to Wine, 5th edition, entries on sherry, vermouth and aperitif", "asOf": "2023" },
        { "title": "Consejo Regulador, Jerez-Xérès-Sherry and Manzanilla-Sanlúcar de Barrameda, the styles of sherry", "asOf": "2025" },
        { "title": "EU Regulation 251/2014 on aromatised wine products", "asOf": "2014" }
      ]
    },
    {
      "key": "digestifs",
      "title": "Digestifs",
      "line": "What a guest drinks after dinner, with the age terms the exam asks and the way each is poured.",
      "columns": ["Drink", "What it is", "Serve", "Say it"],
      "rows": [
        ["Cognac", "Grape brandy of the Charente, mostly Ugni Blanc, double distilled in copper Charentais pot stills and aged in Limousin or Tronçais oak. VS at least two years, VSOP four, Napoléon six, XO ten (since April 2018), XXO fourteen. Crus from the centre out: Grande Champagne, Petite Champagne (Fine Champagne is a blend of the two), Borderies, Fins Bois, Bons Bois, Bois Ordinaires", "30 to 45 ml (1 to 1.5 oz) neat at room temperature in a small tulip or snifter; never warmed over a flame", "KON-yak; grahnd shahm-PAHN-yuh"],
        ["Armagnac", "Gascony's brandy: Ugni Blanc, Baco, Folle Blanche and Colombard, usually distilled once in the continuous alambic armagnacais to a lower strength, so it keeps more of the grape; Bas-Armagnac, Ténarèze and Haut-Armagnac. Vintages are common. VS at least one year, VSOP four, Napoléon six, XO and Hors d'âge ten (since April 2018)", "As Cognac: 30 to 45 ml neat in a tulip", "ar-man-YAK; bah zar-man-YAK; tay-nah-REZ"],
        ["Calvados", "Apple brandy of Normandy, with some pear. Calvados AOC (column or pot still), Calvados Pays d'Auge (double distilled in a pot still), Calvados Domfrontais (at least thirty per cent pear, column). Fine or VS two years, Vieux or Réserve three, VO or Vieille Réserve four, XO or Hors d'âge six", "30 to 45 ml neat; also the trou normand, a small glass between courses", "KAL-vah-dohss; pay-ee DOHZH; dom-fron-TAY"],
        ["Grappa", "Italy's pomace brandy, distilled from the grape skins left after pressing; monovitigno from one grape, invecchiata and riserva aged in wood", "Young and white: cold, 8 to 10 C, 30 ml in a narrow tulip. Aged: room temperature", "GRAHP-pah; moh-noh-VEE-teen-yoh"],
        ["Marc", "France's pomace brandy: Marc de Bourgogne, Marc de Champagne, Marc d'Alsace Gewurztraminer", "30 ml neat, young ones cool, aged ones at room temperature", "MAR; mar duh boor-GON-yuh"],
        ["Eaux-de-vie of fruit", "Colourless unaged fruit brandies of Alsace, the Black Forest and the Alps, 40 to 45 per cent: kirsch (cherry), poire Williams (pear), framboise (raspberry), mirabelle and quetsch (plums), slivovitz (plum, eastern Europe)", "Cold, 30 ml in a small tulip; the glass chilled, the spirit from the fridge", "oh duh VEE; KEERSH; pwahr wil-YAMS; frahm-BWAHZ; mee-rah-BELL; KVETCH"],
        ["Amaro", "Italy's bitter herbal liqueurs: Fernet-Branca (very bitter, 39 per cent), Montenegro (lighter, orange), Averna (Sicilian, sweeter), Nonino (grappa-based), Ramazzotti, Cynar", "45 ml neat at room temperature or over ice, with or without an orange twist", "ah-MAH-roh; fair-NET BRAHN-kah; ah-VAIR-nah; noh-NEE-noh"],
        ["Chartreuse", "The liqueur of the Carthusian monks, made to a recipe of 1605 and distilled since 1737 from 130 plants: Green at 55 per cent, Yellow at 40 per cent, sweeter; VEP aged longer", "30 ml chilled or on ice; Green is also a digestif in a sugared coffee in the Alps", "shar-TRUHZ; vay-uh-PAY"],
        ["Bénédictine", "A herbal liqueur of Fécamp in Normandy, honeyed and spiced, 40 per cent; with brandy it is B and B", "30 ml neat or on ice; a teaspoon in the Vieux Carré", "bay-nay-dik-TEEN; fay-KAHM"],
        ["Orange liqueurs", "Cointreau (a triple sec from Angers, 40 per cent), Grand Marnier (Cognac and bitter orange, 40 per cent), curaçao", "30 ml neat or on ice; Grand Marnier gently warmed in a snifter; both live in the Margarita and the Sidecar", "KWAN-troh; grahn mar-NYAY; KYOOR-ah-soh"],
        ["Sambuca", "The anise liqueur of Italy, 38 to 42 per cent", "Neat with three coffee beans, con la mosca, for health, wealth and happiness", "sam-BOO-kah; kon lah MOSS-kah"],
        ["Limoncello", "The lemon liqueur of the Amalfi coast and Sorrento, about 30 per cent", "Ice cold from the freezer, 30 ml in a small chilled glass", "lee-mon-CHELL-oh"],
        ["Vintage Port", "The Port of a single declared year, bottled unfiltered after two years in wood and aged in bottle for decades", "Decanted off its crust; 60 to 75 ml (2 to 2.5 oz) at 16 to 18 C in a Port glass; with Stilton and walnuts", "PORT; KIN-tah for quinta"],
        ["Tawny Port with an age statement", "Wood aged blends approved by IVDP with indications of ten, twenty, thirty, forty or fifty years. The indication describes the approved character of the blend, not a vintage or the age of every component. Colheita comes from one harvest", "Cool, around 10 to 14 C, to the house measure; usually no decanting. Date opened bottles and follow producer storage guidance", "TAW-nee; kol-YAY-tah"],
        ["Madeira", "The fortified wine of the island, heated and oxidised on purpose: Sercial dry, Verdelho medium dry, Bual medium sweet, Malmsey sweet. Its durability does not replace sound storage or checking an opened bottle", "60 to 75 ml at 14 to 16 C in a copita; with almond cake or alone", "mah-DEER-ah; BOO-al; MALM-zee; vair-DEL-yoh"],
        ["Sweet sherry", "Pedro Ximénez (sun-dried grapes, black, raisin and treacle), Cream (a sweetened Oloroso), Moscatel", "Pedro Ximénez at about 12 C, 60 ml in a copita, over vanilla ice cream or with blue cheese", "PEH-droh hee-MEH-neth; oh-loh-ROH-soh"],
        ["Scotch single malt", "Whisky from malted barley at one Scottish distillery, pot distilled, at least three years in oak; the regions Highland, Lowland, Speyside, Islay and Campbeltown", "30 to 45 ml neat in a tulip, water on the side, never ice unless asked", "SKOTCH; EYE-lah; SPAY-side"],
        ["Bourbon and rye", "American whiskeys from at least 51 per cent corn or 51 per cent rye, aged in new charred oak", "30 to 45 ml neat, or over one large cube when asked", "BUR-bun; RYE"],
        ["Irish whiskey", "Whiskey of Ireland, often triple distilled and smooth, at least three years in wood; single pot still uses malted and unmalted barley", "30 to 45 ml neat; Irish coffee after a cold night", "EYE-rish WHIS-kee"],
        ["Aged rum and rhum agricole vieux", "Cane spirit aged in oak: molasses rums of Jamaica, Barbados and Guyana, and the cane-juice rhum of Martinique aged three years and more", "30 to 45 ml neat in a tulip", "RUM; rum ah-gree-KOL VYUH"],
        ["Añejo tequila and mezcal", "Tequila añejo aged one to three years in oak; mezcal joven or reposado, smoky from the roasting pit", "30 to 45 ml neat in a small copita or veladora; mezcal with an orange slice and sal de gusano", "ah-NYEH-hoh teh-KEE-lah; mess-KAL; sal day goo-SAH-noh"],
        ["Vin Santo", "Tuscany's dried-grape wine, aged for years in small sealed casks, amber and nutty", "60 to 75 ml at 12 to 14 C with cantucci to dip", "veen SAHN-toh; kan-TOO-chee"],
        ["Sauternes and the sweet wines", "Botrytised Sémillon from Bordeaux; Tokaji Aszú, Beerenauslese, ice wine and late harvest wines stand with it", "60 to 90 ml (2 to 3 oz) at 6 to 8 C in a small glass; with Roquefort, foie gras or alone as the dessert", "soh-TAIRN; toh-KYE ah-SOO"]
      ],
      "notes": [
        "Cognac and Armagnac age statements count the youngest spirit in the blend, never the oldest.",
        "A digestif is recommended as the aperitif was: by name, with the reason, and with the glass it belongs in. Offer it with the dessert menu, not after the coffee has cooled.",
        "Pour a digestif small and neat unless asked otherwise; ice and warming are the guest's call. The snifter over a flame is theatre the houses now discourage.",
        "The Cognac and Armagnac bureaux moved the XO minimum from six years to ten on 1 April 2018; older study notes still say six."
      ],
      "say": [
        ["digestif", "dee-zhess-TEEF"],
        ["Ugni Blanc", "oo-NYEE BLAHN"],
        ["Folle Blanche", "fol BLAHNSH"],
        ["Hors d'âge", "or DAHZH"],
        ["Limousin", "lee-moo-ZAN"],
        ["Tronçais", "tron-SAY"],
        ["trou normand", "troo nor-MAHN"]
      ],
      "sources": [
        { "title": "Bureau National Interprofessionnel du Cognac, the age categories of Cognac (VS, VSOP, XO, XXO)", "asOf": "2026-10-11" },
        { "title": "Bureau National Interprofessionnel de l'Armagnac, the age categories of Armagnac", "asOf": "2026-10-11" },
        { "title": "Interprofession des Appellations Cidricoles, the three Calvados appellations and their age terms", "asOf": "2025" },
        { "title": "Instituto dos Vinhos do Douro e do Porto, Portuguese definitions and age indications including fifty years", "asOf": "2026-10-20", "url": "https://www.ivdp.pt/pt/comunicacao/guias-tematicos/enologia-e-praticas-enologicas/guia-enologia-e-praticas-enologicas/capitulo-1-definicoes/" },
        { "title": "The Oxford Companion to Spirits and Cocktails", "asOf": "2021" }
      ]
    },
    {
      "key": "spirits",
      "title": "Spirits",
      "line": "The categories the exam asks: what each is made from, where and how, and the styles a server should be able to name.",
      "columns": ["Spirit", "Made from", "Where and how", "Styles to know"],
      "rows": [
        ["Vodka", "Any agricultural raw material: wheat, rye, potato, grape, sugar beet, maize", "Poland, Russia, Sweden, Finland, France and everywhere; distilled to near neutrality in column stills, often charcoal filtered, bottled at 37.5 per cent minimum in the EU and 40 in the United States", "Polish rye and potato, Russian wheat, Swedish wheat, French grape; flavoured vodkas such as the bison grass of Poland; the base of the Martini when asked, the Cosmopolitan, the Moscow Mule and the Espresso Martini"],
        ["Gin", "Neutral grain spirit redistilled or compounded with botanicals, juniper first; coriander, angelica, citrus peel, orris root", "England, Scotland, the Netherlands and now everywhere; London Dry is distilled with its botanicals and takes only water and a trace of sugar afterwards", "London Dry (dry, juniper-led), Plymouth (softer, from one city), Old Tom (lightly sweetened), genever (the Dutch and Belgian original on a malt wine base, jonge and oude), Navy strength at 57 per cent; sloe gin is a liqueur"],
        ["Rum", "Sugar cane: molasses for most, fresh cane juice for rhum agricole and cachaça", "The Caribbean, Latin America and beyond; pot stills for weight, column stills for lightness; aged in ex-bourbon casks in a hot climate that ages it fast", "Light Spanish-style (Cuba, Puerto Rico), golden and dark English-style (Jamaica's pot-still esters, Barbados, Guyana's Demerara), French-style rhum agricole (Martinique AOC, from cane juice), cachaça (Brazil, cane juice), spiced rum is flavoured"],
        ["Tequila", "At least 51 per cent blue Weber agave; the best say 100 per cent agave on the label", "Jalisco and parts of four other Mexican states; the piñas cooked in ovens or autoclaves, crushed, fermented and distilled twice; a denomination of origin", "Blanco (unaged or under two months), Joven or Gold (blended or coloured), Reposado (two months to under a year in oak), Añejo (one to three years), Extra Añejo (over three years); Cristalino is an aged tequila filtered clear; the Margarita and the Paloma"],
        ["Mezcal", "Any of many agave species, Espadín most of all; Tobalá and Tepeztate are wild and prized", "Oaxaca above all, with a handful of other states under the denomination; the piñas roasted in earth pits (the smoke), crushed by a tahona, fermented in open vats, distilled in copper or clay", "Joven, Reposado and Añejo as for tequila; the categories Mezcal, Artesanal and Ancestral by method; served with orange and sal de gusano; the worm is a gimmick, never a rule"],
        ["Scotch whisky", "Malted barley for malt whisky; wheat or maize with some malt for grain whisky; water and yeast and nothing else", "Scotland only, by the regulations of 2009: pot stills for malt, column stills for grain, at least three years in oak casks of no more than 700 litres, bottled at 40 per cent minimum; peat smoke from drying the malt in Islay and elsewhere", "Single malt (one distillery, malt, pot still), single grain, blended malt, blended grain and blended Scotch; the five regions Highland, Lowland, Speyside, Islay and Campbeltown; no e in whisky"],
        ["Irish whiskey", "Malted and unmalted barley, and grain", "Ireland, often triple distilled, at least three years in wood", "Single pot still (malted and unmalted barley in one pot still, Ireland's own style), single malt, single grain and blended; spelled with an e"],
        ["Bourbon", "A mash of at least 51 per cent corn with rye or wheat and malted barley", "The United States, any state, Kentucky most of all; distilled to no more than 80 per cent, put into new charred oak at no more than 62.5 per cent, bottled at 40 per cent minimum, with nothing added but water", "Straight bourbon (two years and more, the age stated under four); bottled in bond (one distillery, one season, four years, 50 per cent); wheated bourbon; Tennessee whiskey is bourbon by recipe filtered through maple charcoal before the barrel"],
        ["Rye and the other American whiskeys", "At least 51 per cent rye for rye whiskey; at least 51 per cent of the named grain for wheat, malt and corn whiskey", "The United States, under the same new charred oak rule as bourbon, except corn whiskey", "Straight rye, the spice behind the Manhattan, the Sazerac and the Old Fashioned; Canadian whisky is called rye by habit and need not be made of it, aged three years"],
        ["Japanese whisky", "Malted barley and grain, in the Scottish image, since the 1920s", "Japan; pot stills for malt, column for grain; an industry standard of 2021, in force from 2024, now says what may be labelled Japanese whisky", "Single malt and blended; the houses blend many styles from one distillery rather than trading casks as Scotland does"],
        ["Cognac and Armagnac", "White grapes, Ugni Blanc above all", "The Charente and Gascony; Cognac double distilled in pot stills, Armagnac mostly once in a column; both aged in French oak with the age terms of the digestifs table", "VS, VSOP, XO and XXO; the six Cognac crus; Armagnac vintages; Fine Champagne"],
        ["Other grape brandies", "Grapes, or in pisco's case specific grape varieties", "Brandy de Jerez aged in sherry casks by solera; pisco in Peru (unaged, from eight permitted grapes, pot distilled to bottling strength) and in Chile (may be aged); American and South African brandy", "Brandy de Jerez Solera, Reserva and Gran Reserva; pisco puro, acholado and mosto verde; the Pisco Sour"],
        ["Fruit brandies", "Apples and pears for Calvados; cherries, pears, raspberries and plums for the eaux-de-vie of Alsace and central Europe", "Normandy, Alsace, the Black Forest, the Alps and the Balkans; pot stilled and bottled white, or aged in oak for Calvados", "Calvados Pays d'Auge, kirsch, poire Williams, framboise, mirabelle, slivovitz, palinka"],
        ["Pomace brandies", "The skins, seeds and stems left after pressing", "Grappa in Italy, marc in France, orujo in Spain, bagaceira in Portugal; pot or column stilled", "Grappa monovitigno and invecchiata; Marc de Bourgogne and Marc de Champagne"],
        ["Anise spirits", "Neutral spirit with anise, star anise, liquorice and, in absinthe, wormwood", "Marseille for pastis, the Jura and Switzerland for absinthe, Greece for ouzo, Turkey for raki, Italy for sambuca", "Pastis louched with water; absinthe at 45 to 70 per cent through a sugar cube; ouzo with ice; the Sazerac's rinse"],
        ["Liqueurs", "A spirit sweetened and flavoured with fruit, herbs, nuts, cream or coffee; at least 100 grams of sugar a litre in the EU", "Everywhere: Cointreau, Grand Marnier, Chartreuse, Bénédictine, crème de cassis, maraschino, amaretto, coffee liqueur, Irish cream", "Triple sec and curaçao for the Margarita and the Sidecar; cassis for the Kir; maraschino for the Hemingway Daiquiri; coffee liqueur for the Espresso Martini"],
        ["The spirits of Asia", "Sorghum for baijiu; sweet potato, barley, rice or buckwheat for shochu; rice for soju and awamori", "China's baijiu at 40 to 60 per cent; Japan's shochu at about 25 per cent, single distilled honkaku; Korea's soju, often diluted", "Baijiu's aroma types (strong, light, sauce); honkaku shochu neat, on the rocks or with hot water; soju cold"],
        ["Aquavit", "Neutral spirit flavoured with caraway or dill", "Scandinavia; Norway's linie aquavit crosses the equator in sherry casks", "Cold with herring and crayfish, or at room temperature when aged"]
      ],
      "notes": [
        "Bourbon's oak is new and charred every time; the used barrels go on to Scotland, Ireland, Mexico and the rum islands.",
        "Shake a drink with juice, cream or egg; stir a drink that is spirits only. The rule is about texture and clarity, and the exam asks why.",
        "A spirit called by its base at the table: gin is juniper, tequila is agave, rum is cane, whisky is grain, brandy is fruit. Say the base and the country and the guest hears a sommelier.",
        "Nothing here states a current producer, owner or price; brand names are given only where the brand is the category's own name on a menu."
      ],
      "say": [
        ["agave", "ah-GAH-vay"],
        ["mezcal", "mess-KAL"],
        ["reposado", "reh-poh-SAH-doh"],
        ["añejo", "ah-NYEH-hoh"],
        ["genever", "juh-NEE-ver"],
        ["cachaça", "kah-SHAH-sah"],
        ["rhum agricole", "rum ah-gree-KOL"],
        ["pisco", "PEESS-koh"],
        ["baijiu", "BY-jee-oh"],
        ["shochu", "SHOH-choo"],
        ["aquavit", "AK-wah-veet"]
      ],
      "sources": [
        { "title": "Regulation (EU) 2019/787 on the definition, description, presentation and labelling of spirit drinks", "asOf": "2019" },
        { "title": "The Scotch Whisky Regulations 2009", "asOf": "2009" },
        { "title": "United States Code of Federal Regulations, Title 27, Part 5, Standards of Identity for Distilled Spirits", "asOf": "2022" },
        { "title": "NOM-006-SCFI-2012 (Tequila) and NOM-070-SCFI-2016 (Mezcal), the Mexican official standards", "asOf": "2016" },
        { "title": "Japan Spirits and Liqueurs Makers Association, labelling standard for Japanese whisky", "asOf": "2024" },
        { "title": "The Oxford Companion to Spirits and Cocktails", "asOf": "2021" }
      ]
    },
    {
      "key": "cocktails",
      "title": "Classic cocktails",
      "line": "The drinks the service practical and the theory paper ask for by heart: the spec, the method and the glass, the garnish.",
      "columns": ["Cocktail", "Spec", "Method and glass", "Garnish"],
      "rows": [
        ["Dry Martini", "60 ml gin (2 oz), 10 to 15 ml dry vermouth (a third to a half oz); vodka only when asked; dry means less vermouth, wet more, dirty adds a spoon of olive brine", "Stir with ice for about twenty seconds, strain up into a chilled cocktail glass or coupe", "A lemon twist or an olive; a cocktail onion makes it a Gibson"],
        ["Vesper", "60 ml gin, 20 ml vodka, 10 ml Lillet Blanc", "Shaken as the novel says, stirred in most houses; up in a chilled coupe", "A wide lemon twist"],
        ["Manhattan", "60 ml rye (2 oz), 30 ml sweet vermouth (1 oz), two dashes of Angostura bitters; a Perfect takes half dry and half sweet vermouth, a Dry takes dry vermouth alone", "Stir with ice, strain up into a coupe or Nick and Nora", "A brandied cherry; a lemon twist on a Dry Manhattan"],
        ["Rob Roy", "60 ml Scotch whisky, 30 ml sweet vermouth, a dash of Angostura", "Stir with ice, strain up into a coupe; the Manhattan made with Scotch", "A cherry or a lemon twist"],
        ["Old Fashioned", "60 ml bourbon or rye, a sugar cube or 10 ml sugar syrup, two dashes of Angostura bitters, a splash of water", "Muddle the sugar with the bitters and water, add the whiskey and ice, stir in the glass; a rocks glass over one large cube", "An orange twist expressed over the drink; many houses add a cherry"],
        ["Sazerac", "60 ml rye whiskey (the original took Cognac), a sugar cube or 10 ml syrup, three dashes of Peychaud's bitters, a rinse of absinthe or Herbsaint", "Stir the whiskey, sugar and bitters with ice; strain into a chilled rocks glass rinsed with absinthe and holding no ice", "A lemon twist expressed over the glass and, in New Orleans, left out of it"],
        ["Vieux Carré", "30 ml rye, 30 ml Cognac, 30 ml sweet vermouth, a bar spoon of Bénédictine, a dash each of Angostura and Peychaud's", "Stir with ice; serve over ice in a rocks glass or strain up; born in the French Quarter in the 1930s", "A lemon twist or a cherry"],
        ["Negroni", "30 ml each of gin, Campari and sweet vermouth (1 oz each), equal parts", "Stir with ice, serve over ice in a rocks glass or strain up", "An orange slice or twist"],
        ["Boulevardier", "45 ml bourbon, 30 ml Campari, 30 ml sweet vermouth; the Negroni with whiskey in place of gin", "Stir with ice; over ice in a rocks glass or up in a coupe", "An orange twist"],
        ["Americano", "30 ml Campari, 30 ml sweet vermouth, topped with soda", "Build over ice in a highball, stir once", "An orange slice and a lemon twist"],
        ["Daiquiri", "60 ml white rum (2 oz), 25 ml lime juice, 15 ml sugar syrup; the Hemingway drops the sugar for grapefruit juice and maraschino", "Shake hard with ice, double strain up into a chilled coupe", "A lime wheel, or nothing"],
        ["Margarita", "50 ml blanco tequila (100 per cent agave), 25 ml lime juice, 20 ml Cointreau or triple sec; Tommy's takes agave syrup in place of the orange liqueur", "Shake with ice; up in a coupe or over ice in a rocks glass, the rim salted on one side only so the guest can choose", "A lime wheel and the half salt rim"],
        ["Paloma", "50 ml blanco tequila, 15 ml lime juice, topped with grapefruit soda; a pinch of salt", "Build over ice in a highball; salt rim if asked", "A grapefruit or lime wedge"],
        ["Whisky Sour", "60 ml bourbon (2 oz), 30 ml lemon juice, 20 ml sugar syrup, half an egg white where the house serves it", "Dry shake without ice to whip the white, shake again with ice, strain over fresh ice in a rocks glass or up in a coupe", "A cherry and an orange slice, or three drops of Angostura on the foam"],
        ["Pisco Sour", "60 ml pisco, 30 ml lime juice, 20 ml sugar syrup, an egg white", "Dry shake, then shake with ice, strain up into a coupe or a small rocks glass", "Three drops of Angostura on the foam"],
        ["Sidecar", "50 ml Cognac (or Armagnac), 20 ml Cointreau, 20 ml lemon juice; the Savoy gave equal parts", "Shake with ice, strain up into a coupe, half the rim sugared if the house does", "An orange twist"],
        ["Mojito", "45 ml white rum, 20 ml lime juice, 15 ml sugar syrup or two teaspoons of sugar, six to eight mint leaves, topped with soda", "Press the mint gently with the sugar and lime in a highball (never shred it), add the rum, fill with crushed ice, top with soda and churn", "A mint sprig slapped awake and a lime wedge"],
        ["Caipirinha", "60 ml cachaça, half a lime cut in wedges, two teaspoons of sugar", "Muddle the lime and sugar in a rocks glass, add the cachaça and crushed ice, stir", "The lime wedges themselves"],
        ["Mai Tai", "30 ml aged Jamaican rum, 30 ml Martinique rhum, 15 ml orange curaçao, 15 ml orgeat, 30 ml lime juice", "Shake with crushed ice, pour unstrained into a rocks glass; the 1944 original, not the pineapple version", "A mint sprig and the spent lime shell"],
        ["Piña Colada", "50 ml white or golden rum, 30 ml coconut cream, 50 ml pineapple juice", "Shake or blend with ice, serve in a hurricane glass or highball", "A pineapple wedge and a cherry"],
        ["Hurricane", "30 ml light rum, 30 ml dark rum, 30 ml passion fruit syrup, 15 ml lime juice, 30 ml orange juice; specs vary by house", "Shake with ice, serve over ice in a hurricane glass; a New Orleans drink of the 1940s", "An orange slice and a cherry"],
        ["Brandy Milk Punch", "60 ml brandy, 120 ml milk, 15 ml sugar syrup, a drop of vanilla; a New Orleans brunch drink", "Shake hard with ice, strain over ice in a highball or up in a wine glass", "Grated nutmeg"],
        ["Mint Julep", "60 ml bourbon, 10 ml sugar syrup, eight mint leaves", "Press the mint gently in a julep cup with the syrup, add the bourbon, pack with crushed ice and stir until the cup frosts", "A bouquet of mint and a straw cut short"],
        ["Cosmopolitan", "40 ml citrus vodka, 15 ml Cointreau, 15 ml lime juice, 30 ml cranberry juice", "Shake with ice, strain up into a cocktail glass", "An orange twist, often flamed, or a lime wheel"],
        ["Espresso Martini", "50 ml vodka, 30 ml fresh espresso, 15 ml coffee liqueur, 10 ml sugar syrup", "Shake hard with ice so the crema foams, double strain up into a coupe", "Three coffee beans on the foam"],
        ["Moscow Mule", "45 ml vodka, 15 ml lime juice, topped with ginger beer", "Build over ice in a copper mug or highball", "A lime wedge and a mint sprig"],
        ["Tom Collins", "45 ml gin, 30 ml lemon juice, 15 ml sugar syrup, topped with soda", "Shake the first three with ice, strain into a highball over ice, top with soda", "A lemon slice and a cherry"],
        ["Ramos Gin Fizz", "45 ml gin, 15 ml lemon juice, 15 ml lime juice, 30 ml sugar syrup, 60 ml cream, an egg white, three drops of orange flower water, a splash of soda", "Dry shake long and hard, shake again with ice, strain into a chilled highball with no ice and lift the foam with a little soda; a New Orleans drink of 1888", "None; the foam is the garnish"],
        ["Bloody Mary", "45 ml vodka, 90 ml tomato juice, 15 ml lemon juice, Worcestershire sauce, hot sauce, salt and pepper", "Roll between two tins with ice rather than shaking, serve over ice in a highball", "A celery stick and a lemon wedge; the rim salted if asked"],
        ["Gimlet", "60 ml gin, 20 ml lime cordial; or 20 ml lime juice and 10 ml sugar syrup", "Stir with the cordial, shake with fresh lime; up in a coupe", "A lime wheel"],
        ["French 75", "30 ml gin (in New Orleans often Cognac), 15 ml lemon juice, 10 ml sugar syrup, topped with 60 ml Champagne", "Shake the first three with ice, strain into a flute, top with Champagne", "A lemon twist"],
        ["Champagne Cocktail", "A sugar cube soaked in Angostura bitters, 15 ml Cognac, topped with Champagne", "Drop the cube into a flute, add the Cognac, top slowly with Champagne", "A lemon twist"],
        ["Bellini", "50 ml white peach purée, 100 ml Prosecco", "Build in a flute, purée first, the Prosecco poured slowly and stirred once; Venice, 1948", "None"],
        ["Mimosa", "Equal parts orange juice and Champagne or sparkling wine; the Buck's Fizz takes two parts fizz to one of juice", "Build in a flute, juice first, no ice", "None, or an orange twist"],
        ["Kir Royale", "10 to 15 ml crème de cassis topped with about 100 ml Champagne; a Kir takes Bourgogne Aligoté", "Build in a flute, cassis first, the wine poured slowly", "None"],
        ["Aperol Spritz", "90 ml Prosecco, 60 ml Aperol, 30 ml soda (3, 2, 1)", "Build over ice in a large wine glass, Prosecco first so the Aperol does not sink in a lump", "An orange slice"],
        ["Irish Coffee", "40 ml Irish whiskey, 120 ml hot filter coffee, two teaspoons of brown sugar, lightly whipped cream", "Build in a warmed stemmed glass: dissolve the sugar in the coffee, add the whiskey, float the cream over the back of a spoon", "None; the cream is the garnish and the coffee is drunk through it"]
      ],
      "notes": [
        "Shake a drink that holds juice, dairy or egg; stir one that is spirits and fortified wine alone. Shaking chills, dilutes and aerates; stirring chills and dilutes and keeps the drink clear and silky.",
        "Up means chilled and strained into a stemmed glass with no ice; on the rocks means over ice; neat means from the bottle at room temperature with nothing added.",
        "A twist is expressed: the peel squeezed skin side down over the drink so the oils land on the surface, then dropped in or rested on the rim.",
        "The exam asks for a classic by spec, method, glass and garnish in one breath. Say the spirit first, then the modifiers, then the method and the glass, then the garnish.",
        "The measures here are the common modern specs; the house spec wins at the house's own bar.",
        "Two New Orleans drinks the city's tables expect a server to know cold: the Sazerac and the Ramos Gin Fizz."
      ],
      "say": [
        ["Sazerac", "SAZ-uh-rak"],
        ["Peychaud's", "PAY-shohz"],
        ["Herbsaint", "ERB-saint"],
        ["Vieux Carré", "vyuh kah-RAY"],
        ["Ramos", "RAY-mohss"],
        ["Daiquiri", "DAK-uh-ree"],
        ["Mojito", "moh-HEE-toh"],
        ["Caipirinha", "ky-pee-REEN-yah"],
        ["Negroni", "neh-GROH-nee"],
        ["Boulevardier", "boo-luh-var-DYAY"],
        ["Bellini", "beh-LEE-nee"],
        ["Piña Colada", "PEEN-yah koh-LAH-dah"],
        ["Paloma", "pah-LOH-mah"],
        ["Mai Tai", "MY TYE"],
        ["orgeat", "or-ZHAH"],
        ["curaçao", "KYOOR-ah-soh"],
        ["maraschino", "mar-ah-SKEE-noh"]
      ],
      "sources": [
        { "title": "International Bartenders Association, the IBA official cocktails", "asOf": "2024" },
        { "title": "The Oxford Companion to Spirits and Cocktails", "asOf": "2021" },
        { "title": "The Savoy Cocktail Book", "asOf": "1930" },
        { "title": "Court of Master Sommeliers Americas, Certified Sommelier Exam Guide: What to Expect", "asOf": "2023" }
      ]
    }
  ],
  "cards": [
    { "f": "Cork taint: the compound and what it smells of", "b": "2,4,6-trichloroanisole, TCA, from mould meeting chlorine in cork, barrels or cardboard. Damp cardboard, wet dog, a musty cellar; at low levels it only mutes the fruit. Replace the bottle, no argument." },
    { "f": "Reduction: what blows off and what does not", "b": "Air may change a sample, but the aroma alone cannot identify the compound or guarantee a cure. Consult the sommelier and resolve a faulty bottle without making the guest wait for a promised recovery." },
    { "f": "Volatile acidity: the smell and the line", "b": "Nail varnish and vinegar, from acetic acid and ethyl acetate. A trace lifts Amarone, Sauternes and some natural wines; vinegar that dries and shortens the finish is a fault." },
    { "f": "Brettanomyces: the smells and the rule", "b": "Barnyard, horse blanket, sticking plaster, clove, smoked meat. Low levels are tolerated in some reds; stop pouring when it masks the fruit. It does not blow off." },
    { "f": "Crystals, sediment and haze: what needs checking", "b": "Tartrate crystals and normal sediment are harmless. Some styles intentionally retain haze, but unexpected cloudiness needs checking. Natural or unfiltered is not proof of soundness; consult the sommelier rather than diagnosing from appearance." },
    { "f": "Light strike: the cause and the bottles at risk", "b": "Ultraviolet and blue light turn riboflavin into sulphur compounds: cooked cabbage, wet wool, skunk. Clear and green glass under a lamp; Champagne and rosé in clear bottles most of all. No cure." },
    { "f": "The ISO tasting glass: size and pour", "b": "The 1977 standard: 215 ml capacity, about 155 mm tall, a bowl tapering to a narrow rim. The tasting pour is 50 ml." },
    { "f": "Flute or tulip for Champagne: which and why", "b": "The flute holds the mousse and shows the bead; the tulip widens then tapers and gives the nose room. Vintage, prestige and grower wines show best in the tulip." },
    { "f": "Glasses from a bottle at 150 ml and at 125 ml", "b": "Five glasses at 150 ml (5 oz), six at 125 ml. A pour is a volume, never a height; a table of eight needs two bottles for one round." },
    { "f": "The biblical bottle sizes in order, with their bottle counts", "b": "Magnum two, jeroboam four, rehoboam six, methuselah eight, salmanazar twelve, balthazar sixteen, nebuchadnezzar twenty: 1.5, 3, 4.5, 6, 9, 12 and 15 litres in Champagne." },
    { "f": "Jeroboam: the two volumes", "b": "Three litres (four bottles) in Champagne and Burgundy. In Bordeaux five litres today, 4.5 litres (six bottles) in older bottlings; there the three litre bottle is the double magnum." },
    { "f": "The clavelin: volume and the one wine it holds", "b": "620 ml, by law for Jura vin jaune alone: what is said to remain of a litre after six years and three months under the veil of yeast." },
    { "f": "Sparkling wine: serve at, and how to get there", "b": "Champagne: begin around 8 to 10 C (46 to 50 F). Light sparkling may suit 6 to 8 C. Use a fridge or ice and water; check temperature rather than relying on a fixed time." },
    { "f": "Full tannic reds: serve at, and why", "b": "Begin around 16 to 18 C (61 to 64 F). Too cold can seem harsh; too warm can lose freshness. Measure and adjust gently. Serving temperature changes perception, not the quantity of tannin." },
    { "f": "Light reds: serve at, and how", "b": "12 to 15 C (54 to 59 F), lightly chilled: Beaujolais, Pinot Noir, Valpolicella. Ten minutes in the ice bucket. A cool red is a sign of care, not a mistake." },
    { "f": "Fino and tawny: serve at", "b": "Fino and Manzanilla cold, 6 to 8 C, from a fresh bottle. Tawny and Colheita cool, 10 to 14 C, from the fridge door; a tawny keeps for weeks once open." },
    { "f": "Decanting for air and decanting for sediment", "b": "Sediment: pour steadily over a light and stop before the deposit. Air: assess a sample, agree a plan and reassess. Neither a fixed hour nor a particular grape guarantees improvement." },
    { "f": "Vintage Port and tawny Port: decant or not", "b": "Vintage and Crusted Port commonly need sediment removed. Filtered tawny and Colheita usually do not. Check the actual bottle and producer guidance; maturity and condition determine timing, rather than always or never." },
    { "f": "Where the candle goes when decanting", "b": "Under the shoulder of the bottle, never under the label: it is there to light the neck so the sediment shows, not to warm the wine. Stop when the deposit reaches the neck." },
    { "f": "Sparkling wine: the thumb rule", "b": "The thumb goes on the cage and cork before the wire is loosened and never leaves until the cork is out. Six half-turns of the wire; the bottle at thirty to forty-five degrees, aimed at nobody." },
    { "f": "Sparkling wine: twist what, and the sound", "b": "Hold the cork still through the cloth and turn the bottle from its base; the cork walks out. Ease it so the pressure sighs; a pop is marked, a spill more so." },
    { "f": "Sparkling wine: the pour in two motions", "b": "A first short pour so the mousse rises and settles, then a second to two thirds of the flute or the house measure. The bottle never touches the glass; twist and lift to stop the drip." },
    { "f": "Order of service at a table", "b": "Present to the host, taste pour to the host, then clockwise from the host's left, guest of honour first where the house keeps that rule, each from the right, the host last." },
    { "f": "Kir, Kir Royale, Negroni, Americano: tell them apart", "b": "Kir is cassis topped with Bourgogne Aligoté; Royale, with Champagne. Negroni is equal gin, Campari and sweet vermouth; the Americano drops the gin and adds soda." },
    { "f": "Cognac age terms: the youngest spirit in the blend", "b": "VS two years, VSOP four, Napoléon six, XO ten (since April 2018, six before), XXO fourteen. Armagnac: VS one, VSOP four, XO and Hors d'âge ten." },
    { "f": "The six Cognac crus from the centre out", "b": "Grande Champagne, Petite Champagne, Borderies, Fins Bois, Bons Bois, Bois Ordinaires. Fine Champagne is a blend of the first two with at least half Grande Champagne." },
    { "f": "Armagnac against Cognac: still, grapes, region", "b": "Armagnac from Gascony: mostly one pass through a column alambic to a lower strength, Ugni Blanc with Baco, Folle Blanche and Colombard, vintages common. Cognac from the Charente: double pot distilled." },
    { "f": "Calvados: the three appellations", "b": "Calvados (column or pot still), Calvados Pays d'Auge (double distilled in a pot still), Calvados Domfrontais (at least thirty per cent pear, column still). Fine two years, VSOP four, XO six." },
    { "f": "Bourbon's legal recipe", "b": "At least 51 per cent corn, distilled to no more than 80 per cent, into new charred oak at no more than 62.5 per cent, bottled at 40 or more, nothing added but water. Any state." },
    { "f": "Scotch whisky: the regions and the rule", "b": "Highland, Lowland, Speyside, Islay and Campbeltown. Malted barley, water and yeast; at least three years in oak casks of no more than 700 litres; bottled at 40 per cent or more. No e." },
    { "f": "Tequila and mezcal: agave, place, age", "b": "Tequila: blue Weber agave, at least 51 per cent (100 on the best), Jalisco. Mezcal: many agaves, Espadín most, pit-roasted for the smoke, Oaxaca. Blanco, Reposado (two months to a year), Añejo (one to three years)." },
    { "f": "Shake or stir: the rule and the reason", "b": "Shake a drink with juice, dairy or egg: it needs chill, dilution and air. Stir a drink of spirits and fortified wine alone: it stays clear and silky. The exam asks why." },
    { "f": "Sazerac: spec, method, glass, garnish", "b": "60 ml rye, a sugar cube, three dashes of Peychaud's, an absinthe rinse. Stir, strain into a chilled rocks glass with no ice. A lemon twist expressed and set aside. New Orleans." },
    { "f": "Manhattan: spec, glass, garnish", "b": "60 ml rye, 30 ml sweet vermouth, two dashes of Angostura. Stirred, up in a coupe, a brandied cherry. Perfect splits the vermouth dry and sweet; Dry takes dry vermouth and a twist." },
    { "f": "Margarita and Daiquiri: the sours of agave and cane", "b": "Margarita: 50 ml blanco tequila, 25 ml lime, 20 ml Cointreau, shaken, half salt rim. Daiquiri: 60 ml white rum, 25 ml lime, 15 ml sugar syrup, shaken, up in a coupe." },
    { "f": "French 75 and Champagne Cocktail", "b": "French 75: 30 ml gin, 15 ml lemon, 10 ml syrup, shaken, topped with Champagne in a flute, lemon twist. Champagne Cocktail: a bitters-soaked sugar cube, 15 ml Cognac, Champagne." },
    { "f": "A guest questions a bottle's condition", "b": "Listen, pause pouring and ask what seems wrong. Consult the sommelier and assess separately. Explain the next step calmly; do not argue from the wine's reputation or promise that decanting will repair it." },
    { "f": "Vegan suitability and an allergy request", "b": "They are separate questions. Check the exact product and producer information, then follow the house allergy procedure. A vegan label or the absence of a warning does not justify an allergy safety promise." },
    { "f": "Before presenting a selected bottle", "b": "Match producer, wine, cuvée, vintage, size and agreed price to the order. Resolve a different vintage or unavailable bottle before opening. Present it for approval; never silently substitute." }
  ],
  "questions": [
    { "id": "s-bwjyx55i", "cat": "Service references", "q": "Which compound causes cork taint in wine?", "opts": ["Ethyl acetate", "Trichloroanisole", "Hydrogen sulphide", "Acetaldehyde"], "a": 1, "exp": "TCA, 2,4,6-trichloroanisole, forms when mould meets chlorine compounds in cork, barrels or cardboard and smells of damp cardboard. Ethyl acetate is volatile acidity, hydrogen sulphide is reduction and acetaldehyde is oxidation." },
    { "id": "s-mcmcf079", "cat": "Service references", "q": "Which fault shows only on the finish, seconds after swallowing?", "opts": ["Oxidation", "Mousiness", "Cork taint", "Light strike"], "a": 1, "exp": "Mousiness is retronasal: nothing on the nose, then mouse cage or stale crackers after the swallow. It comes from tetrahydropyridines at high pH with little sulphur, and some tasters cannot detect it at all." },
    { "id": "s-qxvy3m2u", "cat": "Service references", "q": "What volume does a jeroboam of Champagne hold?", "opts": ["1.5 litres", "3 litres", "4.5 litres", "6 litres"], "a": 1, "exp": "In Champagne and Burgundy a jeroboam is three litres, four bottles. In Bordeaux the same name means five litres today, 4.5 in older bottlings, and the three litre bottle is the double magnum; the exam loves the difference." },
    { "id": "s-3oq2j0uf", "cat": "Service references", "q": "How many standard bottles does a methuselah hold?", "opts": ["Four", "Six", "Eight", "Twelve"], "a": 2, "exp": "A methuselah is six litres, eight bottles, the size Bordeaux calls an imperial. Four bottles is a jeroboam of Champagne, six a rehoboam and twelve a salmanazar." },
    { "id": "s-hpk8e4e7", "cat": "Service references", "q": "Which of these wines is served coldest at the table?", "opts": ["Tawny Port", "Fino sherry", "Vintage Port", "Oaked Chardonnay"], "a": 1, "exp": "Fino and Manzanilla are flor wines, fresh and saline, served at 6 to 8 C from a fresh bottle. Tawny is served cool at 10 to 14 C, Vintage Port at a full red's 16 to 18 C and oaked Chardonnay at 10 to 13 C." },
    { "id": "s-p6yy2b81", "cat": "Service references", "q": "At what temperature is a full tannic red best served?", "opts": ["10 to 12 C", "13 to 15 C", "16 to 18 C", "20 to 22 C"], "a": 2, "exp": "16 to 18 C is a useful starting range, adjusted to the wine and guest. Very cold reds can seem harsh; too much warmth can obscure freshness and balance. Check the actual bottle rather than using room temperature or a fixed warming time." },
    { "id": "s-cb867421", "cat": "Service references", "q": "Which of these wines is decanted to take it off its crust?", "opts": ["Tawny Port", "Fino sherry", "Vintage Port", "Beaujolais"], "a": 2, "exp": "Vintage Port commonly develops a deposit during bottle ageing. Let it settle, pour steadily over a light and stop before the deposit reaches the decanter. Filtered tawny usually needs no decanting; other styles and bottlings should be assessed individually." },
    { "id": "s-g06jvyoh", "cat": "Service references", "q": "When opening sparkling wine, which part does the sommelier turn?", "opts": ["The cork", "The cage", "The foil", "The bottle"], "a": 3, "exp": "The cork is held still through the cloth and the bottle is turned from its base, so the pressure walks the cork out without twisting it against the glass. The cork then leaves with a sigh, never a pop." },
    { "id": "s-e98idqio", "cat": "Service references", "q": "How many half-turns of the wire open a Champagne cage?", "opts": ["Four", "Five", "Six", "Eight"], "a": 2, "exp": "Every cage is made to open with six half-turns of the wire loop. The thumb goes on the cork before the first turn and stays there until the cork is out." },
    { "id": "s-6axne62b", "cat": "Service references", "q": "Where does the thumb go before the cage is loosened?", "opts": ["On the cork", "On the punt", "On the label", "On the neck"], "a": 0, "exp": "The thumb covers the cage and cork before anything is loosened and never leaves until the cork is out; about six atmospheres of pressure sit behind it. This is the step the examiner marks first." },
    { "id": "s-ukib3ha3", "cat": "Service references", "q": "Which bitters belong in a Sazerac?", "opts": ["Angostura bitters", "Peychaud's bitters", "Orange bitters", "Celery bitters"], "a": 1, "exp": "The Sazerac is rye (Cognac in the original), sugar and Peychaud's bitters, stirred and strained into an absinthe-rinsed rocks glass with no ice, a lemon twist expressed over it. Angostura belongs to the Manhattan and the Old Fashioned." },
    { "id": "s-2c27f7pg", "cat": "Service references", "q": "Which three ingredients make a Negroni in equal parts?", "opts": ["Gin, Aperol and dry vermouth", "Vodka, Campari and dry vermouth", "Gin, Campari and sweet vermouth", "Bourbon, Campari and sweet vermouth"], "a": 2, "exp": "Equal parts gin, Campari and sweet vermouth, stirred over ice with an orange slice, named for a Florentine count in 1919. With bourbon in place of gin it is a Boulevardier; with soda in place of gin, an Americano." },
    { "id": "s-8j01dzsq", "cat": "Service references", "q": "What is the minimum age of the youngest spirit in an XO Cognac?", "opts": ["Two years", "Four years", "Six years", "Ten years"], "a": 3, "exp": "XO has meant at least ten years since April 2018; it was six before, and older notes still say six. VS is two years, VSOP four, Napoléon six and XXO fourteen, always counting the youngest spirit in the blend." },
    { "id": "s-p1q43sq4", "cat": "Service references", "q": "Which Calvados appellation requires double distillation in a pot still?", "opts": ["Calvados Domfrontais", "Calvados Pays d'Auge", "Calvados AOC", "Pommeau de Normandie"], "a": 1, "exp": "Pays d'Auge is the pot-still, double-distilled appellation. Plain Calvados may use a column, Domfrontais must hold at least thirty per cent pear and uses a column, and Pommeau is apple must stopped with Calvados, an aperitif." },
    { "id": "s-n1zprjsp", "cat": "Service references", "q": "What is the minimum share of blue agave in a spirit labelled tequila?", "opts": ["35 per cent", "51 per cent", "75 per cent", "100 per cent"], "a": 1, "exp": "Tequila must be at least 51 per cent blue Weber agave; the rest may be other sugars. The better bottles say 100 per cent agave on the label, and the exam expects you to know the difference." },
    { "id": "s-zlfoorza", "cat": "Service references", "q": "For how long must Scotch whisky age in oak at the least?", "opts": ["One year", "Two years", "Three years", "Four years"], "a": 2, "exp": "The Scotch Whisky Regulations of 2009 ask for at least three years in oak casks of no more than 700 litres, in Scotland, bottled at 40 per cent or more. Irish whiskey and Canadian whisky share the three year floor." },
    { "id": "s-iw9ycirg", "cat": "Service references", "q": "In which casks must bourbon be aged?", "opts": ["Used bourbon casks", "Sherry casks", "Chestnut casks", "New charred oak"], "a": 3, "exp": "Bourbon goes into new charred oak every time, at no more than 62.5 per cent, with nothing added but water. The used barrels then go on to Scotland, Ireland, Mexico and the rum islands." },
    { "id": "s-qmqmc2tu", "cat": "Service references", "q": "Which spirit is distilled from fresh sugar cane juice rather than molasses?", "opts": ["Jamaican rum", "Demerara rum", "Rhum agricole", "Spiced rum"], "a": 2, "exp": "Rhum agricole, Martinique's AOC above all, and Brazil's cachaça start from fresh cane juice and taste grassy. Jamaican and Demerara rums are molasses rums; spiced rum is a flavoured rum." },
    { "id": "s-cujeq7ic", "cat": "Service references", "q": "In which city was the Bellini first made?", "opts": ["Milan", "Venice", "Florence", "Rome"], "a": 1, "exp": "The Bellini was born at a bar in Venice in 1948: white peach purée topped with Prosecco in a flute, named for the painter. The Negroni is Florence's drink and Campari is Milan's." },
    { "id": "s-h5dxuen2", "cat": "Service references", "q": "What tops a Kir Royale?", "opts": ["Bourgogne Aligoté", "Prosecco", "Soda water", "Champagne"], "a": 3, "exp": "A Kir is crème de cassis topped with Bourgogne Aligoté and a Kir Royale the same with Champagne, named for a mayor of Dijon. Prosecco belongs to the Bellini and the Spritz." },
    { "id": "s-0b72cno6", "cat": "Service references", "q": "What is the ratio of an Aperol Spritz?", "opts": ["2 parts Prosecco, 3 Aperol, 1 soda", "3 parts Prosecco, 2 Aperol, 1 soda", "1 part Prosecco, 1 Aperol, 1 soda", "3 parts Prosecco, 1 Aperol, 2 soda"], "a": 1, "exp": "Three parts Prosecco, two parts Aperol and a splash of soda, built over ice in a large wine glass with an orange slice; the Prosecco goes in first so the Aperol does not sink." },
    { "id": "s-n6jkx214", "cat": "Service references", "q": "Where does the cork go after a still wine is opened?", "opts": ["In the sommelier's apron pocket", "In the ice bucket by the table", "On an underliner to the host's right", "On the host's bread plate"], "a": 2, "exp": "The cork is presented on an underliner to the ordering guest's right; the guest may look at it, the sommelier reads the wine. A cork's look alone never proves the wine's condition." }
  ]
};
