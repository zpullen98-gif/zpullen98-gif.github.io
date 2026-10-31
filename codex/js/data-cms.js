/* The CMS edition: built by .scripts/cms/build-cms.cjs from .scripts/cms, never edited by hand.
   CMS.subjects holds the subjects of the Court of Master Sommeliers, Americas Introductory and Certified theory curriculum
   guide in the guide's order, each with its quoted learning outcomes and rows, its doors into the Codex (map) and its
   questions (ids e- and eight base36 digits, minted from the subject and the stem); CMS.groups the subject groups as the
   app prints them; CMS.syllabus the Certified exam syllabus, CMS.tasting the tasting exam's grapes and regions and CMS.grid
   the deductive tasting grid, each quoted from the Court's document. The Court's words keep their spelling; every string of
   our own is British, dash free and names nobody living. */
var CMS = {
 "grid": {
  "instructions": "Every line on this test paper has a question that must be answered. In each section, select or fill the blank with the best answer. DO NOT leave any blank lines.",
  "red": {
   "colour": {
    "label": "The primary color is:",
    "options": [
     "Purple",
     "Ruby",
     "Garnet"
    ]
   },
   "conclusion": {
    "age": {
     "label": "Age Range",
     "options": [
      "1-3 Years",
      "4-6 Years",
      "7+ Years"
     ]
    },
    "climate": {
     "explain": "Explain Why:",
     "label": "Climate",
     "options": [
      "Cool",
      "Moderate",
      "Warm"
     ]
    },
    "country": {
     "label": "Country of Origin"
    },
    "grape": {
     "choices": 6,
     "explain": "Explain Why:",
     "label": "Primary Grape Variety",
     "note": "Select from Examinable Grape Varieties"
    }
   },
   "condition": {
    "nose": "Select one or two fruit condition descriptors for the Nose - see exam.",
    "options": [
     "Tart",
     "Ripe",
     "Overripe / Jammy / Candied",
     "Baked / Dried / Bruised"
    ],
    "palate": "Select one or two fruit condition descriptors for the Palate - see exam."
   },
   "fruit": [
    {
     "key": "red",
     "label": "Red",
     "note": "If \"Yes\" provide one specific red fruit. If \"No\" do not leave blank, write \"None.\""
    },
    {
     "key": "black",
     "label": "Black",
     "note": "If \"Yes\" provide one specific black fruit. If \"No\" do not leave blank, write \"None.\""
    },
    {
     "key": "blue",
     "label": "Blue",
     "note": "If \"Yes\" provide one specific blue fruit. If \"No\" do not leave blank, write \"None.\""
    }
   ],
   "nonFruit": [
    {
     "key": "flowers",
     "label": "Flowers"
    },
    {
     "key": "fresh-herbs",
     "label": "Fresh Herbs, Tomato Leaf"
    },
    {
     "key": "dried-herbs",
     "label": "Dried Herbs"
    },
    {
     "key": "green",
     "label": "Green Bell Pepper, Grass, Jalapeño, Aparagus"
    },
    {
     "key": "mint",
     "label": "Mint, Eucalyptus"
    },
    {
     "key": "pepper",
     "label": "Black Peppercorn"
    },
    {
     "key": "coffee",
     "label": "Coffee, Cocoa, Mocha"
    },
    {
     "key": "meat",
     "label": "Meat, Blood, Leather"
    },
    {
     "key": "balsamic",
     "label": "Balsamic, Tar"
    },
    {
     "key": "carbonic",
     "label": "Carbonic Maceration"
    },
    {
     "key": "earth",
     "label": "Earth: Forest Floor, Wet Leaves, Mushrooms, Compost"
    },
    {
     "key": "mineral",
     "label": "Mineral: Mineral, Wet Rock, Sulfur"
    },
    {
     "key": "new-oak",
     "label": "New Oak: Vanilla, Smoke, Toast, Coconut, Dill"
    }
   ],
   "nonFruitNote": "Non-fruit descriptors combine NOSE and PALATE. Select \"YES\" only if it is an important character of the wine. Select \"NO\" if it is NOT an important character of the wine. Select ONE answer for each line. Do not leave any lines blank.",
   "sell": "Sell this wine to a guest in two sentences or less.",
   "structure": [
    {
     "key": "tannin",
     "label": "Tannin",
     "options": [
      "Low to Medium -",
      "Medium",
      "Medium +",
      "High"
     ]
    },
    {
     "key": "acidity",
     "label": "Acidity",
     "options": [
      "Low to Medium -",
      "Medium",
      "Medium +",
      "High"
     ]
    },
    {
     "key": "alcohol",
     "label": "Alcohol",
     "options": [
      "Low to Medium -",
      "Medium",
      "Medium +",
      "High"
     ]
    }
   ]
  },
  "source": "CMS-A 1-2025",
  "white": {
   "colour": {
    "label": "The primary color is:",
    "options": [
     "Straw",
     "Yellow",
     "Gold"
    ]
   },
   "conclusion": {
    "age": {
     "label": "Age Range",
     "options": [
      "1-2 Years",
      "3-4 Years",
      "5+ Years"
     ]
    },
    "climate": {
     "explain": "Explain Why:",
     "label": "Climate",
     "options": [
      "Cool",
      "Moderate",
      "Warm"
     ]
    },
    "country": {
     "label": "Country of Origin"
    },
    "grape": {
     "choices": 6,
     "explain": "Explain Why:",
     "label": "Primary Grape Variety",
     "note": "Select from Examinable Grape Varieties"
    }
   },
   "condition": {
    "nose": "Select one or two fruit condition descriptors for the Nose - see exam.",
    "options": [
     "Tart",
     "Ripe",
     "Overripe / Jammy / Candied",
     "Baked / Dried / Bruised"
    ],
    "palate": "Select one or two fruit condition descriptors for the Palate - see exam."
   },
   "fruit": [
    {
     "key": "apple-pear",
     "label": "Apple / Pear",
     "note": "If \"Yes\" provide one specific apple or pear fruit. If \"No\" do not leave blank, write \"None.\""
    },
    {
     "key": "citrus",
     "label": "Citrus",
     "note": "If \"Yes\" provide one specific citrus fruit. If \"No\" do not leave blank, write \"None.\""
    },
    {
     "key": "stone-fruit",
     "label": "Stone Fruit",
     "note": "If \"Yes\" provide one specific stone fruit. If \"No\" do not leave blank, write \"None.\""
    },
    {
     "key": "tropical",
     "label": "Tropical",
     "note": "If \"Yes\" provide one specific tropical fruit. If \"No\" do not leave blank, write \"None.\""
    }
   ],
   "nonFruit": [
    {
     "key": "flowers",
     "label": "Flowers"
    },
    {
     "key": "fresh-herbs",
     "label": "Fresh Herbs, Hay"
    },
    {
     "key": "green",
     "label": "Green Bell Pepper, Grass, Jalapeño, Asparagus"
    },
    {
     "key": "variety-spice",
     "label": "Grape Variety Spice: Allspice, Pepper, Cardamom"
    },
    {
     "key": "noble-rot",
     "label": "Noble Rot/Botrytis: Ginger, Honey, Saffron, Wax"
    },
    {
     "key": "oxidation",
     "label": "Oxidation: Nuts, Dried Fruit"
    },
    {
     "key": "lees",
     "label": "Lees: Dough, Baked Bread, Yeast, Beer, Cheese Rind"
    },
    {
     "key": "malolactic",
     "label": "Malolactic Fermentation: Butter, Cream, Yogurt"
    },
    {
     "key": "petrol",
     "label": "Petrol, Gasoline, Rubber"
    },
    {
     "key": "earth",
     "label": "Earth: Wet Leaves, Mushroom, Compost"
    },
    {
     "key": "mineral",
     "label": "Mineral: Mineral, Wet Rock, Sulfur"
    },
    {
     "key": "new-oak",
     "label": "New Oak: Vanilla, Toast, Smoke, Cinnamon, Nutmeg, Clove"
    }
   ],
   "nonFruitNote": "Non-fruit descriptors combine NOSE and PALATE. Select \"YES\" only if it is an important character of the wine. Select \"NO\" if it is NOT an important character of the wine. Select ONE answer for each line. Do not leave any lines blank.",
   "sell": "Sell this wine to a guest in two sentences or less.",
   "structure": [
    {
     "key": "bitterness",
     "label": "Phenolic Bitterness",
     "options": [
      "Yes",
      "No"
     ]
    },
    {
     "key": "sweetness",
     "label": "Sweetness",
     "options": [
      "Dry",
      "Off-Dry"
     ]
    },
    {
     "key": "acidity",
     "label": "Acidity",
     "options": [
      "Low to Medium -",
      "Medium",
      "Medium +",
      "High"
     ]
    },
    {
     "key": "alcohol",
     "label": "Alcohol",
     "options": [
      "Low to Medium -",
      "Medium",
      "Medium +",
      "High"
     ]
    }
   ]
  }
 },
 "groups": [
  {
   "key": "foundations",
   "name": "Viticulture and vinification"
  },
  {
   "key": "france",
   "name": "France"
  },
  {
   "key": "italy",
   "name": "Italy"
  },
  {
   "key": "spain-portugal",
   "name": "Spain and Portugal"
  },
  {
   "key": "central-europe",
   "name": "Germany, Austria, Hungary and Greece"
  },
  {
   "key": "north-america",
   "name": "North America"
  },
  {
   "key": "southern-hemisphere",
   "name": "South America, South Africa, New Zealand and Australia"
  },
  {
   "key": "styles",
   "name": "Sparkling, sweet and fortified"
  },
  {
   "key": "beyond-wine",
   "name": "Beer, sake, spirits and cocktails"
  },
  {
   "key": "business",
   "name": "The business of the sommelier"
  }
 ],
 "subjects": [
  {
   "certifiedOnly": false,
   "court": "GRAPE GROWING - VITICULTURE",
   "group": "foundations",
   "id": "viticulture",
   "map": {
    "cats": {
     "certified": [
      "Viticulture & Winemaking",
      "Terroir: Climate & Soil"
     ],
     "intro": [
      "Viticulture & Winemaking",
      "Soil & Terroir"
     ]
    },
    "chapters": {
     "certified": [
      "Viticulture & Winemaking",
      "Terroir: Climate & Soil"
     ],
     "intro": [
      "vit"
     ]
    },
    "countries": [
     "chile"
    ],
    "grapes": [],
    "regions": [
     "champagne",
     "burgundy",
     "bordeaux",
     "rhone",
     "alsace",
     "mosel",
     "coonawarra",
     "hawkes-bay",
     "napa-sonoma",
     "columbia-valley",
     "mendoza"
    ],
    "serviceRef": [],
    "techniques": [
     "training-pruning",
     "phylloxera-rootstocks",
     "organic-biodynamic",
     "frost",
     "heat-irrigation",
     "clonal-massal",
     "canopy-yield",
     "harvest-sorting",
     "steep-slopes",
     "altitude-diurnal",
     "maritime-fog",
     "soils-drainage"
    ]
   },
   "name": "Grape Growing: Viticulture",
   "order": 1,
   "outcome": {
    "certified": "After studying this section, a candidate will understand more detail of grape growing (viticulture), including the vine cycle, parts of the vine, and important viticultural terms.",
    "intro": "After studying this section, a student will understand the important factors that influence grape growing (viticulture) that impact the final flavor of the wine."
   },
   "pages": [
    3,
    4,
    5,
    6
   ],
   "questions": [
    {
     "accept": [
      "50",
      "50°f",
      "50 °f",
      "50f",
      "50 f",
      "50 degrees",
      "50 degrees f",
      "50 degrees fahrenheit",
      "fifty",
      "fifty degrees",
      "fifty degrees fahrenheit",
      "10°c",
      "10c",
      "10 c",
      "10 degrees celsius",
      "ten degrees celsius"
     ],
     "ans": "50°F (10°C)",
     "exp": "Each day of the growing season scores the amount by which its mean temperature exceeds 50°F (10°C), and the season's total sorts regions on the Winkler scale from cool Region I to hot Region V. The Court sets this beside macroclimate, mesoclimate and microclimate as its Certified climate terms.",
     "id": "e-ao1eypo3",
     "q": "Growing degree days count each day's mean temperature above what threshold, given in degrees Fahrenheit?",
     "row": "Factor 2: Climate - Terms",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "Mendoza's vineyards climb from under 1,000 metres around the city to about 1,500 metres in the Uco Valley, and the height brings cold nights, a wide swing from day to night that keeps acidity and colour in the grapes. No ocean, lake or sea fog reaches the province: the Andes wall it off from the Pacific and leave a desert that lives on irrigation.",
     "id": "e-ynpvoouj",
     "opts": [
      "Altitude",
      "Coastal fog",
      "Lake effect",
      "Ocean current"
     ],
     "q": "Mendoza lies in a hot, dry rain shadow at about 33 degrees south. Which moderator chiefly keeps its best vineyards cool enough to hold their acidity?",
     "row": "Factor 2: Climate - Moderators"
    },
    {
     "a": 2,
     "exp": "Côte-Rôtie's terraces are cut into schist, the dark, iron-rich mica schist of the Côte Brune with paler gneiss on the Côte Blonde, while Hermitage and Cornas stand on granite. The Court's Certified soil list asks for these northern Rhône rocks alongside Coonawarra's terra rossa and the Gimblett Gravels.",
     "id": "e-ly97effs",
     "opts": [
      "Kimmeridgian marl",
      "Volcanic basalt",
      "Schist",
      "Chalk"
     ],
     "q": "Which rock underlies the steep terraced slopes of Côte-Rôtie in the northern Rhône?",
     "row": "Factor 4: Soil"
    },
    {
     "a": 1,
     "exp": "Pinot Gris and Pinot Blanc are colour mutations of Pinot Noir: a bud changed its skin colour and growers propagated the new shoot, so the DNA is almost identical. A crossing joins two varieties of one species, as Pinotage does, and a hybrid joins two species, as Vidal does; the Court asks all three terms.",
     "id": "e-go9dcbpn",
     "opts": [
      "Hybridisation",
      "Mutation",
      "Crossing",
      "Grafting"
     ],
     "q": "Pinot Gris and Pinot Blanc arose from Pinot Noir by which natural process?",
     "row": "Factor 5: Grape Variety"
    },
    {
     "a": 3,
     "exp": "The Court's cycle runs dormancy, bud break, flowering, fruit set, ripening with véraison and hangtime, maturity, harvest and pruning. At fruit set the fertilised flowers become berries, and cold or wet weather at flowering gives a poor set and a smaller crop.",
     "id": "e-ga6uxdn7",
     "opts": [
      "Véraison",
      "Dormancy",
      "Bud break",
      "Fruit set"
     ],
     "q": "In the vine's yearly cycle, which stage follows directly after flowering?",
     "row": "Factor 7: Vineyard Management"
    },
    {
     "accept": [
      "2.47",
      "2.47 acres",
      "about 2.47",
      "2.471",
      "2.5",
      "2.5 acres",
      "about 2.5",
      "nearly 2.5",
      "two and a half",
      "two and a half acres",
      "about two and a half"
     ],
     "ans": "About 2.47 acres",
     "exp": "A hectare is 10,000 square metres, about 2.47 acres, so an acre is about 0.4 hectare. To compare a yield in tons per acre with one in hectolitres per hectare the area must be converted first and the weight of grapes then turned into a volume of wine, which is why the Court asks for the conversion formulas.",
     "id": "e-1v7gldwd",
     "q": "When converting a vineyard yield from metric to standard measures, about how many acres make one hectare?",
     "row": "Factor 8: Yield",
     "sa": 1
    },
    {
     "accept": [
      "phenolic ripeness",
      "phenolic maturity",
      "phenolic ripening",
      "phenolic",
      "physiological ripeness",
      "physiological maturity"
     ],
     "ans": "Phenolic ripeness",
     "exp": "Sugar ripeness is what Brix measures; phenolic ripeness is the maturity of the skins, seeds and stems, when tannins taste soft rather than green. In a hot site sugar can race ahead of the phenolics, and canopy management, crop level and hangtime are the vineyard choices growers use to bring the two into step.",
     "id": "e-rrcjxpzo",
     "q": "Ripeness of the skins, seeds and tannins, judged apart from the sugar a refractometer reads in Brix, is called what?",
     "row": "Factor 9: Harvest",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "Common types of viticulture: Organic; Biodynamic; Sustainable; Dry farming",
     "intro": "Factors of production that influence grape growing. Factors occurring from nature plus manmade decisions in the vineyard that affect wine quality.",
     "topic": "Definition of Viticulture"
    },
    {
     "certified": "",
     "intro": "Location and Geography Considerations: Site location of vineyard; Goals of wine producer; Regional wine laws; Financial considerations",
     "topic": "Factor 1: Location and Geography"
    },
    {
     "certified": "Macroclimate: the climate of an area, such as a wine region; Mesoclimate: the climate of a vineyard; Microclimate: the climate around a single vine; Degree-Days: Days during the growing season are assigned individual growing degree-days according to the number of days that the average temperature exceeds the threshold of over 50°F.",
     "intro": "Climate General Definition: The weather conditions in an area in general or over a long period of time. This includes: temperature, humidity, air pressure, rainfall, sunshine, cloud cover, wind, and other elements that are relatively stable from year to year. *Climate and weather are different!; Climate types: Continental; Maritime; Mediterranean; Desert/Arid; Climate descriptors: Cool; Moderate; Warm; Hot",
     "topic": "Factor 2: Climate - Terms"
    },
    {
     "certified": "",
     "intro": "Where do grapes grow?; Latitudinal Wine Growing Zones: Most wine-growing regions are within the 30-50° degree latitudinal lines. Wine-growing regions may exist outside this range mainly due to climate moderators.",
     "topic": "Factor 2: Climate - Latitude"
    },
    {
     "certified": "Understand how major wine regions of the world experience climate moderation and how the moderation affects grape growing. Examples include: Alsace, Rhône Valley, Chile, Mendoza, parts of Napa and Sonoma County, California, Columbia Valley, Washington and many (others). Examples of moderators include the San Pablo Bay, Benguela Current, Humboldt Current, etc.",
     "intro": "Climate Moderators: Factors that affect the general climate of an area such as: Altitude; Diurnal shifts; Sunshine hours; Bodies of water; Wind; Rain shadow effect",
     "topic": "Factor 2: Climate - Moderators"
    },
    {
     "certified": "Know topography for important wine regions and how it affects grape growing. Examples include: Vosges Mountain Range, Cascade Mountain Range, Andes Mountains... The important features are listed in the curriculum for that region if it's relevant at this level.",
     "intro": "The surface features of the land, such as local elevation or altitude. This includes local mountains, hills, valleys, and bodies of water.",
     "topic": "Factor 3: Topography"
    },
    {
     "certified": "Match the soils types to a more extensive list of wine regions such as: Champagne, Chablis, Côte d'Or, Coonawarra, Gimblett Gravels, Haut-Médoc, Pomerol, St.-Émilion, Châteauneuf-du-Pape, Cornas, Hermitage, Côte-Rôtie. The important soils to note are listed in the curriculum for that region if it's relevant at this level.",
     "intro": "Properties of different soil types provide specific things to a vine's health and growth. Soil types are matched with grape varieties based on the climate and needs of the grape variety. Some grape varieties do best in certain soil types.; Soil properties: Drainage or water retention; Sun reflection; Nutrient content; Temperature regulation; Pest resistance; Soil type examples: Clay, slate, limestone, granite, chalk, sand, shist; Be able to match soils to these major regions: Champagne, Chablis, Côte d'Or, Haut-Médoc, Pomerol, St.-Émilion, Châteauneuf-du-Pape, Mosel. The important soils to note are listed in the curriculum for that region if it's relevant at this level.",
     "topic": "Factor 4: Soil"
    },
    {
     "certified": "Parts of the grape vine: Rootstock; Trunk; Cordons; Shoots/canes; Grape clusters/bunches; Canopy; Other viticulture terms: Hybrid; Crossing; Clone; Mutations; Other species of vines: Vitis Labrusca examples: Catawba, Concord",
     "intro": "Genus: Grapes are the fruit of a vining plant of the genus Vitis.; Species: There are many species of vining plants that produce grapes for making wine. Vinifera is the focus here.; Vitis vinifera: Native to Mediterranean, Europe, Southwestern Asia.; Most common for quality grape production.; 10,000 varieties.; Examples: Cabernet Sauvignon, Merlot, Chardonnay, Riesling, Syrah; How are grape varieties chosen?; Regional wine law; Climate compatibility; Soil compatibility; Marketability",
     "topic": "Factor 5: Grape Variety"
    },
    {
     "certified": "Understanding the differences between vintages of major wine regions over the last 10-15 years. Those required for the Certified Sommelier Exam are listed in the curriculum for that region if it's relevant at this level.",
     "intro": "Grape growing or viticulture is farming.; Every year produces a different crop called the vintage.; Each vintage can be different and an indicator of style, quality, and price potential.; Weather connection to quality. Introductory students do no need to memorize differences in vintages at this level.",
     "topic": "Factor 6: Vintage - Yearly Weather"
    },
    {
     "certified": "Vine Cycle: Dormancy; Bud Break; Flowering; Fruit Set; Ripening; Veraison; Hangtime; Maturity; Harvest; Pruning; Vineyard Architecture: Vineyard slope and sun exposure; Vineyard aspect: Resulting characteristics of finished wines that are exposed to heat and light at different times of day.; Vine Training Systems: Two main systems to note.; 1. Head training: Examples such as Gobelet/bush; 2. Cordon training: Using support for growth",
     "intro": "Vineyard management: Why manage a vineyard? Vineyards need to be managed to remain viable and healthy. Vines need to be managed or trained so they vine in a particular size and ideal shape to ripen grapes best. Many vine training systems exist to suit different grape varieties in wine-growing regions.; Canopy management: Managing the growth of the leaves.; Irrigation: Making sure the vine has enough water in the growing season.; Managing pests, disease, mildew, fungus infections, etc.: Fungi/Mold: Botrytis cinerea (can be a good thing!); Pests: Phylloxera; Managing yield: Making sure the vine is producing the amount of fruit desired.; Green harvest: a quality measure of removing or dropping unripe grapes or clusters.",
     "topic": "Factor 7: Vineyard Management"
    },
    {
     "certified": "Phylloxera: Grafting of Vitis Vinifera onto Vitis Labrusca rootstock.; Other vine diseases: Pierce's Disease",
     "intro": "Managing pests and disease: Phylloxera: Microscopic vine louse; Mid-19th century destroyed many of the vineyards in France. Use of resistant American vine species rootstock to stop the spread. Most wine regions of the world are affected.",
     "topic": "Factor 7: Vineyard Management - Pests and Disease"
    },
    {
     "certified": "Understand conversion formulas to navigate between metric and standard systems.; Understand the quality impact as a result of yield choices and how different grape varieties respond to various yields.",
     "intro": "Yield: How much fruit a vine produces.; This is influenced by many factors and controlled (or not) by human intervention. Yield can be measured in a few ways: Tons per acre; Hectoliters per hectare",
     "topic": "Factor 8: Yield"
    },
    {
     "certified": "Night harvests; Phenolic ripeness versus sugar ripeness.; How do choices made in the vineyard affect phenolic vs sugar ripeness",
     "intro": "Timing of picking - Considerations include: Weather; Style of wine being made; Producer goals; Regional wine law; Number of vineyard passes for picking; How grapes are picked?; By hand or by machine; How are the grapes collected?; Collection bin size (large or small); * How does this affect quality?; Grape maturity: Ripeness is a range, one vineyard manager's definition of ripeness may be different than another's.; Sugar measurements: Example- Brix; Structure and flavor ripeness",
     "topic": "Factor 9: Harvest"
    },
    {
     "certified": "",
     "intro": "\"Goût de terroir\" or Taste of Earth: Encompasses all of the environmental impacts on a grapevine. Unique characteristics of wine such as aromas and flavors that distinguish it from all others.",
     "topic": "Factor 10: Terroir"
    },
    {
     "certified": "",
     "intro": "Regional wine laws dictate the grape varieties can be grown and how they are grown in many wine regions of the world.",
     "topic": "Factor 11: Regional Wine Law"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "WINEMAKING - VINIFICATION",
   "group": "foundations",
   "id": "vinification",
   "map": {
    "cats": {
     "certified": [
      "Viticulture & Winemaking",
      "Wine Fundamentals"
     ],
     "intro": [
      "Viticulture & Winemaking",
      "Winemaking Techniques"
     ]
    },
    "chapters": {
     "certified": [
      "Viticulture & Winemaking",
      "Wine Fundamentals"
     ],
     "intro": [
      "vin"
     ]
    },
    "countries": [],
    "grapes": [],
    "regions": [
     "rioja",
     "piedmont"
    ],
    "serviceRef": [
     "faults"
    ],
    "techniques": [
     "rose-methods",
     "carbonic-maceration",
     "whole-bunch",
     "extraction",
     "malolactic",
     "oak",
     "lees-batonnage",
     "enrichment-acidification",
     "blending-assemblage",
     "stabilisation-sulphur",
     "fermentation-yeast"
    ]
   },
   "name": "Winemaking: Vinification",
   "order": 2,
   "outcome": {
    "certified": "After studying this section, a candidate will have a deeper understanding of winemaking cause and effect on the final wine aromas and flavors, such as fermentation techniques, barrel size choices, types of oak used, and other important winemaking decisions.",
    "intro": "After studying this section, a student will understand the definition of winemaking (vinification), the steps of making white, red, and rosé, and other important factors of consideration that influence the how and why wines taste the way they do."
   },
   "pages": [
    7,
    8
   ],
   "questions": [
    {
     "accept": [
      "saccharomyces cerevisiae",
      "s. cerevisiae",
      "s cerevisiae",
      "sacch. cerevisiae",
      "saccharomyces cerevisae",
      "saccharomyces cerevesiae"
     ],
     "ans": "Saccharomyces cerevisiae",
     "exp": "Saccharomyces cerevisiae, the species the Court names for wine fermentation, tolerates rising alcohol far better than the wild yeasts of other genera that start a ferment from the grape skins and the cellar, so it takes over once the alcohol passes a few per cent and finishes the job. It is the same species that raises bread and ferments ale.",
     "id": "e-ayl1fmeu",
     "q": "Wild yeasts of several genera often begin a spontaneous fermentation. Which species usually takes over and finishes it?",
     "row": "Alcoholic Fermentation",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Acacia barrels are used in parts of Burgundy, the Loire and Friuli for whites, adding a floral, honeyed note with little tannin. The Court also names cherry and chestnut among the other woods used for barrels; pine, eucalyptus and birch are not coopered for wine.",
     "id": "e-r92gkf6z",
     "opts": [
      "Birch",
      "Pine",
      "Acacia",
      "Eucalyptus"
     ],
     "q": "Besides oak, which of these woods is coopered into barrels by some cellars, chiefly for white wine?",
     "row": "Fermentation Vessels Types"
    },
    {
     "a": 3,
     "exp": "The Court's ladder is barrique 225 litres, puncheon 300, demi-muid 600 and foudre, or botti in Piemonte, 1,000 litres and more. The bigger the vessel the less wood touches each litre, so a large old foudre marks a wine far less than a new barrique, the cask of Rioja and Bordeaux.",
     "id": "e-3i0uh0tm",
     "opts": [
      "Puncheon",
      "Demi-muid",
      "Barrique",
      "Foudre"
     ],
     "q": "Of the barrel sizes the Court lists, which vessel is the largest, at a thousand litres and more?",
     "row": "Fermentation Vessels Types"
    },
    {
     "a": 1,
     "exp": "Free sulphur dioxide, whose molecular form is the most active, is what protects a wine against oxygen and spoilage microbes; once it combines with acetaldehyde, sugars and other compounds it is bound and protects no longer. Total sulphur dioxide is the free and the bound together, and the Court asks the difference between them.",
     "id": "e-snzd8kor",
     "opts": [
      "Hydrogen sulphide",
      "Free sulphur dioxide",
      "Sulphuric acid",
      "Bound sulphur dioxide"
     ],
     "q": "Which sulphur compound in a finished wine actively guards it against oxidation and spoilage microbes?",
     "row": "Preparation for Bottling"
    },
    {
     "a": 0,
     "exp": "Oaked Chardonnay from California commonly goes through full malolactic conversion, which softens its acidity and brings the buttery note of diacetyl. Riesling, Sauvignon Blanc and Albariño are usually kept from it to hold their crisp acidity and primary fruit, so the grid's malolactic line should read No for them.",
     "grapes": [
      "Chardonnay"
     ],
     "id": "e-6zumw8wn",
     "opts": [
      "Napa Valley Chardonnay",
      "Rías Baixas Albariño",
      "Marlborough Sauvignon Blanc",
      "Mosel Riesling"
     ],
     "q": "Which of these whites is most likely to show the butter and cream notes the Court's grid files under malolactic fermentation?",
     "row": "Winemaking Terms"
    },
    {
     "accept": [
      "reductive",
      "reductive winemaking",
      "reductive handling",
      "reductively",
      "anaerobic",
      "anaerobic winemaking",
      "protective",
      "protective winemaking",
      "protective handling"
     ],
     "ans": "Reductive",
     "exp": "Reductive winemaking keeps oxygen away to hold primary fruit and aroma, as in a crisp Sauvignon Blanc; oxidative winemaking lets air in on purpose through barrels, racking and ullage, building nutty, developed flavours, with Oloroso and tawny Port at the far end. The Court asks the difference between the two.",
     "id": "e-3wndy6cg",
     "q": "Winemaking that shuts air out with inert gas, cool steel tanks and sealed vessels, to keep primary fruit fresh, is described by what term?",
     "row": "Winemaking Decisions",
     "sa": 1
    },
    {
     "accept": [
      "glucose and fructose",
      "fructose and glucose",
      "glucose, fructose",
      "fructose, glucose",
      "glucose fructose",
      "fructose glucose",
      "dextrose and levulose",
      "dextrose and laevulose"
     ],
     "ans": "Glucose and fructose",
     "exp": "Ripe grape juice holds glucose and fructose in roughly equal amounts, the sugars yeast ferments into alcohol; sucrose, the cane or beet sugar of chaptalisation, is split into the same two before yeast can use it. Yeast takes glucose a little faster, so the sugar left in a sweet wine leans towards fructose, the sweeter of the two.",
     "id": "e-fssf9fn2",
     "q": "Which two sugars make up nearly all of the sugar in ripe grapes?",
     "row": "Definition of Winemaking - Vinification",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "Basic chemistry of wine and how it relates to cause and effect. Malolactic conversion, acids in wine, and sugars in wine.",
     "intro": "Vinification: Decisions and practices made in the winery from harvest to when the wine is bottled.",
     "topic": "Definition of Winemaking - Vinification"
    },
    {
     "certified": "Breakdown of how sustainability is implemented in the winery.",
     "intro": "What is the goal of the winery?; What style of wine will be produced?; What will the price point of the wine be?; Are there regional wine laws the winery must adhere to?; Sustainability.",
     "topic": "Factors in Decision Making"
    },
    {
     "certified": "Three types of Rosé production: Maceration time; Blending Method - often used for sparkling wine production.; Saignée*; *Saignée or “bleeding” method (this essentially doesn't exist anymore. It was a concentration technique for red wine production with rosé being the byproduct.); Aging: Can be on the lees or without.; Can be in concrete, stainless steel, or oak.",
     "intro": "Harvest; Sort; Destem; White Wines: Crush, Press, Fermentation, Fining/Filtering, Bottling/Packaging.; Red Wines; Crush, Maceration, Fermentation (with skin contact), Pressing, Aging, Fining/Filtration, Bottling/Packaging, Bottle Aging.; Rosé Wines (simple version); Crush (red grape varieties), Maceration skin contact (for a short time), Pressing, Fermentation, Fining/Filtration, Bottling/Packaging.",
     "topic": "Winemaking Steps"
    },
    {
     "certified": "Saccharomyces cerevisiae = species of yeast for wine fermentation",
     "intro": "Sugar + Yeast --> Alcohol, CO2, Heat, Aromas, Flavors",
     "topic": "Alcoholic Fermentation"
    },
    {
     "certified": "Exploration of oak and its various origins.; Identification of other types of woods used for barrels, such as acacia, cherry, and chestnut.; Barrel Sizes: Barrique = 225 liters; Puncheon = 300 liters; Demi-muid = 600 liters; Foudre/Botti = 1,000+ liters; Understand the cause and effect of the different types of vessels and which has more flavor impact. Know which major areas of the world use them, such as botti in Piemonte or barriques in Rioja.",
     "intro": "Type of vessel; Wood; Stainless steel; Concrete",
     "topic": "Fermentation Vessels Types"
    },
    {
     "certified": "Basic knowledge of coopers and the construction of barrels.",
     "intro": "Size: Large or small.; Shape: Oval, round, egg.; Oxygen permeability considerations.; Temperature control.",
     "topic": "Fermentation Vessels Types and Considerations"
    },
    {
     "certified": "Cause & effect: Skin contact and its effect on color, extraction, pH, and texture.; Bâttonage and its effect on weight, flavor, and texture.; Whole-cluster versus stem inclusion versus whole-berry fermentations.; Be able to associate winemaking practices to a non-fruit descriptor on the Certified Exam Tasting Grid. Know which regions and grape varieties are associated with them and which are not: lees/autolysis, malolactic fermentation, carbonic maceration.",
     "intro": "Grape must; Chaptalization; Acidification; Water addition; Lees; Autolysis; Malolactic fermentation; Carbonic maceration",
     "topic": "Winemaking Terms"
    },
    {
     "certified": "Outlining the differences between reductive and oxidative winemaking.",
     "intro": "Temperature control and why it's important for different color wines and styles.; Oxygen management and its impact of final style of wine produced.; Extraction explained through the use of punch downs, pump overs, maceration times, and fermentation temperature.",
     "topic": "Winemaking Decisions"
    },
    {
     "certified": "What each region dictates and what options winemakers have.",
     "intro": "Costs; Age of barrels; Length of time of aging",
     "topic": "Aging and Maturation Considerations"
    },
    {
     "certified": "Cold stabilization; Examples of fining agents; Sulphur additions and the difference between free and bound compounds.",
     "intro": "Clarification and the difference between fining and filtration.",
     "topic": "Preparation for Bottling"
    },
    {
     "certified": "",
     "intro": "Containers: Bottles; Kegs; Boxed wine; Closures: Cork; Composites; Screw cap (Stelvin); Glass top (Vinolok); Packaging: Labels and label design; Capsule colors and design; Adhering to governmental label laws",
     "topic": "Packaging"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "FRANCE - BORDEAUX",
   "group": "france",
   "id": "bordeaux",
   "map": {
    "cats": {
     "certified": [
      "Bordeaux"
     ],
     "intro": [
      "Bordeaux"
     ]
    },
    "chapters": {
     "certified": [
      "Bordeaux"
     ],
     "intro": [
      "bordeaux"
     ]
    },
    "countries": [
     "france"
    ],
    "grapes": [
     "Cabernet Sauvignon",
     "Merlot",
     "Cabernet Franc",
     "Petit Verdot",
     "Malbec",
     "Carmenère",
     "Sauvignon Blanc",
     "Sémillon"
    ],
    "regions": [
     "bordeaux"
    ],
    "serviceRef": [
     "decanting",
     "temperatures"
    ],
    "techniques": [
     "noble-rot",
     "blending-assemblage",
     "oak"
    ]
   },
   "name": "France: Bordeaux",
   "order": 3,
   "outcome": {
    "certified": "After studying this section, a candidate will be able to connect grape variety, geography, soil type, and wine style with important Bordeaux appellations. They will be able to identify key regions on map, distinguish the unique aspects of the different regions of Bordeaux in regional classification systems, vintages, and styles of wine produced. A candidate will understand the impact of these differences when making purchasing decisions and when making recommendations. Certified Sommeliers will recognize iconic producers and be able to recommend and sell food pairings with the various styles of wine from Bordeaux to a guest.",
    "intro": "After studying this section, a student will be able to locate and recognize major appellations that make up the Bordeaux wine region. Students will know the important grape varieties, bodies of water, and soil types and understand their connection to each other and to grape growing. Students will understand the basics of the Bordeaux classification systems, and will be able to recognize the names and wine labels of important producers/châteaux. Students will begin an understanding of the connection between yearly weather, vintage variation, wine style and wine selling price."
   },
   "pages": [
    9,
    10,
    11
   ],
   "questions": [
    {
     "a": 0,
     "exp": "The Court lists Pétrus, Lafleur, Le Pin and Clos l'Église as Pomerol's top producers, all Merlot-led reds from the clay and gravel of the plateau. Pomerol has never been classified, so these names carry the appellation's reputation on their own; Saint-Émilion's top estates (Angélus, Ausone, Cheval Blanc, Pavie, Figeac) sit in its own classification.",
     "grapes": [
      "Merlot"
     ],
     "id": "e-yvo25lnx",
     "opts": [
      "Pomerol",
      "Pessac-Léognan",
      "Saint-Julien",
      "Saint-Émilion"
     ],
     "q": "The Court's list of top producers names Château Lafleur and Clos l'Église. In which Bordeaux appellation are their vineyards?",
     "row": "Wine Law / Classification / Producers"
    },
    {
     "accept": [
      "saint-julien",
      "saint julien",
      "st-julien",
      "st julien",
      "st. julien",
      "st.-julien",
      "saint-julien aop",
      "st-julien aop"
     ],
     "ans": "Saint-Julien",
     "exp": "The great Léoville estate was divided in the decades after the Revolution into Las Cases, Poyferré and Barton, and all three sit in Saint-Julien beside Ducru-Beaucaillou and Gruaud Larose, the commune's other Second Growths. The Court asks a Certified candidate to know the fourteen Second Growths with their communes.",
     "id": "e-62m6ok8k",
     "q": "All three Léoville estates, Las Cases, Poyferré and Barton, are Second Growths of 1855. Which commune holds them?",
     "row": "Wine Law / Classification",
     "sa": 1
    },
    {
     "accept": [
      "black rot",
      "blackrot",
      "black-rot",
      "guignardia bidwellii",
      "guignardia"
     ],
     "ans": "Black rot",
     "exp": "Black rot is a fungal disease that spots the leaves and then turns the berries brown, black and shrivelled, and it thrives in the warm, wet springs a maritime climate brings. Grey rot is the destructive form of Botrytis cinerea, the fungus whose benign form, noble rot, makes Sauternes; the Bordeaux mixture of copper sulphate and lime was devised against downy mildew in the same damp conditions.",
     "id": "e-zrbyxiuw",
     "q": "The Court sets two harmful rots against the noble rot of Sauternes. One is grey rot; name the other, a fungus that turns the berries into hard, shrivelled mummies.",
     "row": "Grape Growing",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Entre-Deux-Mers dry white, mostly Sauvignon Blanc with Sémillon and Muscadelle and made in steel, has the acidity and brisk citrus to cut the brine of an oyster; the appellation has also covered red since the 2023 vintage. Pessac-Léognan's barrel-fermented whites suit lobster and richer fish, Sauternes goes with foie gras and blue cheese, and Lalande-de-Pomerol is a red.",
     "grapes": [
      "Sauvignon Blanc"
     ],
     "id": "e-wpslzvjf",
     "opts": [
      "Lalande-de-Pomerol",
      "Entre-Deux-Mers",
      "Sauternes",
      "Pessac-Léognan"
     ],
     "q": "A table orders Arcachon oysters and wants to stay in Bordeaux. Which appellation gives the crisp, unoaked, Sauvignon-led white the dish calls for?",
     "row": "Food and Beverage Pairing"
    },
    {
     "a": 0,
     "exp": "The Garonne flows up from the Pyrenees past Sauternes, Barsac and the Graves to the city, then meets the Dordogne at the Bec d'Ambès to form the Gironde estuary. Its cool tributary, the Ciron, brings the autumn mists that breed noble rot; the Dordogne serves the Right Bank, the Isle joins it at Libourne and the Charente is Cognac's river.",
     "id": "e-tnyqkuzi",
     "opts": [
      "The Garonne",
      "The Dordogne",
      "The Charente",
      "The Isle"
     ],
     "q": "Which river runs past the vineyards of Graves, Barsac and Sauternes on its way down to the city of Bordeaux?",
     "row": "Geography: Physical Feature"
    },
    {
     "a": 2,
     "exp": "Barsac is one of the five Sauternes communes and the only one that may use an appellation of its own, always for botrytised sweet white from Sémillon, Sauvignon Blanc and Muscadelle. Its growers may label the wine Barsac or Sauternes, and a dry white from the same vines sells as Bordeaux Blanc.",
     "grapes": [
      "Sémillon"
     ],
     "id": "e-cad70e2x",
     "opts": [
      "Dry rosé",
      "Dry white",
      "Sweet white",
      "Dry red"
     ],
     "q": "A bottle labelled Barsac AOP holds which style of wine?",
     "row": "Wine Law / Appellations"
    },
    {
     "accept": [
      "aeration",
      "aerate",
      "to aerate",
      "aerating",
      "aerate it",
      "oxygen",
      "oxygenation",
      "air",
      "airing",
      "to air it",
      "breathing",
      "to breathe",
      "to let it breathe",
      "breathe"
     ],
     "ans": "Aeration",
     "exp": "The Court's Certified cell asks for both decants: a young, tannic Bordeaux is decanted for aeration, so that air opens its closed fruit and softens its grip, while an aged bottle is decanted slowly over a light to leave its sediment behind. A full red Bordeaux is served at about 16 to 18 degrees Celsius.",
     "id": "e-erod1ba4",
     "q": "A guest asks why you are decanting a two-year-old Margaux that has thrown no deposit at all. In one word, what is that decant for?",
     "row": "Service of Beverage",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The 1855 list ranked estates by the prices their wines had fetched over many years, and Haut-Brion's prices stood level with those of Lafite, Latour and Margaux, so the brokers included it although it lies in the Graves; Mouton joined the first rank only in 1973. It is the only red outside the Médoc on the list, and it also tops the Classification of Graves of 1959.",
     "id": "e-jad6ioud",
     "opts": [
      "Graves lay in the Médoc then",
      "It was the oldest estate",
      "Its owner chaired the jury",
      "Its prices matched theirs"
     ],
     "q": "Why did the brokers of 1855 rank Haut-Brion, a Graves estate, beside the three Médoc First Growths?",
     "row": "Wine Law / Classification"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Southwest France, along the Atlantic coast",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Maritime to continental moving from the coast inland",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Note the location of bodies of water relative to major appellations and how those bodies of water affect grape growing.",
     "intro": "Importance of bodies of water: The Atlantic Ocean, Gironde Estuary, Garonne River, Dordogne River",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Sauvignon Blanc and Sémillon; Small amounts of Muscadelle",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "*Connect major Bordeaux AOPs listed with the grapes that are grown and the styles of wine made.",
     "intro": "Cabernet Sauvignon, Merlot, Cabernet Franc; Small Amounts of: Malbec, Petit Verdot, Carménère",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Gravel, Clay, Limestone, Sand; *Connect grape Bordeaux grape varieties with their regions and ideal/primary soil type.",
     "intro": "Gravel, Clay, Limestone, Sand; Bordeaux grape varieties are matched to and purposely grown in the soil type that best suits its needs. *Example: Cabernet Sauvignon in gravel and Merlot in clay",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Evaporation from large bodies of water and springtime precipitation contribute to humidity, mold, and rot.; Black and Grey Rot (not good) / Noble Rot (good for making sweet wines); Springtime frosts; Bordeaux mixture",
     "intro": "Evaporation from large bodies of water and springtime precipitation contribute to humidity, mold, and rot. Humidity is beneficial for the formation of noble rot in sweet wine production, especially in Sauternes.",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Region/ Sub-Region/Appellation dependent:; Blends of grape varieties; Dry white wines; Dry red wines; Botrytis-affected sweet wines; Use of new French oak for red and white wines",
     "topic": "Winemaking"
    },
    {
     "certified": "",
     "intro": "Appellation dependant. Range of from dry red wines, dry white wines to lusciously sweet white wines.",
     "topic": "Style"
    },
    {
     "certified": "",
     "intro": "Regional Appellation; Subregional Appellations; Commune Appellations",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "Graves AOP; - Barsac AOP; \"Right Bank\"; - Lalande-de-Pomerol AOP; - Montagne-St-Émilion AOP; * Identify locations on a map and the type(s) of wines made",
     "intro": "Regional Appellation: Bordeaux AOC; \"Left Bank\"; Sub-Region Appellation: Médoc AOP; Sub-Region Appellation: Haut-Médoc AOP; Commune Appellations: Margaux AOP, Pauillac AOP, St-Estèphe AOP, St-Julien AOP; Graves AOP; - Pessac-Léognan AOP; - Sauternes AOP; Entre-Deux-Mers AOP; \"Right Bank\"; - Pomerol AOP; - St-Émilion AOP; - St-Émilion Grand Cru AOP; *Identify locations on a map and the type(s) of wines made in each appellation",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "Cru Bourgeois:; Created in 1930s. Three levels of classification; 1855 Classification:; - History:; - Inclusion of Haut Brion and why; - First Growths: (château and commune); - Second Growths: (château and commune); Classification of Graves (1959); Classification for both red and white wines; Top Producer: Château Haut Brion; Classification of Sauternes (1855); Superior First Growth (Premier Cru Supérieur); Pomerol: No Classification; St-Émilion Classification (1959); Multi-tiered; St-Émilion Premiers Grands Crus Classés A; St-Émilion Premiers Grands Crus Classés B; St-Émilion Grands Crus Classés",
     "intro": "1855 Classification; History of the classification; Only one change: The elevation of Château Mouton Rothschild from second growth to first in 1973.; First Growths:; 1. Château Lafite Rothschild; 2. Château Latour; 3. Château Mouton Rothschild; 4. Château Margaux; 5. Château Haut-Brion; Pomerol: No classification; St-Émilion: Classification exists, it is multi-tiered, revised periodically, highly controversial.",
     "topic": "Wine Law / Classification"
    },
    {
     "certified": "A Certified Sommelier should be able to recognize the name and label of these châteaux, know the wine-style produced, and identify it the region in Bordeaux it is made.; 1855 Classification; First Growths: (château and commune) (5); Second Growths: (château and commune) (14); Graves Top Producer: Château Haut Brion; Sauternes Top Producer: Château d'Yquem; Pomerol Top Producers: (5); Château Pétrus; Château Lafleur; Le Pin; Clos l'Eglise; St-Émilion top Producers (5); Château Angélus; Château Ausone; Château Cheval-Blanc; Château Pavie; Château Figeac",
     "intro": "A Introductory Sommelier Course student should be able to recognize the name and label of the following châteaux and identify them as being from the Bordeaux region of France.; Château Lafite Rothschild (Pauillac); Château Latour (Pauillac); Château Mouton Rothschild (Pauillac); Château Margaux (Margaux); Château Haut-Brion (Graves); Château d'Yquem (Sauternes); Château Petrus (Pomerol); Château Ausone (St-Émilion); Château Cheval- Blanc (St-Émilion)",
     "topic": "Wine Law / Classification / Producers"
    },
    {
     "certified": "",
     "intro": "Barrique; Château",
     "topic": "General Terms"
    },
    {
     "certified": "Understand the connection between yearly weather/vintage variation/wine style/and wine selling price; *Know the top vintages of the last 15 years and understand why they are top vintages.",
     "intro": "Every vintage is very different. Yearly weather affects the wine style and the selling price.",
     "topic": "Vintage"
    },
    {
     "certified": "Deeper knowledge of the history of Bordeaux to gain a better understanding of the region as it is today.; Marriage of Eleanor of Aquitaine; The Dutch draining of the Gironde Estuary; Slave trade port; Today: largest region of AOP wine production in France.; Global image evolution of market and style. Highly regarded ratings. How has the perception of Bordeaux changed?",
     "intro": "Marriage of Eleanor of Aquitaine; Dutch innovation and exportation; Slave trade port; Today: largest region of AOP wine production in France; Global image, evolution of market and style.",
     "topic": "History & Lore"
    },
    {
     "certified": "Decanting young Bordeaux for aeration, decanting aged Bordeaux for sediment. Service temperatures.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Know important classic pairings with the various styles of Bordeaux and why they pair well.",
     "intro": "Bold red wines with beef and lamb, rich sweet wines with dessert and foie gras.",
     "topic": "Food and Beverage Pairing"
    },
    {
     "certified": "Understanding Bordeaux vintages and styles to understand price differences, appropriate purchasing and recommendations tableside in a restaurant.",
     "intro": "",
     "topic": "Business of the Sommelier"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "FRANCE - BURGUNDY",
   "group": "france",
   "id": "burgundy",
   "map": {
    "cats": {
     "certified": [
      "Burgundy"
     ],
     "intro": [
      "Burgundy"
     ]
    },
    "chapters": {
     "certified": [
      "Burgundy"
     ],
     "intro": [
      "burgundy"
     ]
    },
    "countries": [
     "france"
    ],
    "grapes": [
     "Chardonnay",
     "Pinot Noir",
     "Gamay"
    ],
    "regions": [
     "burgundy",
     "beaujolais"
    ],
    "serviceRef": [
     "glassware",
     "digestifs"
    ],
    "techniques": [
     "malolactic",
     "carbonic-maceration",
     "whole-bunch",
     "lees-batonnage",
     "oak",
     "enrichment-acidification",
     "frost",
     "old-vines-density",
     "traditional-method"
    ]
   },
   "name": "France: Burgundy",
   "order": 4,
   "outcome": {
    "certified": "After studying this section, a candidate will be able to identify major villages, grand crus, soil types, and winemaking styles for each area of Burgundy. A Certified Sommeliers will recognize iconic producers and be able to recommend and sell food pairings with the various wines from Burgundy to a guest.",
    "intro": "After studying this section, a student will be able to identify Burgundy and the five major regions within Burgundy on a map. Students will learn the history that influences the region, prominent soil types, the classification hierarchy, and grape varieties associated with each area. Students should be able to recognize major villages and highlighted significant vineyards within the Côte d'Or."
   },
   "pages": [
    12,
    13,
    14
   ],
   "questions": [
    {
     "a": 0,
     "exp": "Close planting makes each vine compete with its neighbours for water and nutrients, so it grows less vigorously, roots deeper and carries a small crop of more concentrated fruit; the permitted yield then falls as the tier rises. The consequence is cost: rows a metre apart need straddle tractors and a great deal of handwork, which the Court asks a Certified candidate to weigh.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-n33p9hux",
     "opts": [
      "Fewer, more concentrated bunches",
      "Bunches with much thicker skins",
      "More bunches, each more dilute",
      "Bunches ripening a month later"
     ],
     "q": "Côte d'Or growers plant around ten thousand vines to the hectare. What follows for the crop each vine carries?",
     "row": "Grape Growing"
    },
    {
     "accept": [
      "228",
      "228 litres",
      "228 litre",
      "228 l",
      "228l",
      "228 liters",
      "two hundred and twenty-eight",
      "two hundred and twenty eight",
      "two hundred twenty-eight",
      "two hundred twenty eight"
     ],
     "ans": "228 litres",
     "exp": "The Burgundian pièce holds 228 litres, a little more than the 225 litre Bordeaux barrique; Chablis keeps a half-size cask of its own, the feuillette. Red Burgundy spends twelve to eighteen months in the pièce after a cold soak and fermentation in open vats, with the share of new oak rising from village to grand cru.",
     "id": "e-kjxvq3i9",
     "q": "Red Burgundy is traditionally raised in the pièce. How many litres does that barrel hold?",
     "row": "Winemaking",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Petit Chablis and village Chablis are raised almost entirely in steel to keep their green apple and saline edge, while many premier and grand cru wines spend part of their time in barrel, usually old wood that adds texture rather than toast. The Court asks this gradient alongside the Mâconnais one (Mâcon-Villages in steel, Pouilly-Fuissé often in barrel) and the Beaujolais one.",
     "grapes": [
      "Chardonnay"
     ],
     "id": "e-lvrha6cy",
     "opts": [
      "Chablis",
      "Chablis Grand Cru",
      "Chablis Premier Cru",
      "Petit Chablis"
     ],
     "q": "Oak in Chablis rises with rank. At which level is a grower most likely to ferment or age part of the wine in barrel?",
     "row": "Winemaking"
    },
    {
     "a": 1,
     "exp": "Coq au vin, like boeuf bourguignon, is braised in red Burgundy, and the Pinot Noir's bright acidity and moderate tannin meet the sauce without overwhelming the meat. Bouillabaisse belongs to Provence and its rosé, and choucroute and tarte flambée to Alsace; Chablis or Aligoté goes with the Burgundian snails and gougères.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-6gmoq7v0",
     "opts": [
      "Choucroute garnie",
      "Coq au vin",
      "Tarte flambée",
      "Bouillabaisse"
     ],
     "q": "A guest wants a Burgundian dish for a village Pommard. Which classic, braised in red wine with lardons, mushrooms and small onions, is the regional match?",
     "row": "Food and Beverage Pairing"
    },
    {
     "a": 3,
     "exp": "The seven Chablis Grands Crus, all on one slope on the right bank of the Serein facing southwest, are Blanchot, Bougros, Les Clos, Grenouilles, Preuses, Valmur and Vaudésir. Montée de Tonnerre, Fourchaume and Vaillons are among the important Premiers Crus the Court also asks a Certified candidate to recognise.",
     "grapes": [
      "Chardonnay"
     ],
     "id": "e-tjhwyeve",
     "opts": [
      "Fourchaume",
      "Vaillons",
      "Montée de Tonnerre",
      "Vaudésir"
     ],
     "q": "Which of these climats is one of the seven Chablis Grands Crus?",
     "row": "Wine Law / Appellation/ Classification"
    },
    {
     "accept": [
      "vosne-romanée",
      "vosne-romanee",
      "vosne romanée",
      "vosne romanee",
      "vosne-romanée aop",
      "vosne"
     ],
     "ans": "Vosne-Romanée",
     "exp": "Vosne-Romanée holds the densest cluster of great red sites in Burgundy: Romanée-Conti, La Romanée, La Tâche, Richebourg, Romanée-Saint-Vivant and La Grande Rue, with Échezeaux and Grands-Échezeaux in neighbouring Flagey. The Court's Certified cell asks every Côte de Nuits village with the Grands Crus it holds.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-bhbee0pm",
     "q": "Richebourg and Romanée-Saint-Vivant are Grands Crus within which Côte de Nuits village?",
     "row": "Wine Law / Appellation/ Classification",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Raveneau and Dauvissat are Chablis domaines, famed for premier and grand cru wines raised in old barrels, and the Court sets them beside the Côte d'Or's great domaines and the large négociants such as Louis Jadot, Louis Latour and Joseph Drouhin. A domaine grows its own grapes; a négociant buys grapes or wine and bottles them under its own name.",
     "grapes": [
      "Chardonnay"
     ],
     "id": "e-v70pa1mj",
     "opts": [
      "Côte de Nuits",
      "Mâconnais",
      "Chablis",
      "Côte Chalonnaise"
     ],
     "q": "The Court names Raveneau and Dauvissat among the Burgundy domaines to know. Where do they make their wine?",
     "row": "Producers/Proprietary Brand"
    },
    {
     "accept": [
      "grape pomace",
      "pomace",
      "the pomace",
      "pomace from winemaking",
      "pressed grape skins",
      "grape skins",
      "skins",
      "skins and seeds",
      "skins and pips",
      "skins, seeds and stems",
      "pressings",
      "the pressings",
      "grape solids",
      "the solids left after pressing"
     ],
     "ans": "Grape pomace",
     "exp": "Marc is distilled from the pomace, the skins, pips and stems left after pressing, and Marc de Bourgogne is usually aged in oak before release; Italy's equivalent is grappa. It is the spirit that washes the rind of Époisses, and the Court names it in its Non-Wine Production row for Burgundy.",
     "id": "e-sssc0y3q",
     "q": "Marc de Bourgogne, the region's own brandy, is distilled from what?",
     "row": "Non-Wine Production",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Set of five non-contiguous regions in eastern France.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Cool Continental",
     "topic": "Geography: Climate Category"
    },
    {
     "certified": "How do the hills, aspect. and slopes affect ripening potential of a vineyard site.",
     "intro": "Hills, aspect and slope of vineyards",
     "topic": "Geography: Physical Features"
    },
    {
     "certified": "",
     "intro": "Chardonnay, Aligoté (in small amounts); *Connect the Chardonnay grape variety with the major regions and appellations mentioned above.",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Pinot Noir, Gamay; *Connect both of these grape varieties with major regions and appellations mentioned above",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Kimmeridgian, Portlandian, marl, schist, chalk, limestone",
     "intro": "Chablis and Côte d'Or: Limestone, clay; Beaujolais: Granite",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Frost hazard in Chablis; Distinction in style between Chardonnay and Pinot Noir in Chablis, Côte d'Or, and Chalonnaise as a consequence of geography.; Benefits/consequences of planting density.; Oidium and Mildew.; General effects of limestone soils on vine vigor.",
     "intro": "",
     "topic": "Grape Growing"
    },
    {
     "certified": "Bâttonage; Cold soak/prefermentation maceration; Stem inclusion, whole cluster fermentation, semi-carbonic maceration.; Piéce barrel size.; Chaptalization.; Variations in oak usage between Grand Cru/Premier/Village in Chablis.; Variations in oak usage in Mâconnais (Mâcon-Villages vs. Pouilly-Fuissé).; Variations in oak usage between Beaujolais Nouveau/Villages/Cru.",
     "intro": "Malolactic fermentation; Carbonic maceration; Use of new French Oak",
     "topic": "Winemaking"
    },
    {
     "certified": "Major sources for Crémant sparkling wines made in the traditional method.",
     "intro": "Dry white wines; Dry red wines",
     "topic": "Style"
    },
    {
     "certified": "",
     "intro": "Recognize the regions of Burgundy on a map:; 1. Chablis; 2. Côte d'Or; - Côte de Nuits; - Côte de Beaune; 3. Côte Chalonnaise; 4. Mâconnais; 5. Beaujolais",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "",
     "intro": "Regional AOP / Villages AOP / Premier Cru AOP / Grand Cru AOP",
     "topic": "Wine Law / Appellations / Classification"
    },
    {
     "certified": "Chablis: Chablis AOP vs. Petit Chablis AOP. Know the names of all Chablis Grands Crus (7) and recognize Important Chablis Premier Crus.; Côte d'Or; Côte de Nuits-Villages AOP; Côte de Beaune-Villages AOP; Côte de Nuits: Know all villages and the Grand Cru vineyards (if applicable) in each village.; Côte de Beaune: Know all villages and the Grand Cru vineyards (if applicable) in each village.; Beaujolais: Identification of the 10 Beaujolais Crus. Recognize the lieu-dit Côte du Py in Morgon.; Côte Chalonnaise:; Bouzeron AOP: white wines from 100% Aligoté; Rully AOP, Mercurey AOP, Givry AOP, Montagny AOP; Mâcon AOP: Pouilly-Fuissé AOP has Premier Cru designated vineyards.",
     "intro": "Regional AOP: Bourgogne AOP; Chablis AOP:; Village / Premier Cru / Grand Cru AOPs; * Recognize the Chablis Grand Cru Les Clos AOP.; Côte d'Or:; Consist of two Regional AOPs: Côte de Nuits and Côte de Beaune. Each has Village / Premier Cru / Grand Cru AOPs; *Recognize selected Villages of the Côte de Beaune and the Côte de Nuits.; Côte de Nuits Village AOPs: Gevrey-Chambertin AOP, Morey-St.-Denis AOP, Chambolle-Musigny AOP, Vougeot AOP, Vosne-Romanée AOP, and Nuits-St.-Georges AOP; Côte de Beaune Village AOPs: Pommard AOP, Volnay AOP, Meursault AOP, Chassagne-Montrachet AOP, Puligny-Montrachet AOP; Beaujolais AOP:; Beaujolais-Villages / Beaujolais Cru; * Recognize the Beaujolais Cru Morgon AOP.",
     "topic": "Wine Law / Appellation/ Classification"
    },
    {
     "certified": "",
     "intro": "Négociant; Domaine; Clos; Monopole; Vieilles Vignes",
     "topic": "Label Terms"
    },
    {
     "certified": "Lieu dit / lieux dits",
     "intro": "",
     "topic": "General Terms"
    },
    {
     "certified": "Distinguish major Négociants from Domaines.; Chablis: Dauvissat, Raveneau; Côte d'Or: DRC, Leroy, Coche-Dury, Domaine Leflaive, Roulot; Larger Négociants: Louis Jadot, Louis Latour, Albert Bichot, Bouchard Père et Fils/William Fèvre, Drouhin, Faiveley",
     "intro": "",
     "topic": "Producers/Proprietary Brand"
    },
    {
     "certified": "Know general quality levels of vintages in the past 10 years.",
     "intro": "",
     "topic": "Vintage"
    },
    {
     "certified": "",
     "intro": "The Monastic and Napoleonic Code of Inheritance influences on classification, fragmentation of vineyards, and vineyard ownership.",
     "topic": "History & Lore"
    },
    {
     "certified": "Marc de Bourgogne",
     "intro": "",
     "topic": "Non-Wine Production"
    },
    {
     "certified": "Proper glassware for white and red Burgundy.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Recognize importance of oak use, acid, and tannin levels for successful food and beverage pairings. Classic Burgundian dishes with the wines of Burgundy.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "FRANCE - LOIRE VALLEY",
   "group": "france",
   "id": "loire",
   "map": {
    "cats": {
     "certified": [
      "Loire"
     ],
     "intro": [
      "Loire"
     ]
    },
    "chapters": {
     "certified": [
      "Loire"
     ],
     "intro": [
      "loire"
     ]
    },
    "countries": [
     "france"
    ],
    "grapes": [
     "Melon de Bourgogne",
     "Chenin Blanc",
     "Cabernet Franc",
     "Sauvignon Blanc",
     "Pinot Noir"
    ],
    "regions": [
     "loire"
    ],
    "serviceRef": [],
    "techniques": [
     "sur-lie",
     "noble-rot",
     "traditional-method"
    ]
   },
   "name": "France: Loire Valley",
   "order": 5,
   "outcome": {
    "certified": "After studying this section, a candidate will know the major regions and selected appellations of the Loire Valley and be able to connect the grape varieties to their appellations. Candidates will be able to recommend and sell food pairings with Loire Valley wines. Certified Sommeliers will recognize iconic producers and be able to recommend and sell food pairings with wines from the Loire Valley to a guest.",
    "intro": "After studying this section, a student will be able to identify the Loire Valley and selected regions and appellations on a map. Students will be able to connect primary grape varieties to their appellations."
   },
   "pages": [
    15,
    16
   ],
   "questions": [
    {
     "a": 2,
     "exp": "Domaine Huet has made Vouvray since 1928 from three named sites, Le Haut-Lieu, Le Mont and Clos du Bourg, farmed biodynamically, in every style from sec through demi-sec to moelleux and pétillant. Montlouis faces Vouvray across the river, Savennières is dry Chenin near Angers and Saumur is known for sparkling wine and Cabernet Franc.",
     "grapes": [
      "Chenin Blanc"
     ],
     "id": "e-oxn4dc8t",
     "opts": [
      "Saumur",
      "Montlouis-sur-Loire",
      "Vouvray",
      "Savennières"
     ],
     "q": "Domaine Huet, one of the two Loire producers the Court names, is the benchmark estate of which Chenin Blanc appellation?",
     "row": "Producers/Proprietary Brand"
    },
    {
     "a": 0,
     "exp": "Off-dry Chenin meets the gentle sweetness of pork and fruit, and lightly spiced dishes, without tasting thin, while its acidity cuts the fat. Oysters want a bone dry white such as Muscadet or a sec Vouvray, a ribeye wants a tannic red, and a chocolate tart would make a demi-sec taste sour, since a wine should be at least as sweet as the dessert.",
     "grapes": [
      "Chenin Blanc"
     ],
     "id": "e-iifmwkud",
     "opts": [
      "Roast pork with apples",
      "Rare grilled ribeye",
      "Raw oysters on ice",
      "Dark chocolate tart"
     ],
     "q": "A demi-sec Vouvray, its touch of sugar held in check by high acidity, is on the table. Which dish is its natural match?",
     "row": "Food and Beverage Pairing"
    },
    {
     "accept": [
      "moelleux",
      "moëlleux",
      "moelleuse",
      "moeleux",
      "vouvray moelleux"
     ],
     "ans": "Moelleux",
     "exp": "Vouvray and Montlouis label their still Chenin sec, demi-sec, moelleux or doux, rising in sweetness, and moelleux is the Court's Certified label term for the richly sweet style. Its sugar, kept fresh by Chenin's acidity, suits fruit tarts, foie gras and blue cheese, while a sec goes with river fish and a demi-sec with pork or spice.",
     "grapes": [
      "Chenin Blanc"
     ],
     "id": "e-2jx0wa4d",
     "q": "A fruit tart or a slice of foie gras calls for a sweeter Chenin. Which label term, the step above demi-sec, marks that Vouvray?",
     "row": "Label Terms",
     "sa": 1
    },
    {
     "accept": [
      "layon",
      "the layon",
      "layon river",
      "the layon river",
      "river layon",
      "the river layon"
     ],
     "ans": "The Layon",
     "exp": "The Layon runs north-west through Anjou to join the Loire below Angers, and its autumn morning mists, burnt off by dry afternoons, breed the noble rot behind Coteaux du Layon, Bonnezeaux and Quarts de Chaume, the Loire's only Grand Cru since 2011. The Court names the Layon as its Certified physical feature for the valley.",
     "grapes": [
      "Chenin Blanc"
     ],
     "id": "e-9tn1om2z",
     "q": "Quarts de Chaume and Bonnezeaux both stand on slopes above which tributary of the Loire, south of Angers?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "accept": [
      "kimmeridgian clay",
      "kimmeridgian",
      "kimmeridgian marl",
      "kimmeridgian limestone",
      "kimmeridgean clay",
      "kimmeridgean",
      "kimmeridgian clay and limestone"
     ],
     "ans": "Kimmeridgian clay",
     "exp": "Terres blanches are the pale Kimmeridgian clay and marl, full of tiny fossil oyster shells, on the western slopes of Sancerre around Chavignol, the same seam that underlies Chablis; they give the firmest, longest-lived Sauvignon Blanc. The Court's other Certified soil, silex, is the flint nearer the river and across it at Pouilly-Fumé.",
     "grapes": [
      "Sauvignon Blanc"
     ],
     "id": "e-vpv4dr5h",
     "q": "Sancerre growers call one of their soils terres blanches. Which of the Court's two Certified Loire soil terms describes it?",
     "row": "Soil: Type and/or Name",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Coulée de Serrant, a walled amphitheatre of Chenin Blanc above the Loire with its own appellation inside Savennières, turned to biodynamic farming in the early 1980s and became a reference for the movement across France and beyond. Clos Rougeard is a Saumur-Champigny estate, Clos Naudin is in Vouvray and Château de Tracy in Pouilly-Fumé.",
     "grapes": [
      "Chenin Blanc"
     ],
     "id": "e-0rp222ed",
     "opts": [
      "Clos Rougeard",
      "Château de Tracy",
      "Clos Naudin",
      "Coulée de Serrant"
     ],
     "q": "The Court's Loire history row points to the grower who made one Savennières estate a world reference for biodynamic farming. Which estate?",
     "row": "History & Lore"
    },
    {
     "a": 1,
     "exp": "Melon B is the name the appellation rules use for Muscadet's grape, the B standing for blanc, and the Court prints it with the older Melon de Bourgogne in brackets: the variety came from Burgundy after the hard winter of 1709. Folle Blanche makes Gros Plant du Pays Nantais, Chasselas makes Pouilly-sur-Loire, and Pineau de la Loire is an old name for Chenin Blanc.",
     "grapes": [
      "Melon de Bourgogne"
     ],
     "id": "e-ddtr2ora",
     "opts": [
      "Folle Blanche",
      "Melon B",
      "Pineau de la Loire",
      "Chasselas"
     ],
     "q": "Which name does the Court now print for the grape of Muscadet, the variety long known by a Burgundian name?",
     "row": "Wine: Grape Variety Names"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Spans from the Atlantic Coast to Central France",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Four Regions of the Loire Valley from West to East:; Pays Nantais; Anjou-Saumur; Touraine; Central Vineyards",
     "topic": "Geography:"
    },
    {
     "certified": "Layon River",
     "intro": "The Loire river is the longest river in France beginning in the center of France in the Massif Central.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Pays Nantais: Cool and wet Maritime; Anjou-Saumur: Maritime moving toward Continental, humid; Touraine: Continental; Central Vineyards: Continental",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Pays Nantais: Muscadet AOP, Muscadet de Sèvre-et-Maine AOP; Anjou-Saumur: Saumur AOP, Saumur-Champigny AOP, Savennières AOP, Quarts-de-Chaume AOP, Bonnezeaux AOP; Touraine: Chinon AOP, Bourgueil AOP, Vouvray AOP; Central Vineyards: Sancerre AOP, Pouilly-Fumé AOP",
     "topic": "Geography: Appellations"
    },
    {
     "certified": "Silex, Kimmeridgian Clay",
     "intro": "Tuffeau in Vouvray",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "",
     "intro": "Presence of botrytis in Bonnezeaux AOP and Quarts-de-Chaume AOP due to humidity from multiple rivers.",
     "topic": "Grape Growing"
    },
    {
     "certified": "Sparkling Wines: Vouvray Pétillant, Crémant de Loire",
     "intro": "Muscadet: Sur lie aging; Saumur: Traditional method sparkling wines, dry white wines, dry red wines, lusciously sweet wines; Touraine: Vouvray can be sparkling, dry, off-dry and sweet in style.",
     "topic": "Winemaking"
    },
    {
     "certified": "",
     "intro": "Muscadet: Melon B (formerly called Melon de Bourgogne); Anjou-Saumur: Chenin Blanc, Cabernet Franc; Touraine: Chenin Blanc, Cabernet Franc; Central Vineyards: Sauvignon Blanc, Pinot Noir",
     "topic": "Wine: Grape Variety Names"
    },
    {
     "certified": "Moelleux",
     "intro": "Sur lie, Sec, Demi-Sec",
     "topic": "Label Terms"
    },
    {
     "certified": "Domaine Huet, Nicolas Joly",
     "intro": "",
     "topic": "Producers/Proprietary Brand"
    },
    {
     "certified": "Nicolas Joly",
     "intro": "",
     "topic": "History & Lore"
    },
    {
     "certified": "Pairings with the different sweetness levels of Chenin Blanc. Classic pairings with Sancerre and Pouilly-Fumé",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "FRANCE - THE RHÔNE VALLEY",
   "group": "france",
   "id": "rhone",
   "map": {
    "cats": {
     "certified": [
      "Rhône"
     ],
     "intro": [
      "Rhône"
     ]
    },
    "chapters": {
     "certified": [
      "Rhône"
     ],
     "intro": [
      "rhone"
     ]
    },
    "countries": [
     "france"
    ],
    "grapes": [
     "Syrah / Shiraz",
     "Viognier",
     "Marsanne",
     "Roussanne",
     "Grenache / Garnacha",
     "Mourvèdre / Monastrell",
     "Cinsault",
     "Muscat Blanc"
    ],
    "regions": [
     "rhone"
    ],
    "serviceRef": [
     "glassware",
     "temperatures"
    ],
    "techniques": [
     "blending-assemblage",
     "vin-doux-naturel",
     "steep-slopes",
     "training-pruning"
    ]
   },
   "name": "France: The Rhône Valley",
   "order": 6,
   "outcome": {
    "certified": "After studying this section, a candidate will be able to identify the primary and secondary AOCs and Crus, know their locations, primary grape varieties, and general style. Candidates will understand and connect differences in quality and price among AOPs/Crus to physical features and landscape. Certified Sommeliers will recognize iconic producers and be able to recommend and sell food pairings with wines from the Rhône Valley to a guest.",
    "intro": "After studying this section, a student will be able to identify the Rhône Valley on a map. A student will know the climatic differences between the Northern and Southern parts of the region, the primary grape varieties, and understand the importance of the Mistral wind and the Rhône River. Students will be able to associate the most important AOCs and Crus with their grape varieties and know a classification system exists in the Southern Rhône. Students will have the ability to describe the major characteristics of a typical Northern Rhône Syrah and a typical Southern Rhône blend. Students will know the major soil types of the Northern Rhône and the famous soil type of the Southern Rhône."
   },
   "pages": [
    17,
    18
   ],
   "questions": [
    {
     "accept": [
      "avignon"
     ],
     "ans": "Avignon",
     "exp": "Avignon, the papal city of the fourteenth century, anchors the southern Rhône, with Châteauneuf-du-Pape just to its north; Lyon lies above the northern end of the valley, and the vines thin out for some fifty kilometres between Valence and Montélimar. The Court asks a Certified candidate to place all three cities.",
     "id": "e-ukloopxn",
     "q": "The Court puts the unofficial divide between the Rhône's two halves at Montélimar. Which city does it call the main city of the south?",
     "row": "Geography: Location",
     "sa": 1
    },
    {
     "accept": [
      "50",
      "50%",
      "50 %",
      "50 per cent",
      "50 percent",
      "fifty",
      "fifty per cent",
      "fifty percent",
      "half",
      "a half",
      "one half",
      "at least half",
      "at least 50"
     ],
     "ans": "50 per cent",
     "exp": "Côtes du Rhône Villages red must be at least half Grenache, with Syrah and Mourvèdre together at least a fifth, while plain Côtes du Rhône red from the southern zone needs at least 30 per cent Grenache. The Court's Certified wine law row asks these Grenache minimums beside the 12.5 per cent alcohol floor of Châteauneuf-du-Pape.",
     "grapes": [
      "Grenache / Garnacha"
     ],
     "id": "e-9ju5uco4",
     "q": "A red Côtes du Rhône Villages must hold at least what share of Grenache?",
     "row": "Wine Law",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Grenache ripens to high sugar and alcohol with generous fruit but carries little colour and soft tannin, and its wine browns and oxidises early. Syrah adds colour, structure and dark fruit, and Mourvèdre adds tannin and a resistance to oxidation, which is why the Court asks why the south blends rather than bottling single varieties as the north does.",
     "grapes": [
      "Grenache / Garnacha",
      "Syrah / Shiraz",
      "Mourvèdre / Monastrell"
     ],
     "id": "e-x5tvwutd",
     "opts": [
      "Low alcohol and a thin body",
      "Searing acidity and green tannin",
      "Late ripening and frost damage",
      "Pale colour and a tendency to oxidise"
     ],
     "q": "Grenache brings warmth and sweet red fruit to a southern blend. Which weakness of the grape do Syrah and Mourvèdre make good?",
     "row": "Winemaking"
    },
    {
     "a": 0,
     "exp": "White Hermitage, mostly Marsanne with Roussanne, is full, broad and waxy with modest acidity and ages for decades, so it fills the place of a rich Chardonnay at table; Condrieu's Viognier does the same with more perfume. Tavel is a dry rosé, Cornas a tannic Syrah and Muscat de Beaumes-de-Venise a sweet fortified wine.",
     "grapes": [
      "Marsanne",
      "Roussanne"
     ],
     "id": "e-4dema7gx",
     "opts": [
      "Hermitage Blanc",
      "Tavel",
      "Muscat de Beaumes-de-Venise",
      "Cornas"
     ],
     "q": "A guest who loves rich, barrel-fermented Chardonnay wants to try something from the Rhône instead. Which wine would you pour?",
     "row": "Food and Beverage Pairing"
    },
    {
     "a": 2,
     "exp": "Muscat de Beaumes-de-Venise is a vin doux naturel: neutral grape spirit stops the fermentation of Muscat Blanc à Petits Grains, leaving sweetness at about 15 per cent alcohol, and the wine is bottled young without oak to keep its grape and orange blossom aroma. Serve it cold with fruit desserts.",
     "grapes": [
      "Muscat Blanc"
     ],
     "id": "e-7yl5ly8b",
     "opts": [
      "Fully fortified and aged in solera",
      "Unfortified and aged in new oak",
      "Lightly fortified and unoaked",
      "Lightly fortified and aged oxidatively in glass"
     ],
     "q": "Which description fits Muscat de Beaumes-de-Venise as the Court sets out its style?",
     "row": "Style"
    },
    {
     "a": 1,
     "exp": "A trellis lets a tractor and a harvesting machine work the row, so the Court notes that modern southern plantings are often trellised for economic reasons. The traditional gobelet does the other three jobs: it shades its own bunches, stands low against the mistral and needs little water, which is why old Grenache is still grown that way.",
     "grapes": [
      "Grenache / Garnacha"
     ],
     "id": "e-jhiebx0k",
     "opts": [
      "Shelter from the mistral",
      "Machine work and lower costs",
      "Shade for the bunches",
      "Water saved in drought"
     ],
     "q": "Many modern southern Rhône vineyards are trained on wires rather than as gobelet bush vines. What chiefly drives that change?",
     "row": "Grape Growing"
    },
    {
     "accept": [
      "séguret",
      "seguret",
      "sablet",
      "visan",
      "valréas",
      "valreas",
      "plan de dieu",
      "roaix",
      "rochegude",
      "saint-gervais",
      "saint gervais",
      "st-gervais",
      "signargues",
      "massif d'uchaux",
      "massif d uchaux",
      "puyméras",
      "puymeras",
      "sainte-cécile",
      "sainte-cecile",
      "sainte cecile",
      "suze-la-rousse",
      "suze la rousse",
      "gadagne",
      "saint-maurice",
      "saint maurice",
      "saint-pantaléon-les-vignes",
      "saint-pantaleon-les-vignes",
      "saint pantaleon les vignes",
      "rousset-les-vignes",
      "rousset les vignes",
      "chusclan",
      "vaison-la-romaine",
      "vaison la romaine",
      "nyons",
      "saint-andéol",
      "saint-andeol",
      "saint andeol",
      "st-maurice",
      "st-andéol",
      "st-andeol",
      "ste-cécile",
      "ste-cecile",
      "st-pantaléon-les-vignes",
      "st-pantaleon-les-vignes"
     ],
     "ans": "Séguret (also Sablet, Visan, Valréas, Plan de Dieu and others)",
     "exp": "Above plain Côtes du Rhône Villages stand the Villages with a geographical name, among them Séguret, Sablet, Visan, Valréas, Roaix, Rochegude and the multi-commune area of Plan de Dieu, each with lower yields and stricter rules. Villages that prove themselves are promoted to cru, as Cairanne was in 2015 and Laudun in 2024, and then leave the Côtes du Rhône name off the label.",
     "id": "e-sgqhc08y",
     "q": "Name one of the geographical names a grower may add after Côtes du Rhône Villages on a label.",
     "row": "Wine Law / Appellations / Classification",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "Lyon to the north.; Montélimar is the unofficial dividing line between the two regions.; Avignon is the main city of the south.",
     "intro": "Between Burgundy and Provence.; There is a 30-mile gap between the Northern Rhône and Southern Rhône sections.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Northern Rhône: Moderate Continental; Southern Rhône: Mediterranean",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Topography of north versus south.; Northern Rhône: Steep hills, the Rhône River reflects light and provides more exposure. It also concentrates the effects of Mistral.; Southern Rhône: Rolling hills, the Rhône River provides cooling impact and less slope.; Consideration of slope and aspect on each appellation.",
     "intro": "The Rhône river originates in Switzerland, flows south through France to the Mediterranean Sea.; Northern Rhône: Steep hillsides; Southern Rhône: Flatter terrain",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Northern Rhône: Decomposed granite, schist; Southern Rhône: Galets, alluvial, limestone",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Modern plantings in the south are often trellised and often dictated by economics.",
     "intro": "Northern Rhône: Terraced slopes with staked vines to reinforce from Mistral wind.; Southern Rhône: Traditionally bush vines to conserve water and provide shade from the sun.",
     "topic": "Grape Growing"
    },
    {
     "certified": "Cause and effect of co-fermentation.; Why wines are blended in the South which includes a deeper dive into Grenache and its strengths and weaknesses.",
     "intro": "Northern Rhône: Co-fermented wines in the north.; Southern Rhône: Blended wines in the south.",
     "topic": "Winemaking"
    },
    {
     "certified": "Southern Rhône: Bourboulenc, Clairette Blanche, Picpoul",
     "intro": "Northern Rhône: Viognier, Marsanne, Roussanne,; Southern Rhône: Grenache Blanc",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Southern Rhône: Cinsault",
     "intro": "Northern Rhône: Syrah,; Southern Rhône: Grenache, Mourvèdre",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Northern Rhône:; - Château Grillet AOP; - Which grape varieties are permitted in each Northern Rhône AOP?; Southern Rhône:; - Learn examples of Côtes-du-Rhône Villages; - Understand the elevation differences between Côtes-du-Rhône, Côtes-du-Rhône Villages, Cru AOP (single villages).",
     "intro": "Northern Rhône AOPs:; - Côte Rôtie AOP; - Crozes-Hermitage AOP; - Hermitage AOP; - St.-Joseph AOP; - Condrieu AOP; - Cornas AOP; *Note the styles of wine made in each AOP; Southern Rhône: Classification tiers; - Côtes-du-Rhône AOP; - Côtes-du-Rhône Villages AOP (named villages); - Crus/Single Village Examples:; - Châteauneuf-du-Pape AOP; - Tavel AOP; - Gigondas AOP; - Vacqueyras AOP; - Muscat de Beaumes-de-Venise AOP; *Note the primary grape varieties and the primary style of wine made in each AOP",
     "topic": "Wine Law / Appellations / Classification"
    },
    {
     "certified": "Minimum abv. in Châteauneuf-du-Pape; Minimum Grenache requirements of Southern Rhône AOPs.",
     "intro": "",
     "topic": "Wine Law"
    },
    {
     "certified": "Other examples of Vins Doux Naturels",
     "intro": "Vins Doux Naturels; example Muscat de Beaumes-de-Venise",
     "topic": "Label Terms"
    },
    {
     "certified": "",
     "intro": "Cru single village; Co-fermentation which northern Rhône AOP uses co-fermentation?",
     "topic": "General Terms"
    },
    {
     "certified": "Muscat de Beaumes-de-Venise: lightly fortified, unoaked",
     "intro": "Spicy, meaty reds; rich, aromatic whites",
     "topic": "Style"
    },
    {
     "certified": "Chave, Chapoutier, Guigal, Beaucastel, Rayas",
     "intro": "",
     "topic": "Producers"
    },
    {
     "certified": "Papal crest on bottles",
     "intro": "Papal occupation",
     "topic": "History & Lore"
    },
    {
     "certified": "Glassware choice for Syrah and Grenache.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Pair Rhône wines with meaty dishes involving herbs, bacon, peppercorn.; Choose appropriate weights, intensity (i.e., Côtes-du-Rhône vs Châteauneuf-du-Pape).; White Rhône wines can be a Chardonnay alternative.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "FRANCE - CHAMPAGNE",
   "group": "france",
   "id": "champagne",
   "map": {
    "cats": {
     "certified": [
      "Champagne"
     ],
     "intro": [
      "Champagne"
     ]
    },
    "chapters": {
     "certified": [
      "Champagne"
     ],
     "intro": [
      "champagne"
     ]
    },
    "countries": [
     "france"
    ],
    "grapes": [
     "Chardonnay",
     "Pinot Noir"
    ],
    "regions": [
     "champagne"
    ],
    "serviceRef": [
     "sparkling",
     "temperatures",
     "glassware"
    ],
    "techniques": [
     "traditional-method",
     "blending-assemblage",
     "rose-methods"
    ]
   },
   "name": "France: Champagne",
   "order": 7,
   "outcome": {
    "certified": "After studying this section, a candidate will know all the steps in the traditional method, the major regions of Champagne, and their major styles. A Certified Sommelier will and be able to speak knowledgeably about vintages over the last 10 years, recognize iconic producers, and be able to recommend and sell food pairings with wines from Champagne to a guest.",
    "intro": "After studying this section, a student will be able to identify Champagne as a region in France on a map, know the grape varieties that make up Champagne, define the points that make Champagne unique from other sparkling wines by understanding the Champagne Method."
   },
   "pages": [
    19,
    20
   ],
   "questions": [
    {
     "accept": [
      "marne",
      "the marne",
      "la marne",
      "marne river",
      "the marne river",
      "river marne",
      "the river marne"
     ],
     "ans": "The Marne",
     "exp": "The Marne flows west past Épernay and gives its name to the Vallée de la Marne, where Meunier leads in the west and Pinot Noir around Aÿ and Mareuil. The Court pairs it with the Grande Montagne de Reims, the wooded plateau to the north whose slopes hold nine of the seventeen Grand Cru villages; Reims itself stands on the Vesle.",
     "id": "e-fzeuvghm",
     "q": "Épernay, home of Moët & Chandon and the Avenue de Champagne, stands on the banks of which river?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The liqueur de tirage is wine with about 24 grams of sugar a litre, selected yeast, a yeast nutrient and a riddling aid such as bentonite or alginate, which makes the spent yeast fall as a heavy, compact deposit. The liqueur d'expédition, added after disgorging, is wine with sugar or concentrated grape must, and its sugar sets the style from Brut Nature to Doux.",
     "id": "e-lu3b48tf",
     "opts": [
      "Oak chips",
      "Egg white",
      "Bentonite",
      "Grape spirit"
     ],
     "q": "What does a Champagne house usually add to the liqueur de tirage so that the deposit slides cleanly down into the neck at riddling?",
     "row": "Winemaking"
    },
    {
     "a": 0,
     "exp": "The Court gives the plantings as 38 per cent Pinot Noir, 32 per cent Meunier and 30 per cent Chardonnay, so the two black grapes cover about seven tenths of the vineyard. Pinot Blanc is one of the minor permitted varieties with Pinot Gris, Arbane and Petit Meslier, and the specification of 2025 added Chardonnay rose.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-0y6l9qwe",
     "opts": [
      "Pinot Noir",
      "Chardonnay",
      "Meunier",
      "Pinot Blanc"
     ],
     "q": "By the Court's figures, which grape covers the largest share of the Champagne vineyard, about 38 per cent?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "a": 1,
     "exp": "The Comité Interprofessionnel du Vin de Champagne, now styled the Comité Champagne, brings the growers and the houses together to manage the appellation's shared business: harvest yields, the reserve, research, promotion and the defence of the name. The national appellation authority is the INAO; the Échelle des Crus, the other term in the Court's row, ranked the villages as Grand Cru or Premier Cru.",
     "id": "e-vpbag18i",
     "opts": [
      "The club of the great houses",
      "The joint body of growers and houses",
      "A cooperative of grower producers",
      "The national appellation authority"
     ],
     "q": "What is the Comité Interprofessionnel du Vin de Champagne that the Court names in its classification row?",
     "row": "Wine Law / Classification"
    },
    {
     "accept": [
      "grandes marques",
      "grande marques",
      "grande marque",
      "grand marques",
      "grand marque",
      "the grandes marques",
      "les grandes marques"
     ],
     "ans": "Grandes Marques",
     "exp": "Grandes Marques, the great brands, is the name for the large historic houses, taken from a syndicate of houses that existed until the 1990s; it has no legal standing today. The Court asks a Certified candidate to match the Grandes Marques to their prestige cuvées and to know three producers outside them and three growers.",
     "id": "e-sucmx7u2",
     "q": "Which collective term does the Court use for Champagne's great historic houses, such as Krug, Roederer and Taittinger?",
     "row": "General Terms",
     "sa": 1
    },
    {
     "accept": [
      "veuve clicquot",
      "veuve clicquot ponsardin",
      "veuve-clicquot",
      "veuve cliquot",
      "clicquot",
      "cliquot"
     ],
     "ans": "Veuve Clicquot",
     "exp": "La Grande Dame, a Pinot Noir dominant vintage cuvée, is named for the widow Clicquot, who ran the house from 1805 and is credited with the riddling table. Other pairings the Court expects: Dom Pérignon from Moët & Chandon, Cristal from Louis Roederer and Comtes de Champagne from Taittinger.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-epala0e2",
     "q": "A guest orders La Grande Dame from the prestige page of the list. Which house made it?",
     "row": "Producer/Proprietary Brand",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Larmandier-Bernier is a grower at Vertus in the Côte des Blancs, making biodynamic Chardonnay with low dosage, and its labels carry the code RM. Taittinger, Veuve Clicquot and Moët & Chandon are négociant-manipulant houses (NM) that buy much of their fruit; the Court asks for three growers beside the Grandes Marques.",
     "grapes": [
      "Chardonnay"
     ],
     "id": "e-guqiujgk",
     "opts": [
      "Veuve Clicquot",
      "Moët & Chandon",
      "Taittinger",
      "Larmandier-Bernier"
     ],
     "q": "Which of these producers is a grower, a récoltant-manipulant making Champagne only from its own vines?",
     "row": "Producer/Proprietary Brand"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "49th parallel, one of the most northerly wine growing regions.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Cool continental",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Grande Montagne; Marne River",
     "intro": "No protection from Atlantic influence; therefore, unpredictable weather, rain, frost, and hail threats.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Limestone, chalk",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "",
     "intro": "Grapes are picked earlier to preserve natural acidity.",
     "topic": "Grape Growing"
    },
    {
     "certified": "Champagne Method:; The contents of liqueur de tirage.; The contents of and liqueur d'expédition and how it affects the style of the wine.",
     "intro": "Champagne Method Steps:; Still wine is made; Assemblage of cuvée; Bubbles are created using liqueur de tirage; Sur lie aging - Autolysis; Riddling (rémuage) using pupitre or gyropalette; Disgorging (dégorgement); Dosage added using liqueur d'expédition",
     "topic": "Winemaking"
    },
    {
     "certified": "30% Chardonnay for plantings",
     "intro": "Chardonnay",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "38% Pinot Noir, 32% Meunier for plantings.",
     "intro": "Pinot Noir, Meunier",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Côte des Bar; Côte de Sézanne",
     "intro": "Region: Champagne AOP; Subregions: Vallée de la Marne, Côte des Blancs, Montagne de Reims",
     "topic": "Wine Law / Appellations: AOP"
    },
    {
     "certified": "Échelle des Crus: Grand Cru Villages and Premier Cru Villages exist and may be put on labels.; Comité Interprofessionnel du Vin de Champagne",
     "intro": "Non-Vintage: 12 month on lees, min 15 months total aging.; Vintage: min 36 months total aging.",
     "topic": "Wine Law / Classification"
    },
    {
     "certified": "Special Club; Récoltant Manipulant; Négociant Manipulant; Vieilles Vignes",
     "intro": "Blanc de Blancs; Blanc de Noirs; Brut",
     "topic": "Label Terms"
    },
    {
     "certified": "Grandes Marques",
     "intro": "Cuvée de Prestige/Tête de Cuvée; Négociant; Grower",
     "topic": "General Terms"
    },
    {
     "certified": "Single vineyard; Clos; Sweetness levels: Brut Nature, Extra Brut, Brut, Extra Dry, Sec, Demi-Sec, Doux",
     "intro": "Brut, Non-Vintage, Vintage, Blanc de Blancs, Blanc de Noirs, Rosé",
     "topic": "Style"
    },
    {
     "certified": "Be able to match Grandes Marques to their prestige cuvées. Know three non-Grandes Marques producers and three grower producers.",
     "intro": "Moët & Chandon, Roederer, Veuve Clicquot, Taittinger, Charles Heidsieck, Krug",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Know the best vintages going back 15 years.",
     "intro": "",
     "topic": "Vintage"
    },
    {
     "certified": "",
     "intro": "Invention of riddling rack (Madame Clicquot) and gyropalette.",
     "topic": "History & Lore"
    },
    {
     "certified": "CMS-A published sparkling wine opening standards.",
     "intro": "Never point the cork at someone while opening the bottle and never take your hand off the top (the cage and cork) top while removing the cork.",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Champagne is an incredibly versatile beverage that goes with many types of foods.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "FRANCE - ALSACE",
   "group": "france",
   "id": "alsace",
   "map": {
    "cats": {
     "certified": [
      "Alsace"
     ],
     "intro": [
      "Alsace"
     ]
    },
    "chapters": {
     "certified": [
      "Alsace"
     ],
     "intro": [
      "alsace"
     ]
    },
    "countries": [
     "france"
    ],
    "grapes": [
     "Riesling",
     "Gewürztraminer",
     "Pinot Gris / Grigio",
     "Muscat Blanc",
     "Muscat",
     "Pinot Blanc",
     "Silvaner",
     "Chardonnay",
     "Pinot Noir"
    ],
    "regions": [
     "alsace"
    ],
    "serviceRef": [],
    "techniques": [
     "late-harvest",
     "noble-rot",
     "traditional-method"
    ]
   },
   "name": "France: Alsace",
   "order": 8,
   "outcome": {
    "certified": "After studying this section, a candidate will understand the classification of Alsatian wine and be able to identify important Grands Crus vineyard names. A Certified Sommelier will be able to recognize iconic producers and be able to recommend and sell food pairings with wines from Alsace to a guest.",
    "intro": "After studying this section, a student will be able to recognize and locate Alsace as a region in France on a map, identify its main grape varieties, and understand how its geography and history affect the styles of wine made."
   },
   "pages": [
    21,
    22
   ],
   "questions": [
    {
     "a": 0,
     "exp": "The Haut-Rhin is the southern department, higher on average and better sheltered by the Vosges, so it is drier and sunnier and holds many of the most highly regarded sites around Colmar, Riquewihr and Turckheim. The Bas-Rhin to the north lies lower, where the mountains lose height and give less protection.",
     "id": "e-9wjbywsx",
     "opts": [
      "Haut-Rhin",
      "Bas-Rhin",
      "Vosges",
      "Moselle"
     ],
     "q": "In which department, by the Court's account, do many of the most highly regarded Alsace vineyard sites lie?",
     "row": "Geography: Location"
    },
    {
     "accept": [
      "foudre",
      "foudres",
      "a foudre",
      "the foudre",
      "foudre cask",
      "foudre casks"
     ],
     "ans": "Foudre",
     "exp": "A foudre is a large, old oak cask, often oval in Alsace, that gives no oak flavour and lets the wine ferment and rest without masking its fruit; new barriques are rare in the region. The Court's Introductory column notes little or no new oak, and its Certified column asks for the cask's name.",
     "id": "e-jwyyoa4m",
     "q": "What name does the Court give the large, neutral oak casks that line Alsace cellars?",
     "row": "Winemaking",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Hugel has made wine in Riquewihr since the seventeenth century and pressed for the legal definition of Vendanges Tardives and Sélection de Grains Nobles in 1984. Of the Court's other names, Trimbach is in Ribeauvillé, Domaine Weinbach in Kaysersberg below the Schlossberg, Zind-Humbrecht in Turckheim and Marcel Deiss in Bergheim.",
     "id": "e-1ftgz9hw",
     "opts": [
      "Eguisheim",
      "Kaysersberg",
      "Ribeauvillé",
      "Riquewihr"
     ],
     "q": "Hugel et Fils, one of the producers the Court names, is based in which walled Alsace village?",
     "row": "Producers/Proprietary Brand"
    },
    {
     "a": 1,
     "exp": "A dry Riesling, often the wine the meat was marinated in, cuts the richness of the braise with its acidity and matches its savoury depth; dry Pinot Gris or Sylvaner work too. The Court's Alsace pairings are hearty and smoky: choucroute, Flammkuchen and cured meats such as bacon and sausages, which the region's dry whites carry well and its sweet late harvest wines do not.",
     "grapes": [
      "Riesling"
     ],
     "id": "e-zwt2copl",
     "opts": [
      "Muscat Vendanges Tardives",
      "Dry Riesling",
      "Sélection de Grains Nobles",
      "Crémant d'Alsace Rosé"
     ],
     "q": "Baeckeoffe, pork, lamb and beef marinated overnight in white wine and slow-baked with potatoes in a sealed dish, is on the menu. Which Alsace wine is the natural partner?",
     "row": "Food and Beverage Pairing"
    },
    {
     "accept": [
      "crémant d'alsace",
      "cremant d'alsace",
      "crémant d alsace",
      "cremant d alsace",
      "crémant de alsace",
      "cremant de alsace",
      "crémant",
      "cremant",
      "crémant d'alsace aop",
      "cremant d'alsace aop"
     ],
     "ans": "Crémant d'Alsace",
     "exp": "Crémant d'Alsace, an appellation since 1976, is made by second fermentation in bottle, mostly from Pinot Blanc and Auxerrois with Chardonnay allowed and the rosé from Pinot Noir alone, and spends at least nine months on its lees. It is the second largest French sparkling appellation after Champagne and costs far less, which is the value case the Court's business row makes.",
     "grapes": [
      "Pinot Blanc"
     ],
     "id": "e-tywacntm",
     "q": "Which Alsace appellation does the Court name as an alternative, cost-effective source of traditional method sparkling wine?",
     "row": "BOS",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Brand is a steep granite Grand Cru above Turckheim, giving powerful Riesling and Pinot Gris. Of the Court's other examples, Schlossberg is the granite Riesling site at Kientzheim and Kaysersberg, first of the Grands Crus in 1975, and Hengst at Wintzenheim was one of the first two opened to Pinot Noir with the 2022 vintage; Thann is home to Rangen and Andlau to Kastelberg.",
     "grapes": [
      "Riesling"
     ],
     "id": "e-ih0o2v3p",
     "opts": [
      "Thann",
      "Andlau",
      "Turckheim",
      "Bergheim"
     ],
     "q": "Brand, one of the Court's example Alsace Grands Crus, rises above which town?",
     "row": "Wine Law / Appellations: AOPs"
    },
    {
     "accept": [
      "90",
      "90%",
      "90 %",
      "90 per cent",
      "90 percent",
      "ninety",
      "ninety per cent",
      "ninety percent",
      "over 90",
      "over 90%",
      "more than 90",
      "more than 90%"
     ],
     "ans": "90 per cent",
     "exp": "More than 90 per cent of Alsace wine is white, from Riesling, Pinot Gris, Gewurztraminer, Muscat, Pinot Blanc, Auxerrois and Silvaner, with Pinot Noir the one black grape for rosé, red and Crémant rosé. The Court gives the share in the same cell as the Vosges rain shadow that makes Alsace one of the driest and sunniest regions of France.",
     "id": "e-jqjj9wfb",
     "q": "By the Court's figure, Alsace wine made from white grape varieties accounts for more than what share of the region's output?",
     "row": "Soil: Type and/or Name",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "Divided into two departments:; Bas-Rhin: Lies to the north, has a lower in average elevation and is less protected from the Vosges Mountains.; Haut-Rhin: Lies to the south, has a higher average elevation, and is more protected from the Vosges Mountains. Many of the best regarded vineyard sites are located in the Haut-Rhin.",
     "intro": "Northeastern France, on the border with Germany.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Cool, continental climate with a dry, sunny growing season.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Vosges Mountains; Rhine River",
     "topic": "Geography: Physical Features"
    },
    {
     "certified": "Very diverse and includes: Marl, limestone, gneiss, schist, sandstone, granite, clay, and volcanic soils. Grape varieties are matched with the soil types they do best in.",
     "intro": "Soils vary widely in their type and origin as a result of a long history of geological activity.; The importance of the Vosges mountains in creating a rain shadow that affects vineyards. One of France’s driest and sunniest climates. Long, cool, and dry growing season. Better vineyards planted on slopes facing east/southeast. Over 90% of Alsace wines are made from white grape varieties.",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Foudre: name for the large neutral casks used.",
     "intro": "Large neutral casks, little to no use of new oak. Sparkling, dry, off-dry, and sweet wines are made.",
     "topic": "Winemaking"
    },
    {
     "certified": "Pinot Blanc, Silvaner, Chardonnay, Auxerrois",
     "intro": "Riesling, Gewurztraminer, Pinot Gris, Muscat",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Pinot Noir",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Alsace AOP wines must be bottled in the traditional \"Vin du Rhin\" / \"Flûte d'Alsace\" bottle.; Examples of important Alsace Grands Crus Vineyards: Schlossberg, Brand, Goldert, Hengst; Exceptions to the Alsace Grand Cru AOP grape variety rule: One of the Grand Crus uses Sylvaner, two of them allow blending, two allow red wine.",
     "intro": "Must be 100% of the grape variety if the name is mentioned on the label.; Alsace/Vin d’Alsace AOP: Main appellation of Alsace; Alsace Grand Cru AOP:; 51 Grands Crus vineyards; Traditionally, only four grape varieties are allowed for Alsace Grand Cru AOP. Riesling, Pinot Gris, Gewurztraminer, Muscat.; *The fifth is now Pinot Noir as of the 2022 vintage.; Crémant d’Alsace AOP: Traditional method sparkling wine",
     "topic": "Wine Law / Appellations: AOPs"
    },
    {
     "certified": "Edelzwicker, Gentil",
     "intro": "Crémant",
     "topic": "Label Terms"
    },
    {
     "certified": "",
     "intro": "Vendange Tardive (VT): Late-harvest, rich, full-bodied, not always sweet.; Sélection de Grains Nobles (SGN): Botrytis-affected grapes, made in small quantities, only in top vintages.",
     "topic": "Style"
    },
    {
     "certified": "Trimbach, Domaine Weinbach, Marcel Deiss, Hugel et Fils, Pierre Sparr, Zind-Humbrecht",
     "intro": "",
     "topic": "Producers/Proprietary Brand"
    },
    {
     "certified": "",
     "intro": "This region has a history of French and German political rule because it was a strategic area that the two countries fought over for many years. Alsace has a distinctive culture, evident in its architecture, language, and food.",
     "topic": "History & Lore"
    },
    {
     "certified": "Choucroute, Flammkuchen (tarte flambée), Baeckeoffe, and many rich, smoky cured meats such as bacon and sausages.",
     "intro": "Wide range of pairings with diversity of wine styles.",
     "topic": "Food and Beverage Pairing"
    },
    {
     "certified": "Crémant d' Alsace is an alternative, cost-effective source for traditional method sparkling wine.",
     "intro": "",
     "topic": "BOS"
    }
   ]
  },
  {
   "certifiedOnly": true,
   "court": "FRANCE - SOUTH FRANCE *CERTIFIED SOMMELIER EXAM ONLY*",
   "group": "france",
   "id": "south-france",
   "map": {
    "cats": {
     "certified": [
      "Southern France"
     ],
     "intro": []
    },
    "chapters": {
     "certified": [
      "Southern France"
     ],
     "intro": []
    },
    "countries": [
     "france"
    ],
    "grapes": [
     "Grenache / Garnacha",
     "Syrah / Shiraz",
     "Mourvèdre / Monastrell",
     "Cinsault",
     "Carignan",
     "Vermentino",
     "Muscat Blanc",
     "Malbec",
     "Tannat",
     "Petit Manseng"
    ],
    "regions": [
     "provence",
     "languedoc-roussillon"
    ],
    "serviceRef": [],
    "techniques": [
     "vin-doux-naturel",
     "rose-methods",
     "noble-rot",
     "traditional-method"
    ]
   },
   "name": "France: South France",
   "order": 9,
   "outcome": {
    "certified": "After studying this section, a candidate will be able to match regions in the South of France with their grape varieties and styles of wine made.",
    "intro": ""
   },
   "pages": [
    23,
    24,
    25
   ],
   "questions": [
    {
     "accept": [
      "gros manseng",
      "gros-manseng",
      "gros mansang"
     ],
     "ans": "Gros Manseng",
     "exp": "Jurançon is made from Gros Manseng and Petit Manseng: the higher-yielding Gros Manseng leads the dry Jurançon Sec, while thick-skinned Petit Manseng, left to shrivel on the vine late into the autumn, gives the sweeter plain Jurançon, which the Court calls off-dry. The Court lists the two Mansengs as the Southwest's white grapes.",
     "id": "e-5vkm96nd",
     "q": "Which grape, the larger-berried sibling of Petit Manseng, leads the dry white the Court lists as Jurançon Blanc Sec?",
     "row": "Wine: White Grape Variety Names",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Court lists Madiran as Tannat with Cabernet Franc and Cabernet Sauvignon, and Cahors as Côt (Malbec) with Merlot and Tannat; both appellations make dry red wine only. Their firm tannin is why the Court pairs them with duck breast, rack of lamb, foie gras, cassoulet and Périgord truffles.",
     "grapes": [
      "Tannat"
     ],
     "id": "e-1n2iool6",
     "opts": [
      "Carignan and Cinsault",
      "Merlot and Côt",
      "The two Cabernets",
      "Syrah and Grenache"
     ],
     "q": "Madiran AOP is Tannat-dominant. Which partner grapes does the Court list beside it?",
     "row": "Wine Law / Appellations: AOPs"
    },
    {
     "accept": [
      "bandol",
      "bandol aop",
      "bandol aoc",
      "bandol rouge"
     ],
     "ans": "Bandol",
     "exp": "All three are Bandol estates: Tempier built the appellation's name on Mourvèdre, Pibarnon farms high limestone terraces at La Cadière-d'Azur, and Pradeaux at Saint-Cyr-sur-Mer makes reds of almost pure Mourvèdre. Bandol red must be at least half Mourvèdre and spend eighteen months in wood, and the Court pairs it with beef and lamb.",
     "grapes": [
      "Mourvèdre / Monastrell"
     ],
     "id": "e-zmvsx1iz",
     "q": "Domaine Tempier, Château de Pibarnon and Château Pradeaux are the Court's named producers for which Provence appellation?",
     "row": "Producer/Proprietary Brand",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "Domaine du Mas Blanc at Banyuls-sur-Mer and the Rhône house of Chapoutier are the Court's Banyuls producers. Banyuls and Banyuls Grand Cru are Grenache vins doux naturels from the schist terraces above the sea at the Spanish border; Maury is the neighbouring Grenache vin doux naturel of the upper Agly, Fitou a dry red of the Languedoc and Bandol a Provence red.",
     "grapes": [
      "Grenache / Garnacha"
     ],
     "id": "e-pegb2yy0",
     "opts": [
      "Banyuls",
      "Maury",
      "Bandol",
      "Fitou"
     ],
     "q": "The Court names Domaine du Mas Blanc and Chapoutier as producers to know for which appellation?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "a": 2,
     "exp": "Côtes de Provence is rosé-dominant, pale and dry, from Grenache, Cinsault, Syrah and Mourvèdre, and the Court gives Provence as a whole nearly 90 per cent dry rosé. Rolle, the Vermentino of Italy, leads its small output of white; Bandol, by contrast, is dominated by red.",
     "grapes": [
      "Cinsault",
      "Grenache / Garnacha"
     ],
     "id": "e-a5q98yz9",
     "opts": [
      "Dry red",
      "Dry white",
      "Dry rosé",
      "Sweet white"
     ],
     "q": "Which style dominates the output of Côtes de Provence AOP, as the Court describes it?",
     "row": "Wine Law / Appellations: AOPs"
    },
    {
     "accept": [
      "bouillabaisse",
      "la bouillabaisse",
      "bouillabaise",
      "bouillebaisse"
     ],
     "ans": "Bouillabaisse",
     "exp": "Bouillabaisse, rockfish simmered with saffron, fennel and orange peel and served with rouille, meets a cold, dry Provence rosé or a white Cassis, whose acidity and herbs match the broth. The Court's other southern pairings are Banyuls with chocolate, figs and blue cheese, Cahors and Madiran with duck and cassoulet, and Monbazillac with fruit desserts and foie gras.",
     "id": "e-sjs44a66",
     "q": "The Court pairs Provence dry rosé with shellfish, fish and one Marseille fish stew above all. Name the stew.",
     "row": "Food and Beverage Pairing",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Limoux lies high in the upper Aude valley, cooler and touched by the Atlantic, so its red is Merlot-dominant where most Languedoc reds rest on Grenache, Carignan and Syrah. Its dry whites come from Mauzac, Chenin Blanc and Chardonnay, and Crémant de Limoux adds Pinot Noir for white and rosé traditional method sparkling wine.",
     "grapes": [
      "Merlot"
     ],
     "id": "e-10543p19",
     "opts": [
      "Grenache",
      "Merlot",
      "Syrah",
      "Carignan"
     ],
     "q": "Still red Limoux AOP is led by which grape, by the Court's account?",
     "row": "Wine Law / Appellations: AOPs"
    },
    {
     "accept": [
      "dordogne",
      "the dordogne",
      "la dordogne",
      "dordogne river",
      "the dordogne river",
      "river dordogne",
      "the river dordogne"
     ],
     "ans": "The Dordogne",
     "exp": "The Dordogne flows west past Bergerac, south-east of Bordeaux's Right Bank, then on past Libourne to meet the Garonne in the Gironde. Bergerac makes dry whites, reds and rosés from the Bordeaux grapes, and Monbazillac, on the river's left bank facing the town, makes botrytised sweet white from Sémillon, Sauvignon Blanc and Muscadelle.",
     "id": "e-abvnj70y",
     "q": "Which river rises in the Massif Central and flows west through the vineyards of Bergerac and Monbazillac?",
     "row": "Geography: Location",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Greek settlers founded Massalia, now Marseille, around 600 BC and planted the first vines in what became France, which is why the Court calls Provence the birthplace of French wine. The Court dates grape growing in the Southwest from 125 BC, under Roman rule.",
     "id": "e-pb8lsw5c",
     "opts": [
      "AD 300",
      "AD 1100",
      "125 BC",
      "600 BC"
     ],
     "q": "By the Court's account, Provence, the birthplace of wine in France, has made wine since about when?",
     "row": "History & Lore"
    }
   ],
   "rows": [
    {
     "certified": "Provence: French Mediterranean coastline; From the border of Italy to the Rhône River.; Languedoc-Roussillon: Encompasses the entire southern coast of France, from the border of Italy along the Mediterranean coast line to the border with Spain.; Languedoc; Roussillon; Southwest France: South of Bordeaux and North of the Languedoc; Spanish Pyrenees border; Dordogne: Southeast of Bordeaux’s Right Bank; The Dordogne River; Flows west from its origin in the Massif Central, runs through the region of Bergerac.",
     "intro": "",
     "topic": "Geography: Location"
    },
    {
     "certified": "Provence: Mediterranean; Languedoc-Roussillon: Mediterranean; Southwest France: Continental; Dordogne: Continental",
     "intro": "",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Provence: Mediterranean Sea, rolling foothills; Languedoc-Roussillon: Rolling hillsides, steep cliffs, Mediterranean Sea; Southwest France: Pyrenees Mountains to the south, landlocked; Dordogne: Dordogne River",
     "intro": "",
     "topic": "Geography: Physical Features"
    },
    {
     "certified": "Languedoc-Roussillon: Large amount of IGP wines.; Pays d'Oc IGP",
     "intro": "",
     "topic": "Grape Growing"
    },
    {
     "certified": "Provence: Nearly 90% dry rosé production.; Languedoc-Roussillon: Red, white, rosé, sweet wines, sparkling wines; Vins doux naturels are made by the process of mutage, a wine-making technique for making sweet wines where fermentation is stopped by the addition of neutral grape spirit.",
     "intro": "",
     "topic": "Winemaking"
    },
    {
     "certified": "Provence: Clairette, Ugni Blanc (Trebbiano in Italy), Rolle (Vermentino in Italy); Languedoc-Roussillon: Chardonnay, Sauvignon Blanc, Clairette, Viognier, Muscat, Mauzac, Chenin Blanc; Southwest France: Petit Manseng, Gros Manseng",
     "intro": "",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Provence: Grenache, Cinsault, Syrah, Mourvèdre; Languedoc-Roussillon: Grenache, Syrah, Carignan, Mourvèdre, and Cinsault; Southwest France: Cabernet Sauvignon, Merlot, Cot (Malbec), Tannat",
     "intro": "",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Provence: Côtes de Provence AOP; Grape Varieties: Cinsault, Grenache, Mourvèdre, Syrah; Wine Style: Dry rosé-dominant; Bandol AOP; Grape Varieties: Mourvèdre (min 50%), Grenache, Cinsault; Wine Style: Dry, red wine-dominant; Languedoc-Roussillon: LANGUEDOC; Limoux AOP; White Wines; Grape Varieties: Mauzac, Chenin Blanc, Chardonnay; Wine Style: Dry white wines; Red Wines; Grape Varieties: Merlot-dominant; Wine Style: Dry red wines; Crémant de Limoux AOP; Grape Varieties: Chardonnay, Chenin Blanc, Mauzac, Pinot Noir; Wine Style: Traditional method white and rosé sparkling wine.; Fitou AOP; Grape Varieties: Grenache, Carignan, Syrah, Mourvèdre; Wine Style: Dry red wines; Banyuls AOP/Banyuls Grand Cru AOP; Grape Varieties: Grenache; Wine Style: Vins Doux Naturels; Muscat de Rivesaltes AOP; Grape Varieties: Muscat Blanc à Petits Grains, Muscat of Alexandria; Wine Style: Vins Doux Naturels; Southwest France: Cahors AOP; Grape Varieties: Cot (Malbec)-dominant, additionally Merlot and Tannat; Wine Style: Dry red wines only; Madiran AOP; Grape Varieties: Tannat-dominant, additionally Cabernet Franc, Cabernet Sauvignon; Wine Style: Dry red wines only; Jurançon AOP; Grape Varieties: Gros Manseng and Petit Manseng; Wine Style: White wines; Blanc Sec: Dry white wines; Blanc: Off-dry white wines; Dordogne: Bergerac AOP; Dordogne River; White Wine; Grape Varieties: Sémillon, Sauvignon Blanc, Sauvignon Gris, Muscadelle; Wine Style: Dry white wines; Red and Rosé Wine; Grape Varieties: Cabernet Sauvignon, Cabernet Franc, Cot (Malbec), Merlot; Wine Style: Dry red and rosé; Monbazillac AOP; Dordogne River; White Wine; Grape Varieties: Muscadelle, Sauvignon Blanc, Sémillon; Wine Style: Botrytis-affected sweet wines",
     "intro": "",
     "topic": "Wine Law / Appellations: AOPs"
    },
    {
     "certified": "Provence: Bandol: Domaine Tempier, Château de Pibarnon, Château Pradeaux; Languedoc-Roussillon: Banyuls: Chapoutier, Domaine du Mas Blanc",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Provence: Birthplace of wine in France. Has been producing wine since 600 BCE.; Southwest France: Has been growing grapes since 125 BC.",
     "intro": "",
     "topic": "History & Lore"
    },
    {
     "certified": "Provence: Dry rosé: Shellfish, fish, local fare, bouillabaisse.; Bandol: Beef, lamb; Languedoc-Roussillon: Banyuls:; Sweet: chocolate, nuts, coffee, creamy desserts, figs, prunes, dried fruit desserts.; Savory: Warm foie gras and figs, savory dishes with elements of sweetness, with fruit or in a sauce.; Salty blue cheeses; Southwest France: Cahors and Madiran:; Duck breast, rack of lamb, Foie Gras, cassoulet, dishes featuring Périgord truffles.; Dordogne: Monbazillac:; Sweet: Fruit-based desserts, peaches, caramel, citrus, apricots, pears, apple-based desserts.; Savory: Foie gras, savory dishes with sweeter sauces.; Salty cheeses, creamy cheeses.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "ITALY - NORTHERN ITALY - PIEDMONT",
   "group": "italy",
   "id": "piedmont",
   "map": {
    "cats": {
     "certified": [
      "Italy North"
     ],
     "intro": [
      "Italy"
     ]
    },
    "chapters": {
     "certified": [
      "Italy North"
     ],
     "intro": [
      "piedmont"
     ]
    },
    "countries": [
     "italy"
    ],
    "grapes": [
     "Nebbiolo",
     "Barbera",
     "Dolcetto",
     "Cortese",
     "Muscat Blanc",
     "Chardonnay",
     "Pinot Noir"
    ],
    "regions": [
     "piedmont"
    ],
    "serviceRef": [
     "decanting",
     "glassware",
     "temperatures"
    ],
    "techniques": [
     "oak",
     "extraction",
     "ageing-terms",
     "tank-method",
     "traditional-method"
    ]
   },
   "name": "Italy: Piedmont",
   "order": 10,
   "outcome": {
    "certified": "After studying this section, a candidate will know the major DOCGs within Piedmont, know their grape varieties, understand their styles, aging requirements, and labeling laws. A Certified Sommelier will be able to recognize iconic producers and be able to sell and recommend food pairings with Barolo and Barbaresco to a guest.",
    "intro": "After studying this section, a student will know the grape varieties, appellations, and styles of important Piedmont wines."
   },
   "pages": [
    26,
    27
   ],
   "questions": [
    {
     "accept": [
      "the po",
      "po",
      "po river",
      "the po river",
      "river po",
      "the river po",
      "fiume po"
     ],
     "ans": "The Po",
     "exp": "The Po rises on Monte Viso near the French border, gathers the Tanaro and the other rivers of Piedmont, and runs east across the broad Po Valley to its delta south of Venice. The Court names it as Piedmont's body of water, with the Alps and the Apennines, which wall the region on three sides, as its mountains.",
     "id": "e-p6d3z56y",
     "q": "Which river, Italy's longest, rises in the Alps of western Piedmont and flows east past Turin across the whole of northern Italy?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The Court's soil cell asks for the difference within Barolo: Serravallian sandstone and compacted marl (once called Helvetian) in the east gives firm, slow wines, while the younger, bluish Tortonian marl of La Morra and Barolo gives perfume and earlier charm. Kimmeridgian and Portlandian are the clays and limestones of Chablis.",
     "grapes": [
      "Nebbiolo"
     ],
     "id": "e-bnsusjpu",
     "opts": [
      "Serravallian",
      "Tortonian",
      "Kimmeridgian",
      "Portlandian"
     ],
     "q": "The eastern Barolo communes of Serralunga d'Alba, Monforte d'Alba and Castiglione Falletto stand on older, sandier ground that gives denser, longer lived wine. Which geological formation is it?",
     "row": "Soil: Type and/or Name"
    },
    {
     "accept": [
      "9",
      "nine",
      "9 months",
      "nine months"
     ],
     "ans": "Nine months",
     "exp": "Barbaresco must age at least 26 months, counted from 1 November of the harvest year, with nine of them in wood, against Barolo's 38 months with 18 in wood; a Barbaresco Riserva needs 50 months in all.",
     "grapes": [
      "Nebbiolo"
     ],
     "id": "e-u0g0zvfn",
     "q": "Of Barbaresco's minimum ageing before release, how many months must be spent in wood?",
     "row": "Winemaking",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Normale, one of the Court's two label terms here, is the everyday name for the standard Barolo or Barbaresco against the Riserva, which ages 62 months for Barolo and 50 for Barbaresco. Neither denomination has a Superiore or a Classico tier, and Vigna introduces a named vineyard.",
     "id": "e-s8fmeu97",
     "opts": [
      "Classico",
      "Vigna",
      "Superiore",
      "Normale"
     ],
     "q": "In the trade, what word names the standard bottling of Barolo or Barbaresco, released after the basic minimum ageing rather than held back for the Riserva?",
     "row": "Label Terms"
    },
    {
     "accept": [
      "nebbia",
      "la nebbia"
     ],
     "ans": "Nebbia",
     "exp": "Nebbia is the Court's general term for the fog that fills the Langhe valleys in autumn, and Nebbiolo is usually said to take its name from it, either from the fog of its late harvest or from the misty bloom on its berries.",
     "grapes": [
      "Nebbiolo"
     ],
     "id": "e-o09dhftj",
     "q": "Autumn fog drifts off the Alpine foothills and settles in the Langhe valleys at harvest time. What is the local word for it?",
     "row": "General Terms",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Barbera d'Asti is the DOCG the Court names for dry red Barbera, at least 90 per cent of the grape from the Asti and Monferrato hills, with Nizza carved out of it as a DOCG of its own in 2014; Barbera d'Alba, Piemonte and Colli Tortonesi are DOCs.",
     "grapes": [
      "Barbera"
     ],
     "id": "e-wxnmzifv",
     "opts": [
      "Colli Tortonesi Barbera",
      "Piemonte Barbera",
      "Barbera d'Asti",
      "Barbera d'Alba"
     ],
     "q": "Piedmont's most planted red grape, high in acid and low in tannin, is bottled under several denominations. Which of these carries DOCG rank?",
     "row": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "a": 3,
     "exp": "Asili stands with Ovello, Montestefano and Pora among the Court's top Barbaresco vineyards; Cannubi, Brunate and Monprivato are the three top Barolo sites it names, each now an official vineyard name a label may carry.",
     "grapes": [
      "Nebbiolo"
     ],
     "id": "e-it9w1qom",
     "opts": [
      "Brunate",
      "Monprivato",
      "Cannubi",
      "Asili"
     ],
     "q": "Which of these named vineyards lies in the Barbaresco zone rather than in Barolo?",
     "row": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "a": 1,
     "exp": "The modernists paired short, warm macerations and rotary fermenters with small new French barriques for colour, softness and earlier appeal; the traditionalists kept long macerations and large old Slavonian botti, and most houses now sit somewhere between the two camps.",
     "grapes": [
      "Nebbiolo"
     ],
     "id": "e-n2l5ayhw",
     "opts": [
      "Large Slavonian botte",
      "New French barrique",
      "Chestnut cask",
      "Clay amphora"
     ],
     "q": "Which ageing vessel became the badge of the modernist Barolo and Barbaresco producers in the 1980s and 1990s?",
     "row": "History & Lore"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "On the border of Switzerland and France.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Continental",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Tanaro River; Langhe Hills",
     "intro": "Mountains: Apennine Mountains, Alps, which provide a rain shadow. Piedmont refers to the foothills of the Alps.; Bodies of Water: Po River (Po River Valley)",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Moscato, Arneis, Cortese",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Spanna: Local name for Nebbiolo in Gattinara and Ghemme.",
     "intro": "Nebbiolo, Barbera, Dolcetto, Brachetto",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Barolo: Differences in soil types.",
     "intro": "",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Actual Requirements:; Barolo: 38 months total aging with a min of 18 months in oak.; Barbaresco: 26 months total aging with a min of 9 months in oak.",
     "intro": "Traditional aging in large barrels.; Aging requirements (law) exist for Barolo and Barbaresco.",
     "topic": "Winemaking"
    },
    {
     "certified": "",
     "intro": "IGP, DOC, DOCG",
     "topic": "Classification"
    },
    {
     "certified": "Barolo DOCG: Identify on a map. Know Tanaro River and Langhe Hills.; Top Barolo Vineyards: Cannubi, Brunate, and Monprivato; Barbaresco DOCG: Identify on a map. Know Tanaro River and Langhe Hills.; Top Barbaresco Vineyards: Ovello, Montestefano, Pora, Asili; Asti DOCG: Fully sparkling Moscato.; Brachetto d'Acqui DOCG: Off-dry, semi-sparkling red wine from Brachetto.; Alta Langa DOCG: Metodo Classico sparkling wines, min combined 90% Pinot Noir and/or Chardonnay.; Roero DOCG: Dry red wines from Nebbiolo grape variety.; Roero Arneis DOCG: Dry white wines from Arneis.; Ghemme DOCG: Dry red wines from Nebbiolo, locally known as Spanna.; Gattinara DOCG: Dry red wines from Nebbiolo, locally known as Spanna.",
     "intro": "Barolo DOCG: Dry red wine from the Nebbiolo grape variety.; Barbaresco DOCG: Dry red wines from the Nebbiolo grape variety.; Moscato d'Asti DOCG: Off-dry, semi-sparkling white wine from the Moscato grape variety.; Gavi DOCG: Dry white wines, made from the Cortese grape variety.; Barbera d'Asti DOCG: Dry red wines made from the Barbera grape variety.",
     "topic": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "certified": "Normale; Riserva",
     "intro": "",
     "topic": "Label Terms"
    },
    {
     "certified": "Sorì: best site (privileged site)",
     "intro": "Nebbia: Local name of fog rolling off the foothills of the Alps.",
     "topic": "General Terms"
    },
    {
     "certified": "",
     "intro": "All: Dry, sweet, sparkling, red, white",
     "topic": "Style"
    },
    {
     "certified": "Barolo: Vietti, Giacomo Conterno, Bruno Giacosa, Ceretto, Sandrone, Elio Altare, Giuseppe Mascarello; Barbaresco: Gaja, La Spinetta, Produttori del Barbaresco, Vietti, Bruno Giacosa, Ceretto",
     "intro": "",
     "topic": "Producers/Proprietary Brand"
    },
    {
     "certified": "Know the best vintages for Barolo and Barbaresco over the last 10 years.",
     "intro": "",
     "topic": "Vintage"
    },
    {
     "certified": "Traditional vs. Modernist Barolo and Barbaresco styles.",
     "intro": "",
     "topic": "History & Lore"
    },
    {
     "certified": "Long range of ageability for Barolo and Barbaresco.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Big tannins require meat or fat.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "ITALY - NORTHERN ITALY - LOMBARDY & EMILIA-ROMAGNA",
   "group": "italy",
   "id": "lombardy-emilia-romagna",
   "map": {
    "cats": {
     "certified": [
      "Italy North"
     ],
     "intro": [
      "Italy"
     ]
    },
    "chapters": {
     "certified": [
      "Italy North",
      "Sparkling Wine World"
     ],
     "intro": [
      "lombardy"
     ]
    },
    "countries": [
     "italy"
    ],
    "grapes": [
     "Chardonnay",
     "Pinot Blanc",
     "Pinot Noir",
     "Nebbiolo"
    ],
    "regions": [
     "lombardy"
    ],
    "serviceRef": [
     "sparkling",
     "glassware",
     "temperatures"
    ],
    "techniques": [
     "traditional-method",
     "tank-method",
     "ancestral-method",
     "dried-grapes"
    ]
   },
   "name": "Italy: Lombardy and Emilia-Romagna",
   "order": 11,
   "outcome": {
    "certified": "After studying this section, a student will be able to understand different styles of Franciacorta, know the grape variety and style of Valtellina Superiore DOCG, and know the styles and sub-zones of Lambrusco. A Certified Sommelier recognize iconic producers and be able to sell and recommend food pairings with Franciacorta to a guest.",
    "intro": "After studying this section, a student will understand the style of Franciacorta, its grape varieties, aging requirements, and how it compares to Champagne."
   },
   "pages": [
    28,
    29
   ],
   "questions": [
    {
     "a": 0,
     "exp": "Lombardy runs north to the Swiss border, as the Court's location cell says, with the Valtellina lying just below it; Austria borders Trentino-Alto Adige, France borders Piedmont and Valle d'Aosta, and Slovenia borders Friuli.",
     "id": "e-h5kh33ku",
     "opts": [
      "Switzerland",
      "Slovenia",
      "France",
      "Austria"
     ],
     "q": "Which country lies along Lombardy's northern border, just above the Valtellina?",
     "row": "Geography: Location"
    },
    {
     "a": 0,
     "exp": "Emilia-Romagna stretches across the peninsula from the Po to the Adriatic, Emilia in the west around Modena and Reggio, Romagna in the east, and the Court places it astride the north and the centre; the Marche lies south of it, while Lombardy and Friuli-Venezia Giulia are wholly northern.",
     "id": "e-ehme6gdn",
     "opts": [
      "Emilia-Romagna",
      "Friuli-Venezia Giulia",
      "Marche",
      "Lombardy"
     ],
     "q": "Which region runs from the Po plain south east to the Adriatic at Rimini, straddling northern and central Italy?",
     "row": "Geography: Location"
    },
    {
     "a": 3,
     "exp": "The Court files both regions as cool continental: cold winters and warm summers with no sea to soften them, tempered in Lombardy by its lakes and on the Emilian hills by altitude. Neither is Mediterranean or maritime in the Court's terms.",
     "id": "e-7t9fpcvj",
     "opts": [
      "Mediterranean",
      "Warm maritime",
      "Cool maritime",
      "Cool continental"
     ],
     "q": "Which climate category does the Court give Lombardy and Emilia-Romagna?",
     "row": "Geography: Climate Categories"
    },
    {
     "accept": [
      "iseo",
      "lake iseo",
      "lago d'iseo",
      "lago d iseo",
      "lago di iseo",
      "lago iseo",
      "sebino"
     ],
     "ans": "Lake Iseo",
     "exp": "Lake Iseo, between Bergamo and Brescia, moderates winter cold and summer heat over Franciacorta; it is one of the many lakes the Court says influence Lombardy, with Garda to the east and Como to the west.",
     "id": "e-om7mqd92",
     "q": "Franciacorta's vines grow in the province of Brescia, on low hills at the southern end of a lake that tempers the climate. Name the lake.",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Most Lambrusco is made frizzante or spumante in pressurised tanks by cuve close, the Charmat method, which keeps its fruit bright. The Court adds that some is made by metodo classico or the méthode ancestrale; the transfer method is no Lambrusco technique.",
     "id": "e-pajq2dwz",
     "opts": [
      "Transfer method",
      "Cuve close",
      "Méthode ancestrale",
      "Metodo classico"
     ],
     "q": "By which method does the Court say most Lambrusco is made sparkling?",
     "row": "Winemaking:"
    },
    {
     "accept": [
      "25",
      "25 months",
      "twenty five",
      "twenty five months",
      "twenty-five",
      "twenty-five months"
     ],
     "ans": "25 months",
     "exp": "A non vintage Franciacorta must spend at least 18 months on its lees and may not be released until 25 months after the harvest, the two figures the Court prints; a Millesimato needs 30 months on the lees and a Riserva 60.",
     "id": "e-4m5ahp3n",
     "q": "Counting from the harvest, how many months must pass before a non vintage Franciacorta may be released?",
     "row": "Wine Law/Appellations: DOC and DOCGs",
     "sa": 1
    },
    {
     "accept": [
      "5",
      "five",
      "5 atmospheres",
      "five atmospheres",
      "5 atm",
      "5 bar",
      "five bar",
      "under 5 atmospheres",
      "less than 5 atmospheres",
      "below 5 atmospheres"
     ],
     "ans": "5 atmospheres",
     "exp": "Satèn may hold at most 5 atmospheres, against about 6 for most Franciacorta, which gives its softer, creamier mousse; the Court adds that it is Brut only and made from white grapes, Chardonnay with up to half Pinot Bianco.",
     "id": "e-8ly1ymwa",
     "q": "What is the highest pressure a Franciacorta Satèn may hold in the bottle?",
     "row": "Wine Law/Appellations: DOC and DOCGs",
     "sa": 1
    },
    {
     "accept": [
      "pinot bianco",
      "pinot blanc"
     ],
     "ans": "Pinot Bianco",
     "exp": "Satèn is a white grape Franciacorta, Chardonnay with up to 50 per cent Pinot Bianco as the Court's cell says, so Pinot Nero, which may go into the other Franciacorta styles, is shut out of it.",
     "grapes": [
      "Pinot Blanc",
      "Chardonnay"
     ],
     "id": "e-c50uelro",
     "q": "Chardonnay leads a Franciacorta Satèn. Which grape may make up as much as half of the blend beside it?",
     "row": "Wine Law/Appellations: DOC and DOCGs",
     "sa": 1
    },
    {
     "accept": [
      "dolce"
     ],
     "ans": "Dolce",
     "exp": "Lambrusco is labelled Secco when dry, Amabile when medium sweet and Dolce when sweet, the Court's three sweetness words; Abboccato, a step between Secco and Amabile, also turns up on some labels.",
     "id": "e-5f09h70y",
     "q": "Which word on a Lambrusco label marks the sweetest of the three levels the Court names?",
     "row": "Label Terms",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Ca' del Bosco and Bellavista, both at Erbusco, are the Court's two Franciacorta producers; Ferrari makes Trento DOC, Contratto is a Canelli house for Piedmontese metodo classico, and Villa Sandi is a Prosecco producer.",
     "id": "e-orc7l9rk",
     "opts": [
      "Villa Sandi",
      "Ferrari",
      "Ca' del Bosco",
      "Contratto"
     ],
     "q": "Bellavista is one of the two Franciacorta houses the Court names. Which of these is the other?",
     "row": "Producers/Proprietary Brand"
    },
    {
     "a": 1,
     "exp": "The Court's business cell warns that Lambrusco's gentle frizzante sparkle has a short life once the bottle is open, so a by the glass programme should open bottles to demand, close them with a sparkling stopper and cost in the waste.",
     "id": "e-d4zhod4d",
     "opts": [
      "Its tannin",
      "Its effervescence",
      "Its sweetness",
      "Its colour"
     ],
     "q": "A bar pours Lambrusco by the glass. Which quality of an opened bottle fades first and limits how long it can be sold?",
     "row": "Business of the Sommelier"
    },
    {
     "a": 2,
     "exp": "Lambrusco is served as any other sparkling wine, cold and in a flute or a wine glass, the Court's own service cell, which also points to its published sparkling wine service standards; served warm, its fruit and froth soon tire.",
     "id": "e-ltbv1b5r",
     "opts": [
      "Lightly chilled, in a coupe only",
      "At room temperature, in a tumbler",
      "Cold, in a flute or a wine glass",
      "At cellar temperature, in a large bowl"
     ],
     "q": "How does the Court say a Lambrusco should be served to a guest?",
     "row": "Service of Beverage"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Lombardy: Northern Italy on the border of Switzerland.; Emilia-Romagna: Straddles North and Central Italy.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Cool Continental",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Lombardy:; Mountains: Foothills of the Alps; Bodies of Water: Many lakes influence the region; Emilia-Romagna:; Mountains: Apennine Mountains",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Lombardy: Passito wines made from dried grapes.; Emilia-Romagna:; Frizzante or spumante sparkling wines; Lambrusco: Commonly cuve close but can be Metodo Classico or Methode Ancestrale and can be frizzante or spumante.",
     "intro": "Metodo Classico Sparkling Wines",
     "topic": "Winemaking:"
    },
    {
     "certified": "",
     "intro": "Chardonnay, Pinot Bianco (Pinot Blanc)",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Lambrusco: Lambrusco; Chiavennasca: Local name for Nebbiolo in Valtellina",
     "intro": "Pinot Nero (Pinot Noir)",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "IGP, DOC, DOCG",
     "topic": "Classification"
    },
    {
     "certified": "Lombardy:; Valtellina Superiore DOCG: Dry red wines from Nebbiolo locally known as Chiavennasca.; Sforzato di Valtellina DOCG: Passito-dried Chiavennasca.; Franciacorta Satèn DOCG: Brut only, max pressure of 5 atmospheres, Chardonnay with a max of up to 50% Pinot Bianco.; Emilia-Romagna:; Lambrusco DOC:; Style: Frizzante or spumante; Subzones: Lambrusco di Sorbara DOC, Lambrusco Grasparossa di Castelvetro DOC, Lambrusco Salamino di Santa Croce DOC; Sweetness levels: Secco, Amabile, Dolce",
     "intro": "Franciacorta DOCG:; Pinot Nero, Chardonnay, Pinot Bianco; Spumante, metodo classico sparkling wine.; Min 18 months aging on the lees, 25 months total aging from the date of harvest.",
     "topic": "Wine Law/Appellations: DOC and DOCGs"
    },
    {
     "certified": "Secco, Amabile, Dolce",
     "intro": "Franciacorta: Metodo Classico, Spumante, Millesimato, Frizzante",
     "topic": "Label Terms"
    },
    {
     "certified": "Franciacorta: Bellavista, Ca' del Bosco",
     "intro": "",
     "topic": "Producers/Proprietary Brand"
    },
    {
     "certified": "CMS-A published Sparkling Wine Service Standards.; Lambrusco is served as you would any other sparkling wine, cold and in a flute or wine glass.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Lambrusco: In Emilia-Romagna, the breadbasket of Italy, near Modena and Reggio known for Parmesan, salami, Balsamic Vinegar.; Franciacorta: Very flexible with food pairings like Champagne.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    },
    {
     "certified": "Limited shelf life of effervescence for Lambrusco if pouring by the glass.",
     "intro": "",
     "topic": "Business of the Sommelier"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "ITALY - NORTHERN ITALY - TRENTINO-ALTO ADIGE / FRIULI / VENETO",
   "group": "italy",
   "id": "trentino-friuli-veneto",
   "map": {
    "cats": {
     "certified": [
      "Italy North"
     ],
     "intro": [
      "Italy"
     ]
    },
    "chapters": {
     "certified": [
      "Italy North"
     ],
     "intro": [
      "northeast"
     ]
    },
    "countries": [
     "italy"
    ],
    "grapes": [
     "Pinot Gris / Grigio",
     "Chardonnay",
     "Sauvignon Blanc",
     "Pinot Blanc",
     "Garganega",
     "Glera",
     "Pinot Noir",
     "Merlot",
     "Corvina (Valpolicella)"
    ],
    "regions": [
     "veneto",
     "friuli",
     "trentino-alto-adige"
    ],
    "serviceRef": [],
    "techniques": [
     "dried-grapes",
     "ripasso",
     "tank-method",
     "skin-contact-orange"
    ]
   },
   "name": "Italy: Trentino-Alto Adige, Friuli and Veneto",
   "order": 12,
   "outcome": {
    "certified": "After studying this section, a candidate will know a broader range of DOC/DOCGs in Northeast Italy, match grape varieties to their regions, and understand winemaking styles. A Certified Sommelier will be able to recognize iconic producers and be able to sell and recommend food pairings with wines from these regions to a guest.",
    "intro": "After studying this section, a student will know the major DOC/DOCGs in Northeast Italy, be able to match grape varieties with their regions, and understand general labeling terms."
   },
   "pages": [
    30,
    31
   ],
   "questions": [
    {
     "accept": [
      "refosco dal peduncolo rosso",
      "refosco",
      "refosco peduncolo rosso",
      "refosco del peduncolo rosso"
     ],
     "ans": "Refosco dal Peduncolo Rosso",
     "exp": "Refosco dal Peduncolo Rosso, the Court's Friulian red, is named for its red stem rather than for a red form of Refosco; it gives dark, plummy wine with high acidity, chiefly from the Colli Orientali and the Grave plain.",
     "id": "e-mc88hqvx",
     "q": "Friuli's native red takes the second half of its full name from the red stalks of its bunches. Name the grape.",
     "row": "Wine: Red Grape Variety Names",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Valdadige, Etschtaler in German, follows the Adige valley from the province of Bolzano through Trentino and south into the province of Verona, for whites, reds and rosés, many of them varietal. Alto Adige DOC and Trentino DOC stay within their own provinces, and Friuli Isonzo is one of the Court's Friulian DOCs, on river gravel near Gorizia.",
     "id": "e-5lkslhy9",
     "opts": [
      "Alto Adige DOC",
      "Friuli Isonzo DOC",
      "Valdadige DOC",
      "Trentino DOC"
     ],
     "q": "Which of these DOCs on the Court's northeast list crosses from Trentino-Alto Adige into the Veneto, reaching the province of Verona?",
     "row": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "a": 3,
     "exp": "Superiore is the general term the Court lists for a wine with higher minimum alcohol and longer minimum ageing than the basic denomination, and Soave Superiore DOCG is its example in the Veneto. The other three describe Classico, the historic heart of a zone; appassimento, as in Recioto; and the Charmat method of Prosecco.",
     "grapes": [
      "Garganega"
     ],
     "id": "e-e7kwrfw1",
     "opts": [
      "Grapes dried before pressing",
      "A second fermentation in tank",
      "Grapes from the historic hill zone",
      "Higher minimum alcohol and longer ageing"
     ],
     "q": "On a Soave Superiore DOCG label, what does the word Superiore promise beyond plain Soave DOC?",
     "row": "General Terms"
    },
    {
     "a": 0,
     "exp": "Terlano, founded in 1893, is a growers' co-operative, and the Court notes that many Alto Adige producers are co-ops: a dozen or so of them take in most of the province's grapes from thousands of tiny holdings and make many of its finest wines.",
     "id": "e-kkq1pkna",
     "opts": [
      "A growers' co-operative",
      "A monastery cellar",
      "A négociant house",
      "A single family estate"
     ],
     "q": "Cantina Terlano, one of the Court's two Alto Adige producers, is run on which model, shared by many of the province's best cellars?",
     "row": "History & Lore"
    },
    {
     "a": 3,
     "exp": "Amarone is the dry wine of the dried grapes that once went only into the sweet Recioto della Valpolicella; houses such as Bertani began selling it under its own name in the 1950s, and it was raised to DOCG in 2010, the history the Court asks a candidate to know.",
     "grapes": [
      "Corvina (Valpolicella)"
     ],
     "id": "e-33s5hg3v",
     "opts": [
      "The 1890s",
      "The 1980s",
      "The 1920s",
      "The 1950s"
     ],
     "q": "In which decade did Amarone della Valpolicella first reach the market as a wine sold under its own name?",
     "row": "History & Lore"
    },
    {
     "accept": [
      "pinot grigio",
      "pinot gris",
      "grigio"
     ],
     "ans": "Pinot Grigio",
     "exp": "Delle Venezie DOC, with Trevenezie IGP beneath it, covers the whole of Veneto and Friuli and the Trentino half of Trentino-Alto Adige, as the Court says, and exists above all to control the great volume of Pinot Grigio grown on the plains.",
     "grapes": [
      "Pinot Gris / Grigio"
     ],
     "id": "e-xxv57p99",
     "q": "Delle Venezie DOC, created in 2017 across Veneto, Friuli and Trentino, was set up chiefly to govern the varietal wine of which grape?",
     "row": "Wine Law / Appellations: DOCGs/DOCs",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "Masi stands with Bertani, Allegrini, Tommasi, Dal Forno and Quintarelli among the Court's Amarone producers; Mionetto and Bisol are on its Prosecco list, and Cantina Terlano is the Alto Adige co-operative.",
     "grapes": [
      "Corvina (Valpolicella)"
     ],
     "id": "e-miylegge",
     "opts": [
      "Masi",
      "Mionetto",
      "Cantina Terlano",
      "Bisol"
     ],
     "q": "Which of these houses on the Court's list is known above all for Amarone della Valpolicella?",
     "row": "Producers/Proprietary Brand"
    },
    {
     "a": 1,
     "exp": "An orange wine is a white made like a red, the juice left to ferment on its skins for days, weeks or months, which gives amber colour, tannin and grip; Friulian growers in the Collio and at Oslavia revived the old method, often alongside natural winemaking.",
     "id": "e-uaz7a8mn",
     "opts": [
      "Aged under flor",
      "Fermented on their skins",
      "Dried before pressing",
      "Blended with red wine"
     ],
     "q": "The Court ties orange wine to Friuli. How are the white grapes for such a wine handled in the cellar?",
     "row": "Winemaking"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Trentino-Alto Adige: Northeastern Italy- border of Austria and Switzerland.; Friuli: Northeastern Italy - border of Slovenia.; Veneto: Northeastern Italy, includes Venice and Verona.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Trentino-Alto Adige/Friuli: Cool Continental; Veneto: Cool Mediterranean, closer to the east",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Trentino-Alto Adige/Friuli: Alps",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Friuli: Orange wine and natural wines",
     "intro": "Trentino-Alto Adige/Friuli: Single grape variety wines, noted on the wine label.",
     "topic": "Winemaking"
    },
    {
     "certified": "Friuli: Friulano, Ribolla Gialla; Veneto: Trebbiano di Soave, Chardonnay",
     "intro": "Trentino-Alto Adige: Pinot Grigio, Chardonnay, Sauvignon Blanc, Pinot Bianco; Veneto: Garganega, Glera; Friuli: Pinot Bianco, Chardonnay, Pinot Grigio, and Sauvignon Blanc (called Sauvignon)",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Trentino-Alto Adige: Teroldego, Lagrein; Friuli: Refosco dal Peduncolo Rosso",
     "intro": "Trentino-Alto Adige: Pinot Nero; Friuli: Merlot; Veneto: Corvina, Rondinella",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "IGP, DOC, DOCG",
     "topic": "Classification"
    },
    {
     "certified": "Trentino-Alto Adige: Alto-Adige (Südtiroler) DOC, Trentino DOC, Valdadige DOC; Friuli: Friuli Isonzo DOC, Friuli Colli Orientali DOC, Friuli Grave DOC",
     "intro": "Delle Venezie DOC/Trevenezie IGP: Includes the entire regions of Veneto, Friuli, and the Trentino portion of Trentino-Alto Adige.; Trentino-Alto Adige: Most of production is DOC status- single grape variety wines.",
     "topic": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "certified": "Veneto; Conegliano Valdobbiadene Prosecco Spumante Superiore DOCG: More specific designation for Prosecco, higher alcohol requirement.; Recioto di Soave DOCG: Sweet white wine made from Garganega grapes dried in the Appassimento method.; Recioto di Valpolicella DOCG: Sweet red wine made from Corvina and Rondinella grapes dried in the Appassimento method.; Valpolicella Ripasso DOC: Corvina and Rondinella grapes. Use of the remaining must and lees from the production of Recioto della Valpolicella and/or Amarone della Valpolicella. Young wine is combined with the lees and goes through a short second fermentation. This leads to wines with more flavor, tannin, and alcohol.",
     "intro": "Veneto; Prosecco DOC: Spumante wines made in the Charmat method from the Glera grape variety.; Soave DOC/Soave Superiore DOCG: Dry white wines made mostly from the Garganega grape variety. Superiore has elevated alcohol and longer minimum aging requirements.; Valpolicella DOC: Dry red wines primarily from the Corvina and Rondinella grape varieties.; Amarone della Valpolicella DOCG: Red wine primarily from Corvina with Rondinella.; Uses the Appassimento process of drying the grapes and concentrating sugars. Minimum 14% abv and residual sugar is often perceptible.",
     "topic": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "certified": "Recioto",
     "intro": "Classico, Superiore, Secco, Amabile, Charmat, Appassimento",
     "topic": "General Terms"
    },
    {
     "certified": "Trentino-Alto Adige: Cantina Terlano, Tiefenbrunner; Friuli: Jermann, Movia, Livio Felluga, Schioppettino, Josko Gravner; Veneto, Amarone: Bertani, Masi, Allegrini, Tommasi, Dal Forno, Quintarelli; Veneto, Prosecco: Bisol, Mionetto, La Marca, Zonin, Zardetto",
     "intro": "",
     "topic": "Producers/Proprietary Brand"
    },
    {
     "certified": "Many of the producers in Alto-Adige are co-ops. Be familiar with the history of Amarone.",
     "intro": "",
     "topic": "History & Lore"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "ITALY - TUSCANY",
   "group": "italy",
   "id": "tuscany",
   "map": {
    "cats": {
     "certified": [
      "Italy Central & South"
     ],
     "intro": [
      "Italy"
     ]
    },
    "chapters": {
     "certified": [
      "Italy Central & South"
     ],
     "intro": [
      "tuscany"
     ]
    },
    "countries": [
     "italy"
    ],
    "grapes": [
     "Sangiovese",
     "Cabernet Sauvignon",
     "Merlot",
     "Cabernet Franc",
     "Vermentino"
    ],
    "regions": [
     "tuscany"
    ],
    "serviceRef": [
     "decanting",
     "digestifs"
    ],
    "techniques": [
     "oak",
     "dried-grapes",
     "ageing-terms"
    ]
   },
   "name": "Italy: Tuscany",
   "order": 13,
   "outcome": {
    "certified": "After studying this section, a candidate will understand the differences between multiple regions of Sangiovese, and know and understand DOC/DOCG wines from regions in Tuscany. A Certified Sommelier recognize iconic producers and be able to sell and recommend food pairings with wines from Tuscany to a guest.",
    "intro": "After studying this section, a student will know the grape varieties, appellations, and styles of important Tuscan wines."
   },
   "pages": [
    32,
    33
   ],
   "questions": [
    {
     "a": 2,
     "exp": "The Court's cell splits Montalcino by height: clay and marine sediments on the lower slopes and galestro, the flaky, friable marl also found in the Chianti hills, higher up, where it drains freely and is prized for Sangiovese.",
     "grapes": [
      "Sangiovese"
     ],
     "id": "e-6x2v30hl",
     "opts": [
      "Volcanic tuff",
      "Alluvial sand",
      "Galestro",
      "Granite"
     ],
     "q": "On Montalcino's slopes, which soil does the Court place at the higher elevations, above the clay and marine sediments lower down?",
     "row": "Soil: Type and/or Name"
    },
    {
     "a": 1,
     "exp": "The Court's style cell reads Sangiovese as moderate in colour with tart acidity that outweighs its tannin, and notes that volatile acidity, a lift of vinegar or nail varnish, is common in these wines; a touch can add lift, too much is a fault.",
     "grapes": [
      "Sangiovese"
     ],
     "id": "e-9jruv8mz",
     "opts": [
      "Botrytis character",
      "Volatile acidity",
      "Pyrazine greenness",
      "Cork taint"
     ],
     "q": "Beyond moderate colour and tart acidity that outweighs the tannin, which character does the Court say is common in Sangiovese based wines?",
     "row": "Style"
    },
    {
     "accept": [
      "100",
      "100%",
      "100 per cent",
      "100 percent",
      "one hundred per cent",
      "one hundred percent",
      "one hundred",
      "all of it",
      "all",
      "entirely"
     ],
     "ans": "100 per cent",
     "exp": "Brunello di Montalcino is 100 per cent Sangiovese, the local selection long called Brunello, as the Court prints it, where Chianti Classico needs at least 80 per cent and Vino Nobile di Montepulciano at least 70.",
     "grapes": [
      "Sangiovese"
     ],
     "id": "e-bm532j06",
     "q": "What share of a Brunello di Montalcino must come from Sangiovese?",
     "row": "Wine Law / Appellations: DOCGs/DOCs",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Rosso di Montepulciano DOC sits beneath Vino Nobile di Montepulciano DOCG as the zone's younger wine, the pair the Court lists; Rosso di Montalcino plays the same part beneath Brunello, and Montepulciano d'Abruzzo is named for a grape, not the Tuscan town.",
     "grapes": [
      "Sangiovese"
     ],
     "id": "e-qggvgth3",
     "opts": [
      "Montepulciano d'Abruzzo",
      "Morellino di Scansano",
      "Rosso di Montalcino",
      "Rosso di Montepulciano"
     ],
     "q": "Which DOC takes the younger, earlier released Sangiovese of the Vino Nobile zone?",
     "row": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "a": 0,
     "exp": "Le Pergole Torte, from the Montevertine estate at Radda in Chianti, has been pure Sangiovese since 1977 and is sold as IGT by choice; the Court prints it as La Pergole Torte, beside Bordeaux variety wines such as Masseto (Merlot) and Solaia.",
     "grapes": [
      "Sangiovese"
     ],
     "id": "e-vg834tma",
     "opts": [
      "Sangiovese",
      "Cabernet Sauvignon",
      "Cabernet Franc",
      "Merlot"
     ],
     "q": "Le Pergole Torte, among the top wines the Court names, is made entirely from which grape?",
     "row": "Producers/Proprietary Brand"
    },
    {
     "accept": [
      "4",
      "four",
      "4 months",
      "four months"
     ],
     "ans": "4 months",
     "exp": "Brunello must spend at least two years in oak, large Slavonian casks or small barriques as the Court says, and at least four months in bottle, and may be released only from 1 January of the fifth year after the harvest; the Riserva needs six months in bottle and the sixth year.",
     "grapes": [
      "Sangiovese"
     ],
     "id": "e-zk6xvfvx",
     "q": "Beyond its two years in wood, how many months must a standard Brunello di Montalcino rest in bottle before release?",
     "row": "Winemaking",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "Identify Chianti, Chianti Classico, Montalcino, and Bolgheri on a map.",
     "intro": "Extends from the Ligurian Sea in the west to the foothills of the Apennine Mountains in the east.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Continental/Maritime, stronger Maritime influence with proximity to the coast.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Ligurian Sea, Tyrrhenian Sea",
     "intro": "Apennine Mountains",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Trebbiano, Vermentino, Vernaccia",
     "intro": "",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Prugnolo Gentile, Cabernet Sauvignon, Merlot, Cabernet Franc",
     "intro": "Sangiovese, Brunello/Sangiovese Grosso",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Montalcino: Clay and marine sediments at lower elevation, Galestro at higher elevation.",
     "intro": "Galestro",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Brunello di Montalcino: Know the minimum aging requirements; use of large Slavonian or small barriques.",
     "intro": "Brunello di Montalcino: wine law requires these wines be aged and stipulates minimum amount of aging.",
     "topic": "Winemaking"
    },
    {
     "certified": "Sangiovese-based wines have a moderate intensity of color and tart acidity that outweighs tannin. Volatile Acidity is common in these wines.",
     "intro": "Dry red wines; Dry white wines; Sweet Vin Santo",
     "topic": "Style"
    },
    {
     "certified": "Gran Selezione (know that it exists, not specific rules)",
     "intro": "IGP, DOC, DOCG",
     "topic": "Classification"
    },
    {
     "certified": "Brunello di Montalcino: 100% Brunello; Chianti Classico: min 80% Sangiovese; Chianti: min 70% Sangiovese; Vino Nobile di Montepulciano DOCG; Bolgheri DOC; Rosso di Montepulciano DOC; Vin Santo DOCs (multiple)",
     "intro": "Chianti DOCG; Chianti Classico DOCG; Brunello di Montalcino DOCG; Rosso di Montalcino DOCG; Vin Santo",
     "topic": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "certified": "Gran Selezione (know that it exists, not specific rules)",
     "intro": "Superiore: Increased alcohol level required; Classico: Classic center of a region; Riserva: Longer aging times required",
     "topic": "Label Terms"
    },
    {
     "certified": "Rosso, Bianco, Dolce, Passito",
     "intro": "Super Tuscan: Can be Bordeaux grape variety blends, Bordeaux varieties with Sangiovese, and pure Sangiovese wines.",
     "topic": "General Terms"
    },
    {
     "certified": "Ornellaia, Masseto, Tignanello, Solaia, Biondi Santi, Banfi, Soldera, La Pergole Torte. Recognize important producers of Brunello di Montalcino.",
     "intro": "Antinori, Ruffino, Sassicaia",
     "topic": "Producers/Proprietary Brand"
    },
    {
     "certified": "Know the top Brunello di Montalcino vintages in the past 15 years.",
     "intro": "",
     "topic": "Vintage"
    },
    {
     "certified": "",
     "intro": "Super Tuscan history; Gallo Nero on Chianti Classico bottles",
     "topic": "History & Lore"
    },
    {
     "certified": "Decant young Brunello di Montalcino.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Know pairings for Chianti and Brunello. Have producers in mind if you recommend them.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    },
    {
     "certified": "Know current release of Brunello di Montalcino and approximate price of top proprietary brands.",
     "intro": "",
     "topic": "Business of the Sommelier"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "ITALY - CENTRAL & SOUTHERN ITALY",
   "group": "italy",
   "id": "central-southern-italy",
   "map": {
    "cats": {
     "certified": [
      "Italy Central & South"
     ],
     "intro": [
      "Italy"
     ]
    },
    "chapters": {
     "certified": [
      "Italy Central & South"
     ],
     "intro": [
      "southitaly"
     ]
    },
    "countries": [
     "italy"
    ],
    "grapes": [
     "Aglianico",
     "Sagrantino",
     "Zinfandel"
    ],
    "regions": [
     "umbria",
     "abruzzo",
     "campania",
     "puglia"
    ],
    "serviceRef": [
     "decanting"
    ],
    "techniques": []
   },
   "name": "Italy: Central and Southern Italy",
   "order": 14,
   "outcome": {
    "certified": "After studying this section, a candidate will know the DOC/DOCGs in Central and Southern Italy, match grape varieties to their regions, and understand winemaking styles.",
    "intro": "After studying this section, a student will understand and recognize the regions of Central and Southern Italy and be able to match grape varieties to major DOC/DOCGs."
   },
   "pages": [
    34,
    35
   ],
   "questions": [
    {
     "accept": [
      "adriatic",
      "the adriatic",
      "adriatic sea",
      "the adriatic sea",
      "mare adriatico"
     ],
     "ans": "The Adriatic",
     "exp": "The Adriatic runs down the eastern coast from the Marche through Abruzzo and Molise to Puglia, while the Tyrrhenian lies off Lazio, Campania and Calabria to the west and the Ligurian Sea further north; the Court names all three with Vesuvius.",
     "id": "e-egig1u6m",
     "q": "Of the seas the Court names for central and southern Italy, which one washes the eastern coast of the Marche, Abruzzo and northern Puglia?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "accept": [
      "taurasi",
      "taurasi docg"
     ],
     "ans": "Taurasi",
     "exp": "Young Taurasi, Aglianico from the Irpinian hills, and young Sagrantino di Montefalco are two of Italy's most tannic reds, and the Court advises decanting both so that air can soften their grip before they reach the glass.",
     "grapes": [
      "Aglianico",
      "Sagrantino"
     ],
     "id": "e-xmfo0v57",
     "q": "The Court says a young Sagrantino di Montefalco should be decanted. Which young Campanian red does it pair with Sagrantino in that advice?",
     "row": "Service of Beverage",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Umbria is the only Italian region with neither a coastline nor a foreign border, and it is home to Sagrantino di Montefalco DOCG; Lazio, Abruzzo and Molise all reach the sea, part of the map the Court asks a candidate to know.",
     "id": "e-u63l2nfq",
     "opts": [
      "Molise",
      "Lazio",
      "Umbria",
      "Abruzzo"
     ],
     "q": "Which region of central Italy is landlocked, lying between Tuscany and the Marche?",
     "row": "Geography: Appellation"
    },
    {
     "a": 3,
     "exp": "The Court reads central Italy as maritime on the coast and continental inland, where the Apennines cut off the sea's influence and bring colder winters and wider swings between day and night; it gives the south a Mediterranean climate.",
     "id": "e-2ij2pahq",
     "opts": [
      "Maritime",
      "Mediterranean",
      "Subtropical",
      "Continental"
     ],
     "q": "Which climate category does the Court give the inland hills of central Italy, away from the coast?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 1,
     "exp": "Campania's soils are volcanic, ash, tuff and lava from Vesuvius, the Campi Flegrei and Roccamonfina, the Court's one word for the region, and the Irpinian DOCGs mix volcanic ash with clay and limestone; galestro is Tuscan, chalk belongs to Champagne and slate to the Mosel.",
     "grapes": [
      "Aglianico"
     ],
     "id": "e-dlopn0kn",
     "opts": [
      "Slate",
      "Volcanic",
      "Galestro",
      "Chalk"
     ],
     "q": "Which soil type does the Court give for Campania, home of Taurasi, Fiano di Avellino and Greco di Tufo?",
     "row": "Soil: Type and/or Name"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Extends from the Ligurian Sea in the west to the foothills of the Apennine Mountains in the east.",
     "topic": "Geography: Location"
    },
    {
     "certified": "Identify all major regions of Central and Southern Italy on a map.; Marche: Verdicchio di Matelica DOC, Verdicchio dei Castelli di Jesi DOC",
     "intro": "Central:; Umbria: Sagrantino di Montefalco DOCG; Marche; Abruzzo: Montepulciano d'Abruzzo DOC; Southern:; Campania: Taurasi DOCG, Greco di Tufo DOCG, Fiano di Avellino DOCG; Puglia; Basilicata; Calabria",
     "topic": "Geography: Appellation"
    },
    {
     "certified": "",
     "intro": "Central: Maritime on the coast and Continental inland.; South: Mediterranean",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Ligurian Sea, Tyrrhenian Sea, Adriatic Sea, Mt. Vesuvius",
     "intro": "Central: Apennine Mountains",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Campania: Volcanic",
     "intro": "",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "",
     "intro": "Fiano, Greco, Verdicchio",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Aglianico, Montepulciano, Sagrantino, Primitivo",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "IGP, DOC, DOCG",
     "topic": "Classification"
    },
    {
     "certified": "Match DOCG to Major Region:; Campania: Taurasi DOCG, Greco di Tufo DOCG, Fiano di Avellino DOCG; Marche: Verdicchio dei Castelli di Jesi DOC, Verdicchio di Matelica DOC",
     "intro": "",
     "topic": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "certified": "",
     "intro": "Superiore: Higher alcohol level requirement; Riserva: Longer aging requirements",
     "topic": "Label Terms"
    },
    {
     "certified": "Know producers, cuvées, and vintages if you recommend them in the Hospitality and Service Exam.",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Young Taurasi and Sagrantino di Montefalco should be decanted.",
     "intro": "",
     "topic": "Service of Beverage"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "ITALY - ISLANDS - SICILY & SARDINIA",
   "group": "italy",
   "id": "sicily-sardinia",
   "map": {
    "cats": {
     "certified": [
      "Italy Central & South"
     ],
     "intro": [
      "Italy"
     ]
    },
    "chapters": {
     "certified": [
      "Italy Central & South",
      "Fortified Wines"
     ],
     "intro": [
      "islands"
     ]
    },
    "countries": [
     "italy"
    ],
    "grapes": [
     "Nerello Mascalese",
     "Nero d’Avola",
     "Vermentino",
     "Grenache / Garnacha"
    ],
    "regions": [
     "sicily",
     "sardinia"
    ],
    "serviceRef": [],
    "techniques": []
   },
   "name": "Italy: Sicily and Sardinia",
   "order": 15,
   "outcome": {
    "certified": "After studying this section, a candidate will be able to match grape varieties to major DOC/DOCGs and know the larger region within Italy in which they are located.",
    "intro": "After studying this section, a student will be able to locate Sicily and Sardinia on a map, understand the climate of the regions, and know the major grape varieties grown."
   },
   "pages": [
    36
   ],
   "questions": [
    {
     "a": 0,
     "exp": "Cannonau di Sardegna DOC (1972) covers the whole island and asks at least 85 per cent Cannonau, with the Classico, Jerzu, Oliena and Capo Ferrato sub-zones; Carignano del Sulcis is the south west's Carignan, Monica di Sardegna another island wide red, and Vermentino di Gallura the white DOCG.",
     "grapes": [
      "Grenache / Garnacha"
     ],
     "id": "e-1wcim45j",
     "opts": [
      "Cannonau di Sardegna",
      "Carignano del Sulcis",
      "Vermentino di Gallura",
      "Monica di Sardegna"
     ],
     "q": "Which DOC covers the whole of Sardinia for the island's signature red grape, Grenache under its local name?",
     "row": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "accept": [
      "sicilia",
      "sicilia doc",
      "doc sicilia",
      "sicily doc",
      "sicily",
      "the sicilia doc"
     ],
     "ans": "Sicilia DOC",
     "exp": "Sicilia DOC, the Court's Sicily DOC, was created in 2011 to replace the island wide IGT and has held varietal Grillo and Nero d'Avola to itself since the 2017 vintage, with Terre Siciliane IGT left beneath it for everything else.",
     "grapes": [
      "Nero d’Avola"
     ],
     "id": "e-l2zcmjow",
     "q": "Since the 2017 vintage a varietal Grillo or Nero d'Avola may no longer be sold as Terre Siciliane IGT. Which island wide DOC must it carry instead, unless a smaller DOC applies?",
     "row": "Wine Law / Appellations: DOCGs/DOCs",
     "sa": 1
    },
    {
     "accept": [
      "tyrrhenian",
      "the tyrrhenian",
      "tyrrhenian sea",
      "the tyrrhenian sea",
      "mar tirreno",
      "tirreno"
     ],
     "ans": "The Tyrrhenian Sea",
     "exp": "The Tyrrhenian Sea fills the basin between Sardinia, Corsica, Sicily and the west coast of the mainland, and the Court names it with Etna as the islands' physical features; Sicily's east coast faces the Ionian instead.",
     "id": "e-t5m87gxy",
     "q": "Which sea lies between Sardinia and the Italian mainland, washing Sicily's northern coast as well?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Carricante, the Court's Sicilian white, makes at least 60 per cent of Etna Bianco and 80 per cent of the Bianco Superiore from Milo; it ripens late on the volcano's eastern slopes and keeps high acidity with a saline, citrus edge.",
     "id": "e-ocby61fi",
     "opts": [
      "Catarratto",
      "Carricante",
      "Inzolia",
      "Grillo"
     ],
     "q": "Which white grape must make up at least 60 per cent of an Etna Bianco?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 2,
     "exp": "Inzolia, called Ansonica on the mainland, is a soft, nutty white that joins Grillo and Catarratto in Oro and Ambra Marsala and in dry western blends; Carricante belongs to Etna, Zibibbo to Pantelleria and Vermentino to Sardinia.",
     "id": "e-fwpuc5uk",
     "opts": [
      "Carricante",
      "Vermentino",
      "Inzolia",
      "Zibibbo"
     ],
     "q": "Grillo and Catarratto share the blend of a golden Marsala with which third white grape the Court names?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 3,
     "exp": "Corsica, which is French, lies across the Strait of Bonifacio from Sardinia's north coast, which is why the Court places Sardinia south of France and west of Italy; Elba and Capraia are Tuscan islands and Menorca is one of Spain's Balearics.",
     "id": "e-pdquql9t",
     "opts": [
      "Elba",
      "Menorca",
      "Capraia",
      "Corsica"
     ],
     "q": "Sardinia lies directly south of which island, across the narrow Strait of Bonifacio?",
     "row": "Geography: Location"
    },
    {
     "accept": [
      "semi-secco",
      "semisecco",
      "semi secco"
     ],
     "ans": "Semi-Secco",
     "exp": "Marsala's sweetness words run Secco, Semi-Secco and Dolce, the Court's label terms, and they apply to the Fine and Superiore grades; Vergine takes no sweetening at all and is always dry.",
     "id": "e-9df1n5y1",
     "q": "Marsala is labelled by its sugar in three levels the Court names. Between Secco and Dolce, which word marks the middle one?",
     "row": "Label Terms",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "Identify major regions on a map.",
     "intro": "Sardinia: Island located south of France and west of Italy.; Sicily: Islands off the southern tip of Italy.; *Locate and identify on a map.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Mediterranean",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Tyrrhenian Sea, Mt. Etna",
     "intro": "Mt. Etna",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Volcanic in Etna",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Grillo, Inzolia, Catarratto",
     "intro": "Sicily: Carricante; Sardinia: Vermentino",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Sicily: Nerello Mascalese, Nero d'Avola, Frappato; Sardinia: Cannonau",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "IGP, DOC, DOCG",
     "topic": "Classification"
    },
    {
     "certified": "Sicily:; Etna DOC (Rosso and Bianco); Cerasuolo di Vittoria DOCG; Marsala DOC; Sardinia:; Cannonau di Sardegna DOC; Vermentino di Sardegna DOC",
     "intro": "Sicily:; Sicily DOC",
     "topic": "Wine Law / Appellations: DOCGs/DOCs"
    },
    {
     "certified": "Marsala: Secco, Semi-Secco, Dolce",
     "intro": "",
     "topic": "Label Terms"
    },
    {
     "certified": "Dry White Wines, Dry Red Wines, Fortified Wine (Marsala)",
     "intro": "",
     "topic": "Style"
    },
    {
     "certified": "Know producers if you recommend them at service in the Hospitality and Service Exam.",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SPAIN - GALICIA",
   "group": "spain-portugal",
   "id": "galicia",
   "map": {
    "cats": {
     "certified": [
      "Spain"
     ],
     "intro": [
      "Spain"
     ]
    },
    "chapters": {
     "certified": [
      "Spain"
     ],
     "intro": [
      "galicia"
     ]
    },
    "countries": [
     "spain"
    ],
    "grapes": [
     "Albariño",
     "Godello",
     "Mencía"
    ],
    "regions": [
     "rias-baixas",
     "bierzo"
    ],
    "serviceRef": [],
    "techniques": [
     "steep-slopes",
     "lees-batonnage"
    ]
   },
   "name": "Spain: Galicia",
   "order": 16,
   "outcome": {
    "certified": "After studying this section, a candidate will know the soil type and the styles and grape varieties of Valdeorras DO and Ribeira Sacra DO. A Certified Sommelier will be able to recognize iconic producers and be able to recommend and sell food pairings with Rías Baixas Albariño to a guest.",
    "intro": "After studying this section, a student will know the location, general climate, grape variety, and style of the Rías Baixas DO."
   },
   "pages": [
    37
   ],
   "questions": [
    {
     "a": 0,
     "exp": "The Court's Certified climate cell reads maritime on the coast, becoming more continental moving inland. Rías Baixas takes the ocean's rain and mild temperatures; up the Sil valley in Valdeorras and Ribeira Sacra the summers grow hotter and the winters colder, and Monterrei, against the Portuguese border, is the most continental of Galicia's five denominations.",
     "id": "e-4zozhhr7",
     "opts": [
      "Continental",
      "Semi-arid",
      "Mediterranean",
      "Subtropical"
     ],
     "q": "Galicia's vineyards are maritime on the Atlantic coast. Which climate do they turn towards as you travel inland, by the Court's Certified cell?",
     "row": "Geography: Climate Categories"
    },
    {
     "accept": [
      "sil",
      "the sil",
      "rio sil",
      "río sil",
      "sil river",
      "the sil river",
      "river sil",
      "the river sil"
     ],
     "ans": "The Sil",
     "exp": "The Court's Certified physical feature for Galicia is the steep slopes of Ribeira Sacra. They fall to the Sil, which flows west out of Bierzo past Valdeorras and cuts a deep gorge before it meets the Miño near Ourense; the Miño itself is the Introductory river, the border with Portugal.",
     "id": "e-necug8d4",
     "q": "Ribeira Sacra's steep slopes are the walls of a river canyon. Which river, a tributary that joins the Miño below them, cut that canyon?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "accept": [
      "terraces",
      "terrace",
      "terraced",
      "terraced vineyards",
      "terraced vineyard",
      "terracing",
      "bancales",
      "socalcos"
     ],
     "ans": "Terraces",
     "exp": "The Court's Certified grape growing cell reads terraced vineyards in Ribeira Sacra. The narrow stone-walled ledges, many first cut in Roman and monastic times, are worked by hand because no machine can reach them; the Introductory cell's high canopy trellis belongs to rainy Rías Baixas on the coast.",
     "id": "e-eci4bmc7",
     "q": "What form of vineyard does the Court name for Ribeira Sacra, where the canyon walls are too steep to plant as they stand?",
     "row": "Grape Growing",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Court gives one soil for Galicia at the Certified level: granite. In Rías Baixas it weathers into a coarse, sandy, acidic topsoil that drains quickly, the counterweight to more than 1,600 millimetres of rain a year; chalk and limestone belong to Champagne and Rioja Alavesa, basalt to volcanic islands.",
     "id": "e-j8807ai9",
     "opts": [
      "Limestone",
      "Granite",
      "Basalt",
      "Chalk"
     ],
     "q": "Which soil type does the Court's Certified cell give for Galicia, the rock that underlies Rías Baixas?",
     "row": "Soil: Type and/or Name"
    },
    {
     "a": 1,
     "exp": "The Court's Certified cell reads occasional barrique (barrica) use. Most Albariño stays in steel on its fine lees, but a Rías Baixas Barrica label marks a wine with at least three months in oak, and inland Godello repays a little wood; carbonic maceration, fortification and the solera belong to other wines.",
     "id": "e-nm00bvls",
     "opts": [
      "Solera ageing",
      "Occasional barrique use",
      "Fortification after fermentation",
      "Routine carbonic maceration"
     ],
     "q": "Galician whites are made with modern technology in stainless steel. What does the Court's Certified winemaking cell add to that picture?",
     "row": "Winemaking"
    },
    {
     "accept": [
      "godello",
      "godelho",
      "gouveio"
     ],
     "ans": "Godello",
     "exp": "Godello is the Court's Certified white grape for Galicia and the white of Valdeorras, where it was almost lost by the 1970s before growers replanted it. It is broader, stonier and less aromatic than Albariño, and the same vine is Gouveio in Portugal's Douro.",
     "grapes": [
      "Godello"
     ],
     "id": "e-plsbpvp5",
     "q": "Besides Albariño, which white grape does the Court add for Galicia at the Certified level?",
     "row": "Wine: White Grape Variety Names",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The Court's Certified style cell reads fresh and neutral Godello in Valdeorras, within dry, crisp white wines and light red wines for inland Galicia. Godello is palate driven rather than perfumed, so its interest is texture and stony weight, which lees ageing and a little oak build on.",
     "grapes": [
      "Godello"
     ],
     "id": "e-n86km1m7",
     "opts": [
      "Fresh and neutral",
      "Sweet and botrytised",
      "Aromatic and off-dry",
      "Oxidative and nutty"
     ],
     "q": "How does the Court describe the Godello of Valdeorras in its Certified style cell?",
     "row": "Style"
    },
    {
     "a": 2,
     "exp": "The Court lists Ribeira Sacra's whites as Albariño and Godello and its red as Mencía. Verdejo and Viura are Rueda and Rioja grapes, Xarel-lo and Parellada belong to Cava, and Hondarrabi Zuri is the Basque Txakoli grape.",
     "grapes": [
      "Albariño",
      "Godello"
     ],
     "id": "e-69ieapzl",
     "opts": [
      "Xarel-lo and Parellada",
      "Verdejo and Viura",
      "Albariño and Godello",
      "Hondarrabi Zuri and Malvasía"
     ],
     "q": "Ribeira Sacra DO is best known for red wine. Which two white grapes does the Court list for it?",
     "row": "Wine Law /Appellations: DOs"
    },
    {
     "accept": [
      "mencía",
      "mencia",
      "jaen",
      "jaén"
     ],
     "ans": "Mencía",
     "exp": "The Court lists Valdeorras for white Godello and red Mencía, and Ribeira Sacra for red Mencía with white Albariño and Godello. Mencía, the same vine as Portugal's Jaen, gives fragrant, light, red-fruited wines on the slate and granite of the Sil valley.",
     "grapes": [
      "Mencía"
     ],
     "id": "e-6aiaquox",
     "q": "Valdeorras DO is famous for its white wine, yet the Court also lists it for red. Which grape makes that red?",
     "row": "Wine Law /Appellations: DOs",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "All three are Rías Baixas Albariño houses: Pazo Señorans at Meis and Granbazán in Val do Salnés, and Lagar de Cervera in O Rosal at the mouth of the Miño. The Court asks a Certified candidate to recognise them and to sell their wine with food.",
     "grapes": [
      "Albariño"
     ],
     "id": "e-8y3cjtzz",
     "opts": [
      "Ribeira Sacra Mencía",
      "Valdeorras Godello",
      "Monterrei Godello",
      "Rías Baixas Albariño"
     ],
     "q": "Pazo Señorans, Granbazán and Lagar de Cervera are the Court's named producers of which Galician wine?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "a": 2,
     "exp": "The Court calls Albariño a classic match for simply prepared shellfish and bivalves because of its coastal origin, crisp acidity and delicate flavour. Steamed mussels, oysters or grilled octopus meet its salt and citrus; oxtail and venison need tannin, and chocolate needs sweetness.",
     "grapes": [
      "Albariño"
     ],
     "id": "e-rxvgkwb8",
     "opts": [
      "Braised oxtail",
      "Chocolate tart",
      "Steamed mussels",
      "Venison stew"
     ],
     "q": "Which dish best meets the classic pairing the Court gives for Rías Baixas Albariño?",
     "row": "Food and Beverage Pairing"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Northwest section of the Iberian Peninsula, also known as Green Spain.; *Be able to recognize Rías Baixas on a map.",
     "topic": "Geography: Location"
    },
    {
     "certified": "Maritime on the coast, becoming more continental moving inland.",
     "intro": "Maritime, humid, cooler than the rest of Spain.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Steep slopes in Ribeira Sacra",
     "intro": "Bodies of Water: Atlantic Ocean, Miño River (Spanish)/Minho River (Portuguese) *Rías Baixas means \"low estuaries,\" referencing the defining feature of the zone.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Granite",
     "intro": "",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Terraced vineyards in Ribeira Sacra.",
     "intro": "High canopy trellising because of humidity",
     "topic": "Grape Growing"
    },
    {
     "certified": "Occasional barrique (barrica) use.",
     "intro": "Made with modern technology, stainless steel tanks. Lees aging is common.",
     "topic": "Winemaking"
    },
    {
     "certified": "Godello",
     "intro": "Albariño",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Mencía",
     "intro": "",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Valdeorras DO:; White Wines: Godello; Red Wines: Mencía; Ribeira Sacra DO; White Wines: Albariño, Godello,; Red Wines: Mencía",
     "intro": "Rías Baixas DO:; White Wines: Wines labeled Albariño must be 100% Albariño.",
     "topic": "Wine Law /Appellations: DOs"
    },
    {
     "certified": "Dry, crisp white wines and light red wines.; Fresh and neutral Godello in Valdeorras; Mencía, Godello, and Albariño in Ribeira Sacra.",
     "intro": "Dry, crisp, aromatic white wines from the Albariño grape variety.",
     "topic": "Style"
    },
    {
     "certified": "Albariño: Pazo Señorans, Granbazán, Lagar de Cervera",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Due to its location, crisp acidity, and delicate flavor profile, Albariño is a classic match for simply prepared shellfish and bivalves.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SPAIN - LA RIOJA",
   "group": "spain-portugal",
   "id": "rioja",
   "map": {
    "cats": {
     "certified": [
      "Spain"
     ],
     "intro": [
      "Spain"
     ]
    },
    "chapters": {
     "certified": [
      "Spain"
     ],
     "intro": [
      "rioja"
     ]
    },
    "countries": [
     "spain"
    ],
    "grapes": [
     "Tempranillo",
     "Grenache / Garnacha",
     "Carignan"
    ],
    "regions": [
     "rioja"
    ],
    "serviceRef": [],
    "techniques": [
     "ageing-terms",
     "oak",
     "carbonic-maceration"
    ]
   },
   "name": "Spain: La Rioja",
   "order": 17,
   "outcome": {
    "certified": "After studying this section, a candidate will have a deeper knowledge of Rioja, including the subzones, specific aging requirements, iconic producers, and differences between traditional and modern styles. A Certified Sommelier will be able to recognize iconic producers and be able to sell and recommend food pairings with wines from Rioja to a guest.",
    "intro": "After studying this section, a student will know the general location, climate, grape varieties, styles, and label language of Rioja."
   },
   "pages": [
    38,
    39
   ],
   "questions": [
    {
     "accept": [
      "rioja alavesa",
      "alavesa",
      "la rioja alavesa"
     ],
     "ans": "Rioja Alavesa",
     "exp": "Rioja Alavesa, in the Basque province of Álava, sits on high terraces beneath the Sierra de Cantabria and takes the most Atlantic influence. The Court calls Rioja Alta continental and Rioja Oriental, the former Rioja Baja, Mediterranean: lower, hotter and drier, where Garnacha ripens best.",
     "id": "e-mib0xw3g",
     "q": "The Court's Certified climate cell calls one of Rioja's three subzones the coolest and wettest. Name it.",
     "row": "Geography: Climate Categories",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Court's three Rioja soils are calcareous clay, ferrous clay and alluvial. Pale calcareous clay covers Alavesa's terraces and the higher Alta and is the soil the finest Tempranillo prefers; reddish, iron-rich clay patches the Alta and the Oriental, and alluvial gravel lines the Ebro and its tributaries.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-ertt6cqz",
     "opts": [
      "Granite sand",
      "Volcanic tuff",
      "Ferrous clay",
      "Slate"
     ],
     "q": "Beside calcareous clay and alluvial ground, which third soil does the Court list for Rioja?",
     "row": "Soil: Type and/or Name"
    },
    {
     "accept": [
      "reserva",
      "rioja reserva",
      "a reserva",
      "reserva tinto"
     ],
     "ans": "Reserva",
     "exp": "The Court's ladder for Rioja Tinto is Crianza at two years with one in oak, Reserva at three years with one in oak, and Gran Reserva at five years with two in oak. The Consejo's current rules add at least six months in bottle for a Reserva, and its burgundy back label shows the tier at a glance.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-ntxa2uv8",
     "q": "Which ageing term does the Court give a Rioja Tinto that must age at least three years, one of them in oak?",
     "row": "Wine Law / Label Terms / Classification",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Court's Certified style cell sets modern producers using French oak and avoiding the traditional ageing terms against the classic houses, whose long ageing in American oak gives coconut, vanilla and dill. A modern wine is usually named for its vineyard or its estate rather than for its time in cask.",
     "id": "e-4j3v6lx1",
     "opts": [
      "American oak",
      "Acacia",
      "Chestnut",
      "French oak"
     ],
     "q": "Some modern Rioja producers make fruit-focused wines and leave Crianza, Reserva and Gran Reserva off the label. Which cask wood does the Court say they favour?",
     "row": "Style"
    },
    {
     "accept": [
      "225 litres",
      "225",
      "225 l",
      "225l",
      "225 liters",
      "two hundred and twenty five litres",
      "two hundred twenty five litres",
      "two hundred and twenty-five litres"
     ],
     "ans": "225 litres",
     "exp": "The Court asks for the link between Bordeaux and Rioja during phylloxera's devastation of France. Merchants who crossed the Pyrenees brought the 225 litre barrica and Bordeaux's habit of long cask ageing, which the Haro and Logroño houses kept, choosing American oak; Spanish law still counts only casks of 330 litres or less towards the ageing terms.",
     "id": "e-dgewzj3o",
     "q": "Bordeaux merchants who came to Rioja when phylloxera ruined their own vineyards brought a standard barrel with them. What is its capacity?",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Court's Rioja houses are Marqués de Riscal, Marqués de Cáceres, Finca Allende, Bodegas López de Heredia and La Rioja Alta. Vega Sicilia is the Court's Ribera del Duero estate, Clos Mogador one of its Priorat names and Pazo Señorans one of its Rías Baixas Albariño houses.",
     "id": "e-4t5cx815",
     "opts": [
      "Vega Sicilia",
      "Marqués de Cáceres",
      "Pazo Señorans",
      "Clos Mogador"
     ],
     "q": "Which of these houses stands on the Court's list of Rioja producers?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "a": 0,
     "exp": "The Court asks how oak and oxidation change a pairing. Long ageing softens a Gran Reserva's tannin and adds leather, dried fruit and vanilla, which meet roast lamb, game or aged cheese; the same notes swamp raw shellfish, clash with the chilli and lime of a papaya salad, and taste thin against a sweet dessert.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-2t906m9u",
     "opts": [
      "Roast leg of lamb",
      "Lemon sorbet",
      "Raw oysters",
      "Green papaya salad"
     ],
     "q": "A traditional Rioja Gran Reserva has spent years in American oak and taken on a mellow, oxidative, savoury character. Which dish suits it best?",
     "row": "Food and Beverage Pairing"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "North Central Spain",
     "topic": "Geography: Location"
    },
    {
     "certified": "Climate varies with the subzone:; Alta is continental, Alavesa is the coolest and wettest, Oriental is Mediterranean.",
     "intro": "Cantabrian Mountains, creating a rain shadow. Continental climate.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Mountains: Foothills of the Cantabrian and Pyrenees Mountains.; Bodies of Water: Ebro River",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Calcareous clay, ferrous clay, alluvial",
     "intro": "",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Carbonic maceration is common on Joven styles.",
     "intro": "Rioja is traditionally aged in American oak.",
     "topic": "Winemaking"
    },
    {
     "certified": "Malvasia, Garnacha Blanca",
     "intro": "Viura",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Mazuelo, Graciano",
     "intro": "Tempranillo, Garnacha",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "La Rioja DOCa Subzones:; Rioja Alta; Rioja Oriental; Rioja Alavesa",
     "intro": "La Rioja DOCa:; Dry red (tinto) wines from the Tempranillo grape variety and white (blanco) wines from the Viura grape variety.",
     "topic": "Wine Law / Appellation: DOCa"
    },
    {
     "certified": "Viñedo Singular (Single Vineyard); Joven; Know specific aging requirements for Rioja Tinto; Crianza: min 2 years, including 1 year in oak; Reserva: min 3 years, including 1 year in oak; Gran Reserva: min 5 years, including 2 years in oak",
     "intro": "Crianza, Reserva, Gran Reserva; Specific aging and quality tiers based on minimum required time (in ascending order) wine spends in oak barrel and bottle.; **Knowledge of the actual time requirements is not necessary at this level.",
     "topic": "Wine Law / Label Terms / Classification"
    },
    {
     "certified": "Rioja Rosado (rosé) wines are also produced.; Some modern producers are making more fruit-focused wines using French oak and avoiding the traditional labeling terms of Crianza, Reserva and Gran Reserva.",
     "intro": "Dry red wines and dry white wines. Styles range from young and fresh to ageable.",
     "topic": "Style"
    },
    {
     "certified": "Marqués de Riscal, Marqués de Cáceres, Finca Allende, Bodegas López de Heredia, La Rioja Alta",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Understand that, typically, Gran Reserva is only made in the best vintages.",
     "intro": "",
     "topic": "Vintage"
    },
    {
     "certified": "Understand the relationship between Bordeaux and Rioja during phylloxera's devastation of France and its significance to winemaking and aging practices.",
     "intro": "",
     "topic": "History & Lore"
    },
    {
     "certified": "Understand how oak use and amount of oxidation can affect the pairing.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SPAIN - CASTILLA Y LEÓN",
   "group": "spain-portugal",
   "id": "castilla-y-leon",
   "map": {
    "cats": {
     "certified": [
      "Spain"
     ],
     "intro": [
      "Spain"
     ]
    },
    "chapters": {
     "certified": [
      "Spain"
     ],
     "intro": [
      "castilla"
     ]
    },
    "countries": [
     "spain"
    ],
    "grapes": [
     "Tempranillo",
     "Verdejo",
     "Sauvignon Blanc",
     "Mencía"
    ],
    "regions": [
     "ribera-del-duero",
     "rueda-toro",
     "bierzo"
    ],
    "serviceRef": [],
    "techniques": [
     "altitude-diurnal",
     "ageing-terms",
     "oak"
    ]
   },
   "name": "Spain: Castilla y León",
   "order": 18,
   "outcome": {
    "certified": "After studying this section, a candidate will have deeper knowledge of the major DOs within Castilla y León, including specific aging requirements. A Certified Sommelier will be able to recognize iconic producers and be able to sell and recommend food pairings with wines from Ribera del Duero to a guest.",
    "intro": "After studying this section, a student will know the major DOs within Castilla y León, the grape varieties used, and styles of wine produced."
   },
   "pages": [
    40,
    41
   ],
   "questions": [
    {
     "accept": [
      "cantabrian mountains",
      "the cantabrian mountains",
      "cantabrian",
      "the cantabrians",
      "cantabrian range",
      "the cantabrian range",
      "cordillera cantabrica",
      "cordillera cantábrica",
      "la cordillera cantábrica"
     ],
     "ans": "The Cantabrian Mountains",
     "exp": "The Court's Introductory climate cell names the Cantabrian Mountains, which catch the rain off the Bay of Biscay before it reaches the northern meseta. Ribera del Duero gets little more than 450 millimetres a year as a result, and the same range shelters Rioja to the east.",
     "id": "e-26kkneoc",
     "q": "Which mountain range to the north puts the Duero vineyards of Castilla y León in a rain shadow, by the Court's account?",
     "row": "Geography: Climate Categories",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Court describes a continental climate with extreme seasonal and diurnal shifts. On the high plateau a hot August day can be followed by a night some 20 degrees colder, which holds acidity and builds colour and tannin in Tempranillo's skins; the sea is far away and spring frost is a real hazard.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-er692ge1",
     "opts": [
      "Constant sea breezes",
      "Frost-free winters",
      "Heavy summer rain",
      "Extreme diurnal shifts"
     ],
     "q": "Besides the rain shadow, which feature of Castilla y León's continental climate does the Court stress?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 2,
     "exp": "The Court's physical feature for Castilla y León is the high altitude meseta, the plateau of central Spain, with vineyards at roughly 700 to 1,000 metres. The montado is Portugal's cork oak savannah, the garrigue the scrub of southern France and the puszta the Hungarian plain.",
     "id": "e-9sig06te",
     "opts": [
      "Garrigue",
      "Puszta",
      "Meseta",
      "Montado"
     ],
     "q": "What name is given to the high, flat central plateau that carries Ribera del Duero, Rueda and Toro?",
     "row": "Geography: Physical Feature"
    },
    {
     "a": 1,
     "exp": "The Court lists Rueda's whites as Verdejo and Sauvignon Blanc. A Rueda Verdejo label needs at least 85 per cent Verdejo and a Rueda Sauvignon at least 85 per cent Sauvignon Blanc; the two share a herbal, citrus register. Albariño is Galician, Parellada Catalan and Hondarrabi Zuri Basque.",
     "grapes": [
      "Sauvignon Blanc",
      "Verdejo"
     ],
     "id": "e-5d1isaa8",
     "opts": [
      "Albariño",
      "Sauvignon Blanc",
      "Parellada",
      "Hondarrabi Zuri"
     ],
     "q": "Rueda's fresh whites are based on Verdejo. Which second grape does the Court name for them?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "accept": [
      "tinta del país",
      "tinta del pais",
      "tinto del país",
      "tinto del pais",
      "tinto fino",
      "tinta fina"
     ],
     "ans": "Tinta del País",
     "exp": "Ribera del Duero calls Tempranillo Tinta del País or Tinto Fino, and Toro calls it Tinta de Toro, the two synonyms the Court prints. Elsewhere it is Cencibel in La Mancha, Ull de Llebre in Catalonia and Tinta Roriz or Aragonez in Portugal.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-cd4likca",
     "q": "Tinta de Toro is one of the two names the Court prints for Tempranillo in Castilla y León. What is the other, used in Ribera del Duero?",
     "row": "Wine: Red Grape Variety Names",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Court's Certified cell gives Bierzo red wines that can be enjoyed young or aged for a few years: Mencía on the slate slopes of this sheltered basin in the province of León gives floral, red-fruited reds of medium body, fresh enough to drink early and structured enough to keep. Five years with two in oak is the Ribera del Duero Gran Reserva rule, not a description of Bierzo.",
     "grapes": [
      "Mencía"
     ],
     "id": "e-oz7i9by4",
     "opts": [
      "Closed for a decade before they open",
      "Released only after five years, two in oak",
      "Made to be drunk within the year",
      "Enjoyable young or after a few years"
     ],
     "q": "How does the Court describe the drinking window of the red wines of Bierzo DO?",
     "row": "Wine Law / Appellations: DOs"
    },
    {
     "a": 0,
     "exp": "The Court gives Ribera del Duero Crianza a minimum of two years including one in oak, Reserva three years including one in oak, and Gran Reserva five years including two in oak. Ribera's barrel minimums are stricter than Spain's national floors, which ask only six months in oak of a Crianza.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-917b0w1x",
     "opts": [
      "One year",
      "Two years",
      "Eighteen months",
      "Six months"
     ],
     "q": "A Ribera del Duero Reserva tinto ages for three years in all. How much of that time, at the least, must it spend in oak?",
     "row": "Label Terms"
    },
    {
     "accept": [
      "five years",
      "5 years",
      "5",
      "five",
      "5 yrs",
      "60 months",
      "sixty months"
     ],
     "ans": "Five years",
     "exp": "Ribera del Duero Gran Reserva needs at least five years of ageing, two of them in oak, by the Court's Certified cell, the same figures it gives for Rioja. The rest of the time is spent in bottle, and the long release suits the firm tannin of high-altitude Tinto Fino.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-zxh1jg8i",
     "q": "A Ribera del Duero Gran Reserva tinto must spend at least two years in oak. What minimum total ageing does the Court set for it?",
     "row": "Label Terms",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The Court lists Martinsancho under Rueda: a Verdejo from La Seca, in the heart of the denomination, made from an old family vineyard of the grape. Its other Castilian names are Vega Sicilia, Pesquera and Pingus for Ribera del Duero and Descendientes de J. Palacios for Bierzo.",
     "grapes": [
      "Verdejo"
     ],
     "id": "e-2kc5n6gg",
     "opts": [
      "Rueda",
      "Ribera del Duero",
      "Bierzo",
      "Toro"
     ],
     "q": "Martinsancho is the Court's named producer for which Castilian DO?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "a": 2,
     "exp": "The Court lists Descendientes de J. Palacios under Bierzo. Founded in 1999 at Corullón, the estate farms old Mencía on steep slate terraces, with Pétalos as its entry wine and the single vineyard La Faraona at the top; the family's other estates lie in Priorat and Rioja.",
     "grapes": [
      "Mencía"
     ],
     "id": "e-6ph23ofk",
     "opts": [
      "Rueda",
      "Cigales",
      "Bierzo",
      "Toro"
     ],
     "q": "Descendientes de J. Palacios is the Court's named house for which DO of Castilla y León?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "a": 1,
     "exp": "The Court's Ribera del Duero style runs from young wines for early drinking to long ageing in American or French oak. American oak gives the older coconut and vanilla style; French oak, favoured by many modern estates, gives finer grain and spice to the dark, firm Tinto Fino.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-kmbjhnus",
     "opts": [
      "Portuguese or Russian",
      "American or French",
      "Hungarian or Slavonian",
      "Chestnut or acacia"
     ],
     "q": "In which two kinds of oak does the Court say Ribera del Duero reds may be aged?",
     "row": "Style"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "North Central Spain",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Cantabrian Mountains, creating a rain shadow. Continental climate with extreme seasonal and diurnal shifts.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "High altitude meseta.; Bodies of Water: Duero River (called the Douro in Portugal)",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Fresh white wines in Rueda.; Red wines are made in a range of styles from early (young) consumption to age-worthy.; Wines are aged in American oak and French oak.",
     "topic": "Winemaking"
    },
    {
     "certified": "",
     "intro": "Verdejo, Sauvignon Blanc",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Mencía; Tempranillo synonyms: Tinta del País, Tinta de Toro",
     "intro": "Tempranillo",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Bierzo DO; Red, Mencía-based wines that can be enjoyed young or aged for a few years.",
     "intro": "Toro DO; Primarily red wines based on Tempranillo, often emphasizing ripeness and concentration.; Ribera del Duero DO; Primarily Tempranillo-based blends, in styles that range from fresh for early drinking to long-aged in American or French oak.; Rueda DO; Fresh white wines based on Verdejo and Sauvignon Blanc grape varieties.",
     "topic": "Wine Law / Appellations: DOs"
    },
    {
     "certified": "Ribera del Duero: specific aging requirements for Crianza, Reserva, Gran Reserva (Tinto); Crianza: min 2 years, including 1 year in oak; Reserva: min 3 years, including 1 year in oak; Gran Reserva: min 5 years, including 2 years in oak",
     "intro": "Ribera del Duero; Crianza, Reserva, Gran Reserva; Specific aging and quality tiers based on minimum required time (in ascending order) wine spends in oak barrel and bottle.; **Knowledge of the actual time requirements is not necessary at this level.",
     "topic": "Label Terms"
    },
    {
     "certified": "",
     "intro": "Ribera del Duero: For young consumption or long aging that can be in American or French oak.",
     "topic": "Style"
    },
    {
     "certified": "Ribera del Duero: Vega Sicilia, Pesquera, Pingus; Bierzo: Descendientes de J. Palacios; Rueda: Martinsancho",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SPAIN - CATALONIA / CATALUNYA",
   "group": "spain-portugal",
   "id": "catalonia",
   "map": {
    "cats": {
     "certified": [
      "Spain"
     ],
     "intro": [
      "Spain"
     ]
    },
    "chapters": {
     "certified": [
      "Spain"
     ],
     "intro": [
      "catalonia"
     ]
    },
    "countries": [
     "spain"
    ],
    "grapes": [
     "Grenache / Garnacha",
     "Carignan",
     "Chardonnay",
     "Pinot Noir"
    ],
    "regions": [
     "penedes",
     "priorat"
    ],
    "serviceRef": [],
    "techniques": [
     "traditional-method",
     "steep-slopes",
     "oak"
    ]
   },
   "name": "Spain: Catalonia",
   "order": 19,
   "outcome": {
    "certified": "After studying this section, a candidate will have a deeper understanding of Priorat DOCa and Cava DO, including aging requirements. A Certified Sommelier will be able to recognize iconic producers and be able to sell and recommend food pairings with wines from these regions to a guest.",
    "intro": "After studying this section, a student will understand the general location, styles, and grape varieties of the Cava DO and Priorat DOCa."
   },
   "pages": [
    42,
    43
   ],
   "questions": [
    {
     "a": 0,
     "exp": "The Court's Certified climate cell for Priorat reads significant diurnal shifts. Summer days pass 35 °C, but the altitude of the hills, up to about 750 metres, and the ring of ranges around the bowl bring cool nights that keep acidity and freshness in Garnacha and Cariñena.",
     "grapes": [
      "Grenache / Garnacha",
      "Carignan"
     ],
     "id": "e-f9v1zi2k",
     "opts": [
      "Big diurnal shifts",
      "Heavy summer rain",
      "Persistent sea fog",
      "Late spring snow"
     ],
     "q": "Priorat's climate is hot and dry Mediterranean. What does the Court's Certified cell add about it?",
     "row": "Geography: Climate Categories"
    },
    {
     "accept": [
      "bush vine",
      "bush vines",
      "bush-vine",
      "bush trained",
      "bush-trained",
      "gobelet",
      "goblet",
      "en vaso",
      "vaso",
      "head trained",
      "head-trained",
      "bush vine gobelet"
     ],
     "ans": "Bush vine (gobelet)",
     "exp": "The Court's Certified grape growing cell names bush vine (gobelet) training: a free-standing vine with short arms spurred from the head of the trunk and no wire. On Priorat's slate it gives naturally low yields, and the same form is the alberello of southern Italy and the en vaso of Spain.",
     "id": "e-q6x2jakn",
     "q": "Which way of training Priorat's old vines does the Court name, asking a candidate to recognise it in a photograph?",
     "row": "Grape Growing",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Court says Priorat's terrain does not allow for mechanisation. Old bush vines on narrow terraces and on the costers, slopes planted straight up the hillside, are pruned and picked by hand, and the slate holds so little water that each vine carries only a handful of bunches.",
     "id": "e-rx4stmfl",
     "opts": [
      "Cover crops",
      "Organic farming",
      "Mechanisation",
      "Pruning"
     ],
     "q": "What does Priorat's steep terrain rule out in the vineyard, by the Court's account?",
     "row": "Grape Growing"
    },
    {
     "a": 0,
     "exp": "The Court's Introductory winemaking cell says Cava typically uses the gyropalette, which it calls a Spanish invention, instead of riddling by hand. The machine turns a cage of several hundred bottles in programmed steps over a few days, where a pupitre, the hand riddling rack, takes weeks.",
     "id": "e-tn2b7til",
     "opts": [
      "Gyropalette",
      "Basket press",
      "Autoclave",
      "Pupitre"
     ],
     "q": "Which machine does the Court say Cava producers typically use instead of riddling by hand?",
     "row": "Winemaking"
    },
    {
     "accept": [
      "garnacha blanca",
      "garnatxa blanca",
      "grenache blanc",
      "white grenache",
      "white garnacha"
     ],
     "ans": "Garnacha Blanca",
     "exp": "Garnacha Blanca, Garnatxa Blanca in Catalan, is the Court's Certified white for Catalonia beside international varieties. On Priorat's slate it leads rich, stony dry whites with Macabeu and Pedro Ximénez, while Xarel-lo, Parellada and Macabeo remain the Introductory Cava grapes.",
     "id": "e-jnrnj6fy",
     "q": "Which white grape, Priorat's leading white, does the Court add for Catalonia at the Certified level?",
     "row": "Wine: White Grape Variety Names",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Court's Certified red grapes for Catalonia are Pinot Noir and other international red varieties. Pinot Noir is permitted in Cava for white and rosado wines, while Cabernet Sauvignon and Syrah came into Priorat's blends with the pioneers of the 1980s; Zinfandel, Nebbiolo and Pinotage play no part here.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-wsxpamfq",
     "opts": [
      "Nebbiolo",
      "Pinot Noir",
      "Pinotage",
      "Zinfandel"
     ],
     "q": "Which international red grape does the Court name for Catalonia at the Certified level?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "accept": [
      "eighteen months",
      "18 months",
      "18",
      "eighteen",
      "18 mos",
      "a year and a half",
      "one and a half years",
      "1.5 years",
      "1 and a half years"
     ],
     "ans": "Eighteen months",
     "exp": "The Court's Certified cell gives Cava (Cava de Guarda) a minimum of nine months on the lees and Reserva eighteen. Under the rules applied from 2022, Reserva, Gran Reserva at thirty months and Cava de Paraje Calificado at thirty-six form the vintage-dated Cava de Guarda Superior family; fifteen months is the minimum for Clàssic Penedès.",
     "id": "e-j1muowbp",
     "q": "A Cava de Guarda needs at least nine months on its lees. What minimum does the Court give for a Cava Reserva?",
     "row": "Wine Law / Appellation: DO, DOCa",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Court's Introductory winemaking cell says modern winemaking, including the use of French oak, is common in Priorat. The Gratallops pioneers of the late 1980s aged their wines in new French barriques; many houses now prefer larger and older casks, but French oak remains the norm, unlike the American oak of traditional Rioja.",
     "grapes": [
      "Grenache / Garnacha",
      "Carignan"
     ],
     "id": "e-mvjsi2j7",
     "opts": [
      "Hungarian",
      "American",
      "Slavonian",
      "French"
     ],
     "q": "Which oak does the Court say is common in Priorat's modern winemaking?",
     "row": "Winemaking"
    },
    {
     "a": 2,
     "exp": "The Court's Certified cell says DO Cava covers all of Spain, but the vast majority is made within the Penedès DO of Catalonia, above all around Sant Sadurní d'Anoia. DO Penedès is a separate geographic denomination for still wines and for Clàssic Penedès, its own traditional method sparkling.",
     "id": "e-5nsius4k",
     "opts": [
      "Montsant",
      "Alella",
      "Penedès",
      "Priorat"
     ],
     "q": "Cava may be made across Spain. Within which DO of Catalonia does the Court say the vast majority is made?",
     "row": "Wine Law / Appellation: DO, DOCa"
    },
    {
     "accept": [
      "gratallops"
     ],
     "ans": "Gratallops",
     "exp": "At Gratallops a small group of newcomers made their first vintage, 1989, in one shared cellar and sold it as five clos wines: destemmed fruit, long macerations and new French oak. The project gave Priorat its modern style and its reputation, which is why the Court calls Priorat a modern wine that made a big impact in a short time.",
     "id": "e-vgcy0547",
     "q": "The Court asks for the significance of one Priorat village's project in the late 1980s. Name the village.",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Clos Erasmus is one of the Court's Priorat producers, with Clos Mogador, Clos Martinet and Scala Dei, all names from the Gratallops revival or the old priory. Clos de Vougeot is a Burgundy grand cru, Clos Sainte Hune an Alsace Riesling and Clos du Mesnil a single-vineyard Champagne.",
     "grapes": [
      "Grenache / Garnacha"
     ],
     "id": "e-olqy7qoa",
     "opts": [
      "Clos du Mesnil",
      "Clos Erasmus",
      "Clos Sainte Hune",
      "Clos de Vougeot"
     ],
     "q": "Which of these clos wines stands on the Court's list of Priorat producers?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "a": 3,
     "exp": "The Court asks how Priorat's oak, ripeness, intensity and alcohol affect a pairing. Its weight and firm tannin need a dish of equal richness, such as braised lamb, game or a stew; alcohol fans the heat of chilli, and the wine swamps delicate oysters or a light goat's cheese salad.",
     "grapes": [
      "Grenache / Garnacha",
      "Carignan"
     ],
     "id": "e-er3dyzx9",
     "opts": [
      "Goat's cheese salad",
      "Raw oysters",
      "Chilli prawns",
      "Braised lamb shoulder"
     ],
     "q": "A young Priorat is ripe, intense, oaky and high in alcohol. Which dish suits it best?",
     "row": "Food and Beverage Pairing"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Northeastern Spain, in the foothills of the Pyrenees. Near the Mediterranean Sea and the city of Barcelona.",
     "topic": "Geography: Location"
    },
    {
     "certified": "Priorat: Significant diurnal shifts",
     "intro": "Priorat: Hot and dry Mediterranean; Cava: Moderate due to altitude (where most Cava is made).",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Priorat: Steep, terraced slopes.; Cava: High-altitude sites in the Pyrenees.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Priorat: Llicorella soil allows vines to dig deep for water.",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Priorat: Terrain does not allow for mechanization. Use of bush vine (Gobelet) training, naturally low yields.; **Recognize a photo of bush vine/Gobelet training.",
     "intro": "",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Priorat: Modern winemaking, including the use of French oak, is common.; Cava: Traditional Method sparkling wines. The gyropalette (a Spanish invention) is typically used instead of riddling by hand.",
     "topic": "Winemaking"
    },
    {
     "certified": "Garnacha Blanca, international varieties",
     "intro": "Cava: Xarel-lo, Parellada, Macabeo",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Pinot Noir, other international red varieties",
     "intro": "Priorat: Garnacha, Cariñena, international varieties",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Penedès DO; Cava DO:; Covers all of Spain, but the vast majority of Cava is made within the Penedès DO of Catalonia.; Cava Aging Requirements:; Cava (Cava de Guarda): min 9 months on lees; Reserva: min 18 months on lees",
     "intro": "Cava DO:; Traditional Method Sparkling, white, and rosado styles of wine based on native Spanish grape varieties listed above.; Priorat DOCa:; Primarily still, dry reds based on Garnacha, Cariñena, and international varieties.",
     "topic": "Wine Law / Appellation: DO, DOCa"
    },
    {
     "certified": "",
     "intro": "Priorat is a powerful, intense, spicy Garnacha-based blend, often aged in French oak and blended with international varieties.; The Cava DO is for traditional method sparkling wine.",
     "topic": "Style"
    },
    {
     "certified": "Priorat: Rene Barbier (Clos Mogador), Álvaro Palacios, Clos Erasmus, Clos Martinet, Scala Dei; Cava: Gramona",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "The significance of the Gratallops project to the style and reputation of Priorat DOCa.",
     "intro": "Priorat is a modern Spanish wine, not a traditional style. It made a big impact in a short period of time and is highly respected.",
     "topic": "History & Lore"
    },
    {
     "certified": "Understand the effects of Priorat's oak use, ripeness, intensity, and alcohol level in regard to food pairing.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": true,
   "court": "SPAIN - OTHER DOs *CERTIFIED SOMMELIER EXAM ONLY*",
   "group": "spain-portugal",
   "id": "spain-other-dos",
   "map": {
    "cats": {
     "certified": [
      "Spain"
     ],
     "intro": []
    },
    "chapters": {
     "certified": [
      "Spain"
     ],
     "intro": []
    },
    "countries": [
     "spain"
    ],
    "grapes": [
     "Mourvèdre / Monastrell"
    ],
    "regions": [
     "jumilla-yecla",
     "la-mancha"
    ],
    "serviceRef": [],
    "techniques": [
     "phylloxera-rootstocks"
    ]
   },
   "name": "Spain: Other DOs",
   "order": 20,
   "outcome": {
    "certified": "After studying this section, a student will know the styles of wine made in selected DOs beyond the classic regions.",
    "intro": ""
   },
   "pages": [
    44,
    45
   ],
   "questions": [
    {
     "accept": [
      "castilla-la mancha",
      "castilla la mancha",
      "castile-la mancha",
      "castile la mancha",
      "castilla-la-mancha",
      "la mancha"
     ],
     "ans": "Castilla-La Mancha",
     "exp": "The Court places DO Pago estates throughout Spain but concentrated in Castilla-La Mancha, which held the first of them, Dominio de Valdepusa in Toledo and Finca Élez in Albacete, both recognised in 2003. Navarra, Valencia, Castilla y León and Aragón hold the rest.",
     "id": "e-vnxi03m6",
     "q": "The Vinos de Pago are spread throughout Spain. In which autonomous community does the Court say they are concentrated?",
     "row": "Geography: Location",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Court calls the País Vasco moderate maritime, the same Green Spain it names for Galicia, against Murcia's warm Mediterranean. Atlantic rain and mild temperatures on the Bay of Biscay keep acidity high and alcohol low in the grapes for Txakoli.",
     "id": "e-sparu21d",
     "opts": [
      "Hot continental",
      "Semi-arid",
      "Moderate maritime",
      "Warm Mediterranean"
     ],
     "q": "Which climate does the Court give the País Vasco, the Basque coast where Txakoli is grown?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 0,
     "exp": "The Court's Certified grape growing cell says Monastrell vines were historically ungrafted because of the sandiness of the soil. Phylloxera cannot move or survive well in loose sand, so many Jumilla vines grew on their own roots until the louse arrived in 1989.",
     "grapes": [
      "Mourvèdre / Monastrell"
     ],
     "id": "e-hsjt1sxt",
     "opts": [
      "The sandy soil",
      "The sea winds",
      "The high altitude",
      "The cold winters"
     ],
     "q": "Why were Murcia's Monastrell vines historically left ungrafted, according to the Court?",
     "row": "Grape Growing"
    },
    {
     "a": 3,
     "exp": "The Court's Certified winemaking cell for the País Vasco reads modern: temperature-controlled stainless steel tanks. Cool fermentation keeps Txakoli fresh, sharp and lightly effervescent; the same cell gives the DO Pago estates primarily international styles of red wine.",
     "id": "e-w9obr6qh",
     "opts": [
      "Concrete eggs",
      "Clay amphorae",
      "New French barriques",
      "Stainless steel tanks"
     ],
     "q": "In what does the Court say modern Txakoli is made?",
     "row": "Winemaking"
    },
    {
     "accept": [
      "hondarrabi zuri",
      "hondarribi zuri",
      "ondarrabi zuri",
      "hondarrabi zuria",
      "hondarribi zuria"
     ],
     "ans": "Hondarrabi Zuri",
     "exp": "Hondarrabi Zuri, zuri meaning white in Basque, is the Court's white grape for the País Vasco and the base of nearly all Txakoli. Its black-skinned partner Hondarrabi Beltza, beltza meaning black, gives the rare reds and rosados.",
     "id": "e-e5874xpd",
     "q": "Which white grape does the Court name for the Txakoli of the País Vasco?",
     "row": "Wine: White Grape Variety Names",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Court lists Jumilla DO in Murcia for dry red wine focused on pure Monastrell and Monastrell-based blends. The late-ripening grape, Mourvèdre in France, needs the long heat of the southeast to soften its tannin; Mencía is the red of Bierzo, Graciano a Rioja blender and Hondarrabi Beltza Basque.",
     "grapes": [
      "Mourvèdre / Monastrell"
     ],
     "id": "e-jnjjfc2r",
     "opts": [
      "Mencía",
      "Hondarrabi Beltza",
      "Graciano",
      "Monastrell"
     ],
     "q": "Jumilla DO makes dry red wine focused on which grape, pure or as the base of blends?",
     "row": "Wine Law /Appellations: DOs"
    },
    {
     "accept": [
      "arabako txakolina",
      "arabako txakolina do",
      "do arabako txakolina",
      "arabako",
      "txakoli de álava",
      "txakoli de alava",
      "chacolí de álava",
      "chacoli de alava",
      "álava",
      "alava"
     ],
     "ans": "Arabako Txakolina",
     "exp": "The three Txakoli DOs are named for the three Basque provinces: Getariako Txakolina in Gipuzkoa, the oldest, Bizkaiko Txakolina in Bizkaia and Arabako Txakolina in Álava, the youngest. The Court gives all three the same wine: primarily dry white, lightly effervescent, high in acidity and meant for early drinking.",
     "id": "e-q5yiwna0",
     "q": "Getariako Txakolina and Bizkaiko Txakolina are two of the Court's three Txakoli DOs. Which is the third?",
     "row": "Wine Law /Appellations: DOs",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Court's style cell says Txakoli is lightly effervescent with high acidity, mostly dry white with rare reds and rosados, and meant for early consumption. The prickle comes from carbon dioxide kept in the wine at bottling, and Basque bars pour it from a height to lift it.",
     "id": "e-4ig8mw6a",
     "opts": [
      "Foaming like beer",
      "Completely still",
      "Lightly effervescent",
      "Fully sparkling"
     ],
     "q": "How does the Court describe the fizz of a Txakoli?",
     "row": "Style"
    },
    {
     "a": 1,
     "exp": "A DO Pago, or Vino de Pago, is a single estate with its own denomination, which the Court asks a candidate to define and to place in the Spanish hierarchy. Each one is a producer appellation for one property, often outside traditional styles, rather than a region that growers share.",
     "id": "e-ri0u67ll",
     "opts": [
      "A whole province",
      "A single estate",
      "A group of villages",
      "A river valley"
     ],
     "q": "What unit of land does a Spanish DO Pago protect?",
     "row": "Classification"
    },
    {
     "accept": [
      "2003",
      "in 2003",
      "two thousand and three",
      "two thousand three"
     ],
     "ans": "2003",
     "exp": "The Court dates the Vinos de Pago to 2003, the year of Spain's national wine law, Ley 24/2003 de la Viña y del Vino. The number of pagos has grown since the Court's count of twenty in 2022, so the founding year is the stable fact to hold.",
     "id": "e-cos3hf7m",
     "q": "In which year was the Vinos de Pago category first created?",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Court says Murcia avoided phylloxera until the 1980s: the louse reached Jumilla in 1989, a century after it ravaged most of Europe. The replanting on rootstock that followed brought Syrah and Cabernet Sauvignon into the region beside the old ungrafted Monastrell.",
     "grapes": [
      "Mourvèdre / Monastrell"
     ],
     "id": "e-qsbchziw",
     "opts": [
      "The 1880s",
      "The 1980s",
      "The 1920s",
      "The 1950s"
     ],
     "q": "Until which decade did Murcia escape phylloxera, by the Court's account?",
     "row": "History & Lore"
    },
    {
     "a": 0,
     "exp": "The Court pairs Txakoli whites traditionally with oily seafood: anchovies, sardines and the pintxos of the Basque coast. The wine's sharp acidity, low alcohol and light prickle cut through the oil and salt, where game, blue cheese and chocolate need more weight or sweetness.",
     "id": "e-i86lnuox",
     "opts": [
      "Oily seafood",
      "Roast game",
      "Dark chocolate",
      "Aged blue cheese"
     ],
     "q": "With which kind of food does the Court say Txakoli whites are traditionally served?",
     "row": "Food and Beverage Pairing"
    }
   ],
   "rows": [
    {
     "certified": "País Vasco: Atlantic coast of northern Spain; Murcia: Mediterranean coast of southeast Spain; DO Pago: Distributed throughout Spain, concentrated in Castilla-La Mancha",
     "intro": "",
     "topic": "Geography: Location"
    },
    {
     "certified": "País Vasco: Moderate maritime (a.k.a. Green Spain); Murcia: Warm Mediterranean",
     "intro": "",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "País Vasco: Atlantic Ocean",
     "intro": "",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Murcia: Historically, Monastrell vines were ungrafted due to the sandiness of the soil.",
     "intro": "",
     "topic": "Grape Growing"
    },
    {
     "certified": "País Vasco: Modern: temperature-controlled stainless steel tanks; DO Pago: Primarily international styles of red wine.",
     "intro": "",
     "topic": "Winemaking"
    },
    {
     "certified": "País Vasco: Hondarrabi Zuri",
     "intro": "",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "País Vasco: Hondarrabi Beltza; Murcia: Monastrell (Mourvèdre); DO Pago: International grape varieties",
     "intro": "",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "País Vasco: Bizkaiko Txakolina DO; Primarily dry white. Reds and rosés (rosados) are rare. Wines are lightly effervescent with high acidity. Meant for early consumption.; Arabako Txakolina DO; Primarily dry white. Reds and rosés (rosados) are rare. Wines are lightly effervescent with high acidity. Meant for early consumption.; Getariako Txakolina DO; Primarily dry white. Reds and rosés (rosados) are rare. Wines are lightly effervescent with high acidity. Meant for early consumption.; Murcia: Jumilla DO; Dry red wine focused on pure Monastrell and Monastrell-based blends.; DO Pago: Understand the concept and definition of the DO Pago. **It is not necessary to memorize the list of Pago producers.",
     "intro": "",
     "topic": "Wine Law /Appellations: DOs"
    },
    {
     "certified": "País Vasco: Primarily dry white wine. Reds and rosés (rosados) are rare. Wines are lightly effervescent with high acidity. Meant for early consumption.; Murcia: Dry red wine; DO Pago: Primarily red wine",
     "intro": "",
     "topic": "Style"
    },
    {
     "certified": "DO Pago: Understand the place of DO Pago in Spanish wine hierarchy. **It is not important to learn any of their names at this level.",
     "intro": "",
     "topic": "Classification"
    },
    {
     "certified": "Murcia: Juan Gil",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Murcia: Avoided phylloxera until 1980s.; DO Pago: Vinos de Pagos was first created in 2003. There are 20 Vinos de Pagos as of 2022, serving the purpose of producer appellations outside of traditional winemaking styles.",
     "intro": "",
     "topic": "History & Lore"
    },
    {
     "certified": "País Vasco: Txakoli whites are traditionally served with oily seafood.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "PORTUGAL",
   "group": "spain-portugal",
   "id": "portugal",
   "map": {
    "cats": {
     "certified": [
      "Portugal"
     ],
     "intro": [
      "Portugal"
     ]
    },
    "chapters": {
     "certified": [
      "Portugal"
     ],
     "intro": [
      "portugal"
     ]
    },
    "countries": [
     "portugal"
    ],
    "grapes": [
     "Touriga Nacional",
     "Albariño"
    ],
    "regions": [
     "vinho-verde",
     "douro",
     "dao",
     "bairrada",
     "alentejo",
     "madeira"
    ],
    "serviceRef": [],
    "techniques": [
     "steep-slopes",
     "port-fortification",
     "madeira-estufagem-canteiro"
    ]
   },
   "name": "Portugal",
   "order": 21,
   "outcome": {
    "certified": "After studying this section, a candidate will be able to match major grape varieties to their respective DOPs and styles. Certified Sommeliers will be able to recommend and sell food pairings with wines from Portugal to a guest.",
    "intro": "After studying this section, a student will know the location of Portugal on a map and Portugal's important wine regions and grape varieties."
   },
   "pages": [
    46
   ],
   "questions": [
    {
     "accept": [
      "lagares",
      "lagar",
      "a lagar",
      "the lagar",
      "lagars",
      "the lagares"
     ],
     "ans": "Lagares",
     "exp": "The Court's Certified general term is lagares, stone fermenters: open, waist-high troughs, usually of granite, in which teams tread the grapes to extract colour and tannin quickly. They matter most for Port, whose fermentation is stopped after two or three days, and traditional Alentejo and Bairrada estates still use them for table wine.",
     "id": "e-ljm2qvrg",
     "q": "What does Portugal call the shallow stone troughs in which grapes are trodden by foot and fermented?",
     "row": "General Terms",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Court's Certified soil cell for the Douro and Porto DOPs is schist and granite. Schist splits into near-vertical plates that roots follow deep to water, and it carries the finest vineyards; granite outcrops at the region's edges and on higher ground, holds less water and is graded down in the vineyard register.",
     "id": "e-34b4nxsj",
     "opts": [
      "Limestone",
      "Basalt",
      "Marl",
      "Granite"
     ],
     "q": "The Court lists schist for the Douro and Porto DOPs. Which second rock does its Certified cell add?",
     "row": "Soil: Type and/or Name"
    },
    {
     "accept": [
      "tinta negra",
      "tinta negra mole",
      "negra mole"
     ],
     "ans": "Tinta Negra",
     "exp": "Tinta Negra is the Court's Certified red grape for Madeira and the island's most planted variety, the workhorse of most blended Madeira. The four noble whites the Court lists at the Introductory level, Sercial, Verdelho, Bual and Malmsey, run from driest to sweetest.",
     "id": "e-czdrs60a",
     "q": "The Madeira grapes the Court lists at the Introductory level are all white. Which red grape does its Certified cell add?",
     "row": "Wine: Red Grape Variety Names",
     "sa": 1
    },
    {
     "accept": [
      "baixo corgo",
      "the baixo corgo",
      "lower corgo",
      "the lower corgo"
     ],
     "ans": "Baixo Corgo",
     "exp": "The Court's Douro subregions run upstream from Baixo Corgo, nearest the Serra do Marão, which catches the Atlantic rain, through Cima Corgo around Pinhão to Douro Superior at the Spanish border. Rainfall falls from about 900 millimetres in the Baixo Corgo to under 400 in the Douro Superior.",
     "id": "e-98r0sz83",
     "q": "Which of the Court's three Douro subregions, the westernmost and wettest, lies nearest the Serra do Marão?",
     "row": "Wine Law /Appellations: DOPs",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Court adds Dão, Alentejo and Bairrada to the Douro subregions at the Certified level. Alentejo covers the hot plains of the south, inland from Lisbon towards the Spanish border, while Bairrada lies near the coast between Aveiro and Coimbra, Dão in the granite hills inland from it and the Douro in the far north.",
     "id": "e-oeuoqc8v",
     "opts": [
      "Douro",
      "Alentejo",
      "Dão",
      "Bairrada"
     ],
     "q": "Which of the DOPs in the Court's Certified column lies furthest south?",
     "row": "Wine Law /Appellations: DOPs"
    },
    {
     "a": 0,
     "exp": "The Court's style cell calls Douro DOP wines bold, dry reds, and Porto DOP fortified, sweet red wine from the same valley. Touriga Nacional and its partners on hot schist give dark, firm, concentrated table wines that the region took seriously from the 1950s onward.",
     "grapes": [
      "Touriga Nacional"
     ],
     "id": "e-ji3zg33p",
     "opts": [
      "Bold and dry",
      "Pale and off-dry",
      "Fortified and sweet",
      "Light and sweet"
     ],
     "q": "How does the Court describe the still red wines of the Douro DOP?",
     "row": "Style"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "On the Iberian Peninsula on the Western border of Spain.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Wide range from maritime in the north on the Atlantic coast. Warm continental into the interior of the country toward the border with Spain.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Bodies of Water:; The Douro River- same as the Duero River in Spain; Atlantic Ocean- the western border of Portugal; Mountains: Very mountainous interior",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Douro and Porto DOP: Schist and Granite",
     "intro": "Douro and Porto DOP: Schist",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Douro and Porto DOP: Terraces on the mountainsides",
     "intro": "",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Vinho Verde DOP: Low alcohol, slight effervescence.; Porto DOP and Madeira DOP: Fortified wines",
     "topic": "Winemaking"
    },
    {
     "certified": "",
     "intro": "Vinho Verde: Alvarinho; Madeira: Sercial, Verdelho, Bual, Malmsey",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Madeira: Tinta Negra",
     "intro": "Douro DOP and Porto DOP: Touriga Nacional",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Douro DOP subregions: Cima Corgo, Baixo Corgo, Douro Superior; Dão DOP; Alentejo DOP; Bairrada DOP; Alentejo DOP",
     "intro": "Vinho Verde DOP; Douro DOP; Porto DOP; Madeira DOP",
     "topic": "Wine Law /Appellations: DOPs"
    },
    {
     "certified": "Single Quinta: Small producers",
     "intro": "",
     "topic": "Label Terms"
    },
    {
     "certified": "Lagares: Stone fermenters",
     "intro": "",
     "topic": "General Terms"
    },
    {
     "certified": "",
     "intro": "Vinho Verde DOP: Low alcohol, slight effervescence.; Douro DOP: Bold, dry red wines; Porto DOP: Fortified, sweet red wine; Madeira DOP: Fortified, dry, medium dry, and sweet white wines",
     "topic": "Style"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "GERMANY",
   "group": "central-europe",
   "id": "germany",
   "map": {
    "cats": {
     "certified": [
      "Germany"
     ],
     "intro": [
      "Germany"
     ]
    },
    "chapters": {
     "certified": [
      "Germany"
     ],
     "intro": [
      "germany"
     ]
    },
    "countries": [
     "germany"
    ],
    "grapes": [
     "Riesling",
     "Silvaner",
     "Pinot Blanc",
     "Pinot Gris / Grigio",
     "Pinot Noir"
    ],
    "regions": [
     "mosel",
     "rheingau",
     "rheinhessen",
     "pfalz",
     "nahe",
     "franken",
     "baden",
     "ahr"
    ],
    "serviceRef": [
     "temperatures",
     "bottles"
    ],
    "techniques": [
     "late-harvest",
     "noble-rot",
     "ice-wine",
     "enrichment-acidification",
     "steep-slopes"
    ]
   },
   "name": "Germany",
   "order": 22,
   "outcome": {
    "certified": "After studying this section, a candidate will expand their knowledge of wine terms, label terms, history, lore, and classifications. A candidate will be able to describe the general styles of finished wine, including structure and flavors. A Certified Sommelier will know the proper ways to include the wines of Germany on a wine list, be able to recognize iconic producers, and be able to recommend and sell food pairings with these wines to a guest.",
    "intro": "After studying this section, a student will understand Germany's climate, the importance of rivers, soil types, grape varieties, and learn about selected wine regions. Students will recognize the hierarchy of German wine law (Wein, Qualitätswein, Prädikatswein), and the progression of Prädikat levels."
   },
   "pages": [
    47,
    48,
    49,
    50,
    51
   ],
   "questions": [
    {
     "a": 0,
     "exp": "Germany's vineyards lie between about 47 and 52 degrees north, at the cool edge of the wine world, with cold winters and warm but short growing seasons, so the Court calls the climate cool continental. Rivers and steep south-facing slopes supply the warmth the latitude lacks; moderate continental is the Court's word for Hungary, not Germany.",
     "id": "e-21l7dwpq",
     "opts": [
      "Cool Continental",
      "Moderate Maritime",
      "Warm Mediterranean",
      "Moderate Continental"
     ],
     "q": "Which climate category does the Court give for Germany's wine regions as a whole?",
     "row": "Geography: Climate Categories"
    },
    {
     "accept": [
      "edelfäule",
      "edelfaule",
      "edelfaeule"
     ],
     "ans": "Edelfäule",
     "exp": "Edelfäule, literally noble rot, is the German word for Botrytis cinerea when it shrivels ripe, healthy grapes in a misty autumn and concentrates their sugar and acid. It is the source of most Beerenauslese and Trockenbeerenauslese; Eiswein reaches the same must weight by frost instead, with no botrytis at all.",
     "id": "e-udu1de54",
     "q": "Which German label term means noble rot, the botrytis behind Beerenauslese and Trockenbeerenauslese?",
     "row": "Label Terms",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Schloss names a castle estate just as château does in Bordeaux, and the Rheingau holds the famous pair: Schloss Johannisberg, with its Spätlese legend of 1775, and Schloss Vollrads at Winkel. Both are Ortsteile, so their labels may carry the estate name without a village name in front of it. Domaine answers instead to Weingut, the plain wine estate.",
     "id": "e-bz7cqhyi",
     "opts": [
      "Clos",
      "Domaine",
      "Mas",
      "Château"
     ],
     "q": "Schloss, German for castle, is the counterpart on a German label of which French word?",
     "row": "Label Terms"
    },
    {
     "a": 1,
     "exp": "Dönnhoff farms the Brücke at Oberhausen, the Hermannshöhle at Niederhausen and the Kupfergrube, and its Riesling, from dry Grosses Gewächs to Eiswein, put the Nahe on the world's lists. The Court's other names place Hans Wirsching in Franken, Robert Weil, Künstler and Leitz in the Rheingau, Gunderloch in Rheinhessen and Joh. Jos. Prüm, Fritz Haag and Selbach-Oster on the Mosel.",
     "grapes": [
      "Riesling"
     ],
     "id": "e-h2ihags8",
     "opts": [
      "Mosel",
      "Nahe",
      "Rheingau",
      "Franken"
     ],
     "q": "Dönnhoff, one of the estates the Court names among Germany's producers, is the reference house of which Anbaugebiet?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "accept": [
      "qmp",
      "q.m.p.",
      "qualitätswein mit prädikat",
      "qualitatswein mit pradikat",
      "qualitaetswein mit praedikat",
      "qmp qualitätswein mit prädikat",
      "qmp qualitatswein mit pradikat",
      "prädikatswein",
      "pradikatswein"
     ],
     "ans": "QmP, Qualitätswein mit Prädikat",
     "exp": "The 1971 law made ripeness at harvest the measure of quality: QbA, Qualitätswein bestimmter Anbaugebiete, was quality wine from a named region that could be chaptalised, and QmP, Qualitätswein mit Prädikat, was the riper wine that could not. QmP was renamed Prädikatswein in 2007, the name the label carries today, with the same six Prädikate.",
     "id": "e-qxnicnvz",
     "q": "The German Wine Law of 1971 set up two top categories of wine, and one of them was QbA. Name the other.",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Rheinhessen, the rolling country inside the bend of the Rhine between Mainz, Worms and Bingen, is the largest of the thirteen regions by area and by output, and the Court lists Riesling as its grape, though Müller-Thurgau, Silvaner and Dornfelder are widely grown there too. The Pfalz to its south is second in size and Württemberg comes after Baden, while the Mosel, for all its fame, is far smaller.",
     "id": "e-49teuahj",
     "opts": [
      "Mosel",
      "Pfalz",
      "Württemberg",
      "Rheinhessen"
     ],
     "q": "Which Anbaugebiet does the Court name as Germany's largest, both in vineyard area and in the volume of wine it makes?",
     "row": "Wine Law / Appellations"
    },
    {
     "a": 0,
     "exp": "Deutscher Sekt is sparkling wine from German grapes, made by any method, tank or bottle. A label that reads simply Sekt may be made from base wine grown anywhere in the European Union, while Sekt b.A. must come wholly from one of the thirteen Anbaugebiete and name it, and Riesling is common but never required.",
     "id": "e-a2tbm9j2",
     "opts": [
      "Grapes grown in Germany",
      "Riesling grapes only",
      "Grapes from a single Anbaugebiet",
      "Grapes grown anywhere in the EU"
     ],
     "q": "By the Court's definition, from which grapes must Deutscher Sekt be made?",
     "row": "Winemaking"
    },
    {
     "a": 2,
     "exp": "The Court describes Beerenauslese as very sweet and often touched by botrytis, so it sits with the dessert wines beside Trockenbeerenauslese and Eiswein, poured in small measures and served well chilled. Trocken wines join the crisp dry whites, and Kabinett and Spätlese, off-dry in their classic form, sit with the off-dry and aromatic whites.",
     "grapes": [
      "Riesling"
     ],
     "id": "e-1f0pti6o",
     "opts": [
      "With the off-dry whites",
      "With the sparkling wines",
      "With the dessert wines",
      "With the crisp, dry whites"
     ],
     "q": "A wine list is arranged by style. Where does a Riesling Beerenauslese belong on it?",
     "row": "Service of Beverage"
    },
    {
     "a": 2,
     "exp": "Dry Riesling has the acidity to cut brown butter and the delicacy to leave river fish intact, the same reasoning that makes it a partner for pork, roast chicken and asparagus. The very sweet styles belong with foie gras, blue cheese and fruit desserts, and off-dry Kabinett or Spätlese is the answer for chilli heat and spice.",
     "grapes": [
      "Riesling"
     ],
     "id": "e-mjm2dh6c",
     "opts": [
      "Beerenauslese",
      "Trockenbeerenauslese",
      "Trocken",
      "Eiswein"
     ],
     "q": "A guest orders pan-fried trout with brown butter and almonds and asks for a German Riesling. Which style suits the dish best?",
     "row": "Food and Beverage Pairing"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Most wine regions in Germany are located in the southwest of the corner of the country on the borders with France, Belgium and Switzerland.; Northerly location: Vineyards planted at 49°N and above.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Cool Continental",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Rivers: The Rhine River and its tributaries:; High importance of moderating influence from rivers. Rivers reflect sunlight back up to the vineyards increasing warmth to aid in ripening.; Mountains:; Mountains provide protection from cold north winds and create rain shadows.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Mosel: Slate; Other regions: various soil types",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "",
     "intro": "Steep, south-facing hillsides maximize sun exposure and warmth. Carefully selected vineyards for successful ripening. Cool growing seasons.",
     "topic": "Grape Growing"
    },
    {
     "certified": "Deutscher Sekt: Sparkling wine made by any method from grapes grown in Germany.",
     "intro": "Large wooden fuder or stück or stainless-steel fermentation.; Residual sugar often left in the wine to counterbalance acidity (not all sugars are fermented to alcohol).; Alcohol in off-dry wine is generally low.; Wines can be fermented dry, remain off-dry, or lusciously sweet.; Chaptalization: The process of adding sugar to unfermented grape must in order to increase the alcohol content after fermentation. Used when grapes do not achieve sufficient sugar ripeness.",
     "topic": "Winemaking"
    },
    {
     "certified": "Müller-Thurgau, Silvaner, Weissburgunder (Pinot Blanc), Grauburgunder (Pinot Gris)",
     "intro": "Riesling (most planted and most important)",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Spätburgunder (Pinot Noir)",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Wines without Geographic Indication:; Deutscher Wein; Wines with Geographic Indication:; Landwein - Regional Wines; Qualitätswein:; Quality wine from one of the 13 major wine regions called Anbaugebiete.; Prädikatswein (prädikat means \"distinction\"):; Subset of Qualitätswein categorized by ripeness (ripeness = level of sugar in the grapes) at harvest.; Considered the highest quality level for wines with residual sugar.; Chaptalization is not allowed.; Six prädikate (levels of quality):; Recognize these styles in order of ripeness.; Understand the general styles of the finished wines and typical level of sweetness.; Understand these designations are categorized by ripeness at harvest, however choices made in the winery will determine finished sweetness of the wine.; 1. Kabinett: off-dry in style, can also be made trocken (dry); 2. Spätlese: off-dry in style, can also be made trocken (dry); 3. Auslese: often off-dry in style, can sometimes be made trocken (dry); 4. Beerenauslese: very sweet in style, often affected by botrytis.; 5. Eiswein: very sweet in style, grapes must be frozen. No effects of botrytis.; **same ripeness-level as Beerenauslese; 6. Trockenbeerenauslese: very sweet in style",
     "topic": "Wine Law / Classification"
    },
    {
     "certified": "VDP - Verband Deutscher Pradikatsweingüter: National German association of producers committed to traditional quality winemaking. Developed their own classification system on Burgundy model with classified top vineyard sites.; Recognize VDP logo.; Grosses Gewächs: Single Vineyard Grand Cru Wines; Erstes Gewächs: Single Vineyard Premier Cru Wines",
     "intro": "",
     "topic": "Wine Law / Classification"
    },
    {
     "certified": "Gemeinde: Local community or village; Einzellage: Single vineyard; Oechsle Scale: The German scale used to measure must weight.; Bocksbeutel: Unique, flattened ellipsoid wine bottle specific to the Franken Anbaugebiete.",
     "intro": "Anbaugebiete: One of 13 wine growing areas/regions.; Prädikate: Quality levels based on ripeness at harvest (Kabinett, Spätlese etc.).",
     "topic": "General Terms"
    },
    {
     "certified": "Halbtrocken: Half-dry; Edelfäule: Noble rot (botrytis); Schloss: German word for castle, similar to the French word for château.",
     "intro": "Trocken: Dry",
     "topic": "Label Terms"
    },
    {
     "certified": "Important Anbaugebiete of Germany; Nahe:; Nahe River is a tributary of the Rhine.; Continental Climate; Grape Variety: Riesling; Franken:; Located along the Main river near Frankfurt.; White Grape Varieties: Silvaner; Red Grape Varieties: Spätburgunder; Special bottle shape called a Bocksbeutel; Baden; Covers a large area along the French and Swiss borders.; Warmest growing area.; Main Grape Varieties: Spätburgunder, Müller Thurgau; Mittelrhein; Steep slopes along the Rhein River; Climate: Continental; Main Grape Variety: Riesling; Slate Soil; Ahr; Ahr River; One of Germany’s smallest and most northerly winegrowing regions, north of the 50th parallel.; Main Grape Variety: Spätburgunder (some of the best in Germany)",
     "intro": "Important Anbaugebiete of Germany; Mosel; Along the Mosel River. Soil: Slate that is porous and heat-retaining South-facing vineyards to capture warmth of the sun. Grape Variety: Riesling; *Recognize major villages on a map as being part of the Mosel: Erden, Ürzig, Wehlen, Bernkastel-Kues, Piesport; Pfalz; Continuation of Alsace, mountain protection, Rhein River moderates climate. One of the warmest areas in Germany, focus is on dry wines.; Grape Varieties: Riesling, Spätburgunder; Rheinhessen; The largest Anbaugebiete in size and production volume. Rhein River; Grape Varieties: Riesling; Rheingau; Mountains protect the region from the cold north. Long, south-facing slope facing the Rhein River; Rhein River (moderates and reflects light); Climate: Continental Grape Varieties: Riesling, Spätburgunder; *Recognize Johannisberg as a major village on a map of the Rheingau.",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "Nahe: Hermann Dönnhoff; Franken: Hans Wirsching; Rheingau: Franz Künstler, Robert Weil, Josef Leitz; Rheinhessen: Gunderloch; Mosel: Fritz Haag, Dr. Loosen, Egon Müller, Joh. Jos. Prüm, Selbach-Oster",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "1971 German Wine Law; Stipulated ripeness level at harvest as the prime determinant for quality.; Established the top two categories of wine QBA and QMP.",
     "intro": "",
     "topic": "History & Lore"
    },
    {
     "certified": "Know styles and sweetness levels and where each belongs on a wine list and appropriate serving temperatures.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Pairings with both sweet and dry Riesling.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "AUSTRIA",
   "group": "central-europe",
   "id": "austria",
   "map": {
    "cats": {
     "certified": [
      "Austria"
     ],
     "intro": [
      "Austria"
     ]
    },
    "chapters": {
     "certified": [
      "Austria"
     ],
     "intro": [
      "austria"
     ]
    },
    "countries": [
     "austria"
    ],
    "grapes": [
     "Grüner Veltliner",
     "Riesling",
     "Zweigelt",
     "Blaufränkisch"
    ],
    "regions": [
     "wachau-kamptal-kremstal",
     "burgenland",
     "steiermark",
     "wien"
    ],
    "serviceRef": [],
    "techniques": [
     "steep-slopes"
    ]
   },
   "name": "Austria",
   "order": 23,
   "outcome": {
    "certified": "After studying this section, a candidate will increase their knowledge of general terms, styles of wine, and classifications in Austria. A Certified Sommelier will be able to recognize iconic producers and be able to recommend and sell food pairings with Austrian Grüner Veltliner to a guest.",
    "intro": "After studying this section, a student will be able to identify and locate major Austrian wine regions and appellations. A student will understand important geographic features, major grape varieties, and how Austrian wines differ from German wines."
   },
   "pages": [
    52,
    53
   ],
   "questions": [
    {
     "a": 0,
     "exp": "Langenlois is the heart of the Kamptal, the valley of the Kamp, which the Court prints as the Kampt River; its DAC is for dry Grüner Veltliner and Riesling, with the Heiligenstein above Zöbing as its great site. The Krems gives its name to the neighbouring Kremstal and the Traisen to the Traisental, both also tributaries of the Danube.",
     "grapes": [
      "Grüner Veltliner",
      "Riesling"
     ],
     "id": "e-9pdq4i6y",
     "opts": [
      "Kamp",
      "Thaya",
      "Krems",
      "Traisen"
     ],
     "q": "The wine town of Langenlois gives its wine to a DAC named after the Danube tributary that flows past it. Which river is that?",
     "row": "Wine Law / Appellations"
    },
    {
     "a": 1,
     "exp": "Knoll at Unterloiben and Prager at Weissenkirchen farm the terraces of the Wachau gorge, and Prager was among the founders of the Vinea Wachau in 1983, whose Steinfeder, Federspiel and Smaragd both houses use. Of the Court's other names, Bründlmayer and Schloss Gobelsburg are in the Kamptal, while the two Pichler estates are also Wachau houses.",
     "grapes": [
      "Grüner Veltliner",
      "Riesling"
     ],
     "id": "e-itrb8u32",
     "opts": [
      "Weinviertel",
      "Wachau",
      "Kamptal",
      "Kremstal"
     ],
     "q": "Knoll and Prager, two of the producers the Court names, both make their wine in which Austrian DAC?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "a": 2,
     "exp": "Schloss Gobelsburg sits at the southern end of the Kamptal near Langenlois, with holdings in the Heiligenstein and the Lamm, and keeps a tradition line made in old wooden casks. Bründlmayer, also on the Court's list, is the Kamptal's other benchmark house, so two of the Court's six Austrian names belong to this one valley.",
     "grapes": [
      "Grüner Veltliner",
      "Riesling"
     ],
     "id": "e-mn7yg2j0",
     "opts": [
      "Wachau",
      "Kremstal",
      "Kamptal",
      "Traisental"
     ],
     "q": "Schloss Gobelsburg, a Cistercian castle estate among the Court's named producers, lies in which DAC?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "accept": [
      "asparagus",
      "artichoke",
      "artichokes",
      "white asparagus",
      "green asparagus",
      "asparagus or artichokes",
      "asparagus and artichokes",
      "artichokes and asparagus",
      "globe artichoke"
     ],
     "ans": "Asparagus or artichokes",
     "exp": "Asparagus and artichokes make most wines taste metallic or oddly sweet, but an unoaked, crisp, dry Grüner Veltliner with its green, peppery edge meets them on their own terms. The Court also pairs it with fresh seafood, smoked fish, herby dishes, fresh cheeses and schnitzel, all of which suit its purity and acidity.",
     "grapes": [
      "Grüner Veltliner"
     ],
     "id": "e-dlbp20vl",
     "q": "The Court names two hard-to-pair vegetables that Grüner Veltliner handles well. Name either one.",
     "row": "Food and Beverage Pairing",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The banderole is the red-white-red strip across the capsule of every Austrian Qualitätswein, Prädikatswein included, and it carries the state test number. Wein and Landwein never wear it. The Prüfnummer is the number itself, Goldkapsel is a German producer's mark for a richer selection, and Weinsiegel is a German quality seal.",
     "id": "e-jip7d8os",
     "opts": [
      "Weinsiegel",
      "Banderole",
      "Prüfnummer",
      "Goldkapsel"
     ],
     "q": "What name does the Court give the Austrian wine capsule that marks a wine of Qualitätswein level or higher?",
     "row": "Label Terms"
    },
    {
     "accept": [
      "federspiel"
     ],
     "ans": "Federspiel",
     "exp": "The Vinea Wachau's three categories run Steinfeder, named for a feathery grass, then Federspiel, named for the lure a falconer swings to call the bird back, then Smaragd, named for the emerald lizards on the terrace walls. Federspiel is the dry, medium-bodied wine for the table, between the light Steinfeder and the rich Smaragd.",
     "id": "e-7eqmoyy8",
     "q": "Which Wachau category, the middle of the three by ripeness, takes its name from a tool used in falconry?",
     "row": "Wine Law / Classification",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Zweigelt was bred at Klosterneuburg in 1922 from Blaufränkisch and St. Laurent and is now Austria's most planted red: sour cherry, soft tannin, juicy and easy to chill. Blaufränkisch, the old parent, is the deeper, peppery grape of Mittelburgenland, while Blauburger is a different crossing, of Blauer Portugieser with Blaufränkisch.",
     "grapes": [
      "Zweigelt",
      "Blaufränkisch"
     ],
     "id": "e-d485qkn0",
     "opts": [
      "Pinot Noir",
      "Blauburger",
      "Blauer Portugieser",
      "St. Laurent"
     ],
     "q": "Zweigelt, one of the Court's two Austrian reds, was bred in 1922 by crossing Blaufränkisch with which grape?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "accept": [
      "new oak",
      "new",
      "new oak barrels",
      "new barrels",
      "new barriques",
      "new barrique",
      "new french oak",
      "new casks"
     ],
     "ans": "New oak",
     "exp": "Austrian whites are made for purity of fruit, fermented in stainless steel or large old casks that give texture without an oak flavour, and the Court notes that new oak is rarely used for them. The aim is the crisp, unoaked Grüner Veltliner and Riesling of the Danube, very dry or, in Burgenland, very sweet.",
     "grapes": [
      "Grüner Veltliner"
     ],
     "id": "e-oixptmt2",
     "q": "Which kind of oak does the Court say is rarely used in making Austrian white wine?",
     "row": "Winemaking",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Eastern Austria",
     "topic": "Geography: Location"
    },
    {
     "certified": "Some Mediterranean climates (warm air from the east)",
     "intro": "Continental",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Foothills of the Alps Mountains; Danube River",
     "topic": "Geography: Physical Features"
    },
    {
     "certified": "",
     "intro": "Steep hillsides overlooking the Danube River and its tributaries.",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Very dry or very sweet white wine, no current production of off-dry styles. New oak is rarely used for white wine production.",
     "topic": "Winemaking"
    },
    {
     "certified": "Riesling",
     "intro": "Grüner Veltliner",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Zweigelt, Blaufränkisch",
     "intro": "",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Wines Without Geographical Indication:; Wein; Wines With Geographical Indication:; Landwein: Regional wines, rarely exported; Qualitätswein; DAC (Districtus Austriae Controllatus):; Quality Wine/Appellation of Origin, similar to AOC or DOC system, specific grape varieties and styles are permitted, the focus is on dry wines.; Prädikatswein: Like Germany but rarely produced in Austria.",
     "topic": "Wine Law / Classification"
    },
    {
     "certified": "Wachau Classification Levels:; From the least ripe to most ripe; Steinfeder: Named for the feathery grass grown in the area.; Federspiel: An ancient term for a tool used in falconry.; Smaragd: Highest level of ripeness, named for green lizards in the vineyards.",
     "intro": "Wachau has its own classification system based on grape ripeness at harvest.; Example:; Smaragd: Highest level of ripeness, named for green lizards in the vineyards.",
     "topic": "Wine Law / Classification"
    },
    {
     "certified": "Regions:; - Burgenland; - Mittelburgenland; - Steiermark (Styria); - Wein; - Niederösterreich; - Kremstal DAC: Along the Krems River (tributary to the Danube). Dry whites from Grüner Veltliner and Riesling.; - Kamptal DAC: Along the Kampt River (a tributary of the Danube). Dry whites using Grüner Veltliner and Riesling.; - Wachau DAC: Dry whites from Grüner Veltliner and Riesling. Located along the Danube River. Vinea Wachau \"Codex Wachau\" Wachau has another separate classification system based on ripeness/natural alcohol potential.",
     "intro": "Region:; Niederösterreich (Lower Austria); Sub-Regions of Niederösterreich:; - Kamptal DAC; - Kremstal DAC; - Wachau DAC",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "Banderole: The name for the Austrian wine capsule indicating the wine Qualitätswein level or higher.",
     "intro": "Recognize an Austrian wine capsule.",
     "topic": "Label Terms"
    },
    {
     "certified": "Emmerich Knoll, Rudi Pichler, FX Pichler, Prager, Schloss Gobelsberg, Bründlmayer",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Grüner Veltliner is an unoaked, crisp, dry white wine. Its purity of flavor is great with fresh seafood, smoked fish, fresh vegetables, dishes with fresh herbs. It is a great contrast to fresh cheeses, schnitzel, and hard-to-pair foods like asparagus and artichokes.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "HUNGARY",
   "group": "central-europe",
   "id": "hungary",
   "map": {
    "cats": {
     "certified": [
      "Hungary & Greece"
     ],
     "intro": []
    },
    "chapters": {
     "certified": [
      "Hungary & Greece"
     ],
     "intro": [
      "hungary"
     ]
    },
    "countries": [
     "hungary"
    ],
    "grapes": [
     "Furmint"
    ],
    "regions": [
     "tokaj"
    ],
    "serviceRef": [
     "temperatures"
    ],
    "techniques": [
     "noble-rot"
    ]
   },
   "name": "Hungary",
   "order": 24,
   "outcome": {
    "certified": "After studying this section, a student will understand Tokaji's grape growing and winemaking. A Certified Sommelier will be able to sell and recommend food pairings with Tokaji to a guest.",
    "intro": "After studying this section, a student will be able to recognize Tokaji as a wine from Hungary and one of the great sweet wines of the world."
   },
   "pages": [
    54
   ],
   "questions": [
    {
     "a": 2,
     "exp": "Hungary lies inland in the Carpathian Basin, east of Austria, with cold winters and warm summers, and the Court calls its climate moderate continental. In Tokaj the long, dry, bright autumn is what matters, when warm days and misty mornings let noble rot take hold; cool continental is the Court's word for Germany.",
     "id": "e-aot9s6r6",
     "opts": [
      "Warm Mediterranean",
      "Cool Maritime",
      "Moderate Continental",
      "Cool Continental"
     ],
     "q": "Which climate category does the Court give for Hungary, home of Tokaji?",
     "row": "Geography: Climate Categories"
    },
    {
     "accept": [
      "bodrog",
      "the bodrog",
      "bodrog river",
      "the bodrog river",
      "river bodrog",
      "the river bodrog"
     ],
     "ans": "Bodrog",
     "exp": "The Bodrog meets the Tisza at the town of Tokaj, and autumn mist rising off the rivers settles on the south-facing slopes of the Zemplén hills each morning before the sun burns it off. That alternation of damp and dry lets botrytis shrivel the grapes nobly rather than rotting them grey.",
     "grapes": [
      "Furmint"
     ],
     "id": "e-rl8tje4y",
     "q": "Which river does the Court name as the source of the humidity that brings noble rot to Tokaj?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "accept": [
      "aszú",
      "aszu",
      "aszú berries",
      "aszu berries",
      "aszú grapes",
      "aszu grapes"
     ],
     "ans": "Aszú",
     "exp": "Aszú berries are picked one at a time, crushed to a paste and steeped in base wine or fermenting must to make Tokaji Aszú. The Court's puttonyos were the baskets, or hods, in which pickers gathered them, and the number of hods once added to a cask set the wine's sweetness on the label.",
     "grapes": [
      "Furmint"
     ],
     "id": "e-77gmrg53",
     "q": "What Hungarian word names the shrivelled, botrytis-affected berries gathered one by one for Tokaj's great sweet wine?",
     "row": "Grape Growing",
     "sa": 1
    },
    {
     "accept": [
      "450",
      "450 g/l",
      "450g/l",
      "450 g",
      "450 grams",
      "450 grams per litre",
      "450 grams per liter",
      "450 grams a litre",
      "450 g per litre",
      "four hundred and fifty grams per litre",
      "four hundred fifty grams per litre",
      "four hundred and fifty"
     ],
     "ans": "450 grams per litre",
     "exp": "Eszencia must carry at least 450 grams of sugar a litre and often holds far more: by the Court's definition it is made entirely of aszú berries, the juice that runs from them under their own weight, and so sweet a must ferments for years and seldom passes a few per cent of alcohol. Tokaji Aszú, which steeps the berries in base wine, needs 120 grams a litre.",
     "grapes": [
      "Furmint"
     ],
     "id": "e-mrbupze4",
     "q": "What minimum residual sugar do the Tokaj rules set for Eszencia, the rarest and sweetest Tokaji?",
     "row": "Label Terms",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Hungary was a communist state from 1949 to 1989, and the Court's line is that Tokaji was not made in those years. The fuller story is that the state farm went on making it for volume while the private, estate-made Aszú tradition was broken; after 1989 foreign and local capital rebuilt the great estates.",
     "id": "e-ve10xkt7",
     "opts": [
      "1956 to 1991",
      "1949 to 1989",
      "1918 to 1945",
      "1939 to 1968"
     ],
     "q": "The Court's History and Lore row marks the communist years as a break in Tokaji's story. Which span of years does it give?",
     "row": "History & Lore"
    },
    {
     "a": 0,
     "exp": "The Royal Tokaji Wine Company was founded at Mád in 1990 by local and foreign partners, the first venture of the post communist years, and it brought back single vineyard labels such as Mézes Mály. Disznókő is at Mezőzombor, Oremus at Tolcsva and Degenfeld at Tarcal.",
     "id": "e-52kj7zhs",
     "opts": [
      "Mád",
      "Tarcal",
      "Tolcsva",
      "Mezőzombor"
     ],
     "q": "Royal Tokaji, the one Hungarian producer the Court names, was founded in 1990 in which village of the region?",
     "row": "Producer/Proprietary Brands"
    },
    {
     "a": 3,
     "exp": "Tokaji Aszú's sweetness meets the richness of foie gras and its bright Furmint acidity cuts the fat, which is why the Court pairs it with foie gras, blue cheese and orchard tarts. Serve it cool in a small pour; the apricot and orange peel of the wine echo a fruit tart.",
     "grapes": [
      "Furmint"
     ],
     "id": "e-yrlr7qna",
     "opts": [
      "Oysters",
      "Grilled lamb chops",
      "Tuna sashimi",
      "Foie gras"
     ],
     "q": "Which dish does the Court name as a partner for Tokaji?",
     "row": "Food and Beverage Pairing"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Hungary is located east of Austria.",
     "topic": "Geography: Location"
    },
    {
     "certified": "Moderate Continental",
     "intro": "",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Bodrog River creates humidity in Tokaj.",
     "intro": "",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Puttonyos: The name of the basket in which the aszú grapes were traditionally gathered.; Aszú: Shrivelled and botrytis-affected berries.",
     "intro": "Botrytis-affected grapes",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Sweet wine making",
     "topic": "Winemaking"
    },
    {
     "certified": "Furmint and Hárslevelű",
     "intro": "Furmint (white)",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Tokaj",
     "topic": "Wine Law / Appellation"
    },
    {
     "certified": "Eszencia: made entirely of Aszú berries.",
     "intro": "",
     "topic": "Label Terms"
    },
    {
     "certified": "Royal Tokaji",
     "intro": "",
     "topic": "Producer/Proprietary Brands"
    },
    {
     "certified": "Tokaji was not made during the communist years between World War II from 1949 to 1989.",
     "intro": "",
     "topic": "History & Lore"
    },
    {
     "certified": "Foie gras, blue cheese, orchard tarts",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    },
    {
     "certified": "Tokaji bottles are normally 500ml (17oz).",
     "intro": "",
     "topic": "BOS"
    }
   ]
  },
  {
   "certifiedOnly": true,
   "court": "GREECE - *CERTIFIED SOMMELIER EXAM ONLY*",
   "group": "central-europe",
   "id": "greece",
   "map": {
    "cats": {
     "certified": [
      "Hungary & Greece"
     ],
     "intro": []
    },
    "chapters": {
     "certified": [
      "Hungary & Greece"
     ],
     "intro": []
    },
    "countries": [
     "greece"
    ],
    "grapes": [
     "Assyrtiko",
     "Xinomavro"
    ],
    "regions": [
     "santorini",
     "naoussa",
     "nemea"
    ],
    "serviceRef": [],
    "techniques": []
   },
   "name": "Greece",
   "order": 25,
   "outcome": {
    "certified": "After studying this section, a candidate will know the location, climate, and grape varieties of three important wine regions of Greece. Certified Sommeliers will recognize iconic producers and be able to recommend and sell food pairings with wines from Greece to a guest.",
    "intro": ""
   },
   "pages": [
    55
   ],
   "questions": [
    {
     "a": 0,
     "exp": "Naoussa lies on the eastern foothills of Mount Vermio in Macedonia, with cold winters that can bring snow, warm summers and a long dry autumn for the late-ripening Xinomavro, so the Court calls it continental. The Court gives Santorini, out in the Aegean, a warm Mediterranean climate instead.",
     "grapes": [
      "Xinomavro"
     ],
     "id": "e-ycq5r0t3",
     "opts": [
      "Continental",
      "Warm Mediterranean",
      "Moderate Maritime",
      "Cool Maritime"
     ],
     "q": "Which climate category does the Court give for the Naoussa PDO in northern Greece?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 3,
     "exp": "Domaine Sigalas, founded in 1991 at Oia in the north of the island, makes Assyrtiko on Santorini's volcanic soils, and its single-vineyard Kavalieros set a modern standard for site-driven Assyrtiko. Crete is home to Vidiano and Liatiko, Samos to Muscat and Kefalonia to Robola.",
     "grapes": [
      "Assyrtiko"
     ],
     "id": "e-0039s31i",
     "opts": [
      "Samos",
      "Kefalonia",
      "Crete",
      "Santorini"
     ],
     "q": "Sigalas, the one Greek producer the Court names, makes its wine on which island?",
     "row": "Producer"
    },
    {
     "a": 3,
     "exp": "The Court calls Naoussa Xinomavro a bold, often oak-aged red that needs meat or animal fat, lamb or beef, to tame its tannin, so roast lamb is the answer. Seafood, roasted fish and fresh cheeses are the Court's partners for Santorini Assyrtiko, the island's crisp, mineral white.",
     "grapes": [
      "Xinomavro"
     ],
     "id": "e-c27y1zwi",
     "opts": [
      "Lemon sorbet",
      "Grilled sea bream",
      "Fresh goat's cheese",
      "Roast lamb"
     ],
     "q": "Naoussa Xinomavro arrives at the table with firm tannin and high acidity. Which dish does the Court's pairing advice point to?",
     "row": "Food and Beverage Pairing"
    },
    {
     "accept": [
      "ionian",
      "the ionian",
      "ionian sea",
      "the ionian sea"
     ],
     "ans": "The Ionian Sea",
     "exp": "The Ionian Sea washes western Greece and islands such as Kefalonia, home of Robola, while the Aegean to the east holds the Cyclades, Santorini among them. The Court places Greece between the two, and the sea's moderating influence reaches most Greek vineyards, which seldom lie far from the coast.",
     "id": "e-xjvvhpbi",
     "q": "Greece lies in southern Europe between two seas: the Aegean to the east and which sea to the west?",
     "row": "Geography: Location",
     "sa": 1
    },
    {
     "accept": [
      "volcanic",
      "volcanic soil",
      "volcanic soils",
      "volcanic ash",
      "volcanic ash and pumice",
      "ash and pumice",
      "volcanic pumice",
      "pumice",
      "ash",
      "lava"
     ],
     "ans": "Volcanic",
     "exp": "Santorini is the rim of a volcano that collapsed into the sea, and its vines grow in layers of ash, pumice and lava with almost no clay. Phylloxera cannot survive in that soil, so the vines grow on their own roots, and the porous pumice soaks up the night's sea humidity through the dry summer.",
     "grapes": [
      "Assyrtiko"
     ],
     "id": "e-768ra1m7",
     "q": "What type of soil does the Court give for Santorini's vineyards?",
     "row": "Soil: Type and/or Name",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The kouloura coils each vine into a low basket on the ground, with the bunches inside, sheltered from the strong summer meltemi off the Aegean, from blown sand and from the sun. It has nothing to do with phylloxera, which the volcanic soil keeps away by itself, and it makes every harvest a hand harvest.",
     "grapes": [
      "Assyrtiko"
     ],
     "id": "e-3gbnm09z",
     "opts": [
      "To keep phylloxera out of the soil",
      "To raise the yield of each vine",
      "To shield the grapes from strong winds",
      "To allow harvest by machine"
     ],
     "q": "Why does the Court say Santorini's vines are trained into the shape of baskets?",
     "row": "Grape Growing"
    },
    {
     "a": 1,
     "exp": "Nemea, in Corinthia in the north-eastern Peloponnese, is Agiorgitiko alone, a deep, plummy red with soft tannin. The exam likes to swap the two great Greek reds: Xinomavro belongs to Naoussa in Macedonia, Rapsani blends it with Krassato and Stavroto, and Amyndeon uses it for rosé and sparkling wine.",
     "id": "e-e8ccg41z",
     "opts": [
      "Amyndeon",
      "Nemea",
      "Naoussa",
      "Rapsani"
     ],
     "q": "Agiorgitiko, one of the Court's two Greek reds, is the grape of which PDO?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "a": 2,
     "exp": "The Court calls Santorini Assyrtiko a classic white with intense acidity and minerality: the grape holds its acid even when it ripens to high sugar in the island's heat, and the volcanic soil and salt air add a saline, flinty edge. That is why the Court sets it beside seafood, roasted fish and fresh cheeses.",
     "grapes": [
      "Assyrtiko"
     ],
     "id": "e-gzy7fr3x",
     "opts": [
      "Firm tannin and sweet oak",
      "Low acidity and an oily texture",
      "Intense acidity and minerality",
      "Soft fruit and residual sugar"
     ],
     "q": "Which pair of traits does the Court say marks Santorini Assyrtiko in the glass?",
     "row": "Wine: White Grape Variety Names"
    }
   ],
   "rows": [
    {
     "certified": "Greece is located in Southern Europe between the Aegean Sea and the Ionian Sea.",
     "intro": "",
     "topic": "Geography: Location"
    },
    {
     "certified": "Santorini PDO; Naoussa PDO; Nemea PDO",
     "intro": "",
     "topic": "Wine Law / Appellation"
    },
    {
     "certified": "Santorini PDO: Warm Mediterranean; Naoussa PDO: Continental",
     "intro": "",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Santorini: Located in the Aegean Sea, salt air influence",
     "intro": "",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Santorini: Volcanic",
     "intro": "",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Santorini: Grapes are grown in the shape of baskets to protect them from intense Aegean winds.",
     "intro": "",
     "topic": "Grape Growing"
    },
    {
     "certified": "Santorini PDO: Assyrtiko",
     "intro": "",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Naoussa PDO: Xinomavro; Nemea PDO: Agiorgitiko",
     "intro": "",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Santorini: Sigalas",
     "intro": "",
     "topic": "Producer"
    },
    {
     "certified": "Santorini Assyrtiko is a classic white wine with intense acidity and minerality. Pairs well with seafood, roasted fish and fresh cheeses.; Naoussa Xinomavro: Bold red wine that is often oak aged. Needs meat or animal fat such as lamb and beef to pair well to tame the rich tannins.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "NORTH AMERICA - CALIFORNIA - NORTH COAST",
   "group": "north-america",
   "id": "california-north-coast",
   "map": {
    "cats": {
     "certified": [
      "California"
     ],
     "intro": [
      "United States"
     ]
    },
    "chapters": {
     "certified": [
      "California"
     ],
     "intro": [
      "calnorth"
     ]
    },
    "countries": [
     "california"
    ],
    "grapes": [
     "Chardonnay",
     "Sauvignon Blanc",
     "Pinot Noir",
     "Merlot",
     "Cabernet Sauvignon",
     "Zinfandel",
     "Syrah / Shiraz"
    ],
    "regions": [
     "napa-sonoma"
    ],
    "serviceRef": [
     "decanting"
    ],
    "techniques": [
     "maritime-fog",
     "oak",
     "malolactic",
     "traditional-method"
    ]
   },
   "name": "North America: California, North Coast",
   "order": 26,
   "outcome": {
    "certified": "After studying this section, a candidate will know the major AVAs in the North Coast, which counties they are located, and the main grape varieties grown. A Certified Sommelier will know basic wine labeling laws, iconic producers and vineyards and will be able to recommend and sell food pairings to a guest.",
    "intro": "After studying this section, a student will know major counties of the North Coast of California, selected AVAs within them, and understand the relation of climate to the grape varieties grown."
   },
   "pages": [
    56,
    57
   ],
   "questions": [
    {
     "a": 3,
     "exp": "Knights Valley is a Sonoma County AVA of 1983, though it runs up to the county line just north-west of Calistoga, which is why it is so often misplaced. It is the warmest corner of Sonoma, planted to Cabernet Sauvignon and Chardonnay on volcanic and alluvial soils; the Court's other Certified names, Mount Veeder, Calistoga and Yountville, all lie in Napa County.",
     "id": "e-uh0boj74",
     "opts": [
      "Napa County",
      "Mendocino County",
      "Lake County",
      "Sonoma County"
     ],
     "q": "Knights Valley AVA, one of the Court's Certified names, lies in which county?",
     "row": "Geography: Appellation"
    },
    {
     "accept": [
      "napa river",
      "the napa river",
      "napa",
      "the napa",
      "river napa"
     ],
     "ans": "The Napa River",
     "exp": "The Napa River rises near Mount St Helena and flows south the length of the valley to San Pablo Bay, the water that sends cool air and fog north into Carneros each afternoon. The Court lists it among the North Coast's physical features with the Sonoma, Mayacamas and Vaca ranges, the bay itself and the Petaluma Wind Gap.",
     "id": "e-pmki9br1",
     "q": "Which river runs down the valley floor between the Mayacamas and the Vaca ranges and empties south into San Pablo Bay?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Court's cell pairs the two: mountain sites crop lighter on thin, rocky soils and, by its account, swing further between day and night, so Howell Mountain, Mount Veeder or Spring Mountain Cabernet comes in small berried, deeply coloured and firmly tannic. The same cell adds that northern Napa, towards Calistoga, is warmer than the bay end.",
     "id": "e-rh83caxk",
     "opts": [
      "Lower yields and smaller diurnal shifts",
      "Higher yields and smaller diurnal shifts",
      "Lower yields and bigger diurnal shifts",
      "Higher yields and bigger diurnal shifts"
     ],
     "q": "What does the Court say mountain vineyards in the North Coast give compared with the valley floors?",
     "row": "Geography: Physical Feature"
    },
    {
     "a": 3,
     "exp": "Carneros and the Anderson Valley give the high acid base wine, and houses such as Schramsberg, Domaine Carneros, Roederer Estate and Iron Horse make it the Champagne way, with the second fermentation in the bottle the guest is poured from and long ageing on the lees. Tank method wine is refermented in a pressurised vat instead, the Prosecco route.",
     "id": "e-woa4b5gc",
     "opts": [
      "Transfer method",
      "Tank method",
      "Ancestral method",
      "Traditional method"
     ],
     "q": "By which method does the Court say North Coast sparkling wine is most commonly made?",
     "row": "Winemaking"
    },
    {
     "a": 2,
     "exp": "The Anderson Valley opens to the Pacific at its western end, and its fog and cool nights suit Pinot Noir, for still wine and as sparkling base beside Chardonnay; Roederer Estate has farmed there since 1982. The Court asks the grapes matched to the AVAs: Cabernet to the warm Napa benches and Alexander Valley, Zinfandel to Dry Creek Valley.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-brbnvd6w",
     "opts": [
      "Merlot",
      "Cabernet Sauvignon",
      "Pinot Noir",
      "Zinfandel"
     ],
     "q": "Which red grape is the Anderson Valley in Mendocino County best known for?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "accept": [
      "100",
      "100%",
      "100 per cent",
      "100 percent",
      "one hundred per cent",
      "one hundred percent",
      "one hundred",
      "all",
      "all of it",
      "all of them",
      "all of the grapes"
     ],
     "ans": "100 per cent",
     "exp": "Estate Bottled is the strictest American label term: every grape from the winery's own or controlled vineyards, crushed, fermented, finished and bottled on its premises in one continuous process. The Court's cell says the vineyards must lie in the same county; the federal rule draws the line at the AVA named on the label, in which the winery must also stand.",
     "id": "e-l6d9g0af",
     "q": "What share of the grapes in an Estate Bottled wine must come from vineyards the winery owns or controls?",
     "row": "Wine Law",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The grape variety needs only 75 per cent of the wine, the AVA 85 per cent, and the vintage and the single vineyard 95 per cent each, the ladder the Court prints for the North Coast; Estate Bottled, at the top, asks 100 per cent from the winery's own vineyards. So a Cabernet Sauvignon may hold up to a quarter of Merlot and still carry the one grape's name.",
     "id": "e-vv6hp09m",
     "opts": [
      "The grape variety",
      "The AVA",
      "The vintage",
      "The single vineyard"
     ],
     "q": "A North Coast label names a grape, an AVA, a vintage and a single vineyard. Which of the four claims asks the smallest share of the wine's fruit?",
     "row": "Wine Law"
    },
    {
     "a": 1,
     "exp": "Reserve has no legal meaning in the United States, so it may mark a winery's best barrels or nothing more than a higher price; Old Vine, Barrel Select and Private Reserve are just as unregulated. Spain's Reserva and Italy's Riserva are the opposite case, with ageing minimums written into law.",
     "id": "e-h2nhapjq",
     "opts": [
      "Two years in oak",
      "Nothing at all",
      "A late harvest",
      "Estate grown fruit"
     ],
     "q": "A guest asks what the word Reserve guarantees on a Sonoma Cabernet. What does American law say it guarantees?",
     "row": "General Terms"
    },
    {
     "accept": [
      "beringer",
      "beringer vineyards",
      "beringer winery",
      "beringer brothers",
      "beringer estate"
     ],
     "ans": "Beringer",
     "exp": "Beringer was founded by the German brothers Jacob and Frederick Beringer and is reckoned the Napa Valley's oldest continuously operating winery, having kept working through Prohibition by making sacramental wine. Its Private Reserve Cabernet Sauvignon and Chardonnay are the wines a list carries.",
     "id": "e-rhvhceo9",
     "q": "Founded at St Helena in 1876 and kept open through Prohibition, which house completes the Court's Introductory trio of producers beside Opus One and Robert Mondavi?",
     "row": "Producer/Proprietary Brand",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "Silver Oak, founded in 1972, ages its Napa Valley and Alexander Valley Cabernets only in American oak, which ties it to the Court's Style row: American oak gives more overt vanilla, coconut and dill, French oak subtler spice and finer tannin. Most Napa Cabernet is raised largely in new French barrels, which makes Silver Oak the exception to know.",
     "grapes": [
      "Cabernet Sauvignon"
     ],
     "id": "e-s2ylj0e2",
     "opts": [
      "American oak",
      "Hungarian oak",
      "Slavonian oak",
      "French oak"
     ],
     "q": "Silver Oak Cellars, a Court producer at the Certified level, matures its Cabernet Sauvignon in which oak alone?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "accept": [
      "agoston haraszthy",
      "haraszthy",
      "ágoston haraszthy",
      "count haraszthy",
      "count agoston haraszthy",
      "agoston haraszthy de mokcsa"
     ],
     "ans": "Agoston Haraszthy",
     "exp": "Agoston Haraszthy, who styled himself a count, founded Buena Vista in 1857, often called California's first premium winery, and after a European tour in 1861 imported cuttings of hundreds of varieties for the state. The Court pairs him at the Introductory level with Robert Mondavi, André Tchelistcheff and the Paris tasting of 1976.",
     "id": "e-vts0t16e",
     "q": "Which Hungarian émigré founded the Buena Vista winery at Sonoma in 1857 and brought European vine cuttings to California?",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Charles Krug opened his St Helena winery in 1861, reckoned the oldest winery still working in the Napa Valley, and the Mondavi family bought it in 1943 before the split that produced the Oakville winery of 1966. The other years belong to Buena Vista in Sonoma (1857), Beringer (1876) and Inglenook (1879); the Court's other Certified figure, Warren Winiarski, founded Stag's Leap Wine Cellars, whose 1973 Cabernet won the red flight in Paris.",
     "id": "e-6i4fzoi5",
     "opts": [
      "1857",
      "1861",
      "1879",
      "1876"
     ],
     "q": "Charles Krug, a Certified name in the Court's history row, founded his St Helena winery in which year?",
     "row": "History & Lore"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Coastal counties north of the San Pablo Bay.",
     "topic": "Geography: Location"
    },
    {
     "certified": "Sonoma County: Knights Valley AVA; Napa County: Mount Veeder AVA, Calistoga AVA, Yountville AVA; *Match AVAs to counties.",
     "intro": "Lake County; Mendocino County: Anderson Valley AVA; Sonoma County: Carneros AVA, Sonoma Coast AVA, Alexander Valley AVA, Russian River Valley AVA, Dry Creek Valley AVA; Napa County: Carneros AVA, Stags Leap District AVA, Oakville AVA, Rutherford AVA, Howell Mountain AVA; *Match AVAs to counties. Know geographical locations in relation to each other.",
     "topic": "Geography: Appellation"
    },
    {
     "certified": "",
     "intro": "Moderate to warm depending on proximity to the Pacific Ocean or San Pablo Bay.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "North Napa is warmer; mountainous regions have lower yields and bigger diurnal shifts.",
     "intro": "Sonoma Mountain Range, Mayacamas Mountain Range, San Pablo Bay, Vaca Mountain Range, Napa River, Petaluma Wind Gap",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Very diverse soils throughout.",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Sparkling wine is commonly traditional method.",
     "intro": "Often extensive use of new French and sometimes American oak barrels for both red and white wines. Malolactic fermentation often employed when making white wines, especially Chardonnay.; Sparkling wines are produced in cooler areas such as Carneros and Anderson Valley.",
     "topic": "Winemaking"
    },
    {
     "certified": "Match the grape varieties to the major AVAs.",
     "intro": "Chardonnay, Sauvignon Blanc",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Match the grape varieties to the major AVAs.",
     "intro": "Pinot Noir, Merlot, Cabernet Sauvignon, Zinfandel, Syrah",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "100% for Estate Bottling; must be in the same county.",
     "intro": "75% minimum grape variety; 85% minimum for AVA; 95% minimum for vintage; 95% minimum for single vineyard",
     "topic": "Wine Law"
    },
    {
     "certified": "Estate Bottled, Meritage (trademark only), Claret",
     "intro": "",
     "topic": "Label Terms"
    },
    {
     "certified": "Reserve has no legal meaning.",
     "intro": "",
     "topic": "General Terms"
    },
    {
     "certified": "American vs. French oak flavor differences.",
     "intro": "",
     "topic": "Style"
    },
    {
     "certified": "Spottswoode, Far Niente, Groth, Cakebread, Stag's Leap Wine Cellars, Silver Oak, Chappellet, Caymus, Etude, Iron Horse, Domaine Carneros, Roederer Estate, Quintessa, Merryvale, Larkmead, William Selyem, Kistler; *Know iconic wines and producers, e.g., Martha's Vineyard with Heitz.",
     "intro": "Opus One, Robert Mondavi, Beringer",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Know the vintage qualities from the past 5 years.",
     "intro": "",
     "topic": "Vintage"
    },
    {
     "certified": "Warren Winiarski, Charles Krug",
     "intro": "Agoston Haraszthy, Robert Mondavi, André Tchelistcheff, Paris Tasting of 1976",
     "topic": "History & Lore"
    },
    {
     "certified": "",
     "intro": "Young Cabernet Sauvignon often benefits from decanting. Old Cabernet Sauvignon needs decanting for sediment.",
     "topic": "Service of Beverage"
    },
    {
     "certified": "",
     "intro": "Match full-bodied wines with food richness and intensity.",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "NORTH AMERICA - UNITED STATES - CALIFORNIA - CENTRAL COAST",
   "group": "north-america",
   "id": "california-central-coast",
   "map": {
    "cats": {
     "certified": [
      "California"
     ],
     "intro": [
      "United States"
     ]
    },
    "chapters": {
     "certified": [
      "California"
     ],
     "intro": [
      "calcentral"
     ]
    },
    "countries": [
     "california"
    ],
    "grapes": [
     "Chardonnay",
     "Sauvignon Blanc",
     "Pinot Noir",
     "Merlot",
     "Cabernet Sauvignon",
     "Zinfandel",
     "Syrah / Shiraz"
    ],
    "regions": [
     "central-coast"
    ],
    "serviceRef": [],
    "techniques": [
     "maritime-fog",
     "oak",
     "malolactic"
    ]
   },
   "name": "North America: California, Central Coast",
   "order": 27,
   "outcome": {
    "certified": "After studying this section, a candidate will dive deeper into selected counties of the Central Coast of California and the major AVAs within them. Certified Sommeliers will know iconic producers and vineyards and be able to recommend and sell food pairings to a guest.",
    "intro": "After studying this section, a student will know selected counties of the Central Coast of California and the major AVAs within them. Students will know basic wine labeling laws and understand the relationship of climate to the grape varieties grown."
   },
   "pages": [
    58,
    59
   ],
   "questions": [
    {
     "accept": [
      "san luis obispo",
      "san luis obispo county",
      "slo",
      "slo county",
      "county of san luis obispo"
     ],
     "ans": "San Luis Obispo County",
     "exp": "The Court's three Central Coast counties run north to south as Monterey, San Luis Obispo and Santa Barbara. San Luis Obispo holds hot, inland Paso Robles, its major AVA, with the cool coastal valleys of Edna Valley and Arroyo Grande by the sea; Santa Barbara is the southernmost, with the city of the same name on its southern shore.",
     "id": "e-uvspu82t",
     "q": "On a map of the Central Coast, which county lies between Monterey and Santa Barbara?",
     "row": "Geography: Location",
     "sa": 1
    },
    {
     "accept": [
      "san francisco bay",
      "the san francisco bay",
      "san francisco",
      "sf bay",
      "the bay of san francisco"
     ],
     "ans": "San Francisco Bay",
     "exp": "The Court defines the Central Coast as the coastal counties south of San Francisco Bay and north of the city of Santa Barbara, the stretch the umbrella Central Coast AVA of 1985 covers. It is not the Central Valley, the hot, irrigated interior that grows the everyday wine.",
     "id": "e-f16w2x9g",
     "q": "The Court's Central Coast runs from the city of Santa Barbara north to the southern shore of which bay?",
     "row": "Geography: Location",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Santa Lucia Highlands, an AVA of 1991, are terraces on the western side of Monterey County's Salinas Valley, facing east above the valley floor in the afternoon wind and fog: dark, lush Pinot Noir, Chardonnay and cool Syrah. Paso Robles is the Court's San Luis Obispo AVA, and Sta. Rita Hills, Santa Maria Valley, Santa Ynez Valley and Happy Canyon its Santa Barbara four.",
     "id": "e-a205uo72",
     "opts": [
      "San Benito",
      "Santa Barbara",
      "Monterey",
      "San Luis Obispo"
     ],
     "q": "In which county does the Court place the Santa Lucia Highlands AVA?",
     "row": "Geography: Appellation"
    },
    {
     "a": 2,
     "exp": "Happy Canyon of Santa Barbara, an AVA of 2009, sits at the hot eastern end of the Santa Ynez Valley beyond the reach of the fog, and grows Cabernet Sauvignon, Cabernet Franc and Sauvignon Blanc. Because Santa Barbara's valleys run east to west, the western end is the cold one, so Sta. Rita Hills, Santa Maria Valley and the Santa Lucia Highlands are the Court's cool Pinot Noir and Chardonnay country.",
     "id": "e-1l4p6dlw",
     "opts": [
      "Santa Maria Valley",
      "Sta. Rita Hills",
      "Happy Canyon",
      "Santa Lucia Highlands"
     ],
     "q": "Besides Paso Robles, which AVA does the Court class as warm among the Central Coast names it lists?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 0,
     "exp": "The Santa Lucia Range runs along the coast between Paso Robles and the Pacific, which is why the Court calls Paso warm and continental, blocked by mountains with only a small gap in the range. That gap, the Templeton Gap, lets the afternoon sea air into the western hills and gives the AVA its wide swing between hot days and cold nights.",
     "id": "e-dxv8ish6",
     "opts": [
      "The Santa Lucia Range",
      "The Gabilan Range",
      "The Diablo Range",
      "The Santa Ynez Mountains"
     ],
     "q": "Which mountain range shuts Paso Robles off from the ocean on its western side?",
     "row": "Geography: Physical Feature"
    },
    {
     "accept": [
      "malolactic fermentation",
      "malolactic",
      "malolactic conversion",
      "the malolactic fermentation",
      "mlf",
      "malo"
     ],
     "ans": "Malolactic fermentation",
     "exp": "Malolactic fermentation turns sharp malic acid into softer lactic acid and leaves the buttery note of diacetyl, which, with barrel fermentation in new French and sometimes American oak, gives the classic rich Californian Chardonnay. The Santa Barbara houses that pick early for tension often allow only part of it, so the style runs from creamy to taut.",
     "grapes": [
      "Chardonnay"
     ],
     "id": "e-o372ulbf",
     "q": "Which secondary fermentation does the Court say is often used for Central Coast Chardonnay?",
     "row": "Winemaking",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Happy Canyon is warm enough to ripen the Bordeaux grapes fully, and its ripe, grassy Sauvignon Blanc is as prized as its Cabernet. The Court asks the grapes matched to the AVAs: Chardonnay and Pinot Noir to the cool Sta. Rita Hills, Santa Maria Valley and Santa Lucia Highlands, Cabernet and Zinfandel to Paso Robles.",
     "grapes": [
      "Sauvignon Blanc"
     ],
     "id": "e-okga07vz",
     "opts": [
      "Gewürztraminer",
      "Sauvignon Blanc",
      "Riesling",
      "Pinot Gris"
     ],
     "q": "Besides Cabernet Sauvignon and Cabernet Franc, which white grape is a speciality of Happy Canyon of Santa Barbara?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "accept": [
      "cabernet sauvignon",
      "cabernet",
      "cab",
      "cab sauv",
      "cabernet-sauvignon",
      "cab sauvignon"
     ],
     "ans": "Cabernet Sauvignon",
     "exp": "Cabernet Sauvignon is the most planted grape in Paso Robles, ripe and generous from the warm eastern plain and firmer from the limestone hills of the west side, where Justin built its reputation. Zinfandel is the heritage red of the dry farmed old vines, and Tablas Creek's Rhône cuttings made the GSM blends famous.",
     "grapes": [
      "Cabernet Sauvignon"
     ],
     "id": "e-s2hdg4jy",
     "q": "Old Zinfandel and Rhône blends draw the attention, but which red grape covers the most ground in Paso Robles?",
     "row": "Wine: Red Grape Variety Names",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "A vineyard designation needs 95 per cent of the fruit from the named site, the same figure as a vintage date on an AVA wine. Bien Nacido, planted in 1973, sells fruit to so many houses that its name appears on labels across the state, each held to that 95 per cent; the AVA itself, Santa Maria Valley, needs only 85.",
     "id": "e-10bfllux",
     "opts": [
      "75 per cent",
      "95 per cent",
      "100 per cent",
      "85 per cent"
     ],
     "q": "A Santa Maria Valley Pinot Noir names the Bien Nacido Vineyard on its label. What minimum share of its grapes must come from that vineyard?",
     "row": "Wine Law"
    },
    {
     "a": 0,
     "exp": "Ridge matures Monte Bello, like its other wines, in air-dried American oak rather than the French oak most of California's grandest Cabernets are raised in, and its 1971 still placed fifth at the Paris tasting of 1976 and first at the rematch of 2006. Monte Bello grows high above Cupertino in the Santa Cruz Mountains AVA; Ridge's Zinfandels, Lytton Springs and Geyserville, come from Sonoma.",
     "grapes": [
      "Cabernet Sauvignon"
     ],
     "id": "e-uiyofquh",
     "opts": [
      "American oak",
      "French oak",
      "Hungarian oak",
      "Slavonian oak"
     ],
     "q": "Ridge Vineyards, the first of the Court's named Central Coast examples, matures its Monte Bello Cabernet in barrels of which oak, unusual for a top Californian red?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "accept": [
      "paso robles",
      "paso",
      "paso robles ava",
      "el paso de robles",
      "adelaida district",
      "adelaida",
      "paso robles adelaida district",
      "the adelaida district"
     ],
     "ans": "Paso Robles",
     "exp": "Justin farms the limestone hills of the west side of Paso Robles, in what is now the Adelaida District, and Isosceles, a Cabernet-led Bordeaux blend, gave the AVA its first national reputation for Cabernet. Ridge in the Santa Cruz Mountains and Au Bon Climat in the Santa Maria Valley are the Court's other two examples.",
     "id": "e-xkjmb5rn",
     "q": "Justin Vineyards, one of the Court's named examples, made its reputation with the Bordeaux blend Isosceles in which AVA?",
     "row": "Producer/Proprietary Brand",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Au Bon Climat, at Bien Nacido in the Santa Maria Valley, makes Pinot Noir and Chardonnay in the Burgundian manner, its name borrowing the Burgundian word climat for a named site, and it helped put Santa Barbara County on the map. Its neighbour Qupé, founded the same year, took the Syrah and the Rhône whites.",
     "grapes": [
      "Pinot Noir",
      "Chardonnay"
     ],
     "id": "e-405nztfh",
     "opts": [
      "Syrah and Viognier",
      "Cabernet Sauvignon and Merlot",
      "Zinfandel and Petite Sirah",
      "Pinot Noir and Chardonnay"
     ],
     "q": "Au Bon Climat, founded in 1982 and one of the Court's named examples, built its name on which pair of grapes?",
     "row": "Producer/Proprietary Brand"
    }
   ],
   "rows": [
    {
     "certified": "Identify on a map: Monterey, San Luis Obispo, Santa Barbara",
     "intro": "Coastal counties south of the San Francisco Bay and north of the city of Santa Barbara.",
     "topic": "Geography: Location"
    },
    {
     "certified": "Monterey County: Santa Lucia Highlands AVA; San Luis Obispo: Paso Robles AVA; Santa Barbara County: Sta. Rita Hills AVA, Santa Maria Valley AVA, Santa Ynez Valley AVA, Happy Canyon AVA; *Match AVAs to counties.",
     "intro": "Monterey County; San Luis Obispo: Paso Robles AVA; Santa Barbara County; *Know geographical locations in relation to each other and the major AVA of San Luis Obispo.",
     "topic": "Geography: Appellation"
    },
    {
     "certified": "Paso Robles AVA and Happy Canyon AVA are warm climate; the others listed above are cool Pinot Noir and Chardonnay growing regions.",
     "intro": "Monterey and Santa Barbara are generally cool maritime; the closer to the coast, the cooler it is. Paso Robles is warm continental with large diurnal shifts.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Monterey has a northwest-to-southeast mountain range creating a cool wind tunnel. Paso Robles is blocked by mountains to the west with only a small gap in the range. Santa Barbara has an east-to-west mountain range creating a cool wind tunnel and fog.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Often extensive use of new French and sometimes American oak barrels for both red and white wines. Malolactic fermentation often employed when making white wines, especially Chardonnay.",
     "topic": "Winemaking"
    },
    {
     "certified": "Match the grape varieties to the major AVAs.",
     "intro": "Chardonnay, Sauvignon Blanc",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Match the grape varieties to the major AVAs.",
     "intro": "Pinot Noir, Merlot, Cabernet Sauvignon, Zinfandel, Syrah",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "100% for Estate bottling; must be in the same county.",
     "intro": "75% minimum grape variety; 85% minimum for AVA; 95% minimum for vintage; 95% minimum for single vineyard",
     "topic": "Wine Law"
    },
    {
     "certified": "Knowledge of iconic producers and vineyards are expected at Certified Sommelier level. Some examples include: Ridge, Justin, Au Bon Climat, and others.",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "NORTH AMERICA - UNITED STATES - NEW YORK STATE",
   "group": "north-america",
   "id": "new-york",
   "map": {
    "cats": {
     "certified": [
      "Pacific NW, NY & Canada"
     ],
     "intro": [
      "United States"
     ]
    },
    "chapters": {
     "certified": [
      "Pacific NW, NY & Canada"
     ],
     "intro": [
      "newyork"
     ]
    },
    "countries": [
     "new-york"
    ],
    "grapes": [
     "Riesling",
     "Gewürztraminer",
     "Chardonnay",
     "Pinot Noir",
     "Merlot",
     "Cabernet Franc"
    ],
    "regions": [
     "finger-lakes",
     "long-island"
    ],
    "serviceRef": [],
    "techniques": [
     "phylloxera-rootstocks"
    ]
   },
   "name": "North America: New York State",
   "order": 28,
   "outcome": {
    "certified": "After studying this section, a candidate will know the major AVAs and grapes varieties grown in New York State (including hybrids and other species). Certified Sommeliers will be able to recommend and sell food pairings with New York wines to a guest.",
    "intro": "After studying this section, a student will understand the climate, climate moderators, and major grape varieties grown in New York State."
   },
   "pages": [
    60
   ],
   "questions": [
    {
     "accept": [
      "hudson river",
      "the hudson river",
      "hudson",
      "the hudson",
      "hudson river region",
      "hudson river region ava",
      "hudson valley",
      "the hudson valley",
      "hudson river valley"
     ],
     "ans": "The Hudson River",
     "exp": "The Hudson River Region AVA of 1982 follows the tidal Hudson north of New York City, where the river tempers a hard continental winter; Brotherhood Winery at Washingtonville, founded in 1839, is counted the oldest continuously operating winery in the United States. The Court's other two Certified AVAs are Lake Erie in the far west and Long Island in the Atlantic.",
     "id": "e-45hkc0c6",
     "q": "Huguenot settlers planted vines at New Paltz in 1677 in the valley of which river, now one of the Court's Certified New York AVAs?",
     "row": "Geography: Appellation",
     "sa": 1
    },
    {
     "accept": [
      "juice and jelly",
      "juice",
      "grape juice",
      "jelly",
      "grape jelly",
      "grape juice and jelly",
      "juice and jam",
      "jam",
      "juice, jelly and jam",
      "processing into juice"
     ],
     "ans": "Juice and jelly",
     "exp": "The Lake Erie shore is a grape belt planted overwhelmingly to Concord, and most of the crop is sold to processors for grape juice and jelly rather than fermented; the lake holds back budburst until the spring frosts have passed and stretches the autumn. The Finger Lakes, the Court's Introductory AVA, carry New York's fine wine reputation instead.",
     "id": "e-c07rbpoz",
     "q": "Most of the Concord grown along the lake shore in New York's Lake Erie AVA never becomes wine. What is the bulk of that crop grown for?",
     "row": "Geography: Appellation",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "New York is continental, with cold winters that can kill vinifera buds and trunks, so the vineyards gather where water softens the extremes: the deep Finger Lakes and Lake Erie inland, the Hudson in its valley, and the Atlantic around Long Island. The water stores summer heat into autumn and holds bud break back in spring.",
     "id": "e-3jugt2wf",
     "opts": [
      "Desert",
      "Mediterranean",
      "Maritime",
      "Continental"
     ],
     "q": "Which climate category does the Court give New York State, moderated by its lakes, rivers and ocean?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 1,
     "exp": "Ice-age glaciers gouged the Finger Lakes out of old river valleys, leaving narrow troughs so deep, Seneca above all, that they rarely freeze and give back stored summer heat through the winter. That is the Court's physical feature: deep glacial lakes that keep the slopes above them alive through cold that kills vines a few miles inland.",
     "id": "e-tevhn3ex",
     "opts": [
      "A rift in the earth's crust",
      "Ice-age glaciers",
      "Volcanic eruptions",
      "Rivers cutting through limestone"
     ],
     "q": "What carved the long, deep troughs that hold the Finger Lakes?",
     "row": "Geography: Physical Feature"
    },
    {
     "a": 0,
     "exp": "Humid eastern summers with rain through the season bring downy and powdery mildew and botrytis, so New York growers spray, open the canopy to the breeze and choose resistant grapes; the hybrids were bred partly for that resistance. The winter half of the Court's cell is the cold, which the lakes and the ocean blunt.",
     "id": "e-4rbrr6ff",
     "opts": [
      "Mould",
      "Sunburn",
      "Drought",
      "Hail"
     ],
     "q": "Besides deep winter freezes, which summer threat does the Court say New York growers must guard their vines against?",
     "row": "Grape Growing"
    },
    {
     "a": 0,
     "exp": "Gewürztraminer is a Finger Lakes speciality beside Riesling, made dry to off dry with its lychee, rose and spice kept vivid by the cool lake climate. The Court's Introductory whites for New York are Riesling, Gewürztraminer and Chardonnay, with the hybrids Aurore and Seyval Blanc added at the Certified level.",
     "grapes": [
      "Gewürztraminer"
     ],
     "id": "e-rda9q4za",
     "opts": [
      "Gewürztraminer",
      "Albariño",
      "Grüner Veltliner",
      "Viognier"
     ],
     "q": "Which aromatic white, scented of lychee and rose, does the Court list for New York beside Riesling and Chardonnay?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 2,
     "exp": "Aurore, also known as Seibel 5279, is a white French-American hybrid bred in France by the hybridiser Albert Seibel to join vinifera's flavour to American hardiness and disease resistance; early ripening, it was long a workhorse of New York's sparkling and blended wines. Seyval Blanc, the Court's other named hybrid, is the crisper grape still widely grown.",
     "id": "e-3bts1lfo",
     "opts": [
      "A native riparia vine",
      "A European vinifera vine",
      "A French-American hybrid",
      "A native labrusca vine"
     ],
     "q": "Aurore, once widely planted in the Finger Lakes for sparkling and blended wine, belongs to which family of vine?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 3,
     "exp": "Cabernet Franc ripens a week or so before Cabernet Sauvignon and has hardier wood, so it is the eastern red that works both by the Finger Lakes and on Long Island, fragrant and leafy with bright acid. Merlot succeeds in Long Island's long maritime autumn but struggles by the lakes; the Court's red list is Pinot Noir, Merlot and Cabernet Franc.",
     "grapes": [
      "Cabernet Franc"
     ],
     "id": "e-ta2bmy0m",
     "opts": [
      "Petite Sirah",
      "Tempranillo",
      "Zinfandel",
      "Cabernet Franc"
     ],
     "q": "Which red vinifera on the Court's New York list survives a Finger Lakes winter better than Merlot and ripens where Cabernet Sauvignon struggles?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "a": 1,
     "exp": "Pinot Noir, early ripening and at home in cool climates, gives light, red fruited reds and the base of traditional method sparkling wine in the Finger Lakes. Zinfandel, Grenache and Malbec need far more heat and a longer season than a New York summer offers.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-ip8u334n",
     "opts": [
      "Malbec",
      "Pinot Noir",
      "Grenache",
      "Zinfandel"
     ],
     "q": "Besides Merlot and Cabernet Franc, which red grape does the Court list for New York, grown by the cooler lakes for light reds and sparkling base?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "accept": [
      "foxy",
      "foxiness",
      "foxy aroma",
      "fox"
     ],
     "ans": "Foxy",
     "exp": "Foxy is the trade's word for the grapey, musky, candied scent of Concord, Catawba and Niagara, the labrusca grapes native to North America; methyl anthranilate carries much of it. Most of New York's Concord, the Court's Certified red, goes to juice and jelly along Lake Erie rather than into dry wine.",
     "id": "e-8b6srxgt",
     "q": "Tasters have a one-word name for the pungent, musky aroma that marks Concord and other Vitis labrusca grapes. What is it?",
     "row": "Wine: Red Grape Variety Names",
     "sa": 1
    },
    {
     "accept": [
      "keuka lake",
      "keuka",
      "lake keuka"
     ],
     "ans": "Keuka Lake",
     "exp": "Frank, a Ukrainian-born émigré hired by Gold Seal in 1953, argued that vinifera had failed in the east from the wrong roots rather than the cold, grafted Riesling and Chardonnay onto hardy rootstock, and in 1962 opened Vinifera Wine Cellars on Keuka Lake near Hammondsport. The state's vinifera industry descends from that proof.",
     "id": "e-xi7l4r4z",
     "q": "Dr Konstantin Frank proved vinifera could survive in the Finger Lakes and opened his own winery in 1962. On the shore of which lake?",
     "row": "History & Lore",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Northeastern United States",
     "topic": "Geography: Location"
    },
    {
     "certified": "Hudson River AVA, Lake Erie AVA, Long Island AVA",
     "intro": "Finger Lakes AVA",
     "topic": "Geography: Appellation"
    },
    {
     "certified": "",
     "intro": "Continental with moderating influences of lakes and rivers for inland areas and the Atlantic Ocean for coastal regions.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Finger Lakes: Deep glacial lakes",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Must protect vines from deep freezes during harsh winters and from mold in the summer.",
     "topic": "Grape Growing"
    },
    {
     "certified": "Hybrids: Aurore, Seyval Blanc",
     "intro": "Riesling, Gewürztraminer, Chardonnay",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Vitis labrusca: Concord",
     "intro": "Pinot Noir, Merlot, Cabernet Franc",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Dr. Konstantin Frank",
     "topic": "History & Lore"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "NORTH AMERICA - UNITED STATES - PACIFIC NORTHWEST",
   "group": "north-america",
   "id": "pacific-northwest",
   "map": {
    "cats": {
     "certified": [
      "Pacific NW, NY & Canada"
     ],
     "intro": [
      "United States"
     ]
    },
    "chapters": {
     "certified": [
      "Pacific NW, NY & Canada"
     ],
     "intro": [
      "pnw"
     ]
    },
    "countries": [
     "oregon",
     "washington"
    ],
    "grapes": [
     "Pinot Noir",
     "Pinot Gris / Grigio",
     "Chardonnay",
     "Riesling",
     "Merlot",
     "Cabernet Sauvignon",
     "Syrah / Shiraz"
    ],
    "regions": [
     "willamette-valley",
     "columbia-valley"
    ],
    "serviceRef": [],
    "techniques": [
     "heat-irrigation",
     "phylloxera-rootstocks"
    ]
   },
   "name": "North America: Pacific Northwest",
   "order": 29,
   "outcome": {
    "certified": "After studying this section, a candidate will know all major grapes varieties grown in their respective AVAs and wine labeling law in Washington and Oregon. Certified Sommeliers will know iconic producers and be able to recommend and sell food pairings to a guest.",
    "intro": "After studying this section, a student will understand the general climate, grapes grown, wine law, and AVAs of the Columbia Valley of Washington and the Willamette Valley of Oregon."
   },
   "pages": [
    61,
    62
   ],
   "questions": [
    {
     "accept": [
      "portland",
      "portland oregon",
      "portland, oregon",
      "city of portland"
     ],
     "ans": "Portland",
     "exp": "The Willamette Valley runs about 240 kilometres (150 miles) south from Portland towards Eugene, between the Coast Range and the Cascades, with most of its vines in the hills of Yamhill County south-west of the city. The Columbia Valley lies far to the east of Seattle, beyond the Cascades, in Washington's rain shadow.",
     "id": "e-e1i606r7",
     "q": "Which city stands at the northern end of the Willamette Valley, where the Willamette River meets the Columbia?",
     "row": "Geography: Location",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Cascades wring the Pacific rain out before it reaches the Columbia basin, which sees about 150 to 200 millimetres (six to eight inches) a year: a warm desert of long, hot, dry summers and cool nights, so every vine is irrigated. The Court calls the Willamette Valley, west of the mountains, cool Mediterranean with maritime influence.",
     "id": "e-bdmyxqi9",
     "opts": [
      "Cool continental",
      "Warm desert",
      "Cool Mediterranean",
      "Moderate maritime"
     ],
     "q": "Which climate category does the Court give the Columbia Valley?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 0,
     "exp": "The Court's Columbia Valley list runs Chardonnay, Riesling, Merlot, Cabernet Sauvignon and Syrah, and the warm, dry desert east of the Cascades ripens Syrah to dark fruit and smoke, with the Walla Walla Valley and the Yakima Valley among its homes. Pinot Noir is the Willamette Valley's red, west of the Cascades in Oregon; Zinfandel and Malbec grow in Washington but are not on the Court's list.",
     "grapes": [
      "Syrah / Shiraz"
     ],
     "id": "e-4fucyhxc",
     "opts": [
      "Syrah",
      "Pinot Noir",
      "Malbec",
      "Zinfandel"
     ],
     "q": "Beside Merlot and Cabernet Sauvignon, which third red does the Court list for the Columbia Valley?",
     "row": "Wine: Grape Variety Names"
    },
    {
     "a": 2,
     "exp": "Oregon makes traditional method sparkling wine from Pinot Noir, Chardonnay and some Meunier, a style Argyle established in Dundee from 1987, beside its dry whites and dry reds; the Court lists Washington for dry whites and dry reds alone. Willamette Brut is aged for years on its lees, apple and brioche with fine bubbles.",
     "id": "e-3nrdarm9",
     "opts": [
      "Rosé wine",
      "Dry red wine",
      "Sparkling wine",
      "Dry white wine"
     ],
     "q": "Which style does the Court list for Oregon but leave off its list for Washington?",
     "row": "Style"
    },
    {
     "a": 3,
     "exp": "Phylloxera struggles in the deep, sandy, free draining soils the Missoula Floods left on the desert floor, with cold winters and isolation adding to the barrier, so most Washington vines stand on their own roots and can be regrown from the base after a killing freeze. It is rare rather than absent: the pest was confirmed in some Walla Walla vineyards in 2019, and new plantings are more often grafted.",
     "id": "e-znzjdt1l",
     "opts": [
      "Volcanic soils",
      "High elevation",
      "Heavy clay soils",
      "Desert conditions"
     ],
     "q": "By the Court's account, what has kept phylloxera out of most of the Columbia Valley's vineyards?",
     "row": "History & Lore"
    },
    {
     "a": 2,
     "exp": "The Columbia Gorge AVA straddles the river where it cuts through the Cascades, changing from wet in the west to dry in the east over a short stretch of river, and it is a separate AVA, not part of the Columbia Valley. Yakima Valley and Puget Sound lie wholly in Washington, and the Lewis-Clark Valley is shared with Idaho.",
     "id": "e-brwchvd8",
     "opts": [
      "Puget Sound",
      "Yakima Valley",
      "Columbia Gorge",
      "Lewis-Clark Valley"
     ],
     "q": "Besides the Columbia Valley and the Walla Walla Valley, which AVA does the Court list as shared by Washington and Oregon?",
     "row": "Geography: Appellation"
    },
    {
     "accept": [
      "snake",
      "the snake",
      "snake river",
      "the snake river",
      "river snake"
     ],
     "ans": "The Snake",
     "exp": "The Columbia and its tributaries, the Yakima and the Snake, feed the canals and drip lines without which nothing would grow in a basin of 150 to 200 millimetres (six to eight inches) of rain. The same Court cell adds the Van Duzer Corridor, which cools Oregon's Eola-Amity Hills, and the generally south-facing slopes of the Columbia Valley.",
     "id": "e-fx3h8zyq",
     "q": "The Court names three rivers as the Columbia Valley's water source: the Columbia, the Yakima and which other?",
     "row": "Geography: Physical Feature",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Leonetti Cellar, founded in 1977, was Walla Walla's first modern winery, and its Cabernet and Merlot made the valley a prestige address. Domaine Serene, Erath and Ponzi are the Court's Willamette names, with Eyrie and Domaine Drouhin; Quilceda Creek, L'Ecole No. 41 and Chateau Ste. Michelle complete its Washington list.",
     "id": "e-p4vem39t",
     "opts": [
      "Erath",
      "Domaine Serene",
      "Ponzi",
      "Leonetti"
     ],
     "q": "Which of these producers named by the Court makes its wine in Washington's Walla Walla Valley?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "accept": [
      "butternut squash",
      "squash",
      "butternut",
      "roast butternut squash",
      "roasted butternut squash"
     ],
     "ans": "Butternut squash",
     "exp": "The earthy sweetness of roast butternut squash meets the red fruit and forest floor of Willamette Pinot Noir, and salmon's richness suits its silky tannin and fresh acid. For the firmer tannin of Washington Cabernet Sauvignon and Merlot the Court's pairing is beef or lamb.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-hi0672zk",
     "q": "Besides salmon, which vegetable does the Court pair with Willamette Valley Pinot Noir?",
     "row": "Food and Beverage Pairing",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Identify the Willamette Valley in relation to Portland, Oregon and the Columbia Valley in relation to Seattle, Washington on a map.",
     "topic": "Geography: Location"
    },
    {
     "certified": "Oregon: Willamette Valley AVA, Dundee Hills AVA, Yamhill-Carlton AVA, Eola-Amity Hills AVA, Chehalem Mountains AVA, Ribbon Ridge AVA, McMinnville AVA; Shared AVAs between Washington and Oregon: Columbia Valley AVA, Walla Walla Valley AVA, Columbia Gorge AVA; Washington: Yakima Valley AVA, Horse Heaven Hills AVA, Red Mountain AVA",
     "intro": "Oregon: Willamette Valley AVA; Washington: Columbia Valley AVA, Yakima Valley AVA, Walla Walla Valley AVA",
     "topic": "Geography: Appellation"
    },
    {
     "certified": "",
     "intro": "Willamette Valley: Cool Mediterranean with Maritime influence.; Columbia Valley: Warm Desert",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Van Duzer Corridor; Columbia, Yakima, and Snake Rivers provides water source.; Columbia Valley AVA has generally south-facing slopes.",
     "intro": "Oregon: Coastal Mountain Range to the west, creates a rain shadow. Cascade Mountain Range to the east.; Columbia Valley: Cascade Mountain Range to the west, creates a rain shadow.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Willamette Valley: Volcanic, marine sediment; Columbia Valley: Gravel",
     "intro": "",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "",
     "intro": "Irrigation needed in the Columbia Valley.",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Willamette Valley: Pinot Noir, Pinot Gris (most widely planted red and white), Chardonnay, Riesling; Columbia Valley: Chardonnay, Riesling, Merlot, Cabernet Sauvignon, Syrah",
     "topic": "Wine: Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Oregon:; 90% minimum for stated variety, except for Cabernet Sauvignon, Merlot, and others.; 95% minimum for AVA",
     "topic": "Wine Law"
    },
    {
     "certified": "",
     "intro": "Oregon: Dry whites, dry reds, sparkling wines; Washington: Dry white wines and dry red wines",
     "topic": "Style"
    },
    {
     "certified": "Willamette Valley: Eyrie Vineyards, Domaine Drouhin, Domaine Serene, Erath, Ponzi; Columbia Valley: Quilceda Creek, L'Ecole No. 41, Château Ste. Michelle, Leonetti",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Missoula Floods; Absence of phylloxera in Columbia Valley due to desert conditions.",
     "intro": "David Lett of Eyrie Vineyards",
     "topic": "History & Lore"
    },
    {
     "certified": "Willamette Valley Pinot Noir: Salmon, butternut squash; Washington Cabernet Sauvignon/Merlot: Beef, lamb",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "NORTH AMERICA - CANADA",
   "group": "north-america",
   "id": "canada",
   "map": {
    "cats": {
     "certified": [
      "Pacific NW, NY & Canada"
     ],
     "intro": []
    },
    "chapters": {
     "certified": [
      "Pacific NW, NY & Canada"
     ],
     "intro": [
      "canada"
     ]
    },
    "countries": [
     "canada"
    ],
    "grapes": [
     "Chardonnay",
     "Riesling",
     "Pinot Gris / Grigio",
     "Gewürztraminer",
     "Pinot Noir",
     "Merlot",
     "Cabernet Franc"
    ],
    "regions": [],
    "serviceRef": [],
    "techniques": [
     "ice-wine"
    ]
   },
   "name": "North America: Canada",
   "order": 30,
   "outcome": {
    "certified": "After studying this section, a candidate will know the location, climate, principle grape varieties, and styles of the prominent wine regions of Canada. A Certified Sommelier will be able to recognize iconic producers and be able to describe, recommend, and sell food pairings with Canadian Ice Wine to a guest.",
    "intro": "After studying this section, a student will know the general location, climate and style of wine produced in Canada."
   },
   "pages": [
    63,
    64
   ],
   "questions": [
    {
     "accept": [
      "the provinces",
      "provinces",
      "province",
      "the province",
      "each province",
      "provincial",
      "provincial government",
      "provincial governments",
      "the provincial governments",
      "provincial law"
     ],
     "ans": "The provinces",
     "exp": "Each province writes its own wine rules, so VQA Ontario and the BC Wine Authority keep separate standards and the smaller provinces have arrangements of their own; a VQA mark is therefore provincial, never federal. Wine is made in at least nine provinces, with the largest concentrations in Ontario and British Columbia.",
     "id": "e-af9qp7sc",
     "q": "Canada has no national wine law. Which level of government writes the rules instead?",
     "row": "Wine Law",
     "sa": 1
    },
    {
     "accept": [
      "vintners quality alliance",
      "vintners' quality alliance",
      "vintner's quality alliance",
      "vintner quality alliance",
      "the vintners quality alliance"
     ],
     "ans": "Vintners Quality Alliance",
     "exp": "Vintners Quality Alliance is the body the Court names for Canada's premium wine: a VQA mark guarantees that the grapes were grown in the province or area named, that the wine meets its grape and ripeness standards, and that it has passed a tasting panel. Ontario launched it as a voluntary standard in 1988 and wrote it into provincial law in 1999.",
     "id": "e-yn0ptmpo",
     "q": "What do the letters VQA stand for on a Canadian label?",
     "row": "Wine Law",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The Court puts Ontario at about half of all Canadian wine, grown along the shores of Lake Ontario and Lake Erie with the Niagara Peninsula its main viticultural area. British Columbia, with the Okanagan Valley at its heart, is the second; Quebec and Nova Scotia make far smaller amounts at the cold edge of viticulture.",
     "id": "e-fm9fravo",
     "opts": [
      "Ontario",
      "Quebec",
      "Nova Scotia",
      "British Columbia"
     ],
     "q": "Which province does the Court say produces the largest share of Canadian wine?",
     "row": "Wine Law / Appellations"
    },
    {
     "accept": [
      "90",
      "90%",
      "90 per cent",
      "90 percent",
      "ninety per cent",
      "ninety percent",
      "ninety"
     ],
     "ans": "90 per cent",
     "exp": "Ontario, and the Niagara Peninsula above all, makes about nine tenths of Canada's icewine by the Court's figure, from Vidal, Riesling and Cabernet Franc left to freeze on the vine; British Columbia makes most of the rest. The Court's Style cell opens by calling Canada the leading global producer of icewine.",
     "id": "e-pui4y5n5",
     "q": "What share of Canada's icewine does the Court say is made in Ontario?",
     "row": "Style",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The rule asks for picking at minus 8°C or colder, and the coldest hours fall before dawn, so crews often go out in the middle of the night to pick and press the grapes while the water in them is still frozen. Only the concentrated syrup runs from the press, leaving the ice behind.",
     "id": "e-qr7dlsps",
     "opts": [
      "In the late afternoon",
      "Around midday",
      "In the middle of the night",
      "In the early evening"
     ],
     "q": "When are icewine grapes often picked, according to the Court?",
     "row": "Style"
    },
    {
     "a": 2,
     "exp": "Vitis riparia, the riverbank grape, is native across much of eastern North America and into Canada, one of the hardiest of all vine species and a parent of many winter hardy hybrids and rootstocks. The Court's three families for Canada are vinifera, the native species labrusca and riparia, and the French and American hybrids such as Vidal; amurensis is Asian and rotundifolia belongs to the warm American south.",
     "id": "e-9a448s7z",
     "opts": [
      "Vitis amurensis",
      "Vitis rotundifolia",
      "Vitis riparia",
      "Vitis vinifera"
     ],
     "q": "Besides Vitis labrusca, which North American native species does the Court list among Canada's vines?",
     "row": "Grape Growing"
    },
    {
     "a": 3,
     "exp": "Pinot Gris is the Okanagan's leading white, ripe and pear scented, often with a touch of sweetness, from a dry, irrigated valley that is close to desert at its southern end. The Court adds Pinot Gris, Gewürztraminer and the hybrid Vidal at the Certified level to the Introductory pair of Chardonnay and Riesling.",
     "grapes": [
      "Pinot Gris / Grigio"
     ],
     "id": "e-eb21cywi",
     "opts": [
      "Vidal",
      "Riesling",
      "Chardonnay",
      "Pinot Gris"
     ],
     "q": "Which white grape, one of the Court's Certified names for Canada, leads the plantings of British Columbia's Okanagan Valley?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 1,
     "exp": "Prince Edward County, on Lake Ontario's north-eastern shore, is so cold that growers bury the vines every November, and its Pinot Noir and Chardonnay show real tension from shallow soils over limestone. Merlot is at home in the warm southern Okanagan, and Cabernet Franc is Ontario's red success on the Niagara benches; Cabernet Sauvignon ripens only on the warmest sites.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-lmwq0xxd",
     "opts": [
      "Cabernet Franc",
      "Pinot Noir",
      "Merlot",
      "Cabernet Sauvignon"
     ],
     "q": "Which red grape on the Court's Canadian list gives fine-boned, red-fruited wines from Prince Edward County's thin soils over limestone?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "a": 3,
     "exp": "Prohibition came to the provinces at different times, and in Ontario it ran from 1916 to 1927, when government liquor stores replaced it; the American ban lasted from 1920 to 1933. Its long hangover meant that no new winery licence was issued in Ontario between 1929 and 1975, when Inniskillin received one, the 1970s milestone in the Court's history row.",
     "id": "e-qgz24ivh",
     "opts": [
      "1920",
      "1919",
      "1933",
      "1927"
     ],
     "q": "The Court dates Canada's twentieth-century Prohibition from 1916. In which year does it put the end?",
     "row": "History & Lore"
    },
    {
     "accept": [
      "inniskillin",
      "inniskillen",
      "inniskillin wines",
      "inniskillin winery",
      "inniskillin estate"
     ],
     "ans": "Inniskillin",
     "exp": "Inniskillin's licence of 1975 was the first Ontario had issued since 1929, after the long shadow of Prohibition had closed the door on new wineries, and it opened the modern era of Niagara wine. Its 1989 Vidal Icewine went on to win the Grand Prix d'Honneur at Vinexpo in 1991; the Court prints the name as Inniskillen, and the house spells it Inniskillin.",
     "id": "e-vjy4fi0i",
     "q": "Which Niagara-on-the-Lake winery, the one Canadian producer on the Court's list, received in 1975 the first new Ontario winery licence granted since 1929?",
     "row": "Producer - Proprietary Brand",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "Icewine's intense sweetness and high acidity cut the richness of seared foie gras, and the salt and fat of the dish set off the wine's apricot and tropical fruit; blue cheese and gently spiced dishes work for the same reason. Raw oysters, a plain steak or a sharp salad would leave the wine tasting cloying or the food thin.",
     "id": "e-6xqc8b6j",
     "opts": [
      "Seared foie gras",
      "Grilled ribeye",
      "Raw oysters",
      "Green salad"
     ],
     "q": "The Court asks for sweet and savoury pairings with icewine. Which of these dishes meets that brief best?",
     "row": "Food and Beverage Pairing"
    },
    {
     "a": 1,
     "exp": "Deep water stores summer heat and gives it back slowly, so the lakes rarely freeze and keep the shore a few degrees milder through a hard winter; in spring the cold water holds bud break back until the frost danger has passed. The Niagara Escarpment then holds the lake air over the Niagara Peninsula's vines.",
     "id": "e-wxdvx5yc",
     "opts": [
      "They are fed by warm rivers",
      "They are very deep and rarely freeze",
      "They lie downwind of the vineyards",
      "They are salty and resist ice"
     ],
     "q": "Why does the Court say the Great Lakes help moderate the winters of Canada's vineyards?",
     "row": "Geography: Physical Feature"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "The Northern Part of North America spanning from the Pacific Ocean to the Atlantic Ocean and north to the Arctic Ocean.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Primary wine growing areas sit within the 30-50° latitude lines. Climates range from Cool to Continental to Desert.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Large bodies of water:; Oceans: Pacific and Atlantic Oceans; Great Lakes: Very deep and rarely freeze helping moderate the winter climate. Lakes and oceans help cool in the climate in the warm summers.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "1. Vitis vinifera; 2. North American native vine species; Vitis labrusca and Vitis riparia; 3. French and American hybrids: Winter hardy/able to stay alive in the deep winter freezes example: Vidal",
     "intro": "Winter hardy varieties able to stay alive in the deep winter freezes",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Make wines based on what the climate does best!; Still Wine (red white and rosé); Sparkling Wine; Ice Wine",
     "topic": "Winemaking"
    },
    {
     "certified": "Vidal, Pinot Gris, Gewürztraminer",
     "intro": "Chardonnay, Riesling",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Pinot Noir, Merlot, Cabernet Franc",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Canada is unique in that it is not one unified wine market with no national wine law. Each individual province has its own laws.; VQA (Vintners Quality Alliance) Primary regulatory body for premium wine.",
     "topic": "Wine Law"
    },
    {
     "certified": "British Columbia:; Located on Canada’s Pacific Coast. Climate varies widely from cool to very warm. The only classified desert in Canada; Okanagan Valley (main viticultural area); On the 50-degree latitude line. Continental climate with very hot summers and very cold winters. Lake Okanagan moderates.; Ontario:; Located on Canada’s east coast with influence from the Great Lakes. Ontario produces half of all Canadian wine.; Niagara Peninsula (main viticultural area); ** Ice Wine: Ontario produces 90% of Canadian ice wine.",
     "intro": "Wine is currently made in at least nine of the Canadian provinces with the largest concentrations in British Columbia and Ontario",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "Vidal is also used for Ice Wine",
     "intro": "Ice Wine: Leading global producer; 90% is produced in Ontario. Must be frozen grapes on the vine. Often picked in the middle of the night. Grape varieties for ice wine: Riesling and Cabernet Franc",
     "topic": "Style"
    },
    {
     "certified": "",
     "intro": "Commercial wine has been made since mid-1800s; 20th Century Prohibition (1916-1927); 1970s: The first winery license issued in Ontario",
     "topic": "History & Lore"
    },
    {
     "certified": "Inniskillen",
     "intro": "",
     "topic": "Producer - Proprietary Brand"
    },
    {
     "certified": "Sweet and savory pairings with Icewine",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "NORTH AMERICA - MÉXICO",
   "group": "north-america",
   "id": "mexico",
   "map": {
    "cats": {
     "certified": [],
     "intro": []
    },
    "chapters": {
     "certified": [],
     "intro": [
      "mexico"
     ]
    },
    "countries": [
     "mexico"
    ],
    "grapes": [
     "Chenin Blanc",
     "Chardonnay",
     "Viognier",
     "Sauvignon Blanc",
     "Tempranillo",
     "Nebbiolo",
     "Cabernet Sauvignon",
     "Merlot",
     "Zinfandel",
     "Grenache / Garnacha",
     "Barbera"
    ],
    "regions": [],
    "serviceRef": [],
    "techniques": [
     "maritime-fog",
     "altitude-diurnal",
     "heat-irrigation",
     "phylloxera-rootstocks",
     "blending-assemblage",
     "oak"
    ]
   },
   "name": "North America: Mexico",
   "order": 31,
   "outcome": {
    "certified": "After studying this section, a candidate will know the specific locations, climates and principle grape varieties of Mexico's most important wine region. Certified Sommeliers will be able to recommend and sell food pairings with wines from México to a guest.",
    "intro": "After studying this section, a student will know the general location, climate and style of wine produced in México's most important wine regions."
   },
   "pages": [
    65,
    66
   ],
   "questions": [
    {
     "a": 1,
     "exp": "Mexico is bordered by the United States to the north and by Guatemala and Belize to the southeast, and the Court places it firmly in North America. Its wine country lies far from that southern border: Baja California beside the United States line, and the high plateau of Coahuila and Querétaro in the north and centre.",
     "id": "e-w3bsb58t",
     "opts": [
      "El Salvador",
      "Belize",
      "Honduras",
      "Nicaragua"
     ],
     "q": "Besides Guatemala, which country borders Mexico to the southeast?",
     "row": "Geography: Location"
    },
    {
     "a": 0,
     "exp": "Baja California's valleys are Mediterranean, dry in summer with slight winter rain and made workable by the cold Pacific, and the inland plateau shades into semi-desert, as at Parras in Coahuila. Baja lies at about thirty-two degrees north, the latitude of North Africa, so heat, not cold, is the problem Mexican vineyards solve.",
     "id": "e-d68pazog",
     "opts": [
      "Hot Mediterranean to semi-desert",
      "Cool maritime to moderate continental",
      "Tropical monsoon to humid subtropical",
      "Cool continental to alpine"
     ],
     "q": "Which climate range does the Court give Mexico's wine regions?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 3,
     "exp": "Valleys running from the southwest towards the northeast open the Valle de Guadalupe region to the Pacific off Ensenada, so fog and sea air reach the vines each evening and pull the night temperature down. The Court's Certified profile of the valley adds its Mediterranean climate, its dominant share of Mexican wine and its standing as a modern winemaking and tourist destination.",
     "id": "e-y6ryj6a6",
     "opts": [
      "East to west",
      "North to south",
      "Northwest to southeast",
      "Southwest to northeast"
     ],
     "q": "The Court describes valleys cutting through Baja's mountains to bring in Pacific fog and breezes. In which direction do they run?",
     "row": "Wine Law / Appellations"
    },
    {
     "a": 2,
     "exp": "In the mountains it is cooler the higher you go, and thin, dry air loses its heat fast after sunset, so the plateau vineyards of Coahuila around 1,500 metres and Querétaro near 2,000 metres get the cool nights that keep acid in the grapes. In Baja, the Court's other physical feature, the Pacific does the same work with fog and breezes.",
     "id": "e-cs24szp6",
     "opts": [
      "Gulf of Mexico breezes",
      "Snowmelt irrigation",
      "Elevation in the mountains",
      "Shade from cloud forest"
     ],
     "q": "Away from the Pacific, what does the Court say gives Mexican vineyards cooler temperatures and cool nights?",
     "row": "Geography: Physical Feature"
    },
    {
     "accept": [
      "sand",
      "sandy",
      "sands",
      "sandy soil",
      "sandy soils",
      "lots of sand"
     ],
     "ans": "Sand",
     "exp": "The Court describes Mexican soils as mixed with lots of sand, and in the Valle de Guadalupe the slopes are decomposed granite and sand above an alluvial valley floor. Its grape growing cell draws the consequence: sandy soils keep phylloxera away, since the louse does poorly in loose sand, so many vines can grow on their own roots.",
     "id": "e-7c1u2v48",
     "q": "Which material does the Court say Mexico's vineyard soils are mixed with in abundance?",
     "row": "Soil: Type and/or Name",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "With no single signature grape, Mexican winemakers blend freely across Italian, Spanish and French varieties, Nebbiolo or Tempranillo with Cabernet Sauvignon, Grenache and Merlot, in ways no European appellation would permit; a label may say ensamble for a blend. At the Certified level the Court adds that the aim is premium wine, with some new oak.",
     "id": "e-kf2flihz",
     "opts": [
      "Non-traditional blends",
      "Single varieties under strict rules",
      "Long ageing in old casks",
      "Carbonic maceration"
     ],
     "q": "Which approach does the Court say characterises Mexican winemaking?",
     "row": "Winemaking"
    },
    {
     "a": 1,
     "exp": "Chardonnay is a smaller white in Mexico, made as rich still wine and used as a base for Querétaro's sparkling wine, beside the long-established Chenin Blanc of Baja and Coahuila. The Court's whites run from crisp and dry to round and full according to the grape, Sauvignon Blanc at the crisp end and Viognier at the round.",
     "grapes": [
      "Chardonnay"
     ],
     "id": "e-kqa7f7o4",
     "opts": [
      "Grüner Veltliner",
      "Chardonnay",
      "Riesling",
      "Albariño"
     ],
     "q": "Beside Chenin Blanc, Viognier and Sauvignon Blanc, which white grape completes the Court's list for Mexico?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 3,
     "exp": "Nebbiolo has become Baja's emblematic red, but the warm valley makes it darker, softer and riper than Barolo, and DNA work has shown that some vines planted under the name are something else. The Court's red list mixes Spain, Italy and France: Tempranillo, Nebbiolo, Cabernet Sauvignon, Merlot, Zinfandel, Grenache and Barbera.",
     "grapes": [
      "Nebbiolo"
     ],
     "id": "e-wfm4mdzp",
     "opts": [
      "Sangiovese",
      "Barbera",
      "Dolcetto",
      "Nebbiolo"
     ],
     "q": "Baja California's emblematic red often surprises a guest who knows the grape only from Barolo. Which grape is it?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "accept": [
      "90",
      "90%",
      "90 per cent",
      "90 percent",
      "ninety per cent",
      "ninety percent",
      "ninety"
     ],
     "ans": "90 per cent",
     "exp": "The Court credits Baja California and the Valle de Guadalupe, inland from Ensenada, with 90 per cent of Mexican wine; other estimates run somewhat lower, but every count puts the peninsula far ahead. The valley lies some fifty kilometres south of the United States border as the crow flies, at about thirty-two degrees north.",
     "id": "e-stbrdxc5",
     "q": "By the Court's figure, what share of Mexico's wine comes from Baja California's Valle de Guadalupe?",
     "row": "Wine Law / Appellations",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Long, sunny, warm growing seasons ripen the grapes to high sugar, which ferments to high alcohol, and the same sun deepens colour and ripens the fruit, so Mexican reds are fruit-driven, deeply coloured and strong. The whites, by the Court's account, run from crisp and dry to round and full-bodied depending on the grape.",
     "id": "e-921komd6",
     "opts": [
      "Added grape sugar",
      "Fortification with brandy",
      "The warm climate",
      "Botrytis in the vineyard"
     ],
     "q": "Why does the Court say Mexico's fruit-driven, deeply coloured red wines carry elevated alcohol?",
     "row": "Style"
    },
    {
     "accept": [
      "hernán cortés",
      "hernan cortes",
      "cortés",
      "cortes",
      "hernando cortés",
      "hernando cortes",
      "fernando cortés",
      "fernando cortes"
     ],
     "ans": "Hernán Cortés",
     "exp": "Hernán Cortés took the Aztec capital in 1521, and an ordinance of 1524, issued in the crown's name, obliged settlers to plant vines in proportion to the native labour they held: the start of what the Court calls the oldest wine industry outside Europe. Casa Madero at Parras, founded in 1597, is the oldest winery still working in the Americas.",
     "id": "e-ierhdnj8",
     "q": "Which Spanish conquistador defeated the Aztec Empire in the 1520s and claimed it for Spain, opening New Spain to the vine?",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "accept": [
      "1821",
      "in 1821",
      "eighteen twenty-one",
      "eighteen twenty one"
     ],
     "ans": "1821",
     "exp": "In 1595 the Spanish crown barred new vineyards and winemaking in New Spain to protect the wine shipped from Spain, so only missions and a few haciendas kept their vines until independence in 1821 ended the ban. Brandy, not wine, carried most of the twentieth century, and the Court dates the advance of modern Mexican wine from the 1970s.",
     "id": "e-a6o0uw9c",
     "q": "Spanish law prohibited winemaking in New Spain from 1595. By the Court's account, in which year did Mexican independence end that ban?",
     "row": "History & Lore",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Mexico is part of North America. It is bordered to the north by the United States and to the southeast by Guatemala and Belize.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Hot Mediterranean to Semi-desert",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Pacific Ocean: Provides climate moderating fog and cooling breezes.; Mountains: Cooler at higher elevations, diurnal shifts with cooler nights.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Mixed with lots of sand",
     "intro": "",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "Sandy soils keep away phylloxera",
     "intro": "Water is in short supply. Irrigation is essential in the hot, arid climate. A melting pot of Italian, French and Spanish grape varieties.",
     "topic": "Grape Growing"
    },
    {
     "certified": "Non-traditional blends. The goal to produce premium wine, some new is oak is used.",
     "intro": "Non-traditional blends",
     "topic": "Winemaking"
    },
    {
     "certified": "",
     "intro": "Chenin Blanc, Chardonnay, Viognier, Sauvignon Blanc",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Tempranillo, Nebbiolo, Cabernet Sauvignon, Merlot, Zinfandel, Grenache, Barbera",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "No laws!",
     "intro": "No laws!",
     "topic": "Wine Law"
    },
    {
     "certified": "* Mediterranean climate; * Produces 90% of Mexico's Wine; * Southwest to northeast valleys cutting through the mountains bringing in fog and cooling Pacific Ocean breezes.; * 3704 feet/1129 meters of elevation; * Exciting wine region and tourist destination, modern winemaking.",
     "intro": "Baja California- Valle de Guadalupe: 90% of Mexican wine production",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "White wines can range from crisp and dry to round and full-bodied depending on the grape variety. The red wines are fruit-driven, deeply colored and have elevated alcohol due to the warm climate.",
     "intro": "",
     "topic": "Style"
    },
    {
     "certified": "",
     "intro": "Early History: Missionaries and Conquistadors; Mexico is the oldest wine industry outside of Europe.; 1520s Spanish conquistador Hernán Cortés defeated the Aztec Empire claiming it for Spain.; Orders from The King of Spain degreed planting vines per each native slave.; 1595 winemaking in New Spain (Mexico) was prohibited by Spanish law until Mexican Independence in 1821.; Modern History:; Despite the region’s long history, the advance of modern Mexican wine is as recent as the 1970s.",
     "topic": "History & Lore"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SOUTH AMERICA - CHILE",
   "group": "southern-hemisphere",
   "id": "chile",
   "map": {
    "cats": {
     "certified": [
      "South America"
     ],
     "intro": [
      "South America"
     ]
    },
    "chapters": {
     "certified": [
      "South America"
     ],
     "intro": [
      "chile"
     ]
    },
    "countries": [
     "chile"
    ],
    "grapes": [
     "Cabernet Sauvignon",
     "Merlot",
     "Carmenère",
     "Sauvignon Blanc",
     "Chardonnay",
     "Syrah / Shiraz"
    ],
    "regions": [
     "aconcagua-casablanca",
     "maipo-valley",
     "colchagua",
     "curico-maule"
    ],
    "serviceRef": [],
    "techniques": [
     "maritime-fog",
     "phylloxera-rootstocks"
    ]
   },
   "name": "South America: Chile",
   "order": 32,
   "outcome": {
    "certified": "After studying this section, a candidate will learn the major geographical influences that affect vine growing, how the major grape varieties grown in Chile arrived in the country, have a familiarity with the Denominación de Origen (DO) system, and recognize major growing areas and major subregions. A Certified Sommelier will be able to recognize iconic producers and be able to recommend and sell food pairings with wines from Chile to a guest.",
    "intro": "After studying this section, a student will learn where Chilean wine regions are located, understand the unique climate, and recognize the primary grape varieties planted."
   },
   "pages": [
    67,
    68
   ],
   "questions": [
    {
     "a": 3,
     "exp": "The Court describes Chile's Denominación de Origen as a statement of geographic origin only, with no further rules: no grape list, no yield limit, no ageing requirement and no tasting panel. Label words such as Reserva and the percentage rules for variety, vintage and origin sit in separate national labelling rules, not in the DO itself.",
     "id": "e-kukeg1bv",
     "opts": [
      "Approval by a blind tasting panel",
      "The grapes permitted and a ceiling on yield",
      "A minimum period of ageing in oak",
      "Where the grapes were grown, and nothing more"
     ],
     "q": "A Chilean label carries a Denominación de Origen. Under the Court's reading of the DO system, what does that name control?",
     "row": "Wine Law"
    },
    {
     "accept": [
      "area",
      "área",
      "an area",
      "the area",
      "areas",
      "áreas"
     ],
     "ans": "Area",
     "exp": "Decreto 464 maps Chilean origin from the Región vitícola down through the Subregión, usually a valley such as the Maipo, and the Zona, such as Colchagua within Rapel, to the Área, usually a single commune such as Puente Alto or Peumo. The Court names the four tiers Region, Subregion, Zone and Area.",
     "id": "e-h5pkacyk",
     "q": "Chile's DO system nests four tiers of place. Running from the largest, they begin Region, Subregion and Zone; name the smallest tier.",
     "row": "Wine Law",
     "sa": 1
    },
    {
     "accept": [
      "85",
      "85%",
      "85 per cent",
      "85 percent",
      "eighty five per cent",
      "eighty-five per cent",
      "eighty five percent",
      "eighty-five percent",
      "eighty five",
      "eighty-five"
     ],
     "ans": "85 per cent",
     "exp": "The Court's Certified line sets Chile's own minimum at 75 per cent for variety, vintage and origin, and notes that the European Union requires 85 per cent in all three, so most export wine is made to the higher figure. The 75 per cent rule is Chile's domestic floor; Argentina, Australia and New Zealand work to 85 per cent at home.",
     "id": "e-sb7jw5d0",
     "q": "Chilean law asks 75 per cent for a stated variety, vintage or origin. What share must each reach on wine shipped to the European Union?",
     "row": "Wine Law",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Court gives the Valle Central about 80 per cent of Chilean production: a warm to hot trough holding the Maipo, Rapel, Curicó and Maule valleys and the country's volume Cabernet Sauvignon, Carménère and Merlot. A blend drawn from more than one of those valleys falls back to the Valle Central name on its label.",
     "id": "e-g8k5ob0u",
     "opts": [
      "About 20 per cent",
      "About 60 per cent",
      "About 80 per cent",
      "About 40 per cent"
     ],
     "q": "The Court credits the Valle Central DO, Chile's warm trough running from the Maipo south to the Maule, with roughly what share of the country's wine production?",
     "row": "Wine Law / Appellations"
    },
    {
     "a": 0,
     "exp": "The Secano Interior denomination was created for País and Cinsault grown in listed dry-farmed communes of the southern Coastal Range, the heart of Chile's old-vine revival. País, the colonial grape known as Listán Prieto in Spain and Mission in California, is a Certified red on the Court's list beside Syrah; Maule's old dry-farmed Carignan carries the private VIGNO seal instead.",
     "id": "e-7i4cf4fk",
     "opts": [
      "País",
      "Syrah",
      "Carménère",
      "Carignan"
     ],
     "q": "Chile created a special denomination under the name Secano Interior for wines from the dry-farmed communes of the southern Coastal Range. Beside Cinsault, which red grape was it established for?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "a": 0,
     "exp": "Casa Lapostolle was founded in 1994 by the Marnier-Lapostolle family of Grand Marnier, and its Clos Apalta, a Carménère-led blend from old hillside vines in the Apalta horseshoe of Colchagua, is the country's best-known Carménère icon. Errázuriz belongs to Aconcagua, while Santa Rita and Concha y Toro are nineteenth-century houses of the Maipo.",
     "id": "e-3g9d1fmh",
     "opts": [
      "Casa Lapostolle",
      "Errázuriz",
      "Concha y Toro",
      "Santa Rita"
     ],
     "q": "Founded in 1994 by the French family behind Grand Marnier, which house on the Court's Chilean list made its name in Colchagua?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "accept": [
      "~carmen",
      "~viña carmen",
      "~vina carmen",
      "~carmen winery"
     ],
     "ans": "Carmen",
     "exp": "Viña Carmen, founded in 1850 beside Santa Rita at Alto Jahuel, claims the oldest brand in Chilean wine and bottled one of the first wines sold as Carménère after the grape was identified in 1994. The Court's Certified list sets it beside Concha y Toro, Santa Rita, Errázuriz and Casa Lapostolle.",
     "id": "e-dxiuv6eu",
     "q": "Founded in 1850 at Alto Jahuel in the Maipo, which house on the Court's list claims the oldest brand in Chilean wine?",
     "row": "Producer/Proprietary Brand",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Spanish crown, protecting the trade in wine shipped from Spain, issued decrees restricting new planting in its American colonies, though distance meant they were widely ignored and vineyards spread regardless. The Court's timeline runs on from vines in the 1500s to expansion after independence and European immigration in the 1800s, and foreign investment in the 1970s and 1980s; phylloxera has never reached Chile.",
     "id": "e-9i0dda87",
     "opts": [
      "The arrival of phylloxera",
      "Prohibitive laws from Spain",
      "A Church ban on new vineyards",
      "A run of Andean earthquakes"
     ],
     "q": "In the 1600s, what held back wine production in Spain's South American colonies, as the Court's history of Chile records?",
     "row": "History & Lore"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Located on the west coast of South America in the Southern Hemisphere.; 2,670 miles or 4300 km north to south.; 217 miles or 350 km wide.; Spans 17-53°S latitude.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Hot desert to cool to cold from north to south.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Desert: Atacama Desert; Ocean: Pacific Ocean, provides cool breezes and fog.; Mountains:; Andes Mountains: Elevation and diurnal shifts.; Coastal Range: Creates rain shadow from cold Pacific.",
     "topic": "Geography: Physical Features and Moderators"
    },
    {
     "certified": "",
     "intro": "Sand",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "",
     "intro": "No presence of phylloxera (because of sandy soil).; Irrigation is essential from the Andes.; Mostly ungrafted vines.",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Sauvignon Blanc, Chardonnay",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Syrah, País",
     "intro": "Cabernet Sauvignon, Merlot, Carménère",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "Minimum Percentages:; Variety/Vintage/Origin Labeling is 75%.; In practice, EU requires 85% in all three categories.",
     "intro": "Denominación de Origen (DO) System:; Refers to a geographic place of origin only, no other additional laws.; Region, Subregion, Zone, Area.",
     "topic": "Wine Law"
    },
    {
     "certified": "All Regions; Aconcagua DO; Casablanca DO; Valle Central DO; Rapel DO; Colchagua DO; Cachapoal DO; Curicó Valley DO; Maule DO; Valle de Maipo DO",
     "intro": "Aconcagua DO; Subregion: Casablanca DO; Cool, maritime climate west of the Coastal Range.; Chardonnay, Sauvignon Blanc, Pinot Noir; Valle Central DO; Warm to hot climate.; Located between the Coastal Range and Andes.; 80% of Chilean production.; Cabernet Sauvignon, Carménère, Merlot; Subregion: Valle de Maipo DO; Surrounds Santiago in the Maipo River Valley.; Most of the major historical wineries are located here.; Cabernet Sauvignon",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "",
     "intro": "Humboldt Current:; Cold current coming from Antarctica running along the west coast of South America.",
     "topic": "General Terms"
    },
    {
     "certified": "",
     "intro": "Often big, intense, fruit driven, high-alcohol wines.",
     "topic": "Style"
    },
    {
     "certified": "Concha y Toro, Santa Rita, Errázuriz, Casa Lapostolle, Carmen",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "",
     "intro": "1500s: Grapes being grown in the South American Spanish colonies.; 1600s: Prohibitive laws from the Spanish restricting wine production.; 1800s: Political independence and influx of European immigrants led to an expansion of viticulture.; 1970s-80s: Influx of foreign investment.",
     "topic": "History & Lore"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SOUTH AMERICA - ARGENTINA",
   "group": "southern-hemisphere",
   "id": "argentina",
   "map": {
    "cats": {
     "certified": [
      "South America"
     ],
     "intro": [
      "South America"
     ]
    },
    "chapters": {
     "certified": [
      "South America"
     ],
     "intro": [
      "argentina"
     ]
    },
    "countries": [
     "argentina"
    ],
    "grapes": [
     "Malbec",
     "Torrontés",
     "Cabernet Sauvignon",
     "Chardonnay",
     "Tempranillo",
     "Syrah / Shiraz"
    ],
    "regions": [
     "salta",
     "mendoza",
     "patagonia"
    ],
    "serviceRef": [
     "decanting"
    ],
    "techniques": [
     "altitude-diurnal",
     "heat-irrigation",
     "oak"
    ]
   },
   "name": "South America: Argentina",
   "order": 33,
   "outcome": {
    "certified": "After studying this section, a candidate will have a deeper knowledge of the winemaking regions of Argentina and factors of its unique terroirs. A Certified Sommelier will be able to recognize iconic producers and be able to recommend and sell food pairings with wines from Argentina to a guest.",
    "intro": "After studying this section, a student will learn the history, general climate, major wine regions, and grape varieties of Argentina."
   },
   "pages": [
    69,
    70
   ],
   "questions": [
    {
     "a": 3,
     "exp": "The Court gives Mendoza 600 to 1,200 metres (2,000 to 4,000 feet) and Salta 1,500 to 2,000 metres, the highest in Argentina. Within Mendoza, Luján de Cuyo sits at roughly 900 to 1,100 metres and the Uco Valley climbs higher still, and every hundred metres of height costs about six tenths of a degree.",
     "id": "e-qwq8uxce",
     "opts": [
      "1,500 to 2,000 metres",
      "2,500 to 3,000 metres",
      "200 to 500 metres",
      "600 to 1,200 metres"
     ],
     "q": "The Court places Mendoza's vineyards within which band of elevation?",
     "row": "Geography: Physical Feature"
    },
    {
     "a": 0,
     "exp": "The Court notes that high-grown Malbec can show an electric purple colour, because stronger sunlight and ultraviolet light push the skins to build more pigment, and the same stress thickens them. Garnet and tawny belong to older reds and wood-aged fortified wines, and ruby sits between purple youth and garnet age on the tasting grid.",
     "grapes": [
      "Malbec"
     ],
     "id": "e-phh5bnv8",
     "opts": [
      "Purple",
      "Tawny",
      "Ruby",
      "Garnet"
     ],
     "q": "Strong sun at high altitude drives intense pigmentation in Malbec's skins. Which electric colour does the Court say the wine can show as a result?",
     "row": "Grape Growing"
    },
    {
     "a": 1,
     "exp": "Torrontés is made for its perfume, jasmine, rose and peach from its Muscat of Alexandria parent, so it is fermented cool in steel and bottled young without oak. Malbec and Cabernet Sauvignon, by contrast, commonly see new or used barrels, French or American, as the Court's winemaking row says.",
     "grapes": [
      "Torrontés"
     ],
     "id": "e-4xhh4fki",
     "opts": [
      "Syrah",
      "Torrontés",
      "Malbec",
      "Cabernet Sauvignon"
     ],
     "q": "Which Argentine grape does the Court say commonly sees no oak influence at all?",
     "row": "Winemaking"
    },
    {
     "a": 3,
     "exp": "Chardonnay is the second white on the Court's Argentine list and the country's leading quality white grape: saline and taut from high Gualtallary, rounder lower down, and the base of Mendoza's traditional-method sparkling wine. Where Torrontés is aromatic and unoaked, Chardonnay is often fermented or aged in French oak.",
     "grapes": [
      "Chardonnay"
     ],
     "id": "e-05haq8gk",
     "opts": [
      "Sauvignon Blanc",
      "Viognier",
      "Chenin Blanc",
      "Chardonnay"
     ],
     "q": "Which white grape does the Court list beside Torrontés for Argentina, at its most taut and saline from Gualtallary in the Uco Valley?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 2,
     "exp": "The Court's Introductory reds for Argentina are Malbec and Cabernet Sauvignon, and the two meet in the cortes, the house blends of Mendoza, as in Cheval des Andes, a Malbec-led blend with Cabernet Sauvignon. Cabernet Franc is the rising red of the Uco Valley, bottled alone and in blends, but it is not on the Court's list.",
     "grapes": [
      "Cabernet Sauvignon",
      "Malbec"
     ],
     "id": "e-kmab1f1f",
     "opts": [
      "Cabernet Franc",
      "Petit Verdot",
      "Cabernet Sauvignon",
      "Carménère"
     ],
     "q": "Argentina's great house blends most often set Malbec beside which Bordeaux variety, the second red on the Court's Introductory list?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "a": 2,
     "exp": "Tempranillo, Spain's great red, is grown in Argentina mostly in Mendoza, long for everyday blends and now also bottled on its own. It has no tradition in the province of La Rioja, whose name misleads: that is Torrontés Riojano and Malbec country. Bonarda is Savoie's Douce Noire, and Syrah is San Juan's calling card.",
     "grapes": [
      "Tempranillo"
     ],
     "id": "e-uqx4ghv0",
     "opts": [
      "Monastrell",
      "Graciano",
      "Tempranillo",
      "Mencía"
     ],
     "q": "Bonarda and Syrah stand on the Court's Certified list of Argentine reds beside which Spanish variety?",
     "row": "Wine: Red Grape Variety Names"
    },
    {
     "accept": [
      "1500",
      "1,500",
      "1500 litres",
      "1,500 litres",
      "1500 l",
      "1,500 l",
      "1500 liters",
      "1,500 liters",
      "fifteen hundred",
      "fifteen hundred litres",
      "one thousand five hundred",
      "one thousand five hundred litres"
     ],
     "ans": "1,500 litres",
     "exp": "The Court's Argentine rule asks 85 per cent of the named grape before a variety goes on the label, so 8,500 of the 10,000 litres must be Malbec and the other 15 per cent, 1,500 litres, may be Cabernet Sauvignon, Bonarda or any other permitted grape. Chile allows 75 per cent for wine sold at home, so the same blend there could carry more of its second grape.",
     "grapes": [
      "Malbec"
     ],
     "id": "e-h2q7uneq",
     "q": "An Argentine winery has a 10,000 litre blend it wants to label as Malbec. At most, how many litres of other grapes may the blend contain?",
     "row": "Wine Law",
     "sa": 1
    },
    {
     "accept": [
      "indicación geográfica",
      "indicacion geografica",
      "indicaciones geográficas",
      "indicaciones geograficas",
      "indicación geográficas",
      "indicacion geograficas",
      "geographical indication",
      "geographic indication"
     ],
     "ans": "Indicación Geográfica",
     "exp": "The Court's Classification row gives Argentina two quality tiers: the IG, Indicación Geográfica, a GI in English, for wine from a delimited area such as a province, a department or a soil-mapped district like Paraje Altamira, and the DOC, which adds the zone's own rules. Luján de Cuyo, recognised in 1989, and San Rafael are the DOCs a server meets.",
     "id": "e-aj0fmjtn",
     "q": "On an Argentine label, DOC stands for Denominación de Origen Controlada. In full, what does the more common tier, IG, stand for?",
     "row": "Classification",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "From 1885 the railway from Buenos Aires carried Italian and Spanish immigrants to Mendoza, and they planted for a vast home market of cheap, plentiful wine, the revival the Court's History row means. The French varieties had arrived earlier, in 1853, when Michel Aimé Pouget brought Malbec to the new agricultural school in Mendoza.",
     "id": "e-kadn8exz",
     "opts": [
      "Switzerland and Austria",
      "Italy and Spain",
      "Britain and Ireland",
      "France and Germany"
     ],
     "q": "The Court credits immigrants from which two countries with revitalising Argentina's vineyards?",
     "row": "History & Lore"
    },
    {
     "accept": [
      "chimichurri",
      "chimichurri sauce",
      "chimi churri",
      "chimichuri",
      "chimmichurri",
      "chimichurri verde"
     ],
     "ans": "Chimichurri",
     "exp": "Chimichurri, a sharp sauce of parsley, garlic, oregano, vinegar and oil, is served with grilled beef across Argentina, and the Court pairs steak and chimichurri with Malbec and Cabernet Sauvignon. The wines' ripe fruit and firm tannin meet the fat of the meat, while the sauce's acidity and herbs lift the fruit.",
     "grapes": [
      "Malbec"
     ],
     "id": "e-ce3hg14t",
     "q": "Which herb and garlic sauce, served with steak, does the Court name as the partner for Argentine Malbec and Cabernet Sauvignon?",
     "row": "Food and Beverage Pairing",
     "sa": 1
    },
    {
     "accept": [
      "decanting",
      "decant",
      "decant it",
      "decanted",
      "decanting it",
      "a decanter",
      "decanter",
      "use a decanter"
     ],
     "ans": "Decanting",
     "exp": "A young, concentrated Mendoza Malbec or Cabernet Sauvignon opens with air, and an older one may have thrown a deposit, so the Court's service row says decanting can benefit the high-end examples. Pour slowly into the decanter over a light so any sediment stays behind in the shoulder of the bottle.",
     "grapes": [
      "Malbec"
     ],
     "id": "e-6xt832ka",
     "q": "Some high-end Malbec and Cabernet Sauvignon, the Court says, benefit from one particular service step before pouring. Which step?",
     "row": "Service of Beverage",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Located in South America, east of the Andes Mountain Range and west of the Atlantic Ocean.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Continental to arid desert",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Salta is 1500-2000 meters / 5,000-6,000 feet in elevation, the highest in Argentina.; Mendoza is 600-1200 meters / 2,000-4,000 feet in elevation.",
     "intro": "Andes Mountains are an average of 900 meters / 3,000 feet above sea level and create a rain shadow.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Malbec can have an electric purple color due to increased sun exposure at higher elevations causing intense pigmentation.",
     "intro": "Irrigation is essential and flood irrigation or modern drip irrigation is used. Melted snow from the Andes provides a water source. Major diurnal shifts.",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Torrontés commonly has no oak influence.; New or used, French or American oak are all common for Malbec and Cabernet Sauvignon.",
     "topic": "Winemaking"
    },
    {
     "certified": "",
     "intro": "Torrontés; Chardonnay",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Bonarda, Tempranillo, Syrah",
     "intro": "Malbec; Cabernet Sauvignon",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "85% min to list the grape variety on a label.",
     "topic": "Wine Law"
    },
    {
     "certified": "",
     "intro": "Salta:; Subregion: Cafayate known for Torrontés.; Mendoza:; Subregions: Luján de Cuyo and Uco Valley known for Malbec.; Patagonia: Cool due to southern latitude.; Malbec, Cabernet Sauvignon, Pinot Noir",
     "topic": "Wine Law / Appellations"
    },
    {
     "certified": "",
     "intro": "Torrontés is a highly aromatic grape with soapy, floral, and fruity flavors. It has medium-plus to high acidity making it unique amongst other varieties.",
     "topic": "Style"
    },
    {
     "certified": "IG: Indicación Geográficas, GIs in English; DOC: Denominación de Origen Controlada system",
     "intro": "",
     "topic": "Classification"
    },
    {
     "certified": "Know a couple of producers for service exam recommendations.",
     "intro": "Catena",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "",
     "intro": "Vineyards were revitalized by Italian and Spanish immigrants.",
     "topic": "History & Lore"
    },
    {
     "certified": "Some high-end Malbec and Cabernet Sauvignon can benefit from decanting.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Malbec and Cabernet Sauvignon pair well with steak and chimichurri.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SOUTH AFRICA",
   "group": "southern-hemisphere",
   "id": "south-africa",
   "map": {
    "cats": {
     "certified": [
      "South Africa"
     ],
     "intro": [
      "South Africa"
     ]
    },
    "chapters": {
     "certified": [
      "South Africa"
     ],
     "intro": [
      "safrica"
     ]
    },
    "countries": [
     "south-africa"
    ],
    "grapes": [
     "Chenin Blanc",
     "Chardonnay",
     "Sauvignon Blanc",
     "Syrah / Shiraz",
     "Pinot Noir",
     "Pinotage",
     "Cinsault"
    ],
    "regions": [
     "swartland",
     "stellenbosch",
     "paarl",
     "constantia",
     "franschhoek",
     "elgin",
     "walker-bay",
     "robertson"
    ],
    "serviceRef": [],
    "techniques": [
     "traditional-method",
     "old-vines-density"
    ]
   },
   "name": "South Africa",
   "order": 34,
   "outcome": {
    "certified": "After studying this section, a candidate will be able to locate the general area where South African wines are made, understand the climate of South African wine regions, recognize important grape varieties, recall the basics of the Wine of Origin (WO) System, identify primary growing areas, and understand how important historical and political events have shaped the industry as we know it today. Certified Sommeliers will recognize iconic producers and be able to recommend and sell food pairings with wines from South Africa to a guest.",
    "intro": "After studying this section, a student will be able to locate the general area where South African wines are made, recognize important grape varieties and important wine regions."
   },
   "pages": [
    71,
    72
   ],
   "questions": [
    {
     "a": 3,
     "exp": "The Klein Karoo, the Little Karoo, is the semi-desert region the Court files for sweet fortified wines and brandy: Calitzdorp makes the country's finest Port-style wines from Touriga Nacional and Tinta Barocca, and Muscadel and the brandy still are long traditions there. The Coastal Region and the Cape South Coast are cooled by the sea and grow table wine.",
     "id": "e-1chww2ok",
     "opts": [
      "Coastal Region",
      "Breede River Valley",
      "Cape South Coast",
      "Klein Karoo"
     ],
     "q": "Which region, a semi-desert stretch beyond the Cape's mountain passes, does the Court tie to sweet fortified wines and brandy?",
     "row": "Wine Law / Appellation"
    },
    {
     "a": 2,
     "exp": "Elim is a ward of the Cape Agulhas district, on a windswept plain near Africa's southernmost point, and its Sauvignon Blanc is severe and saline. The Court adds Cape Agulhas and Overberg at the Certified level to the Introductory Elgin and Walker Bay, all of them districts of the Cape South Coast region.",
     "id": "e-9idwrbtl",
     "opts": [
      "Walker Bay",
      "Elgin",
      "Cape Agulhas",
      "Overberg"
     ],
     "q": "Elim, the windswept ward near the continent's southernmost point, lies inside which district from the Court's Certified list?",
     "row": "Wine Law / Appellation"
    },
    {
     "accept": [
      "south-east",
      "southeast",
      "south east",
      "from the south-east",
      "from the southeast",
      "from the south east",
      "the south-east",
      "south-easterly",
      "southeasterly",
      "south easterly",
      "se"
     ],
     "ans": "South-east",
     "exp": "The Cape Doctor is the Court's strong, dry south-easterly, blowing in across False Bay from spring into summer; it dries the canopy, keeps rot and other pests in check and cools the vineyards near the coast. Its cooling partner is the Benguela Current, the frigid Atlantic water that runs up the west coast from Antarctica.",
     "id": "e-o51pkhna",
     "q": "From which compass direction does the Cape Doctor blow onto the shore and the vineyards through spring and summer?",
     "row": "Grape Growing:",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The Old Vine Project sets out to preserve old vineyards and to promote sustainable viticulture that will create more old vines; since 2018 its Certified Heritage Vineyards seal carries the planting date of a vineyard of 35 years or more on the bottle. Old Chenin Blanc bush vines in the Swartland and beyond are its best-known cause.",
     "id": "e-m4ar0rbh",
     "opts": [
      "To preserve old vines and grow more of them sustainably",
      "To replace old vines with virus-free modern clones",
      "To set minimum prices for old-vine bulk wine",
      "To classify the Cape's estates by the age of their cellars"
     ],
     "q": "What does the Court give as the objective of South Africa's Old Vine Project?",
     "row": "Grape Growing:"
    },
    {
     "a": 0,
     "exp": "Hamilton Russell Vineyards, founded in 1975 in the Hemel-en-Aarde Valley of Walker Bay, proved the Cape could make serious Pinot Noir and Chardonnay and bottles only those two under its own name. Graham Beck is Robertson's Cap Classique house, Klein Constantia revived Vin de Constance, and Mulderbosch is a Stellenbosch name.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-k5gclheu",
     "opts": [
      "Hamilton Russell",
      "Klein Constantia",
      "Graham Beck",
      "Mulderbosch"
     ],
     "q": "A guest wants a Pinot Noir from the Hemel-en-Aarde made by one of the producers the Court lists. Which name do you offer?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "accept": [
      "graham beck",
      "graham beck wines",
      "beck"
     ],
     "ans": "Graham Beck",
     "exp": "Graham Beck, on the lime-rich soils of Robertson, is the Cap Classique specialist whose non-vintage Brut was poured at Nelson Mandela's inauguration in 1994. Cap Classique, the Court's Certified term, is South African sparkling wine made by the traditional method, with at least twelve months on the lees.",
     "id": "e-gp6i57jr",
     "q": "Which Robertson house on the Court's producer list is the Cape's best-known specialist in Cap Classique?",
     "row": "Producer/Proprietary Brand",
     "sa": 1
    },
    {
     "accept": [
      "apartheid",
      "the apartheid system",
      "apartheid system",
      "apartheid era",
      "apartheid regime"
     ],
     "ans": "Apartheid",
     "exp": "Apartheid and the trade sanctions against it kept Cape wine off most foreign shelves until the system was dismantled; the 1994 election reopened the markets and exports grew many times over. The Court's History row sets this beside van der Stel's Dutch settlement, phylloxera in 1886, the Anglo-Boer War and the KWV.",
     "id": "e-8yl697jo",
     "q": "Which political system, and the sanctions it drew, shut South African wine out of most export markets until the early 1990s?",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Court frames Cape wines, from sparkling to light and crisp to rich and intense, as world class recommendations from an undervalued area, and Swartland Chenin Blanc from old dry-farmed bush vines is the clearest case of that value. Elgin is cool apple country for Sauvignon Blanc and Chardonnay, Robertson's lime soils are known for Chardonnay and Cap Classique, and Cape Agulhas for saline Sauvignon Blanc.",
     "grapes": [
      "Chenin Blanc"
     ],
     "id": "e-y5wls8t8",
     "opts": [
      "Elgin",
      "Swartland",
      "Cape Agulhas",
      "Robertson"
     ],
     "q": "A guest wants a world class Chenin Blanc of honeyed depth from old dry-farmed bush vines, at a fraction of a top Vouvray's price. Which Cape district do you steer them to?",
     "row": "Food and Beverage Pairing"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Western Cape is the heart of South African viticulture.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Maritime climate on the coast.; Mediterranean to hot moving inland.; Cooling effect of Atlantic and Indian Oceans.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Indian Ocean; Atlantic Ocean; Table Mountain",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Cape Doctor Wind: Strong, dry, south-easterly wind that blows onto shore and the vineyards from spring to summer. Helps mitigate pest issues.; Benguela Current: A frigid current in the Atlantic Ocean from Antarctica that cools portions of the South African coast.; Old Vines Project: Objective is to preserve old vines and promote sustainable viticultural practices to create more old vines.",
     "intro": "Strong winds that blow onto shore to the vineyards help mitigate pest issues.; Cold Atlantic currents from Antarctica cool parts of the coast line.",
     "topic": "Grape Growing:"
    },
    {
     "certified": "Cap Classique: a traditional method; sparkling wine from South Africa.",
     "intro": "History of distillation and brandy production, plus sweet, oxidative, fortified wines.",
     "topic": "Winemaking:"
    },
    {
     "certified": "",
     "intro": "Chenin Blanc, Chardonnay, Sauvignon Blanc",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "Pinotage is a crossing of Cinsault x Pinot Noir",
     "intro": "Syrah/Shiraz, Pinot Noir, and Pinotage",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Wine of Origin System: If from a single appellation, must be 100% from the appellation. Rigorous process for certification.; From Largest Area to Smallest:; Geographical Unit; Region; District; Ward",
     "topic": "Wine Law"
    },
    {
     "certified": "Western Cape; Klein Karoo Region: Sweet fortified wines and brandy); Coastal Region: Franschhoek Valley; Cape South Region: Cape Agulhas, Overberg",
     "intro": "Western Cape; Coastal Region: Swartland, Cape Town, Stellenbosch, Paarl, Constantia; Cape South Coast Region: Elgin, Walker Bay",
     "topic": "Wine Law / Appellation"
    },
    {
     "certified": "",
     "intro": "KWV: Koöperatieve Wijnbouwers Vereniging van Suid-Afrika. The Co-operative Winemakers Union of South Africa is important for creating laws and regulation.",
     "topic": "General Terms"
    },
    {
     "certified": "Graham Beck, Mulderbosch, Hamilton Russell, Klein Constantia, A. A. Badenhorst, Eben Sadie",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "",
     "intro": "1600s Dutch settlement, Simon van der Stel; Phylloxera & Anglo-Boer War; KWV (mentioned above); Apartheid and its effect on the export market.; Move from oxidative and fortified wine production to world class wines.",
     "topic": "History & Lore"
    },
    {
     "certified": "Wines range from sparkling to light and crisp to rich and intense. These are great recommendations for those looking for a world class wine from an undervalued area.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "NEW ZEALAND",
   "group": "southern-hemisphere",
   "id": "new-zealand",
   "map": {
    "cats": {
     "certified": [
      "New Zealand"
     ],
     "intro": [
      "New Zealand"
     ]
    },
    "chapters": {
     "certified": [
      "New Zealand"
     ],
     "intro": [
      "nz"
     ]
    },
    "countries": [
     "new-zealand"
    ],
    "grapes": [
     "Sauvignon Blanc",
     "Chardonnay",
     "Pinot Gris / Grigio",
     "Gewürztraminer",
     "Riesling",
     "Pinot Noir",
     "Cabernet Sauvignon",
     "Syrah / Shiraz",
     "Merlot"
    ],
    "regions": [
     "marlborough",
     "hawkes-bay",
     "central-otago",
     "gisborne",
     "martinborough",
     "nelson",
     "canterbury-waipara"
    ],
    "serviceRef": [],
    "techniques": [
     "maritime-fog",
     "training-pruning"
    ]
   },
   "name": "New Zealand",
   "order": 35,
   "outcome": {
    "certified": "After studying this section, a candidate will know the specific locations, climates, and principal grape varieties of New Zealand's most important wine regions. A Certified Sommelier will have the ability to describe New Zealand Sauvignon Blanc, the natural factors that are responsible for its distinct style, and be able to recommend and sell food pairings with New Zealand wines to a guest.",
    "intro": "After studying this section, a student will know the general location, climate, and style of wine produced in New Zealand's most important wine regions."
   },
   "pages": [
    73,
    74
   ],
   "questions": [
    {
     "a": 1,
     "exp": "In law, Marlborough is a registered GI held to the national 85 per cent rule for a stated region, variety or vintage. The 100 per cent belongs to Appellation Marlborough Wine, a growers' certification launched in 2018 that also asks for bottling in New Zealand and sustainably certified vineyards; it is a seal, not a legal tier.",
     "id": "e-ljc0xqbb",
     "opts": [
      "The Geographical Indications Act",
      "Appellation Marlborough Wine",
      "Sustainable Winegrowing New Zealand",
      "The national labelling rules"
     ],
     "q": "The Court's Marlborough line says labelling requires 100 per cent fruit from the region. Under which scheme does that 100 per cent rule actually apply?",
     "row": "Geography: Appellation"
    },
    {
     "a": 3,
     "exp": "The Court lists Gisborne and Wairarapa as cool maritime, the class it gives Marlborough too, while Central Otago alone is cool continental. Both sit on the east coast of the North Island, sheltered from the westerlies; within that maritime frame Gisborne runs warmer and more humid, known for Chardonnay, and Martinborough in the Wairarapa is dry and windy, known for Pinot Noir.",
     "id": "e-gswsojif",
     "opts": [
      "Warm Mediterranean",
      "Hot desert",
      "Cool continental",
      "Cool maritime"
     ],
     "q": "Into which climate category does the Court file both Gisborne and Wairarapa?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 2,
     "exp": "The Court's Certified whites for New Zealand are Pinot Gris, Gewürztraminer and Riesling, with Riesling tied to Central Otago, where cold nights and a long dry autumn keep its lime and floral notes sharp; Waipara in North Canterbury is the other Riesling stronghold. Sauvignon Blanc and Chardonnay are the Court's Introductory whites.",
     "grapes": [
      "Riesling"
     ],
     "id": "e-xrisx9ia",
     "opts": [
      "Sauvignon Blanc",
      "Chenin Blanc",
      "Riesling",
      "Chardonnay"
     ],
     "q": "Which white grape does the Court's Certified list tie by name to Central Otago?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 2,
     "exp": "Pinot Gris is the grey-pink colour mutation of Pinot Noir, and Gewürztraminer the pink-berried aromatic form of Savagnin; given time on their skins either can show a faint copper tint in the glass. Sauvignon Blanc, Chardonnay and Riesling are green-skinned. In New Zealand Gewürztraminer made Gisborne's name in the 1970s, and Pinot Gris has spread quickly this century.",
     "grapes": [
      "Pinot Gris / Grigio",
      "Gewürztraminer"
     ],
     "id": "e-58ujhtsd",
     "opts": [
      "Sauvignon Blanc and Gewürztraminer",
      "Riesling and Pinot Gris",
      "Pinot Gris and Gewürztraminer",
      "Chardonnay and Riesling"
     ],
     "q": "Of the five whites the Court lists for New Zealand, which two ripen to pink or greyish skins rather than green ones?",
     "row": "Wine: White Grape Variety Names"
    },
    {
     "a": 1,
     "exp": "Felton Road, planted at Bannockburn in Central Otago in the early 1990s with a first vintage in 1997, is farmed biodynamically and bottles its Block 3 and Block 5 Pinot Noirs apart: the region's benchmark. Cloudy Bay is the Marlborough house of the 1985 Sauvignon Blanc, Villa Maria a national house founded in Auckland in 1961, and Ata Rangi Martinborough's great Pinot Noir name.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-7lnas9zk",
     "opts": [
      "Cloudy Bay",
      "Felton Road",
      "Ata Rangi",
      "Villa Maria"
     ],
     "q": "Block 3 and Block 5, single-block Pinot Noirs from a biodynamic Bannockburn estate, come from which producer on the Court's list?",
     "row": "Producer - Proprietary Brand"
    },
    {
     "accept": [
      "temperance",
      "temperance movement",
      "the temperance movement",
      "temperance laws",
      "the temperance laws",
      "prohibition movement",
      "the prohibition movement"
     ],
     "ans": "The temperance movement",
     "exp": "The temperance movement held New Zealand drinking in check for decades: restaurants could not sell wine until 1960 and supermarkets until 1990, while Dalmatian settlers around Auckland kept winemaking alive on hybrids and fortified wine. The Court sets it beside the young industry, its innovation and the screwcap initiative of 2001.",
     "id": "e-pb6vemhj",
     "q": "Which social movement, named in the Court's history of New Zealand, kept wine off restaurant tables until 1960 and out of supermarkets until 1990?",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Scott Henry is a divided canopy: the vine carries two fruiting zones, one above the other, with the upper shoots trained upward and the lower ones downward, spreading a vigorous vine's foliage to let light and air into the fruit. Vertical Shoot Position, the other system the Court names, tucks every shoot upward into a single narrow wall.",
     "id": "e-0pqyrkpn",
     "opts": [
      "All shoots left to hang from a single high wire",
      "Shoots spread flat across an overhead pergola",
      "Every shoot tucked upward into one narrow wall",
      "Upper shoots trained upward and lower shoots downward"
     ],
     "q": "The Court asks a Certified candidate to know the Scott Henry trellis. How does that system train the vine's shoots?",
     "row": "History & Lore"
    },
    {
     "a": 0,
     "exp": "The Court notes that New Zealand Sauvignon Blanc has the ripeness of fruit for sweet and savoury ingredients such as mango salsa, and that acid should meet acid: the wine's high acidity matches the lime and fruit of the salsa. Pinot Noir and Bordeaux blends are the Court's elegant non-European reds, kept for meatier dishes.",
     "grapes": [
      "Sauvignon Blanc"
     ],
     "id": "e-f2jgb4mt",
     "opts": [
      "Sauvignon Blanc",
      "Pinot Noir",
      "Cabernet Sauvignon",
      "Syrah"
     ],
     "q": "Following the Court's pairing advice, which New Zealand wine would you pour with a dish finished with a fresh mango salsa?",
     "row": "Food and Beverage Pairing"
    },
    {
     "accept": [
      "6",
      "six",
      "6 months",
      "six months",
      "about six months",
      "around six months",
      "six month",
      "half a year"
     ],
     "ans": "Six months",
     "exp": "Grapes in New Zealand are picked from about February to April, while the Northern Hemisphere harvest runs from about August to October, so a New Zealand wine labelled with a given year was picked some six months before a European wine of the same year. A new Southern Hemisphere vintage can therefore reach a list first.",
     "id": "e-wjft7kog",
     "q": "By roughly how many months does a New Zealand vintage run ahead of the same year's Northern Hemisphere harvest, as the Court notes?",
     "row": "Vintage",
     "sa": 1
    },
    {
     "accept": [
      "pinot noir",
      "new zealand pinot noir",
      "central otago pinot noir",
      "martinborough pinot noir",
      "pinot nero"
     ],
     "ans": "Pinot Noir",
     "exp": "The Court names Pinot Noir and Bordeaux blends as elegant non-European options: Pinot Noir from Central Otago, Martinborough or Marlborough for a guest who drinks Burgundy, and Merlot and Cabernet blends from the Gimblett Gravels of Hawke's Bay for a claret drinker. Pinot Noir is the most planted red in the country.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-aub14fai",
     "q": "Alongside Bordeaux blends, which New Zealand red does the Court offer as an elegant non-European option at the table?",
     "row": "Food and Beverage Pairing",
     "sa": 1
    },
    {
     "accept": [
      "villa maria",
      "villa maria estate",
      "villa maria wines"
     ],
     "ans": "Villa Maria",
     "exp": "Villa Maria was founded in Auckland in 1961 and grew into a national house drawing on Marlborough, Hawke's Bay and Gisborne, with reserve wines from single vineyards. The Court's three producers for New Zealand are Cloudy Bay, Felton Road and Villa Maria.",
     "id": "e-oewutixu",
     "q": "Founded in Auckland in 1961, which house on the Court's New Zealand producer list grew into one of the country's largest wine companies?",
     "row": "Producer - Proprietary Brand",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Southern Hemisphere; Two islands: North Island and South Island; 4,100 km/2,500 miles to the southeast of Australia.",
     "topic": "Geography: Location"
    },
    {
     "certified": "Gisborne: Cool maritime; Wairarapa: Cool maritime",
     "intro": "South Island: Cool; Marlborough: Cool maritime (with protection); Central Otago: Cool continental; North Island: Warmer, humid; Hawke's Bay: Moderate maritime",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Southern Alps",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "",
     "intro": "Gimblett Gravels: Gravel",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "North Island GI:; Gisborne GI; Wairarapa GI; Martinborough GI; South Island GI:; Marlborough GI:; Labeling requires 100% fruit from the region.; Subregions:; Awatere Valley; Wairau Valley; Nelson GI; Canterbury GI",
     "intro": "Geographical Indications (GIs): trademark only with no minimums, no rules.; New Zealand GI; North Island GI:; Hawke's Bay GI; Gimblett Gravels; South Island GI:; Marlborough GI; Central Otago GI",
     "topic": "Geography: Appellation"
    },
    {
     "certified": "",
     "intro": "South Island: Long sunlight hours; North Island: Humidity",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Clean, modern, winemaking, use of screwcaps.",
     "topic": "Winemaking"
    },
    {
     "certified": "Pinot Gris, Gewürztraminer, Riesling (Central Otago)",
     "intro": "Sauvignon Blanc, Chardonnay",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Pinot Noir, Cabernet Sauvignon, Syrah, Merlot",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "85% min to list the grape variety on a label.",
     "topic": "Wine Law"
    },
    {
     "certified": "",
     "intro": "Whites: Typically unoaked, high flavor intensity with high natural acidity.; Reds: Lightly oaked",
     "topic": "Style"
    },
    {
     "certified": "Cloudy Bay, Felton Road, Villa Maria",
     "intro": "",
     "topic": "Producer - Proprietary Brand"
    },
    {
     "certified": "Recent vintages are 6 months ahead of Northern Hemisphere.",
     "intro": "",
     "topic": "Vintage"
    },
    {
     "certified": "Know Scott Henry and Vertical Shoot Position (VSP) trellis systems.",
     "intro": "Young industry, temperance movement, innovation, screwcap initiative.",
     "topic": "History & Lore"
    },
    {
     "certified": "Know how to open a screwcap.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Sauvignon Blanc has ripeness for sweet-savory ingredients (e.g., mango salsa); pair acid with acid. Pinot Noir and Bordeaux blends can be elegant non-European options.",
     "intro": "High-acid and unoaked wines with seafood, starters, salads. Intense flavors can be too much for super delicate dishes.",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "AUSTRALIA",
   "group": "southern-hemisphere",
   "id": "australia",
   "map": {
    "cats": {
     "certified": [
      "Australia"
     ],
     "intro": [
      "Australia"
     ]
    },
    "chapters": {
     "certified": [
      "Australia"
     ],
     "intro": [
      "australia"
     ]
    },
    "countries": [
     "australia"
    ],
    "grapes": [
     "Syrah / Shiraz",
     "Grenache / Garnacha",
     "Cabernet Sauvignon",
     "Riesling",
     "Chardonnay",
     "Sauvignon Blanc",
     "Sémillon",
     "Muscat"
    ],
    "regions": [
     "barossa-eden",
     "mclaren-vale",
     "clare-valley",
     "coonawarra",
     "margaret-river",
     "yarra-valley",
     "hunter-valley",
     "rutherglen",
     "tasmania"
    ],
    "serviceRef": [],
    "techniques": [
     "blending-assemblage",
     "old-vines-density",
     "heat-irrigation",
     "oak",
     "oxidative-rancio",
     "phylloxera-rootstocks"
    ]
   },
   "name": "Australia",
   "order": 36,
   "outcome": {
    "certified": "After studying this section, a candidate will be know the specific locations, climates, and principal grape varieties of Australia's most important wine regions and the difference between bulk wine regions and premium wine regions. A Certified Sommelier will have the ability to describe Barossa/McLaren Vale Shiraz, recognize iconic producers, and be able to recommend and sell food pairings with Australian wines to a guest.",
    "intro": "After studying this section, a student will know the general location, climate, and styles of wine produced in Australia's most important wine regions."
   },
   "pages": [
    75,
    76
   ],
   "questions": [
    {
     "a": 3,
     "exp": "The Court's traditional model blends fruit across regions for a consistent house style and ages it in American oak, with its vanilla and coconut; the modern model bottles a single GI or site and favours French oak, which frames the fruit more quietly. Barossa and McLaren Vale Shiraz now show both approaches.",
     "id": "e-uqo0cv0c",
     "opts": [
      "A blend across regions, aged in French oak",
      "A blend across regions, aged in American oak",
      "A single GI or site, aged in American oak",
      "A single GI or site, aged in French oak"
     ],
     "q": "The Court contrasts a traditional model of Australian winemaking with a modern one. Which pairing describes the modern model?",
     "row": "Winemaking"
    },
    {
     "a": 1,
     "exp": "The first vines came ashore with the First Fleet at Sydney Cove in 1788. The Yarra Valley was planted in 1838 and the Barossa settled from 1842, and after phylloxera the industry's centre moved west to South Australia, which its quarantine has kept free of the louse.",
     "id": "e-mt9kvlhs",
     "opts": [
      "1838",
      "1788",
      "1851",
      "1842"
     ],
     "q": "According to the Court, Australia's first vines went into the ground near Sydney in which year?",
     "row": "History & Lore"
    },
    {
     "a": 2,
     "exp": "The Court sets Yarra Valley Pinot Noir beside Willamette Valley Pinot Noir: both are cool regions giving red-fruited, medium-bodied wines, the Yarra's from hillsides north-east of Melbourne. Barossa is warm Shiraz country, Clare is known for Riesling and Coonawarra for Cabernet Sauvignon on terra rossa.",
     "grapes": [
      "Pinot Noir"
     ],
     "id": "e-xw8ph46u",
     "opts": [
      "Clare Valley",
      "Barossa Valley",
      "Yarra Valley",
      "Coonawarra"
     ],
     "q": "A guest who loves Willamette Valley Pinot Noir wants an Australian equivalent. Following the Court's parallels, which region do you suggest?",
     "row": "Food and Beverage Pairing"
    },
    {
     "accept": [
      "riesling",
      "dry riesling",
      "clare riesling",
      "clare valley riesling",
      "eden riesling",
      "eden valley riesling",
      "australian riesling"
     ],
     "ans": "Riesling",
     "exp": "Clare and Eden Valley Riesling is bone dry, lime-scented and sharply acidic, so the Court suggests it wherever a guest would reach for New Zealand Sauvignon Blanc: with salads, seafood, goat's cheese and herb-led dishes. Both valleys owe that freshness to height and cold nights.",
     "grapes": [
      "Riesling"
     ],
     "id": "e-ovdzqr9b",
     "q": "Which grape from Clare or Eden Valley does the Court suggest using as you would a New Zealand Sauvignon Blanc at the table?",
     "row": "Food and Beverage Pairing",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "Australia covers about 7.7 million square kilometres, close to the area of the contiguous United States, yet its vineyards cluster in a crescent along the southern and south-eastern rim, because the interior is hot desert and the north tropical. Distances are vast: Margaret River and the Hunter Valley lie more than three thousand kilometres apart.",
     "id": "e-z5zcyjdd",
     "opts": [
      "The continental United States",
      "The Indian subcontinent",
      "The Russian Federation",
      "The whole of Western Europe"
     ],
     "q": "The Court compares the size of Australia with which territory?",
     "row": "Geography: Location"
    },
    {
     "accept": [
      "fortified",
      "fortified wine",
      "fortified wines",
      "sweet and fortified",
      "sweet and fortified wine",
      "sweet and fortified wines",
      "fortified and sweet wines",
      "sweet fortified wine",
      "sweet fortified wines",
      "sweet/fortified wines",
      "sweet wine",
      "sweet wines"
     ],
     "ans": "Sweet and fortified wine",
     "exp": "For about a century Australian wine meant mostly sweet and fortified wine, from port and sherry styles to Rutherglen Muscat, and the turn to table wine came only after the Second World War, marked by the first experimental Grange of 1951. Rutherglen's fortified Muscat and Topaque carry that tradition on.",
     "id": "e-m6zbded0",
     "q": "Until late in the twentieth century, which broad category of wine dominated Australian production, as the Court's history records?",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "accept": [
      "new south wales",
      "nsw",
      "new south wales gi",
      "n.s.w."
     ],
     "ans": "New South Wales",
     "exp": "The Hunter Valley lies in New South Wales, north of Sydney and inland from Newcastle, the most northerly of the classic regions; humid and often wet at vintage, it makes early-picked, unoaked Semillon and medium-bodied, earthy Shiraz. The Court's other Certified GIs are Coonawarra in South Australia and Tasmania, an island state registered as one GI.",
     "id": "e-wzrs6shd",
     "q": "The Hunter Valley GI, on the Court's Certified list, lies within which state GI?",
     "row": "Wine Law / Appellation",
     "sa": 1
    },
    {
     "accept": [
      "magill",
      "magill estate",
      "the magill estate",
      "penfolds magill estate",
      "magill, adelaide",
      "the grange at magill"
     ],
     "ans": "Magill",
     "exp": "Dr Christopher Rawson Penfold and his wife Mary planted vines at Magill in 1844 and called their cottage The Grange, and the name passed to the Shiraz first made experimentally in 1951. Grange is a blend drawn from vineyards across South Australia rather than the wine of one site, which is what sets it apart from Hill of Grace, a single Eden Valley vineyard; Magill Estate itself still makes a single vineyard Shiraz.",
     "grapes": [
      "Syrah / Shiraz"
     ],
     "id": "e-zve4d9w8",
     "q": "Penfolds Grange, the one Australian name on the Court's producer list, takes its name from the founders' cottage on the estate where the house began in 1844. Which estate, now within Adelaide's eastern suburbs, is it?",
     "row": "Producer - Proprietary Brand",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Southern Hemisphere, the size of continental United States.",
     "topic": "Geography: Location"
    },
    {
     "certified": "",
     "intro": "Hot, dry interior, cooler near coast.; Cool maritime to warm Mediterranean to hot and arid.",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "",
     "intro": "Elevation in South Australia, currents from Antarctica.",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Coonawarra: Terra Rossa",
     "intro": "",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "",
     "intro": "Concept of blending across regions for volume.; 100+ year old vines exist.; Irrigation is necessary in the country interior.; Best vineyards are near the cooler coast.",
     "topic": "Grape Growing"
    },
    {
     "certified": "Rutherglen: Fortified wines",
     "intro": "Traditional: Blending across regions, American oak; Modern: Single GI/site, French oak",
     "topic": "Winemaking"
    },
    {
     "certified": "Semillon (Hunter), Muscat",
     "intro": "Riesling, Chardonnay, Sauvignon Blanc/Semillon blend",
     "topic": "Wine: White Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "Shiraz, Grenache, Cabernet Sauvignon",
     "topic": "Wine: Red Grape Variety Names"
    },
    {
     "certified": "",
     "intro": "GI: Refers to a geographic place of origin only, no other additional laws.; 85% labeling required for grape variety, vintage, and origin.",
     "topic": "Wine Law"
    },
    {
     "certified": "",
     "intro": "Geographic Indications (GIs): Indicates Geographical location only.; Australia, State, Zone, Region, Sub-Region; *More specificity as the region gets smaller. No need to memorize which are Zones vs. Regions but know this system exists.; *South Eastern Australia Super GI (high-volume)",
     "topic": "Wine Law / Appellation"
    },
    {
     "certified": "Tasmania GI; New South Wales GI: Hunter Valley GI; South Australia GI: Coonawarra GI",
     "intro": "New South Wales GI; Victoria GI; South Australia GI; Western Australia GI; South Eastern Australia GI: Riverina GI, Murray Darling GI; Victoria GI: Yarra Valley GI; South Australia GI: Barossa Valley GI, McLaren Vale GI, Clare Valley GI, Eden Valley GI; Western Australia GI: Margaret River GI",
     "topic": "Wine Law / Appellation"
    },
    {
     "certified": "",
     "intro": "Superzone (South Eastern Australia)",
     "topic": "General Terms"
    },
    {
     "certified": "Penfold's Grange",
     "intro": "",
     "topic": "Producer - Proprietary Brand"
    },
    {
     "certified": "",
     "intro": "First vines planted in 1788 (near Sydney), industry moved west after phylloxera (quarantine), sweet/fortified wines dominated until late 20th Century, purchased French company that invented Stelvin closure, Yellow Tail business model.",
     "topic": "History & Lore"
    },
    {
     "certified": "Screw cap",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Ripe Shiraz with intense grilled or barbecued meat. Use Clare or Eden Riesling like New Zealand Sauvignon Blanc. Yarra Pinot Noir parallels Willamette Valley Pinot Noir. Yarra Chardonnay works like Sonoma Coast Chardonnay. Margaret River Bordeaux blends are elegant like wines from Bordeaux.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "WORLD SPARKLING WINES",
   "group": "styles",
   "id": "world-sparkling-wines",
   "map": {
    "cats": {
     "certified": [
      "Sparkling Wine World"
     ],
     "intro": [
      "Sparkling/Fortified/Sweet"
     ]
    },
    "chapters": {
     "certified": [
      "Sparkling Wine World"
     ],
     "intro": [
      "sparkling"
     ]
    },
    "countries": [],
    "grapes": [],
    "regions": [
     "champagne",
     "penedes",
     "lombardy",
     "veneto"
    ],
    "serviceRef": [
     "sparkling",
     "glassware"
    ],
    "techniques": [
     "traditional-method",
     "tank-method",
     "ancestral-method",
     "blending-assemblage"
    ]
   },
   "name": "World Sparkling Wines",
   "order": 37,
   "outcome": {
    "certified": "After studying this section, a Certified Sommelier will understand the different ways sparkling wines are made, be able to identify the method used for the world's most important sparkling wines, and describe the impact the method has on the final wine. A Certified Sommelier will be able to recommend sparkling wines to guests and pair them appropriately with food.",
    "intro": "After studying this section, a student will understand the different ways sparkling wines are made."
   },
   "pages": [
    77,
    78
   ],
   "questions": [
    {
     "accept": [
      "wine and sugar",
      "sugar and wine",
      "sugar dissolved in wine",
      "sugar in wine",
      "wine with sugar",
      "wine, sugar",
      "sugar, wine",
      "cane sugar and wine",
      "wine and cane sugar",
      "base wine and sugar",
      "reserve wine and sugar",
      "wine and sugar syrup",
      "sugar syrup and wine",
      "wine and grape must",
      "grape must and wine",
      "wine and concentrated grape must",
      "wine and rectified concentrated grape must"
     ],
     "ans": "Wine and sugar",
     "exp": "The liqueur d'expédition is wine with sugar dissolved in it, traditionally cane sugar, though many houses now use concentrated grape must; how much goes in sets the style from Extra Brut to Doux. Brut Nature takes no added sugar at all, and the Court asks what both liqueurs are made of.",
     "id": "e-ta0e09ot",
     "q": "What two things make up the liqueur d'expédition added at dosage?",
     "row": "Winemaking: Classic / Traditional Method",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The liqueur de tirage is sugar and selected yeast, with a riddling aid such as bentonite, stirred into the still cuvée at bottling; the yeast ferments the sugar in the bottle and the carbon dioxide stays dissolved. About 24 grams of sugar per litre gives a pressure of around six atmospheres.",
     "id": "e-6tt4lcsq",
     "opts": [
      "Sugar and yeast",
      "Sulphur and yeast",
      "Wine and grape spirit",
      "Sugar and grape spirit"
     ],
     "q": "Which pair does the liqueur de tirage add to the still base wine to start the second fermentation?",
     "row": "Winemaking: Classic / Traditional Method"
    },
    {
     "a": 1,
     "exp": "Cap Classique is South Africa's term for sparkling wine whose second fermentation took place in the bottle in which it is sold, led by Chardonnay and Pinot Noir. The Court adds it at the Certified level to the Introductory examples of Champagne, Crémant, Cava and Franciacorta.",
     "id": "e-etidr9as",
     "opts": [
      "New Zealand",
      "South Africa",
      "Argentina",
      "Australia"
     ],
     "q": "Which country's traditional method sparkling wine carries the name Cap Classique?",
     "row": "Winemaking: Classic / Traditional Method"
    },
    {
     "accept": [
      "emilia-romagna",
      "emilia romagna",
      "emilia",
      "emiliaromagna"
     ],
     "ans": "Emilia-Romagna",
     "exp": "Lambrusco is the red, often frothy wine of Emilia, around Modena and Reggio, with a smaller zone over the border in Lombardy near Mantua. Most is made by the tank method, which keeps its fresh red fruit, and it comes dry as well as sweet.",
     "id": "e-5gjalmmr",
     "q": "Lambrusco, the Court's Certified example of the tank method, is made chiefly in which Italian region?",
     "row": "Winemaking: Charmat Method - Cuve Close",
     "sa": 1
    },
    {
     "accept": [
      "méthode rurale",
      "methode rurale",
      "rurale",
      "méthode rural",
      "methode rural"
     ],
     "ans": "Méthode Rurale",
     "exp": "The Court lists Ancestral Method, Méthode Rurale and Pétillant Naturel, or pet-nat, as names for one process: the first fermentation is paused part way, the wine is bottled and fermentation finishes inside, with no second fermentation. It is bottled at much lower pressure than Champagne and often left undisgorged.",
     "id": "e-llgf8j95",
     "q": "Besides ancestral method and pétillant naturel, which French name does the Court give the method that finishes the first fermentation in bottle?",
     "row": "Winemaking: Méthod Ancestrale",
     "sa": 1
    },
    {
     "accept": [
      "90",
      "90 days",
      "about 90 days",
      "ninety",
      "ninety days",
      "three months",
      "3 months"
     ],
     "ans": "90 days",
     "exp": "In the Charmat or cuve close method the second fermentation runs in a pressurised tank and is complete in four to five days, then the wine is filtered and bottled with no riddling or disgorging. That saving of time and cost is the method's whole case, and the Court calls it the best process for aromatic grape varieties.",
     "id": "e-foytv7iq",
     "q": "By the Court's figures, a tank method sparkling wine can go from harvest to final bottling in as little as how many days?",
     "row": "Winemaking: Charmat Method - Cuve Close",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Moscato d'Asti is made in tank, which keeps Moscato's grapey, floral aroma, and, low in alcohol and rich in sugar, it stays sweeter than a fruit dessert. The three traditional method wines are dry and autolytic, better with salty, fried or rich savoury food than with a sweet tart; the Court asks how the method shapes the pairing.",
     "id": "e-80corgto",
     "opts": [
      "Brut Cava",
      "Brut Nature Champagne",
      "Extra Brut Franciacorta",
      "Moscato d'Asti"
     ],
     "q": "Which sparkling wine best suits a fresh peach tart, needing to be light, sweeter than the dessert and full of the grape's own aroma?",
     "row": "Food and Beverage Pairing"
    },
    {
     "a": 0,
     "exp": "Prosecco takes its second fermentation in a pressurised tank, so it skips months on the lees, riddling and disgorging and costs far less to make than Champagne, Franciacorta or Cap Classique, all traditional method wines. A well built list offers bubbles at several price points, with a tank wine at the base and traditional method wines above it.",
     "id": "e-f11b4d5c",
     "opts": [
      "Prosecco",
      "Champagne",
      "Cap Classique",
      "Franciacorta"
     ],
     "q": "Which of these sparkling wines, made in tank with no riddling or disgorging, is the usual value pour on a by the glass list?",
     "row": "BOS"
    },
    {
     "a": 2,
     "exp": "A gyropalette turns and tilts a whole cage of around five hundred bottles at once under a programme, finishing in a few days to a week what a skilled riddler takes weeks to do by hand. It saves labour and cellar space and gives a consistent result, which is why the Court asks its time, cost and efficacy.",
     "id": "e-klway3mr",
     "opts": [
      "About three months",
      "About six months",
      "A few days",
      "About a month"
     ],
     "q": "Hand riddling on a pupitre takes several weeks. About how long does a gyropalette usually need to riddle its cage of bottles?",
     "row": "General Terms"
    }
   ],
   "rows": [
    {
     "certified": "Making still wine, assemblage of Cuvée, Creating bubbles using Liqueur de tirage, Sur Lie Aging, Riddling (Remuage) using pupitre or gyropalette, Disgorging (Dégorgement), Dosage using Liqueur d'expédition.; **Know what liqueur de tirage and liqueur d'expédition are made of.; Examples: Cap Classique",
     "intro": "Also called Champagne Method, Méthode Traditionnelle, Metodo Classico; Making still wine, assemblage of Cuvée, creating bubbles using Liqueur de Tirage, Sur Lie Aging, Riddling (Rémuage) using pupitre or gyropalette, Disgorging (Dégorgement), Dosage using Liqueur d'Expédition.; Autolysis. Aging in lees.; Examples: Champagne, Crémant, Cava, Franciacorta",
     "topic": "Winemaking: Classic / Traditional Method"
    },
    {
     "certified": "",
     "intro": "Identical to the classic method up to completion of second fermentation. Secondary fermentation occurs in bottle. The bottles are disgorged under pressure into large tanks. The wine is then filtered and then rebottled. Advantages: Lees contact for flavor is obtained and riddling is eliminated.; Examples: This process is used for extra large and extra small format bottles.",
     "topic": "Winemaking: Transfer Method"
    },
    {
     "certified": "Examples: Lambrusco",
     "intro": "Secondary fermentation occurs in pressurized tanks. Fermentation is complete in 4-5 days. The wine is filtered and then bottled. Advantages: Saves an immense amount of time and cost with no riddling or disgorging. Can be as little as 90 days from harvest to final bottling. This is the best process for making sparkling wine from aromatic grape varieties.; Examples: Prosecco, Moscato d’Asti",
     "topic": "Winemaking: Charmat Method - Cuve Close"
    },
    {
     "certified": "Also called Ancestral Method / Méthode Rurale / Pétillant Naturel (a.k.a. “Pet-nat”). Bottled at much lower pressure.",
     "intro": "Primary fermentation is paused mid-way. The wines are bottled and the fermentation finishes inside the bottle. The CO2 produced is trapped in the bottle. There is no requirement to remove the sediment by disgorging.",
     "topic": "Winemaking: Méthod Ancestrale"
    },
    {
     "certified": "Differences between possible pairings depending on the method. How does the method impact the final style?",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    },
    {
     "certified": "Impact of cost of these various styles and how they fit into a well rounded wine program both by the bottle and by the glass to offer guests many price points.",
     "intro": "",
     "topic": "BOS"
    },
    {
     "certified": "",
     "intro": "Crémant: French sparkling wine produced by méthode traditionnelle made outside the Champagne Region.; Examples: Crémant de Bourgogne, Crémant d’Alsace, Crémant de Loire",
     "topic": "Label Terms"
    },
    {
     "certified": "Understand the importance of the Gyropalette time, cost, and efficacy.",
     "intro": "Gyropalette",
     "topic": "General Terms"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SWEET WINES",
   "group": "styles",
   "id": "sweet-wines",
   "map": {
    "cats": {
     "certified": [
      "Sweet Wines"
     ],
     "intro": [
      "Dessert & Sweet Wines",
      "Sparkling/Fortified/Sweet"
     ]
    },
    "chapters": {
     "certified": [
      "Sweet Wines"
     ],
     "intro": [
      "sweet"
     ]
    },
    "countries": [
     "germany",
     "austria",
     "canada"
    ],
    "grapes": [
     "Sémillon",
     "Riesling",
     "Pinot Gris / Grigio",
     "Gewürztraminer",
     "Muscat Blanc",
     "Chenin Blanc",
     "Furmint",
     "Garganega",
     "Corvina (Valpolicella)",
     "Cabernet Franc"
    ],
    "regions": [
     "bordeaux",
     "alsace",
     "loire",
     "tokaj",
     "veneto",
     "tuscany",
     "mosel"
    ],
    "serviceRef": [
     "digestifs",
     "glassware",
     "temperatures"
    ],
    "techniques": [
     "noble-rot",
     "ice-wine",
     "dried-grapes",
     "late-harvest"
    ]
   },
   "name": "Sweet Wines",
   "order": 38,
   "outcome": {
    "certified": "After studying this section, a candidate will gain a deeper knowledge of the sweet wines of the world, know iconic producers, and be able to recommend sweet wines to guests and pair them appropriately with food.",
    "intro": "After studying this section, a student will learn the different methods of sweet wine production and will review the most well-known wines and their grape varieties."
   },
   "pages": [
    79,
    80
   ],
   "questions": [
    {
     "a": 1,
     "exp": "Vouvray, east of Tours in Touraine, is a Chenin Blanc appellation (a token share of Orbois is allowed), and in warm autumns with noble rot or shrivelled berries growers make moelleux beside their sec, demi-sec and sparkling wines. The Court lists it with Quarts de Chaume and Bonnezeaux, both Chenin too, as the Loire's noble rot appellations.",
     "grapes": [
      "Chenin Blanc"
     ],
     "id": "e-fawgcpjn",
     "opts": [
      "Melon de Bourgogne",
      "Chenin Blanc",
      "Sémillon",
      "Sauvignon Blanc"
     ],
     "q": "Vouvray Moelleux, one of the Loire's sweet wines, is made from which grape?",
     "row": "Geography: Appellation Noble Rot"
    },
    {
     "accept": [
      "noble rot",
      "botrytis",
      "botrytis cinerea",
      "pourriture noble",
      "edelfaule",
      "edelfäule",
      "botrytised fruit"
     ],
     "ans": "Noble rot (Botrytis cinerea)",
     "exp": "Eiswein and Icewine come from healthy grapes left to freeze on the vine and pressed while frozen, so the water stays behind as ice and the juice is concentrated. The Court's rule is that the fruit be free of noble rot, whose honey, saffron and ginger would blur the pure fruit and searing acidity that mark the style.",
     "id": "e-27xpz2ma",
     "q": "By the Court's rule, the frozen grapes for Eiswein and Icewine must be free of which fungal infection?",
     "row": "Grape Growing",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "Corvina leads the Valpolicella blend with Rondinella, and for Recioto its bunches are dried for months before pressing, then fermented only part way so the wine stays sweet. Garganega makes the white Recioto di Soave and Trebbiano, with Malvasia, makes Vin Santo, the Court's other two dried grape wines.",
     "grapes": [
      "Corvina"
     ],
     "id": "e-t2uauyjy",
     "opts": [
      "Corvina",
      "Garganega",
      "Glera",
      "Sangiovese"
     ],
     "q": "Recioto della Valpolicella, the sweet red made from dried grapes, is made chiefly from which variety?",
     "row": "Wine: Grape Variety Names Drying"
    },
    {
     "accept": [
      "cabernet franc",
      "cab franc",
      "cabernet-franc"
     ],
     "ans": "Cabernet Franc",
     "exp": "Ontario's Icewine is mostly Vidal, a winter hardy hybrid, with Riesling for the finest whites, and Cabernet Franc gives a pink to pale red Icewine with strawberry and red berry notes. Under VQA the grapes must freeze naturally on the vine and be picked at minus 8°C or colder.",
     "grapes": [
      "Cabernet Franc"
     ],
     "id": "e-43p1mypk",
     "q": "Besides the white grapes Vidal and Riesling, which red grape does the Court name for Canadian Icewine?",
     "row": "Wine: Grape Variety Names Freezing",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "The Court notes that full-sized bottles age better than half bottles: the larger volume holds proportionally less of the air under the cork and changes temperature more slowly, so a 750 ml Sauternes develops more slowly and evenly than a 375. Many sweet wines are bottled in clear glass, so they must also be kept out of direct light.",
     "id": "e-dagku95h",
     "opts": [
      "500 ml bottle",
      "375 ml bottle",
      "750 ml bottle",
      "187 ml bottle"
     ],
     "q": "By the Court's guide, which of these formats ages a sweet wine best over many years?",
     "row": "Business of the Sommelier"
    },
    {
     "a": 3,
     "exp": "Château Rieussec, in Fargues, is one of the Premiers Crus that sit below Château d'Yquem, the sole Premier Cru Supérieur; Filhot, Doisy-Daëne and de Malle are Deuxièmes Crus. The Court asks a couple of producers in each category, to recommend in service.",
     "id": "e-mwgno1a1",
     "opts": [
      "Château Filhot",
      "Château Doisy-Daëne",
      "Château de Malle",
      "Château Rieussec"
     ],
     "q": "Which Sauternes estate was ranked a Premier Cru in the 1855 classification?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "accept": [
      "2",
      "two",
      "2 oz",
      "2oz",
      "2 fl oz",
      "2 ounces",
      "two ounces",
      "59.1 ml",
      "59.1",
      "59 ml",
      "60 ml"
     ],
     "ans": "2 oz (59.1 ml)",
     "exp": "The Court sets a by the glass serving of sweet wine at 2 oz, about 59 ml, so a 375 ml half bottle gives six glasses and a 750 ml bottle about twelve. Kept cold in the refrigerator, an opened bottle can typically last for a week.",
     "id": "e-qip0fzms",
     "q": "By the Court's standard, how many ounces make the usual by the glass pour of a sweet wine?",
     "row": "Service of Beverage",
     "sa": 1
    },
    {
     "accept": [
      "500",
      "500 ml",
      "500ml",
      "500 millilitres",
      "500 milliliters",
      "50 cl",
      "50cl",
      "half a litre",
      "half litre",
      "0.5 litre",
      "0.5 l",
      "five hundred millilitres"
     ],
     "ans": "500 ml",
     "exp": "Tokaji Aszú usually comes in a 500 ml bottle, so at the Court's 2 oz pour it gives about eight glasses rather than the twelve of a 750 ml bottle. Costing it as a 750 would understate the cost of each glass by about a third.",
     "id": "e-gpw0s13y",
     "q": "In what bottle size is Tokaji Aszú often sold, the figure a sommelier must use to cost a glass correctly?",
     "row": "Business of the Sommelier",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "Match these appellations with their larger regions and know they most common grape varieties for each.",
     "intro": "Noble Rot (Botrytis); Bordeaux: Sauternes; Alsace: Vendange Tardive (VT) and Sélection de Grain Nobles (SGN); Germany: Auslese, Beerenauslese (BA), Trockenbeerenauslese (TBA); Loire: Quarts de Chaume/Bonnezeaux/Vouvray Moelleux; Hungary: Tokaji Aszú",
     "topic": "Geography: Appellation Noble Rot"
    },
    {
     "certified": "",
     "intro": "Italy: Vin Santo DOC, Recioto di Soave DOC, Recioto della Valpolicella DOC",
     "topic": "Geography: Appellation Drying"
    },
    {
     "certified": "",
     "intro": "Germany & Austria: Eiswein; Canada: Icewine (Ontario VQA 'Vintners Quality Alliance')",
     "topic": "Geography: Appellation Freezing"
    },
    {
     "certified": "Eiswein and Icewine must be free of noble rot.",
     "intro": "",
     "topic": "Grape Growing"
    },
    {
     "certified": "",
     "intro": "Stop the action of yeast by: Chilling and filtering; Chilling and adding SO2",
     "topic": "Winemaking"
    },
    {
     "certified": "",
     "intro": "Sauternes: Sémillon; Alsace: Riesling, Pinot Gris, Gewürztraminer, Muscat; Loire Valley: Chenin Blanc; Tokaji: Furmint",
     "topic": "Wine: Grape Variety Names Noble Rot"
    },
    {
     "certified": "Vin Santo: Trebbiano; Recioto di Soave: Garganega; Recioto della Valpolicella: Corvina",
     "intro": "",
     "topic": "Wine: Grape Variety Names Drying"
    },
    {
     "certified": "Canada: Vidal, Riesling, Cabernet Franc",
     "intro": "Germany: Riesling; Canada: Riesling, Cabernet Franc",
     "topic": "Wine: Grape Variety Names Freezing"
    },
    {
     "certified": "",
     "intro": "Recioto, Vendange Tardive, Sélection de Grains Nobles, Moelleux",
     "topic": "Label Terms"
    },
    {
     "certified": "",
     "intro": "Noble Rot = Botrytis Cinerea",
     "topic": "General Terms"
    },
    {
     "certified": "Classification of Sauternes (1855); Superior First Growth (Premier Cru Supérieur)",
     "intro": "",
     "topic": "Classification"
    },
    {
     "certified": "Château d'Yquem; Know a couple of producers in each category for recommending in service.",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "A by-the-glass serving is usually 2 oz (59.1ml).; Open bottles can typically last for a week if kept cold in the refrigerator.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Match the weight of the dessert and the wine. The wine should be sweeter than the dessert being paired.; Contrast sweet wines to fatty and salty foods such as foie gras and blue cheese.; Really old wines become drier over time.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    },
    {
     "certified": "Many of these wines are bottled in clear bottles.; They can age for a very long time but should be kept out of direct light.; Full-sized bottles age better than half bottles.; Tokaji is often bottled in 500ml bottles, cost by the glass correctly.",
     "intro": "",
     "topic": "Business of the Sommelier"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "FORTIFIED WINES",
   "group": "styles",
   "id": "fortified-wines",
   "map": {
    "cats": {
     "certified": [
      "Fortified Wines"
     ],
     "intro": [
      "Sparkling/Fortified/Sweet"
     ]
    },
    "chapters": {
     "certified": [
      "Fortified Wines"
     ],
     "intro": [
      "fortified"
     ]
    },
    "countries": [
     "south-africa"
    ],
    "grapes": [
     "Touriga Nacional",
     "Palomino",
     "Grenache / Garnacha",
     "Muscat Blanc"
    ],
    "regions": [
     "douro",
     "madeira",
     "jerez",
     "sicily",
     "languedoc-roussillon",
     "rhone",
     "rutherglen"
    ],
    "serviceRef": [
     "decanting",
     "temperatures",
     "digestifs",
     "aperitifs",
     "glassware"
    ],
    "techniques": [
     "port-fortification",
     "solera-and-flor",
     "madeira-estufagem-canteiro",
     "vin-doux-naturel",
     "oxidative-rancio"
    ]
   },
   "name": "Fortified Wines",
   "order": 39,
   "outcome": {
    "certified": "After studying this section, a candidate will understand the unique winemaking techniques used to make fortified wines. Certified Sommeliers will know iconic producers and be able to recommend and sell food pairings with fortified wines to a guest.",
    "intro": "After studying this section, a student will be able to identify major fortified wines, their styles, and the grape varieties typically used in their production."
   },
   "pages": [
    81,
    82
   ],
   "questions": [
    {
     "a": 2,
     "exp": "The Court files Madeira as hot subtropical, Sherry as hot maritime and Port as warm to hot Mediterranean. Madeira is a mountainous Atlantic island off North Africa, its vines on steep terraced hillsides of volcanic soil in humid warmth.",
     "id": "e-rrnm35w0",
     "opts": [
      "Hot maritime",
      "Cool maritime",
      "Hot subtropical",
      "Warm to hot Mediterranean"
     ],
     "q": "Which climate category does the Court give the island of Madeira?",
     "row": "Geography: Climate Categories"
    },
    {
     "a": 0,
     "exp": "A quinta is a farm or wine estate in the Douro, so a Single Quinta Vintage Port comes from one property, often bottled in a good year the house does not declare. Harvest is colheita, the word for a single harvest tawny, while Late Bottled Vintage and most Vintage Port blend wine from several quintas.",
     "id": "e-1rykgo57",
     "opts": [
      "Estate",
      "Harvest",
      "Cellar",
      "Terrace"
     ],
     "q": "On the label of a Single Quinta Port, what does the Portuguese word quinta mean?",
     "row": "Label Terms"
    },
    {
     "a": 1,
     "exp": "Oloroso is fortified to about 17 per cent, too strong for flor to grow, so it ages in contact with air from the start and turns dark, nutty and dry. Fino and Manzanilla age under flor throughout and Amontillado begins under flor; the Court files Oloroso and Cream Sherry as its oxidative styles.",
     "id": "e-dz069778",
     "opts": [
      "Manzanilla",
      "Oloroso",
      "Fino",
      "Amontillado"
     ],
     "q": "Which Sherry style is aged wholly by oxidation, with no flor at any stage?",
     "row": "Style - Sherry"
    },
    {
     "a": 3,
     "exp": "Madeira has been heated and oxidised on purpose, so an opened bottle keeps for months with little change. Fino and Manzanilla fade within days like a white wine, and an opened Vintage Port is best drunk within a few days; the Court asks the shelf life of each once opened.",
     "id": "e-64awc81l",
     "opts": [
      "Vintage Port",
      "Fino Sherry",
      "Manzanilla",
      "Madeira"
     ],
     "q": "Of these fortified wines, which keeps longest once opened?",
     "row": "Business of the Sommelier"
    },
    {
     "accept": [
      "criadera",
      "criaderas",
      "a criadera",
      "the criaderas",
      "scale",
      "scales",
      "escala",
      "escalas"
     ],
     "ans": "Criadera",
     "exp": "A solera stacks butts by age: wine for bottling is drawn from the oldest row, the solera, and each loss is refilled from the next youngest tier, the criaderas or scales, so the young wine is schooled by the old. Running the scales is that drawing down and refilling, and criadera means nursery.",
     "id": "e-ryisr8vh",
     "q": "In a Sherry solera, what is each tier of younger casks above the oldest row called?",
     "row": "Winemaking - Sherry",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "Flor is a film of Saccharomyces cerevisiae strains that grows on wine of about 15 per cent alcohol in part filled butts, feeding on alcohol and glycerol and keeping air away. It gives Fino and Manzanilla their pale colour and bready, saline tang; Botrytis cinerea is noble rot, Aspergillus oryzae the koji mould of sake and Brettanomyces a spoilage yeast.",
     "id": "e-dxb6qix4",
     "opts": [
      "Aspergillus oryzae",
      "Brettanomyces bruxellensis",
      "Saccharomyces cerevisiae",
      "Botrytis cinerea"
     ],
     "q": "Flor, the film that shields a Fino in cask, is made up of strains of which species?",
     "row": "Winemaking - Sherry"
    },
    {
     "accept": [
      "arenas",
      "arena",
      "the arenas",
      "arenas soil"
     ],
     "ans": "Arenas",
     "exp": "The Court names three Sherry soils: albariza, the white chalky soil that holds winter rain and gives the finest Palomino; barros, a darker clay; and arenas, sand near the coast long planted with Moscatel. Albariza ranks highest, while barros and arenas give heavier, coarser wine.",
     "id": "e-l3x02p54",
     "q": "Besides albariza and barros, what is the sandy soil of the Sherry zone called?",
     "row": "Soil: Type and/or Name",
     "sa": 1
    },
    {
     "accept": [
      "funchal"
     ],
     "ans": "Funchal",
     "exp": "Funchal, on the island's sunny south coast, is Madeira's capital and main city, where the shippers' lodges have long aged the wine in their warm upper floors. The island lies in the Atlantic off North Africa, with volcanic soils and steep terraced hillsides.",
     "id": "e-q87o46su",
     "q": "What is the main city of the island of Madeira?",
     "row": "Geography: Appellation - Madeira",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Marsala's sweetness terms are Secco, Semi-Secco and Dolce, the last carrying more than 100 grams of sugar per litre, and they stand beside its colours (Oro, Ambra, Rubino) and its ages (Fine, Superiore, Vergine). Abboccato is a general Italian word for a lightly sweet wine, not one of Marsala's terms.",
     "id": "e-lb7d0k3x",
     "opts": [
      "Secco",
      "Dolce",
      "Abboccato",
      "Semi-Secco"
     ],
     "q": "Which sweetness term on a Marsala label marks the sweetest style?",
     "row": "Style - Marsala"
    },
    {
     "accept": [
      "klein karoo",
      "the klein karoo",
      "little karoo",
      "the little karoo"
     ],
     "ans": "Klein Karoo",
     "exp": "The Klein Karoo is a dry inland region of the Western Cape, behind the coastal mountains, known for fortified Muscadel from Muscat de Frontignan, the Muscat à Petits Grains. The Court pairs it with Rutherglen in Victoria as the fortified Muscats beyond Europe.",
     "grapes": [
      "Muscat Blanc"
     ],
     "id": "e-mp4x2rcn",
     "q": "Which South African region does the Court name for fortified Muscat made from Muscat de Frontignan?",
     "row": "Geography: Appellations - Other",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "An aged Tawny Port has spent years in cask, so its sweetness carries walnut, caramel and dried fig that echo the pie and stand up to its sugar. Fino, Manzanilla and Sercial are dry, better with salted almonds, olives and seafood; the Court asks how sweetness, age and oxidation steer a fortified pairing.",
     "id": "e-i5h6ri9e",
     "opts": [
      "Sercial Madeira",
      "Manzanilla",
      "Fino Sherry",
      "Aged Tawny Port"
     ],
     "q": "Which fortified wine best suits a pecan pie, with its sugar, caramel and toasted nuts?",
     "row": "Food and Beverage Pairing"
    }
   ],
   "rows": [
    {
     "certified": "Be able to identify major regions on a map.",
     "intro": "",
     "topic": "Geography: Location"
    },
    {
     "certified": "Subregions: Cima Corgo, Baixo Corgo, Douro Superior",
     "intro": "Same geographical area as Douro DOP, Portugal.",
     "topic": "Geography: Appellation - Port"
    },
    {
     "certified": "Funchal is the main city on the island Madeira.",
     "intro": "Island located near North Africa",
     "topic": "Geography: Appellation - Madeira"
    },
    {
     "certified": "Jerez-Xérès-Sherry, Sanlúcar de Barrameda on the coast.",
     "intro": "Southwest Spain",
     "topic": "Geography: Appellation - Sherry"
    },
    {
     "certified": "Marsala DOC",
     "intro": "Sicily, Italy",
     "topic": "Geography: Appellation - Marsala"
    },
    {
     "certified": "",
     "intro": "Roussillon: Banyuls AOP; Southern Rhône: Muscat de Beaumes-de-Venise AOP",
     "topic": "Geography: Appellation - French Fortified Wines"
    },
    {
     "certified": "Australia: Rutherglen, Victoria; South Africa: Klein Karoo, Western Cape",
     "intro": "",
     "topic": "Geography: Appellations - Other"
    },
    {
     "certified": "Madeira: Hot Subtropical; Sherry: Hot Maritime; Port: Warm to hot Mediterranean",
     "intro": "",
     "topic": "Geography: Climate Categories"
    },
    {
     "certified": "Madeira: Mountainous hillside; Sherry: Close proximity to the Atlantic; Port: Mountainous hillside",
     "intro": "",
     "topic": "Geography: Physical Feature"
    },
    {
     "certified": "Sherry: Barros (clay), Arenas (sand)",
     "intro": "Port: Schist; Madeira: Volcanic; Sherry: Albariza (chalk)",
     "topic": "Soil: Type and/or Name"
    },
    {
     "certified": "",
     "intro": "Fortified during fermentation.",
     "topic": "Winemaking - Port"
    },
    {
     "certified": "Know estufagem and canteiro.; Sweeter styles are fortified closer to the beginning of fermentation.",
     "intro": "Fortified during fermentation, oxidized, exposed to heat.",
     "topic": "Winemaking - Madeira"
    },
    {
     "certified": "Flor: Saccharomyces cerevisiae.; Biological aging vs. oxidative aging.; Running the scales of the Solera.",
     "intro": "Fortified after fermentation, oxidized.",
     "topic": "Winemaking - Sherry"
    },
    {
     "certified": "Rutherglen: Muscat; Klein Karoo: Muscat de Frontignan and Muscat à Petits Grains",
     "intro": "Port: Touriga Nacional; Madeira: Sercial, Verdelho, Bual, Malmsey, Tinta Negra; Sherry: Palomino, Moscatel, Pedro Ximénez; Banyuls: Grenache; Muscat de Beaumes-de-Venise: Muscat",
     "topic": "Wine: Grape Variety Names"
    },
    {
     "certified": "Port: Late Bottled Vintage (LBV), Single Quinta, Vintage",
     "intro": "",
     "topic": "Label Terms"
    },
    {
     "certified": "Port: Vila Nova de Gaia",
     "intro": "",
     "topic": "General Terms"
    },
    {
     "certified": "Aged Tawny: Colheita (min 7 years aging)",
     "intro": "Ruby: Basic Ruby, Late Bottled Vintage (LBV), Single Quinta, Vintage; Aged Tawny: 10-year, 20-year, 30-year, 40-year",
     "topic": "Style - Port"
    },
    {
     "certified": "",
     "intro": "In order of driest to sweetest style: Sercial, Verdelho, Bual, Malmsey",
     "topic": "Style - Madeira"
    },
    {
     "certified": "Biological: Manzanilla, Fino, Amontillado, Palo Cortado; Oxidative: Oloroso, Cream Sherry",
     "intro": "Biological aging vs. Oxidative aging",
     "topic": "Style - Sherry"
    },
    {
     "certified": "Secco, Semi-Secco, Dolce",
     "intro": "",
     "topic": "Style - Marsala"
    },
    {
     "certified": "Understand vintage Port is only made in the best vintages.",
     "intro": "",
     "topic": "Vintage"
    },
    {
     "certified": "Old Vintage and Single Quinta Ports require decanting for sediment.; By-the-glass pours are typically 2 oz (51.9 ml).; Refer to the CMS Hospitality and Service Standards for proper service temperatures.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Understand how sweetness, age, and amount of oxidation can affect a pairing with these wines.",
     "intro": "",
     "topic": "Food and Beverage Pairing"
    },
    {
     "certified": "Know general shelf life of the wine after opening.",
     "intro": "",
     "topic": "Business of the Sommelier"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "BEER",
   "group": "beyond-wine",
   "id": "beer",
   "map": {
    "cats": {
     "certified": [
      "Beer & Cider"
     ],
     "intro": [
      "Beer"
     ]
    },
    "chapters": {
     "certified": [
      "Beer & Cider"
     ],
     "intro": [
      "beer"
     ]
    },
    "countries": [],
    "grapes": [],
    "regions": [],
    "serviceRef": [
     "glassware",
     "temperatures"
    ],
    "techniques": []
   },
   "name": "Beer",
   "order": 40,
   "outcome": {
    "certified": "A Certified Sommelier will be able recommend producers of specific styles of beer to a guest, choose the appropriate glass for specific beers, and be able to accurately answer beer costing scenarios.",
    "intro": "After studying this section, a student will know what beer is, its primary ingredients and what they contribute to a beer, the difference between an ale and lager, and examples of each."
   },
   "pages": [
    83,
    84,
    85
   ],
   "questions": [
    {
     "a": 2,
     "exp": "Lager yeast is Saccharomyces pastorianus, which the Court sets cool and slow at 48 to 55°F (9 to 13°C); ale yeast is Saccharomyces cerevisiae, warm and fast. Saccharomyces bayanus is a wine yeast often used for sparkling wine, and Brettanomyces a wild yeast of lambic and some sour beers.",
     "id": "e-aiz19gg2",
     "opts": [
      "Brettanomyces bruxellensis",
      "Saccharomyces cerevisiae",
      "Saccharomyces pastorianus",
      "Saccharomyces bayanus"
     ],
     "q": "A brewer pitches a bottom-fermenting yeast for a cool, slow, clean ferment. Which species does the Court name for it?",
     "row": "Ingredients"
    },
    {
     "a": 0,
     "exp": "The Court places ale fermentation at 68 to 72°F (20 to 22°C), where top fermenting Saccharomyces cerevisiae throws fruity, spicy esters. Lager ferments cool and slow at 48 to 55°F (9 to 13°C), and the near freezing rest that follows it is lagering.",
     "id": "e-u3ut4m5p",
     "opts": [
      "20 to 22°C (68 to 72°F)",
      "2 to 4°C (36 to 39°F)",
      "9 to 13°C (48 to 55°F)",
      "30 to 32°C (86 to 90°F)"
     ],
     "q": "Ale yeast ferments warm and fast. At what temperature does the Court place that fermentation?",
     "row": "Ingredients"
    },
    {
     "a": 1,
     "exp": "The Court's American hops are Cascade, Centennial and Citra, bred for grapefruit, pine and tropical fruit. Saaz, Hallertau and Tettnang are its European hops, the spicy, herbal noble varieties of Bohemia and southern Germany.",
     "id": "e-skvxk5um",
     "opts": [
      "Tettnang",
      "Citra",
      "Saaz",
      "Hallertau"
     ],
     "q": "Cascade and Centennial are two of the Court's three American hop varieties. Which is the third?",
     "row": "Ingredients"
    },
    {
     "accept": [
      "mesopotamia",
      "ancient mesopotamia",
      "sumer",
      "sumeria"
     ],
     "ans": "Mesopotamia",
     "exp": "The Court opens beer's history in Mesopotamia, the land between the Tigris and the Euphrates, where people who had lived by hunting and gathering settled to farm and grew grain for bread and beer. Its wider point is that each classic style belongs to a particular time and place.",
     "id": "e-0voj23w3",
     "q": "In which ancient land, says the Court's history of beer, did nomadic peoples settle down to farm and grow grain for both bread and beer?",
     "row": "History & Lore",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The tall weizen glass, narrow at the foot and swelling towards the rim, holds the big, fluffy head of a Hefeweizen and shows off its haze. The Court's other named glasses are the pint, the mug, the tulip and the tall, tapered pilsner.",
     "id": "e-ywkkiv0d",
     "opts": [
      "Tulip",
      "Mug",
      "Pilsner",
      "Weizen"
     ],
     "q": "Which of the Court's named beer glasses is the traditional pour for a cloudy Bavarian wheat beer?",
     "row": "Service of Beverage"
    },
    {
     "a": 2,
     "exp": "The tulip's rounded bowl and flared lip hold a generous head and gather aroma, so it suits strong Belgian ales and aromatic IPAs. The Court asks a candidate to recognise the name and shape of the pint, mug, tulip, pilsner and weizen glass, each polished clean.",
     "id": "e-scao5zim",
     "opts": [
      "Pilsner",
      "Pint",
      "Tulip",
      "Mug"
     ],
     "q": "Which of the Court's beer glasses has a rounded bowl that narrows and then flares out at the lip, holding the head and gathering aroma?",
     "row": "Service of Beverage"
    },
    {
     "accept": [
      "carbonation",
      "bubbles",
      "the bubbles",
      "carbon dioxide",
      "co2",
      "fizz",
      "effervescence"
     ],
     "ans": "Carbonation",
     "exp": "Carbonation completes the Court's four principles. The bubbles scrub fat and salt from the palate, which is why a crisp lager or a saison flatters fried food and rich cheese, while the modest alcohol keeps beer from swamping a dish.",
     "id": "e-sx0exda5",
     "q": "The Court names four principles for pairing beer with food: sweetness from malt, bitterness from hops and a generally low alcohol are three. What is the fourth?",
     "row": "Food and Beer Pairing",
     "sa": 1
    },
    {
     "accept": [
      "2",
      "two",
      "2 kegs",
      "two kegs",
      "two quarter barrels",
      "2 quarter barrels"
     ],
     "ans": "Two kegs",
     "exp": "Work it in the Court's three steps: 40 per cent of 200 guests is 80 pints; 80 pints at 16 ounces is 1,280 ounces; and 1,280 divided by the 992 ounces in a quarter barrel is about 1.3, so two kegs must be ordered, since part of a keg cannot be bought.",
     "id": "e-cyzhf41h",
     "q": "A private dining event expects 200 guests, and 40 per cent of them will order one 16 ounce pint of a beer sold only in quarter barrel kegs of 992 ounces (29.3 litres). How many quarter barrel kegs must be ordered?",
     "row": "Business of the Sommelier",
     "sa": 1
    },
    {
     "accept": [
      "international bitterness units",
      "international bitterness unit",
      "international bittering units",
      "international bittering unit"
     ],
     "ans": "International Bitterness Units",
     "exp": "IBU stands for International Bitterness Units, a laboratory measure of dissolved hop acids: the higher the figure, the more bitter the beer, though malt sweetness can mask a high reading. ABV, the other figure on the Court's list, is alcohol by volume.",
     "id": "e-ml4q6bsz",
     "q": "Craft beer spec sheets print a bitterness figure under the letters IBU. What do those three letters stand for?",
     "row": "Label Terms / General Terms",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "Guinness is the benchmark Irish Dry Stout, black from roasted barley yet light in body and alcohol, and poured on a nitrogen mix for its creamy head. The Court asks a candidate to name at least two producers for each of its ten styles, from European Pale Lager to Sour Beer.",
     "id": "e-9lmyc0c4",
     "opts": [
      "American Pale Ale",
      "Irish Dry Stout",
      "Hefeweizen",
      "Witbier"
     ],
     "q": "Brewed in Dublin since 1759, Guinness is a producer a sommelier can name for which of the Court's beer styles?",
     "row": "Producer/Proprietary Brand"
    },
    {
     "a": 0,
     "exp": "Mashing is the first of the Court's two Certified production steps: the enzymes woken by germination convert starch to sugar, and the sweet liquid drawn off is the wort. Boiling follows, sterilising the wort and drawing bitterness from the hops; kilning belongs to malting, and lagering comes after fermentation.",
     "id": "e-72zq5wou",
     "opts": [
      "Mashing",
      "Boiling",
      "Kilning",
      "Lagering"
     ],
     "q": "Crushed malt rests in water at about 65°C while its own enzymes turn starch into fermentable sugar. Which of the Court's production steps is that?",
     "row": "Process of Production"
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Definition: A fermented beverage from cereal grains (mainly barley), water, hops, and yeast.",
     "topic": "Non-Wine Production: Beer"
    },
    {
     "certified": "GRAINS/MALT; Germination: The process where grain kernels (seeds) produce enzymes that will turn starches into sugar for fermentation to occur. This creates malt.; Kilning: The heating of germinated barley to dry it and develop flavor and color. The length of time and the temperature of kilning will determine the color and flavor of the malt and the eventual beer.; YEAST: Ales: Saccharomyces cerevisiae; Warm and fast fermentation (68-72°F or 20-22°C); Lagers: Saccharomyces pastorianus; Cool and slow fermentation (48-55°F or 9-13°C); HOPS: Common hop variety names; American Hops: Cascade, Centennial, Citra; European Hops: Hallertau, Saaz, Tettnang; WATER: An important consideration for the style of beer that is produced is due to the unique mineral and ion content of various local water sources.",
     "intro": "GRAINS/MALT: Grains for making beer- mainly barley plus other grains such as rice, corn, wheat, and oats. Grains must have their starch reserves converted to sugar for fermentation to occur.; Malt provides beer with sugar for fermentation to create alcohol, plus color, flavor, body, texture, and mouthfeel.; YEAST: Yeast consumes the sugars from the malt to create alcohol for fermentation to occur.; Yeast can also provide aromas and flavors to beer.; The type of yeast used determines if a beer is an ale or a lager: Ales: Top-fermenting yeasts produce ales. Creates more aromas such as fruit and spices.; Lagers: Bottom-fermenting yeasts, clean and crisp, less effect on the aroma and flavor profile of the final beer.; HOPS: The flowering cone of hop vine plant. Hops provide beer with aroma, flavor, and bitterness to balance and contrast malt sweetness. Hops act as a natural preservative with antibacterial properties. Many different varieties of hops produce a wide range of flavors and aromas.; WATER: 90%+ of beer content, clean water is essential to the brewing process.",
     "topic": "Ingredients"
    },
    {
     "certified": "Mashing; Boiling",
     "intro": "Germination; Malting; Fermentation",
     "topic": "Process of Production"
    },
    {
     "certified": "Lagering; ABV: Alcohol by volume, an ABV of 6% means a beer contains 6% alcohol.; IBU: International Bitterness Unit, the higher the IBUs means a more bitter beer.",
     "intro": "Ale; Lager",
     "topic": "Label Terms / General Terms"
    },
    {
     "certified": "",
     "intro": "Ale Examples: Germany: Hefeweizen; Britain: Pale Ale, India Pale Ale (IPA), Porter; Ireland: Irish Dry Stout; Belgium: Lambic, Wit or White Ale; Lager Examples; General: American Lager, European Lager; Czech Republic: Pilsner (origin of the Pilsner beer); Germany: Pilsner (Pils), Bock, Doppelbock, Oktoberfest",
     "topic": "Styles/Categories"
    },
    {
     "certified": "Producer Examples: Research and be able to recall at least two producers of common styles of beer.; Examples: European Pale Lager; American Pale Lager; Pilsner; American IPA; American Pale Ale; American or British Porter; Irish Dry Stout; Hefeweizen; Witbier; Sour Beer",
     "intro": "",
     "topic": "Producer/Proprietary Brand"
    },
    {
     "certified": "Mesopotamia: Nomadic hunter-gatherers began to settle down to farm and grow crops to make bread and beer. Beer styles are a window into time and place. Classic styles were created during very specific times in history.",
     "intro": "Beer is one of the oldest alcoholic beverages.",
     "topic": "History & Lore"
    },
    {
     "certified": "Glassware must be clean polished; As with wine, many styles of beer have specific and appropriate glassware for service.; Recognize the name and shape of common beer glassware; Pint; Mug; Tulip; Pilsner; Weizen",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "An incredibly flexible beverage with food because of the vast arrays of possibilities with a few simple ingredients.; Understand common food and beer pairing principles: Sweetness from malt; Bitterness from hops; Generally low alcohol content; Carbonation or bubbles",
     "intro": "",
     "topic": "Food and Beer Pairing"
    },
    {
     "certified": "First In First Out (FIFO) for restocking.; Beer Containers: Bottle; Can; Keg (many sizes and shapes exist); Costing Beer; Example: A private dining event wants to order enough kegs of a specific beer to serve on tap for a special event.; There are 200 people attending.; They estimate 40 percent of customers order one pint each. One pint = 16 ounces; The beer is only offered in Quarter Barrel kegs; a Quarter Barrel keg = 29.3 litres/ 992 ounces; How many guests order a glass of this beer?; How many total ml/ounces will you need to pour throughout the evening?; How many Quarter kegs must you order to ensure demand is met?",
     "intro": "",
     "topic": "Business of the Sommelier"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SAKE",
   "group": "beyond-wine",
   "id": "sake",
   "map": {
    "cats": {
     "certified": [
      "Sake"
     ],
     "intro": [
      "Sake & Spirits"
     ]
    },
    "chapters": {
     "certified": [
      "Sake"
     ],
     "intro": [
      "sake"
     ]
    },
    "countries": [],
    "grapes": [],
    "regions": [],
    "serviceRef": [
     "temperatures",
     "glassware"
    ],
    "techniques": []
   },
   "name": "Sake",
   "order": 41,
   "outcome": {
    "certified": "After studying this section, a candidate will increase their knowledge of sake, sake styles, and polishing levels. A Certified Sommelier will be able to sell and recommend food pairings with sake to a guest.",
    "intro": "After studying this section, a student will know what sake is, where it's from, its main ingredients, and the basics of how it is made. A student will learn a quality classification exists and will be able to recognize quality categories."
   },
   "pages": [
    86,
    87
   ],
   "questions": [
    {
     "accept": [
      "720",
      "720 ml",
      "720ml",
      "720 millilitres",
      "72 cl",
      "seven hundred and twenty",
      "seven hundred twenty"
     ],
     "ans": "720 ml",
     "exp": "The Court's sake sizes are 300 ml, 720 ml and 1.8 litres. The 1.8 litre bottle, the isshobin, holds ten go of about 180 ml each, and 720 ml is four go; neither matches the wine trade's 750 ml, so a list should state the size beside the price.",
     "id": "e-oai5mzpr",
     "q": "The Court lists three sake bottle sizes. Besides the small 300 ml bottle and the large 1.8 litre bottle, what is the third?",
     "row": "Business of the Sommelier",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Court notes that kimoto and yamahai carry much more umami, which suits bigger, richer meats such as braised short rib. A delicate daiginjo would be lost beside it, nigori is often creamy and gently sweet, and namazake signals a fresh, unpasteurised sake rather than weight.",
     "id": "e-ujesb6d3",
     "opts": [
      "Daiginjo",
      "Namazake",
      "Nigori",
      "Yamahai"
     ],
     "q": "A guest orders braised short rib and asks for a sake to drink with it. Which style does the Court's pairing line point to?",
     "row": "Food and SAKE Pairing"
    },
    {
     "accept": [
      "70",
      "70%",
      "70 per cent",
      "70 percent",
      "seventy",
      "seventy per cent",
      "seventy percent"
     ],
     "ans": "70 per cent",
     "exp": "The Court's polishing table gives honjozo 70 per cent: at least 30 per cent of each grain is milled away, and a measured dose of brewer's alcohol is added. Ginjo sits at 60 per cent and daiginjo at 50, with the junmai versions at the same figures and no alcohol added.",
     "id": "e-g5o92t0o",
     "q": "A honjozo label must show a polishing ratio no higher than which figure?",
     "row": "Label Terms / General Terms/ Classification",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The Sake Meter Value reads the density of the sake against water: the higher the number, the drier the sake, and the Court prints a range of minus 15 to plus 15. Acidity changes how dry a sake tastes, so two bottles with the same reading can still differ at the table.",
     "id": "e-01uei9ik",
     "opts": [
      "Minus 15 to plus 15",
      "Minus 5 to plus 5",
      "Zero to plus 30",
      "Minus 50 to plus 50"
     ],
     "q": "Across what range does the Court say the Sake Meter Value runs?",
     "row": "Label Terms / General Terms/ Classification"
    },
    {
     "a": 2,
     "exp": "Kimoto and yamahai let lactic bacteria from the brewery build the starter's acidity slowly, where the modern sokujo method adds lactic acid from a bottle. The Court calls the result gamey; the Codex describes the same styles as savoury, high in acidity and rich in umami.",
     "id": "e-v60gzbfc",
     "opts": [
      "Smoky",
      "Fruity",
      "Gamey",
      "Floral"
     ],
     "q": "Kimoto and yamahai starters take no added lactic acid. What kind of flavour does the Court say results?",
     "row": "Styles"
    },
    {
     "a": 3,
     "exp": "The Court serves ginjo and daiginjo chilled, since warmth flattens the perfume their slow, cool ferment built, while the lower polishing grades, yamahai and kimoto may go out chilled or warm. Gentle warming brings up the body and umami of a sturdy kimoto.",
     "id": "e-2vuafvms",
     "opts": [
      "Junmai Daiginjo",
      "Daiginjo",
      "Ginjo",
      "Kimoto"
     ],
     "q": "Which of these sakes does the Court say may be served either chilled or warm?",
     "row": "Service of Beverage"
    },
    {
     "a": 1,
     "exp": "Junmai Daiginjo keeps at most 50 per cent of each grain, the same figure as daiginjo, but adds no brewer's alcohol. Junmai Ginjo stops at 60 per cent and honjozo at 70; a figure of 40 per cent or lower on a label is a brewery's own choice, not a separate legal grade.",
     "id": "e-izfmd5l3",
     "opts": [
      "40 per cent",
      "50 per cent",
      "60 per cent",
      "70 per cent"
     ],
     "q": "In the Court's polishing table, what is the most a Junmai Daiginjo may keep of each rice grain?",
     "row": "Label Terms / General Terms/ Classification"
    },
    {
     "accept": [
      "cloudy",
      "cloudy sake",
      "it is cloudy",
      "milky",
      "hazy",
      "coarsely filtered",
      "roughly filtered",
      "opaque"
     ],
     "ans": "It is cloudy",
     "exp": "Nigori means cloudy sake: the mash is pressed through a coarse mesh so fine rice solids stay in the bottle, and it is often creamy and gently sweet, so the bottle is turned gently before pouring. The Court's other style terms are namazake, unpasteurised, and kimoto and yamahai.",
     "id": "e-i7yqfrt1",
     "q": "On a sake list, what does the Court's style word nigori tell a guest about the sake in the bottle?",
     "row": "Styles",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Sake is a fermented beverage made from rice.; The majority of Sake production comes from Japan.",
     "topic": "Non-Wine Production: Sake"
    },
    {
     "certified": "Rice: Unique flavors depending on rice variety, high starch content.; Koji-kin = Aspergillus oryzae; Parallel Fermentation",
     "intro": "Rice: Special varieties used for sake (not table rice).; Koji-kin: A special mold native to Asia that converts starches in rice to sugar for fermentation. It is sprinkled over steamed rice.; Yeast: Converts sugar into alcohol after the koji converts the starch to sugar.; Ferments the sake and creates alcohol.; Sake is typically 15-22% abv.; Diverse yeast strains provide unique aromas and flavors.; Water: Important component of final flavor. Each sake distillery has its own unique water source.; Brewer's Alcohol: Added to some styles and not others.",
     "topic": "Ingredients"
    },
    {
     "certified": "Nigori: Cloudy Sake; Namazake: Unpasteurized Sake; Kimoto and Yamahai: No lactic acid added resulting in a gamey flavor.",
     "intro": "",
     "topic": "Styles"
    },
    {
     "certified": "Sake has a classification system for the premium production based on rice polishing.; Minimum % of rice grain remaining; Daiginjo: 50%; Ginjo: 60%; Honjozo: 70%; No Alcohol Added; Junmai Daiginjo: 50%; Junmai Ginjo: 60%; Sake Meter Value (SMV): The higher the number, the drier the sake. Range of -15 to +15.; Tokubetsu: Special Sake Category",
     "intro": "Sake has a classification system for the premium production. Recognize: Junmai, Honjozo, Ginjo, Daiginjo as being part of that classification; Junmai = no alcohol added",
     "topic": "Label Terms / General Terms/ Classification"
    },
    {
     "certified": "Ginjo and Daiginjo best served chilled. Lower polishing levels, Yamahai and Kimoto can be served chilled or warm.",
     "intro": "",
     "topic": "Service of Beverage"
    },
    {
     "certified": "Kimoto and Yamahai have much more umami for pairing with bigger richer meats.",
     "intro": "",
     "topic": "Food and SAKE Pairing"
    },
    {
     "certified": "Sake bottle sizes: 300ml / 720ml / 1.8L",
     "intro": "",
     "topic": "Business of the Sommelier"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "SPIRITS & LIQUEURS",
   "group": "beyond-wine",
   "id": "spirits-liqueurs",
   "map": {
    "cats": {
     "certified": [
      "Spirits & Cocktails"
     ],
     "intro": [
      "Sake & Spirits"
     ]
    },
    "chapters": {
     "certified": [
      "Spirits & Cocktails"
     ],
     "intro": [
      "spirits"
     ]
    },
    "countries": [],
    "grapes": [],
    "regions": [],
    "serviceRef": [
     "spirits",
     "digestifs"
    ],
    "techniques": []
   },
   "name": "Spirits and Liqueurs",
   "order": 42,
   "outcome": {
    "certified": "After studying this section, a candidate will gain a deeper knowledge in spirits and liqueurs of the world by understand the region, styles, raw materials, aging requirements, and the general production process. A Certified Sommelier will be able to recommend spirits and liqueurs to guests and will know the base spirits, mixers, and garnishes for selected cocktails.",
    "intro": "After studying this section, a student will learn basics of spirit and liqueur production including the base ingredients, flavors, and location of production for important spirits of the world."
   },
   "pages": [
    88,
    89,
    90,
    91
   ],
   "questions": [
    {
     "a": 1,
     "exp": "Mount Gay is one of the Court's rum producers, beside Myers's, Bacardi, Captain Morgan, Diplomático, Goslings and Havana Club. Tanqueray and Beefeater are on its gin list and Absolut on its vodka list.",
     "id": "e-v1mog5j5",
     "opts": [
      "Tanqueray",
      "Mount Gay",
      "Beefeater",
      "Absolut"
     ],
     "q": "Which of these producers does the Court list under rum?",
     "row": "CLEAR SPIRITS: Producers"
    },
    {
     "accept": [
      "mezcal",
      "mescal"
     ],
     "ans": "Mezcal",
     "exp": "Bozal, Del Maguey and Wahaka are the Court's mezcal producers; its tequila list runs from Jose Cuervo, Herradura and Sauza to El Jimador, 1800 and Hornitos. Mezcal's agave is roasted in earth pits, which gives the spirit its smoke.",
     "id": "e-btx98iu9",
     "q": "Bozal, Del Maguey and Wahaka are the Court's producers of which agave spirit?",
     "row": "AGAVE-BASED SPIRITS: Producers",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "Lagavulin is on the Court's Islay list with Laphroaig, Ardbeg, Bowmore and Caol Ila, the island the Court calls the smokiest region. Glenkinchie is a Lowland distillery, Glenmorangie a Highland one, and The Glenlivet stands in Speyside.",
     "id": "e-nyvehxwn",
     "opts": [
      "Glenmorangie",
      "The Glenlivet",
      "Glenkinchie",
      "Lagavulin"
     ],
     "q": "Which distillery on the Court's list stands on Islay?",
     "row": "Whisk(e)y: Producers"
    },
    {
     "a": 2,
     "exp": "Larressingle, Delord and Montal are the Court's Armagnac houses; Martell, Courvoisier, Rémy Martin and Hennessy are its Cognac houses. Armagnac is mostly distilled once in a column still of its own design, Cognac twice in a pot still.",
     "id": "e-h8dqhfz8",
     "opts": [
      "Courvoisier",
      "Rémy Martin",
      "Larressingle",
      "Martell"
     ],
     "q": "Which of these houses does the Court list as an Armagnac producer?",
     "row": "BRANDY: Producers"
    },
    {
     "a": 2,
     "exp": "St. Germain is a French elderflower liqueur, floral and sweet. The Court files Bénédictine, Chartreuse and Frangelico under herb and nut, Sambuca and Ouzo under anise, and Kahlúa and Tia Maria under coffee.",
     "id": "e-wddzk8q0",
     "opts": [
      "Herb and nut",
      "Coffee",
      "Elderflower",
      "Anise"
     ],
     "q": "In the Court's list of liqueurs and cordials, St. Germain is filed under which flavour?",
     "row": "LIQUEURS AND CORDIALS: Producers"
    },
    {
     "accept": [
      "spiced",
      "spiced rum"
     ],
     "ans": "Spiced",
     "exp": "Spiced rum is flavoured after distillation with vanilla, cinnamon, clove and the like, and the Court names Captain Morgan as its example. Light, dark and aged complete the Court's four rum styles, all made from sugarcane or molasses.",
     "id": "e-i9ep0s89",
     "q": "Which of the Court's four rum styles is flavoured after distillation with vanilla, cinnamon and clove, Captain Morgan being its example?",
     "row": "CLEAR SPIRITS: Styles/Age Requirements",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Court gives Oaxaca for mezcal and Jalisco for tequila. Mezcal's denomination reaches into several other states, but Oaxaca is its heart; Sonora makes bacanora under a denomination of its own, and Chihuahua is the home of sotol.",
     "id": "e-oijr4q44",
     "opts": [
      "Jalisco",
      "Sonora",
      "Chihuahua",
      "Oaxaca"
     ],
     "q": "Which Mexican state does the Court give as the region of origin for mezcal?",
     "row": "AGAVE-BASED SPIRITS: Region Of Origin"
    },
    {
     "a": 1,
     "exp": "The Court names Blanco as the most common mezcal, then Reposado and Añejo, the same ageing words as tequila; the Codex's service table calls the unaged class Joven. Extra Añejo, over three years in oak, belongs to tequila's ladder, not mezcal's.",
     "id": "e-x9wh00bt",
     "opts": [
      "Reposado",
      "Blanco",
      "Añejo",
      "Extra Añejo"
     ],
     "q": "Which age class does the Court call the most common for mezcal?",
     "row": "AGAVE-BASED SPIRITS: Styles/Age Requirements"
    },
    {
     "accept": [
      "3",
      "three",
      "3 years",
      "three years",
      "3 yrs",
      "3 year"
     ],
     "ans": "Three years",
     "exp": "The Court gives Canadian whisky at least three years in oak, made from corn, wheat, rye or barley and typically column distilled. It is often called rye by habit, yet it need not be made from rye at all.",
     "id": "e-m7qfh5jy",
     "q": "What minimum time in oak does the Court give for Canadian whisky?",
     "row": "Whisk(e)y: Styles/Age Requirements",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The Court notes that the Lowlands distil three times, the old Lowland habit shared with Irish whiskey, for a lighter, softer spirit. Auchentoshan, one of the Court's two Lowland names, still triple distils, while most Islay and Speyside malts go through the pot stills twice.",
     "id": "e-q4fpbkno",
     "opts": [
      "Lowland",
      "Speyside",
      "Islay",
      "Campbeltown"
     ],
     "q": "Scotch malt is usually distilled twice in pot stills. Which region does the Court single out for distilling three times?",
     "row": "Whisk(e)y: Type of distillation"
    },
    {
     "a": 0,
     "exp": "Kirsch is cherry eau de vie, framboise raspberry and poire William pear: the Court's three eaux de vie de fruits, French, colourless and generally unaged. Plum gives mirabelle, quetsch and slivovitz.",
     "id": "e-qnesm4og",
     "opts": [
      "Cherry",
      "Raspberry",
      "Pear",
      "Plum"
     ],
     "q": "Kirsch, one of the Court's eaux de vie de fruits, is distilled from which fruit?",
     "row": "BRANDY: Styles/Age Requirements"
    },
    {
     "accept": [
      "the charente",
      "charente",
      "charente river",
      "the charente river",
      "river charente",
      "the river charente"
     ],
     "ans": "The Charente",
     "exp": "The town of Cognac stands on the Charente, which carried its casks down to the Atlantic, and the vineyards spread chiefly over the Charente and Charente-Maritime departments, with Grande Champagne the most prized of the six crus. The rest of the Court's brandy table is French as well (Armagnac, Calvados, the fruit eaux de vie and marc), with grappa the one Italian.",
     "id": "e-2dxbe4wn",
     "q": "Cognac, the first brandy in the Court's table, takes its name from a town in western France. On which river does that town stand?",
     "row": "BRANDY: Region/Country",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "Vodka: Anywhere in the world; Rum: Can be anywhere but traditionally Caribbean; Gin: Anywhere in the world",
     "topic": "CLEAR SPIRITS: Region Of Origin"
    },
    {
     "certified": "",
     "intro": "Rum: Light, Dark, Aged, Spiced; Gin: London Dry",
     "topic": "CLEAR SPIRITS: Styles/Age Requirements"
    },
    {
     "certified": "",
     "intro": "Vodka: Commonly cereal grain but can be anything; Rum: Sugarcane and Molasses; Gin: Neutral Grain",
     "topic": "CLEAR SPIRITS: Raw Material"
    },
    {
     "certified": "",
     "intro": "Vodka: Commonly continuous still; Rum: Continuous or pot still; Gin: Continuous",
     "topic": "CLEAR SPIRITS: Type of distillation"
    },
    {
     "certified": "",
     "intro": "Vodka: Multiple times in continuous still to remove any flavors; Gin: Flavored with botanicals and Juniper berries.",
     "topic": "CLEAR SPIRITS: Distinct process"
    },
    {
     "certified": "Vodka: Tito's, Absolut, Smirnoff, Stolichnaya, Grey Goose, Kettle One, Cîroc, Belvedere; Rum: Myers's, Mount Gay, Bacardi, Captain Morgan (Spiced), Diplomático, Goslings, Havana Club; Gin: Tanqueray, Bombay, Nolet, Beefeater, Hendrick's, Sipsmith",
     "intro": "",
     "red": 1,
     "topic": "CLEAR SPIRITS: Producers"
    },
    {
     "certified": "Tequila: Jalisco; Mezcal: Oaxaca",
     "intro": "Tequila: Mexico; Mezcal: Mexico",
     "red": 1,
     "topic": "AGAVE-BASED SPIRITS: Region Of Origin"
    },
    {
     "certified": "Tequila: Blanco: under 2 months; Reposado: 2 months to 1 year in oak; Añejo: 1 year to 3 years in oak; Mezcal: Blanco (most common), Reposado, Añejo",
     "intro": "",
     "red": 1,
     "topic": "AGAVE-BASED SPIRITS: Styles/Age Requirements"
    },
    {
     "certified": "",
     "intro": "Tequila: Blue Agave; Mezcal: Agave (many varieties)",
     "topic": "AGAVE-BASED SPIRITS: Raw Material"
    },
    {
     "certified": "",
     "intro": "Tequila: Continuous or pot still; Mezcal: Continuous or pot still",
     "topic": "AGAVE-BASED SPIRITS: Type of distillation"
    },
    {
     "certified": "",
     "intro": "Mezcal: Agave cooked over fire in pits gives a smoky character.",
     "topic": "AGAVE-BASED SPIRITS: Distinct process"
    },
    {
     "certified": "Tequila: Don Julio, Jose Cuervo, Patron, Herradura, Sauza, El Jimador, 1800, Hornitos; Mezcal: Bozal, Del Maguey, Wahaka",
     "intro": "",
     "red": 1,
     "topic": "AGAVE-BASED SPIRITS: Producers"
    },
    {
     "certified": "",
     "intro": "Bourbon: USA (Most are made in Kentucky but not required); Tennessee: Tennessee, USA; Canadian Whisky: Canada; Irish Whiskey: Ireland; Scotch Whisky: Scotland",
     "topic": "Whisk(e)y: Region"
    },
    {
     "certified": "",
     "intro": "Scotch Whisky: Highland, Lowland, Islay (Smokiest), Speyside, Campbeltown; Unheaded column: Blended Scotch",
     "topic": "Whisk(e)y: Subregions"
    },
    {
     "certified": "Canadian Whisky: Min 3 years in oak; Scotch Whisky: Single Malt/Blended; Unheaded column: Blended Scotch",
     "intro": "",
     "red": 1,
     "topic": "Whisk(e)y: Styles/Age Requirements"
    },
    {
     "certified": "",
     "intro": "Bourbon: 51% Corn; Tennessee: 51% Corn; Canadian Whisky: Corn, wheat, rye, or barley; Irish Whiskey: Barley; Scotch Whisky: Barley; Unheaded column: Barley",
     "topic": "Whisk(e)y: Raw Material"
    },
    {
     "certified": "Scotch Whisky: Lowlands is three times",
     "intro": "Canadian Whisky: Typically continuous; Irish Whiskey: Three times in pot still; Scotch Whisky: Two times in pot still; Unheaded column: Three times in pot still",
     "red": 1,
     "topic": "Whisk(e)y: Type of distillation"
    },
    {
     "certified": "",
     "intro": "Bourbon: New, charred, American white oak age; Tennessee: Filtered through maple charcoal; Scotch Whisky: Peat fires dry the barley giving a smoky character",
     "topic": "Whisk(e)y: Distinct process"
    },
    {
     "certified": "Bourbon: Jim Beam, Maker's Mark, Wild Turkey, Bulleit, Buffalo Trace, Woodford Reserve; Tennessee: Jack Daniels, George Dickel; Canadian Whisky: Crown Royal, Pike Creek, Canadian Club; Irish Whiskey: Jameson, Tullamore Dew, Bushmills, Proper Twelve; Scotch Whisky: Highland/Speyside: The Glenlivet, Macallan, Singleton, Glenmorangie.; Lowland: Glenkinchie, Auchentoshan.; Islay: Lagavulin, Laphroig, Ardbeg, Bowmore, Caol Ila; Unheaded column: Johnnie Walker, Ballantine's, Chivas, Grant's, Famous Grouse, J&B, Dewar's",
     "intro": "",
     "red": 1,
     "topic": "Whisk(e)y: Producers"
    },
    {
     "certified": "",
     "intro": "Cognac: Cognac / France; Armagnac: Armagnac / France; Calvados: Calvados / France; Eaux de Vie de Fruits: France; Pomace Brandy: Grappa: Italy; Marc: France",
     "topic": "BRANDY: Region/Country"
    },
    {
     "certified": "Cognac: Grand Champagne, Petite Champagne (Fine Champagne); Armagnac: Haut Armagnac, Bas Armagnac, Ténerèze",
     "intro": "",
     "red": 1,
     "topic": "BRANDY: Subregions"
    },
    {
     "certified": "Cognac: VS/Three Star: 2 years; VSOP: 4 years; XO: 10 years; Armagnac: VS/Three Star: 2 years; VSOP: 4 years; XO: 10 years; Calvados: Min 2 years in oak; Eaux de Vie de Fruits: Framboise, Kirsch, Poire William",
     "intro": "",
     "red": 1,
     "topic": "BRANDY: Styles/Age Requirements"
    },
    {
     "certified": "Cognac: White Grapes: mainly Ugni Blanc; Armagnac: White Grapes: Ugni Blanc, Folle Blanche, Colombard, Baco",
     "intro": "Calvados: Apples, Pears; Eaux de Vie de Fruits: Raspberry, Cherry, Pear",
     "red": 1,
     "topic": "BRANDY: Raw Material"
    },
    {
     "certified": "",
     "intro": "Cognac: Two times in a pot still; Armagnac: One time in a unique continuous still; Calvados: Two times in a pot still. Some use continuous.",
     "topic": "BRANDY: Type of distillation"
    },
    {
     "certified": "",
     "intro": "Cognac: Aged in French oak; Armagnac: Aged in French oak; Calvados: Aged in French oak; Eaux de Vie de Fruits: Generally no aging; Pomace Brandy: Generally no aging",
     "topic": "BRANDY: Distinct process"
    },
    {
     "certified": "Cognac: Hennessey, Rémy Martin, Courvoisier, Martell; Armagnac: Larressingle, Delord, Montal",
     "intro": "",
     "red": 1,
     "topic": "BRANDY: Producers"
    },
    {
     "certified": "",
     "intro": "Herb & Nut: Benedictine, B&B, Pimm's, Chartreuse, Crème de Menthe, Frangelico; Anise: Anisette, Galliano, Ouzo, Sambuca; Fruit: Orange: Triple Sec, Cointreau, Grand Marnier; Apricot: Amaretto; Peaches: Southern Comfort; Cream: Baileys Irish Cream; Whiskey: Drambuie, Glayva, Irish Mist; Other: Elderflower: St. Germain; Ginger: Canton; Coffee: Kahlúa, Tia Maria",
     "topic": "LIQUEURS AND CORDIALS: Producers"
    }
   ]
  },
  {
   "certifiedOnly": true,
   "court": "COCKTAILS",
   "group": "beyond-wine",
   "id": "cocktails",
   "map": {
    "cats": {
     "certified": [
      "Spirits & Cocktails"
     ],
     "intro": []
    },
    "chapters": {
     "certified": [
      "Spirits & Cocktails"
     ],
     "intro": []
    },
    "countries": [],
    "grapes": [],
    "regions": [],
    "serviceRef": [
     "cocktails"
    ],
    "techniques": []
   },
   "name": "Cocktails",
   "order": 43,
   "outcome": {
    "certified": "A CERTIFIED SOMMELIER WILL KNOW THE BASE SPIRITS, MIXERS, AND GARNISHES FOR THE FOLLOWING COCKTAILS",
    "intro": ""
   },
   "pages": [
    92
   ],
   "questions": [
    {
     "accept": [
      "cachaça",
      "cachaca",
      "brazilian cachaca"
     ],
     "ans": "Cachaça",
     "exp": "Cachaça, Brazil's spirit distilled from fresh sugarcane juice, is the base. The Codex builds the drink with half a lime cut in wedges and two teaspoons of sugar muddled in a rocks glass, then the cachaça and crushed ice, and the lime wedges are the garnish.",
     "id": "e-xjatxnbs",
     "q": "What is the base spirit of a Caipirinha, muddled in the glass with lime and sugar?",
     "row": "Caipirinha",
     "sa": 1
    },
    {
     "a": 3,
     "exp": "The Codex's Champagne Cocktail drops the bitters soaked cube into a flute, adds 15 ml of Cognac and tops it slowly with Champagne, with a lemon twist. Older recipes leave the brandy out, so the house spec decides at the bar.",
     "id": "e-3f7rxij4",
     "opts": [
      "Vodka",
      "Gin",
      "White rum",
      "Cognac"
     ],
     "q": "A sugar cube soaked in Angostura bitters sits in the flute of a Champagne Cocktail. Which spirit goes in before the wine?",
     "row": "Champagne Cocktail"
    },
    {
     "a": 0,
     "exp": "Cranberry juice colours the Cosmopolitan: 40 ml citrus vodka, 15 ml Cointreau, 15 ml lime juice and 30 ml cranberry, shaken and strained up into a cocktail glass. The garnish is an orange twist, often flamed, or a lime wheel.",
     "id": "e-gvunsrn5",
     "opts": [
      "Cranberry",
      "Raspberry",
      "Pomegranate",
      "Grapefruit"
     ],
     "q": "Which juice gives a Cosmopolitan its pink colour, shaken with citrus vodka, Cointreau and lime?",
     "row": "Cosmopolitan"
    },
    {
     "a": 1,
     "exp": "The French 75 is 30 ml gin, 15 ml lemon juice and 10 ml sugar syrup shaken, strained into a flute and topped with Champagne, finished with a lemon twist. New Orleans bars often build it on Cognac instead, so ask which the guest expects.",
     "id": "e-z15kypzf",
     "opts": [
      "Vodka",
      "Gin",
      "Pisco",
      "Tequila"
     ],
     "q": "Which spirit is shaken with lemon and sugar syrup, then topped with Champagne, in the Codex's French 75?",
     "row": "French 75"
    },
    {
     "accept": [
      "cocktail onion",
      "cocktail onions",
      "onion",
      "pearl onion",
      "silverskin onion",
      "pickled onion"
     ],
     "ans": "A cocktail onion",
     "exp": "A Gibson is a Dry Martini, gin with a little dry vermouth stirred and strained up, garnished with a cocktail onion in place of the lemon twist or the olive. The base and the mixer stay the same; only the garnish changes the name.",
     "id": "e-94vx4exx",
     "q": "What garnish turns a Dry Martini into a Gibson?",
     "row": "Gibson",
     "sa": 1
    },
    {
     "a": 2,
     "exp": "A Kir Royale is 10 to 15 ml of crème de cassis, the blackcurrant liqueur of Burgundy, topped slowly with Champagne and served without a garnish. Made with Bourgogne Aligoté in place of the Champagne, it is a plain Kir.",
     "id": "e-4fq6v3te",
     "opts": [
      "Crème de pêche",
      "Crème de framboise",
      "Crème de cassis",
      "Crème de mûre"
     ],
     "q": "Which liqueur goes into the flute first for a Kir Royale, before about 100 ml of Champagne is poured over it?",
     "row": "Kir Royale"
    },
    {
     "a": 2,
     "exp": "Orgeat, an almond syrup scented with orange flower water, sweetens the original Mai Tai of 1944, shaken with crushed ice and poured unstrained into a rocks glass. A mint sprig and the spent lime shell are the garnish; the pineapple versions came later.",
     "id": "e-5q9r7s4m",
     "opts": [
      "Grenadine",
      "Passion fruit syrup",
      "Orgeat",
      "Falernum"
     ],
     "q": "Besides aged Jamaican rum, Martinique rhum, orange curaçao and lime, which syrup goes into the 1944 Mai Tai?",
     "row": "Mai Tai"
    },
    {
     "accept": [
      "ginger beer",
      "a ginger beer",
      "spicy ginger beer"
     ],
     "ans": "Ginger beer",
     "exp": "The Moscow Mule is 45 ml vodka and 15 ml lime juice topped with ginger beer, built over ice in a copper mug or a highball. A lime wedge and a mint sprig are the garnish; ginger ale is sweeter and milder and makes a different drink.",
     "id": "e-sbwc2nfq",
     "q": "What tops the vodka and lime of a Moscow Mule, built over ice in a copper mug?",
     "row": "Moscow Mule",
     "sa": 1
    },
    {
     "a": 1,
     "exp": "The Codex's Vesper is 60 ml gin, 20 ml vodka and 10 ml Lillet Blanc, served up in a chilled coupe with a wide lemon twist. The novel asked for it shaken; most houses stir it.",
     "id": "e-ms4wy10n",
     "opts": [
      "Byrrh",
      "Lillet Blanc",
      "Sweet vermouth",
      "Dubonnet Rouge"
     ],
     "q": "Which French aromatised wine joins gin and vodka in a Vesper?",
     "row": "Vesper"
    },
    {
     "a": 0,
     "exp": "The Vieux Carré takes equal parts rye, Cognac and sweet vermouth, a bar spoon of Bénédictine and a dash each of Angostura and Peychaud's, garnished with a lemon twist or a cherry. It was born in the French Quarter of New Orleans in the 1930s.",
     "id": "e-va2esufh",
     "opts": [
      "Bénédictine",
      "Galliano",
      "Chartreuse",
      "Drambuie"
     ],
     "q": "Which herbal liqueur goes by the bar spoon into a Vieux Carré of rye, Cognac and sweet vermouth?",
     "row": "Vieux Carré"
    },
    {
     "a": 3,
     "exp": "A brandied cherry finishes the Manhattan: 60 ml rye, 30 ml sweet vermouth and two dashes of Angostura, stirred and strained up into a coupe. A Dry Manhattan, made with dry vermouth alone, takes a lemon twist instead.",
     "id": "e-pw162b4j",
     "opts": [
      "A lime wheel",
      "A green olive",
      "A cocktail onion",
      "A brandied cherry"
     ],
     "q": "What garnish does the Codex give a classic Manhattan of rye, sweet vermouth and Angostura?",
     "row": "Manhattan"
    },
    {
     "accept": [
      "salt",
      "a salt rim",
      "salt rim",
      "salted rim",
      "half salt rim",
      "coarse salt"
     ],
     "ans": "Salt",
     "exp": "The Margarita's garnish is a lime wheel and a half salt rim, so the guest can drink with or without it. The base is blanco tequila of 100 per cent agave, with lime juice and Cointreau or triple sec, shaken and served up or over ice.",
     "id": "e-6v3u7f42",
     "q": "Besides a lime wheel, what goes on the rim of a Margarita glass, on one side only so the guest can choose?",
     "row": "Margarita",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "",
     "intro": "",
     "topic": "Americano"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Aviation"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Caipirinha"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Champagne Cocktail"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Cosmopolitan"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Daiquiri"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "French 75"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "French Martini"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Gibson"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Gimlet"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Greyhound"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "John Collins"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Kamikaze"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Kir Royale"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Mai Tai"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Manhattan"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Margarita"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Mint Julep"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Mojito"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Moscow Mule"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Negroni"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Old Fashioned"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Pimm's Cup"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Pisco Sour"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Rusty Nail"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Sazerac"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Sea Breeze"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Sidecar"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Tom Collins"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Vesper"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Vieux Carré"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "Whiskey Sour"
    },
    {
     "certified": "",
     "intro": "",
     "topic": "White Russian"
    }
   ]
  },
  {
   "certifiedOnly": false,
   "court": "BUSINESS OF THE SOMMELIER",
   "group": "business",
   "id": "business-of-the-sommelier",
   "map": {
    "cats": {
     "certified": [
      "Business of the Sommelier"
     ],
     "intro": []
    },
    "chapters": {
     "certified": [
      "Business of the Sommelier"
     ],
     "intro": []
    },
    "countries": [],
    "grapes": [],
    "regions": [],
    "serviceRef": [
     "bottles",
     "glassware"
    ],
    "techniques": []
   },
   "name": "Business of the Sommelier",
   "order": 44,
   "outcome": {
    "certified": "After studying this section, a candidate will understand pour sizes, wine bottle sizes, define basic business vocabulary, and be able to do basic beverage costing calculations.",
    "intro": "After studying this section, a student will understand basics of what the sommelier profession entails in both the back and front of the house aspects."
   },
   "pages": [
    93
   ],
   "questions": [
    {
     "a": 1,
     "exp": "A split, also called a piccolo or quarter bottle, holds 187.5 ml, a quarter of the 750 ml standard and about 6.3 US fluid ounces, the single serve of sparkling wine at a reception. The Court lists it with the 1 litre and the jeroboam, 3 litres in Champagne and 5 in Bordeaux today, among the uncommon sizes.",
     "id": "e-n062ppqa",
     "opts": [
      "A half",
      "A quarter",
      "A fifth",
      "A third"
     ],
     "q": "What share of a standard 750 ml bottle does a 187 ml split hold?",
     "row": "Ounces and amounts for regular sized bottles"
    },
    {
     "accept": [
      "33.8",
      "33.8 oz",
      "33.8 ounces",
      "33.8 fl oz",
      "34",
      "34 oz",
      "34 ounces",
      "about 34",
      "thirty four"
     ],
     "ans": "About 33.8 ounces",
     "exp": "A US fluid ounce is about 29.6 ml, so a 1 litre bottle holds about 33.8 ounces, a third more than the 750 ml bottle's 25.4. The Court rounds the standard bottle to 25 oz in its formulas and asks for each size in metric and in standard measure.",
     "id": "e-mj4ood28",
     "q": "About how many US fluid ounces does a 1 litre bottle hold?",
     "row": "Ounces and amounts for regular sized bottles",
     "sa": 1
    },
    {
     "accept": [
      "4",
      "four",
      "4 glasses",
      "four glasses",
      "4 pours",
      "four pours"
     ],
     "ans": "Four glasses",
     "exp": "Divide the bottle by the pour: 25 oz at 6 oz a glass is four full glasses with an ounce left over. At the Court's other sizes a bottle gives about twelve pours of 2 oz, six of 4 oz and five of 5 oz.",
     "id": "e-c22zzwv3",
     "q": "A by the glass pour is set at 6 oz. How many full glasses does a standard bottle of 25 oz give?",
     "row": "Amount of pours from a standard bottle",
     "sa": 1
    },
    {
     "accept": [
      "480",
      "$480",
      "480 dollars",
      "four hundred eighty",
      "four hundred and eighty",
      "four hundred and eighty dollars"
     ],
     "ans": "$480",
     "exp": "The Court defines inventory change as beginning inventory minus ending inventory: $2,640 less $2,160 is $480. Add the month's purchases and that figure becomes the cost of goods sold, the cost side of every beverage cost percentage.",
     "id": "e-l36ep5a6",
     "q": "A wine room counts $2,640 of stock at cost on the first of the month and $2,160 at the close. What is the inventory change?",
     "row": "Terms",
     "sa": 1
    },
    {
     "accept": [
      "9",
      "nine",
      "9 litres",
      "nine litres",
      "9 l",
      "9l",
      "9 liters"
     ],
     "ans": "9 litres",
     "exp": "A standard case is 9 litres, twelve 750 ml bottles. The Court adds that not every case is twelve, since super premium wines often come in cases of six or three, and that OWC on a listing means the original wooden case.",
     "id": "e-yfsue5z5",
     "q": "How many litres of wine does a standard case of twelve 750 ml bottles hold?",
     "row": "Amount of 750ml bottles in a case",
     "sa": 1
    },
    {
     "a": 0,
     "exp": "The Court's sales relation: a higher selling price or a lower product cost raises the margin, and a lower price or a higher cost cuts it. A bigger pour from the same bottle raises the cost of each glass, so it lowers the margin too.",
     "id": "e-naz9q44w",
     "opts": [
      "Lowering the product cost",
      "Lowering the list price",
      "Raising the pour size",
      "Raising the product cost"
     ],
     "q": "Every other figure held the same, which change raises the margin on a wine?",
     "row": "Sales Relation"
    },
    {
     "accept": [
      "30",
      "30%",
      "30 per cent",
      "30 percent",
      "thirty",
      "thirty per cent",
      "thirty percent"
     ],
     "ans": "30 per cent",
     "exp": "Cost percentage is the bottle cost divided by the list price, as the Court writes it: $21 over $70 is 0.30, or 30 per cent. The lower the figure, the more of each sale is left as gross profit.",
     "id": "e-7i3xb64s",
     "q": "A bottle that costs $21 is listed at $70. What is its cost percentage?",
     "row": "Calculations - Cost %",
     "sa": 1
    },
    {
     "accept": [
      "54",
      "$54",
      "54 dollars",
      "fifty four",
      "fifty four dollars"
     ],
     "ans": "$54",
     "exp": "Gross profit is the list price less the bottle cost: $72 less $18 leaves $54 on each bottle, before the wages, rent and other costs that net profit takes off. The Court's cell sets the two terms the other way round; the profit is always the larger figure less the smaller.",
     "id": "e-v4e1vq13",
     "q": "A bottle that costs $18 is listed at $72. What gross profit does each bottle sold make?",
     "row": "Calculations - Gross Profit",
     "sa": 1
    },
    {
     "accept": [
      "50",
      "$50",
      "50 dollars",
      "fifty",
      "fifty dollars"
     ],
     "ans": "$50",
     "exp": "List price is the bottle cost divided by the target cost percentage: $15 divided by 0.30 is $50. Check it back the other way: $15 over $50 is 30 per cent.",
     "id": "e-v0g55fba",
     "q": "A bottle costs $15 and the house targets a 30 per cent cost. At what price should it be listed?",
     "row": "Calculations - List price based on target cost %",
     "sa": 1
    },
    {
     "accept": [
      "18",
      "$18",
      "18 dollars",
      "eighteen",
      "eighteen dollars"
     ],
     "ans": "$18",
     "exp": "The Court divides the bottle's list price by 25 oz and multiplies by the pour: $90 over 25 is $3.60 an ounce, and 5 oz is $18. Many houses then round up, or price the first glass to recover what the bottle cost, but the Court's figure is the starting point.",
     "id": "e-uyso71ai",
     "q": "Using the Court's by the glass formula, what is the BTG cost of a 5 oz pour from a bottle listed at $90?",
     "row": "Calculations - BTG Costing",
     "sa": 1
    },
    {
     "accept": [
      "25",
      "25%",
      "25 per cent",
      "25 percent",
      "twenty five",
      "twenty five per cent",
      "twenty five percent"
     ],
     "ans": "25 per cent",
     "exp": "Start from the case: $240 over twelve is $20 a bottle, $20 over five glasses is $4 a glass, and $4 over the $16 price is 0.25, a pour cost of 25 per cent. The Court asks for exactly this chain, pour cost starting from case cost.",
     "id": "e-8sy1ne6q",
     "q": "A case of twelve bottles costs $240, each bottle pours five glasses, and each glass sells for $16. What is the pour cost percentage?",
     "row": "Calculation - Combinations",
     "sa": 1
    },
    {
     "accept": [
      "16",
      "sixteen",
      "16 bottles",
      "sixteen bottles"
     ],
     "ans": "16 bottles",
     "exp": "The Court's formula is guests times ounces per guest, divided by 25: 80 times 5 is 400 ounces, and 400 over 25 is 16 bottles. Work in ounces with 25 or in millilitres with 750, never a mix of the two.",
     "id": "e-85kgp98q",
     "q": "A reception for 80 guests allows 5 oz of sparkling wine each. Using the Court's formula with 25 oz to the bottle, how many bottles are needed?",
     "row": "Calculation - Combinations",
     "sa": 1
    }
   ],
   "rows": [
    {
     "certified": "Knowing the capacity in metric and standard for uncommon bottle sizes:; 1 liter; 187ml; Jeroboam",
     "intro": "The capacity in metric and standard for common bottle sizes:; 375ml; 750ml; 1.5 liter - Magnum",
     "topic": "Ounces and amounts for regular sized bottles"
    },
    {
     "certified": "Calculate ounce or milliliter pour sizes from standard bottle; Examples: 2 oz, 4 oz, 5 oz, 6 oz; Examples: 60ml, 118ml, 148ml, 187ml",
     "intro": "",
     "topic": "Amount of pours from a standard bottle"
    },
    {
     "certified": "By The Glass, BTB, Pour Cost, Bottle Cost, Cost Of Goods Sold, Cost %, Revenue, Gross Profit, Net Profit, Inventory, Spillage, Ullage, Target Cost %; Inventory change = beginning inventory minus ending inventory",
     "intro": "",
     "topic": "Terms"
    },
    {
     "certified": "9L case; Not all cases are 12 bottles. Can be 6 or 3 bottle cases in the super premium category.; Definition of \"OWC\" - Original Wooden Case",
     "intro": "",
     "topic": "Amount of 750ml bottles in a case"
    },
    {
     "certified": "Increasing sales price increases margin. Decreasing sales price decreases margin. Increasing product cost decreases margin. Decreasing product cost increases margin.",
     "intro": "",
     "topic": "Sales Relation"
    },
    {
     "certified": "Cost % = Bottle Cost / List Price",
     "intro": "",
     "topic": "Calculations - Cost %"
    },
    {
     "certified": "Gross Profit = Bottle Cost - List Price",
     "intro": "",
     "topic": "Calculations - Gross Profit"
    },
    {
     "certified": "List Price = Bottle Cost / Target Cost %",
     "intro": "",
     "topic": "Calculations - List price based on target cost %"
    },
    {
     "certified": "BTG Cost = (Bottle List Price/25oz/750ml) * oz/ml pour",
     "intro": "",
     "topic": "Calculations - BTG Costing"
    },
    {
     "certified": "Pour cost starting from case cost.",
     "intro": "",
     "topic": "Calculation - Combinations"
    },
    {
     "certified": "Amount of bottles needed = (# of guests x # of oz/ml per guest) / 25",
     "intro": "",
     "topic": "Calculation - Combinations"
    }
   ]
  }
 ],
 "syllabus": {
  "description": "The Certified Sommelier Examination is a one-day examination with three separate sections: Deductive Tasting, Theory / Business of the Sommelier, and a Hospitality and Service Practical.",
  "dress": [
   "On the path to making meaningful change with standards and guidelines that are transparent, inclusive, and equitable, The Court of Master Sommeliers, Americas aims to be proactive leaders in the hospitality industry.",
   "We value safety, self-authenticity, and functionality to perform the tasks of the sommelier: Everyone in our community is valued as their authentic self; We do not assume binary gender standards; We do not identify any piece of clothing as being gender-specific; We understand that people with disabilities may need reasonable accommodations to these guidelines and we support flexibility in such accommodations; We honor religious and cultural dress and all hairstyles; We do not award or deduct points on any exam based on appearance.",
   "Dress For the Certified Sommelier Exam: Professional Appearance: Candidates are encouraged to dress in a manner that reflects their personal understanding of professional hospitality. Your attire should prioritize the safety of the guest, your own safety, and the efficiency of service in a professional working environment; Suggested attire: Any combination of safe, workplace-appropriate pants, dress, suit, blazer, shirt, blouse, and shoes that enable you to provide your guests with outstanding hospitality; Hygiene: No excessive perfumes or odors that may interfere with a guest's food & beverage experience or inhibit your ability to assess wines; Safety: Your attire should not inhibit your ability to perform the daily duties of a sommelier safely and should not restrict mobility. Per Department of Health guidelines, please avoid: Large earrings/loose hair: there is potential for jewelry to snag on objects during service and potential for hair to land in guests' food or beverage; Short skirts: can restrict mobility; Open-toed footwear: diminishes protection from heavy objects and increases the risk of slipping and tripping."
  ],
  "feedback": "Feedback on each section of the exam will be given to all candidates at the results reception.",
  "integrity": [
   "The wine community, hospitality industry, and our guests, who trust in any of the Court of Master Sommeliers certifications, expect that every credential holder is a trustworthy and competent professional who maintains and adheres to the highest standards. To uphold this, absolute integrity is required of every candidate and Master Sommelier. All candidates, Master Sommeliers, and members of the community are expected to act with honesty, trust, fairness, respect, and responsibility. Any failure to uphold these values puts the integrity of the credential at risk and compromises the sommelier profession, our industry, and one's accomplishments throughout their career. Examination integrity requires taking thoughtful measures before, during, and after, ensuring all candidates complete the test on their own merit without any improper assistance or resources.",
   "Equitable Examination: Examinations will be graded anonymously whenever possible; Candidates experience a level playing field in every step: from admittance to administration, to grading and delivering of results and feedback; Examination points are awarded and deducted based on pre-determined objective criteria that can be observed and measured. Various subject matter experts have developed and maintained these objective criteria and are reviewed frequently; Systems of grading ensure that no Master Sommelier can unduly affect the outcome of any examination for any size group of candidates. A consortium of objective and experienced MS oversees the entire process and finalizes all results; Candidate's Bill of Rights: Any candidate can request recusal from any examiner for any reason. No Master Sommelier can examine a candidate with whom they have a prior or existing relationship.",
   "Accuracy, Transparency, and Clarity of Results: Multiple examiners are involved to ensure the accuracy of a candidate's score. CMS-A may decide that examinations may be reviewed and audited by a new panel of examiners should it be deemed appropriate; Any examiner present at the exam is permitted to witness and audit the determination of final results; Results & feedback are shared with all candidates on strengths and areas for improvement. Specific scores are shared at the Introductory, Advanced, and MS examinations.",
   "* Systems are in development to enable sharing scores for the Certified examination."
  ],
  "passing": [
   "A student must achieve 60 percent or higher on EACH exam section to become a Certified Sommelier.",
   "All three portions must be passed at the same time at the same exam.",
   "Candidates who pass the Certified Sommelier Exam will receive a certificate, lapel pin, and are eligible to apply for the Advanced Sommelier Course."
  ],
  "policies": {
   "cancellation": "Notification of cancellation must be emailed to info@mastersommeliers.org. CMS is not responsible for cancellations that were emailed but never received. 30+ days prior to start date: All minus $50 processing fee; Less than 30 days prior to start date: No refund or transfer; If due to illness/medical reasons or death in the immediate family, a doctor's note is required within 14 days after the start date for partial refund consideration.",
   "transfer": "Students are allowed ONE transfer per registration under the following conditions: Transfer request must be emailed to info@mastersommeliers.org more than 30 days prior to start date; The program you transfer to must be: (1) of the same type, (2) non-waitlisted, (3) posted on our Schedule. We cannot hold funds for future programs that have not been confirmed/posted to our schedule; We cannot transfer registrations from one calendar year to the next."
  },
  "prerequisites": [
   "The Introductory Sommelier Course and Exam",
   "The CMS-A no longer requires that students take the Certified Sommelier Examination within three years of the Introductory Sommelier Examination. We encourage students to move to the next level when best prepared."
  ],
  "punctuality": "The Certified Sommelier Exam begins promptly at 8:15 am. Tardiness to any portion of the examination will forfeit a candidate's eligibility to pass the exam.",
  "purpose": "The purpose of this document is to communicate exam details, policies, and expectations of students and Master Sommeliers at the Certified Sommelier Exam. Please see the \"Certified Sommelier Exam Guide: What to Expect and How to Prepare for the Certified Sommelier Exam\" for specific exam details and exam content.",
  "recusal": "The CMS-A wants students to feel their most comfortable come exam time. Therefore, students are able to request that specific Master Sommelier examiners are recused from administering their exam. To request recusal(s), log into your account at www.mastersommeliers.org, click on My Account in the upper right-hand corner of the page. Scroll down to the My Recusal Requests section of the page and use the Add Recusal Request button. Begin typing in the Master Sommelier's first name, then select their full name from the drop-down list. Please submit all recusal requests no later than two weeks prior to your exam.",
  "retake": "Candidates must wait at least 90 days from their last attempt before retaking the Certified Sommelier Examination. We do not offer a discounted retake rate for the Certified Sommelier Examination.",
  "rights": [
   "A testing environment free from misconduct or bias, including but not limited to harassment or coercive behavior by examiners or other candidates.",
   "An examination based on their skill set and knowledge, free from bias.",
   "Respectful conduct by examiners, educators, and fellow candidates or students while involved in CMS-A programming.",
   "Impartial and unbiased examiners, free from unfair or prejudicial influence from previous examinations or outside actions of the candidate.",
   "Request mentorship from a Master Sommelier without fear of any expectation of reciprocity or quid pro quo.",
   "Engagement in a mentor-mentee relationship without fear of any expectation of reciprocity or quid pro quo.",
   "Receive feedback and results from an examination in a constructive, timely, respectful, accurate, and nonprejudicial manner.",
   "Request the recusal, without fear of retribution, of individual Master Sommeliers from directly examining them if there is a belief that the interaction in question will adversely affect their ability to perform at an examination. This information will be collected at the time of application, kept confidential, and accessible only to the executive director, director of operations, associate director of operations, education director, examination director, and the cochairs of the Ethics and Professional Responsibility Committee.",
   "Contact an approved representative of the CMS-A for a detailed explanation of their exam results.",
   "Timely and clear communication from the CMS-A regarding examination locations, times, and other logistical details.",
   "Voice their questions and concerns about the content and administration of examinations.",
   "A detailed explanation of examination standards and what is expected for success at each level.",
   "Freely report, anonymously or not, behavior or actions that are in violation of the Code of Ethics without fear of retaliation or retribution. Reports can be made online to Lighthouse Anonymous Reporting, at www.lighthouse-services.com/mastersommeliers, or to a Master Sommelier with whom the candidate feels comfortable communicating."
  ],
  "roles": {
   "other": "Winery Tasting Room, Lead Retail Floor Salesperson, Distributor Representative, Hotel F&B Leadership",
   "restaurant": "Lead Server, Captain, Assistant Floor Sommelier, Bartender, Manager"
  },
  "rules": {
   "cheating": "Cheating will result in automatic expulsion from this program. The Ethics Committee will review the academic integrity issue and further disciplinary action can take place.",
   "devices": "No electronic devices, including cell phones, iPhones, tablets, smartphones, and smartwatches are allowed in examination rooms or on your person during the examination. Not following the electronic policy may result in expulsion from the examination.",
   "food": "No external food or drinks are permitted during the exam at any time. There will be water provided for you."
  },
  "schedule": [
   {
    "at": "7:45 AM",
    "what": "Check-in: Photo ID is required."
   },
   {
    "at": "8:00 AM",
    "what": "Introduction"
   },
   {
    "at": "8:15-8:45 AM",
    "what": "Tasting Examination"
   },
   {
    "at": "8:50-9:25 AM",
    "what": "Theory Examination"
   },
   {
    "at": "10:00 AM-4:00 PM",
    "what": "Service Examination: times vary, you will receive your exam time upon completion of the Theory portion."
   },
   {
    "at": "5:00-6:00 PM",
    "what": "Results Reception: time varies (examiners will announce on exam day)."
   }
  ],
  "sections": [
   {
    "key": "tasting",
    "name": "Deductive Tasting Examination"
   },
   {
    "key": "theory",
    "name": "Theory Examination"
   },
   {
    "key": "service",
    "name": "Hospitality and Service Practical"
   }
  ],
  "skills": [
   "Working theoretical knowledge of principal beverage alcohol.",
   "Proficiency in tableside service, including: Still and sparkling wine bottle and glass pour service; Food and wine pairing sales and ability to articulate the pairing; Cocktail, beer, aperitif, digestif, and fortified wine knowledge; Benchmark producer and vintage basics for iconic wine regions.",
   "Deductive Tasting Method ability for core classic red and white grape varieties.",
   "Basic financials and wine program management."
  ],
  "source": "CMS-A 7.2023",
  "who": "The Certified Sommelier Exam is recommended for those with a minimum of three years in the beverage and hospitality industry. The material tested on the Certified Sommelier Exam is much more advanced than the Introductory Sommelier Exam. It is strongly suggested to have at least one year of restaurant experience to be comfortable with service mechanics."
 },
 "tasting": {
  "reds": [
   {
    "name": "Cabernet Franc",
    "regions": [
     {
      "country": "France - Loire Valley",
      "notes": [],
      "places": [
       "Chinon",
       "Bourgueil"
      ]
     }
    ]
   },
   {
    "name": "Cabernet Sauvignon",
    "regions": [
     {
      "country": "France - Bordeaux",
      "notes": [
       "New Oak"
      ],
      "places": [
       "Haut-Médoc",
       "Graves"
      ]
     },
     {
      "country": "United States - California",
      "notes": [
       "New Oak"
      ],
      "places": [
       "Napa Valley",
       "Sonoma County",
       "Paso Robles"
      ]
     }
    ]
   },
   {
    "name": "Gamay",
    "regions": [
     {
      "country": "France - Burgundy",
      "notes": [
       "With carbonic maceration",
       "No Oak"
      ],
      "places": [
       "Beaujolais"
      ]
     }
    ]
   },
   {
    "name": "Grenache",
    "regions": [
     {
      "country": "France - Rhône Valley",
      "notes": [],
      "places": [
       "Châteauneuf-du-Pape",
       "Gigondas"
      ]
     }
    ]
   },
   {
    "name": "Malbec",
    "regions": [
     {
      "country": "Argentina",
      "notes": [],
      "places": [
       "Mendoza"
      ]
     }
    ]
   },
   {
    "name": "Merlot",
    "regions": [
     {
      "country": "France - Bordeaux",
      "notes": [],
      "places": [
       "Pomerol",
       "Saint-Émilion"
      ]
     },
     {
      "country": "United States - California",
      "notes": [
       "New Oak"
      ],
      "places": [
       "Napa Valley",
       "Sonoma County"
      ]
     }
    ]
   },
   {
    "name": "Nebbiolo",
    "regions": [
     {
      "country": "Italy - Piedmont",
      "notes": [],
      "places": [
       "Barolo",
       "Barbaresco"
      ]
     }
    ]
   },
   {
    "name": "Pinot Noir",
    "regions": [
     {
      "country": "France",
      "notes": [
       "Village or Premier Cru Only"
      ],
      "places": [
       "Côte d' Or"
      ]
     },
     {
      "country": "United States - California",
      "notes": [],
      "places": [
       "Napa Valley (Carneros)",
       "Sonoma County",
       "Central Coast"
      ]
     },
     {
      "country": "United States - Oregon",
      "notes": [],
      "places": [
       "Willamette Valley"
      ]
     }
    ]
   },
   {
    "name": "Sangiovese",
    "regions": [
     {
      "country": "Italy - Tuscany",
      "notes": [],
      "places": [
       "Brunello di Montalcino",
       "Chianti Classico"
      ]
     }
    ]
   },
   {
    "name": "Syrah",
    "regions": [
     {
      "country": "France; Northern Rhône Valley",
      "notes": [],
      "places": [
       "Côte-Rôtie",
       "Saint-Joseph",
       "Crozes-Hermitage"
      ]
     },
     {
      "country": "Australia",
      "notes": [
       "New Oak"
      ],
      "places": [
       "South Australia",
       "Western Australia",
       "Victoria"
      ]
     }
    ]
   },
   {
    "name": "Tempranillo",
    "regions": [
     {
      "country": "Spain",
      "notes": [
       "Reserva or Gran Reserva",
       "American Oak"
      ],
      "places": [
       "Rioja"
      ]
     }
    ]
   },
   {
    "name": "Zinfandel",
    "regions": [
     {
      "country": "United States - California",
      "notes": [
       "New Oak"
      ],
      "places": [
       "Napa Valley",
       "Sonoma County"
      ]
     }
    ]
   }
  ],
  "source": "CMS-A 9.2025",
  "title": "CMS-A CERTIFIED SOMMELIER TASTING EXAM GRAPE VARIETIES AND GROWING REGIONS",
  "whites": [
   {
    "name": "Albariño",
    "regions": [
     {
      "country": "Spain",
      "notes": [
       "No Oak"
      ],
      "places": [
       "Rías Baixas"
      ]
     }
    ]
   },
   {
    "name": "Chardonnay",
    "regions": [
     {
      "country": "France - Burgundy",
      "notes": [
       "Chablis: No New Oak",
       "Côte de Beaune: New Oak",
       "Mâconnais: New Oak",
       "Village or Premier Cru Only"
      ],
      "places": [
       "Chablis",
       "Côte de Beaune",
       "Mâconnais"
      ]
     },
     {
      "country": "United States - California",
      "notes": [
       "New Oak"
      ],
      "places": [
       "Napa Valley",
       "Sonoma County",
       "Central Coast"
      ]
     }
    ]
   },
   {
    "name": "Chenin Blanc",
    "regions": [
     {
      "country": "France - Loire Valley",
      "notes": [
       "Demi-Sec / Off-Dry Only"
      ],
      "places": [
       "Vouvray"
      ]
     }
    ]
   },
   {
    "name": "Gewurztraminer",
    "regions": [
     {
      "country": "France",
      "notes": [
       "Off-Dry Only"
      ],
      "places": [
       "Alsace"
      ]
     }
    ]
   },
   {
    "name": "Pinot Grigio",
    "regions": [
     {
      "country": "Italy",
      "notes": [],
      "places": [
       "Friuli",
       "Trentino - Alto Adige"
      ]
     }
    ]
   },
   {
    "name": "Riesling",
    "regions": [
     {
      "country": "Germany",
      "notes": [
       "Kabinett or Spätlese / Off-Dry Only"
      ],
      "places": [
       "Mosel",
       "Rheingau"
      ]
     }
    ]
   },
   {
    "name": "Sauvignon Blanc",
    "regions": [
     {
      "country": "France - Loire Valley",
      "notes": [],
      "places": [
       "Sancerre",
       "Pouilly-Fumé"
      ]
     },
     {
      "country": "New Zealand",
      "notes": [],
      "places": [
       "Marlborough"
      ]
     }
    ]
   },
   {
    "name": "Torrontés",
    "regions": [
     {
      "country": "Argentina",
      "notes": [],
      "places": [
       "Salta",
       "Mendoza"
      ]
     }
    ]
   }
  ]
 },
 "version": 1
};
