/* The grid reads: built by .scripts/cms/build-cms.cjs from .scripts/cms, never edited by hand.
   GRID_READS holds, per Certified grape slug, what the deductive tasting grid reads for each examinable region (the keys
   are the grid's lines, the options the Court's printed ones); GRID_SAY the respelling of each grape; GRID_ALIASES the
   folded names that resolve to a slug. Every string is our own: British, dash free, nobody named. */
var GRID_READS = {
 "albarino": {
  "colour": "white",
  "name": "Albariño",
  "reads": [
   {
    "age": [
     "1-2 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "Spain",
    "fruit": {
     "apple-pear": [
      "green apple",
      "pear"
     ],
     "citrus": [
      "lemon",
      "lime",
      "grapefruit"
     ],
     "stone-fruit": [
      "white peach",
      "apricot"
     ],
     "tropical": []
    },
    "nonFruit": [
     "flowers",
     "mineral"
    ],
    "region": "Rías Baixas",
    "sell": "Albariño from the Atlantic coast of Galicia: white peach, lime and a breath of sea salt, crisp and bone dry with no oak at all. It is made for the raw bar, so think oysters, grilled prawns or octopus.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Medium"
     ],
     "bitterness": "Yes",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "High acidity, moderate alcohol and fruit poised between tart and just ripe say a cool, wet Atlantic site.",
     "grape": "White peach and citrus wrapped in a saline, wet stone finish with racy acid, a pithy, faintly bitter grip and no oak point to Albariño, saltier than Pinot Grigio and without the green grassiness of Sauvignon Blanc."
    }
   }
  ],
  "slug": "albarino"
 },
 "cabernet-franc": {
  "colour": "red",
  "name": "Cabernet Franc",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Purple",
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "black": [],
     "blue": [],
     "red": [
      "raspberry",
      "red currant",
      "red cherry",
      "red plum"
     ]
    },
    "nonFruit": [
     "flowers",
     "green",
     "mineral"
    ],
    "region": "Chinon and Bourgueil",
    "sell": "A Loire red of raspberry, red currant and violet with a pencil lead edge, light on its feet and bright with acidity. Served a little cool, it is lovely with charcuterie, roast chicken or goat's cheese.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Medium"
     ],
     "tannin": [
      "Medium",
      "Medium +"
     ]
    },
    "why": {
     "climate": "Tart red fruit, the pyrazine edge, medium plus acidity and moderate alcohol say a cool climate.",
     "grape": "Crunchy red fruit with green bell pepper, jalapeño and pencil lead on a medium frame, lighter than Cabernet Sauvignon, is the Cabernet Franc signature."
    }
   }
  ],
  "slug": "cabernet-franc"
 },
 "cabernet-sauvignon": {
  "colour": "red",
  "name": "Cabernet Sauvignon",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Moderate",
    "colour": [
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "black": [
      "blackcurrant",
      "blackberry",
      "black cherry"
     ],
     "blue": [],
     "red": [
      "red currant"
     ]
    },
    "nonFruit": [
     "green",
     "earth",
     "mineral",
     "new-oak"
    ],
    "region": "Haut-Médoc and Graves",
    "sell": "A Left Bank Bordeaux built on Cabernet Sauvignon, with blackcurrant, cedar and graphite over firm, fine tannin and a frame of toasty oak. Decant it and serve it with lamb or a rib of beef.",
    "structure": {
     "acidity": [
      "Medium +"
     ],
     "alcohol": [
      "Medium",
      "Medium +"
     ],
     "tannin": [
      "Medium +",
      "High"
     ]
    },
    "why": {
     "climate": "Black fruit that is ripe but never jammy, a herbal edge, medium plus acidity and alcohol short of high say a moderate maritime climate.",
     "grape": "Blackcurrant and cedar over a firm, drying tannic spine, with a graphite and green bell pepper edge, is Cabernet Sauvignon."
    }
   },
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Warm",
    "colour": [
     "Purple",
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ],
     "palate": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ]
    },
    "country": "United States",
    "fruit": {
     "black": [
      "blackcurrant",
      "blackberry",
      "black cherry"
     ],
     "blue": [],
     "red": []
    },
    "nonFruit": [
     "coffee",
     "new-oak"
    ],
    "region": "Napa Valley, Sonoma County and Paso Robles",
    "sell": "A rich California Cabernet Sauvignon, all blackcurrant and black cherry, with mocha, vanilla and toast from new oak over firm, ripe tannin. It is made for a dry aged steak.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium +",
      "High"
     ],
     "tannin": [
      "Medium +",
      "High"
     ]
    },
    "why": {
     "climate": "Ripe to jammy black fruit, alcohol at medium plus or high and acidity that has eased towards medium say a warm, sunny climate.",
     "grape": "Cassis and black cherry on a full body with high, drying tannin is Cabernet Sauvignon, here wrapped in new oak."
    }
   }
  ],
  "slug": "cabernet-sauvignon"
 },
 "chardonnay": {
  "colour": "white",
  "name": "Chardonnay",
  "reads": [
   {
    "age": [
     "1-2 Years",
     "3-4 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw",
     "Yellow"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "apple-pear": [
      "green apple",
      "pear"
     ],
     "citrus": [
      "lemon"
     ],
     "stone-fruit": [],
     "tropical": []
    },
    "nonFruit": [
     "lees",
     "malolactic",
     "mineral"
    ],
    "region": "Chablis",
    "sell": "A lean, steely Chardonnay from the cool north of Burgundy, green apple and lemon over a chalky, oyster shell edge. Bright and dry with no new oak, it wants oysters or a simply grilled sole.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Medium"
     ],
     "bitterness": "No",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "Tart green apple and lemon, acidity at medium plus or high and moderate alcohol say a cool continental site.",
     "grape": "No loud aroma of its own: the wine reads as chalk, lees and a soft cream from malolactic on a medium frame, the shape shifting Chardonnay seen without new oak."
    }
   },
   {
    "age": [
     "1-2 Years",
     "3-4 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw",
     "Yellow"
    ],
    "condition": {
     "nose": [
      "Ripe"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "apple-pear": [
      "yellow apple",
      "pear"
     ],
     "citrus": [
      "lemon"
     ],
     "stone-fruit": [
      "peach"
     ],
     "tropical": []
    },
    "nonFruit": [
     "lees",
     "malolactic",
     "mineral",
     "new-oak"
    ],
    "region": "Côte de Beaune",
    "sell": "A fuller white Burgundy from the Côte de Beaune, yellow apple and peach wrapped in cream, hazelnut and a little toast from new oak. Dry, structured and long, it is a wine for roast chicken, lobster or a butter sauce.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium +"
     ],
     "bitterness": "No",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "Ripe but restrained yellow fruit, acidity still near medium plus and alcohol short of high read as the warmer end of a cool continental climate, never the tropical ripeness of a warm one.",
     "grape": "Butter and cream from malolactic, hazelnut from lees and toasty new oak around a stony core point to Chardonnay in the Burgundian cellar style."
    }
   },
   {
    "age": [
     "1-2 Years",
     "3-4 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw",
     "Yellow"
    ],
    "condition": {
     "nose": [
      "Ripe"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "apple-pear": [
      "yellow apple",
      "pear"
     ],
     "citrus": [
      "lemon"
     ],
     "stone-fruit": [
      "peach",
      "white peach"
     ],
     "tropical": []
    },
    "nonFruit": [
     "lees",
     "malolactic",
     "new-oak"
    ],
    "region": "Mâconnais",
    "sell": "A sunny, rounded white Burgundy from the Mâconnais, ripe peach and yellow apple with a creamy texture and a gentle frame of new oak. Generous and dry, it suits roast chicken, pork or a creamy mushroom dish.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium",
      "Medium +"
     ],
     "bitterness": "No",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "Riper peach and yellow apple with acidity still at medium or medium plus place it at the warm southern end of Burgundy's cool continental climate.",
     "grape": "Cream from malolactic and a light frame of vanilla and toast on a dry white with no aromatic signature of its own read as Chardonnay, rounder and less stony than the Côte de Beaune."
    }
   },
   {
    "age": [
     "1-2 Years",
     "3-4 Years"
    ],
    "climate": "Moderate",
    "colour": [
     "Yellow",
     "Gold"
    ],
    "condition": {
     "nose": [
      "Ripe"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "United States",
    "fruit": {
     "apple-pear": [
      "yellow apple",
      "pear"
     ],
     "citrus": [
      "lemon"
     ],
     "stone-fruit": [
      "peach"
     ],
     "tropical": [
      "pineapple",
      "mango"
     ]
    },
    "nonFruit": [
     "lees",
     "malolactic",
     "new-oak"
    ],
    "region": "Napa Valley, Sonoma County and Central Coast",
    "sell": "A rich, sun ripened California Chardonnay, pineapple, peach and baked apple folded into butter, vanilla and toast. Full bodied and dry, it stands up to lobster, crab cakes or roast chicken in a cream sauce.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium +",
      "High"
     ],
     "bitterness": "No",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "Stone and tropical fruit at full ripeness and alcohol at medium plus or high, yet acidity held at medium or medium plus, read as a moderate climate: strong sun to ripen, Pacific fog and San Pablo Bay breezes to keep the acid.",
     "grape": "Lavish butter from malolactic, vanilla and toast from new oak and lees on a full body, with no aromatic grape signature, is Chardonnay dressed by the cellar."
    }
   }
  ],
  "slug": "chardonnay"
 },
 "chenin-blanc": {
  "colour": "white",
  "name": "Chenin Blanc",
  "reads": [
   {
    "age": [
     "1-2 Years",
     "3-4 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw",
     "Yellow"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Baked / Dried / Bruised"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "apple-pear": [
      "yellow apple",
      "quince",
      "pear"
     ],
     "citrus": [
      "lemon"
     ],
     "stone-fruit": [],
     "tropical": []
    },
    "nonFruit": [
     "fresh-herbs",
     "noble-rot",
     "mineral"
    ],
    "region": "Vouvray",
    "sell": "A demi-sec Vouvray from the Loire: quince, yellow apple and honey, a touch of sweetness held in line by bright, mouthwatering acidity. It is lovely with pork, spiced dishes or a fruit tart, and far more versatile than its sweetness suggests.",
    "structure": {
     "acidity": [
      "High"
     ],
     "alcohol": [
      "Low to Medium -",
      "Medium"
     ],
     "bitterness": "No",
     "sweetness": "Off-Dry"
    },
    "why": {
     "climate": "Acidity this high beside modest alcohol says a cool, continental Loire site, where the sweetness is the grower's choice rather than the sun's.",
     "grape": "Honeyed quince and baked apple with beeswax, straw and chalk over searing acid, sweetness that never cloys and no new oak are the Chenin Blanc signature."
    }
   }
  ],
  "slug": "chenin-blanc"
 },
 "gamay": {
  "colour": "red",
  "name": "Gamay",
  "reads": [
   {
    "age": [
     "1-3 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Purple",
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "black": [],
     "blue": [],
     "red": [
      "red cherry",
      "raspberry",
      "strawberry",
      "cranberry"
     ]
    },
    "nonFruit": [
     "flowers",
     "carbonic"
    ],
    "region": "Beaujolais",
    "sell": "A bright, juicy Beaujolais of red cherry, raspberry and violets, with the playful banana lift of whole bunch fermentation and almost no tannin. Serve it lightly chilled with charcuterie, roast chicken or a bistro lunch.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Low to Medium -",
      "Medium"
     ],
     "tannin": [
      "Low to Medium -"
     ]
    },
    "why": {
     "climate": "Tart to ripe red fruit, high acidity and modest alcohol on a light frame say a cool climate.",
     "grape": "Candied red cherry with the banana and bubblegum of carbonic maceration, high acidity and barely any tannin is Gamay."
    }
   }
  ],
  "slug": "gamay"
 },
 "gewurztraminer": {
  "colour": "white",
  "name": "Gewurztraminer",
  "reads": [
   {
    "age": [
     "1-2 Years",
     "3-4 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Yellow",
     "Gold"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ],
     "palate": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ]
    },
    "country": "France",
    "fruit": {
     "apple-pear": [],
     "citrus": [
      "pink grapefruit",
      "tangerine"
     ],
     "stone-fruit": [
      "peach",
      "apricot"
     ],
     "tropical": [
      "lychee",
      "mango"
     ]
    },
    "nonFruit": [
     "flowers",
     "variety-spice"
    ],
    "region": "Alsace",
    "sell": "An off-dry Alsace Gewurztraminer, heady with lychee, rose petal and ginger, rich and silky with just a kiss of sweetness. It is the wine for spice: Thai or Creole dishes, foie gras or a pungent washed rind cheese.",
    "structure": {
     "acidity": [
      "Low to Medium -"
     ],
     "alcohol": [
      "Medium +",
      "High"
     ],
     "bitterness": "Yes",
     "sweetness": "Off-Dry"
    },
    "why": {
     "climate": "Alsace is cool and dry behind the Vosges: the low acid and high alcohol belong to the grape, while fresh rather than baked fruit and a clean finish keep the call cool.",
     "grape": "Lychee and rose petal with ginger and allspice, an oily, faintly bitter texture and low acid: nothing else smells like Gewurztraminer."
    }
   }
  ],
  "slug": "gewurztraminer"
 },
 "grenache": {
  "colour": "red",
  "name": "Grenache",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Warm",
    "colour": [
     "Ruby",
     "Garnet"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ],
     "palate": [
      "Overripe / Jammy / Candied",
      "Baked / Dried / Bruised"
     ]
    },
    "country": "France",
    "fruit": {
     "black": [],
     "blue": [],
     "red": [
      "strawberry",
      "red cherry",
      "raspberry",
      "red plum"
     ]
    },
    "nonFruit": [
     "dried-herbs",
     "meat",
     "earth"
    ],
    "region": "Châteauneuf-du-Pape and Gigondas",
    "sell": "A warm, generous red from the southern Rhône, with kirsch, strawberry jam and the dried herbs of the garrigue, soft in tannin and long in the glass. It loves lamb with rosemary, a daube or a hearty stew.",
    "structure": {
     "acidity": [
      "Low to Medium -",
      "Medium"
     ],
     "alcohol": [
      "High"
     ],
     "tannin": [
      "Medium",
      "Medium +"
     ]
    },
    "why": {
     "climate": "Jammy and dried red fruit, high alcohol and acidity at medium or below say a warm, sunny climate.",
     "grape": "A paler colour than the weight suggests, kirsch and garrigue, soft acidity and real alcoholic heat give Grenache away."
    }
   }
  ],
  "slug": "grenache"
 },
 "malbec": {
  "colour": "red",
  "name": "Malbec",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Warm",
    "colour": [
     "Purple"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "Argentina",
    "fruit": {
     "black": [
      "black plum",
      "blackberry",
      "black cherry"
     ],
     "blue": [
      "blueberry"
     ],
     "red": []
    },
    "nonFruit": [
     "flowers",
     "coffee",
     "new-oak"
    ],
    "region": "Mendoza",
    "sell": "A plush Argentine Malbec from the high vineyards of Mendoza, with black plum, blueberry and violets over soft, ripe tannin and a touch of mocha. It was born for grilled steak and chimichurri.",
    "structure": {
     "acidity": [
      "Medium"
     ],
     "alcohol": [
      "Medium +",
      "High"
     ],
     "tannin": [
      "Medium",
      "Medium +"
     ]
    },
    "why": {
     "climate": "Ripe, even jammy fruit and alcohol at medium plus or higher say a warm, sunny climate, freshened only by altitude.",
     "grape": "Inky purple with a magenta rim, violets and plush black and blue fruit, with acidity no higher than medium, is Malbec."
    }
   }
  ],
  "slug": "malbec"
 },
 "merlot": {
  "colour": "red",
  "name": "Merlot",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Moderate",
    "colour": [
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Ripe"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "black": [
      "black plum",
      "black cherry",
      "blackberry"
     ],
     "blue": [],
     "red": [
      "red plum",
      "red cherry"
     ]
    },
    "nonFruit": [
     "coffee",
     "earth",
     "new-oak"
    ],
    "region": "Pomerol and Saint-Émilion",
    "sell": "A Right Bank Bordeaux led by Merlot, with plum, black cherry and a little truffle and chocolate on a round, velvety palate. It is gentle enough to open young and lovely with duck, mushrooms or a braise.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium +"
     ],
     "tannin": [
      "Medium",
      "Medium +"
     ]
    },
    "why": {
     "climate": "Ripe but restrained fruit, an earthy edge, fresh acidity and alcohol short of high say a moderate maritime climate.",
     "grape": "Plummy red and black fruit with a soft, fleshy middle and round tannin, every line at medium or a step above, is Merlot."
    }
   },
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Warm",
    "colour": [
     "Purple",
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ],
     "palate": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ]
    },
    "country": "United States",
    "fruit": {
     "black": [
      "black cherry",
      "black plum",
      "blackberry"
     ],
     "blue": [],
     "red": []
    },
    "nonFruit": [
     "coffee",
     "new-oak"
    ],
    "region": "Napa Valley and Sonoma County",
    "sell": "A plush California Merlot of black cherry and plum, wrapped in mocha, vanilla and toast from new oak on a soft, round palate. It is an easy match for roast pork, short ribs or a mushroom risotto.",
    "structure": {
     "acidity": [
      "Medium"
     ],
     "alcohol": [
      "Medium +",
      "High"
     ],
     "tannin": [
      "Medium",
      "Medium +"
     ]
    },
    "why": {
     "climate": "Ripe to jammy black fruit, alcohol at medium plus or high and acidity no more than medium say a warm climate.",
     "grape": "Plum and black cherry on a fleshy, round mid palate, with tannin softer than Cabernet Sauvignon's, is Merlot."
    }
   }
  ],
  "slug": "merlot"
 },
 "nebbiolo": {
  "colour": "red",
  "name": "Nebbiolo",
  "reads": [
   {
    "age": [
     "4-6 Years",
     "7+ Years"
    ],
    "climate": "Moderate",
    "colour": [
     "Ruby",
     "Garnet"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Baked / Dried / Bruised"
     ],
     "palate": [
      "Tart",
      "Baked / Dried / Bruised"
     ]
    },
    "country": "Italy",
    "fruit": {
     "black": [],
     "blue": [],
     "red": [
      "sour cherry",
      "red plum",
      "cranberry",
      "dried cherry"
     ]
    },
    "nonFruit": [
     "flowers",
     "dried-herbs",
     "meat",
     "balsamic",
     "earth"
    ],
    "region": "Barolo and Barbaresco",
    "sell": "Barolo and Barbaresco are Nebbiolo at its noblest: pale in the glass but powerful, with sour cherry, roses, tar and dried herbs over firm tannin and bright acidity. Decant it and pour it with braised beef, a mushroom risotto or anything with truffle.",
    "structure": {
     "acidity": [
      "High"
     ],
     "alcohol": [
      "Medium +",
      "High"
     ],
     "tannin": [
      "High"
     ]
    },
    "why": {
     "climate": "Tart to dried red fruit and high acidity, with alcohol that can still reach high, say a moderate continental climate with a long, late autumn.",
     "grape": "A pale garnet colour hiding high tannin and high acidity, with the tar and roses nose, is Nebbiolo and nothing else."
    }
   }
  ],
  "slug": "nebbiolo"
 },
 "pinot-grigio": {
  "colour": "white",
  "name": "Pinot Grigio",
  "reads": [
   {
    "age": [
     "1-2 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "Italy",
    "fruit": {
     "apple-pear": [
      "pear",
      "green apple"
     ],
     "citrus": [
      "lemon"
     ],
     "stone-fruit": [
      "white peach",
      "nectarine"
     ],
     "tropical": []
    },
    "nonFruit": [
     "mineral"
    ],
    "region": "Friuli and Trentino-Alto Adige",
    "sell": "A crisp, dry Pinot Grigio from the foothills of the Alps, pear, green apple and white peach with a clean, stony finish. Light and refreshing, it suits antipasti, trout or a seafood risotto.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium"
     ],
     "bitterness": "Yes",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "Crisp acidity, moderate alcohol and fruit between tart and just ripe say a cool continental site, with cold nights off the Alps.",
     "grape": "Near neutral pear and apple, a faint bitter almond grip on the finish and a light, dry frame with no oak and no aromatic lift read as Italian Pinot Grigio."
    }
   }
  ],
  "slug": "pinot-grigio"
 },
 "pinot-noir": {
  "colour": "red",
  "name": "Pinot Noir",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "black": [],
     "blue": [],
     "red": [
      "red cherry",
      "raspberry",
      "strawberry",
      "cranberry"
     ]
    },
    "nonFruit": [
     "flowers",
     "earth",
     "mineral"
    ],
    "region": "Côte d'Or",
    "sell": "A red Burgundy from the Côte d'Or, silky and fine, with red cherry, raspberry and rose over a quiet earthiness of forest floor. It is a perfect partner for roast duck, game birds or a mushroom dish.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Medium"
     ],
     "tannin": [
      "Low to Medium -",
      "Medium"
     ]
    },
    "why": {
     "climate": "Tart red fruit, medium plus to high acidity and moderate alcohol say a cool continental climate.",
     "grape": "Translucent ruby, silky tannin and red fruit over earth and mushroom is Pinot Noir."
    }
   },
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Moderate",
    "colour": [
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "United States",
    "fruit": {
     "black": [
      "black cherry",
      "black plum"
     ],
     "blue": [],
     "red": [
      "red cherry",
      "raspberry"
     ]
    },
    "nonFruit": [
     "new-oak"
    ],
    "region": "Napa Valley (Carneros), Sonoma County and Central Coast",
    "sell": "A riper California Pinot Noir, with black cherry, raspberry and a hint of cola and vanilla spice on a silky, generous palate. It is lovely with salmon, roast pork or mushrooms.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium +"
     ],
     "tannin": [
      "Low to Medium -",
      "Medium"
     ]
    },
    "why": {
     "climate": "Riper red and black cherry, medium plus alcohol and acidity that has eased to medium say a moderate climate cooled by fog off the Pacific.",
     "grape": "Silky, light tannin under cherry fruit and a translucent ruby colour still say Pinot Noir, however ripe the fruit."
    }
   },
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "United States",
    "fruit": {
     "black": [
      "black cherry"
     ],
     "blue": [],
     "red": [
      "red cherry",
      "raspberry",
      "cranberry"
     ]
    },
    "nonFruit": [
     "flowers",
     "earth"
    ],
    "region": "Willamette Valley",
    "sell": "A Willamette Valley Pinot Noir with red and dark cherry, rose and a forest floor earthiness on a silky, fresh palate. It is made for salmon, duck or wild mushrooms.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Medium",
      "Medium +"
     ],
     "tannin": [
      "Low to Medium -",
      "Medium"
     ]
    },
    "why": {
     "climate": "Tart to ripe red fruit, fresh acidity and alcohol held near medium say a cool, maritime climate.",
     "grape": "Translucent ruby, silky tannin and bright cherry fruit over forest floor are the marks of Pinot Noir."
    }
   }
  ],
  "slug": "pinot-noir"
 },
 "riesling": {
  "colour": "white",
  "name": "Riesling",
  "reads": [
   {
    "age": [
     "1-2 Years",
     "3-4 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw",
     "Yellow"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "Germany",
    "fruit": {
     "apple-pear": [
      "green apple"
     ],
     "citrus": [
      "lime",
      "lemon"
     ],
     "stone-fruit": [
      "white peach",
      "apricot",
      "nectarine"
     ],
     "tropical": []
    },
    "nonFruit": [
     "flowers",
     "mineral"
    ],
    "region": "Mosel and Rheingau",
    "sell": "A German Riesling at Kabinett or Spätlese, lime, green apple and white peach over wet slate, its touch of sweetness balanced by electric acidity. Light and low in alcohol, it is superb with Thai or Vietnamese dishes, crab or smoked trout.",
    "structure": {
     "acidity": [
      "High"
     ],
     "alcohol": [
      "Low to Medium -"
     ],
     "bitterness": "No",
     "sweetness": "Off-Dry"
    },
    "why": {
     "climate": "High acidity, low alcohol and tart, just ripe fruit say a cool continental vineyard near the northern limit for ripening grapes.",
     "grape": "Piercing acidity, lime and green apple with blossom and wet slate, low alcohol and pure, unoaked fruit are the Riesling signature; petrol joins them only after a few years in bottle."
    }
   }
  ],
  "slug": "riesling"
 },
 "sangiovese": {
  "colour": "red",
  "name": "Sangiovese",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Moderate",
    "colour": [
     "Ruby",
     "Garnet"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "Italy",
    "fruit": {
     "black": [],
     "blue": [],
     "red": [
      "sour cherry",
      "red cherry",
      "red plum",
      "cranberry"
     ]
    },
    "nonFruit": [
     "fresh-herbs",
     "dried-herbs",
     "meat",
     "earth"
    ],
    "region": "Brunello di Montalcino and Chianti Classico",
    "sell": "Tuscan Sangiovese, from Chianti Classico or Brunello di Montalcino, with sour cherry, tomato leaf, dried herbs and a little leather on bright acidity and dusty tannin. It sings with tomato sauces, roast meats and aged pecorino.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Medium",
      "Medium +"
     ],
     "tannin": [
      "Medium +",
      "High"
     ]
    },
    "why": {
     "climate": "Tart red fruit, high acidity and alcohol no higher than medium plus say a moderate climate, its hills cooled by elevation.",
     "grape": "Sour cherry and tomato leaf riding high acidity and dusty, firm tannin are the tells of Sangiovese."
    }
   }
  ],
  "slug": "sangiovese"
 },
 "sauvignon-blanc": {
  "colour": "white",
  "name": "Sauvignon Blanc",
  "reads": [
   {
    "age": [
     "1-2 Years",
     "3-4 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "apple-pear": [
      "green apple"
     ],
     "citrus": [
      "grapefruit",
      "lime",
      "lemon"
     ],
     "stone-fruit": [],
     "tropical": []
    },
    "nonFruit": [
     "green",
     "mineral"
    ],
    "region": "Sancerre and Pouilly-Fumé",
    "sell": "Sauvignon Blanc from the upper Loire, grapefruit, lime and cut grass with a smoky, flinty edge, crisp and bone dry. Pour it with goat's cheese, shellfish or a herb crusted fish.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Medium"
     ],
     "bitterness": "No",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "Tart citrus, green herbaceous notes, high acidity and moderate alcohol say a cool continental site.",
     "grape": "Grapefruit and cut grass from pyrazines over high acid, with no oak and no cream, mark Sauvignon Blanc; the restraint and the gunflint place it in the Loire rather than Marlborough."
    }
   },
   {
    "age": [
     "1-2 Years"
    ],
    "climate": "Cool",
    "colour": [
     "Straw"
    ],
    "condition": {
     "nose": [
      "Ripe"
     ],
     "palate": [
      "Tart",
      "Ripe"
     ]
    },
    "country": "New Zealand",
    "fruit": {
     "apple-pear": [],
     "citrus": [
      "grapefruit",
      "lime"
     ],
     "stone-fruit": [],
     "tropical": [
      "passion fruit",
      "guava"
     ]
    },
    "nonFruit": [
     "green"
    ],
    "region": "Marlborough",
    "sell": "Marlborough Sauvignon Blanc, bursting with passion fruit, grapefruit and freshly cut grass, zesty, dry and unoaked. Serve it well chilled with oysters, a green salad or goat's cheese.",
    "structure": {
     "acidity": [
      "High"
     ],
     "alcohol": [
      "Medium",
      "Medium +"
     ],
     "bitterness": "No",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "High acidity and moderate alcohol beside intense, ripe tropical fruit say a cool, sunny maritime climate: long bright days for ripeness, cold nights to keep the acid.",
     "grape": "Pungent passion fruit and grapefruit over cut grass and green pepper, with searing acid and no oak, is Sauvignon Blanc at full volume."
    }
   }
  ],
  "slug": "sauvignon-blanc"
 },
 "syrah": {
  "colour": "red",
  "name": "Syrah",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Moderate",
    "colour": [
     "Purple",
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Tart",
      "Ripe"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "France",
    "fruit": {
     "black": [
      "blackberry",
      "black plum",
      "black cherry"
     ],
     "blue": [
      "blueberry"
     ],
     "red": []
    },
    "nonFruit": [
     "flowers",
     "pepper",
     "meat"
    ],
    "region": "Côte-Rôtie, Saint-Joseph and Crozes-Hermitage",
    "sell": "A Northern Rhône Syrah, savoury and perfumed, with blackberry, blueberry and violets cut with cracked black pepper and smoked meat. It is superb with lamb, venison or a peppered steak.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium",
      "Medium +"
     ],
     "tannin": [
      "Medium",
      "Medium +"
     ]
    },
    "why": {
     "climate": "Fruit that is ripe yet fresh, with acidity and alcohol both no higher than medium plus, says a moderate climate.",
     "grape": "Black and blue fruit with cracked black pepper, violet and smoked meat on a firm, savoury frame is Syrah."
    }
   },
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Warm",
    "colour": [
     "Purple",
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ],
     "palate": [
      "Ripe",
      "Overripe / Jammy / Candied"
     ]
    },
    "country": "Australia",
    "fruit": {
     "black": [
      "blackberry",
      "black plum"
     ],
     "blue": [
      "blueberry"
     ],
     "red": []
    },
    "nonFruit": [
     "mint",
     "coffee",
     "new-oak"
    ],
    "region": "South Australia, Western Australia and Victoria",
    "sell": "An opulent Australian Shiraz, full of blackberry and blueberry, with dark chocolate, sweet spice and a lift of eucalyptus over vanilla and toast from new oak. It stands up to barbecue, braised short rib or a peppered steak.",
    "structure": {
     "acidity": [
      "Medium"
     ],
     "alcohol": [
      "Medium +",
      "High"
     ],
     "tannin": [
      "Medium +"
     ]
    },
    "why": {
     "climate": "Jammy black fruit, alcohol at medium plus or high, eucalyptus and acidity no more than medium say a warm climate.",
     "grape": "Opaque purple, black and blue fruit, chocolate and spice on a full, firm frame is Syrah in its Shiraz style."
    }
   }
  ],
  "slug": "syrah"
 },
 "tempranillo": {
  "colour": "red",
  "name": "Tempranillo",
  "reads": [
   {
    "age": [
     "4-6 Years",
     "7+ Years"
    ],
    "climate": "Moderate",
    "colour": [
     "Ruby",
     "Garnet"
    ],
    "condition": {
     "nose": [
      "Ripe",
      "Baked / Dried / Bruised"
     ],
     "palate": [
      "Ripe",
      "Baked / Dried / Bruised"
     ]
    },
    "country": "Spain",
    "fruit": {
     "black": [],
     "blue": [],
     "red": [
      "red cherry",
      "strawberry",
      "red plum"
     ]
    },
    "nonFruit": [
     "dried-herbs",
     "meat",
     "earth",
     "new-oak"
    ],
    "region": "Rioja",
    "sell": "A Rioja Reserva or Gran Reserva, long aged in American oak, with dried red cherry and strawberry woven through vanilla, dill, coconut and soft leather. It is a classic with roast lamb, chorizo or Manchego.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "Medium",
      "Medium +"
     ],
     "tannin": [
      "Medium",
      "Medium +"
     ]
    },
    "why": {
     "climate": "Ripe to dried red fruit with fresh acidity and alcohol short of high say a moderate continental climate.",
     "grape": "Dried red fruit with leather, tobacco and earth on medium plus tannin, under the dill and coconut of American oak, is the Tempranillo of Rioja."
    }
   }
  ],
  "slug": "tempranillo"
 },
 "torrontes": {
  "colour": "white",
  "name": "Torrontés",
  "reads": [
   {
    "age": [
     "1-2 Years"
    ],
    "climate": "Warm",
    "colour": [
     "Straw"
    ],
    "condition": {
     "nose": [
      "Ripe"
     ],
     "palate": [
      "Ripe"
     ]
    },
    "country": "Argentina",
    "fruit": {
     "apple-pear": [],
     "citrus": [
      "lemon",
      "lime",
      "orange"
     ],
     "stone-fruit": [
      "peach",
      "apricot"
     ],
     "tropical": [
      "lychee"
     ]
    },
    "nonFruit": [
     "flowers"
    ],
    "region": "Salta and Mendoza",
    "sell": "Argentina's own white grape, grown high in the Andes: rose petal, jasmine and peach on the nose, yet dry and fresh on the palate. Try it with empanadas, ceviche or anything with a little chilli heat.",
    "structure": {
     "acidity": [
      "Medium +",
      "High"
     ],
     "alcohol": [
      "Medium",
      "Medium +"
     ],
     "bitterness": "Yes",
     "sweetness": "Dry"
    },
    "why": {
     "climate": "Fully ripe peach and floral fruit with alcohol reaching medium plus say strong sun and warmth, while cold nights at altitude hold the acidity at medium plus or above.",
     "grape": "A perfume of rose, jasmine and orange blossom that promises sweetness, then a dry palate with fresh acid and a faintly bitter, phenolic finish: the Torrontés trick."
    }
   }
  ],
  "slug": "torrontes"
 },
 "zinfandel": {
  "colour": "red",
  "name": "Zinfandel",
  "reads": [
   {
    "age": [
     "1-3 Years",
     "4-6 Years"
    ],
    "climate": "Warm",
    "colour": [
     "Ruby"
    ],
    "condition": {
     "nose": [
      "Overripe / Jammy / Candied",
      "Baked / Dried / Bruised"
     ],
     "palate": [
      "Overripe / Jammy / Candied",
      "Baked / Dried / Bruised"
     ]
    },
    "country": "United States",
    "fruit": {
     "black": [
      "blackberry",
      "black plum"
     ],
     "blue": [],
     "red": [
      "raspberry",
      "red cherry"
     ]
    },
    "nonFruit": [
     "pepper",
     "new-oak"
    ],
    "region": "Napa Valley and Sonoma County",
    "sell": "A big, brambly California Zinfandel of blackberry jam and raspberry, with black pepper, sweet spice and vanilla from new oak and a warm, generous finish. It is perfect with barbecue, ribs or a spiced sausage.",
    "structure": {
     "acidity": [
      "Medium",
      "Medium +"
     ],
     "alcohol": [
      "High"
     ],
     "tannin": [
      "Medium",
      "Medium +"
     ]
    },
    "why": {
     "climate": "Jammy and raisined fruit with alcohol at high says a warm, sunny climate.",
     "grape": "Briary, jammy fruit with a raisin edge, black pepper and high alcohol, yet only medium depth of colour, is Zinfandel."
    }
   }
  ],
  "slug": "zinfandel"
 }
};
var GRID_SAY = {
 "albarino": "ahl-bah-REE-nyo",
 "cabernet-franc": "kah-bair-NAY FRAHN",
 "cabernet-sauvignon": "kah-bair-NAY soh-vee-NYOHN",
 "chardonnay": "shar-doh-NAY",
 "chenin-blanc": "shuh-NAN BLAHN",
 "gamay": "gah-MAY",
 "gewurztraminer": "guh-VURTS-trah-mee-ner",
 "grenache": "gruh-NASH",
 "malbec": "mahl-BEK",
 "merlot": "mair-LOH",
 "nebbiolo": "neb-bee-OH-loh",
 "pinot-grigio": "PEE-noh GREE-joh",
 "pinot-noir": "PEE-noh NWAHR",
 "riesling": "REES-ling",
 "sangiovese": "san-joh-VEH-zeh",
 "sauvignon-blanc": "so-vee-NYOHN BLAHN",
 "syrah": "see-RAH",
 "tempranillo": "tem-prah-NEE-yoh",
 "torrontes": "tor-ron-TES",
 "zinfandel": "ZIN-fan-del"
};
var GRID_ALIASES = {
 "alvarinho": "albarino",
 "aragonez": "tempranillo",
 "blauburgunder": "pinot-noir",
 "bouchet": "cabernet-franc",
 "breton": "cabernet-franc",
 "brunello": "sangiovese",
 "cannonau": "grenache",
 "cencibel": "tempranillo",
 "chiavennasca": "nebbiolo",
 "cot": "malbec",
 "crljenak kastelanski": "zinfandel",
 "gamay noir": "gamay",
 "garnacha": "grenache",
 "garnacha tinta": "grenache",
 "grenache garnacha": "grenache",
 "grenache noir": "grenache",
 "morellino": "sangiovese",
 "nielluccio": "sangiovese",
 "pinot gris": "pinot-grigio",
 "pinot gris grigio": "pinot-grigio",
 "pinot nero": "pinot-noir",
 "primitivo": "zinfandel",
 "prugnolo gentile": "sangiovese",
 "sangiovese grosso": "sangiovese",
 "shiraz": "syrah",
 "spanna": "nebbiolo",
 "spatburgunder": "pinot-noir",
 "steen": "chenin-blanc",
 "syrah shiraz": "syrah",
 "tinta de toro": "tempranillo",
 "tinta del pais": "tempranillo",
 "tinta roriz": "tempranillo",
 "tinto fino": "tempranillo",
 "tribidrag": "zinfandel",
 "ull de llebre": "tempranillo"
};
