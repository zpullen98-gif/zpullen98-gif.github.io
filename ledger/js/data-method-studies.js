/* General method studies, reviewed 10 October 2026. Stable IDs connect
   lessons, house records and revealed answers; names never assign a house
   build. Illustrations are concepts, not measured recipes or house portraits. */
var LEDGER_METHOD_STUDIES = [
  {
    id:'stir-rinse', title:'Stir, strain and rinse', eyebrow:'Aromatic precision',
    intro:'Keep three jobs distinct: a rinse scents the serving vessel, stirring mixes and chills, and straining separates the drink from the mixing ice.',
    image:'img/studies/stir-rinse-v1.svg',
    alt:'Three illustrative panels: A, coating a serving vessel with a rinse; B, stirring liquid with ice in a mixing vessel; C, straining into the prepared vessel while retaining the mixing ice.',
    steps:[
      ['Prepare the rinse','When the recipe calls for a rinse, coat the inside of the serving vessel with the specified aromatic ingredient. Handle the excess as that recipe directs. The shape pictured is illustrative.'],
      ['Stir the measured mixture','Keep the measured recipe and mixing ice in their own vessel. Stir with a controlled movement, then check the intended temperature and dilution using the bar’s tasting procedure. A fixed count cannot account for every starting condition.'],
      ['Strain for the intended service','Retain the mixing ice with the appropriate strainer and pour into the prepared vessel. This example shows service without that ice; the actual recipe decides the serving ice and finish.']
    ],
    checks:['Can you identify the mixing vessel and the serving vessel without confusing their jobs?','Has the mixture reached the recipe’s intended balance and temperature? The picture cannot answer this for you.','Is the rinse the named ingredient, with the specified finish and no invented garnish?'],
    recall:'Where is the ice used, what does the rinse contribute, and which details still need the bar’s confirmation?',
    answer:'Ice chills and dilutes during mixing; the rinse contributes aroma. Mixing ice is retained in this example. The house’s measures, serving vessel, rinse handling and garnish still come from its approved build.',
    guest:'“The rinse adds an aromatic accent to the spirit-forward drink.” Then name the actual spirit and rinse from the drink you are serving.',
    house:'Brennan’s published Classic Sazerac lists Sazerac rye, Peychaud’s bitters and an Herbsaint rinse. The saved guide describes service without ice. Neither the menu nor this drawing supplies a complete measured house build, glass size or garnish.',
    confirm:'Confirm measures, mixing routine, serving vessel, rinse handling and final garnish with the bar. A generic Sazerac recipe is a comparison, not a replacement for the house build.',
    houseIds:['b-olsmh04y','b-15i9pacz','b-m0mhbaq8'],
    componentIds:['c-4crkt5nv','c-9o8x4d6n'],
    canonNames:['Sazerac'], references:['bar-tools','ice'],
    reading:[['Technique: The Mechanics','#/notes/technique-the-mechanics']],
    sources:[
      ['Brennan’s cocktail menu','https://www.brennansneworleans.com/menus/cocktails/'],
      ['Sazerac House: a general Sazerac method','https://www.sazerachouse.com/inspiration/stories/how-to-prepare-the-perfect-sazerac-cocktail-the-official-cocktail-of-new-orleans/']
    ], reviewedOn:'2026-10-10'
  },
  {
    id:'shake-texture', title:'Shake for the requested texture', eyebrow:'Chill, dilution and aeration',
    intro:'A shaking method is a way to achieve a particular drink. Judge the result against its recipe, and keep creamy texture, egg foam and coffee foam as different questions.',
    image:'img/studies/shake-texture-v1.svg',
    alt:'Three illustrative panels: A, two tins fitted together; B, sealed tins with arrows indicating shaking; C, a strainer retaining ice as the liquid is poured and its intended texture checked.',
    steps:[
      ['Read the build and secure the tins','Measure the specified ingredients and use the specified ice. Fit and secure the two tins, with a grip that controls both pieces. This sequence shows an ordinary shake with ice; an egg drink may have a separately specified dry or reverse dry shake.'],
      ['Shake with a purpose','Shake to combine, chill, dilute and aerate as the recipe requires. Starting temperature, ingredients, ice and equipment affect the result. Practise the physical movement with an experienced bartender.'],
      ['Strain, observe and taste','Use the strain specified for the drink. An additional fine strainer changes what passes through; it is not compulsory for every shaken cocktail. Check the intended texture, temperature and balance, rather than a universal foam height or a standing straw.']
    ],
    checks:['Are the tins secure and both pieces controlled?','Is the drink evenly combined, with the texture the recipe asks for?','Are unwanted fragments retained without changing a deliberately textured drink?','Does the taste and temperature match the intended result, using the house’s tasting procedure?'],
    recall:'What is this recipe asking the shake to accomplish, and what would you check before changing your method?',
    answer:'Identify the ingredients and intended texture first. Observe mixing and filtration, then assess temperature and balance. Change a relevant variable deliberately and compare; do not add egg or demand foam because another drink uses it.',
    guest:'“It is creamy and softly aromatic.” Use that description for the actual result, then name the printed ingredients when the guest asks what is in it.',
    house:'Brennan’s Brandy Milk Punch names brandy, heavy cream, vanilla bean and nutmeg. Egg is not listed for this drink. Its named cream differs from the whole-milk example in the general cocktail library. The house Espresso Martini also has its own printed ingredients.',
    confirm:'Confirm the house quantities, cream handling, ice, strain, serving vessel and finish. A picture or a familiar cocktail name cannot establish ingredients or allergy suitability.',
    houseIds:['b-c0ei23l2','b-z5ckwig5','b-2g19vrds','b-j8tcv7ox','b-try910qa','b-6h7gqptn','b-30rc57xd'],
    componentIds:['c-2ma3qfcm','c-w6abt6ng'],
    canonNames:['Brandy Milk Punch','Espresso Martini','Daiquiri'], references:['bar-tools','ice'],
    reading:[['Technique: The Mechanics','#/notes/technique-the-mechanics']],
    sources:[
      ['Brennan’s breakfast and lunch menu','https://www.brennansneworleans.com/menus/breakfast-and-lunch/'],
      ['Brennan’s dessert menu','https://www.brennansneworleans.com/menus/dessert/'],
      ['Patrón: shaking and straining','https://www.patrontequila.com/en-gb/cocktails/lab/pro-tips/shaking-straining.html'],
      ['Campari Academy: cocktail shakers','https://www.campariacademy.com/en-ch/training/tools-techniques/cocktail-shakers/']
    ], reviewedOn:'2026-10-10'
  },
  {
    id:'coffee-cream', title:'Coffee, cream and texture', eyebrow:'A considered finish',
    intro:'Learn to describe a cream texture before assuming a method. A flowing cream layer and a whipped topping are different preparations, and the house recipe decides which belongs on the drink.',
    image:'img/studies/coffee-cream-v1.svg',
    alt:'Three illustrative panels: A, pourable cream beside a whipped mound; B, a generic controlled cream pour over a spoon; C, a whipped cream topping on coffee as an ingredient and texture concept, not Brennan’s presentation.',
    steps:[
      ['Compare the cream textures','Panel A contrasts cream that flows with cream that holds a mound. They are observations, not interchangeable recipe instructions. Use the cream preparation the particular drink specifies.'],
      ['Study a general float','Panel B shows a controlled spoon-assisted pour as a general floating technique. Where that method is specified, pour carefully and observe whether a distinct layer forms. This is not a substitute for Brennan’s whipped-cream preparation.'],
      ['Apply the house’s own finish','Panel C is a whipped-cream-on-coffee concept. Confirm the actual house topping, hot or iced order, cup or glass, portion and service method. Keep contact surfaces clean and hand over a hot vessel deliberately.']
    ],
    checks:['Can you describe the cream as flowing, softly whipped or holding a shape without inventing its recipe?','Is the actual ordered drink hot or iced?','Does the topping match this drink’s approved preparation?','Are the vessel, portion and service explanation confirmed rather than copied from the drawing?'],
    recall:'How would you describe Brennan’s Irish Coffee to a guest, and why is a generic cream float not enough to establish its preparation?',
    answer:'Name the house’s printed whiskey, coffee with chicory, brown sugar and whipped cream. Explain that the generic float teaches an observation and pouring technique; the house decides its cream preparation, vessel and service.',
    guest:'“Our Irish Coffee brings together Tullamore D.E.W., dark roast coffee with chicory, brown sugar and whipped cream.” Check the guest’s preferred service and the current house offering before promising a variation.',
    house:'Brennan’s menu names Tullamore D.E.W., dark roast coffee with chicory, brown sugar and whipped cream. The saved guide describes a hot build, but it is not a staff-confirmed build sheet. Ralph’s Coffee has a different ingredient list; do not describe the two as the same drink.',
    confirm:'Confirm hot or iced availability, vessel, cream preparation, quantities and the order of service. The drawn cup is not a Brennan’s glass assignment.',
    houseIds:['b-xs168hf4','b-strzgc5a'],
    componentIds:['c-q898v0k9','c-lpye1o6n','c-uwek7dv7'],
    canonNames:['Irish Coffee'], references:['brennans-glassware'],
    reading:[['Coffee & Tea: Spiked & Service','#/coffee/spiked']],
    sources:[
      ['Brennan’s breakfast and lunch menu','https://www.brennansneworleans.com/menus/breakfast-and-lunch/'],
      ['Brennan’s dessert menu','https://www.brennansneworleans.com/menus/dessert/'],
      ['IBA: Irish Coffee, a general recipe','https://iba-world.com/iba-cocktail/irish-coffee/']
    ], reviewedOn:'2026-10-10'
  },
  {
    id:'build-bubbles', title:'Build gently with bubbles', eyebrow:'Protect the sparkling finish',
    intro:'Read the still ingredients and the carbonated addition as separate jobs. Prepare the base as specified, then use deliberate handling to finish the drink.',
    image:'img/studies/build-bubbles-v1.svg',
    alt:'Three illustrative open-vessel panels: A, a non-carbonated base; B, a sparkling addition being poured; C, gentle recipe-specific combining with visible bubbles. No closed shaker contains the carbonated addition.',
    steps:[
      ['Prepare the still base','Read the actual recipe: some bases are mixed in the serving vessel and others are prepared separately. Complete that work with the ingredients, temperature and ice the recipe calls for.'],
      ['Add the sparkling element','Identify the correct sparkling wine or other carbonated ingredient and its condition. This example shows it added to an open vessel. Never seal and shake a carbonated addition in a cocktail shaker.'],
      ['Combine only as required','Use the recipe’s specified gentle combining step, if one is called for. Check the finish and serve promptly. This drawing does not prescribe a universal top-up amount, ice choice or vessel.']
    ],
    checks:['Have you identified which ingredient brings the bubbles?','Is the base ready before the sparkling addition in this recipe?','Are you using the actual specified sparkling ingredient rather than treating all bubbles as interchangeable?','Does the final drink match the intended temperature, balance and carbonation?'],
    recall:'Which element brings the bubbles, when does this recipe introduce it, and what should you check before serving?',
    answer:'Name the actual carbonated ingredient, follow the drink’s build order and assess its condition, temperature, balance and finish. The general sequence cannot provide the house’s measures or serving vessel.',
    guest:'“The sparkling finish makes this a lively aperitif.” Add the actual base flavours and ask about the guest’s preference for sweetness and bitterness.',
    house:'Brennan’s Champagne Cocktail lists Champagne, a demerara sugar cube and Angostura bitters. Bubbles at Brennan’s includes several drinks with different bases and sparkling ingredients. This lesson connects their shared question about carbonation, not a single shared recipe.',
    confirm:'Confirm the exact sparkling ingredient, build order, quantities, serving ice, glass and garnish for the drink ordered. Current availability is a bar question.',
    houseIds:['b-590pi2gd','b-e6zfgyhu','b-6h7gqptn','b-iz7grv1p','b-o4yfzgkn','b-jdss6r83','b-qicnv77v','b-30rc57xd'],
    componentIds:['c-qpooqtnh','c-rbld6gvy'],
    canonNames:['Champagne Cocktail','French 75','Aperol Spritz'], references:['ice','brennans-glassware'],
    reading:[['Behind the Stick: Wine','#/service/wine']],
    sources:[
      ['Brennan’s Bubbles menu','https://www.brennansneworleans.com/menus/bubbles-at-brennans/'],
      ['Brennan’s cocktail menu','https://www.brennansneworleans.com/menus/cocktails/'],
      ['IBA: Champagne Cocktail, a general recipe','https://iba-world.com/iba-cocktail/champagne-cocktail/']
    ], reviewedOn:'2026-10-10'
  },
  {
    "id": "spirit-forward",
    "collection": "families",
    "title": "Spirit-forward families in comparison",
    "eyebrow": "Read what frames the spirit",
    "intro": "Follow what frames the spirit: sweetener and bitters, aromatised wine, or a bitter aperitif. These overlapping comparisons help you ask a better guest question; they do not supply a house recipe.",
    "image": "img/studies/spirit-forward-v1.svg",
    "alt": "Three ingredient-role comparisons: A, an unbranded spirit bottle with sugar cubes and bitters; B, spirit and aromatised wine represented by separate bottles and grapes; C, spirit, bitter aperitif and aromatised wine. Bottle size is not a ratio.",
    "imageCaption": "Ingredient and structure comparisons. Read A, B and C with the explanations below. Bottle sizes, vessels and colours are illustrative; they do not show proportions or Brennan’s presentation.",
    "steps": [
      [
        "Old Fashioned pattern",
        "A spirit is framed by sugar, bitters and water from the recipe and melting ice. These are ingredient roles, not an instruction to add a standard syrup measure to every related drink."
      ],
      [
        "Spirit with aromatised wine",
        "A Manhattan pairs whiskey and sweet vermouth; a Dry Martini pairs gin and dry vermouth. The wine style and amount change the result. Ask what a guest means by dry rather than assuming they want no vermouth."
      ],
      [
        "A bitter aperitif changes the balance",
        "The IBA Negroni adds Campari to gin and sweet vermouth. This named example shows bitterness, sweetness and wine character working together. Bitter and spirit-forward do not mean unsweetened or a known alcohol strength."
      ]
    ],
    "checks": [
      "Can you name the job of the sweetener, the wine and the bitter ingredient in each example?",
      "Have you clarified what the guest means by dry, strong or bitter? These are different questions.",
      "Are you describing the actual menu ingredients without turning a family pattern into a measured house build?"
    ],
    "recall": "What changes when wine replaces plain sweetener as a major partner? Why is spirit-forward not an exact alcohol-strength claim?",
    "answer": "Wine changes acidity, sweetness and botanical flavour as well as the balance with the spirit. Strength depends on the actual ingredients, measures and dilution, which a family label cannot supply.",
    "guest": "Would you prefer whiskey and aromatic bitters, or a drink with the wine character of vermouth? For a Martini order, clarify the guest’s meaning of dry rather than guessing.",
    "house": "The currently published Classic Sazerac identifies rye, Peychaud’s and an Herbsaint rinse. To Each His Own identifies Calvados, Lillet Blanc and quince liqueur. Use the pair to notice an aromatic rinse versus a wine-based aperitif and liqueur; neither printed list gives a complete measured build.",
    "confirm": "Lillet Blanc is a wine-based aperitif, not simply another name for dry vermouth. Confirm the house’s actual build and serving details. Do not relabel To Each His Own as a Martini.",
    "houseIds": [
      "b-olsmh04y",
      "b-s0qz3e1g"
    ],
    "componentIds": [
      "c-70rdihwo",
      "c-hexgqdzk",
      "c-r8v9mkjs",
      "c-hs7ia447",
      "c-7cihlfz8",
      "c-gsjewrqw"
    ],
    "canonNames": [
      "Old Fashioned",
      "Manhattan",
      "Martini",
      "Negroni",
      "Sazerac"
    ],
    "families": [
      "Old Fashioned",
      "Spirit & Vermouth"
    ],
    "references": [
      "bar-tools"
    ],
    "reading": [
      [
        "Explore the cocktail families",
        "#/families"
      ],
      [
        "Practise stirring and rinsing",
        "#/notes/studies/stir-rinse"
      ]
    ],
    "sources": [
      [
        "Brennan’s current Cocktails and Wine by the Glass menu",
        "https://www.brennansneworleans.com/menus/cocktails/"
      ],
      [
        "IBA Old Fashioned",
        "https://iba-world.com/iba-cocktail/old-fashioned/"
      ],
      [
        "IBA Manhattan",
        "https://iba-world.com/iba-cocktail/manhattan/"
      ],
      [
        "IBA Dry Martini",
        "https://iba-world.com/iba-cocktail/dry-martini/"
      ],
      [
        "IBA Negroni",
        "https://iba-world.com/iba-cocktail/negroni/"
      ],
      [
        "Lillet producer FAQ",
        "https://www.lillet.com/fr-be/faq/"
      ]
    ],
    "reviewedOn": "2026-10-11"
  },
  {
    "id": "sour-structure",
    "collection": "families",
    "title": "Sour structure and texture",
    "eyebrow": "Balance first, texture by recipe",
    "intro": "Locate acidity and sweetness before choosing a texture. A liqueur can bring several flavours at once, and foam is a separate recipe decision.",
    "image": "img/studies/sour-structure-v1.svg",
    "alt": "Three comparisons: A, a generic spirit bottle, lime and sugar; B, a liqueur bottle, lemon cross-section and orange peel; C, two generic surfaces, one plain and one foamed, beside an egg as one possible texture ingredient. No ingredient can be established from foam alone.",
    "imageCaption": "Ingredient and structure comparisons. Read A, B and C with the explanations below. Bottle sizes, vessels and colours are illustrative; they do not show proportions or Brennan’s presentation.",
    "steps": [
      [
        "Locate the acid and sweet",
        "The Daiquiri gives a clear comparison: rum, lime and sugar. Taste and measure to the named recipe; an equal visual diagram is not an equal-parts formula."
      ],
      [
        "A liqueur brings flavour and sweetness",
        "The IBA Sidecar combines Cognac, triple sec and lemon. Here the orange liqueur contributes flavour and sweetness together. Changing a liqueur changes more than sweetness, so read the named recipe rather than copying a syrup ratio."
      ],
      [
        "Texture is a separate choice",
        "Egg white is optional in the IBA Whiskey Sour and absent from its Daiquiri. A sour does not require egg, dairy or a foam cap. Use the specified method and strain for the desired texture."
      ]
    ],
    "checks": [
      "Which ingredient supplies acidity, and which supplies sweetness? Could either do more than one job?",
      "Is the texture ingredient named in this recipe, rather than guessed from the foam?",
      "Does the chosen method and strain match the specified finish?"
    ],
    "recall": "A guest enjoys lemon but avoids egg. Can the word sour settle the order?",
    "answer": "No. Check the particular ingredients and preparation with the bar. Sour describes a useful structural comparison; it is not an egg or allergen declaration.",
    "guest": "Would you like something bright and citrus-led, or a softer texture? I can check which of our current options fits your preference.",
    "house": "Old Buttermilk Sky expressly lists egg white; Five Minutes More lists lemon and two liqueurs without egg on the printed list. This is a contrast between documented ingredient lists, not proof that an omission establishes an egg-free preparation.",
    "confirm": "Confirm ingredients, handling and any approved variation with the bar. Do not promise that removing egg leaves an otherwise identical drink or that a pale foam proves a particular ingredient.",
    "houseIds": [
      "b-2g19vrds",
      "b-try910qa",
      "b-j8tcv7ox"
    ],
    "componentIds": [
      "c-22e097nj",
      "c-h4oc3dqx",
      "c-038e19qq",
      "c-jp9rkxhp",
      "c-xcjx03ic",
      "c-7j93z4g0"
    ],
    "canonNames": [
      "Daiquiri",
      "Whiskey Sour",
      "Margarita",
      "Sidecar"
    ],
    "families": [
      "Sour"
    ],
    "references": [
      "bar-tools",
      "garnish-citrus"
    ],
    "reading": [
      [
        "Explore the cocktail families",
        "#/families"
      ],
      [
        "Practise shaking and texture",
        "#/notes/studies/shake-texture"
      ]
    ],
    "sources": [
      [
        "Brennan’s current Cocktails and Wine by the Glass menu",
        "https://www.brennansneworleans.com/menus/cocktails/"
      ],
      [
        "IBA Daiquiri",
        "https://iba-world.com/iba-cocktail/daiquiri/"
      ],
      [
        "IBA Sidecar",
        "https://iba-world.com/iba-cocktail/sidecar/"
      ],
      [
        "IBA Whiskey Sour",
        "https://iba-world.com/iba-cocktail/whiskey-sour/"
      ]
    ],
    "reviewedOn": "2026-10-11"
  },
  {
    "id": "long-sparkling",
    "collection": "families",
    "title": "Highball, fizz and spritz",
    "eyebrow": "Follow the source of the bubbles",
    "intro": "A glass shape cannot tell you how a drink is built. Compare a whisky highball, a Gin Fizz and a Spritz by their ingredients, serving ice and source of bubbles.",
    "image": "img/studies/long-sparkling-v1.svg",
    "alt": "Three named recipe concepts: A, a whisky-and-soda highball with serving ice; B, an IBA-style Gin Fizz with bubbles and no serving ice; C, an aperitif, sparkling-wine and soda spritz over ice. Vessels and colours are illustrative.",
    "imageCaption": "Ingredient and structure comparisons. Read A, B and C with the explanations below. Bottle sizes, vessels and colours are illustrative; they do not show proportions or Brennan’s presentation.",
    "steps": [
      [
        "Whisky highball example",
        "Whisky lengthened with soda illustrates a simple highball. Suntory’s example chills the glass and ingredients, mixes the whisky with ice and introduces chilled soda. Its particulars are a recipe, not a rule for every long drink."
      ],
      [
        "Gin Fizz example",
        "The IBA Gin Fizz shakes gin, lemon and sweetener before soda is added. It specifies service without ice. Neither egg nor cream is required by that particular fizz recipe."
      ],
      [
        "Spritz example",
        "The IBA Spritz combines Prosecco, Aperol and soda over ice. Other products and recipes use different components, including ready-mixed spritzes. Identify what supplies the wine, bitter flavour and bubbles."
      ]
    ],
    "checks": [
      "Which ingredient supplies the bubbles in this particular recipe?",
      "Does its serving ice and mixing method match the named recipe, rather than the glass shape?",
      "Is this a separately mixed drink or a ready-to-serve product, and has the actual house procedure been checked?"
    ],
    "recall": "Why can’t the same tall glass establish a highball or fizz, and why should you not automatically add soda to every spritz?",
    "answer": "Structure and the particular recipe matter more than silhouette. Some fizz recipes have no serving ice; some spritz products already contain the complete sparkling mixture. Follow the ordered drink’s approved build.",
    "guest": "Would you prefer a simple spirit-and-soda drink, citrus with bubbles, or a bittersweet sparkling aperitif? Then check the current menu and the guest’s preferred flavours.",
    "house": "Bodrum lists rum, pistachio, cream, lime and sparkling water. Chandon Garden Spritz names bitter orange liqueur and Chandon Brut sparkling wine. These are different ingredient combinations, and the printed lists do not establish the house’s vessel, proportions or assembly.",
    "confirm": "Chandon sells a ready-to-serve Garden Spritz product. Confirm the actual bottle and house procedure rather than converting the menu wording into a two-bottle recipe. No sealed shaking after adding the carbonated element.",
    "houseIds": [
      "b-6h7gqptn",
      "b-o4yfzgkn",
      "b-e6zfgyhu"
    ],
    "componentIds": [
      "c-0hsrngp2",
      "c-z1m8cztp",
      "c-uk2f0dw5",
      "c-p38h630z",
      "c-rbld6gvy",
      "c-qpooqtnh"
    ],
    "canonNames": [
      "Whiskey Highball",
      "Gin & Tonic",
      "Gin Fizz",
      "Ramos Gin Fizz",
      "Aperol Spritz"
    ],
    "families": [
      "Highball"
    ],
    "references": [
      "ice",
      "brennans-glassware"
    ],
    "reading": [
      [
        "Explore the cocktail families",
        "#/families"
      ],
      [
        "Practise building with bubbles",
        "#/notes/studies/build-bubbles"
      ]
    ],
    "sources": [
      [
        "Brennan’s Bubbles menu",
        "https://www.brennansneworleans.com/menus/bubbles-at-brennans/"
      ],
      [
        "House of Suntory whisky highball",
        "https://house.suntory.com/cocktails/whisky-highball"
      ],
      [
        "IBA Gin Fizz",
        "https://iba-world.com/iba-cocktail/gin-fizz/"
      ],
      [
        "IBA Spritz",
        "https://iba-world.com/iba-cocktail/spritz/"
      ],
      [
        "Chandon Garden Spritz producer page",
        "https://www.chandon.com/en-int/chandon-garden-spritz"
      ]
    ],
    "reviewedOn": "2026-10-11"
  },
  {
    "id": "zero-proof",
    "collection": "families",
    "title": "Zero-proof, equal hospitality",
    "eyebrow": "Choose flavour with the same care",
    "intro": "Offer the same care, curiosity and precision to every guest. Explore aroma, acidity, sweetness, bitterness and texture, then check the actual menu and the guest’s needs.",
    "image": "img/studies/zero-proof-v1.svg",
    "alt": "Three ingredient-role studies: A, tea in a cup and aromatic leaves; B, fruit, citrus and a sweetener bowl; C, an unbranded bitter-alternative bottle and a sparkling drink. The artwork makes no alcohol-content or ingredient-suitability claim.",
    "imageCaption": "Ingredient and structure comparisons. Read A, B and C with the explanations below. Bottle sizes, vessels and colours are illustrative; they do not show proportions or Brennan’s presentation.",
    "steps": [
      [
        "Find aroma and a satisfying texture",
        "Tea is one possible tool: its aroma and tannin can add flavour and a drying sensation. Match tea and infusion to the recipe. This is a general option, not an ingredient claimed for Brennan’s two Temperance drinks."
      ],
      [
        "Balance fruit, citrus and sweetness",
        "Fruit can bring acidity, sweetness and aroma at once. Identify the separate jobs of juice, citrus and syrup in the actual recipe, then assess the balance. Removing alcohol from another recipe does not automatically create the intended result."
      ],
      [
        "Consider bitter flavour and bubbles",
        "A suitable non-alcoholic bitter ingredient or sparkling element can add another direction. Ask what the guest enjoys, and verify the actual products and preparation for their needs. Spirit-free does not by itself establish exact alcohol content or ingredient suitability."
      ]
    ],
    "checks": [
      "Have you asked about flavour preferences with the same care as for any cocktail order?",
      "Have you checked the complete recipe and actual products for the guest’s stated needs?",
      "Can you describe the offered drink without guessing alcohol content, ingredients or an approved substitution?"
    ],
    "recall": "What needs checking when a guest choosing a spirit-free drink also avoids egg?",
    "answer": "The complete recipe and handling. Brennan’s Oh! What It Seemed to Be explicitly lists egg white. Do not assume a spirit-free sour is vegan or offer an unapproved substitution; return with a confirmed option.",
    "guest": "Would you enjoy something sparkling and fruit-led, or a lemon-and-spice drink with a softer texture? If you have ingredients or alcohol levels you need us to avoid, I’ll check the details with the bar.",
    "house": "Personality pairs the named Wölffer sparkling rosé with tart cherry and brown sugar syrup. Oh! What It Seemed to Be lists a Lyre’s agave alternative, fig and cinnamon syrups, lemon and egg white. Both sit in the menu’s Temperance section, but their structures and ingredient questions differ.",
    "confirm": "No exact finished ABV, zero-alcohol guarantee, vegan status or allergy assurance can be derived from these menu lists. Lyre’s product pages can vary by market and product; verify the bottle used at the bar.",
    "houseIds": [
      "b-qicnv77v",
      "b-j8tcv7ox"
    ],
    "componentIds": [
      "c-jex1ygvo",
      "c-8qhlo98v",
      "c-bp3jmiyt",
      "c-io5nnzg8",
      "c-h4oc3dqx",
      "c-038e19qq",
      "c-jp9rkxhp"
    ],
    "canonNames": [],
    "families": [],
    "zeroProofNames": [
      "Arnold Palmer",
      "Sober Sour",
      "Nojito",
      "Phony Negroni",
      "Virgin Mary",
      "Cucumber Basil Cooler"
    ],
    "references": [
      "garnish-citrus"
    ],
    "reading": [
      [
        "Explore the Zero Proof library",
        "#/na"
      ],
      [
        "Compare sour structure",
        "#/notes/studies/sour-structure"
      ]
    ],
    "sources": [
      [
        "Brennan’s current Cocktails and Wine by the Glass menu",
        "https://www.brennansneworleans.com/menus/cocktails/"
      ],
      [
        "Seedlip: tea in non-alcoholic cocktails",
        "https://www.seedlipdrinks.com/en-gb/journal/how-to-use-tea-in-non-alcoholic-cocktails/"
      ],
      [
        "Campari Academy: non-alcoholic infusions",
        "https://www.campariacademy.com/de-de/training/products-category/notes-collection/"
      ],
      [
        "Lyre’s Agave Blanco producer page, UK market",
        "https://lyres.com/en-uk/products/agave-blanco-spirit-uk"
      ]
    ],
    "reviewedOn": "2026-10-11"
  }
];
