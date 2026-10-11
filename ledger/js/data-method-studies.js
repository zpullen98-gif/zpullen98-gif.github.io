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
  }
];
